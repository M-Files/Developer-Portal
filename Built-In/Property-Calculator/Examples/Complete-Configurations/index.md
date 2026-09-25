---
layout: page
title: Property Calculator Complete Configuration Examples
includeInSearch: true
breadcrumb: Complete Configurations
excerpt: Four full Class Group configurations showing how different calculation modes fit together — invoice processing, contract management, document processing, and order processing.
---

These examples show how different calculation modes fit together in a full Class Group configuration. Each rule's `Mode:` line states its calculation mode explicitly; where a rule below uses something other than **Calculate Expression**, that contrast is called out here once rather than after every individual rule.

## Example A: Invoice Processing Group

This example uses **Calculate Expression**, **Count Date Or Time**, **Set Static Values**, and **Send Email** modes:

```yaml
Class Group:
  Name:        "Invoice Calculations"
  Class:       Invoice
  Event Handler: BeforeCheckInChangesFinalize

  Properties:
    - Rule 1: "Calculate Line Total"
      Mode:       Calculate Expression
      Property:   PD.LineTotal
      Expression: %PROPERTY_{PD.Quantity}% * %PROPERTY_{PD.UnitPrice}%
      Evaluate as Expression: ✅

    - Rule 2: "Calculate Subtotal"
      Mode:       Calculate Expression
      Property:   PD.Subtotal
      Expression: Sum(%PROPERTY_{PD.InvoiceLines}.PROPERTY_{PD.LineTotal}%)
      Evaluate as Expression: ✅

    - Rule 3: "Calculate VAT"
      Mode:       Calculate Expression
      Property:   PD.VATAmount
      Expression: Round(%PROPERTY_{PD.Subtotal}% * 0.24, 2)
      Evaluate as Expression: ✅

    - Rule 4: "Calculate Total"
      Mode:       Calculate Expression
      Property:   PD.InvoiceTotal
      Expression: %PROPERTY_{PD.Subtotal}% + %PROPERTY_{PD.VATAmount}%
      Evaluate as Expression: ✅

    - Rule 5: "Set Payment Due Date"
      Mode:       Count Date Or Time
      Property:   PD.DueDate
      Base Date:  PD.InvoiceDate
      Operations:
        1. Increase by 30 Days (Fixed)
      Conditions:
        - Type: Changed Propertyvalues
          Value Changed: Propertyvalue Changed
          Properties: PD.InvoiceDate

    - Rule 6: "Send Payment Reminder"
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
    - "Require Customer"
      Error Message: "Invoice must have a customer assigned."
      Block Modification: ✅
      Conditions:
        - Type: Basic Conditions
          Property PD.Customer is empty

    - "Minimum Amount"
      Error Message: "Invoice total must be at least 1.00 EUR."
      Block Modification: ✅
      Conditions:
        - Type: Advanced Conditions
          Expression: %PROPERTY_{PD.InvoiceTotal}% < 1

  Update Related Objects:
    - "Update Customer Statistics"
      Related Object: PD.Customer (Direct)
      Update delay (minutes): 0
      Conditions:
        - Type: Changed Propertyvalues
          Value Changed: Propertyvalue Changed
          Properties: PD.InvoiceTotal
```

---

## Example B: Contract Management with Multiple Modes

This example uses **Calculate Expression**, **Period Length**, **History**, **Set Static Values**, **Create Object**, and **Remove Property** modes:

```yaml
Class Group:
  Name:        "Contract Management"
  Class:       Contract
  Event Handler: BeforeCheckInChangesFinalize

  Properties:
    - Rule 1: "Contract Duration (days)"
      Mode:       Period Length
      Property:   PD.DurationDays
      Start Date: PD.StartDate
      End Date:   PD.EndDate
      Unit:       Day
      Modifier:   1  (inclusive of both dates)

    - Rule 2: "Expiry Warning"
      Mode:       Calculate Expression
      Property:   PD.ExpiryStatus
      Expression: let('d', dateDiff(today(), %PROPERTY_{PD.EndDate}%, 'days'),
                    iif(get('d') < 0, 'Expired',
                      iif(get('d') <= 30, 'Expiring Soon', 'Active')))
      Evaluate as Expression: ✅

    - Rule 3: "Total Amendments Value"
      Mode:       Calculate Expression
      Property:   PD.AmendmentsTotal
      Expression: Sum(%PROPERTY_{PD.Amendments}.PROPERTY_{PD.AmendmentValue}%)
      Evaluate as Expression: ✅

    - Rule 4: "Effective Contract Value"
      Mode:       Calculate Expression
      Property:   PD.EffectiveValue
      Expression: %PROPERTY_{PD.OriginalValue}% + ifNull(%PROPERTY_{PD.AmendmentsTotal}%, 0)
      Evaluate as Expression: ✅

    - Rule 5: "Preserve Original Submission Date"
      Mode:       History
      Conditions for Source Version:
        - Type: Basic Conditions
          Property "PD.Status" = "Submitted"
      Property Mappings:
        - Source: %PROPERTY_{PD.Created}% → Target: PD.OriginalSubmissionDate
      Throw Exception: ❌

    - Rule 6: "Set Archived Flag"
      Mode:       Set Static Values
      Property:   PD.IsArchived
      Value:      true (Static)
      Conditions:
        - Type: Basic Conditions
          Property "PD.Status" = "Archived"

    - Rule 7: "Remove Rejection Fields When Not Rejected"
      Mode:       Remove Property
      Property:   PD.RejectionReason
      Conditions:
        - Type: Basic Conditions
          Property "PD.Status" NOT equals "Rejected"

    - Rule 8: "Create Renewal Task"
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
    - "Prevent Active Contract Deletion"
      Error Message: "Active contracts cannot be deleted. 
                      Change status to Terminated first."
      Block Delete: ✅
      Block Destroy: ✅
      Conditions:
        - Type: Basic Conditions
          Property PD.Status equals "Active"

    - "End Date After Start Date"
      Error Message: "Contract end date must be after start date."
      Block Modification: ✅
      Conditions:
        - Type: Compare Properties
          Property X: %PROPERTY_{PD.EndDate}%
          Comparison: Less Than
          Property Y: %PROPERTY_{PD.StartDate}%
```

---

## Example C: Document Processing with File Operations and Parsing

This example uses **Pick Substring**, **Convert Date**, **File Operation**, **Search Objects**, **Filter Lookup Values**, and **Calculate Expression** modes:

```yaml
Class Group:
  Name:        "Document Processing"
  Custom Group: ✅
  Group Conditions: Object Type = Document

  Properties:
    - Rule 1: "Parse Document Code from Title"
      Mode:       Pick Substring
      Pick Substrings From: %PROPERTY_{PD.Title}%
      Remove Substring from Main String: ❌
      In Error Case: Do nothing
      Substrings:
        - Substring 1:
          Save To:           PD.DocumentNumber
          Condition Type:    Pick first founded RegExp
          RegExp:            [A-Z]{3}-\d{4}-\d+
          → From "Specification DOC-2026-0042 v3" extracts "DOC-2026-0042"

        - Substring 2:
          Save To:           PD.VersionTag
          Condition Type:    Pick first founded RegExp
          RegExp:            v\d+
          → Extracts "v3"

    - Rule 2: "Convert Scanned Date to DateTime"
      Mode:       Convert Date
      Conversion Type: String to Date
      Value From:    PD.ScannedDateText       → "15.01.2026"
      String Format: dd.MM.yyyy
      Language:      fi-FI
      → Result:      2026-01-15T00:00:00 (DateTime property)

    - Rule 3: "Rename Files with Document Number"
      Mode:       File Operation
      Operation:  PrefixPostfix
      Prefix:     %PROPERTY_{PD.DocumentNumber}% -
      Postfix:    (empty)
      Always Add: ❌
      → "Specification.pdf" → "DOC-2026-0042 - Specification.pdf"
      → Next check-in: unchanged (prefix already exists)

    - Rule 4: "Find Related Specifications"
      Mode:       Search Objects
      Property:   PD.RelatedSpecs (MSLU)
      Search Value List Items: ❌
      Property Conditions:
        - Object Type = Document
        - PD.ProjectCode equals %PROPERTY_{PD.ProjectCode}%
        - PD.DocumentType equals "Specification"
      Keep Previous Content: ❌
      Max Results: 20
      → Populates MSLU with all specifications from the same project

    - Rule 5: "Keep Only Active Related Specs"
      Mode:       Filter Lookup Values
      Property:   PD.RelatedSpecs
      Lookup Values From: PD.RelatedSpecs
      Conditions:
        - Type: Basic Conditions
          Property "PD.Status" equals "Active"
      → Removes any specification from the list where Status ≠ Active

    - Rule 6: "Detect Document Category by Filename"
      Mode:       Calculate Expression
      Property:   PD.Category
      Expression: switch(true,
                    like(filename(), '*invoice*'), lookupByName('Invoice'),
                    like(filename(), '*contract*'), lookupByName('Contract'),
                    like(filename(), '*report*'), lookupByName('Report'),
                    lookupByName('Other'))
      Evaluate as Expression: ✅
      Conditions:
        - Type: File Modified
          File Change Type: File Added

    - Rule 7: "File Summary"
      Mode:       Calculate Expression
      Property:   PD.FileSummary
      Expression: concat(filecount(), ' file(s): ', filenames(', '))
      Evaluate as Expression: ✅
```

---

## Example D: Order Processing with Value List Resolution and Line Item Creation

This example uses **Search Objects** (value list mode), **Order Lookup Values**, **Values From MSLU**, and **Create Object** modes:

```yaml
Class Group:
  Name:        "Order Processing"
  Class:       PurchaseOrder
  Event Handler: BeforeCheckInChangesFinalize

  Properties:
    - Rule 1: "Resolve Supplier from External ID"
      Mode:       Search Objects
      Property:   PD.Supplier (SSLU)
      Search Value List Items: ✅
      Search By:  External ID
      Search Value: %PROPERTY_{PD.SupplierExtId}%
      → Text "EXT-42" → resolves to Supplier lookup value with external ID "EXT-42"
      Conditions:
        - Type: Changed Propertyvalues
          Properties: PD.SupplierExtId

    - Rule 2: "Sort Line Items by Amount (Highest First)"
      Mode:       Order Lookup Values
      Property:   PD.OrderLines (MSLU)
      Lookup Values From: PD.OrderLines
      Order Type:    Numerical
      Reverse Order: ✅ (descending)
      Order By:      %PROPERTY_{PD.LineAmount}%
      Amount of Lookups: 0 (keep all)
      → Reorders the MSLU so highest-value lines appear first

    - Rule 3: "Collect All Product Names"
      Mode:       Values From MSLU
      Property:   PD.ProductSummary (Text)
      Multi-Select Lookup: PD.OrderLines
      Conditions for Listed Object: (none)
      → Result: "Widget A, Widget B, Widget C"

    - Rule 4: "Create Individual Delivery Notes"
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
