---
layout: page
title: External Object Type Data Sources in M-Files
includeInSearch: true
breadcrumb: External Objects
---

Many organisations already have systems in place that contain business-critical or business-important information.  Whilst it's useful to have this information within M-Files, the organisation may already have a CRM (containing customers and contacts), an ERP (containing orders and supply details), or any number of other systems of record.  Marking individual object types as "External" allows M-Files to retrieve these objects from the remote systems automatically, reducing end-user workload.

M-Files can retrieve content from various systems:

* [ODBC-compatible data sources](#odbc)
* [Microsoft Dynamics CRM](#dynamics-crm)
* [Salesforce](#salesforce)
* [Any other system, via custom data sources]({{ site.baseurl }}/Built-In/External-Object-Type-Data-Source/Custom/)

## ODBC

M-Files can be set to retrieve objects for any object type (aside from Document) from an external ODBC-compatible data source.  More information on this is available within [our online user guide](http://www.m-files.com/user-guide/latest/eng/#Connection_to_external_database.html).

## Microsoft Dynamics CRM

An External Object Type Data Source provider for Microsoft Dynamics CRM is available from M-Files, allowing entities within Microsoft Dynamics CRM to be imported to M-Files.  This plugin carries an additional charge.

Details on the integration and how to configure it are available to partners within the M-Files Partner Portal within a document entitled [Installing M-Files Plugin for Microsoft Dynamics CRM and Integration (ID 67611)](m-files://show/CE7643CB-C9BB-4536-8187-707DB78EAF2A/0-1673?object=5D2C4190-1B89-4646-9E3A-681A5D15A6C1).

## Salesforce

An External Object Type Data Source provider for Salesforce is available from M-Files, allowing entities within Salesforce to be imported to M-Files.  This plugin carries an additional charge.

Details on the integration and how to configure it are available to partners within the M-Files Partner Portal within a document entitled [Installing Instructions for M-Files for Salesforce integration (ID 93077)](m-files://show/CE7643CB-C9BB-4536-8187-707DB78EAF2A/0-352?object=FA7D9549-D8BF-4EDE-B5E7-BFEC401C44EC).

## Custom Data Sources

Some systems, however, cannot be easily accessed using OLEDB.  These include legacy systems without OLEDB drivers, systems using custom structured data formats (e.g. NoSQL data sources), or web-based systems that only expose data via Web Services.  In these situations, developers can still expose the information to M-Files through the use of [Custom External Object Type Data Sources]({{ site.baseurl }}/Built-In/External-Object-Type-Data-Source/Custom/).  This approach is used for some built-in M-Files integrations, such as the integration with Microsoft Dynamics CRM.

[Custom External Object Type Data Sources]({{ site.baseurl }}/Built-In/External-Object-Type-Data-Source/Custom/) are Microsoft .NET class libraries that are installed onto the server and handle the mapping of content from the data source into M-Files property definitions.  Custom External Object Type Data Providers can be read-only, or can support update/create functions.

<p class="note">This site contains a <a href="{{ site.baseurl }}/Built-In/External-Object-Type-Data-Source/Custom/">step-by-step guide to creating your own Custom External Object Type Data Source</a>.</p>

## Default refresh logic

There are two types of refresh operation: full refresh and quick refresh.  Quick refreshes are significantly faster than full refreshes.

* A full refresh detects new objects, compares and updates existing objects, and deletes objects that have disappeared from the external database. 
* A quick refresh only detects new objects in the external database. It does not compare existing objects. It does not delete objects, either, because undeleting them would require a full refresh.

<p class="note">For value lists, a full refresh is always performed as it is typically very fast.</p>

A quick or full refresh can be performed using the "Operations" menu in the M-Files desktop client, or using the metadta card in M-Files Desktop or Web, or using the M-Files Admin tool.

By default, M-Files will refresh external object types and value lists every 15 minutes (900 seconds).  A full refresh is executed by default every 25 hours (90,000 seconds), at 0430 on the M-Files server.  These defaults can be altered by setting [server-side registry keys](https://kb.cloudvault.m-files.com/Default.aspx?#3ECA226F-7B54-428B-B539-DE443E6134EC/object/3AEC36EE-946C-4B0C-9DE2-8BF82DED3078/latest).

<p class="note">More information on the <a href="https://kb.cloudvault.m-files.com/Default.aspx?#3ECA226F-7B54-428B-B539-DE443E6134EC/object/3AEC36EE-946C-4B0C-9DE2-8BF82DED3078/latest">default refresh logic and how to customise it is available in our knowledgebase</a>.</p>

### Updating only recently-modified objects

<p class="note">This feature requires M-Files 2015.3 SR2 (11.3.4330.179) or later.</p>

In large environments, synchronising significant volumes of content may take significant time.  In these environments, M-Files can be configured to ask the remote system to only return items that have been modified (added or changed) since the last synchronisation process.  This can improve the synchronisation performance significantly.

This is configured using server-side registry keys.  This is detailed further in [chapter 4.3 of the detailed documentation](https://kb.cloudvault.m-files.com/Default.aspx?#3ECA226F-7B54-428B-B539-DE443E6134EC/object/3AEC36EE-946C-4B0C-9DE2-8BF82DED3078/latest).

### Using different intervals for different object types

<p class="note">This feature requires M-Files 2015.3 (11.3.4330.152) or later.</p>

In some scenarios, some object types may need to be refreshed more frequently than other object types.

This is configured using Name-Value Storage.  This is detailed further in [chapter 4.4 of the detailed documentation](https://kb.cloudvault.m-files.com/Default.aspx?#3ECA226F-7B54-428B-B539-DE443E6134EC/object/3AEC36EE-946C-4B0C-9DE2-8BF82DED3078/latest).