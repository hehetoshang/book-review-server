import{e as M,h as m,E as ae,F as H,y as le,f as T,G as O,g as de,c as P,a as s,b as n,w as g,j as a,H as ce,t as $,m as B,d as w,n as k,s as V,o as F}from"./D0f9MUYh.js";import{d as pe,c as l,e as E,k as C,b as R,o as j,a as q,f as L,u as G,p as ue,j as me,l as A,N as fe,q as W,t as ve,g as ge,m as z,n as D,B as _}from"./DCUpAum_.js";import{f as he,N as K,E as xe}from"./Cn7_ziYn.js";import{g as be,N as Ce}from"./B2kimgvb.js";import{F as ze}from"./SFyX4FVz.js";import{u as Se}from"./OHiy9XSj.js";import{a as I,N as ye}from"./D3QPRFwM.js";import{N}from"./CCgpgxan.js";import{N as we}from"./Cc-6ERpJ.js";import{_ as ke}from"./DlAUqK2U.js";import"./Cww71ve8.js";import"./Cmmx3qnu.js";const Ie={stepHeaderFontSizeSmall:"14px",stepHeaderFontSizeMedium:"16px",indicatorIndexFontSizeSmall:"14px",indicatorIndexFontSizeMedium:"16px",indicatorSizeSmall:"22px",indicatorSizeMedium:"28px",indicatorIconSizeSmall:"14px",indicatorIconSizeMedium:"18px"};function Ne(t){const{fontWeightStrong:c,baseColor:i,textColorDisabled:o,primaryColor:p,errorColor:f,textColor1:v,textColor2:b}=t;return Object.assign(Object.assign({},Ie),{stepHeaderFontWeight:c,indicatorTextColorProcess:i,indicatorTextColorWait:o,indicatorTextColorFinish:p,indicatorTextColorError:f,indicatorBorderColorProcess:p,indicatorBorderColorWait:o,indicatorBorderColorFinish:p,indicatorBorderColorError:f,indicatorColorProcess:p,indicatorColorWait:"#0000",indicatorColorFinish:"#0000",indicatorColorError:"#0000",splitorColorProcess:o,splitorColorWait:o,splitorColorFinish:p,splitorColorError:o,headerTextColorProcess:v,headerTextColorWait:o,headerTextColorFinish:o,headerTextColorError:f,descriptionTextColorProcess:b,descriptionTextColorWait:o,descriptionTextColorFinish:o,descriptionTextColorError:f})}const Te={common:pe,self:Ne},Pe=l("steps",`
 width: 100%;
 display: flex;
`,[l("step",`
 position: relative;
 display: flex;
 flex: 1;
 `,[E("disabled","cursor: not-allowed"),E("clickable",`
 cursor: pointer;
 `),C("&:last-child",[l("step-splitor","display: none;")])]),l("step-splitor",`
 background-color: var(--n-splitor-color);
 margin-top: calc(var(--n-step-header-font-size) / 2);
 height: 1px;
 flex: 1;
 align-self: flex-start;
 margin-left: 12px;
 margin-right: 12px;
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 `),l("step-content","flex: 1;",[l("step-content-header",`
 color: var(--n-header-text-color);
 margin-top: calc(var(--n-indicator-size) / 2 - var(--n-step-header-font-size) / 2);
 line-height: var(--n-step-header-font-size);
 font-size: var(--n-step-header-font-size);
 position: relative;
 display: flex;
 font-weight: var(--n-step-header-font-weight);
 margin-left: 9px;
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 `,[R("title",`
 white-space: nowrap;
 flex: 0;
 `)]),R("description",`
 color: var(--n-description-text-color);
 margin-top: 12px;
 margin-left: 9px;
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 `)]),l("step-indicator",`
 background-color: var(--n-indicator-color);
 box-shadow: 0 0 0 1px var(--n-indicator-border-color);
 height: var(--n-indicator-size);
 width: var(--n-indicator-size);
 border-radius: 50%;
 display: flex;
 align-items: center;
 justify-content: center;
 transition:
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
 `,[l("step-indicator-slot",`
 position: relative;
 width: var(--n-indicator-icon-size);
 height: var(--n-indicator-icon-size);
 font-size: var(--n-indicator-icon-size);
 line-height: var(--n-indicator-icon-size);
 `,[R("index",`
 display: inline-block;
 text-align: center;
 position: absolute;
 left: 0;
 top: 0;
 white-space: nowrap;
 font-size: var(--n-indicator-index-font-size);
 width: var(--n-indicator-icon-size);
 height: var(--n-indicator-icon-size);
 line-height: var(--n-indicator-icon-size);
 color: var(--n-indicator-text-color);
 transition: color .3s var(--n-bezier);
 `,[j()]),l("icon",`
 color: var(--n-indicator-text-color);
 transition: color .3s var(--n-bezier);
 `,[j()]),l("base-icon",`
 color: var(--n-indicator-text-color);
 transition: color .3s var(--n-bezier);
 `,[j()])])]),E("vertical","flex-direction: column;",[q("show-description",[C(">",[l("step","padding-bottom: 8px;")])]),C(">",[l("step","margin-bottom: 16px;",[C("&:last-child","margin-bottom: 0;"),C(">",[l("step-indicator",[C(">",[l("step-splitor",`
 position: absolute;
 bottom: -8px;
 width: 1px;
 margin: 0 !important;
 left: calc(var(--n-indicator-size) / 2);
 height: calc(100% - var(--n-indicator-size));
 `)])]),l("step-content",[R("description","margin-top: 8px;")])])])])]),E("content-bottom",[q("vertical",[C(">",[l("step","flex-direction: column",[C(">",[l("step-line","display: flex;",[C(">",[l("step-splitor",`
 margin-top: 0;
 align-self: center;
 `)])])]),C(">",[l("step-content","margin-top: calc(var(--n-indicator-size) / 2 - var(--n-step-header-font-size) / 2);",[l("step-content-header",`
 margin-left: 0;
 `),l("step-content__description",`
 margin-left: 0;
 `)])])])])])])]);function $e(t,c){return typeof t!="object"||t===null||Array.isArray(t)?null:(t.props||(t.props={}),t.props.internalIndex=c+1,t)}function Fe(t){return t.map((c,i)=>$e(c,i))}const Ee=Object.assign(Object.assign({},L.props),{current:Number,status:{type:String,default:"process"},size:{type:String,default:"medium"},vertical:Boolean,contentPlacement:{type:String,default:"right"},"onUpdate:current":[Function,Array],onUpdateCurrent:[Function,Array]}),J=me("n-steps"),Re=M({name:"Steps",props:Ee,slots:Object,setup(t,{slots:c}){const{mergedClsPrefixRef:i,mergedRtlRef:o}=G(t),p=ue("Steps",o,i),f=L("Steps","-steps",Pe,Te,t,i);return ae(J,{props:t,mergedThemeRef:f,mergedClsPrefixRef:i,stepsSlots:c}),{mergedClsPrefix:i,rtlEnabled:p}},render(){const{mergedClsPrefix:t}=this;return m("div",{class:[`${t}-steps`,this.rtlEnabled&&`${t}-steps--rtl`,this.vertical&&`${t}-steps--vertical`,this.contentPlacement==="bottom"&&`${t}-steps--content-bottom`]},Fe(he(be(this))))}}),_e={status:String,title:String,description:String,disabled:Boolean,internalIndex:{type:Number,default:0}},U=M({name:"Step",props:_e,slots:Object,setup(t){const c=le(J,null);c||ve("step","`n-step` must be placed inside `n-steps`.");const{inlineThemeDisabled:i}=G(),{props:o,mergedThemeRef:p,mergedClsPrefixRef:f,stepsSlots:v}=c,b=O(o,"vertical"),d=O(o,"contentPlacement"),S=T(()=>{const{status:r}=t;if(r)return r;{const{internalIndex:e}=t,{current:u}=o;if(u===void 0)return"process";if(e<u)return"finish";if(e===u)return o.status||"process";if(e>u)return"wait"}return"process"}),y=T(()=>{const{value:r}=S,{size:e}=o,{common:{cubicBezierEaseInOut:u},self:{stepHeaderFontWeight:Q,[z("stepHeaderFontSize",e)]:X,[z("indicatorIndexFontSize",e)]:Y,[z("indicatorSize",e)]:Z,[z("indicatorIconSize",e)]:ee,[z("indicatorTextColor",r)]:te,[z("indicatorBorderColor",r)]:oe,[z("headerTextColor",r)]:re,[z("splitorColor",r)]:se,[z("indicatorColor",r)]:ie,[z("descriptionTextColor",r)]:ne}}=p.value;return{"--n-bezier":u,"--n-description-text-color":ne,"--n-header-text-color":re,"--n-indicator-border-color":oe,"--n-indicator-color":ie,"--n-indicator-icon-size":ee,"--n-indicator-index-font-size":Y,"--n-indicator-size":Z,"--n-indicator-text-color":te,"--n-splitor-color":se,"--n-step-header-font-size":X,"--n-step-header-font-weight":Q}}),h=i?ge("step",T(()=>{const{value:r}=S,{size:e}=o;return`${r[0]}${e[0]}`}),y,o):void 0,x=T(()=>{if(t.disabled)return;const{onUpdateCurrent:r,"onUpdate:current":e}=o;return r||e?()=>{r&&D(r,t.internalIndex),e&&D(e,t.internalIndex)}:void 0});return{stepsSlots:v,mergedClsPrefix:f,vertical:b,mergedStatus:S,handleStepClick:x,cssVars:i?void 0:y,themeClass:h?.themeClass,onRender:h?.onRender,contentPlacement:d}},render(){const{mergedClsPrefix:t,onRender:c,handleStepClick:i,disabled:o,contentPlacement:p,vertical:f}=this,v=A(this.$slots.default,h=>{const x=h||this.description;return x?m("div",{class:`${t}-step-content__description`},x):null}),b=m("div",{class:`${t}-step-splitor`}),d=m("div",{class:`${t}-step-indicator`,key:p},m("div",{class:`${t}-step-indicator-slot`},m(fe,null,{default:()=>A(this.$slots.icon,h=>{const{mergedStatus:x,stepsSlots:r}=this;return x==="finish"||x==="error"?x==="finish"?m(K,{clsPrefix:t,key:"finish"},{default:()=>W(r["finish-icon"],()=>[m(ze,null)])}):x==="error"?m(K,{clsPrefix:t,key:"error"},{default:()=>W(r["error-icon"],()=>[m(xe,null)])}):null:h||m("div",{key:this.internalIndex,class:`${t}-step-indicator-slot__index`},this.internalIndex)})})),f?b:null),S=m("div",{class:`${t}-step-content`},m("div",{class:`${t}-step-content-header`},m("div",{class:`${t}-step-content-header__title`},W(this.$slots.title,()=>[this.title])),!f&&p==="right"?b:null),v);let y;return!f&&p==="bottom"?y=m(H,null,m("div",{class:`${t}-step-line`},d,b),S):y=m(H,null,d,S),c?.(),m("div",{class:[`${t}-step`,o&&`${t}-step--disabled`,!o&&i&&`${t}-step--clickable`,this.themeClass,v&&`${t}-step--show-description`,`${t}-step--${this.mergedStatus}-status`],style:this.cssVars,onClick:i},y)}}),Be={class:"install-page"},je={class:"install-container"},We={class:"install-card"},Ue={class:"step-content"},Me={key:0,class:"step-panel"},He={class:"check-list"},Oe={class:"icon"},Ve={key:1,class:"step-panel"},qe={key:2,class:"step-panel success-panel"},Ae={class:"info-box"},De=M({__name:"install",setup(t){const c=Se(),i=k(1),o=k(!0),p=k(!1),f=k(!1),v=k(!1),b=k(""),d=k({email:"",nickname:"",password:"",confirmPassword:"",siteName:""}),S={email:[{required:!0,message:"请输入邮箱",trigger:"blur"},{type:"email",message:"请输入正确的邮箱格式",trigger:"blur"}],nickname:{required:!0,message:"请输入昵称",trigger:"blur"},password:[{required:!0,message:"请输入密码",trigger:"blur"},{min:6,max:50,message:"密码长度需在6-50个字符之间",trigger:"blur"}],confirmPassword:{required:!0,message:"请再次输入密码",trigger:"blur",validator:(r,e)=>e!==d.value.password?new Error("两次输入的密码不一致"):!0}},y=async()=>{o.value=!0;try{const r=await $fetch("/api/install/status");if(p.value=!0,r.data?.isInstalled){c.info("系统已安装，正在跳转..."),setTimeout(()=>V("/"),500);return}v.value=!0}catch{p.value=!0,c.error("数据库连接失败，请检查配置")}finally{o.value=!1}},h=async()=>{f.value=!0;try{const r=await $fetch("/api/install/setup",{method:"POST",body:d.value});r.data&&(b.value=r.data.app?.appId||"",i.value=3,localStorage.setItem("platform_installed","true"))}catch(r){c.error(r.data?.statusMessage||"安装失败")}finally{f.value=!1}},x=()=>{V("/admin/login")};return de(()=>{y()}),(r,e)=>(F(),P("div",Be,[s("div",je,[s("div",We,[e[19]||(e[19]=s("div",{class:"logo-section"},[s("div",{class:"logo"},"💬"),s("h1",null,"评论平台安装向导"),s("p",{class:"subtitle"},"欢迎使用评论开放平台，请完成以下配置")],-1)),n(a(Re),{current:i.value,class:"steps"},{default:g(()=>[n(a(U),{title:"检查环境"}),n(a(U),{title:"管理员设置"}),n(a(U),{title:"完成安装"})]),_:1},8,["current"]),s("div",Ue,[i.value===1?(F(),P("div",Me,[e[9]||(e[9]=s("h3",null,"环境检查",-1)),s("div",He,[s("div",{class:ce(["check-item",{success:v.value,error:!v.value&&p.value}])},[s("span",Oe,$(v.value?"✓":p.value?"✗":"..."),1),e[7]||(e[7]=s("span",null,"数据库连接",-1))],2),e[8]||(e[8]=s("div",{class:"check-item success"},[s("span",{class:"icon"},"✓"),s("span",null,"运行环境")],-1))]),n(a(_),{type:"primary",block:"",size:"large",loading:o.value,disabled:!v.value,onClick:e[0]||(e[0]=u=>i.value=2)},{default:g(()=>[w($(v.value?"下一步":"检查中..."),1)]),_:1},8,["loading","disabled"])])):B("",!0),i.value===2?(F(),P("div",Ve,[n(a(ye),{ref:"formRef",model:d.value,rules:S,"label-placement":"top"},{default:g(()=>[n(a(I),{label:"管理员邮箱",path:"email"},{default:g(()=>[n(a(N),{value:d.value.email,"onUpdate:value":e[1]||(e[1]=u=>d.value.email=u),type:"email",placeholder:"admin@example.com"},null,8,["value"])]),_:1}),n(a(I),{label:"管理员昵称",path:"nickname"},{default:g(()=>[n(a(N),{value:d.value.nickname,"onUpdate:value":e[2]||(e[2]=u=>d.value.nickname=u),placeholder:"管理员"},null,8,["value"])]),_:1}),n(a(I),{label:"管理员密码",path:"password"},{default:g(()=>[n(a(N),{value:d.value.password,"onUpdate:value":e[3]||(e[3]=u=>d.value.password=u),type:"password",placeholder:"请输入密码（6-50位）"},null,8,["value"])]),_:1}),n(a(I),{label:"确认密码",path:"confirmPassword"},{default:g(()=>[n(a(N),{value:d.value.confirmPassword,"onUpdate:value":e[4]||(e[4]=u=>d.value.confirmPassword=u),type:"password",placeholder:"请再次输入密码"},null,8,["value"])]),_:1}),n(a(I),{label:"站点名称",path:"siteName"},{default:g(()=>[n(a(N),{value:d.value.siteName,"onUpdate:value":e[5]||(e[5]=u=>d.value.siteName=u),placeholder:"我的评论平台"},null,8,["value"])]),_:1})]),_:1},8,["model"]),n(a(Ce),null,{default:g(()=>[n(a(_),{onClick:e[6]||(e[6]=u=>i.value=1)},{default:g(()=>[...e[10]||(e[10]=[w("上一步",-1)])]),_:1}),n(a(_),{type:"primary",loading:f.value,onClick:h},{default:g(()=>[...e[11]||(e[11]=[w(" 开始安装 ",-1)])]),_:1},8,["loading"])]),_:1})])):B("",!0),i.value===3?(F(),P("div",qe,[e[16]||(e[16]=s("div",{class:"success-icon"},"🎉",-1)),e[17]||(e[17]=s("h3",null,"安装完成！",-1)),e[18]||(e[18]=s("p",null,"您的评论平台已成功安装",-1)),s("div",Ae,[s("p",null,[e[12]||(e[12]=s("strong",null,"管理员账号：",-1)),w($(d.value.email),1)]),s("p",null,[e[13]||(e[13]=s("strong",null,"默认应用ID：",-1)),w($(b.value),1)])]),n(a(we),{type:"warning",class:"mt-4"},{default:g(()=>[...e[14]||(e[14]=[w(" 请妥善保管您的管理员账号和密码 ",-1)])]),_:1}),n(a(_),{type:"primary",block:"",size:"large",class:"mt-4",onClick:x},{default:g(()=>[...e[15]||(e[15]=[w(" 进入管理后台 ",-1)])]),_:1})])):B("",!0)])])])]))}}),st=ke(De,[["__scopeId","data-v-c40f5318"]]);export{st as default};
