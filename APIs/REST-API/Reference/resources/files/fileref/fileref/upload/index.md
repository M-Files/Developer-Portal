---
layout: mfws
title: Block of a stateless upload
includeInSearch: true
minimumVersion: MFILES_VERSION_TBD
---

# Block of a stateless upload

## /files/fileref/(fileRef)/upload
{:.url-with-parameters}

Uploads a block of a stateless upload begun with [/files/upload]({{ site.baseurl }}/APIs/REST-API/Reference/resources/files/upload/).
{:.description}

### Methods

### POST
{:.method}

{:.method}
Input: | Stream: `application/octet-stream` or `multipart/form-data` (the first file of the form)
| The data of the block.
Output: | [UploadInfo]({{ site.baseurl }}/APIs/REST-API/Reference/structs/uploadinfo/)
| The `FileRef` of the upload and the `Size` uploaded so far.
Parameters: | `?resumableChunkNumber` (optional, defaulting to `1`) - The one-based number of the block.
| `?resumableChunkSize` (optional) - The size of every block but the last, in bytes.
| `?resumableTotalChunks` (optional, defaulting to `1`) - The number of blocks.

The `fileRef` is the `FileRef` returned by [/files/upload]({{ site.baseurl }}/APIs/REST-API/Reference/resources/files/upload/). Every block but the last must be of the same size, at most the `MaxBlockSize` returned when the upload began. If `RequireSequentialBlocks` was `true`, upload the blocks in order, one at a time; otherwise they can be uploaded in any order and in parallel. Uploading a block again replaces it, so a failed block can be retried.
{:.remark}

The upload ends when the block whose `resumableChunkNumber` equals `resumableTotalChunks` is uploaded. Without the parameters, the request is the only block of the file. The parameter names match those sent by the [Resumable.js](http://resumablejs.com/) library.
{:.remark}

The returned UploadInfo has no `Checksum`, as the blocks can be received by different server instances. Calculate the MD5 checksum of the whole file on the client; see [/files/upload]({{ site.baseurl }}/APIs/REST-API/Reference/resources/files/upload/).
{:.remark}

After the upload ends, the file reference can be used with its checksum in [object creation]({{ site.baseurl }}/APIs/REST-API/Reference/resources/objects/type/), [added to an existing object]({{ site.baseurl }}/APIs/REST-API/Reference/resources/objects/type/objectid/version/files/upload/), or [committed as the content of an existing file]({{ site.baseurl }}/APIs/REST-API/Reference/resources/files/fileref/fileref/file/version/size/uploadcommit/). The requests can reach any server instance, so no sticky session is needed.
{:.remark}
