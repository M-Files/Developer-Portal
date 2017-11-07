---
layout: mfws
title: Resource reference
includeInSearch: true
redirect_from: "/APIs/REST-API/Reference/resources.html"
---

# Resource hierarchy
{:#chpt:resources}

Being REST-like service, the MFWS resources are accessible through URIs. The URIs contain placeholder tokens for different arguments. The token types are listed below in [table 1](#table-1). Note that the optional tokens such as `(version)` and `(path)` also gobble one of the surrounding forward slashes: `/views/(path)/items` with path omitted becomes `/views/items`.

<div class="caption">
	<span class="caption-label">Table 1:</span>
	MFWS URI tokens
</div>

{:#table-1 .table}
Token | Regex expansion | Meaning
--- | ---
`(type)` | `(\d+)` | Object type of an object.
`(objectid)` | `(\d+|e[^/])` | ID of an object or value list item. External IDs are prefixed with `e`.
`(version)` | `(\d+|latest|)` | Object version. Optional, will refer to the latest if omitted.
`(file)` | `(\d+)` | Object file ID.
`(id)` | `(\d+)` | A numerical ID used with different structures.
`(path)` | `([^/]+/)*` | View path. May be completely empty. See [Encoding syntax]({{ site.baseurl }}/APIs/REST-API/Reference/syntax/) for encoding reference.

Note that the JSON structures returned by M-Files Web Service may contain fields not specified in this document. These fields are used by M-Files Web Access and they may change in future M-Files versions. Do not use these fields if you require long term compatibility. Only the fields specified in this document will be monitored for version compatibility.
{:.remark}

## Contents

{:#table-2}
Item | Description
--- | ---
[Authentication token]({{ site.baseurl }}/APIs/REST-API/Reference/resources/session/authenticationtoken) | Authentication token representing the current session.
[Authentication tokens]({{ site.baseurl }}/APIs/REST-API/Reference/resources/server/authenticationtokens) | Transient resource used in calculating new authentication tokens.
[Check out status]({{ site.baseurl }}/APIs/REST-API/Reference/resources/objects/type/objectid/version/checkedout) | Resource representing the check out state of the object.
[Class icon]({{ site.baseurl }}/APIs/REST-API/Reference/resources/structure/classes/id/icon) | 
[Comments]({{ site.baseurl }}/APIs/REST-API/Reference/resources/objects/type/objectid/version/comments) | Resource listing the full object comment history.
[Contents]({{ site.baseurl }}/APIs/REST-API/Reference/resources/objects/type/objectid/version/files/file/content) | The contents of a single file.
[Deleted]({{ site.baseurl }}/APIs/REST-API/Reference/resources/objects/type/objectid/deleted) | Resource representing the Deleted-state of an object.
[External source refresh]({{ site.baseurl }}/APIs/REST-API/Reference/resources/structure/objecttypes/type/refreshstatus) | The refresh status for an external object type.
[Favorite object]({{ site.baseurl }}/APIs/REST-API/Reference/resources/favorites/type/objectid) | A single favorite object.
[Favorites]({{ site.baseurl }}/APIs/REST-API/Reference/resources/favorites) | Collection of favorited objects.
[File name]({{ site.baseurl }}/APIs/REST-API/Reference/resources/objects/type/objectid/version/files/file/title) | The file name of an object file.
[File thumbnail]({{ site.baseurl }}/APIs/REST-API/Reference/resources/objects/type/objectid/version/files/file/preview) | File thumbnail.
[History]({{ site.baseurl }}/APIs/REST-API/Reference/resources/objects/type/objectid/history) | Resource listing the full object version history.
[Object]({{ site.baseurl }}/APIs/REST-API/Reference/resources/objects/type/objectid) | A single object.
[Object class]({{ site.baseurl }}/APIs/REST-API/Reference/resources/structure/classes/id) | Information on a single object class.
[Object classes]({{ site.baseurl }}/APIs/REST-API/Reference/resources/structure/classes) | Collection of object class information.
[Object file]({{ site.baseurl }}/APIs/REST-API/Reference/resources/objects/type/objectid/version/files/file) | A single file on an object.
[Object files]({{ site.baseurl }}/APIs/REST-API/Reference/resources/objects/type/objectid/version/files) | Files belonging to an object.
[Object properties]({{ site.baseurl }}/APIs/REST-API/Reference/resources/objects/type/objectid/version/properties) | The properties of an object.
[Object thumbnail]({{ site.baseurl }}/APIs/REST-API/Reference/resources/objects/type/objectid/version/preview) | The object thumbnail.
[Object title]({{ site.baseurl }}/APIs/REST-API/Reference/resources/objects/type/objectid/version/title) | Resource representing the object title.
[Object type]({{ site.baseurl }}/APIs/REST-API/Reference/resources/structure/objecttypes/type) | Information on a single object type.
[Object type icon]({{ site.baseurl }}/APIs/REST-API/Reference/resources/structure/objecttypes/type/icon) | 
[Object types]({{ site.baseurl }}/APIs/REST-API/Reference/resources/structure/objecttypes) | Collection of object type information.
[Object version]({{ site.baseurl }}/APIs/REST-API/Reference/resources/objects/type/objectid/version) | A single object version.
[Object workflow state]({{ site.baseurl }}/APIs/REST-API/Reference/resources/objects/type/objectid/version/workflowstate) | Resource representing the object workflow state.
[Objects]({{ site.baseurl }}/APIs/REST-API/Reference/resources/objects) | Collection of objects in the document vault.
[Objects of type]({{ site.baseurl }}/APIs/REST-API/Reference/resources/objects/type) | Collection of objects filtered by object type.
[Properties of multiple objects]({{ site.baseurl }}/APIs/REST-API/Reference/resources/objects/properties) | A resource that allows access to properties of multiple objects.
[Property definition]({{ site.baseurl }}/APIs/REST-API/Reference/resources/structure/properties/id) | Information on a single property definition.
[Property definitions]({{ site.baseurl }}/APIs/REST-API/Reference/resources/structure/properties) | Collection of property definitions.
[Recently accessed by the user]({{ site.baseurl }}/APIs/REST-API/Reference/resources/recentlyaccessedbyme) | A collection of objects recently accessed by the current user.
[Relationship count]({{ site.baseurl }}/APIs/REST-API/Reference/resources/objects/type/objectid/version/relationships/count) | The count of the related objects.
[Relationships]({{ site.baseurl }}/APIs/REST-API/Reference/resources/objects/type/objectid/version/relationships) | A collection of related objects.
[Search view contents]({{ site.baseurl }}/APIs/REST-API/Reference/resources/views/path/objects) | All objects found within the view.
[Server public key]({{ site.baseurl }}/APIs/REST-API/Reference/resources/server/publickey) | The server public key used to secure messages between the client and the server.
[Server resources]({{ site.baseurl }}/APIs/REST-API/Reference/resources/server) | Server-level resources.
[Server status]({{ site.baseurl }}/APIs/REST-API/Reference/resources/server/status) | Server status.
[Session]({{ site.baseurl }}/APIs/REST-API/Reference/resources/session) | Current user session information.
[Single object property]({{ site.baseurl }}/APIs/REST-API/Reference/resources/objects/type/objectid/version/properties/id) | A single property of an object.
[Sub-object count]({{ site.baseurl }}/APIs/REST-API/Reference/resources/objects/type/objectid/version/subobjects/count) | The count of the sub-objects.
[Sub-objects]({{ site.baseurl }}/APIs/REST-API/Reference/resources/objects/type/objectid/version/subobjects) | A collection of sub-objects.
[Temporary upload]({{ site.baseurl }}/APIs/REST-API/Reference/resources/files) | A collection of temporary uploads.
[Value list item]({{ site.baseurl }}/APIs/REST-API/Reference/resources/valuelists/id/items/objectid) | Single value list item information.
[Value list item title]({{ site.baseurl }}/APIs/REST-API/Reference/resources/valuelists/id/items/objectid/title) | The title of a value list item.
[Value list items]({{ site.baseurl }}/APIs/REST-API/Reference/resources/valuelists/id/items) | Collection of value list items for a single value list.
[Vault]({{ site.baseurl }}/APIs/REST-API/Reference/resources/session/vault) | The document vault attached to the current session.
[Vault structure]({{ site.baseurl }}/APIs/REST-API/Reference/resources/structure) | Vault metadata structure information.
[Vaults]({{ site.baseurl }}/APIs/REST-API/Reference/resources/server/vaults) | Collection of vaults on the server.
[View]({{ site.baseurl }}/APIs/REST-API/Reference/resources/views/path) | A single view in the view hierarchy.
[View contents]({{ site.baseurl }}/APIs/REST-API/Reference/resources/views/path/items) | Contents of a single view.
[View contents count]({{ site.baseurl }}/APIs/REST-API/Reference/resources/views/path/items/count) | The count of items within the single view.
[Workflow]({{ site.baseurl }}/APIs/REST-API/Reference/resources/structure/workflows/id) | Information on a single workflow.
[Workflow state]({{ site.baseurl }}/APIs/REST-API/Reference/resources/structure/workflows/id/states/id) | Information on a single workflow state.
[Workflow states]({{ site.baseurl }}/APIs/REST-API/Reference/resources/structure/workflows/id/states) | Collection of states under a single workflow.
[Workflows]({{ site.baseurl }}/APIs/REST-API/Reference/resources/structure/workflows) | Collection of workflows.