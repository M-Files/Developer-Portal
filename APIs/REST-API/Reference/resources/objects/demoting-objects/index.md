---
layout: mfws
title: Demoting objects
includeInSearch: true
minimumVersion: 12.0.6400.37
---

# Demoting objects

## /objects/demotemultiobjects
{:.url-with-parameters}

Demotes external objects that have been previously promoted.
{:.description}

### Methods

### PUT
{:.method}

Note that PUT and DELETE verbs may not be supported in IIS; it is recommended to route them via the POST verb and specify the `_method` querystring parameter, as [detailed in the compatibility page]({{ site.baseurl }}/APIs/REST-API/Reference/compatibility/#http-methods).
{:.remark}

{:.method}
Input: | [ObjID[]]({{ site.baseurl }}/APIs/REST-API/Reference/structs/objid/)
| Information on the objects to demote.  Must not include the external object information properties; only the `ID` and `Type` should be provided.
Output: | [ExtendedObjectVersion[]]({{ site.baseurl }}/APIs/REST-API/Reference/structs/extendedobjectversion/)
| Information on the demoted objects.
