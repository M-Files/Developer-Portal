```csharp
public ObjectVersion CreateObject( int type, PropertyValue[] propertyValues, Stream file, string extension )
{
    // First upload the file.

    // Create the file upload request.
    // statelessUpload=true asks for a file reference (FileRef) instead of an upload ID,
    // so the requests need no sticky session (M-Files MFILES_VERSION_TBD and later).
    string uploadUrl = "http://example.org/REST/files?statelessUpload=true";
    var uploadRequest = WebRequest.Create( uploadUrl );
    uploadRequest.Method = "POST";

    // Fill the authentication information.
    uploadRequest.Headers["X-Authentication"] = this.AuthenticationToken;

    // Upload the file.
    uploadRequest.ContentType = "application/octet-stream";
    var uploadStream = uploadRequest.GetRequestStream();
    file.CopyTo( uploadStream );

    // Get the upload information from the response.
    // The information is in the response stream in JSON format.
    // DataContractJsonSerializer lets us deserialize it back into an object.
    var uploadResponse = uploadRequest.GetResponse();
    var uploadSerializer = new DataContractJsonSerializer( typeof( UploadInfo ) );
    var uploadInfo = (UploadInfo)uploadSerializer.ReadObject( uploadResponse.GetResponseStream() );

    // The raw upload has no file name, so set the extension of the file, without the dot.
    // Otherwise the file is saved without an extension.
    uploadInfo.Extension = extension;

    // Once the file is uploaded it can be used in object creation.

    // Construct the URL.
    // For object creation the URL only specifies the type.
    string url = "http://example.org/REST/objects/" + type;
    var createRequest = WebRequest.Create( url );
    createRequest.Method = "POST";
    createRequest.Headers["X-Authentication"] = this.AuthenticationToken;

    // Create the creation info.
    var creationInfo = new ObjectCreationInfo
    {
        PropertyValues = propertyValues,
        Files = new[] { uploadInfo }
    };

    // Send the creation info to the server.
    // Use JSON serializer to serialize it to the request stream.
    var infoSerializer = new DataContractJsonSerializer( typeof( ObjectCreationInfo ) );
    infoSerializer.WriteObject( createRequest.GetRequestStream(), creationInfo );

    // Now get the response.
    var createResponse = createRequest.GetResponse();
    var serializer = new DataContractJsonSerializer( typeof( ObjectVersion ) );
    var objectVersion = (ObjectVersion)serializer.ReadObject( createResponse.GetResponseStream() );

    // Return the newly created object.
    return objectVersion;
}
```