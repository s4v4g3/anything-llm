# GetWorkspaceResponse


## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**workspace** | [**List[Workspace]**](Workspace.md) |  | 

## Example

```python
from anythingllm_client.models.get_workspace_response import GetWorkspaceResponse

# TODO update the JSON string below
json = "{}"
# create an instance of GetWorkspaceResponse from a JSON string
get_workspace_response_instance = GetWorkspaceResponse.from_json(json)
# print the JSON string representation of the object
print GetWorkspaceResponse.to_json()

# convert the object into a dict
get_workspace_response_dict = get_workspace_response_instance.to_dict()
# create an instance of GetWorkspaceResponse from a dict
get_workspace_response_from_dict = GetWorkspaceResponse.from_dict(get_workspace_response_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


