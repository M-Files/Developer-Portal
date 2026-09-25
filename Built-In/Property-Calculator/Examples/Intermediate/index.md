---
layout: page
title: Property Calculator Intermediate Examples
includeInSearch: true
breadcrumb: Intermediate Examples
excerpt: Six Calculate Expression examples covering MSLU aggregation, regex extraction, switch-based mapping, conditional string assembly, date-based conditionals, and file-count validation.
---

Each example includes the scenario, the expression, a step-by-step explanation, and the expected result. All examples use **Calculate Expression** mode unless noted otherwise.

## 7. MSLU Aggregation — Invoice Total from Line Items

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

## 8. Regex Extraction — Order Number from Text

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

## 9. Switch-Based Mapping — Country to VAT Rate

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

## 10. String Assembly with Conditions — Address Block

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

## 11. Date-Based Conditional — Contract Expiry Warning

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

## 12. File Count Validation — Check for Required Attachments

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
