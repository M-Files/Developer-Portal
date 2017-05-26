---
layout: page
title: Configuration attributes in the Vault Application Framework
includeInSearch: true
---

## MFIdentifier

The `MFIdentifier` class is used in combination with a [vault structure attribute](#vault-structure) to automate the resolution of vault element aliases to IDs.  At runtime the Vault Application Framework will identify all properties and fields of type `MFIdentifier` and automatically resolve them, where possible, to an internal ID.  If the vault structure attribute defines the element as `Required` then an error will be logged to the Windows Event Log if it cannot be resolved.

### Vault Structure

#### Object Types, Classes, Class Groups and Value Lists

```csharp
/// <summary> Refers to a class group in the vault. </summary>
/// <remarks> A class group cannot have an alias set via the M-Files Admin, but it can via the API. Beware of using this. </remarks>
[MFClassGroup(Required = false)]
public MFIdentifier FinancialDocumentsClassGroup
	= "MFiles.ClassGroups.FinancialDocuments";

/// <summary> Refers to a class in the vault. </summary>
[MFClass(Required=true)]
public MFIdentifier PurchaseOrderClass = "MFiles.Class.PurchaseOrder";

/// <summary> Refers to an object type in the vault. </summary>
[MFObjType(Required = true)]
public MFIdentifier InvoiceObjectType = "MFiles.ObjectType.Invoice";

/// <summary> Refers to a value list in the vault. </summary>
[MFValueList(Required = true)]
public MFIdentifier CountriesValueList = "MFiles.ValueList.Countries";

/// <summary> Refers to an item in a value list in the vault. </summary>
/// <remarks> Use its GUID instead. </remarks>
[MFValueListItem(Required = true, ValueList = "MFiles.ValueList.Countries")]
public MFIdentifier UnitedKingdomCountryValueList
	= "{2F7A844E-1E91-41DA-8EA8-80A31A4BCD41}";
```

<p class="note">The value list item GUID can be determined by following the instructions for <a href="m-files://show/CE7643CB-C9BB-4536-8187-707DB78EAF2A/0-1512?object=52274027-E7F7-4CD3-B8BF-95071AD8090F">Configuring the Metadata Card (2015.3), section 3.3.3.</a></p>

#### Access Control Lists and User Groups

```csharp
/// <summary> Refers to a named access control list in the vault. </summary>
[MFNamedACL(Required = true)]
public MFIdentifier OnlyForMeNamedAccessControlList = "MFiles.NamedACL.OnlyForMe";

/// <summary> Refers to a user group in the vault. </summary>
[MFUserGroup(Required = true)]
public MFIdentifier FinanceUserGroup = "MFiles.UserGroup.FinanceUsers";
```

#### Property Definitions

```csharp
/// <summary> Refers to a property definition in the vault.</summary>
[MFPropertyDef(Required = true)]
public MFIdentifier PurchaseOrderNumberPropertyDef 
	= "MFiles.PropertyDef.PurchaseOrderNumber";
```

#### Workflows, Workflow States, And Workflow State Transitions

```csharp
/// <summary> Refers to a workflow in the vault. </summary>
[MFWorkflow(Required = true)]
public MFIdentifier ApprovalWorkflow = "MFiles.Workflow.Approval";

/// <summary> Refers to a workflow state in the vault. </summary>
[MFState(Required = true)]
public MFIdentifier ApprovedWorkflowState = "MFiles.WorkflowState.Approval.Approved";

/// <summary> Refers to a workflow state transition in the vault. </summary>
[MFStateTransition(Required = true)]
public MFIdentifier RequiresApprovalToApprovalStateTransition
	= "MFiles.WorkflowStateTransition.Approval.RequiresApprovalToApproval";
```

#### Views

```csharp
/// <summary> Refers to a view in the vault. </summary>
/// <remarks> This is the view's Id, as shown in its properties dialog. </remarks>
[MFView(Required = true)]
public MFIdentifier CustomersView = 142;
```

## MFConfiguration

The `MFConfigurationAttribute` attribute automates the persistence and loading of configuration information from and to named value storage.  When the application is first run, the object will be serialized to JSON and stored using the attributes provided at declaration.  On subsequent runs, the data will be deserialized from Named Value Storage into the object.

For example, the following code would store a JSON-serialized version of the Configuration object into Named Value Storage with the type of `MFConfigurationValue`, a namespace of `MyApplication` and a key of `config`:

```csharp
[MFConfiguration("MyApplication", "config")]
private Configuration config = new Configuration();
```

<p class="note">Saving configuration to Named Value Storage allows an administrator to alter the configuration of your application without recompiling the code.  A restart of the vault is required to re-load the configuration from Named Value Storage.</p>
