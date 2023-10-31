/**
 * log RUM if part of the sample.
 * @param {string} checkpoint identifies the checkpoint in funnel
 * @param {Object} data additional data for RUM sample
 * @param {string} data.source DOM node that is the source of a checkpoint event,
 * identified by #id or .classname
 * @param {string} data.target subject of the checkpoint event,
 * for instance the href of a link, or a search term
 */function e(n,r={}){e.defer=e.defer||[];let a=n=>{e[n]=e[n]||((...r)=>e.defer.push({fnname:n,args:r}))};e.drain=e.drain||((n,r)=>{e[n]=r,e.defer.filter(({fnname:e})=>n===e).forEach(({fnname:n,args:r})=>e[n](...r))}),e.always=e.always||[],e.always.on=(n,r)=>{e.always[n]=r},e.on=(n,r)=>{e.cases[n]=r},a("observe"),a("cwv");try{if(window.hlx=window.hlx||{},!window.hlx.rum){let n=new URLSearchParams(window.location.search),r="on"===n.get("rum")?1:100,a=Array.from({length:75},(e,n)=>String.fromCharCode(48+n)).filter(e=>/\d|[A-Z]/i.test(e)).filter(()=>75*Math.random()>70).join(""),i=Math.random(),o=Date.now();// eslint-disable-next-line object-curly-newline, max-len
window.hlx.rum={weight:r,id:a,random:i,isSelected:i*r<1,firstReadTime:o,sampleRUM:e,sanitizeURL:({full:()=>window.location.href,origin:()=>window.location.origin,path:()=>window.location.href.replace(/\?.*$/,"")})[window.hlx.RUM_MASK_URL||"path"]}}let{weight:a,id:i,firstReadTime:o}=window.hlx.rum;if(window.hlx&&window.hlx.rum&&window.hlx.rum.isSelected){let t=["weight","id","referer","checkpoint","t","source","target","cwv","CLS","FID","LCP","INP"];e.cases=e.cases||{cwv:()=>e.cwv(r)||!0,lazy:()=>{// use classic script to avoid CORS issues
let e=document.createElement("script");return e.src="https://rum.hlx.page/.rum/@adobe/helix-rum-enhancer@^1/src/index.js",document.head.appendChild(e),!0}},((e=r)=>{// eslint-disable-next-line object-curly-newline, max-len, no-use-before-define
let w=JSON.stringify({weight:a,id:i,referer:window.hlx.rum.sanitizeURL(),checkpoint:n,t:Date.now()-o,...r},t),d=`https://rum.hlx.page/.rum/${a}`;// eslint-disable-next-line no-unused-expressions
navigator.sendBeacon(d,w),// eslint-disable-next-line no-console
console.debug(`ping:${n}`,e)})(r),e.cases[n]&&e.cases[n]()}e.always[n]&&e.always[n](r)}catch(e){// something went wrong
}}window.hlx=window.hlx||{},window.hlx.RUM_MASK_URL="full",window.hlx.codeBasePath="",window.hlx.lighthouse="on"===new URLSearchParams(window.location.search).get("lighthouse"),e("top"),window.addEventListener("load",()=>e("load")),window.addEventListener("unhandledrejection",n=>{e("error",{source:n.reason.sourceURL,target:n.reason.line})}),window.addEventListener("error",n=>{e("error",{source:n.filename,target:n.lineno})});//# sourceMappingURL=head.17f60ff8.js.map

//# sourceMappingURL=head.17f60ff8.js.map
