---
layout: page
title: The MFFileHelper class in the Vault Application Framework
includeInSearch: true
breadcrumb: MFFileHelper
---

`MFFileHelper` is contained in the `MFiles.VAF.Common` namespace and provides utility methods for file handling.

* `DeleteSourceFiles` - removes all (local) files referenced by a given [SourceObjectFiles](https://developer.m-files.com/APIs/COM-API/Reference/index.html#MFilesAPI~SourceObjectFiles.html) collection.

* `ObjectFilesToSourceFiles` - downloads all requested files from the server and places them into a [SourceObjectfiles](https://developer.m-files.com/APIs/COM-API/Reference/index.html#MFilesAPI~SourceObjectFiles.html) collection.