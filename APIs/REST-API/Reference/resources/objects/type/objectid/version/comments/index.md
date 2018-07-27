---
layout: mfws
title: Comments
includeInSearch: true
redirect_from: "/APIs/REST-API/Reference/resources/objects/type/objectid/version/comments.html"
---

# Comments

## /objects/(type)/(objectid)/(version)/comments
{:.url-with-parameters}

Resource listing the full object comment history. 
{:.description}

### Methods

### GET
{:.method}

{:.method}
Output: | [VersionComment[]]({{ site.baseurl }}/APIs/REST-API/Reference/structs/versioncomment/)
| Retrieves the comments written on the object. 

### PUT
{:.method}

Note that PUT and DELETE verbs may not be supported in IIS; it is recommended to route them via the POST verb and specify the `_method` querystring parameter, as [detailed in the compatibility page]({{ site.baseurl }}/APIs/REST-API/Reference/compatibility/#http-methods).
{:.remark}

{:.method}
Input: | `string`
Output: | [ExtendedObjectVersion]({{ site.baseurl }}/APIs/REST-API/Reference/structs/extendedobjectversion/)
| Sets the comment on an object

Adding a comment might create a new version of the object if it isn't checked out. 
{:.remark}
