---
layout: page
title: Property Calculator Configuration Reference
includeInSearch: true
breadcrumb: Configuration Reference
excerpt: This page is the complete configuration reference for Property Calculator — accessed via M-Files Admin → Applications → Property Calculator → Configuration — covering calculation rules, error cases, value list validation, and general application settings.
---

## Top-Level Structure

The configuration has four top-level sections: **Calculation Rules** (class groups with property
calculations), **Value List Operations** (validation for value list items), **Background Operations**
(scheduled tasks and state transitions), and **Settings** (global application settings).

The individual **calculation modes** and **condition types** referenced throughout this page have their own dedicated reference pages: [Calculation Modes]({{ site.baseurl }}/Built-In/Property-Calculator/Configuration/Calculation-Modes/) and [Conditions]({{ site.baseurl }}/Built-In/Property-Calculator/Configuration/Conditions/).
{:.note}

---

## Calculation Rules (Class Groups)

Each entry in Calculation Rules defines a **Class Group** — a set of property calculations, error cases, and related object update rules that apply to objects matching specific criteria.

### Class Group Settings

| Setting | Type | Description |
|---------|------|-------------|
| **Name** | Text | Display name for this group (shown in configuration list) |
| **Description** | Text | Documentation: describe why this group exists and when it's used |
| **Custom Group** | Toggle | When OFF (default): group matches by M-Files class. When ON: group matches by custom search conditions. |
| **Class** | M-Files Class | *(Visible when Custom Group is OFF)* The M-Files class this group applies to |
| **Group Conditions** | Search Conditions | *(Visible when Custom Group is ON)* Custom search conditions that determine which objects this group applies to |
| **Calculation Event Handler** | Dropdown | When the calculations run during check-in (see below) |
| **Properties** | List | Property calculation rules (see [Calculation Modes]({{ site.baseurl }}/Built-In/Property-Calculator/Configuration/Calculation-Modes/)) |
| **Error Cases** | List | Blocking rules that prevent user actions (see [Error Cases](#error-cases)) |
| **Update Related Objects** | List | Rules for triggering updates on linked objects (see [Background Operations]({{ site.baseurl }}/Built-In/Property-Calculator/Background-Operations/)) |

### Class vs. Custom Group

**Use Class** (default) when your rules should apply to all objects of a specific M-Files class. This is the simplest and most common configuration.

**Use Custom Group** when you need more flexible matching, such as:
- Rules that apply across multiple classes
- Rules based on property values (e.g., only objects where Status = Active)
- Rules based on object type without class restriction
- Complex multi-condition matching

> **Example:** A Custom Group with condition "Object Type = Document AND Property 'Department' = Finance" would apply to all Finance documents regardless of their class.

### Event Handler Timing

This setting controls **when** Property Calculator runs during the check-in process:

| Timing | Description | Use When |
|--------|-------------|----------|
| **BeforeCheckInChangesFinalize** *(default, recommended)* | Runs after all other event handlers have processed. The object state is stable and all other automations have completed. | Most calculations — this is the safest option |
| **BeforeCheckInChanges** | Runs earlier in the check-in pipeline, before other event handlers finalize. | When you need calculations to be available for other event handlers, or when triggering state changes as part of the calculation |

> ⚠️ **Consequences of BeforeCheckInChanges:**
> - Your calculated values may be overwritten by subsequent event handlers
> - The object may be in an intermediate state (other automations haven't run yet)
> - This timing is marked as **Experimental** — use only when specifically needed

### Rule Execution Order

Property calculation rules within a group execute **sequentially from top to bottom**. Earlier rules' results are available to later rules. This means you can:

1. Calculate an intermediate value in Rule 1
2. Use that intermediate value in Rule 2's expression

> **Example:** Rule 1 sets `PD.Subtotal` = quantity × price, then Rule 2 sets `PD.Total` = `%PROPERTY_{PD.Subtotal}%` × 1.24 (adding VAT).

---

## Error Cases

Error cases define **blocking rules** that prevent users from performing specific actions when conditions are met. They are configured within each Class Group.

### Error Case Settings

| Setting | Type | Description |
|---------|------|-------------|
| **Error Name** | Text | Internal name for this error case (for configuration management) |
| **Error Message** | Text | The message displayed to the user when the action is blocked. Supports placeholders. |
| **Block Users Only** | Toggle | When ON: only human users are blocked — server scripts and background processes can still modify the object |
| **Block Modification** | Toggle | Prevents check-in when conditions are met |
| **Block Delete** | Toggle | Prevents deletion when conditions are met |
| **Block Destroy** | Toggle | Prevents permanent destruction when conditions are met |
| **Block Check Out** | Toggle | Prevents checkout when conditions are met |
| **Conditions** | List | Conditions that trigger this error case (see [Conditions]({{ site.baseurl }}/Built-In/Property-Calculator/Configuration/Conditions/)) |

### General Error Message

The parent Class Group has a **General Error Message** field. When set, this message is prepended to all error case messages in the group — useful for context like "Invoice validation failed:".

### Examples

**Prevent check-in without required approval:**
```yaml
Error Name:    "RequireApproval"
Error Message: "This document requires approval before check-in. 
                Please set the Approved By property."
Block Modification: ✅
Conditions:    Property PD.Status = "Pending Approval" 
               AND Property PD.ApprovedBy is empty
```

**Block deletion of active contracts:**
```yaml
Error Name:    "PreventActiveContractDeletion"
Error Message: "Active contracts cannot be deleted. 
                Change status to Terminated first."
Block Delete:  ✅
Block Destroy: ✅
Conditions:    Property PD.Status = "Active"
```

**Allow scripts but block users from modifying archived records:**
```yaml
Error Name:    "ArchiveProtection"
Error Message: "This record is archived and cannot be modified."
Block Users Only: ✅
Block Modification: ✅
Conditions:    Property PD.Status = "Archived"
```

---

## Value List Operations

Configure validation rules for value list items.

### Value List Validation

| Setting | Description |
|---------|-------------|
| **Value List** | The M-Files value list to validate |
| **RegExp** | C# regular expression that new items must match |
| **Error Message** | Displayed when validation fails |

**Example:** Ensure department codes follow the format "DEPT-XXX":
- RegExp: `^DEPT-[A-Z]{3}$`
- Error Message: "Department code must be in format DEPT-XXX (e.g., DEPT-FIN)"

---

## General Settings

Global settings that affect all Property Calculator operations.

### Loop Detection

Prevents infinite calculation loops that can occur when related object updates create circular dependencies (A updates B, B updates A, A updates B...).

| Setting | Default | Description |
|---------|---------|-------------|
| **State chain time window (seconds)** | 30 | Time window for detecting rapid state-change loops. If the same state is reached twice within this window, it's treated as a loop. |
| **Full loop check every N versions** | 100 | How often to run a full version-history loop check (every N versions). Set to 0 to disable. |
| **Max server versions per 24h** | 20 | If an object exceeds this many **server-created** versions (user ID < 0) in 24 hours, it is flagged as looping and further automated updates are skipped |

**What happens when a loop is detected:**
1. The offending update or state transition is skipped
2. A warning/error is logged (and surfaced in the Status Report if enabled)
3. The object may appear as "stuck" on the dashboard if its updates keep being retried

Loop detection reads the object's version history at runtime — there is no persistent flag in NVS. Once the runaway versioning stops, the object recovers on its own.
{:.note}

For tips on adjusting these thresholds (e.g. for bulk imports), see [Advanced / Operational Settings](#advanced-operational-settings) at the end of this document.
{:.note}

---

### Status Reporting

**In plain terms:** this is an automated health check — if enabled, Property Calculator periodically
writes a summary of stuck or errored objects so admins can spot problems without digging through logs.

Configures automated status reports for monitoring application health. When enabled, a report is
written to a designated vault object's **Comment** property (see
[Troubleshooting]({{ site.baseurl }}/Built-In/Property-Calculator/Troubleshooting/#status-reporting)).

| Setting | Default | Description |
|---------|---------|-------------|
| **Activated** | Off | Enable status reporting |
| **Status Object GUID** | — | GUID of the vault object whose Comment property receives the report |
| **Has Stuck Objects Property** | — | *(Optional)* Boolean property set to Yes when stuck objects exist |
| **Has Errors Property** | — | *(Optional)* Boolean property set to Yes when errors are logged |
| **Max Objects Per Type** | 10 | How many stuck object IDs to list per object type |
| **Stuck Threshold (hours)** | 24 | Retryable stuck items older than this are included in the report/dashboard (dead-lettered objects are always included). Does **not** control when an object becomes stuck. |

---

### Background Update (pipeline, retry & dead-letter)

**In plain terms:** Property Calculator processes related-object updates and state transitions in
the background rather than immediately, so check-in isn't slowed down. These settings control how
often that background work runs, how much it does per pass, and how it handles updates that fail
(automatic retries, and eventually giving up and setting them aside).

Global settings that control the asynchronous processing pipeline. See
[Background Operations]({{ site.baseurl }}/Built-In/Property-Calculator/Background-Operations/) for how these fit together.

| Setting | Default | Description |
|---------|---------|-------------|
| **Automatic object update frequency** | 5 min | How often the Automatic Object Update processor runs |
| **Automatic state transition frequency** | 5 min | How often the recurring state-transition processor runs |
| **Update queue cleanup frequency** | 5 min | How often waiting hot-queue tasks are deduplicated and spilled to overflow |
| **Do not update immediately if modified in past (seconds)** | 300 | Defer a background related-object update when the object was re-versioned **by the server** within this window, to avoid piling up unnecessary server versions. User edits do not count. 0/negative disables throttling. |
| **Version offset for modification check** | 1 | How many recent **server-made** versions (within the window) to allow before deferring. 1 = defer on the newest recent server version; 2–3 tolerates one/two (useful when another app also versions the objects). Minimum 1. |
| **Max number of objects to update in one run** | 500 | Per-run object budget (applied per phase). Minimum 1. |
| **When the overflow buffer is full** | Block new updates | `Block new updates` (reject at source so nothing goes stale) or `Drop excess updates` (keep succeeding but drop oldest excess) |
| **Retry back-off (minutes)** | `15,60,300,1440` | Escalating retry intervals for failed background updates; the last value repeats |
| **Max real-time state transitions in queue** | 300 | Back-pressure cap: above this many waiting transition tasks, new real-time transitions are skipped for the recurring scanner |
| **Dead-letter after (days)** | 14 | How long an update is retried (from first failure) before being dead-lettered |
| **Max dead-letter entries** | 10000 | Cap on the dead-letter archive; when full, further permanent failures are only logged |

For the overflow buffer's fixed structural limits (not configurable), see [Advanced / Operational Settings](#advanced-operational-settings) at the end of this document.
{:.note}

---

### Related Object Update Settings

The related-object throttle settings (**Do not update immediately if modified in past** and
**Version offset for modification check**) are fully documented in the **Background Update** table
above — see also [Background Operations]({{ site.baseurl }}/Built-In/Property-Calculator/Background-Operations/#immediate-update-throttling).

---

### Configuration History

| Setting | Description |
|---------|-------------|
| **Configuration History** | When enabled, saves configuration snapshots before changes — useful for rollback if a configuration update breaks functionality |

---

## Advanced / Operational Settings

This section collects deeper tuning rationale for edge cases. It is not needed to complete a basic
configuration — the settings themselves are documented in their normal locations ([Loop
Detection](#loop-detection) and [Background Update](#background-update-pipeline-retry-dead-letter)
above); this is background on *why* and *when* to adjust them.

### Loop Detection tuning

If you have legitimate use cases that create many versions in a short time (e.g. bulk imports),
increase `Max server versions per 24h` so they aren't mistaken for a loop. To detect genuine loops
faster (at the risk of more false positives on legitimate rapid changes), decrease the `State chain
time window`.

### Background Update overflow buffer internals

The hot-queue overflow buffer has fixed structural limits that are **not configurable**: 10,000
entries per segment, 10 segments, a 100,000-object hard cap, and an 80,000-object warning threshold.
These exist to bound memory use under extreme backlog and are provided here for reference only — in
normal operation, the `Max number of objects to update in one run` and `When the overflow buffer is
full` settings (see the Background Update table) are what admins tune day to day.
