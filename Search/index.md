---
layout: page
title: Search
noInnerLinks: true
---

<form class="search" action="/Search/" method="get">
    <input type="text" class="search-box" id="query-2" name="query" autocomplete="off" placeholder="Search..." />
    <input type="submit" value="Search" />
</form>

<ol id="search-results"></ol>

<script defer src="https://unpkg.com/lunr/lunr.js"></script>
<script defer src="search.js"></script>

{% assign pages = site.pages | where:"includeInSearch", "true" %}

<script>

window.addEventListener("load", function()
{
	window.searchData = [
		{% for p in pages %}
		{
			"type": "page",
			"title": {{ p.title | json_escape | jsonify }},
			"categories": [{% for cat in p.categories %}"{{ cat }}"{% unless forloop.last %},{% endunless %}{% endfor %}],	
			"tags": [{% for tag in p.tags %}"{{ tag }}"{% unless forloop.last %},{% endunless %}{% endfor %}],
			"url": "{{ p.url }}",
			"content": {{ p.content | markdownify | strip_html | json_escape | jsonify }},
			"excerpt": {{ p.content | markdownify | strip_html | truncatewords:100 | json_escape | jsonify }},
			"description": {{ p.description | markdownify | rstrip | json_escape | jsonify }}
		}{% unless forloop.last %},{% endunless %}{% endfor %}
	];

  window.executeSearch();
});

</script>