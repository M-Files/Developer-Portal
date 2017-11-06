---
layout: mfws
title: Object file
includeInSearch: true
redirect_from: "/APIs/REST-API/Reference/resources/objects/type/objectid/version/files/file.html"
---

# Object file

## /objects/(type)/(objectid)/(version)/files/(file)
{:.url-with-parameters}

A single file on an object. 
{:.description}

### Methods

### GET
{:.method}

{:.method}
Output: | [ObjectFile]({{ site.baseurl }}/APIs/REST-API/Reference/structs/objectfile/)
| Retrieves the object file infromation for the object file. 

### DELETE
{:.method}

{:.method}
Output: | `HTTP 203`
| Removes the file from the object. 

### Sub-Resources

{:#sub-resources}
Item | Description
--- | ---
[Contents]({{ site.baseurl }}/APIs/REST-API/Reference/resources/objects/type/objectid/version/files/file/content/) | The contents of a single file. 
[File name]({{ site.baseurl }}/APIs/REST-API/Reference/resources/objects/type/objectid/version/files/file/title/) | The file name of an object file. 
[File thumbnail]({{ site.baseurl }}/APIs/REST-API/Reference/resources/objects/type/objectid/version/files/file/preview/) | File thumbnail. 