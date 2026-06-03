import{E as Ee,u as Ao,d as Ae,c as T,b as U,j as ue,f as Oe,g as Ce,h as je,l as V,F as tt,e as Q,a as Re,n as lt,N as jo,y as to,A as ct,p as J,o as le,M as Bt,m as oo,w as Ho,O as No}from"./Nu5kl8fh.js";import{u as Mt,a as Do,i as Vo,N as $t}from"./DjTK5B1V.js";import{f as R,r as O,s as Ye,e as he,i as ut,h as r,m as Wo,k as ht,N as Uo,K as Ko,u as ae,j as Ie,L as no,T as ro,q as et,F as Ft,g as it,l as qo,v as Zo}from"./CI2nsVyN.js";import{V as _t,c as Go,h as Pt,z as Jo,a as wt,p as Qe,B as yt,N as Me,s as Qo,r as We,C as Rt,y as io,S as Xo,w as Te,D as Yo,j as Ue,E as en,b as tn,m as lo,W as on,F as Lt,t as ao,G as nn,A as so,o as co,H as rn,I as ln,J as Et,K as an,L as sn,M as dn,O as at,P as At,e as st,Q as cn,R as un,u as hn}from"./DwHjonGY.js";function jt(e){return e&-e}class uo{constructor(t,o){this.l=t,this.min=o;const n=new Array(t+1);for(let a=0;a<t+1;++a)n[a]=0;this.ft=n}add(t,o){if(o===0)return;const{l:n,ft:a}=this;for(t+=1;t<=n;)a[t]+=o,t+=jt(t)}get(t){return this.sum(t+1)-this.sum(t)}sum(t){if(t===void 0&&(t=this.l),t<=0)return 0;const{ft:o,min:n,l:a}=this;if(t>a)throw new Error("[FinweckTree.sum]: `i` is larger than length.");let s=t*n;for(;t>0;)s+=o[t],t-=jt(t);return s}getBound(t){let o=0,n=this.l;for(;n>o;){const a=Math.floor((o+n)/2),s=this.sum(a);if(s>t){n=a;continue}else if(s<t){if(o===a)return this.sum(o+1)<=t?o+1:a;o=a}else return a}return o}}let rt;function fn(){return typeof document>"u"?!1:(rt===void 0&&("matchMedia"in window?rt=window.matchMedia("(pointer:coarse)").matches:rt=!1),rt)}let St;function Ht(){return typeof document>"u"?1:(St===void 0&&(St="chrome"in window?window.devicePixelRatio:1),St)}const ho="VVirtualListXScroll";function vn({columnsRef:e,renderColRef:t,renderItemWithColsRef:o}){const n=O(0),a=O(0),s=R(()=>{const c=e.value;if(c.length===0)return null;const C=new uo(c.length,0);return c.forEach((v,P)=>{C.add(P,v.width)}),C}),d=Ee(()=>{const c=s.value;return c!==null?Math.max(c.getBound(a.value)-1,0):0}),l=c=>{const C=s.value;return C!==null?C.sum(c):0},u=Ee(()=>{const c=s.value;return c!==null?Math.min(c.getBound(a.value+n.value)+1,e.value.length-1):0});return Ye(ho,{startIndexRef:d,endIndexRef:u,columnsRef:e,renderColRef:t,renderItemWithColsRef:o,getLeft:l}),{listWidthRef:n,scrollLeftRef:a}}const Nt=he({name:"VirtualListRow",props:{index:{type:Number,required:!0},item:{type:Object,required:!0}},setup(){const{startIndexRef:e,endIndexRef:t,columnsRef:o,getLeft:n,renderColRef:a,renderItemWithColsRef:s}=ut(ho);return{startIndex:e,endIndex:t,columns:o,renderCol:a,renderItemWithCols:s,getLeft:n}},render(){const{startIndex:e,endIndex:t,columns:o,renderCol:n,renderItemWithCols:a,getLeft:s,item:d}=this;if(a!=null)return a({itemIndex:this.index,startColIndex:e,endColIndex:t,allColumns:o,item:d,getLeft:s});if(n!=null){const l=[];for(let u=e;u<=t;++u){const c=o[u];l.push(n({column:c,left:s(u),item:d}))}return l}return null}}),gn=wt(".v-vl",{maxHeight:"inherit",height:"100%",overflow:"auto",minWidth:"1px"},[wt("&:not(.v-vl--show-scrollbar)",{scrollbarWidth:"none"},[wt("&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb",{width:0,height:0,display:"none"})])]),pn=he({name:"VirtualList",inheritAttrs:!1,props:{showScrollbar:{type:Boolean,default:!0},columns:{type:Array,default:()=>[]},renderCol:Function,renderItemWithCols:Function,items:{type:Array,default:()=>[]},itemSize:{type:Number,required:!0},itemResizable:Boolean,itemsStyle:[String,Object],visibleItemsTag:{type:[String,Object],default:"div"},visibleItemsProps:Object,ignoreItemResize:Boolean,onScroll:Function,onWheel:Function,onResize:Function,defaultScrollKey:[Number,String],defaultScrollIndex:Number,keyField:{type:String,default:"key"},paddingTop:{type:[Number,String],default:0},paddingBottom:{type:[Number,String],default:0}},setup(e){const t=Ao();gn.mount({id:"vueuc/virtual-list",head:!0,anchorMetaName:Go,ssr:t}),ht(()=>{const{defaultScrollIndex:m,defaultScrollKey:M}=e;m!=null?y({index:m}):M!=null&&y({key:M})});let o=!1,n=!1;Uo(()=>{if(o=!1,!n){n=!0;return}y({top:S.value,left:d.value})}),Ko(()=>{o=!0,n||(n=!0)});const a=Ee(()=>{if(e.renderCol==null&&e.renderItemWithCols==null||e.columns.length===0)return;let m=0;return e.columns.forEach(M=>{m+=M.width}),m}),s=R(()=>{const m=new Map,{keyField:M}=e;return e.items.forEach((H,E)=>{m.set(H[M],E)}),m}),{scrollLeftRef:d,listWidthRef:l}=vn({columnsRef:ae(e,"columns"),renderColRef:ae(e,"renderCol"),renderItemWithColsRef:ae(e,"renderItemWithCols")}),u=O(null),c=O(void 0),C=new Map,v=R(()=>{const{items:m,itemSize:M,keyField:H}=e,E=new uo(m.length,M);return m.forEach((L,G)=>{const q=L[H],_=C.get(q);_!==void 0&&E.add(G,_)}),E}),P=O(0),S=O(0),h=Ee(()=>Math.max(v.value.getBound(S.value-Pt(e.paddingTop))-1,0)),f=R(()=>{const{value:m}=c;if(m===void 0)return[];const{items:M,itemSize:H}=e,E=h.value,L=Math.min(E+Math.ceil(m/H+1),M.length-1),G=[];for(let q=E;q<=L;++q)G.push(M[q]);return G}),y=(m,M)=>{if(typeof m=="number"){K(m,M,"auto");return}const{left:H,top:E,index:L,key:G,position:q,behavior:_,debounce:Y=!0}=m;if(H!==void 0||E!==void 0)K(H,E,_);else if(L!==void 0)N(L,_,Y);else if(G!==void 0){const te=s.value.get(G);te!==void 0&&N(te,_,Y)}else q==="bottom"?K(0,Number.MAX_SAFE_INTEGER,_):q==="top"&&K(0,0,_)};let F,z=null;function N(m,M,H){const{value:E}=v,L=E.sum(m)+Pt(e.paddingTop);if(!H)u.value.scrollTo({left:0,top:L,behavior:M});else{F=m,z!==null&&window.clearTimeout(z),z=window.setTimeout(()=>{F=void 0,z=null},16);const{scrollTop:G,offsetHeight:q}=u.value;if(L>G){const _=E.get(m);L+_<=G+q||u.value.scrollTo({left:0,top:L+_-q,behavior:M})}else u.value.scrollTo({left:0,top:L,behavior:M})}}function K(m,M,H){u.value.scrollTo({left:m,top:M,behavior:H})}function Z(m,M){var H,E,L;if(o||e.ignoreItemResize||ne(M.target))return;const{value:G}=v,q=s.value.get(m),_=G.get(q),Y=(L=(E=(H=M.borderBoxSize)===null||H===void 0?void 0:H[0])===null||E===void 0?void 0:E.blockSize)!==null&&L!==void 0?L:M.contentRect.height;if(Y===_)return;Y-e.itemSize===0?C.delete(m):C.set(m,Y-e.itemSize);const se=Y-_;if(se===0)return;G.add(q,se);const g=u.value;if(g!=null){if(F===void 0){const x=G.sum(q);g.scrollTop>x&&g.scrollBy(0,se)}else if(q<F)g.scrollBy(0,se);else if(q===F){const x=G.sum(q);Y+x>g.scrollTop+g.offsetHeight&&g.scrollBy(0,se)}oe()}P.value++}const W=!fn();let re=!1;function ee(m){var M;(M=e.onScroll)===null||M===void 0||M.call(e,m),(!W||!re)&&oe()}function fe(m){var M;if((M=e.onWheel)===null||M===void 0||M.call(e,m),W){const H=u.value;if(H!=null){if(m.deltaX===0&&(H.scrollTop===0&&m.deltaY<=0||H.scrollTop+H.offsetHeight>=H.scrollHeight&&m.deltaY>=0))return;m.preventDefault(),H.scrollTop+=m.deltaY/Ht(),H.scrollLeft+=m.deltaX/Ht(),oe(),re=!0,Jo(()=>{re=!1})}}}function pe(m){if(o||ne(m.target))return;if(e.renderCol==null&&e.renderItemWithCols==null){if(m.contentRect.height===c.value)return}else if(m.contentRect.height===c.value&&m.contentRect.width===l.value)return;c.value=m.contentRect.height,l.value=m.contentRect.width;const{onResize:M}=e;M!==void 0&&M(m)}function oe(){const{value:m}=u;m!=null&&(S.value=m.scrollTop,d.value=m.scrollLeft)}function ne(m){let M=m;for(;M!==null;){if(M.style.display==="none")return!0;M=M.parentElement}return!1}return{listHeight:c,listStyle:{overflow:"auto"},keyToIndex:s,itemsStyle:R(()=>{const{itemResizable:m}=e,M=Qe(v.value.sum());return P.value,[e.itemsStyle,{boxSizing:"content-box",width:Qe(a.value),height:m?"":M,minHeight:m?M:"",paddingTop:Qe(e.paddingTop),paddingBottom:Qe(e.paddingBottom)}]}),visibleItemsStyle:R(()=>(P.value,{transform:`translateY(${Qe(v.value.sum(h.value))})`})),viewportItems:f,listElRef:u,itemsElRef:O(null),scrollTo:y,handleListResize:pe,handleListScroll:ee,handleListWheel:fe,handleItemResize:Z}},render(){const{itemResizable:e,keyField:t,keyToIndex:o,visibleItemsTag:n}=this;return r(_t,{onResize:this.handleListResize},{default:()=>{var a,s;return r("div",Wo(this.$attrs,{class:["v-vl",this.showScrollbar&&"v-vl--show-scrollbar"],onScroll:this.handleListScroll,onWheel:this.handleListWheel,ref:"listElRef"}),[this.items.length!==0?r("div",{ref:"itemsElRef",class:"v-vl-items",style:this.itemsStyle},[r(n,Object.assign({class:"v-vl-visible-items",style:this.visibleItemsStyle},this.visibleItemsProps),{default:()=>{const{renderCol:d,renderItemWithCols:l}=this;return this.viewportItems.map(u=>{const c=u[t],C=o.get(c),v=d!=null?r(Nt,{index:C,item:u}):void 0,P=l!=null?r(Nt,{index:C,item:u}):void 0,S=this.$slots.default({item:u,renderedCols:v,renderedItemWithCols:P,index:C})[0];return e?r(_t,{key:c,onResize:h=>this.handleItemResize(c,h)},{default:()=>S}):(S.key=c,S)})}})]):(s=(a=this.$slots).empty)===null||s===void 0?void 0:s.call(a)])}})}});function fo(e,t){t&&(ht(()=>{const{value:o}=e;o&&yt.registerHandler(o,t)}),Ie(e,(o,n)=>{n&&yt.unregisterHandler(n)},{deep:!1}),no(()=>{const{value:o}=e;o&&yt.unregisterHandler(o)}))}function Dt(e){switch(typeof e){case"string":return e||void 0;case"number":return String(e);default:return}}const mn={tiny:"mini",small:"tiny",medium:"small",large:"medium",huge:"large"};function Vt(e){const t=mn[e];if(t===void 0)throw new Error(`${e} has no smaller size.`);return t}function Xe(e){const t=e.filter(o=>o!==void 0);if(t.length!==0)return t.length===1?t[0]:o=>{e.forEach(n=>{n&&n(o)})}}const Wt=he({name:"Backward",render(){return r("svg",{viewBox:"0 0 20 20",fill:"none",xmlns:"http://www.w3.org/2000/svg"},r("path",{d:"M12.2674 15.793C11.9675 16.0787 11.4927 16.0672 11.2071 15.7673L6.20572 10.5168C5.9298 10.2271 5.9298 9.7719 6.20572 9.48223L11.2071 4.23177C11.4927 3.93184 11.9675 3.92031 12.2674 4.206C12.5673 4.49169 12.5789 4.96642 12.2932 5.26634L7.78458 9.99952L12.2932 14.7327C12.5789 15.0326 12.5673 15.5074 12.2674 15.793Z",fill:"currentColor"}))}}),bn=he({name:"Checkmark",render(){return r("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 16 16"},r("g",{fill:"none"},r("path",{d:"M14.046 3.486a.75.75 0 0 1-.032 1.06l-7.93 7.474a.85.85 0 0 1-1.188-.022l-2.68-2.72a.75.75 0 1 1 1.068-1.053l2.234 2.267l7.468-7.038a.75.75 0 0 1 1.06.032z",fill:"currentColor"})))}}),Cn=he({name:"Empty",render(){return r("svg",{viewBox:"0 0 28 28",fill:"none",xmlns:"http://www.w3.org/2000/svg"},r("path",{d:"M26 7.5C26 11.0899 23.0899 14 19.5 14C15.9101 14 13 11.0899 13 7.5C13 3.91015 15.9101 1 19.5 1C23.0899 1 26 3.91015 26 7.5ZM16.8536 4.14645C16.6583 3.95118 16.3417 3.95118 16.1464 4.14645C15.9512 4.34171 15.9512 4.65829 16.1464 4.85355L18.7929 7.5L16.1464 10.1464C15.9512 10.3417 15.9512 10.6583 16.1464 10.8536C16.3417 11.0488 16.6583 11.0488 16.8536 10.8536L19.5 8.20711L22.1464 10.8536C22.3417 11.0488 22.6583 11.0488 22.8536 10.8536C23.0488 10.6583 23.0488 10.3417 22.8536 10.1464L20.2071 7.5L22.8536 4.85355C23.0488 4.65829 23.0488 4.34171 22.8536 4.14645C22.6583 3.95118 22.3417 3.95118 22.1464 4.14645L19.5 6.79289L16.8536 4.14645Z",fill:"currentColor"}),r("path",{d:"M25 22.75V12.5991C24.5572 13.0765 24.053 13.4961 23.5 13.8454V16H17.5L17.3982 16.0068C17.0322 16.0565 16.75 16.3703 16.75 16.75C16.75 18.2688 15.5188 19.5 14 19.5C12.4812 19.5 11.25 18.2688 11.25 16.75L11.2432 16.6482C11.1935 16.2822 10.8797 16 10.5 16H4.5V7.25C4.5 6.2835 5.2835 5.5 6.25 5.5H12.2696C12.4146 4.97463 12.6153 4.47237 12.865 4H6.25C4.45507 4 3 5.45507 3 7.25V22.75C3 24.5449 4.45507 26 6.25 26H21.75C23.5449 26 25 24.5449 25 22.75ZM4.5 22.75V17.5H9.81597L9.85751 17.7041C10.2905 19.5919 11.9808 21 14 21L14.215 20.9947C16.2095 20.8953 17.842 19.4209 18.184 17.5H23.5V22.75C23.5 23.7165 22.7165 24.5 21.75 24.5H6.25C5.2835 24.5 4.5 23.7165 4.5 22.75Z",fill:"currentColor"}))}}),Ut=he({name:"FastBackward",render(){return r("svg",{viewBox:"0 0 20 20",version:"1.1",xmlns:"http://www.w3.org/2000/svg"},r("g",{stroke:"none","stroke-width":"1",fill:"none","fill-rule":"evenodd"},r("g",{fill:"currentColor","fill-rule":"nonzero"},r("path",{d:"M8.73171,16.7949 C9.03264,17.0795 9.50733,17.0663 9.79196,16.7654 C10.0766,16.4644 10.0634,15.9897 9.76243,15.7051 L4.52339,10.75 L17.2471,10.75 C17.6613,10.75 17.9971,10.4142 17.9971,10 C17.9971,9.58579 17.6613,9.25 17.2471,9.25 L4.52112,9.25 L9.76243,4.29275 C10.0634,4.00812 10.0766,3.53343 9.79196,3.2325 C9.50733,2.93156 9.03264,2.91834 8.73171,3.20297 L2.31449,9.27241 C2.14819,9.4297 2.04819,9.62981 2.01448,9.8386 C2.00308,9.89058 1.99707,9.94459 1.99707,10 C1.99707,10.0576 2.00356,10.1137 2.01585,10.1675 C2.05084,10.3733 2.15039,10.5702 2.31449,10.7254 L8.73171,16.7949 Z"}))))}}),Kt=he({name:"FastForward",render(){return r("svg",{viewBox:"0 0 20 20",version:"1.1",xmlns:"http://www.w3.org/2000/svg"},r("g",{stroke:"none","stroke-width":"1",fill:"none","fill-rule":"evenodd"},r("g",{fill:"currentColor","fill-rule":"nonzero"},r("path",{d:"M11.2654,3.20511 C10.9644,2.92049 10.4897,2.93371 10.2051,3.23464 C9.92049,3.53558 9.93371,4.01027 10.2346,4.29489 L15.4737,9.25 L2.75,9.25 C2.33579,9.25 2,9.58579 2,10.0000012 C2,10.4142 2.33579,10.75 2.75,10.75 L15.476,10.75 L10.2346,15.7073 C9.93371,15.9919 9.92049,16.4666 10.2051,16.7675 C10.4897,17.0684 10.9644,17.0817 11.2654,16.797 L17.6826,10.7276 C17.8489,10.5703 17.9489,10.3702 17.9826,10.1614 C17.994,10.1094 18,10.0554 18,10.0000012 C18,9.94241 17.9935,9.88633 17.9812,9.83246 C17.9462,9.62667 17.8467,9.42976 17.6826,9.27455 L11.2654,3.20511 Z"}))))}}),qt=he({name:"Forward",render(){return r("svg",{viewBox:"0 0 20 20",fill:"none",xmlns:"http://www.w3.org/2000/svg"},r("path",{d:"M7.73271 4.20694C8.03263 3.92125 8.50737 3.93279 8.79306 4.23271L13.7944 9.48318C14.0703 9.77285 14.0703 10.2281 13.7944 10.5178L8.79306 15.7682C8.50737 16.0681 8.03263 16.0797 7.73271 15.794C7.43279 15.5083 7.42125 15.0336 7.70694 14.7336L12.2155 10.0005L7.70694 5.26729C7.42125 4.96737 7.43279 4.49264 7.73271 4.20694Z",fill:"currentColor"}))}}),Zt=he({name:"More",render(){return r("svg",{viewBox:"0 0 16 16",version:"1.1",xmlns:"http://www.w3.org/2000/svg"},r("g",{stroke:"none","stroke-width":"1",fill:"none","fill-rule":"evenodd"},r("g",{fill:"currentColor","fill-rule":"nonzero"},r("path",{d:"M4,7 C4.55228,7 5,7.44772 5,8 C5,8.55229 4.55228,9 4,9 C3.44772,9 3,8.55229 3,8 C3,7.44772 3.44772,7 4,7 Z M8,7 C8.55229,7 9,7.44772 9,8 C9,8.55229 8.55229,9 8,9 C7.44772,9 7,8.55229 7,8 C7,7.44772 7.44772,7 8,7 Z M12,7 C12.5523,7 13,7.44772 13,8 C13,8.55229 12.5523,9 12,9 C11.4477,9 11,8.55229 11,8 C11,7.44772 11.4477,7 12,7 Z"}))))}}),xn=he({props:{onFocus:Function,onBlur:Function},setup(e){return()=>r("div",{style:"width: 0; height: 0",tabindex:0,onFocus:e.onFocus,onBlur:e.onBlur})}}),wn={iconSizeTiny:"28px",iconSizeSmall:"34px",iconSizeMedium:"40px",iconSizeLarge:"46px",iconSizeHuge:"52px"};function yn(e){const{textColorDisabled:t,iconColor:o,textColor2:n,fontSizeTiny:a,fontSizeSmall:s,fontSizeMedium:d,fontSizeLarge:l,fontSizeHuge:u}=e;return Object.assign(Object.assign({},wn),{fontSizeTiny:a,fontSizeSmall:s,fontSizeMedium:d,fontSizeLarge:l,fontSizeHuge:u,textColor:t,iconColor:o,extraTextColor:n})}const vo={name:"Empty",common:Ae,self:yn},Sn=T("empty",`
 display: flex;
 flex-direction: column;
 align-items: center;
 font-size: var(--n-font-size);
`,[U("icon",`
 width: var(--n-icon-size);
 height: var(--n-icon-size);
 font-size: var(--n-icon-size);
 line-height: var(--n-icon-size);
 color: var(--n-icon-color);
 transition:
 color .3s var(--n-bezier);
 `,[ue("+",[U("description",`
 margin-top: 8px;
 `)])]),U("description",`
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
 `),U("extra",`
 text-align: center;
 transition: color .3s var(--n-bezier);
 margin-top: 12px;
 color: var(--n-extra-text-color);
 `)]),zn=Object.assign(Object.assign({},Ce.props),{description:String,showDescription:{type:Boolean,default:!0},showIcon:{type:Boolean,default:!0},size:{type:String,default:"medium"},renderIcon:Function}),kn=he({name:"Empty",props:zn,slots:Object,setup(e){const{mergedClsPrefixRef:t,inlineThemeDisabled:o,mergedComponentPropsRef:n}=Oe(e),a=Ce("Empty","-empty",Sn,vo,e,t),{localeRef:s}=Mt("Empty"),d=R(()=>{var C,v,P;return(C=e.description)!==null&&C!==void 0?C:(P=(v=n?.value)===null||v===void 0?void 0:v.Empty)===null||P===void 0?void 0:P.description}),l=R(()=>{var C,v;return((v=(C=n?.value)===null||C===void 0?void 0:C.Empty)===null||v===void 0?void 0:v.renderIcon)||(()=>r(Cn,null))}),u=R(()=>{const{size:C}=e,{common:{cubicBezierEaseInOut:v},self:{[V("iconSize",C)]:P,[V("fontSize",C)]:S,textColor:h,iconColor:f,extraTextColor:y}}=a.value;return{"--n-icon-size":P,"--n-font-size":S,"--n-bezier":v,"--n-text-color":h,"--n-icon-color":f,"--n-extra-text-color":y}}),c=o?je("empty",R(()=>{let C="";const{size:v}=e;return C+=v[0],C}),u,e):void 0;return{mergedClsPrefix:t,mergedRenderIcon:l,localizedDescription:R(()=>d.value||s.value.description),cssVars:o?void 0:u,themeClass:c?.themeClass,onRender:c?.onRender}},render(){const{$slots:e,mergedClsPrefix:t,onRender:o}=this;return o?.(),r("div",{class:[`${t}-empty`,this.themeClass],style:this.cssVars},this.showIcon?r("div",{class:`${t}-empty__icon`},e.icon?e.icon():r(Me,{clsPrefix:t},{default:this.mergedRenderIcon})):null,this.showDescription?r("div",{class:`${t}-empty__description`},e.default?e.default():this.localizedDescription):null,e.extra?r("div",{class:`${t}-empty__extra`},e.extra()):null)}}),Fn={height:"calc(var(--n-option-height) * 7.6)",paddingTiny:"4px 0",paddingSmall:"4px 0",paddingMedium:"4px 0",paddingLarge:"4px 0",paddingHuge:"4px 0",optionPaddingTiny:"0 12px",optionPaddingSmall:"0 12px",optionPaddingMedium:"0 12px",optionPaddingLarge:"0 12px",optionPaddingHuge:"0 12px",loadingSize:"18px"};function Pn(e){const{borderRadius:t,popoverColor:o,textColor3:n,dividerColor:a,textColor2:s,primaryColorPressed:d,textColorDisabled:l,primaryColor:u,opacityDisabled:c,hoverColor:C,fontSizeTiny:v,fontSizeSmall:P,fontSizeMedium:S,fontSizeLarge:h,fontSizeHuge:f,heightTiny:y,heightSmall:F,heightMedium:z,heightLarge:N,heightHuge:K}=e;return Object.assign(Object.assign({},Fn),{optionFontSizeTiny:v,optionFontSizeSmall:P,optionFontSizeMedium:S,optionFontSizeLarge:h,optionFontSizeHuge:f,optionHeightTiny:y,optionHeightSmall:F,optionHeightMedium:z,optionHeightLarge:N,optionHeightHuge:K,borderRadius:t,color:o,groupHeaderTextColor:n,actionDividerColor:a,optionTextColor:s,optionTextColorPressed:d,optionTextColorDisabled:l,optionTextColorActive:u,optionOpacityDisabled:c,optionCheckColor:u,optionColorPending:C,optionColorActive:"rgba(0, 0, 0, 0)",optionColorActivePending:C,actionTextColor:s,loadingColor:u})}const It=tt({name:"InternalSelectMenu",common:Ae,peers:{Scrollbar:Qo,Empty:vo},self:Pn}),Gt=he({name:"NBaseSelectGroupHeader",props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0}},setup(){const{renderLabelRef:e,renderOptionRef:t,labelFieldRef:o,nodePropsRef:n}=ut(Rt);return{labelField:o,nodeProps:n,renderLabel:e,renderOption:t}},render(){const{clsPrefix:e,renderLabel:t,renderOption:o,nodeProps:n,tmNode:{rawNode:a}}=this,s=n?.(a),d=t?t(a,!1):We(a[this.labelField],a,!1),l=r("div",Object.assign({},s,{class:[`${e}-base-select-group-header`,s?.class]}),d);return a.render?a.render({node:l,option:a}):o?o({node:l,option:a,selected:!1}):l}});function Mn(e,t){return r(ro,{name:"fade-in-scale-up-transition"},{default:()=>e?r(Me,{clsPrefix:t,class:`${t}-base-select-option__check`},{default:()=>r(bn)}):null})}const Jt=he({name:"NBaseSelectOption",props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0}},setup(e){const{valueRef:t,pendingTmNodeRef:o,multipleRef:n,valueSetRef:a,renderLabelRef:s,renderOptionRef:d,labelFieldRef:l,valueFieldRef:u,showCheckmarkRef:c,nodePropsRef:C,handleOptionClick:v,handleOptionMouseEnter:P}=ut(Rt),S=Ee(()=>{const{value:F}=o;return F?e.tmNode.key===F.key:!1});function h(F){const{tmNode:z}=e;z.disabled||v(F,z)}function f(F){const{tmNode:z}=e;z.disabled||P(F,z)}function y(F){const{tmNode:z}=e,{value:N}=S;z.disabled||N||P(F,z)}return{multiple:n,isGrouped:Ee(()=>{const{tmNode:F}=e,{parent:z}=F;return z&&z.rawNode.type==="group"}),showCheckmark:c,nodeProps:C,isPending:S,isSelected:Ee(()=>{const{value:F}=t,{value:z}=n;if(F===null)return!1;const N=e.tmNode.rawNode[u.value];if(z){const{value:K}=a;return K.has(N)}else return F===N}),labelField:l,renderLabel:s,renderOption:d,handleMouseMove:y,handleMouseEnter:f,handleClick:h}},render(){const{clsPrefix:e,tmNode:{rawNode:t},isSelected:o,isPending:n,isGrouped:a,showCheckmark:s,nodeProps:d,renderOption:l,renderLabel:u,handleClick:c,handleMouseEnter:C,handleMouseMove:v}=this,P=Mn(o,e),S=u?[u(t,o),s&&P]:[We(t[this.labelField],t,o),s&&P],h=d?.(t),f=r("div",Object.assign({},h,{class:[`${e}-base-select-option`,t.class,h?.class,{[`${e}-base-select-option--disabled`]:t.disabled,[`${e}-base-select-option--selected`]:o,[`${e}-base-select-option--grouped`]:a,[`${e}-base-select-option--pending`]:n,[`${e}-base-select-option--show-checkmark`]:s}],style:[h?.style||"",t.style||""],onClick:Xe([c,h?.onClick]),onMouseenter:Xe([C,h?.onMouseenter]),onMousemove:Xe([v,h?.onMousemove])}),r("div",{class:`${e}-base-select-option__content`},S));return t.render?t.render({node:f,option:t,selected:o}):l?l({node:f,option:t,selected:o}):f}}),Rn=T("base-select-menu",`
 line-height: 1.5;
 outline: none;
 z-index: 0;
 position: relative;
 border-radius: var(--n-border-radius);
 transition:
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
 background-color: var(--n-color);
`,[T("scrollbar",`
 max-height: var(--n-height);
 `),T("virtual-list",`
 max-height: var(--n-height);
 `),T("base-select-option",`
 min-height: var(--n-option-height);
 font-size: var(--n-option-font-size);
 display: flex;
 align-items: center;
 `,[U("content",`
 z-index: 1;
 white-space: nowrap;
 text-overflow: ellipsis;
 overflow: hidden;
 `)]),T("base-select-group-header",`
 min-height: var(--n-option-height);
 font-size: .93em;
 display: flex;
 align-items: center;
 `),T("base-select-menu-option-wrapper",`
 position: relative;
 width: 100%;
 `),U("loading, empty",`
 display: flex;
 padding: 12px 32px;
 flex: 1;
 justify-content: center;
 `),U("loading",`
 color: var(--n-loading-color);
 font-size: var(--n-loading-size);
 `),U("header",`
 padding: 8px var(--n-option-padding-left);
 font-size: var(--n-option-font-size);
 transition: 
 color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 border-bottom: 1px solid var(--n-action-divider-color);
 color: var(--n-action-text-color);
 `),U("action",`
 padding: 8px var(--n-option-padding-left);
 font-size: var(--n-option-font-size);
 transition: 
 color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 border-top: 1px solid var(--n-action-divider-color);
 color: var(--n-action-text-color);
 `),T("base-select-group-header",`
 position: relative;
 cursor: default;
 padding: var(--n-option-padding);
 color: var(--n-group-header-text-color);
 `),T("base-select-option",`
 cursor: pointer;
 position: relative;
 padding: var(--n-option-padding);
 transition:
 color .3s var(--n-bezier),
 opacity .3s var(--n-bezier);
 box-sizing: border-box;
 color: var(--n-option-text-color);
 opacity: 1;
 `,[Q("show-checkmark",`
 padding-right: calc(var(--n-option-padding-right) + 20px);
 `),ue("&::before",`
 content: "";
 position: absolute;
 left: 4px;
 right: 4px;
 top: 0;
 bottom: 0;
 border-radius: var(--n-border-radius);
 transition: background-color .3s var(--n-bezier);
 `),ue("&:active",`
 color: var(--n-option-text-color-pressed);
 `),Q("grouped",`
 padding-left: calc(var(--n-option-padding-left) * 1.5);
 `),Q("pending",[ue("&::before",`
 background-color: var(--n-option-color-pending);
 `)]),Q("selected",`
 color: var(--n-option-text-color-active);
 `,[ue("&::before",`
 background-color: var(--n-option-color-active);
 `),Q("pending",[ue("&::before",`
 background-color: var(--n-option-color-active-pending);
 `)])]),Q("disabled",`
 cursor: not-allowed;
 `,[Re("selected",`
 color: var(--n-option-text-color-disabled);
 `),Q("selected",`
 opacity: var(--n-option-opacity-disabled);
 `)]),U("check",`
 font-size: 16px;
 position: absolute;
 right: calc(var(--n-option-padding-right) - 4px);
 top: calc(50% - 7px);
 color: var(--n-option-check-color);
 transition: color .3s var(--n-bezier);
 `,[io({enterScale:"0.5"})])])]),go=he({name:"InternalSelectMenu",props:Object.assign(Object.assign({},Ce.props),{clsPrefix:{type:String,required:!0},scrollable:{type:Boolean,default:!0},treeMate:{type:Object,required:!0},multiple:Boolean,size:{type:String,default:"medium"},value:{type:[String,Number,Array],default:null},autoPending:Boolean,virtualScroll:{type:Boolean,default:!0},show:{type:Boolean,default:!0},labelField:{type:String,default:"label"},valueField:{type:String,default:"value"},loading:Boolean,focusable:Boolean,renderLabel:Function,renderOption:Function,nodeProps:Function,showCheckmark:{type:Boolean,default:!0},onMousedown:Function,onScroll:Function,onFocus:Function,onBlur:Function,onKeyup:Function,onKeydown:Function,onTabOut:Function,onMouseenter:Function,onMouseleave:Function,onResize:Function,resetMenuOnOptionsChange:{type:Boolean,default:!0},inlineThemeDisabled:Boolean,scrollbarProps:Object,onToggle:Function}),setup(e){const{mergedClsPrefixRef:t,mergedRtlRef:o,mergedComponentPropsRef:n}=Oe(e),a=ct("InternalSelectMenu",o,t),s=Ce("InternalSelectMenu","-internal-select-menu",Rn,It,e,ae(e,"clsPrefix")),d=O(null),l=O(null),u=O(null),c=R(()=>e.treeMate.getFlattenedNodes()),C=R(()=>Yo(c.value)),v=O(null);function P(){const{treeMate:g}=e;let x=null;const{value:X}=e;X===null?x=g.getFirstAvailableNode():(e.multiple?x=g.getNode((X||[])[(X||[]).length-1]):x=g.getNode(X),(!x||x.disabled)&&(x=g.getFirstAvailableNode())),E(x||null)}function S(){const{value:g}=v;g&&!e.treeMate.getNode(g.key)&&(v.value=null)}let h;Ie(()=>e.show,g=>{g?h=Ie(()=>e.treeMate,()=>{e.resetMenuOnOptionsChange?(e.autoPending?P():S(),et(L)):S()},{immediate:!0}):h?.()},{immediate:!0}),no(()=>{h?.()});const f=R(()=>Pt(s.value.self[V("optionHeight",e.size)])),y=R(()=>Ue(s.value.self[V("padding",e.size)])),F=R(()=>e.multiple&&Array.isArray(e.value)?new Set(e.value):new Set),z=R(()=>{const g=c.value;return g&&g.length===0}),N=R(()=>{var g,x;return(x=(g=n?.value)===null||g===void 0?void 0:g.Select)===null||x===void 0?void 0:x.renderEmpty});function K(g){const{onToggle:x}=e;x&&x(g)}function Z(g){const{onScroll:x}=e;x&&x(g)}function W(g){var x;(x=u.value)===null||x===void 0||x.sync(),Z(g)}function re(){var g;(g=u.value)===null||g===void 0||g.sync()}function ee(){const{value:g}=v;return g||null}function fe(g,x){x.disabled||E(x,!1)}function pe(g,x){x.disabled||K(x)}function oe(g){var x;Te(g,"action")||(x=e.onKeyup)===null||x===void 0||x.call(e,g)}function ne(g){var x;Te(g,"action")||(x=e.onKeydown)===null||x===void 0||x.call(e,g)}function m(g){var x;(x=e.onMousedown)===null||x===void 0||x.call(e,g),!e.focusable&&g.preventDefault()}function M(){const{value:g}=v;g&&E(g.getNext({loop:!0}),!0)}function H(){const{value:g}=v;g&&E(g.getPrev({loop:!0}),!0)}function E(g,x=!1){v.value=g,x&&L()}function L(){var g,x;const X=v.value;if(!X)return;const ve=C.value(X.key);ve!==null&&(e.virtualScroll?(g=l.value)===null||g===void 0||g.scrollTo({index:ve}):(x=u.value)===null||x===void 0||x.scrollTo({index:ve,elSize:f.value}))}function G(g){var x,X;!((x=d.value)===null||x===void 0)&&x.contains(g.target)&&((X=e.onFocus)===null||X===void 0||X.call(e,g))}function q(g){var x,X;!((x=d.value)===null||x===void 0)&&x.contains(g.relatedTarget)||(X=e.onBlur)===null||X===void 0||X.call(e,g)}Ye(Rt,{handleOptionMouseEnter:fe,handleOptionClick:pe,valueSetRef:F,pendingTmNodeRef:v,nodePropsRef:ae(e,"nodeProps"),showCheckmarkRef:ae(e,"showCheckmark"),multipleRef:ae(e,"multiple"),valueRef:ae(e,"value"),renderLabelRef:ae(e,"renderLabel"),renderOptionRef:ae(e,"renderOption"),labelFieldRef:ae(e,"labelField"),valueFieldRef:ae(e,"valueField")}),Ye(en,d),ht(()=>{const{value:g}=u;g&&g.sync()});const _=R(()=>{const{size:g}=e,{common:{cubicBezierEaseInOut:x},self:{height:X,borderRadius:ve,color:ge,groupHeaderTextColor:de,actionDividerColor:p,optionTextColorPressed:B,optionTextColor:me,optionTextColorDisabled:be,optionTextColorActive:Se,optionOpacityDisabled:Be,optionCheckColor:ze,actionTextColor:ke,optionColorPending:$e,optionColorActive:_e,loadingColor:Le,loadingSize:Fe,optionColorActivePending:Pe,[V("optionFontSize",g)]:xe,[V("optionHeight",g)]:b,[V("optionPadding",g)]:k}}=s.value;return{"--n-height":X,"--n-action-divider-color":p,"--n-action-text-color":ke,"--n-bezier":x,"--n-border-radius":ve,"--n-color":ge,"--n-option-font-size":xe,"--n-group-header-text-color":de,"--n-option-check-color":ze,"--n-option-color-pending":$e,"--n-option-color-active":_e,"--n-option-color-active-pending":Pe,"--n-option-height":b,"--n-option-opacity-disabled":Be,"--n-option-text-color":me,"--n-option-text-color-active":Se,"--n-option-text-color-disabled":be,"--n-option-text-color-pressed":B,"--n-option-padding":k,"--n-option-padding-left":Ue(k,"left"),"--n-option-padding-right":Ue(k,"right"),"--n-loading-color":Le,"--n-loading-size":Fe}}),{inlineThemeDisabled:Y}=e,te=Y?je("internal-select-menu",R(()=>e.size[0]),_,e):void 0,se={selfRef:d,next:M,prev:H,getPendingTmNode:ee};return fo(d,e.onResize),Object.assign({mergedTheme:s,mergedClsPrefix:t,rtlEnabled:a,virtualListRef:l,scrollbarRef:u,itemSize:f,padding:y,flattenedNodes:c,empty:z,mergedRenderEmpty:N,virtualListContainer(){const{value:g}=l;return g?.listElRef},virtualListContent(){const{value:g}=l;return g?.itemsElRef},doScroll:Z,handleFocusin:G,handleFocusout:q,handleKeyUp:oe,handleKeyDown:ne,handleMouseDown:m,handleVirtualListResize:re,handleVirtualListScroll:W,cssVars:Y?void 0:_,themeClass:te?.themeClass,onRender:te?.onRender},se)},render(){const{$slots:e,virtualScroll:t,clsPrefix:o,mergedTheme:n,themeClass:a,onRender:s}=this;return s?.(),r("div",{ref:"selfRef",tabindex:this.focusable?0:-1,class:[`${o}-base-select-menu`,`${o}-base-select-menu--${this.size}-size`,this.rtlEnabled&&`${o}-base-select-menu--rtl`,a,this.multiple&&`${o}-base-select-menu--multiple`],style:this.cssVars,onFocusin:this.handleFocusin,onFocusout:this.handleFocusout,onKeyup:this.handleKeyUp,onKeydown:this.handleKeyDown,onMousedown:this.handleMouseDown,onMouseenter:this.onMouseenter,onMouseleave:this.onMouseleave},lt(e.header,d=>d&&r("div",{class:`${o}-base-select-menu__header`,"data-header":!0,key:"header"},d)),this.loading?r("div",{class:`${o}-base-select-menu__loading`},r(jo,{clsPrefix:o,strokeWidth:20})):this.empty?r("div",{class:`${o}-base-select-menu__empty`,"data-empty":!0},to(e.empty,()=>{var d;return[((d=this.mergedRenderEmpty)===null||d===void 0?void 0:d.call(this))||r(kn,{theme:n.peers.Empty,themeOverrides:n.peerOverrides.Empty,size:this.size})]})):r(Xo,Object.assign({ref:"scrollbarRef",theme:n.peers.Scrollbar,themeOverrides:n.peerOverrides.Scrollbar,scrollable:this.scrollable,container:t?this.virtualListContainer:void 0,content:t?this.virtualListContent:void 0,onScroll:t?void 0:this.doScroll},this.scrollbarProps),{default:()=>t?r(pn,{ref:"virtualListRef",class:`${o}-virtual-list`,items:this.flattenedNodes,itemSize:this.itemSize,showScrollbar:!1,paddingTop:this.padding.top,paddingBottom:this.padding.bottom,onResize:this.handleVirtualListResize,onScroll:this.handleVirtualListScroll,itemResizable:!0},{default:({item:d})=>d.isGroup?r(Gt,{key:d.key,clsPrefix:o,tmNode:d}):d.ignored?null:r(Jt,{clsPrefix:o,key:d.key,tmNode:d})}):r("div",{class:`${o}-base-select-menu-option-wrapper`,style:{paddingTop:this.padding.top,paddingBottom:this.padding.bottom}},this.flattenedNodes.map(d=>d.isGroup?r(Gt,{key:d.key,clsPrefix:o,tmNode:d}):r(Jt,{clsPrefix:o,key:d.key,tmNode:d})))}),lt(e.action,d=>d&&[r("div",{class:`${o}-base-select-menu__action`,"data-action":!0,key:"action"},d),r(xn,{onFocus:this.onTabOut,key:"focus-detector"})]))}}),In={closeIconSizeTiny:"12px",closeIconSizeSmall:"12px",closeIconSizeMedium:"14px",closeIconSizeLarge:"14px",closeSizeTiny:"16px",closeSizeSmall:"16px",closeSizeMedium:"18px",closeSizeLarge:"18px",padding:"0 7px",closeMargin:"0 0 0 4px"};function Tn(e){const{textColor2:t,primaryColorHover:o,primaryColorPressed:n,primaryColor:a,infoColor:s,successColor:d,warningColor:l,errorColor:u,baseColor:c,borderColor:C,opacityDisabled:v,tagColor:P,closeIconColor:S,closeIconColorHover:h,closeIconColorPressed:f,borderRadiusSmall:y,fontSizeMini:F,fontSizeTiny:z,fontSizeSmall:N,fontSizeMedium:K,heightMini:Z,heightTiny:W,heightSmall:re,heightMedium:ee,closeColorHover:fe,closeColorPressed:pe,buttonColor2Hover:oe,buttonColor2Pressed:ne,fontWeightStrong:m}=e;return Object.assign(Object.assign({},In),{closeBorderRadius:y,heightTiny:Z,heightSmall:W,heightMedium:re,heightLarge:ee,borderRadius:y,opacityDisabled:v,fontSizeTiny:F,fontSizeSmall:z,fontSizeMedium:N,fontSizeLarge:K,fontWeightStrong:m,textColorCheckable:t,textColorHoverCheckable:t,textColorPressedCheckable:t,textColorChecked:c,colorCheckable:"#0000",colorHoverCheckable:oe,colorPressedCheckable:ne,colorChecked:a,colorCheckedHover:o,colorCheckedPressed:n,border:`1px solid ${C}`,textColor:t,color:P,colorBordered:"rgb(250, 250, 252)",closeIconColor:S,closeIconColorHover:h,closeIconColorPressed:f,closeColorHover:fe,closeColorPressed:pe,borderPrimary:`1px solid ${J(a,{alpha:.3})}`,textColorPrimary:a,colorPrimary:J(a,{alpha:.12}),colorBorderedPrimary:J(a,{alpha:.1}),closeIconColorPrimary:a,closeIconColorHoverPrimary:a,closeIconColorPressedPrimary:a,closeColorHoverPrimary:J(a,{alpha:.12}),closeColorPressedPrimary:J(a,{alpha:.18}),borderInfo:`1px solid ${J(s,{alpha:.3})}`,textColorInfo:s,colorInfo:J(s,{alpha:.12}),colorBorderedInfo:J(s,{alpha:.1}),closeIconColorInfo:s,closeIconColorHoverInfo:s,closeIconColorPressedInfo:s,closeColorHoverInfo:J(s,{alpha:.12}),closeColorPressedInfo:J(s,{alpha:.18}),borderSuccess:`1px solid ${J(d,{alpha:.3})}`,textColorSuccess:d,colorSuccess:J(d,{alpha:.12}),colorBorderedSuccess:J(d,{alpha:.1}),closeIconColorSuccess:d,closeIconColorHoverSuccess:d,closeIconColorPressedSuccess:d,closeColorHoverSuccess:J(d,{alpha:.12}),closeColorPressedSuccess:J(d,{alpha:.18}),borderWarning:`1px solid ${J(l,{alpha:.35})}`,textColorWarning:l,colorWarning:J(l,{alpha:.15}),colorBorderedWarning:J(l,{alpha:.12}),closeIconColorWarning:l,closeIconColorHoverWarning:l,closeIconColorPressedWarning:l,closeColorHoverWarning:J(l,{alpha:.12}),closeColorPressedWarning:J(l,{alpha:.18}),borderError:`1px solid ${J(u,{alpha:.23})}`,textColorError:u,colorError:J(u,{alpha:.1}),colorBorderedError:J(u,{alpha:.08}),closeIconColorError:u,closeIconColorHoverError:u,closeIconColorPressedError:u,closeColorHoverError:J(u,{alpha:.12}),closeColorPressedError:J(u,{alpha:.18})})}const On={common:Ae,self:Tn},Bn={color:Object,type:{type:String,default:"default"},round:Boolean,size:String,closable:Boolean,disabled:{type:Boolean,default:void 0}},$n=T("tag",`
 --n-close-margin: var(--n-close-margin-top) var(--n-close-margin-right) var(--n-close-margin-bottom) var(--n-close-margin-left);
 white-space: nowrap;
 position: relative;
 box-sizing: border-box;
 cursor: default;
 display: inline-flex;
 align-items: center;
 flex-wrap: nowrap;
 padding: var(--n-padding);
 border-radius: var(--n-border-radius);
 color: var(--n-text-color);
 background-color: var(--n-color);
 transition: 
 border-color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier),
 opacity .3s var(--n-bezier);
 line-height: 1;
 height: var(--n-height);
 font-size: var(--n-font-size);
`,[Q("strong",`
 font-weight: var(--n-font-weight-strong);
 `),U("border",`
 pointer-events: none;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 border-radius: inherit;
 border: var(--n-border);
 transition: border-color .3s var(--n-bezier);
 `),U("icon",`
 display: flex;
 margin: 0 4px 0 0;
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 font-size: var(--n-avatar-size-override);
 `),U("avatar",`
 display: flex;
 margin: 0 6px 0 0;
 `),U("close",`
 margin: var(--n-close-margin);
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `),Q("round",`
 padding: 0 calc(var(--n-height) / 3);
 border-radius: calc(var(--n-height) / 2);
 `,[U("icon",`
 margin: 0 4px 0 calc((var(--n-height) - 8px) / -2);
 `),U("avatar",`
 margin: 0 6px 0 calc((var(--n-height) - 8px) / -2);
 `),Q("closable",`
 padding: 0 calc(var(--n-height) / 4) 0 calc(var(--n-height) / 3);
 `)]),Q("icon, avatar",[Q("round",`
 padding: 0 calc(var(--n-height) / 3) 0 calc(var(--n-height) / 2);
 `)]),Q("disabled",`
 cursor: not-allowed !important;
 opacity: var(--n-opacity-disabled);
 `),Q("checkable",`
 cursor: pointer;
 box-shadow: none;
 color: var(--n-text-color-checkable);
 background-color: var(--n-color-checkable);
 `,[Re("disabled",[ue("&:hover","background-color: var(--n-color-hover-checkable);",[Re("checked","color: var(--n-text-color-hover-checkable);")]),ue("&:active","background-color: var(--n-color-pressed-checkable);",[Re("checked","color: var(--n-text-color-pressed-checkable);")])]),Q("checked",`
 color: var(--n-text-color-checked);
 background-color: var(--n-color-checked);
 `,[Re("disabled",[ue("&:hover","background-color: var(--n-color-checked-hover);"),ue("&:active","background-color: var(--n-color-checked-pressed);")])])])]),_n=Object.assign(Object.assign(Object.assign({},Ce.props),Bn),{bordered:{type:Boolean,default:void 0},checked:Boolean,checkable:Boolean,strong:Boolean,triggerClickOnClose:Boolean,onClose:[Array,Function],onMouseenter:Function,onMouseleave:Function,"onUpdate:checked":Function,onUpdateChecked:Function,internalCloseFocusable:{type:Boolean,default:!0},internalCloseIsButtonTag:{type:Boolean,default:!0},onCheckedChange:Function}),Ln=oo("n-tag"),zt=he({name:"Tag",props:_n,slots:Object,setup(e){const t=O(null),{mergedBorderedRef:o,mergedClsPrefixRef:n,inlineThemeDisabled:a,mergedRtlRef:s,mergedComponentPropsRef:d}=Oe(e),l=R(()=>{var f,y;return e.size||((y=(f=d?.value)===null||f===void 0?void 0:f.Tag)===null||y===void 0?void 0:y.size)||"medium"}),u=Ce("Tag","-tag",$n,On,e,n);Ye(Ln,{roundRef:ae(e,"round")});function c(){if(!e.disabled&&e.checkable){const{checked:f,onCheckedChange:y,onUpdateChecked:F,"onUpdate:checked":z}=e;F&&F(!f),z&&z(!f),y&&y(!f)}}function C(f){if(e.triggerClickOnClose||f.stopPropagation(),!e.disabled){const{onClose:y}=e;y&&le(y,f)}}const v={setTextContent(f){const{value:y}=t;y&&(y.textContent=f)}},P=ct("Tag",s,n),S=R(()=>{const{type:f,color:{color:y,textColor:F}={}}=e,z=l.value,{common:{cubicBezierEaseInOut:N},self:{padding:K,closeMargin:Z,borderRadius:W,opacityDisabled:re,textColorCheckable:ee,textColorHoverCheckable:fe,textColorPressedCheckable:pe,textColorChecked:oe,colorCheckable:ne,colorHoverCheckable:m,colorPressedCheckable:M,colorChecked:H,colorCheckedHover:E,colorCheckedPressed:L,closeBorderRadius:G,fontWeightStrong:q,[V("colorBordered",f)]:_,[V("closeSize",z)]:Y,[V("closeIconSize",z)]:te,[V("fontSize",z)]:se,[V("height",z)]:g,[V("color",f)]:x,[V("textColor",f)]:X,[V("border",f)]:ve,[V("closeIconColor",f)]:ge,[V("closeIconColorHover",f)]:de,[V("closeIconColorPressed",f)]:p,[V("closeColorHover",f)]:B,[V("closeColorPressed",f)]:me}}=u.value,be=Ue(Z);return{"--n-font-weight-strong":q,"--n-avatar-size-override":`calc(${g} - 8px)`,"--n-bezier":N,"--n-border-radius":W,"--n-border":ve,"--n-close-icon-size":te,"--n-close-color-pressed":me,"--n-close-color-hover":B,"--n-close-border-radius":G,"--n-close-icon-color":ge,"--n-close-icon-color-hover":de,"--n-close-icon-color-pressed":p,"--n-close-icon-color-disabled":ge,"--n-close-margin-top":be.top,"--n-close-margin-right":be.right,"--n-close-margin-bottom":be.bottom,"--n-close-margin-left":be.left,"--n-close-size":Y,"--n-color":y||(o.value?_:x),"--n-color-checkable":ne,"--n-color-checked":H,"--n-color-checked-hover":E,"--n-color-checked-pressed":L,"--n-color-hover-checkable":m,"--n-color-pressed-checkable":M,"--n-font-size":se,"--n-height":g,"--n-opacity-disabled":re,"--n-padding":K,"--n-text-color":F||X,"--n-text-color-checkable":ee,"--n-text-color-checked":oe,"--n-text-color-hover-checkable":fe,"--n-text-color-pressed-checkable":pe}}),h=a?je("tag",R(()=>{let f="";const{type:y,color:{color:F,textColor:z}={}}=e;return f+=y[0],f+=l.value[0],F&&(f+=`a${Bt(F)}`),z&&(f+=`b${Bt(z)}`),o.value&&(f+="c"),f}),S,e):void 0;return Object.assign(Object.assign({},v),{rtlEnabled:P,mergedClsPrefix:n,contentRef:t,mergedBordered:o,handleClick:c,handleCloseClick:C,cssVars:a?void 0:S,themeClass:h?.themeClass,onRender:h?.onRender})},render(){var e,t;const{mergedClsPrefix:o,rtlEnabled:n,closable:a,color:{borderColor:s}={},round:d,onRender:l,$slots:u}=this;l?.();const c=lt(u.avatar,v=>v&&r("div",{class:`${o}-tag__avatar`},v)),C=lt(u.icon,v=>v&&r("div",{class:`${o}-tag__icon`},v));return r("div",{class:[`${o}-tag`,this.themeClass,{[`${o}-tag--rtl`]:n,[`${o}-tag--strong`]:this.strong,[`${o}-tag--disabled`]:this.disabled,[`${o}-tag--checkable`]:this.checkable,[`${o}-tag--checked`]:this.checkable&&this.checked,[`${o}-tag--round`]:d,[`${o}-tag--avatar`]:c,[`${o}-tag--icon`]:C,[`${o}-tag--closable`]:a}],style:this.cssVars,onClick:this.handleClick,onMouseenter:this.onMouseenter,onMouseleave:this.onMouseleave},C||c,r("span",{class:`${o}-tag__content`,ref:"contentRef"},(t=(e=this.$slots).default)===null||t===void 0?void 0:t.call(e)),!this.checkable&&a?r(tn,{clsPrefix:o,class:`${o}-tag__close`,disabled:this.disabled,onClick:this.handleCloseClick,focusable:this.internalCloseFocusable,round:d,isButtonTag:this.internalCloseIsButtonTag,absolute:!0}):null,!this.checkable&&this.mergedBordered?r("div",{class:`${o}-tag__border`,style:{borderColor:s}}):null)}}),En={paddingSingle:"0 26px 0 12px",paddingMultiple:"3px 26px 0 12px",clearSize:"16px",arrowSize:"16px"};function An(e){const{borderRadius:t,textColor2:o,textColorDisabled:n,inputColor:a,inputColorDisabled:s,primaryColor:d,primaryColorHover:l,warningColor:u,warningColorHover:c,errorColor:C,errorColorHover:v,borderColor:P,iconColor:S,iconColorDisabled:h,clearColor:f,clearColorHover:y,clearColorPressed:F,placeholderColor:z,placeholderColorDisabled:N,fontSizeTiny:K,fontSizeSmall:Z,fontSizeMedium:W,fontSizeLarge:re,heightTiny:ee,heightSmall:fe,heightMedium:pe,heightLarge:oe,fontWeight:ne}=e;return Object.assign(Object.assign({},En),{fontSizeTiny:K,fontSizeSmall:Z,fontSizeMedium:W,fontSizeLarge:re,heightTiny:ee,heightSmall:fe,heightMedium:pe,heightLarge:oe,borderRadius:t,fontWeight:ne,textColor:o,textColorDisabled:n,placeholderColor:z,placeholderColorDisabled:N,color:a,colorDisabled:s,colorActive:a,border:`1px solid ${P}`,borderHover:`1px solid ${l}`,borderActive:`1px solid ${d}`,borderFocus:`1px solid ${l}`,boxShadowHover:"none",boxShadowActive:`0 0 0 2px ${J(d,{alpha:.2})}`,boxShadowFocus:`0 0 0 2px ${J(d,{alpha:.2})}`,caretColor:d,arrowColor:S,arrowColorDisabled:h,loadingColor:d,borderWarning:`1px solid ${u}`,borderHoverWarning:`1px solid ${c}`,borderActiveWarning:`1px solid ${u}`,borderFocusWarning:`1px solid ${c}`,boxShadowHoverWarning:"none",boxShadowActiveWarning:`0 0 0 2px ${J(u,{alpha:.2})}`,boxShadowFocusWarning:`0 0 0 2px ${J(u,{alpha:.2})}`,colorActiveWarning:a,caretColorWarning:u,borderError:`1px solid ${C}`,borderHoverError:`1px solid ${v}`,borderActiveError:`1px solid ${C}`,borderFocusError:`1px solid ${v}`,boxShadowHoverError:"none",boxShadowActiveError:`0 0 0 2px ${J(C,{alpha:.2})}`,boxShadowFocusError:`0 0 0 2px ${J(C,{alpha:.2})}`,colorActiveError:a,caretColorError:C,clearColor:f,clearColorHover:y,clearColorPressed:F})}const po=tt({name:"InternalSelection",common:Ae,peers:{Popover:lo},self:An}),jn=ue([T("base-selection",`
 --n-padding-single: var(--n-padding-single-top) var(--n-padding-single-right) var(--n-padding-single-bottom) var(--n-padding-single-left);
 --n-padding-multiple: var(--n-padding-multiple-top) var(--n-padding-multiple-right) var(--n-padding-multiple-bottom) var(--n-padding-multiple-left);
 position: relative;
 z-index: auto;
 box-shadow: none;
 width: 100%;
 max-width: 100%;
 display: inline-block;
 vertical-align: bottom;
 border-radius: var(--n-border-radius);
 min-height: var(--n-height);
 line-height: 1.5;
 font-size: var(--n-font-size);
 `,[T("base-loading",`
 color: var(--n-loading-color);
 `),T("base-selection-tags","min-height: var(--n-height);"),U("border, state-border",`
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 pointer-events: none;
 border: var(--n-border);
 border-radius: inherit;
 transition:
 box-shadow .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `),U("state-border",`
 z-index: 1;
 border-color: #0000;
 `),T("base-suffix",`
 cursor: pointer;
 position: absolute;
 top: 50%;
 transform: translateY(-50%);
 right: 10px;
 `,[U("arrow",`
 font-size: var(--n-arrow-size);
 color: var(--n-arrow-color);
 transition: color .3s var(--n-bezier);
 `)]),T("base-selection-overlay",`
 display: flex;
 align-items: center;
 white-space: nowrap;
 pointer-events: none;
 position: absolute;
 top: 0;
 right: 0;
 bottom: 0;
 left: 0;
 padding: var(--n-padding-single);
 transition: color .3s var(--n-bezier);
 `,[U("wrapper",`
 flex-basis: 0;
 flex-grow: 1;
 overflow: hidden;
 text-overflow: ellipsis;
 `)]),T("base-selection-placeholder",`
 color: var(--n-placeholder-color);
 `,[U("inner",`
 max-width: 100%;
 overflow: hidden;
 `)]),T("base-selection-tags",`
 cursor: pointer;
 outline: none;
 box-sizing: border-box;
 position: relative;
 z-index: auto;
 display: flex;
 padding: var(--n-padding-multiple);
 flex-wrap: wrap;
 align-items: center;
 width: 100%;
 vertical-align: bottom;
 background-color: var(--n-color);
 border-radius: inherit;
 transition:
 color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 `),T("base-selection-label",`
 height: var(--n-height);
 display: inline-flex;
 width: 100%;
 vertical-align: bottom;
 cursor: pointer;
 outline: none;
 z-index: auto;
 box-sizing: border-box;
 position: relative;
 transition:
 color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 border-radius: inherit;
 background-color: var(--n-color);
 align-items: center;
 `,[T("base-selection-input",`
 font-size: inherit;
 line-height: inherit;
 outline: none;
 cursor: pointer;
 box-sizing: border-box;
 border:none;
 width: 100%;
 padding: var(--n-padding-single);
 background-color: #0000;
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 caret-color: var(--n-caret-color);
 `,[U("content",`
 text-overflow: ellipsis;
 overflow: hidden;
 white-space: nowrap; 
 `)]),U("render-label",`
 color: var(--n-text-color);
 `)]),Re("disabled",[ue("&:hover",[U("state-border",`
 box-shadow: var(--n-box-shadow-hover);
 border: var(--n-border-hover);
 `)]),Q("focus",[U("state-border",`
 box-shadow: var(--n-box-shadow-focus);
 border: var(--n-border-focus);
 `)]),Q("active",[U("state-border",`
 box-shadow: var(--n-box-shadow-active);
 border: var(--n-border-active);
 `),T("base-selection-label","background-color: var(--n-color-active);"),T("base-selection-tags","background-color: var(--n-color-active);")])]),Q("disabled","cursor: not-allowed;",[U("arrow",`
 color: var(--n-arrow-color-disabled);
 `),T("base-selection-label",`
 cursor: not-allowed;
 background-color: var(--n-color-disabled);
 `,[T("base-selection-input",`
 cursor: not-allowed;
 color: var(--n-text-color-disabled);
 `),U("render-label",`
 color: var(--n-text-color-disabled);
 `)]),T("base-selection-tags",`
 cursor: not-allowed;
 background-color: var(--n-color-disabled);
 `),T("base-selection-placeholder",`
 cursor: not-allowed;
 color: var(--n-placeholder-color-disabled);
 `)]),T("base-selection-input-tag",`
 height: calc(var(--n-height) - 6px);
 line-height: calc(var(--n-height) - 6px);
 outline: none;
 display: none;
 position: relative;
 margin-bottom: 3px;
 max-width: 100%;
 vertical-align: bottom;
 `,[U("input",`
 font-size: inherit;
 font-family: inherit;
 min-width: 1px;
 padding: 0;
 background-color: #0000;
 outline: none;
 border: none;
 max-width: 100%;
 overflow: hidden;
 width: 1em;
 line-height: inherit;
 cursor: pointer;
 color: var(--n-text-color);
 caret-color: var(--n-caret-color);
 `),U("mirror",`
 position: absolute;
 left: 0;
 top: 0;
 white-space: pre;
 visibility: hidden;
 user-select: none;
 -webkit-user-select: none;
 opacity: 0;
 `)]),["warning","error"].map(e=>Q(`${e}-status`,[U("state-border",`border: var(--n-border-${e});`),Re("disabled",[ue("&:hover",[U("state-border",`
 box-shadow: var(--n-box-shadow-hover-${e});
 border: var(--n-border-hover-${e});
 `)]),Q("active",[U("state-border",`
 box-shadow: var(--n-box-shadow-active-${e});
 border: var(--n-border-active-${e});
 `),T("base-selection-label",`background-color: var(--n-color-active-${e});`),T("base-selection-tags",`background-color: var(--n-color-active-${e});`)]),Q("focus",[U("state-border",`
 box-shadow: var(--n-box-shadow-focus-${e});
 border: var(--n-border-focus-${e});
 `)])])]))]),T("base-selection-popover",`
 margin-bottom: -3px;
 display: flex;
 flex-wrap: wrap;
 margin-right: -8px;
 `),T("base-selection-tag-wrapper",`
 max-width: 100%;
 display: inline-flex;
 padding: 0 7px 3px 0;
 `,[ue("&:last-child","padding-right: 0;"),T("tag",`
 font-size: 14px;
 max-width: 100%;
 `,[U("content",`
 line-height: 1.25;
 text-overflow: ellipsis;
 overflow: hidden;
 `)])])]),Hn=he({name:"InternalSelection",props:Object.assign(Object.assign({},Ce.props),{clsPrefix:{type:String,required:!0},bordered:{type:Boolean,default:void 0},active:Boolean,pattern:{type:String,default:""},placeholder:String,selectedOption:{type:Object,default:null},selectedOptions:{type:Array,default:null},labelField:{type:String,default:"label"},valueField:{type:String,default:"value"},multiple:Boolean,filterable:Boolean,clearable:Boolean,disabled:Boolean,size:{type:String,default:"medium"},loading:Boolean,autofocus:Boolean,showArrow:{type:Boolean,default:!0},inputProps:Object,focused:Boolean,renderTag:Function,onKeydown:Function,onClick:Function,onBlur:Function,onFocus:Function,onDeleteOption:Function,maxTagCount:[String,Number],ellipsisTagPopoverProps:Object,onClear:Function,onPatternInput:Function,onPatternFocus:Function,onPatternBlur:Function,renderLabel:Function,status:String,inlineThemeDisabled:Boolean,ignoreComposition:{type:Boolean,default:!0},onResize:Function}),setup(e){const{mergedClsPrefixRef:t,mergedRtlRef:o}=Oe(e),n=ct("InternalSelection",o,t),a=O(null),s=O(null),d=O(null),l=O(null),u=O(null),c=O(null),C=O(null),v=O(null),P=O(null),S=O(null),h=O(!1),f=O(!1),y=O(!1),F=Ce("InternalSelection","-internal-selection",jn,po,e,ae(e,"clsPrefix")),z=R(()=>e.clearable&&!e.disabled&&(y.value||e.active)),N=R(()=>e.selectedOption?e.renderTag?e.renderTag({option:e.selectedOption,handleClose:()=>{}}):e.renderLabel?e.renderLabel(e.selectedOption,!0):We(e.selectedOption[e.labelField],e.selectedOption,!0):e.placeholder),K=R(()=>{const b=e.selectedOption;if(b)return b[e.labelField]}),Z=R(()=>e.multiple?!!(Array.isArray(e.selectedOptions)&&e.selectedOptions.length):e.selectedOption!==null);function W(){var b;const{value:k}=a;if(k){const{value:ie}=s;ie&&(ie.style.width=`${k.offsetWidth}px`,e.maxTagCount!=="responsive"&&((b=P.value)===null||b===void 0||b.sync({showAllItemsBeforeCalculate:!1})))}}function re(){const{value:b}=S;b&&(b.style.display="none")}function ee(){const{value:b}=S;b&&(b.style.display="inline-block")}Ie(ae(e,"active"),b=>{b||re()}),Ie(ae(e,"pattern"),()=>{e.multiple&&et(W)});function fe(b){const{onFocus:k}=e;k&&k(b)}function pe(b){const{onBlur:k}=e;k&&k(b)}function oe(b){const{onDeleteOption:k}=e;k&&k(b)}function ne(b){const{onClear:k}=e;k&&k(b)}function m(b){const{onPatternInput:k}=e;k&&k(b)}function M(b){var k;(!b.relatedTarget||!(!((k=d.value)===null||k===void 0)&&k.contains(b.relatedTarget)))&&fe(b)}function H(b){var k;!((k=d.value)===null||k===void 0)&&k.contains(b.relatedTarget)||pe(b)}function E(b){ne(b)}function L(){y.value=!0}function G(){y.value=!1}function q(b){!e.active||!e.filterable||b.target!==s.value&&b.preventDefault()}function _(b){oe(b)}const Y=O(!1);function te(b){if(b.key==="Backspace"&&!Y.value&&!e.pattern.length){const{selectedOptions:k}=e;k?.length&&_(k[k.length-1])}}let se=null;function g(b){const{value:k}=a;if(k){const ie=b.target.value;k.textContent=ie,W()}e.ignoreComposition&&Y.value?se=b:m(b)}function x(){Y.value=!0}function X(){Y.value=!1,e.ignoreComposition&&m(se),se=null}function ve(b){var k;f.value=!0,(k=e.onPatternFocus)===null||k===void 0||k.call(e,b)}function ge(b){var k;f.value=!1,(k=e.onPatternBlur)===null||k===void 0||k.call(e,b)}function de(){var b,k;if(e.filterable)f.value=!1,(b=c.value)===null||b===void 0||b.blur(),(k=s.value)===null||k===void 0||k.blur();else if(e.multiple){const{value:ie}=l;ie?.blur()}else{const{value:ie}=u;ie?.blur()}}function p(){var b,k,ie;e.filterable?(f.value=!1,(b=c.value)===null||b===void 0||b.focus()):e.multiple?(k=l.value)===null||k===void 0||k.focus():(ie=u.value)===null||ie===void 0||ie.focus()}function B(){const{value:b}=s;b&&(ee(),b.focus())}function me(){const{value:b}=s;b&&b.blur()}function be(b){const{value:k}=C;k&&k.setTextContent(`+${b}`)}function Se(){const{value:b}=v;return b}function Be(){return s.value}let ze=null;function ke(){ze!==null&&window.clearTimeout(ze)}function $e(){e.active||(ke(),ze=window.setTimeout(()=>{Z.value&&(h.value=!0)},100))}function _e(){ke()}function Le(b){b||(ke(),h.value=!1)}Ie(Z,b=>{b||(h.value=!1)}),ht(()=>{it(()=>{const b=c.value;b&&(e.disabled?b.removeAttribute("tabindex"):b.tabIndex=f.value?-1:0)})}),fo(d,e.onResize);const{inlineThemeDisabled:Fe}=e,Pe=R(()=>{const{size:b}=e,{common:{cubicBezierEaseInOut:k},self:{fontWeight:ie,borderRadius:Ke,color:qe,placeholderColor:Ze,textColor:He,paddingSingle:Ne,paddingMultiple:De,caretColor:Ge,colorDisabled:Je,textColorDisabled:Ve,placeholderColorDisabled:ye,colorActive:i,boxShadowFocus:w,boxShadowActive:I,boxShadowHover:j,border:$,borderFocus:A,borderHover:D,borderActive:ce,arrowColor:we,arrowColorDisabled:ft,loadingColor:vt,colorActiveWarning:gt,boxShadowFocusWarning:pt,boxShadowActiveWarning:mt,boxShadowHoverWarning:bt,borderWarning:Ct,borderFocusWarning:xt,borderHoverWarning:wo,borderActiveWarning:yo,colorActiveError:So,boxShadowFocusError:zo,boxShadowActiveError:ko,boxShadowHoverError:Fo,borderError:Po,borderFocusError:Mo,borderHoverError:Ro,borderActiveError:Io,clearColor:To,clearColorHover:Oo,clearColorPressed:Bo,clearSize:$o,arrowSize:_o,[V("height",b)]:Lo,[V("fontSize",b)]:Eo}}=F.value,ot=Ue(Ne),nt=Ue(De);return{"--n-bezier":k,"--n-border":$,"--n-border-active":ce,"--n-border-focus":A,"--n-border-hover":D,"--n-border-radius":Ke,"--n-box-shadow-active":I,"--n-box-shadow-focus":w,"--n-box-shadow-hover":j,"--n-caret-color":Ge,"--n-color":qe,"--n-color-active":i,"--n-color-disabled":Je,"--n-font-size":Eo,"--n-height":Lo,"--n-padding-single-top":ot.top,"--n-padding-multiple-top":nt.top,"--n-padding-single-right":ot.right,"--n-padding-multiple-right":nt.right,"--n-padding-single-left":ot.left,"--n-padding-multiple-left":nt.left,"--n-padding-single-bottom":ot.bottom,"--n-padding-multiple-bottom":nt.bottom,"--n-placeholder-color":Ze,"--n-placeholder-color-disabled":ye,"--n-text-color":He,"--n-text-color-disabled":Ve,"--n-arrow-color":we,"--n-arrow-color-disabled":ft,"--n-loading-color":vt,"--n-color-active-warning":gt,"--n-box-shadow-focus-warning":pt,"--n-box-shadow-active-warning":mt,"--n-box-shadow-hover-warning":bt,"--n-border-warning":Ct,"--n-border-focus-warning":xt,"--n-border-hover-warning":wo,"--n-border-active-warning":yo,"--n-color-active-error":So,"--n-box-shadow-focus-error":zo,"--n-box-shadow-active-error":ko,"--n-box-shadow-hover-error":Fo,"--n-border-error":Po,"--n-border-focus-error":Mo,"--n-border-hover-error":Ro,"--n-border-active-error":Io,"--n-clear-size":$o,"--n-clear-color":To,"--n-clear-color-hover":Oo,"--n-clear-color-pressed":Bo,"--n-arrow-size":_o,"--n-font-weight":ie}}),xe=Fe?je("internal-selection",R(()=>e.size[0]),Pe,e):void 0;return{mergedTheme:F,mergedClearable:z,mergedClsPrefix:t,rtlEnabled:n,patternInputFocused:f,filterablePlaceholder:N,label:K,selected:Z,showTagsPanel:h,isComposing:Y,counterRef:C,counterWrapperRef:v,patternInputMirrorRef:a,patternInputRef:s,selfRef:d,multipleElRef:l,singleElRef:u,patternInputWrapperRef:c,overflowRef:P,inputTagElRef:S,handleMouseDown:q,handleFocusin:M,handleClear:E,handleMouseEnter:L,handleMouseLeave:G,handleDeleteOption:_,handlePatternKeyDown:te,handlePatternInputInput:g,handlePatternInputBlur:ge,handlePatternInputFocus:ve,handleMouseEnterCounter:$e,handleMouseLeaveCounter:_e,handleFocusout:H,handleCompositionEnd:X,handleCompositionStart:x,onPopoverUpdateShow:Le,focus:p,focusInput:B,blur:de,blurInput:me,updateCounter:be,getCounter:Se,getTail:Be,renderLabel:e.renderLabel,cssVars:Fe?void 0:Pe,themeClass:xe?.themeClass,onRender:xe?.onRender}},render(){const{status:e,multiple:t,size:o,disabled:n,filterable:a,maxTagCount:s,bordered:d,clsPrefix:l,ellipsisTagPopoverProps:u,onRender:c,renderTag:C,renderLabel:v}=this;c?.();const P=s==="responsive",S=typeof s=="number",h=P||S,f=r(on,null,{default:()=>r(Do,{clsPrefix:l,loading:this.loading,showArrow:this.showArrow,showClear:this.mergedClearable&&this.selected,onClear:this.handleClear},{default:()=>{var F,z;return(z=(F=this.$slots).arrow)===null||z===void 0?void 0:z.call(F)}})});let y;if(t){const{labelField:F}=this,z=m=>r("div",{class:`${l}-base-selection-tag-wrapper`,key:m.value},C?C({option:m,handleClose:()=>{this.handleDeleteOption(m)}}):r(zt,{size:o,closable:!m.disabled,disabled:n,onClose:()=>{this.handleDeleteOption(m)},internalCloseIsButtonTag:!1,internalCloseFocusable:!1},{default:()=>v?v(m,!0):We(m[F],m,!0)})),N=()=>(S?this.selectedOptions.slice(0,s):this.selectedOptions).map(z),K=a?r("div",{class:`${l}-base-selection-input-tag`,ref:"inputTagElRef",key:"__input-tag__"},r("input",Object.assign({},this.inputProps,{ref:"patternInputRef",tabindex:-1,disabled:n,value:this.pattern,autofocus:this.autofocus,class:`${l}-base-selection-input-tag__input`,onBlur:this.handlePatternInputBlur,onFocus:this.handlePatternInputFocus,onKeydown:this.handlePatternKeyDown,onInput:this.handlePatternInputInput,onCompositionstart:this.handleCompositionStart,onCompositionend:this.handleCompositionEnd})),r("span",{ref:"patternInputMirrorRef",class:`${l}-base-selection-input-tag__mirror`},this.pattern)):null,Z=P?()=>r("div",{class:`${l}-base-selection-tag-wrapper`,ref:"counterWrapperRef"},r(zt,{size:o,ref:"counterRef",onMouseenter:this.handleMouseEnterCounter,onMouseleave:this.handleMouseLeaveCounter,disabled:n})):void 0;let W;if(S){const m=this.selectedOptions.length-s;m>0&&(W=r("div",{class:`${l}-base-selection-tag-wrapper`,key:"__counter__"},r(zt,{size:o,ref:"counterRef",onMouseenter:this.handleMouseEnterCounter,disabled:n},{default:()=>`+${m}`})))}const re=P?a?r(Lt,{ref:"overflowRef",updateCounter:this.updateCounter,getCounter:this.getCounter,getTail:this.getTail,style:{width:"100%",display:"flex",overflow:"hidden"}},{default:N,counter:Z,tail:()=>K}):r(Lt,{ref:"overflowRef",updateCounter:this.updateCounter,getCounter:this.getCounter,style:{width:"100%",display:"flex",overflow:"hidden"}},{default:N,counter:Z}):S&&W?N().concat(W):N(),ee=h?()=>r("div",{class:`${l}-base-selection-popover`},P?N():this.selectedOptions.map(z)):void 0,fe=h?Object.assign({show:this.showTagsPanel,trigger:"hover",overlap:!0,placement:"top",width:"trigger",onUpdateShow:this.onPopoverUpdateShow,theme:this.mergedTheme.peers.Popover,themeOverrides:this.mergedTheme.peerOverrides.Popover},u):null,oe=(this.selected?!1:this.active?!this.pattern&&!this.isComposing:!0)?r("div",{class:`${l}-base-selection-placeholder ${l}-base-selection-overlay`},r("div",{class:`${l}-base-selection-placeholder__inner`},this.placeholder)):null,ne=a?r("div",{ref:"patternInputWrapperRef",class:`${l}-base-selection-tags`},re,P?null:K,f):r("div",{ref:"multipleElRef",class:`${l}-base-selection-tags`,tabindex:n?void 0:0},re,f);y=r(Ft,null,h?r(ao,Object.assign({},fe,{scrollable:!0,style:"max-height: calc(var(--v-target-height) * 6.6);"}),{trigger:()=>ne,default:ee}):ne,oe)}else if(a){const F=this.pattern||this.isComposing,z=this.active?!F:!this.selected,N=this.active?!1:this.selected;y=r("div",{ref:"patternInputWrapperRef",class:`${l}-base-selection-label`,title:this.patternInputFocused?void 0:Dt(this.label)},r("input",Object.assign({},this.inputProps,{ref:"patternInputRef",class:`${l}-base-selection-input`,value:this.active?this.pattern:"",placeholder:"",readonly:n,disabled:n,tabindex:-1,autofocus:this.autofocus,onFocus:this.handlePatternInputFocus,onBlur:this.handlePatternInputBlur,onInput:this.handlePatternInputInput,onCompositionstart:this.handleCompositionStart,onCompositionend:this.handleCompositionEnd})),N?r("div",{class:`${l}-base-selection-label__render-label ${l}-base-selection-overlay`,key:"input"},r("div",{class:`${l}-base-selection-overlay__wrapper`},C?C({option:this.selectedOption,handleClose:()=>{}}):v?v(this.selectedOption,!0):We(this.label,this.selectedOption,!0))):null,z?r("div",{class:`${l}-base-selection-placeholder ${l}-base-selection-overlay`,key:"placeholder"},r("div",{class:`${l}-base-selection-overlay__wrapper`},this.filterablePlaceholder)):null,f)}else y=r("div",{ref:"singleElRef",class:`${l}-base-selection-label`,tabindex:this.disabled?void 0:0},this.label!==void 0?r("div",{class:`${l}-base-selection-input`,title:Dt(this.label),key:"input"},r("div",{class:`${l}-base-selection-input__content`},C?C({option:this.selectedOption,handleClose:()=>{}}):v?v(this.selectedOption,!0):We(this.label,this.selectedOption,!0))):r("div",{class:`${l}-base-selection-placeholder ${l}-base-selection-overlay`,key:"placeholder"},r("div",{class:`${l}-base-selection-placeholder__inner`},this.placeholder)),f);return r("div",{ref:"selfRef",class:[`${l}-base-selection`,this.rtlEnabled&&`${l}-base-selection--rtl`,this.themeClass,e&&`${l}-base-selection--${e}-status`,{[`${l}-base-selection--active`]:this.active,[`${l}-base-selection--selected`]:this.selected||this.active&&this.pattern,[`${l}-base-selection--disabled`]:this.disabled,[`${l}-base-selection--multiple`]:this.multiple,[`${l}-base-selection--focus`]:this.focused}],style:this.cssVars,onClick:this.onClick,onMouseenter:this.handleMouseEnter,onMouseleave:this.handleMouseLeave,onKeydown:this.onKeydown,onFocusin:this.handleFocusin,onFocusout:this.handleFocusout,onMousedown:this.handleMouseDown},y,d?r("div",{class:`${l}-base-selection__border`}):null,d?r("div",{class:`${l}-base-selection__state-border`}):null)}});function dt(e){return e.type==="group"}function mo(e){return e.type==="ignored"}function kt(e,t){try{return!!(1+t.toString().toLowerCase().indexOf(e.trim().toLowerCase()))}catch{return!1}}function bo(e,t){return{getIsGroup:dt,getIgnored:mo,getKey(n){return dt(n)?n.name||n.key||"key-required":n[e]},getChildren(n){return n[t]}}}function Nn(e,t,o,n){if(!t)return e;function a(s){if(!Array.isArray(s))return[];const d=[];for(const l of s)if(dt(l)){const u=a(l[n]);u.length&&d.push(Object.assign({},l,{[n]:u}))}else{if(mo(l))continue;t(o,l)&&d.push(l)}return d}return a(e)}function Dn(e,t,o){const n=new Map;return e.forEach(a=>{dt(a)?a[o].forEach(s=>{n.set(s[t],s)}):n.set(a[t],a)}),n}function Vn(e){const{boxShadow2:t}=e;return{menuBoxShadow:t}}const Tt=tt({name:"Popselect",common:Ae,peers:{Popover:lo,InternalSelectMenu:It},self:Vn}),Co=oo("n-popselect"),Wn=T("popselect-menu",`
 box-shadow: var(--n-menu-box-shadow);
`),Ot={multiple:Boolean,value:{type:[String,Number,Array],default:null},cancelable:Boolean,options:{type:Array,default:()=>[]},size:String,scrollable:Boolean,"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],onMouseenter:Function,onMouseleave:Function,renderLabel:Function,showCheckmark:{type:Boolean,default:void 0},nodeProps:Function,virtualScroll:Boolean,onChange:[Function,Array]},Qt=nn(Ot),Un=he({name:"PopselectPanel",props:Ot,setup(e){const t=ut(Co),{mergedClsPrefixRef:o,inlineThemeDisabled:n,mergedComponentPropsRef:a}=Oe(e),s=R(()=>{var h,f;return e.size||((f=(h=a?.value)===null||h===void 0?void 0:h.Popselect)===null||f===void 0?void 0:f.size)||"medium"}),d=Ce("Popselect","-pop-select",Wn,Tt,t.props,o),l=R(()=>so(e.options,bo("value","children")));function u(h,f){const{onUpdateValue:y,"onUpdate:value":F,onChange:z}=e;y&&le(y,h,f),F&&le(F,h,f),z&&le(z,h,f)}function c(h){v(h.key)}function C(h){!Te(h,"action")&&!Te(h,"empty")&&!Te(h,"header")&&h.preventDefault()}function v(h){const{value:{getNode:f}}=l;if(e.multiple)if(Array.isArray(e.value)){const y=[],F=[];let z=!0;e.value.forEach(N=>{if(N===h){z=!1;return}const K=f(N);K&&(y.push(K.key),F.push(K.rawNode))}),z&&(y.push(h),F.push(f(h).rawNode)),u(y,F)}else{const y=f(h);y&&u([h],[y.rawNode])}else if(e.value===h&&e.cancelable)u(null,null);else{const y=f(h);y&&u(h,y.rawNode);const{"onUpdate:show":F,onUpdateShow:z}=t.props;F&&le(F,!1),z&&le(z,!1),t.setShow(!1)}et(()=>{t.syncPosition()})}Ie(ae(e,"options"),()=>{et(()=>{t.syncPosition()})});const P=R(()=>{const{self:{menuBoxShadow:h}}=d.value;return{"--n-menu-box-shadow":h}}),S=n?je("select",void 0,P,t.props):void 0;return{mergedTheme:t.mergedThemeRef,mergedClsPrefix:o,treeMate:l,handleToggle:c,handleMenuMousedown:C,cssVars:n?void 0:P,themeClass:S?.themeClass,onRender:S?.onRender,mergedSize:s,scrollbarProps:t.props.scrollbarProps}},render(){var e;return(e=this.onRender)===null||e===void 0||e.call(this),r(go,{clsPrefix:this.mergedClsPrefix,focusable:!0,nodeProps:this.nodeProps,class:[`${this.mergedClsPrefix}-popselect-menu`,this.themeClass],style:this.cssVars,theme:this.mergedTheme.peers.InternalSelectMenu,themeOverrides:this.mergedTheme.peerOverrides.InternalSelectMenu,multiple:this.multiple,treeMate:this.treeMate,size:this.mergedSize,value:this.value,virtualScroll:this.virtualScroll,scrollable:this.scrollable,scrollbarProps:this.scrollbarProps,renderLabel:this.renderLabel,onToggle:this.handleToggle,onMouseenter:this.onMouseenter,onMouseleave:this.onMouseenter,onMousedown:this.handleMenuMousedown,showCheckmark:this.showCheckmark},{header:()=>{var t,o;return((o=(t=this.$slots).header)===null||o===void 0?void 0:o.call(t))||[]},action:()=>{var t,o;return((o=(t=this.$slots).action)===null||o===void 0?void 0:o.call(t))||[]},empty:()=>{var t,o;return((o=(t=this.$slots).empty)===null||o===void 0?void 0:o.call(t))||[]}})}}),Kn=Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({},Ce.props),co(Et,["showArrow","arrow"])),{placement:Object.assign(Object.assign({},Et.placement),{default:"bottom"}),trigger:{type:String,default:"hover"}}),Ot),{scrollbarProps:Object}),qn=he({name:"Popselect",props:Kn,slots:Object,inheritAttrs:!1,__popover__:!0,setup(e){const{mergedClsPrefixRef:t}=Oe(e),o=Ce("Popselect","-popselect",void 0,Tt,e,t),n=O(null);function a(){var l;(l=n.value)===null||l===void 0||l.syncPosition()}function s(l){var u;(u=n.value)===null||u===void 0||u.setShow(l)}return Ye(Co,{props:e,mergedThemeRef:o,syncPosition:a,setShow:s}),Object.assign(Object.assign({},{syncPosition:a,setShow:s}),{popoverInstRef:n,mergedTheme:o})},render(){const{mergedTheme:e}=this,t={theme:e.peers.Popover,themeOverrides:e.peerOverrides.Popover,builtinThemeOverrides:{padding:"0"},ref:"popoverInstRef",internalRenderBody:(o,n,a,s,d)=>{const{$attrs:l}=this;return r(Un,Object.assign({},l,{class:[l.class,o],style:[l.style,...a]},rn(this.$props,Qt),{ref:ln(n),onMouseenter:Xe([s,l.onMouseenter]),onMouseleave:Xe([d,l.onMouseleave])}),{header:()=>{var u,c;return(c=(u=this.$slots).header)===null||c===void 0?void 0:c.call(u)},action:()=>{var u,c;return(c=(u=this.$slots).action)===null||c===void 0?void 0:c.call(u)},empty:()=>{var u,c;return(c=(u=this.$slots).empty)===null||c===void 0?void 0:c.call(u)}})}};return r(ao,Object.assign({},co(this.$props,Qt),t,{internalDeactivateImmediately:!0}),{trigger:()=>{var o,n;return(n=(o=this.$slots).default)===null||n===void 0?void 0:n.call(o)}})}});function Zn(e){const{boxShadow2:t}=e;return{menuBoxShadow:t}}const xo=tt({name:"Select",common:Ae,peers:{InternalSelection:po,InternalSelectMenu:It},self:Zn}),Gn=ue([T("select",`
 z-index: auto;
 outline: none;
 width: 100%;
 position: relative;
 font-weight: var(--n-font-weight);
 `),T("select-menu",`
 margin: 4px 0;
 box-shadow: var(--n-menu-box-shadow);
 `,[io({originalTransition:"background-color .3s var(--n-bezier), box-shadow .3s var(--n-bezier)"})])]),Jn=Object.assign(Object.assign({},Ce.props),{to:at.propTo,bordered:{type:Boolean,default:void 0},clearable:Boolean,clearCreatedOptionsOnClear:{type:Boolean,default:!0},clearFilterAfterSelect:{type:Boolean,default:!0},options:{type:Array,default:()=>[]},defaultValue:{type:[String,Number,Array],default:null},keyboard:{type:Boolean,default:!0},value:[String,Number,Array],placeholder:String,menuProps:Object,multiple:Boolean,size:String,menuSize:{type:String},filterable:Boolean,disabled:{type:Boolean,default:void 0},remote:Boolean,loading:Boolean,filter:Function,placement:{type:String,default:"bottom-start"},widthMode:{type:String,default:"trigger"},tag:Boolean,onCreate:Function,fallbackOption:{type:[Function,Boolean],default:void 0},show:{type:Boolean,default:void 0},showArrow:{type:Boolean,default:!0},maxTagCount:[Number,String],ellipsisTagPopoverProps:Object,consistentMenuWidth:{type:Boolean,default:!0},virtualScroll:{type:Boolean,default:!0},labelField:{type:String,default:"label"},valueField:{type:String,default:"value"},childrenField:{type:String,default:"children"},renderLabel:Function,renderOption:Function,renderTag:Function,"onUpdate:value":[Function,Array],inputProps:Object,nodeProps:Function,ignoreComposition:{type:Boolean,default:!0},showOnFocus:Boolean,onUpdateValue:[Function,Array],onBlur:[Function,Array],onClear:[Function,Array],onFocus:[Function,Array],onScroll:[Function,Array],onSearch:[Function,Array],onUpdateShow:[Function,Array],"onUpdate:show":[Function,Array],displayDirective:{type:String,default:"show"},resetMenuOnOptionsChange:{type:Boolean,default:!0},status:String,showCheckmark:{type:Boolean,default:!0},scrollbarProps:Object,onChange:[Function,Array],items:Array}),Qn=he({name:"Select",props:Jn,slots:Object,setup(e){const{mergedClsPrefixRef:t,mergedBorderedRef:o,namespaceRef:n,inlineThemeDisabled:a,mergedComponentPropsRef:s}=Oe(e),d=Ce("Select","-select",Gn,xo,e,t),l=O(e.defaultValue),u=ae(e,"value"),c=st(u,l),C=O(!1),v=O(""),P=hn(e,["items","options"]),S=O([]),h=O([]),f=R(()=>h.value.concat(S.value).concat(P.value)),y=R(()=>{const{filter:i}=e;if(i)return i;const{labelField:w,valueField:I}=e;return(j,$)=>{if(!$)return!1;const A=$[w];if(typeof A=="string")return kt(j,A);const D=$[I];return typeof D=="string"?kt(j,D):typeof D=="number"?kt(j,String(D)):!1}}),F=R(()=>{if(e.remote)return P.value;{const{value:i}=f,{value:w}=v;return!w.length||!e.filterable?i:Nn(i,y.value,w,e.childrenField)}}),z=R(()=>{const{valueField:i,childrenField:w}=e,I=bo(i,w);return so(F.value,I)}),N=R(()=>Dn(f.value,e.valueField,e.childrenField)),K=O(!1),Z=st(ae(e,"show"),K),W=O(null),re=O(null),ee=O(null),{localeRef:fe}=Mt("Select"),pe=R(()=>{var i;return(i=e.placeholder)!==null&&i!==void 0?i:fe.value.placeholder}),oe=[],ne=O(new Map),m=R(()=>{const{fallbackOption:i}=e;if(i===void 0){const{labelField:w,valueField:I}=e;return j=>({[w]:String(j),[I]:j})}return i===!1?!1:w=>Object.assign(i(w),{value:w})});function M(i){const w=e.remote,{value:I}=ne,{value:j}=N,{value:$}=m,A=[];return i.forEach(D=>{if(j.has(D))A.push(j.get(D));else if(w&&I.has(D))A.push(I.get(D));else if($){const ce=$(D);ce&&A.push(ce)}}),A}const H=R(()=>{if(e.multiple){const{value:i}=c;return Array.isArray(i)?M(i):[]}return null}),E=R(()=>{const{value:i}=c;return!e.multiple&&!Array.isArray(i)?i===null?null:M([i])[0]||null:null}),L=Ho(e,{mergedSize:i=>{var w,I;const{size:j}=e;if(j)return j;const{mergedSize:$}=i||{};if($?.value)return $.value;const A=(I=(w=s?.value)===null||w===void 0?void 0:w.Select)===null||I===void 0?void 0:I.size;return A||"medium"}}),{mergedSizeRef:G,mergedDisabledRef:q,mergedStatusRef:_}=L;function Y(i,w){const{onChange:I,"onUpdate:value":j,onUpdateValue:$}=e,{nTriggerFormChange:A,nTriggerFormInput:D}=L;I&&le(I,i,w),$&&le($,i,w),j&&le(j,i,w),l.value=i,A(),D()}function te(i){const{onBlur:w}=e,{nTriggerFormBlur:I}=L;w&&le(w,i),I()}function se(){const{onClear:i}=e;i&&le(i)}function g(i){const{onFocus:w,showOnFocus:I}=e,{nTriggerFormFocus:j}=L;w&&le(w,i),j(),I&&de()}function x(i){const{onSearch:w}=e;w&&le(w,i)}function X(i){const{onScroll:w}=e;w&&le(w,i)}function ve(){var i;const{remote:w,multiple:I}=e;if(w){const{value:j}=ne;if(I){const{valueField:$}=e;(i=H.value)===null||i===void 0||i.forEach(A=>{j.set(A[$],A)})}else{const $=E.value;$&&j.set($[e.valueField],$)}}}function ge(i){const{onUpdateShow:w,"onUpdate:show":I}=e;w&&le(w,i),I&&le(I,i),K.value=i}function de(){q.value||(ge(!0),K.value=!0,e.filterable&&De())}function p(){ge(!1)}function B(){v.value="",h.value=oe}const me=O(!1);function be(){e.filterable&&(me.value=!0)}function Se(){e.filterable&&(me.value=!1,Z.value||B())}function Be(){q.value||(Z.value?e.filterable?De():p():de())}function ze(i){var w,I;!((I=(w=ee.value)===null||w===void 0?void 0:w.selfRef)===null||I===void 0)&&I.contains(i.relatedTarget)||(C.value=!1,te(i),p())}function ke(i){g(i),C.value=!0}function $e(){C.value=!0}function _e(i){var w;!((w=W.value)===null||w===void 0)&&w.$el.contains(i.relatedTarget)||(C.value=!1,te(i),p())}function Le(){var i;(i=W.value)===null||i===void 0||i.focus(),p()}function Fe(i){var w;Z.value&&(!((w=W.value)===null||w===void 0)&&w.$el.contains(cn(i))||p())}function Pe(i){if(!Array.isArray(i))return[];if(m.value)return Array.from(i);{const{remote:w}=e,{value:I}=N;if(w){const{value:j}=ne;return i.filter($=>I.has($)||j.has($))}else return i.filter(j=>I.has(j))}}function xe(i){b(i.rawNode)}function b(i){if(q.value)return;const{tag:w,remote:I,clearFilterAfterSelect:j,valueField:$}=e;if(w&&!I){const{value:A}=h,D=A[0]||null;if(D){const ce=S.value;ce.length?ce.push(D):S.value=[D],h.value=oe}}if(I&&ne.value.set(i[$],i),e.multiple){const A=Pe(c.value),D=A.findIndex(ce=>ce===i[$]);if(~D){if(A.splice(D,1),w&&!I){const ce=k(i[$]);~ce&&(S.value.splice(ce,1),j&&(v.value=""))}}else A.push(i[$]),j&&(v.value="");Y(A,M(A))}else{if(w&&!I){const A=k(i[$]);~A?S.value=[S.value[A]]:S.value=oe}Ne(),p(),Y(i[$],i)}}function k(i){return S.value.findIndex(I=>I[e.valueField]===i)}function ie(i){Z.value||de();const{value:w}=i.target;v.value=w;const{tag:I,remote:j}=e;if(x(w),I&&!j){if(!w){h.value=oe;return}const{onCreate:$}=e,A=$?$(w):{[e.labelField]:w,[e.valueField]:w},{valueField:D,labelField:ce}=e;P.value.some(we=>we[D]===A[D]||we[ce]===A[ce])||S.value.some(we=>we[D]===A[D]||we[ce]===A[ce])?h.value=oe:h.value=[A]}}function Ke(i){i.stopPropagation();const{multiple:w,tag:I,remote:j,clearCreatedOptionsOnClear:$}=e;!w&&e.filterable&&p(),I&&!j&&$&&(S.value=oe),se(),w?Y([],[]):Y(null,null)}function qe(i){!Te(i,"action")&&!Te(i,"empty")&&!Te(i,"header")&&i.preventDefault()}function Ze(i){X(i)}function He(i){var w,I,j,$,A;if(!e.keyboard){i.preventDefault();return}switch(i.key){case" ":if(e.filterable)break;i.preventDefault();case"Enter":if(!(!((w=W.value)===null||w===void 0)&&w.isComposing)){if(Z.value){const D=(I=ee.value)===null||I===void 0?void 0:I.getPendingTmNode();D?xe(D):e.filterable||(p(),Ne())}else if(de(),e.tag&&me.value){const D=h.value[0];if(D){const ce=D[e.valueField],{value:we}=c;e.multiple&&Array.isArray(we)&&we.includes(ce)||b(D)}}}i.preventDefault();break;case"ArrowUp":if(i.preventDefault(),e.loading)return;Z.value&&((j=ee.value)===null||j===void 0||j.prev());break;case"ArrowDown":if(i.preventDefault(),e.loading)return;Z.value?($=ee.value)===null||$===void 0||$.next():de();break;case"Escape":Z.value&&(un(i),p()),(A=W.value)===null||A===void 0||A.focus();break}}function Ne(){var i;(i=W.value)===null||i===void 0||i.focus()}function De(){var i;(i=W.value)===null||i===void 0||i.focusInput()}function Ge(){var i;Z.value&&((i=re.value)===null||i===void 0||i.syncPosition())}ve(),Ie(ae(e,"options"),ve);const Je={focus:()=>{var i;(i=W.value)===null||i===void 0||i.focus()},focusInput:()=>{var i;(i=W.value)===null||i===void 0||i.focusInput()},blur:()=>{var i;(i=W.value)===null||i===void 0||i.blur()},blurInput:()=>{var i;(i=W.value)===null||i===void 0||i.blurInput()}},Ve=R(()=>{const{self:{menuBoxShadow:i}}=d.value;return{"--n-menu-box-shadow":i}}),ye=a?je("select",void 0,Ve,e):void 0;return Object.assign(Object.assign({},Je),{mergedStatus:_,mergedClsPrefix:t,mergedBordered:o,namespace:n,treeMate:z,isMounted:No(),triggerRef:W,menuRef:ee,pattern:v,uncontrolledShow:K,mergedShow:Z,adjustedTo:at(e),uncontrolledValue:l,mergedValue:c,followerRef:re,localizedPlaceholder:pe,selectedOption:E,selectedOptions:H,mergedSize:G,mergedDisabled:q,focused:C,activeWithoutMenuOpen:me,inlineThemeDisabled:a,onTriggerInputFocus:be,onTriggerInputBlur:Se,handleTriggerOrMenuResize:Ge,handleMenuFocus:$e,handleMenuBlur:_e,handleMenuTabOut:Le,handleTriggerClick:Be,handleToggle:xe,handleDeleteOption:b,handlePatternInput:ie,handleClear:Ke,handleTriggerBlur:ze,handleTriggerFocus:ke,handleKeydown:He,handleMenuAfterLeave:B,handleMenuClickOutside:Fe,handleMenuScroll:Ze,handleMenuKeydown:He,handleMenuMousedown:qe,mergedTheme:d,cssVars:a?void 0:Ve,themeClass:ye?.themeClass,onRender:ye?.onRender})},render(){return r("div",{class:`${this.mergedClsPrefix}-select`},r(an,null,{default:()=>[r(sn,null,{default:()=>r(Hn,{ref:"triggerRef",inlineThemeDisabled:this.inlineThemeDisabled,status:this.mergedStatus,inputProps:this.inputProps,clsPrefix:this.mergedClsPrefix,showArrow:this.showArrow,maxTagCount:this.maxTagCount,ellipsisTagPopoverProps:this.ellipsisTagPopoverProps,bordered:this.mergedBordered,active:this.activeWithoutMenuOpen||this.mergedShow,pattern:this.pattern,placeholder:this.localizedPlaceholder,selectedOption:this.selectedOption,selectedOptions:this.selectedOptions,multiple:this.multiple,renderTag:this.renderTag,renderLabel:this.renderLabel,filterable:this.filterable,clearable:this.clearable,disabled:this.mergedDisabled,size:this.mergedSize,theme:this.mergedTheme.peers.InternalSelection,labelField:this.labelField,valueField:this.valueField,themeOverrides:this.mergedTheme.peerOverrides.InternalSelection,loading:this.loading,focused:this.focused,onClick:this.handleTriggerClick,onDeleteOption:this.handleDeleteOption,onPatternInput:this.handlePatternInput,onClear:this.handleClear,onBlur:this.handleTriggerBlur,onFocus:this.handleTriggerFocus,onKeydown:this.handleKeydown,onPatternBlur:this.onTriggerInputBlur,onPatternFocus:this.onTriggerInputFocus,onResize:this.handleTriggerOrMenuResize,ignoreComposition:this.ignoreComposition},{arrow:()=>{var e,t;return[(t=(e=this.$slots).arrow)===null||t===void 0?void 0:t.call(e)]}})}),r(dn,{ref:"followerRef",show:this.mergedShow,to:this.adjustedTo,teleportDisabled:this.adjustedTo===at.tdkey,containerClass:this.namespace,width:this.consistentMenuWidth?"target":void 0,minWidth:"target",placement:this.placement},{default:()=>r(ro,{name:"fade-in-scale-up-transition",appear:this.isMounted,onAfterLeave:this.handleMenuAfterLeave},{default:()=>{var e,t,o;return this.mergedShow||this.displayDirective==="show"?((e=this.onRender)===null||e===void 0||e.call(this),qo(r(go,Object.assign({},this.menuProps,{ref:"menuRef",onResize:this.handleTriggerOrMenuResize,inlineThemeDisabled:this.inlineThemeDisabled,virtualScroll:this.consistentMenuWidth&&this.virtualScroll,class:[`${this.mergedClsPrefix}-select-menu`,this.themeClass,(t=this.menuProps)===null||t===void 0?void 0:t.class],clsPrefix:this.mergedClsPrefix,focusable:!0,labelField:this.labelField,valueField:this.valueField,autoPending:!0,nodeProps:this.nodeProps,theme:this.mergedTheme.peers.InternalSelectMenu,themeOverrides:this.mergedTheme.peerOverrides.InternalSelectMenu,treeMate:this.treeMate,multiple:this.multiple,size:this.menuSize,renderOption:this.renderOption,renderLabel:this.renderLabel,value:this.mergedValue,style:[(o=this.menuProps)===null||o===void 0?void 0:o.style,this.cssVars],onToggle:this.handleToggle,onScroll:this.handleMenuScroll,onFocus:this.handleMenuFocus,onBlur:this.handleMenuBlur,onKeydown:this.handleMenuKeydown,onTabOut:this.handleMenuTabOut,onMousedown:this.handleMenuMousedown,show:this.mergedShow,showCheckmark:this.showCheckmark,resetMenuOnOptionsChange:this.resetMenuOnOptionsChange,scrollbarProps:this.scrollbarProps}),{empty:()=>{var n,a;return[(a=(n=this.$slots).empty)===null||a===void 0?void 0:a.call(n)]},header:()=>{var n,a;return[(a=(n=this.$slots).header)===null||a===void 0?void 0:a.call(n)]},action:()=>{var n,a;return[(a=(n=this.$slots).action)===null||a===void 0?void 0:a.call(n)]}}),this.displayDirective==="show"?[[Zo,this.mergedShow],[At,this.handleMenuClickOutside,void 0,{capture:!0}]]:[[At,this.handleMenuClickOutside,void 0,{capture:!0}]])):null}})})]}))}}),Xn={itemPaddingSmall:"0 4px",itemMarginSmall:"0 0 0 8px",itemMarginSmallRtl:"0 8px 0 0",itemPaddingMedium:"0 4px",itemMarginMedium:"0 0 0 8px",itemMarginMediumRtl:"0 8px 0 0",itemPaddingLarge:"0 4px",itemMarginLarge:"0 0 0 8px",itemMarginLargeRtl:"0 8px 0 0",buttonIconSizeSmall:"14px",buttonIconSizeMedium:"16px",buttonIconSizeLarge:"18px",inputWidthSmall:"60px",selectWidthSmall:"unset",inputMarginSmall:"0 0 0 8px",inputMarginSmallRtl:"0 8px 0 0",selectMarginSmall:"0 0 0 8px",prefixMarginSmall:"0 8px 0 0",suffixMarginSmall:"0 0 0 8px",inputWidthMedium:"60px",selectWidthMedium:"unset",inputMarginMedium:"0 0 0 8px",inputMarginMediumRtl:"0 8px 0 0",selectMarginMedium:"0 0 0 8px",prefixMarginMedium:"0 8px 0 0",suffixMarginMedium:"0 0 0 8px",inputWidthLarge:"60px",selectWidthLarge:"unset",inputMarginLarge:"0 0 0 8px",inputMarginLargeRtl:"0 8px 0 0",selectMarginLarge:"0 0 0 8px",prefixMarginLarge:"0 8px 0 0",suffixMarginLarge:"0 0 0 8px"};function Yn(e){const{textColor2:t,primaryColor:o,primaryColorHover:n,primaryColorPressed:a,inputColorDisabled:s,textColorDisabled:d,borderColor:l,borderRadius:u,fontSizeTiny:c,fontSizeSmall:C,fontSizeMedium:v,heightTiny:P,heightSmall:S,heightMedium:h}=e;return Object.assign(Object.assign({},Xn),{buttonColor:"#0000",buttonColorHover:"#0000",buttonColorPressed:"#0000",buttonBorder:`1px solid ${l}`,buttonBorderHover:`1px solid ${l}`,buttonBorderPressed:`1px solid ${l}`,buttonIconColor:t,buttonIconColorHover:t,buttonIconColorPressed:t,itemTextColor:t,itemTextColorHover:n,itemTextColorPressed:a,itemTextColorActive:o,itemTextColorDisabled:d,itemColor:"#0000",itemColorHover:"#0000",itemColorPressed:"#0000",itemColorActive:"#0000",itemColorActiveHover:"#0000",itemColorDisabled:s,itemBorder:"1px solid #0000",itemBorderHover:"1px solid #0000",itemBorderPressed:"1px solid #0000",itemBorderActive:`1px solid ${o}`,itemBorderDisabled:`1px solid ${l}`,itemBorderRadius:u,itemSizeSmall:P,itemSizeMedium:S,itemSizeLarge:h,itemFontSizeSmall:c,itemFontSizeMedium:C,itemFontSizeLarge:v,jumperFontSizeSmall:c,jumperFontSizeMedium:C,jumperFontSizeLarge:v,jumperTextColor:t,jumperTextColorDisabled:d})}const er=tt({name:"Pagination",common:Ae,peers:{Select:xo,Input:Vo,Popselect:Tt},self:Yn}),Xt=`
 background: var(--n-item-color-hover);
 color: var(--n-item-text-color-hover);
 border: var(--n-item-border-hover);
`,Yt=[Q("button",`
 background: var(--n-button-color-hover);
 border: var(--n-button-border-hover);
 color: var(--n-button-icon-color-hover);
 `)],tr=T("pagination",`
 display: flex;
 vertical-align: middle;
 font-size: var(--n-item-font-size);
 flex-wrap: nowrap;
`,[T("pagination-prefix",`
 display: flex;
 align-items: center;
 margin: var(--n-prefix-margin);
 `),T("pagination-suffix",`
 display: flex;
 align-items: center;
 margin: var(--n-suffix-margin);
 `),ue("> *:not(:first-child)",`
 margin: var(--n-item-margin);
 `),T("select",`
 width: var(--n-select-width);
 `),ue("&.transition-disabled",[T("pagination-item","transition: none!important;")]),T("pagination-quick-jumper",`
 white-space: nowrap;
 display: flex;
 color: var(--n-jumper-text-color);
 transition: color .3s var(--n-bezier);
 align-items: center;
 font-size: var(--n-jumper-font-size);
 `,[T("input",`
 margin: var(--n-input-margin);
 width: var(--n-input-width);
 `)]),T("pagination-item",`
 position: relative;
 cursor: pointer;
 user-select: none;
 -webkit-user-select: none;
 display: flex;
 align-items: center;
 justify-content: center;
 box-sizing: border-box;
 min-width: var(--n-item-size);
 height: var(--n-item-size);
 padding: var(--n-item-padding);
 background-color: var(--n-item-color);
 color: var(--n-item-text-color);
 border-radius: var(--n-item-border-radius);
 border: var(--n-item-border);
 fill: var(--n-button-icon-color);
 transition:
 color .3s var(--n-bezier),
 border-color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 fill .3s var(--n-bezier);
 `,[Q("button",`
 background: var(--n-button-color);
 color: var(--n-button-icon-color);
 border: var(--n-button-border);
 padding: 0;
 `,[T("base-icon",`
 font-size: var(--n-button-icon-size);
 `)]),Re("disabled",[Q("hover",Xt,Yt),ue("&:hover",Xt,Yt),ue("&:active",`
 background: var(--n-item-color-pressed);
 color: var(--n-item-text-color-pressed);
 border: var(--n-item-border-pressed);
 `,[Q("button",`
 background: var(--n-button-color-pressed);
 border: var(--n-button-border-pressed);
 color: var(--n-button-icon-color-pressed);
 `)]),Q("active",`
 background: var(--n-item-color-active);
 color: var(--n-item-text-color-active);
 border: var(--n-item-border-active);
 `,[ue("&:hover",`
 background: var(--n-item-color-active-hover);
 `)])]),Q("disabled",`
 cursor: not-allowed;
 color: var(--n-item-text-color-disabled);
 `,[Q("active, button",`
 background-color: var(--n-item-color-disabled);
 border: var(--n-item-border-disabled);
 `)])]),Q("disabled",`
 cursor: not-allowed;
 `,[T("pagination-quick-jumper",`
 color: var(--n-jumper-text-color-disabled);
 `)]),Q("simple",`
 display: flex;
 align-items: center;
 flex-wrap: nowrap;
 `,[T("pagination-quick-jumper",[T("input",`
 margin: 0;
 `)])])]);function or(e){var t;if(!e)return 10;const{defaultPageSize:o}=e;if(o!==void 0)return o;const n=(t=e.pageSizes)===null||t===void 0?void 0:t[0];return typeof n=="number"?n:n?.value||10}function nr(e,t,o,n){let a=!1,s=!1,d=1,l=t;if(t===1)return{hasFastBackward:!1,hasFastForward:!1,fastForwardTo:l,fastBackwardTo:d,items:[{type:"page",label:1,active:e===1,mayBeFastBackward:!1,mayBeFastForward:!1}]};if(t===2)return{hasFastBackward:!1,hasFastForward:!1,fastForwardTo:l,fastBackwardTo:d,items:[{type:"page",label:1,active:e===1,mayBeFastBackward:!1,mayBeFastForward:!1},{type:"page",label:2,active:e===2,mayBeFastBackward:!0,mayBeFastForward:!1}]};const u=1,c=t;let C=e,v=e;const P=(o-5)/2;v+=Math.ceil(P),v=Math.min(Math.max(v,u+o-3),c-2),C-=Math.floor(P),C=Math.max(Math.min(C,c-o+3),u+2);let S=!1,h=!1;C>u+2&&(S=!0),v<c-2&&(h=!0);const f=[];f.push({type:"page",label:1,active:e===1,mayBeFastBackward:!1,mayBeFastForward:!1}),S?(a=!0,d=C-1,f.push({type:"fast-backward",active:!1,label:void 0,options:n?eo(u+1,C-1):null})):c>=u+1&&f.push({type:"page",label:u+1,mayBeFastBackward:!0,mayBeFastForward:!1,active:e===u+1});for(let y=C;y<=v;++y)f.push({type:"page",label:y,mayBeFastBackward:!1,mayBeFastForward:!1,active:e===y});return h?(s=!0,l=v+1,f.push({type:"fast-forward",active:!1,label:void 0,options:n?eo(v+1,c-1):null})):v===c-2&&f[f.length-1].label!==c-1&&f.push({type:"page",mayBeFastForward:!0,mayBeFastBackward:!1,label:c-1,active:e===c-1}),f[f.length-1].label!==c&&f.push({type:"page",mayBeFastForward:!1,mayBeFastBackward:!1,label:c,active:e===c}),{hasFastBackward:a,hasFastForward:s,fastBackwardTo:d,fastForwardTo:l,items:f}}function eo(e,t){const o=[];for(let n=e;n<=t;++n)o.push({label:`${n}`,value:n});return o}const rr=Object.assign(Object.assign({},Ce.props),{simple:Boolean,page:Number,defaultPage:{type:Number,default:1},itemCount:Number,pageCount:Number,defaultPageCount:{type:Number,default:1},showSizePicker:Boolean,pageSize:Number,defaultPageSize:Number,pageSizes:{type:Array,default(){return[10]}},showQuickJumper:Boolean,size:String,disabled:Boolean,pageSlot:{type:Number,default:9},selectProps:Object,prev:Function,next:Function,goto:Function,prefix:Function,suffix:Function,label:Function,displayOrder:{type:Array,default:["pages","size-picker","quick-jumper"]},to:at.propTo,showQuickJumpDropdown:{type:Boolean,default:!0},scrollbarProps:Object,"onUpdate:page":[Function,Array],onUpdatePage:[Function,Array],"onUpdate:pageSize":[Function,Array],onUpdatePageSize:[Function,Array],onPageSizeChange:[Function,Array],onChange:[Function,Array]}),dr=he({name:"Pagination",props:rr,slots:Object,setup(e){const{mergedComponentPropsRef:t,mergedClsPrefixRef:o,inlineThemeDisabled:n,mergedRtlRef:a}=Oe(e),s=R(()=>{var p,B;return e.size||((B=(p=t?.value)===null||p===void 0?void 0:p.Pagination)===null||B===void 0?void 0:B.size)||"medium"}),d=Ce("Pagination","-pagination",tr,er,e,o),{localeRef:l}=Mt("Pagination"),u=O(null),c=O(e.defaultPage),C=O(or(e)),v=st(ae(e,"page"),c),P=st(ae(e,"pageSize"),C),S=R(()=>{const{itemCount:p}=e;if(p!==void 0)return Math.max(1,Math.ceil(p/P.value));const{pageCount:B}=e;return B!==void 0?Math.max(B,1):1}),h=O("");it(()=>{e.simple,h.value=String(v.value)});const f=O(!1),y=O(!1),F=O(!1),z=O(!1),N=()=>{e.disabled||(f.value=!0,E())},K=()=>{e.disabled||(f.value=!1,E())},Z=()=>{y.value=!0,E()},W=()=>{y.value=!1,E()},re=p=>{L(p)},ee=R(()=>nr(v.value,S.value,e.pageSlot,e.showQuickJumpDropdown));it(()=>{ee.value.hasFastBackward?ee.value.hasFastForward||(f.value=!1,F.value=!1):(y.value=!1,z.value=!1)});const fe=R(()=>{const p=l.value.selectionSuffix;return e.pageSizes.map(B=>typeof B=="number"?{label:`${B} / ${p}`,value:B}:B)}),pe=R(()=>{var p,B;return((B=(p=t?.value)===null||p===void 0?void 0:p.Pagination)===null||B===void 0?void 0:B.inputSize)||Vt(s.value)}),oe=R(()=>{var p,B;return((B=(p=t?.value)===null||p===void 0?void 0:p.Pagination)===null||B===void 0?void 0:B.selectSize)||Vt(s.value)}),ne=R(()=>(v.value-1)*P.value),m=R(()=>{const p=v.value*P.value-1,{itemCount:B}=e;return B!==void 0&&p>B-1?B-1:p}),M=R(()=>{const{itemCount:p}=e;return p!==void 0?p:(e.pageCount||1)*P.value}),H=ct("Pagination",a,o);function E(){et(()=>{var p;const{value:B}=u;B&&(B.classList.add("transition-disabled"),(p=u.value)===null||p===void 0||p.offsetWidth,B.classList.remove("transition-disabled"))})}function L(p){if(p===v.value)return;const{"onUpdate:page":B,onUpdatePage:me,onChange:be,simple:Se}=e;B&&le(B,p),me&&le(me,p),be&&le(be,p),c.value=p,Se&&(h.value=String(p))}function G(p){if(p===P.value)return;const{"onUpdate:pageSize":B,onUpdatePageSize:me,onPageSizeChange:be}=e;B&&le(B,p),me&&le(me,p),be&&le(be,p),C.value=p,S.value<v.value&&L(S.value)}function q(){if(e.disabled)return;const p=Math.min(v.value+1,S.value);L(p)}function _(){if(e.disabled)return;const p=Math.max(v.value-1,1);L(p)}function Y(){if(e.disabled)return;const p=Math.min(ee.value.fastForwardTo,S.value);L(p)}function te(){if(e.disabled)return;const p=Math.max(ee.value.fastBackwardTo,1);L(p)}function se(p){G(p)}function g(){const p=Number.parseInt(h.value);Number.isNaN(p)||(L(Math.max(1,Math.min(p,S.value))),e.simple||(h.value=""))}function x(){g()}function X(p){if(!e.disabled)switch(p.type){case"page":L(p.label);break;case"fast-backward":te();break;case"fast-forward":Y();break}}function ve(p){h.value=p.replace(/\D+/g,"")}it(()=>{v.value,P.value,E()});const ge=R(()=>{const p=s.value,{self:{buttonBorder:B,buttonBorderHover:me,buttonBorderPressed:be,buttonIconColor:Se,buttonIconColorHover:Be,buttonIconColorPressed:ze,itemTextColor:ke,itemTextColorHover:$e,itemTextColorPressed:_e,itemTextColorActive:Le,itemTextColorDisabled:Fe,itemColor:Pe,itemColorHover:xe,itemColorPressed:b,itemColorActive:k,itemColorActiveHover:ie,itemColorDisabled:Ke,itemBorder:qe,itemBorderHover:Ze,itemBorderPressed:He,itemBorderActive:Ne,itemBorderDisabled:De,itemBorderRadius:Ge,jumperTextColor:Je,jumperTextColorDisabled:Ve,buttonColor:ye,buttonColorHover:i,buttonColorPressed:w,[V("itemPadding",p)]:I,[V("itemMargin",p)]:j,[V("inputWidth",p)]:$,[V("selectWidth",p)]:A,[V("inputMargin",p)]:D,[V("selectMargin",p)]:ce,[V("jumperFontSize",p)]:we,[V("prefixMargin",p)]:ft,[V("suffixMargin",p)]:vt,[V("itemSize",p)]:gt,[V("buttonIconSize",p)]:pt,[V("itemFontSize",p)]:mt,[`${V("itemMargin",p)}Rtl`]:bt,[`${V("inputMargin",p)}Rtl`]:Ct},common:{cubicBezierEaseInOut:xt}}=d.value;return{"--n-prefix-margin":ft,"--n-suffix-margin":vt,"--n-item-font-size":mt,"--n-select-width":A,"--n-select-margin":ce,"--n-input-width":$,"--n-input-margin":D,"--n-input-margin-rtl":Ct,"--n-item-size":gt,"--n-item-text-color":ke,"--n-item-text-color-disabled":Fe,"--n-item-text-color-hover":$e,"--n-item-text-color-active":Le,"--n-item-text-color-pressed":_e,"--n-item-color":Pe,"--n-item-color-hover":xe,"--n-item-color-disabled":Ke,"--n-item-color-active":k,"--n-item-color-active-hover":ie,"--n-item-color-pressed":b,"--n-item-border":qe,"--n-item-border-hover":Ze,"--n-item-border-disabled":De,"--n-item-border-active":Ne,"--n-item-border-pressed":He,"--n-item-padding":I,"--n-item-border-radius":Ge,"--n-bezier":xt,"--n-jumper-font-size":we,"--n-jumper-text-color":Je,"--n-jumper-text-color-disabled":Ve,"--n-item-margin":j,"--n-item-margin-rtl":bt,"--n-button-icon-size":pt,"--n-button-icon-color":Se,"--n-button-icon-color-hover":Be,"--n-button-icon-color-pressed":ze,"--n-button-color-hover":i,"--n-button-color":ye,"--n-button-color-pressed":w,"--n-button-border":B,"--n-button-border-hover":me,"--n-button-border-pressed":be}}),de=n?je("pagination",R(()=>{let p="";return p+=s.value[0],p}),ge,e):void 0;return{rtlEnabled:H,mergedClsPrefix:o,locale:l,selfRef:u,mergedPage:v,pageItems:R(()=>ee.value.items),mergedItemCount:M,jumperValue:h,pageSizeOptions:fe,mergedPageSize:P,inputSize:pe,selectSize:oe,mergedTheme:d,mergedPageCount:S,startIndex:ne,endIndex:m,showFastForwardMenu:F,showFastBackwardMenu:z,fastForwardActive:f,fastBackwardActive:y,handleMenuSelect:re,handleFastForwardMouseenter:N,handleFastForwardMouseleave:K,handleFastBackwardMouseenter:Z,handleFastBackwardMouseleave:W,handleJumperInput:ve,handleBackwardClick:_,handleForwardClick:q,handlePageItemClick:X,handleSizePickerChange:se,handleQuickJumperChange:x,cssVars:n?void 0:ge,themeClass:de?.themeClass,onRender:de?.onRender}},render(){const{$slots:e,mergedClsPrefix:t,disabled:o,cssVars:n,mergedPage:a,mergedPageCount:s,pageItems:d,showSizePicker:l,showQuickJumper:u,mergedTheme:c,locale:C,inputSize:v,selectSize:P,mergedPageSize:S,pageSizeOptions:h,jumperValue:f,simple:y,prev:F,next:z,prefix:N,suffix:K,label:Z,goto:W,handleJumperInput:re,handleSizePickerChange:ee,handleBackwardClick:fe,handlePageItemClick:pe,handleForwardClick:oe,handleQuickJumperChange:ne,onRender:m}=this;m?.();const M=N||e.prefix,H=K||e.suffix,E=F||e.prev,L=z||e.next,G=Z||e.label;return r("div",{ref:"selfRef",class:[`${t}-pagination`,this.themeClass,this.rtlEnabled&&`${t}-pagination--rtl`,o&&`${t}-pagination--disabled`,y&&`${t}-pagination--simple`],style:n},M?r("div",{class:`${t}-pagination-prefix`},M({page:a,pageSize:S,pageCount:s,startIndex:this.startIndex,endIndex:this.endIndex,itemCount:this.mergedItemCount})):null,this.displayOrder.map(q=>{switch(q){case"pages":return r(Ft,null,r("div",{class:[`${t}-pagination-item`,!E&&`${t}-pagination-item--button`,(a<=1||a>s||o)&&`${t}-pagination-item--disabled`],onClick:fe},E?E({page:a,pageSize:S,pageCount:s,startIndex:this.startIndex,endIndex:this.endIndex,itemCount:this.mergedItemCount}):r(Me,{clsPrefix:t},{default:()=>this.rtlEnabled?r(qt,null):r(Wt,null)})),y?r(Ft,null,r("div",{class:`${t}-pagination-quick-jumper`},r($t,{value:f,onUpdateValue:re,size:v,placeholder:"",disabled:o,theme:c.peers.Input,themeOverrides:c.peerOverrides.Input,onChange:ne}))," /"," ",s):d.map((_,Y)=>{let te,se,g;const{type:x}=_;switch(x){case"page":const ve=_.label;G?te=G({type:"page",node:ve,active:_.active}):te=ve;break;case"fast-forward":const ge=this.fastForwardActive?r(Me,{clsPrefix:t},{default:()=>this.rtlEnabled?r(Ut,null):r(Kt,null)}):r(Me,{clsPrefix:t},{default:()=>r(Zt,null)});G?te=G({type:"fast-forward",node:ge,active:this.fastForwardActive||this.showFastForwardMenu}):te=ge,se=this.handleFastForwardMouseenter,g=this.handleFastForwardMouseleave;break;case"fast-backward":const de=this.fastBackwardActive?r(Me,{clsPrefix:t},{default:()=>this.rtlEnabled?r(Kt,null):r(Ut,null)}):r(Me,{clsPrefix:t},{default:()=>r(Zt,null)});G?te=G({type:"fast-backward",node:de,active:this.fastBackwardActive||this.showFastBackwardMenu}):te=de,se=this.handleFastBackwardMouseenter,g=this.handleFastBackwardMouseleave;break}const X=r("div",{key:Y,class:[`${t}-pagination-item`,_.active&&`${t}-pagination-item--active`,x!=="page"&&(x==="fast-backward"&&this.showFastBackwardMenu||x==="fast-forward"&&this.showFastForwardMenu)&&`${t}-pagination-item--hover`,o&&`${t}-pagination-item--disabled`,x==="page"&&`${t}-pagination-item--clickable`],onClick:()=>{pe(_)},onMouseenter:se,onMouseleave:g},te);if(x==="page"&&!_.mayBeFastBackward&&!_.mayBeFastForward)return X;{const ve=_.type==="page"?_.mayBeFastBackward?"fast-backward":"fast-forward":_.type;return _.type!=="page"&&!_.options?X:r(qn,{to:this.to,key:ve,disabled:o,trigger:"hover",virtualScroll:!0,style:{width:"60px"},theme:c.peers.Popselect,themeOverrides:c.peerOverrides.Popselect,builtinThemeOverrides:{peers:{InternalSelectMenu:{height:"calc(var(--n-option-height) * 4.6)"}}},nodeProps:()=>({style:{justifyContent:"center"}}),show:x==="page"?!1:x==="fast-backward"?this.showFastBackwardMenu:this.showFastForwardMenu,onUpdateShow:ge=>{x!=="page"&&(ge?x==="fast-backward"?this.showFastBackwardMenu=ge:this.showFastForwardMenu=ge:(this.showFastBackwardMenu=!1,this.showFastForwardMenu=!1))},options:_.type!=="page"&&_.options?_.options:[],onUpdateValue:this.handleMenuSelect,scrollable:!0,scrollbarProps:this.scrollbarProps,showCheckmark:!1},{default:()=>X})}}),r("div",{class:[`${t}-pagination-item`,!L&&`${t}-pagination-item--button`,{[`${t}-pagination-item--disabled`]:a<1||a>=s||o}],onClick:oe},L?L({page:a,pageSize:S,pageCount:s,itemCount:this.mergedItemCount,startIndex:this.startIndex,endIndex:this.endIndex}):r(Me,{clsPrefix:t},{default:()=>this.rtlEnabled?r(Wt,null):r(qt,null)})));case"size-picker":return!y&&l?r(Qn,Object.assign({consistentMenuWidth:!1,placeholder:"",showCheckmark:!1,to:this.to},this.selectProps,{size:P,options:h,value:S,disabled:o,scrollbarProps:this.scrollbarProps,theme:c.peers.Select,themeOverrides:c.peerOverrides.Select,onUpdateValue:ee})):null;case"quick-jumper":return!y&&u?r("div",{class:`${t}-pagination-quick-jumper`},W?W():to(this.$slots.goto,()=>[C.goto]),r($t,{value:f,onUpdateValue:re,size:v,placeholder:"",disabled:o,theme:c.peers.Input,themeOverrides:c.peerOverrides.Input,onChange:ne})):null;default:return null}}),H?r("div",{class:`${t}-pagination-suffix`},H({page:a,pageSize:S,pageCount:s,startIndex:this.startIndex,endIndex:this.endIndex,itemCount:this.mergedItemCount})):null)}});export{dr as N,pn as V,Qn as a,kn as b,vo as e,or as g,er as p};
