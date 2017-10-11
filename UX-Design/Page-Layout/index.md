---
layout: page
title: Page layout
includeInSearch: true
---

M-Files 2018 Desktop client layout design is a visual flow based on navigation hierarchy. From top to down, M-Files, vaults, views and objects. From each level, corresponding operations are in place and can be accessed accordingly.

![Top pane location](2018-layout.png){:.borderless .clear}

## Layout areas

M-Files 2018 Desktop client layout include three general areas by their functionalities.
* Top Pane holds essential features that are needed all the time, such as structured navigation and vault level and user operations.
* Listing area occupies the left half below Top pane.  As described with its name, it provides access to the index of the desired contents.
* Right pane is at final level of the navigation, it contains the detailed cover information and object-level operations for selected file.
There are also sub-areas as bottom pane and task pane, and layout control behaviors inside and in between areas, which are explained below.

### Top pane
{:.layout-section}

![Top pane location](Page-layout-toppane.png){:.borderless .leftcol}

{:.rightcol}
Top pane is a full-width header locate above the content areas of the application. It hosts most of the navigation function groups:

{:.rightcol}
* M-File logo with link to home and navigation arrows
* A Breadcrumb shows current location
* Create function and vault main navigation tabs
* Object related taps and search filters
* Indication and account panel 
* Pinned tab

{:.rightcol}
Style and layout parameters:  
Background-color: #318ccc  
Padding: 12px 0px 0px 0px  
Logo-size: 128x32px  
Font-size (Breadcrumb : flexible): 10px, 12px  
Font-color: #ffffff  
Navigation-arrow-size: 32px  
Indication-icon-size: 16px  

### Listing area
{:.layout-section}

![Listing area location](Page-layout-listingarea.png){:.borderless .leftcol}

{:.rightcol}
Listing area occupies left half of the application besides top pane and right pane. It lists all the file candidates upon browse navigation or search function. In most of cases, it will also have a search bar above content listing.
Sometime, it can also host multiple listing by micro layout, for example tiling.

{:.rightcol}
Style and layout parameters:  
Background-color: #318ccc  
Margin: 0px 0px 10px 0px  
Background-color (listing area): #fafafa  

![Bottom pane location](Page-layout-listinarea-bottompane.png){:.borderless .leftcol}

#### Bottom pane
{:.layout-section .rightcol}

{:.rightcol}
Bottom pane actually is a sub area within listing area. It provides an alter location for some contents to be shown simultaneously, especially for user with large display. For example, Metadata/property. More often, it attaches controls that are related with listing above. For example multiple vault search.

{:.rightcol}
Style and layout parameters:  
Background-color: #318ccc  
Margin: 0px 6px 10px 0px  

### Right pane
{:.layout-section}

![Right pane location](Page-layout-rightpane.png){:.borderless .leftcol}

{:.rightcol}
Right pane plays an important row in offering detailed control options over object properties, previews, search and personalization. Its contents switch contextually according to the selected object or current function. Furthermore, it can be switched manually with tabs above it inside top pane. 

{:.rightcol}
Style and layout parameters:  
Background-color: #318ccc  
Margin: 0px 10px 10px 0px  

![Right pane header location](Page-layout-rightpane-header.png){:.borderless .leftcol}

#### Header
{:.layout-section .rightcol}

{:.rightcol}
Header is the top most part inside right pane. Often it is used to show the vital information of the content.

{:.rightcol}
Style and layout parameters:  
Background-color: #f2f2f2  
Padding: 10px 10px 0px 10px  
Height: 130px  
Font-color: #666666  
Font-size (heading):  22px  
Font-size (subheading): 14px  
Font-size (italic): 12px  

![Tools ribbon location](Page-layout-rightpane-ribbon.png){:.borderless .leftcol}

#### Object tools ribbon
{:.layout-section .rightcol}

{:.rightcol}
Tools ribbon collects function buttons related with specific selection of the object or function.

{:.rightcol}
Style and layout parameters:  
Background-color: #318ccc  
Padding: 4px 6px 4px 14px  
Height: 32px  
Icons-size: 24px  
Font-color: #ffffff  

![Metadata form location](Page-layout-rightpane-metadataform.png){:.borderless .leftcol}

#### Metadata form
{:.layout-section .rightcol}

{:.rightcol}
Metadata form is the place where you can view or even change properties of the selected object or functions.

{:.rightcol}
Style and layout parameters:  
Background-color: #fafafa  
Padding: 20px 8px 0px 0px  
Font-size: 13px  
Font-color: #999999, #5a5a5a, #1a1a1a  
Font-color (link): #0069dd  
Row height: 26px  

![Pinned location](Page-layout-rightpane-pinned.png){:.borderless .leftcol}

#### Pinned
{:.layout-section .rightcol}

{:.rightcol}
Pinned is the last tab from top pane, it shares the area with right pane. It is a place where user can collect all kinds of object and links, and personalize at certain extend. 

{:.rightcol}
Style and layout parameters:  
Background-color: #f2f2f2  
Padding: 4px  
Font-color: #666666  
Font-size: 13px  
Cell-size: 96px  
Cell-icon-size: 32px  
Cell-margin: 4px  
Cell-background-color* : #cfcfcf, # d4cfbf, # b1dee3, # bce3c0, #eddfb9, #bab4a9, #9dc2cc  

##### Color-codings for Pinned item categories  
{:.layout-section}

![Colo-coding for Pinned item](Page-layout-rightpane-pinned-colors.png){:.borderless}  

### Task pane  
{:.layout-section}

![Task pane location](Page-layout-taskpane.png){:.borderless .leftcol}

{:.rightcol}
Task pane use to be the place where all quick shortcuts being collected. Its preservation is reasoning in backward compatibility. Task pane can be collapsed and expanded by clicking of the handle on its right side.

{:.rightcol}
Style and layout parameters:
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

## Layout controls  

### Expanding/collapsing control  

Some panels have more flexibility with their layout. Explicitly, right pane and task pane can be collapse to make room for other views. This can be done by clicking the "handle" in the middle of the layout divider. Click once more to expand back.  

##### Collapsing in action for Right pane  

![Collapsing right pane](Page-layout-control-divider-rightpane.png){:.borderless}

##### Expanding action for Task pane  

![Expand task pane](Page-layout-control-divider-taskpane.png){:.borderless}



