---
layout: page
title: COM API Library
includeInSearch: true
breadcrumb: COM API
---

Please note that these samples and libraries are provided "as-is" and with no warranty, explicit or otherwise. You should ensure that the functionality of these libraries meet your requirements, and thoroughly test them, prior to using in any production scenarios.  The items linked below are designed as teaching tools and may not be fully complete.
{:.note.warning}

All M-Files Samples and Libraries are available in our [public GitHub repositories](https://github.com/m-files/MFilesSamplesAndLibraries/).  Further samples and libraries will be added in response to partner feedback.

## COM API Extension Methods (.NET)

This library provides helper and extension methods to more easily work with the M-Files API from a .NET environment.  Specifically, the library contains:

* Helper objects and extension methods to aid connecting to (and disconnecting from) a server, when using the [MFServerApplication](https://www.m-files.com/api/documentation/index.html#MFilesAPI~MFilesServerApplication.html) mode:
    * `AuthenticationDetails` - used to collate the authentication details for a specific server into an object, rather than providing strings as part of the connection.  Provides static methods to create valid instances representing various common authentication modes (e.g. current Windows user).
    * `ConnectionType` - an enumeration of the connection type, rather than providing [ProtocolSequence strings](https://www.m-files.com/api/documentation/index.html#MFilesAPI~MFilesServerApplication~Connect.html).
    * `ServerDetails` - used to collate the server details of a specific server, rather than providing strings as part of the connection.  Provides static methods to create valid instances representing common server connections (e.g. a server by TCP/IP).
    * `ConnectionDetails` - used to collate `ServerDetails`, `AuthenticationDetails` and other optional connection parameters, and to connect to the server.
    * `IMFilesServerApplicationExtensionMethods` - helper methods to connect and disconnect from a server/vault.
* Extension methods to aid creation of [SearchCondition](https://www.m-files.com/api/documentation/index.html#MFilesAPI~SearchCondition.html) objects, and searching against a given vault:
    * `AddNotDeletedSearchCondition` - adds a "not deleted" search condition to the given [SearchConditions collection](https://www.m-files.com/api/documentation/index.html#MFilesAPI~SearchConditions.html).
    * `AddObjectTypeSearchCondition` - adds a search condition restricting the results to a single object type.
    * `AddMinimumObjectIdSearchCondition` - used in combination with `AddObjectIdSegmentSearchCondition` to execute a [segmented search](https://github.com/M-Files/MFilesSamplesAndLibraries/tree/master/Samples/COM%20API/SegmentedSearch).
    * `AddObjectIdSegmentSearchCondition` used in combination with `AddMinimumObjectIdSearchCondition` to execute a [segmented search](https://github.com/M-Files/MFilesSamplesAndLibraries/tree/master/Samples/COM%20API/SegmentedSearch).
    * `AddDisplayIdSearchCondition` - adds a search condition restricting the results to an object with a specific external / display id.
    * `AddFullTextSearchCondition` - adds a search condition executing a full-text search for a given text string.  Can be restricted to search in metadata, file data, or both (default).

More details and examples are available [in the GitHub repository](https://github.com/M-Files/MFilesSamplesAndLibraries/tree/master/Libraries/MFaaP.MFilesAPI#readme).
{:.note}