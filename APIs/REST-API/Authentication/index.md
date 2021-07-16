---
layout: page
title: Authenticating to the M-Files Web Service (REST API)
includeInSearch: true
breadcrumb: Authentication
---

We support three primary authentication mechanisms: credentials in HTTP headers, cookie-based sessions, and authentication tokens.

These examples use the .NET HttpWebRequest and HttpWebResponse objects directly, and uses the [JSON.NET](http://www.newtonsoft.com/json) library for serialization/deserialization.  Other libraries are available that may make interacting with REST-like web services more simplistic, such as [RestSharp](http://restsharp.org/).  Always check the license details of third-party libraries to ensure that they can be used within your projects.
{:.note}

If your M-Files instance uses the Multi-Server Mode infrastructure (e.g. within the M-Files New Cloud) then you may need to make an additional change to how you handle authentication tokens.  More details are available in the [Multi-Server Mode Considerations](#multi-server-mode-considerations) section further down.
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

## Connecting via OAuth

Connecting via OAuth is a more complex approach than above, but adds additional security to the overall authentication process.  The instructions below assume that the vault/server is already correctly configured, and that you can log in using OAuth through the M-Files Web client.  Authenticating using OAuth typically involves a number of steps:

1. Obtain an access token to use for authentication. _Note: this step is typically required although if you already have a valid token from another process then you may be able to skip this step._
	1. Load the plugin information from M-Files and retrieve the OAuth configuration details.
	2. Display a web browser allowing the user to authenticate to their identity provider.
	3. When the authentication is complete, retrieve the authorization token.
	4. Swap the authorization token for an access token.
2. Connect to the vault using the access token.  M-Files will confirm identity with the provider.

An example application can be seen here: [https://github.com/M-Files/MFilesSamplesAndLibraries/blob/master/Samples/OAuth/RESTAPI/MainWindow.xaml.cs](https://github.com/M-Files/MFilesSamplesAndLibraries/blob/master/Samples/OAuth/RESTAPI/MainWindow.xaml.cs)
{:.note}

### Obtaining an access token

Retrieve the OAuth plugin information:

```csharp
// Create a RestSharp "RestClient", which we'll use for connecting.
// Note: the base url is of the form "https://m-files.mycompany.com".
this.client = new RestClient(baseUri);

// Attempt to get the OAuth details.
List<PluginInfoConfiguration> pluginInfoCollection = null;
{
	var response = this.client.Execute<List<PluginInfoConfiguration>>(new RestRequest("/REST/server/authenticationprotocols.aspx", Method.GET));
	pluginInfoCollection = response.Data;

	// Save the response cookies, for MSM compatibility.
	this.client.CookieContainer = this.client.CookieContainer ?? new System.Net.CookieContainer();
	if (null != response.Cookies)
		foreach (var cookie in response.Cookies)
			this.client.CookieContainer.Add(baseUri, new System.Net.Cookie(cookie.Name, cookie.Value, cookie.Path, cookie.Domain));
}
if (0 == pluginInfoCollection.Count)
{
	MessageBox.Show("No authentication plugins configured");
	return;
}
this.oAuthPluginInfo = pluginInfoCollection
	.FirstOrDefault(info => info.IsOAuthPlugin());

if (null == this.oAuthPluginInfo)
{
	MessageBox.Show("OAuth is not configured on the vault/server.");
	return;
}

/// <summary>
/// Returns whether the plugin is an OAuth plugin.
/// </summary>
/// <param name="plugin">The plugin details.</param>
/// <returns>true if the plugin represents an OAuth configuration.</returns>
public static bool IsOAuthPlugin(this PluginInfoConfiguration plugin)
{
	return plugin?.AssemblyName == "MFiles.AuthenticationProviders.OAuth";
}
```

Generate an authorization URI and show a web browser so that the user can authenticate:

```csharp
// Navigate to the OAuth screen.
var state = Guid.NewGuid().ToString("B");
this.oAuthPluginInfo.Configuration["state"] = state;
this.webBrowser.Navigate($"{this.oAuthPluginInfo.GenerateAuthorizationUri(state)}");

// Show the web browser.
this.webBrowser.Visibility = Visibility.Visible;

/// <summary>
/// Retrieves the redirect URI that should be used for authentication.
/// </summary>
/// <param name="plugin">The OAuth authentication plugin details.</param>
/// <returns>The redirect URI.</returns>
public static string GetAppropriateRedirectUri
(
	this PluginInfoConfiguration plugin
)
{
	// Sanity.
	if (null == plugin)
		throw new ArgumentNullException(nameof(plugin));

	return plugin.Configuration.GetValueOrNull("RedirectURIForNative")
		?? plugin.Configuration.GetValueOrNull("RedirectURIForMobile")
		?? plugin.Configuration.GetValueOrNull("RedirectURIForWeb")
		?? plugin.Configuration.GetValueOrNull("RedirectURIForWOPI")
		?? "http://localhost";
}

/// <summary>
/// Generates a valid authorization URI for use when doing OAuth authentication.
/// </summary>
/// <param name="plugin">The OAuth authentication plugin details.</param>
/// <param name="state">The state - must not be empty/null - used to passed to the authorization endpoint.</param>
/// <param name="forceLogin">If true then the user will be forced to log in, even if they have already authenticated recently.</param>
/// <returns>The URI that can be shown in a browser to undertake the OAuth flow.</returns>
public static Uri GenerateAuthorizationUri
(
	this PluginInfoConfiguration plugin,
	string state,
	bool forceLogin = false
)
{
	// Sanity.
	if (null == plugin)
		throw new ArgumentNullException(nameof(plugin));
	if (string.IsNullOrWhiteSpace(state))
		throw new ArgumentNullException(nameof(state));
	if (false == plugin.IsOAuthPlugin())
		throw new ArgumentException("The authentication plugin does not refer to an OAuth authentication type", nameof(plugin));
	var promptType = forceLogin ? "login" : null;
	var redirectUri = plugin.GetAppropriateRedirectUri();

	// Build up the URI with mandatory data.
	var uriBuilder = new UriBuilder(plugin.Configuration.GetValueOrNull("AuthorizationEndpoint")?.ToString());
	uriBuilder.SetQueryParam("client_id", plugin.Configuration.GetValueOrNull("ClientID")?.ToString());
	uriBuilder.SetQueryParam("redirect_uri", redirectUri);
	uriBuilder.SetQueryParam("response_type", "code");

	// Add the optional items, if set.
	uriBuilder.SetQueryParamIfNotNullOrWhitespace("scope", plugin.Configuration.GetValueOrNull("Scope")?.ToString());
	uriBuilder.SetQueryParamIfNotNullOrWhitespace("state", state);
	uriBuilder.SetQueryParamIfNotNullOrWhitespace("prompt", promptType);
	uriBuilder.SetQueryParamIfNotNullOrWhitespace("resource", plugin.Configuration.GetValueOrNull("Resource")?.ToString());

	// Return the generated URI.
	return uriBuilder.Uri;
}

```

When the user completes the authentication process, the web browser will be redirected across to the redirection URI provided earlier.  This navigation must be intercepted, and the authorization code retrieved from the querystring.  The authorization code can then be swapped for an access token:

```csharp
private async void webBrowser_Navigating(object sender, NavigatingCancelEventArgs e)
{
	// Sanity.
	if (null == this.oAuthPluginInfo)
		return;

	// We only want to react if it is being redirected to thte redirect Uri.
	if (!e.Uri.ToString().StartsWith(this.oAuthPluginInfo.GetAppropriateRedirectUri()))
		return;

	// We need to handle it.
	e.Cancel = true;
	this.webBrowser.Visibility = Visibility.Hidden;

	// Parse the tokens.
	var tokens = await this.ProcessRedirectUri(e.Uri);
}
private async Task<OAuth2TokenResponse> ProcessRedirectUri(Uri redirectUri)
{
	// Does this represent an error?
	var queryParams = new UriBuilder(redirectUri).GetQueryParamsDictionary();
	if (queryParams.ContainsKey("error"))
	{
		throw new InvalidOperationException
		(
			$"Exception {queryParams["error"]} returned by authorisation endpoint."
		);
	}

	// Check that the state was correct (not tampered with).
	if (this.oAuthPluginInfo.Configuration["state"]?.ToString() != queryParams["state"])
	{
		throw new InvalidOperationException
		(
			"The state returned by the authorisation endpoint was not correct."
		);
	}

	// Retrieve the authorisation code from the URI.
	var code = queryParams.ContainsKey("code") ? queryParams["code"] : null;

	// Convert the authorisation code to tokens.

	// Create the request, adding the mandatory items.
	var tokenEndpoint = new Uri(this.oAuthPluginInfo.GetTokenEndpoint(), uriKind: UriKind.Absolute);
	var request = new RestSharp.RestRequest(tokenEndpoint.PathAndQuery, RestSharp.Method.POST);
	request.AddParameter("code", code);
	request.AddParameter("grant_type", "authorization_code");
	request.AddParameter("redirect_uri", this.oAuthPluginInfo.GetAppropriateRedirectUri());

	// Add the client id.  If there's a realm then use that here too.
	{
		var siteRealm = this.oAuthPluginInfo.GetSiteRealm();
		var clientId = this.oAuthPluginInfo.GetClientID();
		request.AddParameter
		(
			"client_id",
			string.IsNullOrWhiteSpace(siteRealm)
				? clientId // If no site realm is supplied, just pass the client ID.
				: $"{clientId}@{siteRealm}" // Otherwise pass client ID @ site realm.
		);
	}

	// Add the optional bits.
	request
		.AddParameterIfNotNullOrWhitespace("resource", this.oAuthPluginInfo.GetResource())
		.AddParameterIfNotNullOrWhitespace("scope", this.oAuthPluginInfo.GetScope())
		.AddParameterIfNotNullOrWhitespace("client_secret", this.oAuthPluginInfo.GetClientSecret());

	// Execute the HTTP request.
	var restClient = new RestSharp.RestClient(tokenEndpoint.GetLeftPart(UriPartial.Authority));
	var response = await restClient.ExecutePostAsync<OAuth2TokenResponse>(request);

	// Validate response.
	if (null == response.Data)
		throw new InvalidOperationException("OAuth token not received from endpoint. Response: " + response.Content);
	else if (response.Data.TokenType != "Bearer")
		throw new InvalidOperationException("Token type was not bearer. Response: " + response.Content);

	// Return the access token data.
	return response.Data;
}
```

### Connecting using a token

Once we have the access token we can connect to the vault:

```csharp
// Add the auth token to the default headers.
this.client.AddDefaultHeader("Authorization", "Bearer " + tokens.AccessToken);
this.client.AddDefaultHeader("X-Vault", this.oAuthPluginInfo.VaultGuid);
```

## Multi-Server Mode Considerations

In platforms that use the M-Files [Multi-Server Mode]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Multi-Server-Mode/) approach (e.g. the M-Files "New Cloud"), M-Files servers to be attached to the same vault database at the same time.  In this configuration, any one of the multiple servers in the availability group may potentially respond to individual REST API calls.

One issue that developers may encounter is that authentication tokens created via a call to server A cannot be decrypted and used on servers B or C.  In this instance you will receive an error about `OAEP padding`.

To resolve this, the developer must ensure that any cookies that are provided within the HTTP response of `/server/authenticationtokens` are added to any and all subsequent REST API calls.  By doing so, future requests will be routed to the same server that provided the token, ensuring that they can be correctly used.

See [MFWSClient.Authentication.cs](https://github.com/M-Files/Libraries.MFWSClient/blob/master/MFaaP.MFWSClient/MFWSClient.Authentication.cs) in [MFWSClient](https://github.com/M-Files/Libraries.MFWSClient) (C# M-Files Web Service Wrapper) as an example of setting up cookies with CookieContainer.
{:.note}

You will still need to handle any `403` HTTP status codes that you may receive in the future and re-request an authentication token.  This could happen for the same reasons as in a single-server instance (e.g. if the token times out, or the credentials are changed on the server), but could also happen if the server used to create the token is no longer available (e.g. if it goes offline).  By re-requesting the authentication token and using the newly-provided session ID, the integration will now start to use (and continue to consistently use) a different server in the availability group.
{:.note}

These steps may not be required in future releases of Multi-Server Mode.  This notice will be removed at that point.