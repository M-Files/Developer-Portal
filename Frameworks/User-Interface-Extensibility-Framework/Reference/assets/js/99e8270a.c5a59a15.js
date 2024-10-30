"use strict";(self.webpackChunkuix_2=self.webpackChunkuix_2||[]).push([[2916],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>d});var r=n(67294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},s=Object.keys(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var i=r.createContext({}),p=function(e){var t=r.useContext(i),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},c=function(e){var t=p(e.components);return r.createElement(i.Provider,{value:t},e.children)},u="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},g=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,s=e.originalType,i=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),u=p(n),g=a,d=u["".concat(i,".").concat(g)]||u[g]||m[g]||s;return n?r.createElement(d,o(o({ref:t},c),{},{components:n})):r.createElement(d,o({ref:t},c))}));function d(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var s=n.length,o=new Array(s);o[0]=g;var l={};for(var i in t)hasOwnProperty.call(t,i)&&(l[i]=t[i]);l.originalType=e,l[u]="string"==typeof e?e:a,o[1]=l;for(var p=2;p<s;p++)o[p]=n[p];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}g.displayName="MDXCreateElement"},27149:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>k,contentTitle:()=>f,default:()=>N,frontMatter:()=>d,metadata:()=>y,toc:()=>b});var r=n(87462),a=(n(67294),n(3905));const s={toc:[]},o="wrapper";function l(e){let{components:t,...n}=e;return(0,a.kt)(o,(0,r.Z)({},s,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "object_type": 0,\n  "page": 0,\n  "options": {\n    "all": false,\n    "unseen_page": false,\n    "ignore_original_conditions": false,\n    "seen_page": false,\n    "initial_page": false\n  },\n  "seen_objects": [] /* Array of ObjID */\n}\n')))}l.isMDXComponent=!0;const i={toc:[]},p="wrapper";function c(e){let{components:t,...n}=e;return(0,a.kt)(p,(0,r.Z)({},i,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:null},"Name"),(0,a.kt)("th",{parentName:"tr",align:null},"Description"),(0,a.kt)("th",{parentName:"tr",align:null},"Type"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("inlineCode",{parentName:"td"},"object_type")),(0,a.kt)("td",{parentName:"tr",align:null},"The identifier of a search results group."),(0,a.kt)("td",{parentName:"tr",align:null},"number")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("inlineCode",{parentName:"td"},"page")),(0,a.kt)("td",{parentName:"tr",align:null},"The zero-based index of a page."),(0,a.kt)("td",{parentName:"tr",align:null},"number")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("inlineCode",{parentName:"td"},"options")),(0,a.kt)("td",{parentName:"tr",align:null},"Search results page request flags."),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("a",{parentName:"td",href:"/gRPC/Messages/SRPREQUESTFLAGS"},"SRPREQUESTFLAGS"))),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("inlineCode",{parentName:"td"},"seen_objects")),(0,a.kt)("td",{parentName:"tr",align:null},"An array of ObjIDs. If the SRPREQUEST_UNSEENPAGE flag is available, these are ObjIDs to exclude. If the SRPREQUEST_SEENPAGE flag is available, these are ObjIDs to include."),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("a",{parentName:"td",href:"/gRPC/Messages/ObjID"},"ObjID[]"))))))}c.isMDXComponent=!0;const u={toc:[]},m="wrapper";function g(e){let{components:t,...n}=e;return(0,a.kt)(m,(0,r.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"Identifies a search results page request."))}g.isMDXComponent=!0;const d={},f="SearchResultsPageRequest",y={unversionedId:"gRPC/Messages/SearchResultsPageRequest/index",id:"gRPC/Messages/SearchResultsPageRequest/index",title:"SearchResultsPageRequest",description:"Example",source:"@site/docs/gRPC/Messages/SearchResultsPageRequest/index.mdx",sourceDirName:"gRPC/Messages/SearchResultsPageRequest",slug:"/gRPC/Messages/SearchResultsPageRequest/",permalink:"/Frameworks/User-Interface-Extensibility-Framework/Reference/gRPC/Messages/SearchResultsPageRequest/",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"SearchResultsItem",permalink:"/Frameworks/User-Interface-Extensibility-Framework/Reference/gRPC/Messages/SearchResultsItem/"},next:{title:"SearchResultsSorting",permalink:"/Frameworks/User-Interface-Extensibility-Framework/Reference/gRPC/Messages/SearchResultsSorting/"}},k={},b=[{value:"Example",id:"example",level:2}],h={toc:b},R="wrapper";function N(e){let{components:t,...n}=e;return(0,a.kt)(R,(0,r.Z)({},h,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"searchresultspagerequest"},"SearchResultsPageRequest"),(0,a.kt)(g,{components:n.components,mdxType:"Description"}),(0,a.kt)(c,{components:n.components,mdxType:"Message"}),(0,a.kt)("h2",{id:"example"},"Example"),(0,a.kt)(l,{components:n.components,mdxType:"Example"}))}N.isMDXComponent=!0}}]);