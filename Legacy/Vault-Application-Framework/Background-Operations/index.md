---
layout: page
title: Running Background Operations using the Vault Application Framework
includeInSearch: true
breadcrumb: Background Operations
redirect_from: /Frameworks/Vault-Application-Framework/Background-Operations/
legacy: true
latest_version: /Frameworks/Vault-Application-Framework/Multi-Server-Mode/
---

Most operations within M-Files are blocking (or synchronous): they must complete prior to the overall operation completing.  For example: a workflow state action script must complete before the object "save" operation is complete.  This can cause the user interface to "lock" whilst the scripts execute, and can provide a bad user experience.  Whilst this is sometimes required (e.g. processing a state pre-condition to ensure that the object can be moved to that state), other long-running processes can move to asynchronous execution, providing a better user experience.

Background Operations provide developers with the means to execute code in an asynchronous manner, either on-demand or after a set period of time.  Examples of good uses of background operations are to process long-running file operations (e.g. conversion to PDF), or interactions with external systems (e.g. web services) that may introduce significant latency.

## Executing an operation after a time period

The following method is adapted from the [Visual Studio Template]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Visual-Studio/):

```csharp
/// <summary>
/// The method, that is run when the vault goes online.
/// </summary>
protected override void StartApplication()
{
	// Start writing content to the event log every ten seconds.
	// The background operation will continue until the vault goes offline.
	this.BackgroundOperations.StartRecurringBackgroundOperation("Recurring Hello World Operation",
        TimeSpan.FromSeconds(10), () =>
		{
			// Report extension method output to event log.
			SysUtils.ReportInfoToEventLog("hello world");
		});
}
```

## Executing a background operation on-demand

Alternatively, a background operation to perform a long-running task could be started by a state action.  Note that the state action will not wait for the task to complete, so the UI will not be locked.

```csharp
/// <summary>
/// The background operation for converting to PDF.
/// </summary>
private BackgroundOperation convertToPdfBackgroundOperation;

/// <summary>
/// The method, that is run when the vault goes online.
/// </summary>
protected override void StartApplication()
{
	// The background operation will continue until the vault goes offline.
	this.convertToPdfBackgroundOperation = this.BackgroundOperations
        .CreateBackgroundOperation("Conversion to PDF", () =>
            {
                // TODO: Search for all items in the vault that need conversion to PDF.
                // TODO: Convert them.
                // TODO: Move them on in the workflow?
            });

	// Run the background operation once now.
	this.convertToPdfBackgroundOperation.RunOnce();
}

[StateAction("MFiles.StateAction.ConvertToPdfWorkflow.ConvertToPdf")]
public void ConvertToPdf(StateEnvironment env)
{
	// Start the background operation.
	this.convertToPdfBackgroundOperation.RunOnce();
}
```

If using this approach, consider whether the object should be able to be edited by others whilst it is awaiting PDF conversion.  If it should not then ensure that the permissions on the object are altered appropriately as part of the workflow.
{:.note}