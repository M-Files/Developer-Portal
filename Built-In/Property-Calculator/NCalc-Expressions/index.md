---
layout: page
title: NCalc Expressions in Property Calculator
includeInSearch: true
breadcrumb: NCalc Expressions
excerpt: This page is the complete reference for writing NCalc expressions in Property Calculator, covering placeholder syntax, operators, and more than 50 built-in functions available in the expression engine.
---

## Placeholder Syntax

Placeholders are references to M-Files property values that get resolved to actual values before (or during) expression evaluation. They are enclosed in `%` symbols.

### Property Placeholders

| Syntax | Description | Example |
|--------|-------------|---------|
| `%PROPERTY_{Alias}%` | Reference by property definition alias | `%PROPERTY_{PD.InvoiceAmount}%` |
| `%PROPERTY_{GUID}%` | Reference by property GUID | `%PROPERTY_{{12345678-1234-...}}%` |
| `%PROPERTY_ID%` | Reference by property definition ID (number) | `%PROPERTY_1234%` |

### System Placeholders

| Placeholder | Returns | Example Value |
|-------------|---------|---------------|
| `%TODAY%` | Current date (no time) | `2026-05-07` |
| `%TIMESTAMP%` | Current date and time | `2026-05-07 14:30:00` |
| `%ID%` | Object's internal ID | `42` |
| `%OBJTITLE%` | Object's title (name-or-title property) | `"Invoice 2026-001"` |
| `%OBJTYPE%` | Object type ID | `0` |
| `%VAULTGUID%` | Vault GUID | `{ABCD-1234-...}` |

### Previous Version Placeholders

| Syntax | Description |
|--------|-------------|
| `%OLDPROPERTY_{Alias}%` | Value from the **previous version** of the object |

**Example:** Detect value change:
```text
%PROPERTY_{PD.Status}% != %OLDPROPERTY_{PD.Status}%
```

### Inside String Literals vs. Outside

The behavior of placeholders differs based on position:

| Position | Behavior | Example |
|----------|----------|---------|
| **Outside quotes** | Resolved as typed parameters (number, date, lookup) | `%PROPERTY_{PD.Amount}% * 2` → `250 * 2` |
| **Inside single quotes** | Resolved as text, escaped for the string literal | `'Invoice %PROPERTY_{PD.Number}%'` → `'Invoice 12345'` |

For more advanced placeholder forms — chaining through lookups, aggregating Multi-Select Lookups, and `.FOREACH%` blocks — see [Advanced Placeholder Patterns](#advanced-placeholder-patterns) later in this document.

---

## Operators

### Arithmetic Operators

| Operator | Description | Example | Result |
|----------|-------------|---------|--------|
| `+` | Addition | `5 + 3` | `8` |
| `-` | Subtraction | `10 - 4` | `6` |
| `*` | Multiplication | `6 * 7` | `42` |
| `/` | Division | `15 / 4` | `3.75` |

Decimal numbers use a period `.`, not a comma. A comma is the **argument separator** (e.g. `iif(a, b, c)`), so a literal decimal is written `2.5` — writing `2,5` fails to evaluate. This only applies to numbers you type **into an expression**; comma decimals inside *placeholder values* (a property whose value is `2,5`) are normalized to `.` automatically.
{:.note}

### Comparison Operators

| Operator | Description | Example | Result |
|----------|-------------|---------|--------|
| `==` | Equal | `5 == 5` | `true` |
| `!=` | Not equal | `5 != 3` | `true` |
| `<` | Less than | `3 < 5` | `true` |
| `>` | Greater than | `5 > 3` | `true` |
| `<=` | Less or equal | `5 <= 5` | `true` |
| `>=` | Greater or equal | `6 >= 5` | `true` |

### Logical Operators

| Operator | Description | Example | Result |
|----------|-------------|---------|--------|
| `and` | Logical AND | `true and false` | `false` |
| `or` | Logical OR | `true or false` | `true` |
| `not` | Logical NOT | `not true` | `false` |

Logical operators MUST be **lowercase** in NCalc 6.x. Using `AND`, `OR`, `NOT` will cause an error.
{:.note.warning}

---

## Logic & Conditional

### `iif(condition, trueValue, falseValue)`

Inline conditional — returns one of two values based on a condition.

| Parameter | Type | Description |
|-----------|------|-------------|
| `condition` | Boolean | The condition to evaluate |
| `trueValue` | Any | Returned when condition is true |
| `falseValue` | Any | Returned when condition is false |

**Examples:**
```text
iif(%PROPERTY_{PD.Amount}% > 1000, 'Large', 'Small')
→ "Large" (when amount is 1500)

iif(%PROPERTY_{PD.IsUrgent}%, %PROPERTY_{PD.Amount}% * 1.5, %PROPERTY_{PD.Amount}%)
→ 750 (when amount is 500 and IsUrgent is true)

iif(isNullOrEmpty(%PROPERTY_{PD.Email}%), 'No email', %PROPERTY_{PD.Email}%)
→ "No email" (when email property is empty)
```

**Nesting iif:**
```text
iif(%PROPERTY_{PD.Score}% >= 90, 'Excellent',
  iif(%PROPERTY_{PD.Score}% >= 70, 'Good',
    iif(%PROPERTY_{PD.Score}% >= 50, 'Average', 'Poor')))
```

---

### `switch(value, case1, result1, case2, result2, ..., [default])`

Multi-case conditional — matches a value against cases and returns the corresponding result. If no case matches and a default is provided (odd number of trailing arguments), the default is returned.

| Parameter | Type | Description |
|-----------|------|-------------|
| `value` | Any | The value to compare |
| `case1, result1, ...` | Any | Pairs of case-value and result |
| `default` | Any | *(Optional)* Returned when no case matches |

**Examples:**
```text
switch(lookupName(%PROPERTY_{PD.Priority}%), 
  'Critical', 1, 
  'High', 2, 
  'Medium', 3, 
  'Low', 4,
  99)
→ 2 (when Priority is "High")
→ 99 (when Priority doesn't match any case)

switch(lookupName(%PROPERTY_{PD.Country}%),
  'Finland', 0.24,
  'Sweden', 0.25,
  'Norway', 0.25,
  'Denmark', 0.25,
  0.20)
→ 0.24 (when Country is "Finland")
```

---

### `mainObject(expression)`

Resolves the placeholders inside `expression` against the **main object** (the object that owns the calculation) instead of the object currently being processed.

This is useful in any mode where the expression or condition runs against a *secondary* object while you still need a value from the owning object, for example:

- **Filter Lookup Values / Order Lookup Values** — the condition is evaluated against each candidate lookup object, while `mainObject(...)` reads from the object that owns the multi-select property.
- **Related object updates** — a change on a child object triggers a recalculation, and `mainObject(...)` reads from the triggering (main) object.

When no main object is available (e.g. a plain single-object calculation or the Expression Builder preview), `mainObject(...)` acts as a passthrough and returns its inner value unchanged.

| Parameter | Type | Description |
|-----------|------|-------------|
| `expression` | Expression | An expression with placeholders resolved from the main object |

**Example:**
```text
mainObject(%PROPERTY_{PD.ProjectBudget}%) - Sum(%PROPERTY_{PD.Tasks}.PROPERTY_{PD.TaskCost}%)
```
When a task is updated and triggers a recalculation on the parent project:
- `mainObject(%PROPERTY_{PD.ProjectBudget}%)` reads the budget from the project
- `Sum(...)` sums task costs from the current object's perspective

---

## Advanced Placeholder Patterns

The basic placeholders covered earlier get you a long way. This section covers three more advanced
patterns: chaining through a lookup, aggregating a Multi-Select Lookup, and generating repeated text
with `.FOREACH%`.

### Chained Property Placeholders

Access properties of related objects through lookup properties:

```text
%PROPERTY_{LookupProperty}.PROPERTY_{TargetProperty}%
```

**Example:** Get the customer name from the linked customer object:
```text
%PROPERTY_{PD.Customer}.PROPERTY_{PD.CustomerName}%
```

This resolves as: "Follow the lookup in `PD.Customer`, then read `PD.CustomerName` from the target object."

### MSLU Auto-Expansion

When a chained placeholder traverses a **Multi-Select Lookup**, the evaluator automatically expands it into multiple values. This enables aggregation functions:

```text
Sum(%PROPERTY_{PD.InvoiceLines}.PROPERTY_{PD.Amount}%)
```

If the MSLU contains 3 objects with amounts 100, 200, 350, the result is `650` — one value per item,
summed automatically.

### FOREACH Expansion

The `.FOREACH%` syntax repeats a portion of the expression once for each object in a Multi-Select Lookup. The block is closed by `%NEXT%`, or left open to run to the end of the template:

```text
%PROPERTY_{PD.Items}.FOREACH%Item: %PROPERTY_{PD.ItemName}% (%PROPERTY_{PD.ItemPrice}%)
%NEXT%
```

This generates a text block with one line per item in the MSLU. FOREACH blocks can be nested.

`.FOREACH%` is a **text-expansion** feature: use it to build human-readable output (line-item summaries, lists), **not** for numeric or date math. For aggregating MSLU values (totals, averages, min/max, count), use the [chained placeholder](#chained-property-placeholders) form with `Sum` / `Avg` / `ListMin` / `ListMax` / `ListCount` instead.

**Recommended patterns:**

**✅ Text summary — FOREACH into a text field (*Evaluate as Expression* off):**
```text
%PROPERTY_{PD.InvoiceLines}.FOREACH%• %PROPERTY_{PD.Description}%: %PROPERTY_{PD.Amount}% EUR
%NEXT%
```

**✅ Aggregation — chained placeholder (typed and clear):**
```text
Sum(%PROPERTY_{PD.InvoiceLines}.PROPERTY_{PD.Amount}%)      → 650
ListMax(%PROPERTY_{PD.Tasks}.PROPERTY_{PD.DueDate}%)        → 2026-12-31
```

**⚠️ Avoid FOREACH inside a function's argument list** — the generated glue is fragile and can leave a trailing separator that fails to parse:
```text
Sum(%PROPERTY_{PD.InvoiceLines}.FOREACH%%PROPERTY_{PD.Amount}%,%NEXT%)
→ fails to parse (trailing comma before the closing parenthesis)
```
Use the chained form `Sum(%PROPERTY_{MSLU}.PROPERTY_{Field}%)` instead.

**Per-item computation over several fields** (e.g. Σ qty × price) is best done by adding a calculated property on the item (materialize the per-item value) and aggregating that single field on the parent with `Sum` / `Avg`.

---

## Variables

### `store(name, value)` / `get(name)`

Store and retrieve temporary variables within a single expression evaluation. Useful for avoiding duplicate calculations.

| Function | Parameters | Returns |
|----------|-----------|---------|
| `store(name, value)` | `(string, any)` | The stored value |
| `get(name)` | `(string)` | The retrieved value |

**Examples:**
```text
store('subtotal', %PROPERTY_{PD.Quantity}% * %PROPERTY_{PD.UnitPrice}%) +
store('tax', get('subtotal') * 0.24) +
0 * store('total', get('subtotal') + get('tax'))
```

`store()` returns the value, so you can chain it in arithmetic to avoid side-effect issues. Multiply by 0 to suppress unwanted additions.
{:.note}

---

### `let(name, value, expression)`

Scoped variable — sets a variable and evaluates an expression with it available. Cleaner than store/get for single-use variables.

| Parameter | Type | Description |
|-----------|------|-------------|
| `name` | String | Variable name |
| `value` | Any | Value to assign |
| `expression` | Expression | Expression that can use `get(name)` |

**Examples:**
```text
let('rate', 0.24, %PROPERTY_{PD.Amount}% * (1 + get('rate')))
→ 1240 (when amount is 1000)

let('base', %PROPERTY_{PD.Salary}%, 
  iif(get('base') > 5000, get('base') * 1.1, get('base') * 1.2))
→ 5500 (when salary is 5000)
```

---

## Lookup Operations

These functions work with M-Files **Single-Select Lookup (SSLU)** and **Multi-Select Lookup (MSLU)** property values.

### `lookupId(value)` / `lookupIds(value)`

Returns the internal ID(s) of lookup value(s).

| Function | Returns | Example |
|----------|---------|---------|
| `lookupId(val)` | Integer — ID of first/only lookup | `lookupId(%PROPERTY_{PD.Customer}%)` → `42` |
| `lookupIds(val)` | String — comma-separated IDs | `lookupIds(%PROPERTY_{PD.Tags}%)` → `"1,5,12"` |

---

### `lookupName(value)` / `lookupNames(value)`

Returns the display name(s) of lookup value(s).

| Function | Returns | Example |
|----------|---------|---------|
| `lookupName(val)` | String — name of first/only lookup | `lookupName(%PROPERTY_{PD.Status}%)` → `"Active"` |
| `lookupNames(val)` | String — comma-separated names | `lookupNames(%PROPERTY_{PD.Tags}%)` → `"Urgent,Review"` |

**Practical example — conditional based on lookup name:**
```text
iif(lookupName(%PROPERTY_{PD.Status}%) == 'Active', 'Yes', 'No')
```

---

### `lookupCount(value)`

Returns the number of items in a lookup list.

| Parameter | Type | Description |
|-----------|------|-------------|
| `value` | Lookup/List | A lookup property value |

**Returns:** Integer

**Examples:**
```text
lookupCount(%PROPERTY_{PD.Attachments}%)
→ 3 (when there are 3 items in the MSLU)

iif(lookupCount(%PROPERTY_{PD.Approvers}%) >= 2, 'Sufficient', 'Need more approvers')
```

`lookupCount` counts items in an MSLU directly, without chaining into a target property. To sum, average, or find the min/max of a *chained* lookup list (e.g. amounts across linked invoice lines), see [Aggregation](#aggregation) (`Sum`, `Avg`, `ListMin`, `ListMax`, `ListCount`).
{:.note}

---

### `lookupContains(list, searchId)`

Checks whether a lookup list contains a specific ID.

| Parameter | Type | Description |
|-----------|------|-------------|
| `list` | Lookup/List | The lookup property to search in |
| `searchId` | Integer/Lookup | The ID to search for |

**Returns:** Boolean

**Examples:**
```text
lookupContains(%PROPERTY_{PD.Departments}%, 5)
→ true (when department with ID 5 is in the list)

iif(lookupContains(%PROPERTY_{PD.Tags}%, lookupId(%PROPERTY_{PD.PriorityTag}%)), 
    'Tagged', 'Not tagged')
```

---

### `lookupByExternalId(externalId)`

Creates a lookup reference using an external ID string. Useful when integrating with external systems.

| Parameter | Type | Description |
|-----------|------|-------------|
| `externalId` | String | The external ID to resolve |

**Returns:** Lookup object

---

### `lookupByName(name)`

Creates a lookup reference using a display name.

| Parameter | Type | Description |
|-----------|------|-------------|
| `name` | String | The display name to find |

**Returns:** Lookup object

**Example:**
```text
lookupByName('Finland')
→ Lookup object for the value list item named "Finland"
```

---

### `lookupUnion(list1, list2, ...)`

Merges multiple lookup lists into one, removing duplicates.

| Parameter | Type | Description |
|-----------|------|-------------|
| `list1, list2, ...` | Lookups/Lists | Any number of lookup values or lists to merge |

**Returns:** Lookup list (unique union)

**Example:**
```text
lookupUnion(%PROPERTY_{PD.PrimaryContacts}%, %PROPERTY_{PD.SecondaryContacts}%)
→ Combined list of contacts with no duplicates
```

---

### `lookupExcept(source, exclude)`

Returns items from the source list that are NOT in the exclude list.

| Parameter | Type | Description |
|-----------|------|-------------|
| `source` | Lookup/List | The original list |
| `exclude` | Lookup/List | Items to remove |

**Returns:** Lookup list (source minus exclude)

**Example:**
```text
lookupExcept(%PROPERTY_{PD.AllMembers}%, %PROPERTY_{PD.InactiveMembers}%)
→ Only active members
```

---

### `lookupVersion([target], [version])`

Builds a **version-specific** (pinned) lookup reference. A normal lookup always follows the
latest version of its target object; a version-specific lookup points to one exact version, so the
metadata card keeps referencing that version even after the target is edited.

Use this when the result is written to a **lookup** or **multi-select lookup** property
(Calculate Expression mode with a lookup target).

| Parameter | Type | Description |
|-----------|------|-------------|
| `target` | Lookup/List | *(optional)* Object(s) to pin. Omit to pin the **current object** to its current version. |
| `version` | Integer | *(optional)* Explicit version number to pin to. Defaults to the target's current (latest) version. |

**Returns:** Lookup (single target) or Lookup list (multiple targets)

**Examples:**
```text
lookupVersion()
→ Reference to the current object, pinned to the version being saved

lookupVersion(%PROPERTY_{PD.Contract}%)
→ The contract reference, pinned to the contract's current version

lookupVersion(%PROPERTY_{PD.RelatedDocs}%)
→ Each related document pinned to its current version

lookupVersion(%PROPERTY_{PD.Contract}%, 3)
→ The contract reference, pinned to version 3
```

The no-argument form (`lookupVersion()`) requires object context, which is available when the expression result is applied to a lookup property. In the Expression Builder preview it returns empty.
{:.note}

**Alias:** `lookupVersions` (plural) is registered as an identical alias for the same function — same parameters, same behavior, same return type. Use whichever reads better in context; there is no functional difference between `lookupVersion(...)` and `lookupVersions(...)`.
{:.note}

---

## String Operations

### `concat(value1, value2, ...)`

Concatenates any number of values into a single string.

| Parameter | Type | Description |
|-----------|------|-------------|
| `value1, value2, ...` | Any | Values to concatenate (converted to strings) |

**Returns:** String

**Examples:**
```text
concat('INV-', formatDate(now(), 'yyyy'), '-', padLeft(tostring(%PROPERTY_{PD.Sequence}%), 4, '0'))
→ "INV-2026-0042"

concat(lookupName(%PROPERTY_{PD.FirstName}%), ' ', lookupName(%PROPERTY_{PD.LastName}%))
→ "John Smith"
```

---

### `length(value)`

Returns the length of a string.

**Example:**
```text
length(%PROPERTY_{PD.Description}%)
→ 156
```

---

### `substring(value, startIndex, [length])`

Extracts a portion of a string.

| Parameter | Type | Description |
|-----------|------|-------------|
| `value` | String | Source string |
| `startIndex` | Integer | Starting position (0-based) |
| `length` | Integer | *(Optional)* Number of characters to extract |

**Examples:**
```text
substring('Hello World', 6)
→ "World"

substring('2026-05-07', 0, 4)
→ "2026"
```

---

### `replace(value, oldText, newText)`

Replaces all occurrences of a text in a string.

**Example:**
```text
replace(%PROPERTY_{PD.FilePath}%, '\\', '/')
→ "documents/invoices/2026/inv001.pdf"
```

---

### `toLower(value)` / `toUpper(value)`

Converts a string to lowercase or uppercase.

**Examples:**
```text
toLower('HELLO')  → "hello"
toUpper('hello')  → "HELLO"
```

---

### `trim(value)`

Removes whitespace from the beginning and end of a string.

**Example:**
```text
trim('  hello  ')  → "hello"
```

---

### `escape(value)`

Escapes single quotes in a string (replaces `'` with `''`). Useful when building nested expressions.

---

### `padLeft(value, totalLength, paddingChar)` / `padRight(value, totalLength, paddingChar)`

Pads a string to a specified length.

| Parameter | Type | Description |
|-----------|------|-------------|
| `value` | String | Source string |
| `totalLength` | Integer | Desired total length |
| `paddingChar` | String | Character to pad with |

**Examples:**
```text
padLeft('42', 6, '0')
→ "000042"

padRight('Hello', 10, '.')
→ "Hello....."
```

---

### `like(value, pattern)`

SQL-style pattern matching (case-insensitive).

Author patterns with `*` and `?` — the engine converts them to the underlying SQL wildcards `%` and `_` before evaluation. **Prefer `*` / `?`:** the `%` character is the placeholder delimiter (`%PROPERTY_...%`), so a literal `%invoice%` inside a pattern can be misread as a placeholder. Writing `*invoice*` avoids that conflict.

| Authoring wildcard | Converts to | Matches |
|--------------------|-------------|---------|
| `*` | `%` | Any sequence of characters |
| `?` | `_` | Any single character |

**Examples:**
```text
like(%PROPERTY_{PD.FileName}%, '*invoice*')
→ true (for "Annual_Invoice_2026.pdf")

like(%PROPERTY_{PD.Code}%, 'FIN-????')
→ true (for "FIN-0042")

like(%PROPERTY_{PD.Country}%, '*land')
→ true (for "Finland")
```

---

### `contains(value, search)` / `startsWith(value, search)` / `endsWith(value, search)`

String containment checks (case-insensitive).

**Examples:**
```text
contains(%PROPERTY_{PD.Description}%, 'urgent')
→ true (for "This is an URGENT request")

startsWith(%PROPERTY_{PD.Code}%, 'INV-')
→ true (for "INV-2026-001")

endsWith(%PROPERTY_{PD.FileName}%, '.pdf')
→ true (for "report.pdf")
```

---

## Regular Expressions

All regex functions use a system-wide timeout to prevent catastrophic backtracking (ReDoS protection).

### `regexIsMatch(value, pattern)`

Tests if a regex pattern matches anywhere in the value.

**Returns:** Boolean

**Example:**
```text
regexIsMatch(%PROPERTY_{PD.Email}%, '^[^@]+@[^@]+\.[^@]+$')
→ true (for "user@example.com")
```

---

### `regexMatch(value, pattern)`

Returns the first match of a regex pattern.

**Returns:** String (first match) or null

**Example:**
```text
regexMatch('Order-12345-FIN', '[0-9]+')
→ "12345"
```

---

### `regexMatchGroup(value, pattern, [groupIndex])`

Returns a specific capture group from a regex match.

| Parameter | Type | Description |
|-----------|------|-------------|
| `value` | String | Text to search |
| `pattern` | String | Regex pattern with capture groups |
| `groupIndex` | Integer | *(Optional, default: 1)* Which group to return |

**Returns:** String

**Examples:**
```text
regexMatchGroup('INV-2026-0042', '([A-Z]+)-(\d{4})-(\d+)', 1)
→ "INV"

regexMatchGroup('INV-2026-0042', '([A-Z]+)-(\d{4})-(\d+)', 2)
→ "2026"

regexMatchGroup('INV-2026-0042', '([A-Z]+)-(\d{4})-(\d+)', 3)
→ "0042"
```

---

### `regexReplace(value, pattern, replacement)`

Replaces regex matches with a replacement string. Supports capture group references (`$1`, `$2`, etc.).

**Examples:**
```text
regexReplace('John Smith', '(\w+) (\w+)', '$2, $1')
→ "Smith, John"

regexReplace('2026-05-07', '(\d{4})-(\d{2})-(\d{2})', '$3.$2.$1')
→ "07.05.2026"
```

---

### `regexMatches(value, pattern)`

Returns all regex matches as a comma-separated string.

**Example:**
```text
regexMatches('Prices: $10, $25, $99', '\d+')
→ "10,25,99"
```

---

### `regexEscape(value)`

Escapes special regex characters in a string, making it safe to use as a literal pattern.

**Example:**
```text
regexEscape('Price: $10.00 (USD)')
→ "Price: \$10\.00 \(USD\)"
```

---

## Date & Time

### `now()` / `today()`

Returns the current date/time.

| Function | Returns |
|----------|---------|
| `now()` | Current date and time (DateTime) |
| `today()` | Current date at midnight (DateTime, time portion is 00:00) |

---

### `parseDate(text, [format])`

Parses a text string into a DateTime value.

| Parameter | Type | Description |
|-----------|------|-------------|
| `text` | String | Date text to parse |
| `format` | String | *(Optional)* Expected date format |

**Examples:**
```text
parseDate('2026-05-07')
→ DateTime(2026, 5, 7)

parseDate('07/05/2026', 'dd/MM/yyyy')
→ DateTime(2026, 5, 7)
```

---

### `formatDate(dateTime, format)`

Formats a DateTime value as a string using .NET format strings.

| Parameter | Type | Description |
|-----------|------|-------------|
| `dateTime` | DateTime | The date to format |
| `format` | String | .NET date format string |

**Common format strings:**

| Format | Example Output |
|--------|---------------|
| `yyyy-MM-dd` | `2026-05-07` |
| `dd.MM.yyyy` | `07.05.2026` |
| `yyyy` | `2026` |
| `MMMM` | `May` |
| `dddd` | `Thursday` |
| `dd.MM.yyyy HH:mm` | `07.05.2026 14:30` |

**Examples:**
```text
formatDate(now(), 'yyyy-MM-dd')
→ "2026-05-07"

formatDate(%PROPERTY_{PD.ContractStart}%, 'MMMM yyyy')
→ "January 2026"

concat('Week ', formatDate(now(), 'ww'), '/', formatDate(now(), 'yyyy'))
→ "Week 19/2026"
```

---

### `dateAdd(dateTime, quantity, unit)`

Adds or subtracts time from a date.

| Parameter | Type | Description |
|-----------|------|-------------|
| `dateTime` | DateTime | Starting date |
| `quantity` | Integer | Amount to add (negative to subtract) |
| `unit` | String | `'years'`, `'months'`, `'days'`, `'hours'`, `'minutes'`, `'seconds'` |

**Examples:**
```text
dateAdd(%PROPERTY_{PD.InvoiceDate}%, 30, 'days')
→ Due date (30 days after invoice)

dateAdd(now(), -1, 'years')
→ Same day last year

dateAdd(%PROPERTY_{PD.StartDate}%, 6, 'months')
→ 6 months after start date
```

---

### `dateDiff(startDate, endDate, unit)`

Calculates the difference between two dates.

| Parameter | Type | Description |
|-----------|------|-------------|
| `startDate` | DateTime | First date |
| `endDate` | DateTime | Second date |
| `unit` | String | `'years'`, `'months'`, `'days'`, `'hours'`, `'minutes'`, `'seconds'` |

**Returns:** Number

**Examples:**
```text
dateDiff(%PROPERTY_{PD.ContractStart}%, %PROPERTY_{PD.ContractEnd}%, 'days')
→ 365

dateDiff(%PROPERTY_{PD.BirthDate}%, today(), 'years')
→ 30 (person's age)

dateDiff(%PROPERTY_{PD.Created}%, now(), 'hours')
→ 72 (object created 3 days ago)
```

---

### Date Component Functions

| Function | Returns | Example |
|----------|---------|---------|
| `year(dt)` | Year as integer | `year(now())` → `2026` |
| `month(dt)` | Month (1-12) | `month(now())` → `5` |
| `day(dt)` | Day of month (1-31) | `day(now())` → `7` |
| `weekday(dt)` | Day of week (0=Sun, 6=Sat) | `weekday(now())` → `4` (Thursday) |
| `hour(dt)` | Hour (0-23) | `hour(now())` → `14` |
| `minute(dt)` | Minute (0-59) | `minute(now())` → `30` |
| `second(dt)` | Second (0-59) | `second(now())` → `0` |

---

## Null Handling

These functions handle missing or empty property values — essential for robust expressions that don't crash on incomplete data.

### `isNull(value)`

Returns `true` if the value is null (property not set).

**Example:**
```text
iif(isNull(%PROPERTY_{PD.Manager}%), 'No manager assigned', 
    lookupName(%PROPERTY_{PD.Manager}%))
```

---

### `isNullOrEmpty(value)`

Returns `true` if the value is null, empty string, or whitespace.

**Example:**
```text
iif(isNullOrEmpty(%PROPERTY_{PD.Notes}%), 'No notes', %PROPERTY_{PD.Notes}%)
```

---

### `coalesce(value1, value2, ...)`

Returns the first non-null, non-empty value from the arguments.

**Examples:**
```text
coalesce(%PROPERTY_{PD.MobilePhone}%, %PROPERTY_{PD.WorkPhone}%, %PROPERTY_{PD.HomePhone}%, 'No phone')
→ Returns the first available phone number, or "No phone" if all are empty

coalesce(%PROPERTY_{PD.PreferredName}%, %PROPERTY_{PD.FirstName}%, 'Unknown')
→ Uses preferred name if available, falls back to first name, then "Unknown"
```

---

### `ifNull(value, fallback)`

Returns `value` if not null/empty, otherwise returns `fallback`. Shorthand for two-argument `coalesce`.

**Example:**
```text
ifNull(%PROPERTY_{PD.Discount}%, 0) 
→ Uses the discount value, or 0 if not set
```

---

## Aggregation

These functions operate on lists of numbers — typically from MSLU-expanded placeholders.

### `Sum(values...)`

Returns the sum of all numeric values.

**Examples:**
```text
Sum(%PROPERTY_{PD.InvoiceLines}.PROPERTY_{PD.Amount}%)
→ 1550 (sum of all invoice line amounts: 100 + 200 + 350 + 400 + 500)

Sum(10, 20, 30)
→ 60
```

---

### `Avg(values...)`

Returns the average (arithmetic mean) of all numeric values.

**Example:**
```text
Avg(%PROPERTY_{PD.Reviews}.PROPERTY_{PD.Score}%)
→ 4.2 (average of all review scores)
```

---

### `ListMin(values...)` / `ListMax(values...)`

Returns the minimum or maximum value from a list.

Works with **numbers** and with **dates/timestamps**: when every value is a date, time or timestamp, the result is returned as a date (the earliest / latest), so it can be written straight into a date property. If the values are mixed or non-date, they fall back to numeric comparison. Empty (null) values are ignored.

**Examples:**
```text
ListMin(%PROPERTY_{PD.Bids}.PROPERTY_{PD.BidAmount}%)
→ 15000 (lowest bid)

ListMax(%PROPERTY_{PD.Tasks}.PROPERTY_{PD.DueDate}%)
→ 2026-12-31 (latest due date among tasks)
```

---

### `ListCount(values...)`

Returns the number of items in a list.

**Example:**
```text
ListCount(%PROPERTY_{PD.Contracts}.PROPERTY_{PD.ContractValue}%)
→ 5 (number of contracts)
```

For counting lookup items in an MSLU without chaining, use `lookupCount()` instead.
{:.note}

---

## Math & Type Conversion

### `Mod(value, divisor)`

Returns the remainder of division.

| Parameter | Type | Description |
|-----------|------|-------------|
| `value` | Number | The dividend |
| `divisor` | Number | The divisor |

Use `Mod()` instead of the `%` operator, which conflicts with placeholder syntax.
{:.note.warning}

**Example:**
```text
Mod(year(now()), 4) == 0
→ true (if current year is a leap year candidate)
```

---

### `toNumber(value)`

Converts a value to a double-precision number. Handles both comma and dot as decimal separators automatically.

**Example:**
```text
toNumber('1234.56')  → 1234.56
toNumber('1234,56')  → 1234.56
```

---

### `tostring(value, [format], [culture])`

Converts any value to its string representation, with optional .NET format and culture control.

| Argument | Required | Description |
|----------|----------|-------------|
| `value` | Yes | The value to convert |
| `format` | No | A .NET format string applied to numbers and dates (ignored for strings/lookups) |
| `culture` | No | Culture name (e.g. `'en-US'`, `'fi-FI'`, `'de-DE'`) — unknown names fall back to invariant |

**Culture behavior:**

- With **no `culture`** argument, `tostring` uses the **invariant culture**, which is effectively US style: `.` as the decimal separator and `,` as the thousands separator.
- This means single-argument `tostring(value)` is **deterministic** — the output does not depend on the M-Files server's regional settings. (A bare double like `1234.5` always becomes `"1234.5"`, never `"1234,5"`.)

**Common number format strings:**

| Format | Input `1234567.89` | Notes |
|--------|--------------------|-------|
| *(none)* | `1234567.89` | General format, no grouping |
| `N2` | `1,234,567.89` | Thousands grouping + 2 decimals (full US style) |
| `F2` | `1234567.89` | Fixed 2 decimals, no grouping |
| `0.##` | `1234567.89` | Up to 2 decimals, trailing zeros dropped |
| `P0` | *(of `0.42`)* `42%` | Percent |

Date format strings are the same as [`formatDate`](#formatdatedatetime-format) (e.g. `yyyy-MM-dd`, `dd.MM.yyyy`).

**Examples:**
```text
tostring(1234.5)                          → "1234.5"            (invariant / US decimal)
tostring(1234567.89, 'N2')                → "1,234,567.89"      (full US thousands + decimals)
tostring(1234567.89, 'F2')                → "1234567.89"        (no thousands separator)
tostring(1234567.89, 'N2', 'fi-FI')       → "1 234 567,89"      (Finnish style)
tostring(1234567.89, 'N2', 'de-DE')       → "1.234.567,89"      (German style)
tostring(now(), 'yyyy-MM-dd')             → "2026-05-07"        (date formatting)
tostring(%PROPERTY_{PD.Title}%)           → unchanged string    (format ignored for text)
```

To write a double into a **text** property in US format, use `tostring(<number>, 'F2')` (plain) or `tostring(<number>, 'N2')` (with thousands separators). No manual `replace()` of separators is needed.
{:.note}

---

### Built-in Math Functions

NCalc includes standard math functions natively:

| Function | Description | Example |
|----------|-------------|---------|
| `Abs(x)` | Absolute value | `Abs(-5)` → `5` |
| `Round(x, decimals)` | Round to N decimal places | `Round(3.14159, 2)` → `3.14` |
| `Floor(x)` | Round down | `Floor(3.7)` → `3` |
| `Ceiling(x)` | Round up | `Ceiling(3.2)` → `4` |
| `Min(a, b)` | Smaller of two values | `Min(5, 3)` → `3` |
| `Max(a, b)` | Larger of two values | `Max(5, 3)` → `5` |
| `Pow(base, exp)` | Exponentiation | `Pow(2, 10)` → `1024` |
| `Sqrt(x)` | Square root | `Sqrt(144)` → `12` |
| `Log(x)` | Natural logarithm | `Log(2.718)` → `1.0` |

---

## File Operations

These functions access files attached to M-Files objects. They accept an optional **filter** (filename pattern or extension) and an optional **target** (lookup to a different object).

File functions return empty/null in the Expression Builder because no real file context is available.
{:.note}

### `filecount([filter], [target])`

Returns the number of files attached to the object.

| Parameter | Type | Description |
|-----------|------|-------------|
| `filter` | String | *(Optional)* Filter by file extensions (comma-separated: `'pdf,docx'`) |
| `target` | Lookup | *(Optional)* Count files on a related object instead |

**Examples:**
```text
filecount()
→ 3 (total files on current object)

filecount('pdf')
→ 1 (only PDF files)

filecount('pdf,docx', %PROPERTY_{PD.RelatedDocument}%)
→ 2 (PDF and DOCX files on the related document)
```

---

### `filename([filter], [index], [target])` / `fileext(...)` / `fileid(...)`

Returns the name, extension, or ID of a specific file.

| Function | Returns | Example |
|----------|---------|---------|
| `filename()` | Name of first file | `"Report"` |
| `filename('pdf', 0)` | Name of first PDF file | `"Invoice_2026"` |
| `fileext()` | Extension of first file | `"pdf"` |
| `fileid()` | Internal file ID | `42` |

---

### `filenames([filter], [separator])` / `fileextensions(...)` / `fileids(...)`

Returns joined strings of file properties for multiple files.

**Examples:**
```text
filenames()
→ "Report, Invoice, Contract" (comma-separated by default)

filenames('pdf', '; ')
→ "Report; Invoice" (custom separator, PDF files only)
```

---

### `filelink([filter], [index], [target])`

Returns an `m-files://` protocol link to a specific file.

---

### `fileweblink([index], [target])`

Returns a universal HTTPS link to a specific file. The link allows the user to choose which M-Files client opens the file. Uses the vault's web access configuration automatically — no manual settings required.

**Examples:**
```text
fileweblink(0)
→ "https://vault.m-files.com/..." (universal link to first file)

fileweblink(0, %PROPERTY_{PD.RelatedDoc}%)
→ Universal link to first file of the related document
```

If the vault does not have web access configured, the function falls back to an `m-files://` desktop link.
{:.note}

---

### `filelinks([filter], [separator])` / `fileweblinks([filter], [separator])`

Returns joined strings of links for all matching files.

---

## Object Identity & Links

### `objectguid([target])`

Returns the GUID of an M-Files object.

| Parameter | Type | Description |
|-----------|------|-------------|
| `target` | Lookup | *(Optional)* If omitted, returns GUID of current object. If provided, returns GUID of the target object. |

**Example:**
```text
objectguid()
→ "{12345678-ABCD-1234-EFGH-123456789ABC}"

objectguid(%PROPERTY_{PD.Customer}%)
→ GUID of the linked customer object
```

---

### `objectguids(separator, target)`

Returns GUIDs of all objects in a lookup list as a joined string.

**Example:**
```text
objectguids(', ', %PROPERTY_{PD.RelatedDocs}%)
→ "{GUID1}, {GUID2}, {GUID3}"
```

---

### `objectlink([target])`

Returns a universal HTTPS link to an M-Files object. The link opens a web page that lets the user choose which M-Files client to use (desktop, web, or mobile). The URL is resolved automatically from the vault's web access configuration — **no manual settings required**.

| Parameter | Type | Description |
|-----------|------|-------------|
| `target` | Lookup | *(Optional)* If omitted, returns link to current object. If provided, returns link to the lookup target object. |

**Returns:** String — Universal HTTPS link

**Examples:**
```text
objectlink()
→ "https://customer.cloudvault.m-files.com/link/3F177348-.../show?object=D9C58939-..."

objectlink(%PROPERTY_{PD.Contract}%)
→ Universal link to the linked contract object
```

If the vault does not have web access configured, the function falls back to an `m-files://` desktop link.
{:.note}

---

### `objectlinks(target, [separator])`

Returns universal HTTPS links for all objects in a lookup list as a joined string.

| Parameter | Type | Description |
|-----------|------|-------------|
| `target` | Lookup list | The multi-select lookup property containing target objects |
| `separator` | String | *(Optional)* Separator between links. Default: `", "` |

**Returns:** String — Joined universal links

**Examples:**
```text
objectlinks(%PROPERTY_{PD.RelatedDocs}%)
→ "https://...link1..., https://...link2..., https://...link3..."

objectlinks(%PROPERTY_{PD.RelatedDocs}%, '\n')
→ One link per line
```

---

## Important Notes

### Decimal Separators

**Input:** The `toNumber()` function and the expression engine automatically handle both comma (`,`) and dot (`.`) as decimal separators. You don't need to worry about locale-specific input formatting.

**Output:** When a calculated number is written into a **text** property, the result is produced with the **invariant (US-style) culture** by default — `.` as the decimal separator, no thousands grouping. If you need a specific output format (thousands separators, a fixed number of decimals, or a different locale), use [`tostring(value, format, [culture])`](#tostringvalue-format-culture). For example, `tostring(%PROPERTY_{PD.Amount}%, 'N2')` → `1,234,567.89`.

Numeric properties (Integer/Floating) store the raw number — locale formatting only applies when the value is displayed by the M-Files client or when you convert it to text yourself.
{:.note}

### Mod vs. % Operator

The `%` character is used for placeholder syntax (`%PROPERTY_...%`), so you **cannot** use it as a modulo operator. Use the `Mod()` function instead:
```text
✅ Mod(10, 3)     → 1
❌ 10 % 3          → parsing error (interpreted as placeholder)
```

### Regex Timeout

All regex operations (`regexMatch`, `regexReplace`, etc.) have a built-in timeout to prevent catastrophic backtracking. If a regex pattern takes too long to evaluate, it will be cancelled and return null/error.

### Case Sensitivity

- **Logical operators** MUST be lowercase: `and`, `or`, `not`
- **Function names** are case-insensitive: `iif`, `IIF`, `Iif` all work
- **String comparisons** in `like`, `contains`, `startsWith`, `endsWith` are case-insensitive
- **Regex functions** (`regexIsMatch`, `regexMatch`, `regexMatchGroup`, `regexReplace`, `regexMatches`) are **case-insensitive by default** — there is no flag to make them case-sensitive; if you need a strict-case match, add an explicit boundary/character-class check in the pattern instead

### Expression Length Limits

There is no hard limit on expression length, but very long expressions may be harder to maintain. Consider using `store()/get()` variables to break complex calculations into steps, or use the **Grouping Level** mode to split across multiple rules.

---

## Commonly Used Functions

The expression engine offers 50+ functions covering lookups, files, dates, text, math, and more — all
of them fully supported and ready to use. If you're just getting started, you don't need to learn
everything at once. This is a short cheat-sheet of the functions that show up most often in day-to-day
rules, to give you a practical starting point.

`iif`, `switch`, `coalesce`, `isNullOrEmpty`, `lookupName`, `lookupId`, `lookupCount`,
`lookupByName`, `Sum`, `Round`, `tostring`, `concat`, `dateAdd`, `dateDiff`, `today`, `formatDate`,
plus the relevant `file*`/`object*` functions when links or attachments matter.

Once you're comfortable with these, browse the full reference above for the rest — regex, string
utilities, aggregation, lookup set algebra, and more — and reach for whichever function fits the task
at hand.
