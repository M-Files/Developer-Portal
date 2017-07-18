---
layout: page
title: Exposing Vault Extension Methods in the Vault Application Framework
includeInSearch: true
breadcrumb: Vault Extension Methods
---

The `VaultExtensionMethodAttribute` attribute marks the following method as a vault extension method, and declares its alias and the level of vault access required to call it.  The input provided when the extension method is called is available within `env.Input`.

```csharp
[VaultExtensionMethod("MyVaultExtensionMethod",
	RequiredVaultAccess = MFVaultAccess.MFVaultAccessNone)]
private string MyVaultExtensionMethod(EventHandlerEnvironment env)
{
	return env.Input + ", " + DateTime.Now.Ticks.ToString();
}
```

Access can be restricted to the extension method by altering the value of `RequiredVaultAccess`.  The Vault Application Framework will ensure that any user calling this extension method has this level of access to the system prior to executing the method.  The default for `RequiredVaultAccess` is [MFVaultAccessChangeFullControlRole](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~MFVaultAccess.html), which effectively limits the access to administrators-only.

<p class="note">In the code sample provided, the name of the vault extension method (provided as a string in the attribute declaration) and the name of the actual method are the same, but this is not required.</p>

