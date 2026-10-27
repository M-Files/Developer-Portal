---
layout: mfws
title: ObjectCreationInfo
includeInSearch: true
redirect_from: "/APIs/REST-API/Reference/structs/objectcreationinfo.html"
---

# ObjectCreationInfo

Specifies the information required when creating a new object.

## Properties

{:.struct.table}
Type | Name | Description
--- | --- | ---
[PropertyValue[]](../propertyvalue/) | PropertyValues | Properties for the new object. 
[UploadInfo[]](../uploadinfo/) | Files | References previously uploaded files, each by its `FileRef` (M-Files MFILES_VERSION_TBD and later) or obsolete `UploadID`. 

Upload the files to [/files]({{ site.baseurl }}/APIs/REST-API/Reference/resources/files/) with `?statelessUpload=true` to get file references. File references can be used on any server instance, so the object creation needs no sticky session to the server that received the uploads.
{:.remark}