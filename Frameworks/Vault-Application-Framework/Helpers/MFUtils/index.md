---
layout: page
title: The MFUtils class in the Vault Application Framework
includeInSearch: true
breadcrumb: MFUtils
---

`MFUtils` is contained in the `MFiles.VAF.Common` namespace and provides common utility methods for M-Files operations.

## Datetime calculations

`AddWeekdays` adds a number of business days to a given start date, skipping Saturday and Sunday.

```csharp
var startDate = DateTime.Now();
var deadlineDate = MFUtils.AddWeekDays(startDate, 20);
```

This method assumes that Saturday and Sunday are not working days, and makes no attempt to deal with other non-working days such as national holidays.
{:.note}

## Transaction variables

There are a number of methods available to work with transaction variables (i.e. variables held within [Named Value Storage](https://developer.m-files.com/APIs/COM-API/Reference/index.html#MFilesAPI~VaultNamedValueStorageOperations.html)):

* `SetTransactionVariable` - sets a value within named value storage.
* `TryGetTransactionVariable` - attempts to retrieve a value from named value storage and returns `true` if it was successful.
* `ClearTransactionVariable` - removes a value from named value storage.
* `GetTransactionVariables` - retrieves all values from a specified name value storage namespace.

## Exception parsing

There are a number of methods available to parse exceptions returned by M-Files, allowing code to react accordingly:

* `IsAlreadyCheckedOutError` - returns true if the passed exception is an "already checked out" error.
* `IsMFilesAccessDeniedError` - returns true if the exception is an "access denied" error.
* `IsMFilesAlreadyExistsError` - returns true if the exception is an "already exists" error.
* `IsMFilesNotFoundError` - returns true if the exception is a "not found" error.
* `IsMFilesObjectLockedError` - returns true if the exception is an "object locked" error.
* `IsRetryableMFilesLockError` - returns true if the exception thrown was transient.  If true, re-trying the operation may succeed.