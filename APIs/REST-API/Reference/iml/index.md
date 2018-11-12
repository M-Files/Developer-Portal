---
layout: mfws
title: Intelligent Metadata Layer
includeInSearch: true
minimumVersion: 12.0.6400.37
---

# Intelligent Metadata Layer

The M-Files [Intelligent Metadata Layer](https://www.m-files.com/en/intelligent-metadata-layer-ecm) is an industry-leading concept, available for M-Files 2018 upwards, that allows businesses to intelligently manage information regardless of in which ECM system or silo it originates.

The Intelligent Metadata Layer currently consists of two sets of functionality:

* **Intelligence Services** provide functionality to suggest metadata property values for documents in M-Files, aiding the speed and accuracy with which objects can be added to M-Files with the correct metadata.  Partners can [build their own intelligence services](https://developer.m-files.com/Intelligent-Metadata-Layer/Intelligence-Services/Visual-Studio/) to provide custom intelligence functionality, either for their customers or to sell via our [Certified Application Partner](https://www.m-files.com/en/cap) program.

* **External Repository Connectors** allow businesses to expose information held in other systems (such as network file shares) into M-Files.  Information can be optionally "promoted" by providing it with metadata information, at which point the object can take part in M-Files functionality such as workflows, views, notifications and the like.  The file information continues to reside in the remote system.  Partners can [build their own external repository connectors](https://developer.m-files.com/Intelligent-Metadata-Layer/External-Repository-Connectors/Visual-Studio/) to integrate into other repositories, either for their customers or to sell via our [Certified Application Partner](https://www.m-files.com/en/cap) program.

# Using Intelligent Metadata Layer functionality via the REST API

## Intelligence Services

Intelligence Services can be invoked - and their suggestions collated - by [executing a POST request to /REST/objects/automaticmetadata]({{ site.baseurl }}/APIs/REST-API/Reference/resources/objects/automaticmetadata/).  The HTTP request body should contain a JSON-serialized [AutomaticMetadataRequestInfo]({{ site.baseurl }}/APIs/REST-API/Reference/structs/automaticmetadatarequestinfo/) object, and the response body will contain an array of JSON-serialized [PropertyValueSuggestion]({{ site.baseurl }}/APIs/REST-API/Reference/structs/propertyvaluesuggestion/)s.

Metadata suggestions can be provided in the following scenarios:

* **For existing objects in M-Files**
	* Ensure that `AutomaticMetadataRequestInfo.ObjVer` contains information about the object version to query.
	* Ensure that `AutomaticMetadataRequestInfo.ObjectType` is populated with the object type you wish to create (e.g. 0 for documents).

* **For one or more files that have been uploaded, but where the object has not yet been created**
	* Ensure that `AutomaticMetadataRequestInfo.UploadIds` contains the ids returned from a call to [/REST/files]({{ site.baseurl }}/APIs/REST-API/Reference/resources/files/).
	* Ensure that `AutomaticMetadataRequestInfo.ObjectType` is populated with the object type you wish to create (e.g. 0 for documents).

## External Repository Connectors

External views and unmanaged content are not returned, by default, by the M-Files REST API.  This is to aid legacy compatibility, as these new types of content require additional logic to process and handle.

### Enabling External Repository Connector functionality

To ensure that external views and unmanaged content are returned, the `X-Extensions` header must be provided during the call to [retrieve an authentication token]({{ site.baseurl }}/APIs/REST-API/Reference/resources/server/authenticationtokens/).  The `X-Extensions` header must have a value of `IML`.

If this header is not included on the call to retrieve an authentication token then external content will not be returned by the REST API.
{:.remark}

### External view folders content type

Once IML functionality is enabled, querying for view contents may start to return [external view folders]({{ site.baseurl }}/APIs/REST-API/Reference/enumerations/mffoldercontentitemtype/), and searches may return unmanaged objects.  This is most often seen when querying the root/home of the vault, as any external repository connections are listed here.

### Navigating external view folders

After [enabling external repository connector functionality](#enabling-external-repository-connector-functionality), retrieving [items from the vault root]({{ site.baseurl }}/APIs/REST-API/Reference/resources/views/path/items/) (a GET request to `/REST/views/items`) will return [external view folders]({{ site.baseurl }}/APIs/REST-API/Reference/enumerations/mffoldercontentitemtype/) for any configured vault external repository connections, in the same way that the M-Files Desktop Client does.

To retrieve items from within an external view folder, a request must be made to [/REST/views/(path)/items]({{ site.baseurl }}/APIs/REST-API/Reference/resources/views/path/items/) including the external view folder path encoded as shown on the [encoding syntax page]({{ site.baseurl }}/APIs/REST-API/Reference/syntax/#sect%3aviewpath).

For example, for an external view folder in a repository with `ExternalRepositoryName` of `myrepository` and an external view ID of `1234`, the request would be of the format:

```text
http://myfiles.mycompany.com/REST/views/umyrepository%3A1234/items
```

If the above view folder had a sub-folder with ID `5678` then the request would be of the format:

```text
http://myfiles.mycompany.com/REST/views/umyrepository%3A1234/umyrepository%3A5678/items
```

If the external repository connection uses personal authentication then the above endpoint(s) may return a `403` HTTP status.  This happens when the user has not already authenticated to the repository, or if their authentication is no longer valid.  The user must [log into the repository]({{ site.baseurl }}/APIs/REST-API/Reference/resources/repositories/session/) before this connection can be used.
{:.remark}

### External object repository object versions

Once IML functionality is enabled, querying for view contents or performing searches may return external objects.  External objects can be identified as their [ObjVer]({{ site.baseurl }}/APIs/REST-API/Reference/structs/objver/) will contain populated `ExternalRepositoryName`, `ExternalRepositoryObjectID` and `ExternalRepositoryObjectVersionID` properties.

Note that objects from external repositories may be `unmanaged` or `managed`.  Unmanaged objects have not been `promoted`, do not have an internal M-Files ID (`ObjID.ID`) assigned, and will not contain extended metadata.  Managed objects have been promoted are assigned an internal M-Files ID (alongside external repository information), and will contain other metadata such as the object's class.

### Retrieving properties of objects from external repositories

The [object version properties]({{ site.baseurl }}/APIs/REST-API/Reference/resources/objects/type/objectid/version/properties/) endpoint supports both managed and unmanaged objects.

For an unmanaged document with an `ExternalRepositoryName` of `myrepository`, an `ExternalRepositoryObjectID` of `123456` and `ExternalRepositoryObjectVersionID` of `version1`, the request would be of the format:

```text
http://myfiles.mycompany.com/REST/objects/0/umyrepository%3A123456/uversion1/properties
```

Note that for unmanaged objects the amount of metadata returned will be limited.
{:.remark}

### Promoting unmanaged objects

To promote an object (to convert it from an unmanaged to a managed object), execute a `PUT` request to the [setting properties on multiple objects endpoint]({{ site.baseurl }}/APIs/REST-API/Reference/resources/objects/setmultipleobjproperties/).

The properties for the new object must include, at a minimum, the object class (built-in property definition with ID 100), and all mandatory properties for that class.
{:.remark}

### Demoting managed objects

If an object has previously been promoted from an external system and is no longer required to be managed by M-Files (e.g. it was promoted by mistake) then the metadata held against that object can be removed by [demoting the objects]({{ site.baseurl }}/APIs/REST-API/Reference/resources/objects/demoting-objects/).

### Object operations supporting external objects

The following endpoints can be used to retrieve information for unmanaged objects (i.e. objects residing in external systems which have not yet been promoted).

* [Retrieval of object version properties]({{ site.baseurl }}/APIs/REST-API/Reference/resources/objects/type/objectid/version/properties/)
* [Checking objects in and out]({{ site.baseurl }}/APIs/REST-API/Reference/resources/objects/type/objectid/version/checkedout/)
* [Reading the object tile (and renaming it)]({{ site.baseurl }}/APIs/REST-API/Reference/resources/objects/type/objectid/version/title/)
* [Object file download (and replacing file contents)]({{ site.baseurl }}/APIs/REST-API/Reference/resources/objects/type/objectid/version/files/file/content/)
* [Delete / Undelete]({{ site.baseurl }}/APIs/REST-API/Reference/resources/objects/type/objectid/deleted/)

When dealing with umanaged objects, M-Files attempts to perform the requested function directly against the external repository.  Depending upon the repository, and support of the connector, these functions may fail.
{:.remark}
