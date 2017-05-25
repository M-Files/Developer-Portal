---
layout: page
title: Helper Utilities
includeInSearch: true
---

## Overview

## MFSearchBuilder

[MFSearchBuilder]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Helpers/MFSearchBuilder/) is contained in the `MFiles.VAF.Common` namespace and is used to execute searches against the vault.  More information on [MFSearchBuilder is available here]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Helpers/MFSearchBuilder/).

## ObjVerEx

[ObjVerEx]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Helpers/ObjVerEx/) is contained in the `MFiles.VAF.Common` namespace and is returned by [MFSearchBuilder's FindEx and FindOneEx methods]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Searching/) and provides helper methods for working with an object, its properties and history.  More information on [ObjVerEx is available here]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Helpers/ObjVerEx/).

## MFUtils

`MFUtils` is contained in the `MFiles.VAF.Common` namespace and provides common utility methods for M-Files operations.

### Datetime calculations

`AddWeekdays` adds a number of business days to a given start date, skipping Saturday and Sunday.

```csharp
var startDate = DateTime.Now();
var deadlineDate = MFUtils.AddWeekDays(startDate, 20);
```

<p class="note">This method assumes that Saturday and Sunday are not working days, and makes no attempt to deal with other non-working days such as national holidays.</p>

### Transaction variables

There are a number of methods available to work with transaction variables (i.e. variables held within [Named Value Storage](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~VaultNamedValueStorageOperations.html)):

* `SetTransactionVariable` - sets a value within named value storage.
* `TryGetTransactionVariable` - attempts to retrieve a value from named value storage and returns `true` if it was successful.
* `ClearTransactionVariable` - removes a value from named value storage.
* `GetTransactionVariables` - retrieves all values from a specified name value storage namespace.

### Exception parsing

There are a number of methods available to parse exceptions returned by M-Files, allowing code to react accordingly:

* `IsAlreadyCheckedOutError` - returns true if the passed exception is an "already checked out" error.
* `IsMFilesAccessDeniedError` - returns true if the exception is an "access denied" error.
* `IsMFilesAlreadyExistsError` - returns true if the exception is an "already exists" error.
* `IsMFilesNotFoundError` - returns true if the exception is a "not found" error.
* `IsMFilesObjectLockedError` - returns true if the exception is an "object locked" error.
* `IsRetryableMFilesLockError` - returns true if the exception thrown was transient.  If true, re-trying the operation may succeed.

## SysUtils

`SysUtils` is contained in the `MFiles.VAF.Common` namespace and provides common utility methods for system operations.

### Temporary file management

There are a number of methods available to interact with temporary files:

* `CreateTempFolder` - creates a new randomly-named temporary folder inside the system temporary path.
* `DeleteFromDisk` - deletes a file or folder from disk.  If the provided path is a folder, all files and sub-folders are also deleted.
* `GetTempFileName` - creates a temporary file name with the given extension.

### Event log reporting

There are a number of methods available to make interacting with the event log simpler:

* `ReportToEventLog` - reports the supplied message to the event log.
* `ReportInfoToEventLog` - reports the supplied message to the event log as an informational message.
* `ReportWarningToEventLog` - reports the supplied message to the event log as a warning.
* `ReportErrorToEventLog` - reports the supplied message to the event log as an error.
* `ReportErrorMessageToEventLog` - reports the exception to the Windows Event Log, with a supplied prefix message.

