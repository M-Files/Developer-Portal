"use strict";(self.webpackChunkuix_2=self.webpackChunkuix_2||[]).push([[7873],{3905:(e,t,r)=>{r.d(t,{Zo:()=>p,kt:()=>h});var n=r(67294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var s=n.createContext({}),c=function(e){var t=n.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},p=function(e){var t=c(e.components);return n.createElement(s.Provider,{value:t},e.children)},u="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,s=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),u=c(r),d=a,h=u["".concat(s,".").concat(d)]||u[d]||m[d]||o;return r?n.createElement(h,i(i({ref:t},p),{},{components:r})):n.createElement(h,i({ref:t},p))}));function h(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,i=new Array(o);i[0]=d;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[u]="string"==typeof e?e:a,i[1]=l;for(var c=2;c<o;c++)i[c]=r[c];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}d.displayName="MDXCreateElement"},39939:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>s,contentTitle:()=>i,default:()=>m,frontMatter:()=>o,metadata:()=>l,toc:()=>c});var n=r(87462),a=(r(67294),r(3905));const o={sidebar_position:3},i="Vault API Reference Guide",l={unversionedId:"gRPC/gRPC",id:"gRPC/gRPC",title:"Vault API Reference Guide",description:"The M-Files User Interface Extensibility Framework 2.0 leverages the structures and methods defined within the M-Files gRPC API, thus has a slightly different structure and approach to other development environments such as the Vault Application Framework.",source:"@site/docs/gRPC/gRPC.mdx",sourceDirName:"gRPC",slug:"/gRPC/",permalink:"/Frameworks/User-Interface-Extensibility-Framework/Reference/Version2/gRPC/",draft:!1,tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3},sidebar:"tutorialSidebar",previous:{title:"VaultInfoReturnValue",permalink:"/Frameworks/User-Interface-Extensibility-Framework/Reference/Version2/UIExt2/Models/VaultInfoReturnValue/"},next:{title:"Enums",permalink:"/Frameworks/User-Interface-Extensibility-Framework/Reference/Version2/gRPC/Enums/"}},s={},c=[{value:"Delegating work to M-Files Server",id:"delegating-work-to-m-files-server",level:2}],p={toc:c},u="wrapper";function m(e){let{components:t,...r}=e;return(0,a.kt)(u,(0,n.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"vault-api-reference-guide"},"Vault API Reference Guide"),(0,a.kt)("p",null,"The M-Files User Interface Extensibility Framework 2.0 leverages the structures and methods defined within the M-Files gRPC API, thus has a slightly different structure and approach to other development environments such as the Vault Application Framework."),(0,a.kt)("p",null,"The gRPC API approach is inherently asynchronous by nature.  For example, retrieving the object types from the vault may look like this:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-javascript"},"function OnNewShellUI(shellUI){\n\u2002\u2002\u2002\u2002\u2002\u2002// Wait for the ShellFrame to be created and started\n    shellUI.Events.Register(\n        MFiles.Event.NewShellFrame,\n        shellFrame => {\n            shellFrame.Events.Register(\n                MFiles.Event.Started,\n                async () => {\n                    Start( shellUI, shellFrame )\n                });\n    });\n}\n\n// Main application\nasync function Start( shellUI, shellFrame ) {\n\u2002\u2002\u2002\u2002\u2002\u2002// Retrieve the object types from the vault.\n    const objectTypes = await shellUI.Vault.objectTypes.getObjectTypes();\n}\n")),(0,a.kt)("p",null,'Unlike older implementations of the User Interface Extensibility Framework, data provided to methods, and data returned from methods, are simple JavaScript objects; there is no need to declare "new MFiles.ObjVer()" or similar.  For example, creating a property value for use when creating an object might look like this:'),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-javascript"},'// Name or title property.\nconst nameOrTitlePropertyValue = {\n\u2002\u2002\u2002\u2002\u2002\u2002property_def: BuiltInPropertyDefs.NameOrTitle,\n\u2002\u2002\u2002\u2002\u2002\u2002value: {\n\u2002\u2002\u2002\u2002\u2002\u2002\u2002\u2002\u2002\u2002\u2002\u2002type: 1,  // Datatype.DATATYPE_TEXT,\n\u2002\u2002\u2002\u2002\u2002\u2002\u2002\u2002\u2002\u2002\u2002\u2002is_null: false,\n\u2002\u2002\u2002\u2002\u2002\u2002\u2002\u2002\u2002\u2002\u2002\u2002data: {\n\u2002\u2002\u2002\u2002\u2002\u2002\u2002\u2002\u2002\u2002\u2002\u2002\u2002\u2002\u2002\u2002\u2002\u2002text: "My object"\n\u2002\u2002\u2002\u2002\u2002\u2002\u2002\u2002\u2002\u2002\u2002\u2002}\n\u2002\u2002\u2002\u2002\u2002\u2002}\n};\n')),(0,a.kt)("p",null,"We have also preferred methods which naturally operate on multiple objects over methods that operate on just a single one.  For example: you will notice that ",(0,a.kt)("a",{parentName:"p",href:"Interfaces/ObjectOperations/CheckInMultiple"},"CheckInMultiple")," exists, but that there is no method that checks in just a single object.  If you do need to check in just one object then simply pass a single set of data in the various arrays."),(0,a.kt)("h2",{id:"delegating-work-to-m-files-server"},"Delegating work to M-Files Server"),(0,a.kt)("p",null,"When working within the User Interface Extensibility Framework, you may find that you need to make multiple calls to the M-Files server via the Vault API.  This can be verbose and difficult.  Instead you may decide to expose a ",(0,a.kt)("a",{parentName:"p",href:"https://developer.m-files.com/Built-In/VBScript/Vault-Extension-Methods/"},"Vault Extension Method")," and implement the complex logic on the server side, then call the vault extension method from your UI Extension:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-javascript"},"// TODO.\n")),(0,a.kt)("admonition",{type:"tip"},(0,a.kt)("p",{parentName:"admonition"},"Code run within a vault extension method will typically run within a single vault transaction.  For this reason alone it is often a good idea to run more complex code server-side and allow it to succeed or fail atomically.")))}m.isMDXComponent=!0}}]);