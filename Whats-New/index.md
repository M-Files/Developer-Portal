---
layout: page
title: What's New
excerpt: This page details the major updates to the [M-Files Developer Portal](http://developer.m-files.com) since its initial launch.
---

## 2018

### December 2018

* User Interface Extensibility Framework
	* Added example to GitHub of [generating the M-Files URL for a selected view](https://github.com/M-Files/MFilesSamplesAndLibraries/tree/master/Samples/UIX%20Applications/ViewURLGenerator/#readme).

### November 2018

* General
	* Dark mode theme improvements
	* Improvements to layouts close to responsive breakpoints
	* Initial [Progressive Web Application]({{ site.baseurl }}/PWA) compatibility enabled (requires browser support)
		* Offline caching 
		* "Add to homepage"
* COM API
	* Added examples of using [DataFunctionCall]({{ site.baseurl }}/APIs/COM-API/Searching/DataFunctionCall/) with search conditions.
* Vault Application Framework
	* Added example of [filtering configuration options by other values]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Configuration/Filtering) (e.g. workflow state by workflow).

### October 2018

* General
	* Dark mode theme available
	* Optimisations for samples tables at low browser window widths (e.g. mobile)
* REST API
	* Added additional information to the [/objects/properties endpoint]({{ site.baseurl }}/APIs/REST-API/Reference/resources/objects/properties/) for working around URI length limitations
	* Fixes for some broken links caused during migration
* Vault Application Framework 2.0
	* Added samples of filtering event handlers by [object type and class]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Attributes/Event-Handlers/)
	* Added example of making an `MFIdentifier` attribute [optional]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Configuration/Editors/#making-mfidentifier-elements-optional)

### September 2018

* COM API
	* Added information on [using pre-shared keys via the COM API]({{ site.baseurl }}/APIs/COM-API/Connecting-And-Authenticating/Pre-Shared-Keys/).
* REST API
	* Added information on [using pre-shared keys via the REST API]({{ site.baseurl }}/APIs/REST-API/Authentication/Pre-Shared-Keys/).

### August 2018

* REST API
	* Official documentation [migrated to the developer portal]({{ site.baseurl }}/APIs/REST-API/Reference/).
	* Documentation added for usage of the [Intelligent Metadata Layer via the REST API]({{ site.baseurl }}/APIs/REST-API/Reference/iml/).
	* Documentation added for [resolving vault structural element aliases to IDs]({{ site.baseurl }}/APIs/REST-API/Reference/resources/structure/itemidbyalias/).

### July 2018

* Vault Application Framework 2.0
	* Samples added [showing integration to the M-Files Admin configurations area]({{ site.baseurl }}/Samples-And-Libraries/Samples/Vault-Application-Framework/).

### June 2018

* Vault Application Framework 2.0
	* Removed references to the VAF 2.0 being pre-release.
	* Added page on using the [VAF 2.0 Visual Studio template package]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Visual-Studio/VAF2.0/).
* [Intelligent Metadata Layer]({{ site.baseurl }}/Intelligent-Metadata-Layer/) section created
	* Initial introductory content to IML components such as External Repository Connectors and Intelligence Services.
	* Added details on building [External Repository Connectors]({{ site.baseurl }}/Intelligent-Metadata-Layer/External-Repository-Connectors/Visual-Studio/) using the provided template.
	* Added details on building [Intelligence Services]({{ site.baseurl }}/Intelligent-Metadata-Layer/Intelligence-Services/Visual-Studio/) using the provided template.
* User Interface Extensibility Framework
	* Added page on using the [UIX Visual Studio template package]({{ site.baseurl }}/Frameworks/User-Interface-Extensibility-Framework/Visual-Studio/).

### May 2018

* Vault Application Framework 2.0 configuration
	* Updated [configuration sample]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Configuration/) to show how to use default values.
* General
	* Updated [Client to Server Communication](/{{ site.baseurl }}Samples-And-Libraries/Samples/Processes/Client-To-Server-Communication/) sample to show explicitly the method for installation of the UIX application from within `InitializeApplication`.

### April 2018

* General
	* Renamed `Concepts` page to [Getting Started]({{ site.baseurl }}/Getting-Started/), and populated content to help developers get started with M-Files terminology and structures.
	* Added a cookie dialog stating what we use cookies for.  This dialog needs to be accepted once by new users.
* COM API
	* Examples shown for managing objects:
		* [Creating objects with the COM API]({{ site.baseurl }}/APIs/COM-API/Creating-Objects/)
		* [Updating objects with the COM API]({{ site.baseurl }}/APIs/COM-API/Updating-Objects/)
		* [Deleting and destroying objects with the COM API]({{ site.baseurl }}/APIs/COM-API/Deleting-Objects/)
* REST API
	* Examples shown for managing objects:
		* [Creating objects with the REST API]({{ site.baseurl }}/APIs/REST-API/Creating-Objects/)
		* [Updating objects with the REST API]({{ site.baseurl }}/APIs/REST-API/Updating-Objects/)
		* [Deleting and destroying objects with the REST API]({{ site.baseurl }}/APIs/REST-API/Deleting-Objects/)
	* Added section on [maximising compatibility]({{ site.baseurl }}/APIs/REST-API/#iis-compatibility) when using the M-Files Web Service.
* Vault Application Framework 2.0 configuration
	* Added an example of [showing and hiding configuration options]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Configuration/Showing-And-Hiding/) based on other configuration options (e.g. "Show Advanced Configuration").
	* Added an example of [how to customise how array element names are displayed]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Configuration/Hierarchical-Configuration/#customising-array-element-names).

### March 2018

* General
	* Added process [sample to show how to maintain the original template used to create a document]({{ site.baseurl }}/Samples-And-Libraries/Samples/Processes/Maintaining-Original-Template/).
	* Added details on how to create an [Attach to VAF Processes button]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Visual-Studio/Attach-To-Processes/).
* REST API
	* Updated [code sample for retrieving cookies for authentication](/APIs/REST-API/Authentication/#cookie-based-sessions) to correctly instantiate the CookieContainer.
* UX/Design
	* Updated icons with March release.

### February 2018

* UX/Design guidance
	* Added [UX/Design guidance]({{ site.baseurl}}/UX-Design/) section to the developer portal.

### January 2018

* Built-in
	* Added a page explaining [internal and external IDs]({{ site.baseurl }}/Getting-Started/Vault-Structure/InternalAndExternalIDs/).
* COM API
	* Added in a search condition sample for [finding objects with specific flags (e.g. conflict objects)]({{ site.baseurl }}/APIs/COM-API/Searching/SearchConditions/#restricting-by-object-flags-eg-searching-for-conflict-objects).
	* Added in a page detailing how to [search for value list items by name, deleted status and owner]({{ site.baseurl }}/APIs/COM-API/Searching/ValueListItems/).
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
	* Added information on the [Vault Application Framework Code Snippets]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Visual-Studio/Code-Snippets/), including how to get them and use them
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
