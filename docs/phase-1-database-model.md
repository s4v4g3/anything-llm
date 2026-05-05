# Phase 1: Database & Model Layer — Detailed Spec

## Schema Changes

### Migration: `add_workspace_hierarchy`

```prisma
model workspaces {
  // ... existing fields ...

  // NEW: Hierarchy fields
  parentWorkspaceId  Int?
  path               String    @default("/")
  depth              Int       @default(0)

  // Self-referential relation
  parentWorkspace    workspaces?  @relation("WorkspaceHierarchy", fields: [parentWorkspaceId], references: [id], onDelete: SetNull)
  childWorkspaces    workspaces[] @relation("WorkspaceHierarchy")

  // ... existing relations ...
}
```

### Index additions
```prisma
@@index([parentWorkspaceId])
@@index([path])
@@index([depth])
```

### Migration SQL (SQLite)
```sql
ALTER TABLE workspaces ADD COLUMN parentWorkspaceId INTEGER REFERENCES workspaces(id) ON DELETE SET NULL;
ALTER TABLE workspaces ADD COLUMN path TEXT NOT NULL DEFAULT '/';
ALTER TABLE workspaces ADD COLUMN depth INTEGER NOT NULL DEFAULT 0;
CREATE INDEX idx_workspaces_parent ON workspaces(parentWorkspaceId);
CREATE INDEX idx_workspaces_path ON workspaces(path);
```

### Backfill script
```sql
-- All existing workspaces become root nodes
UPDATE workspaces SET path = '/' || slug, depth = 0 WHERE path = '/';
```

---

## Path Convention

- Root workspace with slug `research`: path = `/research`
- Child with slug `papers` under `research`: path = `/research/papers`
- Grandchild `ml` under `papers`: path = `/research/papers/ml`
- Path is always absolute from root, using slugs as segments
- Computed on create, updated on reparent (must update entire subtree)

---

## Model Methods: `server/models/workspace.js`

### `new(name, creatorId, parentWorkspaceId = null)`

```javascript
new: async function (name, creatorId, parentWorkspaceId = null) {
  const slug = slugify(name, { lower: true, strict: true });
  // Handle slug collisions (existing logic)
  
  let path, depth;
  if (parentWorkspaceId) {
    const parent = await prisma.workspaces.findUnique({
      where: { id: parentWorkspaceId },
      select: { path: true, depth: true }
    });
    if (!parent) throw new Error("Parent workspace not found");
    if (parent.depth >= 10) throw new Error("Maximum nesting depth reached");
    path = `${parent.path}/${slug}`;
    depth = parent.depth + 1;
  } else {
    path = `/${slug}`;
    depth = 0;
  }

  const workspace = await prisma.workspaces.create({
    data: { name, slug, path, depth, parentWorkspaceId }
  });
  return workspace;
}
```

### `getChildren(workspaceId)`
```javascript
getChildren: async function (workspaceId) {
  return await prisma.workspaces.findMany({
    where: { parentWorkspaceId: workspaceId },
    orderBy: { name: 'asc' }
  });
}
```

### `getDescendants(workspaceId)`
```javascript
getDescendants: async function (workspaceId) {
  const workspace = await prisma.workspaces.findUnique({
    where: { id: workspaceId },
    select: { path: true }
  });
  if (!workspace) return [];
  
  // Materialized path query: find all workspaces whose path starts with this one
  return await prisma.workspaces.findMany({
    where: {
      path: { startsWith: `${workspace.path}/` },
      id: { not: workspaceId }  // exclude self
    },
    orderBy: { path: 'asc' }
  });
}
```

### `getAncestors(workspaceId)`
```javascript
getAncestors: async function (workspaceId) {
  const workspace = await prisma.workspaces.findUnique({
    where: { id: workspaceId },
    select: { path: true }
  });
  if (!workspace) return [];
  
  // Build all ancestor paths from materialized path
  const segments = workspace.path.split('/').filter(Boolean);
  const ancestorPaths = [];
  for (let i = 1; i < segments.length; i++) {
    ancestorPaths.push('/' + segments.slice(0, i).join('/'));
  }
  
  if (ancestorPaths.length === 0) return [];
  
  return await prisma.workspaces.findMany({
    where: { path: { in: ancestorPaths } },
    orderBy: { depth: 'asc' }
  });
}
```

### `getTree(rootId = null)`
```javascript
getTree: async function (rootId = null) {
  let workspaces;
  if (rootId) {
    const root = await prisma.workspaces.findUnique({ where: { id: rootId } });
    workspaces = await prisma.workspaces.findMany({
      where: {
        OR: [
          { id: rootId },
          { path: { startsWith: `${root.path}/` } }
        ]
      },
      orderBy: { path: 'asc' },
      include: { documents: { select: { id: true } } }
    });
  } else {
    workspaces = await prisma.workspaces.findMany({
      orderBy: { path: 'asc' },
      include: { documents: { select: { id: true } } }
    });
  }
  
  return buildTreeFromFlatList(workspaces);
}
```

### `move(workspaceId, newParentId)`
```javascript
move: async function (workspaceId, newParentId) {
  const workspace = await prisma.workspaces.findUnique({ where: { id: workspaceId } });
  const newParent = newParentId 
    ? await prisma.workspaces.findUnique({ where: { id: newParentId } })
    : null;

  // Prevent circular reference
  if (newParent && newParent.path.startsWith(workspace.path)) {
    throw new Error("Cannot move workspace into its own descendant");
  }

  const oldPath = workspace.path;
  const newPath = newParent ? `${newParent.path}/${workspace.slug}` : `/${workspace.slug}`;
  const newDepth = newParent ? newParent.depth + 1 : 0;
  const depthDelta = newDepth - workspace.depth;

  // Update this workspace
  await prisma.workspaces.update({
    where: { id: workspaceId },
    data: { parentWorkspaceId: newParentId, path: newPath, depth: newDepth }
  });

  // Update all descendants: replace path prefix and adjust depth
  const descendants = await prisma.workspaces.findMany({
    where: { path: { startsWith: `${oldPath}/` } }
  });

  for (const desc of descendants) {
    const updatedPath = newPath + desc.path.slice(oldPath.length);
    await prisma.workspaces.update({
      where: { id: desc.id },
      data: { path: updatedPath, depth: desc.depth + depthDelta }
    });
  }
}
```

### `deleteWithSubtree(workspaceId)`
```javascript
deleteWithSubtree: async function (workspaceId) {
  const workspace = await prisma.workspaces.findUnique({ where: { id: workspaceId } });
  
  // Get all descendant IDs
  const descendants = await prisma.workspaces.findMany({
    where: { path: { startsWith: `${workspace.path}/` } },
    select: { id: true, slug: true }
  });
  
  const allIds = [workspaceId, ...descendants.map(d => d.id)];
  const allSlugs = [workspace.slug, ...descendants.map(d => d.slug)];
  
  // Delete vectors from all namespaces
  for (const slug of allSlugs) {
    await VectorDb.deleteVectorsInNamespace(slug);
  }
  
  // Cascade delete (Prisma handles related records)
  await prisma.workspaces.deleteMany({
    where: { id: { in: allIds } }
  });
}
```

### `promoteChildren(workspaceId)`
```javascript
// Alternative to recursive delete: promote children to root (or to grandparent)
promoteChildren: async function (workspaceId) {
  const workspace = await prisma.workspaces.findUnique({ where: { id: workspaceId } });
  const children = await this.getChildren(workspaceId);
  
  for (const child of children) {
    await this.move(child.id, workspace.parentWorkspaceId); // Move to grandparent (or root)
  }
  
  // Now safe to delete just this workspace
  await this.delete(workspaceId);
}
```

---

## Helper: `buildTreeFromFlatList`

```javascript
function buildTreeFromFlatList(workspaces) {
  const map = new Map();
  const roots = [];

  // First pass: create nodes
  for (const ws of workspaces) {
    map.set(ws.id, { ...ws, children: [] });
  }

  // Second pass: link parent-child
  for (const ws of workspaces) {
    const node = map.get(ws.id);
    if (ws.parentWorkspaceId && map.has(ws.parentWorkspaceId)) {
      map.get(ws.parentWorkspaceId).children.push(node);
    } else {
      roots.push(node);
    }
  }

  return roots;
}
```

---

## Settings Inheritance: `getEffectiveSettings(workspaceId)`

```javascript
getEffectiveSettings: async function (workspaceId) {
  const ancestors = await this.getAncestors(workspaceId);
  const workspace = await prisma.workspaces.findUnique({ where: { id: workspaceId } });
  
  // Start with system defaults, overlay each ancestor's settings, then this workspace
  const chain = [...ancestors, workspace];
  const effectiveSettings = {};
  
  const inheritableFields = [
    'chatProvider', 'chatModel', 'openAiTemp', 'openAiHistory',
    'openAiPrompt', 'similarityThreshold', 'topN', 'chatMode',
    'agentProvider', 'agentModel', 'queryRefusalResponse', 'vectorSearchMode'
  ];
  
  for (const ws of chain) {
    for (const field of inheritableFields) {
      if (ws[field] !== null && ws[field] !== undefined) {
        effectiveSettings[field] = ws[field];
      }
    }
  }
  
  return effectiveSettings;
}
```

---

## Validation Rules

1. **Max depth**: 10 levels (configurable via env var `MAX_WORKSPACE_DEPTH`)
2. **No circular references**: Validated in `move()` by checking new parent's path
3. **Unique slug per sibling set**: Two children of the same parent cannot share a slug
4. **Path immutability**: Path only changes via explicit `move()` operation
5. **Root workspace**: Any workspace with `parentWorkspaceId = null` is a root workspace

---

## Testing Plan

| Test Case | Expected Result |
|-----------|----------------|
| Create root workspace | `depth=0`, `path=/slug` |
| Create child workspace | `depth=1`, `path=/parent-slug/child-slug` |
| Create grandchild workspace | `depth=2`, `path=/parent/child/grandchild` |
| Attempt depth 11 | Error: "Maximum nesting depth reached" |
| Move workspace to new parent | All paths in subtree updated |
| Move workspace to root | `parentWorkspaceId=null`, `depth=0` |
| Move to own descendant | Error: "Cannot move workspace into its own descendant" |
| Delete with subtree | All descendants deleted, all vectors purged |
| Delete with promote | Children reparented, only target deleted |
| Get ancestors | Returns ordered list from root to parent |
| Get tree | Returns nested JSON structure |
| Settings inheritance | Child inherits unset fields from parent |
| Existing workspaces after migration | All are root nodes, `depth=0`, paths set |
