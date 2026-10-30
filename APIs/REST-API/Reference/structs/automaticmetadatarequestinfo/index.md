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
`int[]` | UploadIds | Obsolete. List of temporary file upload ids.
[UploadInfo[]](../uploadinfo/) | UploadedFiles | The files uploaded with the stateless upload. Their `FileRef` and `Extension` are used. Requires M-Files MFILES_VERSION_TBD or later.
[PropertyValue[]](../propertyvalue/) | PropertyValues | Array of object's current property values. 
[ObjVer](../objver/) | ObjVer | ObjVer of current object.
`int` | ObjectType | The object type of the new object.
`string[]` | MetadataProviderIds | List of metadata provider ids.
`string` | CustomData | Custom data provided to the providers.

Specify the files either by `UploadedFiles` or by `UploadIds`, not both. A file reference has no file name, so set the `Extension` of each uploaded file. Upload IDs are obsolete in M-Files MFILES_VERSION_TBD and later.
{:.remark}