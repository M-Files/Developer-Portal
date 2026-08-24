---
layout: page
title: Property Calculator Configuration Reference
includeInSearch: true
breadcrumb: Configuration Reference
excerpt: This page is the complete configuration reference for Property Calculator — accessed via M-Files Admin → Applications → Property Calculator → Configuration — covering calculation rules and modes, conditions, error cases, value list validation, and general application settings.
---

## Top-Level Structure

```text
Configuration
├── Calculation Rules          ← Class groups with property calculations
├── Value List Operations      ← Validation for value list items
├── Background Operations      ← Scheduled tasks and state transitions
└── Settings                   ← Global application settings
```

---

## 1. Calculation Rules (Class Groups)

Each entry in Calculation Rules defines a **Class Group** — a set of property calculations, error cases, and related object update rules that apply to objects matching specific criteria.

### Class Group Settings

| Setting | Type | Description |
|---------|------|-------------|
| **Name** | Text | Display name for this group (shown in configuration list) |
| **Description** | Text | Documentation: describe why this group exists and when it's used |
| **Custom Group** | Toggle | When OFF (default): group matches by M-Files class. When ON: group matches by custom search conditions. |
| **Class** | M-Files Class | *(Visible when Custom Group is OFF)* The M-Files class this group applies to |
| **Group Conditions** | Search Conditions | *(Visible when Custom Group is ON)* Custom search conditions that determine which objects this group applies to |
| **Calculation Event Handler** | Dropdown | When the calculations run during check-in (see below) |
| **Properties** | List | Property calculation rules (see [Calculation Modes](#2-calculation-modes)) |
| **Error Cases** | List | Blocking rules that prevent user actions (see [Error Cases](#4-error-cases)) |
| **Update Related Objects** | List | Rules for triggering updates on linked objects (see [Background Operations]({{ site.baseurl }}/Built-In/Property-Calculator/Background-Operations/)) |

### Class vs. Custom Group

**Use Class** (default) when your rules should apply to all objects of a specific M-Files class. This is the simplest and most common configuration.

**Use Custom Group** when you need more flexible matching, such as:
- Rules that apply across multiple classes
- Rules based on property values (e.g., only objects where Status = Active)
- Rules based on object type without class restriction
- Complex multi-condition matching

> **Example:** A Custom Group with condition "Object Type = Document AND Property 'Department' = Finance" would apply to all Finance documents regardless of their class.

### Event Handler Timing

This setting controls **when** Property Calculator runs during the check-in process:

| Timing | Description | Use When |
|--------|-------------|----------|
| **BeforeCheckInChangesFinalize** *(default, recommended)* | Runs after all other event handlers have processed. The object state is stable and all other automations have completed. | Most calculations — this is the safest option |
| **BeforeCheckInChanges** | Runs earlier in the check-in pipeline, before other event handlers finalize. | When you need calculations to be available for other event handlers, or when triggering state changes as part of the calculation |

> ⚠️ **Consequences of BeforeCheckInChanges:**
> - Your calculated values may be overwritten by subsequent event handlers
> - The object may be in an intermediate state (other automations haven't run yet)
> - This timing is marked as **Experimental** — use only when specifically needed

### Rule Execution Order

Property calculation rules within a group execute **sequentially from top to bottom**. Earlier rules' results are available to later rules. This means you can:

1. Calculate an intermediate value in Rule 1
2. Use that intermediate value in Rule 2's expression

> **Example:** Rule 1 sets `PD.Subtotal` = quantity × price, then Rule 2 sets `PD.Total` = `%PROPERTY_{PD.Subtotal}%` × 1.24 (adding VAT).

---

## 2. Calculation Modes

Each property calculation rule has a **Mode** that determines what kind of operation it performs. There are 16 available modes:

> **Quick Start:** New to Property Calculator? Most configurations only need a handful of these
> modes. Start with **[Calculate Expression](#calculate-expression)** (computing values from other
> properties), **[Set Static Values](#set-static-values)** (setting a fixed value on a condition),
> and **[Count Date Or Time](#count-date-or-time)** (deadline/date math) — together these cover the
> majority of everyday calculation rules. The rest are for more specific needs.

### Calculate Expression

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

### Set Static Values

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

### Pick Substring

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

### Remove Property

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

### Convert Date

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

### Count Date Or Time

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

### Period Length

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

### Filter Lookup Values

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

### Order Lookup Values

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

### Values From MSLU

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

### Search Objects

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

### Create Object

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

### History

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

### File Operation

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

### Send Email

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

### Grouping Level

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
    ├─ Rule 1: Calculate Line Total
    ├─ Rule 2: Calculate Tax Amount
    └─ Rule 3: Calculate Line Grand Total
→ All three rules only execute when Quantity or UnitPrice changes
```

This is purely organizational — the same rules could be placed at the top level. But grouping keeps complex configurations readable and allows shared conditions.

---

## 3. Conditions

Conditions determine **when** a calculation rule, error case, or related object update should execute. Multiple conditions can be combined — all conditions must be met (AND logic).

### Condition Types

#### Basic Conditions

Standard M-Files search conditions applied to the **current version** of the object.

**Use when:** You need simple property value matching (e.g., "Class = Invoice" or "Status = Active").

| Setting | Description |
|---------|-------------|
| **Conditions** | Standard M-Files search conditions (same as in Views) |
| **Negate Conditions** | When ON: the condition passes when the search does NOT match |

**Example:** Only calculate tax when `PD.Country` = "Finland":
- Condition: Property `PD.Country` equals `Finland`

---

#### Changed Propertyvalues

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

#### Conditions for Previous Object Version

Search conditions applied to the **previous version** of the object (before the current modification).

**Use when:** You need to detect state transitions or value changes by comparing old vs. new.

| Setting | Description |
|---------|-------------|
| **Conditions** | Search conditions applied to the previous version |

**Example:** Detect when an object transitions from Draft to Active by checking: Previous version has `Status = Draft` AND current version has `Status = Active`.

---

#### Compare Properties

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

#### Advanced Conditions

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

#### Match with RegExp

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

#### File Modified

Detects changes to the files attached to an object.

**Use when:** You need to trigger calculations based on file additions, removals, or edits.

| Setting | Description |
|---------|-------------|
| **File Change Type** | `Files Edited` (any file change except renaming), `File Added`, `File Removed`, `Existing File Edited`, or `File Renamed` |

**Example:** Update a `PD.LastFileUpdate` timestamp whenever files are edited.

---

#### Comparing to Main Object *(removed — use the options below)*

This standalone condition type is no longer offered. Comparing the current (related) object against the **main** object that triggered the update chain is now done in one of two ways:

- **Compare Properties** with **Read Y from Main Object** enabled — Property Y is resolved from the main (triggering) object instead of the current object. Best for lookup/MSLU comparisons.
- **Advanced Conditions** using the [`mainObject()`]({{ site.baseurl }}/Built-In/Property-Calculator/NCalc-Expressions/#mainobjectexpression) function — the placeholders inside `mainObject(...)` are resolved against the main object. Best for value or numeric comparisons.

**Example:** During a cascading update, only update the related invoice when the main contract's `PD.Status` = Active:
- *Advanced Conditions:* `mainObject(%PROPERTY_{PD.Status}%) == 'Active'`
- *or Compare Properties:* Property X = `Active`, Comparison = `Equal`, Property Y = `%PROPERTY_{PD.Status}%`, **Read Y from Main Object** = ON

---

## 4. Error Cases

Error cases define **blocking rules** that prevent users from performing specific actions when conditions are met. They are configured within each Class Group.

### Error Case Settings

| Setting | Type | Description |
|---------|------|-------------|
| **Error Name** | Text | Internal name for this error case (for configuration management) |
| **Error Message** | Text | The message displayed to the user when the action is blocked. Supports placeholders. |
| **Block Users Only** | Toggle | When ON: only human users are blocked — server scripts and background processes can still modify the object |
| **Block Modification** | Toggle | Prevents check-in when conditions are met |
| **Block Delete** | Toggle | Prevents deletion when conditions are met |
| **Block Destroy** | Toggle | Prevents permanent destruction when conditions are met |
| **Block Check Out** | Toggle | Prevents checkout when conditions are met |
| **Conditions** | List | Conditions that trigger this error case (see [Conditions](#3-conditions)) |

### General Error Message

The parent Class Group has a **General Error Message** field. When set, this message is prepended to all error case messages in the group — useful for context like "Invoice validation failed:".

### Examples

**Prevent check-in without required approval:**
```yaml
Error Name:    "RequireApproval"
Error Message: "This document requires approval before check-in. 
                Please set the Approved By property."
Block Modification: ✅
Conditions:    Property PD.Status = "Pending Approval" 
               AND Property PD.ApprovedBy is empty
```

**Block deletion of active contracts:**
```yaml
Error Name:    "PreventActiveContractDeletion"
Error Message: "Active contracts cannot be deleted. 
                Change status to Terminated first."
Block Delete:  ✅
Block Destroy: ✅
Conditions:    Property PD.Status = "Active"
```

**Allow scripts but block users from modifying archived records:**
```yaml
Error Name:    "ArchiveProtection"
Error Message: "This record is archived and cannot be modified."
Block Users Only: ✅
Block Modification: ✅
Conditions:    Property PD.Status = "Archived"
```

---

## 5. Value List Operations

Configure validation rules for value list items.

### Value List Validation

| Setting | Description |
|---------|-------------|
| **Value List** | The M-Files value list to validate |
| **RegExp** | C# regular expression that new items must match |
| **Error Message** | Displayed when validation fails |

**Example:** Ensure department codes follow the format "DEPT-XXX":
- RegExp: `^DEPT-[A-Z]{3}$`
- Error Message: "Department code must be in format DEPT-XXX (e.g., DEPT-FIN)"

---

## 6. General Settings

Global settings that affect all Property Calculator operations.

### Loop Detection

Prevents infinite calculation loops that can occur when related object updates create circular dependencies (A updates B, B updates A, A updates B...).

| Setting | Default | Description |
|---------|---------|-------------|
| **State chain time window (seconds)** | 30 | Time window for detecting rapid state-change loops. If the same state is reached twice within this window, it's treated as a loop. |
| **Full loop check every N versions** | 100 | How often to run a full version-history loop check (every N versions). Set to 0 to disable. |
| **Max server versions per 24h** | 20 | If an object exceeds this many **server-created** versions (user ID < 0) in 24 hours, it is flagged as looping and further automated updates are skipped |

**What happens when a loop is detected:**
1. The offending update or state transition is skipped
2. A warning/error is logged (and surfaced in the Status Report if enabled)
3. The object may appear as "stuck" on the dashboard if its updates keep being retried

Loop detection reads the object's version history at runtime — there is no persistent flag in NVS. Once the runaway versioning stops, the object recovers on its own.
{:.note}

For tips on adjusting these thresholds (e.g. for bulk imports), see [Advanced / Operational Settings](#advanced-operational-settings) at the end of this document.
{:.note}

---

### Status Reporting

**In plain terms:** this is an automated health check — if enabled, Property Calculator periodically
writes a summary of stuck or errored objects so admins can spot problems without digging through logs.

Configures automated status reports for monitoring application health. When enabled, a report is
written to a designated vault object's **Comment** property (see
[Troubleshooting]({{ site.baseurl }}/Built-In/Property-Calculator/Troubleshooting/#status-reporting)).

| Setting | Default | Description |
|---------|---------|-------------|
| **Activated** | Off | Enable status reporting |
| **Status Object GUID** | — | GUID of the vault object whose Comment property receives the report |
| **Has Stuck Objects Property** | — | *(Optional)* Boolean property set to Yes when stuck objects exist |
| **Has Errors Property** | — | *(Optional)* Boolean property set to Yes when errors are logged |
| **Max Objects Per Type** | 10 | How many stuck object IDs to list per object type |
| **Stuck Threshold (hours)** | 24 | Retryable stuck items older than this are included in the report/dashboard (dead-lettered objects are always included). Does **not** control when an object becomes stuck. |

---

### Background Update (pipeline, retry & dead-letter)

**In plain terms:** Property Calculator processes related-object updates and state transitions in
the background rather than immediately, so check-in isn't slowed down. These settings control how
often that background work runs, how much it does per pass, and how it handles updates that fail
(automatic retries, and eventually giving up and setting them aside).

Global settings that control the asynchronous processing pipeline. See
[Background Operations]({{ site.baseurl }}/Built-In/Property-Calculator/Background-Operations/) for how these fit together.

| Setting | Default | Description |
|---------|---------|-------------|
| **Automatic object update frequency** | 5 min | How often the Automatic Object Update processor runs |
| **Automatic state transition frequency** | 5 min | How often the recurring state-transition processor runs |
| **Update queue cleanup frequency** | 5 min | How often waiting hot-queue tasks are deduplicated and spilled to overflow |
| **Do not update immediately if modified in past (seconds)** | 300 | Defer a background related-object update when the object was re-versioned **by the server** within this window, to avoid piling up unnecessary server versions. User edits do not count. 0/negative disables throttling. |
| **Version offset for modification check** | 1 | How many recent **server-made** versions (within the window) to allow before deferring. 1 = defer on the newest recent server version; 2–3 tolerates one/two (useful when another app also versions the objects). Minimum 1. |
| **Max number of objects to update in one run** | 500 | Per-run object budget (applied per phase). Minimum 1. |
| **When the overflow buffer is full** | Block new updates | `Block new updates` (reject at source so nothing goes stale) or `Drop excess updates` (keep succeeding but drop oldest excess) |
| **Retry back-off (minutes)** | `15,60,300,1440` | Escalating retry intervals for failed background updates; the last value repeats |
| **Max real-time state transitions in queue** | 300 | Back-pressure cap: above this many waiting transition tasks, new real-time transitions are skipped for the recurring scanner |
| **Dead-letter after (days)** | 14 | How long an update is retried (from first failure) before being dead-lettered |
| **Max dead-letter entries** | 10000 | Cap on the dead-letter archive; when full, further permanent failures are only logged |

For the overflow buffer's fixed structural limits (not configurable), see [Advanced / Operational Settings](#advanced-operational-settings) at the end of this document.
{:.note}

---

### Related Object Update Settings

The related-object throttle settings (**Do not update immediately if modified in past** and
**Version offset for modification check**) are fully documented in the **Background Update** table
above — see also [Background Operations]({{ site.baseurl }}/Built-In/Property-Calculator/Background-Operations/#immediate-update-throttling).

---

### Configuration History

| Setting | Description |
|---------|-------------|
| **Configuration History** | When enabled, saves configuration snapshots before changes — useful for rollback if a configuration update breaks functionality |

---

## Advanced / Operational Settings

This section collects deeper tuning rationale for edge cases. It is not needed to complete a basic
configuration — the settings themselves are documented in their normal locations ([Loop
Detection](#loop-detection) and [Background Update](#background-update-pipeline-retry-dead-letter)
above); this is background on *why* and *when* to adjust them.

### Loop Detection tuning

If you have legitimate use cases that create many versions in a short time (e.g. bulk imports),
increase `Max server versions per 24h` so they aren't mistaken for a loop. To detect genuine loops
faster (at the risk of more false positives on legitimate rapid changes), decrease the `State chain
time window`.

### Background Update overflow buffer internals

The hot-queue overflow buffer has fixed structural limits that are **not configurable**: 10,000
entries per segment, 10 segments, a 100,000-object hard cap, and an 80,000-object warning threshold.
These exist to bound memory use under extreme backlog and are provided here for reference only — in
normal operation, the `Max number of objects to update in one run` and `When the overflow buffer is
full` settings (see the Background Update table) are what admins tune day to day.
