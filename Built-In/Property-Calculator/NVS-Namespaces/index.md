---
layout: page
title: Property Calculator Named Value Storage Namespaces
includeInSearch: true
breadcrumb: NVS Namespaces
excerpt: This page catalogs every Named Value Storage namespace that Property Calculator uses at runtime, describing what each one contains and when it is written, read, and cleared.
---

Most admins will never need this page for routine work. It's a reference for deep diagnostics — for when M-Files support, or [Troubleshooting]({{ site.baseurl }}/Built-In/Property-Calculator/Troubleshooting/), points you at a specific namespace. If you're troubleshooting a problem, start with [Troubleshooting]({{ site.baseurl }}/Built-In/Property-Calculator/Troubleshooting/); come here only once you need the exact internal storage detail behind it.
{:.note}

Property Calculator persists its runtime state in the M-Files **Named Value Store (NVS)** — a per-vault key/value store. This document describes **every** namespace the application uses: what it contains, when it is **written**, when it is **read**, and how entries are cleared. Use it together with the **NVS Browser** on the dashboard (see [Dashboard]({{ site.baseurl }}/Built-In/Property-Calculator/Dashboard/)).

NVS holds internal application state. Editing values directly in the NVS Browser can disrupt background processing. Only modify values when you understand their purpose (the most common safe action is **re-queuing a dead-lettered object** or clearing a stale entry).
{:.note.warning}

## At a Glance

All Property Calculator namespaces use the NVS type **`MFConfigurationValue`** (except the application configuration namespace, which the NVS Browser surfaces as `MFSystemAdminConfiguration`).

| # | Namespace (constant) | Value | Contains |
|---|----------------------|-------|----------|
| 1 | `MFiles.ConsultingPropertyCalculator.DeadLetter` | `MFConfigurationValue` | Objects that exhausted their retry window |
| 2 | `MFiles.ConsultingPropertyCalculator.RuleExecution` | `MFConfigurationValue` | Automatic Object Update rule state (cursor, status, counters) |
| 3 | `MFiles.ConsultingPropertyCalculator.StateTransition` | `MFConfigurationValue` | Per-transition last-run schedule state |
| 4 | `MFiles.ConsultingPropertyCalculator.StateTransitionForce` | `MFConfigurationValue` | Force-run flags for state transitions |
| 5 | `MFiles.ConsultingPropertyCalculator.OverflowControl` | `MFConfigurationValue` | Overflow-buffer control records + flags |
| 6 | `MFiles.ConsultingPropertyCalculator.Overflow.Fresh.<slot>` | `MFConfigurationValue` | Overflow **fresh** chain segments |
| 7 | `MFiles.ConsultingPropertyCalculator.Overflow.Retry.<slot>` | `MFConfigurationValue` | Overflow **retry** chain segments |
| 8 | `ConsultingPropertyCalculator.VaultApplication` | `MFSystemAdminConfiguration` | The application's saved configuration |

*Loop detection* and *version-velocity* checks are **not** persisted — they read the object's version history at runtime (`LoopDetector`). The old `PropertyCalculator.StuckQueue` and `PropertyCalculator.ObjectUpdateQueue` namespaces **no longer exist**; the backlog now lives in the VAF hot task queue plus namespaces 1, 5, 6 and 7 above.
{:.note}

## 1. Dead-Letter

**`MFiles.ConsultingPropertyCalculator.DeadLetter`**

Holds objects whose background update failed repeatedly and exhausted its retry window (default 14 days) — these are treated as permanently failed until an admin steps in.

**Admin action:** Use the dashboard's **Retry Dead-Letter** action to re-queue an object (this removes it from the archive) once you've fixed the underlying cause. This namespace is also what the dashboard queue status and the Status Report count as dead-lettered.

**Internal reference (support use only):**

| Aspect | Detail |
|--------|--------|
| **Owned by** | `DeadLetterStore` |
| **Key** | `"objectTypeId,objectId"` — self-deduplicating (repeated permanent failures of the same object reuse the same key) |
| **Value** | `"utcTimestamp;reason"` |
| **Written when** | A background update's retry window (`DeadLetterAfterDays`, default 14 days) is exhausted, in either the hot-queue path (`UpdateObjectBG`) or the overflow-drain path (`OverflowDrainer`). Both go through the shared `RetryPolicy`, which calls `DeadLetterStore.Record` only when it decides *dead-letter*. |
| **Read when** | Dashboard queue-status counting and the Status Report (`BacklogHealthReader`); browsing the namespace in the NVS Browser. |
| **Cleared when** | An administrator uses **Retry Dead-Letter** (re-queues the object and removes the key) or deletes/edits the key in the NVS Browser. Capped at `MaxDeadLetterEntries` (default 10 000); when full, new permanent failures are only logged, not archived. |

## 2. Rule Execution State

**`MFiles.ConsultingPropertyCalculator.RuleExecution`**

Tracks each Automatic Object Update rule's run state — its status (Running/Paused/Stopped), its progress cursor, and its counters. This is what the dashboard's rule rows are built from.

**Admin action:** If a rule's state looks stuck or incorrect, prefer the dashboard **Stop** → **Start** over editing this namespace directly.

**Internal reference (support use only):**

| Aspect | Detail |
|--------|--------|
| **Owned by** | `RuleExecutionManager` / `RuleExecutionState` |
| **Key** | The rule's `Key` (from the Automatic Object Update configuration) |
| **Value** | `RuleExecutionState` JSON: `Key`, `Name`, `Status`, `LastProcessedId` (the cursor), `TotalProcessed`, `TotalSkipped`, `TotalSearched`, `StartedUtc`, `LastCompletedUtc`, `PausedUntilUtc`, `RunningConfigJson` (config snapshot for the running cycle), `ObjectTypeId`, `TriggerMode`, `EstimatedObjectCount`, `EstimatedAtUtc`, `PendingDeletion` |
| **Written when** | After each processed batch (cursor + counters); on Start / Pause / Resume / Stop / Update-Preview dashboard actions; when the configuration is saved (new rules are registered as **Stopped**); when a rule is marked pending-deletion. |
| **Read when** | The scheduler decides which rules to run (`GetRulesToRun`); the dashboard renders rule rows and registers commands; the NVS Browser. |
| **Cleared when** | A rule is removed from the configuration **and** is not running/paused; a pending-deletion rule is stopped; completed orphan states are cleaned up after 7 days. |

## 3. State Transition Schedule

**`MFiles.ConsultingPropertyCalculator.StateTransition`**

Records when each Automatic State Transition last ran (and how many objects it transitioned), so the scheduler knows what's due next.

**Admin action:** If you remove a state-transition rule from the configuration, its row here is not cleaned up automatically — delete it manually in the NVS Browser if you want to tidy up stale entries.

**Internal reference (support use only):**

| Aspect | Detail |
|--------|--------|
| **Owned by** | `StateTransitionScheduleStore` |
| **Key** | The transition's `ArrayElementGuid` |
| **Value** | `"timestamp"` (legacy) / `"timestamp;count"` / `"timestamp;count;backoffUntil"` — the last background-scan time, count transitioned, and optional back-off marker |
| **Written when** | The recurring state-transition processor flushes per-transition run timestamps/counts after a scan. |
| **Read when** | The transition scheduler checks whether a transition is due (honouring per-transition schedule and back-off); the dashboard shows last/next run; the NVS Browser. |
| **Cleared when** | No automatic cleanup for removed transitions — stale rows persist until manually deleted in the NVS Browser. |

## 4. State Transition Force-Run Flags

**`MFiles.ConsultingPropertyCalculator.StateTransitionForce`**

Marks a state transition to run on the next background pass immediately, regardless of its normal schedule — this is what a dashboard/manual force-run action writes. It is removed automatically once the forced run has been processed, so there's normally nothing to do here.

**Internal reference (support use only):**

| Aspect | Detail |
|--------|--------|
| **Owned by** | `StateTransitionScheduleStore` |
| **Key** | The transition's `ArrayElementGuid` |
| **Value** | `"1"` (a flag) |
| **Written when** | A dashboard/manual **force-run** request is made (`RequestForceRun`), so the transition runs on the next background pass regardless of its schedule or back-off. |
| **Read when** | The scheduler's "should run" override checks. |
| **Cleared when** | Automatically removed after the forced transition has been processed. |

## 5. Overflow Control

**`MFiles.ConsultingPropertyCalculator.OverflowControl`**

A small set of control keys that govern the cold overflow buffer: whether draining is administratively paused, whether the buffer has hit its hard cap, and (internally) where each chain currently starts and ends.

**Admin action:** Use the dashboard's overflow panel to pause/resume draining rather than editing the `paused` flag directly.

**Internal reference (support use only):**

| Key | Value | Purpose |
|-----|-------|---------|
| `fresh` | JSON `{h,t,o}` | Fresh-chain control record: head index, tail index, intra-segment head offset |
| `retry` | JSON `{h,t,o}` | Retry-chain control record (same shape) |
| `paused` | `"1"` / `"0"` | Whether overflow draining is administratively paused |
| `full` | `"1"` / `"0"` | Whether the buffer has hit its hard cap |
| `ringv1` | `"1"` | One-time migration marker for the ring-namespace layout |

| Aspect | Detail |
|--------|--------|
| **Owned by** | `OverflowStore` |
| **Written when** | Head/tail/offset change on append, delete, or compaction; `SetPaused` / `SetFull` toggles; migration sets `ringv1`. |
| **Read when** | Every overflow operation; `TaskLauncher` checks the cached `full` flag for producer-side back-pressure; the dashboard overflow panel; the NVS Browser (which uses the control record to list live segment namespaces). |
| **Cleared when** | Control keys persist (they are overwritten in place, e.g. `full` flips between `"0"`/`"1"`), not deleted. |

## 6 & 7. Overflow Segment Chains

**`MFiles.ConsultingPropertyCalculator.Overflow.Fresh.<slot>`** and **`MFiles.ConsultingPropertyCalculator.Overflow.Retry.<slot>`**

Together these hold the work items currently sitting in the cold overflow buffer: **Fresh** for work that hasn't failed yet (drained at full speed), and **Retry** for work that has previously failed and is waiting for its next scheduled attempt, ordered so only *due* entries are processed. The buffer is spread across a bounded number of these namespaces so storage stays capped regardless of backlog size.

**Structural limits (fixed constants):** 10 000 entries per segment · at most 10 live segments across both chains · 100 000-object hard cap · 80 000-object early warning.

**Admin action:** Inspect what's queued via the NVS Browser or the dashboard's overflow panel — see [Common Administrative Tasks](#common-administrative-tasks) below.

**Internal reference (support use only):**

| Aspect | Detail |
|--------|--------|
| **Owned by** | `OverflowStore` / `OverflowSpiller` / `OverflowDrainer` |
| **Namespace naming** | Each segment is its own namespace, named as the prefix plus a physical **slot** number (`logicalIndex mod 20` — the "ring", 20 physical slots), so the number of physical namespaces stays bounded no matter how much data flows through |
| **Key inside a segment** | `"batch"` (`NVS_overflow_segment_key`) |
| **Value** | JSON array of `OverflowEntry`: `t` (objectTypeId), `o` (objectId), `g` (triggerMode), `a` (attemptCount), `f` (firstFailureUtcTicks), `n` (nextAttemptUtcTicks) |
| **Written when** | `OverflowSpiller` spills excess hot-queue tasks (fresh, or retry if they already had failures); the drainer appends failed entries back to the retry chain; compaction/migration rewrites segments. |
| **Read when** | The drainer reads the head segment (walking it in budget-sized sub-batches via the head offset); `BacklogHealthReader` counts fresh/retry for the dashboard and Status Report; the NVS Browser. |
| **Cleared when** | A segment's `batch` key is removed once the segment is fully consumed, cleared, or migrated. |

## 8. Application Configuration

**`ConsultingPropertyCalculator.VaultApplication`** — the VAF-managed application configuration.

| Aspect | Detail |
|--------|--------|
| **NVS type** | Surfaced as `MFSystemAdminConfiguration` in the NVS Browser |
| **Value** | The full Property Calculator configuration JSON (all Class Groups, Background Operations, Settings, etc.) |
| **Written when** | Saving the configuration in M-Files Admin, or saving this namespace in the NVS Browser (which routes through the VAF `SaveConfiguration` lifecycle rather than a raw write). |
| **Read when** | Application start-up and every configuration reload; the NVS Browser. |
| **Cleared when** | Managed entirely by the VAF configuration lifecycle — do not delete this manually. |

If you enable **Configuration History** (Settings), snapshots of this configuration are kept so you can roll back a change that breaks functionality.
{:.note}

## Common Administrative Tasks

| Task | Where | What to do |
|------|-------|-----------|
| **Re-queue a dead-lettered object** | Dead-Letter namespace | Use the **Retry Dead-Letter** action (removes the key and re-queues the object) after fixing the root cause |
| **Check backlog health** | Dashboard queue status | Reads namespaces 1, 5–7 via `BacklogHealthReader` — no manual NVS editing needed |
| **Reset a stuck Automatic Update rule** | Rule Execution namespace | Prefer the dashboard **Stop** → **Start**; only edit NVS if the state is corrupted |
| **Pause/resume overflow draining** | Overflow Control (`paused`) | Use the dashboard overflow panel rather than editing the flag directly |
| **Inspect what's queued** | NVS Browser | Browse the Overflow segment namespaces (listed dynamically from the control record) |

See [Background Operations]({{ site.baseurl }}/Built-In/Property-Calculator/Background-Operations/) for how these namespaces fit into the processing pipeline, and [Troubleshooting]({{ site.baseurl }}/Built-In/Property-Calculator/Troubleshooting/) for resolving stuck and dead-lettered objects.
{:.note}
