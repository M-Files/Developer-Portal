"use strict";(self.webpackChunkuix_2=self.webpackChunkuix_2||[]).push([[5189],{3905:(e,n,t)=>{t.d(n,{Zo:()=>d,kt:()=>u});var r=t(67294);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function l(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function i(e,n){if(null==e)return{};var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var s=r.createContext({}),p=function(e){var n=r.useContext(s),t=n;return e&&(t="function"==typeof e?e(n):l(l({},n),e)),t},d=function(e){var n=p(e.components);return r.createElement(s.Provider,{value:n},e.children)},c="mdxType",m={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},f=r.forwardRef((function(e,n){var t=e.components,a=e.mdxType,o=e.originalType,s=e.parentName,d=i(e,["components","mdxType","originalType","parentName"]),c=p(t),f=a,u=c["".concat(s,".").concat(f)]||c[f]||m[f]||o;return t?r.createElement(u,l(l({ref:n},d),{},{components:t})):r.createElement(u,l({ref:n},d))}));function u(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var o=t.length,l=new Array(o);l[0]=f;var i={};for(var s in n)hasOwnProperty.call(n,s)&&(i[s]=n[s]);i.originalType=e,i[c]="string"==typeof e?e:a,l[1]=i;for(var p=2;p<o;p++)l[p]=t[p];return r.createElement.apply(null,l)}return r.createElement.apply(null,t)}f.displayName="MDXCreateElement"},34221:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>g,contentTitle:()=>_,default:()=>v,frontMatter:()=>u,metadata:()=>y,toc:()=>k});var r=t(87462),a=(t(67294),t(3905));const o={toc:[]},l="wrapper";function i(e){let{components:n,...t}=e;return(0,a.kt)(l,(0,r.Z)({},o,t,{components:n,mdxType:"MDXLayout"}),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "any_folder": {},\n  "view_folder": {\n    "id": 0\n  },\n  "property_folder": {\n    "typed_value": {\n      "is_null": false,\n      "type": 15 /* Enum: Datatype */,\n      "data": {\n        "text": "<!< Text.>",\n        "integer": 0,\n        "real_number": 0,\n        "decimal_number": "<!< Fixed precision number.>",\n        "date": { "seconds": 0, "nanos": 0 } /* google.protobuf.Timestamp */,\n        "time": { "seconds": 0, "nanos": 0 } /* google.protobuf.Timestamp */,\n        "timestamp": {\n          "seconds": 0,\n          "nanos": 0\n        } /* google.protobuf.Timestamp */,\n        "boolean": false,\n        "lookup": {\n          "value_list_item_info": {\n            "obj_id": {\n              "type": 0,\n              "item_id": {\n                "internal_id": 0,\n                "external_repository_id": {\n                  "connection": "<!< The external repository connection identifier.>",\n                  "item": "<item>"\n                }\n              }\n            },\n            "name": "<!< The name of the item.>",\n            "external_id_status": 5 /* Enum: ExtIDStatus */,\n            "external_id": "<external_id>",\n            "guid": "<!< GUID for the item.>",\n            "options": {\n              "all": false,\n              "is_shortcut": false,\n              "is_deleted": false,\n              "is_accessed_by_valid": false,\n              "has_shared_files": false,\n              "is_conflict_object": false,\n              "is_normal": false,\n              "is_view": false,\n              "has_external_data": false,\n              "is_referred_external_object": false\n            },\n            "external_repository_icon_id": "<!< The ID of the item\'s icon.>"\n          },\n          "version": {\n            "type": 7 /* Enum: ObjVerVersionType */,\n            "internal_version": 0,\n            "external_repository_version": "<external_repository_version>",\n            "external_repository_sort_key": 0\n          }\n        },\n        "multi_select_lookup": {\n          "values": [] /* Array of Lookup */\n        },\n        "integer64": 0,\n        "multi_line_text": "<!< Multi-line text.>",\n        "acl": {\n          "checked_out_to_user": 0,\n          "is_fully_authoritative": false,\n          "custom_component": {\n            "named_acl_id": 0,\n            "has_named_acl": false,\n            "current_user_id": 0,\n            "has_current_user": false,\n            "permissions": [] /* Array of AccessControlEntry */,\n            "overridability_permissions": [] /* Array of AccessControlEntry */,\n            "status": {\n              "all": false,\n              "deleted": false,\n              "source_item_linked_via_pseudo_users": false\n            }\n          },\n          "restrictive_components": [] /* Array of AccessControlListComponentMapEntry */,\n          "secondary_access_control_list": {} /* AccessControlList */,\n          "additive_components": [] /* Array of AccessControlListComponentMapEntry */\n        }\n      }\n    }\n  },\n  "traditional_folder": {\n    "value_list_item_id": 0\n  },\n  "search_folder": {\n    "search_definition": {\n      "filter_conditions": [] /* Array of SearchCondition */,\n      "grouping_levels": [] /* Array of GroupingLevel */,\n      "options": {\n        "all": false,\n        "look_in_all_versions": false,\n        "return_latest_visible_version": false,\n        "separately_search_in_each_object_type": false,\n        "allow_quick_refresh_for_external_object_types": false,\n        "disable_relevancy_ranking": false,\n        "separately_search_specific_object_types": false,\n        "include_unmanaged_objects": false,\n        "individual_limit_for_each_external_repository": false\n      }\n    }\n  },\n  "external_view_folder": {\n    "external_repository_folder_id": {} /* ExternalRepositoryID */\n  }\n}\n')))}i.isMDXComponent=!0;const s={toc:[]},p="wrapper";function d(e){let{components:n,...t}=e;return(0,a.kt)(p,(0,r.Z)({},s,t,{components:n,mdxType:"MDXLayout"}),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:null},"Name"),(0,a.kt)("th",{parentName:"tr",align:null},"Description"),(0,a.kt)("th",{parentName:"tr",align:null},"Type"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("inlineCode",{parentName:"td"},"any_folder")),(0,a.kt)("td",{parentName:"tr",align:null}),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("a",{parentName:"td",href:"/gRPC/Messages/FolderInfoUnion/AnyFolderData"},"AnyFolderData"))),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("inlineCode",{parentName:"td"},"view_folder")),(0,a.kt)("td",{parentName:"tr",align:null}),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("a",{parentName:"td",href:"/gRPC/Messages/FolderInfoUnion/ViewFolderData"},"ViewFolderData"))),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("inlineCode",{parentName:"td"},"property_folder")),(0,a.kt)("td",{parentName:"tr",align:null}),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("a",{parentName:"td",href:"/gRPC/Messages/FolderInfoUnion/PropertyFolderData"},"PropertyFolderData"))),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("inlineCode",{parentName:"td"},"traditional_folder")),(0,a.kt)("td",{parentName:"tr",align:null}),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("a",{parentName:"td",href:"/gRPC/Messages/FolderInfoUnion/TraditionalFolderData"},"TraditionalFolderData"))),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("inlineCode",{parentName:"td"},"search_folder")),(0,a.kt)("td",{parentName:"tr",align:null}),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("a",{parentName:"td",href:"/gRPC/Messages/FolderInfoUnion/SearchFolderData"},"SearchFolderData"))),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("inlineCode",{parentName:"td"},"external_view_folder")),(0,a.kt)("td",{parentName:"tr",align:null}),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("a",{parentName:"td",href:"/gRPC/Messages/FolderInfoUnion/ExternalViewFolderData"},"ExternalViewFolderData"))))))}d.isMDXComponent=!0;const c={toc:[]},m="wrapper";function f(e){let{components:n,...t}=e;return(0,a.kt)(m,(0,r.Z)({},c,t,{components:n,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"Union for folder type -specific data in MF_Folder."))}f.isMDXComponent=!0;const u={},_="FolderInfoUnion",y={unversionedId:"gRPC/Messages/FolderInfoUnion/index",id:"gRPC/Messages/FolderInfoUnion/index",title:"FolderInfoUnion",description:"Example",source:"@site/docs/gRPC/Messages/FolderInfoUnion/index.mdx",sourceDirName:"gRPC/Messages/FolderInfoUnion",slug:"/gRPC/Messages/FolderInfoUnion/",permalink:"/Frameworks/User-Interface-Extensibility-Framework/Reference/Version2/gRPC/Messages/FolderInfoUnion/",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Folder",permalink:"/Frameworks/User-Interface-Extensibility-Framework/Reference/Version2/gRPC/Messages/Folder/"},next:{title:"AnyFolderData",permalink:"/Frameworks/User-Interface-Extensibility-Framework/Reference/Version2/gRPC/Messages/FolderInfoUnion/AnyFolderData/"}},g={},k=[{value:"Example",id:"example",level:2}],b={toc:k},x="wrapper";function v(e){let{components:n,...t}=e;return(0,a.kt)(x,(0,r.Z)({},b,t,{components:n,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"folderinfounion"},"FolderInfoUnion"),(0,a.kt)(f,{components:t.components,mdxType:"Description"}),(0,a.kt)(d,{components:t.components,mdxType:"Message"}),(0,a.kt)("h2",{id:"example"},"Example"),(0,a.kt)(i,{components:t.components,mdxType:"Example"}))}v.isMDXComponent=!0}}]);