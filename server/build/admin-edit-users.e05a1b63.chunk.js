"use strict";(self.webpackChunkserver=self.webpackChunkserver||[]).push([[4263],{86294:(V,v,e)=>{e.r(v),e.d(v,{default:()=>De});var t=e(53547),s=e(68547),o=e(49656),p=e(96486),I=e(92699),l=e(87462),C=e(15861),i=e(87757),P=e.n(i),c=e(97132),y=e(45697),D=e.n(y),Y=e(78718),S=e.n(Y),F=e(27361),Z=e.n(F),G=e(57557),z=e.n(G),U=e(23724),x=e(80831),E=e(94117),M=e(64459),u=e(39272),L=e(35395),B=e(56156),X=e(33483),A=e(80117),n=e(9524),a=e(87760),r=e.n(a),te=e(22754),k=e.n(te),_=e(58836),ne=e(63955),re=(R,W,m)=>new Promise((H,d)=>{var Q=K=>{try{b(m.next(K))}catch(J){d(J)}},N=K=>{try{b(m.throw(K))}catch(J){d(J)}},b=K=>K.done?H(K.value):Promise.resolve(K.value).then(Q,N);b((m=m.apply(R,W)).next())});const fe=R=>re(void 0,null,function*(){const{data:W}=yield ne.be.get(`/admin/users/${R}`);return W.data}),ge=(R,W)=>re(void 0,null,function*(){const{data:m}=yield ne.be.put(`/admin/users/${R}`,W);return m.data}),ve=[[{intlLabel:{id:"Auth.form.firstname.label",defaultMessage:"First name"},name:"firstname",placeholder:{id:"Auth.form.firstname.placeholder",defaultMessage:"e.g. Kai"},type:"text",size:{col:6,xs:12},required:!0},{intlLabel:{id:"Auth.form.lastname.label",defaultMessage:"Last name"},name:"lastname",placeholder:{id:"Auth.form.lastname.placeholder",defaultMessage:"e.g. Doe"},type:"text",size:{col:6,xs:12}}],[{intlLabel:{id:"Auth.form.email.label",defaultMessage:"Email"},name:"email",placeholder:{id:"Auth.form.email.placeholder",defaultMessage:"e.g. kai.doe@strapi.io"},type:"email",size:{col:6,xs:12},required:!0},{intlLabel:{id:"Auth.form.username.label",defaultMessage:"Username"},name:"username",placeholder:{id:"Auth.form.username.placeholder",defaultMessage:"e.g. Kai_Doe"},type:"email",size:{col:6,xs:12}}],[{intlLabel:{id:"global.password",defaultMessage:"Password"},name:"password",type:"password",size:{col:6,xs:12}},{intlLabel:{id:"Auth.form.confirmPassword.label",defaultMessage:"Password confirmation"},name:"confirmPassword",type:"password",size:{col:6,xs:12}}],[{intlLabel:{id:"Auth.form.active.label",defaultMessage:"Active"},name:"isActive",type:"bool",size:{col:6,xs:12}}]];var Pe=e(8278),Me=e(7676),Oe=e(25108),he=function(){return window&&window.strapi&&window.strapi.isEE?e(77791).Z:e(26010).Z}(),oe=["email","firstname","lastname","username","isActive","roles"],le=function(W){var m=W.canUpdate,H=(0,c.useIntl)(),d=H.formatMessage,Q=(0,o.useRouteMatch)("/settings/users/:id"),N=Q.params.id,b=(0,o.useHistory)(),K=b.push,J=(0,s.useAppInfos)(),Le=J.setUserDisplayName,ae=(0,s.useNotification)(),ie=(0,s.useOverlayBlocker)(),Ae=ie.lockApp,Te=ie.unlockApp;(0,s.useFocusWhenNavigate)();var de=(0,U.useQuery)(["user",N],function(){return fe(N)},{retry:!1,keepPreviousData:!1,staleTime:1e3*20,onError:function(f){var g=f.response.status;g===403&&(ae({type:"info",message:{id:"notification.permission.not-allowed-read",defaultMessage:"You are not allowed to see this document"}}),K("/")),Oe.log(f.response.status)}}),Ie=de.status,T=de.data,Ce=function(){var O=(0,C.Z)(P().mark(function f(g,j){var w,ee,$,se,me;return P().wrap(function(h){for(;;)switch(h.prev=h.next){case 0:return Ae(),h.prev=1,h.next=4,ge(N,z()(g,"confirmPassword"));case 4:w=h.sent,ae({type:"success",message:d({id:"notification.success.saved",defaultMessage:"Saved"})}),ee=s.auth.getUserInfo(),N.toString()===ee.id.toString()&&(s.auth.setUserInfo(w),$=Z()(g,"username")||(0,_.Pp)(g.firstname,g.lastname),Le($)),j.setValues(S()(g,oe)),h.next=17;break;case 11:h.prev=11,h.t0=h.catch(1),se=(0,_.Iz)(h.t0.response.data),me=Object.keys(se).reduce(function(pe,Ee){return pe[Ee]=se[Ee].id,pe},{}),j.setErrors(me),ae({type:"warning",message:Z()(h.t0,"response.data.message","notification.error")});case 17:Te();case 18:case"end":return h.stop()}},f,null,[[1,11]])}));return function(g,j){return O.apply(this,arguments)}}(),ce=Ie!=="success",Ue=ce?{id:"app.containers.Users.EditPage.header.label-loading",defaultMessage:"Edit user"}:{id:"app.containers.Users.EditPage.header.label",defaultMessage:"Edit {name}"},q=Object.keys(S()(T,oe)).reduce(function(O,f){return f==="roles"?(O[f]=((T==null?void 0:T.roles)||[]).map(function(g){var j=g.id;return j}),O):(O[f]=T==null?void 0:T[f],O)},{}),Be=q.username||(0,_.Pp)(q.firstname,q.lastname),ue=d(Ue,{name:Be});return ce?t.createElement(A.Main,{"aria-busy":"true"},t.createElement(s.SettingsPageTitle,{name:"Users"}),t.createElement(L.HeaderLayout,{primaryAction:t.createElement(M.Button,{disabled:!0,startIcon:t.createElement(k(),null),type:"button",size:"L"},d({id:"global.save",defaultMessage:"Save"})),title:ue,navigationAction:t.createElement(B.Link,{startIcon:t.createElement(r(),null),to:"/settings/users?pageSize=10&page=1&sort=firstname"},d({id:"global.back",defaultMessage:"Back"}))}),t.createElement(L.ContentLayout,null,t.createElement(s.LoadingIndicatorPage,null))):t.createElement(A.Main,null,t.createElement(s.SettingsPageTitle,{name:"Users"}),t.createElement(x.Formik,{onSubmit:Ce,initialValues:q,validateOnChange:!1,validationSchema:Pe.YM},function(O){var f=O.errors,g=O.values,j=O.handleChange,w=O.isSubmitting;return t.createElement(s.Form,null,t.createElement(L.HeaderLayout,{primaryAction:t.createElement(M.Button,{disabled:w||!m,startIcon:t.createElement(k(),null),loading:w,type:"submit",size:"L"},d({id:"global.save",defaultMessage:"Save"})),title:ue,navigationAction:t.createElement(B.Link,{startIcon:t.createElement(r(),null),to:"/settings/users?pageSize=10&page=1&sort=firstname"},d({id:"global.back",defaultMessage:"Back"}))}),t.createElement(L.ContentLayout,null,(T==null?void 0:T.registrationToken)&&t.createElement(E.Box,{paddingBottom:6},t.createElement(he,{registrationToken:T.registrationToken})),t.createElement(n.Stack,{spacing:7},t.createElement(E.Box,{background:"neutral0",hasRadius:!0,shadow:"filterShadow",paddingTop:6,paddingBottom:6,paddingLeft:7,paddingRight:7},t.createElement(n.Stack,{spacing:4},t.createElement(X.Typography,{variant:"delta",as:"h2"},d({id:"app.components.Users.ModalCreateBody.block-title.details",defaultMessage:"Details"})),t.createElement(u.Grid,{gap:5},ve.map(function(ee){return ee.map(function($){return t.createElement(u.GridItem,(0,l.Z)({key:$.name},$.size),t.createElement(s.GenericInput,(0,l.Z)({},$,{disabled:!m,error:f[$.name],onChange:j,value:g[$.name]||""})))})})))),t.createElement(E.Box,{background:"neutral0",hasRadius:!0,shadow:"filterShadow",paddingTop:6,paddingBottom:6,paddingLeft:7,paddingRight:7},t.createElement(n.Stack,{spacing:4},t.createElement(X.Typography,{variant:"delta",as:"h2"},d({id:"global.roles",defaultMessage:"User's role"})),t.createElement(u.Grid,{gap:5},t.createElement(u.GridItem,{col:6,xs:12},t.createElement(Me.Z,{disabled:!m,error:f.roles,onChange:j,value:g.roles}))))))))}))};le.propTypes={canUpdate:D().bool.isRequired};const ye=le,De=()=>{const R=(0,s.useNotification)(),W=(0,t.useMemo)(()=>({read:I.Z.settings.users.read,update:I.Z.settings.users.update}),[]),{isLoading:m,allowedActions:{canRead:H,canUpdate:d}}=(0,s.useRBAC)(W),{state:Q}=(0,o.useLocation)(),N=(0,p.get)(Q,"from","/");return(0,t.useEffect)(()=>{m||!H&&!d&&R({type:"info",message:{id:"notification.permission.not-allowed-read",defaultMessage:"You are not allowed to see this document"}})},[m,H,d,R]),m?t.createElement(s.LoadingIndicatorPage,null):!H&&!d?t.createElement(o.Redirect,{to:N}):t.createElement(ye,{canUpdate:d})}},53073:(V,v,e)=>{e.d(v,{Z:()=>Z});var t=e(53547),s=e(45697),o=e.n(s),p=e(49549),I=e.n(p),l=e(68547),C=e.n(l),i=e(54279),P=e.n(i),c=e(74855),y=e.n(c),D=e(97132),Y=e.n(D);const S=()=>t.createElement("svg",{xmlns:"http://www.w3.org/2000/svg"},t.createElement("text",{transform:"translate(-23 -9)",fill:"#4B515A",fillRule:"evenodd",fontSize:"32",fontFamily:"AppleColorEmoji, Apple Color Emoji"},t.createElement("tspan",{x:"23",y:"36"},"\u2709\uFE0F"))),F=({children:G,target:z})=>{const U=(0,l.useNotification)(),{formatMessage:x}=(0,D.useIntl)(),E=()=>{U({type:"info",message:{id:"notification.link-copied"}})},M=x({id:"app.component.CopyToClipboard.label",defaultMessage:"Copy to clipboard"});return t.createElement(l.ContentBox,{endAction:t.createElement(c.CopyToClipboard,{onCopy:E,text:z},t.createElement(p.IconButton,{label:M,noBorder:!0,icon:t.createElement(P(),null)})),title:z,titleEllipsis:!0,subtitle:G,icon:t.createElement(S,null),iconBackground:"neutral100"})};F.propTypes={children:o().oneOfType([o().element,o().string]).isRequired,target:o().string.isRequired};const Z=F},26010:(V,v,e)=>{e.d(v,{Z:()=>P});var t=e(53547),s=e(97132),o=e.n(s),p=e(45697),I=e.n(p),l=e(71242),C=e(53073);const i=({registrationToken:c})=>{const{formatMessage:y}=(0,s.useIntl)(),D=`${window.location.origin}${l.Z}auth/register?registrationToken=${c}`;return t.createElement(C.Z,{target:D},y({id:"app.components.Users.MagicLink.connect",defaultMessage:"Copy and share this link to give access to this user"}))};i.defaultProps={registrationToken:""},i.propTypes={registrationToken:I().string};const P=i},7676:(V,v,e)=>{e.d(v,{Z:()=>x});var t=e(53547),s=e(45697),o=e.n(s),p=e(97132),I=e.n(p),l=e(2632),C=e.n(l),i=e(23724),P=e.n(i),c=e(78384),y=e(79386),D=e.n(y),Y=e(63955),S=(E,M,u)=>new Promise((L,B)=>{var X=a=>{try{n(u.next(a))}catch(r){B(r)}},A=a=>{try{n(u.throw(a))}catch(r){B(r)}},n=a=>a.done?L(a.value):Promise.resolve(a.value).then(X,A);n((u=u.apply(E,M)).next())});const F=c.keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
`,Z=c.default.div`
  animation: ${F} 2s infinite linear;
`,G=()=>t.createElement(Z,null,t.createElement(D(),null)),z=()=>S(void 0,null,function*(){const{data:E}=yield Y.be.get("/admin/roles");return E.data}),U=({disabled:E,error:M,onChange:u,value:L})=>{const{status:B,data:X}=(0,i.useQuery)(["roles"],z,{staleTime:5e4}),{formatMessage:A}=(0,p.useIntl)(),n=M?A({id:M,defaultMessage:M}):"",a=A({id:"app.components.Users.ModalCreateBody.block-title.roles",defaultMessage:"User's roles"}),r=A({id:"app.components.Users.ModalCreateBody.block-title.roles.description",defaultMessage:"A user can have one or several roles"}),te=A({id:"app.components.Select.placeholder",defaultMessage:"Select"}),k=B==="loading"?t.createElement(G,null):void 0;return t.createElement(l.Select,{id:"roles",disabled:E,error:n,hint:r,label:a,name:"roles",onChange:_=>{u({target:{name:"roles",value:_}})},placeholder:te,multi:!0,startIcon:k,value:L,withTags:!0,required:!0},(X||[]).map(_=>t.createElement(l.Option,{key:_.id,value:_.id},_.name)))};U.defaultProps={disabled:!1,error:void 0},U.propTypes={disabled:o().bool,error:o().string,onChange:o().func.isRequired,value:o().array.isRequired};const x=U},8278:(V,v,e)=>{e.d(v,{YM:()=>A,Rw:()=>S});var t=e(53209),s=e(68547),o=Object.defineProperty,p=Object.defineProperties,I=Object.getOwnPropertyDescriptors,l=Object.getOwnPropertySymbols,C=Object.prototype.hasOwnProperty,i=Object.prototype.propertyIsEnumerable,P=(n,a,r)=>a in n?o(n,a,{enumerable:!0,configurable:!0,writable:!0,value:r}):n[a]=r,c=(n,a)=>{for(var r in a||(a={}))C.call(a,r)&&P(n,r,a[r]);if(l)for(var r of l(a))i.call(a,r)&&P(n,r,a[r]);return n},y=(n,a)=>p(n,I(a));const D={firstname:t.nK().required(s.translatedErrors.required),lastname:t.nK(),email:t.Z_().email(s.translatedErrors.email).lowercase().required(s.translatedErrors.required),username:t.Z_().nullable(),password:t.Z_().min(8,s.translatedErrors.minLength).matches(/[a-z]/,"components.Input.error.contain.lowercase").matches(/[A-Z]/,"components.Input.error.contain.uppercase").matches(/\d/,"components.Input.error.contain.number"),confirmPassword:t.Z_().min(8,s.translatedErrors.minLength).oneOf([t.iH("password"),null],"components.Input.error.password.noMatch").when("password",(n,a)=>n?a.required(s.translatedErrors.required):a)},S=y(c({},D),{currentPassword:t.Z_().when(["password","confirmPassword"],(n,a,r)=>n||a?r.required(s.translatedErrors.required):r),preferedLanguage:t.Z_().nullable()}),Z={roles:t.IX().min(1,s.translatedErrors.required).required(s.translatedErrors.required)};var G=Object.defineProperty,z=Object.defineProperties,U=Object.getOwnPropertyDescriptors,x=Object.getOwnPropertySymbols,E=Object.prototype.hasOwnProperty,M=Object.prototype.propertyIsEnumerable,u=(n,a,r)=>a in n?G(n,a,{enumerable:!0,configurable:!0,writable:!0,value:r}):n[a]=r,L=(n,a)=>{for(var r in a||(a={}))E.call(a,r)&&u(n,r,a[r]);if(x)for(var r of x(a))M.call(a,r)&&u(n,r,a[r]);return n},B=(n,a)=>z(n,U(a));const A=t.Ry().shape(L(B(L({},D),{isActive:t.Xg()}),Z))},77791:(V,v,e)=>{e.d(v,{Z:()=>P});var t=e(53547),s=e(97132),o=e.n(s),p=e(45697),I=e.n(p),l=e(71242),C=e(53073);const i=({registrationToken:c})=>{const{formatMessage:y}=(0,s.useIntl)();return c?t.createElement(C.Z,{target:`${window.location.origin}${l.Z}auth/register?registrationToken=${c}`},y({id:"app.components.Users.MagicLink.connect",defaultMessage:"Copy and share this link to give access to this user"})):t.createElement(C.Z,{target:`${window.location.origin}${l.Z}auth/login`},y({id:"app.components.Users.MagicLink.connect.sso",defaultMessage:"Send this link to the user, the first login can be made via a SSO provider."}))};i.defaultProps={registrationToken:""},i.propTypes={registrationToken:I().string};const P=i}}]);
