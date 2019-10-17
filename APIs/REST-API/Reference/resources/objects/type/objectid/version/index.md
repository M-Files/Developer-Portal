---
layout: mfws
title: Object version
includeInSearch: true
redirect_from: "/APIs/REST-API/Reference/resources/objects/type/objectid/version.html"
---

# Object version

## /objects/(type)/(objectid)/(version)
{:.url-with-parameters}

Collection of objects filtered by object type. 
{:.description}

### Methods

### GET
{:.method}

{:.method}
Output: | [ObjectVersion]({{ site.baseurl }}/APIs/REST-API/Reference/structs/objectversion/) or [ExtendedObjectVersion]({{ site.baseurl }}/APIs/REST-API/Reference/structs/extendedobjectversion/)
| Retrieves the object information. 
Parameters: | `?include` - A list of additional fields to include in the ExtendedObjectVersion. Currently only `properties` is supported.

Note that this endpoint will return an [ObjectVersion]({{ site.baseurl }}/APIs/REST-API/Reference/structs/objectversion/) by default.  If `?include=properties` is specified then the endpoint will return an [ExtendedObjectVersion]({{ site.baseurl }}/APIs/REST-API/Reference/structs/extendedobjectversion/) including the object version's properties.
{:.remark}

### DELETE
{:.method}

Note that PUT and DELETE verbs may not be supported in IIS; it is recommended to route them via the POST verb and specify the `_method` querystring parameter, as [detailed in the compatibility page]({{ site.baseurl }}/APIs/REST-API/Reference/compatibility/#http-methods).
{:.remark}

{:.method}
Output: | [ObjectVersion]({{ site.baseurl }}/APIs/REST-API/Reference/structs/objectversion/), `HTTP 204`
| Destroys the object version. As checked in versions cannot be destroyed this can only be performed on a checked out version and is equivalent to an undo checkout. Returns the new ObjectVersion information if it is still visible to the user.
| See [/objects/(type)/(objectid)/deleted]({{ site.baseurl }}/APIs/REST-API/Reference/resources/objects/type/objectid/deleted/) for marking the object as deleted. 
| Will return 204 on successful destroy.
Parameters: | `?force` - If true, DELETE will perform an undo checkout even if the object isn't checked out to the current user on this computer.
| `?allVersions` - If true, DELETE will destroy the whole object. Unlike normal DELETE, this will not require the object to be checked out.

### Example

<div class="sample" id="example-1">
	<div class="sample-code">
		<ul>
			<li><a href="#example-1-code-cs">C#</a></li>
		</ul>
		<div id="example-1-code-cs">
			{% capture sample_authentication_cs %}{% include_relative samples/getobjectversion/cs.md %}{% endcapture%}
			{{ sample_authentication_cs | markdownify }}
		</div>
	</div>
	<div class="caption">
		<span class="caption-label">Example 1:</span>
		Requesting object version information. 
	</div>
</div>

### Sub-Resources

{:#sub-resources}
Item | Description
--- | ---
[Check out status]({{ site.baseurl }}/APIs/REST-API/Reference/resources/objects/type/objectid/version/checkedout/) | Resource representing the check out state of the object. 
[Comments]({{ site.baseurl }}/APIs/REST-API/Reference/resources/objects/type/objectid/version/comments/) | Resource listing the full object comment history. 
[Object files]({{ site.baseurl }}/APIs/REST-API/Reference/resources/objects/type/objectid/version/files/) | Files belonging to an object. 
[Object properties]({{ site.baseurl }}/APIs/REST-API/Reference/resources/objects/type/objectid/version/properties/) | The properties of an object. 
[Object thumbnail]({{ site.baseurl }}/APIs/REST-API/Reference/resources/objects/type/objectid/version/preview/) | The object thumbnail. 
[Object title]({{ site.baseurl }}/APIs/REST-API/Reference/resources/objects/type/objectid/version/title/) | Resource representing the object title. 
[Object workflow state]({{ site.baseurl }}/APIs/REST-API/Reference/resources/objects/type/objectid/version/workflowstate/) | Resource representing the object workflow state. 
[Relationships]({{ site.baseurl }}/APIs/REST-API/Reference/resources/objects/type/objectid/version/relationships/) | A collection of related objects. 
[Sub-objects]({{ site.baseurl }}/APIs/REST-API/Reference/resources/objects/type/objectid/version/subobjects/) | A collection of sub-objects. 