---
layout: page
title: Page layout
includeInSearch: true
---

![Top Pane location](2018-layout.png){:.borderless .clear}

## Layout areas

The M-Files 2018 Desktop client layout includes three general layout areas:

* The [Top Pane](#top-pane) holds essential features that are needed all the time, such as structured navigation and vault- and user-operations.
* The [Listing Area](#listing-area) occupies the left half below the [Top Pane](#top-pane).  The listing area shows access to content as the user navigates the vault structure.
* The [Right Pane](#right-pane) is at final level of the navigation, it contains the metadata and object-operations for selected object(s).

There are also sub-areas as the [Bottom Pane](#bottom-pane) and the [Task Pane](#task-pane), which are explained further below.

### Top Pane

![Top Pane location](Page-layout-toppane.png){:.borderless .leftcol}

{:.rightcol}
The `Top Pane` is a full-width header located above the content areas of the application. It hosts most of the navigation function groups:

{:.rightcol}
* M-File logo with link to home and navigation arrows
* A [breadcrumb]({{ site.baseurl }}/UX-Design/Navigation-patterns/#breadcrumb) shows current location
* Create function and vault main navigation tabs
* Object related tabs and search filters
* The account panel (to log out, to alter notification settings, and to log in/out of external repositories)
* The [Pinned tab](http://localhost:4000/UX-Design/Page-Layout/#pinned)

{:.rightcol}
**Style and layout parameters:**   
Background-color: #318ccc  
Padding: 12px 0px 0px 0px  
Logo-size: 128x32px  
Font-size (Breadcrumb : flexible): 10px, 12px  
Font-color: #ffffff  
Navigation-arrow-size: 32px  
Indication-icon-size: 16px  

### Listing Area

![Listing Area location](Page-layout-listingarea.png){:.borderless .leftcol}

{:.rightcol}
The `Listing Area` occupies the left half of the application underneath the [Top Pane](#top-pane). It lists all views, files and other objects when navigating views or searching. In most of cases, it will also have a search bar above content listing.  Sometimes, it can also host multiple listings, for example the [tiling on the home view](#tiling).

{:.rightcol}
**Style and layout parameters:**   
Background-color: #318ccc  
Margin: 0px 0px 10px 0px  
Background-color (listing area): #fafafa  

#### Bottom Pane
{:.rightcol}

![Bottom pane location](Page-layout-listinarea-bottompane.png){:.borderless .leftcol}

{:.rightcol}
The `Bottom Pane` actually is a sub area within the [Listing Area](#listing-area). It provides an alternate location for content to be shown, e.g. the [selected object's metadata](#metadata-form). It may also contain elements such as the multiple-vault search. Additionally, the contents of the bottom can be customised using the [User Interface Extensibility Framework]({{ site.baseurl }}/Frameworks/User-Interface-Extensibility-Framework/Dashboards/#replacing-the-right-or-bottom-panes).

{:.rightcol}
**Style and layout parameters:**   
Background-color: #318ccc  
Margin: 0px 6px 10px 0px  

### Right Pane

![Right Pane location](Page-layout-rightpane.png){:.borderless .leftcol}

{:.rightcol}
The `Right Pane` plays an important role in offering detailed control options over object properties, previews, search and personalization. Its contents switch contextually according to the selected object or current function. Additionally, the contents of the right pane can be customised using the [User Interface Extensibility Framework]({{ site.baseurl }}/Frameworks/User-Interface-Extensibility-Framework/Dashboards/#within-a-custom-tab) to show additional tabs of content. 

{:.rightcol}
**Style and layout parameters:**   
Background-color: #318ccc  
Margin: 0px 10px 10px 0px  

#### Header
{:.rightcol}

![Right Pane Header location](Page-layout-rightpane-header.png){:.borderless .leftcol}

{:.rightcol}
The `Right Pane Header` is the top most part inside the [Right Pane](#right-pane). Often it is used to show the vital information of the selected item, such as the object ID, version, and checkout information.

{:.rightcol}
**Style and layout parameters:**   
Background-color: #f2f2f2  
Padding: 10px 10px 0px 10px  
Height: 130px  
Font-color: #666666  
Font-size (heading):  22px  
Font-size (subheading): 14px  
Font-size (italic): 12px  

#### Object Tools Ribbon
{:.rightcol}

![Tools ribbon location](Page-layout-rightpane-ribbon.png){:.borderless .leftcol}

{:.rightcol}
The `Right Pane Object Tools Ribbon` collects shows buttons to execute common object-specific functions, such as following the object, or to add it to your pinboard or favorites.

{:.rightcol}
**Style and layout parameters:**   
Background-color: #318ccc  
Padding: 4px 6px 4px 14px  
Height: 32px  
Icons-size: 24px  
Font-color: #ffffff  

#### Metadata Form
{:.rightcol}

![Metadata form location](Page-layout-rightpane-metadataform.png){:.borderless .leftcol}

{:.rightcol}
The `Metadata Form` displays the properties of the selected object.  Depending on your access rights, you may also be able to edit some of the properties.  The layout is largely driven by the class of the selected object, but can be customised using [Metadata Card Configuration rules]({{ site.baseurl }}/Built-In/Metadata-Card-Configuration/).

{:.rightcol}
**Style and layout parameters:**   
Background-color: #fafafa  
Padding: 20px 8px 0px 0px  
Font-size: 13px  
Font-color: #999999, #5a5a5a, #1a1a1a  
Font-color (link): #0069dd  
Row height: 26px  

#### Pinned
{:.rightcol}

![Pinned location](Page-layout-rightpane-pinned.png){:.borderless .leftcol}

{:.rightcol}
The `Pinned` tab is the final tab in the [Top Pane](#top-pane), shown on the far right of the screen. Clicking the `Pinned` tab replaces the [Right Pane](#right-pane) with a pinboard, where users can create a personal collection of links to objects and views.  The contents of the pinboard are also available using the M-Files mobile applications. 

{:.rightcol}
**Style and layout parameters:**   
Background-color: #f2f2f2  
Padding: 4px  
Font-color: #666666  
Font-size: 13px  
Cell-size: 96px  
Cell-icon-size: 32px  
Cell-margin: 4px  
Cell-background-color* : #cfcfcf, # d4cfbf, # b1dee3, # bce3c0, #eddfb9, #bab4a9, #9dc2cc  

##### Color-codings for Pinned item categories 

![Colo-coding for Pinned item](Page-layout-rightpane-pinned-colors.png){:.borderless}  

### Task Pane  

![Task Pane location](Page-layout-taskpane.png){:.borderless .leftcol}

{:.rightcol}
The `Task Pane`, now defaulting to hidden in M-Files 2018, was previously be the place where all quick shortcuts were collected. The `Task Pane` can be collapsed and expanded by clicking of the handle on its right side. The task pane is kept for backwards compatibility.

{:.rightcol}
**Style and layout parameters:**   
Background-color: #d9d9d9  
Width: 156px  
Font-color: #ffffff  
Font-color (mouseover): #ffffff  
Font-size: 13px  
Font-size (Group header): 14px  
Cell-icon-size: 16px  
Cell-padding: 5px 10px  
Cell-margin: 0px 0px 0px 2px  
Cell-background-color: #989898  
Cell-background-color (mouseover): #aebfc9  
Cell-background-color (Group header): #b3b3b3  

## Layout Controls  

### Expanding/collapsing control  

Some panels have more flexibility with their layout. For example: both the [Right  Pane](#right-pane) and [Task Pane](#task-pane) can be collapsed to make additional space on the screen. This can be done by clicking the "handle" in the middle of the layout divider. Clicking the handle again will toggle the panel back to its original size.  

##### Collapsing in action for Right pane  

![Collapsing the Right Pane](Page-layout-control-divider-rightpane.png){:.borderless}

##### Expanding action for Task pane  

![Expanding the Task Pane](Page-layout-control-divider-taskpane.png){:.borderless}

![Style information for the Task Pane handle](Page-layout-control-divider-parameter.png){:.borderless .leftcol}

{:.rightcol}
**Style and layout parameters:**   
Background-color: #318ccc  
Width: 8px  
Border-width (divider line): 4px  
Border-color (divider line): # 8fabcc  
Handle-width: 8px  
Handle-color: # bac9db  
Handle-height: 100px  

### Tiling

![tile layout ](Page-layout-control-tiles.png){:.borderless .leftcol}

{:.rightcol}
In the `Home` view, the [Listing Area](#listing-area) is split into multiple "tiles"  in order to make more views accessible at same time.  These tiles include `Browse` (to navigate internal and external views), `Assigned to me`, `Recently Accessed by Me`, and `Checked Out to Me`.  The pinboard appears to the right of the tiled area.


