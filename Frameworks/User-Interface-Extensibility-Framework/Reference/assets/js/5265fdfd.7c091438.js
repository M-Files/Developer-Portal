"use strict";(self.webpackChunkuix_2=self.webpackChunkuix_2||[]).push([[3729],{3905:(e,t,n)=>{n.d(t,{Zo:()=>m,kt:()=>N});var r=n(67294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function p(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},l=Object.keys(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var o=r.createContext({}),u=function(e){var t=r.useContext(o),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},m=function(e){var t=u(e.components);return r.createElement(o.Provider,{value:t},e.children)},d="mdxType",s={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},c=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,l=e.originalType,o=e.parentName,m=p(e,["components","mdxType","originalType","parentName"]),d=u(n),c=a,N=d["".concat(o,".").concat(c)]||d[c]||s[c]||l;return n?r.createElement(N,i(i({ref:t},m),{},{components:n})):r.createElement(N,i({ref:t},m))}));function N(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var l=n.length,i=new Array(l);i[0]=c;var p={};for(var o in t)hasOwnProperty.call(t,o)&&(p[o]=t[o]);p.originalType=e,p[d]="string"==typeof e?e:a,i[1]=p;for(var u=2;u<l;u++)i[u]=n[u];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}c.displayName="MDXCreateElement"},43441:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>d,contentTitle:()=>u,default:()=>y,frontMatter:()=>o,metadata:()=>m,toc:()=>s});var r=n(87462),a=(n(67294),n(3905));const l={toc:[]},i="wrapper";function p(e){let{components:t,...n}=e;return(0,a.kt)(i,(0,r.Z)({},l,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:null},"Name"),(0,a.kt)("th",{parentName:"tr",align:null},"Description"),(0,a.kt)("th",{parentName:"tr",align:null},"Value"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"NAMED_VALUE_TYPE_UNINITIALIZED"),(0,a.kt)("td",{parentName:"tr",align:null},"Uninitialized value."),(0,a.kt)("td",{parentName:"tr",align:null},"0")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"NAMED_VALUE_TYPE_PROPERTY_AUTOMATIC_NUMBERING"),(0,a.kt)("td",{parentName:"tr",align:null},"The last used value of an automatic numbering propertydef. Name = ",(0,a.kt)("em",{parentName:"td"},"PropertyDef ID"),"."),(0,a.kt)("td",{parentName:"tr",align:null},"1")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"NAMED_VALUE_TYPE_VAULT_SHARED_VARIABLE"),(0,a.kt)("td",{parentName:"tr",align:null},"A vault specific variable saved by the script. Name = ",(0,a.kt)("em",{parentName:"td"},"case-insensitive text"),"."),(0,a.kt)("td",{parentName:"tr",align:null},"2")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"NAMED_VALUE_TYPE_METADATA_CONFIGURATION_VALUE"),(0,a.kt)("td",{parentName:"tr",align:null},"Configuration value type (user readable/admin writable. Writing requires 'change metadata structure' permission)."),(0,a.kt)("td",{parentName:"tr",align:null},"3")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"NAMED_VALUE_TYPE_USER_CONFIGURATION_VALUE"),(0,a.kt)("td",{parentName:"tr",align:null},"User defined value type (user readable/writable)."),(0,a.kt)("td",{parentName:"tr",align:null},"4")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"NAMED_VALUE_TYPE_REGISTRY_VALUE"),(0,a.kt)("td",{parentName:"tr",align:null},"Read-only value type that is stored into registry."),(0,a.kt)("td",{parentName:"tr",align:null},"5")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"NAMED_VALUE_TYPE_FOLDER_CONFIGURATION_VALUE"),(0,a.kt)("td",{parentName:"tr",align:null},"Configuration value type (user readable/admin writable. Writing requires 'manage common views' permission)."),(0,a.kt)("td",{parentName:"tr",align:null},"6")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"NAMED_VALUE_TYPE_ADMIN_CONFIGURATION_VALUE"),(0,a.kt)("td",{parentName:"tr",align:null},"Configuration value type (admin readable/admin writable)."),(0,a.kt)("td",{parentName:"tr",align:null},"7")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"NAMED_VALUE_TYPE_SYSTEM_CONFIGURATION_VALUE"),(0,a.kt)("td",{parentName:"tr",align:null},"Configuration value type (admin readable/system admin writable)."),(0,a.kt)("td",{parentName:"tr",align:null},"8")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"NAMED_VALUE_TYPE_USER_SPECIFIC_VALUE"),(0,a.kt)("td",{parentName:"tr",align:null},"TODO"),(0,a.kt)("td",{parentName:"tr",align:null},"9")))))}p.isMDXComponent=!0;const o={},u="NamedValueType",m={unversionedId:"gRPC/Enums/NamedValueType/index",id:"gRPC/Enums/NamedValueType/index",title:"NamedValueType",description:"Enumeration of possible named value types.",source:"@site/docs/gRPC/Enums/NamedValueType/index.mdx",sourceDirName:"gRPC/Enums/NamedValueType",slug:"/gRPC/Enums/NamedValueType/",permalink:"/Frameworks/User-Interface-Extensibility-Framework/Reference/gRPC/Enums/NamedValueType/",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"NACLType",permalink:"/Frameworks/User-Interface-Extensibility-Framework/Reference/gRPC/Enums/NACLType/"},next:{title:"ObjFileSourceType",permalink:"/Frameworks/User-Interface-Extensibility-Framework/Reference/gRPC/Enums/ObjFileSourceType/"}},d={},s=[],c={toc:s},N="wrapper";function y(e){let{components:t,...n}=e;return(0,a.kt)(N,(0,r.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"namedvaluetype"},"NamedValueType"),(0,a.kt)("p",null,"Enumeration of possible named value types."),(0,a.kt)(p,{components:n.components,mdxType:"Values"}))}y.isMDXComponent=!0}}]);