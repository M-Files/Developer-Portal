---
layout: page
title: Filtering configuration options
includeInSearch: true
breadcrumb: Filtering
---

[Version 1]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Versions/#version-10)
{:.tag.unavailable title="This functionality is NOT available in version 1.0 of the Vault Application Framework."}
[Version 2]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Versions/#version-20)
{:.tag.available title="This functionality is available in version 2.0 of the Vault Application Framework."}

The approach shown below is only compatible with [version 2.0]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Versions/#version-20) of the Vault Application Framework, where the target audience runs M-Files 2018 or higher.  If using [version 1.0]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Versions/#version-10), or to maintain compatibility with M-Files 2015.3 and lower, [configuration attributes]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Attributes/Configuration/) should be used instead.
{:.note.warning}

There are situations where configuration options should be filtered according to the values of other options.

## Filtering workflow state by workflow

For the filtering to work, you must:

1. Ensure that the configuration elements are in their own class (e.g. `WorkflowTrigger`, in the sample below).
2. Add the `MFWorkflow` attribute to the new class.  This is the type of the parent that will drive the filtering.
3. Add the `RefMember` property to the `MFWorkflow` attribute, providing it with the name of the `MFIdentifier` member that identifies the parent (e.g. `WorkflowTrigger.Workflow`, in the sample below).
4. Other configuration values within the class which support filtering will now be filtered by the value of the parent (e.g. `State` will be filtered by `Workflow`, in the sample below).

```csharp
using System.Collections.Generic;
using System.Runtime.Serialization;
using MFiles.VAF;
using MFiles.VAF.AdminConfigurations;
using MFiles.VAF.Configuration;

namespace FilteredConfigurationSample
{
	/// <summary>
	/// The entry point for this Vault Application Framework application.
	/// </summary>
	/// <remarks>Examples and further information available on the developer portal: http://developer.m-files.com/. </remarks>
	public class VaultApplication
		: VaultApplicationBase, IUsesAdminConfigurations
	{
		public ConfigurationNode<Configuration> Configuration { get; set; }

		#region Implementation of IUsesAdminConfigurations

		/// <inheritdoc />
		public void InitializeAdminConfigurations(IAdminConfigurations adminConfigurations)
		{
			this.Configuration = adminConfigurations
				.AddSimpleConfigurationNode<Configuration>("My Configuration");
		}

		#endregion
	}

	[DataContract]
	public class Configuration
	{
		[DataMember]
		public List<WorkflowTrigger> WorkflowTriggers { get; set; }
	}

	[DataContract]
	[MFWorkflow(RefMember = nameof(WorkflowTrigger.Workflow))]
	public class WorkflowTrigger
	{
		[MFWorkflow]
		[JsonConfEditor(Label = "Object Workflow")]
		[DataMember]
		public MFIdentifier Workflow { get; set; }

		[MFState]
		[DataMember]
		[JsonConfEditor(Label = "State")]
		public MFIdentifier State { get; set; }

	}
}
```

![Filtering workflow states by workflow](FilteringStatesByWorkflow.png)

## Filtering workflow state transitions by workflow

For the filtering to work, you must:

1. Ensure that the configuration elements are in their own class (e.g. `WorkflowTrigger`, in the sample below).
2. Add the `MFWorkflow` attribute to the new class.  This is the type of the parent that will drive the filtering.
3. Add the `RefMember` property to the `MFWorkflow` attribute, providing it with the name of the `MFIdentifier` member that identifies the parent (e.g. `WorkflowTrigger.Workflow`, in the sample below).
4. Other configuration values within the class which support filtering will now be filtered by the value of the parent (e.g. `Transitions` will be filtered by `Workflow`, in the sample below).

```csharp
using System.Collections.Generic;
using System.Runtime.Serialization;
using MFiles.VAF;
using MFiles.VAF.AdminConfigurations;
using MFiles.VAF.Configuration;

namespace FilteredConfigurationSample
{
	/// <summary>
	/// The entry point for this Vault Application Framework application.
	/// </summary>
	/// <remarks>Examples and further information available on the developer portal: http://developer.m-files.com/. </remarks>
	public class VaultApplication
		: VaultApplicationBase, IUsesAdminConfigurations
	{
		public ConfigurationNode<Configuration> Configuration { get; set; }

		#region Implementation of IUsesAdminConfigurations

		/// <inheritdoc />
		public void InitializeAdminConfigurations(IAdminConfigurations adminConfigurations)
		{
			this.Configuration = adminConfigurations
				.AddSimpleConfigurationNode<Configuration>("My Configuration");
		}

		#endregion
	}

	[DataContract]
	public class Configuration
	{
		[DataMember]
		public List<WorkflowTrigger> WorkflowTriggers { get; set; }
	}

	[DataContract]
	[MFWorkflow(RefMember = nameof(WorkflowTrigger.Workflow))]
	public class WorkflowTrigger
	{
		[MFWorkflow]
		[JsonConfEditor(Label = "Object Workflow")]
		[DataMember]
		public MFIdentifier Workflow { get; set; }
		
		[MFStateTransition]
		[DataMember]
		[JsonConfEditor(Label = "Transitions")]
		public List<MFIdentifier> Transitions { get; set; }

	}
}
```

![Filtering workflow state transitions by workflow](FilteringStateTransitionsByWorkflow.png)
