---
layout: mfws
title: View contents
includeInSearch: true
redirect_from: "/APIs/REST-API/Reference/resources/views/path/items.html"
---

# View contents

## /views/(path)/items
{:.url-with-parameters}

Contents of a single view. 
{:.description}

By default this endpoint will return only managed objects.  By enabling [IML compatibility]({{ site.baseurl }}/APIs/REST-API/Reference/iml/), [external view folders]({{ site.baseurl }}/APIs/REST-API/Reference/enumerations/mffoldercontentitemtype/) and object versions without internal object ID values will be returned.  Read more on the [IML compatibility page]({{ site.baseurl }}/APIs/REST-API/Reference/iml/) for how to handle these structures.
{:.remark}

### GET
{:.method}

{:.method}
Output: | [FolderContentItems]({{ site.baseurl }}/APIs/REST-API/Reference/structs/foldercontentitems/)
| Retrieves the view contents 

### Example

<div class="sample" id="example-1">
	<div class="sample-code">
		<ul>
			<li><a href="#example-1-code-cs">C#</a></li>
		</ul>
		<div id="example-1-code-cs">
			{% capture sample_authentication_cs %}{% include_relative samples/viewhierarchy/cs.md %}{% endcapture%}
			{{ sample_authentication_cs | markdownify }}
		</div>
	</div>
	<div class="caption">
		<span class="caption-label">Example 1:</span>
		Browsing the view hierarchy. 
	</div>
</div>

### Sub-Resources

{:#sub-resources}
Item | Description
--- | ---
[View contents count]({{ site.baseurl }}/APIs/REST-API/Reference/resources/views/path/items/count/) | The count of items within the single view. 
