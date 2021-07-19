---
layout: page
title: Task queues in Multi-Server Mode Vault Application Framework applications
includeInSearch: true
breadcrumb: Task queues
---

The approach shown below is only compatible with version 2.3 (and higher) of the Vault Application Framework, where the target audience runs M-Files Online 20.5 or higher.
{:.note.warning}

Task queues should be used in place of background operations when targeting Multi-Server Mode.  This ensures that the operations are correctly processed when multiple M-Files servers may be connected to a vault.

The VAF Extensions library contains various [helper methods working with task queues](https://github.com/M-Files/VAF.Extensions.Community/tree/master/MFiles.VAF.Extensions#using-vaf-23-task-processors).  These include methods for recurring tasks that should be run [on a schedule](https://github.com/M-Files/VAF.Extensions.Community/tree/master/MFiles.VAF.Extensions#automatically-running-task-processors) or [after an interval](https://github.com/M-Files/VAF.Extensions.Community/tree/master/MFiles.VAF.Extensions#after-a-time-interval).
{:.note}

## Task queue types

Before creating a task queue, you must decide which type of queue is most appropriate for your situation: sequential, concurrent, or broadcast.

### Sequential task queues

Tasks added to a [sequential task queue](Sequential) will be processed in the order in which they were added; if tasks 1, 2, then 3 are added to the queue then the tasks will be processed one at a time and the processing order is guaranteed to be 1, 2, 3.

### Concurrent task queues

Tasks added to a [concurrent task queue](Concurrent) can be assigned to any server in the availability group, may be processed concurrently, and without regard for the order in which they were added to the queue.

### Broadcast task queues

[Broadcast task queues](Broadcast) are used to broadcast information generated in one M-Files server to all others in the availability group.  This can be used to send commands for other servers to update any cached information they may have, for example.

## Migration of background processes to a recurring task

The concept of a background operation is more awkward in situations where more than one M-Files server is involved.  As a Vault Application Framework background operation is simply a .NET `Task`, and vault actions performed by the background operation are typically run outside of a transaction, it is fairly easy for background operations to cause unexpected side-effects within the vault.

To resolve this, a [recurring task](../Recurring-Tasks) should be used instead.

By default task processing that uses the approach described on these pages will operate within a transaction, so must complete within 90 seconds.  This is different to historic approaches where the task processing executed outside of a transaction.  Long-running processes should be split into smaller processes that can run within the alloted time period.  Where this cannot be done, the [transaction mode](#long-running-tasks) can be changed.  *This does not affect [background operations]({{ site.baseurl }}/Legacy/Vault-Application-Framework/Background-Operations), or tasks using the [VAF 2.2 approach]({{ site.baseurl }}/Legacy/Vault-Application-Framework/VAF2.2/Multi-Server-Mode) that are using the VAF 2.3 runtime (although both of these should be removed during upgrades).*
{:.note.warning}

## Reporting task status

It's important that tasks periodically report their status back to the system.  This can be done by calling `ITaskProcessingJob<T>.UpdateTaskInfo`, providing the current task's state and any textual remarks (e.g. the percentage complete):

```csharp
[TaskProcessor(QueueId, TaskType)]
public void ProcessObjectHandler(ITaskProcessingJob<TaskDirective> job)
{
	for(var i=1; i<=100, i++)
	{
		job.Update
		(
			percentComplete: i,
			details: $"Processing object {i} / 100"
		);
		// TODO: Process the object.
	}
	job.Update
		(
			percentComplete: 100,
			details: $"Completed"
		);
}
```

The progress should be reported back as frequently as possible, but the system will only push changes back to the vault every 10 seconds or when the task completes.
{:.note}

## Handling exceptions

## Long-running tasks