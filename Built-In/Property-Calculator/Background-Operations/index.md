---
layout: page
title: Property Calculator Background Operations
includeInSearch: true
breadcrumb: Background Operations
excerpt: This page covers everything that happens outside the original user check-in — related object updates, the asynchronous processing pipeline (hot task queue, cold overflow buffer, dead-letter archive), the three recurring background processors, scheduled Automatic Object Updates, and Automatic State Transitions.
---

## Overview: Synchronous vs. Background

Property Calculator does work in two fundamentally different contexts:

| Context | When it runs | Examples |
|---------|--------------|----------|
| **Synchronous (event handler)** | During the user's check-in, inside the M-Files transaction | Property calculations on the object being saved, error-case validation, sending emails, creating objects |
| **Background (asynchronous)** | Later, in a VAF task processor — after the user's transaction has committed | Queued related-object updates, scheduled bulk recalculations (Automatic Object Updates), scheduled/real-time state transitions, background object creation |

The rest of this page is about the **background** context.

## Background Processing and Side-Effect Modes

When an object is recalculated **in the background** (a queued related-object update, an Automatic
Object Update rule, or an overflow-buffer drain), the background pass computes the ordinary property
values but **does not run the side-effect modes itself**:

| Side-effect mode | Why not run directly in the background pass |
|------------------|-----------------------------------------------|
| **Send Email** | Must run in the same authoritative pass that decides the final values |
| **Create Object** | Avoids running the effect twice (background pass + re-fired check-in) |
| **File Operation** | File changes belong to the object's own check-in pass |

The background pass recognizes these three modes as side-effecting and skips them while it decides
whether the object actually needs re-saving.

The background rule engine is `ApplyPropertyRulesForBackgroundUpdate`. `HasSideEffects()` in `CoreFunctionality.cs` returns `true` only for `SendEmail`, `CreateObject`, and `FileOperation`, which is how the engine identifies modes to skip.
{:.note}

### How side effects still run

A background update that determines the object should change **re-saves the object** (a *touch* that
persists the object's original values, not the background-computed ones). That save re-fires the
object's own check-in processing, which performs the **full foreground calculation — including the
side-effect modes — in the correct order**, exactly as during a user check-in.

So side-effect modes **do** run for a background-updated object; they are executed by that re-fired
check-in pass rather than by the background pass directly. This avoids running them twice and keeps
the calculation order identical to a normal check-in. If the background pass determines that nothing
would change (and no side-effect rule applies), it skips the save entirely to avoid version churn.

All other modes — Calculate Expression, Pick Substring, Set Static Values, Convert Date, Period
Length, Filter/Order Lookup Values, Search Objects, Remove Property, History, Values From MSLU, Count
Date Or Time — are applied directly by the background pass and are folded into the same re-saved
version.

The re-fired check-in processing is the `BeforeCheckInChangesFinalize` → `ValueUpdateNeeded` event handler chain. The background pass itself runs in `ObjectUpdater.ApplyAndSave`, which either re-saves the object (touch → the handler recomputes authoritatively, side effects included) or, in non-trigger mode, skips the save when the dry-run shows no change and no skipped side-effect rule. The paths that use it are queued related-object updates (`UpdateObjectBG`), Automatic Object Update rules (`AutomaticObjectUpdater`), and the overflow drainer (`OverflowDrainer`).
{:.note}

The **Create Object** mode also has an explicit *Create in Background* toggle. When enabled, object creation is queued as a dedicated background task (`CreateObjectsBO`) that runs outside the "apply property rules" path above.
{:.note}

## Related Object Updates

When an object changes, you often need to **recalculate properties on linked objects** too. For
example, when an invoice line amount changes, the parent invoice's total should be recalculated.

Related Object Updates are configured within each Class Group under **Update Related Objects**.

### Configuration

| Setting | Type | Description |
|---------|------|-------------|
| **Name** | Text | Descriptive name (shown in the configuration list) |
| **Description** | Text | Document why these objects are updated |
| **Related Object** | Config | Defines which objects to update and how to find them |
| **Update delay (minutes)** | Number | How long to wait before the update runs, as a background task. `0` = as soon as possible; a positive value defers the update and acts as a **coalescing window** — multiple changes to the same object within the window collapse into a single update. |
| **Trigger Mode** | Toggle | When ON: forces an object update (new version) even if Property Calculator doesn't change any values. **Default: OFF** — keep it off unless another application must react to every update. |
| **Conditions** | List | Conditions that must be met before related objects are updated |

### Reference Types

The **Related Object** configuration defines how to find the objects that need updating:

#### Direct Reference

The **current object** has a lookup property pointing to the target object(s).

**Use when:** The object being modified has a lookup to the object that needs recalculation.

**Example:** Invoice line has a lookup `PD.ParentInvoice`. When the line amount changes, update the parent invoice.

#### Indirect Reference

The **target objects** have a lookup property pointing to the current object. Property Calculator searches for objects that reference the current one.

**Use when:** Other objects reference the current one, and they need to be recalculated when the current object changes.

**Example:** When a customer's address changes, update all invoices that reference this customer.

### Update Delay: How Related Object Updates Are Scheduled

All related object updates are dispatched as background VAF tasks — there is no longer a synchronous,
same-transaction update path. **Update delay (minutes)** controls when a queued task is allowed to run,
not whether it runs in the background:

| Delay | Behavior | Best For |
|-------|----------|----------|
| **`0` (immediate)** | The task activates as soon as the queue can process it — normally within moments of check-in, without blocking the user's transaction. If the target was modified very recently (see throttling), that specific update is deferred further automatically. | Small number of related objects, near-real-time accuracy needed |
| **Positive value (e.g. `30`)** | The task doesn't activate until the delay elapses. Repeated changes to the same target within that window coalesce into a single update instead of one per change. | Large fan-out, or when a target is likely to be touched by several changes in quick succession |

This field replaces the older, now-deprecated **Update Immediately** boolean (`true` migrated to a `0`-minute delay, `false` to a `30`-minute delay). Configurations upgraded via **Upgrade from Legacy PC** are converted automatically — see [Breaking Changes & Upgrade Guide]({{ site.baseurl }}/Built-In/Property-Calculator/Breaking-Changes/).
{:.note}

### Trigger Mode

When **Trigger Mode** is ON, an object update (new version) is always created on the related object,
even if Property Calculator's calculations don't change any property values. This is useful when:

- Other event handlers on the related object need to fire
- You need to trigger another tool's automation pipeline
- Audit trail requires a new version record

When several queued updates for the **same object** are merged during cleanup (deduplication), a Trigger-Mode request always wins — the merged signal keeps Trigger Mode ON.
{:.note}

### Cascading Updates

Related object updates can **cascade** — updating Object A triggers an update on Object B, which
triggers an update on Object C, and so on. For example, an invoice line change updates the invoice,
which updates the customer's total outstanding, which updates the department budget.

Deep cascading chains can cause performance issues and potentially trigger loop detection. Keep chains as short as possible.
{:.note.warning}

**Loop Detection** (configured in Settings → Loop Detection) monitors for circular cascading and
blocks updates when a loop is detected. Loop detection reads the object's **version history** at
runtime (it is not stored in NVS). See [Troubleshooting]({{ site.baseurl }}/Built-In/Property-Calculator/Troubleshooting/) for details.

### Example Configuration

```text
Update Related Objects:
  - "Update Parent Invoice"
    Related Object:
      Reference: Direct
      Property: PD.ParentInvoice
    Update delay (minutes): 0
    Trigger Mode: ❌
    Conditions:
      - Type: Changed Propertyvalues
        Value Changed: Propertyvalue Changed
        Properties: PD.Amount, PD.Quantity

  - "Update All Customer Invoices"
    Related Object:
      Reference: Indirect
      Object Type: Invoice
      Property: PD.Customer (on the target objects)
    Update delay (minutes): 30  (could be many invoices — coalesce bursts)
    Trigger Mode: ❌
    Conditions:
      - Type: Changed Propertyvalues
        Value Changed: Propertyvalue Changed
        Properties: PD.CustomerAddress, PD.CustomerName
```

## The Processing Pipeline

Background related-object updates flow through a **three-tier pipeline**. This design keeps the system
responsive and bounded even when a single change (or a mass import) generates tens of thousands of
pending updates.

In plain terms: normally your update runs within moments of the triggering change. If a lot of updates
pile up at once — a mass import, say — they wait safely in a holding area instead of slowing the vault
down. And if a specific object's update keeps failing over an extended period, it is set aside so an
administrator can investigate and manually re-trigger it once the underlying problem is fixed.

An event handler or automatic rule enqueues an update into **Tier 1 — the Hot Queue** (VAF task queue
`PropertyCalculatorV3`, task type `UpdateRelatedObjectNow`), which processes updates one at a time and
deduplicates them via the cleanup processor. When more than 2,000 updates are waiting, the excess
spills into **Tier 2 — the Cold Overflow Buffer**, a segmented, NVS-backed FIFO with two chains — Fresh
(not yet failed) and Retry (failed, backing off) — bounded at 100,000 objects, which drains fresh
entries first and then due retries back into completed updates. If an object's update keeps failing
until the retry window (14 days) is exhausted, it moves to **Tier 3 — the Dead-Letter archive** (an NVS
archive keyed `"type,id"`), where an administrator fixes the cause and re-queues it from the NVS
Browser.

### Tier 1 — Hot Queue

- Related-object updates land here first and are processed one at a time.
- Enqueuing an update from the event handler is very fast, so check-ins are not slowed down.
- The queue stays fast **while it is bounded**. Past a few thousand waiting updates, processing
  slows down — which is exactly why the overflow buffer exists.
- **Deduplication:** a cleanup pass periodically scans the waiting updates and keeps exactly **one**
  waiting update per target object, cancelling the rest. When merging, a Trigger-Mode update is
  preferred, then the earliest activation time.
- **Throttle-bounce:** if an update finds the object was modified too recently (see the throttling
  setting under [Immediate-update throttling](#immediate-update-throttling)), it is re-queued for
  later instead of counting as a failure.

The hot queue is a VAF **Sequential** task queue with ID `PropertyCalculatorV3`. Related-object updates use the task type `UpdateRelatedObjectNow` and are processed one at a time by `UpdateObjectBG`. The deduplication cleanup pass scans waiting `UpdateRelatedObjectNow` tasks in batches of 5 000. The throttle-bounce check is driven by the `DisableImmediateUpdateIfModifiedIn` setting.
{:.note}

### Tier 2 — Cold Overflow Buffer

- When the hot queue exceeds **2 000** waiting updates, a cleanup pass **spills** the excess waiting
  updates into a **segmented, bounded holding buffer** and cancels them from the hot queue. Once
  spilling starts, it moves the whole waiting update backlog out of the hot queue.
- The buffer has **two chains**:
  - **Fresh chain** — spilled work that has not failed yet. Drained at full speed.
  - **Retry chain** — spilled work that is already failing, held back on an escalating back-off
    schedule so retries are time-gated without slowing the whole processor.
- The buffer is **bounded**: 10 000 entries per segment, at most 10 live segments →
  **100 000 objects** hard cap. An early warning fires at **80 000** objects on the status object and
  dashboard.

  These structural limits (segment size 10 000, max 10 segments, 100 000-object hard cap, 80 000-object warning) are fixed constants, not configuration.
  {:.note}

- When the buffer is full and the hot queue still has excess, behaviour follows the
  **"When the overflow buffer is full"** setting:
  - **Block new updates** (default) — the triggering operation (check-in, import, rule run) fails so
    nothing is left stale, but it does not succeed until the backlog drains.
  - **Drop excess updates** — operations keep succeeding, but the oldest excess updates are dropped
    (logged) and those objects stay un-recalculated until a later trigger or full rescan.

The overflow buffer is NVS-backed. The spill threshold is `TaskQueueSpillThreshold` (default 2 000; spill target 0). Retry-chain entries carry `AttemptCount`, `FirstFailureUtc`, and `NextAttemptUtc`.
{:.note}

By design, failures in the cold buffer **never** flow back to the hot queue. During a mass failure event that would otherwise dump ~100 000 failed tasks back into the hot queue and recreate the slowdown. Cold failures are rescheduled within the retry chain or dead-lettered.
{:.note}

### Tier 3 — Dead-Letter

- When an object's update keeps failing for longer than the **dead-letter window** (`DeadLetterAfterDays`,
  default **14 days** measured from the first failure), it is moved to the **dead-letter** NVS archive,
  keyed by `"objectTypeId,objectId"` (so repeated failures of the same object don't duplicate).
- Dead-lettered objects are listed on the dashboard's queue status and (when enabled) in the Status
  Report. An administrator fixes the root cause and **re-queues** the object from the **NVS Browser**.
- The archive is capped (`MaxDeadLetterEntries`, default 10 000). When full, further permanent
  failures are only logged.

## The Three Recurring Background Processors

Unlike a single monolithic loop, Property Calculator runs **three independent recurring processors**,
each on its own VAF queue and its own schedule. This keeps slow work from blocking fast work.

| Processor (task type) | Queue | Default frequency | What it does (phase order) |
|-----------------------|-------|-------------------|-----------------------------|
| **Automatic Update** (`UpdateObjectsRecurringBackgroundOperation`) | `PropertyCalculatorScheduled` | every **5 min** | 1) run due Automatic Object Update rules (cursor-based); 2) drain the overflow buffer (fresh, then due retry) and refresh the overflow alert; 3) report stuck-object status; 4) if work remains and progress was made, enqueue one more immediate pass |
| **State Transition** (`ProcessStateTransitionsRecurring`) | `PropertyCalculatorStateTransitions` | every **5 min** | run recurring state-transition scans; if a scan hit its cap, enqueue one more immediate pass |
| **Queue Cleanup** (`DedupRelatedObjectTasks`) | `PropertyCalculatorCleanup` | every **5 min** | 1) deduplicate waiting hot-queue update tasks; 2) spill the excess to the overflow buffer; 3) report the overflow alert **only when a spill occurred** (an idle pass reads nothing — the drain phase keeps the alert current) |

All three frequencies are configurable under **Settings → Background Update** (see
[Configuration]({{ site.baseurl }}/Built-In/Property-Calculator/Configuration/)).

In parallel with these recurring processors, the **hot queue** (`PropertyCalculatorV3`) executes
individual due tasks one at a time:

| Task type | Processor method | Purpose |
|-----------|------------------|---------|
| `UpdateRelatedObjectNow` | `UpdateObjectBG` | Apply background-safe rules to one related object and save |
| `CreateObjectsBO` | `CreateObjectsBG` | Perform one queued background object creation |
| `StateTransitionTask` | `ProcessStateTransition` | Perform one real-time state transition |

Each Automatic Update run processes one page (500 objects) per rule — all scheduled rules advance round-robin — and drains up to 500 objects from the overflow buffer, so a large backlog is worked down over several runs rather than in one long transaction. The page size is fixed (not configurable) so a single run cannot blow up memory. Any rule still in progress (or a non-empty overflow buffer) re-triggers the run automatically.
{:.note}

## Automatic Object Updates

Scheduled operations that periodically search for objects and trigger recalculation on them.
Configured under **Background Operations → Automatic Object Updates**.

### When to Use

- **Periodic maintenance:** recalculate expiry statuses nightly
- **Bulk corrections:** fix data across all objects after a configuration change
- **Time-dependent calculations:** update "days until deadline" properties daily
- **External data sync:** recalculate values that depend on data changing outside M-Files

### How It Runs

Each rule is executed **cursor-based** by `AutomaticObjectUpdater`:

1. Objects are searched in **object-ID order** (`ObjectID > LastProcessedId`), filtered by the rule's
   object type, `deleted = false`, and the rule's configured search conditions.
2. Up to **500** objects are processed per batch; additional **Filtering Conditions** are applied
   in-process after the search.
3. Matching objects are recalculated and saved directly (background-safe modes only — see
   [Background Processing and Side-Effect Modes](#background-processing-and-side-effect-modes)).
4. The **cursor** (`LastProcessedId`) and progress counters are persisted to NVS after each batch, so
   a rule resumes exactly where it left off after a server restart or a pause.
5. Objects that fail are re-queued into the hot queue as `UpdateRelatedObjectNow` tasks for retry.

The rule's configuration is **snapshotted at run start** (`RunningConfigJson`), so editing the rule
mid-run does not change the in-progress cycle — the change takes effect on the next cycle.

### Configuration

| Setting | Type | Description |
|---------|------|-------------|
| **Name** | Text | Display name for this rule |
| **Rule Key** | Text | Unique identifier (used internally and shown on the dashboard) |
| **Recurring Update** | Toggle | ON: runs on schedule repeatedly. OFF: runs once and stops. |
| **Schedule Type** | Dropdown | How often to run (see below) |
| **Object Type** | M-Files Type | Which object type to search |
| **Conditions** | Search Conditions | M-Files search conditions to find target objects |
| **Filtering Conditions** | List | Additional Property Calculator conditions applied after the search |
| **Trigger Mode** | Toggle | When ON: always creates a new version, even if no values change |

### Rule Status Lifecycle

A rule's execution state (stored in NVS) is always one of:

| Status | Meaning |
|--------|---------|
| **Stopped** | Not running. **New rules are created Stopped** when the configuration is saved — you must start them from the dashboard. |
| **In Progress** | Currently searching/updating. (Displayed as "Running" / "In Progress" on the dashboard.) |
| **Paused** | Temporarily suspended until `PausedUntilUtc`; resumes automatically when that time passes (dashboard Pause defaults to 24 h). |
| **Completed** | Finished. A **recurring** rule restarts a fresh cycle when its schedule is next due; a **one-time** rule stays Completed. |

Pausing or stopping is **not** a hard interrupt: the current batch finishes, then the cursor is saved
and the rule pauses/stops — no progress is lost.

### Schedule Types

| Type | Description | Example |
|------|-------------|---------|
| **Every Cycle** | Runs continuously — as soon as one cycle finishes, the next begins | Use for one-time bulk operations |
| **Every X Hours** | Runs at fixed intervals | `Every 24 hours` for daily updates |
| **Cron** | Standard 5-field CRON expression for precise scheduling | `0 2 * * *` = every day at 2:00 AM |

The CRON scheduler is *catch-up aware* — if a scheduled time passed while the recurring processor was between wake-ups, the rule is still considered due and runs on the next pass.
{:.note}

#### CRON Expression Format

A CRON expression has five space-separated fields, in order: minute (0-59), hour (0-23), day of month
(1-31), month (1-12), and day of week (0-6, where 0 is Sunday).

**Common CRON examples:**

| Expression | Schedule |
|------------|----------|
| `0 2 * * *` | Every day at 2:00 AM |
| `0 */6 * * *` | Every 6 hours |
| `0 8 * * 1` | Every Monday at 8:00 AM |
| `0 0 1 * *` | First day of every month at midnight |
| `0 22 * * 1-5` | Weekdays at 10:00 PM |

### Filtering Conditions

After the search finds matching objects, **Filtering Conditions** provide additional filtering using
Property Calculator's condition system (all 8 condition types). Useful when:

- You need conditions M-Files search doesn't support (regex, property comparison, etc.)
- You want to combine M-Files search with advanced logic
- You need to filter based on calculated values

### Managing Rules on the Dashboard

Background update rules are started, paused, resumed, stopped, and previewed from the dashboard. See
[Dashboard]({{ site.baseurl }}/Built-In/Property-Calculator/Dashboard/) for the full control reference, and
"[Adding a New Automatic Object Update Rule]({{ site.baseurl }}/Built-In/Property-Calculator/Dashboard/#adding-a-new-automatic-object-update-rule)"
for the config-to-dashboard workflow.

### Example Configuration

```text
Automatic Object Updates:
  - "Daily Contract Expiry Check"
    Rule Key:     contract-expiry
    Recurring:    ✅
    Schedule:     Cron: 0 6 * * *  (daily at 6:00 AM)
    Object Type:  Contract
    Conditions:   Class = Contract AND Status = Active
    Filtering:    (none)

  - "Weekly Invoice Recalculation"
    Rule Key:     invoice-recalc
    Recurring:    ✅
    Schedule:     Cron: 0 2 * * 0  (every Sunday at 2:00 AM)
    Object Type:  Invoice
    Conditions:   Class = Invoice AND Created after 2026-01-01
    Filtering:    (none)

  - "One-Time Data Migration"
    Rule Key:     data-migration-v2
    Recurring:    ❌
    Schedule:     Every Cycle (runs as fast as possible)
    Object Type:  Document
    Conditions:   Class = Document AND PD.MigrationFlag is empty
    Filtering:
      - Type: Match with RegExp
        Value: %PROPERTY_{PD.LegacyCode}%
        RegExp: ^[A-Z]{2}-\d{4}$
```

## Automatic State Transitions

Background operations that automatically change the workflow state of objects when conditions are met.
Configured under **Background Operations → Automatic State Transitions**.

There are **two execution paths** that share the same configuration:

| Path | How it runs | Best for |
|------|-------------|----------|
| **Recurring scan** | The `ProcessStateTransitionsRecurring` processor scans configured workflows/object types every 5 min (configurable) and applies matching transitions | The safety-net / batch path; always eventually processes everything |
| **Real-time** | When an object changes, the event handler evaluates transitions marked *Run in Realtime* and enqueues a `StateTransitionTask` for prompt execution | Immediate transitions right after a user's change |

### Scheduling & Back-pressure

- Each transition tracks its **own schedule** internally (last-run time and count), independently of
  every other transition. The recurring scanner honours each transition's individual schedule.
- **Force run:** a dashboard/manual trigger sets a force-run flag so the transition runs on the next
  pass regardless of schedule or back-off; the flag is cleared once it has run.
- **Search cap:** a recurring scan processes up to **500** objects per object type per pass. If it hits
  the cap, it does not advance that transition's schedule and the processor may enqueue another
  immediate pass (bounded to avoid piling up).
- **Real-time back-pressure:** if at least **300** (default) state-transition tasks are already
  waiting, new real-time transitions are skipped and left for the recurring scanner. Set to 0 to always
  launch real-time transitions.

Each transition's schedule is tracked in NVS, keyed by the transition's `ArrayElementGuid`. The force-run flag is stored as `StateTransitionForce` in NVS. The real-time back-pressure cap is the `MaxRealtimeTransitionQueueSize` setting.
{:.note}

### Configuration

| Setting | Type | Description |
|---------|------|-------------|
| **Activated** | Toggle | Enable/disable state transitions |
| **Workflows** | List | Workflow transition rules |

### Workflow Transition Rules

Each workflow entry defines:

| Setting | Description |
|---------|-------------|
| **From State** | The current workflow state to match |
| **To State** | The target state to transition to |
| **Change Workflow** | *(Optional)* Switch to a different workflow during transition (target workflow + state) |
| **Conditions** | When to trigger the transition |

### Example

```text
Automatic State Transitions:
  Activated: ✅

  Workflows:
    - "Auto-approve small invoices"
      From State:  Pending Approval
      To State:    Approved
      Conditions:  PD.InvoiceTotal < 500

    - "Archive expired contracts"
      From State:  Active
      To State:    Archived
      Conditions:  PD.EndDate < today
```

## Retry, Back-off & Dead-Letter

A single, shared **retry policy** governs failures in both the hot queue and the cold overflow buffer,
so failed background updates behave consistently no matter which tier they were in.

### How a failure is handled

1. When a background update fails (an error, or a target that stays checked out), the failure is
   registered with `RetryPolicy`.
2. The decision is based on **elapsed time since the first failure** (`FirstFailureUtc`), not raw
   attempt count:
   - **Within the dead-letter window** → **retry** with the next escalating back-off delay.
   - **Past the window** → **dead-letter** (give up and archive).
3. Retry back-off intervals come from `RetryBackoffMinutes` (default `15,60,300,1440` = 15 min → 1 h →
   5 h → then every 24 h; the last value repeats).
4. Hot-queue retries are re-queued as new `UpdateRelatedObjectNow` tasks; cold-buffer retries move
   into the **retry chain** with a `NextAttemptUtc`.

### Settings

| Setting | Default | Description |
|---------|---------|-------------|
| **Retry back-off (minutes)** | `15,60,300,1440` | Comma-separated escalating back-off intervals; the last value repeats |
| **Dead-letter after (days)** | `14` | How long an update is retried before being dead-lettered (measured from first failure) |
| **Max dead-letter entries** | `10000` | Cap on the dead-letter archive; when full, further permanent failures are only logged |

### What "stuck" means

An object counts as **stuck** when it is failing:

- a hot-queue `UpdateRelatedObjectNow` task with `AttemptCount > 0`, **or**
- an entry in the overflow **retry** chain, **or**
- an entry in the **dead-letter** archive.

The dashboard's **Stuck** count and the Status Report aggregate all three. The
**Stuck Threshold (hours)** setting only affects **display/reporting** — it controls how old a
retryable stuck item must be before it is *shown* (dead-letter entries are always shown), it does not
control when an object becomes stuck.

## Global Related Object & Background Settings

Configured under **Settings → Update Related Objects** and **Settings → Background Update**. These
control the global behaviour of related-object updates and the background pipeline.

### Immediate-update throttling

| Setting | Default | Description |
|---------|---------|-------------|
| **Do not update immediately if modified in past (seconds)** (`DisableImmediateUpdateIfModifiedIn`) | `300` | Defer a background related-object update when the object was re-versioned **by the server** within this window, to avoid piling up unnecessary server versions. User edits do not count. Set to 0 or negative to disable. |
| **Version offset for modification check** (`VersionOffsetForModificationCheck`) | `1` | How many recent **server-made** versions (within the window above) to allow before deferring. `1` (default) defers as soon as the newest version is a recent server version; `2`–`3` tolerates one or two recent server versions before deferring — useful when another vault application also versions the same objects. Minimum 1. |

**How it decides:** the throttle walks the object's versions newest-first, counting **server-made**
versions (`LastModifiedBy` = the M-Files server) that fall within the window, and **stops at the first
user edit** (or the first version older than the window). If that count reaches the tolerance above,
the background update is deferred and re-queued; otherwise it proceeds. User edits never cause a
defer. With the default tolerance of 1 only the already-loaded **newest version** is inspected, so the
common case adds no extra vault reads; higher tolerances fetch a few older versions lazily (bounded by
the tolerance).

### Pipeline & retry settings

| Setting | Default | Description |
|---------|---------|-------------|
| **Automatic object update frequency** | 5 min | How often the Automatic Update processor runs |
| **Automatic state transition frequency** | 5 min | How often the recurring state-transition processor runs |
| **Update queue cleanup frequency** | 5 min | How often the cleanup/dedup/spill processor runs |
| **Max number of objects to update in one run** | 500 | Per-run object budget (per phase) |
| **When the overflow buffer is full** | Block new updates | `Block new updates` or `Drop excess updates` (see [Tier 2 — Cold Overflow Buffer](#tier-2-cold-overflow-buffer)) |
| **Max real-time state transitions in queue** | 300 | Back-pressure cap for real-time transitions |
| **Retry back-off (minutes)** | `15,60,300,1440` | Escalating retry intervals |
| **Dead-letter after (days)** | 14 | Retry window before dead-lettering |
| **Max dead-letter entries** | 10000 | Dead-letter archive cap |

### Why throttling and spilling matter

Without these mechanisms, a burst like this could overwhelm the vault: a user saves three invoice
lines within two seconds, and each save triggers its own Invoice update.

Throttling collapses rapid repeat-updates on the same object; deduplication keeps only one waiting
task per object; and if the backlog still grows past the hot-queue bound, spilling moves it into the
bounded overflow buffer — so the vault stays responsive even under mass changes.

See [NVS Namespaces]({{ site.baseurl }}/Built-In/Property-Calculator/NVS-Namespaces/) for exactly which Named Value Store namespaces back each of these mechanisms and when they are read/written.
{:.note}
