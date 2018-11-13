---
layout: page
title: Progressive Web Application
includeInSearch: true
noInnerLinks: true
---

<style type="text/css">
#browser-support
{
	padding: 20px;
}
#browser-support p
{
	margin: 0px;
	padding: 0px;
}
#browser-support button
{
	margin: 5px auto;
	display: block;
}
#browser-support p.status
{
	position: relative;
	top: 0px;
	left: 0px;
	padding-left: 40px;
}
p.status.unknown
{
	color: #333;
}
p.status.failure
{
	color: red;
}
p.status.success
{
	color: green;
}
p.status::before
{
	font: normal normal normal 14px/1 'Material-Design-Iconic-Font';
	position: absolute;
	left: 10px;
	top: 8px;
	font-weight: bold;
	transform: scale(1.5);
}
p.status.unknown::before
{
	content: '\f17a';
}
p.status.failure::before
{
	font: normal normal normal 14px/1 'Material-Design-Iconic-Font';
	content: '\f136';
}
p.status.success::before
{
	content: '\f26b';
}
</style>

Progressive Web Applications allow web applications - such as the M-Files Developer Portal - to behave much more like 'apps' on phones, tablets and computers.  These PWAs enable deeper integration to the host operating system, enabling offline page access (via local caching) and push notifications for content updates.  PWAs are supported by some modern web browsers, including Google Chrome (both on desktop and Android) and Microsoft Edge (17 upwards, included in Windows 10 version 1804).

<script>
	document.writeln("<div id='browser-support'><p class='status unknown'>We are checking your browser support.  Please wait...</p></div>");
</script>
<noscript>
	<p>Service workers require JavaScript support.</p>
</noscript>

<script src="pwa-script.js" defer></script>