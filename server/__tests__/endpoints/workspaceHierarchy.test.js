const { Workspace } = require("../../models/workspace");
const prisma = require("../../utils/prisma");

// Tests for workspace hierarchy operations (move, delete strategies, circular ref prevention).
// These use the real database to verify the model layer that the endpoints call.

describe("Workspace.move()", () => {
  let root, child, grandchild, sibling;
  const prefix = `mv-${Date.now()}`;

  beforeAll(async () => {
    const r = await Workspace.new(`${prefix} Root`, null, {});
    root = r.workspace;
    const c = await Workspace.new(`${prefix} Child`, null, { parentWorkspaceId: root.id });
    child = c.workspace;
    const gc = await Workspace.new(`${prefix} GC`, null, { parentWorkspaceId: child.id });
    grandchild = gc.workspace;
    const s = await Workspace.new(`${prefix} Sibling`, null, { parentWorkspaceId: root.id });
    sibling = s.workspace;
  });

  afterAll(async () => {
    await prisma.workspaces.deleteMany({
      where: {
        id: { in: [root?.id, child?.id, grandchild?.id, sibling?.id].filter(Boolean) },
      },
    });
    await prisma.$disconnect();
  });

  it("moves a workspace to a new parent and updates paths", async () => {
    const result = await Workspace.move(child.id, sibling.id);
    expect(result.success).toBe(true);

    const movedChild = await prisma.workspaces.findUnique({ where: { id: child.id } });
    expect(movedChild.parentWorkspaceId).toBe(sibling.id);
    expect(movedChild.path).toBe(`/${root.slug}/${sibling.slug}/${child.slug}`);
    expect(movedChild.depth).toBe(2);

    // Grandchild path should also be updated
    const movedGC = await prisma.workspaces.findUnique({ where: { id: grandchild.id } });
    expect(movedGC.path).toBe(
      `/${root.slug}/${sibling.slug}/${child.slug}/${grandchild.slug}`
    );
    expect(movedGC.depth).toBe(3);
  });

  it("moves a workspace to root (null parent)", async () => {
    const result = await Workspace.move(child.id, null);
    expect(result.success).toBe(true);

    const movedChild = await prisma.workspaces.findUnique({ where: { id: child.id } });
    expect(movedChild.parentWorkspaceId).toBeNull();
    expect(movedChild.path).toBe(`/${child.slug}`);
    expect(movedChild.depth).toBe(0);

    const movedGC = await prisma.workspaces.findUnique({ where: { id: grandchild.id } });
    expect(movedGC.path).toBe(`/${child.slug}/${grandchild.slug}`);
    expect(movedGC.depth).toBe(1);
  });

  it("prevents moving a workspace into itself", async () => {
    const result = await Workspace.move(child.id, child.id);
    expect(result.success).toBe(false);
    expect(result.error).toMatch(/itself/i);
  });

  it("prevents circular reference (moving parent into descendant)", async () => {
    // Move child back under root first
    await Workspace.move(child.id, root.id);

    // Now try to move root into grandchild (which is under child, which is under root)
    const result = await Workspace.move(root.id, grandchild.id);
    expect(result.success).toBe(false);
    expect(result.error).toMatch(/descendant/i);
  });

  it("returns error for non-existent workspace", async () => {
    const result = await Workspace.move(999999, root.id);
    expect(result.success).toBe(false);
    expect(result.error).toMatch(/not found/i);
  });

  it("returns error for non-existent new parent", async () => {
    const result = await Workspace.move(child.id, 999999);
    expect(result.success).toBe(false);
    expect(result.error).toMatch(/not found/i);
  });
});

describe("Workspace.deleteWithSubtree()", () => {
  let root, child, grandchild;
  const prefix = `dt-${Date.now()}`;

  beforeAll(async () => {
    const r = await Workspace.new(`${prefix} Root`, null, {});
    root = r.workspace;
    const c = await Workspace.new(`${prefix} Child`, null, { parentWorkspaceId: root.id });
    child = c.workspace;
    const gc = await Workspace.new(`${prefix} GC`, null, { parentWorkspaceId: child.id });
    grandchild = gc.workspace;
  });

  afterAll(async () => {
    // Cleanup in case test fails
    await prisma.workspaces.deleteMany({
      where: { id: { in: [root?.id, child?.id, grandchild?.id].filter(Boolean) } },
    });
    await prisma.$disconnect();
  });

  it("deletes the workspace and all descendants", async () => {
    const result = await Workspace.deleteWithSubtree(root.id);
    expect(result.success).toBe(true);

    const remaining = await prisma.workspaces.findMany({
      where: { id: { in: [root.id, child.id, grandchild.id] } },
    });
    expect(remaining.length).toBe(0);
  });

  it("returns error for non-existent workspace", async () => {
    const result = await Workspace.deleteWithSubtree(999999);
    expect(result.success).toBe(false);
    expect(result.error).toMatch(/not found/i);
  });
});

describe("Workspace.deleteAndPromoteChildren()", () => {
  let root, parent, child1, child2, grandchild;
  const prefix = `dp-${Date.now()}`;

  beforeAll(async () => {
    const r = await Workspace.new(`${prefix} Root`, null, {});
    root = r.workspace;
    const p = await Workspace.new(`${prefix} Parent`, null, { parentWorkspaceId: root.id });
    parent = p.workspace;
    const c1 = await Workspace.new(`${prefix} C1`, null, { parentWorkspaceId: parent.id });
    child1 = c1.workspace;
    const c2 = await Workspace.new(`${prefix} C2`, null, { parentWorkspaceId: parent.id });
    child2 = c2.workspace;
    const gc = await Workspace.new(`${prefix} GC`, null, { parentWorkspaceId: child1.id });
    grandchild = gc.workspace;
  });

  afterAll(async () => {
    await prisma.workspaces.deleteMany({
      where: {
        id: { in: [root?.id, parent?.id, child1?.id, child2?.id, grandchild?.id].filter(Boolean) },
      },
    });
    await prisma.$disconnect();
  });

  it("deletes the workspace and promotes children to grandparent", async () => {
    const result = await Workspace.deleteAndPromoteChildren(parent.id);
    expect(result.success).toBe(true);

    // Parent should be gone
    const deleted = await prisma.workspaces.findUnique({ where: { id: parent.id } });
    expect(deleted).toBeNull();

    // Children should now be under root
    const c1After = await prisma.workspaces.findUnique({ where: { id: child1.id } });
    expect(c1After.parentWorkspaceId).toBe(root.id);
    expect(c1After.path).toBe(`/${root.slug}/${child1.slug}`);

    const c2After = await prisma.workspaces.findUnique({ where: { id: child2.id } });
    expect(c2After.parentWorkspaceId).toBe(root.id);

    // Grandchild should have updated path too
    const gcAfter = await prisma.workspaces.findUnique({ where: { id: grandchild.id } });
    expect(gcAfter.path).toBe(`/${root.slug}/${child1.slug}/${grandchild.slug}`);
  });

  it("promotes children to root when deleting a root-level workspace", async () => {
    // Delete root — child1 and child2 should become root-level
    const result = await Workspace.deleteAndPromoteChildren(root.id);
    expect(result.success).toBe(true);

    const c1After = await prisma.workspaces.findUnique({ where: { id: child1.id } });
    expect(c1After.parentWorkspaceId).toBeNull();
    expect(c1After.path).toBe(`/${child1.slug}`);
    expect(c1After.depth).toBe(0);
  });
});

describe("Workspace validations for hierarchy fields", () => {
  it("includeChildDocs defaults to true for null/undefined", () => {
    expect(Workspace.validations.includeChildDocs(null)).toBe(true);
    expect(Workspace.validations.includeChildDocs(undefined)).toBe(true);
  });

  it("includeChildDocs coerces values to boolean", () => {
    expect(Workspace.validations.includeChildDocs(false)).toBe(false);
    expect(Workspace.validations.includeChildDocs(0)).toBe(false);
    expect(Workspace.validations.includeChildDocs(1)).toBe(true);
    expect(Workspace.validations.includeChildDocs("yes")).toBe(true);
  });

  it("includeAncestorDocs defaults to true for null/undefined", () => {
    expect(Workspace.validations.includeAncestorDocs(null)).toBe(true);
    expect(Workspace.validations.includeAncestorDocs(undefined)).toBe(true);
  });

  it("includeAncestorDocs coerces values to boolean", () => {
    expect(Workspace.validations.includeAncestorDocs(false)).toBe(false);
    expect(Workspace.validations.includeAncestorDocs(0)).toBe(false);
    expect(Workspace.validations.includeAncestorDocs(1)).toBe(true);
  });
});
