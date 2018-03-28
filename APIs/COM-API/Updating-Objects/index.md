---
layout: page
title: Updating objects with the COM API
includeInSearch: true
breadcrumb: Updating objects
---

This page focuses on creating objects using the COM API.  Details on creating and updating objects using the REST API can be found [in the dedicated page]({{ site.baseurl }}/APIs/REST-API/Updating-Objects/).
{:.note}

Updating an object (e.g. the file, its metadata, or to move it through a workflow) always requires three steps:

1. Check out the object, creating a new version.
2. Make the required alterations to the new version.
3. Check in the new object version.

Objects can only be checked out by one person at a time.  If another person has an object checked out, then the call to [CheckOut](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~VaultObjectOperations~CheckOut.html) will fail and the object cannot be updated.
{:.note.warning}

## Updating metadata

In the example below, an object's name is altered.

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

// We want to alter the document with ID 249.
var objID = new MFilesAPI.ObjID();
objID.SetIDs(
	ObjType: (int)MFBuiltInObjectType.MFBuiltInObjectTypeDocument,
	ID: 249);

// Check out the object.
var checkedOutObjectVersion = vault.ObjectOperations.CheckOut(objID);

// Create a property value to update.
var nameOrTitlePropertyValue = new MFilesAPI.PropertyValue
{
	PropertyDef = (int)MFBuiltInPropertyDef.MFBuiltInPropertyDefNameOrTitle
};
nameOrTitlePropertyValue.Value.SetValue(
	MFDataType.MFDatatypeText,  // This must be correct for the property definition.
	"My renamed document"
);

// Update the property on the server.
vault.ObjectPropertyOperations.SetProperty(
	ObjVer: checkedOutObjectVersion.ObjVer,
	PropertyValue: nameOrTitlePropertyValue);

// Check the object back in.
vault.ObjectOperations.CheckIn(checkedOutObjectVersion.ObjVer);
```

## Adding a file

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

// We want to alter the document with ID 664.
var objID = new MFilesAPI.ObjID();
objID.SetIDs( 
	ObjType: (int)MFBuiltInObjectType.MFBuiltInObjectTypeDocument,
	ID: 664);

// Check out the object.
var checkedOutObjectVersion = vault.ObjectOperations.CheckOut(objID);

// Add one file.
// Note: this will fail if the object is a "single file document".
// It must be converted to a multi-file-document as part of the process (see below).
vault.ObjectFileOperations.AddFile(
	ObjVer: checkedOutObjectVersion.ObjVer,
	Title: "My test document",
	Extension: "txt",
	SourcePath: @"C:\temp\test.txt");

// Check the object back in.
vault.ObjectOperations.CheckIn(checkedOutObjectVersion.ObjVer);

```

## Converting between single-file and multi-file

Occasionally it is required to alter a document from a [single-file document to a multi-file document](https://www.m-files.com/user-guide/latest/eng/MFD_SFD.html?hl=single-file%2Cdocument).  To do this, either use [SetSingleFileObject](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~VaultObjectOperations~SetSingleFileObject.html), or alter [property 22 (MFBuiltInPropertyDefSingleFileObject)](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~MFBuiltInPropertyDef.html).

In the example below we will call convert the object to a multi-file document before we add a second file to it.  If, after having added the second file, there is only one file on the object (e.g. it had no files before), then we will convert it to a single-file document.

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

// We want to alter the document with ID 664.
var objID = new MFilesAPI.ObjID();
objID.SetIDs( 
	ObjType: (int)MFBuiltInObjectType.MFBuiltInObjectTypeDocument,
	ID: 664);

// Check out the object.
var checkedOutObjectVersion = vault.ObjectOperations.CheckOut(objID);

// If it is document and set to single-file, alter it to multi-file.
if (checkedOutObjectVersion.ObjVer.Type == (int)MFBuiltInObjectType.MFBuiltInObjectTypeDocument
	&& checkedOutObjectVersion.SingleFile)
{
	vault.ObjectOperations.SetSingleFileObject(
		ObjVer: checkedOutObjectVersion.ObjVer, 
		SingleFile: false); // Setting to false alters it to a multi-file-document.
}

// Add one file.
vault.ObjectFileOperations.AddFile(
	ObjVer: checkedOutObjectVersion.ObjVer,
	Title: "My test document",
	Extension: "txt",
	SourcePath: @"C:\temp\test.txt");

// If it had zero files before (i.e. it has exactly one file now), then set it to single-file.
if (checkedOutObjectVersion.ObjVer.Type == (int)MFBuiltInObjectType.MFBuiltInObjectTypeDocument
	&& checkedOutObjectVersion.FilesCount == 0)
{
	vault.ObjectOperations.SetSingleFileObject(
		ObjVer: checkedOutObjectVersion.ObjVer,
		SingleFile: true);
}

// Check the object back in.
vault.ObjectOperations.CheckIn(checkedOutObjectVersion.ObjVer);
```

## Moving an item through a workflow

Workflows within M-Files are exceptionally powerful.  Objects hold information on the workflow and workflow state that they are in as properties.  To move an object through a workflow, simply update these properties.  To provide a version comment as part of the transition, or to provide electronic signature information, the [SetWorkflowState](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~VaultObjectPropertyOperations~SetWorkflowState.html) method must be used.

When updating an object to move it through a workflow, the system will perform various actions to ensure that the transition is valid.  These include checking that moving from the current state to the new state is a valid transition, may include permissions checks to ensure that the current user can action it, or executing some server-side validation logic to ensure that the transition adheres to various business rules.  It is important to ensure that [exception handling](#handling-exceptions) is put in place to ensure that objects are not left checked out.
{:.note}

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

// We want to alter the document with ID 526.
var objID = new MFilesAPI.ObjID();
objID.SetIDs(
	ObjType: (int)MFBuiltInObjectType.MFBuiltInObjectTypeDocument,
	ID: 526);

// Check out the object.
var checkedOutObjectVersion = vault.ObjectOperations.CheckOut(objID);

// Create a property value for the (new) workflow state.
var workflowStateProperty = new MFilesAPI.PropertyValue
{
	PropertyDef = (int)MFBuiltInPropertyDef.MFBuiltInPropertyDefState
};
workflowStateProperty.Value.SetValue(
	MFDataType.MFDatatypeLookup,
	161 ); // The ID of a workflow state that is valid to move to from the current one.

// Update the property on the server.
vault.ObjectPropertyOperations.SetProperty(
	ObjVer: checkedOutObjectVersion.ObjVer,
	PropertyValue: workflowStateProperty);

// Check the object back in.
vault.ObjectOperations.CheckIn(checkedOutObjectVersion.ObjVer);
```

## Handling exceptions

Code which executes within the M-Files vault (e.g. VBScript, or a Vault Application Framework event handler) typically executes within a transaction.  Exceptions that occur within that code - thrown either by the API or manually - typically cause other actions within M-Files associated with that transaction to be rolled back.  For example: if a script creates an object in line 20, but the code excepts in line 25, the transaction will be rolled back and the object creation undone.

It is important to note that exceptions that occur outside of these implicit transactions are not automatically rolled back.  For example: if a .NET service connects to the server, checks out an object, then excepts before it is checked back in, the object will stay checked out and M-Files will not attempt to check it back in.

In the code below, updating the object may fail for a number of reasons (e.g. the provided workflow state ID is not valid, or the object does not meet one of the new states precondition checks).  To stop the object being left checked out, the exception is handled and the checkout is undone.

```csharp
// Connect to the vault
var vault = ...;

// We want to alter the document with ID 526.
var objID = new MFilesAPI.ObjID();
objID.SetIDs(
	ObjType: (int)MFBuiltInObjectType.MFBuiltInObjectTypeDocument,
	ID: 526);

// Check out the object.
var checkedOutObjectVersion = vault.ObjectOperations.CheckOut(objID);

// Create a property value for the (new) workflow state.
var workflowStateProperty = new MFilesAPI.PropertyValue
{
	PropertyDef = (int)MFBuiltInPropertyDef.MFBuiltInPropertyDefState
};
workflowStateProperty.Value.SetValue(
	MFDataType.MFDatatypeLookup,
	161 ); // The ID of a workflow state that is valid to move to from the current one.

try
{
	// Update the property on the server.
	vault.ObjectPropertyOperations.SetProperty(
		ObjVer: checkedOutObjectVersion.ObjVer,
		PropertyValue: workflowStateProperty);

	// Check the object back in.
	vault.ObjectOperations.CheckIn(checkedOutObjectVersion.ObjVer);
}
catch
{
	// TODO: Ensure the exception is logged.

	// Undo the checkout (leave the object available for others to use).
	if (null != checkedOutObjectVersion)
	{
		vault.ObjectOperations.UndoCheckout(checkedOutObjectVersion.ObjVer);
	}

	// Optionally, throw the original exception.
	throw;
}
```