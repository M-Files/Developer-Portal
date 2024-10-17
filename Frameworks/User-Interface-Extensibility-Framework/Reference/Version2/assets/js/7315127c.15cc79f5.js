"use strict";(self.webpackChunkuix_2=self.webpackChunkuix_2||[]).push([[334],{3905:(e,t,n)=>{n.d(t,{Zo:()=>h,kt:()=>u});var a=n(67294);function l(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){l(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function r(e,t){if(null==e)return{};var n,a,l=function(e,t){if(null==e)return{};var n,a,l={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(l[n]=e[n]);return l}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(l[n]=e[n])}return l}var s=a.createContext({}),d=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},h=function(e){var t=d(e.components);return a.createElement(s.Provider,{value:t},e.children)},c="mdxType",p={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var n=e.components,l=e.mdxType,o=e.originalType,s=e.parentName,h=r(e,["components","mdxType","originalType","parentName"]),c=d(n),m=l,u=c["".concat(s,".").concat(m)]||c[m]||p[m]||o;return n?a.createElement(u,i(i({ref:t},h),{},{components:n})):a.createElement(u,i({ref:t},h))}));function u(e,t){var n=arguments,l=t&&t.mdxType;if("string"==typeof e||l){var o=n.length,i=new Array(o);i[0]=m;var r={};for(var s in t)hasOwnProperty.call(t,s)&&(r[s]=t[s]);r.originalType=e,r[c]="string"==typeof e?e:l,i[1]=r;for(var d=2;d<o;d++)i[d]=n[d];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},71788:(e,t,n)=>{n.d(t,{Z:()=>o});var a=n(67294),l=n(34274);function o(e){let{children:t}=e;return a.createElement("div",{className:l.Z.filetitle},t)}},84473:(e,t,n)=>{n.d(t,{Z:()=>o});var a=n(67294),l=n(34274);function o(e){let{children:t}=e;return a.createElement("span",{className:l.Z.highlight},t)}},54930:(e,t,n)=>{n.d(t,{Z:()=>o});var a=n(67294),l=n(34274);function o(e){let{children:t}=e;return a.createElement("div",{className:l.Z.idea},t)}},51697:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>d,default:()=>y,frontMatter:()=>s,metadata:()=>h,toc:()=>p});var a=n(87462),l=(n(67294),n(3905)),o=n(84473),i=n(54930),r=n(71788);const s={sidebar_position:5,sidebar_label:"PopUp Dashboard & Accent Color"},d="PopUp Dashboard",h={unversionedId:"Samples/PopUpDashboardWithAccentColor/index",id:"Samples/PopUpDashboardWithAccentColor/index",title:"PopUp Dashboard",description:"Overview",source:"@site/docs/Samples/PopUpDashboardWithAccentColor/index.mdx",sourceDirName:"Samples/PopUpDashboardWithAccentColor",slug:"/Samples/PopUpDashboardWithAccentColor/",permalink:"/Frameworks/User-Interface-Extensibility-Framework/Reference/Version2/Samples/PopUpDashboardWithAccentColor/",draft:!1,tags:[],version:"current",sidebarPosition:5,frontMatter:{sidebar_position:5,sidebar_label:"PopUp Dashboard & Accent Color"},sidebar:"tutorialSidebar",previous:{title:"PopUp Dashboard",permalink:"/Frameworks/User-Interface-Extensibility-Framework/Reference/Version2/Samples/PopupDashboard/"},next:{title:"ShellFrame & Dashboard",permalink:"/Frameworks/User-Interface-Extensibility-Framework/Reference/Version2/Samples/ShellFrameAndDashboard/"}},c={},p=[{value:"Overview",id:"overview",level:2},{value:"Downloading the Template",id:"downloading-the-template",level:2},{value:"The application structure",id:"the-application-structure",level:2},{value:"The application definition file",id:"the-application-definition-file",level:3},{value:"Creating the module",id:"creating-the-module",level:3},{value:"Creating a button in the main menu",id:"creating-a-button-in-the-main-menu",level:2},{value:"Creating the dashboard",id:"creating-the-dashboard",level:2},{value:"Show the dashboard on clicking button",id:"show-the-dashboard-on-clicking-button",level:2},{value:"Using accent color",id:"using-accent-color",level:2}],m=e=>function(t){return console.warn("Component "+e+" was not imported, exported, or provided by MDXProvider as global scope"),(0,l.kt)("div",t)},u=m("Tabs"),b=m("TabItem"),g={toc:p},f="wrapper";function y(e){let{components:t,...s}=e;return(0,l.kt)(f,(0,a.Z)({},g,s,{components:t,mdxType:"MDXLayout"}),(0,l.kt)("h1",{id:"popup-dashboard"},"PopUp Dashboard"),(0,l.kt)("h2",{id:"overview"},"Overview"),(0,l.kt)("p",null,"In this sample we use a Visual Studio 2022 template that is provided by M-Files to create a simple a basic User Interface Extensibility Framework application."),(0,l.kt)("p",null,"This sample consisting of one ShellUI module which adds one button to main menu and it will opens one dashboard to the popup. Also it shows how accent color option can be retrived and used in our UI extesion applicaton."),(0,l.kt)("h2",{id:"downloading-the-template"},"Downloading the Template"),(0,l.kt)("p",null,"The UIX templates are part of the ",(0,l.kt)(o.Z,{mdxType:"Highlight"},"M-Files Online Visual Studio template package"),", which can be downloaded from the ",(0,l.kt)("a",{parentName:"p",href:"https://developer.m-files.com/Frameworks/User-Interface-Extensibility-Framework/Visual-Studio/"},"Visual Studio Marketplace"),"."),(0,l.kt)("h2",{id:"the-application-structure"},"The application structure"),(0,l.kt)("h3",{id:"the-application-definition-file"},"The application definition file"),(0,l.kt)("p",null,"In the App folder there is a file named ",(0,l.kt)(o.Z,{mdxType:"Highlight"},"appdef.xml"),", the application manifest file, containing information such as the publisher details and the current version number. We modified existing manifest file according on our sample application. The application will use version 5 of the client schema (as we are only targeting newer M-Files versions). The application will declare a single Shell UI module (with its code in ",(0,l.kt)(o.Z,{mdxType:"Highlight"},"main.js"),")."),(0,l.kt)(r.Z,{mdxType:"FileTitle"},"appdef.xml"),(0,l.kt)(u,{mdxType:"Tabs"},(0,l.kt)(b,{value:"xml",label:"XML",mdxType:"TabItem"},(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-xml"},'<?xml version="1.0"?>\n<application xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="http://www.m-files.com/schemas/appdef-client-v5.xsd">\n  <guid>83A5DD0A-E386-454E-B5AB-3D52AF13B7C3</guid>\n  <name>PopUp Dashboard</name>\n  <version>0.1</version>\n  <description>A basic application showing how to work with popup dashboards.</description>\n  <publisher>M-Files Corporation</publisher>\n  <enabled-by-default>true</enabled-by-default>\n  <modules>\n    <module environment="shellui">\n      <file>main.js</file>\n    </module>\n  </modules>\n  <dashboards>\n    <dashboard id="MyPopUpDashboard">\n      <content>index.html</content>\n    </dashboard>\n  </dashboards>\n</application>\n\n')))),(0,l.kt)(i.Z,{mdxType:"Idea"},"Ensure that your application has a unique GUID by using a GUID generator."),(0,l.kt)("h3",{id:"creating-the-module"},"Creating the module"),(0,l.kt)("p",null,"Next we will create a module file to contain our actual application logic. At this point we will just register to be notified of main lifecycle events:"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"We will declare a default entry point for the ShellUI module."),(0,l.kt)("li",{parentName:"ul"},"We will react to the ",(0,l.kt)(o.Z,{mdxType:"Highlight"},"OnNewShellUI")," event and obtain a reference to the shell frame."),(0,l.kt)("li",{parentName:"ul"},"We will react to the shell frame\u2019s ",(0,l.kt)(o.Z,{mdxType:"Highlight"},"onStarted")," event (as using the shell frame before this point will result in an exception).")),(0,l.kt)(r.Z,{mdxType:"FileTitle"},"main.js"),(0,l.kt)(u,{mdxType:"Tabs"},(0,l.kt)(b,{value:"js",label:"JavaScript",mdxType:"TabItem"},(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-js"},'// NOTE! This code is for demonstration purposes only and does not contain any kind of\n//       error handling. MUST be revised before using in production.\n\nfunction OnNewShellUI(shellUI) {\n  /// <summary>Executed by the UIX when a ShellUI module is started.</summary>\n  /// <param name="shellUI" type="MFiles.ShellUI">The shell UI object which was created.</param>\n\n  // This is the start point of a ShellUI module.\n\n  // Register to be notified when a new shell frame (MFiles.Event.NewShellFrame) is created.\n  shellUI.Events.Register(MFiles.Event.NewShellFrame, onNewNormalShellFrame)\n}\n\nfunction onNewNormalShellFrame(shellFrame) {\n  // Add tab to right pane, when the shell frame is started.\n  shellFrame.Events.Register(MFiles.Event.Started, onStarted)\n\n  // NOTE: to be on the safe side, handle the callback in "async" function and await all the\n  // return values, because when the postMessage API is used, all return values will be async.\n  async function onStarted() {}\n}\n')))),(0,l.kt)("h2",{id:"creating-a-button-in-the-main-menu"},"Creating a button in the main menu"),(0,l.kt)("p",null,"Adding a button into the main menu involves two steps:"),(0,l.kt)("ol",null,(0,l.kt)("li",{parentName:"ol"},"Creating a new ",(0,l.kt)(o.Z,{mdxType:"Highlight"},"ICommand")," using CreateCustomCommand."),(0,l.kt)("li",{parentName:"ol"},"Adding the command into the task area using AddCustomCommandToMenu.")),(0,l.kt)(r.Z,{mdxType:"FileTitle"},"main.js"),(0,l.kt)(u,{mdxType:"Tabs"},(0,l.kt)(b,{value:"js",label:"JavaScript",mdxType:"TabItem"},(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-js"},'// NOTE! This code is for demonstration purposes only and does not contain any kind of\n//       error handling. MUST be revised before using in production.\n\nfunction OnNewShellUI(shellUI) {\n  /// <summary>Executed by the UIX when a ShellUI module is started.</summary>\n  /// <param name="shellUI" type="MFiles.ShellUI">The shell UI object which was created.</param>\n\n  // This is the start point of a ShellUI module.\n\n  // Register to be notified when a new shell frame (MFiles.Event.NewShellFrame) is created.\n  shellUI.Events.Register(MFiles.Event.NewShellFrame, onNewNormalShellFrame)\n}\n\nfunction onNewNormalShellFrame(shellFrame) {\n  // Add tab to right pane, when the shell frame is started.\n  shellFrame.Events.Register(MFiles.Event.Started, onStarted)\n\n  // NOTE: to be on the safe side, handle the callback in "async" function and await all the\n  // return values, because when the postMessage API is used, all return values will be async.\n  async function onStarted() {\n    const myCommand = await shellFrame.Commands.CreateCustomCommand(\n      \'Show my popup dashboard\',\n    )\n    await shellFrame.Commands.AddCustomCommandToMenu(\n      myCommand,\n      MFiles.MenuLocation.MenuLocation_TopPaneMenu,\n      1,\n    )\n  }\n}\n')))),(0,l.kt)("p",null,"Logging into the M-Files vault should now show a button in the main menu (three dot menu near user icon) with the text ",(0,l.kt)(o.Z,{mdxType:"Highlight"},"Show my popup dashboard"),":"),(0,l.kt)("p",null,(0,l.kt)("img",{alt:" alt text ",src:n(27714).Z,title:"Comman in main menu",width:"1221",height:"220"})),(0,l.kt)("h2",{id:"creating-the-dashboard"},"Creating the dashboard"),(0,l.kt)("p",null,"Next we will create a dashboard file that will be shown in the popup. It involves two steps:"),(0,l.kt)("ol",null,(0,l.kt)("li",{parentName:"ol"},"Modifying existing ",(0,l.kt)(o.Z,{mdxType:"Highlight"},"index.html")," file which will load styles and dashboard handler."),(0,l.kt)("li",{parentName:"ol"},"Modifying existing ",(0,l.kt)(o.Z,{mdxType:"Highlight"},"dashboard.js")," file which will handle the dashboard.")),(0,l.kt)(r.Z,{mdxType:"FileTitle"},"index.html"),(0,l.kt)(u,{mdxType:"Tabs"},(0,l.kt)(b,{value:"html",label:"HTML",mdxType:"TabItem"},(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-html"},'<!doctype html>\n<html lang="en">\n  <head>\n    <title>My Popup Dashboard</title>\n    <script src="mfiles.extensibility.protocol.js"><\/script>\n\n    \x3c!-- Load styles and dashboard handler js file --\x3e\n    <link href="style.css" rel="stylesheet" />\n    <script src="dashboard.js"><\/script>\n  </head>\n  <body>\n    <div id="content">\n      <h2>Welcome to M-Files!</h2>\n    </div>\n  </body>\n</html>\n')))),(0,l.kt)("p",null,"Create dashboard handler using ",(0,l.kt)(o.Z,{mdxType:"Highlight"},"OnNewDashboard")," event."),(0,l.kt)(r.Z,{mdxType:"FileTitle"},"dashboard.js"),(0,l.kt)(u,{mdxType:"Tabs"},(0,l.kt)(b,{value:"js",label:"JavaScript",mdxType:"TabItem"},(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-js"},"async function OnNewDashboard(dashboard) {}\n")))),(0,l.kt)("h2",{id:"show-the-dashboard-on-clicking-button"},"Show the dashboard on clicking button"),(0,l.kt)("p",null,"Showing dashboard while clicking a command clicked involves three steps:"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"Register to be notified of the CustomCommand event."),(0,l.kt)("li",{parentName:"ul"},"Ensure that the command that was clicked was the one we want to handle."),(0,l.kt)("li",{parentName:"ul"},"Call ",(0,l.kt)(o.Z,{mdxType:"Highlight"},"ShowPopupDashboard")," from ",(0,l.kt)(o.Z,{mdxType:"Highlight"},"shellframe")," instance.\nWe will have three parameters for this ",(0,l.kt)(o.Z,{mdxType:"Highlight"},"ShowPopupDashboard"),(0,l.kt)("ol",{parentName:"li"},(0,l.kt)("li",{parentName:"ol"},"Id of the dashboard which is mentioned in the ",(0,l.kt)(o.Z,{mdxType:"Highlight"},"appdef.xml"),". Ex. ",(0,l.kt)(o.Z,{mdxType:"Highlight"},"MyPopUpDashboard")),(0,l.kt)("li",{parentName:"ol"},(0,l.kt)(o.Z,{mdxType:"Highlight"},"data")," - Custom data needs to be passed to dashboard."),(0,l.kt)("li",{parentName:"ol"},(0,l.kt)(o.Z,{mdxType:"Highlight"},"title")," - The title of the popup dashboard.")))),(0,l.kt)(r.Z,{mdxType:"FileTitle"},"main.js"),(0,l.kt)(u,{mdxType:"Tabs"},(0,l.kt)(b,{value:"js",label:"JavaScript",mdxType:"TabItem"},(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-js"},"// NOTE! This code is for demonstration purposes only and does not contain any kind of\n//       error handling. MUST be revised before using in production.\n\nfunction OnNewShellUI(shellUI) {\n  /// <summary>Executed by the UIX when a ShellUI module is started.</summary>\n  /// <param name=\"shellUI\" type=\"MFiles.ShellUI\">The shell UI object which was created.</param>\n\n  // This is the start point of a ShellUI module.\n\n  // Register to be notified when a new shell frame (MFiles.Event.NewShellFrame) is created.\n  shellUI.Events.Register(MFiles.Event.NewShellFrame, onNewNormalShellFrame)\n}\n\nfunction onNewNormalShellFrame(shellFrame) {\n  // Add tab to right pane, when the shell frame is started.\n  shellFrame.Events.Register(MFiles.Event.Started, onStarted)\n\n  // NOTE: to be on the safe side, handle the callback in \"async\" function and await all the\n  // return values, because when the postMessage API is used, all return values will be async.\n  async function onStarted() {\n    const myCommand = await shellFrame.Commands.CreateCustomCommand(\n      'Show my popup dashboard',\n    )\n    await shellFrame.Commands.AddCustomCommandToMenu(\n      myCommand,\n      MFiles.MenuLocation.MenuLocation_TopPaneMenu,\n      1,\n    )\n    await shellFrame.Commands.Events.Register(\n      MFiles.Event.CustomCommand,\n      (command) => {\n        // Execute only our custom command.\n        if (command === myCommand) {\n          shellFrame.ShowPopupDashboard(\n            'MyPopUpDashboard',\n            {},\n            'My popup dashboard',\n          )\n        }\n      },\n    )\n  }\n}\n")))),(0,l.kt)("p",null,(0,l.kt)("img",{alt:" alt text ",src:n(44584).Z,title:"Popup dashboard",width:"1918",height:"951"})),(0,l.kt)("h2",{id:"using-accent-color"},"Using accent color"),(0,l.kt)("p",null,"In the ",(0,l.kt)(o.Z,{mdxType:"Highlight"},"M-files Admin")," you can specify the accent color that you want to use in M-Files Web. The accent color has an effect, for example, on the header, the scrollbars, and some of the icons."),(0,l.kt)("p",null,"You can set the accent color value in ",(0,l.kt)(o.Z,{mdxType:"Highlight"},"Configurations")," -> ",(0,l.kt)(o.Z,{mdxType:"Highlight"},"Advanced Value Settings")," -> ",(0,l.kt)(o.Z,{mdxType:"Highlight"},"Configuration")," -> ",(0,l.kt)(o.Z,{mdxType:"Highlight"},"Client")," -> ",(0,l.kt)(o.Z,{mdxType:"Highlight"},"Web")," -> ",(0,l.kt)(o.Z,{mdxType:"Highlight"},"Appearance")),(0,l.kt)("p",null,(0,l.kt)("img",{alt:" alt text ",src:n(45399).Z,title:"Accent color",width:"1393",height:"938"})),(0,l.kt)("p",null,"We can retrive the accent color value and use it in our custom extension application."),(0,l.kt)(r.Z,{mdxType:"FileTitle"},"dashboard.js"),(0,l.kt)(u,{mdxType:"Tabs"},(0,l.kt)(b,{value:"js",label:"JavaScript",mdxType:"TabItem"},(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-js"},"async function OnNewDashboard(dashboard) {\n  const accentColor = await MFiles.GetAccentColor()\n  document\n    .querySelector(':root')\n    .style.setProperty('--scrollbar-thumb-color', accentColor)\n  document.getElementById('accentColorValue').innerHTML = accentColor\n}\n")))),(0,l.kt)(r.Z,{mdxType:"FileTitle"},"index.html"),(0,l.kt)(u,{mdxType:"Tabs"},(0,l.kt)(b,{value:"html",label:"HTML",mdxType:"TabItem"},(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-html"},'<!doctype html>\n<html lang="en">\n  <head>\n    <title>My Popup Dashboard</title>\n    <script src="mfiles.extensibility.protocol.js"><\/script>\n\n    \x3c!-- Load styles and dashboard handler js file --\x3e\n    <link href="style.css" rel="stylesheet" />\n    <script src="dashboard.js"><\/script>\n  </head>\n  <body>\n    <div id="content">\n      <h2>A simple scrollable DIV</h2>\n      <div>Accent color: <span id="accentColorValue"></span></div>\n      <div id="scrollableDIV">\n        <h3>AI-Driven Automation</h3>\n        <p>\n          M-Files helps automate the entire knowledge work process from document\n          creation and management to workflow automation, external\n          collaboration, enterprise search, security, compliance, and audit\n          trail.\n        </p>\n        <p>\n          Powered by M-Files\' generative AI technology, M-Files Aino, the\n          platform helps organize information, understand the context of\n          documents, and interact with their organization\'s knowledge using\n          natural language.\n        </p>\n\n        <h3>Organize your content</h3>\n        <p>\n          M-Files adapts to the document flow and content of any organization.\n          Classifying documents and extracting their meaning optimizes knowledge\n          worker productivity by automating routines and ensuring information\n          can be easily found and used in the proper business context.\n        </p>\n      </div>\n    </div>\n  </body>\n</html>\n')))),(0,l.kt)(r.Z,{mdxType:"FileTitle"},"style.css"),(0,l.kt)(u,{mdxType:"Tabs"},(0,l.kt)(b,{value:"css",label:"CSS",mdxType:"TabItem"},(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-css"},"html,\nbody {\n  font-family: Lato, 'Segoe UI', Sans-Serif;\n  margin: 0;\n  background: #fff;\n  height: 100%;\n  font-size: 14px;\n  padding: 0 10px;\n}\n\n:root {\n  --scrollbar-thumb-color: black;\n}\n\ndiv {\n  padding: 4px 0;\n}\n\nspan {\n  font-weight: 500;\n}\n\n#scrollableDIV {\n  height: 200px;\n  overflow-y: scroll;\n  scrollbar-color: var(--scrollbar-thumb-color) lightgray;\n}\n")))),(0,l.kt)("p",null,"Now we can see scrollbar has same color as the accent color that we have set on M-Files Admin."),(0,l.kt)("p",null,(0,l.kt)("img",{alt:" alt text ",src:n(89357).Z,title:"Accent color",width:"1917",height:"962"})))}y.isMDXComponent=!0},34274:(e,t,n)=>{n.d(t,{Z:()=>a});const a={note:"note_XMqZ",idea:"idea_NLbw",highlight:"highlight_NFmx",filetitle:"filetitle_Jrus"}},27714:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/PopupDashboard_1-b38eca193ade9e2fed7c273cc4789dc5.png"},44584:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/PopupDashboard_2-ba439d4eb7c92837c375d2affce26d12.png"},45399:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/PopupDashboard_3-95810cfbccdcaf17f136755c138bf4a4.png"},89357:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/PopupDashboard_4-e950b489fe6bd98339a94d1ad00e3c3d.png"}}]);