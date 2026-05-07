# UploadDocument200ResponseDocumentsInner


## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**location** | **str** |  | [optional] 
**name** | **str** |  | [optional] 
**url** | **str** |  | [optional] 
**title** | **str** |  | [optional] 
**doc_author** | **str** |  | [optional] 
**description** | **str** |  | [optional] 
**doc_source** | **str** |  | [optional] 
**chunk_source** | **str** |  | [optional] 
**published** | **str** |  | [optional] 
**word_count** | **float** |  | [optional] 
**token_count_estimate** | **float** |  | [optional] 

## Example

```python
from anythingllm_client_asyncio.models.upload_document200_response_documents_inner import UploadDocument200ResponseDocumentsInner

# TODO update the JSON string below
json = "{}"
# create an instance of UploadDocument200ResponseDocumentsInner from a JSON string
upload_document200_response_documents_inner_instance = UploadDocument200ResponseDocumentsInner.from_json(json)
# print the JSON string representation of the object
print UploadDocument200ResponseDocumentsInner.to_json()

# convert the object into a dict
upload_document200_response_documents_inner_dict = upload_document200_response_documents_inner_instance.to_dict()
# create an instance of UploadDocument200ResponseDocumentsInner from a dict
upload_document200_response_documents_inner_from_dict = UploadDocument200ResponseDocumentsInner.from_dict(upload_document200_response_documents_inner_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


