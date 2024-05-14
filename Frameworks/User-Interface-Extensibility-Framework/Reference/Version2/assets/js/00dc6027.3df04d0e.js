"use strict";(self.webpackChunkuix_2=self.webpackChunkuix_2||[]).push([[587],{3905:(e,n,t)=>{t.d(n,{Zo:()=>c,kt:()=>f});var r=t(67294);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function s(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function l(e,n){if(null==e)return{};var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var i=r.createContext({}),p=function(e){var n=r.useContext(i),t=n;return e&&(t="function"==typeof e?e(n):s(s({},n),e)),t},c=function(e){var n=p(e.components);return r.createElement(i.Provider,{value:n},e.children)},m="mdxType",u={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},d=r.forwardRef((function(e,n){var t=e.components,a=e.mdxType,o=e.originalType,i=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),m=p(t),d=a,f=m["".concat(i,".").concat(d)]||m[d]||u[d]||o;return t?r.createElement(f,s(s({ref:n},c),{},{components:t})):r.createElement(f,s({ref:n},c))}));function f(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var o=t.length,s=new Array(o);s[0]=d;var l={};for(var i in n)hasOwnProperty.call(n,i)&&(l[i]=n[i]);l.originalType=e,l[m]="string"==typeof e?e:a,s[1]=l;for(var p=2;p<o;p++)s[p]=t[p];return r.createElement.apply(null,s)}return r.createElement.apply(null,t)}d.displayName="MDXCreateElement"},83753:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>g,contentTitle:()=>y,default:()=>x,frontMatter:()=>f,metadata:()=>_,toc:()=>k});var r=t(87462),a=(t(67294),t(3905));const o={toc:[]},s="wrapper";function l(e){let{components:n,...t}=e;return(0,a.kt)(s,(0,r.Z)({},o,t,{components:n,mdxType:"MDXLayout"}),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "key": "<!< The name of the value.>",\n  "value": {\n    "is_null": false,\n    "type": 15 /* Enum: Datatype */,\n    "data": {\n      "text": "<!< Text.>",\n      "integer": 0,\n      "real_number": 0,\n      "decimal_number": "<!< Fixed precision number.>",\n      "date": { "seconds": 0, "nanos": 0 } /* google.protobuf.Timestamp */,\n      "time": { "seconds": 0, "nanos": 0 } /* google.protobuf.Timestamp */,\n      "timestamp": { "seconds": 0, "nanos": 0 } /* google.protobuf.Timestamp */,\n      "boolean": false,\n      "lookup": {\n        "value_list_item_info": {\n          "obj_id": {\n            "type": 0,\n            "item_id": {\n              "internal_id": 0,\n              "external_repository_id": {\n                "connection": "<!< The external repository connection identifier.>",\n                "item": "<item>"\n              }\n            }\n          },\n          "name": "<!< The name of the item.>",\n          "external_id_status": 5 /* Enum: ExtIDStatus */,\n          "external_id": "<external_id>",\n          "guid": "<!< GUID for the item.>",\n          "options": {\n            "all": false,\n            "is_shortcut": false,\n            "is_deleted": false,\n            "is_accessed_by_valid": false,\n            "has_shared_files": false,\n            "is_conflict_object": false,\n            "is_normal": false,\n            "is_view": false,\n            "has_external_data": false,\n            "is_referred_external_object": false\n          },\n          "external_repository_icon_id": "<!< The ID of the item\'s icon.>"\n        },\n        "version": {\n          "type": 7 /* Enum: ObjVerVersionType */,\n          "internal_version": 0,\n          "external_repository_version": "<external_repository_version>",\n          "external_repository_sort_key": 0\n        }\n      },\n      "multi_select_lookup": {\n        "values": [] /* Array of Lookup */\n      },\n      "integer64": 0,\n      "multi_line_text": "<!< Multi-line text.>",\n      "acl": {\n        "checked_out_to_user": 0,\n        "is_fully_authoritative": false,\n        "custom_component": {\n          "named_acl_id": 0,\n          "has_named_acl": false,\n          "current_user_id": 0,\n          "has_current_user": false,\n          "permissions": [] /* Array of AccessControlEntry */,\n          "overridability_permissions": [] /* Array of AccessControlEntry */,\n          "status": {\n            "all": false,\n            "deleted": false,\n            "source_item_linked_via_pseudo_users": false\n          }\n        },\n        "restrictive_components": [] /* Array of AccessControlListComponentMapEntry */,\n        "secondary_access_control_list": {} /* AccessControlList */,\n        "additive_components": [] /* Array of AccessControlListComponentMapEntry */\n      }\n    }\n  }\n}\n')))}l.isMDXComponent=!0;const i={toc:[]},p="wrapper";function c(e){let{components:n,...t}=e;return(0,a.kt)(p,(0,r.Z)({},i,t,{components:n,mdxType:"MDXLayout"}),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:null},"Name"),(0,a.kt)("th",{parentName:"tr",align:null},"Description"),(0,a.kt)("th",{parentName:"tr",align:null},"Type"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("inlineCode",{parentName:"td"},"key")),(0,a.kt)("td",{parentName:"tr",align:null},"The name of the value."),(0,a.kt)("td",{parentName:"tr",align:null},"string")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("inlineCode",{parentName:"td"},"value")),(0,a.kt)("td",{parentName:"tr",align:null},"The value as a serialized bytearray."),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("a",{parentName:"td",href:"/gRPC/Messages/TypedValue"},"TypedValue"))))))}c.isMDXComponent=!0;const m={toc:[]},u="wrapper";function d(e){let{components:n,...t}=e;return(0,a.kt)(u,(0,r.Z)({},m,t,{components:n,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"Struct for a named value stored in a vault."))}d.isMDXComponent=!0;const f={},y="NamedValue",_={unversionedId:"gRPC/Messages/NamedValue/index",id:"gRPC/Messages/NamedValue/index",title:"NamedValue",description:"Example",source:"@site/docs/gRPC/Messages/NamedValue/index.mdx",sourceDirName:"gRPC/Messages/NamedValue",slug:"/gRPC/Messages/NamedValue/",permalink:"/Frameworks/User-Interface-Extensibility-Framework/Reference/Version2/gRPC/Messages/NamedValue/",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"NamedACL",permalink:"/Frameworks/User-Interface-Extensibility-Framework/Reference/Version2/gRPC/Messages/NamedACL/"},next:{title:"OBJECTCAPABILITYFLAGS",permalink:"/Frameworks/User-Interface-Extensibility-Framework/Reference/Version2/gRPC/Messages/OBJECTCAPABILITYFLAGS/"}},g={},k=[{value:"Example",id:"example",level:2}],b={toc:k},v="wrapper";function x(e){let{components:n,...t}=e;return(0,a.kt)(v,(0,r.Z)({},b,t,{components:n,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"namedvalue"},"NamedValue"),(0,a.kt)(d,{components:t.components,mdxType:"Description"}),(0,a.kt)(c,{components:t.components,mdxType:"Message"}),(0,a.kt)("h2",{id:"example"},"Example"),(0,a.kt)(l,{components:t.components,mdxType:"Example"}))}x.isMDXComponent=!0}}]);