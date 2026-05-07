# anythingllm_client.AuthenticationApi

All URIs are relative to */api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**verify_auth**](AuthenticationApi.md#verify_auth) | **GET** /v1/auth | 


# **verify_auth**
> object verify_auth()



Verify the attached Authentication header contains a valid API token.

### Example

* Bearer (JWT) Authentication (BearerAuth):
```python
import time
import os
import anythingllm_client
from anythingllm_client.rest import ApiException
from pprint import pprint

# Defining the host is optional and defaults to /api
# See configuration.py for a list of all supported configuration parameters.
configuration = anythingllm_client.Configuration(
    host = "/api"
)

# The client must configure the authentication and authorization parameters
# in accordance with the API server security policy.
# Examples for each auth method are provided below, use the example that
# satisfies your auth use case.

# Configure Bearer authorization (JWT): BearerAuth
configuration = anythingllm_client.Configuration(
    access_token = os.environ["BEARER_TOKEN"]
)
# Enter a context with an instance of the API client
with anythingllm_client.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = anythingllm_client.AuthenticationApi(api_client)

    try:
        api_response = api_instance.verify_auth()
        print("The response of AuthenticationApi->verify_auth:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling AuthenticationApi->verify_auth: %s\n" % e)
```


### Parameters
This endpoint does not need any parameter.

### Return type

**object**

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json, application/xml

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Valid auth token was found. |  -  |
**403** | Forbidden |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

