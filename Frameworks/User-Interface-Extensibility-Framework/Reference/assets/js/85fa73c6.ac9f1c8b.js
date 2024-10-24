"use strict";(self.webpackChunkuix_2=self.webpackChunkuix_2||[]).push([[7003],{3905:(e,t,a)=>{a.d(t,{Zo:()=>d,kt:()=>u});var n=a(67294);function i(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function r(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function o(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?r(Object(a),!0).forEach((function(t){i(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):r(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function l(e,t){if(null==e)return{};var a,n,i=function(e,t){if(null==e)return{};var a,n,i={},r=Object.keys(e);for(n=0;n<r.length;n++)a=r[n],t.indexOf(a)>=0||(i[a]=e[a]);return i}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(n=0;n<r.length;n++)a=r[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(i[a]=e[a])}return i}var s=n.createContext({}),p=function(e){var t=n.useContext(s),a=t;return e&&(a="function"==typeof e?e(t):o(o({},t),e)),a},d=function(e){var t=p(e.components);return n.createElement(s.Provider,{value:t},e.children)},c="mdxType",h={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var a=e.components,i=e.mdxType,r=e.originalType,s=e.parentName,d=l(e,["components","mdxType","originalType","parentName"]),c=p(a),m=i,u=c["".concat(s,".").concat(m)]||c[m]||h[m]||r;return a?n.createElement(u,o(o({ref:t},d),{},{components:a})):n.createElement(u,o({ref:t},d))}));function u(e,t){var a=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var r=a.length,o=new Array(r);o[0]=m;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[c]="string"==typeof e?e:i,o[1]=l;for(var p=2;p<r;p++)o[p]=a[p];return n.createElement.apply(null,o)}return n.createElement.apply(null,a)}m.displayName="MDXCreateElement"},71788:(e,t,a)=>{a.d(t,{Z:()=>r});var n=a(67294),i=a(34274);function r(e){let{children:t}=e;return n.createElement("div",{className:i.Z.filetitle},t)}},20675:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>p,contentTitle:()=>l,default:()=>b,frontMatter:()=>o,metadata:()=>s,toc:()=>d});var n=a(87462),i=(a(67294),a(3905)),r=a(71788);const o={sidebar_position:0},l="Application Structure",s={unversionedId:"Overview/ApplicationStructure",id:"Overview/ApplicationStructure",title:"Application Structure",description:"Each UI Extension Application is a JavaScript application that extends the core functionality of the assocaited M-Files client. Each application can use the UI Extension API to interact with other areas of the UI, and the Vault API to interact with the vault structure and ocntents.",source:"@site/docs/Overview/ApplicationStructure.mdx",sourceDirName:"Overview",slug:"/Overview/ApplicationStructure",permalink:"/Frameworks/User-Interface-Extensibility-Framework/Reference/Overview/ApplicationStructure",draft:!1,tags:[],version:"current",sidebarPosition:0,frontMatter:{sidebar_position:0},sidebar:"tutorialSidebar",previous:{title:"Overview",permalink:"/Frameworks/User-Interface-Extensibility-Framework/Reference/Overview/"},next:{title:"Modules",permalink:"/Frameworks/User-Interface-Extensibility-Framework/Reference/Overview/Modules"}},p={},d=[{value:"Application Package",id:"application-package",level:2},{value:"Application Manifest",id:"application-manifest",level:2},{value:"Modules",id:"modules",level:3},{value:"Dashboards",id:"dashboards",level:3},{value:"M-Files Extensibility Protocol Library in Dashboard HTML File",id:"m-files-extensibility-protocol-library-in-dashboard-html-file",level:3},{value:"Additional Resources",id:"additional-resources",level:3}],c=e=>function(t){return console.warn("Component "+e+" was not imported, exported, or provided by MDXProvider as global scope"),(0,i.kt)("div",t)},h=c("Tabs"),m=c("TabItem"),u={toc:d},f="wrapper";function b(e){let{components:t,...a}=e;return(0,i.kt)(f,(0,n.Z)({},u,a,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"application-structure"},"Application Structure"),(0,i.kt)("p",null,"Each UI Extension Application is a JavaScript application that extends the core functionality of the assocaited M-Files client. Each application can use the UI Extension API to interact with other areas of the UI, and the Vault API to interact with the vault structure and ocntents."),(0,i.kt)("h2",{id:"application-package"},"Application Package"),(0,i.kt)("p",null,'The "Application Package" is a .zip file, e.g. ',(0,i.kt)("inlineCode",{parentName:"p"},"Application.zip"),", which contains the Application Manifest ()",(0,i.kt)("inlineCode",{parentName:"p"},"appdef.xml"),"), at least one module file, and all other associated resources such as HTML, CSS, images, or other files needed for the application to run."),(0,i.kt)(r.Z,{mdxType:"FileTitle"},"Application.zip"),(0,i.kt)(h,{mdxType:"Tabs"},(0,i.kt)(m,{value:"xml",label:"XML",mdxType:"TabItem"},(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-xml"},"\u251c\u2500\u2500 appdef.xml\n\u251c\u2500\u2500 main.js\n\u251c\u2500\u2500 dashboard.html\n\u2514\u2500\u2500 public\n    \u251c\u2500\u2500 logo.png\n    \u251c\u2500\u2500 styles.css\n    \u2514\u2500\u2500 dashboard.js\n\n")))),(0,i.kt)("admonition",{type:"note"},(0,i.kt)("p",{parentName:"admonition"},"Application Packages typically have a ",(0,i.kt)("inlineCode",{parentName:"p"},".mfappx")," extension when distributed to differentiate them from the normal .zip files.")),(0,i.kt)("h2",{id:"application-manifest"},"Application Manifest"),(0,i.kt)("p",null,"The application manifest file - ",(0,i.kt)("inlineCode",{parentName:"p"},"appdef.xml")," defines common attributes such as the application GUID, its name and version and also ties together the other files which are needed to make the application run. Each application manifest must refer to at least one module, and often also refer to one or more dashboards."),(0,i.kt)(r.Z,{mdxType:"FileTitle"},"appdef.xml"),(0,i.kt)(h,{mdxType:"Tabs"},(0,i.kt)(m,{value:"xml",label:"XML",mdxType:"TabItem"},(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-xml"},'<?xml version="1.0"?>\n<application xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\n  xsi:noNamespaceSchemaLocation="http://www.m-files.com/schemas/appdef-client-v5.xsd">\n    <guid>5EA29AF2-1EC9-4AB7-A0D1-FE1D586310D4</guid>\n    <name>Name of Application Extension</name>\n    <version>0.1</version>\n    <description>Description of the App</description>\n    <publisher>ACME Corporation</publisher>\n    <enabled-by-default>true</enabled-by-default>\n    <modules>\n        <module environment="shellui">\n            <file>main.js</file>\n        </module>\n    </modules>\n</application>\n')))),(0,i.kt)("h3",{id:"modules"},"Modules"),(0,i.kt)("p",null,"The ",(0,i.kt)("a",{parentName:"p",href:"../Modules"},"modules")," define the entrypoint(s) for your application. These are defined by the ",(0,i.kt)("inlineCode",{parentName:"p"},"<module />")," element(s) in the ",(0,i.kt)("a",{parentName:"p",href:"#application-manifest"},"application manifest"),". Each module must specify at least one JavaScript file (",(0,i.kt)("inlineCode",{parentName:"p"},"<file />"),") which defines the ",(0,i.kt)("inlineCode",{parentName:"p"},"OnNewShellUI")," function which will be called when the application starts."),(0,i.kt)("p",null,"You can learn more about modules from the ",(0,i.kt)("a",{parentName:"p",href:"../Modules"},"modules page"),"."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-xml"},'    \x3c!-- inside appdef.xml --\x3e\n    <modules>\n        <module environment="shellui">\n            <file>main.js</file>\n        </module>\n    </modules>\n')),(0,i.kt)("h3",{id:"dashboards"},"Dashboards"),(0,i.kt)("p",null,"Dashboards are HTML pages that are shown within either a custom tab or within a popup dialog. These dashboards are not shown by default, but must be referenced by their ",(0,i.kt)("strong",{parentName:"p"},"dashboard id")," from within your code."),(0,i.kt)("admonition",{type:"note"},(0,i.kt)("p",{parentName:"admonition"},"For a complete example see ",(0,i.kt)("a",{parentName:"p",href:"../../Samples/PopupDashboard/#creating-the-application-definition-file"},"Sample for Popup Dashboard"))),(0,i.kt)("p",null,"Each dashboard has a ",(0,i.kt)("strong",{parentName:"p"},"Dashboard id")," defined in XML like ",(0,i.kt)("inlineCode",{parentName:"p"},'<dashboard id="MySample">'),". The file that contains the HTML content is defined in the ",(0,i.kt)("inlineCode",{parentName:"p"},"<content>")," element:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-xml"},'    <dashboards>\n        <dashboard id="MySample">\n            <content>index.html</content>\n        </dashboard>\n    </dashboards>\n')),(0,i.kt)("p",null,"The dashboard id is used by the UI Extensions to open the Dashboard, for example when using ",(0,i.kt)("a",{parentName:"p",href:"../Dashboards#open-a-popup-dashboard"},"ShowPopupDashboard")," method."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-javascript"},"// opens Dashboard with id \"MySample\"\nshellFrame.ShowPopupDashboard('MySample', {})\n")),(0,i.kt)("h3",{id:"m-files-extensibility-protocol-library-in-dashboard-html-file"},"M-Files Extensibility Protocol Library in Dashboard HTML File"),(0,i.kt)("p",null,"The HTML file (e.g. ",(0,i.kt)("inlineCode",{parentName:"p"},"index.html"),", which is mentioned in the application manifest) loads the resources required to show the content of the dashboard. Here, we should include a special script resource called ",(0,i.kt)("inlineCode",{parentName:"p"},"mfiles.extensibility.protocol.js"),".\nThe actual content of the ",(0,i.kt)("inlineCode",{parentName:"p"},"M-Files Extensibility Protocol library")," is served from M-Files Server when it loads Dashboard, which ensures that the content is aligned with M-Files Server."),(0,i.kt)("p",null,"The ",(0,i.kt)("inlineCode",{parentName:"p"},"M-Files Extensibility Protocol library")," acts as a layer between your application and the M-Files UIX application framework."),(0,i.kt)(r.Z,{mdxType:"FileTitle"},"dashboard.html"),(0,i.kt)(h,{mdxType:"Tabs"},(0,i.kt)(m,{value:"html",label:"HTML",mdxType:"TabItem"},(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-html"},'<!doctype html>\n<html lang="en">\n  <head>\n    <title>Sample</title>\n    \n    \x3c!-- Load M-Files Extensibility Framework library file --\x3e\n    <script src="mfiles.extensibility.protocol.js"><\/script>\n\n    \x3c!-- Load styles and dashboard handler js file --\x3e\n    <link href="style.css" rel="stylesheet" />\n    <script src="dashboard.js"><\/script>\n  </head>\n  <body>\n    <div id="content"></div>\n  </body>\n</html>\n')))),(0,i.kt)("h3",{id:"additional-resources"},"Additional Resources"),(0,i.kt)("p",null,"The ",(0,i.kt)("a",{parentName:"p",href:"#application-package"},"Application Package")," can include images, CSS files or other resources needed by the UI Extension. These may include images, CSS files, or other such supporting content. These files are not referenced within the ",(0,i.kt)("a",{parentName:"p",href:"#application-manifest"},"application manifest"),", but instead referenced from the dashboard where they are needed:"),(0,i.kt)(r.Z,{mdxType:"FileTitle"},"dashboard.html"),(0,i.kt)(h,{mdxType:"Tabs"},(0,i.kt)(m,{value:"html",label:"HTML",mdxType:"TabItem"},(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-html"},'<!doctype html>\n<html lang="en">\n  <head>\n    <title>Sample</title>\n\n    \x3c!-- Load M-Files Extensibility Framework library file --\x3e\n    <script src="mfiles.extensibility.protocol.js"><\/script>\n\n    \x3c!--\n            Load styles and dashboard handler js file.  These are expected to be in the same directory as the dashboard file\n        --\x3e\n    <link href="style.css" rel="stylesheet" />\n    <script src="dashboard.js"><\/script>\n  </head>\n</html>\n')))))}b.isMDXComponent=!0},34274:(e,t,a)=>{a.d(t,{Z:()=>n});const n={note:"note_XMqZ",idea:"idea_NLbw",highlight:"highlight_NFmx",filetitle:"filetitle_Jrus"}}}]);