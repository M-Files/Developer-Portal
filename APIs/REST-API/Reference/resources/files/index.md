---
layout: mfws
title: Temporary upload
includeInSearch: true
redirect_from: "/APIs/REST-API/Reference/resources/files.html"
---

# Temporary upload

## /files
{:.url-with-parameters}

A collection of uploaded files that are not yet attached to any object.
{:.description}

### Methods

### POST
{:.method}

{:.method}
Input: | Stream: `application/octet-stream` or `multipart/form-data`
Output: | [UploadInfo]({{ site.baseurl }}/APIs/REST-API/Reference/structs/uploadinfo/) (when using `application/octet-stream`) or [UploadInfo[]]({{ site.baseurl }}/APIs/REST-API/Reference/structs/uploadinfo/) (when using `multipart/form-data`).
| Uploads the file content to the server and returns a reference to it.
| Once uploaded the file can be used in [object creation]({{ site.baseurl }}/APIs/REST-API/Reference/resources/objects/type/), or [added to an existing object]({{ site.baseurl }}/APIs/REST-API/Reference/resources/objects/type/objectid/version/files/upload/).
Parameters: | `?statelessUpload` (optional, defaulting to `false`) - If `true`, the upload is identified by a file reference (`FileRef`) instead of an upload ID (`UploadID`).

With `?statelessUpload=true`, the returned [UploadInfo]({{ site.baseurl }}/APIs/REST-API/Reference/structs/uploadinfo/) contains a `FileRef` instead of an `UploadID`. A file reference can be used on any server instance, so the requests that use it do not need a sticky session (session affinity) to the server that received the upload. Upload IDs are obsolete in M-Files MFILES_VERSION_TBD and later; use file references whenever the server supports them ([ServerVaultCapabilities]({{ site.baseurl }}/APIs/REST-API/Reference/structs/servervaultcapabilities/).`FileUploadStatelessSupported`). If the server does not support the stateless upload, the parameter is ignored and an `UploadID` is returned.
{:.remark}

With `?statelessUpload=true`, the returned UploadInfo also contains the `Checksum` of the file, which adding the file to an object requires. Pass the returned UploadInfo as is.
{:.remark}

To upload a large file in several requests, use [/files/upload]({{ site.baseurl }}/APIs/REST-API/Reference/resources/files/upload/).
{:.remark}

### Sub-Resources

{:#sub-resources}
Item | Description
--- | ---
[Upload in blocks]({{ site.baseurl }}/APIs/REST-API/Reference/resources/files/upload/) | Begins an upload of a file in blocks.
[Block of a stateless upload]({{ site.baseurl }}/APIs/REST-API/Reference/resources/files/fileref/fileref/upload/) | Uploads a block of a file identified by its file reference.
[Commit a stateless upload]({{ site.baseurl }}/APIs/REST-API/Reference/resources/files/fileref/fileref/file/version/size/uploadcommit/) | Sets the uploaded content as the content of a file of an object.

### Example

<div class="sample" id="example-1">
	<div class="sample-code">
		<ul>
			<li><a href="#example-1-code-cs">C#</a></li>
		</ul>
		<div id="example-1-code-cs">
			{% capture sample_authentication_cs %}{% include_relative samples/createobject/cs.md %}{% endcapture%}
			{{ sample_authentication_cs | markdownify }}
		</div>
	</div>
	<div class="caption">
		<span class="caption-label">Example 1:</span>
		Creating an object.
	</div>
</div>
