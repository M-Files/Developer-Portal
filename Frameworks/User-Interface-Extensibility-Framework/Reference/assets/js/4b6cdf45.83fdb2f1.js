"use strict";(self.webpackChunkuix_2=self.webpackChunkuix_2||[]).push([[1589],{3905:(e,t,n)=>{n.d(t,{Zo:()=>d,kt:()=>f});var r=n(67294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var p=r.createContext({}),s=function(e){var t=r.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},d=function(e){var t=s(e.components);return r.createElement(p.Provider,{value:t},e.children)},c="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},u=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,p=e.parentName,d=l(e,["components","mdxType","originalType","parentName"]),c=s(n),u=a,f=c["".concat(p,".").concat(u)]||c[u]||m[u]||o;return n?r.createElement(f,i(i({ref:t},d),{},{components:n})):r.createElement(f,i({ref:t},d))}));function f(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=u;var l={};for(var p in t)hasOwnProperty.call(t,p)&&(l[p]=t[p]);l.originalType=e,l[c]="string"==typeof e?e:a,i[1]=l;for(var s=2;s<o;s++)i[s]=n[s];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}u.displayName="MDXCreateElement"},4448:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>h,contentTitle:()=>k,default:()=>N,frontMatter:()=>f,metadata:()=>w,toc:()=>b});var r=n(87462),a=(n(67294),n(3905));const o={toc:[{value:"CloseWindow",id:"closewindow",level:3}]},i="wrapper";function l(e){let{components:t,...n}=e;return(0,a.kt)(i,(0,r.Z)({},o,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h3",{id:"closewindow"},"CloseWindow"),(0,a.kt)("p",null,"Sent for a window when the window is requested to closed."),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"MFiles.Event.CloseWindow")),(0,a.kt)("p",null,"Event has no arguments"),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Example Code")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-javascript"},"const eventHandle = await window.Events.Register(\n  MFiles.Event.CloseWindow,\n  () => {\n    // Handle event\n  },\n);\n\n// Later unregister the event\nwindow.Events.Unregister(eventHandle);\n")))}l.isMDXComponent=!0;const p={toc:[]},s="wrapper";function d(e){let{components:t,...n}=e;return(0,a.kt)(s,(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:null},"Name"),(0,a.kt)("th",{parentName:"tr",align:null},"Description"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("a",{parentName:"td",href:"./Close/"},"Close")),(0,a.kt)("td",{parentName:"tr",align:null},"Closes the window. The close event is sent before the window is closed.")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("a",{parentName:"td",href:"./ResizeToDefaultSize/"},"ResizeToDefaultSize")),(0,a.kt)("td",{parentName:"tr",align:null},"Resize the window to the default size.")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("a",{parentName:"td",href:"./SetCloseIconVisibility/"},"SetCloseIconVisibility")),(0,a.kt)("td",{parentName:"tr",align:null},"Sets the visibility of the Close button in the Window.")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("a",{parentName:"td",href:"./SetDefaultSize/"},"SetDefaultSize")),(0,a.kt)("td",{parentName:"tr",align:null},"Sets the default size of the window.")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("a",{parentName:"td",href:"./SetSize/"},"SetSize")),(0,a.kt)("td",{parentName:"tr",align:null},"Sets width and height of window")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("a",{parentName:"td",href:"./SetTitle/"},"SetTitle")),(0,a.kt)("td",{parentName:"tr",align:null},"Sets title of window")))))}d.isMDXComponent=!0;const c={toc:[]},m="wrapper";function u(e){let{components:t,...n}=e;return(0,a.kt)(m,(0,r.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:null},"Name"),(0,a.kt)("th",{parentName:"tr",align:null},"Type"),(0,a.kt)("th",{parentName:"tr",align:null},"Description"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"Events"),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("a",{parentName:"td",href:"/UIExt2/Interfaces/IEvents/"},"IEvents")),(0,a.kt)("td",{parentName:"tr",align:null},"Returns the event registering interface for the IWindow interface.")))))}u.isMDXComponent=!0;const f={},k="IWindow",w={unversionedId:"UIExt2/Interfaces/IWindow/index",id:"UIExt2/Interfaces/IWindow/index",title:"IWindow",description:"Instance of IWindow is found from Window property of IDashboard when the Dashboard is created as a popup dashboard",source:"@site/docs/UIExt2/Interfaces/IWindow/index.mdx",sourceDirName:"UIExt2/Interfaces/IWindow",slug:"/UIExt2/Interfaces/IWindow/",permalink:"/Frameworks/User-Interface-Extensibility-Framework/Reference/UIExt2/Interfaces/IWindow/",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"ShowPopupDashboard",permalink:"/Frameworks/User-Interface-Extensibility-Framework/Reference/UIExt2/Interfaces/IShellUI/ShowPopupDashboard/"},next:{title:"Close",permalink:"/Frameworks/User-Interface-Extensibility-Framework/Reference/UIExt2/Interfaces/IWindow/Close/"}},h={},b=[{value:"Properties",id:"properties",level:2},{value:"Methods",id:"methods",level:2},{value:"Events",id:"events",level:2}],y={toc:b},v="wrapper";function N(e){let{components:t,...n}=e;return(0,a.kt)(v,(0,r.Z)({},y,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"iwindow"},"IWindow"),(0,a.kt)("p",null,"Instance of IWindow is found from ",(0,a.kt)("inlineCode",{parentName:"p"},"Window")," property of ",(0,a.kt)("a",{parentName:"p",href:"../IDashboard/"},"IDashboard")," when the Dashboard is created as a ",(0,a.kt)("a",{parentName:"p",href:"../../../Overview/Dashboards#open-a-popup-dashboard"},"popup dashboard")),(0,a.kt)("h2",{id:"properties"},"Properties"),(0,a.kt)(u,{components:n.components,mdxType:"Properties"}),(0,a.kt)("h2",{id:"methods"},"Methods"),(0,a.kt)(d,{components:n.components,mdxType:"Methods"}),(0,a.kt)("h2",{id:"events"},"Events"),(0,a.kt)(l,{components:n.components,mdxType:"Events"}))}N.isMDXComponent=!0}}]);