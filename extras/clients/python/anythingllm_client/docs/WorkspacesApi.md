# anythingllm_client.WorkspacesApi

All URIs are relative to */api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**chat_with_workspace**](WorkspacesApi.md#chat_with_workspace) | **POST** /v1/workspace/{slug}/chat | 
[**create_workspace**](WorkspacesApi.md#create_workspace) | **POST** /v1/workspace/new | 
[**delete_workspace**](WorkspacesApi.md#delete_workspace) | **DELETE** /v1/workspace/{slug} | 
[**get_workspace**](WorkspacesApi.md#get_workspace) | **GET** /v1/workspace/{slug} | 
[**get_workspace_chats**](WorkspacesApi.md#get_workspace_chats) | **GET** /v1/workspace/{slug}/chats | 
[**list_workspaces**](WorkspacesApi.md#list_workspaces) | **GET** /v1/workspaces | 
[**stream_chat_with_workspace**](WorkspacesApi.md#stream_chat_with_workspace) | **POST** /v1/workspace/{slug}/stream-chat | 
[**update_workspace**](WorkspacesApi.md#update_workspace) | **POST** /v1/workspace/{slug}/update | 
[**update_workspace_embeddings**](WorkspacesApi.md#update_workspace_embeddings) | **POST** /v1/workspace/{slug}/update-embeddings | 
[**update_workspace_pin**](WorkspacesApi.md#update_workspace_pin) | **POST** /v1/workspace/{slug}/update-pin | 
[**vector_search_workspace**](WorkspacesApi.md#vector_search_workspace) | **POST** /v1/workspace/{slug}/vector-search | 


# **chat_with_workspace**
> object chat_with_workspace(slug)



Execute a chat with a workspace

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
    api_instance = anythingllm_client.WorkspacesApi(api_client)
    slug = 'slug_example' # str | 

    try:
        api_response = api_instance.chat_with_workspace(slug)
        print("The response of WorkspacesApi->chat_with_workspace:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling WorkspacesApi->chat_with_workspace: %s\n" % e)
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **slug** | **str**|  | 

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

# **create_workspace**
> CreateWorkspaceResponse create_workspace(create_workspace_request)



Create a new workspace

### Example

* Bearer (JWT) Authentication (BearerAuth):
```python
import time
import os
import anythingllm_client
from anythingllm_client.models.create_workspace_request import CreateWorkspaceRequest
from anythingllm_client.models.create_workspace_response import CreateWorkspaceResponse
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
    api_instance = anythingllm_client.WorkspacesApi(api_client)
    create_workspace_request = anythingllm_client.CreateWorkspaceRequest() # CreateWorkspaceRequest | JSON object containing workspace configuration.

    try:
        api_response = api_instance.create_workspace(create_workspace_request)
        print("The response of WorkspacesApi->create_workspace:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling WorkspacesApi->create_workspace: %s\n" % e)
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **create_workspace_request** | [**CreateWorkspaceRequest**](CreateWorkspaceRequest.md)| JSON object containing workspace configuration. | 

### Return type

[**CreateWorkspaceResponse**](CreateWorkspaceResponse.md)

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

# **delete_workspace**
> delete_workspace(slug)



Deletes a workspace by its slug.

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
    api_instance = anythingllm_client.WorkspacesApi(api_client)
    slug = 'slug_example' # str | Unique slug of workspace to delete

    try:
        api_instance.delete_workspace(slug)
    except Exception as e:
        print("Exception when calling WorkspacesApi->delete_workspace: %s\n" % e)
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **slug** | **str**| Unique slug of workspace to delete | 

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
**200** | OK |  -  |
**400** | Bad Request |  -  |
**403** | Forbidden |  -  |
**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **get_workspace**
> GetWorkspaceResponse get_workspace(slug)



Get a workspace by its unique slug.

### Example

* Bearer (JWT) Authentication (BearerAuth):
```python
import time
import os
import anythingllm_client
from anythingllm_client.models.get_workspace_response import GetWorkspaceResponse
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
    api_instance = anythingllm_client.WorkspacesApi(api_client)
    slug = 'slug_example' # str | Unique slug of workspace to find

    try:
        api_response = api_instance.get_workspace(slug)
        print("The response of WorkspacesApi->get_workspace:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling WorkspacesApi->get_workspace: %s\n" % e)
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **slug** | **str**| Unique slug of workspace to find | 

### Return type

[**GetWorkspaceResponse**](GetWorkspaceResponse.md)

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

# **get_workspace_chats**
> GetWorkspaceChatsResponse get_workspace_chats(slug, api_session_id=api_session_id, limit=limit, order_by=order_by)



Get a workspaces chats regardless of user by its unique slug.

### Example

* Bearer (JWT) Authentication (BearerAuth):
```python
import time
import os
import anythingllm_client
from anythingllm_client.models.get_workspace_chats_response import GetWorkspaceChatsResponse
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
    api_instance = anythingllm_client.WorkspacesApi(api_client)
    slug = 'slug_example' # str | Unique slug of workspace to find
    api_session_id = 'api_session_id_example' # str | Optional apiSessionId to filter by (optional)
    limit = 56 # int | Optional number of chat messages to return (default: 100) (optional)
    order_by = 'order_by_example' # str | Optional order of chat messages (asc or desc) (optional)

    try:
        api_response = api_instance.get_workspace_chats(slug, api_session_id=api_session_id, limit=limit, order_by=order_by)
        print("The response of WorkspacesApi->get_workspace_chats:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling WorkspacesApi->get_workspace_chats: %s\n" % e)
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **slug** | **str**| Unique slug of workspace to find | 
 **api_session_id** | **str**| Optional apiSessionId to filter by | [optional] 
 **limit** | **int**| Optional number of chat messages to return (default: 100) | [optional] 
 **order_by** | **str**| Optional order of chat messages (asc or desc) | [optional] 

### Return type

[**GetWorkspaceChatsResponse**](GetWorkspaceChatsResponse.md)

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

# **list_workspaces**
> ListWorkspacesResponse list_workspaces()



List all current workspaces

### Example

* Bearer (JWT) Authentication (BearerAuth):
```python
import time
import os
import anythingllm_client
from anythingllm_client.models.list_workspaces_response import ListWorkspacesResponse
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
    api_instance = anythingllm_client.WorkspacesApi(api_client)

    try:
        api_response = api_instance.list_workspaces()
        print("The response of WorkspacesApi->list_workspaces:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling WorkspacesApi->list_workspaces: %s\n" % e)
```


### Parameters
This endpoint does not need any parameter.

### Return type

[**ListWorkspacesResponse**](ListWorkspacesResponse.md)

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

# **stream_chat_with_workspace**
> List[str] stream_chat_with_workspace(slug)



Execute a streamable chat with a workspace

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
    api_instance = anythingllm_client.WorkspacesApi(api_client)
    slug = 'slug_example' # str | 

    try:
        api_response = api_instance.stream_chat_with_workspace(slug)
        print("The response of WorkspacesApi->stream_chat_with_workspace:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling WorkspacesApi->stream_chat_with_workspace: %s\n" % e)
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **slug** | **str**|  | 

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

# **update_workspace**
> UpdateWorkspaceResponse update_workspace(slug, update_workspace_request)



Update workspace settings by its unique slug.

### Example

* Bearer (JWT) Authentication (BearerAuth):
```python
import time
import os
import anythingllm_client
from anythingllm_client.models.update_workspace_request import UpdateWorkspaceRequest
from anythingllm_client.models.update_workspace_response import UpdateWorkspaceResponse
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
    api_instance = anythingllm_client.WorkspacesApi(api_client)
    slug = 'slug_example' # str | Unique slug of workspace to find
    update_workspace_request = anythingllm_client.UpdateWorkspaceRequest() # UpdateWorkspaceRequest | JSON object containing new settings to update a workspace. All keys are optional and will not update unless provided

    try:
        api_response = api_instance.update_workspace(slug, update_workspace_request)
        print("The response of WorkspacesApi->update_workspace:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling WorkspacesApi->update_workspace: %s\n" % e)
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **slug** | **str**| Unique slug of workspace to find | 
 **update_workspace_request** | [**UpdateWorkspaceRequest**](UpdateWorkspaceRequest.md)| JSON object containing new settings to update a workspace. All keys are optional and will not update unless provided | 

### Return type

[**UpdateWorkspaceResponse**](UpdateWorkspaceResponse.md)

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

# **update_workspace_embeddings**
> UpdateWorkspaceResponse update_workspace_embeddings(slug)



Add or remove documents from a workspace by its unique slug.

### Example

* Bearer (JWT) Authentication (BearerAuth):
```python
import time
import os
import anythingllm_client
from anythingllm_client.models.update_workspace_response import UpdateWorkspaceResponse
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
    api_instance = anythingllm_client.WorkspacesApi(api_client)
    slug = 'slug_example' # str | Unique slug of workspace to find

    try:
        api_response = api_instance.update_workspace_embeddings(slug)
        print("The response of WorkspacesApi->update_workspace_embeddings:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling WorkspacesApi->update_workspace_embeddings: %s\n" % e)
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **slug** | **str**| Unique slug of workspace to find | 

### Return type

[**UpdateWorkspaceResponse**](UpdateWorkspaceResponse.md)

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

# **update_workspace_pin**
> object update_workspace_pin(slug)



Add or remove pin from a document in a workspace by its unique slug.

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
    api_instance = anythingllm_client.WorkspacesApi(api_client)
    slug = 'slug_example' # str | Unique slug of workspace to find

    try:
        api_response = api_instance.update_workspace_pin(slug)
        print("The response of WorkspacesApi->update_workspace_pin:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling WorkspacesApi->update_workspace_pin: %s\n" % e)
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **slug** | **str**| Unique slug of workspace to find | 

### Return type

**object**

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | OK |  -  |
**403** | Forbidden |  -  |
**404** | Document not found |  -  |
**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **vector_search_workspace**
> object vector_search_workspace(slug)



Perform a vector similarity search in a workspace

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
    api_instance = anythingllm_client.WorkspacesApi(api_client)
    slug = 'slug_example' # str | Unique slug of workspace to search in

    try:
        api_response = api_instance.vector_search_workspace(slug)
        print("The response of WorkspacesApi->vector_search_workspace:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling WorkspacesApi->vector_search_workspace: %s\n" % e)
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **slug** | **str**| Unique slug of workspace to search in | 

### Return type

**object**

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | OK |  -  |
**400** | Bad Request |  -  |
**403** | Forbidden |  -  |
**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

