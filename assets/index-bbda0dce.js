var ii=Object.defineProperty;var oi=(t,e,n)=>e in t?ii(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var W=(t,e,n)=>(oi(t,typeof e!="symbol"?e+"":e,n),n);import{r as m,a as ai,c as U,b as rs,_ as ci,u as ne,d as li,L as Xs,e as Je,O as di,f as An,g as _n,h as ui,Q as hi,i as fi,j as mi,k as pi,R as gi}from"./vendor-fa7a2e94.js";import{u as yi,a as is,D as bi,r as xi,b as wi,c as vi,S as Ci,v as Ei,s as ki,K as Ai,P as _i,d as Sn,C as Nn,e as jn}from"./sortable-b0dcf770.js";import{m as On}from"./motion-e6209d02.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function n(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(r){if(r.ep)return;r.ep=!0;const i=n(r);fetch(r.href,i)}})();var Qs={exports:{}},_t={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Si=m,Ni=Symbol.for("react.element"),ji=Symbol.for("react.fragment"),Oi=Object.prototype.hasOwnProperty,Ri=Si.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,Ti={key:!0,ref:!0,__self:!0,__source:!0};function Zs(t,e,n){var s,r={},i=null,o=null;n!==void 0&&(i=""+n),e.key!==void 0&&(i=""+e.key),e.ref!==void 0&&(o=e.ref);for(s in e)Oi.call(e,s)&&!Ti.hasOwnProperty(s)&&(r[s]=e[s]);if(t&&t.defaultProps)for(s in e=t.defaultProps,e)r[s]===void 0&&(r[s]=e[s]);return{$$typeof:Ni,type:t,key:i,ref:o,props:r,_owner:Ri.current}}_t.Fragment=ji;_t.jsx=Zs;_t.jsxs=Zs;Qs.exports=_t;var a=Qs.exports,cn={},os=ai;cn.createRoot=os.createRoot,cn.hydrateRoot=os.hydrateRoot;var q={},St={},Ge={};Object.defineProperty(Ge,"__esModule",{value:!0});Ge.findOrCreateContainer=void 0;var Li=function(t){if(!document.getElementById(t)){var e=document.createElement("div");e.id=t,document.body.appendChild(e)}return document.getElementById(t)};Ge.findOrCreateContainer=Li;Object.defineProperty(St,"__esModule",{value:!0});St.toast=void 0;var Pi=Ge,as=function(){var t=(0,Pi.findOrCreateContainer)("toast-container");return t.classList.add("toast__container"),t}();function Mi(t,e){as.childNodes.forEach(function(s){s.remove()});var n=document.createElement("div");n.textContent=t,n.classList.add("toast__content"),e!=null&&e.onClick&&(n.classList.add("toast__event"),n.addEventListener("click",e.onClick)),as.appendChild(n),n.addEventListener("animationend",function(){n.remove()})}St.toast=Mi;var me={},cs=U&&U.__spreadArray||function(t,e,n){if(n||arguments.length===2)for(var s=0,r=e.length,i;s<r;s++)(i||!(s in e))&&(i||(i=Array.prototype.slice.call(e,0,s)),i[s]=e[s]);return t.concat(i||Array.prototype.slice.call(e))};Object.defineProperty(me,"__esModule",{value:!0});me.prompt=me.confirm=me.alert=void 0;var Di=Ge,J=function(){var t=(0,Di.findOrCreateContainer)("window-modal-container");return t.classList.add("window-modal__container"),t}();function Rn(t,e){var n=e===void 0?{}:e,s=n.className,r=s===void 0?"":s;return cs(cs(['<div class="window-modal__window '.concat(r,'">'),'<div class="window-modal__content">'],t,!0),["</div>","</div>"],!1).join("")}var Tn=function(t,e){var n=e.close,s=e.enter,r=e.escape,i=function(l){if(l.key==="Escape"&&r){l.preventDefault(),r();return}if(l.key==="Enter"&&s){l.preventDefault(),s();return}},o=function(l){l.target===J&&(n==null||n())};return document.addEventListener("keydown",i),J.addEventListener("click",o),J.innerHTML=t,J.classList.add("show"),function(){document.removeEventListener("keydown",i),J.removeEventListener("click",o),J.innerHTML="",J.classList.remove("show")}};function Ii(t){return new Promise(function(e){var n,s=function(){r(),e()},r=Tn(Rn(['<div class="window-modal__content">','<div class="window-modal__text">'+t+"</div>",'<div class="window-modal__footer">','<button class="window-modal__confirm">OK</button>',"</div>","</div>"],{className:"window-modal__type-alert"}),{close:s,enter:s,escape:s});(n=J.querySelector(".window-modal__confirm"))===null||n===void 0||n.addEventListener("click",s)})}me.alert=Ii;function Bi(t){return new Promise(function(e){var n,s,r=function(){o(),e(!0)},i=function(){o(),e(!1)},o=Tn(Rn(['<div class="window-modal__text">'+t+"</div>",'<div class="window-modal__footer">','<button class="window-modal__cancel">Cancel</button>','<button class="window-modal__confirm">OK</button>',"</div>","</div>"],{className:"window-modal__type-confirm"}),{close:i,enter:r,escape:i});(n=J.querySelector(".window-modal__cancel"))===null||n===void 0||n.addEventListener("click",i),(s=J.querySelector(".window-modal__confirm"))===null||s===void 0||s.addEventListener("click",r)})}me.confirm=Bi;function Fi(t,e){return e===void 0&&(e=""),new Promise(function(n){var s,r,i=function(d){d.preventDefault();var u=d.target,c=u.value.value;l(),n(c)},o=function(){l(),n("")},l=Tn(Rn(['<form class="window-modal__content">','<div class="window-modal__text">'+t+"</div>",'<div class="window-modal__input">','<input type="text" name="value" value="'+e+'">',"</div>",'<div class="window-modal__footer">','<button type="button" class="window-modal__cancel">Cancel</button>','<button type="submit" class="window-modal__confirm">OK</button>',"</div>","</form>"],{className:"window-modal__type-prompt"}),{close:o,escape:o});(s=J.querySelector(".window-modal__cancel"))===null||s===void 0||s.addEventListener("click",o),(r=J.querySelector("form"))===null||r===void 0||r.addEventListener("submit",i),setTimeout(function(){var d=J.querySelector("input");d.focus(),d.setSelectionRange(d.value.length,d.value.length)},200)})}me.prompt=Fi;(function(t){var e=U&&U.__createBinding||(Object.create?function(s,r,i,o){o===void 0&&(o=i);var l=Object.getOwnPropertyDescriptor(r,i);(!l||("get"in l?!r.__esModule:l.writable||l.configurable))&&(l={enumerable:!0,get:function(){return r[i]}}),Object.defineProperty(s,o,l)}:function(s,r,i,o){o===void 0&&(o=i),s[o]=r[i]}),n=U&&U.__exportStar||function(s,r){for(var i in s)i!=="default"&&!Object.prototype.hasOwnProperty.call(r,i)&&e(r,s,i)};Object.defineProperty(t,"__esModule",{value:!0}),n(St,t),n(me,t)})(q);function er(t){var e=Object.create(null);return function(n){return e[n]===void 0&&(e[n]=t(n)),e[n]}}var Ui=/^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|download|draggable|encType|enterKeyHint|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/,$i=er(function(t){return Ui.test(t)||t.charCodeAt(0)===111&&t.charCodeAt(1)===110&&t.charCodeAt(2)<91});function qi(t){if(t.sheet)return t.sheet;for(var e=0;e<document.styleSheets.length;e++)if(document.styleSheets[e].ownerNode===t)return document.styleSheets[e]}function zi(t){var e=document.createElement("style");return e.setAttribute("data-emotion",t.key),t.nonce!==void 0&&e.setAttribute("nonce",t.nonce),e.appendChild(document.createTextNode("")),e.setAttribute("data-s",""),e}var Hi=function(){function t(n){var s=this;this._insertTag=function(r){var i;s.tags.length===0?s.insertionPoint?i=s.insertionPoint.nextSibling:s.prepend?i=s.container.firstChild:i=s.before:i=s.tags[s.tags.length-1].nextSibling,s.container.insertBefore(r,i),s.tags.push(r)},this.isSpeedy=n.speedy===void 0?!0:n.speedy,this.tags=[],this.ctr=0,this.nonce=n.nonce,this.key=n.key,this.container=n.container,this.prepend=n.prepend,this.insertionPoint=n.insertionPoint,this.before=null}var e=t.prototype;return e.hydrate=function(s){s.forEach(this._insertTag)},e.insert=function(s){this.ctr%(this.isSpeedy?65e3:1)===0&&this._insertTag(zi(this));var r=this.tags[this.tags.length-1];if(this.isSpeedy){var i=qi(r);try{i.insertRule(s,i.cssRules.length)}catch{}}else r.appendChild(document.createTextNode(s));this.ctr++},e.flush=function(){this.tags.forEach(function(s){return s.parentNode&&s.parentNode.removeChild(s)}),this.tags=[],this.ctr=0},t}(),V="-ms-",wt="-moz-",S="-webkit-",tr="comm",Ln="rule",Pn="decl",Wi="@import",nr="@keyframes",Vi="@layer",Yi=Math.abs,Nt=String.fromCharCode,Ki=Object.assign;function Ji(t,e){return z(t,0)^45?(((e<<2^z(t,0))<<2^z(t,1))<<2^z(t,2))<<2^z(t,3):0}function sr(t){return t.trim()}function Gi(t,e){return(t=e.exec(t))?t[0]:t}function N(t,e,n){return t.replace(e,n)}function ln(t,e){return t.indexOf(e)}function z(t,e){return t.charCodeAt(e)|0}function ze(t,e,n){return t.slice(e,n)}function se(t){return t.length}function Mn(t){return t.length}function it(t,e){return e.push(t),t}function Xi(t,e){return t.map(e).join("")}var jt=1,ke=1,rr=0,Y=0,M=0,Ne="";function Ot(t,e,n,s,r,i,o){return{value:t,root:e,parent:n,type:s,props:r,children:i,line:jt,column:ke,length:o,return:""}}function Le(t,e){return Ki(Ot("",null,null,"",null,null,0),t,{length:-t.length},e)}function Qi(){return M}function Zi(){return M=Y>0?z(Ne,--Y):0,ke--,M===10&&(ke=1,jt--),M}function G(){return M=Y<rr?z(Ne,Y++):0,ke++,M===10&&(ke=1,jt++),M}function oe(){return z(Ne,Y)}function ut(){return Y}function Xe(t,e){return ze(Ne,t,e)}function He(t){switch(t){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function ir(t){return jt=ke=1,rr=se(Ne=t),Y=0,[]}function or(t){return Ne="",t}function ht(t){return sr(Xe(Y-1,dn(t===91?t+2:t===40?t+1:t)))}function eo(t){for(;(M=oe())&&M<33;)G();return He(t)>2||He(M)>3?"":" "}function to(t,e){for(;--e&&G()&&!(M<48||M>102||M>57&&M<65||M>70&&M<97););return Xe(t,ut()+(e<6&&oe()==32&&G()==32))}function dn(t){for(;G();)switch(M){case t:return Y;case 34:case 39:t!==34&&t!==39&&dn(M);break;case 40:t===41&&dn(t);break;case 92:G();break}return Y}function no(t,e){for(;G()&&t+M!==47+10;)if(t+M===42+42&&oe()===47)break;return"/*"+Xe(e,Y-1)+"*"+Nt(t===47?t:G())}function so(t){for(;!He(oe());)G();return Xe(t,Y)}function ro(t){return or(ft("",null,null,null,[""],t=ir(t),0,[0],t))}function ft(t,e,n,s,r,i,o,l,d){for(var u=0,c=0,h=o,y=0,x=0,p=0,g=1,w=1,k=1,v=0,L="",ue=r,Q=i,K=s,j=L;w;)switch(p=v,v=G()){case 40:if(p!=108&&z(j,h-1)==58){ln(j+=N(ht(v),"&","&\f"),"&\f")!=-1&&(k=-1);break}case 34:case 39:case 91:j+=ht(v);break;case 9:case 10:case 13:case 32:j+=eo(p);break;case 92:j+=to(ut()-1,7);continue;case 47:switch(oe()){case 42:case 47:it(io(no(G(),ut()),e,n),d);break;default:j+="/"}break;case 123*g:l[u++]=se(j)*k;case 125*g:case 59:case 0:switch(v){case 0:case 125:w=0;case 59+c:k==-1&&(j=N(j,/\f/g,"")),x>0&&se(j)-h&&it(x>32?ds(j+";",s,n,h-1):ds(N(j," ","")+";",s,n,h-2),d);break;case 59:j+=";";default:if(it(K=ls(j,e,n,u,c,r,l,L,ue=[],Q=[],h),i),v===123)if(c===0)ft(j,e,K,K,ue,i,h,l,Q);else switch(y===99&&z(j,3)===110?100:y){case 100:case 108:case 109:case 115:ft(t,K,K,s&&it(ls(t,K,K,0,0,r,l,L,r,ue=[],h),Q),r,Q,h,l,s?ue:Q);break;default:ft(j,K,K,K,[""],Q,0,l,Q)}}u=c=x=0,g=k=1,L=j="",h=o;break;case 58:h=1+se(j),x=p;default:if(g<1){if(v==123)--g;else if(v==125&&g++==0&&Zi()==125)continue}switch(j+=Nt(v),v*g){case 38:k=c>0?1:(j+="\f",-1);break;case 44:l[u++]=(se(j)-1)*k,k=1;break;case 64:oe()===45&&(j+=ht(G())),y=oe(),c=h=se(L=j+=so(ut())),v++;break;case 45:p===45&&se(j)==2&&(g=0)}}return i}function ls(t,e,n,s,r,i,o,l,d,u,c){for(var h=r-1,y=r===0?i:[""],x=Mn(y),p=0,g=0,w=0;p<s;++p)for(var k=0,v=ze(t,h+1,h=Yi(g=o[p])),L=t;k<x;++k)(L=sr(g>0?y[k]+" "+v:N(v,/&\f/g,y[k])))&&(d[w++]=L);return Ot(t,e,n,r===0?Ln:l,d,u,c)}function io(t,e,n){return Ot(t,e,n,tr,Nt(Qi()),ze(t,2,-2),0)}function ds(t,e,n,s){return Ot(t,e,n,Pn,ze(t,0,s),ze(t,s+1,-1),s)}function Ee(t,e){for(var n="",s=Mn(t),r=0;r<s;r++)n+=e(t[r],r,t,e)||"";return n}function oo(t,e,n,s){switch(t.type){case Vi:if(t.children.length)break;case Wi:case Pn:return t.return=t.return||t.value;case tr:return"";case nr:return t.return=t.value+"{"+Ee(t.children,s)+"}";case Ln:t.value=t.props.join(",")}return se(n=Ee(t.children,s))?t.return=t.value+"{"+n+"}":""}function ao(t){var e=Mn(t);return function(n,s,r,i){for(var o="",l=0;l<e;l++)o+=t[l](n,s,r,i)||"";return o}}function co(t){return function(e){e.root||(e=e.return)&&t(e)}}var lo=function(e,n,s){for(var r=0,i=0;r=i,i=oe(),r===38&&i===12&&(n[s]=1),!He(i);)G();return Xe(e,Y)},uo=function(e,n){var s=-1,r=44;do switch(He(r)){case 0:r===38&&oe()===12&&(n[s]=1),e[s]+=lo(Y-1,n,s);break;case 2:e[s]+=ht(r);break;case 4:if(r===44){e[++s]=oe()===58?"&\f":"",n[s]=e[s].length;break}default:e[s]+=Nt(r)}while(r=G());return e},ho=function(e,n){return or(uo(ir(e),n))},us=new WeakMap,fo=function(e){if(!(e.type!=="rule"||!e.parent||e.length<1)){for(var n=e.value,s=e.parent,r=e.column===s.column&&e.line===s.line;s.type!=="rule";)if(s=s.parent,!s)return;if(!(e.props.length===1&&n.charCodeAt(0)!==58&&!us.get(s))&&!r){us.set(e,!0);for(var i=[],o=ho(n,i),l=s.props,d=0,u=0;d<o.length;d++)for(var c=0;c<l.length;c++,u++)e.props[u]=i[d]?o[d].replace(/&\f/g,l[c]):l[c]+" "+o[d]}}},mo=function(e){if(e.type==="decl"){var n=e.value;n.charCodeAt(0)===108&&n.charCodeAt(2)===98&&(e.return="",e.value="")}};function ar(t,e){switch(Ji(t,e)){case 5103:return S+"print-"+t+t;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 6391:case 5879:case 5623:case 6135:case 4599:case 4855:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:return S+t+t;case 5349:case 4246:case 4810:case 6968:case 2756:return S+t+wt+t+V+t+t;case 6828:case 4268:return S+t+V+t+t;case 6165:return S+t+V+"flex-"+t+t;case 5187:return S+t+N(t,/(\w+).+(:[^]+)/,S+"box-$1$2"+V+"flex-$1$2")+t;case 5443:return S+t+V+"flex-item-"+N(t,/flex-|-self/,"")+t;case 4675:return S+t+V+"flex-line-pack"+N(t,/align-content|flex-|-self/,"")+t;case 5548:return S+t+V+N(t,"shrink","negative")+t;case 5292:return S+t+V+N(t,"basis","preferred-size")+t;case 6060:return S+"box-"+N(t,"-grow","")+S+t+V+N(t,"grow","positive")+t;case 4554:return S+N(t,/([^-])(transform)/g,"$1"+S+"$2")+t;case 6187:return N(N(N(t,/(zoom-|grab)/,S+"$1"),/(image-set)/,S+"$1"),t,"")+t;case 5495:case 3959:return N(t,/(image-set\([^]*)/,S+"$1$`$1");case 4968:return N(N(t,/(.+:)(flex-)?(.*)/,S+"box-pack:$3"+V+"flex-pack:$3"),/s.+-b[^;]+/,"justify")+S+t+t;case 4095:case 3583:case 4068:case 2532:return N(t,/(.+)-inline(.+)/,S+"$1$2")+t;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(se(t)-1-e>6)switch(z(t,e+1)){case 109:if(z(t,e+4)!==45)break;case 102:return N(t,/(.+:)(.+)-([^]+)/,"$1"+S+"$2-$3$1"+wt+(z(t,e+3)==108?"$3":"$2-$3"))+t;case 115:return~ln(t,"stretch")?ar(N(t,"stretch","fill-available"),e)+t:t}break;case 4949:if(z(t,e+1)!==115)break;case 6444:switch(z(t,se(t)-3-(~ln(t,"!important")&&10))){case 107:return N(t,":",":"+S)+t;case 101:return N(t,/(.+:)([^;!]+)(;|!.+)?/,"$1"+S+(z(t,14)===45?"inline-":"")+"box$3$1"+S+"$2$3$1"+V+"$2box$3")+t}break;case 5936:switch(z(t,e+11)){case 114:return S+t+V+N(t,/[svh]\w+-[tblr]{2}/,"tb")+t;case 108:return S+t+V+N(t,/[svh]\w+-[tblr]{2}/,"tb-rl")+t;case 45:return S+t+V+N(t,/[svh]\w+-[tblr]{2}/,"lr")+t}return S+t+V+t+t}return t}var po=function(e,n,s,r){if(e.length>-1&&!e.return)switch(e.type){case Pn:e.return=ar(e.value,e.length);break;case nr:return Ee([Le(e,{value:N(e.value,"@","@"+S)})],r);case Ln:if(e.length)return Xi(e.props,function(i){switch(Gi(i,/(::plac\w+|:read-\w+)/)){case":read-only":case":read-write":return Ee([Le(e,{props:[N(i,/:(read-\w+)/,":"+wt+"$1")]})],r);case"::placeholder":return Ee([Le(e,{props:[N(i,/:(plac\w+)/,":"+S+"input-$1")]}),Le(e,{props:[N(i,/:(plac\w+)/,":"+wt+"$1")]}),Le(e,{props:[N(i,/:(plac\w+)/,V+"input-$1")]})],r)}return""})}},go=[po],yo=function(e){var n=e.key;if(n==="css"){var s=document.querySelectorAll("style[data-emotion]:not([data-s])");Array.prototype.forEach.call(s,function(g){var w=g.getAttribute("data-emotion");w.indexOf(" ")!==-1&&(document.head.appendChild(g),g.setAttribute("data-s",""))})}var r=e.stylisPlugins||go,i={},o,l=[];o=e.container||document.head,Array.prototype.forEach.call(document.querySelectorAll('style[data-emotion^="'+n+' "]'),function(g){for(var w=g.getAttribute("data-emotion").split(" "),k=1;k<w.length;k++)i[w[k]]=!0;l.push(g)});var d,u=[fo,mo];{var c,h=[oo,co(function(g){c.insert(g)})],y=ao(u.concat(r,h)),x=function(w){return Ee(ro(w),y)};d=function(w,k,v,L){c=v,x(w?w+"{"+k.styles+"}":k.styles),L&&(p.inserted[k.name]=!0)}}var p={key:n,sheet:new Hi({key:n,container:o,nonce:e.nonce,speedy:e.speedy,prepend:e.prepend,insertionPoint:e.insertionPoint}),nonce:e.nonce,inserted:i,registered:{},insert:d};return p.sheet.hydrate(l),p},bo=!0;function xo(t,e,n){var s="";return n.split(" ").forEach(function(r){t[r]!==void 0?e.push(t[r]+";"):s+=r+" "}),s}var cr=function(e,n,s){var r=e.key+"-"+n.name;(s===!1||bo===!1)&&e.registered[r]===void 0&&(e.registered[r]=n.styles)},wo=function(e,n,s){cr(e,n,s);var r=e.key+"-"+n.name;if(e.inserted[n.name]===void 0){var i=n;do e.insert(n===i?"."+r:"",i,e.sheet,!0),i=i.next;while(i!==void 0)}};function vo(t){for(var e=0,n,s=0,r=t.length;r>=4;++s,r-=4)n=t.charCodeAt(s)&255|(t.charCodeAt(++s)&255)<<8|(t.charCodeAt(++s)&255)<<16|(t.charCodeAt(++s)&255)<<24,n=(n&65535)*1540483477+((n>>>16)*59797<<16),n^=n>>>24,e=(n&65535)*1540483477+((n>>>16)*59797<<16)^(e&65535)*1540483477+((e>>>16)*59797<<16);switch(r){case 3:e^=(t.charCodeAt(s+2)&255)<<16;case 2:e^=(t.charCodeAt(s+1)&255)<<8;case 1:e^=t.charCodeAt(s)&255,e=(e&65535)*1540483477+((e>>>16)*59797<<16)}return e^=e>>>13,e=(e&65535)*1540483477+((e>>>16)*59797<<16),((e^e>>>15)>>>0).toString(36)}var Co={animationIterationCount:1,aspectRatio:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1},Eo=/[A-Z]|^ms/g,ko=/_EMO_([^_]+?)_([^]*?)_EMO_/g,lr=function(e){return e.charCodeAt(1)===45},hs=function(e){return e!=null&&typeof e!="boolean"},$t=er(function(t){return lr(t)?t:t.replace(Eo,"-$&").toLowerCase()}),fs=function(e,n){switch(e){case"animation":case"animationName":if(typeof n=="string")return n.replace(ko,function(s,r,i){return re={name:r,styles:i,next:re},r})}return Co[e]!==1&&!lr(e)&&typeof n=="number"&&n!==0?n+"px":n};function We(t,e,n){if(n==null)return"";if(n.__emotion_styles!==void 0)return n;switch(typeof n){case"boolean":return"";case"object":{if(n.anim===1)return re={name:n.name,styles:n.styles,next:re},n.name;if(n.styles!==void 0){var s=n.next;if(s!==void 0)for(;s!==void 0;)re={name:s.name,styles:s.styles,next:re},s=s.next;var r=n.styles+";";return r}return Ao(t,e,n)}case"function":{if(t!==void 0){var i=re,o=n(t);return re=i,We(t,e,o)}break}}if(e==null)return n;var l=e[n];return l!==void 0?l:n}function Ao(t,e,n){var s="";if(Array.isArray(n))for(var r=0;r<n.length;r++)s+=We(t,e,n[r])+";";else for(var i in n){var o=n[i];if(typeof o!="object")e!=null&&e[o]!==void 0?s+=i+"{"+e[o]+"}":hs(o)&&(s+=$t(i)+":"+fs(i,o)+";");else if(Array.isArray(o)&&typeof o[0]=="string"&&(e==null||e[o[0]]===void 0))for(var l=0;l<o.length;l++)hs(o[l])&&(s+=$t(i)+":"+fs(i,o[l])+";");else{var d=We(t,e,o);switch(i){case"animation":case"animationName":{s+=$t(i)+":"+d+";";break}default:s+=i+"{"+d+"}"}}}return s}var ms=/label:\s*([^\s;\n{]+)\s*(;|$)/g,re,_o=function(e,n,s){if(e.length===1&&typeof e[0]=="object"&&e[0]!==null&&e[0].styles!==void 0)return e[0];var r=!0,i="";re=void 0;var o=e[0];o==null||o.raw===void 0?(r=!1,i+=We(s,n,o)):i+=o[0];for(var l=1;l<e.length;l++)i+=We(s,n,e[l]),r&&(i+=o[l]);ms.lastIndex=0;for(var d="",u;(u=ms.exec(i))!==null;)d+="-"+u[1];var c=vo(i)+d;return{name:c,styles:i,next:re}},So=function(e){return e()},No=rs["useInsertionEffect"]?rs["useInsertionEffect"]:!1,jo=No||So,dr=m.createContext(typeof HTMLElement<"u"?yo({key:"css"}):null);dr.Provider;var Oo=function(e){return m.forwardRef(function(n,s){var r=m.useContext(dr);return e(n,r,s)})},Ro=m.createContext({}),To=$i,Lo=function(e){return e!=="theme"},ps=function(e){return typeof e=="string"&&e.charCodeAt(0)>96?To:Lo},gs=function(e,n,s){var r;if(n){var i=n.shouldForwardProp;r=e.__emotion_forwardProp&&i?function(o){return e.__emotion_forwardProp(o)&&i(o)}:i}return typeof r!="function"&&s&&(r=e.__emotion_forwardProp),r},Po=function(e){var n=e.cache,s=e.serialized,r=e.isStringTag;return cr(n,s,r),jo(function(){return wo(n,s,r)}),null},Mo=function t(e,n){var s=e.__emotion_real===e,r=s&&e.__emotion_base||e,i,o;n!==void 0&&(i=n.label,o=n.target);var l=gs(e,n,s),d=l||ps(r),u=!d("as");return function(){var c=arguments,h=s&&e.__emotion_styles!==void 0?e.__emotion_styles.slice(0):[];if(i!==void 0&&h.push("label:"+i+";"),c[0]==null||c[0].raw===void 0)h.push.apply(h,c);else{h.push(c[0][0]);for(var y=c.length,x=1;x<y;x++)h.push(c[x],c[0][x])}var p=Oo(function(g,w,k){var v=u&&g.as||r,L="",ue=[],Q=g;if(g.theme==null){Q={};for(var K in g)Q[K]=g[K];Q.theme=m.useContext(Ro)}typeof g.className=="string"?L=xo(w.registered,ue,g.className):g.className!=null&&(L=g.className+" ");var j=_o(h.concat(ue),w.registered,Q);L+=w.key+"-"+j.name,o!==void 0&&(L+=" "+o);var ri=u&&l===void 0?ps(v):d,st={};for(var rt in g)u&&rt==="as"||ri(rt)&&(st[rt]=g[rt]);return st.className=L,st.ref=k,m.createElement(m.Fragment,null,m.createElement(Po,{cache:w,serialized:j,isStringTag:typeof v=="string"}),m.createElement(v,st))});return p.displayName=i!==void 0?i:"Styled("+(typeof r=="string"?r:r.displayName||r.name||"Component")+")",p.defaultProps=e.defaultProps,p.__emotion_real=p,p.__emotion_base=r,p.__emotion_styles=h,p.__emotion_forwardProp=l,Object.defineProperty(p,"toString",{value:function(){return"."+o}}),p.withComponent=function(g,w){return t(g,ci({},n,w,{shouldForwardProp:gs(p,w,!0)})).apply(void 0,h)},p}},Do=["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","big","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","keygen","label","legend","li","link","main","map","mark","marquee","menu","menuitem","meta","meter","nav","noscript","object","ol","optgroup","option","output","p","param","picture","pre","progress","q","rp","rt","ruby","s","samp","script","section","select","small","source","span","strong","style","sub","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","title","tr","track","u","ul","var","video","wbr","circle","clipPath","defs","ellipse","foreignObject","g","image","line","linearGradient","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","svg","text","tspan"],_=Mo.bind();Do.forEach(function(t){_[t]=_(t)});var Ve={},vt=U&&U.__assign||function(){return vt=Object.assign||function(t){for(var e,n=1,s=arguments.length;n<s;n++){e=arguments[n];for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r])}return t},vt.apply(this,arguments)};Object.defineProperty(Ve,"__esModule",{value:!0});Ve.useValue=T=Ve.useStore=void 0;var Ct=m;function Io(t){var e=(0,Ct.useState)(t.state),n=e[0],s=e[1];return(0,Ct.useEffect)(function(){var r=t.subscribe(s);return function(){return t.unsubscribe(r)}},[]),[n,t.set.bind(t)]}var T=Ve.useStore=Io;function Bo(t,e){var n=(0,Ct.useState)(t.state[e]),s=n[0],r=n[1];return(0,Ct.useEffect)(function(){var i=t.subscribe(function(o){return r(o[e])});return function(){return t.unsubscribe(i)}},[]),[s,function(i){return t.set(function(o){var l;return vt(vt({},o),(l={},l[e]=i,l))})}]}Ve.useValue=Bo;const Ye=t=>t||"/images/beato.jpg";function pe({src:t,alt:e,style:n,loading:s="lazy",className:r}){const i=m.useRef(null);return m.useEffect(()=>{if(!i.current||s!=="lazy")return;const o=new IntersectionObserver(([l])=>{if(l.isIntersecting){const d=l.target;d.src=Ye(t),o.unobserve(d)}});return o.observe(i.current),()=>{o.disconnect()}},[s,t]),a.jsx(a.Fragment,{children:s!=="lazy"?a.jsx("img",{src:Ye(t),alt:e,style:n,className:r}):a.jsx("img",{ref:i,src:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQIW2NQV1f/DwACYwF11mMyYQAAAABJRU5ErkJggg==",alt:e,style:n,className:r})})}const Fo=_.button`
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
`;function ur({albumCover:t,albumName:e,artistName:n,onClick:s}){return a.jsxs(Fo,{onClick:s,children:[a.jsx(pe,{className:"cover",src:t,alt:e}),a.jsx("span",{className:"title",children:e}),a.jsx("span",{className:"artist",children:n})]})}const Uo=_.button`
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
`;function $o({artistName:t,artistCover:e,albumCount:n,musicCount:s,onClick:r}){return a.jsxs(Uo,{className:"clickable linkable",onClick:r,children:[a.jsx(pe,{src:e,alt:t}),a.jsxs("div",{className:"info",children:[a.jsx("div",{className:"name",children:t}),a.jsxs("div",{className:"count",children:[a.jsxs("div",{className:"album",children:[n," albums"]}),a.jsx("span",{children:" / "}),a.jsxs("div",{className:"music",children:[s," songs"]})]})]})]})}const qo=_.div`
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
`;function zo({title:t,isOpen:e,onClose:n,children:s}){const r=m.useRef(!1);return m.useEffect(()=>{if(!e){r.current&&(r.current=!1,history.back());return}r.current||(r.current=!0,history.pushState(null,""));const i=()=>{r.current=!1,n==null||n()};return window.addEventListener("popstate",i),()=>{window.removeEventListener("popstate",i)}},[r,e,n]),a.jsxs(qo,{className:e?"open":"",children:[a.jsx("button",{className:"clickable backdrop",onClick:n}),a.jsxs("div",{className:`bottom-panel ${e?"open":""}`,children:[t&&a.jsx("div",{className:"panel-title",children:t}),s]})]})}const Ho=_.div`
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
`;function Dn({images:t,className:e}){const n=t.length>=16?4:t.length>=9?3:t.length>=4?2:1;return a.jsxs(Ho,{className:`${e} col-${n}`,children:[t.length===0&&a.jsx(pe,{}),t.slice(0,n*n).map((s,r)=>a.jsx(pe,{src:s,alt:""},r))]})}const In=t=>m.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:36,height:36,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round",className:"ai ai-CheckBox",...t},m.createElement("rect",{x:3,y:3,width:18,height:18,rx:4}),m.createElement("path",{d:"M9 12l2.25 2L15 10"})),Wo=t=>m.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:36,height:36,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round",className:"ai ai-Cross",...t},m.createElement("path",{d:"M20 20L4 4m16 0L4 20"})),Bn=t=>m.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:36,height:36,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round",className:"ai ai-Data",...t},m.createElement("ellipse",{cx:12,cy:6,rx:8,ry:3}),m.createElement("path",{d:"M6.037 12C4.77 12.53 4 13.232 4 14c0 1.657 3.582 3 8 3s8-1.343 8-3c0-.768-.77-1.47-2.037-2"}),m.createElement("path",{d:"M4 6v4c0 1.657 3.582 3 8 3s8-1.343 8-3V6"}),m.createElement("path",{d:"M4 14v4c0 1.657 3.582 3 8 3s8-1.343 8-3v-4"})),Vo=t=>m.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:36,height:36,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round",className:"ai ai-DoubleCheck",...t},m.createElement("path",{d:"M2 12l5.25 5 2.625-3"}),m.createElement("path",{d:"M8 12l5.25 5L22 7"}),m.createElement("path",{d:"M16 7l-3.5 4"})),Yo=t=>m.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:36,height:36,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round",className:"ai ai-Download",...t},m.createElement("path",{d:"M12 15V3m0 12l-4-4m4 4l4-4"}),m.createElement("path",{d:"M2 17l.621 2.485A2 2 0 0 0 4.561 21H19.439a2 2 0 0 0 1.94-1.515L22 17"})),hr=t=>m.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:36,height:36,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round",className:"ai ai-Heart",...t},m.createElement("path",{d:"M7 3C4.239 3 2 5.216 2 7.95c0 2.207.875 7.445 9.488 12.74a.985.985 0 0 0 1.024 0C21.125 15.395 22 10.157 22 7.95 22 5.216 19.761 3 17 3s-5 3-5 3-2.239-3-5-3z"})),fr=t=>m.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:36,height:36,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round",className:"ai ai-Infinite",...t},m.createElement("path",{d:"M5.636 16C2.91 16 2 14 2 12s.91-4 3.636-4c3.637 0 9.091 8 12.728 8C21.09 16 22 14 22 12s-.91-4-3.636-4c-3.637 0-9.091 8-12.728 8z"})),mr=t=>m.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:36,height:36,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round",className:"ai ai-ChevronLeft",...t},m.createElement("path",{d:"M15 4l-8 8 8 8"})),Qe=t=>m.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:36,height:36,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round",className:"ai ai-TextAlignJustified",...t},m.createElement("path",{d:"M3 6h18M3 12h18M3 18h18"})),pr=t=>m.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:36,height:36,viewBox:"0 0 24 24",fill:"currentColor",strokeWidth:2,className:"ai ai-MoreVerticalFill",...t},m.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M12 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4z"}),m.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M12 10a2 2 0 1 1 0 4 2 2 0 0 1 0-4z"}),m.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M12 18a2 2 0 1 1 0 4 2 2 0 0 1 0-4z"})),gr=t=>m.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:36,height:36,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round",className:"ai ai-Pause",...t},m.createElement("path",{d:"M7 5v14M17 5v14"})),Ko=t=>m.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:36,height:36,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round",className:"ai ai-Pencil",...t},m.createElement("path",{d:"M4.333 16.048L16.57 3.81a2.56 2.56 0 0 1 3.62 3.619L7.951 19.667a2 2 0 0 1-1.022.547L3 21l.786-3.93a2 2 0 0 1 .547-1.022z"}),m.createElement("path",{d:"M14.5 6.5l3 3"})),X=t=>m.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:36,height:36,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round",className:"ai ai-Play",...t},m.createElement("path",{d:"M6 4v16"}),m.createElement("path",{d:"M20 12L6 20"}),m.createElement("path",{d:"M20 12L6 4"})),yr=t=>m.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:36,height:36,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round",className:"ai ai-ArrowRepeat",...t},m.createElement("path",{d:"M18 2l3 3-3 3"}),m.createElement("path",{d:"M6 22l-3-3 3-3"}),m.createElement("path",{d:"M21 5H10a7 7 0 0 0-7 7"}),m.createElement("path",{d:"M3 19h11a7 7 0 0 0 7-7"})),br=t=>m.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:36,height:36,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round",className:"ai ai-ArrowRightLeft",...t},m.createElement("path",{d:"M21 6H3m18 0l-4 4m4-4l-4-4"}),m.createElement("path",{d:"M3 18h18M3 18l4 4m-4-4l4-4"})),xr=t=>m.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:36,height:36,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round",className:"ai ai-ArrowShuffle",...t},m.createElement("path",{d:"M2 19h3.908a2 2 0 0 0 1.682-.919L11.5 12l3.91-6.082A2 2 0 0 1 17.091 5H22m0 14h-4.908a2 2 0 0 1-1.682-.919L13.428 15M2 5h3.908a2 2 0 0 1 1.682.918L9.571 9"}),m.createElement("path",{d:"M19 2l3 3-3 3"}),m.createElement("path",{d:"M19 16l3 3-3 3"})),Ze=t=>m.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:36,height:36,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round",className:"ai ai-Sort",...t},m.createElement("path",{d:"M3 6h18M6 12h12m-9 6h6"})),Fn=t=>m.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:36,height:36,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round",className:"ai ai-TrashBin",...t},m.createElement("path",{d:"M3 4l2.303 14.076a4 4 0 0 0 2.738 3.167l.328.104a12 12 0 0 0 7.262 0l.328-.104a4 4 0 0 0 2.738-3.166L21 4"}),m.createElement("ellipse",{cx:12,cy:4,rx:9,ry:2}));var Rt={},Be=U&&U.__assign||function(){return Be=Object.assign||function(t){for(var e,n=1,s=arguments.length;n<s;n++){e=arguments[n];for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r])}return t},Be.apply(this,arguments)},ys=U&&U.__awaiter||function(t,e,n,s){function r(i){return i instanceof n?i:new n(function(o){o(i)})}return new(n||(n=Promise))(function(i,o){function l(c){try{u(s.next(c))}catch(h){o(h)}}function d(c){try{u(s.throw(c))}catch(h){o(h)}}function u(c){c.done?i(c.value):r(c.value).then(l,d)}u((s=s.apply(t,e||[])).next())})},bs=U&&U.__generator||function(t,e){var n={label:0,sent:function(){if(i[0]&1)throw i[1];return i[1]},trys:[],ops:[]},s,r,i,o;return o={next:l(0),throw:l(1),return:l(2)},typeof Symbol=="function"&&(o[Symbol.iterator]=function(){return this}),o;function l(u){return function(c){return d([u,c])}}function d(u){if(s)throw new TypeError("Generator is already executing.");for(;n;)try{if(s=1,r&&(i=u[0]&2?r.return:u[0]?r.throw||((i=r.return)&&i.call(r),0):r.next)&&!(i=i.call(r,u[1])).done)return i;switch(r=0,i&&(u=[u[0]&2,i.value]),u[0]){case 0:case 1:i=u;break;case 4:return n.label++,{value:u[1],done:!1};case 5:n.label++,r=u[1],u=[0];continue;case 7:u=n.ops.pop(),n.trys.pop();continue;default:if(i=n.trys,!(i=i.length>0&&i[i.length-1])&&(u[0]===6||u[0]===2)){n=0;continue}if(u[0]===3&&(!i||u[1]>i[0]&&u[1]<i[3])){n.label=u[1];break}if(u[0]===6&&n.label<i[1]){n.label=i[1],i=u;break}if(i&&n.label<i[2]){n.label=i[2],n.ops.push(u);break}i[2]&&n.ops.pop(),n.trys.pop();continue}u=e.call(t,n)}catch(c){u=[6,c],r=0}finally{s=i=0}if(u[0]&5)throw u[1];return{value:u[0]?u[1]:void 0,done:!0}}},Jo=U&&U.__spreadArray||function(t,e){for(var n=0,s=e.length,r=t.length;n<s;n++,r++)t[r]=e[n];return t};Object.defineProperty(Rt,"__esModule",{value:!0});Rt.createStore=void 0;function Go(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(t){var e=Math.random()*16|0,n=t=="x"?e:e&3|8;return n.toString(16)})}var wr=function(){function t(){this.debug=!1,this.debugger=function(e,n){console.log(e,n.slice(-5))},this._states=[],this._observers={},this._hasStateInit=!1}return Object.defineProperty(t.prototype,"state",{get:function(){return Be({},this._states[this._states.length-1])},set:function(e){if(!this._hasStateInit){this._states.push(Object.freeze(e)),this._hasStateInit=!0;return}this.set(e)},enumerable:!1,configurable:!0}),t.prototype.runObserver=function(e){this._observers[e](this._states[this._states.length-1])},t.prototype.set=function(e){return ys(this,void 0,void 0,function(){var n=this;return bs(this,function(s){return this._hasStateInit||(this._hasStateInit=!0),[2,new Promise(function(r,i){return ys(n,void 0,void 0,function(){var o,l,d,u=this;return bs(this,function(c){switch(c.label){case 0:return this.beforeStateChange(),o=e,l=this._states[this._states.length-1],typeof o=="function"&&(o=o(l)),typeof o!="object"&&i(new TypeError("nextState is not object.")),o=Object.freeze(Be(Be({},l),o)),this._states.push(o),this.debug&&this.debugger?(d=Object.getPrototypeOf(this).constructor.name,this.debugger(d||"anonymous",Jo([],this._states))):this._states.shift(),[4,Promise.all(Object.keys(this._observers).map(function(h){return new Promise(function(y){try{u.runObserver(h)}catch{u.unsubscribe(h)}y(!0)})}))];case 1:return c.sent(),this.afterStateChange(),r(o),[2]}})})})]})})},t.prototype.beforeStateChange=function(){},t.prototype.afterStateChange=function(){},t.prototype.subscribe=function(e,n){n!=null&&n.initialize&&e(this.state);var s=Go();return this._observers[s]=e,s},t.prototype.unsubscribe=function(e){delete this._observers[e]},t.prototype.syncValue=function(e,n){var s=this;return function(){var r=s.subscribe(function(i){n(i[e])});return function(){s.unsubscribe(r)}}},t.prototype.syncState=function(e){var n=this;return function(){var s=n.subscribe(function(r){e(r)});return function(){n.unsubscribe(s)}}},t}(),ye=Rt.default=wr;function Xo(t){var e=new wr;return e.state=t,e}Rt.createStore=Xo;class Qo extends ye{constructor(){super(),this.state={title:"",isOpen:!1,content:null}}open({title:e,content:n}){this.set({title:e||"",isOpen:!0,content:n})}close(){this.set({title:"",isOpen:!1,content:null})}}const O=new Qo;function Tt({items:t}){return a.jsx(Ut,{items:t.map(e=>({icon:a.jsx(Ze,{}),text:e.text,isActive:e.isActive,onClick:()=>{e.onClick(),O.close()}}))})}var ge={},Lt={},Un={};Object.defineProperty(Un,"__esModule",{value:!0});Un.default={COLOR_WHITE:"#ffffff",COLOR_BLACK:"#000000",COLOR_PURPLE_DEEP:"#474787",COLOR_PURPLE_SHALLOW:"#515199",COLOR_PURPLE_NEON:"#735af2",COLOR_PURPLE_PROMINENT:"#a076f1",COLOR_PURPLE_LIVE:"#9b59b6",COLOR_PURPLE_GRAPE:"#8e44ad",COLOR_PURPLE_VIVID:"#5800ff",COLOR_PURPLE_GRAY:"#eeeeff",COLOR_EMBER:"#ffdd00",COLOR_YELLOW:"#f7cb46",COLOR_YELLOW_GRAY:"#e7e6e7"};var $n={};Object.defineProperty($n,"__esModule",{value:!0});$n.default={CARD_SHADOW_MAIN:"0 6px 24px 1px rgba(0, 0, 0, 0.1)",CARD_SHADOW_SUB:"0 0 10px rgba(0, 0, 0, 0.1)",SHADOW_NEON_PURPLE:"0 16px 16px rgba(115, 90, 242, .3)"};var Et=U&&U.__assign||function(){return Et=Object.assign||function(t){for(var e,n=1,s=arguments.length;n<s;n++){e=arguments[n];for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r])}return t},Et.apply(this,arguments)};Object.defineProperty(Lt,"__esModule",{value:!0});var Zo=Un,ea=$n;Lt.default=Et(Et({},Zo.default),ea.default);var qn={};Object.defineProperty(qn,"__esModule",{value:!0});var Fe=Lt,ta="box-shadow: ".concat(Fe.default.CARD_SHADOW_MAIN,";"),na="box-shadow: ".concat(Fe.default.CARD_SHADOW_SUB,";"),sa=["color: ".concat(Fe.default.COLOR_WHITE,";"),"box-shadow: ".concat(Fe.default.SHADOW_NEON_PURPLE,";"),"background-color: ".concat(Fe.default.COLOR_PURPLE_NEON,";")].join(`
`);qn.default={CARD_SHADOW_MAIN:ta,CARD_SHADOW_SUB:na,NEON_PURPLE_BUTTON:sa};(function(t){Object.defineProperty(t,"__esModule",{value:!0}),t.mixin=t.theme=void 0;var e=Lt;Object.defineProperty(t,"theme",{enumerable:!0,get:function(){return e.default}});var n=qn;Object.defineProperty(t,"mixin",{enumerable:!0,get:function(){return n.default}})})(ge);const ra=_.div`
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
        border-color: ${ge.theme.COLOR_PURPLE_PROMINENT} transparent;
        width: 25px;
        height: 25px;
        border-radius: 50%;
    }
`,je=()=>{const[t,e]=m.useState(!1);return m.useEffect(()=>{const n=setTimeout(()=>{e(!0)},100);return()=>clearTimeout(n)}),t&&a.jsx(ra,{children:a.jsx("div",{className:"spinner"})})},un=t=>`${Math.floor(t/60)}:${("0"+Math.floor(t%60)).slice(-2)}`,xs=t=>Math.floor(t*1e3),ia=t=>t/1e3,le=Object.create(null);le.open="0";le.close="1";le.ping="2";le.pong="3";le.message="4";le.upgrade="5";le.noop="6";const mt=Object.create(null);Object.keys(le).forEach(t=>{mt[le[t]]=t});const hn={type:"error",data:"parser error"},vr=typeof Blob=="function"||typeof Blob<"u"&&Object.prototype.toString.call(Blob)==="[object BlobConstructor]",Cr=typeof ArrayBuffer=="function",Er=t=>typeof ArrayBuffer.isView=="function"?ArrayBuffer.isView(t):t&&t.buffer instanceof ArrayBuffer,zn=({type:t,data:e},n,s)=>vr&&e instanceof Blob?n?s(e):ws(e,s):Cr&&(e instanceof ArrayBuffer||Er(e))?n?s(e):ws(new Blob([e]),s):s(le[t]+(e||"")),ws=(t,e)=>{const n=new FileReader;return n.onload=function(){const s=n.result.split(",")[1];e("b"+(s||""))},n.readAsDataURL(t)};function vs(t){return t instanceof Uint8Array?t:t instanceof ArrayBuffer?new Uint8Array(t):new Uint8Array(t.buffer,t.byteOffset,t.byteLength)}let qt;function oa(t,e){if(vr&&t.data instanceof Blob)return t.data.arrayBuffer().then(vs).then(e);if(Cr&&(t.data instanceof ArrayBuffer||Er(t.data)))return e(vs(t.data));zn(t,!1,n=>{qt||(qt=new TextEncoder),e(qt.encode(n))})}const Cs="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",Ie=typeof Uint8Array>"u"?[]:new Uint8Array(256);for(let t=0;t<Cs.length;t++)Ie[Cs.charCodeAt(t)]=t;const aa=t=>{let e=t.length*.75,n=t.length,s,r=0,i,o,l,d;t[t.length-1]==="="&&(e--,t[t.length-2]==="="&&e--);const u=new ArrayBuffer(e),c=new Uint8Array(u);for(s=0;s<n;s+=4)i=Ie[t.charCodeAt(s)],o=Ie[t.charCodeAt(s+1)],l=Ie[t.charCodeAt(s+2)],d=Ie[t.charCodeAt(s+3)],c[r++]=i<<2|o>>4,c[r++]=(o&15)<<4|l>>2,c[r++]=(l&3)<<6|d&63;return u},ca=typeof ArrayBuffer=="function",Hn=(t,e)=>{if(typeof t!="string")return{type:"message",data:kr(t,e)};const n=t.charAt(0);return n==="b"?{type:"message",data:la(t.substring(1),e)}:mt[n]?t.length>1?{type:mt[n],data:t.substring(1)}:{type:mt[n]}:hn},la=(t,e)=>{if(ca){const n=aa(t);return kr(n,e)}else return{base64:!0,data:t}},kr=(t,e)=>{switch(e){case"blob":return t instanceof Blob?t:new Blob([t]);case"arraybuffer":default:return t instanceof ArrayBuffer?t:t.buffer}},Ar=String.fromCharCode(30),da=(t,e)=>{const n=t.length,s=new Array(n);let r=0;t.forEach((i,o)=>{zn(i,!1,l=>{s[o]=l,++r===n&&e(s.join(Ar))})})},ua=(t,e)=>{const n=t.split(Ar),s=[];for(let r=0;r<n.length;r++){const i=Hn(n[r],e);if(s.push(i),i.type==="error")break}return s};function ha(){return new TransformStream({transform(t,e){oa(t,n=>{const s=n.length;let r;if(s<126)r=new Uint8Array(1),new DataView(r.buffer).setUint8(0,s);else if(s<65536){r=new Uint8Array(3);const i=new DataView(r.buffer);i.setUint8(0,126),i.setUint16(1,s)}else{r=new Uint8Array(9);const i=new DataView(r.buffer);i.setUint8(0,127),i.setBigUint64(1,BigInt(s))}t.data&&typeof t.data!="string"&&(r[0]|=128),e.enqueue(r),e.enqueue(n)})}})}let zt;function ot(t){return t.reduce((e,n)=>e+n.length,0)}function at(t,e){if(t[0].length===e)return t.shift();const n=new Uint8Array(e);let s=0;for(let r=0;r<e;r++)n[r]=t[0][s++],s===t[0].length&&(t.shift(),s=0);return t.length&&s<t[0].length&&(t[0]=t[0].slice(s)),n}function fa(t,e){zt||(zt=new TextDecoder);const n=[];let s=0,r=-1,i=!1;return new TransformStream({transform(o,l){for(n.push(o);;){if(s===0){if(ot(n)<1)break;const d=at(n,1);i=(d[0]&128)===128,r=d[0]&127,r<126?s=3:r===126?s=1:s=2}else if(s===1){if(ot(n)<2)break;const d=at(n,2);r=new DataView(d.buffer,d.byteOffset,d.length).getUint16(0),s=3}else if(s===2){if(ot(n)<8)break;const d=at(n,8),u=new DataView(d.buffer,d.byteOffset,d.length),c=u.getUint32(0);if(c>Math.pow(2,53-32)-1){l.enqueue(hn);break}r=c*Math.pow(2,32)+u.getUint32(4),s=3}else{if(ot(n)<r)break;const d=at(n,r);l.enqueue(Hn(i?d:zt.decode(d),e)),s=0}if(r===0||r>t){l.enqueue(hn);break}}}})}const _r=4;function D(t){if(t)return ma(t)}function ma(t){for(var e in D.prototype)t[e]=D.prototype[e];return t}D.prototype.on=D.prototype.addEventListener=function(t,e){return this._callbacks=this._callbacks||{},(this._callbacks["$"+t]=this._callbacks["$"+t]||[]).push(e),this};D.prototype.once=function(t,e){function n(){this.off(t,n),e.apply(this,arguments)}return n.fn=e,this.on(t,n),this};D.prototype.off=D.prototype.removeListener=D.prototype.removeAllListeners=D.prototype.removeEventListener=function(t,e){if(this._callbacks=this._callbacks||{},arguments.length==0)return this._callbacks={},this;var n=this._callbacks["$"+t];if(!n)return this;if(arguments.length==1)return delete this._callbacks["$"+t],this;for(var s,r=0;r<n.length;r++)if(s=n[r],s===e||s.fn===e){n.splice(r,1);break}return n.length===0&&delete this._callbacks["$"+t],this};D.prototype.emit=function(t){this._callbacks=this._callbacks||{};for(var e=new Array(arguments.length-1),n=this._callbacks["$"+t],s=1;s<arguments.length;s++)e[s-1]=arguments[s];if(n){n=n.slice(0);for(var s=0,r=n.length;s<r;++s)n[s].apply(this,e)}return this};D.prototype.emitReserved=D.prototype.emit;D.prototype.listeners=function(t){return this._callbacks=this._callbacks||{},this._callbacks["$"+t]||[]};D.prototype.hasListeners=function(t){return!!this.listeners(t).length};const Z=(()=>typeof self<"u"?self:typeof window<"u"?window:Function("return this")())();function Sr(t,...e){return e.reduce((n,s)=>(t.hasOwnProperty(s)&&(n[s]=t[s]),n),{})}const pa=Z.setTimeout,ga=Z.clearTimeout;function Pt(t,e){e.useNativeTimers?(t.setTimeoutFn=pa.bind(Z),t.clearTimeoutFn=ga.bind(Z)):(t.setTimeoutFn=Z.setTimeout.bind(Z),t.clearTimeoutFn=Z.clearTimeout.bind(Z))}const ya=1.33;function ba(t){return typeof t=="string"?xa(t):Math.ceil((t.byteLength||t.size)*ya)}function xa(t){let e=0,n=0;for(let s=0,r=t.length;s<r;s++)e=t.charCodeAt(s),e<128?n+=1:e<2048?n+=2:e<55296||e>=57344?n+=3:(s++,n+=4);return n}function wa(t){let e="";for(let n in t)t.hasOwnProperty(n)&&(e.length&&(e+="&"),e+=encodeURIComponent(n)+"="+encodeURIComponent(t[n]));return e}function va(t){let e={},n=t.split("&");for(let s=0,r=n.length;s<r;s++){let i=n[s].split("=");e[decodeURIComponent(i[0])]=decodeURIComponent(i[1])}return e}class Ca extends Error{constructor(e,n,s){super(e),this.description=n,this.context=s,this.type="TransportError"}}class Wn extends D{constructor(e){super(),this.writable=!1,Pt(this,e),this.opts=e,this.query=e.query,this.socket=e.socket}onError(e,n,s){return super.emitReserved("error",new Ca(e,n,s)),this}open(){return this.readyState="opening",this.doOpen(),this}close(){return(this.readyState==="opening"||this.readyState==="open")&&(this.doClose(),this.onClose()),this}send(e){this.readyState==="open"&&this.write(e)}onOpen(){this.readyState="open",this.writable=!0,super.emitReserved("open")}onData(e){const n=Hn(e,this.socket.binaryType);this.onPacket(n)}onPacket(e){super.emitReserved("packet",e)}onClose(e){this.readyState="closed",super.emitReserved("close",e)}pause(e){}createUri(e,n={}){return e+"://"+this._hostname()+this._port()+this.opts.path+this._query(n)}_hostname(){const e=this.opts.hostname;return e.indexOf(":")===-1?e:"["+e+"]"}_port(){return this.opts.port&&(this.opts.secure&&+(this.opts.port!==443)||!this.opts.secure&&Number(this.opts.port)!==80)?":"+this.opts.port:""}_query(e){const n=wa(e);return n.length?"?"+n:""}}const Nr="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_".split(""),fn=64,Ea={};let Es=0,ct=0,ks;function As(t){let e="";do e=Nr[t%fn]+e,t=Math.floor(t/fn);while(t>0);return e}function jr(){const t=As(+new Date);return t!==ks?(Es=0,ks=t):t+"."+As(Es++)}for(;ct<fn;ct++)Ea[Nr[ct]]=ct;let Or=!1;try{Or=typeof XMLHttpRequest<"u"&&"withCredentials"in new XMLHttpRequest}catch{}const ka=Or;function Rr(t){const e=t.xdomain;try{if(typeof XMLHttpRequest<"u"&&(!e||ka))return new XMLHttpRequest}catch{}if(!e)try{return new Z[["Active"].concat("Object").join("X")]("Microsoft.XMLHTTP")}catch{}}function Aa(){}const _a=function(){return new Rr({xdomain:!1}).responseType!=null}();class Sa extends Wn{constructor(e){if(super(e),this.polling=!1,typeof location<"u"){const s=location.protocol==="https:";let r=location.port;r||(r=s?"443":"80"),this.xd=typeof location<"u"&&e.hostname!==location.hostname||r!==e.port}const n=e&&e.forceBase64;this.supportsBinary=_a&&!n,this.opts.withCredentials&&(this.cookieJar=void 0)}get name(){return"polling"}doOpen(){this.poll()}pause(e){this.readyState="pausing";const n=()=>{this.readyState="paused",e()};if(this.polling||!this.writable){let s=0;this.polling&&(s++,this.once("pollComplete",function(){--s||n()})),this.writable||(s++,this.once("drain",function(){--s||n()}))}else n()}poll(){this.polling=!0,this.doPoll(),this.emitReserved("poll")}onData(e){const n=s=>{if(this.readyState==="opening"&&s.type==="open"&&this.onOpen(),s.type==="close")return this.onClose({description:"transport closed by the server"}),!1;this.onPacket(s)};ua(e,this.socket.binaryType).forEach(n),this.readyState!=="closed"&&(this.polling=!1,this.emitReserved("pollComplete"),this.readyState==="open"&&this.poll())}doClose(){const e=()=>{this.write([{type:"close"}])};this.readyState==="open"?e():this.once("open",e)}write(e){this.writable=!1,da(e,n=>{this.doWrite(n,()=>{this.writable=!0,this.emitReserved("drain")})})}uri(){const e=this.opts.secure?"https":"http",n=this.query||{};return this.opts.timestampRequests!==!1&&(n[this.opts.timestampParam]=jr()),!this.supportsBinary&&!n.sid&&(n.b64=1),this.createUri(e,n)}request(e={}){return Object.assign(e,{xd:this.xd,cookieJar:this.cookieJar},this.opts),new ae(this.uri(),e)}doWrite(e,n){const s=this.request({method:"POST",data:e});s.on("success",n),s.on("error",(r,i)=>{this.onError("xhr post error",r,i)})}doPoll(){const e=this.request();e.on("data",this.onData.bind(this)),e.on("error",(n,s)=>{this.onError("xhr poll error",n,s)}),this.pollXhr=e}}class ae extends D{constructor(e,n){super(),Pt(this,n),this.opts=n,this.method=n.method||"GET",this.uri=e,this.data=n.data!==void 0?n.data:null,this.create()}create(){var e;const n=Sr(this.opts,"agent","pfx","key","passphrase","cert","ca","ciphers","rejectUnauthorized","autoUnref");n.xdomain=!!this.opts.xd;const s=this.xhr=new Rr(n);try{s.open(this.method,this.uri,!0);try{if(this.opts.extraHeaders){s.setDisableHeaderCheck&&s.setDisableHeaderCheck(!0);for(let r in this.opts.extraHeaders)this.opts.extraHeaders.hasOwnProperty(r)&&s.setRequestHeader(r,this.opts.extraHeaders[r])}}catch{}if(this.method==="POST")try{s.setRequestHeader("Content-type","text/plain;charset=UTF-8")}catch{}try{s.setRequestHeader("Accept","*/*")}catch{}(e=this.opts.cookieJar)===null||e===void 0||e.addCookies(s),"withCredentials"in s&&(s.withCredentials=this.opts.withCredentials),this.opts.requestTimeout&&(s.timeout=this.opts.requestTimeout),s.onreadystatechange=()=>{var r;s.readyState===3&&((r=this.opts.cookieJar)===null||r===void 0||r.parseCookies(s)),s.readyState===4&&(s.status===200||s.status===1223?this.onLoad():this.setTimeoutFn(()=>{this.onError(typeof s.status=="number"?s.status:0)},0))},s.send(this.data)}catch(r){this.setTimeoutFn(()=>{this.onError(r)},0);return}typeof document<"u"&&(this.index=ae.requestsCount++,ae.requests[this.index]=this)}onError(e){this.emitReserved("error",e,this.xhr),this.cleanup(!0)}cleanup(e){if(!(typeof this.xhr>"u"||this.xhr===null)){if(this.xhr.onreadystatechange=Aa,e)try{this.xhr.abort()}catch{}typeof document<"u"&&delete ae.requests[this.index],this.xhr=null}}onLoad(){const e=this.xhr.responseText;e!==null&&(this.emitReserved("data",e),this.emitReserved("success"),this.cleanup())}abort(){this.cleanup()}}ae.requestsCount=0;ae.requests={};if(typeof document<"u"){if(typeof attachEvent=="function")attachEvent("onunload",_s);else if(typeof addEventListener=="function"){const t="onpagehide"in Z?"pagehide":"unload";addEventListener(t,_s,!1)}}function _s(){for(let t in ae.requests)ae.requests.hasOwnProperty(t)&&ae.requests[t].abort()}const Vn=(()=>typeof Promise=="function"&&typeof Promise.resolve=="function"?e=>Promise.resolve().then(e):(e,n)=>n(e,0))(),lt=Z.WebSocket||Z.MozWebSocket,Ss=!0,Na="arraybuffer",Ns=typeof navigator<"u"&&typeof navigator.product=="string"&&navigator.product.toLowerCase()==="reactnative";class ja extends Wn{constructor(e){super(e),this.supportsBinary=!e.forceBase64}get name(){return"websocket"}doOpen(){if(!this.check())return;const e=this.uri(),n=this.opts.protocols,s=Ns?{}:Sr(this.opts,"agent","perMessageDeflate","pfx","key","passphrase","cert","ca","ciphers","rejectUnauthorized","localAddress","protocolVersion","origin","maxPayload","family","checkServerIdentity");this.opts.extraHeaders&&(s.headers=this.opts.extraHeaders);try{this.ws=Ss&&!Ns?n?new lt(e,n):new lt(e):new lt(e,n,s)}catch(r){return this.emitReserved("error",r)}this.ws.binaryType=this.socket.binaryType,this.addEventListeners()}addEventListeners(){this.ws.onopen=()=>{this.opts.autoUnref&&this.ws._socket.unref(),this.onOpen()},this.ws.onclose=e=>this.onClose({description:"websocket connection closed",context:e}),this.ws.onmessage=e=>this.onData(e.data),this.ws.onerror=e=>this.onError("websocket error",e)}write(e){this.writable=!1;for(let n=0;n<e.length;n++){const s=e[n],r=n===e.length-1;zn(s,this.supportsBinary,i=>{const o={};try{Ss&&this.ws.send(i)}catch{}r&&Vn(()=>{this.writable=!0,this.emitReserved("drain")},this.setTimeoutFn)})}}doClose(){typeof this.ws<"u"&&(this.ws.close(),this.ws=null)}uri(){const e=this.opts.secure?"wss":"ws",n=this.query||{};return this.opts.timestampRequests&&(n[this.opts.timestampParam]=jr()),this.supportsBinary||(n.b64=1),this.createUri(e,n)}check(){return!!lt}}class Oa extends Wn{get name(){return"webtransport"}doOpen(){typeof WebTransport=="function"&&(this.transport=new WebTransport(this.createUri("https"),this.opts.transportOptions[this.name]),this.transport.closed.then(()=>{this.onClose()}).catch(e=>{this.onError("webtransport error",e)}),this.transport.ready.then(()=>{this.transport.createBidirectionalStream().then(e=>{const n=fa(Number.MAX_SAFE_INTEGER,this.socket.binaryType),s=e.readable.pipeThrough(n).getReader(),r=ha();r.readable.pipeTo(e.writable),this.writer=r.writable.getWriter();const i=()=>{s.read().then(({done:l,value:d})=>{l||(this.onPacket(d),i())}).catch(l=>{})};i();const o={type:"open"};this.query.sid&&(o.data=`{"sid":"${this.query.sid}"}`),this.writer.write(o).then(()=>this.onOpen())})}))}write(e){this.writable=!1;for(let n=0;n<e.length;n++){const s=e[n],r=n===e.length-1;this.writer.write(s).then(()=>{r&&Vn(()=>{this.writable=!0,this.emitReserved("drain")},this.setTimeoutFn)})}}doClose(){var e;(e=this.transport)===null||e===void 0||e.close()}}const Ra={websocket:ja,webtransport:Oa,polling:Sa},Ta=/^(?:(?![^:@\/?#]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@\/?#]*)(?::([^:@\/?#]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,La=["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"];function mn(t){const e=t,n=t.indexOf("["),s=t.indexOf("]");n!=-1&&s!=-1&&(t=t.substring(0,n)+t.substring(n,s).replace(/:/g,";")+t.substring(s,t.length));let r=Ta.exec(t||""),i={},o=14;for(;o--;)i[La[o]]=r[o]||"";return n!=-1&&s!=-1&&(i.source=e,i.host=i.host.substring(1,i.host.length-1).replace(/;/g,":"),i.authority=i.authority.replace("[","").replace("]","").replace(/;/g,":"),i.ipv6uri=!0),i.pathNames=Pa(i,i.path),i.queryKey=Ma(i,i.query),i}function Pa(t,e){const n=/\/{2,9}/g,s=e.replace(n,"/").split("/");return(e.slice(0,1)=="/"||e.length===0)&&s.splice(0,1),e.slice(-1)=="/"&&s.splice(s.length-1,1),s}function Ma(t,e){const n={};return e.replace(/(?:^|&)([^&=]*)=?([^&]*)/g,function(s,r,i){r&&(n[r]=i)}),n}let Tr=class Ce extends D{constructor(e,n={}){super(),this.binaryType=Na,this.writeBuffer=[],e&&typeof e=="object"&&(n=e,e=null),e?(e=mn(e),n.hostname=e.host,n.secure=e.protocol==="https"||e.protocol==="wss",n.port=e.port,e.query&&(n.query=e.query)):n.host&&(n.hostname=mn(n.host).host),Pt(this,n),this.secure=n.secure!=null?n.secure:typeof location<"u"&&location.protocol==="https:",n.hostname&&!n.port&&(n.port=this.secure?"443":"80"),this.hostname=n.hostname||(typeof location<"u"?location.hostname:"localhost"),this.port=n.port||(typeof location<"u"&&location.port?location.port:this.secure?"443":"80"),this.transports=n.transports||["polling","websocket","webtransport"],this.writeBuffer=[],this.prevBufferLen=0,this.opts=Object.assign({path:"/engine.io",agent:!1,withCredentials:!1,upgrade:!0,timestampParam:"t",rememberUpgrade:!1,addTrailingSlash:!0,rejectUnauthorized:!0,perMessageDeflate:{threshold:1024},transportOptions:{},closeOnBeforeunload:!1},n),this.opts.path=this.opts.path.replace(/\/$/,"")+(this.opts.addTrailingSlash?"/":""),typeof this.opts.query=="string"&&(this.opts.query=va(this.opts.query)),this.id=null,this.upgrades=null,this.pingInterval=null,this.pingTimeout=null,this.pingTimeoutTimer=null,typeof addEventListener=="function"&&(this.opts.closeOnBeforeunload&&(this.beforeunloadEventListener=()=>{this.transport&&(this.transport.removeAllListeners(),this.transport.close())},addEventListener("beforeunload",this.beforeunloadEventListener,!1)),this.hostname!=="localhost"&&(this.offlineEventListener=()=>{this.onClose("transport close",{description:"network connection lost"})},addEventListener("offline",this.offlineEventListener,!1))),this.open()}createTransport(e){const n=Object.assign({},this.opts.query);n.EIO=_r,n.transport=e,this.id&&(n.sid=this.id);const s=Object.assign({},this.opts,{query:n,socket:this,hostname:this.hostname,secure:this.secure,port:this.port},this.opts.transportOptions[e]);return new Ra[e](s)}open(){let e;if(this.opts.rememberUpgrade&&Ce.priorWebsocketSuccess&&this.transports.indexOf("websocket")!==-1)e="websocket";else if(this.transports.length===0){this.setTimeoutFn(()=>{this.emitReserved("error","No transports available")},0);return}else e=this.transports[0];this.readyState="opening";try{e=this.createTransport(e)}catch{this.transports.shift(),this.open();return}e.open(),this.setTransport(e)}setTransport(e){this.transport&&this.transport.removeAllListeners(),this.transport=e,e.on("drain",this.onDrain.bind(this)).on("packet",this.onPacket.bind(this)).on("error",this.onError.bind(this)).on("close",n=>this.onClose("transport close",n))}probe(e){let n=this.createTransport(e),s=!1;Ce.priorWebsocketSuccess=!1;const r=()=>{s||(n.send([{type:"ping",data:"probe"}]),n.once("packet",h=>{if(!s)if(h.type==="pong"&&h.data==="probe"){if(this.upgrading=!0,this.emitReserved("upgrading",n),!n)return;Ce.priorWebsocketSuccess=n.name==="websocket",this.transport.pause(()=>{s||this.readyState!=="closed"&&(c(),this.setTransport(n),n.send([{type:"upgrade"}]),this.emitReserved("upgrade",n),n=null,this.upgrading=!1,this.flush())})}else{const y=new Error("probe error");y.transport=n.name,this.emitReserved("upgradeError",y)}}))};function i(){s||(s=!0,c(),n.close(),n=null)}const o=h=>{const y=new Error("probe error: "+h);y.transport=n.name,i(),this.emitReserved("upgradeError",y)};function l(){o("transport closed")}function d(){o("socket closed")}function u(h){n&&h.name!==n.name&&i()}const c=()=>{n.removeListener("open",r),n.removeListener("error",o),n.removeListener("close",l),this.off("close",d),this.off("upgrading",u)};n.once("open",r),n.once("error",o),n.once("close",l),this.once("close",d),this.once("upgrading",u),this.upgrades.indexOf("webtransport")!==-1&&e!=="webtransport"?this.setTimeoutFn(()=>{s||n.open()},200):n.open()}onOpen(){if(this.readyState="open",Ce.priorWebsocketSuccess=this.transport.name==="websocket",this.emitReserved("open"),this.flush(),this.readyState==="open"&&this.opts.upgrade){let e=0;const n=this.upgrades.length;for(;e<n;e++)this.probe(this.upgrades[e])}}onPacket(e){if(this.readyState==="opening"||this.readyState==="open"||this.readyState==="closing")switch(this.emitReserved("packet",e),this.emitReserved("heartbeat"),this.resetPingTimeout(),e.type){case"open":this.onHandshake(JSON.parse(e.data));break;case"ping":this.sendPacket("pong"),this.emitReserved("ping"),this.emitReserved("pong");break;case"error":const n=new Error("server error");n.code=e.data,this.onError(n);break;case"message":this.emitReserved("data",e.data),this.emitReserved("message",e.data);break}}onHandshake(e){this.emitReserved("handshake",e),this.id=e.sid,this.transport.query.sid=e.sid,this.upgrades=this.filterUpgrades(e.upgrades),this.pingInterval=e.pingInterval,this.pingTimeout=e.pingTimeout,this.maxPayload=e.maxPayload,this.onOpen(),this.readyState!=="closed"&&this.resetPingTimeout()}resetPingTimeout(){this.clearTimeoutFn(this.pingTimeoutTimer),this.pingTimeoutTimer=this.setTimeoutFn(()=>{this.onClose("ping timeout")},this.pingInterval+this.pingTimeout),this.opts.autoUnref&&this.pingTimeoutTimer.unref()}onDrain(){this.writeBuffer.splice(0,this.prevBufferLen),this.prevBufferLen=0,this.writeBuffer.length===0?this.emitReserved("drain"):this.flush()}flush(){if(this.readyState!=="closed"&&this.transport.writable&&!this.upgrading&&this.writeBuffer.length){const e=this.getWritablePackets();this.transport.send(e),this.prevBufferLen=e.length,this.emitReserved("flush")}}getWritablePackets(){if(!(this.maxPayload&&this.transport.name==="polling"&&this.writeBuffer.length>1))return this.writeBuffer;let n=1;for(let s=0;s<this.writeBuffer.length;s++){const r=this.writeBuffer[s].data;if(r&&(n+=ba(r)),s>0&&n>this.maxPayload)return this.writeBuffer.slice(0,s);n+=2}return this.writeBuffer}write(e,n,s){return this.sendPacket("message",e,n,s),this}send(e,n,s){return this.sendPacket("message",e,n,s),this}sendPacket(e,n,s,r){if(typeof n=="function"&&(r=n,n=void 0),typeof s=="function"&&(r=s,s=null),this.readyState==="closing"||this.readyState==="closed")return;s=s||{},s.compress=s.compress!==!1;const i={type:e,data:n,options:s};this.emitReserved("packetCreate",i),this.writeBuffer.push(i),r&&this.once("flush",r),this.flush()}close(){const e=()=>{this.onClose("forced close"),this.transport.close()},n=()=>{this.off("upgrade",n),this.off("upgradeError",n),e()},s=()=>{this.once("upgrade",n),this.once("upgradeError",n)};return(this.readyState==="opening"||this.readyState==="open")&&(this.readyState="closing",this.writeBuffer.length?this.once("drain",()=>{this.upgrading?s():e()}):this.upgrading?s():e()),this}onError(e){Ce.priorWebsocketSuccess=!1,this.emitReserved("error",e),this.onClose("transport error",e)}onClose(e,n){(this.readyState==="opening"||this.readyState==="open"||this.readyState==="closing")&&(this.clearTimeoutFn(this.pingTimeoutTimer),this.transport.removeAllListeners("close"),this.transport.close(),this.transport.removeAllListeners(),typeof removeEventListener=="function"&&(removeEventListener("beforeunload",this.beforeunloadEventListener,!1),removeEventListener("offline",this.offlineEventListener,!1)),this.readyState="closed",this.id=null,this.emitReserved("close",e,n),this.writeBuffer=[],this.prevBufferLen=0)}filterUpgrades(e){const n=[];let s=0;const r=e.length;for(;s<r;s++)~this.transports.indexOf(e[s])&&n.push(e[s]);return n}};Tr.protocol=_r;function Da(t,e="",n){let s=t;n=n||typeof location<"u"&&location,t==null&&(t=n.protocol+"//"+n.host),typeof t=="string"&&(t.charAt(0)==="/"&&(t.charAt(1)==="/"?t=n.protocol+t:t=n.host+t),/^(https?|wss?):\/\//.test(t)||(typeof n<"u"?t=n.protocol+"//"+t:t="https://"+t),s=mn(t)),s.port||(/^(http|ws)$/.test(s.protocol)?s.port="80":/^(http|ws)s$/.test(s.protocol)&&(s.port="443")),s.path=s.path||"/";const i=s.host.indexOf(":")!==-1?"["+s.host+"]":s.host;return s.id=s.protocol+"://"+i+":"+s.port+e,s.href=s.protocol+"://"+i+(n&&n.port===s.port?"":":"+s.port),s}const Ia=typeof ArrayBuffer=="function",Ba=t=>typeof ArrayBuffer.isView=="function"?ArrayBuffer.isView(t):t.buffer instanceof ArrayBuffer,Lr=Object.prototype.toString,Fa=typeof Blob=="function"||typeof Blob<"u"&&Lr.call(Blob)==="[object BlobConstructor]",Ua=typeof File=="function"||typeof File<"u"&&Lr.call(File)==="[object FileConstructor]";function Yn(t){return Ia&&(t instanceof ArrayBuffer||Ba(t))||Fa&&t instanceof Blob||Ua&&t instanceof File}function pt(t,e){if(!t||typeof t!="object")return!1;if(Array.isArray(t)){for(let n=0,s=t.length;n<s;n++)if(pt(t[n]))return!0;return!1}if(Yn(t))return!0;if(t.toJSON&&typeof t.toJSON=="function"&&arguments.length===1)return pt(t.toJSON(),!0);for(const n in t)if(Object.prototype.hasOwnProperty.call(t,n)&&pt(t[n]))return!0;return!1}function $a(t){const e=[],n=t.data,s=t;return s.data=pn(n,e),s.attachments=e.length,{packet:s,buffers:e}}function pn(t,e){if(!t)return t;if(Yn(t)){const n={_placeholder:!0,num:e.length};return e.push(t),n}else if(Array.isArray(t)){const n=new Array(t.length);for(let s=0;s<t.length;s++)n[s]=pn(t[s],e);return n}else if(typeof t=="object"&&!(t instanceof Date)){const n={};for(const s in t)Object.prototype.hasOwnProperty.call(t,s)&&(n[s]=pn(t[s],e));return n}return t}function qa(t,e){return t.data=gn(t.data,e),delete t.attachments,t}function gn(t,e){if(!t)return t;if(t&&t._placeholder===!0){if(typeof t.num=="number"&&t.num>=0&&t.num<e.length)return e[t.num];throw new Error("illegal attachments")}else if(Array.isArray(t))for(let n=0;n<t.length;n++)t[n]=gn(t[n],e);else if(typeof t=="object")for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&(t[n]=gn(t[n],e));return t}const za=["connect","connect_error","disconnect","disconnecting","newListener","removeListener"],Ha=5;var C;(function(t){t[t.CONNECT=0]="CONNECT",t[t.DISCONNECT=1]="DISCONNECT",t[t.EVENT=2]="EVENT",t[t.ACK=3]="ACK",t[t.CONNECT_ERROR=4]="CONNECT_ERROR",t[t.BINARY_EVENT=5]="BINARY_EVENT",t[t.BINARY_ACK=6]="BINARY_ACK"})(C||(C={}));class Wa{constructor(e){this.replacer=e}encode(e){return(e.type===C.EVENT||e.type===C.ACK)&&pt(e)?this.encodeAsBinary({type:e.type===C.EVENT?C.BINARY_EVENT:C.BINARY_ACK,nsp:e.nsp,data:e.data,id:e.id}):[this.encodeAsString(e)]}encodeAsString(e){let n=""+e.type;return(e.type===C.BINARY_EVENT||e.type===C.BINARY_ACK)&&(n+=e.attachments+"-"),e.nsp&&e.nsp!=="/"&&(n+=e.nsp+","),e.id!=null&&(n+=e.id),e.data!=null&&(n+=JSON.stringify(e.data,this.replacer)),n}encodeAsBinary(e){const n=$a(e),s=this.encodeAsString(n.packet),r=n.buffers;return r.unshift(s),r}}function js(t){return Object.prototype.toString.call(t)==="[object Object]"}class Kn extends D{constructor(e){super(),this.reviver=e}add(e){let n;if(typeof e=="string"){if(this.reconstructor)throw new Error("got plaintext data when reconstructing a packet");n=this.decodeString(e);const s=n.type===C.BINARY_EVENT;s||n.type===C.BINARY_ACK?(n.type=s?C.EVENT:C.ACK,this.reconstructor=new Va(n),n.attachments===0&&super.emitReserved("decoded",n)):super.emitReserved("decoded",n)}else if(Yn(e)||e.base64)if(this.reconstructor)n=this.reconstructor.takeBinaryData(e),n&&(this.reconstructor=null,super.emitReserved("decoded",n));else throw new Error("got binary data when not reconstructing a packet");else throw new Error("Unknown type: "+e)}decodeString(e){let n=0;const s={type:Number(e.charAt(0))};if(C[s.type]===void 0)throw new Error("unknown packet type "+s.type);if(s.type===C.BINARY_EVENT||s.type===C.BINARY_ACK){const i=n+1;for(;e.charAt(++n)!=="-"&&n!=e.length;);const o=e.substring(i,n);if(o!=Number(o)||e.charAt(n)!=="-")throw new Error("Illegal attachments");s.attachments=Number(o)}if(e.charAt(n+1)==="/"){const i=n+1;for(;++n&&!(e.charAt(n)===","||n===e.length););s.nsp=e.substring(i,n)}else s.nsp="/";const r=e.charAt(n+1);if(r!==""&&Number(r)==r){const i=n+1;for(;++n;){const o=e.charAt(n);if(o==null||Number(o)!=o){--n;break}if(n===e.length)break}s.id=Number(e.substring(i,n+1))}if(e.charAt(++n)){const i=this.tryParse(e.substr(n));if(Kn.isPayloadValid(s.type,i))s.data=i;else throw new Error("invalid payload")}return s}tryParse(e){try{return JSON.parse(e,this.reviver)}catch{return!1}}static isPayloadValid(e,n){switch(e){case C.CONNECT:return js(n);case C.DISCONNECT:return n===void 0;case C.CONNECT_ERROR:return typeof n=="string"||js(n);case C.EVENT:case C.BINARY_EVENT:return Array.isArray(n)&&(typeof n[0]=="number"||typeof n[0]=="string"&&za.indexOf(n[0])===-1);case C.ACK:case C.BINARY_ACK:return Array.isArray(n)}}destroy(){this.reconstructor&&(this.reconstructor.finishedReconstruction(),this.reconstructor=null)}}class Va{constructor(e){this.packet=e,this.buffers=[],this.reconPack=e}takeBinaryData(e){if(this.buffers.push(e),this.buffers.length===this.reconPack.attachments){const n=qa(this.reconPack,this.buffers);return this.finishedReconstruction(),n}return null}finishedReconstruction(){this.reconPack=null,this.buffers=[]}}const Ya=Object.freeze(Object.defineProperty({__proto__:null,Decoder:Kn,Encoder:Wa,get PacketType(){return C},protocol:Ha},Symbol.toStringTag,{value:"Module"}));function te(t,e,n){return t.on(e,n),function(){t.off(e,n)}}const Ka=Object.freeze({connect:1,connect_error:1,disconnect:1,disconnecting:1,newListener:1,removeListener:1});class Pr extends D{constructor(e,n,s){super(),this.connected=!1,this.recovered=!1,this.receiveBuffer=[],this.sendBuffer=[],this._queue=[],this._queueSeq=0,this.ids=0,this.acks={},this.flags={},this.io=e,this.nsp=n,s&&s.auth&&(this.auth=s.auth),this._opts=Object.assign({},s),this.io._autoConnect&&this.open()}get disconnected(){return!this.connected}subEvents(){if(this.subs)return;const e=this.io;this.subs=[te(e,"open",this.onopen.bind(this)),te(e,"packet",this.onpacket.bind(this)),te(e,"error",this.onerror.bind(this)),te(e,"close",this.onclose.bind(this))]}get active(){return!!this.subs}connect(){return this.connected?this:(this.subEvents(),this.io._reconnecting||this.io.open(),this.io._readyState==="open"&&this.onopen(),this)}open(){return this.connect()}send(...e){return e.unshift("message"),this.emit.apply(this,e),this}emit(e,...n){if(Ka.hasOwnProperty(e))throw new Error('"'+e.toString()+'" is a reserved event name');if(n.unshift(e),this._opts.retries&&!this.flags.fromQueue&&!this.flags.volatile)return this._addToQueue(n),this;const s={type:C.EVENT,data:n};if(s.options={},s.options.compress=this.flags.compress!==!1,typeof n[n.length-1]=="function"){const o=this.ids++,l=n.pop();this._registerAckCallback(o,l),s.id=o}const r=this.io.engine&&this.io.engine.transport&&this.io.engine.transport.writable;return this.flags.volatile&&(!r||!this.connected)||(this.connected?(this.notifyOutgoingListeners(s),this.packet(s)):this.sendBuffer.push(s)),this.flags={},this}_registerAckCallback(e,n){var s;const r=(s=this.flags.timeout)!==null&&s!==void 0?s:this._opts.ackTimeout;if(r===void 0){this.acks[e]=n;return}const i=this.io.setTimeoutFn(()=>{delete this.acks[e];for(let o=0;o<this.sendBuffer.length;o++)this.sendBuffer[o].id===e&&this.sendBuffer.splice(o,1);n.call(this,new Error("operation has timed out"))},r);this.acks[e]=(...o)=>{this.io.clearTimeoutFn(i),n.apply(this,[null,...o])}}emitWithAck(e,...n){const s=this.flags.timeout!==void 0||this._opts.ackTimeout!==void 0;return new Promise((r,i)=>{n.push((o,l)=>s?o?i(o):r(l):r(o)),this.emit(e,...n)})}_addToQueue(e){let n;typeof e[e.length-1]=="function"&&(n=e.pop());const s={id:this._queueSeq++,tryCount:0,pending:!1,args:e,flags:Object.assign({fromQueue:!0},this.flags)};e.push((r,...i)=>s!==this._queue[0]?void 0:(r!==null?s.tryCount>this._opts.retries&&(this._queue.shift(),n&&n(r)):(this._queue.shift(),n&&n(null,...i)),s.pending=!1,this._drainQueue())),this._queue.push(s),this._drainQueue()}_drainQueue(e=!1){if(!this.connected||this._queue.length===0)return;const n=this._queue[0];n.pending&&!e||(n.pending=!0,n.tryCount++,this.flags=n.flags,this.emit.apply(this,n.args))}packet(e){e.nsp=this.nsp,this.io._packet(e)}onopen(){typeof this.auth=="function"?this.auth(e=>{this._sendConnectPacket(e)}):this._sendConnectPacket(this.auth)}_sendConnectPacket(e){this.packet({type:C.CONNECT,data:this._pid?Object.assign({pid:this._pid,offset:this._lastOffset},e):e})}onerror(e){this.connected||this.emitReserved("connect_error",e)}onclose(e,n){this.connected=!1,delete this.id,this.emitReserved("disconnect",e,n)}onpacket(e){if(e.nsp===this.nsp)switch(e.type){case C.CONNECT:e.data&&e.data.sid?this.onconnect(e.data.sid,e.data.pid):this.emitReserved("connect_error",new Error("It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)"));break;case C.EVENT:case C.BINARY_EVENT:this.onevent(e);break;case C.ACK:case C.BINARY_ACK:this.onack(e);break;case C.DISCONNECT:this.ondisconnect();break;case C.CONNECT_ERROR:this.destroy();const s=new Error(e.data.message);s.data=e.data.data,this.emitReserved("connect_error",s);break}}onevent(e){const n=e.data||[];e.id!=null&&n.push(this.ack(e.id)),this.connected?this.emitEvent(n):this.receiveBuffer.push(Object.freeze(n))}emitEvent(e){if(this._anyListeners&&this._anyListeners.length){const n=this._anyListeners.slice();for(const s of n)s.apply(this,e)}super.emit.apply(this,e),this._pid&&e.length&&typeof e[e.length-1]=="string"&&(this._lastOffset=e[e.length-1])}ack(e){const n=this;let s=!1;return function(...r){s||(s=!0,n.packet({type:C.ACK,id:e,data:r}))}}onack(e){const n=this.acks[e.id];typeof n=="function"&&(n.apply(this,e.data),delete this.acks[e.id])}onconnect(e,n){this.id=e,this.recovered=n&&this._pid===n,this._pid=n,this.connected=!0,this.emitBuffered(),this.emitReserved("connect"),this._drainQueue(!0)}emitBuffered(){this.receiveBuffer.forEach(e=>this.emitEvent(e)),this.receiveBuffer=[],this.sendBuffer.forEach(e=>{this.notifyOutgoingListeners(e),this.packet(e)}),this.sendBuffer=[]}ondisconnect(){this.destroy(),this.onclose("io server disconnect")}destroy(){this.subs&&(this.subs.forEach(e=>e()),this.subs=void 0),this.io._destroy(this)}disconnect(){return this.connected&&this.packet({type:C.DISCONNECT}),this.destroy(),this.connected&&this.onclose("io client disconnect"),this}close(){return this.disconnect()}compress(e){return this.flags.compress=e,this}get volatile(){return this.flags.volatile=!0,this}timeout(e){return this.flags.timeout=e,this}onAny(e){return this._anyListeners=this._anyListeners||[],this._anyListeners.push(e),this}prependAny(e){return this._anyListeners=this._anyListeners||[],this._anyListeners.unshift(e),this}offAny(e){if(!this._anyListeners)return this;if(e){const n=this._anyListeners;for(let s=0;s<n.length;s++)if(e===n[s])return n.splice(s,1),this}else this._anyListeners=[];return this}listenersAny(){return this._anyListeners||[]}onAnyOutgoing(e){return this._anyOutgoingListeners=this._anyOutgoingListeners||[],this._anyOutgoingListeners.push(e),this}prependAnyOutgoing(e){return this._anyOutgoingListeners=this._anyOutgoingListeners||[],this._anyOutgoingListeners.unshift(e),this}offAnyOutgoing(e){if(!this._anyOutgoingListeners)return this;if(e){const n=this._anyOutgoingListeners;for(let s=0;s<n.length;s++)if(e===n[s])return n.splice(s,1),this}else this._anyOutgoingListeners=[];return this}listenersAnyOutgoing(){return this._anyOutgoingListeners||[]}notifyOutgoingListeners(e){if(this._anyOutgoingListeners&&this._anyOutgoingListeners.length){const n=this._anyOutgoingListeners.slice();for(const s of n)s.apply(this,e.data)}}}function Oe(t){t=t||{},this.ms=t.min||100,this.max=t.max||1e4,this.factor=t.factor||2,this.jitter=t.jitter>0&&t.jitter<=1?t.jitter:0,this.attempts=0}Oe.prototype.duration=function(){var t=this.ms*Math.pow(this.factor,this.attempts++);if(this.jitter){var e=Math.random(),n=Math.floor(e*this.jitter*t);t=Math.floor(e*10)&1?t+n:t-n}return Math.min(t,this.max)|0};Oe.prototype.reset=function(){this.attempts=0};Oe.prototype.setMin=function(t){this.ms=t};Oe.prototype.setMax=function(t){this.max=t};Oe.prototype.setJitter=function(t){this.jitter=t};class yn extends D{constructor(e,n){var s;super(),this.nsps={},this.subs=[],e&&typeof e=="object"&&(n=e,e=void 0),n=n||{},n.path=n.path||"/socket.io",this.opts=n,Pt(this,n),this.reconnection(n.reconnection!==!1),this.reconnectionAttempts(n.reconnectionAttempts||1/0),this.reconnectionDelay(n.reconnectionDelay||1e3),this.reconnectionDelayMax(n.reconnectionDelayMax||5e3),this.randomizationFactor((s=n.randomizationFactor)!==null&&s!==void 0?s:.5),this.backoff=new Oe({min:this.reconnectionDelay(),max:this.reconnectionDelayMax(),jitter:this.randomizationFactor()}),this.timeout(n.timeout==null?2e4:n.timeout),this._readyState="closed",this.uri=e;const r=n.parser||Ya;this.encoder=new r.Encoder,this.decoder=new r.Decoder,this._autoConnect=n.autoConnect!==!1,this._autoConnect&&this.open()}reconnection(e){return arguments.length?(this._reconnection=!!e,this):this._reconnection}reconnectionAttempts(e){return e===void 0?this._reconnectionAttempts:(this._reconnectionAttempts=e,this)}reconnectionDelay(e){var n;return e===void 0?this._reconnectionDelay:(this._reconnectionDelay=e,(n=this.backoff)===null||n===void 0||n.setMin(e),this)}randomizationFactor(e){var n;return e===void 0?this._randomizationFactor:(this._randomizationFactor=e,(n=this.backoff)===null||n===void 0||n.setJitter(e),this)}reconnectionDelayMax(e){var n;return e===void 0?this._reconnectionDelayMax:(this._reconnectionDelayMax=e,(n=this.backoff)===null||n===void 0||n.setMax(e),this)}timeout(e){return arguments.length?(this._timeout=e,this):this._timeout}maybeReconnectOnOpen(){!this._reconnecting&&this._reconnection&&this.backoff.attempts===0&&this.reconnect()}open(e){if(~this._readyState.indexOf("open"))return this;this.engine=new Tr(this.uri,this.opts);const n=this.engine,s=this;this._readyState="opening",this.skipReconnect=!1;const r=te(n,"open",function(){s.onopen(),e&&e()}),i=l=>{this.cleanup(),this._readyState="closed",this.emitReserved("error",l),e?e(l):this.maybeReconnectOnOpen()},o=te(n,"error",i);if(this._timeout!==!1){const l=this._timeout,d=this.setTimeoutFn(()=>{r(),i(new Error("timeout")),n.close()},l);this.opts.autoUnref&&d.unref(),this.subs.push(()=>{this.clearTimeoutFn(d)})}return this.subs.push(r),this.subs.push(o),this}connect(e){return this.open(e)}onopen(){this.cleanup(),this._readyState="open",this.emitReserved("open");const e=this.engine;this.subs.push(te(e,"ping",this.onping.bind(this)),te(e,"data",this.ondata.bind(this)),te(e,"error",this.onerror.bind(this)),te(e,"close",this.onclose.bind(this)),te(this.decoder,"decoded",this.ondecoded.bind(this)))}onping(){this.emitReserved("ping")}ondata(e){try{this.decoder.add(e)}catch(n){this.onclose("parse error",n)}}ondecoded(e){Vn(()=>{this.emitReserved("packet",e)},this.setTimeoutFn)}onerror(e){this.emitReserved("error",e)}socket(e,n){let s=this.nsps[e];return s?this._autoConnect&&!s.active&&s.connect():(s=new Pr(this,e,n),this.nsps[e]=s),s}_destroy(e){const n=Object.keys(this.nsps);for(const s of n)if(this.nsps[s].active)return;this._close()}_packet(e){const n=this.encoder.encode(e);for(let s=0;s<n.length;s++)this.engine.write(n[s],e.options)}cleanup(){this.subs.forEach(e=>e()),this.subs.length=0,this.decoder.destroy()}_close(){this.skipReconnect=!0,this._reconnecting=!1,this.onclose("forced close"),this.engine&&this.engine.close()}disconnect(){return this._close()}onclose(e,n){this.cleanup(),this.backoff.reset(),this._readyState="closed",this.emitReserved("close",e,n),this._reconnection&&!this.skipReconnect&&this.reconnect()}reconnect(){if(this._reconnecting||this.skipReconnect)return this;const e=this;if(this.backoff.attempts>=this._reconnectionAttempts)this.backoff.reset(),this.emitReserved("reconnect_failed"),this._reconnecting=!1;else{const n=this.backoff.duration();this._reconnecting=!0;const s=this.setTimeoutFn(()=>{e.skipReconnect||(this.emitReserved("reconnect_attempt",e.backoff.attempts),!e.skipReconnect&&e.open(r=>{r?(e._reconnecting=!1,e.reconnect(),this.emitReserved("reconnect_error",r)):e.onreconnect()}))},n);this.opts.autoUnref&&s.unref(),this.subs.push(()=>{this.clearTimeoutFn(s)})}}onreconnect(){const e=this.backoff.attempts;this._reconnecting=!1,this.backoff.reset(),this.emitReserved("reconnect",e)}}const Pe={};function gt(t,e){typeof t=="object"&&(e=t,t=void 0),e=e||{};const n=Da(t,e.path||"/socket.io"),s=n.source,r=n.id,i=n.path,o=Pe[r]&&i in Pe[r].nsps,l=e.forceNew||e["force new connection"]||e.multiplex===!1||o;let d;return l?d=new yn(s,e):(Pe[r]||(Pe[r]=new yn(s,e)),d=Pe[r]),n.query&&!e.query&&(e.query=n.queryKey),d.socket(n.path,e)}Object.assign(gt,{Manager:yn,Socket:Pr,io:gt,connect:gt});const b=gt("/",{autoConnect:!1}),Os="get-connectors",Ja="remove-connector";class Mr{constructor(){W(this,"handler");this.handler=null}connect(e){this.handler!==null&&this.disconnect(),this.handler=e,b.on(Os,this.handler.onConnectors)}static remove(e){b.emit(Ja,{id:e})}disconnect(){this.handler!==null&&(b.off(Os,this.handler.onConnectors),this.handler=null)}}const Ht="music-like",Wt="music-count";class et{constructor(){W(this,"handler");this.handler=null}connect(e){this.handler!==null&&this.disconnect(),this.handler=e,b.on(Ht,this.handler.onLike),b.on(Wt,this.handler.onCount)}static like(e,n){b.emit(Ht,{id:e,isLiked:n})}static async count(e){if(e&&this.shouldIncreaseItems.push(e),!!b.connected)for(;this.shouldIncreaseItems.length>0;){const n=this.shouldIncreaseItems.pop();if(!n)break;await new Promise(s=>setTimeout(s,500)),b.emit(Wt,{id:n})}}disconnect(){this.handler!==null&&(b.off(Ht,this.handler.onLike),b.off(Wt,this.handler.onCount),this.handler=null)}}W(et,"shouldIncreaseItems",[]);const Vt="playlist-create",Yt="playlist-delete",Kt="playlist-update",Jt="playlist-change-order",Gt="playlist-add-music",Ue="playlist-move-music",$e="playlist-remove-music",qe="playlist-change-music-order";class ce{constructor(){W(this,"handler");this.handler=null}connect(e){this.handler!==null&&this.disconnect(),this.handler=e,b.on(Vt,this.handler.onCreate),b.on(Yt,this.handler.onDelete),b.on(Kt,this.handler.onUpdate),b.on(Jt,this.handler.onChangeOrder),b.on(Gt,this.handler.onAddMusic),b.on(Ue,this.handler.onMoveMusic),b.on($e,this.handler.onRemoveMusic),b.on(qe,this.handler.onChangeMusicOrder)}static create(e){b.emit(Vt,{name:e})}static update(e,n){b.emit(Kt,{id:e,name:n})}static delete(e){b.emit(Yt,{id:e})}static changeOrder(e){b.emit(Jt,{ids:e})}static addMusic(e,n){b.emit(Gt,{id:e,musicIds:n})}static moveMusic(e,n,s){b.emit(Ue,{fromId:e,toId:n,musicIds:s})}static removeMusic(e,n){b.emit($e,{id:e,musicIds:n})}static changeMusicOrder(e,n){b.emit(qe,{id:e,musicIds:n})}disconnect(){this.handler!==null&&(b.off(Vt,this.handler.onCreate),b.off(Yt,this.handler.onDelete),b.off(Kt,this.handler.onUpdate),b.off(Jt,this.handler.onChangeOrder),b.off(Gt,this.handler.onAddMusic),b.off(Ue,this.handler.onMoveMusic),b.off($e,this.handler.onRemoveMusic),b.off(qe,this.handler.onChangeMusicOrder),this.handler=null)}}const Ae=t=>t.sort((e,n)=>e.name.localeCompare(n.name)),kt=t=>t.sort((e,n)=>e.artist.name.localeCompare(n.artist.name)),Rs=t=>t.sort((e,n)=>e.album.name.localeCompare(n.album.name)),dt=t=>t.sort((e,n)=>n.playCount-e.playCount),_e=t=>t.sort((e,n)=>n.createdAt-e.createdAt),Ts=t=>t.sort((e,n)=>n.publishedYear.localeCompare(e.publishedYear)),Ls=t=>t.sort((e,n)=>n.albumCount-e.albumCount),Ps=t=>t.sort((e,n)=>n.musicCount-e.musicCount);function Dr(t,e){return function(){return t.apply(e,arguments)}}const{toString:Ga}=Object.prototype,{getPrototypeOf:Jn}=Object,Mt=(t=>e=>{const n=Ga.call(e);return t[n]||(t[n]=n.slice(8,-1).toLowerCase())})(Object.create(null)),de=t=>(t=t.toLowerCase(),e=>Mt(e)===t),Dt=t=>e=>typeof e===t,{isArray:Re}=Array,Ke=Dt("undefined");function Xa(t){return t!==null&&!Ke(t)&&t.constructor!==null&&!Ke(t.constructor)&&ee(t.constructor.isBuffer)&&t.constructor.isBuffer(t)}const Ir=de("ArrayBuffer");function Qa(t){let e;return typeof ArrayBuffer<"u"&&ArrayBuffer.isView?e=ArrayBuffer.isView(t):e=t&&t.buffer&&Ir(t.buffer),e}const Za=Dt("string"),ee=Dt("function"),Br=Dt("number"),It=t=>t!==null&&typeof t=="object",ec=t=>t===!0||t===!1,yt=t=>{if(Mt(t)!=="object")return!1;const e=Jn(t);return(e===null||e===Object.prototype||Object.getPrototypeOf(e)===null)&&!(Symbol.toStringTag in t)&&!(Symbol.iterator in t)},tc=de("Date"),nc=de("File"),sc=de("Blob"),rc=de("FileList"),ic=t=>It(t)&&ee(t.pipe),oc=t=>{let e;return t&&(typeof FormData=="function"&&t instanceof FormData||ee(t.append)&&((e=Mt(t))==="formdata"||e==="object"&&ee(t.toString)&&t.toString()==="[object FormData]"))},ac=de("URLSearchParams"),cc=t=>t.trim?t.trim():t.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"");function tt(t,e,{allOwnKeys:n=!1}={}){if(t===null||typeof t>"u")return;let s,r;if(typeof t!="object"&&(t=[t]),Re(t))for(s=0,r=t.length;s<r;s++)e.call(null,t[s],s,t);else{const i=n?Object.getOwnPropertyNames(t):Object.keys(t),o=i.length;let l;for(s=0;s<o;s++)l=i[s],e.call(null,t[l],l,t)}}function Fr(t,e){e=e.toLowerCase();const n=Object.keys(t);let s=n.length,r;for(;s-- >0;)if(r=n[s],e===r.toLowerCase())return r;return null}const Ur=(()=>typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:global)(),$r=t=>!Ke(t)&&t!==Ur;function bn(){const{caseless:t}=$r(this)&&this||{},e={},n=(s,r)=>{const i=t&&Fr(e,r)||r;yt(e[i])&&yt(s)?e[i]=bn(e[i],s):yt(s)?e[i]=bn({},s):Re(s)?e[i]=s.slice():e[i]=s};for(let s=0,r=arguments.length;s<r;s++)arguments[s]&&tt(arguments[s],n);return e}const lc=(t,e,n,{allOwnKeys:s}={})=>(tt(e,(r,i)=>{n&&ee(r)?t[i]=Dr(r,n):t[i]=r},{allOwnKeys:s}),t),dc=t=>(t.charCodeAt(0)===65279&&(t=t.slice(1)),t),uc=(t,e,n,s)=>{t.prototype=Object.create(e.prototype,s),t.prototype.constructor=t,Object.defineProperty(t,"super",{value:e.prototype}),n&&Object.assign(t.prototype,n)},hc=(t,e,n,s)=>{let r,i,o;const l={};if(e=e||{},t==null)return e;do{for(r=Object.getOwnPropertyNames(t),i=r.length;i-- >0;)o=r[i],(!s||s(o,t,e))&&!l[o]&&(e[o]=t[o],l[o]=!0);t=n!==!1&&Jn(t)}while(t&&(!n||n(t,e))&&t!==Object.prototype);return e},fc=(t,e,n)=>{t=String(t),(n===void 0||n>t.length)&&(n=t.length),n-=e.length;const s=t.indexOf(e,n);return s!==-1&&s===n},mc=t=>{if(!t)return null;if(Re(t))return t;let e=t.length;if(!Br(e))return null;const n=new Array(e);for(;e-- >0;)n[e]=t[e];return n},pc=(t=>e=>t&&e instanceof t)(typeof Uint8Array<"u"&&Jn(Uint8Array)),gc=(t,e)=>{const s=(t&&t[Symbol.iterator]).call(t);let r;for(;(r=s.next())&&!r.done;){const i=r.value;e.call(t,i[0],i[1])}},yc=(t,e)=>{let n;const s=[];for(;(n=t.exec(e))!==null;)s.push(n);return s},bc=de("HTMLFormElement"),xc=t=>t.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g,function(n,s,r){return s.toUpperCase()+r}),Ms=(({hasOwnProperty:t})=>(e,n)=>t.call(e,n))(Object.prototype),wc=de("RegExp"),qr=(t,e)=>{const n=Object.getOwnPropertyDescriptors(t),s={};tt(n,(r,i)=>{let o;(o=e(r,i,t))!==!1&&(s[i]=o||r)}),Object.defineProperties(t,s)},vc=t=>{qr(t,(e,n)=>{if(ee(t)&&["arguments","caller","callee"].indexOf(n)!==-1)return!1;const s=t[n];if(ee(s)){if(e.enumerable=!1,"writable"in e){e.writable=!1;return}e.set||(e.set=()=>{throw Error("Can not rewrite read-only method '"+n+"'")})}})},Cc=(t,e)=>{const n={},s=r=>{r.forEach(i=>{n[i]=!0})};return Re(t)?s(t):s(String(t).split(e)),n},Ec=()=>{},kc=(t,e)=>(t=+t,Number.isFinite(t)?t:e),Xt="abcdefghijklmnopqrstuvwxyz",Ds="0123456789",zr={DIGIT:Ds,ALPHA:Xt,ALPHA_DIGIT:Xt+Xt.toUpperCase()+Ds},Ac=(t=16,e=zr.ALPHA_DIGIT)=>{let n="";const{length:s}=e;for(;t--;)n+=e[Math.random()*s|0];return n};function _c(t){return!!(t&&ee(t.append)&&t[Symbol.toStringTag]==="FormData"&&t[Symbol.iterator])}const Sc=t=>{const e=new Array(10),n=(s,r)=>{if(It(s)){if(e.indexOf(s)>=0)return;if(!("toJSON"in s)){e[r]=s;const i=Re(s)?[]:{};return tt(s,(o,l)=>{const d=n(o,r+1);!Ke(d)&&(i[l]=d)}),e[r]=void 0,i}}return s};return n(t,0)},Nc=de("AsyncFunction"),jc=t=>t&&(It(t)||ee(t))&&ee(t.then)&&ee(t.catch),f={isArray:Re,isArrayBuffer:Ir,isBuffer:Xa,isFormData:oc,isArrayBufferView:Qa,isString:Za,isNumber:Br,isBoolean:ec,isObject:It,isPlainObject:yt,isUndefined:Ke,isDate:tc,isFile:nc,isBlob:sc,isRegExp:wc,isFunction:ee,isStream:ic,isURLSearchParams:ac,isTypedArray:pc,isFileList:rc,forEach:tt,merge:bn,extend:lc,trim:cc,stripBOM:dc,inherits:uc,toFlatObject:hc,kindOf:Mt,kindOfTest:de,endsWith:fc,toArray:mc,forEachEntry:gc,matchAll:yc,isHTMLForm:bc,hasOwnProperty:Ms,hasOwnProp:Ms,reduceDescriptors:qr,freezeMethods:vc,toObjectSet:Cc,toCamelCase:xc,noop:Ec,toFiniteNumber:kc,findKey:Fr,global:Ur,isContextDefined:$r,ALPHABET:zr,generateString:Ac,isSpecCompliantForm:_c,toJSONObject:Sc,isAsyncFn:Nc,isThenable:jc};function A(t,e,n,s,r){Error.call(this),Error.captureStackTrace?Error.captureStackTrace(this,this.constructor):this.stack=new Error().stack,this.message=t,this.name="AxiosError",e&&(this.code=e),n&&(this.config=n),s&&(this.request=s),r&&(this.response=r)}f.inherits(A,Error,{toJSON:function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:f.toJSONObject(this.config),code:this.code,status:this.response&&this.response.status?this.response.status:null}}});const Hr=A.prototype,Wr={};["ERR_BAD_OPTION_VALUE","ERR_BAD_OPTION","ECONNABORTED","ETIMEDOUT","ERR_NETWORK","ERR_FR_TOO_MANY_REDIRECTS","ERR_DEPRECATED","ERR_BAD_RESPONSE","ERR_BAD_REQUEST","ERR_CANCELED","ERR_NOT_SUPPORT","ERR_INVALID_URL"].forEach(t=>{Wr[t]={value:t}});Object.defineProperties(A,Wr);Object.defineProperty(Hr,"isAxiosError",{value:!0});A.from=(t,e,n,s,r,i)=>{const o=Object.create(Hr);return f.toFlatObject(t,o,function(d){return d!==Error.prototype},l=>l!=="isAxiosError"),A.call(o,t.message,e,n,s,r),o.cause=t,o.name=t.name,i&&Object.assign(o,i),o};const Oc=null;function xn(t){return f.isPlainObject(t)||f.isArray(t)}function Vr(t){return f.endsWith(t,"[]")?t.slice(0,-2):t}function Is(t,e,n){return t?t.concat(e).map(function(r,i){return r=Vr(r),!n&&i?"["+r+"]":r}).join(n?".":""):e}function Rc(t){return f.isArray(t)&&!t.some(xn)}const Tc=f.toFlatObject(f,{},null,function(e){return/^is[A-Z]/.test(e)});function Bt(t,e,n){if(!f.isObject(t))throw new TypeError("target must be an object");e=e||new FormData,n=f.toFlatObject(n,{metaTokens:!0,dots:!1,indexes:!1},!1,function(g,w){return!f.isUndefined(w[g])});const s=n.metaTokens,r=n.visitor||c,i=n.dots,o=n.indexes,d=(n.Blob||typeof Blob<"u"&&Blob)&&f.isSpecCompliantForm(e);if(!f.isFunction(r))throw new TypeError("visitor must be a function");function u(p){if(p===null)return"";if(f.isDate(p))return p.toISOString();if(!d&&f.isBlob(p))throw new A("Blob is not supported. Use a Buffer instead.");return f.isArrayBuffer(p)||f.isTypedArray(p)?d&&typeof Blob=="function"?new Blob([p]):Buffer.from(p):p}function c(p,g,w){let k=p;if(p&&!w&&typeof p=="object"){if(f.endsWith(g,"{}"))g=s?g:g.slice(0,-2),p=JSON.stringify(p);else if(f.isArray(p)&&Rc(p)||(f.isFileList(p)||f.endsWith(g,"[]"))&&(k=f.toArray(p)))return g=Vr(g),k.forEach(function(L,ue){!(f.isUndefined(L)||L===null)&&e.append(o===!0?Is([g],ue,i):o===null?g:g+"[]",u(L))}),!1}return xn(p)?!0:(e.append(Is(w,g,i),u(p)),!1)}const h=[],y=Object.assign(Tc,{defaultVisitor:c,convertValue:u,isVisitable:xn});function x(p,g){if(!f.isUndefined(p)){if(h.indexOf(p)!==-1)throw Error("Circular reference detected in "+g.join("."));h.push(p),f.forEach(p,function(k,v){(!(f.isUndefined(k)||k===null)&&r.call(e,k,f.isString(v)?v.trim():v,g,y))===!0&&x(k,g?g.concat(v):[v])}),h.pop()}}if(!f.isObject(t))throw new TypeError("data must be an object");return x(t),e}function Bs(t){const e={"!":"%21","'":"%27","(":"%28",")":"%29","~":"%7E","%20":"+","%00":"\0"};return encodeURIComponent(t).replace(/[!'()~]|%20|%00/g,function(s){return e[s]})}function Gn(t,e){this._pairs=[],t&&Bt(t,this,e)}const Yr=Gn.prototype;Yr.append=function(e,n){this._pairs.push([e,n])};Yr.toString=function(e){const n=e?function(s){return e.call(this,s,Bs)}:Bs;return this._pairs.map(function(r){return n(r[0])+"="+n(r[1])},"").join("&")};function Lc(t){return encodeURIComponent(t).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}function Kr(t,e,n){if(!e)return t;const s=n&&n.encode||Lc,r=n&&n.serialize;let i;if(r?i=r(e,n):i=f.isURLSearchParams(e)?e.toString():new Gn(e,n).toString(s),i){const o=t.indexOf("#");o!==-1&&(t=t.slice(0,o)),t+=(t.indexOf("?")===-1?"?":"&")+i}return t}class Pc{constructor(){this.handlers=[]}use(e,n,s){return this.handlers.push({fulfilled:e,rejected:n,synchronous:s?s.synchronous:!1,runWhen:s?s.runWhen:null}),this.handlers.length-1}eject(e){this.handlers[e]&&(this.handlers[e]=null)}clear(){this.handlers&&(this.handlers=[])}forEach(e){f.forEach(this.handlers,function(s){s!==null&&e(s)})}}const Fs=Pc,Jr={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1},Mc=typeof URLSearchParams<"u"?URLSearchParams:Gn,Dc=typeof FormData<"u"?FormData:null,Ic=typeof Blob<"u"?Blob:null,Bc=(()=>{let t;return typeof navigator<"u"&&((t=navigator.product)==="ReactNative"||t==="NativeScript"||t==="NS")?!1:typeof window<"u"&&typeof document<"u"})(),Fc=(()=>typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope&&typeof self.importScripts=="function")(),ie={isBrowser:!0,classes:{URLSearchParams:Mc,FormData:Dc,Blob:Ic},isStandardBrowserEnv:Bc,isStandardBrowserWebWorkerEnv:Fc,protocols:["http","https","file","blob","url","data"]};function Uc(t,e){return Bt(t,new ie.classes.URLSearchParams,Object.assign({visitor:function(n,s,r,i){return ie.isNode&&f.isBuffer(n)?(this.append(s,n.toString("base64")),!1):i.defaultVisitor.apply(this,arguments)}},e))}function $c(t){return f.matchAll(/\w+|\[(\w*)]/g,t).map(e=>e[0]==="[]"?"":e[1]||e[0])}function qc(t){const e={},n=Object.keys(t);let s;const r=n.length;let i;for(s=0;s<r;s++)i=n[s],e[i]=t[i];return e}function Gr(t){function e(n,s,r,i){let o=n[i++];const l=Number.isFinite(+o),d=i>=n.length;return o=!o&&f.isArray(r)?r.length:o,d?(f.hasOwnProp(r,o)?r[o]=[r[o],s]:r[o]=s,!l):((!r[o]||!f.isObject(r[o]))&&(r[o]=[]),e(n,s,r[o],i)&&f.isArray(r[o])&&(r[o]=qc(r[o])),!l)}if(f.isFormData(t)&&f.isFunction(t.entries)){const n={};return f.forEachEntry(t,(s,r)=>{e($c(s),r,n,0)}),n}return null}function zc(t,e,n){if(f.isString(t))try{return(e||JSON.parse)(t),f.trim(t)}catch(s){if(s.name!=="SyntaxError")throw s}return(n||JSON.stringify)(t)}const Xn={transitional:Jr,adapter:["xhr","http"],transformRequest:[function(e,n){const s=n.getContentType()||"",r=s.indexOf("application/json")>-1,i=f.isObject(e);if(i&&f.isHTMLForm(e)&&(e=new FormData(e)),f.isFormData(e))return r&&r?JSON.stringify(Gr(e)):e;if(f.isArrayBuffer(e)||f.isBuffer(e)||f.isStream(e)||f.isFile(e)||f.isBlob(e))return e;if(f.isArrayBufferView(e))return e.buffer;if(f.isURLSearchParams(e))return n.setContentType("application/x-www-form-urlencoded;charset=utf-8",!1),e.toString();let l;if(i){if(s.indexOf("application/x-www-form-urlencoded")>-1)return Uc(e,this.formSerializer).toString();if((l=f.isFileList(e))||s.indexOf("multipart/form-data")>-1){const d=this.env&&this.env.FormData;return Bt(l?{"files[]":e}:e,d&&new d,this.formSerializer)}}return i||r?(n.setContentType("application/json",!1),zc(e)):e}],transformResponse:[function(e){const n=this.transitional||Xn.transitional,s=n&&n.forcedJSONParsing,r=this.responseType==="json";if(e&&f.isString(e)&&(s&&!this.responseType||r)){const o=!(n&&n.silentJSONParsing)&&r;try{return JSON.parse(e)}catch(l){if(o)throw l.name==="SyntaxError"?A.from(l,A.ERR_BAD_RESPONSE,this,null,this.response):l}}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,env:{FormData:ie.classes.FormData,Blob:ie.classes.Blob},validateStatus:function(e){return e>=200&&e<300},headers:{common:{Accept:"application/json, text/plain, */*","Content-Type":void 0}}};f.forEach(["delete","get","head","post","put","patch"],t=>{Xn.headers[t]={}});const Qn=Xn,Hc=f.toObjectSet(["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"]),Wc=t=>{const e={};let n,s,r;return t&&t.split(`
`).forEach(function(o){r=o.indexOf(":"),n=o.substring(0,r).trim().toLowerCase(),s=o.substring(r+1).trim(),!(!n||e[n]&&Hc[n])&&(n==="set-cookie"?e[n]?e[n].push(s):e[n]=[s]:e[n]=e[n]?e[n]+", "+s:s)}),e},Us=Symbol("internals");function Me(t){return t&&String(t).trim().toLowerCase()}function bt(t){return t===!1||t==null?t:f.isArray(t)?t.map(bt):String(t)}function Vc(t){const e=Object.create(null),n=/([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;let s;for(;s=n.exec(t);)e[s[1]]=s[2];return e}const Yc=t=>/^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(t.trim());function Qt(t,e,n,s,r){if(f.isFunction(s))return s.call(this,e,n);if(r&&(e=n),!!f.isString(e)){if(f.isString(s))return e.indexOf(s)!==-1;if(f.isRegExp(s))return s.test(e)}}function Kc(t){return t.trim().toLowerCase().replace(/([a-z\d])(\w*)/g,(e,n,s)=>n.toUpperCase()+s)}function Jc(t,e){const n=f.toCamelCase(" "+e);["get","set","has"].forEach(s=>{Object.defineProperty(t,s+n,{value:function(r,i,o){return this[s].call(this,e,r,i,o)},configurable:!0})})}class Ft{constructor(e){e&&this.set(e)}set(e,n,s){const r=this;function i(l,d,u){const c=Me(d);if(!c)throw new Error("header name must be a non-empty string");const h=f.findKey(r,c);(!h||r[h]===void 0||u===!0||u===void 0&&r[h]!==!1)&&(r[h||d]=bt(l))}const o=(l,d)=>f.forEach(l,(u,c)=>i(u,c,d));return f.isPlainObject(e)||e instanceof this.constructor?o(e,n):f.isString(e)&&(e=e.trim())&&!Yc(e)?o(Wc(e),n):e!=null&&i(n,e,s),this}get(e,n){if(e=Me(e),e){const s=f.findKey(this,e);if(s){const r=this[s];if(!n)return r;if(n===!0)return Vc(r);if(f.isFunction(n))return n.call(this,r,s);if(f.isRegExp(n))return n.exec(r);throw new TypeError("parser must be boolean|regexp|function")}}}has(e,n){if(e=Me(e),e){const s=f.findKey(this,e);return!!(s&&this[s]!==void 0&&(!n||Qt(this,this[s],s,n)))}return!1}delete(e,n){const s=this;let r=!1;function i(o){if(o=Me(o),o){const l=f.findKey(s,o);l&&(!n||Qt(s,s[l],l,n))&&(delete s[l],r=!0)}}return f.isArray(e)?e.forEach(i):i(e),r}clear(e){const n=Object.keys(this);let s=n.length,r=!1;for(;s--;){const i=n[s];(!e||Qt(this,this[i],i,e,!0))&&(delete this[i],r=!0)}return r}normalize(e){const n=this,s={};return f.forEach(this,(r,i)=>{const o=f.findKey(s,i);if(o){n[o]=bt(r),delete n[i];return}const l=e?Kc(i):String(i).trim();l!==i&&delete n[i],n[l]=bt(r),s[l]=!0}),this}concat(...e){return this.constructor.concat(this,...e)}toJSON(e){const n=Object.create(null);return f.forEach(this,(s,r)=>{s!=null&&s!==!1&&(n[r]=e&&f.isArray(s)?s.join(", "):s)}),n}[Symbol.iterator](){return Object.entries(this.toJSON())[Symbol.iterator]()}toString(){return Object.entries(this.toJSON()).map(([e,n])=>e+": "+n).join(`
`)}get[Symbol.toStringTag](){return"AxiosHeaders"}static from(e){return e instanceof this?e:new this(e)}static concat(e,...n){const s=new this(e);return n.forEach(r=>s.set(r)),s}static accessor(e){const s=(this[Us]=this[Us]={accessors:{}}).accessors,r=this.prototype;function i(o){const l=Me(o);s[l]||(Jc(r,o),s[l]=!0)}return f.isArray(e)?e.forEach(i):i(e),this}}Ft.accessor(["Content-Type","Content-Length","Accept","Accept-Encoding","User-Agent","Authorization"]);f.reduceDescriptors(Ft.prototype,({value:t},e)=>{let n=e[0].toUpperCase()+e.slice(1);return{get:()=>t,set(s){this[n]=s}}});f.freezeMethods(Ft);const he=Ft;function Zt(t,e){const n=this||Qn,s=e||n,r=he.from(s.headers);let i=s.data;return f.forEach(t,function(l){i=l.call(n,i,r.normalize(),e?e.status:void 0)}),r.normalize(),i}function Xr(t){return!!(t&&t.__CANCEL__)}function nt(t,e,n){A.call(this,t??"canceled",A.ERR_CANCELED,e,n),this.name="CanceledError"}f.inherits(nt,A,{__CANCEL__:!0});function Gc(t,e,n){const s=n.config.validateStatus;!n.status||!s||s(n.status)?t(n):e(new A("Request failed with status code "+n.status,[A.ERR_BAD_REQUEST,A.ERR_BAD_RESPONSE][Math.floor(n.status/100)-4],n.config,n.request,n))}const Xc=ie.isStandardBrowserEnv?function(){return{write:function(n,s,r,i,o,l){const d=[];d.push(n+"="+encodeURIComponent(s)),f.isNumber(r)&&d.push("expires="+new Date(r).toGMTString()),f.isString(i)&&d.push("path="+i),f.isString(o)&&d.push("domain="+o),l===!0&&d.push("secure"),document.cookie=d.join("; ")},read:function(n){const s=document.cookie.match(new RegExp("(^|;\\s*)("+n+")=([^;]*)"));return s?decodeURIComponent(s[3]):null},remove:function(n){this.write(n,"",Date.now()-864e5)}}}():function(){return{write:function(){},read:function(){return null},remove:function(){}}}();function Qc(t){return/^([a-z][a-z\d+\-.]*:)?\/\//i.test(t)}function Zc(t,e){return e?t.replace(/\/+$/,"")+"/"+e.replace(/^\/+/,""):t}function Qr(t,e){return t&&!Qc(e)?Zc(t,e):e}const el=ie.isStandardBrowserEnv?function(){const e=/(msie|trident)/i.test(navigator.userAgent),n=document.createElement("a");let s;function r(i){let o=i;return e&&(n.setAttribute("href",o),o=n.href),n.setAttribute("href",o),{href:n.href,protocol:n.protocol?n.protocol.replace(/:$/,""):"",host:n.host,search:n.search?n.search.replace(/^\?/,""):"",hash:n.hash?n.hash.replace(/^#/,""):"",hostname:n.hostname,port:n.port,pathname:n.pathname.charAt(0)==="/"?n.pathname:"/"+n.pathname}}return s=r(window.location.href),function(o){const l=f.isString(o)?r(o):o;return l.protocol===s.protocol&&l.host===s.host}}():function(){return function(){return!0}}();function tl(t){const e=/^([-+\w]{1,25})(:?\/\/|:)/.exec(t);return e&&e[1]||""}function nl(t,e){t=t||10;const n=new Array(t),s=new Array(t);let r=0,i=0,o;return e=e!==void 0?e:1e3,function(d){const u=Date.now(),c=s[i];o||(o=u),n[r]=d,s[r]=u;let h=i,y=0;for(;h!==r;)y+=n[h++],h=h%t;if(r=(r+1)%t,r===i&&(i=(i+1)%t),u-o<e)return;const x=c&&u-c;return x?Math.round(y*1e3/x):void 0}}function $s(t,e){let n=0;const s=nl(50,250);return r=>{const i=r.loaded,o=r.lengthComputable?r.total:void 0,l=i-n,d=s(l),u=i<=o;n=i;const c={loaded:i,total:o,progress:o?i/o:void 0,bytes:l,rate:d||void 0,estimated:d&&o&&u?(o-i)/d:void 0,event:r};c[e?"download":"upload"]=!0,t(c)}}const sl=typeof XMLHttpRequest<"u",rl=sl&&function(t){return new Promise(function(n,s){let r=t.data;const i=he.from(t.headers).normalize(),o=t.responseType;let l;function d(){t.cancelToken&&t.cancelToken.unsubscribe(l),t.signal&&t.signal.removeEventListener("abort",l)}let u;f.isFormData(r)&&(ie.isStandardBrowserEnv||ie.isStandardBrowserWebWorkerEnv?i.setContentType(!1):i.getContentType(/^\s*multipart\/form-data/)?f.isString(u=i.getContentType())&&i.setContentType(u.replace(/^\s*(multipart\/form-data);+/,"$1")):i.setContentType("multipart/form-data"));let c=new XMLHttpRequest;if(t.auth){const p=t.auth.username||"",g=t.auth.password?unescape(encodeURIComponent(t.auth.password)):"";i.set("Authorization","Basic "+btoa(p+":"+g))}const h=Qr(t.baseURL,t.url);c.open(t.method.toUpperCase(),Kr(h,t.params,t.paramsSerializer),!0),c.timeout=t.timeout;function y(){if(!c)return;const p=he.from("getAllResponseHeaders"in c&&c.getAllResponseHeaders()),w={data:!o||o==="text"||o==="json"?c.responseText:c.response,status:c.status,statusText:c.statusText,headers:p,config:t,request:c};Gc(function(v){n(v),d()},function(v){s(v),d()},w),c=null}if("onloadend"in c?c.onloadend=y:c.onreadystatechange=function(){!c||c.readyState!==4||c.status===0&&!(c.responseURL&&c.responseURL.indexOf("file:")===0)||setTimeout(y)},c.onabort=function(){c&&(s(new A("Request aborted",A.ECONNABORTED,t,c)),c=null)},c.onerror=function(){s(new A("Network Error",A.ERR_NETWORK,t,c)),c=null},c.ontimeout=function(){let g=t.timeout?"timeout of "+t.timeout+"ms exceeded":"timeout exceeded";const w=t.transitional||Jr;t.timeoutErrorMessage&&(g=t.timeoutErrorMessage),s(new A(g,w.clarifyTimeoutError?A.ETIMEDOUT:A.ECONNABORTED,t,c)),c=null},ie.isStandardBrowserEnv){const p=(t.withCredentials||el(h))&&t.xsrfCookieName&&Xc.read(t.xsrfCookieName);p&&i.set(t.xsrfHeaderName,p)}r===void 0&&i.setContentType(null),"setRequestHeader"in c&&f.forEach(i.toJSON(),function(g,w){c.setRequestHeader(w,g)}),f.isUndefined(t.withCredentials)||(c.withCredentials=!!t.withCredentials),o&&o!=="json"&&(c.responseType=t.responseType),typeof t.onDownloadProgress=="function"&&c.addEventListener("progress",$s(t.onDownloadProgress,!0)),typeof t.onUploadProgress=="function"&&c.upload&&c.upload.addEventListener("progress",$s(t.onUploadProgress)),(t.cancelToken||t.signal)&&(l=p=>{c&&(s(!p||p.type?new nt(null,t,c):p),c.abort(),c=null)},t.cancelToken&&t.cancelToken.subscribe(l),t.signal&&(t.signal.aborted?l():t.signal.addEventListener("abort",l)));const x=tl(h);if(x&&ie.protocols.indexOf(x)===-1){s(new A("Unsupported protocol "+x+":",A.ERR_BAD_REQUEST,t));return}c.send(r||null)})},wn={http:Oc,xhr:rl};f.forEach(wn,(t,e)=>{if(t){try{Object.defineProperty(t,"name",{value:e})}catch{}Object.defineProperty(t,"adapterName",{value:e})}});const qs=t=>`- ${t}`,il=t=>f.isFunction(t)||t===null||t===!1,Zr={getAdapter:t=>{t=f.isArray(t)?t:[t];const{length:e}=t;let n,s;const r={};for(let i=0;i<e;i++){n=t[i];let o;if(s=n,!il(n)&&(s=wn[(o=String(n)).toLowerCase()],s===void 0))throw new A(`Unknown adapter '${o}'`);if(s)break;r[o||"#"+i]=s}if(!s){const i=Object.entries(r).map(([l,d])=>`adapter ${l} `+(d===!1?"is not supported by the environment":"is not available in the build"));let o=e?i.length>1?`since :
`+i.map(qs).join(`
`):" "+qs(i[0]):"as no adapter specified";throw new A("There is no suitable adapter to dispatch the request "+o,"ERR_NOT_SUPPORT")}return s},adapters:wn};function en(t){if(t.cancelToken&&t.cancelToken.throwIfRequested(),t.signal&&t.signal.aborted)throw new nt(null,t)}function zs(t){return en(t),t.headers=he.from(t.headers),t.data=Zt.call(t,t.transformRequest),["post","put","patch"].indexOf(t.method)!==-1&&t.headers.setContentType("application/x-www-form-urlencoded",!1),Zr.getAdapter(t.adapter||Qn.adapter)(t).then(function(s){return en(t),s.data=Zt.call(t,t.transformResponse,s),s.headers=he.from(s.headers),s},function(s){return Xr(s)||(en(t),s&&s.response&&(s.response.data=Zt.call(t,t.transformResponse,s.response),s.response.headers=he.from(s.response.headers))),Promise.reject(s)})}const Hs=t=>t instanceof he?t.toJSON():t;function Se(t,e){e=e||{};const n={};function s(u,c,h){return f.isPlainObject(u)&&f.isPlainObject(c)?f.merge.call({caseless:h},u,c):f.isPlainObject(c)?f.merge({},c):f.isArray(c)?c.slice():c}function r(u,c,h){if(f.isUndefined(c)){if(!f.isUndefined(u))return s(void 0,u,h)}else return s(u,c,h)}function i(u,c){if(!f.isUndefined(c))return s(void 0,c)}function o(u,c){if(f.isUndefined(c)){if(!f.isUndefined(u))return s(void 0,u)}else return s(void 0,c)}function l(u,c,h){if(h in e)return s(u,c);if(h in t)return s(void 0,u)}const d={url:i,method:i,data:i,baseURL:o,transformRequest:o,transformResponse:o,paramsSerializer:o,timeout:o,timeoutMessage:o,withCredentials:o,adapter:o,responseType:o,xsrfCookieName:o,xsrfHeaderName:o,onUploadProgress:o,onDownloadProgress:o,decompress:o,maxContentLength:o,maxBodyLength:o,beforeRedirect:o,transport:o,httpAgent:o,httpsAgent:o,cancelToken:o,socketPath:o,responseEncoding:o,validateStatus:l,headers:(u,c)=>r(Hs(u),Hs(c),!0)};return f.forEach(Object.keys(Object.assign({},t,e)),function(c){const h=d[c]||r,y=h(t[c],e[c],c);f.isUndefined(y)&&h!==l||(n[c]=y)}),n}const ei="1.5.1",Zn={};["object","boolean","number","function","string","symbol"].forEach((t,e)=>{Zn[t]=function(s){return typeof s===t||"a"+(e<1?"n ":" ")+t}});const Ws={};Zn.transitional=function(e,n,s){function r(i,o){return"[Axios v"+ei+"] Transitional option '"+i+"'"+o+(s?". "+s:"")}return(i,o,l)=>{if(e===!1)throw new A(r(o," has been removed"+(n?" in "+n:"")),A.ERR_DEPRECATED);return n&&!Ws[o]&&(Ws[o]=!0,console.warn(r(o," has been deprecated since v"+n+" and will be removed in the near future"))),e?e(i,o,l):!0}};function ol(t,e,n){if(typeof t!="object")throw new A("options must be an object",A.ERR_BAD_OPTION_VALUE);const s=Object.keys(t);let r=s.length;for(;r-- >0;){const i=s[r],o=e[i];if(o){const l=t[i],d=l===void 0||o(l,i,t);if(d!==!0)throw new A("option "+i+" must be "+d,A.ERR_BAD_OPTION_VALUE);continue}if(n!==!0)throw new A("Unknown option "+i,A.ERR_BAD_OPTION)}}const vn={assertOptions:ol,validators:Zn},fe=vn.validators;class At{constructor(e){this.defaults=e,this.interceptors={request:new Fs,response:new Fs}}request(e,n){typeof e=="string"?(n=n||{},n.url=e):n=e||{},n=Se(this.defaults,n);const{transitional:s,paramsSerializer:r,headers:i}=n;s!==void 0&&vn.assertOptions(s,{silentJSONParsing:fe.transitional(fe.boolean),forcedJSONParsing:fe.transitional(fe.boolean),clarifyTimeoutError:fe.transitional(fe.boolean)},!1),r!=null&&(f.isFunction(r)?n.paramsSerializer={serialize:r}:vn.assertOptions(r,{encode:fe.function,serialize:fe.function},!0)),n.method=(n.method||this.defaults.method||"get").toLowerCase();let o=i&&f.merge(i.common,i[n.method]);i&&f.forEach(["delete","get","head","post","put","patch","common"],p=>{delete i[p]}),n.headers=he.concat(o,i);const l=[];let d=!0;this.interceptors.request.forEach(function(g){typeof g.runWhen=="function"&&g.runWhen(n)===!1||(d=d&&g.synchronous,l.unshift(g.fulfilled,g.rejected))});const u=[];this.interceptors.response.forEach(function(g){u.push(g.fulfilled,g.rejected)});let c,h=0,y;if(!d){const p=[zs.bind(this),void 0];for(p.unshift.apply(p,l),p.push.apply(p,u),y=p.length,c=Promise.resolve(n);h<y;)c=c.then(p[h++],p[h++]);return c}y=l.length;let x=n;for(h=0;h<y;){const p=l[h++],g=l[h++];try{x=p(x)}catch(w){g.call(this,w);break}}try{c=zs.call(this,x)}catch(p){return Promise.reject(p)}for(h=0,y=u.length;h<y;)c=c.then(u[h++],u[h++]);return c}getUri(e){e=Se(this.defaults,e);const n=Qr(e.baseURL,e.url);return Kr(n,e.params,e.paramsSerializer)}}f.forEach(["delete","get","head","options"],function(e){At.prototype[e]=function(n,s){return this.request(Se(s||{},{method:e,url:n,data:(s||{}).data}))}});f.forEach(["post","put","patch"],function(e){function n(s){return function(i,o,l){return this.request(Se(l||{},{method:e,headers:s?{"Content-Type":"multipart/form-data"}:{},url:i,data:o}))}}At.prototype[e]=n(),At.prototype[e+"Form"]=n(!0)});const xt=At;class es{constructor(e){if(typeof e!="function")throw new TypeError("executor must be a function.");let n;this.promise=new Promise(function(i){n=i});const s=this;this.promise.then(r=>{if(!s._listeners)return;let i=s._listeners.length;for(;i-- >0;)s._listeners[i](r);s._listeners=null}),this.promise.then=r=>{let i;const o=new Promise(l=>{s.subscribe(l),i=l}).then(r);return o.cancel=function(){s.unsubscribe(i)},o},e(function(i,o,l){s.reason||(s.reason=new nt(i,o,l),n(s.reason))})}throwIfRequested(){if(this.reason)throw this.reason}subscribe(e){if(this.reason){e(this.reason);return}this._listeners?this._listeners.push(e):this._listeners=[e]}unsubscribe(e){if(!this._listeners)return;const n=this._listeners.indexOf(e);n!==-1&&this._listeners.splice(n,1)}static source(){let e;return{token:new es(function(r){e=r}),cancel:e}}}const al=es;function cl(t){return function(n){return t.apply(null,n)}}function ll(t){return f.isObject(t)&&t.isAxiosError===!0}const Cn={Continue:100,SwitchingProtocols:101,Processing:102,EarlyHints:103,Ok:200,Created:201,Accepted:202,NonAuthoritativeInformation:203,NoContent:204,ResetContent:205,PartialContent:206,MultiStatus:207,AlreadyReported:208,ImUsed:226,MultipleChoices:300,MovedPermanently:301,Found:302,SeeOther:303,NotModified:304,UseProxy:305,Unused:306,TemporaryRedirect:307,PermanentRedirect:308,BadRequest:400,Unauthorized:401,PaymentRequired:402,Forbidden:403,NotFound:404,MethodNotAllowed:405,NotAcceptable:406,ProxyAuthenticationRequired:407,RequestTimeout:408,Conflict:409,Gone:410,LengthRequired:411,PreconditionFailed:412,PayloadTooLarge:413,UriTooLong:414,UnsupportedMediaType:415,RangeNotSatisfiable:416,ExpectationFailed:417,ImATeapot:418,MisdirectedRequest:421,UnprocessableEntity:422,Locked:423,FailedDependency:424,TooEarly:425,UpgradeRequired:426,PreconditionRequired:428,TooManyRequests:429,RequestHeaderFieldsTooLarge:431,UnavailableForLegalReasons:451,InternalServerError:500,NotImplemented:501,BadGateway:502,ServiceUnavailable:503,GatewayTimeout:504,HttpVersionNotSupported:505,VariantAlsoNegotiates:506,InsufficientStorage:507,LoopDetected:508,NotExtended:510,NetworkAuthenticationRequired:511};Object.entries(Cn).forEach(([t,e])=>{Cn[e]=t});const dl=Cn;function ti(t){const e=new xt(t),n=Dr(xt.prototype.request,e);return f.extend(n,xt.prototype,e,{allOwnKeys:!0}),f.extend(n,e,null,{allOwnKeys:!0}),n.create=function(r){return ti(Se(t,r))},n}const I=ti(Qn);I.Axios=xt;I.CanceledError=nt;I.CancelToken=al;I.isCancel=Xr;I.VERSION=ei;I.toFormData=Bt;I.AxiosError=A;I.Cancel=I.CanceledError;I.all=function(e){return Promise.all(e)};I.spread=cl;I.isAxiosError=ll;I.mergeConfig=Se;I.AxiosHeaders=he;I.formToJSON=t=>Gr(f.isHTMLForm(t)?new FormData(t):t);I.getAdapter=Zr.getAdapter;I.HttpStatusCode=dl;I.default=I;const ul=I;function be(t,e){return t+" { "+e+" }"}function $(t,e){return t+" {"+e.join(" ")+"}"}async function xe(t){const{data:e}=await ul.request({url:"/graphql",method:"POST",data:{query:t}});return e}function hl(){return xe(be("query",$("allMusics",["id","name","filePath","codec","duration","playCount","trackNumber","isLiked","createdAt",$("artist",["id","name"]),$("album",["id","name","cover","publishedYear"])])))}function fl(){return xe(be("query",$("allArtists",["id","name","createdAt","albumCount","musicCount",$("latestAlbum",["cover"])])))}function ml(t){return xe(be("query",$(`artist(id: "${t}")`,["id","name","albumCount","musicCount","createdAt",$("latestAlbum",["cover"]),$("albums",["id","name","cover","publishedYear"]),$("musics",["id"])])))}function pl(){return xe(be("query",$("allAlbums",["id","name","cover","publishedYear","createdAt",$("artist",["id","name"])])))}function gl(t){return xe(be("query",$(`album(id: "${t}")`,["id","name","cover","publishedYear",$("artist",["id","name"]),$("musics",["id"])])))}function yl(){return xe(be("query",$("allPlaylist",["id","name","musicCount","createdAt","updatedAt",$("headerMusics",["id"])])))}function bl(t){return xe(be("query",$(`playlist(id: "${t}")`,["id","name","musicCount","createdAt","updatedAt",$("musics",["id"])])))}const R={NAME:"name",NAME_DESC:"nameDesc",ARTIST_NAME:"artist",ARTIST_NAME_DESC:"artistDesc",ALBUM_NAME:"album",ALBUM_NAME_DESC:"albumDesc",PLAY_COUNT:"playCount",PLAY_COUNT_DESC:"playCountDesc",CREATED_AT:"createdAt",CREATED_AT_DESC:"createdAtDesc"};class xl extends ye{constructor(){super();W(this,"init",!1);W(this,"listener");this.state={loaded:!1,sortedFrom:R.PLAY_COUNT_DESC,musics:[],musicMap:new Map},this.listener=new et,this.listener.connect({onLike:({id:n,isLiked:s})=>{this.set({musics:this.state.musics.map(r=>(r.id===n&&(r.isLiked=s),r))})},onCount:({id:n,playCount:s})=>{this.set(r=>{let i=r.musics.map(o=>(o.id===n&&(o.playCount=s),o));return r.sortedFrom===R.PLAY_COUNT_DESC?i=dt(i):r.sortedFrom===R.PLAY_COUNT&&(i=dt(i).reverse()),{musics:i}})}})}get state(){return this.init||(this.init=!0,this.sync()),super.state}set state(n){super.state=n}async sync(){hl().then(({data:n})=>{this.set({loaded:!0,musics:n.allMusics,musicMap:new Map(n.allMusics.map(s=>[s.id,s])),sortedFrom:R.PLAY_COUNT_DESC})})}get sortItems(){return[{text:"Name (A-Z)",isActive:this.state.sortedFrom===R.NAME,onClick:()=>{this.set(n=>({musics:Ae(n.musics),sortedFrom:R.NAME}))}},{text:"Name (Z-A)",isActive:this.state.sortedFrom===R.NAME_DESC,onClick:()=>{this.set(n=>({musics:Ae(n.musics).reverse(),sortedFrom:R.NAME_DESC}))}},{text:"Artist Name (A to Z)",isActive:this.state.sortedFrom===R.ARTIST_NAME,onClick:()=>{this.set(n=>({musics:kt(n.musics),sortedFrom:R.ARTIST_NAME}))}},{text:"Artist Name (Z to A)",isActive:this.state.sortedFrom===R.ARTIST_NAME_DESC,onClick:()=>{this.set(n=>({musics:kt(n.musics).reverse(),sortedFrom:R.ARTIST_NAME_DESC}))}},{text:"Album Name (A to Z)",isActive:this.state.sortedFrom===R.ALBUM_NAME,onClick:()=>{this.set(n=>({musics:Rs(n.musics),sortedFrom:R.ALBUM_NAME}))}},{text:"Album Name (Z to A)",isActive:this.state.sortedFrom===R.ALBUM_NAME_DESC,onClick:()=>{this.set(n=>({musics:Rs(n.musics).reverse(),sortedFrom:R.ALBUM_NAME_DESC}))}},{text:"Play Count (High to Low)",isActive:this.state.sortedFrom===R.PLAY_COUNT_DESC,onClick:()=>{this.set(n=>({musics:dt(n.musics),sortedFrom:R.PLAY_COUNT_DESC}))}},{text:"Play Count (Low to High)",isActive:this.state.sortedFrom===R.PLAY_COUNT,onClick:()=>{this.set(n=>({musics:dt(n.musics).reverse(),sortedFrom:R.PLAY_COUNT}))}},{text:"Date Added (New to Old)",isActive:this.state.sortedFrom===R.CREATED_AT_DESC,onClick:()=>{this.set(n=>({musics:_e(n.musics),sortedFrom:R.CREATED_AT_DESC}))}},{text:"Date Added (Old to New)",isActive:this.state.sortedFrom===R.CREATED_AT,onClick:()=>{this.set(n=>({musics:_e(n.musics).reverse(),sortedFrom:R.CREATED_AT}))}}]}}const H=new xl,De=t=>JSON.stringify(t);class wl{constructor({onPlay:e,onPause:n,onStop:s,onEnded:r,onTimeUpdate:i,onSkipToNext:o,onSkipToPrevious:l}){window.AppChannel.receiveMessage=d=>{d.actionType==="play"&&(e==null||e()),d.actionType==="pause"&&(n==null||n()),d.actionType==="stop"&&(s==null||s()),d.actionType==="skipToNext"&&(o==null||o()),d.actionType==="skipToPrevious"&&(l==null||l()),d.actionType==="end"&&r(),d.actionType==="setPosition"&&i(ia(d.position))}}load(e){window.AppChannel.postMessage(De({actionType:"setMediaItem",mediaItem:{id:location.origin+"/api/audio/"+e.id,album:e.album.name,title:e.name,artist:e.artist.name,duration:xs(e.duration),artUri:location.origin+Ye(e.album.cover)}}))}play(){window.AppChannel.postMessage(De({actionType:"play"}))}pause(){window.AppChannel.postMessage(De({actionType:"pause"}))}stop(){window.AppChannel.postMessage(De({actionType:"stop"}))}seek(e){window.AppChannel.postMessage(De({actionType:"setPosition",position:xs(e)}))}download(){q.toast("Not supported yet.")}}class vl{constructor({onPlay:e,onPause:n,onStop:s,onEnded:r,onTimeUpdate:i}){W(this,"audio");this.audio=new Audio,this.audio.addEventListener("play",()=>{e==null||e()}),this.audio.addEventListener("pause",()=>{n==null||n()}),this.audio.addEventListener("abort",()=>{s==null||s()}),this.audio.addEventListener("ended",()=>{r()}),this.audio.addEventListener("timeupdate",()=>{i(this.audio.currentTime)})}load(e){const n="/api/audio/"+e.id;this.audio.pause(),this.audio.src=n,this.audio.currentTime=0,this.audio.load()}play(){this.audio.play()}pause(){this.audio.pause()}stop(){this.audio.pause(),this.audio.currentTime=0}seek(e){this.audio.currentTime=e}download(e){const n="/api/audio/"+e.id,s=document.createElement("a");s.href=n,s.download=e.filePath.split("/").pop(),s.click()}}const Cl=t=>{const e=[...t];for(let n=e.length-1;n>0;n--){const s=Math.floor(Math.random()*(n+1));[e[n],e[s]]=[e[s],e[n]]}return e};let tn=null;const nn=t=>H.state.musicMap.get(t);class El extends ye{constructor(){super();W(this,"shouldCount",!1);W(this,"audioChannel");this.state={selected:null,isPlaying:!1,shuffle:!1,insertMode:"last",repeatMode:"none",playMode:"later",currentTime:0,progress:0,items:[],sourceItems:[]};const n={onPlay:()=>{this.set({isPlaying:!0})},onPause:()=>{this.set({isPlaying:!1})},onStop:()=>{this.set({isPlaying:!1})},onEnded:()=>{if(this.state.selected!==null){if(this.state.repeatMode==="one"){this.select(this.state.selected);return}if(this.state.repeatMode==="all"){this.select((this.state.selected+1)%this.state.items.length),this.audioChannel.play();return}this.state.repeatMode==="none"&&(this.state.selected+1<this.state.items.length?(this.select(this.state.selected+1),this.audioChannel.play()):(this.audioChannel.stop(),this.set({isPlaying:!1})))}},onTimeUpdate:r=>{const i=nn(this.state.items[this.state.selected]),o=Number((r/((i==null?void 0:i.duration)||1)*100).toFixed(2));!this.shouldCount&&Math.floor(o)>=0&&Math.floor(o)<10&&(this.shouldCount=!0),this.shouldCount&&Math.floor(o)>=80&&Math.floor(o)<90&&(this.shouldCount=!1,et.count(this.state.items[this.state.selected])),this.set({currentTime:r,progress:o})},onSkipToNext:()=>{this.next()},onSkipToPrevious:()=>{this.prev()}};this.audioChannel=window.AppChannel?new wl(n):new vl(n);const s=H.subscribe(async({loaded:r})=>{if(r){const i=localStorage.getItem("queue");if(i){const o=JSON.parse(i);await this.set(o),this.select(o.selected||0,!1)}H.unsubscribe(s)}});window.addEventListener("beforeunload",()=>{this.audioChannel.stop()})}async reset(n){this.state.items.length>0&&!await q.confirm("Are you sure to reset queue?")||(await this.set({items:n,sourceItems:[],shuffle:!1,selected:null,currentTime:0,progress:0,isPlaying:!1}),this.select(0))}async add(n){if(this.state.items.includes(n)){if(this.state.playMode==="immediately"){this.select(this.state.items.indexOf(n));return}q.toast("Already added to queue");return}if(this.state.shuffle&&this.set({sourceItems:[...this.state.items,n]}),this.state.insertMode==="first"&&this.set({items:[n,...this.state.items]}),this.state.insertMode==="last"&&this.set({items:[...this.state.items,n]}),this.state.insertMode==="after"&&(this.state.selected===null?this.set({items:[...this.state.items,n]}):this.set({items:[...this.state.items.slice(0,this.state.selected+1),n,...this.state.items.slice(this.state.selected+1)]})),q.toast("Added to queue"),this.state.playMode==="immediately"){this.select(this.state.items.indexOf(n));return}this.state.selected===null&&this.select(0)}async removeItems(n){const s=this.state.items.filter(l=>!n.includes(l)),r=this.state.sourceItems.filter(l=>!n.includes(l)),i=this.state.selected,o=s.length>0?this.state.items[i||0]:null;if(await this.set({items:s,sourceItems:r}),o){if(!n.includes(o)){this.set({selected:s.indexOf(o)});return}if(n.includes(o)){if(this.state.items.length>=i){this.select(i);return}if(this.state.items.length<i){this.select(this.state.items.length-1);return}}}}select(n,s=!0){this.set({selected:n,progress:0,currentTime:0,isPlaying:s});const r=nn(this.state.items[n]);r!==void 0&&(document.title=`${r.name} - ${r.artist.name}`,this.audioChannel.load(r),s&&this.audioChannel.play())}play(){this.state.selected!==null&&this.audioChannel.play()}pause(){this.audioChannel.pause()}stop(){this.audioChannel.stop()}seek(n){this.audioChannel.seek(n)}setPlayMode(n){this.set({playMode:n})}setInsertMode(n){this.set({insertMode:n})}changeRepeatMode(){const n=["none","all","one"],s=n.indexOf(this.state.repeatMode),r=n[(s+1)%n.length];this.set({repeatMode:r})}toggleShuffle(){const n=this.state.items[this.state.selected];if(this.state.shuffle){this.set({shuffle:!1,selected:this.state.sourceItems.indexOf(n),items:[...this.state.sourceItems],sourceItems:[]});return}const s=Cl([...this.state.items]).filter(r=>r!==n);s.unshift(n),this.set({shuffle:!0,selected:0,items:s,sourceItems:[...this.state.items]})}next(){this.state.selected!==null&&(this.select((this.state.selected+1)%this.state.items.length),this.audioChannel.play())}prev(){if(this.state.selected!==null){if(this.state.currentTime>10){this.audioChannel.seek(0);return}this.select((this.state.selected-1+this.state.items.length)%this.state.items.length),this.audioChannel.play()}}download(n){this.audioChannel.download(nn(n))}afterStateChange(){tn||(tn=setTimeout(()=>{localStorage.setItem("queue",JSON.stringify({...this.state,isPlaying:!1,currentTime:0,progress:0})),tn=null},3e3))}}const E=new El;function we({id:t,onArtistClick:e,onAlbumClick:n}){const[{musicMap:s}]=T(H),r=s.get(t);return r?a.jsx(Ut,{header:a.jsxs(a.Fragment,{children:[n&&a.jsxs("button",{className:"panel-album clickable linkable",onClick:()=>{O.close(),setTimeout(n,100)},children:[a.jsx(pe,{className:"cover",src:r.album.cover,alt:r.album.name}),a.jsxs("div",{children:[a.jsx("div",{className:"panel-sub-title",children:"Album"}),a.jsx("div",{className:"panel-sub-content",children:r.album.name})]})]}),e&&a.jsx("button",{className:"panel-artist clickable linkable",onClick:()=>{O.close(),setTimeout(e,100)},children:a.jsxs("div",{children:[a.jsx("div",{className:"panel-sub-title",children:"Artist"}),a.jsx("div",{className:"panel-sub-content",children:r.artist.name})]})})]}),items:[{icon:a.jsx(hr,{}),text:"Like",isActive:r.isLiked,onClick:()=>et.like(r.id,!r.isLiked)},{icon:a.jsx(X,{}),text:"Add to Queue",onClick:()=>E.add(r.id)},{icon:a.jsx(Bn,{}),text:"Add to Playlist",onClick:()=>{O.close(),O.open({title:"Add to Playlist",content:a.jsx(ns,{onClick:i=>{ce.addMusic(i,[r.id]),q.toast("Added to playlist")}})})}},{icon:a.jsx(Yo,{}),text:"Download",onClick:()=>{E.download(r.id),O.close()}}],footer:a.jsxs(a.Fragment,{children:[a.jsxs("span",{children:["listen: ",r.playCount," times"]})," /",a.jsxs("span",{children:["duration: ",un(r.duration)]})," /",a.jsxs("span",{children:["codec: ",r.codec]})]})}):null}const kl=_.button`
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
`;function ve({albumName:t,albumCover:e,artistName:n,trackNumber:s,musicName:r,musicCodec:i,isLiked:o,onClick:l,onLongPress:d}){return a.jsxs(kl,{className:"clickable",onClick:l,onContextMenu:u=>{u.preventDefault(),d==null||d()},hasAlbumCover:typeof e=="string",hasLongPress:typeof d=="function",children:[typeof e=="string"&&a.jsx(pe,{className:"album-art",src:e,alt:t}),a.jsxs("div",{className:"row",children:[a.jsxs("div",{className:"info",children:[a.jsxs("div",{className:"title",children:[!!s&&a.jsxs("span",{className:"track-number",children:[s,"."]}),r,i&&i.toLocaleLowerCase()==="flac"&&a.jsx("span",{className:"codec",children:i})]}),a.jsx("div",{className:"artist",children:n})]}),d&&a.jsx("button",{className:`icon-button ${o?"liked":""}`,onClick:u=>{u.stopPropagation(),d==null||d()},children:o?a.jsx(hr,{}):a.jsx(pr,{})})]})]})}const Al=_.div`
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
`;function _l(){const t=ne(),[e]=T(E),[{musicMap:n}]=T(H),s=e.selected!==null?n.get(e.items[e.selected]):null,r=o=>{const{width:l,left:d,right:u}=o.currentTarget.getBoundingClientRect();let c=o.touches?o.touches[0].clientX:o.clientX;c=c<d?d:c>u?u:c;const h=(c-d)/l,y=(s==null?void 0:s.duration)||1;E.seek(y*h)},i=o=>{var l;if(o.buttons===1){r(o);return}((l=o.touches)==null?void 0:l.length)===1&&r(o)};return a.jsxs(Al,{children:[a.jsx("div",{className:"progress",role:"progressbar","aria-valuenow":e.progress,"aria-valuemin":0,"aria-valuemax":100,onClick:r,onMouseMove:i,onTouchMove:i,children:a.jsx("div",{className:"bar",style:{transform:`translate(-${100-e.progress}%, 0)`}})}),a.jsxs("div",{className:"player",children:[a.jsx("div",{className:"music",children:a.jsx(ve,{albumName:(s==null?void 0:s.album.name)??"",albumCover:(s==null?void 0:s.album.cover)??"",musicName:(s==null?void 0:s.name)??"No music",artistName:(s==null?void 0:s.artist.name)??"",onClick:()=>s&&t("/player")})}),a.jsxs("div",{className:"action",children:[a.jsxs("button",{className:"icon-button mode",onClick:()=>E.changeRepeatMode(),children:[e.repeatMode==="all"&&a.jsx(yr,{}),e.repeatMode==="one"&&a.jsx(fr,{}),e.repeatMode==="none"&&a.jsx(br,{})]}),a.jsx("button",{className:"icon-button skip-back",onClick:()=>E.prev(),children:a.jsx(X,{})}),a.jsx("button",{className:"icon-button play",onClick:()=>e.isPlaying?E.pause():E.play(),children:e.isPlaying?a.jsx(gr,{}):a.jsx(X,{})}),a.jsx("button",{className:"icon-button skip-forward",onClick:()=>E.next(),children:a.jsx(X,{})}),a.jsx("button",{className:`icon-button shuffle ${e.shuffle?"active":""}`,onClick:()=>E.toggleShuffle(),children:a.jsx(xr,{})}),a.jsx("button",{className:"icon-button queue",onClick:()=>t("/queue"),children:a.jsx(Qe,{})})]})]})]})}const Vs=_.button`
    width: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    color: #eee;
    font-size: 0.8rem;

    &.active {
        color: ${ge.theme.COLOR_PURPLE_PROMINENT};
    }

    svg {
        width: 1rem;
        height: 1rem;
    }
`;function ni({active:t,label:e,onClick:n,onSelectAll:s}){return a.jsxs(a.Fragment,{children:[a.jsxs(Vs,{className:`clickable ${t?"active":""}`,onClick:n,children:[a.jsx(In,{}),e]}),t&&a.jsxs(Vs,{className:"clickable",onClick:s,children:[a.jsx(Vo,{}),"Select All"]})]})}const Sl=_.div`
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
`;function Ut({header:t,items:e,footer:n}){return a.jsxs(Sl,{children:[t&&a.jsx("div",{className:"panel-content",children:t}),e&&a.jsx("div",{className:"items",children:e.map(({icon:s,text:r,isActive:i,onClick:o})=>a.jsxs("button",{className:`clickable item ${i?"active":""}`,onClick:o,children:[s,a.jsx("span",{className:"text",children:r})]},r))}),n&&a.jsx("div",{className:"detail-info",children:n})]})}function Nl({children:t}){const[{isOpen:e,title:n,content:s},r]=T(O);return a.jsxs(a.Fragment,{children:[t,a.jsx(zo,{title:n,isOpen:e,onClose:()=>r({isOpen:!1}),children:s})]})}class jl extends ye{constructor(){super();W(this,"init",!1);W(this,"listener");this.state={loaded:!1,playlists:[]},this.listener=new ce,this.listener.connect({onCreate:n=>{this.set({playlists:[n,...this.state.playlists]})},onDelete:n=>{this.set({playlists:this.state.playlists.filter(s=>s.id!==n)})},onUpdate:({id:n,name:s})=>{this.set({playlists:this.state.playlists.map(r=>r.id===n?{...r,name:s}:r)})},onChangeOrder:n=>{this.set({playlists:this.state.playlists.sort((s,r)=>n.indexOf(s.id)-n.indexOf(r.id))})},onAddMusic:({id:n,musicCount:s,headerMusics:r})=>{this.set({playlists:this.state.playlists.map(i=>i.id===n?{...i,musicCount:s,headerMusics:r}:i)})},onMoveMusic:({fromId:n,formHeaderMusics:s,toId:r,toMusicCount:i,toHeaderMusics:o,musicIds:l})=>{this.set({playlists:this.state.playlists.map(d=>d.id===n?{...d,headerMusics:s,musicCount:d.musicCount-l.length}:d.id===r?{...d,musicCount:i,headerMusics:o}:d)})},onRemoveMusic:({id:n,headerMusics:s,musicIds:r})=>{this.set({playlists:this.state.playlists.map(i=>i.id===n?{...i,headerMusics:s,musicCount:i.musicCount-r.length}:i)})},onChangeMusicOrder:({id:n,headerMusics:s})=>{this.set({playlists:this.state.playlists.map(r=>r.id===n?{...r,headerMusics:s}:r)})}})}get state(){return this.init||(this.init=!0,this.sync()),super.state}set state(n){super.state=n}async sync(){yl().then(({data:n})=>{this.set({loaded:!0,playlists:n.allPlaylist})})}}const ts=new jl;function Ol({id:t,onPlaylistClick:e}){const[{musicMap:n}]=T(H),[{playlists:s}]=T(ts),r=s.find(i=>i.id===t);return r?a.jsx(Ut,{header:e&&a.jsxs("button",{className:"panel-album clickable linkable",onClick:()=>{O.close(),setTimeout(e,100)},children:[a.jsx(Dn,{className:"album-cover-grid",images:r.headerMusics.map(i=>{var o;return((o=n.get(i.id))==null?void 0:o.album.cover)??""})}),a.jsxs("div",{children:[a.jsxs("div",{className:"panel-sub-title",children:[r.musicCount," songs"]}),a.jsx("div",{className:"panel-sub-content",children:r.name})]})]}),items:[{icon:a.jsx(Ko,{}),text:"Rename",onClick:async()=>{const i=await q.prompt("Rename playlist",r.name);i&&ce.update(t,i),O.close()}},{icon:a.jsx(Fn,{}),text:"Delete",onClick:async()=>{await q.confirm("Are you sure you want to delete this playlist?")&&(ce.delete(t),O.close())}}]}):null}const Rl=_.button`
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
`;function si({name:t,headerMusics:e,musicCount:n,onClick:s,onLongPress:r}){const[{musicMap:i}]=T(H);return a.jsxs(Rl,{className:"clickable",onClick:s,onContextMenu:o=>{o.preventDefault(),r==null||r()},children:[a.jsx(Dn,{className:"cover",images:e.map(o=>{var l;return((l=i.get(o.id))==null?void 0:l.album.cover)??""})}),a.jsxs("div",{className:"title",children:[a.jsx("div",{className:"album-name",children:t}),a.jsxs("div",{className:"song-count",children:[n," songs"]})]}),r&&a.jsx("button",{className:"icon-button",onClick:o=>{o.stopPropagation(),r()},children:a.jsx(pr,{})})]})}function ns({onClick:t}){const[{playlists:e}]=T(ts);return a.jsx(Ut,{footer:a.jsx(a.Fragment,{children:e.map(n=>a.jsx(si,{...n,onClick:()=>{t(n.id),O.close()}},n.id))})})}_.button`
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
`;const P=_.button`
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
`,Tl=_.div`
    @keyframes slide-down {
        0% {
            opacity: 0;
            transform: translateY(-0.5rem);
        }
        100% {
            opacity: 1;
            transform: translateY(0);
        }
    }

    position: relative;
    display: inline-block;
    font-size: 0.825rem;

    .selected {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 0.8rem 1rem;
        box-shadow: 0 0 8px 1px #333;
        border-radius: 8px;
        cursor: pointer;

        svg {
            width: 1rem;
            height: 1rem;
            fill: #fff;
        }
    }

    .options {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background-color: #000;
        box-shadow: 0 0 8px 1px #333;
        border-radius: 8px;
        display: none;
        z-index: 1;

        div {
            padding: 0.825rem 1rem;
            cursor: pointer;

            &:hover {
                background-color: #333;
            }
        }
    }

    &.open {
        .selected {
            box-shadow: 0 0 0 0 transparent;
        }

        .options {
            display: block;
            animation: slide-down 0.1s ease;
        }
    }
`;function Ys({selected:t,options:e,onChange:n}){const s=m.useRef(null),[r,i]=m.useState(!1);return m.useEffect(()=>{function o(l){s.current&&!s.current.contains(l.target)&&i(!1)}return document.addEventListener("mousedown",o),()=>{document.removeEventListener("mousedown",o)}},[s]),a.jsxs(Tl,{ref:s,className:`${r?"open":""}`,children:[a.jsxs("div",{className:"selected",onClick:()=>i(!r),children:[a.jsx(Qe,{}),t?a.jsx("div",{children:t.label}):a.jsx("div",{children:"Select an option"})]}),a.jsx("div",{className:"options",children:e.map(o=>a.jsx("div",{onClick:()=>{n(o.value),i(!1)},children:o.label},o.value))})]})}const Ll=[{name:"Music",path:"/"},{name:"Favorite",path:"/favorite"},{name:"Album",path:"/album"},{name:"Artist",path:"/artist"},{name:"Playlist",path:"/playlist"},{name:"Setting",path:"/setting"}],Pl=_.header`
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
`,Ml=_.nav`
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
`,Dl=_.a`
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
`;function Il(){const t=li(),e=m.useRef(null);return m.useEffect(()=>{const n=e.current;if(n){const s=n.querySelector("a.active");if(s){const{left:r,width:i}=s.getBoundingClientRect(),{width:o}=e.current.getBoundingClientRect(),l=r+i/2-o/2;e.current.scrollBy({left:l,behavior:"smooth"})}}},[t.pathname]),a.jsx(Pl,{children:a.jsx(Ml,{ref:e,children:a.jsx("ul",{children:Ll.map(n=>a.jsx("li",{children:a.jsx(Dl,{as:Xs,to:n.path,className:t.pathname===n.path?"active":"",children:n.name})},n.name))})})})}const Bl=_.div`
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
`;function Fl(){return a.jsx(Bl,{children:a.jsxs("button",{onClick:()=>history.back(),children:[a.jsx(mr,{})," ",a.jsx("span",{className:"back-text",children:"Back"})]})})}function Ks({isSubPage:t,disablePlayer:e=!1,animationDirection:n="None"}){const[s,r]=Je(),i=m.useRef(null),o=m.useRef(!0),l={in:{opacity:1,x:0,y:0},out:{opacity:0,x:n==="RightToLeft"?50:0,y:n==="BottomToTop"?50:0}};return m.useEffect(()=>(i.current&&o.current&&(i.current.scrollTop=parseInt(s.get("py")||"0"),o.current=!1),()=>{o.current=!0}),[i,o,location.pathname]),m.useEffect(()=>{if(!i.current)return;let d=null;const u=()=>{d&&clearTimeout(d),d=setTimeout(()=>{var c;s.set("py",((c=i.current)==null?void 0:c.scrollTop.toString())||"0"),r(s,{replace:!0})},50)};return i.current.addEventListener("scroll",u),()=>{var c;d&&clearTimeout(d),(c=i.current)==null||c.removeEventListener("scroll",u)}},[location.pathname,i,s,r]),a.jsxs("main",{children:[t?a.jsx(Fl,{}):a.jsx(Il,{}),a.jsx(On.div,{ref:i,className:"container",animate:"in",exit:"out",initial:"out",variants:l,transition:{duration:.25},children:a.jsx(m.Suspense,{fallback:a.jsx(je,{}),children:a.jsx(di,{})})},location.pathname),!e&&a.jsx(_l,{})]})}const Te=_.div`
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
`;function ss({items:t,onDragEnd:e,children:n}){const s=yi(is(_i),is(Ai,{coordinateGetter:ki}));return a.jsx(bi,{sensors:s,modifiers:[xi,wi],collisionDetection:vi,onDragEnd:e,children:a.jsx(Ci,{items:t,strategy:Ei,children:n})})}const B={NAME:"name",NAME_DESC:"nameDesc",ARTIST_NAME:"artist",ARTIST_NAME_DESC:"artistDesc",PUBLISHED_YEAR:"publishedYear",PUBLISHED_YEAR_DESC:"publishedYearDesc",CREATED_AT:"createdAt",CREATED_AT_DESC:"createdAtDesc"};class Ul extends ye{constructor(){super();W(this,"init",!1);this.state={loaded:!1,albums:[],sortedFrom:B.NAME}}get state(){return this.init||(this.init=!0,this.sync()),super.state}set state(n){super.state=n}async sync(){pl().then(({data:n})=>{this.set({loaded:!0,albums:n.allAlbums,sortedFrom:B.NAME})})}get sortItems(){return[{text:"Name (A-Z)",isActive:this.state.sortedFrom===B.NAME,onClick:()=>{this.set(n=>({albums:Ae(n.albums),sortedFrom:B.NAME}))}},{text:"Name (Z-A)",isActive:this.state.sortedFrom===B.NAME_DESC,onClick:()=>{this.set(n=>({albums:Ae(n.albums).reverse(),sortedFrom:B.NAME_DESC}))}},{text:"Artist Name (A to Z)",isActive:this.state.sortedFrom===B.ARTIST_NAME,onClick:()=>{this.set(n=>({albums:kt(n.albums),sortedFrom:B.ARTIST_NAME}))}},{text:"Artist Name (Z to A)",isActive:this.state.sortedFrom===B.ARTIST_NAME_DESC,onClick:()=>{this.set(n=>({albums:kt(n.albums).reverse(),sortedFrom:B.ARTIST_NAME_DESC}))}},{text:"Published Year (New to Old)",isActive:this.state.sortedFrom===B.PUBLISHED_YEAR,onClick:()=>{this.set(n=>({albums:Ts(n.albums),sortedFrom:B.PUBLISHED_YEAR}))}},{text:"Published Year (Old to New)",isActive:this.state.sortedFrom===B.PUBLISHED_YEAR_DESC,onClick:()=>{this.set(n=>({albums:Ts(n.albums).reverse(),sortedFrom:B.PUBLISHED_YEAR_DESC}))}},{text:"Created At (New to Old)",isActive:this.state.sortedFrom===B.CREATED_AT_DESC,onClick:()=>{this.set(n=>({albums:_e(n.albums),sortedFrom:B.CREATED_AT_DESC}))}},{text:"Created At (Old to New)",isActive:this.state.sortedFrom===B.CREATED_AT,onClick:()=>{this.set(n=>({albums:_e(n.albums).reverse(),sortedFrom:B.CREATED_AT}))}}]}}const En=new Ul,$l=_.div`
    display: grid;
    grid-gap: 1rem;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    padding: 1rem;
    list-style: none;

    @media (max-width: 600px) {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
`,sn=100;function ql(){const t=ne(),[e,n]=Je(),[{albums:s,loaded:r}]=T(En),[i,o]=m.useState(Number(e.get("l"))||sn),l=async()=>{const c=await q.prompt("Search keyword",e.get("q")||"");n({q:c})},d=()=>{o(i+sn),e.set("l",(i+sn).toString()),n(e,{replace:!0})},u=s==null?void 0:s.filter(c=>{var h,y;return c.name.toLowerCase().includes(((h=e.get("q"))==null?void 0:h.toLowerCase())||"")||c.artist.name.toLowerCase().includes(((y=e.get("q"))==null?void 0:y.toLowerCase())||"")});return a.jsxs(a.Fragment,{children:[a.jsxs(Te,{children:[a.jsx(P,{style:{width:"160px"},onClick:l,children:e.get("q")||"Search"}),a.jsxs(P,{onClick:()=>O.open({title:"Album Sort",content:a.jsx(Tt,{items:En.sortItems})}),children:[a.jsx(Ze,{})," Sort"]})]}),!r&&a.jsx(je,{}),a.jsx($l,{children:r&&u.slice(0,i).map(c=>a.jsx(ur,{albumName:c.name,albumCover:c.cover,artistName:c.artist.name,onClick:()=>t(`/album/${c.id}`)},c.id))}),r&&u.length>i&&a.jsx("div",{style:{padding:"0 16px 16px"},children:a.jsx(P,{style:{width:"100%",justifyContent:"center"},onClick:d,children:"Load More"})})]})}const zl=_.div`
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
`,Hl=_.ul`
    margin-top: 2rem;
    padding: 0;
    list-style: none;
`;function Wl(){const t=ne(),{id:e}=An(),{data:n}=_n(["album",e],()=>gl(e).then(r=>r.data.album),{enabled:!!e}),[{musicMap:s}]=T(H);return n?a.jsxs(a.Fragment,{children:[a.jsxs(zl,{children:[a.jsx(pe,{className:"album-cover",src:n.cover.replace("/resized","")||"",alt:n==null?void 0:n.name}),a.jsx("div",{className:"album-title",children:n==null?void 0:n.name}),a.jsxs("div",{className:"row",children:[a.jsx(Xs,{className:"album-artist",to:`/artist/${n==null?void 0:n.artist.id}`,children:n==null?void 0:n.artist.name}),"-",a.jsx("span",{className:"album-year",children:n==null?void 0:n.publishedYear})]}),a.jsx("div",{className:"play-all",children:a.jsx("button",{onClick:()=>E.reset(n.musics.map(r=>r.id)),children:a.jsx(X,{})})})]}),a.jsx(Hl,{children:n.musics.map(({id:r})=>{const i=s.get(r);return i?a.jsx(ve,{albumName:i.album.name,artistName:i.artist.name,trackNumber:i.trackNumber,musicName:i.name,musicCodec:i.codec,isLiked:i.isLiked,onClick:()=>E.add(i.id),onLongPress:()=>O.open({title:"Related to this music",content:a.jsx(we,{id:i.id,onArtistClick:()=>t(`/artist/${i.artist.id}`)})})},i.id):null})})]}):null}const F={NAME:"name",NAME_DESC:"nameDesc",ALBUM_COUNT:"albumCount",ALBUM_COUNT_DESC:"albumCountDesc",MUSIC_COUNT:"musicCount",MUSIC_COUNT_DESC:"musicCountDesc",CREATED_AT:"createdAt",CREATED_AT_DESC:"createdAtDesc"};class Vl extends ye{constructor(){super();W(this,"init",!1);this.state={loaded:!1,artists:[],sortedFrom:F.MUSIC_COUNT_DESC}}get state(){return this.init||(this.init=!0,this.sync()),super.state}set state(n){super.state=n}async sync(){fl().then(({data:n})=>{this.set({loaded:!0,artists:n.allArtists,sortedFrom:F.MUSIC_COUNT_DESC})})}get sortItems(){return[{text:"Name (A-Z)",isActive:this.state.sortedFrom===F.NAME,onClick:()=>{this.set({artists:Ae(this.state.artists),sortedFrom:F.NAME})}},{text:"Name (Z-A)",isActive:this.state.sortedFrom===F.NAME_DESC,onClick:()=>{this.set({artists:Ae(this.state.artists).reverse(),sortedFrom:F.NAME_DESC})}},{text:"Album Count (High to Low)",isActive:this.state.sortedFrom===F.ALBUM_COUNT_DESC,onClick:()=>{this.set({artists:Ls(this.state.artists),sortedFrom:F.ALBUM_COUNT_DESC})}},{text:"Album Count (Low to High)",isActive:this.state.sortedFrom===F.ALBUM_COUNT,onClick:()=>{this.set({artists:Ls(this.state.artists).reverse(),sortedFrom:F.ALBUM_COUNT})}},{text:"Music Count (High to Low)",isActive:this.state.sortedFrom===F.MUSIC_COUNT_DESC,onClick:()=>{this.set({artists:Ps(this.state.artists),sortedFrom:F.MUSIC_COUNT_DESC})}},{text:"Music Count (Low to High)",isActive:this.state.sortedFrom===F.MUSIC_COUNT,onClick:()=>{this.set({artists:Ps(this.state.artists).reverse(),sortedFrom:F.MUSIC_COUNT})}},{text:"Created At (New to Old)",isActive:this.state.sortedFrom===F.CREATED_AT_DESC,onClick:()=>{this.set({artists:_e(this.state.artists),sortedFrom:F.CREATED_AT_DESC})}},{text:"Created At (Old to New)",isActive:this.state.sortedFrom===F.CREATED_AT,onClick:()=>{this.set({artists:_e(this.state.artists).reverse(),sortedFrom:F.CREATED_AT})}}]}}const kn=new Vl,rn=150;function Yl(){const t=ne(),[e,n]=Je(),[{artists:s,loaded:r}]=T(kn),[i,o]=m.useState(Number(e.get("l"))||rn),l=()=>{o(i+rn),e.set("l",(i+rn).toString()),n(e,{replace:!0})},d=async()=>{const c=await q.prompt("Search keyword",e.get("q")||"");n({q:c})},u=s==null?void 0:s.filter(c=>{var h;return c.name.toLowerCase().includes(((h=e.get("q"))==null?void 0:h.toLowerCase())||"")});return a.jsxs(a.Fragment,{children:[a.jsxs(Te,{children:[a.jsx(P,{style:{width:"160px"},onClick:d,children:e.get("q")||"Search"}),a.jsxs(P,{onClick:()=>O.open({title:"Artist Sort",content:a.jsx(Tt,{items:kn.sortItems})}),children:[a.jsx(Ze,{})," Sort"]})]}),!r&&a.jsx(je,{}),r&&u.slice(0,i).map(c=>{var h;return a.jsx($o,{artistName:c.name,artistCover:((h=c.latestAlbum)==null?void 0:h.cover)||"",musicCount:c.musicCount,albumCount:c.albumCount,onClick:()=>t(`/artist/${c.id}`)},c.id)}),r&&u.length>i&&a.jsx("div",{style:{padding:"0 16px 16px"},children:a.jsx(P,{style:{width:"100%",justifyContent:"center"},onClick:l,children:"Load More"})})]})}const Kl=_.section`
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
`;function Jl(){var i;const t=ne(),{id:e}=An(),{data:n}=_n(["artist",e],()=>ml(e).then(o=>o.data.artist),{enabled:!!e}),[{musicMap:s}]=T(H);if(!n)return null;const r=n.musics.reduce((o,{id:l})=>{var d;return o+=((d=s.get(l))==null?void 0:d.playCount)||0},0);return a.jsxs(Kl,{children:[a.jsxs("div",{className:"artist-name",children:[a.jsx("div",{className:"cover",children:a.jsx("div",{children:a.jsx(pe,{src:((i=n.latestAlbum)==null?void 0:i.cover)||"",alt:n.name})})}),n.name,a.jsxs("span",{className:"detail-info",children:["You have listened to a song by this artist ",r," times."]})]}),a.jsxs("div",{className:"section-title",children:["Albums (",n.albums.length,")"]}),a.jsx("div",{className:"albums",children:n.albums.map(o=>a.jsx(ur,{albumCover:o.cover,albumName:o.name,artistName:o.publishedYear,onClick:()=>t(`/album/${o.id}`)},o.id))}),a.jsxs("div",{className:"section-title",children:["Songs (",n.musics.length,")",a.jsxs(P,{onClick:()=>E.reset(n.musics.map(o=>o.id)),children:[a.jsx(X,{})," Play"]})]}),a.jsx("div",{className:"musics",children:n.musics.map(({id:o})=>{const l=s.get(o);return l?a.jsx(ve,{artistName:l.album.name,albumCover:l.album.cover,albumName:l.album.name,musicName:l.name,musicCodec:l.codec,isLiked:l.isLiked,onClick:()=>E.add(l.id),onLongPress:()=>O.open({title:"Related to this music",content:a.jsx(we,{id:l.id,onAlbumClick:()=>t(`/album/${l.album.id}`)})})},l.id):null})})]})}const on=200;function Gl(){const t=ne(),[e,n]=Je(),[{musics:s,loaded:r}]=T(H),[i,o]=m.useState(Number(e.get("l"))||on),l=async()=>{const c=await q.prompt("Search keyword",e.get("q")||"");n({q:c})},d=()=>{o(i+on),e.set("l",(i+on).toString()),n(e,{replace:!0})},u=s==null?void 0:s.filter(c=>{var h,y,x;return c.isLiked&&(c.name.toLowerCase().includes(((h=e.get("q"))==null?void 0:h.toLowerCase())||"")||c.artist.name.toLowerCase().includes(((y=e.get("q"))==null?void 0:y.toLowerCase())||"")||c.album.name.toLowerCase().includes(((x=e.get("q"))==null?void 0:x.toLowerCase())||""))});return a.jsxs(a.Fragment,{children:[a.jsxs(Te,{children:[a.jsx(P,{style:{width:"160px"},onClick:l,children:e.get("q")||"Search"}),a.jsxs("div",{style:{display:"flex",flexDirection:"row",gap:"8px"},children:[a.jsxs(P,{onClick:()=>E.reset(u.map(c=>c.id)),children:[a.jsx(X,{})," Play"]}),a.jsxs(P,{onClick:()=>O.open({title:"Music Sort",content:a.jsx(Tt,{items:H.sortItems})}),children:[a.jsx(Ze,{})," Sort"]})]})]}),!r&&a.jsx(je,{}),r&&u.slice(0,i).map(c=>a.jsx(ve,{albumName:c.album.name,albumCover:c.album.cover,artistName:c.artist.name,musicName:c.name,musicCodec:c.codec,isLiked:c.isLiked,onClick:()=>E.add(c.id),onLongPress:()=>O.open({title:"Related to this music",content:a.jsx(we,{id:c.id,onAlbumClick:()=>t(`/album/${c.album.id}`),onArtistClick:()=>t(`/artist/${c.artist.id}`)})})},c.id)),r&&u.length>i&&a.jsx("div",{style:{padding:"0 16px 16px"},children:a.jsx(P,{style:{width:"100%",justifyContent:"center"},onClick:d,children:"Load More"})})]})}const an=200;function Xl(){const t=ne(),[e,n]=Je(),[{musics:s,loaded:r}]=T(H),[i,o]=m.useState(Number(e.get("l"))||an),l=async()=>{const c=await q.prompt("Search keyword",e.get("q")||"");e.set("q",c),n(e,{replace:!0})},d=()=>{o(i+an),e.set("l",(i+an).toString()),n(e,{replace:!0})},u=s==null?void 0:s.filter(c=>{var h,y,x;return c.name.toLowerCase().includes(((h=e.get("q"))==null?void 0:h.toLowerCase())||"")||c.artist.name.toLowerCase().includes(((y=e.get("q"))==null?void 0:y.toLowerCase())||"")||c.album.name.toLowerCase().includes(((x=e.get("q"))==null?void 0:x.toLowerCase())||"")});return a.jsxs(a.Fragment,{children:[a.jsxs(Te,{children:[a.jsx(P,{style:{width:"160px"},onClick:l,children:e.get("q")||"Search"}),a.jsxs("div",{style:{display:"flex",flexDirection:"row",gap:"8px"},children:[a.jsxs(P,{onClick:()=>E.reset(u.map(c=>c.id)),children:[a.jsx(X,{})," Play"]}),a.jsxs(P,{onClick:()=>O.open({title:"Music Sort",content:a.jsx(Tt,{items:H.sortItems})}),children:[a.jsx(Ze,{})," Sort"]})]})]}),!r&&a.jsx(je,{}),r&&u.slice(0,i).map(c=>a.jsx(ve,{albumName:c.album.name,albumCover:c.album.cover,artistName:c.artist.name,musicName:c.name,musicCodec:c.codec,isLiked:c.isLiked,onClick:()=>E.add(c.id),onLongPress:()=>O.open({title:"Related to this music",content:a.jsx(we,{id:c.id,onAlbumClick:()=>t(`/album/${c.album.id}`),onArtistClick:()=>t(`/artist/${c.artist.id}`)})})},c.id)),r&&u.length>i&&a.jsx("div",{style:{padding:"0 16px 16px"},children:a.jsx(P,{style:{width:"100%",justifyContent:"center"},onClick:d,children:"Load More"})})]})}const Ql=_.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    gap: 1rem;
`,Zl=_.div`
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
`,ed=_.div`
    color: #666;
    font-size: 1.25rem;
    margin-top: 1rem;
`;function td(){return a.jsxs(Ql,{children:[a.jsx(Zl,{children:"(㇏(•̀ᵥᵥ•́)ノ)"}),a.jsx(ed,{children:"why are you here?"}),a.jsx(P,{onClick:()=>location.assign("/"),children:"Go Home"})]})}const nd=_.div`
    height: 100%;
    display: flex;
    padding: 1rem;
    overflow-y: auto;
    
    .between {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 100%;
        height: 100%;
    }

    .content {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .footer {
        position: sticky;
        bottom: 0;
        display: flex;
        justify-content: center;
        align-items: center;

        svg {
            color: #888;
            transform: rotate(-90deg) translate(50%, -50%);
        }
    }

    .play,
    .mode,
    .queue,
    .shuffle,
    .skip-back,
    .skip-forward {
        position: relative;
        width: 3rem;
        height: 3rem;
        border-radius: .25rem;
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
            right: calc(50% - .5rem);
            transform: translate(-50%, -50%);
            width: .1rem;
            height: .75rem;
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
        text-align: center;

        .title {
            .name {
                margin-bottom: .5rem;
                font-weight: bold;
            }

            .artist {
                font-size: .875rem;
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
        margin-bottom: .5rem;
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
`;function sd(){const t=ne(),[e]=T(E),[{musicMap:n}]=T(H),[s,r]=m.useState("50%"),i=e.selected!==null?n.get(e.items[e.selected]):null,o=d=>{const{width:u,left:c,right:h}=d.currentTarget.getBoundingClientRect();let y=d.touches?d.touches[0].clientX:d.clientX;y=y<c?c:y>h?h:y;const x=(y-c)/u,p=(i==null?void 0:i.duration)||1;E.seek(p*x)},l=d=>{var u;if(d.buttons===1){o(d);return}((u=d.touches)==null?void 0:u.length)===1&&o(d)};return m.useEffect(()=>{let d=null;if(!e.isPlaying){r("50%");return}const u=()=>{const c=()=>Math.floor(Math.random()*90+10)+"%";r(`${c()} ${c()} ${c()} ${c()}`),d=setTimeout(u,1e3)};return u(),()=>{d&&clearTimeout(d)}},[e.isPlaying]),a.jsx(nd,{as:On.div,animate:"in",exit:"out",initial:"out",variants:{in:{opacity:1,y:0},out:{opacity:0,y:50}},transition:{duration:.25},children:a.jsxs("div",{className:"between",children:[a.jsxs("div",{className:"content",children:[a.jsxs("div",{className:"album-art",children:[a.jsx("img",{className:"background",style:{borderRadius:s},src:Ye(i==null?void 0:i.album.cover),alt:i==null?void 0:i.album.name}),a.jsx("div",{className:"foreground-wrapper",children:a.jsx("img",{className:"foreground",style:{borderRadius:s},src:Ye(i==null?void 0:i.album.cover.replace("/resized","")),alt:i==null?void 0:i.album.name})})]}),a.jsx("div",{className:"title-info",children:a.jsxs("button",{className:"clickable title",onClick:()=>i&&O.open({title:"Related to this music",content:a.jsx(we,{id:i.id,onAlbumClick:()=>t(`/album/${i.album.id}`),onArtistClick:()=>t(`/artist/${i.artist.id}`)})}),children:[a.jsx("div",{className:"name",children:i==null?void 0:i.name}),a.jsx("div",{className:"artist",children:i==null?void 0:i.artist.name})]})}),a.jsxs("div",{className:"time-info",children:[a.jsx("div",{className:"current-time",children:un(e.currentTime)}),a.jsx("div",{className:"total-time",children:un((i==null?void 0:i.duration)||0)})]}),a.jsx("div",{className:"progress",role:"slider",tabIndex:0,"aria-valuenow":e.progress,"aria-valuemin":0,"aria-valuemax":100,onClick:o,onMouseMove:l,onTouchMove:l,children:a.jsx("div",{className:"bar",style:{transform:`translate(-${100-e.progress}%, 0)`}})}),a.jsxs("div",{className:"action",children:[a.jsxs("button",{className:"icon-button mode",onClick:()=>E.changeRepeatMode(),children:[e.repeatMode==="all"&&a.jsx(yr,{}),e.repeatMode==="one"&&a.jsx(fr,{}),e.repeatMode==="none"&&a.jsx(br,{})]}),a.jsxs("div",{className:"playback",children:[a.jsx("button",{className:"icon-button skip-back",onClick:()=>E.prev(),children:a.jsx(X,{})}),a.jsx("button",{className:"icon-button",onClick:()=>e.isPlaying?E.pause():E.play(),children:e.isPlaying?a.jsx(gr,{}):a.jsx(X,{})}),a.jsx("button",{className:"icon-button skip-forward",onClick:()=>E.next(),children:a.jsx(X,{})})]}),a.jsx("button",{className:`icon-button shuffle ${e.shuffle?"active":""}`,onClick:()=>E.toggleShuffle(),children:a.jsx(xr,{})})]})]}),a.jsx("div",{className:"footer",children:a.jsx("button",{className:"icon-button",onClick:()=>history.back(),children:a.jsx(mr,{})})})]})})}const rd=_.div`
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
`;function id({playlist:t,onClick:e,onLongPress:n}){const{attributes:s,listeners:r,setNodeRef:i,transform:o,transition:l}=Sn({id:t.id}),d={transform:Nn.Transform.toString(o),transition:l};return a.jsxs(rd,{ref:i,style:d,...s,children:[a.jsx("div",{className:"icon-button",...r,style:{cursor:"grab",touchAction:"none"},children:a.jsx(Qe,{})}),a.jsx("div",{style:{flex:1,maxWidth:"calc(100% - 4rem)"},children:a.jsx(si,{...t,onClick:e,onLongPress:n},t.id)})]})}function od(){const t=ne(),[{playlists:e,loaded:n},s]=T(ts),r=async()=>{const o=await q.prompt("Enter playlist name");ce.create(o)},i=o=>{const{active:l,over:d}=o;if(d&&l.id!==d.id){const u=e.findIndex(y=>y.id===l.id),c=e.findIndex(y=>y.id===d.id),h=jn(e,u,c);ce.changeOrder(h.map(y=>y.id)),s(y=>({...y,playlists:h}))}};return a.jsxs(a.Fragment,{children:[a.jsxs(Te,{children:[a.jsx("div",{}),a.jsx(P,{onClick:r,children:"New Playlist"})]}),a.jsxs(ss,{items:e.map(o=>o.id),onDragEnd:i,children:[!n&&a.jsx(je,{}),n&&(e==null?void 0:e.map(o=>a.jsx(id,{playlist:o,onClick:()=>t(`/playlist/${o.id}`),onLongPress:()=>O.open({content:a.jsx(Ol,{id:o.id,onPlaylistClick:()=>t(`/playlist/${o.id}`)})})},o.id)))]})]})}const ad=_.div`
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
            fill: ${ge.theme.COLOR_PURPLE_PROMINENT};
        }
    }
`,cd=_.div`
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
        background-color: ${ge.theme.COLOR_PURPLE_PROMINENT};

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
`;function ld({music:t,isSelectMode:e,isSelected:n,onClick:s,onSelect:r,onLongPress:i}){const{attributes:o,listeners:l,setNodeRef:d,transform:u,transition:c}=Sn({id:t.id}),h={transform:Nn.Transform.toString(u),transition:c};return a.jsxs(ad,{ref:d,style:h,...o,children:[e?a.jsx("button",{className:`icon-button checkbox ${n?"active":""} `,onClick:r,children:a.jsx(In,{})}):a.jsx("div",{className:"icon-button checkbox",...l,style:{cursor:"grab",touchAction:"none"},children:a.jsx(Qe,{})}),a.jsx("div",{style:{flex:1,maxWidth:"calc(100% - 4rem)"},children:a.jsx(ve,{albumName:t.album.name,albumCover:t.album.cover,artistName:t.artist.name,musicName:t.name,musicCodec:t.codec,isLiked:t.isLiked,onClick:e?r:s,onLongPress:i})})]})}function dd(){const t=ne(),{id:e}=An(),n=ui(),{data:s}=_n(["playlist",e],()=>bl(e).then(c=>c.data.playlist),{enabled:!!e}),[{musicMap:r}]=T(H),[i,o]=m.useState(!1),[l,d]=m.useState([]),u=c=>{const{active:h,over:y}=c;if(s&&y&&h.id!==y.id){const x=s.musics.findIndex(({id:w})=>w===h.id),p=s.musics.findIndex(({id:w})=>w===y.id),g=jn(s.musics,x,p);ce.changeMusicOrder(s.id,g.map(({id:w})=>w)),n.setQueryData(["playlist",e],()=>({...s,musics:g}))}};return m.useEffect(()=>{const c=()=>{n.invalidateQueries(["playlist",e])};return b.on(Ue,c),b.on($e,c),b.on(qe,c),()=>{b.off(Ue,c),b.off($e,c),b.off(qe,c)}},[e,n]),m.useEffect(()=>{d([])},[i]),s?a.jsxs(cd,{children:[a.jsxs("div",{className:"header",children:[a.jsx(Dn,{className:"cover",images:s.musics.slice(0,16).map(c=>{var h;return((h=r.get(c.id))==null?void 0:h.album.cover)??""})}),a.jsx("h1",{children:s.name})]}),a.jsxs(Te,{children:[a.jsx("div",{style:{display:"flex",alignItems:"center",gap:"1rem"},children:a.jsx(ni,{active:i,label:i?`${l.length} selected`:`${s.musics.length} musics`,onClick:()=>o(!i),onSelectAll:()=>d(s.musics.map(({id:c})=>c))})}),a.jsxs(P,{onClick:()=>E.reset(s.musics.map(({id:c})=>c)),children:[a.jsx(X,{})," Play"]})]}),a.jsx("div",{style:{flex:1},children:a.jsx(ss,{items:s.musics.map(({id:c})=>c),onDragEnd:u,children:s.musics.map(({id:c})=>{const h=r.get(c);return h?a.jsx(ld,{music:h,isSelectMode:i,isSelected:l.includes(h.id),onClick:()=>E.add(h.id),onSelect:()=>{l.includes(h.id)?d(l.filter(y=>y!==h.id)):d([...l,h.id])},onLongPress:()=>O.open({content:a.jsx(we,{id:h.id,onAlbumClick:()=>t(`/album/${h.album.id}`),onArtistClick:()=>t(`/artist/${h.artist.id}`)})})},h.id):null})})}),i&&l.length>0&&a.jsxs("div",{className:"select-actions",children:[a.jsxs("button",{className:"clickable",onClick:()=>{l.forEach(c=>E.add(c)),o(!1)},children:[a.jsx(X,{}),a.jsx("span",{children:"Play"})]}),a.jsxs("button",{className:"clickable",onClick:()=>O.open({title:"Move to playlist",content:a.jsx(ns,{onClick:c=>{ce.moveMusic(s.id,c,l),q.toast("Moved to playlist"),o(!1)}})}),children:[a.jsx(Bn,{}),a.jsx("span",{children:"Move"})]}),a.jsxs("button",{className:"clickable",onClick:async()=>{ce.removeMusic(s.id,l),o(!1)},children:[a.jsx(Fn,{}),a.jsx("span",{children:"Delete"})]})]})]}):null}const ud=_.div`
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
                color: ${ge.theme.COLOR_PURPLE_PROMINENT};
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
        background-color: ${ge.theme.COLOR_PURPLE_PROMINENT};

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
`,hd=_.li`
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
                fill: ${ge.theme.COLOR_PURPLE_PROMINENT};
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
`,fd=({music:t,isCurrentMusic:e,isSelectMode:n,isSelected:s,onSelect:r,onClick:i,onLongPress:o})=>{const{attributes:l,listeners:d,setNodeRef:u,transform:c,transition:h}=Sn({id:t.id}),y={transform:Nn.Transform.toString(c),transition:h};return a.jsxs(hd,{ref:u,...l,style:y,className:e?"now-playing":"",children:[n?a.jsx("button",{className:`icon-button checkbox ${s?"active":""}`,onClick:r,children:a.jsx(In,{})}):a.jsx("button",{...d,className:"icon-button checkbox",style:{cursor:"grab",touchAction:"none"},children:a.jsx(Qe,{})}),a.jsx("div",{style:{flex:1,maxWidth:"calc(100% - 4rem)"},children:a.jsx(ve,{musicName:t.name,artistName:t.artist.name,albumName:t.album.name,albumCover:t.album.cover,isLiked:t.isLiked,onClick:n?r:i,onLongPress:o},t.id)})]})};function md(){const t=ne(),[{items:e,selected:n},s]=T(E),[{musicMap:r}]=T(H),i=m.useRef(null),[o,l]=m.useState(!1),[d,u]=m.useState([]),c=async h=>{const{active:y,over:x}=h;if(x){if(y.id===x.id)return;s(p=>{const g=p.items[p.selected],w=p.items.indexOf(y.id.toString()),k=p.items.indexOf(x.id.toString()),v=jn(p.items,w,k);return g?{...p,items:v,selected:v.indexOf(g)}:{...p,items:v}})}};return m.useEffect(()=>{u([])},[o]),m.useEffect(()=>{if(i.current){const h=i.current.children.item(n||0);if(!h)return;i.current.scrollTo({top:h.offsetTop-60,behavior:"smooth"})}},[i,n]),a.jsxs(ud,{as:On.div,animate:"in",exit:"out",initial:"out",variants:{in:{opacity:1,y:0},out:{opacity:0,y:50}},transition:{duration:.25},children:[a.jsx("div",{className:"header",children:a.jsx("div",{style:{display:"flex",alignItems:"center",gap:"1rem"},children:a.jsx(ni,{label:o?`${d.length} selected`:`${e==null?void 0:e.length} musics`,active:o,onClick:()=>l(!o),onSelectAll:()=>u(e)})})}),a.jsx("ul",{className:"container",ref:i,children:a.jsx(ss,{items:e,onDragEnd:c,children:e==null?void 0:e.map((h,y)=>{const x=r.get(h);return x?a.jsx(fd,{music:x,isCurrentMusic:n===y,isSelectMode:o,isSelected:d.includes(h),onSelect:()=>{d.includes(h)?u(d.filter(p=>p!==h)):u([...d,h])},onClick:()=>{E.select(y)},onLongPress:()=>O.open({content:a.jsx(we,{id:x.id,onAlbumClick:()=>t(`/album/${x.album.id}`),onArtistClick:()=>t(`/artist/${x.artist.id}`)})})},h):null})})}),o&&d.length>0&&a.jsxs("div",{className:"select-actions",children:[a.jsxs("button",{className:"clickable",onClick:()=>O.open({title:"Move to playlist",content:a.jsx(ns,{onClick:h=>{ce.addMusic(h,d),q.toast("Added to playlist"),l(!1)}})}),children:[a.jsx(Bn,{}),a.jsx("span",{children:"Save"})]}),a.jsxs("button",{className:"clickable",onClick:()=>{E.removeItems(d),l(!1)},children:[a.jsx(Fn,{}),a.jsx("span",{children:"Delete"})]})]}),a.jsxs("div",{className:"footer",children:[a.jsx("div",{}),a.jsx("button",{className:"icon-button",onClick:()=>history.back(),children:a.jsx(Wo,{})})]})]})}class pd extends ye{constructor(){super();W(this,"init",!1);W(this,"listener");this.state={connectors:[]},this.listener=new Mr,this.listener.connect({onConnectors:n=>{this.set({connectors:n})}})}get state(){return this.init||(this.init=!0,this.sync()),super.state}set state(n){super.state=n}async sync(){b.emit("get-connectors")}}const gd=new pd,yd=_.div`
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
`,Js=[{value:"immediately",label:"Play immediately"},{value:"later",label:"Play later"}],Gs=[{value:"first",label:"Add to the top of the queue"},{value:"last",label:"Add to the bottom of the queue"},{value:"after",label:"Add to the next of the current music"}];function bd(){const[{connectors:t}]=T(gd),[{playMode:e,insertMode:n}]=T(E),[s,r]=m.useState(""),i=async o=>{o&&!await q.confirm("Please only proceed with the update if it is recommended by the developer. Are you sure you want to proceed?")||b.emit("sync-music",{force:o})};return m.useEffect(()=>(b.on("sync-music",o=>{(o==="done"||o==="error")&&(o==="done"?q.toast("Completed sync music"):o==="error"&&q.toast("Error while sync music"),setTimeout(()=>{r("")},1e3)),r(o)}),()=>{b.off("sync-music")}),[]),a.jsxs(yd,{children:[a.jsxs("section",{children:[a.jsx("h3",{children:"Synchronization"}),a.jsx("p",{children:"Sync from your server"}),s&&a.jsx("p",{className:"progress-text",children:s}),a.jsxs("div",{style:{display:"flex",gap:"1rem"},children:[a.jsx(P,{onClick:()=>i(!1),children:"Sync"}),a.jsx(P,{onClick:()=>i(!0),children:"Force Sync"})]})]}),a.jsxs("section",{children:[a.jsx("h3",{children:"Play Mode"}),a.jsx("p",{children:"When you add a music to the queue, It will..."}),a.jsx(Ys,{selected:Js.find(({value:o})=>o===e),options:Js,onChange:o=>E.setPlayMode(o)}),a.jsx(Ys,{selected:Gs.find(({value:o})=>o===n),options:Gs,onChange:o=>E.setInsertMode(o)})]}),a.jsxs("section",{children:[a.jsx("h3",{children:"Connectors"}),t.map(o=>a.jsxs("div",{className:"connector",children:[a.jsx("span",{children:o.userAgent}),a.jsx("span",{className:"date",children:new Date(o.connectedAt).toLocaleDateString()}),o.id===b.id?a.jsx("span",{className:"this-device",children:"This device"}):a.jsx("button",{className:"kick",onClick:()=>Mr.remove(o.id),children:"Remove"})]},o.id))]}),a.jsxs("section",{children:[a.jsx("h3",{children:"Have a problem?"}),a.jsx("div",{style:{display:"flex",gap:"1rem"},children:a.jsx(P,{onClick:()=>window.location.reload(),children:"Try Refresh"})})]})]})}const xd=new hi({defaultOptions:{queries:{refetchOnWindowFocus:!1,retry:!1,suspense:!0}}}),wd=fi([{element:a.jsx(Ks,{}),children:[{path:"/",element:a.jsx(Xl,{})},{path:"/favorite",element:a.jsx(Gl,{})},{path:"/album",element:a.jsx(ql,{})},{path:"/artist",element:a.jsx(Yl,{})},{path:"/playlist",element:a.jsx(od,{})},{path:"/setting",element:a.jsx(bd,{})}]},{element:a.jsx(Ks,{isSubPage:!0,animationDirection:"RightToLeft"}),children:[{path:"/album/:id",element:a.jsx(Wl,{})},{path:"/artist/:id",element:a.jsx(Jl,{})},{path:"/playlist/:id",element:a.jsx(dd,{})}]},{children:[{path:"/player",element:a.jsx(sd,{})}]},{children:[{path:"/queue",element:a.jsx(md,{})}]},{element:a.jsx(td,{}),path:"*"}]);function vd(){return m.useEffect(()=>{b.connect(),b.on("resync",()=>{H.init=!1,kn.init=!1,En.init=!1}),window.addEventListener("focus",()=>{b.connected||(b.connect(),et.count())}),window.addEventListener("beforeunload",()=>{b.disconnect()})},[]),a.jsx(Nl,{children:a.jsx(mi,{client:xd,children:a.jsx(pi,{router:wd})})})}cn.createRoot(document.getElementById("root")).render(a.jsx(gi.StrictMode,{children:a.jsx(vd,{})}));
