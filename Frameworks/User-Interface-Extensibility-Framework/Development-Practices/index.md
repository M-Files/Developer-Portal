---
layout: page
title: User Interface Extensibility Framework Development Practices
includeInSearch: true
breadcrumb: Development Practices
---

## Local development folder

M-Files supports the use of a [local folder](Local-Development-Folder) for developing User Interface Extensibility Framework applications.

## Asynchronous API programming

Whilst M-Files COM API calls are typically synchronous (i.e. the application doesn't continue until the API call completes), the M-Files [Vault](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~Vault.html) object exposes a property named `Async` which can be used to make asynchronous calls.  Using [asynchronous calls](Asynchronous-API-Programming) - rather than synchronous calls, which wait for the process to finish before continuing - ensures that the user interface doesn't appear to "lock", and the user experience remains fluid.

<p class="note">Using <a href="Asynchronous-API-Programming">asynchronous calls</a> is currently optional when <a href="Platform-Targeting/#the-m-files-desktop-client">targeting the M-Files Desktop client</a>.  It is mandatory when <a href="Platform-Targeting/#m-files-web-access">targeting M-Files Web Access</a>.</p>

## Debugging

Whilst the majority of code which executes within a User Interface Extensibility Framework application cannot be directly debugged, JavaScript code that executes within a dashboard can be debugged.  More information can be found on the [Debugging UIX applications page](Debugging).

## Event Registration and Entry Points

The User Interface Extensibility Framework is largely event-driven; each module must register a callback function for the events it wishes to be notified about.  [Reacting to events]({{ site.baseurl }}/Frameworks/User-Interface-Extensibility-Framework/Development-Practices/Event-Registration-And-Entry-Points/#reacting-to-events) requires registration of handler functions.  These handler functions are automatically called by the framework when the appropriate [events](https://www.m-files.com/UI_Extensibility_Framework/#Events.html) fire.

In addition, [modules]({{ site.baseurl }}/Frameworks/User-Interface-Extensibility-Framework/Development-Practices/Event-Registration-And-Entry-Points/#module-entry-points) and [dashboards]({{ site.baseurl }}/Frameworks/User-Interface-Extensibility-Framework/Development-Practices/Event-Registration-And-Entry-Points/#dashboard-entry-points) require correctly-named methods to exist to be informed when they start.

## Platform Targeting

Whilst User Interface Extensibility Framework applications typically target the M-Files Desktop client, since M-Files 11.2.4320.49 it has been possible to additionally target the M-Files Web Access.  More information can be found on the <a href="Platform-Targeting">Platform Targeting page</a>.

<p class="note">The version of the User Interface Extensibility Framework that is available in the M-Files Web Access is <a href="https://www.m-files.com/UI_Extensibility_Framework/index.html#UIExtSupportInMFilesWeb.html">a subset of that available in the Desktop client</a>.  Additionally, <a href="https://www.m-files.com/UI_Extensibility_Framework/index.html#ApiSupportInMFilesWeb.html">M-Files API support is limited</a>..</p>

## Deployment

User Interface Extensibility Framework applications are [deployed using the M-Files Admin tool]({{ site.baseurl }}/Frameworks/User-Interface-Extensibility-Framework/Development-Practices/Deployment/).

## Tips and Tricks

### Exception handling within the User Interface Extensibility Framework

Additional information on exception handling can be found within the [UI Extensibility Framework documentation](https://www.m-files.com/UI_Extensibility_Framework/#ErrorHandling.html).  This includes sections on throwing custom exceptions and interacting with exceptions that are returned from API calls.

Additionally, the Asynchronous API Programming page contains [a section on dealing with exceptions from asynchronous API calls](http://localhost:4000/Frameworks/User-Interface-Extensibility-Framework/Development-Practices/Asynchronous-API-Programming/#the-failed-callback).

### Instantiating M-Files API objects

M-Files API objects can be instantiated in the following way:

```javascript
 // Create an instance of ObjVer (https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~ObjVer.html).
var objVer = new MFiles.ObjVer();
```

<p class="note">This is useful when calling API methods that define optional parameters, where JavaScript requires a non-null value to be passed.</p>

### Optional parameters

When calling an API method that defines optional parameters, values for all the optional parameters must be provided.  For example: a call to [GetProperties](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~VaultObjectPropertyOperations~GetProperties.html) defines one mandatory and one optional argument, however both must be provided when being called from JavaScript:

```javascript
// Do we need to update from the server?
var updateFromServer = false;

// Get the property values.
var propertyValues = vault.ObjectPropertyOperations.GetProperties(objVer, updateFromServer);
```