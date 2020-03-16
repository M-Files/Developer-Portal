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
	color: #333;
	background-position: 20px 3px;
	background-repeat: no-repeat;
	background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' aria-hidden='true' focusable='false' width='1em' height='1em' style='-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);' preserveAspectRatio='xMidYMid meet' viewBox='0 0 24 24'%3E%3Cpath d='M11 18h2v-2h-2v2m1-16A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8m0-14a4 4 0 0 0-4 4h2a2 2 0 0 1 2-2a2 2 0 0 1 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5a4 4 0 0 0-4-4z' fill='%23626262'/%3E%3C/svg%3E");
}
#browser-support p.status.failure
{
	color: red;
	background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' aria-hidden='true' focusable='false' width='1em' height='1em' style='-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);' preserveAspectRatio='xMidYMid meet' viewBox='0 0 24 24'%3E%3Cpath d='M11 15h2v2h-2v-2m0-8h2v6h-2V7m1-5C6.47 2 2 6.5 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2m0 18a8 8 0 0 1-8-8a8 8 0 0 1 8-8a8 8 0 0 1 8 8a8 8 0 0 1-8 8z' fill='%23626262'/%3E%3C/svg%3E");
}
#browser-support p.status.success
{
	color: green;
	background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' aria-hidden='true' focusable='false' width='1em' height='1em' style='-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);' preserveAspectRatio='xMidYMid meet' viewBox='0 0 24 24'%3E%3Cpath d='M20 12a8 8 0 0 1-8 8a8 8 0 0 1-8-8a8 8 0 0 1 8-8c.76 0 1.5.11 2.2.31l1.57-1.57A9.822 9.822 0 0 0 12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10M7.91 10.08L6.5 11.5L11 16L21 6l-1.41-1.42L11 13.17l-3.09-3.09z' fill='%23626262'/%3E%3C/svg%3E");
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