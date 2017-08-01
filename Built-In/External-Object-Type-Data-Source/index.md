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

More information on the <a href="{{ site.baseurl }}/Built-In/External-Object-Type-Data-Source/Default-Refresh-Logic/">synchronisation process, including the default refresh logic, is available</a>.
{:.note}

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

This site contains a <a href="{{ site.baseurl }}/Built-In/External-Object-Type-Data-Source/Custom/">step-by-step guide to creating your own Custom External Object Type Data Source</a>.
{:.note}