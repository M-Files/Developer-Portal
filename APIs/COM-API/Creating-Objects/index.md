---
layout: page
title: Creating objects with the COM API
includeInSearch: true
breadcrumb: Creating objects
---

This page focuses on creating objects using the COM API.  Details on creating objects using the REST API can be found [in the dedicated page]({{ site.baseurl }}/APIs/REST-API/Creating-Objects/).
{:.note}

Creating an object is done by calling [VaultObjectOperations.CreateNewObject](https://www.m-files.com/api/documentation/index.html#MFilesAPI~VaultObjectOperations~CreateNewObject.html), [VaultObjectOperations.CreateNewObjectEx](https://www.m-files.com/api/documentation/index.html#MFilesAPI~VaultObjectOperations~CreateNewObjectEx.html), or [VaultObjectOperations.CreateNewObjectExQuick](https://www.m-files.com/api/documentation/index.html#MFilesAPI~VaultObjectOperations~CreateNewObjectExQuick.html).  The `CreateNewObject` method is the only version supported in the [User Interface Extensibility Framework on the web](https://www.m-files.com/UI_Extensibility_Framework/#ApiSupportInMFilesWeb.html).

`CreateNewObject` will create a new object in the M-Files vault, but **will not check it in**.  It is mandatory that you subsequently call [CheckIn](https://www.m-files.com/api/documentation/index.html#MFilesAPI~VaultObjectOperations~CheckIn.html) so that the object is available.  When calling `CreateNewObjectEx` or `CreateNewObjectExQuick`, the `CheckIn` parameter is used to control whether or not the object should be checked in.
{:.note.warning}

To create a new object, the following information must be known:

1. The ID of the [object type]({{ site.baseurl }}/Getting-Started/Vault-Structure/#object-types) that is being created.  The [MFBuiltInObjectType enumeration](https://www.m-files.com/api/documentation/index.html#MFilesAPI~MFBuiltInObjectType.html) can be used for clarity when dealing with built-in object types such as `Document`.
2. A collection of [property values]({{ site.baseurl }}/Getting-Started/Vault-Structure/#property-values) for the new object.  At a minimum this collection must include:
	* A property value for the [class]({{ site.baseurl }}/Getting-Started/Vault-Structure/#classes) of the new object.
	* A property value for the name or title of the new object.
	* Any other properties which are [defined as mandatory](https://www.m-files.com/api/documentation/index.html#MFilesAPI~ObjectClass~AssociatedPropertyDefs.html) for the given class.
3. If appropriate, the source files to be added for the new object.  Objects - including, but not limited to `Documents` - in M-Files may have zero, one, or more files.  When creating a new object type, it can be controlled whether or not the system [should accept files for objects](https://www.m-files.com/user-guide/latest/eng/New_object_type.html).

In the samples below we will ensure the object is checked in as part of the creation process.  If the object is checked in via a separate call to [CheckIn](https://www.m-files.com/api/documentation/index.html#MFilesAPI~VaultObjectOperations~CheckIn.html) then [exception handling](#handling-exceptions) should be put in place to ensure these objects are not orphaned.
{:.note}

## Creating a single-file-document

In the sample below, a single-file-document is created in the `Other Document` class:

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

// Define the property values for the new object.
var propertyValues = new MFilesAPI.PropertyValues();

// Class.
var classPropertyValue = new MFilesAPI.PropertyValue()
{
	PropertyDef = (int)MFBuiltInPropertyDef.MFBuiltInPropertyDefClass
};
classPropertyValue.Value.SetValue(
	MFDataType.MFDatatypeLookup,  // This must be correct for the property definition.
	(int)MFBuiltInDocumentClass.MFBuiltInDocumentClassOtherDocument
	);
propertyValues.Add(-1, classPropertyValue);

// Name or title.
var nameOrTitlePropertyValue = new MFilesAPI.PropertyValue()
{
	PropertyDef = (int)MFBuiltInPropertyDef.MFBuiltInPropertyDefNameOrTitle
};
nameOrTitlePropertyValue.Value.SetValue(
	MFDataType.MFDatatypeText,  // This must be correct for the property definition.
	"My document"
);
propertyValues.Add(-1, nameOrTitlePropertyValue);

// Define the source files to add.
var sourceFiles = new MFilesAPI.SourceObjectFiles();

// Add one file.
var myFile = new MFilesAPI.SourceObjectFile();
myFile.SourceFilePath = @"C:\temp\test.txt";
myFile.Title = "My test document"; // For single-file-documents this is ignored.
myFile.Extension = "txt";
sourceFiles.Add(-1, myFile);

// What object type is being created?
var objectTypeID = (int) MFBuiltInObjectType.MFBuiltInObjectTypeDocument;

// A "single file document" must be both a document and contain exactly one file.
var isSingleFileDocument =
	objectTypeID == (int) MFBuiltInObjectType.MFBuiltInObjectTypeDocument && sourceFiles.Count == 1;

// Create the object and check it in.
var objectVersion = vault.ObjectOperations.CreateNewObjectEx(
	objectTypeID,
	propertyValues,
	sourceFiles,
	SFD: isSingleFileDocument,
	CheckIn: true );
```

## Creating a multi-file-document

In the sample below, a multi-file-document is created in the `Other Document` class:

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

// Define the property values for the new object.
var propertyValues = new MFilesAPI.PropertyValues();

// Class.
var classPropertyValue = new MFilesAPI.PropertyValue()
{
	PropertyDef = (int)MFBuiltInPropertyDef.MFBuiltInPropertyDefClass
};
classPropertyValue.Value.SetValue(
	MFDataType.MFDatatypeLookup,  // This must be correct for the property definition.
	(int)MFBuiltInDocumentClass.MFBuiltInDocumentClassOtherDocument
	);
propertyValues.Add(-1, classPropertyValue);

// Name or title.
var nameOrTitlePropertyValue = new MFilesAPI.PropertyValue()
{
	PropertyDef = (int)MFBuiltInPropertyDef.MFBuiltInPropertyDefNameOrTitle
};
nameOrTitlePropertyValue.Value.SetValue(
	MFDataType.MFDatatypeText,  // This must be correct for the property definition.
	"My document"
);
propertyValues.Add(-1, nameOrTitlePropertyValue);

// Define the source files to add.
var sourceFiles = new MFilesAPI.SourceObjectFiles();

// Add one file.
var myFile = new MFilesAPI.SourceObjectFile();
myFile.SourceFilePath = @"C:\temp\test.txt";
myFile.Title = "My text file";
myFile.Extension = "txt";
sourceFiles.Add(-1, myFile);

// Add a second file.
var myFile2 = new MFilesAPI.SourceObjectFile();
myFile2.SourceFilePath = @"C:\temp\abc.csv";
myFile2.Title = "My csv file";
myFile2.Extension = "csv";
sourceFiles.Add(-1, myFile2);

// What object type is being created?
var objectTypeID = (int) MFBuiltInObjectType.MFBuiltInObjectTypeDocument;

// A "single file document" must be both a document and contain exactly one file.
var isSingleFileDocument =
	objectTypeID == (int) MFBuiltInObjectType.MFBuiltInObjectTypeDocument && sourceFiles.Count == 1;

// Create the object and check it in.
var objectVersion = vault.ObjectOperations.CreateNewObjectEx(
	objectTypeID,
	propertyValues,
	sourceFiles,
	SFD: isSingleFileDocument,
	CheckIn: true );
```

## Creating a non-document-object

In the sample below, an `Employee` is created instead of a document.  The employee has no files, but requires us to provide a property value to state whether or not they are a supervisor:

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

// Define the property values for the new object.
var propertyValues = new MFilesAPI.PropertyValues();

// Class.
var classPropertyValue = new MFilesAPI.PropertyValue()
{
	PropertyDef = (int)MFBuiltInPropertyDef.MFBuiltInPropertyDefClass
};
classPropertyValue.Value.SetValue(
	MFDataType.MFDatatypeLookup,  // This must be correct for the property definition.
	90 // This must be the ID of a class within the object type specified below.
	);
propertyValues.Add(-1, classPropertyValue);

// Name or title.
var nameOrTitlePropertyValue = new MFilesAPI.PropertyValue()
{
	PropertyDef = (int)MFBuiltInPropertyDef.MFBuiltInPropertyDefNameOrTitle
};
nameOrTitlePropertyValue.Value.SetValue(
	MFDataType.MFDatatypeText,  // This must be correct for the property definition.
	"My new employee"
);
propertyValues.Add(-1, nameOrTitlePropertyValue);

// The employee class requires us to define whether they are a supervisor.
var isSupervisorPropertyValue = new MFilesAPI.PropertyValue()
{
	PropertyDef = 1137 // "Is Supervisor?" property definition ID.
};
isSupervisorPropertyValue.Value.SetValue(
	MFDataType.MFDatatypeBoolean,  // This must be correct for the property definition.
	false
);
propertyValues.Add(-1, isSupervisorPropertyValue);

// Define the source files to add (none, in this case).
var sourceFiles = new MFilesAPI.SourceObjectFiles();

// What object type is being created (Employee)?
var objectTypeID = 156; // Employee object type ID.

// A "single file document" must be both a document and contain exactly one file.
var isSingleFileDocument =
	objectTypeID == (int) MFBuiltInObjectType.MFBuiltInObjectTypeDocument && sourceFiles.Count == 1;

// Create the object and check it in.
var objectVersion = vault.ObjectOperations.CreateNewObjectEx(
	objectTypeID,
	propertyValues,
	sourceFiles,
	SFD: isSingleFileDocument,
	CheckIn: true );
```

## Showing a dialog (basic)

When using the COM API in "client mode", built-in M-Files dialogs can be shown to allow the user to perform tasks such as creation of new objects.  This cannot be done when using the COM API in "server mode".

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

// What object type is being created (Employee)?
var objectTypeID = 156;

// Show the basic creation dialog.
var response = vault.ObjectOperations.ShowBasicNewObjectWindow(IntPtr.Zero,
	vault.ObjectTypeOperations.GetObjectType(objectTypeID));
if (response.Result == MFObjectWindowResultCode.MFObjectWindowResultCodeOk)
{
	Console.WriteLine("The object was created.");
}
```

## Showing a dialog (advanced)

When using the COM API in "client mode", built-in M-Files dialogs can be shown to allow the user to perform tasks such as creation of new objects.  This cannot be done when using the COM API in "server mode".

In addition to the `ShowBasicNewObjectWindow` example above, the `ShowPrefilledNewObjectWindow` method can be used to pre-populate the property values shown, as well as supply a default set of files to attach to the object.

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

// Define the property values for the new object.
var propertyValues = new MFilesAPI.PropertyValues();

// Class.
var classPropertyValue = new MFilesAPI.PropertyValue()
{
	PropertyDef = (int)MFBuiltInPropertyDef.MFBuiltInPropertyDefClass
};
classPropertyValue.Value.SetValue(
	MFDataType.MFDatatypeLookup,  // This must be correct for the property definition.
	(int)MFBuiltInDocumentClass.MFBuiltInDocumentClassOtherDocument
	);
propertyValues.Add(-1, classPropertyValue);

// Name or title.
var nameOrTitlePropertyValue = new MFilesAPI.PropertyValue()
{
	PropertyDef = (int)MFBuiltInPropertyDef.MFBuiltInPropertyDefNameOrTitle
};
nameOrTitlePropertyValue.Value.SetValue(
	MFDataType.MFDatatypeText,  // This must be correct for the property definition.
	"My new document"
);
propertyValues.Add(-1, nameOrTitlePropertyValue);

// Define the source files to add (none, in this case).
var sourceFiles = new MFilesAPI.SourceObjectFiles();

// Add one file.
var myFile = new MFilesAPI.SourceObjectFile();
myFile.SourceFilePath = @"C:\temp\test.txt";
myFile.Title = "My text file";
myFile.Extension = "txt";
sourceFiles.Add(-1, myFile);

// Add a second file.
var myFile2 = new MFilesAPI.SourceObjectFile();
myFile2.SourceFilePath = @"C:\temp\abc.csv";
myFile2.Title = "My csv file";
myFile2.Extension = "csv";
sourceFiles.Add(-1, myFile2);

// What object type is being created?
var objectTypeID = (int)MFBuiltInObjectType.MFBuiltInObjectTypeDocument;

// Set up the object creation information.
var objectCreationInfo = new MFilesAPI.ObjectCreationInfo();
objectCreationInfo.SetObjectType(objectTypeID, Editable: false);
objectCreationInfo.SetSourceFiles(sourceFiles);

// Show the basic creation dialog.
var response = vault.ObjectOperations.ShowPrefilledNewObjectWindow(IntPtr.Zero,
	MFObjectWindowMode.MFObjectWindowModeInsertSourceFiles,
	objectCreationInfo,
	propertyValues);
if (response.Result == MFObjectWindowResultCode.MFObjectWindowResultCodeOk)
{
	// Check the object in.
	vault.ObjectOperations.CheckIn(response.ObjVer);
}
```

## Handling exceptions

Code which executes within the M-Files vault (e.g. VBScript, or a Vault Application Framework event handler) typically executes within a transaction.  Exceptions that occur within that code - thrown either by the API or manually - typically cause other actions within M-Files associated with that transaction to be rolled back.  For example: if a script creates an object in line 20, but the code excepts in line 25, the transaction will be rolled back and the object creation undone.

It is important to note that exceptions that occur outside of these implicit transactions are not automatically rolled back.  For example: if a .NET service connects to the server, creates an object, then excepts before it is checked in, the object will stay checked out and M-Files will not attempt to check it back in.

Consider the following pseudo-code.  In the code below, the object was created in the vault in the `CreateNewObjectEx` call, but is not checked in as part of the call.  A later, separate, call to `CheckIn` is made, although the code will except before the call is made.

In this instance it is important to know that the object still exists in the system.  Objects that have been created but have no checked-in versions will not be visible to anyone else in the vault, including system administrators.  These objects are only visible to the user that this code is executing as, from the machine on which the code runs.  i.e. If this code connects via the API to the M-Files server as `Alex K` on machine `DESKTOP01`, then only the API running as `Alex K` on machine `DESKTOP01` can see the object; the M-Files Desktop client running as `Alex K` on a different machine cannot see it.

```csharp
// Connect to the vault
var vault = ...;

// Define the property values for the new object.
var propertyValues = ...;

// Define the source files to add.
var sourceFiles = ...;

// What object type is being created?
var objectTypeID = ...;

// Create the object but do not check it in.
var newObjectVersion = vault.ObjectOperations.CreateNewObjectEx(
	objectTypeID,
	propertyValues,
	sourceFiles,
	SFD: false,
	CheckIn: false );

// Force an exception.
throw new InvalidOperationException("Something went wrong.");

// Check in the object.
vault.ObjectOperations.CheckIn(objectVersion.ObjVer);
```

When writing production code such as this, it is important to ensure that proper exception handling is put in place.  To stop the object being left in an awkward state, the exception is handled and the checkout is "undone", removing the object created earlier in the script.

```csharp
// Connect to the vault
var vault = ...;

// Define the property values for the new object.
var propertyValues = ...;

// Define the source files to add.
var sourceFiles = ...;

// What object type is being created?
var objectTypeID = ...;

// Create the object but do not check it in.
MFilesAPI.ObjectVersionAndProperties newObjectVersion = null;
try
{
	newObjectVersion = vault.ObjectOperations.CreateNewObjectEx(
		objectTypeID,
		propertyValues,
		sourceFiles,
		SFD: isSingleFileDocument,
		CheckIn: false);

	// Force an exception.
	throw new InvalidOperationException("Something went wrong.");
}
catch
{
	// TODO: Ensure the exception is logged.

	// Undo the creation.
	if (null != newObjectVersion)
	{
		vault.ObjectOperations.UndoCheckout(newObjectVersion.ObjVer);
	}

	// Optionally, throw the original exception.
	throw;
}
```