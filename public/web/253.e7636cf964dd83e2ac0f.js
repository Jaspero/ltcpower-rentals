(self.webpackChunkclient=self.webpackChunkclient||[]).push([[253],{1253:(e,t,n)=>{"use strict";n.r(t);var r=n(9759),i=n(4762),o=n(6034),s={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"},a=function(e){function t(n,r,i){var o=e.call(this,r)||this;return Object.setPrototypeOf(o,t.prototype),o.code=n,o.details=i,o}return(0,i.ZT)(t,e),t}(Error),u=function(){function e(e,t){var n=this;this.auth=null,this.messaging=null,this.auth=e.getImmediate({optional:!0}),this.messaging=t.getImmediate({optional:!0}),this.auth||e.get().then(function(e){return n.auth=e},function(){}),this.messaging||t.get().then(function(e){return n.messaging=e},function(){})}return e.prototype.getAuthToken=function(){return(0,i.mG)(this,void 0,void 0,function(){var e;return(0,i.Jh)(this,function(t){switch(t.label){case 0:if(!this.auth)return[2,void 0];t.label=1;case 1:return t.trys.push([1,3,,4]),[4,this.auth.getToken()];case 2:return(e=t.sent())?[2,e.accessToken]:[2,void 0];case 3:return t.sent(),[2,void 0];case 4:return[2]}})})},e.prototype.getInstanceIdToken=function(){return(0,i.mG)(this,void 0,void 0,function(){return(0,i.Jh)(this,function(e){switch(e.label){case 0:if(!this.messaging||!("Notification"in self)||"granted"!==Notification.permission)return[2,void 0];e.label=1;case 1:return e.trys.push([1,3,,4]),[4,this.messaging.getToken()];case 2:return[2,e.sent()];case 3:return e.sent(),[2,void 0];case 4:return[2]}})})},e.prototype.getContext=function(){return(0,i.mG)(this,void 0,void 0,function(){var e,t;return(0,i.Jh)(this,function(n){switch(n.label){case 0:return[4,this.getAuthToken()];case 1:return e=n.sent(),[4,this.getInstanceIdToken()];case 2:return t=n.sent(),[2,{authToken:e,instanceIdToken:t}]}})})},e}();function c(e,t){var n={};for(var r in e)e.hasOwnProperty(r)&&(n[r]=t(e[r]));return n}var l,h,d,f=function(){function e(){}return e.prototype.encode=function(e){var t=this;if(null==e)return null;if(e instanceof Number&&(e=e.valueOf()),"number"==typeof e&&isFinite(e))return e;if(!0===e||!1===e)return e;if("[object String]"===Object.prototype.toString.call(e))return e;if(e instanceof Date)return e.toISOString();if(Array.isArray(e))return e.map(function(e){return t.encode(e)});if("function"==typeof e||"object"==typeof e)return c(e,function(e){return t.encode(e)});throw new Error("Data cannot be encoded in JSON: "+e)},e.prototype.decode=function(e){var t=this;if(null==e)return e;if(e["@type"])switch(e["@type"]){case"type.googleapis.com/google.protobuf.Int64Value":case"type.googleapis.com/google.protobuf.UInt64Value":var n=Number(e.value);if(isNaN(n))throw new Error("Data cannot be decoded from JSON: "+e);return n;default:throw new Error("Data cannot be decoded from JSON: "+e)}return Array.isArray(e)?e.map(function(e){return t.decode(e)}):"function"==typeof e||"object"==typeof e?c(e,function(e){return t.decode(e)}):e},e}(),p=function(){function e(e,t,n,r,i,o){var s=this;void 0===i&&(i="us-central1"),this.app_=e,this.appCheckProvider=r,this.fetchImpl=o,this.serializer=new f,this.emulatorOrigin=null,this.INTERNAL={delete:function(){return Promise.resolve(s.deleteService())}},this.contextProvider=new u(t,n),this.cancelAllRequests=new Promise(function(e){s.deleteService=function(){return e()}});try{var a=new URL(i);this.customDomain=a.origin,this.region="us-central1"}catch(c){this.customDomain=null,this.region=i}}return Object.defineProperty(e.prototype,"app",{get:function(){return this.app_},enumerable:!1,configurable:!0}),e.prototype._url=function(e){var t=this.app_.options.projectId;return null!==this.emulatorOrigin?this.emulatorOrigin+"/"+t+"/"+this.region+"/"+e:null!==this.customDomain?this.customDomain+"/"+e:"https://"+this.region+"-"+t+".cloudfunctions.net/"+e},e.prototype.useEmulator=function(e,t){this.emulatorOrigin="http://"+e+":"+t},e.prototype.useFunctionsEmulator=function(e){this.emulatorOrigin=e},e.prototype.httpsCallable=function(e,t){var n=this;return function(r){return n.call(e,r,t||{})}},e.prototype.postJSON=function(e,t,n){return(0,i.mG)(this,void 0,void 0,function(){var r,o,s;return(0,i.Jh)(this,function(i){switch(i.label){case 0:return n["Content-Type"]="application/json",[4,this.getAppCheckToken()];case 1:null!==(r=i.sent())&&(n["X-Firebase-AppCheck"]=r),i.label=2;case 2:return i.trys.push([2,4,,5]),[4,this.fetchImpl(e,{method:"POST",body:JSON.stringify(t),headers:n})];case 3:return o=i.sent(),[3,5];case 4:return i.sent(),[2,{status:0,json:null}];case 5:s=null,i.label=6;case 6:return i.trys.push([6,8,,9]),[4,o.json()];case 7:return s=i.sent(),[3,9];case 8:return i.sent(),[3,9];case 9:return[2,{status:o.status,json:s}]}})})},e.prototype.getAppCheckToken=function(){return(0,i.mG)(this,void 0,void 0,function(){var e;return(0,i.Jh)(this,function(t){switch(t.label){case 0:return(e=this.appCheckProvider.getImmediate({optional:!0}))?[4,e.getToken()]:[3,2];case 1:return[2,t.sent().token];case 2:return[2,null]}})})},e.prototype.call=function(e,t,n){return(0,i.mG)(this,void 0,void 0,function(){var r,o,u,c,l,h,d,f,p,g;return(0,i.Jh)(this,function(i){switch(i.label){case 0:return r=this._url(e),t=this.serializer.encode(t),o={data:t},u={},[4,this.contextProvider.getContext()];case 1:return(c=i.sent()).authToken&&(u.Authorization="Bearer "+c.authToken),c.instanceIdToken&&(u["Firebase-Instance-ID-Token"]=c.instanceIdToken),l=function(e){var t,n=new Promise(function(n,r){t=setTimeout(function(){r(new a("deadline-exceeded","deadline-exceeded"))},e)});return{timer:t,promise:n}}(n.timeout||7e4),h=l.timer,d=l.promise,[4,Promise.race([m(h,this.postJSON(r,o,u)),d,m(h,this.cancelAllRequests)])];case 2:if(!(f=i.sent()))throw new a("cancelled","Firebase Functions instance was deleted.");if(p=function(e,t,n){var r=function(e){if(e>=200&&e<300)return"ok";switch(e){case 0:return"internal";case 400:return"invalid-argument";case 401:return"unauthenticated";case 403:return"permission-denied";case 404:return"not-found";case 409:return"aborted";case 429:return"resource-exhausted";case 499:return"cancelled";case 500:return"internal";case 501:return"unimplemented";case 503:return"unavailable";case 504:return"deadline-exceeded"}return"unknown"}(e),i=r,o=void 0;try{var u=t&&t.error;if(u){var c=u.status;if("string"==typeof c){if(!s[c])return new a("internal","internal");r=s[c],i=c}var l=u.message;"string"==typeof l&&(i=l),void 0!==(o=u.details)&&(o=n.decode(o))}}catch(h){}return"ok"===r?null:new a(r,i,o)}(f.status,f.json,this.serializer))throw p;if(!f.json)throw new a("internal","Response is not valid JSON object.");if(void 0===(g=f.json.data)&&(g=f.json.result),void 0===g)throw new a("internal","Response is missing data field.");return[2,{data:this.serializer.decode(g)}]}})})},e}();function m(e,t){return(0,i.mG)(this,void 0,void 0,function(){var n;return(0,i.Jh)(this,function(r){switch(r.label){case 0:return[4,t];case 1:return n=r.sent(),clearTimeout(e),[2,n]}})})}l=r.Z,h=fetch.bind(self),d={Functions:p},l.INTERNAL.registerComponent(new o.wA("functions",function(e,t){var n=t.instanceIdentifier,r=e.getProvider("app").getImmediate(),i=e.getProvider("auth-internal"),o=e.getProvider("app-check-internal"),s=e.getProvider("messaging");return new p(r,i,s,o,n,h)},"PUBLIC").setServiceProps(d).setMultipleInstances(!0)),r.Z.registerVersion("@firebase/functions","0.6.13")}}]);