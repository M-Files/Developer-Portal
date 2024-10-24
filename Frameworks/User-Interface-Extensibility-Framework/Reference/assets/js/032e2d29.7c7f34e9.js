"use strict";(self.webpackChunkuix_2=self.webpackChunkuix_2||[]).push([[1474],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>y});var r=n(67294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var i=r.createContext({}),p=function(e){var t=r.useContext(i),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},c=function(e){var t=p(e.components);return r.createElement(i.Provider,{value:t},e.children)},u="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,i=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),u=p(n),d=o,y=u["".concat(i,".").concat(d)]||u[d]||m[d]||a;return n?r.createElement(y,s(s({ref:t},c),{},{components:n})):r.createElement(y,s({ref:t},c))}));function y(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,s=new Array(a);s[0]=d;var l={};for(var i in t)hasOwnProperty.call(t,i)&&(l[i]=t[i]);l.originalType=e,l[u]="string"==typeof e?e:o,s[1]=l;for(var p=2;p<a;p++)s[p]=n[p];return r.createElement.apply(null,s)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},3455:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>g,contentTitle:()=>f,default:()=>v,frontMatter:()=>y,metadata:()=>_,toc:()=>b});var r=n(87462),o=(n(67294),n(3905));const a={toc:[]},s="wrapper";function l(e){let{components:t,...n}=e;return(0,o.kt)(s,(0,r.Z)({},a,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "property_def": 0,\n  "value": {\n    "is_null_value": false,\n    "type": 15 /* Enum: Datatype */,\n    "data": {\n      "text": "<!< Text.>",\n      "integer": 0,\n      "real_number": 0,\n      "decimal_number": "<!< Fixed precision number.>",\n      "date": { "seconds": 0, "nanos": 0 } /* google.protobuf.Timestamp */,\n      "time": { "seconds": 0, "nanos": 0 } /* google.protobuf.Timestamp */,\n      "timestamp": { "seconds": 0, "nanos": 0 } /* google.protobuf.Timestamp */,\n      "boolean": false,\n      "lookup": {\n        "value_list_item_info": {\n          "obj_id": {\n            "type": 0,\n            "item_id": {\n              "internal_id": 0,\n              "external_repository_id": {\n                "connection": "<!< The external repository connection identifier.>",\n                "item": "<item>"\n              }\n            }\n          },\n          "name": "<!< The name of the item.>",\n          "external_id_status": 5 /* Enum: ExtIDStatus */,\n          "external_id": "<external_id>",\n          "guid": "<!< GUID for the item.>",\n          "options": {\n            "all": false,\n            "is_shortcut": false,\n            "is_deleted": false,\n            "is_accessed_by_valid": false,\n            "has_shared_files": false,\n            "is_conflict_object": false,\n            "is_normal": false,\n            "is_view": false,\n            "has_external_data": false,\n            "is_referred_external_object": false\n          },\n          "external_repository_icon_id": "<!< The ID of the item\'s icon.>"\n        },\n        "version": {\n          "type": 7 /* Enum: ObjVerVersionType */,\n          "internal_version": 0,\n          "external_repository_version": "<external_repository_version>",\n          "external_repository_sort_key": 0\n        }\n      },\n      "multi_select_lookup": {\n        "values": [] /* Array of Lookup */\n      },\n      "integer64": 0,\n      "multi_line_text": "<!< Multi-line text.>",\n      "acl": {\n        "checked_out_to_user": 0,\n        "is_fully_authoritative": false,\n        "custom_component": {\n          "named_acl_id": 0,\n          "has_named_acl": false,\n          "current_user_id": 0,\n          "has_current_user": false,\n          "permissions": [] /* Array of AccessControlEntry */,\n          "overridability_permissions": [] /* Array of AccessControlEntry */,\n          "status": {\n            "all": false,\n            "deleted": false,\n            "source_item_linked_via_pseudo_users": false\n          }\n        },\n        "restrictive_components": [] /* Array of AccessControlListComponentMapEntry */,\n        "secondary_access_control_list": {} /* AccessControlList */,\n        "additive_components": [] /* Array of AccessControlListComponentMapEntry */\n      }\n    }\n  }\n}\n')))}l.isMDXComponent=!0;const i={toc:[]},p="wrapper";function c(e){let{components:t,...n}=e;return(0,o.kt)(p,(0,r.Z)({},i,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("table",null,(0,o.kt)("thead",{parentName:"table"},(0,o.kt)("tr",{parentName:"thead"},(0,o.kt)("th",{parentName:"tr",align:null},"Name"),(0,o.kt)("th",{parentName:"tr",align:null},"Description"),(0,o.kt)("th",{parentName:"tr",align:null},"Type"))),(0,o.kt)("tbody",{parentName:"table"},(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"property_def")),(0,o.kt)("td",{parentName:"tr",align:null},"Property definition ID."),(0,o.kt)("td",{parentName:"tr",align:null},"number")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"value")),(0,o.kt)("td",{parentName:"tr",align:null},"The value of the property."),(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("a",{parentName:"td",href:"/gRPC/Messages/TypedValue"},"TypedValue"))))))}c.isMDXComponent=!0;const u={toc:[]},m="wrapper";function d(e){let{components:t,...n}=e;return(0,o.kt)(m,(0,r.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"Struct for a single property value."))}d.isMDXComponent=!0;const y={},f="PropertyValue",_={unversionedId:"gRPC/Messages/PropertyValue/index",id:"gRPC/Messages/PropertyValue/index",title:"PropertyValue",description:"Example",source:"@site/docs/gRPC/Messages/PropertyValue/index.mdx",sourceDirName:"gRPC/Messages/PropertyValue",slug:"/gRPC/Messages/PropertyValue/",permalink:"/Frameworks/User-Interface-Extensibility-Framework/Reference/gRPC/Messages/PropertyValue/",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"PropertyDefPermissionsForClient",permalink:"/Frameworks/User-Interface-Extensibility-Framework/Reference/gRPC/Messages/PropertyDefPermissionsForClient/"},next:{title:"PropertyValueArray",permalink:"/Frameworks/User-Interface-Extensibility-Framework/Reference/gRPC/Messages/PropertyValueArray/"}},g={},b=[{value:"Example",id:"example",level:2}],k={toc:b},x="wrapper";function v(e){let{components:t,...n}=e;return(0,o.kt)(x,(0,r.Z)({},k,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"propertyvalue"},"PropertyValue"),(0,o.kt)(d,{components:n.components,mdxType:"Description"}),(0,o.kt)(c,{components:n.components,mdxType:"Message"}),(0,o.kt)("h2",{id:"example"},"Example"),(0,o.kt)(l,{components:n.components,mdxType:"Example"}))}v.isMDXComponent=!0}}]);