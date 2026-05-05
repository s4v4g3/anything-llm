# Nested Sub-Workspaces: Implementation Plan

## Overview

Add arbitrarily-nested sub-workspaces to AnythingLLM, transforming the flat workspace model into a hierarchical tree structure suitable for personal knowledge taxonomy, organization, and retrieval.

---

## Design Decisions (To Confirm Before Starting)

These choices affect the implementation at every layer. We should lock these in first:

| Decision | Options | Decided |
|----------|---------|---------|
| **Tree storage strategy** | Adjacency list (parentId) vs. Materialized path (`/root/child/grandchild`) vs. Closure table | **Hybrid: adjacency list + materialized path** — `parentWorkspaceId` FK for direct parent/child queries, `path` column for subtree queries. Works identically on SQLite and PostgreSQL. |
| **Document inheritance (downward)** | Parent workspace searches include descendant docs? | **Per-workspace toggle, default ON** — parent searches include all descendant workspace docs |
| **Document inheritance (upward)** | Child workspace searches include ancestor docs? | **Per-workspace toggle, default ON** — child searches include docs from direct ancestor chain (never siblings) |
| **Settings inheritance** | Child inherits parent's LLM/embedding config? | **Yes, with override** — child defaults to parent settings but can override any field |
| **Access control inheritance** | Access to parent = access to children? | **Yes, cascading down** — explicit deny possible at child level |
| **Depth limit** | Unlimited vs. capped | **No backend/data model limit** — UI enforces a practical display limit of 10 levels; headless/API use is unlimited |
| **Vector namespace strategy** | Flat slugs vs. path-based | **Path-based**: `parent-slug/child-slug/grandchild-slug` |
| **Database engine** | SQLite vs. PostgreSQL | **Support both** (project already has both wired up). PostgreSQL recommended for serious long-term use. |

---

## Phase 1: Database & Model Layer

**Goal**: The data model supports hierarchy. No UI or API changes yet.

### Tasks

1. **Schema migration** — Add fields to `workspaces` table:
   - `parentWorkspaceId Int?` — self-referential FK (nullable = root workspace)
   - `path String` — materialized path (e.g., `/research/papers/ml`)
   - `depth Int @default(0)` — cached depth for quick queries
   - Add index on `parentWorkspaceId` and `path`

2. **Update Workspace model** (`server/models/workspace.js`):
   - `getChildren(workspaceId)` — direct children
   - `getDescendants(workspaceId)` — all descendants (using `path LIKE 'prefix%'`)
   - `getAncestors(workspaceId)` — breadcrumb chain to root
   - `getTree(rootId?)` — full tree or subtree
   - `move(workspaceId, newParentId)` — reparent (update path for entire subtree)
   - Modify `new()` to accept `parentWorkspaceId`, compute path/depth
   - Modify `delete()` to handle recursive deletion of subtree
   - Add `getEffectiveSettings(workspaceId)` — walk up tree merging settings

3. **Update Document model** — Add helper:
   - `forWorkspaceTree(workspaceId)` — get docs for workspace + all descendants (for inherited RAG)

4. **Migration script** — Backfill `path` and `depth` for existing workspaces (all root-level, `depth=0`, `path=/slug`)

5. **Tests** — Unit tests for tree operations, path computation, reparenting

---

## Phase 2: Vector DB Layer

**Goal**: RAG searches can span the workspace's scope chain (ancestors + descendants) based on per-workspace settings.

### Tasks

1. **Namespace strategy update** — When embedding documents, use the workspace's own slug as namespace (unchanged behavior). The hierarchy is handled at query time, not storage time.

2. **Multi-namespace search** (`server/utils/vectorDbProviders/`):
   - Add `performScopedSimilaritySearch()` — accepts an array of namespace slugs (from `Workspace.getScopeChainSlugs()`)
   - Implementation: query each namespace in the scope chain, merge and re-rank results
   - Respect `topN` and `similarityThreshold` across merged results
   - Falls back to single-namespace search when scope chain has only one entry (no overhead for flat workspaces)

3. **Update chat handler** (`server/utils/chats/stream.js`):
   - Use `Workspace.getScopeChainSlugs(workspace)` to determine search scope
   - If scope chain length > 1, use scoped search; otherwise use existing single-namespace search
   - Both `includeChildDocs` and `includeAncestorDocs` settings are already on the workspace object

4. **Tests** — Integration tests with LanceDB (local, no external deps)

---

## Phase 3: API Endpoints

**Goal**: Full CRUD for sub-workspaces via REST API.

### Tasks

1. **New endpoints** (`server/endpoints/workspaces.js`):
   - `POST /workspace/:slug/sub-workspace` — create child workspace
   - `GET /workspace/:slug/children` — list direct children
   - `GET /workspace/:slug/tree` — get full subtree
   - `GET /workspaces/tree` — get entire workspace tree (replaces flat list for new UI)
   - `PUT /workspace/:slug/move` — reparent workspace
   - `GET /workspace/:slug/breadcrumbs` — ancestor chain

2. **Modify existing endpoints**:
   - `GET /workspaces` — add `?tree=true` query param option
   - `DELETE /workspace/:slug` — confirm recursive delete behavior, add `?recursive=true` param
   - `POST /workspace/new` — accept optional `parentWorkspaceId` in body

3. **Access control updates** (`server/middleware/`):
   - Validate user has access to parent when accessing child
   - On permission check, walk up tree to find grant

4. **API documentation** — Update Swagger specs

---

## Phase 4: Frontend — Sidebar Tree View

**Goal**: Replace flat workspace list with a navigable tree.

### Tasks

1. **Tree data structure** — New hook `useWorkspaceTree()`:
   - Fetches `/workspaces/tree`
   - Manages expand/collapse state (persisted in localStorage)
   - Handles drag-drop for reordering AND reparenting

2. **Recursive workspace component**:
   - Replace `ActiveWorkspaces` flat list with recursive `WorkspaceTreeNode`
   - Indent children, show expand/collapse chevrons
   - Show document count badge per node
   - Context menu: "New Sub-Workspace", "Move", "Delete"

3. **Breadcrumb navigation**:
   - Show breadcrumb trail above chat area: `Research > Papers > ML`
   - Each breadcrumb segment is clickable

4. **"New Sub-Workspace" flow**:
   - Right-click workspace → "New Sub-Workspace"
   - Or button within workspace settings
   - Modal with name input (inherits parent settings by default)

5. **Workspace settings panel update**:
   - Show parent workspace (with link)
   - Show children list
   - Toggle: "Include sub-workspace documents in RAG searches"
   - "Move workspace" action

6. **Drag-drop reparenting**:
   - Drag a workspace onto another to make it a child
   - Visual drop indicator (indent highlight)
   - Confirmation dialog for reparenting

---

## Phase 5: Frontend — Document Management

**Goal**: Document upload and management works cleanly with hierarchy.

### Tasks

1. **Document panel updates**:
   - When viewing a parent workspace with inheritance enabled, show child docs (grayed/grouped by source workspace)
   - Clear visual distinction between "my documents" and "inherited documents"

2. **Upload targeting**:
   - Upload dialog shows current workspace name clearly
   - Option to upload to a child workspace from parent view

---

## Phase 6: Polish & Edge Cases

### Tasks

1. **Search/filter workspaces** — With many nested workspaces, add a search/filter box in sidebar
2. **Bulk operations** — Move multiple workspaces, bulk delete subtree
3. **Export/import** — Export a subtree as a portable unit
4. **Performance** — Lazy-load deep tree branches, paginate large sibling lists
5. **Mobile/embed** — Ensure embedded chat widget handles workspace hierarchy gracefully

---

## Implementation Order & Dependencies

```
Phase 1 (DB/Model) ──→ Phase 2 (Vector) ──→ Phase 3 (API) ──→ Phase 4 (Frontend Sidebar)
                                                            └──→ Phase 5 (Frontend Docs)
                                                                         └──→ Phase 6 (Polish)
```

Phases 4 and 5 can proceed in parallel once the API is ready.

---

## File Impact Map

| File/Area | Change Type |
|-----------|-------------|
| `server/prisma/schema.prisma` | Modify (add fields) |
| `server/prisma/migrations/` | New migration |
| `server/models/workspace.js` | Heavy modification |
| `server/models/documents.js` | Light modification |
| `server/endpoints/workspaces.js` | Heavy modification |
| `server/utils/vectorDbProviders/base.js` | Moderate modification |
| `server/utils/chats/stream.js` | Light modification |
| `frontend/src/models/workspace.js` | Moderate modification |
| `frontend/src/components/Sidebar/ActiveWorkspaces/` | Replace/rewrite |
| `frontend/src/pages/WorkspaceSettings/` | Moderate modification |
| New: `frontend/src/components/Sidebar/WorkspaceTree/` | New component(s) |
| New: `frontend/src/hooks/useWorkspaceTree.js` | New hook |

---

## Risk Mitigation

| Risk | Mitigation |
|------|-----------|
| Upstream merge conflicts | Keep changes in clearly-separated files where possible; use new files for tree logic |
| SQLite recursive query performance | Materialized path avoids recursive CTEs; `path LIKE 'prefix%'` is index-friendly |
| UI complexity explosion | Start with 3-level nesting max in UI, expand later |
| Breaking existing workspaces | Migration backfills all existing workspaces as root nodes — zero behavior change for existing data |
| Vector DB provider compatibility | Multi-namespace search is just multiple single-namespace searches merged — no provider API changes needed |

---

## Success Criteria

- [ ] Existing workspaces continue to work identically (backward compatible)
- [ ] Can create workspaces nested at least 5 levels deep
- [ ] Documents in a child workspace are isolated by default
- [ ] Parent workspace can opt-in to searching child workspace documents
- [ ] Sidebar displays tree with expand/collapse
- [ ] Reparenting a workspace updates all paths correctly
- [ ] Deleting a parent offers choice: delete subtree or promote children to root
- [ ] Access control respects hierarchy (parent access → child access)
