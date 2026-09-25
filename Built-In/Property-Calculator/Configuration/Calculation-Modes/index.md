---
layout: page
title: Property Calculator Calculation Modes
includeInSearch: true
breadcrumb: Calculation Modes
excerpt: Reference for all 16 calculation modes available on a Property Calculator property-calculation rule, from evaluating NCalc expressions to creating objects, sending email, and manipulating multi-select lookups.
---

Each property calculation rule has a **Mode** that determines what kind of operation it performs. There are 16 available modes:

> **Quick Start:** New to Property Calculator? Most configurations only need a handful of these
> modes. Start with **[Calculate Expression](#calculate-expression)** (computing values from other
> properties), **[Set Static Values](#set-static-values)** (setting a fixed value on a condition),
> and **[Count Date Or Time](#count-date-or-time)** (deadline/date math) — together these cover the
> majority of everyday calculation rules. The rest are for more specific needs.

## Calculate Expression

**The most commonly used mode.** Evaluates a text expression and saves the result to the target property.

**Use when:** You need to compute or combine a value from other properties — the default choice for most calculated properties, whether that's arithmetic, string building, or conditional logic via NCalc functions.

| Setting | Description |
|---------|-------------|
| **Expression** | The expression to evaluate — supports placeholders and NCalc functions |
| **Evaluate as Expression** | When ON: uses NCalc engine for full expression evaluation. When OFF: simple text replacement (placeholders are replaced with values but no calculation occurs) |
| **Keep Previous Content** | When ON: appends the new result to the property's existing content instead of overwriting it (multiline text / MSLU targets) |

**Simple placeholder mode** (Evaluate as Expression = OFF):
```text
Invoice %PROPERTY_{PD.InvoiceNumber}% - %PROPERTY_{PD.CustomerName}%
```
Result: `Invoice 12345 - Acme Corp`

**NCalc expression mode** (Evaluate as Expression = ON):
```text
%PROPERTY_{PD.Quantity}% * %PROPERTY_{PD.UnitPrice}% * (1 + 0.24)
```
Result: `6200` (if quantity=20, price=250)

See [NCalc Expressions]({{ site.baseurl }}/Built-In/Property-Calculator/NCalc-Expressions/) for complete expression syntax and [Examples]({{ site.baseurl }}/Built-In/Property-Calculator/Examples/) for practical examples.
{:.note}

---

## Set Static Values

Directly sets a specific value to a property — no expression evaluation needed.

**Use when:** You need to set a fixed lookup value, a specific date, or a constant text value based on conditions.

| Setting | Type | Description |
|---------|------|-------------|
| **Keep Previous Content** | Toggle | When ON: appends to existing MSLU values instead of replacing |
| **Value** | TypedValueSetter | The value to set — select "Set to NULL" to clear the property, or "Static" to set a fixed value. The input type adapts to the target property (text, number, date, lookup ID, etc.) |

**Example — Set reviewer on approval:**
When a document reaches "Approved" state, set `PD.ApprovedBy` to user lookup ID 42.

**Example — Clear a property:**
When status changes to "Draft", set `PD.Manager` to NULL (remove the assignment).

**Example — Append to MSLU:**
With `Keep Previous Content` ON, add a lookup value to an existing multi-select list without clearing previous selections.

---

## Pick Substring

Extracts portions of text using regular expressions and saves them to one or more target properties. Can also modify the source string by removing extracted parts.

**Use when:** You need to parse structured text into separate properties (e.g., split a filename, extract codes from a title, parse imported text fields).

| Setting | Type | Description |
|---------|------|-------------|
| **Pick Substrings From** | Text | Source text — supports placeholders (e.g., `%PROPERTY_{PD.Title}%`) |
| **Remove Substring from Main String** | Toggle | When ON: extracted text is removed from the source property value |
| **Substrings** | List | One or more extraction rules (see below) |
| **In Error Case** | Dropdown | What happens when regex doesn't match: `Show error for user`, `Write error to log`, `Do nothing` |

**Substring extraction rules:**

| Setting | Description |
|---------|-------------|
| **Save Substring To** | Target property where the extracted text is saved |
| **Condition Type** | `Pick text until RegExp` — extracts everything before the match. `Pick first founded RegExp` — extracts the match itself. |
| **RegExp** | C# regular expression pattern |
| **Pick Only Subexpression** | When ON: extracts only the named group `(?<value>...)` instead of the full match |

**Example — Parse "INV-2026-0042 Acme Corp":**
```yaml
Source:     %PROPERTY_{PD.RawTitle}%

Substring 1:
  Condition: Pick first founded RegExp
  RegExp:    INV-\d{4}-\d+
  Save To:   PD.InvoiceNumber
  → Result:  "INV-2026-0042"

Substring 2:
  Condition: Pick text until RegExp
  RegExp:    $  (end of string)
  Save To:   PD.CustomerName
  → Result:  " Acme Corp"
```

**Example — Extract with named group:**
```yaml
Source:     %PROPERTY_{PD.Code}%
RegExp:    PRJ-(?<value>\d+)-[A-Z]+
Pick Only Subexpression: ✅
→ From "PRJ-2026-FIN" extracts "2026"
```

---

## Remove Property

Removes a property definition from the object entirely — not just clearing the value, but removing the property from the metadata card so it's no longer visible.

**Use when:** A property should only exist under certain conditions and should be completely absent otherwise (e.g., remove "Rejection Reason" when status is not "Rejected").

The target property is the one that gets removed. No additional settings — just the target property and conditions.

**Example — Remove rejection fields when approved:**
```yaml
Target Property: PD.RejectionReason
Conditions:
  - Type: Basic Conditions
    Property "PD.Status" NOT equals "Rejected"
→ RejectionReason property disappears from the metadata card for non-rejected objects
```

**Example — Remove optional properties by document type:**
```yaml
Target Property: PD.InvoiceNumber
Conditions:
  - Type: Advanced Conditions
    Expression: lookupName(%PROPERTY_{PD.DocumentType}%) != 'Invoice'
→ InvoiceNumber property is removed from non-invoice documents
```

The property is removed from the object's metadata card, not from the vault's property definition. It can reappear on future check-ins if conditions change.
{:.note}

---

## Convert Date

Converts between text and Date/Time property types using configurable format strings and culture settings.

**Use when:** You have a date stored as text (e.g., from imported/scanned data) and need it as a proper Date/Time value, or you need to format a date into a specific text representation.

| Setting | Type | Description |
|---------|------|-------------|
| **Conversion Type** | Dropdown | `String to Date` — parse text into DateTime. `Date to String` — format DateTime as text. |
| **Value From** | Property | The source property to convert |
| **String Format** | Text | .NET date format string (default: `dd.MM.yyyy HH.mm:ss`). Examples: `yyyy-MM-dd`, `MM/dd/yyyy`, `d.M.yyyy` |
| **Language** | Text | CultureInfo name for locale-specific parsing (e.g., `fi-FI`, `en-US`, `de-DE`). Affects month names, separators, etc. |
| **Set Timezone** | Toggle | When ON: applies timezone conversion |
| **Text Timezone** | Text | Source/target timezone (default: `FLE Standard Time` = UTC+2 Helsinki). Uses Windows timezone IDs. |

**Example — Parse Finnish date:**
```yaml
Conversion Type: String to Date
Value From:      PD.DateText        → "15.01.2026"
String Format:   dd.MM.yyyy
Language:        fi-FI
→ Result:        2026-01-15T00:00:00 (DateTime)
```

**Example — Format date for display:**
```yaml
Conversion Type: Date to String
Value From:      PD.Created          → 2026-05-07T14:30:00
String Format:   d. MMMM yyyy
Language:        fi-FI
→ Result:        "7. toukokuuta 2026"
```

For simple date arithmetic, use **Count Date Or Time** or **Calculate Expression** with `dateAdd()` instead.
{:.note}

---

## Count Date Or Time

Adds or subtracts time units from a base date/time. Supports multiple chained operations and can use either fixed values or values from other properties.

**Use when:** You need to calculate deadlines, expiration dates, or scheduled dates with straightforward add/subtract logic.

| Setting | Type | Description |
|---------|------|-------------|
| **Base Date or Time** | Property | Starting date/time property |
| **Date/Time Operations** | List | One or more add/subtract operations applied sequentially |

**Each operation:**

| Setting | Type | Description |
|---------|------|-------------|
| **Increase/Decrease** | Dropdown | `Increase` — add time, `Decrease` — subtract time, `Set` — set component directly |
| **Unit** | Dropdown | `Year`, `Month`, `Day`, `Business Days`, `Hour`, `Minute`, `Second` |
| **Data Type** | Dropdown | `Fixed` — use a constant value, `From Metadata` — read value from a property |
| **Fixed Value** | Integer | Number of units (visible when Data Type = Fixed) |
| **Property** | Property | Source property for the amount (visible when Data Type = From Metadata) |

**Example — Due date 30 days after invoice:**
```yaml
Base Date:  PD.InvoiceDate
Operations:
  1. Increase by 30 Days (Fixed)
→ Invoice date 2026-01-15 → Due date 2026-02-14
```

**Example — Business days deadline:**
```yaml
Base Date:  PD.ReceivedDate
Operations:
  1. Increase by 5 Business Days (Fixed)
→ Received Friday 2026-01-10 → Deadline Friday 2026-01-17
  (skips Saturday + Sunday)
```

**Example — Dynamic from metadata:**
```yaml
Base Date:  PD.ContractStart
Operations:
  1. Increase by [PD.ContractMonths] Months (From Metadata)
→ Start 2026-01-01, ContractMonths=12 → End 2027-01-01
```

**Example — Multiple operations chained:**
```yaml
Base Date:  PD.ProjectStart
Operations:
  1. Increase by 6 Months (Fixed)
  2. Decrease by 5 Business Days (Fixed)
→ Deadline = 6 months after start, minus 5 business days buffer
```

For more complex date logic (conditional dates, comparisons), use **Calculate Expression** with `dateAdd()` function.
{:.note}

---

## Period Length

Calculates the numerical difference between two date properties in configurable time units.

| Setting | Type | Description |
|---------|------|-------------|
| **Start Date** | Property | First date property |
| **End Date** | Property | Second date property |
| **Unit** | Dropdown | `Day` (default), `Hour`, `Minute`, `Second` |
| **Modifier** | Integer | Added to the result (default: `1`). Formula: `(end − start) + modifier`. Set to 0 for exact difference. |

**Example — Contract duration in days:**
```yaml
Start Date: PD.ContractStart   → 2026-01-01
End Date:   PD.ContractEnd     → 2026-12-31
Unit:       Day
Modifier:   1
→ Result:   366 days (inclusive of both end dates)
```

**Example — Exact duration (no modifier):**
```yaml
Start Date: PD.StartDate
End Date:   PD.EndDate
Unit:       Day
Modifier:   0
→ End 2026-01-31 − Start 2026-01-01 = 30 days
```

**Example — Hours between timestamps:**
```yaml
Start Date: PD.CheckInTime
End Date:   PD.CheckOutTime
Unit:       Hour
Modifier:   0
→ 14:00 − 08:00 = 6 hours
```

For period calculations in months or years, use **Calculate Expression** mode with `dateDiff()` function.
{:.note}

---

## Filter Lookup Values

Removes lookup values from a Multi-Select Lookup property that don't match specified filtering conditions. The conditions are evaluated against each linked object — those that fail are removed from the MSLU.

**Use when:** You want to automatically clean up MSLU values based on the current state of referenced objects (e.g., keep only active items).

| Setting | Type | Description |
|---------|------|-------------|
| **Lookup Values From** | Property | The MSLU property to filter |
| **Conditions** | List&lt;ConditionsConfig&gt; | Conditions evaluated against each linked object — objects that match are KEPT |

**Example — Keep only active contracts:**
```yaml
Lookup Values From: PD.RelatedContracts
Conditions:
  - Type: Basic Conditions
    Property "Status" equals "Active"
→ Removes any contract from the MSLU whose Status ≠ Active
```

**Example — Keep only items with value > 0:**
```yaml
Lookup Values From: PD.InvoiceLines
Conditions:
  - Type: Advanced Conditions
    Expression: %PROPERTY_{PD.Amount}% > 0
→ Removes zero-value line items from the list
```

---

## Order Lookup Values

Reorders items in a Multi-Select Lookup property according to configurable sort criteria. Can sort alphabetically or numerically, by any property of the linked objects.

**Use when:** The display order of MSLU items matters (e.g., sorted by date, name, priority, or amount).

| Setting | Type | Description |
|---------|------|-------------|
| **Lookup Values From** | Property | The MSLU property to reorder |
| **Order Type** | Dropdown | `Alphabetical` or `Numerical` |
| **Reverse Order** | Toggle | When ON: descending order (Z→A or high→low) |
| **Order By** | Text | Expression/placeholder for the sort key — reads a property from each linked object (e.g., `%PROPERTY_{PD.Name}%`) |
| **Amount of Lookups** | Integer | Maximum number of items to keep after sorting (0 = keep all) |

**Example — Sort line items by amount (highest first):**
```yaml
Lookup Values From: PD.InvoiceLines
Order Type:         Numerical
Reverse Order:      ✅
Order By:           %PROPERTY_{PD.Amount}%
Amount of Lookups:  0
→ Lines sorted from highest to lowest amount
```

**Example — Keep top 5 by date:**
```yaml
Lookup Values From: PD.RelatedDocuments
Order Type:         Alphabetical  (dates sort alphabetically in ISO format)
Reverse Order:      ✅
Order By:           %PROPERTY_{PD.Created}%
Amount of Lookups:  5
→ Keeps only the 5 most recently created documents
```

---

## Values From MSLU

Collects property values from all objects referenced in a Multi-Select Lookup and writes the aggregated result to the target property. Can filter which linked objects contribute.

**Use when:** You need to gather data from multiple related objects into a single property (e.g., collect all descriptions, concatenate names, merge lookup values).

| Setting | Type | Description |
|---------|------|-------------|
| **Multi-Select Lookup** | Property | The MSLU property containing object references |
| **Conditions for Listed Object** | List&lt;ConditionsConfig&gt; | Optional filter — only objects matching these conditions contribute values |

The target property receives the collected values. For text properties, values are concatenated. For MSLU properties, lookup values are merged.

**Example — Collect all task names into a text field:**
```yaml
Multi-Select Lookup:          PD.ProjectTasks
Target Property:              PD.TaskSummary
Conditions for Listed Object: (none — include all)
→ Result: "Design, Development, Testing, Deployment"
```

**Example — Collect active members only:**
```yaml
Multi-Select Lookup:          PD.TeamMembers
Target Property:              PD.ActiveMembers
Conditions for Listed Object:
  - Type: Basic Conditions
    Property "Status" equals "Active"
→ Only active team members appear in the result
```

For numeric aggregation (sum, average, etc.) over MSLU values, use **Calculate Expression** with chained placeholders and aggregation functions instead.
{:.note}

---

## Search Objects

Searches the vault for objects or value list items matching specified conditions and saves the results as a lookup property value. Supports both object searches and value list item lookups.

**Use when:** You need to dynamically find and link objects based on property matches, or resolve value list items by name/external ID.

| Setting | Type | Description |
|---------|------|-------------|
| **Search Value List Items** | Toggle | When ON: searches value list items instead of objects |
| **Search Value List Items By** | Dropdown | `Name`, `External ID`, or `Internal ID` (visible when above is ON) |
| **Value List Search Value** | Text | The value to search for — supports placeholders (visible when above is ON) |
| **Property Conditions** | List | Property-based search conditions for object searches |
| **Additional Conditions** | Search Conditions | Standard M-Files search conditions for further filtering |
| **Keep Previous Content** | Toggle | When ON: appends results to existing MSLU values |
| **Max Number of Results** | Integer | Maximum number of results to return (0 = unlimited) |

**Example — Find invoices for the same customer:**
```yaml
Target Property:      PD.RelatedInvoices (MSLU)
Search Value List Items: ❌
Property Conditions:
  - Object Type = Invoice
  - PD.Customer equals %PROPERTY_{PD.Customer}%
Max Results:          10
→ Populates MSLU with up to 10 invoices for the same customer
```

**Advanced options**

| Setting | Type | Description |
|---------|------|-------------|
| **Value Delimiter** | Text | Delimiter for splitting the search value into multiple terms |
| **Include Deleted Objects** | Toggle | When ON: also searches deleted objects |
| **Add version-specific reference** | Toggle | When ON: each result references the **exact version** of the found object at calculation time, instead of always following its latest version. Applies to **object search only** (hidden when *Search Value List Items* is ON). |

> **Concept — version-specific references:** By default, a saved lookup follows the **latest version** of its target object as that object keeps changing. Enabling a version-specific option instead pins the reference to the **exact version** that existed when the calculation ran, so the metadata card keeps pointing at that historical version even after the target object is edited further. This mechanism is shared by **Add version-specific reference** here, **Source Version Reference Is Version-Specific** in [History](#history), and the [`lookupVersion()`]({{ site.baseurl }}/Built-In/Property-Calculator/NCalc-Expressions/#lookupversiontarget-version) NCalc function.

---

## Create Object

Creates a new M-Files object with configured property values. Can create from scratch or as a copy of an existing object. Supports creating multiple objects from value combinations.

**Use when:** You need to automatically generate new objects based on existing object data (e.g., create a task when a document reaches a specific state, generate sub-items from a template).

| Setting | Type | Description |
|---------|------|-------------|
| **Create as Copy** | Toggle | When ON: copies an existing object (including files). When OFF: creates a new blank object. |
| **Source Object** | Text | GUID or placeholder for the object to copy (visible when Create as Copy = ON) |
| **Object Type** | ObjType | Type of the new object (visible when Create as Copy = OFF) |
| **Separate Object for Each Value Combination** | Toggle | When ON: creates multiple objects, one per value combination |
| **Value Combinations** | List | Property mappings that define how to split into multiple objects. Each `ValueCombination` maps `PropertyValuesFrom` → `PropertyValueTo`. |
| **Create Only If Does Not Exist** | Toggle | When ON: checks for duplicates before creating |
| **Conditions for Duplicate Detection** | List | Property conditions for checking if a matching object already exists |
| **Other Property Values** | List | Additional properties to set on the new object (supports placeholders from source) |
| **Create in Background** | Toggle | When ON: creates the object in a background task instead of during check-in |

**Example — Create task from document:**
```yaml
Create as Copy: ❌
Object Type:    Task
Create Only If Does Not Exist: ✅
Duplicate Detection:
  - PD.SourceDocument = %PROPERTY_{PD.ObjectID}%
Other Property Values:
  - PD.TaskName       = "Review: %OBJTITLE%"
  - PD.AssignedTo     = %PROPERTY_{PD.Reviewer}%
  - PD.DueDate        = (calculated separately)
  - PD.SourceDocument = %PROPERTY_{PD.ObjectID}%
Conditions:
  - Status changes to "Pending Review"
→ Creates one task per document, prevents duplicates
```

This operation creates real objects in the vault. Use `Create Only If Does Not Exist` and test conditions carefully to avoid creating duplicate objects on repeated check-ins.
{:.note.warning}

**Advanced options**

These settings apply to the less common "copy as template" and "split into multiple objects" variants of Create Object:

| Setting | Type | Description |
|---------|------|-------------|
| **Properties to be Removed** | List | Properties to remove from the copy (visible when Create as Copy = ON) — typically used with `Create as Copy` to clear fields like approvals from a copied template |
| **Append Text to File Names** | Text | Text (supports placeholders) appended to each copied file's name; visible when Create as Copy = ON |

---

## History

Copies property values and/or files from a previous version of the current object. Can target a specific version based on conditions and map source properties to different target properties.

**Use when:** You need to preserve or restore values from previous versions (e.g., track original submission date, restore overwritten values, archive historical data).

| Setting | Type | Description |
|---------|------|-------------|
| **Conditions for Source Version** | List&lt;ConditionsConfig&gt; | Conditions that identify which previous version to copy from (e.g., "version where Status = Submitted") |
| **Replace Files** | Toggle | When ON: replaces current files with files from the matched version |
| **Throw Exception** | Toggle | When ON: throws an error if no matching version is found |
| **Property Mappings** | List | Source → Target property mappings |

**Property Mapping:**

| Setting | Type | Description |
|---------|------|-------------|
| **Source Property** | Text | Placeholder for the property to read from the historical version (e.g., `%PROPERTY_{PD.Approver}%`) |
| **Target Property** | Property | The property on the current version where the value is saved |

**Example — Preserve original submission date:**
```yaml
Conditions for Source Version:
  - Type: Basic Conditions
    Property "PD.Status" equals "Submitted"  (find first version in Submitted state)
Property Mappings:
  - Source: %PROPERTY_{PD.SubmissionDate}% → Target: PD.OriginalSubmissionDate
Throw Exception: ❌
→ Copies the submission date from the version when the object was first submitted
```

**Advanced options**

| Setting | Type | Description |
|---------|------|-------------|
| **Copy from All Matching Versions** | Toggle | When ON: copies from all versions that match (merges results). When OFF: copies from the first matching version. |
| **Source Version References** | Property | Optional lookup/MSLU/multiline-text property that references to the matched source version(s) are added to |
| **Source Version Reference Is Version-Specific** | Toggle | Only shown when Source Version References is set. Default ON: pins the reference to the exact historical version; OFF: follows the source object's latest version — see the version-specific references concept box in [Search Objects](#search-objects) for how this mechanism works. |

---

## File Operation

Renames files attached to an object by adding a prefix and/or postfix to the filename. All naming fields support placeholders.

**Use when:** You need to rename files based on metadata values (e.g., add document number as prefix, append revision to filename).

| Setting | Type | Description |
|---------|------|-------------|
| **Operation Type** | Fixed | `PrefixPostfix` — adds prefix and/or postfix to filenames |
| **Prefix** | Text | Text to prepend to each filename — supports placeholders |
| **Postfix** | Text | Text to append to each filename (before extension) — supports placeholders |
| **Always Add Prefix and Postfix** | Toggle | When ON: always applies. When OFF: only applies if the filename doesn't already have the prefix/postfix. |

**Example — Add document number as prefix:**
```yaml
Prefix:    %PROPERTY_{PD.DocumentNumber}% -
Postfix:   (empty)
Always Add: ❌
→ "Report.pdf" → "DOC-2026-0042 - Report.pdf"
→ Next check-in: unchanged (prefix already present)
```

**Example — Add revision as postfix:**
```yaml
Prefix:    (empty)
Postfix:    _Rev%PROPERTY_{PD.Revision}%
Always Add: ✅
→ "Drawing.dwg" → "Drawing_RevC.dwg"
→ Next check-in with Rev D: "Drawing_RevC_RevD.dwg" (Always Add = ON)
```

**Example — Full rename:**
```yaml
Prefix:    %PROPERTY_{PD.ProjectCode}% -
Postfix:    - v%PROPERTY_{PD.Version}%
Always Add: ❌
→ "Specification.docx" → "PRJ-2026 - Specification - v3.docx"
```

---

## Send Email

Sends an email message with configurable recipients, subject, and body. All text fields support placeholders, allowing dynamic content from the current object.

**Use when:** You need automated email notifications triggered by object changes (e.g., approval notifications, deadline alerts).

| Setting | Type | Description |
|---------|------|-------------|
| **Allow Email Sending** | Toggle | Master switch — must be ON for emails to be sent |
| **To** | Text | Recipient email address(es) — supports placeholders (e.g., `%PROPERTY_{PD.ContactEmail}%`) |
| **Subject** | Text | Email subject line — supports placeholders |
| **Body** | Text | Email body content — supports placeholders and HTML markup |

**Example — Approval notification:**
```yaml
Allow Email Sending: ✅
To:      %PROPERTY_{PD.Approver}.PROPERTY_{PD.Email}%
Subject: Approval Required: %OBJTITLE%
Body:    <h2>Document Pending Approval</h2>
         <p>Document <b>%OBJTITLE%</b> requires your approval.</p>
         <p>Submitted by: %PROPERTY_{PD.SubmittedBy}%</p>
         <p>Amount: %PROPERTY_{PD.Amount}% EUR</p>
Conditions:
  - Status changes to "Pending Approval"
```

**Example — Deadline warning:**
```yaml
To:      %PROPERTY_{PD.ProjectManager}.PROPERTY_{PD.Email}%
Subject: ⚠️ Contract expiring: %OBJTITLE%
Body:    Contract %OBJTITLE% expires on %PROPERTY_{PD.EndDate}%.
         Please review and take action.
Conditions:
  - Advanced Condition: dateDiff(today(), %PROPERTY_{PD.EndDate}%, 'days') <= 30
```

Email sending is a side effect. The Expression Builder does NOT send emails — they are only sent during actual check-in processing.
{:.note.warning}

---

## Grouping Level

Creates a named sub-group of property calculations for organizational purposes. The group itself does not perform any calculation — it acts as a container with its own conditions.

**Use when:** You have many related calculations that benefit from being grouped together with a descriptive name, or when you want shared conditions for a block of rules.

| Setting | Type | Description |
|---------|------|-------------|
| **Group Name** | Text | Name displayed in the configuration editor (used as the rule name) |
| **Properties** | List | Nested `AutomaticValueProperty` rules that execute within this group |
| **Conditions** | List | Conditions that apply to the entire group — if conditions fail, no nested rules execute |

**Example — Group invoice line calculations:**
```text
Grouping Level: "Line Item Calculations"
  Conditions:
    - Changed Propertyvalues: PD.Quantity, PD.UnitPrice
  Properties:
    - Rule 1: Calculate Line Total
    - Rule 2: Calculate Tax Amount
    - Rule 3: Calculate Line Grand Total
→ All three rules only execute when Quantity or UnitPrice changes
```

This is purely organizational — the same rules could be placed at the top level. But grouping keeps complex configurations readable and allows shared conditions.
