# anythingllm_client.OpenAICompatibleEndpointsApi

All URIs are relative to */api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**openai_chat_completions**](OpenAICompatibleEndpointsApi.md#openai_chat_completions) | **POST** /v1/openai/chat/completions | 
[**openai_create_embeddings**](OpenAICompatibleEndpointsApi.md#openai_create_embeddings) | **POST** /v1/openai/embeddings | 
[**openai_list_models**](OpenAICompatibleEndpointsApi.md#openai_list_models) | **GET** /v1/openai/models | 
[**openai_list_vector_stores**](OpenAICompatibleEndpointsApi.md#openai_list_vector_stores) | **GET** /v1/openai/vector_stores | 


# **openai_chat_completions**
> openai_chat_completions()



Execute a chat with a workspace with OpenAI compatibility. Supports streaming as well. Model must be a workspace slug from /models.

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
    api_instance = anythingllm_client.OpenAICompatibleEndpointsApi(api_client)

    try:
        api_instance.openai_chat_completions()
    except Exception as e:
        print("Exception when calling OpenAICompatibleEndpointsApi->openai_chat_completions: %s\n" % e)
```


### Parameters
This endpoint does not need any parameter.

### Return type

void (empty response body)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json, application/xml

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | OK |  -  |
**400** | Bad Request |  -  |
**401** | Unauthorized |  -  |
**403** | Forbidden |  -  |
**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **openai_create_embeddings**
> openai_create_embeddings()



Get the embeddings of any arbitrary text string. This will use the embedder provider set in the system. Please ensure the token length of each string fits within the context of your embedder model.

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
    api_instance = anythingllm_client.OpenAICompatibleEndpointsApi(api_client)

    try:
        api_instance.openai_create_embeddings()
    except Exception as e:
        print("Exception when calling OpenAICompatibleEndpointsApi->openai_create_embeddings: %s\n" % e)
```


### Parameters
This endpoint does not need any parameter.

### Return type

void (empty response body)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json, application/xml

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | OK |  -  |
**403** | Forbidden |  -  |
**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **openai_list_models**
> object openai_list_models()



Get all available \"models\" which are workspaces you can use for chatting.

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
    api_instance = anythingllm_client.OpenAICompatibleEndpointsApi(api_client)

    try:
        api_response = api_instance.openai_list_models()
        print("The response of OpenAICompatibleEndpointsApi->openai_list_models:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling OpenAICompatibleEndpointsApi->openai_list_models: %s\n" % e)
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
**200** | OK |  -  |
**403** | Forbidden |  -  |
**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **openai_list_vector_stores**
> object openai_list_vector_stores()



List all the vector database collections connected to AnythingLLM. These are essentially workspaces but return their unique vector db identifier - this is the same as the workspace slug.

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
    api_instance = anythingllm_client.OpenAICompatibleEndpointsApi(api_client)

    try:
        api_response = api_instance.openai_list_vector_stores()
        print("The response of OpenAICompatibleEndpointsApi->openai_list_vector_stores:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling OpenAICompatibleEndpointsApi->openai_list_vector_stores: %s\n" % e)
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
**200** | OK |  -  |
**403** | Forbidden |  -  |
**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

