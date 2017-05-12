---
layout: page
title: Samples and Libraries
---

<p class="note warning">Please note that these samples and libraries are provided "as-is" and with no warranty, explicit or otherwise. You should ensure that the functionality of these libraries meet your requirements, and thoroughly test them, prior to using in any production scenarios.  The items linked below are designed as teaching tools and may not be fully complete.</p>

All M-Files Samples and Libraries are available in our [public GitHub repositories](https://github.com/m-files/).  Further samples and libraries will be added in response to partner feedback.

## Libraries

### COM API Extension Methods (.NET)

This library provides helper and extension methods to more easily work with the M-Files API from a .NET environment.

<p class="note">This library is available <a href="https://github.com/M-Files/MFilesSamplesAndLibraries/tree/master/Libraries/MFaaP.MFilesAPI">in our MFSamplesAndLibraries GitHub repository</a>.</p>

### REST API Wrapper (.NET)

This library aims to provide an easy-to-use .NET wrapper for the [M-Files Web Service]({{ site.baseurl }}/APIs/REST-API/), which is part of the [M-Files Web Access](http://www.m-files.com/user-guide/latest/eng/#Configure_M-Files_Web_Access.html).

<p class="note">This library is available <a href="https://github.com/M-Files/MFilesSamplesAndLibraries/tree/master/Libraries/MFaaP.MFilesAPI">in our MFSamplesAndLibraries GitHub repository</a>.</p>

## Samples

M-Files has published a number of public samples within our [MFilesSamplesAndLibraries GitHub repository](https://github.com/M-Files/MFilesSamplesAndLibraries/tree/master/Samples).  These focus on achieving specific tasks using our public APIs or Frameworks:

### M-Files API

* [Search by Display Id](https://github.com/M-Files/MFilesSamplesAndLibraries/tree/master/Samples/SearchByDisplayId)

An example of how to search using the "display id" (or "external id") of an object when using [External Object Type Data Sources]({{ site.baseurl }}/Built-In/External-Object-Type-Data-Source/).

* [Segmented Search](https://github.com/M-Files/MFilesSamplesAndLibraries/tree/master/Samples/SegmentedSearch)

Searches executed using [SearchForObjectsbyConditions](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI%7EVaultObjectSearchOperations%7ESearchForObjectsByConditions.html) or [SearchForObjectsByConditionsEx](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI%7EVaultObjectSearchOperations%7ESearchForObjectsByConditionsEx.html) are limited in the number of items that are returned, even if a maximum timeout is specified.  This sample executes a number of separate searches instead, separating the objects into "chunks" by their internal ID (e.g. searching for items with ID 1-999 first, then for items with ID 1000-1999, onwards).

<p class="note">Segmented searching is an operation that can take significant time, and involves multiple API calls to the server.  Whilst there are valid scenarios where enumerating large volumes of data from M-Files is required, this approach should be used sparingly.</p>

### M-Files Web Service (REST API)

#### .NET

The following .NET (typically v4.5) samples are available.  Please note that these focus on maintaining functionality with the latest versions of Visual Studio and M-Files, and may require additional work to work on previous versions of software.

* [MFWSCheckOutStatus](https://github.com/M-Files/MFilesSamplesAndLibraries/tree/master/Samples/MFWSCheckOutStatus)

An example of retrieving the [checkout status of an object](http://www.m-files.com/mfws/resources/objects/type/objectid/version/checkedout.html) .

* [MFWSDownloading](https://github.com/M-Files/MFilesSamplesAndLibraries/tree/master/Samples/MFWSDownloading)

An example of [searching for](http://www.m-files.com/mfws/resources/objects.html), then [downloading](http://www.m-files.com/mfws/resources/objects/type/objectid/version/files/file/content.html), files from the M-Files Web Service.

* [MFWSSearching](https://github.com/M-Files/MFilesSamplesAndLibraries/tree/master/Samples/MFWSSearching)

An example of using the [search endpoint](http://www.m-files.com/mfws/resources/objects.html) to search for objects within a Vault.  Further details an examples are included in the [readme file](https://github.com/M-Files/MFilesSamplesAndLibraries/tree/master/Samples/MFWSSearching).

* [MFWSVaultStructure](https://github.com/M-Files/MFilesSamplesAndLibraries/tree/master/Samples/MFWSVaultStructure)

A console application that shows how to enumerate the vault structure using the M-Files Web Service.

* [MFWSViewNavigation](https://github.com/M-Files/MFilesSamplesAndLibraries/tree/master/Samples/MFWSViewNavigation)

A console application that shows how to enumerate the vault contents by navigating the view structures using the M-Files Web Service.

<p class="note">We aim to provide examples of achieving the listed functionality using both the <a href="https://github.com/M-Files/MFilesSamplesAndLibraries/tree/master/Libraries/MFaaP.MFWSClient">REST API Wrapper</a> and a base implementation using HttpClient.</p>

### Vault Application Framework

* [Event Tracing](https://github.com/M-Files/MFilesSamplesAndLibraries/tree/master/Samples/EventTracing)

A Vault Application Framework application that automatically hooks into various Vault Application Framework lifecycle events and vault events and logs when they occur into the Windows Event Log.  Can be used to identify which vault events occur in various situations.

* [Chain Workflows](https://github.com/M-Files/MFilesSamplesAndLibraries/tree/master/Samples/ChainWorkflows)

An example (available as both a Vault Application Framework application, and a VBScript implementation) that shows how to move an object from one workflow to another once it reaches a specific state in a workflow.
