---
layout: page
title: Task queues in Multi-Server Mode Vault Application Framework applications
includeInSearch: true
breadcrumb: Task queues
legacy: true
latest_version: /Frameworks/Vault-Application-Framework/Multi-Server-Mode/Task-Queues/
requiredVaultApplicationFrameworkVersion: 2.2
---

Task queues should be used in place of background operations when targeting Multi-Server Mode.  This ensures that the operations are correctly processed when multiple M-Files servers may be connected to a vault.

The VAF Extensions library contains various [helper methods for creating task queues](https://github.com/M-Files/VAF.Extensions.Community/tree/master/MFiles.VAF.Extensions/MultiServerMode).
{:.note}

## Task queue types

Before creating a task queue, you must decide which type of queue is most appropriate for your situation: sequential, concurrent, or broadcast.

### Sequential task queues

Tasks added to a [sequential task queue](Sequential) will be processed in the order in which they were added; if tasks 1, 2, then 3 are added to the queue then the tasks will be processed one at a time and the processing order is guaranteed to be 1, 2, 3.

### Concurrent task queues

Tasks added to a [concurrent task queue](Concurrent) can be assigned to any number of M-Files servers in the Multi-Server Mode configuration, may be processed concurrently, and without regard for the order in which they were added to the queue.

### Broadcast task queues

[Broadcast task queues](Broadcast) are used to broadcast information generated in one M-Files server to all others in the Multi-Server Mode configuration.  This can be used to send commands for other servers to update any cached information they may have, for example.

## Migration of background processes to a recurring task

The concept of a background operation is more awkward in situations where more than one M-Files server is involved.  As a Vault Application Framework background operation is simply a .NET `Task`, and vault actions performed by the background operation are typically run outside of a transaction, it is fairly easy for background operations to cause unexpected side-effects within the vault.

To resolve this, a [recurring task](../Recurring-Tasks) should be used instead.

## Reporting task status

It's important that long-running tasks periodically report their status back to the system.  This can be done by calling `TaskProcessorBase<T>.UpdateTaskInfo`, providing the current task's state and any textual remarks (e.g. the percentage complete):

```csharp
this.SequentialProcessor.UpdateTaskInfo
(
	job,
	MFTaskState.MFTaskStateInProgress,
	$"The process is {percentageComplete}% complete.",
	false
);
```

The progress can be reported back as frequently as makes sense, but it is recommended that long-running tasks report their status at least every 30 seconds.
{:.note}
