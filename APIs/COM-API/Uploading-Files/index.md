---
layout: page
title: Uploading files with the COM API
includeInSearch: true
breadcrumb: Uploading files
---

This page explains how to upload file content to the server with the COM API: the stateless file upload, which identifies an upload by a **file reference**, and the older upload sessions, which identify an upload by an **upload ID**.

Upload IDs are obsolete in M-Files MFILES_VERSION_TBD and later. Use file references in new code whenever the server supports them.
{:.note.warning}

## Why file references replace upload IDs

The upload session methods, such as [UploadTemporaryFile](https://developer.m-files.com/APIs/COM-API/Reference/index.html#MFilesAPI~VaultObjectFileOperations~UploadTemporaryFile.html) and [UploadFileBlockBegin](https://developer.m-files.com/APIs/COM-API/Reference/index.html#MFilesAPI~VaultObjectFileOperations~UploadFileBlockBegin.html), return an integer upload ID. The upload session behind the ID lives on the server instance that created it. In a multi-server or cloud environment, every later call that uses the ID must reach the same server instance, so the client needs a sticky session (session affinity) to the server.

The stateless file upload returns a file reference instead. A file reference is a string that identifies the uploaded content on any server instance, so no sticky session is needed. The server removes uploaded content that is never committed to a file.

## Checking whether the stateless file upload can be used

The stateless file upload methods are available only when:

* M-Files API is used in the [server interface mode]({{ site.baseurl }}/APIs/COM-API/#api-modes-client-vs-server),
* the connection to the server uses gRPC, and
* the server is M-Files MFILES_VERSION_TBD or later and supports the stateless file upload ([ServerVaultCapabilities.FileUploadStatelessSupported](https://developer.m-files.com/APIs/COM-API/Reference/index.html#MFilesAPI~ServerVaultCapabilities~FileUploadStatelessSupported.html)).

Call [IsFileUploadStatelessSupported](https://developer.m-files.com/APIs/COM-API/Reference/index.html#MFilesAPI~VaultObjectFileOperations~IsFileUploadStatelessSupported.html) to check all of these at once. If it returns `false`, use the upload session methods.

```csharp
var useFileRefs = vault.ObjectFileOperations.IsFileUploadStatelessSupported();
```

## Uploading a small file in a single call

[FileUploadWhole](https://developer.m-files.com/APIs/COM-API/Reference/index.html#MFilesAPI~VaultObjectFileOperations~FileUploadWhole.html) uploads the whole content in one call and returns its file reference. The server limits the size of a whole upload, so use it for small files only.

```csharp
var content = File.ReadAllBytes(@"C:\temp\test.txt");
var fileRef = vault.ObjectFileOperations.FileUploadWhole(content);

// Calculate the MD5 checksum of the uploaded content for FileUploadCommit.
byte[] checksum;
using (var md5 = System.Security.Cryptography.MD5.Create())
	checksum = md5.ComputeHash(content);
```

## Uploading a large file in blocks

1. [FileUploadBegin](https://developer.m-files.com/APIs/COM-API/Reference/index.html#MFilesAPI~VaultObjectFileOperations~FileUploadBegin.html) returns the file reference, the maximum block size, and whether the blocks must be uploaded in order.
2. [FileUploadBlock](https://developer.m-files.com/APIs/COM-API/Reference/index.html#MFilesAPI~VaultObjectFileOperations~FileUploadBlock.html) uploads each block by its zero-based index. Every block but the last must be of the same size. Uploading a block again replaces it, so a failed block can be retried. If the server does not require sequential blocks, the blocks can be uploaded in parallel.
3. [FileUploadEnd](https://developer.m-files.com/APIs/COM-API/Reference/index.html#MFilesAPI~VaultObjectFileOperations~FileUploadEnd.html) assembles the blocks into the content of the file reference.

```csharp
const string filePath = @"C:\temp\large.pdf";
var totalSize = new FileInfo(filePath).Length;

// Begin the upload.
var fileRef = vault.ObjectFileOperations.FileUploadBegin(
	TotalSizeInBytes: totalSize,
	MaxBlockSize: out long maxBlockSize,
	RequireSequentialBlocks: out bool requireSequentialBlocks);

// Upload the blocks in order, and calculate the MD5 checksum of the content
// for FileUploadCommit while reading it.
long blockCount = 0;
byte[] checksum;
using (var md5 = System.Security.Cryptography.IncrementalHash.CreateHash(
	System.Security.Cryptography.HashAlgorithmName.MD5))
using (var stream = File.OpenRead(filePath))
{
	var buffer = new byte[maxBlockSize];
	int read;
	while ((read = stream.Read(buffer, 0, buffer.Length)) > 0)
	{
		var block = buffer;
		if (read < buffer.Length)
			Array.Resize(ref block, read);  // Only the last block can be smaller.
		md5.AppendData(block);
		vault.ObjectFileOperations.FileUploadBlock(fileRef, blockCount, block);
		blockCount++;
	}
	checksum = md5.GetHashAndReset();
}

// End the upload.
vault.ObjectFileOperations.FileUploadEnd(fileRef, blockCount);
```

## Using the file reference

An ended upload does not belong to any object yet. Use the file reference with:

* [FileUploadCommit](https://developer.m-files.com/APIs/COM-API/Reference/index.html#MFilesAPI~VaultObjectFileOperations~FileUploadCommit.html) to commit the content to a file in a checked-out object. See [Updating objects]({{ site.baseurl }}/APIs/COM-API/Updating-Objects/#replacing-the-content-of-a-file-with-a-file-reference) and [Creating objects]({{ site.baseurl }}/APIs/COM-API/Creating-Objects/#creating-a-document-from-a-file-reference).
* [GetAutomaticMetadataForUploadedFiles](https://developer.m-files.com/APIs/COM-API/Reference/index.html#MFilesAPI~VaultAutomaticMetadataOperations~GetAutomaticMetadataForUploadedFiles.html) to get metadata suggestions for the uploaded files.
* [CompareWithUploadedFile](https://developer.m-files.com/APIs/COM-API/Reference/index.html#MFilesAPI~VaultDocumentComparisonOperations~CompareWithUploadedFile.html) to compare a document in the vault with the uploaded file.

A file reference has no file name, so these methods take the file extension or file name as a separate parameter where needed.

## The checksum of the file

[FileUploadCommit](https://developer.m-files.com/APIs/COM-API/Reference/index.html#MFilesAPI~VaultObjectFileOperations~FileUploadCommit.html) requires the 16-byte MD5 checksum of the whole content. Calculate it from the exact bytes that were uploaded, while reading them for the upload, as in the samples above. The server stores it as the checksum of the file, which M-Files uses, for example, to find duplicate files.

Depending on where the vault stores its file data, the server may store the checksum without reading the content again to verify it. A wrong checksum stays with the file and can make later checksum verifications of the file fail.
{:.note.warning}

## Moving from upload IDs to file references

| Upload session (obsolete) | Stateless file upload |
|---|---|
| `UploadTemporaryFile` | `FileUploadWhole`, or `FileUploadBegin` + `FileUploadBlock` + `FileUploadEnd` |
| `UploadTemporaryFileBlockBegin`, `UploadFileBlockBegin` (and `_32bit`) | `FileUploadBegin` |
| `UploadTemporaryFileBlock`, `UploadFileBlock` (and `_32bit`) | `FileUploadBlock` (blocks by index, not by byte offset) |
| `UploadTemporaryFileCommit` (and `_32bit`) | `FileUploadEnd` |
| `UploadFileCommit`, `UploadFileCommitEx` (and `_32bit`, `_32bitEx`) | `FileUploadEnd` + `FileUploadCommit` (with the MD5 checksum of the content) |
| `CloseUploadSession` | Not needed: there is no session to close |
| `GetAutomaticMetadataForTemporaryFile(s)`, `GetAutomaticMetadata` with upload IDs | `GetAutomaticMetadataForUploadedFiles` |
| `CompareWithTemporaryFile` | `CompareWithUploadedFile` |
| Upload ID (`Long`) | File reference (`String`) |
