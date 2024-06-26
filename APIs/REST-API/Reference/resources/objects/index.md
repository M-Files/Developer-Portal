---
layout: mfws
title: Objects
includeInSearch: true
redirect_from: "/APIs/REST-API/Reference/resources/objects.html"
---

# Objects

## /objects
{:.url-with-parameters}

Collection of objects in the document vault.
{:.description}

### Methods

### GET
{:.method}

{:.method}
Output: | [Results]({{ site.baseurl }}/APIs/REST-API/Reference/structs/resultst/)<[ObjectVersion]({{ site.baseurl }}/APIs/REST-API/Reference/structs/objectversion/)>
| Retrieves objects. The amount of returned objects is limited by the server, by default to 500 items.  This can be increased by following [this guidance](https://developer.m-files.com/APIs/REST-API/Searching/#increasing-the-number-of-results). See [search encoding]({{ site.baseurl }}/APIs/REST-API/Reference/syntax/#sect:search-encoding) for how to further specify the objects. 

Earlier 9.0.3372.x M-Files versions have an issue preventing the use of this resource.  The search within root view ([/views/objects]({{ site.baseurl }}/APIs/REST-API/Reference/resources/views/path/objects/)) resource is identical to this one and can be used as a working alternative.
{:.remark}

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
		Retrieving an object version.
	</div>
</div>

### Sub-Resources

{:#sub-resources}
Item | Description
--- | ---
[Automatic metadata suggestions]({{ site.baseurl }}/APIs/REST-API/Reference/resources/objects/automaticmetadata/) | Returns suggestions for metadata properties from the installed Intelligence Services.
[Demoting objects]({{ site.baseurl }}/APIs/REST-API/Reference/resources/objects/demoting-objects/) | Demotes external objects that have been previously promoted.
[Objects of type]({{ site.baseurl }}/APIs/REST-API/Reference/resources/objects/type/) | Collection of objects filtered by object type. 
[Setting properties on multiple objects]({{ site.baseurl }}/APIs/REST-API/Reference/resources/objects/setmultipleobjproperties/) | Sets properties on multiple objects at once.  Can also be used to promote unmanaged objects.
[Properties of multiple objects]({{ site.baseurl }}/APIs/REST-API/Reference/resources/objects/properties/) | A resource that allows access to properties of multiple objects. 