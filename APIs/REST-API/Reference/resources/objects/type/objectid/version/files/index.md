---
layout: mfws
title: Object files
includeInSearch: true
redirect_from: "/APIs/REST-API/Reference/resources/objects/type/objectid/version/files.html"
---

# Object files

## /objects/(type)/(objectid)/(version)/files
{:.url-with-parameters}

Files belonging to an object. 
{:.description}

### Methods

### GET
{:.method}

{:.method}
Output: | [ObjectFile[]]({{ site.baseurl }}/APIs/REST-API/Reference/structs/objectfile/)
| Retrieves the object file information for all the files on an object. 

### POST
{:.method}

{:.method}
Input: | Stream: `application/octet-stream` or `multipart/form-data`
Output: | [ObjectVersion]({{ site.baseurl }}/APIs/REST-API/Reference/structs/objectversion/)
| Adds a new file to the object. 
Parameters: | `?statelessUpload` (optional, defaulting to `false`) - If `true` and the server supports it, the content is uploaded with the stateless upload (M-Files MFILES_VERSION_TBD and later).

To add files that were uploaded earlier, by their file references, use [/objects/(type)/(objectid)/(version)/files/upload]({{ site.baseurl }}/APIs/REST-API/Reference/resources/objects/type/objectid/version/files/upload/).
{:.remark}

### Sub-Resources

{:#sub-resources}
Item | Description
--- | ---
[Object file]({{ site.baseurl }}/APIs/REST-API/Reference/resources/objects/type/objectid/version/files/file/) | A single file on an object.
[Add uploaded files]({{ site.baseurl }}/APIs/REST-API/Reference/resources/objects/type/objectid/version/files/upload/) | Adds previously uploaded files to the object.
