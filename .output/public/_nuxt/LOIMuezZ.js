import{e as Q,y as v,m as L,z as He,A as $t,F as Bt,p as ee,h as ce,f as Fe,B as kt,j as Wt,C as _t,T as At,D as Et,q as fe,E as Vt,G as I,c as jt,a as D,b as z,w as E,l as w,H as Mt,k as It,I as Ht,x as Le,o as $e,d as ne,t as Ft}from"./BM6ME39p.js";import{u as Ot,N as K}from"./DJuM8oin.js";import{u as Gt,i as le,r as Nt,d as Dt,c as Ut,t as qt,a as r,b,e as T,f as k,g as Xt,h as Oe,j as Be,k as Yt,l as Kt,m as H,n as oe,B as pe}from"./XdxhtZuh.js";import{N as ke,a as J}from"./nnvvrfsJ.js";import{i as Jt,N as Qt,a as Zt,f as ue,V as ve,u as ea,d as ta,g as ie}from"./DS6xNQHv.js";import{c as aa,a as We,r as ra,o as na,b as oa,u as _e}from"./Dd8xCdJF.js";import{N as ia}from"./i3jpS6Gf.js";import{_ as la}from"./DlAUqK2U.js";import"./4uMTIQvU.js";const sa=We(".v-x-scroll",{overflow:"auto",scrollbarWidth:"none"},[We("&::-webkit-scrollbar",{width:0,height:0})]),da=Q({name:"XScroll",props:{disabled:Boolean,onScroll:Function},setup(){const e=L(null);function n(d){!(d.currentTarget.offsetWidth<d.currentTarget.scrollWidth)||d.deltaY===0||(d.currentTarget.scrollLeft+=d.deltaY+d.deltaX,d.preventDefault())}const l=Gt();return sa.mount({id:"vueuc/x-scroll",head:!0,anchorMetaName:aa,ssr:l}),Object.assign({selfRef:e,handleWheel:n},{scrollTo(...d){var y;(y=e.value)===null||y===void 0||y.scrollTo(...d)}})},render(){return v("div",{ref:"selfRef",onScroll:this.onScroll,onWheel:this.disabled?void 0:this.handleWheel,class:"v-x-scroll"},this.$slots)}});var ba=/\s/;function ca(e){for(var n=e.length;n--&&ba.test(e.charAt(n)););return n}var fa=/^\s+/;function pa(e){return e&&e.slice(0,ca(e)+1).replace(fa,"")}var Ae=NaN,ua=/^[-+]0x[0-9a-f]+$/i,va=/^0b[01]+$/i,ga=/^0o[0-7]+$/i,ma=parseInt;function Ee(e){if(typeof e=="number")return e;if(Jt(e))return Ae;if(le(e)){var n=typeof e.valueOf=="function"?e.valueOf():e;e=le(n)?n+"":n}if(typeof e!="string")return e===0?e:+e;e=pa(e);var l=va.test(e);return l||ga.test(e)?ma(e.slice(2),l?2:8):ua.test(e)?Ae:+e}var ge=function(){return Nt.Date.now()},ha="Expected a function",xa=Math.max,ya=Math.min;function Sa(e,n,l){var p,d,y,g,s,h,S=0,C=!1,P=!1,$=!0;if(typeof e!="function")throw new TypeError(ha);n=Ee(n)||0,le(l)&&(C=!!l.leading,P="maxWait"in l,y=P?xa(Ee(l.maxWait)||0,n):y,$="trailing"in l?!!l.trailing:$);function c(f){var A=p,G=d;return p=d=void 0,S=f,g=e.apply(G,A),g}function o(f){return S=f,s=setTimeout(_,n),C?c(f):g}function m(f){var A=f-h,G=f-S,N=n-A;return P?ya(N,y-G):N}function B(f){var A=f-h,G=f-S;return h===void 0||A>=n||A<0||P&&G>=y}function _(){var f=ge();if(B(f))return W(f);s=setTimeout(_,m(f))}function W(f){return s=void 0,$&&p?c(f):(p=d=void 0,g)}function F(){s!==void 0&&clearTimeout(s),S=0,p=h=d=s=void 0}function M(){return s===void 0?g:W(ge())}function x(){var f=ge(),A=B(f);if(p=arguments,d=this,h=f,A){if(s===void 0)return o(h);if(P)return clearTimeout(s),s=setTimeout(_,n),c(h)}return s===void 0&&(s=setTimeout(_,n)),g}return x.cancel=F,x.flush=M,x}var Ca="Expected a function";function wa(e,n,l){var p=!0,d=!0;if(typeof e!="function")throw new TypeError(Ca);return le(l)&&(p="leading"in l?!!l.leading:p,d="trailing"in l?!!l.trailing:d),Sa(e,n,{leading:p,maxWait:n,trailing:d})}const Ta=Q({name:"Add",render(){return v("svg",{width:"512",height:"512",viewBox:"0 0 512 512",fill:"none",xmlns:"http://www.w3.org/2000/svg"},v("path",{d:"M256 112V400M400 256H112",stroke:"currentColor","stroke-width":"32","stroke-linecap":"round","stroke-linejoin":"round"}))}}),Pa={tabFontSizeSmall:"14px",tabFontSizeMedium:"14px",tabFontSizeLarge:"16px",tabGapSmallLine:"36px",tabGapMediumLine:"36px",tabGapLargeLine:"36px",tabGapSmallLineVertical:"8px",tabGapMediumLineVertical:"8px",tabGapLargeLineVertical:"8px",tabPaddingSmallLine:"6px 0",tabPaddingMediumLine:"10px 0",tabPaddingLargeLine:"14px 0",tabPaddingVerticalSmallLine:"6px 12px",tabPaddingVerticalMediumLine:"8px 16px",tabPaddingVerticalLargeLine:"10px 20px",tabGapSmallBar:"36px",tabGapMediumBar:"36px",tabGapLargeBar:"36px",tabGapSmallBarVertical:"8px",tabGapMediumBarVertical:"8px",tabGapLargeBarVertical:"8px",tabPaddingSmallBar:"4px 0",tabPaddingMediumBar:"6px 0",tabPaddingLargeBar:"10px 0",tabPaddingVerticalSmallBar:"6px 12px",tabPaddingVerticalMediumBar:"8px 16px",tabPaddingVerticalLargeBar:"10px 20px",tabGapSmallCard:"4px",tabGapMediumCard:"4px",tabGapLargeCard:"4px",tabGapSmallCardVertical:"4px",tabGapMediumCardVertical:"4px",tabGapLargeCardVertical:"4px",tabPaddingSmallCard:"8px 16px",tabPaddingMediumCard:"10px 20px",tabPaddingLargeCard:"12px 24px",tabPaddingSmallSegment:"4px 0",tabPaddingMediumSegment:"6px 0",tabPaddingLargeSegment:"8px 0",tabPaddingVerticalLargeSegment:"0 8px",tabPaddingVerticalSmallCard:"8px 12px",tabPaddingVerticalMediumCard:"10px 16px",tabPaddingVerticalLargeCard:"12px 20px",tabPaddingVerticalSmallSegment:"0 4px",tabPaddingVerticalMediumSegment:"0 6px",tabGapSmallSegment:"0",tabGapMediumSegment:"0",tabGapLargeSegment:"0",tabGapSmallSegmentVertical:"0",tabGapMediumSegmentVertical:"0",tabGapLargeSegmentVertical:"0",panePaddingSmall:"8px 0 0 0",panePaddingMedium:"12px 0 0 0",panePaddingLarge:"16px 0 0 0",closeSize:"18px",closeIconSize:"14px"};function Ra(e){const{textColor2:n,primaryColor:l,textColorDisabled:p,closeIconColor:d,closeIconColorHover:y,closeIconColorPressed:g,closeColorHover:s,closeColorPressed:h,tabColor:S,baseColor:C,dividerColor:P,fontWeight:$,textColor1:c,borderRadius:o,fontSize:m,fontWeightStrong:B}=e;return Object.assign(Object.assign({},Pa),{colorSegment:S,tabFontSizeCard:m,tabTextColorLine:c,tabTextColorActiveLine:l,tabTextColorHoverLine:l,tabTextColorDisabledLine:p,tabTextColorSegment:c,tabTextColorActiveSegment:n,tabTextColorHoverSegment:n,tabTextColorDisabledSegment:p,tabTextColorBar:c,tabTextColorActiveBar:l,tabTextColorHoverBar:l,tabTextColorDisabledBar:p,tabTextColorCard:c,tabTextColorHoverCard:c,tabTextColorActiveCard:l,tabTextColorDisabledCard:p,barColor:l,closeIconColor:d,closeIconColorHover:y,closeIconColorPressed:g,closeColorHover:s,closeColorPressed:h,closeBorderRadius:o,tabColor:S,tabColorSegment:C,tabBorderColor:P,tabFontWeightActive:$,tabFontWeight:$,tabBorderRadius:o,paneTextColor:n,fontWeightStrong:B})}const za={common:Dt,self:Ra},ye=Ut("n-tabs"),Ge={tab:[String,Number,Object,Function],name:{type:[String,Number],required:!0},disabled:Boolean,displayDirective:{type:String,default:"if"},closable:{type:Boolean,default:void 0},tabProps:Object,label:[String,Number,Object,Function]},Ve=Q({__TAB_PANE__:!0,name:"TabPane",alias:["TabPanel"],props:Ge,slots:Object,setup(e){const n=He(ye,null);return n||qt("tab-pane","`n-tab-pane` must be placed inside `n-tabs`."),{style:n.paneStyleRef,class:n.paneClassRef,mergedClsPrefix:n.mergedClsPrefixRef}},render(){return v("div",{class:[`${this.mergedClsPrefix}-tab-pane`,this.class],style:this.style},this.$slots)}}),La=Object.assign({internalLeftPadded:Boolean,internalAddable:Boolean,internalCreatedByPane:Boolean},na(Ge,["displayDirective"])),xe=Q({__TAB__:!0,inheritAttrs:!1,name:"Tab",props:La,setup(e){const{mergedClsPrefixRef:n,valueRef:l,typeRef:p,closableRef:d,tabStyleRef:y,addTabStyleRef:g,tabClassRef:s,addTabClassRef:h,tabChangeIdRef:S,onBeforeLeaveRef:C,triggerRef:P,handleAdd:$,activateTab:c,handleClose:o}=He(ye);return{trigger:P,mergedClosable:ee(()=>{if(e.internalAddable)return!1;const{closable:m}=e;return m===void 0?d.value:m}),style:y,addStyle:g,tabClass:s,addTabClass:h,clsPrefix:n,value:l,type:p,handleClose(m){m.stopPropagation(),!e.disabled&&o(e.name)},activateTab(){if(e.disabled)return;if(e.internalAddable){$();return}const{name:m}=e,B=++S.id;if(m!==l.value){const{value:_}=C;_?Promise.resolve(_(e.name,l.value)).then(W=>{W&&S.id===B&&c(m)}):c(m)}}}},render(){const{internalAddable:e,clsPrefix:n,name:l,disabled:p,label:d,tab:y,value:g,mergedClosable:s,trigger:h,$slots:{default:S}}=this,C=d??y;return v("div",{class:`${n}-tabs-tab-wrapper`},this.internalLeftPadded?v("div",{class:`${n}-tabs-tab-pad`}):null,v("div",Object.assign({key:l,"data-name":l,"data-disabled":p?!0:void 0},$t({class:[`${n}-tabs-tab`,g===l&&`${n}-tabs-tab--active`,p&&`${n}-tabs-tab--disabled`,s&&`${n}-tabs-tab--closable`,e&&`${n}-tabs-tab--addable`,e?this.addTabClass:this.tabClass],onClick:h==="click"?this.activateTab:void 0,onMouseenter:h==="hover"?this.activateTab:void 0,style:e?this.addStyle:this.style},this.internalCreatedByPane?this.tabProps||{}:this.$attrs)),v("span",{class:`${n}-tabs-tab__label`},e?v(Bt,null,v("div",{class:`${n}-tabs-tab__height-placeholder`}," "),v(Qt,{clsPrefix:n},{default:()=>v(Ta,null)})):S?S():typeof C=="object"?C:ra(C??l)),s&&this.type==="card"?v(Zt,{clsPrefix:n,class:`${n}-tabs-tab__close`,onClick:this.handleClose,disabled:p}):null))}}),$a=r("tabs",`
 box-sizing: border-box;
 width: 100%;
 display: flex;
 flex-direction: column;
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
`,[b("segment-type",[r("tabs-rail",[T("&.transition-disabled",[r("tabs-capsule",`
 transition: none;
 `)])])]),b("top",[r("tab-pane",`
 padding: var(--n-pane-padding-top) var(--n-pane-padding-right) var(--n-pane-padding-bottom) var(--n-pane-padding-left);
 `)]),b("left",[r("tab-pane",`
 padding: var(--n-pane-padding-right) var(--n-pane-padding-bottom) var(--n-pane-padding-left) var(--n-pane-padding-top);
 `)]),b("left, right",`
 flex-direction: row;
 `,[r("tabs-bar",`
 width: 2px;
 right: 0;
 transition:
 top .2s var(--n-bezier),
 max-height .2s var(--n-bezier),
 background-color .3s var(--n-bezier);
 `),r("tabs-tab",`
 padding: var(--n-tab-padding-vertical); 
 `)]),b("right",`
 flex-direction: row-reverse;
 `,[r("tab-pane",`
 padding: var(--n-pane-padding-left) var(--n-pane-padding-top) var(--n-pane-padding-right) var(--n-pane-padding-bottom);
 `),r("tabs-bar",`
 left: 0;
 `)]),b("bottom",`
 flex-direction: column-reverse;
 justify-content: flex-end;
 `,[r("tab-pane",`
 padding: var(--n-pane-padding-bottom) var(--n-pane-padding-right) var(--n-pane-padding-top) var(--n-pane-padding-left);
 `),r("tabs-bar",`
 top: 0;
 `)]),r("tabs-rail",`
 position: relative;
 padding: 3px;
 border-radius: var(--n-tab-border-radius);
 width: 100%;
 background-color: var(--n-color-segment);
 transition: background-color .3s var(--n-bezier);
 display: flex;
 align-items: center;
 `,[r("tabs-capsule",`
 border-radius: var(--n-tab-border-radius);
 position: absolute;
 pointer-events: none;
 background-color: var(--n-tab-color-segment);
 box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .08);
 transition: transform 0.3s var(--n-bezier);
 `),r("tabs-tab-wrapper",`
 flex-basis: 0;
 flex-grow: 1;
 display: flex;
 align-items: center;
 justify-content: center;
 `,[r("tabs-tab",`
 overflow: hidden;
 border-radius: var(--n-tab-border-radius);
 width: 100%;
 display: flex;
 align-items: center;
 justify-content: center;
 `,[b("active",`
 font-weight: var(--n-font-weight-strong);
 color: var(--n-tab-text-color-active);
 `),T("&:hover",`
 color: var(--n-tab-text-color-hover);
 `)])])]),b("flex",[r("tabs-nav",`
 width: 100%;
 position: relative;
 `,[r("tabs-wrapper",`
 width: 100%;
 `,[r("tabs-tab",`
 margin-right: 0;
 `)])])]),r("tabs-nav",`
 box-sizing: border-box;
 line-height: 1.5;
 display: flex;
 transition: border-color .3s var(--n-bezier);
 `,[k("prefix, suffix",`
 display: flex;
 align-items: center;
 `),k("prefix","padding-right: 16px;"),k("suffix","padding-left: 16px;")]),b("top, bottom",[T(">",[r("tabs-nav",[r("tabs-nav-scroll-wrapper",[T("&::before",`
 top: 0;
 bottom: 0;
 left: 0;
 width: 20px;
 `),T("&::after",`
 top: 0;
 bottom: 0;
 right: 0;
 width: 20px;
 `),b("shadow-start",[T("&::before",`
 box-shadow: inset 10px 0 8px -8px rgba(0, 0, 0, .12);
 `)]),b("shadow-end",[T("&::after",`
 box-shadow: inset -10px 0 8px -8px rgba(0, 0, 0, .12);
 `)])])])])]),b("left, right",[r("tabs-nav-scroll-content",`
 flex-direction: column;
 `),T(">",[r("tabs-nav",[r("tabs-nav-scroll-wrapper",[T("&::before",`
 top: 0;
 left: 0;
 right: 0;
 height: 20px;
 `),T("&::after",`
 bottom: 0;
 left: 0;
 right: 0;
 height: 20px;
 `),b("shadow-start",[T("&::before",`
 box-shadow: inset 0 10px 8px -8px rgba(0, 0, 0, .12);
 `)]),b("shadow-end",[T("&::after",`
 box-shadow: inset 0 -10px 8px -8px rgba(0, 0, 0, .12);
 `)])])])])]),r("tabs-nav-scroll-wrapper",`
 flex: 1;
 position: relative;
 overflow: hidden;
 `,[r("tabs-nav-y-scroll",`
 height: 100%;
 width: 100%;
 overflow-y: auto; 
 scrollbar-width: none;
 `,[T("&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb",`
 width: 0;
 height: 0;
 display: none;
 `)]),T("&::before, &::after",`
 transition: box-shadow .3s var(--n-bezier);
 pointer-events: none;
 content: "";
 position: absolute;
 z-index: 1;
 `)]),r("tabs-nav-scroll-content",`
 display: flex;
 position: relative;
 min-width: 100%;
 min-height: 100%;
 width: fit-content;
 box-sizing: border-box;
 `),r("tabs-wrapper",`
 display: inline-flex;
 flex-wrap: nowrap;
 position: relative;
 `),r("tabs-tab-wrapper",`
 display: flex;
 flex-wrap: nowrap;
 flex-shrink: 0;
 flex-grow: 0;
 `),r("tabs-tab",`
 cursor: pointer;
 white-space: nowrap;
 flex-wrap: nowrap;
 display: inline-flex;
 align-items: center;
 color: var(--n-tab-text-color);
 font-size: var(--n-tab-font-size);
 background-clip: padding-box;
 padding: var(--n-tab-padding);
 transition:
 box-shadow .3s var(--n-bezier),
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `,[b("disabled",{cursor:"not-allowed"}),k("close",`
 margin-left: 6px;
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `),k("label",`
 display: flex;
 align-items: center;
 z-index: 1;
 `)]),r("tabs-bar",`
 position: absolute;
 bottom: 0;
 height: 2px;
 border-radius: 1px;
 background-color: var(--n-bar-color);
 transition:
 left .2s var(--n-bezier),
 max-width .2s var(--n-bezier),
 opacity .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 `,[T("&.transition-disabled",`
 transition: none;
 `),b("disabled",`
 background-color: var(--n-tab-text-color-disabled)
 `)]),r("tabs-pane-wrapper",`
 position: relative;
 overflow: hidden;
 transition: max-height .2s var(--n-bezier);
 `),r("tab-pane",`
 color: var(--n-pane-text-color);
 width: 100%;
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 opacity .2s var(--n-bezier);
 left: 0;
 right: 0;
 top: 0;
 `,[T("&.next-transition-leave-active, &.prev-transition-leave-active, &.next-transition-enter-active, &.prev-transition-enter-active",`
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 transform .2s var(--n-bezier),
 opacity .2s var(--n-bezier);
 `),T("&.next-transition-leave-active, &.prev-transition-leave-active",`
 position: absolute;
 `),T("&.next-transition-enter-from, &.prev-transition-leave-to",`
 transform: translateX(32px);
 opacity: 0;
 `),T("&.next-transition-leave-to, &.prev-transition-enter-from",`
 transform: translateX(-32px);
 opacity: 0;
 `),T("&.next-transition-leave-from, &.next-transition-enter-to, &.prev-transition-leave-from, &.prev-transition-enter-to",`
 transform: translateX(0);
 opacity: 1;
 `)]),r("tabs-tab-pad",`
 box-sizing: border-box;
 width: var(--n-tab-gap);
 flex-grow: 0;
 flex-shrink: 0;
 `),b("line-type, bar-type",[r("tabs-tab",`
 font-weight: var(--n-tab-font-weight);
 box-sizing: border-box;
 vertical-align: bottom;
 `,[T("&:hover",{color:"var(--n-tab-text-color-hover)"}),b("active",`
 color: var(--n-tab-text-color-active);
 font-weight: var(--n-tab-font-weight-active);
 `),b("disabled",{color:"var(--n-tab-text-color-disabled)"})])]),r("tabs-nav",[b("line-type",[b("top",[k("prefix, suffix",`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),r("tabs-nav-scroll-content",`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),r("tabs-bar",`
 bottom: -1px;
 `)]),b("left",[k("prefix, suffix",`
 border-right: 1px solid var(--n-tab-border-color);
 `),r("tabs-nav-scroll-content",`
 border-right: 1px solid var(--n-tab-border-color);
 `),r("tabs-bar",`
 right: -1px;
 `)]),b("right",[k("prefix, suffix",`
 border-left: 1px solid var(--n-tab-border-color);
 `),r("tabs-nav-scroll-content",`
 border-left: 1px solid var(--n-tab-border-color);
 `),r("tabs-bar",`
 left: -1px;
 `)]),b("bottom",[k("prefix, suffix",`
 border-top: 1px solid var(--n-tab-border-color);
 `),r("tabs-nav-scroll-content",`
 border-top: 1px solid var(--n-tab-border-color);
 `),r("tabs-bar",`
 top: -1px;
 `)]),k("prefix, suffix",`
 transition: border-color .3s var(--n-bezier);
 `),r("tabs-nav-scroll-content",`
 transition: border-color .3s var(--n-bezier);
 `),r("tabs-bar",`
 border-radius: 0;
 `)]),b("card-type",[k("prefix, suffix",`
 transition: border-color .3s var(--n-bezier);
 `),r("tabs-pad",`
 flex-grow: 1;
 transition: border-color .3s var(--n-bezier);
 `),r("tabs-tab-pad",`
 transition: border-color .3s var(--n-bezier);
 `),r("tabs-tab",`
 font-weight: var(--n-tab-font-weight);
 border: 1px solid var(--n-tab-border-color);
 background-color: var(--n-tab-color);
 box-sizing: border-box;
 position: relative;
 vertical-align: bottom;
 display: flex;
 justify-content: space-between;
 font-size: var(--n-tab-font-size);
 color: var(--n-tab-text-color);
 `,[b("addable",`
 padding-left: 8px;
 padding-right: 8px;
 font-size: 16px;
 justify-content: center;
 `,[k("height-placeholder",`
 width: 0;
 font-size: var(--n-tab-font-size);
 `),Xt("disabled",[T("&:hover",`
 color: var(--n-tab-text-color-hover);
 `)])]),b("closable","padding-right: 8px;"),b("active",`
 background-color: #0000;
 font-weight: var(--n-tab-font-weight-active);
 color: var(--n-tab-text-color-active);
 `),b("disabled","color: var(--n-tab-text-color-disabled);")])]),b("left, right",`
 flex-direction: column; 
 `,[k("prefix, suffix",`
 padding: var(--n-tab-padding-vertical);
 `),r("tabs-wrapper",`
 flex-direction: column;
 `),r("tabs-tab-wrapper",`
 flex-direction: column;
 `,[r("tabs-tab-pad",`
 height: var(--n-tab-gap-vertical);
 width: 100%;
 `)])]),b("top",[b("card-type",[r("tabs-scroll-padding","border-bottom: 1px solid var(--n-tab-border-color);"),k("prefix, suffix",`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),r("tabs-tab",`
 border-top-left-radius: var(--n-tab-border-radius);
 border-top-right-radius: var(--n-tab-border-radius);
 `,[b("active",`
 border-bottom: 1px solid #0000;
 `)]),r("tabs-tab-pad",`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),r("tabs-pad",`
 border-bottom: 1px solid var(--n-tab-border-color);
 `)])]),b("left",[b("card-type",[r("tabs-scroll-padding","border-right: 1px solid var(--n-tab-border-color);"),k("prefix, suffix",`
 border-right: 1px solid var(--n-tab-border-color);
 `),r("tabs-tab",`
 border-top-left-radius: var(--n-tab-border-radius);
 border-bottom-left-radius: var(--n-tab-border-radius);
 `,[b("active",`
 border-right: 1px solid #0000;
 `)]),r("tabs-tab-pad",`
 border-right: 1px solid var(--n-tab-border-color);
 `),r("tabs-pad",`
 border-right: 1px solid var(--n-tab-border-color);
 `)])]),b("right",[b("card-type",[r("tabs-scroll-padding","border-left: 1px solid var(--n-tab-border-color);"),k("prefix, suffix",`
 border-left: 1px solid var(--n-tab-border-color);
 `),r("tabs-tab",`
 border-top-right-radius: var(--n-tab-border-radius);
 border-bottom-right-radius: var(--n-tab-border-radius);
 `,[b("active",`
 border-left: 1px solid #0000;
 `)]),r("tabs-tab-pad",`
 border-left: 1px solid var(--n-tab-border-color);
 `),r("tabs-pad",`
 border-left: 1px solid var(--n-tab-border-color);
 `)])]),b("bottom",[b("card-type",[r("tabs-scroll-padding","border-top: 1px solid var(--n-tab-border-color);"),k("prefix, suffix",`
 border-top: 1px solid var(--n-tab-border-color);
 `),r("tabs-tab",`
 border-bottom-left-radius: var(--n-tab-border-radius);
 border-bottom-right-radius: var(--n-tab-border-radius);
 `,[b("active",`
 border-top: 1px solid #0000;
 `)]),r("tabs-tab-pad",`
 border-top: 1px solid var(--n-tab-border-color);
 `),r("tabs-pad",`
 border-top: 1px solid var(--n-tab-border-color);
 `)])])])]),me=wa,Ba=Object.assign(Object.assign({},Oe.props),{value:[String,Number],defaultValue:[String,Number],trigger:{type:String,default:"click"},type:{type:String,default:"bar"},closable:Boolean,justifyContent:String,size:String,placement:{type:String,default:"top"},tabStyle:[String,Object],tabClass:String,addTabStyle:[String,Object],addTabClass:String,barWidth:Number,paneClass:String,paneStyle:[String,Object],paneWrapperClass:String,paneWrapperStyle:[String,Object],addable:[Boolean,Object],tabsPadding:{type:Number,default:0},animated:Boolean,onBeforeLeave:Function,onAdd:Function,"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],onClose:[Function,Array],labelSize:String,activeName:[String,Number],onActiveNameChange:[Function,Array]}),ka=Q({name:"Tabs",props:Ba,slots:Object,setup(e,{slots:n}){var l,p,d,y;const{mergedClsPrefixRef:g,inlineThemeDisabled:s,mergedComponentPropsRef:h}=Yt(e),S=Oe("Tabs","-tabs",$a,za,e,g),C=L(null),P=L(null),$=L(null),c=L(null),o=L(null),m=L(null),B=L(!0),_=L(!0),W=_e(e,["labelSize","size"]),F=ee(()=>{var t,a;if(W.value)return W.value;const i=(a=(t=h?.value)===null||t===void 0?void 0:t.Tabs)===null||a===void 0?void 0:a.size;return i||"medium"}),M=_e(e,["activeName","value"]),x=L((p=(l=M.value)!==null&&l!==void 0?l:e.defaultValue)!==null&&p!==void 0?p:n.default?(y=(d=ue(n.default())[0])===null||d===void 0?void 0:d.props)===null||y===void 0?void 0:y.name:null),f=ea(M,x),A={id:0},G=ee(()=>{if(!(!e.justifyContent||e.type==="card"))return{display:"flex",justifyContent:e.justifyContent}});ce(f,()=>{A.id=0,te(),Ce()});function N(){var t;const{value:a}=f;return a===null?null:(t=C.value)===null||t===void 0?void 0:t.querySelector(`[data-name="${a}"]`)}function Ne(t){if(e.type==="card")return;const{value:a}=P;if(!a)return;const i=a.style.opacity==="0";if(t){const u=`${g.value}-tabs-bar--disabled`,{barWidth:R,placement:V}=e;if(t.dataset.disabled==="true"?a.classList.add(u):a.classList.remove(u),["top","bottom"].includes(V)){if(Se(["top","maxHeight","height"]),typeof R=="number"&&t.offsetWidth>=R){const j=Math.floor((t.offsetWidth-R)/2)+t.offsetLeft;a.style.left=`${j}px`,a.style.maxWidth=`${R}px`}else a.style.left=`${t.offsetLeft}px`,a.style.maxWidth=`${t.offsetWidth}px`;a.style.width="8192px",i&&(a.style.transition="none"),a.offsetWidth,i&&(a.style.transition="",a.style.opacity="1")}else{if(Se(["left","maxWidth","width"]),typeof R=="number"&&t.offsetHeight>=R){const j=Math.floor((t.offsetHeight-R)/2)+t.offsetTop;a.style.top=`${j}px`,a.style.maxHeight=`${R}px`}else a.style.top=`${t.offsetTop}px`,a.style.maxHeight=`${t.offsetHeight}px`;a.style.height="8192px",i&&(a.style.transition="none"),a.offsetHeight,i&&(a.style.transition="",a.style.opacity="1")}}}function De(){if(e.type==="card")return;const{value:t}=P;t&&(t.style.opacity="0")}function Se(t){const{value:a}=P;if(a)for(const i of t)a.style[i]=""}function te(){if(e.type==="card")return;const t=N();t?Ne(t):De()}function Ce(){var t;const a=(t=o.value)===null||t===void 0?void 0:t.$el;if(!a)return;const i=N();if(!i)return;const{scrollLeft:u,offsetWidth:R}=a,{offsetLeft:V,offsetWidth:j}=i;u>V?a.scrollTo({top:0,left:V,behavior:"smooth"}):V+j>u+R&&a.scrollTo({top:0,left:V+j-R,behavior:"smooth"})}const ae=L(null);let se=0,O=null;function Ue(t){const a=ae.value;if(a){se=t.getBoundingClientRect().height;const i=`${se}px`,u=()=>{a.style.height=i,a.style.maxHeight=i};O?(u(),O(),O=null):O=u}}function qe(t){const a=ae.value;if(a){const i=t.getBoundingClientRect().height,u=()=>{document.body.offsetHeight,a.style.maxHeight=`${i}px`,a.style.height=`${Math.max(se,i)}px`};O?(O(),O=null,u()):O=u}}function Xe(){const t=ae.value;if(t){t.style.maxHeight="",t.style.height="";const{paneWrapperStyle:a}=e;if(typeof a=="string")t.style.cssText=a;else if(a){const{maxHeight:i,height:u}=a;i!==void 0&&(t.style.maxHeight=i),u!==void 0&&(t.style.height=u)}}}const we={value:[]},Te=L("next");function Ye(t){const a=f.value;let i="next";for(const u of we.value){if(u===a)break;if(u===t){i="prev";break}}Te.value=i,Ke(t)}function Ke(t){const{onActiveNameChange:a,onUpdateValue:i,"onUpdate:value":u}=e;a&&oe(a,t),i&&oe(i,t),u&&oe(u,t),x.value=t}function Je(t){const{onClose:a}=e;a&&oe(a,t)}function Pe(){const{value:t}=P;if(!t)return;const a="transition-disabled";t.classList.add(a),te(),t.classList.remove(a)}const U=L(null);function de({transitionDisabled:t}){const a=C.value;if(!a)return;t&&a.classList.add("transition-disabled");const i=N();i&&U.value&&(U.value.style.width=`${i.offsetWidth}px`,U.value.style.height=`${i.offsetHeight}px`,U.value.style.transform=`translateX(${i.offsetLeft-ta(getComputedStyle(a).paddingLeft)}px)`,t&&U.value.offsetWidth),t&&a.classList.remove("transition-disabled")}ce([f],()=>{e.type==="segment"&&fe(()=>{de({transitionDisabled:!1})})}),Fe(()=>{e.type==="segment"&&de({transitionDisabled:!0})});let Re=0;function Qe(t){var a;if(t.contentRect.width===0&&t.contentRect.height===0||Re===t.contentRect.width)return;Re=t.contentRect.width;const{type:i}=e;if((i==="line"||i==="bar")&&Pe(),i!=="segment"){const{placement:u}=e;be((u==="top"||u==="bottom"?(a=o.value)===null||a===void 0?void 0:a.$el:m.value)||null)}}const Ze=me(Qe,64);ce([()=>e.justifyContent,()=>e.size],()=>{fe(()=>{const{type:t}=e;(t==="line"||t==="bar")&&Pe()})});const q=L(!1);function et(t){var a;const{target:i,contentRect:{width:u,height:R}}=t,V=i.parentElement.parentElement.offsetWidth,j=i.parentElement.parentElement.offsetHeight,{placement:Y}=e;if(!q.value)Y==="top"||Y==="bottom"?V<u&&(q.value=!0):j<R&&(q.value=!0);else{const{value:Z}=c;if(!Z)return;Y==="top"||Y==="bottom"?V-u>Z.$el.offsetWidth&&(q.value=!1):j-R>Z.$el.offsetHeight&&(q.value=!1)}be(((a=o.value)===null||a===void 0?void 0:a.$el)||null)}const tt=me(et,64);function at(){const{onAdd:t}=e;t&&t(),fe(()=>{const a=N(),{value:i}=o;!a||!i||i.scrollTo({left:a.offsetLeft,top:0,behavior:"smooth"})})}function be(t){if(!t)return;const{placement:a}=e;if(a==="top"||a==="bottom"){const{scrollLeft:i,scrollWidth:u,offsetWidth:R}=t;B.value=i<=0,_.value=i+R>=u}else{const{scrollTop:i,scrollHeight:u,offsetHeight:R}=t;B.value=i<=0,_.value=i+R>=u}}const rt=me(t=>{be(t.target)},64);Vt(ye,{triggerRef:I(e,"trigger"),tabStyleRef:I(e,"tabStyle"),tabClassRef:I(e,"tabClass"),addTabStyleRef:I(e,"addTabStyle"),addTabClassRef:I(e,"addTabClass"),paneClassRef:I(e,"paneClass"),paneStyleRef:I(e,"paneStyle"),mergedClsPrefixRef:g,typeRef:I(e,"type"),closableRef:I(e,"closable"),valueRef:f,tabChangeIdRef:A,onBeforeLeaveRef:I(e,"onBeforeLeave"),activateTab:Ye,handleClose:Je,handleAdd:at}),oa(()=>{te(),Ce()}),kt(()=>{const{value:t}=$;if(!t)return;const{value:a}=g,i=`${a}-tabs-nav-scroll-wrapper--shadow-start`,u=`${a}-tabs-nav-scroll-wrapper--shadow-end`;B.value?t.classList.remove(i):t.classList.add(i),_.value?t.classList.remove(u):t.classList.add(u)});const nt={syncBarPosition:()=>{te()}},ot=()=>{de({transitionDisabled:!0})},ze=ee(()=>{const{value:t}=F,{type:a}=e,i={card:"Card",bar:"Bar",line:"Line",segment:"Segment"}[a],u=`${t}${i}`,{self:{barColor:R,closeIconColor:V,closeIconColorHover:j,closeIconColorPressed:Y,tabColor:Z,tabBorderColor:it,paneTextColor:lt,tabFontWeight:st,tabBorderRadius:dt,tabFontWeightActive:bt,colorSegment:ct,fontWeightStrong:ft,tabColorSegment:pt,closeSize:ut,closeIconSize:vt,closeColorHover:gt,closeColorPressed:mt,closeBorderRadius:ht,[H("panePadding",t)]:re,[H("tabPadding",u)]:xt,[H("tabPaddingVertical",u)]:yt,[H("tabGap",u)]:St,[H("tabGap",`${u}Vertical`)]:Ct,[H("tabTextColor",a)]:wt,[H("tabTextColorActive",a)]:Tt,[H("tabTextColorHover",a)]:Pt,[H("tabTextColorDisabled",a)]:Rt,[H("tabFontSize",t)]:zt},common:{cubicBezierEaseInOut:Lt}}=S.value;return{"--n-bezier":Lt,"--n-color-segment":ct,"--n-bar-color":R,"--n-tab-font-size":zt,"--n-tab-text-color":wt,"--n-tab-text-color-active":Tt,"--n-tab-text-color-disabled":Rt,"--n-tab-text-color-hover":Pt,"--n-pane-text-color":lt,"--n-tab-border-color":it,"--n-tab-border-radius":dt,"--n-close-size":ut,"--n-close-icon-size":vt,"--n-close-color-hover":gt,"--n-close-color-pressed":mt,"--n-close-border-radius":ht,"--n-close-icon-color":V,"--n-close-icon-color-hover":j,"--n-close-icon-color-pressed":Y,"--n-tab-color":Z,"--n-tab-font-weight":st,"--n-tab-font-weight-active":bt,"--n-tab-padding":xt,"--n-tab-padding-vertical":yt,"--n-tab-gap":St,"--n-tab-gap-vertical":Ct,"--n-pane-padding-left":ie(re,"left"),"--n-pane-padding-right":ie(re,"right"),"--n-pane-padding-top":ie(re,"top"),"--n-pane-padding-bottom":ie(re,"bottom"),"--n-font-weight-strong":ft,"--n-tab-color-segment":pt}}),X=s?Kt("tabs",ee(()=>`${F.value[0]}${e.type[0]}`),ze,e):void 0;return Object.assign({mergedClsPrefix:g,mergedValue:f,renderedNames:new Set,segmentCapsuleElRef:U,tabsPaneWrapperRef:ae,tabsElRef:C,barElRef:P,addTabInstRef:c,xScrollInstRef:o,scrollWrapperElRef:$,addTabFixed:q,tabWrapperStyle:G,handleNavResize:Ze,mergedSize:F,handleScroll:rt,handleTabsResize:tt,cssVars:s?void 0:ze,themeClass:X?.themeClass,animationDirection:Te,renderNameListRef:we,yScrollElRef:m,handleSegmentResize:ot,onAnimationBeforeLeave:Ue,onAnimationEnter:qe,onAnimationAfterEnter:Xe,onRender:X?.onRender},nt)},render(){const{mergedClsPrefix:e,type:n,placement:l,addTabFixed:p,addable:d,mergedSize:y,renderNameListRef:g,onRender:s,paneWrapperClass:h,paneWrapperStyle:S,$slots:{default:C,prefix:P,suffix:$}}=this;s?.();const c=C?ue(C()).filter(x=>x.type.__TAB_PANE__===!0):[],o=C?ue(C()).filter(x=>x.type.__TAB__===!0):[],m=!o.length,B=n==="card",_=n==="segment",W=!B&&!_&&this.justifyContent;g.value=[];const F=()=>{const x=v("div",{style:this.tabWrapperStyle,class:`${e}-tabs-wrapper`},W?null:v("div",{class:`${e}-tabs-scroll-padding`,style:l==="top"||l==="bottom"?{width:`${this.tabsPadding}px`}:{height:`${this.tabsPadding}px`}}),m?c.map((f,A)=>(g.value.push(f.props.name),he(v(xe,Object.assign({},f.props,{internalCreatedByPane:!0,internalLeftPadded:A!==0&&(!W||W==="center"||W==="start"||W==="end")}),f.children?{default:f.children.tab}:void 0)))):o.map((f,A)=>(g.value.push(f.props.name),he(A!==0&&!W?Ie(f):f))),!p&&d&&B?Me(d,(m?c.length:o.length)!==0):null,W?null:v("div",{class:`${e}-tabs-scroll-padding`,style:{width:`${this.tabsPadding}px`}}));return v("div",{ref:"tabsElRef",class:`${e}-tabs-nav-scroll-content`},B&&d?v(ve,{onResize:this.handleTabsResize},{default:()=>x}):x,B?v("div",{class:`${e}-tabs-pad`}):null,B?null:v("div",{ref:"barElRef",class:`${e}-tabs-bar`}))},M=_?"top":l;return v("div",{class:[`${e}-tabs`,this.themeClass,`${e}-tabs--${n}-type`,`${e}-tabs--${y}-size`,W&&`${e}-tabs--flex`,`${e}-tabs--${M}`],style:this.cssVars},v("div",{class:[`${e}-tabs-nav--${n}-type`,`${e}-tabs-nav--${M}`,`${e}-tabs-nav`]},Be(P,x=>x&&v("div",{class:`${e}-tabs-nav__prefix`},x)),_?v(ve,{onResize:this.handleSegmentResize},{default:()=>v("div",{class:`${e}-tabs-rail`,ref:"tabsElRef"},v("div",{class:`${e}-tabs-capsule`,ref:"segmentCapsuleElRef"},v("div",{class:`${e}-tabs-wrapper`},v("div",{class:`${e}-tabs-tab`}))),m?c.map((x,f)=>(g.value.push(x.props.name),v(xe,Object.assign({},x.props,{internalCreatedByPane:!0,internalLeftPadded:f!==0}),x.children?{default:x.children.tab}:void 0))):o.map((x,f)=>(g.value.push(x.props.name),f===0?x:Ie(x))))}):v(ve,{onResize:this.handleNavResize},{default:()=>v("div",{class:`${e}-tabs-nav-scroll-wrapper`,ref:"scrollWrapperElRef"},["top","bottom"].includes(M)?v(da,{ref:"xScrollInstRef",onScroll:this.handleScroll},{default:F}):v("div",{class:`${e}-tabs-nav-y-scroll`,onScroll:this.handleScroll,ref:"yScrollElRef"},F()))}),p&&d&&B?Me(d,!0):null,Be($,x=>x&&v("div",{class:`${e}-tabs-nav__suffix`},x))),m&&(this.animated&&(M==="top"||M==="bottom")?v("div",{ref:"tabsPaneWrapperRef",style:S,class:[`${e}-tabs-pane-wrapper`,h]},je(c,this.mergedValue,this.renderedNames,this.onAnimationBeforeLeave,this.onAnimationEnter,this.onAnimationAfterEnter,this.animationDirection)):je(c,this.mergedValue,this.renderedNames)))}});function je(e,n,l,p,d,y,g){const s=[];return e.forEach(h=>{const{name:S,displayDirective:C,"display-directive":P}=h.props,$=o=>C===o||P===o,c=n===S;if(h.key!==void 0&&(h.key=S),c||$("show")||$("show:lazy")&&l.has(S)){l.has(S)||l.add(S);const o=!$("if");s.push(o?Wt(h,[[_t,c]]):h)}}),g?v(At,{name:`${g}-transition`,onBeforeLeave:p,onEnter:d,onAfterEnter:y},{default:()=>s}):s}function Me(e,n){return v(xe,{ref:"addTabInstRef",key:"__addable",name:"__addable",internalCreatedByPane:!0,internalAddable:!0,internalLeftPadded:n,disabled:typeof e=="object"&&e.disabled})}function Ie(e){const n=Et(e);return n.props?n.props.internalLeftPadded=!0:n.props={internalLeftPadded:!0},n}function he(e){return Array.isArray(e.dynamicProps)?e.dynamicProps.includes("internalLeftPadded")||e.dynamicProps.push("internalLeftPadded"):e.dynamicProps=["internalLeftPadded"],e}const Wa={class:"auth-page"},_a={class:"auth-container"},Aa={class:"auth-card"},Ea={class:"footer"},Va=Q({__name:"login",setup(e){const n=Ot(),l=L("login"),p=L(""),d=L(!1),y=L(!1),g=L({email:"",password:""}),s=L({email:"",nickname:"",password:"",confirmPassword:""}),h={email:{required:!0,message:"请输入邮箱",trigger:"blur"},password:{required:!0,message:"请输入密码",trigger:"blur"}},S={email:[{required:!0,message:"请输入邮箱",trigger:"blur"},{type:"email",message:"请输入正确的邮箱格式",trigger:"blur"}],nickname:{required:!0,message:"请输入昵称",trigger:"blur"},password:[{required:!0,message:"请输入密码",trigger:"blur"},{min:6,max:50,message:"密码长度需在6-50个字符之间",trigger:"blur"}],confirmPassword:{required:!0,message:"请再次输入密码",trigger:"blur",validator:(c,o)=>o!==s.value.password?new Error("两次输入的密码不一致"):!0}},C=async()=>{d.value=!0,p.value="";try{const c=await $fetch("/api/auth/login",{method:"POST",body:g.value});if(c.data?.token){const o=Ht();o.setToken(c.data.token),o.setUser(c.data.user),n.success("登录成功"),Le("/dashboard")}}catch(c){p.value=c.data?.statusMessage||"登录失败"}finally{d.value=!1}},P=async()=>{y.value=!0,p.value="";try{(await $fetch("/api/auth/register",{method:"POST",body:{email:s.value.email,nickname:s.value.nickname,password:s.value.password}})).err==="ok"&&(n.success("注册成功，请登录"),l.value="login",g.value.email=s.value.email)}catch(c){p.value=c.data?.statusMessage||"注册失败"}finally{y.value=!1}},$=()=>{l.value==="login"?C():P()};return Fe(()=>{document.querySelectorAll("form").forEach(c=>{c.addEventListener("submit",o=>{o.preventDefault(),$()})})}),(c,o)=>($e(),jt("div",Wa,[D("div",_a,[D("div",Aa,[o[11]||(o[11]=D("div",{class:"logo-section"},[D("div",{class:"logo"},"💬"),D("h1",null,"评论开放平台"),D("p",{class:"subtitle"},"登录您的账号")],-1)),z(w(ka),{value:l.value,"onUpdate:value":o[6]||(o[6]=m=>l.value=m),type:"line","justify-content":"space-evenly"},{default:E(()=>[z(w(Ve),{name:"login",tab:"登录"},{default:E(()=>[z(w(ke),{ref:"loginFormRef",model:g.value,rules:h,"label-placement":"top"},{default:E(()=>[z(w(J),{label:"邮箱",path:"email"},{default:E(()=>[z(w(K),{value:g.value.email,"onUpdate:value":o[0]||(o[0]=m=>g.value.email=m),type:"email",placeholder:"your@email.com",size:"large"},null,8,["value"])]),_:1}),z(w(J),{label:"密码",path:"password"},{default:E(()=>[z(w(K),{value:g.value.password,"onUpdate:value":o[1]||(o[1]=m=>g.value.password=m),type:"password",placeholder:"请输入密码",size:"large"},null,8,["value"])]),_:1}),z(w(pe),{type:"primary",block:"",size:"large",loading:d.value,"attr-type":"submit"},{default:E(()=>[...o[8]||(o[8]=[ne(" 登录 ",-1)])]),_:1},8,["loading"])]),_:1},8,["model"])]),_:1}),z(w(Ve),{name:"register",tab:"注册"},{default:E(()=>[z(w(ke),{ref:"registerFormRef",model:s.value,rules:S,"label-placement":"top"},{default:E(()=>[z(w(J),{label:"邮箱",path:"email"},{default:E(()=>[z(w(K),{value:s.value.email,"onUpdate:value":o[2]||(o[2]=m=>s.value.email=m),type:"email",placeholder:"your@email.com",size:"large"},null,8,["value"])]),_:1}),z(w(J),{label:"昵称",path:"nickname"},{default:E(()=>[z(w(K),{value:s.value.nickname,"onUpdate:value":o[3]||(o[3]=m=>s.value.nickname=m),placeholder:"请输入昵称",size:"large"},null,8,["value"])]),_:1}),z(w(J),{label:"密码",path:"password"},{default:E(()=>[z(w(K),{value:s.value.password,"onUpdate:value":o[4]||(o[4]=m=>s.value.password=m),type:"password",placeholder:"请输入密码（6-50位）",size:"large"},null,8,["value"])]),_:1}),z(w(J),{label:"确认密码",path:"confirmPassword"},{default:E(()=>[z(w(K),{value:s.value.confirmPassword,"onUpdate:value":o[5]||(o[5]=m=>s.value.confirmPassword=m),type:"password",placeholder:"请再次输入密码",size:"large"},null,8,["value"])]),_:1}),z(w(pe),{type:"primary",block:"",size:"large",loading:y.value,"attr-type":"submit"},{default:E(()=>[...o[9]||(o[9]=[ne(" 注册 ",-1)])]),_:1},8,["loading"])]),_:1},8,["model"])]),_:1})]),_:1},8,["value"]),p.value?($e(),Mt(w(ia),{key:0,type:"error",class:"mt-4"},{default:E(()=>[ne(Ft(p.value),1)]),_:1})):It("",!0),D("div",Ea,[z(w(pe),{text:"",onClick:o[7]||(o[7]=m=>("navigateTo"in c?c.navigateTo:w(Le))("/admin/login"))},{default:E(()=>[...o[10]||(o[10]=[ne("管理员入口",-1)])]),_:1})])])])]))}}),Ua=la(Va,[["__scopeId","data-v-d7de6a53"]]);export{Ua as default};
