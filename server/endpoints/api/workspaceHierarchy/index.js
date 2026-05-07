const { Workspace } = require("../../../models/workspace");
const { validApiKey } = require("../../../utils/middleware/validApiKey");

function apiWorkspaceHierarchyEndpoints(app) {
  if (!app) return;

  app.get("/v1/workspaces/tree", [validApiKey], async (request, response) => {
    /*
    #swagger.tags = ['Workspace Hierarchy']
    #swagger.description = 'Get the full workspace tree showing all workspaces and their nested sub-workspaces.'
    #swagger.responses[200] = {
      content: {
        "application/json": {
          schema: {
            type: 'object',
            example: {
              tree: [
                {
                  "id": 1,
                  "name": "Research",
                  "slug": "research-abc123",
                  "depth": 0,
                  "children": [
                    {
                      "id": 2,
                      "name": "Papers",
                      "slug": "papers-def456",
                      "depth": 1,
                      "children": []
                    }
                  ]
                }
              ]
            }
          }
        }
      }
    }
    #swagger.responses[403] = {
      schema: {
        "$ref": "#/definitions/InvalidAPIKey"
      }
    }
    */
    try {
      const tree = await Workspace.getTree();
      response.status(200).json({ tree });
    } catch (e) {
      console.error(e.message, e);
      response.sendStatus(500).end();
    }
  });

  app.get(
    "/v1/workspace/:slug/tree",
    [validApiKey],
    async (request, response) => {
      /*
    #swagger.tags = ['Workspace Hierarchy']
    #swagger.description = 'Get the subtree rooted at a specific workspace.'
    #swagger.parameters['slug'] = {
        in: 'path',
        description: 'Unique slug of the workspace to get the subtree for',
        required: true,
        type: 'string'
    }
    #swagger.responses[200] = {
      content: {
        "application/json": {
          schema: {
            type: 'object',
            example: {
              tree: [
                {
                  "id": 2,
                  "name": "Papers",
                  "slug": "papers-def456",
                  "depth": 1,
                  "children": [
                    {
                      "id": 3,
                      "name": "ML",
                      "slug": "ml-ghi789",
                      "depth": 2,
                      "children": []
                    }
                  ]
                }
              ]
            }
          }
        }
      }
    }
    #swagger.responses[403] = {
      schema: {
        "$ref": "#/definitions/InvalidAPIKey"
      }
    }
    #swagger.responses[404] = {
      description: "Workspace not found"
    }
    */
      try {
        const { slug } = request.params;
        const workspace = await Workspace.get({ slug: String(slug) });
        if (!workspace) {
          response
            .status(404)
            .json({ tree: null, message: "Workspace not found" });
          return;
        }

        const tree = await Workspace.getTree(workspace.id);
        response.status(200).json({ tree });
      } catch (e) {
        console.error(e.message, e);
        response.sendStatus(500).end();
      }
    }
  );

  app.get(
    "/v1/workspace/:slug/children",
    [validApiKey],
    async (request, response) => {
      /*
    #swagger.tags = ['Workspace Hierarchy']
    #swagger.description = 'Get the direct children of a workspace.'
    #swagger.parameters['slug'] = {
        in: 'path',
        description: 'Unique slug of the workspace to get children for',
        required: true,
        type: 'string'
    }
    #swagger.responses[200] = {
      content: {
        "application/json": {
          schema: {
            type: 'object',
            example: {
              children: [
                {
                  "id": 2,
                  "name": "Papers",
                  "slug": "papers-def456",
                  "depth": 1
                }
              ]
            }
          }
        }
      }
    }
    #swagger.responses[403] = {
      schema: {
        "$ref": "#/definitions/InvalidAPIKey"
      }
    }
    #swagger.responses[404] = {
      description: "Workspace not found"
    }
    */
      try {
        const { slug } = request.params;
        const workspace = await Workspace.get({ slug: String(slug) });
        if (!workspace) {
          response
            .status(404)
            .json({ children: null, message: "Workspace not found" });
          return;
        }

        const children = await Workspace.getChildren(workspace.id);
        response.status(200).json({ children });
      } catch (e) {
        console.error(e.message, e);
        response.sendStatus(500).end();
      }
    }
  );

  app.get(
    "/v1/workspace/:slug/breadcrumbs",
    [validApiKey],
    async (request, response) => {
      /*
    #swagger.tags = ['Workspace Hierarchy']
    #swagger.description = 'Get the breadcrumb (ancestor chain) for a workspace, including itself.'
    #swagger.parameters['slug'] = {
        in: 'path',
        description: 'Unique slug of the workspace to get breadcrumbs for',
        required: true,
        type: 'string'
    }
    #swagger.responses[200] = {
      content: {
        "application/json": {
          schema: {
            type: 'object',
            example: {
              breadcrumbs: [
                { "id": 1, "name": "Research", "slug": "research-abc123" },
                { "id": 2, "name": "Papers", "slug": "papers-def456" }
              ]
            }
          }
        }
      }
    }
    #swagger.responses[403] = {
      schema: {
        "$ref": "#/definitions/InvalidAPIKey"
      }
    }
    #swagger.responses[404] = {
      description: "Workspace not found"
    }
    */
      try {
        const { slug } = request.params;
        const workspace = await Workspace.get({ slug: String(slug) });
        if (!workspace) {
          response
            .status(404)
            .json({ breadcrumbs: null, message: "Workspace not found" });
          return;
        }

        const ancestors = await Workspace.getAncestors(workspace.id);
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
}

module.exports = { apiWorkspaceHierarchyEndpoints };
