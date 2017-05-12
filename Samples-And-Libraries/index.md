---
layout: page
title: Samples and Libraries
---

<p class="note warning">Please note that these samples and libraries are provided "as-is" and with no warranty, explicit or otherwise. You should ensure that the functionality of these libraries meet your requirements, and thoroughly test them, prior to using in any production scenarios.  The items linked below are designed as teaching tools and may not be fully complete.</p>

All M-Files Samples and Libraries are available in our [public GitHub repositories](https://github.com/m-files/).  Further samples and libraries will be added in response to partner feedback.

## Libraries

### COM API Extension Methods (.NET)

This library provides helper and extension methods to more easily work with the M-Files API from a .NET environment.  Specifically, the library contains:

* Helper objects and extension methods to aid connecting to (and disconnecting from) a server, when using the [MFServerApplication](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~MFilesServerApplication.html) mode:
    * `AuthenticationDetails` - used to collate the authentication details for a specific server into an object, rather than providing strings as part of the connection.  Provides static methods to create valid instances representing various common authentication modes (e.g. current Windows user).
    * `ConnectionType` - an enumeration of the connection type, rather than providing [ProtocolSequence strings](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~MFilesServerApplication~Connect.html).
    * `ServerDetails` - used to collate the server details of a specific server, rather than providing strings as part of the connection.  Provides static methods to create valid instances representing common server connections (e.g. a server by TCP/IP).
    * `ConnectionDetails` - used to collate `ServerDetails`, `AuthenticationDetails` and other optional connection parameters, and to connect to the server.
    * `IMFilesServerApplicationExtensionMethods` - helper methods to connect and disconnect from a server/vault.
* Extension methods to aid creation of [SearchCondition](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~SearchCondition.html) objects, and searching against a given vault:
    * `AddNotDeletedSearchCondition` - adds a "not deleted" search condition to the given [SearchConditions collection](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~SearchConditions.html).
    * `AddObjectTypeSearchCondition` - adds a search condition restricting the results to a single object type.
    * `AddMinimumObjectIdSearchCondition` - used in combination with `AddObjectIdSegmentSearchCondition` to execute a [segmented search](https://github.com/M-Files/MFilesSamplesAndLibraries/tree/master/Samples/SegmentedSearch).
    * `AddObjectIdSegmentSearchCondition` used in combination with `AddMinimumObjectIdSearchCondition` to execute a [segmented search](https://github.com/M-Files/MFilesSamplesAndLibraries/tree/master/Samples/SegmentedSearch).
    * `AddDisplayIdSearchCondition` - adds a search condition restricting the results to an object with a specific external / display id.
    * `AddFullTextSearchCondition` - adds a search condition executing a full-text search for a given text string.  Can be restricted to search in metadata, file data, or both (default).

<p class="note">More details and examples are available <a href="https://github.com/M-Files/MFilesSamplesAndLibraries/tree/master/Libraries/MFaaP.MFilesAPI#readme">in in the GitHub repository</a>.</p>

### REST API Wrapper (.NET)

This library aims to provide an easy-to-use .NET wrapper for the [M-Files Web Service]({{ site.baseurl }}/APIs/REST-API/), which is part of the [M-Files Web Access](http://www.m-files.com/user-guide/latest/eng/#Configure_M-Files_Web_Access.html).  It currently provides the following functionality:

* Authentication (using M-Files or Windows credentials, or using Single Sign On).
* File upload and object creation.
* Searching.
* Vault Extension Method execution.
* Retrieval of object types, value lists, and value list items from the vault.

The library contains a set of basic unit tests, which will be expanded as the library progresses.

<p class="note">More details and examples are available <a href="https://github.com/M-Files/MFilesSamplesAndLibraries/tree/master/Libraries/MFaaP.MFWSClient#readme">in in the GitHub repository</a>.</p>

## Samples

M-Files has published a number of public samples within our [MFilesSamplesAndLibraries GitHub repository](https://github.com/M-Files/MFilesSamplesAndLibraries/tree/master/Samples#readme).  These focus on achieving specific tasks using our public APIs or Frameworks:

### M-Files API

##### [Search by Display Id](https://github.com/M-Files/MFilesSamplesAndLibraries/tree/master/Samples/SearchByDisplayId#readme)

An example of how to search using the "display id" (or "external id") of an object when using [External Object Type Data Sources]({{ site.baseurl }}/Built-In/External-Object-Type-Data-Source/).

##### [Segmented Search](https://github.com/M-Files/MFilesSamplesAndLibraries/tree/master/Samples/SegmentedSearch#readme)

Searches executed using [SearchForObjectsbyConditions](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI%7EVaultObjectSearchOperations%7ESearchForObjectsByConditions.html) or [SearchForObjectsByConditionsEx](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI%7EVaultObjectSearchOperations%7ESearchForObjectsByConditionsEx.html) are limited in the number of items that are returned, even if a maximum timeout is specified.  This sample executes a number of separate searches instead, separating the objects into "chunks" by their internal ID (e.g. searching for items with ID 1-999 first, then for items with ID 1000-1999, onwards).

<p class="note">Segmented searching is an operation that can take significant time, and involves multiple API calls to the server.  Whilst there are valid scenarios where enumerating large volumes of data from M-Files is required, this approach should be used sparingly.</p>

### M-Files Web Service (REST API)

#### .NET

The following .NET (typically v4.5) samples are available.  Please note that these focus on maintaining functionality with the latest versions of Visual Studio and M-Files, and may require additional work to work on previous versions of software.

##### [MFWSCheckOutStatus](https://github.com/M-Files/MFilesSamplesAndLibraries/tree/master/Samples/MFWSCheckOutStatus#readme)

An example of retrieving the [checkout status of an object](http://www.m-files.com/mfws/resources/objects/type/objectid/version/checkedout.html) .

##### [MFWSDownloading](https://github.com/M-Files/MFilesSamplesAndLibraries/tree/master/Samples/MFWSDownloading#readme)

An example of [searching for](http://www.m-files.com/mfws/resources/objects.html), then [downloading](http://www.m-files.com/mfws/resources/objects/type/objectid/version/files/file/content.html), files from the M-Files Web Service.

##### [MFWSSearching](https://github.com/M-Files/MFilesSamplesAndLibraries/tree/master/Samples/MFWSSearching#readme)

An example of using the [search endpoint](http://www.m-files.com/mfws/resources/objects.html) to search for objects within a Vault.  Further details an examples are included in the [readme file](https://github.com/M-Files/MFilesSamplesAndLibraries/tree/master/Samples/MFWSSearching).

##### [MFWSVaultStructure](https://github.com/M-Files/MFilesSamplesAndLibraries/tree/master/Samples/MFWSVaultStructure#readme)

A console application that shows how to enumerate the vault structure using the M-Files Web Service.

##### [MFWSViewNavigation](https://github.com/M-Files/MFilesSamplesAndLibraries/tree/master/Samples/MFWSViewNavigation#readme)

A console application that shows how to enumerate the vault contents by navigating the view structures using the M-Files Web Service.

<p class="note">We aim to provide examples of achieving the listed functionality using both the <a href="https://github.com/M-Files/MFilesSamplesAndLibraries/tree/master/Libraries/MFaaP.MFWSClient#readme">REST API Wrapper</a> and a base implementation using HttpClient.</p>

### Vault Application Framework

##### [Event Tracing](https://github.com/M-Files/MFilesSamplesAndLibraries/tree/master/Samples/EventTracing#readme)

A [Vault Application Framework]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/) application that automatically hooks into various Vault Application Framework lifecycle events and vault events and logs when they occur into the Windows Event Log.  Can be used to identify which vault events occur in various situations.

##### [Chain Workflows](https://github.com/M-Files/MFilesSamplesAndLibraries/tree/master/Samples/ChainWorkflows#readme)

An example (available as both a [Vault Application Framework]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/) application, and a [VBScript]({{ site.baseurl }}/Built-In/VBScript/) implementation) that shows how to move an object from one workflow to another once it reaches a specific state in a workflow.
