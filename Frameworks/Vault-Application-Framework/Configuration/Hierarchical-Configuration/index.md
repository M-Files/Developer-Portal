---
layout: page
title: Nested/Hierarchical configuration
includeInSearch: true
breadcrumb: Hierarchical configuration
prerelease: true
---

{% comment %}

HACK!
THIS PAGE USES HIGHLIGHTER LIQUID COMMANDS RATHER THAN BACKTICKS.
BACKTICKS AREN'T CORRECTLY HIGHLIGHTING THE CODE.
THIS NEEDS LOOKING AT, AT SOME POINT, BUT WORKS FOR NOW.

{% endcomment %}

[Version 1]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Versions/#version-10)
{:.tag.unavailable title="This functionality is NOT available in version 1.0 of the Vault Application Framework."}
[Version 2]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Versions/#version-20)
{:.tag.available title="This functionality is available in version 2.0 of the Vault Application Framework."}

The approach shown below is only compatible with [version 2.0]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Versions/#version-20) of the Vault Application Framework, where the target audience runs M-Files 2018 or higher.  If using [version 1.0]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Versions/#version-10), or to maintain compatibility with M-Files 2015.3 and lower, [configuration attributes]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Attributes/Configuration/) should be used instead.
{:.note.warning}

In some situations, using nested configuration objects may be needed to express complex configuration structures.  One such example would be where an application requires the user to configure a collection of rules, similarly to the [Metadata Card Configuration](/Built-In/Metadata-Card-Configuration/).  The sample below defines two configuration classes (`Configuration` and `ConfigurationChild`).  Members exposed by either configuration class could be simple strings (as below), or any other configuration value for which an [editor exists](../Editors).

![An example of nested configuration objects](nested-configuration.png)

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
		public ConfigurationChild MySubConfiguration { get; set; }

		[DataMember]
		public List<ConfigurationChild> Children { get; set; }
	}

	[DataContract]
	public class ConfigurationChild
	{
		[DataMember]
		public string Value1 { get; set; }
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