---
layout: page
title: Property Calculator Breaking Changes and Upgrade Guide
includeInSearch: true
breadcrumb: Breaking Changes
excerpt: This page compares the legacy M-Files Property Calculator, which evaluated expressions with the DataTable.Compute() engine, against the current NCalc-based Property Calculator (26.7.x), showing administrators what may break before upgrading and which issues the dashboard's Upgrade from Legacy PC button fixes automatically versus which require a manual edit.
---

**Baseline for this comparison:** the legacy M-Files Property Calculator, which evaluates numeric value expressions and conditions with the legacy `DataTable.Compute()` engine. The current version replaced that engine with **NCalc 6.1.1** on 2026-03-12, and that single change is the source of almost every breaking difference below.
{:.note}

## How to Read This Document

Each change is tagged with how it is resolved:

| Tag | Meaning |
|-----|---------|
| 🟢 **Auto (button)** | Fixed automatically by the **🔄 Upgrade from Legacy PC** dashboard button. |
| ⚙️ **Auto (runtime)** | Handled automatically while the expression is evaluated — no action needed. |
| 🔴 **Manual** | You must edit the configuration yourself; no automatic conversion exists. |

**Important scope note:** the Upgrade button converts **conditions** (basic/advanced conditions, "Comparing to Main Object", related-object filters, and automatic-update filtering conditions) **and** the **value expression** of a `Calculate Expression` property whose target is **numeric or boolean** — i.e. exactly the values the legacy engine evaluated through DataTable. Text, date and lookup value expressions were only expanded from placeholders (never DataTable), so they carry no legacy operator syntax and are intentionally left untouched.
{:.note}

## At a Glance

| # | Old behavior (Legacy PC) | New behavior (Current 26.7.x) | Breaks? | Resolution |
|---|---------------------------|----------------------------------|---------|------------|
| 1 | `AND` / `OR` / `NOT` (any case) | Lowercase `and` / `or` / `not` only | ✅ Yes | 🟢 Auto (button) |
| 2 | `Field LIKE '*abc*'` (operator, `*`/`?`) | `LIKE(Field, '%abc%')` (function, `%`/`_`) | ✅ Yes | 🟢 + ⚙️ Auto |
| 3 | `ISNULL`, `LEN`, `CONVERT`, `IN(...)`, etc. | NCalc equivalents (`ifnull`, `length`, `tonumber`, `or`/`contains`) | ✅ Yes | 🔴 Manual |
| 4 | "Comparing to Main Object" condition type | Advanced Condition using `mainObject(...)` | ⚠️ Compat only | 🟢 Auto (button) |
| 5 | "Update Immediately" (Yes/No) | "Update delay (minutes)" | ⚠️ Config model | 🟢 Auto (button) |
| 6 | Automatic update rules had no key | Rules require a stable **Rule Key** | ⚠️ Config model | 🟢 Auto (button) |
| 7 | `MFiles.PropertyCalculator.ObjectUpdateQueue` NVS namespace | Backlog lives in the VAF task queue + overflow/dead-letter | ⚠️ Integrations | 🔴 Re-point external tools |

`✅ Yes` = an unchanged configuration can produce a wrong result or an error.
`⚠️` = the configuration still runs, but the underlying model or storage changed.

## The One Big Change: DataTable → NCalc

The legacy Property Calculator builds **numeric** value expressions and **advanced conditions** as `System.Data.DataTable` compute strings. (Text fields were only expanded to literal text, and date/boolean fields used their own resolvers — DataTable was never involved there.) The current version removed that engine entirely and now evaluates everything with **NCalc 6.1.1**.

The two engines share a lot of surface syntax (`+ - * /`, `< <= > >=`, `=`, string literals in single quotes), which is why *most* configurations keep working. The differences that **do** break are listed below.

**See also:** [NCalc Expressions]({{ site.baseurl }}/Built-In/Property-Calculator/NCalc-Expressions/) for the complete NCalc reference and the full list of 50+ functions available in the new engine.
{:.note}

## Breaking Changes in Detail

### 1. Uppercase `AND` / `OR` / `NOT`

**Old:** DataTable accepts logical keywords in any case — `AND`, `And`, `and` all work.

**New:** NCalc requires **lowercase** `and`, `or`, `not`. Uppercase keywords fail to parse.

```text
❌  %PROPERTY_{PD.A}% > 0 AND %PROPERTY_{PD.B}% > 0
✅  %PROPERTY_{PD.A}% > 0 and %PROPERTY_{PD.B}% > 0
```

**Symptom:** an expression error, or a condition that silently never evaluates true.

**Resolution:**
- 🟢 **Auto (button)** — inside conditions (basic/advanced conditions, related-object filters, automatic-update filtering conditions), **and** inside the value expression of a `Calculate Expression` property whose target is **numeric or boolean** (for example `iif([A] > 0 and [B] > 0, true, false)`). The button lowercases keywords outside string literals.
- 🔴 **Manual** — only for a text value expression you have explicitly opted into evaluating with **Evaluate as Expression** (a new-version-only flag; it never exists in an imported legacy config).

### 2. `LIKE` operator and `*` / `?` wildcards

**Old:** DataTable uses `LIKE` as an **operator** with `*` / `?` (or `%` / `_`) wildcards: `FullName LIKE '*son'`.

**New:** NCalc has no `LIKE` operator — `LIKE` is a **function**, and wildcards are SQL-style (`%` = any run of characters, `_` = a single character):

```text
❌  %PROPERTY_{PD.Name}% LIKE '*son'
✅  LIKE(%PROPERTY_{PD.Name}%, '%son')
```

**Resolution:**
- 🟢 **Auto (button)** — in conditions **and numeric/boolean value expressions**, the operator form `X LIKE 'p'` is rewritten to the function form `LIKE(X, 'p')`.
- ⚙️ **Auto (runtime)** — `*` → `%` and `?` → `_` inside `LIKE(...)` patterns are converted every time the expression is evaluated, so you keep writing `*`/`?` in the configuration. (This is intentional: the M-Files Admin UI validates any `%...%` you type as a placeholder, so wildcards must stay as `*`/`?` in the saved config and be translated at runtime.)

### 3. DataTable-only functions and syntax

The legacy PC evaluated a **placeholder-expanded, literal expression** on an **empty, column-less** `DataTable` — and only for a **numeric** value or a **boolean/advanced condition**. That distinction matters:

- **Scalar** functions and operators work on those literal values (no table needed), so they *could* appear: `ISNULL`, `LEN`, `CONVERT`, `IIF`, `SUBSTRING`, `TRIM`, and the `IN` / `LIKE` operators. If you used any, they need an NCalc equivalent.
- **Aggregate** functions (`SUM`, `AVG`, `MIN`, `MAX`, `COUNT`, …) and anything column-based **could not work** in the legacy PC — there were no columns or rows — so they will **not** appear in a migrated config. (In the new engine, aggregation is done with `Sum` / `Avg` / `ListMin` / … over MSLU placeholders — see [NCalc Expressions]({{ site.baseurl }}/Built-In/Property-Calculator/NCalc-Expressions/).)

| Legacy PC (DataTable, on literals) | NCalc replacement | Notes |
|-------------------------|-------------------|-------|
| `IN (a, b, c)` | `x == a or x == b or x == c` | NCalc has no SQL `IN` list operator. |
| `ISNULL(a, b)` | `ifnull(a, b)` or `coalesce(a, b)` | Returns `a` unless null/empty, else `b`. |
| `CONVERT(x, 'System.Int32')` | `tonumber(x)` / `tostring(x)` | Type-specific conversion functions. |
| `LEN(x)` | `length(x)` | |
| `SUBSTRING(x, 1, 3)` | `substring(x, 0, 3)` | **Index base differs:** DataTable is 1-based, NCalc `substring` is **0-based**. |
| `IIF(c, t, f)` | `iif(c, t, f)` | ✅ Still works — function names are case-insensitive. |

**Symptom:** an `Unknown function` / parse error, or an off-by-one result after a `SUBSTRING` migration.

**Resolution:**
- 🔴 **Manual** — rewrite these using the [NCalc function reference]({{ site.baseurl }}/Built-In/Property-Calculator/NCalc-Expressions/). The Upgrade button converts operator syntax (`and`/`or`/`not`, `LIKE`) but does not translate function names or argument semantics.

**Decimal separator:** the legacy PC silently converted commas to dots for numeric fields, so a literal `2,5` worked. NCalc uses `.` for decimals and `,` as the **argument separator**, so a literal `2,5` in an expression fails to evaluate — write `2.5`. (Comma decimals inside *placeholder values* are still normalized automatically; this only affects literal numbers typed into an expression.)
{:.note}

### 4. "Comparing to Main Object" condition type

**Old:** A dedicated condition type "Comparing to Main Object" with **From Main Object**, **Comparing Options** and **From Related Object** fields.

**New:** The condition type still evaluates, but the modern form is an **Advanced Condition** that wraps the main-object part in the `mainObject(...)` function:

```text
mainObject(%PROPERTY_{PD.Budget}%) >= %PROPERTY_{PD.Cost}%
```

**Resolution:**
- 🟢 **Auto (button)** — the Upgrade button rewrites each "Comparing to Main Object" condition into an Advanced Condition with `mainObject(...)`, applying the operator conversions from changes 1–2 at the same time. This future-proofs the configuration even though the legacy type still runs.

### 5. "Update Immediately" replaced by "Update delay (minutes)"

**Old:** Related-object update rules had an **Update Immediately** (Yes/No) toggle.

**New:** That boolean is replaced by **Update delay (minutes)** — a numeric delay before the dependent object is updated in the background.

**Resolution:**
- 🟢 **Auto (button)** — legacy rules are migrated automatically: *Update Immediately = Yes* becomes **0 minutes**, and *Update Immediately = No* becomes **30 minutes** (the previous deferred default).

### 6. Automatic update rules now need a Rule Key

**Old:** Automatic object-update rules had no stable identifier.

**New:** Each automatic update rule carries a **Rule Key** used to track per-rule progress, scheduling and backlog state. Rules imported from the legacy configuration have no key.

**Resolution:**
- 🟢 **Auto (button)** — the Upgrade button generates a stable key for every automatic update rule that is missing one.

### 7. The NVS update queue was removed

**Old:** The related-object update backlog was tracked in a single Named Value Storage namespace, `MFiles.PropertyCalculator.ObjectUpdateQueue`. (There was **no** separate "stuck" queue in the legacy / year-turn version — that came and went later in the current version's line.)

**New:** That namespace **no longer exists**. The backlog now lives in the VAF task queue, with an **overflow** buffer and a **dead-letter** namespace for failures. See [NVS Namespaces]({{ site.baseurl }}/Built-In/Property-Calculator/NVS-Namespaces/) and [Background Operations]({{ site.baseurl }}/Built-In/Property-Calculator/Background-Operations/).

**Resolution:**
- 🔴 **Manual / N/A** — nothing in the configuration needs changing, but any **external tool, report or integration** that read the old `ObjectUpdateQueue` namespace must be re-pointed to the new locations (or to the dashboard's queue / stuck-object / dead-letter views).

## What Still Works Unchanged

These commonly-used constructs behave the same in both engines, so they need no attention:

- Arithmetic operators `+`, `-`, `*`, `/`.
- Comparison operators `<`, `<=`, `>`, `>=`.
- Equality `=` **and** `==` (both accepted by NCalc).
- Not-equal `<>` **and** `!=` (both accepted; the button normalizes `<>` → `!=` for consistency only).
- String literals in single quotes, and string concatenation with `+`.
- `IIF(...)` conditional (case-insensitive function name).
- Placeholder syntax (`%PROPERTY_{...}%`, `%OLDPROPERTY_{...}%`, system placeholders).
- **Text / multi-line text output.** These fields were *never* run through the old DataTable engine — they only expanded placeholders to literal text, and they still do by default. The new **Evaluate as Expression** flag is an *opt-in* addition that can now run a text field through NCalc; it does not change existing behavior.

## Upgrade Button Coverage Matrix

What the **🔄 Upgrade from Legacy PC** button ([dashboard]({{ site.baseurl }}/Built-In/Property-Calculator/Dashboard/) → *Upgrade from Legacy PC*) does, and does not, do:

| Task | Covered by button? |
|------|--------------------|
| Lowercase `AND` / `OR` / `NOT` in **conditions** | ✅ Yes |
| `<>` → `!=` in conditions | ✅ Yes |
| `LIKE` operator → `LIKE()` function in conditions | ✅ Yes |
| "Comparing to Main Object" → `mainObject(...)` Advanced Condition | ✅ Yes |
| Migrate *Update Immediately* → *Update delay (minutes)* | ✅ Yes |
| Generate missing **Rule Keys** for automatic update rules | ✅ Yes |
| Migrate the legacy `%X.FOREACH%+%Y%` sum idiom → `Sum(%X.Y%)` | ✅ Yes |
| `*` / `?` → `%` / `_` in `LIKE` patterns | ⚙️ Runtime (not the button) |
| Operator conversions inside **numeric/boolean value expressions** | ✅ Yes |
| Operator conversions inside text / date / lookup value expressions | N/A — placeholder-only, no operators |
| Translate DataTable-only functions (`ISNULL`, `LEN`, `CONVERT`, `IN`, …) | ❌ No — manual |
| Re-point integrations that read the old NVS queue namespaces | ❌ No — manual |

The button is **idempotent**: running it again when everything is already converted reports *"No conversion needed"* and changes nothing. It also saves the configuration and records a configuration-history version, so the change is auditable and reversible.
{:.note}

## Recommended Upgrade Procedure

1. **Back up the current configuration** (export the JSON, or note the current configuration-history version so you can roll back).
2. **Install** the PropertyCalculator `.mfappx` in the vault. At this point the application has **no configuration yet** — the dashboard buttons act on the *saved* configuration, so you must import your config before anything can be converted.
3. **Import your existing configuration JSON.** In M-Files Admin, open the application's **Configuration** editor, paste/import your JSON, and **Save**. This becomes the current configuration; legacy fields (e.g. *Update Immediately*, *Comparing to Main Object*) are preserved for the next step.
4. Open the **dashboard** in M-Files Admin and click **🔄 Upgrade from Legacy PC**. It reads the saved configuration, converts it **in place**, and saves it back.
   - The confirmation message reports how many expressions were converted, how many rules were migrated to update-delay, and whether rule keys were generated.
5. **Review** the converted configuration for the manual (🔴) items above:
   - Value expressions that use **DataTable-only functions** (`ISNULL`, `LEN`, `CONVERT`, `IN`, …) — operator syntax (`AND`/`OR`/`NOT`, `LIKE`) in numeric/boolean value expressions is already converted.
6. Use the **Expression Builder** ([dashboard]({{ site.baseurl }}/Built-In/Property-Calculator/Dashboard/) → *Expression Builder*) to test any expression you edited before saving.
7. **Re-point** any external tools/reports that read the old `ObjectUpdateQueue` namespace.
8. Validate in a **test vault** before rolling out to production.

## Post-Upgrade Validation Checklist

- [ ] The Upgrade button reported success (or *"No conversion needed"*).
- [ ] No expression errors appear in the log or in the dashboard error panel.
- [ ] Boolean/numeric conditions that use `AND`/`OR`/`NOT` still evaluate correctly.
- [ ] `LIKE` conditions match the same objects as before.
- [ ] Any `ISNULL` / `LEN` / `CONVERT` / `IN` / `SUBSTRING` usages were rewritten and re-tested.
- [ ] Related-object updates fire with the expected delay.
- [ ] Background updates are processing (dashboard queue is draining, no unexpected dead-letter entries).
- [ ] External integrations no longer depend on the removed `ObjectUpdateQueue` NVS namespace.

**See also:** [Troubleshooting]({{ site.baseurl }}/Built-In/Property-Calculator/Troubleshooting/#migration-from-the-legacy-property-calculator) · [NCalc Expressions]({{ site.baseurl }}/Built-In/Property-Calculator/NCalc-Expressions/) · [Dashboard]({{ site.baseurl }}/Built-In/Property-Calculator/Dashboard/) · [NVS Namespaces]({{ site.baseurl }}/Built-In/Property-Calculator/NVS-Namespaces/)
{:.note}
