---
layout: page
title: Sequential task queues in Vault Application Framework applications
includeInSearch: true
breadcrumb: Sequential task queues
requiredMFilesServerVersion: 20.5
---

The approach shown below is only compatible with version 2.3 (and higher) of the Vault Application Framework, where the target audience runs M-Files Online 20.5 or higher.
{:.note.warning}

Tasks added to a sequential task queue will be processed in the order in which they were added; if tasks 1, 2, then 3 are added to the queue then the tasks will be processed one at a time and the processing order is guaranteed to be 1, 2, 3.

## Creating a task processor and adding tasks

```csharp
public class VaultApplication
	: MFiles.VAF.Extensions.ConfigurableVaultApplicationBase<Configuration>
{

	// Sequential processing; all tasks will be executed one-by-one, in the order they were added to the queue.
	[TaskQueue(Behavior = MFTaskQueueProcessingBehavior.MFProcessingBehaviorSequential)]
	public const string QueueId = "sampleApplication.VaultApplication";
	public const string UploadToRemoteSystemTaskType = "UploadToRemoteSystem";

	[StateAction("WorkflowStateAliasForStateABCD")]
	public void HandleStateABCD(StateEnvironment env)
	{
		// When the object hits this state, add a task for it.
		this.TaskManager.AddTask
		(
			env.Vault,
			QueueId,
			UploadToRemoteSystemTaskType,
			// Directives allow you to pass serializable data to and from the task.
			directive: new ObjIDTaskDirective(env.ObjVer.ObjID)
		)
	}

	[TaskProcessor(QueueId, UploadToRemoteSystemTaskType)]
	public void UploadToRemoteSystem(ITaskProcessingJob<ObjIDTaskDirective> job)
	{
		// Get the object ID.
		if(false == job.Directive.TryGetObjID(out ObjID objID))
			return;

		// TODO: Send the item to the external system.

		// TODO: Update the object, moving it to the next workflow state.
	}
}
```

The sample above uses a [custom task directive](../#custom-directives) to provide the task processor with information about which object needs to be processed.  You can create your own task directives by inheriting from `TaskDirective` an ensuring that your directive is serializable.  The directive used above, `ObjIDTaskDirective`, is part of the [VAF Extensions](https://github.com/M-Files/VAF.Extensions.Community/blob/master/MFiles.VAF.Extensions/Directives/ObjIDTaskDirective.cs) library.
{:.note}



