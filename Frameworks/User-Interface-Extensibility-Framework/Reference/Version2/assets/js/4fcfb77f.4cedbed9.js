"use strict";(self.webpackChunkuix_2=self.webpackChunkuix_2||[]).push([[9946],{3905:(e,t,n)=>{n.d(t,{Zo:()=>m,kt:()=>y});var r=n(67294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=r.createContext({}),p=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},m=function(e){var t=p(e.components);return r.createElement(l.Provider,{value:t},e.children)},u="mdxType",c={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,l=e.parentName,m=s(e,["components","mdxType","originalType","parentName"]),u=p(n),d=a,y=u["".concat(l,".").concat(d)]||u[d]||c[d]||o;return n?r.createElement(y,i(i({ref:t},m),{},{components:n})):r.createElement(y,i({ref:t},m))}));function y(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=d;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[u]="string"==typeof e?e:a,i[1]=s;for(var p=2;p<o;p++)i[p]=n[p];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},82584:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>k,contentTitle:()=>f,default:()=>x,frontMatter:()=>y,metadata:()=>g,toc:()=>b});var r=n(87462),a=(n(67294),n(3905));const o={toc:[]},i="wrapper";function s(e){let{components:t,...n}=e;return(0,a.kt)(i,(0,r.Z)({},o,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "upload_ids": [] /* Array of number */,\n  "object_type_id": 0,\n  "obj_ver": {\n    "obj_id": {\n      "type": 0,\n      "item_id": {\n        "internal_id": 0,\n        "external_repository_id": {\n          "connection": "<!< The external repository connection identifier.>",\n          "item": "<item>"\n        }\n      }\n    },\n    "version": {\n      "type": 7 /* Enum: ObjVerVersionType */,\n      "internal_version": 0,\n      "external_repository_version": "<external_repository_version>",\n      "external_repository_sort_key": 0\n    }\n  },\n  "properties": [] /* Array of PropertyValue */,\n  "services": [] /* Array of string */,\n  "custom_data": "<!< The custom data for metadata providers.>"\n}\n')))}s.isMDXComponent=!0;const l={toc:[]},p="wrapper";function m(e){let{components:t,...n}=e;return(0,a.kt)(p,(0,r.Z)({},l,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:null},"Name"),(0,a.kt)("th",{parentName:"tr",align:null},"Description"),(0,a.kt)("th",{parentName:"tr",align:null},"Type"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("inlineCode",{parentName:"td"},"upload_ids")),(0,a.kt)("td",{parentName:"tr",align:null},"The upload session IDs associated with the metadata request. If the metadata request is pointed for existing object, the existing files are used instead."),(0,a.kt)("td",{parentName:"tr",align:null},"number[]")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("inlineCode",{parentName:"td"},"object_type_id")),(0,a.kt)("td",{parentName:"tr",align:null},"The object type of object that is about to be created."),(0,a.kt)("td",{parentName:"tr",align:null},"number")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("inlineCode",{parentName:"td"},"obj_ver")),(0,a.kt)("td",{parentName:"tr",align:null},"The object version if the automatic metadata request is pointed for existing object."),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("a",{parentName:"td",href:"/gRPC/Messages/ObjVer"},"ObjVer"))),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("inlineCode",{parentName:"td"},"properties")),(0,a.kt)("td",{parentName:"tr",align:null},"The property values of the object."),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("a",{parentName:"td",href:"/gRPC/Messages/PropertyValue"},"PropertyValue[]"))),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("inlineCode",{parentName:"td"},"services")),(0,a.kt)("td",{parentName:"tr",align:null},"List of requested metadata providers. Empty if all metadata providers are applied."),(0,a.kt)("td",{parentName:"tr",align:null},"string[]")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("inlineCode",{parentName:"td"},"custom_data")),(0,a.kt)("td",{parentName:"tr",align:null},"The custom data for metadata providers."),(0,a.kt)("td",{parentName:"tr",align:null},"string")))))}m.isMDXComponent=!0;const u={toc:[]},c="wrapper";function d(e){let{components:t,...n}=e;return(0,a.kt)(c,(0,r.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"The definition of an automatic value."))}d.isMDXComponent=!0;const y={},f="AutomaticMetadataRequest",g={unversionedId:"gRPC/Messages/AutomaticMetadataRequest/index",id:"gRPC/Messages/AutomaticMetadataRequest/index",title:"AutomaticMetadataRequest",description:"Example",source:"@site/docs/gRPC/Messages/AutomaticMetadataRequest/index.mdx",sourceDirName:"gRPC/Messages/AutomaticMetadataRequest",slug:"/gRPC/Messages/AutomaticMetadataRequest/",permalink:"/Frameworks/User-Interface-Extensibility-Framework/Reference/Version2/gRPC/Messages/AutomaticMetadataRequest/",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"AssociatedPropertyDef",permalink:"/Frameworks/User-Interface-Extensibility-Framework/Reference/Version2/gRPC/Messages/AssociatedPropertyDef/"},next:{title:"AutomaticMetadataResult",permalink:"/Frameworks/User-Interface-Extensibility-Framework/Reference/Version2/gRPC/Messages/AutomaticMetadataResult/"}},k={},b=[{value:"Example",id:"example",level:2}],N={toc:b},v="wrapper";function x(e){let{components:t,...n}=e;return(0,a.kt)(v,(0,r.Z)({},N,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"automaticmetadatarequest"},"AutomaticMetadataRequest"),(0,a.kt)(d,{components:n.components,mdxType:"Description"}),(0,a.kt)(m,{components:n.components,mdxType:"Message"}),(0,a.kt)("h2",{id:"example"},"Example"),(0,a.kt)(s,{components:n.components,mdxType:"Example"}))}x.isMDXComponent=!0}}]);