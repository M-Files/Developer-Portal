"use strict";(self.webpackChunkuix_2=self.webpackChunkuix_2||[]).push([[4183],{3905:(e,t,n)=>{n.d(t,{Zo:()=>d,kt:()=>k});var a=n(67294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},l=Object.keys(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var p=a.createContext({}),s=function(e){var t=a.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},d=function(e){var t=s(e.components);return a.createElement(p.Provider,{value:t},e.children)},m="mdxType",c={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},u=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,l=e.originalType,p=e.parentName,d=i(e,["components","mdxType","originalType","parentName"]),m=s(n),u=r,k=m["".concat(p,".").concat(u)]||m[u]||c[u]||l;return n?a.createElement(k,o(o({ref:t},d),{},{components:n})):a.createElement(k,o({ref:t},d))}));function k(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var l=n.length,o=new Array(l);o[0]=u;var i={};for(var p in t)hasOwnProperty.call(t,p)&&(i[p]=t[p]);i.originalType=e,i[m]="string"==typeof e?e:r,o[1]=i;for(var s=2;s<l;s++)o[s]=n[s];return a.createElement.apply(null,o)}return a.createElement.apply(null,n)}u.displayName="MDXCreateElement"},8954:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>b,contentTitle:()=>h,default:()=>y,frontMatter:()=>k,metadata:()=>f,toc:()=>g});var a=n(87462),r=(n(67294),n(3905));const l={toc:[{value:"Started",id:"started",level:3},{value:"Stop",id:"stop",level:3}]},o="wrapper";function i(e){let{components:t,...n}=e;return(0,r.kt)(o,(0,a.Z)({},l,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h3",{id:"started"},"Started"),(0,r.kt)("p",null,"Sent when the object turns to started state."),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"MFiles.Event.Started")),(0,r.kt)("p",null,"Event has no arguments"),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Example Code")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-javascript"},"const eventHandle = await shellPaneContainer.Events.Register(\n  MFiles.Event.Started,\n  () => {\n    // Handle event\n  },\n);\n\n// Later unregister the event\nshellPaneContainer.Events.Unregister(eventHandle);\n")),(0,r.kt)("h3",{id:"stop"},"Stop"),(0,r.kt)("p",null,"Sent before the object is stopped."),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"MFiles.Event.Stop")),(0,r.kt)("p",null,"Event has no arguments"),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Example Code")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-javascript"},"const eventHandle = await shellPaneContainer.Events.Register(\n  MFiles.Event.Stop,\n  () => {\n    // Handle event\n  },\n);\n\n// Later unregister the event\nshellPaneContainer.Events.Unregister(eventHandle);\n")))}i.isMDXComponent=!0;const p={toc:[]},s="wrapper";function d(e){let{components:t,...n}=e;return(0,r.kt)(s,(0,a.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Name"),(0,r.kt)("th",{parentName:"tr",align:null},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"./AddTab/"},"AddTab")),(0,r.kt)("td",{parentName:"tr",align:null},"Creates a new tab and adds it to the collection of tabs.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"./GetSelectedTabs/"},"GetSelectedTabs")),(0,r.kt)("td",{parentName:"tr",align:null},"Gets the selected (active) tabs.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"./GetTab/"},"GetTab")),(0,r.kt)("td",{parentName:"tr",align:null},"Gets the tab with the specified tab id.")))))}d.isMDXComponent=!0;const m={toc:[]},c="wrapper";function u(e){let{components:t,...n}=e;return(0,r.kt)(c,(0,a.Z)({},m,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Name"),(0,r.kt)("th",{parentName:"tr",align:null},"Type"),(0,r.kt)("th",{parentName:"tr",align:null},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"Available"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"boolean")),(0,r.kt)("td",{parentName:"tr",align:null},"Returns a True / False if the panel is available.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"Events"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/UIExt2/Interfaces/IEvents/"},"IEvents")),(0,r.kt)("td",{parentName:"tr",align:null},"Returns the event registering interface for theIShellPaneContainer interface.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"Minimized"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"boolean")),(0,r.kt)("td",{parentName:"tr",align:null})),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"ShellFrame"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/UIExt2/Interfaces/IShellFrame/"},"IShellFrame")),(0,r.kt)("td",{parentName:"tr",align:null},"Returns a reference to the IShellFrame which owns this IShellPaneContainer.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"Size"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"number")),(0,r.kt)("td",{parentName:"tr",align:null})),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"Visible"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"boolean")),(0,r.kt)("td",{parentName:"tr",align:null})))))}u.isMDXComponent=!0;const k={},h="IShellPaneContainer",f={unversionedId:"UIExt2/Interfaces/IShellPaneContainer/index",id:"UIExt2/Interfaces/IShellPaneContainer/index",title:"IShellPaneContainer",description:"Represents an area of the screen which is reserved for displaying the dashboards. Usually a property of IShellFrame",source:"@site/docs/UIExt2/Interfaces/IShellPaneContainer/index.mdx",sourceDirName:"UIExt2/Interfaces/IShellPaneContainer",slug:"/UIExt2/Interfaces/IShellPaneContainer/",permalink:"/Frameworks/User-Interface-Extensibility-Framework/Reference/Version2/UIExt2/Interfaces/IShellPaneContainer/",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"UpdateListingItem",permalink:"/Frameworks/User-Interface-Extensibility-Framework/Reference/Version2/UIExt2/Interfaces/IShellListing/UpdateListingItem/"},next:{title:"AddTab",permalink:"/Frameworks/User-Interface-Extensibility-Framework/Reference/Version2/UIExt2/Interfaces/IShellPaneContainer/AddTab/"}},b={},g=[{value:"Properties",id:"properties",level:2},{value:"Methods",id:"methods",level:2},{value:"Events",id:"events",level:2}],v={toc:g},N="wrapper";function y(e){let{components:t,...n}=e;return(0,r.kt)(N,(0,a.Z)({},v,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"ishellpanecontainer"},"IShellPaneContainer"),(0,r.kt)("p",null,"Represents an area of the screen which is reserved for displaying the dashboards. Usually a property of ",(0,r.kt)("a",{parentName:"p",href:"../IShellFrame/"},"IShellFrame")),(0,r.kt)("h2",{id:"properties"},"Properties"),(0,r.kt)(u,{components:n.components,mdxType:"Properties"}),(0,r.kt)("h2",{id:"methods"},"Methods"),(0,r.kt)(d,{components:n.components,mdxType:"Methods"}),(0,r.kt)("h2",{id:"events"},"Events"),(0,r.kt)(i,{components:n.components,mdxType:"Events"}))}y.isMDXComponent=!0}}]);