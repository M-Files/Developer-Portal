---
layout: page
title: Property Calculator Other Calculation Mode Examples
includeInSearch: true
breadcrumb: Other Calculation Modes
excerpt: Standalone examples for every calculation mode besides Calculate Expression — Set Static Values, Pick Substring, Remove Property, Convert Date, Count Date Or Time, Period Length, the MSLU modes, Search Objects, Create Object, History, File Operation, Send Email, and Grouping Level.
---

The [Basic]({{ site.baseurl }}/Built-In/Property-Calculator/Examples/Basic/), [Intermediate]({{ site.baseurl }}/Built-In/Property-Calculator/Examples/Intermediate/), and [Advanced]({{ site.baseurl }}/Built-In/Property-Calculator/Examples/Advanced/) example pages all use **Calculate Expression** mode. This page covers standalone examples of every other calculation mode.

## Set Static Values

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

## Pick Substring

Full field reference (Remove Substring from Main String, In Error Case, Pick Only Subexpression, etc.): [Pick Substring settings]({{ site.baseurl }}/Built-In/Property-Calculator/Configuration/Calculation-Modes/#pick-substring).
{:.note}

**Scenario:** Incoming scanned documents have titles like `"INV-2026-0042 Acme Corp 15.01.2026"`. Parse them into separate properties.

```yaml
Mode:        Pick Substring
Pick Substrings From: %PROPERTY_{PD.Title}%

Substrings:
  - Substring 1: RegExp INV-\d{4}-\d+                          → Save To PD.InvoiceNumber  (extracts "INV-2026-0042")
  - Substring 2: RegExp (?<=\d{4}\s)[\w\s]+(?=\s\d{2}\.)        → Save To PD.CustomerName   (extracts "Acme Corp")
  - Substring 3: RegExp \d{2}\.\d{2}\.\d{4}                     → Save To PD.DateText       (extracts "15.01.2026")
```

**Scenario — Named group extraction:**
```yaml
Pick Substrings From: %PROPERTY_{PD.Code}%
Substrings:
  - Save To:         PD.YearCode
    Condition Type:  Pick first founded RegExp
    RegExp:          PRJ-(?<value>\d{4})-[A-Z]+
    Pick Only Subexpression: ✅
    → From "PRJ-2026-FIN" extracts just "2026"
```

---

## Remove Property

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

## Convert Date

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

## Count Date Or Time

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

## Period Length

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

## Filter Lookup Values

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

## Order Lookup Values

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

## Values From MSLU

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

## Search Objects

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

## Create Object

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

## History

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

## File Operation

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

## Send Email

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

## Grouping Level

**Scenario:** Group all line item calculations under a shared condition.

```yaml
Mode:       Grouping Level
Name:       "Line Item Financial Calculations"
Conditions:
  - Type: Changed Propertyvalues
    Properties: PD.Quantity, PD.UnitPrice, PD.DiscountPercent

Nested Properties:
  - Rule 1: "Gross Amount"
    Mode: Calculate Expression
    Property: PD.GrossAmount
    Expression: %PROPERTY_{PD.Quantity}% * %PROPERTY_{PD.UnitPrice}%

  - Rule 2: "Discount Amount"
    Mode: Calculate Expression
    Property: PD.DiscountAmount
    Expression: %PROPERTY_{PD.GrossAmount}% * ifNull(%PROPERTY_{PD.DiscountPercent}%, 0) / 100

  - Rule 3: "Net Amount"
    Mode: Calculate Expression
    Property: PD.NetAmount
    Expression: %PROPERTY_{PD.GrossAmount}% - %PROPERTY_{PD.DiscountAmount}%

→ All 3 rules only execute when Quantity, UnitPrice, or DiscountPercent changes
→ The Changed Propertyvalues condition on the group applies to all nested rules
```
