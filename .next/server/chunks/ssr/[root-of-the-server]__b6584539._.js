module.exports=[72131,(a,b,c)=>{"use strict";b.exports=a.r(42602).vendored["react-ssr"].React},9270,(a,b,c)=>{"use strict";b.exports=a.r(42602).vendored.contexts.AppRouterContext},36313,(a,b,c)=>{"use strict";b.exports=a.r(42602).vendored.contexts.HooksClientContext},18341,(a,b,c)=>{"use strict";b.exports=a.r(42602).vendored.contexts.ServerInsertedHtml},18622,(a,b,c)=>{b.exports=a.x("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js",()=>require("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js"))},56704,(a,b,c)=>{b.exports=a.x("next/dist/server/app-render/work-async-storage.external.js",()=>require("next/dist/server/app-render/work-async-storage.external.js"))},20635,(a,b,c)=>{b.exports=a.x("next/dist/server/app-render/action-async-storage.external.js",()=>require("next/dist/server/app-render/action-async-storage.external.js"))},32319,(a,b,c)=>{b.exports=a.x("next/dist/server/app-render/work-unit-async-storage.external.js",()=>require("next/dist/server/app-render/work-unit-async-storage.external.js"))},42602,(a,b,c)=>{"use strict";b.exports=a.r(18622)},87924,(a,b,c)=>{"use strict";b.exports=a.r(42602).vendored["react-ssr"].ReactJsxRuntime},89302,a=>{"use strict";a.s(["ExternalLinkHandler",()=>e,"useExternalLink",()=>f]);var b=a.i(87924),c=a.i(72131);let d=(0,c.createContext)(void 0),e=({children:a})=>{let[e,f]=(0,c.useState)(!1),[g,h]=(0,c.useState)(!1),[i,j]=(0,c.useState)(""),[k,l]=(0,c.useState)(!1),m=()=>{h(!0),setTimeout(()=>{h(!1),f(!1),j(""),l(!1)},300)};return(0,c.useEffect)(()=>(e?document.body.classList.add("overflow-hidden"):document.body.classList.remove("overflow-hidden"),()=>{document.body.classList.remove("overflow-hidden")}),[e]),(0,b.jsxs)(d.Provider,{value:{showWarning:e,targetUrl:i,isProfessional:k,handleExternalClick:(a,b=!1)=>{j(a),l(b),f(!0)},closeWarning:m},children:[a,e&&(0,b.jsx)("div",{className:"fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/40 animate-fade-in p-4",onClick:m,children:(0,b.jsxs)("div",{className:`bg-[#1a1a1a] border border-[#333] rounded-xl p-6 max-w-md w-full text-center relative ${g?"animate-elastic-out":"animate-elastic-in"}`,onClick:a=>a.stopPropagation(),children:[(0,b.jsx)("button",{onClick:m,"aria-label":"Close",className:"absolute top-1 right-3 text-gray-400 hover:text-red-500 text-4xl",children:"×"}),(0,b.jsx)("h3",{className:"text-xl font-semibold text-white mb-2",children:"External Link Notice"}),k?(0,b.jsxs)(b.Fragment,{children:[(0,b.jsxs)("p",{className:"text-gray-300 text-sm mb-4",children:["You are about to visit a ",(0,b.jsx)("b",{children:"professional platform"})," or external resource."]}),(0,b.jsx)("p",{className:"text-gray-200 text-sm mb-4",children:"The content on this platform may not reflect my personal views and is owned by a third party."})]}):(0,b.jsxs)(b.Fragment,{children:[(0,b.jsxs)("p",{className:"text-gray-300 text-sm mb-4",children:["You are about to visit a ",(0,b.jsx)("b",{children:"social platform"})," or external resource."]}),(0,b.jsx)("p",{className:"text-gray-200 text-sm mb-4",children:"Please note that the content on this platform does not reflect my professional identity or represent me in any official capacity."})]}),(0,b.jsxs)("p",{className:"text-gray-100 text-sm mb-4",children:["Please proceed with ",(0,b.jsx)("b",{children:"caution"}),"."]}),(0,b.jsx)("div",{className:"flex justify-center gap-4",children:(0,b.jsx)("a",{href:i,target:"_blank",rel:"noopener noreferrer",onClick:m,className:"flex items-center justify-center gap-2 w-full py-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white rounded-lg transition-all",children:"Continue"})})]})})]})},f=()=>{let a=(0,c.useContext)(d);if(!a)throw Error("useExternalLink must be used within an ExternalLinkHandler");return a}},6704,a=>{"use strict";a.s(["CheckmarkIcon",()=>P,"ErrorIcon",()=>K,"LoaderIcon",()=>M,"ToastBar",()=>X,"ToastIcon",()=>U,"Toaster",()=>$,"default",()=>_,"resolveValue",()=>q,"toast",()=>E,"useToaster",()=>G,"useToasterStore",()=>C],6704);var b,c=a.i(72131);let d={data:""},e=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,f=/\/\*[^]*?\*\/|  +/g,g=/\n+/g,h=(a,b)=>{let c="",d="",e="";for(let f in a){let g=a[f];"@"==f[0]?"i"==f[1]?c=f+" "+g+";":d+="f"==f[1]?h(g,f):f+"{"+h(g,"k"==f[1]?"":b)+"}":"object"==typeof g?d+=h(g,b?b.replace(/([^,])+/g,a=>f.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,b=>/&/.test(b)?b.replace(/&/g,a):a?a+" "+b:b)):f):null!=g&&(f=/^--/.test(f)?f:f.replace(/[A-Z]/g,"-$&").toLowerCase(),e+=h.p?h.p(f,g):f+":"+g+";")}return c+(b&&e?b+"{"+e+"}":e)+d},i={},j=a=>{if("object"==typeof a){let b="";for(let c in a)b+=c+j(a[c]);return b}return a};function k(a){let b,c,k=this||{},l=a.call?a(k.p):a;return((a,b,c,d,k)=>{var l,m,n,o;let p=j(a),q=i[p]||(i[p]=(a=>{let b=0,c=11;for(;b<a.length;)c=101*c+a.charCodeAt(b++)>>>0;return"go"+c})(p));if(!i[q]){let b=p!==a?a:(a=>{let b,c,d=[{}];for(;b=e.exec(a.replace(f,""));)b[4]?d.shift():b[3]?(c=b[3].replace(g," ").trim(),d.unshift(d[0][c]=d[0][c]||{})):d[0][b[1]]=b[2].replace(g," ").trim();return d[0]})(a);i[q]=h(k?{["@keyframes "+q]:b}:b,c?"":"."+q)}let r=c&&i.g?i.g:null;return c&&(i.g=i[q]),l=i[q],m=b,n=d,(o=r)?m.data=m.data.replace(o,l):-1===m.data.indexOf(l)&&(m.data=n?l+m.data:m.data+l),q})(l.unshift?l.raw?(b=[].slice.call(arguments,1),c=k.p,l.reduce((a,d,e)=>{let f=b[e];if(f&&f.call){let a=f(c),b=a&&a.props&&a.props.className||/^go/.test(a)&&a;f=b?"."+b:a&&"object"==typeof a?a.props?"":h(a,""):!1===a?"":a}return a+d+(null==f?"":f)},"")):l.reduce((a,b)=>Object.assign(a,b&&b.call?b(k.p):b),{}):l,k.target||d,k.g,k.o,k.k)}k.bind({g:1});let l,m,n,o=k.bind({k:1});function p(a,b){let c=this||{};return function(){let d=arguments;function e(f,g){let h=Object.assign({},f),i=h.className||e.className;c.p=Object.assign({theme:m&&m()},h),c.o=/ *go\d+/.test(i),h.className=k.apply(c,d)+(i?" "+i:""),b&&(h.ref=g);let j=a;return a[0]&&(j=h.as||a,delete h.as),n&&j[0]&&n(h),l(j,h)}return b?b(e):e}}var q=(a,b)=>"function"==typeof a?a(b):a,r=(()=>{let a=0;return()=>(++a).toString()})(),s=(()=>{let a;return()=>a})(),t="default",u=(a,b)=>{let{toastLimit:c}=a.settings;switch(b.type){case 0:return{...a,toasts:[b.toast,...a.toasts].slice(0,c)};case 1:return{...a,toasts:a.toasts.map(a=>a.id===b.toast.id?{...a,...b.toast}:a)};case 2:let{toast:d}=b;return u(a,{type:+!!a.toasts.find(a=>a.id===d.id),toast:d});case 3:let{toastId:e}=b;return{...a,toasts:a.toasts.map(a=>a.id===e||void 0===e?{...a,dismissed:!0,visible:!1}:a)};case 4:return void 0===b.toastId?{...a,toasts:[]}:{...a,toasts:a.toasts.filter(a=>a.id!==b.toastId)};case 5:return{...a,pausedAt:b.time};case 6:let f=b.time-(a.pausedAt||0);return{...a,pausedAt:void 0,toasts:a.toasts.map(a=>({...a,pauseDuration:a.pauseDuration+f}))}}},v=[],w={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},x={},y=(a,b=t)=>{x[b]=u(x[b]||w,a),v.forEach(([a,c])=>{a===b&&c(x[b])})},z=a=>Object.keys(x).forEach(b=>y(a,b)),A=(a=t)=>b=>{y(b,a)},B={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},C=(a={},b=t)=>{let[d,e]=(0,c.useState)(x[b]||w),f=(0,c.useRef)(x[b]);(0,c.useEffect)(()=>(f.current!==x[b]&&e(x[b]),v.push([b,e]),()=>{let a=v.findIndex(([a])=>a===b);a>-1&&v.splice(a,1)}),[b]);let g=d.toasts.map(b=>{var c,d,e;return{...a,...a[b.type],...b,removeDelay:b.removeDelay||(null==(c=a[b.type])?void 0:c.removeDelay)||(null==a?void 0:a.removeDelay),duration:b.duration||(null==(d=a[b.type])?void 0:d.duration)||(null==a?void 0:a.duration)||B[b.type],style:{...a.style,...null==(e=a[b.type])?void 0:e.style,...b.style}}});return{...d,toasts:g}},D=a=>(b,c)=>{let d,e=((a,b="blank",c)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:b,ariaProps:{role:"status","aria-live":"polite"},message:a,pauseDuration:0,...c,id:(null==c?void 0:c.id)||r()}))(b,a,c);return A(e.toasterId||(d=e.id,Object.keys(x).find(a=>x[a].toasts.some(a=>a.id===d))))({type:2,toast:e}),e.id},E=(a,b)=>D("blank")(a,b);E.error=D("error"),E.success=D("success"),E.loading=D("loading"),E.custom=D("custom"),E.dismiss=(a,b)=>{let c={type:3,toastId:a};b?A(b)(c):z(c)},E.dismissAll=a=>E.dismiss(void 0,a),E.remove=(a,b)=>{let c={type:4,toastId:a};b?A(b)(c):z(c)},E.removeAll=a=>E.remove(void 0,a),E.promise=(a,b,c)=>{let d=E.loading(b.loading,{...c,...null==c?void 0:c.loading});return"function"==typeof a&&(a=a()),a.then(a=>{let e=b.success?q(b.success,a):void 0;return e?E.success(e,{id:d,...c,...null==c?void 0:c.success}):E.dismiss(d),a}).catch(a=>{let e=b.error?q(b.error,a):void 0;e?E.error(e,{id:d,...c,...null==c?void 0:c.error}):E.dismiss(d)}),a};var F=1e3,G=(a,b="default")=>{let{toasts:d,pausedAt:e}=C(a,b),f=(0,c.useRef)(new Map).current,g=(0,c.useCallback)((a,b=F)=>{if(f.has(a))return;let c=setTimeout(()=>{f.delete(a),h({type:4,toastId:a})},b);f.set(a,c)},[]);(0,c.useEffect)(()=>{if(e)return;let a=Date.now(),c=d.map(c=>{if(c.duration===1/0)return;let d=(c.duration||0)+c.pauseDuration-(a-c.createdAt);if(d<0){c.visible&&E.dismiss(c.id);return}return setTimeout(()=>E.dismiss(c.id,b),d)});return()=>{c.forEach(a=>a&&clearTimeout(a))}},[d,e,b]);let h=(0,c.useCallback)(A(b),[b]),i=(0,c.useCallback)(()=>{h({type:5,time:Date.now()})},[h]),j=(0,c.useCallback)((a,b)=>{h({type:1,toast:{id:a,height:b}})},[h]),k=(0,c.useCallback)(()=>{e&&h({type:6,time:Date.now()})},[e,h]),l=(0,c.useCallback)((a,b)=>{let{reverseOrder:c=!1,gutter:e=8,defaultPosition:f}=b||{},g=d.filter(b=>(b.position||f)===(a.position||f)&&b.height),h=g.findIndex(b=>b.id===a.id),i=g.filter((a,b)=>b<h&&a.visible).length;return g.filter(a=>a.visible).slice(...c?[i+1]:[0,i]).reduce((a,b)=>a+(b.height||0)+e,0)},[d]);return(0,c.useEffect)(()=>{d.forEach(a=>{if(a.dismissed)g(a.id,a.removeDelay);else{let b=f.get(a.id);b&&(clearTimeout(b),f.delete(a.id))}})},[d,g]),{toasts:d,handlers:{updateHeight:j,startPause:i,endPause:k,calculateOffset:l}}},H=o`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,I=o`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,J=o`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,K=p("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${a=>a.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${H} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${I} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${a=>a.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${J} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,L=o`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,M=p("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${a=>a.secondary||"#e0e0e0"};
  border-right-color: ${a=>a.primary||"#616161"};
  animation: ${L} 1s linear infinite;
`,N=o`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,O=o`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,P=p("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${a=>a.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${N} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${O} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${a=>a.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,Q=p("div")`
  position: absolute;
`,R=p("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,S=o`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,T=p("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${S} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,U=({toast:a})=>{let{icon:b,type:d,iconTheme:e}=a;return void 0!==b?"string"==typeof b?c.createElement(T,null,b):b:"blank"===d?null:c.createElement(R,null,c.createElement(M,{...e}),"loading"!==d&&c.createElement(Q,null,"error"===d?c.createElement(K,{...e}):c.createElement(P,{...e})))},V=p("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,W=p("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,X=c.memo(({toast:a,position:b,style:d,children:e})=>{let f=a.height?((a,b)=>{let c=a.includes("top")?1:-1,[d,e]=s()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[`
0% {transform: translate3d(0,${-200*c}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*c}%,-1px) scale(.6); opacity:0;}
`];return{animation:b?`${o(d)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${o(e)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}})(a.position||b||"top-center",a.visible):{opacity:0},g=c.createElement(U,{toast:a}),h=c.createElement(W,{...a.ariaProps},q(a.message,a));return c.createElement(V,{className:a.className,style:{...f,...d,...a.style}},"function"==typeof e?e({icon:g,message:h}):c.createElement(c.Fragment,null,g,h))});b=c.createElement,h.p=void 0,l=b,m=void 0,n=void 0;var Y=({id:a,className:b,style:d,onHeightUpdate:e,children:f})=>{let g=c.useCallback(b=>{if(b){let c=()=>{e(a,b.getBoundingClientRect().height)};c(),new MutationObserver(c).observe(b,{subtree:!0,childList:!0,characterData:!0})}},[a,e]);return c.createElement("div",{ref:g,className:b,style:d},f)},Z=k`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,$=({reverseOrder:a,position:b="top-center",toastOptions:d,gutter:e,children:f,toasterId:g,containerStyle:h,containerClassName:i})=>{let{toasts:j,handlers:k}=G(d,g);return c.createElement("div",{"data-rht-toaster":g||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...h},className:i,onMouseEnter:k.startPause,onMouseLeave:k.endPause},j.map(d=>{let g=d.position||b,h=((a,b)=>{let c=a.includes("top"),d=a.includes("center")?{justifyContent:"center"}:a.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:s()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${b*(c?1:-1)}px)`,...c?{top:0}:{bottom:0},...d}})(g,k.calculateOffset(d,{reverseOrder:a,gutter:e,defaultPosition:b}));return c.createElement(Y,{id:d.id,key:d.id,onHeightUpdate:k.updateHeight,className:d.visible?Z:"",style:h},"custom"===d.type?q(d.message,d):f?f(d):c.createElement(X,{toast:d,position:g}))}))},_=E},62065,a=>{"use strict";a.s(["Analytics",()=>g]);var b=a.i(72131),c=a.i(50944);function d(a){return RegExp(`/${a.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}(?=[/?#]|$)`)}function e(a){return(0,b.useEffect)(()=>{var b;a.beforeSend&&(null==(b=window.va)||b.call(window,"beforeSend",a.beforeSend))},[a.beforeSend]),(0,b.useEffect)(()=>{!function(a={debug:!0}){}({framework:a.framework||"react",basePath:a.basePath??function(){if("undefined"!=typeof process&&void 0!==process.env)return process.env.REACT_APP_VERCEL_OBSERVABILITY_BASEPATH}(),...void 0!==a.route&&{disableAutoTrack:!0},...a})},[]),(0,b.useEffect)(()=>{a.route&&a.path&&function({route:a,path:b}){var c;null==(c=window.va)||c.call(window,"pageview",{route:a,path:b})}({route:a.route,path:a.path})},[a.route,a.path]),null}function f(a){let{route:f,path:g}=(()=>{let a=(0,c.useParams)(),b=(0,c.useSearchParams)(),e=(0,c.usePathname)();return a?{route:function(a,b){if(!a||!b)return a;let c=a;try{let a=Object.entries(b);for(let[b,e]of a)if(!Array.isArray(e)){let a=d(e);a.test(c)&&(c=c.replace(a,`/[${b}]`))}for(let[b,e]of a)if(Array.isArray(e)){let a=d(e.join("/"));a.test(c)&&(c=c.replace(a,`/[...${b}]`))}return c}catch(b){return a}}(e,Object.keys(a).length?a:Object.fromEntries(b.entries())),path:e}:{route:null,path:e}})();return b.default.createElement(e,{path:g,route:f,...a,basePath:function(){if("undefined"!=typeof process&&void 0!==process.env)return process.env.NEXT_PUBLIC_VERCEL_OBSERVABILITY_BASEPATH}(),framework:"next"})}function g(a){return b.default.createElement(b.Suspense,{fallback:null},b.default.createElement(f,{...a}))}},86665,a=>{"use strict";a.s(["SpeedInsights",()=>g]);var b=a.i(72131),c=a.i(50944);function d(a){return RegExp(`/${a.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}(?=[/?#]|$)`)}function e(a){(0,b.useEffect)(()=>{var b;a.beforeSend&&(null==(b=window.si)||b.call(window,"beforeSend",a.beforeSend))},[a.beforeSend]);let c=(0,b.useRef)(null);return(0,b.useEffect)(()=>{if(c.current)a.route&&c.current(a.route);else{let b=function(a={}){return null}({framework:a.framework??"react",basePath:a.basePath??function(){if("undefined"!=typeof process&&void 0!==process.env)return process.env.REACT_APP_VERCEL_OBSERVABILITY_BASEPATH}(),...a});b&&(c.current=b.setRoute)}},[a.route]),null}function f(a){let f=(()=>{let a=(0,c.useParams)(),b=(0,c.useSearchParams)()||new URLSearchParams,e=(0,c.usePathname)();return a?function(a,b){if(!a||!b)return a;let c=a;try{let a=Object.entries(b);for(let[b,e]of a)if(!Array.isArray(e)){let a=d(e);a.test(c)&&(c=c.replace(a,`/[${b}]`))}for(let[b,e]of a)if(Array.isArray(e)){let a=d(e.join("/"));a.test(c)&&(c=c.replace(a,`/[...${b}]`))}return c}catch(b){return a}}(e,Object.keys(a).length?a:Object.fromEntries(b.entries())):null})();return b.default.createElement(e,{route:f,...a,framework:"next",basePath:function(){if("undefined"!=typeof process&&void 0!==process.env)return process.env.NEXT_PUBLIC_VERCEL_OBSERVABILITY_BASEPATH}()})}function g(a){return b.default.createElement(b.Suspense,{fallback:null},b.default.createElement(f,{...a}))}}];

//# sourceMappingURL=%5Broot-of-the-server%5D__b6584539._.js.map