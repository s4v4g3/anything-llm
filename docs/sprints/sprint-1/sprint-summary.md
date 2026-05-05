# Sprint 1 Summary: Nested Sub-Workspaces

**Branch:** `feature/workspace-nesting`  
**Base:** `ce900cb5` (upstream master)  
**Commits:** 6 feature commits  
**Scope:** ~2,750 lines added/modified across 26 files  

---

## Objective

Transform AnythingLLM's flat workspace model into an arbitrarily-nested hierarchy, enabling workspace taxonomy for personal knowledge capture, organization, and retrieval.

---

## What Was Delivered

### Phase 1: Database & Model Layer ✅

- **Schema changes** — Added `parentWorkspaceId`, `path`, `depth`, `includeChildDocs`, `includeAncestorDocs` to `workspaces` table with indexes
- **Workspace model** — 400+ lines of hierarchy methods: `getChildren()`, `getDescendants()`, `getAncestors()`, `getTree()`, `move()`, `deleteWithSubtree()`, `deleteAndPromoteChildren()`, `getEffectiveSettings()`, `getScopeChainSlugs()`, `_buildTreeFromFlatList()`
- **Document model** — `forWorkspaceTree()` queries docs across the full scope chain
- **Migration** — Prisma migration that backfills existing workspaces as root nodes

### Phase 2: Vector DB Layer ✅

- **Scoped similarity search** — `performScopedSimilaritySearch()` in base vector DB provider queries multiple namespaces, merges results, trims to topN
- **Chat handler integration** — `stream.js`, `apiChatHandler.js`, and `embed.js` all use scope chains for RAG queries
- **Zero overhead for flat workspaces** — Falls back to single-namespace search when scope chain has one entry

### Phase 3: API Endpoints ✅

New endpoint file `server/endpoints/workspaceHierarchy.js` (313 lines):

| Endpoint | Purpose |
|----------|---------|
| `POST /workspace/:slug/sub-workspace` | Create child workspace |
| `GET /workspace/:slug/children` | List direct children |
| `GET /workspace/:slug/tree` | Get subtree |
| `GET /workspaces/tree` | Get entire workspace tree |
| `GET /workspace/:slug/breadcrumbs` | Ancestor chain + self |
| `PUT /workspace/:slug/move` | Reparent workspace |
| `DELETE /workspace/:slug/with-children` | Delete with strategy (subtree or promote) |
| `GET /workspace/:slug/effective-settings` | Inherited settings |
| `GET /workspace/:slug/inherited-documents` | Own + inherited docs with source metadata |

Also modified `POST /workspace/new` to accept optional `parentWorkspaceId`.

### Phase 4: Frontend — Sidebar Tree View ✅

- **`useWorkspaceTree` hook** — Fetches tree, manages expand/collapse state (localStorage persisted)
- **`WorkspaceTreeNode`** — Recursive component with indent, chevrons, action buttons (+, upload, settings), right-click context menu
- **`ActiveWorkspaces` rewrite** — Replaced flat drag-drop list with recursive tree
- **Breadcrumb navigation** — `WorkspaceBreadcrumbs` component above chat area
- **Inline sub-workspace creation** — In-tree input field (auto-focus, Enter to submit, Escape to cancel)
- **Sidebar filter/search** — Type-to-filter with recursive tree matching

### Phase 5: Frontend — Document Management ✅

- **`InheritedDocuments` component** — Collapsible section in document panel showing inherited docs grouped by source workspace with navigation links
- **Hierarchy context** — Document panel header shows workspace path for sub-workspaces
- **Frontend API methods** — `getInheritedDocuments()`, `getTree()`, `getChildren()`, `getBreadcrumbs()`, `newSubWorkspace()`, `moveWorkspace()`, `deleteWithChildren()`

### Phase 6/7: Polish ✅

- **Breadcrumb positioning** — Fixed overlap with model selector (absolute positioning below)
- **Workspace settings hierarchy section** — Shows location breadcrumb, child workspace links, and document inheritance toggles (includeChildDocs / includeAncestorDocs)
- **Test reliability** — Timestamp-prefixed workspace names to prevent slug collisions between test suites

---

## Test Coverage

**35 tests** across 2 test suites:

- `workspace.test.js` (21 tests) — Hierarchy creation, getChildren, getDescendants, getAncestors, getTree, getEffectiveSettings, getScopeChainSlugs, _buildTreeFromFlatList
- `workspaceHierarchy.test.js` (14 tests) — Move (with circular ref prevention), deleteWithSubtree, deleteAndPromoteChildren, field validation/coercion

---

## Intentionally Skipped / Deferred

| Item | Reason |
|------|--------|
| **Drag-drop reparenting** | Core reparenting works via API and context menu. Drag-drop UX adds complexity and can be layered in later without architecture changes. |
| **Bulk operations** (multi-select move/delete) | Single-item operations cover the primary workflow. Bulk is additive. |
| **Export/import subtree** | Nice-to-have for portability; no architectural dependency. |
| **Lazy-load deep branches** | Only matters at scale (100s of workspaces). Current tree fetch is fine for personal use. |
| **Access control inheritance** | Designed for but not enforced in middleware yet. Multi-user permission cascading is complex and the single-user case (primary target) doesn't need it. |
| **Swagger/API documentation** | Endpoints are implemented and tested but OpenAPI specs not updated. |
| **Document count badges** on tree nodes | Visual enhancement, no functional impact. |
| **Depth limit enforcement in UI** | Plan calls for 10-level display cap; not enforced since organic use is unlikely to exceed this. |

---

## Architecture Decisions Validated

1. **Hybrid adjacency + materialized path** — Works well. `parentWorkspaceId` for direct lookups, `path LIKE` for subtree queries. No recursive CTEs needed.
2. **Query-time scope resolution** — Documents stay in their own workspace's vector namespace. Hierarchy is resolved at search time, not embed time. Clean separation.
3. **Per-workspace inheritance toggles** — Both `includeChildDocs` and `includeAncestorDocs` default to true but can be independently toggled per workspace.
4. **Backward compatible** — All existing workspaces function identically. They're root nodes with `depth=0`, `path=/slug`, and inheritance toggles default ON (which is a no-op for root workspaces with no children).

---

## Key Files

| File | Role |
|------|------|
| `server/prisma/schema.prisma` | Schema with hierarchy fields |
| `server/models/workspace.js` | Core hierarchy logic (403 lines added) |
| `server/models/documents.js` | `forWorkspaceTree()` |
| `server/endpoints/workspaceHierarchy.js` | All hierarchy REST endpoints |
| `server/utils/vectorDbProviders/base.js` | `performScopedSimilaritySearch()` |
| `server/utils/chats/stream.js` | Scoped RAG integration |
| `frontend/src/hooks/useWorkspaceTree.js` | Tree state management |
| `frontend/src/components/Sidebar/ActiveWorkspaces/index.jsx` | Tree rendering + filter |
| `frontend/src/components/Sidebar/ActiveWorkspaces/WorkspaceTreeNode/index.jsx` | Recursive node + inline create |
| `frontend/src/components/WorkspaceChat/ChatContainer/WorkspaceBreadcrumbs/index.jsx` | Breadcrumb nav |
| `frontend/src/components/Modals/ManageWorkspace/Documents/WorkspaceDirectory/InheritedDocuments/index.jsx` | Inherited doc display |
| `frontend/src/pages/WorkspaceSettings/GeneralAppearance/WorkspaceHierarchy/index.jsx` | Settings panel |
