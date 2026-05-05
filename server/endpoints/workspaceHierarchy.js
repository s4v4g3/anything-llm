const { reqBody, userFromSession, multiUserMode } = require("../utils/http");
const { Workspace } = require("../models/workspace");
const { validatedRequest } = require("../utils/middleware/validatedRequest");
const {
  flexUserRoleValid,
  ROLES,
} = require("../utils/middleware/multiUserProtected");
const { validWorkspaceSlug } = require("../utils/middleware/validWorkspace");
const { EventLogs } = require("../models/eventLogs");
const { Telemetry } = require("../models/telemetry");
const { getModelTag } = require("./utils");

function workspaceHierarchyEndpoints(app) {
  if (!app) return;

  // Create a sub-workspace under an existing workspace
  app.post(
    "/workspace/:slug/sub-workspace",
    [
      validatedRequest,
      flexUserRoleValid([ROLES.admin, ROLES.manager]),
      validWorkspaceSlug,
    ],
    async (request, response) => {
      try {
        const user = await userFromSession(request, response);
        const parentWorkspace = response.locals.workspace;
        const { name = null } = reqBody(request);

        if (!name) {
          response
            .status(400)
            .json({ workspace: null, message: "name is required" });
          return;
        }

        const { workspace, message } = await Workspace.new(name, user?.id, {
          parentWorkspaceId: parentWorkspace.id,
        });

        if (!workspace) {
          response.status(400).json({ workspace: null, message });
          return;
        }

        await Telemetry.sendTelemetry(
          "workspace_created",
          {
            multiUserMode: multiUserMode(response),
            LLMSelection: process.env.LLM_PROVIDER || "openai",
            Embedder: process.env.EMBEDDING_ENGINE || "inherit",
            VectorDbSelection: process.env.VECTOR_DB || "lancedb",
            TTSSelection: process.env.TTS_PROVIDER || "native",
            LLMModel: getModelTag(),
            isSubWorkspace: true,
          },
          user?.id
        );

        await EventLogs.logEvent(
          "workspace_created",
          {
            workspaceName: workspace.name,
            parentWorkspaceName: parentWorkspace.name,
            isSubWorkspace: true,
          },
          user?.id
        );

        response.status(200).json({ workspace, message: null });
      } catch (e) {
        console.error(e.message, e);
        response.sendStatus(500).end();
      }
    }
  );

  // Get direct children of a workspace
  app.get(
    "/workspace/:slug/children",
    [validatedRequest, flexUserRoleValid([ROLES.all]), validWorkspaceSlug],
    async (request, response) => {
      try {
        const workspace = response.locals.workspace;
        const children = await Workspace.getChildren(workspace.id);
        response.status(200).json({ children });
      } catch (e) {
        console.error(e.message, e);
        response.sendStatus(500).end();
      }
    }
  );

  // Get full subtree of a workspace
  app.get(
    "/workspace/:slug/tree",
    [validatedRequest, flexUserRoleValid([ROLES.all]), validWorkspaceSlug],
    async (request, response) => {
      try {
        const workspace = response.locals.workspace;
        const tree = await Workspace.getTree(workspace.id);
        response.status(200).json({ tree });
      } catch (e) {
        console.error(e.message, e);
        response.sendStatus(500).end();
      }
    }
  );

  // Get the full workspace tree (all workspaces)
  app.get(
    "/workspaces/tree",
    [validatedRequest, flexUserRoleValid([ROLES.all])],
    async (request, response) => {
      try {
        const tree = await Workspace.getTree();
        response.status(200).json({ tree });
      } catch (e) {
        console.error(e.message, e);
        response.sendStatus(500).end();
      }
    }
  );

  // Get breadcrumbs (ancestor chain) for a workspace
  app.get(
    "/workspace/:slug/breadcrumbs",
    [validatedRequest, flexUserRoleValid([ROLES.all]), validWorkspaceSlug],
    async (request, response) => {
      try {
        const workspace = response.locals.workspace;
        const ancestors = await Workspace.getAncestors(workspace.id);
        // Return ancestors + self for a complete breadcrumb trail
        const breadcrumbs = [
          ...ancestors.map((a) => ({ id: a.id, name: a.name, slug: a.slug })),
          { id: workspace.id, name: workspace.name, slug: workspace.slug },
        ];
        response.status(200).json({ breadcrumbs });
      } catch (e) {
        console.error(e.message, e);
        response.sendStatus(500).end();
      }
    }
  );

  // Move (reparent) a workspace
  app.put(
    "/workspace/:slug/move",
    [
      validatedRequest,
      flexUserRoleValid([ROLES.admin, ROLES.manager]),
      validWorkspaceSlug,
    ],
    async (request, response) => {
      try {
        const workspace = response.locals.workspace;
        const { parentWorkspaceId = null } = reqBody(request);

        // parentWorkspaceId of null means move to root
        const result = await Workspace.move(workspace.id, parentWorkspaceId);

        if (!result.success) {
          response.status(400).json({ success: false, error: result.error });
          return;
        }

        await EventLogs.logEvent(
          "workspace_moved",
          {
            workspaceName: workspace.name,
            newParentId: parentWorkspaceId,
          },
          response.locals?.user?.id
        );

        response.status(200).json({ success: true, error: null });
      } catch (e) {
        console.error(e.message, e);
        response.sendStatus(500).end();
      }
    }
  );

  // Delete a workspace with subtree handling
  app.delete(
    "/workspace/:slug/with-children",
    [
      validatedRequest,
      flexUserRoleValid([ROLES.admin, ROLES.manager]),
      validWorkspaceSlug,
    ],
    async (request, response) => {
      try {
        const workspace = response.locals.workspace;
        const { strategy = "promote" } = request.query;

        let result;
        if (strategy === "delete") {
          // Delete workspace and all descendants
          result = await Workspace.deleteWithSubtree(workspace.id);
        } else {
          // Default: promote children to this workspace's parent
          result = await Workspace.deleteAndPromoteChildren(workspace.id);
        }

        if (!result.success) {
          response.status(400).json({ success: false, error: result.error });
          return;
        }

        await EventLogs.logEvent(
          "workspace_deleted",
          {
            workspaceName: workspace.name,
            deleteStrategy: strategy,
          },
          response.locals?.user?.id
        );

        response.status(200).json({ success: true, error: null });
      } catch (e) {
        console.error(e.message, e);
        response.sendStatus(500).end();
      }
    }
  );

  // Get effective (inherited) settings for a workspace
  app.get(
    "/workspace/:slug/effective-settings",
    [validatedRequest, flexUserRoleValid([ROLES.all]), validWorkspaceSlug],
    async (request, response) => {
      try {
        const workspace = response.locals.workspace;
        const settings = await Workspace.getEffectiveSettings(workspace.id);
        response.status(200).json({ settings });
      } catch (e) {
        console.error(e.message, e);
        response.sendStatus(500).end();
      }
    }
  );
}

module.exports = { workspaceHierarchyEndpoints };
