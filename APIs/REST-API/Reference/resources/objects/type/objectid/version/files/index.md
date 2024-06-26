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

### Sub-Resources

{:#sub-resources}
Item | Description
--- | ---
[Object file]({{ site.baseurl }}/APIs/REST-API/Reference/resources/objects/type/objectid/version/files/file/) | A single file on an object.
