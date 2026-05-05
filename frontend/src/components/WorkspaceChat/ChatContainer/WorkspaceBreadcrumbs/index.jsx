import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CaretRight } from "@phosphor-icons/react";
import Workspace from "@/models/workspace";
import paths from "@/utils/paths";

/**
 * Breadcrumb navigation showing the workspace hierarchy path.
 * Only renders when the workspace has ancestors (i.e., is a sub-workspace).
 */
export default function WorkspaceBreadcrumbs({ workspace }) {
  const [breadcrumbs, setBreadcrumbs] = useState([]);

  useEffect(() => {
    if (!workspace?.slug) return;
    async function fetchBreadcrumbs() {
      const crumbs = await Workspace.getBreadcrumbs(workspace.slug);
      setBreadcrumbs(crumbs);
    }
    fetchBreadcrumbs();
  }, [workspace?.slug]);

  // Don't render if no ancestors (root workspace or loading)
  if (breadcrumbs.length <= 1) return null;

  return (
    <nav
      aria-label="Workspace breadcrumbs"
      className="absolute top-9 md:top-9 left-0 right-0 z-10 flex items-center gap-x-1 px-4 py-1 text-xs text-zinc-400 light:text-slate-500 bg-zinc-900/80 light:bg-slate-50/90 backdrop-blur-sm"
    >
      {breadcrumbs.map((crumb, idx) => {
        const isLast = idx === breadcrumbs.length - 1;
        return (
          <span key={crumb.slug} className="flex items-center gap-x-1">
            {idx > 0 && (
              <CaretRight size={10} className="text-zinc-500 light:text-slate-400" />
            )}
            {isLast ? (
              <span className="text-zinc-200 light:text-slate-700 font-medium">
                {crumb.name}
              </span>
            ) : (
              <Link
                to={paths.workspace.chat(crumb.slug)}
                className="hover:text-white light:hover:text-slate-900 transition-colors"
              >
                {crumb.name}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
