---
layout: mfws
title: UploadInfo
includeInSearch: true
redirect_from: "/APIs/REST-API/Reference/structs/uploadinfo.html"
---

# UploadInfo

Contains the information on an uploaded file.

In M-Files MFILES_VERSION_TBD and later, an upload is identified by a file reference (`FileRef`) when it is uploaded with `?statelessUpload=true`. A file reference can be used on any server instance, so the requests that use it need no sticky session. The upload ID (`UploadID`) is obsolete in M-Files MFILES_VERSION_TBD and later. Set either `FileRef` or `UploadID`, not both.
{:.remark}

A file reference must be given with the `Checksum` of the file when the file is added to an object. The server stores the checksum as the checksum of the file, which M-Files uses, for example, to find duplicate files. [/files]({{ site.baseurl }}/APIs/REST-API/Reference/resources/files/) receives the whole file in one request, so it returns the checksum; pass the returned UploadInfo as is. The blocks of a file uploaded with [/files/upload]({{ site.baseurl }}/APIs/REST-API/Reference/resources/files/upload/) can be received by different server instances, so no server sees the whole file: the client must calculate the MD5 checksum of the exact bytes it uploads and set `Checksum`. Depending on where the vault stores its file data, the server may store the checksum without verifying it against the content, so a wrong checksum stays with the file and can make later checksum verifications of the file fail.
{:.remark}

## Properties

{:.struct.table}
Type | Name | Description
--- | --- | ---
`int` | UploadID | Obsolete. Temporary upload ID given by the server, if the file was uploaded in an upload session. 
`string` | FileRef | The file reference of a stateless upload, if the file was uploaded with `?statelessUpload=true`. Set instead of `UploadID`. Requires M-Files MFILES_VERSION_TBD or later. 
`long` | MaxBlockSize | The maximum size of a block in bytes. Returned by [/files/upload]({{ site.baseurl }}/APIs/REST-API/Reference/resources/files/upload/) for a stateless upload. 
`bool` | RequireSequentialBlocks | True if the blocks must be uploaded in order, one at a time. Returned by [/files/upload]({{ site.baseurl }}/APIs/REST-API/Reference/resources/files/upload/) for a stateless upload. 
`string` | Checksum | The MD5 checksum of the whole file as 32 hexadecimal characters. Returned by [/files]({{ site.baseurl }}/APIs/REST-API/Reference/resources/files/) for a stateless upload. For a file uploaded in blocks, calculate it and set it. Required with `FileRef` when the file is added to an object. Requires M-Files MFILES_VERSION_TBD or later. 
`string` | Title | File name without extension. 
`string` | Extension | File extension. 
`long` | Size | File size. 
