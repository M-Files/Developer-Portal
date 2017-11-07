---
layout: mfws
title: Getting Started
includeInSearch: true
redirect_from: "/APIs/REST-API/Reference/gettingstarted.html"
---

# Getting Started
{:#gettingstarted}

This section demonstrates the use of M-Files Web Service by using low level HTTP requests. The information below should be applicale to most programming languages. See [Sample Code]({{ site.baseurl }}/APIs/REST-API/Reference/codesamples) section for sample M-Files Web Service C# client. The Sample Code package also contains the [struct]({{ site.baseurl }}/APIs/REST-API/Reference/structs) definitions used in the samples below.

## Prerequisities

There are three prerequisities for using MFWS: A HTTP client, MFWS URL and M-Files credentials. While the last item isn't strictly required, most of the M-Files operations require authentication and access to a document vault.

The HTTP client depends on the programming platform and doesn't necessarily mean a web browser. [WebClient](http://msdn.microsoft.com/en-us/library/system.net.webclient.aspx) is available for .NET framework and [HttpURLConnection](http://docs.oracle.com/javase/6/docs/api/java/net/HttpURLConnection.html) can be used in Java. Browser applications can perform the HTTP requests using the raw [XMLHttpRequest](https://developer.mozilla.org/en-US/docs/DOM/XMLHttpRequest) or a wrapper around this such as jQuery's [\$.ajax](http://api.jquery.com/jQuery.ajax/). If such HTTP API isn't available a raw network socket API will do as well.

The MFWS URL and the credentials are M-Files installation specific. The easiest way to acquire the URL is to configure M-Files Web Access, which comes with the web service. If M-Files Web Access is configured at http://example.org/m-files, the MFWS URL is http://example.org/m-files/REST. For the credentials please contact your M-Files administrator.

## Authenticating

MFWS provides three ways to authenticate the requests: Credentials in HTTP headers, cookie-based session and authentication tokens. Passing the credentials in the HTTP headers is the easiest way but sacrifices some security as the plain text credentials are passed in each request. Authentication tokens improve upon this by encrypting the credentials using asymmetric encryption. Cookie-based sessions offer some benefits in browser environments where the browser can manage the cookies. The choice of authentication mechanism has no effect on the actual use of the web service. The examples will mostly use the token based authentication.

### Example: Acquiring the authentication token

An authentication token request is one of the requests that can be made unauthenticated. It is made by POSTing the authentication credentials to the [/server/authenticationtokens]({{ site.baseurl }}/APIs/REST-API/Reference/resources/server/authenticationtokens) resource as shown in the [example below](#example-1).

<div class="sample" id="example-1">
	<div class="sample-code">
		<ul>
			<li><a href="#example-1-code-cs">C#</a></li>
			<li><a href="#example-1-code-js">JavaScript</a></li>
		</ul>
		<div id="example-1-code-cs">
			{% capture sample_authentication_cs %}{% include_relative samples/authentication/cs.md %}{% endcapture%}
			{{ sample_authentication_cs | markdownify }}
		</div>
		<div id="example-1-code-js">
			{% capture sample_authentication_js %}{% include_relative samples/authentication/js.md %}{% endcapture%}
			{{ sample_authentication_js | markdownify }}
		</div>
	</div>
	<div class="caption">
		<span class="caption-label">Example 1:</span>
		Requesting the authentication token.
	</div>
</div>

Once the authentication token has been acquired it can be used in the requests by passing it in the X-Authentication header. Note authentication can be done with or without the vault GUID. Authenticating without the vault GUID allows access to the server-level resources such as the document vault collection. A vault-level authentication is required to access the information within a document vault.

## Reading the resources

Once the authentication has been performed it is possible to access information within a document vault. This information is made available in terms of [resources]({{ site.baseurl }}/APIs/REST-API/Reference/resources). Save for few exceptions all of these resources support the HTTP GET method which allows an application to request the current representation of the resource. The [example below](#example-2) uses a GET request on the document vault root view resource found at [/views/items]({{ site.baseurl }}/APIs/REST-API/Reference/resources/views/path/items) to list all the views in the document vault root.

<div class="sample" id="example-2">
	<div class="sample-code">
		<ul>
			<li><a href="#example-2-code-cs">C#</a></li>
			<li><a href="#example-2-code-js">JavaScript</a></li>
		</ul>
		<div id="example-2-code-cs">
			{% capture sample_rootview_cs %}{% include_relative samples/rootview/cs.md %}{% endcapture%}
			{{ sample_rootview_cs | markdownify }}
		</div>
		<div id="example-2-code-js">
			{% capture sample_rootview_js %}{% include_relative samples/rootview/js.md %}{% endcapture%}
			{{ sample_rootview_js | markdownify }}
		</div>
	</div>
	<div class="caption">
		<span class="caption-label">Example 2:</span>
		Requesting the contents of the document vault root view.
	</div>
</div>

Testing resource reading is easy with the browser itself. You can log in to M-Files Web Access to establish the session. After this the GET-resources can be read with normal HTTP requests. However some browsers demand XML representation which MFWS is currently unable to provide for all resources. At least Internet Explorer 9 is able to read the resources in JSON format.
{:.remark}

## Writing the resources

Just like reading resources, modifying them by deleting or editing existing ones or creating new ones is done with basic HTTP requests as well. Each of these different operations has its own HTTP verb: POST for creating, PUT for editing and DELETE for deleting. However unlike GET, these other verbs are not available for all resources. The [resource reference]({{ site.baseurl }}/APIs/REST-API/Reference/resources) contains information on the resources and the methods available for them. The example [example below](#example-3) below uses POST request on the documents collection resource found at [/objects/0]({{ site.baseurl }}/APIs/REST-API/Reference/resources/objects/type/) to create a new document in the document vault.

<div class="sample" id="example-3">
	<div class="sample-code">
		<ul>
			<li><a href="#example-3-code-cs">C#</a></li>
			<li><a href="#example-3-code-js">JavaScript</a></li>
		</ul>
		<div id="example-3-code-cs">
			{% capture sample_creation_cs %}{% include_relative samples/creation/cs.md %}{% endcapture%}
			{{ sample_creation_cs | markdownify }}
		</div>
		<div id="example-3-code-js">
			{% capture sample_creation_js %}{% include_relative samples/creation/js.md %}{% endcapture%}
			{{ sample_creation_js | markdownify }}
		</div>
	</div>
	<div class="caption">
		<span class="caption-label">Example 3:</span>
		Creating a new document.
	</div>
</div>

Especially older IIS versions (5.1, 6.0) make it harder to use non GET or POST verbs with ASP.Net applications. While M-Files Web Service supports pure PUT and DELETE requests, the default IIS configuration for M-Files Web Access doesn't enable PUT and DELETE requests for IIS. For this reason M-Files Web Service supports a `?\_method=VERB` query parameter which is the recommended way to communicate the PUT and DELETE intents. See [compatibility]({{ site.baseurl }}/APIs/REST-API/Reference/compatibility) for more information on this. [Example below](#example-4) shows a PUT request on the [check-out state]({{ site.baseurl }}/APIs/REST-API/Reference/resources/objects/type/objectid/version/checkedout) resource.
{:.remark}

<div class="sample" id="example-4">
	<div class="sample-code">
		<ul>
			<li><a href="#example-4-code-cs">C#</a></li>
			<li><a href="#example-4-code-js">JavaScript</a></li>
		</ul>
		<div id="example-4-code-cs">
			{% capture sample_checkout_cs %}{% include_relative samples/checkout/cs.md %}{% endcapture%}
			{{ sample_checkout_cs | markdownify }}
		</div>
		<div id="example-4-code-js">
			{% capture sample_checkout_js %}{% include_relative samples/checkout/js.md %}{% endcapture%}
			{{ sample_checkout_js | markdownify }}
		</div>
	</div>
	<div class="caption">
		<span class="caption-label">Example 4:</span>
		Performing a check out.
	</div>
</div>

