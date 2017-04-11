---
layout: page
title: Searching using the Vault Application Framework
---

## Searching using the COM API

<p class="note">Searching using the COM API is explained more fully within the <a href="{{ site.baseurl }}/APIs/COM-API/Searching/">COM API section</a>.  This page focuses on the differences between the COM API and the helper functions available within the Vault Application Framework.</p>

Searching M-Files is required in most M-Files code.

Performing a search typically involves the [VaultObjectSearchOperations](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~VaultObjectSearchOperations.html) class, and executing one of the `SearchForObjectsByConditions` methods.  These methods take one or more [SearchCondition](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~SearchCondition.html) objects which express a particular rule that the object must match in order to be returned.  Each `SearchCondition` consists of three parts: an [Expression](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~SearchCondition~Expression.html), a [ConditionType](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~MFConditionType.html) (what type of match to make), and a [TypedValue](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~SearchCondition~TypedValue.html) (what to match).

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

When starting with the APIs, the creation of these `SearchCondition` objects can be frustrating.  Whilst the Vault Application Framework fully supports the COM API - so this approach can be used for searching - it also provides a helper object which abstracts away this process for common scenarios: `MFSearchBuilder`.

## Introducing MFSearchBuilder

<p class="note">The MFSearchBuilder and its various helper methods are explained more fully within the <a href="{{ site.baseurl }}/Frameworks/Vault-Application-Framework/Helpers/MFSearchBuilder/">MFSearchBuilder</a> page.</p>

The [MFSearchBuilder]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Helpers/MFSearchBuilder/) class is available within the `MFiles.VAF.Common` namespace and is used to create and execute searches against a given M-Files [Vault](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~Vault.html).  The `MFSearchBuilder` class contains a number of methods which aid in the production of `SearchConditions` and in the use of the returned results.  An example of the code above using `MFSearchBuilder` is:

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

<p class="note">MFSearchBuilder uses the COM API behind-the-scenes, which means that deleted items will be returned unless you add a search condition to filter them out.</p>

## Working with search results

Once an `MFSearchBuilder` has been created and populated with the required search conditions, the search can be executed by calling `Find` (find all objects that match the conditions, equivalent to calling [SearchForObjectsByConditionsEx](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~VaultObjectSearchOperations~SearchForObjectsByConditionsEx.html), which returns an [ObjectSearchResults](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~ObjectSearchResults.html)), `FindEx` (finding all matching objects), or `FindOneEx` (finding just one).

These latter two methods return instances of [ObjVerEx]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Helpers/ObjVerEx/).  This class is new to the Vault Application Framework and facilitates working with objects, combining both information typically held within [ObjectVersion](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~ObjectVersion.html) and the object's [PropertyValues](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~PropertyValues.html).

<p class="note">Using the FindEx method loses the score/ranking information held within the standard <a href="https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~ObjectSearchResults.html">ObjectSearchResults</a>.  This is only available by calling Find.</p>