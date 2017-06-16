---
layout: page
title: M-Files' Built-In Functionality
includeInSearch: true
breadcrumb: Built-In
---

As well as APIs and Frameworks allowing developers to extend M-Files' functionality, or to integrate it with other systems, M-Files also provides a number of built-in technologies that developers can utilise to streamline customer implementations.

## VBScript

[VBScript](VBScript) provides an easily-accessible mechanism for server-side code to be placed within an M-Files vault or server.  Code can react to vault events (e.g. event handlers), can execute when objects move through workflows (e.g. to enforce that an object meets some conditions before moving into a state), or even to calculate or validate values of properties on objects.

<p class="note">The <a href="{{ site.baseurl }}/Frameworks/Vault-Application-Framework">Vault Application Framework</a> can be used to enable .NET (typically C#) code to be used in many of the places that VBScript can be used, and should be considered for complex scripts.</p>

## Retrieving objects from external data sources

M-Files can query information (e.g. Customers, Contacts or Projects) held within external data sources, and [automatically import them into M-Files for reference or processing]({{ site.baseurl }}/Built-in/External-Object-Type-Data-Source/).  By default, M-Files can do this with any ODBC-compatible data source, and other data sources can be supported through the use of [Custom External Object Type Data Sources]({{ site.baseurl }}/Built-in/External-Object-Type-Data-Source/Custom/) (.NET assemblies).

## Retrieving documents from file or email sources

M-Files can natively [retrieve documents from file or email sources](http://www.m-files.com/user-guide/latest/eng/#connections_to_external_sources.html).  These can be configured using the M-Files Admin program.

