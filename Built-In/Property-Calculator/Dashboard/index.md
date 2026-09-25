---
layout: page
title: The Property Calculator Dashboard
includeInSearch: true
breadcrumb: Dashboard
excerpt: This page describes the Property Calculator dashboard in M-Files Admin — its layout, the queue status header, the automatic object update rules table, and the tools it exposes for managing rules, state transitions, and NCalc expressions.
---

## Dashboard Layout

The dashboard is a single page in M-Files Admin: a logging warning banner (shown only when NLog isn't
configured) at the top, followed by the Queue Status header, the Automatic Object Update Rules table,
and a row of buttons for the NVS Browser, Expression Builder, and Upgrade from Legacy PC — each
described in detail below.

## Queue Status Header

The header shows the current health of the background processing pipeline. The counts combine the
**hot task queue**, the **cold overflow buffer**, and the **dead-letter** archive (see
[Background Operations]({{ site.baseurl }}/Built-In/Property-Calculator/Background-Operations/#the-processing-pipeline)).

| Element | Description |
|---------|-------------|
| **Status Icon** | 📋 OK (green) — normal operation<br>🔶 Busy (orange) — a large backlog is queued<br>⚠️ Warning (red) — stuck / dead-lettered objects detected |
| **Queued** | Objects waiting to be processed = hot-queue waiting update tasks **+** overflow *fresh*-chain entries |
| **Stuck** | Objects that are failing = hot-queue tasks with retries **+** overflow *retry*-chain entries **+** dead-letter entries |
| **🔄 Refresh** | Force-refresh queue status from the Named Value Store |

### What "Stuck" Means

There is no longer a single "stuck queue". An object counts as **stuck** when its background update keeps
failing — a task that has already failed and been retried at least once, an entry in the overflow **retry**
chain, or an entry in the **dead-letter** archive (retries exhausted after `DeadLetterAfterDays`, default
14 days).

The **Stuck Threshold (hours)** setting (default: 24) only affects **display and reporting**: retryable
stuck items are shown once they are older than the threshold, while dead-lettered objects are always
shown. A growing stuck count usually indicates a configuration error causing repeated failures on
specific objects. See [Troubleshooting]({{ site.baseurl }}/Built-In/Property-Calculator/Troubleshooting/) for resolution steps.

## Automatic Object Update Rules Table

This table displays all configured background update rules and their current state.

### Columns

| Column | Description |
|--------|-------------|
| **Status Icon** | 🔄 In Progress, ⏸️ Paused, ✅ Completed, ⏹️ Stopped, ❓ Unknown |
| **Status** | Text status with progress stats (e.g., "In Progress — 150/500 searched, 42 updated, 3 skipped") |
| **Rule Name** | The configured name/key of the rule |
| **Type** | ⟳ Recurring (runs on schedule) or 1x One-time (runs once then stops) |
| **Actions** | Available control buttons (vary by current status) |

### Rule Execution Controls

| Button | Action | Available When |
|--------|--------|----------------|
| **▶ Start** | Begins or restarts rule execution | Stopped, Completed |
| **⏸ Pause** | Pauses rule for 24 hours (resumes automatically after) | In Progress |
| **▶ Resume** | Resumes a paused rule immediately | Paused |
| **⏹ Stop** | Stops rule execution entirely | In Progress, Paused |
| **👁 Update Preview** | Runs a background search to count how many objects match the rule's conditions — does NOT modify any objects | Completed, Stopped |

Use **Update Preview** before starting a rule on a large vault to understand how many objects will be affected.
{:.note}

## Adding a New Automatic Object Update Rule

Rules appear on the dashboard automatically **after you define them in the configuration** and save.
The dashboard is only the *control panel* — the rule itself is created in M-Files Admin.

**Step by step:**

1. Open **M-Files Admin → Applications → PropertyCalculator → Configuration**.
2. Expand **Background Operations → Automatic Object Updates** and add a new entry.
3. Fill in the rule (see [Background Operations]({{ site.baseurl }}/Built-In/Property-Calculator/Background-Operations/#automatic-object-updates)
   for every field):
   - **Name** — display name shown on the dashboard.
   - **Rule Key** — a **unique** identifier (e.g. `contract-expiry`). This is the NVS key for the
     rule's execution state; keep it stable, because renaming it creates a *new* rule and orphans the
     old state.
   - **Recurring Update** — ON for repeating schedules, OFF for a one-time run.
   - **Schedule Type** — Every Cycle / Every X Hours / Cron.
   - **Object Type** + **Conditions** — what to search for.
   - **Filtering Conditions** — optional post-search filtering.
4. **Save** the configuration.
5. Return to the dashboard and press **🔄 Refresh** (or reopen it). The new rule appears with status
   **Stopped** — *new rules never auto-start*.
6. *(Optional)* Click **👁 Update Preview** to count how many objects match before running.
7. Click **▶ Start** to begin. The rule runs on the Automatic Update processor's next pass (starting
   it also triggers an immediate pass).

> **Removing a rule:** delete it from the configuration and save. If the rule is not currently
> running/paused, its execution state is cleaned up; if it is, stop it first from the dashboard.

## Adding a New Automatic State Transition

1. Open **M-Files Admin → Applications → PropertyCalculator → Configuration**.
2. Expand **Background Operations → Automatic State Transitions** and set **Activated** = ON.
3. Add a **Workflow** entry:
   - **From State** → **To State** (and optionally **Change Workflow** for a cross-workflow move).
   - **Conditions** — when the transition should fire.
4. **Save** the configuration.
5. The recurring state-transition processor picks the transition up on its next scan (default every
   5 minutes). Objects that change in real time can transition sooner if the transition is evaluated
   on check-in.

> State transitions do not have per-rule Start/Stop buttons like Automatic Object Updates — they are
> governed by the global **Activated** toggle and each transition's own schedule. A **force run** (when
> available) makes a transition run on the next pass regardless of its schedule.

## Overflow Buffer Panel

When the background backlog is large enough to spill into the **cold overflow buffer**, the dashboard
shows an overflow status panel with the number of buffered objects (fresh + retry), any
warning/full state, and **Pause / Resume** controls for draining.

- **Pause** temporarily stops the buffer from draining (buffered work stays put and is not processed).
- **Resume** re-enables draining.
- A warning appears at **80 000** buffered objects, well before the **100 000**-object hard cap.

See [Background Operations]({{ site.baseurl }}/Built-In/Property-Calculator/Background-Operations/#tier-2-cold-overflow-buffer) for how the
buffer works.

### NVS Browser

Opens the Named Value Store (NVS) browser — a diagnostic tool for viewing and editing the raw
key-value data stored by the application (rule execution state, overflow buffer, dead-letter archive,
state-transition schedules, and the saved configuration).

**When to use:** Diagnostics and administration — most commonly **re-queuing a dead-lettered object**
after fixing its root cause, or inspecting what is buffered. The full namespace reference (what each
namespace contains and when it is read/written) is in
[NVS Namespaces]({{ site.baseurl }}/Built-In/Property-Calculator/NVS-Namespaces/).

> **Warning:** Editing NVS values directly can disrupt background processing. Only modify values if
> you understand their purpose. Prefer dashboard actions (Start/Stop/Pause, overflow Pause/Resume,
> dead-letter Retry) over hand-editing.

### 🔧 Expression Builder

Opens an interactive tool for **building and testing NCalc expressions** before deploying them in your configuration. This is the recommended way to develop and validate expressions.

#### How to Use

1. Click the **🔧 Expression Builder** button on the dashboard
2. A modal dialog opens with two panels:

**Left Panel — Function & Placeholder Reference:**

| Tab | Contents |
|-----|----------|
| **📝 Functions** | Browsable list of all available NCalc functions, organized by category (String, Regex, Date, Math, Logic, Lookup, File, Null, Variables). Clicking a function shows its syntax, description, and examples. |
| **🏷️ Placeholders** | List of system placeholders and vault property placeholders. Click to insert into the expression. Supports dot-notation for chained properties. |

**Right Panel — Expression Editor:**

| Element | Purpose |
|---------|---------|
| **Target Type** | Dropdown to specify expected output type (Text, Integer, Float, Date, Boolean, SSLU, MSLU) |
| **✏️ Expression** | Multi-line text area where you write your expression |
| **Insert** | Inserts selected function/placeholder into the expression |
| **Clear** | Clears the expression |
| **Test** | Evaluates the expression with current test values |
| **🔤 Test Values** | Text area with `key=value` lines — automatically generated from detected placeholders |
| **📊 Result** | Shows evaluation output, result type, and any errors |

**MSLU Aggregation Buttons:**
When you select an MSLU property placeholder and enter "Chain Mode", additional buttons appear:

| Button | Function | Inserts |
|--------|----------|---------|
| **Σ** | Sum | `Sum(%PROPERTY_{A}.PROPERTY_{B}%)` |
| **x̄** | Average | `Avg(%PROPERTY_{A}.PROPERTY_{B}%)` |
| **↓** | Minimum | `ListMin(%PROPERTY_{A}.PROPERTY_{B}%)` |
| **↑** | Maximum | `ListMax(%PROPERTY_{A}.PROPERTY_{B}%)` |
| **#** | Count | `ListCount(%PROPERTY_{A}.PROPERTY_{B}%)` |

#### Test Values — How They Work

When your expression contains placeholders (e.g., `%PROPERTY_{PD.Amount}%`), the Expression Builder:

1. Parses the expression and identifies all placeholders
2. Looks up property definitions in the vault to determine their data types
3. Generates smart default test values based on data type:
   - Integer → `42`
   - Float → `3.14`
   - Date → current date
   - Text → `"Sample text"`
   - Lookup → `1` (ID)
4. Displays them in the Test Values area as `key=value` lines
5. You can edit these values before clicking **Test**

**MSLU test values:** Use semicolons to simulate multiple values:
```text
PROPERTY_{PD.InvoiceLines}.PROPERTY_{PD.Amount} = 100; 200; 350
```

#### ⚠️ Expression Builder Limitations

The Expression Builder runs in a **preview-only sandbox** without a real M-Files object context. This means some features behave differently or are unavailable:

| Feature | In Real Calculation | In Expression Builder |
|---------|--------------------|-----------------------|
| **Property values** | Read from actual object | Uses manual test values |
| **File functions** (`filecount`, `filename`, etc.) | Access real attached files | Returns empty/null — no file context available |
| **`mainObject()` function** | Switches context to the triggering parent object | Acts as passthrough — returns input value unchanged |
| **System placeholders** (`%ID%`, `%OBJTITLE%`, `%VAULTGUID%`) | Resolved to real values | Must be manually defined in test values |
| **`objectguid()` function** | Returns real object GUID | Returns null |
| **Side-effect operations** | Execute normally | **Not executed at all** |

**Operations that DO NOT execute in Expression Builder:**
- ❌ **Create Object** — no objects are created
- ❌ **Send Email** — no emails are sent
- ❌ **File Operations** — no file modifications
- ❌ **Property updates** — no vault changes of any kind

The Expression Builder evaluates the **expression result only** — it shows you what value the expression would produce, but does not perform any vault operations.

For testing expressions that reference chained properties (e.g., `%PROPERTY_{Contract}.PROPERTY_{Value}%`), manually define the full placeholder key in Test Values with semicolon-separated values to simulate multiple related objects.
{:.note}

### 🔄 Upgrade from Legacy PC

A migration utility for users transitioning from the legacy M-Files Property Calculator to the current version. Clicking this button performs an automatic conversion:

- Converts `AND`, `OR`, `NOT` operators to lowercase (`and`, `or`, `not`) — required by NCalc 6.x
- Converts `<>` to `!=`, and rewrites `LIKE` comparisons to the `LIKE()` function
- Migrates the legacy "Comparing to Main Object" condition to an `AdvancedConditions` entry using `mainObject(...)`
- Migrates the legacy `%X.FOREACH%...%X.NEXT%` sum idiom to the `Sum(%X.Y%)` aggregate function
- Migrates the deprecated `Update Immediately` flag on related-object updates to `Update delay (minutes)`
- Generates a stable rule key for background update rules that don't have one yet

`LIKE` wildcard characters (`*`/`?` → `%`/`_`) are **not** converted by this button — they are translated automatically at evaluation time, not as part of the migration.
{:.note}

Review your configuration after migration. While the conversion handles common syntax differences, complex expressions may need manual adjustment. See [Breaking Changes & Upgrade Guide]({{ site.baseurl }}/Built-In/Property-Calculator/Breaking-Changes/) for the full coverage matrix.
{:.note.warning}

### 🛑 Cancel All Waiting Tasks

An administrative backstop for draining the background update queue — for example, after a bulk test
run floods it with tasks you don't want to process. Clicking this button cancels every **waiting** task
across:

- pending related-object updates (both immediate and delayed),
- queued object creations, and
- queued state transitions.

Tasks that are already being processed are not affected, and cancelled updates are not automatically
re-queued — the affected objects will be updated again the next time they (or their sources) are edited.
The action requires confirmation and is logged with the triggering administrator's name and user ID.

## Logging Warning Banner

If no NLog targets are configured for the application, a warning banner appears at the top of the dashboard:

```text
⚠️ No logging targets configured. Application events will not be recorded.
```

Logging is important for diagnosing issues with expressions, conditions, and background operations. Configure NLog targets in the application's logging configuration to enable structured logging.
