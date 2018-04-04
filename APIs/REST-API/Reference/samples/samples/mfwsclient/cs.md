```csharp
static void Run()
{
    // Create the MFWSClient.
    MfwsClient client = new MfwsClient("http://example.org/REST");

    // Acquire an authentication token.
    // This involves performing a POST request to /server/authenticationtokens
    // resource. The return value is PrimitiveType<string> which contains the
    // actual token in the Value property.
    var result = client.Post<PrimitiveType<string>>(
        "/server/authenticationtokens.aspx",
        new Authentication { Username = "username", Password = "password" });

    // Read the authentication token and store it in the client.
    // This way it will be used in future requests.
    client.Authentication = result.Value;

    // The current authentication token is an application-level token as we
    // didn't specify a vault GUID when we constructed it. We cannot use it
    // to access the Vault. However we can use it to acquire the vault-level
    // token through the /session/vaults collection.

	// For maximum compatibility, all PUT/DELETE verbs are routed via _method,
	// and endpoints end in ".aspx".
	// ref: http://developer.m-files.com/APIs/REST-API/#iis-compatibility

    // Request the current vaults.
    var vaults = client.Get<Vault[]>("/session/vaults.aspx");

    // Select the first available vault.
    var vault = vaults[0];

    // The vaults return vault-level authentication tokens. Get the one on
    // the selected vault and insert it as the default token to the client.
    client.Authentication = vault.Authentication;

    // Now we have a client with vault-access. We can now access the vault
    // contents.

    // Retrieve an object version.
    ObjectVersion ov = client.Get<ObjectVersion>( "/objects/0/136/latest.aspx" );
    Console.WriteLine( ov.Title );

    // Perform a check out.
    ov = client.Post<ObjectVersion>(
        "/objects/0/136/latest/checkedout.aspx?_method=PUT",
        new PrimitiveType<MFCheckOutStatus> { Value = MFCheckOutStatus.CheckedOutToMe } );

    Console.WriteLine( "Checked out: " + ov.ObjectCheckedOut );

    // Set the name property.
    ov = client.Post<ObjectVersion>(
        "/objects/0/136/" + ov.ObjVer.Version + "/properties/0.aspx?_method=PUT",
        new PropertyValue
        {
            // PropertyDef 0 is the built-in Title property.
            PropertyDef = 0,
            TypedValue = new TypedValue
            {
                DataType = MFDataType.Text,
                Value = "New Name"
            }
        } );

    // Print the new title.
    Console.WriteLine( ov.Title );

    // Finally check the object in.
    ov = client.Post<ObjectVersion>(
        "/objects/0/136/" + ov.ObjVer.Version + "/checkedout.aspx?_method=PUT",
        new PrimitiveType<MFCheckOutStatus> { Value = MFCheckOutStatus.CheckedIn } );

    Console.WriteLine( "Checked out: " + ov.ObjectCheckedOut );

}
```