---
layout: mfws
title: Vault structural element alias to ID resolution
includeInSearch: true
minimumVersion: 12.0.6783.0
---

# Vault structural element alias to ID resolution

## /structure/metadatastructure/itemidbyalias
{:.url-with-parameters}

Resolves aliases of various vault structural elements (workflows, property definitions, classes, object types, value lists) to their IDs.
{:.description}

### POST
{:.method}

{:.method}
Input: | JSON object (see below)
Output: | JSON object (see below)

This endpoint accepts a JSON object detailing the aliases to resolve.  A sample request body is shown below:

```json
{
	"properties" : [ "PropertyAlias1", "MyProperty2" ],
	"objecttypes" : [ "OTAlias 2"],
	"classes" : [ "ClassAlias" ],
	"workflows" : [ "Workflow1" ],
	"workflowstates" : [],
	"statetransitions" : [],
	"valuelists" : []
}
```

A sample response body is shown below:

```json
{
	"properties" : 
	{
		"PropertyAlias1" : 1001,
		"MyProperty2" : 2034
	},
	"objecttypes" :
	{
		"OTAlias 2" : -1
	},
	"classes" : 
	{
		"ClassAlias" : 432
	},
	"workflows" : 
	{
		"Workflow1"  : 234
	}
}
```

Aliases that could not be resolved will be returned as -1.  The endpoint will return a 500 status code and the following text if the JSON format is incorrect: `The JSON part of the API call contains one or more errors`.
{:.remark}