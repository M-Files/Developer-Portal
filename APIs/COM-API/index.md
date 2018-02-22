---
layout: page
title: The M-Files COM/.NET API
includeInSearch: true
breadcrumb: COM/.NET API
---

The [M-Files COM/.NET API]({{ site.baseurl }}/APIs/COM-API/) can be used from any software that can interact with COM. This is our most comprehensive API and provides interfaces for most "user" and "administrative" functions.  The API is available on both 32-bit and 64-bit versions and is typically referenced from your code by adding a reference to it within Visual Studio:

![Adding a reference to the COM API](https://www.m-files.com/api/documentation/latest/Pictures/GettingStarted_VisualBasic.PNG)

The API can be used to create almost any solution that retrieve or process information within an M-Files vault, such as:

* Retrieving content from M-Files and display it within another application (e.g. to retrieve customer documents to display within a CRM),
* Creating objects within M-Files (e.g. to create an Order object when a user completes payment online),
* Moving objects through a workflow as required (e.g. when an electronically-signed version of a document is received, move the contract to another state).

The COM API requires the same version of the API on the client machine as the server (e.g. if communicating with an M-Files 2015.3 server, the API must also be of the same version).
{:.note}

## API modes (client vs. server)

The primary focus of creating a connection to the server is to retrieve a [Vault](https://www.m-files.com/api/documentation/latest/MFilesAPI~Vault.html) object.  The Vault object can then be used to query content from the vault, or to process it in some manner.

The API can be used in either "server" or "client" mode. Some API methods are only available in one of the modes.

* A connection in [client mode]({{ site.baseurl }}/APIs/COM-API/Connecting-And-Authenticating/#creating-a-client-connection) is designed to be used in situations where both the user is present, and a connection to the vault has been created in the M-Files Desktop Settings. In client mode, built-in M-Files dialogs (e.g. the "create new object" metadata card) can be shown to the user for them to interact with.

* A connection in [server mode]({{ site.baseurl }}/APIs/COM-API/Connecting-And-Authenticating/#creating-a-server-connection) is designed to be used in situations where the user is not necessarily present, and/or a connection to the vault has not been created in the M-Files Desktop Settings. In server mode, dialogs cannot be shown and the code must programmatically undertake these actions.  The server mode allows connections to M-Files servers using the standard protocols – TCP/IP, HTTPS, and LPC – and supports all the same authentication schemes that M-Files supports.

## Common API objects

### User operations

For finding the vault structure:

* [VaultObjectTypeOperations](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~VaultObjectTypeOperations.html) - used to retrieve information about the [object types](https://www.m-files.com/user-guide/latest/eng/Object_types.html) configured in the vault.
* [VaultClassOperations](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~VaultClassOperations.html) - used to retrieve information about the [classes](https://www.m-files.com/user-guide/latest/eng/Classes.html) configured in the vault.
* [VaultClassGroupOperations](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~VaultClassGroupOperations.html) - used to retrieve information about the [document class groups](https://www.m-files.com/user-guide/latest/eng/Class_groups.html) configured in the vault.
* [VaultPropertyDefOperations](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~VaultPropertyDefOperations.html) - used to retrieve information about the [property definitions](https://www.m-files.com/user-guide/latest/eng/Property_definitions.html) configured in the vault.
* [VaultValueListOperations](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~VaultValueListOperations.html) - used to retrieve information about the [value lists](https://www.m-files.com/user-guide/latest/eng/Value_lists.html) configured within the vault.
* [VaultValueListItemOperations](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~VaultValueListItemOperations.html) - used to retrieve information about items within value lists configured within the vault.
* [VaultWorkflowOperations](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~VaultWorkflowOperations.html) - used to retrieve information about workflows and workflow states within the vault.

For finding objects:

* [VaultObjectSearchOperations](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~VaultObjectSearchOperations.html) - used to search the vault for matching objects.
* [VaultViewOperations](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~VaultViewOperations.html) - used to enumerate the contents of views to find objects.

More information on searching for objects can be found in the <a href="{{ site.baseurl }}/APIs/COM-API/Searching/">dedicated pages</a>.
{:.note}

For working with objects (finding properties, checking in and out, manipulating files, etc.)

* [VaultObjectOperations](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~VaultObjectOperations.html) - used to load, check out, check in, or process objects within the vault.
* [VaultObjectPropertyOperations](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~VaultObjectPropertyOperations.html) - used to load or alter property values (i.e. metadata items) of objects within the vault.
* [VaultObjectFileOperations](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~VaultObjectFileOperations.html) - used to retrieve or alter files on objects within the vault.

### Administrative operations

For working with the vault structure:

* [VaultObjectTypeOperations](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~VaultObjectTypeOperations.html) - used to manage the [object types](https://www.m-files.com/user-guide/latest/eng/Object_types.html) configured in the vault.
* [VaultClassOperations](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~VaultClassOperations.html) - used to manage the [classes](https://www.m-files.com/user-guide/latest/eng/Classes.html) configured in the vault.
* [VaultClassGroupOperations](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~VaultClassGroupOperations.html) - used to manage the [document class groups](https://www.m-files.com/user-guide/latest/eng/Class_groups.html) configured in the vault.
* [VaultPropertyDefOperations](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~VaultPropertyDefOperations.html) - used to manage the [property definitions](https://www.m-files.com/user-guide/latest/eng/Property_definitions.html) configured in the vault.
* [VaultValueListOperations](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~VaultValueListOperations.html) - used to manage the [value lists](https://www.m-files.com/user-guide/latest/eng/Value_lists.html) configured within the vault.
* [VaultValueListItemOperations](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~VaultValueListItemOperations.html) - used to manage items within value lists configured within the vault.
* [VaultWorkflowOperations](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~VaultWorkflowOperations.html) - used to manage workflows and workflow states within the vault.
* [VaultUserOperations](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~VaultUserOperations.html) - used to retrieve and manage users within the vault.
* [VaultUserGroupOperations](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~VaultUserGroupOperations.html) - used to retrieve and manage user groups within the vault.
* [VaultNotificationOperations](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~VaultNotificationOperations.html) - used to send custom notifications.
* [VaultLoginAccountOperations](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~VaultLoginAccountOperations.html) - used to retrieve and manage login accounts within the server.