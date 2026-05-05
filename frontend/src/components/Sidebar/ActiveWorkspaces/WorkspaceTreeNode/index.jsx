import React, { useState, useRef, useEffect } from "react";
import { Link, useParams, useMatch, useNavigate } from "react-router-dom";
import {
  CaretRight,
  CaretDown,
  Plus,
  GearSix,
  UploadSimple,
  TreeStructure,
} from "@phosphor-icons/react";
import paths from "@/utils/paths";
import ThreadContainer from "../ThreadContainer";
import useUser from "@/hooks/useUser";

/**
 * Recursive tree node component for workspace hierarchy in the sidebar.
 * Each node can expand/collapse to show children and renders threads when active.
 */
export default function WorkspaceTreeNode({
  workspace,
  depth = 0,
  isExpanded,
  toggleExpanded,
  onCreateSubWorkspace,
  onSubmitNewSubWorkspace,
  creatingUnder,
  onCancelCreate,
  onManageWorkspace,
  activeSlug,
  isInWorkspaceSettings,
}) {
  const navigate = useNavigate();
  const { user } = useUser();
  const hasChildren = workspace.children && workspace.children.length > 0;
  const expanded = isExpanded(workspace.id);
  const isActive = workspace.slug === activeSlug;
  const [showContextMenu, setShowContextMenu] = useState(false);
  const contextMenuRef = useRef(null);

  // Close context menu on outside click
  useEffect(() => {
    if (!showContextMenu) return;
    function handleClick(e) {
      if (contextMenuRef.current && !contextMenuRef.current.contains(e.target))
        setShowContextMenu(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [showContextMenu]);

  const indentPx = depth * 16;

  return (
    <div className="flex flex-col w-full" role="treeitem" aria-expanded={hasChildren ? expanded : undefined}>
      <div
        className={`flex items-center gap-x-1 group w-full rounded-[4px] py-[4px] pr-[6px] transition-all duration-150
          ${isActive ? "bg-theme-sidebar-item-default light:bg-blue-200 font-bold" : "hover:bg-theme-sidebar-subitem-hover light:hover:bg-slate-300"}
        `}
        style={{ paddingLeft: `${4 + indentPx}px` }}
        onContextMenu={(e) => {
          e.preventDefault();
          if (user?.role !== "default") setShowContextMenu(true);
        }}
      >
        {/* Expand/collapse chevron */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (hasChildren) toggleExpanded(workspace.id);
          }}
          className={`flex-shrink-0 w-[18px] h-[18px] flex items-center justify-center rounded hover:bg-white/10 ${
            hasChildren ? "cursor-pointer" : "cursor-default opacity-0"
          }`}
          aria-label={expanded ? "Collapse" : "Expand"}
          tabIndex={hasChildren ? 0 : -1}
        >
          {hasChildren &&
            (expanded ? (
              <CaretDown size={12} className="text-white light:text-slate-600" weight="bold" />
            ) : (
              <CaretRight size={12} className="text-white light:text-slate-600" weight="bold" />
            ))}
        </button>

        {/* Workspace name link */}
        <Link
          to={paths.workspace.chat(workspace.slug)}
          className="flex-grow min-w-0 flex items-center gap-x-1 overflow-hidden"
        >
          {hasChildren && (
            <TreeStructure
              size={14}
              className={`flex-shrink-0 ${isActive ? "text-white light:text-blue-800" : "text-zinc-400 light:text-slate-500"}`}
            />
          )}
          <p
            className={`text-[13px] leading-loose whitespace-nowrap overflow-hidden truncate
              ${isActive ? "font-bold text-white light:text-blue-900" : "font-medium text-white light:text-slate-700"}
            `}
            title={workspace.name}
          >
            {workspace.name}
          </p>
        </Link>

        {/* Action buttons */}
        {user?.role !== "default" && (
          <div
            className={`flex items-center gap-x-[2px] flex-shrink-0 transition-opacity duration-200 ${
              isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
            }`}
          >
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onCreateSubWorkspace(workspace);
              }}
              title="New sub-workspace"
              className="rounded-md flex items-center justify-center p-[2px] hover:bg-zinc-500 light:hover:bg-slate-400"
            >
              <Plus
                size={16}
                className="text-zinc-400 hover:text-white light:text-slate-600 light:hover:text-slate-950"
              />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onManageWorkspace(workspace);
              }}
              title="Upload documents"
              className="rounded-md flex items-center justify-center p-[2px] hover:bg-zinc-500 light:hover:bg-slate-400"
            >
              <UploadSimple
                size={16}
                className={`${isActive ? "text-zinc-400 hover:text-white light:text-blue-700" : "text-zinc-400 hover:text-white light:text-slate-600"}`}
              />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                navigate(
                  isInWorkspaceSettings
                    ? paths.workspace.chat(workspace.slug)
                    : paths.workspace.settings.generalAppearance(workspace.slug)
                );
              }}
              title="Workspace settings"
              className="rounded-md flex items-center justify-center p-[2px] hover:bg-zinc-500 light:hover:bg-slate-400"
            >
              <GearSix
                size={16}
                color={
                  isInWorkspaceSettings && workspace.slug === activeSlug
                    ? "#46C8FF"
                    : undefined
                }
                className="text-zinc-400 hover:text-white light:text-slate-600"
              />
            </button>
          </div>
        )}
      </div>

      {/* Context menu */}
      {showContextMenu && (
        <div
          ref={contextMenuRef}
          className="absolute z-50 bg-theme-bg-secondary border border-theme-sidebar-border rounded-md shadow-lg py-1 text-sm text-white"
          style={{ marginLeft: `${indentPx + 20}px` }}
        >
          <button
            className="w-full text-left px-3 py-1.5 hover:bg-theme-sidebar-subitem-hover"
            onClick={() => {
              setShowContextMenu(false);
              onCreateSubWorkspace(workspace);
            }}
          >
            New Sub-Workspace
          </button>
          <button
            className="w-full text-left px-3 py-1.5 hover:bg-theme-sidebar-subitem-hover"
            onClick={() => {
              setShowContextMenu(false);
              navigate(paths.workspace.settings.generalAppearance(workspace.slug));
            }}
          >
            Settings
          </button>
        </div>
      )}

      {/* Active workspace threads */}
      {isActive && (
        <div style={{ paddingLeft: `${indentPx + 18}px` }}>
          <ThreadContainer workspace={workspace} isActive={isActive} />
        </div>
      )}

      {/* Children (recursive) */}
      {hasChildren && expanded && (
        <div role="group" className="flex flex-col">
          {workspace.children.map((child) => (
            <WorkspaceTreeNode
              key={child.id}
              workspace={child}
              depth={depth + 1}
              isExpanded={isExpanded}
              toggleExpanded={toggleExpanded}
              onCreateSubWorkspace={onCreateSubWorkspace}
              onSubmitNewSubWorkspace={onSubmitNewSubWorkspace}
              creatingUnder={creatingUnder}
              onCancelCreate={onCancelCreate}
              onManageWorkspace={onManageWorkspace}
              activeSlug={activeSlug}
              isInWorkspaceSettings={isInWorkspaceSettings}
            />
          ))}
        </div>
      )}

      {/* Inline input for new sub-workspace */}
      {creatingUnder === workspace.id && (
        <InlineNewWorkspaceInput
          depth={depth + 1}
          onSubmit={(name) => onSubmitNewSubWorkspace(workspace, name)}
          onCancel={onCancelCreate}
        />
      )}
    </div>
  );
}

/**
 * Inline input that appears in the tree for creating a new sub-workspace.
 * Auto-focuses, submits on Enter, cancels on Escape or blur with empty value.
 */
function InlineNewWorkspaceInput({ depth, onSubmit, onCancel }) {
  const inputRef = useRef(null);
  const [value, setValue] = useState("");

  useEffect(() => {
    // Small delay to ensure DOM is rendered before focusing
    const timer = setTimeout(() => inputRef.current?.focus(), 50);
    return () => clearTimeout(timer);
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSubmit(value);
    } else if (e.key === "Escape") {
      e.preventDefault();
      onCancel();
    }
  };

  const handleBlur = () => {
    if (value.trim()) {
      onSubmit(value);
    } else {
      onCancel();
    }
  };

  const indentPx = depth * 16;

  return (
    <div
      className="flex items-center gap-x-1 w-full py-[3px]"
      style={{ paddingLeft: `${4 + indentPx + 18}px` }}
    >
      <Plus size={12} className="text-zinc-500 flex-shrink-0" />
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        placeholder="Workspace name..."
        className="flex-grow min-w-0 bg-zinc-700 light:bg-slate-200 text-white light:text-slate-900 text-[13px] px-2 py-[2px] rounded border border-zinc-600 light:border-slate-300 focus:border-blue-500 focus:outline-none placeholder:text-zinc-500 light:placeholder:text-slate-400"
      />
    </div>
  );
}
