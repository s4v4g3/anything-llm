import React, { useState, useEffect } from "react";
import * as Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Workspace from "@/models/workspace";
import ManageWorkspace, {
  useManageWorkspaceModal,
} from "../../Modals/ManageWorkspace";
import paths from "@/utils/paths";
import { useParams, useMatch } from "react-router-dom";
import useUser from "@/hooks/useUser";
import useWorkspaceTree from "@/hooks/useWorkspaceTree";
import WorkspaceTreeNode from "./WorkspaceTreeNode";
import showToast from "@/utils/toast";
import { LAST_VISITED_WORKSPACE } from "@/utils/constants";
import { safeJsonParse } from "@/utils/request";

export default function ActiveWorkspaces() {
  const { slug } = useParams();
  const [selectedWs, setSelectedWs] = useState(null);
  const { showing, showModal, hideModal } = useManageWorkspaceModal();
  const { user } = useUser();
  const isInWorkspaceSettings = !!useMatch("/workspace/:slug/settings/:tab");
  const isHomePage = !!useMatch("/");
  const {
    tree,
    loading,
    isExpanded,
    toggleExpanded,
    refreshTree,
  } = useWorkspaceTree();

  if (loading) {
    return (
      <Skeleton.default
        height={36}
        width="100%"
        count={5}
        baseColor="var(--theme-sidebar-item-default)"
        highlightColor="var(--theme-sidebar-item-hover)"
        enableAnimation={true}
        className="my-1"
      />
    );
  }

  // Resolve active workspace slug
  const activeSlug = (() => {
    if (slug) return slug;
    if (!isHomePage || tree.length === 0) return null;
    const lastVisited = safeJsonParse(
      localStorage.getItem(LAST_VISITED_WORKSPACE)
    );
    // Find workspace in tree by slug (flat search)
    function findSlugInTree(nodes, targetSlug) {
      for (const node of nodes) {
        if (node.slug === targetSlug) return true;
        if (node.children?.length && findSlugInTree(node.children, targetSlug))
          return true;
      }
      return false;
    }
    if (lastVisited?.slug && findSlugInTree(tree, lastVisited.slug))
      return lastVisited.slug;
    return tree[0]?.slug ?? null;
  })();

  const handleCreateSubWorkspace = async (parentWorkspace) => {
    const name = window.prompt(
      `Create a sub-workspace under "${parentWorkspace.name}":`
    );
    if (!name || !name.trim()) return;
    const { workspace, message } = await Workspace.newSubWorkspace(
      parentWorkspace.slug,
      { name: name.trim() }
    );
    if (workspace) {
      showToast(`Created "${workspace.name}"`, "success");
      refreshTree();
    } else {
      showToast(message || "Failed to create sub-workspace", "error");
    }
  };

  const handleManageWorkspace = (workspace) => {
    setSelectedWs(workspace);
    showModal();
  };

  return (
    <div role="tree" aria-label="Workspaces" className="flex flex-col gap-y-1">
      {tree.map((workspace) => (
        <WorkspaceTreeNode
          key={workspace.id}
          workspace={workspace}
          depth={0}
          isExpanded={isExpanded}
          toggleExpanded={toggleExpanded}
          onCreateSubWorkspace={handleCreateSubWorkspace}
          onManageWorkspace={handleManageWorkspace}
          activeSlug={activeSlug}
          isInWorkspaceSettings={isInWorkspaceSettings}
        />
      ))}
      {showing && (
        <ManageWorkspace
          hideModal={hideModal}
          providedSlug={selectedWs ? selectedWs.slug : null}
        />
      )}
    </div>
  );
}

