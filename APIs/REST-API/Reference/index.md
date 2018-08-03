---
layout: mfws
title: M-Files Web Service
includeInSearch: true
---

# M-Files Web Service

M-Files Web Service allows programmatic access to M-Files through a REST-like interface. The service provides basic read/write access to M-Files which includes reading and modifying objects and reading document vault structures. 

Unlike the traditional M-Files API, which requires ActiveX/COM support, the web service can be used from any application that can perform HTTP requests. These include .NET applications limited by code access security, applications running on non-Windows platforms and web applications written in JavaScript.

## This document

This document is aimed at developers interested in using M-Files Web Service for application development. The document is divided in the following chapters:

**[Overview]({{ site.baseurl }}/APIs/REST-API/Reference/overview/)** describes the general structure of M-Files Web Service.

**[Getting Started]({{ site.baseurl }}/APIs/REST-API/Reference/gettingstarted/)** walks you through the basic steps required in using M-Files Web Service. The section contains examples on authentication, reading contents from M-Files as well as editing them.

**[Request parameters]({{ site.baseurl }}/APIs/REST-API/Reference/parameters/)** contains a description of common parameters handled by the M-Files Web Service request handler. These parameters are usable with most of the resources.

**[Resource reference]({{ site.baseurl }}/APIs/REST-API/Reference/resources/)** contains description of all the resources provided by the M-Files Web Service.

**[Type reference]({{ site.baseurl }}/APIs/REST-API/Reference/structs/)** contains description of all the types used to represent the resources.

**[Enumeration reference]({{ site.baseurl }}/APIs/REST-API/Reference/enumerations/)** Lists the different enumeration types used by the M-Files Web Service.

**[Intelligent Metadata Layer (IML)]({{ site.baseurl }}/APIs/REST-API/Reference/iml/)** contains information on IML and how its functionality can be accessed via the M-Files REST API.

**[Encoding syntax]({{ site.baseurl }}/APIs/REST-API/Reference/syntax/)** contains a reference on the more complex encoding formats used by the M-Files Web Service.

**[Error reporting]({{ site.baseurl }}/APIs/REST-API/Reference/error/)** describes the way M-Files Web Service communicates server-side exception back to the application over the HTTP protocol.

**[Compatibility]({{ site.baseurl }}/APIs/REST-API/Reference/compatibility/)** lists best practices that enable applications to consume M-Files Web Services hosted on top of different server configurations.

**[Sample code]({{ site.baseurl }}/APIs/REST-API/Reference/samples/)** contains a package of code samples to help in application development.

