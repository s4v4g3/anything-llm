# RemoveDocumentFolderRequest


## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**name** | **str** |  | [optional] 

## Example

```python
from anythingllm_client_asyncio.models.remove_document_folder_request import RemoveDocumentFolderRequest

# TODO update the JSON string below
json = "{}"
# create an instance of RemoveDocumentFolderRequest from a JSON string
remove_document_folder_request_instance = RemoveDocumentFolderRequest.from_json(json)
# print the JSON string representation of the object
print RemoveDocumentFolderRequest.to_json()

# convert the object into a dict
remove_document_folder_request_dict = remove_document_folder_request_instance.to_dict()
# create an instance of RemoveDocumentFolderRequest from a dict
remove_document_folder_request_from_dict = RemoveDocumentFolderRequest.from_dict(remove_document_folder_request_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


