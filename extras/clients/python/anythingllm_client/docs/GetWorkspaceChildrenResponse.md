# GetWorkspaceChildrenResponse


## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**children** | [**List[WorkspaceTreeNode]**](WorkspaceTreeNode.md) |  | [optional] 

## Example

```python
from anythingllm_client.models.get_workspace_children_response import GetWorkspaceChildrenResponse

# TODO update the JSON string below
json = "{}"
# create an instance of GetWorkspaceChildrenResponse from a JSON string
get_workspace_children_response_instance = GetWorkspaceChildrenResponse.from_json(json)
# print the JSON string representation of the object
print GetWorkspaceChildrenResponse.to_json()

# convert the object into a dict
get_workspace_children_response_dict = get_workspace_children_response_instance.to_dict()
# create an instance of GetWorkspaceChildrenResponse from a dict
get_workspace_children_response_from_dict = GetWorkspaceChildrenResponse.from_dict(get_workspace_children_response_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


