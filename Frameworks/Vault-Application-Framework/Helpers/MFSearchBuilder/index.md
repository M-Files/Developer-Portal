---
layout: page
title: The MFSearchBuilder class in the Vault Application Framework
includeInSearch: true
breadcrumb: MFSearchBuilder
---

The `MFSearchBuilder` class is available within the `MFiles.VAF.Common` namespace and is used to create and execute searches against a given M-Files [Vault](https://developer.m-files.com/APIs/COM-API/Reference/index.html#MFilesAPI~Vault.html).  The `MFSearchBuilder` class contains a number of methods which aid in the production of `SearchConditions` and in the use of the returned results.  For example, a search that restricts by object type and deletion status may be:

```csharp
// Create our search builder.
var searchBuilder = new MFSearchBuilder(vault);

// Add an object type filter.
searchBuilder.ObjType((int)MFBuiltInObjectType.MFBuiltInObjectTypeDocument);

// Add a "not deleted" filter.
searchBuilder.Deleted(false);

// Execute the search.
var searchResults = searchBuilder.Find();
```

MFSearchBuilder uses the COM API behind-the-scenes, which means that deleted items will be returned unless you add a search condition to filter them out.
{:.note}

## Arguments

Arguments to many methods on `MFSearchBuilder` specify an `object` parameter.  This allows a number of items to be passed at this point, including:

* An [MFIdentifier]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Attributes/Configuration/) specifying a vault element.

* An integer specifying a vault element's internal ID.

* A string specifying a vault element's alias.

## Adding search conditions

### Restricting by object type

```csharp
// Create our search builder.
var searchBuilder = new MFSearchBuilder(vault);

// Add an object type filter.
searchBuilder.ObjType((int)MFBuiltInObjectType.MFBuiltInObjectTypeDocument);

// Execute the search.
var searchResults = searchBuilder.Find();
```

### Restricting by deleted status

```csharp
// Create our search builder.
var searchBuilder = new MFSearchBuilder(vault);

// Add a "not-deleted" filter.
searchBuilder.Deleted(false);

// Execute the search.
var searchResults = searchBuilder.Find();
```

### Restricting by class

```csharp
// Create our search builder.
var searchBuilder = new MFSearchBuilder(vault);

// Add an object type filter.
searchBuilder.Class((int)MFBuiltInDocumentClass.MFBuiltInDocumentClassUnclassifiedDocument);

// Execute the search.
var searchResults = searchBuilder.Find();
```

### Restricting by object ID

This can be executed where an object ID must be matched:

```csharp
// Create our search builder.
var searchBuilder = new MFSearchBuilder(vault);

// Restrict it just to an object with ID 123.
searchBuilder.Object(123);

// Execute the search.
var searchResults = searchBuilder.Find();
```

Or this can be executed where an object ID must not be matched (i.e. excluding one object):

```csharp
// Create our search builder.
var searchBuilder = new MFSearchBuilder(vault);

// Exclude object with ID 123.
searchBuilder.NotObject(123);

// Execute the search.
var searchResults = searchBuilder.Find();
```

### Restricting by property

This can be executed where a property must equal a value:

```csharp
// Create our search builder.
var searchBuilder = new MFSearchBuilder(vault);

// Only items with property 1234 (text) equal to "hello world".
searchBuilder.Property(1234, MFDataType.MFDataTypeText, "hello world")

// Execute the search.
var searchResults = searchBuilder.Find();
```

Or this can be executed where a property must not equal a value:

```csharp
// Create our search builder.
var searchBuilder = new MFSearchBuilder(vault);

// Only items where property 1234 (text) is not equal to "hello world".
searchBuilder.PropertyNot(1234, MFDataType.MFDataTypeText, "hello world")

// Execute the search.
var searchResults = searchBuilder.Find();
```

### Restricting by reference

This can be executed using an object ID (in which case any version can be referenced):

```csharp
// Create our search builder.
var searchBuilder = new MFSearchBuilder(vault);

// Only items that reference a document with ID 123.
searchBuilder.ReferencesWithAnyProperty(new ObjID(){
    ID = 123,
    Type = (int)MFBuiltInObjectType.MFBuiltInObjectTypeDocument
});

// Execute the search.
var searchResults = searchBuilder.Find();
```

Or this can be executed using an object version (in which case the specific version must be referenced):

```csharp
// Create our search builder.
var searchBuilder = new MFSearchBuilder(vault);

// Only items that reference a document with ID 123 (must be version 1).
searchBuilder.ReferencesWithAnyProperty(new ObjVer(){
    ID = 123,
    Type = (int)MFBuiltInObjectType.MFBuiltInObjectTypeDocument,
    Version = 1
});

// Execute the search.
var searchResults = searchBuilder.Find();
```

### Restricting by object status

This can be executed where an object must have a specific status:

```csharp
// Create our search builder.
var searchBuilder = new MFSearchBuilder(vault);

// Only items with an external ID (display ID) of "SUP12345".
searchBuilder.Status(MFStatusType.MFStatusTypeExtID, MFDataType.MFDataTypeText, "SUP12345")

// Execute the search.
var searchResults = searchBuilder.Find();
```

Or this can be executed where an object must not have a specific status

```csharp
// Create our search builder.
var searchBuilder = new MFSearchBuilder(vault);

// Exclude items with an external ID (display ID) of "SUP12345".
searchBuilder.StatusNot(MFStatusType.MFStatusTypeExtID, MFDataType.MFDataTypeText, "SUP12345")

// Execute the search.
var searchResults = searchBuilder.Find();
```

### Restricting by reverse reference (Result.Property = item.ID)

This can be executed using an object ID (in which case any version can be referenced):

```csharp
// Create our search builder.
var searchBuilder = new MFSearchBuilder(vault);

// Only items that reference a document with ID 123 in property 456.
searchBuilder.References(456, new ObjID(){
    ID = 123,
    Type = (int)MFBuiltInObjectType.MFBuiltInObjectTypeDocument
});

// Execute the search.
var searchResults = searchBuilder.Find();
```

Or this can be executed using an object version (in which case the specific version must be referenced):

```csharp
// Create our search builder.
var searchBuilder = new MFSearchBuilder(vault);

// Only items that reference a document with ID 123 in property 456 (must be version 1).
searchBuilder.References(456, new ObjVer(){
    ID = 123,
    Type = (int)MFBuiltInObjectType.MFBuiltInObjectTypeDocument,
    Version = 1
});

// Execute the search.
var searchResults = searchBuilder.Find();
```

### Everything else

Note that the internal `SearchConditions` collection is exposed as `MFSearchBuilder.Conditions` and can be manipulated directly if needed.  This can be used to create custom search conditions for which there currently don't exist any helper methods.