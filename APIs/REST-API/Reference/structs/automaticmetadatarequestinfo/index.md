---
layout: mfws
title: AutomaticMetadataRequestInfo
includeInSearch: true
redirect_from: "/APIs/REST-API/Reference/structs/automaticmetadatarequestinfo.html"
---

# AutomaticMetadataRequestInfo

Holds file upload ids and property values for fetching automatic metadata. This struct is used when automatic metadata is fetched from server.

## Properties

{:.struct.table}
Type | Name | Description
--- | --- | ---
`int[]` | UploadIds | List of temporary file upload ids.
[PropertyValue[]](../propertyvalue) | PropertyValues | Array of object's current property values. 
[ObjVer](../objver) | ObjVer | ObjVer of current object.
`int` | ObjectType | The object type of the new object.
`string[]` | MetadataProviderIds | List of metadata provider ids.
`string` | CustomData | Custom data provided to the providers.
