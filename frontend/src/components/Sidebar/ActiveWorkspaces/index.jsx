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
  const [creatingUnder, setCreatingUnder] = useState(null); // workspace being given a new child
  const [filterText, setFilterText] = useState("");
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
    // Show inline input field under this workspace
    setCreatingUnder(parentWorkspace.id);
    // Ensure the parent is expanded so the inline input is visible
    if (!isExpanded(parentWorkspace.id)) toggleExpanded(parentWorkspace.id);
  };

  const handleSubmitNewSubWorkspace = async (parentWorkspace, name) => {
    setCreatingUnder(null);
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

  // Filter tree recursively — keep nodes that match or have matching descendants
  const filteredTree = filterText.trim()
    ? filterTreeNodes(tree, filterText.trim().toLowerCase())
    : tree;

  const showFilter = tree.length > 3 || tree.some((w) => w.children?.length > 0);

  return (
    <div role="tree" aria-label="Workspaces" className="flex flex-col gap-y-1">
      {showFilter && (
        <div className="px-1 mb-1">
          <input
            type="text"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            placeholder="Filter workspaces..."
            className="w-full bg-zinc-800 light:bg-slate-100 text-white light:text-slate-900 text-xs px-2 py-1.5 rounded border border-zinc-700 light:border-slate-300 focus:border-blue-500 focus:outline-none placeholder:text-zinc-500 light:placeholder:text-slate-400"
          />
        </div>
      )}
      {filteredTree.map((workspace) => (
        <WorkspaceTreeNode
          key={workspace.id}
          workspace={workspace}
          depth={0}
          isExpanded={isExpanded}
          toggleExpanded={toggleExpanded}
          onCreateSubWorkspace={handleCreateSubWorkspace}
          onSubmitNewSubWorkspace={handleSubmitNewSubWorkspace}
          creatingUnder={creatingUnder}
          onCancelCreate={() => setCreatingUnder(null)}
          onManageWorkspace={handleManageWorkspace}
          activeSlug={activeSlug}
          isInWorkspaceSettings={isInWorkspaceSettings}
        />
      ))}
      {filteredTree.length === 0 && filterText.trim() && (
        <p className="text-zinc-500 light:text-slate-400 text-xs px-2 py-1">
          No workspaces match "{filterText}"
        </p>
      )}
      {showing && (
        <ManageWorkspace
          hideModal={hideModal}
          providedSlug={selectedWs ? selectedWs.slug : null}
        />
      )}
    </div>
  );
}

/**
 * Recursively filter tree nodes — keeps a node if it or any descendant matches.
 * Preserved descendants are also filtered so only matching branches show.
 */
function filterTreeNodes(nodes, query) {
  const results = [];
  for (const node of nodes) {
    const nameMatches = node.name.toLowerCase().includes(query);
    const filteredChildren = node.children?.length
      ? filterTreeNodes(node.children, query)
      : [];
    if (nameMatches || filteredChildren.length > 0) {
      results.push({
        ...node,
        children: nameMatches ? node.children : filteredChildren,
      });
    }
  }
  return results;
}
