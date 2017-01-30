---
layout: page
title: Custom External Object Type Data Sources
---

## An Overview of External Object Types

M-Files uses "Object Types" to define the objects that will be managed, stored, and maintained within the M-Files vault.  Built-in object types include Documents and Document Collections, but object types such as Company, Contact, or Project can be created and customized depending upon the needs of the organization.

Each Object Type can be defined as Internal (created and managed within the M-Files clients), or External (typically managed within an external system).  External object types can either be read-only within the M-Files client, or can be defined as read/write, where objects created, changed, or deleted in the M-Files client can be pushed back to the originating system.

### Built-in support for External Object Types

By default, M-Files can be set to import objects from an external database using OLEDB.  This functionality allows M-Files to retrieve data from almost any database where an OLEDB driver is available (e.g. Microsoft SQL Server).  M-Files will automatically query the remote data source every 15 minutes to load new objects (known as a "quick refresh"), and will process updates (known as a "full refresh") once per day.

<p class="note">More information on connecting M-Files to external databases can be found in the <a href="http://www.m-files.com/user-guide/latest/eng/#Connection_to_external_database.html">user guide</a>.</p>

### Support for Custom External Object Types

Some systems, however, cannot be easily accessed using OLEDB.  These include legacy systems without OLEDB drivers, systems using custom structured data formats (e.g. NoSQL data sources), or web-based systems that only expose data via Web Services.  In these situations, developers can still expose the information to M-Files through the use of Custom External Object Type Data Sources.  This approach is used for some built-in M-Files integrations, such as the integration with Microsoft Dynamics CRM.

Custom External Object Type Data Providers are Microsoft .NET class libraries that are installed onto the server and handle the mapping of content from the data source into M-Files property definitions.  Custom External Object Type Data Providers can be read-only, or can support update/create functions.

### A quick note on Internal and External Object Ids

M-Files often uses the concept of "Object Ids".  The object id is an integer (whole number) and is guaranteed to be unique within a given object type.  When external object types are used, M-Files allows the id from that system to be shown on the metadata card instead.  This id is referred to either as the "Display ID" or the "External ID".  Each object still has an internal ID that must be used for normal API calls.

<p class="note">When mapping the "Object ID" in the Connection to External Database, ensure that you map a column which is a unique Id.  If this changes in the future, objects that have been associated with this item may become disconnected.</p>

### Full vs. quick refreshes

External database objects are refreshed on scheduled basis. You can change the default refresh intervals with registry settings and apply the changes by restarting the M-Files Server Service.  There are two types of refreshes: Full and Quick.

* Full refresh
A full refresh detects new objects, compares and updates existing objects, and processes deletions.  To give some comparative context, a full refresh of 120,000 items on a test system takes approximately 2 minutes.

* A quick refresh only detects new objects.  To give some comparative context, a quick refresh of 120,000 items on a test system takes approximately 7 seconds.

<p class="note">The default time intervals for refreshes can be altered using registry settings on the server.  More information on this is available in the <a href="https://partners.cloudvault.m-files.com/Default.aspx?#CE7643CB-C9BB-4536-8187-707DB78EAF2A/object/3AEC36EE-946C-4B0C-9DE2-8BF82DED3078/latest">Partner Portal</a>.</p>

From the perspective of a custom External Object Type Data Source, there is no difference between a full refresh and a quick refresh; the M-Files Server simply alters how it deals with the data which it is provided.

## The Scenario

We are building a vault for a small online retailer.  The retailer has a blog on their website which has posts and comments, which they wish to pull into M-Files to use for reporting and reference.  The blog itself is hosted externally and exposes information for Posts, Users and Comments via a JSON RESTful interface.

<p class="note">For our example we will use sample data from <a href="http://jsonplaceholder.typicode.com/">http://jsonplaceholder.typicode.com/</a>, although we will maintain this data in files on the computer so that we can test saving changes and adding new items.</p>

### The Vault Structure

A simple vault structure for the blog objects has already been agreed with the client, shown on the right.  The object types have been created as internal object types initially, to allow the structure to be simply prototyped:

IMAGE!!!

<p class="note">A sample vault containing the above is alongside this tutorial in the Multi-File Document.  Please note that the vault backup was created on M-Files 2015.3, and may not be restorable on previous versions.</p>

## Creating the Data Providers

### An Overview of the Process

To create a Custom External Object Type Data Source in M-Files, we will create a .NET class library using Visual Studio, and create some classes which implement the required interfaces.  This class library will be installed to the server, and a set of registry keys will be created that register the custom External Object Type Data Source with M-Files.

Once our class library is created and registered, we will update our Object Type definitions to use the new Data Source.

#### Interfaces and Base Classes

The `MFiles.Server.Extensions.dll` assembly defines a number of interfaces and base classes that are used when creating a custom Object Type Data Provider:

* `IDataSource`
Defines a data source that M-Files can communicate with.  The purpose of this data source is to read the settings from the object type configuration and to define the Data Source Connection which can provide items that match the criteria.  The primary class which implements this interface will be referenced by our installation script.
This class will be our entry point.
* `IDataSourceConnection`
Defines a connection to a data source that returns a set of objects to M-Files for a given Object Type.  Each Custom Object Type Data Provider may define multiple data source connections, one for each supported type of data they return.
* `IDataSourceConnection2`
Extends IDataSourceConnection, allowing partial result sets and deleted items to be retrieved.  Not shown in the context of this example.
* `IDataAlteration`
Defines a data source connection which can push changes (optionally new objects, modifications and/or deletions) back to the remote data source.
* `ReadOnlyDataSourceConnection`
A base class that implements `IDataSourceConnection` that can be used to provide read-only data to M-Files.
* `BasicDataSourceConnection`
A base class that implements `IDataSourceConnection` and `IDataAlteration` that can be used to provide read/write data to M-Files.

<p class="note">Whilst it is typical that each custom External Object Type Data Source has only one class that implements IDataSource, and one class that implements IDataSourceConnection, this is not mandatory.</p>

### Creating the Visual Studio Project

To create the Visual Studio Project, Click `File`, then `New`, then `Project`.  On the following screen, ensure that you select `.NET Framework 4` from the top dropdown, and select a project type of `Class Library`.  We will add further installer projects to the solution later.

IMAGE!!!

In the screenshot above, I've created a solution named `ExtOTDS.JsonPlaceholder`, with a project with the same name.  Once I click `OK`, Visual Studio will create a blank solution with a single class (`Class1.cs`).  We will remove this class at this point.

#### References

The interfaces we need to implement are contained within a DLL held within the M-Files installation.  To add a reference to this DLL, right-click on the project name and select `Add Reference`.  From the `Reference Manager` window, select `Browse` on the left, then click Browse at the bottom of the screen.  The DLL we need is named MFiles.Server.Extensions.dll and is held within the M-Files installation folder:

`C:\Program Files\M-Files\<Version>\Bin\anycpu\MFiles.Server.Extensions.dll`

#### Referencing our existing Data Repositories

For the purposes of this tutorial, we will have to create a means of accessing the data.  In a real-world scenario you would typically already have this via an API or web service end-point.  The full source code for the `JsonDataProvider` project is included with this document, or you can simply reference the compiled `JsonDataProvider.dll` file from your new project instead.

### Creating the Data Source

<p class="note">For the sake of brevity, the specific implementation required for our scenario is available within the downloadable content attached to this document.  The below information is not a complete code listing.</p>

You may implement `IDataSource` and `IDataSourceConnection` in the same object, if it makes development cleaner.  For clarity, in this sample we will separate the implementation of `IDataSource` from `IDataSourceConnection`.

#### Using IDataSource

Your class library must have at least one class that implements `IDataSource`, which will be the entry point.

```csharp
namespace MFiles.Server.Extensions
{
  public interface IDataSource
  {
    IDataSourceConnection OpenConnection(string connectionString, Guid configurationId);

    bool CanAlterData();
  }
}
```

M-Files will instantiate this class and call `OpenConnection()`.  This method returns an `IDataSourceConnection` - which may be the same object - to be used to retrieve the content.

This method is passed the string entered into the "OLE DB connection string" box on the "Connection to External Database" tab of the Object Type Properties.  You can use this to pass custom information into your class to allow you to connect to a remote resource, such as web service address or authentication credentials.

This class can also state whether the supplied `IDataSourceConnection` supports data alteration (creation of new objects, modification of existing ones, or deletion of items).

IMAGE!!!

#### Using IDataSourceConnection

Your class library must have at least one class that implements `IDataSourceConnection`.  This class is responsible for providing data back to M-Files.

```csharp
namespace MFiles.Server.Extensions
{
  public interface IDataSourceConnection
  {
    void PrepareForDataRetrieval(string selectStatement);

    void SetColumnsToRetrieve(int[] columnOrdinals);

    IEnumerable<ColumnDefinition> GetAvailableColumns();

    IEnumerable<DataItem> GetItems();

    bool CanGetOneItem();

    DataItem GetOneItem(int columnOrdinalExtID, string externalID);

    void CompletedDataRetrieval();

    void CloseConnection();

    void Interrupt();
  }
}
```

<p class="note">Whilst you can implement IDataSourceConnection yourself, you may instead want to derive from ReadOnlyDataSourceConnection or BasicDataSourceConnection instead.</p>

The most important methods to fully implement are `PrepareForDataRetrieval()`, `GetAvailableColumns()` and `GetItems()`.

`PrepareForDataRetrieval()` receives the "SELECT statement" from the Object Type Properties window and can parse it to decide what data needs to be loaded from the data source.

`GetAvailableColumns()` provides details to the "Columns" section within the ObjectType Properties window, allowing the user to choose a column for mapping.

`GetItems()` is called by the synchronization engine to retrieve objects to pull into M-Files.

### Deploying the Data Provider and updating M-Files

<p class="note">Editing the computer registry can cause significant harm to your computer.  Taking these steps must be done at your own risk.</p>

To register the custom Object Type Data Source, we must add a new key to the registry:

* Create a new Globally Unique Identifier (GUID).  This can be done in a number of ways, but the easiest is to use an online tool such as <a href="https://guidgenerator.com/">https://guidgenerator.com/</a>.
* Open the Registry Editor (regedit.exe) and locate the following key (note that you must change the GUID below to the one you just created):
`HKEY_LOCAL_MACHINE\SOFTWARE\Motive\M-Files\Common\Server\ExternalDataSources\{b13655c3-c5bb-4bde-ba8b-8d063a8508a4}`
* Create a string value for the name of the data source.  This is for your reference only:
  * Type: `REG_SZ`
  * Name: `Name`
  * Value: `Json Object Type Data Source`
•	Create a string value for the path to the DLL file.  In a development scenario this may be your project build path:
  * Type: `REG_SZ`
  * Name: `Path`
  * Value: `C:\temp\vs-projects\ExtOTDS.Json\ExtOTDS.Json\bin\Debug\ExtOTDS.Json.dll`
•	Create a string value for the name of the class to instantiate (the class that implements `IDataSource`).  Note that this must include the class namespace.
  * Type: `REG_SZ`
  * Name: `TypeName`
  * Value: `ExtOTDS.Json.DataSource`

The M-Files services do not need to be restarted.

#### Altering our Object Type definitions

Now our custom Object Type Data Source is built and registered, we need to update our Object Types to use them.  To do this, open the `M-Files Admin` tool and navigate to the object type you want to alter, right-click and go to `Properties`.

Firstly: uncheck the `Users can create objects of this type` from the `General` tab.  Objects will be loaded from our data source, so we don't want users to create new ones.  Next: go to the `Connection to External Database` tab and tick the `Use a connection to an external database` option at the top.  We can now enter a connection string, select statement, and we can start mapping columns.

In the "OLE DB connection string" box, enter the following text.  The GUID (between "{" and "}") is the GUID that we entered into the registry in the previous step, and is used to tie this screen to the DLL we have created.  Note that this full string is passed to IDataSource.OpenConnection, so your Object Type Data Source could choose to be passed additional settings here.  In the sample below, I am passing a custom parameter named "type" with a value of "user".

`M-Files Extension={b13655c3-c5bb-4bde-ba8b-8d063a8508a4};type=user`

In the "SELECT statement" box, we will enter the following text.  This string is parsed by `IDataSourceConnection.PrepareForDataRetrieval` and, again, could have multiple settings passed in at this point.  Our implementation does not require this, so the string "ignored" is entered (it could be anything).

When the `Refresh Columns` button is pressed, the `Columns` box should be populated with the columns that we returned from `IDataSourceConnection.GetAvailableColumns`. 

Repeat this process for all the object types that need to come from the JSON data (Comments, Posts and Users).

#### In a production scenario

There are many ways to distribute the DLL and associated registry keys to a production server, but the creation of a setup project may be simplest.  We will use the approach below to create a basic setup project that will install our DLL and create the required registry keys for us.

<p class="note">If you have not created setup projects on your machine before, you may have to download the InstallShield Limited Edition for Visual Studio package.  This can be done either by using the prompts within Visual Studio (New Project -> Other Project Types -> Setup and Deployment), or by going to <a href="http://go.microsoft.com/fwlink/?LinkID=239620&lang=1033&ver=pro">http://go.microsoft.com/fwlink/?LinkID=239620&lang=1033&ver=pro</a>.</p>

To create an installer:

* Right-click on the Solution node in the Solution Explorer window and select `Add`, then `New Project`.
* From within the pop-up window, select `Other Project Types` on the left, then `Setup and Deployment`, and select `InstallShield Limited Edition Project` in the central pane.
* Give the project a name (e.g. `Setup`) and click OK.
* Click `Application Information` at the bottom and complete the details for your organization and application.
* Click `Application Files` and choose to include your Project Output(s) in into the install directory.
* Click `Application Registry` and select `Yes at the top, as we want to configure the registry data.  Click `Registry` on the left, under `Other Places` to open the designer.
  * Using the `Destination computer's registry` window, create keys for the following under `HKEY_LOCAL_MACHINE\SOFTWARE (32-Bit)`:
`Motive\M-Files\Common\Server\ExternalDataSources\{b13655c3-c5bb-4bde-ba8b-8d063a8508a4}`
  * Within this key, create a string value named `Name`, with the name of your data source.
  * Within this key, create a string value named `TypeName` with the full type name (namespace and class name) of the class which implements `IDataSource`.
  * Within this key, create a string value named `Path`.  The value should be the string `[TARGETDIR]`, followed by the name of the DLL file you created, e.g. ` [TARGETDIR]ExtOTDS.Json.dll`.
  * Duplicate the above key and values for the `SOFTWARE (64-Bit)` section, so that the keys are created for both.

<p class="note">Note that the GUID shown above should match the one you will use when altering the Object Type Data Source; create a unique GUID for each data source you create.</p>

### Testing the Data Provider

M-Files will automatically start importing data from your data provider when the Object Type Properties window is closed.  To check that your data has been pulled through correctly, search the vault contents for the new object type data:

IMAGE!!!

<p class="note">If your data is not appearing properly, follow the guidance in the Debugging and notes section.</p>

## Debugging and Diagnostics

When an External Object Type Data Source fails to import data, the first you will often know is exceptions appearing in the Windows Event Log.  A good practice of exception handling and logging will help diagnose the root cause of these issues.

IMAGE!!!

In situations where the issue is harder to find, but repeatable, you may wish to manually launch a debugger when the exception is encountered using the following line of code:

```csharp
System.Diagnostics.Debugger.Launch();
```

Using this will throw the following dialog on the machine, and you can choose to attach to the application and debug.

IMAGE!!!

## Read/Write data providers

Whilst an immediate business concern is often to expose information from other systems into M-Files, there are good situations where changes within M-Files should be allowed and passed back to the source system.

To do this, we can choose to implement `IDataAlteration`, which provides us with a mechanism of processing those changes back into the source system.

By implementing `IDataAlteration`, you can specify whether your Object Type Data Source can process inserts (new items), deletions, or updates.  You can choose to support just one operation (e.g. updates, but not inserts or deletions), or any combination that make sense.

```csharp
namespace MFiles.Server.Extensions
{
  public interface IDataAlteration
  {
    bool CanUpdate();

    bool ValidateUpdateStatemet(string updateStatement, IList<ColumnDefinition> updatedColumns);

    void UpdateItem(string updateStatement, string extid, IList<ColumnValue> values, IList<ColumnValue> previousValues);

    bool CanInsert();

    bool CanReturnIdOnInsert();

    bool ValidateInsertStatemet(string insertStatement, IList<ColumnDefinition> insertedColumns);

    string InsertItem(string insertStatement, IList<ColumnValue> values);

    bool CanDelete();

    bool ValidateDeleteStatemet(string deleteStatement, ColumnDefinition extidColumn);

    void DeleteItem(string deleteStatement, ColumnValue extid);
  }
}
```

<p class="note">In the sample code we inherit from BasicDataSourceConnection and then override the relevant methods, rather than implementing IDataAlteration directly.</p>

### Processing new items (inserts)

To process new items, you need to implement (or override, if you're using the `BasicDataSourceConnection` base object) the following methods:

* `CanInsert()`
Should return true if your data source supports the creation of new items.
* `CanReturnIdOnInsert()`
Should return true if your data source will return the new Id of the item from the InsertItem method call.
* `ValidateInsertStatemet()`
Should confirm the insert statement is valid for the given column mappings.
Note the misspelling of "Statement" in the method signature.
* `InsertItem()`
Inserts the item and returns the new Id of the item.

Once your methods have been implemented, re-install the DLL (if needed) and update the Object Type Properties window:

* Ensure that you tick the `Users can create objects of this type` checkbox on the `General` tab.
* Go to the `Connection to External Database` tab, and:
  * Check the `Insert` checkbox next to each property that can be inserted into your data source.
  * Ensure that an `INSERT INTO` statement is filled in, even if your Object Type Data Source does not require one (note in the screenshot that "ignored" has been entered).

IMAGE!!!

Note that even in implementations that do not require an `INSERT INTO statement` to function (e.g. when the data is parsed directly from the column mappings), the `M-Files Object Type Properties` window requires that one is filled in to proceed.  In this scenario, any content can be entered providing it passes the call to ValidateInsertStatemet.

Log into the vault using the client and test creating an item using the metadata card.  New items should automatically be pushed into the remote data source on save, and be updated with their Id in that data source.

<p class="note">If you encounter exceptions when creating new items, follow the steps in the Debugging and Diagnostics section.</p>

### Processing deletions

To process deletions, you need to implement (or override, if you're using the `BasicDataSourceConnection` base object) the following methods:

* `CanDelete()`
Should return true if your data source supports deletion of items.
* `ValidateDeleteStatemet()`
Should confirm the delete statement is valid for the given column mappings.
Note the misspelling of "Statement" in the method signature.
* `DeleteItem()`
Deletes the item from the data source.
Once your methods have been implemented, re-install the DLL (if needed) and update the `Object Type Properties` window:
* Go to the `Connection to External Database` tab, and:
  * Ensure that a `DELETE` statement is filled in, even if your Object Type Data Source does not require one (note in the screenshot that "ignored" has been entered).

<p class="note">Note that even in implementations that do not require a `DELETE statement` to function (e.g. when the data is parsed directly from the column mappings), the M-Files Object Type Properties window requires that one is filled in to proceed.  In this scenario, any content can be entered providing it passes the call to `ValidateDeleteStatemet`.</p>

IMAGE!!!

Log in to the vault and delete an existing item.  Deletions should be pushed immediately to the remote source.

<p class="note">Note that only a deletion is required to remove the item from the remote source; items do not need to be permanently destroyed.</p>

<p class="note">If you encounter exceptions when creating deleting items, follow the steps in the Debugging and Diagnostics section.</p>

### Processing updates

To process updates, you need to implement (or override, if you're using the 1BasicDataSourceConnection1 base object) the following methods:

* `CanUpdate()`
Should return true if your data source supports updates of items.
* `ValidateUpdateStatemet()`
Should confirm the update statement is valid for the given column mappings.
Note the misspelling of "Statement" in the method signature.
* `UpdateItem()`
Updates the item in the data source.

Once your methods have been implemented, re-install the DLL (if needed) and update the `Object Type Properties` window:

* Go to the `Connection to External Database` tab, and:
  * Check the `Update` checkbox next to each property that can be updated in your data source.
  * Ensure that an `UPDATE statement` is filled in, even if your Object Type Data Source does not require one (note in the screenshot that "ignored" has been entered).

Note that even in implementations that do not require an `UPDATE statement` to function (e.g. when the data is parsed directly from the column mappings), the `M-Files Object Type Properties` window requires that one is filled in to proceed.  In this scenario, any content can be entered providing it passes the call to `ValidateUpdateStatemet`.

Log in to the vault and update an existing item.  Updates should be pushed immediately to the remote source.

<p class="note">If you encounter exceptions when updating items, follow the steps in the Debugging and Diagnostics section.</p>





