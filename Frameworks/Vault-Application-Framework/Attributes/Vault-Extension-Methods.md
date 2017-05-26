---
layout: page
title: Exposing Vault Extension Methods in the Vault Application Framework
includeInSearch: true
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

Access can be restricted to the extension method by altering the value of `RequiredVaultAccess`.

<p class="note">In the code sample provided, the name of the vault extension method (provided as a string in the attribute declaration) and the name of the actual method are the same, but this is not required.</p>

