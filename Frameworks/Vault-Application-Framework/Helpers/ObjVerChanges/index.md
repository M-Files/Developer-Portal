---
layout: page
title: The ObjVerChanges class in the Vault Application Framework
includeInSearch: true
breadcrumb: ObjVerChanges
---

`ObjVerChanges` is contained in the `MFiles.VAF.Common` namespace and provides information on metadata changes between two versions of an object.

<p class="note">This class only processes metadata property value changes, and does not attempt to identify whether any file changes have occured between versions.</p>

### Comparing all property values

To compare all property values, use the `Changed` property.

```csharp
// Load document (type 0) with ID 1 and version 16 from the vault.
var objVerEx = new ObjVerEx(vault,
	(int) MFBuiltInObjectType.MFBuiltInObjectTypeDocument,
	id: 1,
	version: 16
);

// Compare the version loaded above (16) with its previous version (probably 15).
var objVerChanges = new ObjVerChanges(objVerEx);
foreach (var propertyChanged in objVerChanges.Changed)
{
	switch (propertyChanged.ChangeType)
	{
		case PropertyValueChangeType.Added:
			// Handle additions.
		break;
		case PropertyValueChangeType.Modified:
			// Handle modified values.
		break;
		case PropertyValueChangeType.Removed:
			// Handle removed values.
		break;
	}
}
```

<p class="note">Thsi will only return changed items, not property values which are the same.</p> 
