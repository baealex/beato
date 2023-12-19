var ci=Object.defineProperty;var li=(t,e,n)=>e in t?ci(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var W=(t,e,n)=>(li(t,typeof e!="symbol"?e+"":e,n),n);import{r as m,a as di,c as U,b as is,_ as ui,u as ne,d as hi,L as Qs,e as Xe,O as fi,f as _n,g as Sn,h as mi,Q as pi,i as gi,j as yi,k as bi,R as xi}from"./vendor-mCpNpRlh.js";import{u as wi,a as os,D as vi,r as Ci,b as Ei,c as ki,S as Ai,v as _i,s as Si,K as Ni,P as ji,d as Nn,C as jn,e as On}from"./sortable-OG30zYW-.js";import{m as Rn}from"./motion-NxBRWfre.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function n(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(r){if(r.ep)return;r.ep=!0;const i=n(r);fetch(r.href,i)}})();var Zs={exports:{}},_t={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Oi=m,Ri=Symbol.for("react.element"),Ti=Symbol.for("react.fragment"),Li=Object.prototype.hasOwnProperty,Pi=Oi.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,Mi={key:!0,ref:!0,__self:!0,__source:!0};function er(t,e,n){var s,r={},i=null,o=null;n!==void 0&&(i=""+n),e.key!==void 0&&(i=""+e.key),e.ref!==void 0&&(o=e.ref);for(s in e)Li.call(e,s)&&!Mi.hasOwnProperty(s)&&(r[s]=e[s]);if(t&&t.defaultProps)for(s in e=t.defaultProps,e)r[s]===void 0&&(r[s]=e[s]);return{$$typeof:Ri,type:t,key:i,ref:o,props:r,_owner:Pi.current}}_t.Fragment=Ti;_t.jsx=er;_t.jsxs=er;Zs.exports=_t;var a=Zs.exports,ln={},as=di;ln.createRoot=as.createRoot,ln.hydrateRoot=as.hydrateRoot;var q={},St={},Ge={};Object.defineProperty(Ge,"__esModule",{value:!0});Ge.findOrCreateContainer=void 0;var Di=function(t){if(!document.getElementById(t)){var e=document.createElement("div");e.id=t,document.body.appendChild(e)}return document.getElementById(t)};Ge.findOrCreateContainer=Di;Object.defineProperty(St,"__esModule",{value:!0});St.toast=void 0;var Ii=Ge,cs=function(){var t=(0,Ii.findOrCreateContainer)("toast-container");return t.classList.add("toast__container"),t}();function Bi(t,e){cs.childNodes.forEach(function(s){s.remove()});var n=document.createElement("div");n.textContent=t,n.classList.add("toast__content"),e!=null&&e.onClick&&(n.classList.add("toast__event"),n.addEventListener("click",e.onClick)),cs.appendChild(n),n.addEventListener("animationend",function(){n.remove()})}St.toast=Bi;var me={},ls=U&&U.__spreadArray||function(t,e,n){if(n||arguments.length===2)for(var s=0,r=e.length,i;s<r;s++)(i||!(s in e))&&(i||(i=Array.prototype.slice.call(e,0,s)),i[s]=e[s]);return t.concat(i||Array.prototype.slice.call(e))};Object.defineProperty(me,"__esModule",{value:!0});me.prompt=me.confirm=me.alert=void 0;var Fi=Ge,J=function(){var t=(0,Fi.findOrCreateContainer)("window-modal-container");return t.classList.add("window-modal__container"),t}();function Tn(t,e){var n=e===void 0?{}:e,s=n.className,r=s===void 0?"":s;return ls(ls(['<div class="window-modal__window '.concat(r,'">'),'<div class="window-modal__content">'],t,!0),["</div>","</div>"],!1).join("")}var Ln=function(t,e){var n=e.close,s=e.enter,r=e.escape,i=function(c){if(c.key==="Escape"&&r){c.preventDefault(),r();return}if(c.key==="Enter"&&s){c.preventDefault(),s();return}},o=function(c){c.target===J&&(n==null||n())};return document.addEventListener("keydown",i),J.addEventListener("click",o),J.innerHTML=t,J.classList.add("show"),function(){document.removeEventListener("keydown",i),J.removeEventListener("click",o),J.innerHTML="",J.classList.remove("show")}};function Ui(t){return new Promise(function(e){var n,s=function(){r(),e()},r=Ln(Tn(['<div class="window-modal__content">','<div class="window-modal__text">'+t+"</div>",'<div class="window-modal__footer">','<button class="window-modal__confirm">OK</button>',"</div>","</div>"],{className:"window-modal__type-alert"}),{close:s,enter:s,escape:s});(n=J.querySelector(".window-modal__confirm"))===null||n===void 0||n.addEventListener("click",s)})}me.alert=Ui;function $i(t){return new Promise(function(e){var n,s,r=function(){o(),e(!0)},i=function(){o(),e(!1)},o=Ln(Tn(['<div class="window-modal__text">'+t+"</div>",'<div class="window-modal__footer">','<button class="window-modal__cancel">Cancel</button>','<button class="window-modal__confirm">OK</button>',"</div>","</div>"],{className:"window-modal__type-confirm"}),{close:i,enter:r,escape:i});(n=J.querySelector(".window-modal__cancel"))===null||n===void 0||n.addEventListener("click",i),(s=J.querySelector(".window-modal__confirm"))===null||s===void 0||s.addEventListener("click",r)})}me.confirm=$i;function qi(t,e){return e===void 0&&(e=""),new Promise(function(n){var s,r,i=function(d){d.preventDefault();var h=d.target,l=h.value.value;c(),n(l)},o=function(){c(),n("")},c=Ln(Tn(['<form class="window-modal__content">','<div class="window-modal__text">'+t+"</div>",'<div class="window-modal__input">','<input type="text" name="value" value="'+e+'">',"</div>",'<div class="window-modal__footer">','<button type="button" class="window-modal__cancel">Cancel</button>','<button type="submit" class="window-modal__confirm">OK</button>',"</div>","</form>"],{className:"window-modal__type-prompt"}),{close:o,escape:o});(s=J.querySelector(".window-modal__cancel"))===null||s===void 0||s.addEventListener("click",o),(r=J.querySelector("form"))===null||r===void 0||r.addEventListener("submit",i),setTimeout(function(){var d=J.querySelector("input");d.focus(),d.setSelectionRange(d.value.length,d.value.length)},200)})}me.prompt=qi;(function(t){var e=U&&U.__createBinding||(Object.create?function(s,r,i,o){o===void 0&&(o=i);var c=Object.getOwnPropertyDescriptor(r,i);(!c||("get"in c?!r.__esModule:c.writable||c.configurable))&&(c={enumerable:!0,get:function(){return r[i]}}),Object.defineProperty(s,o,c)}:function(s,r,i,o){o===void 0&&(o=i),s[o]=r[i]}),n=U&&U.__exportStar||function(s,r){for(var i in s)i!=="default"&&!Object.prototype.hasOwnProperty.call(r,i)&&e(r,s,i)};Object.defineProperty(t,"__esModule",{value:!0}),n(St,t),n(me,t)})(q);function tr(t){var e=Object.create(null);return function(n){return e[n]===void 0&&(e[n]=t(n)),e[n]}}var Hi=/^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|download|draggable|encType|enterKeyHint|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/,zi=tr(function(t){return Hi.test(t)||t.charCodeAt(0)===111&&t.charCodeAt(1)===110&&t.charCodeAt(2)<91});function Wi(t){if(t.sheet)return t.sheet;for(var e=0;e<document.styleSheets.length;e++)if(document.styleSheets[e].ownerNode===t)return document.styleSheets[e]}function Vi(t){var e=document.createElement("style");return e.setAttribute("data-emotion",t.key),t.nonce!==void 0&&e.setAttribute("nonce",t.nonce),e.appendChild(document.createTextNode("")),e.setAttribute("data-s",""),e}var Yi=function(){function t(n){var s=this;this._insertTag=function(r){var i;s.tags.length===0?s.insertionPoint?i=s.insertionPoint.nextSibling:s.prepend?i=s.container.firstChild:i=s.before:i=s.tags[s.tags.length-1].nextSibling,s.container.insertBefore(r,i),s.tags.push(r)},this.isSpeedy=n.speedy===void 0?!0:n.speedy,this.tags=[],this.ctr=0,this.nonce=n.nonce,this.key=n.key,this.container=n.container,this.prepend=n.prepend,this.insertionPoint=n.insertionPoint,this.before=null}var e=t.prototype;return e.hydrate=function(s){s.forEach(this._insertTag)},e.insert=function(s){this.ctr%(this.isSpeedy?65e3:1)===0&&this._insertTag(Vi(this));var r=this.tags[this.tags.length-1];if(this.isSpeedy){var i=Wi(r);try{i.insertRule(s,i.cssRules.length)}catch{}}else r.appendChild(document.createTextNode(s));this.ctr++},e.flush=function(){this.tags.forEach(function(s){return s.parentNode&&s.parentNode.removeChild(s)}),this.tags=[],this.ctr=0},t}(),V="-ms-",wt="-moz-",S="-webkit-",nr="comm",Pn="rule",Mn="decl",Ki="@import",sr="@keyframes",Ji="@layer",Xi=Math.abs,Nt=String.fromCharCode,Gi=Object.assign;function Qi(t,e){return H(t,0)^45?(((e<<2^H(t,0))<<2^H(t,1))<<2^H(t,2))<<2^H(t,3):0}function rr(t){return t.trim()}function Zi(t,e){return(t=e.exec(t))?t[0]:t}function N(t,e,n){return t.replace(e,n)}function dn(t,e){return t.indexOf(e)}function H(t,e){return t.charCodeAt(e)|0}function ze(t,e,n){return t.slice(e,n)}function se(t){return t.length}function Dn(t){return t.length}function it(t,e){return e.push(t),t}function eo(t,e){return t.map(e).join("")}var jt=1,ke=1,ir=0,Y=0,M=0,je="";function Ot(t,e,n,s,r,i,o){return{value:t,root:e,parent:n,type:s,props:r,children:i,line:jt,column:ke,length:o,return:""}}function Pe(t,e){return Gi(Ot("",null,null,"",null,null,0),t,{length:-t.length},e)}function to(){return M}function no(){return M=Y>0?H(je,--Y):0,ke--,M===10&&(ke=1,jt--),M}function X(){return M=Y<ir?H(je,Y++):0,ke++,M===10&&(ke=1,jt++),M}function oe(){return H(je,Y)}function ut(){return Y}function Qe(t,e){return ze(je,t,e)}function We(t){switch(t){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function or(t){return jt=ke=1,ir=se(je=t),Y=0,[]}function ar(t){return je="",t}function ht(t){return rr(Qe(Y-1,un(t===91?t+2:t===40?t+1:t)))}function so(t){for(;(M=oe())&&M<33;)X();return We(t)>2||We(M)>3?"":" "}function ro(t,e){for(;--e&&X()&&!(M<48||M>102||M>57&&M<65||M>70&&M<97););return Qe(t,ut()+(e<6&&oe()==32&&X()==32))}function un(t){for(;X();)switch(M){case t:return Y;case 34:case 39:t!==34&&t!==39&&un(M);break;case 40:t===41&&un(t);break;case 92:X();break}return Y}function io(t,e){for(;X()&&t+M!==57;)if(t+M===84&&oe()===47)break;return"/*"+Qe(e,Y-1)+"*"+Nt(t===47?t:X())}function oo(t){for(;!We(oe());)X();return Qe(t,Y)}function ao(t){return ar(ft("",null,null,null,[""],t=or(t),0,[0],t))}function ft(t,e,n,s,r,i,o,c,d){for(var h=0,l=0,u=o,y=0,w=0,g=0,p=1,x=1,v=1,_=0,O="",ue=r,Q=i,K=s,j=O;x;)switch(g=_,_=X()){case 40:if(g!=108&&H(j,u-1)==58){dn(j+=N(ht(_),"&","&\f"),"&\f")!=-1&&(v=-1);break}case 34:case 39:case 91:j+=ht(_);break;case 9:case 10:case 13:case 32:j+=so(g);break;case 92:j+=ro(ut()-1,7);continue;case 47:switch(oe()){case 42:case 47:it(co(io(X(),ut()),e,n),d);break;default:j+="/"}break;case 123*p:c[h++]=se(j)*v;case 125*p:case 59:case 0:switch(_){case 0:case 125:x=0;case 59+l:v==-1&&(j=N(j,/\f/g,"")),w>0&&se(j)-u&&it(w>32?us(j+";",s,n,u-1):us(N(j," ","")+";",s,n,u-2),d);break;case 59:j+=";";default:if(it(K=ds(j,e,n,h,l,r,c,O,ue=[],Q=[],u),i),_===123)if(l===0)ft(j,e,K,K,ue,i,u,c,Q);else switch(y===99&&H(j,3)===110?100:y){case 100:case 108:case 109:case 115:ft(t,K,K,s&&it(ds(t,K,K,0,0,r,c,O,r,ue=[],u),Q),r,Q,u,c,s?ue:Q);break;default:ft(j,K,K,K,[""],Q,0,c,Q)}}h=l=w=0,p=v=1,O=j="",u=o;break;case 58:u=1+se(j),w=g;default:if(p<1){if(_==123)--p;else if(_==125&&p++==0&&no()==125)continue}switch(j+=Nt(_),_*p){case 38:v=l>0?1:(j+="\f",-1);break;case 44:c[h++]=(se(j)-1)*v,v=1;break;case 64:oe()===45&&(j+=ht(X())),y=oe(),l=u=se(O=j+=oo(ut())),_++;break;case 45:g===45&&se(j)==2&&(p=0)}}return i}function ds(t,e,n,s,r,i,o,c,d,h,l){for(var u=r-1,y=r===0?i:[""],w=Dn(y),g=0,p=0,x=0;g<s;++g)for(var v=0,_=ze(t,u+1,u=Xi(p=o[g])),O=t;v<w;++v)(O=rr(p>0?y[v]+" "+_:N(_,/&\f/g,y[v])))&&(d[x++]=O);return Ot(t,e,n,r===0?Pn:c,d,h,l)}function co(t,e,n){return Ot(t,e,n,nr,Nt(to()),ze(t,2,-2),0)}function us(t,e,n,s){return Ot(t,e,n,Mn,ze(t,0,s),ze(t,s+1,-1),s)}function Ee(t,e){for(var n="",s=Dn(t),r=0;r<s;r++)n+=e(t[r],r,t,e)||"";return n}function lo(t,e,n,s){switch(t.type){case Ji:if(t.children.length)break;case Ki:case Mn:return t.return=t.return||t.value;case nr:return"";case sr:return t.return=t.value+"{"+Ee(t.children,s)+"}";case Pn:t.value=t.props.join(",")}return se(n=Ee(t.children,s))?t.return=t.value+"{"+n+"}":""}function uo(t){var e=Dn(t);return function(n,s,r,i){for(var o="",c=0;c<e;c++)o+=t[c](n,s,r,i)||"";return o}}function ho(t){return function(e){e.root||(e=e.return)&&t(e)}}var fo=function(e,n,s){for(var r=0,i=0;r=i,i=oe(),r===38&&i===12&&(n[s]=1),!We(i);)X();return Qe(e,Y)},mo=function(e,n){var s=-1,r=44;do switch(We(r)){case 0:r===38&&oe()===12&&(n[s]=1),e[s]+=fo(Y-1,n,s);break;case 2:e[s]+=ht(r);break;case 4:if(r===44){e[++s]=oe()===58?"&\f":"",n[s]=e[s].length;break}default:e[s]+=Nt(r)}while(r=X());return e},po=function(e,n){return ar(mo(or(e),n))},hs=new WeakMap,go=function(e){if(!(e.type!=="rule"||!e.parent||e.length<1)){for(var n=e.value,s=e.parent,r=e.column===s.column&&e.line===s.line;s.type!=="rule";)if(s=s.parent,!s)return;if(!(e.props.length===1&&n.charCodeAt(0)!==58&&!hs.get(s))&&!r){hs.set(e,!0);for(var i=[],o=po(n,i),c=s.props,d=0,h=0;d<o.length;d++)for(var l=0;l<c.length;l++,h++)e.props[h]=i[d]?o[d].replace(/&\f/g,c[l]):c[l]+" "+o[d]}}},yo=function(e){if(e.type==="decl"){var n=e.value;n.charCodeAt(0)===108&&n.charCodeAt(2)===98&&(e.return="",e.value="")}};function cr(t,e){switch(Qi(t,e)){case 5103:return S+"print-"+t+t;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 6391:case 5879:case 5623:case 6135:case 4599:case 4855:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:return S+t+t;case 5349:case 4246:case 4810:case 6968:case 2756:return S+t+wt+t+V+t+t;case 6828:case 4268:return S+t+V+t+t;case 6165:return S+t+V+"flex-"+t+t;case 5187:return S+t+N(t,/(\w+).+(:[^]+)/,S+"box-$1$2"+V+"flex-$1$2")+t;case 5443:return S+t+V+"flex-item-"+N(t,/flex-|-self/,"")+t;case 4675:return S+t+V+"flex-line-pack"+N(t,/align-content|flex-|-self/,"")+t;case 5548:return S+t+V+N(t,"shrink","negative")+t;case 5292:return S+t+V+N(t,"basis","preferred-size")+t;case 6060:return S+"box-"+N(t,"-grow","")+S+t+V+N(t,"grow","positive")+t;case 4554:return S+N(t,/([^-])(transform)/g,"$1"+S+"$2")+t;case 6187:return N(N(N(t,/(zoom-|grab)/,S+"$1"),/(image-set)/,S+"$1"),t,"")+t;case 5495:case 3959:return N(t,/(image-set\([^]*)/,S+"$1$`$1");case 4968:return N(N(t,/(.+:)(flex-)?(.*)/,S+"box-pack:$3"+V+"flex-pack:$3"),/s.+-b[^;]+/,"justify")+S+t+t;case 4095:case 3583:case 4068:case 2532:return N(t,/(.+)-inline(.+)/,S+"$1$2")+t;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(se(t)-1-e>6)switch(H(t,e+1)){case 109:if(H(t,e+4)!==45)break;case 102:return N(t,/(.+:)(.+)-([^]+)/,"$1"+S+"$2-$3$1"+wt+(H(t,e+3)==108?"$3":"$2-$3"))+t;case 115:return~dn(t,"stretch")?cr(N(t,"stretch","fill-available"),e)+t:t}break;case 4949:if(H(t,e+1)!==115)break;case 6444:switch(H(t,se(t)-3-(~dn(t,"!important")&&10))){case 107:return N(t,":",":"+S)+t;case 101:return N(t,/(.+:)([^;!]+)(;|!.+)?/,"$1"+S+(H(t,14)===45?"inline-":"")+"box$3$1"+S+"$2$3$1"+V+"$2box$3")+t}break;case 5936:switch(H(t,e+11)){case 114:return S+t+V+N(t,/[svh]\w+-[tblr]{2}/,"tb")+t;case 108:return S+t+V+N(t,/[svh]\w+-[tblr]{2}/,"tb-rl")+t;case 45:return S+t+V+N(t,/[svh]\w+-[tblr]{2}/,"lr")+t}return S+t+V+t+t}return t}var bo=function(e,n,s,r){if(e.length>-1&&!e.return)switch(e.type){case Mn:e.return=cr(e.value,e.length);break;case sr:return Ee([Pe(e,{value:N(e.value,"@","@"+S)})],r);case Pn:if(e.length)return eo(e.props,function(i){switch(Zi(i,/(::plac\w+|:read-\w+)/)){case":read-only":case":read-write":return Ee([Pe(e,{props:[N(i,/:(read-\w+)/,":"+wt+"$1")]})],r);case"::placeholder":return Ee([Pe(e,{props:[N(i,/:(plac\w+)/,":"+S+"input-$1")]}),Pe(e,{props:[N(i,/:(plac\w+)/,":"+wt+"$1")]}),Pe(e,{props:[N(i,/:(plac\w+)/,V+"input-$1")]})],r)}return""})}},xo=[bo],wo=function(e){var n=e.key;if(n==="css"){var s=document.querySelectorAll("style[data-emotion]:not([data-s])");Array.prototype.forEach.call(s,function(p){var x=p.getAttribute("data-emotion");x.indexOf(" ")!==-1&&(document.head.appendChild(p),p.setAttribute("data-s",""))})}var r=e.stylisPlugins||xo,i={},o,c=[];o=e.container||document.head,Array.prototype.forEach.call(document.querySelectorAll('style[data-emotion^="'+n+' "]'),function(p){for(var x=p.getAttribute("data-emotion").split(" "),v=1;v<x.length;v++)i[x[v]]=!0;c.push(p)});var d,h=[go,yo];{var l,u=[lo,ho(function(p){l.insert(p)})],y=uo(h.concat(r,u)),w=function(x){return Ee(ao(x),y)};d=function(x,v,_,O){l=_,w(x?x+"{"+v.styles+"}":v.styles),O&&(g.inserted[v.name]=!0)}}var g={key:n,sheet:new Yi({key:n,container:o,nonce:e.nonce,speedy:e.speedy,prepend:e.prepend,insertionPoint:e.insertionPoint}),nonce:e.nonce,inserted:i,registered:{},insert:d};return g.sheet.hydrate(c),g},vo=!0;function Co(t,e,n){var s="";return n.split(" ").forEach(function(r){t[r]!==void 0?e.push(t[r]+";"):s+=r+" "}),s}var lr=function(e,n,s){var r=e.key+"-"+n.name;(s===!1||vo===!1)&&e.registered[r]===void 0&&(e.registered[r]=n.styles)},Eo=function(e,n,s){lr(e,n,s);var r=e.key+"-"+n.name;if(e.inserted[n.name]===void 0){var i=n;do e.insert(n===i?"."+r:"",i,e.sheet,!0),i=i.next;while(i!==void 0)}};function ko(t){for(var e=0,n,s=0,r=t.length;r>=4;++s,r-=4)n=t.charCodeAt(s)&255|(t.charCodeAt(++s)&255)<<8|(t.charCodeAt(++s)&255)<<16|(t.charCodeAt(++s)&255)<<24,n=(n&65535)*1540483477+((n>>>16)*59797<<16),n^=n>>>24,e=(n&65535)*1540483477+((n>>>16)*59797<<16)^(e&65535)*1540483477+((e>>>16)*59797<<16);switch(r){case 3:e^=(t.charCodeAt(s+2)&255)<<16;case 2:e^=(t.charCodeAt(s+1)&255)<<8;case 1:e^=t.charCodeAt(s)&255,e=(e&65535)*1540483477+((e>>>16)*59797<<16)}return e^=e>>>13,e=(e&65535)*1540483477+((e>>>16)*59797<<16),((e^e>>>15)>>>0).toString(36)}var Ao={animationIterationCount:1,aspectRatio:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1},_o=/[A-Z]|^ms/g,So=/_EMO_([^_]+?)_([^]*?)_EMO_/g,dr=function(e){return e.charCodeAt(1)===45},fs=function(e){return e!=null&&typeof e!="boolean"},$t=tr(function(t){return dr(t)?t:t.replace(_o,"-$&").toLowerCase()}),ms=function(e,n){switch(e){case"animation":case"animationName":if(typeof n=="string")return n.replace(So,function(s,r,i){return re={name:r,styles:i,next:re},r})}return Ao[e]!==1&&!dr(e)&&typeof n=="number"&&n!==0?n+"px":n};function Ve(t,e,n){if(n==null)return"";if(n.__emotion_styles!==void 0)return n;switch(typeof n){case"boolean":return"";case"object":{if(n.anim===1)return re={name:n.name,styles:n.styles,next:re},n.name;if(n.styles!==void 0){var s=n.next;if(s!==void 0)for(;s!==void 0;)re={name:s.name,styles:s.styles,next:re},s=s.next;var r=n.styles+";";return r}return No(t,e,n)}case"function":{if(t!==void 0){var i=re,o=n(t);return re=i,Ve(t,e,o)}break}}if(e==null)return n;var c=e[n];return c!==void 0?c:n}function No(t,e,n){var s="";if(Array.isArray(n))for(var r=0;r<n.length;r++)s+=Ve(t,e,n[r])+";";else for(var i in n){var o=n[i];if(typeof o!="object")e!=null&&e[o]!==void 0?s+=i+"{"+e[o]+"}":fs(o)&&(s+=$t(i)+":"+ms(i,o)+";");else if(Array.isArray(o)&&typeof o[0]=="string"&&(e==null||e[o[0]]===void 0))for(var c=0;c<o.length;c++)fs(o[c])&&(s+=$t(i)+":"+ms(i,o[c])+";");else{var d=Ve(t,e,o);switch(i){case"animation":case"animationName":{s+=$t(i)+":"+d+";";break}default:s+=i+"{"+d+"}"}}}return s}var ps=/label:\s*([^\s;\n{]+)\s*(;|$)/g,re,jo=function(e,n,s){if(e.length===1&&typeof e[0]=="object"&&e[0]!==null&&e[0].styles!==void 0)return e[0];var r=!0,i="";re=void 0;var o=e[0];o==null||o.raw===void 0?(r=!1,i+=Ve(s,n,o)):i+=o[0];for(var c=1;c<e.length;c++)i+=Ve(s,n,e[c]),r&&(i+=o[c]);ps.lastIndex=0;for(var d="",h;(h=ps.exec(i))!==null;)d+="-"+h[1];var l=ko(i)+d;return{name:l,styles:i,next:re}},Oo=function(e){return e()},Ro=is.useInsertionEffect?is.useInsertionEffect:!1,To=Ro||Oo,ur=m.createContext(typeof HTMLElement<"u"?wo({key:"css"}):null);ur.Provider;var Lo=function(e){return m.forwardRef(function(n,s){var r=m.useContext(ur);return e(n,r,s)})},Po=m.createContext({}),Mo=zi,Do=function(e){return e!=="theme"},gs=function(e){return typeof e=="string"&&e.charCodeAt(0)>96?Mo:Do},ys=function(e,n,s){var r;if(n){var i=n.shouldForwardProp;r=e.__emotion_forwardProp&&i?function(o){return e.__emotion_forwardProp(o)&&i(o)}:i}return typeof r!="function"&&s&&(r=e.__emotion_forwardProp),r},Io=function(e){var n=e.cache,s=e.serialized,r=e.isStringTag;return lr(n,s,r),To(function(){return Eo(n,s,r)}),null},Bo=function t(e,n){var s=e.__emotion_real===e,r=s&&e.__emotion_base||e,i,o;n!==void 0&&(i=n.label,o=n.target);var c=ys(e,n,s),d=c||gs(r),h=!d("as");return function(){var l=arguments,u=s&&e.__emotion_styles!==void 0?e.__emotion_styles.slice(0):[];if(i!==void 0&&u.push("label:"+i+";"),l[0]==null||l[0].raw===void 0)u.push.apply(u,l);else{u.push(l[0][0]);for(var y=l.length,w=1;w<y;w++)u.push(l[w],l[0][w])}var g=Lo(function(p,x,v){var _=h&&p.as||r,O="",ue=[],Q=p;if(p.theme==null){Q={};for(var K in p)Q[K]=p[K];Q.theme=m.useContext(Po)}typeof p.className=="string"?O=Co(x.registered,ue,p.className):p.className!=null&&(O=p.className+" ");var j=jo(u.concat(ue),x.registered,Q);O+=x.key+"-"+j.name,o!==void 0&&(O+=" "+o);var ai=h&&c===void 0?gs(_):d,st={};for(var rt in p)h&&rt==="as"||ai(rt)&&(st[rt]=p[rt]);return st.className=O,st.ref=v,m.createElement(m.Fragment,null,m.createElement(Io,{cache:x,serialized:j,isStringTag:typeof _=="string"}),m.createElement(_,st))});return g.displayName=i!==void 0?i:"Styled("+(typeof r=="string"?r:r.displayName||r.name||"Component")+")",g.defaultProps=e.defaultProps,g.__emotion_real=g,g.__emotion_base=r,g.__emotion_styles=u,g.__emotion_forwardProp=c,Object.defineProperty(g,"toString",{value:function(){return"."+o}}),g.withComponent=function(p,x){return t(p,ui({},n,x,{shouldForwardProp:ys(g,x,!0)})).apply(void 0,u)},g}},Fo=["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","big","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","keygen","label","legend","li","link","main","map","mark","marquee","menu","menuitem","meta","meter","nav","noscript","object","ol","optgroup","option","output","p","param","picture","pre","progress","q","rp","rt","ruby","s","samp","script","section","select","small","source","span","strong","style","sub","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","title","tr","track","u","ul","var","video","wbr","circle","clipPath","defs","ellipse","foreignObject","g","image","line","linearGradient","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","svg","text","tspan"],A=Bo.bind();Fo.forEach(function(t){A[t]=A(t)});var Ye={},vt=U&&U.__assign||function(){return vt=Object.assign||function(t){for(var e,n=1,s=arguments.length;n<s;n++){e=arguments[n];for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r])}return t},vt.apply(this,arguments)};Object.defineProperty(Ye,"__esModule",{value:!0});Ye.useValue=L=Ye.useStore=void 0;var Ct=m;function Uo(t){var e=(0,Ct.useState)(t.state),n=e[0],s=e[1];return(0,Ct.useEffect)(function(){var r=t.subscribe(s);return function(){return t.unsubscribe(r)}},[]),[n,t.set.bind(t)]}var L=Ye.useStore=Uo;function $o(t,e){var n=(0,Ct.useState)(t.state[e]),s=n[0],r=n[1];return(0,Ct.useEffect)(function(){var i=t.subscribe(function(o){return r(o[e])});return function(){return t.unsubscribe(i)}},[]),[s,function(i){return t.set(function(o){var c;return vt(vt({},o),(c={},c[e]=i,c))})}]}Ye.useValue=$o;const Ke=t=>t||"/images/beato.jpg";function pe({src:t,alt:e,style:n,loading:s="lazy",className:r}){const i=m.useRef(null);return m.useEffect(()=>{if(!i.current||s!=="lazy")return;const o=new IntersectionObserver(([c])=>{if(c.isIntersecting){const d=c.target;d.src=Ke(t),o.unobserve(d)}});return o.observe(i.current),()=>{o.disconnect()}},[s,t]),a.jsx(a.Fragment,{children:s!=="lazy"?a.jsx("img",{src:Ke(t),alt:e,style:n,className:r}):a.jsx("img",{ref:i,src:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQIW2NQV1f/DwACYwF11mMyYQAAAABJRU5ErkJggg==",alt:e,style:n,className:r})})}const qo=A.button`
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
`;function hr({albumCover:t,albumName:e,artistName:n,onClick:s}){return a.jsxs(qo,{onClick:s,children:[a.jsx(pe,{className:"cover",src:t,alt:e}),a.jsx("span",{className:"title",children:e}),a.jsx("span",{className:"artist",children:n})]})}const Ho=A.button`
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
`;function zo({artistName:t,artistCover:e,albumCount:n,musicCount:s,onClick:r}){return a.jsxs(Ho,{className:"clickable linkable",onClick:r,children:[a.jsx(pe,{src:e,alt:t}),a.jsxs("div",{className:"info",children:[a.jsx("div",{className:"name",children:t}),a.jsxs("div",{className:"count",children:[a.jsxs("div",{className:"album",children:[n," albums"]}),a.jsx("span",{children:" / "}),a.jsxs("div",{className:"music",children:[s," songs"]})]})]})]})}const Wo=A.div`
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
`;function Vo({title:t,isOpen:e,onClose:n,children:s}){const r=m.useRef(!1);return m.useEffect(()=>{if(!e){r.current&&(r.current=!1,history.back());return}r.current||(r.current=!0,history.pushState(null,""));const i=()=>{r.current=!1,n==null||n()};return window.addEventListener("popstate",i),()=>{window.removeEventListener("popstate",i)}},[r,e,n]),a.jsxs(Wo,{className:e?"open":"",children:[a.jsx("button",{className:"clickable backdrop",onClick:n}),a.jsxs("div",{className:`bottom-panel ${e?"open":""}`,children:[t&&a.jsx("div",{className:"panel-title",children:t}),s]})]})}const Yo=A.div`
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
`;function In({images:t,className:e}){const n=t.length>=16?4:t.length>=9?3:t.length>=4?2:1;return a.jsxs(Yo,{className:`${e} col-${n}`,children:[t.length===0&&a.jsx(pe,{}),t.slice(0,n*n).map((s,r)=>a.jsx(pe,{src:s,alt:""},r))]})}const Bn=t=>m.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:36,height:36,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round",className:"ai ai-CheckBox",...t},m.createElement("rect",{x:3,y:3,width:18,height:18,rx:4}),m.createElement("path",{d:"M9 12l2.25 2L15 10"})),fr=t=>m.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:36,height:36,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round",className:"ai ai-Cross",...t},m.createElement("path",{d:"M20 20L4 4m16 0L4 20"})),Fn=t=>m.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:36,height:36,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round",className:"ai ai-Data",...t},m.createElement("ellipse",{cx:12,cy:6,rx:8,ry:3}),m.createElement("path",{d:"M6.037 12C4.77 12.53 4 13.232 4 14c0 1.657 3.582 3 8 3s8-1.343 8-3c0-.768-.77-1.47-2.037-2"}),m.createElement("path",{d:"M4 6v4c0 1.657 3.582 3 8 3s8-1.343 8-3V6"}),m.createElement("path",{d:"M4 14v4c0 1.657 3.582 3 8 3s8-1.343 8-3v-4"})),Ko=t=>m.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:36,height:36,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round",className:"ai ai-DoubleCheck",...t},m.createElement("path",{d:"M2 12l5.25 5 2.625-3"}),m.createElement("path",{d:"M8 12l5.25 5L22 7"}),m.createElement("path",{d:"M16 7l-3.5 4"})),Jo=t=>m.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:36,height:36,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round",className:"ai ai-Download",...t},m.createElement("path",{d:"M12 15V3m0 12l-4-4m4 4l4-4"}),m.createElement("path",{d:"M2 17l.621 2.485A2 2 0 0 0 4.561 21H19.439a2 2 0 0 0 1.94-1.515L22 17"})),mr=t=>m.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:36,height:36,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round",className:"ai ai-Heart",...t},m.createElement("path",{d:"M7 3C4.239 3 2 5.216 2 7.95c0 2.207.875 7.445 9.488 12.74a.985.985 0 0 0 1.024 0C21.125 15.395 22 10.157 22 7.95 22 5.216 19.761 3 17 3s-5 3-5 3-2.239-3-5-3z"})),pr=t=>m.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:36,height:36,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round",className:"ai ai-Infinite",...t},m.createElement("path",{d:"M5.636 16C2.91 16 2 14 2 12s.91-4 3.636-4c3.637 0 9.091 8 12.728 8C21.09 16 22 14 22 12s-.91-4-3.636-4c-3.637 0-9.091 8-12.728 8z"})),gr=t=>m.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:36,height:36,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round",className:"ai ai-ChevronLeft",...t},m.createElement("path",{d:"M15 4l-8 8 8 8"})),Ze=t=>m.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:36,height:36,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round",className:"ai ai-TextAlignJustified",...t},m.createElement("path",{d:"M3 6h18M3 12h18M3 18h18"})),yr=t=>m.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:36,height:36,viewBox:"0 0 24 24",fill:"currentColor",strokeWidth:2,className:"ai ai-MoreVerticalFill",...t},m.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M12 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4z"}),m.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M12 10a2 2 0 1 1 0 4 2 2 0 0 1 0-4z"}),m.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M12 18a2 2 0 1 1 0 4 2 2 0 0 1 0-4z"})),br=t=>m.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:36,height:36,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round",className:"ai ai-Pause",...t},m.createElement("path",{d:"M7 5v14M17 5v14"})),Xo=t=>m.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:36,height:36,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round",className:"ai ai-Pencil",...t},m.createElement("path",{d:"M4.333 16.048L16.57 3.81a2.56 2.56 0 0 1 3.62 3.619L7.951 19.667a2 2 0 0 1-1.022.547L3 21l.786-3.93a2 2 0 0 1 .547-1.022z"}),m.createElement("path",{d:"M14.5 6.5l3 3"})),G=t=>m.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:36,height:36,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round",className:"ai ai-Play",...t},m.createElement("path",{d:"M6 4v16"}),m.createElement("path",{d:"M20 12L6 20"}),m.createElement("path",{d:"M20 12L6 4"})),xr=t=>m.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:36,height:36,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round",className:"ai ai-ArrowRepeat",...t},m.createElement("path",{d:"M18 2l3 3-3 3"}),m.createElement("path",{d:"M6 22l-3-3 3-3"}),m.createElement("path",{d:"M21 5H10a7 7 0 0 0-7 7"}),m.createElement("path",{d:"M3 19h11a7 7 0 0 0 7-7"})),wr=t=>m.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:36,height:36,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round",className:"ai ai-ArrowRightLeft",...t},m.createElement("path",{d:"M21 6H3m18 0l-4 4m4-4l-4-4"}),m.createElement("path",{d:"M3 18h18M3 18l4 4m-4-4l4-4"})),vr=t=>m.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:36,height:36,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round",className:"ai ai-ArrowShuffle",...t},m.createElement("path",{d:"M2 19h3.908a2 2 0 0 0 1.682-.919L11.5 12l3.91-6.082A2 2 0 0 1 17.091 5H22m0 14h-4.908a2 2 0 0 1-1.682-.919L13.428 15M2 5h3.908a2 2 0 0 1 1.682.918L9.571 9"}),m.createElement("path",{d:"M19 2l3 3-3 3"}),m.createElement("path",{d:"M19 16l3 3-3 3"})),et=t=>m.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:36,height:36,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round",className:"ai ai-Sort",...t},m.createElement("path",{d:"M3 6h18M6 12h12m-9 6h6"})),Un=t=>m.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:36,height:36,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round",className:"ai ai-TrashBin",...t},m.createElement("path",{d:"M3 4l2.303 14.076a4 4 0 0 0 2.738 3.167l.328.104a12 12 0 0 0 7.262 0l.328-.104a4 4 0 0 0 2.738-3.166L21 4"}),m.createElement("ellipse",{cx:12,cy:4,rx:9,ry:2}));var Rt={},Fe=U&&U.__assign||function(){return Fe=Object.assign||function(t){for(var e,n=1,s=arguments.length;n<s;n++){e=arguments[n];for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r])}return t},Fe.apply(this,arguments)},bs=U&&U.__awaiter||function(t,e,n,s){function r(i){return i instanceof n?i:new n(function(o){o(i)})}return new(n||(n=Promise))(function(i,o){function c(l){try{h(s.next(l))}catch(u){o(u)}}function d(l){try{h(s.throw(l))}catch(u){o(u)}}function h(l){l.done?i(l.value):r(l.value).then(c,d)}h((s=s.apply(t,e||[])).next())})},xs=U&&U.__generator||function(t,e){var n={label:0,sent:function(){if(i[0]&1)throw i[1];return i[1]},trys:[],ops:[]},s,r,i,o;return o={next:c(0),throw:c(1),return:c(2)},typeof Symbol=="function"&&(o[Symbol.iterator]=function(){return this}),o;function c(h){return function(l){return d([h,l])}}function d(h){if(s)throw new TypeError("Generator is already executing.");for(;n;)try{if(s=1,r&&(i=h[0]&2?r.return:h[0]?r.throw||((i=r.return)&&i.call(r),0):r.next)&&!(i=i.call(r,h[1])).done)return i;switch(r=0,i&&(h=[h[0]&2,i.value]),h[0]){case 0:case 1:i=h;break;case 4:return n.label++,{value:h[1],done:!1};case 5:n.label++,r=h[1],h=[0];continue;case 7:h=n.ops.pop(),n.trys.pop();continue;default:if(i=n.trys,!(i=i.length>0&&i[i.length-1])&&(h[0]===6||h[0]===2)){n=0;continue}if(h[0]===3&&(!i||h[1]>i[0]&&h[1]<i[3])){n.label=h[1];break}if(h[0]===6&&n.label<i[1]){n.label=i[1],i=h;break}if(i&&n.label<i[2]){n.label=i[2],n.ops.push(h);break}i[2]&&n.ops.pop(),n.trys.pop();continue}h=e.call(t,n)}catch(l){h=[6,l],r=0}finally{s=i=0}if(h[0]&5)throw h[1];return{value:h[0]?h[1]:void 0,done:!0}}},Go=U&&U.__spreadArray||function(t,e){for(var n=0,s=e.length,r=t.length;n<s;n++,r++)t[r]=e[n];return t};Object.defineProperty(Rt,"__esModule",{value:!0});Rt.createStore=void 0;function Qo(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(t){var e=Math.random()*16|0,n=t=="x"?e:e&3|8;return n.toString(16)})}var Cr=function(){function t(){this.debug=!1,this.debugger=function(e,n){console.log(e,n.slice(-5))},this._states=[],this._observers={},this._hasStateInit=!1}return Object.defineProperty(t.prototype,"state",{get:function(){return Fe({},this._states[this._states.length-1])},set:function(e){if(!this._hasStateInit){this._states.push(Object.freeze(e)),this._hasStateInit=!0;return}this.set(e)},enumerable:!1,configurable:!0}),t.prototype.runObserver=function(e){this._observers[e](this._states[this._states.length-1])},t.prototype.set=function(e){return bs(this,void 0,void 0,function(){var n=this;return xs(this,function(s){return this._hasStateInit||(this._hasStateInit=!0),[2,new Promise(function(r,i){return bs(n,void 0,void 0,function(){var o,c,d,h=this;return xs(this,function(l){switch(l.label){case 0:return this.beforeStateChange(),o=e,c=this._states[this._states.length-1],typeof o=="function"&&(o=o(c)),typeof o!="object"&&i(new TypeError("nextState is not object.")),o=Object.freeze(Fe(Fe({},c),o)),this._states.push(o),this.debug&&this.debugger?(d=Object.getPrototypeOf(this).constructor.name,this.debugger(d||"anonymous",Go([],this._states))):this._states.shift(),[4,Promise.all(Object.keys(this._observers).map(function(u){return new Promise(function(y){try{h.runObserver(u)}catch{h.unsubscribe(u)}y(!0)})}))];case 1:return l.sent(),this.afterStateChange(),r(o),[2]}})})})]})})},t.prototype.beforeStateChange=function(){},t.prototype.afterStateChange=function(){},t.prototype.subscribe=function(e,n){n!=null&&n.initialize&&e(this.state);var s=Qo();return this._observers[s]=e,s},t.prototype.unsubscribe=function(e){delete this._observers[e]},t.prototype.syncValue=function(e,n){var s=this;return function(){var r=s.subscribe(function(i){n(i[e])});return function(){s.unsubscribe(r)}}},t.prototype.syncState=function(e){var n=this;return function(){var s=n.subscribe(function(r){e(r)});return function(){n.unsubscribe(s)}}},t}(),ye=Rt.default=Cr;function Zo(t){var e=new Cr;return e.state=t,e}Rt.createStore=Zo;class ea extends ye{constructor(){super(),this.state={title:"",isOpen:!1,content:null}}open({title:e,content:n}){this.set({title:e||"",isOpen:!0,content:n})}close(){this.set({title:"",isOpen:!1,content:null})}}const R=new ea;function Tt({items:t}){return a.jsx(Ut,{items:t.map(e=>({icon:a.jsx(et,{}),text:e.text,isActive:e.isActive,onClick:()=>{e.onClick(),R.close()}}))})}var ge={},Lt={},$n={};Object.defineProperty($n,"__esModule",{value:!0});$n.default={COLOR_WHITE:"#ffffff",COLOR_BLACK:"#000000",COLOR_PURPLE_DEEP:"#474787",COLOR_PURPLE_SHALLOW:"#515199",COLOR_PURPLE_NEON:"#735af2",COLOR_PURPLE_PROMINENT:"#a076f1",COLOR_PURPLE_LIVE:"#9b59b6",COLOR_PURPLE_GRAPE:"#8e44ad",COLOR_PURPLE_VIVID:"#5800ff",COLOR_PURPLE_GRAY:"#eeeeff",COLOR_EMBER:"#ffdd00",COLOR_YELLOW:"#f7cb46",COLOR_YELLOW_GRAY:"#e7e6e7"};var qn={};Object.defineProperty(qn,"__esModule",{value:!0});qn.default={CARD_SHADOW_MAIN:"0 6px 24px 1px rgba(0, 0, 0, 0.1)",CARD_SHADOW_SUB:"0 0 10px rgba(0, 0, 0, 0.1)",SHADOW_NEON_PURPLE:"0 16px 16px rgba(115, 90, 242, .3)"};var Et=U&&U.__assign||function(){return Et=Object.assign||function(t){for(var e,n=1,s=arguments.length;n<s;n++){e=arguments[n];for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r])}return t},Et.apply(this,arguments)};Object.defineProperty(Lt,"__esModule",{value:!0});var ta=$n,na=qn;Lt.default=Et(Et({},ta.default),na.default);var Hn={};Object.defineProperty(Hn,"__esModule",{value:!0});var Ue=Lt,sa="box-shadow: ".concat(Ue.default.CARD_SHADOW_MAIN,";"),ra="box-shadow: ".concat(Ue.default.CARD_SHADOW_SUB,";"),ia=["color: ".concat(Ue.default.COLOR_WHITE,";"),"box-shadow: ".concat(Ue.default.SHADOW_NEON_PURPLE,";"),"background-color: ".concat(Ue.default.COLOR_PURPLE_NEON,";")].join(`
`);Hn.default={CARD_SHADOW_MAIN:sa,CARD_SHADOW_SUB:ra,NEON_PURPLE_BUTTON:ia};(function(t){Object.defineProperty(t,"__esModule",{value:!0}),t.mixin=t.theme=void 0;var e=Lt;Object.defineProperty(t,"theme",{enumerable:!0,get:function(){return e.default}});var n=Hn;Object.defineProperty(t,"mixin",{enumerable:!0,get:function(){return n.default}})})(ge);const oa=A.div`
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
`,Oe=()=>{const[t,e]=m.useState(!1);return m.useEffect(()=>{const n=setTimeout(()=>{e(!0)},100);return()=>clearTimeout(n)}),t&&a.jsx(oa,{children:a.jsx("div",{className:"spinner"})})},hn=t=>`${Math.floor(t/60)}:${("0"+Math.floor(t%60)).slice(-2)}`,ws=t=>Math.floor(t*1e3),aa=t=>t/1e3,le=Object.create(null);le.open="0";le.close="1";le.ping="2";le.pong="3";le.message="4";le.upgrade="5";le.noop="6";const mt=Object.create(null);Object.keys(le).forEach(t=>{mt[le[t]]=t});const fn={type:"error",data:"parser error"},Er=typeof Blob=="function"||typeof Blob<"u"&&Object.prototype.toString.call(Blob)==="[object BlobConstructor]",kr=typeof ArrayBuffer=="function",Ar=t=>typeof ArrayBuffer.isView=="function"?ArrayBuffer.isView(t):t&&t.buffer instanceof ArrayBuffer,zn=({type:t,data:e},n,s)=>Er&&e instanceof Blob?n?s(e):vs(e,s):kr&&(e instanceof ArrayBuffer||Ar(e))?n?s(e):vs(new Blob([e]),s):s(le[t]+(e||"")),vs=(t,e)=>{const n=new FileReader;return n.onload=function(){const s=n.result.split(",")[1];e("b"+(s||""))},n.readAsDataURL(t)};function Cs(t){return t instanceof Uint8Array?t:t instanceof ArrayBuffer?new Uint8Array(t):new Uint8Array(t.buffer,t.byteOffset,t.byteLength)}let qt;function ca(t,e){if(Er&&t.data instanceof Blob)return t.data.arrayBuffer().then(Cs).then(e);if(kr&&(t.data instanceof ArrayBuffer||Ar(t.data)))return e(Cs(t.data));zn(t,!1,n=>{qt||(qt=new TextEncoder),e(qt.encode(n))})}const Es="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",Be=typeof Uint8Array>"u"?[]:new Uint8Array(256);for(let t=0;t<Es.length;t++)Be[Es.charCodeAt(t)]=t;const la=t=>{let e=t.length*.75,n=t.length,s,r=0,i,o,c,d;t[t.length-1]==="="&&(e--,t[t.length-2]==="="&&e--);const h=new ArrayBuffer(e),l=new Uint8Array(h);for(s=0;s<n;s+=4)i=Be[t.charCodeAt(s)],o=Be[t.charCodeAt(s+1)],c=Be[t.charCodeAt(s+2)],d=Be[t.charCodeAt(s+3)],l[r++]=i<<2|o>>4,l[r++]=(o&15)<<4|c>>2,l[r++]=(c&3)<<6|d&63;return h},da=typeof ArrayBuffer=="function",Wn=(t,e)=>{if(typeof t!="string")return{type:"message",data:_r(t,e)};const n=t.charAt(0);return n==="b"?{type:"message",data:ua(t.substring(1),e)}:mt[n]?t.length>1?{type:mt[n],data:t.substring(1)}:{type:mt[n]}:fn},ua=(t,e)=>{if(da){const n=la(t);return _r(n,e)}else return{base64:!0,data:t}},_r=(t,e)=>{switch(e){case"blob":return t instanceof Blob?t:new Blob([t]);case"arraybuffer":default:return t instanceof ArrayBuffer?t:t.buffer}},Sr="",ha=(t,e)=>{const n=t.length,s=new Array(n);let r=0;t.forEach((i,o)=>{zn(i,!1,c=>{s[o]=c,++r===n&&e(s.join(Sr))})})},fa=(t,e)=>{const n=t.split(Sr),s=[];for(let r=0;r<n.length;r++){const i=Wn(n[r],e);if(s.push(i),i.type==="error")break}return s};function ma(){return new TransformStream({transform(t,e){ca(t,n=>{const s=n.length;let r;if(s<126)r=new Uint8Array(1),new DataView(r.buffer).setUint8(0,s);else if(s<65536){r=new Uint8Array(3);const i=new DataView(r.buffer);i.setUint8(0,126),i.setUint16(1,s)}else{r=new Uint8Array(9);const i=new DataView(r.buffer);i.setUint8(0,127),i.setBigUint64(1,BigInt(s))}t.data&&typeof t.data!="string"&&(r[0]|=128),e.enqueue(r),e.enqueue(n)})}})}let Ht;function ot(t){return t.reduce((e,n)=>e+n.length,0)}function at(t,e){if(t[0].length===e)return t.shift();const n=new Uint8Array(e);let s=0;for(let r=0;r<e;r++)n[r]=t[0][s++],s===t[0].length&&(t.shift(),s=0);return t.length&&s<t[0].length&&(t[0]=t[0].slice(s)),n}function pa(t,e){Ht||(Ht=new TextDecoder);const n=[];let s=0,r=-1,i=!1;return new TransformStream({transform(o,c){for(n.push(o);;){if(s===0){if(ot(n)<1)break;const d=at(n,1);i=(d[0]&128)===128,r=d[0]&127,r<126?s=3:r===126?s=1:s=2}else if(s===1){if(ot(n)<2)break;const d=at(n,2);r=new DataView(d.buffer,d.byteOffset,d.length).getUint16(0),s=3}else if(s===2){if(ot(n)<8)break;const d=at(n,8),h=new DataView(d.buffer,d.byteOffset,d.length),l=h.getUint32(0);if(l>Math.pow(2,21)-1){c.enqueue(fn);break}r=l*Math.pow(2,32)+h.getUint32(4),s=3}else{if(ot(n)<r)break;const d=at(n,r);c.enqueue(Wn(i?d:Ht.decode(d),e)),s=0}if(r===0||r>t){c.enqueue(fn);break}}}})}const Nr=4;function D(t){if(t)return ga(t)}function ga(t){for(var e in D.prototype)t[e]=D.prototype[e];return t}D.prototype.on=D.prototype.addEventListener=function(t,e){return this._callbacks=this._callbacks||{},(this._callbacks["$"+t]=this._callbacks["$"+t]||[]).push(e),this};D.prototype.once=function(t,e){function n(){this.off(t,n),e.apply(this,arguments)}return n.fn=e,this.on(t,n),this};D.prototype.off=D.prototype.removeListener=D.prototype.removeAllListeners=D.prototype.removeEventListener=function(t,e){if(this._callbacks=this._callbacks||{},arguments.length==0)return this._callbacks={},this;var n=this._callbacks["$"+t];if(!n)return this;if(arguments.length==1)return delete this._callbacks["$"+t],this;for(var s,r=0;r<n.length;r++)if(s=n[r],s===e||s.fn===e){n.splice(r,1);break}return n.length===0&&delete this._callbacks["$"+t],this};D.prototype.emit=function(t){this._callbacks=this._callbacks||{};for(var e=new Array(arguments.length-1),n=this._callbacks["$"+t],s=1;s<arguments.length;s++)e[s-1]=arguments[s];if(n){n=n.slice(0);for(var s=0,r=n.length;s<r;++s)n[s].apply(this,e)}return this};D.prototype.emitReserved=D.prototype.emit;D.prototype.listeners=function(t){return this._callbacks=this._callbacks||{},this._callbacks["$"+t]||[]};D.prototype.hasListeners=function(t){return!!this.listeners(t).length};const Z=typeof self<"u"?self:typeof window<"u"?window:Function("return this")();function jr(t,...e){return e.reduce((n,s)=>(t.hasOwnProperty(s)&&(n[s]=t[s]),n),{})}const ya=Z.setTimeout,ba=Z.clearTimeout;function Pt(t,e){e.useNativeTimers?(t.setTimeoutFn=ya.bind(Z),t.clearTimeoutFn=ba.bind(Z)):(t.setTimeoutFn=Z.setTimeout.bind(Z),t.clearTimeoutFn=Z.clearTimeout.bind(Z))}const xa=1.33;function wa(t){return typeof t=="string"?va(t):Math.ceil((t.byteLength||t.size)*xa)}function va(t){let e=0,n=0;for(let s=0,r=t.length;s<r;s++)e=t.charCodeAt(s),e<128?n+=1:e<2048?n+=2:e<55296||e>=57344?n+=3:(s++,n+=4);return n}function Ca(t){let e="";for(let n in t)t.hasOwnProperty(n)&&(e.length&&(e+="&"),e+=encodeURIComponent(n)+"="+encodeURIComponent(t[n]));return e}function Ea(t){let e={},n=t.split("&");for(let s=0,r=n.length;s<r;s++){let i=n[s].split("=");e[decodeURIComponent(i[0])]=decodeURIComponent(i[1])}return e}class ka extends Error{constructor(e,n,s){super(e),this.description=n,this.context=s,this.type="TransportError"}}class Vn extends D{constructor(e){super(),this.writable=!1,Pt(this,e),this.opts=e,this.query=e.query,this.socket=e.socket}onError(e,n,s){return super.emitReserved("error",new ka(e,n,s)),this}open(){return this.readyState="opening",this.doOpen(),this}close(){return(this.readyState==="opening"||this.readyState==="open")&&(this.doClose(),this.onClose()),this}send(e){this.readyState==="open"&&this.write(e)}onOpen(){this.readyState="open",this.writable=!0,super.emitReserved("open")}onData(e){const n=Wn(e,this.socket.binaryType);this.onPacket(n)}onPacket(e){super.emitReserved("packet",e)}onClose(e){this.readyState="closed",super.emitReserved("close",e)}pause(e){}createUri(e,n={}){return e+"://"+this._hostname()+this._port()+this.opts.path+this._query(n)}_hostname(){const e=this.opts.hostname;return e.indexOf(":")===-1?e:"["+e+"]"}_port(){return this.opts.port&&(this.opts.secure&&+(this.opts.port!==443)||!this.opts.secure&&Number(this.opts.port)!==80)?":"+this.opts.port:""}_query(e){const n=Ca(e);return n.length?"?"+n:""}}const Or="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_".split(""),mn=64,Aa={};let ks=0,ct=0,As;function _s(t){let e="";do e=Or[t%mn]+e,t=Math.floor(t/mn);while(t>0);return e}function Rr(){const t=_s(+new Date);return t!==As?(ks=0,As=t):t+"."+_s(ks++)}for(;ct<mn;ct++)Aa[Or[ct]]=ct;let Tr=!1;try{Tr=typeof XMLHttpRequest<"u"&&"withCredentials"in new XMLHttpRequest}catch{}const _a=Tr;function Lr(t){const e=t.xdomain;try{if(typeof XMLHttpRequest<"u"&&(!e||_a))return new XMLHttpRequest}catch{}if(!e)try{return new Z[["Active"].concat("Object").join("X")]("Microsoft.XMLHTTP")}catch{}}function Sa(){}const Na=function(){return new Lr({xdomain:!1}).responseType!=null}();class ja extends Vn{constructor(e){if(super(e),this.polling=!1,typeof location<"u"){const s=location.protocol==="https:";let r=location.port;r||(r=s?"443":"80"),this.xd=typeof location<"u"&&e.hostname!==location.hostname||r!==e.port}const n=e&&e.forceBase64;this.supportsBinary=Na&&!n,this.opts.withCredentials&&(this.cookieJar=void 0)}get name(){return"polling"}doOpen(){this.poll()}pause(e){this.readyState="pausing";const n=()=>{this.readyState="paused",e()};if(this.polling||!this.writable){let s=0;this.polling&&(s++,this.once("pollComplete",function(){--s||n()})),this.writable||(s++,this.once("drain",function(){--s||n()}))}else n()}poll(){this.polling=!0,this.doPoll(),this.emitReserved("poll")}onData(e){const n=s=>{if(this.readyState==="opening"&&s.type==="open"&&this.onOpen(),s.type==="close")return this.onClose({description:"transport closed by the server"}),!1;this.onPacket(s)};fa(e,this.socket.binaryType).forEach(n),this.readyState!=="closed"&&(this.polling=!1,this.emitReserved("pollComplete"),this.readyState==="open"&&this.poll())}doClose(){const e=()=>{this.write([{type:"close"}])};this.readyState==="open"?e():this.once("open",e)}write(e){this.writable=!1,ha(e,n=>{this.doWrite(n,()=>{this.writable=!0,this.emitReserved("drain")})})}uri(){const e=this.opts.secure?"https":"http",n=this.query||{};return this.opts.timestampRequests!==!1&&(n[this.opts.timestampParam]=Rr()),!this.supportsBinary&&!n.sid&&(n.b64=1),this.createUri(e,n)}request(e={}){return Object.assign(e,{xd:this.xd,cookieJar:this.cookieJar},this.opts),new ae(this.uri(),e)}doWrite(e,n){const s=this.request({method:"POST",data:e});s.on("success",n),s.on("error",(r,i)=>{this.onError("xhr post error",r,i)})}doPoll(){const e=this.request();e.on("data",this.onData.bind(this)),e.on("error",(n,s)=>{this.onError("xhr poll error",n,s)}),this.pollXhr=e}}class ae extends D{constructor(e,n){super(),Pt(this,n),this.opts=n,this.method=n.method||"GET",this.uri=e,this.data=n.data!==void 0?n.data:null,this.create()}create(){var e;const n=jr(this.opts,"agent","pfx","key","passphrase","cert","ca","ciphers","rejectUnauthorized","autoUnref");n.xdomain=!!this.opts.xd;const s=this.xhr=new Lr(n);try{s.open(this.method,this.uri,!0);try{if(this.opts.extraHeaders){s.setDisableHeaderCheck&&s.setDisableHeaderCheck(!0);for(let r in this.opts.extraHeaders)this.opts.extraHeaders.hasOwnProperty(r)&&s.setRequestHeader(r,this.opts.extraHeaders[r])}}catch{}if(this.method==="POST")try{s.setRequestHeader("Content-type","text/plain;charset=UTF-8")}catch{}try{s.setRequestHeader("Accept","*/*")}catch{}(e=this.opts.cookieJar)===null||e===void 0||e.addCookies(s),"withCredentials"in s&&(s.withCredentials=this.opts.withCredentials),this.opts.requestTimeout&&(s.timeout=this.opts.requestTimeout),s.onreadystatechange=()=>{var r;s.readyState===3&&((r=this.opts.cookieJar)===null||r===void 0||r.parseCookies(s)),s.readyState===4&&(s.status===200||s.status===1223?this.onLoad():this.setTimeoutFn(()=>{this.onError(typeof s.status=="number"?s.status:0)},0))},s.send(this.data)}catch(r){this.setTimeoutFn(()=>{this.onError(r)},0);return}typeof document<"u"&&(this.index=ae.requestsCount++,ae.requests[this.index]=this)}onError(e){this.emitReserved("error",e,this.xhr),this.cleanup(!0)}cleanup(e){if(!(typeof this.xhr>"u"||this.xhr===null)){if(this.xhr.onreadystatechange=Sa,e)try{this.xhr.abort()}catch{}typeof document<"u"&&delete ae.requests[this.index],this.xhr=null}}onLoad(){const e=this.xhr.responseText;e!==null&&(this.emitReserved("data",e),this.emitReserved("success"),this.cleanup())}abort(){this.cleanup()}}ae.requestsCount=0;ae.requests={};if(typeof document<"u"){if(typeof attachEvent=="function")attachEvent("onunload",Ss);else if(typeof addEventListener=="function"){const t="onpagehide"in Z?"pagehide":"unload";addEventListener(t,Ss,!1)}}function Ss(){for(let t in ae.requests)ae.requests.hasOwnProperty(t)&&ae.requests[t].abort()}const Yn=typeof Promise=="function"&&typeof Promise.resolve=="function"?e=>Promise.resolve().then(e):(e,n)=>n(e,0),lt=Z.WebSocket||Z.MozWebSocket,Ns=!0,Oa="arraybuffer",js=typeof navigator<"u"&&typeof navigator.product=="string"&&navigator.product.toLowerCase()==="reactnative";class Ra extends Vn{constructor(e){super(e),this.supportsBinary=!e.forceBase64}get name(){return"websocket"}doOpen(){if(!this.check())return;const e=this.uri(),n=this.opts.protocols,s=js?{}:jr(this.opts,"agent","perMessageDeflate","pfx","key","passphrase","cert","ca","ciphers","rejectUnauthorized","localAddress","protocolVersion","origin","maxPayload","family","checkServerIdentity");this.opts.extraHeaders&&(s.headers=this.opts.extraHeaders);try{this.ws=Ns&&!js?n?new lt(e,n):new lt(e):new lt(e,n,s)}catch(r){return this.emitReserved("error",r)}this.ws.binaryType=this.socket.binaryType,this.addEventListeners()}addEventListeners(){this.ws.onopen=()=>{this.opts.autoUnref&&this.ws._socket.unref(),this.onOpen()},this.ws.onclose=e=>this.onClose({description:"websocket connection closed",context:e}),this.ws.onmessage=e=>this.onData(e.data),this.ws.onerror=e=>this.onError("websocket error",e)}write(e){this.writable=!1;for(let n=0;n<e.length;n++){const s=e[n],r=n===e.length-1;zn(s,this.supportsBinary,i=>{const o={};try{Ns&&this.ws.send(i)}catch{}r&&Yn(()=>{this.writable=!0,this.emitReserved("drain")},this.setTimeoutFn)})}}doClose(){typeof this.ws<"u"&&(this.ws.close(),this.ws=null)}uri(){const e=this.opts.secure?"wss":"ws",n=this.query||{};return this.opts.timestampRequests&&(n[this.opts.timestampParam]=Rr()),this.supportsBinary||(n.b64=1),this.createUri(e,n)}check(){return!!lt}}class Ta extends Vn{get name(){return"webtransport"}doOpen(){typeof WebTransport=="function"&&(this.transport=new WebTransport(this.createUri("https"),this.opts.transportOptions[this.name]),this.transport.closed.then(()=>{this.onClose()}).catch(e=>{this.onError("webtransport error",e)}),this.transport.ready.then(()=>{this.transport.createBidirectionalStream().then(e=>{const n=pa(Number.MAX_SAFE_INTEGER,this.socket.binaryType),s=e.readable.pipeThrough(n).getReader(),r=ma();r.readable.pipeTo(e.writable),this.writer=r.writable.getWriter();const i=()=>{s.read().then(({done:c,value:d})=>{c||(this.onPacket(d),i())}).catch(c=>{})};i();const o={type:"open"};this.query.sid&&(o.data=`{"sid":"${this.query.sid}"}`),this.writer.write(o).then(()=>this.onOpen())})}))}write(e){this.writable=!1;for(let n=0;n<e.length;n++){const s=e[n],r=n===e.length-1;this.writer.write(s).then(()=>{r&&Yn(()=>{this.writable=!0,this.emitReserved("drain")},this.setTimeoutFn)})}}doClose(){var e;(e=this.transport)===null||e===void 0||e.close()}}const La={websocket:Ra,webtransport:Ta,polling:ja},Pa=/^(?:(?![^:@\/?#]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@\/?#]*)(?::([^:@\/?#]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,Ma=["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"];function pn(t){if(t.length>2e3)throw"URI too long";const e=t,n=t.indexOf("["),s=t.indexOf("]");n!=-1&&s!=-1&&(t=t.substring(0,n)+t.substring(n,s).replace(/:/g,";")+t.substring(s,t.length));let r=Pa.exec(t||""),i={},o=14;for(;o--;)i[Ma[o]]=r[o]||"";return n!=-1&&s!=-1&&(i.source=e,i.host=i.host.substring(1,i.host.length-1).replace(/;/g,":"),i.authority=i.authority.replace("[","").replace("]","").replace(/;/g,":"),i.ipv6uri=!0),i.pathNames=Da(i,i.path),i.queryKey=Ia(i,i.query),i}function Da(t,e){const n=/\/{2,9}/g,s=e.replace(n,"/").split("/");return(e.slice(0,1)=="/"||e.length===0)&&s.splice(0,1),e.slice(-1)=="/"&&s.splice(s.length-1,1),s}function Ia(t,e){const n={};return e.replace(/(?:^|&)([^&=]*)=?([^&]*)/g,function(s,r,i){r&&(n[r]=i)}),n}let Pr=class Ce extends D{constructor(e,n={}){super(),this.binaryType=Oa,this.writeBuffer=[],e&&typeof e=="object"&&(n=e,e=null),e?(e=pn(e),n.hostname=e.host,n.secure=e.protocol==="https"||e.protocol==="wss",n.port=e.port,e.query&&(n.query=e.query)):n.host&&(n.hostname=pn(n.host).host),Pt(this,n),this.secure=n.secure!=null?n.secure:typeof location<"u"&&location.protocol==="https:",n.hostname&&!n.port&&(n.port=this.secure?"443":"80"),this.hostname=n.hostname||(typeof location<"u"?location.hostname:"localhost"),this.port=n.port||(typeof location<"u"&&location.port?location.port:this.secure?"443":"80"),this.transports=n.transports||["polling","websocket","webtransport"],this.writeBuffer=[],this.prevBufferLen=0,this.opts=Object.assign({path:"/engine.io",agent:!1,withCredentials:!1,upgrade:!0,timestampParam:"t",rememberUpgrade:!1,addTrailingSlash:!0,rejectUnauthorized:!0,perMessageDeflate:{threshold:1024},transportOptions:{},closeOnBeforeunload:!1},n),this.opts.path=this.opts.path.replace(/\/$/,"")+(this.opts.addTrailingSlash?"/":""),typeof this.opts.query=="string"&&(this.opts.query=Ea(this.opts.query)),this.id=null,this.upgrades=null,this.pingInterval=null,this.pingTimeout=null,this.pingTimeoutTimer=null,typeof addEventListener=="function"&&(this.opts.closeOnBeforeunload&&(this.beforeunloadEventListener=()=>{this.transport&&(this.transport.removeAllListeners(),this.transport.close())},addEventListener("beforeunload",this.beforeunloadEventListener,!1)),this.hostname!=="localhost"&&(this.offlineEventListener=()=>{this.onClose("transport close",{description:"network connection lost"})},addEventListener("offline",this.offlineEventListener,!1))),this.open()}createTransport(e){const n=Object.assign({},this.opts.query);n.EIO=Nr,n.transport=e,this.id&&(n.sid=this.id);const s=Object.assign({},this.opts,{query:n,socket:this,hostname:this.hostname,secure:this.secure,port:this.port},this.opts.transportOptions[e]);return new La[e](s)}open(){let e;if(this.opts.rememberUpgrade&&Ce.priorWebsocketSuccess&&this.transports.indexOf("websocket")!==-1)e="websocket";else if(this.transports.length===0){this.setTimeoutFn(()=>{this.emitReserved("error","No transports available")},0);return}else e=this.transports[0];this.readyState="opening";try{e=this.createTransport(e)}catch{this.transports.shift(),this.open();return}e.open(),this.setTransport(e)}setTransport(e){this.transport&&this.transport.removeAllListeners(),this.transport=e,e.on("drain",this.onDrain.bind(this)).on("packet",this.onPacket.bind(this)).on("error",this.onError.bind(this)).on("close",n=>this.onClose("transport close",n))}probe(e){let n=this.createTransport(e),s=!1;Ce.priorWebsocketSuccess=!1;const r=()=>{s||(n.send([{type:"ping",data:"probe"}]),n.once("packet",u=>{if(!s)if(u.type==="pong"&&u.data==="probe"){if(this.upgrading=!0,this.emitReserved("upgrading",n),!n)return;Ce.priorWebsocketSuccess=n.name==="websocket",this.transport.pause(()=>{s||this.readyState!=="closed"&&(l(),this.setTransport(n),n.send([{type:"upgrade"}]),this.emitReserved("upgrade",n),n=null,this.upgrading=!1,this.flush())})}else{const y=new Error("probe error");y.transport=n.name,this.emitReserved("upgradeError",y)}}))};function i(){s||(s=!0,l(),n.close(),n=null)}const o=u=>{const y=new Error("probe error: "+u);y.transport=n.name,i(),this.emitReserved("upgradeError",y)};function c(){o("transport closed")}function d(){o("socket closed")}function h(u){n&&u.name!==n.name&&i()}const l=()=>{n.removeListener("open",r),n.removeListener("error",o),n.removeListener("close",c),this.off("close",d),this.off("upgrading",h)};n.once("open",r),n.once("error",o),n.once("close",c),this.once("close",d),this.once("upgrading",h),this.upgrades.indexOf("webtransport")!==-1&&e!=="webtransport"?this.setTimeoutFn(()=>{s||n.open()},200):n.open()}onOpen(){if(this.readyState="open",Ce.priorWebsocketSuccess=this.transport.name==="websocket",this.emitReserved("open"),this.flush(),this.readyState==="open"&&this.opts.upgrade){let e=0;const n=this.upgrades.length;for(;e<n;e++)this.probe(this.upgrades[e])}}onPacket(e){if(this.readyState==="opening"||this.readyState==="open"||this.readyState==="closing")switch(this.emitReserved("packet",e),this.emitReserved("heartbeat"),this.resetPingTimeout(),e.type){case"open":this.onHandshake(JSON.parse(e.data));break;case"ping":this.sendPacket("pong"),this.emitReserved("ping"),this.emitReserved("pong");break;case"error":const n=new Error("server error");n.code=e.data,this.onError(n);break;case"message":this.emitReserved("data",e.data),this.emitReserved("message",e.data);break}}onHandshake(e){this.emitReserved("handshake",e),this.id=e.sid,this.transport.query.sid=e.sid,this.upgrades=this.filterUpgrades(e.upgrades),this.pingInterval=e.pingInterval,this.pingTimeout=e.pingTimeout,this.maxPayload=e.maxPayload,this.onOpen(),this.readyState!=="closed"&&this.resetPingTimeout()}resetPingTimeout(){this.clearTimeoutFn(this.pingTimeoutTimer),this.pingTimeoutTimer=this.setTimeoutFn(()=>{this.onClose("ping timeout")},this.pingInterval+this.pingTimeout),this.opts.autoUnref&&this.pingTimeoutTimer.unref()}onDrain(){this.writeBuffer.splice(0,this.prevBufferLen),this.prevBufferLen=0,this.writeBuffer.length===0?this.emitReserved("drain"):this.flush()}flush(){if(this.readyState!=="closed"&&this.transport.writable&&!this.upgrading&&this.writeBuffer.length){const e=this.getWritablePackets();this.transport.send(e),this.prevBufferLen=e.length,this.emitReserved("flush")}}getWritablePackets(){if(!(this.maxPayload&&this.transport.name==="polling"&&this.writeBuffer.length>1))return this.writeBuffer;let n=1;for(let s=0;s<this.writeBuffer.length;s++){const r=this.writeBuffer[s].data;if(r&&(n+=wa(r)),s>0&&n>this.maxPayload)return this.writeBuffer.slice(0,s);n+=2}return this.writeBuffer}write(e,n,s){return this.sendPacket("message",e,n,s),this}send(e,n,s){return this.sendPacket("message",e,n,s),this}sendPacket(e,n,s,r){if(typeof n=="function"&&(r=n,n=void 0),typeof s=="function"&&(r=s,s=null),this.readyState==="closing"||this.readyState==="closed")return;s=s||{},s.compress=s.compress!==!1;const i={type:e,data:n,options:s};this.emitReserved("packetCreate",i),this.writeBuffer.push(i),r&&this.once("flush",r),this.flush()}close(){const e=()=>{this.onClose("forced close"),this.transport.close()},n=()=>{this.off("upgrade",n),this.off("upgradeError",n),e()},s=()=>{this.once("upgrade",n),this.once("upgradeError",n)};return(this.readyState==="opening"||this.readyState==="open")&&(this.readyState="closing",this.writeBuffer.length?this.once("drain",()=>{this.upgrading?s():e()}):this.upgrading?s():e()),this}onError(e){Ce.priorWebsocketSuccess=!1,this.emitReserved("error",e),this.onClose("transport error",e)}onClose(e,n){(this.readyState==="opening"||this.readyState==="open"||this.readyState==="closing")&&(this.clearTimeoutFn(this.pingTimeoutTimer),this.transport.removeAllListeners("close"),this.transport.close(),this.transport.removeAllListeners(),typeof removeEventListener=="function"&&(removeEventListener("beforeunload",this.beforeunloadEventListener,!1),removeEventListener("offline",this.offlineEventListener,!1)),this.readyState="closed",this.id=null,this.emitReserved("close",e,n),this.writeBuffer=[],this.prevBufferLen=0)}filterUpgrades(e){const n=[];let s=0;const r=e.length;for(;s<r;s++)~this.transports.indexOf(e[s])&&n.push(e[s]);return n}};Pr.protocol=Nr;function Ba(t,e="",n){let s=t;n=n||typeof location<"u"&&location,t==null&&(t=n.protocol+"//"+n.host),typeof t=="string"&&(t.charAt(0)==="/"&&(t.charAt(1)==="/"?t=n.protocol+t:t=n.host+t),/^(https?|wss?):\/\//.test(t)||(typeof n<"u"?t=n.protocol+"//"+t:t="https://"+t),s=pn(t)),s.port||(/^(http|ws)$/.test(s.protocol)?s.port="80":/^(http|ws)s$/.test(s.protocol)&&(s.port="443")),s.path=s.path||"/";const i=s.host.indexOf(":")!==-1?"["+s.host+"]":s.host;return s.id=s.protocol+"://"+i+":"+s.port+e,s.href=s.protocol+"://"+i+(n&&n.port===s.port?"":":"+s.port),s}const Fa=typeof ArrayBuffer=="function",Ua=t=>typeof ArrayBuffer.isView=="function"?ArrayBuffer.isView(t):t.buffer instanceof ArrayBuffer,Mr=Object.prototype.toString,$a=typeof Blob=="function"||typeof Blob<"u"&&Mr.call(Blob)==="[object BlobConstructor]",qa=typeof File=="function"||typeof File<"u"&&Mr.call(File)==="[object FileConstructor]";function Kn(t){return Fa&&(t instanceof ArrayBuffer||Ua(t))||$a&&t instanceof Blob||qa&&t instanceof File}function pt(t,e){if(!t||typeof t!="object")return!1;if(Array.isArray(t)){for(let n=0,s=t.length;n<s;n++)if(pt(t[n]))return!0;return!1}if(Kn(t))return!0;if(t.toJSON&&typeof t.toJSON=="function"&&arguments.length===1)return pt(t.toJSON(),!0);for(const n in t)if(Object.prototype.hasOwnProperty.call(t,n)&&pt(t[n]))return!0;return!1}function Ha(t){const e=[],n=t.data,s=t;return s.data=gn(n,e),s.attachments=e.length,{packet:s,buffers:e}}function gn(t,e){if(!t)return t;if(Kn(t)){const n={_placeholder:!0,num:e.length};return e.push(t),n}else if(Array.isArray(t)){const n=new Array(t.length);for(let s=0;s<t.length;s++)n[s]=gn(t[s],e);return n}else if(typeof t=="object"&&!(t instanceof Date)){const n={};for(const s in t)Object.prototype.hasOwnProperty.call(t,s)&&(n[s]=gn(t[s],e));return n}return t}function za(t,e){return t.data=yn(t.data,e),delete t.attachments,t}function yn(t,e){if(!t)return t;if(t&&t._placeholder===!0){if(typeof t.num=="number"&&t.num>=0&&t.num<e.length)return e[t.num];throw new Error("illegal attachments")}else if(Array.isArray(t))for(let n=0;n<t.length;n++)t[n]=yn(t[n],e);else if(typeof t=="object")for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&(t[n]=yn(t[n],e));return t}const Wa=["connect","connect_error","disconnect","disconnecting","newListener","removeListener"],Va=5;var C;(function(t){t[t.CONNECT=0]="CONNECT",t[t.DISCONNECT=1]="DISCONNECT",t[t.EVENT=2]="EVENT",t[t.ACK=3]="ACK",t[t.CONNECT_ERROR=4]="CONNECT_ERROR",t[t.BINARY_EVENT=5]="BINARY_EVENT",t[t.BINARY_ACK=6]="BINARY_ACK"})(C||(C={}));class Ya{constructor(e){this.replacer=e}encode(e){return(e.type===C.EVENT||e.type===C.ACK)&&pt(e)?this.encodeAsBinary({type:e.type===C.EVENT?C.BINARY_EVENT:C.BINARY_ACK,nsp:e.nsp,data:e.data,id:e.id}):[this.encodeAsString(e)]}encodeAsString(e){let n=""+e.type;return(e.type===C.BINARY_EVENT||e.type===C.BINARY_ACK)&&(n+=e.attachments+"-"),e.nsp&&e.nsp!=="/"&&(n+=e.nsp+","),e.id!=null&&(n+=e.id),e.data!=null&&(n+=JSON.stringify(e.data,this.replacer)),n}encodeAsBinary(e){const n=Ha(e),s=this.encodeAsString(n.packet),r=n.buffers;return r.unshift(s),r}}function Os(t){return Object.prototype.toString.call(t)==="[object Object]"}class Jn extends D{constructor(e){super(),this.reviver=e}add(e){let n;if(typeof e=="string"){if(this.reconstructor)throw new Error("got plaintext data when reconstructing a packet");n=this.decodeString(e);const s=n.type===C.BINARY_EVENT;s||n.type===C.BINARY_ACK?(n.type=s?C.EVENT:C.ACK,this.reconstructor=new Ka(n),n.attachments===0&&super.emitReserved("decoded",n)):super.emitReserved("decoded",n)}else if(Kn(e)||e.base64)if(this.reconstructor)n=this.reconstructor.takeBinaryData(e),n&&(this.reconstructor=null,super.emitReserved("decoded",n));else throw new Error("got binary data when not reconstructing a packet");else throw new Error("Unknown type: "+e)}decodeString(e){let n=0;const s={type:Number(e.charAt(0))};if(C[s.type]===void 0)throw new Error("unknown packet type "+s.type);if(s.type===C.BINARY_EVENT||s.type===C.BINARY_ACK){const i=n+1;for(;e.charAt(++n)!=="-"&&n!=e.length;);const o=e.substring(i,n);if(o!=Number(o)||e.charAt(n)!=="-")throw new Error("Illegal attachments");s.attachments=Number(o)}if(e.charAt(n+1)==="/"){const i=n+1;for(;++n&&!(e.charAt(n)===","||n===e.length););s.nsp=e.substring(i,n)}else s.nsp="/";const r=e.charAt(n+1);if(r!==""&&Number(r)==r){const i=n+1;for(;++n;){const o=e.charAt(n);if(o==null||Number(o)!=o){--n;break}if(n===e.length)break}s.id=Number(e.substring(i,n+1))}if(e.charAt(++n)){const i=this.tryParse(e.substr(n));if(Jn.isPayloadValid(s.type,i))s.data=i;else throw new Error("invalid payload")}return s}tryParse(e){try{return JSON.parse(e,this.reviver)}catch{return!1}}static isPayloadValid(e,n){switch(e){case C.CONNECT:return Os(n);case C.DISCONNECT:return n===void 0;case C.CONNECT_ERROR:return typeof n=="string"||Os(n);case C.EVENT:case C.BINARY_EVENT:return Array.isArray(n)&&(typeof n[0]=="number"||typeof n[0]=="string"&&Wa.indexOf(n[0])===-1);case C.ACK:case C.BINARY_ACK:return Array.isArray(n)}}destroy(){this.reconstructor&&(this.reconstructor.finishedReconstruction(),this.reconstructor=null)}}class Ka{constructor(e){this.packet=e,this.buffers=[],this.reconPack=e}takeBinaryData(e){if(this.buffers.push(e),this.buffers.length===this.reconPack.attachments){const n=za(this.reconPack,this.buffers);return this.finishedReconstruction(),n}return null}finishedReconstruction(){this.reconPack=null,this.buffers=[]}}const Ja=Object.freeze(Object.defineProperty({__proto__:null,Decoder:Jn,Encoder:Ya,get PacketType(){return C},protocol:Va},Symbol.toStringTag,{value:"Module"}));function te(t,e,n){return t.on(e,n),function(){t.off(e,n)}}const Xa=Object.freeze({connect:1,connect_error:1,disconnect:1,disconnecting:1,newListener:1,removeListener:1});class Dr extends D{constructor(e,n,s){super(),this.connected=!1,this.recovered=!1,this.receiveBuffer=[],this.sendBuffer=[],this._queue=[],this._queueSeq=0,this.ids=0,this.acks={},this.flags={},this.io=e,this.nsp=n,s&&s.auth&&(this.auth=s.auth),this._opts=Object.assign({},s),this.io._autoConnect&&this.open()}get disconnected(){return!this.connected}subEvents(){if(this.subs)return;const e=this.io;this.subs=[te(e,"open",this.onopen.bind(this)),te(e,"packet",this.onpacket.bind(this)),te(e,"error",this.onerror.bind(this)),te(e,"close",this.onclose.bind(this))]}get active(){return!!this.subs}connect(){return this.connected?this:(this.subEvents(),this.io._reconnecting||this.io.open(),this.io._readyState==="open"&&this.onopen(),this)}open(){return this.connect()}send(...e){return e.unshift("message"),this.emit.apply(this,e),this}emit(e,...n){if(Xa.hasOwnProperty(e))throw new Error('"'+e.toString()+'" is a reserved event name');if(n.unshift(e),this._opts.retries&&!this.flags.fromQueue&&!this.flags.volatile)return this._addToQueue(n),this;const s={type:C.EVENT,data:n};if(s.options={},s.options.compress=this.flags.compress!==!1,typeof n[n.length-1]=="function"){const o=this.ids++,c=n.pop();this._registerAckCallback(o,c),s.id=o}const r=this.io.engine&&this.io.engine.transport&&this.io.engine.transport.writable;return this.flags.volatile&&(!r||!this.connected)||(this.connected?(this.notifyOutgoingListeners(s),this.packet(s)):this.sendBuffer.push(s)),this.flags={},this}_registerAckCallback(e,n){var s;const r=(s=this.flags.timeout)!==null&&s!==void 0?s:this._opts.ackTimeout;if(r===void 0){this.acks[e]=n;return}const i=this.io.setTimeoutFn(()=>{delete this.acks[e];for(let o=0;o<this.sendBuffer.length;o++)this.sendBuffer[o].id===e&&this.sendBuffer.splice(o,1);n.call(this,new Error("operation has timed out"))},r);this.acks[e]=(...o)=>{this.io.clearTimeoutFn(i),n.apply(this,[null,...o])}}emitWithAck(e,...n){const s=this.flags.timeout!==void 0||this._opts.ackTimeout!==void 0;return new Promise((r,i)=>{n.push((o,c)=>s?o?i(o):r(c):r(o)),this.emit(e,...n)})}_addToQueue(e){let n;typeof e[e.length-1]=="function"&&(n=e.pop());const s={id:this._queueSeq++,tryCount:0,pending:!1,args:e,flags:Object.assign({fromQueue:!0},this.flags)};e.push((r,...i)=>s!==this._queue[0]?void 0:(r!==null?s.tryCount>this._opts.retries&&(this._queue.shift(),n&&n(r)):(this._queue.shift(),n&&n(null,...i)),s.pending=!1,this._drainQueue())),this._queue.push(s),this._drainQueue()}_drainQueue(e=!1){if(!this.connected||this._queue.length===0)return;const n=this._queue[0];n.pending&&!e||(n.pending=!0,n.tryCount++,this.flags=n.flags,this.emit.apply(this,n.args))}packet(e){e.nsp=this.nsp,this.io._packet(e)}onopen(){typeof this.auth=="function"?this.auth(e=>{this._sendConnectPacket(e)}):this._sendConnectPacket(this.auth)}_sendConnectPacket(e){this.packet({type:C.CONNECT,data:this._pid?Object.assign({pid:this._pid,offset:this._lastOffset},e):e})}onerror(e){this.connected||this.emitReserved("connect_error",e)}onclose(e,n){this.connected=!1,delete this.id,this.emitReserved("disconnect",e,n)}onpacket(e){if(e.nsp===this.nsp)switch(e.type){case C.CONNECT:e.data&&e.data.sid?this.onconnect(e.data.sid,e.data.pid):this.emitReserved("connect_error",new Error("It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)"));break;case C.EVENT:case C.BINARY_EVENT:this.onevent(e);break;case C.ACK:case C.BINARY_ACK:this.onack(e);break;case C.DISCONNECT:this.ondisconnect();break;case C.CONNECT_ERROR:this.destroy();const s=new Error(e.data.message);s.data=e.data.data,this.emitReserved("connect_error",s);break}}onevent(e){const n=e.data||[];e.id!=null&&n.push(this.ack(e.id)),this.connected?this.emitEvent(n):this.receiveBuffer.push(Object.freeze(n))}emitEvent(e){if(this._anyListeners&&this._anyListeners.length){const n=this._anyListeners.slice();for(const s of n)s.apply(this,e)}super.emit.apply(this,e),this._pid&&e.length&&typeof e[e.length-1]=="string"&&(this._lastOffset=e[e.length-1])}ack(e){const n=this;let s=!1;return function(...r){s||(s=!0,n.packet({type:C.ACK,id:e,data:r}))}}onack(e){const n=this.acks[e.id];typeof n=="function"&&(n.apply(this,e.data),delete this.acks[e.id])}onconnect(e,n){this.id=e,this.recovered=n&&this._pid===n,this._pid=n,this.connected=!0,this.emitBuffered(),this.emitReserved("connect"),this._drainQueue(!0)}emitBuffered(){this.receiveBuffer.forEach(e=>this.emitEvent(e)),this.receiveBuffer=[],this.sendBuffer.forEach(e=>{this.notifyOutgoingListeners(e),this.packet(e)}),this.sendBuffer=[]}ondisconnect(){this.destroy(),this.onclose("io server disconnect")}destroy(){this.subs&&(this.subs.forEach(e=>e()),this.subs=void 0),this.io._destroy(this)}disconnect(){return this.connected&&this.packet({type:C.DISCONNECT}),this.destroy(),this.connected&&this.onclose("io client disconnect"),this}close(){return this.disconnect()}compress(e){return this.flags.compress=e,this}get volatile(){return this.flags.volatile=!0,this}timeout(e){return this.flags.timeout=e,this}onAny(e){return this._anyListeners=this._anyListeners||[],this._anyListeners.push(e),this}prependAny(e){return this._anyListeners=this._anyListeners||[],this._anyListeners.unshift(e),this}offAny(e){if(!this._anyListeners)return this;if(e){const n=this._anyListeners;for(let s=0;s<n.length;s++)if(e===n[s])return n.splice(s,1),this}else this._anyListeners=[];return this}listenersAny(){return this._anyListeners||[]}onAnyOutgoing(e){return this._anyOutgoingListeners=this._anyOutgoingListeners||[],this._anyOutgoingListeners.push(e),this}prependAnyOutgoing(e){return this._anyOutgoingListeners=this._anyOutgoingListeners||[],this._anyOutgoingListeners.unshift(e),this}offAnyOutgoing(e){if(!this._anyOutgoingListeners)return this;if(e){const n=this._anyOutgoingListeners;for(let s=0;s<n.length;s++)if(e===n[s])return n.splice(s,1),this}else this._anyOutgoingListeners=[];return this}listenersAnyOutgoing(){return this._anyOutgoingListeners||[]}notifyOutgoingListeners(e){if(this._anyOutgoingListeners&&this._anyOutgoingListeners.length){const n=this._anyOutgoingListeners.slice();for(const s of n)s.apply(this,e.data)}}}function Re(t){t=t||{},this.ms=t.min||100,this.max=t.max||1e4,this.factor=t.factor||2,this.jitter=t.jitter>0&&t.jitter<=1?t.jitter:0,this.attempts=0}Re.prototype.duration=function(){var t=this.ms*Math.pow(this.factor,this.attempts++);if(this.jitter){var e=Math.random(),n=Math.floor(e*this.jitter*t);t=Math.floor(e*10)&1?t+n:t-n}return Math.min(t,this.max)|0};Re.prototype.reset=function(){this.attempts=0};Re.prototype.setMin=function(t){this.ms=t};Re.prototype.setMax=function(t){this.max=t};Re.prototype.setJitter=function(t){this.jitter=t};class bn extends D{constructor(e,n){var s;super(),this.nsps={},this.subs=[],e&&typeof e=="object"&&(n=e,e=void 0),n=n||{},n.path=n.path||"/socket.io",this.opts=n,Pt(this,n),this.reconnection(n.reconnection!==!1),this.reconnectionAttempts(n.reconnectionAttempts||1/0),this.reconnectionDelay(n.reconnectionDelay||1e3),this.reconnectionDelayMax(n.reconnectionDelayMax||5e3),this.randomizationFactor((s=n.randomizationFactor)!==null&&s!==void 0?s:.5),this.backoff=new Re({min:this.reconnectionDelay(),max:this.reconnectionDelayMax(),jitter:this.randomizationFactor()}),this.timeout(n.timeout==null?2e4:n.timeout),this._readyState="closed",this.uri=e;const r=n.parser||Ja;this.encoder=new r.Encoder,this.decoder=new r.Decoder,this._autoConnect=n.autoConnect!==!1,this._autoConnect&&this.open()}reconnection(e){return arguments.length?(this._reconnection=!!e,this):this._reconnection}reconnectionAttempts(e){return e===void 0?this._reconnectionAttempts:(this._reconnectionAttempts=e,this)}reconnectionDelay(e){var n;return e===void 0?this._reconnectionDelay:(this._reconnectionDelay=e,(n=this.backoff)===null||n===void 0||n.setMin(e),this)}randomizationFactor(e){var n;return e===void 0?this._randomizationFactor:(this._randomizationFactor=e,(n=this.backoff)===null||n===void 0||n.setJitter(e),this)}reconnectionDelayMax(e){var n;return e===void 0?this._reconnectionDelayMax:(this._reconnectionDelayMax=e,(n=this.backoff)===null||n===void 0||n.setMax(e),this)}timeout(e){return arguments.length?(this._timeout=e,this):this._timeout}maybeReconnectOnOpen(){!this._reconnecting&&this._reconnection&&this.backoff.attempts===0&&this.reconnect()}open(e){if(~this._readyState.indexOf("open"))return this;this.engine=new Pr(this.uri,this.opts);const n=this.engine,s=this;this._readyState="opening",this.skipReconnect=!1;const r=te(n,"open",function(){s.onopen(),e&&e()}),i=c=>{this.cleanup(),this._readyState="closed",this.emitReserved("error",c),e?e(c):this.maybeReconnectOnOpen()},o=te(n,"error",i);if(this._timeout!==!1){const c=this._timeout,d=this.setTimeoutFn(()=>{r(),i(new Error("timeout")),n.close()},c);this.opts.autoUnref&&d.unref(),this.subs.push(()=>{this.clearTimeoutFn(d)})}return this.subs.push(r),this.subs.push(o),this}connect(e){return this.open(e)}onopen(){this.cleanup(),this._readyState="open",this.emitReserved("open");const e=this.engine;this.subs.push(te(e,"ping",this.onping.bind(this)),te(e,"data",this.ondata.bind(this)),te(e,"error",this.onerror.bind(this)),te(e,"close",this.onclose.bind(this)),te(this.decoder,"decoded",this.ondecoded.bind(this)))}onping(){this.emitReserved("ping")}ondata(e){try{this.decoder.add(e)}catch(n){this.onclose("parse error",n)}}ondecoded(e){Yn(()=>{this.emitReserved("packet",e)},this.setTimeoutFn)}onerror(e){this.emitReserved("error",e)}socket(e,n){let s=this.nsps[e];return s?this._autoConnect&&!s.active&&s.connect():(s=new Dr(this,e,n),this.nsps[e]=s),s}_destroy(e){const n=Object.keys(this.nsps);for(const s of n)if(this.nsps[s].active)return;this._close()}_packet(e){const n=this.encoder.encode(e);for(let s=0;s<n.length;s++)this.engine.write(n[s],e.options)}cleanup(){this.subs.forEach(e=>e()),this.subs.length=0,this.decoder.destroy()}_close(){this.skipReconnect=!0,this._reconnecting=!1,this.onclose("forced close"),this.engine&&this.engine.close()}disconnect(){return this._close()}onclose(e,n){this.cleanup(),this.backoff.reset(),this._readyState="closed",this.emitReserved("close",e,n),this._reconnection&&!this.skipReconnect&&this.reconnect()}reconnect(){if(this._reconnecting||this.skipReconnect)return this;const e=this;if(this.backoff.attempts>=this._reconnectionAttempts)this.backoff.reset(),this.emitReserved("reconnect_failed"),this._reconnecting=!1;else{const n=this.backoff.duration();this._reconnecting=!0;const s=this.setTimeoutFn(()=>{e.skipReconnect||(this.emitReserved("reconnect_attempt",e.backoff.attempts),!e.skipReconnect&&e.open(r=>{r?(e._reconnecting=!1,e.reconnect(),this.emitReserved("reconnect_error",r)):e.onreconnect()}))},n);this.opts.autoUnref&&s.unref(),this.subs.push(()=>{this.clearTimeoutFn(s)})}}onreconnect(){const e=this.backoff.attempts;this._reconnecting=!1,this.backoff.reset(),this.emitReserved("reconnect",e)}}const Me={};function gt(t,e){typeof t=="object"&&(e=t,t=void 0),e=e||{};const n=Ba(t,e.path||"/socket.io"),s=n.source,r=n.id,i=n.path,o=Me[r]&&i in Me[r].nsps,c=e.forceNew||e["force new connection"]||e.multiplex===!1||o;let d;return c?d=new bn(s,e):(Me[r]||(Me[r]=new bn(s,e)),d=Me[r]),n.query&&!e.query&&(e.query=n.queryKey),d.socket(n.path,e)}Object.assign(gt,{Manager:bn,Socket:Dr,io:gt,connect:gt});const b=gt("/",{autoConnect:!1}),Rs="get-connectors",Ga="remove-connector";class Ir{constructor(){W(this,"handler");this.handler=null}connect(e){this.handler!==null&&this.disconnect(),this.handler=e,b.on(Rs,this.handler.onConnectors)}static remove(e){b.emit(Ga,{id:e})}disconnect(){this.handler!==null&&(b.off(Rs,this.handler.onConnectors),this.handler=null)}}const zt="music-like",Wt="music-hate",Vt="music-count";class Ae{constructor(){W(this,"handler");this.handler=null}connect(e){this.handler!==null&&this.disconnect(),this.handler=e,b.on(zt,this.handler.onLike),b.on(Wt,this.handler.onHate),b.on(Vt,this.handler.onCount)}static like(e,n){b.emit(zt,{id:e,isLiked:n})}static hate(e){b.emit(Wt,{id:e})}static async count(e){if(e&&this.shouldIncreaseItems.push(e),!!b.connected)for(;this.shouldIncreaseItems.length>0;){const n=this.shouldIncreaseItems.pop();if(!n)break;await new Promise(s=>setTimeout(s,1e3)),b.emit(Vt,{id:n})}}disconnect(){this.handler!==null&&(b.off(zt,this.handler.onLike),b.off(Wt,this.handler.onHate),b.off(Vt,this.handler.onCount),this.handler=null)}}W(Ae,"shouldIncreaseItems",[]);const Yt="playlist-create",Kt="playlist-delete",Jt="playlist-update",Xt="playlist-change-order",Gt="playlist-add-music",$e="playlist-move-music",qe="playlist-remove-music",He="playlist-change-music-order";class ce{constructor(){W(this,"handler");this.handler=null}connect(e){this.handler!==null&&this.disconnect(),this.handler=e,b.on(Yt,this.handler.onCreate),b.on(Kt,this.handler.onDelete),b.on(Jt,this.handler.onUpdate),b.on(Xt,this.handler.onChangeOrder),b.on(Gt,this.handler.onAddMusic),b.on($e,this.handler.onMoveMusic),b.on(qe,this.handler.onRemoveMusic),b.on(He,this.handler.onChangeMusicOrder)}static create(e){b.emit(Yt,{name:e})}static update(e,n){b.emit(Jt,{id:e,name:n})}static delete(e){b.emit(Kt,{id:e})}static changeOrder(e){b.emit(Xt,{ids:e})}static addMusic(e,n){b.emit(Gt,{id:e,musicIds:n})}static moveMusic(e,n,s){b.emit($e,{fromId:e,toId:n,musicIds:s})}static removeMusic(e,n){b.emit(qe,{id:e,musicIds:n})}static changeMusicOrder(e,n){b.emit(He,{id:e,musicIds:n})}disconnect(){this.handler!==null&&(b.off(Yt,this.handler.onCreate),b.off(Kt,this.handler.onDelete),b.off(Jt,this.handler.onUpdate),b.off(Xt,this.handler.onChangeOrder),b.off(Gt,this.handler.onAddMusic),b.off($e,this.handler.onMoveMusic),b.off(qe,this.handler.onRemoveMusic),b.off(He,this.handler.onChangeMusicOrder),this.handler=null)}}const _e=t=>t.sort((e,n)=>e.name.localeCompare(n.name)),kt=t=>t.sort((e,n)=>e.artist.name.localeCompare(n.artist.name)),Ts=t=>t.sort((e,n)=>e.album.name.localeCompare(n.album.name)),dt=t=>t.sort((e,n)=>n.playCount-e.playCount),Se=t=>t.sort((e,n)=>n.createdAt-e.createdAt),Ls=t=>t.sort((e,n)=>n.publishedYear.localeCompare(e.publishedYear)),Ps=t=>t.sort((e,n)=>n.albumCount-e.albumCount),Ms=t=>t.sort((e,n)=>n.musicCount-e.musicCount);function Br(t,e){return function(){return t.apply(e,arguments)}}const{toString:Qa}=Object.prototype,{getPrototypeOf:Xn}=Object,Mt=(t=>e=>{const n=Qa.call(e);return t[n]||(t[n]=n.slice(8,-1).toLowerCase())})(Object.create(null)),de=t=>(t=t.toLowerCase(),e=>Mt(e)===t),Dt=t=>e=>typeof e===t,{isArray:Te}=Array,Je=Dt("undefined");function Za(t){return t!==null&&!Je(t)&&t.constructor!==null&&!Je(t.constructor)&&ee(t.constructor.isBuffer)&&t.constructor.isBuffer(t)}const Fr=de("ArrayBuffer");function ec(t){let e;return typeof ArrayBuffer<"u"&&ArrayBuffer.isView?e=ArrayBuffer.isView(t):e=t&&t.buffer&&Fr(t.buffer),e}const tc=Dt("string"),ee=Dt("function"),Ur=Dt("number"),It=t=>t!==null&&typeof t=="object",nc=t=>t===!0||t===!1,yt=t=>{if(Mt(t)!=="object")return!1;const e=Xn(t);return(e===null||e===Object.prototype||Object.getPrototypeOf(e)===null)&&!(Symbol.toStringTag in t)&&!(Symbol.iterator in t)},sc=de("Date"),rc=de("File"),ic=de("Blob"),oc=de("FileList"),ac=t=>It(t)&&ee(t.pipe),cc=t=>{let e;return t&&(typeof FormData=="function"&&t instanceof FormData||ee(t.append)&&((e=Mt(t))==="formdata"||e==="object"&&ee(t.toString)&&t.toString()==="[object FormData]"))},lc=de("URLSearchParams"),dc=t=>t.trim?t.trim():t.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"");function tt(t,e,{allOwnKeys:n=!1}={}){if(t===null||typeof t>"u")return;let s,r;if(typeof t!="object"&&(t=[t]),Te(t))for(s=0,r=t.length;s<r;s++)e.call(null,t[s],s,t);else{const i=n?Object.getOwnPropertyNames(t):Object.keys(t),o=i.length;let c;for(s=0;s<o;s++)c=i[s],e.call(null,t[c],c,t)}}function $r(t,e){e=e.toLowerCase();const n=Object.keys(t);let s=n.length,r;for(;s-- >0;)if(r=n[s],e===r.toLowerCase())return r;return null}const qr=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:global,Hr=t=>!Je(t)&&t!==qr;function xn(){const{caseless:t}=Hr(this)&&this||{},e={},n=(s,r)=>{const i=t&&$r(e,r)||r;yt(e[i])&&yt(s)?e[i]=xn(e[i],s):yt(s)?e[i]=xn({},s):Te(s)?e[i]=s.slice():e[i]=s};for(let s=0,r=arguments.length;s<r;s++)arguments[s]&&tt(arguments[s],n);return e}const uc=(t,e,n,{allOwnKeys:s}={})=>(tt(e,(r,i)=>{n&&ee(r)?t[i]=Br(r,n):t[i]=r},{allOwnKeys:s}),t),hc=t=>(t.charCodeAt(0)===65279&&(t=t.slice(1)),t),fc=(t,e,n,s)=>{t.prototype=Object.create(e.prototype,s),t.prototype.constructor=t,Object.defineProperty(t,"super",{value:e.prototype}),n&&Object.assign(t.prototype,n)},mc=(t,e,n,s)=>{let r,i,o;const c={};if(e=e||{},t==null)return e;do{for(r=Object.getOwnPropertyNames(t),i=r.length;i-- >0;)o=r[i],(!s||s(o,t,e))&&!c[o]&&(e[o]=t[o],c[o]=!0);t=n!==!1&&Xn(t)}while(t&&(!n||n(t,e))&&t!==Object.prototype);return e},pc=(t,e,n)=>{t=String(t),(n===void 0||n>t.length)&&(n=t.length),n-=e.length;const s=t.indexOf(e,n);return s!==-1&&s===n},gc=t=>{if(!t)return null;if(Te(t))return t;let e=t.length;if(!Ur(e))return null;const n=new Array(e);for(;e-- >0;)n[e]=t[e];return n},yc=(t=>e=>t&&e instanceof t)(typeof Uint8Array<"u"&&Xn(Uint8Array)),bc=(t,e)=>{const s=(t&&t[Symbol.iterator]).call(t);let r;for(;(r=s.next())&&!r.done;){const i=r.value;e.call(t,i[0],i[1])}},xc=(t,e)=>{let n;const s=[];for(;(n=t.exec(e))!==null;)s.push(n);return s},wc=de("HTMLFormElement"),vc=t=>t.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g,function(n,s,r){return s.toUpperCase()+r}),Ds=(({hasOwnProperty:t})=>(e,n)=>t.call(e,n))(Object.prototype),Cc=de("RegExp"),zr=(t,e)=>{const n=Object.getOwnPropertyDescriptors(t),s={};tt(n,(r,i)=>{let o;(o=e(r,i,t))!==!1&&(s[i]=o||r)}),Object.defineProperties(t,s)},Ec=t=>{zr(t,(e,n)=>{if(ee(t)&&["arguments","caller","callee"].indexOf(n)!==-1)return!1;const s=t[n];if(ee(s)){if(e.enumerable=!1,"writable"in e){e.writable=!1;return}e.set||(e.set=()=>{throw Error("Can not rewrite read-only method '"+n+"'")})}})},kc=(t,e)=>{const n={},s=r=>{r.forEach(i=>{n[i]=!0})};return Te(t)?s(t):s(String(t).split(e)),n},Ac=()=>{},_c=(t,e)=>(t=+t,Number.isFinite(t)?t:e),Qt="abcdefghijklmnopqrstuvwxyz",Is="0123456789",Wr={DIGIT:Is,ALPHA:Qt,ALPHA_DIGIT:Qt+Qt.toUpperCase()+Is},Sc=(t=16,e=Wr.ALPHA_DIGIT)=>{let n="";const{length:s}=e;for(;t--;)n+=e[Math.random()*s|0];return n};function Nc(t){return!!(t&&ee(t.append)&&t[Symbol.toStringTag]==="FormData"&&t[Symbol.iterator])}const jc=t=>{const e=new Array(10),n=(s,r)=>{if(It(s)){if(e.indexOf(s)>=0)return;if(!("toJSON"in s)){e[r]=s;const i=Te(s)?[]:{};return tt(s,(o,c)=>{const d=n(o,r+1);!Je(d)&&(i[c]=d)}),e[r]=void 0,i}}return s};return n(t,0)},Oc=de("AsyncFunction"),Rc=t=>t&&(It(t)||ee(t))&&ee(t.then)&&ee(t.catch),f={isArray:Te,isArrayBuffer:Fr,isBuffer:Za,isFormData:cc,isArrayBufferView:ec,isString:tc,isNumber:Ur,isBoolean:nc,isObject:It,isPlainObject:yt,isUndefined:Je,isDate:sc,isFile:rc,isBlob:ic,isRegExp:Cc,isFunction:ee,isStream:ac,isURLSearchParams:lc,isTypedArray:yc,isFileList:oc,forEach:tt,merge:xn,extend:uc,trim:dc,stripBOM:hc,inherits:fc,toFlatObject:mc,kindOf:Mt,kindOfTest:de,endsWith:pc,toArray:gc,forEachEntry:bc,matchAll:xc,isHTMLForm:wc,hasOwnProperty:Ds,hasOwnProp:Ds,reduceDescriptors:zr,freezeMethods:Ec,toObjectSet:kc,toCamelCase:vc,noop:Ac,toFiniteNumber:_c,findKey:$r,global:qr,isContextDefined:Hr,ALPHABET:Wr,generateString:Sc,isSpecCompliantForm:Nc,toJSONObject:jc,isAsyncFn:Oc,isThenable:Rc};function k(t,e,n,s,r){Error.call(this),Error.captureStackTrace?Error.captureStackTrace(this,this.constructor):this.stack=new Error().stack,this.message=t,this.name="AxiosError",e&&(this.code=e),n&&(this.config=n),s&&(this.request=s),r&&(this.response=r)}f.inherits(k,Error,{toJSON:function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:f.toJSONObject(this.config),code:this.code,status:this.response&&this.response.status?this.response.status:null}}});const Vr=k.prototype,Yr={};["ERR_BAD_OPTION_VALUE","ERR_BAD_OPTION","ECONNABORTED","ETIMEDOUT","ERR_NETWORK","ERR_FR_TOO_MANY_REDIRECTS","ERR_DEPRECATED","ERR_BAD_RESPONSE","ERR_BAD_REQUEST","ERR_CANCELED","ERR_NOT_SUPPORT","ERR_INVALID_URL"].forEach(t=>{Yr[t]={value:t}});Object.defineProperties(k,Yr);Object.defineProperty(Vr,"isAxiosError",{value:!0});k.from=(t,e,n,s,r,i)=>{const o=Object.create(Vr);return f.toFlatObject(t,o,function(d){return d!==Error.prototype},c=>c!=="isAxiosError"),k.call(o,t.message,e,n,s,r),o.cause=t,o.name=t.name,i&&Object.assign(o,i),o};const Tc=null;function wn(t){return f.isPlainObject(t)||f.isArray(t)}function Kr(t){return f.endsWith(t,"[]")?t.slice(0,-2):t}function Bs(t,e,n){return t?t.concat(e).map(function(r,i){return r=Kr(r),!n&&i?"["+r+"]":r}).join(n?".":""):e}function Lc(t){return f.isArray(t)&&!t.some(wn)}const Pc=f.toFlatObject(f,{},null,function(e){return/^is[A-Z]/.test(e)});function Bt(t,e,n){if(!f.isObject(t))throw new TypeError("target must be an object");e=e||new FormData,n=f.toFlatObject(n,{metaTokens:!0,dots:!1,indexes:!1},!1,function(p,x){return!f.isUndefined(x[p])});const s=n.metaTokens,r=n.visitor||l,i=n.dots,o=n.indexes,d=(n.Blob||typeof Blob<"u"&&Blob)&&f.isSpecCompliantForm(e);if(!f.isFunction(r))throw new TypeError("visitor must be a function");function h(g){if(g===null)return"";if(f.isDate(g))return g.toISOString();if(!d&&f.isBlob(g))throw new k("Blob is not supported. Use a Buffer instead.");return f.isArrayBuffer(g)||f.isTypedArray(g)?d&&typeof Blob=="function"?new Blob([g]):Buffer.from(g):g}function l(g,p,x){let v=g;if(g&&!x&&typeof g=="object"){if(f.endsWith(p,"{}"))p=s?p:p.slice(0,-2),g=JSON.stringify(g);else if(f.isArray(g)&&Lc(g)||(f.isFileList(g)||f.endsWith(p,"[]"))&&(v=f.toArray(g)))return p=Kr(p),v.forEach(function(O,ue){!(f.isUndefined(O)||O===null)&&e.append(o===!0?Bs([p],ue,i):o===null?p:p+"[]",h(O))}),!1}return wn(g)?!0:(e.append(Bs(x,p,i),h(g)),!1)}const u=[],y=Object.assign(Pc,{defaultVisitor:l,convertValue:h,isVisitable:wn});function w(g,p){if(!f.isUndefined(g)){if(u.indexOf(g)!==-1)throw Error("Circular reference detected in "+p.join("."));u.push(g),f.forEach(g,function(v,_){(!(f.isUndefined(v)||v===null)&&r.call(e,v,f.isString(_)?_.trim():_,p,y))===!0&&w(v,p?p.concat(_):[_])}),u.pop()}}if(!f.isObject(t))throw new TypeError("data must be an object");return w(t),e}function Fs(t){const e={"!":"%21","'":"%27","(":"%28",")":"%29","~":"%7E","%20":"+","%00":"\0"};return encodeURIComponent(t).replace(/[!'()~]|%20|%00/g,function(s){return e[s]})}function Gn(t,e){this._pairs=[],t&&Bt(t,this,e)}const Jr=Gn.prototype;Jr.append=function(e,n){this._pairs.push([e,n])};Jr.toString=function(e){const n=e?function(s){return e.call(this,s,Fs)}:Fs;return this._pairs.map(function(r){return n(r[0])+"="+n(r[1])},"").join("&")};function Mc(t){return encodeURIComponent(t).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}function Xr(t,e,n){if(!e)return t;const s=n&&n.encode||Mc,r=n&&n.serialize;let i;if(r?i=r(e,n):i=f.isURLSearchParams(e)?e.toString():new Gn(e,n).toString(s),i){const o=t.indexOf("#");o!==-1&&(t=t.slice(0,o)),t+=(t.indexOf("?")===-1?"?":"&")+i}return t}class Dc{constructor(){this.handlers=[]}use(e,n,s){return this.handlers.push({fulfilled:e,rejected:n,synchronous:s?s.synchronous:!1,runWhen:s?s.runWhen:null}),this.handlers.length-1}eject(e){this.handlers[e]&&(this.handlers[e]=null)}clear(){this.handlers&&(this.handlers=[])}forEach(e){f.forEach(this.handlers,function(s){s!==null&&e(s)})}}const Us=Dc,Gr={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1},Ic=typeof URLSearchParams<"u"?URLSearchParams:Gn,Bc=typeof FormData<"u"?FormData:null,Fc=typeof Blob<"u"?Blob:null,Uc={isBrowser:!0,classes:{URLSearchParams:Ic,FormData:Bc,Blob:Fc},protocols:["http","https","file","blob","url","data"]},Qr=typeof window<"u"&&typeof document<"u",$c=(t=>Qr&&["ReactNative","NativeScript","NS"].indexOf(t)<0)(typeof navigator<"u"&&navigator.product),qc=typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope&&typeof self.importScripts=="function",Hc=Object.freeze(Object.defineProperty({__proto__:null,hasBrowserEnv:Qr,hasStandardBrowserEnv:$c,hasStandardBrowserWebWorkerEnv:qc},Symbol.toStringTag,{value:"Module"})),ie={...Hc,...Uc};function zc(t,e){return Bt(t,new ie.classes.URLSearchParams,Object.assign({visitor:function(n,s,r,i){return ie.isNode&&f.isBuffer(n)?(this.append(s,n.toString("base64")),!1):i.defaultVisitor.apply(this,arguments)}},e))}function Wc(t){return f.matchAll(/\w+|\[(\w*)]/g,t).map(e=>e[0]==="[]"?"":e[1]||e[0])}function Vc(t){const e={},n=Object.keys(t);let s;const r=n.length;let i;for(s=0;s<r;s++)i=n[s],e[i]=t[i];return e}function Zr(t){function e(n,s,r,i){let o=n[i++];const c=Number.isFinite(+o),d=i>=n.length;return o=!o&&f.isArray(r)?r.length:o,d?(f.hasOwnProp(r,o)?r[o]=[r[o],s]:r[o]=s,!c):((!r[o]||!f.isObject(r[o]))&&(r[o]=[]),e(n,s,r[o],i)&&f.isArray(r[o])&&(r[o]=Vc(r[o])),!c)}if(f.isFormData(t)&&f.isFunction(t.entries)){const n={};return f.forEachEntry(t,(s,r)=>{e(Wc(s),r,n,0)}),n}return null}function Yc(t,e,n){if(f.isString(t))try{return(e||JSON.parse)(t),f.trim(t)}catch(s){if(s.name!=="SyntaxError")throw s}return(n||JSON.stringify)(t)}const Qn={transitional:Gr,adapter:["xhr","http"],transformRequest:[function(e,n){const s=n.getContentType()||"",r=s.indexOf("application/json")>-1,i=f.isObject(e);if(i&&f.isHTMLForm(e)&&(e=new FormData(e)),f.isFormData(e))return r&&r?JSON.stringify(Zr(e)):e;if(f.isArrayBuffer(e)||f.isBuffer(e)||f.isStream(e)||f.isFile(e)||f.isBlob(e))return e;if(f.isArrayBufferView(e))return e.buffer;if(f.isURLSearchParams(e))return n.setContentType("application/x-www-form-urlencoded;charset=utf-8",!1),e.toString();let c;if(i){if(s.indexOf("application/x-www-form-urlencoded")>-1)return zc(e,this.formSerializer).toString();if((c=f.isFileList(e))||s.indexOf("multipart/form-data")>-1){const d=this.env&&this.env.FormData;return Bt(c?{"files[]":e}:e,d&&new d,this.formSerializer)}}return i||r?(n.setContentType("application/json",!1),Yc(e)):e}],transformResponse:[function(e){const n=this.transitional||Qn.transitional,s=n&&n.forcedJSONParsing,r=this.responseType==="json";if(e&&f.isString(e)&&(s&&!this.responseType||r)){const o=!(n&&n.silentJSONParsing)&&r;try{return JSON.parse(e)}catch(c){if(o)throw c.name==="SyntaxError"?k.from(c,k.ERR_BAD_RESPONSE,this,null,this.response):c}}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,env:{FormData:ie.classes.FormData,Blob:ie.classes.Blob},validateStatus:function(e){return e>=200&&e<300},headers:{common:{Accept:"application/json, text/plain, */*","Content-Type":void 0}}};f.forEach(["delete","get","head","post","put","patch"],t=>{Qn.headers[t]={}});const Zn=Qn,Kc=f.toObjectSet(["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"]),Jc=t=>{const e={};let n,s,r;return t&&t.split(`
`).forEach(function(o){r=o.indexOf(":"),n=o.substring(0,r).trim().toLowerCase(),s=o.substring(r+1).trim(),!(!n||e[n]&&Kc[n])&&(n==="set-cookie"?e[n]?e[n].push(s):e[n]=[s]:e[n]=e[n]?e[n]+", "+s:s)}),e},$s=Symbol("internals");function De(t){return t&&String(t).trim().toLowerCase()}function bt(t){return t===!1||t==null?t:f.isArray(t)?t.map(bt):String(t)}function Xc(t){const e=Object.create(null),n=/([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;let s;for(;s=n.exec(t);)e[s[1]]=s[2];return e}const Gc=t=>/^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(t.trim());function Zt(t,e,n,s,r){if(f.isFunction(s))return s.call(this,e,n);if(r&&(e=n),!!f.isString(e)){if(f.isString(s))return e.indexOf(s)!==-1;if(f.isRegExp(s))return s.test(e)}}function Qc(t){return t.trim().toLowerCase().replace(/([a-z\d])(\w*)/g,(e,n,s)=>n.toUpperCase()+s)}function Zc(t,e){const n=f.toCamelCase(" "+e);["get","set","has"].forEach(s=>{Object.defineProperty(t,s+n,{value:function(r,i,o){return this[s].call(this,e,r,i,o)},configurable:!0})})}class Ft{constructor(e){e&&this.set(e)}set(e,n,s){const r=this;function i(c,d,h){const l=De(d);if(!l)throw new Error("header name must be a non-empty string");const u=f.findKey(r,l);(!u||r[u]===void 0||h===!0||h===void 0&&r[u]!==!1)&&(r[u||d]=bt(c))}const o=(c,d)=>f.forEach(c,(h,l)=>i(h,l,d));return f.isPlainObject(e)||e instanceof this.constructor?o(e,n):f.isString(e)&&(e=e.trim())&&!Gc(e)?o(Jc(e),n):e!=null&&i(n,e,s),this}get(e,n){if(e=De(e),e){const s=f.findKey(this,e);if(s){const r=this[s];if(!n)return r;if(n===!0)return Xc(r);if(f.isFunction(n))return n.call(this,r,s);if(f.isRegExp(n))return n.exec(r);throw new TypeError("parser must be boolean|regexp|function")}}}has(e,n){if(e=De(e),e){const s=f.findKey(this,e);return!!(s&&this[s]!==void 0&&(!n||Zt(this,this[s],s,n)))}return!1}delete(e,n){const s=this;let r=!1;function i(o){if(o=De(o),o){const c=f.findKey(s,o);c&&(!n||Zt(s,s[c],c,n))&&(delete s[c],r=!0)}}return f.isArray(e)?e.forEach(i):i(e),r}clear(e){const n=Object.keys(this);let s=n.length,r=!1;for(;s--;){const i=n[s];(!e||Zt(this,this[i],i,e,!0))&&(delete this[i],r=!0)}return r}normalize(e){const n=this,s={};return f.forEach(this,(r,i)=>{const o=f.findKey(s,i);if(o){n[o]=bt(r),delete n[i];return}const c=e?Qc(i):String(i).trim();c!==i&&delete n[i],n[c]=bt(r),s[c]=!0}),this}concat(...e){return this.constructor.concat(this,...e)}toJSON(e){const n=Object.create(null);return f.forEach(this,(s,r)=>{s!=null&&s!==!1&&(n[r]=e&&f.isArray(s)?s.join(", "):s)}),n}[Symbol.iterator](){return Object.entries(this.toJSON())[Symbol.iterator]()}toString(){return Object.entries(this.toJSON()).map(([e,n])=>e+": "+n).join(`
`)}get[Symbol.toStringTag](){return"AxiosHeaders"}static from(e){return e instanceof this?e:new this(e)}static concat(e,...n){const s=new this(e);return n.forEach(r=>s.set(r)),s}static accessor(e){const s=(this[$s]=this[$s]={accessors:{}}).accessors,r=this.prototype;function i(o){const c=De(o);s[c]||(Zc(r,o),s[c]=!0)}return f.isArray(e)?e.forEach(i):i(e),this}}Ft.accessor(["Content-Type","Content-Length","Accept","Accept-Encoding","User-Agent","Authorization"]);f.reduceDescriptors(Ft.prototype,({value:t},e)=>{let n=e[0].toUpperCase()+e.slice(1);return{get:()=>t,set(s){this[n]=s}}});f.freezeMethods(Ft);const he=Ft;function en(t,e){const n=this||Zn,s=e||n,r=he.from(s.headers);let i=s.data;return f.forEach(t,function(c){i=c.call(n,i,r.normalize(),e?e.status:void 0)}),r.normalize(),i}function ei(t){return!!(t&&t.__CANCEL__)}function nt(t,e,n){k.call(this,t??"canceled",k.ERR_CANCELED,e,n),this.name="CanceledError"}f.inherits(nt,k,{__CANCEL__:!0});function el(t,e,n){const s=n.config.validateStatus;!n.status||!s||s(n.status)?t(n):e(new k("Request failed with status code "+n.status,[k.ERR_BAD_REQUEST,k.ERR_BAD_RESPONSE][Math.floor(n.status/100)-4],n.config,n.request,n))}const tl=ie.hasStandardBrowserEnv?{write(t,e,n,s,r,i){const o=[t+"="+encodeURIComponent(e)];f.isNumber(n)&&o.push("expires="+new Date(n).toGMTString()),f.isString(s)&&o.push("path="+s),f.isString(r)&&o.push("domain="+r),i===!0&&o.push("secure"),document.cookie=o.join("; ")},read(t){const e=document.cookie.match(new RegExp("(^|;\\s*)("+t+")=([^;]*)"));return e?decodeURIComponent(e[3]):null},remove(t){this.write(t,"",Date.now()-864e5)}}:{write(){},read(){return null},remove(){}};function nl(t){return/^([a-z][a-z\d+\-.]*:)?\/\//i.test(t)}function sl(t,e){return e?t.replace(/\/+$/,"")+"/"+e.replace(/^\/+/,""):t}function ti(t,e){return t&&!nl(e)?sl(t,e):e}const rl=ie.hasStandardBrowserEnv?function(){const e=/(msie|trident)/i.test(navigator.userAgent),n=document.createElement("a");let s;function r(i){let o=i;return e&&(n.setAttribute("href",o),o=n.href),n.setAttribute("href",o),{href:n.href,protocol:n.protocol?n.protocol.replace(/:$/,""):"",host:n.host,search:n.search?n.search.replace(/^\?/,""):"",hash:n.hash?n.hash.replace(/^#/,""):"",hostname:n.hostname,port:n.port,pathname:n.pathname.charAt(0)==="/"?n.pathname:"/"+n.pathname}}return s=r(window.location.href),function(o){const c=f.isString(o)?r(o):o;return c.protocol===s.protocol&&c.host===s.host}}():function(){return function(){return!0}}();function il(t){const e=/^([-+\w]{1,25})(:?\/\/|:)/.exec(t);return e&&e[1]||""}function ol(t,e){t=t||10;const n=new Array(t),s=new Array(t);let r=0,i=0,o;return e=e!==void 0?e:1e3,function(d){const h=Date.now(),l=s[i];o||(o=h),n[r]=d,s[r]=h;let u=i,y=0;for(;u!==r;)y+=n[u++],u=u%t;if(r=(r+1)%t,r===i&&(i=(i+1)%t),h-o<e)return;const w=l&&h-l;return w?Math.round(y*1e3/w):void 0}}function qs(t,e){let n=0;const s=ol(50,250);return r=>{const i=r.loaded,o=r.lengthComputable?r.total:void 0,c=i-n,d=s(c),h=i<=o;n=i;const l={loaded:i,total:o,progress:o?i/o:void 0,bytes:c,rate:d||void 0,estimated:d&&o&&h?(o-i)/d:void 0,event:r};l[e?"download":"upload"]=!0,t(l)}}const al=typeof XMLHttpRequest<"u",cl=al&&function(t){return new Promise(function(n,s){let r=t.data;const i=he.from(t.headers).normalize();let{responseType:o,withXSRFToken:c}=t,d;function h(){t.cancelToken&&t.cancelToken.unsubscribe(d),t.signal&&t.signal.removeEventListener("abort",d)}let l;if(f.isFormData(r)){if(ie.hasStandardBrowserEnv||ie.hasStandardBrowserWebWorkerEnv)i.setContentType(!1);else if((l=i.getContentType())!==!1){const[p,...x]=l?l.split(";").map(v=>v.trim()).filter(Boolean):[];i.setContentType([p||"multipart/form-data",...x].join("; "))}}let u=new XMLHttpRequest;if(t.auth){const p=t.auth.username||"",x=t.auth.password?unescape(encodeURIComponent(t.auth.password)):"";i.set("Authorization","Basic "+btoa(p+":"+x))}const y=ti(t.baseURL,t.url);u.open(t.method.toUpperCase(),Xr(y,t.params,t.paramsSerializer),!0),u.timeout=t.timeout;function w(){if(!u)return;const p=he.from("getAllResponseHeaders"in u&&u.getAllResponseHeaders()),v={data:!o||o==="text"||o==="json"?u.responseText:u.response,status:u.status,statusText:u.statusText,headers:p,config:t,request:u};el(function(O){n(O),h()},function(O){s(O),h()},v),u=null}if("onloadend"in u?u.onloadend=w:u.onreadystatechange=function(){!u||u.readyState!==4||u.status===0&&!(u.responseURL&&u.responseURL.indexOf("file:")===0)||setTimeout(w)},u.onabort=function(){u&&(s(new k("Request aborted",k.ECONNABORTED,t,u)),u=null)},u.onerror=function(){s(new k("Network Error",k.ERR_NETWORK,t,u)),u=null},u.ontimeout=function(){let x=t.timeout?"timeout of "+t.timeout+"ms exceeded":"timeout exceeded";const v=t.transitional||Gr;t.timeoutErrorMessage&&(x=t.timeoutErrorMessage),s(new k(x,v.clarifyTimeoutError?k.ETIMEDOUT:k.ECONNABORTED,t,u)),u=null},ie.hasStandardBrowserEnv&&(c&&f.isFunction(c)&&(c=c(t)),c||c!==!1&&rl(y))){const p=t.xsrfHeaderName&&t.xsrfCookieName&&tl.read(t.xsrfCookieName);p&&i.set(t.xsrfHeaderName,p)}r===void 0&&i.setContentType(null),"setRequestHeader"in u&&f.forEach(i.toJSON(),function(x,v){u.setRequestHeader(v,x)}),f.isUndefined(t.withCredentials)||(u.withCredentials=!!t.withCredentials),o&&o!=="json"&&(u.responseType=t.responseType),typeof t.onDownloadProgress=="function"&&u.addEventListener("progress",qs(t.onDownloadProgress,!0)),typeof t.onUploadProgress=="function"&&u.upload&&u.upload.addEventListener("progress",qs(t.onUploadProgress)),(t.cancelToken||t.signal)&&(d=p=>{u&&(s(!p||p.type?new nt(null,t,u):p),u.abort(),u=null)},t.cancelToken&&t.cancelToken.subscribe(d),t.signal&&(t.signal.aborted?d():t.signal.addEventListener("abort",d)));const g=il(y);if(g&&ie.protocols.indexOf(g)===-1){s(new k("Unsupported protocol "+g+":",k.ERR_BAD_REQUEST,t));return}u.send(r||null)})},vn={http:Tc,xhr:cl};f.forEach(vn,(t,e)=>{if(t){try{Object.defineProperty(t,"name",{value:e})}catch{}Object.defineProperty(t,"adapterName",{value:e})}});const Hs=t=>`- ${t}`,ll=t=>f.isFunction(t)||t===null||t===!1,ni={getAdapter:t=>{t=f.isArray(t)?t:[t];const{length:e}=t;let n,s;const r={};for(let i=0;i<e;i++){n=t[i];let o;if(s=n,!ll(n)&&(s=vn[(o=String(n)).toLowerCase()],s===void 0))throw new k(`Unknown adapter '${o}'`);if(s)break;r[o||"#"+i]=s}if(!s){const i=Object.entries(r).map(([c,d])=>`adapter ${c} `+(d===!1?"is not supported by the environment":"is not available in the build"));let o=e?i.length>1?`since :
`+i.map(Hs).join(`
`):" "+Hs(i[0]):"as no adapter specified";throw new k("There is no suitable adapter to dispatch the request "+o,"ERR_NOT_SUPPORT")}return s},adapters:vn};function tn(t){if(t.cancelToken&&t.cancelToken.throwIfRequested(),t.signal&&t.signal.aborted)throw new nt(null,t)}function zs(t){return tn(t),t.headers=he.from(t.headers),t.data=en.call(t,t.transformRequest),["post","put","patch"].indexOf(t.method)!==-1&&t.headers.setContentType("application/x-www-form-urlencoded",!1),ni.getAdapter(t.adapter||Zn.adapter)(t).then(function(s){return tn(t),s.data=en.call(t,t.transformResponse,s),s.headers=he.from(s.headers),s},function(s){return ei(s)||(tn(t),s&&s.response&&(s.response.data=en.call(t,t.transformResponse,s.response),s.response.headers=he.from(s.response.headers))),Promise.reject(s)})}const Ws=t=>t instanceof he?t.toJSON():t;function Ne(t,e){e=e||{};const n={};function s(h,l,u){return f.isPlainObject(h)&&f.isPlainObject(l)?f.merge.call({caseless:u},h,l):f.isPlainObject(l)?f.merge({},l):f.isArray(l)?l.slice():l}function r(h,l,u){if(f.isUndefined(l)){if(!f.isUndefined(h))return s(void 0,h,u)}else return s(h,l,u)}function i(h,l){if(!f.isUndefined(l))return s(void 0,l)}function o(h,l){if(f.isUndefined(l)){if(!f.isUndefined(h))return s(void 0,h)}else return s(void 0,l)}function c(h,l,u){if(u in e)return s(h,l);if(u in t)return s(void 0,h)}const d={url:i,method:i,data:i,baseURL:o,transformRequest:o,transformResponse:o,paramsSerializer:o,timeout:o,timeoutMessage:o,withCredentials:o,withXSRFToken:o,adapter:o,responseType:o,xsrfCookieName:o,xsrfHeaderName:o,onUploadProgress:o,onDownloadProgress:o,decompress:o,maxContentLength:o,maxBodyLength:o,beforeRedirect:o,transport:o,httpAgent:o,httpsAgent:o,cancelToken:o,socketPath:o,responseEncoding:o,validateStatus:c,headers:(h,l)=>r(Ws(h),Ws(l),!0)};return f.forEach(Object.keys(Object.assign({},t,e)),function(l){const u=d[l]||r,y=u(t[l],e[l],l);f.isUndefined(y)&&u!==c||(n[l]=y)}),n}const si="1.6.2",es={};["object","boolean","number","function","string","symbol"].forEach((t,e)=>{es[t]=function(s){return typeof s===t||"a"+(e<1?"n ":" ")+t}});const Vs={};es.transitional=function(e,n,s){function r(i,o){return"[Axios v"+si+"] Transitional option '"+i+"'"+o+(s?". "+s:"")}return(i,o,c)=>{if(e===!1)throw new k(r(o," has been removed"+(n?" in "+n:"")),k.ERR_DEPRECATED);return n&&!Vs[o]&&(Vs[o]=!0,console.warn(r(o," has been deprecated since v"+n+" and will be removed in the near future"))),e?e(i,o,c):!0}};function dl(t,e,n){if(typeof t!="object")throw new k("options must be an object",k.ERR_BAD_OPTION_VALUE);const s=Object.keys(t);let r=s.length;for(;r-- >0;){const i=s[r],o=e[i];if(o){const c=t[i],d=c===void 0||o(c,i,t);if(d!==!0)throw new k("option "+i+" must be "+d,k.ERR_BAD_OPTION_VALUE);continue}if(n!==!0)throw new k("Unknown option "+i,k.ERR_BAD_OPTION)}}const Cn={assertOptions:dl,validators:es},fe=Cn.validators;class At{constructor(e){this.defaults=e,this.interceptors={request:new Us,response:new Us}}request(e,n){typeof e=="string"?(n=n||{},n.url=e):n=e||{},n=Ne(this.defaults,n);const{transitional:s,paramsSerializer:r,headers:i}=n;s!==void 0&&Cn.assertOptions(s,{silentJSONParsing:fe.transitional(fe.boolean),forcedJSONParsing:fe.transitional(fe.boolean),clarifyTimeoutError:fe.transitional(fe.boolean)},!1),r!=null&&(f.isFunction(r)?n.paramsSerializer={serialize:r}:Cn.assertOptions(r,{encode:fe.function,serialize:fe.function},!0)),n.method=(n.method||this.defaults.method||"get").toLowerCase();let o=i&&f.merge(i.common,i[n.method]);i&&f.forEach(["delete","get","head","post","put","patch","common"],g=>{delete i[g]}),n.headers=he.concat(o,i);const c=[];let d=!0;this.interceptors.request.forEach(function(p){typeof p.runWhen=="function"&&p.runWhen(n)===!1||(d=d&&p.synchronous,c.unshift(p.fulfilled,p.rejected))});const h=[];this.interceptors.response.forEach(function(p){h.push(p.fulfilled,p.rejected)});let l,u=0,y;if(!d){const g=[zs.bind(this),void 0];for(g.unshift.apply(g,c),g.push.apply(g,h),y=g.length,l=Promise.resolve(n);u<y;)l=l.then(g[u++],g[u++]);return l}y=c.length;let w=n;for(u=0;u<y;){const g=c[u++],p=c[u++];try{w=g(w)}catch(x){p.call(this,x);break}}try{l=zs.call(this,w)}catch(g){return Promise.reject(g)}for(u=0,y=h.length;u<y;)l=l.then(h[u++],h[u++]);return l}getUri(e){e=Ne(this.defaults,e);const n=ti(e.baseURL,e.url);return Xr(n,e.params,e.paramsSerializer)}}f.forEach(["delete","get","head","options"],function(e){At.prototype[e]=function(n,s){return this.request(Ne(s||{},{method:e,url:n,data:(s||{}).data}))}});f.forEach(["post","put","patch"],function(e){function n(s){return function(i,o,c){return this.request(Ne(c||{},{method:e,headers:s?{"Content-Type":"multipart/form-data"}:{},url:i,data:o}))}}At.prototype[e]=n(),At.prototype[e+"Form"]=n(!0)});const xt=At;class ts{constructor(e){if(typeof e!="function")throw new TypeError("executor must be a function.");let n;this.promise=new Promise(function(i){n=i});const s=this;this.promise.then(r=>{if(!s._listeners)return;let i=s._listeners.length;for(;i-- >0;)s._listeners[i](r);s._listeners=null}),this.promise.then=r=>{let i;const o=new Promise(c=>{s.subscribe(c),i=c}).then(r);return o.cancel=function(){s.unsubscribe(i)},o},e(function(i,o,c){s.reason||(s.reason=new nt(i,o,c),n(s.reason))})}throwIfRequested(){if(this.reason)throw this.reason}subscribe(e){if(this.reason){e(this.reason);return}this._listeners?this._listeners.push(e):this._listeners=[e]}unsubscribe(e){if(!this._listeners)return;const n=this._listeners.indexOf(e);n!==-1&&this._listeners.splice(n,1)}static source(){let e;return{token:new ts(function(r){e=r}),cancel:e}}}const ul=ts;function hl(t){return function(n){return t.apply(null,n)}}function fl(t){return f.isObject(t)&&t.isAxiosError===!0}const En={Continue:100,SwitchingProtocols:101,Processing:102,EarlyHints:103,Ok:200,Created:201,Accepted:202,NonAuthoritativeInformation:203,NoContent:204,ResetContent:205,PartialContent:206,MultiStatus:207,AlreadyReported:208,ImUsed:226,MultipleChoices:300,MovedPermanently:301,Found:302,SeeOther:303,NotModified:304,UseProxy:305,Unused:306,TemporaryRedirect:307,PermanentRedirect:308,BadRequest:400,Unauthorized:401,PaymentRequired:402,Forbidden:403,NotFound:404,MethodNotAllowed:405,NotAcceptable:406,ProxyAuthenticationRequired:407,RequestTimeout:408,Conflict:409,Gone:410,LengthRequired:411,PreconditionFailed:412,PayloadTooLarge:413,UriTooLong:414,UnsupportedMediaType:415,RangeNotSatisfiable:416,ExpectationFailed:417,ImATeapot:418,MisdirectedRequest:421,UnprocessableEntity:422,Locked:423,FailedDependency:424,TooEarly:425,UpgradeRequired:426,PreconditionRequired:428,TooManyRequests:429,RequestHeaderFieldsTooLarge:431,UnavailableForLegalReasons:451,InternalServerError:500,NotImplemented:501,BadGateway:502,ServiceUnavailable:503,GatewayTimeout:504,HttpVersionNotSupported:505,VariantAlsoNegotiates:506,InsufficientStorage:507,LoopDetected:508,NotExtended:510,NetworkAuthenticationRequired:511};Object.entries(En).forEach(([t,e])=>{En[e]=t});const ml=En;function ri(t){const e=new xt(t),n=Br(xt.prototype.request,e);return f.extend(n,xt.prototype,e,{allOwnKeys:!0}),f.extend(n,e,null,{allOwnKeys:!0}),n.create=function(r){return ri(Ne(t,r))},n}const I=ri(Zn);I.Axios=xt;I.CanceledError=nt;I.CancelToken=ul;I.isCancel=ei;I.VERSION=si;I.toFormData=Bt;I.AxiosError=k;I.Cancel=I.CanceledError;I.all=function(e){return Promise.all(e)};I.spread=hl;I.isAxiosError=fl;I.mergeConfig=Ne;I.AxiosHeaders=he;I.formToJSON=t=>Zr(f.isHTMLForm(t)?new FormData(t):t);I.getAdapter=ni.getAdapter;I.HttpStatusCode=ml;I.default=I;const pl=I;function be(t,e){return t+" { "+e+" }"}function $(t,e){return t+" {"+e.join(" ")+"}"}async function xe(t){const{data:e}=await pl.request({url:"/graphql",method:"POST",data:{query:t}});return e}function gl(){return xe(be("query",$("allMusics",["id","name","filePath","codec","duration","playCount","trackNumber","isLiked","isHated","createdAt",$("artist",["id","name"]),$("album",["id","name","cover","publishedYear"])])))}function yl(){return xe(be("query",$("allArtists",["id","name","createdAt","albumCount","musicCount",$("latestAlbum",["cover"])])))}function bl(t){return xe(be("query",$(`artist(id: "${t}")`,["id","name","albumCount","musicCount","createdAt",$("latestAlbum",["cover"]),$("albums",["id","name","cover","publishedYear"]),$("musics",["id"])])))}function xl(){return xe(be("query",$("allAlbums",["id","name","cover","publishedYear","createdAt",$("artist",["id","name"])])))}function wl(t){return xe(be("query",$(`album(id: "${t}")`,["id","name","cover","publishedYear",$("artist",["id","name"]),$("musics",["id"])])))}function vl(){return xe(be("query",$("allPlaylist",["id","name","musicCount","createdAt","updatedAt",$("headerMusics",["id"])])))}function Cl(t){return xe(be("query",$(`playlist(id: "${t}")`,["id","name","musicCount","createdAt","updatedAt",$("musics",["id"])])))}const T={NAME:"name",NAME_DESC:"nameDesc",ARTIST_NAME:"artist",ARTIST_NAME_DESC:"artistDesc",ALBUM_NAME:"album",ALBUM_NAME_DESC:"albumDesc",PLAY_COUNT:"playCount",PLAY_COUNT_DESC:"playCountDesc",CREATED_AT:"createdAt",CREATED_AT_DESC:"createdAtDesc"};class El extends ye{constructor(){super();W(this,"init",!1);W(this,"listener");this.state={loaded:!1,sortedFrom:T.PLAY_COUNT_DESC,musics:[],musicMap:new Map},this.listener=new Ae,this.listener.connect({onLike:({id:n,isLiked:s})=>{this.set({musics:this.state.musics.map(r=>(r.id===n&&(r.isLiked=s),r))})},onHate:({id:n,isHated:s})=>{this.set({musics:this.state.musics.map(r=>(r.id===n&&(r.isHated=s),r))})},onCount:({id:n,playCount:s})=>{this.set(r=>{let i=r.musics.map(o=>(o.id===n&&(o.playCount=s),o));return r.sortedFrom===T.PLAY_COUNT_DESC?i=dt(i):r.sortedFrom===T.PLAY_COUNT&&(i=dt(i).reverse()),{musics:i}})}})}get state(){return this.init||(this.init=!0,this.sync()),super.state}set state(n){super.state=n}async sync(){gl().then(({data:n})=>{this.set({loaded:!0,musics:n.allMusics,musicMap:new Map(n.allMusics.map(s=>[s.id,s])),sortedFrom:T.PLAY_COUNT_DESC})})}get sortItems(){return[{text:"Name (A-Z)",isActive:this.state.sortedFrom===T.NAME,onClick:()=>{this.set(n=>({musics:_e(n.musics),sortedFrom:T.NAME}))}},{text:"Name (Z-A)",isActive:this.state.sortedFrom===T.NAME_DESC,onClick:()=>{this.set(n=>({musics:_e(n.musics).reverse(),sortedFrom:T.NAME_DESC}))}},{text:"Artist Name (A to Z)",isActive:this.state.sortedFrom===T.ARTIST_NAME,onClick:()=>{this.set(n=>({musics:kt(n.musics),sortedFrom:T.ARTIST_NAME}))}},{text:"Artist Name (Z to A)",isActive:this.state.sortedFrom===T.ARTIST_NAME_DESC,onClick:()=>{this.set(n=>({musics:kt(n.musics).reverse(),sortedFrom:T.ARTIST_NAME_DESC}))}},{text:"Album Name (A to Z)",isActive:this.state.sortedFrom===T.ALBUM_NAME,onClick:()=>{this.set(n=>({musics:Ts(n.musics),sortedFrom:T.ALBUM_NAME}))}},{text:"Album Name (Z to A)",isActive:this.state.sortedFrom===T.ALBUM_NAME_DESC,onClick:()=>{this.set(n=>({musics:Ts(n.musics).reverse(),sortedFrom:T.ALBUM_NAME_DESC}))}},{text:"Play Count (High to Low)",isActive:this.state.sortedFrom===T.PLAY_COUNT_DESC,onClick:()=>{this.set(n=>({musics:dt(n.musics),sortedFrom:T.PLAY_COUNT_DESC}))}},{text:"Play Count (Low to High)",isActive:this.state.sortedFrom===T.PLAY_COUNT,onClick:()=>{this.set(n=>({musics:dt(n.musics).reverse(),sortedFrom:T.PLAY_COUNT}))}},{text:"Date Added (New to Old)",isActive:this.state.sortedFrom===T.CREATED_AT_DESC,onClick:()=>{this.set(n=>({musics:Se(n.musics),sortedFrom:T.CREATED_AT_DESC}))}},{text:"Date Added (Old to New)",isActive:this.state.sortedFrom===T.CREATED_AT,onClick:()=>{this.set(n=>({musics:Se(n.musics).reverse(),sortedFrom:T.CREATED_AT}))}}]}}const z=new El,Ie=t=>JSON.stringify(t);class kl{constructor({onPlay:e,onPause:n,onStop:s,onEnded:r,onTimeUpdate:i,onSkipToNext:o,onSkipToPrevious:c}){window.AppChannel.receiveMessage=d=>{d.actionType==="play"&&(e==null||e()),d.actionType==="pause"&&(n==null||n()),d.actionType==="stop"&&(s==null||s()),d.actionType==="skipToNext"&&(o==null||o()),d.actionType==="skipToPrevious"&&(c==null||c()),d.actionType==="end"&&r(),d.actionType==="setPosition"&&i(aa(d.position))}}load(e){window.AppChannel.postMessage(Ie({actionType:"setMediaItem",mediaItem:{id:location.origin+"/api/audio/"+e.id,album:e.album.name,title:e.name,artist:e.artist.name,duration:ws(e.duration),artUri:location.origin+Ke(e.album.cover)}}))}play(){window.AppChannel.postMessage(Ie({actionType:"play"}))}pause(){window.AppChannel.postMessage(Ie({actionType:"pause"}))}stop(){window.AppChannel.postMessage(Ie({actionType:"stop"}))}seek(e){window.AppChannel.postMessage(Ie({actionType:"setPosition",position:ws(e)}))}download(){q.toast("Not supported yet.")}}class Al{constructor({onPlay:e,onPause:n,onStop:s,onEnded:r,onTimeUpdate:i}){W(this,"audio");this.audio=new Audio,this.audio.addEventListener("play",()=>{e==null||e()}),this.audio.addEventListener("pause",()=>{n==null||n()}),this.audio.addEventListener("abort",()=>{s==null||s()}),this.audio.addEventListener("ended",()=>{r()}),this.audio.addEventListener("timeupdate",()=>{i(this.audio.currentTime)})}load(e){const n="/api/audio/"+e.id;this.audio.pause(),this.audio.src=n,this.audio.currentTime=0,this.audio.load()}play(){this.audio.play()}pause(){this.audio.pause()}stop(){this.audio.pause(),this.audio.currentTime=0}seek(e){this.audio.currentTime=e}download(e){const n="/api/audio/"+e.id,s=document.createElement("a");s.href=n,s.download=e.filePath.split("/").pop(),s.click()}}const _l=t=>{const e=[...t];for(let n=e.length-1;n>0;n--){const s=Math.floor(Math.random()*(n+1));[e[n],e[s]]=[e[s],e[n]]}return e};let nn=null;const sn=t=>z.state.musicMap.get(t);class Sl extends ye{constructor(){super();W(this,"shouldCount",!1);W(this,"audioChannel");this.state={selected:null,isPlaying:!1,shuffle:!1,insertMode:"last",repeatMode:"none",playMode:"later",currentTime:0,progress:0,items:[],sourceItems:[]};const n={onPlay:()=>{this.set({isPlaying:!0})},onPause:()=>{this.set({isPlaying:!1})},onStop:()=>{this.set({isPlaying:!1})},onEnded:()=>{if(this.state.selected!==null){if(this.state.repeatMode==="one"){this.select(this.state.selected);return}if(this.state.repeatMode==="all"){this.select((this.state.selected+1)%this.state.items.length),this.audioChannel.play();return}this.state.repeatMode==="none"&&(this.state.selected+1<this.state.items.length?(this.select(this.state.selected+1),this.audioChannel.play()):(this.audioChannel.stop(),this.set({isPlaying:!1})))}},onTimeUpdate:r=>{const i=sn(this.state.items[this.state.selected]),o=Number((r/((i==null?void 0:i.duration)||1)*100).toFixed(2));!this.shouldCount&&Math.floor(o)>=0&&Math.floor(o)<10&&(this.shouldCount=!0),this.shouldCount&&Math.floor(o)>=80&&Math.floor(o)<90&&(this.shouldCount=!1,Ae.count(this.state.items[this.state.selected])),this.set({currentTime:r,progress:o})},onSkipToNext:()=>{this.next()},onSkipToPrevious:()=>{this.prev()}};this.audioChannel=window.AppChannel?new kl(n):new Al(n);const s=z.subscribe(async({loaded:r})=>{if(r){const i=localStorage.getItem("queue");if(i){const o=JSON.parse(i);await this.set(o),this.select(o.selected||0,!1)}z.unsubscribe(s)}});window.addEventListener("beforeunload",()=>{this.audioChannel.stop()})}async reset(n){this.state.items.length>0&&!await q.confirm("Are you sure to reset queue?")||(await this.set({items:n,sourceItems:[],shuffle:!1,selected:null,currentTime:0,progress:0,isPlaying:!1}),this.select(0))}async add(n){if(this.state.items.includes(n)){if(this.state.playMode==="immediately"){this.select(this.state.items.indexOf(n));return}q.toast("Already added to queue");return}if(this.state.shuffle&&this.set({sourceItems:[...this.state.items,n]}),this.state.insertMode==="first"&&this.set({items:[n,...this.state.items]}),this.state.insertMode==="last"&&this.set({items:[...this.state.items,n]}),this.state.insertMode==="after"&&(this.state.selected===null?this.set({items:[...this.state.items,n]}):this.set({items:[...this.state.items.slice(0,this.state.selected+1),n,...this.state.items.slice(this.state.selected+1)]})),q.toast("Added to queue"),this.state.playMode==="immediately"){this.select(this.state.items.indexOf(n));return}this.state.selected===null&&this.select(0)}async removeItems(n){const s=this.state.items.filter(c=>!n.includes(c)),r=this.state.sourceItems.filter(c=>!n.includes(c)),i=this.state.selected,o=s.length>0?this.state.items[i||0]:null;if(await this.set({items:s,sourceItems:r}),s.length===0){this.audioChannel.stop(),this.set({selected:null,currentTime:0,progress:0,isPlaying:!1});return}if(o){if(!n.includes(o)){this.set({selected:s.indexOf(o)});return}if(n.includes(o)){if(this.state.items.length>=i){this.select(i);return}if(this.state.items.length<i){this.select(this.state.items.length-1);return}}}}select(n,s=!0){this.set({selected:n,progress:0,currentTime:0,isPlaying:s});const r=sn(this.state.items[n]);r!==void 0&&(document.title=`${r.name} - ${r.artist.name}`,this.audioChannel.load(r),s&&this.audioChannel.play())}play(){this.state.selected!==null&&this.audioChannel.play()}pause(){this.audioChannel.pause()}stop(){this.audioChannel.stop()}seek(n){this.audioChannel.seek(n)}setPlayMode(n){this.set({playMode:n})}setInsertMode(n){this.set({insertMode:n})}changeRepeatMode(){const n=["none","all","one"],s=n.indexOf(this.state.repeatMode),r=n[(s+1)%n.length];this.set({repeatMode:r})}toggleShuffle(){const n=this.state.items[this.state.selected];if(this.state.shuffle){this.set({shuffle:!1,selected:this.state.sourceItems.indexOf(n),items:[...this.state.sourceItems],sourceItems:[]});return}const s=_l([...this.state.items]).filter(r=>r!==n);s.unshift(n),this.set({shuffle:!0,selected:0,items:s,sourceItems:[...this.state.items]})}next(){this.state.selected!==null&&(this.select((this.state.selected+1)%this.state.items.length),this.audioChannel.play())}prev(){if(this.state.selected!==null){if(this.state.currentTime>10){this.audioChannel.seek(0);return}this.select((this.state.selected-1+this.state.items.length)%this.state.items.length),this.audioChannel.play()}}download(n){this.audioChannel.download(sn(n))}afterStateChange(){nn||(nn=setTimeout(()=>{localStorage.setItem("queue",JSON.stringify({...this.state,isPlaying:!1,currentTime:0,progress:0})),nn=null},3e3))}}const E=new Sl;function we({id:t,onArtistClick:e,onAlbumClick:n}){const[{musicMap:s}]=L(z),r=s.get(t);return r?a.jsx(Ut,{header:a.jsxs(a.Fragment,{children:[n&&a.jsxs("button",{className:"panel-album clickable linkable",onClick:()=>{R.close(),setTimeout(n,100)},children:[a.jsx(pe,{className:"cover",src:r.album.cover,alt:r.album.name}),a.jsxs("div",{children:[a.jsx("div",{className:"panel-sub-title",children:"Album"}),a.jsx("div",{className:"panel-sub-content",children:r.album.name})]})]}),e&&a.jsx("button",{className:"panel-artist clickable linkable",onClick:()=>{R.close(),setTimeout(e,100)},children:a.jsxs("div",{children:[a.jsx("div",{className:"panel-sub-title",children:"Artist"}),a.jsx("div",{className:"panel-sub-content",children:r.artist.name})]})})]}),items:[{icon:a.jsx(mr,{}),text:"Like",isActive:r.isLiked,onClick:()=>Ae.like(r.id,!r.isLiked)},{icon:a.jsx(G,{}),text:"Add to Queue",onClick:()=>E.add(r.id)},{icon:a.jsx(Fn,{}),text:"Add to Playlist",onClick:()=>{R.close(),R.open({title:"Add to Playlist",content:a.jsx(ss,{onClick:i=>{ce.addMusic(i,[r.id]),q.toast("Added to playlist")}})})}},{icon:a.jsx(Jo,{}),text:"Download",onClick:()=>{E.download(r.id),R.close()}},{icon:a.jsx(fr,{}),text:r.isHated?"Show again this music":"Hide this music",onClick:()=>Ae.hate(r.id)}],footer:a.jsxs(a.Fragment,{children:[a.jsxs("span",{children:["listen: ",r.playCount," times"]})," /",a.jsxs("span",{children:["duration: ",hn(r.duration)]})," /",a.jsxs("span",{children:["codec: ",r.codec]})]})}):null}const Nl=A.button`
    color: #eee;
    font-size: 0.8rem;
    cursor: pointer;
    padding: 1rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.75rem;
    width: 100%;

    &.hated {
        opacity: 0.5;
    }

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
`;function ve({albumName:t,albumCover:e,artistName:n,trackNumber:s,musicName:r,musicCodec:i,isLiked:o,isHated:c,isPlaying:d,onClick:h,onLongPress:l}){return a.jsxs(Nl,{className:`clickable ${c?"hated":""} ${d?"playing":""}`,onClick:h,onContextMenu:u=>{u.preventDefault(),l==null||l()},hasAlbumCover:typeof e=="string",hasLongPress:typeof l=="function",children:[typeof e=="string"&&a.jsx(pe,{className:"album-art",src:e,alt:t}),a.jsxs("div",{className:"row",children:[a.jsxs("div",{className:"info",children:[a.jsxs("div",{className:"title",children:[!!s&&a.jsxs("span",{className:"track-number",children:[s,"."]}),r,i&&i.toLocaleLowerCase()==="flac"&&a.jsx("span",{className:"codec",children:i})]}),a.jsx("div",{className:"artist",children:n})]}),l&&a.jsx("button",{className:`icon-button ${o?"liked":""}`,onClick:u=>{u.stopPropagation(),l==null||l()},children:o?a.jsx(mr,{}):a.jsx(yr,{})})]})]})}const jl=A.div`
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
`;function Ol(){const t=ne(),[e]=L(E),[{musicMap:n}]=L(z),s=e.selected!==null?n.get(e.items[e.selected]):null,r=o=>{const{width:c,left:d,right:h}=o.currentTarget.getBoundingClientRect();let l=o.touches?o.touches[0].clientX:o.clientX;l=l<d?d:l>h?h:l;const u=(l-d)/c,y=(s==null?void 0:s.duration)||1;E.seek(y*u)},i=o=>{var c;if(o.buttons===1){r(o);return}((c=o.touches)==null?void 0:c.length)===1&&r(o)};return a.jsxs(jl,{children:[a.jsx("div",{className:"progress",role:"progressbar","aria-valuenow":e.progress,"aria-valuemin":0,"aria-valuemax":100,onClick:r,onMouseMove:i,onTouchMove:i,children:a.jsx("div",{className:"bar",style:{transform:`translate(-${100-e.progress}%, 0)`}})}),a.jsxs("div",{className:"player",children:[a.jsx("div",{className:"music",children:a.jsx(ve,{albumName:(s==null?void 0:s.album.name)??"",albumCover:(s==null?void 0:s.album.cover)??"",musicName:(s==null?void 0:s.name)??"No music",artistName:(s==null?void 0:s.artist.name)??"",onClick:()=>s&&t("/player")})}),a.jsxs("div",{className:"action",children:[a.jsxs("button",{className:"icon-button mode",onClick:()=>E.changeRepeatMode(),children:[e.repeatMode==="all"&&a.jsx(xr,{}),e.repeatMode==="one"&&a.jsx(pr,{}),e.repeatMode==="none"&&a.jsx(wr,{})]}),a.jsx("button",{className:"icon-button skip-back",onClick:()=>E.prev(),children:a.jsx(G,{})}),a.jsx("button",{className:"icon-button play",onClick:()=>e.isPlaying?E.pause():E.play(),children:e.isPlaying?a.jsx(br,{}):a.jsx(G,{})}),a.jsx("button",{className:"icon-button skip-forward",onClick:()=>E.next(),children:a.jsx(G,{})}),a.jsx("button",{className:`icon-button shuffle ${e.shuffle?"active":""}`,onClick:()=>E.toggleShuffle(),children:a.jsx(vr,{})}),a.jsx("button",{className:"icon-button queue",onClick:()=>t("/queue"),children:a.jsx(Ze,{})})]})]})]})}const Ys=A.button`
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
`;function ii({active:t,label:e,onClick:n,onSelectAll:s}){return a.jsxs(a.Fragment,{children:[a.jsxs(Ys,{className:`clickable ${t?"active":""}`,onClick:n,children:[a.jsx(Bn,{}),e]}),t&&a.jsxs(Ys,{className:"clickable",onClick:s,children:[a.jsx(Ko,{}),"Select All"]})]})}const Rl=A.div`
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
`;function Ut({header:t,items:e,footer:n}){return a.jsxs(Rl,{children:[t&&a.jsx("div",{className:"panel-content",children:t}),e&&a.jsx("div",{className:"items",children:e.map(({icon:s,text:r,isActive:i,onClick:o})=>a.jsxs("button",{className:`clickable item ${i?"active":""}`,onClick:o,children:[s,a.jsx("span",{className:"text",children:r})]},r))}),n&&a.jsx("div",{className:"detail-info",children:n})]})}function Tl({children:t}){const[{isOpen:e,title:n,content:s},r]=L(R);return a.jsxs(a.Fragment,{children:[t,a.jsx(Vo,{title:n,isOpen:e,onClose:()=>r({isOpen:!1}),children:s})]})}class Ll extends ye{constructor(){super();W(this,"init",!1);W(this,"listener");this.state={loaded:!1,playlists:[]},this.listener=new ce,this.listener.connect({onCreate:n=>{this.set({playlists:[n,...this.state.playlists]})},onDelete:n=>{this.set({playlists:this.state.playlists.filter(s=>s.id!==n)})},onUpdate:({id:n,name:s})=>{this.set({playlists:this.state.playlists.map(r=>r.id===n?{...r,name:s}:r)})},onChangeOrder:n=>{this.set({playlists:this.state.playlists.sort((s,r)=>n.indexOf(s.id)-n.indexOf(r.id))})},onAddMusic:({id:n,musicCount:s,headerMusics:r})=>{this.set({playlists:this.state.playlists.map(i=>i.id===n?{...i,musicCount:s,headerMusics:r}:i)})},onMoveMusic:({fromId:n,formHeaderMusics:s,toId:r,toMusicCount:i,toHeaderMusics:o,musicIds:c})=>{this.set({playlists:this.state.playlists.map(d=>d.id===n?{...d,headerMusics:s,musicCount:d.musicCount-c.length}:d.id===r?{...d,musicCount:i,headerMusics:o}:d)})},onRemoveMusic:({id:n,headerMusics:s,musicIds:r})=>{this.set({playlists:this.state.playlists.map(i=>i.id===n?{...i,headerMusics:s,musicCount:i.musicCount-r.length}:i)})},onChangeMusicOrder:({id:n,headerMusics:s})=>{this.set({playlists:this.state.playlists.map(r=>r.id===n?{...r,headerMusics:s}:r)})}})}get state(){return this.init||(this.init=!0,this.sync()),super.state}set state(n){super.state=n}async sync(){vl().then(({data:n})=>{this.set({loaded:!0,playlists:n.allPlaylist})})}}const ns=new Ll;function Pl({id:t,onPlaylistClick:e}){const[{musicMap:n}]=L(z),[{playlists:s}]=L(ns),r=s.find(i=>i.id===t);return r?a.jsx(Ut,{header:e&&a.jsxs("button",{className:"panel-album clickable linkable",onClick:()=>{R.close(),setTimeout(e,100)},children:[a.jsx(In,{className:"album-cover-grid",images:r.headerMusics.map(i=>{var o;return((o=n.get(i.id))==null?void 0:o.album.cover)??""})}),a.jsxs("div",{children:[a.jsxs("div",{className:"panel-sub-title",children:[r.musicCount," songs"]}),a.jsx("div",{className:"panel-sub-content",children:r.name})]})]}),items:[{icon:a.jsx(Xo,{}),text:"Rename",onClick:async()=>{const i=await q.prompt("Rename playlist",r.name);i&&ce.update(t,i),R.close()}},{icon:a.jsx(Un,{}),text:"Delete",onClick:async()=>{await q.confirm("Are you sure you want to delete this playlist?")&&(ce.delete(t),R.close())}}]}):null}const Ml=A.button`
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
`;function oi({name:t,headerMusics:e,musicCount:n,onClick:s,onLongPress:r}){const[{musicMap:i}]=L(z);return a.jsxs(Ml,{className:"clickable",onClick:s,onContextMenu:o=>{o.preventDefault(),r==null||r()},children:[a.jsx(In,{className:"cover",images:e.map(o=>{var c;return((c=i.get(o.id))==null?void 0:c.album.cover)??""})}),a.jsxs("div",{className:"title",children:[a.jsx("div",{className:"album-name",children:t}),a.jsxs("div",{className:"song-count",children:[n," songs"]})]}),r&&a.jsx("button",{className:"icon-button",onClick:o=>{o.stopPropagation(),r()},children:a.jsx(yr,{})})]})}function ss({onClick:t}){const[{playlists:e}]=L(ns);return a.jsx(Ut,{footer:a.jsx(a.Fragment,{children:e.map(n=>a.jsx(oi,{...n,onClick:()=>{t(n.id),R.close()}},n.id))})})}A.button`
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
`;const P=A.button`
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
`,Dl=A.div`
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
        border: 1px solid #333;
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
        border: 1px solid #333;
        border-radius: 8px;
        border-top: none;
        border-top-left-radius: 0;
        border-top-right-radius: 0;
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
            border-bottom-left-radius: 0;
            border-bottom-right-radius: 0;
        }

        .options {
            display: block;
            animation: slide-down 0.1s ease;
        }
    }
`;function Ks({selected:t,options:e,onChange:n}){const s=m.useRef(null),[r,i]=m.useState(!1);return m.useEffect(()=>{function o(c){s.current&&!s.current.contains(c.target)&&i(!1)}return document.addEventListener("mousedown",o),()=>{document.removeEventListener("mousedown",o)}},[s]),a.jsxs(Dl,{ref:s,className:`${r?"open":""}`,children:[a.jsxs("div",{className:"selected",onClick:()=>i(!r),children:[a.jsx(Ze,{}),t?a.jsx("div",{children:t.label}):a.jsx("div",{children:"Select an option"})]}),a.jsx("div",{className:"options",children:e.map(o=>a.jsx("div",{onClick:()=>{n(o.value),i(!1)},children:o.label},o.value))})]})}const Il=[{name:"Music",path:"/"},{name:"Favorite",path:"/favorite"},{name:"Album",path:"/album"},{name:"Artist",path:"/artist"},{name:"Playlist",path:"/playlist"},{name:"Setting",path:"/setting"}],Bl=A.header`
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
`,Fl=A.nav`
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
`,Ul=A.a`
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
`;function $l(){const t=hi(),e=m.useRef(null);return m.useEffect(()=>{const n=e.current;if(n){const s=n.querySelector("a.active");if(s){const{left:r,width:i}=s.getBoundingClientRect(),{width:o}=e.current.getBoundingClientRect(),c=r+i/2-o/2;e.current.scrollBy({left:c,behavior:"smooth"})}}},[t.pathname]),a.jsx(Bl,{children:a.jsx(Fl,{ref:e,children:a.jsx("ul",{children:Il.map(n=>a.jsx("li",{children:a.jsx(Ul,{as:Qs,to:n.path,className:t.pathname===n.path?"active":"",children:n.name})},n.name))})})})}const ql=A.div`
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
`;function Hl(){return a.jsx(ql,{children:a.jsxs("button",{onClick:()=>history.back(),children:[a.jsx(gr,{})," ",a.jsx("span",{className:"back-text",children:"Back"})]})})}function Js({isSubPage:t,disablePlayer:e=!1,animationDirection:n="None"}){const[s,r]=Xe(),i=m.useRef(null),o=m.useRef(!0),c={in:{opacity:1,x:0,y:0},out:{opacity:0,x:n==="RightToLeft"?50:0,y:n==="BottomToTop"?50:0}};return m.useEffect(()=>(i.current&&o.current&&(i.current.scrollTop=parseInt(s.get("py")||"0"),o.current=!1),()=>{o.current=!0}),[i,o,location.pathname]),m.useEffect(()=>{if(!i.current)return;let d=null;const h=()=>{d&&clearTimeout(d),d=setTimeout(()=>{var l;s.set("py",((l=i.current)==null?void 0:l.scrollTop.toString())||"0"),r(s,{replace:!0})},50)};return i.current.addEventListener("scroll",h),()=>{var l;d&&clearTimeout(d),(l=i.current)==null||l.removeEventListener("scroll",h)}},[location.pathname,i,s,r]),a.jsxs("main",{children:[t?a.jsx(Hl,{}):a.jsx($l,{}),a.jsx(Rn.div,{ref:i,className:"container",animate:"in",exit:"out",initial:"out",variants:c,transition:{duration:.25},children:a.jsx(m.Suspense,{fallback:a.jsx(Oe,{}),children:a.jsx(fi,{})})},location.pathname),!e&&a.jsx(Ol,{})]})}const Le=A.div`
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
`;function rs({items:t,onDragEnd:e,children:n}){const s=wi(os(ji),os(Ni,{coordinateGetter:Si}));return a.jsx(vi,{sensors:s,modifiers:[Ci,Ei],collisionDetection:ki,onDragEnd:e,children:a.jsx(Ai,{items:t,strategy:_i,children:n})})}const B={NAME:"name",NAME_DESC:"nameDesc",ARTIST_NAME:"artist",ARTIST_NAME_DESC:"artistDesc",PUBLISHED_YEAR:"publishedYear",PUBLISHED_YEAR_DESC:"publishedYearDesc",CREATED_AT:"createdAt",CREATED_AT_DESC:"createdAtDesc"};class zl extends ye{constructor(){super();W(this,"init",!1);this.state={loaded:!1,albums:[],sortedFrom:B.NAME}}get state(){return this.init||(this.init=!0,this.sync()),super.state}set state(n){super.state=n}async sync(){xl().then(({data:n})=>{this.set({loaded:!0,albums:n.allAlbums,sortedFrom:B.NAME})})}get sortItems(){return[{text:"Name (A-Z)",isActive:this.state.sortedFrom===B.NAME,onClick:()=>{this.set(n=>({albums:_e(n.albums),sortedFrom:B.NAME}))}},{text:"Name (Z-A)",isActive:this.state.sortedFrom===B.NAME_DESC,onClick:()=>{this.set(n=>({albums:_e(n.albums).reverse(),sortedFrom:B.NAME_DESC}))}},{text:"Artist Name (A to Z)",isActive:this.state.sortedFrom===B.ARTIST_NAME,onClick:()=>{this.set(n=>({albums:kt(n.albums),sortedFrom:B.ARTIST_NAME}))}},{text:"Artist Name (Z to A)",isActive:this.state.sortedFrom===B.ARTIST_NAME_DESC,onClick:()=>{this.set(n=>({albums:kt(n.albums).reverse(),sortedFrom:B.ARTIST_NAME_DESC}))}},{text:"Published Year (New to Old)",isActive:this.state.sortedFrom===B.PUBLISHED_YEAR,onClick:()=>{this.set(n=>({albums:Ls(n.albums),sortedFrom:B.PUBLISHED_YEAR}))}},{text:"Published Year (Old to New)",isActive:this.state.sortedFrom===B.PUBLISHED_YEAR_DESC,onClick:()=>{this.set(n=>({albums:Ls(n.albums).reverse(),sortedFrom:B.PUBLISHED_YEAR_DESC}))}},{text:"Created At (New to Old)",isActive:this.state.sortedFrom===B.CREATED_AT_DESC,onClick:()=>{this.set(n=>({albums:Se(n.albums),sortedFrom:B.CREATED_AT_DESC}))}},{text:"Created At (Old to New)",isActive:this.state.sortedFrom===B.CREATED_AT,onClick:()=>{this.set(n=>({albums:Se(n.albums).reverse(),sortedFrom:B.CREATED_AT}))}}]}}const kn=new zl,Wl=A.div`
    display: grid;
    grid-gap: 1rem;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    padding: 1rem;
    list-style: none;

    @media (max-width: 600px) {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
`,rn=100;function Vl(){const t=ne(),[e,n]=Xe(),[{albums:s,loaded:r}]=L(kn),[i,o]=m.useState(Number(e.get("l"))||rn),c=async()=>{const l=await q.prompt("Search keyword",e.get("q")||"");n({q:l})},d=()=>{o(i+rn),e.set("l",(i+rn).toString()),n(e,{replace:!0})},h=s==null?void 0:s.filter(l=>{var u,y;return l.name.toLowerCase().includes(((u=e.get("q"))==null?void 0:u.toLowerCase())||"")||l.artist.name.toLowerCase().includes(((y=e.get("q"))==null?void 0:y.toLowerCase())||"")});return a.jsxs(a.Fragment,{children:[a.jsxs(Le,{children:[a.jsx(P,{style:{width:"160px"},onClick:c,children:e.get("q")||"Search"}),a.jsxs(P,{onClick:()=>R.open({title:"Album Sort",content:a.jsx(Tt,{items:kn.sortItems})}),children:[a.jsx(et,{})," Sort"]})]}),!r&&a.jsx(Oe,{}),a.jsx(Wl,{children:r&&h.slice(0,i).map(l=>a.jsx(hr,{albumName:l.name,albumCover:l.cover,artistName:l.artist.name,onClick:()=>t(`/album/${l.id}`)},l.id))}),r&&h.length>i&&a.jsx("div",{style:{padding:"0 16px 16px"},children:a.jsx(P,{style:{width:"100%",justifyContent:"center"},onClick:d,children:"Load More"})})]})}const Yl=A.div`
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
`,Kl=A.ul`
    margin-top: 2rem;
    padding: 0;
    list-style: none;
`;function Jl(){const t=ne(),{id:e}=_n(),{data:n}=Sn(["album",e],()=>wl(e).then(r=>r.data.album),{enabled:!!e}),[{musicMap:s}]=L(z);return n?a.jsxs(a.Fragment,{children:[a.jsxs(Yl,{children:[a.jsx(pe,{className:"album-cover",src:n.cover.replace("/resized","")||"",alt:n==null?void 0:n.name}),a.jsx("div",{className:"album-title",children:n==null?void 0:n.name}),a.jsxs("div",{className:"row",children:[a.jsx(Qs,{className:"album-artist",to:`/artist/${n==null?void 0:n.artist.id}`,children:n==null?void 0:n.artist.name}),"-",a.jsx("span",{className:"album-year",children:n==null?void 0:n.publishedYear})]}),a.jsx("div",{className:"play-all",children:a.jsx("button",{onClick:()=>E.reset(n.musics.map(r=>r.id)),children:a.jsx(G,{})})})]}),a.jsx(Kl,{children:n.musics.map(({id:r})=>{const i=s.get(r);return i?a.jsx(ve,{albumName:i.album.name,artistName:i.artist.name,trackNumber:i.trackNumber,musicName:i.name,musicCodec:i.codec,isLiked:i.isLiked,isHated:i.isHated,onClick:()=>E.add(i.id),onLongPress:()=>R.open({title:"Related to this music",content:a.jsx(we,{id:i.id,onArtistClick:()=>t(`/artist/${i.artist.id}`)})})},i.id):null})})]}):null}const F={NAME:"name",NAME_DESC:"nameDesc",ALBUM_COUNT:"albumCount",ALBUM_COUNT_DESC:"albumCountDesc",MUSIC_COUNT:"musicCount",MUSIC_COUNT_DESC:"musicCountDesc",CREATED_AT:"createdAt",CREATED_AT_DESC:"createdAtDesc"};class Xl extends ye{constructor(){super();W(this,"init",!1);this.state={loaded:!1,artists:[],sortedFrom:F.MUSIC_COUNT_DESC}}get state(){return this.init||(this.init=!0,this.sync()),super.state}set state(n){super.state=n}async sync(){yl().then(({data:n})=>{this.set({loaded:!0,artists:n.allArtists,sortedFrom:F.MUSIC_COUNT_DESC})})}get sortItems(){return[{text:"Name (A-Z)",isActive:this.state.sortedFrom===F.NAME,onClick:()=>{this.set({artists:_e(this.state.artists),sortedFrom:F.NAME})}},{text:"Name (Z-A)",isActive:this.state.sortedFrom===F.NAME_DESC,onClick:()=>{this.set({artists:_e(this.state.artists).reverse(),sortedFrom:F.NAME_DESC})}},{text:"Album Count (High to Low)",isActive:this.state.sortedFrom===F.ALBUM_COUNT_DESC,onClick:()=>{this.set({artists:Ps(this.state.artists),sortedFrom:F.ALBUM_COUNT_DESC})}},{text:"Album Count (Low to High)",isActive:this.state.sortedFrom===F.ALBUM_COUNT,onClick:()=>{this.set({artists:Ps(this.state.artists).reverse(),sortedFrom:F.ALBUM_COUNT})}},{text:"Music Count (High to Low)",isActive:this.state.sortedFrom===F.MUSIC_COUNT_DESC,onClick:()=>{this.set({artists:Ms(this.state.artists),sortedFrom:F.MUSIC_COUNT_DESC})}},{text:"Music Count (Low to High)",isActive:this.state.sortedFrom===F.MUSIC_COUNT,onClick:()=>{this.set({artists:Ms(this.state.artists).reverse(),sortedFrom:F.MUSIC_COUNT})}},{text:"Created At (New to Old)",isActive:this.state.sortedFrom===F.CREATED_AT_DESC,onClick:()=>{this.set({artists:Se(this.state.artists),sortedFrom:F.CREATED_AT_DESC})}},{text:"Created At (Old to New)",isActive:this.state.sortedFrom===F.CREATED_AT,onClick:()=>{this.set({artists:Se(this.state.artists).reverse(),sortedFrom:F.CREATED_AT})}}]}}const An=new Xl,on=150;function Gl(){const t=ne(),[e,n]=Xe(),[{artists:s,loaded:r}]=L(An),[i,o]=m.useState(Number(e.get("l"))||on),c=()=>{o(i+on),e.set("l",(i+on).toString()),n(e,{replace:!0})},d=async()=>{const l=await q.prompt("Search keyword",e.get("q")||"");n({q:l})},h=s==null?void 0:s.filter(l=>{var u;return l.name.toLowerCase().includes(((u=e.get("q"))==null?void 0:u.toLowerCase())||"")});return a.jsxs(a.Fragment,{children:[a.jsxs(Le,{children:[a.jsx(P,{style:{width:"160px"},onClick:d,children:e.get("q")||"Search"}),a.jsxs(P,{onClick:()=>R.open({title:"Artist Sort",content:a.jsx(Tt,{items:An.sortItems})}),children:[a.jsx(et,{})," Sort"]})]}),!r&&a.jsx(Oe,{}),r&&h.slice(0,i).map(l=>{var u;return a.jsx(zo,{artistName:l.name,artistCover:((u=l.latestAlbum)==null?void 0:u.cover)||"",musicCount:l.musicCount,albumCount:l.albumCount,onClick:()=>t(`/artist/${l.id}`)},l.id)}),r&&h.length>i&&a.jsx("div",{style:{padding:"0 16px 16px"},children:a.jsx(P,{style:{width:"100%",justifyContent:"center"},onClick:c,children:"Load More"})})]})}const Ql=A.section`
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
`;function Zl(){var i;const t=ne(),{id:e}=_n(),{data:n}=Sn(["artist",e],()=>bl(e).then(o=>o.data.artist),{enabled:!!e}),[{musicMap:s}]=L(z);if(!n)return null;const r=n.musics.reduce((o,{id:c})=>{var d;return o+=((d=s.get(c))==null?void 0:d.playCount)||0},0);return a.jsxs(Ql,{children:[a.jsxs("div",{className:"artist-name",children:[a.jsx("div",{className:"cover",children:a.jsx("div",{children:a.jsx(pe,{src:((i=n.latestAlbum)==null?void 0:i.cover)||"",alt:n.name})})}),n.name,a.jsxs("span",{className:"detail-info",children:["You have listened to a song by this artist ",r," times."]})]}),a.jsxs("div",{className:"section-title",children:["Albums (",n.albums.length,")"]}),a.jsx("div",{className:"albums",children:n.albums.map(o=>a.jsx(hr,{albumCover:o.cover,albumName:o.name,artistName:o.publishedYear,onClick:()=>t(`/album/${o.id}`)},o.id))}),a.jsxs("div",{className:"section-title",children:["Songs (",n.musics.length,")",a.jsxs(P,{onClick:()=>E.reset(n.musics.map(o=>o.id)),children:[a.jsx(G,{})," Play"]})]}),a.jsx("div",{className:"musics",children:n.musics.map(({id:o})=>{const c=s.get(o);return c?a.jsx(ve,{artistName:c.album.name,albumCover:c.album.cover,albumName:c.album.name,musicName:c.name,musicCodec:c.codec,isLiked:c.isLiked,isHated:c.isHated,onClick:()=>E.add(c.id),onLongPress:()=>R.open({title:"Related to this music",content:a.jsx(we,{id:c.id,onAlbumClick:()=>t(`/album/${c.album.id}`)})})},c.id):null})})]})}const an=200;function ed(){const t=ne(),[e,n]=Xe(),[{musics:s,loaded:r}]=L(z),[i,o]=m.useState(Number(e.get("l"))||an),c=async()=>{const l=await q.prompt("Search keyword",e.get("q")||"");n({q:l})},d=()=>{o(i+an),e.set("l",(i+an).toString()),n(e,{replace:!0})},h=s==null?void 0:s.filter(l=>{var u,y,w;return!l.isHated&&l.isLiked&&(l.name.toLowerCase().includes(((u=e.get("q"))==null?void 0:u.toLowerCase())||"")||l.artist.name.toLowerCase().includes(((y=e.get("q"))==null?void 0:y.toLowerCase())||"")||l.album.name.toLowerCase().includes(((w=e.get("q"))==null?void 0:w.toLowerCase())||""))});return a.jsxs(a.Fragment,{children:[a.jsxs(Le,{children:[a.jsx(P,{style:{width:"160px"},onClick:c,children:e.get("q")||"Search"}),a.jsxs("div",{style:{display:"flex",flexDirection:"row",gap:"8px"},children:[a.jsxs(P,{onClick:()=>E.reset(h.map(l=>l.id)),children:[a.jsx(G,{})," Play"]}),a.jsxs(P,{onClick:()=>R.open({title:"Music Sort",content:a.jsx(Tt,{items:z.sortItems})}),children:[a.jsx(et,{})," Sort"]})]})]}),!r&&a.jsx(Oe,{}),r&&h.slice(0,i).map(l=>a.jsx(ve,{albumName:l.album.name,albumCover:l.album.cover,artistName:l.artist.name,musicName:l.name,musicCodec:l.codec,isLiked:l.isLiked,onClick:()=>E.add(l.id),onLongPress:()=>R.open({title:"Related to this music",content:a.jsx(we,{id:l.id,onAlbumClick:()=>t(`/album/${l.album.id}`),onArtistClick:()=>t(`/artist/${l.artist.id}`)})})},l.id)),r&&h.length>i&&a.jsx("div",{style:{padding:"0 16px 16px"},children:a.jsx(P,{style:{width:"100%",justifyContent:"center"},onClick:d,children:"Load More"})})]})}const cn=200;function td(){const t=ne(),[e,n]=Xe(),[{musics:s,loaded:r}]=L(z),[i,o]=m.useState(Number(e.get("l"))||cn),c=async()=>{const l=await q.prompt("Search keyword",e.get("q")||"");e.set("q",l),n(e,{replace:!0})},d=()=>{o(i+cn),e.set("l",(i+cn).toString()),n(e,{replace:!0})},h=s==null?void 0:s.filter(l=>{var u,y,w;return!l.isHated&&(l.name.toLowerCase().includes(((u=e.get("q"))==null?void 0:u.toLowerCase())||"")||l.artist.name.toLowerCase().includes(((y=e.get("q"))==null?void 0:y.toLowerCase())||"")||l.album.name.toLowerCase().includes(((w=e.get("q"))==null?void 0:w.toLowerCase())||""))});return a.jsxs(a.Fragment,{children:[a.jsxs(Le,{children:[a.jsx(P,{style:{width:"160px"},onClick:c,children:e.get("q")||"Search"}),a.jsxs("div",{style:{display:"flex",flexDirection:"row",gap:"8px"},children:[a.jsxs(P,{onClick:()=>E.reset(h.map(l=>l.id)),children:[a.jsx(G,{})," Play"]}),a.jsxs(P,{onClick:()=>R.open({title:"Music Sort",content:a.jsx(Tt,{items:z.sortItems})}),children:[a.jsx(et,{})," Sort"]})]})]}),!r&&a.jsx(Oe,{}),r&&h.slice(0,i).map(l=>a.jsx(ve,{albumName:l.album.name,albumCover:l.album.cover,artistName:l.artist.name,musicName:l.name,musicCodec:l.codec,isLiked:l.isLiked,isHated:l.isHated,onClick:()=>E.add(l.id),onLongPress:()=>R.open({title:"Related to this music",content:a.jsx(we,{id:l.id,onAlbumClick:()=>t(`/album/${l.album.id}`),onArtistClick:()=>t(`/artist/${l.artist.id}`)})})},l.id)),r&&h.length>i&&a.jsx("div",{style:{padding:"0 16px 16px"},children:a.jsx(P,{style:{width:"100%",justifyContent:"center"},onClick:d,children:"Load More"})})]})}const nd=A.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    gap: 1rem;
`,sd=A.div`
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
`,rd=A.div`
    color: #666;
    font-size: 1.25rem;
    margin-top: 1rem;
`;function id(){return a.jsxs(nd,{children:[a.jsx(sd,{children:"(㇏(•̀ᵥᵥ•́)ノ)"}),a.jsx(rd,{children:"why are you here?"}),a.jsx(P,{onClick:()=>location.assign("/"),children:"Go Home"})]})}const od=A.div`
    height: 100%;
    display: flex;
    padding: 3rem 1rem;
    position: relative;
    overflow-y: auto;
    
    .between {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 100%;
        min-height: 100%;
        height: fit-content;
    }

    .content {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .footer {
        position: fixed;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        padding-bottom: 0.5rem;

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
`;function ad(){const t=ne(),[e]=L(E),[{musicMap:n}]=L(z),[s,r]=m.useState("50%"),i=e.selected!==null?n.get(e.items[e.selected]):null,o=d=>{const{width:h,left:l,right:u}=d.currentTarget.getBoundingClientRect();let y=d.touches?d.touches[0].clientX:d.clientX;y=y<l?l:y>u?u:y;const w=(y-l)/h,g=(i==null?void 0:i.duration)||1;E.seek(g*w)},c=d=>{var h;if(d.buttons===1){o(d);return}((h=d.touches)==null?void 0:h.length)===1&&o(d)};return m.useEffect(()=>{let d=null;if(!e.isPlaying){r("50%");return}const h=()=>{const l=()=>Math.floor(Math.random()*90+10)+"%";r(`${l()} ${l()} ${l()} ${l()}`),d=setTimeout(h,1e3)};return h(),()=>{r("50%"),d&&clearTimeout(d)}},[e.isPlaying]),a.jsx(od,{as:Rn.div,animate:"in",exit:"out",initial:"out",variants:{in:{opacity:1,y:0},out:{opacity:0,y:50}},transition:{duration:.25},children:a.jsxs("div",{className:"between",children:[a.jsxs("div",{className:"content",children:[a.jsxs("div",{className:"album-art",children:[a.jsx("img",{className:"background",style:{borderRadius:s},src:Ke(i==null?void 0:i.album.cover),alt:i==null?void 0:i.album.name}),a.jsx("div",{className:"foreground-wrapper",children:a.jsx("img",{className:"foreground",style:{borderRadius:s},src:Ke(i==null?void 0:i.album.cover.replace("/resized","")),alt:i==null?void 0:i.album.name})})]}),a.jsx("div",{className:"title-info",children:a.jsxs("button",{className:"clickable title",onClick:()=>i&&R.open({title:"Related to this music",content:a.jsx(we,{id:i.id,onAlbumClick:()=>t(`/album/${i.album.id}`),onArtistClick:()=>t(`/artist/${i.artist.id}`)})}),children:[a.jsx("div",{className:"name",children:i==null?void 0:i.name}),a.jsx("div",{className:"artist",children:i==null?void 0:i.artist.name})]})}),a.jsxs("div",{className:"time-info",children:[a.jsx("div",{className:"current-time",children:hn(e.currentTime)}),a.jsx("div",{className:"total-time",children:hn((i==null?void 0:i.duration)||0)})]}),a.jsx("div",{className:"progress",role:"slider",tabIndex:0,"aria-valuenow":e.progress,"aria-valuemin":0,"aria-valuemax":100,onClick:o,onMouseMove:c,onTouchMove:c,children:a.jsx("div",{className:"bar",style:{transform:`translate(-${100-e.progress}%, 0)`}})}),a.jsxs("div",{className:"action",children:[a.jsxs("button",{className:"icon-button mode",onClick:()=>E.changeRepeatMode(),children:[e.repeatMode==="all"&&a.jsx(xr,{}),e.repeatMode==="one"&&a.jsx(pr,{}),e.repeatMode==="none"&&a.jsx(wr,{})]}),a.jsxs("div",{className:"playback",children:[a.jsx("button",{className:"icon-button skip-back",onClick:()=>E.prev(),children:a.jsx(G,{})}),a.jsx("button",{className:"icon-button",onClick:()=>e.isPlaying?E.pause():E.play(),children:e.isPlaying?a.jsx(br,{}):a.jsx(G,{})}),a.jsx("button",{className:"icon-button skip-forward",onClick:()=>E.next(),children:a.jsx(G,{})})]}),a.jsx("button",{className:`icon-button shuffle ${e.shuffle?"active":""}`,onClick:()=>E.toggleShuffle(),children:a.jsx(vr,{})})]})]}),a.jsx("div",{className:"footer",children:a.jsx("button",{className:"icon-button",onClick:()=>history.back(),children:a.jsx(gr,{})})})]})})}const cd=A.div`
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
`;function ld({playlist:t,onClick:e,onLongPress:n}){const{attributes:s,listeners:r,setNodeRef:i,transform:o,transition:c}=Nn({id:t.id}),d={transform:jn.Transform.toString(o),transition:c};return a.jsxs(cd,{ref:i,style:d,...s,children:[a.jsx("div",{className:"icon-button",...r,style:{cursor:"grab",touchAction:"none"},children:a.jsx(Ze,{})}),a.jsx("div",{style:{flex:1,maxWidth:"calc(100% - 4rem)"},children:a.jsx(oi,{...t,onClick:e,onLongPress:n},t.id)})]})}function dd(){const t=ne(),[{playlists:e,loaded:n},s]=L(ns),r=async()=>{const o=await q.prompt("Enter playlist name");ce.create(o)},i=o=>{const{active:c,over:d}=o;if(d&&c.id!==d.id){const h=e.findIndex(y=>y.id===c.id),l=e.findIndex(y=>y.id===d.id),u=On(e,h,l);ce.changeOrder(u.map(y=>y.id)),s(y=>({...y,playlists:u}))}};return a.jsxs(a.Fragment,{children:[a.jsxs(Le,{children:[a.jsx("div",{}),a.jsx(P,{onClick:r,children:"Create"})]}),a.jsxs(rs,{items:e.map(o=>o.id),onDragEnd:i,children:[!n&&a.jsx(Oe,{}),n&&(e==null?void 0:e.map(o=>a.jsx(ld,{playlist:o,onClick:()=>t(`/playlist/${o.id}`),onLongPress:()=>R.open({content:a.jsx(Pl,{id:o.id,onPlaylistClick:()=>t(`/playlist/${o.id}`)})})},o.id)))]})]})}const ud=A.div`
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
`,hd=A.div`
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
`;function fd({music:t,isSelectMode:e,isSelected:n,onClick:s,onSelect:r,onLongPress:i}){const{attributes:o,listeners:c,setNodeRef:d,transform:h,transition:l}=Nn({id:t.id}),u={transform:jn.Transform.toString(h),transition:l};return a.jsxs(ud,{ref:d,style:u,...o,children:[e?a.jsx("button",{className:`icon-button checkbox ${n?"active":""} `,onClick:r,children:a.jsx(Bn,{})}):a.jsx("div",{className:"icon-button checkbox",...c,style:{cursor:"grab",touchAction:"none"},children:a.jsx(Ze,{})}),a.jsx("div",{style:{flex:1,maxWidth:"calc(100% - 4rem)"},children:a.jsx(ve,{albumName:t.album.name,albumCover:t.album.cover,artistName:t.artist.name,musicName:t.name,musicCodec:t.codec,isLiked:t.isLiked,isHated:t.isHated,onClick:e?r:s,onLongPress:i})})]})}function md(){const t=ne(),{id:e}=_n(),n=mi(),{data:s}=Sn(["playlist",e],()=>Cl(e).then(l=>l.data.playlist),{enabled:!!e}),[{musicMap:r}]=L(z),[i,o]=m.useState(!1),[c,d]=m.useState([]),h=l=>{const{active:u,over:y}=l;if(s&&y&&u.id!==y.id){const w=s.musics.findIndex(({id:x})=>x===u.id),g=s.musics.findIndex(({id:x})=>x===y.id),p=On(s.musics,w,g);ce.changeMusicOrder(s.id,p.map(({id:x})=>x)),n.setQueryData(["playlist",e],()=>({...s,musics:p}))}};return m.useEffect(()=>{const l=()=>{n.invalidateQueries(["playlist",e])};return b.on($e,l),b.on(qe,l),b.on(He,l),()=>{b.off($e,l),b.off(qe,l),b.off(He,l)}},[e,n]),m.useEffect(()=>{d([])},[i]),s?a.jsxs(hd,{children:[a.jsxs("div",{className:"header",children:[a.jsx(In,{className:"cover",images:s.musics.slice(0,16).map(l=>{var u;return((u=r.get(l.id))==null?void 0:u.album.cover)??""})}),a.jsx("h1",{children:s.name})]}),a.jsxs(Le,{children:[a.jsx("div",{style:{display:"flex",alignItems:"center",gap:"1rem"},children:a.jsx(ii,{active:i,label:i?`${c.length} selected`:`${s.musics.length} musics`,onClick:()=>o(!i),onSelectAll:()=>d(s.musics.map(({id:l})=>l))})}),a.jsxs(P,{onClick:()=>E.reset(s.musics.map(({id:l})=>l)),children:[a.jsx(G,{})," Play"]})]}),a.jsx("div",{style:{flex:1},children:a.jsx(rs,{items:s.musics.map(({id:l})=>l),onDragEnd:h,children:s.musics.map(({id:l})=>{const u=r.get(l);return u?a.jsx(fd,{music:u,isSelectMode:i,isSelected:c.includes(u.id),onClick:()=>E.add(u.id),onSelect:()=>{c.includes(u.id)?d(c.filter(y=>y!==u.id)):d([...c,u.id])},onLongPress:()=>R.open({content:a.jsx(we,{id:u.id,onAlbumClick:()=>t(`/album/${u.album.id}`),onArtistClick:()=>t(`/artist/${u.artist.id}`)})})},u.id):null})})}),i&&c.length>0&&a.jsxs("div",{className:"select-actions",children:[a.jsxs("button",{className:"clickable",onClick:()=>{c.forEach(l=>E.add(l)),o(!1)},children:[a.jsx(G,{}),a.jsx("span",{children:"Play"})]}),a.jsxs("button",{className:"clickable",onClick:()=>R.open({title:"Move to playlist",content:a.jsx(ss,{onClick:l=>{ce.moveMusic(s.id,l,c),q.toast("Moved to playlist"),o(!1)}})}),children:[a.jsx(Fn,{}),a.jsx("span",{children:"Move"})]}),a.jsxs("button",{className:"clickable",onClick:async()=>{ce.removeMusic(s.id,c),o(!1)},children:[a.jsx(Un,{}),a.jsx("span",{children:"Delete"})]})]})]}):null}const pd=A.div`
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
`,gd=A.li`
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
`,yd=({music:t,isCurrentMusic:e,isSelectMode:n,isSelected:s,onSelect:r,onClick:i,onLongPress:o})=>{const{attributes:c,listeners:d,setNodeRef:h,transform:l,transition:u}=Nn({id:t.id}),y={transform:jn.Transform.toString(l),transition:u};return a.jsxs(gd,{ref:h,...c,style:y,className:e?"now-playing":"",children:[n?a.jsx("button",{className:`icon-button checkbox ${s?"active":""}`,onClick:r,children:a.jsx(Bn,{})}):a.jsx("button",{...d,className:"icon-button checkbox",style:{cursor:"grab",touchAction:"none"},children:a.jsx(Ze,{})}),a.jsx("div",{style:{flex:1,maxWidth:"calc(100% - 4rem)"},children:a.jsx(ve,{musicName:t.name,artistName:t.artist.name,albumName:t.album.name,albumCover:t.album.cover,isLiked:t.isLiked,isHated:t.isHated,onClick:n?r:i,onLongPress:o},t.id)})]})};function bd(){const t=ne(),[{items:e,selected:n},s]=L(E),[{musicMap:r}]=L(z),i=m.useRef(null),[o,c]=m.useState(!1),[d,h]=m.useState([]),l=async u=>{const{active:y,over:w}=u;if(w){if(y.id===w.id)return;s(g=>{const p=g.items[g.selected],x=g.items.indexOf(y.id.toString()),v=g.items.indexOf(w.id.toString()),_=On(g.items,x,v);return p?{...g,items:_,selected:_.indexOf(p)}:{...g,items:_}})}};return m.useEffect(()=>{h([])},[o]),m.useEffect(()=>{if(i.current){const u=i.current.children.item(n||0);if(!u)return;i.current.scrollTo({top:u.offsetTop-60,behavior:"smooth"})}},[i,n]),a.jsxs(pd,{as:Rn.div,animate:"in",exit:"out",initial:"out",variants:{in:{opacity:1,y:0},out:{opacity:0,y:50}},transition:{duration:.25},children:[a.jsx("div",{className:"header",children:a.jsx("div",{style:{display:"flex",alignItems:"center",gap:"1rem"},children:a.jsx(ii,{label:o?`${d.length} selected`:`${e==null?void 0:e.length} musics`,active:o,onClick:()=>c(!o),onSelectAll:()=>h(e)})})}),a.jsx("ul",{className:"container",ref:i,children:a.jsx(rs,{items:e,onDragEnd:l,children:e==null?void 0:e.map((u,y)=>{const w=r.get(u);return w?a.jsx(yd,{music:w,isCurrentMusic:n===y,isSelectMode:o,isSelected:d.includes(u),onSelect:()=>{d.includes(u)?h(d.filter(g=>g!==u)):h([...d,u])},onClick:()=>{E.select(y)},onLongPress:()=>R.open({content:a.jsx(we,{id:w.id,onAlbumClick:()=>t(`/album/${w.album.id}`),onArtistClick:()=>t(`/artist/${w.artist.id}`)})})},u):null})})}),o&&d.length>0&&a.jsxs("div",{className:"select-actions",children:[a.jsxs("button",{className:"clickable",onClick:()=>R.open({title:"Move to playlist",content:a.jsx(ss,{onClick:u=>{ce.addMusic(u,d),q.toast("Added to playlist"),c(!1)}})}),children:[a.jsx(Fn,{}),a.jsx("span",{children:"Save"})]}),a.jsxs("button",{className:"clickable",onClick:()=>{E.removeItems(d),c(!1)},children:[a.jsx(Un,{}),a.jsx("span",{children:"Delete"})]})]}),a.jsxs("div",{className:"footer",children:[a.jsx("div",{}),a.jsx("button",{className:"icon-button",onClick:()=>history.back(),children:a.jsx(fr,{})})]})]})}class xd extends ye{constructor(){super();W(this,"init",!1);W(this,"listener");this.state={connectors:[]},this.listener=new Ir,this.listener.connect({onConnectors:n=>{this.set({connectors:n})}})}get state(){return this.init||(this.init=!0,this.sync()),super.state}set state(n){super.state=n}async sync(){b.emit("get-connectors")}}const wd=new xd,vd=A.div`
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
`,Xs=[{value:"immediately",label:"Play immediately"},{value:"later",label:"Play later"}],Gs=[{value:"first",label:"Add to the top of the queue"},{value:"last",label:"Add to the bottom of the queue"},{value:"after",label:"Add to the next of the current music"}];function Cd(){const[{connectors:t}]=L(wd),[{playMode:e,insertMode:n}]=L(E),[s,r]=m.useState(""),i=async o=>{o&&!await q.confirm("Please only proceed with the update if it is recommended by the developer. Are you sure you want to proceed?")||b.emit("sync-music",{force:o})};return m.useEffect(()=>(b.on("sync-music",o=>{(o==="done"||o==="error")&&(o==="done"?q.toast("Completed sync music"):o==="error"&&q.toast("Error while sync music"),setTimeout(()=>{r("")},1e3)),r(o)}),()=>{b.off("sync-music")}),[]),a.jsxs(vd,{children:[a.jsxs("section",{children:[a.jsx("h3",{children:"Synchronization"}),a.jsx("p",{children:"Sync from your server"}),s&&a.jsx("p",{className:"progress-text",children:s}),a.jsxs("div",{style:{display:"flex",gap:"1rem"},children:[a.jsx(P,{onClick:()=>i(!1),children:"Sync"}),a.jsx(P,{onClick:()=>i(!0),children:"Force Sync"})]})]}),a.jsxs("section",{children:[a.jsx("h3",{children:"Play Mode"}),a.jsx("p",{children:"When you add a music to the queue, It will..."}),a.jsx(Ks,{selected:Xs.find(({value:o})=>o===e),options:Xs,onChange:o=>E.setPlayMode(o)}),a.jsx(Ks,{selected:Gs.find(({value:o})=>o===n),options:Gs,onChange:o=>E.setInsertMode(o)})]}),a.jsxs("section",{children:[a.jsx("h3",{children:"Connectors"}),t.map(o=>a.jsxs("div",{className:"connector",children:[a.jsx("span",{children:o.userAgent}),a.jsx("span",{className:"date",children:new Date(o.connectedAt).toLocaleDateString()}),o.id===b.id?a.jsx("span",{className:"this-device",children:"This device"}):a.jsx("button",{className:"kick",onClick:()=>Ir.remove(o.id),children:"Remove"})]},o.id))]}),a.jsxs("section",{children:[a.jsx("h3",{children:"Have a problem?"}),a.jsx("div",{style:{display:"flex",gap:"1rem"},children:a.jsx(P,{onClick:()=>window.location.reload(),children:"Try Refresh"})})]})]})}const Ed=new pi({defaultOptions:{queries:{refetchOnWindowFocus:!1,retry:!1,suspense:!0}}}),kd=gi([{element:a.jsx(Js,{}),children:[{path:"/",element:a.jsx(td,{})},{path:"/favorite",element:a.jsx(ed,{})},{path:"/album",element:a.jsx(Vl,{})},{path:"/artist",element:a.jsx(Gl,{})},{path:"/playlist",element:a.jsx(dd,{})},{path:"/setting",element:a.jsx(Cd,{})}]},{element:a.jsx(Js,{isSubPage:!0,animationDirection:"RightToLeft"}),children:[{path:"/album/:id",element:a.jsx(Jl,{})},{path:"/artist/:id",element:a.jsx(Zl,{})},{path:"/playlist/:id",element:a.jsx(md,{})}]},{children:[{path:"/player",element:a.jsx(ad,{})}]},{children:[{path:"/queue",element:a.jsx(bd,{})}]},{element:a.jsx(id,{}),path:"*"}]);function Ad(){return m.useEffect(()=>{b.connect(),b.on("resync",()=>{z.init=!1,An.init=!1,kn.init=!1}),window.addEventListener("focus",()=>{b.connected||(b.connect(),Ae.count())}),window.addEventListener("beforeunload",()=>{b.disconnect()})},[]),a.jsx(Tl,{children:a.jsx(yi,{client:Ed,children:a.jsx(bi,{router:kd})})})}ln.createRoot(document.getElementById("root")).render(a.jsx(xi.StrictMode,{children:a.jsx(Ad,{})}));
