---
layout: page
title: Page layout
includeInSearch: true
---

M-Files 2018 Desktop client layout design is a visual flow based on navigation hierarchy. From top to down, M-Files, vaults, views and objects. From each level, corresponding operations are in place and can be accessed accordingly.

<img class="floatleft borderless" src="2018-layout.png" alt="Top pane location" />

  
<br class="clear" />

### Layout areas

M-Files 2018 Desktop client layout include three general areas by their functionalities.
* Top Pane holds essential features that are needed all the time, such as structured navigation and vault level and user operations.
* Listing area occupies the left half below Top pane.  As described with its name, it provides access to the index of the desired contents.
* Right pane is at final level of the navigation, it contains the detailed cover information and object-level operations for selected file.
There are also sub-areas as bottom pane and task pane, and layout control behaviors inside and in between areas, which are explained below.

<br class="clear" />
#### Top pane

<img class="floatleft borderless" src="Page-layout-toppane.png" alt="Top pane location" />
<span class="flex">
Top pane is a full-width header locate above the content areas of the application. It hosts most of the navigation function groups:
<br />
<br />* M-File logo with link to home and navigation arrows
<br />* A Breadcrumb shows current location
<br />* Create function and vault main navigation tabs
<br />* Object related taps and search filters
<br />* Indication and account panel 
<br />* Pinned tab
<br /><br />
Style and layout parameters:  
Background-color: #318ccc  
Padding: 12px 0px 0px 0px  
Logo-size: 128x32px  
Font-size (Breadcrumb : flexible): 10px, 12px  
Font-color: #ffffff  
Navigation-arrow-size: 32px  
Indication-icon-size: 16px  
</span>

<br class="clear" />
#### Listing area

<img class="floatleft borderless" src="Page-layout-listingarea.png" alt="Listing area location" />
<span class="flex">
Listing area occupies left half of the application besides top pane and right pane. It lists all the file candidates upon browse navigation or search function. In most of cases, it will also have a search bar above content listing.
Sometime, it can also host multiple listing by micro layout, for example tiling.
<br /><br />
Style and layout parameters:  
Background-color: #318ccc  
Margin: 0px 0px 10px 0px  
Background-color (listing area): #fafafa  
</span>

<br class="clear" />
<img class="floatleft borderless" src="Page-layout-listinarea-bottompane.png" alt="Bottom pane location" />
<span class="flex">
__Bottom pane__  
Bottom pane actually is a sub area within listing area. It provides an alter location for some contents to be shown simultaneously, especially for user with large display. For example, Metadata/property. More often, it attaches controls that are related with listing above. For example multiple vault search.
<br /><br />
Style and layout parameters:  
Background-color: #318ccc  
Margin: 0px 6px 10px 0px  
</span>

<br class="clear" />
#### Right pane

<img class="floatleft borderless" src="Page-layout-rightpane.png" alt="Right pane location" />
<span class="flex">
Right pane plays an important row in offering detailed control options over object properties, previews, search and personalization. Its contents switch contextually according to the selected object or current function. Furthermore, it can be switched manually with tabs above it inside top pane. 
<br /><br />
Style and layout parameters:  
Background-color: #318ccc  
Margin: 0px 10px 10px 0px  
</span>

<br class="clear" />
<img class="floatleft borderless" src="Page-layout-rightpane-header.png" alt="Right pane header location" />
<span class="flex">
__Header__  
Header is the top most part inside right pane. Often it is used to show the vital information of the content.
<br /><br />
Style and layout parameters:  
Background-color: #f2f2f2  
Padding: 10px 10px 0px 10px  
Height: 130px  
Font-color: #666666  
Font-size (heading):  22px  
Font-size (subheading): 14px  
Font-size (italic): 12px  
</span>

<br class="clear" />
<img class="floatleft borderless" src="Page-layout-rightpane-ribbon.png" alt="Tools ribbon location" />
<span class="flex">
__Object tools ribbon__  
Tools ribbon collects function buttons related with specific selection of the object or function.
<br /><br />
Style and layout parameters:  
Background-color: #318ccc  
Padding: 4px 6px 4px 14px  
Height: 32px  
Icons-size: 24px  
Font-color: #ffffff  
</span>

<br class="clear" />
<img class="floatleft borderless" src="Page-layout-rightpane-metadataform.png" alt="Metadata form location" />
<span class="flex">
__Metadata form__  
Metadata form is the place where you can view or even change properties of the selected object or functions.
<br /><br />
Style and layout parameters:  
Background-color: #fafafa  
Padding: 20px 8px 0px 0px  
Font-size: 13px  
Font-color: #999999, #5a5a5a, #1a1a1a  
Font-color (link): #0069dd  
Row height: 26px  
</span>

<br class="clear" />
<img class="floatleft borderless" src="Page-layout-rightpane-pinned.png" alt="Pinned location" />
<span class="flex">
__Pinned__  
Pinned is the last tab from top pane, it shares the area with right pane. It is a place where user can collect all kinds of object and links, and personalize at certain extend. 
<br /><br />
Style and layout parameters:  
Background-color: #f2f2f2  
Padding: 4px  
Font-color: #666666  
Font-size: 13px  
Cell-size: 96px  
Cell-icon-size: 32px  
Cell-margin: 4px  
Cell-background-color* : #cfcfcf, # d4cfbf, # b1dee3, # bce3c0, #eddfb9, #bab4a9, #9dc2cc  
<br /><br />
List of color codings for cell categories  
<img class="borderless" src="Page-layout-rightpane-pinned-colors.png" alt="Listing area location" />
</span>
