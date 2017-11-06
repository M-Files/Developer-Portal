---
layout: mfws
title: Contents
includeInSearch: true
redirect_from: "/APIs/REST-API/Reference/resources/objects/type/objectid/version/files/file/content.html"
---

# Contents

## /objects/(type)/(objectid)/(version)/files/(file)/content
{:.url-with-parameters}

The contents of a single file. 
{:.description}

### Methods

### GET
{:.method}

{:.method}
Output: | Stream: `application/octet-stream`
| Retrieves the object file contents. 
Parameters: | `?X-Hmac`- Specifies the HMAC key
| `?mac` - If true, appends a SHA-512 message authentication code at the end of the stream.

### PUT
{:.method}

{:.method}
Input: | Stream: `application/octet-stream` or `multipart/form-data`
Output: | [ObjectVersion]({{ site.baseurl }}/APIs/REST-API/Reference/structs/objectversion/)
| Replaces the object file contents. 

Supports Range header on GET: 
{:.remarks}

### Example

<div class="sample" id="example-1">
	<div class="sample-code">
		<ul>
			<li><a href="#example-1-code-cs">C#</a></li>
		</ul>
		<div id="example-1-code-cs">
			{% capture sample_authentication_cs %}{% include_relative samples/downloadfile/cs.md %}{% endcapture%}
			{{ sample_authentication_cs | markdownify }}
		</div>
	</div>
	<div class="caption">
		<span class="caption-label">Example 1:</span>
		Downloading a file. 
	</div>
</div>