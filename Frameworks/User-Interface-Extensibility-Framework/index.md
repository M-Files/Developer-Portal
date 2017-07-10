---
layout: page
title: The User Interface Extensibility Framework
breadcrumb: UIX
---

The User Interface Extensibility Framework (UIX) was created to allow developers to build client-side applications that interact with the M-Files Desktop and M-Files Web Access.  

<p class="note">A <a href="https://www.m-files.com/UI_Extensibility_Framework/">technical reference</a> website is available which provides detailed information such as interface members.  This website focuses instead on the practicalities of developing applications using the UIX.</p>

## Use cases

The User Interface Extensibility Framework is used to develop additional client-side functionality.  This may include:

* Buttons in the [Task Area](http://www.m-files.com/user-guide/latest/eng/#using_the_m-files_client.html) that perform common, or complex routines.
* Context-menu items that allow custom processing for selected objects.
* Display of [dashboards]({{ site.baseurl }}/Frameworks/User-Interface-Extensibility-Framework/Dashboards/) that contain custom user interfaces.  These user interfaces may be context-sensitive, such as showing a [burndown chart](https://en.wikipedia.org/wiki/Burn_down_chart) for a project when the project is selected in M-Files.

## Application Structure

User Interface Extensibility Framework applications consist of a number of files deployed in a `.zip` or `.mfappx` package (an `.mfappx` package is simply a renamed zip file and is used to easily identify deployable M-Files applications).  The package must have one [Application manifest (appdef.xml) file]({{ site.baseurl }}/Frameworks/User-Interface-Extensibility-Framework/Structure/), one or more [modules]({{ site.baseurl }}/Frameworks/User-Interface-Extensibility-Framework/Modules/), and may also contain one or more [dashboards, and their supporting files]({{ site.baseurl }}/Frameworks/User-Interface-Extensibility-Framework/Dashboards/).

<p class="note"><a href="{{ site.baseurl }}/Frameworks/User-Interface-Extensibility-Framework/Structure/">More information on application structure file is available in the dedicated page.</a></p>