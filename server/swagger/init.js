const swaggerAutogen = require("swagger-autogen")({ openapi: "3.0.0" });
const fs = require("fs");
const path = require("path");
const { Workspace } = require("../models/workspace");

const doc = {
  info: {
    version: "1.0.0",
    title: "AnythingLLM Developer API",
    description:
      "API endpoints that enable programmatic reading, writing, and updating of your AnythingLLM instance. UI supplied by Swagger.io.",
  },
  // Swagger-autogen does not allow us to use relative paths as these will resolve to
  // http:///api in the openapi.json file, so we need to monkey-patch this post-generation.
  host: "/api",
  schemes: ["http"],
  securityDefinitions: {
    BearerAuth: {
      type: "http",
      scheme: "bearer",
      bearerFormat: "JWT",
    },
  },
  security: [{ BearerAuth: [] }],
  components: {
    "@schemas": {
      InvalidAPIKey: {
        type: "object",
        properties: {
          message: {
            type: "string",
            example: "Invalid API Key",
          },
        },
      },
      Workspace: {
        type: "object",
        properties: {
          id: {
            type: "integer",
            example: 1,
          },
          name: {
            type: "string",
            example: "string",
          },
          description: {
            type: "string",
            nullable: true,
            example: "A workspace for research documents",
          },
          slug: {
            type: "string",
            example: "string",
          },
          vectorTag: {
            type: "string",
            example: "string",
            nullable: true,
          },
          createdAt: {
            type: "string",
            example: "2024-01-01T00:00:00.000Z",
          },
          openAiTemp: {
            type: "number",
            nullable: true,
            example: 0.7,
          },
          openAiHistory: {
            type: "number",
            example: 0,
          },
          lastUpdatedAt: {
            type: "string",
            example: "2024-01-01T00:00:00.000Z",
          },
          openAiPrompt: {
            type: "string",
            example: "string",
          },
          similarityThreshold: {
            type: "number",
            nullable: true,
            example: 0.7,
          },
          chatProvider: {
            type: "string",
            nullable: true,
          },
          chatModel: {
            type: "string",
            nullable: true,
          },
          topN: {
            type: "number",
            nullable: true,
          },
          chatMode: {
            type: "string",
            enum: ["chat", "query", "automatic"],
            nullable: true,
          },
          pfpFilename: {
            type: "string",
            nullable: true,
          },
          agentProvider: {
            type: "string",
            nullable: true,
          },
          agentModel: {
            type: "string",
            nullable: true,
            example: "gpt-4",
          },
          queryRefusalResponse: {
            type: "string",
            nullable: true,
            example: "string",
          },
          vectorSearchMode: {
            type: "string",
            enum: ["default", "rerank"],
          },
          parentWorkspaceId: {
            type: "integer",
            example: 1,
            nullable: true,
          },
          path: {
            type: "string",
          },
          depth: {
            type: "number",
          },
          includeChildDocs: {
            type: "boolean",
            example: false,
          },
          includeAncestorDocs: {
            type: "boolean",
            example: false,
          },
        },
        required: [
          "id",
          "name",
          "description",
          "slug",
          "createdAt",
          "lastUpdatedAt",
          "path",
          "depth",
          "includeChildDocs",
          "includeAncestorDocs",
          "parentWorkspaceId",
          "vectorSearchMode",
          "queryRefusalResponse",
          "agentModel",
          "agentProvider",
          "chatMode",
          "topN",
          "chatModel",
          "chatProvider",
          "similarityThreshold",
          "openAiPrompt",
          "openAiHistory",
          "openAiTemp",
          "vectorTag",
          "pfpFilename",
        ],
      },
      WorkspaceTreeNode: {
        allOf: [
          { $ref: "#/components/schemas/Workspace" },
          {
            type: "object",
            properties: {
              children: {
                type: "array",
                items: { $ref: "#/components/schemas/WorkspaceTreeNode" },
              },
            },
            required: ["children"],
          },
        ],
      },
      CreateWorkspaceResponse: {
        type: "object",
        properties: {
          message: {
            type: "string",
            example: "Workspace created successfully",
          },
          workspace: { $ref: "#/components/schemas/Workspace" },
        },
        required: ["workspace"],
      },
      UpdateWorkspaceResponse: {
        type: "object",
        properties: {
          message: {
            type: "string",
            nullable: true,
            example: "Workspace updated successfully",
          },
          workspace: { $ref: "#/components/schemas/Workspace" },
        },
        required: ["workspace"],
      },
      ListWorkspacesResponse: {
        type: "object",
        properties: {
          workspaces: {
            type: "array",
            items: { $ref: "#/components/schemas/Workspace" },
          },
        },
      },
      GetWorkspaceResponse: {
        type: "object",
        properties: {
          workspace: {
            type: "array",
            items: { $ref: "#/components/schemas/Workspace" },
          },
        },
        required: ["workspace"],
      },
      GetWorkspaceTreeResponse: {
        type: "object",
        properties: {
          tree: {
            type: "array",
            items: { $ref: "#/components/schemas/WorkspaceTreeNode" },
          },
        },
        required: ["tree"],
      },
      GetWorkspaceChildrenResponse: {
        type: "object",
        properties: {
          children: {
            type: "array",
            items: { $ref: "#/components/schemas/WorkspaceTreeNode" },
          },
        },
        required: ["tree"],
      },
      GetWorkspaceChatsResponse: {
        type: "object",
        properties: {
          history: {
            type: "array",
            items: {
              type: "object",
            },
          },
        },
        required: ["history"],
        example: {
          history: [
            {
              role: "user",
              content: "What is AnythingLLM?",
              sentAt: 1692851630,
            },
            {
              role: "assistant",
              content:
                "AnythingLLM is a platform that allows you to convert notes, PDFs, and other source materials into a chatbot. It ensures privacy, cites its answers, and allows multiple people to interact with the same documents simultaneously. It is particularly useful for businesses to enhance the visibility and readability of various written communications such as SOPs, contracts, and sales calls. You can try it out with a free trial to see if it meets your business needs.",
              sources: [
                { source: "object about source document and snippets used" },
              ],
            },
          ],
        },
      },
      CreateWorkspaceRequest: {
        type: "object",
        properties: {
          name: {
            type: "string",
            example: "My New Workspace",
          },
          description: {
            type: "string",
            nullable: true,
            example: "A workspace for research documents",
          },
          parentWorkspaceId: {
            type: "string",
            nullable: true,
            example: null,
          },
          similarityThreshold: {
            type: "number",
            nullable: true,
          },
          openAiTemp: {
            type: "number",
            nullable: true,
          },
          openAiHistory: {
            type: "number",
            nullable: true,
          },
          openAiPrompt: {
            type: "string",
            nullable: true,
          },
          queryRefusalResponse: {
            type: "string",
            nullable: true,
          },
          chatMode: {
            type: "string",
            enum: ["chat", "query", "automatic"],
            nullable: true,
          },
          topN: {
            type: "number",
            nullable: true,
          },
        },
        required: ["name"],
      },
      UpdateWorkspaceRequest: {
        type: "object",
        properties: {
          name: {
            type: "string",
            example: "string",
          },
          description: {
            type: "string",
            nullable: true,
            example: "A workspace for research documents",
          },
          openAiTemp: {
            type: "number",
            nullable: true,
            example: 0.7,
          },
          openAiHistory: {
            type: "number",
            nullable: true,
            example: 0,
          },
          lastUpdatedAt: {
            type: "string",
            nullable: true,
            example: "2024-01-01T00:00:00.000Z",
          },
          openAiPrompt: {
            type: "string",
            example: "string",
            nullable: true,
          },
          similarityThreshold: {
            type: "number",
            nullable: true,
            example: 0.7,
          },
          chatProvider: {
            type: "string",
            nullable: true,
          },
          chatModel: {
            type: "string",
            nullable: true,
          },
          topN: {
            type: "number",
            nullable: true,
          },
          chatMode: {
            type: "string",
            enum: ["chat", "query", "automatic"],
            nullable: true,
          },
          agentProvider: {
            type: "string",
            nullable: true,
          },
          agentModel: {
            type: "string",
            nullable: true,
            example: "gpt-4",
          },
          queryRefusalResponse: {
            type: "string",
            nullable: true,
            example: "string",
          },
          vectorSearchMode: {
            type: "string",
            enum: ["default", "rerank"],
            nullable: true,
          },
          includeChildDocs: {
            type: "boolean",
            example: false,
            nullable: true,
          },
          includeAncestorDocs: {
            type: "boolean",
            example: false,
            nullable: true,
          },
        },
      },
    },
  },
};

const outputFile = path.resolve(__dirname, "./openapi.json");
const endpointsFiles = [
  "../endpoints/api/auth/index.js",
  "../endpoints/api/admin/index.js",
  "../endpoints/api/document/index.js",
  "../endpoints/api/workspace/index.js",
  "../endpoints/api/workspaceHierarchy/index.js",
  "../endpoints/api/system/index.js",
  "../endpoints/api/workspaceThread/index.js",
  "../endpoints/api/userManagement/index.js",
  "../endpoints/api/openai/index.js",
  "../endpoints/api/embed/index.js",
];

swaggerAutogen(outputFile, endpointsFiles, doc).then(({ data }) => {
  // Remove Authorization parameters from arguments.
  for (const path of Object.keys(data.paths)) {
    if (data.paths[path].hasOwnProperty("get")) {
      let parameters = data.paths[path].get?.parameters || [];
      parameters = parameters.filter((arg) => arg.name !== "Authorization");
      data.paths[path].get.parameters = parameters;
    }

    if (data.paths[path].hasOwnProperty("post")) {
      let parameters = data.paths[path].post?.parameters || [];
      parameters = parameters.filter((arg) => arg.name !== "Authorization");
      data.paths[path].post.parameters = parameters;
    }

    if (data.paths[path].hasOwnProperty("delete")) {
      let parameters = data.paths[path].delete?.parameters || [];
      parameters = parameters.filter((arg) => arg.name !== "Authorization");
      data.paths[path].delete.parameters = parameters;
    }
  }

  const openApiSpec = {
    ...data,
    servers: [
      {
        url: "/api",
      },
    ],
  };
  fs.writeFileSync(outputFile, JSON.stringify(openApiSpec, null, 2), {
    encoding: "utf-8",
    flag: "w",
  });
  console.log(`Swagger-autogen:  \x1b[32mPatched servers.url ✔\x1b[0m`);
});
