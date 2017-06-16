---
layout: page
title: The SysUtils class in the Vault Application Framework
includeInSearch: true
breadcrumb: SysUtils
---

`SysUtils` is contained in the `MFiles.VAF.Common` namespace and provides common utility methods for system operations.

## Temporary file management

There are a number of methods available to interact with temporary files:

* `CreateTempFolder` - creates a new randomly-named temporary folder inside the system temporary path.
* `DeleteFromDisk` - deletes a file or folder from disk.  If the provided path is a folder, all files and sub-folders are also deleted.
* `GetTempFileName` - creates a temporary file name with the given extension.

## Event log reporting

There are a number of methods available to make interacting with the event log simpler:

* `ReportToEventLog` - reports the supplied message to the event log.
* `ReportInfoToEventLog` - reports the supplied message to the event log as an informational message.
* `ReportWarningToEventLog` - reports the supplied message to the event log as a warning.
* `ReportErrorToEventLog` - reports the supplied message to the event log as an error.
* `ReportErrorMessageToEventLog` - reports the exception to the Windows Event Log, with a supplied prefix message.
