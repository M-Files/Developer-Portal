---
layout: mfws
title: Syntax encoding
includeInSearch: true
redirect_from: "/APIs/REST-API/Reference/syntax.html"
---

# Syntax encoding
{:#chpt:syntax}

## Typed values

The value part of the typed value is encoded according to the data type. The encoding does not include the data type as this is often defined by the situation. If this is not the case the data type must be communicated together with the encoded value. [Table 1](#table-1) lists the different encoding schemes for different data types.

<div class="caption">
	<span class="caption-label">Table 1:</span>
	Typed value encoding by data type
</div>

{:#table-1 .table}
Data type | Encoding
--- | ---
ACL | Not implemented.
Boolean | 'true' / 'false'
Time, Date, Timestamp | ISO format string.
Floating | Real number as string
Integer, Integer64 | Integer as string
Lookup | Integer as string. Lookup ID.
Multi-Select Lookup | Comma separated Lookup-encoding.
Uninitialized | Not implemented.
Text, Multi-Line Text| string

## Views
{:#sect:viewpath}

View paths are encoded in the URL path based on the level hierarchy. Levels refer to views, traditional folders or virtual folders defined with typed values. The encoding format is described below in [table 2](#table-2). [Example 1](#example-1) contains encoding samples for different views.

<div class="caption">
	<span class="caption-label">Table 2:</span>
	ABNF of the view path encoding
</div>

{:#table-2 .table}
viewpath | = '/' / level *level [ '/' ]
level | = '/' ( view-level / folder-level / external-view-level / typed-value )
external-view-level | = 'u' external-repository-name ':' external-view-id; the repository name and view ID should be URI-encoded
view-level | = 'v' number  ; Normal view
folder-level| = 'y' number  ; Traditional folder
typed-value | = data-type data-value
data-type | = 'T' / 'M'  ; Text, MultiLineText <br> / 'I' / 'J' / 'R'  ; Integer, Integer64, Real number <br>  / 'D' / 'C' / 'E' / 'P' ; Date, Time, FILETIME, Timestamp <br>  / 'L' / 'S' ; Lookup, MSLU <br>  / '-' / 'A' / 'B'  ; Uninitialized, ACL, Boolean
data-value | = segment-nz<br>; URI path segment as defined in RFC-3986. (ie.\ legal URI text, excluding `/')<br> ; The value is encoded according to 5.1 and then double URI encoded.

<div class="sample" id="example-1">
	<div class="sample-code">
		<ul>
			<li><a href="#example-1-code-js">JavaScript</a></li>
		</ul>
		<div id="example-1-code-js">
			{% capture sample_views_js %}{% include_relative samples/views/js.md %}{% endcapture%}
			{{ sample_views_js | markdownify }}
		</div>
	</div>
	<div class="caption">
		<span class="caption-label">Example 1:</span>
		View encoding examples.
	</div>
</div>

The double uri encoding is not strictly required in most cases. If the text value passed in the URI contains a forward slash (`/') then the double encoding must be used. Without double encoding the forward slash will be interpreted as a view level separator.
{:.remark}

## Search conditions
{:#sect:search-encoding}

Search conditions are conveyed as query parameters. The parameter starts with an expression specifier. This is followed by the operator followed by the value. The condition encoding is described in [table 3](#table-3). [Example 2](#example-2) contains some encoding samples for different searches.

<div class="caption">
	<span class="caption-label">Table 3:</span>
	ABNF of the search condition encoding
</div>

{:#table-3 .table}
conditions | condition *( '\&' condition )
condition | = expression operator value
expression | = 'q'  ; Quicksearch <br> / 'p' number  ; PropertyValueExpression <br> / 'vl' number  ; TypedValueExpression (Value list search)  <br> / 'o'  ; Object Type  <br> / 'd'  ; Is Deleted
operator | = [ '!' ] op-mod
op-mod | = '='  ; Equal <br> / '<<=' / '<='  ; Less, Less or Equal  <br> / '>>=' / '>='  ; Greater, Greater or Equal  <br> / '**=' / '*='  ; Matches wildcard, Contains  <br> / '\^='  ; Starts With
value | = null-value / id-value / typed-value-encoded-value / 'include' <br> ; See 5.1 for the typed value encoding.  <br> ; 'include' is a special value available for the 'Is Deleted' condition.
null-value | = '\%00'  ; Equals null
id-value | = number / 'e' string <br> ; 'e' specifies external ID condition <i>(* see note below)</i>. ID is URI escaped.

<i>* External IDs can only be used with value list searches (e.g. `vl102=eABC` would search for items that refer to an object of type `102` with an external ID `ABC`).  External IDs cannot be used with property value searches (e.g. `p1024=eABC` would not search for items that refer to an object with an external ID `ABC` in property `1024`).</i>

<div class="sample" id="example-2">
	<div class="sample-code">
		<ul>
			<li><a href="#example-2-code-js">JavaScript</a></li>
		</ul>
		<div id="example-2-code-js">
			{% capture sample_searches_js %}{% include_relative samples/searches/js.md %}{% endcapture%}
			{{ sample_searches_js | markdownify }}
		</div>
	</div>
	<div class="caption">
		<span class="caption-label">Example 2:</span>
		Search encoding examples.
	</div>
</div>

Note that unlike M-Files API, M-Files Web Service doesn't return deleted objects by default. Specify `d=include` condition to include the deleted objects as well.
{:.remark}

## External object IDs

[Some endpoints]({{ site.baseurl }}/APIs/REST-API/Reference/iml/#object-operations-supporting-external-objects) can be used to interact with unmanaged objects (external objects which have not yet been promoted).  However, these objects do not have internal M-Files IDs and so the typical URI format is not valid.

Instead, the `ExternalRepositoryName` and `ExternalRepositoryObjectID` from the returned [ObjVer]({{site.baseurl }}/APIs/REST-API/Reference/structs/objver/) can be used instead of the "object ID" in the URI.  The format of the URI element should be the letter `u`, followed by the `ExternalRepositoryName`, followed by a colon, followed by the `ExternalRepositoryObjectID`; the entire segment should be URL-encoded (i.e. ":" should be encoded as "%3A").  If the object contains a version then that too should be prefixed by "u" and URL-encoded.

In the samples below, the external object has an `ExternalRepositoryName` of `e46e8488c1f94e529038e9fb80cf88b0`, an `ExternalRepositoryObjectID` of `Document!o1` and an `ExternalRepositoryObjectVersionID` of `f46f848831f94f529038f9fb803f88b0`.
{:.remark}

{:.table}
Description | URI
--- | ---
Managed object (latest version) | `/REST/objects/0/123/latest/properties` 
Unmanaged object (latest version) | `/REST/objects/0/ue46e8488c1f94e529038e9fb80cf88b0%3ADocument%252101/latest/properties`
Managed object (specific version) | `/REST/objects/0/123/3/properties`
Unmanaged object (specific version) | `/REST/objects/0/ue46e8488c1f94e529038e9fb80cf88b0%3ADocument%252101/uf46f848831f94f529038f9fb803f88b0/properties`
