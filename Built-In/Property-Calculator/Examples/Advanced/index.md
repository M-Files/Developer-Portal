---
layout: page
title: Property Calculator Advanced Examples
includeInSearch: true
breadcrumb: Advanced Examples
excerpt: Eight Calculate Expression examples covering multi-step variable chains, cross-object aggregation, dynamic numbering, lookup set operations, regex transformation, complex business rules, FOREACH, and combined functions.
---

Each example includes the scenario, the expression, a step-by-step explanation, and the expected result. All examples use **Calculate Expression** mode unless noted otherwise.

## 13. Multi-Step Calculation with Variables — Full Invoice Computation

**Scenario:** Calculate subtotal, discount, tax, and total for an invoice — all in a single expression that saves the total.

**Mode:** Calculate Expression | **Evaluate as Expression:** ✅

```text
store('subtotal', Sum(%PROPERTY_{PD.InvoiceLines}.PROPERTY_{PD.Amount}%)) *0+
store('discountRate', iif(%PROPERTY_{PD.IsVIP}%, 0.10, 0.00)) *0+
store('discountedSubtotal', get('subtotal') * (1 - get('discountRate'))) *0+
store('vatRate', switch(lookupName(%PROPERTY_{PD.Country}%),
  'Finland', 0.255,
  'Sweden', 0.25,
  'Germany', 0.19,
  0.00)) *0+
store('vat', Round(get('discountedSubtotal') * get('vatRate'), 2)) *0+
Round(get('discountedSubtotal') + get('vat'), 2)
```

**Walkthrough:**
1. `store('subtotal', ...)` — sum all line item amounts → 5000
2. `store('discountRate', ...)` — 10% discount for VIP customers, 0% otherwise → 0.10
3. `store('discountedSubtotal', ...)` — 5000 × 0.90 → 4500
4. `store('vatRate', ...)` — look up country-specific VAT → 0.255
5. `store('vat', ...)` — 4500 × 0.255 → 1147.50
6. Final result: 4500 + 1147.50 → **5647.50**

`*0+` chains `store()` calls without letting their return values leak into the result. See [Variables]({{ site.baseurl }}/Built-In/Property-Calculator/NCalc-Expressions/#variables) in the NCalc reference for how the pattern works.
{:.note}

---

## 14. Cross-Object Aggregation — Project Budget Utilization

**Scenario:** A project has an MSLU linking to tasks. Calculate budget utilization percentage from the project's budget and task costs.

**Mode:** Calculate Expression | **Evaluate as Expression:** ✅

```text
let('totalCost', Sum(%PROPERTY_{PD.Tasks}.PROPERTY_{PD.TaskCost}%),
  let('budget', %PROPERTY_{PD.ProjectBudget}%,
    iif(get('budget') > 0,
      concat(Round(get('totalCost') / get('budget') * 100, 1), '%'),
      'No budget set')))
```

| Budget | Task Costs | Result |
|--------|-----------|--------|
| 100000 | 25000 + 35000 + 15000 = 75000 | 75.0% |
| 100000 | 95000 + 12000 = 107000 | 107.0% |
| 0 | 5000 | No budget set |

---

## 15. Dynamic Document Numbering — Year-Based Sequence

**Scenario:** Generate a document number in the format `DOC-YYYY-NNNN` using the current year and a sequence number property.

**Mode:** Calculate Expression | **Evaluate as Expression:** ✅

```text
concat('DOC-', 
  formatDate(now(), 'yyyy'), 
  '-', 
  padLeft(tostring(%PROPERTY_{PD.SequenceNumber}%), 4, '0'))
```

| SequenceNumber | Result |
|---------------|--------|
| 1 | DOC-2026-0001 |
| 42 | DOC-2026-0042 |
| 1337 | DOC-2026-1337 |

---

## 16. Lookup Set Operations — Active Participants Only

**Scenario:** A meeting object has "All Invited" (MSLU) and "Declined" (MSLU) properties. Calculate "Confirmed Attendees" by removing declined people.

**Mode:** Calculate Expression | **Evaluate as Expression:** ✅

```text
lookupExcept(%PROPERTY_{PD.AllInvited}%, %PROPERTY_{PD.Declined}%)
```

| All Invited | Declined | Result |
|-------------|----------|--------|
| Alice (1), Bob (2), Carol (3), Dave (4) | Bob (2), Dave (4) | Alice (1), Carol (3) |

**With attendee count:**
```text
let('confirmed', lookupExcept(%PROPERTY_{PD.AllInvited}%, %PROPERTY_{PD.Declined}%),
  concat(lookupCount(get('confirmed')), ' confirmed: ', lookupNames(get('confirmed'))))
```
Result: `2 confirmed: Alice, Carol`

---

## 17. Regex-Based Data Transformation — Phone Number Formatting

**Scenario:** Normalize phone numbers to international format.

**Mode:** Calculate Expression | **Evaluate as Expression:** ✅

```text
let('phone', trim(%PROPERTY_{PD.PhoneNumber}%),
  iif(startsWith(get('phone'), '+'), get('phone'),
    iif(startsWith(get('phone'), '0'), 
      concat('+358', substring(get('phone'), 1)),
      concat('+358', get('phone')))))
```

| Input | Result |
|-------|--------|
| +358 40 1234567 | +358 40 1234567 |
| 040 1234567 | +35840 1234567 |
| 0401234567 | +358401234567 |

---

## 18. Complex Business Rule — SLA Compliance Check

**Scenario:** Determine SLA status based on response time, priority, and whether it's a business day. The expression checks if the issue was responded to within the SLA timeframe.

**Mode:** Calculate Expression | **Evaluate as Expression:** ✅

```text
store('responseHours', dateDiff(%PROPERTY_{PD.Created}%, 
  ifNull(%PROPERTY_{PD.FirstResponse}%, now()), 'hours')) *0+
store('slaLimit', switch(lookupName(%PROPERTY_{PD.Priority}%),
  'Critical', 4,
  'High', 8,
  'Medium', 24,
  'Low', 72,
  48)) *0+
store('isResolved', not isNull(%PROPERTY_{PD.FirstResponse}%)) *0+
iif(not get('isResolved'),
  iif(get('responseHours') > get('slaLimit'),
    concat('🔴 SLA BREACHED (', Round(get('responseHours'), 0), 'h / ', get('slaLimit'), 'h limit)'),
    concat('🟡 Pending (', Round(get('responseHours'), 0), 'h / ', get('slaLimit'), 'h limit)')),
  iif(get('responseHours') <= get('slaLimit'),
    concat('🟢 Met SLA (', Round(get('responseHours'), 0), 'h / ', get('slaLimit'), 'h limit)'),
    concat('🔴 SLA Missed (', Round(get('responseHours'), 0), 'h / ', get('slaLimit'), 'h limit)')))
```

| Priority | Created | First Response | Response Hours | SLA Limit | Result |
|----------|---------|---------------|----------------|-----------|--------|
| Critical | May 5, 09:00 | May 5, 11:30 | 2.5h | 4h | 🟢 Met SLA (3h / 4h limit) |
| High | May 3, 14:00 | May 4, 10:00 | 20h | 8h | 🔴 SLA Missed (20h / 8h limit) |
| Medium | May 6, 08:00 | *(not yet)* | 30h | 24h | 🔴 SLA BREACHED (30h / 24h limit) |

---

## 19. FOREACH — Generate Line Item Summary

**Scenario:** Create a text summary listing all invoice line items with their amounts.

**Mode:** Calculate Expression | **Evaluate as Expression:** ✅

```text
%PROPERTY_{PD.InvoiceLines}.FOREACH%• %PROPERTY_{PD.Description}%: %PROPERTY_{PD.Amount}% EUR
%
```

**Result (3 line items):**
```text
• Software License: 2500 EUR
• Consulting Services: 1200 EUR
• Training: 800 EUR
```

---

## 20. Combined Functions — Smart Contract Summary

**Scenario:** Generate a comprehensive one-line summary for a contract, combining multiple data sources and calculations.

**Mode:** Calculate Expression | **Evaluate as Expression:** ✅

```text
store('value', %PROPERTY_{PD.ContractValue}%) *0+
store('daysLeft', dateDiff(today(), %PROPERTY_{PD.EndDate}%, 'days')) *0+
store('status', lookupName(%PROPERTY_{PD.Status}%)) *0+
concat(
  get('status'), ' | ',
  lookupName(%PROPERTY_{PD.Customer}%), ' | ',
  iif(get('value') >= 100000, '💰 ', ''),
  Round(get('value'), 0), ' EUR | ',
  iif(get('daysLeft') < 0, 
    concat('Expired ', Abs(get('daysLeft')), 'd ago'),
    iif(get('daysLeft') < 30,
      concat('⚠️ ', get('daysLeft'), 'd left'),
      concat(Round(get('daysLeft') / 30, 0), ' months left'))),
  ' | ',
  lookupCount(%PROPERTY_{PD.Attachments}%), ' files')
```

**Result:** `Active | Acme Corp | 💰 250000 EUR | ⚠️ 18d left | 5 files`
