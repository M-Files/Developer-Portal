---
layout: mfws
title: Commit a stateless upload
includeInSearch: true
minimumVersion: MFILES_VERSION_TBD
---

# Commit a stateless upload

## /files/fileref/(fileRef)/(file)/(version)/(size)/uploadcommit
{:.url-with-parameters}

Sets the content of a stateless upload as the content of an existing file of an object.
{:.description}

### Methods

### POST
{:.method}

{:.method}
Input: | [ObjVer]({{ site.baseurl }}/APIs/REST-API/Reference/structs/objver/)
| The object version that contains the file.
Output: | [ObjectVersion]({{ site.baseurl }}/APIs/REST-API/Reference/structs/objectversion/)
| The updated object version.
Parameters: | `?checksum` (required) - The MD5 checksum of the whole new content as 32 hexadecimal characters: the `Checksum` returned by [/files]({{ site.baseurl }}/APIs/REST-API/Reference/resources/files/), or, for a file uploaded in blocks, calculated by the client.

The `fileRef` is the `FileRef` of an ended upload, from [/files]({{ site.baseurl }}/APIs/REST-API/Reference/resources/files/) or [/files/upload]({{ site.baseurl }}/APIs/REST-API/Reference/resources/files/upload/). `file` and `version` identify the file to replace, and `size` is the size of the new content in bytes.
{:.remark}

The server stores the checksum as the checksum of the file. Depending on where the vault stores its file data, it may not verify the checksum against the content, so a wrong checksum stays with the file. See [UploadInfo]({{ site.baseurl }}/APIs/REST-API/Reference/structs/uploadinfo/).`Checksum`.
{:.remark}

If the object is not checked out, it is checked out for the commit and checked in again after it.
{:.remark}

This replaces `/files/(uploadID)/(file)/(version)/(size)/uploadcommit`, which commits an upload session by its upload ID. Upload IDs are obsolete in M-Files MFILES_VERSION_TBD and later.
{:.remark}
