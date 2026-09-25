---
layout: page
title: Property Calculator Troubleshooting and Performance
includeInSearch: true
breadcrumb: Troubleshooting
excerpt: This page covers common Property Calculator issues and their solutions, performance optimization tips, and guidance for migrating from the legacy Property Calculator.
---

## Expression Errors

### Syntax Errors

| Error | Cause | Fix |
|-------|-------|-----|
| `Unexpected token` | Malformed expression syntax | Check for unmatched parentheses, missing commas, or typos in function names |
| `Missing closing quote` | Unmatched single quote in string literal | Ensure every `'` has a matching pair. Use `escape()` for strings containing apostrophes. |
| `Unknown function` | Typo in function name | Check spelling — function names are case-insensitive but must be exact |
| `Parameter count mismatch` | Wrong number of arguments to a function | Check the function reference in [NCalc Expressions]({{ site.baseurl }}/Built-In/Property-Calculator/NCalc-Expressions/) |

### Uppercase Logical Operators

**Problem:** Using `AND`, `OR`, `NOT` in expressions causes parsing errors.

**Fix:** NCalc 6.x requires lowercase logical operators:
```text
❌  %PROPERTY_{PD.A}% > 0 AND %PROPERTY_{PD.B}% > 0
✅  %PROPERTY_{PD.A}% > 0 and %PROPERTY_{PD.B}% > 0
```

Use the **Upgrade from Legacy PC** button on the dashboard to automatically convert all operators to lowercase.
{:.note}

### Placeholder Errors

| Error | Cause | Fix |
|-------|-------|-----|
| Property value is always null | Wrong alias, GUID, or ID in placeholder | Verify the property definition exists in the vault and the alias matches exactly |
| Expression returns the placeholder text literally | `Evaluate as Expression` is OFF | Turn ON the toggle for NCalc evaluation |
| `%` operator causes parse error | Using `%` for modulo | Use `Mod()` function instead: `Mod(10, 3)` |

### Type Mismatch Errors

| Error | Cause | Fix |
|-------|-------|-----|
| `Cannot apply operator to types` | Comparing/calculating with incompatible types (e.g., string + number) | Use `toNumber()` or `tostring()` to convert types explicitly |
| Date arithmetic fails | Property returns text instead of DateTime | Use `parseDate()` to convert: `parseDate(%PROPERTY_{PD.DateText}%, 'yyyy-MM-dd')` |
| Lookup comparison fails | Comparing lookup object to string | Use `lookupName()` to extract the display name first |

### Null-Related Errors

| Error | Cause | Fix |
|-------|-------|-----|
| Expression returns null unexpectedly | A property used in the expression is empty | Wrap with `ifNull()` or `coalesce()`: `ifNull(%PROPERTY_{PD.Amount}%, 0)` |
| `Object reference not set` | Chained placeholder resolves through an empty lookup | Add a condition: Changed Propertyvalues or Basic Condition checking the lookup is not empty |

## Loop Detection

### What Causes Loops

Loops occur when related object updates create circular dependencies — Object A's change triggers an
update on Object B, whose change triggers an update back on Object A, and so on indefinitely.

### How Loop Detection Works

Property Calculator monitors three indicators:

1. **State chain detection:** If the same workflow state is reached again in rapid succession within the configured time window
2. **Version velocity:** If an object accumulates more than `MaxVersionsPerDay` server-created versions in 24 hours (default: 20). Only versions created by the M-Files server (user ID < 0) count, not real users.
3. **Periodic full check:** Every N versions (default: 100), a full history check is performed

Loop detection reads the object's **version history** directly at runtime — it is **not** stored in the Named Value Store. There is no persistent "looping" flag to clear.
{:.note}

### When Loop Detection Triggers

1. The offending update or state transition is **skipped**
2. A warning/error is logged (and surfaced via the Status Report if enabled)
3. The object may appear as "stuck" on the dashboard if its updates keep being retried

### Resolution

1. **Identify the loop:** Check the object's version history — you'll see rapid server-created versions
2. **Break the cycle in configuration:** Adjust related object update conditions:
   - Add a "Changed Propertyvalues" condition so updates only fire when relevant values actually change
   - Remove unnecessary cascading chains
   - Use one-directional updates instead of bidirectional

   Because loop detection is based on live version history (not a stored flag), the object recovers on
   its own once the runaway versioning stops — there is nothing to "unflag".

### Tuning Loop Detection

| Setting | Default | When to Increase | When to Decrease |
|---------|---------|-----------------|-----------------|
| **State chain time window** | 30s | Legitimate workflows with rapid state changes | Want faster loop detection |
| **Full loop check every N versions** | 100 | Performance-sensitive vaults | Want more thorough detection |
| **Max server versions per 24h** | 20 | Bulk import scenarios, migration operations | Want stricter loop prevention |

## Stuck Objects

### What "Stuck" Means

An object counts as **stuck** when its background update keeps **failing** — either an error or a
target object that stays checked out. There is **no** dedicated "stuck queue"; failing work lives in
one of three places in the processing pipeline (see
[Background Operations]({{ site.baseurl }}/Built-In/Property-Calculator/Background-Operations/#the-processing-pipeline)):

1. A hot-queue update that has already been retried at least once.
2. An entry in the cold overflow buffer's **retry** chain.
3. An entry in the **dead-letter** archive, once retries are exhausted.

For the exact internal storage locations behind each of these — useful when M-Files support asks you to check a specific value in the NVS Browser — see [NVS Namespaces]({{ site.baseurl }}/Built-In/Property-Calculator/NVS-Namespaces/).
{:.note}

### Stuck / Failing Object Lifecycle

An update starts out **Waiting**; if it runs and succeeds it's **Done**. A failure moves it into
**Retrying** with an escalating back-off (spilling into the overflow buffer if the hot queue has too
much waiting work), where it keeps cycling between due-and-retry and fail-and-back-off. Once the
retry window is exhausted (14 days from the first failure), it moves to **Dead-Letter**, where it sits
until an administrator fixes the underlying cause and re-queues it from the NVS Browser, sending it
back to Waiting.

### Background Processing — Three Recurring Processors

Property Calculator runs **three independent recurring processors** (Automatic Update, State
Transition, and Queue Cleanup), each on its own schedule (not one monolithic cycle). See
[Background Operations]({{ site.baseurl }}/Built-In/Property-Calculator/Background-Operations/#the-three-recurring-background-processors)
for what each one does and how often it runs by default.

The **hot queue** executes individual related-object updates in parallel with these processors. The
same background rule engine is used everywhere, so all calculation modes behave identically. The
side-effect modes (Send Email, Create Object, File Operation) are not run by the background engine
directly, but they still execute via the object's re-fired check-in handler when the background
update re-saves the object (see [Background Operations]({{ site.baseurl }}/Built-In/Property-Calculator/Background-Operations/#how-side-effects-still-run)).

### StuckThresholdHours — What It Really Controls

The `StuckThresholdHours` setting (default: 24) does **not** control when an object becomes stuck. It
controls:
- **Dashboard display:** retryable stuck items are only shown once they are older than the threshold
  (dead-lettered objects are always shown).
- **Status Reporting:** only objects older than the threshold are included in the status report.

### Common Causes

| Cause | Resolution |
|-------|-----------|
| Expression error on specific object | Fix the expression or add conditions to skip the problematic case |
| Missing property on object | Ensure the property exists or use `isNull()`/`coalesce()` for safety |
| Circular related object updates | See [Loop Detection](#loop-detection) |
| Object locked by another process | Wait for the lock to release, or check for conflicting automations |
| Vault extension timeout | The calculation is too complex — simplify or split into multiple steps |

### How to Find Stuck Objects

1. Check the **dashboard Queue Status** — the stuck count is displayed
2. Enable **Status Reporting** in General Settings — writes stuck object IDs to a vault object's Comment property
3. Check application logs for error messages related to specific objects

### Status Reporting

Enable **Status Reporting** in General Settings to have Property Calculator write a human-readable
summary of stuck and dead-lettered objects to a designated vault object's **Comment property**, so it
is visible from an M-Files view or can drive a notification. See
[Configuration]({{ site.baseurl }}/Built-In/Property-Calculator/Configuration/#status-reporting) for how to configure the target object and
optional boolean flags.

- **Routine updates:** Throttled to once per 24 hours to prevent version bloat
- **Error detection:** Updates immediately when new errors are detected

### Resolution Steps

1. Identify the stuck object (from dashboard, status report, or logs)
2. Check the object's properties and version history
3. Test the relevant expression in the **Expression Builder** with the object's values
4. Fix the configuration issue
5. The object will be retried automatically on its next scheduled attempt (hot-queue back-off, or the
   overflow retry chain drained by the Automatic Update processor)

## Background Operations Not Running

### Checklist

| Check | What to Look For |
|-------|-----------------|
| **Dashboard status** | Is the rule showing as "Stopped" or "Paused"? Start/Resume it. |
| **Rule activation** | Is the rule configured but never started? Use the dashboard ▶ Start button. |
| **Schedule** | Is the CRON expression correct? Use a CRON validator tool. |
| **Search conditions** | Do the conditions match any objects? Use **Update Preview** to test. |
| **Filtering conditions** | Are the additional filters too restrictive? Try removing them temporarily. |
| **Vault application status** | Is the Property Calculator application running? Check M-Files Admin → Applications. |

## Common Mistakes

| Mistake | Symptom | Fix |
|---------|---------|-----|
| Using `AND`/`OR`/`NOT` (uppercase) | Expression parsing error | Use lowercase: `and`, `or`, `not` |
| Using `%` for modulo | Parsed as placeholder delimiter | Use `Mod()` function |
| Missing `Evaluate as Expression` toggle | Expression saved as literal text | Enable the toggle |
| Wrong placeholder syntax | Value is null or literal text | Verify: `%PROPERTY_{PD.Alias}%` with correct alias |
| Comparing lookup to string directly | Comparison always false | Use `lookupName()`: `lookupName(%PROPERTY_{PD.Status}%) == 'Active'` |
| Missing null check | Expression fails on empty properties | Wrap with `ifNull()` or add condition checking property is not empty |
| Using double quotes for strings | Parse error | NCalc uses **single quotes** only: `'text'` not `"text"` |
| Forgetting comma between function arguments | Parse error or wrong result | `iif(condition, trueVal, falseVal)` — all commas required |
| Circular related object updates | Loop detection, stuck objects | Add "Changed Propertyvalues" conditions to break cycles |
| Too many immediate updates | Slow check-in performance | Use background queue for large update sets |
| Event handler timing conflict | Values overwritten by other handlers | Switch to BeforeCheckInChangesFinalize (default) |

## Performance Tips

### Event Handler Timing

See [Configuration]({{ site.baseurl }}/Built-In/Property-Calculator/Configuration/#event-handler-timing) for the
BeforeCheckInChangesFinalize vs. BeforeCheckInChanges tradeoff — use the default
(BeforeCheckInChangesFinalize) for the vast majority of calculations.

### Background Operation Scheduling

| Pattern | Best For |
|---------|----------|
| **Cron: off-hours** (e.g., `0 2 * * *`) | Large update sets that can run overnight |
| **Every X Hours** | Regular maintenance tasks (expiry checks, status updates) |
| **Every Cycle** | One-time migrations or bulk fixes (disable after completion) |

Use **Update Preview** before starting large background operations to understand the scope.
{:.note}

### Related Object Update Chains

1. **Keep chains short:** A → B is fine. A → B → C → D → E causes performance issues.
2. **Use conditions:** Add "Changed Propertyvalues" conditions to prevent unnecessary cascading.
3. **Prefer background over immediate:** For chains with many targets, background processing is more efficient.
4. **Throttling:** See [Background Operations]({{ site.baseurl }}/Built-In/Property-Calculator/Background-Operations/#immediate-update-throttling) for the setting that prevents rapid-fire updates on the same object.

### Expression Optimization

1. **Use variables for repeated calculations:** If the same sub-expression appears multiple times, calculate it once with `store()` and reuse with `get()`.
2. **Avoid unnecessary chaining:** Each chained placeholder (`A.B`) requires vault API calls. Minimize chain depth.
3. **Keep conditions specific:** Narrow conditions reduce how often expressions are evaluated.
4. **Place cheap conditions first:** In condition lists, put simple checks (property value comparison) before expensive ones (regex, advanced conditions).

## Migration from the Legacy Property Calculator

Full breaking-changes reference: see [Breaking Changes & Upgrade Guide]({{ site.baseurl }}/Built-In/Property-Calculator/Breaking-Changes/) for the complete list of behavioral differences vs. the legacy Property Calculator, including which items the Upgrade button fixes automatically and which need a manual edit.
{:.note}

### Using the Migration Tool

1. Open the Property Calculator **dashboard** in M-Files Admin
2. Click the **🔄 Upgrade from Legacy PC** button
3. The tool automatically converts:
   - `AND` / `OR` / `NOT` → `and` / `or` / `not`
   - `LIKE` wildcard syntax: `*` → `%`, `?` → `_`
4. Review the configuration after conversion

### Key Differences

| Feature | Legacy PC | Current PC |
|---------|------------|---------------|
| **Expression Engine** | DataTable.Compute (legacy) | NCalc 6.x (modern, secure) |
| **Logical Operators** | Case-insensitive (`AND`, `and`) | **Lowercase only** (`and`, `or`, `not`) |
| **LIKE Wildcards** | `*` and `?` | `%` and `_` (SQL-style) |
| **Custom Functions** | Limited | 50+ functions (lookup, date, regex, aggregation, file, etc.) |
| **Background Operations** | Basic | Full dashboard management with scheduling |
| **Expression Builder** | Not available | Interactive testing tool |
| **Condition Types** | Basic only | 8 types including regex, file changes, property comparison |

### Common Migration Issues

| Issue | Resolution |
|-------|-----------|
| Expressions with `&&` or `||` | Replace with `and` / `or` |
| Expressions with `!` (NOT) | Replace with `not` |
| String concatenation with `+` | Works in NCalc, but `concat()` is preferred for clarity |
| `LIKE` patterns with `*` | Replace with `%`: `LIKE(val, '%pattern%')` |
| `IIF` (uppercase) | Still works — function names are case-insensitive |
| DataTable-specific syntax | Rewrite using NCalc syntax (see [NCalc Expressions]({{ site.baseurl }}/Built-In/Property-Calculator/NCalc-Expressions/)) |
