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
Output: | [VersionComment[]]({{ site.baseurl }}/APIs/REST-API/Reference/enumerations/versioncomment/)
| Retrieves the comments written on the object. 

### PUT
{:.method}

{:.method}
Input: | `string`
Output: | [ExtendedObjectVersion]({{ site.baseurl }}/APIs/REST-API/Reference/structs/extendedobjectversion/)
| Sets the comment on an object

Adding a comment might create a new version of the object if it isn't checked out. 
{:.remark}
