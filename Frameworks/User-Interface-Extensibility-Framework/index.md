---
layout: page
title: The User Interface Extensibility Framework
breadcrumb: UIX
includeInSearch: true
excerpt: The User Interface Extensibility Framework (UIX) was created to allow developers to build client-side applications that interact with the M-Files Desktop and M-Files Classic Web.  User Interface Extensibility Framework applications are a combination of a number of text files (one [application definition file](./Application-Definition/), one or more [modules](./Modules/), and zero or more [dashboards](./Dashboards/).  These are executed on the M-Files Desktop client or within the M-Files Classic Web and are used to extend the client-side functionality of the core software.
---

A [technical reference](https://www.m-files.com/UI_Extensibility_Framework/) website is available which provides detailed information such as interface members.  This website focuses instead on the practicalities of developing applications using the UIX.
{:.note}

## Use cases

The User Interface Extensibility Framework is used to develop additional client-side functionality.  This may include:

* Buttons in the [Task Area](https://www.m-files.com/user-guide/latest/eng/using_the_m-files_client.html) that perform common, or complex routines.
* Context-menu items that allow custom processing for selected objects.
* Display of [dashboards]({{ site.baseurl }}/Frameworks/User-Interface-Extensibility-Framework/Dashboards/) that contain custom user interfaces.  These user interfaces may be context-sensitive, such as showing a [burndown chart](https://en.wikipedia.org/wiki/Burn_down_chart) for a project when the project is selected in M-Files.

## Versions

There are two versions of the User Interface Extensibility Framework.  Version 1 is compatible with M-Files Desktop and - with some restrictions - M-Files Classic Web.  Version 2 is compatible with M-Files Web.  Whilst the core concepts are transferrable between the two versions, the development practices and API models vary significantly.

### Version 2

The User Interface Extensibility Framework version 2 will be made available more widely in 2024.  There are some significant differences between the older version and this newer version, including:

* The API model uses the gRPC structures and methods, replacing the older COM API structures.  The gRPC API structures are often more verbose, but there is some wider functionality available.
* The API methods, and many methods within the UIX object model (e.g. ShellFrame), now return Promises and are designed to be used in an asynchronous manner.
* M-Files is looking to improve the developer experience by enabling TypeScript and other technologies as first-class citizens.

## Development practices

[Developing User Interface Extensibility Framework applications]({{ site.baseurl }}/Frameworks/User-Interface-Extensibility-Framework/Development-Practices/) uses a different set of technologies and approaches compared to server-side development such as [VBScript]({{ site.baseurl }}/Built-In/VBScript/) or the [Vault Application Framework]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/).

* [Asynchronous API programming]({{ site.baseurl }}/Frameworks/User-Interface-Extensibility-Framework/Development-Practices/Asynchronous-API-Programming/)
* [Object Lifecycle]({{ site.baseurl }}/Frameworks/User-Interface-Extensibility-Framework/Development-Practices/Object-Lifecycle/)
* [Debugging]({{ site.baseurl }}/Frameworks/User-Interface-Extensibility-Framework/Development-Practices/Debugging/)
* [Deployment of applications to the M-Files Server]({{ site.baseurl }}/Frameworks/User-Interface-Extensibility-Framework/Development-Practices/Deployment/)
* [Event registration and module entry points]({{ site.baseurl }}/Frameworks/User-Interface-Extensibility-Framework/Development-Practices/Event-Registration-And-Entry-Points/)
* Using a [local development folder]({{ site.baseurl }}/Frameworks/User-Interface-Extensibility-Framework/Development-Practices/Local-Development-Folder/)
* [Platform targeting]({{ site.baseurl }}/Frameworks/User-Interface-Extensibility-Framework/Development-Practices/Platform-Targeting/)

## Samples and tutorials

Various samples are available within our [Samples and Libraries User Interface Extensibility Framework section]({{ site.baseurl }}/Samples-And-Libraries/Samples/User-Interface-Extensibility-Framework/).

## Application structure

User Interface Extensibility Framework applications consist of a number of files deployed in a `.zip` or `.mfappx` package (an `.mfappx` package is simply a renamed zip file and is used to easily identify deployable M-Files applications).  The package must have one [Application manifest (appdef.xml) file](#application-definition-file-appdefxml), one or more [modules](#modules-js-files), and may also contain one or more [dashboards, and their supporting files](#dashboards-js-css-html-files).

The main file types contained within a User Interface Extensibility Framework application are:

### Application definition file (appdef.xml)

The application definition/manifest file contains information that the M-Files server uses to register and execute your application, such as the unique identifier for the application (its GUID), publisher information, information on the platforms it targets (desktop or web), and the modules and dashboards that make up the application itself.

<a href="{{ site.baseurl }}/Frameworks/User-Interface-Extensibility-Framework/Application-Definition/">More information on the application definition/manifest file is available in the dedicated page.</a>
{:.note}

### Modules (.js files)

These modules contain the application code.  There are three types of module: `VaultCore` modules, `VaultUI` modules, and `ShellUI` modules.  Most modules are `ShellUI` modules.  

<a href="{{ site.baseurl }}/Frameworks/User-Interface-Extensibility-Framework/Modules/">More information on modules is available in the dedicated page.</a>
{:.note}

### Dashboards (.js, .css, .html files)

Dashboards are user interfaces that are shown to the user, either when the module starts or on an associated event (e.g. an object of a specific type is selected).

<a href="{{ site.baseurl }}/Frameworks/User-Interface-Extensibility-Framework/Dashboards/">More information on dashboards file is available in the dedicated page.</a>
{:.note}
