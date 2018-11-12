---
layout: mfws
title: ObjectVersionUpdateInformation
includeInSearch: true
---

# ObjectVersionUpdateInformation

An object version with extended properties. Inherits from [ExtendedObjectVersion](../extendedobjectversion/). 

To be used when [setting properties on multiple objects]({{ site.baseurl }}/APIs/REST-API/Reference/resources/objects/setmultipleobjproperties/).  Ensure that the `ObjVer` and `PropertyValues` properties (inherited from `ExtendedObjectVersion`) are populated.
{:.remark}

## Properties

{:.struct.table}
Type | Name | Description
--- | --- | ---
`bool` | AllowNameChange