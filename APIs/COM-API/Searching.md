---
layout: page
title: Searching using the COM API
---

Searching M-Files is required in most M-Files code.

Performing a search typically involves the [VaultObjectSearchOperations](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~VaultObjectSearchOperations.html) class, and executing one of the `SearchForObjectsByConditions` methods.  These methods take one or more [SearchCondition](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~SearchCondition.html) objects which express a particular rule that the object must match in order to be returned.  Each `SearchCondition` consists of three parts: an [Expression](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~SearchCondition~Expression.html) (what to compare), a [ConditionType](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~MFConditionType.html) (what type of match to make), and a [TypedValue](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~SearchCondition~TypedValue.html) (what to match).

## An example search

Below is an example of searching using the COM API:
```csharp
// Create our search conditions.
var searchConditions = new SearchConditions();

// Add an object type filter.
{
	// Create the condition.
	var condition = new SearchCondition();

	// Set the expression.
	condition.Expression.SetStatusValueExpression(MFStatusType.MFStatusTypeObjectTypeID);

	// Set the condition.
	condition.ConditionType = MFConditionType.MFConditionTypeEqual;

	// Set the value.
	condition.TypedValue.SetValue(MFDataType.MFDatatypeLookup, 
		(int)MFBuiltInObjectType.MFBuiltInObjectTypeDocument);

	// Add the condition to the collection.
	searchConditions.Add(-1, condition);
}

// Add a "not deleted" filter.
{
	// Create the condition.
	var condition = new SearchCondition();

	// Set the expression.
	condition.Expression.SetStatusValueExpression(MFStatusType.MFStatusTypeDeleted);

	// Set the condition.
	condition.ConditionType = MFConditionType.MFConditionTypeEqual;

	// Set the value.
	condition.TypedValue.SetValue(MFDataType.MFDatatypeBoolean, false);

	// Add the condition to the collection.
	searchConditions.Add(-1, condition);
}

// Execute the search.
var searchResults = vault.ObjectSearchOperations.SearchForObjectsByConditionsEx(searchConditions,
	MFSearchFlags.MFSearchFlagNone, SortResults: false);
```

## Search Conditions

Detailed below are methods of creating individual [SearchCondition](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~SearchCondition.html) objects.  These are typically combined into a collection of [SearchConditions](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~SearchConditions.html) before being [executed against the vault](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~VaultObjectSearchOperations.html).

### Deleted items

Below is an example of creating a [SearchCondition](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~SearchCondition.html) which represents the exclusion of deleted items.

```csharp
// Create the condition.
var condition = new SearchCondition();

// Set the expression.
condition.Expression.SetStatusValueExpression(MFStatusType.MFStatusTypeDeleted);

// Set the condition.
condition.ConditionType = MFConditionType.MFConditionTypeEqual;

// Set the value.
condition.TypedValue.SetValue(MFDataType.MFDatatypeBoolean, false);
```

Alternatively, you may need to only search for deleted items:

```csharp
// Create the condition.
var condition = new SearchCondition();

// Set the expression.
condition.Expression.SetStatusValueExpression(MFStatusType.MFStatusTypeDeleted);

// Set the condition.
condition.ConditionType = MFConditionType.MFConditionTypeEqual;

// Set the value.
condition.TypedValue.SetValue(MFDataType.MFDatatypeBoolean, true);
```

### Searching by an external ID

When using [external object types](http://www.m-files.com/user-guide/latest/eng/#Connection_to_external_database.html), the object ID shown on the metadata card will be the primary key for the object in the remote system.  A search can be executed to convert the external ID to an internal ID (e.g. to populate a [PropertyValue](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~PropertyValue.html) for a lookup):

```csharp
// Create the condition.
var condition = new SearchCondition();

// Set the expression.
condition.Expression.DataStatusValueType = MFStatusType.MFStatusTypeExtID;

// Set the condition.
condition.ConditionType = MFConditionType.MFConditionTypeEqual;

// Set the value.
// In this case "MyExternalObjectId" is the ID of the object in the remote system.
condition.TypedValue.SetValue(MFDataType.MFDatatypeText, "MyExternalObjectId");
```

### Executing a full-text search

```csharp
// Create the condition.
var condition = new SearchCondition();

// Set the expression.
condition.Expression.SetAnyFieldExpression(fullTextSearchFlags);

// Set the condition.
condition.ConditionType = MFConditionType.MFConditionTypeContains;

// Set the value.
// In this case "ESTT" is the text to search for.
condition.TypedValue.SetValue(MFDataType.MFDatatypeText, "ESTT");
```

## Tips and tricks

### Deleted items are returned by default

It is important to note that items which are deleted are returned by default.  If the current user context has access to deleted items then these items will be returned in the search results.  If deleted items should not be returned then ensure you [add a condition to exclude deleted items](#deleted-items).