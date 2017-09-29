---
layout: mfws
title: Resource Types
includeInSearch: true
redirect_from: "/APIs/REST-API/Reference/structs.html"
---

# Resource types
{:#chpt:structs}

The request and response formats of [resources](../resources) are defined in terms of common types. Most of the types derive directly from those of M-Files API while some of the types are unique to M-Files Web Service.

## JSON data types

When the object instances of these types are transmitted over HTTP protocol they are serialized using one of the supported serialization formats, which currently include only JSON currently. Since M-Files Web Service uses richer type system than offered by JSON format, some of the types are represented using other types. The JSON format used by the types in M-Files Web Service are described in [table 1](#table-1) below.

<div class="caption">
	<span class="caption-label">Table 1:</span>
	Data types of the resource type properties.
</div>

{:#table-1 .table}
Type | JSON serialization format
--- | ---
`string` | JSON string.
`int` | JSON number.
`double` | JSON number.
`bool` | JSON boolean.
`DateTime` | Converted to [ISO-8601](http://en.wikipedia.org/wiki/ISO\_8601) format and serialized as string.
Arrays |  JSON array.
Other objects |  JSON object.
Enumerations |  JSON number.

## Contents

{:#table-2}
Item | Description
--- | ---
[AssociatedPropertyDef](associatedpropertydef) | Based on M-Files API. 
[Authentication](authentication) | Authentication details.
[ClassGroup](classgroup) | Based on M-Files API. 
[ExceptionInfo](exceptioninfo) | 
[ExtendedObjectClass](extendedobjectclass) | An object class with extended properties. Inherits from ObjectClass.
[ExtendedObjectVersion](extendedobjectversion) | An object version with extended properties. Inherits from ObjectVersion.
[FolderContentItem](foldercontentitem) | Based on M-Files API. 
[FolderContentItems](foldercontentitems) | An object version with extended properties. Inherits from ObjectVersion.
[Lookup](lookup) | Based on M-Files API. 
[ObjectClass](objectclass) | Based on M-Files API. 
[ObjectCreationInfo](objectcreationinfo) | Specifies the information required when creating a new object.
[ObjectFile](objectfile) | Based on M-Files API. 
[ObjectVersion](objectversion) | Based on M-Files API. 
[ObjectWorkflowState](objectworkflowstate) | A workflow state on an object.
[ObjID](objid) | Based on M-Files API. 
[ObjType](objtype) | Based on M-Files API. 
[ObjVer](objver) | Based on M-Files API. 
[PasswordChange](passwordchange) | Information required for changing password.
[PrimitiveType&lt;T&gt;](primitivetypet) | 
[PropertyDef](propertydef) | Based on M-Files API. 
[PropertyValue](propertyvalue) | Based on M-Files API. 
[PublicKey](publickey) | Server public key information.
[Results&lt;T&gt;](resultst) | Results of a query which might leave only a partial set of items.
[SessionInfo](sessioninfo) | Based on M-Files API. 
[StackTraceElement](stacktraceelement) | M-Files Web Service error stack trace element.
[StatusResponse](statusresponse) | Response for status requests.
[TypedValue](typedvalue) | A `typed value` represents a value, such as text, number, date or lookup item.
[UploadInfo](uploadinfo) | Contains the information on a temporary upload.
[ValueListItem](valuelistitem) | Based on M-Files API. 
[Vault](vault) | Vault information.
[WebServiceError](webserviceerror) | M-Files Web Service error object.
[VersionComment](versioncomment) | Based on M-Files API. 
[View](view) | Based on M-Files API. 
[ViewLocation](viewlocation) | Based on M-Files API. 
[Workflow](workflow) | Based on M-Files API. 
[WorkflowState](workflowstate) | Workflow state information.
