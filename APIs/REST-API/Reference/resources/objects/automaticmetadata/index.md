---
layout: mfws
title: Automatic metadata
includeInSearch: true
redirect_from: "/APIs/REST-API/Reference/resources/automaticmetadata.html"
minimumVersion: 12.0.6400.37
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
| Holds the uploaded files (by file reference or upload ID) and property values for fetching automatic metadata.
Output: | [PropertyValueSuggestion[]]({{ site.baseurl }}/APIs/REST-API/Reference/structs/propertyvaluesuggestion/)
| Collection of property value suggestions from the registered intelligence services.

In M-Files MFILES_VERSION_TBD and later, pass the files uploaded with `?statelessUpload=true` in `UploadedFiles` by their file references. File references can be used on any server instance, so this request needs no sticky session to the server that received the uploads.
{:.remark}