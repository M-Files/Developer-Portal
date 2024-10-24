"use strict";(self.webpackChunkuix_2=self.webpackChunkuix_2||[]).push([[7005],{3905:(e,t,n)=>{n.d(t,{Zo:()=>d,kt:()=>h});var r=n(67294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var p=r.createContext({}),s=function(e){var t=r.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},d=function(e){var t=s(e.components);return r.createElement(p.Provider,{value:t},e.children)},c="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},u=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,p=e.parentName,d=i(e,["components","mdxType","originalType","parentName"]),c=s(n),u=a,h=c["".concat(p,".").concat(u)]||c[u]||m[u]||o;return n?r.createElement(h,l(l({ref:t},d),{},{components:n})):r.createElement(h,l({ref:t},d))}));function h(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,l=new Array(o);l[0]=u;var i={};for(var p in t)hasOwnProperty.call(t,p)&&(i[p]=t[p]);i.originalType=e,i[c]="string"==typeof e?e:a,l[1]=i;for(var s=2;s<o;s++)l[s]=n[s];return r.createElement.apply(null,l)}return r.createElement.apply(null,n)}u.displayName="MDXCreateElement"},18679:(e,t,n)=>{n.d(t,{Z:()=>l});var r=n(67294),a=n(86010);const o={tabItem:"tabItem_Ymn6"};function l(e){let{children:t,hidden:n,className:l}=e;return r.createElement("div",{role:"tabpanel",className:(0,a.Z)(o.tabItem,l),hidden:n},t)}},34259:(e,t,n)=>{n(67294),n(51048)},5122:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>w,contentTitle:()=>I,default:()=>v,frontMatter:()=>k,metadata:()=>g,toc:()=>x});var r=n(87462),a=(n(67294),n(3905));const o={toc:[]},l="wrapper";function i(e){let{components:t,...n}=e;return(0,a.kt)(l,(0,r.Z)({},o,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:null},"Type"),(0,a.kt)("th",{parentName:"tr",align:null},"Description"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"Promise < ",(0,a.kt)("inlineCode",{parentName:"td"},"object")," >"),(0,a.kt)("td",{parentName:"tr",align:null},"The popup dashboard.")))))}i.isMDXComponent=!0;const p={toc:[]},s="wrapper";function d(e){let{components:t,...n}=e;return(0,a.kt)(s,(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:null},"Name"),(0,a.kt)("th",{parentName:"tr",align:null},"Type"),(0,a.kt)("th",{parentName:"tr",align:null},"Description"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"dashboardID"),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("inlineCode",{parentName:"td"},"string")),(0,a.kt)("td",{parentName:"tr",align:null},"The id of the dashboard to show. The string id must match to one of the ",(0,a.kt)("br",null),"dashboard ids in the application definition file (appdef file).")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"data"),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("inlineCode",{parentName:"td"},"any")),(0,a.kt)("td",{parentName:"tr",align:null},"User-defined data item that is passed to the new dashboard.")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"titleOrOptions"),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("inlineCode",{parentName:"td"},"string")," ","|"," ",(0,a.kt)("a",{parentName:"td",href:"/UIExt2/Models/DialogUIParams/"},"DialogUIParams")),(0,a.kt)("td",{parentName:"tr",align:null},"Title and UI options of the dashboard. ",(0,a.kt)("br",null),"String Type: Defines the title of the dashboard. ",(0,a.kt)("br",null),"Object Type: Defines the title and other UI options ","[Eg: title/isModal/isResizable/isDraggable]",".")))))}d.isMDXComponent=!0;n(34259);var c=n(18679);const m={toc:[]},u="wrapper";function h(e){let{components:t,...n}=e;return(0,a.kt)(u,(0,r.Z)({},m,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)(c.Z,{value:"js",label:"JavaScript",mdxType:"TabItem"},(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"// shellUI points to instance of IShellUI\nconst result = await shellUI.ShowPopupDashboard(\n  dashboardID,\n  data,\n  titleOrOptions,\n);\n"))))}h.isMDXComponent=!0;const f={toc:[]},b="wrapper";function y(e){let{components:t,...n}=e;return(0,a.kt)(b,(0,r.Z)({},f,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"Shows a dashboard in a separate window."))}y.isMDXComponent=!0;const k={},I="ShowPopupDashboard",g={unversionedId:"UIExt2/Interfaces/IShellUI/ShowPopupDashboard/index",id:"UIExt2/Interfaces/IShellUI/ShowPopupDashboard/index",title:"ShowPopupDashboard",description:"Description",source:"@site/docs/UIExt2/Interfaces/IShellUI/ShowPopupDashboard/index.mdx",sourceDirName:"UIExt2/Interfaces/IShellUI/ShowPopupDashboard",slug:"/UIExt2/Interfaces/IShellUI/ShowPopupDashboard/",permalink:"/Frameworks/User-Interface-Extensibility-Framework/Reference/UIExt2/Interfaces/IShellUI/ShowPopupDashboard/",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"ShowMessage",permalink:"/Frameworks/User-Interface-Extensibility-Framework/Reference/UIExt2/Interfaces/IShellUI/ShowMessage/"},next:{title:"IWindow",permalink:"/Frameworks/User-Interface-Extensibility-Framework/Reference/UIExt2/Interfaces/IWindow/"}},w={},x=[{value:"Description",id:"description",level:2},{value:"Syntax",id:"syntax",level:2},{value:"Parameters",id:"parameters",level:2},{value:"Return type",id:"return-type",level:2}],N={toc:x},D="wrapper";function v(e){let{components:t,...n}=e;return(0,a.kt)(D,(0,r.Z)({},N,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"showpopupdashboard"},"ShowPopupDashboard"),(0,a.kt)("h2",{id:"description"},"Description"),(0,a.kt)(y,{components:n.components,mdxType:"Description"}),(0,a.kt)("h2",{id:"syntax"},"Syntax"),(0,a.kt)(h,{components:n.components,mdxType:"Syntax"}),(0,a.kt)("h2",{id:"parameters"},"Parameters"),(0,a.kt)(d,{components:n.components,mdxType:"Params"}),(0,a.kt)("h2",{id:"return-type"},"Return type"),(0,a.kt)(i,{components:n.components,mdxType:"Returns"}))}v.isMDXComponent=!0}}]);