"use strict";(self.webpackChunkuix_2=self.webpackChunkuix_2||[]).push([[4928],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>f});var r=n(67294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function u(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var i=r.createContext({}),s=function(e){var t=r.useContext(i),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},c=function(e){var t=s(e.components);return r.createElement(i.Provider,{value:t},e.children)},m="mdxType",p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,i=e.parentName,c=u(e,["components","mdxType","originalType","parentName"]),m=s(n),d=a,f=m["".concat(i,".").concat(d)]||m[d]||p[d]||o;return n?r.createElement(f,l(l({ref:t},c),{},{components:n})):r.createElement(f,l({ref:t},c))}));function f(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,l=new Array(o);l[0]=d;var u={};for(var i in t)hasOwnProperty.call(t,i)&&(u[i]=t[i]);u.originalType=e,u[m]="string"==typeof e?e:a,l[1]=u;for(var s=2;s<o;s++)l[s]=n[s];return r.createElement.apply(null,l)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},18679:(e,t,n)=>{n.d(t,{Z:()=>l});var r=n(67294),a=n(86010);const o={tabItem:"tabItem_Ymn6"};function l(e){let{children:t,hidden:n,className:l}=e;return r.createElement("div",{role:"tabpanel",className:(0,a.Z)(o.tabItem,l),hidden:n},t)}},73992:(e,t,n)=>{n.d(t,{Z:()=>I});var r=n(87462),a=n(67294),o=n(86010),l=n(72957),u=n(16550),i=n(75238),s=n(33609),c=n(92560);function m(e){return function(e){return a.Children.map(e,(e=>{if(!e||(0,a.isValidElement)(e)&&function(e){const{props:t}=e;return!!t&&"object"==typeof t&&"value"in t}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}(e).map((e=>{let{props:{value:t,label:n,attributes:r,default:a}}=e;return{value:t,label:n,attributes:r,default:a}}))}function p(e){const{values:t,children:n}=e;return(0,a.useMemo)((()=>{const e=t??m(n);return function(e){const t=(0,s.l)(e,((e,t)=>e.value===t.value));if(t.length>0)throw new Error(`Docusaurus error: Duplicate values "${t.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[t,n])}function d(e){let{value:t,tabValues:n}=e;return n.some((e=>e.value===t))}function f(e){let{queryString:t=!1,groupId:n}=e;const r=(0,u.k6)(),o=function(e){let{queryString:t=!1,groupId:n}=e;if("string"==typeof t)return t;if(!1===t)return null;if(!0===t&&!n)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return n??null}({queryString:t,groupId:n});return[(0,i._X)(o),(0,a.useCallback)((e=>{if(!o)return;const t=new URLSearchParams(r.location.search);t.set(o,e),r.replace({...r.location,search:t.toString()})}),[o,r])]}function b(e){const{defaultValue:t,queryString:n=!1,groupId:r}=e,o=p(e),[l,u]=(0,a.useState)((()=>function(e){let{defaultValue:t,tabValues:n}=e;if(0===n.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(t){if(!d({value:t,tabValues:n}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${t}" but none of its children has the corresponding value. Available values are: ${n.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return t}const r=n.find((e=>e.default))??n[0];if(!r)throw new Error("Unexpected error: 0 tabValues");return r.value}({defaultValue:t,tabValues:o}))),[i,s]=f({queryString:n,groupId:r}),[m,b]=function(e){let{groupId:t}=e;const n=function(e){return e?`docusaurus.tab.${e}`:null}(t),[r,o]=(0,c.Nk)(n);return[r,(0,a.useCallback)((e=>{n&&o.set(e)}),[n,o])]}({groupId:r}),y=(()=>{const e=i??m;return d({value:e,tabValues:o})?e:null})();(0,a.useLayoutEffect)((()=>{y&&u(y)}),[y]);return{selectedValue:l,selectValue:(0,a.useCallback)((e=>{if(!d({value:e,tabValues:o}))throw new Error(`Can't select invalid tab value=${e}`);u(e),s(e),b(e)}),[s,b,o]),tabValues:o}}var y=n(51048);const k={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};function h(e){let{className:t,block:n,selectedValue:u,selectValue:i,tabValues:s}=e;const c=[],{blockElementScrollPositionUntilNextRender:m}=(0,l.o5)(),p=e=>{const t=e.currentTarget,n=c.indexOf(t),r=s[n].value;r!==u&&(m(t),i(r))},d=e=>{let t=null;switch(e.key){case"Enter":p(e);break;case"ArrowRight":{const n=c.indexOf(e.currentTarget)+1;t=c[n]??c[0];break}case"ArrowLeft":{const n=c.indexOf(e.currentTarget)-1;t=c[n]??c[c.length-1];break}}t?.focus()};return a.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,o.Z)("tabs",{"tabs--block":n},t)},s.map((e=>{let{value:t,label:n,attributes:l}=e;return a.createElement("li",(0,r.Z)({role:"tab",tabIndex:u===t?0:-1,"aria-selected":u===t,key:t,ref:e=>c.push(e),onKeyDown:d,onClick:p},l,{className:(0,o.Z)("tabs__item",k.tabItem,l?.className,{"tabs__item--active":u===t})}),n??t)})))}function v(e){let{lazy:t,children:n,selectedValue:r}=e;const o=(Array.isArray(n)?n:[n]).filter(Boolean);if(t){const e=o.find((e=>e.props.value===r));return e?(0,a.cloneElement)(e,{className:"margin-top--md"}):null}return a.createElement("div",{className:"margin-top--md"},o.map(((e,t)=>(0,a.cloneElement)(e,{key:t,hidden:e.props.value!==r}))))}function g(e){const t=b(e);return a.createElement("div",{className:(0,o.Z)("tabs-container",k.tabList)},a.createElement(h,(0,r.Z)({},e,t)),a.createElement(v,(0,r.Z)({},e,t)))}function I(e){const t=(0,y.Z)();return a.createElement(g,(0,r.Z)({key:String(t)},e))}},71334:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>I,contentTitle:()=>v,default:()=>x,frontMatter:()=>h,metadata:()=>g,toc:()=>C});var r=n(87462),a=(n(67294),n(3905));const o={toc:[]},l="wrapper";function u(e){let{components:t,...n}=e;return(0,a.kt)(l,(0,r.Z)({},o,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:null},"Type"),(0,a.kt)("th",{parentName:"tr",align:null},"Description"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"Promise < ",(0,a.kt)("inlineCode",{parentName:"td"},"number")," >"),(0,a.kt)("td",{parentName:"tr",align:null},"ID of the newly created MenuItem.")))))}u.isMDXComponent=!0;const i={toc:[]},s="wrapper";function c(e){let{components:t,...n}=e;return(0,a.kt)(s,(0,r.Z)({},i,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:null},"Name"),(0,a.kt)("th",{parentName:"tr",align:null},"Optionality"),(0,a.kt)("th",{parentName:"tr",align:null},"Type"),(0,a.kt)("th",{parentName:"tr",align:null},"Description"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"parentMenuItemId"),(0,a.kt)("td",{parentName:"tr",align:null},"Required"),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("inlineCode",{parentName:"td"},"number")),(0,a.kt)("td",{parentName:"tr",align:null},"ID of the Parent MenuItem.")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"customCommand"),(0,a.kt)("td",{parentName:"tr",align:null},"Required"),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("inlineCode",{parentName:"td"},"number")),(0,a.kt)("td",{parentName:"tr",align:null},"Command to execute when the MenuItem is selected..")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"orderPriority"),(0,a.kt)("td",{parentName:"tr",align:null},"Required"),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("inlineCode",{parentName:"td"},"number")),(0,a.kt)("td",{parentName:"tr",align:null},"Priority to assign to the new item.")))))}c.isMDXComponent=!0;n(73992);var m=n(18679);const p={toc:[]},d="wrapper";function f(e){let{components:t,...n}=e;return(0,a.kt)(d,(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)(m.Z,{value:"js",label:"JavaScript",mdxType:"TabItem"},(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"// shellFrame points here into the IShellFrame interface\nconst result = await shellFrame.Commands.CreateSubMenuItem(\n  parentMenuItemId,\n  customCommand,\n  orderPriority,\n);\n"))))}f.isMDXComponent=!0;const b={toc:[]},y="wrapper";function k(e){let{components:t,...n}=e;return(0,a.kt)(y,(0,r.Z)({},b,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"Creates a new SubMenu for already created Menu."))}k.isMDXComponent=!0;const h={},v="CreateSubMenuItem",g={unversionedId:"UIExt2/Interfaces/ICommands/CreateSubMenuItem/index",id:"UIExt2/Interfaces/ICommands/CreateSubMenuItem/index",title:"CreateSubMenuItem",description:"Description",source:"@site/docs/UIExt2/Interfaces/ICommands/CreateSubMenuItem/index.mdx",sourceDirName:"UIExt2/Interfaces/ICommands/CreateSubMenuItem",slug:"/UIExt2/Interfaces/ICommands/CreateSubMenuItem/",permalink:"/Frameworks/User-Interface-Extensibility-Framework/Reference/UIExt2/Interfaces/ICommands/CreateSubMenuItem/",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"CreateCustomCommand",permalink:"/Frameworks/User-Interface-Extensibility-Framework/Reference/UIExt2/Interfaces/ICommands/CreateCustomCommand/"},next:{title:"DeleteCustomCommand",permalink:"/Frameworks/User-Interface-Extensibility-Framework/Reference/UIExt2/Interfaces/ICommands/DeleteCustomCommand/"}},I={},C=[{value:"Description",id:"description",level:2},{value:"Syntax",id:"syntax",level:2},{value:"Parameters",id:"parameters",level:2},{value:"Return type",id:"return-type",level:2}],N={toc:C},w="wrapper";function x(e){let{components:t,...n}=e;return(0,a.kt)(w,(0,r.Z)({},N,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"createsubmenuitem"},"CreateSubMenuItem"),(0,a.kt)("h2",{id:"description"},"Description"),(0,a.kt)(k,{components:n.components,mdxType:"Description"}),(0,a.kt)("h2",{id:"syntax"},"Syntax"),(0,a.kt)(f,{components:n.components,mdxType:"Syntax"}),(0,a.kt)("h2",{id:"parameters"},"Parameters"),(0,a.kt)(c,{components:n.components,mdxType:"Params"}),(0,a.kt)("h2",{id:"return-type"},"Return type"),(0,a.kt)(u,{components:n.components,mdxType:"Returns"}))}x.isMDXComponent=!0}}]);