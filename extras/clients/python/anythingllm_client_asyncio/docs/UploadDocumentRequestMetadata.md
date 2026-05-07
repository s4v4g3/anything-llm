# UploadDocumentRequestMetadata

Key:Value pairs of metadata to attach to the document in JSON Object format. Only specific keys are allowed - see example.

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**title** | **str** |  | [optional] 
**doc_author** | **str** |  | [optional] 
**description** | **str** |  | [optional] 
**doc_source** | **str** |  | [optional] 

## Example

```python
from anythingllm_client_asyncio.models.upload_document_request_metadata import UploadDocumentRequestMetadata

# TODO update the JSON string below
json = "{}"
# create an instance of UploadDocumentRequestMetadata from a JSON string
upload_document_request_metadata_instance = UploadDocumentRequestMetadata.from_json(json)
# print the JSON string representation of the object
print UploadDocumentRequestMetadata.to_json()

# convert the object into a dict
upload_document_request_metadata_dict = upload_document_request_metadata_instance.to_dict()
# create an instance of UploadDocumentRequestMetadata from a dict
upload_document_request_metadata_from_dict = UploadDocumentRequestMetadata.from_dict(upload_document_request_metadata_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


