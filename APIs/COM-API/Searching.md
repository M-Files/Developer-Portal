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

	// Add the condition.
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

	// Add the condition.
	searchConditions.Add(-1, condition);
}

// Execute the search.
var searchResults = vault.ObjectSearchOperations.SearchForObjectsByConditionsEx(searchConditions,
	MFSearchFlags.MFSearchFlagNone, SortResults: false);
```

## Search Conditions

### Deleted items

## Tips and tricks

### Deleted items are returned by default

It is important to note that items which are deleted are returned by default.  If the user has access to deleted items then these items will be returned in the search results.  If deleted items should not be returned then ensure you [add a condition to exclude deleted items](#deleted-items).