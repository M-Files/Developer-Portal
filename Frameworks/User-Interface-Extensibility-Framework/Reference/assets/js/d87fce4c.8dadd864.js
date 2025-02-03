"use strict";(self.webpackChunkuix_2=self.webpackChunkuix_2||[]).push([[4834],{3905:(e,t,r)=>{r.d(t,{Zo:()=>p,kt:()=>f});var n=r(67294);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function s(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var l=n.createContext({}),u=function(e){var t=n.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):s(s({},t),e)),r},p=function(e){var t=u(e.components);return n.createElement(l.Provider,{value:t},e.children)},c="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,a=e.originalType,l=e.parentName,p=i(e,["components","mdxType","originalType","parentName"]),c=u(r),m=o,f=c["".concat(l,".").concat(m)]||c[m]||d[m]||a;return r?n.createElement(f,s(s({ref:t},p),{},{components:r})):n.createElement(f,s({ref:t},p))}));function f(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=r.length,s=new Array(a);s[0]=m;var i={};for(var l in t)hasOwnProperty.call(t,l)&&(i[l]=t[l]);i.originalType=e,i[c]="string"==typeof e?e:o,s[1]=i;for(var u=2;u<a;u++)s[u]=r[u];return n.createElement.apply(null,s)}return n.createElement.apply(null,r)}m.displayName="MDXCreateElement"},66798:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>c,contentTitle:()=>u,default:()=>y,frontMatter:()=>l,metadata:()=>p,toc:()=>d});var n=r(87462),o=(r(67294),r(3905));const a={toc:[]},s="wrapper";function i(e){let{components:t,...r}=e;return(0,o.kt)(s,(0,n.Z)({},a,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("table",null,(0,o.kt)("thead",{parentName:"table"},(0,o.kt)("tr",{parentName:"thead"},(0,o.kt)("th",{parentName:"tr",align:null},"Name"),(0,o.kt)("th",{parentName:"tr",align:null},"Description"),(0,o.kt)("th",{parentName:"tr",align:null},"Value"))),(0,o.kt)("tbody",{parentName:"table"},(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},"PSEUDO_USER_RESOLUTION_MODE_NONE"),(0,o.kt)("td",{parentName:"tr",align:null},"No pseudo-user resolution."),(0,o.kt)("td",{parentName:"tr",align:null},"0")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},"PSEUDO_USER_RESOLUTION_MODE_PROPERTY_DEF"),(0,o.kt)("td",{parentName:"tr",align:null},"Pseudo-user property is resolved as (indirect) property definition references."),(0,o.kt)("td",{parentName:"tr",align:null},"1")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},"PSEUDO_USER_RESOLUTION_MODE_WORKFLOW_STATE"),(0,o.kt)("td",{parentName:"tr",align:null},"State-based pseudo-user is resolved as a workflow state changer."),(0,o.kt)("td",{parentName:"tr",align:null},"2")))))}i.isMDXComponent=!0;const l={},u="PseudoUserResolutionMode",p={unversionedId:"gRPC/Enums/PseudoUserResolutionMode/index",id:"gRPC/Enums/PseudoUserResolutionMode/index",title:"PseudoUserResolutionMode",description:"Pseudo-user resolution mode enumeration.",source:"@site/docs/gRPC/Enums/PseudoUserResolutionMode/index.mdx",sourceDirName:"gRPC/Enums/PseudoUserResolutionMode",slug:"/gRPC/Enums/PseudoUserResolutionMode/",permalink:"/Frameworks/User-Interface-Extensibility-Framework/Reference/gRPC/Enums/PseudoUserResolutionMode/",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"PermissionsExpressionType",permalink:"/Frameworks/User-Interface-Extensibility-Framework/Reference/gRPC/Enums/PermissionsExpressionType/"},next:{title:"ReferenceDirection",permalink:"/Frameworks/User-Interface-Extensibility-Framework/Reference/gRPC/Enums/ReferenceDirection/"}},c={},d=[],m={toc:d},f="wrapper";function y(e){let{components:t,...r}=e;return(0,o.kt)(f,(0,n.Z)({},m,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"pseudouserresolutionmode"},"PseudoUserResolutionMode"),(0,o.kt)("p",null,"Pseudo-user resolution mode enumeration.\nNOTE: These values must equal those defined in ACLHelper\\ACEConstants.h"),(0,o.kt)(i,{components:r.components,mdxType:"Values"}))}y.isMDXComponent=!0}}]);