---
layout: page
title: What's New
---

This page details the major updates to the [M-Files Developer Portal](http://developer.m-files.com) since its initial launch.

## 2018

### January 2018
* Built-in
	* Added a page explaining [internal and external IDs]({{ site.baseurl }}/Concepts/InternalAndExternalIDs/).
* COM API
	* Added in a search condition sample for [finding objects with specific flags (e.g. conflict objects)]({{ site.baseurl }}/APIs/COM-API/Searching/SearchConditions/#restricting-by-object-flags-eg-searching-for-conflict-objects).
* Vault Application Framework
	* Added [information on the VAF versions]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Versions/).
	* Added initial (pre-release) content for [the new Configuration integration with M-Files Admin](http://developer.m-files.com/Frameworks/Vault-Application-Framework/Configuration/) with VAF 2.0.
	* Added initial (pre-release) [details on implementing licensing]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Licensing/) with VAF 2.0.
	* Added initial (pre-release) information on the new [file helper]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Helpers/#mffilehelper) and [URL helper]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Helpers/#urlhelper) objects in VAF 2.0.
* User Interface Extensibility Framework
	* Added link to a GitHub sample showing how to use the `OnShowContextMenu` event to [show/hide context menu commands depending on the selected object(s)](https://github.com/M-Files/MFilesSamplesAndLibraries/tree/master/Samples/UIX%20Applications/AlterContextMenuDependingOnSelectedObject/#readme).
	* Added link to a GitHub sample showing [how to interact with .NET managed assemblies distributed with UIX applications](https://github.com/M-Files/MFilesSamplesAndLibraries/tree/master/Samples/UIX%20Applications/UsingManagedAssemblies/#readme).
* General
	* Added a print style sheet for partners wishing to print content.

## 2017

### December 2017
* COM API
	* Added code sample for [searching for 'one of' a set of values]({{ site.baseurl }}/APIs/COM-API/Searching/SearchConditions/#executing-a-one-of-search) in both VBScript and .NET.
	* Added code sample for [restricting search results by a user's permissions]({{ site.baseurl }}/APIs/COM-API/Searching/SearchConditions/#restricting-the-search-results-by-user-permissions), effectively allowing a high-permissions user restrict search results to items which another user can also see.
* General
	* Added UIX [sample to show how to prompt the user to confirm a workflow state change](https://github.com/M-Files/MFilesSamplesAndLibraries/tree/master/Samples/UIX%20Applications/ConfirmWorkflowStateChange).
	* Updated [the sample showing how to react to built-in commands]({{ site.baseurl }}/Samples-And-Libraries/Samples/User-Interface-Extensibility-Framework/BuiltInCommand-Event/) to additionally show how to execute built-in commands from within a UIX application.

### September 2017

* COM API
	* Added code sample for [searching by file name/extension]({{ site.baseurl }}/APIs/COM-API/Searching/SearchConditions/#searching-by-file-type).
* General
	* Added navigational links to official API references for the [COM API](https://www.m-files.com/api/documentation/latest/index.html), [REST API](http://www.m-files.com/MFWS/) and [User Interface Extensibility Framework](https://www.m-files.com/UI_Extensibility_Framework/#FrontPage.html).
	* Added UIX [sample to show how to react to built-in events]({{ site.baseurl }}/Samples-And-Libraries/Samples/User-Interface-Extensibility-Framework/BuiltInCommand-Event/).


### August 2017

* COM API
	* Added examples of [using indirection levels in search conditions]({{ site.baseurl }}/APIs/COM-API/Searching/SearchConditions/#using-indirection-levels).
* General
	* Added a sample on [copying objects from within a workflow]({{ site.baseurl }}/Samples-And-Libraries/Samples/Processes/Copying-Objects/)
	* Added a [What's New]({{ site.baseurl }}/Whats-New/) page to detail major additions to the developer portal
	* Added a [code of conduct](https://github.com/M-Files/MFilesSamplesAndLibraries/blob/master/CODE_OF_CONDUCT.md) and [contribution guide](https://github.com/M-Files/MFilesSamplesAndLibraries/blob/master/CONTRIBUTING.md) to clarify the way in which we interact with the developer community through our public repositories.
	* Altered website source code to provide a better experience when pinning the site (Windows, Android, iOS).
	* Added links to share the current page via email, twitter and LinkedIn.

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
