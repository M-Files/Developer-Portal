---
layout: page
title: Configuration in the Vault Application Framework
includeInSearch: true
breadcrumb: Configuration
requiredVaultApplicationFrameworkVersion: 2.0
---

M-Files 2018 introduces a new section within the M-Files Admin software that collates a variety of customisable configuration options from across the M-Files vault, including:

* Metadata card configuration
* Federated Authentication configuration
* Intelligent Metadata Layer component (e.g. External Repository Connector and Intelligence Service) configuration

The [2.0 release of the Vault Application Framework]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Versions/#version-20) enables developers to expose the configuration of their Vault Application Framework applications into this same section.

![The M-Files 2018 Configuration area](configuration-area.png)

## Overview

By defining a configuration class within your vault application, M-Files will automatically (in VAF 2.0 and higher) provide an interface for administrators to alter how your application runs.  This gives you the ability to define an application that can be configured to run different ways.

The configuration class itself is decorated with standard .NET [DataContract] and [DataMember] classes, and the configuration is persisted to the vault as JSON.  When the vault starts this configuration is loaded and provided to the application, and when the configuration is changed via the M-Files Admin, the updated configuration is automatically made available to the vault application.

A sample configuration class may look something like this:

```csharp
[DataContract]
public class Configuration
{
	// This shows a text box that the value can be entered into.
	[DataMember]
	public string MyTextValue { get; set;}


	//// NEVER DO THIS:
	//// If the configuration cannot be deserialized (e.g. this property is missing, which
	//// it always will be when the application is first installed) then the configuration
	//// itself will be null, causing odd issues in your application.
	//[DataMember(IsRequired = true)]
	//public string MyTextValue2 { get; set;}
}
```

There are multiple [configuration editors](Editors) available to allow different types of data to be configured.  Some of these editors can be further customized by using additional attributes such as [JsonConfEditor]; these are described in the relevant place in the configuration.

Note that [DataContract] and [DataMember] are used to serialize and deserialize the configuration to the vault.  If the configuration fails to deserialize properly then your application may not start properly.  You should **never** use [DataMember(IsRequired = true)] in your configuration, as this will cause an empty configuration to fail loading, and may cause obscure errors in your code.
{:.note.warning}

## VAF 2.1

### Inheriting from the new base class

Using the VAF 2.1 base class will alter the Named Value Storage location used for configuration, therefore any existing configuration will be lost.  You should ensure that users are aware of the correct way to migrate their configuration from VAF 2.0 applications to VAF 2.1 applications.
{:.note.warning}

Version 2.1 of the Vault Application Framework continues to support the [VAF 2.0 configuration approach](Configuration/#vaf-20) approach, but adds in a base class that allows easy extension of the standard functionality.  In order to support newer items such as the [[Security] attribute](../Attributes/Configuration/Security), you **must change your implementation to use the newer approach**.  A sample on [how to convert a VAF 2.0 application to VAF 2.1]({{ site.baseurl }}/Samples-And-Libraries/Samples/Vault-Application-Framework/Upgrading-VAF2.0-To-2.1/) is also available.

By default the configuration will be visible to vault administrators and system administrators, but only be editable by system administrators.  When running on the M-Files cloud this means that vault administrators can view, but not change, the configuration.  More information on using the [[Security] attribute](../Attributes/Configuration/Security) can be found on its dedicated page.
{:.note.warning}

To do this you must inherit from `ConfigurableVaultApplicationBase<T>`, instead of the older `VaultApplicationBase` class.  Common functionality such as implementing a [custom dashboard](Custom-Dashboards) can be implemented by overriding methods in the base class.

{% highlight csharp %}
using System;
using System.IO;
using MFiles.VAF;
using MFiles.VAF.Common;
using MFiles.VAF.Core;
using MFilesAPI;

namespace MFilesUserLiteTraining
{
	[DataContract]
	public class Configuration
	{
		// NOTE: The default value needs to be placed in both the JsonConfEditor
		// (or derived) attribute, and as a default value on the member.
		[DataMember]
		[JsonConfEditor(DefaultValue = "Value 1")]
		public string ConfigValue1 = "Value 1";
 
	}

	public partial class VaultApplication
		: ConfigurableVaultApplicationBase<Configuration>
	{
		#region Overrides of VaultApplicationBase

		/// <inheritdoc />
		public override void StartOperations(Vault vaultPersistent)
		{
			base.StartOperations(vaultPersistent);

			// An instance of the current configuration can be found in this.Configuration.
			SysUtils.ReportInfoToEventLog(this.Configuration.ConfigValue1);
		}

		#endregion
	}
}
{% endhighlight %}

In the example above there has been a `Configuration` class defined elsewhere in the project.  By inheriting from this base class, a configuration node will be added to the M-Files Admin `Other Applications` configuration section.  The "Configuration" properties are driven from the properties on the Configuration class, as detailed [on the dedicated page](Editors).
{:.note}

## VAF 2.0

### Implementing IUsesAdminConfigurations

Ensure that your vault application implements `MFiles.VAF.AdminConfigurations.IUsesAdminConfigurations`.  This will require you to declare one method - `InitializeAdminConfigurations` - as shown below.

{% highlight csharp %}
using MFiles.VAF;
using MFiles.VAF.AdminConfigurations;

namespace MFVaultApplication1
{
	public class VaultApplication
		: MFiles.VAF.VaultApplicationBase, MFiles.VAF.AdminConfigurations.IUsesAdminConfigurations
	{
		public void InitializeAdminConfigurations(IAdminConfigurations adminConfigurations)
		{
		}
	}
}
{% endhighlight %}

### Registering configuration nodes

The `InitializeAdminConfigurations` method allows a developer to add configuration nodes into the M-Files Admin configuration screen, and for these configuration nodes to be rendered within the M-Files Admin.

In the sample below we declare a custom configuration class named `Configuration`, which must be marked with the `[DataContract]` attribute from `System.Runtime.Serialization`.  All fields and properties of this class that are marked with the `[DataMember]` attribute will be shown within the M-Files Admin interface, as shown in the screenshot below.

Configuration values can be more than just strings.  More information on editor types is available [on the dedicated page](Editors).  Configuration values can even be [hierarchical](Hierarchical-Configuration).
{:.note}

{% highlight csharp %}
using System.Runtime.Serialization;
using MFiles.VAF;
using MFiles.VAF.AdminConfigurations;
using MFiles.VAF.Common;
using MFilesAPI;

namespace MFVaultApplication1
{
	[DataContract]
	public class Configuration
	{
		// NOTE: The default value needs to be placed in both the JsonConfEditor
		// (or derived) attribute, and as a default value on the member.
		[DataMember]
		[JsonConfEditor(DefaultValue = "Value 1")]
		public string ConfigValue1 = "Value 1";

	}

	public class VaultApplication
		: VaultApplicationBase, IUsesAdminConfigurations
	{

		private ConfigurationNode<Configuration> config { get; set; }

		public void InitializeAdminConfigurations(IAdminConfigurations adminConfigurations)
		{
			// Add it to the configuration screen.
			this.config = adminConfigurations.AddSimpleConfigurationNode<Configuration>("My Vault Application");
		}
	}
}
{% endhighlight %}

![A simple configuration object rendered within the M-Files 2018 Admin interface](simple-configuration-node.png)

### Reacting when configuration changes

The configuration can be automatically updated when changes are saved within the M-Files 2018 Admin interface

The `ConfigurationNode<T>` returned from the call to `AddSimpleConfigurationNode` will raise a `Changed` event when the configuration within the M-Files Admin is altered.  This allows your application to reflect an updated configuration without requiring a vault restart:

{% highlight csharp %}
using System.Runtime.Serialization;
using MFiles.VAF;
using MFiles.VAF.AdminConfigurations;
using MFiles.VAF.Common;
using MFilesAPI;

namespace MFVaultApplication1
{
	[DataContract]
	public class Configuration
	{
		// NOTE: The default value needs to be placed in both the JsonConfEditor
		// (or derived) attribute, and as a default value on the member.
		[DataMember]
		[JsonConfEditor(DefaultValue = "Value 1")]
		public string ConfigValue1 = "Value 1";

	}

	public class VaultApplication
		: VaultApplicationBase, IUsesAdminConfigurations
	{

		private ConfigurationNode<Configuration> config { get; set; }

		/// <inheritdoc />
		public override void StartOperations(Vault vaultPersistent)
		{
			base.StartOperations(vaultPersistent);
			SysUtils.ReportInfoToEventLog("Configured value: " + this.config.CurrentConfiguration.ConfigValue1);
		}

		public void InitializeAdminConfigurations(IAdminConfigurations adminConfigurations)
		{
			// Add it to the configuration screen.
			this.config = adminConfigurations.AddSimpleConfigurationNode<Configuration>("My Vault Application");

			// Respond when changed.
			this.config.Changed += (oldConfig, newConfig) => {
				SysUtils.ReportInfoToEventLog("Updated value: " + newConfig.ConfigValue1);
			};
		}
	}
}
{% endhighlight %}