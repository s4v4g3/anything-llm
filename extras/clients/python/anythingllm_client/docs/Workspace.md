# Workspace


## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **int** |  | 
**name** | **str** |  | 
**description** | **str** |  | 
**slug** | **str** |  | 
**vector_tag** | **str** |  | 
**created_at** | **str** |  | 
**open_ai_temp** | **float** |  | 
**open_ai_history** | **float** |  | 
**last_updated_at** | **str** |  | 
**open_ai_prompt** | **str** |  | 
**similarity_threshold** | **float** |  | 
**chat_provider** | **str** |  | 
**chat_model** | **str** |  | 
**top_n** | **float** |  | 
**chat_mode** | **str** |  | 
**pfp_filename** | **str** |  | 
**agent_provider** | **str** |  | 
**agent_model** | **str** |  | 
**query_refusal_response** | **str** |  | 
**vector_search_mode** | **str** |  | 
**parent_workspace_id** | **int** |  | 
**path** | **str** |  | 
**depth** | **float** |  | 
**include_child_docs** | **bool** |  | 
**include_ancestor_docs** | **bool** |  | 

## Example

```python
from anythingllm_client.models.workspace import Workspace

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


