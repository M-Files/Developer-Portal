---
layout: page
title: Configuration Security
includeInSearch: true
breadcrumb: Validation
---

[Version 1]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Versions/#version-10)
{:.tag.unavailable title="This functionality is NOT available in version 1.0 of the Vault Application Framework."}
[Version 2]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Versions/#version-20)
{:.tag.unavailable title="This functionality is NOT available in version 2.0 of the Vault Application Framework."}
[Version 2.1]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Versions/#version-21)
{:.tag.available title="This functionality is available in version 2.1 of the Vault Application Framework."}

The approach shown below is only compatible with [version 2.1]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Versions/#version-21) of the Vault Application Framework.
{:.note.warning}

## Passwords within configuration elements

Passwords within configuration objects should be marked with the `[Security(IsPassword = true)]` attribute.  When this attribute is used, values displayed in the M-Files Admin software will be obscured and displayed insead as asterisks:

![An example of an obscured password in the M-Files Admin software](obscured-password.png)

{% highlight csharp %}
using System.Runtime.Serialization;
using MFiles.VAF.Configuration;
using MFiles.VAF.Core;

namespace MyCompany.MyProduct.MyVaultApplication3
{
	public class VaultApplication
		: ConfigurableVaultApplicationBase<Configuration>
	{
	}
	
	[DataContract]
	public class Configuration
	{
		[DataMember]
		public string Username { get; set; }

		[DataMember]
		[Security(IsPassword = true)]
		public string Password { get; set; }
 
	}
}
{% endhighlight %}

Note that configuration elements marked with a `[Security(IsPassword = true)]` attribute are not encrypted before being stored within Name Value Storage.  Whilst the storage location is only accessible to system administrators, it is important to note that these may be accessible by code executing with elevated rights.
{:.note.warning}

## Restricting who can change configuration elements

The `[Security]` attribute can also be used to configure who can change the value of a given element of the configuration.  This can be used to ensure that only system administrators - and not vault administrators - can change specific values.  **This is of increased importance in the M-Files cloud environment where some values must only be configurable by the M-Files Cloud Ops team.**

In the following example the `WebAddress` property is visible by anyone who can access the M-Files Admin area, but changes to the value can only be made by the System Administrator.  A Vault Administrator can see the value in the configuration but will get an error when trying to save changes.

{% highlight csharp %}
using System.Runtime.Serialization;
using MFiles.VAF.Configuration;
using MFiles.VAF.Core;

namespace MyCompany.MyProduct.MyVaultApplication3
{
	public class VaultApplication
		: ConfigurableVaultApplicationBase<Configuration>
	{
	}
	
	[DataContract]
	public class Configuration
	{
		[DataMember]
		public string Username { get; set; }

		[DataMember]
		[Security(IsPassword = true)]
		public string Password { get; set; }

		[DataMember]
		[Security(ChangeBy = SecurityAttribute.UserLevel.SystemAdmin)]
		public string WebAddress { get; set; }
 
	}
}
{% endhighlight %}
