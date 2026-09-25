---
layout: page
title: Property Calculator Basic Examples
includeInSearch: true
breadcrumb: Basic Examples
excerpt: Six introductory Calculate Expression examples covering arithmetic, text assembly, conditional text, date math, null-safe fallbacks, and lookup-based flags.
---

Each example includes the scenario, the expression, a step-by-step explanation, and the expected result. All examples use **Calculate Expression** mode unless noted otherwise.

## 1. Simple Arithmetic — Calculate Total Price

**Scenario:** An invoice line has `Quantity` and `Unit Price` properties. Calculate the `Line Total`.

**Mode:** Calculate Expression | **Evaluate as Expression:** ✅

```text
%PROPERTY_{PD.Quantity}% * %PROPERTY_{PD.UnitPrice}%
```

| Property | Value |
|----------|-------|
| PD.Quantity | 25 |
| PD.UnitPrice | 49.90 |
| **Result** | **1247.50** |

**Explanation:** Both placeholders are resolved as numbers and multiplied.

---

## 2. Text Assembly — Build Document Title

**Scenario:** Automatically generate a document title from project code and document type.

**Mode:** Calculate Expression | **Evaluate as Expression:** ❌ (simple placeholder)

```text
%PROPERTY_{PD.ProjectCode}% - %PROPERTY_{PD.DocumentType}% - %PROPERTY_{PD.Revision}%
```

| Property | Value |
|----------|-------|
| PD.ProjectCode | PRJ-2026 |
| PD.DocumentType | Specification |
| PD.Revision | Rev.C |
| **Result** | **PRJ-2026 - Specification - Rev.C** |

**Explanation:** With "Evaluate as Expression" OFF, placeholders are simply replaced with their text values. No NCalc evaluation occurs.

---

## 3. Conditional Text — Priority Label

**Scenario:** Display a human-readable priority label based on a numeric score.

**Mode:** Calculate Expression | **Evaluate as Expression:** ✅

```text
iif(%PROPERTY_{PD.Score}% >= 80, 'High Priority',
  iif(%PROPERTY_{PD.Score}% >= 50, 'Medium Priority', 'Low Priority'))
```

| Score | Result |
|-------|--------|
| 92 | High Priority |
| 65 | Medium Priority |
| 30 | Low Priority |

**Explanation:** Nested `iif()` functions create a tiered classification. The outer `iif` checks ≥80 first, then falls through to the inner `iif` for ≥50.

---

## 4. Date Calculation — Due Date

**Scenario:** Set the payment due date to 30 days after the invoice date.

**Mode:** Calculate Expression | **Evaluate as Expression:** ✅

```text
dateAdd(%PROPERTY_{PD.InvoiceDate}%, 30, 'days')
```

| Property | Value |
|----------|-------|
| PD.InvoiceDate | 2026-01-15 |
| **Result** | **2026-02-14** |

---

## 5. Null-Safe Display — Contact Info

**Scenario:** Show the primary email if available, otherwise fall back to secondary email, then to "No email on file".

**Mode:** Calculate Expression | **Evaluate as Expression:** ✅

```text
coalesce(%PROPERTY_{PD.PrimaryEmail}%, %PROPERTY_{PD.SecondaryEmail}%, 'No email on file')
```

| PrimaryEmail | SecondaryEmail | Result |
|-------------|----------------|--------|
| john@acme.com | jane@acme.com | john@acme.com |
| *(empty)* | jane@acme.com | jane@acme.com |
| *(empty)* | *(empty)* | No email on file |

---

## 6. Lookup Name Check — Status-Based Flag

**Scenario:** Set a boolean flag indicating whether a contract is active.

**Mode:** Calculate Expression | **Evaluate as Expression:** ✅

```text
lookupName(%PROPERTY_{PD.ContractStatus}%) == 'Active'
```

| ContractStatus (lookup) | Result |
|------------------------|--------|
| Active (ID: 3) | true |
| Expired (ID: 5) | false |
