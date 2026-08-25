---
layout: page
title: Property Calculator Conditions
includeInSearch: true
breadcrumb: Conditions
excerpt: Reference for the 8 condition types available in Property Calculator, used to control when a calculation rule, error case, or related object update should execute.
---

Conditions determine **when** a calculation rule, error case, or related object update should execute. Multiple conditions can be combined — all conditions must be met (AND logic).

## Basic Conditions

Standard M-Files search conditions applied to the **current version** of the object.

**Use when:** You need simple property value matching (e.g., "Class = Invoice" or "Status = Active").

| Setting | Description |
|---------|-------------|
| **Conditions** | Standard M-Files search conditions (same as in Views) |
| **Negate Conditions** | When ON: the condition passes when the search does NOT match |

**Example:** Only calculate tax when `PD.Country` = "Finland":
- Condition: Property `PD.Country` equals `Finland`

---

## Changed Propertyvalues

Detects whether specific properties were modified in the current check-in operation. This is the
exact label shown in the **Condition Type** dropdown — it's spelled `Changed Propertyvalues`
(one word), not "Changed Property Values".

**Use when:** You want a calculation to run only when certain properties change (not on every check-in).

| Setting | Description |
|---------|-------------|
| **Value Changed** | `Propertyvalue Changed` or `Propertyvalue Not Changed` — which direction to test |
| **Property Values** | List of properties to monitor for changes |

**Example:** Recalculate `PD.Total` only when `PD.Quantity` or `PD.UnitPrice` changes.

---

## Conditions for Previous Object Version

Search conditions applied to the **previous version** of the object (before the current modification).

**Use when:** You need to detect state transitions or value changes by comparing old vs. new.

| Setting | Description |
|---------|-------------|
| **Conditions** | Search conditions applied to the previous version |

**Example:** Detect when an object transitions from Draft to Active by checking: Previous version has `Status = Draft` AND current version has `Status = Active`.

---

## Compare Properties

Compares two property values (or placeholder-resolved paths) against each other.

**Use when:** You need to compare two properties on the same object, or compare a property with a value from a related object.

| Setting | Description |
|---------|-------------|
| **Property X** | First property (placeholder syntax: `%PROPERTY_{Alias}%`) |
| **Comparison Type** | `Equal`, `Not Equal`, `X Included in Y`, `X Not Included in Y`, `Y Included in X`, `Y Not Included in X`, `Any Match`, `No Match` |
| **Property Y** | Second property (placeholder syntax) |
| **Read Y from Main Object** | When ON: Property Y is resolved from the main (triggering) object instead of the current object |

The "Included in"/"Match" options are for multi-value (lookup or multi-select) comparisons —
e.g. `X Included in Y` checks whether Property X's single value appears in Property Y's list, and
`Any Match`/`No Match` compare two multi-select lists against each other. There is no
numeric greater-than/less-than or text-contains comparison in this condition type; use
**Advanced Conditions** with a plain NCalc comparison (`>`, `<`) or the `contains()` function instead.

**Example:** Fire rule only when `PD.ActualCost` exceeds `PD.BudgetedCost` (via Advanced Conditions,
since Compare Properties has no "greater than" option):
```text
%PROPERTY_{PD.ActualCost}% > %PROPERTY_{PD.BudgetedCost}%
```

---

## Advanced Conditions

An NCalc expression that must evaluate to `true` for the condition to pass. This is the most flexible condition type.

**Use when:** You need complex logic that can't be expressed with other condition types.

| Setting | Description |
|---------|-------------|
| **Advanced Conditions** | NCalc expression (must return true/false) |

**Example:** Fire rule only when the invoice amount exceeds the threshold AND the customer is domestic:
```text
%PROPERTY_{PD.Amount}% > 10000 and lookupName(%PROPERTY_{PD.Country}%) == 'Finland'
```

---

## Match with RegExp

Matches a property value against a C# regular expression.

**Use when:** You need pattern-based validation or matching.

| Setting | Description |
|---------|-------------|
| **Value** | The property value to test (supports placeholders) |
| **RegExp** | C# regular expression pattern |

**Example:** Only process documents with a valid invoice number format (INV-YYYY-NNNN):
- Value: `%PROPERTY_{PD.InvoiceNumber}%`
- RegExp: `^INV-\d{4}-\d{4}$`

---

## File Modified

Detects changes to the files attached to an object.

**Use when:** You need to trigger calculations based on file additions, removals, or edits.

| Setting | Description |
|---------|-------------|
| **File Change Type** | `Files Edited` (any file change except renaming), `File Added`, `File Removed`, `Existing File Edited`, or `File Renamed` |

**Example:** Update a `PD.LastFileUpdate` timestamp whenever files are edited.

---

## Comparing to Main Object *(removed — use the options below)*

This standalone condition type is no longer offered. Comparing the current (related) object against the **main** object that triggered the update chain is now done in one of two ways:

- **Compare Properties** with **Read Y from Main Object** enabled — Property Y is resolved from the main (triggering) object instead of the current object. Best for lookup/MSLU comparisons.
- **Advanced Conditions** using the [`mainObject()`]({{ site.baseurl }}/Built-In/Property-Calculator/NCalc-Expressions/#mainobjectexpression) function — the placeholders inside `mainObject(...)` are resolved against the main object. Best for value or numeric comparisons.

**Example:** During a cascading update, only update the related invoice when the main contract's `PD.Status` = Active:
- *Advanced Conditions:* `mainObject(%PROPERTY_{PD.Status}%) == 'Active'`
- *or Compare Properties:* Property X = `Active`, Comparison = `Equal`, Property Y = `%PROPERTY_{PD.Status}%`, **Read Y from Main Object** = ON
