---
layout: page
title: Development Practices for the Vault Application Framework
breadcrumb: Practices
---

## Debugging

Vault Application Framework applications can be [easily debugged from within Visual Studio](Debugging).

## Exceptions

[Exceptions can be thrown from within Vault Application Framework applications](Exceptions) to replicate the functionality of `Err.Raise` in VBScript.  Exceptions are typically shown to the user as a message box, and the current vault transaction rolled back.

## Configuration Files

When executing a .NET application (e.g. a console application), the .NET framework will automatically locate the configuration file (e.g. `app.config`) and provide easy access to the contents.  An issue that developers often encounter, especially when attempting to reference a web service from within a Vault Application Framework application is that the configuration file data will not automatically be loaded and so these values are not available.  Information on approaches to work around this are available on the [dedicated Configuration Files](DotNet-Configuration-Files) page.

## Vault application code thread culture

Vault applications have their culture set automatically to the M-Files Client culture.  This happens automatically and may affect the way that code within vault applications formats numbers, dates, and the like.

This can be changed using various approaches.  More details are available on the dedicated support article: [Culture behavior in VAF app code](https://m-files.my.site.com/s/article/Culture-behavior-in-VAF-app-code).
