---
layout: page
title: Showing and Hiding Configuration Options
includeInSearch: true
requiredVaultApplicationFrameworkVersion: 2.0
---

Some configuration settings are only applicable in specific scenarios, and showing all configuration options to users may not be the most user-friendly.  In these situations, configuration options may be shown or hidden depending on the state of other options.

## JSPath

The `ShowWhen` and `HideWhen` configuration both use [JSPath](https://github.com/dfilatov/jspath) syntax to define both the trigger property to test, and the condition which it must meet.  More information on the JSPath syntax is available on [the JSPath official GitHub repository](https://github.com/dfilatov/jspath).

## Showing or hiding options depending on configuration state

In the example below, the `AdvancedConfiguration` option is hidden by default and only shown when the user sets the `UsesAdvancedConfiguration` option to `true`.

![Advanced configuration options hidden](showing-options-1.png)
![Advanced configuration options shown](showing-options-2.png)

{% highlight csharp %}
using System.Collections.Generic;
using System.Runtime.Serialization;
using MFiles.VAF;
using MFiles.VAF.AdminConfigurations;

namespace MFVaultApplication1
{
	[DataContract]
	public class Configuration
	{
		[DataMember]
		public bool UsesAdvancedConfiguration { get; set; }

		[DataMember]
		[JsonConfEditor(
			Hidden = true,
			ShowWhen = ".parent._children{.key == 'UsesAdvancedConfiguration' && .value == true }")]
		public AdvancedConfiguration AdvancedConfiguration { get; set; }
	}

	[DataContract]
	public class AdvancedConfiguration
	{
		[DataMember]
		public string Value { get; set; }
	}


	public class VaultApplication
		: VaultApplicationBase, IUsesAdminConfigurations
	{

		private ConfigurationNode<Configuration> config { get; set; }

		/// <inheritdoc />
		public void InitializeAdminConfigurations(IAdminConfigurations adminConfigurations)
		{

			// Add it to the configuration screen.
			this.config = adminConfigurations.AddSimpleConfigurationNode<Configuration>("My Vault Application");
		}
	}
}
{% endhighlight %}
