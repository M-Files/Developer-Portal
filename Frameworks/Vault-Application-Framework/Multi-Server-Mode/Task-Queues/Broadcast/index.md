---
layout: page
title: Broadcast task queues in Vault Application Framework applications
includeInSearch: true
breadcrumb: Broadcast task queues
requiredMFilesServerVersion: 20.5
---

The approach shown below is only compatible with version 2.3 (and higher) of the Vault Application Framework, where the target audience runs M-Files Online 20.5 or higher.
{:.note.warning}

Broadcast task queues are used to broadcast information generated in one M-Files server to all others in the Multi-Server Mode configuration.  This can be used to send commands for other servers to update any cached information they may have, for example.

## Creating a task processor and broadcasting to all servers

```csharp
public class VaultApplication
	: MFiles.VAF.Extensions.ConfigurableVaultApplicationBase<Configuration>
{

	[TaskQueue]
	public const string BroadcastQueueId = "sampleApplication.ExampleBroadcastQueue";
	public const string BroadcastTaskType = "BroadcastType";

	// Dummy vault extension method to send the broadcast; this could
	// actually be done by a command on a dashboard, or a state action, etc.
	[VaultExtensionMethod("SendBroadcast",
		RequiredVaultAccess = MFVaultAccess.MFVaultAccessChangeMetaDataStructure)]
	private string SendBroadcast(EventHandlerEnvironment env)
	{
		this.TaskManager.SendBroadcast(env.Vault, BroadcastQueueId, BroadcastTaskType);
		return "Successful";
	}

	[TaskProcessor(BroadcastQueueId, BroadcastTaskType)]
	public void BroadcastProcessor(ITaskProcessingJob<TaskDirective> job)
	{ 
		// TODO: Handle the broadcast.
	}

}
```