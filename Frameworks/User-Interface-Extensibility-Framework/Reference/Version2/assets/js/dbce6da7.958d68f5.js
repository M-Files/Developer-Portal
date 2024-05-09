"use strict";(self.webpackChunkuix_2=self.webpackChunkuix_2||[]).push([[4101],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>d});var r=n(67294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var l=r.createContext({}),p=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},c=function(e){var t=p(e.components);return r.createElement(l.Provider,{value:t},e.children)},m="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},f=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,l=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),m=p(n),f=o,d=m["".concat(l,".").concat(f)]||m[f]||u[f]||a;return n?r.createElement(d,i(i({ref:t},c),{},{components:n})):r.createElement(d,i({ref:t},c))}));function d(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,i=new Array(a);i[0]=f;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[m]="string"==typeof e?e:o,i[1]=s;for(var p=2;p<a;p++)i[p]=n[p];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}f.displayName="MDXCreateElement"},34936:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>g,contentTitle:()=>y,default:()=>v,frontMatter:()=>d,metadata:()=>k,toc:()=>b});var r=n(87462),o=(n(67294),n(3905));const a={toc:[]},i="wrapper";function s(e){let{components:t,...n}=e;return(0,o.kt)(i,(0,r.Z)({},a,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "value_list_item_info": {\n    "obj_id": {\n      "type": 0,\n      "item_id": {\n        "internal_id": 0,\n        "external_repository_id": {\n          "connection": "<!< The external repository connection identifier.>",\n          "item": "<item>"\n        }\n      }\n    },\n    "name": "<!< The name of the item.>",\n    "external_id_status": 5 /* Enum: ExtIDStatus */,\n    "external_id": "<external_id>",\n    "guid": "<!< GUID for the item.>",\n    "options": {\n      "all": false,\n      "is_shortcut": false,\n      "is_deleted": false,\n      "is_accessed_by_valid": false,\n      "has_shared_files": false,\n      "is_conflict_object": false,\n      "is_normal": false,\n      "is_view": false,\n      "has_external_data": false,\n      "is_referred_external_object": false\n    },\n    "external_repository_icon_id": "<!< The ID of the item\'s icon.>"\n  },\n  "version": {\n    "type": 7 /* Enum: ObjVerVersionType */,\n    "internal_version": 0,\n    "external_repository_version": "<external_repository_version>",\n    "external_repository_sort_key": 0\n  }\n}\n')))}s.isMDXComponent=!0;const l={toc:[]},p="wrapper";function c(e){let{components:t,...n}=e;return(0,o.kt)(p,(0,r.Z)({},l,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("table",null,(0,o.kt)("thead",{parentName:"table"},(0,o.kt)("tr",{parentName:"thead"},(0,o.kt)("th",{parentName:"tr",align:null},"Name"),(0,o.kt)("th",{parentName:"tr",align:null},"Description"),(0,o.kt)("th",{parentName:"tr",align:null},"Type"))),(0,o.kt)("tbody",{parentName:"table"},(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"value_list_item_info")),(0,o.kt)("td",{parentName:"tr",align:null},"Item info (e.g. IDs (internal and external), GUID, flags, and name)."),(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("a",{parentName:"td",href:"/gRPC/Messages/ItemInfo"},"ItemInfo"))),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"version")),(0,o.kt)("td",{parentName:"tr",align:null},"The version number of the item. If eObjVerVersionTypeLatest, refers to the latest checked-in version of the item."),(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("a",{parentName:"td",href:"/gRPC/Messages/ObjVerVersion"},"ObjVerVersion"))))))}c.isMDXComponent=!0;const m={toc:[]},u="wrapper";function f(e){let{components:t,...n}=e;return(0,o.kt)(u,(0,r.Z)({},m,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"Single-value lookup datatype."))}f.isMDXComponent=!0;const d={},y="Lookup",k={unversionedId:"gRPC/Messages/Lookup/index",id:"gRPC/Messages/Lookup/index",title:"Lookup",description:"Example",source:"@site/docs/gRPC/Messages/Lookup/index.mdx",sourceDirName:"gRPC/Messages/Lookup",slug:"/gRPC/Messages/Lookup/",permalink:"/Frameworks/User-Interface-Extensibility-Framework/Reference/Version2/gRPC/Messages/Lookup/",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"ItemInfo",permalink:"/Frameworks/User-Interface-Extensibility-Framework/Reference/Version2/gRPC/Messages/ItemInfo/"},next:{title:"MultiSelectLookup",permalink:"/Frameworks/User-Interface-Extensibility-Framework/Reference/Version2/gRPC/Messages/MultiSelectLookup/"}},g={},b=[{value:"Example",id:"example",level:2}],x={toc:b},_="wrapper";function v(e){let{components:t,...n}=e;return(0,o.kt)(_,(0,r.Z)({},x,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"lookup"},"Lookup"),(0,o.kt)(f,{components:n.components,mdxType:"Description"}),(0,o.kt)(c,{components:n.components,mdxType:"Message"}),(0,o.kt)("h2",{id:"example"},"Example"),(0,o.kt)(s,{components:n.components,mdxType:"Example"}))}v.isMDXComponent=!0}}]);