"use strict";(self.webpackChunkuix_2=self.webpackChunkuix_2||[]).push([[8026],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>y});var r=n(67294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},s=Object.keys(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var p=r.createContext({}),i=function(e){var t=r.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},c=function(e){var t=i(e.components);return r.createElement(p.Provider,{value:t},e.children)},u="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,s=e.originalType,p=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),u=i(n),d=a,y=u["".concat(p,".").concat(d)]||u[d]||m[d]||s;return n?r.createElement(y,o(o({ref:t},c),{},{components:n})):r.createElement(y,o({ref:t},c))}));function y(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var s=n.length,o=new Array(s);o[0]=d;var l={};for(var p in t)hasOwnProperty.call(t,p)&&(l[p]=t[p]);l.originalType=e,l[u]="string"==typeof e?e:a,o[1]=l;for(var i=2;i<s;i++)o[i]=n[i];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},18679:(e,t,n)=>{n.d(t,{Z:()=>o});var r=n(67294),a=n(86010);const s={tabItem:"tabItem_Ymn6"};function o(e){let{children:t,hidden:n,className:o}=e;return r.createElement("div",{role:"tabpanel",className:(0,a.Z)(s.tabItem,o),hidden:n},t)}},34259:(e,t,n)=>{n(67294),n(51048)},50568:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>O,contentTitle:()=>h,default:()=>P,frontMatter:()=>g,metadata:()=>N,toc:()=>C});var r=n(87462),a=(n(67294),n(3905));const s={toc:[{value:"Example",id:"example",level:3}]},o="wrapper";function l(e){let{components:t,...n}=e;return(0,a.kt)(o,(0,r.Z)({},s,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:null},"Name"),(0,a.kt)("th",{parentName:"tr",align:null},"Description"),(0,a.kt)("th",{parentName:"tr",align:null},"Type"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("inlineCode",{parentName:"td"},"current_version")),(0,a.kt)("td",{parentName:"tr",align:null},"Receives the current version of the classes collection on the server. If this is the same as the one specified by the caller, no data is returned."),(0,a.kt)("td",{parentName:"tr",align:null},"number")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("inlineCode",{parentName:"td"},"classes")),(0,a.kt)("td",{parentName:"tr",align:null},"Results as JSON array (Represented by CMF_Class struct array)."),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("a",{parentName:"td",href:"/gRPC/Messages/ObjectClass"},"ObjectClass[]"))),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("inlineCode",{parentName:"td"},"class_groups")),(0,a.kt)("td",{parentName:"tr",align:null},"Results as JSON array (Represented by CMF_DocClassGroup struct array)."),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("a",{parentName:"td",href:"/gRPC/Messages/ClassGroup"},"ClassGroup[]"))))),(0,a.kt)("h3",{id:"example"},"Example"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "current_version": 0,\n  "classes": [] /* Array of ObjectClass */,\n  "class_groups": [] /* Array of ClassGroup */\n}\n')))}l.isMDXComponent=!0;const p={toc:[]},i="wrapper";function c(e){let{components:t,...n}=e;return(0,a.kt)(i,(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:null},"Name"),(0,a.kt)("th",{parentName:"tr",align:null},"Description"),(0,a.kt)("th",{parentName:"tr",align:null},"Type"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("inlineCode",{parentName:"td"},"call_importance")),(0,a.kt)("td",{parentName:"tr",align:null},"The importance level of this call. Typically eciNormal."),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("a",{parentName:"td",href:"/gRPC/Enums/CallImportance"},"CallImportance"))),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("inlineCode",{parentName:"td"},"known_version")),(0,a.kt)("td",{parentName:"tr",align:null},"The version ID of the classes collection currently known by the caller. If the classes collection has not been updated since, ","*","pi64CurrentClassesVersionOnServer is set to this same number and no data is returned. Specify zero to force the retrieval of values."),(0,a.kt)("td",{parentName:"tr",align:null},"number")))))}c.isMDXComponent=!0;n(34259);var u=n(18679);const m={toc:[]},d="wrapper";function y(e){let{components:t,...n}=e;return(0,a.kt)(d,(0,r.Z)({},m,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)(u.Z,{value:"js",label:"JavaScript",mdxType:"TabItem"},(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"// Assumes shellUI has been initialized with IShellUI instance\nconst results =\n  await shellUI.Vault.PropertyDefsOperations.GetObjectClassesAndGroups({\n    call_importance: 2 /* Enum: CallImportance */,\n    known_version: 0,\n  });\n"))))}y.isMDXComponent=!0;const f={toc:[]},k="wrapper";function b(e){let{components:t,...n}=e;return(0,a.kt)(k,(0,r.Z)({},f,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"Gets all object classes and groups."))}b.isMDXComponent=!0;const g={},h="GetObjectClassesAndGroups",N={unversionedId:"gRPC/Interfaces/PropertyDefsOperations/GetObjectClassesAndGroups/index",id:"gRPC/Interfaces/PropertyDefsOperations/GetObjectClassesAndGroups/index",title:"GetObjectClassesAndGroups",description:"Syntax",source:"@site/docs/gRPC/Interfaces/PropertyDefsOperations/GetObjectClassesAndGroups/index.mdx",sourceDirName:"gRPC/Interfaces/PropertyDefsOperations/GetObjectClassesAndGroups",slug:"/gRPC/Interfaces/PropertyDefsOperations/GetObjectClassesAndGroups/",permalink:"/Frameworks/User-Interface-Extensibility-Framework/Reference/gRPC/Interfaces/PropertyDefsOperations/GetObjectClassesAndGroups/",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"PropertyDefsOperations",permalink:"/Frameworks/User-Interface-Extensibility-Framework/Reference/gRPC/Interfaces/PropertyDefsOperations/"},next:{title:"GetPropertyDefs",permalink:"/Frameworks/User-Interface-Extensibility-Framework/Reference/gRPC/Interfaces/PropertyDefsOperations/GetPropertyDefs/"}},O={},C=[{value:"Syntax",id:"syntax",level:2},{value:"Message",id:"message",level:2},{value:"Return type",id:"return-type",level:2}],v={toc:C},x="wrapper";function P(e){let{components:t,...n}=e;return(0,a.kt)(x,(0,r.Z)({},v,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"getobjectclassesandgroups"},"GetObjectClassesAndGroups"),(0,a.kt)(b,{components:n.components,mdxType:"Description"}),(0,a.kt)("h2",{id:"syntax"},"Syntax"),(0,a.kt)(y,{components:n.components,mdxType:"Syntax"}),(0,a.kt)("h2",{id:"message"},"Message"),(0,a.kt)(c,{components:n.components,mdxType:"Message"}),(0,a.kt)("h2",{id:"return-type"},"Return type"),(0,a.kt)(l,{components:n.components,mdxType:"Returns"}))}P.isMDXComponent=!0}}]);