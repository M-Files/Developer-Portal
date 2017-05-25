---
layout: page
title: Search
---

<style type="text/css">

article.page form
{
  margin-top: 40px;
}

.search-results
{
  list-style-type:none;
  margin: 10px 0px;
  padding: 0px;
}

.search-results li
{
  position: relative;
}

.result
{
  margin-left: 50px;
  margin-bottom: 0px;
  padding-bottom: 0px;
}

.excerpt
{
  margin-left: 50px;
  padding-top: 0px;
  margin-top: 0px;
}

.score
{
  font-size: 0.8em;
  color: green;
  display: inline-block;
  width: 30px;
  text-align: left;
  padding: 0px 10px;
  position: absolute;
  top: 3px;
  left: 0px;
}

.search-results-count
{
  margin: 20px 0px;
  font-weight: bold;
}

</style>

<form class="search" action="/Search/" method="get">
 	<input type="text" class="search-box" id="query" name="query" autocomplete="off" />
 	<input type="submit" class="search-button" value="Search" />
</form>

<div class="search-results-count"></div>
<ul class="search-results"></ul>

<script src="https://unpkg.com/lunr/lunr.js"></script>

<script src="query.js"></script>

<script>
Query.setData({% include_relative data.json %});
</script>

<script src="results.js"></script>