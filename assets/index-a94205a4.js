var Us=Object.defineProperty;var Fs=(t,e,n)=>e in t?Us(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var U=(t,e,n)=>(Fs(t,typeof e!="symbol"?e+"":e,n),n);import{r as m,a as zs,c as B,b as Hn,_ as Hs,u as Z,d as Ws,L as Nr,e as ze,O as Vs,f as un,g as hn,h as Ks,Q as Js,i as Ys,j as Xs,k as Gs,R as Qs}from"./vendor-fa7a2e94.js";import{u as Zs,a as Wn,D as ei,r as ti,b as ni,c as ri,S as si,v as ii,s as oi,K as ai,P as ci,d as fn,C as pn,e as mn}from"./sortable-b0dcf770.js";import{m as gn}from"./motion-e6209d02.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function n(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=n(s);fetch(s.href,i)}})();var Tr={exports:{}},yt={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var li=m,di=Symbol.for("react.element"),ui=Symbol.for("react.fragment"),hi=Object.prototype.hasOwnProperty,fi=li.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,pi={key:!0,ref:!0,__self:!0,__source:!0};function Lr(t,e,n){var r,s={},i=null,o=null;n!==void 0&&(i=""+n),e.key!==void 0&&(i=""+e.key),e.ref!==void 0&&(o=e.ref);for(r in e)hi.call(e,r)&&!pi.hasOwnProperty(r)&&(s[r]=e[r]);if(t&&t.defaultProps)for(r in e=t.defaultProps,e)s[r]===void 0&&(s[r]=e[r]);return{$$typeof:di,type:t,key:i,ref:o,props:s,_owner:fi.current}}yt.Fragment=ui;yt.jsx=Lr;yt.jsxs=Lr;Tr.exports=yt;var a=Tr.exports,Yt={},Vn=zs;Yt.createRoot=Vn.createRoot,Yt.hydrateRoot=Vn.hydrateRoot;var F={},bt={},He={};Object.defineProperty(He,"__esModule",{value:!0});He.findOrCreateContainer=void 0;var mi=function(t){if(!document.getElementById(t)){var e=document.createElement("div");e.id=t,document.body.appendChild(e)}return document.getElementById(t)};He.findOrCreateContainer=mi;Object.defineProperty(bt,"__esModule",{value:!0});bt.toast=void 0;var gi=He,Kn=function(){var t=(0,gi.findOrCreateContainer)("toast-container");return t.classList.add("toast__container"),t}();function yi(t,e){Kn.childNodes.forEach(function(r){r.remove()});var n=document.createElement("div");n.textContent=t,n.classList.add("toast__content"),e!=null&&e.onClick&&(n.classList.add("toast__event"),n.addEventListener("click",e.onClick)),Kn.appendChild(n),n.addEventListener("animationend",function(){n.remove()})}bt.toast=yi;var de={},Jn=B&&B.__spreadArray||function(t,e,n){if(n||arguments.length===2)for(var r=0,s=e.length,i;r<s;r++)(i||!(r in e))&&(i||(i=Array.prototype.slice.call(e,0,r)),i[r]=e[r]);return t.concat(i||Array.prototype.slice.call(e))};Object.defineProperty(de,"__esModule",{value:!0});de.prompt=de.confirm=de.alert=void 0;var bi=He,V=function(){var t=(0,bi.findOrCreateContainer)("window-modal-container");return t.classList.add("window-modal__container"),t}();function yn(t,e){var n=e===void 0?{}:e,r=n.className,s=r===void 0?"":r;return Jn(Jn(['<div class="window-modal__window '.concat(s,'">'),'<div class="window-modal__content">'],t,!0),["</div>","</div>"],!1).join("")}var bn=function(t,e){var n=e.close,r=e.enter,s=e.escape,i=function(l){if(l.key==="Escape"&&s){l.preventDefault(),s();return}if(l.key==="Enter"&&r){l.preventDefault(),r();return}},o=function(l){l.target===V&&(n==null||n())};return document.addEventListener("keydown",i),V.addEventListener("click",o),V.innerHTML=t,V.classList.add("show"),function(){document.removeEventListener("keydown",i),V.removeEventListener("click",o),V.innerHTML="",V.classList.remove("show")}};function xi(t){return new Promise(function(e){var n,r=function(){s(),e()},s=bn(yn(['<div class="window-modal__content">','<div class="window-modal__text">'+t+"</div>",'<div class="window-modal__footer">','<button class="window-modal__confirm">OK</button>',"</div>","</div>"],{className:"window-modal__type-alert"}),{close:r,enter:r,escape:r});(n=V.querySelector(".window-modal__confirm"))===null||n===void 0||n.addEventListener("click",r)})}de.alert=xi;function wi(t){return new Promise(function(e){var n,r,s=function(){o(),e(!0)},i=function(){o(),e(!1)},o=bn(yn(['<div class="window-modal__text">'+t+"</div>",'<div class="window-modal__footer">','<button class="window-modal__cancel">Cancel</button>','<button class="window-modal__confirm">OK</button>',"</div>","</div>"],{className:"window-modal__type-confirm"}),{close:i,enter:s,escape:i});(n=V.querySelector(".window-modal__cancel"))===null||n===void 0||n.addEventListener("click",i),(r=V.querySelector(".window-modal__confirm"))===null||r===void 0||r.addEventListener("click",s)})}de.confirm=wi;function vi(t,e){return e===void 0&&(e=""),new Promise(function(n){var r,s,i=function(d){d.preventDefault();var u=d.target,c=u.value.value;l(),n(c)},o=function(){l(),n("")},l=bn(yn(['<form class="window-modal__content">','<div class="window-modal__text">'+t+"</div>",'<div class="window-modal__input">','<input type="text" name="value" value="'+e+'">',"</div>",'<div class="window-modal__footer">','<button type="button" class="window-modal__cancel">Cancel</button>','<button type="submit" class="window-modal__confirm">OK</button>',"</div>","</form>"],{className:"window-modal__type-prompt"}),{close:o,escape:o});(r=V.querySelector(".window-modal__cancel"))===null||r===void 0||r.addEventListener("click",o),(s=V.querySelector("form"))===null||s===void 0||s.addEventListener("submit",i),setTimeout(function(){var d=V.querySelector("input");d.focus(),d.setSelectionRange(d.value.length,d.value.length)},200)})}de.prompt=vi;(function(t){var e=B&&B.__createBinding||(Object.create?function(r,s,i,o){o===void 0&&(o=i);var l=Object.getOwnPropertyDescriptor(s,i);(!l||("get"in l?!s.__esModule:l.writable||l.configurable))&&(l={enumerable:!0,get:function(){return s[i]}}),Object.defineProperty(r,o,l)}:function(r,s,i,o){o===void 0&&(o=i),r[o]=s[i]}),n=B&&B.__exportStar||function(r,s){for(var i in r)i!=="default"&&!Object.prototype.hasOwnProperty.call(s,i)&&e(s,r,i)};Object.defineProperty(t,"__esModule",{value:!0}),n(bt,t),n(de,t)})(F);function Pr(t){var e=Object.create(null);return function(n){return e[n]===void 0&&(e[n]=t(n)),e[n]}}var ki=/^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|download|draggable|encType|enterKeyHint|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/,Ci=Pr(function(t){return ki.test(t)||t.charCodeAt(0)===111&&t.charCodeAt(1)===110&&t.charCodeAt(2)<91});function Ei(t){if(t.sheet)return t.sheet;for(var e=0;e<document.styleSheets.length;e++)if(document.styleSheets[e].ownerNode===t)return document.styleSheets[e]}function Si(t){var e=document.createElement("style");return e.setAttribute("data-emotion",t.key),t.nonce!==void 0&&e.setAttribute("nonce",t.nonce),e.appendChild(document.createTextNode("")),e.setAttribute("data-s",""),e}var _i=function(){function t(n){var r=this;this._insertTag=function(s){var i;r.tags.length===0?r.insertionPoint?i=r.insertionPoint.nextSibling:r.prepend?i=r.container.firstChild:i=r.before:i=r.tags[r.tags.length-1].nextSibling,r.container.insertBefore(s,i),r.tags.push(s)},this.isSpeedy=n.speedy===void 0?!0:n.speedy,this.tags=[],this.ctr=0,this.nonce=n.nonce,this.key=n.key,this.container=n.container,this.prepend=n.prepend,this.insertionPoint=n.insertionPoint,this.before=null}var e=t.prototype;return e.hydrate=function(r){r.forEach(this._insertTag)},e.insert=function(r){this.ctr%(this.isSpeedy?65e3:1)===0&&this._insertTag(Si(this));var s=this.tags[this.tags.length-1];if(this.isSpeedy){var i=Ei(s);try{i.insertRule(r,i.cssRules.length)}catch{}}else s.appendChild(document.createTextNode(r));this.ctr++},e.flush=function(){this.tags.forEach(function(r){return r.parentNode&&r.parentNode.removeChild(r)}),this.tags=[],this.ctr=0},t}(),$="-ms-",ut="-moz-",_="-webkit-",Mr="comm",xn="rule",wn="decl",ji="@import",Br="@keyframes",Ai="@layer",Oi=Math.abs,xt=String.fromCharCode,Ri=Object.assign;function Ni(t,e){return D(t,0)^45?(((e<<2^D(t,0))<<2^D(t,1))<<2^D(t,2))<<2^D(t,3):0}function Ir(t){return t.trim()}function Ti(t,e){return(t=e.exec(t))?t[0]:t}function j(t,e,n){return t.replace(e,n)}function Xt(t,e){return t.indexOf(e)}function D(t,e){return t.charCodeAt(e)|0}function Ie(t,e,n){return t.slice(e,n)}function ee(t){return t.length}function vn(t){return t.length}function Xe(t,e){return e.push(t),t}function Li(t,e){return t.map(e).join("")}var wt=1,ve=1,Dr=0,H=0,T=0,Ce="";function vt(t,e,n,r,s,i,o){return{value:t,root:e,parent:n,type:r,props:s,children:i,line:wt,column:ve,length:o,return:""}}function Ae(t,e){return Ri(vt("",null,null,"",null,null,0),t,{length:-t.length},e)}function Pi(){return T}function Mi(){return T=H>0?D(Ce,--H):0,ve--,T===10&&(ve=1,wt--),T}function K(){return T=H<Dr?D(Ce,H++):0,ve++,T===10&&(ve=1,wt++),T}function re(){return D(Ce,H)}function nt(){return H}function We(t,e){return Ie(Ce,t,e)}function De(t){switch(t){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function $r(t){return wt=ve=1,Dr=ee(Ce=t),H=0,[]}function qr(t){return Ce="",t}function rt(t){return Ir(We(H-1,Gt(t===91?t+2:t===40?t+1:t)))}function Bi(t){for(;(T=re())&&T<33;)K();return De(t)>2||De(T)>3?"":" "}function Ii(t,e){for(;--e&&K()&&!(T<48||T>102||T>57&&T<65||T>70&&T<97););return We(t,nt()+(e<6&&re()==32&&K()==32))}function Gt(t){for(;K();)switch(T){case t:return H;case 34:case 39:t!==34&&t!==39&&Gt(T);break;case 40:t===41&&Gt(t);break;case 92:K();break}return H}function Di(t,e){for(;K()&&t+T!==47+10;)if(t+T===42+42&&re()===47)break;return"/*"+We(e,H-1)+"*"+xt(t===47?t:K())}function $i(t){for(;!De(re());)K();return We(t,H)}function qi(t){return qr(st("",null,null,null,[""],t=$r(t),0,[0],t))}function st(t,e,n,r,s,i,o,l,d){for(var u=0,c=0,h=o,y=0,b=0,p=0,g=1,x=1,E=1,k=0,N="",ae=s,J=i,W=r,O=N;x;)switch(p=k,k=K()){case 40:if(p!=108&&D(O,h-1)==58){Xt(O+=j(rt(k),"&","&\f"),"&\f")!=-1&&(E=-1);break}case 34:case 39:case 91:O+=rt(k);break;case 9:case 10:case 13:case 32:O+=Bi(p);break;case 92:O+=Ii(nt()-1,7);continue;case 47:switch(re()){case 42:case 47:Xe(Ui(Di(K(),nt()),e,n),d);break;default:O+="/"}break;case 123*g:l[u++]=ee(O)*E;case 125*g:case 59:case 0:switch(k){case 0:case 125:x=0;case 59+c:E==-1&&(O=j(O,/\f/g,"")),b>0&&ee(O)-h&&Xe(b>32?Xn(O+";",r,n,h-1):Xn(j(O," ","")+";",r,n,h-2),d);break;case 59:O+=";";default:if(Xe(W=Yn(O,e,n,u,c,s,l,N,ae=[],J=[],h),i),k===123)if(c===0)st(O,e,W,W,ae,i,h,l,J);else switch(y===99&&D(O,3)===110?100:y){case 100:case 108:case 109:case 115:st(t,W,W,r&&Xe(Yn(t,W,W,0,0,s,l,N,s,ae=[],h),J),s,J,h,l,r?ae:J);break;default:st(O,W,W,W,[""],J,0,l,J)}}u=c=b=0,g=E=1,N=O="",h=o;break;case 58:h=1+ee(O),b=p;default:if(g<1){if(k==123)--g;else if(k==125&&g++==0&&Mi()==125)continue}switch(O+=xt(k),k*g){case 38:E=c>0?1:(O+="\f",-1);break;case 44:l[u++]=(ee(O)-1)*E,E=1;break;case 64:re()===45&&(O+=rt(K())),y=re(),c=h=ee(N=O+=$i(nt())),k++;break;case 45:p===45&&ee(O)==2&&(g=0)}}return i}function Yn(t,e,n,r,s,i,o,l,d,u,c){for(var h=s-1,y=s===0?i:[""],b=vn(y),p=0,g=0,x=0;p<r;++p)for(var E=0,k=Ie(t,h+1,h=Oi(g=o[p])),N=t;E<b;++E)(N=Ir(g>0?y[E]+" "+k:j(k,/&\f/g,y[E])))&&(d[x++]=N);return vt(t,e,n,s===0?xn:l,d,u,c)}function Ui(t,e,n){return vt(t,e,n,Mr,xt(Pi()),Ie(t,2,-2),0)}function Xn(t,e,n,r){return vt(t,e,n,wn,Ie(t,0,r),Ie(t,r+1,-1),r)}function we(t,e){for(var n="",r=vn(t),s=0;s<r;s++)n+=e(t[s],s,t,e)||"";return n}function Fi(t,e,n,r){switch(t.type){case Ai:if(t.children.length)break;case ji:case wn:return t.return=t.return||t.value;case Mr:return"";case Br:return t.return=t.value+"{"+we(t.children,r)+"}";case xn:t.value=t.props.join(",")}return ee(n=we(t.children,r))?t.return=t.value+"{"+n+"}":""}function zi(t){var e=vn(t);return function(n,r,s,i){for(var o="",l=0;l<e;l++)o+=t[l](n,r,s,i)||"";return o}}function Hi(t){return function(e){e.root||(e=e.return)&&t(e)}}var Wi=function(e,n,r){for(var s=0,i=0;s=i,i=re(),s===38&&i===12&&(n[r]=1),!De(i);)K();return We(e,H)},Vi=function(e,n){var r=-1,s=44;do switch(De(s)){case 0:s===38&&re()===12&&(n[r]=1),e[r]+=Wi(H-1,n,r);break;case 2:e[r]+=rt(s);break;case 4:if(s===44){e[++r]=re()===58?"&\f":"",n[r]=e[r].length;break}default:e[r]+=xt(s)}while(s=K());return e},Ki=function(e,n){return qr(Vi($r(e),n))},Gn=new WeakMap,Ji=function(e){if(!(e.type!=="rule"||!e.parent||e.length<1)){for(var n=e.value,r=e.parent,s=e.column===r.column&&e.line===r.line;r.type!=="rule";)if(r=r.parent,!r)return;if(!(e.props.length===1&&n.charCodeAt(0)!==58&&!Gn.get(r))&&!s){Gn.set(e,!0);for(var i=[],o=Ki(n,i),l=r.props,d=0,u=0;d<o.length;d++)for(var c=0;c<l.length;c++,u++)e.props[u]=i[d]?o[d].replace(/&\f/g,l[c]):l[c]+" "+o[d]}}},Yi=function(e){if(e.type==="decl"){var n=e.value;n.charCodeAt(0)===108&&n.charCodeAt(2)===98&&(e.return="",e.value="")}};function Ur(t,e){switch(Ni(t,e)){case 5103:return _+"print-"+t+t;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 6391:case 5879:case 5623:case 6135:case 4599:case 4855:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:return _+t+t;case 5349:case 4246:case 4810:case 6968:case 2756:return _+t+ut+t+$+t+t;case 6828:case 4268:return _+t+$+t+t;case 6165:return _+t+$+"flex-"+t+t;case 5187:return _+t+j(t,/(\w+).+(:[^]+)/,_+"box-$1$2"+$+"flex-$1$2")+t;case 5443:return _+t+$+"flex-item-"+j(t,/flex-|-self/,"")+t;case 4675:return _+t+$+"flex-line-pack"+j(t,/align-content|flex-|-self/,"")+t;case 5548:return _+t+$+j(t,"shrink","negative")+t;case 5292:return _+t+$+j(t,"basis","preferred-size")+t;case 6060:return _+"box-"+j(t,"-grow","")+_+t+$+j(t,"grow","positive")+t;case 4554:return _+j(t,/([^-])(transform)/g,"$1"+_+"$2")+t;case 6187:return j(j(j(t,/(zoom-|grab)/,_+"$1"),/(image-set)/,_+"$1"),t,"")+t;case 5495:case 3959:return j(t,/(image-set\([^]*)/,_+"$1$`$1");case 4968:return j(j(t,/(.+:)(flex-)?(.*)/,_+"box-pack:$3"+$+"flex-pack:$3"),/s.+-b[^;]+/,"justify")+_+t+t;case 4095:case 3583:case 4068:case 2532:return j(t,/(.+)-inline(.+)/,_+"$1$2")+t;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(ee(t)-1-e>6)switch(D(t,e+1)){case 109:if(D(t,e+4)!==45)break;case 102:return j(t,/(.+:)(.+)-([^]+)/,"$1"+_+"$2-$3$1"+ut+(D(t,e+3)==108?"$3":"$2-$3"))+t;case 115:return~Xt(t,"stretch")?Ur(j(t,"stretch","fill-available"),e)+t:t}break;case 4949:if(D(t,e+1)!==115)break;case 6444:switch(D(t,ee(t)-3-(~Xt(t,"!important")&&10))){case 107:return j(t,":",":"+_)+t;case 101:return j(t,/(.+:)([^;!]+)(;|!.+)?/,"$1"+_+(D(t,14)===45?"inline-":"")+"box$3$1"+_+"$2$3$1"+$+"$2box$3")+t}break;case 5936:switch(D(t,e+11)){case 114:return _+t+$+j(t,/[svh]\w+-[tblr]{2}/,"tb")+t;case 108:return _+t+$+j(t,/[svh]\w+-[tblr]{2}/,"tb-rl")+t;case 45:return _+t+$+j(t,/[svh]\w+-[tblr]{2}/,"lr")+t}return _+t+$+t+t}return t}var Xi=function(e,n,r,s){if(e.length>-1&&!e.return)switch(e.type){case wn:e.return=Ur(e.value,e.length);break;case Br:return we([Ae(e,{value:j(e.value,"@","@"+_)})],s);case xn:if(e.length)return Li(e.props,function(i){switch(Ti(i,/(::plac\w+|:read-\w+)/)){case":read-only":case":read-write":return we([Ae(e,{props:[j(i,/:(read-\w+)/,":"+ut+"$1")]})],s);case"::placeholder":return we([Ae(e,{props:[j(i,/:(plac\w+)/,":"+_+"input-$1")]}),Ae(e,{props:[j(i,/:(plac\w+)/,":"+ut+"$1")]}),Ae(e,{props:[j(i,/:(plac\w+)/,$+"input-$1")]})],s)}return""})}},Gi=[Xi],Qi=function(e){var n=e.key;if(n==="css"){var r=document.querySelectorAll("style[data-emotion]:not([data-s])");Array.prototype.forEach.call(r,function(g){var x=g.getAttribute("data-emotion");x.indexOf(" ")!==-1&&(document.head.appendChild(g),g.setAttribute("data-s",""))})}var s=e.stylisPlugins||Gi,i={},o,l=[];o=e.container||document.head,Array.prototype.forEach.call(document.querySelectorAll('style[data-emotion^="'+n+' "]'),function(g){for(var x=g.getAttribute("data-emotion").split(" "),E=1;E<x.length;E++)i[x[E]]=!0;l.push(g)});var d,u=[Ji,Yi];{var c,h=[Fi,Hi(function(g){c.insert(g)})],y=zi(u.concat(s,h)),b=function(x){return we(qi(x),y)};d=function(x,E,k,N){c=k,b(x?x+"{"+E.styles+"}":E.styles),N&&(p.inserted[E.name]=!0)}}var p={key:n,sheet:new _i({key:n,container:o,nonce:e.nonce,speedy:e.speedy,prepend:e.prepend,insertionPoint:e.insertionPoint}),nonce:e.nonce,inserted:i,registered:{},insert:d};return p.sheet.hydrate(l),p},Zi=!0;function eo(t,e,n){var r="";return n.split(" ").forEach(function(s){t[s]!==void 0?e.push(t[s]+";"):r+=s+" "}),r}var Fr=function(e,n,r){var s=e.key+"-"+n.name;(r===!1||Zi===!1)&&e.registered[s]===void 0&&(e.registered[s]=n.styles)},to=function(e,n,r){Fr(e,n,r);var s=e.key+"-"+n.name;if(e.inserted[n.name]===void 0){var i=n;do e.insert(n===i?"."+s:"",i,e.sheet,!0),i=i.next;while(i!==void 0)}};function no(t){for(var e=0,n,r=0,s=t.length;s>=4;++r,s-=4)n=t.charCodeAt(r)&255|(t.charCodeAt(++r)&255)<<8|(t.charCodeAt(++r)&255)<<16|(t.charCodeAt(++r)&255)<<24,n=(n&65535)*1540483477+((n>>>16)*59797<<16),n^=n>>>24,e=(n&65535)*1540483477+((n>>>16)*59797<<16)^(e&65535)*1540483477+((e>>>16)*59797<<16);switch(s){case 3:e^=(t.charCodeAt(r+2)&255)<<16;case 2:e^=(t.charCodeAt(r+1)&255)<<8;case 1:e^=t.charCodeAt(r)&255,e=(e&65535)*1540483477+((e>>>16)*59797<<16)}return e^=e>>>13,e=(e&65535)*1540483477+((e>>>16)*59797<<16),((e^e>>>15)>>>0).toString(36)}var ro={animationIterationCount:1,aspectRatio:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1},so=/[A-Z]|^ms/g,io=/_EMO_([^_]+?)_([^]*?)_EMO_/g,zr=function(e){return e.charCodeAt(1)===45},Qn=function(e){return e!=null&&typeof e!="boolean"},Nt=Pr(function(t){return zr(t)?t:t.replace(so,"-$&").toLowerCase()}),Zn=function(e,n){switch(e){case"animation":case"animationName":if(typeof n=="string")return n.replace(io,function(r,s,i){return te={name:s,styles:i,next:te},s})}return ro[e]!==1&&!zr(e)&&typeof n=="number"&&n!==0?n+"px":n};function $e(t,e,n){if(n==null)return"";if(n.__emotion_styles!==void 0)return n;switch(typeof n){case"boolean":return"";case"object":{if(n.anim===1)return te={name:n.name,styles:n.styles,next:te},n.name;if(n.styles!==void 0){var r=n.next;if(r!==void 0)for(;r!==void 0;)te={name:r.name,styles:r.styles,next:te},r=r.next;var s=n.styles+";";return s}return oo(t,e,n)}case"function":{if(t!==void 0){var i=te,o=n(t);return te=i,$e(t,e,o)}break}}if(e==null)return n;var l=e[n];return l!==void 0?l:n}function oo(t,e,n){var r="";if(Array.isArray(n))for(var s=0;s<n.length;s++)r+=$e(t,e,n[s])+";";else for(var i in n){var o=n[i];if(typeof o!="object")e!=null&&e[o]!==void 0?r+=i+"{"+e[o]+"}":Qn(o)&&(r+=Nt(i)+":"+Zn(i,o)+";");else if(Array.isArray(o)&&typeof o[0]=="string"&&(e==null||e[o[0]]===void 0))for(var l=0;l<o.length;l++)Qn(o[l])&&(r+=Nt(i)+":"+Zn(i,o[l])+";");else{var d=$e(t,e,o);switch(i){case"animation":case"animationName":{r+=Nt(i)+":"+d+";";break}default:r+=i+"{"+d+"}"}}}return r}var er=/label:\s*([^\s;\n{]+)\s*(;|$)/g,te,ao=function(e,n,r){if(e.length===1&&typeof e[0]=="object"&&e[0]!==null&&e[0].styles!==void 0)return e[0];var s=!0,i="";te=void 0;var o=e[0];o==null||o.raw===void 0?(s=!1,i+=$e(r,n,o)):i+=o[0];for(var l=1;l<e.length;l++)i+=$e(r,n,e[l]),s&&(i+=o[l]);er.lastIndex=0;for(var d="",u;(u=er.exec(i))!==null;)d+="-"+u[1];var c=no(i)+d;return{name:c,styles:i,next:te}},co=function(e){return e()},lo=Hn["useInsertionEffect"]?Hn["useInsertionEffect"]:!1,uo=lo||co,Hr=m.createContext(typeof HTMLElement<"u"?Qi({key:"css"}):null);Hr.Provider;var ho=function(e){return m.forwardRef(function(n,r){var s=m.useContext(Hr);return e(n,s,r)})},fo=m.createContext({}),po=Ci,mo=function(e){return e!=="theme"},tr=function(e){return typeof e=="string"&&e.charCodeAt(0)>96?po:mo},nr=function(e,n,r){var s;if(n){var i=n.shouldForwardProp;s=e.__emotion_forwardProp&&i?function(o){return e.__emotion_forwardProp(o)&&i(o)}:i}return typeof s!="function"&&r&&(s=e.__emotion_forwardProp),s},go=function(e){var n=e.cache,r=e.serialized,s=e.isStringTag;return Fr(n,r,s),uo(function(){return to(n,r,s)}),null},yo=function t(e,n){var r=e.__emotion_real===e,s=r&&e.__emotion_base||e,i,o;n!==void 0&&(i=n.label,o=n.target);var l=nr(e,n,r),d=l||tr(s),u=!d("as");return function(){var c=arguments,h=r&&e.__emotion_styles!==void 0?e.__emotion_styles.slice(0):[];if(i!==void 0&&h.push("label:"+i+";"),c[0]==null||c[0].raw===void 0)h.push.apply(h,c);else{h.push(c[0][0]);for(var y=c.length,b=1;b<y;b++)h.push(c[b],c[0][b])}var p=ho(function(g,x,E){var k=u&&g.as||s,N="",ae=[],J=g;if(g.theme==null){J={};for(var W in g)J[W]=g[W];J.theme=m.useContext(fo)}typeof g.className=="string"?N=eo(x.registered,ae,g.className):g.className!=null&&(N=g.className+" ");var O=ao(h.concat(ae),x.registered,J);N+=x.key+"-"+O.name,o!==void 0&&(N+=" "+o);var qs=u&&l===void 0?tr(k):d,Je={};for(var Ye in g)u&&Ye==="as"||qs(Ye)&&(Je[Ye]=g[Ye]);return Je.className=N,Je.ref=E,m.createElement(m.Fragment,null,m.createElement(go,{cache:x,serialized:O,isStringTag:typeof k=="string"}),m.createElement(k,Je))});return p.displayName=i!==void 0?i:"Styled("+(typeof s=="string"?s:s.displayName||s.name||"Component")+")",p.defaultProps=e.defaultProps,p.__emotion_real=p,p.__emotion_base=s,p.__emotion_styles=h,p.__emotion_forwardProp=l,Object.defineProperty(p,"toString",{value:function(){return"."+o}}),p.withComponent=function(g,x){return t(g,Hs({},n,x,{shouldForwardProp:nr(p,x,!0)})).apply(void 0,h)},p}},bo=["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","big","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","keygen","label","legend","li","link","main","map","mark","marquee","menu","menuitem","meta","meter","nav","noscript","object","ol","optgroup","option","output","p","param","picture","pre","progress","q","rp","rt","ruby","s","samp","script","section","select","small","source","span","strong","style","sub","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","title","tr","track","u","ul","var","video","wbr","circle","clipPath","defs","ellipse","foreignObject","g","image","line","linearGradient","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","svg","text","tspan"],A=yo.bind();bo.forEach(function(t){A[t]=A(t)});var qe={},ht=B&&B.__assign||function(){return ht=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++){e=arguments[n];for(var s in e)Object.prototype.hasOwnProperty.call(e,s)&&(t[s]=e[s])}return t},ht.apply(this,arguments)};Object.defineProperty(qe,"__esModule",{value:!0});qe.useValue=R=qe.useStore=void 0;var ft=m;function xo(t){var e=(0,ft.useState)(t.state),n=e[0],r=e[1];return(0,ft.useEffect)(function(){var s=t.subscribe(r);return function(){return t.unsubscribe(s)}},[]),[n,t.set.bind(t)]}var R=qe.useStore=xo;function wo(t,e){var n=(0,ft.useState)(t.state[e]),r=n[0],s=n[1];return(0,ft.useEffect)(function(){var i=t.subscribe(function(o){return s(o[e])});return function(){return t.unsubscribe(i)}},[]),[r,function(i){return t.set(function(o){var l;return ht(ht({},o),(l={},l[e]=i,l))})}]}qe.useValue=wo;const Ue=t=>t||"/images/beato.jpg";function ue({src:t,alt:e,style:n,loading:r="lazy",className:s}){const i=m.useRef(null);return m.useEffect(()=>{if(!i.current||r!=="lazy")return;const o=new IntersectionObserver(([l])=>{if(l.isIntersecting){const d=l.target;d.src=Ue(t),o.unobserve(d)}});return o.observe(i.current),()=>{o.disconnect()}},[r,t]),a.jsx(a.Fragment,{children:r!=="lazy"?a.jsx("img",{src:Ue(t),alt:e,style:n,className:s}):a.jsx("img",{ref:i,src:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQIW2NQV1f/DwACYwF11mMyYQAAAABJRU5ErkJggg==",alt:e,style:n,className:s})})}const vo=A.button`
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
`;function Wr({albumCover:t,albumName:e,artistName:n,onClick:r}){return a.jsxs(vo,{onClick:r,children:[a.jsx(ue,{className:"cover",src:t,alt:e}),a.jsx("span",{className:"title",children:e}),a.jsx("span",{className:"artist",children:n})]})}const ko=A.button`
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
`;function Co({artistName:t,artistCover:e,albumCount:n,musicCount:r,onClick:s}){return a.jsxs(ko,{className:"clickable linkable",onClick:s,children:[a.jsx(ue,{src:e,alt:t}),a.jsxs("div",{className:"info",children:[a.jsx("div",{className:"name",children:t}),a.jsxs("div",{className:"count",children:[a.jsxs("div",{className:"album",children:[n," albums"]}),a.jsx("span",{children:" / "}),a.jsxs("div",{className:"music",children:[r," songs"]})]})]})]})}const Eo=A.div`
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
`;function So({title:t,isOpen:e,onClose:n,children:r}){const s=m.useRef(!1);return m.useEffect(()=>{if(!e){s.current&&(s.current=!1,history.back());return}s.current||(s.current=!0,history.pushState(null,""));const i=()=>{s.current=!1,n==null||n()};return window.addEventListener("popstate",i),()=>{window.removeEventListener("popstate",i)}},[s,e,n]),a.jsxs(Eo,{className:e?"open":"",children:[a.jsx("button",{className:"clickable backdrop",onClick:n}),a.jsxs("div",{className:`bottom-panel ${e?"open":""}`,children:[t&&a.jsx("div",{className:"panel-title",children:t}),r]})]})}const _o=A.div`
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
`;function kn({images:t,className:e}){const n=t.length>=16?4:t.length>=9?3:t.length>=4?2:1;return a.jsxs(_o,{className:`${e} col-${n}`,children:[t.length===0&&a.jsx(ue,{}),t.slice(0,n*n).map((r,s)=>a.jsx(ue,{src:r,alt:""},s))]})}var he={},kt={},Cn={};Object.defineProperty(Cn,"__esModule",{value:!0});Cn.default={COLOR_WHITE:"#ffffff",COLOR_BLACK:"#000000",COLOR_PURPLE_DEEP:"#474787",COLOR_PURPLE_SHALLOW:"#515199",COLOR_PURPLE_NEON:"#735af2",COLOR_PURPLE_PROMINENT:"#a076f1",COLOR_PURPLE_LIVE:"#9b59b6",COLOR_PURPLE_GRAPE:"#8e44ad",COLOR_PURPLE_VIVID:"#5800ff",COLOR_PURPLE_GRAY:"#eeeeff",COLOR_EMBER:"#ffdd00",COLOR_YELLOW:"#f7cb46",COLOR_YELLOW_GRAY:"#e7e6e7"};var En={};Object.defineProperty(En,"__esModule",{value:!0});En.default={CARD_SHADOW_MAIN:"0 6px 24px 1px rgba(0, 0, 0, 0.1)",CARD_SHADOW_SUB:"0 0 10px rgba(0, 0, 0, 0.1)",SHADOW_NEON_PURPLE:"0 16px 16px rgba(115, 90, 242, .3)"};var pt=B&&B.__assign||function(){return pt=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++){e=arguments[n];for(var s in e)Object.prototype.hasOwnProperty.call(e,s)&&(t[s]=e[s])}return t},pt.apply(this,arguments)};Object.defineProperty(kt,"__esModule",{value:!0});var jo=Cn,Ao=En;kt.default=pt(pt({},jo.default),Ao.default);var Sn={};Object.defineProperty(Sn,"__esModule",{value:!0});var Pe=kt,Oo="box-shadow: ".concat(Pe.default.CARD_SHADOW_MAIN,";"),Ro="box-shadow: ".concat(Pe.default.CARD_SHADOW_SUB,";"),No=["color: ".concat(Pe.default.COLOR_WHITE,";"),"box-shadow: ".concat(Pe.default.SHADOW_NEON_PURPLE,";"),"background-color: ".concat(Pe.default.COLOR_PURPLE_NEON,";")].join(`
`);Sn.default={CARD_SHADOW_MAIN:Oo,CARD_SHADOW_SUB:Ro,NEON_PURPLE_BUTTON:No};(function(t){Object.defineProperty(t,"__esModule",{value:!0}),t.mixin=t.theme=void 0;var e=kt;Object.defineProperty(t,"theme",{enumerable:!0,get:function(){return e.default}});var n=Sn;Object.defineProperty(t,"mixin",{enumerable:!0,get:function(){return n.default}})})(he);const To=A.div`
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
        border-color: ${he.theme.COLOR_PURPLE_PROMINENT} transparent;
        width: 25px;
        height: 25px;
        border-radius: 50%;
    }
`,Ee=()=>{const[t,e]=m.useState(!1);return m.useEffect(()=>{const n=setTimeout(()=>{e(!0)},100);return()=>clearTimeout(n)}),t&&a.jsx(To,{children:a.jsx("div",{className:"spinner"})})},_n=t=>m.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:36,height:36,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round",className:"ai ai-CheckBox",...t},m.createElement("rect",{x:3,y:3,width:18,height:18,rx:4}),m.createElement("path",{d:"M9 12l2.25 2L15 10"})),Lo=t=>m.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:36,height:36,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round",className:"ai ai-Cross",...t},m.createElement("path",{d:"M20 20L4 4m16 0L4 20"})),Po=t=>m.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:36,height:36,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round",className:"ai ai-Data",...t},m.createElement("ellipse",{cx:12,cy:6,rx:8,ry:3}),m.createElement("path",{d:"M6.037 12C4.77 12.53 4 13.232 4 14c0 1.657 3.582 3 8 3s8-1.343 8-3c0-.768-.77-1.47-2.037-2"}),m.createElement("path",{d:"M4 6v4c0 1.657 3.582 3 8 3s8-1.343 8-3V6"}),m.createElement("path",{d:"M4 14v4c0 1.657 3.582 3 8 3s8-1.343 8-3v-4"})),Mo=t=>m.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:36,height:36,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round",className:"ai ai-DoubleCheck",...t},m.createElement("path",{d:"M2 12l5.25 5 2.625-3"}),m.createElement("path",{d:"M8 12l5.25 5L22 7"}),m.createElement("path",{d:"M16 7l-3.5 4"})),Bo=t=>m.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:36,height:36,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round",className:"ai ai-Download",...t},m.createElement("path",{d:"M12 15V3m0 12l-4-4m4 4l4-4"}),m.createElement("path",{d:"M2 17l.621 2.485A2 2 0 0 0 4.561 21H19.439a2 2 0 0 0 1.94-1.515L22 17"})),Vr=t=>m.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:36,height:36,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round",className:"ai ai-Heart",...t},m.createElement("path",{d:"M7 3C4.239 3 2 5.216 2 7.95c0 2.207.875 7.445 9.488 12.74a.985.985 0 0 0 1.024 0C21.125 15.395 22 10.157 22 7.95 22 5.216 19.761 3 17 3s-5 3-5 3-2.239-3-5-3z"})),Kr=t=>m.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:36,height:36,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round",className:"ai ai-Infinite",...t},m.createElement("path",{d:"M5.636 16C2.91 16 2 14 2 12s.91-4 3.636-4c3.637 0 9.091 8 12.728 8C21.09 16 22 14 22 12s-.91-4-3.636-4c-3.637 0-9.091 8-12.728 8z"})),Jr=t=>m.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:36,height:36,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round",className:"ai ai-ChevronLeft",...t},m.createElement("path",{d:"M15 4l-8 8 8 8"})),Ct=t=>m.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:36,height:36,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round",className:"ai ai-TextAlignJustified",...t},m.createElement("path",{d:"M3 6h18M3 12h18M3 18h18"})),Yr=t=>m.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:36,height:36,viewBox:"0 0 24 24",fill:"currentColor",strokeWidth:2,className:"ai ai-MoreVerticalFill",...t},m.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M12 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4z"}),m.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M12 10a2 2 0 1 1 0 4 2 2 0 0 1 0-4z"}),m.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M12 18a2 2 0 1 1 0 4 2 2 0 0 1 0-4z"})),Xr=t=>m.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:36,height:36,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round",className:"ai ai-Pause",...t},m.createElement("path",{d:"M7 5v14M17 5v14"})),Io=t=>m.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:36,height:36,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round",className:"ai ai-Pencil",...t},m.createElement("path",{d:"M4.333 16.048L16.57 3.81a2.56 2.56 0 0 1 3.62 3.619L7.951 19.667a2 2 0 0 1-1.022.547L3 21l.786-3.93a2 2 0 0 1 .547-1.022z"}),m.createElement("path",{d:"M14.5 6.5l3 3"})),X=t=>m.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:36,height:36,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round",className:"ai ai-Play",...t},m.createElement("path",{d:"M6 4v16"}),m.createElement("path",{d:"M20 12L6 20"}),m.createElement("path",{d:"M20 12L6 4"})),Gr=t=>m.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:36,height:36,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round",className:"ai ai-ArrowRepeat",...t},m.createElement("path",{d:"M18 2l3 3-3 3"}),m.createElement("path",{d:"M6 22l-3-3 3-3"}),m.createElement("path",{d:"M21 5H10a7 7 0 0 0-7 7"}),m.createElement("path",{d:"M3 19h11a7 7 0 0 0 7-7"})),Qr=t=>m.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:36,height:36,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round",className:"ai ai-ArrowRightLeft",...t},m.createElement("path",{d:"M21 6H3m18 0l-4 4m4-4l-4-4"}),m.createElement("path",{d:"M3 18h18M3 18l4 4m-4-4l4-4"})),Zr=t=>m.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:36,height:36,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round",className:"ai ai-ArrowShuffle",...t},m.createElement("path",{d:"M2 19h3.908a2 2 0 0 0 1.682-.919L11.5 12l3.91-6.082A2 2 0 0 1 17.091 5H22m0 14h-4.908a2 2 0 0 1-1.682-.919L13.428 15M2 5h3.908a2 2 0 0 1 1.682.918L9.571 9"}),m.createElement("path",{d:"M19 2l3 3-3 3"}),m.createElement("path",{d:"M19 16l3 3-3 3"})),jn=t=>m.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:36,height:36,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round",className:"ai ai-TrashBin",...t},m.createElement("path",{d:"M3 4l2.303 14.076a4 4 0 0 0 2.738 3.167l.328.104a12 12 0 0 0 7.262 0l.328-.104a4 4 0 0 0 2.738-3.166L21 4"}),m.createElement("ellipse",{cx:12,cy:4,rx:9,ry:2}));var Et={},Me=B&&B.__assign||function(){return Me=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++){e=arguments[n];for(var s in e)Object.prototype.hasOwnProperty.call(e,s)&&(t[s]=e[s])}return t},Me.apply(this,arguments)},rr=B&&B.__awaiter||function(t,e,n,r){function s(i){return i instanceof n?i:new n(function(o){o(i)})}return new(n||(n=Promise))(function(i,o){function l(c){try{u(r.next(c))}catch(h){o(h)}}function d(c){try{u(r.throw(c))}catch(h){o(h)}}function u(c){c.done?i(c.value):s(c.value).then(l,d)}u((r=r.apply(t,e||[])).next())})},sr=B&&B.__generator||function(t,e){var n={label:0,sent:function(){if(i[0]&1)throw i[1];return i[1]},trys:[],ops:[]},r,s,i,o;return o={next:l(0),throw:l(1),return:l(2)},typeof Symbol=="function"&&(o[Symbol.iterator]=function(){return this}),o;function l(u){return function(c){return d([u,c])}}function d(u){if(r)throw new TypeError("Generator is already executing.");for(;n;)try{if(r=1,s&&(i=u[0]&2?s.return:u[0]?s.throw||((i=s.return)&&i.call(s),0):s.next)&&!(i=i.call(s,u[1])).done)return i;switch(s=0,i&&(u=[u[0]&2,i.value]),u[0]){case 0:case 1:i=u;break;case 4:return n.label++,{value:u[1],done:!1};case 5:n.label++,s=u[1],u=[0];continue;case 7:u=n.ops.pop(),n.trys.pop();continue;default:if(i=n.trys,!(i=i.length>0&&i[i.length-1])&&(u[0]===6||u[0]===2)){n=0;continue}if(u[0]===3&&(!i||u[1]>i[0]&&u[1]<i[3])){n.label=u[1];break}if(u[0]===6&&n.label<i[1]){n.label=i[1],i=u;break}if(i&&n.label<i[2]){n.label=i[2],n.ops.push(u);break}i[2]&&n.ops.pop(),n.trys.pop();continue}u=e.call(t,n)}catch(c){u=[6,c],s=0}finally{r=i=0}if(u[0]&5)throw u[1];return{value:u[0]?u[1]:void 0,done:!0}}},Do=B&&B.__spreadArray||function(t,e){for(var n=0,r=e.length,s=t.length;n<r;n++,s++)t[s]=e[n];return t};Object.defineProperty(Et,"__esModule",{value:!0});Et.createStore=void 0;function $o(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(t){var e=Math.random()*16|0,n=t=="x"?e:e&3|8;return n.toString(16)})}var es=function(){function t(){this.debug=!1,this.debugger=function(e,n){console.log(e,n.slice(-5))},this._states=[],this._observers={},this._hasStateInit=!1}return Object.defineProperty(t.prototype,"state",{get:function(){return Me({},this._states[this._states.length-1])},set:function(e){if(!this._hasStateInit){this._states.push(Object.freeze(e)),this._hasStateInit=!0;return}this.set(e)},enumerable:!1,configurable:!0}),t.prototype.runObserver=function(e){this._observers[e](this._states[this._states.length-1])},t.prototype.set=function(e){return rr(this,void 0,void 0,function(){var n=this;return sr(this,function(r){return this._hasStateInit||(this._hasStateInit=!0),[2,new Promise(function(s,i){return rr(n,void 0,void 0,function(){var o,l,d,u=this;return sr(this,function(c){switch(c.label){case 0:return this.beforeStateChange(),o=e,l=this._states[this._states.length-1],typeof o=="function"&&(o=o(l)),typeof o!="object"&&i(new TypeError("nextState is not object.")),o=Object.freeze(Me(Me({},l),o)),this._states.push(o),this.debug&&this.debugger?(d=Object.getPrototypeOf(this).constructor.name,this.debugger(d||"anonymous",Do([],this._states))):this._states.shift(),[4,Promise.all(Object.keys(this._observers).map(function(h){return new Promise(function(y){try{u.runObserver(h)}catch{u.unsubscribe(h)}y(!0)})}))];case 1:return c.sent(),this.afterStateChange(),s(o),[2]}})})})]})})},t.prototype.beforeStateChange=function(){},t.prototype.afterStateChange=function(){},t.prototype.subscribe=function(e,n){n!=null&&n.initialize&&e(this.state);var r=$o();return this._observers[r]=e,r},t.prototype.unsubscribe=function(e){delete this._observers[e]},t.prototype.syncValue=function(e,n){var r=this;return function(){var s=r.subscribe(function(i){n(i[e])});return function(){r.unsubscribe(s)}}},t.prototype.syncState=function(e){var n=this;return function(){var r=n.subscribe(function(s){e(s)});return function(){n.unsubscribe(r)}}},t}(),pe=Et.default=es;function qo(t){var e=new es;return e.state=t,e}Et.createStore=qo;class Uo extends pe{constructor(){super(),this.state={title:"",isOpen:!1,content:null}}open({title:e,content:n}){this.set({title:e||"",isOpen:!0,content:n})}close(){this.set({title:"",isOpen:!1,content:null})}}const M=new Uo,Qt=t=>`${Math.floor(t/60)}:${("0"+Math.floor(t%60)).slice(-2)}`,ir=t=>Math.floor(t*1e3),Fo=t=>t/1e3,ie=Object.create(null);ie.open="0";ie.close="1";ie.ping="2";ie.pong="3";ie.message="4";ie.upgrade="5";ie.noop="6";const it=Object.create(null);Object.keys(ie).forEach(t=>{it[ie[t]]=t});const Zt={type:"error",data:"parser error"},ts=typeof Blob=="function"||typeof Blob<"u"&&Object.prototype.toString.call(Blob)==="[object BlobConstructor]",ns=typeof ArrayBuffer=="function",rs=t=>typeof ArrayBuffer.isView=="function"?ArrayBuffer.isView(t):t&&t.buffer instanceof ArrayBuffer,An=({type:t,data:e},n,r)=>ts&&e instanceof Blob?n?r(e):or(e,r):ns&&(e instanceof ArrayBuffer||rs(e))?n?r(e):or(new Blob([e]),r):r(ie[t]+(e||"")),or=(t,e)=>{const n=new FileReader;return n.onload=function(){const r=n.result.split(",")[1];e("b"+(r||""))},n.readAsDataURL(t)};function ar(t){return t instanceof Uint8Array?t:t instanceof ArrayBuffer?new Uint8Array(t):new Uint8Array(t.buffer,t.byteOffset,t.byteLength)}let Tt;function zo(t,e){if(ts&&t.data instanceof Blob)return t.data.arrayBuffer().then(ar).then(e);if(ns&&(t.data instanceof ArrayBuffer||rs(t.data)))return e(ar(t.data));An(t,!1,n=>{Tt||(Tt=new TextEncoder),e(Tt.encode(n))})}const cr="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",Le=typeof Uint8Array>"u"?[]:new Uint8Array(256);for(let t=0;t<cr.length;t++)Le[cr.charCodeAt(t)]=t;const Ho=t=>{let e=t.length*.75,n=t.length,r,s=0,i,o,l,d;t[t.length-1]==="="&&(e--,t[t.length-2]==="="&&e--);const u=new ArrayBuffer(e),c=new Uint8Array(u);for(r=0;r<n;r+=4)i=Le[t.charCodeAt(r)],o=Le[t.charCodeAt(r+1)],l=Le[t.charCodeAt(r+2)],d=Le[t.charCodeAt(r+3)],c[s++]=i<<2|o>>4,c[s++]=(o&15)<<4|l>>2,c[s++]=(l&3)<<6|d&63;return u},Wo=typeof ArrayBuffer=="function",On=(t,e)=>{if(typeof t!="string")return{type:"message",data:ss(t,e)};const n=t.charAt(0);return n==="b"?{type:"message",data:Vo(t.substring(1),e)}:it[n]?t.length>1?{type:it[n],data:t.substring(1)}:{type:it[n]}:Zt},Vo=(t,e)=>{if(Wo){const n=Ho(t);return ss(n,e)}else return{base64:!0,data:t}},ss=(t,e)=>{switch(e){case"blob":return t instanceof Blob?t:new Blob([t]);case"arraybuffer":default:return t instanceof ArrayBuffer?t:t.buffer}},is=String.fromCharCode(30),Ko=(t,e)=>{const n=t.length,r=new Array(n);let s=0;t.forEach((i,o)=>{An(i,!1,l=>{r[o]=l,++s===n&&e(r.join(is))})})},Jo=(t,e)=>{const n=t.split(is),r=[];for(let s=0;s<n.length;s++){const i=On(n[s],e);if(r.push(i),i.type==="error")break}return r};function Yo(){return new TransformStream({transform(t,e){zo(t,n=>{const r=n.length;let s;if(r<126)s=new Uint8Array(1),new DataView(s.buffer).setUint8(0,r);else if(r<65536){s=new Uint8Array(3);const i=new DataView(s.buffer);i.setUint8(0,126),i.setUint16(1,r)}else{s=new Uint8Array(9);const i=new DataView(s.buffer);i.setUint8(0,127),i.setBigUint64(1,BigInt(r))}t.data&&typeof t.data!="string"&&(s[0]|=128),e.enqueue(s),e.enqueue(n)})}})}let Lt;function Ge(t){return t.reduce((e,n)=>e+n.length,0)}function Qe(t,e){if(t[0].length===e)return t.shift();const n=new Uint8Array(e);let r=0;for(let s=0;s<e;s++)n[s]=t[0][r++],r===t[0].length&&(t.shift(),r=0);return t.length&&r<t[0].length&&(t[0]=t[0].slice(r)),n}function Xo(t,e){Lt||(Lt=new TextDecoder);const n=[];let r=0,s=-1,i=!1;return new TransformStream({transform(o,l){for(n.push(o);;){if(r===0){if(Ge(n)<1)break;const d=Qe(n,1);i=(d[0]&128)===128,s=d[0]&127,s<126?r=3:s===126?r=1:r=2}else if(r===1){if(Ge(n)<2)break;const d=Qe(n,2);s=new DataView(d.buffer,d.byteOffset,d.length).getUint16(0),r=3}else if(r===2){if(Ge(n)<8)break;const d=Qe(n,8),u=new DataView(d.buffer,d.byteOffset,d.length),c=u.getUint32(0);if(c>Math.pow(2,53-32)-1){l.enqueue(Zt);break}s=c*Math.pow(2,32)+u.getUint32(4),r=3}else{if(Ge(n)<s)break;const d=Qe(n,s);l.enqueue(On(i?d:Lt.decode(d),e)),r=0}if(s===0||s>t){l.enqueue(Zt);break}}}})}const os=4;function L(t){if(t)return Go(t)}function Go(t){for(var e in L.prototype)t[e]=L.prototype[e];return t}L.prototype.on=L.prototype.addEventListener=function(t,e){return this._callbacks=this._callbacks||{},(this._callbacks["$"+t]=this._callbacks["$"+t]||[]).push(e),this};L.prototype.once=function(t,e){function n(){this.off(t,n),e.apply(this,arguments)}return n.fn=e,this.on(t,n),this};L.prototype.off=L.prototype.removeListener=L.prototype.removeAllListeners=L.prototype.removeEventListener=function(t,e){if(this._callbacks=this._callbacks||{},arguments.length==0)return this._callbacks={},this;var n=this._callbacks["$"+t];if(!n)return this;if(arguments.length==1)return delete this._callbacks["$"+t],this;for(var r,s=0;s<n.length;s++)if(r=n[s],r===e||r.fn===e){n.splice(s,1);break}return n.length===0&&delete this._callbacks["$"+t],this};L.prototype.emit=function(t){this._callbacks=this._callbacks||{};for(var e=new Array(arguments.length-1),n=this._callbacks["$"+t],r=1;r<arguments.length;r++)e[r-1]=arguments[r];if(n){n=n.slice(0);for(var r=0,s=n.length;r<s;++r)n[r].apply(this,e)}return this};L.prototype.emitReserved=L.prototype.emit;L.prototype.listeners=function(t){return this._callbacks=this._callbacks||{},this._callbacks["$"+t]||[]};L.prototype.hasListeners=function(t){return!!this.listeners(t).length};const Y=(()=>typeof self<"u"?self:typeof window<"u"?window:Function("return this")())();function as(t,...e){return e.reduce((n,r)=>(t.hasOwnProperty(r)&&(n[r]=t[r]),n),{})}const Qo=Y.setTimeout,Zo=Y.clearTimeout;function St(t,e){e.useNativeTimers?(t.setTimeoutFn=Qo.bind(Y),t.clearTimeoutFn=Zo.bind(Y)):(t.setTimeoutFn=Y.setTimeout.bind(Y),t.clearTimeoutFn=Y.clearTimeout.bind(Y))}const ea=1.33;function ta(t){return typeof t=="string"?na(t):Math.ceil((t.byteLength||t.size)*ea)}function na(t){let e=0,n=0;for(let r=0,s=t.length;r<s;r++)e=t.charCodeAt(r),e<128?n+=1:e<2048?n+=2:e<55296||e>=57344?n+=3:(r++,n+=4);return n}function ra(t){let e="";for(let n in t)t.hasOwnProperty(n)&&(e.length&&(e+="&"),e+=encodeURIComponent(n)+"="+encodeURIComponent(t[n]));return e}function sa(t){let e={},n=t.split("&");for(let r=0,s=n.length;r<s;r++){let i=n[r].split("=");e[decodeURIComponent(i[0])]=decodeURIComponent(i[1])}return e}class ia extends Error{constructor(e,n,r){super(e),this.description=n,this.context=r,this.type="TransportError"}}class Rn extends L{constructor(e){super(),this.writable=!1,St(this,e),this.opts=e,this.query=e.query,this.socket=e.socket}onError(e,n,r){return super.emitReserved("error",new ia(e,n,r)),this}open(){return this.readyState="opening",this.doOpen(),this}close(){return(this.readyState==="opening"||this.readyState==="open")&&(this.doClose(),this.onClose()),this}send(e){this.readyState==="open"&&this.write(e)}onOpen(){this.readyState="open",this.writable=!0,super.emitReserved("open")}onData(e){const n=On(e,this.socket.binaryType);this.onPacket(n)}onPacket(e){super.emitReserved("packet",e)}onClose(e){this.readyState="closed",super.emitReserved("close",e)}pause(e){}createUri(e,n={}){return e+"://"+this._hostname()+this._port()+this.opts.path+this._query(n)}_hostname(){const e=this.opts.hostname;return e.indexOf(":")===-1?e:"["+e+"]"}_port(){return this.opts.port&&(this.opts.secure&&+(this.opts.port!==443)||!this.opts.secure&&Number(this.opts.port)!==80)?":"+this.opts.port:""}_query(e){const n=ra(e);return n.length?"?"+n:""}}const cs="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_".split(""),en=64,oa={};let lr=0,Ze=0,dr;function ur(t){let e="";do e=cs[t%en]+e,t=Math.floor(t/en);while(t>0);return e}function ls(){const t=ur(+new Date);return t!==dr?(lr=0,dr=t):t+"."+ur(lr++)}for(;Ze<en;Ze++)oa[cs[Ze]]=Ze;let ds=!1;try{ds=typeof XMLHttpRequest<"u"&&"withCredentials"in new XMLHttpRequest}catch{}const aa=ds;function us(t){const e=t.xdomain;try{if(typeof XMLHttpRequest<"u"&&(!e||aa))return new XMLHttpRequest}catch{}if(!e)try{return new Y[["Active"].concat("Object").join("X")]("Microsoft.XMLHTTP")}catch{}}function ca(){}const la=function(){return new us({xdomain:!1}).responseType!=null}();class da extends Rn{constructor(e){if(super(e),this.polling=!1,typeof location<"u"){const r=location.protocol==="https:";let s=location.port;s||(s=r?"443":"80"),this.xd=typeof location<"u"&&e.hostname!==location.hostname||s!==e.port}const n=e&&e.forceBase64;this.supportsBinary=la&&!n,this.opts.withCredentials&&(this.cookieJar=void 0)}get name(){return"polling"}doOpen(){this.poll()}pause(e){this.readyState="pausing";const n=()=>{this.readyState="paused",e()};if(this.polling||!this.writable){let r=0;this.polling&&(r++,this.once("pollComplete",function(){--r||n()})),this.writable||(r++,this.once("drain",function(){--r||n()}))}else n()}poll(){this.polling=!0,this.doPoll(),this.emitReserved("poll")}onData(e){const n=r=>{if(this.readyState==="opening"&&r.type==="open"&&this.onOpen(),r.type==="close")return this.onClose({description:"transport closed by the server"}),!1;this.onPacket(r)};Jo(e,this.socket.binaryType).forEach(n),this.readyState!=="closed"&&(this.polling=!1,this.emitReserved("pollComplete"),this.readyState==="open"&&this.poll())}doClose(){const e=()=>{this.write([{type:"close"}])};this.readyState==="open"?e():this.once("open",e)}write(e){this.writable=!1,Ko(e,n=>{this.doWrite(n,()=>{this.writable=!0,this.emitReserved("drain")})})}uri(){const e=this.opts.secure?"https":"http",n=this.query||{};return this.opts.timestampRequests!==!1&&(n[this.opts.timestampParam]=ls()),!this.supportsBinary&&!n.sid&&(n.b64=1),this.createUri(e,n)}request(e={}){return Object.assign(e,{xd:this.xd,cookieJar:this.cookieJar},this.opts),new se(this.uri(),e)}doWrite(e,n){const r=this.request({method:"POST",data:e});r.on("success",n),r.on("error",(s,i)=>{this.onError("xhr post error",s,i)})}doPoll(){const e=this.request();e.on("data",this.onData.bind(this)),e.on("error",(n,r)=>{this.onError("xhr poll error",n,r)}),this.pollXhr=e}}class se extends L{constructor(e,n){super(),St(this,n),this.opts=n,this.method=n.method||"GET",this.uri=e,this.data=n.data!==void 0?n.data:null,this.create()}create(){var e;const n=as(this.opts,"agent","pfx","key","passphrase","cert","ca","ciphers","rejectUnauthorized","autoUnref");n.xdomain=!!this.opts.xd;const r=this.xhr=new us(n);try{r.open(this.method,this.uri,!0);try{if(this.opts.extraHeaders){r.setDisableHeaderCheck&&r.setDisableHeaderCheck(!0);for(let s in this.opts.extraHeaders)this.opts.extraHeaders.hasOwnProperty(s)&&r.setRequestHeader(s,this.opts.extraHeaders[s])}}catch{}if(this.method==="POST")try{r.setRequestHeader("Content-type","text/plain;charset=UTF-8")}catch{}try{r.setRequestHeader("Accept","*/*")}catch{}(e=this.opts.cookieJar)===null||e===void 0||e.addCookies(r),"withCredentials"in r&&(r.withCredentials=this.opts.withCredentials),this.opts.requestTimeout&&(r.timeout=this.opts.requestTimeout),r.onreadystatechange=()=>{var s;r.readyState===3&&((s=this.opts.cookieJar)===null||s===void 0||s.parseCookies(r)),r.readyState===4&&(r.status===200||r.status===1223?this.onLoad():this.setTimeoutFn(()=>{this.onError(typeof r.status=="number"?r.status:0)},0))},r.send(this.data)}catch(s){this.setTimeoutFn(()=>{this.onError(s)},0);return}typeof document<"u"&&(this.index=se.requestsCount++,se.requests[this.index]=this)}onError(e){this.emitReserved("error",e,this.xhr),this.cleanup(!0)}cleanup(e){if(!(typeof this.xhr>"u"||this.xhr===null)){if(this.xhr.onreadystatechange=ca,e)try{this.xhr.abort()}catch{}typeof document<"u"&&delete se.requests[this.index],this.xhr=null}}onLoad(){const e=this.xhr.responseText;e!==null&&(this.emitReserved("data",e),this.emitReserved("success"),this.cleanup())}abort(){this.cleanup()}}se.requestsCount=0;se.requests={};if(typeof document<"u"){if(typeof attachEvent=="function")attachEvent("onunload",hr);else if(typeof addEventListener=="function"){const t="onpagehide"in Y?"pagehide":"unload";addEventListener(t,hr,!1)}}function hr(){for(let t in se.requests)se.requests.hasOwnProperty(t)&&se.requests[t].abort()}const Nn=(()=>typeof Promise=="function"&&typeof Promise.resolve=="function"?e=>Promise.resolve().then(e):(e,n)=>n(e,0))(),et=Y.WebSocket||Y.MozWebSocket,fr=!0,ua="arraybuffer",pr=typeof navigator<"u"&&typeof navigator.product=="string"&&navigator.product.toLowerCase()==="reactnative";class ha extends Rn{constructor(e){super(e),this.supportsBinary=!e.forceBase64}get name(){return"websocket"}doOpen(){if(!this.check())return;const e=this.uri(),n=this.opts.protocols,r=pr?{}:as(this.opts,"agent","perMessageDeflate","pfx","key","passphrase","cert","ca","ciphers","rejectUnauthorized","localAddress","protocolVersion","origin","maxPayload","family","checkServerIdentity");this.opts.extraHeaders&&(r.headers=this.opts.extraHeaders);try{this.ws=fr&&!pr?n?new et(e,n):new et(e):new et(e,n,r)}catch(s){return this.emitReserved("error",s)}this.ws.binaryType=this.socket.binaryType,this.addEventListeners()}addEventListeners(){this.ws.onopen=()=>{this.opts.autoUnref&&this.ws._socket.unref(),this.onOpen()},this.ws.onclose=e=>this.onClose({description:"websocket connection closed",context:e}),this.ws.onmessage=e=>this.onData(e.data),this.ws.onerror=e=>this.onError("websocket error",e)}write(e){this.writable=!1;for(let n=0;n<e.length;n++){const r=e[n],s=n===e.length-1;An(r,this.supportsBinary,i=>{const o={};try{fr&&this.ws.send(i)}catch{}s&&Nn(()=>{this.writable=!0,this.emitReserved("drain")},this.setTimeoutFn)})}}doClose(){typeof this.ws<"u"&&(this.ws.close(),this.ws=null)}uri(){const e=this.opts.secure?"wss":"ws",n=this.query||{};return this.opts.timestampRequests&&(n[this.opts.timestampParam]=ls()),this.supportsBinary||(n.b64=1),this.createUri(e,n)}check(){return!!et}}class fa extends Rn{get name(){return"webtransport"}doOpen(){typeof WebTransport=="function"&&(this.transport=new WebTransport(this.createUri("https"),this.opts.transportOptions[this.name]),this.transport.closed.then(()=>{this.onClose()}).catch(e=>{this.onError("webtransport error",e)}),this.transport.ready.then(()=>{this.transport.createBidirectionalStream().then(e=>{const n=Xo(Number.MAX_SAFE_INTEGER,this.socket.binaryType),r=e.readable.pipeThrough(n).getReader(),s=Yo();s.readable.pipeTo(e.writable),this.writer=s.writable.getWriter();const i=()=>{r.read().then(({done:l,value:d})=>{l||(this.onPacket(d),i())}).catch(l=>{})};i();const o={type:"open"};this.query.sid&&(o.data=`{"sid":"${this.query.sid}"}`),this.writer.write(o).then(()=>this.onOpen())})}))}write(e){this.writable=!1;for(let n=0;n<e.length;n++){const r=e[n],s=n===e.length-1;this.writer.write(r).then(()=>{s&&Nn(()=>{this.writable=!0,this.emitReserved("drain")},this.setTimeoutFn)})}}doClose(){var e;(e=this.transport)===null||e===void 0||e.close()}}const pa={websocket:ha,webtransport:fa,polling:da},ma=/^(?:(?![^:@\/?#]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@\/?#]*)(?::([^:@\/?#]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,ga=["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"];function tn(t){const e=t,n=t.indexOf("["),r=t.indexOf("]");n!=-1&&r!=-1&&(t=t.substring(0,n)+t.substring(n,r).replace(/:/g,";")+t.substring(r,t.length));let s=ma.exec(t||""),i={},o=14;for(;o--;)i[ga[o]]=s[o]||"";return n!=-1&&r!=-1&&(i.source=e,i.host=i.host.substring(1,i.host.length-1).replace(/;/g,":"),i.authority=i.authority.replace("[","").replace("]","").replace(/;/g,":"),i.ipv6uri=!0),i.pathNames=ya(i,i.path),i.queryKey=ba(i,i.query),i}function ya(t,e){const n=/\/{2,9}/g,r=e.replace(n,"/").split("/");return(e.slice(0,1)=="/"||e.length===0)&&r.splice(0,1),e.slice(-1)=="/"&&r.splice(r.length-1,1),r}function ba(t,e){const n={};return e.replace(/(?:^|&)([^&=]*)=?([^&]*)/g,function(r,s,i){s&&(n[s]=i)}),n}let hs=class xe extends L{constructor(e,n={}){super(),this.binaryType=ua,this.writeBuffer=[],e&&typeof e=="object"&&(n=e,e=null),e?(e=tn(e),n.hostname=e.host,n.secure=e.protocol==="https"||e.protocol==="wss",n.port=e.port,e.query&&(n.query=e.query)):n.host&&(n.hostname=tn(n.host).host),St(this,n),this.secure=n.secure!=null?n.secure:typeof location<"u"&&location.protocol==="https:",n.hostname&&!n.port&&(n.port=this.secure?"443":"80"),this.hostname=n.hostname||(typeof location<"u"?location.hostname:"localhost"),this.port=n.port||(typeof location<"u"&&location.port?location.port:this.secure?"443":"80"),this.transports=n.transports||["polling","websocket","webtransport"],this.writeBuffer=[],this.prevBufferLen=0,this.opts=Object.assign({path:"/engine.io",agent:!1,withCredentials:!1,upgrade:!0,timestampParam:"t",rememberUpgrade:!1,addTrailingSlash:!0,rejectUnauthorized:!0,perMessageDeflate:{threshold:1024},transportOptions:{},closeOnBeforeunload:!1},n),this.opts.path=this.opts.path.replace(/\/$/,"")+(this.opts.addTrailingSlash?"/":""),typeof this.opts.query=="string"&&(this.opts.query=sa(this.opts.query)),this.id=null,this.upgrades=null,this.pingInterval=null,this.pingTimeout=null,this.pingTimeoutTimer=null,typeof addEventListener=="function"&&(this.opts.closeOnBeforeunload&&(this.beforeunloadEventListener=()=>{this.transport&&(this.transport.removeAllListeners(),this.transport.close())},addEventListener("beforeunload",this.beforeunloadEventListener,!1)),this.hostname!=="localhost"&&(this.offlineEventListener=()=>{this.onClose("transport close",{description:"network connection lost"})},addEventListener("offline",this.offlineEventListener,!1))),this.open()}createTransport(e){const n=Object.assign({},this.opts.query);n.EIO=os,n.transport=e,this.id&&(n.sid=this.id);const r=Object.assign({},this.opts,{query:n,socket:this,hostname:this.hostname,secure:this.secure,port:this.port},this.opts.transportOptions[e]);return new pa[e](r)}open(){let e;if(this.opts.rememberUpgrade&&xe.priorWebsocketSuccess&&this.transports.indexOf("websocket")!==-1)e="websocket";else if(this.transports.length===0){this.setTimeoutFn(()=>{this.emitReserved("error","No transports available")},0);return}else e=this.transports[0];this.readyState="opening";try{e=this.createTransport(e)}catch{this.transports.shift(),this.open();return}e.open(),this.setTransport(e)}setTransport(e){this.transport&&this.transport.removeAllListeners(),this.transport=e,e.on("drain",this.onDrain.bind(this)).on("packet",this.onPacket.bind(this)).on("error",this.onError.bind(this)).on("close",n=>this.onClose("transport close",n))}probe(e){let n=this.createTransport(e),r=!1;xe.priorWebsocketSuccess=!1;const s=()=>{r||(n.send([{type:"ping",data:"probe"}]),n.once("packet",h=>{if(!r)if(h.type==="pong"&&h.data==="probe"){if(this.upgrading=!0,this.emitReserved("upgrading",n),!n)return;xe.priorWebsocketSuccess=n.name==="websocket",this.transport.pause(()=>{r||this.readyState!=="closed"&&(c(),this.setTransport(n),n.send([{type:"upgrade"}]),this.emitReserved("upgrade",n),n=null,this.upgrading=!1,this.flush())})}else{const y=new Error("probe error");y.transport=n.name,this.emitReserved("upgradeError",y)}}))};function i(){r||(r=!0,c(),n.close(),n=null)}const o=h=>{const y=new Error("probe error: "+h);y.transport=n.name,i(),this.emitReserved("upgradeError",y)};function l(){o("transport closed")}function d(){o("socket closed")}function u(h){n&&h.name!==n.name&&i()}const c=()=>{n.removeListener("open",s),n.removeListener("error",o),n.removeListener("close",l),this.off("close",d),this.off("upgrading",u)};n.once("open",s),n.once("error",o),n.once("close",l),this.once("close",d),this.once("upgrading",u),this.upgrades.indexOf("webtransport")!==-1&&e!=="webtransport"?this.setTimeoutFn(()=>{r||n.open()},200):n.open()}onOpen(){if(this.readyState="open",xe.priorWebsocketSuccess=this.transport.name==="websocket",this.emitReserved("open"),this.flush(),this.readyState==="open"&&this.opts.upgrade){let e=0;const n=this.upgrades.length;for(;e<n;e++)this.probe(this.upgrades[e])}}onPacket(e){if(this.readyState==="opening"||this.readyState==="open"||this.readyState==="closing")switch(this.emitReserved("packet",e),this.emitReserved("heartbeat"),this.resetPingTimeout(),e.type){case"open":this.onHandshake(JSON.parse(e.data));break;case"ping":this.sendPacket("pong"),this.emitReserved("ping"),this.emitReserved("pong");break;case"error":const n=new Error("server error");n.code=e.data,this.onError(n);break;case"message":this.emitReserved("data",e.data),this.emitReserved("message",e.data);break}}onHandshake(e){this.emitReserved("handshake",e),this.id=e.sid,this.transport.query.sid=e.sid,this.upgrades=this.filterUpgrades(e.upgrades),this.pingInterval=e.pingInterval,this.pingTimeout=e.pingTimeout,this.maxPayload=e.maxPayload,this.onOpen(),this.readyState!=="closed"&&this.resetPingTimeout()}resetPingTimeout(){this.clearTimeoutFn(this.pingTimeoutTimer),this.pingTimeoutTimer=this.setTimeoutFn(()=>{this.onClose("ping timeout")},this.pingInterval+this.pingTimeout),this.opts.autoUnref&&this.pingTimeoutTimer.unref()}onDrain(){this.writeBuffer.splice(0,this.prevBufferLen),this.prevBufferLen=0,this.writeBuffer.length===0?this.emitReserved("drain"):this.flush()}flush(){if(this.readyState!=="closed"&&this.transport.writable&&!this.upgrading&&this.writeBuffer.length){const e=this.getWritablePackets();this.transport.send(e),this.prevBufferLen=e.length,this.emitReserved("flush")}}getWritablePackets(){if(!(this.maxPayload&&this.transport.name==="polling"&&this.writeBuffer.length>1))return this.writeBuffer;let n=1;for(let r=0;r<this.writeBuffer.length;r++){const s=this.writeBuffer[r].data;if(s&&(n+=ta(s)),r>0&&n>this.maxPayload)return this.writeBuffer.slice(0,r);n+=2}return this.writeBuffer}write(e,n,r){return this.sendPacket("message",e,n,r),this}send(e,n,r){return this.sendPacket("message",e,n,r),this}sendPacket(e,n,r,s){if(typeof n=="function"&&(s=n,n=void 0),typeof r=="function"&&(s=r,r=null),this.readyState==="closing"||this.readyState==="closed")return;r=r||{},r.compress=r.compress!==!1;const i={type:e,data:n,options:r};this.emitReserved("packetCreate",i),this.writeBuffer.push(i),s&&this.once("flush",s),this.flush()}close(){const e=()=>{this.onClose("forced close"),this.transport.close()},n=()=>{this.off("upgrade",n),this.off("upgradeError",n),e()},r=()=>{this.once("upgrade",n),this.once("upgradeError",n)};return(this.readyState==="opening"||this.readyState==="open")&&(this.readyState="closing",this.writeBuffer.length?this.once("drain",()=>{this.upgrading?r():e()}):this.upgrading?r():e()),this}onError(e){xe.priorWebsocketSuccess=!1,this.emitReserved("error",e),this.onClose("transport error",e)}onClose(e,n){(this.readyState==="opening"||this.readyState==="open"||this.readyState==="closing")&&(this.clearTimeoutFn(this.pingTimeoutTimer),this.transport.removeAllListeners("close"),this.transport.close(),this.transport.removeAllListeners(),typeof removeEventListener=="function"&&(removeEventListener("beforeunload",this.beforeunloadEventListener,!1),removeEventListener("offline",this.offlineEventListener,!1)),this.readyState="closed",this.id=null,this.emitReserved("close",e,n),this.writeBuffer=[],this.prevBufferLen=0)}filterUpgrades(e){const n=[];let r=0;const s=e.length;for(;r<s;r++)~this.transports.indexOf(e[r])&&n.push(e[r]);return n}};hs.protocol=os;function xa(t,e="",n){let r=t;n=n||typeof location<"u"&&location,t==null&&(t=n.protocol+"//"+n.host),typeof t=="string"&&(t.charAt(0)==="/"&&(t.charAt(1)==="/"?t=n.protocol+t:t=n.host+t),/^(https?|wss?):\/\//.test(t)||(typeof n<"u"?t=n.protocol+"//"+t:t="https://"+t),r=tn(t)),r.port||(/^(http|ws)$/.test(r.protocol)?r.port="80":/^(http|ws)s$/.test(r.protocol)&&(r.port="443")),r.path=r.path||"/";const i=r.host.indexOf(":")!==-1?"["+r.host+"]":r.host;return r.id=r.protocol+"://"+i+":"+r.port+e,r.href=r.protocol+"://"+i+(n&&n.port===r.port?"":":"+r.port),r}const wa=typeof ArrayBuffer=="function",va=t=>typeof ArrayBuffer.isView=="function"?ArrayBuffer.isView(t):t.buffer instanceof ArrayBuffer,fs=Object.prototype.toString,ka=typeof Blob=="function"||typeof Blob<"u"&&fs.call(Blob)==="[object BlobConstructor]",Ca=typeof File=="function"||typeof File<"u"&&fs.call(File)==="[object FileConstructor]";function Tn(t){return wa&&(t instanceof ArrayBuffer||va(t))||ka&&t instanceof Blob||Ca&&t instanceof File}function ot(t,e){if(!t||typeof t!="object")return!1;if(Array.isArray(t)){for(let n=0,r=t.length;n<r;n++)if(ot(t[n]))return!0;return!1}if(Tn(t))return!0;if(t.toJSON&&typeof t.toJSON=="function"&&arguments.length===1)return ot(t.toJSON(),!0);for(const n in t)if(Object.prototype.hasOwnProperty.call(t,n)&&ot(t[n]))return!0;return!1}function Ea(t){const e=[],n=t.data,r=t;return r.data=nn(n,e),r.attachments=e.length,{packet:r,buffers:e}}function nn(t,e){if(!t)return t;if(Tn(t)){const n={_placeholder:!0,num:e.length};return e.push(t),n}else if(Array.isArray(t)){const n=new Array(t.length);for(let r=0;r<t.length;r++)n[r]=nn(t[r],e);return n}else if(typeof t=="object"&&!(t instanceof Date)){const n={};for(const r in t)Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=nn(t[r],e));return n}return t}function Sa(t,e){return t.data=rn(t.data,e),delete t.attachments,t}function rn(t,e){if(!t)return t;if(t&&t._placeholder===!0){if(typeof t.num=="number"&&t.num>=0&&t.num<e.length)return e[t.num];throw new Error("illegal attachments")}else if(Array.isArray(t))for(let n=0;n<t.length;n++)t[n]=rn(t[n],e);else if(typeof t=="object")for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&(t[n]=rn(t[n],e));return t}const _a=["connect","connect_error","disconnect","disconnecting","newListener","removeListener"],ja=5;var C;(function(t){t[t.CONNECT=0]="CONNECT",t[t.DISCONNECT=1]="DISCONNECT",t[t.EVENT=2]="EVENT",t[t.ACK=3]="ACK",t[t.CONNECT_ERROR=4]="CONNECT_ERROR",t[t.BINARY_EVENT=5]="BINARY_EVENT",t[t.BINARY_ACK=6]="BINARY_ACK"})(C||(C={}));class Aa{constructor(e){this.replacer=e}encode(e){return(e.type===C.EVENT||e.type===C.ACK)&&ot(e)?this.encodeAsBinary({type:e.type===C.EVENT?C.BINARY_EVENT:C.BINARY_ACK,nsp:e.nsp,data:e.data,id:e.id}):[this.encodeAsString(e)]}encodeAsString(e){let n=""+e.type;return(e.type===C.BINARY_EVENT||e.type===C.BINARY_ACK)&&(n+=e.attachments+"-"),e.nsp&&e.nsp!=="/"&&(n+=e.nsp+","),e.id!=null&&(n+=e.id),e.data!=null&&(n+=JSON.stringify(e.data,this.replacer)),n}encodeAsBinary(e){const n=Ea(e),r=this.encodeAsString(n.packet),s=n.buffers;return s.unshift(r),s}}function mr(t){return Object.prototype.toString.call(t)==="[object Object]"}class Ln extends L{constructor(e){super(),this.reviver=e}add(e){let n;if(typeof e=="string"){if(this.reconstructor)throw new Error("got plaintext data when reconstructing a packet");n=this.decodeString(e);const r=n.type===C.BINARY_EVENT;r||n.type===C.BINARY_ACK?(n.type=r?C.EVENT:C.ACK,this.reconstructor=new Oa(n),n.attachments===0&&super.emitReserved("decoded",n)):super.emitReserved("decoded",n)}else if(Tn(e)||e.base64)if(this.reconstructor)n=this.reconstructor.takeBinaryData(e),n&&(this.reconstructor=null,super.emitReserved("decoded",n));else throw new Error("got binary data when not reconstructing a packet");else throw new Error("Unknown type: "+e)}decodeString(e){let n=0;const r={type:Number(e.charAt(0))};if(C[r.type]===void 0)throw new Error("unknown packet type "+r.type);if(r.type===C.BINARY_EVENT||r.type===C.BINARY_ACK){const i=n+1;for(;e.charAt(++n)!=="-"&&n!=e.length;);const o=e.substring(i,n);if(o!=Number(o)||e.charAt(n)!=="-")throw new Error("Illegal attachments");r.attachments=Number(o)}if(e.charAt(n+1)==="/"){const i=n+1;for(;++n&&!(e.charAt(n)===","||n===e.length););r.nsp=e.substring(i,n)}else r.nsp="/";const s=e.charAt(n+1);if(s!==""&&Number(s)==s){const i=n+1;for(;++n;){const o=e.charAt(n);if(o==null||Number(o)!=o){--n;break}if(n===e.length)break}r.id=Number(e.substring(i,n+1))}if(e.charAt(++n)){const i=this.tryParse(e.substr(n));if(Ln.isPayloadValid(r.type,i))r.data=i;else throw new Error("invalid payload")}return r}tryParse(e){try{return JSON.parse(e,this.reviver)}catch{return!1}}static isPayloadValid(e,n){switch(e){case C.CONNECT:return mr(n);case C.DISCONNECT:return n===void 0;case C.CONNECT_ERROR:return typeof n=="string"||mr(n);case C.EVENT:case C.BINARY_EVENT:return Array.isArray(n)&&(typeof n[0]=="number"||typeof n[0]=="string"&&_a.indexOf(n[0])===-1);case C.ACK:case C.BINARY_ACK:return Array.isArray(n)}}destroy(){this.reconstructor&&(this.reconstructor.finishedReconstruction(),this.reconstructor=null)}}class Oa{constructor(e){this.packet=e,this.buffers=[],this.reconPack=e}takeBinaryData(e){if(this.buffers.push(e),this.buffers.length===this.reconPack.attachments){const n=Sa(this.reconPack,this.buffers);return this.finishedReconstruction(),n}return null}finishedReconstruction(){this.reconPack=null,this.buffers=[]}}const Ra=Object.freeze(Object.defineProperty({__proto__:null,Decoder:Ln,Encoder:Aa,get PacketType(){return C},protocol:ja},Symbol.toStringTag,{value:"Module"}));function Q(t,e,n){return t.on(e,n),function(){t.off(e,n)}}const Na=Object.freeze({connect:1,connect_error:1,disconnect:1,disconnecting:1,newListener:1,removeListener:1});class ps extends L{constructor(e,n,r){super(),this.connected=!1,this.recovered=!1,this.receiveBuffer=[],this.sendBuffer=[],this._queue=[],this._queueSeq=0,this.ids=0,this.acks={},this.flags={},this.io=e,this.nsp=n,r&&r.auth&&(this.auth=r.auth),this._opts=Object.assign({},r),this.io._autoConnect&&this.open()}get disconnected(){return!this.connected}subEvents(){if(this.subs)return;const e=this.io;this.subs=[Q(e,"open",this.onopen.bind(this)),Q(e,"packet",this.onpacket.bind(this)),Q(e,"error",this.onerror.bind(this)),Q(e,"close",this.onclose.bind(this))]}get active(){return!!this.subs}connect(){return this.connected?this:(this.subEvents(),this.io._reconnecting||this.io.open(),this.io._readyState==="open"&&this.onopen(),this)}open(){return this.connect()}send(...e){return e.unshift("message"),this.emit.apply(this,e),this}emit(e,...n){if(Na.hasOwnProperty(e))throw new Error('"'+e.toString()+'" is a reserved event name');if(n.unshift(e),this._opts.retries&&!this.flags.fromQueue&&!this.flags.volatile)return this._addToQueue(n),this;const r={type:C.EVENT,data:n};if(r.options={},r.options.compress=this.flags.compress!==!1,typeof n[n.length-1]=="function"){const o=this.ids++,l=n.pop();this._registerAckCallback(o,l),r.id=o}const s=this.io.engine&&this.io.engine.transport&&this.io.engine.transport.writable;return this.flags.volatile&&(!s||!this.connected)||(this.connected?(this.notifyOutgoingListeners(r),this.packet(r)):this.sendBuffer.push(r)),this.flags={},this}_registerAckCallback(e,n){var r;const s=(r=this.flags.timeout)!==null&&r!==void 0?r:this._opts.ackTimeout;if(s===void 0){this.acks[e]=n;return}const i=this.io.setTimeoutFn(()=>{delete this.acks[e];for(let o=0;o<this.sendBuffer.length;o++)this.sendBuffer[o].id===e&&this.sendBuffer.splice(o,1);n.call(this,new Error("operation has timed out"))},s);this.acks[e]=(...o)=>{this.io.clearTimeoutFn(i),n.apply(this,[null,...o])}}emitWithAck(e,...n){const r=this.flags.timeout!==void 0||this._opts.ackTimeout!==void 0;return new Promise((s,i)=>{n.push((o,l)=>r?o?i(o):s(l):s(o)),this.emit(e,...n)})}_addToQueue(e){let n;typeof e[e.length-1]=="function"&&(n=e.pop());const r={id:this._queueSeq++,tryCount:0,pending:!1,args:e,flags:Object.assign({fromQueue:!0},this.flags)};e.push((s,...i)=>r!==this._queue[0]?void 0:(s!==null?r.tryCount>this._opts.retries&&(this._queue.shift(),n&&n(s)):(this._queue.shift(),n&&n(null,...i)),r.pending=!1,this._drainQueue())),this._queue.push(r),this._drainQueue()}_drainQueue(e=!1){if(!this.connected||this._queue.length===0)return;const n=this._queue[0];n.pending&&!e||(n.pending=!0,n.tryCount++,this.flags=n.flags,this.emit.apply(this,n.args))}packet(e){e.nsp=this.nsp,this.io._packet(e)}onopen(){typeof this.auth=="function"?this.auth(e=>{this._sendConnectPacket(e)}):this._sendConnectPacket(this.auth)}_sendConnectPacket(e){this.packet({type:C.CONNECT,data:this._pid?Object.assign({pid:this._pid,offset:this._lastOffset},e):e})}onerror(e){this.connected||this.emitReserved("connect_error",e)}onclose(e,n){this.connected=!1,delete this.id,this.emitReserved("disconnect",e,n)}onpacket(e){if(e.nsp===this.nsp)switch(e.type){case C.CONNECT:e.data&&e.data.sid?this.onconnect(e.data.sid,e.data.pid):this.emitReserved("connect_error",new Error("It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)"));break;case C.EVENT:case C.BINARY_EVENT:this.onevent(e);break;case C.ACK:case C.BINARY_ACK:this.onack(e);break;case C.DISCONNECT:this.ondisconnect();break;case C.CONNECT_ERROR:this.destroy();const r=new Error(e.data.message);r.data=e.data.data,this.emitReserved("connect_error",r);break}}onevent(e){const n=e.data||[];e.id!=null&&n.push(this.ack(e.id)),this.connected?this.emitEvent(n):this.receiveBuffer.push(Object.freeze(n))}emitEvent(e){if(this._anyListeners&&this._anyListeners.length){const n=this._anyListeners.slice();for(const r of n)r.apply(this,e)}super.emit.apply(this,e),this._pid&&e.length&&typeof e[e.length-1]=="string"&&(this._lastOffset=e[e.length-1])}ack(e){const n=this;let r=!1;return function(...s){r||(r=!0,n.packet({type:C.ACK,id:e,data:s}))}}onack(e){const n=this.acks[e.id];typeof n=="function"&&(n.apply(this,e.data),delete this.acks[e.id])}onconnect(e,n){this.id=e,this.recovered=n&&this._pid===n,this._pid=n,this.connected=!0,this.emitBuffered(),this.emitReserved("connect"),this._drainQueue(!0)}emitBuffered(){this.receiveBuffer.forEach(e=>this.emitEvent(e)),this.receiveBuffer=[],this.sendBuffer.forEach(e=>{this.notifyOutgoingListeners(e),this.packet(e)}),this.sendBuffer=[]}ondisconnect(){this.destroy(),this.onclose("io server disconnect")}destroy(){this.subs&&(this.subs.forEach(e=>e()),this.subs=void 0),this.io._destroy(this)}disconnect(){return this.connected&&this.packet({type:C.DISCONNECT}),this.destroy(),this.connected&&this.onclose("io client disconnect"),this}close(){return this.disconnect()}compress(e){return this.flags.compress=e,this}get volatile(){return this.flags.volatile=!0,this}timeout(e){return this.flags.timeout=e,this}onAny(e){return this._anyListeners=this._anyListeners||[],this._anyListeners.push(e),this}prependAny(e){return this._anyListeners=this._anyListeners||[],this._anyListeners.unshift(e),this}offAny(e){if(!this._anyListeners)return this;if(e){const n=this._anyListeners;for(let r=0;r<n.length;r++)if(e===n[r])return n.splice(r,1),this}else this._anyListeners=[];return this}listenersAny(){return this._anyListeners||[]}onAnyOutgoing(e){return this._anyOutgoingListeners=this._anyOutgoingListeners||[],this._anyOutgoingListeners.push(e),this}prependAnyOutgoing(e){return this._anyOutgoingListeners=this._anyOutgoingListeners||[],this._anyOutgoingListeners.unshift(e),this}offAnyOutgoing(e){if(!this._anyOutgoingListeners)return this;if(e){const n=this._anyOutgoingListeners;for(let r=0;r<n.length;r++)if(e===n[r])return n.splice(r,1),this}else this._anyOutgoingListeners=[];return this}listenersAnyOutgoing(){return this._anyOutgoingListeners||[]}notifyOutgoingListeners(e){if(this._anyOutgoingListeners&&this._anyOutgoingListeners.length){const n=this._anyOutgoingListeners.slice();for(const r of n)r.apply(this,e.data)}}}function Se(t){t=t||{},this.ms=t.min||100,this.max=t.max||1e4,this.factor=t.factor||2,this.jitter=t.jitter>0&&t.jitter<=1?t.jitter:0,this.attempts=0}Se.prototype.duration=function(){var t=this.ms*Math.pow(this.factor,this.attempts++);if(this.jitter){var e=Math.random(),n=Math.floor(e*this.jitter*t);t=Math.floor(e*10)&1?t+n:t-n}return Math.min(t,this.max)|0};Se.prototype.reset=function(){this.attempts=0};Se.prototype.setMin=function(t){this.ms=t};Se.prototype.setMax=function(t){this.max=t};Se.prototype.setJitter=function(t){this.jitter=t};class sn extends L{constructor(e,n){var r;super(),this.nsps={},this.subs=[],e&&typeof e=="object"&&(n=e,e=void 0),n=n||{},n.path=n.path||"/socket.io",this.opts=n,St(this,n),this.reconnection(n.reconnection!==!1),this.reconnectionAttempts(n.reconnectionAttempts||1/0),this.reconnectionDelay(n.reconnectionDelay||1e3),this.reconnectionDelayMax(n.reconnectionDelayMax||5e3),this.randomizationFactor((r=n.randomizationFactor)!==null&&r!==void 0?r:.5),this.backoff=new Se({min:this.reconnectionDelay(),max:this.reconnectionDelayMax(),jitter:this.randomizationFactor()}),this.timeout(n.timeout==null?2e4:n.timeout),this._readyState="closed",this.uri=e;const s=n.parser||Ra;this.encoder=new s.Encoder,this.decoder=new s.Decoder,this._autoConnect=n.autoConnect!==!1,this._autoConnect&&this.open()}reconnection(e){return arguments.length?(this._reconnection=!!e,this):this._reconnection}reconnectionAttempts(e){return e===void 0?this._reconnectionAttempts:(this._reconnectionAttempts=e,this)}reconnectionDelay(e){var n;return e===void 0?this._reconnectionDelay:(this._reconnectionDelay=e,(n=this.backoff)===null||n===void 0||n.setMin(e),this)}randomizationFactor(e){var n;return e===void 0?this._randomizationFactor:(this._randomizationFactor=e,(n=this.backoff)===null||n===void 0||n.setJitter(e),this)}reconnectionDelayMax(e){var n;return e===void 0?this._reconnectionDelayMax:(this._reconnectionDelayMax=e,(n=this.backoff)===null||n===void 0||n.setMax(e),this)}timeout(e){return arguments.length?(this._timeout=e,this):this._timeout}maybeReconnectOnOpen(){!this._reconnecting&&this._reconnection&&this.backoff.attempts===0&&this.reconnect()}open(e){if(~this._readyState.indexOf("open"))return this;this.engine=new hs(this.uri,this.opts);const n=this.engine,r=this;this._readyState="opening",this.skipReconnect=!1;const s=Q(n,"open",function(){r.onopen(),e&&e()}),i=l=>{this.cleanup(),this._readyState="closed",this.emitReserved("error",l),e?e(l):this.maybeReconnectOnOpen()},o=Q(n,"error",i);if(this._timeout!==!1){const l=this._timeout,d=this.setTimeoutFn(()=>{s(),i(new Error("timeout")),n.close()},l);this.opts.autoUnref&&d.unref(),this.subs.push(()=>{this.clearTimeoutFn(d)})}return this.subs.push(s),this.subs.push(o),this}connect(e){return this.open(e)}onopen(){this.cleanup(),this._readyState="open",this.emitReserved("open");const e=this.engine;this.subs.push(Q(e,"ping",this.onping.bind(this)),Q(e,"data",this.ondata.bind(this)),Q(e,"error",this.onerror.bind(this)),Q(e,"close",this.onclose.bind(this)),Q(this.decoder,"decoded",this.ondecoded.bind(this)))}onping(){this.emitReserved("ping")}ondata(e){try{this.decoder.add(e)}catch(n){this.onclose("parse error",n)}}ondecoded(e){Nn(()=>{this.emitReserved("packet",e)},this.setTimeoutFn)}onerror(e){this.emitReserved("error",e)}socket(e,n){let r=this.nsps[e];return r?this._autoConnect&&!r.active&&r.connect():(r=new ps(this,e,n),this.nsps[e]=r),r}_destroy(e){const n=Object.keys(this.nsps);for(const r of n)if(this.nsps[r].active)return;this._close()}_packet(e){const n=this.encoder.encode(e);for(let r=0;r<n.length;r++)this.engine.write(n[r],e.options)}cleanup(){this.subs.forEach(e=>e()),this.subs.length=0,this.decoder.destroy()}_close(){this.skipReconnect=!0,this._reconnecting=!1,this.onclose("forced close"),this.engine&&this.engine.close()}disconnect(){return this._close()}onclose(e,n){this.cleanup(),this.backoff.reset(),this._readyState="closed",this.emitReserved("close",e,n),this._reconnection&&!this.skipReconnect&&this.reconnect()}reconnect(){if(this._reconnecting||this.skipReconnect)return this;const e=this;if(this.backoff.attempts>=this._reconnectionAttempts)this.backoff.reset(),this.emitReserved("reconnect_failed"),this._reconnecting=!1;else{const n=this.backoff.duration();this._reconnecting=!0;const r=this.setTimeoutFn(()=>{e.skipReconnect||(this.emitReserved("reconnect_attempt",e.backoff.attempts),!e.skipReconnect&&e.open(s=>{s?(e._reconnecting=!1,e.reconnect(),this.emitReserved("reconnect_error",s)):e.onreconnect()}))},n);this.opts.autoUnref&&r.unref(),this.subs.push(()=>{this.clearTimeoutFn(r)})}}onreconnect(){const e=this.backoff.attempts;this._reconnecting=!1,this.backoff.reset(),this.emitReserved("reconnect",e)}}const Oe={};function at(t,e){typeof t=="object"&&(e=t,t=void 0),e=e||{};const n=xa(t,e.path||"/socket.io"),r=n.source,s=n.id,i=n.path,o=Oe[s]&&i in Oe[s].nsps,l=e.forceNew||e["force new connection"]||e.multiplex===!1||o;let d;return l?d=new sn(r,e):(Oe[s]||(Oe[s]=new sn(r,e)),d=Oe[s]),n.query&&!e.query&&(e.query=n.queryKey),d.socket(n.path,e)}Object.assign(at,{Manager:sn,Socket:ps,io:at,connect:at});const w=at("/"),gr="get-connectors",Ta="remove-connector";class ms{constructor(){U(this,"handler");this.handler=null}connect(e){this.handler!==null&&this.disconnect(),this.handler=e,w.on(gr,this.handler.onConnectors)}static remove(e){w.emit(Ta,{id:e})}disconnect(){this.handler!==null&&(w.off(gr,this.handler.onConnectors),this.handler=null)}}const Pt="music-like",tt="music-count",Re=[];class Pn{constructor(){U(this,"handler");this.handler=null}connect(e){this.handler!==null&&this.disconnect(),this.handler=e,w.on(Pt,this.handler.onLike),w.on(tt,this.handler.onCount)}static like(e,n){w.emit(Pt,{id:e,isLiked:n})}static count(e){if(!w.connected){Re.push(e);return}w.emit(tt,{id:e}),Re.length>0&&Re.reduce((n,r)=>n.then(()=>new Promise(s=>{setTimeout(()=>{Re.splice(Re.indexOf(r),1),w.emit(tt,{id:r}),s()},500)})),Promise.resolve())}disconnect(){this.handler!==null&&(w.off(Pt,this.handler.onLike),w.off(tt,this.handler.onCount),this.handler=null)}}const Mt="playlist-create",Bt="playlist-delete",It="playlist-update",yr="playlist-change-order",Dt="playlist-add-music",Be="playlist-remove-music",mt="playlist-change-music-order";class fe{constructor(){U(this,"handler");this.handler=null}connect(e){this.handler!==null&&this.disconnect(),this.handler=e,w.on(Mt,this.handler.onCreate),w.on(Bt,this.handler.onDelete),w.on(It,this.handler.onUpdate),w.on(yr,this.handler.onChangeOrder),w.on(Dt,this.handler.onAddMusic),w.on(Be,this.handler.onRemoveMusic),w.on(mt,this.handler.onChangeMusicOrder)}static create(e){w.emit(Mt,{name:e})}static update(e,n){w.emit(It,{id:e,name:n})}static delete(e){w.emit(Bt,{id:e})}static changeOrder(e){w.emit(yr,{ids:e})}static addMusic(e,n){w.emit(Dt,{id:e,musicId:n})}static removeMusic(e,n){w.emit(Be,{id:e,musicIds:n})}static changeMusicOrder(e,n){w.emit(mt,{id:e,musicIds:n})}disconnect(){this.handler!==null&&(w.off(Mt,this.handler.onCreate),w.off(Bt,this.handler.onDelete),w.off(It,this.handler.onUpdate),w.off(Dt,this.handler.onAddMusic),w.off(Be,this.handler.onRemoveMusic),this.handler=null)}}function gs(t,e){return function(){return t.apply(e,arguments)}}const{toString:La}=Object.prototype,{getPrototypeOf:Mn}=Object,_t=(t=>e=>{const n=La.call(e);return t[n]||(t[n]=n.slice(8,-1).toLowerCase())})(Object.create(null)),oe=t=>(t=t.toLowerCase(),e=>_t(e)===t),jt=t=>e=>typeof e===t,{isArray:_e}=Array,Fe=jt("undefined");function Pa(t){return t!==null&&!Fe(t)&&t.constructor!==null&&!Fe(t.constructor)&&G(t.constructor.isBuffer)&&t.constructor.isBuffer(t)}const ys=oe("ArrayBuffer");function Ma(t){let e;return typeof ArrayBuffer<"u"&&ArrayBuffer.isView?e=ArrayBuffer.isView(t):e=t&&t.buffer&&ys(t.buffer),e}const Ba=jt("string"),G=jt("function"),bs=jt("number"),At=t=>t!==null&&typeof t=="object",Ia=t=>t===!0||t===!1,ct=t=>{if(_t(t)!=="object")return!1;const e=Mn(t);return(e===null||e===Object.prototype||Object.getPrototypeOf(e)===null)&&!(Symbol.toStringTag in t)&&!(Symbol.iterator in t)},Da=oe("Date"),$a=oe("File"),qa=oe("Blob"),Ua=oe("FileList"),Fa=t=>At(t)&&G(t.pipe),za=t=>{let e;return t&&(typeof FormData=="function"&&t instanceof FormData||G(t.append)&&((e=_t(t))==="formdata"||e==="object"&&G(t.toString)&&t.toString()==="[object FormData]"))},Ha=oe("URLSearchParams"),Wa=t=>t.trim?t.trim():t.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"");function Ve(t,e,{allOwnKeys:n=!1}={}){if(t===null||typeof t>"u")return;let r,s;if(typeof t!="object"&&(t=[t]),_e(t))for(r=0,s=t.length;r<s;r++)e.call(null,t[r],r,t);else{const i=n?Object.getOwnPropertyNames(t):Object.keys(t),o=i.length;let l;for(r=0;r<o;r++)l=i[r],e.call(null,t[l],l,t)}}function xs(t,e){e=e.toLowerCase();const n=Object.keys(t);let r=n.length,s;for(;r-- >0;)if(s=n[r],e===s.toLowerCase())return s;return null}const ws=(()=>typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:global)(),vs=t=>!Fe(t)&&t!==ws;function on(){const{caseless:t}=vs(this)&&this||{},e={},n=(r,s)=>{const i=t&&xs(e,s)||s;ct(e[i])&&ct(r)?e[i]=on(e[i],r):ct(r)?e[i]=on({},r):_e(r)?e[i]=r.slice():e[i]=r};for(let r=0,s=arguments.length;r<s;r++)arguments[r]&&Ve(arguments[r],n);return e}const Va=(t,e,n,{allOwnKeys:r}={})=>(Ve(e,(s,i)=>{n&&G(s)?t[i]=gs(s,n):t[i]=s},{allOwnKeys:r}),t),Ka=t=>(t.charCodeAt(0)===65279&&(t=t.slice(1)),t),Ja=(t,e,n,r)=>{t.prototype=Object.create(e.prototype,r),t.prototype.constructor=t,Object.defineProperty(t,"super",{value:e.prototype}),n&&Object.assign(t.prototype,n)},Ya=(t,e,n,r)=>{let s,i,o;const l={};if(e=e||{},t==null)return e;do{for(s=Object.getOwnPropertyNames(t),i=s.length;i-- >0;)o=s[i],(!r||r(o,t,e))&&!l[o]&&(e[o]=t[o],l[o]=!0);t=n!==!1&&Mn(t)}while(t&&(!n||n(t,e))&&t!==Object.prototype);return e},Xa=(t,e,n)=>{t=String(t),(n===void 0||n>t.length)&&(n=t.length),n-=e.length;const r=t.indexOf(e,n);return r!==-1&&r===n},Ga=t=>{if(!t)return null;if(_e(t))return t;let e=t.length;if(!bs(e))return null;const n=new Array(e);for(;e-- >0;)n[e]=t[e];return n},Qa=(t=>e=>t&&e instanceof t)(typeof Uint8Array<"u"&&Mn(Uint8Array)),Za=(t,e)=>{const r=(t&&t[Symbol.iterator]).call(t);let s;for(;(s=r.next())&&!s.done;){const i=s.value;e.call(t,i[0],i[1])}},ec=(t,e)=>{let n;const r=[];for(;(n=t.exec(e))!==null;)r.push(n);return r},tc=oe("HTMLFormElement"),nc=t=>t.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g,function(n,r,s){return r.toUpperCase()+s}),br=(({hasOwnProperty:t})=>(e,n)=>t.call(e,n))(Object.prototype),rc=oe("RegExp"),ks=(t,e)=>{const n=Object.getOwnPropertyDescriptors(t),r={};Ve(n,(s,i)=>{let o;(o=e(s,i,t))!==!1&&(r[i]=o||s)}),Object.defineProperties(t,r)},sc=t=>{ks(t,(e,n)=>{if(G(t)&&["arguments","caller","callee"].indexOf(n)!==-1)return!1;const r=t[n];if(G(r)){if(e.enumerable=!1,"writable"in e){e.writable=!1;return}e.set||(e.set=()=>{throw Error("Can not rewrite read-only method '"+n+"'")})}})},ic=(t,e)=>{const n={},r=s=>{s.forEach(i=>{n[i]=!0})};return _e(t)?r(t):r(String(t).split(e)),n},oc=()=>{},ac=(t,e)=>(t=+t,Number.isFinite(t)?t:e),$t="abcdefghijklmnopqrstuvwxyz",xr="0123456789",Cs={DIGIT:xr,ALPHA:$t,ALPHA_DIGIT:$t+$t.toUpperCase()+xr},cc=(t=16,e=Cs.ALPHA_DIGIT)=>{let n="";const{length:r}=e;for(;t--;)n+=e[Math.random()*r|0];return n};function lc(t){return!!(t&&G(t.append)&&t[Symbol.toStringTag]==="FormData"&&t[Symbol.iterator])}const dc=t=>{const e=new Array(10),n=(r,s)=>{if(At(r)){if(e.indexOf(r)>=0)return;if(!("toJSON"in r)){e[s]=r;const i=_e(r)?[]:{};return Ve(r,(o,l)=>{const d=n(o,s+1);!Fe(d)&&(i[l]=d)}),e[s]=void 0,i}}return r};return n(t,0)},uc=oe("AsyncFunction"),hc=t=>t&&(At(t)||G(t))&&G(t.then)&&G(t.catch),f={isArray:_e,isArrayBuffer:ys,isBuffer:Pa,isFormData:za,isArrayBufferView:Ma,isString:Ba,isNumber:bs,isBoolean:Ia,isObject:At,isPlainObject:ct,isUndefined:Fe,isDate:Da,isFile:$a,isBlob:qa,isRegExp:rc,isFunction:G,isStream:Fa,isURLSearchParams:Ha,isTypedArray:Qa,isFileList:Ua,forEach:Ve,merge:on,extend:Va,trim:Wa,stripBOM:Ka,inherits:Ja,toFlatObject:Ya,kindOf:_t,kindOfTest:oe,endsWith:Xa,toArray:Ga,forEachEntry:Za,matchAll:ec,isHTMLForm:tc,hasOwnProperty:br,hasOwnProp:br,reduceDescriptors:ks,freezeMethods:sc,toObjectSet:ic,toCamelCase:nc,noop:oc,toFiniteNumber:ac,findKey:xs,global:ws,isContextDefined:vs,ALPHABET:Cs,generateString:cc,isSpecCompliantForm:lc,toJSONObject:dc,isAsyncFn:uc,isThenable:hc};function S(t,e,n,r,s){Error.call(this),Error.captureStackTrace?Error.captureStackTrace(this,this.constructor):this.stack=new Error().stack,this.message=t,this.name="AxiosError",e&&(this.code=e),n&&(this.config=n),r&&(this.request=r),s&&(this.response=s)}f.inherits(S,Error,{toJSON:function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:f.toJSONObject(this.config),code:this.code,status:this.response&&this.response.status?this.response.status:null}}});const Es=S.prototype,Ss={};["ERR_BAD_OPTION_VALUE","ERR_BAD_OPTION","ECONNABORTED","ETIMEDOUT","ERR_NETWORK","ERR_FR_TOO_MANY_REDIRECTS","ERR_DEPRECATED","ERR_BAD_RESPONSE","ERR_BAD_REQUEST","ERR_CANCELED","ERR_NOT_SUPPORT","ERR_INVALID_URL"].forEach(t=>{Ss[t]={value:t}});Object.defineProperties(S,Ss);Object.defineProperty(Es,"isAxiosError",{value:!0});S.from=(t,e,n,r,s,i)=>{const o=Object.create(Es);return f.toFlatObject(t,o,function(d){return d!==Error.prototype},l=>l!=="isAxiosError"),S.call(o,t.message,e,n,r,s),o.cause=t,o.name=t.name,i&&Object.assign(o,i),o};const fc=null;function an(t){return f.isPlainObject(t)||f.isArray(t)}function _s(t){return f.endsWith(t,"[]")?t.slice(0,-2):t}function wr(t,e,n){return t?t.concat(e).map(function(s,i){return s=_s(s),!n&&i?"["+s+"]":s}).join(n?".":""):e}function pc(t){return f.isArray(t)&&!t.some(an)}const mc=f.toFlatObject(f,{},null,function(e){return/^is[A-Z]/.test(e)});function Ot(t,e,n){if(!f.isObject(t))throw new TypeError("target must be an object");e=e||new FormData,n=f.toFlatObject(n,{metaTokens:!0,dots:!1,indexes:!1},!1,function(g,x){return!f.isUndefined(x[g])});const r=n.metaTokens,s=n.visitor||c,i=n.dots,o=n.indexes,d=(n.Blob||typeof Blob<"u"&&Blob)&&f.isSpecCompliantForm(e);if(!f.isFunction(s))throw new TypeError("visitor must be a function");function u(p){if(p===null)return"";if(f.isDate(p))return p.toISOString();if(!d&&f.isBlob(p))throw new S("Blob is not supported. Use a Buffer instead.");return f.isArrayBuffer(p)||f.isTypedArray(p)?d&&typeof Blob=="function"?new Blob([p]):Buffer.from(p):p}function c(p,g,x){let E=p;if(p&&!x&&typeof p=="object"){if(f.endsWith(g,"{}"))g=r?g:g.slice(0,-2),p=JSON.stringify(p);else if(f.isArray(p)&&pc(p)||(f.isFileList(p)||f.endsWith(g,"[]"))&&(E=f.toArray(p)))return g=_s(g),E.forEach(function(N,ae){!(f.isUndefined(N)||N===null)&&e.append(o===!0?wr([g],ae,i):o===null?g:g+"[]",u(N))}),!1}return an(p)?!0:(e.append(wr(x,g,i),u(p)),!1)}const h=[],y=Object.assign(mc,{defaultVisitor:c,convertValue:u,isVisitable:an});function b(p,g){if(!f.isUndefined(p)){if(h.indexOf(p)!==-1)throw Error("Circular reference detected in "+g.join("."));h.push(p),f.forEach(p,function(E,k){(!(f.isUndefined(E)||E===null)&&s.call(e,E,f.isString(k)?k.trim():k,g,y))===!0&&b(E,g?g.concat(k):[k])}),h.pop()}}if(!f.isObject(t))throw new TypeError("data must be an object");return b(t),e}function vr(t){const e={"!":"%21","'":"%27","(":"%28",")":"%29","~":"%7E","%20":"+","%00":"\0"};return encodeURIComponent(t).replace(/[!'()~]|%20|%00/g,function(r){return e[r]})}function Bn(t,e){this._pairs=[],t&&Ot(t,this,e)}const js=Bn.prototype;js.append=function(e,n){this._pairs.push([e,n])};js.toString=function(e){const n=e?function(r){return e.call(this,r,vr)}:vr;return this._pairs.map(function(s){return n(s[0])+"="+n(s[1])},"").join("&")};function gc(t){return encodeURIComponent(t).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}function As(t,e,n){if(!e)return t;const r=n&&n.encode||gc,s=n&&n.serialize;let i;if(s?i=s(e,n):i=f.isURLSearchParams(e)?e.toString():new Bn(e,n).toString(r),i){const o=t.indexOf("#");o!==-1&&(t=t.slice(0,o)),t+=(t.indexOf("?")===-1?"?":"&")+i}return t}class yc{constructor(){this.handlers=[]}use(e,n,r){return this.handlers.push({fulfilled:e,rejected:n,synchronous:r?r.synchronous:!1,runWhen:r?r.runWhen:null}),this.handlers.length-1}eject(e){this.handlers[e]&&(this.handlers[e]=null)}clear(){this.handlers&&(this.handlers=[])}forEach(e){f.forEach(this.handlers,function(r){r!==null&&e(r)})}}const kr=yc,Os={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1},bc=typeof URLSearchParams<"u"?URLSearchParams:Bn,xc=typeof FormData<"u"?FormData:null,wc=typeof Blob<"u"?Blob:null,vc=(()=>{let t;return typeof navigator<"u"&&((t=navigator.product)==="ReactNative"||t==="NativeScript"||t==="NS")?!1:typeof window<"u"&&typeof document<"u"})(),kc=(()=>typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope&&typeof self.importScripts=="function")(),ne={isBrowser:!0,classes:{URLSearchParams:bc,FormData:xc,Blob:wc},isStandardBrowserEnv:vc,isStandardBrowserWebWorkerEnv:kc,protocols:["http","https","file","blob","url","data"]};function Cc(t,e){return Ot(t,new ne.classes.URLSearchParams,Object.assign({visitor:function(n,r,s,i){return ne.isNode&&f.isBuffer(n)?(this.append(r,n.toString("base64")),!1):i.defaultVisitor.apply(this,arguments)}},e))}function Ec(t){return f.matchAll(/\w+|\[(\w*)]/g,t).map(e=>e[0]==="[]"?"":e[1]||e[0])}function Sc(t){const e={},n=Object.keys(t);let r;const s=n.length;let i;for(r=0;r<s;r++)i=n[r],e[i]=t[i];return e}function Rs(t){function e(n,r,s,i){let o=n[i++];const l=Number.isFinite(+o),d=i>=n.length;return o=!o&&f.isArray(s)?s.length:o,d?(f.hasOwnProp(s,o)?s[o]=[s[o],r]:s[o]=r,!l):((!s[o]||!f.isObject(s[o]))&&(s[o]=[]),e(n,r,s[o],i)&&f.isArray(s[o])&&(s[o]=Sc(s[o])),!l)}if(f.isFormData(t)&&f.isFunction(t.entries)){const n={};return f.forEachEntry(t,(r,s)=>{e(Ec(r),s,n,0)}),n}return null}function _c(t,e,n){if(f.isString(t))try{return(e||JSON.parse)(t),f.trim(t)}catch(r){if(r.name!=="SyntaxError")throw r}return(n||JSON.stringify)(t)}const In={transitional:Os,adapter:["xhr","http"],transformRequest:[function(e,n){const r=n.getContentType()||"",s=r.indexOf("application/json")>-1,i=f.isObject(e);if(i&&f.isHTMLForm(e)&&(e=new FormData(e)),f.isFormData(e))return s&&s?JSON.stringify(Rs(e)):e;if(f.isArrayBuffer(e)||f.isBuffer(e)||f.isStream(e)||f.isFile(e)||f.isBlob(e))return e;if(f.isArrayBufferView(e))return e.buffer;if(f.isURLSearchParams(e))return n.setContentType("application/x-www-form-urlencoded;charset=utf-8",!1),e.toString();let l;if(i){if(r.indexOf("application/x-www-form-urlencoded")>-1)return Cc(e,this.formSerializer).toString();if((l=f.isFileList(e))||r.indexOf("multipart/form-data")>-1){const d=this.env&&this.env.FormData;return Ot(l?{"files[]":e}:e,d&&new d,this.formSerializer)}}return i||s?(n.setContentType("application/json",!1),_c(e)):e}],transformResponse:[function(e){const n=this.transitional||In.transitional,r=n&&n.forcedJSONParsing,s=this.responseType==="json";if(e&&f.isString(e)&&(r&&!this.responseType||s)){const o=!(n&&n.silentJSONParsing)&&s;try{return JSON.parse(e)}catch(l){if(o)throw l.name==="SyntaxError"?S.from(l,S.ERR_BAD_RESPONSE,this,null,this.response):l}}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,env:{FormData:ne.classes.FormData,Blob:ne.classes.Blob},validateStatus:function(e){return e>=200&&e<300},headers:{common:{Accept:"application/json, text/plain, */*","Content-Type":void 0}}};f.forEach(["delete","get","head","post","put","patch"],t=>{In.headers[t]={}});const Dn=In,jc=f.toObjectSet(["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"]),Ac=t=>{const e={};let n,r,s;return t&&t.split(`
`).forEach(function(o){s=o.indexOf(":"),n=o.substring(0,s).trim().toLowerCase(),r=o.substring(s+1).trim(),!(!n||e[n]&&jc[n])&&(n==="set-cookie"?e[n]?e[n].push(r):e[n]=[r]:e[n]=e[n]?e[n]+", "+r:r)}),e},Cr=Symbol("internals");function Ne(t){return t&&String(t).trim().toLowerCase()}function lt(t){return t===!1||t==null?t:f.isArray(t)?t.map(lt):String(t)}function Oc(t){const e=Object.create(null),n=/([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;let r;for(;r=n.exec(t);)e[r[1]]=r[2];return e}const Rc=t=>/^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(t.trim());function qt(t,e,n,r,s){if(f.isFunction(r))return r.call(this,e,n);if(s&&(e=n),!!f.isString(e)){if(f.isString(r))return e.indexOf(r)!==-1;if(f.isRegExp(r))return r.test(e)}}function Nc(t){return t.trim().toLowerCase().replace(/([a-z\d])(\w*)/g,(e,n,r)=>n.toUpperCase()+r)}function Tc(t,e){const n=f.toCamelCase(" "+e);["get","set","has"].forEach(r=>{Object.defineProperty(t,r+n,{value:function(s,i,o){return this[r].call(this,e,s,i,o)},configurable:!0})})}class Rt{constructor(e){e&&this.set(e)}set(e,n,r){const s=this;function i(l,d,u){const c=Ne(d);if(!c)throw new Error("header name must be a non-empty string");const h=f.findKey(s,c);(!h||s[h]===void 0||u===!0||u===void 0&&s[h]!==!1)&&(s[h||d]=lt(l))}const o=(l,d)=>f.forEach(l,(u,c)=>i(u,c,d));return f.isPlainObject(e)||e instanceof this.constructor?o(e,n):f.isString(e)&&(e=e.trim())&&!Rc(e)?o(Ac(e),n):e!=null&&i(n,e,r),this}get(e,n){if(e=Ne(e),e){const r=f.findKey(this,e);if(r){const s=this[r];if(!n)return s;if(n===!0)return Oc(s);if(f.isFunction(n))return n.call(this,s,r);if(f.isRegExp(n))return n.exec(s);throw new TypeError("parser must be boolean|regexp|function")}}}has(e,n){if(e=Ne(e),e){const r=f.findKey(this,e);return!!(r&&this[r]!==void 0&&(!n||qt(this,this[r],r,n)))}return!1}delete(e,n){const r=this;let s=!1;function i(o){if(o=Ne(o),o){const l=f.findKey(r,o);l&&(!n||qt(r,r[l],l,n))&&(delete r[l],s=!0)}}return f.isArray(e)?e.forEach(i):i(e),s}clear(e){const n=Object.keys(this);let r=n.length,s=!1;for(;r--;){const i=n[r];(!e||qt(this,this[i],i,e,!0))&&(delete this[i],s=!0)}return s}normalize(e){const n=this,r={};return f.forEach(this,(s,i)=>{const o=f.findKey(r,i);if(o){n[o]=lt(s),delete n[i];return}const l=e?Nc(i):String(i).trim();l!==i&&delete n[i],n[l]=lt(s),r[l]=!0}),this}concat(...e){return this.constructor.concat(this,...e)}toJSON(e){const n=Object.create(null);return f.forEach(this,(r,s)=>{r!=null&&r!==!1&&(n[s]=e&&f.isArray(r)?r.join(", "):r)}),n}[Symbol.iterator](){return Object.entries(this.toJSON())[Symbol.iterator]()}toString(){return Object.entries(this.toJSON()).map(([e,n])=>e+": "+n).join(`
`)}get[Symbol.toStringTag](){return"AxiosHeaders"}static from(e){return e instanceof this?e:new this(e)}static concat(e,...n){const r=new this(e);return n.forEach(s=>r.set(s)),r}static accessor(e){const r=(this[Cr]=this[Cr]={accessors:{}}).accessors,s=this.prototype;function i(o){const l=Ne(o);r[l]||(Tc(s,o),r[l]=!0)}return f.isArray(e)?e.forEach(i):i(e),this}}Rt.accessor(["Content-Type","Content-Length","Accept","Accept-Encoding","User-Agent","Authorization"]);f.reduceDescriptors(Rt.prototype,({value:t},e)=>{let n=e[0].toUpperCase()+e.slice(1);return{get:()=>t,set(r){this[n]=r}}});f.freezeMethods(Rt);const ce=Rt;function Ut(t,e){const n=this||Dn,r=e||n,s=ce.from(r.headers);let i=r.data;return f.forEach(t,function(l){i=l.call(n,i,s.normalize(),e?e.status:void 0)}),s.normalize(),i}function Ns(t){return!!(t&&t.__CANCEL__)}function Ke(t,e,n){S.call(this,t??"canceled",S.ERR_CANCELED,e,n),this.name="CanceledError"}f.inherits(Ke,S,{__CANCEL__:!0});function Lc(t,e,n){const r=n.config.validateStatus;!n.status||!r||r(n.status)?t(n):e(new S("Request failed with status code "+n.status,[S.ERR_BAD_REQUEST,S.ERR_BAD_RESPONSE][Math.floor(n.status/100)-4],n.config,n.request,n))}const Pc=ne.isStandardBrowserEnv?function(){return{write:function(n,r,s,i,o,l){const d=[];d.push(n+"="+encodeURIComponent(r)),f.isNumber(s)&&d.push("expires="+new Date(s).toGMTString()),f.isString(i)&&d.push("path="+i),f.isString(o)&&d.push("domain="+o),l===!0&&d.push("secure"),document.cookie=d.join("; ")},read:function(n){const r=document.cookie.match(new RegExp("(^|;\\s*)("+n+")=([^;]*)"));return r?decodeURIComponent(r[3]):null},remove:function(n){this.write(n,"",Date.now()-864e5)}}}():function(){return{write:function(){},read:function(){return null},remove:function(){}}}();function Mc(t){return/^([a-z][a-z\d+\-.]*:)?\/\//i.test(t)}function Bc(t,e){return e?t.replace(/\/+$/,"")+"/"+e.replace(/^\/+/,""):t}function Ts(t,e){return t&&!Mc(e)?Bc(t,e):e}const Ic=ne.isStandardBrowserEnv?function(){const e=/(msie|trident)/i.test(navigator.userAgent),n=document.createElement("a");let r;function s(i){let o=i;return e&&(n.setAttribute("href",o),o=n.href),n.setAttribute("href",o),{href:n.href,protocol:n.protocol?n.protocol.replace(/:$/,""):"",host:n.host,search:n.search?n.search.replace(/^\?/,""):"",hash:n.hash?n.hash.replace(/^#/,""):"",hostname:n.hostname,port:n.port,pathname:n.pathname.charAt(0)==="/"?n.pathname:"/"+n.pathname}}return r=s(window.location.href),function(o){const l=f.isString(o)?s(o):o;return l.protocol===r.protocol&&l.host===r.host}}():function(){return function(){return!0}}();function Dc(t){const e=/^([-+\w]{1,25})(:?\/\/|:)/.exec(t);return e&&e[1]||""}function $c(t,e){t=t||10;const n=new Array(t),r=new Array(t);let s=0,i=0,o;return e=e!==void 0?e:1e3,function(d){const u=Date.now(),c=r[i];o||(o=u),n[s]=d,r[s]=u;let h=i,y=0;for(;h!==s;)y+=n[h++],h=h%t;if(s=(s+1)%t,s===i&&(i=(i+1)%t),u-o<e)return;const b=c&&u-c;return b?Math.round(y*1e3/b):void 0}}function Er(t,e){let n=0;const r=$c(50,250);return s=>{const i=s.loaded,o=s.lengthComputable?s.total:void 0,l=i-n,d=r(l),u=i<=o;n=i;const c={loaded:i,total:o,progress:o?i/o:void 0,bytes:l,rate:d||void 0,estimated:d&&o&&u?(o-i)/d:void 0,event:s};c[e?"download":"upload"]=!0,t(c)}}const qc=typeof XMLHttpRequest<"u",Uc=qc&&function(t){return new Promise(function(n,r){let s=t.data;const i=ce.from(t.headers).normalize(),o=t.responseType;let l;function d(){t.cancelToken&&t.cancelToken.unsubscribe(l),t.signal&&t.signal.removeEventListener("abort",l)}let u;f.isFormData(s)&&(ne.isStandardBrowserEnv||ne.isStandardBrowserWebWorkerEnv?i.setContentType(!1):i.getContentType(/^\s*multipart\/form-data/)?f.isString(u=i.getContentType())&&i.setContentType(u.replace(/^\s*(multipart\/form-data);+/,"$1")):i.setContentType("multipart/form-data"));let c=new XMLHttpRequest;if(t.auth){const p=t.auth.username||"",g=t.auth.password?unescape(encodeURIComponent(t.auth.password)):"";i.set("Authorization","Basic "+btoa(p+":"+g))}const h=Ts(t.baseURL,t.url);c.open(t.method.toUpperCase(),As(h,t.params,t.paramsSerializer),!0),c.timeout=t.timeout;function y(){if(!c)return;const p=ce.from("getAllResponseHeaders"in c&&c.getAllResponseHeaders()),x={data:!o||o==="text"||o==="json"?c.responseText:c.response,status:c.status,statusText:c.statusText,headers:p,config:t,request:c};Lc(function(k){n(k),d()},function(k){r(k),d()},x),c=null}if("onloadend"in c?c.onloadend=y:c.onreadystatechange=function(){!c||c.readyState!==4||c.status===0&&!(c.responseURL&&c.responseURL.indexOf("file:")===0)||setTimeout(y)},c.onabort=function(){c&&(r(new S("Request aborted",S.ECONNABORTED,t,c)),c=null)},c.onerror=function(){r(new S("Network Error",S.ERR_NETWORK,t,c)),c=null},c.ontimeout=function(){let g=t.timeout?"timeout of "+t.timeout+"ms exceeded":"timeout exceeded";const x=t.transitional||Os;t.timeoutErrorMessage&&(g=t.timeoutErrorMessage),r(new S(g,x.clarifyTimeoutError?S.ETIMEDOUT:S.ECONNABORTED,t,c)),c=null},ne.isStandardBrowserEnv){const p=(t.withCredentials||Ic(h))&&t.xsrfCookieName&&Pc.read(t.xsrfCookieName);p&&i.set(t.xsrfHeaderName,p)}s===void 0&&i.setContentType(null),"setRequestHeader"in c&&f.forEach(i.toJSON(),function(g,x){c.setRequestHeader(x,g)}),f.isUndefined(t.withCredentials)||(c.withCredentials=!!t.withCredentials),o&&o!=="json"&&(c.responseType=t.responseType),typeof t.onDownloadProgress=="function"&&c.addEventListener("progress",Er(t.onDownloadProgress,!0)),typeof t.onUploadProgress=="function"&&c.upload&&c.upload.addEventListener("progress",Er(t.onUploadProgress)),(t.cancelToken||t.signal)&&(l=p=>{c&&(r(!p||p.type?new Ke(null,t,c):p),c.abort(),c=null)},t.cancelToken&&t.cancelToken.subscribe(l),t.signal&&(t.signal.aborted?l():t.signal.addEventListener("abort",l)));const b=Dc(h);if(b&&ne.protocols.indexOf(b)===-1){r(new S("Unsupported protocol "+b+":",S.ERR_BAD_REQUEST,t));return}c.send(s||null)})},cn={http:fc,xhr:Uc};f.forEach(cn,(t,e)=>{if(t){try{Object.defineProperty(t,"name",{value:e})}catch{}Object.defineProperty(t,"adapterName",{value:e})}});const Sr=t=>`- ${t}`,Fc=t=>f.isFunction(t)||t===null||t===!1,Ls={getAdapter:t=>{t=f.isArray(t)?t:[t];const{length:e}=t;let n,r;const s={};for(let i=0;i<e;i++){n=t[i];let o;if(r=n,!Fc(n)&&(r=cn[(o=String(n)).toLowerCase()],r===void 0))throw new S(`Unknown adapter '${o}'`);if(r)break;s[o||"#"+i]=r}if(!r){const i=Object.entries(s).map(([l,d])=>`adapter ${l} `+(d===!1?"is not supported by the environment":"is not available in the build"));let o=e?i.length>1?`since :
`+i.map(Sr).join(`
`):" "+Sr(i[0]):"as no adapter specified";throw new S("There is no suitable adapter to dispatch the request "+o,"ERR_NOT_SUPPORT")}return r},adapters:cn};function Ft(t){if(t.cancelToken&&t.cancelToken.throwIfRequested(),t.signal&&t.signal.aborted)throw new Ke(null,t)}function _r(t){return Ft(t),t.headers=ce.from(t.headers),t.data=Ut.call(t,t.transformRequest),["post","put","patch"].indexOf(t.method)!==-1&&t.headers.setContentType("application/x-www-form-urlencoded",!1),Ls.getAdapter(t.adapter||Dn.adapter)(t).then(function(r){return Ft(t),r.data=Ut.call(t,t.transformResponse,r),r.headers=ce.from(r.headers),r},function(r){return Ns(r)||(Ft(t),r&&r.response&&(r.response.data=Ut.call(t,t.transformResponse,r.response),r.response.headers=ce.from(r.response.headers))),Promise.reject(r)})}const jr=t=>t instanceof ce?t.toJSON():t;function ke(t,e){e=e||{};const n={};function r(u,c,h){return f.isPlainObject(u)&&f.isPlainObject(c)?f.merge.call({caseless:h},u,c):f.isPlainObject(c)?f.merge({},c):f.isArray(c)?c.slice():c}function s(u,c,h){if(f.isUndefined(c)){if(!f.isUndefined(u))return r(void 0,u,h)}else return r(u,c,h)}function i(u,c){if(!f.isUndefined(c))return r(void 0,c)}function o(u,c){if(f.isUndefined(c)){if(!f.isUndefined(u))return r(void 0,u)}else return r(void 0,c)}function l(u,c,h){if(h in e)return r(u,c);if(h in t)return r(void 0,u)}const d={url:i,method:i,data:i,baseURL:o,transformRequest:o,transformResponse:o,paramsSerializer:o,timeout:o,timeoutMessage:o,withCredentials:o,adapter:o,responseType:o,xsrfCookieName:o,xsrfHeaderName:o,onUploadProgress:o,onDownloadProgress:o,decompress:o,maxContentLength:o,maxBodyLength:o,beforeRedirect:o,transport:o,httpAgent:o,httpsAgent:o,cancelToken:o,socketPath:o,responseEncoding:o,validateStatus:l,headers:(u,c)=>s(jr(u),jr(c),!0)};return f.forEach(Object.keys(Object.assign({},t,e)),function(c){const h=d[c]||s,y=h(t[c],e[c],c);f.isUndefined(y)&&h!==l||(n[c]=y)}),n}const Ps="1.5.1",$n={};["object","boolean","number","function","string","symbol"].forEach((t,e)=>{$n[t]=function(r){return typeof r===t||"a"+(e<1?"n ":" ")+t}});const Ar={};$n.transitional=function(e,n,r){function s(i,o){return"[Axios v"+Ps+"] Transitional option '"+i+"'"+o+(r?". "+r:"")}return(i,o,l)=>{if(e===!1)throw new S(s(o," has been removed"+(n?" in "+n:"")),S.ERR_DEPRECATED);return n&&!Ar[o]&&(Ar[o]=!0,console.warn(s(o," has been deprecated since v"+n+" and will be removed in the near future"))),e?e(i,o,l):!0}};function zc(t,e,n){if(typeof t!="object")throw new S("options must be an object",S.ERR_BAD_OPTION_VALUE);const r=Object.keys(t);let s=r.length;for(;s-- >0;){const i=r[s],o=e[i];if(o){const l=t[i],d=l===void 0||o(l,i,t);if(d!==!0)throw new S("option "+i+" must be "+d,S.ERR_BAD_OPTION_VALUE);continue}if(n!==!0)throw new S("Unknown option "+i,S.ERR_BAD_OPTION)}}const ln={assertOptions:zc,validators:$n},le=ln.validators;class gt{constructor(e){this.defaults=e,this.interceptors={request:new kr,response:new kr}}request(e,n){typeof e=="string"?(n=n||{},n.url=e):n=e||{},n=ke(this.defaults,n);const{transitional:r,paramsSerializer:s,headers:i}=n;r!==void 0&&ln.assertOptions(r,{silentJSONParsing:le.transitional(le.boolean),forcedJSONParsing:le.transitional(le.boolean),clarifyTimeoutError:le.transitional(le.boolean)},!1),s!=null&&(f.isFunction(s)?n.paramsSerializer={serialize:s}:ln.assertOptions(s,{encode:le.function,serialize:le.function},!0)),n.method=(n.method||this.defaults.method||"get").toLowerCase();let o=i&&f.merge(i.common,i[n.method]);i&&f.forEach(["delete","get","head","post","put","patch","common"],p=>{delete i[p]}),n.headers=ce.concat(o,i);const l=[];let d=!0;this.interceptors.request.forEach(function(g){typeof g.runWhen=="function"&&g.runWhen(n)===!1||(d=d&&g.synchronous,l.unshift(g.fulfilled,g.rejected))});const u=[];this.interceptors.response.forEach(function(g){u.push(g.fulfilled,g.rejected)});let c,h=0,y;if(!d){const p=[_r.bind(this),void 0];for(p.unshift.apply(p,l),p.push.apply(p,u),y=p.length,c=Promise.resolve(n);h<y;)c=c.then(p[h++],p[h++]);return c}y=l.length;let b=n;for(h=0;h<y;){const p=l[h++],g=l[h++];try{b=p(b)}catch(x){g.call(this,x);break}}try{c=_r.call(this,b)}catch(p){return Promise.reject(p)}for(h=0,y=u.length;h<y;)c=c.then(u[h++],u[h++]);return c}getUri(e){e=ke(this.defaults,e);const n=Ts(e.baseURL,e.url);return As(n,e.params,e.paramsSerializer)}}f.forEach(["delete","get","head","options"],function(e){gt.prototype[e]=function(n,r){return this.request(ke(r||{},{method:e,url:n,data:(r||{}).data}))}});f.forEach(["post","put","patch"],function(e){function n(r){return function(i,o,l){return this.request(ke(l||{},{method:e,headers:r?{"Content-Type":"multipart/form-data"}:{},url:i,data:o}))}}gt.prototype[e]=n(),gt.prototype[e+"Form"]=n(!0)});const dt=gt;class qn{constructor(e){if(typeof e!="function")throw new TypeError("executor must be a function.");let n;this.promise=new Promise(function(i){n=i});const r=this;this.promise.then(s=>{if(!r._listeners)return;let i=r._listeners.length;for(;i-- >0;)r._listeners[i](s);r._listeners=null}),this.promise.then=s=>{let i;const o=new Promise(l=>{r.subscribe(l),i=l}).then(s);return o.cancel=function(){r.unsubscribe(i)},o},e(function(i,o,l){r.reason||(r.reason=new Ke(i,o,l),n(r.reason))})}throwIfRequested(){if(this.reason)throw this.reason}subscribe(e){if(this.reason){e(this.reason);return}this._listeners?this._listeners.push(e):this._listeners=[e]}unsubscribe(e){if(!this._listeners)return;const n=this._listeners.indexOf(e);n!==-1&&this._listeners.splice(n,1)}static source(){let e;return{token:new qn(function(s){e=s}),cancel:e}}}const Hc=qn;function Wc(t){return function(n){return t.apply(null,n)}}function Vc(t){return f.isObject(t)&&t.isAxiosError===!0}const dn={Continue:100,SwitchingProtocols:101,Processing:102,EarlyHints:103,Ok:200,Created:201,Accepted:202,NonAuthoritativeInformation:203,NoContent:204,ResetContent:205,PartialContent:206,MultiStatus:207,AlreadyReported:208,ImUsed:226,MultipleChoices:300,MovedPermanently:301,Found:302,SeeOther:303,NotModified:304,UseProxy:305,Unused:306,TemporaryRedirect:307,PermanentRedirect:308,BadRequest:400,Unauthorized:401,PaymentRequired:402,Forbidden:403,NotFound:404,MethodNotAllowed:405,NotAcceptable:406,ProxyAuthenticationRequired:407,RequestTimeout:408,Conflict:409,Gone:410,LengthRequired:411,PreconditionFailed:412,PayloadTooLarge:413,UriTooLong:414,UnsupportedMediaType:415,RangeNotSatisfiable:416,ExpectationFailed:417,ImATeapot:418,MisdirectedRequest:421,UnprocessableEntity:422,Locked:423,FailedDependency:424,TooEarly:425,UpgradeRequired:426,PreconditionRequired:428,TooManyRequests:429,RequestHeaderFieldsTooLarge:431,UnavailableForLegalReasons:451,InternalServerError:500,NotImplemented:501,BadGateway:502,ServiceUnavailable:503,GatewayTimeout:504,HttpVersionNotSupported:505,VariantAlsoNegotiates:506,InsufficientStorage:507,LoopDetected:508,NotExtended:510,NetworkAuthenticationRequired:511};Object.entries(dn).forEach(([t,e])=>{dn[e]=t});const Kc=dn;function Ms(t){const e=new dt(t),n=gs(dt.prototype.request,e);return f.extend(n,dt.prototype,e,{allOwnKeys:!0}),f.extend(n,e,null,{allOwnKeys:!0}),n.create=function(s){return Ms(ke(t,s))},n}const P=Ms(Dn);P.Axios=dt;P.CanceledError=Ke;P.CancelToken=Hc;P.isCancel=Ns;P.VERSION=Ps;P.toFormData=Ot;P.AxiosError=S;P.Cancel=P.CanceledError;P.all=function(e){return Promise.all(e)};P.spread=Wc;P.isAxiosError=Vc;P.mergeConfig=ke;P.AxiosHeaders=ce;P.formToJSON=t=>Rs(f.isHTMLForm(t)?new FormData(t):t);P.getAdapter=Ls.getAdapter;P.HttpStatusCode=Kc;P.default=P;const Jc=P;function me(t,e){return t+" { "+e+" }"}function I(t,e){return t+" {"+e.join(" ")+"}"}async function ge(t){const{data:e}=await Jc.request({url:"/graphql",method:"POST",data:{query:t}});return e}function Yc(){return ge(me("query",I("allMusics",["id","name","filePath","codec","duration","playCount","trackNumber","isLiked","createdAt",I("artist",["id","name"]),I("album",["id","name","cover","publishedYear"])])))}function Xc(){return ge(me("query",I("allArtists",["id","name","createdAt","albumCount","musicCount",I("latestAlbum",["cover"])])))}function Gc(t){return ge(me("query",I(`artist(id: "${t}")`,["id","name","albumCount","musicCount","createdAt",I("latestAlbum",["cover"]),I("albums",["id","name","cover","publishedYear"]),I("musics",["id"])])))}function Qc(){return ge(me("query",I("allAlbums",["id","name","cover","publishedYear","createdAt",I("artist",["id","name"])])))}function Zc(t){return ge(me("query",I(`album(id: "${t}")`,["id","name","cover","publishedYear",I("artist",["id","name"]),I("musics",["id"])])))}function el(){return ge(me("query",I("allPlaylist",["id","name","musicCount","createdAt","updatedAt",I("headerMusics",["id"])])))}function tl(t){return ge(me("query",I(`playlist(id: "${t}")`,["id","name","musicCount","createdAt","updatedAt",I("musics",["id"])])))}class nl extends pe{constructor(){super();U(this,"init",!1);U(this,"listener");this.state={loaded:!1,musics:[],musicMap:new Map},this.listener=new Pn,this.listener.connect({onLike:({id:n,isLiked:r})=>{this.set({musics:this.state.musics.map(s=>(s.id===n&&(s.isLiked=r),s))})},onCount:({id:n,playCount:r})=>{this.set({musics:this.state.musics.map(s=>(s.id===n&&(s.playCount=r),s)).sort((s,i)=>i.playCount-s.playCount)})}})}get state(){return this.init||(this.init=!0,this.sync()),super.state}set state(n){super.state=n}async sync(){Yc().then(({data:n})=>{this.set({loaded:!0,musics:n.allMusics,musicMap:new Map(n.allMusics.map(r=>[r.id,r]))})})}}const z=new nl,Te=t=>JSON.stringify(t);class rl{constructor({onPlay:e,onPause:n,onStop:r,onEnded:s,onTimeUpdate:i,onSkipToNext:o,onSkipToPrevious:l}){window.AppChannel.receiveMessage=d=>{d.actionType==="play"&&(e==null||e()),d.actionType==="pause"&&(n==null||n()),d.actionType==="stop"&&(r==null||r()),d.actionType==="skipToNext"&&(o==null||o()),d.actionType==="skipToPrevious"&&(l==null||l()),d.actionType==="end"&&s(),d.actionType==="setPosition"&&i(Fo(d.position))}}load(e){window.AppChannel.postMessage(Te({actionType:"setMediaItem",mediaItem:{id:location.origin+"/api/audio/"+e.id,album:e.album.name,title:e.name,artist:e.artist.name,duration:ir(e.duration),artUri:location.origin+Ue(e.album.cover)}}))}play(){window.AppChannel.postMessage(Te({actionType:"play"}))}pause(){window.AppChannel.postMessage(Te({actionType:"pause"}))}stop(){window.AppChannel.postMessage(Te({actionType:"stop"}))}seek(e){window.AppChannel.postMessage(Te({actionType:"setPosition",position:ir(e)}))}download(){F.toast("Not supported yet.")}}class sl{constructor({onPlay:e,onPause:n,onStop:r,onEnded:s,onTimeUpdate:i}){U(this,"audio");this.audio=new Audio,this.audio.addEventListener("play",()=>{e==null||e()}),this.audio.addEventListener("pause",()=>{n==null||n()}),this.audio.addEventListener("abort",()=>{r==null||r()}),this.audio.addEventListener("ended",()=>{s()}),this.audio.addEventListener("timeupdate",()=>{i(this.audio.currentTime)})}load(e){const n="/api/audio/"+e.id;this.audio.pause(),this.audio.src=n,this.audio.currentTime=0,this.audio.load()}play(){this.audio.play()}pause(){this.audio.pause()}stop(){this.audio.pause(),this.audio.currentTime=0}seek(e){this.audio.currentTime=e}download(e){const n="/api/audio/"+e.id,r=document.createElement("a");r.href=n,r.download=e.filePath.split("/").pop(),r.click()}}const il=t=>{const e=[...t];for(let n=e.length-1;n>0;n--){const r=Math.floor(Math.random()*(n+1));[e[n],e[r]]=[e[r],e[n]]}return e};let zt=null;const Ht=t=>z.state.musicMap.get(t);class ol extends pe{constructor(){super();U(this,"shouldCount",!1);U(this,"audioChannel");this.state={selected:null,isPlaying:!1,shuffle:!1,insertMode:"last",repeatMode:"none",playMode:"later",currentTime:0,progress:0,items:[],sourceItems:[]};const n={onPlay:()=>{this.set({isPlaying:!0})},onPause:()=>{this.set({isPlaying:!1})},onStop:()=>{this.set({isPlaying:!1})},onEnded:()=>{if(this.state.selected!==null){if(this.state.repeatMode==="one"){this.select(this.state.selected);return}if(this.state.repeatMode==="all"){this.select((this.state.selected+1)%this.state.items.length),this.audioChannel.play();return}this.state.repeatMode==="none"&&(this.state.selected+1<this.state.items.length?(this.select(this.state.selected+1),this.audioChannel.play()):(this.audioChannel.stop(),this.set({isPlaying:!1})))}},onTimeUpdate:s=>{const i=Ht(this.state.items[this.state.selected]),o=Number((s/((i==null?void 0:i.duration)||1)*100).toFixed(2));!this.shouldCount&&Math.floor(o)===0&&(this.shouldCount=!0),this.shouldCount&&Math.floor(o)===80&&(this.shouldCount=!1,Pn.count(this.state.items[this.state.selected])),this.set({currentTime:s,progress:o})},onSkipToNext:()=>{this.next()},onSkipToPrevious:()=>{this.prev()}};this.audioChannel=window.AppChannel?new rl(n):new sl(n);const r=z.subscribe(async({loaded:s})=>{if(s){const i=localStorage.getItem("queue");if(i){const o=JSON.parse(i);await this.set(o),this.select(o.selected||0,!1)}z.unsubscribe(r)}});window.addEventListener("beforeunload",()=>{this.audioChannel.stop()})}async reset(n){this.state.items.length>0&&!await F.confirm("Are you sure to reset queue?")||(await this.set({items:n,sourceItems:[],shuffle:!1,selected:null,currentTime:0,progress:0,isPlaying:!1}),this.select(0))}async add(n){if(this.state.items.includes(n)){if(this.state.playMode==="immediately"){this.select(this.state.items.indexOf(n));return}F.toast("Already added to queue");return}if(this.state.shuffle&&this.set({sourceItems:[...this.state.items,n]}),this.state.insertMode==="first"&&this.set({items:[n,...this.state.items]}),this.state.insertMode==="last"&&this.set({items:[...this.state.items,n]}),this.state.insertMode==="after"&&(this.state.selected===null?this.set({items:[...this.state.items,n]}):this.set({items:[...this.state.items.slice(0,this.state.selected+1),n,...this.state.items.slice(this.state.selected+1)]})),F.toast("Added to queue"),this.state.playMode==="immediately"){this.select(this.state.items.indexOf(n));return}this.state.selected===null&&this.select(0)}async removeItems(n){const r=this.state.items.filter(o=>!n.includes(o)),s=this.state.selected,i=r.length>0?this.state.items[s||0]:null;if(await this.set({items:this.state.items.filter(o=>!n.includes(o))}),i){if(!n.includes(i)){this.set({selected:r.indexOf(i)});return}if(n.includes(i)){if(this.state.items.length>=s){this.select(s);return}if(this.state.items.length<s){this.select(this.state.items.length-1);return}}}}select(n,r=!0){this.set({selected:n,progress:0,currentTime:0,isPlaying:r});const s=Ht(this.state.items[n]);s!==void 0&&(document.title=`${s.name} - ${s.artist.name}`,this.audioChannel.load(s),r&&this.audioChannel.play())}play(){this.state.selected!==null&&this.audioChannel.play()}pause(){this.audioChannel.pause()}stop(){this.audioChannel.stop()}seek(n){this.audioChannel.seek(n)}setPlayMode(n){this.set({playMode:n})}setInsertMode(n){this.set({insertMode:n})}changeRepeatMode(){this.state.repeatMode==="none"?this.set({repeatMode:"all"}):this.state.repeatMode==="all"?this.set({repeatMode:"one"}):this.state.repeatMode==="one"&&this.set({repeatMode:"none"})}toggleShuffle(){const n=this.state.items[this.state.selected];if(this.state.shuffle){this.set({shuffle:!1,selected:this.state.sourceItems.indexOf(n),items:[...this.state.sourceItems],sourceItems:[]});return}const r=il([...this.state.items]).filter(s=>s!==n);r.unshift(n),this.set({shuffle:!0,selected:0,items:r,sourceItems:[...this.state.items]})}next(){this.state.selected!==null&&(this.select((this.state.selected+1)%this.state.items.length),this.audioChannel.play())}prev(){if(this.state.selected!==null){if(this.state.currentTime>10){this.audioChannel.seek(0);return}this.select((this.state.selected-1+this.state.items.length)%this.state.items.length),this.audioChannel.play()}}download(n){this.audioChannel.download(Ht(n))}afterStateChange(){zt||(zt=setTimeout(()=>{localStorage.setItem("queue",JSON.stringify({...this.state,isPlaying:!1,currentTime:0,progress:0})),zt=null},3e3))}}const v=new ol;function ye({id:t,onArtistClick:e,onAlbumClick:n}){const[{musicMap:r}]=R(z),s=r.get(t);return s?a.jsx(Un,{header:a.jsxs(a.Fragment,{children:[n&&a.jsxs("button",{className:"panel-album clickable linkable",onClick:()=>{M.close(),setTimeout(n,100)},children:[a.jsx(ue,{className:"cover",src:s.album.cover,alt:s.album.name}),a.jsxs("div",{children:[a.jsx("div",{className:"panel-sub-title",children:"Album"}),a.jsx("div",{className:"panel-sub-content",children:s.album.name})]})]}),e&&a.jsx("button",{className:"panel-artist clickable linkable",onClick:()=>{M.close(),setTimeout(e,100)},children:a.jsxs("div",{children:[a.jsx("div",{className:"panel-sub-title",children:"Artist"}),a.jsx("div",{className:"panel-sub-content",children:s.artist.name})]})})]}),items:[{icon:a.jsx(Vr,{}),text:"Like",isActive:s.isLiked,onClick:()=>Pn.like(s.id,!s.isLiked)},{icon:a.jsx(X,{}),text:"Add to Queue",onClick:()=>v.add(s.id)},{icon:a.jsx(Po,{}),text:"Add to Playlist",onClick:()=>{M.close(),M.open({title:"Add to Playlist",content:a.jsx(ml,{musicId:s.id})})}},{icon:a.jsx(Bo,{}),text:"Download",onClick:()=>{v.download(s.id),M.close()}}],footer:a.jsxs(a.Fragment,{children:[a.jsxs("span",{children:["listen: ",s.playCount," times"]})," /",a.jsxs("span",{children:["duration: ",Qt(s.duration)]})," /",a.jsxs("span",{children:["codec: ",s.codec]})]})}):null}const al=A.button`
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
`;function be({albumName:t,albumCover:e,artistName:n,trackNumber:r,musicName:s,musicCodec:i,isLiked:o,onClick:l,onLongPress:d}){return a.jsxs(al,{className:"clickable",onClick:l,onContextMenu:u=>{u.preventDefault(),d==null||d()},hasAlbumCover:typeof e=="string",hasLongPress:typeof d=="function",children:[typeof e=="string"&&a.jsx(ue,{className:"album-art",src:e,alt:t}),a.jsxs("div",{className:"row",children:[a.jsxs("div",{className:"info",children:[a.jsxs("div",{className:"title",children:[!!r&&a.jsxs("span",{className:"track-number",children:[r,"."]}),s,i&&i.toLocaleLowerCase()==="flac"&&a.jsx("span",{className:"codec",children:i})]}),a.jsx("div",{className:"artist",children:n})]}),d&&a.jsx("button",{className:`icon-button ${o?"liked":""}`,onClick:u=>{u.stopPropagation(),d==null||d()},children:o?a.jsx(Vr,{}):a.jsx(Yr,{})})]})]})}const cl=A.div`
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
`;function ll(){const t=Z(),[e]=R(v),[{musicMap:n}]=R(z),r=e.selected!==null?n.get(e.items[e.selected]):null,s=o=>{const{width:l,left:d,right:u}=o.currentTarget.getBoundingClientRect();let c=o.touches?o.touches[0].clientX:o.clientX;c=c<d?d:c>u?u:c;const h=(c-d)/l,y=(r==null?void 0:r.duration)||1;v.seek(y*h)},i=o=>{var l;if(o.buttons===1){s(o);return}((l=o.touches)==null?void 0:l.length)===1&&s(o)};return a.jsxs(cl,{children:[a.jsx("div",{className:"progress",role:"progressbar","aria-valuenow":e.progress,"aria-valuemin":0,"aria-valuemax":100,onClick:s,onMouseMove:i,onTouchMove:i,children:a.jsx("div",{className:"bar",style:{transform:`translate(-${100-e.progress}%, 0)`}})}),a.jsxs("div",{className:"player",children:[a.jsx("div",{className:"music",children:a.jsx(be,{albumName:(r==null?void 0:r.album.name)??"",albumCover:(r==null?void 0:r.album.cover)??"",musicName:(r==null?void 0:r.name)??"No music",artistName:(r==null?void 0:r.artist.name)??"",onClick:()=>r&&t("/player")})}),a.jsxs("div",{className:"action",children:[a.jsxs("button",{className:"icon-button mode",onClick:()=>v.changeRepeatMode(),children:[e.repeatMode==="all"&&a.jsx(Gr,{}),e.repeatMode==="one"&&a.jsx(Kr,{}),e.repeatMode==="none"&&a.jsx(Qr,{})]}),a.jsx("button",{className:"icon-button skip-back",onClick:()=>v.prev(),children:a.jsx(X,{})}),a.jsx("button",{className:"icon-button play",onClick:()=>e.isPlaying?v.pause():v.play(),children:e.isPlaying?a.jsx(Xr,{}):a.jsx(X,{})}),a.jsx("button",{className:"icon-button skip-forward",onClick:()=>v.next(),children:a.jsx(X,{})}),a.jsx("button",{className:`icon-button shuffle ${e.shuffle?"active":""}`,onClick:()=>v.toggleShuffle(),children:a.jsx(Zr,{})}),a.jsx("button",{className:"icon-button queue",onClick:()=>t("/queue"),children:a.jsx(Ct,{})})]})]})]})}const Or=A.button`
    width: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    color: #eee;
    font-size: 0.8rem;

    &.active {
        color: ${he.theme.COLOR_PURPLE_PROMINENT};
    }

    svg {
        width: 1rem;
        height: 1rem;
    }
`;function Bs({active:t,label:e,onClick:n,onSelectAll:r}){return a.jsxs(a.Fragment,{children:[a.jsxs(Or,{className:`clickable ${t?"active":""}`,onClick:n,children:[a.jsx(_n,{}),e]}),t&&a.jsxs(Or,{className:"clickable",onClick:r,children:[a.jsx(Mo,{}),"Select All"]})]})}const dl=A.div`
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
`;function Un({header:t,items:e,footer:n}){return a.jsxs(dl,{children:[t&&a.jsx("div",{className:"panel-content",children:t}),e&&a.jsx("div",{className:"items",children:e.map(({icon:r,text:s,isActive:i,onClick:o})=>a.jsxs("button",{className:`clickable item ${i?"active":""}`,onClick:o,children:[r,a.jsx("span",{className:"text",children:s})]},s))}),n&&a.jsx("div",{className:"detail-info",children:n})]})}function ul({children:t}){const[{isOpen:e,title:n,content:r},s]=R(M);return a.jsxs(a.Fragment,{children:[t,a.jsx(So,{title:n,isOpen:e,onClose:()=>s({isOpen:!1}),children:r})]})}class hl extends pe{constructor(){super();U(this,"init",!1);U(this,"listener");this.state={loaded:!1,playlists:[]},this.listener=new fe,this.listener.connect({onCreate:n=>{this.set({playlists:[n,...this.state.playlists]})},onDelete:n=>{this.set({playlists:this.state.playlists.filter(r=>r.id!==n)})},onUpdate:({id:n,name:r})=>{this.set({playlists:this.state.playlists.map(s=>s.id===n?{...s,name:r}:s)})},onChangeOrder:n=>{this.set({playlists:this.state.playlists.sort((r,s)=>n.indexOf(r.id.toString())-n.indexOf(s.id.toString()))})},onAddMusic:n=>{this.set({playlists:this.state.playlists.map(r=>r.id===n.id?{...r,...n,musicCount:r.musicCount+1}:r)})},onRemoveMusic:n=>{this.set({playlists:this.state.playlists.map(r=>r.id===n.id?{...r,...n,musicCount:r.musicCount-n.musicIds.length}:r)})},onChangeMusicOrder:({id:n,musicIds:r})=>{this.set({playlists:this.state.playlists.map(s=>s.id===n?{...s,musics:s.headerMusics.sort((i,o)=>r.indexOf(i.id.toString())-r.indexOf(o.id.toString()))}:s)})}})}get state(){return this.init||(this.init=!0,this.sync()),super.state}set state(n){super.state=n}async sync(){el().then(({data:n})=>{this.set({loaded:!0,playlists:n.allPlaylist})})}}const Fn=new hl;function fl({id:t,onPlaylistClick:e}){const[{musicMap:n}]=R(z),[{playlists:r}]=R(Fn),s=r.find(i=>i.id===t);return s?a.jsx(Un,{header:e&&a.jsxs("button",{className:"panel-album clickable linkable",onClick:()=>{M.close(),setTimeout(e,100)},children:[a.jsx(kn,{className:"album-cover-grid",images:s.headerMusics.map(i=>{var o;return((o=n.get(i.id))==null?void 0:o.album.cover)??""})}),a.jsxs("div",{children:[a.jsxs("div",{className:"panel-sub-title",children:[s.musicCount," songs"]}),a.jsx("div",{className:"panel-sub-content",children:s.name})]})]}),items:[{icon:a.jsx(Io,{}),text:"Rename",onClick:async()=>{const i=await F.prompt("Rename playlist",s.name);i&&fe.update(t,i),M.close()}},{icon:a.jsx(jn,{}),text:"Delete",onClick:()=>{fe.delete(t),M.close()}}]}):null}const pl=A.button`
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
`;function Is({name:t,headerMusics:e,musicCount:n,onClick:r,onLongPress:s}){const[{musicMap:i}]=R(z);return a.jsxs(pl,{className:"clickable",onClick:r,onContextMenu:o=>{o.preventDefault(),s==null||s()},children:[a.jsx(kn,{className:"cover",images:e.map(o=>{var l;return((l=i.get(o.id))==null?void 0:l.album.cover)??""})}),a.jsxs("div",{className:"title",children:[a.jsx("div",{className:"album-name",children:t}),a.jsxs("div",{className:"song-count",children:[n," songs"]})]}),s&&a.jsx("button",{className:"icon-button",onClick:o=>{o.stopPropagation(),s()},children:a.jsx(Yr,{})})]})}function ml({musicId:t}){const[{playlists:e}]=R(Fn);return a.jsx(Un,{footer:a.jsx(a.Fragment,{children:e.map(n=>a.jsx(Is,{...n,onClick:()=>{fe.addMusic(n.id,t),F.toast("Added to playlist"),M.close()}},n.id))})})}A.button`
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
`;const q=A.button`
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
`,gl=[{name:"Music",path:"/"},{name:"Favorite",path:"/favorite"},{name:"Album",path:"/album"},{name:"Artist",path:"/artist"},{name:"Playlist",path:"/playlist"},{name:"Setting",path:"/setting"}],yl=A.header`
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
`,bl=A.nav`
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
`,xl=A.a`
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
`;function wl(){const t=Ws(),e=m.useRef(null);return m.useEffect(()=>{const n=e.current;if(n){const r=n.querySelector("a.active");if(r){const{left:s,width:i}=r.getBoundingClientRect(),{width:o}=e.current.getBoundingClientRect(),l=s+i/2-o/2;e.current.scrollBy({left:l,behavior:"smooth"})}}},[t.pathname]),a.jsx(yl,{children:a.jsx(bl,{ref:e,children:a.jsx("ul",{children:gl.map(n=>a.jsx("li",{children:a.jsx(xl,{as:Nr,to:n.path,className:t.pathname===n.path?"active":"",children:n.name})},n.name))})})})}const vl=A.div`
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
`;function kl(){return a.jsx(vl,{children:a.jsxs("button",{onClick:()=>history.back(),children:[a.jsx(Jr,{})," ",a.jsx("span",{className:"back-text",children:"Back"})]})})}function Rr({isSubPage:t,disablePlayer:e=!1,animationDirection:n="None"}){const[r,s]=ze(),i=m.useRef(null),o=m.useRef(!0),l={in:{opacity:1,x:0,y:0},out:{opacity:0,x:n==="RightToLeft"?50:0,y:n==="BottomToTop"?50:0}};return m.useEffect(()=>(i.current&&o.current&&(i.current.scrollTop=parseInt(r.get("py")||"0"),o.current=!1),()=>{o.current=!0}),[i,o,location.pathname]),m.useEffect(()=>{if(!i.current)return;let d=null;const u=()=>{d&&clearTimeout(d),d=setTimeout(()=>{var c;r.set("py",((c=i.current)==null?void 0:c.scrollTop.toString())||"0"),s(r,{replace:!0})},50)};return i.current.addEventListener("scroll",u),()=>{var c;d&&clearTimeout(d),(c=i.current)==null||c.removeEventListener("scroll",u)}},[location.pathname,i,r,s]),a.jsxs("main",{children:[t?a.jsx(kl,{}):a.jsx(wl,{}),a.jsx(gn.div,{ref:i,className:"container",animate:"in",exit:"out",initial:"out",variants:l,transition:{duration:.25},children:a.jsx(m.Suspense,{fallback:a.jsx(Ee,{}),children:a.jsx(Vs,{})})},location.pathname),!e&&a.jsx(ll,{})]})}const je=A.div`
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
`;function zn({items:t,onDragEnd:e,children:n}){const r=Zs(Wn(ci),Wn(ai,{coordinateGetter:oi}));return a.jsx(ei,{sensors:r,modifiers:[ti,ni],collisionDetection:ri,onDragEnd:e,children:a.jsx(si,{items:t,strategy:ii,children:n})})}class Cl extends pe{constructor(){super();U(this,"init",!1);this.state={loaded:!1,albums:[]}}get state(){return this.init||(this.init=!0,this.sync()),super.state}set state(n){super.state=n}async sync(){Qc().then(({data:n})=>{this.set({loaded:!0,albums:n.allAlbums})})}}const Ds=new Cl,El=A.div`
    display: grid;
    grid-gap: 1rem;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    padding: 1rem;
    list-style: none;

    @media (max-width: 600px) {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
`,Wt=100;function Sl(){const t=Z(),[e,n]=ze(),[{albums:r,loaded:s}]=R(Ds),[i,o]=m.useState(Number(e.get("l"))||Wt),l=async()=>{const c=await F.prompt("Search keyword",e.get("q")||"");n({q:c})},d=()=>{o(i+Wt),e.set("l",(i+Wt).toString()),n(e,{replace:!0})},u=r==null?void 0:r.filter(c=>{var h,y;return c.name.toLowerCase().includes(((h=e.get("q"))==null?void 0:h.toLowerCase())||"")||c.artist.name.toLowerCase().includes(((y=e.get("q"))==null?void 0:y.toLowerCase())||"")});return a.jsxs(a.Fragment,{children:[a.jsx(je,{children:a.jsx(q,{style:{width:"160px"},onClick:l,children:e.get("q")||"Search"})}),!s&&a.jsx(Ee,{}),a.jsx(El,{children:s&&u.slice(0,i).map(c=>a.jsx(Wr,{albumName:c.name,albumCover:c.cover,artistName:c.artist.name,onClick:()=>t(`/album/${c.id}`)},c.id))}),s&&u.length>i&&a.jsx("div",{style:{padding:"0 16px 16px"},children:a.jsx(q,{style:{width:"100%",justifyContent:"center"},onClick:d,children:"Load More"})})]})}const _l=A.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    padding: 2rem 1rem;
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
`,jl=A.ul`
    margin-top: 2rem;
    padding: 0;
    list-style: none;
`;function Al(){const t=Z(),{id:e}=un(),{data:n}=hn(["album",e],()=>Zc(e).then(s=>s.data.album),{enabled:!!e}),[{musicMap:r}]=R(z);return n?a.jsxs(a.Fragment,{children:[a.jsxs(_l,{children:[a.jsx(ue,{className:"album-cover",src:n.cover.replace("/resized","")||"",alt:n==null?void 0:n.name}),a.jsx("div",{className:"album-title",children:n==null?void 0:n.name}),a.jsxs("div",{className:"row",children:[a.jsx(Nr,{className:"album-artist",to:`/artist/${n==null?void 0:n.artist.id}`,children:n==null?void 0:n.artist.name}),"-",a.jsx("span",{className:"album-year",children:n==null?void 0:n.publishedYear})]}),a.jsx("div",{className:"play-all",children:a.jsx("button",{onClick:()=>v.reset(n.musics.map(s=>s.id)),children:a.jsx(X,{})})})]}),a.jsx(jl,{children:n.musics.map(({id:s})=>{const i=r.get(s);return i?a.jsx(be,{albumName:i.album.name,artistName:i.artist.name,trackNumber:i.trackNumber,musicName:i.name,musicCodec:i.codec,isLiked:i.isLiked,onClick:()=>v.add(i.id),onLongPress:()=>M.open({title:"Related to this music",content:a.jsx(ye,{id:i.id,onArtistClick:()=>t(`/artist/${i.artist.id}`)})})},i.id):null})})]}):null}class Ol extends pe{constructor(){super();U(this,"init",!1);this.state={loaded:!1,artists:[]}}get state(){return this.init||(this.init=!0,this.sync()),super.state}set state(n){super.state=n}async sync(){Xc().then(({data:n})=>{this.set({loaded:!0,artists:n.allArtists})})}}const $s=new Ol,Vt=150;function Rl(){const t=Z(),[e,n]=ze(),[{artists:r,loaded:s}]=R($s),[i,o]=m.useState(Number(e.get("l"))||Vt),l=()=>{o(i+Vt),e.set("l",(i+Vt).toString()),n(e,{replace:!0})},d=async()=>{const c=await F.prompt("Search keyword",e.get("q")||"");n({q:c})},u=r==null?void 0:r.filter(c=>{var h;return c.name.toLowerCase().includes(((h=e.get("q"))==null?void 0:h.toLowerCase())||"")});return a.jsxs(a.Fragment,{children:[a.jsx(je,{children:a.jsx(q,{style:{width:"160px"},onClick:d,children:e.get("q")||"Search"})}),!s&&a.jsx(Ee,{}),s&&u.slice(0,i).map(c=>{var h;return a.jsx(Co,{artistName:c.name,artistCover:((h=c.latestAlbum)==null?void 0:h.cover)||"",musicCount:c.musicCount,albumCount:c.albumCount,onClick:()=>t(`/artist/${c.id}`)},c.id)}),s&&u.length>i&&a.jsx("div",{style:{padding:"0 16px 16px"},children:a.jsx(q,{style:{width:"100%",justifyContent:"center"},onClick:l,children:"Load More"})})]})}const Nl=A.section`
    .artist-name {
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 1.25rem;
        font-weight: bold;
        margin: 3rem 0;

        img {
            width: 150px;
            height: 150px;
            object-fit: cover;
            border-radius: 50%;
            margin-bottom: 1rem;
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
`;function Tl(){var s;const t=Z(),{id:e}=un(),{data:n}=hn(["artist",e],()=>Gc(e).then(i=>i.data.artist),{enabled:!!e}),[{musicMap:r}]=R(z);return n?a.jsxs(Nl,{children:[a.jsxs("div",{className:"artist-name",children:[a.jsx(ue,{src:((s=n.latestAlbum)==null?void 0:s.cover)||"",alt:n.name}),n.name]}),a.jsxs("div",{className:"section-title",children:["Albums (",n.albums.length,")"]}),a.jsx("div",{className:"albums",children:n.albums.map(i=>a.jsx(Wr,{albumCover:i.cover,albumName:i.name,artistName:i.publishedYear,onClick:()=>t(`/album/${i.id}`)},i.id))}),a.jsxs("div",{className:"section-title",children:["Songs (",n.musics.length,")",a.jsxs(q,{onClick:()=>v.reset(n.musics.map(i=>i.id)),children:[a.jsx(X,{})," Play"]})]}),a.jsx("div",{className:"musics",children:n.musics.map(({id:i})=>{const o=r.get(i);return o?a.jsx(be,{artistName:o.album.name,albumCover:o.album.cover,albumName:o.album.name,musicName:o.name,musicCodec:o.codec,isLiked:o.isLiked,onClick:()=>v.add(o.id),onLongPress:()=>M.open({title:"Related to this music",content:a.jsx(ye,{id:o.id,onAlbumClick:()=>t(`/album/${o.album.id}`)})})},o.id):null})})]}):null}const Kt=200;function Ll(){const t=Z(),[e,n]=ze(),[{musics:r,loaded:s}]=R(z),[i,o]=m.useState(Number(e.get("l"))||Kt),l=async()=>{const c=await F.prompt("Search keyword",e.get("q")||"");n({q:c})},d=()=>{o(i+Kt),e.set("l",(i+Kt).toString()),n(e,{replace:!0})},u=r==null?void 0:r.filter(c=>{var h,y,b;return c.isLiked&&(c.name.toLowerCase().includes(((h=e.get("q"))==null?void 0:h.toLowerCase())||"")||c.artist.name.toLowerCase().includes(((y=e.get("q"))==null?void 0:y.toLowerCase())||"")||c.album.name.toLowerCase().includes(((b=e.get("q"))==null?void 0:b.toLowerCase())||""))});return a.jsxs(a.Fragment,{children:[a.jsxs(je,{children:[a.jsx(q,{style:{width:"160px"},onClick:l,children:e.get("q")||"Search"}),a.jsxs(q,{onClick:()=>v.reset(u.map(c=>c.id)),children:[a.jsx(X,{})," Play"]})]}),!s&&a.jsx(Ee,{}),s&&u.slice(0,i).map(c=>a.jsx(be,{albumName:c.album.name,albumCover:c.album.cover,artistName:c.artist.name,musicName:c.name,musicCodec:c.codec,isLiked:c.isLiked,onClick:()=>v.add(c.id),onLongPress:()=>M.open({title:"Related to this music",content:a.jsx(ye,{id:c.id,onAlbumClick:()=>t(`/album/${c.album.id}`),onArtistClick:()=>t(`/artist/${c.artist.id}`)})})},c.id)),s&&u.length>i&&a.jsx("div",{style:{padding:"0 16px 16px"},children:a.jsx(q,{style:{width:"100%",justifyContent:"center"},onClick:d,children:"Load More"})})]})}const Jt=200;function Pl(){const t=Z(),[e,n]=ze(),[{musics:r,loaded:s}]=R(z),[i,o]=m.useState(Number(e.get("l"))||Jt),l=async()=>{const c=await F.prompt("Search keyword",e.get("q")||"");e.set("q",c),n(e,{replace:!0})},d=()=>{o(i+Jt),e.set("l",(i+Jt).toString()),n(e,{replace:!0})},u=r==null?void 0:r.filter(c=>{var h,y,b;return c.name.toLowerCase().includes(((h=e.get("q"))==null?void 0:h.toLowerCase())||"")||c.artist.name.toLowerCase().includes(((y=e.get("q"))==null?void 0:y.toLowerCase())||"")||c.album.name.toLowerCase().includes(((b=e.get("q"))==null?void 0:b.toLowerCase())||"")});return a.jsxs(a.Fragment,{children:[a.jsxs(je,{children:[a.jsx(q,{style:{width:"160px"},onClick:l,children:e.get("q")||"Search"}),a.jsxs(q,{onClick:()=>v.reset(u.map(c=>c.id)),children:[a.jsx(X,{})," Play"]})]}),!s&&a.jsx(Ee,{}),s&&u.slice(0,i).map(c=>a.jsx(be,{albumName:c.album.name,albumCover:c.album.cover,artistName:c.artist.name,musicName:c.name,musicCodec:c.codec,isLiked:c.isLiked,onClick:()=>v.add(c.id),onLongPress:()=>M.open({title:"Related to this music",content:a.jsx(ye,{id:c.id,onAlbumClick:()=>t(`/album/${c.album.id}`),onArtistClick:()=>t(`/artist/${c.artist.id}`)})})},c.id)),s&&u.length>i&&a.jsx("div",{style:{padding:"0 16px 16px"},children:a.jsx(q,{style:{width:"100%",justifyContent:"center"},onClick:d,children:"Load More"})})]})}const Ml=A.div`
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
`;function Bl(){const t=Z(),[e]=R(v),[{musicMap:n}]=R(z),[r,s]=m.useState("50%"),i=e.selected!==null?n.get(e.items[e.selected]):null,o=d=>{const{width:u,left:c,right:h}=d.currentTarget.getBoundingClientRect();let y=d.touches?d.touches[0].clientX:d.clientX;y=y<c?c:y>h?h:y;const b=(y-c)/u,p=(i==null?void 0:i.duration)||1;v.seek(p*b)},l=d=>{var u;if(d.buttons===1){o(d);return}((u=d.touches)==null?void 0:u.length)===1&&o(d)};return m.useEffect(()=>{let d=null;if(!e.isPlaying){s("50%");return}const u=()=>{const c=()=>Math.floor(Math.random()*90+10)+"%";s(`${c()} ${c()} ${c()} ${c()}`),d=setTimeout(u,1e3)};return u(),()=>{d&&clearTimeout(d)}},[e.isPlaying]),a.jsxs(Ml,{as:gn.div,animate:"in",exit:"out",initial:"out",variants:{in:{opacity:1,y:0},out:{opacity:0,y:50}},transition:{duration:.25},children:[a.jsxs("div",{className:"album-art",children:[a.jsx("img",{className:"background",style:{borderRadius:r},src:Ue(i==null?void 0:i.album.cover),alt:i==null?void 0:i.album.name}),a.jsx("div",{className:"foreground-wrapper",children:a.jsx("img",{className:"foreground",style:{borderRadius:r},src:Ue(i==null?void 0:i.album.cover.replace("/resized","")),alt:i==null?void 0:i.album.name})})]}),a.jsx("div",{className:"title-info",children:a.jsxs("button",{className:"clickable title",onClick:()=>i&&M.open({title:"Related to this music",content:a.jsx(ye,{id:i.id,onAlbumClick:()=>t(`/album/${i.album.id}`),onArtistClick:()=>t(`/artist/${i.artist.id}`)})}),children:[a.jsx("div",{className:"name",children:i==null?void 0:i.name}),a.jsx("div",{className:"artist",children:i==null?void 0:i.artist.name})]})}),a.jsxs("div",{className:"time-info",children:[a.jsx("div",{className:"current-time",children:Qt(e.currentTime)}),a.jsx("div",{className:"total-time",children:Qt((i==null?void 0:i.duration)||0)})]}),a.jsx("div",{className:"progress",role:"slider",tabIndex:0,"aria-valuenow":e.progress,"aria-valuemin":0,"aria-valuemax":100,onClick:o,onMouseMove:l,onTouchMove:l,children:a.jsx("div",{className:"bar",style:{transform:`translate(-${100-e.progress}%, 0)`}})}),a.jsxs("div",{className:"action",children:[a.jsxs("button",{className:"icon-button mode",onClick:()=>v.changeRepeatMode(),children:[e.repeatMode==="all"&&a.jsx(Gr,{}),e.repeatMode==="one"&&a.jsx(Kr,{}),e.repeatMode==="none"&&a.jsx(Qr,{})]}),a.jsxs("div",{className:"playback",children:[a.jsx("button",{className:"icon-button skip-back",onClick:()=>v.prev(),children:a.jsx(X,{})}),a.jsx("button",{className:"icon-button",onClick:()=>e.isPlaying?v.pause():v.play(),children:e.isPlaying?a.jsx(Xr,{}):a.jsx(X,{})}),a.jsx("button",{className:"icon-button skip-forward",onClick:()=>v.next(),children:a.jsx(X,{})})]}),a.jsx("button",{className:`icon-button shuffle ${e.shuffle?"active":""}`,onClick:()=>v.toggleShuffle(),children:a.jsx(Zr,{})})]}),a.jsx("div",{className:"footer",children:a.jsx("button",{className:"icon-button",onClick:()=>history.back(),children:a.jsx(Jr,{})})})]})}const Il=A.div`
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
`;function Dl({playlist:t,onClick:e,onLongPress:n}){const{attributes:r,listeners:s,setNodeRef:i,transform:o,transition:l}=fn({id:t.id}),d={transform:pn.Transform.toString(o),transition:l};return a.jsxs(Il,{ref:i,style:d,...r,children:[a.jsx("div",{className:"icon-button",...s,style:{cursor:"grab",touchAction:"none"},children:a.jsx(Ct,{})}),a.jsx("div",{style:{flex:1,maxWidth:"calc(100% - 4rem)"},children:a.jsx(Is,{...t,onClick:e,onLongPress:n},t.id)})]})}function $l(){const t=Z(),[{playlists:e,loaded:n},r]=R(Fn),s=async()=>{const o=await F.prompt("Enter playlist name");fe.create(o)},i=o=>{const{active:l,over:d}=o;if(d&&l.id!==d.id){const u=e.findIndex(y=>y.id===l.id),c=e.findIndex(y=>y.id===d.id),h=mn(e,u,c);fe.changeOrder(h.map(y=>y.id)),r(y=>({...y,playlists:h}))}};return a.jsxs(a.Fragment,{children:[a.jsxs(je,{children:[a.jsx("div",{}),a.jsx(q,{onClick:s,children:"New Playlist"})]}),a.jsxs(zn,{items:e.map(o=>o.id),onDragEnd:i,children:[!n&&a.jsx(Ee,{}),n&&(e==null?void 0:e.map(o=>a.jsx(Dl,{playlist:o,onClick:()=>t(`/playlist/${o.id}`),onLongPress:()=>M.open({content:a.jsx(fl,{id:o.id,onPlaylistClick:()=>t(`/playlist/${o.id}`)})})},o.id)))]})]})}const ql=A.div`
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
            fill: ${he.theme.COLOR_PURPLE_PROMINENT};
        }
    }
`,Ul=A.div`
    display: flex;
    flex-direction: column;
    flex: 1;

    .header {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        background-color: #111;
        padding: 2rem 1rem;

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
        background-color: ${he.theme.COLOR_PURPLE_PROMINENT};

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
`;function Fl({music:t,isSelectMode:e,isSelected:n,onClick:r,onSelect:s,onLongPress:i}){const{attributes:o,listeners:l,setNodeRef:d,transform:u,transition:c}=fn({id:t.id}),h={transform:pn.Transform.toString(u),transition:c};return a.jsxs(ql,{ref:d,style:h,...o,children:[e?a.jsx("button",{className:`icon-button checkbox ${n?"active":""} `,onClick:s,children:a.jsx(_n,{})}):a.jsx("div",{className:"icon-button checkbox",...l,style:{cursor:"grab",touchAction:"none"},children:a.jsx(Ct,{})}),a.jsx("div",{style:{flex:1,maxWidth:"calc(100% - 4rem)"},children:a.jsx(be,{albumName:t.album.name,albumCover:t.album.cover,artistName:t.artist.name,musicName:t.name,musicCodec:t.codec,isLiked:t.isLiked,onClick:e?s:r,onLongPress:i})})]})}function zl(){const t=Z(),{id:e}=un(),n=Ks(),{data:r}=hn(["playlist",e],()=>tl(e).then(c=>c.data.playlist),{enabled:!!e}),[{musicMap:s}]=R(z),[i,o]=m.useState(!1),[l,d]=m.useState([]),u=c=>{const{active:h,over:y}=c;if(r&&y&&h.id!==y.id){const b=r.musics.findIndex(({id:x})=>x===h.id),p=r.musics.findIndex(({id:x})=>x===y.id),g=mn(r.musics,b,p);fe.changeMusicOrder(r.id,g.map(({id:x})=>x)),n.setQueryData(["playlist",e],()=>({...r,musics:g}))}};return m.useEffect(()=>{const c=()=>{n.invalidateQueries(["playlist",e])},h=()=>{n.invalidateQueries(["playlist",e])};return w.on(mt,c),w.on(Be,h),()=>{w.off(mt,c),w.off(Be,h)}},[e,n]),m.useEffect(()=>{d([])},[i]),r?a.jsxs(Ul,{children:[a.jsxs("div",{className:"header",children:[a.jsx(kn,{className:"cover",images:r.musics.slice(0,16).map(c=>{var h;return((h=s.get(c.id))==null?void 0:h.album.cover)??""})}),a.jsx("h1",{children:r.name})]}),a.jsxs(je,{children:[a.jsx("div",{style:{display:"flex",alignItems:"center",gap:"1rem"},children:a.jsx(Bs,{active:i,label:i?`${l.length} selected`:`${r.musics.length} musics`,onClick:()=>o(!i),onSelectAll:()=>d(r.musics.map(({id:c})=>c))})}),a.jsxs(q,{onClick:()=>v.reset(r.musics.map(({id:c})=>c)),children:[a.jsx(X,{})," Play"]})]}),a.jsx("div",{style:{flex:1},children:a.jsx(zn,{items:r.musics.map(({id:c})=>c),onDragEnd:u,children:r.musics.map(({id:c})=>{const h=s.get(c);return h?a.jsx(Fl,{music:h,isSelectMode:i,isSelected:l.includes(h.id),onClick:()=>v.add(h.id),onSelect:()=>{l.includes(h.id)?d(l.filter(y=>y!==h.id)):d([...l,h.id])},onLongPress:()=>M.open({content:a.jsx(ye,{id:h.id,onAlbumClick:()=>t(`/album/${h.album.id}`),onArtistClick:()=>t(`/artist/${h.artist.id}`)})})},h.id):null})})}),i&&l.length>0&&a.jsx("div",{className:"select-actions",children:a.jsxs("button",{className:"clickable",onClick:async()=>{fe.removeMusic(r.id,l),o(!1)},children:[a.jsx(jn,{}),a.jsx("span",{children:"Delete"})]})})]}):null}const Hl=A.div`
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
                color: ${he.theme.COLOR_PURPLE_PROMINENT};
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
        background-color: ${he.theme.COLOR_PURPLE_PROMINENT};

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
`,Wl=A.li`
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
                fill: ${he.theme.COLOR_PURPLE_PROMINENT};
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
`,Vl=({music:t,isCurrentMusic:e,isSelectMode:n,isSelected:r,onSelect:s,onClick:i,onLongPress:o})=>{const{attributes:l,listeners:d,setNodeRef:u,transform:c,transition:h}=fn({id:t.id}),y={transform:pn.Transform.toString(c),transition:h};return a.jsxs(Wl,{ref:u,...l,style:y,className:e?"now-playing":"",children:[n?a.jsx("button",{className:`icon-button checkbox ${r?"active":""}`,onClick:s,children:a.jsx(_n,{})}):a.jsx("button",{...d,className:"icon-button checkbox",style:{cursor:"grab",touchAction:"none"},children:a.jsx(Ct,{})}),a.jsx("div",{style:{flex:1,maxWidth:"calc(100% - 4rem)"},children:a.jsx(be,{musicName:t.name,artistName:t.artist.name,albumName:t.album.name,albumCover:t.album.cover,isLiked:t.isLiked,onClick:n?s:i,onLongPress:o},t.id)})]})};function Kl(){const t=Z(),[{items:e,selected:n},r]=R(v),[{musicMap:s}]=R(z),i=m.useRef(null),[o,l]=m.useState(!1),[d,u]=m.useState([]),c=async h=>{const{active:y,over:b}=h;if(b){if(y.id===b.id)return;r(p=>{const g=p.items[p.selected],x=p.items.indexOf(y.id.toString()),E=p.items.indexOf(b.id.toString()),k=mn(p.items,x,E);return g?{...p,items:k,selected:k.indexOf(g)}:{...p,items:k}})}};return m.useEffect(()=>{u([])},[o]),m.useEffect(()=>{if(i.current){const h=i.current.children.item(n||0);if(!h)return;i.current.scrollTo({top:h.offsetTop-60,behavior:"smooth"})}},[i,n]),a.jsxs(Hl,{as:gn.div,animate:"in",exit:"out",initial:"out",variants:{in:{opacity:1,y:0},out:{opacity:0,y:50}},transition:{duration:.25},children:[a.jsx("div",{className:"header",children:a.jsx("div",{style:{display:"flex",alignItems:"center",gap:"1rem"},children:a.jsx(Bs,{label:o?`${d.length} selected`:`${e==null?void 0:e.length} musics`,active:o,onClick:()=>l(!o),onSelectAll:()=>u(e)})})}),a.jsx("ul",{className:"container",ref:i,children:a.jsx(zn,{items:e,onDragEnd:c,children:e==null?void 0:e.map((h,y)=>{const b=s.get(h);return b?a.jsx(Vl,{music:b,isCurrentMusic:n===y,isSelectMode:o,isSelected:d.includes(h),onSelect:()=>{d.includes(h)?u(d.filter(p=>p!==h)):u([...d,h])},onClick:()=>{v.select(y)},onLongPress:()=>M.open({content:a.jsx(ye,{id:b.id,onAlbumClick:()=>t(`/album/${b.album.id}`),onArtistClick:()=>t(`/artist/${b.artist.id}`)})})},h):null})})}),o&&d.length>0&&a.jsx("div",{className:"select-actions",children:a.jsxs("button",{className:"clickable",onClick:()=>{v.removeItems(d),l(!1)},children:[a.jsx(jn,{}),a.jsx("span",{children:"Delete"})]})}),a.jsxs("div",{className:"footer",children:[a.jsx("div",{}),a.jsx("button",{className:"icon-button",onClick:()=>history.back(),children:a.jsx(Lo,{})})]})]})}class Jl extends pe{constructor(){super();U(this,"init",!1);U(this,"listener");this.state={connectors:[]},this.listener=new ms,this.listener.connect({onConnectors:n=>{this.set({connectors:n})}})}get state(){return this.init||(this.init=!0,this.sync()),super.state}set state(n){super.state=n}async sync(){w.emit("get-connectors")}}const Yl=new Jl,Xl=A.div`
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
`;function Gl(){const[{connectors:t}]=R(Yl),[{playMode:e,insertMode:n}]=R(v),[r,s]=m.useState(""),i=async o=>{o&&!await F.confirm("Please only proceed with the update if it is recommended by the developer. Are you sure you want to proceed?")||w.emit("sync-music",{force:o})};return m.useEffect(()=>(w.on("sync-music",o=>{(o==="done"||o==="error")&&(o==="done"?F.toast("Completed sync music"):o==="error"&&F.toast("Error while sync music"),setTimeout(()=>{s("")},1e3)),s(o)}),()=>{w.off("sync-music")}),[]),a.jsxs(Xl,{children:[a.jsxs("section",{children:[a.jsx("h3",{children:"Synchronization"}),a.jsx("p",{children:"Sync from your server"}),r&&a.jsx("p",{className:"progress-text",children:r}),a.jsxs("div",{style:{display:"flex",gap:"1rem"},children:[a.jsx(q,{onClick:()=>i(!1),children:"Sync"}),a.jsx(q,{onClick:()=>i(!0),children:"Force Sync"})]})]}),a.jsxs("section",{children:[a.jsx("h3",{children:"Play Mode"}),a.jsx("p",{children:"When you add a music to the queue, It will..."}),a.jsxs("div",{className:"input-section",children:[a.jsxs("label",{children:[a.jsx("input",{type:"radio",name:"play-mode",value:"immediately",defaultChecked:e==="immediately",onChange:()=>v.setPlayMode("immediately")}),"Play immediately"]}),a.jsxs("label",{children:[a.jsx("input",{type:"radio",name:"play-mode",value:"later",defaultChecked:e==="later",onChange:()=>v.setPlayMode("later")}),"Play later"]})]}),a.jsxs("div",{className:"input-section",children:[a.jsxs("label",{children:[a.jsx("input",{type:"radio",name:"insert-mode",value:"first",defaultChecked:n==="first",onChange:()=>v.setInsertMode("first")}),"Add to the top of the queue"]}),a.jsxs("label",{children:[a.jsx("input",{type:"radio",name:"insert-mode",value:"last",defaultChecked:n==="last",onChange:()=>v.setInsertMode("last")}),"Add to the bottom of the queue"]}),a.jsxs("label",{children:[a.jsx("input",{type:"radio",name:"insert-mode",value:"after",defaultChecked:n==="after",onChange:()=>v.setInsertMode("after")}),"Add to the next of the current music"]})]})]}),a.jsxs("section",{children:[a.jsx("h3",{children:"Connectors"}),t.map(o=>a.jsxs("div",{className:"connector",children:[a.jsx("span",{children:o.userAgent}),a.jsx("span",{className:"date",children:new Date(o.connectedAt).toLocaleDateString()}),o.id===w.id?a.jsx("span",{className:"this-device",children:"This device"}):a.jsx("button",{className:"kick",onClick:()=>ms.remove(o.id),children:"Remove"})]},o.id))]}),a.jsxs("section",{children:[a.jsx("h3",{children:"Have a problem?"}),a.jsx("div",{style:{display:"flex",gap:"1rem"},children:a.jsx(q,{onClick:()=>window.location.reload(),children:"Try Refresh"})})]})]})}const Ql=new Js({defaultOptions:{queries:{refetchOnWindowFocus:!1,retry:!1,suspense:!0}}}),Zl=Ys([{element:a.jsx(Rr,{}),children:[{path:"/",element:a.jsx(Pl,{})},{path:"/favorite",element:a.jsx(Ll,{})},{path:"/album",element:a.jsx(Sl,{})},{path:"/artist",element:a.jsx(Rl,{})},{path:"/playlist",element:a.jsx($l,{})},{path:"/setting",element:a.jsx(Gl,{})}]},{element:a.jsx(Rr,{isSubPage:!0,animationDirection:"RightToLeft"}),children:[{path:"/album/:id",element:a.jsx(Al,{})},{path:"/artist/:id",element:a.jsx(Tl,{})},{path:"/playlist/:id",element:a.jsx(zl,{})}]},{children:[{path:"/player",element:a.jsx(Bl,{})}]},{children:[{path:"/queue",element:a.jsx(Kl,{})}]},{element:a.jsx("div",{children:"Page Not Found"}),path:"*"}]);function ed(){return m.useEffect(()=>{w.on("resync",()=>{z.init=!1,$s.init=!1,Ds.init=!1}),window.addEventListener("focus",()=>{w.connected||w.connect()}),window.addEventListener("beforeunload",()=>{w.disconnect()})},[]),a.jsx(ul,{children:a.jsx(Xs,{client:Ql,children:a.jsx(Gs,{router:Zl})})})}Yt.createRoot(document.getElementById("root")).render(a.jsx(Qs.StrictMode,{children:a.jsx(ed,{})}));
