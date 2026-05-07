# UploadDocument200Response


## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**success** | **bool** |  | [optional] 
**error** | **str** |  | [optional] 
**documents** | [**List[UploadDocument200ResponseDocumentsInner]**](UploadDocument200ResponseDocumentsInner.md) |  | [optional] 

## Example

```python
from anythingllm_client.models.upload_document200_response import UploadDocument200Response

# TODO update the JSON string below
json = "{}"
# create an instance of UploadDocument200Response from a JSON string
upload_document200_response_instance = UploadDocument200Response.from_json(json)
# print the JSON string representation of the object
print UploadDocument200Response.to_json()

# convert the object into a dict
upload_document200_response_dict = upload_document200_response_instance.to_dict()
# create an instance of UploadDocument200Response from a dict
upload_document200_response_from_dict = UploadDocument200Response.from_dict(upload_document200_response_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


