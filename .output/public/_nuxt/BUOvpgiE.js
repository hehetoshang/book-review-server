import{e as Z,h as p,r as R,F as Ie,f as Y,T as Ht,g as et,i as tt,m as Ot,j as fe,k as _e,l as Nt,v as Dt,n as Ft,p as Gt,q as ue,s as Ut,u as U,x as qt,o as J,c as Q,y as b,b as L,a as M,w as H,z as ce,d as se,A as Se,B as Fe,C as Xt,t as we}from"./CI2nsVyN.js";import{u as Yt,i as ge,r as Kt,d as Ee,c as r,a as ve,b as B,e as d,f as Ae,g as oe,h as je,j as _,N as Jt,k as Qt,l as D,m as Zt,t as ea,n as Ge,o as be,B as Te}from"./Nu5kl8fh.js";import{c as ta,a as Ue,i as aa,f as na,p as ra,u as Be,N as oa,r as ia,b as sa,o as la,d as ze,V as Pe,e as da,g as ca,h as ba,j as pe}from"./DwHjonGY.js";import{N as qe,a as le}from"./CoQkNnKy.js";import{N as re}from"./DjTK5B1V.js";import{N as pa}from"./Ci8X6owJ.js";import{_ as fa}from"./DlAUqK2U.js";const ua=Ue(".v-x-scroll",{overflow:"auto",scrollbarWidth:"none"},[Ue("&::-webkit-scrollbar",{width:0,height:0})]),va=Z({name:"XScroll",props:{disabled:Boolean,onScroll:Function},setup(){const e=R(null);function t(s){!(s.currentTarget.offsetWidth<s.currentTarget.scrollWidth)||s.deltaY===0||(s.currentTarget.scrollLeft+=s.deltaY+s.deltaX,s.preventDefault())}const o=Yt();return ua.mount({id:"vueuc/x-scroll",head:!0,anchorMetaName:ta,ssr:o}),Object.assign({selfRef:e,handleWheel:t},{scrollTo(...s){var v;(v=e.value)===null||v===void 0||v.scrollTo(...s)}})},render(){return p("div",{ref:"selfRef",onScroll:this.onScroll,onWheel:this.disabled?void 0:this.handleWheel,class:"v-x-scroll"},this.$slots)}});var ga=/\s/;function ma(e){for(var t=e.length;t--&&ga.test(e.charAt(t)););return t}var ha=/^\s+/;function xa(e){return e&&e.slice(0,ma(e)+1).replace(ha,"")}var Xe=NaN,ya=/^[-+]0x[0-9a-f]+$/i,Ca=/^0b[01]+$/i,Sa=/^0o[0-7]+$/i,wa=parseInt;function Ye(e){if(typeof e=="number")return e;if(aa(e))return Xe;if(ge(e)){var t=typeof e.valueOf=="function"?e.valueOf():e;e=ge(t)?t+"":t}if(typeof e!="string")return e===0?e:+e;e=xa(e);var o=Ca.test(e);return o||Sa.test(e)?wa(e.slice(2),o?2:8):ya.test(e)?Xe:+e}var $e=function(){return Kt.Date.now()},Ta="Expected a function",za=Math.max,Pa=Math.min;function $a(e,t,o){var i,s,v,f,u,c,x=0,C=!1,P=!1,W=!0;if(typeof e!="function")throw new TypeError(Ta);t=Ye(t)||0,ge(o)&&(C=!!o.leading,P="maxWait"in o,v=P?za(Ye(o.maxWait)||0,t):v,W="trailing"in o?!!o.trailing:W);function S(g){var j=i,q=s;return i=s=void 0,x=g,f=e.apply(q,j),f}function z(g){return x=g,u=setTimeout(E,t),C?S(g):f}function k(g){var j=g-c,q=g-x,X=t-j;return P?Pa(X,v-q):X}function I(g){var j=g-c,q=g-x;return c===void 0||j>=t||j<0||P&&q>=v}function E(){var g=$e();if(I(g))return $(g);u=setTimeout(E,k(g))}function $(g){return u=void 0,W&&i?S(g):(i=s=void 0,f)}function F(){u!==void 0&&clearTimeout(u),x=0,i=c=s=u=void 0}function V(){return u===void 0?f:$($e())}function w(){var g=$e(),j=I(g);if(i=arguments,s=this,c=g,j){if(u===void 0)return z(c);if(P)return clearTimeout(u),u=setTimeout(E,t),S(c)}return u===void 0&&(u=setTimeout(E,t)),f}return w.cancel=F,w.flush=V,w}var Ra="Expected a function";function ka(e,t,o){var i=!0,s=!0;if(typeof e!="function")throw new TypeError(Ra);return ge(o)&&(i="leading"in o?!!o.leading:i,s="trailing"in o?!!o.trailing:s),$a(e,t,{leading:i,maxWait:t,trailing:s})}const La=Z({name:"Add",render(){return p("svg",{width:"512",height:"512",viewBox:"0 0 512 512",fill:"none",xmlns:"http://www.w3.org/2000/svg"},p("path",{d:"M256 112V400M400 256H112",stroke:"currentColor","stroke-width":"32","stroke-linecap":"round","stroke-linejoin":"round"}))}});function _a(e){const{textColor1:t,dividerColor:o,fontWeightStrong:i}=e;return{textColor:t,color:o,fontWeight:i}}const Ba={common:Ee,self:_a},Wa=r("divider",`
 position: relative;
 display: flex;
 width: 100%;
 box-sizing: border-box;
 font-size: 16px;
 color: var(--n-text-color);
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
`,[ve("vertical",`
 margin-top: 24px;
 margin-bottom: 24px;
 `,[ve("no-title",`
 display: flex;
 align-items: center;
 `)]),B("title",`
 display: flex;
 align-items: center;
 margin-left: 12px;
 margin-right: 12px;
 white-space: nowrap;
 font-weight: var(--n-font-weight);
 `),d("title-position-left",[B("line",[d("left",{width:"28px"})])]),d("title-position-right",[B("line",[d("right",{width:"28px"})])]),d("dashed",[B("line",`
 background-color: #0000;
 height: 0px;
 width: 100%;
 border-style: dashed;
 border-width: 1px 0 0;
 `)]),d("vertical",`
 display: inline-block;
 height: 1em;
 margin: 0 8px;
 vertical-align: middle;
 width: 1px;
 `),B("line",`
 border: none;
 transition: background-color .3s var(--n-bezier), border-color .3s var(--n-bezier);
 height: 1px;
 width: 100%;
 margin: 0;
 `),ve("dashed",[B("line",{backgroundColor:"var(--n-color)"})]),d("dashed",[B("line",{borderColor:"var(--n-color)"})]),d("vertical",{backgroundColor:"var(--n-color)"})]),Ia=Object.assign(Object.assign({},oe.props),{titlePlacement:{type:String,default:"center"},dashed:Boolean,vertical:Boolean}),Re=Z({name:"Divider",props:Ia,setup(e){const{mergedClsPrefixRef:t,inlineThemeDisabled:o}=Ae(e),i=oe("Divider","-divider",Wa,Ba,e,t),s=Y(()=>{const{common:{cubicBezierEaseInOut:f},self:{color:u,textColor:c,fontWeight:x}}=i.value;return{"--n-bezier":f,"--n-color":u,"--n-text-color":c,"--n-font-weight":x}}),v=o?je("divider",void 0,s,e):void 0;return{mergedClsPrefix:t,cssVars:o?void 0:s,themeClass:v?.themeClass,onRender:v?.onRender}},render(){var e;const{$slots:t,titlePlacement:o,vertical:i,dashed:s,cssVars:v,mergedClsPrefix:f}=this;return(e=this.onRender)===null||e===void 0||e.call(this),p("div",{role:"separator",class:[`${f}-divider`,this.themeClass,{[`${f}-divider--vertical`]:i,[`${f}-divider--no-title`]:!t.default,[`${f}-divider--dashed`]:s,[`${f}-divider--title-position-${o}`]:t.default&&o}],style:v},i?null:p("div",{class:`${f}-divider__line ${f}-divider__line--left`}),!i&&t.default?p(Ie,null,p("div",{class:`${f}-divider__title`},this.$slots),p("div",{class:`${f}-divider__line ${f}-divider__line--right`})):null)}});function Ea(e){const{opacityDisabled:t,heightTiny:o,heightSmall:i,heightMedium:s,heightLarge:v,heightHuge:f,primaryColor:u,fontSize:c}=e;return{fontSize:c,textColor:u,sizeTiny:o,sizeSmall:i,sizeMedium:s,sizeLarge:v,sizeHuge:f,color:u,opacitySpinning:t}}const Aa={common:Ee,self:Ea},ja={tabFontSizeSmall:"14px",tabFontSizeMedium:"14px",tabFontSizeLarge:"16px",tabGapSmallLine:"36px",tabGapMediumLine:"36px",tabGapLargeLine:"36px",tabGapSmallLineVertical:"8px",tabGapMediumLineVertical:"8px",tabGapLargeLineVertical:"8px",tabPaddingSmallLine:"6px 0",tabPaddingMediumLine:"10px 0",tabPaddingLargeLine:"14px 0",tabPaddingVerticalSmallLine:"6px 12px",tabPaddingVerticalMediumLine:"8px 16px",tabPaddingVerticalLargeLine:"10px 20px",tabGapSmallBar:"36px",tabGapMediumBar:"36px",tabGapLargeBar:"36px",tabGapSmallBarVertical:"8px",tabGapMediumBarVertical:"8px",tabGapLargeBarVertical:"8px",tabPaddingSmallBar:"4px 0",tabPaddingMediumBar:"6px 0",tabPaddingLargeBar:"10px 0",tabPaddingVerticalSmallBar:"6px 12px",tabPaddingVerticalMediumBar:"8px 16px",tabPaddingVerticalLargeBar:"10px 20px",tabGapSmallCard:"4px",tabGapMediumCard:"4px",tabGapLargeCard:"4px",tabGapSmallCardVertical:"4px",tabGapMediumCardVertical:"4px",tabGapLargeCardVertical:"4px",tabPaddingSmallCard:"8px 16px",tabPaddingMediumCard:"10px 20px",tabPaddingLargeCard:"12px 24px",tabPaddingSmallSegment:"4px 0",tabPaddingMediumSegment:"6px 0",tabPaddingLargeSegment:"8px 0",tabPaddingVerticalLargeSegment:"0 8px",tabPaddingVerticalSmallCard:"8px 12px",tabPaddingVerticalMediumCard:"10px 16px",tabPaddingVerticalLargeCard:"12px 20px",tabPaddingVerticalSmallSegment:"0 4px",tabPaddingVerticalMediumSegment:"0 6px",tabGapSmallSegment:"0",tabGapMediumSegment:"0",tabGapLargeSegment:"0",tabGapSmallSegmentVertical:"0",tabGapMediumSegmentVertical:"0",tabGapLargeSegmentVertical:"0",panePaddingSmall:"8px 0 0 0",panePaddingMedium:"12px 0 0 0",panePaddingLarge:"16px 0 0 0",closeSize:"18px",closeIconSize:"14px"};function Va(e){const{textColor2:t,primaryColor:o,textColorDisabled:i,closeIconColor:s,closeIconColorHover:v,closeIconColorPressed:f,closeColorHover:u,closeColorPressed:c,tabColor:x,baseColor:C,dividerColor:P,fontWeight:W,textColor1:S,borderRadius:z,fontSize:k,fontWeightStrong:I}=e;return Object.assign(Object.assign({},ja),{colorSegment:x,tabFontSizeCard:k,tabTextColorLine:S,tabTextColorActiveLine:o,tabTextColorHoverLine:o,tabTextColorDisabledLine:i,tabTextColorSegment:S,tabTextColorActiveSegment:t,tabTextColorHoverSegment:t,tabTextColorDisabledSegment:i,tabTextColorBar:S,tabTextColorActiveBar:o,tabTextColorHoverBar:o,tabTextColorDisabledBar:i,tabTextColorCard:S,tabTextColorHoverCard:S,tabTextColorActiveCard:o,tabTextColorDisabledCard:i,barColor:o,closeIconColor:s,closeIconColorHover:v,closeIconColorPressed:f,closeColorHover:u,closeColorPressed:c,closeBorderRadius:z,tabColor:x,tabColorSegment:C,tabBorderColor:P,tabFontWeightActive:W,tabFontWeight:W,tabBorderRadius:z,paneTextColor:t,fontWeightStrong:I})}const Ma={common:Ee,self:Va},Ha=_([_("@keyframes spin-rotate",`
 from {
 transform: rotate(0);
 }
 to {
 transform: rotate(360deg);
 }
 `),r("spin-container",`
 position: relative;
 `,[r("spin-body",`
 position: absolute;
 top: 50%;
 left: 50%;
 transform: translateX(-50%) translateY(-50%);
 `,[na()])]),r("spin-body",`
 display: inline-flex;
 align-items: center;
 justify-content: center;
 flex-direction: column;
 `),r("spin",`
 display: inline-flex;
 height: var(--n-size);
 width: var(--n-size);
 font-size: var(--n-size);
 color: var(--n-color);
 `,[d("rotate",`
 animation: spin-rotate 2s linear infinite;
 `)]),r("spin-description",`
 display: inline-block;
 font-size: var(--n-font-size);
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 margin-top: 8px;
 `),r("spin-content",`
 opacity: 1;
 transition: opacity .3s var(--n-bezier);
 pointer-events: all;
 `,[d("spinning",`
 user-select: none;
 -webkit-user-select: none;
 pointer-events: none;
 opacity: var(--n-opacity-spinning);
 `)])]),Oa={small:20,medium:18,large:16},Na=Object.assign(Object.assign(Object.assign({},oe.props),{contentClass:String,contentStyle:[Object,String],description:String,size:{type:[String,Number],default:"medium"},show:{type:Boolean,default:!0},rotate:{type:Boolean,default:!0},spinning:{type:Boolean,validator:()=>!0,default:void 0},delay:Number}),Qt),Da=Z({name:"Spin",props:Na,slots:Object,setup(e){const{mergedClsPrefixRef:t,inlineThemeDisabled:o}=Ae(e),i=oe("Spin","-spin",Ha,Aa,e,t),s=Y(()=>{const{size:c}=e,{common:{cubicBezierEaseInOut:x},self:C}=i.value,{opacitySpinning:P,color:W,textColor:S}=C,z=typeof c=="number"?ra(c):C[D("size",c)];return{"--n-bezier":x,"--n-opacity-spinning":P,"--n-size":z,"--n-color":W,"--n-text-color":S}}),v=o?je("spin",Y(()=>{const{size:c}=e;return typeof c=="number"?String(c):c[0]}),s,e):void 0,f=Be(e,["spinning","show"]),u=R(!1);return et(c=>{let x;if(f.value){const{delay:C}=e;if(C){x=window.setTimeout(()=>{u.value=!0},C),c(()=>{clearTimeout(x)});return}}u.value=f.value}),{mergedClsPrefix:t,active:u,mergedStrokeWidth:Y(()=>{const{strokeWidth:c}=e;if(c!==void 0)return c;const{size:x}=e;return Oa[typeof x=="number"?"medium":x]}),cssVars:o?void 0:s,themeClass:v?.themeClass,onRender:v?.onRender}},render(){var e,t;const{$slots:o,mergedClsPrefix:i,description:s}=this,v=o.icon&&this.rotate,f=(s||o.description)&&p("div",{class:`${i}-spin-description`},s||((e=o.description)===null||e===void 0?void 0:e.call(o))),u=o.icon?p("div",{class:[`${i}-spin-body`,this.themeClass]},p("div",{class:[`${i}-spin`,v&&`${i}-spin--rotate`],style:o.default?"":this.cssVars},o.icon()),f):p("div",{class:[`${i}-spin-body`,this.themeClass]},p(Jt,{clsPrefix:i,style:o.default?"":this.cssVars,stroke:this.stroke,"stroke-width":this.mergedStrokeWidth,radius:this.radius,scale:this.scale,class:`${i}-spin`}),f);return(t=this.onRender)===null||t===void 0||t.call(this),o.default?p("div",{class:[`${i}-spin-container`,this.themeClass],style:this.cssVars},p("div",{class:[`${i}-spin-content`,this.active&&`${i}-spin-content--spinning`,this.contentClass],style:this.contentStyle},o),p(Ht,{name:"fade-in-transition"},{default:()=>this.active?u:null})):u}}),Ve=Zt("n-tabs"),at={tab:[String,Number,Object,Function],name:{type:[String,Number],required:!0},disabled:Boolean,displayDirective:{type:String,default:"if"},closable:{type:Boolean,default:void 0},tabProps:Object,label:[String,Number,Object,Function]},Ke=Z({__TAB_PANE__:!0,name:"TabPane",alias:["TabPanel"],props:at,slots:Object,setup(e){const t=tt(Ve,null);return t||ea("tab-pane","`n-tab-pane` must be placed inside `n-tabs`."),{style:t.paneStyleRef,class:t.paneClassRef,mergedClsPrefix:t.mergedClsPrefixRef}},render(){return p("div",{class:[`${this.mergedClsPrefix}-tab-pane`,this.class],style:this.style},this.$slots)}}),Fa=Object.assign({internalLeftPadded:Boolean,internalAddable:Boolean,internalCreatedByPane:Boolean},la(at,["displayDirective"])),We=Z({__TAB__:!0,inheritAttrs:!1,name:"Tab",props:Fa,setup(e){const{mergedClsPrefixRef:t,valueRef:o,typeRef:i,closableRef:s,tabStyleRef:v,addTabStyleRef:f,tabClassRef:u,addTabClassRef:c,tabChangeIdRef:x,onBeforeLeaveRef:C,triggerRef:P,handleAdd:W,activateTab:S,handleClose:z}=tt(Ve);return{trigger:P,mergedClosable:Y(()=>{if(e.internalAddable)return!1;const{closable:k}=e;return k===void 0?s.value:k}),style:v,addStyle:f,tabClass:u,addTabClass:c,clsPrefix:t,value:o,type:i,handleClose(k){k.stopPropagation(),!e.disabled&&z(e.name)},activateTab(){if(e.disabled)return;if(e.internalAddable){W();return}const{name:k}=e,I=++x.id;if(k!==o.value){const{value:E}=C;E?Promise.resolve(E(e.name,o.value)).then($=>{$&&x.id===I&&S(k)}):S(k)}}}},render(){const{internalAddable:e,clsPrefix:t,name:o,disabled:i,label:s,tab:v,value:f,mergedClosable:u,trigger:c,$slots:{default:x}}=this,C=s??v;return p("div",{class:`${t}-tabs-tab-wrapper`},this.internalLeftPadded?p("div",{class:`${t}-tabs-tab-pad`}):null,p("div",Object.assign({key:o,"data-name":o,"data-disabled":i?!0:void 0},Ot({class:[`${t}-tabs-tab`,f===o&&`${t}-tabs-tab--active`,i&&`${t}-tabs-tab--disabled`,u&&`${t}-tabs-tab--closable`,e&&`${t}-tabs-tab--addable`,e?this.addTabClass:this.tabClass],onClick:c==="click"?this.activateTab:void 0,onMouseenter:c==="hover"?this.activateTab:void 0,style:e?this.addStyle:this.style},this.internalCreatedByPane?this.tabProps||{}:this.$attrs)),p("span",{class:`${t}-tabs-tab__label`},e?p(Ie,null,p("div",{class:`${t}-tabs-tab__height-placeholder`}," "),p(oa,{clsPrefix:t},{default:()=>p(La,null)})):x?x():typeof C=="object"?C:ia(C??o)),u&&this.type==="card"?p(sa,{clsPrefix:t,class:`${t}-tabs-tab__close`,onClick:this.handleClose,disabled:i}):null))}}),Ga=r("tabs",`
 box-sizing: border-box;
 width: 100%;
 display: flex;
 flex-direction: column;
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
`,[d("segment-type",[r("tabs-rail",[_("&.transition-disabled",[r("tabs-capsule",`
 transition: none;
 `)])])]),d("top",[r("tab-pane",`
 padding: var(--n-pane-padding-top) var(--n-pane-padding-right) var(--n-pane-padding-bottom) var(--n-pane-padding-left);
 `)]),d("left",[r("tab-pane",`
 padding: var(--n-pane-padding-right) var(--n-pane-padding-bottom) var(--n-pane-padding-left) var(--n-pane-padding-top);
 `)]),d("left, right",`
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
 `)]),d("right",`
 flex-direction: row-reverse;
 `,[r("tab-pane",`
 padding: var(--n-pane-padding-left) var(--n-pane-padding-top) var(--n-pane-padding-right) var(--n-pane-padding-bottom);
 `),r("tabs-bar",`
 left: 0;
 `)]),d("bottom",`
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
 `,[d("active",`
 font-weight: var(--n-font-weight-strong);
 color: var(--n-tab-text-color-active);
 `),_("&:hover",`
 color: var(--n-tab-text-color-hover);
 `)])])]),d("flex",[r("tabs-nav",`
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
 `,[B("prefix, suffix",`
 display: flex;
 align-items: center;
 `),B("prefix","padding-right: 16px;"),B("suffix","padding-left: 16px;")]),d("top, bottom",[_(">",[r("tabs-nav",[r("tabs-nav-scroll-wrapper",[_("&::before",`
 top: 0;
 bottom: 0;
 left: 0;
 width: 20px;
 `),_("&::after",`
 top: 0;
 bottom: 0;
 right: 0;
 width: 20px;
 `),d("shadow-start",[_("&::before",`
 box-shadow: inset 10px 0 8px -8px rgba(0, 0, 0, .12);
 `)]),d("shadow-end",[_("&::after",`
 box-shadow: inset -10px 0 8px -8px rgba(0, 0, 0, .12);
 `)])])])])]),d("left, right",[r("tabs-nav-scroll-content",`
 flex-direction: column;
 `),_(">",[r("tabs-nav",[r("tabs-nav-scroll-wrapper",[_("&::before",`
 top: 0;
 left: 0;
 right: 0;
 height: 20px;
 `),_("&::after",`
 bottom: 0;
 left: 0;
 right: 0;
 height: 20px;
 `),d("shadow-start",[_("&::before",`
 box-shadow: inset 0 10px 8px -8px rgba(0, 0, 0, .12);
 `)]),d("shadow-end",[_("&::after",`
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
 `,[_("&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb",`
 width: 0;
 height: 0;
 display: none;
 `)]),_("&::before, &::after",`
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
 `,[d("disabled",{cursor:"not-allowed"}),B("close",`
 margin-left: 6px;
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `),B("label",`
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
 `,[_("&.transition-disabled",`
 transition: none;
 `),d("disabled",`
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
 `,[_("&.next-transition-leave-active, &.prev-transition-leave-active, &.next-transition-enter-active, &.prev-transition-enter-active",`
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 transform .2s var(--n-bezier),
 opacity .2s var(--n-bezier);
 `),_("&.next-transition-leave-active, &.prev-transition-leave-active",`
 position: absolute;
 `),_("&.next-transition-enter-from, &.prev-transition-leave-to",`
 transform: translateX(32px);
 opacity: 0;
 `),_("&.next-transition-leave-to, &.prev-transition-enter-from",`
 transform: translateX(-32px);
 opacity: 0;
 `),_("&.next-transition-leave-from, &.next-transition-enter-to, &.prev-transition-leave-from, &.prev-transition-enter-to",`
 transform: translateX(0);
 opacity: 1;
 `)]),r("tabs-tab-pad",`
 box-sizing: border-box;
 width: var(--n-tab-gap);
 flex-grow: 0;
 flex-shrink: 0;
 `),d("line-type, bar-type",[r("tabs-tab",`
 font-weight: var(--n-tab-font-weight);
 box-sizing: border-box;
 vertical-align: bottom;
 `,[_("&:hover",{color:"var(--n-tab-text-color-hover)"}),d("active",`
 color: var(--n-tab-text-color-active);
 font-weight: var(--n-tab-font-weight-active);
 `),d("disabled",{color:"var(--n-tab-text-color-disabled)"})])]),r("tabs-nav",[d("line-type",[d("top",[B("prefix, suffix",`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),r("tabs-nav-scroll-content",`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),r("tabs-bar",`
 bottom: -1px;
 `)]),d("left",[B("prefix, suffix",`
 border-right: 1px solid var(--n-tab-border-color);
 `),r("tabs-nav-scroll-content",`
 border-right: 1px solid var(--n-tab-border-color);
 `),r("tabs-bar",`
 right: -1px;
 `)]),d("right",[B("prefix, suffix",`
 border-left: 1px solid var(--n-tab-border-color);
 `),r("tabs-nav-scroll-content",`
 border-left: 1px solid var(--n-tab-border-color);
 `),r("tabs-bar",`
 left: -1px;
 `)]),d("bottom",[B("prefix, suffix",`
 border-top: 1px solid var(--n-tab-border-color);
 `),r("tabs-nav-scroll-content",`
 border-top: 1px solid var(--n-tab-border-color);
 `),r("tabs-bar",`
 top: -1px;
 `)]),B("prefix, suffix",`
 transition: border-color .3s var(--n-bezier);
 `),r("tabs-nav-scroll-content",`
 transition: border-color .3s var(--n-bezier);
 `),r("tabs-bar",`
 border-radius: 0;
 `)]),d("card-type",[B("prefix, suffix",`
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
 `,[d("addable",`
 padding-left: 8px;
 padding-right: 8px;
 font-size: 16px;
 justify-content: center;
 `,[B("height-placeholder",`
 width: 0;
 font-size: var(--n-tab-font-size);
 `),ve("disabled",[_("&:hover",`
 color: var(--n-tab-text-color-hover);
 `)])]),d("closable","padding-right: 8px;"),d("active",`
 background-color: #0000;
 font-weight: var(--n-tab-font-weight-active);
 color: var(--n-tab-text-color-active);
 `),d("disabled","color: var(--n-tab-text-color-disabled);")])]),d("left, right",`
 flex-direction: column; 
 `,[B("prefix, suffix",`
 padding: var(--n-tab-padding-vertical);
 `),r("tabs-wrapper",`
 flex-direction: column;
 `),r("tabs-tab-wrapper",`
 flex-direction: column;
 `,[r("tabs-tab-pad",`
 height: var(--n-tab-gap-vertical);
 width: 100%;
 `)])]),d("top",[d("card-type",[r("tabs-scroll-padding","border-bottom: 1px solid var(--n-tab-border-color);"),B("prefix, suffix",`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),r("tabs-tab",`
 border-top-left-radius: var(--n-tab-border-radius);
 border-top-right-radius: var(--n-tab-border-radius);
 `,[d("active",`
 border-bottom: 1px solid #0000;
 `)]),r("tabs-tab-pad",`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),r("tabs-pad",`
 border-bottom: 1px solid var(--n-tab-border-color);
 `)])]),d("left",[d("card-type",[r("tabs-scroll-padding","border-right: 1px solid var(--n-tab-border-color);"),B("prefix, suffix",`
 border-right: 1px solid var(--n-tab-border-color);
 `),r("tabs-tab",`
 border-top-left-radius: var(--n-tab-border-radius);
 border-bottom-left-radius: var(--n-tab-border-radius);
 `,[d("active",`
 border-right: 1px solid #0000;
 `)]),r("tabs-tab-pad",`
 border-right: 1px solid var(--n-tab-border-color);
 `),r("tabs-pad",`
 border-right: 1px solid var(--n-tab-border-color);
 `)])]),d("right",[d("card-type",[r("tabs-scroll-padding","border-left: 1px solid var(--n-tab-border-color);"),B("prefix, suffix",`
 border-left: 1px solid var(--n-tab-border-color);
 `),r("tabs-tab",`
 border-top-right-radius: var(--n-tab-border-radius);
 border-bottom-right-radius: var(--n-tab-border-radius);
 `,[d("active",`
 border-left: 1px solid #0000;
 `)]),r("tabs-tab-pad",`
 border-left: 1px solid var(--n-tab-border-color);
 `),r("tabs-pad",`
 border-left: 1px solid var(--n-tab-border-color);
 `)])]),d("bottom",[d("card-type",[r("tabs-scroll-padding","border-top: 1px solid var(--n-tab-border-color);"),B("prefix, suffix",`
 border-top: 1px solid var(--n-tab-border-color);
 `),r("tabs-tab",`
 border-bottom-left-radius: var(--n-tab-border-radius);
 border-bottom-right-radius: var(--n-tab-border-radius);
 `,[d("active",`
 border-top: 1px solid #0000;
 `)]),r("tabs-tab-pad",`
 border-top: 1px solid var(--n-tab-border-color);
 `),r("tabs-pad",`
 border-top: 1px solid var(--n-tab-border-color);
 `)])])])]),ke=ka,Ua=Object.assign(Object.assign({},oe.props),{value:[String,Number],defaultValue:[String,Number],trigger:{type:String,default:"click"},type:{type:String,default:"bar"},closable:Boolean,justifyContent:String,size:String,placement:{type:String,default:"top"},tabStyle:[String,Object],tabClass:String,addTabStyle:[String,Object],addTabClass:String,barWidth:Number,paneClass:String,paneStyle:[String,Object],paneWrapperClass:String,paneWrapperStyle:[String,Object],addable:[Boolean,Object],tabsPadding:{type:Number,default:0},animated:Boolean,onBeforeLeave:Function,onAdd:Function,"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],onClose:[Function,Array],labelSize:String,activeName:[String,Number],onActiveNameChange:[Function,Array]}),qa=Z({name:"Tabs",props:Ua,slots:Object,setup(e,{slots:t}){var o,i,s,v;const{mergedClsPrefixRef:f,inlineThemeDisabled:u,mergedComponentPropsRef:c}=Ae(e),x=oe("Tabs","-tabs",Ga,Ma,e,f),C=R(null),P=R(null),W=R(null),S=R(null),z=R(null),k=R(null),I=R(!0),E=R(!0),$=Be(e,["labelSize","size"]),F=Y(()=>{var a,n;if($.value)return $.value;const l=(n=(a=c?.value)===null||a===void 0?void 0:a.Tabs)===null||n===void 0?void 0:n.size;return l||"medium"}),V=Be(e,["activeName","value"]),w=R((i=(o=V.value)!==null&&o!==void 0?o:e.defaultValue)!==null&&i!==void 0?i:t.default?(v=(s=ze(t.default())[0])===null||s===void 0?void 0:s.props)===null||v===void 0?void 0:v.name:null),g=da(V,w),j={id:0},q=Y(()=>{if(!(!e.justifyContent||e.type==="card"))return{display:"flex",justifyContent:e.justifyContent}});fe(g,()=>{j.id=0,m(),T()});function X(){var a;const{value:n}=g;return n===null?null:(a=C.value)===null||a===void 0?void 0:a.querySelector(`[data-name="${n}"]`)}function me(a){if(e.type==="card")return;const{value:n}=P;if(!n)return;const l=n.style.opacity==="0";if(a){const y=`${f.value}-tabs-bar--disabled`,{barWidth:A,placement:O}=e;if(a.dataset.disabled==="true"?n.classList.add(y):n.classList.remove(y),["top","bottom"].includes(O)){if(h(["top","maxHeight","height"]),typeof A=="number"&&a.offsetWidth>=A){const N=Math.floor((a.offsetWidth-A)/2)+a.offsetLeft;n.style.left=`${N}px`,n.style.maxWidth=`${A}px`}else n.style.left=`${a.offsetLeft}px`,n.style.maxWidth=`${a.offsetWidth}px`;n.style.width="8192px",l&&(n.style.transition="none"),n.offsetWidth,l&&(n.style.transition="",n.style.opacity="1")}else{if(h(["left","maxWidth","width"]),typeof A=="number"&&a.offsetHeight>=A){const N=Math.floor((a.offsetHeight-A)/2)+a.offsetTop;n.style.top=`${N}px`,n.style.maxHeight=`${A}px`}else n.style.top=`${a.offsetTop}px`,n.style.maxHeight=`${a.offsetHeight}px`;n.style.height="8192px",l&&(n.style.transition="none"),n.offsetHeight,l&&(n.style.transition="",n.style.opacity="1")}}}function he(){if(e.type==="card")return;const{value:a}=P;a&&(a.style.opacity="0")}function h(a){const{value:n}=P;if(n)for(const l of a)n.style[l]=""}function m(){if(e.type==="card")return;const a=X();a?me(a):he()}function T(){var a;const n=(a=z.value)===null||a===void 0?void 0:a.$el;if(!n)return;const l=X();if(!l)return;const{scrollLeft:y,offsetWidth:A}=n,{offsetLeft:O,offsetWidth:N}=l;y>O?n.scrollTo({top:0,left:O,behavior:"smooth"}):O+N>y+A&&n.scrollTo({top:0,left:O+N-A,behavior:"smooth"})}const G=R(null);let xe=0,K=null;function nt(a){const n=G.value;if(n){xe=a.getBoundingClientRect().height;const l=`${xe}px`,y=()=>{n.style.height=l,n.style.maxHeight=l};K?(y(),K(),K=null):K=y}}function rt(a){const n=G.value;if(n){const l=a.getBoundingClientRect().height,y=()=>{document.body.offsetHeight,n.style.maxHeight=`${l}px`,n.style.height=`${Math.max(xe,l)}px`};K?(K(),K=null,y()):K=y}}function ot(){const a=G.value;if(a){a.style.maxHeight="",a.style.height="";const{paneWrapperStyle:n}=e;if(typeof n=="string")a.style.cssText=n;else if(n){const{maxHeight:l,height:y}=n;l!==void 0&&(a.style.maxHeight=l),y!==void 0&&(a.style.height=y)}}}const Me={value:[]},He=R("next");function it(a){const n=g.value;let l="next";for(const y of Me.value){if(y===n)break;if(y===a){l="prev";break}}He.value=l,st(a)}function st(a){const{onActiveNameChange:n,onUpdateValue:l,"onUpdate:value":y}=e;n&&be(n,a),l&&be(l,a),y&&be(y,a),w.value=a}function lt(a){const{onClose:n}=e;n&&be(n,a)}function Oe(){const{value:a}=P;if(!a)return;const n="transition-disabled";a.classList.add(n),m(),a.classList.remove(n)}const ee=R(null);function ye({transitionDisabled:a}){const n=C.value;if(!n)return;a&&n.classList.add("transition-disabled");const l=X();l&&ee.value&&(ee.value.style.width=`${l.offsetWidth}px`,ee.value.style.height=`${l.offsetHeight}px`,ee.value.style.transform=`translateX(${l.offsetLeft-ba(getComputedStyle(n).paddingLeft)}px)`,a&&ee.value.offsetWidth),a&&n.classList.remove("transition-disabled")}fe([g],()=>{e.type==="segment"&&ue(()=>{ye({transitionDisabled:!1})})}),_e(()=>{e.type==="segment"&&ye({transitionDisabled:!0})});let Ne=0;function dt(a){var n;if(a.contentRect.width===0&&a.contentRect.height===0||Ne===a.contentRect.width)return;Ne=a.contentRect.width;const{type:l}=e;if((l==="line"||l==="bar")&&Oe(),l!=="segment"){const{placement:y}=e;Ce((y==="top"||y==="bottom"?(n=z.value)===null||n===void 0?void 0:n.$el:k.value)||null)}}const ct=ke(dt,64);fe([()=>e.justifyContent,()=>e.size],()=>{ue(()=>{const{type:a}=e;(a==="line"||a==="bar")&&Oe()})});const te=R(!1);function bt(a){var n;const{target:l,contentRect:{width:y,height:A}}=a,O=l.parentElement.parentElement.offsetWidth,N=l.parentElement.parentElement.offsetHeight,{placement:ne}=e;if(!te.value)ne==="top"||ne==="bottom"?O<y&&(te.value=!0):N<A&&(te.value=!0);else{const{value:ie}=S;if(!ie)return;ne==="top"||ne==="bottom"?O-y>ie.$el.offsetWidth&&(te.value=!1):N-A>ie.$el.offsetHeight&&(te.value=!1)}Ce(((n=z.value)===null||n===void 0?void 0:n.$el)||null)}const pt=ke(bt,64);function ft(){const{onAdd:a}=e;a&&a(),ue(()=>{const n=X(),{value:l}=z;!n||!l||l.scrollTo({left:n.offsetLeft,top:0,behavior:"smooth"})})}function Ce(a){if(!a)return;const{placement:n}=e;if(n==="top"||n==="bottom"){const{scrollLeft:l,scrollWidth:y,offsetWidth:A}=a;I.value=l<=0,E.value=l+A>=y}else{const{scrollTop:l,scrollHeight:y,offsetHeight:A}=a;I.value=l<=0,E.value=l+A>=y}}const ut=ke(a=>{Ce(a.target)},64);Ut(Ve,{triggerRef:U(e,"trigger"),tabStyleRef:U(e,"tabStyle"),tabClassRef:U(e,"tabClass"),addTabStyleRef:U(e,"addTabStyle"),addTabClassRef:U(e,"addTabClass"),paneClassRef:U(e,"paneClass"),paneStyleRef:U(e,"paneStyle"),mergedClsPrefixRef:f,typeRef:U(e,"type"),closableRef:U(e,"closable"),valueRef:g,tabChangeIdRef:j,onBeforeLeaveRef:U(e,"onBeforeLeave"),activateTab:it,handleClose:lt,handleAdd:ft}),ca(()=>{m(),T()}),et(()=>{const{value:a}=W;if(!a)return;const{value:n}=f,l=`${n}-tabs-nav-scroll-wrapper--shadow-start`,y=`${n}-tabs-nav-scroll-wrapper--shadow-end`;I.value?a.classList.remove(l):a.classList.add(l),E.value?a.classList.remove(y):a.classList.add(y)});const vt={syncBarPosition:()=>{m()}},gt=()=>{ye({transitionDisabled:!0})},De=Y(()=>{const{value:a}=F,{type:n}=e,l={card:"Card",bar:"Bar",line:"Line",segment:"Segment"}[n],y=`${a}${l}`,{self:{barColor:A,closeIconColor:O,closeIconColorHover:N,closeIconColorPressed:ne,tabColor:ie,tabBorderColor:mt,paneTextColor:ht,tabFontWeight:xt,tabBorderRadius:yt,tabFontWeightActive:Ct,colorSegment:St,fontWeightStrong:wt,tabColorSegment:Tt,closeSize:zt,closeIconSize:Pt,closeColorHover:$t,closeColorPressed:Rt,closeBorderRadius:kt,[D("panePadding",a)]:de,[D("tabPadding",y)]:Lt,[D("tabPaddingVertical",y)]:_t,[D("tabGap",y)]:Bt,[D("tabGap",`${y}Vertical`)]:Wt,[D("tabTextColor",n)]:It,[D("tabTextColorActive",n)]:Et,[D("tabTextColorHover",n)]:At,[D("tabTextColorDisabled",n)]:jt,[D("tabFontSize",a)]:Vt},common:{cubicBezierEaseInOut:Mt}}=x.value;return{"--n-bezier":Mt,"--n-color-segment":St,"--n-bar-color":A,"--n-tab-font-size":Vt,"--n-tab-text-color":It,"--n-tab-text-color-active":Et,"--n-tab-text-color-disabled":jt,"--n-tab-text-color-hover":At,"--n-pane-text-color":ht,"--n-tab-border-color":mt,"--n-tab-border-radius":yt,"--n-close-size":zt,"--n-close-icon-size":Pt,"--n-close-color-hover":$t,"--n-close-color-pressed":Rt,"--n-close-border-radius":kt,"--n-close-icon-color":O,"--n-close-icon-color-hover":N,"--n-close-icon-color-pressed":ne,"--n-tab-color":ie,"--n-tab-font-weight":xt,"--n-tab-font-weight-active":Ct,"--n-tab-padding":Lt,"--n-tab-padding-vertical":_t,"--n-tab-gap":Bt,"--n-tab-gap-vertical":Wt,"--n-pane-padding-left":pe(de,"left"),"--n-pane-padding-right":pe(de,"right"),"--n-pane-padding-top":pe(de,"top"),"--n-pane-padding-bottom":pe(de,"bottom"),"--n-font-weight-strong":wt,"--n-tab-color-segment":Tt}}),ae=u?je("tabs",Y(()=>`${F.value[0]}${e.type[0]}`),De,e):void 0;return Object.assign({mergedClsPrefix:f,mergedValue:g,renderedNames:new Set,segmentCapsuleElRef:ee,tabsPaneWrapperRef:G,tabsElRef:C,barElRef:P,addTabInstRef:S,xScrollInstRef:z,scrollWrapperElRef:W,addTabFixed:te,tabWrapperStyle:q,handleNavResize:ct,mergedSize:F,handleScroll:ut,handleTabsResize:pt,cssVars:u?void 0:De,themeClass:ae?.themeClass,animationDirection:He,renderNameListRef:Me,yScrollElRef:k,handleSegmentResize:gt,onAnimationBeforeLeave:nt,onAnimationEnter:rt,onAnimationAfterEnter:ot,onRender:ae?.onRender},vt)},render(){const{mergedClsPrefix:e,type:t,placement:o,addTabFixed:i,addable:s,mergedSize:v,renderNameListRef:f,onRender:u,paneWrapperClass:c,paneWrapperStyle:x,$slots:{default:C,prefix:P,suffix:W}}=this;u?.();const S=C?ze(C()).filter(w=>w.type.__TAB_PANE__===!0):[],z=C?ze(C()).filter(w=>w.type.__TAB__===!0):[],k=!z.length,I=t==="card",E=t==="segment",$=!I&&!E&&this.justifyContent;f.value=[];const F=()=>{const w=p("div",{style:this.tabWrapperStyle,class:`${e}-tabs-wrapper`},$?null:p("div",{class:`${e}-tabs-scroll-padding`,style:o==="top"||o==="bottom"?{width:`${this.tabsPadding}px`}:{height:`${this.tabsPadding}px`}}),k?S.map((g,j)=>(f.value.push(g.props.name),Le(p(We,Object.assign({},g.props,{internalCreatedByPane:!0,internalLeftPadded:j!==0&&(!$||$==="center"||$==="start"||$==="end")}),g.children?{default:g.children.tab}:void 0)))):z.map((g,j)=>(f.value.push(g.props.name),Le(j!==0&&!$?Ze(g):g))),!i&&s&&I?Qe(s,(k?S.length:z.length)!==0):null,$?null:p("div",{class:`${e}-tabs-scroll-padding`,style:{width:`${this.tabsPadding}px`}}));return p("div",{ref:"tabsElRef",class:`${e}-tabs-nav-scroll-content`},I&&s?p(Pe,{onResize:this.handleTabsResize},{default:()=>w}):w,I?p("div",{class:`${e}-tabs-pad`}):null,I?null:p("div",{ref:"barElRef",class:`${e}-tabs-bar`}))},V=E?"top":o;return p("div",{class:[`${e}-tabs`,this.themeClass,`${e}-tabs--${t}-type`,`${e}-tabs--${v}-size`,$&&`${e}-tabs--flex`,`${e}-tabs--${V}`],style:this.cssVars},p("div",{class:[`${e}-tabs-nav--${t}-type`,`${e}-tabs-nav--${V}`,`${e}-tabs-nav`]},Ge(P,w=>w&&p("div",{class:`${e}-tabs-nav__prefix`},w)),E?p(Pe,{onResize:this.handleSegmentResize},{default:()=>p("div",{class:`${e}-tabs-rail`,ref:"tabsElRef"},p("div",{class:`${e}-tabs-capsule`,ref:"segmentCapsuleElRef"},p("div",{class:`${e}-tabs-wrapper`},p("div",{class:`${e}-tabs-tab`}))),k?S.map((w,g)=>(f.value.push(w.props.name),p(We,Object.assign({},w.props,{internalCreatedByPane:!0,internalLeftPadded:g!==0}),w.children?{default:w.children.tab}:void 0))):z.map((w,g)=>(f.value.push(w.props.name),g===0?w:Ze(w))))}):p(Pe,{onResize:this.handleNavResize},{default:()=>p("div",{class:`${e}-tabs-nav-scroll-wrapper`,ref:"scrollWrapperElRef"},["top","bottom"].includes(V)?p(va,{ref:"xScrollInstRef",onScroll:this.handleScroll},{default:F}):p("div",{class:`${e}-tabs-nav-y-scroll`,onScroll:this.handleScroll,ref:"yScrollElRef"},F()))}),i&&s&&I?Qe(s,!0):null,Ge(W,w=>w&&p("div",{class:`${e}-tabs-nav__suffix`},w))),k&&(this.animated&&(V==="top"||V==="bottom")?p("div",{ref:"tabsPaneWrapperRef",style:x,class:[`${e}-tabs-pane-wrapper`,c]},Je(S,this.mergedValue,this.renderedNames,this.onAnimationBeforeLeave,this.onAnimationEnter,this.onAnimationAfterEnter,this.animationDirection)):Je(S,this.mergedValue,this.renderedNames)))}});function Je(e,t,o,i,s,v,f){const u=[];return e.forEach(c=>{const{name:x,displayDirective:C,"display-directive":P}=c.props,W=z=>C===z||P===z,S=t===x;if(c.key!==void 0&&(c.key=x),S||W("show")||W("show:lazy")&&o.has(x)){o.has(x)||o.add(x);const z=!W("if");u.push(z?Nt(c,[[Dt,S]]):c)}}),f?p(Ft,{name:`${f}-transition`,onBeforeLeave:i,onEnter:s,onAfterEnter:v},{default:()=>u}):u}function Qe(e,t){return p(We,{ref:"addTabInstRef",key:"__addable",name:"__addable",internalCreatedByPane:!0,internalAddable:!0,internalLeftPadded:t,disabled:typeof e=="object"&&e.disabled})}function Ze(e){const t=Gt(e);return t.props?t.props.internalLeftPadded=!0:t.props={internalLeftPadded:!0},t}function Le(e){return Array.isArray(e.dynamicProps)?e.dynamicProps.includes("internalLeftPadded")||e.dynamicProps.push("internalLeftPadded"):e.dynamicProps=["internalLeftPadded"],e}const Xa=["data-theme"],Ya={key:0,class:"loading-state"},Ka={key:1,class:"auth-section"},Ja={class:"switch-link"},Qa={class:"switch-link"},Za={key:2,class:"comments-section"},en={class:"comment-form"},tn={class:"comments-list"},an={key:0,class:"empty-state"},nn={class:"comment-header"},rn=["src"],on={class:"nickname"},sn={class:"time"},ln={class:"floor"},dn=["innerHTML"],cn={key:1,class:"pagination"},bn="https://cravatar.cn/avatar/default",pn=Z({__name:"embed",setup(e){const t=qt(),o=t.query.appId,i=parseInt(t.query.chapterId,10)||0,s=t.query.token,v=t.query.theme||"light",f=t.query.lang||"zh-CN",u=R(!0),c=R(!1),x=R(""),C=R("login"),P=R(!1),W=R(!1),S=R(""),z=R([]),k=R(1),I=R({page:1,limit:20,total:0,totalPages:0}),E=R({email:"",password:""}),$=R({email:"",nickname:"",password:""}),F=()=>{const h={"Content-Type":"application/json"};return x.value&&(h.Authorization=`Bearer ${x.value}`),h},V=(h,m)=>{typeof window<"u"&&window.parent&&window.parent.postMessage({source:"chapter-comments",type:h,data:m},"*")},w=()=>{ue(()=>{const h=document.documentElement?.scrollHeight||400;V("resize",{height:h})})},g=async()=>{try{const h=await $fetch("/api/platform/comments",{query:{appId:o,chapterId:i,page:k.value,limit:I.value.limit}});h.data&&(z.value=h.data.list,I.value=h.data.pagination,V("commentCount",{count:h.data.pagination.total}))}catch(h){console.error("Failed to load comments:",h)}},j=async()=>{P.value=!0;try{const h=await $fetch("/api/auth/login",{method:"POST",body:{email:E.value.email,password:E.value.password}});h.data?.token&&(x.value=h.data.token,c.value=!0,V("login",{userId:h.data.user?.id}),g())}catch(h){console.error("Login failed:",h.data?.statusMessage||h.message)}finally{P.value=!1}},q=async()=>{P.value=!0;try{(await $fetch("/api/auth/register",{method:"POST",body:{email:$.value.email,password:$.value.password,nickname:$.value.nickname}})).err==="ok"&&(C.value="login")}catch(h){console.error("Register failed:",h.data?.statusMessage||h.message)}finally{P.value=!1}},X=async()=>{if(S.value.trim()){W.value=!0;try{await $fetch("/api/platform/comments",{method:"POST",headers:F(),body:{appId:o,chapterId:i,content:S.value,bookId:parseInt(t.query.bookId)||0,chapterName:t.query.chapterName||"",segmentId:parseInt(t.query.segmentId)||0}}),S.value="",k.value=1,await g()}catch(h){console.error("Post comment failed:",h.data?.statusMessage||h.message)}finally{W.value=!1}}},me=h=>{const m=new Date(h),G=new Date().getTime()-m.getTime();return G<6e4?"刚刚":G<36e5?`${Math.floor(G/6e4)}分钟前`:G<864e5?`${Math.floor(G/36e5)}小时前`:m.toLocaleDateString(f)},he=async()=>{if(!s){u.value=!1;return}try{const h=await $fetch("/api/platform/proxy-login",{method:"POST",body:{appId:o,proxyToken:s,externalId:t.query.externalId||"",externalEmail:t.query.externalEmail||"",externalNick:t.query.externalNick||""}});h.data?.token&&(x.value=h.data.token,c.value=!0)}catch(h){console.error("Proxy login failed:",h)}finally{u.value=!1}};return _e(()=>{typeof window<"u"&&window.addEventListener("message",h=>{if(!h.data||h.data.source!=="parent-sdk")return;const{type:m,data:T}=h.data;m==="setToken"?(x.value=T.token,c.value=!0,g()):m==="logout"&&(x.value="",c.value=!1)})}),_e(async()=>{s?await he():u.value=!1,(c.value||!s)&&await g(),w()}),fe([z,c],()=>{w()}),(h,m)=>(J(),Q("div",{class:"embed-container","data-theme":b(v)},[b(u)?(J(),Q("div",Ya,[L(b(Da),{size:"large"}),m[10]||(m[10]=M("p",{class:"mt-2"},"加载中...",-1))])):b(c)?(J(),Q("div",Za,[M("div",en,[L(b(re),{value:b(S),"onUpdate:value":m[8]||(m[8]=T=>Se(S)?S.value=T:null),type:"textarea",placeholder:"写下你的评论...",autosize:{minRows:2,maxRows:6}},null,8,["value"]),L(b(Te),{type:"primary",class:"mt-2",loading:b(W),disabled:!b(S).trim(),onClick:X},{default:H(()=>[...m[15]||(m[15]=[se(" 发表评论 ",-1)])]),_:1},8,["loading","disabled"])]),L(b(Re)),M("div",tn,[b(z).length===0?(J(),Q("div",an," 暂无评论，快来抢沙发吧！ ")):Fe("",!0),(J(!0),Q(Ie,null,Xt(b(z),T=>(J(),Q("div",{key:T.id,class:"comment-item"},[M("div",nn,[M("img",{src:T.avatar||bn,class:"avatar"},null,8,rn),M("span",on,we(T.nickname),1),M("span",sn,we(me(T.createdAt)),1),M("span",ln,"#"+we(T.level),1)]),M("div",{class:"comment-content",innerHTML:T.content},null,8,dn)]))),128)),b(I).totalPages>1?(J(),Q("div",cn,[L(b(pa),{page:b(k),"onUpdate:page":[m[9]||(m[9]=T=>Se(k)?k.value=T:null),g],"page-count":b(I).totalPages,"page-size":b(I).limit},null,8,["page","page-count","page-size"])])):Fe("",!0)])])):(J(),Q("div",Ka,[L(b(qa),{type:"line",value:b(C),"onUpdate:value":m[7]||(m[7]=T=>Se(C)?C.value=T:null)},{default:H(()=>[L(b(Ke),{name:"login",tab:"登录"},{default:H(()=>[L(b(qe),{model:b(E),onSubmit:ce(j,["prevent"])},{default:H(()=>[L(b(le),{label:"邮箱"},{default:H(()=>[L(b(re),{value:b(E).email,"onUpdate:value":m[0]||(m[0]=T=>b(E).email=T),type:"email",placeholder:"your@email.com"},null,8,["value"])]),_:1}),L(b(le),{label:"密码"},{default:H(()=>[L(b(re),{value:b(E).password,"onUpdate:value":m[1]||(m[1]=T=>b(E).password=T),type:"password",placeholder:"请输入密码"},null,8,["value"])]),_:1}),L(b(Te),{type:"primary",block:"",loading:b(P),"attr-type":"submit"},{default:H(()=>[...m[11]||(m[11]=[se(" 登录 ",-1)])]),_:1},8,["loading"])]),_:1},8,["model"]),L(b(Re)),M("p",Ja,[m[12]||(m[12]=se(" 没有账号？",-1)),M("a",{href:"#",onClick:m[2]||(m[2]=ce(T=>C.value="register",["prevent"]))},"立即注册")])]),_:1}),L(b(Ke),{name:"register",tab:"注册"},{default:H(()=>[L(b(qe),{model:b($),onSubmit:ce(q,["prevent"])},{default:H(()=>[L(b(le),{label:"邮箱"},{default:H(()=>[L(b(re),{value:b($).email,"onUpdate:value":m[3]||(m[3]=T=>b($).email=T),type:"email",placeholder:"your@email.com"},null,8,["value"])]),_:1}),L(b(le),{label:"昵称"},{default:H(()=>[L(b(re),{value:b($).nickname,"onUpdate:value":m[4]||(m[4]=T=>b($).nickname=T),placeholder:"请输入昵称"},null,8,["value"])]),_:1}),L(b(le),{label:"密码"},{default:H(()=>[L(b(re),{value:b($).password,"onUpdate:value":m[5]||(m[5]=T=>b($).password=T),type:"password",placeholder:"至少6位密码"},null,8,["value"])]),_:1}),L(b(Te),{type:"primary",block:"",loading:b(P),"attr-type":"submit"},{default:H(()=>[...m[13]||(m[13]=[se(" 注册 ",-1)])]),_:1},8,["loading"])]),_:1},8,["model"]),L(b(Re)),M("p",Qa,[m[14]||(m[14]=se(" 已有账号？",-1)),M("a",{href:"#",onClick:m[6]||(m[6]=ce(T=>C.value="login",["prevent"]))},"立即登录")])]),_:1})]),_:1},8,["value"])]))],8,Xa))}}),yn=fa(pn,[["__scopeId","data-v-a7464104"]]);export{yn as default};
