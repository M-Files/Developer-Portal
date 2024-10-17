---
layout: page
title: Connecting and Authenticating
includeInSearch: true
breadcrumb: Connecting
---

The API can be used in either "server" or "client" mode. Some API methods are only available in one of the modes.  Client mode is designed to be used in situations where both the user is present, and a connection to the vault has been created in the M-Files Desktop Settings. In client mode, built-in M-Files dialogs (e.g. the "create new object" metadata card) can be shown to the user for them to interact with.  Server mode is designed to be used in situations where the user is not necessarily present, and/or a connection to the vault has not been created in the M-Files Desktop Settings. In server mode, dialogs cannot be shown and the code must programmatically undertake these actions.  The server mode allows connections to M-Files servers using the standard protocols – TCP/IP, HTTPS, and LPC – and supports all the same authentication schemes that M-Files supports.

The primary focus of creating a connection to the server is to create a [Vault](https://developer.m-files.com/APIs/COM-API/Reference/MFilesAPI~Vault.html) object.  The Vault object can then be used to query content from the vault, or to process it in some manner.

## Creating a Client Connection

A client connection requires that a connection to the vault has already been created using the [M-Files Desktop Settings](https://www.m-files.com/user-guide/latest/eng/Implementing_the_document_vault.html) application.  When creating a client connection, the connection information (the server details, how to communicate with it, and authentication details) are held within the existing connection, and we just need to retrieve the connection.

```csharp
// Instantiate an MFilesClientApplication object.
// https://developer.m-files.com/APIs/COM-API/Reference/index.html#MFilesAPI~MFilesClientApplication.html
var mfClientApplication = new MFilesClientApplication();

// Find all connections to the vault with GUID {C840BE1A-5B47-4AC0-8EF7-835C166C8E24},
// then select the first one and bind to it if we can.
// Note: this will return null if no connections are created.
var vault = mfClientApplication.GetVaultConnectionsWithGUID("{C840BE1A-5B47-4AC0-8EF7-835C166C8E24}")
	.Cast<VaultConnection>()
	.FirstOrDefault()?
	.BindToVault(IntPtr.Zero, CanLogIn: true, ReturnNULLIfCancelledByUser: true);
```

## Creating a Server Connection

When creating a server connection, you must provide all information about the connection (the server details, how to communicate with it, authentication details, and the vault GUID).

```csharp
// Instantiate an MFilesServerApplication object.
// https://developer.m-files.com/APIs/COM-API/Reference/MFilesAPI~MFilesServerApplication.html
var mfServerApplication = new MFilesServerApplication();

// Connect to a local server using the default parameters (TCP/IP, localhost, current Windows user).
// https://developer.m-files.com/APIs/COM-API/Reference/index.html#MFilesAPI~MFilesServerApplication~Connect.html
mfServerApplication.Connect();

// Obtain a connection to the vault with GUID {C840BE1A-5B47-4AC0-8EF7-835C166C8E24}.
// Note: this will except if the vault is not found.
var vault = mfServerApplication.LogInToVault("{C840BE1A-5B47-4AC0-8EF7-835C166C8E24}");
```

### Authentication

The COM API supports all common authentication mechanisms.

To connect using the current Windows credentials (default):

```csharp
// Instantiate an MFilesServerApplication object.
// https://developer.m-files.com/APIs/COM-API/Reference/MFilesAPI~MFilesServerApplication.html
var mfServerApplication = new MFilesServerApplication();

// Connect to a local server using the default parameters (TCP/IP, localhost, current Windows user).
// https://developer.m-files.com/APIs/COM-API/Reference/index.html#MFilesAPI~MFilesServerApplication~Connect.html
mfServerApplication.Connect();

// OR:

// Connect to a local server using the default parameters (TCP/IP, localhost),
// explicitly stating the current Windows user for auth.
// https://developer.m-files.com/APIs/COM-API/Reference/index.html#MFilesAPI~MFilesServerApplication~Connect.html
mfServerApplication.Connect(MFAuthType.MFAuthTypeLoggedOnWindowsUser);

// Obtain a connection to the vault with GUID {C840BE1A-5B47-4AC0-8EF7-835C166C8E24}.
// Note: this will except if the vault is not found.
var vault = mfServerApplication.LogInToVault("{C840BE1A-5B47-4AC0-8EF7-835C166C8E24}");
```

To connect using a specific M-Files user:

```csharp
// Instantiate an MFilesServerApplication object.
// https://developer.m-files.com/APIs/COM-API/Reference/MFilesAPI~MFilesServerApplication.html
var mfServerApplication = new MFilesServerApplication();

// Connect to a local server using the default parameters (TCP/IP, localhost),
// using an M-Files user for authentication.
// https://developer.m-files.com/APIs/COM-API/Reference/index.html#MFilesAPI~MFilesServerApplication~Connect.html
mfServerApplication.Connect(
				MFAuthType.MFAuthTypeSpecificMFilesUser, 
				UserName: "Craig", 
				Password: "Hello world");

// Obtain a connection to the vault with GUID {C840BE1A-5B47-4AC0-8EF7-835C166C8E24}.
// Note: this will except if the vault is not found.
var vault = mfServerApplication.LogInToVault("{C840BE1A-5B47-4AC0-8EF7-835C166C8E24}");
```

To connect using a specific Windows user:

```csharp
// Instantiate an MFilesServerApplication object.
// https://developer.m-files.com/APIs/COM-API/Reference/MFilesAPI~MFilesServerApplication.html
var mfServerApplication = new MFilesServerApplication();

// Connect to a local server using the default parameters (TCP/IP, localhost),
// using an M-Files user for authentication.
// https://developer.m-files.com/APIs/COM-API/Reference/index.html#MFilesAPI~MFilesServerApplication~Connect.html
mfServerApplication.Connect(
				MFAuthType.MFAuthTypeSpecificWindowsUser, 
				UserName: "Craig", 
				Password: "Hello world",
				Domain: "MyDomain");

// Obtain a connection to the vault with GUID {C840BE1A-5B47-4AC0-8EF7-835C166C8E24}.
// Note: this will except if the vault is not found.
var vault = mfServerApplication.LogInToVault("{C840BE1A-5B47-4AC0-8EF7-835C166C8E24}");
```

### Specifying server details

#### Using gRPC

The gRPC protocol should be used for all connections, where available.
{:.note.warning}

```csharp
// Instantiate an MFilesServerApplication object.
// https://developer.m-files.com/APIs/COM-API/Reference/MFilesAPI~MFilesServerApplication.html
var mfServerApplication = new MFilesServerApplication();

// Set up the connection data.
var connectionData = new ConnectionData();
connectionData.ClientCapabilities.UnmanagedObjectsSupported = true;
connectionData.AllowUsingAuthenticationPlugins = true;
connectionData.EncryptedConnection = true; // Must be true if the server uses TLS.
// Ensure that you use the correct port.  In the cloud this is 443 but may be different in other architectures.
// Check with the system administrator.
connectionData.Endpoint = "443";
connectionData.NetworkAddress = "m-files.mycompany.com"; // Connect to m-files.mycompany.com;
connectionData.ProtocolSequence = "grpc";

// Connect using the default authentication details.
// https://developer.m-files.com/APIs/COM-API/Reference/index.html#MFilesAPI~MFilesServerApplication~Connect.html
mfServerApplication.ConnectEx7(connectionData);

// Obtain a connection to the vault with GUID {C840BE1A-5B47-4AC0-8EF7-835C166C8E24}.
// Note: this will except if the vault is not found.
var vault = mfServerApplication.LogInToVault("{C840BE1A-5B47-4AC0-8EF7-835C166C8E24}");
```

#### Using TCP/IP

```csharp
// Instantiate an MFilesServerApplication object.
// https://developer.m-files.com/APIs/COM-API/Reference/MFilesAPI~MFilesServerApplication.html
var mfServerApplication = new MFilesServerApplication();

// Connect using the default authentication details,
// specifying the server details.
// https://developer.m-files.com/APIs/COM-API/Reference/index.html#MFilesAPI~MFilesServerApplication~Connect.html
mfServerApplication.Connect(
	ProtocolSequence: "ncacn_ip_tcp", // Connect using TCP/IP.
	NetworkAddress: "m-files.mycompany.com", // Connect to m-files.mycompany.com
	Endpoint: "2266"); // Connect to the default port (2266).

// Obtain a connection to the vault with GUID {C840BE1A-5B47-4AC0-8EF7-835C166C8E24}.
// Note: this will except if the vault is not found.
var vault = mfServerApplication.LogInToVault("{C840BE1A-5B47-4AC0-8EF7-835C166C8E24}");
```

#### Using RPC over HTTPS

```csharp
// Instantiate an MFilesServerApplication object.
// https://developer.m-files.com/APIs/COM-API/Reference/MFilesAPI~MFilesServerApplication.html
var mfServerApplication = new MFilesServerApplication();

// Connect using the default authentication details,
// specifying the server details.
// https://developer.m-files.com/APIs/COM-API/Reference/index.html#MFilesAPI~MFilesServerApplication~Connect.html
mfServerApplication.Connect(
	ProtocolSequence: "ncacn_http", // Connect using HTTPS.
	NetworkAddress: "m-files.mycompany.com", // Connect to m-files.mycompany.com
	Endpoint: "4466"); // Connect to the default port (4466).

// Obtain a connection to the vault with GUID {C840BE1A-5B47-4AC0-8EF7-835C166C8E24}.
// Note: this will except if the vault is not found.
var vault = mfServerApplication.LogInToVault("{C840BE1A-5B47-4AC0-8EF7-835C166C8E24}");
```

With the HTTPS protocol, specify the M-Files Server endpoint that will be used between the RPC Proxy and M-Files Server on the server side. Typically this value is 4466. Note that this parameter does not affect the port that the client uses to communicate with the server. Regardless of this setting, the client will always use the standard HTTPS port for communicating with the server.
{:.note}

### Connecting via OAuth

Connecting via OAuth is a more complex approach than above, but adds additional security to the overall authentication process.  The instructions below assume that the vault/server is already correctly configured, and that you can log in using OAuth through the M-Files Desktop client.  Authenticating using OAuth typically involves a number of steps:

1. Obtain an access token to use for authentication. _Note: this step is typically required although if you already have a valid token from another process then you may be able to skip this step._
	1. Load the plugin information from M-Files and retrieve the OAuth configuration details.
	2. Display a web browser allowing the user to authenticate to their identity provider.
	3. When the authentication is complete, retrieve the authorization token.
	4. Swap the authorization token for an access token.
2. Connect to the vault using the access token.  M-Files will confirm identity with the provider.

An example application can be seen here: [https://github.com/M-Files/MFilesSamplesAndLibraries/blob/master/Samples/OAuth/COMAPI/MainWindow.xaml.cs](https://github.com/M-Files/MFilesSamplesAndLibraries/blob/master/Samples/OAuth/COMAPI/MainWindow.xaml.cs)
{:.note}

#### Obtaining an access token

Retrieve the OAuth plugin information:

```csharp
// Attempt to get the OAuth details.
var pluginInfoCollection = this.serverApplication.GetAuthenticationPluginInformationEx
(
	// We need to specify what to connect to, and how.
	ProtocolSequence: this.connectionDetails.ProtocolSequence,
	NetworkAddress: this.connectionDetails.NetworkAddress,
	Endpoint: this.connectionDetails.Endpoint,
	EncryptedConnection: this.connectionDetails.EncryptedConnection,

	// In some configurations you can provide the host name and no vault GUID and get back the 
	// authentication plugin details.  If this does not work, though, then you must
	// know the vault GUID and pass it as part of this call.
	HostName: this.connectionDetails.NetworkAddress,
	VaultGUID: this.connectionDetails.VaultGuid,

	// The authentication stuff can be empty/defaults.
	UserName: this.connectionDetails.UserName,
	Domain: this.connectionDetails.Domain,
	AccountType: MFLoginAccountType.MFLoginAccountTypeWindows,
	TargetPluginName: string.Empty
);
if (0 == pluginInfoCollection.Count)
{
	MessageBox.Show("No authentication plugins configured");
	return;
}
this.oAuthPluginInfo = pluginInfoCollection
	.Cast<PluginInfo>()
	.FirstOrDefault(info => info.AssemblyName == "MFiles.AuthenticationProviders.OAuth");
if (null == this.oAuthPluginInfo)
{
	MessageBox.Show("OAuth is not configured on the vault/server.");
	return;
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
	this PluginInfo plugin
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
	this PluginInfo plugin,
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
	var uriBuilder = new UriBuilder(plugin.Configuration["AuthorizationEndpoint"]?.ToString());
	uriBuilder.SetQueryParam("client_id", plugin.Configuration["ClientID"]?.ToString());
	uriBuilder.SetQueryParam("redirect_uri", redirectUri);
	uriBuilder.SetQueryParam("response_type", "code");

	// Add the optional items, if set.
	uriBuilder.SetQueryParamIfNotNullOrWhitespace("scope", plugin.Configuration["Scope"]?.ToString());
	uriBuilder.SetQueryParamIfNotNullOrWhitespace("state", state);
	uriBuilder.SetQueryParamIfNotNullOrWhitespace("prompt", promptType);
	uriBuilder.SetQueryParamIfNotNullOrWhitespace("resource", plugin.Configuration["Resource"]?.ToString());

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

#### Connecting using a token

Once we have the access token we can connect to the vault:

```csharp
// Connect to the server.
var authenticationData = new NamedValues();
authenticationData["Token"] = tokens.AccessToken;
this.serverApplication.ConnectWithAuthenticationDataEx6
(
	new ConnectionData()
	{
		AllowUsingAuthenticationPlugins = true,
		ProtocolSequence = this.connectionDetails.ProtocolSequence,
		NetworkAddress = this.connectionDetails.NetworkAddress,
		Endpoint = this.connectionDetails.Endpoint,
		EncryptedConnection = this.connectionDetails.EncryptedConnection
	},
	this.oAuthPluginInfo,
	authenticationData
);

// Get a vault that the user can see (in the real world we may need to let them choose).
var vaults = this.serverApplication.GetOnlineVaults();
if (0 == vaults.Count)
	throw new InvalidOperationException("User cannot access any vaults");
var vault = this.serverApplication.LogInToVault(vaults.Cast<VaultOnServer>().First().GUID);
```