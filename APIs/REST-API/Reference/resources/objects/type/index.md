---
layout: mfws
title: Objects of type
includeInSearch: true
redirect_from: "/APIs/REST-API/Reference/resources/objects/type.html"
---

# Objects of type

## /objects/(type)
{:.url-with-parameters}

Collection of objects filtered by object type. 
{:.description}

### Methods

### GET
{:.method}

{:.method}
Output: | [Results]({{ site.baseurl }}/APIs/REST-API/Reference/structs/resultst/)<[ObjectVersion]({{ site.baseurl }}/APIs/REST-API/Reference/structs/objectversion/)>
| Retrieves objects of the given type. The amount of returned objects is limited by the server. See [/objects]( .. ) for how to further specify the objects. 

### POST
{:.method}

{:.method}
Input: | [ObjectCreationInfo]({{ site.baseurl }}/APIs/REST-API/Reference/structs/objectcreationinfo/)
Output: | [ObjectVersion]({{ site.baseurl }}/APIs/REST-API/Reference/structs/objectversion/)
| Creates a new object. 

### Example

<div class="sample" id="example-1">
	<div class="sample-code">
		<ul>
			<li><a href="#example-1-code-cs">C#</a></li>
		</ul>
		<div id="example-1-code-cs">
			{% capture sample_authentication_cs %}{% include_relative samples/createobject/cs.md %}{% endcapture%}
			{{ sample_authentication_cs | markdownify }}
		</div>
	</div>
	<div class="caption">
		<span class="caption-label">Example 1:</span>
		Creating a new object.
	</div>
</div>

### Sub-Resources

{:#sub-resources}
Item | Description
--- | ---
[Object]({{ site.baseurl }}/APIs/REST-API/Reference/resources/objects/type/objectid/) | A single object. 