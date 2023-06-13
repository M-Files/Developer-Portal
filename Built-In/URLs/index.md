---
layout: page
title: M-Files URL properties
includeInSearch: true
breadcrumb: URLs
---

## M-Files Links

Since M-Files 22.12, M-Files has an option to create HTTP-based links which the user can choose to open in either M-Files Desktop or M-Files Web.  Within M-Files Desktop these links can be created using the "Copy Link" option.

These links can be created to show objects or files, or to link directly to views.

Full details and samples are availble in the [Configuring M-Files Links](https://kb.cloudvault.m-files.com/Default.aspx?#3ECA226F-7B54-428B-B539-DE443E6134EC/object/225FB16D-FD29-4744-9321-4FDD7C52127C/latest) document, available in our online knowledgebase.

## M-Files Desktop

When the M-Files Desktop client is installed, it installs a custom URI handler.  This allows M-Files to react to links that start "m-files://".  Common usage scenarios include:

* Displaying objects and files
Showing the object, the object's metadata card, or opening the object (read-only or for editing).
* Displaying views
Linking directly to a view by ID and, optionally, virtual folder.
* Creating new objects
Opening the metadata card for a new file, optionally pre-filled with properties.
* Searching for objects
Executing a search to find objects by various property values.

Full details and samples are available in the [M-Files URL properties](https://kb.cloudvault.m-files.com/Default.aspx?#3ECA226F-7B54-428B-B539-DE443E6134EC/object/BE2AA2E4-8B75-43DF-8E31-C045A31938B0/latest) document, available in our online knowledgebase.

In order to use M-Files URLs, the M-Files Desktop client must be installed on the computer, and a connection to the vault must have already been set up.
{:.note}

## M-Files Web

M-Files Web supports direct links in the following scenarios:

* Displaying objects
Linking directly to an object by vault GUID and object GUID.
* Downloading files
Downloading a specific file by vault GUID, object GUID, file GUID and object version.
* Displaying a view's contents
Linking directly to a view by ID and, optionally, virtual folder.

Full details and samples are available in the [Creating M-Files Web URLs](https://kb.cloudvault.m-files.com/Default.aspx?#3ECA226F-7B54-428B-B539-DE443E6134EC/object/A20AFDD6-9F0E-42FB-AA30-D2347142B51C/latest) document, available in our online knowledgebase.

Linking to objects, files or views will require the user to log into the M-Files Web Access, if appropriate, prior to accessing the relevant item.
{:.note}
