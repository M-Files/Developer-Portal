"use strict";(self.webpackChunkuix_2=self.webpackChunkuix_2||[]).push([[4199],{3905:(e,t,n)=>{n.d(t,{Zo:()=>s,kt:()=>f});var r=n(67294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var p=r.createContext({}),c=function(e){var t=r.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},s=function(e){var t=c(e.components);return r.createElement(p.Provider,{value:t},e.children)},u="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,p=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),u=c(n),d=a,f=u["".concat(p,".").concat(d)]||u[d]||m[d]||o;return n?r.createElement(f,i(i({ref:t},s),{},{components:n})):r.createElement(f,i({ref:t},s))}));function f(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=d;var l={};for(var p in t)hasOwnProperty.call(t,p)&&(l[p]=t[p]);l.originalType=e,l[u]="string"==typeof e?e:a,i[1]=l;for(var c=2;c<o;c++)i[c]=n[c];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},84186:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>g,contentTitle:()=>y,default:()=>x,frontMatter:()=>f,metadata:()=>b,toc:()=>k});var r=n(87462),a=(n(67294),n(3905));const o={toc:[]},i="wrapper";function l(e){let{components:t,...n}=e;return(0,a.kt)(i,(0,r.Z)({},o,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "type": 4 /* Enum: ObjFileSourceType */,\n  "data": {\n    "blank_template": {\n      "name": "<!< Blank template file name.>"\n    },\n    "user_defined_template": {\n      "obj_id": {\n        "type": 0,\n        "item_id": {\n          "internal_id": 0,\n          "external_repository_id": {\n            "connection": "<!< The external repository connection identifier.>",\n            "item": "<item>"\n          }\n        }\n      }\n    },\n    "uploaded_file": {\n      "upload_id": 0,\n      "title": "<!< The title of the file.>",\n      "extension": "<extension>",\n      "size": 0\n    },\n    "uploaded_files": {\n      "uploaded_file_array": [] /* Array of UploadedFile */\n    }\n  }\n}\n')))}l.isMDXComponent=!0;const p={toc:[]},c="wrapper";function s(e){let{components:t,...n}=e;return(0,a.kt)(c,(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:null},"Name"),(0,a.kt)("th",{parentName:"tr",align:null},"Description"),(0,a.kt)("th",{parentName:"tr",align:null},"Type"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("inlineCode",{parentName:"td"},"type")),(0,a.kt)("td",{parentName:"tr",align:null},"The type of the object file source."),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("a",{parentName:"td",href:"/gRPC/Enums/ObjFileSourceType"},"ObjFileSourceType"))),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("inlineCode",{parentName:"td"},"data")),(0,a.kt)("td",{parentName:"tr",align:null},"Object file source type - specific data as a union."),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("a",{parentName:"td",href:"/gRPC/Messages/ObjFileSourceUnion"},"ObjFileSourceUnion"))))))}s.isMDXComponent=!0;const u={toc:[]},m="wrapper";function d(e){let{components:t,...n}=e;return(0,a.kt)(m,(0,r.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"Struct for object file source data in a add object with files call."))}d.isMDXComponent=!0;const f={},y="ObjFileSource",b={unversionedId:"gRPC/Messages/ObjFileSource/index",id:"gRPC/Messages/ObjFileSource/index",title:"ObjFileSource",description:"Example",source:"@site/docs/gRPC/Messages/ObjFileSource/index.mdx",sourceDirName:"gRPC/Messages/ObjFileSource",slug:"/gRPC/Messages/ObjFileSource/",permalink:"/Frameworks/User-Interface-Extensibility-Framework/Reference/gRPC/Messages/ObjFileSource/",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"OBJVERFLAGS",permalink:"/Frameworks/User-Interface-Extensibility-Framework/Reference/gRPC/Messages/OBJVERFLAGS/"},next:{title:"ObjFileSourceUnion",permalink:"/Frameworks/User-Interface-Extensibility-Framework/Reference/gRPC/Messages/ObjFileSourceUnion/"}},g={},k=[{value:"Example",id:"example",level:2}],O={toc:k},j="wrapper";function x(e){let{components:t,...n}=e;return(0,a.kt)(j,(0,r.Z)({},O,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"objfilesource"},"ObjFileSource"),(0,a.kt)(d,{components:n.components,mdxType:"Description"}),(0,a.kt)(s,{components:n.components,mdxType:"Message"}),(0,a.kt)("h2",{id:"example"},"Example"),(0,a.kt)(l,{components:n.components,mdxType:"Example"}))}x.isMDXComponent=!0}}]);