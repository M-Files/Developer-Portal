---
layout: page
title: REST API Library
includeInSearch: true
breadcrumb: REST API
---

<p class="note warning">Please note that these samples and libraries are provided "as-is" and with no warranty, explicit or otherwise. You should ensure that the functionality of these libraries meet your requirements, and thoroughly test them, prior to using in any production scenarios.  The items linked below are designed as teaching tools and may not be fully complete.</p>

All M-Files Samples and Libraries are available in our [public GitHub repositories](https://github.com/m-files/MFilesSamplesAndLibraries/).  Further samples and libraries will be added in response to partner feedback.

## REST API Wrapper (.NET)

This library aims to provide an easy-to-use .NET wrapper for the [M-Files Web Service]({{ site.baseurl }}/APIs/REST-API/), which is part of the [M-Files Web Access](http://www.m-files.com/user-guide/latest/eng/#Configure_M-Files_Web_Access.html).

* [Authentication](https://github.com/M-Files/MFilesSamplesAndLibraries/tree/master/Libraries/MFaaP.MFWSClient#authentication) ([using M-Files or Windows credentials](https://github.com/M-Files/MFilesSamplesAndLibraries/tree/master/Libraries/MFaaP.MFWSClient#authenticating-using-credentials), or using [Single Sign On](https://github.com/M-Files/MFilesSamplesAndLibraries/tree/master/Libraries/MFaaP.MFWSClient#authenticating-using-windows-single-sign-on)).
* [Searching](https://github.com/M-Files/MFilesSamplesAndLibraries/tree/master/Libraries/MFaaP.MFWSClient#searching) ([quick search](https://github.com/M-Files/MFilesSamplesAndLibraries/tree/master/Libraries/MFaaP.MFWSClient#quick-search), or [complex searches](https://github.com/M-Files/MFilesSamplesAndLibraries/tree/master/Libraries/MFaaP.MFWSClient#advanced--complex-search)).
* File upload and object creation..
* [Checking objects in and out](https://github.com/M-Files/MFilesSamplesAndLibraries/tree/master/Libraries/MFaaP.MFWSClient#checking-an-object-in-and-out), and [undoing a checkout](https://github.com/M-Files/MFilesSamplesAndLibraries/tree/master/Libraries/MFaaP.MFWSClient#undoing-a-checkout).
* [Updating a single property on an object (or adding a new one)](https://github.com/M-Files/MFilesSamplesAndLibraries/tree/master/Libraries/MFaaP.MFWSClient#updating-properties), and [removing a property from an object](https://github.com/M-Files/MFilesSamplesAndLibraries/tree/master/Libraries/MFaaP.MFWSClient#removing-properties).
* [Deleting](https://github.com/M-Files/MFilesSamplesAndLibraries/tree/master/Libraries/MFaaP.MFWSClient#deleting) and [undeleting](https://github.com/M-Files/MFilesSamplesAndLibraries/tree/master/Libraries/MFaaP.MFWSClient#undeleting) an object.
* [Vault Extension Method execution](https://github.com/M-Files/MFilesSamplesAndLibraries/tree/master/Libraries/MFaaP.MFWSClient#executing-vault-extension-methods)
* Retrieval of object types, value lists, and value list items from the vault.

The library contains a set of basic unit tests, which will be expanded as the library progresses.

<p class="note">More details and examples are available <a href="https://github.com/M-Files/MFilesSamplesAndLibraries/tree/master/Libraries/MFaaP.MFWSClient#readme">in in the GitHub repository</a>.</p>