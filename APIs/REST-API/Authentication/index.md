---
layout: page
title: Authenticating to the M-Files Web Service (REST API)
includeInSearch: true
---

We support three primary authentication mechanisms: credentials in HTTP headers, cookie-based sessions, and authentication tokens.

<p class="note">These examples use the .NET HttpWebRequest and HttpWebResponse objects directly, and uses the <a href="http://www.newtonsoft.com/json">JSON.NET</a> library for serialization/deserialization.  Other libraries are available that may make interacting with REST-like web services more simplistic, such as <a href="http://restsharp.org/">RestSharp</a>.  Always check the license details of third-party libraries to ensure that they can be used within your projects.</p>

## Authentication tokens

Using authentication tokens is the recommended method to interact with the M-Files Web Service.  To use authentication tokens, make a POST request to the `/REST/server/authenticationtokens` endpoint, passing the username, password and vault GUID to log into.  Once an authentication token has been received, provide it in the HTTP headers in all subsequent requests (the HTTP header name should be `X-Authentication`).

```csharp
// Create a JSON.NET serializer to serialize/deserialize request and response bodies.
var jsonSerializer = JsonSerializer.CreateDefault();

// Create the authentication details.
var auth = new
{
	Username = "AlexK",
	Password = "My Password",
	VaultGuid = "{C840BE1A-5B47-4AC0-8EF7-835C166C8E24}" // Use GUID format with {braces}.
};

// Create the web request.
var authenticationRequest = (HttpWebRequest) WebRequest.Create("http://example.org/REST/server/authenticationtokens");
authenticationRequest.Method = "POST";

// Add the authentication details to the request stream.
using (var streamWriter = new StreamWriter(authenticationRequest.GetRequestStream()))
{
	using (var jsonTextWriter = new JsonTextWriter(streamWriter))
	{
		jsonSerializer.Serialize(jsonTextWriter, auth);
	}
}

// Execute the request.
var authenticationResponse = (HttpWebResponse)authenticationRequest.GetResponse();

// Extract the authentication token.
string authenticationToken = null;
using (var streamReader = new StreamReader(authenticationResponse.GetResponseStream()))
{
	using (var jsonTextReader = new JsonTextReader(streamReader))
	{
		authenticationToken = ((dynamic) jsonSerializer.Deserialize(jsonTextReader)).Value;
	}
}

// Create a web request pointing at the endpoint that returns all items in the root view.
var request = (HttpWebRequest)WebRequest.Create("http://example.org/REST/views/items");

// Ensure we set the authentication header.
request.Headers.Add("X-Authentication", authenticationToken);

// Execute the request.
var response = (HttpWebResponse)request.GetResponse();
```

<p class="note">The M-Files Web Service will return an authentication token regardless of whether authentication was successful or not.</p>

### Controlling authentication token expiration

An Expiration property can be provided as part of the authentication details.  This should be provided in ISO format:

```csharp
// Create the authentication details.
var auth = new
{
	Username = "AlexK",
	Password = "My Password",
	VaultGuid = "{C840BE1A-5B47-4AC0-8EF7-835C166C8E24}", // Use GUID format with {braces}.
	Expiration = "2017-01-01T23:59:00Z"
};
```

<p class="note warning">If no expiry information is provided then the authentication token returned will have an indefinite expiry.  The only way to forcibly expire an authentication token in this instance is to change the user's login credentials and restart M-Files Web Access.</p>

## Cookie-based sessions

Cookie-based sessions are typically used in [single-sign-on scenarios]({{ site.baseurl }}/APIs/REST-API/Authentication/Single-Sign-On/), where a request is made to an endpoint and an ASP.NET session cookie is returned.  This session cookie is then included in all future HTTP requests:

```csharp
// Create a web request for the single sign on authentication endpoint,
// passing it the vault GUID (without braces).
var authenticationRequest = (HttpWebRequest)WebRequest.Create( "/WebServiceSSO.aspx?popup=1&vault=C840BE1A-5B47-4AC0-8EF7-835C166C8E24" );

// Execute the request.
var authenticationResponse = (HttpWebResponse)authenticationRequest.GetResponse();

// Iterate over the response and extract the headers into a cookie container.
// This cookie container can then be used for all subsequent requests.
var cookieContainer = new CookieContainer();
foreach(var cookie in authenticationResponse.Cookies)
{
    cookieContainer.Add(new Cookie(cookie.Name, cookie.Value, cookie.Path, cookie.Domain));
}

// Create a web request pointing at the endpoint that returns all items in the root view.
var request = (HttpWebRequest)WebRequest.Create( "http://example.org/REST/views/items" );

// Ensure we set the authentication cookies.
request.CookieContainer = cookieContainer;

// Execute the request.
var response = (HttpWebResponse)request.GetResponse();
```

## Sending credentials in HTTP headers

<p class="note warning">This method is not recommended.  Instead, obtain an authentication token so that raw credentials are not passed in all your HTTP requests.</p>

The M-Files Web Service documentation details the available [authentication request parameters](https://www.m-files.com/mfws/parameters.html), which are then included in your subsequent HTTP requests:

```csharp
// Create a web request pointing at the endpoint that returns all items in the root view.
var request = (HttpWebRequest)WebRequest.Create( "http://example.org/REST/views/items" );

// Add the username.
request.Headers.Add("X-Username", "AlexK");

// Add the password.
request.Headers.Add("X-Password", "My Password");

// Add the vault GUID (note the brace format).
request.Headers.Add("X-Vault", "{C840BE1A-5B47-4AC0-8EF7-835C166C8E24}");

// Execute the request.
var response = (HttpWebResponse)request.GetResponse();
```