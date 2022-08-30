---
layout: page
title: Page layout
includeInSearch: true
redirect_from: /UX-Design/Page-Layout/
---

## Overview

![Overview](Overview.png){:.borderless .clear}

## Layout areas

The M-Files Desktop client layout includes three general layout areas:

 * The [Top Pane](#top-pane) holds essential features that are needed all the time, such as structured navigation and vault- and user-operations.
 * The [Listing Area](#listing-area) occupies the left half below the [Top Pane](#top-pane). The listing area shows access to content as the user navigates the vault structure.
 * The  [Right Pane](#right-pane) is at final level of the navigation, it contains the metadata and object-operations for selected object(s) and filter.

There are also sub-areas as the [Bottom Pane](#bottom-pane) and the [Task Pane](#task-pane), which are explained further below.

### Top Pane

![Top Pane](Top-pane.png){:.borderless .leftcol}

{:.rightcol}
The `Top Pane` is a full-width header located above the content areas of the application. It hosts most of the navigation function groups:

* M-File logo with link to home
* A breadcrumb shows current location
* Create function and vault main navigation
* Search and advanced filters
* The account panel (to log out, to alter notification settings, and to log in/out of external repositories)

{:.rightcol}
**Style and layout parameters:**   
Background-color: #318ccc
Margin: 24px
Logo-size: 98x24px
Font: Segoe UI, size 14, regular, line height 20
Font-color: #ffffff, #767676
Icon-size: 24x24px
Search-size: 434x34px

### Listing Area

![Listing Area](Listing-area.png){:.borderless .leftcol}

{:.rightcol}
The Listing Area occupies the left half of the application underneath the [Top Pane](#top-pane). It lists all views, files and other objects when navigating views or searching. It can also show pinned objects.

{:.rightcol}
**Style and layout parameters:**   
Padding: 10px 24px 10px 24px
Font-size: 14px
Font-color: #363A40
Background-color: #eeeeee
Background-color (listing area): #ffffff

### Pinned

![Pinned](Pinned.png){:.borderless .leftcol}

{:.rightcol}
Clicking the Pinned from navigation replaces the Left Pane with a pinboard, where users can create a personal collection of links to objects and views. The contents of the pinboard are also available using the M-Files mobile applications.

{:.rightcol}
**Style and layout parameters:**
Background-color: #eeeeee
Background-color (Pin board): #ffffff
Padding: 24px
Font-color: #363A40
Font-size: 14px
Cell-size: 293 x 52px
Cell-icon-size: 16 x 16px
Cell-margin: 16px
Cell-background-color: f4f4f4

### Bottom Pane

![Bottom pane location](Bottom-pane.png){:.borderless .leftcol}

{:.rightcol}
The `Bottom Pane` actually is a sub area within the [Listing Area](#listing-area). It provides an alternate location for content to be shown, e.g. the [selected object's metadata](#metadata-form). It may also contain elements such as the multiple-vault search. Additionally, the contents of the bottom can be customised using the [User Interface Extensibility Framework]({{ site.baseurl }}/Frameworks/User-Interface-Extensibility-Framework/Dashboards/#replacing-the-right-or-bottom-panes).

{:.rightcol}
**Style and layout parameters:**   
Background-color: # eeeeee
Background-color(content): #ffffff

### Right Pane

![Right Pane location](Right-pane.png){:.borderless .leftcol}

{:.rightcol}
The `Right Pane` plays an important role in offering detailed control options over object properties, previews, search and personalization. Its contents switch contextually according to the selected object or current function. Additionally, the contents of the right pane can be customised using the [User Interface Extensibility Framework]({{ site.baseurl }}/Frameworks/User-Interface-Extensibility-Framework/Dashboards/#within-a-custom-tab) to show additional tabs of content. 

{:.rightcol}
**Style and layout parameters:**   
Background-color: #eeeeee
Background-color(content): #fffff
Padding: 24px

### Header

![Header location](Header.png){:.borderless .leftcol}

{:.rightcol}
The Right Pane Header is the top most part inside the [Right Pane](#right-pane). Often it is used to show the vital information of the selected item, such as the object ID, version, and checkout information.

{:.rightcol}
**Style and layout parameters:**   
Background-color: #eeeeee
Background-color (header): #ffffff
Padding: 24px
Height: 130px
Font-color: # 363A40
Font-color (secondary): #767676
Font-size (heading): 20px
Font-size (subheading): 14px

### Object Tools Ribbon

![Object tools ribbon location](Object-tools-ribbon.png){:.borderless .leftcol}

{:.rightcol}
The `Right Pane Object Tools Ribbon` shows buttons to execute common object-specific functions, such as flag and pin object.

{:.rightcol}
**Style and layout parameters:** 
Background-color: #f4f4f4
Padding: 6px 24px 6px 24px
Height: 32px
Icons-size: 16 x 16px
Font-color: #318ccc

### Metadata Form

![Metadata form location](Metadata-form.png){:.borderless .leftcol}

{:.rightcol}
The Metadata Form displays the properties of the selected object. Depending on your access rights, you may also be able to edit some of the properties. The layout is largely driven by the class of the selected object, but can be customised using [Metadata Card Configuration rules]({{ site.baseurl }}/Built-In/Metadata-Card-Configuration/).

{:.rightcol}
**Style and layout parameters:**   
Background-color: #eeeeee
Background-color (metadata): #ffffff
Padding: 16px 24px 0px 24px
Font-size: 14px
Font-color (name): #767676
Font-color (value): #363a40
Font-color (link): # 0072c6

### Task Pane  

![Task Pane location](Taskpane.png){:.borderless .leftcol}

{:.rightcol}
The Task Pane is where quick shortcuts are collected. The Task Pane can be collapsed and expanded by clicking of the handle on its right side. The task pane is kept for backwards compatibility.

{:.rightcol}
**Style and layout parameters:**   
Background-color: #ffffff
Width: 200px
Font-color: #363A40
Font-size: 14px
Font-size (Group header): 14px
Cell-icon-size: 16px
Cell-padding: 10px 16px
Cell-background-color: #ffffff
Cell-background-color (Group header): #E0E0E1

## Layout Controls  

### Expanding/collapsing control  

Some panels have more flexibility with their layout. For example: both the [Right  Pane](#right-pane) and [Task Pane](#task-pane) can be collapsed to make additional space on the screen. This can be done by clicking the "handle" in the middle of the layout divider. Clicking the handle again will toggle the panel back to its original size.

#### Collapsing in action for Right pane  

![Collapsing the Right Pane](Page-layout-control-divider-rightpane.png){:.borderless}

##### Expanding action for Task pane  

![Expanding the Task Pane](Page-layout-control-divider-taskpane.png){:.borderless}

{:.rightcol}
**Style and layout parameters:**   
Background-color: #eeeeee
Handle-width: 16px
Handle-color: # fffff
Handle-height: 86px