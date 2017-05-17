---
layout: page
title: Hello, world.
---

M-Files' powerful approach to Enterprise Content Management allows businesses to work with what content is, instead of where it's saved.  This powerful metadata-based approach can be used to easily design, build and deploy systems that support businesses in almost any sector, of almost any size.  Whilst M-Files' out-of-the-box functionality allows deep integration with various platforms and technologies, it also has a broad set of developer-orientated APIs and frameworks which can be used to extend this even further.

We call this *M-Files as a Platform*.

## Using this website

This website complements and extends our existing documentation, available either online or within repositories such as the M-Files Partner Portal.  The purpose of this website is to provide tailored guidance, tutorials, and samples to software developers looking to extend or integrate with M-Files.

## Built-in functionality

M-Files provides significant built-in functionality which can be used by developers and non-developers to create integrated solutions.  [M-Files' scripting environment]({{ site.baseurl }}/Built-In/VBScript/) allows VBScript to be executed in response to object or server events, or as objects move through workflows.  Objects can be retrieved from remote [ODBC-compatible data sources](http://www.m-files.com/user-guide/latest/eng/#Connection_to_external_database.html), or [Custom External Object Type Data Sources]({{ site.baseurl }}/Built-In/Custom-External-Object-Type-Data-Source/) can be created to extend this functionality to other sources, such as web services.  Files can also be imported from [External File Sources](http://www.m-files.com/user-guide/latest/eng/#Connection_to_external_database_metadata.html) and can import content from XML files produced by various scanning and imaging software.

## Our APIs

M-Files provides two Application Programming Interfaces for developers to communicate with: the [COM/.NET API]({{ site.baseurl }}/APIs/COM-API/) and the [M-Files Web Service (MFWS)]({{ site.baseurl }}/APIs/REST-API/). The choice of which to use in each scenario will depend upon the technology you are using and the operations that you wish to undertake.

### [COM/.NET API]({{ site.baseurl }}/APIs/COM-API/)

* Our most comprehensive API, providing interfaces for both "user" and "administrative" functions.
* Can only be run on Windows, where the M-Files COM object can be made available.
* Supports the same connection protocols as the desktop client.
* Supports the same authentication schemes as the desktop client.
* Can be run in "client" or "server" mode:
  * Client mode requires a vault connection is already set up within the [M-Files Desktop Settings](http://www.m-files.com/user-guide/latest/eng/#Implementing_the_document_vault.html), and can show M-Files dialogs such as the metadata card for object creation.
  * Server mode does not require a vault connection to be set up on the host machine, but cannot show M-Files dialogs.
* Requires the same version of the API on the client machine as the server.

<p class="note">More information is available in the <a href="{{ site.baseurl }}/APIs/COM-API/">COM API section</a>.</p>

### [The M-Files Web Service (MFWS)]({{ site.baseurl }}/APIs/REST-API/)

* A REST-like web service that is available from within M-Files Web Access.
* Can be called from any environment that can make HTTP requests (e.g. mobile), and is not limited to Windows operating systems.
* Connections to the MFWS are done via HTTPS.
* Supports most "user" operations, but cannot be used to undertake "administrative" functions.
* Not tied directly to the M-Files Server version.

<p class="note">More information is available in the <a href="{{ site.baseurl }}/APIs/REST-API/">REST API section</a>.</p>

## Our Frameworks

M-Files provides two separate frameworks for building applications that run within the M-Files software: the User Interface Extensibility Framework (UIX), and the Vault Application Framework (VAF).  The [User Interface Extensibility Framework (UIX)]({{ site.baseurl }}/Frameworks/User-Interface-Extensibility-Framework/) is used to create client-side applications that interact with, replace, or react to, the M-Files Desktop client or M-Files Web Access.  The [Vault Application Framework (VAF)]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/) is designed as a replacement for using VBScript within M-Files vaults, allowing the use of .NET code instead.

### [User Interface Extensibility Framework (UIX)]({{ site.baseurl }}/Frameworks/User-Interface-Extensibility-Framework/)

* Used to create client-side applications.
* Can tailor the user interface, such as changing logos or showing or hiding UI elements.
* Can create buttons and menu items which can react to selected items.
* Can create "dashboards" which are shown on demand, and can be provided with content from M-Files.

<p class="note">More information is available in the <a href="{{ site.baseurl }}/Frameworks/User-Interface-Extensibility-Framework/">User Interface Extensibility Framework section</a>.</p>

### [Vault Application Framework (VAF)]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/)

* Used to create server-side applications.
* Can be used to execute .NET code in response to object (e.g before an object is checked in) or vault events (e.g. before a view is deleted).
* Can be used to execute .NET code as an object moves through a workflow.
* Can be used to create background operations which execute periodically.
* Can be used to execute .NET code to calculate property values and/or provide property value validation.

<p class="note">More information is available in the <a href="{{ site.baseurl }}/Frameworks/Vault-Application-Framework/">Vault Application Framework section</a>.</p>

## Development Licences

Development licences are available to M-Files resellers and members of the Certified Application Provider program.  For more information contact your Channel Account Manager or the [developer evangelism team](mailto:devsupport@m-files.com).  Alternatively, a 30-day trial of M-Files can be downloaded from [https://www.m-files.com/en/download-latest-version](https://www.m-files.com/en/download-latest-version).