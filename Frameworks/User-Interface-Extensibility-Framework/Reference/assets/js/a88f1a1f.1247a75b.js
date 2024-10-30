"use strict";(self.webpackChunkuix_2=self.webpackChunkuix_2||[]).push([[9167],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>f});var r=n(67294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=r.createContext({}),p=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},c=function(e){var t=p(e.components);return r.createElement(l.Provider,{value:t},e.children)},u="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,l=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),u=p(n),d=a,f=u["".concat(l,".").concat(d)]||u[d]||m[d]||i;return n?r.createElement(f,o(o({ref:t},c),{},{components:n})):r.createElement(f,o({ref:t},c))}));function f(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,o=new Array(i);o[0]=d;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[u]="string"==typeof e?e:a,o[1]=s;for(var p=2;p<i;p++)o[p]=n[p];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},12099:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>o,default:()=>m,frontMatter:()=>i,metadata:()=>s,toc:()=>p});var r=n(87462),a=(n(67294),n(3905));const i={sidebar_position:6,sidebar_label:"Upgrading applications"},o="Upgrading from previous versions",s={unversionedId:"upgrading",id:"upgrading",title:"Upgrading from previous versions",description:"This is a preview version of the User Interface Extensibility Framework v2.0.  Some features may be disabled or may still be under active development.",source:"@site/docs/upgrading.mdx",sourceDirName:".",slug:"/upgrading",permalink:"/Frameworks/User-Interface-Extensibility-Framework/Reference/upgrading",draft:!1,tags:[],version:"current",sidebarPosition:6,frontMatter:{sidebar_position:6,sidebar_label:"Upgrading applications"},sidebar:"tutorialSidebar",previous:{title:"Assign to me UIX sample",permalink:"/Frameworks/User-Interface-Extensibility-Framework/Reference/Samples/AssignToMe/"}},l={},p=[{value:"Commonalities with previous versions",id:"commonalities-with-previous-versions",level:2},{value:"Primary differences to previous versions",id:"primary-differences-to-previous-versions",level:2},{value:"Upgrade process",id:"upgrade-process",level:2}],c={toc:p},u="wrapper";function m(e){let{components:t,...n}=e;return(0,a.kt)(u,(0,r.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"upgrading-from-previous-versions"},"Upgrading from previous versions"),(0,a.kt)("admonition",{type:"note"},(0,a.kt)("p",{parentName:"admonition"},"This is a preview version of the User Interface Extensibility Framework v2.0.  Some features may be disabled or may still be under active development.")),(0,a.kt)("p",null,"Version 2.0 of the M-Files User Interface Extensibility Framework contains some significant differences to previous versions.  Depending upon the functionality of the application it may require significant refactoring for an application to run in the new framework version.  Some functionality may not be supported at all."),(0,a.kt)("h2",{id:"commonalities-with-previous-versions"},"Commonalities with previous versions"),(0,a.kt)("p",null,"Whilst there are some significant differences to previous versions of the framework, many concepts remain the same.  For example:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Applications are still ",(0,a.kt)("a",{parentName:"li",href:"../Overview/ApplicationStructure"},"structured")," and ",(0,a.kt)("a",{parentName:"li",href:"../Overview/InstallingApplications"},"deployed")," in the same way: as a zipped file, with a manifest describing the application and its primary components."),(0,a.kt)("li",{parentName:"ul"},"Applications still contain ",(0,a.kt)("a",{parentName:"li",href:"../Overview/Modules"},"modules"),", with those modules being the primary entry points to the application."),(0,a.kt)("li",{parentName:"ul"},"Applications can still add ",(0,a.kt)("a",{parentName:"li",href:"../Overview/Tabs"},"tabs"),", ",(0,a.kt)("a",{parentName:"li",href:"../Overview/Commands"},"commands"),", and show ",(0,a.kt)("a",{parentName:"li",href:"../Overview/Dashboards"},"dashboards"),"."),(0,a.kt)("li",{parentName:"ul"},"Many common UIX interfaces such as ",(0,a.kt)("a",{parentName:"li",href:"../UIExt2/Interfaces/IShellFrame"},(0,a.kt)("inlineCode",{parentName:"a"},"IShellFrame"))," remain the same and expose the same - or similar - functionality.")),(0,a.kt)("h2",{id:"primary-differences-to-previous-versions"},"Primary differences to previous versions"),(0,a.kt)("p",null,"The UIXv2 is designed in a fundamentally different way to previous versions of the framework, and these differences can have a profound impact on your application structure and functionality.  Some primary differences you will encounter:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"UI Extensions now run within a more modern browser context, not within the older embedded browser.  This enables you to use more modern development approaches and technologies."),(0,a.kt)("li",{parentName:"ul"},"API functions are typically asynchronous, and you must use async functions (or the Promise pattern) to await results of your actions."),(0,a.kt)("li",{parentName:"ul"},"The Vault API reference is fundamentally different.  Instead of using/mimicing the M-Files COM API, access is now available to a lower-level M-Files Vault API.  Data structures and method names that you may be used to in other environments may have changed in this one."),(0,a.kt)("li",{parentName:"ul"},"Technologies such as Managed Assemblies are not compatible with the User Interface Extensibility Framework 2.0."),(0,a.kt)("li",{parentName:"ul"},"UI Extension dashboards run within a sandboxed ",(0,a.kt)("inlineCode",{parentName:"li"},"<iframe />"),".  This introduces some limitations:",(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},"You cannot directly pass references to objects or functions using the dashboard's ",(0,a.kt)("inlineCode",{parentName:"li"},"CustomData"),".  Instead you should pass a command ID into the dashboard and then execute it from the dashboard."),(0,a.kt)("li",{parentName:"ul"},"You cannot access the properties and objects of the parent window directly.  Communications between windows should be done using the UI Extension API."))),(0,a.kt)("li",{parentName:"ul"},"Some UI constructs, such as the task pane, are not available on newer versions of the client.")),(0,a.kt)("h2",{id:"upgrade-process"},"Upgrade process"),(0,a.kt)("p",null,"It is important to note that upgrading a UI Extension from earlier versions of the framework is likely to be a non-trivial task, especially where the extension utilises the M-Files API to interact with the vault.  It is also important to note that some technologies - for example: Managed Assemblies - are not compatible with the User Interface Extensibility Framework 2.0."),(0,a.kt)("p",null,"To upgrade an application, you will need to perform the following broad process:"),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},"Take a copy of the existing application."),(0,a.kt)("li",{parentName:"ol"},"Alter the ",(0,a.kt)("a",{parentName:"li",href:"../Overview/ApplicationStructure"},"application manifest")," to use the new schema, the new module type, and ensure that the platform targets are correct."),(0,a.kt)("li",{parentName:"ol"},"Identify areas in your application where the UI will be different to previous clients; for example: if your application previously used the task pane then you will need to alter the approach to use the main menu instead."),(0,a.kt)("li",{parentName:"ol"},"Alter your module entry points to be asynchronous (",(0,a.kt)("inlineCode",{parentName:"li"},"async function OnNewShellUI(){ ... }"),")."),(0,a.kt)("li",{parentName:"ol"},"Work through all ",(0,a.kt)("a",{parentName:"li",href:"../UIExt2"},"UI Extension code")," to use the async/await pattern (e.g. when creating tabs or commands)."),(0,a.kt)("li",{parentName:"ol"},"Identify code that interacts with the M-Files vault, and alter it to use the new ",(0,a.kt)("a",{parentName:"li",href:"../gRPC"},"Vault API"),"."),(0,a.kt)("li",{parentName:"ol"},"Deploy your code into the M-Files vault, connect using the M-Files Web interface, and test/debug.")),(0,a.kt)("p",null,"Consider looking at the ",(0,a.kt)("a",{parentName:"p",href:"../Samples"},"samples")," to help guide with common approaches."))}m.isMDXComponent=!0}}]);