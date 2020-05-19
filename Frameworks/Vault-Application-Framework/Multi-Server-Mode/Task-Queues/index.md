---
layout: page
title: Task queues in Multi-Server Mode Vault Application Framework applications
includeInSearch: true
breadcrumb: Task queues
---

The approach shown below is only compatible with version 2.2(and higher) of the Vault Application Framework, where the target audience runs M-Files Online 20.5 or higher.
{:.note.warning}

Task queues should be used in place of background operations when targeting Multi-Server Mode.  This ensures that the operations are correctly processed when multiple M-Files servers may be connected to a vault.

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
