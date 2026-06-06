import{e as V,y as v,J as O,p as S,B as j,m as C,I,f as D,c as y,a as m,t as z,l as c,b,w as _,o as f,d as N,F as H,r as M,k as B,x as T,H as A}from"./BM6ME39p.js";import{d as E,e as $,a as k,b as w,s as W,k as F,h as L,l as q,v as K,m as J,B as x}from"./XdxhtZuh.js";import{b as U,p as X}from"./DS6xNQHv.js";import{u as Y}from"./Dd8xCdJF.js";import{N as G}from"./JY-igkGu.js";import{N as P}from"./CYgXTHAj.js";import{u as Q}from"./DJuM8oin.js";import{N as Z}from"./DlF4cN_e.js";import{_ as ee}from"./DlAUqK2U.js";import"./DPqrGCD9.js";function te(n){const{opacityDisabled:o,heightTiny:t,heightSmall:s,heightMedium:d,heightLarge:r,heightHuge:u,primaryColor:l,fontSize:a}=n;return{fontSize:a,textColor:l,sizeTiny:t,sizeSmall:s,sizeMedium:d,sizeLarge:r,sizeHuge:u,color:l,opacitySpinning:o}}const se={common:E,self:te},ne=$([$("@keyframes spin-rotate",`
 from {
 transform: rotate(0);
 }
 to {
 transform: rotate(360deg);
 }
 `),k("spin-container",`
 position: relative;
 `,[k("spin-body",`
 position: absolute;
 top: 50%;
 left: 50%;
 transform: translateX(-50%) translateY(-50%);
 `,[U()])]),k("spin-body",`
 display: inline-flex;
 align-items: center;
 justify-content: center;
 flex-direction: column;
 `),k("spin",`
 display: inline-flex;
 height: var(--n-size);
 width: var(--n-size);
 font-size: var(--n-size);
 color: var(--n-color);
 `,[w("rotate",`
 animation: spin-rotate 2s linear infinite;
 `)]),k("spin-description",`
 display: inline-block;
 font-size: var(--n-font-size);
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 margin-top: 8px;
 `),k("spin-content",`
 opacity: 1;
 transition: opacity .3s var(--n-bezier);
 pointer-events: all;
 `,[w("spinning",`
 user-select: none;
 -webkit-user-select: none;
 pointer-events: none;
 opacity: var(--n-opacity-spinning);
 `)])]),ae={small:20,medium:18,large:16},ie=Object.assign(Object.assign(Object.assign({},L.props),{contentClass:String,contentStyle:[Object,String],description:String,size:{type:[String,Number],default:"medium"},show:{type:Boolean,default:!0},rotate:{type:Boolean,default:!0},spinning:{type:Boolean,validator:()=>!0,default:void 0},delay:Number}),K),oe=V({name:"Spin",props:ie,slots:Object,setup(n){const{mergedClsPrefixRef:o,inlineThemeDisabled:t}=F(n),s=L("Spin","-spin",ne,se,n,o),d=S(()=>{const{size:a}=n,{common:{cubicBezierEaseInOut:h},self:g}=s.value,{opacitySpinning:i,color:e,textColor:p}=g,R=typeof a=="number"?X(a):g[J("size",a)];return{"--n-bezier":h,"--n-opacity-spinning":i,"--n-size":R,"--n-color":e,"--n-text-color":p}}),r=t?q("spin",S(()=>{const{size:a}=n;return typeof a=="number"?String(a):a[0]}),d,n):void 0,u=Y(n,["spinning","show"]),l=C(!1);return j(a=>{let h;if(u.value){const{delay:g}=n;if(g){h=window.setTimeout(()=>{l.value=!0},g),a(()=>{clearTimeout(h)});return}}l.value=u.value}),{mergedClsPrefix:o,active:l,mergedStrokeWidth:S(()=>{const{strokeWidth:a}=n;if(a!==void 0)return a;const{size:h}=n;return ae[typeof h=="number"?"medium":h]}),cssVars:t?void 0:d,themeClass:r?.themeClass,onRender:r?.onRender}},render(){var n,o;const{$slots:t,mergedClsPrefix:s,description:d}=this,r=t.icon&&this.rotate,u=(d||t.description)&&v("div",{class:`${s}-spin-description`},d||((n=t.description)===null||n===void 0?void 0:n.call(t))),l=t.icon?v("div",{class:[`${s}-spin-body`,this.themeClass]},v("div",{class:[`${s}-spin`,r&&`${s}-spin--rotate`],style:t.default?"":this.cssVars},t.icon()),u):v("div",{class:[`${s}-spin-body`,this.themeClass]},v(W,{clsPrefix:s,style:t.default?"":this.cssVars,stroke:this.stroke,"stroke-width":this.mergedStrokeWidth,radius:this.radius,scale:this.scale,class:`${s}-spin`}),u);return(o=this.onRender)===null||o===void 0||o.call(this),t.default?v("div",{class:[`${s}-spin-container`,this.themeClass],style:this.cssVars},v("div",{class:[`${s}-spin-content`,this.active&&`${s}-spin-content--spinning`,this.contentClass],style:this.contentStyle},t),v(O,{name:"fade-in-transition"},{default:()=>this.active?l:null})):l}}),re={class:"dashboard-page"},le={class:"dashboard-header"},ce={class:"header-right"},de={class:"user-name"},ue={class:"dashboard-content"},pe={class:"total"},me={key:0,class:"loading"},he={key:1,class:"empty"},ve={key:2,class:"comment-list"},fe={class:"comment-header"},ge={class:"app-name"},ye={class:"chapter"},be={class:"time"},_e={class:"comment-content"},ze={key:3,class:"pagination"},ke=V({__name:"dashboard",setup(n){const o=I();Q();const t=C([]),s=C(!1),d=C(1),r=C(0),u=C(0),l=async()=>{s.value=!0;try{const{token:i}=o,e=await $fetch("/api/user/comments",{headers:{Authorization:`Bearer ${i.value}`},query:{page:d.value,limit:10}});e.data&&(t.value=e.data.list,r.value=e.data.pagination.total,u.value=e.data.pagination.totalPages)}catch(i){console.error("Failed to load comments:",i)}finally{s.value=!1}},a=i=>new Date(i).toLocaleString("zh-CN"),h=(i,e)=>i.length>e?i.slice(0,e)+"...":i,g=()=>{o.logout(),T("/login")};return D(()=>{l()}),(i,e)=>(f(),y("div",re,[m("div",le,[e[4]||(e[4]=m("div",{class:"logo"},"💬",-1)),m("div",ce,[m("span",de,z(c(o).user?.nickname),1),b(c(x),{size:"small",onClick:g},{default:_(()=>[...e[3]||(e[3]=[N("退出",-1)])]),_:1})])]),m("div",ue,[b(c(P),{title:"我的评论",class:"comments-card"},{"header-extra":_(()=>[m("span",pe,"共 "+z(r.value)+" 条",1)]),default:_(()=>[s.value?(f(),y("div",me,[b(c(oe),{size:"large"})])):t.value.length===0?(f(),y("div",he," 暂无评论记录 ")):(f(),y("div",ve,[(f(!0),y(H,null,M(t.value,p=>(f(),y("div",{key:p.id,class:"comment-item"},[m("div",fe,[m("span",ge,z(p.appName),1),m("span",ye,z(p.chapterName),1),m("span",be,z(a(p.createdAt)),1)]),m("p",_e,z(h(p.content,150)),1)]))),128))])),u.value>1?(f(),y("div",ze,[b(c(G),{page:d.value,"onUpdate:page":[e[0]||(e[0]=p=>d.value=p),l],"page-count":u.value},null,8,["page","page-count"])])):B("",!0)]),_:1}),b(c(P),{title:"快捷入口",class:"quick-card"},{default:_(()=>[b(c(Z),null,{default:_(()=>[b(c(x),{onClick:e[1]||(e[1]=p=>("navigateTo"in i?i.navigateTo:c(T))("/docs"))},{default:_(()=>[...e[5]||(e[5]=[N("开发者文档",-1)])]),_:1}),c(o).isAdmin?(f(),A(c(x),{key:0,type:"primary",onClick:e[2]||(e[2]=p=>("navigateTo"in i?i.navigateTo:c(T))("/admin"))},{default:_(()=>[...e[6]||(e[6]=[N(" 管理后台 ",-1)])]),_:1})):B("",!0)]),_:1})]),_:1})])]))}}),Le=ee(ke,[["__scopeId","data-v-d6d8a672"]]);export{Le as default};
