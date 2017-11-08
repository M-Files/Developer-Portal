---
layout: mfws
title: Automatic metadata
includeInSearch: true
redirect_from: "/APIs/REST-API/Reference/resources/automaticmetadata.html"
---

# Automatic metadata

## /objects/automaticmetadata
{:.url-with-parameters}

Retrieves automatic metadata based on specified request info.
{:.description}

### Methods

### POST
{:.method}

{:.method}
Input: | [AutomaticMetadataRequestInfo]({{ site.baseurl }}/APIs/REST-API/Reference/structs/automaticmetadatarequestinfo/)
| Holds file upload ids and property values for fetching automatic metadata.
Output: | [PropertyValueSuggestion]({{ site.baseurl }}/APIs/REST-API/Reference/structs/propertyvaluesuggestion/)
| Collection of property value suggestions.