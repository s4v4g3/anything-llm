# anythingllm_client.AdminApi

All URIs are relative to */api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**create_invite**](AdminApi.md#create_invite) | **POST** /v1/admin/invite/new | 
[**create_user**](AdminApi.md#create_user) | **POST** /v1/admin/users/new | 
[**deactivate_invite**](AdminApi.md#deactivate_invite) | **DELETE** /v1/admin/invite/{id} | 
[**delete_user**](AdminApi.md#delete_user) | **DELETE** /v1/admin/users/{id} | 
[**get_workspace_users**](AdminApi.md#get_workspace_users) | **GET** /v1/admin/workspaces/{workspaceId}/users | 
[**is_multi_user_mode**](AdminApi.md#is_multi_user_mode) | **GET** /v1/admin/is-multi-user-mode | 
[**list_invites**](AdminApi.md#list_invites) | **GET** /v1/admin/invites | 
[**list_users**](AdminApi.md#list_users) | **GET** /v1/admin/users | 
[**list_workspace_chats**](AdminApi.md#list_workspace_chats) | **POST** /v1/admin/workspace-chats | 
[**manage_workspace_users**](AdminApi.md#manage_workspace_users) | **POST** /v1/admin/workspaces/{workspaceSlug}/manage-users | 
[**update_admin_preferences**](AdminApi.md#update_admin_preferences) | **POST** /v1/admin/preferences | 
[**update_user**](AdminApi.md#update_user) | **POST** /v1/admin/users/{id} | 
[**update_workspace_users**](AdminApi.md#update_workspace_users) | **POST** /v1/admin/workspaces/{workspaceId}/update-users | 


# **create_invite**
> object create_invite()



Create a new invite code for someone to use to register with instance. Methods are disabled until multi user mode is enabled via the UI.

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
    api_instance = anythingllm_client.AdminApi(api_client)

    try:
        api_response = api_instance.create_invite()
        print("The response of AdminApi->create_invite:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling AdminApi->create_invite: %s\n" % e)
```


### Parameters
This endpoint does not need any parameter.

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
**401** | Instance is not in Multi-User mode. Method denied |  -  |
**403** | Forbidden |  -  |
**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **create_user**
> object create_user()



Create a new user with username and password. Methods are disabled until multi user mode is enabled via the UI.

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
    api_instance = anythingllm_client.AdminApi(api_client)

    try:
        api_response = api_instance.create_user()
        print("The response of AdminApi->create_user:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling AdminApi->create_user: %s\n" % e)
```


### Parameters
This endpoint does not need any parameter.

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
**401** | Instance is not in Multi-User mode. Method denied |  -  |
**403** | Forbidden |  -  |
**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **deactivate_invite**
> object deactivate_invite(id)



Deactivates (soft-delete) invite by id. Methods are disabled until multi user mode is enabled via the UI.

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
    api_instance = anythingllm_client.AdminApi(api_client)
    id = 'id_example' # str | id of the invite in the database.

    try:
        api_response = api_instance.deactivate_invite(id)
        print("The response of AdminApi->deactivate_invite:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling AdminApi->deactivate_invite: %s\n" % e)
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **str**| id of the invite in the database. | 

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
**401** | Instance is not in Multi-User mode. Method denied |  -  |
**403** | Forbidden |  -  |
**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **delete_user**
> object delete_user(id)



Delete existing user by id. Methods are disabled until multi user mode is enabled via the UI.

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
    api_instance = anythingllm_client.AdminApi(api_client)
    id = 'id_example' # str | id of the user in the database.

    try:
        api_response = api_instance.delete_user(id)
        print("The response of AdminApi->delete_user:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling AdminApi->delete_user: %s\n" % e)
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **str**| id of the user in the database. | 

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
**401** | Instance is not in Multi-User mode. Method denied |  -  |
**403** | Forbidden |  -  |
**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **get_workspace_users**
> object get_workspace_users(workspace_id)



Retrieve a list of users with permissions to access the specified workspace.

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
    api_instance = anythingllm_client.AdminApi(api_client)
    workspace_id = 'workspace_id_example' # str | id of the workspace.

    try:
        api_response = api_instance.get_workspace_users(workspace_id)
        print("The response of AdminApi->get_workspace_users:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling AdminApi->get_workspace_users: %s\n" % e)
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **workspace_id** | **str**| id of the workspace. | 

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
**401** | Instance is not in Multi-User mode. Method denied |  -  |
**403** | Forbidden |  -  |
**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **is_multi_user_mode**
> object is_multi_user_mode()



Check to see if the instance is in multi-user-mode first. Methods are disabled until multi user mode is enabled via the UI.

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
    api_instance = anythingllm_client.AdminApi(api_client)

    try:
        api_response = api_instance.is_multi_user_mode()
        print("The response of AdminApi->is_multi_user_mode:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling AdminApi->is_multi_user_mode: %s\n" % e)
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

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **list_invites**
> object list_invites()



List all existing invitations to instance regardless of status. Methods are disabled until multi user mode is enabled via the UI.

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
    api_instance = anythingllm_client.AdminApi(api_client)

    try:
        api_response = api_instance.list_invites()
        print("The response of AdminApi->list_invites:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling AdminApi->list_invites: %s\n" % e)
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
**401** | Instance is not in Multi-User mode. Method denied |  -  |
**403** | Forbidden |  -  |
**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **list_users**
> object list_users()



Check to see if the instance is in multi-user-mode first. Methods are disabled until multi user mode is enabled via the UI.

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
    api_instance = anythingllm_client.AdminApi(api_client)

    try:
        api_response = api_instance.list_users()
        print("The response of AdminApi->list_users:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling AdminApi->list_users: %s\n" % e)
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
**401** | Instance is not in Multi-User mode. Method denied |  -  |
**403** | Forbidden |  -  |
**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **list_workspace_chats**
> object list_workspace_chats()



All chats in the system ordered by most recent. Methods are disabled until multi user mode is enabled via the UI.

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
    api_instance = anythingllm_client.AdminApi(api_client)

    try:
        api_response = api_instance.list_workspace_chats()
        print("The response of AdminApi->list_workspace_chats:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling AdminApi->list_workspace_chats: %s\n" % e)
```


### Parameters
This endpoint does not need any parameter.

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
**403** | Forbidden |  -  |
**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **manage_workspace_users**
> object manage_workspace_users(workspace_slug)



Set workspace permissions to be accessible by the given user ids and admins. Methods are disabled until multi user mode is enabled via the UI.

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
    api_instance = anythingllm_client.AdminApi(api_client)
    workspace_slug = 'workspace_slug_example' # str | slug of the workspace in the database

    try:
        api_response = api_instance.manage_workspace_users(workspace_slug)
        print("The response of AdminApi->manage_workspace_users:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling AdminApi->manage_workspace_users: %s\n" % e)
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **workspace_slug** | **str**| slug of the workspace in the database | 

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
**401** | Instance is not in Multi-User mode. Method denied |  -  |
**403** | Forbidden |  -  |
**404** | Not Found |  -  |
**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **update_admin_preferences**
> object update_admin_preferences()



Update multi-user preferences for instance. Methods are disabled until multi user mode is enabled via the UI.

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
    api_instance = anythingllm_client.AdminApi(api_client)

    try:
        api_response = api_instance.update_admin_preferences()
        print("The response of AdminApi->update_admin_preferences:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling AdminApi->update_admin_preferences: %s\n" % e)
```


### Parameters
This endpoint does not need any parameter.

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
**401** | Instance is not in Multi-User mode. Method denied |  -  |
**403** | Forbidden |  -  |
**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **update_user**
> object update_user(id)



Update existing user settings. Methods are disabled until multi user mode is enabled via the UI.

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
    api_instance = anythingllm_client.AdminApi(api_client)
    id = 'id_example' # str | id of the user in the database.

    try:
        api_response = api_instance.update_user(id)
        print("The response of AdminApi->update_user:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling AdminApi->update_user: %s\n" % e)
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **str**| id of the user in the database. | 

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
**401** | Instance is not in Multi-User mode. Method denied |  -  |
**403** | Forbidden |  -  |
**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **update_workspace_users**
> object update_workspace_users(workspace_id)



Overwrite workspace permissions to only be accessible by the given user ids and admins. Methods are disabled until multi user mode is enabled via the UI.

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
    api_instance = anythingllm_client.AdminApi(api_client)
    workspace_id = 'workspace_id_example' # str | id of the workspace in the database.

    try:
        api_response = api_instance.update_workspace_users(workspace_id)
        print("The response of AdminApi->update_workspace_users:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling AdminApi->update_workspace_users: %s\n" % e)
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **workspace_id** | **str**| id of the workspace in the database. | 

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
**401** | Instance is not in Multi-User mode. Method denied |  -  |
**403** | Forbidden |  -  |
**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

