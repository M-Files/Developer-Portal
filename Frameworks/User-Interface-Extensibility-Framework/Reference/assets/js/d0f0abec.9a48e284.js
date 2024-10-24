"use strict";(self.webpackChunkuix_2=self.webpackChunkuix_2||[]).push([[1552],{3905:(e,t,n)=>{n.d(t,{Zo:()=>h,kt:()=>u});var a=n(67294);function l(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){l(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,a,l=function(e,t){if(null==e)return{};var n,a,l={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(l[n]=e[n]);return l}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(l[n]=e[n])}return l}var s=a.createContext({}),d=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},h=function(e){var t=d(e.components);return a.createElement(s.Provider,{value:t},e.children)},m="mdxType",p={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},c=a.forwardRef((function(e,t){var n=e.components,l=e.mdxType,r=e.originalType,s=e.parentName,h=o(e,["components","mdxType","originalType","parentName"]),m=d(n),c=l,u=m["".concat(s,".").concat(c)]||m[c]||p[c]||r;return n?a.createElement(u,i(i({ref:t},h),{},{components:n})):a.createElement(u,i({ref:t},h))}));function u(e,t){var n=arguments,l=t&&t.mdxType;if("string"==typeof e||l){var r=n.length,i=new Array(r);i[0]=c;var o={};for(var s in t)hasOwnProperty.call(t,s)&&(o[s]=t[s]);o.originalType=e,o[m]="string"==typeof e?e:l,i[1]=o;for(var d=2;d<r;d++)i[d]=n[d];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}c.displayName="MDXCreateElement"},71788:(e,t,n)=>{n.d(t,{Z:()=>r});var a=n(67294),l=n(34274);function r(e){let{children:t}=e;return a.createElement("div",{className:l.Z.filetitle},t)}},84473:(e,t,n)=>{n.d(t,{Z:()=>r});var a=n(67294),l=n(34274);function r(e){let{children:t}=e;return a.createElement("span",{className:l.Z.highlight},t)}},54930:(e,t,n)=>{n.d(t,{Z:()=>r});var a=n(67294),l=n(34274);function r(e){let{children:t}=e;return a.createElement("div",{className:l.Z.idea},t)}},10260:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>m,contentTitle:()=>d,default:()=>y,frontMatter:()=>s,metadata:()=>h,toc:()=>p});var a=n(87462),l=(n(67294),n(3905)),r=n(84473),i=n(54930),o=n(71788);const s={sidebar_position:6,sidebar_label:"ShellFrame & Dashboard"},d="ShellFrame & Dashboard",h={unversionedId:"Samples/ShellFrameAndDashboard/index",id:"Samples/ShellFrameAndDashboard/index",title:"ShellFrame & Dashboard",description:"Overview",source:"@site/docs/Samples/ShellFrameAndDashboard/index.mdx",sourceDirName:"Samples/ShellFrameAndDashboard",slug:"/Samples/ShellFrameAndDashboard/",permalink:"/Frameworks/User-Interface-Extensibility-Framework/Reference/Samples/ShellFrameAndDashboard/",draft:!1,tags:[],version:"current",sidebarPosition:6,frontMatter:{sidebar_position:6,sidebar_label:"ShellFrame & Dashboard"},sidebar:"tutorialSidebar",previous:{title:"PopUp Dashboard & Accent Color",permalink:"/Frameworks/User-Interface-Extensibility-Framework/Reference/Samples/PopUpDashboardWithAccentColor/"},next:{title:"Assign to me UIX sample",permalink:"/Frameworks/User-Interface-Extensibility-Framework/Reference/Samples/AssignToMe/"}},m={},p=[{value:"Overview",id:"overview",level:2},{value:"Dashboard",id:"dashboard",level:2},{value:"Application Manifest file",id:"application-manifest-file",level:3},{value:"Creating main menu",id:"creating-main-menu",level:3},{value:"Creating the dashboard file",id:"creating-the-dashboard-file",level:3},{value:"Dashboard handler",id:"dashboard-handler",level:3},{value:"Restoring default content",id:"restoring-default-content",level:2}],c=e=>function(t){return console.warn("Component "+e+" was not imported, exported, or provided by MDXProvider as global scope"),(0,l.kt)("div",t)},u=c("Tabs"),b=c("TabItem"),f={toc:p},g="wrapper";function y(e){let{components:t,...s}=e;return(0,l.kt)(g,(0,a.Z)({},f,s,{components:t,mdxType:"MDXLayout"}),(0,l.kt)("h1",{id:"shellframe--dashboard"},"ShellFrame & Dashboard"),(0,l.kt)("h2",{id:"overview"},"Overview"),(0,l.kt)("p",null,"This sample shows how we can create and show a simple dashboard. We display our own content in this dashboard and also allow users to restores the default content to the listing area. We will use React js framework for implementing the logic of the application."),(0,l.kt)("h2",{id:"dashboard"},"Dashboard"),(0,l.kt)("h3",{id:"application-manifest-file"},"Application Manifest file"),(0,l.kt)("p",null,"First we should create Application Manifest file(",(0,l.kt)(r.Z,{mdxType:"Highlight"},"appdef.xml"),") and specify our UI extension application data, such as the dashboard id which is required for creating it."),(0,l.kt)(o.Z,{mdxType:"FileTitle"},"appdef.xml"),(0,l.kt)(u,{mdxType:"Tabs"},(0,l.kt)(b,{value:"xml",label:"XML",mdxType:"TabItem"},(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-xml"},'<?xml version="1.0"?>\n<application xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="http://www.m-files.com/schemas/appdef-client-v5.xsd">\n  <guid>2c68aa24-4f5b-4d03-af09-0d1d8035746d</guid>\n  <name>Shellframe - dashboard</name>\n  <version>0.1</version>\n  <description>A basic application showing how to work with Shellframe.</description>\n  <publisher>M-Files Corporation</publisher>\n  <enabled-by-default>true</enabled-by-default>\n  <modules>\n    <module environment="shellui">\n      <file>shellui.js</file>\n    </module>\n  </modules>\n  <dashboards>\n    <dashboard id="MyDashboard">\n      <content>index.html</content>\n    </dashboard>\n  </dashboards>\n</application>\n\n')))),(0,l.kt)(i.Z,{mdxType:"Idea"},"Ensure that your application has a unique GUID by using a GUID generator."),(0,l.kt)("h3",{id:"creating-main-menu"},"Creating main menu"),(0,l.kt)("p",null,"Now we create a module file to contain our actual application logic(",(0,l.kt)(r.Z,{mdxType:"Highlight"},"shellui.js"),"). In this file we add our custom command which is used to open our dashboard. To open the dashboard we call ",(0,l.kt)(r.Z,{mdxType:"Highlight"},"ShowPopupDashboard")," from shellframe instance."),(0,l.kt)(o.Z,{mdxType:"FileTitle"},"shellui.js"),(0,l.kt)(u,{mdxType:"Tabs"},(0,l.kt)(b,{value:"js",label:"JavaScript",mdxType:"TabItem"},(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-js"},'// NOTE! This code is for demonstration purposes only and does not contain any kind of\n//       error handling. MUST be revised before using in production.\n\nfunction OnNewShellUI(shellUI) {\n  /// <summary>Executed by the UIX when a ShellUI module is started.</summary>\n  /// <param name="shellUI" type="MFiles.ShellUI">The shell UI object which was created.</param>\n\n  // This is the start point of a ShellUI module.\n\n  // Register to be notified when a new shell frame (MFiles.Event.NewShellFrame) is created.\n  shellUI.Events.Register(MFiles.Event.NewShellFrame, onNewNormalShellFrame)\n}\n\nfunction onNewNormalShellFrame(shellFrame) {\n  // Add tab to right pane, when the shell frame is started.\n  shellFrame.Events.Register(MFiles.Event.Started, onStarted)\n\n  // NOTE: to be on the safe side, handle the callback in "async" function and await all the\n  // return values, because when the postMessage API is used, all return values will be async.\n  async function onStarted() {\n    const dashboardCommand =\n      await shellFrame.Commands.CreateCustomCommand(\'Show my dashboard\')\n    await shellFrame.Commands.AddCustomCommandToMenu(\n      dashboardCommand,\n      MFiles.MenuLocation.MenuLocation_TopPaneMenu,\n      1,\n    )\n    await shellFrame.Commands.Events.Register(\n      MFiles.Event.CustomCommand,\n      (command) => {\n        // Execute only our custom command.\n        if (command === dashboardCommand) {\n          shellFrame.ShowDashboard(\'MyDashboard\')\n        }\n      },\n    )\n  }\n}\n')))),(0,l.kt)("h3",{id:"creating-the-dashboard-file"},"Creating the dashboard file"),(0,l.kt)("p",null,"Next we will create a dashboard file that will be shown in the listing view area. This is a simple html file that contains our own content."),(0,l.kt)(o.Z,{mdxType:"FileTitle"},"index.html"),(0,l.kt)(u,{mdxType:"Tabs"},(0,l.kt)(b,{value:"html",label:"HTML",mdxType:"TabItem"},(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-html"},'<!doctype html>\n<html lang="en">\n  <head>\n    <title>My Dashboard</title>\n    <meta charset="utf-8" />\n    <script src="mfiles.extensibility.protocol.js"><\/script>\n  </head>\n  <body>\n    <div id="root">\n      <h2>Welcome to M-Files!</h2>\n    </div>\n  </body>\n</html>\n')))),(0,l.kt)("p",null,"After installing our application in M-Files via M-Files Admin and logging into the M-Files vault, we can see our custom command ",(0,l.kt)(r.Z,{mdxType:"Highlight"},"Show my dashboard"),". This custom command opens our dashbord in listing view area."),(0,l.kt)("p",null,(0,l.kt)("img",{alt:" alt text ",src:n(46833).Z,title:"Simple dashboard",width:"1917",height:"960"})),(0,l.kt)("h3",{id:"dashboard-handler"},"Dashboard handler"),(0,l.kt)("p",null,"Let's add some dynamic content to our dashboard. First we modifying ",(0,l.kt)(r.Z,{mdxType:"Highlight"},"index.html")," file to add styles file(",(0,l.kt)(r.Z,{mdxType:"Highlight"},"style.css"),") and dashboard handler(",(0,l.kt)(r.Z,{mdxType:"Highlight"},"index.js"),")."),(0,l.kt)(o.Z,{mdxType:"FileTitle"},"index.html"),(0,l.kt)(u,{mdxType:"Tabs"},(0,l.kt)(b,{value:"html",label:"HTML",mdxType:"TabItem"},(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-html"},'<!doctype html>\n<html lang="en">\n  <head>\n    <title>Dashboard</title>\n    <script src="mfiles.extensibility.protocol.js"><\/script>\n    <link href="style.css" rel="stylesheet" />\n  </head>\n  <body>\n    <div id="root"></div>\n    <script src="bundle.js"><\/script>\n  </body>\n</html>\n')))),(0,l.kt)("p",null,"In this simple example, we retrive the current path from ",(0,l.kt)(r.Z,{mdxType:"Highlight"},"CurrentPath")," of ",(0,l.kt)(r.Z,{mdxType:"Highlight"},"shellFrame")," object and display on our dashboard. Whenever our application is loaded, ",(0,l.kt)(r.Z,{mdxType:"Highlight"},"OnNewDashboard")," is called and the content of the dashboard is updated."),(0,l.kt)("p",null,"We use React JS framework to implement the dashboard handler in ",(0,l.kt)(r.Z,{mdxType:"Highlight"},"index.js")," file, then bundle it in ",(0,l.kt)(r.Z,{mdxType:"Highlight"},"bundle.js")," file. You can use your favorite tool for bundling."),(0,l.kt)(o.Z,{mdxType:"FileTitle"},"index.js"),(0,l.kt)(u,{mdxType:"Tabs"},(0,l.kt)(b,{value:"js",label:"JavaScript",mdxType:"TabItem"},(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-js"},"import React from 'react'\nimport ReactDOM from 'react-dom'\n\nfunction App(dashboard) {\n  const shellFrame = dashboard.ShellFrame\n\n  return (\n    <div>\n      <h1>My dashboard</h1>\n      <div>\n        Current path: <span class=\"label\">{shellFrame.CurrentPath}</span>\n      </div>\n    </div>\n  )\n}\n\nwindow.OnNewDashboard = (newDashboard) => {\n  ReactDOM.createRoot(document.getElementById('root')).render(App(newDashboard))\n}\n")))),(0,l.kt)("p",null,"Also we need to add our style file."),(0,l.kt)(o.Z,{mdxType:"FileTitle"},"style.css"),(0,l.kt)(u,{mdxType:"Tabs"},(0,l.kt)(b,{value:"css",label:"CSS",mdxType:"TabItem"},(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-css"},"html,\nbody {\n  font-family: Lato, 'Segoe UI', Sans-Serif;\n  margin: 0;\n  background: #fff;\n  height: 100%;\n  font-size: 14px;\n  padding: 0 10px;\n}\n\ndiv {\n  padding: 2px 0;\n}\n\nbutton {\n  width: 150px;\n  height: 20px;\n}\n\n.label {\n  font-weight: 500;\n  color: mediumblue;\n}\n")))),(0,l.kt)("p",null,"Now if you install the application you can see the result:"),(0,l.kt)("p",null,(0,l.kt)("img",{alt:" alt text ",src:n(50094).Z,title:"Simple dashboard",width:"1920",height:"961"})),(0,l.kt)("p",null,"As our last path, before opening our applicatin was ",(0,l.kt)(r.Z,{mdxType:"Highlight"},"Pinned"),", you can see that ",(0,l.kt)(r.Z,{mdxType:"Highlight"},"Current path")," value is Pinned."),(0,l.kt)("h2",{id:"restoring-default-content"},"Restoring default content"),(0,l.kt)("p",null,"In some point maybe we want to restore the dashboard to the default content. In this we can call ",(0,l.kt)(r.Z,{mdxType:"Highlight"},"ShowDefaultContent")," of ",(0,l.kt)(r.Z,{mdxType:"Highlight"},"shellFrame")," object."),(0,l.kt)(o.Z,{mdxType:"FileTitle"},"index.js"),(0,l.kt)(u,{mdxType:"Tabs"},(0,l.kt)(b,{value:"js",label:"JavaScript",mdxType:"TabItem"},(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-js"},"import React from 'react'\nimport ReactDOM from 'react-dom'\n\nfunction App(dashboard) {\n  const shellFrame = dashboard.ShellFrame\n\n  const showDefaultContent = () => {\n    shellFrame.ShowDefaultContent()\n  }\n\n  return (\n    <div>\n      <h1>My dashboard</h1>\n      <div>\n        Current path: <span class=\"label\">{shellFrame.CurrentPath}</span>\n      </div>\n      <button type=\"button\" onClick={showDefaultContent}>\n        Show default Content\n      </button>\n    </div>\n  )\n}\n\nwindow.OnNewDashboard = (newDashboard) => {\n  ReactDOM.createRoot(document.getElementById('root')).render(App(newDashboard))\n}\n")))),(0,l.kt)("p",null,(0,l.kt)("img",{alt:" alt text ",src:n(41e3).Z,title:"Show default content",width:"1920",height:"959"})),(0,l.kt)("p",null,"If the button is cliked the default content is shown again."))}y.isMDXComponent=!0},34274:(e,t,n)=>{n.d(t,{Z:()=>a});const a={note:"note_XMqZ",idea:"idea_NLbw",highlight:"highlight_NFmx",filetitle:"filetitle_Jrus"}},46833:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/Dashboard_1-22df8178be19e5aea533d54d7f189b02.png"},50094:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/Dashboard_2-283ac713dc5487945f6a47804913ffed.png"},41e3:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/Dashboard_3-1171eb7e46121911ab3b2fcd20acbc90.png"}}]);