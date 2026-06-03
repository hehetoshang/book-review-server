import{A as Ce,N as E}from"./Bo5lgNmV.js";import{e as re,h as f,r as B,f as H,u as _e,x as $e,k as Be,G as Re,w as r,H as X,o as Z,c as ze,a as ee,b as o,y as n,d as $,t as te,B as Ve,E as Ne}from"./CI2nsVyN.js";import{d as Ae,p as Fe,c as ae,b as l,q as ie,j as Y,e as w,a as oe,s as q,n as V,v as Me,N as Pe,f as Te,g as se,w as We,h as De,o as G,l as N,B as T}from"./Nu5kl8fh.js";import{e as He,p as J,h as x}from"./DwHjonGY.js";import{N as je,a as ne}from"./DWZYCsh5.js";import{u as Ie}from"./Cng88kw-.js";import{N as le,a as A}from"./CoQkNnKy.js";import{N as j}from"./DjTK5B1V.js";import{N as Le}from"./CzO68J6A.js";import{_ as Oe}from"./DlAUqK2U.js";const Ue={buttonHeightSmall:"14px",buttonHeightMedium:"18px",buttonHeightLarge:"22px",buttonWidthSmall:"14px",buttonWidthMedium:"18px",buttonWidthLarge:"22px",buttonWidthPressedSmall:"20px",buttonWidthPressedMedium:"24px",buttonWidthPressedLarge:"28px",railHeightSmall:"18px",railHeightMedium:"22px",railHeightLarge:"26px",railWidthSmall:"32px",railWidthMedium:"40px",railWidthLarge:"48px"};function Ke(e){const{primaryColor:v,opacityDisabled:h,borderRadius:d,textColor3:b}=e;return Object.assign(Object.assign({},Ue),{iconColor:b,textColor:"white",loadingColor:v,opacityDisabled:h,railColor:"rgba(0, 0, 0, .14)",railColorActive:v,buttonBoxShadow:"0 1px 4px 0 rgba(0, 0, 0, 0.3), inset 0 0 1px 0 rgba(0, 0, 0, 0.05)",buttonColor:"#FFF",railBorderRadiusSmall:d,railBorderRadiusMedium:d,railBorderRadiusLarge:d,buttonBorderRadiusSmall:d,buttonBorderRadiusMedium:d,buttonBorderRadiusLarge:d,boxShadowFocus:`0 0 0 2px ${Fe(v,{alpha:.2})}`})}const Ee={common:Ae,self:Ke},Xe=ae("switch",`
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
 `,[ie({left:"50%",top:"50%",originalTransform:"translateX(-50%) translateY(-50%)"})]),l("checked, unchecked",`
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
 `),Y("&:focus",[l("rail",`
 box-shadow: var(--n-box-shadow-focus);
 `)]),w("round",[l("rail","border-radius: calc(var(--n-rail-height) / 2);",[l("button","border-radius: calc(var(--n-button-height) / 2);")])]),oe("disabled",[oe("icon",[w("rubber-band",[w("pressed",[l("rail",[l("button","max-width: var(--n-button-width-pressed);")])]),l("rail",[Y("&:active",[l("button","max-width: var(--n-button-width-pressed);")])]),w("active",[w("pressed",[l("rail",[l("button","left: calc(100% - var(--n-offset) - var(--n-button-width-pressed));")])]),l("rail",[Y("&:active",[l("button","left: calc(100% - var(--n-offset) - var(--n-button-width-pressed));")])])])])])]),w("active",[l("rail",[l("button","left: calc(100% - var(--n-button-width) - var(--n-offset))")])]),l("rail",`
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
 `,[ie()]),l("button",`
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
 `)]),w("active",[l("rail","background-color: var(--n-rail-color-active);")]),w("loading",[l("rail",`
 cursor: wait;
 `)]),w("disabled",[l("rail",`
 cursor: not-allowed;
 opacity: .5;
 `)])]),Ye=Object.assign(Object.assign({},se.props),{size:String,value:{type:[String,Number,Boolean],default:void 0},loading:Boolean,defaultValue:{type:[String,Number,Boolean],default:!1},disabled:{type:Boolean,default:void 0},round:{type:Boolean,default:!0},"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],checkedValue:{type:[String,Number,Boolean],default:!0},uncheckedValue:{type:[String,Number,Boolean],default:!1},railStyle:Function,rubberBand:{type:Boolean,default:!0},spinProps:Object,onChange:[Function,Array]});let W;const qe=re({name:"Switch",props:Ye,slots:Object,setup(e){W===void 0&&(typeof CSS<"u"?typeof CSS.supports<"u"?W=CSS.supports("width","max(1px)"):W=!1:W=!0);const{mergedClsPrefixRef:v,inlineThemeDisabled:h,mergedComponentPropsRef:d}=Te(e),b=se("Switch","-switch",Xe,Ee,e,v),c=We(e,{mergedSize(i){var k,S;if(e.size!==void 0)return e.size;if(i)return i.mergedSize.value;const z=(S=(k=d?.value)===null||k===void 0?void 0:k.Switch)===null||S===void 0?void 0:S.size;return z||"medium"}}),{mergedSizeRef:m,mergedDisabledRef:p}=c,y=B(e.defaultValue),F=_e(e,"value"),g=He(F,y),R=H(()=>g.value===e.checkedValue),s=B(!1),a=B(!1),t=H(()=>{const{railStyle:i}=e;if(i)return i({focused:a.value,checked:R.value})});function u(i){const{"onUpdate:value":k,onChange:S,onUpdateValue:z}=e,{nTriggerFormInput:I,nTriggerFormChange:L}=c;k&&G(k,i),z&&G(z,i),S&&G(S,i),y.value=i,I(),L()}function D(){const{nTriggerFormFocus:i}=c;i()}function de(){const{nTriggerFormBlur:i}=c;i()}function ue(){e.loading||p.value||(g.value!==e.checkedValue?u(e.checkedValue):u(e.uncheckedValue))}function ce(){a.value=!0,D()}function he(){a.value=!1,de(),s.value=!1}function fe(i){e.loading||p.value||i.key===" "&&(g.value!==e.checkedValue?u(e.checkedValue):u(e.uncheckedValue),s.value=!1)}function ve(i){e.loading||p.value||i.key===" "&&(i.preventDefault(),s.value=!0)}const Q=H(()=>{const{value:i}=m,{self:{opacityDisabled:k,railColor:S,railColorActive:z,buttonBoxShadow:I,buttonColor:L,boxShadowFocus:be,loadingColor:pe,textColor:me,iconColor:ge,[N("buttonHeight",i)]:C,[N("buttonWidth",i)]:we,[N("buttonWidthPressed",i)]:xe,[N("railHeight",i)]:_,[N("railWidth",i)]:P,[N("railBorderRadius",i)]:ye,[N("buttonBorderRadius",i)]:ke},common:{cubicBezierEaseInOut:Se}}=b.value;let O,U,K;return W?(O=`calc((${_} - ${C}) / 2)`,U=`max(${_}, ${C})`,K=`max(${P}, calc(${P} + ${C} - ${_}))`):(O=J((x(_)-x(C))/2),U=J(Math.max(x(_),x(C))),K=x(_)>x(C)?P:J(x(P)+x(C)-x(_))),{"--n-bezier":Se,"--n-button-border-radius":ke,"--n-button-box-shadow":I,"--n-button-color":L,"--n-button-width":we,"--n-button-width-pressed":xe,"--n-button-height":C,"--n-height":U,"--n-offset":O,"--n-opacity-disabled":k,"--n-rail-border-radius":ye,"--n-rail-color":S,"--n-rail-color-active":z,"--n-rail-height":_,"--n-rail-width":P,"--n-width":K,"--n-box-shadow-focus":be,"--n-loading-color":pe,"--n-text-color":me,"--n-icon-color":ge}}),M=h?De("switch",H(()=>m.value[0]),Q,e):void 0;return{handleClick:ue,handleBlur:he,handleFocus:ce,handleKeyup:fe,handleKeydown:ve,mergedRailStyle:t,pressed:s,mergedClsPrefix:v,mergedValue:g,checked:R,mergedDisabled:p,cssVars:h?void 0:Q,themeClass:M?.themeClass,onRender:M?.onRender}},render(){const{mergedClsPrefix:e,mergedDisabled:v,checked:h,mergedRailStyle:d,onRender:b,$slots:c}=this;b?.();const{checked:m,unchecked:p,icon:y,"checked-icon":F,"unchecked-icon":g}=c,R=!(q(y)&&q(F)&&q(g));return f("div",{role:"switch","aria-checked":h,class:[`${e}-switch`,this.themeClass,R&&`${e}-switch--icon`,h&&`${e}-switch--active`,v&&`${e}-switch--disabled`,this.round&&`${e}-switch--round`,this.loading&&`${e}-switch--loading`,this.pressed&&`${e}-switch--pressed`,this.rubberBand&&`${e}-switch--rubber-band`],tabindex:this.mergedDisabled?void 0:0,style:this.cssVars,onClick:this.handleClick,onFocus:this.handleFocus,onBlur:this.handleBlur,onKeyup:this.handleKeyup,onKeydown:this.handleKeydown},f("div",{class:`${e}-switch__rail`,"aria-hidden":"true",style:d},V(m,s=>V(p,a=>s||a?f("div",{"aria-hidden":!0,class:`${e}-switch__children-placeholder`},f("div",{class:`${e}-switch__rail-placeholder`},f("div",{class:`${e}-switch__button-placeholder`}),s),f("div",{class:`${e}-switch__rail-placeholder`},f("div",{class:`${e}-switch__button-placeholder`}),a)):null)),f("div",{class:`${e}-switch__button`},V(y,s=>V(F,a=>V(g,t=>f(Me,null,{default:()=>this.loading?f(Pe,Object.assign({key:"loading",clsPrefix:e,strokeWidth:20},this.spinProps)):this.checked&&(a||s)?f("div",{class:`${e}-switch__button-icon`,key:a?"checked-icon":"icon"},a||s):!this.checked&&(t||s)?f("div",{class:`${e}-switch__button-icon`,key:t?"unchecked-icon":"icon"},t||s):null})))),V(m,s=>s&&f("div",{key:"checked",class:`${e}-switch__checked`},s)),V(p,s=>s&&f("div",{key:"unchecked",class:`${e}-switch__unchecked`},s)))))}}),Ge={key:0,class:"app-detail"},Je={class:"page-header"},Qe=re({__name:"[id]",setup(e){const v=$e(),h=Ie(),d=B(null),b=B(""),c=B({name:"",domains:"",isActive:!0}),m=B(!1),p=B(!1),y=async()=>{try{const{token:a}=X(),t=v.params.id,[u,D]=await Promise.all([$fetch(`/api/admin/apps/${t}`,{headers:{Authorization:`Bearer ${a.value}`}}),$fetch(`/api/admin/apps/${t}/secret`,{headers:{Authorization:`Bearer ${a.value}`}})]);u.data&&(d.value=u.data,c.value={name:u.data.name,domains:u.data.domains,isActive:u.data.isActive}),D.data&&(b.value=D.data.secret)}catch(a){h.error(a.data?.statusMessage||"加载失败")}},F=async()=>{m.value=!0;try{const{token:a}=X();await $fetch(`/api/admin/apps/${v.params.id}`,{method:"PUT",headers:{Authorization:`Bearer ${a.value}`},body:c.value}),h.success("更新成功"),y()}catch(a){h.error(a.data?.statusMessage||"更新失败")}finally{m.value=!1}},g=async()=>{p.value=!0;try{const{token:a}=X(),t=await $fetch(`/api/admin/apps/${v.params.id}/reset-secret`,{method:"POST",headers:{Authorization:`Bearer ${a.value}`}});t.data&&(b.value=t.data.secret,h.success("Secret 已重置"))}catch(a){h.error(a.data?.statusMessage||"重置失败")}finally{p.value=!1}},R=a=>{a&&navigator.clipboard&&navigator.clipboard.writeText(a).then(()=>h.success("已复制"))},s=()=>{Ne("/admin/apps")};return Be(y),(a,t)=>(Z(),Re(Ce,null,{default:r(()=>[d.value?(Z(),ze("div",Ge,[ee("div",Je,[o(n(T),{onClick:s},{default:r(()=>[...t[5]||(t[5]=[$("返回",-1)])]),_:1}),t[6]||(t[6]=ee("h1",{class:"page-title"},"应用详情",-1))]),o(n(E),{title:"基本信息",class:"detail-card"},{default:r(()=>[o(n(le),{"label-placement":"left","label-width":"100"},{default:r(()=>[o(n(A),{label:"App ID"},{default:r(()=>[o(n(j),{value:d.value.appId,readonly:""},{suffix:r(()=>[o(n(T),{text:"",onClick:t[0]||(t[0]=u=>R(d.value.appId))},{default:r(()=>[...t[7]||(t[7]=[$("复制",-1)])]),_:1})]),_:1},8,["value"])]),_:1}),o(n(A),{label:"应用名称"},{default:r(()=>[o(n(j),{value:c.value.name,"onUpdate:value":t[1]||(t[1]=u=>c.value.name=u)},null,8,["value"])]),_:1}),o(n(A),{label:"允许域名"},{default:r(()=>[o(n(j),{value:c.value.domains,"onUpdate:value":t[2]||(t[2]=u=>c.value.domains=u),placeholder:"多个域名用逗号分隔"},null,8,["value"])]),_:1}),o(n(A),{label:"状态"},{default:r(()=>[o(n(qe),{value:c.value.isActive,"onUpdate:value":t[3]||(t[3]=u=>c.value.isActive=u)},null,8,["value"])]),_:1}),o(n(A),null,{default:r(()=>[o(n(T),{type:"primary",loading:m.value,onClick:F},{default:r(()=>[...t[8]||(t[8]=[$("保存",-1)])]),_:1},8,["loading"])]),_:1})]),_:1})]),_:1}),o(n(E),{title:"API 密钥",class:"detail-card"},{default:r(()=>[o(n(Le),{type:"warning",class:"mb-4"},{default:r(()=>[...t[9]||(t[9]=[$(" Secret 用于签名代理登录 Token，请妥善保管，切勿泄露。 ",-1)])]),_:1}),o(n(le),{"label-placement":"left","label-width":"100"},{default:r(()=>[o(n(A),{label:"Secret"},{default:r(()=>[o(n(j),{value:b.value,type:"password","show-password-on":"click",readonly:""},{suffix:r(()=>[o(n(T),{text:"",onClick:t[4]||(t[4]=u=>R(b.value))},{default:r(()=>[...t[10]||(t[10]=[$("复制",-1)])]),_:1})]),_:1},8,["value"])]),_:1}),o(n(A),null,{default:r(()=>[o(n(T),{type:"warning",loading:p.value,onClick:g},{default:r(()=>[...t[11]||(t[11]=[$(" 重置 Secret ",-1)])]),_:1},8,["loading"])]),_:1})]),_:1})]),_:1}),o(n(E),{title:"统计信息",class:"detail-card"},{default:r(()=>[o(n(je),{column:2},{default:r(()=>[o(n(ne),{label:"评论总数"},{default:r(()=>[$(te(d.value._count?.comments||0),1)]),_:1}),o(n(ne),{label:"创建时间"},{default:r(()=>[$(te(new Date(d.value.createdAt).toLocaleString("zh-CN")),1)]),_:1})]),_:1})]),_:1})])):Ve("",!0)]),_:1}))}}),dt=Oe(Qe,[["__scopeId","data-v-077a7264"]]);export{dt as default};
