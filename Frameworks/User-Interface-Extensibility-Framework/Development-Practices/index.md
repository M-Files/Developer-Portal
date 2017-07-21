---
layout: page
title: User Interface Extensibility Framework Development Practices
includeInSearch: true
breadcrumb: Development Practices
---

## Local development folder

Developing applications can be done without direct access to the M-Files Server.  This allows developers to test code on their machines before deploying it to multiple users.  To develop applications locally you will need to know the [GUID of the vault you wish to test the application in]({{ site.baseurl }}/Frameworks/User-Interface-Extensibility-Framework/Pre-Approval/#the-m-files-vault-guid), and the [version of M-Files that is running on your machine]({{ site.baseurl }}/Frameworks/User-Interface-Extensibility-Framework/Pre-Approval/#the-m-files-client-version) (note: the version of M-Files on your machine may be different to that running on the server).  The application files, such as the [application definition file]({{ site.baseurl }}/Frameworks/User-Interface-Extensibility-Framework/Application-Definition/), [module files]({{ site.baseurl }}/Frameworks/User-Interface-Extensibility-Framework/Modules/) or any [dashboard content]({{ site.baseurl }}/Frameworks/User-Interface-Extensibility-Framework/Dashboards/) can be saved into this folder.

To develop a local application named "My App" locally, create the following folder structure replacing `<version>` with the M-Files client version, and `<guid>` with the GUID of the vault:

`C:\Program Files\M-Files\<version>\Client\Apps\<guid>\sysapps\My App`

For example, for an application running in a vault with GUID `{C840BE1A-5B47-4AC0-8EF7-835C166C8E24}` on M-Files client version `11.3.4330.196`, the following folder should be created:

`C:\Program Files\M-Files\11.3.4330.196\Client\Apps\{C840BE1A-5B47-4AC0-8EF7-835C166C8E24}sysapps\My App`

Once the applications are complete, the contents of the folder can be zipped up and deployed to the live vault using the M-Files Admin tool.  The application will be offered to users to install next time they connect to the vault.  This screen can be avoided - and the application forcibly installed - by [pre-approving it using registry keys]({{ site.baseurl }}/Frameworks/User-Interface-Extensibility-Framework/Pre-Approval/).

<p class="note">To test your application, simply log into the M-Files vault using the M-Files Desktop client on the same machine as the local development folder.  Changes will only be loaded when you log out and log in again to the vault.</p>

<p class="note warning">The local development area is also used to hold local copies of applications installed into the vault.  You cannot use this location to develop new versions of an existing application unless you alter the application's <a href="{{ site.baseurl }}/Frameworks/User-Interface-Extensibility-Framework/Application-Definition/#guid-formatting">GUID</a>.</p>

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

<p class="note">This is useful when calling API methods that define optional parameters, but JavaScript requires a non-null value to be passed.</p>

### Optional parameters

When calling an API method that defines optional parameters, values for all the optional parameters must be provided.  For example: a call to [GetProperties](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~VaultObjectPropertyOperations~GetProperties.html) defines one mandatory and one optional argument, however both must be provided when being called from JavaScript:

```javascript
// Do we need to update from the server?
var updateFromServer = false;

// Get the property values.
var propertyValues = vault.ObjectPropertyOperations.GetProperties(objVer, updateFromServer);
```