---
layout: page
title: Asynchronous API Programming
includeInSearch: true
breadcrumb: Async
---

Whilst M-Files COM API calls are typically synchronous (i.e. the application doesn't continue until the API call completes), the M-Files [Vault](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~Vault.html) object exposes a property named `Async` which can be used to make asynchronous calls.  Using [asynchronous calls](Asynchronous-API-Programming) - rather than synchronous calls, which wait for the process to finish before continuing - ensures that the user interface doesn't appear to "lock", and the user experience remains fluid.

<p class="note">Using <a href="Asynchronous-API-Programming">asynchronous calls</a> is currently optional when <a href="Platform-Targeting/#the-m-files-desktop-client">targeting the M-Files Desktop client</a>.  It is mandatory when <a href="Platform-Targeting/#m-files-web-access">targeting M-Files Web Access</a>.</p>

## Altering synchronous to asynchronous calls

The following is a standard synchronous call to [CheckOut](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~VaultObjectOperations~CheckOut.html).  Once the call completes, the return value of the call (the checked-out [ObjectVersion](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~ObjectVersion.html)) is assigned to the `objectVersion` variable and the code continues.

```javascript
// Check out the object (objver) with synchronous call.
var objectVersion = vault.ObjectOperations.CheckOut( objver.ObjID );

// Process checked out object.
```

Altering code to use an asynchronous approach involves two steps:

1. Alter the call to use `Vault.Async` rather than `Vault`.
2. Provide one or more callback functions to handle when the asynchronous method call completes.

Using an asynchronous approach, a [callback function](https://en.wikipedia.org/wiki/Callback_%28computer_programming%29#JavaScript) is passed after the standard arguments.  At some point in the future when the call to [CheckOut](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~VaultObjectOperations~CheckOut.html) completes, the callback function is called and the return value is available as `objectVersion`.

```javascript
vault.Async.ObjectOperations.CheckOut( objver.ObjID,      
	function ( objectVersion ) {
		// Process checked out object.
	} );
```

<p class="note">It is important to note that the call to <code class="highlighter-rouge">CheckOut</code> completes almost immediately.  If later lines of code require the return value of the call then they must be moved inside the callback function.</p>

## Multiple callback functions

Each asynchronous call can be provded with up to three callback functions, in this order:

1. A [callback function for a successful call](#the-successful-callback).
2. A [callback function for a failed call](#the-failed-callback).
3. A [callback function for cleanup](#the-cleanup-callback).  This callback function is always executed, regardless of whether the call was successful or not.

### The successful callback

The success callback is executed if the API call completed successfully.  It always receives a single parameter which is the return value of the call.  For example: [GetProperties](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~VaultObjectPropertyOperations~GetProperties.html) defines two parameters (the [ObjVer](https://www.m-files.com/api/documentation/latest/MFilesAPI~ObjVer.html) to get the properties of, and the whether to update from the server or not) and returns a [PropertyValues]https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~PropertyValues.html() object, so the parameter would be a single object of type `PropertyValues`:

```javascript
vault.Async.ObjectPropertyOperations.GetProperties(objVer, 
	false, // UpdateFromServer = false
	function(propertyValues){
		// Handle the properties.
	})
```

<p class="note">If <strong>only</strong> a success callback is provided (i.e. <a href="#the-failed-callback">failed callback</a> is not provided) then exceptions will not be visible to the user.</p>

### The failed callback

The failed callback is executed if the API call does not complete (i.e. it throws an exception).  Only one of the success and failed callbacks will be executed, depending on whether the call succeeds or fails.  The failed callback always receives three parameters:

1. The short error message.
2. The long error message.
3. An object detailing the exception.

```javascript
vault.Async.ObjectPropertyOperations.GetProperties(objVer, 
	false, // UpdateFromServer = false
	function(propertyValues){
		// Handle the properties.
	}),
	function(shorterror, longerror, errorobj){
		// Handle the exception
	})
```

#### Reporting exceptions

To report an exception to the user, `MFiles.ReportException` can be used.  This is passed the third parameter of the [failed callback](#the-failed-callback), which is the object which details the exception:

```javascript
vault.Async.ObjectPropertyOperations.GetProperties(objVer, 
	false, // UpdateFromServer = false
	function(propertyValues){
		// Handle the properties.
	}),
	function(shorterror, longerror, errorobj){
		// Show the exception to the user.
		MFiles.ReportException(errorobj);
	})
```

### The cleanup callback

The cleanup callback is always executed - if provided - regardless of whether the call completes or excepts.  It is always executed after [the successful callback](the-successful-callback) or the [failed callback](#the-failed-callback) and receives no parameters.

```javascript
vault.Async.ObjectPropertyOperations.GetProperties(objVer, 
	false, // UpdateFromServer = false
	function(propertyValues){
		// Handle the properties.
	}),
	function(shorterror, longerror, errorobj){
		// Show the exception to the user.
		MFiles.ReportException(errorobj);
	}),
	function(){
		// Clean up any resources required.
	}
```

## An important note on supported object types

Asynchronous calls *clone* each input parameter and the return value, therefore all object types being passed in and out of the API call must be *cloneable*.  Cloneable object types can be checked using the [M-Files COM API reference](https://www.m-files.com/api/documentation/latest/index.html) to see whether each object has a `Clone` method.

For example: [PropertyValues](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~PropertyValues.html) has a [Clone](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~PropertyValues~Clone.html) method, so methods using it can be called asynchronously.  However, [SourceObjectFiles](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~SourceObjectFiles.html) does not have a `Clone` method, so methods using it cannot be called asynchronously.

<p class="note">Note that M-Files Web Access has specific wrappers around some of these uncloneable objects; <code class="highlighter-rouge">SourceObjectFiles</code> <b>can</b> be used asynchronously in M-Files Web Access, but cannot be used in M-Files Desktop client.  To work around this, <a href="{{ site.baseurl }}/Frameworks/User-Interface-Extensibility-Framework/Development-Practices/Platform-Targeting/#checking-the-current-platform">check the current platform</a> and call methods such as <a href="https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~VaultObjectOperations~CreateNewObject.html">CreateNewObject</a> synchronously on M-Files Desktop and asynchronously on M-Files Web Access.</p>