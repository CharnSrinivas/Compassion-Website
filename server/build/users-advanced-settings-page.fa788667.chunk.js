/*! For license information please see users-advanced-settings-page.fa788667.chunk.js.LICENSE.txt */
"use strict";(self.webpackChunkserver=self.webpackChunkserver||[]).push([[9460],{86289:(e,t,r)=>{var n=r(95318),a=r(50008);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=n(r(67154)),i=n(r(59713)),u=n(r(48926)),c=function(e,t){if(!t&&e&&e.__esModule)return e;if(null===e||"object"!==a(e)&&"function"!==typeof e)return{default:e};var r=S(t);if(r&&r.has(e))return r.get(e);var n={},o=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var i in e)if("default"!==i&&Object.prototype.hasOwnProperty.call(e,i)){var u=o?Object.getOwnPropertyDescriptor(e,i):null;u&&(u.get||u.set)?Object.defineProperty(n,i,u):n[i]=e[i]}n.default=e,r&&r.set(e,n);return n}(r(53547)),l=r(23724),s=r(97132),d=r(80831),f=r(28936),h=r(67422),p=r(80117),g=r(35395),v=r(64459),m=r(94117),y=r(9524),w=r(2632),b=r(33483),E=r(39272),x=n(r(22754)),L=n(r(94920)),O=r(26270),_=n(r(24497)),T=n(r(79022)),j=r(69416);function S(e){if("function"!==typeof WeakMap)return null;var t=new WeakMap,r=new WeakMap;return(S=function(e){return e?r:t})(e)}function k(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function M(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?k(Object(r),!0).forEach((function(t){(0,i.default)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):k(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function P(){P=function(){return e};var e={},t=Object.prototype,r=t.hasOwnProperty,n="function"==typeof Symbol?Symbol:{},o=n.iterator||"@@iterator",i=n.asyncIterator||"@@asyncIterator",u=n.toStringTag||"@@toStringTag";function c(e,t,r){return Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}),e[t]}try{c({},"")}catch(j){c=function(e,t,r){return e[t]=r}}function l(e,t,r,n){var a=t&&t.prototype instanceof f?t:f,o=Object.create(a.prototype),i=new O(n||[]);return o._invoke=function(e,t,r){var n="suspendedStart";return function(a,o){if("executing"===n)throw new Error("Generator is already running");if("completed"===n){if("throw"===a)throw o;return T()}for(r.method=a,r.arg=o;;){var i=r.delegate;if(i){var u=E(i,r);if(u){if(u===d)continue;return u}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if("suspendedStart"===n)throw n="completed",r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n="executing";var c=s(e,t,r);if("normal"===c.type){if(n=r.done?"completed":"suspendedYield",c.arg===d)continue;return{value:c.arg,done:r.done}}"throw"===c.type&&(n="completed",r.method="throw",r.arg=c.arg)}}}(e,r,i),o}function s(e,t,r){try{return{type:"normal",arg:e.call(t,r)}}catch(j){return{type:"throw",arg:j}}}e.wrap=l;var d={};function f(){}function h(){}function p(){}var g={};c(g,o,(function(){return this}));var v=Object.getPrototypeOf,m=v&&v(v(_([])));m&&m!==t&&r.call(m,o)&&(g=m);var y=p.prototype=f.prototype=Object.create(g);function w(e){["next","throw","return"].forEach((function(t){c(e,t,(function(e){return this._invoke(t,e)}))}))}function b(e,t){function n(o,i,u,c){var l=s(e[o],e,i);if("throw"!==l.type){var d=l.arg,f=d.value;return f&&"object"==a(f)&&r.call(f,"__await")?t.resolve(f.__await).then((function(e){n("next",e,u,c)}),(function(e){n("throw",e,u,c)})):t.resolve(f).then((function(e){d.value=e,u(d)}),(function(e){return n("throw",e,u,c)}))}c(l.arg)}var o;this._invoke=function(e,r){function a(){return new t((function(t,a){n(e,r,t,a)}))}return o=o?o.then(a,a):a()}}function E(e,t){var r=e.iterator[t.method];if(void 0===r){if(t.delegate=null,"throw"===t.method){if(e.iterator.return&&(t.method="return",t.arg=void 0,E(e,t),"throw"===t.method))return d;t.method="throw",t.arg=new TypeError("The iterator does not provide a 'throw' method")}return d}var n=s(r,e.iterator,t.arg);if("throw"===n.type)return t.method="throw",t.arg=n.arg,t.delegate=null,d;var a=n.arg;return a?a.done?(t[e.resultName]=a.value,t.next=e.nextLoc,"return"!==t.method&&(t.method="next",t.arg=void 0),t.delegate=null,d):a:(t.method="throw",t.arg=new TypeError("iterator result is not an object"),t.delegate=null,d)}function x(e){var t={tryLoc:e[0]};1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t)}function L(e){var t=e.completion||{};t.type="normal",delete t.arg,e.completion=t}function O(e){this.tryEntries=[{tryLoc:"root"}],e.forEach(x,this),this.reset(!0)}function _(e){if(e){var t=e[o];if(t)return t.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var n=-1,a=function t(){for(;++n<e.length;)if(r.call(e,n))return t.value=e[n],t.done=!1,t;return t.value=void 0,t.done=!0,t};return a.next=a}}return{next:T}}function T(){return{value:void 0,done:!0}}return h.prototype=p,c(y,"constructor",p),c(p,"constructor",h),h.displayName=c(p,u,"GeneratorFunction"),e.isGeneratorFunction=function(e){var t="function"==typeof e&&e.constructor;return!!t&&(t===h||"GeneratorFunction"===(t.displayName||t.name))},e.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,p):(e.__proto__=p,c(e,u,"GeneratorFunction")),e.prototype=Object.create(y),e},e.awrap=function(e){return{__await:e}},w(b.prototype),c(b.prototype,i,(function(){return this})),e.AsyncIterator=b,e.async=function(t,r,n,a,o){void 0===o&&(o=Promise);var i=new b(l(t,r,n,a),o);return e.isGeneratorFunction(r)?i:i.next().then((function(e){return e.done?e.value:i.next()}))},w(y),c(y,u,"Generator"),c(y,o,(function(){return this})),c(y,"toString",(function(){return"[object Generator]"})),e.keys=function(e){var t=[];for(var r in e)t.push(r);return t.reverse(),function r(){for(;t.length;){var n=t.pop();if(n in e)return r.value=n,r.done=!1,r}return r.done=!0,r}},e.values=_,O.prototype={constructor:O,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(L),!e)for(var t in this)"t"===t.charAt(0)&&r.call(this,t)&&!isNaN(+t.slice(1))&&(this[t]=void 0)},stop:function(){this.done=!0;var e=this.tryEntries[0].completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var t=this;function n(r,n){return i.type="throw",i.arg=e,t.next=r,n&&(t.method="next",t.arg=void 0),!!n}for(var a=this.tryEntries.length-1;a>=0;--a){var o=this.tryEntries[a],i=o.completion;if("root"===o.tryLoc)return n("end");if(o.tryLoc<=this.prev){var u=r.call(o,"catchLoc"),c=r.call(o,"finallyLoc");if(u&&c){if(this.prev<o.catchLoc)return n(o.catchLoc,!0);if(this.prev<o.finallyLoc)return n(o.finallyLoc)}else if(u){if(this.prev<o.catchLoc)return n(o.catchLoc,!0)}else{if(!c)throw new Error("try statement without catch or finally");if(this.prev<o.finallyLoc)return n(o.finallyLoc)}}}},abrupt:function(e,t){for(var n=this.tryEntries.length-1;n>=0;--n){var a=this.tryEntries[n];if(a.tryLoc<=this.prev&&r.call(a,"finallyLoc")&&this.prev<a.finallyLoc){var o=a;break}}o&&("break"===e||"continue"===e)&&o.tryLoc<=t&&t<=o.finallyLoc&&(o=null);var i=o?o.completion:{};return i.type=e,i.arg=t,o?(this.method="next",this.next=o.finallyLoc,d):this.complete(i)},complete:function(e,t){if("throw"===e.type)throw e.arg;return"break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=this.arg=e.arg,this.method="return",this.next="end"):"normal"===e.type&&t&&(this.next=t),d},finish:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var r=this.tryEntries[t];if(r.finallyLoc===e)return this.complete(r.completion,r.afterLoc),L(r),d}},catch:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var r=this.tryEntries[t];if(r.tryLoc===e){var n=r.completion;if("throw"===n.type){var a=n.arg;L(r)}return a}}throw new Error("illegal catch attempt")},delegateYield:function(e,t,r){return this.delegate={iterator:_(e),resultName:t,nextLoc:r},"next"===this.method&&(this.arg=void 0),d}},e}var F=function(){var e=(0,s.useIntl)().formatMessage,t=(0,f.useNotification)(),r=(0,f.useOverlayBlocker)(),n=r.lockApp,a=r.unlockApp,i=(0,h.useNotifyAT)().notifyStatus,S=(0,l.useQueryClient)();(0,f.useFocusWhenNavigate)();var k=(0,c.useMemo)((function(){return{update:L.default.updateAdvancedSettings}}),[]),F=(0,f.useRBAC)(k),A=F.isLoading,N=F.allowedActions.canUpdate,G=(0,l.useQuery)("advanced",(function(){return(0,j.fetchData)()}),{onSuccess:function(){i(e({id:(0,O.getTrad)("Form.advancedSettings.data.loaded"),defaultMessage:"Advanced settings data has been loaded"}))},onError:function(){t({type:"warning",message:{id:(0,O.getTrad)("notification.error"),defaultMessage:"An error occured"}})}}),I=G.status,D=G.data,R=A||"success"!==I,C=(0,l.useMutation)((function(e){return(0,j.putAdvancedSettings)(e)}),{onSuccess:function(){var e=(0,u.default)(P().mark((function e(){return P().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,S.invalidateQueries("advanced");case 2:t({type:"success",message:{id:(0,O.getTrad)("notification.success.saved"),defaultMessage:"Saved"}}),a();case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),onError:function(){t({type:"warning",message:{id:(0,O.getTrad)("notification.error"),defaultMessage:"An error occured"}}),a()},refetchActive:!0}),z=C.isLoading,W=function(){var e=(0,u.default)(P().mark((function e(t){var r;return P().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n(),r=t.email_confirmation?t.email_confirmation_redirection:"",e.next=4,C.mutateAsync(M(M({},t),{},{email_confirmation_redirection:r}));case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return R?c.default.createElement(p.Main,{"aria-busy":"true"},c.default.createElement(f.SettingsPageTitle,{name:e({id:(0,O.getTrad)("HeaderNav.link.advancedSettings"),defaultMessage:"Advanced Settings"})}),c.default.createElement(g.HeaderLayout,{title:e({id:(0,O.getTrad)("HeaderNav.link.advancedSettings"),defaultMessage:"Advanced Settings"})}),c.default.createElement(g.ContentLayout,null,c.default.createElement(f.LoadingIndicatorPage,null))):c.default.createElement(p.Main,{"aria-busy":z},c.default.createElement(f.SettingsPageTitle,{name:e({id:(0,O.getTrad)("HeaderNav.link.advancedSettings"),defaultMessage:"Advanced Settings"})}),c.default.createElement(d.Formik,{onSubmit:W,initialValues:D.settings,validateOnChange:!1,validationSchema:T.default,enableReinitialize:!0},(function(t){var r=t.errors,n=t.values,a=t.handleChange,i=t.isSubmitting;return c.default.createElement(f.Form,null,c.default.createElement(g.HeaderLayout,{title:e({id:(0,O.getTrad)("HeaderNav.link.advancedSettings"),defaultMessage:"Advanced Settings"}),primaryAction:c.default.createElement(v.Button,{loading:i,type:"submit",disabled:!N,startIcon:c.default.createElement(x.default,null),size:"L"},e({id:(0,O.getTrad)("Form.save"),defaultMessage:"Save"}))}),c.default.createElement(g.ContentLayout,null,c.default.createElement(m.Box,{background:"neutral0",hasRadius:!0,shadow:"filterShadow",paddingTop:6,paddingBottom:6,paddingLeft:7,paddingRight:7},c.default.createElement(y.Stack,{size:4},c.default.createElement(b.Typography,{variant:"delta",as:"h2"},e({id:(0,O.getTrad)("Form.title.advancedSettings"),defaultMessage:"Settings"})),c.default.createElement(E.Grid,{gap:6},c.default.createElement(E.GridItem,{col:6,s:12},c.default.createElement(w.Select,{label:e({id:(0,O.getTrad)("EditForm.inputSelect.label.role"),defaultMessage:"Default role for authenticated users"}),value:n.default_role,hint:e({id:(0,O.getTrad)("EditForm.inputSelect.description.role"),defaultMessage:"It will attach the new authenticated user to the selected role."}),onChange:function(e){return a({target:{name:"default_role",value:e}})}},D.roles.map((function(e){return c.default.createElement(w.Option,{key:e.type,value:e.type},e.name)})))),_.default.map((function(e){var t=n[e.name];return t||(t="bool"!==e.type&&""),c.default.createElement(E.GridItem,(0,o.default)({key:e.name},e.size),c.default.createElement(f.GenericInput,(0,o.default)({},e,{value:t,error:r[e.name],disabled:"email_confirmation_redirection"===e.name&&!1===n.email_confirmation,onChange:a})))})))))))})))},A=function(){return c.default.createElement(f.CheckPagePermissions,{permissions:L.default.readAdvancedSettings},c.default.createElement(F,null))};t.default=A},69416:(e,t,r)=>{var n=r(95318),a=r(50008);Object.defineProperty(t,"__esModule",{value:!0}),t.putAdvancedSettings=t.fetchData=void 0;var o=n(r(48926)),i=r(26270);function u(){u=function(){return e};var e={},t=Object.prototype,r=t.hasOwnProperty,n="function"==typeof Symbol?Symbol:{},o=n.iterator||"@@iterator",i=n.asyncIterator||"@@asyncIterator",c=n.toStringTag||"@@toStringTag";function l(e,t,r){return Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}),e[t]}try{l({},"")}catch(S){l=function(e,t,r){return e[t]=r}}function s(e,t,r,n){var a=t&&t.prototype instanceof h?t:h,o=Object.create(a.prototype),i=new _(n||[]);return o._invoke=function(e,t,r){var n="suspendedStart";return function(a,o){if("executing"===n)throw new Error("Generator is already running");if("completed"===n){if("throw"===a)throw o;return j()}for(r.method=a,r.arg=o;;){var i=r.delegate;if(i){var u=x(i,r);if(u){if(u===f)continue;return u}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if("suspendedStart"===n)throw n="completed",r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n="executing";var c=d(e,t,r);if("normal"===c.type){if(n=r.done?"completed":"suspendedYield",c.arg===f)continue;return{value:c.arg,done:r.done}}"throw"===c.type&&(n="completed",r.method="throw",r.arg=c.arg)}}}(e,r,i),o}function d(e,t,r){try{return{type:"normal",arg:e.call(t,r)}}catch(S){return{type:"throw",arg:S}}}e.wrap=s;var f={};function h(){}function p(){}function g(){}var v={};l(v,o,(function(){return this}));var m=Object.getPrototypeOf,y=m&&m(m(T([])));y&&y!==t&&r.call(y,o)&&(v=y);var w=g.prototype=h.prototype=Object.create(v);function b(e){["next","throw","return"].forEach((function(t){l(e,t,(function(e){return this._invoke(t,e)}))}))}function E(e,t){function n(o,i,u,c){var l=d(e[o],e,i);if("throw"!==l.type){var s=l.arg,f=s.value;return f&&"object"==a(f)&&r.call(f,"__await")?t.resolve(f.__await).then((function(e){n("next",e,u,c)}),(function(e){n("throw",e,u,c)})):t.resolve(f).then((function(e){s.value=e,u(s)}),(function(e){return n("throw",e,u,c)}))}c(l.arg)}var o;this._invoke=function(e,r){function a(){return new t((function(t,a){n(e,r,t,a)}))}return o=o?o.then(a,a):a()}}function x(e,t){var r=e.iterator[t.method];if(void 0===r){if(t.delegate=null,"throw"===t.method){if(e.iterator.return&&(t.method="return",t.arg=void 0,x(e,t),"throw"===t.method))return f;t.method="throw",t.arg=new TypeError("The iterator does not provide a 'throw' method")}return f}var n=d(r,e.iterator,t.arg);if("throw"===n.type)return t.method="throw",t.arg=n.arg,t.delegate=null,f;var a=n.arg;return a?a.done?(t[e.resultName]=a.value,t.next=e.nextLoc,"return"!==t.method&&(t.method="next",t.arg=void 0),t.delegate=null,f):a:(t.method="throw",t.arg=new TypeError("iterator result is not an object"),t.delegate=null,f)}function L(e){var t={tryLoc:e[0]};1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t)}function O(e){var t=e.completion||{};t.type="normal",delete t.arg,e.completion=t}function _(e){this.tryEntries=[{tryLoc:"root"}],e.forEach(L,this),this.reset(!0)}function T(e){if(e){var t=e[o];if(t)return t.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var n=-1,a=function t(){for(;++n<e.length;)if(r.call(e,n))return t.value=e[n],t.done=!1,t;return t.value=void 0,t.done=!0,t};return a.next=a}}return{next:j}}function j(){return{value:void 0,done:!0}}return p.prototype=g,l(w,"constructor",g),l(g,"constructor",p),p.displayName=l(g,c,"GeneratorFunction"),e.isGeneratorFunction=function(e){var t="function"==typeof e&&e.constructor;return!!t&&(t===p||"GeneratorFunction"===(t.displayName||t.name))},e.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,g):(e.__proto__=g,l(e,c,"GeneratorFunction")),e.prototype=Object.create(w),e},e.awrap=function(e){return{__await:e}},b(E.prototype),l(E.prototype,i,(function(){return this})),e.AsyncIterator=E,e.async=function(t,r,n,a,o){void 0===o&&(o=Promise);var i=new E(s(t,r,n,a),o);return e.isGeneratorFunction(r)?i:i.next().then((function(e){return e.done?e.value:i.next()}))},b(w),l(w,c,"Generator"),l(w,o,(function(){return this})),l(w,"toString",(function(){return"[object Generator]"})),e.keys=function(e){var t=[];for(var r in e)t.push(r);return t.reverse(),function r(){for(;t.length;){var n=t.pop();if(n in e)return r.value=n,r.done=!1,r}return r.done=!0,r}},e.values=T,_.prototype={constructor:_,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(O),!e)for(var t in this)"t"===t.charAt(0)&&r.call(this,t)&&!isNaN(+t.slice(1))&&(this[t]=void 0)},stop:function(){this.done=!0;var e=this.tryEntries[0].completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var t=this;function n(r,n){return i.type="throw",i.arg=e,t.next=r,n&&(t.method="next",t.arg=void 0),!!n}for(var a=this.tryEntries.length-1;a>=0;--a){var o=this.tryEntries[a],i=o.completion;if("root"===o.tryLoc)return n("end");if(o.tryLoc<=this.prev){var u=r.call(o,"catchLoc"),c=r.call(o,"finallyLoc");if(u&&c){if(this.prev<o.catchLoc)return n(o.catchLoc,!0);if(this.prev<o.finallyLoc)return n(o.finallyLoc)}else if(u){if(this.prev<o.catchLoc)return n(o.catchLoc,!0)}else{if(!c)throw new Error("try statement without catch or finally");if(this.prev<o.finallyLoc)return n(o.finallyLoc)}}}},abrupt:function(e,t){for(var n=this.tryEntries.length-1;n>=0;--n){var a=this.tryEntries[n];if(a.tryLoc<=this.prev&&r.call(a,"finallyLoc")&&this.prev<a.finallyLoc){var o=a;break}}o&&("break"===e||"continue"===e)&&o.tryLoc<=t&&t<=o.finallyLoc&&(o=null);var i=o?o.completion:{};return i.type=e,i.arg=t,o?(this.method="next",this.next=o.finallyLoc,f):this.complete(i)},complete:function(e,t){if("throw"===e.type)throw e.arg;return"break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=this.arg=e.arg,this.method="return",this.next="end"):"normal"===e.type&&t&&(this.next=t),f},finish:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var r=this.tryEntries[t];if(r.finallyLoc===e)return this.complete(r.completion,r.afterLoc),O(r),f}},catch:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var r=this.tryEntries[t];if(r.tryLoc===e){var n=r.completion;if("throw"===n.type){var a=n.arg;O(r)}return a}}throw new Error("illegal catch attempt")},delegateYield:function(e,t,r){return this.delegate={iterator:T(e),resultName:t,nextLoc:r},"next"===this.method&&(this.arg=void 0),f}},e}var c=function(){var e=(0,o.default)(u().mark((function e(){var t,r;return u().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,i.axiosInstance.get((0,i.getRequestURL)("advanced"));case 2:return t=e.sent,r=t.data,e.abrupt("return",r);case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();t.fetchData=c;t.putAdvancedSettings=function(e){return i.axiosInstance.put((0,i.getRequestURL)("advanced"),e)}},24497:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r(26270),a=[{intlLabel:{id:(0,n.getTrad)("EditForm.inputToggle.label.email"),defaultMessage:"One account per email address"},description:{id:(0,n.getTrad)("EditForm.inputToggle.description.email"),defaultMessage:"Disallow the user to create multiple accounts using the same email address with different authentication providers."},name:"unique_email",type:"bool",size:{col:12,xs:12}},{intlLabel:{id:(0,n.getTrad)("EditForm.inputToggle.label.sign-up"),defaultMessage:"Enable sign-ups"},description:{id:(0,n.getTrad)("EditForm.inputToggle.description.sign-up"),defaultMessage:"When disabled (OFF), the registration process is forbidden. No one can subscribe anymore no matter the used provider."},name:"allow_register",type:"bool",size:{col:12,xs:12}},{intlLabel:{id:(0,n.getTrad)("EditForm.inputToggle.label.email-reset-password"),defaultMessage:"Reset password page"},description:{id:(0,n.getTrad)("EditForm.inputToggle.description.email-reset-password"),defaultMessage:"URL of your application's reset password page."},placeholder:{id:(0,n.getTrad)("EditForm.inputToggle.placeholder.email-reset-password"),defaultMessage:"ex: https://youtfrontend.com/reset-password"},name:"email_reset_password",type:"text",size:{col:6,xs:12}},{intlLabel:{id:(0,n.getTrad)("EditForm.inputToggle.label.email-confirmation"),defaultMessage:"Enable email confirmation"},description:{id:(0,n.getTrad)("EditForm.inputToggle.description.email-confirmation"),defaultMessage:"When enabled (ON), new registered users receive a confirmation email."},name:"email_confirmation",type:"bool",size:{col:12,xs:12}},{intlLabel:{id:(0,n.getTrad)("EditForm.inputToggle.label.email-confirmation-redirection"),defaultMessage:"Redirection url"},description:{id:(0,n.getTrad)("EditForm.inputToggle.description.email-confirmation-redirection"),defaultMessage:"After you confirmed your email, choose where you will be redirected."},placeholder:{id:(0,n.getTrad)("EditForm.inputToggle.placeholder.email-reset-password"),defaultMessage:"ex: https://youtfrontend.com/reset-password"},name:"email_confirmation_redirection",type:"text",size:{col:6,xs:12}}];t.default=a},79022:(e,t,r)=>{var n=r(50008);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=function(e,t){if(!t&&e&&e.__esModule)return e;if(null===e||"object"!==n(e)&&"function"!==typeof e)return{default:e};var r=i(t);if(r&&r.has(e))return r.get(e);var a={},o=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var u in e)if("default"!==u&&Object.prototype.hasOwnProperty.call(e,u)){var c=o?Object.getOwnPropertyDescriptor(e,u):null;c&&(c.get||c.set)?Object.defineProperty(a,u,c):a[u]=e[u]}a.default=e,r&&r.set(e,a);return a}(r(53209)),o=r(28936);function i(e){if("function"!==typeof WeakMap)return null;var t=new WeakMap,r=new WeakMap;return(i=function(e){return e?r:t})(e)}var u=new RegExp("(^$)|((https?://.*)(d*)/?(.*))"),c=a.object().shape({email_confirmation_redirection:a.mixed().when("email_confirmation",{is:!0,then:a.string().matches(u).required(),otherwise:a.string().nullable()}),email_reset_password:a.string(o.translatedErrors.string).matches(u,o.translatedErrors.regex).nullable()});t.default=c}}]);