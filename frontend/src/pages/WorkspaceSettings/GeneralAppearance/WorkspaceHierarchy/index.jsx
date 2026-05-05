import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TreeStructure, CaretRight } from "@phosphor-icons/react";
import Workspace from "@/models/workspace";
import paths from "@/utils/paths";

/**
 * Workspace hierarchy section in settings — shows parent, children,
 * and document inheritance toggle controls.
 */
export default function WorkspaceHierarchy({ workspace, onUpdate }) {
  const [children, setChildren] = useState([]);
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [includeChildDocs, setIncludeChildDocs] = useState(
    workspace.includeChildDocs !== false
  );
  const [includeAncestorDocs, setIncludeAncestorDocs] = useState(
    workspace.includeAncestorDocs !== false
  );

  useEffect(() => {
    async function fetchHierarchyData() {
      const [childData, crumbs] = await Promise.all([
        Workspace.getChildren(workspace.slug),
        Workspace.getBreadcrumbs(workspace.slug),
      ]);
      setChildren(childData || []);
      setBreadcrumbs(crumbs || []);
    }
    fetchHierarchyData();
  }, [workspace.slug]);

  const handleToggle = async (field, value) => {
    if (field === "includeChildDocs") setIncludeChildDocs(value);
    if (field === "includeAncestorDocs") setIncludeAncestorDocs(value);
    const { workspace: updated } = await Workspace.update(workspace.slug, {
      [field]: value,
    });
    if (updated && onUpdate) onUpdate(updated);
  };

  const isSubWorkspace = workspace.parentWorkspaceId != null;
  const hasChildren = children.length > 0;

  // Don't show section at all for root workspaces with no children
  if (!isSubWorkspace && !hasChildren) return null;

  return (
    <div className="mt-6 border-t border-theme-sidebar-border pt-6">
      <div className="flex items-center gap-x-2 mb-4">
        <TreeStructure size={20} className="text-theme-text-primary" />
        <h3 className="text-lg font-semibold text-white light:text-slate-900">
          Hierarchy
        </h3>
      </div>

      {/* Breadcrumb path */}
      {breadcrumbs.length > 1 && (
        <div className="mb-4">
          <label className="text-sm text-zinc-400 light:text-slate-500 block mb-1">
            Location
          </label>
          <div className="flex items-center gap-x-1 flex-wrap text-sm">
            {breadcrumbs.map((crumb, idx) => {
              const isLast = idx === breadcrumbs.length - 1;
              return (
                <span key={crumb.slug} className="flex items-center gap-x-1">
                  {idx > 0 && (
                    <CaretRight
                      size={10}
                      className="text-zinc-500 light:text-slate-400"
                    />
                  )}
                  {isLast ? (
                    <span className="text-white light:text-slate-900 font-medium">
                      {crumb.name}
                    </span>
                  ) : (
                    <Link
                      to={paths.workspace.settings.generalAppearance(
                        crumb.slug
                      )}
                      className="text-blue-400 light:text-blue-600 hover:underline"
                    >
                      {crumb.name}
                    </Link>
                  )}
                </span>
              );
            })}
          </div>
        </div>
      )}

      {/* Children list */}
      {hasChildren && (
        <div className="mb-4">
          <label className="text-sm text-zinc-400 light:text-slate-500 block mb-1">
            Sub-workspaces ({children.length})
          </label>
          <div className="flex flex-wrap gap-2">
            {children.map((child) => (
              <Link
                key={child.slug}
                to={paths.workspace.settings.generalAppearance(child.slug)}
                className="text-sm text-blue-400 light:text-blue-600 hover:underline bg-zinc-800 light:bg-slate-100 px-2 py-1 rounded"
              >
                {child.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Document inheritance toggles */}
      <div className="space-y-3">
        <label className="text-sm text-zinc-400 light:text-slate-500 block">
          Document Inheritance
        </label>

        {hasChildren && (
          <ToggleRow
            label="Include sub-workspace documents in RAG searches"
            description="When enabled, this workspace's RAG searches will also include documents from all child workspaces."
            checked={includeChildDocs}
            onChange={(val) => handleToggle("includeChildDocs", val)}
          />
        )}

        {isSubWorkspace && (
          <ToggleRow
            label="Include ancestor workspace documents in RAG searches"
            description="When enabled, this workspace's RAG searches will also include documents from parent workspaces."
            checked={includeAncestorDocs}
            onChange={(val) => handleToggle("includeAncestorDocs", val)}
          />
        )}
      </div>
    </div>
  );
}

function ToggleRow({ label, description, checked, onChange }) {
  return (
    <div className="flex items-start gap-x-3">
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative mt-0.5 flex-shrink-0 inline-flex h-5 w-9 items-center rounded-full transition-colors ${
          checked
            ? "bg-blue-500"
            : "bg-zinc-600 light:bg-slate-300"
        }`}
      >
        <span
          className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
            checked ? "translate-x-[18px]" : "translate-x-[3px]"
          }`}
        />
      </button>
      <div>
        <p className="text-sm text-white light:text-slate-900">{label}</p>
        {description && (
          <p className="text-xs text-zinc-500 light:text-slate-500 mt-0.5">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
