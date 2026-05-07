from anythingllm_client.api import WorkspacesApi
from anythingllm_client import (
    WorkspacesApi,
    ApiClient,
    Configuration,
    CreateWorkspaceRequest,
    UpdateWorkspaceRequest,
)
from dotenv import load_dotenv
import os


def main():
    configuration = Configuration(
        host="http://127.0.0.1:3001/api", access_token=os.getenv("API_KEY")
    )
    api_client = ApiClient(configuration)
    workspace_api = WorkspacesApi(api_client)

    list_ws_response = workspace_api.list_workspaces()
    for ws in list_ws_response.workspaces:
        print(ws.name)
        get_ws_response = workspace_api.get_workspace(ws.slug)
        assert len(get_ws_response.workspace) == 1
        print(get_ws_response.workspace[0].name)
        chats = workspace_api.get_workspace_chats(ws.slug)
        if len(chats.history):
            print(chats.history)
        if ws.name == "Workspace":
            workspace_api.delete_workspace(ws.slug)

    ws_response = workspace_api.create_workspace(
        CreateWorkspaceRequest(name="Workspace")
    )
    print(ws_response)
    get_ws_response = workspace_api.update_workspace(
        ws_response.workspace.slug, UpdateWorkspaceRequest(name="New Name", description="New Description")
    )
    print(get_ws_response)
    assert get_ws_response.workspace.description == "New Description"
    workspace_api.delete_workspace(ws_response.workspace.slug)


if __name__ == "__main__":
    load_dotenv()
    main()
