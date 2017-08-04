---
layout: page
title: What's New
---

This page details the major updates to the [M-Files Developer Portal](http://developer.m-files.com) since its initial launch.

## 2017

### August 2017

* General
	* Added a sample on [copying objects from within a workflow]({{ site.baseurl }}/Samples-And-Libraries/Samples/Processes/Copying-Objects/)
	* Added a [What's New]({{ site.baseurl }}/Whats-New/) page to detail major additions to the developer portal
	* Added a [code of conduct](https://github.com/M-Files/MFilesSamplesAndLibraries/blob/master/CODE_OF_CONDUCT.md) and [contribution guide](https://github.com/M-Files/MFilesSamplesAndLibraries/blob/master/CONTRIBUTING.md) to clarify the way in which we interact with the developer community through our public repositories.
	* Altered website source code to provide a better experience when pinning the site (Windows, Android, iOS).

### July 2017

The User Interface Extensibility Framework section was created and launched.

* Using built-in functionality
	* Detailed the valid column definition types that can be exposed when [creating a custom external object type data source]({{ site.baseurl }}/Built-In/External-Object-Type-Data-Source/Custom/).
* REST API
	* Added a [Postman collection]({{ site.baseurl }}/APIs/REST-API/Useful-Applications/) to the GitHub repository for easy testing of the web service
* [User Interface Extensibility Framework]({{ site.baseurl }}/Frameworks/User-Interface-Extensibility-Framework/) section added
	* [Pre-approval of applications]({{ site.baseurl }}/Frameworks/User-Interface-Extensibility-Framework/Pre-Approval/)
	* Development practices documentation, such as [local development folder]({{ site.baseurl }}/Frameworks/User-Interface-Extensibility-Framework/Development-Practices/Local-Development-Folder/), [debugging]({{ site.baseurl }}/Frameworks/User-Interface-Extensibility-Framework/Development-Practices/Debugging/) and how to [target specific M-Files platforms]({{ site.baseurl }}/Frameworks/User-Interface-Extensibility-Framework/Development-Practices/Platform-Targeting/)
	* Added a number of [User Interface Extensibility Framework samples]({{ site.baseurl }}/Samples-And-Libraries/Samples/User-Interface-Extensibility-Framework/)
* Vault Application Framework
	* Detailed [RequiredVaultAccess]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Attributes/Vault-Extension-Methods/) when using Vault Extension Methods
	* Detailed how to [access content from .NET configuration files]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Development-Practices/DotNet-Configuration-Files/) within the Vault Application Framework
	* Added information on the [Vault Application Framework Code Snippets]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Visual-Studio-Template/Code-Snippets/), including how to get them and use them
* General
	* Added line numbers to code samples
	* Better layout on very small (e.g. phone) resolutions
	* Added ability to link directly to in-page-headings
	* Added a button to copy code into the clipboard, displayed above each code sample
	* Rendered "In this article" links into the page content, rather than building them at runtime, and made them available on smaller device breakpoints
	* Added a sample to [communicate from client-side code to server-side code]({{ site.baseurl }}/Samples-And-Libraries/Samples/Processes/Client-To-Server-Communication/)

### June 2017

* Using built-in functionality
	* [URL structure]({{ site.baseurl }}/Built-In/URLs/)
	* [Metadata Card Configuration]({{ site.baseurl }}/Built-In/Metadata-Card-Configuration/)
	* Detailed how to [alter the external object type refresh logic]({{ site.baseurl }}/Built-In/External-Object-Type-Data-Source/Default-Refresh-Logic/)
	* Details on how to [theme the M-Files Desktop and M-Files Web Access clients]({{ site.baseurl }}/Built-In/Theming/)
* COM API
	* Improved COM API search examples.
* REST API
	* Added sample to [control authentication token expiration]({{ site.baseurl }}/APIs/REST-API/Authentication/#controlling-authentication-token-expiration).
* Vault Application Framework
	* Added helper pages on [ObjVerChanges]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Helpers/ObjVerChanges/) and [MFPropertyValuesBuilder]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Helpers/MFPropertyValuesBuilder/).
* General
	* Improved navigation at smaller responsive breakpoints.
	* Samples linked through to github.
	* Added links to [GitHub sample on searching by external ID](https://github.com/M-Files/MFilesSamplesAndLibraries/tree/master/Samples/COM%20API/SearchByDisplayId).
	* Added breadcrumb navigation.

### May 2017

The M-Files Developer Portal was launched in a preview capacity at the European M-Files Partner Conference.

* Using built-in functionality
	* External Object Type Data Sources
	* VBScript
* COM API
	* Connecting and authenticating
	* Searching
* REST API
	* Concepts
	* Authenticating
		* Using Single Sign On
	* Searching
* Vault Application Framework
	* Visual Studio Template
	* Development Practices
	* Attributes
	* Background operations
	* Helpers
	* Using VB.NET
* Samples and Libraries
	* Libraries
		* [REST API Wrapper]({{ site.baseurl }}/Samples-And-Libraries/Libraries/REST-API/#rest-api-wrapper-net)
		* COM API Extension Methods
	* Samples
		* [COM API]({{ site.baseurl }}/Samples-And-Libraries/Samples/COM-API/)
			* Searching by [display/external Id](https://github.com/M-Files/MFilesSamplesAndLibraries/tree/master/Samples/COM%20API/SearchByDisplayId#readme)
			* Executing a [segmented search](https://github.com/M-Files/MFilesSamplesAndLibraries/tree/master/Samples/COM%20API/SegmentedSearch#readme)
		* [REST API]({{ site.baseurl }}/Samples-And-Libraries/Samples/REST-API/)
			* Downloading files
			* Searching
			* Navigating through the view structures
