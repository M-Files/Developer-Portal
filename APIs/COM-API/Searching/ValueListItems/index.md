---
layout: page
title: Searching for value list items
includeInSearch: true
breadcrumb: Value List Items
---

This page is solely applicable to searching for value list items within a value list.  To search for objects, please [see this page]({{ site.baseurl }}/APIs/COM-API/Searching/SearchConditions/).
{:.note.warning}

Whilst most search operations are looking for *objects* within the M-Files vault, occasionally we need to search a value list for specific *value list items*.

Value Lists are collections of possible values that can be selected within a property definition.  An example may be `Country`, which may have values for `Finland`, `United States of America`, or `United Kingdom`.  Value Lists may also be hierarchical, so we may have a sub-list of `Regions` which may contain various states underneath `United States of America`, or counties within the `United Kingdom`.

![Hierarchical value lists with items](hierarchical-value-list-items.png)

Most value lists are relatively small but occasionally - especially with external value lists - the number of items may be quite large.  When interacting with these value lists we may often need to search for values to find the ones which are appropriate to show to the user.

The M-Files API provides a mechanism for searching for value list items using [VaultValueListItemOperations.SearchForValueListItemsEx](https://www.m-files.com/api/documentation/index.html#MFilesAPI~VaultValueListItemOperations~SearchForValueListItemsEx.html) and [VaultValueListItemOperations.SearchForValueListItemsEx2](https://www.m-files.com/api/documentation/index.html#MFilesAPI~VaultValueListItemOperations~SearchForValueListItemsEx2.html).  The only difference between these two methods is the ability to define the automatic property definition filter and the maximum number of results to return.  Searching for value list items involves the creation of [SearchCondition](https://www.m-files.com/api/documentation/MFilesAPI~SearchCondition.html) objects in the same way as searching for objects.

## Building the search conditions

### Searching by name

The code below will create a [SearchCondition](https://www.m-files.com/api/documentation/MFilesAPI~SearchCondition.html) that finds items that start with `United`.

```csharp
// Create the condition.
var condition = new SearchCondition();

// Set the expression.
condition.Expression.SetValueListItemExpression(MFValueListItemPropertyDef.MFValueListItemPropertyDefName,
	MFParentChildBehavior.MFParentChildBehaviorNone);

// Set the condition type.
condition.ConditionType = MFConditionType.MFConditionTypeStartsWith;

// Set the value.
condition.TypedValue.SetValue(MFDataType.MFDatatypeText, "United");
```

### Filtering out deleted items

The code below will create a [SearchCondition](https://www.m-files.com/api/documentation/MFilesAPI~SearchCondition.html) which excludes deleted items.

```csharp
// Create the condition.
var condition = new SearchCondition();

// Set the expression.
condition.Expression.SetValueListItemExpression(MFValueListItemPropertyDef.MFValueListItemPropertyDefDeleted,
	MFParentChildBehavior.MFParentChildBehaviorNone);

// Set the condition type.
condition.ConditionType = MFConditionType.MFConditionTypeEqual;

// Set the value.
condition.TypedValue.SetValue(MFDataType.MFDatatypeBoolean, false);
```

### Searching by owner

The code below will create a [SearchCondition](https://www.m-files.com/api/documentation/MFilesAPI~SearchCondition.html) which finds value list items that have an owner ID of `3`.  In the example used higher up in this section, this could return all `Regions` within the `United Kingdom`.

```csharp
// Create the condition.
var condition = new SearchCondition();

// Set the expression.
condition.Expression.SetValueListItemExpression(MFValueListItemPropertyDef.MFValueListItemPropertyDefOwner,
	MFParentChildBehavior.MFParentChildBehaviorNone);

// Set the condition type.
condition.ConditionType = MFConditionType.MFConditionTypeEqual;

// Set the value.
condition.TypedValue.SetValue(MFDataType.MFDatatypeLookup, 3);
```

Searching by owner can only be done with hierarchical value lists.
{:.note}

### Searching by external/display ID

```csharp
// Create the condition.
var condition = new SearchCondition();

// Set the expression.
condition.Expression.SetValueListItemExpression(MFValueListItemPropertyDef.MFValueListItemPropertyDefExtID,
	MFParentChildBehavior.MFParentChildBehaviorNone);

// Set the condition type.
// NOTE: Other condition types such as "starts with" are supported.
condition.ConditionType = MFConditionType.MFConditionTypeEqual;

// Set the value (search for an item with external ID "ext-11").
condition.TypedValue.SetValue(MFDataType.MFDatatypeText, "ext-11");
```

## Executing the search

In the sample below, the code builds up a set of search conditions and then searches a value list for the items.

```csharp
// Create our search conditions collection.
var conditions = new SearchConditions();

// Exclude deleted items.
{	
	// Create the condition.
	var condition = new SearchCondition();

	// Set the expression.
	condition.Expression.SetValueListItemExpression(MFValueListItemPropertyDef.MFValueListItemPropertyDefDeleted,
		MFParentChildBehavior.MFParentChildBehaviorNone);

	// Set the condition type.
	condition.ConditionType = MFConditionType.MFConditionTypeEqual;

	// Set the value.
	condition.TypedValue.SetValue(MFDataType.MFDatatypeBoolean, false);

	// Add it to the collection.
	conditions.Add(-1, condition);
}

// Filter by name (starts with "North").
{	
	// Create the condition.
	var condition = new SearchCondition();

	// Set the expression.
	condition.Expression.SetValueListItemExpression(MFValueListItemPropertyDef.MFValueListItemPropertyDefName,
		MFParentChildBehavior.MFParentChildBehaviorNone);

	// Set the condition type.
	condition.ConditionType = MFConditionType.MFConditionTypeStartsWith;

	// Set the value.
	condition.TypedValue.SetValue(MFDataType.MFDatatypeText, "North");

	// Add it to the collection.
	conditions.Add(-1, condition);
}

// Only where the parent is the value list item with ID 3 (e.g. "United Kingdom").
// NOTE: This is only applicable with hierarchical value lists.
{
	// Create the condition.
	var condition = new SearchCondition();

	// Set the expression.
	condition.Expression.SetValueListItemExpression(MFValueListItemPropertyDef.MFValueListItemPropertyDefOwner,
		MFParentChildBehavior.MFParentChildBehaviorNone);

	// Set the condition type.
	condition.ConditionType = MFConditionType.MFConditionTypeEqual;

	// Set the value.
	condition.TypedValue.SetValue(MFDataType.MFDatatypeLookup, 3);

	// Add it to the collection.
	conditions.Add(-1, condition);
}

// Search value list with ID 102.
// ref: https://www.m-files.com/api/documentation/index.html#MFilesAPI~VaultValueListItemOperations~SearchForValueListItemsEx.html
var results = vault.ValueListItemOperations.SearchForValueListItemsEx(
	ValueList: 102,
	SearchConditions: conditions,
	UpdateFromServer: false,
	RefreshTypeIfExternalValueList: MFExternalDBRefreshType.MFExternalDBRefreshTypeNone,
	ReplaceCurrentUserWithCallersIdentity: true);
```
