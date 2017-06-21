---
layout: page
title: Default refresh logic for external object types and value lists
includeInSearch: true
breadcrumb: Refresh logic
---

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