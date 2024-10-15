---
layout: page
title: Using Single Sign On (SSO) through the M-Files Web Service (REST API)
includeInSearch: true
breadcrumb: Single Sign On
legacy: true
---

Single Sign-On should not be used for new implementations.  [OAuth]({{site.baseurl}}/APIs/REST-API/Authentication/#connecting-via-oauth) should be used for authentication instead of Single Sign-On.
{:note.warning}

Single Sign-On is a mechanism to allow authenticated users to interact with network resources without explicitly authenticating with each one individually.  M-Files Classic Web, and therefore the M-Files Web Service, supports Single Sign-On, but requires some manual steps to enable and configure.
This document details those steps and provides a sample C# class which shows the process of signing into the M-Files Classic Web and using the token received to authenticate to the M-Files Web Service and execute further queries.

## Configuring IIS and M-Files Classic Web

This document does not deal with setting up M-Files Classic Web.  More information is available in the [Web and Mobile Access](https://www.m-files.com/user-guide/latest/eng/Configure_M-Files_Web_Access.html) section of the online user guide.
{:.note}

### Enabling Windows Authentication within IIS

Firstly, open IIS on the server running M-Files Classic Web, select the web site that M-Files Classic Web is running within, and double-click on the `Authentication` section:

![Open the Authentication section](iis-1.png)

Ensure that `Windows Authentication` is set to `Enabled`:

![Enable Windows Authentication](iis-2.png)

### Configuring M-Files Classic Web to allow SSO

By default, M-Files Classic Web does not allow Single Sign-On authentication.  Single Sign-On can be enabled alongside standard ("forms-based") authentication using the M-Files Classic Web Configuration page.
To do this, open a web browser and go to `http://myserver/Configuration.aspx`.  This web page allows a server administrator to configure how M-Files Classic Web functions, and to enable or disable functionality such as Single Sign-On.
Select `General` on the left, then enable `Windows SSO`:

![Enable Windows Single Sign On within MFWA](mfwa-1.png)

It is recommended that these changes are tested in a demonstration/test environment prior to changing any live system, as incorrect settings may lead to M-Files Classic Web (and therefore the M-Files Web Service) becoming inaccessible.
{:.note}

## Using Single Sign-On from an application

The basic approach to using Single Sign-On from an application is:

* Make a HTTP request to `/WebServiceSSO.aspx`, providing the vault Id to connect to.
* Ensure that a 200 ("OK") status code was returned, and retrieve the session ID cookie from the HTTP response.
* Ensure that the session ID cookie is added to all subsequent requests to the M-Files Web Service.

Please note, though:

* Your application must be executed as a user with rights to the M-Files vault.
* The session ID cookie has a limited timespan and may require refreshing if the timeout elapses.
* The session ID cookie may become invalidated due to server activity (e.g. a server restart) and may require refreshing prior to the expected timeout.

### A C# Sample console application

The below application is a sample .NET 5.0 console application.  It is designed to show the concept, not to be an example of a production-quality approach.

This sample uses the Newtonsoft.JSON library to avoid having to parse the JSON response.  Please confirm the licenses for any third party libraries prior to their use.
{:.note}

```csharp
using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;

namespace TestWindowsSSO
{
	class Program
	{
		/// <summary>
		///  The client handler to use with the http client.
		/// </summary>
		private static readonly System.Net.Http.HttpClientHandler clientHandler
			= new System.Net.Http.HttpClientHandler()
			{
				// The cookie container is used to persist cookies from the SSO request.
				UseCookies = true,
				CookieContainer = new CookieContainer(),

				// Default credentials means login automatically if we can.
				UseDefaultCredentials = true,
				Credentials = CredentialCache.DefaultNetworkCredentials                
			};

		/// <summary>
		/// The http client to use to make requests.
		/// </summary>
		private static readonly System.Net.Http.HttpClient httpClient 
			= new System.Net.Http.HttpClient
			(
				handler: clientHandler
			);

		static void Main( string[] args )
		{
			var task = Task.Run(async () =>
			{
				// Authenticate to the sample vault.
				await AuthenticateUsingSSO(Guid.Parse("{2722F9AB-B96B-4DB5-B1A1-8E0618D289B7}"));

				// Get the object types.
				var objectTypes = await GetObjectTypes();
				Console.WriteLine($"Got {objectTypes.Count} object types.");
			});
			task.Wait();
		}

		private static async Task AuthenticateUsingSSO( Guid vaultGuid )
		{
			// Make a request to the SSO endpoint.
			var request = new System.Net.Http.HttpRequestMessage
			(
				System.Net.Http.HttpMethod.Post,
				$"http://localhost/WebServiceSSO.aspx?popup=1&vault={vaultGuid.ToString("B")}"
			);
			var response = await httpClient.SendAsync(request);

			// TODO: We are assuming that the call worked.

			// Copy all cookies into the client handler.
			// This includes the ASP.NET session cookie which will
			// subsequently be used for authentication.
			if (response.Headers.Contains("Set-Cookie"))
			{
				foreach (var cookieHeader in response.Headers.GetValues("Set-Cookie"))
				{
					clientHandler.CookieContainer.SetCookies(new Uri("http://localhost"), cookieHeader);
				}
			}

		}

		private static async Task<List<ObjType>> GetObjectTypes()
		{
			// Issue a request for the object types and parse them into the expected structure.
			// The structures come from https://developer.m-files.com/APIs/REST-API/Reference/samples.html
			var request = new System.Net.Http.HttpRequestMessage
			(
				System.Net.Http.HttpMethod.Get,
				$"http://localhost/REST/structure/objecttypes"
			);
			var response = await httpClient.SendAsync(request);

			// TODO: We are assuming the call worked.

			// Parse out the results.
			// This sample uses Newtonsoft; you could use another approach.
			return Newtonsoft.Json.JsonConvert.DeserializeObject<List<ObjType>>(await response.Content.ReadAsStringAsync());

		}
	}

	/// <summary>
	// Based on M-Files API.
	/// </summary>
	/// <remarks>
	/// This is copied from a more full implementation here:
	/// https://github.com/M-Files/Libraries.MFWSClient/blob/master/MFaaP.MFWSClient/MFWSStructs.cs
	/// The MFWSClient sample library provides an example of how to access the MFWS via code.
	/// Its implementation of this single sign on approach (using the RestSharp library) is here:
	/// https://github.com/M-Files/Libraries.MFWSClient/blob/master/MFaaP.MFWSClient/MFWSClient.Authentication.cs#L113
	/// </remarks>
	public class ObjType
	{
		/// <summary>
		/// Default constructor, empty.
		/// </summary>
		public ObjType()
		{
		}

		/// <summary>
		/// Based on M-Files API.
		/// </summary>
		public bool AllowAdding { get; set; }

		/// <summary>
		/// Based on M-Files API.
		/// </summary>
		public bool CanHaveFiles { get; set; }

		/// <summary>
		/// Based on M-Files API.
		/// </summary>
		public int DefaultPropertyDef { get; set; }

		/// <summary>
		/// Based on M-Files API.
		/// </summary>
		public bool External { get; set; }

		/// <summary>
		/// Based on M-Files API.
		/// </summary>
		public int ID { get; set; }

		/// <summary>
		/// Based on M-Files API.
		/// </summary>
		public string NamePlural { get; set; }

		/// <summary>
		/// Based on M-Files API.
		/// </summary>
		public string Name { get; set; }

		/// <summary>
		/// Based on M-Files API.
		/// </summary>
		public int OwnerPropertyDef { get; set; }

		/// <summary>
		/// Is this ValueList a sublist of another (eg, does this ValueList have an owner)?
		/// </summary>
		public bool HasOwner { get; set; }

		/// <summary>
		/// If HasOwner is true, Owner will yield the ID of the Owner ValueList.
		/// </summary>
		public int Owner { get; set; }

		/// <summary>
		/// Based on M-Files API.
		/// </summary>
		public List<int> ReadOnlyPropertiesDuringInsert { get; set; }

		/// <summary>
		/// Based on M-Files API.
		/// </summary>
		public List<int> ReadOnlyPropertiesDuringUpdate { get; set; }

		/// <summary>
		/// Based on M-Files API.
		/// </summary>
		public bool RealObjectType { get; set; }

		/// <summary>
		/// Specifies whether this object type is hierarchical (has an internal hierarchy).
		/// </summary>
		/// <remarks>ref: https://developer.m-files.com/APIs/COM-API/Reference/latest/MFilesAPI~ObjType~Hierarchical.html</remarks>
		public bool Hierarchial { get; set; }

	}
}

```
