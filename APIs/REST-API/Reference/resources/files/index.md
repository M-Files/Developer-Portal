---
layout: mfws
title: Temporary upload
includeInSearch: true
redirect_from: "/APIs/REST-API/Reference/resources/files.html"
---

# Temporary upload

## /files
{:.url-with-parameters}

A collection of temporary uploads. 
{:.description}

### Methods

### POST
{:.method}

{:.method}
Input: | Stream: `application/octet-stream` or `multipart/form-data`
Output: | [UploadInfo]({{ site.baseurl }}/APIs/REST-API/Reference/structs/uploadinfo/) (when using `application/octet-stream`) or [UploadInfo[]]({{ site.baseurl }}/APIs/REST-API/Reference/structs/uploadinfo/) (when using `multipart/form-data`).
| Stores a temporary file on the server and assigns an ID for it.
| Once uploaded the file can be used in [object creation]({{ site.baseurl }}/APIs/REST-API/Reference/resources/objects/type/). 

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
