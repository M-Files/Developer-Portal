---
layout: page
title: User Interface Extensibility Framework Development Practices
includeInSearch: true
breadcrumb: Development Practices
---

## Debugging

Whilst the majority of code which executes within a User Interface Extensibility Framework application cannot be directly debugged, JavaScript code that executes within a dashboard can be debugged.  More information can be found on the [Debugging UIX applications page](Debugging).

## Event Registration and Entry Points

The User Interface Extensibility Framework is largely event-driven; each module must register a callback function for the events it wishes to be notified about.  [Reacting to events]({{ site.baseurl }}/Frameworks/User-Interface-Extensibility-Framework/Development-Practices/Event-Registration-And-Entry-Points/#reacting-to-events) requires registration of handler functions.  These handler functions are automatically called by the framework when the appropriate [events](https://www.m-files.com/UI_Extensibility_Framework/#Events.html) fire.

In addition, the application entry point and [dashboards]({{ site.baseurl }}/Frameworks/User-Interface-Extensibility-Framework/Development-Practices/Event-Registration-And-Entry-Points/#dashboard-entry-points) require correctly-named methods to exist to be informed when they start (`OnNewShellUI` and `OnNewDashboard` respectively).

## Deployment

User Interface Extensibility Framework applications are [deployed using the M-Files Admin tool]({{ site.baseurl }}/Frameworks/User-Interface-Extensibility-Framework/Development-Practices/Deployment/).

## Tips and Tricks

### Referencing enumerated values

Many enumerated values can be accessed via enums in the framework itself, e.g. [MenuLocation]({{site.baseurl}}/Frameworks/User-Interface-Extensibility-Framework/Reference/Version2/UIExt2/Enums/MenuLocation/), can be referenced via `MFiles.MenuLocation`.  Enum values from the API, e.g. [ConditionType]({{site.baseurl}}/Frameworks/User-Interface-Extensibility-Framework/Reference/Version2/gRPC/Enums/ConditionType/) can be referenced via `MFiles.VaultEnums`.

### Raising and handling exceptions

Exceptions can be trapped using try/catch or by reacting when the promise for an asynchronous action excepts. It is generally good practice to ensure that the error is logged to the console (`console.error(err)`).  In many situations the error could also be shown to the user as a toast or via `MFiles.ReportException`:

```javascript

// Assume that err is the JavaScript error:

// Show via a toast:
await MFiles.ShowToast(err.message, err.stack || err.shortMessage, MFiles.ToastType.ToastType_Warning);

// Alternatively use the ReportException method:
await MFiles.ReportException(err);

```
