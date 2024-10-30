"use strict";(self.webpackChunkuix_2=self.webpackChunkuix_2||[]).push([[416],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>f});var r=n(67294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var s=r.createContext({}),p=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},c=function(e){var t=p(e.components);return r.createElement(s.Provider,{value:t},e.children)},m="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,s=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),m=p(n),d=a,f=m["".concat(s,".").concat(d)]||m[d]||u[d]||o;return n?r.createElement(f,i(i({ref:t},c),{},{components:n})):r.createElement(f,i({ref:t},c))}));function f(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=d;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[m]="string"==typeof e?e:a,i[1]=l;for(var p=2;p<o;p++)i[p]=n[p];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},18679:(e,t,n)=>{n.d(t,{Z:()=>i});var r=n(67294),a=n(86010);const o={tabItem:"tabItem_Ymn6"};function i(e){let{children:t,hidden:n,className:i}=e;return r.createElement("div",{role:"tabpanel",className:(0,a.Z)(o.tabItem,i),hidden:n},t)}},34259:(e,t,n)=>{n(67294),n(51048)},38869:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>h,contentTitle:()=>g,default:()=>N,frontMatter:()=>b,metadata:()=>v,toc:()=>x});var r=n(87462),a=(n(67294),n(3905));const o={toc:[{value:"Example",id:"example",level:3}]},i="wrapper";function l(e){let{components:t,...n}=e;return(0,a.kt)(i,(0,r.Z)({},o,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:null},"Name"),(0,a.kt)("th",{parentName:"tr",align:null},"Description"),(0,a.kt)("th",{parentName:"tr",align:null},"Type")))),(0,a.kt)("h3",{id:"example"},"Example"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-json"},"{}\n")))}l.isMDXComponent=!0;const s={toc:[]},p="wrapper";function c(e){let{components:t,...n}=e;return(0,a.kt)(p,(0,r.Z)({},s,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:null},"Name"),(0,a.kt)("th",{parentName:"tr",align:null},"Description"),(0,a.kt)("th",{parentName:"tr",align:null},"Type"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("inlineCode",{parentName:"td"},"id")),(0,a.kt)("td",{parentName:"tr",align:null},"The ID of the view to be deleted."),(0,a.kt)("td",{parentName:"tr",align:null},"number")))))}c.isMDXComponent=!0;n(34259);var m=n(18679);const u={toc:[]},d="wrapper";function f(e){let{components:t,...n}=e;return(0,a.kt)(d,(0,r.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)(m.Z,{value:"js",label:"JavaScript",mdxType:"TabItem"},(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"// Assumes shellUI has been initialized with IShellUI instance\nconst results = await shellUI.Vault.ViewsOperations.DeleteView({\n  id: 0,\n});\n"))))}f.isMDXComponent=!0;const y={toc:[]},k="wrapper";function w(e){let{components:t,...n}=e;return(0,a.kt)(k,(0,r.Z)({},y,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"Deletes the specified view from the user's view collection."))}w.isMDXComponent=!0;const b={},g="DeleteView",v={unversionedId:"gRPC/Interfaces/ViewsOperations/DeleteView/index",id:"gRPC/Interfaces/ViewsOperations/DeleteView/index",title:"DeleteView",description:"Syntax",source:"@site/docs/gRPC/Interfaces/ViewsOperations/DeleteView/index.mdx",sourceDirName:"gRPC/Interfaces/ViewsOperations/DeleteView",slug:"/gRPC/Interfaces/ViewsOperations/DeleteView/",permalink:"/Frameworks/User-Interface-Extensibility-Framework/Reference/gRPC/Interfaces/ViewsOperations/DeleteView/",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"ViewsOperations",permalink:"/Frameworks/User-Interface-Extensibility-Framework/Reference/gRPC/Interfaces/ViewsOperations/"},next:{title:"GetViews",permalink:"/Frameworks/User-Interface-Extensibility-Framework/Reference/gRPC/Interfaces/ViewsOperations/GetViews/"}},h={},x=[{value:"Syntax",id:"syntax",level:2},{value:"Message",id:"message",level:2},{value:"Return type",id:"return-type",level:2}],O={toc:x},D="wrapper";function N(e){let{components:t,...n}=e;return(0,a.kt)(D,(0,r.Z)({},O,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"deleteview"},"DeleteView"),(0,a.kt)(w,{components:n.components,mdxType:"Description"}),(0,a.kt)("h2",{id:"syntax"},"Syntax"),(0,a.kt)(f,{components:n.components,mdxType:"Syntax"}),(0,a.kt)("h2",{id:"message"},"Message"),(0,a.kt)(c,{components:n.components,mdxType:"Message"}),(0,a.kt)("h2",{id:"return-type"},"Return type"),(0,a.kt)(l,{components:n.components,mdxType:"Returns"}))}N.isMDXComponent=!0}}]);