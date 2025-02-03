"use strict";(self.webpackChunkuix_2=self.webpackChunkuix_2||[]).push([[6011],{3905:(e,t,r)=>{r.d(t,{Zo:()=>p,kt:()=>b});var n=r(67294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function l(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var s=n.createContext({}),c=function(e){var t=n.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):l(l({},t),e)),r},p=function(e){var t=c(e.components);return n.createElement(s.Provider,{value:t},e.children)},d="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,s=e.parentName,p=i(e,["components","mdxType","originalType","parentName"]),d=c(r),m=a,b=d["".concat(s,".").concat(m)]||d[m]||u[m]||o;return r?n.createElement(b,l(l({ref:t},p),{},{components:r})):n.createElement(b,l({ref:t},p))}));function b(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,l=new Array(o);l[0]=m;var i={};for(var s in t)hasOwnProperty.call(t,s)&&(i[s]=t[s]);i.originalType=e,i[d]="string"==typeof e?e:a,l[1]=i;for(var c=2;c<o;c++)l[c]=r[c];return n.createElement.apply(null,l)}return n.createElement.apply(null,r)}m.displayName="MDXCreateElement"},80218:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>b,contentTitle:()=>u,default:()=>g,frontMatter:()=>d,metadata:()=>m,toc:()=>f});var n=r(87462),a=(r(67294),r(3905));const o={toc:[]},l="wrapper";function i(e){let{components:t,...r}=e;return(0,a.kt)(l,(0,n.Z)({},o,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:null},"Name"),(0,a.kt)("th",{parentName:"tr",align:null},"Type"),(0,a.kt)("th",{parentName:"tr",align:null},"Description"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"acl"),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("a",{parentName:"td",href:"/gRPC/Messages/AccessControlList/"},"AccessControlList")),(0,a.kt)("td",{parentName:"tr",align:null},"Receives the access control list of the object.")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"object_version"),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("inlineCode",{parentName:"td"},"null")," ","|"," ",(0,a.kt)("a",{parentName:"td",href:"/gRPC/Messages/ObjectVersionEx/"},"ObjectVersionEx")),(0,a.kt)("td",{parentName:"tr",align:null},"Receives the object version of the object after displaying the metadata card.")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"properties"),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("inlineCode",{parentName:"td"},"Array")," < ",(0,a.kt)("a",{parentName:"td",href:"/gRPC/Messages/PropertyValue/"},"PropertyValue")," >"),(0,a.kt)("td",{parentName:"tr",align:null},"Current property values of the object displayed in the metadata card.")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"result_code"),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("a",{parentName:"td",href:"/UIExt2/Enums/ObjectWindowResultCode/"},"ObjectWindowResultCode")),(0,a.kt)("td",{parentName:"tr",align:null},"The dialog box result code.")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"visible"),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("inlineCode",{parentName:"td"},"boolean")),(0,a.kt)("td",{parentName:"tr",align:null},"Specifies whether the object is still visible for the current user.")))))}i.isMDXComponent=!0;const s={toc:[]},c="wrapper";function p(e){let{components:t,...r}=e;return(0,a.kt)(c,(0,n.Z)({},s,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"The ObjectWindowResult class encapsulates the return values of showing the metadata card."))}p.isMDXComponent=!0;const d={},u="ObjectWindowResult",m={unversionedId:"UIExt2/Models/ObjectWindowResult/index",id:"UIExt2/Models/ObjectWindowResult/index",title:"ObjectWindowResult",description:"Description",source:"@site/docs/UIExt2/Models/ObjectWindowResult/index.mdx",sourceDirName:"UIExt2/Models/ObjectWindowResult",slug:"/UIExt2/Models/ObjectWindowResult/",permalink:"/Frameworks/User-Interface-Extensibility-Framework/Reference/UIExt2/Models/ObjectWindowResult/",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"ObjectFileVersionParams",permalink:"/Frameworks/User-Interface-Extensibility-Framework/Reference/UIExt2/Models/ObjectFileVersionParams/"},next:{title:"SearchCriteria",permalink:"/Frameworks/User-Interface-Extensibility-Framework/Reference/UIExt2/Models/SearchCriteria/"}},b={},f=[{value:"Description",id:"description",level:2},{value:"Properties",id:"properties",level:2}],k={toc:f},y="wrapper";function g(e){let{components:t,...r}=e;return(0,a.kt)(y,(0,n.Z)({},k,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"objectwindowresult"},"ObjectWindowResult"),(0,a.kt)("h2",{id:"description"},"Description"),(0,a.kt)(p,{components:r.components,mdxType:"Description"}),(0,a.kt)("h2",{id:"properties"},"Properties"),(0,a.kt)(i,{components:r.components,mdxType:"Properties"}))}g.isMDXComponent=!0}}]);