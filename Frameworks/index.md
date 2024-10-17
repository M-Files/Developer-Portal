---
layout: page
title: M-Files Frameworks
includeInSearch: true
breadcrumb: Frameworks
---

M-Files provides two separate frameworks for building applications that run within the M-Files software: the User Interface Extensibility Framework (UIX), and the Vault Application Framework (VAF).  The [User Interface Extensibility Framework (UIX)]({{ site.baseurl }}/Frameworks/User-Interface-Extensibility-Framework/) is used to create client-side applications that interact with, replace, or react to, the M-Files Desktop client or M-Files Classic Web.  The [Vault Application Framework (VAF)]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/) is designed as a replacement for using VBScript within M-Files vaults, allowing the use of .NET code instead.

## [User Interface Extensibility Framework (UIX)]({{ site.baseurl }}/Frameworks/User-Interface-Extensibility-Framework/)

* Used to create client-side applications.
* Can tailor the user interface, such as changing logos or showing or hiding UI elements.
* Can create buttons and menu items which can react to selected items.
* Can create "dashboards" which are shown on demand, and can be provided with content from M-Files.

More information is available in the [User Interface Extensibility Framework section]({{ site.baseurl }}/Frameworks/User-Interface-Extensibility-Framework/).
{:.note}

## [Vault Application Framework (VAF)]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/)

* Used to create server-side applications.
* Can be used to execute .NET code in response to object (e.g before an object is checked in) or vault events (e.g. before a view is deleted).
* Can be used to execute .NET code as an object moves through a workflow.
* Can be used to create background operations which execute periodically.
* Can be used to execute .NET code to calculate property values and/or provide property value validation.

More information is available in the [Vault Application Framework section]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/).
{:.note}

## [Logging]({{ site.baseurl }}/Frameworks/Logging/)

* Used from vault applications to log in a consistent manner.

More information is available in the [Logging section]({{ site.baseurl }}/Frameworks/Logging/).
{:.note}