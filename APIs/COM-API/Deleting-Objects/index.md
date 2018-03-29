---
layout: page
title: Deleting and destroying objects with the COM API
includeInSearch: true
breadcrumb: Deleting objects
---

This page focuses on creating objects using the COM API.  Details on deleting objects using the REST API can be found [in the dedicated page]({{ site.baseurl }}/APIs/REST-API/Deleting-Objects/).
{:.note}

## Deleting vs destroying

When removing objects from an M-Files vault, it is important to decide whether the object should be deleted or destroyed.  Deleted objects are simply flagged as deleted and are hidden from most users.  Administrators can access these deleted items (and optionally undelete/restore them) by searching for them using the M-Files Desktop client.  Destroyed objects are permanently removed from the system and cannot be restored.

## Deleting objects

Destroying one or more versions of an object is done by calling [DeleteObject](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~VaultObjectOperations~DeleteObject.html).

```csharp
// Which vault are we connecting to?
var vaultGuid = "{C840BE1A-5B47-4AC0-8EF7-835C166C8E24}";

// Connect to the vault using a client connection.
// ref: http://developer.m-files.com/APIs/COM-API/#api-modes-client-vs-server
// Note: this code will just return the first connection to the vault.
var clientApplication = new MFilesClientApplication();
var vault =
	clientApplication
			.GetVaultConnectionsWithGUID(vaultGuid)
			.Cast<VaultConnection>()
			.FirstOrDefault()?
			.BindToVault(IntPtr.Zero, true, true);
if(null == vault)
{
	throw new NotImplementedException("Vault connection not found");
}

// We want to delete the document with ID 664.
var objID = new MFilesAPI.ObjID();
objID.SetIDs( 
	ObjType: (int)MFBuiltInObjectType.MFBuiltInObjectTypeDocument,
	ID: 664);

// Delete the object.
vault.ObjectOperations.DeleteObject(objID);
```

## Undeleting objects

Objects that are deleted can be undeleted by administrative users either using the M-Files Desktop client, or by calling [UndeleteObject](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~VaultObjectOperations~UndeleteObject.html).

```csharp
// Which vault are we connecting to?
var vaultGuid = "{C840BE1A-5B47-4AC0-8EF7-835C166C8E24}";

// Connect to the vault using a client connection.
// ref: http://developer.m-files.com/APIs/COM-API/#api-modes-client-vs-server
// Note: this code will just return the first connection to the vault.
var clientApplication = new MFilesClientApplication();
var vault =
	clientApplication
			.GetVaultConnectionsWithGUID(vaultGuid)
			.Cast<VaultConnection>()
			.FirstOrDefault()?
			.BindToVault(IntPtr.Zero, true, true);
if(null == vault)
{
	throw new NotImplementedException("Vault connection not found");
}

// We want to undelete the document with ID 664.
var objID = new MFilesAPI.ObjID();
objID.SetIDs( 
	ObjType: (int)MFBuiltInObjectType.MFBuiltInObjectTypeDocument,
	ID: 664);

// Undelete the object.
vault.ObjectOperations.UndeleteObject(objID);
```

## Destroying objects

Destroying one or more versions of an object is done by calling [DestroyObject](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~VaultObjectOperations~DestroyObject.html).

### Destroying specific object versions

Objects within M-Files have at least one version, typically more than one.  These versions get [automatically incremented as the object is processed]({{ site.baseurl }}/Getting-Started/Objects-And-Versions/#object-history) within M-Files.

![An example of object versions]({{ site.baseurl }}/Built-In/VBScript/Audit-Trail-And-Scripting/history-fixed.png)

To permanently destroy a specific version of an object - leaving all other versions available - call [DestroyObject](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~VaultObjectOperations~DestroyObject.html), ensuring that `DestroyAllVersions` is set to `false`, and `ObjectVersion` is set to the version number that needs to be destroyed.

```csharp
// Which vault are we connecting to?
var vaultGuid = "{C840BE1A-5B47-4AC0-8EF7-835C166C8E24}";

// Connect to the vault using a client connection.
// ref: http://developer.m-files.com/APIs/COM-API/#api-modes-client-vs-server
// Note: this code will just return the first connection to the vault.
var clientApplication = new MFilesClientApplication();
var vault =
	clientApplication
			.GetVaultConnectionsWithGUID(vaultGuid)
			.Cast<VaultConnection>()
			.FirstOrDefault()?
			.BindToVault(IntPtr.Zero, true, true);
if(null == vault)
{
	throw new NotImplementedException("Vault connection not found");
}

// We want to delete the document with ID 664.
var objID = new MFilesAPI.ObjID();
objID.SetIDs( 
	ObjType: (int)MFBuiltInObjectType.MFBuiltInObjectTypeDocument,
	ID: 664);

// Destroy a specific object version.
vault.ObjectOperations.DestroyObject(
	objID,
	DestroyAllVersions: false,
	ObjectVersion: 1);
```

### Destroying all object versions

To permanently destroy a specific version of an object - leaving all other versions available - call [DestroyObject](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~VaultObjectOperations~DestroyObject.html), ensuring that `DestroyAllVersions` is set to `true`, and `ObjectVersion` is set to `-1`.

```csharp
// Which vault are we connecting to?
var vaultGuid = "{C840BE1A-5B47-4AC0-8EF7-835C166C8E24}";

// Connect to the vault using a client connection.
// ref: http://developer.m-files.com/APIs/COM-API/#api-modes-client-vs-server
// Note: this code will just return the first connection to the vault.
var clientApplication = new MFilesClientApplication();
var vault =
	clientApplication
			.GetVaultConnectionsWithGUID(vaultGuid)
			.Cast<VaultConnection>()
			.FirstOrDefault()?
			.BindToVault(IntPtr.Zero, true, true);
if(null == vault)
{
	throw new NotImplementedException("Vault connection not found");
}

// We want to delete the document with ID 664.
var objID = new MFilesAPI.ObjID();
objID.SetIDs( 
	ObjType: (int)MFBuiltInObjectType.MFBuiltInObjectTypeDocument,
	ID: 664);

// Destroy all versions of an object.
vault.ObjectOperations.DestroyObject(
	objID, 
	DestroyAllVersions: true,
	ObjectVersion: -1);
```