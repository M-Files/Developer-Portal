---
layout: page
title: Searching using the M-Files Web Service (REST API)
includeInSearch: true
breadcrumb: Searching
---

The M-Files Web Service exposes an [endpoint](https://developer.m-files.com/APIs/REST-API/Reference/resources/objects.html) which can be used to execute searches against the current M-Files vault.  Searching against the vault involves providing one or more [search conditions](https://developer.m-files.com/APIs/REST-API/Reference/syntax.html#sect:search-encoding) via the querystring.

Note that, unlike the M-Files COM API, the M-Files Web Service will exclude deleted objects from the search results by default.

If using .NET, it may be worth looking at the [REST API Wrapper for .NET](/Samples-And-Libraries/#rest-api-wrapper-net).  This handles the creation of the search condition querystring parameters, and any encoding required for their values.
{:.note}

## Example search conditions

### Quick search

To execute a quicksearch, include a querystring parameter named `q` and set its value to the term to search by.  This is equivalent to using the search bar at the top of the M-Files Desktop or Web interfaces.

```csharp
// Build the url to request (note to encode the query term).
// NOTE: http://developer.m-files.com/APIs/REST-API/#iis-compatibility
var url =
	new Uri("http://kb.cloudvault.m-files.com/REST/objects.aspx?q=" + System.Net.WebUtility.UrlEncode("mfws"));

// Build the request.
var httpClient = new HttpClient();

// Start the request.
var responseBody = await httpClient.GetStringAsync(url);

// Attempt to parse it.  For this we will use the Json.NET library, but you could use others.
var results = JsonConvert.DeserializeObject<Results<ObjectVersion>>(responseBody);
Console.WriteLine($"There were {results.Items.Count} results returned.");
```

### Restricting by object type

To restrict by object type, a querystring parameter named `o` must be included, and the value must be set to the [ID of the object type](http://developer.m-files.com/APIs/REST-API/Concepts/#obtaining-metadata-structure-element-ids).

This example restricts the search to only return documents (built-in object type ID of 0).

```csharp
// Build the url to request.
// NOTE: http://developer.m-files.com/APIs/REST-API/#iis-compatibility
var url =
	new Uri("http://kb.cloudvault.m-files.com/REST/objects.aspx?o=0");

// Build the request.
var httpClient = new HttpClient();

// Start the request.
var responseBody = await httpClient.GetStringAsync(url);

// Attempt to parse it.  For this we will use the Json.NET library, but you could use others.
var results = JsonConvert.DeserializeObject<Results<ObjectVersion>>(responseBody);
Console.WriteLine($"There were {results.Items.Count} results returned.");
```

### Including deleted items

To include deleted items, a querystring parameter named `d` must be included, with a value of `include`:

```csharp
// Build the url to request.
// NOTE: http://developer.m-files.com/APIs/REST-API/#iis-compatibility
var url =
	new Uri("http://kb.cloudvault.m-files.com/REST/objects.aspx?d=include");

// Build the request.
var httpClient = new HttpClient();

// Start the request.
var responseBody = await httpClient.GetStringAsync(url);

// Attempt to parse it.  For this we will use the Json.NET library, but you could use others.
var results = JsonConvert.DeserializeObject<Results<ObjectVersion>>(responseBody);
Console.WriteLine($"There were {results.Items.Count} results returned.");
```

### Restricting by a property value

*Note that in all the examples below, we will only build the URL to request.  The rest of the code is assumed to be similar to the examples above.*

To restrict search results by the value of a property, a querystring parameter must be constructed, the name of which depends on the property ID to query, and the value must be [correctly formatted](https://developer.m-files.com/APIs/REST-API/Reference/syntax.html).

#### Restricting by text properties

For example, to restrict the search results by the value of a property with ID `1002`, the querystring parameter must be named `p1002`.  Assuming this property is a text field which we wish to match `ESTT` exactly, the value of the querystring parameter would be `ESTT`.  The entire querystring paramter would be `p1002=ESTT`.

Note that the querystring parameter may need to be [URL encoded](https://en.wikipedia.org/wiki/Percent-encoding).

```csharp
// Build the url to request.
// NOTE: http://developer.m-files.com/APIs/REST-API/#iis-compatibility
var url =
	new Uri("http://kb.cloudvault.m-files.com/REST/objects.aspx?p1002=ESTT");
```

If we wished to restrict by a text property with ID where the field contains `ESTT`, we would alter the operator:

```csharp
// Build the url to request.
// NOTE: http://developer.m-files.com/APIs/REST-API/#iis-compatibility
var url =
	new Uri("http://kb.cloudvault.m-files.com/REST/objects.aspx?p1002*=ESTT");
```

If we wished to restrict by a text property with ID where the field matches a [wildcard search for `ESTT*`](https://www.m-files.com/user-guide/latest/eng/Quick_search.html), we would alter the operator:

```csharp
// Build the url to request.
// NOTE: http://developer.m-files.com/APIs/REST-API/#iis-compatibility
var url =
	new Uri("http://kb.cloudvault.m-files.com/REST/objects.aspx?p1002**=ESTT");
```

#### Restricting by a boolean property

To restrict the search results by the value of a property with ID `1050`, the querystring parameter must be named `p1050`.  Assuming this property is a boolean which we want to be true, the entire querystring paramter would be `p1050=true`.

```csharp
// Build the url to request.
// NOTE: http://developer.m-files.com/APIs/REST-API/#iis-compatibility
var url =
	new Uri("http://kb.cloudvault.m-files.com/REST/objects.aspx?p1050=true");
```

Alternatively, we could search for only objects where the property is false:

```csharp
// Build the url to request.
// NOTE: http://developer.m-files.com/APIs/REST-API/#iis-compatibility
var url =
	new Uri("http://kb.cloudvault.m-files.com/REST/objects.aspx?p1050=false");
```

#### Restricting by a numeric property (integer or real)

To restrict the search results by the value of a property with ID `1100`, the querystring parameter must be named `p1100`.  Assuming this property is a boolean which we want to equal 123, the entire querystring paramter would be `p1100=123`.

```csharp
// Build the url to request.
// NOTE: http://developer.m-files.com/APIs/REST-API/#iis-compatibility
var url =
	new Uri("http://kb.cloudvault.m-files.com/REST/objects.aspx?p1100=123");
```

Alternatively, we could make use of a [different operator](#operators) to instead search for objects where the value is greater than 1000:

```csharp
// Build the url to request.
// NOTE: http://developer.m-files.com/APIs/REST-API/#iis-compatibility
var url =
	new Uri("http://kb.cloudvault.m-files.com/REST/objects.aspx?p1100>>=1000");
```

#### Restricting by a date/time or timestamp property

To restrict the search results by the value of a property with ID `1200`, the querystring parameter must be named `p1200`.  The property value must be formatted in ISO-format.  If we wished to match objects where the date property equals 1st June 2017, the querystring parameter would be `p1200=2017-06-01` :

```csharp
// Build the url to request.
// NOTE: http://developer.m-files.com/APIs/REST-API/#iis-compatibility
var url =
	new Uri("http://kb.cloudvault.m-files.com/REST/objects.aspx?p1200=2017-06-01");
```

Alternatively, we could make use of a [different operator](#operators) to instead search for objects where the date is newer than 1st June 2017:

```csharp
// Build the url to request.
// NOTE: http://developer.m-files.com/APIs/REST-API/#iis-compatibility
var url =
	new Uri("http://kb.cloudvault.m-files.com/REST/objects.aspx?p1200>>=2017-06-01");
```

#### Restricting by a lookup (single-select) property

To restrict the search results by the value of a property with ID `1500`, the querystring parameter must be named `p1500`.  The property value must be the ID of the lookup item.  For example, to restrict the results to only objects which referenced an object or value list item with ID 12345, the querystring parameter would be `p1500=12345`.

```csharp
// Build the url to request.
// NOTE: http://developer.m-files.com/APIs/REST-API/#iis-compatibility
var url =
	new Uri("http://kb.cloudvault.m-files.com/REST/objects.aspx?p1500=12345");
```

#### Restricting by a multi-select lookup property

To restrict the search results by the value of a property with ID `1500`, the querystring parameter must be named `p1500`.  The property value must be the ID of the lookup item.  For example, to restrict the results to only objects which referenced an object or value list item with ID 12345, the querystring parameter would be `p1500=12345`.  If there is only one value then this is the same as a single-select-lookup.

```csharp
// Build the url to request.
// NOTE: http://developer.m-files.com/APIs/REST-API/#iis-compatibility
var url =
	new Uri("http://kb.cloudvault.m-files.com/REST/objects.aspx?p1500=12345");
```

To restrict objects to only objects which reference objects or value list items with *either* IDs 1, 2, 3, or 4, the values must be comma-separated.  The full querystring parameter would be `p1500=1,2,3,4`:

```csharp
// Build the url to request.
// NOTE: http://developer.m-files.com/APIs/REST-API/#iis-compatibility
var url =
	new Uri("http://kb.cloudvault.m-files.com/REST/objects.aspx?p1500=1,2,3,4");
```

## Combining search conditions

Executing a search using multiple conditions involves building up a more complex querystring to provide to the [objects endpoint](https://developer.m-files.com/APIs/REST-API/Reference/resources/objects.html).  Each condition is built and encoded as specified in the [search encoding table](https://developer.m-files.com/APIs/REST-API/Reference/syntax.html#sect:search-encoding) and the search conditions are appended to the querystring, separated by ampersands.

For example, a quicksearch for the string "mfws" may be encoded as `q=mfws`, and a constraint to restrict the results only to documents as `o=0`.  Combining these two conditions together would result in a request to `/objects?q=mfws&o=0`.  Additional constraints can be added until the desired expression is complete.

```csharp
// Build the url to request (note to encode the query term).
// Also note that "o=0" (object type Id equals zero) has been added to the querystring.
// NOTE: http://developer.m-files.com/APIs/REST-API/#iis-compatibility
var url =
	new Uri("http://kb.cloudvault.m-files.com/REST/objects.aspx?q=" + System.Net.WebUtility.UrlEncode("mfws") + "&o=0");

// Build the request.
var httpClient = new HttpClient();

// Start the request.
var responseBody = await httpClient.GetStringAsync(url);

// Attempt to parse it.  For this we will use the Json.NET library, but you could use others.
var results = JsonConvert.DeserializeObject<Results<ObjectVersion>>(responseBody);
Console.WriteLine($"There were {results.Items.Count} results returned.");
```

## Operators

*These operators are used when searching by a property value, and are detailed [in the online documentation](https://developer.m-files.com/APIs/REST-API/Reference/syntax.html).*

### Available operators

| Operator | Description | Example |
| - | - | - |
| = | The property value must equal the value provided. | p1050=ESTT |
| <<= | The property value must be less than the value provided. | p1050<<=1000 |
| <= | The property value must be less than or equal to the value provided. | p1050<=1000 |
| >>= | The property value must be greater than the value provided. | p1050>>=1000 |
| >= | The property value must be greater than or equal to the value provided. | p1050>=1000 |
| **= | The property value must match the wildcard search value provided. | p1050**=ESTT* |
| *= | The property value must contain the value provided. | p1050*=ESTT |
| ^= | The property value must start with the value provided. | p1050^=ESTT |

### Op-mod

The op-mod negates the operator provided, and is used in front of it.  For example: 

| Operator | Description | Example |
| - | - | - |
| != | The property value must *not* equal the value provided. | p1050!=ESTT |

## Tips and tricks

### Increasing the number of results

You can provide a querystring parameter to the search named `limit`, with a maximum value, `e.g. /REST/objects/0?q=test&limit=5000` would limit the results to 5000 items.

Please note that this endpoint calls the [SearchForObjectsByConditionsEx](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~VaultObjectSearchOperations~SearchForObjectsByConditionsEx.html) API method and provides the limit value to the `MaxSearchResults` parameter. The timeout stays at the default (60 seconds), and the limitations described in the API endpoint are still applicable.
{:.note}
