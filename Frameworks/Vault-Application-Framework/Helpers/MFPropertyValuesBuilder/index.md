---
layout: page
title: The MFPropertyValuesBuilder class in the Vault Application Framework
includeInSearch: true
---

`MFPropertyValuesBuilder` is contained in the `MFiles.VAF.Common` namespace and provides helper methods for building up a collection of [PropertyValues](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~PropertyValues.html).

More information on [MFPropertyValuesBuilder is available here]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Helpers/MFPropertyValuesBuilder/).

```csharp
// Create a property values builder.
var mfPropertyValuesBuilder = new MFPropertyValuesBuilder(vault);

// Set the class property.
mfPropertyValuesBuilder.SetClass((int)MFBuiltInDocumentClass.MFBuiltInDocumentClassOtherDocument);

// Set the title.
mfPropertyValuesBuilder.SetTitle("my new object");

// This is just for a demonstration.  Better to use a configuration object:
// http://developer.m-files.com/Frameworks/Vault-Application-Framework/Attributes/Configuration/.
var myPropertyIdentifier = new MFIdentifier("MyPropertyAlias");

// Add a property value by alias.
mfPropertyValuesBuilder.Add(myPropertyIdentifier, MFDataType.MFDatatypeText, "hello world");
			
// This is just for a demonstration.  Better to use a configuration object:
// http://developer.m-files.com/Frameworks/Vault-Application-Framework/Attributes/Configuration/.
var myWorkflowIdentifier = new MFIdentifier("MyWorkflowAlias");

// Set the workflow - note it will find the first workflow state automatically.
mfPropertyValuesBuilder.SetWorkflowState(myWorkflowIdentifier);

// Use the values to create an object.
vault.ObjectOperations.CreateNewObjectExQuick(0, mfPropertyValuesBuilder.Values);
```

## Chaining

The `MFPropertyValuesBuilder` supports chaining, which is a process for more concisely making multiple calls to the same object by ensuring that each call returns the original object, allowing it to then be immediately called again.  The code above could instead have been written like this.

```csharp
// This is just for a demonstration.  Better to use a configuration object:
// http://developer.m-files.com/Frameworks/Vault-Application-Framework/Attributes/Configuration/.
var myPropertyIdentifier = new MFIdentifier("MyPropertyAlias");
var myWorkflowIdentifier = new MFIdentifier("MyWorkflowAlias");

// Create a property values builder and set properties.
var mfPropertyValuesBuilder = new MFPropertyValuesBuilder(vault)
	.SetClass((int)MFBuiltInDocumentClass.MFBuiltInDocumentClassOtherDocument) // Set the class.
	.SetTitle("my new object") // Set the title.
	.Add(myPropertyIdentifier, MFDataType.MFDatatypeText, "hello world") // Add a property value by alias.
	.SetWorkflowState(myWorkflowIdentifier) // Set the workflow.
;

// Use the values to create an object.
vault.ObjectOperations.CreateNewObjectExQuick(0, mfPropertyValuesBuilder.Values);
```

## Populating property values

Property values are populated either by providing them at the time the object is created (using the `.ctr(Vault, PropertyValues)` constructor), or are populated by calling the appropriate methods.

### Copying from other objects

* `CopyFrom(PropertyValues, object[])` allows specific properties to be copied from an existing collection of property values.

```csharp
// Create a property values builder.
var mfPropertyValuesBuilder = new MFPropertyValuesBuilder(vault);

// Copy the values of properties with ID 1002 and 1045 from myPropertyValuesCollection into the property values builder.
mfPropertyValuesBuilder.CopyFrom(myPropertyValuesCollection, new[] { 1002, 1045 });
```

* `CopyFrom(ObjVerEx, object[])` allows specific properties to be copied from an existing [ObjVerEx]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Helpers/ObjVerEx/).

```csharp
// Create a property values builder.
var mfPropertyValuesBuilder = new MFPropertyValuesBuilder(vault);

// Load document with ID 1 and version 16 from the vault.
var objVerEx = new ObjVerEx(vault,
	(int) MFBuiltInObjectType.MFBuiltInObjectTypeDocument,
	id: 1,
	version: 16
);

// Copy the values of properties with ID 1002 and 1045 from the above object into the property values builder.
mfPropertyValuesBuilder.CopyFrom(objVerEx, new[] { 1002, 1045 });
```

### Adding properties

Properties can be added to the collection by calling `Add` (for any property type) or `AddLookup` (to add a lookup to a multi-select lookup property).

### Removing properties

Properties can be removed by calling `Remove` (for any property type) or `RemoveLookup` (to remove a single lookup from a multi-select lookup property).

#### Removing system properties

Calling `RemoveSystemProperties` will remove built-in properties such as who created the object and when it was last modified.

<p class="note">Specifically, this will remove properties 20 (MFBuiltInPropertyDefCreated), 25 (MFBuiltInPropertyDefCreatedBy), 21 (MFBuiltInPropertyDefLastModified), 23 (MFBuiltInPropertyDefLastModifiedBy), 24 (MFBuiltInPropertyDefStatusChanged), 30 (MFBuiltInPropertyDefSizeOnServerThisVersion), 31 (MFBuiltInPropertyDefSizeOnServerAllVersions), 40 (MFBuiltInPropertyDefStateEntered) and 89 (MFBuiltInPropertyDefObjectChanged).</p>

## Helper methods

### SetClass

The `SetClass` helper method sets the built-in property for `Class` as the provided value.

### SetLookup

Sets a property (either single-select lookup or multi-select lookup) to be a single lookup value.

<p class="note">This will remove any existing lookup values in the given multi-select lookup property).</p>

### SetSFD (single or multi-file document)

The `SetSFD` helper method sets the value of the "Single File" property (ID 22) to the value provided.  If the document contains one single file, this should be true.  If the document contains zero or more than 1 file then this should be false.

### SetTitle

Sets the property value for the current object's name or title property to the value provided.  If the object class information is supplied and the class uses another property as its title (see the [Set as Name section](http://www.m-files.com/user-guide/latest/eng/#New_class.html)), the correct property value will be set.

### SetWorkflowState

The `SetWorkflowState` helper method sets the workflow (38) and workflow state (39) properties.  If only the state is provided then the workflow will be resolved from the state.  If only the workflow is provided then the first state will be resolved automatically.