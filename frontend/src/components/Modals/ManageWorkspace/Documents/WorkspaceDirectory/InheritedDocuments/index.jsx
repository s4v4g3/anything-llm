import { useEffect, useState } from "react";
import { TreeStructure } from "@phosphor-icons/react";
import Workspace from "@/models/workspace";
import { middleTruncate } from "@/utils/directories";
import { Link } from "react-router-dom";
import paths from "@/utils/paths";

/**
 * Shows inherited documents from ancestor/descendant workspaces
 * when document inheritance is enabled. Read-only display — documents
 * can only be managed in their source workspace.
 */
export default function InheritedDocuments({ workspace }) {
  const [inheritedDocs, setInheritedDocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (!workspace?.slug) return;
    async function fetchInherited() {
      const { inheritedDocuments } = await Workspace.getInheritedDocuments(
        workspace.slug
      );
      setInheritedDocs(inheritedDocuments || []);
      setLoading(false);
    }
    fetchInherited();
  }, [workspace?.slug]);

  if (loading || inheritedDocs.length === 0) return null;

  // Group by source workspace
  const grouped = inheritedDocs.reduce((acc, doc) => {
    const key = doc.sourceWorkspace?.slug || "unknown";
    if (!acc[key]) acc[key] = { workspace: doc.sourceWorkspace, docs: [] };
    acc[key].docs.push(doc);
    return acc;
  }, {});

  return (
    <div className="mt-3 w-[560px]">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-x-2 text-xs text-zinc-400 light:text-slate-500 hover:text-white light:hover:text-slate-700 transition-colors mb-2"
      >
        <TreeStructure size={14} />
        <span>
          {expanded ? "Hide" : "Show"} inherited documents ({inheritedDocs.length})
        </span>
      </button>

      {expanded && (
        <div className="bg-theme-settings-input-bg/50 rounded-xl border border-theme-modal-border/50 overflow-hidden">
          {Object.values(grouped).map(({ workspace: srcWs, docs }) => (
            <div key={srcWs.slug} className="border-b border-white/5 last:border-b-0">
              <div className="flex items-center gap-x-2 px-3 py-1.5 bg-white/5 light:bg-slate-100">
                <TreeStructure size={12} className="text-zinc-500 light:text-slate-400" />
                <Link
                  to={paths.workspace.chat(srcWs.slug)}
                  className="text-xs font-medium text-zinc-300 light:text-slate-600 hover:text-white light:hover:text-slate-900 transition-colors"
                >
                  {srcWs.name}
                </Link>
                <span className="text-xs text-zinc-500 light:text-slate-400">
                  ({docs.length} doc{docs.length !== 1 ? "s" : ""})
                </span>
              </div>
              <div className="divide-y divide-white/5">
                {docs.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center gap-x-2 px-4 py-1.5 text-xs text-zinc-400 light:text-slate-500"
                  >
                    <span className="opacity-50">↳</span>
                    <span className="truncate">
                      {middleTruncate(
                        doc.docpath?.split("/").pop()?.replace(/-[a-f0-9-]{36}\.json$/, "") || doc.docpath,
                        45
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
