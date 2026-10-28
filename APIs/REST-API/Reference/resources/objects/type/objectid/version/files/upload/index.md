---
layout: mfws
title: Add uploaded files
includeInSearch: true
---

# Add uploaded files

## /objects/(type)/(objectid)/(version)/files/upload
{:.url-with-parameters}

Adds previously uploaded files to an object.
{:.description}

### Methods

### POST
{:.method}

{:.method}
Input: | [UploadInfo[]]({{ site.baseurl }}/APIs/REST-API/Reference/structs/uploadinfo/)
| The uploaded files, each identified by its `FileRef` with its `Checksum` (or by obsolete `UploadID`), with its `Title`, `Extension` and `Size`.
Output: | [ExtendedObjectVersion]({{ site.baseurl }}/APIs/REST-API/Reference/structs/extendedobjectversion/)
| The updated object version.

Upload the files first to [/files]({{ site.baseurl }}/APIs/REST-API/Reference/resources/files/) or [/files/upload]({{ site.baseurl }}/APIs/REST-API/Reference/resources/files/upload/) with `?statelessUpload=true`, and pass the returned `FileRef` of each file. File references can be used on any server instance, so this request needs no sticky session to the server that received the uploads. File references require M-Files MFILES_VERSION_TBD or later; upload IDs are obsolete in M-Files MFILES_VERSION_TBD and later.
{:.remark}

A file whose name is already in use on the object is renamed by adding a number to its title, for example `Report (1)`. A file without a `Title` is named `Unnamed`.
{:.remark}
