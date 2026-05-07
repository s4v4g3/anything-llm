# CreateWorkspaceRequest


## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**name** | **str** |  | 
**parent_workspace_id** | **str** |  | [optional] 
**similarity_threshold** | **float** |  | [optional] 
**open_ai_temp** | **float** |  | [optional] 
**open_ai_history** | **float** |  | [optional] 
**open_ai_prompt** | **str** |  | [optional] 
**query_refusal_response** | **str** |  | [optional] 
**chat_mode** | **str** |  | [optional] 
**top_n** | **float** |  | [optional] 

## Example

```python
from anythingllm_client.models.create_workspace_request import CreateWorkspaceRequest

# TODO update the JSON string below
json = "{}"
# create an instance of CreateWorkspaceRequest from a JSON string
create_workspace_request_instance = CreateWorkspaceRequest.from_json(json)
# print the JSON string representation of the object
print CreateWorkspaceRequest.to_json()

# convert the object into a dict
create_workspace_request_dict = create_workspace_request_instance.to_dict()
# create an instance of CreateWorkspaceRequest from a dict
create_workspace_request_from_dict = CreateWorkspaceRequest.from_dict(create_workspace_request_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


