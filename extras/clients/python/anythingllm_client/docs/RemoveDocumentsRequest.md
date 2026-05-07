# RemoveDocumentsRequest


## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**names** | **List[str]** |  | [optional] 

## Example

```python
from anythingllm_client.models.remove_documents_request import RemoveDocumentsRequest

# TODO update the JSON string below
json = "{}"
# create an instance of RemoveDocumentsRequest from a JSON string
remove_documents_request_instance = RemoveDocumentsRequest.from_json(json)
# print the JSON string representation of the object
print RemoveDocumentsRequest.to_json()

# convert the object into a dict
remove_documents_request_dict = remove_documents_request_instance.to_dict()
# create an instance of RemoveDocumentsRequest from a dict
remove_documents_request_from_dict = RemoveDocumentsRequest.from_dict(remove_documents_request_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


