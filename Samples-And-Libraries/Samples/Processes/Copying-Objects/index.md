---
layout: page
title: Copying Objects
includeInSearch: true
---

This sample shows how to create a copy of an object, including all metadata and files, when it moves into a specific workflow state.  This can be useful in scenarios such as controlled document management where a published version a document may need to be created once a document is authorised, or to copy metadata from one object type (e.g. a Quotation) to a new object type (e.g. an Order).

Full source code for this sample is available <a href="https://github.com/M-Files/MFilesSamplesAndLibraries/tree/master/Samples/Processes/CopyingObjects">in our GitHub Samples and Libraries repository</a>.
{:.note}

## Overview

Any object within M-Files consists of internal data (e.g. the object type and ID), metadata (both automated and manual), zero or more files, and an access control list.  To create a copy of an object, we must create a copy of two sets of data:

1. We must copy the current object's `PropertyValues`, removing any that we do not wish to propagate to the new object (e.g. `Created`).
2. We must copy the current object's `Files`, by downloading them from the server, creating a [SourceObjectFiles](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~SourceObjectFiles.html) collection, and then re-attaching them to the new object.

Once we have this content, we can call [CreateNewObject](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~VaultObjectOperations~CreateNewObject.html), [CreateNewObjectEx](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~VaultObjectOperations~CreateNewObjectEx.html) or [CreateNewObjectExQuick](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~VaultObjectOperations~CreateNewObjectExQuick.html) to actually create the copy.

The code below is assumed to run as a workflow state action, as this is the typical usage scenario.
{:.note}

## A VBScript Approach

### Creating a copy of the properties

Within a workflow state action, the current property values are available within a workflow state action as a variable named [PropertyValues](https://www.m-files.com/user-guide/latest/eng/Variables.html), which is of type [PropertyValues](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~PropertyValues.html).  Duplicating the content of this collection is a two-step process:

1. The `PropertyValues` variable contains a [Clone method](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~PropertyValues~Clone.html), which can be used to create a copy of the object (line 18).
2. Some properties will need to be removed from the collection, as they don't make sense to have on the new object (lines 22-23).

This code removes the `MFBuiltInPropertyDefWorkflow` and `MFBuiltInPropertyDefState` built-in properties from the collection, as the new object doesn't need to be in the same workflow.  It may also be that other <a href="https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~MFBuiltInPropertyDef.html">built-in properties</a> should be removed, such as the creation date.
{:.note}

```vbscript
Option Explicit

' Let's get a copy of the property values.
Dim objNewObjectPropertyValues: Set objNewObjectPropertyValues = GetNewObjectPropertyValues(PropertyValues)

' TODO: Get a copy of the files.

' TODO: Create the object.

' TODO: Clean up.

''' HELPER FUNCTIONS

' Gets a copy of the property values, for use when creating a new object.
Function GetNewObjectPropertyValues(oPropertyValuesToCloneFrom)
	
	' Clone the property values we were passed.
	Dim objNewObjectPropertyValues: Set objNewObjectPropertyValues = oPropertyValuesToCloneFrom.Clone()

	' Remove the workflow and workflow state properties
	' (as otherwise it'll try and put it in the same state, which tries to copy it, which... infinite loop).
	RemovePropertyValueIfFound objNewObjectPropertyValues, MFBuiltInPropertyDefWorkflow
	RemovePropertyValueIfFound objNewObjectPropertyValues, MFBuiltInPropertyDefState

	' Possibly also want to remove some other built-in properties such as created and created by.
	' Ref: https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~MFBuiltInPropertyDef.html
	
	' Return the property values.
	Set GetNewObjectPropertyValues = objNewObjectPropertyValues
	
End Function

' Removes a property value from the collection if it's found.
Sub RemovePropertyValueIfFound(ByRef oPropertyValues, iPropertyDef)
	
	' Find the index of the property value (-1 if not found).
	Dim index: index = oPropertyValues.IndexOf(iPropertyDef)

	' If it was found then remove it.
	If index > -1 Then oPropertyValues.Remove index
	
End Sub
```

### Creating a copy of the files

Unlike the property values, the file content is not automatically available within the event handler.  Additionally: the file data needs to be converted from [ObjectFiles](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~ObjectFiles.html) to [SourceObjectFiles](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~SourceObjectFiles.html) to be used within the creation call.  Specifically, we must:

1. Retrieve the file information (line 60).
2. Download the files to a temporary location (line 76)
4. Create the [SourceObjectFiles](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~SourceObjectFiles.html) collection (line 63) and populate it (lines 78-82).
6. *TODO: [Create the object](#creating-the-object)*
7. Cleanup of the temporary files (lines 95-113).

```vbscript
Option Explicit

' Special folder value for TemporaryFolder, from https://msdn.microsoft.com/en-us/library/a72y2t1c(v=vs.84).aspx.
Const TemporaryFolder = 2
	
' Create a filesystemobject to help working with files.
Dim objFSO: Set objFSO = CreateObject("Scripting.FileSystemObject")

' Let's get a copy of the property values.
Dim objNewObjectPropertyValues: Set objNewObjectPropertyValues = GetNewObjectPropertyValues(PropertyValues)

' Let's get a copy of the files.
Dim objNewObjectSourceFiles: Set objNewObjectSourceFiles = GetNewObjectSourceFiles(ObjVer)

' TODO: Create the object.

' Clean up.
ClearTemporaryFiles objNewObjectSourceFiles

''' HELPER FUNCTIONS

' Gets a copy of the property values, for use when creating a new object.
Function GetNewObjectPropertyValues(oPropertyValuesToCloneFrom)
	
	' Clone the property values we were passed.
	Dim objNewObjectPropertyValues: Set objNewObjectPropertyValues = oPropertyValuesToCloneFrom.Clone()

	' Remove the workflow and workflow state properties
	' (as otherwise it'll try and put it in the same state, which tries to copy it, which... infinite loop).
	RemovePropertyValueIfFound objNewObjectPropertyValues, MFBuiltInPropertyDefWorkflow
	RemovePropertyValueIfFound objNewObjectPropertyValues, MFBuiltInPropertyDefState

	' Possibly also want to remove some other built-in properties such as created and created by.
	' Ref: https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~MFBuiltInPropertyDef.html
	
	' Return the property values.
	Set GetNewObjectPropertyValues = objNewObjectPropertyValues
	
End Function

' Removes a property value from the collection if it's found.
Sub RemovePropertyValueIfFound(ByRef oPropertyValues, iPropertyDef)
	
	' Find the index of the property value (-1 if not found).
	Dim index: index = oPropertyValues.IndexOf(iPropertyDef)

	' If it was found then remove it.
	If index > -1 Then oPropertyValues.Remove index
	
End Sub

' Downloads the files for the provided object version and creates a
' SourceObjectFiles collection for use when creating a new object.
Function GetNewObjectSourceFiles(oSourceObjVer)

	' Get a reference to the temporary folder.
	Dim strTempFolderPath: strTempFolderPath = objFSO.GetSpecialFolder(TemporaryFolder).Path

	' Get the files for the current objver.
	Dim objFiles: Set objFiles = Vault.ObjectFileOperations.GetFiles(oSourceObjVer)

	' Create our collection to return.
	Dim objSourceFiles: Set objSourceFiles = CreateObject("MFilesAPI.SourceObjectFiles")

	' Iterate over the files and download each in turn.
	Dim intCounter, objFile
	For intCounter = 1 To objFiles.Count
		
		' Which file are we working with?
		Set objFile = objFiles.Item(intCounter)
	
		' Where can we download it?
		Dim strTemporaryFilePath: strTemporaryFilePath = objFSO.BuildPath(strTempFolderPath, objFSO.GetTempName()) & "." & objFile.Extension

		' Download the file.
		Vault.ObjectFileOperations.DownloadFile objFile.ID, objFile.Version, strTemporaryFilePath

		' Create an object source file for this temporary file.
		Dim objObjectSourceFile: Set objObjectSourceFile = CreateObject("MFilesAPI.SourceObjectFile")
		objObjectSourceFile.Extension = objFile.Extension
		objObjectSourceFile.SourceFilePath = strTemporaryFilePath
		objObjectSourceFile.Title = objFile.Title

		' Add it to the collection.
		objSourceFiles.Add -1, objObjectSourceFile

	Next

	' Return the temporary files.
	Set GetNewObjectSourceFiles = objSourceFiles

End Function

' Clears temporary files.
Sub ClearTemporaryFiles(objObjectSourceFiles)

	' Iterate over the files and clear up each in turn.
	Dim intCounter, objFile
	For intCounter = 1 To objObjectSourceFiles.Count
		
		' Which file are we working with?
		Set objFile = objObjectSourceFiles.Item(intCounter)
		
		' If it exists, try and delete it.
		If objFSO.FileExists(objFile.SourceFilePath) Then
			On Error Resume Next
			objFSO.DeleteFile objFile.SourceFilePath, True
			On Error Goto 0
		End If

	Next

End Sub
```

### Creating the object

There are a number of API methods that can be used to create new objects, but this sample will use [CreateNewObjectExQuick](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~VaultObjectOperations~CreateNewObjectExQuick.html), as it allows the object to be easily checked in with the same call.  In addition to the property and file information we have, the method defines four additional parameters:
* `ObjectType` - the ID of the type of object to create (we can get this from `ObjVer.Type`).
* `SFD` - a flag to note whether the object is a single file document or not.
* `CheckIn` - whether to check the object in as part of the call
* `AccessControlList` - the [Access Control List](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~AccessControlList.html) to apply to the new object.

To complete the code, we must:

1. Decide whether the object is a single-file-document or not (lines 16-29).
2. Decide which access control list to apply to the document (line 22).
3. Call [CreateNewObjectExQuick](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~VaultObjectOperations~CreateNewObjectExQuick.html) (line 25).


```vbscript
Option Explicit

' Special folder value for TemporaryFolder, from https://msdn.microsoft.com/en-us/library/a72y2t1c(v=vs.84).aspx.
Const TemporaryFolder = 2
	
' Create a filesystemobject to help working with files.
Dim objFSO: Set objFSO = CreateObject("Scripting.FileSystemObject")

' Let's get a copy of the property values.
Dim objNewObjectPropertyValues: Set objNewObjectPropertyValues = GetNewObjectPropertyValues(PropertyValues)

' Let's get a copy of the files.
Dim objNewObjectSourceFiles: Set objNewObjectSourceFiles = GetNewObjectSourceFiles(ObjVer)

' Is it a single-file-document (has exactly one file, and type of document)?
Dim bolIsSingleFileDocument: bolIsSingleFileDocument = False
If objNewObjectSourceFiles.Count = 1 AND ObjVer.Type = MFBuiltInObjectTypeDocument Then
	bolIsSingleFileDocument = True
End If

' Use a default ACL.
Dim objAccessControlList: Set objAccessControlList = CreateObject("MFilesAPI.AccessControlList")

' Create the object.
Vault.ObjectOperations.CreateNewObjectExQuick ObjVer.Type, objNewObjectPropertyValues, objNewObjectSourceFiles, bolIsSingleFileDocument, True, objAccessControlList

' Clean up.
ClearTemporaryFiles objNewObjectSourceFiles

''' HELPER FUNCTIONS

' Gets a copy of the property values, for use when creating a new object.
Function GetNewObjectPropertyValues(oPropertyValuesToCloneFrom)
	
	' Clone the property values we were passed.
	Dim objNewObjectPropertyValues: Set objNewObjectPropertyValues = oPropertyValuesToCloneFrom.Clone()

	' Remove the workflow and workflow state properties
	' (as otherwise it'll try and put it in the same state, which tries to copy it, which... infinite loop).
	RemovePropertyValueIfFound objNewObjectPropertyValues, MFBuiltInPropertyDefWorkflow
	RemovePropertyValueIfFound objNewObjectPropertyValues, MFBuiltInPropertyDefState

	' Possibly also want to remove some other built-in properties such as created and created by.
	' Ref: https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~MFBuiltInPropertyDef.html
	
	' Return the property values.
	Set GetNewObjectPropertyValues = objNewObjectPropertyValues
	
End Function

' Removes a property value from the collection if it's found.
Sub RemovePropertyValueIfFound(ByRef oPropertyValues, iPropertyDef)
	
	' Find the index of the property value (-1 if not found).
	Dim index: index = oPropertyValues.IndexOf(iPropertyDef)

	' If it was found then remove it.
	If index > -1 Then oPropertyValues.Remove index
	
End Sub

' Downloads the files for the provided object version and creates a
' SourceObjectFiles collection for use when creating a new object.
Function GetNewObjectSourceFiles(oSourceObjVer)

	' Get a reference to the temporary folder.
	Dim strTempFolderPath: strTempFolderPath = objFSO.GetSpecialFolder(TemporaryFolder).Path

	' Get the files for the current objver.
	Dim objFiles: Set objFiles = Vault.ObjectFileOperations.GetFiles(oSourceObjVer)

	' Create our collection to return.
	Dim objSourceFiles: Set objSourceFiles = CreateObject("MFilesAPI.SourceObjectFiles")

	' Iterate over the files and download each in turn.
	Dim intCounter, objFile
	For intCounter = 1 To objFiles.Count
		
		' Which file are we working with?
		Set objFile = objFiles.Item(intCounter)
	
		' Where can we download it?
		Dim strTemporaryFilePath: strTemporaryFilePath = objFSO.BuildPath(strTempFolderPath, objFSO.GetTempName()) & "." & objFile.Extension

		' Download the file.
		Vault.ObjectFileOperations.DownloadFile objFile.ID, objFile.Version, strTemporaryFilePath

		' Create an object source file for this temporary file.
		Dim objObjectSourceFile: Set objObjectSourceFile = CreateObject("MFilesAPI.SourceObjectFile")
		objObjectSourceFile.Extension = objFile.Extension
		objObjectSourceFile.SourceFilePath = strTemporaryFilePath
		objObjectSourceFile.Title = objFile.Title

		' Add it to the collection.
		objSourceFiles.Add -1, objObjectSourceFile

	Next

	' Return the temporary files.
	Set GetNewObjectSourceFiles = objSourceFiles

End Function

' Clears temporary files.
Sub ClearTemporaryFiles(objObjectSourceFiles)

	' Iterate over the files and clear up each in turn.
	Dim intCounter, objFile
	For intCounter = 1 To objObjectSourceFiles.Count
		
		' Which file are we working with?
		Set objFile = objObjectSourceFiles.Item(intCounter)
		
		' If it exists, try and delete it.
		If objFSO.FileExists(objFile.SourceFilePath) Then
			On Error Resume Next
			objFSO.DeleteFile objFile.SourceFilePath, True
			On Error Goto 0
		End If

	Next

End Sub
```

## A Vault Application Framework Approach

Whilst the specific code is obviously different, the same general approach above can be used with the Vault Application Framework: the properties must be copied, the files downloaded, and the new object then created.

### Scaffolding the application

We will assume that the workflow state that this code is executing on has an alias of `CopyObject`.  We will:

1. Create a basic [Vault Application Framework]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/) application from the Visual Studio template.
2. Remove all the code from the template application.
3. Add a stub event handler using the [Visual Studio Code Snippets](http://developer.m-files.com/Frameworks/Vault-Application-Framework/Visual-Studio-Template/Code-Snippets/) (start typing `MFVAFStateAction`; once Visual Studio selects it, press `Tab` twice to create the snippet).
4. Add some code to stop the code executing if we're [passed null data](https://en.wikipedia.org/wiki/Defensive_programming).

```csharp
using MFiles.VAF;
using MFiles.VAF.Common;

namespace CopyingObjects
{
	public class VaultApplication 
		: VaultApplicationBase
	{

		/// <summary>
		/// Executed when an object is moved into a workflow state
		/// with alias "CopyObject".
		/// </summary>
		/// <param name="env">The vault/object environment.</param>
		[StateAction("CopyObject")]
		public void CopyObjectHandler(StateEnvironment env)
		{
			// Sanity.
			if(null == env?.PropertyValues || null == env?.ObjVerEx)
				return;
		}

	}
}
```

### Creating a copy of the properties

To copy the properties we will:

1. [Clone](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~PropertyValues~Clone.html) the `PropertyValues` of the current object (line 56).
2. Remove the properties which we don't wish to be on the new object (declared lines 16-20, removed lines 59-68).

```csharp
using System;
using System.Linq;
using MFiles.VAF;
using MFiles.VAF.Common;
using MFilesAPI;

namespace CopyingObjects
{
	public class VaultApplication 
		: VaultApplicationBase
	{
		
		/// <summary>
		/// The properties to remove from the cloned property values collection.
		/// </summary>
		public readonly int[] PropertiesToRemove = 
		{
			(int)MFBuiltInPropertyDef.MFBuiltInPropertyDefWorkflow,
			(int)MFBuiltInPropertyDef.MFBuiltInPropertyDefState
		};

		/// <summary>
		/// Executed when an object is moved into a workflow state
		/// with alias "CopyObject".
		/// </summary>
		/// <param name="env">The vault/object environment.</param>
		[StateAction("CopyObject")]
		public void CopyObjectHandler(StateEnvironment env)
		{
			// Sanity.
			if (null == env?.PropertyValues || null == env?.ObjVerEx)
				return;

			// Let's get a copy of the property values.
			var newObjectPropertyValues = this.GetNewObjectPropertyValues(env.PropertyValues);

			// TODO: Copy the files.

			// TODO: Create the object.

		}

		/// <summary>
		/// Copies property values from <see cref="cloneFrom"/>, removing items that exist in
		/// <see cref="PropertiesToRemove"/>
		/// </summary>
		/// <param name="cloneFrom">The collection of properties to clone.</param>
		/// <returns>The cloned set of properties, with the requested properties removed.</returns>
		private PropertyValues GetNewObjectPropertyValues(PropertyValues cloneFrom)
		{
			// Sanity.
			if(null == cloneFrom)
				throw new ArgumentNullException(nameof(cloneFrom));

			// Get a basic copy.
			var propertyValues = cloneFrom.Clone();

			// Remove the properties we don't want.
			foreach (var propertyId in this.PropertiesToRemove)
			{
				// If the property is not in the collection then skip.
				int index = propertyValues.IndexOf(propertyId);
				if (-1 == index)
					continue;

				// Remove it.
				propertyValues.Remove(index);
			}

			// Return.
			return propertyValues;
		}

	}
}
```

### Creating a copy of the files

1. Retrieve the file information (line 62-65).
2. Download the files to a temporary location (lines 75-80)
3. Create the SourceObjectFiles collection (line 68) and populate it (lines 84-89).
4. *TODO: Create the object*
5. Cleanup of the temporary files (lines 101-119).

```csharp
using System;
using System.Linq;
using MFiles.VAF;
using MFiles.VAF.Common;
using MFilesAPI;

namespace CopyingObjects
{
	public class VaultApplication 
		: VaultApplicationBase
	{
		
		/// <summary>
		/// The properties to remove from the cloned property values collection.
		/// </summary>
		public readonly int[] PropertiesToRemove = 
		{
			(int)MFBuiltInPropertyDef.MFBuiltInPropertyDefWorkflow,
			(int)MFBuiltInPropertyDef.MFBuiltInPropertyDefState
		};

		/// <summary>
		/// Executed when an object is moved into a workflow state
		/// with alias "CopyObject".
		/// </summary>
		/// <param name="env">The vault/object environment.</param>
		[StateAction("CopyObject")]
		public void CopyObjectHandler(StateEnvironment env)
		{
			// Sanity.
			if (null == env?.PropertyValues || null == env?.ObjVerEx)
				return;

			// Let's get a copy of the property values.
			var newObjectPropertyValues = this.GetNewObjectPropertyValues(env.PropertyValues);

			// Let's get a copy of the files.
			var newObjectSourceFiles = this.GetNewObjectSourceFiles(env.Vault, env.ObjVer);

			// TODO: Create the object.

			// Clean up.
			this.ClearTemporaryFiles(newObjectSourceFiles);

		}

		/// <summary>
		/// Downloads the files associated with the supplied <see cref="objVer"/>
		/// and creates a <see cref="SourceObjectFiles"/> to be used in new object creation.
		/// </summary>
		/// <param name="vault">The vault connection used to download the files.</param>
		/// <param name="objVer">The version of the object to download the files from.</param>
		/// <returns>A copy of the current files, as a <see cref="SourceObjectFiles"/>.</returns>
		private SourceObjectFiles GetNewObjectSourceFiles(Vault vault, ObjVer objVer)
		{
			// Sanity.
			if (null == vault)
				throw new ArgumentNullException(nameof(vault));
			if (null == objVer)
				throw new ArgumentNullException(nameof(objVer));

			// Get the files for the current ObjVer.
			var objectFiles = vault.ObjectFileOperations.GetFiles(objVer)
				.Cast<ObjectFile>()
				.ToArray();

			// Create the collection to return.
			var sourceObjectFiles = new SourceObjectFiles();

			// Iterate over the files and download each in turn.
			foreach (var objectFile in objectFiles)
			{

				// Where can we download it?
				var temporaryFilePath = System.IO.Path.Combine(
					System.IO.Path.GetTempPath(), // The temporary file folder.
					System.IO.Path.GetTempFileName() + "." + objectFile.Extension); // The name including extension.

				// Download the file to a temporary location.
				vault.ObjectFileOperations.DownloadFile(objectFile.ID, objectFile.Version, temporaryFilePath);

				// Create an object source file for this temporary file
				// and add it to the collection.
				sourceObjectFiles.Add(-1, new SourceObjectFile()
				{
					Extension = objectFile.Extension,
					SourceFilePath = temporaryFilePath,
					Title = objectFile.Title
				});

			}

			// Return the collection.
			return sourceObjectFiles;
		}

		/// <summary>
		/// Clears up any temporary files used with the creation of an object.
		/// </summary>
		/// <param name="sourceObjectFiles">The files to clear up.</param>
		private void ClearTemporaryFiles(SourceObjectFiles sourceObjectFiles)
		{
			// Sanity.
			if (null == sourceObjectFiles)
				return; // No point throwing; nothing to clear up.

			// Iterate over the files and clear them up.
			foreach (var sourceObjectFile in sourceObjectFiles.Cast<SourceObjectFile>())
			{
				try
				{
					System.IO.File.Delete(sourceObjectFile.SourceFilePath);
				}
				catch(Exception e)
				{
					// TODO: Swallowing exceptions isn't nice.
				}
			}
		}

		/// <summary>
		/// Copies property values from <see cref="cloneFrom"/>, removing items that exist in
		/// <see cref="PropertiesToRemove"/>
		/// </summary>
		/// <param name="cloneFrom">The collection of properties to clone.</param>
		/// <returns>The cloned set of properties, with the requested properties removed.</returns>
		private PropertyValues GetNewObjectPropertyValues(PropertyValues cloneFrom)
		{
			// Sanity.
			if(null == cloneFrom)
				throw new ArgumentNullException(nameof(cloneFrom));

			// Get a basic copy.
			var propertyValues = cloneFrom.Clone();

			// Remove the properties we don't want.
			foreach (var propertyId in this.PropertiesToRemove)
			{
				// If the property is not in the collection then skip.
				int index = propertyValues.IndexOf(propertyId);
				if (-1 == index)
					continue;

				// Remove it.
				propertyValues.Remove(index);
			}

			// Return.
			return propertyValues;
		}

	}
}
```

### Creating the object

To complete the code, we must:

1. Decide whether the object is a single-file-document or not (lines 41-42).
2. Decide which access control list to apply to the document (line 45).
3. Call [CreateNewObjectExQuick](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~VaultObjectOperations~CreateNewObjectExQuick.html) (lines 48-54).

```csharp
using System;
using System.Linq;
using MFiles.VAF;
using MFiles.VAF.Common;
using MFilesAPI;

namespace CopyingObjects
{
	public class VaultApplication 
		: VaultApplicationBase
	{
		
		/// <summary>
		/// The properties to remove from the cloned property values collection.
		/// </summary>
		public readonly int[] PropertiesToRemove = 
		{
			(int)MFBuiltInPropertyDef.MFBuiltInPropertyDefWorkflow,
			(int)MFBuiltInPropertyDef.MFBuiltInPropertyDefState
		};

		/// <summary>
		/// Executed when an object is moved into a workflow state
		/// with alias "CopyObject".
		/// </summary>
		/// <param name="env">The vault/object environment.</param>
		[StateAction("CopyObject")]
		public void CopyObjectHandler(StateEnvironment env)
		{
			// Sanity.
			if (null == env?.PropertyValues || null == env?.ObjVerEx)
				return;

			// Let's get a copy of the property values.
			var newObjectPropertyValues = this.GetNewObjectPropertyValues(env.PropertyValues);

			// Let's get a copy of the files.
			var newObjectSourceFiles = this.GetNewObjectSourceFiles(env.Vault, env.ObjVer);

			// Is it a single-file-document (has exactly one file, and type of document)?
			var isSingleFileDocument = (newObjectSourceFiles.Count == 1
										&& env.ObjVer.Type == (int) MFBuiltInObjectType.MFBuiltInObjectTypeDocument);

			// Use a default ACL.
			var accessControlList = new AccessControlList();

			// Create the object.
			env.Vault.ObjectOperations.CreateNewObjectExQuick(
				env.ObjVer.Type,
				newObjectPropertyValues,
				newObjectSourceFiles,
				isSingleFileDocument,
				CheckIn: true,
				AccessControlList: accessControlList);

			// Clean up.
			this.ClearTemporaryFiles(newObjectSourceFiles);

		}

		/// <summary>
		/// Downloads the files associated with the supplied <see cref="objVer"/>
		/// and creates a <see cref="SourceObjectFiles"/> to be used in new object creation.
		/// </summary>
		/// <param name="vault">The vault connection used to download the files.</param>
		/// <param name="objVer">The version of the object to download the files from.</param>
		/// <returns>A copy of the current files, as a <see cref="SourceObjectFiles"/>.</returns>
		private SourceObjectFiles GetNewObjectSourceFiles(Vault vault, ObjVer objVer)
		{
			// Sanity.
			if (null == vault)
				throw new ArgumentNullException(nameof(vault));
			if (null == objVer)
				throw new ArgumentNullException(nameof(objVer));

			// Get the files for the current ObjVer.
			var objectFiles = vault.ObjectFileOperations.GetFiles(objVer)
				.Cast<ObjectFile>()
				.ToArray();

			// Create the collection to return.
			var sourceObjectFiles = new SourceObjectFiles();

			// Iterate over the files and download each in turn.
			foreach (var objectFile in objectFiles)
			{

				// Where can we download it?
				var temporaryFilePath = System.IO.Path.Combine(
					System.IO.Path.GetTempPath(), // The temporary file folder.
					System.IO.Path.GetTempFileName() + "." + objectFile.Extension); // The name including extension.

				// Download the file to a temporary location.
				vault.ObjectFileOperations.DownloadFile(objectFile.ID, objectFile.Version, temporaryFilePath);

				// Create an object source file for this temporary file
				// and add it to the collection.
				sourceObjectFiles.Add(-1, new SourceObjectFile()
				{
					Extension = objectFile.Extension,
					SourceFilePath = temporaryFilePath,
					Title = objectFile.Title
				});

			}

			// Return the collection.
			return sourceObjectFiles;
		}

		/// <summary>
		/// Clears up any temporary files used with the creation of an object.
		/// </summary>
		/// <param name="sourceObjectFiles">The files to clear up.</param>
		private void ClearTemporaryFiles(SourceObjectFiles sourceObjectFiles)
		{
			// Sanity.
			if (null == sourceObjectFiles)
				return; // No point throwing; nothing to clear up.

			// Iterate over the files and clear them up.
			foreach (var sourceObjectFile in sourceObjectFiles.Cast<SourceObjectFile>())
			{
				try
				{
					System.IO.File.Delete(sourceObjectFile.SourceFilePath);
				}
				catch(Exception e)
				{
					// TODO: Swallowing exceptions isn't nice.
				}
			}
		}

		/// <summary>
		/// Copies property values from <see cref="cloneFrom"/>, removing items that exist in
		/// <see cref="PropertiesToRemove"/>
		/// </summary>
		/// <param name="cloneFrom">The collection of properties to clone.</param>
		/// <returns>The cloned set of properties, with the requested properties removed.</returns>
		private PropertyValues GetNewObjectPropertyValues(PropertyValues cloneFrom)
		{
			// Sanity.
			if(null == cloneFrom)
				throw new ArgumentNullException(nameof(cloneFrom));

			// Get a basic copy.
			var propertyValues = cloneFrom.Clone();

			// Remove the properties we don't want.
			foreach (var propertyId in this.PropertiesToRemove)
			{
				// If the property is not in the collection then skip.
				int index = propertyValues.IndexOf(propertyId);
				if (-1 == index)
					continue;

				// Remove it.
				propertyValues.Remove(index);
			}

			// Return.
			return propertyValues;
		}

	}
}
```




