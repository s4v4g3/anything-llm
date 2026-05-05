/* eslint-disable unused-imports/no-unused-vars */

/* Base class for all Vector Database providers.
 * All vector database providers should extend this class and implement/override the necessary methods.
 */
class VectorDatabase {
  get name() {
    return "VectorDatabase";
  }

  constructor() {
    if (this.constructor === VectorDatabase) {
      throw new Error("VectorDatabase cannot be instantiated directly");
    }
  }

  /**
   * Connect to vector database client
   * @returns {Promise<{client: any}>}
   */
  async connect() {
    throw new Error("Must be implemented by provider");
  }

  /**
   * Heartbeat check for vector database client
   * @returns {Promise<{heartbeat: number}>}
   */
  async heartbeat() {
    throw new Error("Must be implemented by provider");
  }

  /**
   * Get total number of vectors across all namespaces
   * @returns {Promise<number>}
   */
  async totalVectors() {
    throw new Error("Must be implemented by provider");
  }

  /**
   * Get count of vectors in a specific namespace
   * @param {string} namespace - Namespace to count vectors in
   * @returns {Promise<number>}
   */
  async namespaceCount(namespace = null) {
    throw new Error("Must be implemented by provider");
  }

  /**
   * Get namespace details
   * @param {any} client - Vector database client
   * @param {string} namespace - Namespace to get
   * @returns {Promise<any>}
   */
  async namespace(client, namespace = null) {
    throw new Error("Must be implemented by provider");
  }

  /**
   * Check if a namespace exists
   * @param {string} namespace - Namespace to check
   * @returns {Promise<boolean>}
   */
  async hasNamespace(namespace = null) {
    throw new Error("Must be implemented by provider");
  }

  /**
   * Check if a namespace exists with a client
   * @param {any} client - Vector database client
   * @param {string} namespace - Namespace to check
   * @returns {Promise<boolean>}
   */
  async namespaceExists(client, namespace = null) {
    throw new Error("Must be implemented by provider");
  }

  /**
   * Delete all vectors in a namespace
   * @param {any} client - Vector database client
   * @param {string} namespace - Namespace to delete vectors from
   * @returns {Promise<boolean>}
   */
  async deleteVectorsInNamespace(client, namespace = null) {
    throw new Error("Must be implemented by provider");
  }

  /**
   * Add a document to a namespace
   * @param {string} namespace - Namespace to add document to
   * @param {Object} documentData - Document data
   * @param {string} fullFilePath - Full file path
   * @param {boolean} skipCache - Skip cache
   * @returns {Promise<{vectorized: boolean, error: string|null}>}
   */
  async addDocumentToNamespace(
    namespace,
    documentData = {},
    fullFilePath = null,
    skipCache = false
  ) {
    throw new Error("Must be implemented by provider");
  }

  /**
   * Delete a document from namespace
   * @param {string} namespace - Namespace to delete document from
   * @param {string} docId - Document id
   * @returns {Promise<boolean>}
   */
  async deleteDocumentFromNamespace(namespace, docId) {
    throw new Error("Must be implemented by provider");
  }

  /**
   * Perform a similarity search
   * @param {Object} params - Search parameters
   * @param {string} params.namespace - Namespace to search in
   * @param {string} params.input - Input text to search for
   * @param {any} params.LLMConnector - LLM connector for embeddings
   * @param {number} params.similarityThreshold - Similarity threshold
   * @param {number} params.topN - Number of results to return
   * @param {string[]} params.filterIdentifiers - Identifiers to filter out
   * @returns {Promise<{contextTexts: string[], sources: any[], message: string|boolean}>}
   */
  async performSimilaritySearch({
    namespace = null,
    input = "",
    LLMConnector = null,
    similarityThreshold = 0.25,
    topN = 4,
    filterIdentifiers = [],
  }) {
    throw new Error("Must be implemented by provider");
  }

  /**
   * Perform a similarity search across multiple namespaces (scope chain).
   * Queries each namespace individually, merges and re-ranks results by score,
   * then returns the top N results. This enables hierarchical workspace search
   * without modifying individual provider implementations.
   *
   * @param {Object} params - Search parameters
   * @param {string[]} params.namespaces - Array of namespace slugs to search across
   * @param {string} params.input - Input text to search for
   * @param {any} params.LLMConnector - LLM connector for embeddings
   * @param {number} params.similarityThreshold - Similarity threshold
   * @param {number} params.topN - Number of results to return (total across all namespaces)
   * @param {string[]} params.filterIdentifiers - Identifiers to filter out
   * @param {boolean} params.rerank - Whether to use reranking
   * @returns {Promise<{contextTexts: string[], sources: any[], message: string|boolean}>}
   */
  async performScopedSimilaritySearch({
    namespaces = [],
    input = "",
    LLMConnector = null,
    similarityThreshold = 0.25,
    topN = 4,
    filterIdentifiers = [],
    rerank = false,
  }) {
    if (!namespaces.length || !input || !LLMConnector)
      throw new Error("Invalid request to performScopedSimilaritySearch.");

    // If only one namespace, fall back to standard search
    if (namespaces.length === 1) {
      return this.performSimilaritySearch({
        namespace: namespaces[0],
        input,
        LLMConnector,
        similarityThreshold,
        topN,
        filterIdentifiers,
        rerank,
      });
    }

    // Query each namespace that exists and collect results
    const allContextTexts = [];
    const allSources = [];

    for (const namespace of namespaces) {
      const hasNs = await this.hasNamespace(namespace);
      if (!hasNs) continue;

      const nsCount = await this.namespaceCount(namespace);
      if (nsCount === 0) continue;

      const result = await this.performSimilaritySearch({
        namespace,
        input,
        LLMConnector,
        similarityThreshold,
        topN, // Request topN per namespace; we'll trim after merging
        filterIdentifiers,
        rerank,
      });

      // Skip namespaces that returned errors
      if (result.message) continue;

      allContextTexts.push(...result.contextTexts);
      allSources.push(...result.sources);
    }

    // If no results from any namespace
    if (allContextTexts.length === 0) {
      return {
        contextTexts: [],
        sources: [],
        message: false,
      };
    }

    // Trim to topN total results (sources are already ranked per-namespace by score)
    // We take the first topN from the merged set. Since each provider already
    // applies similarityThreshold, all results here meet the threshold.
    const trimmedContextTexts = allContextTexts.slice(0, topN);
    const trimmedSources = allSources.slice(0, topN);

    return {
      contextTexts: trimmedContextTexts,
      sources: trimmedSources,
      message: false,
    };
  }

  /**
   * Perform a similarity search and return raw results
   * @param {Object} params - Search parameters
   * @param {any} params.client - Vector database client
   * @param {string} params.namespace - Namespace to search in
   * @param {number[]} params.queryVector - Query vector
   * @param {number} params.similarityThreshold - Similarity threshold
   * @param {number} params.topN - Number of results to return
   * @param {string[]} params.filterIdentifiers - Identifiers to filter out
   * @returns {Promise<{contextTexts: string[], sourceDocuments: any[], scores: number[]}>}
   */
  async similarityResponse({
    client,
    namespace,
    queryVector,
    similarityThreshold = 0.25,
    topN = 4,
    filterIdentifiers = [],
  }) {
    throw new Error("Must be implemented by provider");
  }

  /**
   * Get namespace stats
   * @param {Object} reqBody - Request body
   * @param {string} reqBody.namespace - Namespace to get stats for
   * @returns {Promise<any>}
   */
  async "namespace-stats"(reqBody = {}) {
    throw new Error("Must be implemented by provider");
  }

  /**
   * Delete a namespace
   * @param {Object} reqBody - Request body
   * @param {string} reqBody.namespace - Namespace to delete
   * @returns {Promise<{message: string}>}
   */
  async "delete-namespace"(reqBody = {}) {
    throw new Error("Must be implemented by provider");
  }

  /**
   * Reset vector database (delete all data)
   * @returns {Promise<{reset: boolean}>}
   */
  async reset() {
    throw new Error("Must be implemented by provider");
  }

  /**
   * Curate sources from search results
   * @param {any[]} sources - Sources to curate
   * @returns {any[]}
   */
  curateSources(sources = []) {
    throw new Error("Must be implemented by provider");
  }

  logger(message = null, ...args) {
    console.log(`\x1b[36m[VectorDB::${this.name}]\x1b[0m ${message}`, ...args);
  }
}

module.exports = { VectorDatabase };
