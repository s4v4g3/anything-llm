# anythingllm_client.WorkspaceThreadsApi

All URIs are relative to */api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**chat_with_thread**](WorkspaceThreadsApi.md#chat_with_thread) | **POST** /v1/workspace/{slug}/thread/{threadSlug}/chat | 
[**create_thread**](WorkspaceThreadsApi.md#create_thread) | **POST** /v1/workspace/{slug}/thread/new | 
[**delete_thread**](WorkspaceThreadsApi.md#delete_thread) | **DELETE** /v1/workspace/{slug}/thread/{threadSlug} | 
[**get_thread_chats**](WorkspaceThreadsApi.md#get_thread_chats) | **GET** /v1/workspace/{slug}/thread/{threadSlug}/chats | 
[**stream_chat_with_thread**](WorkspaceThreadsApi.md#stream_chat_with_thread) | **POST** /v1/workspace/{slug}/thread/{threadSlug}/stream-chat | 
[**update_thread**](WorkspaceThreadsApi.md#update_thread) | **POST** /v1/workspace/{slug}/thread/{threadSlug}/update | 


# **chat_with_thread**
> object chat_with_thread(slug, thread_slug)



Chat with a workspace thread

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
    api_instance = anythingllm_client.WorkspaceThreadsApi(api_client)
    slug = 'slug_example' # str | Unique slug of workspace
    thread_slug = 'thread_slug_example' # str | Unique slug of thread

    try:
        api_response = api_instance.chat_with_thread(slug, thread_slug)
        print("The response of WorkspaceThreadsApi->chat_with_thread:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling WorkspaceThreadsApi->chat_with_thread: %s\n" % e)
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **slug** | **str**| Unique slug of workspace | 
 **thread_slug** | **str**| Unique slug of thread | 

### Return type

**object**

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
**403** | Forbidden |  -  |
**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **create_thread**
> object create_thread(slug)



Create a new workspace thread

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
    api_instance = anythingllm_client.WorkspaceThreadsApi(api_client)
    slug = 'slug_example' # str | Unique slug of workspace

    try:
        api_response = api_instance.create_thread(slug)
        print("The response of WorkspaceThreadsApi->create_thread:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling WorkspaceThreadsApi->create_thread: %s\n" % e)
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **slug** | **str**| Unique slug of workspace | 

### Return type

**object**

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
**403** | Forbidden |  -  |
**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **delete_thread**
> delete_thread(slug, thread_slug)



Delete a workspace thread

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
    api_instance = anythingllm_client.WorkspaceThreadsApi(api_client)
    slug = 'slug_example' # str | Unique slug of workspace
    thread_slug = 'thread_slug_example' # str | Unique slug of thread

    try:
        api_instance.delete_thread(slug, thread_slug)
    except Exception as e:
        print("Exception when calling WorkspaceThreadsApi->delete_thread: %s\n" % e)
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **slug** | **str**| Unique slug of workspace | 
 **thread_slug** | **str**| Unique slug of thread | 

### Return type

void (empty response body)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json, application/xml

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Thread deleted successfully |  -  |
**400** | Bad Request |  -  |
**403** | Forbidden |  -  |
**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **get_thread_chats**
> object get_thread_chats(slug, thread_slug)



Get chats for a workspace thread

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
    api_instance = anythingllm_client.WorkspaceThreadsApi(api_client)
    slug = 'slug_example' # str | Unique slug of workspace
    thread_slug = 'thread_slug_example' # str | Unique slug of thread

    try:
        api_response = api_instance.get_thread_chats(slug, thread_slug)
        print("The response of WorkspaceThreadsApi->get_thread_chats:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling WorkspaceThreadsApi->get_thread_chats: %s\n" % e)
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **slug** | **str**| Unique slug of workspace | 
 **thread_slug** | **str**| Unique slug of thread | 

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
**400** | Bad Request |  -  |
**403** | Forbidden |  -  |
**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **stream_chat_with_thread**
> List[str] stream_chat_with_thread(slug, thread_slug)



Stream chat with a workspace thread

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
    api_instance = anythingllm_client.WorkspaceThreadsApi(api_client)
    slug = 'slug_example' # str | Unique slug of workspace
    thread_slug = 'thread_slug_example' # str | Unique slug of thread

    try:
        api_response = api_instance.stream_chat_with_thread(slug, thread_slug)
        print("The response of WorkspaceThreadsApi->stream_chat_with_thread:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling WorkspaceThreadsApi->stream_chat_with_thread: %s\n" % e)
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **slug** | **str**| Unique slug of workspace | 
 **thread_slug** | **str**| Unique slug of thread | 

### Return type

**List[str]**

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: text/event-stream, application/json, application/xml

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | OK |  -  |
**400** | Bad Request |  -  |
**403** | Forbidden |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **update_thread**
> object update_thread(slug, thread_slug)



Update thread name by its unique slug.

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
    api_instance = anythingllm_client.WorkspaceThreadsApi(api_client)
    slug = 'slug_example' # str | Unique slug of workspace
    thread_slug = 'thread_slug_example' # str | Unique slug of thread

    try:
        api_response = api_instance.update_thread(slug, thread_slug)
        print("The response of WorkspaceThreadsApi->update_thread:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling WorkspaceThreadsApi->update_thread: %s\n" % e)
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **slug** | **str**| Unique slug of workspace | 
 **thread_slug** | **str**| Unique slug of thread | 

### Return type

**object**

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
**403** | Forbidden |  -  |
**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

