---
layout: page
title: REST API Samples
includeInSearch: true
breadcrumb: REST API
---

<p class="note warning">Please note that these samples and libraries are provided "as-is" and with no warranty, explicit or otherwise. You should ensure that the functionality of these libraries meet your requirements, and thoroughly test them, prior to using in any production scenarios.  The items linked below are designed as teaching tools and may not be fully complete.</p>

M-Files has published a number of public samples within our [MFilesSamplesAndLibraries GitHub repository](https://github.com/M-Files/MFilesSamplesAndLibraries/tree/master/Samples#readme), which focus on achieving specific tasks using our public APIs or Frameworks.

## .NET

The following .NET (typically v4.5) samples are available.  Please note that these focus on maintaining functionality with the latest versions of Visual Studio and M-Files, and may require additional work to work on previous versions of software.

### [MFWSCheckOutStatus](https://github.com/M-Files/MFilesSamplesAndLibraries/tree/master/Samples/MFWSCheckOutStatus#readme)

An example of retrieving the [checkout status of an object](http://www.m-files.com/mfws/resources/objects/type/objectid/version/checkedout.html) .

### [MFWSDownloading](https://github.com/M-Files/MFilesSamplesAndLibraries/tree/master/Samples/MFWSDownloading#readme)

An example of [searching for](http://www.m-files.com/mfws/resources/objects.html), then [downloading](http://www.m-files.com/mfws/resources/objects/type/objectid/version/files/file/content.html), files from the M-Files Web Service.

### [MFWSSearching](https://github.com/M-Files/MFilesSamplesAndLibraries/tree/master/Samples/MFWSSearching#readme)

An example of using the [search endpoint](http://www.m-files.com/mfws/resources/objects.html) to search for objects within a Vault.  Further details an examples are included in the [readme file](https://github.com/M-Files/MFilesSamplesAndLibraries/tree/master/Samples/MFWSSearching).

### [MFWSVaultStructure](https://github.com/M-Files/MFilesSamplesAndLibraries/tree/master/Samples/MFWSVaultStructure#readme)

A console application that shows how to enumerate the vault structure using the M-Files Web Service.

### [MFWSViewNavigation](https://github.com/M-Files/MFilesSamplesAndLibraries/tree/master/Samples/MFWSViewNavigation#readme)

A console application that shows how to enumerate the vault contents by navigating the view structures using the M-Files Web Service.

<p class="note">We aim to provide examples of achieving the listed functionality using both the <a href="https://github.com/M-Files/MFilesSamplesAndLibraries/tree/master/Libraries/MFaaP.MFWSClient#readme">REST API Wrapper</a> and a base implementation using HttpClient.</p>
