# Workspace


## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **int** |  | 
**name** | **str** |  | 
**slug** | **str** |  | 
**vector_tag** | **str** |  | [optional] 
**created_at** | **str** |  | 
**open_ai_temp** | **float** |  | [optional] 
**open_ai_history** | **float** |  | [optional] 
**last_updated_at** | **str** |  | 
**open_ai_prompt** | **str** |  | [optional] 
**similarity_threshold** | **float** |  | [optional] 
**chat_provider** | **str** |  | [optional] 
**chat_model** | **str** |  | [optional] 
**top_n** | **float** |  | [optional] 
**chat_mode** | **str** |  | [optional] 
**pfp_filename** | **str** |  | [optional] 
**agent_provider** | **str** |  | [optional] 
**agent_model** | **str** |  | [optional] 
**query_refusal_response** | **str** |  | [optional] 
**vector_search_mode** | **str** |  | [optional] 
**parent_workspace_id** | **int** |  | [optional] 
**path** | **str** |  | [optional] 
**depth** | **float** |  | [optional] 
**include_child_docs** | **bool** |  | [optional] 
**include_ancestor_docs** | **bool** |  | [optional] 

## Example

```python
from anythingllm_client_asyncio.models.workspace import Workspace

# TODO update the JSON string below
json = "{}"
# create an instance of Workspace from a JSON string
workspace_instance = Workspace.from_json(json)
# print the JSON string representation of the object
print Workspace.to_json()

# convert the object into a dict
workspace_dict = workspace_instance.to_dict()
# create an instance of Workspace from a dict
workspace_from_dict = Workspace.from_dict(workspace_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


