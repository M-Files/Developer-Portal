---
layout: page
title: Helper Utilities in the Vault Application Framework
includeInSearch: true
breadcrumb: Helpers
---

## Version 2.0

The helper functions available in the VAF 1.0 are also available in VAF 2.0.
{:.note}

### MFFileHelper

[MFFileHelper]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Helpers/MFFileHelper/) is contained in the `MFiles.VAF.Common` namespace and provides utility methods for file handling.

### UrlHelper

[UrlHelper]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Helpers/UrlHelper/) is contained in the `MFiles.VAF.Common` namespace and provides common utility methods for generating URLs to M-Files content.

## Version 1.0

### MFSearchBuilder

[MFSearchBuilder]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Helpers/MFSearchBuilder/) is contained in the `MFiles.VAF.Common` namespace and is used to execute searches against the vault.

More information on [MFSearchBuilder is available here]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Helpers/MFSearchBuilder/).

### ObjVerEx

[ObjVerEx]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Helpers/ObjVerEx/) is contained in the `MFiles.VAF.Common` namespace and is returned by [MFSearchBuilder's FindEx and FindOneEx methods]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Searching/) and provides helper methods for working with an object, its properties and history.

More information on [ObjVerEx is available here]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Helpers/ObjVerEx/).

### MFUtils

`MFUtils` is contained in the `MFiles.VAF.Common` namespace and provides common utility methods for M-Files operations.

More information on [MFUtils is available here]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Helpers/MFUtils/).

### SysUtils

`SysUtils` is contained in the `MFiles.VAF.Common` namespace and provides common utility methods for system operations.

More information on [SysUtils is available here]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Helpers/SysUtils/).

### MFPropertyValuesBuilder

`MFPropertyValuesBuilder` is contained in the `MFiles.VAF.Common` namespace and provides helper methods for building up a collection of [PropertyValues](https://www.m-files.com/api/documentation/index.html#MFilesAPI~PropertyValues.html).

More information on [MFPropertyValuesBuilder is available here]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Helpers/MFPropertyValuesBuilder/).

### ObjVerChanges

`ObjVerChanges` is contained in the `MFiles.VAF.Common` namespace and provides information on metadata changes between two versions of an object.

More information on [ObjVerChanges is available here]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Helpers/ObjVerChanges/).