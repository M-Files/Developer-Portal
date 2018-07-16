---
layout: page
title: Search
---

<form class="search" action="/Search/" method="get">
    <input type="text" class="search-box" id="query" name="query" autocomplete="off" placeholder="Search..." />
    <button class="btn btn-default btn-block" type="submit">
        <i class="zmdi zmdi-invert-colors zmdi-search"></i>
        <span class="label">search</span>
    </button>
    <input type="submit" value="Search" />
</form>

<div class="search-results-count"></div>
<ul class="search-results"></ul>

<script defer src="https://unpkg.com/lunr/lunr.js"></script>

<script defer src="query.js"></script>

<script>
window.addEventListener("load", function()
{
	Query.setData({% include_relative data.json %});
	var script = document.createElement("script");
	script.type = "text/javascript";
	script.src = "results.js";
	$("body").append(script);
});
</script>