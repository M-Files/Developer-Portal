---
layout: page
title: Search conditions in the M-Files API
includeInSearch: true
---

Detailed below are methods of creating individual [SearchCondition](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~SearchCondition.html) objects.  These are typically combined into a collection of [SearchConditions](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~SearchConditions.html) before being [executed against the vault](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~VaultObjectSearchOperations.html).

<p class="note">When using the Vault Application Framework, the <a href="{{ site.baseurl }}/Frameworks/Vault-Application-Framework/Helpers/MFSearchBuilder/">MFSearchBuilder</a> class can be used to more easily construct otherwise-complex search conditions.</p>

## Excluding deleted items

Deleted items are included by default when using the COM API.

Below is an example of creating a [SearchCondition](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~SearchCondition.html) which represents the exclusion of deleted items.

```csharp
// Create the condition.
var condition = new SearchCondition();

// Set the expression.
condition.Expression.SetStatusValueExpression(MFStatusType.MFStatusTypeDeleted);

// Set the condition type.
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

// Set the condition type.
condition.ConditionType = MFConditionType.MFConditionTypeEqual;

// Set the value.
condition.TypedValue.SetValue(MFDataType.MFDatatypeBoolean, true);
```

## Executing a full-text search

A full-text search can search across both the metadata and file contents and is executed when the [SearchForObjectsByString](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~VaultObjectSearchOperations~SearchForObjectsByString.html) API method is called.  To use it in combination with other search conditions, the following SearchCondition object can be created:

```csharp
// Create the condition.
var condition = new SearchCondition();

// Set the expression (search in file data and metadata).
condition.Expression.SetAnyFieldExpression(MFFullTextSearchFlags.MFFullTextSearchFlagsLookInFileData
		| MFFullTextSearchFlags.MFFullTextSearchFlagsLookInMetaData);

// Set the condition type.
condition.ConditionType = MFConditionType.MFConditionTypeContains;

// Set the value.
// In this case "ESTT" is the text to search for.
condition.TypedValue.SetValue(MFDataType.MFDatatypeText, "ESTT");
```

## Searching by property value

### Text values

```csharp
// Create the search condition.
var searchCondition = new SearchCondition();

// We want to search by property - in this case the built-in "name or title" property.
// Alternatively we could pass the ID of the property definition if it's not built-in.
searchCondition.Expression.SetPropertyValueExpression(
	(int)MFBuiltInPropertyDef.MFBuiltInPropertyDefNameOrTitle, 
	MFParentChildBehavior.MFParentChildBehaviorNone );

// We want only items that equal the search string provided.
searchCondition.ConditionType = MFConditionType.MFConditionTypeEqual;

// We want to search for items that are named "hello world".
// Note that the type must both match the property definition type, and be applicable for the
// supplied value.
searchCondition.TypedValue.SetValue(MFilesAPI.MFDataType.MFDatatypeText, "hello world");
```

The most common method for searching for strings is to find items that match (`MFConditionType.MFConditionTypeEqual`) the supplied text.  Other options may include [executing a full-text search]({{ site.baseurl }}/APIs/COM-API/Searching/SearchConditions/#executing-a-full-text-search) or finding items that contain (`MFConditionType.MFConditionTypeContains`) the supplied text:

```csharp
// Create the search condition.
var searchCondition = new SearchCondition();

// We want to search by property - in this case the built-in "name or title" property.
// Alternatively we could pass the ID of the property definition if it's not built-in.
searchCondition.Expression.SetPropertyValueExpression(
	(int)MFBuiltInPropertyDef.MFBuiltInPropertyDefNameOrTitle, 
	MFParentChildBehavior.MFParentChildBehaviorNone );

// We want only items that contain the search string provided.
searchCondition.ConditionType = MFConditionType.MFConditionTypeContains;

// We want to search for items that are named "hello world".
// Note that the type must both match the property definition type, and be applicable for the
// supplied value.
searchCondition.TypedValue.SetValue(MFilesAPI.MFDataType.MFDatatypeText, "hello world");
```

### Lookup values

Lookup values are often used when executing a search for items that refer to other objects, or to value list items.  In the sample below we search for items that refer to a project (in this case with object type Id of 101) with an internal Id of 23.  The property we're using to find the item is 1078:

```csharp
// We want to search by property.
searchCondition.Expression.SetPropertyValueExpression(
	1078, // This is the property that refers from our object to the Project.
	PCBehavior: MFParentChildBehavior.MFParentChildBehaviorNone);

// Set the condition type.
searchCondition.ConditionType = MFConditionType.MFConditionTypeEqual;

// Create a lookup - this is a reference to the project that
// the object must have in the property value.
var lookup = new MFilesAPI.Lookup()
{
	ObjectType = 101, // This is the object type of the Project.
	Item = 23 // This is the internal Id of the Project that we want to find.
};

// We want to search for items that reference the project.
searchCondition.TypedValue.SetValue(MFilesAPI.MFDataType.MFDatatypeLookup, lookup);
```

### Date values

Filtering by date is useful to find items that were processed, signed, etc. on a specific date.

```csharp
// Create the search condition.
var searchCondition = new SearchCondition();

// We want to search by property.
searchCondition.Expression.SetPropertyValueExpression(
	1002, // This is our date property ID
	PCBehavior: MFParentChildBehavior.MFParentChildBehaviorNone);

// Set the condition type (we want items only with the provided date).
searchCondition.ConditionType = MFConditionType.MFConditionTypeEqual;

// We only want documents that have the date of 1st January 2017.
searchCondition.TypedValue.SetValue(MFilesAPI.MFDataType.MFDatatypeDate, new DateTime(2017, 01, 01));
```

Alternatively, multiple conditions could be used to find items which were processed during a date range:

```csharp
// Create our search conditions collection,
// which we will add the individual conditions to.
var searchConditions = new SearchConditions();
{
	// Create the "minimum" search condition.
	var searchCondition = new SearchCondition();

	// We want to search by property.
	searchCondition.Expression.SetPropertyValueExpression(
		1002, // This is our date property ID
		PCBehavior: MFParentChildBehavior.MFParentChildBehaviorNone);

	// Set the condition type.
	searchCondition.ConditionType = MFConditionType.MFConditionTypeGreaterThanOrEqual;

	// We only want documents that are later than 1st January 2017.
	searchCondition.TypedValue.SetValue(MFilesAPI.MFDataType.MFDatatypeDate, new DateTime(2017, 01, 01));

	// Add it to the conditions.
	searchConditions.Add(-1, searchCondition);
}
{
	// Create the "maximum" search condition.
	var searchCondition = new SearchCondition();

	// We want to search by property.
	searchCondition.Expression.SetPropertyValueExpression(
		1002, // This is our date property ID
		PCBehavior: MFParentChildBehavior.MFParentChildBehaviorNone);

	// Set the condition.
	searchCondition.ConditionType = MFConditionType.MFConditionTypeLessThanOrEqual;

	// We only want documents that are before 1st February 2017.
	searchCondition.TypedValue.SetValue(MFilesAPI.MFDataType.MFDatatypeDate, new DateTime(2017, 02, 01));

	// Add it to the conditions.
	searchConditions.Add(-1, searchCondition);
}
```

### Timestamp values

Timestamp property values are most easily searched for by using a range.  For example, the following conditions could be used to find all items that were created on 1st January 2017.

```csharp
// Create our search conditions collection,
// which we will add the individual conditions to.
var searchConditions = new SearchConditions();
{
	// Create the "minimum" search condition.
	var searchCondition = new SearchCondition();

	// We want to search by property.
	searchCondition.Expression.SetPropertyValueExpression(
		(int)MFBuiltInPropertyDef.MFBuiltInPropertyDefCreated,
		PCBehavior: MFParentChildBehavior.MFParentChildBehaviorNone);

	// Set the condition type.
	searchCondition.ConditionType = MFConditionType.MFConditionTypeGreaterThanOrEqual;

	// We only want documents that were created after the start of the day.
	searchCondition.TypedValue.SetValue(MFilesAPI.MFDataType.MFDatatypeTimestamp, new DateTime(2017, 01, 01));

	// Add it to the conditions.
	searchConditions.Add(-1, searchCondition);
}
{
	// Create the "maximum" search condition.
	var searchCondition = new SearchCondition();

	// We want to search by property.
	searchCondition.Expression.SetPropertyValueExpression(
		(int)MFBuiltInPropertyDef.MFBuiltInPropertyDefCreated,
		PCBehavior: MFParentChildBehavior.MFParentChildBehaviorNone);

	// Set the condition.
	searchCondition.ConditionType = MFConditionType.MFConditionTypeLessThan;

	// We only want documents that are before the next day.
	searchCondition.TypedValue.SetValue(MFilesAPI.MFDataType.MFDatatypeTimestamp, new DateTime(2017, 01, 02));

	// Add it to the conditions.
	searchConditions.Add(-1, searchCondition);
}
```

## Searching by an external ID

When using [external object types](http://www.m-files.com/user-guide/latest/eng/#Connection_to_external_database.html), the object ID shown on the metadata card will be the primary key for the object in the remote system.  A search can be executed to convert the external ID to an internal ID (e.g. to populate a [PropertyValue](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~PropertyValue.html) for a lookup):

```csharp
// Create the condition.
var condition = new SearchCondition();

// Set the expression.
condition.Expression.DataStatusValueType = MFStatusType.MFStatusTypeExtID;

// Set the condition type.
condition.ConditionType = MFConditionType.MFConditionTypeEqual;

// Set the value.
// In this case "MyExternalObjectId" is the ID of the object in the remote system.
condition.TypedValue.SetValue(MFDataType.MFDatatypeText, "MyExternalObjectId");
```

<p class="note">An example of searching by display/external ID is available within <a href="https://github.com/M-Files/MFilesSamplesAndLibraries/tree/master/Samples/SearchByDisplayId">the SearchByDisplayId sample in our github repository</a>.</p>