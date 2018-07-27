---
layout: mfws
title: Intelligent Metadata Layer
includeInSearch: true
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

Once IML functionality is enabled, querying for view contents may start to return [external view folders]({{ site.baseurl }}/APIs/REST-API/Reference/enumerations/mffoldercontentitemtype/).  This is most often seen when querying the root/home of the vault, as any external repository connections are listed here.

### Navigating external view folders

### External object versions

Once IML functionality is enabled, querying for view contents or performing searches may return external objects.  External objects can be identified as their [ObjVer]({{ site.baseurl }}/APIs/REST-API/Reference/structs/objver/) will contain populated `ExternalRepositoryName`, `ExternalRepositoryObjectID` and `ExternalRepositoryObjectVersionID` properties.

Note that external objects may be `unmanaged` or `managed`.  Unmanaged objects have not been `promoted`, do not have an internal M-Files ID (`ObjID.ID`) assigned, and will not contain extended metadata.  Managed objects have been promoted are assigned an internal M-Files ID (alongside external repository information), and will contain other metadata such as the object's class.

### Retrieving properties of external objects

### Promoting unmanaged objects



### Demoting managed objects

If an object has previously been promoted from an external system and is no longer required to be managed by M-Files (e.g. it was promoted by mistake) then the metadata held against that object can be removed by [demoting the objects]({{ site.baseurl }}/APIs/REST-API/Reference/resources/objects/demoting-objects/).

### Object operations supporting external objects

The following endpoints can be used to retrieve information for unmanaged objects (i.e. objects residing in external systems which have not yet been promoted).

* [Object version properties]({{ site.baseurl }}/APIs/REST-API/Reference/resources/objects/type/objectid/version/properties/)
* [Object checkout status]({{ site.baseurl }}/APIs/REST-API/Reference/resources/objects/type/objectid/version/checkedout/)
* [Object title]({{ site.baseurl }}/APIs/REST-API/Reference/resources/objects/type/objectid/version/title/)
* Object file download
* Favourite
* Delete / Undelete
