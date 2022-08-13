/*! For license information please see Admin_pluginsPage.bdd51e9d.chunk.js.LICENSE.txt */
"use strict";(self.webpackChunkserver=self.webpackChunkserver||[]).push([[3677],{44226:(t,e,r)=>{var n=r(95318);Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=n(r(53547)),a=r(23724),i=r(97132),u=r(79835),l=r(35395),c=r(80117),s=r(67422),f=r(33483),h=r(43546),d=r(52285),p=function(){var t=(0,i.useIntl)().formatMessage;(0,u.useFocusWhenNavigate)();var e=(0,s.useNotifyAT)().notifyStatus,r=(0,u.useNotification)(),n=t({id:"app.components.ListPluginsPage.title",defaultMessage:"Plugins"}),p=function(){e(t({id:"app.utils.notify.data-loaded",defaultMessage:"The {target} has loaded"},{target:n}))},v=(0,a.useQuery)("list-plugins",(function(){return(0,d.fetchPlugins)(p)}),{onError:function(){r({type:"warning",message:{id:"notification.error",defaultMessage:"An error occured"}})}}),y=v.status,g=v.data;return"success"!==y&&"error"!==y?o.default.createElement(l.Layout,null,o.default.createElement(c.Main,{"aria-busy":!0},o.default.createElement(u.LoadingIndicatorPage,null))):o.default.createElement(l.Layout,null,o.default.createElement(c.Main,null,o.default.createElement(l.HeaderLayout,{title:n,subtitle:t({id:"app.components.ListPluginsPage.description",defaultMessage:"List of the installed plugins in the project."})}),o.default.createElement(l.ContentLayout,null,o.default.createElement(h.Table,{colCount:2,rowCount:(null===g||void 0===g?void 0:g.plugins.length)+1},o.default.createElement(h.Thead,null,o.default.createElement(h.Tr,null,o.default.createElement(h.Th,null,o.default.createElement(f.Typography,{variant:"sigma",textColor:"neutral600"},t({id:"Settings.roles.list.header.name",defaultMessage:"Name"}))),o.default.createElement(h.Th,null,o.default.createElement(f.Typography,{variant:"sigma",textColor:"neutral600"},t({id:"Settings.roles.list.header.description",defaultMessage:"description"}))))),o.default.createElement(h.Tbody,null,g.plugins.map((function(t){var e=t.name,r=t.displayName,n=t.description;return o.default.createElement(h.Tr,{key:e},o.default.createElement(h.Td,null,o.default.createElement(f.Typography,{textColor:"neutral800",variant:"omega",fontWeight:"bold"},r)),o.default.createElement(h.Td,null,o.default.createElement(f.Typography,{textColor:"neutral800"},n)))})))))))};e.default=p},3505:(t,e,r)=>{var n=r(95318);Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=n(r(53547)),a=r(79835),i=r(15482),u=r(97132),l=n(r(13240)),c=n(r(44226)),s=function(){var t=(0,(0,u.useIntl)().formatMessage)({id:"app.components.ListPluginsPage.title",defaultMessage:"Plugins"});return o.default.createElement(a.CheckPagePermissions,{permissions:l.default.marketplace.main},o.default.createElement(i.Helmet,{title:t}),o.default.createElement(c.default,null))};e.default=s},52285:(t,e,r)=>{var n=r(95318),o=r(50008);Object.defineProperty(e,"__esModule",{value:!0}),e.fetchPlugins=void 0;var a=n(r(48926)),i=r(53777);function u(){u=function(){return t};var t={},e=Object.prototype,r=e.hasOwnProperty,n="function"==typeof Symbol?Symbol:{},a=n.iterator||"@@iterator",i=n.asyncIterator||"@@asyncIterator",l=n.toStringTag||"@@toStringTag";function c(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{c({},"")}catch(j){c=function(t,e,r){return t[e]=r}}function s(t,e,r,n){var o=e&&e.prototype instanceof d?e:d,a=Object.create(o.prototype),i=new _(n||[]);return a._invoke=function(t,e,r){var n="suspendedStart";return function(o,a){if("executing"===n)throw new Error("Generator is already running");if("completed"===n){if("throw"===o)throw a;return k()}for(r.method=o,r.arg=a;;){var i=r.delegate;if(i){var u=x(i,r);if(u){if(u===h)continue;return u}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if("suspendedStart"===n)throw n="completed",r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n="executing";var l=f(t,e,r);if("normal"===l.type){if(n=r.done?"completed":"suspendedYield",l.arg===h)continue;return{value:l.arg,done:r.done}}"throw"===l.type&&(n="completed",r.method="throw",r.arg=l.arg)}}}(t,r,i),a}function f(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(j){return{type:"throw",arg:j}}}t.wrap=s;var h={};function d(){}function p(){}function v(){}var y={};c(y,a,(function(){return this}));var g=Object.getPrototypeOf,m=g&&g(g(T([])));m&&m!==e&&r.call(m,a)&&(y=m);var w=v.prototype=d.prototype=Object.create(y);function E(t){["next","throw","return"].forEach((function(e){c(t,e,(function(t){return this._invoke(e,t)}))}))}function L(t,e){function n(a,i,u,l){var c=f(t[a],t,i);if("throw"!==c.type){var s=c.arg,h=s.value;return h&&"object"==o(h)&&r.call(h,"__await")?e.resolve(h.__await).then((function(t){n("next",t,u,l)}),(function(t){n("throw",t,u,l)})):e.resolve(h).then((function(t){s.value=t,u(s)}),(function(t){return n("throw",t,u,l)}))}l(c.arg)}var a;this._invoke=function(t,r){function o(){return new e((function(e,o){n(t,r,e,o)}))}return a=a?a.then(o,o):o()}}function x(t,e){var r=t.iterator[e.method];if(void 0===r){if(e.delegate=null,"throw"===e.method){if(t.iterator.return&&(e.method="return",e.arg=void 0,x(t,e),"throw"===e.method))return h;e.method="throw",e.arg=new TypeError("The iterator does not provide a 'throw' method")}return h}var n=f(r,t.iterator,e.arg);if("throw"===n.type)return e.method="throw",e.arg=n.arg,e.delegate=null,h;var o=n.arg;return o?o.done?(e[t.resultName]=o.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,h):o:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,h)}function b(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function P(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function _(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(b,this),this.reset(!0)}function T(t){if(t){var e=t[a];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var n=-1,o=function e(){for(;++n<t.length;)if(r.call(t,n))return e.value=t[n],e.done=!1,e;return e.value=void 0,e.done=!0,e};return o.next=o}}return{next:k}}function k(){return{value:void 0,done:!0}}return p.prototype=v,c(w,"constructor",v),c(v,"constructor",p),p.displayName=c(v,l,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===p||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,v):(t.__proto__=v,c(t,l,"GeneratorFunction")),t.prototype=Object.create(w),t},t.awrap=function(t){return{__await:t}},E(L.prototype),c(L.prototype,i,(function(){return this})),t.AsyncIterator=L,t.async=function(e,r,n,o,a){void 0===a&&(a=Promise);var i=new L(s(e,r,n,o),a);return t.isGeneratorFunction(r)?i:i.next().then((function(t){return t.done?t.value:i.next()}))},E(w),c(w,l,"Generator"),c(w,a,(function(){return this})),c(w,"toString",(function(){return"[object Generator]"})),t.keys=function(t){var e=[];for(var r in t)e.push(r);return e.reverse(),function r(){for(;e.length;){var n=e.pop();if(n in t)return r.value=n,r.done=!1,r}return r.done=!0,r}},t.values=T,_.prototype={constructor:_,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(P),!t)for(var e in this)"t"===e.charAt(0)&&r.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function n(r,n){return i.type="throw",i.arg=t,e.next=r,n&&(e.method="next",e.arg=void 0),!!n}for(var o=this.tryEntries.length-1;o>=0;--o){var a=this.tryEntries[o],i=a.completion;if("root"===a.tryLoc)return n("end");if(a.tryLoc<=this.prev){var u=r.call(a,"catchLoc"),l=r.call(a,"finallyLoc");if(u&&l){if(this.prev<a.catchLoc)return n(a.catchLoc,!0);if(this.prev<a.finallyLoc)return n(a.finallyLoc)}else if(u){if(this.prev<a.catchLoc)return n(a.catchLoc,!0)}else{if(!l)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return n(a.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var o=this.tryEntries[n];if(o.tryLoc<=this.prev&&r.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var a=o;break}}a&&("break"===t||"continue"===t)&&a.tryLoc<=e&&e<=a.finallyLoc&&(a=null);var i=a?a.completion:{};return i.type=t,i.arg=e,a?(this.method="next",this.next=a.finallyLoc,h):this.complete(i)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),h},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),P(r),h}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;P(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,r){return this.delegate={iterator:T(t),resultName:e,nextLoc:r},"next"===this.method&&(this.arg=void 0),h}},t}var l=function(){var t=(0,a.default)(u().mark((function t(e){var r,n;return u().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,i.axiosInstance.get("/admin/plugins");case 2:return r=t.sent,n=r.data,e(),t.abrupt("return",n);case 6:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}();e.fetchPlugins=l}}]);