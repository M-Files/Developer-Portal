---
layout: page
title: The User Interface Extensibility Framework
breadcrumb: UIX
includeInSearch: true
---

The User Interface Extensibility Framework (UIX) was created to allow developers to build client-side applications that interact with the M-Files Desktop and M-Files Web Access.  

<p class="note">A <a href="https://www.m-files.com/UI_Extensibility_Framework/">technical reference</a> website is available which provides detailed information such as interface members.  This website focuses instead on the practicalities of developing applications using the UIX.</p>

## Use cases

The User Interface Extensibility Framework is used to develop additional client-side functionality.  This may include:

* Buttons in the [Task Area](http://www.m-files.com/user-guide/latest/eng/#using_the_m-files_client.html) that perform common, or complex routines.
* Context-menu items that allow custom processing for selected objects.
* Display of [dashboards]({{ site.baseurl }}/Frameworks/User-Interface-Extensibility-Framework/Dashboards/) that contain custom user interfaces.  These user interfaces may be context-sensitive, such as showing a [burndown chart](https://en.wikipedia.org/wiki/Burn_down_chart) for a project when the project is selected in M-Files.

## Development processes

[Developing User Interface Extensibility Framework applications]({{ site.baseurl }}/Frameworks/User-Interface-Extensibility-Framework/Development-Practices/) uses a different set of technologies and approaches compared to server-side development such as [VBScript]({{ site.baseurl }}/Built-In/VBScript/) or the [Vault Application Framework]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/).

* [Asynchronous API programming]({{ site.baseurl }}/Frameworks/User-Interface-Extensibility-Framework/Development-Practices/Asynchronous-API-Programming/)
* [Debugging]({{ site.baseurl }}/Frameworks/User-Interface-Extensibility-Framework/Development-Practices/Debugging/)
* [Deployment of applications to the M-Files Server]({{ site.baseurl }}/Frameworks/User-Interface-Extensibility-Framework/Development-Practices/Deployment/)
* [Event registration and module entry points]({{ site.baseurl }}/Frameworks/User-Interface-Extensibility-Framework/Development-Practices/Event-Registration-And-Entry-Points/)
* Using a [local development folder]({{ site.baseurl }}/Frameworks/User-Interface-Extensibility-Framework/Development-Practices/Local-Development-Folder/)
* [Platform targeting]({{ site.baseurl }}/Frameworks/User-Interface-Extensibility-Framework/Development-Practices/Platform-Targeting/)

## Application structure

User Interface Extensibility Framework applications consist of a number of files deployed in a `.zip` or `.mfappx` package (an `.mfappx` package is simply a renamed zip file and is used to easily identify deployable M-Files applications).  The package must have one [Application manifest (appdef.xml) file](#application-definition-file-appdefxml), one or more [modules](#modules-js-files), and may also contain one or more [dashboards, and their supporting files](#dashboards-js-css-html-files).

The main file types contained within a User Interface Extensibility Framework application are:

### Application definition file (appdef.xml)

The application definition/manifest file contains information that the M-Files server uses to register and execute your application, such as the unique identifier for the application (its GUID), publisher information, information on the platforms it targets (desktop or web), and the modules and dashboards that make up the application itself.

<p class="note"><a href="{{ site.baseurl }}/Frameworks/User-Interface-Extensibility-Framework/Application-Definition/">More information on the application definition/manifest file is available in the dedicated page.</a></p>

### Modules (.js files)

These modules contain the application code.  There are three types of module: `VaultCore` modules, `VaultUI` modules, and `ShellUI` modules.  Most modules are `ShellUI` modules.  

<p class="note"><a href="{{ site.baseurl }}/Frameworks/User-Interface-Extensibility-Framework/Modules/">More information on modules is available in the dedicated page.</a></p>

### Dashboards (.js, .css, .html files)

Dashboards are user interfaces that are shown to the user, either when the module starts or on an associated event (e.g. an object of a specific type is selected).

<p class="note"><a href="{{ site.baseurl }}/Frameworks/User-Interface-Extensibility-Framework/Dashboards/">More information on dashboards file is available in the dedicated page.</a></p>
