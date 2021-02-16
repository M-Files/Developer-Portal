---
layout: page
title: Authenticating to the M-Files Web Service (REST API)
includeInSearch: true
breadcrumb: Authentication
---

We support three primary authentication mechanisms: credentials in HTTP headers, cookie-based sessions, and authentication tokens.

These examples use the .NET HttpWebRequest and HttpWebResponse objects directly, and uses the [JSON.NET](http://www.newtonsoft.com/json) library for serialization/deserialization.  Other libraries are available that may make interacting with REST-like web services more simplistic, such as [RestSharp](http://restsharp.org/).  Always check the license details of third-party libraries to ensure that they can be used within your projects.
{:.note}

If your cloud instance is migrated to the M-Files "New Cloud" (multi-server-mode-based) infrastructure then you may need to make an additional change to how you handle authentication tokens.  More details are available in the [M-Files New Cloud](#m-files-new-cloud) section further down.
{:.note.warning}

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
// NOTE: http://developer.m-files.com/APIs/REST-API/#iis-compatibility
var authenticationRequest = (HttpWebRequest) WebRequest.Create("http://example.org/REST/server/authenticationtokens.aspx");
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
// NOTE: http://developer.m-files.com/APIs/REST-API/#iis-compatibility
var request = (HttpWebRequest)WebRequest.Create("http://example.org/REST/views/items.aspx");

// Ensure we set the authentication header.
request.Headers.Add("X-Authentication", authenticationToken);

// Execute the request.
var response = (HttpWebResponse)request.GetResponse();
```

The M-Files Web Service will return an authentication token regardless of whether authentication was successful or not.
{:.note}

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

If no expiry information is provided then the authentication token returned will have an indefinite expiry.  Note that you **should not expect tokens without an expiry to last forever**; many situations may cause the token to become unusable.  The only way to forcibly expire an authentication token in this instance is to change the user's login credentials and restart M-Files Web Access.
{:.note.warning}

### Logging out sessions

In order to allow a session to be logged out, it must be provided with a unique "Session ID" as part of the authentication token request.  The session ID can be any unique string - in the sample below it is a GUID:

```csharp
// Create the authentication details.
var auth = new
{
	Username = "AlexK",
	Password = "My Password",
	VaultGuid = "{C840BE1A-5B47-4AC0-8EF7-835C166C8E24}",
	SessionID = "{fc430ff7-9bff-45aa-8402-5cbaa3da22d0}" // Can be any unique string
};
```

In order to subsequently log out a session, execute a `DELETE` request to the [/session]({{ site.baseurl }}/APIs/REST-API/Reference/resources/session/) endpoint.

You cannot log out a session unless a session ID was provided during the initial request for an authentication token.  Attempts to do so will return an exception.
{:.note.warning}

## Cookie-based sessions

Cookie-based sessions are typically used in [single-sign-on scenarios]({{ site.baseurl }}/APIs/REST-API/Authentication/Single-Sign-On/), where a request is made to an endpoint and an ASP.NET session cookie is returned.  This session cookie is then included in all future HTTP requests:

```csharp
// Create a web request for the single sign on authentication endpoint,
// passing it the vault GUID (without braces).
var authenticationRequest = (HttpWebRequest)WebRequest.Create( "/WebServiceSSO.aspx?popup=1&vault=C840BE1A-5B47-4AC0-8EF7-835C166C8E24" );
authenticationRequest.CookieContainer = new CookieContainer();

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
// NOTE: http://developer.m-files.com/APIs/REST-API/#iis-compatibility
var request = (HttpWebRequest)WebRequest.Create( "http://example.org/REST/views/items.aspx" );

// Ensure we set the authentication cookies.
request.CookieContainer = cookieContainer;

// Execute the request.
var response = (HttpWebResponse)request.GetResponse();
```

## Sending credentials in HTTP headers

This method is not recommended.  Instead, obtain an authentication token so that raw credentials are not passed in all your HTTP requests.
{:.note.warning}

The M-Files Web Service documentation details the available [authentication request parameters](https://www.m-files.com/mfws/parameters.html), which are then included in your subsequent HTTP requests:

```csharp
// Create a web request pointing at the endpoint that returns all items in the root view.
// NOTE: http://developer.m-files.com/APIs/REST-API/#iis-compatibility
var request = (HttpWebRequest)WebRequest.Create( "http://example.org/REST/views/items.aspx" );

// Add the username.
request.Headers.Add("X-Username", "AlexK");

// Add the password.
request.Headers.Add("X-Password", "My Password");

// Add the vault GUID (note the brace format).
request.Headers.Add("X-Vault", "{C840BE1A-5B47-4AC0-8EF7-835C166C8E24}");

// Execute the request.
var response = (HttpWebResponse)request.GetResponse();
```

## M-Files New Cloud

The M-Files "New Cloud" is a new cloud-based platform that is currently rolling out to our cloud customers.  This platform is based upon the M-Files [Multi-Server Mode]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Multi-Server-Mode/) approach which allows multiple M-Files servers to be attached to the same vault database at the same time.  In this approach, any one of the multiple servers in the availability group may potentially respond to individual REST API calls.

The issue that developers may encounter is that authentication tokens created via a call to server A cannot be decrypted and used on servers B or C.  In this instance you will receive an error about `OAEP padding`.

To resolve this, the developer must ensure that any cookies that are provided within the HTTP response of `/server/authenticationtokens` are added to any and all subsequent REST API calls.  By doing so, future requests will be routed to the same server that provided the token, ensuring that they can be correctly used.

You will still need to handle any `403` HTTP status codes that you may receive in the future and re-request an authentication token.  This could happen for the same reasons as in a single-server instance (e.g. if the token times out, or the credentials are changed on the server), but could also happen if the server used to create the token is no longer available (e.g. if it goes offline).  By re-requesting the authentication token and using the newly-provided session ID, the integration will now start to use (and continue to consistently use) a different server in the availability group.
{:.note}

These steps may not be required in future releases of the New Cloud.  This notice will be removed at that point.