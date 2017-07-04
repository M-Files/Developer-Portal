---
layout: page
title: Application Structure
breadcrumb: Structure
---

User Interface Extensibility Framework applications consist of a number of files:

## Application manifest file (appdef.xml)

This file provides information such as the unique identifier for the application (its GUID), publisher information, information on the platforms it targets (desktop or web), and the modules and dashboards that make up the application itself.

<p class="note"><a href="{{ site.baseurl }}/Frameworks/User-Interface-Extensibility-Framework/Structure/AppDef/">More information on the appdef.xml file is available in the dedicated page.</a></p>

## Modules (.js files)

These modules contain the application code.  There are three types of module: `VaultCore` modules, `VaultUI` modules, and `ShellUI` modules.  Most modules are `ShellUI` modules.  

<p class="note"><a href="{{ site.baseurl }}/Frameworks/User-Interface-Extensibility-Framework/Structure/Modules/">More information on modules is available in the dedicated page.</a></p>

## Dashboards (.js, .css, .html files)

Dashboards are user interfaces that are shown to the user, either when the module starts or on an associated event (e.g. an object of a specific type is selected).

<p class="note"><a href="{{ site.baseurl }}/Frameworks/User-Interface-Extensibility-Framework/Structure/Dashboards/">More information on dashboards file is available in the dedicated page.</a></p>

