---
layout: mfws
title: Upload in blocks
includeInSearch: true
minimumVersion: MFILES_VERSION_TBD
---

# Upload in blocks

## /files/upload
{:.url-with-parameters}

Begins an upload of a file in blocks, for files that are too large to upload in a single request to [/files]({{ site.baseurl }}/APIs/REST-API/Reference/resources/files/).
{:.description}

### Methods

### POST
{:.method}

{:.method}
Input: | [UploadInfo]({{ site.baseurl }}/APIs/REST-API/Reference/structs/uploadinfo/)
| The `Size` of the file in bytes, and optionally its `Title` and `Extension`.
Output: | [UploadInfo]({{ site.baseurl }}/APIs/REST-API/Reference/structs/uploadinfo/)
| The input, with the `FileRef`, `MaxBlockSize` and `RequireSequentialBlocks` of the upload.
Parameters: | `?statelessUpload=true` - Begins a stateless upload, identified by a file reference (`FileRef`).

Upload the blocks of the file to [/files/fileref/(fileRef)/upload]({{ site.baseurl }}/APIs/REST-API/Reference/resources/files/fileref/fileref/upload/). Every block but the last must be `MaxBlockSize` bytes, and if `RequireSequentialBlocks` is `true`, the blocks must be uploaded in order, one at a time. The upload ends with its last block.
{:.remark}

An empty file (`Size` is `0`) has no blocks: it is uploaded completely by this request, and the returned `FileRef` can be used right away.
{:.remark}

Without `?statelessUpload=true`, or if the server does not support the stateless upload ([ServerVaultCapabilities]({{ site.baseurl }}/APIs/REST-API/Reference/structs/servervaultcapabilities/).`FileUploadStatelessSupported`), this request begins an upload session and returns an `UploadID` instead. Upload sessions are bound to the server instance that created them, so every request of the upload needs a sticky session to that server. Upload IDs are obsolete in M-Files MFILES_VERSION_TBD and later.
{:.remark}
