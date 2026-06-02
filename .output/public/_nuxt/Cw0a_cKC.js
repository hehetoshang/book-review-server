import{_ as Se,N as E}from"./CsjgjjqP.js";import{e as re,h,r as R,f as H,u as _e,x as Ce,k as $e,G as Be,w as r,H as X,o as te,y as t,c as Re,b as o,d as g,t as Y,B as ze,E as Ne}from"./Dh6qteut.js";import{d as Ve,p as Ae,c as ae,b as l,q as oe,j as q,e as y,a as ie,s as G,n as V,v as Fe,N as Me,f as Pe,g as le,w as Te,h as We,o as J,l as A,B as W}from"./CVs_vHtr.js";import{e as De,p as Q,h as k}from"./BGEdsBqm.js";import{N as He,a as Z}from"./DyXtXTqF.js";import{u as Le,N as je}from"./BEk8sKlT.js";import{N as ne,a as F}from"./DLp3fsnH.js";import{N as L}from"./B41yRuRU.js";import{N as Ie}from"./CIkIVNHh.js";import{_ as Oe}from"./DlAUqK2U.js";const Ue={buttonHeightSmall:"14px",buttonHeightMedium:"18px",buttonHeightLarge:"22px",buttonWidthSmall:"14px",buttonWidthMedium:"18px",buttonWidthLarge:"22px",buttonWidthPressedSmall:"20px",buttonWidthPressedMedium:"24px",buttonWidthPressedLarge:"28px",railHeightSmall:"18px",railHeightMedium:"22px",railHeightLarge:"26px",railWidthSmall:"32px",railWidthMedium:"40px",railWidthLarge:"48px"};function Ke(e){const{primaryColor:f,opacityDisabled:c,borderRadius:s,textColor3:b}=e;return Object.assign(Object.assign({},Ue),{iconColor:b,textColor:"white",loadingColor:f,opacityDisabled:c,railColor:"rgba(0, 0, 0, .14)",railColorActive:f,buttonBoxShadow:"0 1px 4px 0 rgba(0, 0, 0, 0.3), inset 0 0 1px 0 rgba(0, 0, 0, 0.05)",buttonColor:"#FFF",railBorderRadiusSmall:s,railBorderRadiusMedium:s,railBorderRadiusLarge:s,buttonBorderRadiusSmall:s,buttonBorderRadiusMedium:s,buttonBorderRadiusLarge:s,boxShadowFocus:`0 0 0 2px ${Ae(f,{alpha:.2})}`})}const Ee={common:Ve,self:Ke},Xe=ae("switch",`
 height: var(--n-height);
 min-width: var(--n-width);
 vertical-align: middle;
 user-select: none;
 -webkit-user-select: none;
 display: inline-flex;
 outline: none;
 justify-content: center;
 align-items: center;
`,[l("children-placeholder",`
 height: var(--n-rail-height);
 display: flex;
 flex-direction: column;
 overflow: hidden;
 pointer-events: none;
 visibility: hidden;
 `),l("rail-placeholder",`
 display: flex;
 flex-wrap: none;
 `),l("button-placeholder",`
 width: calc(1.75 * var(--n-rail-height));
 height: var(--n-rail-height);
 `),ae("base-loading",`
 position: absolute;
 top: 50%;
 left: 50%;
 transform: translateX(-50%) translateY(-50%);
 font-size: calc(var(--n-button-width) - 4px);
 color: var(--n-loading-color);
 transition: color .3s var(--n-bezier);
 `,[oe({left:"50%",top:"50%",originalTransform:"translateX(-50%) translateY(-50%)"})]),l("checked, unchecked",`
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
 box-sizing: border-box;
 position: absolute;
 white-space: nowrap;
 top: 0;
 bottom: 0;
 display: flex;
 align-items: center;
 line-height: 1;
 `),l("checked",`
 right: 0;
 padding-right: calc(1.25 * var(--n-rail-height) - var(--n-offset));
 `),l("unchecked",`
 left: 0;
 justify-content: flex-end;
 padding-left: calc(1.25 * var(--n-rail-height) - var(--n-offset));
 `),q("&:focus",[l("rail",`
 box-shadow: var(--n-box-shadow-focus);
 `)]),y("round",[l("rail","border-radius: calc(var(--n-rail-height) / 2);",[l("button","border-radius: calc(var(--n-button-height) / 2);")])]),ie("disabled",[ie("icon",[y("rubber-band",[y("pressed",[l("rail",[l("button","max-width: var(--n-button-width-pressed);")])]),l("rail",[q("&:active",[l("button","max-width: var(--n-button-width-pressed);")])]),y("active",[y("pressed",[l("rail",[l("button","left: calc(100% - var(--n-offset) - var(--n-button-width-pressed));")])]),l("rail",[q("&:active",[l("button","left: calc(100% - var(--n-offset) - var(--n-button-width-pressed));")])])])])])]),y("active",[l("rail",[l("button","left: calc(100% - var(--n-button-width) - var(--n-offset))")])]),l("rail",`
 overflow: hidden;
 height: var(--n-rail-height);
 min-width: var(--n-rail-width);
 border-radius: var(--n-rail-border-radius);
 cursor: pointer;
 position: relative;
 transition:
 opacity .3s var(--n-bezier),
 background .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
 background-color: var(--n-rail-color);
 `,[l("button-icon",`
 color: var(--n-icon-color);
 transition: color .3s var(--n-bezier);
 font-size: calc(var(--n-button-height) - 4px);
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 display: flex;
 justify-content: center;
 align-items: center;
 line-height: 1;
 `,[oe()]),l("button",`
 align-items: center; 
 top: var(--n-offset);
 left: var(--n-offset);
 height: var(--n-button-height);
 width: var(--n-button-width-pressed);
 max-width: var(--n-button-width);
 border-radius: var(--n-button-border-radius);
 background-color: var(--n-button-color);
 box-shadow: var(--n-button-box-shadow);
 box-sizing: border-box;
 cursor: inherit;
 content: "";
 position: absolute;
 transition:
 background-color .3s var(--n-bezier),
 left .3s var(--n-bezier),
 opacity .3s var(--n-bezier),
 max-width .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
 `)]),y("active",[l("rail","background-color: var(--n-rail-color-active);")]),y("loading",[l("rail",`
 cursor: wait;
 `)]),y("disabled",[l("rail",`
 cursor: not-allowed;
 opacity: .5;
 `)])]),Ye=Object.assign(Object.assign({},le.props),{size:String,value:{type:[String,Number,Boolean],default:void 0},loading:Boolean,defaultValue:{type:[String,Number,Boolean],default:!1},disabled:{type:Boolean,default:void 0},round:{type:Boolean,default:!0},"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],checkedValue:{type:[String,Number,Boolean],default:!0},uncheckedValue:{type:[String,Number,Boolean],default:!1},railStyle:Function,rubberBand:{type:Boolean,default:!0},spinProps:Object,onChange:[Function,Array]});let D;const qe=re({name:"Switch",props:Ye,slots:Object,setup(e){D===void 0&&(typeof CSS<"u"?typeof CSS.supports<"u"?D=CSS.supports("width","max(1px)"):D=!1:D=!0);const{mergedClsPrefixRef:f,inlineThemeDisabled:c,mergedComponentPropsRef:s}=Pe(e),b=le("Switch","-switch",Xe,Ee,e,f),u=Te(e,{mergedSize(n){var _,C;if(e.size!==void 0)return e.size;if(n)return n.mergedSize.value;const N=(C=(_=s?.value)===null||_===void 0?void 0:_.Switch)===null||C===void 0?void 0:C.size;return N||"medium"}}),{mergedSizeRef:w,mergedDisabledRef:m}=u,S=R(e.defaultValue),M=_e(e,"value"),x=De(M,S),z=H(()=>x.value===e.checkedValue),d=R(!1),i=R(!1),a=H(()=>{const{railStyle:n}=e;if(n)return n({focused:i.value,checked:z.value})});function v(n){const{"onUpdate:value":_,onChange:C,onUpdateValue:N}=e,{nTriggerFormInput:j,nTriggerFormChange:I}=u;_&&J(_,n),N&&J(N,n),C&&J(C,n),S.value=n,j(),I()}function p(){const{nTriggerFormFocus:n}=u;n()}function se(){const{nTriggerFormBlur:n}=u;n()}function de(){e.loading||m.value||(x.value!==e.checkedValue?v(e.checkedValue):v(e.uncheckedValue))}function ue(){i.value=!0,p()}function ce(){i.value=!1,se(),d.value=!1}function he(n){e.loading||m.value||n.key===" "&&(x.value!==e.checkedValue?v(e.checkedValue):v(e.uncheckedValue),d.value=!1)}function fe(n){e.loading||m.value||n.key===" "&&(n.preventDefault(),d.value=!0)}const ee=H(()=>{const{value:n}=w,{self:{opacityDisabled:_,railColor:C,railColorActive:N,buttonBoxShadow:j,buttonColor:I,boxShadowFocus:be,loadingColor:ve,textColor:pe,iconColor:me,[A("buttonHeight",n)]:$,[A("buttonWidth",n)]:ge,[A("buttonWidthPressed",n)]:we,[A("railHeight",n)]:B,[A("railWidth",n)]:T,[A("railBorderRadius",n)]:xe,[A("buttonBorderRadius",n)]:ye},common:{cubicBezierEaseInOut:ke}}=b.value;let O,U,K;return D?(O=`calc((${B} - ${$}) / 2)`,U=`max(${B}, ${$})`,K=`max(${T}, calc(${T} + ${$} - ${B}))`):(O=Q((k(B)-k($))/2),U=Q(Math.max(k(B),k($))),K=k(B)>k($)?T:Q(k(T)+k($)-k(B))),{"--n-bezier":ke,"--n-button-border-radius":ye,"--n-button-box-shadow":j,"--n-button-color":I,"--n-button-width":ge,"--n-button-width-pressed":we,"--n-button-height":$,"--n-height":U,"--n-offset":O,"--n-opacity-disabled":_,"--n-rail-border-radius":xe,"--n-rail-color":C,"--n-rail-color-active":N,"--n-rail-height":B,"--n-rail-width":T,"--n-width":K,"--n-box-shadow-focus":be,"--n-loading-color":ve,"--n-text-color":pe,"--n-icon-color":me}}),P=c?We("switch",H(()=>w.value[0]),ee,e):void 0;return{handleClick:de,handleBlur:ce,handleFocus:ue,handleKeyup:he,handleKeydown:fe,mergedRailStyle:a,pressed:d,mergedClsPrefix:f,mergedValue:x,checked:z,mergedDisabled:m,cssVars:c?void 0:ee,themeClass:P?.themeClass,onRender:P?.onRender}},render(){const{mergedClsPrefix:e,mergedDisabled:f,checked:c,mergedRailStyle:s,onRender:b,$slots:u}=this;b?.();const{checked:w,unchecked:m,icon:S,"checked-icon":M,"unchecked-icon":x}=u,z=!(G(S)&&G(M)&&G(x));return h("div",{role:"switch","aria-checked":c,class:[`${e}-switch`,this.themeClass,z&&`${e}-switch--icon`,c&&`${e}-switch--active`,f&&`${e}-switch--disabled`,this.round&&`${e}-switch--round`,this.loading&&`${e}-switch--loading`,this.pressed&&`${e}-switch--pressed`,this.rubberBand&&`${e}-switch--rubber-band`],tabindex:this.mergedDisabled?void 0:0,style:this.cssVars,onClick:this.handleClick,onFocus:this.handleFocus,onBlur:this.handleBlur,onKeyup:this.handleKeyup,onKeydown:this.handleKeydown},h("div",{class:`${e}-switch__rail`,"aria-hidden":"true",style:s},V(w,d=>V(m,i=>d||i?h("div",{"aria-hidden":!0,class:`${e}-switch__children-placeholder`},h("div",{class:`${e}-switch__rail-placeholder`},h("div",{class:`${e}-switch__button-placeholder`}),d),h("div",{class:`${e}-switch__rail-placeholder`},h("div",{class:`${e}-switch__button-placeholder`}),i)):null)),h("div",{class:`${e}-switch__button`},V(S,d=>V(M,i=>V(x,a=>h(Fe,null,{default:()=>this.loading?h(Me,Object.assign({key:"loading",clsPrefix:e,strokeWidth:20},this.spinProps)):this.checked&&(i||d)?h("div",{class:`${e}-switch__button-icon`,key:i?"checked-icon":"icon"},i||d):!this.checked&&(a||d)?h("div",{class:`${e}-switch__button-icon`,key:a?"unchecked-icon":"icon"},a||d):null})))),V(w,d=>d&&h("div",{key:"checked",class:`${e}-switch__checked`},d)),V(m,d=>d&&h("div",{key:"unchecked",class:`${e}-switch__unchecked`},d)))))}}),Ge={key:0,class:"app-detail"},Je=re({__name:"[id]",setup(e){const f=Ce(),c=Le(),s=R(null),b=R(""),u=R({name:"",domains:"",isActive:!0}),w=R(!1),m=R(!1),S=async()=>{try{const{token:i}=X(),a=f.params.id,[v,p]=await Promise.all([$fetch(`/api/admin/apps/${a}`,{headers:{Authorization:`Bearer ${i.value}`}}),$fetch(`/api/admin/apps/${a}/secret`,{headers:{Authorization:`Bearer ${i.value}`}})]);v.data&&(s.value=v.data,u.value={name:v.data.name,domains:v.data.domains,isActive:v.data.isActive}),p.data&&(b.value=p.data.secret)}catch(i){c.error(i.data?.statusMessage||"加载失败")}},M=async()=>{w.value=!0;try{const{token:i}=X();await $fetch(`/api/admin/apps/${f.params.id}`,{method:"PUT",headers:{Authorization:`Bearer ${i.value}`},body:u.value}),c.success("更新成功"),S()}catch(i){c.error(i.data?.statusMessage||"更新失败")}finally{w.value=!1}},x=async()=>{m.value=!0;try{const{token:i}=X(),a=await $fetch(`/api/admin/apps/${f.params.id}/reset-secret`,{method:"POST",headers:{Authorization:`Bearer ${i.value}`}});a.data&&(b.value=a.data.secret,c.success("Secret 已重置"))}catch(i){c.error(i.data?.statusMessage||"重置失败")}finally{m.value=!1}},z=i=>{i&&navigator.clipboard&&navigator.clipboard.writeText(i).then(()=>c.success("已复制"))},d=()=>{Ne("/admin/apps")};return $e(S),(i,a)=>{const v=Se;return te(),Be(v,null,{default:r(()=>[t(s)?(te(),Re("div",Ge,[o(t(je),null,{default:r(()=>[...a[5]||(a[5]=[g("应用详情",-1)])]),_:1}),o(t(E),{class:"mb-4",title:"基本信息"},{default:r(()=>[o(t(ne),null,{default:r(()=>[o(t(F),{label:"App ID"},{default:r(()=>[o(t(L),{value:t(s).appId,readonly:""},{suffix:r(()=>[o(t(W),{text:"",onClick:a[0]||(a[0]=p=>z(t(s).appId))},{default:r(()=>[...a[6]||(a[6]=[g("复制",-1)])]),_:1})]),_:1},8,["value"])]),_:1}),o(t(F),{label:"应用名称"},{default:r(()=>[o(t(L),{value:t(u).name,"onUpdate:value":a[1]||(a[1]=p=>t(u).name=p)},null,8,["value"])]),_:1}),o(t(F),{label:"允许域名"},{default:r(()=>[o(t(L),{value:t(u).domains,"onUpdate:value":a[2]||(a[2]=p=>t(u).domains=p),placeholder:"多个域名用逗号分隔"},null,8,["value"])]),_:1}),o(t(F),{label:"状态"},{default:r(()=>[o(t(qe),{value:t(u).isActive,"onUpdate:value":a[3]||(a[3]=p=>t(u).isActive=p)},null,8,["value"])]),_:1}),o(t(F),null,{default:r(()=>[o(t(W),{type:"primary",loading:t(w),onClick:M},{default:r(()=>[...a[7]||(a[7]=[g("保存",-1)])]),_:1},8,["loading"])]),_:1})]),_:1})]),_:1}),o(t(E),{class:"mb-4",title:"API 密钥"},{default:r(()=>[o(t(Ie),{type:"warning",class:"mb-4"},{default:r(()=>[...a[8]||(a[8]=[g(" Secret 用于签名代理登录 Token，请妥善保管，切勿泄露给第三方。 ",-1)])]),_:1}),o(t(ne),null,{default:r(()=>[o(t(F),{label:"Secret"},{default:r(()=>[o(t(L),{value:t(b),type:"password","show-password-on":"click",readonly:""},{suffix:r(()=>[o(t(W),{text:"",onClick:a[4]||(a[4]=p=>z(t(b)))},{default:r(()=>[...a[9]||(a[9]=[g("复制",-1)])]),_:1})]),_:1},8,["value"])]),_:1}),o(t(F),null,{default:r(()=>[o(t(W),{type:"warning",loading:t(m),onClick:x},{default:r(()=>[...a[10]||(a[10]=[g(" 重置 Secret ",-1)])]),_:1},8,["loading"])]),_:1})]),_:1})]),_:1}),o(t(E),{class:"mb-4",title:"统计信息"},{default:r(()=>[o(t(He),{column:2},{default:r(()=>[o(t(Z),{label:"评论总数"},{default:r(()=>[g(Y(t(s)._count?.comments||0),1)]),_:1}),o(t(Z),{label:"创建时间"},{default:r(()=>[g(Y(new Date(t(s).createdAt).toLocaleString("zh-CN")),1)]),_:1}),o(t(Z),{label:"更新时间"},{default:r(()=>[g(Y(new Date(t(s).updatedAt).toLocaleString("zh-CN")),1)]),_:1})]),_:1})]),_:1}),o(t(W),{type:"error",onClick:d},{default:r(()=>[...a[11]||(a[11]=[g("返回列表",-1)])]),_:1})])):ze("",!0)]),_:1})}}}),st=Oe(Je,[["__scopeId","data-v-5cee8934"]]);export{st as default};
