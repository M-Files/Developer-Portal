---
layout: page
title: Property Calculator
includeInSearch: true
breadcrumb: Property Calculator
excerpt: Property Calculator is an M-Files Vault Application Framework (VAF) application that automates property value calculations, object operations, and business rule enforcement within an M-Files vault.
---

## Key capabilities

* Calculate and set property values automatically when objects are created or modified
* Enforce business rules by blocking invalid check-ins, deletions, or checkouts
* Trigger cascading updates across related objects
* Create new objects, send emails, and perform file operations
* Run scheduled background tasks for bulk updates and state transitions
* Validate value list items with regular expressions

## Architecture

Property Calculator plugs into the normal flow of working with objects in the vault. When an object is saved or changed, Property Calculator checks whether a rule applies, runs the calculation, saves the new value, and — if configured — updates related objects. Larger or slower updates are handled in the background rather than making the user wait.

### How it works, step by step

1. **A user modifies an object** (check-in, state change, creation)
2. **Property Calculator's event handler fires** — it checks all configured Class Groups to find matching rules
3. **Conditions are evaluated** — each rule has optional conditions that determine whether it should run
4. **The calculation engine processes the expression** — resolves property placeholders, evaluates NCalc expressions, and produces a result
5. **The result is written** to the target property on the object
6. **Related object updates are triggered** — if configured, linked objects are also updated (immediately or via background queue)
7. **Error cases are checked** — if blocking conditions are met, the user sees an error and the operation is cancelled

## Accessing configuration

1. Open **M-Files Admin**
2. Navigate to your vault
3. Expand **Applications** in the left tree
4. Select **Property Calculator**
5. Click **Configuration** to open the configuration editor

The configuration has four top-level sections:

| Section | Purpose |
|---------|---------|
| **Calculation Rules** | Define class-based or condition-based groups with property calculations, error cases, and related object updates |
| **Value List Operations** | Validation rules for value list items |
| **Background Operations** | Scheduled tasks: automatic object updates and state transitions |
| **Settings** | Global settings: related object update behavior, loop detection, web URL, status reporting |

## Key concepts

| Concept | Description |
|---------|--------------|
| **Class Group** | A set of rules that apply to objects of a specific class (or matching custom conditions). Each group contains property calculations, error cases, and related object update rules. |
| **Calculation Mode** | The type of operation to perform — there are 16 modes ranging from expression evaluation to object creation and email sending. |
| **Placeholder** | A reference to an M-Files property value in an expression, written as `%PROPERTY_{Alias}%`. Placeholders are resolved to actual values before evaluation. |
| **NCalc Expression** | A formula used to calculate a value — see [NCalc Expressions]({{ site.baseurl }}/Built-In/Property-Calculator/NCalc-Expressions/) below for details. |
| **Condition** | A rule that determines whether a calculation should execute — supports 8 different condition types including property comparisons, regex matching, and file change detection. |
| **Error Case** | A blocking rule that prevents a user action (check-in, delete, etc.) when specific conditions are met. |
| **Related Object Update** | A mechanism to trigger recalculation on linked objects when the current object changes. |
| **Background Operation** | A scheduled task that searches for objects and triggers recalculation on them — useful for bulk updates and periodic maintenance. |
| **Expression Builder** | An interactive tool on the dashboard for testing NCalc expressions with sample values before deploying them in configuration. |

## Expression engine

Property Calculator uses **[NCalc](https://github.com/ncalc/ncalc) 6.x** as its expression engine. NCalc is an open-source .NET mathematical expression evaluator, distributed under the [MIT License](https://github.com/ncalc/ncalc/blob/master/LICENSE), that supports:

* Standard arithmetic: `+`, `-`, `*`, `/`
* Comparisons: `==`, `!=`, `<`, `>`, `<=`, `>=`
* Logical operators: `and`, `or`, `not` (must be **lowercase**)
* String operations, date arithmetic, conditional logic
* 50+ custom functions specific to M-Files (lookups, files, aggregations, etc.)

See [NCalc Expressions]({{ site.baseurl }}/Built-In/Property-Calculator/NCalc-Expressions/) for the complete NCalc reference, and [Examples]({{ site.baseurl }}/Built-In/Property-Calculator/Examples/) for practical examples.
{:.note}

## Documentation guide

| Page | Contents |
|------|----------|
| [Dashboard]({{ site.baseurl }}/Built-In/Property-Calculator/Dashboard/) | Dashboard layout, buttons, Expression Builder, and rule management |
| [Configuration]({{ site.baseurl }}/Built-In/Property-Calculator/Configuration/) | Complete configuration reference — all settings, modes, conditions |
| [NCalc Expressions]({{ site.baseurl }}/Built-In/Property-Calculator/NCalc-Expressions/) | NCalc expression syntax, all functions, placeholder reference |
| [Examples]({{ site.baseurl }}/Built-In/Property-Calculator/Examples/) | Practical examples from basic to advanced |
| [Background Operations]({{ site.baseurl }}/Built-In/Property-Calculator/Background-Operations/) | Background tasks, the hot-queue → overflow → dead-letter pipeline, scheduling, related object updates |
| [Troubleshooting]({{ site.baseurl }}/Built-In/Property-Calculator/Troubleshooting/) | Common issues, performance tips, migration guide |
| [NVS Namespaces]({{ site.baseurl }}/Built-In/Property-Calculator/NVS-Namespaces/) | Every Named Value Storage namespace: contents, read/write triggers, lifecycle |
| [Breaking Changes & Upgrade Guide]({{ site.baseurl }}/Built-In/Property-Calculator/Breaking-Changes/) | Breaking changes vs. the legacy Property Calculator, and what the Upgrade button fixes |
