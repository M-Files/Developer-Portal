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
| `?format` (optional, defaulting to `native` if not provided)

The `format` querystring parameter can be one of the following values:

* `native` (default) - Downloads the file in its native/current/stored format (supported in M-Files 11.0.4090.0 and higher).
* `pdf` - Converts the file to a PDF and downloads it (supported in M-Files 11.0.4090.0 and higher).
* `displaypdfonly` - Converts the file to a display-only PDF with printing and copying disabled (supported in M-Files 20.1.8669.0 and higher).

Note: larger files may not be able to be converted to PDF, depending upon the server configuration.
{:.remark}

### PUT
{:.method}

Note that PUT and DELETE verbs may not be supported in IIS; it is recommended to route them via the POST verb and specify the `_method` querystring parameter, as [detailed in the compatibility page]({{ site.baseurl }}/APIs/REST-API/Reference/compatibility/#http-methods).
{:.remark}

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