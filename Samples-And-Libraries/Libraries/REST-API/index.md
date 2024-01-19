---
layout: page
title: REST API Library
includeInSearch: true
breadcrumb: REST API
---

Please note that these samples and libraries are provided "as-is" and with no warranty, explicit or otherwise. You should ensure that the functionality of these libraries meet your requirements, and thoroughly test them, prior to using in any production scenarios.  The items linked below are designed as teaching tools and may not be fully complete.
{:.note.warning}

All M-Files Samples and Libraries are available in our [public GitHub repository](https://github.com/M-Files/Libraries.MFWSClient).  Further samples and libraries will be added in response to partner feedback.

## REST API Wrapper (.NET)

This library aims to provide an easy-to-use .NET wrapper for the [M-Files Web Service]({{ site.baseurl }}/APIs/REST-API/), which is part of the [M-Files Classic Web](https://www.m-files.com/user-guide/latest/eng/Configure_M-Files_Web_Access.html).

* [Authentication](https://github.com/M-Files/Libraries.MFWSClient#authentication) ([using M-Files or Windows credentials](https://github.com/M-Files/Libraries.MFWSClient#authenticating-using-credentials), or using [Single Sign On](https://github.com/M-Files/Libraries.MFWSClient#authenticating-using-windows-single-sign-on)).
* [Searching](https://github.com/M-Files/Libraries.MFWSClient#searching) ([quick search](https://github.com/M-Files/Libraries.MFWSClient#quick-search), or [complex searches](https://github.com/M-Files/Libraries.MFWSClient#advanced--complex-search)).
* File upload and object creation..
* [Checking objects in and out](https://github.com/M-Files/Libraries.MFWSClient#checking-an-object-in-and-out), and [undoing a checkout](https://github.com/M-Files/Libraries.MFWSClient#undoing-a-checkout).
* [Updating a single property on an object (or adding a new one)](https://github.com/M-Files/Libraries.MFWSClient#updating-properties), and [removing a property from an object](https://github.com/M-Files/Libraries.MFWSClient#removing-properties).
* [Deleting](https://github.com/M-Files/Libraries.MFWSClient#deleting) and [undeleting](https://github.com/M-Files/Libraries.MFWSClient#undeleting) an object.
* [Vault Extension Method execution](https://github.com/M-Files/Libraries.MFWSClient#executing-vault-extension-methods)
* Retrieval of object types, value lists, and value list items from the vault.

The library contains a set of basic unit tests, which will be expanded as the library progresses.

More details and examples are available [in in the GitHub repository](https://github.com/M-Files/Libraries.MFWSClient#readme).
{:.note}