import { useState, useEffect, useCallback } from "react";
import Workspace from "@/models/workspace";

const EXPANDED_STATE_KEY = "anythingllm-workspace-tree-expanded";

/**
 * Hook to manage the workspace tree state (fetch, expand/collapse, refresh).
 */
export default function useWorkspaceTree() {
  const [tree, setTree] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedIds, setExpandedIds] = useState(() => {
    try {
      const stored = localStorage.getItem(EXPANDED_STATE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const fetchTree = useCallback(async () => {
    const tree = await Workspace.getTree();
    setTree(tree);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchTree();
  }, [fetchTree]);

  useEffect(() => {
    try {
      localStorage.setItem(EXPANDED_STATE_KEY, JSON.stringify(expandedIds));
    } catch {
      // localStorage full or unavailable
    }
  }, [expandedIds]);

  const toggleExpanded = useCallback((workspaceId) => {
    setExpandedIds((prev) =>
      prev.includes(workspaceId)
        ? prev.filter((id) => id !== workspaceId)
        : [...prev, workspaceId]
    );
  }, []);

  const isExpanded = useCallback(
    (workspaceId) => expandedIds.includes(workspaceId),
    [expandedIds]
  );

  const expandAll = useCallback(() => {
    const allIds = [];
    function collectIds(nodes) {
      for (const node of nodes) {
        if (node.children?.length > 0) {
          allIds.push(node.id);
          collectIds(node.children);
        }
      }
    }
    collectIds(tree);
    setExpandedIds(allIds);
  }, [tree]);

  const collapseAll = useCallback(() => {
    setExpandedIds([]);
  }, []);

  return {
    tree,
    loading,
    expandedIds,
    toggleExpanded,
    isExpanded,
    expandAll,
    collapseAll,
    refreshTree: fetchTree,
  };
}
