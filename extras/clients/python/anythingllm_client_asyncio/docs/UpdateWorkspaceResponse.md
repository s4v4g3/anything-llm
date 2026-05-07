# UpdateWorkspaceResponse


## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**message** | **str** |  | [optional] 
**workspace** | [**Workspace**](Workspace.md) |  | 

## Example

```python
from anythingllm_client_asyncio.models.update_workspace_response import UpdateWorkspaceResponse

# TODO update the JSON string below
json = "{}"
# create an instance of UpdateWorkspaceResponse from a JSON string
update_workspace_response_instance = UpdateWorkspaceResponse.from_json(json)
# print the JSON string representation of the object
print UpdateWorkspaceResponse.to_json()

# convert the object into a dict
update_workspace_response_dict = update_workspace_response_instance.to_dict()
# create an instance of UpdateWorkspaceResponse from a dict
update_workspace_response_from_dict = UpdateWorkspaceResponse.from_dict(update_workspace_response_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


