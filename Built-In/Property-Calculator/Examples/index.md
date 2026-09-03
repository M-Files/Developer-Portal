---
layout: page
title: Property Calculator Examples
includeInSearch: true
breadcrumb: Examples
excerpt: Progressive, worked examples for every Property Calculator calculation mode, from simple one-line expressions to complete multi-rule Class Group configurations.
---

Each example includes the scenario, the expression or configuration, a step-by-step explanation, and the expected result. All examples use **Calculate Expression** mode unless noted otherwise.

## Basic Examples

### 1. Simple Arithmetic — Calculate Total Price

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

### 2. Text Assembly — Build Document Title

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

### 3. Conditional Text — Priority Label

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

### 4. Date Calculation — Due Date

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

### 5. Null-Safe Display — Contact Info

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

### 6. Lookup Name Check — Status-Based Flag

**Scenario:** Set a boolean flag indicating whether a contract is active.

**Mode:** Calculate Expression | **Evaluate as Expression:** ✅

```text
lookupName(%PROPERTY_{PD.ContractStatus}%) == 'Active'
```

| ContractStatus (lookup) | Result |
|------------------------|--------|
| Active (ID: 3) | true |
| Expired (ID: 5) | false |

---

## Intermediate Examples

### 7. MSLU Aggregation — Invoice Total from Line Items

**Scenario:** An invoice object has an MSLU property `Invoice Lines` linking to line item objects. Each line item has an `Amount` property. Calculate the invoice total.

**Mode:** Calculate Expression | **Evaluate as Expression:** ✅

```text
Sum(%PROPERTY_{PD.InvoiceLines}.PROPERTY_{PD.Amount}%)
```

| Invoice Lines (MSLU) | Amount per line | Result |
|---------------------|-----------------|--------|
| Line 1 → Amount: 500 | | |
| Line 2 → Amount: 1200 | | |
| Line 3 → Amount: 350 | | |
| **Invoice Total** | | **2050** |

**How it works:**
1. `%PROPERTY_{PD.InvoiceLines}%` resolves to the MSLU (3 lookup items)
2. `.PROPERTY_{PD.Amount}%` chains to read `Amount` from each linked object
3. The placeholder auto-expands: `Sum([__P0], [__P1], [__P2])` where P0=500, P1=1200, P2=350
4. `Sum()` returns 2050

**Bonus — Invoice total with VAT:**
```text
let('subtotal', Sum(%PROPERTY_{PD.InvoiceLines}.PROPERTY_{PD.Amount}%),
  Round(get('subtotal') * 1.24, 2))
```
Result: `2542.00`

---

### 8. Regex Extraction — Order Number from Text

**Scenario:** A document title contains an order number in the format "ORD-NNNN". Extract just the numeric part.

**Mode:** Calculate Expression | **Evaluate as Expression:** ✅

```text
regexMatch(%PROPERTY_{PD.Title}%, 'ORD-(\d+)')
```

| Title | Result |
|-------|--------|
| Purchase Order ORD-4521 for Acme | ORD-4521 |

**To get just the number part:**
```text
regexMatchGroup(%PROPERTY_{PD.Title}%, 'ORD-(\d+)', 1)
```
Result: `4521`

---

### 9. Switch-Based Mapping — Country to VAT Rate

**Scenario:** Determine VAT rate based on the customer's country.

**Mode:** Calculate Expression | **Evaluate as Expression:** ✅

```text
switch(lookupName(%PROPERTY_{PD.Country}%),
  'Finland', 0.255,
  'Sweden', 0.25,
  'Norway', 0.25,
  'Denmark', 0.25,
  'Germany', 0.19,
  'France', 0.20,
  'UK', 0.20,
  0.00)
```

| Country | Result |
|---------|--------|
| Finland | 0.255 |
| Germany | 0.19 |
| Japan | 0.00 (default) |

---

### 10. String Assembly with Conditions — Address Block

**Scenario:** Build a formatted address string, handling optional fields gracefully.

**Mode:** Calculate Expression | **Evaluate as Expression:** ✅

```text
concat(
  %PROPERTY_{PD.StreetAddress}%,
  iif(isNullOrEmpty(%PROPERTY_{PD.ApartmentUnit}%), '', concat(', Apt ', %PROPERTY_{PD.ApartmentUnit}%)),
  '\n',
  %PROPERTY_{PD.City}%, ' ',
  %PROPERTY_{PD.PostalCode}%,
  '\n',
  lookupName(%PROPERTY_{PD.Country}%))
```

| Fields | Result |
|--------|--------|
| Street: 123 Main St, Apt: 4B, City: Helsinki, Postal: 00100, Country: Finland | `123 Main St, Apt 4B`<br>`Helsinki 00100`<br>`Finland` |
| Street: 456 Oak Ave, Apt: *(empty)*, City: Turku, Postal: 20100, Country: Finland | `456 Oak Ave`<br>`Turku 20100`<br>`Finland` |

---

### 11. Date-Based Conditional — Contract Expiry Warning

**Scenario:** Set a warning text when a contract is within 30 days of expiration.

**Mode:** Calculate Expression | **Evaluate as Expression:** ✅

```text
let('daysLeft', dateDiff(today(), %PROPERTY_{PD.ContractEnd}%, 'days'),
  iif(get('daysLeft') < 0, 'EXPIRED',
    iif(get('daysLeft') <= 30, concat('Expires in ', get('daysLeft'), ' days'),
      iif(get('daysLeft') <= 90, concat('Expires in ~', Round(get('daysLeft') / 30, 0), ' months'),
        'Active'))))
```

| ContractEnd | Today | daysLeft | Result |
|-------------|-------|----------|--------|
| 2026-04-01 | 2026-05-07 | -36 | EXPIRED |
| 2026-05-20 | 2026-05-07 | 13 | Expires in 13 days |
| 2026-07-15 | 2026-05-07 | 69 | Expires in ~2 months |
| 2026-12-31 | 2026-05-07 | 238 | Active |

---

### 12. File Count Validation — Check for Required Attachments

**Scenario:** Generate a status text indicating whether required PDF documents are attached.

**Mode:** Calculate Expression | **Evaluate as Expression:** ✅

```text
let('pdfCount', filecount('pdf'),
  iif(get('pdfCount') == 0, '❌ No PDF attached',
    iif(get('pdfCount') == 1, '✅ 1 PDF attached',
      concat('✅ ', get('pdfCount'), ' PDFs attached'))))
```

| Files on Object | Result |
|----------------|--------|
| Report.docx | ❌ No PDF attached |
| Invoice.pdf | ✅ 1 PDF attached |
| Invoice.pdf, Appendix.pdf, Terms.pdf | ✅ 3 PDFs attached |

---

## Advanced Examples

### 13. Multi-Step Calculation with Variables — Full Invoice Computation

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

### 14. Cross-Object Aggregation — Project Budget Utilization

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

### 15. Dynamic Document Numbering — Year-Based Sequence

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

### 16. Lookup Set Operations — Active Participants Only

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

### 17. Regex-Based Data Transformation — Phone Number Formatting

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

### 18. Complex Business Rule — SLA Compliance Check

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

### 19. FOREACH — Generate Line Item Summary

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

### 20. Combined Functions — Smart Contract Summary

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

---

## Other Calculation Mode Examples

The examples above all use **Calculate Expression** mode. Below are standalone examples of every other calculation mode.

### Set Static Values

**Scenario:** When a document is moved to "Archived" status, set the `Confidential` property to `true`.

```yaml
Mode:        Set Static Values
Property:    PD.Confidential
Value:       true (Static)
Conditions:
  - Type: Basic Conditions
    Property PD.Status = "Archived"
```

The same mode also sets a property to `NULL` — just choose "Set to NULL" as the Value instead of a static value.
{:.note}

---

### Pick Substring

Full field reference (Remove Substring from Main String, In Error Case, Pick Only Subexpression, etc.): [Pick Substring settings]({{ site.baseurl }}/Built-In/Property-Calculator/Configuration/Calculation-Modes/#pick-substring).
{:.note}

**Scenario:** Incoming scanned documents have titles like `"INV-2026-0042 Acme Corp 15.01.2026"`. Parse them into separate properties.

```yaml
Mode:        Pick Substring
Pick Substrings From: %PROPERTY_{PD.Title}%

Substrings:
  ┌─ Substring 1: RegExp INV-\d{4}-\d+                          → Save To PD.InvoiceNumber  (extracts "INV-2026-0042")
  ├─ Substring 2: RegExp (?<=\d{4}\s)[\w\s]+(?=\s\d{2}\.)        → Save To PD.CustomerName   (extracts "Acme Corp")
  └─ Substring 3: RegExp \d{2}\.\d{2}\.\d{4}                     → Save To PD.DateText       (extracts "15.01.2026")
```

**Scenario — Named group extraction:**
```yaml
Pick Substrings From: %PROPERTY_{PD.Code}%
Substrings:
  └─ Save To:         PD.YearCode
     Condition Type:  Pick first founded RegExp
     RegExp:          PRJ-(?<value>\d{4})-[A-Z]+
     Pick Only Subexpression: ✅
     → From "PRJ-2026-FIN" extracts just "2026"
```

---

### Remove Property

**Scenario:** Remove the `PD.TechnicalReviewDate` property from non-technical documents.

```yaml
Mode:        Remove Property
Property:    PD.TechnicalReviewDate
Conditions:
  - Type: Advanced Conditions
    Expression: lookupName(%PROPERTY_{PD.DocumentType}%) != 'Technical Report'
```

To remove several properties on the same condition (e.g. all approval fields when a document returns to Draft), add one **Remove Property** rule per property — each with the same Conditions block.
{:.note}

---

### Convert Date

Full field reference (Set Timezone, Text Timezone, etc.): [Convert Date settings]({{ site.baseurl }}/Built-In/Property-Calculator/Configuration/Calculation-Modes/#convert-date).
{:.note}

**Scenario:** Convert a date stored as Finnish text (from imported data) into a proper DateTime property.

```yaml
Mode:            Convert Date
Conversion Type: String to Date
Value From:      PD.ImportedDateText     → "15.01.2026"
String Format:   dd.MM.yyyy
Language:        fi-FI
Target Property: PD.DocumentDate
→ Result: 2026-01-15T00:00:00 (DateTime)
```

**Variant — source text includes a timezone:** turn on **Set Timezone** and set **Text Timezone** (e.g. `FLE Standard Time` for UTC+2 Helsinki) to convert the parsed value from UTC into local time as part of the same conversion.
{:.note}

**Scenario:** Format a DateTime property as a locale-specific text for display.

```yaml
Mode:            Convert Date
Conversion Type: Date to String
Value From:      PD.Created              → 2026-05-07T14:30:00
String Format:   d. MMMM yyyy 'klo' HH:mm
Language:        fi-FI
Target Property: PD.CreatedText
→ Result: "7. toukokuuta 2026 klo 14:30"
```

---

### Count Date Or Time

Full field reference (per-operation Increase/Decrease, Unit, Data Type, etc.): [Count Date Or Time settings]({{ site.baseurl }}/Built-In/Property-Calculator/Configuration/Calculation-Modes/#count-date-or-time).
{:.note}

**Scenario:** Set a due date to 5 business days after the received date.

```yaml
Mode:       Count Date Or Time
Property:   PD.DueDate
Base Date:  PD.ReceivedDate            → 2026-01-10 (Friday)
Operations:
  1. Increase by 5 Business Days (Fixed)
→ Result: 2026-01-17 (Friday — skips Sat+Sun)
```

**Scenario:** Calculate warranty expiration as contract start + N months (from metadata).

```yaml
Mode:       Count Date Or Time
Property:   PD.WarrantyExpiration
Base Date:  PD.ContractStart           → 2026-01-01
Operations:
  1. Increase by [PD.WarrantyMonths] Months (From Metadata, PD.WarrantyMonths = 24)
→ Result: 2028-01-01
```

**Scenario:** Chained operations — project milestone with buffer.

```yaml
Mode:       Count Date Or Time
Property:   PD.MilestoneDeadline
Base Date:  PD.ProjectStart            → 2026-01-15
Operations:
  1. Increase by 6 Months (Fixed)            → 2026-07-15
  2. Decrease by 5 Business Days (Fixed)     → 2026-07-08
  3. Set Hour to 17 (Fixed)                  → 2026-07-08 17:00:00
→ Deadline is 6 months out minus 5 business days, at 5 PM
```

---

### Period Length

**Scenario:** Calculate contract duration in days.

```yaml
Mode:       Period Length
Property:   PD.ContractDuration
Start Date: PD.ContractStart          → 2026-01-01
End Date:   PD.ContractEnd            → 2026-12-31
Unit:       Day
Modifier:   1  (inclusive)
→ Result: 366
```

**Scenario:** Calculate processing time in hours.

```yaml
Mode:       Period Length
Property:   PD.ProcessingHours
Start Date: PD.ReceivedTimestamp      → 2026-05-07 08:00
End Date:   PD.CompletedTimestamp     → 2026-05-07 14:30
Unit:       Hour
Modifier:   0
→ Result: 6
```

---

### Filter Lookup Values

**Scenario:** An order's `Related Suppliers` MSLU should only contain suppliers with "Active" status.

```yaml
Mode:       Filter Lookup Values
Property:   PD.RelatedSuppliers (MSLU)
Lookup Values From: PD.RelatedSuppliers
Conditions:
  - Type: Basic Conditions
    Property "Status" equals "Active"
→ Suppliers with Status ≠ Active are removed from the list on each check-in
```

**Scenario:** Filter project tasks to keep only those assigned to the current user's department.

```yaml
Mode:       Filter Lookup Values
Property:   PD.MyDeptTasks (MSLU)
Lookup Values From: PD.AllTasks
Conditions:
  - Type: Compare Properties
    Property X: %PROPERTY_{PD.Department}%
    Comparison: Equal
    Property Y: %PROPERTY_{PD.Department}%
    Read Y from Main Object: ON
→ Keeps only tasks whose Department matches the parent object's Department
```

---

### Order Lookup Values

**Scenario:** Sort an MSLU of meeting participants alphabetically.

```yaml
Mode:       Order Lookup Values
Property:   PD.Participants (MSLU)
Lookup Values From: PD.Participants
Order Type:     Alphabetical
Reverse Order:  ❌ (A → Z)
Order By:       %PROPERTY_{PD.FullName}%
Amount of Lookups: 0 (keep all)
```

**Scenario:** Keep only the 3 most expensive items, sorted by price descending.

```yaml
Mode:       Order Lookup Values
Property:   PD.TopItems (MSLU)
Lookup Values From: PD.AllItems
Order Type:     Numerical
Reverse Order:  ✅ (highest first)
Order By:       %PROPERTY_{PD.Price}%
Amount of Lookups: 3
→ From 10 items, keeps the 3 most expensive, sorted high → low
```

---

### Values From MSLU

**Scenario:** Collect all task descriptions from project tasks into a summary text field.

```yaml
Mode:       Values From MSLU
Property:   PD.TaskSummary (Text)
Multi-Select Lookup: PD.ProjectTasks
Conditions for Listed Object: (none)
→ Result: "Design UI, Implement backend, Write tests, Deploy"
```

**Scenario:** Collect email addresses from active team members only.

```yaml
Mode:       Values From MSLU
Property:   PD.TeamEmails (Text)
Multi-Select Lookup: PD.TeamMembers
Conditions for Listed Object:
  - Type: Basic Conditions
    Property "Status" equals "Active"
→ Result: "alice@company.com, bob@company.com"
  (inactive members excluded)
```

---

### Search Objects

Full field reference (Keep Previous Content, Include Deleted Objects, Add version-specific reference, etc.): [Search Objects settings]({{ site.baseurl }}/Built-In/Property-Calculator/Configuration/Calculation-Modes/#search-objects).
{:.note}

**Scenario:** Populate an MSLU with all invoices belonging to the same customer.

```yaml
Mode:       Search Objects
Property:   PD.CustomerInvoices (MSLU)
Property Conditions:
  - Object Type = Invoice
  - PD.Customer equals %PROPERTY_{PD.Customer}%
Max Results: 50
→ Finds up to 50 invoices for the same customer (add an Additional Condition to exclude e.g. "Cancelled" ones)
```

**Scenario — Value list item resolution by name:**

```yaml
Mode:       Search Objects
Property:   PD.Department (SSLU)
Search Value List Items: ✅
Search By:  Name
Search Value: %PROPERTY_{PD.DepartmentText}%
→ Converts text "Finance" → Department lookup value "Finance" (ID: 3)
```

**Variant — resolving multiple values at once:** target an MSLU property, set **Value Delimiter** (e.g. `,`), and give a delimited Search Value such as `"Urgent,Review,Final"` — each term is resolved to its own lookup value.
{:.note}

---

### Create Object

Full field reference (Create as Copy, Append Text to File Names, Create in Background, etc.): [Create Object settings]({{ site.baseurl }}/Built-In/Property-Calculator/Configuration/Calculation-Modes/#create-object).
{:.note}

**Scenario:** When an order is confirmed, create a single delivery note.

```yaml
Mode:       Create Object
Object Type: DeliveryNote
Duplicate Detection: PD.SourceOrder = (current object)
Other Property Values: PD.Customer = %PROPERTY_{PD.Customer}%, PD.Status = "Pending"
Conditions: PD.Status changes to "Confirmed"
→ Creates one DeliveryNote per confirmed order; skips if one already exists for this order
```

**Scenario — Copy an object as a new revision:**

```yaml
Mode:       Create Object
Create as Copy: ✅
Source Object: (current object GUID)
Properties to be Removed: PD.ApprovedBy, PD.ApprovalDate, PD.DigitalSignature
Other Property Values: PD.Status = "Draft", PD.PreviousRevision = (current object)
Conditions: PD.Status changes to "Superseded"
→ Copies the object as a new Draft revision, stripped of approval data
```

**Scenario — Create separate line items from MSLU:**

```yaml
Mode:       Create Object
Separate Object for Each Value Combination: ✅
Value Combinations: PD.Products → PD.Product
Other Property Values: PD.ParentOrder = (current object)
→ If PD.Products has 3 items, creates 3 separate LineItem objects
```

---

### History

**Scenario:** Preserve the original submission date from when the document was first submitted.

```yaml
Mode:       History
Conditions for Source Version:
  - Type: Basic Conditions
    Property "PD.Status" equals "Submitted"
Copy from All Matching Versions: ❌ (first match only)
Replace Files: ❌
Throw Exception: ❌
Property Mappings:
  - Source: %PROPERTY_{PD.SubmissionDate}% → Target: PD.OriginalSubmissionDate
→ Reads the SubmissionDate from the first version where Status was "Submitted"
```

**Scenario:** Restore approved version's files.

```yaml
Mode:       History
Conditions for Source Version:
  - Type: Basic Conditions
    Property "PD.Status" equals "Approved"
Replace Files: ✅
Throw Exception: ✅
→ Overwrites current files with files from the approved version
→ Throws an error if no approved version exists
```

---

### File Operation

**Scenario:** Prefix all filenames with the document number.

```yaml
Mode:       File Operation
Operation:  PrefixPostfix
Prefix:     %PROPERTY_{PD.DocumentNumber}% -
Postfix:    (empty)
Always Add: ❌
→ "Report.pdf" → "DOC-2026-0042 - Report.pdf"
→ On next check-in, prefix is already there → no change
```

**Scenario:** Add revision code as postfix to filenames.

```yaml
Mode:       File Operation
Operation:  PrefixPostfix
Prefix:     (empty)
Postfix:    _Rev%PROPERTY_{PD.Revision}%
Always Add: ❌
→ "Drawing.dwg" → "Drawing_RevC.dwg"
```

---

### Send Email

**Scenario:** Notify the project manager when a document is approved.

```yaml
Mode:       Send Email
Allow Email Sending: ✅
To:         %PROPERTY_{PD.ProjectManager}.PROPERTY_{PD.Email}%
Subject:    ✅ Approved: %OBJTITLE%
Body:       <h2>Document Approved</h2>
            <p><b>%OBJTITLE%</b> has been approved.</p>
            <p>Approved by: %PROPERTY_{PD.ApprovedBy}%</p>
            <p>Date: %PROPERTY_{PD.ApprovalDate}%</p>
            <p>Value: %PROPERTY_{PD.ContractValue}% EUR</p>
Conditions:
  - Type: Changed Propertyvalues
    Properties: PD.Status
  - Type: Basic Conditions
    Property PD.Status = "Approved"
```

To trigger on a computed condition instead of a simple status match (e.g. "invoice more than 14 days overdue"), use an **Advanced Conditions** entry with an NCalc expression such as `dateDiff(%PROPERTY_{PD.DueDate}%, today(), 'days') > 14`.
{:.note}

---

### Grouping Level

**Scenario:** Group all line item calculations under a shared condition.

```yaml
Mode:       Grouping Level
Name:       "Line Item Financial Calculations"
Conditions:
  - Type: Changed Propertyvalues
    Properties: PD.Quantity, PD.UnitPrice, PD.DiscountPercent

Nested Properties:
  ┌─ Rule 1: "Gross Amount"
  │  Mode: Calculate Expression
  │  Property: PD.GrossAmount
  │  Expression: %PROPERTY_{PD.Quantity}% * %PROPERTY_{PD.UnitPrice}%
  │
  ├─ Rule 2: "Discount Amount"
  │  Mode: Calculate Expression
  │  Property: PD.DiscountAmount
  │  Expression: %PROPERTY_{PD.GrossAmount}% * ifNull(%PROPERTY_{PD.DiscountPercent}%, 0) / 100
  │
  └─ Rule 3: "Net Amount"
     Mode: Calculate Expression
     Property: PD.NetAmount
     Expression: %PROPERTY_{PD.GrossAmount}% - %PROPERTY_{PD.DiscountAmount}%

→ All 3 rules only execute when Quantity, UnitPrice, or DiscountPercent changes
→ The Changed Propertyvalues condition on the group applies to all nested rules
```

---

## Complete Configuration Examples

These examples show how different calculation modes fit together in a full Class Group configuration. Each rule's `Mode:` line states its calculation mode explicitly; where a rule below uses something other than **Calculate Expression**, that contrast is called out here once rather than after every individual rule.

### Example A: Invoice Processing Group

This example uses **Calculate Expression**, **Count Date Or Time**, **Set Static Values**, and **Send Email** modes:

```yaml
Class Group:
  Name:        "Invoice Calculations"
  Class:       Invoice
  Event Handler: BeforeCheckInChangesFinalize

  Properties:
    ┌─ Rule 1: "Calculate Line Total"
    │  Mode:       Calculate Expression
    │  Property:   PD.LineTotal
    │  Expression: %PROPERTY_{PD.Quantity}% * %PROPERTY_{PD.UnitPrice}%
    │  Evaluate as Expression: ✅
    │
    ├─ Rule 2: "Calculate Subtotal"
    │  Mode:       Calculate Expression
    │  Property:   PD.Subtotal
    │  Expression: Sum(%PROPERTY_{PD.InvoiceLines}.PROPERTY_{PD.LineTotal}%)
    │  Evaluate as Expression: ✅
    │
    ├─ Rule 3: "Calculate VAT"
    │  Mode:       Calculate Expression
    │  Property:   PD.VATAmount
    │  Expression: Round(%PROPERTY_{PD.Subtotal}% * 0.24, 2)
    │  Evaluate as Expression: ✅
    │
    ├─ Rule 4: "Calculate Total"
    │  Mode:       Calculate Expression
    │  Property:   PD.InvoiceTotal
    │  Expression: %PROPERTY_{PD.Subtotal}% + %PROPERTY_{PD.VATAmount}%
    │  Evaluate as Expression: ✅
    │
    ├─ Rule 5: "Set Payment Due Date"
    │  Mode:       Count Date Or Time
    │  Property:   PD.DueDate
    │  Base Date:  PD.InvoiceDate
    │  Operations:
    │    1. Increase by 30 Days (Fixed)
    │  Conditions:
    │    - Type: Changed Propertyvalues
    │      Value Changed: Propertyvalue Changed
    │      Properties: PD.InvoiceDate
    │
    └─ Rule 6: "Send Payment Reminder"
       Mode:       Send Email
       Allow Email Sending: ✅
       To:         %PROPERTY_{PD.Customer}.PROPERTY_{PD.Email}%
       Subject:    Payment Due: Invoice %PROPERTY_{PD.InvoiceNumber}%
       Body:       <p>Invoice <b>%PROPERTY_{PD.InvoiceNumber}%</b></p>
                   <p>Total: %PROPERTY_{PD.InvoiceTotal}% EUR</p>
                   <p>Due: %PROPERTY_{PD.DueDate}%</p>
       Conditions:
         - Type: Changed Propertyvalues
           Value Changed: Propertyvalue Changed
           Properties: PD.Status
         - Type: Basic Conditions
           Property PD.Status = "Sent"

  Error Cases:
    ┌─ "Require Customer"
    │  Error Message: "Invoice must have a customer assigned."
    │  Block Modification: ✅
    │  Conditions:
    │    - Type: Basic Conditions
    │      Property PD.Customer is empty
    │
    └─ "Minimum Amount"
       Error Message: "Invoice total must be at least 1.00 EUR."
       Block Modification: ✅
       Conditions:
         - Type: Advanced Conditions
           Expression: %PROPERTY_{PD.InvoiceTotal}% < 1

  Update Related Objects:
    └─ "Update Customer Statistics"
       Related Object: PD.Customer (Direct)
       Update delay (minutes): 0
       Conditions:
         - Type: Changed Propertyvalues
           Value Changed: Propertyvalue Changed
           Properties: PD.InvoiceTotal
```

---

### Example B: Contract Management with Multiple Modes

This example uses **Calculate Expression**, **Period Length**, **History**, **Set Static Values**, **Create Object**, and **Remove Property** modes:

```yaml
Class Group:
  Name:        "Contract Management"
  Class:       Contract
  Event Handler: BeforeCheckInChangesFinalize

  Properties:
    ┌─ Rule 1: "Contract Duration (days)"
    │  Mode:       Period Length
    │  Property:   PD.DurationDays
    │  Start Date: PD.StartDate
    │  End Date:   PD.EndDate
    │  Unit:       Day
    │  Modifier:   1  (inclusive of both dates)
    │
    ├─ Rule 2: "Expiry Warning"
    │  Mode:       Calculate Expression
    │  Property:   PD.ExpiryStatus
    │  Expression: let('d', dateDiff(today(), %PROPERTY_{PD.EndDate}%, 'days'),
    │                iif(get('d') < 0, 'Expired',
    │                  iif(get('d') <= 30, 'Expiring Soon', 'Active')))
    │  Evaluate as Expression: ✅
    │
    ├─ Rule 3: "Total Amendments Value"
    │  Mode:       Calculate Expression
    │  Property:   PD.AmendmentsTotal
    │  Expression: Sum(%PROPERTY_{PD.Amendments}.PROPERTY_{PD.AmendmentValue}%)
    │  Evaluate as Expression: ✅
    │
    ├─ Rule 4: "Effective Contract Value"
    │  Mode:       Calculate Expression
    │  Property:   PD.EffectiveValue
    │  Expression: %PROPERTY_{PD.OriginalValue}% + ifNull(%PROPERTY_{PD.AmendmentsTotal}%, 0)
    │  Evaluate as Expression: ✅
    │
    ├─ Rule 5: "Preserve Original Submission Date"
    │  Mode:       History
    │  Conditions for Source Version:
    │    - Type: Basic Conditions
    │      Property "PD.Status" = "Submitted"
    │  Property Mappings:
    │    - Source: %PROPERTY_{PD.Created}% → Target: PD.OriginalSubmissionDate
    │  Throw Exception: ❌
    │
    ├─ Rule 6: "Set Archived Flag"
    │  Mode:       Set Static Values
    │  Property:   PD.IsArchived
    │  Value:      true (Static)
    │  Conditions:
    │    - Type: Basic Conditions
    │      Property "PD.Status" = "Archived"
    │
    ├─ Rule 7: "Remove Rejection Fields When Not Rejected"
    │  Mode:       Remove Property
    │  Property:   PD.RejectionReason
    │  Conditions:
    │    - Type: Basic Conditions
    │      Property "PD.Status" NOT equals "Rejected"
    │
    └─ Rule 8: "Create Renewal Task"
       Mode:       Create Object
       Create as Copy: ❌
       Object Type: Task
       Create Only If Does Not Exist: ✅
       Duplicate Detection:
         - PD.SourceContract = (current object)
         - PD.TaskType = "Renewal"
       Other Property Values:
         - PD.TaskName = "Renew: %OBJTITLE%"
         - PD.AssignedTo = %PROPERTY_{PD.ContractOwner}%
         - PD.SourceContract = (current object)
         - PD.TaskType = "Renewal"
       Conditions:
         - Type: Advanced Conditions
           Expression: dateDiff(today(), %PROPERTY_{PD.EndDate}%, 'days') <= 60

  Error Cases:
    ┌─ "Prevent Active Contract Deletion"
    │  Error Message: "Active contracts cannot be deleted. 
    │                  Change status to Terminated first."
    │  Block Delete: ✅
    │  Block Destroy: ✅
    │  Conditions:
    │    - Type: Basic Conditions
    │      Property PD.Status equals "Active"
    │
    └─ "End Date After Start Date"
       Error Message: "Contract end date must be after start date."
       Block Modification: ✅
       Conditions:
         - Type: Compare Properties
           Property X: %PROPERTY_{PD.EndDate}%
           Comparison: Less Than
           Property Y: %PROPERTY_{PD.StartDate}%
```

---

### Example C: Document Processing with File Operations and Parsing

This example uses **Pick Substring**, **Convert Date**, **File Operation**, **Search Objects**, **Filter Lookup Values**, and **Calculate Expression** modes:

```yaml
Class Group:
  Name:        "Document Processing"
  Custom Group: ✅
  Group Conditions: Object Type = Document

  Properties:
    ┌─ Rule 1: "Parse Document Code from Title"
    │  Mode:       Pick Substring
    │  Pick Substrings From: %PROPERTY_{PD.Title}%
    │  Remove Substring from Main String: ❌
    │  In Error Case: Do nothing
    │  Substrings:
    │    ├─ Substring 1:
    │    │  Save To:           PD.DocumentNumber
    │    │  Condition Type:    Pick first founded RegExp
    │    │  RegExp:            [A-Z]{3}-\d{4}-\d+
    │    │  → From "Specification DOC-2026-0042 v3" extracts "DOC-2026-0042"
    │    │
    │    └─ Substring 2:
    │       Save To:           PD.VersionTag
    │       Condition Type:    Pick first founded RegExp
    │       RegExp:            v\d+
    │       → Extracts "v3"
    │
    ├─ Rule 2: "Convert Scanned Date to DateTime"
    │  Mode:       Convert Date
    │  Conversion Type: String to Date
    │  Value From:    PD.ScannedDateText       → "15.01.2026"
    │  String Format: dd.MM.yyyy
    │  Language:      fi-FI
    │  → Result:      2026-01-15T00:00:00 (DateTime property)
    │
    ├─ Rule 3: "Rename Files with Document Number"
    │  Mode:       File Operation
    │  Operation:  PrefixPostfix
    │  Prefix:     %PROPERTY_{PD.DocumentNumber}% -
    │  Postfix:    (empty)
    │  Always Add: ❌
    │  → "Specification.pdf" → "DOC-2026-0042 - Specification.pdf"
    │  → Next check-in: unchanged (prefix already exists)
    │
    ├─ Rule 4: "Find Related Specifications"
    │  Mode:       Search Objects
    │  Property:   PD.RelatedSpecs (MSLU)
    │  Search Value List Items: ❌
    │  Property Conditions:
    │    - Object Type = Document
    │    - PD.ProjectCode equals %PROPERTY_{PD.ProjectCode}%
    │    - PD.DocumentType equals "Specification"
    │  Keep Previous Content: ❌
    │  Max Results: 20
    │  → Populates MSLU with all specifications from the same project
    │
    ├─ Rule 5: "Keep Only Active Related Specs"
    │  Mode:       Filter Lookup Values
    │  Property:   PD.RelatedSpecs
    │  Lookup Values From: PD.RelatedSpecs
    │  Conditions:
    │    - Type: Basic Conditions
    │      Property "PD.Status" equals "Active"
    │  → Removes any specification from the list where Status ≠ Active
    │
    ├─ Rule 6: "Detect Document Category by Filename"
    │  Mode:       Calculate Expression
    │  Property:   PD.Category
    │  Expression: switch(true,
    │                like(filename(), '*invoice*'), lookupByName('Invoice'),
    │                like(filename(), '*contract*'), lookupByName('Contract'),
    │                like(filename(), '*report*'), lookupByName('Report'),
    │                lookupByName('Other'))
    │  Evaluate as Expression: ✅
    │  Conditions:
    │    - Type: File Modified
    │      File Change Type: File Added
    │
    └─ Rule 7: "File Summary"
       Mode:       Calculate Expression
       Property:   PD.FileSummary
       Expression: concat(filecount(), ' file(s): ', filenames(', '))
       Evaluate as Expression: ✅
```

---

### Example D: Order Processing with Value List Resolution and Line Item Creation

This example uses **Search Objects** (value list mode), **Order Lookup Values**, **Values From MSLU**, and **Create Object** modes:

```yaml
Class Group:
  Name:        "Order Processing"
  Class:       PurchaseOrder
  Event Handler: BeforeCheckInChangesFinalize

  Properties:
    ┌─ Rule 1: "Resolve Supplier from External ID"
    │  Mode:       Search Objects
    │  Property:   PD.Supplier (SSLU)
    │  Search Value List Items: ✅
    │  Search By:  External ID
    │  Search Value: %PROPERTY_{PD.SupplierExtId}%
    │  → Text "EXT-42" → resolves to Supplier lookup value with external ID "EXT-42"
    │  Conditions:
    │    - Type: Changed Propertyvalues
    │      Properties: PD.SupplierExtId
    │
    ├─ Rule 2: "Sort Line Items by Amount (Highest First)"
    │  Mode:       Order Lookup Values
    │  Property:   PD.OrderLines (MSLU)
    │  Lookup Values From: PD.OrderLines
    │  Order Type:    Numerical
    │  Reverse Order: ✅ (descending)
    │  Order By:      %PROPERTY_{PD.LineAmount}%
    │  Amount of Lookups: 0 (keep all)
    │  → Reorders the MSLU so highest-value lines appear first
    │
    ├─ Rule 3: "Collect All Product Names"
    │  Mode:       Values From MSLU
    │  Property:   PD.ProductSummary (Text)
    │  Multi-Select Lookup: PD.OrderLines
    │  Conditions for Listed Object: (none)
    │  → Result: "Widget A, Widget B, Widget C"
    │
    └─ Rule 4: "Create Individual Delivery Notes"
       Mode:       Create Object
       Object Type: DeliveryNote
       → Same "confirmed order → create DeliveryNote" setup as the Create Object example
         above (Create in Background, Conditions on PD.Status = "Confirmed", etc.) —
         only the fields below differ:
       Separate Object for Each Value Combination: ✅
       Value Combinations:
         - From: PD.OrderLines → To: PD.SourceOrderLine
       Duplicate Detection:
         - PD.SourceOrder = (current object)
         - PD.SourceOrderLine = (value from combination)
       → Creates one DeliveryNote per order line when order is confirmed
```
