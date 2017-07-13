---
layout: page
title: Development Practices
includeInSearch: true
stubPage: true
---


## Asynchronous API Programming

The [User Interface Extensibility Framework allows for the M-Files API to be called asynchronously](Asynchronous-API-Programming).  Using asynchronous calls - rather than synchronous calls, which wait for the process to finish before continuing - ensures that the user interface doesn't appear to "lock", and the user experience remains fluid.

<p class="note">Using the asynchronous approach is currently optional when <a href="Platform-Targeting/#the-m-files-desktop-client">targeting the M-Files Desktop client</a>.  It is mandatory when <a href="Platform-Targeting/#m-files-web-access">targeting M-Files Web Access</a>.</p>

## Debugging

Whilst the majority of code which executes within a User Interface Extensibility Framework application cannot be directly debugged, JavaScript code that executes within a dashboard can be debugged.  More information can be found on the [Debugging UIX applications page](Debugging).

## Event Registration



## Platform Targeting

Whilst User Interface Extensibility Framework applications typically target the M-Files Desktop client, since M-Files 11.2.4320.49 it has been possible to additionally target the M-Files Web Access.  More information can be found on the <a href="Platform-Targeting">Platform Targeting page</a>.

<p class="note">The version of the User Interface Extensibility Framework that is available in the M-Files Web Access is a subset of that available in the Desktop client.  Additionally, API support is limited.</p>