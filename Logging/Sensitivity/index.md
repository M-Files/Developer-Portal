---
layout: page
title: Log Sensitivity
includeInSearch: true
breadcrumb: Log Sensitivity
prerelease: true
---

Log sensitivity filters work by allowing developers to pass structured objects into the logging framework, and for the logging framework to decide how to render that content appropriately.  **Logging sensitivity filters do not attempt to parse log strings to remove information.**  It is imperative that application developers implement logging as described below for the logging sensitivity filters to correctly work.  It is strongly recommended that you test that your log messages are correctly being filtered before deploying any application.
{:.note}

Logs may, by their nature, contain information which may have privacy or commercial sensitivities; imagine situations where a log is being generated about a file that's being converted to PDF, and the log includes a file named `Upcoming Redundancies.docx`.  The logging framework supports this concept by allowing each log to be allocated a `Sensitivity Level`.  This sensitivity level describes how some information should be logged within the vault.

Each target can have its sensitivity set to one of three levels: `Minimum sensitivity` (default), `Maximum sensitivity`, or `Custom`.  If `Custom` is selected then the user can choose which flags should be passed to the sensitivity filter:

![Setting custom target sensitivity levels](sensitivity-custom.png)

When a log message is written to disk, it is passed through a `sensitivity filter`.  This filter will look at the arguments being rendered into the string, along with the target sensitivity level, and choose how the value should be rendered.  Consider this code:

```csharp
// Use the $"" syntax to create a FormattableString.
// Note that we are passing the ObjVerEx instance, not the title!
this.Logger?.Trace($"Starting conversion of {env.ObjVerEx} to PDF...");
```

The resulting log message would depend on the sensitity level:
`Starting conversion of 'hello world.docx (0-123-1)'` (if the sensitivity level allows document titles to be shown)
`Starting conversion of (0-123-1)` (if the sensitivity level does not allow document titles to be shown)

## Supported logging syntaxes for log sensitivity

The following syntaxes are supported for log sensitivity:

```csharp
// Using the FormattableString approach.
this.Logger?.Trace($"My message {myObjectVersion}");
```

```csharp
// Using the string-with-arguments approach.
// Note: you must have the following using statement for this to work!
// using MFiles.VaultApplications.Logging;
this.Logger?.Trace("My message {0}", myObjectVersion);
```

## Unsupported logging syntaxes

These logging syntaxes produce simple strings and will not be filtered.  It is advised that you avoid these syntaxes.
{:.note.warning}

```csharp
// Contatenating strings.
this.Logger?.Trace("My message " + myObjectVersion.Title); // DO NOT DO THIS!

// Explicitly using string.format
this.Logger?.Trace(string.format("My message {0}", myObjectVersion)); // DO NOT DO THIS!
this.Logger?.Trace(string.format("My message {0}", myObjectVersion.Title)); // DO NOT DO THIS!

// Using a formattable string, but passing the title directly
this.Logger?.Trace($"My message {myObjectVersion.Title}"); // DO NOT DO THIS!
```

## Custom log sensitivity filters

The logging library contains built-in sensitivity filters for `ObjectVersion`, `ObjectVersionAndProperties`, and `PropertyValue`.  The VAF Extensions library contains a built-in sensitivity filter for `ObjVerEx`.

To create a custom log sensitivity filter:

1. Create a class that inherits from  `MFiles.VaultApplications.Logging.Sensitivity.LogSensitivityFilterBase<TType>` (where `TType` is the type that your filter handles).
2. The system can only cope with a single filter being registered for any given type.  If you are looking to override a built-in sensitivity filter (e.g. to add your own for `ObjectVersion`), then:
	1. Add the [DoNotAutomaticallyRegister] attribute to your class to stop the system automatically finding and registering it.
	2. After the log manager is initialized, call `LogSensitivityFilterFactory.Default.Register`, passing an instance of the log sensitivity filter and ensuring that `overwriteExistingRegistrations` is true.