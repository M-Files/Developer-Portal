"use strict";(self.webpackChunkuix_2=self.webpackChunkuix_2||[]).push([[9519],{3905:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>u});var a=n(67294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},s=Object.keys(e);for(a=0;a<s.length;a++)n=s[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(a=0;a<s.length;a++)n=s[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var l=a.createContext({}),c=function(e){var t=a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},p=function(e){var t=c(e.components);return a.createElement(l.Provider,{value:t},e.children)},d="mdxType",_={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,s=e.originalType,l=e.parentName,p=o(e,["components","mdxType","originalType","parentName"]),d=c(n),m=r,u=d["".concat(l,".").concat(m)]||d[m]||_[m]||s;return n?a.createElement(u,i(i({ref:t},p),{},{components:n})):a.createElement(u,i({ref:t},p))}));function u(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var s=n.length,i=new Array(s);i[0]=m;var o={};for(var l in t)hasOwnProperty.call(t,l)&&(o[l]=t[l]);o.originalType=e,o[d]="string"==typeof e?e:r,i[1]=o;for(var c=2;c<s;c++)i[c]=n[c];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},18679:(e,t,n)=>{n.d(t,{Z:()=>i});var a=n(67294),r=n(86010);const s={tabItem:"tabItem_Ymn6"};function i(e){let{children:t,hidden:n,className:i}=e;return a.createElement("div",{role:"tabpanel",className:(0,r.Z)(s.tabItem,i),hidden:n},t)}},34259:(e,t,n)=>{n(67294),n(51048)},46019:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>j,contentTitle:()=>k,default:()=>x,frontMatter:()=>h,metadata:()=>g,toc:()=>v});var a=n(87462),r=(n(67294),n(3905));const s={toc:[{value:"Example",id:"example",level:3}]},i="wrapper";function o(e){let{components:t,...n}=e;return(0,r.kt)(i,(0,a.Z)({},s,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Name"),(0,r.kt)("th",{parentName:"tr",align:null},"Description"),(0,r.kt)("th",{parentName:"tr",align:null},"Type"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"is_visible_to_user")),(0,r.kt)("td",{parentName:"tr",align:null},"True if the latest version of the object is visible after the operation."),(0,r.kt)("td",{parentName:"tr",align:null},"boolean")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"created_object")),(0,r.kt)("td",{parentName:"tr",align:null},"The information, properties, and ACL of the latest version of the object after the operation as JSON (if ","*","pbLatestVisible is true). represented by MF_ObjectVersionExWP struct.)"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/gRPC/Messages/ObjectVersionExWP"},"ObjectVersionExWP"))))),(0,r.kt)("h3",{id:"example"},"Example"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "is_visible_to_user": false,\n  "created_object": {\n    "object_version": {\n      "version_info": {\n        "version": {\n          "type": 7 /* Enum: ObjVerVersionType */,\n          "internal_version": 0,\n          "external_repository_version": "<external_repository_version>",\n          "external_repository_sort_key": 0\n        },\n        "title": "<!< The title of the object.>",\n        "is_single_file_object": false,\n        "has_assignments": false,\n        "last_modified_at_utc": {\n          "seconds": 0,\n          "nanos": 0\n        } /* google.protobuf.Timestamp */,\n        "files": [] /* Array of File */,\n        "object_version_flags": {\n          "all": false,\n          "is_assignment_completed": false,\n          "has_related_objects": false,\n          "is_assignment_rejected": false,\n          "has_file_duplicates": false\n        },\n        "class_id": 0,\n        "version_guid": "<!< GUID of the object version.>",\n        "primary_file": {\n          "type": 3 /* Enum: FileIDType */,\n          "internal_id": 0,\n          "external_repository_id": "<!< External file id.>"\n        }\n      },\n      "object_info": {\n        "obj_id": {\n          "type": 0,\n          "item_id": {\n            "internal_id": 0,\n            "external_repository_id": {\n              "connection": "<!< The external repository connection identifier.>",\n              "item": "<item>"\n            }\n          }\n        },\n        "external_id_status": 5 /* Enum: ExtIDStatus */,\n        "external_id": "<external_id>",\n        "checked_out_version": {} /* ObjVerVersion */,\n        "checked_out_to_user_id": 0,\n        "checked_out_to_user_name": "<checked_out_to_user_name>",\n        "checked_out_to_host_name": "<checked_out_to_host_name>",\n        "checked_out_at_utc": {\n          "seconds": 0,\n          "nanos": 0\n        } /* google.protobuf.Timestamp */,\n        "checked_in_version": {} /* ObjVerVersion */,\n        "created_at_utc": {\n          "seconds": 0,\n          "nanos": 0\n        } /* google.protobuf.Timestamp */,\n        "accessed_by_me_utc": {\n          "seconds": 0,\n          "nanos": 0\n        } /* google.protobuf.Timestamp */,\n        "guid": "<!< Object GUID.>",\n        "options": {\n          "all": false,\n          "is_shortcut": false,\n          "is_deleted": false,\n          "is_accessed_by_valid": false,\n          "has_shared_files": false,\n          "is_conflict_object": false,\n          "is_normal": false,\n          "is_view": false,\n          "has_external_data": false,\n          "is_referred_external_object": false\n        },\n        "original_vault_guid": "<original_vault_guid>",\n        "original_vault_obj_id": {} /* ObjID */,\n        "associated_view_id": {} /* ItemID */,\n        "external_repository_icon_id": "<external_repository_icon_id>",\n        "primary_view_id": {} /* ItemID */,\n        "capabilities": {\n          "all": false,\n          "can_have_history": false,\n          "can_have_relationships": false,\n          "can_edit_old_versions": false,\n          "can_delete": false,\n          "can_destroy": false,\n          "can_undelete": false,\n          "can_rename": false,\n          "can_edit_metadata": false,\n          "can_edit_assignments": false,\n          "can_edit_workflows": false,\n          "can_edit_files": false,\n          "can_edit_version_comments": false,\n          "can_convert_single_multi_file": false,\n          "can_add_and_remove_files": false,\n          "can_change_file_type": false,\n          "can_change_permissions": false\n        }\n      }\n    },\n    "properties": [] /* Array of PropertyValue */,\n    "acl": {\n      "checked_out_to_user": 0,\n      "is_fully_authoritative": false,\n      "custom_component": {\n        "named_acl_id": 0,\n        "has_named_acl": false,\n        "current_user_id": 0,\n        "has_current_user": false,\n        "permissions": [] /* Array of AccessControlEntry */,\n        "overridability_permissions": [] /* Array of AccessControlEntry */,\n        "status": {\n          "all": false,\n          "deleted": false,\n          "source_item_linked_via_pseudo_users": false\n        }\n      },\n      "restrictive_components": [] /* Array of AccessControlListComponentMapEntry */,\n      "secondary_access_control_list": {} /* AccessControlList */,\n      "additive_components": [] /* Array of AccessControlListComponentMapEntry */\n    },\n    "current_user_permissions": {\n      "can_user_see": false,\n      "can_user_edit": false,\n      "can_user_delete": false,\n      "can_user_change_permissions": false\n    }\n  }\n}\n')))}o.isMDXComponent=!0;const l={toc:[]},c="wrapper";function p(e){let{components:t,...n}=e;return(0,r.kt)(c,(0,a.Z)({},l,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Name"),(0,r.kt)("th",{parentName:"tr",align:null},"Description"),(0,r.kt)("th",{parentName:"tr",align:null},"Type"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"object_type_id")),(0,r.kt)("td",{parentName:"tr",align:null},"The object type of the new object."),(0,r.kt)("td",{parentName:"tr",align:null},"number")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"properties")),(0,r.kt)("td",{parentName:"tr",align:null},"Properties of the new object as JSON array (represented by MF_PropertyValue struct)."),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/gRPC/Messages/PropertyValue"},"PropertyValue[]"))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"acl")),(0,r.kt)("td",{parentName:"tr",align:null},"The ACL for the new object as JSON (represented by MF_ACL struct)."),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/gRPC/Messages/AccessControlList"},"AccessControlList"))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"options")),(0,r.kt)("td",{parentName:"tr",align:null},"Flags that control this operation."),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/gRPC/Messages/OBJECTOPFLAGS"},"OBJECTOPFLAGS"))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"check_in")),(0,r.kt)("td",{parentName:"tr",align:null},"If true, the object is checked in immediately, otherwise the object is left to checked-out state."),(0,r.kt)("td",{parentName:"tr",align:null},"boolean")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"files")),(0,r.kt)("td",{parentName:"tr",align:null},"File source."),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/gRPC/Messages/ObjFileSource"},"ObjFileSource"))))))}p.isMDXComponent=!0;n(34259);var d=n(18679);const _={toc:[]},m="wrapper";function u(e){let{components:t,...n}=e;return(0,r.kt)(m,(0,a.Z)({},_,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)(d.Z,{value:"js",label:"JavaScript",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},'// Assumes shellUI has been initialized with IShellUI instance\nconst results = await shellUI.Vault.ObjectOperations.AddObjectWithFiles({\n  object_type_id: 0,\n  properties: [] /* Array of PropertyValue */,\n  acl: {\n    checked_out_to_user: 0,\n    is_fully_authoritative: false,\n    custom_component: {\n      named_acl_id: 0,\n      has_named_acl: false,\n      current_user_id: 0,\n      has_current_user: false,\n      permissions: [] /* Array of AccessControlEntry */,\n      overridability_permissions: [] /* Array of AccessControlEntry */,\n      status: {\n        all: false,\n        deleted: false,\n        source_item_linked_via_pseudo_users: false,\n      },\n    },\n    restrictive_components:\n      [] /* Array of AccessControlListComponentMapEntry */,\n    secondary_access_control_list: {} /* AccessControlList */,\n    additive_components: [] /* Array of AccessControlListComponentMapEntry */,\n  },\n  options: {\n    all: false,\n    require_read_access_after_operation: false,\n    require_edit_access_after_operation: false,\n    disallow_name_change: false,\n    require_change_permissions_access_after_operation: false,\n    require_full_access_after_operation: false,\n    change_acl_in_all_versions: false,\n  },\n  check_in: false,\n  files: {\n    type: 3 /* Enum: ObjFileSourceType */,\n    data: {\n      blank_template: {\n        name: "<!< Blank template file name.>",\n      },\n      user_defined_template: {\n        obj_id: {\n          type: 0,\n          item_id: {\n            internal_id: 0,\n            external_repository_id: {\n              connection: "<!< The external repository connection identifier.>",\n              item: "<item>",\n            },\n          },\n        },\n      },\n      uploaded_file: {\n        upload_id: 0,\n        title: "<!< The title of the file.>",\n        extension: "<extension>",\n        size: 0,\n      },\n    },\n  },\n});\n'))))}u.isMDXComponent=!0;const f={toc:[]},y="wrapper";function b(e){let{components:t,...n}=e;return(0,r.kt)(y,(0,a.Z)({},f,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"Adds a new object with files."))}b.isMDXComponent=!0;const h={},k="AddObjectWithFiles",g={unversionedId:"gRPC/Interfaces/ObjectOperations/AddObjectWithFiles/index",id:"gRPC/Interfaces/ObjectOperations/AddObjectWithFiles/index",title:"AddObjectWithFiles",description:"Syntax",source:"@site/docs/gRPC/Interfaces/ObjectOperations/AddObjectWithFiles/index.mdx",sourceDirName:"gRPC/Interfaces/ObjectOperations/AddObjectWithFiles",slug:"/gRPC/Interfaces/ObjectOperations/AddObjectWithFiles/",permalink:"/Frameworks/User-Interface-Extensibility-Framework/Reference/Version2/gRPC/Interfaces/ObjectOperations/AddObjectWithFiles/",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"AddObjectFile",permalink:"/Frameworks/User-Interface-Extensibility-Framework/Reference/Version2/gRPC/Interfaces/ObjectOperations/AddObjectFile/"},next:{title:"ChangeSecurity",permalink:"/Frameworks/User-Interface-Extensibility-Framework/Reference/Version2/gRPC/Interfaces/ObjectOperations/ChangeSecurity/"}},j={},v=[{value:"Syntax",id:"syntax",level:2},{value:"Message",id:"message",level:2},{value:"Return type",id:"return-type",level:2}],O={toc:v},N="wrapper";function x(e){let{components:t,...n}=e;return(0,r.kt)(N,(0,a.Z)({},O,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"addobjectwithfiles"},"AddObjectWithFiles"),(0,r.kt)(b,{components:n.components,mdxType:"Description"}),(0,r.kt)("h2",{id:"syntax"},"Syntax"),(0,r.kt)(u,{components:n.components,mdxType:"Syntax"}),(0,r.kt)("h2",{id:"message"},"Message"),(0,r.kt)(p,{components:n.components,mdxType:"Message"}),(0,r.kt)("h2",{id:"return-type"},"Return type"),(0,r.kt)(o,{components:n.components,mdxType:"Returns"}))}x.isMDXComponent=!0}}]);