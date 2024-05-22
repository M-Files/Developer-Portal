"use strict";(self.webpackChunkuix_2=self.webpackChunkuix_2||[]).push([[890],{3905:(e,t,r)=>{r.d(t,{Zo:()=>u,kt:()=>h});var n=r(67294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function c(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var l=n.createContext({}),s=function(e){var t=n.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},u=function(e){var t=s(e.components);return n.createElement(l.Provider,{value:t},e.children)},p="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,i=e.originalType,l=e.parentName,u=c(e,["components","mdxType","originalType","parentName"]),p=s(r),m=a,h=p["".concat(l,".").concat(m)]||p[m]||d[m]||i;return r?n.createElement(h,o(o({ref:t},u),{},{components:r})):n.createElement(h,o({ref:t},u))}));function h(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=r.length,o=new Array(i);o[0]=m;var c={};for(var l in t)hasOwnProperty.call(t,l)&&(c[l]=t[l]);c.originalType=e,c[p]="string"==typeof e?e:a,o[1]=c;for(var s=2;s<i;s++)o[s]=r[s];return n.createElement.apply(null,o)}return n.createElement.apply(null,r)}m.displayName="MDXCreateElement"},41658:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>p,contentTitle:()=>s,default:()=>f,frontMatter:()=>l,metadata:()=>u,toc:()=>d});var n=r(87462),a=(r(67294),r(3905));const i={toc:[]},o="wrapper";function c(e){let{components:t,...r}=e;return(0,a.kt)(o,(0,n.Z)({},i,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:null},"Name"),(0,a.kt)("th",{parentName:"tr",align:null},"Description"),(0,a.kt)("th",{parentName:"tr",align:null},"Value"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"SEARCH_MODE_DEFAULT"),(0,a.kt)("td",{parentName:"tr",align:null},"Default mode (always the case in versions before 19.1). The search is executed using the full-text search engine if it contains an AnyField condition. Otherwise the search is executed against the database."),(0,a.kt)("td",{parentName:"tr",align:null},"0")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"SEARCH_MODE_FAVOR_FULL_TEXT_SEARCH"),(0,a.kt)("td",{parentName:"tr",align:null},"Favors executing the search with the full-text search engine if technically possible. The search is executed using the full-text search engine even if no AnyField condition exists if the search conditions are supported by the target search index. In other cases the search is executed against the database."),(0,a.kt)("td",{parentName:"tr",align:null},"1")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"SEARCH_MODE_REQUIRE_FULL_TEXT_SEARCH"),(0,a.kt)("td",{parentName:"tr",align:null},"Requires executing the search with the full-text search engine. If the search conditions are not supported by the target search index, an error is returned."),(0,a.kt)("td",{parentName:"tr",align:null},"2")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"SEARCH_MODE_REQUIRE_DATABASE_SEARCH"),(0,a.kt)("td",{parentName:"tr",align:null},"Requires executing the search against the database. If the search conditions are not compatible with executing the search against the database, an error is returned."),(0,a.kt)("td",{parentName:"tr",align:null},"3")))))}c.isMDXComponent=!0;const l={},s="SearchMode",u={unversionedId:"gRPC/Enums/SearchMode/index",id:"gRPC/Enums/SearchMode/index",title:"SearchMode",description:"Search mode enumeration.",source:"@site/docs/gRPC/Enums/SearchMode/index.mdx",sourceDirName:"gRPC/Enums/SearchMode",slug:"/gRPC/Enums/SearchMode/",permalink:"/Frameworks/User-Interface-Extensibility-Framework/Reference/Version2/gRPC/Enums/SearchMode/",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"RelationshipDirection",permalink:"/Frameworks/User-Interface-Extensibility-Framework/Reference/Version2/gRPC/Enums/RelationshipDirection/"},next:{title:"StatusType",permalink:"/Frameworks/User-Interface-Extensibility-Framework/Reference/Version2/gRPC/Enums/StatusType/"}},p={},d=[],m={toc:d},h="wrapper";function f(e){let{components:t,...r}=e;return(0,a.kt)(h,(0,n.Z)({},m,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"searchmode"},"SearchMode"),(0,a.kt)("p",null,"Search mode enumeration."),(0,a.kt)(c,{components:r.components,mdxType:"Values"}))}f.isMDXComponent=!0}}]);