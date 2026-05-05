const { VectorDatabase } = require("../../../../utils/vectorDbProviders/base");

class MockDb extends VectorDatabase {
  get name() {
    return "MockDb";
  }
  async connect() {
    return { client: {} };
  }
  async hasNamespace(ns) {
    return ns === "parent" || ns === "child";
  }
  async namespaceCount(ns) {
    return ns === "parent" ? 3 : ns === "child" ? 2 : 0;
  }
  async performSimilaritySearch({ namespace, input, LLMConnector, topN }) {
    if (namespace === "parent") {
      return {
        contextTexts: ["parent-doc-1", "parent-doc-2", "parent-doc-3"],
        sources: [{ id: 1 }, { id: 2 }, { id: 3 }],
        message: false,
      };
    }
    if (namespace === "child") {
      return {
        contextTexts: ["child-doc-1", "child-doc-2"],
        sources: [{ id: 4 }, { id: 5 }],
        message: false,
      };
    }
    return { contextTexts: [], sources: [], message: "not found" };
  }
}

describe("VectorDatabase.performScopedSimilaritySearch", () => {
  it("performs scoped similarity search correctly", async () => {
    const db = new MockDb();

    // Test 1: Single namespace falls through
    const r1 = await db.performScopedSimilaritySearch({
      namespaces: ["parent"],
      input: "test",
      LLMConnector: {},
      topN: 4,
    });
    console.log("Single ns:", r1.contextTexts.length, "results");
    expect(r1.contextTexts.length).toBe(3); // Should return all 3 parent docs

    // Test 2: Multiple namespaces merge
    const r2 = await db.performScopedSimilaritySearch({
      namespaces: ["parent", "child"],
      input: "test",
      LLMConnector: {},
      topN: 10,
    });
    console.log("Multi ns (topN=10):", r2.contextTexts);
    expect(r2.contextTexts.length).toBe(5);

    // Test 3: topN trims
    const r3 = await db.performScopedSimilaritySearch({
      namespaces: ["parent", "child"],
      input: "test",
      LLMConnector: {},
      topN: 2,
    });
    console.log("Multi ns (topN=2):", r3.contextTexts);
    expect(r3.contextTexts.length).toBe(2); // topN should limit total results to 2

    // Test 4: Non-existent namespace skipped
    const r4 = await db.performScopedSimilaritySearch({
      namespaces: ["parent", "nonexistent", "child"],
      input: "test",
      LLMConnector: {},
      topN: 10,
    });
    expect(r4.contextTexts.length).toBe(5);
    console.log("With nonexistent ns:", r4.contextTexts.length, "results");

    console.log("PASS");
  });
});
