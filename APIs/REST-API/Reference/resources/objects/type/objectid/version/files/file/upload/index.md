---
layout: mfws
title: Replace with uploaded file
includeInSearch: true
---

# Replace with uploaded file

## /objects/(type)/(objectid)/(version)/files/(file)/upload
{:.url-with-parameters}

Replaces the content of a file with a previously uploaded file.
{:.description}

### Methods

### PUT
{:.method}

Note that PUT and DELETE verbs may not be supported in IIS; it is recommended to route them via the POST verb and specify the `_method` querystring parameter, as [detailed in the compatibility page]({{ site.baseurl }}/APIs/REST-API/Reference/compatibility/#http-methods).
{:.remark}

{:.method}
Input: | [UploadInfo]({{ site.baseurl }}/APIs/REST-API/Reference/structs/uploadinfo/)
| The uploaded file, identified by its `FileRef` (or obsolete `UploadID`), with its `Size`. If the `Title` or `Extension` differs from the file, the file is renamed.
Output: | [ObjectVersion]({{ site.baseurl }}/APIs/REST-API/Reference/structs/objectversion/)
| The updated object version.

Upload the file first to [/files]({{ site.baseurl }}/APIs/REST-API/Reference/resources/files/) or [/files/upload]({{ site.baseurl }}/APIs/REST-API/Reference/resources/files/upload/) with `?statelessUpload=true`, and pass the returned `FileRef`. File references can be used on any server instance, so this request needs no sticky session to the server that received the upload. File references require M-Files MFILES_VERSION_TBD or later; upload IDs are obsolete in M-Files MFILES_VERSION_TBD and later.
{:.remark}

If the object is not checked out, it is checked out for the replacement and checked in again after it.
{:.remark}
