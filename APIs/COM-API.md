---
layout: page
title: The COM/.NET API
---

The [M-Files COM/.NET API]({{ site.baseurl }}/APIs/COM-API/) can be used from any software that can interact with COM. This API is our most comprehensive API and provides interfaces for most "user" and "administrative" functions.

The API is available on both 32-bit and 64-bit versions and is typically referenced from your code by adding a reference to it within Visual Studio:

## Connecting to a vault

The API can be used in either "server" or "client" mode. Some API methods are only available in one of the modes. The API major and minor versions must match the server version (e.g. 2015.3 API to communicate with the 2015.3 server).  Client mode is designed to be used in situations where both the user is present, and a connection to the vault has been created in the M-Files Desktop Settings. In client mode, built-in M-Files dialogs (e.g. the "create new object" metadata card) can be shown to the user for them to interact with.  Server mode is designed to be used in situations where the user is not necessarily present, and/or a connection to the vault has not been created in the M-Files Desktop Settings. In server mode, dialogs cannot be shown and the code must programmatically undertake these actions.  The server mode allows connections to M-Files servers using the standard protocols – TCP/IP, HTTPS, and LPC – and supports all the same authentication schemes that M-Files supports.

The primary focus of creating a connection to the server is to create a [Vault](https://www.m-files.com/api/documentation/latest/MFilesAPI~Vault.html) object.  The Vault object can then be used to query content from the vault, or to process it in some manner.

### Creating a Server Connection

When creating a server connection, you must provide all information about the connection (the server details, how to communicate with it, authentication details, and the vault GUID).

```csharp
// Instantiate an MFilesServerApplication object.
// https://www.m-files.com/api/documentation/latest/MFilesAPI~MFilesServerApplication.html
var mfServerApplication = new MFilesServerApplication();

// Connect to a local server using the default parameters (TCP/IP, localhost, current Windows user).
// https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~MFilesServerApplication~Connect.html
mfServerApplication.Connect();

// Obtain a connection to the vault with GUID {C840BE1A-5B47-4AC0-8EF7-835C166C8E24}.
// Note: this will except if the vault is not found.
var vault = mfServerApplication.LogInToVault("{C840BE1A-5B47-4AC0-8EF7-835C166C8E24}");
```

### Creating a Client Connection

A client connection requires that a connection to the vault has already been created using the [M-Files Desktop Settings](http://www.m-files.com/user-guide/latest/eng/#Implementing_the_document_vault.html) application.  When creating a client connection, the connection information (the server details, how to communicate with it, and authentication details) are held within the existing connection, and we just need to retrieve the connection.

```csharp
// Instantiate an MFilesClientApplication object.
// https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~MFilesClientApplication.html
var mfClientApplication = new MFilesClientApplication();

// Find all connections to the vault with GUID {C840BE1A-5B47-4AC0-8EF7-835C166C8E24},
// then select the first one and bind to it if we can.
// Note: this will return null if no connections are created.
var vault = mfClientApplication.GetVaultConnectionsWithGUID("{C840BE1A-5B47-4AC0-8EF7-835C166C8E24}")
	.Cast<VaultConnection>()
	.FirstOrDefault()?
	.BindToVault(IntPtr.Zero, CanLogIn: true, ReturnNULLIfCancelledByUser: true);
```

## Common objects

### User operations

For finding the vault structure:

* [VaultObjectTypeOperations](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~VaultObjectTypeOperations.html) - used to retrieve information about the [object types](http://www.m-files.com/user-guide/latest/eng/#Object_types.html) configured in the vault.
* [VaultClassOperations](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~VaultClassOperations.html) - used to retrieve information about the [classes](http://www.m-files.com/user-guide/latest/eng/#Classes.html) configured in the vault.
* [VaultClassGroupOperations](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~VaultClassGroupOperations.html) - used to retrieve information about the [document class groups](http://www.m-files.com/user-guide/latest/eng/#Class_groups.html) configured in the vault.
* [VaultPropertyDefOperations](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~VaultPropertyDefOperations.html) - used to retrieve information about the [property definitions](http://www.m-files.com/user-guide/latest/eng/#Property_definitions.html) configured in the vault.
* [VaultValueListOperations](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~VaultValueListOperations.html) - used to retrieve information about the [value lists](http://www.m-files.com/user-guide/latest/eng/#Value_lists.html) configured within the vault.
* [VaultValueListItemOperations](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~VaultValueListItemOperations.html) - used to retrieve information about items within value lists configured within the vault.
* [VaultWorkflowOperations](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~VaultWorkflowOperations.html) - used to retrieve information about workflows and workflow states within the vault.

For finding objects:

* [VaultObjectSearchOperations](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~VaultObjectSearchOperations.html) - used to search the vault for matching objects.
* [VaultViewOperations](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~VaultViewOperations.html) - used to enumerate the contents of views to find objects.

For working with objects (finding properties, checking in and out, manipulating files, etc.)

* [VaultObjectOperations](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~VaultObjectOperations.html) - used to load, check out, check in, or process objects within the vault.
* [VaultObjectPropertyOperations](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~VaultObjectPropertyOperations.html) - used to load or alter property values (i.e. metadata items) of objects within the vault.
* [VaultObjectFileOperations](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~VaultObjectFileOperations.html) - used to retrieve or alter files on objects within the vault.

### Administrative operations

For working with the vault structure:

* [VaultObjectTypeOperations](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~VaultObjectTypeOperations.html) - used to manage the [object types](http://www.m-files.com/user-guide/latest/eng/#Object_types.html) configured in the vault.
* [VaultClassOperations](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~VaultClassOperations.html) - used to manage the [classes](http://www.m-files.com/user-guide/latest/eng/#Classes.html) configured in the vault.
* [VaultClassGroupOperations](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~VaultClassGroupOperations.html) - used to manage the [document class groups](http://www.m-files.com/user-guide/latest/eng/#Class_groups.html) configured in the vault.
* [VaultPropertyDefOperations](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~VaultPropertyDefOperations.html) - used to manage the [property definitions](http://www.m-files.com/user-guide/latest/eng/#Property_definitions.html) configured in the vault.
* [VaultValueListOperations](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~VaultValueListOperations.html) - used to manage the [value lists](http://www.m-files.com/user-guide/latest/eng/#Value_lists.html) configured within the vault.
* [VaultValueListItemOperations](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~VaultValueListItemOperations.html) - used to manage items within value lists configured within the vault.
* [VaultWorkflowOperations](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~VaultWorkflowOperations.html) - used to manage workflows and workflow states within the vault.
* [VaultUserOperations](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~VaultUserOperations.html) - used to retrieve and manage users within the vault.
* [VaultUserGroupOperations](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~VaultUserGroupOperations.html) - used to retrieve and manage user groups within the vault.
* [VaultNotificationOperations](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~VaultNotificationOperations.html) - used to send custom notifications.
* [VaultLoginAccountOperations](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~VaultLoginAccountOperations.html) - used to retrieve and manage login accounts within the server.