"use strict";(self.webpackChunkuix_2=self.webpackChunkuix_2||[]).push([[8665],{3905:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>h});var a=n(67294);function l(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){l(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,a,l=function(e,t){if(null==e)return{};var n,a,l={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(l[n]=e[n]);return l}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(l[n]=e[n])}return l}var i=a.createContext({}),c=function(e){var t=a.useContext(i),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},u=function(e){var t=c(e.components);return a.createElement(i.Provider,{value:t},e.children)},d="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},p=a.forwardRef((function(e,t){var n=e.components,l=e.mdxType,r=e.originalType,i=e.parentName,u=o(e,["components","mdxType","originalType","parentName"]),d=c(n),p=l,h=d["".concat(i,".").concat(p)]||d[p]||m[p]||r;return n?a.createElement(h,s(s({ref:t},u),{},{components:n})):a.createElement(h,s({ref:t},u))}));function h(e,t){var n=arguments,l=t&&t.mdxType;if("string"==typeof e||l){var r=n.length,s=new Array(r);s[0]=p;var o={};for(var i in t)hasOwnProperty.call(t,i)&&(o[i]=t[i]);o.originalType=e,o[d]="string"==typeof e?e:l,s[1]=o;for(var c=2;c<r;c++)s[c]=n[c];return a.createElement.apply(null,s)}return a.createElement.apply(null,n)}p.displayName="MDXCreateElement"},71788:(e,t,n)=>{n.d(t,{Z:()=>r});var a=n(67294),l=n(34274);function r(e){let{children:t}=e;return a.createElement("div",{className:l.Z.filetitle},t)}},84473:(e,t,n)=>{n.d(t,{Z:()=>r});var a=n(67294),l=n(34274);function r(e){let{children:t}=e;return a.createElement("span",{className:l.Z.highlight},t)}},54930:(e,t,n)=>{n.d(t,{Z:()=>r});var a=n(67294),l=n(34274);function r(e){let{children:t}=e;return a.createElement("div",{className:l.Z.idea},t)}},34949:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>d,contentTitle:()=>c,default:()=>T,frontMatter:()=>i,metadata:()=>u,toc:()=>m});var a=n(87462),l=(n(67294),n(3905)),r=n(84473),s=n(54930),o=n(71788);const i={sidebar_position:7,sidebar_label:"Search Folder Examples"},c="Creating search folders",u={unversionedId:"Samples/SearchFolderExamples/index",id:"Samples/SearchFolderExamples/index",title:"Creating search folders",description:"Overview",source:"@site/docs/Samples/SearchFolderExamples/index.mdx",sourceDirName:"Samples/SearchFolderExamples",slug:"/Samples/SearchFolderExamples/",permalink:"/Frameworks/User-Interface-Extensibility-Framework/Reference/Samples/SearchFolderExamples/",draft:!1,tags:[],version:"current",sidebarPosition:7,frontMatter:{sidebar_position:7,sidebar_label:"Search Folder Examples"},sidebar:"tutorialSidebar",previous:{title:"Assign to me UIX sample",permalink:"/Frameworks/User-Interface-Extensibility-Framework/Reference/Samples/AssignToMe/"},next:{title:"Upgrading applications",permalink:"/Frameworks/User-Interface-Extensibility-Framework/Reference/upgrading"}},d={},m=[{value:"Overview",id:"overview",level:2},{value:"Creating the application structure",id:"creating-the-application-structure",level:2},{value:"Creating the application definition file",id:"creating-the-application-definition-file",level:3},{value:"Creating the module",id:"creating-the-module",level:3},{value:"Create a text search folder (Search: &quot;estt&quot;)",id:"create-a-text-search-folder-search-estt",level:3},{value:"Create a property type search folder (Search: &#39;Is template&#39; = Yes)",id:"create-a-property-type-search-folder-search-is-template--yes",level:3},{value:"Create a object type search folder (Search: Object type one of &#39;Document&#39;)",id:"create-a-object-type-search-folder-search-object-type-one-of-document",level:3},{value:"Create a search folder with grouping levels (Search: Object type one of &#39;Document; Document collection&#39; with grouping levels)",id:"create-a-search-folder-with-grouping-levels-search-object-type-one-of-document-document-collection-with-grouping-levels",level:3},{value:"Create a view folder for latest searches <Highlight>Latest Searches</Highlight>",id:"create-a-view-folder-for-latest-searches-latest-searches",level:3},{value:"Testing the application",id:"testing-the-application",level:2}],p=e=>function(t){return console.warn("Component "+e+" was not imported, exported, or provided by MDXProvider as global scope"),(0,l.kt)("div",t)},h=p("Tabs"),f=p("TabItem"),_={toc:m},y="wrapper";function T(e){let{components:t,...i}=e;return(0,l.kt)(y,(0,a.Z)({},_,i,{components:t,mdxType:"MDXLayout"}),(0,l.kt)("h1",{id:"creating-search-folders"},"Creating search folders"),(0,l.kt)("h2",{id:"overview"},"Overview"),(0,l.kt)("p",null,"This sample demonstrates how to perform searches using folders."),(0,l.kt)("h2",{id:"creating-the-application-structure"},"Creating the application structure"),(0,l.kt)("h3",{id:"creating-the-application-definition-file"},"Creating the application definition file"),(0,l.kt)("p",null,"First we should create an application definition file. This file must be named ",(0,l.kt)(r.Z,{mdxType:"Highlight"},"appdef.xml"),". The application will use version 5 of the client schema (as we are only targeting newer M-Files versions). The application will declare a single Shell UI module (with its code in ",(0,l.kt)(r.Z,{mdxType:"Highlight"},"main.js"),"), and no dashboards."),(0,l.kt)(o.Z,{mdxType:"FileTitle"},"appdef.xml"),(0,l.kt)(h,{mdxType:"Tabs"},(0,l.kt)(f,{value:"xml",label:"XML",mdxType:"TabItem"},(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-xml"},'<?xml version="1.0"?>\n<application xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="http://www.m-files.com/schemas/appdef-client-v5.xsd">\n    <guid>94A65B60-1BEC-4B85-A510-6C64A713A717</guid>\n    <name>Search Examples</name>\n    <version>0.1</version>\n    <description>A demonstration application for searches.</description>\n    <publisher>M-Files Corporation</publisher>\n    <enabled-by-default>true</enabled-by-default>\n    <modules>\n        <module environment="shellui">\n        <file>main.js</file>\n        </module>\n    </modules>\n</application>\n\n')))),(0,l.kt)(s.Z,{mdxType:"Idea"},"Ensure that your application has a unique GUID by using a GUID generator."),(0,l.kt)("h3",{id:"creating-the-module"},"Creating the module"),(0,l.kt)("p",null,"Next we will create a module file to contain our actual application logic. Initially:"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"We will declare a default entry point for the ShellUI module"),(0,l.kt)("li",{parentName:"ul"},"We will react to the ",(0,l.kt)(r.Z,{mdxType:"Highlight"},"NewShellFrame")," event and obtain a reference to the shell frame"),(0,l.kt)("li",{parentName:"ul"},"We will create 5 different command buttons and place them in a menu at the top area")),(0,l.kt)(o.Z,{mdxType:"FileTitle"},"main.js"),(0,l.kt)(h,{mdxType:"Tabs"},(0,l.kt)(f,{value:"js",label:"JavaScript",mdxType:"TabItem"},(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-js"},"// NOTE! This code is for demonstration purposes only and does not contain any kind of\n//       error handling. MUST be revised before using in production.\n\nfunction OnNewShellUI(shellUI) {\n  /// <summary>The entry point of ShellUI module.</summary>\n  /// <param name=\"shellUI\" type=\"MFiles.ShellUI\">The new shell UI object.</param>\n\n  // Register to be notified when a new normal shell frame (Event_NewShellFrame) is created.\n  // We use Event_NewShellFrame rather than Event_NewShellFrame as this won't fire for history (etc.) dialogs.\n  shellUI.Events.Register(MFiles.Event.NewShellFrame, handleNewShellFrame)\n}\n\nfunction handleNewShellFrame(shellFrame) {\n  /// <summary>Handles the OnNewShellFrame event for an IShellUI.</summary>\n  /// <param name=\"shellFrame\" type=\"MFiles.ShellFrame\">The shell frame object which was created.</param>\n\n  // Register to listen to the started event.\n  shellFrame.Events.Register(\n    MFiles.Event.Started,\n    getShellFrameStartedHandler(shellFrame),\n  )\n}\n\nfunction getShellFrameStartedHandler(shellFrame) {\n  /// <summary>Gets a function to handle the Started event for shell frame.</summary>\n  /// <param name=\"shellFrame\" type=\"MFiles.ShellFrame\">The current shell frame object.</param>\n  /// <returns type=\"MFiles.Events.OnStarted\">The event handler.</returns>\n\n  // Return the handler function for ShellFrame's Started event.\n  return async () => {\n    // Create a command for Search: \"estt\".\n    const textSearchCommandId =\n      await shellFrame.Commands.CreateCustomCommand('Search: \\\"estt\\\"')\n      \n    // Create a command for Search: 'Is template' = Yes.\n    const propertyTypeSearchCommandId =\n      await shellFrame.Commands.CreateCustomCommand('Search: \\'Is template\\' = Yes')\n      \n    // Create a command for Search: Object type one of 'Document'.\n    const objectTypeSearchCommandId =\n      await shellFrame.Commands.CreateCustomCommand('Search: Object type one of \\'Document\\'')\n\n    // Create a command for Search: Object type one of 'Document; Document collection' with grouping levels.\n    const groupingLevelsSearchCommandId =\n      await shellFrame.Commands.CreateCustomCommand('Search: Object type one of \\'Document; Document collection\\' with grouping levels')\n      \n    // Create a command for Latest Searches.\n    const latestSearchesCommandId =\n      await shellFrame.Commands.CreateCustomCommand('Latest Searches')\n\n    // Add the command to the main menu.\n    await shellFrame.Commands.AddCustomCommandToMenu(\n      textSearchCommandId,\n      MFiles.MenuLocation.MenuLocation_TopPaneMenu,\n      1,\n    )\n    \n    // Add the command to the main menu.\n    await shellFrame.Commands.AddCustomCommandToMenu(\n      propertyTypeSearchCommandId,\n      MFiles.MenuLocation.MenuLocation_TopPaneMenu,\n      2,\n    )\n    \n    // Add the command to the main menu.\n    await shellFrame.Commands.AddCustomCommandToMenu(\n      objectTypeSearchCommandId,\n      MFiles.MenuLocation.MenuLocation_TopPaneMenu,\n      3,\n    )\n    \n    // Add the command to the main menu.\n    await shellFrame.Commands.AddCustomCommandToMenu(\n      groupingLevelsSearchCommandId,\n      MFiles.MenuLocation.MenuLocation_TopPaneMenu,\n      4,\n    )\n    \n    // Add the command to the main menu.\n    await shellFrame.Commands.AddCustomCommandToMenu(\n      latestSearchesCommandId,\n      MFiles.MenuLocation.MenuLocation_TopPaneMenu,\n      5,\n    )\n\n    // Register to respond to commands being clicked.\n    shellFrame.Commands.Events.Register(\n      MFiles.Event.CustomCommand,\n      async (commandId) => {\n\n        // Create an object ShellFrameFolders.\n        const shellFrameFolders = {\n          folders: []\n        };\n\n        // Check if the command is text search.\n        if (commandId === textSearchCommandId) {\n          // Add text search folder to ShellFrameFolders.\n          shellFrameFolders.folders.push(getTextSearchFolder());\n        }\n\n        // Check if the command is property type search.\n        if (commandId === propertyTypeSearchCommandId) {\n          // Add property type search folder to ShellFrameFolders.\n          shellFrameFolders.folders.push(getPropertyTypeSearchFolder());\n        }\n        \n        // Check if the command is object type search.\n        if (commandId === objectTypeSearchCommandId) {\n          // Add object type search folder to ShellFrameFolders.\n          shellFrameFolders.folders.push(getObjectTypeSearchFolder());\n        }\n        \n        // Check if the command is search with grouping levels.\n        if (commandId === groupingLevelsSearchCommandId) {\n          // Add search with grouping levels folder to ShellFrameFolders.\n          shellFrameFolders.folders.push(getGroupingLevelsSearchFolder());\n        }\n        \n        // Check if the command is latest searches.\n        if (commandId === latestSearchesCommandId) {\n          // Add latest searches folder to ShellFrameFolders.\n          shellFrameFolders.folders.push(getLatestSearchesFolder());\n        }\n\n        // Check if some folder was added to the ShellFrameFolders.\n        if(shellFrameFolders.folders.length > 0) {\n          // Navigate to that folder.\n          await shellFrame.NavigateToFolder(shellFrameFolders);\n        }\n      },\n    )\n  }\n}\n")))),(0,l.kt)("h3",{id:"create-a-text-search-folder-search-estt"},'Create a text search folder (Search: "estt")'),(0,l.kt)("p",null,"We will create a function ",(0,l.kt)(r.Z,{mdxType:"Highlight"},"getTextSearchFolder")," to return a text search folder which will execute full text search with string ",(0,l.kt)("em",{parentName:"p"},"estt"),"."),(0,l.kt)("p",null,"Search folder data structure consists of:"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"Filter conditions array"),(0,l.kt)("li",{parentName:"ul"},"Each condition has expression, condition type (operator) and value"),(0,l.kt)("li",{parentName:"ul"},"Search options")),(0,l.kt)("p",null,"This search folder will execute search with following filter:"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"Expression type is any field and in expression data we can set FTSFLAGS (full text search) options"),(0,l.kt)("li",{parentName:"ul"},"As condition we use type contains"),(0,l.kt)("li",{parentName:"ul"},'Value in this case is text type and data is "esst"'),(0,l.kt)("li",{parentName:"ul"},"Search options includes unmanaged objects into search results")),(0,l.kt)(o.Z,{mdxType:"FileTitle"},"main.js"),(0,l.kt)(h,{mdxType:"Tabs"},(0,l.kt)(f,{value:"js",label:"JavaScript",mdxType:"TabItem"},(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-js"},'function getTextSearchFolder() {\n  /// <summary>Gets a function to return the search folder for text search.</summary>\n  /// <returns type="Folder">The search folder.</returns>\n  \n  // Create a search folder for text "estt".\n  const folder = {\n    type: MFiles.VaultEnums.FolderType.FOLDER_TYPE_SEARCH_FOLDER,\n    data: {\n      search_folder: {\n        search_definition: {\n          filter_conditions: [\n            {\n              expression: {\n                data: {\n                  any_field: {\n                    options: {\n                      all: false,\n                      search_all_words: true,\n                      search_filedata: true,\n                      search_metadata: true,\n                      use_stemming: true\n                    }\n                  }\n                },\n                type: MFiles.VaultEnums.ExpressionType.EXPRESSION_TYPE_ANY_FIELD\n              },\n              type: MFiles.VaultEnums.ConditionType.CONDITION_TYPE_CONTAINS,\n              value: {\n                data: {\n                  text: "estt"\n                },\n                is_null_value: false,\n                type: MFiles.VaultEnums.Datatype.DATATYPE_TEXT\n              }\n            }\n          ],\n          options: {\n            all: false,\n            include_unmanaged_objects: true,\n            separately_search_in_each_object_type: true\n          }\n        }\n      }\n    }\n  };\n\n  // Return the search folder object.\n  return folder;\n};\n')))),(0,l.kt)("h3",{id:"create-a-property-type-search-folder-search-is-template--yes"},"Create a property type search folder (Search: 'Is template' = Yes)"),(0,l.kt)("p",null,"We will create a function ",(0,l.kt)(r.Z,{mdxType:"Highlight"},"getPropertyTypeSearchFolder")," to return a property type search folder which will find all objects that have IsTemplate property set to Yes."),(0,l.kt)("p",null,"This search folder will execute search with following filter:"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"Expression type is property value and in expression data we can set property value to be 37 (Is template)"),(0,l.kt)("li",{parentName:"ul"},"As condition we use type equals"),(0,l.kt)("li",{parentName:"ul"},"Value in this case is boolean type and data is true"),(0,l.kt)("li",{parentName:"ul"},"Search options is set to all")),(0,l.kt)(o.Z,{mdxType:"FileTitle"},"main.js"),(0,l.kt)(h,{mdxType:"Tabs"},(0,l.kt)(f,{value:"js",label:"JavaScript",mdxType:"TabItem"},(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-js"},"function getPropertyTypeSearchFolder() {\n  /// <summary>Gets a function to return the search folder for property type search.</summary>\n  /// <returns type=\"Folder\">The search folder.</returns>\n  \n  // Create a search folder for 'Is template' = true.\n  const folder = {\n    type: MFiles.VaultEnums.FolderType.FOLDER_TYPE_SEARCH_FOLDER,\n    data: {\n      search_folder: {\n        search_definition: {\n          filter_conditions: [\n            {\n              expression: {\n                data: {\n                  property_value: {\n                    data_function: {\n                      data: {},\n                      data_function: MFiles.VaultEnums.DataFunction.DATA_FUNCTION_NO_OP\n                    },\n                    parent_child_behavior: MFiles.VaultEnums.ParentChildBehavior.PARENT_CHILD_BEHAVIOR_NONE,\n                    property_def: 37 // 'Is template'\n                  }\n                },\n                type: MFiles.VaultEnums.ExpressionType.EXPRESSION_TYPE_PROPERTY_VALUE\n              },\n              type: MFiles.VaultEnums.ConditionType.CONDITION_TYPE_EQUAL,\n              value: {\n                data: {\n                  boolean: true\n                },\n                is_null_value: false,\n                type: MFiles.VaultEnums.Datatype.DATATYPE_BOOLEAN\n              }\n            }\n          ],\n          options: {\n            all: false\n          }\n        }\n      }\n    }\n  };\n\n  // Return the search folder object.\n  return folder;\n};\n")))),(0,l.kt)("h3",{id:"create-a-object-type-search-folder-search-object-type-one-of-document"},"Create a object type search folder (Search: Object type one of 'Document')"),(0,l.kt)("p",null,"We will create a function ",(0,l.kt)(r.Z,{mdxType:"Highlight"},"getObjectTypeSearchFolder")," to return a object type search folder which will find all objects of type Document."),(0,l.kt)("p",null,"This search folder will execute search with following filter:"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"Expression type is status value and in expression data we can set object type as status query"),(0,l.kt)("li",{parentName:"ul"},"As condition we use type equals"),(0,l.kt)("li",{parentName:"ul"},"Value in this case is multi select lookup where different value list values can be added",(0,l.kt)("ul",{parentName:"li"},(0,l.kt)("li",{parentName:"ul"},"Only one value list value with ID 0"))),(0,l.kt)("li",{parentName:"ul"},"Search options is set to all")),(0,l.kt)(o.Z,{mdxType:"FileTitle"},"main.js"),(0,l.kt)(h,{mdxType:"Tabs"},(0,l.kt)(f,{value:"js",label:"JavaScript",mdxType:"TabItem"},(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-js"},"function getObjectTypeSearchFolder() {\n  /// <summary>Gets a function to return the search folder for object type search.</summary>\n  /// <returns type=\"Folder\">The search folder.</returns>\n  \n  // Create a search folder for Object type one of 'Document'.\n  const folder = {\n    type: MFiles.VaultEnums.FolderType.FOLDER_TYPE_SEARCH_FOLDER,\n    data: {\n      search_folder: {\n        search_definition: {\n          filter_conditions: [\n            {\n              expression: {\n                data: {\n                  status_value: {\n                    data_function: {\n                      data: {},\n                      data_function: MFiles.VaultEnums.DataFunction.DATA_FUNCTION_NO_OP\n                    },\n                    type: MFiles.VaultEnums.StatusType.STATUS_TYPE_OBJECT_TYPE\n                  }\n                },\n                type: MFiles.VaultEnums.ExpressionType.EXPRESSION_TYPE_STATUS_VALUE\n              },\n              type: MFiles.VaultEnums.ConditionType.CONDITION_TYPE_EQUAL,\n              value: {\n                data: {\n                  multi_select_lookup: {\n                    values: [\n                      {\n                        value_list_item_info: {\n                          name: \"Document\",\n                          obj_id: {\n                            item_id: {\n                              internal_id: 0 // Object type 'Document'.\n                            },\n                            type: -11\n                          },\n                          options: {\n                            all: false\n                          }\n                        },\n                        version: {\n                          internal_version: -1,\n                          type: MFiles.VaultEnums.ObjVerVersionType.OBJ_VER_VERSION_TYPE_LATEST\n                        }\n                      }\n                    ]\n                  }\n                },\n                is_null_value: false,\n                type: MFiles.VaultEnums.Datatype.DATATYPE_MULTI_SELECT_LOOKUP\n              }\n            }\n          ],\n          options: {\n            all: false\n          }\n        }\n      }\n    }\n  };\n\n  // Return the search folder object.\n  return folder;\n};\n")))),(0,l.kt)("h3",{id:"create-a-search-folder-with-grouping-levels-search-object-type-one-of-document-document-collection-with-grouping-levels"},"Create a search folder with grouping levels (Search: Object type one of 'Document; Document collection' with grouping levels)"),(0,l.kt)("p",null,"We will create a function ",(0,l.kt)(r.Z,{mdxType:"Highlight"},"getGroupingLevelsSearchFolder")," to return a object type search folder without deleted objects and there will be 2 grouping levels."),(0,l.kt)("p",null,"This search folder will execute search with following filter:"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"1st expression type is status value and in expression data we can set type is deleted as status query",(0,l.kt)("ul",{parentName:"li"},(0,l.kt)("li",{parentName:"ul"},"As condition we use type equals"),(0,l.kt)("li",{parentName:"ul"},"Value is boolean false"))),(0,l.kt)("li",{parentName:"ul"},"2nd expression type is status value and in expression data we can set object type as status query",(0,l.kt)("ul",{parentName:"li"},(0,l.kt)("li",{parentName:"ul"},"As condition we use type equals"),(0,l.kt)("li",{parentName:"ul"},"Value in this case is multi select lookup",(0,l.kt)("ul",{parentName:"li"},(0,l.kt)("li",{parentName:"ul"},"1st value ID is 0 (Document)"),(0,l.kt)("li",{parentName:"ul"},"2nd value ID is 9 (Document collection)"))))),(0,l.kt)("li",{parentName:"ul"},"2 grouping levels are defined",(0,l.kt)("ul",{parentName:"li"},(0,l.kt)("li",{parentName:"ul"},"1st level is group by object type ID 136 which is Customer in Sample Vault"),(0,l.kt)("li",{parentName:"ul"},"2nd level is group by object type ID 101 which is Project in Sample Vault"))),(0,l.kt)("li",{parentName:"ul"},"Search options is set to all")),(0,l.kt)(o.Z,{mdxType:"FileTitle"},"main.js"),(0,l.kt)(h,{mdxType:"Tabs"},(0,l.kt)(f,{value:"js",label:"JavaScript",mdxType:"TabItem"},(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-js"},'function getGroupingLevelsSearchFolder() {\n  /// <summary>Gets a function to return the search folder with grouping levels.</summary>\n  /// <returns type="Folder">The search folder.</returns>\n  \n  // Create a search folder which has grouping levels.\n  const folder =  {\n    type: MFiles.VaultEnums.FolderType.FOLDER_TYPE_SEARCH_FOLDER,\n    data: {\n      search_folder: {\n        search_definition: {\n          filter_conditions: [\n            {\n              expression: {\n                data: {\n                  status_value: {\n                    data_function: {\n                      data: {},\n                      data_function: MFiles.VaultEnums.DataFunction.DATA_FUNCTION_NO_OP\n                    },\n                    type: MFiles.VaultEnums.StatusType.STATUS_TYPE_IS_DELETED\n                  }\n                },\n                type: MFiles.VaultEnums.ExpressionType.EXPRESSION_TYPE_STATUS_VALUE\n              },\n              type: MFiles.VaultEnums.ConditionType.CONDITION_TYPE_EQUAL,\n              value: {\n                data: {\n                  boolean: false\n                },\n                is_null_value: false,\n                type: MFiles.VaultEnums.Datatype.DATATYPE_BOOLEAN\n              }\n            },\n            {\n              expression: {\n                data: {\n                  status_value: {\n                    data_function: {\n                      data: {},\n                      data_function: MFiles.VaultEnums.DataFunction.DATA_FUNCTION_NO_OP\n                    },\n                    type: MFiles.VaultEnums.StatusType.STATUS_TYPE_OBJECT_TYPE\n                  }\n                },\n                type: MFiles.VaultEnums.ExpressionType.EXPRESSION_TYPE_STATUS_VALUE\n              },\n              type: MFiles.VaultEnums.ConditionType.CONDITION_TYPE_EQUAL,\n              value: {\n                data: {\n                  multi_select_lookup: {\n                    values: [\n                      {\n                        value_list_item_info: {\n                          name: "Document",\n                          obj_id: {\n                            item_id: {\n                              internal_id: 0 // Object type \'Document\'.\n                            },\n                            type: -11\n                          },\n                          options: {\n                            all: false\n                          }\n                        },\n                        version: {\n                          external_repository_sort_key: 0,\n                          external_repository_version: "",\n                          internal_version: -1,\n                          type: MFiles.VaultEnums.ObjVerVersionType.OBJ_VER_VERSION_TYPE_LATEST\n                        }\n                      },\n                      {\n                        value_list_item_info: {\n                          name: "Document collection",\n                          obj_id: {\n                            item_id: {\n                              internal_id: 9 // Object type \'Document collection\'.\n                            },\n                            type: -11\n                          },\n                          options: {\n                            all: false\n                          }\n                        },\n                        version: {\n                          external_repository_sort_key: 0,\n                          external_repository_version: "",\n                          internal_version: -1,\n                          type: MFiles.VaultEnums.ObjVerVersionType.OBJ_VER_VERSION_TYPE_LATEST\n                        }\n                      }\n                    ]\n                  }\n                },\n                is_null_value: false,\n                type: MFiles.VaultEnums.Datatype.DATATYPE_MULTI_SELECT_LOOKUP\n              }\n            }\n          ],\n          grouping_levels: [\n            {\n              empty_value_folder_name: "",\n              expression: {\n                data: {\n                  typed_value: {\n                    data_function: {\n                      data: {},\n                      data_function: MFiles.VaultEnums.DataFunction.DATA_FUNCTION_NO_OP\n                    },\n                    datatype: MFiles.VaultEnums.Datatype.DATATYPE_LOOKUP,\n                    parent_child_behavior: MFiles.VaultEnums.ParentChildBehavior.PARENT_CHILD_BEHAVIOR_NONE,\n                    value_list: 136 // Customer in Sample Vault.\n                  }\n                },\n                type: MFiles.VaultEnums.ExpressionType.EXPRESSION_TYPE_TYPED_VALUE\n              },\n              expression_object_type: 136, // Customer in Sample Vault.\n              options: {\n                all: false,\n                allow_empty_folders_for_missing_object_permissions: true,\n                incompatible_with_full_text_search: false\n              },\n              options_obsolete: 1,\n              reference_direction: false,\n              show_empty_value_folder: false,\n              show_folders_without_objects: true,\n              show_matching_values_on_this_level: false,\n              show_objects_with_empty_value: false,\n              show_only_user_selected_folders: false,\n              subfolder_algorithm: MFiles.VaultEnums.FolderListingAlgorithm.FOLDER_LISTING_ALGORITHM_NONE\n            },\n            {\n              empty_value_folder_name: "",\n              expression: {\n                data: {\n                  typed_value: {\n                    data_function: {\n                      data: {},\n                      data_function: MFiles.VaultEnums.DataFunction.DATA_FUNCTION_NO_OP\n                    },\n                    datatype: MFiles.VaultEnums.Datatype.DATATYPE_LOOKUP,\n                    parent_child_behavior: MFiles.VaultEnums.ParentChildBehavior.PARENT_CHILD_BEHAVIOR_NONE,\n                    value_list: 101 // Project in Sample Vault.\n                  }\n                },\n                type: MFiles.VaultEnums.ExpressionType.EXPRESSION_TYPE_TYPED_VALUE\n              },\n              expression_object_type: 101, // Project in Sample Vault.\n              options: {\n                all: false,\n                allow_empty_folders_for_missing_object_permissions: true,\n                incompatible_with_full_text_search: false\n              },\n              options_obsolete: 1,\n              reference_direction: false,\n              show_empty_value_folder: false,\n              show_folders_without_objects: false,\n              show_matching_values_on_this_level: false,\n              show_objects_with_empty_value: false,\n              show_only_user_selected_folders: false,\n              subfolder_algorithm: MFiles.VaultEnums.FolderListingAlgorithm.FOLDER_LISTING_ALGORITHM_NONE\n            }\n          ],\n          options: {\n            all: false\n          }\n        }\n      }\n    }\n  };\n\n  // Return the search folder object.\n  return folder;\n};\n')))),(0,l.kt)("h3",{id:"create-a-view-folder-for-latest-searches-latest-searches"},"Create a view folder for latest searches ",(0,l.kt)(r.Z,{mdxType:"Highlight"},"Latest Searches")),(0,l.kt)("p",null,"We will create a function ",(0,l.kt)(r.Z,{mdxType:"Highlight"},"getLatestSearchesFolder")," to return a latest searches view folder."),(0,l.kt)("p",null,"This view folder will return built-in view ID 11 (Latest Searches) content."),(0,l.kt)(o.Z,{mdxType:"FileTitle"},"main.js"),(0,l.kt)(h,{mdxType:"Tabs"},(0,l.kt)(f,{value:"js",label:"JavaScript",mdxType:"TabItem"},(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-js"},'function getLatestSearchesFolder() {\n  /// <summary>Gets a function to return the latest searches folder.</summary>\n  /// <returns type="Folder">The latest searches folder.</returns>\n  \n  // Create a view folder for latest searches.\n  const folder = {\n    type: MFiles.VaultEnums.FolderType.FOLDER_TYPE_VIEW_FOLDER,\n    data: {\n      view_folder: {\n        id: 11 // MFiles.MFBuiltInView.LatestSearches\n      }\n    }\n  };\n\n  // Return the search folder object.\n  return folder;\n};\n')))),(0,l.kt)("h2",{id:"testing-the-application"},"Testing the application"),(0,l.kt)("p",null,"The command buttons appear in the menu area."),(0,l.kt)("p",null,(0,l.kt)("img",{alt:" alt text ",src:n(36819).Z,title:"Search Commands",width:"2560",height:"1392"})),(0,l.kt)("p",null,"Selecting a command will execute the selected search."),(0,l.kt)("p",null,(0,l.kt)("img",{alt:" alt text ",src:n(59089).Z,title:"Search Executed",width:"2560",height:"1392"})),(0,l.kt)("p",null,"Latest Searches view shows the executed searches."),(0,l.kt)("p",null,(0,l.kt)("img",{alt:" alt text ",src:n(70150).Z,title:"Latest Searches",width:"2560",height:"1392"})))}T.isMDXComponent=!0},34274:(e,t,n)=>{n.d(t,{Z:()=>a});const a={note:"note_XMqZ",idea:"idea_NLbw",highlight:"highlight_NFmx",filetitle:"filetitle_Jrus"}},36819:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/SearchExample_1-9067c1e852b7d764e572e6a623e212dd.png"},59089:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/SearchExample_2-678484beef970c50a31babb28879358d.png"},70150:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/SearchExample_3-787756ffe9b53468fa089493e0de46fd.png"}}]);