---
layout: page
title: In-memory state usage in Multi-Server Mode Vault Application Framework applications
includeInSearch: true
breadcrumb: In-memory state
requiredMFilesServerVersion: 20.5
---

The approach shown below is only compatible with version 2.2 (and higher) of the Vault Application Framework, where the target audience runs M-Files Online 20.5 or higher.
{:.note.warning}

**In general in-memory state (e.g. cached lists of content) should be avoided**, as it's easy to have situations where the cache on one server has different data to the cache on another server.  However, there are some situations where this may be required.  This can be achieved in a number of ways, but the recommended best practice is the use of named value storage.

> It should be noted that this storage pattern should not be used for data that must always be current, as there is a possibility of a race condition when reading and writing data using multiple servers.
>
> This can cause the data fetched from named value storage to become stale, between the time the fetch response is resolved on the server and the time that response is returned to the requestor. Though the window of time for that is small and would be updated in a subsequent fetch request, it should still be considered when designing your solution.
{:.note}

This is the preferred means of persisting data like such a configuration setting or task processing history that may be shown in a UI dashboard. Taking this precaution into account, if a tolerance of being out of date due to the potential for a race condition is acceptable, the usage of the `SharedSettingsHelper` is recommended.

{% highlight csharp %}
// Get the persisted custom status.
CustomStatus status = SharedSettingsHelper.Get<CustomStatus>
(
	this.PermanentVault,
	TaskQueueId,
	nameof( this.CustomStatusProperty )
);
// Set the persisted custom status.
SharedSettingsHelper.Set
(
	this.PermanentVault,
	TaskQueueId,
	nameof( this.CustomStatusProperty ),
	this.CustomStatusProperty
);

// Wrap both the get and set in a property.
private DateTime TimeOfLastBroadcastTaskCreation
{
	get
	{
		// Return the shared settings value.
		return SharedSettingsHelper.Get<DateTime>
		(
			this.PermanentVault,
			typeof( VaultApplication ).FullName,
			nameof( this.TimeOfLastBroadcastTaskCreation )
		);
	}

	set
	{
		// Set the shared settings value.
		SharedSettingsHelper.Set
		(
			this.PermanentVault,
			typeof( VaultApplication ).FullName,
			nameof( this.TimeOfLastBroadcastTaskCreation ),
			value
		);
	}
}
{% endhighlight %}
