---
layout: page
title: The User Interface Extensibility Framework
includeInSearch: false
breadcrumb: UIX
---

The User Interface Extensibility Framework (UIX) was created to allow developers to build client-side applications that interact with the M-Files Desktop and M-Files Web Access.  

<p class="note">A <a href="https://www.m-files.com/UI_Extensibility_Framework/">technical reference</a> website is available which provides detailed information such as interface members.  This website focuses instead on the practicalities of developing applications using the UIX.</p>

## Application Structure

User Interface Extensibility Framework applications consist of a number of files:

### An application manifest file (appdef.xml)

This file provides information such as the unique identifier for the application (its GUID), publisher information, information on the platforms it targets (desktop or web), and the modules and dashboards that make up the application itself.

<p class="note"><a href="{{ site.baseurl }}/Frameworks/User-Interface-Extensibility-Framework/AppDef }}">More information on the appdef.xml file is available in the dedicated page.</a></p>

### Modules (.js files)

These modules contain the application code.  There are three types of module: `VaultCore` modules, `VaultUI` modules, and `ShellUI` modules.  Most modules are `ShellUI` modules.  

<p class="note"><a href="{{ site.baseurl }}/Frameworks/User-Interface-Extensibility-Framework/Modules }}">More information on modules is available in the dedicated page.</a></p>

### Dashboards (.js, .css, .html files)

Dashboards are user interfaces that are shown to the user, either when the module starts or on an associated event (e.g. an object of a specific type is selected).

<p class="note"><a href="{{ site.baseurl }}/Frameworks/User-Interface-Extensibility-Framework/Dashboards }}">More information on dashboards file is available in the dedicated page.</a></p>

