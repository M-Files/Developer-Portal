---
layout: page
title: UI Components
includeInSearch: true
---

## Tabs

![Tabs](UI-components-tabs.png){:.borderless}

Located in top pane, `Tabs` provide direct access to views and functions. A tooltip with description of each tab's function will be shown when the user hovers the mouseover each tab.  

Tab layout is controlled through tab groups. Each tab group has a minimum number for visible tabs. When horizontal space is insufficient to show all the tabs inside a group, the hidden tabs will be collapsed under an expandable menu indicated by a "triangle" icon.  Currently, the two tab groups are "Vault Navigation" and "Details and Operations":

### Vault Navigation

The `Vault Navigation` tab group contains tabs to navigate to the vault `Home` view, and common views such as `Recently Accessed by Me`, `Assigned to Me`, and `Favourites`.

### Details and Operations

The `Details and Opeations` tab group contains tabs to view the selected object's metadata, to preview a selected file, or to search for objects.

Third party tabs created using the [User Interface Extensibility Framework]({{ site.baseurl }}/Frameworks/User-Interface-Extensibility-Framework/) are located in the "Details and Operations" tab group.
{:.note}

{: .secondary}
**Style and layout parameters:**  
Tab-cell-size: 64px  
Background-color (inactive): #b3b3b3  
Background-color (active): # e6e6e6  
Margin: 4px  
Icon size: 32px  
Icon-color (Inactive): #ffffff  
Icon-color (active): # 999999  
Font-size: 11px  
Font-color: #555555  


## Lists

![Lists](UI-components-lists.png){:.borderless}

A `List` is the typical method for displaying a collection of multiple items such as views or objects. Lists are mostly located within the [Listing Area]({{ site.baseurl }}/UX-Design/Page-Layout/#listing-area).

{: .secondary}
**Style and layout parameters:**  
Row-height: 27px  
Font-color (heading): #808080  
Font-size (heading): 14px  
Padding-left (heading): 20px:  
Font-color (listing): #000000  
Font-size (listing): 12px  
Padding-left (listing): 8px:  
Icon-size: 16px  

### List grouping header
![List grouping](UI-components-list-grouping.png){:.borderless}

A `List Grouping` can be used to organize listed objects, grouping them by object type or a specific metadata property. The grouping appears as a header component with textual title and expanding/collapsing control on right side.  

{: .secondary}
**Style and layout parameters:**  
Background-color: #fafafa  
Height: 27px  
Font-color: #5a5a5a  
Font-size: 13px  

## Search 

Search function in M-Files is hosted by `Search bar`, and enhanced by `Search filters` and `Advanced search options`.  

### Search bar

Right above the Listing area, a `Search Bar` with search field, search button and access to `Advances search options` can be found.  

![search bar](UI-components-search-bar.png){:.borderless}

#### Search filter

`Search Filters` tab will be activated when search field is focused.  User will found options to enhance the search function before or after search is performed.  

![search filters](UI-components-search-filters.png){:.borderless}

##### Advanced search options

`Advanced search options` will be toggled on or off by clicking on the right most icon of the Search bar.  

![search advanced options](UI-components-search-adv-options.png){:.borderless}

## Dialogs 

Example of a common `Dialog` in M-Files that consists a title, an icon, a dialog message and a button group.  

![dialogs](UI-components-dialogs.png){:.borderless}

## Menus

Here is an example of a context menu activated by right-click on an object which provides corresponding functions.  

![menus](UI-components-menus.png){:.borderless}

Context menu items can be added using the [User Interface Extensibility Framework]({{ site.baseurl }}/Frameworks/User-Interface-Extensibility-Framework/).
 
## Metadata card 

`Metadata Card` is dedicated for displaying and editing Metadata for object classification and basic properties of selected object(s). User also can access object related functions from `Function Ribbon`.  

![Metadata forms](UI-components-metadataforms.png){:.borderless}

### Function Ribbon 

By using function buttons on the ribbon, user are able to Follow, Pin, or add an object to their Favorites list. With the M-Files 2018 release, we also introduced the `Analyze` button. Clicking this button will execute any registered [Intelligence Services](https://www.m-files.com/user-guide/latest/eng/intelligence_services.html) for the document, and show any additional metadata suggestions on the metadata card.

![Metadata forms](UI-components-function-ribbon.png){:.borderless}