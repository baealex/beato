var Hs=Object.defineProperty;var Ws=(t,e,n)=>e in t?Hs(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var F=(t,e,n)=>(Ws(t,typeof e!="symbol"?e+"":e,n),n);import{r as m,a as Vs,c as B,b as Jn,_ as Ks,u as Z,d as Js,L as Pr,e as He,O as Ys,f as fn,g as pn,h as Gs,Q as Xs,i as Qs,j as Zs,k as ei,R as ti}from"./vendor-fa7a2e94.js";import{u as ni,a as Yn,D as ri,r as si,b as ii,c as oi,S as ai,v as ci,s as li,K as di,P as ui,d as mn,C as gn,e as yn}from"./sortable-b0dcf770.js";import{m as bn}from"./motion-e6209d02.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function n(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=n(s);fetch(s.href,i)}})();var Mr={exports:{}},gt={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var hi=m,fi=Symbol.for("react.element"),pi=Symbol.for("react.fragment"),mi=Object.prototype.hasOwnProperty,gi=hi.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,yi={key:!0,ref:!0,__self:!0,__source:!0};function Br(t,e,n){var r,s={},i=null,o=null;n!==void 0&&(i=""+n),e.key!==void 0&&(i=""+e.key),e.ref!==void 0&&(o=e.ref);for(r in e)mi.call(e,r)&&!yi.hasOwnProperty(r)&&(s[r]=e[r]);if(t&&t.defaultProps)for(r in e=t.defaultProps,e)s[r]===void 0&&(s[r]=e[r]);return{$$typeof:fi,type:t,key:i,ref:o,props:s,_owner:gi.current}}gt.Fragment=pi;gt.jsx=Br;gt.jsxs=Br;Mr.exports=gt;var a=Mr.exports,Xt={},Gn=Vs;Xt.createRoot=Gn.createRoot,Xt.hydrateRoot=Gn.hydrateRoot;var $={},yt={},We={};Object.defineProperty(We,"__esModule",{value:!0});We.findOrCreateContainer=void 0;var bi=function(t){if(!document.getElementById(t)){var e=document.createElement("div");e.id=t,document.body.appendChild(e)}return document.getElementById(t)};We.findOrCreateContainer=bi;Object.defineProperty(yt,"__esModule",{value:!0});yt.toast=void 0;var xi=We,Xn=function(){var t=(0,xi.findOrCreateContainer)("toast-container");return t.classList.add("toast__container"),t}();function wi(t,e){Xn.childNodes.forEach(function(r){r.remove()});var n=document.createElement("div");n.textContent=t,n.classList.add("toast__content"),e!=null&&e.onClick&&(n.classList.add("toast__event"),n.addEventListener("click",e.onClick)),Xn.appendChild(n),n.addEventListener("animationend",function(){n.remove()})}yt.toast=wi;var ue={},Qn=B&&B.__spreadArray||function(t,e,n){if(n||arguments.length===2)for(var r=0,s=e.length,i;r<s;r++)(i||!(r in e))&&(i||(i=Array.prototype.slice.call(e,0,r)),i[r]=e[r]);return t.concat(i||Array.prototype.slice.call(e))};Object.defineProperty(ue,"__esModule",{value:!0});ue.prompt=ue.confirm=ue.alert=void 0;var vi=We,V=function(){var t=(0,vi.findOrCreateContainer)("window-modal-container");return t.classList.add("window-modal__container"),t}();function xn(t,e){var n=e===void 0?{}:e,r=n.className,s=r===void 0?"":r;return Qn(Qn(['<div class="window-modal__window '.concat(s,'">'),'<div class="window-modal__content">'],t,!0),["</div>","</div>"],!1).join("")}var wn=function(t,e){var n=e.close,r=e.enter,s=e.escape,i=function(l){if(l.key==="Escape"&&s){l.preventDefault(),s();return}if(l.key==="Enter"&&r){l.preventDefault(),r();return}},o=function(l){l.target===V&&(n==null||n())};return document.addEventListener("keydown",i),V.addEventListener("click",o),V.innerHTML=t,V.classList.add("show"),function(){document.removeEventListener("keydown",i),V.removeEventListener("click",o),V.innerHTML="",V.classList.remove("show")}};function ki(t){return new Promise(function(e){var n,r=function(){s(),e()},s=wn(xn(['<div class="window-modal__content">','<div class="window-modal__text">'+t+"</div>",'<div class="window-modal__footer">','<button class="window-modal__confirm">OK</button>',"</div>","</div>"],{className:"window-modal__type-alert"}),{close:r,enter:r,escape:r});(n=V.querySelector(".window-modal__confirm"))===null||n===void 0||n.addEventListener("click",r)})}ue.alert=ki;function Ci(t){return new Promise(function(e){var n,r,s=function(){o(),e(!0)},i=function(){o(),e(!1)},o=wn(xn(['<div class="window-modal__text">'+t+"</div>",'<div class="window-modal__footer">','<button class="window-modal__cancel">Cancel</button>','<button class="window-modal__confirm">OK</button>',"</div>","</div>"],{className:"window-modal__type-confirm"}),{close:i,enter:s,escape:i});(n=V.querySelector(".window-modal__cancel"))===null||n===void 0||n.addEventListener("click",i),(r=V.querySelector(".window-modal__confirm"))===null||r===void 0||r.addEventListener("click",s)})}ue.confirm=Ci;function Ei(t,e){return e===void 0&&(e=""),new Promise(function(n){var r,s,i=function(d){d.preventDefault();var u=d.target,c=u.value.value;l(),n(c)},o=function(){l(),n("")},l=wn(xn(['<form class="window-modal__content">','<div class="window-modal__text">'+t+"</div>",'<div class="window-modal__input">','<input type="text" name="value" value="'+e+'">',"</div>",'<div class="window-modal__footer">','<button type="button" class="window-modal__cancel">Cancel</button>','<button type="submit" class="window-modal__confirm">OK</button>',"</div>","</form>"],{className:"window-modal__type-prompt"}),{close:o,escape:o});(r=V.querySelector(".window-modal__cancel"))===null||r===void 0||r.addEventListener("click",o),(s=V.querySelector("form"))===null||s===void 0||s.addEventListener("submit",i),setTimeout(function(){var d=V.querySelector("input");d.focus(),d.setSelectionRange(d.value.length,d.value.length)},200)})}ue.prompt=Ei;(function(t){var e=B&&B.__createBinding||(Object.create?function(r,s,i,o){o===void 0&&(o=i);var l=Object.getOwnPropertyDescriptor(s,i);(!l||("get"in l?!s.__esModule:l.writable||l.configurable))&&(l={enumerable:!0,get:function(){return s[i]}}),Object.defineProperty(r,o,l)}:function(r,s,i,o){o===void 0&&(o=i),r[o]=s[i]}),n=B&&B.__exportStar||function(r,s){for(var i in r)i!=="default"&&!Object.prototype.hasOwnProperty.call(s,i)&&e(s,r,i)};Object.defineProperty(t,"__esModule",{value:!0}),n(yt,t),n(ue,t)})($);function Ir(t){var e=Object.create(null);return function(n){return e[n]===void 0&&(e[n]=t(n)),e[n]}}var _i=/^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|download|draggable|encType|enterKeyHint|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/,Si=Ir(function(t){return _i.test(t)||t.charCodeAt(0)===111&&t.charCodeAt(1)===110&&t.charCodeAt(2)<91});function ji(t){if(t.sheet)return t.sheet;for(var e=0;e<document.styleSheets.length;e++)if(document.styleSheets[e].ownerNode===t)return document.styleSheets[e]}function Ai(t){var e=document.createElement("style");return e.setAttribute("data-emotion",t.key),t.nonce!==void 0&&e.setAttribute("nonce",t.nonce),e.appendChild(document.createTextNode("")),e.setAttribute("data-s",""),e}var Oi=function(){function t(n){var r=this;this._insertTag=function(s){var i;r.tags.length===0?r.insertionPoint?i=r.insertionPoint.nextSibling:r.prepend?i=r.container.firstChild:i=r.before:i=r.tags[r.tags.length-1].nextSibling,r.container.insertBefore(s,i),r.tags.push(s)},this.isSpeedy=n.speedy===void 0?!0:n.speedy,this.tags=[],this.ctr=0,this.nonce=n.nonce,this.key=n.key,this.container=n.container,this.prepend=n.prepend,this.insertionPoint=n.insertionPoint,this.before=null}var e=t.prototype;return e.hydrate=function(r){r.forEach(this._insertTag)},e.insert=function(r){this.ctr%(this.isSpeedy?65e3:1)===0&&this._insertTag(Ai(this));var s=this.tags[this.tags.length-1];if(this.isSpeedy){var i=ji(s);try{i.insertRule(r,i.cssRules.length)}catch{}}else s.appendChild(document.createTextNode(r));this.ctr++},e.flush=function(){this.tags.forEach(function(r){return r.parentNode&&r.parentNode.removeChild(r)}),this.tags=[],this.ctr=0},t}(),U="-ms-",ut="-moz-",j="-webkit-",Dr="comm",vn="rule",kn="decl",Ri="@import",$r="@keyframes",Ni="@layer",Ti=Math.abs,bt=String.fromCharCode,Li=Object.assign;function Pi(t,e){return D(t,0)^45?(((e<<2^D(t,0))<<2^D(t,1))<<2^D(t,2))<<2^D(t,3):0}function qr(t){return t.trim()}function Mi(t,e){return(t=e.exec(t))?t[0]:t}function A(t,e,n){return t.replace(e,n)}function Qt(t,e){return t.indexOf(e)}function D(t,e){return t.charCodeAt(e)|0}function De(t,e,n){return t.slice(e,n)}function ee(t){return t.length}function Cn(t){return t.length}function Xe(t,e){return e.push(t),t}function Bi(t,e){return t.map(e).join("")}var xt=1,ve=1,Ur=0,H=0,T=0,Ce="";function wt(t,e,n,r,s,i,o){return{value:t,root:e,parent:n,type:r,props:s,children:i,line:xt,column:ve,length:o,return:""}}function Ae(t,e){return Li(wt("",null,null,"",null,null,0),t,{length:-t.length},e)}function Ii(){return T}function Di(){return T=H>0?D(Ce,--H):0,ve--,T===10&&(ve=1,xt--),T}function K(){return T=H<Ur?D(Ce,H++):0,ve++,T===10&&(ve=1,xt++),T}function re(){return D(Ce,H)}function nt(){return H}function Ve(t,e){return De(Ce,t,e)}function $e(t){switch(t){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function Fr(t){return xt=ve=1,Ur=ee(Ce=t),H=0,[]}function zr(t){return Ce="",t}function rt(t){return qr(Ve(H-1,Zt(t===91?t+2:t===40?t+1:t)))}function $i(t){for(;(T=re())&&T<33;)K();return $e(t)>2||$e(T)>3?"":" "}function qi(t,e){for(;--e&&K()&&!(T<48||T>102||T>57&&T<65||T>70&&T<97););return Ve(t,nt()+(e<6&&re()==32&&K()==32))}function Zt(t){for(;K();)switch(T){case t:return H;case 34:case 39:t!==34&&t!==39&&Zt(T);break;case 40:t===41&&Zt(t);break;case 92:K();break}return H}function Ui(t,e){for(;K()&&t+T!==47+10;)if(t+T===42+42&&re()===47)break;return"/*"+Ve(e,H-1)+"*"+bt(t===47?t:K())}function Fi(t){for(;!$e(re());)K();return Ve(t,H)}function zi(t){return zr(st("",null,null,null,[""],t=Fr(t),0,[0],t))}function st(t,e,n,r,s,i,o,l,d){for(var u=0,c=0,h=o,y=0,x=0,p=0,g=1,w=1,E=1,k=0,N="",ce=s,Y=i,W=r,O=N;w;)switch(p=k,k=K()){case 40:if(p!=108&&D(O,h-1)==58){Qt(O+=A(rt(k),"&","&\f"),"&\f")!=-1&&(E=-1);break}case 34:case 39:case 91:O+=rt(k);break;case 9:case 10:case 13:case 32:O+=$i(p);break;case 92:O+=qi(nt()-1,7);continue;case 47:switch(re()){case 42:case 47:Xe(Hi(Ui(K(),nt()),e,n),d);break;default:O+="/"}break;case 123*g:l[u++]=ee(O)*E;case 125*g:case 59:case 0:switch(k){case 0:case 125:w=0;case 59+c:E==-1&&(O=A(O,/\f/g,"")),x>0&&ee(O)-h&&Xe(x>32?er(O+";",r,n,h-1):er(A(O," ","")+";",r,n,h-2),d);break;case 59:O+=";";default:if(Xe(W=Zn(O,e,n,u,c,s,l,N,ce=[],Y=[],h),i),k===123)if(c===0)st(O,e,W,W,ce,i,h,l,Y);else switch(y===99&&D(O,3)===110?100:y){case 100:case 108:case 109:case 115:st(t,W,W,r&&Xe(Zn(t,W,W,0,0,s,l,N,s,ce=[],h),Y),s,Y,h,l,r?ce:Y);break;default:st(O,W,W,W,[""],Y,0,l,Y)}}u=c=x=0,g=E=1,N=O="",h=o;break;case 58:h=1+ee(O),x=p;default:if(g<1){if(k==123)--g;else if(k==125&&g++==0&&Di()==125)continue}switch(O+=bt(k),k*g){case 38:E=c>0?1:(O+="\f",-1);break;case 44:l[u++]=(ee(O)-1)*E,E=1;break;case 64:re()===45&&(O+=rt(K())),y=re(),c=h=ee(N=O+=Fi(nt())),k++;break;case 45:p===45&&ee(O)==2&&(g=0)}}return i}function Zn(t,e,n,r,s,i,o,l,d,u,c){for(var h=s-1,y=s===0?i:[""],x=Cn(y),p=0,g=0,w=0;p<r;++p)for(var E=0,k=De(t,h+1,h=Ti(g=o[p])),N=t;E<x;++E)(N=qr(g>0?y[E]+" "+k:A(k,/&\f/g,y[E])))&&(d[w++]=N);return wt(t,e,n,s===0?vn:l,d,u,c)}function Hi(t,e,n){return wt(t,e,n,Dr,bt(Ii()),De(t,2,-2),0)}function er(t,e,n,r){return wt(t,e,n,kn,De(t,0,r),De(t,r+1,-1),r)}function we(t,e){for(var n="",r=Cn(t),s=0;s<r;s++)n+=e(t[s],s,t,e)||"";return n}function Wi(t,e,n,r){switch(t.type){case Ni:if(t.children.length)break;case Ri:case kn:return t.return=t.return||t.value;case Dr:return"";case $r:return t.return=t.value+"{"+we(t.children,r)+"}";case vn:t.value=t.props.join(",")}return ee(n=we(t.children,r))?t.return=t.value+"{"+n+"}":""}function Vi(t){var e=Cn(t);return function(n,r,s,i){for(var o="",l=0;l<e;l++)o+=t[l](n,r,s,i)||"";return o}}function Ki(t){return function(e){e.root||(e=e.return)&&t(e)}}var Ji=function(e,n,r){for(var s=0,i=0;s=i,i=re(),s===38&&i===12&&(n[r]=1),!$e(i);)K();return Ve(e,H)},Yi=function(e,n){var r=-1,s=44;do switch($e(s)){case 0:s===38&&re()===12&&(n[r]=1),e[r]+=Ji(H-1,n,r);break;case 2:e[r]+=rt(s);break;case 4:if(s===44){e[++r]=re()===58?"&\f":"",n[r]=e[r].length;break}default:e[r]+=bt(s)}while(s=K());return e},Gi=function(e,n){return zr(Yi(Fr(e),n))},tr=new WeakMap,Xi=function(e){if(!(e.type!=="rule"||!e.parent||e.length<1)){for(var n=e.value,r=e.parent,s=e.column===r.column&&e.line===r.line;r.type!=="rule";)if(r=r.parent,!r)return;if(!(e.props.length===1&&n.charCodeAt(0)!==58&&!tr.get(r))&&!s){tr.set(e,!0);for(var i=[],o=Gi(n,i),l=r.props,d=0,u=0;d<o.length;d++)for(var c=0;c<l.length;c++,u++)e.props[u]=i[d]?o[d].replace(/&\f/g,l[c]):l[c]+" "+o[d]}}},Qi=function(e){if(e.type==="decl"){var n=e.value;n.charCodeAt(0)===108&&n.charCodeAt(2)===98&&(e.return="",e.value="")}};function Hr(t,e){switch(Pi(t,e)){case 5103:return j+"print-"+t+t;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 6391:case 5879:case 5623:case 6135:case 4599:case 4855:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:return j+t+t;case 5349:case 4246:case 4810:case 6968:case 2756:return j+t+ut+t+U+t+t;case 6828:case 4268:return j+t+U+t+t;case 6165:return j+t+U+"flex-"+t+t;case 5187:return j+t+A(t,/(\w+).+(:[^]+)/,j+"box-$1$2"+U+"flex-$1$2")+t;case 5443:return j+t+U+"flex-item-"+A(t,/flex-|-self/,"")+t;case 4675:return j+t+U+"flex-line-pack"+A(t,/align-content|flex-|-self/,"")+t;case 5548:return j+t+U+A(t,"shrink","negative")+t;case 5292:return j+t+U+A(t,"basis","preferred-size")+t;case 6060:return j+"box-"+A(t,"-grow","")+j+t+U+A(t,"grow","positive")+t;case 4554:return j+A(t,/([^-])(transform)/g,"$1"+j+"$2")+t;case 6187:return A(A(A(t,/(zoom-|grab)/,j+"$1"),/(image-set)/,j+"$1"),t,"")+t;case 5495:case 3959:return A(t,/(image-set\([^]*)/,j+"$1$`$1");case 4968:return A(A(t,/(.+:)(flex-)?(.*)/,j+"box-pack:$3"+U+"flex-pack:$3"),/s.+-b[^;]+/,"justify")+j+t+t;case 4095:case 3583:case 4068:case 2532:return A(t,/(.+)-inline(.+)/,j+"$1$2")+t;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(ee(t)-1-e>6)switch(D(t,e+1)){case 109:if(D(t,e+4)!==45)break;case 102:return A(t,/(.+:)(.+)-([^]+)/,"$1"+j+"$2-$3$1"+ut+(D(t,e+3)==108?"$3":"$2-$3"))+t;case 115:return~Qt(t,"stretch")?Hr(A(t,"stretch","fill-available"),e)+t:t}break;case 4949:if(D(t,e+1)!==115)break;case 6444:switch(D(t,ee(t)-3-(~Qt(t,"!important")&&10))){case 107:return A(t,":",":"+j)+t;case 101:return A(t,/(.+:)([^;!]+)(;|!.+)?/,"$1"+j+(D(t,14)===45?"inline-":"")+"box$3$1"+j+"$2$3$1"+U+"$2box$3")+t}break;case 5936:switch(D(t,e+11)){case 114:return j+t+U+A(t,/[svh]\w+-[tblr]{2}/,"tb")+t;case 108:return j+t+U+A(t,/[svh]\w+-[tblr]{2}/,"tb-rl")+t;case 45:return j+t+U+A(t,/[svh]\w+-[tblr]{2}/,"lr")+t}return j+t+U+t+t}return t}var Zi=function(e,n,r,s){if(e.length>-1&&!e.return)switch(e.type){case kn:e.return=Hr(e.value,e.length);break;case $r:return we([Ae(e,{value:A(e.value,"@","@"+j)})],s);case vn:if(e.length)return Bi(e.props,function(i){switch(Mi(i,/(::plac\w+|:read-\w+)/)){case":read-only":case":read-write":return we([Ae(e,{props:[A(i,/:(read-\w+)/,":"+ut+"$1")]})],s);case"::placeholder":return we([Ae(e,{props:[A(i,/:(plac\w+)/,":"+j+"input-$1")]}),Ae(e,{props:[A(i,/:(plac\w+)/,":"+ut+"$1")]}),Ae(e,{props:[A(i,/:(plac\w+)/,U+"input-$1")]})],s)}return""})}},eo=[Zi],to=function(e){var n=e.key;if(n==="css"){var r=document.querySelectorAll("style[data-emotion]:not([data-s])");Array.prototype.forEach.call(r,function(g){var w=g.getAttribute("data-emotion");w.indexOf(" ")!==-1&&(document.head.appendChild(g),g.setAttribute("data-s",""))})}var s=e.stylisPlugins||eo,i={},o,l=[];o=e.container||document.head,Array.prototype.forEach.call(document.querySelectorAll('style[data-emotion^="'+n+' "]'),function(g){for(var w=g.getAttribute("data-emotion").split(" "),E=1;E<w.length;E++)i[w[E]]=!0;l.push(g)});var d,u=[Xi,Qi];{var c,h=[Wi,Ki(function(g){c.insert(g)})],y=Vi(u.concat(s,h)),x=function(w){return we(zi(w),y)};d=function(w,E,k,N){c=k,x(w?w+"{"+E.styles+"}":E.styles),N&&(p.inserted[E.name]=!0)}}var p={key:n,sheet:new Oi({key:n,container:o,nonce:e.nonce,speedy:e.speedy,prepend:e.prepend,insertionPoint:e.insertionPoint}),nonce:e.nonce,inserted:i,registered:{},insert:d};return p.sheet.hydrate(l),p},no=!0;function ro(t,e,n){var r="";return n.split(" ").forEach(function(s){t[s]!==void 0?e.push(t[s]+";"):r+=s+" "}),r}var Wr=function(e,n,r){var s=e.key+"-"+n.name;(r===!1||no===!1)&&e.registered[s]===void 0&&(e.registered[s]=n.styles)},so=function(e,n,r){Wr(e,n,r);var s=e.key+"-"+n.name;if(e.inserted[n.name]===void 0){var i=n;do e.insert(n===i?"."+s:"",i,e.sheet,!0),i=i.next;while(i!==void 0)}};function io(t){for(var e=0,n,r=0,s=t.length;s>=4;++r,s-=4)n=t.charCodeAt(r)&255|(t.charCodeAt(++r)&255)<<8|(t.charCodeAt(++r)&255)<<16|(t.charCodeAt(++r)&255)<<24,n=(n&65535)*1540483477+((n>>>16)*59797<<16),n^=n>>>24,e=(n&65535)*1540483477+((n>>>16)*59797<<16)^(e&65535)*1540483477+((e>>>16)*59797<<16);switch(s){case 3:e^=(t.charCodeAt(r+2)&255)<<16;case 2:e^=(t.charCodeAt(r+1)&255)<<8;case 1:e^=t.charCodeAt(r)&255,e=(e&65535)*1540483477+((e>>>16)*59797<<16)}return e^=e>>>13,e=(e&65535)*1540483477+((e>>>16)*59797<<16),((e^e>>>15)>>>0).toString(36)}var oo={animationIterationCount:1,aspectRatio:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1},ao=/[A-Z]|^ms/g,co=/_EMO_([^_]+?)_([^]*?)_EMO_/g,Vr=function(e){return e.charCodeAt(1)===45},nr=function(e){return e!=null&&typeof e!="boolean"},Rt=Ir(function(t){return Vr(t)?t:t.replace(ao,"-$&").toLowerCase()}),rr=function(e,n){switch(e){case"animation":case"animationName":if(typeof n=="string")return n.replace(co,function(r,s,i){return te={name:s,styles:i,next:te},s})}return oo[e]!==1&&!Vr(e)&&typeof n=="number"&&n!==0?n+"px":n};function qe(t,e,n){if(n==null)return"";if(n.__emotion_styles!==void 0)return n;switch(typeof n){case"boolean":return"";case"object":{if(n.anim===1)return te={name:n.name,styles:n.styles,next:te},n.name;if(n.styles!==void 0){var r=n.next;if(r!==void 0)for(;r!==void 0;)te={name:r.name,styles:r.styles,next:te},r=r.next;var s=n.styles+";";return s}return lo(t,e,n)}case"function":{if(t!==void 0){var i=te,o=n(t);return te=i,qe(t,e,o)}break}}if(e==null)return n;var l=e[n];return l!==void 0?l:n}function lo(t,e,n){var r="";if(Array.isArray(n))for(var s=0;s<n.length;s++)r+=qe(t,e,n[s])+";";else for(var i in n){var o=n[i];if(typeof o!="object")e!=null&&e[o]!==void 0?r+=i+"{"+e[o]+"}":nr(o)&&(r+=Rt(i)+":"+rr(i,o)+";");else if(Array.isArray(o)&&typeof o[0]=="string"&&(e==null||e[o[0]]===void 0))for(var l=0;l<o.length;l++)nr(o[l])&&(r+=Rt(i)+":"+rr(i,o[l])+";");else{var d=qe(t,e,o);switch(i){case"animation":case"animationName":{r+=Rt(i)+":"+d+";";break}default:r+=i+"{"+d+"}"}}}return r}var sr=/label:\s*([^\s;\n{]+)\s*(;|$)/g,te,uo=function(e,n,r){if(e.length===1&&typeof e[0]=="object"&&e[0]!==null&&e[0].styles!==void 0)return e[0];var s=!0,i="";te=void 0;var o=e[0];o==null||o.raw===void 0?(s=!1,i+=qe(r,n,o)):i+=o[0];for(var l=1;l<e.length;l++)i+=qe(r,n,e[l]),s&&(i+=o[l]);sr.lastIndex=0;for(var d="",u;(u=sr.exec(i))!==null;)d+="-"+u[1];var c=io(i)+d;return{name:c,styles:i,next:te}},ho=function(e){return e()},fo=Jn["useInsertionEffect"]?Jn["useInsertionEffect"]:!1,po=fo||ho,Kr=m.createContext(typeof HTMLElement<"u"?to({key:"css"}):null);Kr.Provider;var mo=function(e){return m.forwardRef(function(n,r){var s=m.useContext(Kr);return e(n,s,r)})},go=m.createContext({}),yo=Si,bo=function(e){return e!=="theme"},ir=function(e){return typeof e=="string"&&e.charCodeAt(0)>96?yo:bo},or=function(e,n,r){var s;if(n){var i=n.shouldForwardProp;s=e.__emotion_forwardProp&&i?function(o){return e.__emotion_forwardProp(o)&&i(o)}:i}return typeof s!="function"&&r&&(s=e.__emotion_forwardProp),s},xo=function(e){var n=e.cache,r=e.serialized,s=e.isStringTag;return Wr(n,r,s),po(function(){return so(n,r,s)}),null},wo=function t(e,n){var r=e.__emotion_real===e,s=r&&e.__emotion_base||e,i,o;n!==void 0&&(i=n.label,o=n.target);var l=or(e,n,r),d=l||ir(s),u=!d("as");return function(){var c=arguments,h=r&&e.__emotion_styles!==void 0?e.__emotion_styles.slice(0):[];if(i!==void 0&&h.push("label:"+i+";"),c[0]==null||c[0].raw===void 0)h.push.apply(h,c);else{h.push(c[0][0]);for(var y=c.length,x=1;x<y;x++)h.push(c[x],c[0][x])}var p=mo(function(g,w,E){var k=u&&g.as||s,N="",ce=[],Y=g;if(g.theme==null){Y={};for(var W in g)Y[W]=g[W];Y.theme=m.useContext(go)}typeof g.className=="string"?N=ro(w.registered,ce,g.className):g.className!=null&&(N=g.className+" ");var O=uo(h.concat(ce),w.registered,Y);N+=w.key+"-"+O.name,o!==void 0&&(N+=" "+o);var zs=u&&l===void 0?ir(k):d,Ye={};for(var Ge in g)u&&Ge==="as"||zs(Ge)&&(Ye[Ge]=g[Ge]);return Ye.className=N,Ye.ref=E,m.createElement(m.Fragment,null,m.createElement(xo,{cache:w,serialized:O,isStringTag:typeof k=="string"}),m.createElement(k,Ye))});return p.displayName=i!==void 0?i:"Styled("+(typeof s=="string"?s:s.displayName||s.name||"Component")+")",p.defaultProps=e.defaultProps,p.__emotion_real=p,p.__emotion_base=s,p.__emotion_styles=h,p.__emotion_forwardProp=l,Object.defineProperty(p,"toString",{value:function(){return"."+o}}),p.withComponent=function(g,w){return t(g,Ks({},n,w,{shouldForwardProp:or(p,w,!0)})).apply(void 0,h)},p}},vo=["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","big","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","keygen","label","legend","li","link","main","map","mark","marquee","menu","menuitem","meta","meter","nav","noscript","object","ol","optgroup","option","output","p","param","picture","pre","progress","q","rp","rt","ruby","s","samp","script","section","select","small","source","span","strong","style","sub","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","title","tr","track","u","ul","var","video","wbr","circle","clipPath","defs","ellipse","foreignObject","g","image","line","linearGradient","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","svg","text","tspan"],S=wo.bind();vo.forEach(function(t){S[t]=S(t)});var Ue={},ht=B&&B.__assign||function(){return ht=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++){e=arguments[n];for(var s in e)Object.prototype.hasOwnProperty.call(e,s)&&(t[s]=e[s])}return t},ht.apply(this,arguments)};Object.defineProperty(Ue,"__esModule",{value:!0});Ue.useValue=R=Ue.useStore=void 0;var ft=m;function ko(t){var e=(0,ft.useState)(t.state),n=e[0],r=e[1];return(0,ft.useEffect)(function(){var s=t.subscribe(r);return function(){return t.unsubscribe(s)}},[]),[n,t.set.bind(t)]}var R=Ue.useStore=ko;function Co(t,e){var n=(0,ft.useState)(t.state[e]),r=n[0],s=n[1];return(0,ft.useEffect)(function(){var i=t.subscribe(function(o){return s(o[e])});return function(){return t.unsubscribe(i)}},[]),[r,function(i){return t.set(function(o){var l;return ht(ht({},o),(l={},l[e]=i,l))})}]}Ue.useValue=Co;const Fe=t=>t||"/images/beato.jpg";function he({src:t,alt:e,style:n,loading:r="lazy",className:s}){const i=m.useRef(null);return m.useEffect(()=>{if(!i.current||r!=="lazy")return;const o=new IntersectionObserver(([l])=>{if(l.isIntersecting){const d=l.target;d.src=Fe(t),o.unobserve(d)}});return o.observe(i.current),()=>{o.disconnect()}},[r,t]),a.jsx(a.Fragment,{children:r!=="lazy"?a.jsx("img",{src:Fe(t),alt:e,style:n,className:s}):a.jsx("img",{ref:i,src:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQIW2NQV1f/DwACYwF11mMyYQAAAABJRU5ErkJggg==",alt:e,style:n,className:s})})}const Eo=S.button`
    display: flex;
    flex-direction: column;
    text-align: left;
    gap: 0.25rem;
    border-radius: 0.5rem;
    background-color: #111;
    transition: background-color 0.2s ease-in-out;
    padding-bottom: 0.5rem;

    @media (min-width: 1024px) {
        &:hover {
            background-color: #222222;
        }
    }

    .cover {
        flex: 1;
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 0.5rem;
        padding-bottom: 0.5rem;
    }

    .title,
    .artist {
        padding: 0 0.5rem;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .title {
        color: #eeeeee;
        font-weight: bold;
    }

    .artist {
        color: #aaaaaa;
    }
`;function Jr({albumCover:t,albumName:e,artistName:n,onClick:r}){return a.jsxs(Eo,{onClick:r,children:[a.jsx(he,{className:"cover",src:t,alt:e}),a.jsx("span",{className:"title",children:e}),a.jsx("span",{className:"artist",children:n})]})}const _o=S.button`
    cursor: pointer;
    padding: 1rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.75rem;

    img {
        width: 4rem;
        height: 4rem;
        object-fit: cover;
        border-radius: 100%;
    }

    .info {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
    }

    .count {
        display: flex;
        gap: 0.25rem;
        font-size: 0.75rem;
        color: rgba(255, 255, 255, 0.5);
    }

    @media (min-width: 1024px) {
        &:hover {
            background-color: rgba(255, 255, 255, 0.1);
        }
    }
`;function So({artistName:t,artistCover:e,albumCount:n,musicCount:r,onClick:s}){return a.jsxs(_o,{className:"clickable linkable",onClick:s,children:[a.jsx(he,{src:e,alt:t}),a.jsxs("div",{className:"info",children:[a.jsx("div",{className:"name",children:t}),a.jsxs("div",{className:"count",children:[a.jsxs("div",{className:"album",children:[n," albums"]}),a.jsx("span",{children:" / "}),a.jsxs("div",{className:"music",children:[r," songs"]})]})]})]})}const jo=S.div`
    @keyframes fade-in {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    @keyframes slide-in {
        from {
            transform: translate(-50%, 100%);
        }
        to {
            transform: translate(-50%, 0);
        }
    }

    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: none;
    flex-direction: column;
    z-index: 110;
    pointer-events: none;
    background-color: rgba(0, 0, 0, 0.88);

    &.open {
        pointer-events: all;
        display: flex;
        animation: fade-in 0.2s ease-in-out;
    }

    .backdrop {
        cursor: pointer;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }

    .bottom-panel {
        position: fixed;
        bottom: 0;
        left: 50%;
        transform: translate(-50%, 0);
        width: 600px;
        max-width: 100%;
        max-height: 80%;
        overflow-y: auto;
        padding: 32px 16px 16px;
        border-radius: 16px 16px 0 0;
        background-color: #151515;
        z-index: 100;

        &.open {
            animation: slide-in 0.2s ease-in-out;
        }
    }

    .panel-title {
        font-size: 0.875rem;
        color: #888;
    }
`;function Ao({title:t,isOpen:e,onClose:n,children:r}){const s=m.useRef(!1);return m.useEffect(()=>{if(!e){s.current&&(s.current=!1,history.back());return}s.current||(s.current=!0,history.pushState(null,""));const i=()=>{s.current=!1,n==null||n()};return window.addEventListener("popstate",i),()=>{window.removeEventListener("popstate",i)}},[s,e,n]),a.jsxs(jo,{className:e?"open":"",children:[a.jsx("button",{className:"clickable backdrop",onClick:n}),a.jsxs("div",{className:`bottom-panel ${e?"open":""}`,children:[t&&a.jsx("div",{className:"panel-title",children:t}),r]})]})}const Oo=S.div`
    display: grid;

    &.col-1 {
        grid-template-columns: repeat(1, 1fr);
        grid-template-rows: repeat(1, 1fr);
    }

    &.col-2 {
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(2, 1fr);
    }

    &.col-3 {
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(3, 1fr);
    }

    &.col-4 {
        grid-template-columns: repeat(4, 1fr);
        grid-template-rows: repeat(4, 1fr);
    }

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;function En({images:t,className:e}){const n=t.length>=16?4:t.length>=9?3:t.length>=4?2:1;return a.jsxs(Oo,{className:`${e} col-${n}`,children:[t.length===0&&a.jsx(he,{}),t.slice(0,n*n).map((r,s)=>a.jsx(he,{src:r,alt:""},s))]})}var fe={},vt={},_n={};Object.defineProperty(_n,"__esModule",{value:!0});_n.default={COLOR_WHITE:"#ffffff",COLOR_BLACK:"#000000",COLOR_PURPLE_DEEP:"#474787",COLOR_PURPLE_SHALLOW:"#515199",COLOR_PURPLE_NEON:"#735af2",COLOR_PURPLE_PROMINENT:"#a076f1",COLOR_PURPLE_LIVE:"#9b59b6",COLOR_PURPLE_GRAPE:"#8e44ad",COLOR_PURPLE_VIVID:"#5800ff",COLOR_PURPLE_GRAY:"#eeeeff",COLOR_EMBER:"#ffdd00",COLOR_YELLOW:"#f7cb46",COLOR_YELLOW_GRAY:"#e7e6e7"};var Sn={};Object.defineProperty(Sn,"__esModule",{value:!0});Sn.default={CARD_SHADOW_MAIN:"0 6px 24px 1px rgba(0, 0, 0, 0.1)",CARD_SHADOW_SUB:"0 0 10px rgba(0, 0, 0, 0.1)",SHADOW_NEON_PURPLE:"0 16px 16px rgba(115, 90, 242, .3)"};var pt=B&&B.__assign||function(){return pt=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++){e=arguments[n];for(var s in e)Object.prototype.hasOwnProperty.call(e,s)&&(t[s]=e[s])}return t},pt.apply(this,arguments)};Object.defineProperty(vt,"__esModule",{value:!0});var Ro=_n,No=Sn;vt.default=pt(pt({},Ro.default),No.default);var jn={};Object.defineProperty(jn,"__esModule",{value:!0});var Le=vt,To="box-shadow: ".concat(Le.default.CARD_SHADOW_MAIN,";"),Lo="box-shadow: ".concat(Le.default.CARD_SHADOW_SUB,";"),Po=["color: ".concat(Le.default.COLOR_WHITE,";"),"box-shadow: ".concat(Le.default.SHADOW_NEON_PURPLE,";"),"background-color: ".concat(Le.default.COLOR_PURPLE_NEON,";")].join(`
`);jn.default={CARD_SHADOW_MAIN:To,CARD_SHADOW_SUB:Lo,NEON_PURPLE_BUTTON:Po};(function(t){Object.defineProperty(t,"__esModule",{value:!0}),t.mixin=t.theme=void 0;var e=vt;Object.defineProperty(t,"theme",{enumerable:!0,get:function(){return e.default}});var n=jn;Object.defineProperty(t,"mixin",{enumerable:!0,get:function(){return n.default}})})(fe);const Mo=S.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }

    .spinner {
        animation: spin 0.75s infinite ease;
        border: 3px solid transparent;
        border-color: ${fe.theme.COLOR_PURPLE_PROMINENT} transparent;
        width: 25px;
        height: 25px;
        border-radius: 50%;
    }
`,Ee=()=>{const[t,e]=m.useState(!1);return m.useEffect(()=>{const n=setTimeout(()=>{e(!0)},100);return()=>clearTimeout(n)}),t&&a.jsx(Mo,{children:a.jsx("div",{className:"spinner"})})},An=t=>m.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:36,height:36,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round",className:"ai ai-CheckBox",...t},m.createElement("rect",{x:3,y:3,width:18,height:18,rx:4}),m.createElement("path",{d:"M9 12l2.25 2L15 10"})),Bo=t=>m.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:36,height:36,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round",className:"ai ai-Cross",...t},m.createElement("path",{d:"M20 20L4 4m16 0L4 20"})),On=t=>m.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:36,height:36,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round",className:"ai ai-Data",...t},m.createElement("ellipse",{cx:12,cy:6,rx:8,ry:3}),m.createElement("path",{d:"M6.037 12C4.77 12.53 4 13.232 4 14c0 1.657 3.582 3 8 3s8-1.343 8-3c0-.768-.77-1.47-2.037-2"}),m.createElement("path",{d:"M4 6v4c0 1.657 3.582 3 8 3s8-1.343 8-3V6"}),m.createElement("path",{d:"M4 14v4c0 1.657 3.582 3 8 3s8-1.343 8-3v-4"})),Io=t=>m.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:36,height:36,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round",className:"ai ai-DoubleCheck",...t},m.createElement("path",{d:"M2 12l5.25 5 2.625-3"}),m.createElement("path",{d:"M8 12l5.25 5L22 7"}),m.createElement("path",{d:"M16 7l-3.5 4"})),Do=t=>m.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:36,height:36,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round",className:"ai ai-Download",...t},m.createElement("path",{d:"M12 15V3m0 12l-4-4m4 4l4-4"}),m.createElement("path",{d:"M2 17l.621 2.485A2 2 0 0 0 4.561 21H19.439a2 2 0 0 0 1.94-1.515L22 17"})),Yr=t=>m.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:36,height:36,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round",className:"ai ai-Heart",...t},m.createElement("path",{d:"M7 3C4.239 3 2 5.216 2 7.95c0 2.207.875 7.445 9.488 12.74a.985.985 0 0 0 1.024 0C21.125 15.395 22 10.157 22 7.95 22 5.216 19.761 3 17 3s-5 3-5 3-2.239-3-5-3z"})),Gr=t=>m.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:36,height:36,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round",className:"ai ai-Infinite",...t},m.createElement("path",{d:"M5.636 16C2.91 16 2 14 2 12s.91-4 3.636-4c3.637 0 9.091 8 12.728 8C21.09 16 22 14 22 12s-.91-4-3.636-4c-3.637 0-9.091 8-12.728 8z"})),Xr=t=>m.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:36,height:36,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round",className:"ai ai-ChevronLeft",...t},m.createElement("path",{d:"M15 4l-8 8 8 8"})),kt=t=>m.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:36,height:36,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round",className:"ai ai-TextAlignJustified",...t},m.createElement("path",{d:"M3 6h18M3 12h18M3 18h18"})),Qr=t=>m.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:36,height:36,viewBox:"0 0 24 24",fill:"currentColor",strokeWidth:2,className:"ai ai-MoreVerticalFill",...t},m.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M12 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4z"}),m.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M12 10a2 2 0 1 1 0 4 2 2 0 0 1 0-4z"}),m.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M12 18a2 2 0 1 1 0 4 2 2 0 0 1 0-4z"})),Zr=t=>m.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:36,height:36,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round",className:"ai ai-Pause",...t},m.createElement("path",{d:"M7 5v14M17 5v14"})),$o=t=>m.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:36,height:36,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round",className:"ai ai-Pencil",...t},m.createElement("path",{d:"M4.333 16.048L16.57 3.81a2.56 2.56 0 0 1 3.62 3.619L7.951 19.667a2 2 0 0 1-1.022.547L3 21l.786-3.93a2 2 0 0 1 .547-1.022z"}),m.createElement("path",{d:"M14.5 6.5l3 3"})),J=t=>m.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:36,height:36,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round",className:"ai ai-Play",...t},m.createElement("path",{d:"M6 4v16"}),m.createElement("path",{d:"M20 12L6 20"}),m.createElement("path",{d:"M20 12L6 4"})),es=t=>m.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:36,height:36,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round",className:"ai ai-ArrowRepeat",...t},m.createElement("path",{d:"M18 2l3 3-3 3"}),m.createElement("path",{d:"M6 22l-3-3 3-3"}),m.createElement("path",{d:"M21 5H10a7 7 0 0 0-7 7"}),m.createElement("path",{d:"M3 19h11a7 7 0 0 0 7-7"})),ts=t=>m.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:36,height:36,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round",className:"ai ai-ArrowRightLeft",...t},m.createElement("path",{d:"M21 6H3m18 0l-4 4m4-4l-4-4"}),m.createElement("path",{d:"M3 18h18M3 18l4 4m-4-4l4-4"})),ns=t=>m.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:36,height:36,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round",className:"ai ai-ArrowShuffle",...t},m.createElement("path",{d:"M2 19h3.908a2 2 0 0 0 1.682-.919L11.5 12l3.91-6.082A2 2 0 0 1 17.091 5H22m0 14h-4.908a2 2 0 0 1-1.682-.919L13.428 15M2 5h3.908a2 2 0 0 1 1.682.918L9.571 9"}),m.createElement("path",{d:"M19 2l3 3-3 3"}),m.createElement("path",{d:"M19 16l3 3-3 3"})),Rn=t=>m.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:36,height:36,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round",className:"ai ai-TrashBin",...t},m.createElement("path",{d:"M3 4l2.303 14.076a4 4 0 0 0 2.738 3.167l.328.104a12 12 0 0 0 7.262 0l.328-.104a4 4 0 0 0 2.738-3.166L21 4"}),m.createElement("ellipse",{cx:12,cy:4,rx:9,ry:2}));var Ct={},Pe=B&&B.__assign||function(){return Pe=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++){e=arguments[n];for(var s in e)Object.prototype.hasOwnProperty.call(e,s)&&(t[s]=e[s])}return t},Pe.apply(this,arguments)},ar=B&&B.__awaiter||function(t,e,n,r){function s(i){return i instanceof n?i:new n(function(o){o(i)})}return new(n||(n=Promise))(function(i,o){function l(c){try{u(r.next(c))}catch(h){o(h)}}function d(c){try{u(r.throw(c))}catch(h){o(h)}}function u(c){c.done?i(c.value):s(c.value).then(l,d)}u((r=r.apply(t,e||[])).next())})},cr=B&&B.__generator||function(t,e){var n={label:0,sent:function(){if(i[0]&1)throw i[1];return i[1]},trys:[],ops:[]},r,s,i,o;return o={next:l(0),throw:l(1),return:l(2)},typeof Symbol=="function"&&(o[Symbol.iterator]=function(){return this}),o;function l(u){return function(c){return d([u,c])}}function d(u){if(r)throw new TypeError("Generator is already executing.");for(;n;)try{if(r=1,s&&(i=u[0]&2?s.return:u[0]?s.throw||((i=s.return)&&i.call(s),0):s.next)&&!(i=i.call(s,u[1])).done)return i;switch(s=0,i&&(u=[u[0]&2,i.value]),u[0]){case 0:case 1:i=u;break;case 4:return n.label++,{value:u[1],done:!1};case 5:n.label++,s=u[1],u=[0];continue;case 7:u=n.ops.pop(),n.trys.pop();continue;default:if(i=n.trys,!(i=i.length>0&&i[i.length-1])&&(u[0]===6||u[0]===2)){n=0;continue}if(u[0]===3&&(!i||u[1]>i[0]&&u[1]<i[3])){n.label=u[1];break}if(u[0]===6&&n.label<i[1]){n.label=i[1],i=u;break}if(i&&n.label<i[2]){n.label=i[2],n.ops.push(u);break}i[2]&&n.ops.pop(),n.trys.pop();continue}u=e.call(t,n)}catch(c){u=[6,c],s=0}finally{r=i=0}if(u[0]&5)throw u[1];return{value:u[0]?u[1]:void 0,done:!0}}},qo=B&&B.__spreadArray||function(t,e){for(var n=0,r=e.length,s=t.length;n<r;n++,s++)t[s]=e[n];return t};Object.defineProperty(Ct,"__esModule",{value:!0});Ct.createStore=void 0;function Uo(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(t){var e=Math.random()*16|0,n=t=="x"?e:e&3|8;return n.toString(16)})}var rs=function(){function t(){this.debug=!1,this.debugger=function(e,n){console.log(e,n.slice(-5))},this._states=[],this._observers={},this._hasStateInit=!1}return Object.defineProperty(t.prototype,"state",{get:function(){return Pe({},this._states[this._states.length-1])},set:function(e){if(!this._hasStateInit){this._states.push(Object.freeze(e)),this._hasStateInit=!0;return}this.set(e)},enumerable:!1,configurable:!0}),t.prototype.runObserver=function(e){this._observers[e](this._states[this._states.length-1])},t.prototype.set=function(e){return ar(this,void 0,void 0,function(){var n=this;return cr(this,function(r){return this._hasStateInit||(this._hasStateInit=!0),[2,new Promise(function(s,i){return ar(n,void 0,void 0,function(){var o,l,d,u=this;return cr(this,function(c){switch(c.label){case 0:return this.beforeStateChange(),o=e,l=this._states[this._states.length-1],typeof o=="function"&&(o=o(l)),typeof o!="object"&&i(new TypeError("nextState is not object.")),o=Object.freeze(Pe(Pe({},l),o)),this._states.push(o),this.debug&&this.debugger?(d=Object.getPrototypeOf(this).constructor.name,this.debugger(d||"anonymous",qo([],this._states))):this._states.shift(),[4,Promise.all(Object.keys(this._observers).map(function(h){return new Promise(function(y){try{u.runObserver(h)}catch{u.unsubscribe(h)}y(!0)})}))];case 1:return c.sent(),this.afterStateChange(),s(o),[2]}})})})]})})},t.prototype.beforeStateChange=function(){},t.prototype.afterStateChange=function(){},t.prototype.subscribe=function(e,n){n!=null&&n.initialize&&e(this.state);var r=Uo();return this._observers[r]=e,r},t.prototype.unsubscribe=function(e){delete this._observers[e]},t.prototype.syncValue=function(e,n){var r=this;return function(){var s=r.subscribe(function(i){n(i[e])});return function(){r.unsubscribe(s)}}},t.prototype.syncState=function(e){var n=this;return function(){var r=n.subscribe(function(s){e(s)});return function(){n.unsubscribe(r)}}},t}(),pe=Ct.default=rs;function Fo(t){var e=new rs;return e.state=t,e}Ct.createStore=Fo;class zo extends pe{constructor(){super(),this.state={title:"",isOpen:!1,content:null}}open({title:e,content:n}){this.set({title:e||"",isOpen:!0,content:n})}close(){this.set({title:"",isOpen:!1,content:null})}}const L=new zo,en=t=>`${Math.floor(t/60)}:${("0"+Math.floor(t%60)).slice(-2)}`,lr=t=>Math.floor(t*1e3),Ho=t=>t/1e3,oe=Object.create(null);oe.open="0";oe.close="1";oe.ping="2";oe.pong="3";oe.message="4";oe.upgrade="5";oe.noop="6";const it=Object.create(null);Object.keys(oe).forEach(t=>{it[oe[t]]=t});const tn={type:"error",data:"parser error"},ss=typeof Blob=="function"||typeof Blob<"u"&&Object.prototype.toString.call(Blob)==="[object BlobConstructor]",is=typeof ArrayBuffer=="function",os=t=>typeof ArrayBuffer.isView=="function"?ArrayBuffer.isView(t):t&&t.buffer instanceof ArrayBuffer,Nn=({type:t,data:e},n,r)=>ss&&e instanceof Blob?n?r(e):dr(e,r):is&&(e instanceof ArrayBuffer||os(e))?n?r(e):dr(new Blob([e]),r):r(oe[t]+(e||"")),dr=(t,e)=>{const n=new FileReader;return n.onload=function(){const r=n.result.split(",")[1];e("b"+(r||""))},n.readAsDataURL(t)};function ur(t){return t instanceof Uint8Array?t:t instanceof ArrayBuffer?new Uint8Array(t):new Uint8Array(t.buffer,t.byteOffset,t.byteLength)}let Nt;function Wo(t,e){if(ss&&t.data instanceof Blob)return t.data.arrayBuffer().then(ur).then(e);if(is&&(t.data instanceof ArrayBuffer||os(t.data)))return e(ur(t.data));Nn(t,!1,n=>{Nt||(Nt=new TextEncoder),e(Nt.encode(n))})}const hr="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",Te=typeof Uint8Array>"u"?[]:new Uint8Array(256);for(let t=0;t<hr.length;t++)Te[hr.charCodeAt(t)]=t;const Vo=t=>{let e=t.length*.75,n=t.length,r,s=0,i,o,l,d;t[t.length-1]==="="&&(e--,t[t.length-2]==="="&&e--);const u=new ArrayBuffer(e),c=new Uint8Array(u);for(r=0;r<n;r+=4)i=Te[t.charCodeAt(r)],o=Te[t.charCodeAt(r+1)],l=Te[t.charCodeAt(r+2)],d=Te[t.charCodeAt(r+3)],c[s++]=i<<2|o>>4,c[s++]=(o&15)<<4|l>>2,c[s++]=(l&3)<<6|d&63;return u},Ko=typeof ArrayBuffer=="function",Tn=(t,e)=>{if(typeof t!="string")return{type:"message",data:as(t,e)};const n=t.charAt(0);return n==="b"?{type:"message",data:Jo(t.substring(1),e)}:it[n]?t.length>1?{type:it[n],data:t.substring(1)}:{type:it[n]}:tn},Jo=(t,e)=>{if(Ko){const n=Vo(t);return as(n,e)}else return{base64:!0,data:t}},as=(t,e)=>{switch(e){case"blob":return t instanceof Blob?t:new Blob([t]);case"arraybuffer":default:return t instanceof ArrayBuffer?t:t.buffer}},cs=String.fromCharCode(30),Yo=(t,e)=>{const n=t.length,r=new Array(n);let s=0;t.forEach((i,o)=>{Nn(i,!1,l=>{r[o]=l,++s===n&&e(r.join(cs))})})},Go=(t,e)=>{const n=t.split(cs),r=[];for(let s=0;s<n.length;s++){const i=Tn(n[s],e);if(r.push(i),i.type==="error")break}return r};function Xo(){return new TransformStream({transform(t,e){Wo(t,n=>{const r=n.length;let s;if(r<126)s=new Uint8Array(1),new DataView(s.buffer).setUint8(0,r);else if(r<65536){s=new Uint8Array(3);const i=new DataView(s.buffer);i.setUint8(0,126),i.setUint16(1,r)}else{s=new Uint8Array(9);const i=new DataView(s.buffer);i.setUint8(0,127),i.setBigUint64(1,BigInt(r))}t.data&&typeof t.data!="string"&&(s[0]|=128),e.enqueue(s),e.enqueue(n)})}})}let Tt;function Qe(t){return t.reduce((e,n)=>e+n.length,0)}function Ze(t,e){if(t[0].length===e)return t.shift();const n=new Uint8Array(e);let r=0;for(let s=0;s<e;s++)n[s]=t[0][r++],r===t[0].length&&(t.shift(),r=0);return t.length&&r<t[0].length&&(t[0]=t[0].slice(r)),n}function Qo(t,e){Tt||(Tt=new TextDecoder);const n=[];let r=0,s=-1,i=!1;return new TransformStream({transform(o,l){for(n.push(o);;){if(r===0){if(Qe(n)<1)break;const d=Ze(n,1);i=(d[0]&128)===128,s=d[0]&127,s<126?r=3:s===126?r=1:r=2}else if(r===1){if(Qe(n)<2)break;const d=Ze(n,2);s=new DataView(d.buffer,d.byteOffset,d.length).getUint16(0),r=3}else if(r===2){if(Qe(n)<8)break;const d=Ze(n,8),u=new DataView(d.buffer,d.byteOffset,d.length),c=u.getUint32(0);if(c>Math.pow(2,53-32)-1){l.enqueue(tn);break}s=c*Math.pow(2,32)+u.getUint32(4),r=3}else{if(Qe(n)<s)break;const d=Ze(n,s);l.enqueue(Tn(i?d:Tt.decode(d),e)),r=0}if(s===0||s>t){l.enqueue(tn);break}}}})}const ls=4;function P(t){if(t)return Zo(t)}function Zo(t){for(var e in P.prototype)t[e]=P.prototype[e];return t}P.prototype.on=P.prototype.addEventListener=function(t,e){return this._callbacks=this._callbacks||{},(this._callbacks["$"+t]=this._callbacks["$"+t]||[]).push(e),this};P.prototype.once=function(t,e){function n(){this.off(t,n),e.apply(this,arguments)}return n.fn=e,this.on(t,n),this};P.prototype.off=P.prototype.removeListener=P.prototype.removeAllListeners=P.prototype.removeEventListener=function(t,e){if(this._callbacks=this._callbacks||{},arguments.length==0)return this._callbacks={},this;var n=this._callbacks["$"+t];if(!n)return this;if(arguments.length==1)return delete this._callbacks["$"+t],this;for(var r,s=0;s<n.length;s++)if(r=n[s],r===e||r.fn===e){n.splice(s,1);break}return n.length===0&&delete this._callbacks["$"+t],this};P.prototype.emit=function(t){this._callbacks=this._callbacks||{};for(var e=new Array(arguments.length-1),n=this._callbacks["$"+t],r=1;r<arguments.length;r++)e[r-1]=arguments[r];if(n){n=n.slice(0);for(var r=0,s=n.length;r<s;++r)n[r].apply(this,e)}return this};P.prototype.emitReserved=P.prototype.emit;P.prototype.listeners=function(t){return this._callbacks=this._callbacks||{},this._callbacks["$"+t]||[]};P.prototype.hasListeners=function(t){return!!this.listeners(t).length};const G=(()=>typeof self<"u"?self:typeof window<"u"?window:Function("return this")())();function ds(t,...e){return e.reduce((n,r)=>(t.hasOwnProperty(r)&&(n[r]=t[r]),n),{})}const ea=G.setTimeout,ta=G.clearTimeout;function Et(t,e){e.useNativeTimers?(t.setTimeoutFn=ea.bind(G),t.clearTimeoutFn=ta.bind(G)):(t.setTimeoutFn=G.setTimeout.bind(G),t.clearTimeoutFn=G.clearTimeout.bind(G))}const na=1.33;function ra(t){return typeof t=="string"?sa(t):Math.ceil((t.byteLength||t.size)*na)}function sa(t){let e=0,n=0;for(let r=0,s=t.length;r<s;r++)e=t.charCodeAt(r),e<128?n+=1:e<2048?n+=2:e<55296||e>=57344?n+=3:(r++,n+=4);return n}function ia(t){let e="";for(let n in t)t.hasOwnProperty(n)&&(e.length&&(e+="&"),e+=encodeURIComponent(n)+"="+encodeURIComponent(t[n]));return e}function oa(t){let e={},n=t.split("&");for(let r=0,s=n.length;r<s;r++){let i=n[r].split("=");e[decodeURIComponent(i[0])]=decodeURIComponent(i[1])}return e}class aa extends Error{constructor(e,n,r){super(e),this.description=n,this.context=r,this.type="TransportError"}}class Ln extends P{constructor(e){super(),this.writable=!1,Et(this,e),this.opts=e,this.query=e.query,this.socket=e.socket}onError(e,n,r){return super.emitReserved("error",new aa(e,n,r)),this}open(){return this.readyState="opening",this.doOpen(),this}close(){return(this.readyState==="opening"||this.readyState==="open")&&(this.doClose(),this.onClose()),this}send(e){this.readyState==="open"&&this.write(e)}onOpen(){this.readyState="open",this.writable=!0,super.emitReserved("open")}onData(e){const n=Tn(e,this.socket.binaryType);this.onPacket(n)}onPacket(e){super.emitReserved("packet",e)}onClose(e){this.readyState="closed",super.emitReserved("close",e)}pause(e){}createUri(e,n={}){return e+"://"+this._hostname()+this._port()+this.opts.path+this._query(n)}_hostname(){const e=this.opts.hostname;return e.indexOf(":")===-1?e:"["+e+"]"}_port(){return this.opts.port&&(this.opts.secure&&+(this.opts.port!==443)||!this.opts.secure&&Number(this.opts.port)!==80)?":"+this.opts.port:""}_query(e){const n=ia(e);return n.length?"?"+n:""}}const us="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_".split(""),nn=64,ca={};let fr=0,et=0,pr;function mr(t){let e="";do e=us[t%nn]+e,t=Math.floor(t/nn);while(t>0);return e}function hs(){const t=mr(+new Date);return t!==pr?(fr=0,pr=t):t+"."+mr(fr++)}for(;et<nn;et++)ca[us[et]]=et;let fs=!1;try{fs=typeof XMLHttpRequest<"u"&&"withCredentials"in new XMLHttpRequest}catch{}const la=fs;function ps(t){const e=t.xdomain;try{if(typeof XMLHttpRequest<"u"&&(!e||la))return new XMLHttpRequest}catch{}if(!e)try{return new G[["Active"].concat("Object").join("X")]("Microsoft.XMLHTTP")}catch{}}function da(){}const ua=function(){return new ps({xdomain:!1}).responseType!=null}();class ha extends Ln{constructor(e){if(super(e),this.polling=!1,typeof location<"u"){const r=location.protocol==="https:";let s=location.port;s||(s=r?"443":"80"),this.xd=typeof location<"u"&&e.hostname!==location.hostname||s!==e.port}const n=e&&e.forceBase64;this.supportsBinary=ua&&!n,this.opts.withCredentials&&(this.cookieJar=void 0)}get name(){return"polling"}doOpen(){this.poll()}pause(e){this.readyState="pausing";const n=()=>{this.readyState="paused",e()};if(this.polling||!this.writable){let r=0;this.polling&&(r++,this.once("pollComplete",function(){--r||n()})),this.writable||(r++,this.once("drain",function(){--r||n()}))}else n()}poll(){this.polling=!0,this.doPoll(),this.emitReserved("poll")}onData(e){const n=r=>{if(this.readyState==="opening"&&r.type==="open"&&this.onOpen(),r.type==="close")return this.onClose({description:"transport closed by the server"}),!1;this.onPacket(r)};Go(e,this.socket.binaryType).forEach(n),this.readyState!=="closed"&&(this.polling=!1,this.emitReserved("pollComplete"),this.readyState==="open"&&this.poll())}doClose(){const e=()=>{this.write([{type:"close"}])};this.readyState==="open"?e():this.once("open",e)}write(e){this.writable=!1,Yo(e,n=>{this.doWrite(n,()=>{this.writable=!0,this.emitReserved("drain")})})}uri(){const e=this.opts.secure?"https":"http",n=this.query||{};return this.opts.timestampRequests!==!1&&(n[this.opts.timestampParam]=hs()),!this.supportsBinary&&!n.sid&&(n.b64=1),this.createUri(e,n)}request(e={}){return Object.assign(e,{xd:this.xd,cookieJar:this.cookieJar},this.opts),new se(this.uri(),e)}doWrite(e,n){const r=this.request({method:"POST",data:e});r.on("success",n),r.on("error",(s,i)=>{this.onError("xhr post error",s,i)})}doPoll(){const e=this.request();e.on("data",this.onData.bind(this)),e.on("error",(n,r)=>{this.onError("xhr poll error",n,r)}),this.pollXhr=e}}class se extends P{constructor(e,n){super(),Et(this,n),this.opts=n,this.method=n.method||"GET",this.uri=e,this.data=n.data!==void 0?n.data:null,this.create()}create(){var e;const n=ds(this.opts,"agent","pfx","key","passphrase","cert","ca","ciphers","rejectUnauthorized","autoUnref");n.xdomain=!!this.opts.xd;const r=this.xhr=new ps(n);try{r.open(this.method,this.uri,!0);try{if(this.opts.extraHeaders){r.setDisableHeaderCheck&&r.setDisableHeaderCheck(!0);for(let s in this.opts.extraHeaders)this.opts.extraHeaders.hasOwnProperty(s)&&r.setRequestHeader(s,this.opts.extraHeaders[s])}}catch{}if(this.method==="POST")try{r.setRequestHeader("Content-type","text/plain;charset=UTF-8")}catch{}try{r.setRequestHeader("Accept","*/*")}catch{}(e=this.opts.cookieJar)===null||e===void 0||e.addCookies(r),"withCredentials"in r&&(r.withCredentials=this.opts.withCredentials),this.opts.requestTimeout&&(r.timeout=this.opts.requestTimeout),r.onreadystatechange=()=>{var s;r.readyState===3&&((s=this.opts.cookieJar)===null||s===void 0||s.parseCookies(r)),r.readyState===4&&(r.status===200||r.status===1223?this.onLoad():this.setTimeoutFn(()=>{this.onError(typeof r.status=="number"?r.status:0)},0))},r.send(this.data)}catch(s){this.setTimeoutFn(()=>{this.onError(s)},0);return}typeof document<"u"&&(this.index=se.requestsCount++,se.requests[this.index]=this)}onError(e){this.emitReserved("error",e,this.xhr),this.cleanup(!0)}cleanup(e){if(!(typeof this.xhr>"u"||this.xhr===null)){if(this.xhr.onreadystatechange=da,e)try{this.xhr.abort()}catch{}typeof document<"u"&&delete se.requests[this.index],this.xhr=null}}onLoad(){const e=this.xhr.responseText;e!==null&&(this.emitReserved("data",e),this.emitReserved("success"),this.cleanup())}abort(){this.cleanup()}}se.requestsCount=0;se.requests={};if(typeof document<"u"){if(typeof attachEvent=="function")attachEvent("onunload",gr);else if(typeof addEventListener=="function"){const t="onpagehide"in G?"pagehide":"unload";addEventListener(t,gr,!1)}}function gr(){for(let t in se.requests)se.requests.hasOwnProperty(t)&&se.requests[t].abort()}const Pn=(()=>typeof Promise=="function"&&typeof Promise.resolve=="function"?e=>Promise.resolve().then(e):(e,n)=>n(e,0))(),tt=G.WebSocket||G.MozWebSocket,yr=!0,fa="arraybuffer",br=typeof navigator<"u"&&typeof navigator.product=="string"&&navigator.product.toLowerCase()==="reactnative";class pa extends Ln{constructor(e){super(e),this.supportsBinary=!e.forceBase64}get name(){return"websocket"}doOpen(){if(!this.check())return;const e=this.uri(),n=this.opts.protocols,r=br?{}:ds(this.opts,"agent","perMessageDeflate","pfx","key","passphrase","cert","ca","ciphers","rejectUnauthorized","localAddress","protocolVersion","origin","maxPayload","family","checkServerIdentity");this.opts.extraHeaders&&(r.headers=this.opts.extraHeaders);try{this.ws=yr&&!br?n?new tt(e,n):new tt(e):new tt(e,n,r)}catch(s){return this.emitReserved("error",s)}this.ws.binaryType=this.socket.binaryType,this.addEventListeners()}addEventListeners(){this.ws.onopen=()=>{this.opts.autoUnref&&this.ws._socket.unref(),this.onOpen()},this.ws.onclose=e=>this.onClose({description:"websocket connection closed",context:e}),this.ws.onmessage=e=>this.onData(e.data),this.ws.onerror=e=>this.onError("websocket error",e)}write(e){this.writable=!1;for(let n=0;n<e.length;n++){const r=e[n],s=n===e.length-1;Nn(r,this.supportsBinary,i=>{const o={};try{yr&&this.ws.send(i)}catch{}s&&Pn(()=>{this.writable=!0,this.emitReserved("drain")},this.setTimeoutFn)})}}doClose(){typeof this.ws<"u"&&(this.ws.close(),this.ws=null)}uri(){const e=this.opts.secure?"wss":"ws",n=this.query||{};return this.opts.timestampRequests&&(n[this.opts.timestampParam]=hs()),this.supportsBinary||(n.b64=1),this.createUri(e,n)}check(){return!!tt}}class ma extends Ln{get name(){return"webtransport"}doOpen(){typeof WebTransport=="function"&&(this.transport=new WebTransport(this.createUri("https"),this.opts.transportOptions[this.name]),this.transport.closed.then(()=>{this.onClose()}).catch(e=>{this.onError("webtransport error",e)}),this.transport.ready.then(()=>{this.transport.createBidirectionalStream().then(e=>{const n=Qo(Number.MAX_SAFE_INTEGER,this.socket.binaryType),r=e.readable.pipeThrough(n).getReader(),s=Xo();s.readable.pipeTo(e.writable),this.writer=s.writable.getWriter();const i=()=>{r.read().then(({done:l,value:d})=>{l||(this.onPacket(d),i())}).catch(l=>{})};i();const o={type:"open"};this.query.sid&&(o.data=`{"sid":"${this.query.sid}"}`),this.writer.write(o).then(()=>this.onOpen())})}))}write(e){this.writable=!1;for(let n=0;n<e.length;n++){const r=e[n],s=n===e.length-1;this.writer.write(r).then(()=>{s&&Pn(()=>{this.writable=!0,this.emitReserved("drain")},this.setTimeoutFn)})}}doClose(){var e;(e=this.transport)===null||e===void 0||e.close()}}const ga={websocket:pa,webtransport:ma,polling:ha},ya=/^(?:(?![^:@\/?#]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@\/?#]*)(?::([^:@\/?#]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,ba=["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"];function rn(t){const e=t,n=t.indexOf("["),r=t.indexOf("]");n!=-1&&r!=-1&&(t=t.substring(0,n)+t.substring(n,r).replace(/:/g,";")+t.substring(r,t.length));let s=ya.exec(t||""),i={},o=14;for(;o--;)i[ba[o]]=s[o]||"";return n!=-1&&r!=-1&&(i.source=e,i.host=i.host.substring(1,i.host.length-1).replace(/;/g,":"),i.authority=i.authority.replace("[","").replace("]","").replace(/;/g,":"),i.ipv6uri=!0),i.pathNames=xa(i,i.path),i.queryKey=wa(i,i.query),i}function xa(t,e){const n=/\/{2,9}/g,r=e.replace(n,"/").split("/");return(e.slice(0,1)=="/"||e.length===0)&&r.splice(0,1),e.slice(-1)=="/"&&r.splice(r.length-1,1),r}function wa(t,e){const n={};return e.replace(/(?:^|&)([^&=]*)=?([^&]*)/g,function(r,s,i){s&&(n[s]=i)}),n}let ms=class xe extends P{constructor(e,n={}){super(),this.binaryType=fa,this.writeBuffer=[],e&&typeof e=="object"&&(n=e,e=null),e?(e=rn(e),n.hostname=e.host,n.secure=e.protocol==="https"||e.protocol==="wss",n.port=e.port,e.query&&(n.query=e.query)):n.host&&(n.hostname=rn(n.host).host),Et(this,n),this.secure=n.secure!=null?n.secure:typeof location<"u"&&location.protocol==="https:",n.hostname&&!n.port&&(n.port=this.secure?"443":"80"),this.hostname=n.hostname||(typeof location<"u"?location.hostname:"localhost"),this.port=n.port||(typeof location<"u"&&location.port?location.port:this.secure?"443":"80"),this.transports=n.transports||["polling","websocket","webtransport"],this.writeBuffer=[],this.prevBufferLen=0,this.opts=Object.assign({path:"/engine.io",agent:!1,withCredentials:!1,upgrade:!0,timestampParam:"t",rememberUpgrade:!1,addTrailingSlash:!0,rejectUnauthorized:!0,perMessageDeflate:{threshold:1024},transportOptions:{},closeOnBeforeunload:!1},n),this.opts.path=this.opts.path.replace(/\/$/,"")+(this.opts.addTrailingSlash?"/":""),typeof this.opts.query=="string"&&(this.opts.query=oa(this.opts.query)),this.id=null,this.upgrades=null,this.pingInterval=null,this.pingTimeout=null,this.pingTimeoutTimer=null,typeof addEventListener=="function"&&(this.opts.closeOnBeforeunload&&(this.beforeunloadEventListener=()=>{this.transport&&(this.transport.removeAllListeners(),this.transport.close())},addEventListener("beforeunload",this.beforeunloadEventListener,!1)),this.hostname!=="localhost"&&(this.offlineEventListener=()=>{this.onClose("transport close",{description:"network connection lost"})},addEventListener("offline",this.offlineEventListener,!1))),this.open()}createTransport(e){const n=Object.assign({},this.opts.query);n.EIO=ls,n.transport=e,this.id&&(n.sid=this.id);const r=Object.assign({},this.opts,{query:n,socket:this,hostname:this.hostname,secure:this.secure,port:this.port},this.opts.transportOptions[e]);return new ga[e](r)}open(){let e;if(this.opts.rememberUpgrade&&xe.priorWebsocketSuccess&&this.transports.indexOf("websocket")!==-1)e="websocket";else if(this.transports.length===0){this.setTimeoutFn(()=>{this.emitReserved("error","No transports available")},0);return}else e=this.transports[0];this.readyState="opening";try{e=this.createTransport(e)}catch{this.transports.shift(),this.open();return}e.open(),this.setTransport(e)}setTransport(e){this.transport&&this.transport.removeAllListeners(),this.transport=e,e.on("drain",this.onDrain.bind(this)).on("packet",this.onPacket.bind(this)).on("error",this.onError.bind(this)).on("close",n=>this.onClose("transport close",n))}probe(e){let n=this.createTransport(e),r=!1;xe.priorWebsocketSuccess=!1;const s=()=>{r||(n.send([{type:"ping",data:"probe"}]),n.once("packet",h=>{if(!r)if(h.type==="pong"&&h.data==="probe"){if(this.upgrading=!0,this.emitReserved("upgrading",n),!n)return;xe.priorWebsocketSuccess=n.name==="websocket",this.transport.pause(()=>{r||this.readyState!=="closed"&&(c(),this.setTransport(n),n.send([{type:"upgrade"}]),this.emitReserved("upgrade",n),n=null,this.upgrading=!1,this.flush())})}else{const y=new Error("probe error");y.transport=n.name,this.emitReserved("upgradeError",y)}}))};function i(){r||(r=!0,c(),n.close(),n=null)}const o=h=>{const y=new Error("probe error: "+h);y.transport=n.name,i(),this.emitReserved("upgradeError",y)};function l(){o("transport closed")}function d(){o("socket closed")}function u(h){n&&h.name!==n.name&&i()}const c=()=>{n.removeListener("open",s),n.removeListener("error",o),n.removeListener("close",l),this.off("close",d),this.off("upgrading",u)};n.once("open",s),n.once("error",o),n.once("close",l),this.once("close",d),this.once("upgrading",u),this.upgrades.indexOf("webtransport")!==-1&&e!=="webtransport"?this.setTimeoutFn(()=>{r||n.open()},200):n.open()}onOpen(){if(this.readyState="open",xe.priorWebsocketSuccess=this.transport.name==="websocket",this.emitReserved("open"),this.flush(),this.readyState==="open"&&this.opts.upgrade){let e=0;const n=this.upgrades.length;for(;e<n;e++)this.probe(this.upgrades[e])}}onPacket(e){if(this.readyState==="opening"||this.readyState==="open"||this.readyState==="closing")switch(this.emitReserved("packet",e),this.emitReserved("heartbeat"),this.resetPingTimeout(),e.type){case"open":this.onHandshake(JSON.parse(e.data));break;case"ping":this.sendPacket("pong"),this.emitReserved("ping"),this.emitReserved("pong");break;case"error":const n=new Error("server error");n.code=e.data,this.onError(n);break;case"message":this.emitReserved("data",e.data),this.emitReserved("message",e.data);break}}onHandshake(e){this.emitReserved("handshake",e),this.id=e.sid,this.transport.query.sid=e.sid,this.upgrades=this.filterUpgrades(e.upgrades),this.pingInterval=e.pingInterval,this.pingTimeout=e.pingTimeout,this.maxPayload=e.maxPayload,this.onOpen(),this.readyState!=="closed"&&this.resetPingTimeout()}resetPingTimeout(){this.clearTimeoutFn(this.pingTimeoutTimer),this.pingTimeoutTimer=this.setTimeoutFn(()=>{this.onClose("ping timeout")},this.pingInterval+this.pingTimeout),this.opts.autoUnref&&this.pingTimeoutTimer.unref()}onDrain(){this.writeBuffer.splice(0,this.prevBufferLen),this.prevBufferLen=0,this.writeBuffer.length===0?this.emitReserved("drain"):this.flush()}flush(){if(this.readyState!=="closed"&&this.transport.writable&&!this.upgrading&&this.writeBuffer.length){const e=this.getWritablePackets();this.transport.send(e),this.prevBufferLen=e.length,this.emitReserved("flush")}}getWritablePackets(){if(!(this.maxPayload&&this.transport.name==="polling"&&this.writeBuffer.length>1))return this.writeBuffer;let n=1;for(let r=0;r<this.writeBuffer.length;r++){const s=this.writeBuffer[r].data;if(s&&(n+=ra(s)),r>0&&n>this.maxPayload)return this.writeBuffer.slice(0,r);n+=2}return this.writeBuffer}write(e,n,r){return this.sendPacket("message",e,n,r),this}send(e,n,r){return this.sendPacket("message",e,n,r),this}sendPacket(e,n,r,s){if(typeof n=="function"&&(s=n,n=void 0),typeof r=="function"&&(s=r,r=null),this.readyState==="closing"||this.readyState==="closed")return;r=r||{},r.compress=r.compress!==!1;const i={type:e,data:n,options:r};this.emitReserved("packetCreate",i),this.writeBuffer.push(i),s&&this.once("flush",s),this.flush()}close(){const e=()=>{this.onClose("forced close"),this.transport.close()},n=()=>{this.off("upgrade",n),this.off("upgradeError",n),e()},r=()=>{this.once("upgrade",n),this.once("upgradeError",n)};return(this.readyState==="opening"||this.readyState==="open")&&(this.readyState="closing",this.writeBuffer.length?this.once("drain",()=>{this.upgrading?r():e()}):this.upgrading?r():e()),this}onError(e){xe.priorWebsocketSuccess=!1,this.emitReserved("error",e),this.onClose("transport error",e)}onClose(e,n){(this.readyState==="opening"||this.readyState==="open"||this.readyState==="closing")&&(this.clearTimeoutFn(this.pingTimeoutTimer),this.transport.removeAllListeners("close"),this.transport.close(),this.transport.removeAllListeners(),typeof removeEventListener=="function"&&(removeEventListener("beforeunload",this.beforeunloadEventListener,!1),removeEventListener("offline",this.offlineEventListener,!1)),this.readyState="closed",this.id=null,this.emitReserved("close",e,n),this.writeBuffer=[],this.prevBufferLen=0)}filterUpgrades(e){const n=[];let r=0;const s=e.length;for(;r<s;r++)~this.transports.indexOf(e[r])&&n.push(e[r]);return n}};ms.protocol=ls;function va(t,e="",n){let r=t;n=n||typeof location<"u"&&location,t==null&&(t=n.protocol+"//"+n.host),typeof t=="string"&&(t.charAt(0)==="/"&&(t.charAt(1)==="/"?t=n.protocol+t:t=n.host+t),/^(https?|wss?):\/\//.test(t)||(typeof n<"u"?t=n.protocol+"//"+t:t="https://"+t),r=rn(t)),r.port||(/^(http|ws)$/.test(r.protocol)?r.port="80":/^(http|ws)s$/.test(r.protocol)&&(r.port="443")),r.path=r.path||"/";const i=r.host.indexOf(":")!==-1?"["+r.host+"]":r.host;return r.id=r.protocol+"://"+i+":"+r.port+e,r.href=r.protocol+"://"+i+(n&&n.port===r.port?"":":"+r.port),r}const ka=typeof ArrayBuffer=="function",Ca=t=>typeof ArrayBuffer.isView=="function"?ArrayBuffer.isView(t):t.buffer instanceof ArrayBuffer,gs=Object.prototype.toString,Ea=typeof Blob=="function"||typeof Blob<"u"&&gs.call(Blob)==="[object BlobConstructor]",_a=typeof File=="function"||typeof File<"u"&&gs.call(File)==="[object FileConstructor]";function Mn(t){return ka&&(t instanceof ArrayBuffer||Ca(t))||Ea&&t instanceof Blob||_a&&t instanceof File}function ot(t,e){if(!t||typeof t!="object")return!1;if(Array.isArray(t)){for(let n=0,r=t.length;n<r;n++)if(ot(t[n]))return!0;return!1}if(Mn(t))return!0;if(t.toJSON&&typeof t.toJSON=="function"&&arguments.length===1)return ot(t.toJSON(),!0);for(const n in t)if(Object.prototype.hasOwnProperty.call(t,n)&&ot(t[n]))return!0;return!1}function Sa(t){const e=[],n=t.data,r=t;return r.data=sn(n,e),r.attachments=e.length,{packet:r,buffers:e}}function sn(t,e){if(!t)return t;if(Mn(t)){const n={_placeholder:!0,num:e.length};return e.push(t),n}else if(Array.isArray(t)){const n=new Array(t.length);for(let r=0;r<t.length;r++)n[r]=sn(t[r],e);return n}else if(typeof t=="object"&&!(t instanceof Date)){const n={};for(const r in t)Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=sn(t[r],e));return n}return t}function ja(t,e){return t.data=on(t.data,e),delete t.attachments,t}function on(t,e){if(!t)return t;if(t&&t._placeholder===!0){if(typeof t.num=="number"&&t.num>=0&&t.num<e.length)return e[t.num];throw new Error("illegal attachments")}else if(Array.isArray(t))for(let n=0;n<t.length;n++)t[n]=on(t[n],e);else if(typeof t=="object")for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&(t[n]=on(t[n],e));return t}const Aa=["connect","connect_error","disconnect","disconnecting","newListener","removeListener"],Oa=5;var C;(function(t){t[t.CONNECT=0]="CONNECT",t[t.DISCONNECT=1]="DISCONNECT",t[t.EVENT=2]="EVENT",t[t.ACK=3]="ACK",t[t.CONNECT_ERROR=4]="CONNECT_ERROR",t[t.BINARY_EVENT=5]="BINARY_EVENT",t[t.BINARY_ACK=6]="BINARY_ACK"})(C||(C={}));class Ra{constructor(e){this.replacer=e}encode(e){return(e.type===C.EVENT||e.type===C.ACK)&&ot(e)?this.encodeAsBinary({type:e.type===C.EVENT?C.BINARY_EVENT:C.BINARY_ACK,nsp:e.nsp,data:e.data,id:e.id}):[this.encodeAsString(e)]}encodeAsString(e){let n=""+e.type;return(e.type===C.BINARY_EVENT||e.type===C.BINARY_ACK)&&(n+=e.attachments+"-"),e.nsp&&e.nsp!=="/"&&(n+=e.nsp+","),e.id!=null&&(n+=e.id),e.data!=null&&(n+=JSON.stringify(e.data,this.replacer)),n}encodeAsBinary(e){const n=Sa(e),r=this.encodeAsString(n.packet),s=n.buffers;return s.unshift(r),s}}function xr(t){return Object.prototype.toString.call(t)==="[object Object]"}class Bn extends P{constructor(e){super(),this.reviver=e}add(e){let n;if(typeof e=="string"){if(this.reconstructor)throw new Error("got plaintext data when reconstructing a packet");n=this.decodeString(e);const r=n.type===C.BINARY_EVENT;r||n.type===C.BINARY_ACK?(n.type=r?C.EVENT:C.ACK,this.reconstructor=new Na(n),n.attachments===0&&super.emitReserved("decoded",n)):super.emitReserved("decoded",n)}else if(Mn(e)||e.base64)if(this.reconstructor)n=this.reconstructor.takeBinaryData(e),n&&(this.reconstructor=null,super.emitReserved("decoded",n));else throw new Error("got binary data when not reconstructing a packet");else throw new Error("Unknown type: "+e)}decodeString(e){let n=0;const r={type:Number(e.charAt(0))};if(C[r.type]===void 0)throw new Error("unknown packet type "+r.type);if(r.type===C.BINARY_EVENT||r.type===C.BINARY_ACK){const i=n+1;for(;e.charAt(++n)!=="-"&&n!=e.length;);const o=e.substring(i,n);if(o!=Number(o)||e.charAt(n)!=="-")throw new Error("Illegal attachments");r.attachments=Number(o)}if(e.charAt(n+1)==="/"){const i=n+1;for(;++n&&!(e.charAt(n)===","||n===e.length););r.nsp=e.substring(i,n)}else r.nsp="/";const s=e.charAt(n+1);if(s!==""&&Number(s)==s){const i=n+1;for(;++n;){const o=e.charAt(n);if(o==null||Number(o)!=o){--n;break}if(n===e.length)break}r.id=Number(e.substring(i,n+1))}if(e.charAt(++n)){const i=this.tryParse(e.substr(n));if(Bn.isPayloadValid(r.type,i))r.data=i;else throw new Error("invalid payload")}return r}tryParse(e){try{return JSON.parse(e,this.reviver)}catch{return!1}}static isPayloadValid(e,n){switch(e){case C.CONNECT:return xr(n);case C.DISCONNECT:return n===void 0;case C.CONNECT_ERROR:return typeof n=="string"||xr(n);case C.EVENT:case C.BINARY_EVENT:return Array.isArray(n)&&(typeof n[0]=="number"||typeof n[0]=="string"&&Aa.indexOf(n[0])===-1);case C.ACK:case C.BINARY_ACK:return Array.isArray(n)}}destroy(){this.reconstructor&&(this.reconstructor.finishedReconstruction(),this.reconstructor=null)}}class Na{constructor(e){this.packet=e,this.buffers=[],this.reconPack=e}takeBinaryData(e){if(this.buffers.push(e),this.buffers.length===this.reconPack.attachments){const n=ja(this.reconPack,this.buffers);return this.finishedReconstruction(),n}return null}finishedReconstruction(){this.reconPack=null,this.buffers=[]}}const Ta=Object.freeze(Object.defineProperty({__proto__:null,Decoder:Bn,Encoder:Ra,get PacketType(){return C},protocol:Oa},Symbol.toStringTag,{value:"Module"}));function Q(t,e,n){return t.on(e,n),function(){t.off(e,n)}}const La=Object.freeze({connect:1,connect_error:1,disconnect:1,disconnecting:1,newListener:1,removeListener:1});class ys extends P{constructor(e,n,r){super(),this.connected=!1,this.recovered=!1,this.receiveBuffer=[],this.sendBuffer=[],this._queue=[],this._queueSeq=0,this.ids=0,this.acks={},this.flags={},this.io=e,this.nsp=n,r&&r.auth&&(this.auth=r.auth),this._opts=Object.assign({},r),this.io._autoConnect&&this.open()}get disconnected(){return!this.connected}subEvents(){if(this.subs)return;const e=this.io;this.subs=[Q(e,"open",this.onopen.bind(this)),Q(e,"packet",this.onpacket.bind(this)),Q(e,"error",this.onerror.bind(this)),Q(e,"close",this.onclose.bind(this))]}get active(){return!!this.subs}connect(){return this.connected?this:(this.subEvents(),this.io._reconnecting||this.io.open(),this.io._readyState==="open"&&this.onopen(),this)}open(){return this.connect()}send(...e){return e.unshift("message"),this.emit.apply(this,e),this}emit(e,...n){if(La.hasOwnProperty(e))throw new Error('"'+e.toString()+'" is a reserved event name');if(n.unshift(e),this._opts.retries&&!this.flags.fromQueue&&!this.flags.volatile)return this._addToQueue(n),this;const r={type:C.EVENT,data:n};if(r.options={},r.options.compress=this.flags.compress!==!1,typeof n[n.length-1]=="function"){const o=this.ids++,l=n.pop();this._registerAckCallback(o,l),r.id=o}const s=this.io.engine&&this.io.engine.transport&&this.io.engine.transport.writable;return this.flags.volatile&&(!s||!this.connected)||(this.connected?(this.notifyOutgoingListeners(r),this.packet(r)):this.sendBuffer.push(r)),this.flags={},this}_registerAckCallback(e,n){var r;const s=(r=this.flags.timeout)!==null&&r!==void 0?r:this._opts.ackTimeout;if(s===void 0){this.acks[e]=n;return}const i=this.io.setTimeoutFn(()=>{delete this.acks[e];for(let o=0;o<this.sendBuffer.length;o++)this.sendBuffer[o].id===e&&this.sendBuffer.splice(o,1);n.call(this,new Error("operation has timed out"))},s);this.acks[e]=(...o)=>{this.io.clearTimeoutFn(i),n.apply(this,[null,...o])}}emitWithAck(e,...n){const r=this.flags.timeout!==void 0||this._opts.ackTimeout!==void 0;return new Promise((s,i)=>{n.push((o,l)=>r?o?i(o):s(l):s(o)),this.emit(e,...n)})}_addToQueue(e){let n;typeof e[e.length-1]=="function"&&(n=e.pop());const r={id:this._queueSeq++,tryCount:0,pending:!1,args:e,flags:Object.assign({fromQueue:!0},this.flags)};e.push((s,...i)=>r!==this._queue[0]?void 0:(s!==null?r.tryCount>this._opts.retries&&(this._queue.shift(),n&&n(s)):(this._queue.shift(),n&&n(null,...i)),r.pending=!1,this._drainQueue())),this._queue.push(r),this._drainQueue()}_drainQueue(e=!1){if(!this.connected||this._queue.length===0)return;const n=this._queue[0];n.pending&&!e||(n.pending=!0,n.tryCount++,this.flags=n.flags,this.emit.apply(this,n.args))}packet(e){e.nsp=this.nsp,this.io._packet(e)}onopen(){typeof this.auth=="function"?this.auth(e=>{this._sendConnectPacket(e)}):this._sendConnectPacket(this.auth)}_sendConnectPacket(e){this.packet({type:C.CONNECT,data:this._pid?Object.assign({pid:this._pid,offset:this._lastOffset},e):e})}onerror(e){this.connected||this.emitReserved("connect_error",e)}onclose(e,n){this.connected=!1,delete this.id,this.emitReserved("disconnect",e,n)}onpacket(e){if(e.nsp===this.nsp)switch(e.type){case C.CONNECT:e.data&&e.data.sid?this.onconnect(e.data.sid,e.data.pid):this.emitReserved("connect_error",new Error("It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)"));break;case C.EVENT:case C.BINARY_EVENT:this.onevent(e);break;case C.ACK:case C.BINARY_ACK:this.onack(e);break;case C.DISCONNECT:this.ondisconnect();break;case C.CONNECT_ERROR:this.destroy();const r=new Error(e.data.message);r.data=e.data.data,this.emitReserved("connect_error",r);break}}onevent(e){const n=e.data||[];e.id!=null&&n.push(this.ack(e.id)),this.connected?this.emitEvent(n):this.receiveBuffer.push(Object.freeze(n))}emitEvent(e){if(this._anyListeners&&this._anyListeners.length){const n=this._anyListeners.slice();for(const r of n)r.apply(this,e)}super.emit.apply(this,e),this._pid&&e.length&&typeof e[e.length-1]=="string"&&(this._lastOffset=e[e.length-1])}ack(e){const n=this;let r=!1;return function(...s){r||(r=!0,n.packet({type:C.ACK,id:e,data:s}))}}onack(e){const n=this.acks[e.id];typeof n=="function"&&(n.apply(this,e.data),delete this.acks[e.id])}onconnect(e,n){this.id=e,this.recovered=n&&this._pid===n,this._pid=n,this.connected=!0,this.emitBuffered(),this.emitReserved("connect"),this._drainQueue(!0)}emitBuffered(){this.receiveBuffer.forEach(e=>this.emitEvent(e)),this.receiveBuffer=[],this.sendBuffer.forEach(e=>{this.notifyOutgoingListeners(e),this.packet(e)}),this.sendBuffer=[]}ondisconnect(){this.destroy(),this.onclose("io server disconnect")}destroy(){this.subs&&(this.subs.forEach(e=>e()),this.subs=void 0),this.io._destroy(this)}disconnect(){return this.connected&&this.packet({type:C.DISCONNECT}),this.destroy(),this.connected&&this.onclose("io client disconnect"),this}close(){return this.disconnect()}compress(e){return this.flags.compress=e,this}get volatile(){return this.flags.volatile=!0,this}timeout(e){return this.flags.timeout=e,this}onAny(e){return this._anyListeners=this._anyListeners||[],this._anyListeners.push(e),this}prependAny(e){return this._anyListeners=this._anyListeners||[],this._anyListeners.unshift(e),this}offAny(e){if(!this._anyListeners)return this;if(e){const n=this._anyListeners;for(let r=0;r<n.length;r++)if(e===n[r])return n.splice(r,1),this}else this._anyListeners=[];return this}listenersAny(){return this._anyListeners||[]}onAnyOutgoing(e){return this._anyOutgoingListeners=this._anyOutgoingListeners||[],this._anyOutgoingListeners.push(e),this}prependAnyOutgoing(e){return this._anyOutgoingListeners=this._anyOutgoingListeners||[],this._anyOutgoingListeners.unshift(e),this}offAnyOutgoing(e){if(!this._anyOutgoingListeners)return this;if(e){const n=this._anyOutgoingListeners;for(let r=0;r<n.length;r++)if(e===n[r])return n.splice(r,1),this}else this._anyOutgoingListeners=[];return this}listenersAnyOutgoing(){return this._anyOutgoingListeners||[]}notifyOutgoingListeners(e){if(this._anyOutgoingListeners&&this._anyOutgoingListeners.length){const n=this._anyOutgoingListeners.slice();for(const r of n)r.apply(this,e.data)}}}function _e(t){t=t||{},this.ms=t.min||100,this.max=t.max||1e4,this.factor=t.factor||2,this.jitter=t.jitter>0&&t.jitter<=1?t.jitter:0,this.attempts=0}_e.prototype.duration=function(){var t=this.ms*Math.pow(this.factor,this.attempts++);if(this.jitter){var e=Math.random(),n=Math.floor(e*this.jitter*t);t=Math.floor(e*10)&1?t+n:t-n}return Math.min(t,this.max)|0};_e.prototype.reset=function(){this.attempts=0};_e.prototype.setMin=function(t){this.ms=t};_e.prototype.setMax=function(t){this.max=t};_e.prototype.setJitter=function(t){this.jitter=t};class an extends P{constructor(e,n){var r;super(),this.nsps={},this.subs=[],e&&typeof e=="object"&&(n=e,e=void 0),n=n||{},n.path=n.path||"/socket.io",this.opts=n,Et(this,n),this.reconnection(n.reconnection!==!1),this.reconnectionAttempts(n.reconnectionAttempts||1/0),this.reconnectionDelay(n.reconnectionDelay||1e3),this.reconnectionDelayMax(n.reconnectionDelayMax||5e3),this.randomizationFactor((r=n.randomizationFactor)!==null&&r!==void 0?r:.5),this.backoff=new _e({min:this.reconnectionDelay(),max:this.reconnectionDelayMax(),jitter:this.randomizationFactor()}),this.timeout(n.timeout==null?2e4:n.timeout),this._readyState="closed",this.uri=e;const s=n.parser||Ta;this.encoder=new s.Encoder,this.decoder=new s.Decoder,this._autoConnect=n.autoConnect!==!1,this._autoConnect&&this.open()}reconnection(e){return arguments.length?(this._reconnection=!!e,this):this._reconnection}reconnectionAttempts(e){return e===void 0?this._reconnectionAttempts:(this._reconnectionAttempts=e,this)}reconnectionDelay(e){var n;return e===void 0?this._reconnectionDelay:(this._reconnectionDelay=e,(n=this.backoff)===null||n===void 0||n.setMin(e),this)}randomizationFactor(e){var n;return e===void 0?this._randomizationFactor:(this._randomizationFactor=e,(n=this.backoff)===null||n===void 0||n.setJitter(e),this)}reconnectionDelayMax(e){var n;return e===void 0?this._reconnectionDelayMax:(this._reconnectionDelayMax=e,(n=this.backoff)===null||n===void 0||n.setMax(e),this)}timeout(e){return arguments.length?(this._timeout=e,this):this._timeout}maybeReconnectOnOpen(){!this._reconnecting&&this._reconnection&&this.backoff.attempts===0&&this.reconnect()}open(e){if(~this._readyState.indexOf("open"))return this;this.engine=new ms(this.uri,this.opts);const n=this.engine,r=this;this._readyState="opening",this.skipReconnect=!1;const s=Q(n,"open",function(){r.onopen(),e&&e()}),i=l=>{this.cleanup(),this._readyState="closed",this.emitReserved("error",l),e?e(l):this.maybeReconnectOnOpen()},o=Q(n,"error",i);if(this._timeout!==!1){const l=this._timeout,d=this.setTimeoutFn(()=>{s(),i(new Error("timeout")),n.close()},l);this.opts.autoUnref&&d.unref(),this.subs.push(()=>{this.clearTimeoutFn(d)})}return this.subs.push(s),this.subs.push(o),this}connect(e){return this.open(e)}onopen(){this.cleanup(),this._readyState="open",this.emitReserved("open");const e=this.engine;this.subs.push(Q(e,"ping",this.onping.bind(this)),Q(e,"data",this.ondata.bind(this)),Q(e,"error",this.onerror.bind(this)),Q(e,"close",this.onclose.bind(this)),Q(this.decoder,"decoded",this.ondecoded.bind(this)))}onping(){this.emitReserved("ping")}ondata(e){try{this.decoder.add(e)}catch(n){this.onclose("parse error",n)}}ondecoded(e){Pn(()=>{this.emitReserved("packet",e)},this.setTimeoutFn)}onerror(e){this.emitReserved("error",e)}socket(e,n){let r=this.nsps[e];return r?this._autoConnect&&!r.active&&r.connect():(r=new ys(this,e,n),this.nsps[e]=r),r}_destroy(e){const n=Object.keys(this.nsps);for(const r of n)if(this.nsps[r].active)return;this._close()}_packet(e){const n=this.encoder.encode(e);for(let r=0;r<n.length;r++)this.engine.write(n[r],e.options)}cleanup(){this.subs.forEach(e=>e()),this.subs.length=0,this.decoder.destroy()}_close(){this.skipReconnect=!0,this._reconnecting=!1,this.onclose("forced close"),this.engine&&this.engine.close()}disconnect(){return this._close()}onclose(e,n){this.cleanup(),this.backoff.reset(),this._readyState="closed",this.emitReserved("close",e,n),this._reconnection&&!this.skipReconnect&&this.reconnect()}reconnect(){if(this._reconnecting||this.skipReconnect)return this;const e=this;if(this.backoff.attempts>=this._reconnectionAttempts)this.backoff.reset(),this.emitReserved("reconnect_failed"),this._reconnecting=!1;else{const n=this.backoff.duration();this._reconnecting=!0;const r=this.setTimeoutFn(()=>{e.skipReconnect||(this.emitReserved("reconnect_attempt",e.backoff.attempts),!e.skipReconnect&&e.open(s=>{s?(e._reconnecting=!1,e.reconnect(),this.emitReserved("reconnect_error",s)):e.onreconnect()}))},n);this.opts.autoUnref&&r.unref(),this.subs.push(()=>{this.clearTimeoutFn(r)})}}onreconnect(){const e=this.backoff.attempts;this._reconnecting=!1,this.backoff.reset(),this.emitReserved("reconnect",e)}}const Oe={};function at(t,e){typeof t=="object"&&(e=t,t=void 0),e=e||{};const n=va(t,e.path||"/socket.io"),r=n.source,s=n.id,i=n.path,o=Oe[s]&&i in Oe[s].nsps,l=e.forceNew||e["force new connection"]||e.multiplex===!1||o;let d;return l?d=new an(r,e):(Oe[s]||(Oe[s]=new an(r,e)),d=Oe[s]),n.query&&!e.query&&(e.query=n.queryKey),d.socket(n.path,e)}Object.assign(at,{Manager:an,Socket:ys,io:at,connect:at});const b=at("/",{autoConnect:!1}),wr="get-connectors",Pa="remove-connector";class bs{constructor(){F(this,"handler");this.handler=null}connect(e){this.handler!==null&&this.disconnect(),this.handler=e,b.on(wr,this.handler.onConnectors)}static remove(e){b.emit(Pa,{id:e})}disconnect(){this.handler!==null&&(b.off(wr,this.handler.onConnectors),this.handler=null)}}const Lt="music-like",Pt="music-count",Mt=[];class In{constructor(){F(this,"handler");this.handler=null}connect(e){this.handler!==null&&this.disconnect(),this.handler=e,b.on(Lt,this.handler.onLike),b.on(Pt,this.handler.onCount)}static like(e,n){b.emit(Lt,{id:e,isLiked:n})}static async count(e){if(Mt.push(e),!!b.connected)for(;Mt.length>0;){const n=Mt.pop();await new Promise(r=>setTimeout(r,300)),b.emit(Pt,{id:n})}}disconnect(){this.handler!==null&&(b.off(Lt,this.handler.onLike),b.off(Pt,this.handler.onCount),this.handler=null)}}const Bt="playlist-create",It="playlist-delete",Dt="playlist-update",$t="playlist-change-order",qt="playlist-add-music",Me="playlist-move-music",Be="playlist-remove-music",Ie="playlist-change-music-order";class ie{constructor(){F(this,"handler");this.handler=null}connect(e){this.handler!==null&&this.disconnect(),this.handler=e,b.on(Bt,this.handler.onCreate),b.on(It,this.handler.onDelete),b.on(Dt,this.handler.onUpdate),b.on($t,this.handler.onChangeOrder),b.on(qt,this.handler.onAddMusic),b.on(Me,this.handler.onMoveMusic),b.on(Be,this.handler.onRemoveMusic),b.on(Ie,this.handler.onChangeMusicOrder)}static create(e){b.emit(Bt,{name:e})}static update(e,n){b.emit(Dt,{id:e,name:n})}static delete(e){b.emit(It,{id:e})}static changeOrder(e){b.emit($t,{ids:e})}static addMusic(e,n){b.emit(qt,{id:e,musicIds:n})}static moveMusic(e,n,r){b.emit(Me,{fromId:e,toId:n,musicIds:r})}static removeMusic(e,n){b.emit(Be,{id:e,musicIds:n})}static changeMusicOrder(e,n){b.emit(Ie,{id:e,musicIds:n})}disconnect(){this.handler!==null&&(b.off(Bt,this.handler.onCreate),b.off(It,this.handler.onDelete),b.off(Dt,this.handler.onUpdate),b.off($t,this.handler.onChangeOrder),b.off(qt,this.handler.onAddMusic),b.off(Me,this.handler.onMoveMusic),b.off(Be,this.handler.onRemoveMusic),b.off(Ie,this.handler.onChangeMusicOrder),this.handler=null)}}function xs(t,e){return function(){return t.apply(e,arguments)}}const{toString:Ma}=Object.prototype,{getPrototypeOf:Dn}=Object,_t=(t=>e=>{const n=Ma.call(e);return t[n]||(t[n]=n.slice(8,-1).toLowerCase())})(Object.create(null)),ae=t=>(t=t.toLowerCase(),e=>_t(e)===t),St=t=>e=>typeof e===t,{isArray:Se}=Array,ze=St("undefined");function Ba(t){return t!==null&&!ze(t)&&t.constructor!==null&&!ze(t.constructor)&&X(t.constructor.isBuffer)&&t.constructor.isBuffer(t)}const ws=ae("ArrayBuffer");function Ia(t){let e;return typeof ArrayBuffer<"u"&&ArrayBuffer.isView?e=ArrayBuffer.isView(t):e=t&&t.buffer&&ws(t.buffer),e}const Da=St("string"),X=St("function"),vs=St("number"),jt=t=>t!==null&&typeof t=="object",$a=t=>t===!0||t===!1,ct=t=>{if(_t(t)!=="object")return!1;const e=Dn(t);return(e===null||e===Object.prototype||Object.getPrototypeOf(e)===null)&&!(Symbol.toStringTag in t)&&!(Symbol.iterator in t)},qa=ae("Date"),Ua=ae("File"),Fa=ae("Blob"),za=ae("FileList"),Ha=t=>jt(t)&&X(t.pipe),Wa=t=>{let e;return t&&(typeof FormData=="function"&&t instanceof FormData||X(t.append)&&((e=_t(t))==="formdata"||e==="object"&&X(t.toString)&&t.toString()==="[object FormData]"))},Va=ae("URLSearchParams"),Ka=t=>t.trim?t.trim():t.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"");function Ke(t,e,{allOwnKeys:n=!1}={}){if(t===null||typeof t>"u")return;let r,s;if(typeof t!="object"&&(t=[t]),Se(t))for(r=0,s=t.length;r<s;r++)e.call(null,t[r],r,t);else{const i=n?Object.getOwnPropertyNames(t):Object.keys(t),o=i.length;let l;for(r=0;r<o;r++)l=i[r],e.call(null,t[l],l,t)}}function ks(t,e){e=e.toLowerCase();const n=Object.keys(t);let r=n.length,s;for(;r-- >0;)if(s=n[r],e===s.toLowerCase())return s;return null}const Cs=(()=>typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:global)(),Es=t=>!ze(t)&&t!==Cs;function cn(){const{caseless:t}=Es(this)&&this||{},e={},n=(r,s)=>{const i=t&&ks(e,s)||s;ct(e[i])&&ct(r)?e[i]=cn(e[i],r):ct(r)?e[i]=cn({},r):Se(r)?e[i]=r.slice():e[i]=r};for(let r=0,s=arguments.length;r<s;r++)arguments[r]&&Ke(arguments[r],n);return e}const Ja=(t,e,n,{allOwnKeys:r}={})=>(Ke(e,(s,i)=>{n&&X(s)?t[i]=xs(s,n):t[i]=s},{allOwnKeys:r}),t),Ya=t=>(t.charCodeAt(0)===65279&&(t=t.slice(1)),t),Ga=(t,e,n,r)=>{t.prototype=Object.create(e.prototype,r),t.prototype.constructor=t,Object.defineProperty(t,"super",{value:e.prototype}),n&&Object.assign(t.prototype,n)},Xa=(t,e,n,r)=>{let s,i,o;const l={};if(e=e||{},t==null)return e;do{for(s=Object.getOwnPropertyNames(t),i=s.length;i-- >0;)o=s[i],(!r||r(o,t,e))&&!l[o]&&(e[o]=t[o],l[o]=!0);t=n!==!1&&Dn(t)}while(t&&(!n||n(t,e))&&t!==Object.prototype);return e},Qa=(t,e,n)=>{t=String(t),(n===void 0||n>t.length)&&(n=t.length),n-=e.length;const r=t.indexOf(e,n);return r!==-1&&r===n},Za=t=>{if(!t)return null;if(Se(t))return t;let e=t.length;if(!vs(e))return null;const n=new Array(e);for(;e-- >0;)n[e]=t[e];return n},ec=(t=>e=>t&&e instanceof t)(typeof Uint8Array<"u"&&Dn(Uint8Array)),tc=(t,e)=>{const r=(t&&t[Symbol.iterator]).call(t);let s;for(;(s=r.next())&&!s.done;){const i=s.value;e.call(t,i[0],i[1])}},nc=(t,e)=>{let n;const r=[];for(;(n=t.exec(e))!==null;)r.push(n);return r},rc=ae("HTMLFormElement"),sc=t=>t.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g,function(n,r,s){return r.toUpperCase()+s}),vr=(({hasOwnProperty:t})=>(e,n)=>t.call(e,n))(Object.prototype),ic=ae("RegExp"),_s=(t,e)=>{const n=Object.getOwnPropertyDescriptors(t),r={};Ke(n,(s,i)=>{let o;(o=e(s,i,t))!==!1&&(r[i]=o||s)}),Object.defineProperties(t,r)},oc=t=>{_s(t,(e,n)=>{if(X(t)&&["arguments","caller","callee"].indexOf(n)!==-1)return!1;const r=t[n];if(X(r)){if(e.enumerable=!1,"writable"in e){e.writable=!1;return}e.set||(e.set=()=>{throw Error("Can not rewrite read-only method '"+n+"'")})}})},ac=(t,e)=>{const n={},r=s=>{s.forEach(i=>{n[i]=!0})};return Se(t)?r(t):r(String(t).split(e)),n},cc=()=>{},lc=(t,e)=>(t=+t,Number.isFinite(t)?t:e),Ut="abcdefghijklmnopqrstuvwxyz",kr="0123456789",Ss={DIGIT:kr,ALPHA:Ut,ALPHA_DIGIT:Ut+Ut.toUpperCase()+kr},dc=(t=16,e=Ss.ALPHA_DIGIT)=>{let n="";const{length:r}=e;for(;t--;)n+=e[Math.random()*r|0];return n};function uc(t){return!!(t&&X(t.append)&&t[Symbol.toStringTag]==="FormData"&&t[Symbol.iterator])}const hc=t=>{const e=new Array(10),n=(r,s)=>{if(jt(r)){if(e.indexOf(r)>=0)return;if(!("toJSON"in r)){e[s]=r;const i=Se(r)?[]:{};return Ke(r,(o,l)=>{const d=n(o,s+1);!ze(d)&&(i[l]=d)}),e[s]=void 0,i}}return r};return n(t,0)},fc=ae("AsyncFunction"),pc=t=>t&&(jt(t)||X(t))&&X(t.then)&&X(t.catch),f={isArray:Se,isArrayBuffer:ws,isBuffer:Ba,isFormData:Wa,isArrayBufferView:Ia,isString:Da,isNumber:vs,isBoolean:$a,isObject:jt,isPlainObject:ct,isUndefined:ze,isDate:qa,isFile:Ua,isBlob:Fa,isRegExp:ic,isFunction:X,isStream:Ha,isURLSearchParams:Va,isTypedArray:ec,isFileList:za,forEach:Ke,merge:cn,extend:Ja,trim:Ka,stripBOM:Ya,inherits:Ga,toFlatObject:Xa,kindOf:_t,kindOfTest:ae,endsWith:Qa,toArray:Za,forEachEntry:tc,matchAll:nc,isHTMLForm:rc,hasOwnProperty:vr,hasOwnProp:vr,reduceDescriptors:_s,freezeMethods:oc,toObjectSet:ac,toCamelCase:sc,noop:cc,toFiniteNumber:lc,findKey:ks,global:Cs,isContextDefined:Es,ALPHABET:Ss,generateString:dc,isSpecCompliantForm:uc,toJSONObject:hc,isAsyncFn:fc,isThenable:pc};function _(t,e,n,r,s){Error.call(this),Error.captureStackTrace?Error.captureStackTrace(this,this.constructor):this.stack=new Error().stack,this.message=t,this.name="AxiosError",e&&(this.code=e),n&&(this.config=n),r&&(this.request=r),s&&(this.response=s)}f.inherits(_,Error,{toJSON:function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:f.toJSONObject(this.config),code:this.code,status:this.response&&this.response.status?this.response.status:null}}});const js=_.prototype,As={};["ERR_BAD_OPTION_VALUE","ERR_BAD_OPTION","ECONNABORTED","ETIMEDOUT","ERR_NETWORK","ERR_FR_TOO_MANY_REDIRECTS","ERR_DEPRECATED","ERR_BAD_RESPONSE","ERR_BAD_REQUEST","ERR_CANCELED","ERR_NOT_SUPPORT","ERR_INVALID_URL"].forEach(t=>{As[t]={value:t}});Object.defineProperties(_,As);Object.defineProperty(js,"isAxiosError",{value:!0});_.from=(t,e,n,r,s,i)=>{const o=Object.create(js);return f.toFlatObject(t,o,function(d){return d!==Error.prototype},l=>l!=="isAxiosError"),_.call(o,t.message,e,n,r,s),o.cause=t,o.name=t.name,i&&Object.assign(o,i),o};const mc=null;function ln(t){return f.isPlainObject(t)||f.isArray(t)}function Os(t){return f.endsWith(t,"[]")?t.slice(0,-2):t}function Cr(t,e,n){return t?t.concat(e).map(function(s,i){return s=Os(s),!n&&i?"["+s+"]":s}).join(n?".":""):e}function gc(t){return f.isArray(t)&&!t.some(ln)}const yc=f.toFlatObject(f,{},null,function(e){return/^is[A-Z]/.test(e)});function At(t,e,n){if(!f.isObject(t))throw new TypeError("target must be an object");e=e||new FormData,n=f.toFlatObject(n,{metaTokens:!0,dots:!1,indexes:!1},!1,function(g,w){return!f.isUndefined(w[g])});const r=n.metaTokens,s=n.visitor||c,i=n.dots,o=n.indexes,d=(n.Blob||typeof Blob<"u"&&Blob)&&f.isSpecCompliantForm(e);if(!f.isFunction(s))throw new TypeError("visitor must be a function");function u(p){if(p===null)return"";if(f.isDate(p))return p.toISOString();if(!d&&f.isBlob(p))throw new _("Blob is not supported. Use a Buffer instead.");return f.isArrayBuffer(p)||f.isTypedArray(p)?d&&typeof Blob=="function"?new Blob([p]):Buffer.from(p):p}function c(p,g,w){let E=p;if(p&&!w&&typeof p=="object"){if(f.endsWith(g,"{}"))g=r?g:g.slice(0,-2),p=JSON.stringify(p);else if(f.isArray(p)&&gc(p)||(f.isFileList(p)||f.endsWith(g,"[]"))&&(E=f.toArray(p)))return g=Os(g),E.forEach(function(N,ce){!(f.isUndefined(N)||N===null)&&e.append(o===!0?Cr([g],ce,i):o===null?g:g+"[]",u(N))}),!1}return ln(p)?!0:(e.append(Cr(w,g,i),u(p)),!1)}const h=[],y=Object.assign(yc,{defaultVisitor:c,convertValue:u,isVisitable:ln});function x(p,g){if(!f.isUndefined(p)){if(h.indexOf(p)!==-1)throw Error("Circular reference detected in "+g.join("."));h.push(p),f.forEach(p,function(E,k){(!(f.isUndefined(E)||E===null)&&s.call(e,E,f.isString(k)?k.trim():k,g,y))===!0&&x(E,g?g.concat(k):[k])}),h.pop()}}if(!f.isObject(t))throw new TypeError("data must be an object");return x(t),e}function Er(t){const e={"!":"%21","'":"%27","(":"%28",")":"%29","~":"%7E","%20":"+","%00":"\0"};return encodeURIComponent(t).replace(/[!'()~]|%20|%00/g,function(r){return e[r]})}function $n(t,e){this._pairs=[],t&&At(t,this,e)}const Rs=$n.prototype;Rs.append=function(e,n){this._pairs.push([e,n])};Rs.toString=function(e){const n=e?function(r){return e.call(this,r,Er)}:Er;return this._pairs.map(function(s){return n(s[0])+"="+n(s[1])},"").join("&")};function bc(t){return encodeURIComponent(t).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}function Ns(t,e,n){if(!e)return t;const r=n&&n.encode||bc,s=n&&n.serialize;let i;if(s?i=s(e,n):i=f.isURLSearchParams(e)?e.toString():new $n(e,n).toString(r),i){const o=t.indexOf("#");o!==-1&&(t=t.slice(0,o)),t+=(t.indexOf("?")===-1?"?":"&")+i}return t}class xc{constructor(){this.handlers=[]}use(e,n,r){return this.handlers.push({fulfilled:e,rejected:n,synchronous:r?r.synchronous:!1,runWhen:r?r.runWhen:null}),this.handlers.length-1}eject(e){this.handlers[e]&&(this.handlers[e]=null)}clear(){this.handlers&&(this.handlers=[])}forEach(e){f.forEach(this.handlers,function(r){r!==null&&e(r)})}}const _r=xc,Ts={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1},wc=typeof URLSearchParams<"u"?URLSearchParams:$n,vc=typeof FormData<"u"?FormData:null,kc=typeof Blob<"u"?Blob:null,Cc=(()=>{let t;return typeof navigator<"u"&&((t=navigator.product)==="ReactNative"||t==="NativeScript"||t==="NS")?!1:typeof window<"u"&&typeof document<"u"})(),Ec=(()=>typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope&&typeof self.importScripts=="function")(),ne={isBrowser:!0,classes:{URLSearchParams:wc,FormData:vc,Blob:kc},isStandardBrowserEnv:Cc,isStandardBrowserWebWorkerEnv:Ec,protocols:["http","https","file","blob","url","data"]};function _c(t,e){return At(t,new ne.classes.URLSearchParams,Object.assign({visitor:function(n,r,s,i){return ne.isNode&&f.isBuffer(n)?(this.append(r,n.toString("base64")),!1):i.defaultVisitor.apply(this,arguments)}},e))}function Sc(t){return f.matchAll(/\w+|\[(\w*)]/g,t).map(e=>e[0]==="[]"?"":e[1]||e[0])}function jc(t){const e={},n=Object.keys(t);let r;const s=n.length;let i;for(r=0;r<s;r++)i=n[r],e[i]=t[i];return e}function Ls(t){function e(n,r,s,i){let o=n[i++];const l=Number.isFinite(+o),d=i>=n.length;return o=!o&&f.isArray(s)?s.length:o,d?(f.hasOwnProp(s,o)?s[o]=[s[o],r]:s[o]=r,!l):((!s[o]||!f.isObject(s[o]))&&(s[o]=[]),e(n,r,s[o],i)&&f.isArray(s[o])&&(s[o]=jc(s[o])),!l)}if(f.isFormData(t)&&f.isFunction(t.entries)){const n={};return f.forEachEntry(t,(r,s)=>{e(Sc(r),s,n,0)}),n}return null}function Ac(t,e,n){if(f.isString(t))try{return(e||JSON.parse)(t),f.trim(t)}catch(r){if(r.name!=="SyntaxError")throw r}return(n||JSON.stringify)(t)}const qn={transitional:Ts,adapter:["xhr","http"],transformRequest:[function(e,n){const r=n.getContentType()||"",s=r.indexOf("application/json")>-1,i=f.isObject(e);if(i&&f.isHTMLForm(e)&&(e=new FormData(e)),f.isFormData(e))return s&&s?JSON.stringify(Ls(e)):e;if(f.isArrayBuffer(e)||f.isBuffer(e)||f.isStream(e)||f.isFile(e)||f.isBlob(e))return e;if(f.isArrayBufferView(e))return e.buffer;if(f.isURLSearchParams(e))return n.setContentType("application/x-www-form-urlencoded;charset=utf-8",!1),e.toString();let l;if(i){if(r.indexOf("application/x-www-form-urlencoded")>-1)return _c(e,this.formSerializer).toString();if((l=f.isFileList(e))||r.indexOf("multipart/form-data")>-1){const d=this.env&&this.env.FormData;return At(l?{"files[]":e}:e,d&&new d,this.formSerializer)}}return i||s?(n.setContentType("application/json",!1),Ac(e)):e}],transformResponse:[function(e){const n=this.transitional||qn.transitional,r=n&&n.forcedJSONParsing,s=this.responseType==="json";if(e&&f.isString(e)&&(r&&!this.responseType||s)){const o=!(n&&n.silentJSONParsing)&&s;try{return JSON.parse(e)}catch(l){if(o)throw l.name==="SyntaxError"?_.from(l,_.ERR_BAD_RESPONSE,this,null,this.response):l}}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,env:{FormData:ne.classes.FormData,Blob:ne.classes.Blob},validateStatus:function(e){return e>=200&&e<300},headers:{common:{Accept:"application/json, text/plain, */*","Content-Type":void 0}}};f.forEach(["delete","get","head","post","put","patch"],t=>{qn.headers[t]={}});const Un=qn,Oc=f.toObjectSet(["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"]),Rc=t=>{const e={};let n,r,s;return t&&t.split(`
`).forEach(function(o){s=o.indexOf(":"),n=o.substring(0,s).trim().toLowerCase(),r=o.substring(s+1).trim(),!(!n||e[n]&&Oc[n])&&(n==="set-cookie"?e[n]?e[n].push(r):e[n]=[r]:e[n]=e[n]?e[n]+", "+r:r)}),e},Sr=Symbol("internals");function Re(t){return t&&String(t).trim().toLowerCase()}function lt(t){return t===!1||t==null?t:f.isArray(t)?t.map(lt):String(t)}function Nc(t){const e=Object.create(null),n=/([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;let r;for(;r=n.exec(t);)e[r[1]]=r[2];return e}const Tc=t=>/^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(t.trim());function Ft(t,e,n,r,s){if(f.isFunction(r))return r.call(this,e,n);if(s&&(e=n),!!f.isString(e)){if(f.isString(r))return e.indexOf(r)!==-1;if(f.isRegExp(r))return r.test(e)}}function Lc(t){return t.trim().toLowerCase().replace(/([a-z\d])(\w*)/g,(e,n,r)=>n.toUpperCase()+r)}function Pc(t,e){const n=f.toCamelCase(" "+e);["get","set","has"].forEach(r=>{Object.defineProperty(t,r+n,{value:function(s,i,o){return this[r].call(this,e,s,i,o)},configurable:!0})})}class Ot{constructor(e){e&&this.set(e)}set(e,n,r){const s=this;function i(l,d,u){const c=Re(d);if(!c)throw new Error("header name must be a non-empty string");const h=f.findKey(s,c);(!h||s[h]===void 0||u===!0||u===void 0&&s[h]!==!1)&&(s[h||d]=lt(l))}const o=(l,d)=>f.forEach(l,(u,c)=>i(u,c,d));return f.isPlainObject(e)||e instanceof this.constructor?o(e,n):f.isString(e)&&(e=e.trim())&&!Tc(e)?o(Rc(e),n):e!=null&&i(n,e,r),this}get(e,n){if(e=Re(e),e){const r=f.findKey(this,e);if(r){const s=this[r];if(!n)return s;if(n===!0)return Nc(s);if(f.isFunction(n))return n.call(this,s,r);if(f.isRegExp(n))return n.exec(s);throw new TypeError("parser must be boolean|regexp|function")}}}has(e,n){if(e=Re(e),e){const r=f.findKey(this,e);return!!(r&&this[r]!==void 0&&(!n||Ft(this,this[r],r,n)))}return!1}delete(e,n){const r=this;let s=!1;function i(o){if(o=Re(o),o){const l=f.findKey(r,o);l&&(!n||Ft(r,r[l],l,n))&&(delete r[l],s=!0)}}return f.isArray(e)?e.forEach(i):i(e),s}clear(e){const n=Object.keys(this);let r=n.length,s=!1;for(;r--;){const i=n[r];(!e||Ft(this,this[i],i,e,!0))&&(delete this[i],s=!0)}return s}normalize(e){const n=this,r={};return f.forEach(this,(s,i)=>{const o=f.findKey(r,i);if(o){n[o]=lt(s),delete n[i];return}const l=e?Lc(i):String(i).trim();l!==i&&delete n[i],n[l]=lt(s),r[l]=!0}),this}concat(...e){return this.constructor.concat(this,...e)}toJSON(e){const n=Object.create(null);return f.forEach(this,(r,s)=>{r!=null&&r!==!1&&(n[s]=e&&f.isArray(r)?r.join(", "):r)}),n}[Symbol.iterator](){return Object.entries(this.toJSON())[Symbol.iterator]()}toString(){return Object.entries(this.toJSON()).map(([e,n])=>e+": "+n).join(`
`)}get[Symbol.toStringTag](){return"AxiosHeaders"}static from(e){return e instanceof this?e:new this(e)}static concat(e,...n){const r=new this(e);return n.forEach(s=>r.set(s)),r}static accessor(e){const r=(this[Sr]=this[Sr]={accessors:{}}).accessors,s=this.prototype;function i(o){const l=Re(o);r[l]||(Pc(s,o),r[l]=!0)}return f.isArray(e)?e.forEach(i):i(e),this}}Ot.accessor(["Content-Type","Content-Length","Accept","Accept-Encoding","User-Agent","Authorization"]);f.reduceDescriptors(Ot.prototype,({value:t},e)=>{let n=e[0].toUpperCase()+e.slice(1);return{get:()=>t,set(r){this[n]=r}}});f.freezeMethods(Ot);const le=Ot;function zt(t,e){const n=this||Un,r=e||n,s=le.from(r.headers);let i=r.data;return f.forEach(t,function(l){i=l.call(n,i,s.normalize(),e?e.status:void 0)}),s.normalize(),i}function Ps(t){return!!(t&&t.__CANCEL__)}function Je(t,e,n){_.call(this,t??"canceled",_.ERR_CANCELED,e,n),this.name="CanceledError"}f.inherits(Je,_,{__CANCEL__:!0});function Mc(t,e,n){const r=n.config.validateStatus;!n.status||!r||r(n.status)?t(n):e(new _("Request failed with status code "+n.status,[_.ERR_BAD_REQUEST,_.ERR_BAD_RESPONSE][Math.floor(n.status/100)-4],n.config,n.request,n))}const Bc=ne.isStandardBrowserEnv?function(){return{write:function(n,r,s,i,o,l){const d=[];d.push(n+"="+encodeURIComponent(r)),f.isNumber(s)&&d.push("expires="+new Date(s).toGMTString()),f.isString(i)&&d.push("path="+i),f.isString(o)&&d.push("domain="+o),l===!0&&d.push("secure"),document.cookie=d.join("; ")},read:function(n){const r=document.cookie.match(new RegExp("(^|;\\s*)("+n+")=([^;]*)"));return r?decodeURIComponent(r[3]):null},remove:function(n){this.write(n,"",Date.now()-864e5)}}}():function(){return{write:function(){},read:function(){return null},remove:function(){}}}();function Ic(t){return/^([a-z][a-z\d+\-.]*:)?\/\//i.test(t)}function Dc(t,e){return e?t.replace(/\/+$/,"")+"/"+e.replace(/^\/+/,""):t}function Ms(t,e){return t&&!Ic(e)?Dc(t,e):e}const $c=ne.isStandardBrowserEnv?function(){const e=/(msie|trident)/i.test(navigator.userAgent),n=document.createElement("a");let r;function s(i){let o=i;return e&&(n.setAttribute("href",o),o=n.href),n.setAttribute("href",o),{href:n.href,protocol:n.protocol?n.protocol.replace(/:$/,""):"",host:n.host,search:n.search?n.search.replace(/^\?/,""):"",hash:n.hash?n.hash.replace(/^#/,""):"",hostname:n.hostname,port:n.port,pathname:n.pathname.charAt(0)==="/"?n.pathname:"/"+n.pathname}}return r=s(window.location.href),function(o){const l=f.isString(o)?s(o):o;return l.protocol===r.protocol&&l.host===r.host}}():function(){return function(){return!0}}();function qc(t){const e=/^([-+\w]{1,25})(:?\/\/|:)/.exec(t);return e&&e[1]||""}function Uc(t,e){t=t||10;const n=new Array(t),r=new Array(t);let s=0,i=0,o;return e=e!==void 0?e:1e3,function(d){const u=Date.now(),c=r[i];o||(o=u),n[s]=d,r[s]=u;let h=i,y=0;for(;h!==s;)y+=n[h++],h=h%t;if(s=(s+1)%t,s===i&&(i=(i+1)%t),u-o<e)return;const x=c&&u-c;return x?Math.round(y*1e3/x):void 0}}function jr(t,e){let n=0;const r=Uc(50,250);return s=>{const i=s.loaded,o=s.lengthComputable?s.total:void 0,l=i-n,d=r(l),u=i<=o;n=i;const c={loaded:i,total:o,progress:o?i/o:void 0,bytes:l,rate:d||void 0,estimated:d&&o&&u?(o-i)/d:void 0,event:s};c[e?"download":"upload"]=!0,t(c)}}const Fc=typeof XMLHttpRequest<"u",zc=Fc&&function(t){return new Promise(function(n,r){let s=t.data;const i=le.from(t.headers).normalize(),o=t.responseType;let l;function d(){t.cancelToken&&t.cancelToken.unsubscribe(l),t.signal&&t.signal.removeEventListener("abort",l)}let u;f.isFormData(s)&&(ne.isStandardBrowserEnv||ne.isStandardBrowserWebWorkerEnv?i.setContentType(!1):i.getContentType(/^\s*multipart\/form-data/)?f.isString(u=i.getContentType())&&i.setContentType(u.replace(/^\s*(multipart\/form-data);+/,"$1")):i.setContentType("multipart/form-data"));let c=new XMLHttpRequest;if(t.auth){const p=t.auth.username||"",g=t.auth.password?unescape(encodeURIComponent(t.auth.password)):"";i.set("Authorization","Basic "+btoa(p+":"+g))}const h=Ms(t.baseURL,t.url);c.open(t.method.toUpperCase(),Ns(h,t.params,t.paramsSerializer),!0),c.timeout=t.timeout;function y(){if(!c)return;const p=le.from("getAllResponseHeaders"in c&&c.getAllResponseHeaders()),w={data:!o||o==="text"||o==="json"?c.responseText:c.response,status:c.status,statusText:c.statusText,headers:p,config:t,request:c};Mc(function(k){n(k),d()},function(k){r(k),d()},w),c=null}if("onloadend"in c?c.onloadend=y:c.onreadystatechange=function(){!c||c.readyState!==4||c.status===0&&!(c.responseURL&&c.responseURL.indexOf("file:")===0)||setTimeout(y)},c.onabort=function(){c&&(r(new _("Request aborted",_.ECONNABORTED,t,c)),c=null)},c.onerror=function(){r(new _("Network Error",_.ERR_NETWORK,t,c)),c=null},c.ontimeout=function(){let g=t.timeout?"timeout of "+t.timeout+"ms exceeded":"timeout exceeded";const w=t.transitional||Ts;t.timeoutErrorMessage&&(g=t.timeoutErrorMessage),r(new _(g,w.clarifyTimeoutError?_.ETIMEDOUT:_.ECONNABORTED,t,c)),c=null},ne.isStandardBrowserEnv){const p=(t.withCredentials||$c(h))&&t.xsrfCookieName&&Bc.read(t.xsrfCookieName);p&&i.set(t.xsrfHeaderName,p)}s===void 0&&i.setContentType(null),"setRequestHeader"in c&&f.forEach(i.toJSON(),function(g,w){c.setRequestHeader(w,g)}),f.isUndefined(t.withCredentials)||(c.withCredentials=!!t.withCredentials),o&&o!=="json"&&(c.responseType=t.responseType),typeof t.onDownloadProgress=="function"&&c.addEventListener("progress",jr(t.onDownloadProgress,!0)),typeof t.onUploadProgress=="function"&&c.upload&&c.upload.addEventListener("progress",jr(t.onUploadProgress)),(t.cancelToken||t.signal)&&(l=p=>{c&&(r(!p||p.type?new Je(null,t,c):p),c.abort(),c=null)},t.cancelToken&&t.cancelToken.subscribe(l),t.signal&&(t.signal.aborted?l():t.signal.addEventListener("abort",l)));const x=qc(h);if(x&&ne.protocols.indexOf(x)===-1){r(new _("Unsupported protocol "+x+":",_.ERR_BAD_REQUEST,t));return}c.send(s||null)})},dn={http:mc,xhr:zc};f.forEach(dn,(t,e)=>{if(t){try{Object.defineProperty(t,"name",{value:e})}catch{}Object.defineProperty(t,"adapterName",{value:e})}});const Ar=t=>`- ${t}`,Hc=t=>f.isFunction(t)||t===null||t===!1,Bs={getAdapter:t=>{t=f.isArray(t)?t:[t];const{length:e}=t;let n,r;const s={};for(let i=0;i<e;i++){n=t[i];let o;if(r=n,!Hc(n)&&(r=dn[(o=String(n)).toLowerCase()],r===void 0))throw new _(`Unknown adapter '${o}'`);if(r)break;s[o||"#"+i]=r}if(!r){const i=Object.entries(s).map(([l,d])=>`adapter ${l} `+(d===!1?"is not supported by the environment":"is not available in the build"));let o=e?i.length>1?`since :
`+i.map(Ar).join(`
`):" "+Ar(i[0]):"as no adapter specified";throw new _("There is no suitable adapter to dispatch the request "+o,"ERR_NOT_SUPPORT")}return r},adapters:dn};function Ht(t){if(t.cancelToken&&t.cancelToken.throwIfRequested(),t.signal&&t.signal.aborted)throw new Je(null,t)}function Or(t){return Ht(t),t.headers=le.from(t.headers),t.data=zt.call(t,t.transformRequest),["post","put","patch"].indexOf(t.method)!==-1&&t.headers.setContentType("application/x-www-form-urlencoded",!1),Bs.getAdapter(t.adapter||Un.adapter)(t).then(function(r){return Ht(t),r.data=zt.call(t,t.transformResponse,r),r.headers=le.from(r.headers),r},function(r){return Ps(r)||(Ht(t),r&&r.response&&(r.response.data=zt.call(t,t.transformResponse,r.response),r.response.headers=le.from(r.response.headers))),Promise.reject(r)})}const Rr=t=>t instanceof le?t.toJSON():t;function ke(t,e){e=e||{};const n={};function r(u,c,h){return f.isPlainObject(u)&&f.isPlainObject(c)?f.merge.call({caseless:h},u,c):f.isPlainObject(c)?f.merge({},c):f.isArray(c)?c.slice():c}function s(u,c,h){if(f.isUndefined(c)){if(!f.isUndefined(u))return r(void 0,u,h)}else return r(u,c,h)}function i(u,c){if(!f.isUndefined(c))return r(void 0,c)}function o(u,c){if(f.isUndefined(c)){if(!f.isUndefined(u))return r(void 0,u)}else return r(void 0,c)}function l(u,c,h){if(h in e)return r(u,c);if(h in t)return r(void 0,u)}const d={url:i,method:i,data:i,baseURL:o,transformRequest:o,transformResponse:o,paramsSerializer:o,timeout:o,timeoutMessage:o,withCredentials:o,adapter:o,responseType:o,xsrfCookieName:o,xsrfHeaderName:o,onUploadProgress:o,onDownloadProgress:o,decompress:o,maxContentLength:o,maxBodyLength:o,beforeRedirect:o,transport:o,httpAgent:o,httpsAgent:o,cancelToken:o,socketPath:o,responseEncoding:o,validateStatus:l,headers:(u,c)=>s(Rr(u),Rr(c),!0)};return f.forEach(Object.keys(Object.assign({},t,e)),function(c){const h=d[c]||s,y=h(t[c],e[c],c);f.isUndefined(y)&&h!==l||(n[c]=y)}),n}const Is="1.5.1",Fn={};["object","boolean","number","function","string","symbol"].forEach((t,e)=>{Fn[t]=function(r){return typeof r===t||"a"+(e<1?"n ":" ")+t}});const Nr={};Fn.transitional=function(e,n,r){function s(i,o){return"[Axios v"+Is+"] Transitional option '"+i+"'"+o+(r?". "+r:"")}return(i,o,l)=>{if(e===!1)throw new _(s(o," has been removed"+(n?" in "+n:"")),_.ERR_DEPRECATED);return n&&!Nr[o]&&(Nr[o]=!0,console.warn(s(o," has been deprecated since v"+n+" and will be removed in the near future"))),e?e(i,o,l):!0}};function Wc(t,e,n){if(typeof t!="object")throw new _("options must be an object",_.ERR_BAD_OPTION_VALUE);const r=Object.keys(t);let s=r.length;for(;s-- >0;){const i=r[s],o=e[i];if(o){const l=t[i],d=l===void 0||o(l,i,t);if(d!==!0)throw new _("option "+i+" must be "+d,_.ERR_BAD_OPTION_VALUE);continue}if(n!==!0)throw new _("Unknown option "+i,_.ERR_BAD_OPTION)}}const un={assertOptions:Wc,validators:Fn},de=un.validators;class mt{constructor(e){this.defaults=e,this.interceptors={request:new _r,response:new _r}}request(e,n){typeof e=="string"?(n=n||{},n.url=e):n=e||{},n=ke(this.defaults,n);const{transitional:r,paramsSerializer:s,headers:i}=n;r!==void 0&&un.assertOptions(r,{silentJSONParsing:de.transitional(de.boolean),forcedJSONParsing:de.transitional(de.boolean),clarifyTimeoutError:de.transitional(de.boolean)},!1),s!=null&&(f.isFunction(s)?n.paramsSerializer={serialize:s}:un.assertOptions(s,{encode:de.function,serialize:de.function},!0)),n.method=(n.method||this.defaults.method||"get").toLowerCase();let o=i&&f.merge(i.common,i[n.method]);i&&f.forEach(["delete","get","head","post","put","patch","common"],p=>{delete i[p]}),n.headers=le.concat(o,i);const l=[];let d=!0;this.interceptors.request.forEach(function(g){typeof g.runWhen=="function"&&g.runWhen(n)===!1||(d=d&&g.synchronous,l.unshift(g.fulfilled,g.rejected))});const u=[];this.interceptors.response.forEach(function(g){u.push(g.fulfilled,g.rejected)});let c,h=0,y;if(!d){const p=[Or.bind(this),void 0];for(p.unshift.apply(p,l),p.push.apply(p,u),y=p.length,c=Promise.resolve(n);h<y;)c=c.then(p[h++],p[h++]);return c}y=l.length;let x=n;for(h=0;h<y;){const p=l[h++],g=l[h++];try{x=p(x)}catch(w){g.call(this,w);break}}try{c=Or.call(this,x)}catch(p){return Promise.reject(p)}for(h=0,y=u.length;h<y;)c=c.then(u[h++],u[h++]);return c}getUri(e){e=ke(this.defaults,e);const n=Ms(e.baseURL,e.url);return Ns(n,e.params,e.paramsSerializer)}}f.forEach(["delete","get","head","options"],function(e){mt.prototype[e]=function(n,r){return this.request(ke(r||{},{method:e,url:n,data:(r||{}).data}))}});f.forEach(["post","put","patch"],function(e){function n(r){return function(i,o,l){return this.request(ke(l||{},{method:e,headers:r?{"Content-Type":"multipart/form-data"}:{},url:i,data:o}))}}mt.prototype[e]=n(),mt.prototype[e+"Form"]=n(!0)});const dt=mt;class zn{constructor(e){if(typeof e!="function")throw new TypeError("executor must be a function.");let n;this.promise=new Promise(function(i){n=i});const r=this;this.promise.then(s=>{if(!r._listeners)return;let i=r._listeners.length;for(;i-- >0;)r._listeners[i](s);r._listeners=null}),this.promise.then=s=>{let i;const o=new Promise(l=>{r.subscribe(l),i=l}).then(s);return o.cancel=function(){r.unsubscribe(i)},o},e(function(i,o,l){r.reason||(r.reason=new Je(i,o,l),n(r.reason))})}throwIfRequested(){if(this.reason)throw this.reason}subscribe(e){if(this.reason){e(this.reason);return}this._listeners?this._listeners.push(e):this._listeners=[e]}unsubscribe(e){if(!this._listeners)return;const n=this._listeners.indexOf(e);n!==-1&&this._listeners.splice(n,1)}static source(){let e;return{token:new zn(function(s){e=s}),cancel:e}}}const Vc=zn;function Kc(t){return function(n){return t.apply(null,n)}}function Jc(t){return f.isObject(t)&&t.isAxiosError===!0}const hn={Continue:100,SwitchingProtocols:101,Processing:102,EarlyHints:103,Ok:200,Created:201,Accepted:202,NonAuthoritativeInformation:203,NoContent:204,ResetContent:205,PartialContent:206,MultiStatus:207,AlreadyReported:208,ImUsed:226,MultipleChoices:300,MovedPermanently:301,Found:302,SeeOther:303,NotModified:304,UseProxy:305,Unused:306,TemporaryRedirect:307,PermanentRedirect:308,BadRequest:400,Unauthorized:401,PaymentRequired:402,Forbidden:403,NotFound:404,MethodNotAllowed:405,NotAcceptable:406,ProxyAuthenticationRequired:407,RequestTimeout:408,Conflict:409,Gone:410,LengthRequired:411,PreconditionFailed:412,PayloadTooLarge:413,UriTooLong:414,UnsupportedMediaType:415,RangeNotSatisfiable:416,ExpectationFailed:417,ImATeapot:418,MisdirectedRequest:421,UnprocessableEntity:422,Locked:423,FailedDependency:424,TooEarly:425,UpgradeRequired:426,PreconditionRequired:428,TooManyRequests:429,RequestHeaderFieldsTooLarge:431,UnavailableForLegalReasons:451,InternalServerError:500,NotImplemented:501,BadGateway:502,ServiceUnavailable:503,GatewayTimeout:504,HttpVersionNotSupported:505,VariantAlsoNegotiates:506,InsufficientStorage:507,LoopDetected:508,NotExtended:510,NetworkAuthenticationRequired:511};Object.entries(hn).forEach(([t,e])=>{hn[e]=t});const Yc=hn;function Ds(t){const e=new dt(t),n=xs(dt.prototype.request,e);return f.extend(n,dt.prototype,e,{allOwnKeys:!0}),f.extend(n,e,null,{allOwnKeys:!0}),n.create=function(s){return Ds(ke(t,s))},n}const M=Ds(Un);M.Axios=dt;M.CanceledError=Je;M.CancelToken=Vc;M.isCancel=Ps;M.VERSION=Is;M.toFormData=At;M.AxiosError=_;M.Cancel=M.CanceledError;M.all=function(e){return Promise.all(e)};M.spread=Kc;M.isAxiosError=Jc;M.mergeConfig=ke;M.AxiosHeaders=le;M.formToJSON=t=>Ls(f.isHTMLForm(t)?new FormData(t):t);M.getAdapter=Bs.getAdapter;M.HttpStatusCode=Yc;M.default=M;const Gc=M;function me(t,e){return t+" { "+e+" }"}function I(t,e){return t+" {"+e.join(" ")+"}"}async function ge(t){const{data:e}=await Gc.request({url:"/graphql",method:"POST",data:{query:t}});return e}function Xc(){return ge(me("query",I("allMusics",["id","name","filePath","codec","duration","playCount","trackNumber","isLiked","createdAt",I("artist",["id","name"]),I("album",["id","name","cover","publishedYear"])])))}function Qc(){return ge(me("query",I("allArtists",["id","name","createdAt","albumCount","musicCount",I("latestAlbum",["cover"])])))}function Zc(t){return ge(me("query",I(`artist(id: "${t}")`,["id","name","albumCount","musicCount","createdAt",I("latestAlbum",["cover"]),I("albums",["id","name","cover","publishedYear"]),I("musics",["id"])])))}function el(){return ge(me("query",I("allAlbums",["id","name","cover","publishedYear","createdAt",I("artist",["id","name"])])))}function tl(t){return ge(me("query",I(`album(id: "${t}")`,["id","name","cover","publishedYear",I("artist",["id","name"]),I("musics",["id"])])))}function nl(){return ge(me("query",I("allPlaylist",["id","name","musicCount","createdAt","updatedAt",I("headerMusics",["id"])])))}function rl(t){return ge(me("query",I(`playlist(id: "${t}")`,["id","name","musicCount","createdAt","updatedAt",I("musics",["id"])])))}class sl extends pe{constructor(){super();F(this,"init",!1);F(this,"listener");this.state={loaded:!1,musics:[],musicMap:new Map},this.listener=new In,this.listener.connect({onLike:({id:n,isLiked:r})=>{this.set({musics:this.state.musics.map(s=>(s.id===n&&(s.isLiked=r),s))})},onCount:({id:n,playCount:r})=>{this.set({musics:this.state.musics.map(s=>(s.id===n&&(s.playCount=r),s)).sort((s,i)=>i.playCount-s.playCount)})}})}get state(){return this.init||(this.init=!0,this.sync()),super.state}set state(n){super.state=n}async sync(){Xc().then(({data:n})=>{this.set({loaded:!0,musics:n.allMusics,musicMap:new Map(n.allMusics.map(r=>[r.id,r]))})})}}const z=new sl,Ne=t=>JSON.stringify(t);class il{constructor({onPlay:e,onPause:n,onStop:r,onEnded:s,onTimeUpdate:i,onSkipToNext:o,onSkipToPrevious:l}){window.AppChannel.receiveMessage=d=>{d.actionType==="play"&&(e==null||e()),d.actionType==="pause"&&(n==null||n()),d.actionType==="stop"&&(r==null||r()),d.actionType==="skipToNext"&&(o==null||o()),d.actionType==="skipToPrevious"&&(l==null||l()),d.actionType==="end"&&s(),d.actionType==="setPosition"&&i(Ho(d.position))}}load(e){window.AppChannel.postMessage(Ne({actionType:"setMediaItem",mediaItem:{id:location.origin+"/api/audio/"+e.id,album:e.album.name,title:e.name,artist:e.artist.name,duration:lr(e.duration),artUri:location.origin+Fe(e.album.cover)}}))}play(){window.AppChannel.postMessage(Ne({actionType:"play"}))}pause(){window.AppChannel.postMessage(Ne({actionType:"pause"}))}stop(){window.AppChannel.postMessage(Ne({actionType:"stop"}))}seek(e){window.AppChannel.postMessage(Ne({actionType:"setPosition",position:lr(e)}))}download(){$.toast("Not supported yet.")}}class ol{constructor({onPlay:e,onPause:n,onStop:r,onEnded:s,onTimeUpdate:i}){F(this,"audio");this.audio=new Audio,this.audio.addEventListener("play",()=>{e==null||e()}),this.audio.addEventListener("pause",()=>{n==null||n()}),this.audio.addEventListener("abort",()=>{r==null||r()}),this.audio.addEventListener("ended",()=>{s()}),this.audio.addEventListener("timeupdate",()=>{i(this.audio.currentTime)})}load(e){const n="/api/audio/"+e.id;this.audio.pause(),this.audio.src=n,this.audio.currentTime=0,this.audio.load()}play(){this.audio.play()}pause(){this.audio.pause()}stop(){this.audio.pause(),this.audio.currentTime=0}seek(e){this.audio.currentTime=e}download(e){const n="/api/audio/"+e.id,r=document.createElement("a");r.href=n,r.download=e.filePath.split("/").pop(),r.click()}}const al=t=>{const e=[...t];for(let n=e.length-1;n>0;n--){const r=Math.floor(Math.random()*(n+1));[e[n],e[r]]=[e[r],e[n]]}return e};let Wt=null;const Vt=t=>z.state.musicMap.get(t);class cl extends pe{constructor(){super();F(this,"shouldCount",!1);F(this,"audioChannel");this.state={selected:null,isPlaying:!1,shuffle:!1,insertMode:"last",repeatMode:"none",playMode:"later",currentTime:0,progress:0,items:[],sourceItems:[]};const n={onPlay:()=>{this.set({isPlaying:!0})},onPause:()=>{this.set({isPlaying:!1})},onStop:()=>{this.set({isPlaying:!1})},onEnded:()=>{if(this.state.selected!==null){if(this.state.repeatMode==="one"){this.select(this.state.selected);return}if(this.state.repeatMode==="all"){this.select((this.state.selected+1)%this.state.items.length),this.audioChannel.play();return}this.state.repeatMode==="none"&&(this.state.selected+1<this.state.items.length?(this.select(this.state.selected+1),this.audioChannel.play()):(this.audioChannel.stop(),this.set({isPlaying:!1})))}},onTimeUpdate:s=>{const i=Vt(this.state.items[this.state.selected]),o=Number((s/((i==null?void 0:i.duration)||1)*100).toFixed(2));!this.shouldCount&&Math.floor(o)>=0&&Math.floor(o)<10&&(this.shouldCount=!0),this.shouldCount&&Math.floor(o)>=80&&Math.floor(o)<90&&(this.shouldCount=!1,In.count(this.state.items[this.state.selected])),this.set({currentTime:s,progress:o})},onSkipToNext:()=>{this.next()},onSkipToPrevious:()=>{this.prev()}};this.audioChannel=window.AppChannel?new il(n):new ol(n);const r=z.subscribe(async({loaded:s})=>{if(s){const i=localStorage.getItem("queue");if(i){const o=JSON.parse(i);await this.set(o),this.select(o.selected||0,!1)}z.unsubscribe(r)}});window.addEventListener("beforeunload",()=>{this.audioChannel.stop()})}async reset(n){this.state.items.length>0&&!await $.confirm("Are you sure to reset queue?")||(await this.set({items:n,sourceItems:[],shuffle:!1,selected:null,currentTime:0,progress:0,isPlaying:!1}),this.select(0))}async add(n){if(this.state.items.includes(n)){if(this.state.playMode==="immediately"){this.select(this.state.items.indexOf(n));return}$.toast("Already added to queue");return}if(this.state.shuffle&&this.set({sourceItems:[...this.state.items,n]}),this.state.insertMode==="first"&&this.set({items:[n,...this.state.items]}),this.state.insertMode==="last"&&this.set({items:[...this.state.items,n]}),this.state.insertMode==="after"&&(this.state.selected===null?this.set({items:[...this.state.items,n]}):this.set({items:[...this.state.items.slice(0,this.state.selected+1),n,...this.state.items.slice(this.state.selected+1)]})),$.toast("Added to queue"),this.state.playMode==="immediately"){this.select(this.state.items.indexOf(n));return}this.state.selected===null&&this.select(0)}async removeItems(n){const r=this.state.items.filter(l=>!n.includes(l)),s=this.state.sourceItems.filter(l=>!n.includes(l)),i=this.state.selected,o=r.length>0?this.state.items[i||0]:null;if(await this.set({items:r,sourceItems:s}),o){if(!n.includes(o)){this.set({selected:r.indexOf(o)});return}if(n.includes(o)){if(this.state.items.length>=i){this.select(i);return}if(this.state.items.length<i){this.select(this.state.items.length-1);return}}}}select(n,r=!0){this.set({selected:n,progress:0,currentTime:0,isPlaying:r});const s=Vt(this.state.items[n]);s!==void 0&&(document.title=`${s.name} - ${s.artist.name}`,this.audioChannel.load(s),r&&this.audioChannel.play())}play(){this.state.selected!==null&&this.audioChannel.play()}pause(){this.audioChannel.pause()}stop(){this.audioChannel.stop()}seek(n){this.audioChannel.seek(n)}setPlayMode(n){this.set({playMode:n})}setInsertMode(n){this.set({insertMode:n})}changeRepeatMode(){this.state.repeatMode==="none"?this.set({repeatMode:"all"}):this.state.repeatMode==="all"?this.set({repeatMode:"one"}):this.state.repeatMode==="one"&&this.set({repeatMode:"none"})}toggleShuffle(){const n=this.state.items[this.state.selected];if(this.state.shuffle){this.set({shuffle:!1,selected:this.state.sourceItems.indexOf(n),items:[...this.state.sourceItems],sourceItems:[]});return}const r=al([...this.state.items]).filter(s=>s!==n);r.unshift(n),this.set({shuffle:!0,selected:0,items:r,sourceItems:[...this.state.items]})}next(){this.state.selected!==null&&(this.select((this.state.selected+1)%this.state.items.length),this.audioChannel.play())}prev(){if(this.state.selected!==null){if(this.state.currentTime>10){this.audioChannel.seek(0);return}this.select((this.state.selected-1+this.state.items.length)%this.state.items.length),this.audioChannel.play()}}download(n){this.audioChannel.download(Vt(n))}afterStateChange(){Wt||(Wt=setTimeout(()=>{localStorage.setItem("queue",JSON.stringify({...this.state,isPlaying:!1,currentTime:0,progress:0})),Wt=null},3e3))}}const v=new cl;function ye({id:t,onArtistClick:e,onAlbumClick:n}){const[{musicMap:r}]=R(z),s=r.get(t);return s?a.jsx(Hn,{header:a.jsxs(a.Fragment,{children:[n&&a.jsxs("button",{className:"panel-album clickable linkable",onClick:()=>{L.close(),setTimeout(n,100)},children:[a.jsx(he,{className:"cover",src:s.album.cover,alt:s.album.name}),a.jsxs("div",{children:[a.jsx("div",{className:"panel-sub-title",children:"Album"}),a.jsx("div",{className:"panel-sub-content",children:s.album.name})]})]}),e&&a.jsx("button",{className:"panel-artist clickable linkable",onClick:()=>{L.close(),setTimeout(e,100)},children:a.jsxs("div",{children:[a.jsx("div",{className:"panel-sub-title",children:"Artist"}),a.jsx("div",{className:"panel-sub-content",children:s.artist.name})]})})]}),items:[{icon:a.jsx(Yr,{}),text:"Like",isActive:s.isLiked,onClick:()=>In.like(s.id,!s.isLiked)},{icon:a.jsx(J,{}),text:"Add to Queue",onClick:()=>v.add(s.id)},{icon:a.jsx(On,{}),text:"Add to Playlist",onClick:()=>{L.close(),L.open({title:"Add to Playlist",content:a.jsx(Vn,{onClick:i=>{ie.addMusic(i,[s.id]),$.toast("Added to playlist")}})})}},{icon:a.jsx(Do,{}),text:"Download",onClick:()=>{v.download(s.id),L.close()}}],footer:a.jsxs(a.Fragment,{children:[a.jsxs("span",{children:["listen: ",s.playCount," times"]})," /",a.jsxs("span",{children:["duration: ",en(s.duration)]})," /",a.jsxs("span",{children:["codec: ",s.codec]})]})}):null}const ll=S.button`
    color: #eee;
    font-size: 0.8rem;
    cursor: pointer;
    padding: 1rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.75rem;
    width: 100%;

    @media (min-width: 1024px) {
        &:hover {
            background-color: rgba(255, 255, 255, 0.1);
        }
    }

    .album-art {
        width: 45px;
        height: 45px;
        border-radius: 0.25rem;
        object-fit: cover;
    }

    .row {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        flex: 1;
        width: 100%;
        max-width: ${t=>t.hasAlbumCover?"calc(100% - 45px - 0.75rem)":"100%"};
        gap: 0.75rem;

        .info {
            display: flex;
            flex-direction: column;
            flex: 1;
            width: 100%;
            max-width: ${t=>t.hasLongPress?"calc(100% - 2.5rem - 0.75rem)":"100%"};
            gap: 0.125rem;
        }

        .artist,
        .title {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .artist {
            font-size: 0.8rem;
            color: rgba(255, 255, 255, 0.5);
        }

        .title {
            font-size: 0.9rem;

            .track-number {
                margin-right: 0.25rem;
                color: #666;
                font-weight: 400;
            }

            .codec {
                border: 1px solid #333;
                color: #eee;
                margin-left: 0.25rem;
                padding: 0.1rem 0.5rem;
                border-radius: 0.5rem;
                font-size: 0.6rem;
                font-weight: 400;
            }
        }

        .icon-button {
            color: #eee;
            width: 2.5rem;
            height: 2.5rem;

            svg {
                width: 1.125rem;
                height: 1.125rem;
            }

            &.liked {
                svg {
                    fill: #a076f1;
                    color: #a076f1;
                }
            }

            @media (min-width: 1024px) {
                &:hover {
                    background-color: rgba(255, 255, 255, 0.1);
                }
            }
        }
    }
`;function be({albumName:t,albumCover:e,artistName:n,trackNumber:r,musicName:s,musicCodec:i,isLiked:o,onClick:l,onLongPress:d}){return a.jsxs(ll,{className:"clickable",onClick:l,onContextMenu:u=>{u.preventDefault(),d==null||d()},hasAlbumCover:typeof e=="string",hasLongPress:typeof d=="function",children:[typeof e=="string"&&a.jsx(he,{className:"album-art",src:e,alt:t}),a.jsxs("div",{className:"row",children:[a.jsxs("div",{className:"info",children:[a.jsxs("div",{className:"title",children:[!!r&&a.jsxs("span",{className:"track-number",children:[r,"."]}),s,i&&i.toLocaleLowerCase()==="flac"&&a.jsx("span",{className:"codec",children:i})]}),a.jsx("div",{className:"artist",children:n})]}),d&&a.jsx("button",{className:`icon-button ${o?"liked":""}`,onClick:u=>{u.stopPropagation(),d==null||d()},children:o?a.jsx(Yr,{}):a.jsx(Qr,{})})]})]})}const dl=S.div`
    display: flex;
    flex-direction: column;
    background-color: #111;
    transition: transform 0.25s ease-in-out;

    @media (min-width: 1024px) {
        grid-column: 1 / 3;
    }

    .play,
    .mode,
    .queue,
    .shuffle,
    .skip-back,
    .skip-forward {
        svg {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 1rem;
            height: 1rem;
        }
    }

    .play,
    .queue {
        svg {
            width: 1.5rem;
            height: 1.5rem;
        }
    }

    .skip-back,
    .skip-forward {
        svg {
            transform: translate(-70%, -50%);
        }

        &::after {
            content: "";
            position: absolute;
            display: block;
            top: 50%;
            right: calc(50% - 0.5rem);
            transform: translate(-50%, -50%);
            width: 0.1rem;
            height: 0.75rem;
            background-color: #fff;
        }
    }

    .skip-back {
        transform: scaleX(-1);
    }

    .progress {
        width: 100%;
        height: 0.25rem;
        background-color: rgba(255, 255, 255, 0.1);
        transition: height 0.25s ease-in-out;

        @media (min-width: 1024px) {
            &:hover {
                cursor: pointer;
                height: 0.5rem;
            }
        }

        .bar {
            height: 100%;
            width: 100%;
            transform: translate(-100%, 0);
            background-color: #a076f1;
        }
    }

    .player {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        .music {
            cursor: pointer;
            flex: 1 1 auto;
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 0.5rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .row {
            width: 100%
        }

        .action {
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 0.25rem;
            padding: 0.5rem;

            .mode,
            .shuffle,
            .volume,
            .skip-back {
                @media (max-width: 768px) {
                    display: none;
                }
            }

            .shuffle.active svg {
                color: #a076f1;
            }
        }
    }
`;function ul(){const t=Z(),[e]=R(v),[{musicMap:n}]=R(z),r=e.selected!==null?n.get(e.items[e.selected]):null,s=o=>{const{width:l,left:d,right:u}=o.currentTarget.getBoundingClientRect();let c=o.touches?o.touches[0].clientX:o.clientX;c=c<d?d:c>u?u:c;const h=(c-d)/l,y=(r==null?void 0:r.duration)||1;v.seek(y*h)},i=o=>{var l;if(o.buttons===1){s(o);return}((l=o.touches)==null?void 0:l.length)===1&&s(o)};return a.jsxs(dl,{children:[a.jsx("div",{className:"progress",role:"progressbar","aria-valuenow":e.progress,"aria-valuemin":0,"aria-valuemax":100,onClick:s,onMouseMove:i,onTouchMove:i,children:a.jsx("div",{className:"bar",style:{transform:`translate(-${100-e.progress}%, 0)`}})}),a.jsxs("div",{className:"player",children:[a.jsx("div",{className:"music",children:a.jsx(be,{albumName:(r==null?void 0:r.album.name)??"",albumCover:(r==null?void 0:r.album.cover)??"",musicName:(r==null?void 0:r.name)??"No music",artistName:(r==null?void 0:r.artist.name)??"",onClick:()=>r&&t("/player")})}),a.jsxs("div",{className:"action",children:[a.jsxs("button",{className:"icon-button mode",onClick:()=>v.changeRepeatMode(),children:[e.repeatMode==="all"&&a.jsx(es,{}),e.repeatMode==="one"&&a.jsx(Gr,{}),e.repeatMode==="none"&&a.jsx(ts,{})]}),a.jsx("button",{className:"icon-button skip-back",onClick:()=>v.prev(),children:a.jsx(J,{})}),a.jsx("button",{className:"icon-button play",onClick:()=>e.isPlaying?v.pause():v.play(),children:e.isPlaying?a.jsx(Zr,{}):a.jsx(J,{})}),a.jsx("button",{className:"icon-button skip-forward",onClick:()=>v.next(),children:a.jsx(J,{})}),a.jsx("button",{className:`icon-button shuffle ${e.shuffle?"active":""}`,onClick:()=>v.toggleShuffle(),children:a.jsx(ns,{})}),a.jsx("button",{className:"icon-button queue",onClick:()=>t("/queue"),children:a.jsx(kt,{})})]})]})]})}const Tr=S.button`
    width: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    color: #eee;
    font-size: 0.8rem;

    &.active {
        color: ${fe.theme.COLOR_PURPLE_PROMINENT};
    }

    svg {
        width: 1rem;
        height: 1rem;
    }
`;function $s({active:t,label:e,onClick:n,onSelectAll:r}){return a.jsxs(a.Fragment,{children:[a.jsxs(Tr,{className:`clickable ${t?"active":""}`,onClick:n,children:[a.jsx(An,{}),e]}),t&&a.jsxs(Tr,{className:"clickable",onClick:r,children:[a.jsx(Io,{}),"Select All"]})]})}const hl=S.div`
    .panel-content {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        margin-top: 1.5rem;
        padding-bottom: 1.5rem;
        border-bottom: 1px solid #333;
    }

    .panel-album {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 1rem;
        overflow: hidden;
        border-radius: 0.5rem;

        & > img {
            width: 60px;
            height: 60px;
            object-fit: cover;
            border-radius: 0.5rem;
        }

        .album-cover-grid {
            width: 60px;
            height: 60px;
        }
    }

    .panel-artist {
        display: flex;
        flex-direction: column;
    }

    .panel-sub-title {
        font-size: 0.875rem;
        color: #888;
        margin-bottom: 0.25rem;
    }

    .panel-sub-content {
        font-size: 0.875rem;
        font-weight: bold;
    }

    .items {
        padding: 0;
        margin: 0;
        list-style: none;
        display: flex;
        flex-direction: column;
        border-bottom: 1px solid #333;
        padding: 1rem 0;

        .item {
            display: flex;
            align-items: center;
            gap: 1rem;
            padding: 1rem 0;
            border-radius: 0.5rem;

            @media (min-width: 1024px) {
                &:hover {
                    background-color: #333;
                }
            }

            svg {
                width: 1.125rem;
                height: 1.125rem;
            }

            &.active {
                svg {
                    fill: #a076f1;
                    color: #a076f1;
                }
            }
        }
    }

    .detail-info {
        padding: 1rem 0 0;
        font-size: 0.8rem;
        color: #aaa;
        display: flex;
        flex-direction: row;
        align-items: center;
        flex-wrap: wrap;
        gap: 0.5rem;
    }
`;function Hn({header:t,items:e,footer:n}){return a.jsxs(hl,{children:[t&&a.jsx("div",{className:"panel-content",children:t}),e&&a.jsx("div",{className:"items",children:e.map(({icon:r,text:s,isActive:i,onClick:o})=>a.jsxs("button",{className:`clickable item ${i?"active":""}`,onClick:o,children:[r,a.jsx("span",{className:"text",children:s})]},s))}),n&&a.jsx("div",{className:"detail-info",children:n})]})}function fl({children:t}){const[{isOpen:e,title:n,content:r},s]=R(L);return a.jsxs(a.Fragment,{children:[t,a.jsx(Ao,{title:n,isOpen:e,onClose:()=>s({isOpen:!1}),children:r})]})}class pl extends pe{constructor(){super();F(this,"init",!1);F(this,"listener");this.state={loaded:!1,playlists:[]},this.listener=new ie,this.listener.connect({onCreate:n=>{this.set({playlists:[n,...this.state.playlists]})},onDelete:n=>{this.set({playlists:this.state.playlists.filter(r=>r.id!==n)})},onUpdate:({id:n,name:r})=>{this.set({playlists:this.state.playlists.map(s=>s.id===n?{...s,name:r}:s)})},onChangeOrder:n=>{this.set({playlists:this.state.playlists.sort((r,s)=>n.indexOf(r.id)-n.indexOf(s.id))})},onAddMusic:({id:n,musicCount:r,headerMusics:s})=>{this.set({playlists:this.state.playlists.map(i=>i.id===n?{...i,musicCount:r,headerMusics:s}:i)})},onMoveMusic:({fromId:n,formHeaderMusics:r,toId:s,toMusicCount:i,toHeaderMusics:o,musicIds:l})=>{this.set({playlists:this.state.playlists.map(d=>d.id===n?{...d,headerMusics:r,musicCount:d.musicCount-l.length}:d.id===s?{...d,musicCount:i,headerMusics:o}:d)})},onRemoveMusic:({id:n,headerMusics:r,musicIds:s})=>{this.set({playlists:this.state.playlists.map(i=>i.id===n?{...i,headerMusics:r,musicCount:i.musicCount-s.length}:i)})},onChangeMusicOrder:({id:n,headerMusics:r})=>{this.set({playlists:this.state.playlists.map(s=>s.id===n?{...s,headerMusics:r}:s)})}})}get state(){return this.init||(this.init=!0,this.sync()),super.state}set state(n){super.state=n}async sync(){nl().then(({data:n})=>{this.set({loaded:!0,playlists:n.allPlaylist})})}}const Wn=new pl;function ml({id:t,onPlaylistClick:e}){const[{musicMap:n}]=R(z),[{playlists:r}]=R(Wn),s=r.find(i=>i.id===t);return s?a.jsx(Hn,{header:e&&a.jsxs("button",{className:"panel-album clickable linkable",onClick:()=>{L.close(),setTimeout(e,100)},children:[a.jsx(En,{className:"album-cover-grid",images:s.headerMusics.map(i=>{var o;return((o=n.get(i.id))==null?void 0:o.album.cover)??""})}),a.jsxs("div",{children:[a.jsxs("div",{className:"panel-sub-title",children:[s.musicCount," songs"]}),a.jsx("div",{className:"panel-sub-content",children:s.name})]})]}),items:[{icon:a.jsx($o,{}),text:"Rename",onClick:async()=>{const i=await $.prompt("Rename playlist",s.name);i&&ie.update(t,i),L.close()}},{icon:a.jsx(Rn,{}),text:"Delete",onClick:()=>{ie.delete(t),L.close()}}]}):null}const gl=S.button`
    color: #eee;
    font-size: 0.8rem;
    padding: 1rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    width: 100%;

    @media (min-width: 1024px) {
        &:hover {
            background-color: rgba(255, 255, 255, 0.1);
        }
    }

    .icon-button {
        color: #eee;
        width: 2.5rem;
        height: 2.5rem;

        svg {
            width: 1.125rem;
            height: 1.125rem;
        }

        @media (min-width: 1024px) {
            &:hover {
                background-color: rgba(255, 255, 255, 0.1);
            }
        }
    }

    .title {
        flex: 1;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        gap: 0.25rem;
    }

    .song-count {
        font-size: 0.875rem;
        color: #aaa;
    }

    .cover {
        width: 60px;
        height: 60px;
    }
`;function qs({name:t,headerMusics:e,musicCount:n,onClick:r,onLongPress:s}){const[{musicMap:i}]=R(z);return a.jsxs(gl,{className:"clickable",onClick:r,onContextMenu:o=>{o.preventDefault(),s==null||s()},children:[a.jsx(En,{className:"cover",images:e.map(o=>{var l;return((l=i.get(o.id))==null?void 0:l.album.cover)??""})}),a.jsxs("div",{className:"title",children:[a.jsx("div",{className:"album-name",children:t}),a.jsxs("div",{className:"song-count",children:[n," songs"]})]}),s&&a.jsx("button",{className:"icon-button",onClick:o=>{o.stopPropagation(),s()},children:a.jsx(Qr,{})})]})}function Vn({onClick:t}){const[{playlists:e}]=R(Wn);return a.jsx(Hn,{footer:a.jsx(a.Fragment,{children:e.map(n=>a.jsx(qs,{...n,onClick:()=>{t(n.id),L.close()}},n.id))})})}S.button`
    padding: 0.5rem;
    border: none;
    background-color: #222;
    border-radius: 0.5rem;
    color: #eee;
    font-size: 0.75rem;
    font-weight: 600;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;

    svg {
        width: 1rem;
        height: 1rem;
    }

    @media (min-width: 1024px) {
        &:hover {
            background-color: rgba(255, 255, 255, 0.1);
        }
    }
`;const q=S.button`
    padding: 0.5rem;
    border: none;
    background-color: #222;
    border-radius: 0.5rem;
    color: #eee;
    font-size: 0.75rem;
    font-weight: 600;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;

    svg {
        width: 1rem;
        height: 1rem;
    }

    @media (min-width: 1024px) {
        &:hover {
            background-color: rgba(255, 255, 255, 0.1);
        }
    }
`,yl=[{name:"Music",path:"/"},{name:"Favorite",path:"/favorite"},{name:"Album",path:"/album"},{name:"Artist",path:"/artist"},{name:"Playlist",path:"/playlist"},{name:"Setting",path:"/setting"}],bl=S.header`
    position: relative;
    height: 60px;
    background-color: #000;
    color: #eee;
    display: flex;
    gap: 5rem;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #333;

    @media (min-width: 1024px) {
        height: 100%;
        border-right: 1px solid #222;
        border-bottom: none;
    }
`,xl=S.nav`
    position: relative;
    overflow-x: auto;
    overflow-y: hidden;
    white-space: nowrap;
    scrollbar-width: none;
    -ms-overflow-style: none;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;

    &::-webkit-scrollbar {
        display: none;
    }

    &::before {
        content: "";
        position: fixed;
        top: 0;
        right: 0;
        width: 50px;
        height: 59px;
        background: linear-gradient(
            to left,
            rgba(0, 0, 0, 0.5) 0%,
            rgba(0, 0, 0, 0) 100%
        );
        z-index: 1;
        pointer-events: none;

        @media (min-width: 1024px) {
            display: none;
        }
    }

    ul {
        display: flex;
        align-items: center;
        list-style: none;
        margin: 0;
        padding: 0 1rem;
        gap: 1rem;

        @media (min-width: 1024px) {
            flex-direction: column;
            align-items: flex-start;
            gap: 2rem;
        }

        li {
            font-size: 1rem;
            font-weight: bold;
        }
    }
`,wl=S.a`
    position: relative;
    color: #fff;
    padding: 1rem 0;
    opacity: 0.5;
    text-decoration: none;
    transition: opacity 0.3s ease;

    @media (min-width: 1024px) {
        padding: 0.5rem 0;
    }

    &::after {
        content: "";
        position: absolute;
        transform: scaleX(0);
        bottom: 0;
        left: 0;
        width: 100%;
        height: 2px;
        background-color: #fff;
        transition: transform 0.3s ease;
    }

    &.active {
        opacity: 1;

        &::after {
            transform: scaleX(1);
        }
    }
`;function vl(){const t=Js(),e=m.useRef(null);return m.useEffect(()=>{const n=e.current;if(n){const r=n.querySelector("a.active");if(r){const{left:s,width:i}=r.getBoundingClientRect(),{width:o}=e.current.getBoundingClientRect(),l=s+i/2-o/2;e.current.scrollBy({left:l,behavior:"smooth"})}}},[t.pathname]),a.jsx(bl,{children:a.jsx(xl,{ref:e,children:a.jsx("ul",{children:yl.map(n=>a.jsx("li",{children:a.jsx(wl,{as:Pr,to:n.path,className:t.pathname===n.path?"active":"",children:n.name})},n.name))})})})}const kl=S.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem;
    height: 60px;
    background-color: #111;
    color: #fff;
    font-size: 1.2rem;
    font-weight: bold;
    border-bottom: 1px solid #333;

    @media (min-width: 1024px) {
        height: 100%;
        border-right: 1px solid #222;
        border-bottom: none;
        background-color: transparent;
    }

    button {
        background-color: transparent;
        border: none;
        color: inherit;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;

        .back-text {
            display: none;
            font-size: 1rem;
            margin-left: 0.5rem;

            @media (min-width: 1024px) {
                display: block;
            }
        }

        svg {
            width: 1.25rem;
            height: 1.25rem;
        }
    }
`;function Cl(){return a.jsx(kl,{children:a.jsxs("button",{onClick:()=>history.back(),children:[a.jsx(Xr,{})," ",a.jsx("span",{className:"back-text",children:"Back"})]})})}function Lr({isSubPage:t,disablePlayer:e=!1,animationDirection:n="None"}){const[r,s]=He(),i=m.useRef(null),o=m.useRef(!0),l={in:{opacity:1,x:0,y:0},out:{opacity:0,x:n==="RightToLeft"?50:0,y:n==="BottomToTop"?50:0}};return m.useEffect(()=>(i.current&&o.current&&(i.current.scrollTop=parseInt(r.get("py")||"0"),o.current=!1),()=>{o.current=!0}),[i,o,location.pathname]),m.useEffect(()=>{if(!i.current)return;let d=null;const u=()=>{d&&clearTimeout(d),d=setTimeout(()=>{var c;r.set("py",((c=i.current)==null?void 0:c.scrollTop.toString())||"0"),s(r,{replace:!0})},50)};return i.current.addEventListener("scroll",u),()=>{var c;d&&clearTimeout(d),(c=i.current)==null||c.removeEventListener("scroll",u)}},[location.pathname,i,r,s]),a.jsxs("main",{children:[t?a.jsx(Cl,{}):a.jsx(vl,{}),a.jsx(bn.div,{ref:i,className:"container",animate:"in",exit:"out",initial:"out",variants:l,transition:{duration:.25},children:a.jsx(m.Suspense,{fallback:a.jsx(Ee,{}),children:a.jsx(Ys,{})})},location.pathname),!e&&a.jsx(ul,{})]})}const je=S.div`
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 0.5rem;
    position: sticky;
    top: 0;
    left: 0;
    background: linear-gradient(180deg,
            rgba(0, 0, 0, 1) 75%,
            rgba(0, 0, 0, 0) 100%);
    z-index: 1;
`;function Kn({items:t,onDragEnd:e,children:n}){const r=ni(Yn(ui),Yn(di,{coordinateGetter:li}));return a.jsx(ri,{sensors:r,modifiers:[si,ii],collisionDetection:oi,onDragEnd:e,children:a.jsx(ai,{items:t,strategy:ci,children:n})})}class El extends pe{constructor(){super();F(this,"init",!1);this.state={loaded:!1,albums:[]}}get state(){return this.init||(this.init=!0,this.sync()),super.state}set state(n){super.state=n}async sync(){el().then(({data:n})=>{this.set({loaded:!0,albums:n.allAlbums})})}}const Us=new El,_l=S.div`
    display: grid;
    grid-gap: 1rem;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    padding: 1rem;
    list-style: none;

    @media (max-width: 600px) {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
`,Kt=100;function Sl(){const t=Z(),[e,n]=He(),[{albums:r,loaded:s}]=R(Us),[i,o]=m.useState(Number(e.get("l"))||Kt),l=async()=>{const c=await $.prompt("Search keyword",e.get("q")||"");n({q:c})},d=()=>{o(i+Kt),e.set("l",(i+Kt).toString()),n(e,{replace:!0})},u=r==null?void 0:r.filter(c=>{var h,y;return c.name.toLowerCase().includes(((h=e.get("q"))==null?void 0:h.toLowerCase())||"")||c.artist.name.toLowerCase().includes(((y=e.get("q"))==null?void 0:y.toLowerCase())||"")});return a.jsxs(a.Fragment,{children:[a.jsx(je,{children:a.jsx(q,{style:{width:"160px"},onClick:l,children:e.get("q")||"Search"})}),!s&&a.jsx(Ee,{}),a.jsx(_l,{children:s&&u.slice(0,i).map(c=>a.jsx(Jr,{albumName:c.name,albumCover:c.cover,artistName:c.artist.name,onClick:()=>t(`/album/${c.id}`)},c.id))}),s&&u.length>i&&a.jsx("div",{style:{padding:"0 16px 16px"},children:a.jsx(q,{style:{width:"100%",justifyContent:"center"},onClick:d,children:"Load More"})})]})}const jl=S.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    padding: 3rem 1rem;
    background-color: #111;
    border-radius: 0.5rem;

    .album-cover {
        width: 100%;
        max-width: 300px;
        border-radius: 0.5rem;
        margin-bottom: 1rem;
    }

    .album-title {
        max-width: 450px;
        text-align: center;
        font-size: 1.25rem;
        font-weight: bold;
    }

    .row {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .album-artist {
        font-size: 0.875rem;
        color: #aaa;
    }

    .album-year {
        font-size: 0.875rem;
        color: #555;
    }

    .play-all {
        position: absolute;
        bottom: 0;
        right: 0.5rem;
        transform: translateY(50%);

        button {
            border-radius: 100%;
            width: 4rem;
            height: 4rem;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #1c1c1c;
            border: 4px solid #000;
            color: #ccc;
            transition: background-color 0.2s;

            svg {
                width: 1.5rem;
                height: 1.5rem;
            }

            @media (min-width: 1024px) {
                &:hover {
                    background-color: #2a2a2a;
                }
            }
        }
    }
`,Al=S.ul`
    margin-top: 2rem;
    padding: 0;
    list-style: none;
`;function Ol(){const t=Z(),{id:e}=fn(),{data:n}=pn(["album",e],()=>tl(e).then(s=>s.data.album),{enabled:!!e}),[{musicMap:r}]=R(z);return n?a.jsxs(a.Fragment,{children:[a.jsxs(jl,{children:[a.jsx(he,{className:"album-cover",src:n.cover.replace("/resized","")||"",alt:n==null?void 0:n.name}),a.jsx("div",{className:"album-title",children:n==null?void 0:n.name}),a.jsxs("div",{className:"row",children:[a.jsx(Pr,{className:"album-artist",to:`/artist/${n==null?void 0:n.artist.id}`,children:n==null?void 0:n.artist.name}),"-",a.jsx("span",{className:"album-year",children:n==null?void 0:n.publishedYear})]}),a.jsx("div",{className:"play-all",children:a.jsx("button",{onClick:()=>v.reset(n.musics.map(s=>s.id)),children:a.jsx(J,{})})})]}),a.jsx(Al,{children:n.musics.map(({id:s})=>{const i=r.get(s);return i?a.jsx(be,{albumName:i.album.name,artistName:i.artist.name,trackNumber:i.trackNumber,musicName:i.name,musicCodec:i.codec,isLiked:i.isLiked,onClick:()=>v.add(i.id),onLongPress:()=>L.open({title:"Related to this music",content:a.jsx(ye,{id:i.id,onArtistClick:()=>t(`/artist/${i.artist.id}`)})})},i.id):null})})]}):null}class Rl extends pe{constructor(){super();F(this,"init",!1);this.state={loaded:!1,artists:[]}}get state(){return this.init||(this.init=!0,this.sync()),super.state}set state(n){super.state=n}async sync(){Qc().then(({data:n})=>{this.set({loaded:!0,artists:n.allArtists})})}}const Fs=new Rl,Jt=150;function Nl(){const t=Z(),[e,n]=He(),[{artists:r,loaded:s}]=R(Fs),[i,o]=m.useState(Number(e.get("l"))||Jt),l=()=>{o(i+Jt),e.set("l",(i+Jt).toString()),n(e,{replace:!0})},d=async()=>{const c=await $.prompt("Search keyword",e.get("q")||"");n({q:c})},u=r==null?void 0:r.filter(c=>{var h;return c.name.toLowerCase().includes(((h=e.get("q"))==null?void 0:h.toLowerCase())||"")});return a.jsxs(a.Fragment,{children:[a.jsx(je,{children:a.jsx(q,{style:{width:"160px"},onClick:d,children:e.get("q")||"Search"})}),!s&&a.jsx(Ee,{}),s&&u.slice(0,i).map(c=>{var h;return a.jsx(So,{artistName:c.name,artistCover:((h=c.latestAlbum)==null?void 0:h.cover)||"",musicCount:c.musicCount,albumCount:c.albumCount,onClick:()=>t(`/artist/${c.id}`)},c.id)}),s&&u.length>i&&a.jsx("div",{style:{padding:"0 16px 16px"},children:a.jsx(q,{style:{width:"100%",justifyContent:"center"},onClick:l,children:"Load More"})})]})}const Tl=S.section`
    .artist-name {
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 1.25rem;
        font-weight: bold;
        margin: 3rem 0;
        padding: 1rem;

        .detail-info {
            font-size: 1rem;
            font-weight: normal;
            text-align: center;
            margin-top: 0.5rem;
            color: #888;
        }

        .cover {
            max-width: 100%;
            width: 300px;
            height: auto;
            margin-bottom: 2rem;

            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                border-radius: 50%;
            }
        }
    }

    .section-title {
        padding: 1rem;
        font-size: 1.25rem;
        font-weight: bold;
        border-bottom: 1px solid #222;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .albums {
        padding: 1rem;
        margin-bottom: 3rem;
        display: grid;
        grid-gap: 1rem;
        grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));

        @media (max-width: 600px) {
            grid-template-columns: repeat(2, minmax(0, 1fr));
        }
    }

    .musics {
        margin: 0;
        padding: 0;
        list-style: none;
    }
`;function Ll(){var i;const t=Z(),{id:e}=fn(),{data:n}=pn(["artist",e],()=>Zc(e).then(o=>o.data.artist),{enabled:!!e}),[{musicMap:r}]=R(z);if(!n)return null;const s=n.musics.reduce((o,{id:l})=>{var d;return o+=((d=r.get(l))==null?void 0:d.playCount)||0},0);return a.jsxs(Tl,{children:[a.jsxs("div",{className:"artist-name",children:[a.jsx("div",{className:"cover",children:a.jsx("div",{children:a.jsx(he,{src:((i=n.latestAlbum)==null?void 0:i.cover)||"",alt:n.name})})}),n.name,a.jsxs("span",{className:"detail-info",children:["You have listened to a song by this artist ",s," times."]})]}),a.jsxs("div",{className:"section-title",children:["Albums (",n.albums.length,")"]}),a.jsx("div",{className:"albums",children:n.albums.map(o=>a.jsx(Jr,{albumCover:o.cover,albumName:o.name,artistName:o.publishedYear,onClick:()=>t(`/album/${o.id}`)},o.id))}),a.jsxs("div",{className:"section-title",children:["Songs (",n.musics.length,")",a.jsxs(q,{onClick:()=>v.reset(n.musics.map(o=>o.id)),children:[a.jsx(J,{})," Play"]})]}),a.jsx("div",{className:"musics",children:n.musics.map(({id:o})=>{const l=r.get(o);return l?a.jsx(be,{artistName:l.album.name,albumCover:l.album.cover,albumName:l.album.name,musicName:l.name,musicCodec:l.codec,isLiked:l.isLiked,onClick:()=>v.add(l.id),onLongPress:()=>L.open({title:"Related to this music",content:a.jsx(ye,{id:l.id,onAlbumClick:()=>t(`/album/${l.album.id}`)})})},l.id):null})})]})}const Yt=200;function Pl(){const t=Z(),[e,n]=He(),[{musics:r,loaded:s}]=R(z),[i,o]=m.useState(Number(e.get("l"))||Yt),l=async()=>{const c=await $.prompt("Search keyword",e.get("q")||"");n({q:c})},d=()=>{o(i+Yt),e.set("l",(i+Yt).toString()),n(e,{replace:!0})},u=r==null?void 0:r.filter(c=>{var h,y,x;return c.isLiked&&(c.name.toLowerCase().includes(((h=e.get("q"))==null?void 0:h.toLowerCase())||"")||c.artist.name.toLowerCase().includes(((y=e.get("q"))==null?void 0:y.toLowerCase())||"")||c.album.name.toLowerCase().includes(((x=e.get("q"))==null?void 0:x.toLowerCase())||""))});return a.jsxs(a.Fragment,{children:[a.jsxs(je,{children:[a.jsx(q,{style:{width:"160px"},onClick:l,children:e.get("q")||"Search"}),a.jsxs(q,{onClick:()=>v.reset(u.map(c=>c.id)),children:[a.jsx(J,{})," Play"]})]}),!s&&a.jsx(Ee,{}),s&&u.slice(0,i).map(c=>a.jsx(be,{albumName:c.album.name,albumCover:c.album.cover,artistName:c.artist.name,musicName:c.name,musicCodec:c.codec,isLiked:c.isLiked,onClick:()=>v.add(c.id),onLongPress:()=>L.open({title:"Related to this music",content:a.jsx(ye,{id:c.id,onAlbumClick:()=>t(`/album/${c.album.id}`),onArtistClick:()=>t(`/artist/${c.artist.id}`)})})},c.id)),s&&u.length>i&&a.jsx("div",{style:{padding:"0 16px 16px"},children:a.jsx(q,{style:{width:"100%",justifyContent:"center"},onClick:d,children:"Load More"})})]})}const Gt=200;function Ml(){const t=Z(),[e,n]=He(),[{musics:r,loaded:s}]=R(z),[i,o]=m.useState(Number(e.get("l"))||Gt),l=async()=>{const c=await $.prompt("Search keyword",e.get("q")||"");e.set("q",c),n(e,{replace:!0})},d=()=>{o(i+Gt),e.set("l",(i+Gt).toString()),n(e,{replace:!0})},u=r==null?void 0:r.filter(c=>{var h,y,x;return c.name.toLowerCase().includes(((h=e.get("q"))==null?void 0:h.toLowerCase())||"")||c.artist.name.toLowerCase().includes(((y=e.get("q"))==null?void 0:y.toLowerCase())||"")||c.album.name.toLowerCase().includes(((x=e.get("q"))==null?void 0:x.toLowerCase())||"")});return a.jsxs(a.Fragment,{children:[a.jsxs(je,{children:[a.jsx(q,{style:{width:"160px"},onClick:l,children:e.get("q")||"Search"}),a.jsxs(q,{onClick:()=>v.reset(u.map(c=>c.id)),children:[a.jsx(J,{})," Play"]})]}),!s&&a.jsx(Ee,{}),s&&u.slice(0,i).map(c=>a.jsx(be,{albumName:c.album.name,albumCover:c.album.cover,artistName:c.artist.name,musicName:c.name,musicCodec:c.codec,isLiked:c.isLiked,onClick:()=>v.add(c.id),onLongPress:()=>L.open({title:"Related to this music",content:a.jsx(ye,{id:c.id,onAlbumClick:()=>t(`/album/${c.album.id}`),onArtistClick:()=>t(`/artist/${c.artist.id}`)})})},c.id)),s&&u.length>i&&a.jsx("div",{style:{padding:"0 16px 16px"},children:a.jsx(q,{style:{width:"100%",justifyContent:"center"},onClick:d,children:"Load More"})})]})}const Bl=S.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    gap: 1rem;
`,Il=S.div`
    animation: dance 1.25s infinite ease-in;
    font-size: 2rem;
    font-weight: bold;

    @keyframes dance {
        0% {
            transform: rotate(0deg);
        }
        25% {
            transform: rotate(12deg);
        }
        50% {
            transform: rotate(0deg);
        }
        75% {
            transform: rotate(-12deg);
        }
        100% {
            transform: rotate(0deg);
        }
    }
`,Dl=S.div`
    color: #666;
    font-size: 1.25rem;
    margin-top: 1rem;
`;function $l(){return a.jsxs(Bl,{children:[a.jsx(Il,{children:"(㇏(•̀ᵥᵥ•́)ノ)"}),a.jsx(Dl,{children:"why are you here?"}),a.jsx(q,{onClick:()=>location.assign("/"),children:"Go Home"})]})}const ql=S.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 1rem;

    .play,
    .mode,
    .queue,
    .shuffle,
    .skip-back,
    .skip-forward {
        position: relative;
        width: 3rem;
        height: 3rem;
        border-radius: 0.25rem;
        background-color: transparent;
        color: white;
        border: none;
        cursor: pointer;
        font-weight: bold;
        text-transform: uppercase;
        transition: background-color 0.25s ease-in-out;

        svg {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 1rem;
            height: 1rem;
        }
    }

    .skip-back,
    .skip-forward {
        svg {
            transform: translate(-70%, -50%);
        }

        &::after {
            content: "";
            position: absolute;
            display: block;
            top: 50%;
            right: calc(50% - 0.5rem);
            transform: translate(-50%, -50%);
            width: 0.1rem;
            height: 0.75rem;
            background-color: #fff;
        }
    }

    .skip-back {
        transform: scaleX(-1);
    }

    .album-art {
        position: relative;
        max-width: 100%;
        width: 300px;
        height: 300px;

        @media (max-width: 332px) {
            height: calc(100vw - 2rem);
        }

        &.cd-shape {
            box-shadow: 0 0 0 8px rgba(255, 255, 255, 0.18);
            border-radius: 50%;

            &::before,
            &::after {
                content: "";
                position: absolute;
                z-index: 1;
                top: 50%;
                left: 50%;
                border-radius: 50%;
                transform: translate(-50%, -50%);
                width: 48px;
                height: 48px;
                background-color: rgba(255, 255, 255, 0.18);
            }

            &::after {
                width: 32px;
                height: 32px;
                background-color: #000000;
            }
        }

        .foreground-wrapper {
            overflow: hidden;
            aspect-ratio: 1/1;
        }

        .foreground {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 50%;
            transition: border-radius 1s
                cubic-bezier(0.175, 0.885, 0.32, 1.275);

            @keyframes rotate {
                0% {
                    transform: rotate(0deg);
                }
                100% {
                    transform: rotate(360deg);
                }
            }

            &.rotate {
                animation: rotate 3s linear infinite;
                animation-play-state: paused;
            }

            &.rotate.playing {
                animation-play-state: running;
            }
        }

        .background {
            position: absolute;
            top: 48px;
            left: 0;
            width: 100%;
            height: 100%;
            transform: scale(0.88);
            object-fit: cover;
            border-radius: 50%;
            opacity: 0.5;
            z-index: -1;
            filter: blur(48px);
            transition: border-radius 1s
                cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
    }

    .title-info {
        margin-top: 3rem;
        width: 500px;
        max-width: 100%;

        .title {
            .name {
                margin-bottom: 0.5rem;
                font-weight: bold;
            }

            .artist {
                font-size: 0.875rem;
                color: #888;
            }
        }
    }

    .time-info {
        margin-top: 3rem;
        display: flex;
        justify-content: space-between;
        width: 500px;
        max-width: 90%;
        margin-bottom: 0.5rem;
    }

    .progress {
        width: 500px;
        max-width: 90%;
        height: 20px;
        background-color: #333;
        border-radius: 5px;
        overflow: hidden;

        .bar {
            width: 100%;
            height: 100%;
            transform: translateX(-100%);
            background-color: #a076f1;
            animation: progress 3s infinite ease-in-out;
        }
    }

    .action {
        margin-top: 2rem;
        width: 500px;
        max-width: 90%;
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        justify-content: space-between;

        .playback {
            display: flex;
            justify-content: space-between;
        }

        .shuffle.active {
            svg {
                color: #a076f1;
            }
        }

        @media (max-width: 400px) {
            .playback {
                width: 100%;
                order: -1;
                margin-bottom: 1rem;
            }
        }

        button {
            width: 4rem;
            height: 4rem;
            border-radius: 50%;
            background-color: transparent;
            border: none;
            cursor: pointer;
            transition: background-color 0.25s ease-in-out;

            @media (min-width: 1024px) {
                &:hover {
                    background-color: rgba(255, 255, 255, 0.2);
                }
            }
        }
    }

    .footer {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        padding: 1rem;
        display: flex;
        justify-content: center;
        align-items: center;

        svg {
            color: #888;
            transform: rotate(-90deg) translate(50%, -50%);
        }
    }
`;function Ul(){const t=Z(),[e]=R(v),[{musicMap:n}]=R(z),[r,s]=m.useState("50%"),i=e.selected!==null?n.get(e.items[e.selected]):null,o=d=>{const{width:u,left:c,right:h}=d.currentTarget.getBoundingClientRect();let y=d.touches?d.touches[0].clientX:d.clientX;y=y<c?c:y>h?h:y;const x=(y-c)/u,p=(i==null?void 0:i.duration)||1;v.seek(p*x)},l=d=>{var u;if(d.buttons===1){o(d);return}((u=d.touches)==null?void 0:u.length)===1&&o(d)};return m.useEffect(()=>{let d=null;if(!e.isPlaying){s("50%");return}const u=()=>{const c=()=>Math.floor(Math.random()*90+10)+"%";s(`${c()} ${c()} ${c()} ${c()}`),d=setTimeout(u,1e3)};return u(),()=>{d&&clearTimeout(d)}},[e.isPlaying]),a.jsxs(ql,{as:bn.div,animate:"in",exit:"out",initial:"out",variants:{in:{opacity:1,y:0},out:{opacity:0,y:50}},transition:{duration:.25},children:[a.jsxs("div",{className:"album-art",children:[a.jsx("img",{className:"background",style:{borderRadius:r},src:Fe(i==null?void 0:i.album.cover),alt:i==null?void 0:i.album.name}),a.jsx("div",{className:"foreground-wrapper",children:a.jsx("img",{className:"foreground",style:{borderRadius:r},src:Fe(i==null?void 0:i.album.cover.replace("/resized","")),alt:i==null?void 0:i.album.name})})]}),a.jsx("div",{className:"title-info",children:a.jsxs("button",{className:"clickable title",onClick:()=>i&&L.open({title:"Related to this music",content:a.jsx(ye,{id:i.id,onAlbumClick:()=>t(`/album/${i.album.id}`),onArtistClick:()=>t(`/artist/${i.artist.id}`)})}),children:[a.jsx("div",{className:"name",children:i==null?void 0:i.name}),a.jsx("div",{className:"artist",children:i==null?void 0:i.artist.name})]})}),a.jsxs("div",{className:"time-info",children:[a.jsx("div",{className:"current-time",children:en(e.currentTime)}),a.jsx("div",{className:"total-time",children:en((i==null?void 0:i.duration)||0)})]}),a.jsx("div",{className:"progress",role:"slider",tabIndex:0,"aria-valuenow":e.progress,"aria-valuemin":0,"aria-valuemax":100,onClick:o,onMouseMove:l,onTouchMove:l,children:a.jsx("div",{className:"bar",style:{transform:`translate(-${100-e.progress}%, 0)`}})}),a.jsxs("div",{className:"action",children:[a.jsxs("button",{className:"icon-button mode",onClick:()=>v.changeRepeatMode(),children:[e.repeatMode==="all"&&a.jsx(es,{}),e.repeatMode==="one"&&a.jsx(Gr,{}),e.repeatMode==="none"&&a.jsx(ts,{})]}),a.jsxs("div",{className:"playback",children:[a.jsx("button",{className:"icon-button skip-back",onClick:()=>v.prev(),children:a.jsx(J,{})}),a.jsx("button",{className:"icon-button",onClick:()=>e.isPlaying?v.pause():v.play(),children:e.isPlaying?a.jsx(Zr,{}):a.jsx(J,{})}),a.jsx("button",{className:"icon-button skip-forward",onClick:()=>v.next(),children:a.jsx(J,{})})]}),a.jsx("button",{className:`icon-button shuffle ${e.shuffle?"active":""}`,onClick:()=>v.toggleShuffle(),children:a.jsx(ns,{})})]}),a.jsx("div",{className:"footer",children:a.jsx("button",{className:"icon-button",onClick:()=>history.back(),children:a.jsx(Xr,{})})})]})}const Fl=S.div`
    display: flex;
    flex-direction: row;
    align-items: center;

    .icon-button {
        margin-left: 1rem;

        svg {
            width: 1rem;
            height: 1rem;
        }
    }
`;function zl({playlist:t,onClick:e,onLongPress:n}){const{attributes:r,listeners:s,setNodeRef:i,transform:o,transition:l}=mn({id:t.id}),d={transform:gn.Transform.toString(o),transition:l};return a.jsxs(Fl,{ref:i,style:d,...r,children:[a.jsx("div",{className:"icon-button",...s,style:{cursor:"grab",touchAction:"none"},children:a.jsx(kt,{})}),a.jsx("div",{style:{flex:1,maxWidth:"calc(100% - 4rem)"},children:a.jsx(qs,{...t,onClick:e,onLongPress:n},t.id)})]})}function Hl(){const t=Z(),[{playlists:e,loaded:n},r]=R(Wn),s=async()=>{const o=await $.prompt("Enter playlist name");ie.create(o)},i=o=>{const{active:l,over:d}=o;if(d&&l.id!==d.id){const u=e.findIndex(y=>y.id===l.id),c=e.findIndex(y=>y.id===d.id),h=yn(e,u,c);ie.changeOrder(h.map(y=>y.id)),r(y=>({...y,playlists:h}))}};return a.jsxs(a.Fragment,{children:[a.jsxs(je,{children:[a.jsx("div",{}),a.jsx(q,{onClick:s,children:"New Playlist"})]}),a.jsxs(Kn,{items:e.map(o=>o.id),onDragEnd:i,children:[!n&&a.jsx(Ee,{}),n&&(e==null?void 0:e.map(o=>a.jsx(zl,{playlist:o,onClick:()=>t(`/playlist/${o.id}`),onLongPress:()=>L.open({content:a.jsx(ml,{id:o.id,onPlaylistClick:()=>t(`/playlist/${o.id}`)})})},o.id)))]})]})}const Wl=S.div`
    display: flex;
    flex-direction: row;
    align-items: center;

    .checkbox {
        margin-left: 1rem;

        svg {
            width: 1rem;
            height: 1rem;
        }

        &.active svg {
            color: #ccc;
            fill: ${fe.theme.COLOR_PURPLE_PROMINENT};
        }
    }
`,Vl=S.div`
    display: flex;
    flex-direction: column;
    flex: 1;

    .header {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        background-color: #111;
        padding: 3rem 1rem;

        .cover {
            width: 300px;
            height: 300px;
            margin-bottom: 1rem;
        }

        h1 {
            font-size: 1.25rem;
            font-weight: bold;
        }
    }

    .select-actions {
        position: sticky;
        bottom: 0;
        left: 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.5rem 0;
        background-color: ${fe.theme.COLOR_PURPLE_PROMINENT};

        button {
            display: flex;
            align-items: center;
            flex-direction: column;
            justify-content: center;
            font-size: 0.75rem;
            font-weight: bold;
            gap: 0.25rem;

            svg {
                width: 1.25rem;
                height: 1.25rem;
            }
        }
    }
`;function Kl({music:t,isSelectMode:e,isSelected:n,onClick:r,onSelect:s,onLongPress:i}){const{attributes:o,listeners:l,setNodeRef:d,transform:u,transition:c}=mn({id:t.id}),h={transform:gn.Transform.toString(u),transition:c};return a.jsxs(Wl,{ref:d,style:h,...o,children:[e?a.jsx("button",{className:`icon-button checkbox ${n?"active":""} `,onClick:s,children:a.jsx(An,{})}):a.jsx("div",{className:"icon-button checkbox",...l,style:{cursor:"grab",touchAction:"none"},children:a.jsx(kt,{})}),a.jsx("div",{style:{flex:1,maxWidth:"calc(100% - 4rem)"},children:a.jsx(be,{albumName:t.album.name,albumCover:t.album.cover,artistName:t.artist.name,musicName:t.name,musicCodec:t.codec,isLiked:t.isLiked,onClick:e?s:r,onLongPress:i})})]})}function Jl(){const t=Z(),{id:e}=fn(),n=Gs(),{data:r}=pn(["playlist",e],()=>rl(e).then(c=>c.data.playlist),{enabled:!!e}),[{musicMap:s}]=R(z),[i,o]=m.useState(!1),[l,d]=m.useState([]),u=c=>{const{active:h,over:y}=c;if(r&&y&&h.id!==y.id){const x=r.musics.findIndex(({id:w})=>w===h.id),p=r.musics.findIndex(({id:w})=>w===y.id),g=yn(r.musics,x,p);ie.changeMusicOrder(r.id,g.map(({id:w})=>w)),n.setQueryData(["playlist",e],()=>({...r,musics:g}))}};return m.useEffect(()=>{const c=()=>{n.invalidateQueries(["playlist",e])};return b.on(Me,c),b.on(Be,c),b.on(Ie,c),()=>{b.off(Me,c),b.off(Be,c),b.off(Ie,c)}},[e,n]),m.useEffect(()=>{d([])},[i]),r?a.jsxs(Vl,{children:[a.jsxs("div",{className:"header",children:[a.jsx(En,{className:"cover",images:r.musics.slice(0,16).map(c=>{var h;return((h=s.get(c.id))==null?void 0:h.album.cover)??""})}),a.jsx("h1",{children:r.name})]}),a.jsxs(je,{children:[a.jsx("div",{style:{display:"flex",alignItems:"center",gap:"1rem"},children:a.jsx($s,{active:i,label:i?`${l.length} selected`:`${r.musics.length} musics`,onClick:()=>o(!i),onSelectAll:()=>d(r.musics.map(({id:c})=>c))})}),a.jsxs(q,{onClick:()=>v.reset(r.musics.map(({id:c})=>c)),children:[a.jsx(J,{})," Play"]})]}),a.jsx("div",{style:{flex:1},children:a.jsx(Kn,{items:r.musics.map(({id:c})=>c),onDragEnd:u,children:r.musics.map(({id:c})=>{const h=s.get(c);return h?a.jsx(Kl,{music:h,isSelectMode:i,isSelected:l.includes(h.id),onClick:()=>v.add(h.id),onSelect:()=>{l.includes(h.id)?d(l.filter(y=>y!==h.id)):d([...l,h.id])},onLongPress:()=>L.open({content:a.jsx(ye,{id:h.id,onAlbumClick:()=>t(`/album/${h.album.id}`),onArtistClick:()=>t(`/artist/${h.artist.id}`)})})},h.id):null})})}),i&&l.length>0&&a.jsxs("div",{className:"select-actions",children:[a.jsxs("button",{className:"clickable",onClick:()=>{l.forEach(c=>v.add(c)),o(!1)},children:[a.jsx(J,{}),a.jsx("span",{children:"Play"})]}),a.jsxs("button",{className:"clickable",onClick:()=>L.open({title:"Move to playlist",content:a.jsx(Vn,{onClick:c=>{ie.moveMusic(r.id,c,l),$.toast("Moved to playlist"),o(!1)}})}),children:[a.jsx(On,{}),a.jsx("span",{children:"Move"})]}),a.jsxs("button",{className:"clickable",onClick:async()=>{ie.removeMusic(r.id,l),o(!1)},children:[a.jsx(Rn,{}),a.jsx("span",{children:"Delete"})]})]})]}):null}const Yl=S.div`
    display: flex;
    flex-direction: column;
    height: 100%;

    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 60px;
        padding: 0 1rem;
        border-bottom: 1px solid #333;

        button {
            width: auto;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            color: #eee;
            font-size: 0.8rem;

            .link {
                width: 0;
                height: 0;
                border-top: 0.3rem solid transparent;
                border-bottom: 0.3rem solid transparent;
                border-left: 0.3rem solid currentColor;
                transform: rotate(90deg);
            }

            &.active {
                color: ${fe.theme.COLOR_PURPLE_PROMINENT};
            }

            svg {
                width: 1rem;
                height: 1rem;
            }
        }
    }

    .footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.75rem 0.5rem;

        .button {
            border: none;
            background: none;
            color: #a076f1;
            font-size: 1rem;
            font-weight: 600;
            padding: 0.5rem;
            border-radius: 0.5rem;
        }
    }

    .select-actions {
        position: sticky;
        bottom: 0;
        left: 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.5rem 0;
        background-color: ${fe.theme.COLOR_PURPLE_PROMINENT};

        button {
            display: flex;
            align-items: center;
            flex-direction: column;
            justify-content: center;
            font-size: 0.75rem;
            font-weight: bold;
            gap: 0.25rem;

            svg {
                width: 1.25rem;
                height: 1.25rem;
            }
        }
    }

    ul {
        margin: 0;
        padding: 0;
        width: 100%;
        list-style: none;
    }
`,Gl=S.li`
    position: relative;
    display: flex;
    align-items: center;

    .checkbox {
        margin-left: 1rem;

        svg {
            width: 1rem;
            height: 1rem;
        }

        &.active {
            svg {
                color: #ccc;
                fill: ${fe.theme.COLOR_PURPLE_PROMINENT};
            }
        }
    }

    @keyframes breathing {
        0% {
            opacity: 0.15;
        }
        50% {
            opacity: 0.25;
        }
        100% {
            opacity: 0.15;
        }
    }

    &.now-playing {
        &::before {
            content: "";
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            background-color: #735af2;
            animation: breathing 3s ease infinite;
            z-index: -1;
            pointer-events: none;
        }
    }
`,Xl=({music:t,isCurrentMusic:e,isSelectMode:n,isSelected:r,onSelect:s,onClick:i,onLongPress:o})=>{const{attributes:l,listeners:d,setNodeRef:u,transform:c,transition:h}=mn({id:t.id}),y={transform:gn.Transform.toString(c),transition:h};return a.jsxs(Gl,{ref:u,...l,style:y,className:e?"now-playing":"",children:[n?a.jsx("button",{className:`icon-button checkbox ${r?"active":""}`,onClick:s,children:a.jsx(An,{})}):a.jsx("button",{...d,className:"icon-button checkbox",style:{cursor:"grab",touchAction:"none"},children:a.jsx(kt,{})}),a.jsx("div",{style:{flex:1,maxWidth:"calc(100% - 4rem)"},children:a.jsx(be,{musicName:t.name,artistName:t.artist.name,albumName:t.album.name,albumCover:t.album.cover,isLiked:t.isLiked,onClick:n?s:i,onLongPress:o},t.id)})]})};function Ql(){const t=Z(),[{items:e,selected:n},r]=R(v),[{musicMap:s}]=R(z),i=m.useRef(null),[o,l]=m.useState(!1),[d,u]=m.useState([]),c=async h=>{const{active:y,over:x}=h;if(x){if(y.id===x.id)return;r(p=>{const g=p.items[p.selected],w=p.items.indexOf(y.id.toString()),E=p.items.indexOf(x.id.toString()),k=yn(p.items,w,E);return g?{...p,items:k,selected:k.indexOf(g)}:{...p,items:k}})}};return m.useEffect(()=>{u([])},[o]),m.useEffect(()=>{if(i.current){const h=i.current.children.item(n||0);if(!h)return;i.current.scrollTo({top:h.offsetTop-60,behavior:"smooth"})}},[i,n]),a.jsxs(Yl,{as:bn.div,animate:"in",exit:"out",initial:"out",variants:{in:{opacity:1,y:0},out:{opacity:0,y:50}},transition:{duration:.25},children:[a.jsx("div",{className:"header",children:a.jsx("div",{style:{display:"flex",alignItems:"center",gap:"1rem"},children:a.jsx($s,{label:o?`${d.length} selected`:`${e==null?void 0:e.length} musics`,active:o,onClick:()=>l(!o),onSelectAll:()=>u(e)})})}),a.jsx("ul",{className:"container",ref:i,children:a.jsx(Kn,{items:e,onDragEnd:c,children:e==null?void 0:e.map((h,y)=>{const x=s.get(h);return x?a.jsx(Xl,{music:x,isCurrentMusic:n===y,isSelectMode:o,isSelected:d.includes(h),onSelect:()=>{d.includes(h)?u(d.filter(p=>p!==h)):u([...d,h])},onClick:()=>{v.select(y)},onLongPress:()=>L.open({content:a.jsx(ye,{id:x.id,onAlbumClick:()=>t(`/album/${x.album.id}`),onArtistClick:()=>t(`/artist/${x.artist.id}`)})})},h):null})})}),o&&d.length>0&&a.jsxs("div",{className:"select-actions",children:[a.jsxs("button",{className:"clickable",onClick:()=>L.open({title:"Move to playlist",content:a.jsx(Vn,{onClick:h=>{ie.addMusic(h,d),$.toast("Added to playlist"),l(!1)}})}),children:[a.jsx(On,{}),a.jsx("span",{children:"Save"})]}),a.jsxs("button",{className:"clickable",onClick:()=>{v.removeItems(d),l(!1)},children:[a.jsx(Rn,{}),a.jsx("span",{children:"Delete"})]})]}),a.jsxs("div",{className:"footer",children:[a.jsx("div",{}),a.jsx("button",{className:"icon-button",onClick:()=>history.back(),children:a.jsx(Bo,{})})]})]})}class Zl extends pe{constructor(){super();F(this,"init",!1);F(this,"listener");this.state={connectors:[]},this.listener=new bs,this.listener.connect({onConnectors:n=>{this.set({connectors:n})}})}get state(){return this.init||(this.init=!0,this.sync()),super.state}set state(n){super.state=n}async sync(){b.emit("get-connectors")}}const ed=new Zl,td=S.div`
    padding: 1rem;

    section {
        display: flex;
        flex-direction: column;
        border-bottom: 1px solid #222;
        padding: 2.5rem 0;
        gap: 1rem;

        h3 {
            font-size: 1rem;
            font-weight: 600;
            color: #656565;
        }

        p {
            font-size: 0.8rem;
            font-weight: 400;
            color: #d0d0d0;
        }

        .progress-text {
            font-size: 0.8rem;
            font-weight: 400;
            color: #ffffff;
        }
    }

    .input-section {
        display: flex;
        gap: 1rem;
        margin-top: 0.5rem;
        flex-wrap: wrap;
        padding: 1rem;
        border: 1px solid #333;
        border-radius: 0.5rem;

        label {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-size: 0.8rem;
            font-weight: 400;
            color: #d0d0d0;

            input {
                margin: 0;
            }
        }
    }

    .connector {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        font-size: 0.825rem;
        gap: 0.5rem;

        .date {
            font-size: 0.825rem;
            color: #999;
        }

        .this-device, .kick {
            padding: 0.125rem 0.5rem;
            border-radius: 0.5rem;
            background-color: #3d3493;
            font-size: 0.75rem;
            color: #eee;
        }

        .kick {
            cursor: pointer;
            background-color: #333;
        }
    }
`;function nd(){const[{connectors:t}]=R(ed),[{playMode:e,insertMode:n}]=R(v),[r,s]=m.useState(""),i=async o=>{o&&!await $.confirm("Please only proceed with the update if it is recommended by the developer. Are you sure you want to proceed?")||b.emit("sync-music",{force:o})};return m.useEffect(()=>(b.on("sync-music",o=>{(o==="done"||o==="error")&&(o==="done"?$.toast("Completed sync music"):o==="error"&&$.toast("Error while sync music"),setTimeout(()=>{s("")},1e3)),s(o)}),()=>{b.off("sync-music")}),[]),a.jsxs(td,{children:[a.jsxs("section",{children:[a.jsx("h3",{children:"Synchronization"}),a.jsx("p",{children:"Sync from your server"}),r&&a.jsx("p",{className:"progress-text",children:r}),a.jsxs("div",{style:{display:"flex",gap:"1rem"},children:[a.jsx(q,{onClick:()=>i(!1),children:"Sync"}),a.jsx(q,{onClick:()=>i(!0),children:"Force Sync"})]})]}),a.jsxs("section",{children:[a.jsx("h3",{children:"Play Mode"}),a.jsx("p",{children:"When you add a music to the queue, It will..."}),a.jsxs("div",{className:"input-section",children:[a.jsxs("label",{children:[a.jsx("input",{type:"radio",name:"play-mode",value:"immediately",defaultChecked:e==="immediately",onChange:()=>v.setPlayMode("immediately")}),"Play immediately"]}),a.jsxs("label",{children:[a.jsx("input",{type:"radio",name:"play-mode",value:"later",defaultChecked:e==="later",onChange:()=>v.setPlayMode("later")}),"Play later"]})]}),a.jsxs("div",{className:"input-section",children:[a.jsxs("label",{children:[a.jsx("input",{type:"radio",name:"insert-mode",value:"first",defaultChecked:n==="first",onChange:()=>v.setInsertMode("first")}),"Add to the top of the queue"]}),a.jsxs("label",{children:[a.jsx("input",{type:"radio",name:"insert-mode",value:"last",defaultChecked:n==="last",onChange:()=>v.setInsertMode("last")}),"Add to the bottom of the queue"]}),a.jsxs("label",{children:[a.jsx("input",{type:"radio",name:"insert-mode",value:"after",defaultChecked:n==="after",onChange:()=>v.setInsertMode("after")}),"Add to the next of the current music"]})]})]}),a.jsxs("section",{children:[a.jsx("h3",{children:"Connectors"}),t.map(o=>a.jsxs("div",{className:"connector",children:[a.jsx("span",{children:o.userAgent}),a.jsx("span",{className:"date",children:new Date(o.connectedAt).toLocaleDateString()}),o.id===b.id?a.jsx("span",{className:"this-device",children:"This device"}):a.jsx("button",{className:"kick",onClick:()=>bs.remove(o.id),children:"Remove"})]},o.id))]}),a.jsxs("section",{children:[a.jsx("h3",{children:"Have a problem?"}),a.jsx("div",{style:{display:"flex",gap:"1rem"},children:a.jsx(q,{onClick:()=>window.location.reload(),children:"Try Refresh"})})]})]})}const rd=new Xs({defaultOptions:{queries:{refetchOnWindowFocus:!1,retry:!1,suspense:!0}}}),sd=Qs([{element:a.jsx(Lr,{}),children:[{path:"/",element:a.jsx(Ml,{})},{path:"/favorite",element:a.jsx(Pl,{})},{path:"/album",element:a.jsx(Sl,{})},{path:"/artist",element:a.jsx(Nl,{})},{path:"/playlist",element:a.jsx(Hl,{})},{path:"/setting",element:a.jsx(nd,{})}]},{element:a.jsx(Lr,{isSubPage:!0,animationDirection:"RightToLeft"}),children:[{path:"/album/:id",element:a.jsx(Ol,{})},{path:"/artist/:id",element:a.jsx(Ll,{})},{path:"/playlist/:id",element:a.jsx(Jl,{})}]},{children:[{path:"/player",element:a.jsx(Ul,{})}]},{children:[{path:"/queue",element:a.jsx(Ql,{})}]},{element:a.jsx($l,{}),path:"*"}]);function id(){return m.useEffect(()=>{b.connect(),b.on("resync",()=>{z.init=!1,Fs.init=!1,Us.init=!1}),window.addEventListener("focus",()=>{b.connected||b.connect()}),window.addEventListener("beforeunload",()=>{b.disconnect()})},[]),a.jsx(fl,{children:a.jsx(Zs,{client:rd,children:a.jsx(ei,{router:sd})})})}Xt.createRoot(document.getElementById("root")).render(a.jsx(ti.StrictMode,{children:a.jsx(id,{})}));
