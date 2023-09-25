---
layout: page
title: User Interface Extensibility Framework Development Practices
includeInSearch: true
breadcrumb: Development Practices
---

## Local development folder

M-Files supports the use of a [local folder](Local-Development-Folder) for developing User Interface Extensibility Framework applications.

## Asynchronous API programming

Whilst M-Files COM API calls are typically synchronous (i.e. the application doesn't continue until the API call completes), the M-Files [Vault](https://developer.m-files.com/APIs/COM-API/Reference/index.html#MFilesAPI~Vault.html) object exposes a property named `Async` which can be used to make asynchronous calls.  Using [asynchronous calls](Asynchronous-API-Programming) - rather than synchronous calls, which wait for the process to finish before continuing - ensures that the user interface doesn't appear to "lock", and the user experience remains fluid.

Using <a href="Asynchronous-API-Programming">asynchronous calls</a> is currently optional when <a href="Platform-Targeting/#the-m-files-desktop-client">targeting the M-Files Desktop client</a>.  It is mandatory when <a href="Platform-Targeting/#m-files-web-access">targeting M-Files Web Access</a>.
{:.note}

## Debugging

Whilst the majority of code which executes within a User Interface Extensibility Framework application cannot be directly debugged, JavaScript code that executes within a dashboard can be debugged.  More information can be found on the [Debugging UIX applications page](Debugging).

## Event Registration and Entry Points

The User Interface Extensibility Framework is largely event-driven; each module must register a callback function for the events it wishes to be notified about.  [Reacting to events]({{ site.baseurl }}/Frameworks/User-Interface-Extensibility-Framework/Development-Practices/Event-Registration-And-Entry-Points/#reacting-to-events) requires registration of handler functions.  These handler functions are automatically called by the framework when the appropriate [events](https://www.m-files.com/UI_Extensibility_Framework/#Events.html) fire.

In addition, [modules]({{ site.baseurl }}/Frameworks/User-Interface-Extensibility-Framework/Development-Practices/Event-Registration-And-Entry-Points/#module-entry-points) and [dashboards]({{ site.baseurl }}/Frameworks/User-Interface-Extensibility-Framework/Development-Practices/Event-Registration-And-Entry-Points/#dashboard-entry-points) require correctly-named methods to exist to be informed when they start.

## Platform Targeting

Whilst User Interface Extensibility Framework applications typically target the M-Files Desktop client, since M-Files 11.2.4320.49 it has been possible to additionally target the M-Files Web Access.  More information can be found on the <a href="Platform-Targeting">Platform Targeting page</a>.

The version of the User Interface Extensibility Framework that is available in the M-Files Web Access is <a href="https://www.m-files.com/UI_Extensibility_Framework/index.html#UIExtSupportInMFilesWeb.html">a subset of that available in the Desktop client</a>.  Additionally, <a href="https://www.m-files.com/UI_Extensibility_Framework/index.html#ApiSupportInMFilesWeb.html">M-Files API support is limited</a>.
{:.note}

## Deployment

User Interface Extensibility Framework applications are [deployed using the M-Files Admin tool]({{ site.baseurl }}/Frameworks/User-Interface-Extensibility-Framework/Development-Practices/Deployment/).

## Tips and Tricks

### Exception handling within the User Interface Extensibility Framework

Additional information on exception handling can be found within the [UI Extensibility Framework documentation](https://www.m-files.com/UI_Extensibility_Framework/#ErrorHandling.html).  This includes sections on throwing custom exceptions and interacting with exceptions that are returned from API calls.

Additionally, the Asynchronous API Programming page contains [a section on dealing with exceptions from asynchronous API calls]({{ site.baseurl }}/Frameworks/User-Interface-Extensibility-Framework/Development-Practices/Asynchronous-API-Programming/#the-failed-callback).

### Optional parameters

When calling an API method that defines optional parameters, values for all the optional parameters must be provided.  For example: a call to [GetProperties](https://developer.m-files.com/APIs/COM-API/Reference/index.html#MFilesAPI~VaultObjectPropertyOperations~GetProperties.html) defines one mandatory and one optional argument, however both must be provided when being called from JavaScript:

```javascript
// Do we need to update from the server?
var updateFromServer = false;

// Get the property values.
var propertyValues = vault.ObjectPropertyOperations.GetProperties(objVer, updateFromServer);
```

An example of using this in API calls is shown [in the following section](#instantiating-m-files-api-objects).
{:.note}

#### Using DataFunctionCall in search queries

Creating search conditions from within the User Interface Extensibility Framework can be cumbersome, as the methods involved often define many optional parameters that must be provided when using them from JavaScript.

One such optional argument is the [DataFunctionCall argument on SetPropertyValueExpression](https://developer.m-files.com/APIs/COM-API/Reference/index.html#MFilesAPI~Expression~SetPropertyValueExpression.html).  The data function call can be used to modify the expression result for matching purposes, and [common usage scenarios are explained on this page](https://developer.m-files.com/APIs/COM-API/Searching/DataFunctionCall/).

Below is an example of providing an empty `DataFunctionCall` object when executing a search.  This is done when the result does not need to be modified prior to matching.

```javascript
// Create a search condition.
var searchCondition = new MFiles.SearchConditon();

// Set up the expression for property 456.
searchCondition.Expression.SetPropertyValueExpression(456, // The ID of the property to match.
	MFParentChildBehaviorNone, // No special parent/child behaviour required.
	new MFiles.DataFunctionCall()); // Do not modify the value prior to matching.

// Set up the condition (equals).
searchCondition.ConditionType = MFConditionTypeEqual;

// Set up the value to match against.
searchCondition.TypedValue.SetValue(MFDatatypeInteger, 1);
```

Below is an example of using `DataFunctionCall` to search for a document that was created at some point in 2018.

```javascript
// Create our search conditions.
var searchConditions = new MFiles.SearchConditions();

// Add an object type filter.
{
	// Create the condition.
	var condition = new MFiles.SearchCondition();

	// Set the expression.
	condition.Expression.SetStatusValueExpression(MFStatusTypeObjectTypeID, new MFiles.DataFunctionCall());

	// Set the condition.
	condition.ConditionType = MFConditionTypeEqual;

	// Set the value.
	condition.TypedValue.SetValue(MFDatatypeLookup, MFBuiltInObjectTypeDocument);

	// Add the condition to the collection.
	searchConditions.Add(-1, condition);
}

// Created by (year) = 2018
{
	// Create the DataFunctionCall.
	var dataFunctionCall = new MFiles.DataFunctionCall();
	dataFunctionCall.SetDataYear();

	// Create a search condition.
	var searchCondition = new MFiles.SearchConditon();

	// Set up the expression.
	searchCondition.Expression.SetPropertyValueExpression(20, // The built-in "created" date property.
		MFParentChildBehaviorNone, // No special parent/child behaviour required.
		dataFunctionCall); // Use the "year" data function call declared above.

	// Set up the condition (equals).
	searchCondition.ConditionType = MFConditionTypeEqual;

	// Set up the value to match against.
	searchCondition.TypedValue.SetValue(MFDatatypeInteger, 2018);
}

// Execute the search (assuming we have a valid, started shellFrame reference).
shellFrame.ShellUI.Vault.Async.ObjectSearchOperations.SearchForObjectsByConditionsEx(searchConditions,
	MFSearchFlagNone, false, 20000, 120, function(results)
{
	shellFrame.ShowMessage("There were " + results.Count + " objects.");
});

```

More information on using `DataFunctionCall` with the M-Files API can be found [on its dedicated page](https://developer.m-files.com/APIs/COM-API/Searching/DataFunctionCall/).
{:.note}

### Instantiating M-Files API objects

M-Files API objects can be instantiated in the following way:

```javascript
 // Create an instance of ObjVer (https://developer.m-files.com/APIs/COM-API/Reference/index.html#MFilesAPI~ObjVer.html).
var objVer = new MFiles.ObjVer();
```

This is useful when calling API methods that define optional parameters, where JavaScript requires a non-null value to be passed.
{:.note}

For example, the following C# could be used to create a new object:

```csharp
// Create the collection of property values for a new object.
var propertyValues = new PropertyValues();

// Add the class property.
{
	var propertyValue = new PropertyValue()
	{
		PropertyDef = (int)MFBuiltInPropertyDef.MFBuiltInPropertyDefClass
	};
	propertyValue.TypedValue.SetValue(
		MFDataType.MFDatatypeLookup,
		(int)MFBuiltInDocumentClass.MFBuiltInDocumentClassOtherDocument);
	propertyValues.Add(-1, propertyValue);
}

// Add the name or title property.
{
	var propertyValue = new PropertyValue()
	{
		PropertyDef = (int)MFBuiltInPropertyDef.MFBuiltInPropertyDefNameOrTitle
	};
	propertyValue.TypedValue.SetValue(
		MFDataType.MFDatatypeText,
		"hello world");
	propertyValues.Add(-1, propertyValue);
}

// Create the new object.
vault.ObjectOperations.CreateNewObjectEx(
	(int) MFBuiltInObjectType.MFBuiltInObjectTypeDocument,
	propertyValues);
```

However, within JavaScript the various optional arguments for [CreateNewObjectEx](https://developer.m-files.com/APIs/COM-API/Reference/index.html#MFilesAPI~VaultObjectOperations~CreateNewObjectEx.html) must be provided for the call to work.

```javascript
// Create the collection of property values for a new object.
var propertyValues = new MFiles.PropertyValues();

// Add the class property.
{
	var propertyValue = new MFiles.PropertyValue();
	propertyValue.PropertyDef = MFBuiltInPropertyDefClass;
	propertyValue.TypedValue.SetValue(
		MFDatatypeLookup,
		MFBuiltInDocumentClassOtherDocument);
	propertyValues.Add(-1, propertyValue);
}

// Add the name or title property.
{
	var propertyValue = new MFiles.PropertyValue();
	propertyValue.PropertyDef= MFBuiltInPropertyDefNameOrTitle;
	propertyValue.TypedValue.SetValue(
		MFDatatypeText,
		"hello world");
	propertyValues.Add(-1, propertyValue);
}

// Create the new object.
shellFrame.ShellUI.Vault.ObjectOperations.CreateNewObjectEx(
	MFBuiltInObjectTypeDocument,
	propertyValues,
	new MFiles.SourceObjectFiles(),
	false, // Zero files, so it isn't a single-file-document.
	true, // Check it in.
	new MFiles.AccessControlList() );
```

Whilst it is generally good practice to use the <a href="{{ site.baseurl }}/Frameworks/User-Interface-Extensibility-Framework/Development-Practices/Asynchronous-API-Programming/">asynchronous programming approach</a>, note that `SourceObjectFiles` could not be used asynchronously on the desktop as <a href="{{ site.baseurl }}/Frameworks/User-Interface-Extensibility-Framework/Development-Practices/Asynchronous-API-Programming/#an-important-note-on-supported-object-types">it does not support cloning</a>.  Implicit wrappers are available to support the use of [CreateNewObject on M-Files Web Access](https://www.m-files.com/UI_Extensibility_Framework/index.html#ApiSupportInMFilesWeb.html).
{:.note}

### Referencing enumerated values

The M-Files API contains a number of enumerated values (e.g. [MFBuiltInObjectClass](https://developer.m-files.com/APIs/COM-API/Reference/index.html#MFilesAPI~MFBuiltInObjectClass.html), [MFBuiltInObjectType](https://developer.m-files.com/APIs/COM-API/Reference/index.html#MFilesAPI~MFBuiltInObjectType.html), [MFBuiltInPropertyDef](https://developer.m-files.com/APIs/COM-API/Reference/index.html#MFilesAPI~MFBuiltInPropertyDef.html), or [MFObjectWindowMode](https://developer.m-files.com/APIs/COM-API/Reference/index.html#MFilesAPI~MFObjectWindowMode.html)).

When using the API from within a scripting environment (e.g. [VBScript](http://developer.m-files.com/Built-In/VBScript/) or within [User Interface Extensibility Framework modules ](http://developer.m-files.com/Frameworks/User-Interface-Extensibility-Framework/Modules/)) it is typically not required to provide the name or namespace of the enumeration as part of the call.  For example, the following code is broadly equivalent in all languages:

```csharp
// Declare a property value for the class property.
var propertyValue = new PropertyValue()
{
	PropertyDef = (int)MFBuiltInPropertyDef.MFBuiltInPropertyDefClass
};
```

```vbscript
' Declare a property value for the class property.
Dim objPropertyValue
Set objPropertyValue = CreateObject("MFilesAPI.PropertyValue")
objPropertyValue.PropertyDef = MFBuiltInPropertyDefClass
```

```javascript
// Declare a property value for the class property.
var propertyValue = new MFiles.PropertyValue();
propertyValue.PropertyDef = MFBuiltInPropertyDefClass;
```

If an enumerated value is not available within the User Interface Extensibility Framework, you must instead reference it by its integer value.  In the example above, the value of `MFBuiltInPropertyDefClass` can be found on the [MFBuiltInPropertyDef documentation](https://developer.m-files.com/APIs/COM-API/Reference/index.html#MFilesAPI~MFBuiltInPropertyDef.html), and could be instead hard-coded as the ID `100`, as below.
{: .note.warning}

```javascript
// Declare a property value for the class property.
var propertyValue = new MFiles.PropertyValue();
propertyValue.PropertyDef = 100; // MFBuiltInPropertyDef.MFBuiltInPropertyDefClass
```

### Raising and handling exceptions

Exceptions within User Interface Extensibility Framework applications can be thrown/reported using the [ICommonFunctions](https://www.m-files.com/UI_Extensibility_Framework/index.html#MFClientScript~ICommonFunctions.html)' `ThrowError` and `ReportException` methods.

More information on handling M-Files exceptions, and raising your own using the standard M-Files error dialog, please see the [Error Handling in UI Extensibility Applications](https://www.m-files.com/UI_Extensibility_Framework/index.html#ErrorHandling.html) page on the official documentation.