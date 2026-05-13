# GetWorkspaceTreeResponse


## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**tree** | [**List[WorkspaceTreeNode]**](WorkspaceTreeNode.md) |  | 

## Example

```python
from anythingllm_client.models.get_workspace_tree_response import GetWorkspaceTreeResponse

# TODO update the JSON string below
json = "{}"
# create an instance of GetWorkspaceTreeResponse from a JSON string
get_workspace_tree_response_instance = GetWorkspaceTreeResponse.from_json(json)
# print the JSON string representation of the object
print GetWorkspaceTreeResponse.to_json()

# convert the object into a dict
get_workspace_tree_response_dict = get_workspace_tree_response_instance.to_dict()
# create an instance of GetWorkspaceTreeResponse from a dict
get_workspace_tree_response_from_dict = GetWorkspaceTreeResponse.from_dict(get_workspace_tree_response_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


