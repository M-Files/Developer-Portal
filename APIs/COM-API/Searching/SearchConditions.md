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

## Executing a full-text search

A full-text search can search across both the metadata and file contents and is executed when the [SearchForObjectsByString](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~VaultObjectSearchOperations~SearchForObjectsByString.html) API method is called.  To use it in combination with other search conditions, the following SearchCondition object can be created:

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

{% comment %}

## Searching by property value

### Text values

### Lookup values

### Date values

### Timestamp values

{% endcomment %}

## Searching by an external ID

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