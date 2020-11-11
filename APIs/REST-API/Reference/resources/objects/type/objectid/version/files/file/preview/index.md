---
layout: mfws
title: File thumbnail
includeInSearch: true
redirect_from: "/APIs/REST-API/Reference/resources/objects/type/objectid/version/files/file/preview.html"
---

# File thumbnail

## /objects/(type)/(objectid)/(version)/files/(file)/preview
{:.url-with-parameters}

File thumbnail. 
{:.description}

### Methods

### GET
{:.method}

{:.method}
Output: | Stream: `application/png`
| Retrieves the file preview. If a preview cannot be generated the service responds with a 404. 
Parameters: | `?force` - If true, the server streams an empty image instead of giving a 404 response if the preview cannot be generated.
| `?size` - Specifies square dimensions. Defaults to 32. This also works with the force-parameter by forcing the empty image to have the specified dimensions.
| `?width` - Specifies preview width. Overrides size.
| `?height` - Specifies preview height. Overrides size.
| `?allowIcon=true` - Returns the icon for the file if a thumbnail preview cannot be generated.