---
layout: mfws
title: Code samples
includeInSearch: true
redirect_from: "/APIs/REST-API/Reference/samples.html"
---

# Code samples
{:#chpt:codesamples}

## Package

The sample code package for M-Files Web Service can be downloaded from [http://developer.m-files.com{{ site.baseurl }}/APIs/REST-API/Reference/MFWS_Samples.zip]({{ site.baseurl }}/APIs/REST-API/Reference/MFWS_Samples.zip). The package contains code samples and utilities in different languages. The package structure is described in [table 1](#table-1).

<div class="caption">
	<span class="caption-label">Table 1:</span>
	M-Files Web Service sample package structure
</div>

{:#table-1 .table}
Directory | Description
--- | ---
`MFWS Documentation.pdf` | This document.
`/CSharp/Sample` | C# samples used in this document.
`/CSharp/Utilities` | C# helpers.
`/Java/Utilities` | Java helpers.
`/JavaScript/Samples` | JavaScript samples used in this document.
`/JavaScript/Utilities` | JavaScript helpers.

## M-Files Web Service C# Client

The M-Files Web Service client contained in the C# utilities enables quick access to M-Files Web Service. The client takes care of most of the compatibility issues, authentication, serialization and error handling. [Example 1](#example-1) below demonstrates how to use the client to read and edit M-Files contents.

<div class="sample" id="example-1">
	<div class="sample-code">
		<ul>
			<li><a href="#example-1-code-cs">C#</a></li>
		</ul>
		<div id="example-1-code-cs">
			{% capture sample_mfwsclient_cs %}{% include_relative samples/mfwsclient/cs.md %}{% endcapture%}
			{{ sample_mfwsclient_cs | markdownify }}
		</div>
	</div>
	<div class="caption">
		<span class="caption-label">Example 1:</span>
		Using M-Files Web Service sample client.
	</div>
</div>
