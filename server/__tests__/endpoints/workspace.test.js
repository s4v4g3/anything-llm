const { Workspace } = require("../../models/workspace");
const prisma = require("../../utils/prisma");

// These tests exercise the workspace hierarchy model methods that back the API endpoints.
// They use the real database (SQLite) to verify end-to-end behavior.

describe("Workspace hierarchy model methods", () => {
  let root, child1, child2, grandchild;

  beforeAll(async () => {
    const r = await Workspace.new("Test Root", null, {});
    root = r.workspace;
    const c1 = await Workspace.new("Test Child One", null, {
      parentWorkspaceId: root.id,
    });
    child1 = c1.workspace;
    const c2 = await Workspace.new("Test Child Two", null, {
      parentWorkspaceId: root.id,
    });
    child2 = c2.workspace;
    const gc = await Workspace.new("Test Grandchild", null, {
      parentWorkspaceId: child1.id,
    });
    grandchild = gc.workspace;
  });

  afterAll(async () => {
    // Clean up all test workspaces
    await prisma.workspaces.deleteMany({
      where: {
        id: { in: [root?.id, child1?.id, child2?.id, grandchild?.id].filter(Boolean) },
      },
    });
    await prisma.$disconnect();
  });

  describe("new() with parentWorkspaceId", () => {
    it("creates a root workspace with correct path and depth", () => {
      expect(root).not.toBeNull();
      expect(root.path).toBe(`/${root.slug}`);
      expect(root.depth).toBe(0);
      expect(root.parentWorkspaceId).toBeNull();
    });

    it("creates a child workspace with correct path and depth", () => {
      expect(child1.path).toBe(`/${root.slug}/${child1.slug}`);
      expect(child1.depth).toBe(1);
      expect(child1.parentWorkspaceId).toBe(root.id);
    });

    it("creates a grandchild workspace with correct path and depth", () => {
      expect(grandchild.path).toBe(
        `/${root.slug}/${child1.slug}/${grandchild.slug}`
      );
      expect(grandchild.depth).toBe(2);
      expect(grandchild.parentWorkspaceId).toBe(child1.id);
    });

    it("returns error when parent does not exist", async () => {
      const result = await Workspace.new("Orphan", null, {
        parentWorkspaceId: 999999,
      });
      expect(result.workspace).toBeNull();
      expect(result.message).toBe("Parent workspace not found");
    });
  });

  describe("getChildren()", () => {
    it("returns direct children only", async () => {
      const children = await Workspace.getChildren(root.id);
      expect(children.length).toBe(2);
      const childIds = children.map((c) => c.id);
      expect(childIds).toContain(child1.id);
      expect(childIds).toContain(child2.id);
      // Should not include grandchild
      expect(childIds).not.toContain(grandchild.id);
    });

    it("returns empty array for leaf workspace", async () => {
      const children = await Workspace.getChildren(grandchild.id);
      expect(children).toEqual([]);
    });
  });

  describe("getDescendants()", () => {
    it("returns all descendants recursively", async () => {
      const descendants = await Workspace.getDescendants(root.id);
      expect(descendants.length).toBe(3);
      const ids = descendants.map((d) => d.id);
      expect(ids).toContain(child1.id);
      expect(ids).toContain(child2.id);
      expect(ids).toContain(grandchild.id);
    });

    it("returns only subtree descendants", async () => {
      const descendants = await Workspace.getDescendants(child1.id);
      expect(descendants.length).toBe(1);
      expect(descendants[0].id).toBe(grandchild.id);
    });

    it("returns empty array for leaf workspace", async () => {
      const descendants = await Workspace.getDescendants(grandchild.id);
      expect(descendants).toEqual([]);
    });
  });

  describe("getAncestors()", () => {
    it("returns ancestor chain ordered from root to direct parent", async () => {
      const ancestors = await Workspace.getAncestors(grandchild.id);
      expect(ancestors.length).toBe(2);
      expect(ancestors[0].id).toBe(root.id);
      expect(ancestors[1].id).toBe(child1.id);
    });

    it("returns empty array for root workspace", async () => {
      const ancestors = await Workspace.getAncestors(root.id);
      expect(ancestors).toEqual([]);
    });
  });

  describe("getTree()", () => {
    it("builds nested tree from a root node", async () => {
      const tree = await Workspace.getTree(root.id);
      expect(tree.length).toBe(1);
      const rootNode = tree[0];
      expect(rootNode.id).toBe(root.id);
      expect(rootNode.children.length).toBe(2);
      const child1Node = rootNode.children.find((c) => c.id === child1.id);
      expect(child1Node.children.length).toBe(1);
      expect(child1Node.children[0].id).toBe(grandchild.id);
    });

    it("returns full tree when no rootId is provided", async () => {
      const tree = await Workspace.getTree();
      // Should contain our root among possibly other workspaces
      const rootNode = tree.find((t) => t.id === root.id);
      expect(rootNode).toBeDefined();
      expect(rootNode.children.length).toBe(2);
    });
  });

  describe("getEffectiveSettings()", () => {
    it("inherits settings from ancestors (closest wins)", async () => {
      // Set chatProvider on root, chatModel on child1
      await prisma.workspaces.update({
        where: { id: root.id },
        data: { chatProvider: "openai", chatModel: "gpt-4" },
      });
      await prisma.workspaces.update({
        where: { id: child1.id },
        data: { chatModel: "gpt-3.5-turbo" },
      });

      const settings = await Workspace.getEffectiveSettings(grandchild.id);
      expect(settings.chatProvider).toBe("openai"); // from root
      expect(settings.chatModel).toBe("gpt-3.5-turbo"); // from child1 (closer)
    });

    it("returns own settings for root workspace", async () => {
      const settings = await Workspace.getEffectiveSettings(root.id);
      expect(settings.chatProvider).toBe("openai");
      expect(settings.chatModel).toBe("gpt-4");
    });
  });

  describe("getScopeChainSlugs()", () => {
    it("returns self slug when both flags are off", async () => {
      const ws = { ...grandchild, includeChildDocs: false, includeAncestorDocs: false };
      const slugs = await Workspace.getScopeChainSlugs(ws);
      expect(slugs).toEqual([grandchild.slug]);
    });

    it("includes descendant slugs when includeChildDocs is true", async () => {
      const ws = { ...root, includeChildDocs: true, includeAncestorDocs: false };
      const slugs = await Workspace.getScopeChainSlugs(ws);
      expect(slugs).toContain(root.slug);
      expect(slugs).toContain(child1.slug);
      expect(slugs).toContain(child2.slug);
      expect(slugs).toContain(grandchild.slug);
    });

    it("includes ancestor slugs when includeAncestorDocs is true", async () => {
      const ws = { ...grandchild, includeChildDocs: false, includeAncestorDocs: true };
      const slugs = await Workspace.getScopeChainSlugs(ws);
      expect(slugs).toContain(grandchild.slug);
      expect(slugs).toContain(child1.slug);
      expect(slugs).toContain(root.slug);
    });
  });
});

describe("Workspace._buildTreeFromFlatList()", () => {
  it("converts a flat array into a nested tree", () => {
    const flat = [
      { id: 1, name: "Root", parentWorkspaceId: null },
      { id: 2, name: "Child", parentWorkspaceId: 1 },
      { id: 3, name: "GC", parentWorkspaceId: 2 },
    ];
    const tree = Workspace._buildTreeFromFlatList(flat);
    expect(tree.length).toBe(1);
    expect(tree[0].children.length).toBe(1);
    expect(tree[0].children[0].children.length).toBe(1);
    expect(tree[0].children[0].children[0].name).toBe("GC");
  });

  it("handles multiple roots", () => {
    const flat = [
      { id: 1, name: "Root1", parentWorkspaceId: null },
      { id: 2, name: "Root2", parentWorkspaceId: null },
      { id: 3, name: "Child of R1", parentWorkspaceId: 1 },
    ];
    const tree = Workspace._buildTreeFromFlatList(flat);
    expect(tree.length).toBe(2);
    const r1 = tree.find((t) => t.id === 1);
    expect(r1.children.length).toBe(1);
  });

  it("handles empty array", () => {
    const tree = Workspace._buildTreeFromFlatList([]);
    expect(tree).toEqual([]);
  });
});
