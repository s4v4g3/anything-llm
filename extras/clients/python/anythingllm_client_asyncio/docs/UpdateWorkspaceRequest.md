# UpdateWorkspaceRequest


## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**name** | **str** |  | [optional] 
**open_ai_temp** | **float** |  | [optional] 
**open_ai_history** | **float** |  | [optional] 
**last_updated_at** | **str** |  | [optional] 
**open_ai_prompt** | **str** |  | [optional] 
**similarity_threshold** | **float** |  | [optional] 
**chat_provider** | **str** |  | [optional] 
**chat_model** | **str** |  | [optional] 
**top_n** | **float** |  | [optional] 
**chat_mode** | **str** |  | [optional] 
**agent_provider** | **str** |  | [optional] 
**agent_model** | **str** |  | [optional] 
**query_refusal_response** | **str** |  | [optional] 
**vector_search_mode** | **str** |  | [optional] 
**include_child_docs** | **bool** |  | [optional] 
**include_ancestor_docs** | **bool** |  | [optional] 

## Example

```python
from anythingllm_client_asyncio.models.update_workspace_request import UpdateWorkspaceRequest

# TODO update the JSON string below
json = "{}"
# create an instance of UpdateWorkspaceRequest from a JSON string
update_workspace_request_instance = UpdateWorkspaceRequest.from_json(json)
# print the JSON string representation of the object
print UpdateWorkspaceRequest.to_json()

# convert the object into a dict
update_workspace_request_dict = update_workspace_request_instance.to_dict()
# create an instance of UpdateWorkspaceRequest from a dict
update_workspace_request_from_dict = UpdateWorkspaceRequest.from_dict(update_workspace_request_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


