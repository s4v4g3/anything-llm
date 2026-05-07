# /// script
# dependencies = [
#   "httpx",
#   "pyyaml",
#   "python-dotenv",
#   "pydantic",
# ]
# ///
import httpx
import yaml
import os
from pydantic import BaseModel
import pathlib


class WorkspaceTreeNode(BaseModel):
    id: int
    name: str
    slug: str
    depth: int
    children: list["WorkspaceTreeNode"] = []


class GetWorkspaceHierarchyResponse(BaseModel):
    tree: list[WorkspaceTreeNode]


class Workspace(BaseModel, extra="ignore"):
    id: int
    parentWorkspaceId: int | None
    name: str
    slug: str


class CreateWorkspaceResponse(BaseModel):
    workspace: Workspace
    message: str


class AnythingLLMClient(httpx.Client):
    def __init__(self, api_key: str, base_url: str = "http://localhost:3001"):
        super().__init__(
            base_url=base_url, headers={"Authorization": f"Bearer {api_key}"}
        )

    def create_workspace(
        self, name: str, parent_id: int | None = None
    ) -> CreateWorkspaceResponse:
        response = self.post(
            "/api/v1/workspace/new",
            json={
                "name": name,
                "parentWorkspaceId": parent_id,
            },
        )
        response.raise_for_status()
        return CreateWorkspaceResponse(**response.json())

    def get_workspace_hierarchy(self) -> list[WorkspaceTreeNode]:
        response = self.get("/api/v1/workspaces/tree")
        response.raise_for_status()
        response_data = GetWorkspaceHierarchyResponse(**response.json())
        return response_data.tree

    def create_workspace_tree(
        self, item: dict, tree: list[WorkspaceTreeNode], parent_id: int = None
    ):
        if any(node.name == item["name"] for node in tree):
            print(
                f"⚠️ Workspace '{item['name']}' already exists under parent_id={parent_id}, skipping creation."
            )
            existing_node = next(node for node in tree if node.name == item["name"])
            workspace_id = existing_node.id
            children = existing_node.children
        else:
            print(f"Creating workspace: {item['name']} (parent_id={parent_id})")
            create_workspace_resp = self.create_workspace(
                name=item["name"], parent_id=parent_id
            )
            workspace_id = create_workspace_resp.workspace.id
            children = []
            print(f"✅ Created workspace '{item['name']}' with ID: {workspace_id}")

        # Recursively create child workspaces
        for child in item.get("children", []):
            self.create_workspace_tree(child, children, parent_id=workspace_id)


def main():
    with open(pathlib.Path(__file__).parent / "taxonomies/default.yaml", "r") as f:
        taxonomy = yaml.safe_load(f)
    client = AnythingLLMClient(api_key=os.getenv("API_KEY"))
    current_tree = client.get_workspace_hierarchy()
    for workspace in taxonomy["hierarchy"]:
        client.create_workspace_tree(workspace, current_tree)


if __name__ == "__main__":
    from dotenv import load_dotenv

    load_dotenv()
    main()
