---
layout: page
title: The User Interface Extensibility Framework
breadcrumb: UIX
includeInSearch: true
---


## Use cases

The User Interface Extensibility Framework is used to develop additional client-side functionality.  This may include:

* Context-menu items that allow custom processing for selected objects.
* Display of [dashboards]({{ site.baseurl }}/Frameworks/User-Interface-Extensibility-Framework/Dashboards/) that contain custom user interfaces.  These user interfaces may be context-sensitive, such as showing a [burndown chart](https://en.wikipedia.org/wiki/Burn_down_chart) for a project when the project is selected in M-Files.

## Versions

There are two versions of the User Interface Extensibility Framework.  Version 1 is compatible with M-Files Classic Desktop and - with some restrictions - M-Files Classic Web.  Version 2 is compatible with M-Files Web and the new M-Files Desktop clients.  Whilst the core concepts are transferrable between the two versions, the development practices and API models vary significantly.

It may be that - even within one customer - some users are using the classic clients and some using the newer clients.  During that time you may consider building separate UI applications using version 1 (targeting the classic clients) and version 2 (targeting the new clients) and installing both to a vault; this way the server will be able to provide the correct experience to all users.  UI applications must target either one version or the other.
{:note}

### Version 2

There are some significant differences between the older version and this newer version, including:

* The API model uses a different object model and API methods, replacing the older COM API structures.  The newer structures are often more verbose.
* The API methods, and many methods within the UIX object model (e.g. ShellFrame), now return Promises and are designed to be used in an asynchronous manner.
* M-Files is looking to improve the developer experience by enabling TypeScript and other technologies as first-class citizens.

## Development practices

[Developing User Interface Extensibility Framework applications]({{ site.baseurl }}/Frameworks/User-Interface-Extensibility-Framework/Development-Practices/) uses a different set of technologies and approaches compared to server-side development such as [VBScript]({{ site.baseurl }}/Built-In/VBScript/) or the [Vault Application Framework]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/).


## Application structure

User Interface Extensibility Framework applications consist of a number of files deployed in a `.zip` or `.mfappx` package (an `.mfappx` package is simply a renamed zip file and is used to easily identify deployable M-Files applications).  The package must have one [Application manifest (appdef.xml) file](#application-definition-file-appdefxml), one or more JavaScript files defining the entry point, and may also contain one or more [dashboards, and their supporting files](#dashboards-js-css-html-files).

The main file types contained within a User Interface Extensibility Framework application are:

### Application definition file (appdef.xml)

The application definition/manifest file contains information that the M-Files server uses to register and execute your application, such as the unique identifier for the application (its GUID), publisher information, information on the clients it supports (via the schema), and the JavaScript and dashboards that make up the application itself.

<a href="{{ site.baseurl }}/Frameworks/User-Interface-Extensibility-Framework/Application-Definition/">More information on the application definition/manifest file is available in the dedicated page.</a>
{:.note}

### Dashboards (.js, .css, .html files)

Dashboards are user interfaces that are shown to the user, either when the module starts or on an associated event (e.g. an object of a specific type is selected).

<a href="{{ site.baseurl }}/Frameworks/User-Interface-Extensibility-Framework/Dashboards/">More information on dashboards file is available in the dedicated page.</a>
{:.note}
