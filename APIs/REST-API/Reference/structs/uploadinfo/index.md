---
layout: mfws
title: UploadInfo
includeInSearch: true
redirect_from: "/APIs/REST-API/Reference/structs/uploadinfo.html"
---

# UploadInfo

Contains the information on an uploaded file.

When the server supports the stateless upload, an upload is identified by a file reference (`FileRef`) when it is uploaded with `?statelessUpload=true`. A file reference can be used on any server instance, so the requests that use it need no sticky session. The upload ID (`UploadID`) is obsolete. Set either `FileRef` or `UploadID`, not both.
{:.remark}

## Properties

{:.struct.table}
Type | Name | Description
--- | --- | ---
`int` | UploadID | Obsolete. Temporary upload ID given by the server, if the file was uploaded in an upload session. 
`string` | FileRef | The file reference of a stateless upload, if the file was uploaded with `?statelessUpload=true`. Set instead of `UploadID`. Requires a server that supports the stateless upload. 
`long` | MaxBlockSize | The maximum size of a block in bytes. Returned by [/files/upload]({{ site.baseurl }}/APIs/REST-API/Reference/resources/files/upload/) for a stateless upload. 
`bool` | RequireSequentialBlocks | True if the blocks must be uploaded in order, one at a time. Returned by [/files/upload]({{ site.baseurl }}/APIs/REST-API/Reference/resources/files/upload/) for a stateless upload. 
`string` | Title | File name without extension. 
`string` | Extension | File extension. 
`long` | Size | File size. 
