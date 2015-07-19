/*[traceur-runtime]*/
this._System=this.System,function(t){"use strict";function e(t,e,r){for(var n=[e],i=0;i<r.length;i++)n[i+1]=r[i];var u=P(Function.prototype.bind,t,n);return u}function r(t,r){var n=new(e(t,null,r));return n}function n(){return"__$"+Math.floor(1e9*Math.random())+"$"+ ++M+"$__"}function i(t){return $[t]}function u(){var t=n();return $[t]=!0,t}function o(t,e,r){return[x,t,e,r]}function c(t){return t&&t[0]===x}function a(){E=u(),Function.prototype.call=s(function(t){var e=f(function(t){for(var e=[],r=1;r<arguments.length;++r)e[r-1]=arguments[r];var n=o(this,t,e);return n},this,arguments);return e}),Function.prototype.apply=s(function(t,e){var r=f(function(t,e){var r=o(this,t,e);return r},this,arguments);return r})}function s(t){return null===E&&a(),t[E]=!0,t}function l(t){return!!t[E]}function f(t,e,r){var n=r[0];if(c(n))return n=P(t,e,n[3]);for(n=o(t,e,r);;){if(n=l(t)?P(t,n[2],[n]):P(t,n[2],n[3]),!c(n))return n;t=n[1]}}function h(){var t;return t=l(this)?r(this,[o(null,null,arguments)]):r(this,arguments)}if(!t.$traceurRuntime){var m=Object,p=TypeError,b=m.create,y=m.defineProperties,v=m.defineProperty,g=m.freeze,d=m.getOwnPropertyDescriptor,j=m.getOwnPropertyNames,w=m.keys,O=m.prototype.hasOwnProperty,S=(m.prototype.toString,Object.preventExtensions),R=Object.seal,_=Object.isExtensible,P=Function.prototype.call.bind(Function.prototype.apply),M=0,$=b(null),x=Object.create(null),E=null;!function(){function e(t){return{configurable:!0,enumerable:!1,value:t,writable:!0}}function r(t){return"object"==typeof t&&t instanceof l}function c(t){return r(t)?"symbol":typeof t}function a(t){var e=new l(t);if(!(this instanceof a))return e;throw new TypeError("Symbol cannot be new'ed")}function l(t){var e=n();v(this,X,{value:this}),v(this,B,{value:e}),v(this,Q,{value:t}),M(this),J[e]=this}function P(t){var e=t[Z];return e&&e.self===t?e:_(t)?(et.hash.value=rt++,et.self.value=t,tt.value=b(null,et),v(t,Z,tt),tt.value):void 0}function M(t){return P(t),g.apply(this,arguments)}function x(t){return P(t),S.apply(this,arguments)}function E(t){return P(t),R.apply(this,arguments)}function I(t){return J[t]||$[t]}function k(t){return r(t)?t[B]:t}function N(t){for(var e=[],r=0;r<t.length;r++)I(t[r])||e.push(t[r]);return e}function T(t){return N(j(t))}function A(t){return N(w(t))}function C(t){for(var e=[],r=j(t),n=0;n<r.length;n++){var i=J[r[n]];i&&e.push(i)}return e}function F(t,e){return d(t,k(e))}function G(t){return O.call(this,k(t))}function H(e){return t.$traceurRuntime.options[e]}function U(t,e,n){return r(e)&&(e=e[B]),v(t,e,n),t}function D(t){v(t,"defineProperty",{value:U}),v(t,"getOwnPropertyNames",{value:T}),v(t,"getOwnPropertyDescriptor",{value:F}),v(t.prototype,"hasOwnProperty",{value:G}),v(t,"freeze",{value:M}),v(t,"preventExtensions",{value:x}),v(t,"seal",{value:E}),v(t,"keys",{value:A})}function V(t){for(var e=1;e<arguments.length;e++)for(var r=j(arguments[e]),n=0;n<r.length;n++){var i=r[n];I(i)||!function(e,r){v(t,r,{get:function(){return e[r]},enumerable:!0})}(arguments[e],r[n])}return t}function z(t){return null!=t&&("object"==typeof t||"function"==typeof t)}function q(t){if(null==t)throw p();return m(t)}function Y(t){if(null==t)throw new TypeError("Value cannot be converted to an Object");return t}function W(t,e){t.Symbol||(t.Symbol=e,Object.getOwnPropertySymbols=C),t.Symbol.iterator||(t.Symbol.iterator=e("Symbol.iterator")),t.Symbol.observer||(t.Symbol.observer=e("Symbol.observer"))}function K(t){W(t,a),t.Reflect=t.Reflect||{},t.Reflect.global=t.Reflect.global||t,D(t.Object)}var L=e,B=n(),Q=n(),X=n(),J=b(null);v(a.prototype,"constructor",e(a)),v(a.prototype,"toString",L(function(){var t=this[X];return t[B]})),v(a.prototype,"valueOf",L(function(){var t=this[X];if(!t)throw TypeError("Conversion from symbol to string");return H("symbols")?t:t[B]})),v(l.prototype,"constructor",e(a)),v(l.prototype,"toString",{value:a.prototype.toString,enumerable:!1}),v(l.prototype,"valueOf",{value:a.prototype.valueOf,enumerable:!1});var Z=u(),tt={value:void 0},et={hash:{value:void 0},self:{value:void 0}},rt=0;M(l.prototype),K(t),t.$traceurRuntime={call:f,checkObjectCoercible:Y,construct:h,continuation:o,createPrivateName:u,defineProperties:y,defineProperty:v,exportStar:V,getOwnHashObject:P,getOwnPropertyDescriptor:d,getOwnPropertyNames:j,initTailRecursiveFunction:s,isObject:z,isPrivateName:i,isSymbolString:I,keys:w,options:{},setupGlobals:K,toObject:q,toProperty:k,"typeof":c}}()}}("undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this),function(){function t(t,e,r,n,i,u,o){var c=[];return t&&c.push(t,":"),r&&(c.push("//"),e&&c.push(e,"@"),c.push(r),n&&c.push(":",n)),i&&c.push(i),u&&c.push("?",u),o&&c.push("#",o),c.join("")}function e(t){return t.match(c)}function r(t){if("/"===t)return"/";for(var e="/"===t[0]?"/":"",r="/"===t.slice(-1)?"/":"",n=t.split("/"),i=[],u=0,o=0;o<n.length;o++){var c=n[o];switch(c){case"":case".":break;case"..":i.length?i.pop():u++;break;default:i.push(c)}}if(!e){for(;u-->0;)i.unshift("..");0===i.length&&i.push(".")}return e+i.join("/")+r}function n(e){var n=e[a.PATH]||"";return n=r(n),e[a.PATH]=n,t(e[a.SCHEME],e[a.USER_INFO],e[a.DOMAIN],e[a.PORT],e[a.PATH],e[a.QUERY_DATA],e[a.FRAGMENT])}function i(t){var r=e(t);return n(r)}function u(t,r){var i=e(r),u=e(t);if(i[a.SCHEME])return n(i);i[a.SCHEME]=u[a.SCHEME];for(var o=a.SCHEME;o<=a.PORT;o++)i[o]||(i[o]=u[o]);if("/"==i[a.PATH][0])return n(i);var c=u[a.PATH],s=c.lastIndexOf("/");return c=c.slice(0,s+1)+i[a.PATH],i[a.PATH]=c,n(i)}function o(t){if(!t)return!1;if("/"===t[0])return!0;var r=e(t);return r[a.SCHEME]?!0:!1}var c=new RegExp("^(?:([^:/?#.]+):)?(?://(?:([^/?#]*)@)?([\\w\\d\\-\\u0100-\\uffff.%]*)(?::([0-9]+))?)?([^?#]+)?(?:\\?([^#]*))?(?:#(.*))?$"),a={SCHEME:1,USER_INFO:2,DOMAIN:3,PORT:4,PATH:5,QUERY_DATA:6,FRAGMENT:7};$traceurRuntime.canonicalizeUrl=i,$traceurRuntime.isAbsolute=o,$traceurRuntime.removeDotSegments=r,$traceurRuntime.resolveUrl=u}(),function(t){"use strict";function e(t,e){this.url=t,this.value_=e}function r(t,e){this.message=this.constructor.name+": "+this.stripCause(e)+" in "+t,e instanceof r||!e.stack?this.stack="":this.stack=this.stripStack(e.stack)}function n(t,e){var r=[],n=e-3;0>n&&(n=0);for(var i=n;e>i;i++)r.push(t[i]);return r}function i(t,e){var r=e+1;r>t.length-1&&(r=t.length-1);for(var n=[],i=e;r>=i;i++)n.push(t[i]);return n}function u(t){for(var e="",r=0;t-1>r;r++)e+="-";return e}function o(t,r){e.call(this,t,null),this.func=r}function c(t){if(t){var e=v.normalize(t);return p[e]}}function a(t){var e=arguments[1],r=Object.create(null);return Object.getOwnPropertyNames(t).forEach(function(n){var i,u;if(e===y){var o=Object.getOwnPropertyDescriptor(t,n);o.get&&(i=o.get)}i||(u=t[n],i=function(){return u}),Object.defineProperty(r,n,{get:i,enumerable:!0})}),Object.preventExtensions(r),r}var s,l=$traceurRuntime,f=l.canonicalizeUrl,h=l.resolveUrl,m=l.isAbsolute,p=Object.create(null);s=t.location&&t.location.href?h(t.location.href,"./"):"",r.prototype=Object.create(Error.prototype),r.prototype.constructor=r,r.prototype.stripError=function(t){return t.replace(/.*Error:/,this.constructor.name+":")},r.prototype.stripCause=function(t){return t?t.message?this.stripError(t.message):t+"":""},r.prototype.loadedBy=function(t){this.stack+="\n loaded by "+t},r.prototype.stripStack=function(t){var e=[];return t.split("\n").some(function(t){return/UncoatedModuleInstantiator/.test(t)?!0:void e.push(t)}),e[0]=this.stripError(e[0]),e.join("\n")},o.prototype=Object.create(e.prototype),o.prototype.getUncoatedModule=function(){if(this.value_)return this.value_;try{var e;return void 0!==typeof $traceurRuntime&&$traceurRuntime.require&&(e=$traceurRuntime.require.bind(null,this.url)),this.value_=this.func.call(t,e)}catch(o){if(o instanceof r)throw o.loadedBy(this.url),o;if(o.stack){var c=this.func.toString().split("\n"),a=[];o.stack.split("\n").some(function(t){if(t.indexOf("UncoatedModuleInstantiator.getUncoatedModule")>0)return!0;var e=/(at\s[^\s]*\s).*>:(\d*):(\d*)\)/.exec(t);if(e){var r=parseInt(e[2],10);a=a.concat(n(c,r)),a.push(u(e[3])+"^"),a=a.concat(i(c,r)),a.push("= = = = = = = = =")}else a.push(t)}),o.stack=a.join("\n")}throw new r(this.url,o)}};var b=Object.create(null),y={},v={normalize:function(t,e,r){if("string"!=typeof t)throw new TypeError("module name must be a string, not "+typeof t);if(m(t))return f(t);if(/[^\.]\/\.\.\//.test(t))throw new Error("module name embeds /../: "+t);return"."===t[0]&&e?h(e,t):f(t)},get:function(t){var e=c(t);if(!e)return void 0;var r=b[e.url];return r?r:(r=a(e.getUncoatedModule(),y),b[e.url]=r)},set:function(t,e){t=String(t),p[t]=new o(t,function(){return e}),b[t]=e},get baseURL(){return s},set baseURL(t){s=String(t)},registerModule:function(t,e,r){var n=v.normalize(t);if(p[n])throw new Error("duplicate module named "+n);p[n]=new o(n,r)},bundleStore:Object.create(null),register:function(t,e,r){e&&(e.length||r.length)?this.bundleStore[t]={deps:e,execute:function(){var t=arguments,n={};e.forEach(function(e,r){return n[e]=t[r]});var i=r.call(this,n);return i.execute.call(this),i.exports}}:this.registerModule(t,e,r)},getAnonymousModule:function(e){return new a(e.call(t),y)},getForTesting:function(t){var e=this;return this.testingPrefix_||Object.keys(b).some(function(t){var r=/(traceur@[^\/]*\/)/.exec(t);return r?(e.testingPrefix_=r[1],!0):void 0}),this.get(this.testingPrefix_+t)}},g=new a({ModuleStore:v});v.set("@traceur/src/runtime/ModuleStore",g),v.set("@traceur/src/runtime/ModuleStore.js",g);var d=$traceurRuntime.setupGlobals;$traceurRuntime.setupGlobals=function(t){d(t)},$traceurRuntime.ModuleStore=v,t.System={register:v.register.bind(v),registerModule:v.registerModule.bind(v),get:v.get,set:v.set,normalize:v.normalize},$traceurRuntime.getModuleImpl=function(t){var e=c(t);return e&&e.getUncoatedModule()}}("undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this),System.registerModule("traceur-runtime@0.0.87/src/runtime/async.js",[],function(){"use strict";function t(){}function e(){}function r(t){return t.prototype=s(e.prototype),t.__proto__=e,t}function n(t,e){for(var r=[],n=2;n<arguments.length;n++)r[n-2]=arguments[n];var i=s(e.prototype);return i[l]=this,i[f]=r,i[h]=t,i}function i(t,e){return new Promise(function(r,n){var i=t({next:function(t){return e.call(i,t)},"throw":function(t){n(t)},"return":function(t){r(t)}})})}function u(t){return Promise.resolve().then(t)}function o(t,e){return new y(t,e)}if("object"!=typeof $traceurRuntime)throw new Error("traceur runtime not found.");var c=$traceurRuntime.createPrivateName,a=$traceurRuntime.defineProperty,s=($traceurRuntime.defineProperties,Object.create),l=c(),f=c(),h=c();t.prototype=e,e.constructor=t,a(e,"constructor",{enumerable:!1});var m=function(t){var e=this;this.decoratedObserver=$traceurRuntime.createDecoratedGenerator(t,function(){e.done=!0}),this.done=!1,this.inReturn=!1};$traceurRuntime.createClass(m,{"throw":function(t){if(!this.inReturn)throw t},"yield":function(t){if(this.done)throw void(this.inReturn=!0);var e;try{e=this.decoratedObserver.next(t)}catch(r){throw this.done=!0,r}if(void 0!==e){if(e.done)throw this.done=!0,void(this.inReturn=!0);return e.value}},yieldFor:function(t){var e=this;return $traceurRuntime.observeForEach(t[$traceurRuntime.toProperty(Symbol.observer)].bind(t),function(t){if(e.done)return void this["return"]();var r;try{r=e.decoratedObserver.next(t)}catch(n){throw e.done=!0,n}if(void 0!==r)return r.done&&(e.done=!0),r})}},{}),e.prototype[Symbol.observer]=function(t){var e=this[h],r=new m(t);return $traceurRuntime.schedule(function(){return e(r)}).then(function(t){r.done||r.decoratedObserver["return"](t)})["catch"](function(t){r.done||r.decoratedObserver["throw"](t)}),r.decoratedObserver},a(e.prototype,Symbol.observer,{enumerable:!1});var p=Symbol(),b=Symbol(),y=function(t,e){this[p]=t,this[b]=e};return $traceurRuntime.createClass(y,{next:function(t){var e=this[p].next(t);return void 0!==e&&e.done&&this[b].call(this),e},"throw":function(t){return this[b].call(this),this[p]["throw"](t)},"return":function(t){return this[b].call(this),this[p]["return"](t)}},{}),$traceurRuntime.initAsyncGeneratorFunction=r,$traceurRuntime.createAsyncGeneratorInstance=n,$traceurRuntime.observeForEach=i,$traceurRuntime.schedule=u,$traceurRuntime.createDecoratedGenerator=o,{}}),System.registerModule("traceur-runtime@0.0.87/src/runtime/classes.js",[],function(){"use strict";function t(t,e){var r=m(t);do{var n=h(r,e);if(n)return n;r=m(r)}while(r);return void 0}function e(t){return t.__proto__}function r(e,r,n){var i=t(r,n);return i?i.get?i.get.call(e):i.value:void 0}function n(e,r,n,i){var u=t(r,n);if(u&&u.set)return u.set.call(e,i),i;throw a("super has no setter '"+n+"'.")}function i(t){for(var e={},r=b(t),n=0;n<r.length;n++){var i=r[n];e[i]=h(t,i)}for(var u=y(t),n=0;n<u.length;n++){var o=u[n];e[$traceurRuntime.toProperty(o)]=h(t,$traceurRuntime.toProperty(o))}return e}function u(t,e,r,n){return f(e,"constructor",{value:t,configurable:!0,enumerable:!1,writable:!0}),arguments.length>3?("function"==typeof n&&(t.__proto__=n),t.prototype=s(o(n),i(e))):t.prototype=e,f(t,"prototype",{configurable:!1,writable:!1}),l(t,i(r))}function o(t){if("function"==typeof t){var e=t.prototype;if(c(e)===e||null===e)return t.prototype;throw new a("super prototype must be an Object or null")}if(null===t)return null;throw new a("Super expression must either be null or a function, not "+typeof t+".")}var c=Object,a=TypeError,s=c.create,l=$traceurRuntime.defineProperties,f=$traceurRuntime.defineProperty,h=$traceurRuntime.getOwnPropertyDescriptor,m=($traceurRuntime.getOwnPropertyNames,Object.getPrototypeOf),p=Object,b=p.getOwnPropertyNames,y=p.getOwnPropertySymbols;return $traceurRuntime.createClass=u,$traceurRuntime.superConstructor=e,$traceurRuntime.superGet=r,$traceurRuntime.superSet=n,{}}),System.registerModule("traceur-runtime@0.0.87/src/runtime/destructuring.js",[],function(){"use strict";function t(t){for(var e,r=[],n=0;!(e=t.next()).done;)r[n++]=e.value;return r}return $traceurRuntime.iteratorToArray=t,{}}),System.registerModule("traceur-runtime@0.0.87/src/runtime/generators.js",[],function(){"use strict";function t(t){return{configurable:!0,enumerable:!1,value:t,writable:!0}}function e(t){return new Error("Traceur compiler bug: invalid state in state machine: "+t)}function r(){this.state=0,this.GState=v,this.storedException=void 0,this.finallyFallThrough=void 0,this.sent_=void 0,this.returnValue=void 0,this.oldReturnValue=void 0,this.tryStack_=[]}function n(t,e,r,n){switch(t.GState){case g:throw new Error('"'+r+'" on executing generator');case j:if("next"==r)return{value:void 0,done:!0};if(n===S)return{value:t.returnValue,done:!0};throw n;case v:if("throw"===r){if(t.GState=j,n===S)return{value:t.returnValue,done:!0};throw n}if(void 0!==n)throw y("Sent value to newborn generator");case d:t.GState=g,t.action=r,t.sent=n;var i;try{i=e(t)}catch(u){if(u!==S)throw u;i=t}var o=i===t;return o&&(i=t.returnValue),t.GState=o?j:d,{value:i,done:o}}}function i(){}function u(){}function o(t,e,n){var i=l(t,n),u=new r,o=b(e.prototype);return o[R]=u,o[_]=i,o}function c(t){return t.prototype=b(u.prototype),t.__proto__=u,t}function a(){r.call(this),this.err=void 0;var t=this;t.result=new Promise(function(e,r){t.resolve=e,t.reject=r})}function s(t,e){var r=l(t,e),n=new a;return n.createCallback=function(t){return function(e){n.state=t,n.value=e,r(n)}},n.errback=function(t){f(n,t),r(n)},r(n),n.result}function l(t,e){return function(r){for(;;)try{return t.call(e,r)}catch(n){f(r,n)}}}function f(t,e){t.storedException=e;var r=t.tryStack_[t.tryStack_.length-1];return r?(t.state=void 0!==r["catch"]?r["catch"]:r["finally"],void(void 0!==r.finallyFallThrough&&(t.finallyFallThrough=r.finallyFallThrough))):void t.handleException(e)}if("object"!=typeof $traceurRuntime)throw new Error("traceur runtime not found.");var h=$traceurRuntime.createPrivateName,m=$traceurRuntime.defineProperties,p=$traceurRuntime.defineProperty,b=Object.create,y=TypeError,v=0,g=1,d=2,j=3,w=-2,O=-3,S={};r.prototype={pushTry:function(t,e){if(null!==e){for(var r=null,n=this.tryStack_.length-1;n>=0;n--)if(void 0!==this.tryStack_[n]["catch"]){r=this.tryStack_[n]["catch"];break}null===r&&(r=O),this.tryStack_.push({"finally":e,finallyFallThrough:r})}null!==t&&this.tryStack_.push({"catch":t})},popTry:function(){this.tryStack_.pop()},maybeUncatchable:function(){if(this.storedException===S)throw S},get sent(){return this.maybeThrow(),this.sent_},set sent(t){this.sent_=t},get sentIgnoreThrow(){return this.sent_},maybeThrow:function(){if("throw"===this.action)throw this.action="next",this.sent_},end:function(){switch(this.state){case w:return this;case O:throw this.storedException;default:throw e(this.state)}},handleException:function(t){throw this.GState=j,this.state=w,t},wrapYieldStar:function(t){var e=this;return{next:function(e){return t.next(e)},"throw":function(r){var n;if(r===S){if(t["return"]){if(n=t["return"](e.returnValue),!n.done)return e.returnValue=e.oldReturnValue,n;e.returnValue=n.value}throw r}if(t["throw"])return t["throw"](r);throw t["return"]&&t["return"](),y("Inner iterator does not have a throw method")}}}};var R=h(),_=h();return i.prototype=u,p(u,"constructor",t(i)),u.prototype={constructor:u,next:function(t){return n(this[R],this[_],"next",t)},"throw":function(t){return n(this[R],this[_],"throw",t)},"return":function(t){return this[R].oldReturnValue=this[R].returnValue,this[R].returnValue=t,n(this[R],this[_],"throw",S)}},m(u.prototype,{constructor:{enumerable:!1},next:{enumerable:!1},"throw":{enumerable:!1},"return":{enumerable:!1}}),Object.defineProperty(u.prototype,Symbol.iterator,t(function(){return this})),a.prototype=b(r.prototype),a.prototype.end=function(){switch(this.state){case w:this.resolve(this.returnValue);break;case O:this.reject(this.storedException);break;default:this.reject(e(this.state))}},a.prototype.handleException=function(){this.state=O},$traceurRuntime.asyncWrap=s,$traceurRuntime.initGeneratorFunction=c,$traceurRuntime.createGeneratorInstance=o,{}}),System.registerModule("traceur-runtime@0.0.87/src/runtime/relativeRequire.js",[],function(){"use strict";function t(t,r){function n(t){return"/"===t.slice(-1)}function i(t){return"/"===t[0]}function u(t){return"."===t[0]}return e=e||"undefined"!=typeof require&&require("path"),n(r)||i(r)?void 0:u(r)?require(e.resolve(e.dirname(t),r)):require(r)}var e;return $traceurRuntime.require=t,{}}),System.registerModule("traceur-runtime@0.0.87/src/runtime/spread.js",[],function(){"use strict";function t(){for(var t,e=[],r=0,n=0;n<arguments.length;n++){var i=$traceurRuntime.checkObjectCoercible(arguments[n]);if("function"!=typeof i[$traceurRuntime.toProperty(Symbol.iterator)])throw new TypeError("Cannot spread non-iterable object.");for(var u=i[$traceurRuntime.toProperty(Symbol.iterator)]();!(t=u.next()).done;)e[r++]=t.value}return e}return $traceurRuntime.spread=t,{}}),System.registerModule("traceur-runtime@0.0.87/src/runtime/type-assertions.js",[],function(){"use strict";function t(t){for(var e=[],i=1;i<arguments.length;i++)e[i-1]=arguments[i];var u=n,o=$traceurRuntime.getOwnHashObject(t).hash;u[o]||(u[o]=Object.create(null)),u=u[o];for(var c=0;c<e.length-1;c++)o=$traceurRuntime.getOwnHashObject(e[c]).hash,u[o]||(u[o]=Object.create(null)),u=u[o];var a=e[e.length-1];return o=$traceurRuntime.getOwnHashObject(a).hash,u[o]||(u[o]=new r(t,e)),u[o]}var e={any:{name:"any"},"boolean":{name:"boolean"},number:{name:"number"},string:{name:"string"},symbol:{name:"symbol"},"void":{name:"void"}},r=function(t,e){this.type=t,this.argumentTypes=e};$traceurRuntime.createClass(r,{},{});var n=Object.create(null);return $traceurRuntime.GenericType=r,$traceurRuntime.genericType=t,$traceurRuntime.type=e,{}}),System.registerModule("traceur-runtime@0.0.87/src/runtime/runtime-modules.js",[],function(){"use strict";return System.get("traceur-runtime@0.0.87/src/runtime/relativeRequire.js"),System.get("traceur-runtime@0.0.87/src/runtime/spread.js"),System.get("traceur-runtime@0.0.87/src/runtime/destructuring.js"),System.get("traceur-runtime@0.0.87/src/runtime/classes.js"),System.get("traceur-runtime@0.0.87/src/runtime/async.js"),System.get("traceur-runtime@0.0.87/src/runtime/generators.js"),System.get("traceur-runtime@0.0.87/src/runtime/type-assertions.js"),{}}),System.get("traceur-runtime@0.0.87/src/runtime/runtime-modules.js"),System.registerModule("traceur-runtime@0.0.87/src/runtime/polyfills/utils.js",[],function(){"use strict";function t(t){return t>>>0}function e(t){return t&&("object"==typeof t||"function"==typeof t)}function r(t){return"function"==typeof t}function n(t){return"number"==typeof t}function i(t){return t=+t,j(t)?0:0!==t&&d(t)?t>0?g(t):v(t):t}function u(t){var e=i(t);return 0>e?0:O(e,R)}function o(t){return e(t)?t[Symbol.iterator]:void 0}function c(t){return r(t)}function a(t,e){return{value:t,done:e}}function s(t,e,r){e in t||Object.defineProperty(t,e,r)}function l(t,e,r){s(t,e,{value:r,configurable:!0,enumerable:!1,writable:!0})}function f(t,e,r){s(t,e,{value:r,configurable:!1,enumerable:!1,writable:!1})}function h(t,e){for(var r=0;r<e.length;r+=2){var n=e[r],i=e[r+1];l(t,n,i)}}function m(t,e){for(var r=0;r<e.length;r+=2){var n=e[r],i=e[r+1];f(t,n,i)}}function p(t,e,r){r&&r.iterator&&!t[r.iterator]&&(t["@@iterator"]&&(e=t["@@iterator"]),Object.defineProperty(t,r.iterator,{value:e,configurable:!0,enumerable:!1,writable:!0}))}function b(t){_.push(t)}function y(t){_.forEach(function(e){return e(t)})}var v=Math.ceil,g=Math.floor,d=isFinite,j=isNaN,w=Math.pow,O=Math.min,S=$traceurRuntime.toObject,R=w(2,53)-1,_=[];return{get toObject(){return S},get toUint32(){return t},get isObject(){return e},get isCallable(){return r},get isNumber(){return n},get toInteger(){return i},get toLength(){return u},get checkIterable(){return o},get isConstructor(){return c},get createIteratorResultObject(){return a},get maybeDefine(){return s},get maybeDefineMethod(){return l},get maybeDefineConst(){return f},get maybeAddFunctions(){return h},get maybeAddConsts(){return m},get maybeAddIterator(){return p},get registerPolyfill(){return b},get polyfillAll(){return y}}}),System.registerModule("traceur-runtime@0.0.87/src/runtime/polyfills/Map.js",[],function(){"use strict";function t(t,e){if(i(e)){var r=c(e);return r&&t.objectIndex_[r.hash]}return"string"==typeof e?t.stringIndex_[e]:t.primitiveIndex_[e]}function e(t){t.entries_=[],t.objectIndex_=Object.create(null),t.stringIndex_=Object.create(null),t.primitiveIndex_=Object.create(null),t.deletedCount_=0}function r(t){var e=t,r=e.Object,n=e.Symbol;t.Map||(t.Map=l);var i=t.Map.prototype;void 0===i.entries&&(t.Map=l),i.entries&&(u(i,i.entries,n),u(r.getPrototypeOf((new t.Map).entries()),function(){return this},n))}var n=System.get("traceur-runtime@0.0.87/src/runtime/polyfills/utils.js"),i=n.isObject,u=n.maybeAddIterator,o=n.registerPolyfill,c=$traceurRuntime.getOwnHashObject,a=Object.prototype.hasOwnProperty,s={},l=function(){var t,r,n=arguments[0];if(!i(this))throw new TypeError("Map called on incompatible type");if(a.call(this,"entries_"))throw new TypeError("Map can not be reentrantly initialised");if(e(this),null!==n&&void 0!==n){var u=!0,o=!1,c=void 0;try{for(var s=void 0,l=n[$traceurRuntime.toProperty(Symbol.iterator)]();!(u=(s=l.next()).done);u=!0){var f=s.value,h=(t=f[$traceurRuntime.toProperty(Symbol.iterator)](),(r=t.next()).done?void 0:r.value),m=(r=t.next()).done?void 0:r.value;this.set(h,m)}}catch(p){o=!0,c=p}finally{try{u||null==l["return"]||l["return"]()}finally{if(o)throw c}}}};return $traceurRuntime.createClass(l,{get size(){return this.entries_.length/2-this.deletedCount_},get:function(e){var r=t(this,e);return void 0!==r?this.entries_[r+1]:void 0},set:function(e,r){var n=i(e),u="string"==typeof e,o=t(this,e);if(void 0!==o)this.entries_[o+1]=r;else if(o=this.entries_.length,this.entries_[o]=e,this.entries_[o+1]=r,n){var a=c(e),s=a.hash;this.objectIndex_[s]=o}else u?this.stringIndex_[e]=o:this.primitiveIndex_[e]=o;return this},has:function(e){return void 0!==t(this,e)},"delete":function(t){var e,r,n=i(t),u="string"==typeof t;if(n){var o=c(t);o&&(e=this.objectIndex_[r=o.hash],delete this.objectIndex_[r])}else u?(e=this.stringIndex_[t],delete this.stringIndex_[t]):(e=this.primitiveIndex_[t],delete this.primitiveIndex_[t]);return void 0!==e?(this.entries_[e]=s,this.entries_[e+1]=void 0,this.deletedCount_++,!0):!1},clear:function(){e(this)},forEach:function(t){for(var e=arguments[1],r=0;r<this.entries_.length;r+=2){var n=this.entries_[r],i=this.entries_[r+1];n!==s&&t.call(e,i,n,this)}},entries:$traceurRuntime.initGeneratorFunction(function f(){var t,e,r;return $traceurRuntime.createGeneratorInstance(function(n){for(;;)switch(n.state){case 0:t=0,n.state=12;break;case 12:n.state=t<this.entries_.length?8:-2;break;case 4:t+=2,n.state=12;break;case 8:e=this.entries_[t],r=this.entries_[t+1],n.state=9;break;case 9:n.state=e===s?4:6;break;case 6:return n.state=2,[e,r];case 2:n.maybeThrow(),n.state=4;break;default:return n.end()}},f,this)}),keys:$traceurRuntime.initGeneratorFunction(function h(){var t,e,r;return $traceurRuntime.createGeneratorInstance(function(n){for(;;)switch(n.state){case 0:t=0,n.state=12;break;case 12:n.state=t<this.entries_.length?8:-2;break;case 4:t+=2,n.state=12;break;case 8:e=this.entries_[t],r=this.entries_[t+1],n.state=9;break;case 9:n.state=e===s?4:6;break;case 6:return n.state=2,e;case 2:n.maybeThrow(),n.state=4;break;default:return n.end()}},h,this)}),values:$traceurRuntime.initGeneratorFunction(function m(){var t,e,r;return $traceurRuntime.createGeneratorInstance(function(n){for(;;)switch(n.state){case 0:t=0,n.state=12;break;case 12:n.state=t<this.entries_.length?8:-2;break;case 4:t+=2,n.state=12;break;case 8:e=this.entries_[t],r=this.entries_[t+1],n.state=9;break;case 9:n.state=e===s?4:6;break;case 6:return n.state=2,r;case 2:n.maybeThrow(),n.state=4;break;default:return n.end()}},m,this)})},{}),Object.defineProperty(l.prototype,Symbol.iterator,{configurable:!0,writable:!0,value:l.prototype.entries}),o(r),{get Map(){return l},get polyfillMap(){return r}}}),System.get("traceur-runtime@0.0.87/src/runtime/polyfills/Map.js"),System.registerModule("traceur-runtime@0.0.87/src/runtime/polyfills/Set.js",[],function(){"use strict";function t(t){t.map_=new o}function e(t){var e=t,r=e.Object,n=e.Symbol;t.Set||(t.Set=a);var u=t.Set.prototype;u.values&&(i(u,u.values,n),i(r.getPrototypeOf((new t.Set).values()),function(){return this},n))}var r=System.get("traceur-runtime@0.0.87/src/runtime/polyfills/utils.js"),n=r.isObject,i=r.maybeAddIterator,u=r.registerPolyfill,o=System.get("traceur-runtime@0.0.87/src/runtime/polyfills/Map.js").Map,c=($traceurRuntime.getOwnHashObject,Object.prototype.hasOwnProperty),a=function(){var e=arguments[0];if(!n(this))throw new TypeError("Set called on incompatible type");if(c.call(this,"map_"))throw new TypeError("Set can not be reentrantly initialised");if(t(this),null!==e&&void 0!==e){var r=!0,i=!1,u=void 0;try{for(var o=void 0,a=e[$traceurRuntime.toProperty(Symbol.iterator)]();!(r=(o=a.next()).done);r=!0){var s=o.value;this.add(s)}}catch(l){i=!0,u=l}finally{try{r||null==a["return"]||a["return"]()}finally{if(i)throw u}}}};return $traceurRuntime.createClass(a,{get size(){return this.map_.size},has:function(t){return this.map_.has(t)},add:function(t){return this.map_.set(t,t),this},"delete":function(t){return this.map_["delete"](t)},clear:function(){return this.map_.clear()},forEach:function(t){var e=arguments[1],r=this;return this.map_.forEach(function(n,i){t.call(e,i,i,r)})},values:$traceurRuntime.initGeneratorFunction(function s(){var t,e;return $traceurRuntime.createGeneratorInstance(function(r){for(;;)switch(r.state){case 0:t=r.wrapYieldStar(this.map_.keys()[Symbol.iterator]()),r.sent=void 0,r.action="next",r.state=12;break;case 12:e=t[r.action](r.sentIgnoreThrow),r.state=9;break;case 9:r.state=e.done?3:2;break;case 3:r.sent=e.value,r.state=-2;break;case 2:return r.state=12,e.value;default:return r.end()}},s,this)}),entries:$traceurRuntime.initGeneratorFunction(function l(){var t,e;return $traceurRuntime.createGeneratorInstance(function(r){for(;;)switch(r.state){case 0:t=r.wrapYieldStar(this.map_.entries()[Symbol.iterator]()),r.sent=void 0,r.action="next",r.state=12;break;case 12:e=t[r.action](r.sentIgnoreThrow),r.state=9;break;case 9:r.state=e.done?3:2;break;case 3:r.sent=e.value,r.state=-2;break;case 2:return r.state=12,e.value;default:return r.end()}},l,this)})},{}),Object.defineProperty(a.prototype,Symbol.iterator,{configurable:!0,writable:!0,value:a.prototype.values}),Object.defineProperty(a.prototype,"keys",{configurable:!0,writable:!0,value:a.prototype.values}),u(e),{get Set(){return a},get polyfillSet(){return e}}}),System.get("traceur-runtime@0.0.87/src/runtime/polyfills/Set.js"),System.registerModule("traceur-runtime@0.0.87/node_modules/rsvp/lib/rsvp/asap.js",[],function(){"use strict";function t(t,e){h[c]=t,h[c+1]=e,c+=2,2===c&&o()}function e(){return function(){process.nextTick(u)}}function r(){var t=0,e=new l(u),r=document.createTextNode("");return e.observe(r,{characterData:!0}),function(){r.data=t=++t%2}}function n(){var t=new MessageChannel;return t.port1.onmessage=u,function(){t.port2.postMessage(0)}}function i(){return function(){setTimeout(u,1)}}function u(){for(var t=0;c>t;t+=2){var e=h[t],r=h[t+1];e(r),h[t]=void 0,h[t+1]=void 0}c=0}var o,c=0,a=t,s="undefined"!=typeof window?window:{},l=s.MutationObserver||s.WebKitMutationObserver,f="undefined"!=typeof Uint8ClampedArray&&"undefined"!=typeof importScripts&&"undefined"!=typeof MessageChannel,h=new Array(1e3);return o="undefined"!=typeof process&&"[object process]"==={}.toString.call(process)?e():l?r():f?n():i(),{get default(){return a}}}),System.registerModule("traceur-runtime@0.0.87/src/runtime/polyfills/Promise.js",[],function(){"use strict";function t(t){return t&&"object"==typeof t&&void 0!==t.status_}function e(t){return t}function r(t){throw t}function n(t){var n=void 0!==arguments[1]?arguments[1]:e,u=void 0!==arguments[2]?arguments[2]:r,o=i(t.constructor);switch(t.status_){case void 0:throw TypeError;case 0:t.onResolve_.push(n,o),t.onReject_.push(u,o);break;case 1:l(t.value_,[n,o]);break;case-1:l(t.value_,[u,o])}return o.promise}function i(t){if(this===d){var e=o(new d(v));return{promise:e,resolve:function(t){c(e,t)},reject:function(t){a(e,t)}}}var r={};return r.promise=new t(function(t,e){r.resolve=t,r.reject=e}),r}function u(t,e,r,n,i){return t.status_=e,t.value_=r,t.onResolve_=n,t.onReject_=i,t}function o(t){return u(t,0,void 0,[],[])}function c(t,e){s(t,1,e,t.onResolve_)}function a(t,e){s(t,-1,e,t.onReject_)}function s(t,e,r,n){0===t.status_&&(l(r,n),u(t,e,r))}function l(t,e){b(function(){for(var r=0;r<e.length;r+=2)f(t,e[r],e[r+1])})}function f(e,r,i){try{var u=r(e);if(u===i.promise)throw new TypeError;t(u)?n(u,i.resolve,i.reject):i.resolve(u)}catch(o){try{i.reject(o)}catch(o){}}}function h(t){return t&&("object"==typeof t||"function"==typeof t)}function m(e,r){if(!t(r)&&h(r)){var n;try{n=r.then}catch(u){var o=j.call(e,u);return r[w]=o,o}if("function"==typeof n){var c=r[w];if(c)return c;var a=i(e);r[w]=a.promise;try{n.call(r,a.resolve,a.reject)}catch(u){a.reject(u)}return a.promise}}return r}function p(t){t.Promise||(t.Promise=g)}var b=System.get("traceur-runtime@0.0.87/node_modules/rsvp/lib/rsvp/asap.js")["default"],y=System.get("traceur-runtime@0.0.87/src/runtime/polyfills/utils.js").registerPolyfill,v={},g=function(t){if(t!==v){if("function"!=typeof t)throw new TypeError;var e=o(this);try{t(function(t){c(e,t)},function(t){a(e,t)})}catch(r){a(e,r)}}};$traceurRuntime.createClass(g,{"catch":function(t){return this.then(void 0,t)},then:function(i,u){"function"!=typeof i&&(i=e),"function"!=typeof u&&(u=r);var o=this,c=this.constructor;return n(this,function(e){return e=m(c,e),e===o?u(new TypeError):t(e)?e.then(i,u):i(e)},u)}},{resolve:function(e){return this===d?t(e)?e:u(new d(v),1,e):new this(function(t,r){t(e);
})},reject:function(t){return this===d?u(new d(v),-1,t):new this(function(e,r){r(t)})},all:function(t){var e=i(this),r=[];try{var n=function(t){return function(n){r[t]=n,0===--u&&e.resolve(r)}},u=0,o=0,c=!0,a=!1,s=void 0;try{for(var l=void 0,f=t[$traceurRuntime.toProperty(Symbol.iterator)]();!(c=(l=f.next()).done);c=!0){var h=l.value,m=n(o);this.resolve(h).then(m,function(t){e.reject(t)}),++o,++u}}catch(p){a=!0,s=p}finally{try{c||null==f["return"]||f["return"]()}finally{if(a)throw s}}0===u&&e.resolve(r)}catch(b){e.reject(b)}return e.promise},race:function(t){var e=i(this);try{for(var r=0;r<t.length;r++)this.resolve(t[r]).then(function(t){e.resolve(t)},function(t){e.reject(t)})}catch(n){e.reject(n)}return e.promise}});var d=g,j=d.reject,w="@@thenable";return y(p),{get Promise(){return g},get polyfillPromise(){return p}}}),System.get("traceur-runtime@0.0.87/src/runtime/polyfills/Promise.js"),System.registerModule("traceur-runtime@0.0.87/src/runtime/polyfills/StringIterator.js",[],function(){"use strict";function t(t){var e=String(t),r=Object.create(s.prototype);return r[u(c)]=e,r[u(a)]=0,r}var e,r=System.get("traceur-runtime@0.0.87/src/runtime/polyfills/utils.js"),n=r.createIteratorResultObject,i=r.isObject,u=$traceurRuntime.toProperty,o=Object.prototype.hasOwnProperty,c=Symbol("iteratedString"),a=Symbol("stringIteratorNextIndex"),s=function(){};return $traceurRuntime.createClass(s,(e={},Object.defineProperty(e,"next",{value:function(){var t=this;if(!i(t)||!o.call(t,c))throw new TypeError("this must be a StringIterator object");var e=t[u(c)];if(void 0===e)return n(void 0,!0);var r=t[u(a)],s=e.length;if(r>=s)return t[u(c)]=void 0,n(void 0,!0);var l,f=e.charCodeAt(r);if(55296>f||f>56319||r+1===s)l=String.fromCharCode(f);else{var h=e.charCodeAt(r+1);l=56320>h||h>57343?String.fromCharCode(f):String.fromCharCode(f)+String.fromCharCode(h)}return t[u(a)]=r+l.length,n(l,!1)},configurable:!0,enumerable:!0,writable:!0}),Object.defineProperty(e,Symbol.iterator,{value:function(){return this},configurable:!0,enumerable:!0,writable:!0}),e),{}),{get createStringIterator(){return t}}}),System.registerModule("traceur-runtime@0.0.87/src/runtime/polyfills/String.js",[],function(){"use strict";function t(t){var e=String(this);if(null==this||"[object RegExp]"==p.call(t))throw TypeError();var r=e.length,n=String(t),i=(n.length,arguments.length>1?arguments[1]:void 0),u=i?Number(i):0;isNaN(u)&&(u=0);var o=Math.min(Math.max(u,0),r);return b.call(e,n,u)==o}function e(t){var e=String(this);if(null==this||"[object RegExp]"==p.call(t))throw TypeError();var r=e.length,n=String(t),i=n.length,u=r;if(arguments.length>1){var o=arguments[1];void 0!==o&&(u=o?Number(o):0,isNaN(u)&&(u=0))}var c=Math.min(Math.max(u,0),r),a=c-i;return 0>a?!1:y.call(e,n,a)==a}function r(t){if(null==this)throw TypeError();var e=String(this);if(t&&"[object RegExp]"==p.call(t))throw TypeError();var r=e.length,n=String(t),i=n.length,u=arguments.length>1?arguments[1]:void 0,o=u?Number(u):0;o!=o&&(o=0);var c=Math.min(Math.max(o,0),r);return i+c>r?!1:-1!=b.call(e,n,o)}function n(t){if(null==this)throw TypeError();var e=String(this),r=t?Number(t):0;if(isNaN(r)&&(r=0),0>r||r==1/0)throw RangeError();if(0==r)return"";for(var n="";r--;)n+=e;return n}function i(t){if(null==this)throw TypeError();var e=String(this),r=e.length,n=t?Number(t):0;if(isNaN(n)&&(n=0),0>n||n>=r)return void 0;var i,u=e.charCodeAt(n);return u>=55296&&56319>=u&&r>n+1&&(i=e.charCodeAt(n+1),i>=56320&&57343>=i)?1024*(u-55296)+i-56320+65536:u}function u(t){var e=t.raw,r=e.length>>>0;if(0===r)return"";for(var n="",i=0;;){if(n+=e[i],i+1===r)return n;n+=arguments[++i]}}function o(t){var e,r,n=[],i=Math.floor,u=-1,o=arguments.length;if(!o)return"";for(;++u<o;){var c=Number(arguments[u]);if(!isFinite(c)||0>c||c>1114111||i(c)!=c)throw RangeError("Invalid code point: "+c);65535>=c?n.push(c):(c-=65536,e=(c>>10)+55296,r=c%1024+56320,n.push(e,r))}return String.fromCharCode.apply(null,n)}function c(){var t=$traceurRuntime.checkObjectCoercible(this),e=String(t);return s(e)}function a(a){var s=a.String;f(s.prototype,["codePointAt",i,"endsWith",e,"includes",r,"repeat",n,"startsWith",t]),f(s,["fromCodePoint",o,"raw",u]),h(s.prototype,c,Symbol)}var s=System.get("traceur-runtime@0.0.87/src/runtime/polyfills/StringIterator.js").createStringIterator,l=System.get("traceur-runtime@0.0.87/src/runtime/polyfills/utils.js"),f=l.maybeAddFunctions,h=l.maybeAddIterator,m=l.registerPolyfill,p=Object.prototype.toString,b=String.prototype.indexOf,y=String.prototype.lastIndexOf;return m(a),{get startsWith(){return t},get endsWith(){return e},get includes(){return r},get repeat(){return n},get codePointAt(){return i},get raw(){return u},get fromCodePoint(){return o},get stringPrototypeIterator(){return c},get polyfillString(){return a}}}),System.get("traceur-runtime@0.0.87/src/runtime/polyfills/String.js"),System.registerModule("traceur-runtime@0.0.87/src/runtime/polyfills/ArrayIterator.js",[],function(){"use strict";function t(t,e){var r=o(t),n=new h;return n.iteratorObject_=r,n.arrayIteratorNextIndex_=0,n.arrayIterationKind_=e,n}function e(){return t(this,f)}function r(){return t(this,s)}function n(){return t(this,l)}var i,u=System.get("traceur-runtime@0.0.87/src/runtime/polyfills/utils.js"),o=u.toObject,c=u.toUint32,a=u.createIteratorResultObject,s=1,l=2,f=3,h=function(){};return $traceurRuntime.createClass(h,(i={},Object.defineProperty(i,"next",{value:function(){var t=o(this),e=t.iteratorObject_;if(!e)throw new TypeError("Object is not an ArrayIterator");var r=t.arrayIteratorNextIndex_,n=t.arrayIterationKind_,i=c(e.length);return r>=i?(t.arrayIteratorNextIndex_=1/0,a(void 0,!0)):(t.arrayIteratorNextIndex_=r+1,n==l?a(e[r],!1):n==f?a([r,e[r]],!1):a(r,!1))},configurable:!0,enumerable:!0,writable:!0}),Object.defineProperty(i,Symbol.iterator,{value:function(){return this},configurable:!0,enumerable:!0,writable:!0}),i),{}),{get entries(){return e},get keys(){return r},get values(){return n}}}),System.registerModule("traceur-runtime@0.0.87/src/runtime/polyfills/Array.js",[],function(){"use strict";function t(t){var e,r,n=arguments[1],i=arguments[2],u=this,o=j(t),c=void 0!==n,a=0;if(c&&!m(n))throw TypeError();if(h(o)){e=p(u)?new u:[];var s=!0,l=!1,f=void 0;try{for(var b=void 0,y=o[$traceurRuntime.toProperty(Symbol.iterator)]();!(s=(b=y.next()).done);s=!0){var v=b.value;c?e[a]=n.call(i,v,a):e[a]=v,a++}}catch(g){l=!0,f=g}finally{try{s||null==y["return"]||y["return"]()}finally{if(l)throw f}}return e.length=a,e}for(r=d(o.length),e=p(u)?new u(r):new Array(r);r>a;a++)c?e[a]="undefined"==typeof i?n(o[a],a):n.call(i,o[a],a):e[a]=o[a];return e.length=r,e}function e(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];for(var r=this,n=t.length,i=p(r)?new r(n):new Array(n),u=0;n>u;u++)i[u]=t[u];return i.length=n,i}function r(t){var e=void 0!==arguments[1]?arguments[1]:0,r=arguments[2],n=j(this),i=d(n.length),u=g(e),o=void 0!==r?g(r):i;for(u=0>u?Math.max(i+u,0):Math.min(u,i),o=0>o?Math.max(i+o,0):Math.min(o,i);o>u;)n[u]=t,u++;return n}function n(t){var e=arguments[1];return u(this,t,e)}function i(t){var e=arguments[1];return u(this,t,e,!0)}function u(t,e){var r=arguments[2],n=void 0!==arguments[3]?arguments[3]:!1,i=j(t),u=d(i.length);if(!m(e))throw TypeError();for(var o=0;u>o;o++){var c=i[o];if(e.call(r,c,o,i))return n?o:c}return n?-1:void 0}function o(u){var o=u,c=o.Array,f=o.Object,h=o.Symbol,m=l;h&&h.iterator&&c.prototype[h.iterator]&&(m=c.prototype[h.iterator]),b(c.prototype,["entries",a,"keys",s,"values",m,"fill",r,"find",n,"findIndex",i]),b(c,["from",t,"of",e]),y(c.prototype,m,h),y(f.getPrototypeOf([].values()),function(){return this},h)}var c=System.get("traceur-runtime@0.0.87/src/runtime/polyfills/ArrayIterator.js"),a=c.entries,s=c.keys,l=c.values,f=System.get("traceur-runtime@0.0.87/src/runtime/polyfills/utils.js"),h=f.checkIterable,m=f.isCallable,p=f.isConstructor,b=f.maybeAddFunctions,y=f.maybeAddIterator,v=f.registerPolyfill,g=f.toInteger,d=f.toLength,j=f.toObject;return v(o),{get from(){return t},get of(){return e},get fill(){return r},get find(){return n},get findIndex(){return i},get polyfillArray(){return o}}}),System.get("traceur-runtime@0.0.87/src/runtime/polyfills/Array.js"),System.registerModule("traceur-runtime@0.0.87/src/runtime/polyfills/Object.js",[],function(){"use strict";function t(t,e){return t===e?0!==t||1/t===1/e:t!==t&&e!==e}function e(t){for(var e=1;e<arguments.length;e++){var r=arguments[e],n=null==r?[]:h(r),i=void 0,u=n.length;for(i=0;u>i;i++){var o=n[i];f(o)||(t[o]=r[o])}}return t}function r(t,e){var r,n,i=l(e),u=i.length;for(r=0;u>r;r++){var o=i[r];f(o)||(n=s(e,i[r]),a(t,i[r],n))}return t}function n(n){var i=n.Object;u(i,["assign",e,"is",t,"mixin",r])}var i=System.get("traceur-runtime@0.0.87/src/runtime/polyfills/utils.js"),u=i.maybeAddFunctions,o=i.registerPolyfill,c=$traceurRuntime,a=c.defineProperty,s=c.getOwnPropertyDescriptor,l=c.getOwnPropertyNames,f=c.isPrivateName,h=c.keys;return o(n),{get is(){return t},get assign(){return e},get mixin(){return r},get polyfillObject(){return n}}}),System.get("traceur-runtime@0.0.87/src/runtime/polyfills/Object.js"),System.registerModule("traceur-runtime@0.0.87/src/runtime/polyfills/Number.js",[],function(){"use strict";function t(t){return o(t)&&h(t)}function e(e){return t(e)&&l(e)===e}function r(t){return o(t)&&m(t)}function n(e){if(t(e)){var r=l(e);if(r===e)return f(r)<=p}return!1}function i(i){var u=i.Number;c(u,["MAX_SAFE_INTEGER",p,"MIN_SAFE_INTEGER",b,"EPSILON",y]),a(u,["isFinite",t,"isInteger",e,"isNaN",r,"isSafeInteger",n])}var u=System.get("traceur-runtime@0.0.87/src/runtime/polyfills/utils.js"),o=u.isNumber,c=u.maybeAddConsts,a=u.maybeAddFunctions,s=u.registerPolyfill,l=u.toInteger,f=Math.abs,h=isFinite,m=isNaN,p=Math.pow(2,53)-1,b=-Math.pow(2,53)+1,y=Math.pow(2,-52);return s(i),{get MAX_SAFE_INTEGER(){return p},get MIN_SAFE_INTEGER(){return b},get EPSILON(){return y},get isFinite(){return t},get isInteger(){return e},get isNaN(){return r},get isSafeInteger(){return n},get polyfillNumber(){return i}}}),System.get("traceur-runtime@0.0.87/src/runtime/polyfills/Number.js"),System.registerModule("traceur-runtime@0.0.87/src/runtime/polyfills/fround.js",[],function(){"use strict";function t(t,e,r){function n(t){var e=l(t),r=t-e;return.5>r?e:r>.5?e+1:e%2?e+1:e}var i,u,o,c,p,b,y,v=(1<<e-1)-1;for(t!==t?(u=(1<<e)-1,o=m(2,r-1),i=0):t===1/0||t===-(1/0)?(u=(1<<e)-1,o=0,i=0>t?1:0):0===t?(u=0,o=0,i=1/t===-(1/0)?1:0):(i=0>t,t=s(t),t>=m(2,1-v)?(u=h(l(f(t)/a),1023),o=n(t/m(2,u)*m(2,r)),o/m(2,r)>=2&&(u+=1,o=1),u>v?(u=(1<<e)-1,o=0):(u+=v,o-=m(2,r))):(u=0,o=n(t/m(2,1-v-r)))),p=[],c=r;c;c-=1)p.push(o%2?1:0),o=l(o/2);for(c=e;c;c-=1)p.push(u%2?1:0),u=l(u/2);for(p.push(i?1:0),p.reverse(),b=p.join(""),y=[];b.length;)y.push(parseInt(b.substring(0,8),2)),b=b.substring(8);return y}function e(t,e,r){var n,i,u,o,c,a,s,l,f=[];for(n=t.length;n;n-=1)for(u=t[n-1],i=8;i;i-=1)f.push(u%2?1:0),u>>=1;return f.reverse(),o=f.join(""),c=(1<<e-1)-1,a=parseInt(o.substring(0,1),2)?-1:1,s=parseInt(o.substring(1,1+e),2),l=parseInt(o.substring(1+e),2),s===(1<<e)-1?0!==l?NaN:a*(1/0):s>0?a*m(2,s-c)*(1+l/m(2,r)):0!==l?a*m(2,-(c-1))*(l/m(2,r)):0>a?-0:0}function r(t){return e(t,8,23)}function n(e){return t(e,8,23)}function i(t){return 0===t||!u(t)||o(t)?t:r(n(Number(t)))}var u=isFinite,o=isNaN,c=Math,a=c.LN2,s=c.abs,l=c.floor,f=c.log,h=c.min,m=c.pow;return{get fround(){return i}}}),System.registerModule("traceur-runtime@0.0.87/src/runtime/polyfills/Math.js",[],function(){"use strict";function t(t){if(t=S(+t),0==t)return 32;var e=0;return 0===(4294901760&t)&&(t<<=16,e+=16),0===(4278190080&t)&&(t<<=8,e+=8),0===(4026531840&t)&&(t<<=4,e+=4),0===(3221225472&t)&&(t<<=2,e+=2),0===(2147483648&t)&&(t<<=1,e+=1),e}function e(t,e){t=S(+t),e=S(+e);var r=t>>>16&65535,n=65535&t,i=e>>>16&65535,u=65535&e;return n*u+(r*u+n*i<<16>>>0)|0}function r(t){return t=+t,t>0?1:0>t?-1:t}function n(t){return.4342944819032518*I(t)}function i(t){return 1.4426950408889634*I(t)}function u(t){if(t=+t,-1>t||_(t))return NaN;if(0===t||t===1/0)return t;if(-1===t)return-(1/0);var e=0,r=50;if(0>t||t>1)return I(1+t);for(var n=1;r>n;n++)n%2===0?e-=k(t,n)/n:e+=k(t,n)/n;return e}function o(t){return t=+t,t===-(1/0)?-1:R(t)&&0!==t?x(t)-1:t}function c(t){return t=+t,0===t?1:_(t)?NaN:R(t)?(0>t&&(t=-t),t>21?x(t)/2:(x(t)+x(-t))/2):1/0}function a(t){return t=+t,R(t)&&0!==t?(x(t)-x(-t))/2:t}function s(t){if(t=+t,0===t)return t;if(!R(t))return r(t);var e=x(t),n=x(-t);return(e-n)/(e+n)}function l(t){return t=+t,1>t?NaN:R(t)?I(t+N(t+1)*N(t-1)):t}function f(t){return t=+t,0!==t&&R(t)?t>0?I(t+N(t*t+1)):-I(-t+N(t*t+1)):t}function h(t){return t=+t,-1===t?-(1/0):1===t?1/0:0===t?t:_(t)||-1>t||t>1?NaN:.5*I((1+t)/(1-t))}function m(t,e){for(var r=arguments.length,n=new Array(r),i=0,u=0;r>u;u++){var o=arguments[u];if(o=+o,o===1/0||o===-(1/0))return 1/0;o=M(o),o>i&&(i=o),n[u]=o}0===i&&(i=1);for(var c=0,a=0,u=0;r>u;u++){var o=n[u]/i,s=o*o-a,l=c+s;a=l-c-s,c=l}return N(c)*i}function p(t){return t=+t,t>0?E(t):0>t?$(t):t}function b(t){if(t=+t,0===t)return t;var e=0>t;e&&(t=-t);var r=k(t,1/3);return e?-r:r}function y(y){var g=y.Math;w(g,["acosh",l,"asinh",f,"atanh",h,"cbrt",b,"clz32",t,"cosh",c,"expm1",o,"fround",v,"hypot",m,"imul",e,"log10",n,"log1p",u,"log2",i,"sign",r,"sinh",a,"tanh",s,"trunc",p])}var v,g,d=System.get("traceur-runtime@0.0.87/src/runtime/polyfills/fround.js").fround,j=System.get("traceur-runtime@0.0.87/src/runtime/polyfills/utils.js"),w=j.maybeAddFunctions,O=j.registerPolyfill,S=j.toUint32,R=isFinite,_=isNaN,P=Math,M=P.abs,$=P.ceil,x=P.exp,E=P.floor,I=P.log,k=P.pow,N=P.sqrt;return"function"==typeof Float32Array?(g=new Float32Array(1),v=function(t){return g[0]=Number(t),g[0]}):v=d,O(y),{get clz32(){return t},get imul(){return e},get sign(){return r},get log10(){return n},get log2(){return i},get log1p(){return u},get expm1(){return o},get cosh(){return c},get sinh(){return a},get tanh(){return s},get acosh(){return l},get asinh(){return f},get atanh(){return h},get hypot(){return m},get trunc(){return p},get fround(){return v},get cbrt(){return b},get polyfillMath(){return y}}}),System.get("traceur-runtime@0.0.87/src/runtime/polyfills/Math.js"),System.registerModule("traceur-runtime@0.0.87/src/runtime/polyfills/polyfills.js",[],function(){"use strict";var t=System.get("traceur-runtime@0.0.87/src/runtime/polyfills/utils.js").polyfillAll;t(Reflect.global);var e=$traceurRuntime.setupGlobals;return $traceurRuntime.setupGlobals=function(r){e(r),t(r)},{}}),System.get("traceur-runtime@0.0.87/src/runtime/polyfills/polyfills.js"),this.System=this._System,delete this._System;
/*[production-config]*/
steal = ((typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope) ? self : window).steal || {};
steal.env = "production";
steal.configMain = "package.json!npm";
/*steal*/
!function(e){"object"==typeof exports?module.exports=e():"function"==typeof define&&define.amd?define(e):"undefined"!=typeof window?window.Promise=e():"undefined"!=typeof global?global.Promise=e():"undefined"!=typeof self&&(self.Promise=e())}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/** @license MIT License (c) copyright 2010-2014 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

/**
 * ES6 global Promise shim
 */
var unhandledRejections = require('../lib/decorators/unhandledRejection');
var PromiseConstructor = unhandledRejections(require('../lib/Promise'));

module.exports = typeof global != 'undefined' ? (global.Promise = PromiseConstructor)
	           : typeof self   != 'undefined' ? (self.Promise   = PromiseConstructor)
	           : PromiseConstructor;

},{"../lib/Promise":2,"../lib/decorators/unhandledRejection":4}],2:[function(require,module,exports){
/** @license MIT License (c) copyright 2010-2014 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

(function(define) { 'use strict';
define(function (require) {

	var makePromise = require('./makePromise');
	var Scheduler = require('./Scheduler');
	var async = require('./env').asap;

	return makePromise({
		scheduler: new Scheduler(async)
	});

});
})(typeof define === 'function' && define.amd ? define : function (factory) { module.exports = factory(require); });

},{"./Scheduler":3,"./env":5,"./makePromise":7}],3:[function(require,module,exports){
/** @license MIT License (c) copyright 2010-2014 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

(function(define) { 'use strict';
define(function() {

	// Credit to Twisol (https://github.com/Twisol) for suggesting
	// this type of extensible queue + trampoline approach for next-tick conflation.

	/**
	 * Async task scheduler
	 * @param {function} async function to schedule a single async function
	 * @constructor
	 */
	function Scheduler(async) {
		this._async = async;
		this._running = false;

		this._queue = this;
		this._queueLen = 0;
		this._afterQueue = {};
		this._afterQueueLen = 0;

		var self = this;
		this.drain = function() {
			self._drain();
		};
	}

	/**
	 * Enqueue a task
	 * @param {{ run:function }} task
	 */
	Scheduler.prototype.enqueue = function(task) {
		this._queue[this._queueLen++] = task;
		this.run();
	};

	/**
	 * Enqueue a task to run after the main task queue
	 * @param {{ run:function }} task
	 */
	Scheduler.prototype.afterQueue = function(task) {
		this._afterQueue[this._afterQueueLen++] = task;
		this.run();
	};

	Scheduler.prototype.run = function() {
		if (!this._running) {
			this._running = true;
			this._async(this.drain);
		}
	};

	/**
	 * Drain the handler queue entirely, and then the after queue
	 */
	Scheduler.prototype._drain = function() {
		var i = 0;
		for (; i < this._queueLen; ++i) {
			this._queue[i].run();
			this._queue[i] = void 0;
		}

		this._queueLen = 0;
		this._running = false;

		for (i = 0; i < this._afterQueueLen; ++i) {
			this._afterQueue[i].run();
			this._afterQueue[i] = void 0;
		}

		this._afterQueueLen = 0;
	};

	return Scheduler;

});
}(typeof define === 'function' && define.amd ? define : function(factory) { module.exports = factory(); }));

},{}],4:[function(require,module,exports){
/** @license MIT License (c) copyright 2010-2014 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

(function(define) { 'use strict';
define(function(require) {

	var setTimer = require('../env').setTimer;
	var format = require('../format');

	return function unhandledRejection(Promise) {

		var logError = noop;
		var logInfo = noop;
		var localConsole;

		if(typeof console !== 'undefined') {
			// Alias console to prevent things like uglify's drop_console option from
			// removing console.log/error. Unhandled rejections fall into the same
			// category as uncaught exceptions, and build tools shouldn't silence them.
			localConsole = console;
			logError = typeof localConsole.error !== 'undefined'
				? function (e) { localConsole.error(e); }
				: function (e) { localConsole.log(e); };

			logInfo = typeof localConsole.info !== 'undefined'
				? function (e) { localConsole.info(e); }
				: function (e) { localConsole.log(e); };
		}

		Promise.onPotentiallyUnhandledRejection = function(rejection) {
			enqueue(report, rejection);
		};

		Promise.onPotentiallyUnhandledRejectionHandled = function(rejection) {
			enqueue(unreport, rejection);
		};

		Promise.onFatalRejection = function(rejection) {
			enqueue(throwit, rejection.value);
		};

		var tasks = [];
		var reported = [];
		var running = null;

		function report(r) {
			if(!r.handled) {
				reported.push(r);
				logError('Potentially unhandled rejection [' + r.id + '] ' + format.formatError(r.value));
			}
		}

		function unreport(r) {
			var i = reported.indexOf(r);
			if(i >= 0) {
				reported.splice(i, 1);
				logInfo('Handled previous rejection [' + r.id + '] ' + format.formatObject(r.value));
			}
		}

		function enqueue(f, x) {
			tasks.push(f, x);
			if(running === null) {
				running = setTimer(flush, 0);
			}
		}

		function flush() {
			running = null;
			while(tasks.length > 0) {
				tasks.shift()(tasks.shift());
			}
		}

		return Promise;
	};

	function throwit(e) {
		throw e;
	}

	function noop() {}

});
}(typeof define === 'function' && define.amd ? define : function(factory) { module.exports = factory(require); }));

},{"../env":5,"../format":6}],5:[function(require,module,exports){
/** @license MIT License (c) copyright 2010-2014 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

/*global process,document,setTimeout,clearTimeout,MutationObserver,WebKitMutationObserver*/
(function(define) { 'use strict';
define(function(require) {
	/*jshint maxcomplexity:6*/

	// Sniff "best" async scheduling option
	// Prefer process.nextTick or MutationObserver, then check for
	// setTimeout, and finally vertx, since its the only env that doesn't
	// have setTimeout

	var MutationObs;
	var capturedSetTimeout = typeof setTimeout !== 'undefined' && setTimeout;

	// Default env
	var setTimer = function(f, ms) { return setTimeout(f, ms); };
	var clearTimer = function(t) { return clearTimeout(t); };
	var asap = function (f) { return capturedSetTimeout(f, 0); };

	// Detect specific env
	if (isNode()) { // Node
		asap = function (f) { return process.nextTick(f); };

	} else if (MutationObs = hasMutationObserver()) { // Modern browser
		asap = initMutationObserver(MutationObs);

	} else if (!capturedSetTimeout) { // vert.x
		var vertxRequire = require;
		var vertx = vertxRequire('vertx');
		setTimer = function (f, ms) { return vertx.setTimer(ms, f); };
		clearTimer = vertx.cancelTimer;
		asap = vertx.runOnLoop || vertx.runOnContext;
	}

	return {
		setTimer: setTimer,
		clearTimer: clearTimer,
		asap: asap
	};

	function isNode () {
		return typeof process !== 'undefined' && process !== null &&
			typeof process.nextTick === 'function';
	}

	function hasMutationObserver () {
		return (typeof MutationObserver === 'function' && MutationObserver) ||
			(typeof WebKitMutationObserver === 'function' && WebKitMutationObserver);
	}

	function initMutationObserver(MutationObserver) {
		var scheduled;
		var node = document.createTextNode('');
		var o = new MutationObserver(run);
		o.observe(node, { characterData: true });

		function run() {
			var f = scheduled;
			scheduled = void 0;
			f();
		}

		var i = 0;
		return function (f) {
			scheduled = f;
			node.data = (i ^= 1);
		};
	}
});
}(typeof define === 'function' && define.amd ? define : function(factory) { module.exports = factory(require); }));

},{}],6:[function(require,module,exports){
/** @license MIT License (c) copyright 2010-2014 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

(function(define) { 'use strict';
define(function() {

	return {
		formatError: formatError,
		formatObject: formatObject,
		tryStringify: tryStringify
	};

	/**
	 * Format an error into a string.  If e is an Error and has a stack property,
	 * it's returned.  Otherwise, e is formatted using formatObject, with a
	 * warning added about e not being a proper Error.
	 * @param {*} e
	 * @returns {String} formatted string, suitable for output to developers
	 */
	function formatError(e) {
		var s = typeof e === 'object' && e !== null && e.stack ? e.stack : formatObject(e);
		return e instanceof Error ? s : s + ' (WARNING: non-Error used)';
	}

	/**
	 * Format an object, detecting "plain" objects and running them through
	 * JSON.stringify if possible.
	 * @param {Object} o
	 * @returns {string}
	 */
	function formatObject(o) {
		var s = String(o);
		if(s === '[object Object]' && typeof JSON !== 'undefined') {
			s = tryStringify(o, s);
		}
		return s;
	}

	/**
	 * Try to return the result of JSON.stringify(x).  If that fails, return
	 * defaultValue
	 * @param {*} x
	 * @param {*} defaultValue
	 * @returns {String|*} JSON.stringify(x) or defaultValue
	 */
	function tryStringify(x, defaultValue) {
		try {
			return JSON.stringify(x);
		} catch(e) {
			return defaultValue;
		}
	}

});
}(typeof define === 'function' && define.amd ? define : function(factory) { module.exports = factory(); }));

},{}],7:[function(require,module,exports){
/** @license MIT License (c) copyright 2010-2014 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

(function(define) { 'use strict';
define(function() {

	return function makePromise(environment) {

		var tasks = environment.scheduler;
		var emitRejection = initEmitRejection();

		var objectCreate = Object.create ||
			function(proto) {
				function Child() {}
				Child.prototype = proto;
				return new Child();
			};

		/**
		 * Create a promise whose fate is determined by resolver
		 * @constructor
		 * @returns {Promise} promise
		 * @name Promise
		 */
		function Promise(resolver, handler) {
			this._handler = resolver === Handler ? handler : init(resolver);
		}

		/**
		 * Run the supplied resolver
		 * @param resolver
		 * @returns {Pending}
		 */
		function init(resolver) {
			var handler = new Pending();

			try {
				resolver(promiseResolve, promiseReject, promiseNotify);
			} catch (e) {
				promiseReject(e);
			}

			return handler;

			/**
			 * Transition from pre-resolution state to post-resolution state, notifying
			 * all listeners of the ultimate fulfillment or rejection
			 * @param {*} x resolution value
			 */
			function promiseResolve (x) {
				handler.resolve(x);
			}
			/**
			 * Reject this promise with reason, which will be used verbatim
			 * @param {Error|*} reason rejection reason, strongly suggested
			 *   to be an Error type
			 */
			function promiseReject (reason) {
				handler.reject(reason);
			}

			/**
			 * @deprecated
			 * Issue a progress event, notifying all progress listeners
			 * @param {*} x progress event payload to pass to all listeners
			 */
			function promiseNotify (x) {
				handler.notify(x);
			}
		}

		// Creation

		Promise.resolve = resolve;
		Promise.reject = reject;
		Promise.never = never;

		Promise._defer = defer;
		Promise._handler = getHandler;

		/**
		 * Returns a trusted promise. If x is already a trusted promise, it is
		 * returned, otherwise returns a new trusted Promise which follows x.
		 * @param  {*} x
		 * @return {Promise} promise
		 */
		function resolve(x) {
			return isPromise(x) ? x
				: new Promise(Handler, new Async(getHandler(x)));
		}

		/**
		 * Return a reject promise with x as its reason (x is used verbatim)
		 * @param {*} x
		 * @returns {Promise} rejected promise
		 */
		function reject(x) {
			return new Promise(Handler, new Async(new Rejected(x)));
		}

		/**
		 * Return a promise that remains pending forever
		 * @returns {Promise} forever-pending promise.
		 */
		function never() {
			return foreverPendingPromise; // Should be frozen
		}

		/**
		 * Creates an internal {promise, resolver} pair
		 * @private
		 * @returns {Promise}
		 */
		function defer() {
			return new Promise(Handler, new Pending());
		}

		// Transformation and flow control

		/**
		 * Transform this promise's fulfillment value, returning a new Promise
		 * for the transformed result.  If the promise cannot be fulfilled, onRejected
		 * is called with the reason.  onProgress *may* be called with updates toward
		 * this promise's fulfillment.
		 * @param {function=} onFulfilled fulfillment handler
		 * @param {function=} onRejected rejection handler
		 * @param {function=} onProgress @deprecated progress handler
		 * @return {Promise} new promise
		 */
		Promise.prototype.then = function(onFulfilled, onRejected, onProgress) {
			var parent = this._handler;
			var state = parent.join().state();

			if ((typeof onFulfilled !== 'function' && state > 0) ||
				(typeof onRejected !== 'function' && state < 0)) {
				// Short circuit: value will not change, simply share handler
				return new this.constructor(Handler, parent);
			}

			var p = this._beget();
			var child = p._handler;

			parent.chain(child, parent.receiver, onFulfilled, onRejected, onProgress);

			return p;
		};

		/**
		 * If this promise cannot be fulfilled due to an error, call onRejected to
		 * handle the error. Shortcut for .then(undefined, onRejected)
		 * @param {function?} onRejected
		 * @return {Promise}
		 */
		Promise.prototype['catch'] = function(onRejected) {
			return this.then(void 0, onRejected);
		};

		/**
		 * Creates a new, pending promise of the same type as this promise
		 * @private
		 * @returns {Promise}
		 */
		Promise.prototype._beget = function() {
			return begetFrom(this._handler, this.constructor);
		};

		function begetFrom(parent, Promise) {
			var child = new Pending(parent.receiver, parent.join().context);
			return new Promise(Handler, child);
		}

		// Array combinators

		Promise.all = all;
		Promise.race = race;
		Promise._traverse = traverse;

		/**
		 * Return a promise that will fulfill when all promises in the
		 * input array have fulfilled, or will reject when one of the
		 * promises rejects.
		 * @param {array} promises array of promises
		 * @returns {Promise} promise for array of fulfillment values
		 */
		function all(promises) {
			return traverseWith(snd, null, promises);
		}

		/**
		 * Array<Promise<X>> -> Promise<Array<f(X)>>
		 * @private
		 * @param {function} f function to apply to each promise's value
		 * @param {Array} promises array of promises
		 * @returns {Promise} promise for transformed values
		 */
		function traverse(f, promises) {
			return traverseWith(tryCatch2, f, promises);
		}

		function traverseWith(tryMap, f, promises) {
			var handler = typeof f === 'function' ? mapAt : settleAt;

			var resolver = new Pending();
			var pending = promises.length >>> 0;
			var results = new Array(pending);

			for (var i = 0, x; i < promises.length && !resolver.resolved; ++i) {
				x = promises[i];

				if (x === void 0 && !(i in promises)) {
					--pending;
					continue;
				}

				traverseAt(promises, handler, i, x, resolver);
			}

			if(pending === 0) {
				resolver.become(new Fulfilled(results));
			}

			return new Promise(Handler, resolver);

			function mapAt(i, x, resolver) {
				if(!resolver.resolved) {
					traverseAt(promises, settleAt, i, tryMap(f, x, i), resolver);
				}
			}

			function settleAt(i, x, resolver) {
				results[i] = x;
				if(--pending === 0) {
					resolver.become(new Fulfilled(results));
				}
			}
		}

		function traverseAt(promises, handler, i, x, resolver) {
			if (maybeThenable(x)) {
				var h = getHandlerMaybeThenable(x);
				var s = h.state();

				if (s === 0) {
					h.fold(handler, i, void 0, resolver);
				} else if (s > 0) {
					handler(i, h.value, resolver);
				} else {
					resolver.become(h);
					visitRemaining(promises, i+1, h);
				}
			} else {
				handler(i, x, resolver);
			}
		}

		Promise._visitRemaining = visitRemaining;
		function visitRemaining(promises, start, handler) {
			for(var i=start; i<promises.length; ++i) {
				markAsHandled(getHandler(promises[i]), handler);
			}
		}

		function markAsHandled(h, handler) {
			if(h === handler) {
				return;
			}

			var s = h.state();
			if(s === 0) {
				h.visit(h, void 0, h._unreport);
			} else if(s < 0) {
				h._unreport();
			}
		}

		/**
		 * Fulfill-reject competitive race. Return a promise that will settle
		 * to the same state as the earliest input promise to settle.
		 *
		 * WARNING: The ES6 Promise spec requires that race()ing an empty array
		 * must return a promise that is pending forever.  This implementation
		 * returns a singleton forever-pending promise, the same singleton that is
		 * returned by Promise.never(), thus can be checked with ===
		 *
		 * @param {array} promises array of promises to race
		 * @returns {Promise} if input is non-empty, a promise that will settle
		 * to the same outcome as the earliest input promise to settle. if empty
		 * is empty, returns a promise that will never settle.
		 */
		function race(promises) {
			if(typeof promises !== 'object' || promises === null) {
				return reject(new TypeError('non-iterable passed to race()'));
			}

			// Sigh, race([]) is untestable unless we return *something*
			// that is recognizable without calling .then() on it.
			return promises.length === 0 ? never()
				 : promises.length === 1 ? resolve(promises[0])
				 : runRace(promises);
		}

		function runRace(promises) {
			var resolver = new Pending();
			var i, x, h;
			for(i=0; i<promises.length; ++i) {
				x = promises[i];
				if (x === void 0 && !(i in promises)) {
					continue;
				}

				h = getHandler(x);
				if(h.state() !== 0) {
					resolver.become(h);
					visitRemaining(promises, i+1, h);
					break;
				} else {
					h.visit(resolver, resolver.resolve, resolver.reject);
				}
			}
			return new Promise(Handler, resolver);
		}

		// Promise internals
		// Below this, everything is @private

		/**
		 * Get an appropriate handler for x, without checking for cycles
		 * @param {*} x
		 * @returns {object} handler
		 */
		function getHandler(x) {
			if(isPromise(x)) {
				return x._handler.join();
			}
			return maybeThenable(x) ? getHandlerUntrusted(x) : new Fulfilled(x);
		}

		/**
		 * Get a handler for thenable x.
		 * NOTE: You must only call this if maybeThenable(x) == true
		 * @param {object|function|Promise} x
		 * @returns {object} handler
		 */
		function getHandlerMaybeThenable(x) {
			return isPromise(x) ? x._handler.join() : getHandlerUntrusted(x);
		}

		/**
		 * Get a handler for potentially untrusted thenable x
		 * @param {*} x
		 * @returns {object} handler
		 */
		function getHandlerUntrusted(x) {
			try {
				var untrustedThen = x.then;
				return typeof untrustedThen === 'function'
					? new Thenable(untrustedThen, x)
					: new Fulfilled(x);
			} catch(e) {
				return new Rejected(e);
			}
		}

		/**
		 * Handler for a promise that is pending forever
		 * @constructor
		 */
		function Handler() {}

		Handler.prototype.when
			= Handler.prototype.become
			= Handler.prototype.notify // deprecated
			= Handler.prototype.fail
			= Handler.prototype._unreport
			= Handler.prototype._report
			= noop;

		Handler.prototype._state = 0;

		Handler.prototype.state = function() {
			return this._state;
		};

		/**
		 * Recursively collapse handler chain to find the handler
		 * nearest to the fully resolved value.
		 * @returns {object} handler nearest the fully resolved value
		 */
		Handler.prototype.join = function() {
			var h = this;
			while(h.handler !== void 0) {
				h = h.handler;
			}
			return h;
		};

		Handler.prototype.chain = function(to, receiver, fulfilled, rejected, progress) {
			this.when({
				resolver: to,
				receiver: receiver,
				fulfilled: fulfilled,
				rejected: rejected,
				progress: progress
			});
		};

		Handler.prototype.visit = function(receiver, fulfilled, rejected, progress) {
			this.chain(failIfRejected, receiver, fulfilled, rejected, progress);
		};

		Handler.prototype.fold = function(f, z, c, to) {
			this.when(new Fold(f, z, c, to));
		};

		/**
		 * Handler that invokes fail() on any handler it becomes
		 * @constructor
		 */
		function FailIfRejected() {}

		inherit(Handler, FailIfRejected);

		FailIfRejected.prototype.become = function(h) {
			h.fail();
		};

		var failIfRejected = new FailIfRejected();

		/**
		 * Handler that manages a queue of consumers waiting on a pending promise
		 * @constructor
		 */
		function Pending(receiver, inheritedContext) {
			Promise.createContext(this, inheritedContext);

			this.consumers = void 0;
			this.receiver = receiver;
			this.handler = void 0;
			this.resolved = false;
		}

		inherit(Handler, Pending);

		Pending.prototype._state = 0;

		Pending.prototype.resolve = function(x) {
			this.become(getHandler(x));
		};

		Pending.prototype.reject = function(x) {
			if(this.resolved) {
				return;
			}

			this.become(new Rejected(x));
		};

		Pending.prototype.join = function() {
			if (!this.resolved) {
				return this;
			}

			var h = this;

			while (h.handler !== void 0) {
				h = h.handler;
				if (h === this) {
					return this.handler = cycle();
				}
			}

			return h;
		};

		Pending.prototype.run = function() {
			var q = this.consumers;
			var handler = this.handler;
			this.handler = this.handler.join();
			this.consumers = void 0;

			for (var i = 0; i < q.length; ++i) {
				handler.when(q[i]);
			}
		};

		Pending.prototype.become = function(handler) {
			if(this.resolved) {
				return;
			}

			this.resolved = true;
			this.handler = handler;
			if(this.consumers !== void 0) {
				tasks.enqueue(this);
			}

			if(this.context !== void 0) {
				handler._report(this.context);
			}
		};

		Pending.prototype.when = function(continuation) {
			if(this.resolved) {
				tasks.enqueue(new ContinuationTask(continuation, this.handler));
			} else {
				if(this.consumers === void 0) {
					this.consumers = [continuation];
				} else {
					this.consumers.push(continuation);
				}
			}
		};

		/**
		 * @deprecated
		 */
		Pending.prototype.notify = function(x) {
			if(!this.resolved) {
				tasks.enqueue(new ProgressTask(x, this));
			}
		};

		Pending.prototype.fail = function(context) {
			var c = typeof context === 'undefined' ? this.context : context;
			this.resolved && this.handler.join().fail(c);
		};

		Pending.prototype._report = function(context) {
			this.resolved && this.handler.join()._report(context);
		};

		Pending.prototype._unreport = function() {
			this.resolved && this.handler.join()._unreport();
		};

		/**
		 * Wrap another handler and force it into a future stack
		 * @param {object} handler
		 * @constructor
		 */
		function Async(handler) {
			this.handler = handler;
		}

		inherit(Handler, Async);

		Async.prototype.when = function(continuation) {
			tasks.enqueue(new ContinuationTask(continuation, this));
		};

		Async.prototype._report = function(context) {
			this.join()._report(context);
		};

		Async.prototype._unreport = function() {
			this.join()._unreport();
		};

		/**
		 * Handler that wraps an untrusted thenable and assimilates it in a future stack
		 * @param {function} then
		 * @param {{then: function}} thenable
		 * @constructor
		 */
		function Thenable(then, thenable) {
			Pending.call(this);
			tasks.enqueue(new AssimilateTask(then, thenable, this));
		}

		inherit(Pending, Thenable);

		/**
		 * Handler for a fulfilled promise
		 * @param {*} x fulfillment value
		 * @constructor
		 */
		function Fulfilled(x) {
			Promise.createContext(this);
			this.value = x;
		}

		inherit(Handler, Fulfilled);

		Fulfilled.prototype._state = 1;

		Fulfilled.prototype.fold = function(f, z, c, to) {
			runContinuation3(f, z, this, c, to);
		};

		Fulfilled.prototype.when = function(cont) {
			runContinuation1(cont.fulfilled, this, cont.receiver, cont.resolver);
		};

		var errorId = 0;

		/**
		 * Handler for a rejected promise
		 * @param {*} x rejection reason
		 * @constructor
		 */
		function Rejected(x) {
			Promise.createContext(this);

			this.id = ++errorId;
			this.value = x;
			this.handled = false;
			this.reported = false;

			this._report();
		}

		inherit(Handler, Rejected);

		Rejected.prototype._state = -1;

		Rejected.prototype.fold = function(f, z, c, to) {
			to.become(this);
		};

		Rejected.prototype.when = function(cont) {
			if(typeof cont.rejected === 'function') {
				this._unreport();
			}
			runContinuation1(cont.rejected, this, cont.receiver, cont.resolver);
		};

		Rejected.prototype._report = function(context) {
			tasks.afterQueue(new ReportTask(this, context));
		};

		Rejected.prototype._unreport = function() {
			if(this.handled) {
				return;
			}
			this.handled = true;
			tasks.afterQueue(new UnreportTask(this));
		};

		Rejected.prototype.fail = function(context) {
			this.reported = true;
			emitRejection('unhandledRejection', this);
			Promise.onFatalRejection(this, context === void 0 ? this.context : context);
		};

		function ReportTask(rejection, context) {
			this.rejection = rejection;
			this.context = context;
		}

		ReportTask.prototype.run = function() {
			if(!this.rejection.handled && !this.rejection.reported) {
				this.rejection.reported = true;
				emitRejection('unhandledRejection', this.rejection) ||
					Promise.onPotentiallyUnhandledRejection(this.rejection, this.context);
			}
		};

		function UnreportTask(rejection) {
			this.rejection = rejection;
		}

		UnreportTask.prototype.run = function() {
			if(this.rejection.reported) {
				emitRejection('rejectionHandled', this.rejection) ||
					Promise.onPotentiallyUnhandledRejectionHandled(this.rejection);
			}
		};

		// Unhandled rejection hooks
		// By default, everything is a noop

		Promise.createContext
			= Promise.enterContext
			= Promise.exitContext
			= Promise.onPotentiallyUnhandledRejection
			= Promise.onPotentiallyUnhandledRejectionHandled
			= Promise.onFatalRejection
			= noop;

		// Errors and singletons

		var foreverPendingHandler = new Handler();
		var foreverPendingPromise = new Promise(Handler, foreverPendingHandler);

		function cycle() {
			return new Rejected(new TypeError('Promise cycle'));
		}

		// Task runners

		/**
		 * Run a single consumer
		 * @constructor
		 */
		function ContinuationTask(continuation, handler) {
			this.continuation = continuation;
			this.handler = handler;
		}

		ContinuationTask.prototype.run = function() {
			this.handler.join().when(this.continuation);
		};

		/**
		 * Run a queue of progress handlers
		 * @constructor
		 */
		function ProgressTask(value, handler) {
			this.handler = handler;
			this.value = value;
		}

		ProgressTask.prototype.run = function() {
			var q = this.handler.consumers;
			if(q === void 0) {
				return;
			}

			for (var c, i = 0; i < q.length; ++i) {
				c = q[i];
				runNotify(c.progress, this.value, this.handler, c.receiver, c.resolver);
			}
		};

		/**
		 * Assimilate a thenable, sending it's value to resolver
		 * @param {function} then
		 * @param {object|function} thenable
		 * @param {object} resolver
		 * @constructor
		 */
		function AssimilateTask(then, thenable, resolver) {
			this._then = then;
			this.thenable = thenable;
			this.resolver = resolver;
		}

		AssimilateTask.prototype.run = function() {
			var h = this.resolver;
			tryAssimilate(this._then, this.thenable, _resolve, _reject, _notify);

			function _resolve(x) { h.resolve(x); }
			function _reject(x)  { h.reject(x); }
			function _notify(x)  { h.notify(x); }
		};

		function tryAssimilate(then, thenable, resolve, reject, notify) {
			try {
				then.call(thenable, resolve, reject, notify);
			} catch (e) {
				reject(e);
			}
		}

		/**
		 * Fold a handler value with z
		 * @constructor
		 */
		function Fold(f, z, c, to) {
			this.f = f; this.z = z; this.c = c; this.to = to;
			this.resolver = failIfRejected;
			this.receiver = this;
		}

		Fold.prototype.fulfilled = function(x) {
			this.f.call(this.c, this.z, x, this.to);
		};

		Fold.prototype.rejected = function(x) {
			this.to.reject(x);
		};

		Fold.prototype.progress = function(x) {
			this.to.notify(x);
		};

		// Other helpers

		/**
		 * @param {*} x
		 * @returns {boolean} true iff x is a trusted Promise
		 */
		function isPromise(x) {
			return x instanceof Promise;
		}

		/**
		 * Test just enough to rule out primitives, in order to take faster
		 * paths in some code
		 * @param {*} x
		 * @returns {boolean} false iff x is guaranteed *not* to be a thenable
		 */
		function maybeThenable(x) {
			return (typeof x === 'object' || typeof x === 'function') && x !== null;
		}

		function runContinuation1(f, h, receiver, next) {
			if(typeof f !== 'function') {
				return next.become(h);
			}

			Promise.enterContext(h);
			tryCatchReject(f, h.value, receiver, next);
			Promise.exitContext();
		}

		function runContinuation3(f, x, h, receiver, next) {
			if(typeof f !== 'function') {
				return next.become(h);
			}

			Promise.enterContext(h);
			tryCatchReject3(f, x, h.value, receiver, next);
			Promise.exitContext();
		}

		/**
		 * @deprecated
		 */
		function runNotify(f, x, h, receiver, next) {
			if(typeof f !== 'function') {
				return next.notify(x);
			}

			Promise.enterContext(h);
			tryCatchReturn(f, x, receiver, next);
			Promise.exitContext();
		}

		function tryCatch2(f, a, b) {
			try {
				return f(a, b);
			} catch(e) {
				return reject(e);
			}
		}

		/**
		 * Return f.call(thisArg, x), or if it throws return a rejected promise for
		 * the thrown exception
		 */
		function tryCatchReject(f, x, thisArg, next) {
			try {
				next.become(getHandler(f.call(thisArg, x)));
			} catch(e) {
				next.become(new Rejected(e));
			}
		}

		/**
		 * Same as above, but includes the extra argument parameter.
		 */
		function tryCatchReject3(f, x, y, thisArg, next) {
			try {
				f.call(thisArg, x, y, next);
			} catch(e) {
				next.become(new Rejected(e));
			}
		}

		/**
		 * @deprecated
		 * Return f.call(thisArg, x), or if it throws, *return* the exception
		 */
		function tryCatchReturn(f, x, thisArg, next) {
			try {
				next.notify(f.call(thisArg, x));
			} catch(e) {
				next.notify(e);
			}
		}

		function inherit(Parent, Child) {
			Child.prototype = objectCreate(Parent.prototype);
			Child.prototype.constructor = Child;
		}

		function snd(x, y) {
			return y;
		}

		function noop() {}

		function initEmitRejection() {
			/*global process, self, CustomEvent*/
			if(typeof process !== 'undefined' && process !== null
				&& typeof process.emit === 'function') {
				// Returning falsy here means to call the default
				// onPotentiallyUnhandledRejection API.  This is safe even in
				// browserify since process.emit always returns falsy in browserify:
				// https://github.com/defunctzombie/node-process/blob/master/browser.js#L40-L46
				return function(type, rejection) {
					return type === 'unhandledRejection'
						? process.emit(type, rejection.value, rejection)
						: process.emit(type, rejection);
				};
			} else if(typeof self !== 'undefined' && typeof CustomEvent === 'function') {
				return (function(noop, self, CustomEvent) {
					var hasCustomEvent = false;
					try {
						var ev = new CustomEvent('unhandledRejection');
						hasCustomEvent = ev instanceof CustomEvent;
					} catch (e) {}

					return !hasCustomEvent ? noop : function(type, rejection) {
						var ev = new CustomEvent(type, {
							detail: {
								reason: rejection.value,
								key: rejection
							},
							bubbles: false,
							cancelable: true
						});

						return !self.dispatchEvent(ev);
					};
				}(noop, self, CustomEvent));
			}

			return noop;
		}

		return Promise;
	};
});
}(typeof define === 'function' && define.amd ? define : function(factory) { module.exports = factory(); }));

},{}]},{},[1])
(1)
});
;
(function(__global) {
  
$__Object$getPrototypeOf = Object.getPrototypeOf || function(obj) {
  return obj.__proto__;
};

var $__Object$defineProperty;
(function () {
  try {
    if (!!Object.defineProperty({}, 'a', {})) {
      $__Object$defineProperty = Object.defineProperty;
    }
  } catch (e) {
    $__Object$defineProperty = function (obj, prop, opt) {
      try {
        obj[prop] = opt.value || opt.get.call(obj);
      }
      catch(e) {}
    }
  }
}());

$__Object$create = Object.create || function(o, props) {
  function F() {}
  F.prototype = o;

  if (typeof(props) === "object") {
    for (prop in props) {
      if (props.hasOwnProperty((prop))) {
        F[prop] = props[prop];
      }
    }
  }
  return new F();
};

/*
*********************************************************************************************

  Dynamic Module Loader Polyfill

    - Implemented exactly to the former 2014-08-24 ES6 Specification Draft Rev 27, Section 15
      http://wiki.ecmascript.org/doku.php?id=harmony:specification_drafts#august_24_2014_draft_rev_27

    - Functions are commented with their spec numbers, with spec differences commented.

    - Spec bugs are commented in this code with links.

    - Abstract functions have been combined where possible, and their associated functions
      commented.

    - Realm implementation is entirely omitted.

*********************************************************************************************
*/

// Some Helpers

// logs a linkset snapshot for debugging
/* function snapshot(loader) {
  console.log('---Snapshot---');
  for (var i = 0; i < loader.loads.length; i++) {
    var load = loader.loads[i];
    var linkSetLog = '  ' + load.name + ' (' + load.status + '): ';

    for (var j = 0; j < load.linkSets.length; j++) {
      linkSetLog += '{' + logloads(load.linkSets[j].loads) + '} ';
    }
    console.log(linkSetLog);
  }
  console.log('');
}
function logloads(loads) {
  var log = '';
  for (var k = 0; k < loads.length; k++)
    log += loads[k].name + (k != loads.length - 1 ? ' ' : '');
  return log;
} */


/* function checkInvariants() {
  // see https://bugs.ecmascript.org/show_bug.cgi?id=2603#c1

  var loads = System._loader.loads;
  var linkSets = [];

  for (var i = 0; i < loads.length; i++) {
    var load = loads[i];
    console.assert(load.status == 'loading' || load.status == 'loaded', 'Each load is loading or loaded');

    for (var j = 0; j < load.linkSets.length; j++) {
      var linkSet = load.linkSets[j];

      for (var k = 0; k < linkSet.loads.length; k++)
        console.assert(loads.indexOf(linkSet.loads[k]) != -1, 'linkSet loads are a subset of loader loads');

      if (linkSets.indexOf(linkSet) == -1)
        linkSets.push(linkSet);
    }
  }

  for (var i = 0; i < loads.length; i++) {
    var load = loads[i];
    for (var j = 0; j < linkSets.length; j++) {
      var linkSet = linkSets[j];

      if (linkSet.loads.indexOf(load) != -1)
        console.assert(load.linkSets.indexOf(linkSet) != -1, 'linkSet contains load -> load contains linkSet');

      if (load.linkSets.indexOf(linkSet) != -1)
        console.assert(linkSet.loads.indexOf(load) != -1, 'load contains linkSet -> linkSet contains load');
    }
  }

  for (var i = 0; i < linkSets.length; i++) {
    var linkSet = linkSets[i];
    for (var j = 0; j < linkSet.loads.length; j++) {
      var load = linkSet.loads[j];

      for (var k = 0; k < load.dependencies.length; k++) {
        var depName = load.dependencies[k].value;
        var depLoad;
        for (var l = 0; l < loads.length; l++) {
          if (loads[l].name != depName)
            continue;
          depLoad = loads[l];
          break;
        }

        // loading records are allowed not to have their dependencies yet
        // if (load.status != 'loading')
        //  console.assert(depLoad, 'depLoad found');

        // console.assert(linkSet.loads.indexOf(depLoad) != -1, 'linkset contains all dependencies');
      }
    }
  }
} */


(function() {
  var Promise = __global.Promise || require('when/es6-shim/Promise');
  if (__global.console)
    console.assert = console.assert || function() {};

  // IE8 support
  var indexOf = Array.prototype.indexOf || function(item) {
    for (var i = 0, thisLen = this.length; i < thisLen; i++) {
      if (this[i] === item) {
        return i;
      }
    }
    return -1;
  };
  var defineProperty = $__Object$defineProperty;

  // 15.2.3 - Runtime Semantics: Loader State

  // 15.2.3.11
  function createLoaderLoad(object) {
    return {
      // modules is an object for ES5 implementation
      modules: {},
      loads: [],
      loaderObj: object
    };
  }

  // 15.2.3.2 Load Records and LoadRequest Objects

  // 15.2.3.2.1
  function createLoad(name) {
    return {
      status: 'loading',
      name: name,
      linkSets: [],
      dependencies: [],
      metadata: {}
    };
  }

  // 15.2.3.2.2 createLoadRequestObject, absorbed into calling functions

  // 15.2.4

  // 15.2.4.1
  function loadModule(loader, name, options) {
    return new Promise(asyncStartLoadPartwayThrough({
      step: options.address ? 'fetch' : 'locate',
      loader: loader,
      moduleName: name,
      // allow metadata for import https://bugs.ecmascript.org/show_bug.cgi?id=3091
      moduleMetadata: options && options.metadata || {},
      moduleSource: options.source,
      moduleAddress: options.address
    }));
  }

  // 15.2.4.2
  function requestLoad(loader, request, refererName, refererAddress) {
    // 15.2.4.2.1 CallNormalize
    return new Promise(function(resolve, reject) {
      resolve(loader.loaderObj.normalize(request, refererName, refererAddress));
    })
    // 15.2.4.2.2 GetOrCreateLoad
    .then(function(name) {
      var load;
      if (loader.modules[name]) {
        load = createLoad(name);
        load.status = 'linked';
        // https://bugs.ecmascript.org/show_bug.cgi?id=2795
        load.module = loader.modules[name];
        return load;
      }

      for (var i = 0, l = loader.loads.length; i < l; i++) {
        load = loader.loads[i];
        if (load.name != name)
          continue;
        console.assert(load.status == 'loading' || load.status == 'loaded', 'loading or loaded');
        return load;
      }

      load = createLoad(name);
      loader.loads.push(load);

      proceedToLocate(loader, load);

      return load;
    });
  }

  // 15.2.4.3
  function proceedToLocate(loader, load) {
    proceedToFetch(loader, load,
      Promise.resolve()
      // 15.2.4.3.1 CallLocate
      .then(function() {
        return loader.loaderObj.locate({ name: load.name, metadata: load.metadata });
      })
    );
  }

  // 15.2.4.4
  function proceedToFetch(loader, load, p) {
    proceedToTranslate(loader, load,
      p
      // 15.2.4.4.1 CallFetch
      .then(function(address) {
        // adjusted, see https://bugs.ecmascript.org/show_bug.cgi?id=2602
        if (load.status != 'loading')
          return;
        load.address = address;

        return loader.loaderObj.fetch({ name: load.name, metadata: load.metadata, address: address });
      })
    );
  }

  var anonCnt = 0;

  // 15.2.4.5
  function proceedToTranslate(loader, load, p) {
    p
    // 15.2.4.5.1 CallTranslate
    .then(function(source) {
      if (load.status != 'loading')
        return;

      return Promise.resolve(loader.loaderObj.translate({ name: load.name, metadata: load.metadata, address: load.address, source: source }))

      // 15.2.4.5.2 CallInstantiate
      .then(function(source) {
        if(load.status != 'loading') {
          return;
        }
        load.source = source;
        return loader.loaderObj.instantiate({ name: load.name, metadata: load.metadata, address: load.address, source: source });
      })

      // 15.2.4.5.3 InstantiateSucceeded
      .then(function(instantiateResult) {
        if(load.status != 'loading') {
          return;
        }
        if (instantiateResult === undefined) {
          load.address = load.address || '<Anonymous Module ' + ++anonCnt + '>';

          // instead of load.kind, use load.isDeclarative
          load.isDeclarative = true;
          return loader.loaderObj.transpile(load)
          .then(function(transpiled) {
            // Hijack System.register to set declare function
            var curSystem = __global.System;
            var curRegister = curSystem.register;
            curSystem.register = function(name, deps, declare) {
              if (typeof name != 'string') {
                declare = deps;
                deps = name;
              }
              // store the registered declaration as load.declare
              // store the deps as load.deps
              load.declare = declare;
              load.depsList = deps;
            }            
            __eval(transpiled, __global, load);
            curSystem.register = curRegister;
          });
        }
        else if (typeof instantiateResult == 'object') {
          load.depsList = instantiateResult.deps || [];
          load.execute = instantiateResult.execute;
          load.isDeclarative = false;
        }
        else
          throw TypeError('Invalid instantiate return value');
      })
      // 15.2.4.6 ProcessLoadDependencies
      .then(function() {
        if(load.status != 'loading') {
          return;
        }
        load.dependencies = [];
        var depsList = load.depsList;

        var loadPromises = [];
        for (var i = 0, l = depsList.length; i < l; i++) (function(request, index) {
          loadPromises.push(
            requestLoad(loader, request, load.name, load.address)

            // 15.2.4.6.1 AddDependencyLoad (load is parentLoad)
            .then(function(depLoad) {

              // adjusted from spec to maintain dependency order
              // this is due to the System.register internal implementation needs
              load.dependencies[index] = {
                key: request,
                value: depLoad.name
              };

              if (depLoad.status != 'linked') {
                var linkSets = load.linkSets.concat([]);
                for (var i = 0, l = linkSets.length; i < l; i++)
                  addLoadToLinkSet(linkSets[i], depLoad);
              }

              // console.log('AddDependencyLoad ' + depLoad.name + ' for ' + load.name);
              // snapshot(loader);
            })
          );
        })(depsList[i], i);

        return Promise.all(loadPromises);
      })

      // 15.2.4.6.2 LoadSucceeded
      .then(function() {
        // console.log('LoadSucceeded ' + load.name);
        // snapshot(loader);
        if(load.status != 'loading') {
          return;
        }

        console.assert(load.status == 'loading', 'is loading');

        load.status = 'loaded';

        var linkSets = load.linkSets.concat([]);
        for (var i = 0, l = linkSets.length; i < l; i++)
          updateLinkSetOnLoad(linkSets[i], load);
      });
    })
    // 15.2.4.5.4 LoadFailed
    ['catch'](function(exc) {
      load.status = 'failed';
      load.exception = exc;

      var linkSets = load.linkSets.concat([]);
      for (var i = 0, l = linkSets.length; i < l; i++) {
        linkSetFailed(linkSets[i], load, exc);
      }

      console.assert(load.linkSets.length == 0, 'linkSets not removed');
    });
  }

  // 15.2.4.7 PromiseOfStartLoadPartwayThrough absorbed into calling functions

  // 15.2.4.7.1
  function asyncStartLoadPartwayThrough(stepState) {
    return function(resolve, reject) {
      var loader = stepState.loader;
      var name = stepState.moduleName;
      var step = stepState.step;

      if (loader.modules[name])
        throw new TypeError('"' + name + '" already exists in the module table');

      // adjusted to pick up existing loads
      var existingLoad;
      for (var i = 0, l = loader.loads.length; i < l; i++) {
        if (loader.loads[i].name == name) {
          existingLoad = loader.loads[i];

          if(step == 'translate' && !existingLoad.source) {
            existingLoad.address = stepState.moduleAddress;
            proceedToTranslate(loader, existingLoad, Promise.resolve(stepState.moduleSource));
          }

          return existingLoad.linkSets[0].done.then(function() {
            resolve(existingLoad);
          });
        }
      }

      var load = createLoad(name);

      load.metadata = stepState.moduleMetadata;

      var linkSet = createLinkSet(loader, load);

      loader.loads.push(load);

      resolve(linkSet.done);

      if (step == 'locate')
        proceedToLocate(loader, load);

      else if (step == 'fetch')
        proceedToFetch(loader, load, Promise.resolve(stepState.moduleAddress));

      else {
        console.assert(step == 'translate', 'translate step');
        load.address = stepState.moduleAddress;
        proceedToTranslate(loader, load, Promise.resolve(stepState.moduleSource));
      }
    }
  }

  // Declarative linking functions run through alternative implementation:
  // 15.2.5.1.1 CreateModuleLinkageRecord not implemented
  // 15.2.5.1.2 LookupExport not implemented
  // 15.2.5.1.3 LookupModuleDependency not implemented

  // 15.2.5.2.1
  function createLinkSet(loader, startingLoad) {
    var linkSet = {
      loader: loader,
      loads: [],
      startingLoad: startingLoad, // added see spec bug https://bugs.ecmascript.org/show_bug.cgi?id=2995
      loadingCount: 0
    };
    linkSet.done = new Promise(function(resolve, reject) {
      linkSet.resolve = resolve;
      linkSet.reject = reject;
    });
    addLoadToLinkSet(linkSet, startingLoad);
    return linkSet;
  }
  // 15.2.5.2.2
  function addLoadToLinkSet(linkSet, load) {
    console.assert(load.status == 'loading' || load.status == 'loaded', 'loading or loaded on link set');

    for (var i = 0, l = linkSet.loads.length; i < l; i++)
      if (linkSet.loads[i] == load)
        return;

    linkSet.loads.push(load);
    load.linkSets.push(linkSet);

    // adjustment, see https://bugs.ecmascript.org/show_bug.cgi?id=2603
    if (load.status != 'loaded') {
      linkSet.loadingCount++;
    }

    var loader = linkSet.loader;

    for (var i = 0, l = load.dependencies.length; i < l; i++) {
      var name = load.dependencies[i].value;

      if (loader.modules[name])
        continue;

      for (var j = 0, d = loader.loads.length; j < d; j++) {
        if (loader.loads[j].name != name)
          continue;

        addLoadToLinkSet(linkSet, loader.loads[j]);
        break;
      }
    }
    // console.log('add to linkset ' + load.name);
    // snapshot(linkSet.loader);
  }

  // linking errors can be generic or load-specific
  // this is necessary for debugging info
  function doLink(linkSet) {
    var error = false;
    try {
      link(linkSet, function(load, exc) {
        linkSetFailed(linkSet, load, exc);
        error = true;
      });
    }
    catch(e) {
      linkSetFailed(linkSet, null, e);
      error = true;
    }
    return error;
  }

  // 15.2.5.2.3
  function updateLinkSetOnLoad(linkSet, load) {
    // console.log('update linkset on load ' + load.name);
    // snapshot(linkSet.loader);

    console.assert(load.status == 'loaded' || load.status == 'linked', 'loaded or linked');

    linkSet.loadingCount--;

    if (linkSet.loadingCount > 0)
      return;

    // adjusted for spec bug https://bugs.ecmascript.org/show_bug.cgi?id=2995
    var startingLoad = linkSet.startingLoad;

    // non-executing link variation for loader tracing
    // on the server. Not in spec.
    /***/
    if (linkSet.loader.loaderObj.execute === false) {
      var loads = [].concat(linkSet.loads);
      for (var i = 0, l = loads.length; i < l; i++) {
        var load = loads[i];
        load.module = !load.isDeclarative ? {
          module: _newModule({})
        } : {
          name: load.name,
          module: _newModule({}),
          evaluated: true
        };
        load.status = 'linked';
        finishLoad(linkSet.loader, load);
      }
      return linkSet.resolve(startingLoad);
    }
    /***/

    var abrupt = doLink(linkSet);

    if (abrupt)
      return;

    console.assert(linkSet.loads.length == 0, 'loads cleared');

    linkSet.resolve(startingLoad);
  }

  // 15.2.5.2.4
  function linkSetFailed(linkSet, load, exc) {
    var loader = linkSet.loader;

    if (linkSet.loads[0].name != load.name)
      exc = addToError(exc, 'Error loading "' + load.name + '" from "' + linkSet.loads[0].name + '" at ' + (linkSet.loads[0].address || '<unknown>') + '\n');

    exc = addToError(exc, 'Error loading "' + load.name + '" at ' + (load.address || '<unknown>') + '\n');

    var loads = linkSet.loads.concat([]);
    for (var i = 0, l = loads.length; i < l; i++) {
      var load = loads[i];

      // store all failed load records
      loader.loaderObj.failed = loader.loaderObj.failed || [];
      if (indexOf.call(loader.loaderObj.failed, load) == -1)
        loader.loaderObj.failed.push(load);

      var linkIndex = indexOf.call(load.linkSets, linkSet);
      console.assert(linkIndex != -1, 'link not present');
      load.linkSets.splice(linkIndex, 1);
      if (load.linkSets.length == 0) {
        var globalLoadsIndex = indexOf.call(linkSet.loader.loads, load);
        if (globalLoadsIndex != -1)
          linkSet.loader.loads.splice(globalLoadsIndex, 1);
      }
    }
    linkSet.reject(exc);
  }

  // 15.2.5.2.5
  function finishLoad(loader, load) {
    // add to global trace if tracing
    if (loader.loaderObj.trace) {
      if (!loader.loaderObj.loads)
        loader.loaderObj.loads = {};
      var depMap = {};
      load.dependencies.forEach(function(dep) {
        depMap[dep.key] = dep.value;
      });
      loader.loaderObj.loads[load.name] = {
        name: load.name,
        deps: load.dependencies.map(function(dep){ return dep.key }),
        depMap: depMap,
        address: load.address,
        metadata: load.metadata,
        source: load.source,
        kind: load.isDeclarative ? 'declarative' : 'dynamic'
      };
    }
    // if not anonymous, add to the module table
    if (load.name) {
      console.assert(!loader.modules[load.name], 'load not in module table');
      loader.modules[load.name] = load.module;
    }
    var loadIndex = indexOf.call(loader.loads, load);
    if (loadIndex != -1)
      loader.loads.splice(loadIndex, 1);
    for (var i = 0, l = load.linkSets.length; i < l; i++) {
      loadIndex = indexOf.call(load.linkSets[i].loads, load);
      if (loadIndex != -1)
        load.linkSets[i].loads.splice(loadIndex, 1);
    }
    load.linkSets.splice(0, load.linkSets.length);
  }

  // 15.2.5.3 Module Linking Groups

  // 15.2.5.3.2 BuildLinkageGroups alternative implementation
  // Adjustments (also see https://bugs.ecmascript.org/show_bug.cgi?id=2755)
  // 1. groups is an already-interleaved array of group kinds
  // 2. load.groupIndex is set when this function runs
  // 3. load.groupIndex is the interleaved index ie 0 declarative, 1 dynamic, 2 declarative, ... (or starting with dynamic)
  function buildLinkageGroups(load, loads, groups) {
    groups[load.groupIndex] = groups[load.groupIndex] || [];

    // if the load already has a group index and its in its group, its already been done
    // this logic naturally handles cycles
    if (indexOf.call(groups[load.groupIndex], load) != -1)
      return;

    // now add it to the group to indicate its been seen
    groups[load.groupIndex].push(load);

    for (var i = 0, l = loads.length; i < l; i++) {
      var loadDep = loads[i];

      // dependencies not found are already linked
      for (var j = 0; j < load.dependencies.length; j++) {
        if (loadDep.name == load.dependencies[j].value) {
          // by definition all loads in linkset are loaded, not linked
          console.assert(loadDep.status == 'loaded', 'Load in linkSet not loaded!');

          // if it is a group transition, the index of the dependency has gone up
          // otherwise it is the same as the parent
          var loadDepGroupIndex = load.groupIndex + (loadDep.isDeclarative != load.isDeclarative);

          // the group index of an entry is always the maximum
          if (loadDep.groupIndex === undefined || loadDep.groupIndex < loadDepGroupIndex) {

            // if already in a group, remove from the old group
            if (loadDep.groupIndex !== undefined) {
              groups[loadDep.groupIndex].splice(indexOf.call(groups[loadDep.groupIndex], loadDep), 1);

              // if the old group is empty, then we have a mixed depndency cycle
              if (groups[loadDep.groupIndex].length == 0)
                throw new TypeError("Mixed dependency cycle detected");
            }

            loadDep.groupIndex = loadDepGroupIndex;
          }

          buildLinkageGroups(loadDep, loads, groups);
        }
      }
    }
  }

  function doDynamicExecute(linkSet, load, linkError) {
    try {
      var module = load.execute();
    }
    catch(e) {
      linkError(load, e);
      return;
    }
    if (!module || !(module instanceof Module))
      linkError(load, new TypeError('Execution must define a Module instance'));
    else
      return module;
  }

  // 15.2.5.4
  function link(linkSet, linkError) {

    var loader = linkSet.loader;

    if (!linkSet.loads.length)
      return;

    // console.log('linking {' + logloads(linkSet.loads) + '}');
    // snapshot(loader);

    // 15.2.5.3.1 LinkageGroups alternative implementation

    // build all the groups
    // because the first load represents the top of the tree
    // for a given linkset, we can work down from there
    var groups = [];
    var startingLoad = linkSet.loads[0];
    startingLoad.groupIndex = 0;
    buildLinkageGroups(startingLoad, linkSet.loads, groups);

    // determine the kind of the bottom group
    var curGroupDeclarative = startingLoad.isDeclarative == groups.length % 2;

    // run through the groups from bottom to top
    for (var i = groups.length - 1; i >= 0; i--) {
      var group = groups[i];
      for (var j = 0; j < group.length; j++) {
        var load = group[j];

        // 15.2.5.5 LinkDeclarativeModules adjusted
        if (curGroupDeclarative) {
          linkDeclarativeModule(load, linkSet.loads, loader);
        }
        // 15.2.5.6 LinkDynamicModules adjusted
        else {
          var module = doDynamicExecute(linkSet, load, linkError);
          if (!module)
            return;
          load.module = {
            name: load.name,
            module: module
          };
          load.status = 'linked';
        }
        finishLoad(loader, load);
      }

      // alternative current kind for next loop
      curGroupDeclarative = !curGroupDeclarative;
    }
  }


  // custom module records for binding graph
  // store linking module records in a separate table
  function getOrCreateModuleRecord(name, loader) {
    var moduleRecords = loader.moduleRecords;
    return moduleRecords[name] || (moduleRecords[name] = {
      name: name,
      dependencies: [],
      module: new Module(), // start from an empty module and extend
      importers: []
    });
  }

  // custom declarative linking function
  function linkDeclarativeModule(load, loads, loader) {
    if (load.module)
      return;

    var module = load.module = getOrCreateModuleRecord(load.name, loader);
    var moduleObj = load.module.module;

    var registryEntry = load.declare.call(__global, function(name, value) {
      // NB This should be an Object.defineProperty, but that is very slow.
      //    By disaling this module write-protection we gain performance.
      //    It could be useful to allow an option to enable or disable this.
      module.locked = true;
      moduleObj[name] = value;

      for (var i = 0, l = module.importers.length; i < l; i++) {
        var importerModule = module.importers[i];
        if (!importerModule.locked) {
          var importerIndex = indexOf.call(importerModule.dependencies, module);
          importerModule.setters[importerIndex](moduleObj);
        }
      }

      module.locked = false;
      return value;
    });

    // setup our setters and execution function
    module.setters = registryEntry.setters;
    module.execute = registryEntry.execute;

    // now link all the module dependencies
    // amending the depMap as we go
    for (var i = 0, l = load.dependencies.length; i < l; i++) {
      var depName = load.dependencies[i].value;
      var depModule = loader.modules[depName];

      // if dependency not already in the module registry
      // then try and link it now
      if (!depModule) {
        // get the dependency load record
        for (var j = 0; j < loads.length; j++) {
          if (loads[j].name != depName)
            continue;

          // only link if already not already started linking (stops at circular / dynamic)
          if (!loads[j].module) {
            linkDeclarativeModule(loads[j], loads, loader);
            depModule = loads[j].module;
          }
          // if circular, create the module record
          else {
            depModule = getOrCreateModuleRecord(depName, loader);
          }
        }
      }

      // only declarative modules have dynamic bindings
      if (depModule.importers) {
        module.dependencies.push(depModule);
        depModule.importers.push(module);
      }
      else {
        // track dynamic records as null module records as already linked
        module.dependencies.push(null);
      }

      // run the setter for this dependency
      if (module.setters[i])
        module.setters[i](depModule.module);
    }

    load.status = 'linked';
  }



  // 15.2.5.5.1 LinkImports not implemented
  // 15.2.5.7 ResolveExportEntries not implemented
  // 15.2.5.8 ResolveExports not implemented
  // 15.2.5.9 ResolveExport not implemented
  // 15.2.5.10 ResolveImportEntries not implemented

  // 15.2.6.1
  function evaluateLoadedModule(loader, load) {
    console.assert(load.status == 'linked', 'is linked ' + load.name);

    doEnsureEvaluated(load.module, [], loader);
    return load.module.module;
  }

  /*
   * Module Object non-exotic for ES5:
   *
   * module.module        bound module object
   * module.execute       execution function for module
   * module.dependencies  list of module objects for dependencies
   * See getOrCreateModuleRecord for all properties
   *
   */
  function doExecute(module) {
    try {
      module.execute.call(__global);
    }
    catch(e) {
      return e;
    }
  }

  // propogate execution errors
  // see https://bugs.ecmascript.org/show_bug.cgi?id=2993
  function doEnsureEvaluated(module, seen, loader) {
    var err = ensureEvaluated(module, seen, loader);
    if (err)
      throw err;
  }
  // 15.2.6.2 EnsureEvaluated adjusted
  function ensureEvaluated(module, seen, loader) {
    if (module.evaluated || !module.dependencies)
      return;

    seen.push(module);

    var deps = module.dependencies;
    var err;

    for (var i = 0, l = deps.length; i < l; i++) {
      var dep = deps[i];
      // dynamic dependencies are empty in module.dependencies
      // as they are already linked
      if (!dep)
        continue;
      if (indexOf.call(seen, dep) == -1) {
        err = ensureEvaluated(dep, seen, loader);
        // stop on error, see https://bugs.ecmascript.org/show_bug.cgi?id=2996
        if (err) {
          err = addToError(err, 'Error evaluating ' + dep.name + '\n');
          return err;
        }
      }
    }

    if (module.failed)
      return new Error('Module failed execution.');

    if (module.evaluated)
      return;

    module.evaluated = true;
    err = doExecute(module);
    if (err) {
      module.failed = true;
    }
    else if (Object.preventExtensions) {
      // spec variation
      // we don't create a new module here because it was created and ammended
      // we just disable further extensions instead
      Object.preventExtensions(module.module);
    }

    module.execute = undefined;
    return err;
  }

  function addToError(err, msg) {
    if (err instanceof Error)
      err.message = msg + err.message;
    else
      err = msg + err;
    return err;
  }

  // 26.3 Loader

  // 26.3.1.1
  function Loader(options) {
    if (typeof options != 'object')
      throw new TypeError('Options must be an object');

    if (options.normalize)
      this.normalize = options.normalize;
    if (options.locate)
      this.locate = options.locate;
    if (options.fetch)
      this.fetch = options.fetch;
    if (options.translate)
      this.translate = options.translate;
    if (options.instantiate)
      this.instantiate = options.instantiate;

    this._loader = {
      loaderObj: this,
      loads: [],
      modules: {},
      importPromises: {},
      moduleRecords: {}
    };

    // 26.3.3.6
    defineProperty(this, 'global', {
      get: function() {
        return __global;
      }
    });

    // 26.3.3.13 realm not implemented
  }

  function Module() {}

  // importPromises adds ability to import a module twice without error - https://bugs.ecmascript.org/show_bug.cgi?id=2601
  function createImportPromise(loader, name, promise) {
    var importPromises = loader._loader.importPromises;
    return importPromises[name] = promise.then(function(m) {
      importPromises[name] = undefined;
      return m;
    }, function(e) {
      importPromises[name] = undefined;
      throw e;
    });
  }

  Loader.prototype = {
    // 26.3.3.1
    constructor: Loader,
    // 26.3.3.2
    define: function(name, source, options) {
      // check if already defined
      if (this._loader.importPromises[name])
        throw new TypeError('Module is already loading.');
      return createImportPromise(this, name, new Promise(asyncStartLoadPartwayThrough({
        step: 'translate',
        loader: this._loader,
        moduleName: name,
        moduleMetadata: options && options.metadata || {},
        moduleSource: source,
        moduleAddress: options && options.address
      })));
    },
    // 26.3.3.3
    'delete': function(name) {
      var loader = this._loader;
      delete loader.importPromises[name];
      delete loader.moduleRecords[name];
      return loader.modules[name] ? delete loader.modules[name] : false;
    },
    // 26.3.3.4 entries not implemented
    // 26.3.3.5
    get: function(key) {
      if (!this._loader.modules[key])
        return;
      doEnsureEvaluated(this._loader.modules[key], [], this);
      return this._loader.modules[key].module;
    },
    // 26.3.3.7
    has: function(name) {
      return !!this._loader.modules[name];
    },
    // 26.3.3.8
    'import': function(name, options) {
      // run normalize first
      var loaderObj = this;

      // added, see https://bugs.ecmascript.org/show_bug.cgi?id=2659
      return Promise.resolve(loaderObj.normalize(name, options && options.name, options && options.address))
      .then(function(name) {
        var loader = loaderObj._loader;

        if (loader.modules[name]) {
          doEnsureEvaluated(loader.modules[name], [], loader._loader);
          return loader.modules[name].module;
        }

        return loader.importPromises[name] || createImportPromise(loaderObj, name,
          loadModule(loader, name, options || {})
          .then(function(load) {
            delete loader.importPromises[name];
            return evaluateLoadedModule(loader, load);
          }));
      });
    },
    // 26.3.3.9 keys not implemented
    // 26.3.3.10
    load: function(name, options) {
      if (this._loader.modules[name]) {
        doEnsureEvaluated(this._loader.modules[name], [], this._loader);
        return Promise.resolve(this._loader.modules[name].module);
      }
      return this._loader.importPromises[name] || createImportPromise(this, name, loadModule(this._loader, name, {}));
    },
    // 26.3.3.11
    module: function(source, options) {
      var load = createLoad();
      load.address = options && options.address;
      var linkSet = createLinkSet(this._loader, load);
      var sourcePromise = Promise.resolve(source);
      var loader = this._loader;
      var p = linkSet.done.then(function() {
        return evaluateLoadedModule(loader, load);
      });
      proceedToTranslate(loader, load, sourcePromise);
      return p;
    },
    // 26.3.3.12
    newModule: function (obj) {
      if (typeof obj != 'object')
        throw new TypeError('Expected object');

      // we do this to be able to tell if a module is a module privately in ES5
      // by doing m instanceof Module
      var m = new Module();

      var pNames;
      if (Object.getOwnPropertyNames && obj != null) {
        pNames = Object.getOwnPropertyNames(obj);
      }
      else {
        pNames = [];
        for (var key in obj)
          pNames.push(key);
      }

      for (var i = 0; i < pNames.length; i++) (function(key) {
        defineProperty(m, key, {
          configurable: false,
          enumerable: true,
          get: function () {
            return obj[key];
          }
        });
      })(pNames[i]);

      if (Object.preventExtensions)
        Object.preventExtensions(m);

      return m;
    },
    // 26.3.3.14
    set: function(name, module) {
      if (!(module instanceof Module))
        throw new TypeError('Loader.set(' + name + ', module) must be a module');
      this._loader.modules[name] = {
        module: module
      };
    },
    // 26.3.3.15 values not implemented
    // 26.3.3.16 @@iterator not implemented
    // 26.3.3.17 @@toStringTag not implemented

    // 26.3.3.18.1
    normalize: function(name, referrerName, referrerAddress) {
      return name;
    },
    // 26.3.3.18.2
    locate: function(load) {
      return load.name;
    },
    // 26.3.3.18.3
    fetch: function(load) {
      throw new TypeError('Fetch not implemented');
    },
    // 26.3.3.18.4
    translate: function(load) {
      return load.source;
    },
    // 26.3.3.18.5
    instantiate: function(load) {
    }
  };

  var _newModule = Loader.prototype.newModule;

  if (typeof exports === 'object')
    module.exports = Loader;

  __global.Reflect = __global.Reflect || {};
  __global.Reflect.Loader = __global.Reflect.Loader || Loader;
  __global.Reflect.global = __global.Reflect.global || __global;
  __global.LoaderPolyfill = Loader;

})();

/*
 * Traceur and Babel transpile hook for Loader
 */
(function(Loader) {
  var g = __global;

  function getTranspilerModule(loader, globalName) {
    return loader.newModule({ 'default': g[globalName], __useDefault: true });
  }

  // use Traceur by default
  Loader.prototype.transpiler = 'traceur';

  Loader.prototype.transpile = function(load) {
    var self = this;

    // pick up Transpiler modules from existing globals on first run if set
    if (!self.transpilerHasRun) {
      if (g.traceur && !self.has('traceur'))
        self.set('traceur', getTranspilerModule(self, 'traceur'));
      if (g.babel && !self.has('babel'))
        self.set('babel', getTranspilerModule(self, 'babel'));
      self.transpilerHasRun = true;
    }
    
    return self['import'](self.transpiler).then(function(transpiler) {
      if (transpiler.__useDefault)
        transpiler = transpiler['default'];
      return 'var __moduleAddress = "' + load.address + '";' + (transpiler.Compiler ? traceurTranspile : babelTranspile).call(self, load, transpiler);
    });
  };

  Loader.prototype.instantiate = function(load) {
    var self = this;
    return Promise.resolve(self.normalize(self.transpiler))
    .then(function(transpilerNormalized) {
      // load transpiler as a global (avoiding System clobbering)
      if (load.name === transpilerNormalized) {
        return {
          deps: [],
          execute: function() {
            var curSystem = g.System;
            var curLoader = g.Reflect.Loader;
            // ensure not detected as CommonJS
            __eval('(function(require,exports,module){' + load.source + '})();', g, load);
            g.System = curSystem;
            g.Reflect.Loader = curLoader;
            return getTranspilerModule(self, load.name);
          }
        };
      }
    });
  };

  function traceurTranspile(load, traceur) {
    var options = this.traceurOptions || {};
    options.modules = 'instantiate';
    options.script = false;
    options.sourceMaps = 'inline';
    options.filename = load.address;
    options.inputSourceMap = load.metadata.sourceMap;
    options.moduleName = false;

    var compiler = new traceur.Compiler(options);
    var source = doTraceurCompile(load.source, compiler, options.filename);

    // add "!eval" to end of Traceur sourceURL
    // I believe this does something?
    source += '!eval';

    return source;
  }
  function doTraceurCompile(source, compiler, filename) {
    try {
      return compiler.compile(source, filename);
    }
    catch(e) {
      // traceur throws an error array
      throw e[0];
    }
  }

  function babelTranspile(load, babel) {
    var options = this.babelOptions || {};
    options.modules = 'system';
    options.sourceMap = 'inline';
    options.filename = load.address;
    options.code = true;
    options.ast = false;
    
    if (!options.blacklist)
      options.blacklist = ['react'];

    var source = babel.transform(load.source, options).code;

    // add "!eval" to end of Babel sourceURL
    // I believe this does something?
    return source + '\n//# sourceURL=' + load.address + '!eval';
  }


})(__global.LoaderPolyfill);
/*
*********************************************************************************************

  System Loader Implementation

    - Implemented to https://github.com/jorendorff/js-loaders/blob/master/browser-loader.js

    - <script type="module"> supported

*********************************************************************************************
*/



(function() {
  var isWorker = typeof self !== 'undefined' && typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope;
  var isBrowser = typeof window != 'undefined' && !isWorker;
  var isWindows = typeof process != 'undefined' && !!process.platform.match(/^win/);
  var Promise = __global.Promise || require('when/es6-shim/Promise');

  // Helpers
  // Absolute URL parsing, from https://gist.github.com/Yaffle/1088850
  function parseURI(url) {
    var m = String(url).replace(/^\s+|\s+$/g, '').match(/^([^:\/?#]+:)?(\/\/(?:[^:@\/?#]*(?::[^:@\/?#]*)?@)?(([^:\/?#]*)(?::(\d*))?))?([^?#]*)(\?[^#]*)?(#[\s\S]*)?/);
    // authority = '//' + user + ':' + pass '@' + hostname + ':' port
    return (m ? {
      href     : m[0] || '',
      protocol : m[1] || '',
      authority: m[2] || '',
      host     : m[3] || '',
      hostname : m[4] || '',
      port     : m[5] || '',
      pathname : m[6] || '',
      search   : m[7] || '',
      hash     : m[8] || ''
    } : null);
  }

  function removeDotSegments(input) {
    var output = [];
    input.replace(/^(\.\.?(\/|$))+/, '')
      .replace(/\/(\.(\/|$))+/g, '/')
      .replace(/\/\.\.$/, '/../')
      .replace(/\/?[^\/]*/g, function (p) {
        if (p === '/..')
          output.pop();
        else
          output.push(p);
    });
    return output.join('').replace(/^\//, input.charAt(0) === '/' ? '/' : '');
  }

  function toAbsoluteURL(base, href) {

    if (isWindows)
      href = href.replace(/\\/g, '/');

    href = parseURI(href || '');
    base = parseURI(base || '');

    return !href || !base ? null : (href.protocol || base.protocol) +
      (href.protocol || href.authority ? href.authority : base.authority) +
      removeDotSegments(href.protocol || href.authority || href.pathname.charAt(0) === '/' ? href.pathname : (href.pathname ? ((base.authority && !base.pathname ? '/' : '') + base.pathname.slice(0, base.pathname.lastIndexOf('/') + 1) + href.pathname) : base.pathname)) +
      (href.protocol || href.authority || href.pathname ? href.search : (href.search || base.search)) +
      href.hash;
  }

  var fetchTextFromURL;

  if (typeof XMLHttpRequest != 'undefined') {
    fetchTextFromURL = function(url, fulfill, reject) {
      var xhr = new XMLHttpRequest();
      var sameDomain = true;
      var doTimeout = false;
      if (!('withCredentials' in xhr)) {
        // check if same domain
        var domainCheck = /^(\w+:)?\/\/([^\/]+)/.exec(url);
        if (domainCheck) {
          sameDomain = domainCheck[2] === window.location.host;
          if (domainCheck[1])
            sameDomain &= domainCheck[1] === window.location.protocol;
        }
      }
      if (!sameDomain && typeof XDomainRequest != 'undefined') {
        xhr = new XDomainRequest();
        xhr.onload = load;
        xhr.onerror = error;
        xhr.ontimeout = error;
        xhr.onprogress = function() {};
        xhr.timeout = 0;
        doTimeout = true;
      }
      function load() {
        fulfill(xhr.responseText);
      }
      function error() {
        reject(xhr.statusText + ': ' + url || 'XHR error');
      }

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200 || (xhr.status == 0 && xhr.responseText)) {
            load();
          } else {
            error();
          }
        }
      };
      xhr.open("GET", url, true);

      if (doTimeout)
        setTimeout(function() {
          xhr.send();
        }, 0);

      xhr.send(null);
    }
  }
  else if (typeof require != 'undefined') {
    var fs;
    fetchTextFromURL = function(url, fulfill, reject) {
      if (url.substr(0, 5) != 'file:')
        throw 'Only file URLs of the form file: allowed running in Node.';
      fs = fs || require('fs');
      url = url.substr(5);
      if (isWindows)
        url = url.replace(/\//g, '\\');
      return fs.readFile(url, function(err, data) {
        if (err)
          return reject(err);
        else
          fulfill(data + '');
      });
    }
  }
  else {
    throw new TypeError('No environment fetch API available.');
  }

  var SystemLoader = function($__super) {
    function SystemLoader(options) {
      $__super.call(this, options || {});

      // Set default baseURL and paths
      if (typeof location != 'undefined' && location.href) {
        var href = __global.location.href.split('#')[0].split('?')[0];
        this.baseURL = href.substring(0, href.lastIndexOf('/') + 1);
      }
      else if (typeof process != 'undefined' && process.cwd) {
        this.baseURL = 'file:' + process.cwd() + '/';
        if (isWindows)
          this.baseURL = this.baseURL.replace(/\\/g, '/');
      }
      else {
        throw new TypeError('No environment baseURL');
      }
      this.paths = { '*': '*.js' };
    }

    SystemLoader.__proto__ = ($__super !== null ? $__super : Function.prototype);
    SystemLoader.prototype = $__Object$create(($__super !== null ? $__super.prototype : null));

    $__Object$defineProperty(SystemLoader.prototype, "constructor", {
      value: SystemLoader
    });

    $__Object$defineProperty(SystemLoader.prototype, "global", {
      get: function() {
        return isBrowser ? window : (isWorker ? self : __global);
      },

      enumerable: false
    });

    $__Object$defineProperty(SystemLoader.prototype, "strict", {
      get: function() { return true; },
      enumerable: false
    });

    $__Object$defineProperty(SystemLoader.prototype, "normalize", {
      value: function(name, parentName, parentAddress) {
        if (typeof name != 'string')
          throw new TypeError('Module name must be a string');

        var segments = name.split('/');

        if (segments.length == 0)
          throw new TypeError('No module name provided');

        // current segment
        var i = 0;
        // is the module name relative
        var rel = false;
        // number of backtracking segments
        var dotdots = 0;
        if (segments[0] == '.') {
          i++;
          if (i == segments.length)
            throw new TypeError('Illegal module name "' + name + '"');
          rel = true;
        }
        else {
          while (segments[i] == '..') {
            i++;
            if (i == segments.length)
              throw new TypeError('Illegal module name "' + name + '"');
          }
          if (i)
            rel = true;
          dotdots = i;
        }

        for (var j = i; j < segments.length; j++) {
          var segment = segments[j];
          if (segment == '' || segment == '.' || segment == '..')
            throw new TypeError('Illegal module name "' + name + '"');
        }

        if (!rel)
          return name;

        // build the full module name
        var normalizedParts = [];
        var parentParts = (parentName || '').split('/');
        var normalizedLen = parentParts.length - 1 - dotdots;

        normalizedParts = normalizedParts.concat(parentParts.splice(0, parentParts.length - 1 - dotdots));
        normalizedParts = normalizedParts.concat(segments.splice(i, segments.length - i));

        return normalizedParts.join('/');
      },

      enumerable: false,
      writable: true
    });

    $__Object$defineProperty(SystemLoader.prototype, "locate", {
      value: function(load) {
        var name = load.name;

        // NB no specification provided for System.paths, used ideas discussed in https://github.com/jorendorff/js-loaders/issues/25

        // most specific (longest) match wins
        var pathMatch = '', wildcard;

        // check to see if we have a paths entry
        for (var p in this.paths) {
          var pathParts = p.split('*');
          if (pathParts.length > 2)
            throw new TypeError('Only one wildcard in a path is permitted');

          // exact path match
          if (pathParts.length == 1) {
            if (name == p && p.length > pathMatch.length) {
              pathMatch = p;
              break;
            }
          }

          // wildcard path match
          else {
            if (name.substr(0, pathParts[0].length) == pathParts[0] && name.substr(name.length - pathParts[1].length) == pathParts[1]) {
              pathMatch = p;
              wildcard = name.substr(pathParts[0].length, name.length - pathParts[1].length - pathParts[0].length);
            }
          }
        }

        var outPath = this.paths[pathMatch];
        if (wildcard)
          outPath = outPath.replace('*', wildcard);

        // percent encode just '#' in module names
        // according to https://github.com/jorendorff/js-loaders/blob/master/browser-loader.js#L238
        // we should encode everything, but it breaks for servers that don't expect it 
        // like in (https://github.com/systemjs/systemjs/issues/168)
        if (isBrowser)
          outPath = outPath.replace(/#/g, '%23');

        return toAbsoluteURL(this.baseURL, outPath);
      },

      enumerable: false,
      writable: true
    });

    $__Object$defineProperty(SystemLoader.prototype, "fetch", {
      value: function(load) {
        var self = this;
        return new Promise(function(resolve, reject) {
          fetchTextFromURL(toAbsoluteURL(self.baseURL, load.address), function(source) {
            resolve(source);
          }, reject);
        });
      },

      enumerable: false,
      writable: true
    });

    return SystemLoader;
  }(__global.LoaderPolyfill);

  var System = new SystemLoader();

  // note we have to export before runing "init" below
  if (typeof exports === 'object')
    module.exports = System;

  __global.System = System;

  // <script type="module"> support
  // allow a data-init function callback once loaded
  if (isBrowser && typeof document.getElementsByTagName != 'undefined') {
    var curScript = document.getElementsByTagName('script');
    curScript = curScript[curScript.length - 1];

    function completed() {
      document.removeEventListener( "DOMContentLoaded", completed, false );
      window.removeEventListener( "load", completed, false );
      ready();
    }

    function ready() {
      var scripts = document.getElementsByTagName('script');
      for (var i = 0; i < scripts.length; i++) {
        var script = scripts[i];
        if (script.type == 'module') {
          var source = script.innerHTML.substr(1);
          // It is important to reference the global System, rather than the one
          // in our closure. We want to ensure that downstream users/libraries
          // can override System w/ custom behavior.
          __global.System.module(source)['catch'](function(err) { setTimeout(function() { throw err; }); });
        }
      }
    }

    // DOM ready, taken from https://github.com/jquery/jquery/blob/master/src/core/ready.js#L63
    if (document.readyState === 'complete') {
      setTimeout(ready);
    }
    else if (document.addEventListener) {
      document.addEventListener('DOMContentLoaded', completed, false);
      window.addEventListener('load', completed, false);
    }

    // run the data-init function on the script tag
    if (curScript.getAttribute('data-init'))
      window[curScript.getAttribute('data-init')]();
  }
})();


// Define our eval outside of the scope of any other reference defined in this
// file to avoid adding those references to the evaluation scope.
function __eval(__source, __global, __load) {
  try {
    eval('(function() { var __moduleName = "' + (__load.name || '').replace('"', '\"') + '"; ' + __source + ' \n }).call(__global);');
  }
  catch(e) {
    if (e.name == 'SyntaxError' || e.name == 'TypeError')
      e.message = 'Evaluating ' + (__load.name || load.address) + '\n\t' + e.message;
    throw e;
  }
}

})(typeof window != 'undefined' ? window : (typeof WorkerGlobalScope != 'undefined' ?
                                           self : global));

/*
 * SystemJS v0.16.6
 */

(function($__global) {

$__global.upgradeSystemLoader = function() {
  $__global.upgradeSystemLoader = undefined;

  // indexOf polyfill for IE
  var indexOf = Array.prototype.indexOf || function(item) {
    for (var i = 0, l = this.length; i < l; i++)
      if (this[i] === item)
        return i;
    return -1;
  }

  var isWindows = typeof process != 'undefined' && !!process.platform.match(/^win/);

  // Absolute URL parsing, from https://gist.github.com/Yaffle/1088850
  function parseURI(url) {
    var m = String(url).replace(/^\s+|\s+$/g, '').match(/^([^:\/?#]+:)?(\/\/(?:[^:@\/?#]*(?::[^:@\/?#]*)?@)?(([^:\/?#]*)(?::(\d*))?))?([^?#]*)(\?[^#]*)?(#[\s\S]*)?/);
    // authority = '//' + user + ':' + pass '@' + hostname + ':' port
    return (m ? {
      href     : m[0] || '',
      protocol : m[1] || '',
      authority: m[2] || '',
      host     : m[3] || '',
      hostname : m[4] || '',
      port     : m[5] || '',
      pathname : m[6] || '',
      search   : m[7] || '',
      hash     : m[8] || ''
    } : null);
  }
  function toAbsoluteURL(base, href) {
    function removeDotSegments(input) {
      var output = [];
      input.replace(/^(\.\.?(\/|$))+/, '')
        .replace(/\/(\.(\/|$))+/g, '/')
        .replace(/\/\.\.$/, '/../')
        .replace(/\/?[^\/]*/g, function (p) {
          if (p === '/..')
            output.pop();
          else
            output.push(p);
      });
      return output.join('').replace(/^\//, input.charAt(0) === '/' ? '/' : '');
    }

    if (isWindows)
      href = href.replace(/\\/g, '/');

    href = parseURI(href || '');
    base = parseURI(base || '');

    return !href || !base ? null : (href.protocol || base.protocol) +
      (href.protocol || href.authority ? href.authority : base.authority) +
      removeDotSegments(href.protocol || href.authority || href.pathname.charAt(0) === '/' ? href.pathname : (href.pathname ? ((base.authority && !base.pathname ? '/' : '') + base.pathname.slice(0, base.pathname.lastIndexOf('/') + 1) + href.pathname) : base.pathname)) +
      (href.protocol || href.authority || href.pathname ? href.search : (href.search || base.search)) +
      href.hash;
  }

  // clone the original System loader
  var System;
  (function() {
    var originalSystem = $__global.System;
    System = $__global.System = new LoaderPolyfill(originalSystem);
    System.baseURL = originalSystem.baseURL;
    System.paths = { '*': '*.js' };
    System.originalSystem = originalSystem;
  })();

  System.noConflict = function() {
    $__global.SystemJS = System;
    $__global.System = System.originalSystem;
  }

  
/*
 * SystemJS Core
 * Code should be vaguely readable
 * 
 */
var originalSystem = $__global.System.originalSystem;
function core(loader) {
  /*
    __useDefault
    
    When a module object looks like:
    newModule(
      __useDefault: true,
      default: 'some-module'
    })

    Then importing that module provides the 'some-module'
    result directly instead of the full module.

    Useful for eg module.exports = function() {}
  */
  var loaderImport = loader['import'];
  loader['import'] = function(name, options) {
    return loaderImport.call(this, name, options).then(function(module) {
      return module.__useDefault ? module['default'] : module;
    });
  };

  // support the empty module, as a concept
  loader.set('@empty', loader.newModule({}));

  // include the node require since we're overriding it
  if (typeof require != 'undefined')
    loader._nodeRequire = require;

  /*
    Config
    Extends config merging one deep only

    loader.config({
      some: 'random',
      config: 'here',
      deep: {
        config: { too: 'too' }
      }
    });

    <=>

    loader.some = 'random';
    loader.config = 'here'
    loader.deep = loader.deep || {};
    loader.deep.config = { too: 'too' };
  */
  loader.config = function(cfg) {
    for (var c in cfg) {
      var v = cfg[c];
      if (typeof v == 'object' && !(v instanceof Array)) {
        this[c] = this[c] || {};
        for (var p in v)
          this[c][p] = v[p];
      }
      else
        this[c] = v;
    }
  };

  // override locate to allow baseURL to be document-relative
  var baseURI;
  if (typeof window == 'undefined' &&
      typeof WorkerGlobalScope == 'undefined') {
    baseURI = 'file:' + process.cwd() + '/';
    if (isWindows)
      baseURI = baseURI.replace(/\\/g, '/');
  }
  // Inside of a Web Worker
  else if(typeof window == 'undefined') {
    baseURI = loader.global.location.href;
  }
  else {
    baseURI = document.baseURI;
    if (!baseURI) {
      var bases = document.getElementsByTagName('base');
      baseURI = bases[0] && bases[0].href || window.location.href;
    }
  }

  var loaderLocate = loader.locate;
  var normalizedBaseURL;
  loader.locate = function(load) {
    if (this.baseURL != normalizedBaseURL) {
      normalizedBaseURL = toAbsoluteURL(baseURI, this.baseURL);

      if (normalizedBaseURL.substr(normalizedBaseURL.length - 1, 1) != '/')
        normalizedBaseURL += '/';
      this.baseURL = normalizedBaseURL;
    }

    return Promise.resolve(loaderLocate.call(this, load));
  };

  function applyExtensions(extensions, loader) {
    loader._extensions = [];
    for(var i = 0, len = extensions.length; i < len; i++) {
      extensions[i](loader);
    }
  }

  loader._extensions = loader._extensions || [];
  loader._extensions.push(core);

  loader.clone = function() {
    var originalLoader = this;
    var loader = new LoaderPolyfill(originalSystem);
    loader.baseURL = originalLoader.baseURL;
    loader.paths = { '*': '*.js' };
    applyExtensions(originalLoader._extensions, loader);
    return loader;
  };
}
/*
 * Meta Extension
 *
 * Sets default metadata on a load record (load.metadata) from
 * loader.meta[moduleName].
 * Also provides an inline meta syntax for module meta in source.
 *
 * Eg:
 *
 * loader.meta['my/module'] = { some: 'meta' };
 *
 * load.metadata.some = 'meta' will now be set on the load record.
 *
 * The same meta could be set with a my/module.js file containing:
 * 
 * my/module.js
 *   "some meta"; 
 *   "another meta";
 *   console.log('this is my/module');
 *
 * The benefit of inline meta is that coniguration doesn't need
 * to be known in advance, which is useful for modularising
 * configuration and avoiding the need for configuration injection.
 *
 *
 * Example
 * -------
 *
 * The simplest meta example is setting the module format:
 *
 * System.meta['my/module'] = { format: 'amd' };
 *
 * or inside 'my/module.js':
 *
 * "format amd";
 * define(...);
 * 
 */

function meta(loader) {
  var metaRegEx = /^(\s*\/\*.*\*\/|\s*\/\/[^\n]*|\s*"[^"]+"\s*;?|\s*'[^']+'\s*;?)+/;
  var metaPartRegEx = /\/\*.*\*\/|\/\/[^\n]*|"[^"]+"\s*;?|'[^']+'\s*;?/g;

  loader.meta = {};
  loader._extensions = loader._extensions || [];
  loader._extensions.push(meta);

  function setConfigMeta(loader, load) {
    var meta = loader.meta && loader.meta[load.name];
    if (meta) {
      for (var p in meta)
        load.metadata[p] = load.metadata[p] || meta[p];
    }
  }

  var loaderLocate = loader.locate;
  loader.locate = function(load) {
    setConfigMeta(this, load);
    return loaderLocate.call(this, load);
  }

  var loaderTranslate = loader.translate;
  loader.translate = function(load) {
    // detect any meta header syntax
    var meta = load.source.match(metaRegEx);
    if (meta) {
      var metaParts = meta[0].match(metaPartRegEx);
      for (var i = 0; i < metaParts.length; i++) {
        var len = metaParts[i].length;

        var firstChar = metaParts[i].substr(0, 1);
        if (metaParts[i].substr(len - 1, 1) == ';')
          len--;
      
        if (firstChar != '"' && firstChar != "'")
          continue;

        var metaString = metaParts[i].substr(1, metaParts[i].length - 3);

        var metaName = metaString.substr(0, metaString.indexOf(' '));
        if (metaName) {
          var metaValue = metaString.substr(metaName.length + 1, metaString.length - metaName.length - 1);

          if (load.metadata[metaName] instanceof Array)
            load.metadata[metaName].push(metaValue);
          else if (!load.metadata[metaName])
            load.metadata[metaName] = metaValue;
        }
      }
    }
    // config meta overrides
    setConfigMeta(this, load);
    
    return loaderTranslate.call(this, load);
  }
}
/*
 * Instantiate registry extension
 *
 * Supports Traceur System.register 'instantiate' output for loading ES6 as ES5.
 *
 * - Creates the loader.register function
 * - Also supports metadata.format = 'register' in instantiate for anonymous register modules
 * - Also supports metadata.deps, metadata.execute and metadata.executingRequire
 *     for handling dynamic modules alongside register-transformed ES6 modules
 *
 * Works as a standalone extension, but benefits from having a more 
 * advanced __eval defined like in SystemJS polyfill-wrapper-end.js
 *
 * The code here replicates the ES6 linking groups algorithm to ensure that
 * circular ES6 compiled into System.register can work alongside circular AMD 
 * and CommonJS, identically to the actual ES6 loader.
 *
 */
function register(loader) {
  if (typeof indexOf == 'undefined')
    indexOf = Array.prototype.indexOf;
  if (typeof __eval == 'undefined' || typeof document != 'undefined' && !document.addEventListener)
    __eval = 0 || eval; // uglify breaks without the 0 ||

  loader._extensions = loader._extensions || [];
  loader._extensions.push(register);

  // define exec for easy evaluation of a load record (load.name, load.source, load.address)
  // main feature is source maps support handling
  var curSystem;
  function exec(load) {
    var loader = this;
    // support sourceMappingURL (efficiently)
    var sourceMappingURL;
    var lastLineIndex = load.source.lastIndexOf('\n');
    if (lastLineIndex != -1) {
      if (load.source.substr(lastLineIndex + 1, 21) == '//# sourceMappingURL=') {
        sourceMappingURL = load.source.substr(lastLineIndex + 22, load.source.length - lastLineIndex - 22);
        if (typeof toAbsoluteURL != 'undefined')
          sourceMappingURL = toAbsoluteURL(load.address, sourceMappingURL);
      }
    }

    __eval(load.source, load.address, sourceMappingURL);
  }
  loader.__exec = exec;

  function dedupe(deps) {
    var newDeps = [];
    for (var i = 0, l = deps.length; i < l; i++)
      if (indexOf.call(newDeps, deps[i]) == -1)
        newDeps.push(deps[i])
    return newDeps;
  }

  /*
   * There are two variations of System.register:
   * 1. System.register for ES6 conversion (2-3 params) - System.register([name, ]deps, declare)
   *    see https://github.com/ModuleLoader/es6-module-loader/wiki/System.register-Explained
   *
   * 2. System.register for dynamic modules (3-4 params) - System.register([name, ]deps, executingRequire, execute)
   * the true or false statement 
   *
   * this extension implements the linking algorithm for the two variations identical to the spec
   * allowing compiled ES6 circular references to work alongside AMD and CJS circular references.
   *
   */
  // loader.register sets loader.defined for declarative modules
  var anonRegister;
  var calledRegister;
  function registerModule(name, deps, declare, execute) {
    if (typeof name != 'string') {
      execute = declare;
      declare = deps;
      deps = name;
      name = null;
    }

    calledRegister = true;
    
    var register;

    // dynamic
    if (typeof declare == 'boolean') {
      register = {
        declarative: false,
        deps: deps,
        execute: execute,
        executingRequire: declare
      };
    }
    else {
      // ES6 declarative
      register = {
        declarative: true,
        deps: deps,
        declare: declare
      };
    }
    
    // named register
    if (name) {
      register.name = name;
      // we never overwrite an existing define
      if (!(name in loader.defined))
        loader.defined[name] = register; 
    }
    // anonymous register
    else if (register.declarative) {
      if (anonRegister)
        throw new TypeError('Multiple anonymous System.register calls in the same module file.');
      anonRegister = register;
    }
  }
  /*
   * Registry side table - loader.defined
   * Registry Entry Contains:
   *    - name
   *    - deps 
   *    - declare for declarative modules
   *    - execute for dynamic modules, different to declarative execute on module
   *    - executingRequire indicates require drives execution for circularity of dynamic modules
   *    - declarative optional boolean indicating which of the above
   *
   * Can preload modules directly on System.defined['my/module'] = { deps, execute, executingRequire }
   *
   * Then the entry gets populated with derived information during processing:
   *    - normalizedDeps derived from deps, created in instantiate
   *    - groupIndex used by group linking algorithm
   *    - evaluated indicating whether evaluation has happend
   *    - module the module record object, containing:
   *      - exports actual module exports
   *      
   *    Then for declarative only we track dynamic bindings with the records:
   *      - name
   *      - setters declarative setter functions
   *      - exports actual module values
   *      - dependencies, module records of dependencies
   *      - importers, module records of dependents
   *
   * After linked and evaluated, entries are removed, declarative module records remain in separate
   * module binding table
   *
   */

  function defineRegister(loader) {
    if (loader.register)
      return;

    loader.register = registerModule;

    if (!loader.defined)
      loader.defined = {};
    
    // script injection mode calls this function synchronously on load
    var onScriptLoad = loader.onScriptLoad;
    loader.onScriptLoad = function(load) {
      onScriptLoad(load);
      // anonymous define
      if (anonRegister)
        load.metadata.entry = anonRegister;
      
      if (calledRegister) {
        load.metadata.format = load.metadata.format || 'register';
        load.metadata.registered = true;
      }
    }
  }

  defineRegister(loader);

  function buildGroups(entry, loader, groups) {
    groups[entry.groupIndex] = groups[entry.groupIndex] || [];

    if (indexOf.call(groups[entry.groupIndex], entry) != -1)
      return;

    groups[entry.groupIndex].push(entry);

    for (var i = 0, l = entry.normalizedDeps.length; i < l; i++) {
      var depName = entry.normalizedDeps[i];
      var depEntry = loader.defined[depName];
      
      // not in the registry means already linked / ES6
      if (!depEntry || depEntry.evaluated)
        continue;
      
      // now we know the entry is in our unlinked linkage group
      var depGroupIndex = entry.groupIndex + (depEntry.declarative != entry.declarative);

      // the group index of an entry is always the maximum
      if (depEntry.groupIndex === undefined || depEntry.groupIndex < depGroupIndex) {
        
        // if already in a group, remove from the old group
        if (depEntry.groupIndex !== undefined) {
          groups[depEntry.groupIndex].splice(indexOf.call(groups[depEntry.groupIndex], depEntry), 1);

          // if the old group is empty, then we have a mixed depndency cycle
          if (groups[depEntry.groupIndex].length == 0)
            throw new TypeError("Mixed dependency cycle detected");
        }

        depEntry.groupIndex = depGroupIndex;
      }

      buildGroups(depEntry, loader, groups);
    }
  }

  function link(name, loader) {
    var startEntry = loader.defined[name];

    // skip if already linked
    if (startEntry.module)
      return;

    startEntry.groupIndex = 0;

    var groups = [];

    buildGroups(startEntry, loader, groups);

    var curGroupDeclarative = !!startEntry.declarative == groups.length % 2;
    for (var i = groups.length - 1; i >= 0; i--) {
      var group = groups[i];
      for (var j = 0; j < group.length; j++) {
        var entry = group[j];

        // link each group
        if (curGroupDeclarative)
          linkDeclarativeModule(entry, loader);
        else
          linkDynamicModule(entry, loader);
      }
      curGroupDeclarative = !curGroupDeclarative; 
    }
  }

  // module binding records
  var moduleRecords = {};
  function getOrCreateModuleRecord(name) {
    return moduleRecords[name] || (moduleRecords[name] = {
      name: name,
      dependencies: [],
      exports: {}, // start from an empty module and extend
      importers: []
    })
  }

  function linkDeclarativeModule(entry, loader) {
    // only link if already not already started linking (stops at circular)
    if (entry.module)
      return;

    var module = entry.module = getOrCreateModuleRecord(entry.name);
    var exports = entry.module.exports;

    var declaration = entry.declare.call(loader.global, function(name, value) {
      module.locked = true;
      exports[name] = value;

      for (var i = 0, l = module.importers.length; i < l; i++) {
        var importerModule = module.importers[i];
        if (!importerModule.locked) {
          var importerIndex = indexOf.call(importerModule.dependencies, module);
          importerModule.setters[importerIndex](exports);
        }
      }

      module.locked = false;
      return value;
    });
    
    module.setters = declaration.setters;
    module.execute = declaration.execute;

    if (!module.setters || !module.execute) {
      throw new TypeError('Invalid System.register form for ' + entry.name);
    }

    // now link all the module dependencies
    for (var i = 0, l = entry.normalizedDeps.length; i < l; i++) {
      var depName = entry.normalizedDeps[i];
      var depEntry = loader.defined[depName];
      var depModule = moduleRecords[depName];

      // work out how to set depExports based on scenarios...
      var depExports;

      if (depModule) {
        depExports = depModule.exports;
      }
      // dynamic, already linked in our registry
      else if (depEntry && !depEntry.declarative) {
        if (depEntry.module.exports && depEntry.module.exports.__esModule)
          depExports = depEntry.module.exports;
        else
          depExports = { 'default': depEntry.module.exports, '__useDefault': true };
      }
      // in the loader registry
      else if (!depEntry) {
        depExports = loader.get(depName);
      }
      // we have an entry -> link
      else {
        linkDeclarativeModule(depEntry, loader);
        depModule = depEntry.module;
        depExports = depModule.exports;
      }

      // only declarative modules have dynamic bindings
      if (depModule && depModule.importers) {
        depModule.importers.push(module);
        module.dependencies.push(depModule);
      }
      else {
        module.dependencies.push(null);
      }

      // run the setter for this dependency
      if (module.setters[i])
        module.setters[i](depExports);
    }
  }

  // An analog to loader.get covering execution of all three layers (real declarative, simulated declarative, simulated dynamic)
  function getModule(name, loader) {
    var exports;
    var entry = loader.defined[name];

    if (!entry) {
      exports = loader.get(name);
      if (!exports)
        throw new Error('Unable to load dependency ' + name + '.');
    }

    else {
      if (entry.declarative)
        ensureEvaluated(name, [], loader);
    
      else if (!entry.evaluated)
        linkDynamicModule(entry, loader);

      exports = entry.module.exports;
    }

    if ((!entry || entry.declarative) && exports && exports.__useDefault)
      return exports['default'];
    
    return exports;
  }

  function linkDynamicModule(entry, loader) {
    if (entry.module)
      return;

    var exports = {};

    var module = entry.module = { exports: exports, id: entry.name };

    // AMD requires execute the tree first
    if (!entry.executingRequire) {
      for (var i = 0, l = entry.normalizedDeps.length; i < l; i++) {
        var depName = entry.normalizedDeps[i];
        var depEntry = loader.defined[depName];
        if (depEntry)
          linkDynamicModule(depEntry, loader);
      }
    }

    // now execute
    entry.evaluated = true;
    var output = entry.execute.call(loader.global, function(name) {
      for (var i = 0, l = entry.deps.length; i < l; i++) {
        if (entry.deps[i] != name)
          continue;
        return getModule(entry.normalizedDeps[i], loader);
      }
      throw new TypeError('Module ' + name + ' not declared as a dependency.');
    }, exports, module);
    
    if (output)
      module.exports = output;
      
    /*if ( output && output.__esModule )
      entry.module = output;
    else if (output)
      entry.module['default'] = output;*/
  }

  /*
   * Given a module, and the list of modules for this current branch,
   *  ensure that each of the dependencies of this module is evaluated
   *  (unless one is a circular dependency already in the list of seen
   *  modules, in which case we execute it)
   *
   * Then we evaluate the module itself depth-first left to right 
   * execution to match ES6 modules
   */
  function ensureEvaluated(moduleName, seen, loader) {
    var entry = loader.defined[moduleName];

    // if already seen, that means it's an already-evaluated non circular dependency
    if (!entry || entry.evaluated || !entry.declarative)
      return;

    // this only applies to declarative modules which late-execute

    seen.push(moduleName);

    for (var i = 0, l = entry.normalizedDeps.length; i < l; i++) {
      var depName = entry.normalizedDeps[i];
      if (indexOf.call(seen, depName) == -1) {
        if (!loader.defined[depName])
          loader.get(depName);
        else
          ensureEvaluated(depName, seen, loader);
      }
    }

    if (entry.evaluated)
      return;

    entry.evaluated = true;
    entry.module.execute.call(loader.global);
  }

  var registerRegEx = /System\.register/;

  var loaderFetch = loader.fetch;
  loader.fetch = function(load) {
    var loader = this;
    defineRegister(loader);
    if (loader.defined[load.name]) {
      load.metadata.format = 'defined';
      return '';
    }
    anonRegister = null;
    calledRegister = false;
    // the above get picked up by onScriptLoad
    return loaderFetch.call(loader, load);
  }

  var loaderTranslate = loader.translate;
  loader.translate = function(load) {
    this.register = registerModule;

    this.__exec = exec;

    load.metadata.deps = load.metadata.deps || [];

    // we run the meta detection here (register is after meta)
    return Promise.resolve(loaderTranslate.call(this, load)).then(function(source) {
      
      // dont run format detection for globals shimmed
      // ideally this should be in the global extension, but there is
      // currently no neat way to separate it
      if (load.metadata.init || load.metadata.exports)
        load.metadata.format = load.metadata.format || 'global';

      // run detection for register format
      if (load.metadata.format == 'register' || !load.metadata.format && load.source.match(registerRegEx))
        load.metadata.format = 'register';
      return source;
    });
  }


  var loaderInstantiate = loader.instantiate;
  loader.instantiate = function(load) {
    var loader = this;

    var entry;

    // first we check if this module has already been defined in the registry
    if (loader.defined[load.name]) {
      entry = loader.defined[load.name];
      entry.deps = entry.deps.concat(load.metadata.deps);
    }

    // picked up already by a script injection
    else if (load.metadata.entry)
      entry = load.metadata.entry;

    // otherwise check if it is dynamic
    else if (load.metadata.execute) {
      entry = {
        declarative: false,
        deps: load.metadata.deps || [],
        execute: load.metadata.execute,
        executingRequire: load.metadata.executingRequire // NodeJS-style requires or not
      };
    }

    // Contains System.register calls
    else if (load.metadata.format == 'register') {
      anonRegister = null;
      calledRegister = false;

      var curSystem = loader.global.System;

      loader.global.System = loader;

      loader.__exec(load);

      loader.global.System = curSystem;

      if (anonRegister)
        entry = anonRegister;

      if (!entry && System.defined[load.name])
        entry = System.defined[load.name];

      if (!calledRegister && !load.metadata.registered)
        throw new TypeError(load.name + ' detected as System.register but didn\'t execute.');
    }

    // named bundles are just an empty module
    if (!entry && load.metadata.format != 'es6')
      return {
        deps: load.metadata.deps,
        execute: function() {
          return loader.newModule({});
        }
      };

    // place this module onto defined for circular references
    if (entry)
      loader.defined[load.name] = entry;

    // no entry -> treat as ES6
    else
      return loaderInstantiate.call(this, load);

    entry.deps = dedupe(entry.deps);
    entry.name = load.name;

    // first, normalize all dependencies
    var normalizePromises = [];
    for (var i = 0, l = entry.deps.length; i < l; i++)
      normalizePromises.push(Promise.resolve(loader.normalize(entry.deps[i], load.name)));

    return Promise.all(normalizePromises).then(function(normalizedDeps) {

      entry.normalizedDeps = normalizedDeps;

      return {
        deps: entry.deps,
        execute: function() {
          // recursively ensure that the module and all its 
          // dependencies are linked (with dependency group handling)
          link(load.name, loader);

          // now handle dependency execution in correct order
          ensureEvaluated(load.name, [], loader);

          // remove from the registry
          loader.defined[load.name] = undefined;

          var module = entry.module.exports;

          if (!module || !entry.declarative && module.__esModule !== true)
            module = { 'default': module, __useDefault: true };

          // return the defined module object
          return loader.newModule(module);
        }
      };
    });
  }
}
/*
 * Extension to detect ES6 and auto-load Traceur or Babel for processing
 */
function es6(loader) {
  loader._extensions.push(es6);

  // good enough ES6 detection regex - format detections not designed to be accurate, but to handle the 99% use case
  var es6RegEx = /(^\s*|[}\);\n]\s*)(import\s+(['"]|(\*\s+as\s+)?[^"'\(\)\n;]+\s+from\s+['"]|\{)|export\s+\*\s+from\s+["']|export\s+(\{|default|function|class|var|const|let|async\s+function))/;

  var traceurRuntimeRegEx = /\$traceurRuntime\s*\./;
  var babelHelpersRegEx = /babelHelpers\s*\./;

  var transpilerNormalized, transpilerRuntimeNormalized;

  var firstLoad = true;

  var nodeResolver = typeof process != 'undefined' && typeof require != 'undefined' && require.resolve;

  function setConfig(loader, module, nodeModule) {
    loader.meta[module] = {format: 'global'};
    if (nodeResolver && !loader.paths[module]) {
      try {
        loader.paths[module] = require.resolve(nodeModule || module);
      }
      catch(e) {}
    }
  }

  var loaderLocate = loader.locate;
  loader.locate = function(load) {
    var self = this;
    if (firstLoad) {
      if (self.transpiler == 'traceur') {
        setConfig(self, 'traceur', 'traceur/bin/traceur.js');
        self.meta['traceur'].exports = 'traceur';
        setConfig(self, 'traceur-runtime', 'traceur/bin/traceur-runtime.js');
      }
      else if (self.transpiler == 'babel') {
        setConfig(self, 'babel', 'babel-core/browser.js');
        setConfig(self, 'babel-runtime', 'babel-core/external-helpers.js');
      }
      firstLoad = false;
    }
    return loaderLocate.call(self, load);
  };

  var loaderTranslate = loader.translate;
  loader.translate = function(load) {
    var loader = this;

    return loaderTranslate.call(loader, load)
    .then(function(source) {

      // detect ES6
      if (load.metadata.format == 'es6' || !load.metadata.format && source.match(es6RegEx)) {
        load.metadata.format = 'es6';
        return source;
      }

      if (load.metadata.format == 'register') {
        if (!loader.global.$traceurRuntime && load.source.match(traceurRuntimeRegEx)) {
          return loader['import']('traceur-runtime').then(function() {
            return source;
          });
        }
        if (!loader.global.babelHelpers && load.source.match(babelHelpersRegEx)) {
          return loader['import']('babel/external-helpers').then(function() {
            return source;
          });
        }
      }

      // ensure Traceur doesn't clobber the System global
      if (loader.transpiler == 'traceur')
        return Promise.all([
          transpilerNormalized || (transpilerNormalized = loader.normalize(loader.transpiler)),
          transpilerRuntimeNormalized || (transpilerRuntimeNormalized = loader.normalize(loader.transpiler + '-runtime'))
        ])
        .then(function(normalized) {
          if (load.name == normalized[0] || load.name == normalized[1])
            return '(function() { var curSystem = System; ' + source + '\nSystem = curSystem; })();';

          return source;
        });

      return source;
    });

  };

}
/*
  SystemJS Global Format

  Supports
    metadata.deps
    metadata.init
    metadata.exports

  Also detects writes to the global object avoiding global collisions.
  See the SystemJS readme global support section for further information.
*/
function global(loader) {

  loader._extensions.push(global);

  function readGlobalProperty(p, value) {
    var pParts = p.split('.');
    while (pParts.length)
      value = value[pParts.shift()];
    return value;
  }

  function createHelpers(loader) {
    if (loader.has('@@global-helpers'))
      return;

    var hasOwnProperty = loader.global.hasOwnProperty;
    var moduleGlobals = {};

    var curGlobalObj;
    var ignoredGlobalProps;

    loader.set('@@global-helpers', loader.newModule({
      prepareGlobal: function(moduleName, deps) {
        // first, we add all the dependency modules to the global
        for (var i = 0; i < deps.length; i++) {
          var moduleGlobal = moduleGlobals[deps[i]];
          if (moduleGlobal)
            for (var m in moduleGlobal)
              loader.global[m] = moduleGlobal[m];
        }

        // now store a complete copy of the global object
        // in order to detect changes
        curGlobalObj = {};
        ignoredGlobalProps = ['indexedDB', 'sessionStorage', 'localStorage',
          'clipboardData', 'frames', 'webkitStorageInfo', 'toolbar', 'statusbar',
          'scrollbars', 'personalbar', 'menubar', 'locationbar', 'webkitIndexedDB',
          'screenTop', 'screenLeft'
        ];
        for (var g in loader.global) {
          if (indexOf.call(ignoredGlobalProps, g) != -1) { continue; }
          if (!hasOwnProperty || loader.global.hasOwnProperty(g)) {
            try {
              curGlobalObj[g] = loader.global[g];
            } catch (e) {
              ignoredGlobalProps.push(g);
            }
          }
        }
      },
      retrieveGlobal: function(moduleName, exportName, init) {
        var singleGlobal;
        var multipleExports;
        var exports = {};

        // run init
        if (init)
          singleGlobal = init.call(loader.global);

        // check for global changes, creating the globalObject for the module
        // if many globals, then a module object for those is created
        // if one global, then that is the module directly
        else if (exportName) {
          var firstPart = exportName.split('.')[0];
          singleGlobal = readGlobalProperty(exportName, loader.global);
          exports[firstPart] = loader.global[firstPart];
        }

        else {
          for (var g in loader.global) {
            if (indexOf.call(ignoredGlobalProps, g) != -1)
              continue;
            if ((!hasOwnProperty || loader.global.hasOwnProperty(g)) && g != loader.global && curGlobalObj[g] != loader.global[g]) {
              exports[g] = loader.global[g];
              if (singleGlobal) {
                if (singleGlobal !== loader.global[g])
                  multipleExports = true;
              }
              else if (singleGlobal === undefined) {
                singleGlobal = loader.global[g];
              }
            }
          }
        }

        moduleGlobals[moduleName] = exports;

        return multipleExports ? exports : singleGlobal;
      }
    }));
  }

  createHelpers(loader);

  var loaderInstantiate = loader.instantiate;
  loader.instantiate = function(load) {
    var loader = this;

    createHelpers(loader);

    var exportName = load.metadata.exports;

    if (!load.metadata.format)
      load.metadata.format = 'global';

    // global is a fallback module format
    if (load.metadata.format == 'global') {
      load.metadata.execute = function(require, exports, module) {

        loader.get('@@global-helpers').prepareGlobal(module.id, load.metadata.deps);

        if (exportName)
          load.source += '\nthis["' + exportName + '"] = ' + exportName + ';';

        // disable module detection
        var define = loader.global.define;
        var require = loader.global.require;
        
        loader.global.define = undefined;
        loader.global.module = undefined;
        loader.global.exports = undefined;

        loader.__exec(load);

        loader.global.require = require;
        loader.global.define = define;

        return loader.get('@@global-helpers').retrieveGlobal(module.id, exportName, load.metadata.init);
      }
    }
    return loaderInstantiate.call(loader, load);
  }
}
/*
  SystemJS CommonJS Format
*/
function cjs(loader) {
  loader._extensions.push(cjs);

  // CJS Module Format
  // require('...') || exports[''] = ... || exports.asd = ... || module.exports = ...
  var cjsExportsRegEx = /(?:^\uFEFF?|[^$_a-zA-Z\xA0-\uFFFF.]|module\.)(exports\s*\[['"]|\exports\s*\.)|(?:^\uFEFF?|[^$_a-zA-Z\xA0-\uFFFF.])module\.exports\s*\=/;
  // RegEx adjusted from https://github.com/jbrantly/yabble/blob/master/lib/yabble.js#L339
  var cjsRequireRegEx = /(?:^\uFEFF?|[^$_a-zA-Z\xA0-\uFFFF."'])require\s*\(\s*("[^"\\]*(?:\\.[^"\\]*)*"|'[^'\\]*(?:\\.[^'\\]*)*')\s*\)/g;
  var commentRegEx = /(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/mg;

  function getCJSDeps(source) {
    cjsRequireRegEx.lastIndex = 0;

    var deps = [];

    // remove comments from the source first, if not minified
    if (source.length / source.split('\n').length < 200)
      source = source.replace(commentRegEx, '');

    var match;

    while (match = cjsRequireRegEx.exec(source))
      deps.push(match[1].substr(1, match[1].length - 2));

    return deps;
  }

  var loaderInstantiate = loader.instantiate;
  loader.instantiate = function(load) {

    if (!load.metadata.format) {
      cjsExportsRegEx.lastIndex = 0;
      cjsRequireRegEx.lastIndex = 0;
      if (cjsRequireRegEx.exec(load.source) || cjsExportsRegEx.exec(load.source))
        load.metadata.format = 'cjs';
    }

    if (load.metadata.format == 'cjs') {
      load.metadata.deps = load.metadata.deps ? load.metadata.deps.concat(getCJSDeps(load.source)) : getCJSDeps(load.source);

      load.metadata.executingRequire = true;

      load.metadata.execute = function(require, exports, module) {
        var dirname = (load.address || '').split('/');
        dirname.pop();
        dirname = dirname.join('/');

        // if on the server, remove the "file:" part from the dirname
        if (System._nodeRequire)
          dirname = dirname.substr(5);

        var globals = loader.global._g = {
          global: loader.global,
          exports: exports,
          module: module,
          require: require,
          __filename: System._nodeRequire ? load.address.substr(5) : load.address,
          __dirname: dirname
        };


        // disable AMD detection
        var define = loader.global.define;
        loader.global.define = undefined;

        var execLoad = {
          name: load.name,
          source: '(function() {\n(function(global, exports, module, require, __filename, __dirname){\n' + load.source + 
                                  '\n}).call(_g.exports, _g.global, _g.exports, _g.module, _g.require, _g.__filename, _g.__dirname);})();',
          address: load.address
        };
        loader.__exec(execLoad);

        loader.global.define = define;

        loader.global._g = undefined;
      }
    }

    return loaderInstantiate.call(this, load);
  };
}
/*
  SystemJS AMD Format
  Provides the AMD module format definition at System.format.amd
  as well as a RequireJS-style require on System.require
*/
function amd(loader) {
  // by default we only enforce AMD noConflict mode in Node
  var isNode = typeof module != 'undefined' && module.exports;

  loader._extensions.push(amd);

  // AMD Module Format Detection RegEx
  // define([.., .., ..], ...)
  // define(varName); || define(function(require, exports) {}); || define({})
  var amdRegEx = /(?:^\uFEFF?|[^$_a-zA-Z\xA0-\uFFFF.])define\s*\(\s*("[^"]+"\s*,\s*|'[^']+'\s*,\s*)?\s*(\[(\s*(("[^"]+"|'[^']+')\s*,|\/\/.*\r?\n|\/\*(.|\s)*?\*\/))*(\s*("[^"]+"|'[^']+')\s*,?)?(\s*(\/\/.*\r?\n|\/\*(.|\s)*?\*\/))*\s*\]|function\s*|{|[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*\))/;
  var commentRegEx = /(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/mg;

  var cjsRequirePre = "(?:^|[^$_a-zA-Z\\xA0-\\uFFFF.])";
  var cjsRequirePost = "\\s*\\(\\s*(\"([^\"]+)\"|'([^']+)')\\s*\\)";

  var fnBracketRegEx = /\(([^\)]*)\)/;

  var wsRegEx = /^\s+|\s+$/g;

  var requireRegExs = {};

  function getCJSDeps(source, requireIndex) {

    // remove comments
    source = source.replace(commentRegEx, '');

    // determine the require alias
    var params = source.match(fnBracketRegEx);
    var requireAlias = (params[1].split(',')[requireIndex] || 'require').replace(wsRegEx, '');

    // find or generate the regex for this requireAlias
    var requireRegEx = requireRegExs[requireAlias] || (requireRegExs[requireAlias] = new RegExp(cjsRequirePre + requireAlias + cjsRequirePost, 'g'));

    requireRegEx.lastIndex = 0;

    var deps = [];

    var match;
    while (match = requireRegEx.exec(source))
      deps.push(match[2] || match[3]);

    return deps;
  }

  /*
    AMD-compatible require
    To copy RequireJS, set window.require = window.requirejs = loader.amdRequire
  */
  function require(names, callback, errback, referer) {
    // 'this' is bound to the loader
    var loader = this;

    // in amd, first arg can be a config object... we just ignore
    if (typeof names == 'object' && !(names instanceof Array))
      return require.apply(null, Array.prototype.splice.call(arguments, 1, arguments.length - 1));

    // amd require
    if (names instanceof Array)
      Promise.all(names.map(function(name) {
        return loader['import'](name, referer);
      })).then(function(modules) {
        if(callback) {
          callback.apply(null, modules);
        }
      }, errback);

    // commonjs require
    else if (typeof names == 'string') {
      var module = loader.get(names);
      return module.__useDefault ? module['default'] : module;
    }

    else
      throw new TypeError('Invalid require');
  };
  loader.amdRequire = function() {
    return require.apply(this, arguments);
  };

  function makeRequire(parentName, staticRequire, loader) {
    return function(names, callback, errback) {
      if (typeof names == 'string')
        return staticRequire(names);
      return require.call(loader, names, callback, errback, { name: parentName });
    }
  }

  // run once per loader
  function generateDefine(loader) {
    // script injection mode calls this function synchronously on load
    var onScriptLoad = loader.onScriptLoad;
    loader.onScriptLoad = function(load) {
      onScriptLoad(load);
      if (anonDefine || defineBundle) {
        load.metadata.format = 'defined';
        load.metadata.registered = true;
      }

      if (anonDefine) {
        load.metadata.deps = load.metadata.deps ? load.metadata.deps.concat(anonDefine.deps) : anonDefine.deps;
        load.metadata.execute = anonDefine.execute;
      }
    }

    function define(name, deps, factory) {
      if (typeof name != 'string') {
        factory = deps;
        deps = name;
        name = null;
      }
      if (!(deps instanceof Array)) {
        factory = deps;
        deps = ['require', 'exports', 'module'];
      }

      if (typeof factory != 'function')
        factory = (function(factory) {
          return function() { return factory; }
        })(factory);

      // in IE8, a trailing comma becomes a trailing undefined entry
      if (deps[deps.length - 1] === undefined)
        deps.pop();

      // remove system dependencies
      var requireIndex, exportsIndex, moduleIndex;
      
      if ((requireIndex = indexOf.call(deps, 'require')) != -1) {
        
        deps.splice(requireIndex, 1);

        var factoryText = factory.toString();

        deps = deps.concat(getCJSDeps(factoryText, requireIndex));
      }
        

      if ((exportsIndex = indexOf.call(deps, 'exports')) != -1)
        deps.splice(exportsIndex, 1);
      
      if ((moduleIndex = indexOf.call(deps, 'module')) != -1)
        deps.splice(moduleIndex, 1);

      var define = {
        deps: deps,
        execute: function(require, exports, module) {

          var depValues = [];
          for (var i = 0; i < deps.length; i++)
            depValues.push(require(deps[i]));

          module.uri = loader.baseURL + module.id;

          module.config = function() {};

          // add back in system dependencies
          if (moduleIndex != -1)
            depValues.splice(moduleIndex, 0, module);
          
          if (exportsIndex != -1)
            depValues.splice(exportsIndex, 0, exports);
          
          if (requireIndex != -1)
            depValues.splice(requireIndex, 0, makeRequire(module.id, require, loader));

          var output = factory.apply(global, depValues);

          if (typeof output == 'undefined' && module)
            output = module.exports;

          if (typeof output != 'undefined')
            return output;
        }
      };

      // anonymous define
      if (!name) {
        // already defined anonymously -> throw
        if (anonDefine)
          throw new TypeError('Multiple defines for anonymous module');
        anonDefine = define;
      }
      // named define
      else {
        // if it has no dependencies and we don't have any other
        // defines, then let this be an anonymous define
        if (deps.length == 0 && !anonDefine && !defineBundle)
          anonDefine = define;

        // otherwise its a bundle only
        else
          anonDefine = null;

        // the above is just to support single modules of the form:
        // define('jquery')
        // still loading anonymously
        // because it is done widely enough to be useful

        // note this is now a bundle
        defineBundle = true;

        // define the module through the register registry
        loader.register(name, define.deps, false, define.execute);
      }
    };
    define.amd = {};
    loader.amdDefine = define;
  }

  var anonDefine;
  // set to true if the current module turns out to be a named define bundle
  var defineBundle;

  var oldModule, oldExports, oldDefine;

  // adds define as a global (potentially just temporarily)
  function createDefine(loader) {
    if (!loader.amdDefine)
      generateDefine(loader);

    anonDefine = null;
    defineBundle = null;

    // ensure no NodeJS environment detection
    var global = loader.global;

    oldModule = global.module;
    oldExports = global.exports;
    oldDefine = global.define;

    global.module = undefined;
    global.exports = undefined;

    if (global.define && global.define === loader.amdDefine)
      return;

    global.define = loader.amdDefine;
  }

  function removeDefine(loader) {
    var global = loader.global;
    global.define = oldDefine;
    global.module = oldModule;
    global.exports = oldExports;
  }

  generateDefine(loader);

  if (loader.scriptLoader) {
    var loaderFetch = loader.fetch;
    loader.fetch = function(load) {
      createDefine(this);
      return loaderFetch.call(this, load);
    }
  }

  var loaderInstantiate = loader.instantiate;
  loader.instantiate = function(load) {
    var loader = this;

    if (load.metadata.format == 'amd' || !load.metadata.format && load.source.match(amdRegEx)) {
      load.metadata.format = 'amd';

      if (loader.execute !== false) {
        createDefine(loader);

        loader.__exec(load);

        removeDefine(loader);

        if (!anonDefine && !defineBundle && !isNode)
          throw new TypeError('AMD module ' + load.name + ' did not define');
      }

      if (anonDefine) {
        load.metadata.deps = load.metadata.deps ? load.metadata.deps.concat(anonDefine.deps) : anonDefine.deps;
        load.metadata.execute = anonDefine.execute;
      }
    }

    return loaderInstantiate.call(loader, load);
  }
}
/*
  SystemJS map support
  
  Provides map configuration through
    System.map['jquery'] = 'some/module/map'

  As well as contextual map config through
    System.map['bootstrap'] = {
      jquery: 'some/module/map2'
    }

  Note that this applies for subpaths, just like RequireJS

  jquery      -> 'some/module/map'
  jquery/path -> 'some/module/map/path'
  bootstrap   -> 'bootstrap'

  Inside any module name of the form 'bootstrap' or 'bootstrap/*'
    jquery    -> 'some/module/map2'
    jquery/p  -> 'some/module/map2/p'

  Maps are carefully applied from most specific contextual map, to least specific global map
*/
function map(loader) {
  loader.map = loader.map || {};

  loader._extensions.push(map);

  // return if prefix parts (separated by '/') match the name
  // eg prefixMatch('jquery/some/thing', 'jquery') -> true
  //    prefixMatch('jqueryhere/', 'jquery') -> false
  function prefixMatch(name, prefix) {
    if (name.length < prefix.length)
      return false;
    if (name.substr(0, prefix.length) != prefix)
      return false;
    if (name[prefix.length] && name[prefix.length] != '/')
      return false;
    return true;
  }

  // get the depth of a given path
  // eg pathLen('some/name') -> 2
  function pathLen(name) {
    var len = 1;
    for (var i = 0, l = name.length; i < l; i++)
      if (name[i] === '/')
        len++;
    return len;
  }

  function doMap(name, matchLen, map) {
    return map + name.substr(matchLen);
  }

  // given a relative-resolved module name and normalized parent name,
  // apply the map configuration
  function applyMap(name, parentName, loader) {
    var curMatch, curMatchLength = 0;
    var curParent, curParentMatchLength = 0;
    var tmpParentLength, tmpPrefixLength;
    var subPath;
    var nameParts;
    
    // first find most specific contextual match
    if (parentName) {
      for (var p in loader.map) {
        var curMap = loader.map[p];
        if (typeof curMap != 'object')
          continue;

        // most specific parent match wins first
        if (!prefixMatch(parentName, p))
          continue;

        tmpParentLength = pathLen(p);
        if (tmpParentLength <= curParentMatchLength)
          continue;

        for (var q in curMap) {
          // most specific name match wins
          if (!prefixMatch(name, q))
            continue;
          tmpPrefixLength = pathLen(q);
          if (tmpPrefixLength <= curMatchLength)
            continue;

          curMatch = q;
          curMatchLength = tmpPrefixLength;
          curParent = p;
          curParentMatchLength = tmpParentLength;
        }
      }
    }

    // if we found a contextual match, apply it now
    if (curMatch)
      return doMap(name, curMatch.length, loader.map[curParent][curMatch]);

    // now do the global map
    for (var p in loader.map) {
      var curMap = loader.map[p];
      if (typeof curMap != 'string')
        continue;

      if (!prefixMatch(name, p))
        continue;

      var tmpPrefixLength = pathLen(p);

      if (tmpPrefixLength <= curMatchLength)
        continue;

      curMatch = p;
      curMatchLength = tmpPrefixLength;
    }

    if (curMatch)
      return doMap(name, curMatch.length, loader.map[curMatch]);

    return name;
  }

  var loaderNormalize = loader.normalize;
  loader.normalize = function(name, parentName, parentAddress) {
    var loader = this;
    if (!loader.map)
      loader.map = {};

    var isPackage = false;
    if (name.substr(name.length - 1, 1) == '/') {
      isPackage = true;
      name += '#';
    }

    return Promise.resolve(loaderNormalize.call(loader, name, parentName, parentAddress))
    .then(function(name) {
      name = applyMap(name, parentName, loader);

      // Normalize "module/" into "module/module"
      // Convenient for packages
      if (isPackage) {
        var nameParts = name.split('/');
        nameParts.pop();
        var pkgName = nameParts.pop();
        nameParts.push(pkgName);
        nameParts.push(pkgName);
        name = nameParts.join('/');
      }

      return name;
    });
  }
}
/*
  SystemJS Plugin Support

  Supports plugin syntax with "!"

  The plugin name is loaded as a module itself, and can override standard loader hooks
  for the plugin resource. See the plugin section of the systemjs readme.
*/
function plugins(loader) {
  if (typeof indexOf == 'undefined')
    indexOf = Array.prototype.indexOf;

  loader._extensions.push(plugins);

  var loaderNormalize = loader.normalize;
  loader.normalize = function(name, parentName, parentAddress) {
    var loader = this;
    // if parent is a plugin, normalize against the parent plugin argument only
    var parentPluginIndex;
    if (parentName && (parentPluginIndex = parentName.indexOf('!')) != -1)
      parentName = parentName.substr(0, parentPluginIndex);

    return Promise.resolve(loaderNormalize.call(loader, name, parentName, parentAddress))
    .then(function(name) {
      // if this is a plugin, normalize the plugin name and the argument
      var pluginIndex = name.lastIndexOf('!');
      if (pluginIndex != -1) {
        var argumentName = name.substr(0, pluginIndex);

        // plugin name is part after "!" or the extension itself
        var pluginName = name.substr(pluginIndex + 1) || argumentName.substr(argumentName.lastIndexOf('.') + 1);

        // normalize the plugin name relative to the same parent
        return new Promise(function(resolve) {
          resolve(loader.normalize(pluginName, parentName, parentAddress)); 
        })
        // normalize the plugin argument
        .then(function(_pluginName) {
          pluginName = _pluginName;
          return loader.normalize(argumentName, parentName, parentAddress);
        })
        .then(function(argumentName) {
          return argumentName + '!' + pluginName;
        });
      }

      // standard normalization
      return name;
    });
  };

  var loaderLocate = loader.locate;
  loader.locate = function(load) {
    var loader = this;

    var name = load.name;

    // only fetch the plugin itself if this name isn't defined
    if (this.defined && this.defined[name])
      return loaderLocate.call(this, load);

    // plugin
    var pluginIndex = name.lastIndexOf('!');
    if (pluginIndex != -1) {
      var pluginName = name.substr(pluginIndex + 1);

      // the name to locate is the plugin argument only
      load.name = name.substr(0, pluginIndex);

      var pluginLoader = loader.pluginLoader || loader;

      // load the plugin module
      // NB ideally should use pluginLoader.load for normalized,
      //    but not currently working for some reason
      return pluginLoader['import'](pluginName)
      .then(function() {
        var plugin = pluginLoader.get(pluginName);
        plugin = plugin['default'] || plugin;

        // allow plugins to opt-out of build
        if (plugin.build === false && loader.pluginLoader)
          load.metadata.build = false;

        // store the plugin module itself on the metadata
        load.metadata.plugin = plugin;
        load.metadata.pluginName = pluginName;
        load.metadata.pluginArgument = load.name;
        load.metadata.buildType = plugin.buildType || "js";

        // run plugin locate if given
        if (plugin.locate)
          return plugin.locate.call(loader, load);

        // otherwise use standard locate without '.js' extension adding
        else
          return Promise.resolve(loader.locate(load))
          .then(function(address) {
            return address.replace(/\.js$/, '');
          });
      });
    }

    return loaderLocate.call(this, load);
  };

  var loaderFetch = loader.fetch;
  loader.fetch = function(load) {
    var loader = this;
    // ignore fetching build = false unless in a plugin loader
    if (load.metadata.build === false && loader.pluginLoader)
      return '';
    else if (load.metadata.plugin && load.metadata.plugin.fetch && !load.metadata.pluginFetchCalled) {
      load.metadata.pluginFetchCalled = true;
      return load.metadata.plugin.fetch.call(loader, load, loaderFetch);
    }
    else
      return loaderFetch.call(loader, load);
  };

  var loaderTranslate = loader.translate;
  loader.translate = function(load) {
    var loader = this;
    if (load.metadata.plugin && load.metadata.plugin.translate)
      return Promise.resolve(load.metadata.plugin.translate.call(loader, load)).then(function(result) {
        if (typeof result == 'string')
          load.source = result;
        return loaderTranslate.call(loader, load);
      });
    else
      return loaderTranslate.call(loader, load);
  };

  var loaderInstantiate = loader.instantiate;
  loader.instantiate = function(load) {
    var loader = this;
    if (load.metadata.plugin && load.metadata.plugin.instantiate)
       return Promise.resolve(load.metadata.plugin.instantiate.call(loader, load)).then(function(result) {
        if (result) {
          // load.metadata.format = 'defined';
          // load.metadata.execute = function() {
          //   return result;
          // };
          return result;
        }
        return loaderInstantiate.call(loader, load);
      });
    else if (load.metadata.plugin && load.metadata.plugin.build === false) {
      load.metadata.format = 'defined';
      load.metadata.deps.push(load.metadata.pluginName);
      load.metadata.execute = function() {
        return loader.newModule({});
      };
      return loaderInstantiate.call(loader, load);
    }
    else
      return loaderInstantiate.call(loader, load);
  }

}
/*
  System bundles

  Allows a bundle module to be specified which will be dynamically 
  loaded before trying to load a given module.

  For example:
  System.bundles['mybundle'] = ['jquery', 'bootstrap/js/bootstrap']

  Will result in a load to "mybundle" whenever a load to "jquery"
  or "bootstrap/js/bootstrap" is made.

  In this way, the bundle becomes the request that provides the module
*/

function bundles(loader) {
  if (typeof indexOf == 'undefined')
    indexOf = Array.prototype.indexOf;

  loader._extensions.push(bundles);

  // bundles support (just like RequireJS)
  // bundle name is module name of bundle itself
  // bundle is array of modules defined by the bundle
  // when a module in the bundle is requested, the bundle is loaded instead
  // of the form System.bundles['mybundle'] = ['jquery', 'bootstrap/js/bootstrap']
  loader.bundles = loader.bundles || {};

  var loaderFetch = loader.fetch;
  loader.fetch = function(load) {
    var loader = this;
    if (loader.trace)
      return loaderFetch.call(this, load);
    if (!loader.bundles)
      loader.bundles = {};

    // if this module is in a bundle, load the bundle first then
    for (var b in loader.bundles) {
      if (indexOf.call(loader.bundles[b], load.name) == -1)
        continue;
      // we do manual normalization in case the bundle is mapped
      // this is so we can still know the normalized name is a bundle
      return Promise.resolve(loader.normalize(b))
      .then(function(normalized) {
        loader.bundles[normalized] = loader.bundles[normalized] || loader.bundles[b];

        // note this module is a bundle in the meta
        loader.meta = loader.meta || {};
        loader.meta[normalized] = loader.meta[normalized] || {};
        loader.meta[normalized].bundle = true;

        return loader.load(normalized);
      })
      .then(function() {
        return '';
      });
    }
    return loaderFetch.call(this, load);
  }
}
/*
 * Dependency Tree Cache
 * 
 * Allows a build to pre-populate a dependency trace tree on the loader of 
 * the expected dependency tree, to be loaded upfront when requesting the
 * module, avoinding the n round trips latency of module loading, where 
 * n is the dependency tree depth.
 *
 * eg:
 * System.depCache = {
 *  'app': ['normalized', 'deps'],
 *  'normalized': ['another'],
 *  'deps': ['tree']
 * };
 * 
 * System.import('app') 
 * // simultaneously starts loading all of:
 * // 'normalized', 'deps', 'another', 'tree'
 * // before "app" source is even loaded
 */

function depCache(loader) {
  loader.depCache = loader.depCache || {};

  loader._extensions.push(depCache);

  var loaderLocate = loader.locate;
  loader.locate = function(load) {
    var loader = this;

    if (!loader.depCache)
      loader.depCache = {};

    // load direct deps, in turn will pick up their trace trees
    var deps = loader.depCache[load.name];
    if (deps)
      for (var i = 0; i < deps.length; i++)
        loader.load(deps[i]);

    return loaderLocate.call(loader, load);
  }
}
  
core(System);
meta(System);
register(System);
es6(System);
global(System);
cjs(System);
amd(System);
map(System);
plugins(System);
bundles(System);
depCache(System);

};

var $__curScript, __eval;

(function() {

  var doEval;

  __eval = function(source, address, sourceMap) {
    source += '\n//# sourceURL=' + address + (sourceMap ? '\n//# sourceMappingURL=' + sourceMap : '');

    try {
      doEval(source);
    }
    catch(e) {
      var msg = 'Error evaluating ' + address + '\n';
      if (e instanceof Error)
        e.message = msg + e.message;
      else
        e = msg + e;
      throw e;
    }
  };

  if (typeof document != 'undefined') {
    var head;

    var scripts = document.getElementsByTagName('script');
    $__curScript = scripts[scripts.length - 1];

    // globally scoped eval for the browser
    doEval = function(source) {
      if (!head)
        head = document.head || document.body || document.documentElement;

      var script = document.createElement('script');
      script.text = source;
      var onerror = window.onerror;
      var e;
      window.onerror = function(_e) {
        e = _e;
      }
      head.appendChild(script);
      head.removeChild(script);
      window.onerror = onerror;
      if (e)
        throw e;
    }

    if (!$__global.System || !$__global.LoaderPolyfill) {
      // determine the current script path as the base path
      var curPath = $__curScript.src;
      var basePath = curPath.substr(0, curPath.lastIndexOf('/') + 1);
      document.write(
        '<' + 'script type="text/javascript" src="' + basePath + 'es6-module-loader.js" data-init="upgradeSystemLoader">' + '<' + '/script>'
      );
    }
    else {
      $__global.upgradeSystemLoader();
    }
  }
  else if (typeof WorkerGlobalScope != 'undefined' && typeof importScripts != 'undefined') {
    doEval = function(source) {
      try {
        eval(source);
      } catch(e) {
        throw e;
      }
    };

    if (!$__global.System || !$__global.LoaderPolyfill) {
      var basePath = '';
      try {
        throw new Error('Get worker base path via error stack');
      } catch (e) {
        e.stack.replace(/(?:at|@).*(http.+):[\d]+:[\d]+/, function (m, url) {
          basePath = url.replace(/\/[^\/]*$/, '/');
        });
      }
      importScripts(basePath + 'es6-module-loader.js');
      $__global.upgradeSystemLoader();
    } else {
      $__global.upgradeSystemLoader();
    }
  }
  else {
    var es6ModuleLoader = require('es6-module-loader');
    $__global.System = es6ModuleLoader.System;
    $__global.Loader = es6ModuleLoader.Loader;
    $__global.upgradeSystemLoader();
    module.exports = $__global.System;

    // global scoped eval for node
    var vm = require('vm');
    doEval = function(source, address, sourceMap) {
      vm.runInThisContext(source);
    }
  }
})();

})(typeof window != 'undefined' ? window : (typeof WorkerGlobalScope != 'undefined' ? self : global));

(function(global){

	// helpers
	var camelize = function(str){
		return str.replace(/-+(.)?/g, function(match, chr){ 
			return chr ? chr.toUpperCase() : '' 
		});
	},
		each = function( o, cb){
			var i, len;

			// weak array detection, but we only use this internally so don't
			// pass it weird stuff
			if ( typeof o.length == 'number' && (o.length - 1) in o) {
				for ( i = 0, len = o.length; i < len; i++ ) {
					cb.call(o[i], o[i], i, o);
				}
			} else {
				for ( i in o ) {
					if(o.hasOwnProperty(i)){
						cb.call(o[i], o[i], i, o);
					}
				}
			}
			return o;
		},
		map = function(o, cb) {
			var arr = [];
			each(o, function(item, i){
				arr[i] = cb(item, i);
			});
			return arr;
		},
		isString = function(o) {
			return typeof o == "string";
		},
		extend = function(d,s){
			each(s, function(v, p){
				d[p] = v;
			});
			return d;
		},
		dir = function(uri){
			var lastSlash = uri.lastIndexOf("/");
			//if no / slashes, check for \ slashes since it might be a windows path
			if(lastSlash === -1)
				lastSlash = uri.lastIndexOf("\\");
			if(lastSlash !== -1) {
				return uri.substr(0, lastSlash);
			} else {
				return uri;
			}
		},
		last = function(arr){
			return arr[arr.length - 1];
		},
		parseURI = function(url) {
			var m = String(url).replace(/^\s+|\s+$/g, '').match(/^([^:\/?#]+:)?(\/\/(?:[^:@]*(?::[^:@]*)?@)?(([^:\/?#]*)(?::(\d*))?))?([^?#]*)(\?[^#]*)?(#[\s\S]*)?/);
				// authority = '//' + user + ':' + pass '@' + hostname + ':' port
				return (m ? {
				href     : m[0] || '',
				protocol : m[1] || '',
				authority: m[2] || '',
				host     : m[3] || '',
				hostname : m[4] || '',
				port     : m[5] || '',
				pathname : m[6] || '',
				search   : m[7] || '',
				hash     : m[8] || ''
			} : null);
		},
		joinURIs = function(base, href) {
			function removeDotSegments(input) {
				var output = [];
				input.replace(/^(\.\.?(\/|$))+/, '')
					.replace(/\/(\.(\/|$))+/g, '/')
					.replace(/\/\.\.$/, '/../')
					.replace(/\/?[^\/]*/g, function (p) {
						if (p === '/..') {
							output.pop();
						} else {
							output.push(p);
						}
					});
				return output.join('').replace(/^\//, input.charAt(0) === '/' ? '/' : '');
			}

			href = parseURI(href || '');
			base = parseURI(base || '');

			return !href || !base ? null : (href.protocol || base.protocol) +
				(href.protocol || href.authority ? href.authority : base.authority) +
				removeDotSegments(href.protocol || href.authority || href.pathname.charAt(0) === '/' ? href.pathname : (href.pathname ? ((base.authority && !base.pathname ? '/' : '') + base.pathname.slice(0, base.pathname.lastIndexOf('/') + 1) + href.pathname) : base.pathname)) +
					(href.protocol || href.authority || href.pathname ? href.search : (href.search || base.search)) +
					href.hash;
		},
		isWebWorker = typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope,
		isBrowserWithWindow = typeof window !== "undefined",
		isNode = !isBrowserWithWindow && !isWebWorker && typeof require != 'undefined';

	var filename = function(uri){
		var lastSlash = uri.lastIndexOf("/");
		//if no / slashes, check for \ slashes since it might be a windows path
		if(lastSlash === -1)
			lastSlash = uri.lastIndexOf("\\");
		var matches = ( lastSlash == -1 ? uri : uri.substr(lastSlash+1) ).match(/^[\w-\s\.!]+/);
		return matches ? matches[0] : "";
	};
	
	var ext = function(uri){
		var fn = filename(uri);
		var dot = fn.lastIndexOf(".");
		if(dot !== -1) {
			return fn.substr(dot+1);
		} else {
			return "";
		}
	};

	var pluginCache = {};
	
	var normalize = function(name, loader){

		// Detech if this name contains a plugin part like: app.less!steal/less
		// and catch the plugin name so that when it is normalized we do not perform
		// Steal's normalization against it.
		var pluginIndex = name.lastIndexOf('!');
		var pluginPart = "";
		if (pluginIndex != -1) {
			// argumentName is the part before the !
			var argumentName = name.substr(0, pluginIndex);
			var pluginName = name.substr(pluginIndex + 1);
			pluginPart = "!" + pluginName;

			// Set the name to the argument name so that we can normalize it alone.
			name = argumentName;
		} 
		
		var last = filename(name),
			extension = ext(name);
		// if the name ends with /
		if(	name[name.length -1] === "/" ) {
			return name+filename( name.substr(0, name.length-1) ) + pluginPart;
		} else if(	!/^(\w+(?:s)?:\/\/|\.|file|\/)/.test(name) &&
			// and doesn't end with a dot
			 last.indexOf(".") === -1 
			) {
			return name+"/"+last + pluginPart;
		} else {
			if(extension === "js") {
				return name.substr(0, name.lastIndexOf(".")) + pluginPart;
			} else {
				return name + pluginPart;
			}
		}
	};

var cloneSteal = function(System){
	var loader = System || this.System;
	return makeSteal(this.addSteal(loader.clone()));
};

var makeSteal = function(System){
	
	System.set('@loader', System.newModule({'default':System, __useDefault: true}));
		
	var configDeferred,
		devDeferred,
		appDeferred;

	var steal = function(){
		var args = arguments;
		var afterConfig = function(){
			var imports = [];
			var factory;
			each(args, function(arg){
				if(isString(arg)) {
					imports.push( steal.System['import']( normalize(arg) ) );
				} else if(typeof arg === "function") {
					factory = arg;
				}
			});
			
			var modules = Promise.all(imports);
			if(factory) {
				return modules.then(function(modules) {
			        return factory && factory.apply(null, modules);
			   });
			} else {
				return modules;
			}
		};
		if(System.env === "production") {
			return afterConfig();
		} else {
			// wait until the config has loaded
			return configDeferred.then(afterConfig,afterConfig);
		}
		
	};
	
	steal.System = System;
	steal.parseURI = parseURI;
	steal.joinURIs = joinURIs;
	steal.normalize = normalize;

	// System.ext = {bar: "path/to/bar"}
	// foo.bar! -> foo.bar!path/to/bar
	var addExt = function(loader) {
		
		loader.ext = {};
		
		var normalize = loader.normalize,
			endingExtension = /\.(\w+)!$/;
			
		loader.normalize = function(name, parentName, parentAddress){
			var matches = name.match(endingExtension),
				ext,
				newName = name;
			
			if(matches && loader.ext[ext = matches[1]]) {
				newName = name + loader.ext[ext];
			}
			return normalize.call(this, newName, parentName, parentAddress);
		};
	};

	if(typeof System){
		addExt(System);
	}
	

	// "path/to/folder/" -> "path/to/folder/folder"
	var addForwardSlash = function(loader) {
		var normalize = loader.normalize;

		var npmLike = /@.+#.+/;

		loader.normalize = function(name, parentName, parentAddress) {
			var lastPos = name.length - 1,
				secondToLast,
				folderName;

			if (name[lastPos] === "/") {
				secondToLast = name.substring(0, lastPos).lastIndexOf("/");
				folderName = name.substring(secondToLast + 1, lastPos);
				if(npmLike.test(folderName)) {
					folderName = folderName.substr(folderName.lastIndexOf("#") + 1);
				}

				name += folderName;
			}
			return normalize.call(this, name, parentName, parentAddress);
		};
	};

	if (typeof System) {
		addForwardSlash(System);
	}

/*
  SystemJS JSON Format
  Provides the JSON module format definition.
*/
function _SYSTEM_addJSON(loader) {
	var jsonTest = /^[\s\n\r]*[\{\[]/;
	var jsonExt = /\.json$/i;
	var jsExt = /\.js$/i;
	var inNode = typeof window === "undefined";

	// Add the extension to _extensions so that it can be cloned.
	loader._extensions.push(_SYSTEM_addJSON);

	// if someone has a moduleName that is .json, make sure it loads a json file
	// no matter what paths might do
	var loaderLocate = loader.locate;
	loader.locate = function(load){
	  return loaderLocate.apply(this, arguments).then(function(address){
		if(jsonExt.test(load.name)) {
			return address.replace(jsExt, "");
		}

	    return address;
	  });
	};

	// If we are in a build we should convert to CommonJS instead.
	if(inNode) {
		var loaderTranslate = loader.translate;
		loader.translate = function(load){
			if(jsonExt.test(load.name)) {
				var parsed = parse(load);
				if(parsed) {
					return "def" + "ine([], function(){\n" +
						"\treturn " + load.source + "\n});";
				}
			}

			return loaderTranslate.call(this, load);
		};
		return;
	}

	var loaderInstantiate = loader.instantiate;
	loader.instantiate = function(load) {
		var loader = this,
			parsed;

		parsed = parse(load);
		if(parsed) {
			load.metadata.format = 'json';

			load.metadata.execute = function(){
				return parsed;
			};
		}

		return loaderInstantiate.call(loader, load);
	};

	return loader;

	// Attempt to parse a load as json.
	function parse(load){
		if ( (load.metadata.format === 'json' || !load.metadata.format) && jsonTest.test(load.source)  ) {
			try {
				return JSON.parse(load.source);
			} catch(e) {}
		}

	}
}

if (typeof System !== "undefined") {
	_SYSTEM_addJSON(System);
}

	// Overwrites System.config with setter hooks
	var setterConfig = function(loader, configSpecial){
		var oldConfig = loader.config;

		loader.config =  function(cfg){

			var data = extend({},cfg);
			// check each special
			each(configSpecial, function(special, name){
				// if there is a setter and a value
				if(special.set && data[name]){
					// call the setter
					var res = special.set.call(loader,data[name], cfg);
					// if the setter returns a value
					if(res !== undefined) {
						// set that on the loader
						loader[name] = res;
					}
					// delete the property b/c setting is done
					delete data[name];
				}
			});
			oldConfig.call(this, data);
		};
	};

	var setIfNotPresent = function(obj, prop, value){
		if(!obj[prop]) {
			obj[prop] = value;
		}
	};

	// steal.js's default configuration values
	System.configMain = "@config";
	System.paths[System.configMain] = "stealconfig.js";
	System.env = "development";
	System.ext = {
		css: '$css',
		less: '$less'
	};
	System.logLevel = 0;
	var cssBundlesNameGlob = "bundles/*.css",
		jsBundlesNameGlob = "bundles/*";
	setIfNotPresent(System.paths,cssBundlesNameGlob, "dist/bundles/*css");
	setIfNotPresent(System.paths,jsBundlesNameGlob, "dist/bundles/*.js");

	var configSetter = {
		set: function(val){
			var name = filename(val),
				root = dir(val);

			if(!isNode) {
				System.configPath = joinURIs( location.href, val);
			}
			System.configMain = name;
			System.paths[name] = name;
			addProductionBundles.call(this);
			this.config({ baseURL: (root === val ? "." : root) + "/" });
		}
	},
		mainSetter = {
			set: function(val){
				this.main = val;
				addProductionBundles.call(this);
			}
		};

	// checks if we're running in node, then prepends the "file:" protocol if we are
	var envPath = function(val) {
		if(isNode && !/^file:/.test(val)) {
			// If relative join with the current working directory
			if(val[0] === "." && (val[1] === "/" ||
								 (val[1] === "." && val[2] === "/"))) {
				val = require("path").join(process.cwd(), val);
			}
			if(!val) return val;

			return "file:" + val;
		}
		return val;
	};

	var fileSetter = function(prop) {
		return {
			set: function(val) {
				this[prop] = envPath(val);
			}
		};
	};

	var setToSystem = function(prop){
		return {
			set: function(val){
				if(typeof val === "object" && typeof steal.System[prop] === "object") {
					this[prop] = extend(this[prop] || {},val || {});
				} else {
					this[prop] = val;
				}
			}
		};
	};

	var pluginPart = function(name) {
		var bang = name.lastIndexOf("!");
		if(bang !== -1) {
			return name.substr(bang+1);
		}
	};
	var pluginResource = function(name){
		var bang = name.lastIndexOf("!");
		if(bang !== -1) {
			return name.substr(0, bang);
		}
	};

	var addProductionBundles = function(){
		if(this.env === "production" && this.main) {
			var main = this.main,
				bundlesDir = this.bundlesName || "bundles/",
				mainBundleName = bundlesDir+main;

			setIfNotPresent(this.meta, mainBundleName, {format:"amd"});

			// If the configMain has a plugin like package.json!npm,
			// plugin has to be defined prior to importing.
			var plugin = pluginPart(System.configMain);
			var bundle = [main, System.configMain];
			if(plugin){
				System.set(plugin, System.newModule({}));
			}
			plugin = pluginPart(main);
			if(plugin) {
				var resource = pluginResource(main);
				bundle.push(plugin);
				bundle.push(resource);

				mainBundleName = bundlesDir+resource.substr(0, resource.indexOf("."));
			}

			this.bundles[mainBundleName] = bundle;
		}
	};

	var LESS_ENGINE = "less-2.4.0";
	var specialConfig;
	setterConfig(System, specialConfig = {
		env: {
			set: function(val){
				System.env =  val;
				addProductionBundles.call(this);
			}
		},
		baseUrl: fileSetter("baseURL"),
		baseURL: fileSetter("baseURL"),
		root: fileSetter("baseURL"),  //backwards comp
		config: configSetter,
		configPath: configSetter,
		startId: {
			set: function(val){
				mainSetter.set.call(this, normalize(val) );
			}
		},
		main: mainSetter,
		stealURL: {
			// http://domain.com/steal/steal.js?moduleName,env&
			set: function(url, cfg)	{
				System.stealURL = url;
				var urlParts = url.split("?");

				var path = urlParts.shift(),
					search = urlParts.join("?"),
					searchParts = search.split("&"),
					paths = path.split("/"),
					lastPart = paths.pop(),
					stealPath = paths.join("/");

				specialConfig.stealPath.set.call(this,stealPath, cfg);

				if (lastPart.indexOf("steal.production") > -1 && !cfg.env) {
					System.env = "production";
					addProductionBundles.call(this);
				}

				if(searchParts.length && searchParts[0].length) {
					var searchConfig = {},
						searchPart;
					for(var i =0; i < searchParts.length; i++) {
						searchPart = searchParts[i];
						var paramParts = searchPart.split("=");
						if(paramParts.length > 1) {
							searchConfig[paramParts[0]] = paramParts.slice(1).join("=");
						} else {
							if(steal.dev) {
								steal.dev.warn("Please use search params like ?main=main&env=production");
							}
							var oldParamParts = searchPart.split(",");
							if (oldParamParts[0]) {
								searchConfig.startId = oldParamParts[0];
							}
							if (oldParamParts[1]) {
								searchConfig.env = oldParamParts[1];
							}
						}
					}
					this.config(searchConfig);
				}

				// Split on / to get rootUrl




			}
		},
		// this gets called with the __dirname steal is in
		stealPath: {
			set: function(dirname, cfg) {
				dirname = envPath(dirname);
				var parts = dirname.split("/");

				// steal keeps this around to make things easy no matter how you are using it.
				setIfNotPresent(this.paths,"@dev", dirname+"/ext/dev.js");
				setIfNotPresent(this.paths,"$css", dirname+"/ext/css.js");
				setIfNotPresent(this.paths,"$less", dirname+"/ext/less.js");
				setIfNotPresent(this.paths,"npm", dirname+"/ext/npm.js");
				setIfNotPresent(this.paths,"npm-extension", dirname+"/ext/npm-extension.js");
				setIfNotPresent(this.paths,"npm-utils", dirname+"/ext/npm-utils.js");
				setIfNotPresent(this.paths,"npm-crawl", dirname+"/ext/npm-crawl.js");
				setIfNotPresent(this.paths,"semver", dirname+"/ext/semver.js");
				setIfNotPresent(this.paths,"bower", dirname+"/ext/bower.js");
				setIfNotPresent(this.paths,"live-reload", dirname+"/ext/live-reload.js");
				this.paths["traceur"] = dirname+"/ext/traceur.js";
				this.paths["traceur-runtime"] = dirname+"/ext/traceur-runtime.js";
				this.paths["babel"] = dirname+"/ext/babel.js";
				this.paths["babel-runtime"] = dirname+"/ext/babel-runtime.js";

				if(isNode) {
					System.register("less",[], false, function(){
						var r = require;
						return r('less');
					});

					if(this.configMain === "@config" && last(parts) === "steal") {
						parts.pop();
						if(last(parts) === "node_modules") {
							this.configMain = "package.json!npm";
							addProductionBundles.call(this);
							parts.pop();
						}
					}

				} else {
					setIfNotPresent(this.paths,"less",  dirname+"/ext/"+LESS_ENGINE+".js");

					// make sure we don't set baseURL if something else is going to set it
					if(!cfg.root && !cfg.baseUrl && !cfg.baseURL && !cfg.config && !cfg.configPath ) {
						if ( last(parts) === "steal" ) {
							parts.pop();
							if ( last(parts) === "bower_components" ) {
								System.configMain = "bower.json!bower";
								addProductionBundles.call(this);
								parts.pop();
							}
							if (last(parts) === "node_modules") {
								System.configMain = "package.json!npm";
								addProductionBundles.call(this);
								parts.pop();
							}
						}
						this.config({ baseURL: parts.join("/")+"/"});
					}
				}
				System.stealPath = dirname;
			}
		},
		// System.config does not like being passed arrays.
		bundle: {
			set: function(val){
				System.bundle = val;
			}
		},
		bundlesPath: {
			set: function(val){
				this.paths[cssBundlesNameGlob] = val+"/*css";
				this.paths[jsBundlesNameGlob]  = val+"/*.js";
				return val;
			}
		},
		instantiated: {
			set: function(val){
				var loader = this;

				each(val || {}, function(value, name){
					loader.set(name,  loader.newModule(value));
				});
			}
		}
	});

	steal.config = function(cfg){
		if(typeof cfg === "string") {
			return System[cfg];
		} else {
			System.config(cfg);
		}
	};


	var getScriptOptions = function () {

		var options = {},
			parts, src, query, startFile, env,
			scripts = document.getElementsByTagName("script");

		var script = scripts[scripts.length - 1];

		if (script) {
			options.stealURL = script.src;
			// Split on question mark to get query

			each(script.attributes, function(attr){
				var optionName = 
					camelize( attr.nodeName.indexOf("data-") === 0 ?
						attr.nodeName.replace("data-","") :
						attr.nodeName );
				options[optionName] = (attr.value === "") ? true : attr.value;
			});
			
			var source = script.innerHTML.substr(1);
			if(/\S/.test(source)){
				options.mainSource = source;
			}
		}

		return options;
	};

	steal.startup = function(config){

		// Get options from the script tag
		if (isWebWorker) {
			var urlOptions = {
				stealURL: location.href	
			};
		} else if(global.document) {
			var urlOptions = getScriptOptions();
		} else {
			// or the only option is where steal is.
			var urlOptions = {
				stealPath: __dirname
			};
		}

		// B: DO THINGS WITH OPTIONS
		// CALCULATE CURRENT LOCATION OF THINGS ...
		System.config(urlOptions);
		
		if(config){
			System.config(config);
		}

		// Read the env now because we can't overwrite everything yet

		// immediate steals we do
		var steals = [];

		// we only load things with force = true
		if ( System.env == "production" ) {
			
			configDeferred = System["import"](System.configMain);

			appDeferred = configDeferred.then(function(cfg){
				return System.main ? System["import"](System.main) : cfg;
			})["catch"](function(e){
				console.log(e);
			});

		} else if(System.env == "development" || System.env == "build"){
			configDeferred = System["import"](System.configMain);

			devDeferred = configDeferred.then(function(){
				// If a configuration was passed to startup we'll use that to overwrite
				// what was loaded in stealconfig.js
				// This means we call it twice, but that's ok
				if(config) {
					System.config(config);
				}

				return System["import"]("@dev");
			},function(e){
				console.log("steal - error loading @config.",e);
				return steal.System["import"]("@dev");
			});

			appDeferred = devDeferred.then(function(){
				// if there's a main, get it, otherwise, we are just loading
				// the config.
				if(!System.main || System.env === "build") {
					return configDeferred;
				}
				var main = System.main;
				if(typeof main === "string") {
					main = [main];
				}
				return Promise.all( map(main,function(main){
					return System["import"](main);
				}) );
			});
			
		}
		
		if(System.mainSource) {
			appDeferred = appDeferred.then(function(){
				System.module(System.mainSource);
			});
		}
		return appDeferred;
	};
	steal.done = function(){
		return appDeferred;
	};

	steal.import = function(){
		var names = arguments;
		var loader = this.System;

		function afterConfig(){
			var imports = [];
			each(names, function(name){
				imports.push(loader.import(name));
			});
			if(imports.length > 1) {
				return Promise.all(imports);
			} else {
				return imports[0];
			}
		}

		if(!configDeferred) {
			steal.startup();
		}
		
		return configDeferred.then(afterConfig);
	};
	return steal;

};
/*
  SystemJS Steal Format
  Provides the Steal module format definition.
*/
function addSteal(loader) {

  // Steal Module Format Detection RegEx
  // steal(module, ...)
  var stealRegEx = /(?:^\s*|[}{\(\);,\n\?\&]\s*)steal\s*\(\s*((?:"[^"]+"\s*,|'[^']+'\s*,\s*)*)/;

  // What we stole.
  var stealInstantiateResult;
  
  function createSteal(loader) {
    stealInstantiateResult = null;

    // ensure no NodeJS environment detection
    loader.global.module = undefined;
    loader.global.exports = undefined;

    function steal() {
      var deps = [];
      var factory;
      
      for( var i = 0; i < arguments.length; i++ ) {
        if (typeof arguments[i] === 'string') {
          deps.push( normalize(arguments[i]) );
        } else {
          factory = arguments[i];
        }
      }

      if (typeof factory !== 'function') {
        factory = (function(factory) {
          return function() { return factory; };
        })(factory);
      }

      stealInstantiateResult = {
        deps: deps,
        execute: function(require, exports, moduleName) {

          var depValues = [];
          for (var i = 0; i < deps.length; i++) {
            depValues.push(require(deps[i]));
          }

          var output = factory.apply(loader.global, depValues);

          if (typeof output !== 'undefined') {
            return output;
          }
        }
      };
    }

    loader.global.steal = steal;
  }

  var loaderInstantiate = loader.instantiate;
  loader.instantiate = function(load) {
    var loader = this;

    if (load.metadata.format === 'steal' || !load.metadata.format && load.source.match(stealRegEx)) {
      load.metadata.format = 'steal';

      var oldSteal = loader.global.steal;

      createSteal(loader);

      loader.__exec(load);

      loader.global.steal = oldSteal;

      if (!stealInstantiateResult) {
        throw "Steal module " + load.name + " did not call steal";
      }

      if (stealInstantiateResult) {
        load.metadata.deps = load.metadata.deps ? load.metadata.deps.concat(stealInstantiateResult.deps) : stealInstantiateResult.deps;
        load.metadata.execute = stealInstantiateResult.execute;
      }
    }
    return loaderInstantiate.call(loader, load);
  };

  return loader;
}

if (typeof System !== "undefined") {
  addSteal(System);
}

	if( isNode ) {
		require('systemjs');
			
		global.steal = makeSteal(System);
		global.steal.System = System;
		global.steal.dev = require("./ext/dev.js");
		steal.clone = cloneSteal;
		module.exports = global.steal;
		global.steal.addSteal = addSteal;
		require("system-json");
		
	} else {
		var oldSteal = global.steal;
		global.steal = makeSteal(System);
		global.steal.startup(oldSteal && typeof oldSteal == 'object' && oldSteal)
			.then(null, function(error){
				console.log("error",error,  error.stack);
				throw error;
			});
		global.steal.clone = cloneSteal;
		global.steal.addSteal = addSteal;
	} 
    
})(typeof window == "undefined" ? (typeof global === "undefined" ? this : global) : window);

/*[add-define]*/
((typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope) ? self : window).define = System.amdDefine;
/*[system-bundles-config]*/
System.paths["bundles/*.css"] ="../../../../public/dist/es6/*css";
System.paths["bundles/*"] = "../../../../public/dist/es6/*.js";
System.bundles = {};
/*npm-utils*/
define('npm-utils', function (require, exports, module) {
    var npmModuleRegEx = /.+@.+\..+\..+#.+/;
    var utils = {
            extend: function (d, s) {
                for (var prop in s) {
                    d[prop] = s[prop];
                }
                return d;
            },
            map: function (arr, fn) {
                var i = 0, len = arr.length, out = [];
                for (; i < len; i++) {
                    out.push(fn.call(arr, arr[i]));
                }
                return out;
            },
            filter: function (arr, fn) {
                var i = 0, len = arr.length, out = [], res;
                for (; i < len; i++) {
                    res = fn.call(arr, arr[i]);
                    if (res) {
                        out.push(res);
                    }
                }
                return out;
            },
            forEach: function (arr, fn) {
                var i = 0, len = arr.length;
                for (; i < len; i++) {
                    fn.call(arr, arr[i], i);
                }
            },
            moduleName: {
                create: function (descriptor, standard) {
                    if (standard) {
                        return descriptor.moduleName;
                    } else {
                        if (descriptor === '@empty') {
                            return descriptor;
                        }
                        var modulePath;
                        if (descriptor.modulePath) {
                            modulePath = descriptor.modulePath.substr(0, 2) === './' ? descriptor.modulePath.substr(2) : descriptor.modulePath;
                        }
                        return descriptor.packageName + (descriptor.version ? '@' + descriptor.version : '') + (modulePath ? '#' + modulePath : '') + (descriptor.plugin ? descriptor.plugin : '');
                    }
                },
                isNpm: function (moduleName) {
                    return npmModuleRegEx.test(moduleName);
                },
                parse: function (moduleName, currentPackageName) {
                    var pluginParts = moduleName.split('!');
                    var modulePathParts = pluginParts[0].split('#');
                    var versionParts = modulePathParts[0].split('@');
                    if (!modulePathParts[1] && !versionParts[0]) {
                        versionParts = ['@' + versionParts[1]];
                    }
                    var packageName, modulePath;
                    if (currentPackageName && utils.path.isRelative(moduleName)) {
                        packageName = currentPackageName;
                        modulePath = versionParts[0];
                    } else {
                        if (modulePathParts[1]) {
                            packageName = versionParts[0];
                            modulePath = modulePathParts[1];
                        } else {
                            var folderParts = versionParts[0].split('/');
                            packageName = folderParts.shift();
                            modulePath = folderParts.join('/');
                        }
                    }
                    return {
                        plugin: pluginParts.length === 2 ? '!' + pluginParts[1] : undefined,
                        version: versionParts[1],
                        modulePath: modulePath,
                        packageName: packageName,
                        moduleName: moduleName
                    };
                },
                parseFromPackage: function (loader, refPkg, name, parentName) {
                    var packageName = utils.pkg.name(refPkg), parsedModuleName = utils.moduleName.parse(name, packageName);
                    if (utils.path.isRelative(parsedModuleName.modulePath)) {
                        var parentParsed = utils.moduleName.parse(parentName, packageName);
                        if (parentParsed.packageName === parsedModuleName.packageName && parentParsed.modulePath) {
                            parsedModuleName.modulePath = utils.path.makeRelative(utils.path.joinURIs(parentParsed.modulePath, parsedModuleName.modulePath));
                        }
                    }
                    var mapName = utils.moduleName.create(parsedModuleName), mappedName;
                    if (refPkg.browser && typeof refPkg.browser !== 'string' && mapName in refPkg.browser && (!refPkg.system || !refPkg.system.ignoreBrowser)) {
                        mappedName = refPkg.browser[mapName] === false ? '@empty' : refPkg.browser[mapName];
                    }
                    var global = loader && loader.globalBrowser && loader.globalBrowser[mapName];
                    if (global) {
                        mappedName = global.moduleName === false ? '@empty' : global.moduleName;
                    }
                    if (mappedName) {
                        return utils.moduleName.parse(mappedName, packageName);
                    } else {
                        return parsedModuleName;
                    }
                }
            },
            pkg: {
                name: function (pkg) {
                    return pkg.system && pkg.system.name || pkg.name;
                },
                main: function (pkg) {
                    return utils.path.removeJS(pkg.system && pkg.system.main || typeof pkg.browser === 'string' && pkg.browser || pkg.main || 'index');
                },
                rootDir: function (pkg, isRoot) {
                    var root = isRoot ? utils.path.removePackage(pkg.fileUrl) : utils.path.pkgDir(pkg.fileUrl);
                    var lib = pkg.system && pkg.system.directories && pkg.system.directories.lib;
                    if (lib) {
                        root = utils.path.joinURIs(utils.path.addEndingSlash(root), lib);
                    }
                    return root;
                },
                findByModuleNameOrAddress: function (loader, moduleName, moduleAddress) {
                    if (loader.npm) {
                        if (moduleName) {
                            var parsed = utils.moduleName.parse(moduleName);
                            if (parsed.version && parsed.packageName) {
                                var name = parsed.packageName + '@' + parsed.version;
                                if (name in loader.npm) {
                                    return loader.npm[name];
                                }
                            }
                        }
                        if (moduleAddress) {
                            var packageFolder = utils.pkg.folderAddress(moduleAddress);
                            return packageFolder ? loader.npmPaths[packageFolder] : loader.npmPaths.__default;
                        } else {
                            return loader.npmPaths.__default;
                        }
                    }
                },
                folderAddress: function (address) {
                    var nodeModules = '/node_modules/', nodeModulesIndex = address.lastIndexOf(nodeModules), nextSlash = address.indexOf('/', nodeModulesIndex + nodeModules.length);
                    if (nodeModulesIndex >= 0) {
                        return nextSlash >= 0 ? address.substr(0, nextSlash) : address;
                    }
                },
                findDep: function (loader, refPackage, name) {
                    if (loader.npm && refPackage && !utils.path.startsWithDotSlash(name)) {
                        var curPackage = utils.path.depPackageDir(refPackage.fileUrl, name);
                        while (curPackage) {
                            var pkg = loader.npmPaths[curPackage];
                            if (pkg) {
                                return pkg;
                            }
                            var parentAddress = utils.path.parentNodeModuleAddress(curPackage);
                            if (!parentAddress) {
                                return;
                            }
                            curPackage = parentAddress + '/' + name;
                        }
                    }
                },
                findByName: function (loader, name) {
                    if (loader.npm && !utils.path.startsWithDotSlash(name)) {
                        return loader.npm[name];
                    }
                },
                hasDirectoriesLib: function (pkg) {
                    var system = pkg.system;
                    return system && system.directories && !!system.directories.lib;
                }
            },
            path: {
                makeRelative: function (path) {
                    if (utils.path.isRelative(path) && path.substr(0, 1) !== '/') {
                        return path;
                    } else {
                        return './' + path;
                    }
                },
                removeJS: function (path) {
                    return path.replace(/\.js(!|$)/, function (whole, part) {
                        return part;
                    });
                },
                removePackage: function (path) {
                    return path.replace(/\/package\.json.*/, '');
                },
                addJS: function (path) {
                    if (/\.js(on)?$/.test(path)) {
                        return path;
                    } else {
                        return path + '.js';
                    }
                },
                isRelative: function (path) {
                    return path.substr(0, 1) === '.';
                },
                joinURIs: function (base, href) {
                    function removeDotSegments(input) {
                        var output = [];
                        input.replace(/^(\.\.?(\/|$))+/, '').replace(/\/(\.(\/|$))+/g, '/').replace(/\/\.\.$/, '/../').replace(/\/?[^\/]*/g, function (p) {
                            if (p === '/..') {
                                output.pop();
                            } else {
                                output.push(p);
                            }
                        });
                        return output.join('').replace(/^\//, input.charAt(0) === '/' ? '/' : '');
                    }
                    href = parseURI(href || '');
                    base = parseURI(base || '');
                    return !href || !base ? null : (href.protocol || base.protocol) + (href.protocol || href.authority ? href.authority : base.authority) + removeDotSegments(href.protocol || href.authority || href.pathname.charAt(0) === '/' ? href.pathname : href.pathname ? (base.authority && !base.pathname ? '/' : '') + base.pathname.slice(0, base.pathname.lastIndexOf('/') + 1) + href.pathname : base.pathname) + (href.protocol || href.authority || href.pathname ? href.search : href.search || base.search) + href.hash;
                },
                startsWithDotSlash: function (path) {
                    return path.substr(0, 2) === './';
                },
                endsWithSlash: function (path) {
                    return path[path.length - 1] === '/';
                },
                addEndingSlash: function (path) {
                    return utils.path.endsWithSlash(path) ? path : path + '/';
                },
                depPackage: function (parentPackageAddress, childName) {
                    var packageFolderName = parentPackageAddress.replace(/\/package\.json.*/, '');
                    return (packageFolderName ? packageFolderName + '/' : '') + 'node_modules/' + childName + '/package.json';
                },
                depPackageDir: function (parentPackageAddress, childName) {
                    return utils.path.depPackage(parentPackageAddress, childName).replace(/\/package\.json.*/, '');
                },
                parentNodeModuleAddress: function (address) {
                    var nodeModules = '/node_modules/', nodeModulesIndex = address.lastIndexOf(nodeModules), prevModulesIndex = address.lastIndexOf(nodeModules, nodeModulesIndex - 1);
                    if (prevModulesIndex >= 0) {
                        return address.substr(0, prevModulesIndex + nodeModules.length - 1);
                    }
                },
                pkgDir: function (address) {
                    var nodeModules = '/node_modules/', nodeModulesIndex = address.lastIndexOf(nodeModules), nextSlash = address.indexOf('/', nodeModulesIndex + nodeModules.length);
                    if (nodeModulesIndex >= 0) {
                        return nextSlash >= 0 ? address.substr(0, nextSlash) : address;
                    }
                }
            },
            includeInBuild: true
        };
    function parseURI(url) {
        var m = String(url).replace(/^\s+|\s+$/g, '').match(/^([^:\/?#]+:)?(\/\/(?:[^:@]*(?::[^:@]*)?@)?(([^:\/?#]*)(?::(\d*))?))?([^?#]*)(\?[^#]*)?(#[\s\S]*)?/);
        return m ? {
            href: m[0] || '',
            protocol: m[1] || '',
            authority: m[2] || '',
            host: m[3] || '',
            hostname: m[4] || '',
            port: m[5] || '',
            pathname: m[6] || '',
            search: m[7] || '',
            hash: m[8] || ''
        } : null;
    }
    module.exports = utils;
});
/*npm-extension*/
define('npm-extension', function (require, exports, module) {
    'format cjs';
    var utils = require('./npm-utils');
    exports.includeInBuild = true;
    exports.addExtension = function (System) {
        var oldNormalize = System.normalize;
        System.normalize = function (name, parentName, parentAddress) {
            if (parentName && utils.path.isRelative(name) && !utils.moduleName.isNpm(parentName)) {
                return oldNormalize.call(this, name, parentName, parentAddress);
            }
            var refPkg = utils.pkg.findByModuleNameOrAddress(this, parentName, parentAddress);
            if (!refPkg) {
                return oldNormalize.call(this, name, parentName, parentAddress);
            }
            var parsedModuleName = utils.moduleName.parseFromPackage(this, refPkg, name, parentName);
            var depPkg = utils.pkg.findDep(this, refPkg, parsedModuleName.packageName);
            if (!depPkg) {
                depPkg = utils.pkg.findByName(this, parsedModuleName.packageName);
            }
            if (!depPkg) {
                var browserPackageName = this.globalBrowser[parsedModuleName.packageName];
                if (browserPackageName) {
                    parsedModuleName.packageName = browserPackageName;
                    depPkg = utils.pkg.findByName(this, parsedModuleName.packageName);
                }
            }
            if (!depPkg && refPkg === this.npmPaths.__default && name === refPkg.main && utils.pkg.hasDirectoriesLib(refPkg)) {
                parsedModuleName.version = refPkg.version;
                parsedModuleName.packageName = refPkg.name;
                parsedModuleName.modulePath = utils.pkg.main(refPkg);
                return oldNormalize.call(this, utils.moduleName.create(parsedModuleName), parentName, parentAddress);
            }
            if (depPkg) {
                parsedModuleName.version = depPkg.version;
                if (!parsedModuleName.modulePath) {
                    parsedModuleName.modulePath = utils.pkg.main(depPkg);
                }
                var moduleName = utils.moduleName.create(parsedModuleName);
                if (refPkg.system && refPkg.system.map && typeof refPkg.system.map[moduleName] === 'string') {
                    moduleName = refPkg.system.map[moduleName];
                }
                return oldNormalize.call(this, moduleName, parentName, parentAddress);
            } else {
                if (depPkg === this.npmPaths.__default) {
                    var localName = parsedModuleName.modulePath ? parsedModuleName.modulePath + (parsedModuleName.plugin ? parsedModuleName.plugin : '') : utils.pkg.main(depPkg);
                    return oldNormalize.call(this, localName, parentName, parentAddress);
                }
                if (refPkg.browser && refPkg.browser[name]) {
                    return oldNormalize.call(this, refPkg.browser[name], parentName, parentAddress);
                }
                return oldNormalize.call(this, name, parentName, parentAddress);
            }
        };
        var oldLocate = System.locate;
        System.locate = function (load) {
            var parsedModuleName = utils.moduleName.parse(load.name), loader = this;
            if (parsedModuleName.version && this.npm && !loader.paths[load.name]) {
                var pkg = this.npm[parsedModuleName.packageName];
                if (pkg) {
                    return oldLocate.call(this, load).then(function (address) {
                        var root = utils.pkg.rootDir(pkg, pkg === loader.npmPaths.__default);
                        if (parsedModuleName.modulePath) {
                            return utils.path.joinURIs(utils.path.addEndingSlash(root), parsedModuleName.plugin ? parsedModuleName.modulePath : utils.path.addJS(parsedModuleName.modulePath));
                        }
                        return address;
                    });
                }
            }
            return oldLocate.call(this, load);
        };
        var convertName = function (loader, name) {
            var pkg = utils.pkg.findByName(loader, name.split('/')[0]);
            if (pkg) {
                var parsed = utils.moduleName.parse(name, pkg.name);
                parsed.version = pkg.version;
                if (!parsed.modulePath) {
                    parsed.modulePath = utils.pkg.main(pkg);
                }
                return utils.moduleName.create(parsed);
            }
            return name;
        };
        var configSpecial = {
                map: function (map) {
                    var newMap = {}, val;
                    for (var name in map) {
                        val = map[name];
                        newMap[convertName(this, name)] = typeof val === 'object' ? configSpecial.map(val) : convertName(this, val);
                    }
                    return newMap;
                },
                meta: function (map) {
                    var newMap = {};
                    for (var name in map) {
                        newMap[convertName(this, name)] = map[name];
                    }
                    return newMap;
                },
                paths: function (paths) {
                    var newPaths = {};
                    for (var name in paths) {
                        newPaths[convertName(this, name)] = paths[name];
                    }
                    return newPaths;
                }
            };
        var oldConfig = System.config;
        System.config = function (cfg) {
            var loader = this;
            for (var name in cfg) {
                if (configSpecial[name]) {
                    cfg[name] = configSpecial[name].call(loader, cfg[name]);
                }
            }
            oldConfig.apply(loader, arguments);
        };
    };
});
/*semver*/
System.set('semver', System.newModule({}));
/*npm-crawl*/
System.set('npm-crawl', System.newModule({}));
/*npm*/
System.set('npm', System.newModule({}));
/*package.json!npm*/
define('package.json!npm', [
    '@loader',
    'npm-extension'
], function (loader, npmExtension) {
    npmExtension.addExtension(loader);
    loader._npmExtensions = [].slice.call(arguments, 2);
    (function (loader, packages) {
        var g = loader.global;
        if (!g.process) {
            g.process = {
                cwd: function () {
                },
                env: { NODE_ENV: loader.env }
            };
        }
        if (!loader.npm) {
            loader.npm = {};
            loader.npmPaths = {};
            loader.globalBrowser = {};
        }
        loader.npmPaths.__default = packages[0];
        var lib = packages[0].system && packages[0].system.directories && packages[0].system.directories.lib;
        var setGlobalBrowser = function (globals, pkg) {
            for (var name in globals) {
                loader.globalBrowser[name] = {
                    pkg: pkg,
                    moduleName: globals[name]
                };
            }
        };
        var setInNpm = function (name, pkg) {
            if (!loader.npm[name]) {
                loader.npm[name] = pkg;
            }
            loader.npm[name + '@' + pkg.version] = pkg;
        };
        var forEach = function (arr, fn) {
            var i = 0, len = arr.length;
            for (; i < len; i++) {
                fn.call(arr, arr[i]);
            }
        };
        forEach(packages, function (pkg) {
            if (pkg.system) {
                var main = pkg.system.main;
                delete pkg.system.main;
                loader.config(pkg.system);
                pkg.system.main = main;
            }
            if (pkg.globalBrowser) {
                setGlobalBrowser(pkg.globalBrowser, pkg);
            }
            var systemName = pkg.system && pkg.system.name;
            if (systemName) {
                setInNpm(systemName, pkg);
            } else {
                setInNpm(pkg.name, pkg);
            }
            if (!loader.npm[pkg.name]) {
                loader.npm[pkg.name] = pkg;
            }
            loader.npm[pkg.name + '@' + pkg.version] = pkg;
            var pkgAddress = pkg.fileUrl.replace(/\/package\.json.*/, '');
            loader.npmPaths[pkgAddress] = pkg;
        });
        forEach(loader._npmExtensions || [], function (ext) {
            if (ext.systemConfig) {
                loader.config(ext.systemConfig);
            }
        });
    }(loader, [
        {
            'name': 'war_map_engine',
            'version': '0.0.1',
            'fileUrl': 'file:/var/www/warMapEngine/package.json',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'blueimp-md5',
            'version': '1.1.0',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/blueimp-md5/package.json',
            'main': 'js/md5.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'canvas',
            'version': '1.2.3',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/canvas/package.json',
            'main': './lib/canvas.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'crypto-js',
            'version': '3.1.4',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/crypto-js/package.json',
            'main': 'index.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'es6-deferred',
            'version': '1.2.1',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/es6-deferred/package.json',
            'main': 'deferred.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'express',
            'version': '4.12.4',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/express/package.json',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'jsonminify',
            'version': '0.1.2',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/jsonminify/package.json',
            'main': './minify.json.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'mongoose',
            'version': '3.9.7',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/mongoose/package.json',
            'main': './index.js',
            'globalBrowser': {},
            'browser': 'lib/browser.js'
        },
        {
            'name': 'node-easel',
            'version': '0.1.2',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/node-easel/package.json',
            'main': './src/node-easel.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'node-uuid',
            'version': '1.4.3',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/node-uuid/package.json',
            'main': './uuid.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'node.extend',
            'version': '1.1.4',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/node.extend/package.json',
            'main': 'index',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'q',
            'version': '1.4.1',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/q/package.json',
            'main': 'q.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'traceur',
            'version': '0.0.88',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/traceur/package.json',
            'main': './src/node/api.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'validator',
            'version': '2.1.0',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/validator/package.json',
            'main': 'index.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'babelify',
            'version': '6.1.1',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/babelify/package.json',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'browserify',
            'version': '10.2.1',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/browserify/package.json',
            'main': 'index.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'chai',
            'version': '2.3.0',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/chai/package.json',
            'main': './index',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'gulp',
            'version': '3.8.11',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/gulp/package.json',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'gulp-babel',
            'version': '5.1.0',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/gulp-babel/package.json',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'mocha',
            'version': '2.2.5',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/mocha/package.json',
            'main': './index',
            'globalBrowser': {},
            'browser': './mocha.js'
        },
        {
            'name': 'mocha-traceur',
            'version': '2.1.0',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/mocha-traceur/package.json',
            'main': 'index.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'vinyl-source-stream',
            'version': '1.1.0',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/vinyl-source-stream/package.json',
            'main': 'index.js',
            'globalBrowser': {},
            'browser': 'index.js'
        },
        {
            'name': 'nan',
            'version': '1.8.4',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/canvas/node_modules/nan/package.json',
            'main': 'include_dirs.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'es6-promise',
            'version': '2.1.1',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/es6-deferred/node_modules/es6-promise/package.json',
            'main': 'dist/es6-promise.js',
            'globalBrowser': {},
            'browser': { 'vertx': '@empty' }
        },
        {
            'name': 'accepts',
            'version': '1.2.7',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/express/node_modules/accepts/package.json',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'content-disposition',
            'version': '0.5.0',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/express/node_modules/content-disposition/package.json',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'content-type',
            'version': '1.0.1',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/express/node_modules/content-type/package.json',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'cookie',
            'version': '0.1.2',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/express/node_modules/cookie/package.json',
            'main': 'index.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'cookie-signature',
            'version': '1.0.6',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/express/node_modules/cookie-signature/package.json',
            'main': 'index',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'debug',
            'version': '2.2.0',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/express/node_modules/debug/package.json',
            'main': './node.js',
            'globalBrowser': {},
            'browser': './browser.js'
        },
        {
            'name': 'depd',
            'version': '1.0.1',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/express/node_modules/depd/package.json',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'escape-html',
            'version': '1.0.1',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/express/node_modules/escape-html/package.json',
            'main': 'index.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'etag',
            'version': '1.6.0',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/express/node_modules/etag/package.json',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'finalhandler',
            'version': '0.3.6',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/express/node_modules/finalhandler/package.json',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'fresh',
            'version': '0.2.4',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/express/node_modules/fresh/package.json',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'merge-descriptors',
            'version': '1.0.0',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/express/node_modules/merge-descriptors/package.json',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'methods',
            'version': '1.1.1',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/express/node_modules/methods/package.json',
            'globalBrowser': {},
            'browser': { 'http': '@empty' }
        },
        {
            'name': 'on-finished',
            'version': '2.2.1',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/express/node_modules/on-finished/package.json',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'parseurl',
            'version': '1.3.0',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/express/node_modules/parseurl/package.json',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'path-to-regexp',
            'version': '0.1.3',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/express/node_modules/path-to-regexp/package.json',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'proxy-addr',
            'version': '1.0.8',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/express/node_modules/proxy-addr/package.json',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'qs',
            'version': '2.4.2',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/express/node_modules/qs/package.json',
            'main': 'index.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'range-parser',
            'version': '1.0.2',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/express/node_modules/range-parser/package.json',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'send',
            'version': '0.12.3',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/express/node_modules/send/package.json',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'serve-static',
            'version': '1.9.3',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/express/node_modules/serve-static/package.json',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'type-is',
            'version': '1.6.2',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/express/node_modules/type-is/package.json',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'vary',
            'version': '1.0.0',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/express/node_modules/vary/package.json',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'utils-merge',
            'version': '1.0.0',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/express/node_modules/utils-merge/package.json',
            'main': './index',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'hooks',
            'version': '0.3.2',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/mongoose/node_modules/hooks/package.json',
            'main': './hooks.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'mongodb',
            'version': '1.4.12',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/mongoose/node_modules/mongodb/package.json',
            'main': './lib/mongodb/index',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'ms',
            'version': '0.1.0',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/mongoose/node_modules/ms/package.json',
            'main': './ms',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'sliced',
            'version': '0.0.5',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/mongoose/node_modules/sliced/package.json',
            'main': 'index.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'muri',
            'version': '0.3.1',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/mongoose/node_modules/muri/package.json',
            'main': 'index.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'mpromise',
            'version': '0.5.4',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/mongoose/node_modules/mpromise/package.json',
            'main': 'lib/promise.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'mpath',
            'version': '0.1.1',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/mongoose/node_modules/mpath/package.json',
            'main': 'index.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'kareem',
            'version': '0.0.4',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/mongoose/node_modules/kareem/package.json',
            'main': 'index.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'regexp-clone',
            'version': '0.0.1',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/mongoose/node_modules/regexp-clone/package.json',
            'main': 'index.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'mquery',
            'version': '1.0.0',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/mongoose/node_modules/mquery/package.json',
            'main': 'lib/mquery.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'async',
            'version': '0.9.0',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/mongoose/node_modules/async/package.json',
            'main': './lib/async',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'is',
            'version': '3.0.1',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/node.extend/node_modules/is/package.json',
            'main': 'index.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'commander',
            'version': '2.6.0',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/traceur/node_modules/commander/package.json',
            'main': 'index',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'glob',
            'version': '4.3.5',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/traceur/node_modules/glob/package.json',
            'main': 'glob.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'rsvp',
            'version': '3.0.18',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/traceur/node_modules/rsvp/package.json',
            'main': 'dist/rsvp.js',
            'globalBrowser': {},
            'browser': { 'vertx': '@empty' }
        },
        {
            'name': 'semver',
            'version': '2.3.2',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/traceur/node_modules/semver/package.json',
            'main': 'semver.js',
            'globalBrowser': {},
            'browser': 'semver.browser.js'
        },
        {
            'name': 'source-map-support',
            'version': '0.2.10',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/traceur/node_modules/source-map-support/package.json',
            'main': './source-map-support.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'babel-core',
            'version': '5.4.7',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/babelify/node_modules/babel-core/package.json',
            'main': 'lib/babel/api/node.js',
            'globalBrowser': {},
            'browser': { 'babel-core#lib/babel/api/register/node.js': 'babel-core#lib/babel/api/register/browser.js' }
        },
        {
            'name': 'object-assign',
            'version': '2.0.0',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/babelify/node_modules/object-assign/package.json',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'through2',
            'version': '0.6.5',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/babelify/node_modules/through2/package.json',
            'main': 'through2.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'JSONStream',
            'version': '1.0.4',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/browserify/node_modules/JSONStream/package.json',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'assert',
            'version': '1.3.0',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/browserify/node_modules/assert/package.json',
            'main': './assert.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'browser-pack',
            'version': '5.0.1',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/browserify/node_modules/browser-pack/package.json',
            'main': 'index.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'browser-resolve',
            'version': '1.9.0',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/browserify/node_modules/browser-resolve/package.json',
            'main': 'index.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'browserify-zlib',
            'version': '0.1.4',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/browserify/node_modules/browserify-zlib/package.json',
            'main': 'src/index.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'buffer',
            'version': '3.2.2',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/browserify/node_modules/buffer/package.json',
            'main': 'index.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'builtins',
            'version': '0.0.7',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/browserify/node_modules/builtins/package.json',
            'main': 'builtins.json',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'commondir',
            'version': '0.0.1',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/browserify/node_modules/commondir/package.json',
            'main': 'index.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'concat-stream',
            'version': '1.4.8',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/browserify/node_modules/concat-stream/package.json',
            'main': 'index.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'console-browserify',
            'version': '1.1.0',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/browserify/node_modules/console-browserify/package.json',
            'main': 'index',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'constants-browserify',
            'version': '0.0.1',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/browserify/node_modules/constants-browserify/package.json',
            'main': 'constants.json',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'crypto-browserify',
            'version': '3.9.14',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/browserify/node_modules/crypto-browserify/package.json',
            'globalBrowser': {},
            'browser': { 'crypto': '@empty' }
        },
        {
            'name': 'deep-equal',
            'version': '1.0.0',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/browserify/node_modules/deep-equal/package.json',
            'main': 'index.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'defined',
            'version': '1.0.0',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/browserify/node_modules/defined/package.json',
            'main': 'index.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'deps-sort',
            'version': '1.3.9',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/browserify/node_modules/deps-sort/package.json',
            'main': 'index.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'domain-browser',
            'version': '1.1.4',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/browserify/node_modules/domain-browser/package.json',
            'main': './index.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'duplexer2',
            'version': '0.0.2',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/browserify/node_modules/duplexer2/package.json',
            'main': 'index.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'events',
            'version': '1.0.2',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/browserify/node_modules/events/package.json',
            'main': './events.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'glob',
            'version': '4.5.3',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/browserify/node_modules/glob/package.json',
            'main': 'glob.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'has',
            'version': '1.0.0',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/browserify/node_modules/has/package.json',
            'main': './src/index',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'htmlescape',
            'version': '1.1.0',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/browserify/node_modules/htmlescape/package.json',
            'main': 'htmlescape.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'http-browserify',
            'version': '1.7.0',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/browserify/node_modules/http-browserify/package.json',
            'main': 'index.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'https-browserify',
            'version': '0.0.0',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/browserify/node_modules/https-browserify/package.json',
            'main': 'index.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'inherits',
            'version': '2.0.1',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/browserify/node_modules/inherits/package.json',
            'main': './inherits.js',
            'globalBrowser': {},
            'browser': './inherits_browser.js'
        },
        {
            'name': 'insert-module-globals',
            'version': '6.5.0',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/browserify/node_modules/insert-module-globals/package.json',
            'main': 'index.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'isarray',
            'version': '0.0.1',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/browserify/node_modules/isarray/package.json',
            'main': 'index.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'labeled-stream-splicer',
            'version': '1.0.2',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/browserify/node_modules/labeled-stream-splicer/package.json',
            'main': 'index.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'module-deps',
            'version': '3.8.0',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/browserify/node_modules/module-deps/package.json',
            'main': 'index.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'os-browserify',
            'version': '0.1.2',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/browserify/node_modules/os-browserify/package.json',
            'main': 'main.js',
            'globalBrowser': {},
            'browser': 'browser.js'
        },
        {
            'name': 'parents',
            'version': '1.0.1',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/browserify/node_modules/parents/package.json',
            'main': 'index.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'path-browserify',
            'version': '0.0.0',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/browserify/node_modules/path-browserify/package.json',
            'main': 'index.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'process',
            'version': '0.11.1',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/browserify/node_modules/process/package.json',
            'main': './index.js',
            'globalBrowser': {},
            'browser': './browser.js'
        },
        {
            'name': 'punycode',
            'version': '1.3.2',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/browserify/node_modules/punycode/package.json',
            'main': 'punycode.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'querystring-es3',
            'version': '0.2.1',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/browserify/node_modules/querystring-es3/package.json',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'read-only-stream',
            'version': '1.1.1',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/browserify/node_modules/read-only-stream/package.json',
            'main': 'index.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'readable-stream',
            'version': '1.1.13',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/browserify/node_modules/readable-stream/package.json',
            'main': 'readable.js',
            'globalBrowser': {},
            'browser': { 'util': '@empty' }
        },
        {
            'name': 'resolve',
            'version': '1.1.6',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/browserify/node_modules/resolve/package.json',
            'main': 'index.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'shasum',
            'version': '1.0.1',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/browserify/node_modules/shasum/package.json',
            'globalBrowser': {},
            'browser': { 'shasum#index.js': 'shasum#browser.js' }
        },
        {
            'name': 'shell-quote',
            'version': '0.0.1',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/browserify/node_modules/shell-quote/package.json',
            'main': 'index.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'stream-browserify',
            'version': '1.0.0',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/browserify/node_modules/stream-browserify/package.json',
            'main': 'index.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'string_decoder',
            'version': '0.10.31',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/browserify/node_modules/string_decoder/package.json',
            'main': 'index.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'subarg',
            'version': '1.0.0',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/browserify/node_modules/subarg/package.json',
            'main': 'index.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'syntax-error',
            'version': '1.1.4',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/browserify/node_modules/syntax-error/package.json',
            'main': 'index.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'through2',
            'version': '1.1.1',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/browserify/node_modules/through2/package.json',
            'main': 'through2.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'timers-browserify',
            'version': '1.4.1',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/browserify/node_modules/timers-browserify/package.json',
            'main': 'main.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'tty-browserify',
            'version': '0.0.0',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/browserify/node_modules/tty-browserify/package.json',
            'main': 'index.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'url',
            'version': '0.10.3',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/browserify/node_modules/url/package.json',
            'main': './url.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'util',
            'version': '0.10.3',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/browserify/node_modules/util/package.json',
            'main': './util.js',
            'globalBrowser': {},
            'browser': { 'util#support/isBuffer.js': 'util#support/isBufferBrowser.js' }
        },
        {
            'name': 'vm-browserify',
            'version': '0.0.4',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/browserify/node_modules/vm-browserify/package.json',
            'main': 'index.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'xtend',
            'version': '4.0.0',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/browserify/node_modules/xtend/package.json',
            'main': 'immutable',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'assertion-error',
            'version': '1.0.0',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/chai/node_modules/assertion-error/package.json',
            'main': './index',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'deep-eql',
            'version': '0.1.3',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/chai/node_modules/deep-eql/package.json',
            'main': './index',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'archy',
            'version': '1.0.0',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/gulp/node_modules/archy/package.json',
            'main': 'index.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'chalk',
            'version': '0.5.1',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/gulp/node_modules/chalk/package.json',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'deprecated',
            'version': '0.0.1',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/gulp/node_modules/deprecated/package.json',
            'main': './index.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'gulp-util',
            'version': '3.0.4',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/gulp/node_modules/gulp-util/package.json',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'interpret',
            'version': '0.3.10',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/gulp/node_modules/interpret/package.json',
            'main': 'index.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'liftoff',
            'version': '2.1.0',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/gulp/node_modules/liftoff/package.json',
            'main': 'index.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'minimist',
            'version': '1.1.1',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/gulp/node_modules/minimist/package.json',
            'main': 'index.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'orchestrator',
            'version': '0.3.7',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/gulp/node_modules/orchestrator/package.json',
            'main': './index.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'pretty-hrtime',
            'version': '0.2.2',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/gulp/node_modules/pretty-hrtime/package.json',
            'main': './index.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'semver',
            'version': '4.3.4',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/gulp/node_modules/semver/package.json',
            'main': 'semver.js',
            'globalBrowser': {},
            'browser': 'semver.browser.js'
        },
        {
            'name': 'tildify',
            'version': '1.0.0',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/gulp/node_modules/tildify/package.json',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'v8flags',
            'version': '2.0.5',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/gulp/node_modules/v8flags/package.json',
            'main': 'index.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'vinyl-fs',
            'version': '0.3.13',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/gulp/node_modules/vinyl-fs/package.json',
            'main': './index.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'replace-ext',
            'version': '0.0.1',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/gulp-babel/node_modules/replace-ext/package.json',
            'main': './index.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'vinyl-sourcemaps-apply',
            'version': '0.1.4',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/gulp-babel/node_modules/vinyl-sourcemaps-apply/package.json',
            'main': 'index.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'commander',
            'version': '2.3.0',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/mocha/node_modules/commander/package.json',
            'main': 'index',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'debug',
            'version': '2.0.0',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/mocha/node_modules/debug/package.json',
            'main': './node.js',
            'globalBrowser': {},
            'browser': './browser.js'
        },
        {
            'name': 'diff',
            'version': '1.4.0',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/mocha/node_modules/diff/package.json',
            'main': './diff',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'escape-string-regexp',
            'version': '1.0.2',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/mocha/node_modules/escape-string-regexp/package.json',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'glob',
            'version': '3.2.3',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/mocha/node_modules/glob/package.json',
            'main': 'glob.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'growl',
            'version': '1.8.1',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/mocha/node_modules/growl/package.json',
            'main': './lib/growl.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'jade',
            'version': '0.26.3',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/mocha/node_modules/jade/package.json',
            'main': './index.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'mkdirp',
            'version': '0.5.0',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/mocha/node_modules/mkdirp/package.json',
            'main': './index',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'supports-color',
            'version': '1.2.1',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/mocha/node_modules/supports-color/package.json',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'traceur-runner',
            'version': '1.0.2',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/mocha-traceur/node_modules/traceur-runner/package.json',
            'main': 'lib/traceur-runner.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'vinyl',
            'version': '0.4.6',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/vinyl-source-stream/node_modules/vinyl/package.json',
            'main': './index.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'mime-types',
            'version': '2.0.12',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/express/node_modules/accepts/node_modules/mime-types/package.json',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'negotiator',
            'version': '0.5.3',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/express/node_modules/accepts/node_modules/negotiator/package.json',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'ms',
            'version': '0.7.1',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/express/node_modules/debug/node_modules/ms/package.json',
            'main': './index',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'crc',
            'version': '3.2.1',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/express/node_modules/etag/node_modules/crc/package.json',
            'main': './lib/index.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'ee-first',
            'version': '1.1.0',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/express/node_modules/on-finished/node_modules/ee-first/package.json',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'forwarded',
            'version': '0.1.0',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/express/node_modules/proxy-addr/node_modules/forwarded/package.json',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'ipaddr.js',
            'version': '1.0.1',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/express/node_modules/proxy-addr/node_modules/ipaddr.js/package.json',
            'main': './lib/ipaddr',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'destroy',
            'version': '1.0.3',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/express/node_modules/send/node_modules/destroy/package.json',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'mime',
            'version': '1.3.4',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/express/node_modules/send/node_modules/mime/package.json',
            'main': 'mime.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'media-typer',
            'version': '0.3.0',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/express/node_modules/type-is/node_modules/media-typer/package.json',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'bson',
            'version': '0.2.21',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/mongoose/node_modules/mongodb/node_modules/bson/package.json',
            'main': './lib/bson/index',
            'globalBrowser': {},
            'browser': 'lib/bson/bson.js'
        },
        {
            'name': 'kerberos',
            'version': '0.0.4',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/mongoose/node_modules/mongodb/node_modules/kerberos/package.json',
            'main': 'index.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'readable-stream',
            'version': '1.0.33',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/mongoose/node_modules/mongodb/node_modules/readable-stream/package.json',
            'main': 'readable.js',
            'globalBrowser': {},
            'browser': { 'util': '@empty' }
        },
        {
            'name': 'debug',
            'version': '0.7.4',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/mongoose/node_modules/mquery/node_modules/debug/package.json',
            'main': 'lib/debug.js',
            'globalBrowser': {},
            'browser': './debug.js'
        },
        {
            'name': 'inflight',
            'version': '1.0.4',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/traceur/node_modules/glob/node_modules/inflight/package.json',
            'main': 'inflight.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'minimatch',
            'version': '2.0.8',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/traceur/node_modules/glob/node_modules/minimatch/package.json',
            'main': 'minimatch.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'once',
            'version': '1.3.2',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/traceur/node_modules/glob/node_modules/once/package.json',
            'main': 'once.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'source-map',
            'version': '0.1.32',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/traceur/node_modules/source-map-support/node_modules/source-map/package.json',
            'main': './lib/source-map.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'acorn-jsx',
            'version': '1.0.1',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/babelify/node_modules/babel-core/node_modules/acorn-jsx/package.json',
            'main': 'acorn.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'ast-types',
            'version': '0.7.6',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/babelify/node_modules/babel-core/node_modules/ast-types/package.json',
            'main': 'main.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'bluebird',
            'version': '2.9.26',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/babelify/node_modules/babel-core/node_modules/bluebird/package.json',
            'main': './js/main/bluebird.js',
            'globalBrowser': {},
            'browser': './js/browser/bluebird.js'
        },
        {
            'name': 'chalk',
            'version': '1.0.0',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/babelify/node_modules/babel-core/node_modules/chalk/package.json',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'convert-source-map',
            'version': '1.1.1',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/babelify/node_modules/babel-core/node_modules/convert-source-map/package.json',
            'main': 'index.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'core-js',
            'version': '0.9.13',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/babelify/node_modules/babel-core/node_modules/core-js/package.json',
            'main': 'index.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'detect-indent',
            'version': '3.0.1',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/babelify/node_modules/babel-core/node_modules/detect-indent/package.json',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'esquery',
            'version': '0.4.0',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/babelify/node_modules/babel-core/node_modules/esquery/package.json',
            'main': 'esquery.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'estraverse',
            'version': '4.1.0',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/babelify/node_modules/babel-core/node_modules/estraverse/package.json',
            'main': 'estraverse.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'esutils',
            'version': '2.0.2',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/babelify/node_modules/babel-core/node_modules/esutils/package.json',
            'main': 'lib/utils.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'fs-readdir-recursive',
            'version': '0.1.2',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/babelify/node_modules/babel-core/node_modules/fs-readdir-recursive/package.json',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'globals',
            'version': '6.4.1',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/babelify/node_modules/babel-core/node_modules/globals/package.json',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'home-or-tmp',
            'version': '1.0.0',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/babelify/node_modules/babel-core/node_modules/home-or-tmp/package.json',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'is-integer',
            'version': '1.0.4',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/babelify/node_modules/babel-core/node_modules/is-integer/package.json',
            'main': 'index.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'js-tokens',
            'version': '1.0.0',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/babelify/node_modules/babel-core/node_modules/js-tokens/package.json',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'leven',
            'version': '1.0.2',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/babelify/node_modules/babel-core/node_modules/leven/package.json',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'line-numbers',
            'version': '0.2.0',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/babelify/node_modules/babel-core/node_modules/line-numbers/package.json',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'lodash',
            'version': '3.9.2',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/babelify/node_modules/babel-core/node_modules/lodash/package.json',
            'main': 'index.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'output-file-sync',
            'version': '1.1.0',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/babelify/node_modules/babel-core/node_modules/output-file-sync/package.json',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'path-is-absolute',
            'version': '1.0.0',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/babelify/node_modules/babel-core/node_modules/path-is-absolute/package.json',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'private',
            'version': '0.1.6',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/babelify/node_modules/babel-core/node_modules/private/package.json',
            'main': 'private.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'regenerator',
            'version': '0.8.26',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/babelify/node_modules/babel-core/node_modules/regenerator/package.json',
            'main': 'main.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'regexpu',
            'version': '1.1.2',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/babelify/node_modules/babel-core/node_modules/regexpu/package.json',
            'main': 'regexpu.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'repeating',
            'version': '1.1.2',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/babelify/node_modules/babel-core/node_modules/repeating/package.json',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'shebang-regex',
            'version': '1.0.0',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/babelify/node_modules/babel-core/node_modules/shebang-regex/package.json',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'slash',
            'version': '1.0.0',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/babelify/node_modules/babel-core/node_modules/slash/package.json',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'source-map',
            'version': '0.4.2',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/babelify/node_modules/babel-core/node_modules/source-map/package.json',
            'main': './lib/source-map.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'strip-json-comments',
            'version': '1.0.2',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/babelify/node_modules/babel-core/node_modules/strip-json-comments/package.json',
            'main': 'strip-json-comments',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'to-fast-properties',
            'version': '1.0.1',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/babelify/node_modules/babel-core/node_modules/to-fast-properties/package.json',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'trim-right',
            'version': '1.0.0',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/babelify/node_modules/babel-core/node_modules/trim-right/package.json',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'jsonparse',
            'version': '1.0.0',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/browserify/node_modules/JSONStream/node_modules/jsonparse/package.json',
            'main': 'jsonparse.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'through',
            'version': '2.3.7',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/browserify/node_modules/JSONStream/node_modules/through/package.json',
            'main': 'index.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'combine-source-map',
            'version': '0.6.1',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/browserify/node_modules/browser-pack/node_modules/combine-source-map/package.json',
            'main': 'index.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'umd',
            'version': '3.0.1',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/browserify/node_modules/browser-pack/node_modules/umd/package.json',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'pako',
            'version': '0.2.6',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/browserify/node_modules/browserify-zlib/node_modules/pako/package.json',
            'main': './index.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'base64-js',
            'version': '0.0.8',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/browserify/node_modules/buffer/node_modules/base64-js/package.json',
            'main': 'lib/b64.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'ieee754',
            'version': '1.1.5',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/browserify/node_modules/buffer/node_modules/ieee754/package.json',
            'main': 'index.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'is-array',
            'version': '1.0.1',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/browserify/node_modules/buffer/node_modules/is-array/package.json',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'typedarray',
            'version': '0.0.6',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/browserify/node_modules/concat-stream/node_modules/typedarray/package.json',
            'main': 'index.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'date-now',
            'version': '0.1.4',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/browserify/node_modules/console-browserify/node_modules/date-now/package.json',
            'main': 'index',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'browserify-aes',
            'version': '1.0.1',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/browserify/node_modules/crypto-browserify/node_modules/browserify-aes/package.json',
            'main': 'index.js',
            'globalBrowser': {},
            'browser': 'browser.js'
        },
        {
            'name': 'browserify-sign',
            'version': '3.0.2',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/browserify/node_modules/crypto-browserify/node_modules/browserify-sign/package.json',
            'main': 'index.js',
            'globalBrowser': {},
            'browser': 'browser.js'
        },
        {
            'name': 'create-ecdh',
            'version': '2.0.1',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/browserify/node_modules/crypto-browserify/node_modules/create-ecdh/package.json',
            'main': 'index.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'create-hash',
            'version': '1.1.1',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/browserify/node_modules/crypto-browserify/node_modules/create-hash/package.json',
            'main': 'index.js',
            'globalBrowser': {},
            'browser': 'browser.js'
        },
        {
            'name': 'create-hmac',
            'version': '1.1.3',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/browserify/node_modules/crypto-browserify/node_modules/create-hmac/package.json',
            'main': 'index.js',
            'globalBrowser': {},
            'browser': './browser.js'
        },
        {
            'name': 'diffie-hellman',
            'version': '3.0.2',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/browserify/node_modules/crypto-browserify/node_modules/diffie-hellman/package.json',
            'main': 'index.js',
            'globalBrowser': {},
            'browser': 'browser.js'
        },
        {
            'name': 'pbkdf2',
            'version': '3.0.4',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/browserify/node_modules/crypto-browserify/node_modules/pbkdf2/package.json',
            'main': './index.js',
            'globalBrowser': {},
            'browser': './browser.js'
        },
        {
            'name': 'public-encrypt',
            'version': '2.0.1',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/browserify/node_modules/crypto-browserify/node_modules/public-encrypt/package.json',
            'main': 'index.js',
            'globalBrowser': {},
            'browser': 'browser.js'
        },
        {
            'name': 'randombytes',
            'version': '2.0.1',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/browserify/node_modules/crypto-browserify/node_modules/randombytes/package.json',
            'main': 'index.js',
            'globalBrowser': {},
            'browser': 'browser.js'
        },
        {
            'name': 'Base64',
            'version': '0.2.1',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/browserify/node_modules/http-browserify/node_modules/Base64/package.json',
            'main': './base64.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'combine-source-map',
            'version': '0.3.0',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/browserify/node_modules/insert-module-globals/node_modules/combine-source-map/package.json',
            'main': 'index.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'lexical-scope',
            'version': '1.1.1',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/browserify/node_modules/insert-module-globals/node_modules/lexical-scope/package.json',
            'main': 'index.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'stream-splicer',
            'version': '1.3.1',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/browserify/node_modules/labeled-stream-splicer/node_modules/stream-splicer/package.json',
            'main': 'index.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'detective',
            'version': '4.1.0',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/browserify/node_modules/module-deps/node_modules/detective/package.json',
            'main': 'index.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'stream-combiner2',
            'version': '1.0.2',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/browserify/node_modules/module-deps/node_modules/stream-combiner2/package.json',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'path-platform',
            'version': '0.11.15',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/browserify/node_modules/parents/node_modules/path-platform/package.json',
            'main': 'path.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'readable-wrap',
            'version': '1.0.0',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/browserify/node_modules/read-only-stream/node_modules/readable-wrap/package.json',
            'main': 'index.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'core-util-is',
            'version': '1.0.1',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/browserify/node_modules/readable-stream/node_modules/core-util-is/package.json',
            'main': 'lib/util.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'json-stable-stringify',
            'version': '0.0.1',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/browserify/node_modules/shasum/node_modules/json-stable-stringify/package.json',
            'main': 'index.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'sha.js',
            'version': '2.3.6',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/browserify/node_modules/shasum/node_modules/sha.js/package.json',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'acorn',
            'version': '1.2.1',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/browserify/node_modules/syntax-error/node_modules/acorn/package.json',
            'main': 'dist/acorn.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'querystring',
            'version': '0.2.0',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/browserify/node_modules/url/node_modules/querystring/package.json',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'indexof',
            'version': '0.0.1',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/browserify/node_modules/vm-browserify/node_modules/indexof/package.json',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'type-detect',
            'version': '0.1.1',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/chai/node_modules/deep-eql/node_modules/type-detect/package.json',
            'main': './index',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'ansi-styles',
            'version': '1.1.0',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/gulp/node_modules/chalk/node_modules/ansi-styles/package.json',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'escape-string-regexp',
            'version': '1.0.3',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/gulp/node_modules/chalk/node_modules/escape-string-regexp/package.json',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'has-ansi',
            'version': '0.1.0',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/gulp/node_modules/chalk/node_modules/has-ansi/package.json',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'strip-ansi',
            'version': '0.3.0',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/gulp/node_modules/chalk/node_modules/strip-ansi/package.json',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'supports-color',
            'version': '0.2.0',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/gulp/node_modules/chalk/node_modules/supports-color/package.json',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'array-differ',
            'version': '1.0.0',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/gulp/node_modules/gulp-util/node_modules/array-differ/package.json',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'array-uniq',
            'version': '1.0.2',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/gulp/node_modules/gulp-util/node_modules/array-uniq/package.json',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'beeper',
            'version': '1.0.0',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/gulp/node_modules/gulp-util/node_modules/beeper/package.json',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'dateformat',
            'version': '1.0.11',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/gulp/node_modules/gulp-util/node_modules/dateformat/package.json',
            'main': 'lib/dateformat',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'lodash._reescape',
            'version': '3.0.0',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/gulp/node_modules/gulp-util/node_modules/lodash._reescape/package.json',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'lodash._reevaluate',
            'version': '3.0.0',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/gulp/node_modules/gulp-util/node_modules/lodash._reevaluate/package.json',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'lodash._reinterpolate',
            'version': '3.0.0',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/gulp/node_modules/gulp-util/node_modules/lodash._reinterpolate/package.json',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'lodash.template',
            'version': '3.6.1',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/gulp/node_modules/gulp-util/node_modules/lodash.template/package.json',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'multipipe',
            'version': '0.1.2',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/gulp/node_modules/gulp-util/node_modules/multipipe/package.json',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'extend',
            'version': '2.0.1',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/gulp/node_modules/liftoff/node_modules/extend/package.json',
            'main': 'index',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'findup-sync',
            'version': '0.2.1',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/gulp/node_modules/liftoff/node_modules/findup-sync/package.json',
            'main': 'lib/findup-sync',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'flagged-respawn',
            'version': '0.3.1',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/gulp/node_modules/liftoff/node_modules/flagged-respawn/package.json',
            'main': 'index.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'rechoir',
            'version': '0.6.1',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/gulp/node_modules/liftoff/node_modules/rechoir/package.json',
            'main': 'index.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'end-of-stream',
            'version': '0.1.5',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/gulp/node_modules/orchestrator/node_modules/end-of-stream/package.json',
            'main': 'index.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'sequencify',
            'version': '0.0.7',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/gulp/node_modules/orchestrator/node_modules/sequencify/package.json',
            'main': './index.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'stream-consume',
            'version': '0.1.0',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/gulp/node_modules/orchestrator/node_modules/stream-consume/package.json',
            'main': 'index.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'user-home',
            'version': '1.1.1',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/gulp/node_modules/tildify/node_modules/user-home/package.json',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'defaults',
            'version': '1.0.2',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/gulp/node_modules/vinyl-fs/node_modules/defaults/package.json',
            'main': 'index.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'glob-stream',
            'version': '3.1.18',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/gulp/node_modules/vinyl-fs/node_modules/glob-stream/package.json',
            'main': './index.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'glob-watcher',
            'version': '0.0.6',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/gulp/node_modules/vinyl-fs/node_modules/glob-watcher/package.json',
            'main': './index.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'graceful-fs',
            'version': '3.0.7',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/gulp/node_modules/vinyl-fs/node_modules/graceful-fs/package.json',
            'main': 'graceful-fs.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'mkdirp',
            'version': '0.5.1',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/gulp/node_modules/vinyl-fs/node_modules/mkdirp/package.json',
            'main': 'index.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'strip-bom',
            'version': '1.0.0',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/gulp/node_modules/vinyl-fs/node_modules/strip-bom/package.json',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'source-map',
            'version': '0.1.43',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/gulp-babel/node_modules/vinyl-sourcemaps-apply/node_modules/source-map/package.json',
            'main': './lib/source-map.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'ms',
            'version': '0.6.2',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/mocha/node_modules/debug/node_modules/ms/package.json',
            'main': './index',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'minimatch',
            'version': '0.2.14',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/mocha/node_modules/glob/node_modules/minimatch/package.json',
            'main': 'minimatch.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'graceful-fs',
            'version': '2.0.3',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/mocha/node_modules/glob/node_modules/graceful-fs/package.json',
            'main': 'graceful-fs.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'commander',
            'version': '0.6.1',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/mocha/node_modules/jade/node_modules/commander/package.json',
            'main': 'index',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'mkdirp',
            'version': '0.3.0',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/mocha/node_modules/jade/node_modules/mkdirp/package.json',
            'main': './index',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'minimist',
            'version': '0.0.8',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/mocha/node_modules/mkdirp/node_modules/minimist/package.json',
            'main': 'index.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'traceur-source-maps',
            'version': '1.0.6',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/mocha-traceur/node_modules/traceur-runner/node_modules/traceur-source-maps/package.json',
            'main': 'lib/traceur-source-maps.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'clone',
            'version': '0.2.0',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/vinyl-source-stream/node_modules/vinyl/node_modules/clone/package.json',
            'main': 'clone.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'clone-stats',
            'version': '0.0.1',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/vinyl-source-stream/node_modules/vinyl/node_modules/clone-stats/package.json',
            'main': 'index.js',
            'globalBrowser': {},
            'browser': 'index.js'
        },
        {
            'name': 'mime-db',
            'version': '1.10.0',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/express/node_modules/accepts/node_modules/mime-types/node_modules/mime-db/package.json',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'nan',
            'version': '1.7.0',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/mongoose/node_modules/mongodb/node_modules/bson/node_modules/nan/package.json',
            'main': 'include_dirs.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'wrappy',
            'version': '1.0.1',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/traceur/node_modules/glob/node_modules/inflight/node_modules/wrappy/package.json',
            'main': 'wrappy.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'brace-expansion',
            'version': '1.1.0',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/traceur/node_modules/glob/node_modules/minimatch/node_modules/brace-expansion/package.json',
            'main': 'index.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'amdefine',
            'version': '0.1.0',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/traceur/node_modules/source-map-support/node_modules/source-map/node_modules/amdefine/package.json',
            'main': './amdefine.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'ansi-styles',
            'version': '2.0.1',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/babelify/node_modules/babel-core/node_modules/chalk/node_modules/ansi-styles/package.json',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'has-ansi',
            'version': '1.0.3',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/babelify/node_modules/babel-core/node_modules/chalk/node_modules/has-ansi/package.json',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'strip-ansi',
            'version': '2.0.1',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/babelify/node_modules/babel-core/node_modules/chalk/node_modules/strip-ansi/package.json',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'supports-color',
            'version': '1.3.1',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/babelify/node_modules/babel-core/node_modules/chalk/node_modules/supports-color/package.json',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'get-stdin',
            'version': '4.0.1',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/babelify/node_modules/babel-core/node_modules/detect-indent/node_modules/get-stdin/package.json',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'os-tmpdir',
            'version': '1.0.1',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/babelify/node_modules/babel-core/node_modules/home-or-tmp/node_modules/os-tmpdir/package.json',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'is-finite',
            'version': '1.0.1',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/babelify/node_modules/babel-core/node_modules/is-integer/node_modules/is-finite/package.json',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'is-nan',
            'version': '1.0.1',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/babelify/node_modules/babel-core/node_modules/is-integer/node_modules/is-nan/package.json',
            'main': 'index.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'left-pad',
            'version': '0.0.3',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/babelify/node_modules/babel-core/node_modules/line-numbers/node_modules/left-pad/package.json',
            'main': 'index.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'commoner',
            'version': '0.10.1',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/babelify/node_modules/babel-core/node_modules/regenerator/node_modules/commoner/package.json',
            'main': 'main.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'esprima-fb',
            'version': '13001.1.0-dev-harmony-fb',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/babelify/node_modules/babel-core/node_modules/regenerator/node_modules/esprima-fb/package.json',
            'main': 'esprima.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'recast',
            'version': '0.10.12',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/babelify/node_modules/babel-core/node_modules/regenerator/node_modules/recast/package.json',
            'main': 'main.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'defs',
            'version': '1.1.0',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/babelify/node_modules/babel-core/node_modules/regenerator/node_modules/defs/package.json',
            'main': 'build/es5/defs-main.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'regenerate',
            'version': '1.2.1',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/babelify/node_modules/babel-core/node_modules/regexpu/node_modules/regenerate/package.json',
            'main': 'regenerate.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'regjsgen',
            'version': '0.2.0',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/babelify/node_modules/babel-core/node_modules/regexpu/node_modules/regjsgen/package.json',
            'main': 'regjsgen.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'regjsparser',
            'version': '0.1.4',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/babelify/node_modules/babel-core/node_modules/regexpu/node_modules/regjsparser/package.json',
            'main': './parser',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'meow',
            'version': '3.1.0',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/babelify/node_modules/babel-core/node_modules/repeating/node_modules/meow/package.json',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'inline-source-map',
            'version': '0.5.0',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/browserify/node_modules/browser-pack/node_modules/combine-source-map/node_modules/inline-source-map/package.json',
            'main': 'index.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'lodash.memoize',
            'version': '3.0.4',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/browserify/node_modules/browser-pack/node_modules/combine-source-map/node_modules/lodash.memoize/package.json',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'bn.js',
            'version': '2.0.5',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/browserify/node_modules/crypto-browserify/node_modules/browserify-sign/node_modules/bn.js/package.json',
            'main': 'lib/bn.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'browserify-rsa',
            'version': '2.0.1',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/browserify/node_modules/crypto-browserify/node_modules/browserify-sign/node_modules/browserify-rsa/package.json',
            'main': 'index.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'elliptic',
            'version': '3.0.3',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/browserify/node_modules/crypto-browserify/node_modules/browserify-sign/node_modules/elliptic/package.json',
            'main': 'lib/elliptic.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'parse-asn1',
            'version': '3.0.1',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/browserify/node_modules/crypto-browserify/node_modules/browserify-sign/node_modules/parse-asn1/package.json',
            'main': 'index.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'ripemd160',
            'version': '1.0.1',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/browserify/node_modules/crypto-browserify/node_modules/create-hash/node_modules/ripemd160/package.json',
            'main': './lib/ripemd160.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'sha.js',
            'version': '2.4.1',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/browserify/node_modules/crypto-browserify/node_modules/create-hash/node_modules/sha.js/package.json',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'miller-rabin',
            'version': '2.0.1',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/browserify/node_modules/crypto-browserify/node_modules/diffie-hellman/node_modules/miller-rabin/package.json',
            'main': 'lib/mr.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'inline-source-map',
            'version': '0.3.1',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/browserify/node_modules/insert-module-globals/node_modules/combine-source-map/node_modules/inline-source-map/package.json',
            'main': 'index.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'convert-source-map',
            'version': '0.3.5',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/browserify/node_modules/insert-module-globals/node_modules/combine-source-map/node_modules/convert-source-map/package.json',
            'main': 'index.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'astw',
            'version': '2.0.0',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/browserify/node_modules/insert-module-globals/node_modules/lexical-scope/node_modules/astw/package.json',
            'main': 'index.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'escodegen',
            'version': '1.6.1',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/browserify/node_modules/module-deps/node_modules/detective/node_modules/escodegen/package.json',
            'main': 'escodegen.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'through2',
            'version': '0.5.1',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/browserify/node_modules/module-deps/node_modules/stream-combiner2/node_modules/through2/package.json',
            'main': 'through2.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'jsonify',
            'version': '0.0.0',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/browserify/node_modules/shasum/node_modules/json-stable-stringify/node_modules/jsonify/package.json',
            'main': 'index.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'ansi-regex',
            'version': '0.2.1',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/gulp/node_modules/chalk/node_modules/has-ansi/node_modules/ansi-regex/package.json',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'lodash._basecopy',
            'version': '3.0.1',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/gulp/node_modules/gulp-util/node_modules/lodash.template/node_modules/lodash._basecopy/package.json',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'lodash._basetostring',
            'version': '3.0.0',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/gulp/node_modules/gulp-util/node_modules/lodash.template/node_modules/lodash._basetostring/package.json',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'lodash._basevalues',
            'version': '3.0.0',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/gulp/node_modules/gulp-util/node_modules/lodash.template/node_modules/lodash._basevalues/package.json',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'lodash._isiterateecall',
            'version': '3.0.8',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/gulp/node_modules/gulp-util/node_modules/lodash.template/node_modules/lodash._isiterateecall/package.json',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'lodash.escape',
            'version': '3.0.0',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/gulp/node_modules/gulp-util/node_modules/lodash.template/node_modules/lodash.escape/package.json',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'lodash.keys',
            'version': '3.1.0',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/gulp/node_modules/gulp-util/node_modules/lodash.template/node_modules/lodash.keys/package.json',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'lodash.restparam',
            'version': '3.6.1',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/gulp/node_modules/gulp-util/node_modules/lodash.template/node_modules/lodash.restparam/package.json',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'lodash.templatesettings',
            'version': '3.1.0',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/gulp/node_modules/gulp-util/node_modules/lodash.template/node_modules/lodash.templatesettings/package.json',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'clone',
            'version': '0.1.19',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/gulp/node_modules/vinyl-fs/node_modules/defaults/node_modules/clone/package.json',
            'main': 'clone.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'ordered-read-streams',
            'version': '0.1.0',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/gulp/node_modules/vinyl-fs/node_modules/glob-stream/node_modules/ordered-read-streams/package.json',
            'main': 'index.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'glob2base',
            'version': '0.0.12',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/gulp/node_modules/vinyl-fs/node_modules/glob-stream/node_modules/glob2base/package.json',
            'main': './index.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'unique-stream',
            'version': '1.0.0',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/gulp/node_modules/vinyl-fs/node_modules/glob-stream/node_modules/unique-stream/package.json',
            'main': 'index.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'gaze',
            'version': '0.5.1',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/gulp/node_modules/vinyl-fs/node_modules/glob-watcher/node_modules/gaze/package.json',
            'main': 'lib/gaze',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'first-chunk-stream',
            'version': '1.0.0',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/gulp/node_modules/vinyl-fs/node_modules/strip-bom/node_modules/first-chunk-stream/package.json',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'is-utf8',
            'version': '0.2.0',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/gulp/node_modules/vinyl-fs/node_modules/strip-bom/node_modules/is-utf8/package.json',
            'main': 'is-utf8.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'lru-cache',
            'version': '2.6.4',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/mocha/node_modules/glob/node_modules/minimatch/node_modules/lru-cache/package.json',
            'main': 'lib/lru-cache.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'sigmund',
            'version': '1.0.1',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/mocha/node_modules/glob/node_modules/minimatch/node_modules/sigmund/package.json',
            'main': 'sigmund.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'parent-require',
            'version': '1.0.0',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/mocha-traceur/node_modules/traceur-runner/node_modules/traceur-source-maps/node_modules/parent-require/package.json',
            'main': './index',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'balanced-match',
            'version': '0.2.0',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/traceur/node_modules/glob/node_modules/minimatch/node_modules/brace-expansion/node_modules/balanced-match/package.json',
            'main': 'index.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'concat-map',
            'version': '0.0.1',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/traceur/node_modules/glob/node_modules/minimatch/node_modules/brace-expansion/node_modules/concat-map/package.json',
            'main': 'index.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'ansi-regex',
            'version': '1.1.1',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/babelify/node_modules/babel-core/node_modules/chalk/node_modules/has-ansi/node_modules/ansi-regex/package.json',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'number-is-nan',
            'version': '1.0.0',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/babelify/node_modules/babel-core/node_modules/is-integer/node_modules/is-finite/node_modules/number-is-nan/package.json',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'q',
            'version': '1.1.2',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/babelify/node_modules/babel-core/node_modules/regenerator/node_modules/commoner/node_modules/q/package.json',
            'main': 'q.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'recast',
            'version': '0.9.18',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/babelify/node_modules/babel-core/node_modules/regenerator/node_modules/commoner/node_modules/recast/package.json',
            'main': 'main.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'commander',
            'version': '2.5.1',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/babelify/node_modules/babel-core/node_modules/regenerator/node_modules/commoner/node_modules/commander/package.json',
            'main': 'index',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'glob',
            'version': '4.2.2',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/babelify/node_modules/babel-core/node_modules/regenerator/node_modules/commoner/node_modules/glob/package.json',
            'main': 'glob.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'install',
            'version': '0.1.8',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/babelify/node_modules/babel-core/node_modules/regenerator/node_modules/commoner/node_modules/install/package.json',
            'main': 'main.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'iconv-lite',
            'version': '0.4.9',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/babelify/node_modules/babel-core/node_modules/regenerator/node_modules/commoner/node_modules/iconv-lite/package.json',
            'main': './lib/index.js',
            'globalBrowser': {},
            'browser': {
                'iconv-lite#extend-node': '@empty',
                'iconv-lite#streams': '@empty'
            }
        },
        {
            'name': 'esprima-fb',
            'version': '14001.1.0-dev-harmony-fb',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/babelify/node_modules/babel-core/node_modules/regenerator/node_modules/recast/node_modules/esprima-fb/package.json',
            'main': 'esprima.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'alter',
            'version': '0.2.0',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/babelify/node_modules/babel-core/node_modules/regenerator/node_modules/defs/node_modules/alter/package.json',
            'main': 'alter.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'ast-traverse',
            'version': '0.1.1',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/babelify/node_modules/babel-core/node_modules/regenerator/node_modules/defs/node_modules/ast-traverse/package.json',
            'main': 'ast-traverse.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'breakable',
            'version': '1.0.0',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/babelify/node_modules/babel-core/node_modules/regenerator/node_modules/defs/node_modules/breakable/package.json',
            'main': 'breakable.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'esprima-fb',
            'version': '8001.1001.0-dev-harmony-fb',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/babelify/node_modules/babel-core/node_modules/regenerator/node_modules/defs/node_modules/esprima-fb/package.json',
            'main': 'esprima.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'simple-fmt',
            'version': '0.1.0',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/babelify/node_modules/babel-core/node_modules/regenerator/node_modules/defs/node_modules/simple-fmt/package.json',
            'main': 'simple-fmt.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'simple-is',
            'version': '0.2.0',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/babelify/node_modules/babel-core/node_modules/regenerator/node_modules/defs/node_modules/simple-is/package.json',
            'main': 'simple-is.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'stringmap',
            'version': '0.2.2',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/babelify/node_modules/babel-core/node_modules/regenerator/node_modules/defs/node_modules/stringmap/package.json',
            'main': 'stringmap.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'stringset',
            'version': '0.2.1',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/babelify/node_modules/babel-core/node_modules/regenerator/node_modules/defs/node_modules/stringset/package.json',
            'main': 'stringset.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'tryor',
            'version': '0.1.2',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/babelify/node_modules/babel-core/node_modules/regenerator/node_modules/defs/node_modules/tryor/package.json',
            'main': 'tryor.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'yargs',
            'version': '1.3.3',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/babelify/node_modules/babel-core/node_modules/regenerator/node_modules/defs/node_modules/yargs/package.json',
            'main': './index.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'jsesc',
            'version': '0.5.0',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/babelify/node_modules/babel-core/node_modules/regexpu/node_modules/regjsparser/node_modules/jsesc/package.json',
            'main': 'jsesc.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'camelcase-keys',
            'version': '1.0.0',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/babelify/node_modules/babel-core/node_modules/repeating/node_modules/meow/node_modules/camelcase-keys/package.json',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'indent-string',
            'version': '1.2.1',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/babelify/node_modules/babel-core/node_modules/repeating/node_modules/meow/node_modules/indent-string/package.json',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'brorand',
            'version': '1.0.5',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/browserify/node_modules/crypto-browserify/node_modules/browserify-sign/node_modules/elliptic/node_modules/brorand/package.json',
            'main': 'index.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'hash.js',
            'version': '1.0.3',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/browserify/node_modules/crypto-browserify/node_modules/browserify-sign/node_modules/elliptic/node_modules/hash.js/package.json',
            'main': 'lib/hash.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'asn1.js',
            'version': '2.0.3',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/browserify/node_modules/crypto-browserify/node_modules/browserify-sign/node_modules/parse-asn1/node_modules/asn1.js/package.json',
            'main': 'lib/asn1.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'source-map',
            'version': '0.3.0',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/browserify/node_modules/insert-module-globals/node_modules/combine-source-map/node_modules/inline-source-map/node_modules/source-map/package.json',
            'main': './lib/source-map.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'estraverse',
            'version': '1.9.3',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/browserify/node_modules/module-deps/node_modules/detective/node_modules/escodegen/node_modules/estraverse/package.json',
            'main': 'estraverse.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'esutils',
            'version': '1.1.6',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/browserify/node_modules/module-deps/node_modules/detective/node_modules/escodegen/node_modules/esutils/package.json',
            'main': 'lib/utils.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'esprima',
            'version': '1.2.5',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/browserify/node_modules/module-deps/node_modules/detective/node_modules/escodegen/node_modules/esprima/package.json',
            'main': 'esprima.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'optionator',
            'version': '0.5.0',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/browserify/node_modules/module-deps/node_modules/detective/node_modules/escodegen/node_modules/optionator/package.json',
            'main': './lib/',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'xtend',
            'version': '3.0.0',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/browserify/node_modules/module-deps/node_modules/stream-combiner2/node_modules/through2/node_modules/xtend/package.json',
            'main': 'index',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'lodash._getnative',
            'version': '3.9.0',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/gulp/node_modules/gulp-util/node_modules/lodash.template/node_modules/lodash.keys/node_modules/lodash._getnative/package.json',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'lodash.isarguments',
            'version': '3.0.3',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/gulp/node_modules/gulp-util/node_modules/lodash.template/node_modules/lodash.keys/node_modules/lodash.isarguments/package.json',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'lodash.isarray',
            'version': '3.0.3',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/gulp/node_modules/gulp-util/node_modules/lodash.template/node_modules/lodash.keys/node_modules/lodash.isarray/package.json',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'find-index',
            'version': '0.1.1',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/gulp/node_modules/vinyl-fs/node_modules/glob-stream/node_modules/glob2base/node_modules/find-index/package.json',
            'main': 'index.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'globule',
            'version': '0.1.0',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/gulp/node_modules/vinyl-fs/node_modules/glob-watcher/node_modules/gaze/node_modules/globule/package.json',
            'main': 'lib/globule',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'esprima-fb',
            'version': '10001.1.0-dev-harmony-fb',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/babelify/node_modules/babel-core/node_modules/regenerator/node_modules/commoner/node_modules/recast/node_modules/esprima-fb/package.json',
            'main': 'esprima.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'ast-types',
            'version': '0.6.16',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/babelify/node_modules/babel-core/node_modules/regenerator/node_modules/commoner/node_modules/recast/node_modules/ast-types/package.json',
            'main': 'main.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'minimatch',
            'version': '1.0.0',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/babelify/node_modules/babel-core/node_modules/regenerator/node_modules/commoner/node_modules/glob/node_modules/minimatch/package.json',
            'main': 'minimatch.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'stable',
            'version': '0.1.5',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/babelify/node_modules/babel-core/node_modules/regenerator/node_modules/defs/node_modules/alter/node_modules/stable/package.json',
            'main': './stable.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'camelcase',
            'version': '1.1.0',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/babelify/node_modules/babel-core/node_modules/repeating/node_modules/meow/node_modules/camelcase-keys/node_modules/camelcase/package.json',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'map-obj',
            'version': '1.0.1',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/babelify/node_modules/babel-core/node_modules/repeating/node_modules/meow/node_modules/camelcase-keys/node_modules/map-obj/package.json',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'minimalistic-assert',
            'version': '1.0.0',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/browserify/node_modules/crypto-browserify/node_modules/browserify-sign/node_modules/parse-asn1/node_modules/asn1.js/node_modules/minimalistic-assert/package.json',
            'main': 'index.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'prelude-ls',
            'version': '1.1.2',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/browserify/node_modules/module-deps/node_modules/detective/node_modules/escodegen/node_modules/optionator/node_modules/prelude-ls/package.json',
            'main': 'lib/',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'deep-is',
            'version': '0.1.3',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/browserify/node_modules/module-deps/node_modules/detective/node_modules/escodegen/node_modules/optionator/node_modules/deep-is/package.json',
            'main': 'index.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'wordwrap',
            'version': '0.0.3',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/browserify/node_modules/module-deps/node_modules/detective/node_modules/escodegen/node_modules/optionator/node_modules/wordwrap/package.json',
            'main': './index.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'type-check',
            'version': '0.3.1',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/browserify/node_modules/module-deps/node_modules/detective/node_modules/escodegen/node_modules/optionator/node_modules/type-check/package.json',
            'main': './lib/',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'levn',
            'version': '0.2.5',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/browserify/node_modules/module-deps/node_modules/detective/node_modules/escodegen/node_modules/optionator/node_modules/levn/package.json',
            'main': './lib/',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'fast-levenshtein',
            'version': '1.0.6',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/browserify/node_modules/module-deps/node_modules/detective/node_modules/escodegen/node_modules/optionator/node_modules/fast-levenshtein/package.json',
            'main': 'levenshtein.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'lodash',
            'version': '1.0.2',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/gulp/node_modules/vinyl-fs/node_modules/glob-watcher/node_modules/gaze/node_modules/globule/node_modules/lodash/package.json',
            'main': './dist/lodash.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'glob',
            'version': '3.1.21',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/gulp/node_modules/vinyl-fs/node_modules/glob-watcher/node_modules/gaze/node_modules/globule/node_modules/glob/package.json',
            'main': 'glob.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'graceful-fs',
            'version': '1.2.3',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/gulp/node_modules/vinyl-fs/node_modules/glob-watcher/node_modules/gaze/node_modules/globule/node_modules/glob/node_modules/graceful-fs/package.json',
            'main': 'graceful-fs.js',
            'globalBrowser': {},
            'browser': {}
        },
        {
            'name': 'inherits',
            'version': '1.0.0',
            'fileUrl': 'file:/var/www/warMapEngine/node_modules/gulp/node_modules/vinyl-fs/node_modules/glob-watcher/node_modules/gaze/node_modules/globule/node_modules/glob/node_modules/inherits/package.json',
            'main': './inherits.js',
            'globalBrowser': {},
            'browser': {}
        }
    ]));
});
/*public/components/map/core/map_validators*/
define('public/components/map/core/map_validators', [], function () {
    'use strict';
    'use strict';
    var privateFunctions = { _isInt: _isInt };
    var validatorMod = function validatorMod() {
            return {
                isIndex: function (int) {
                    return privateFunctions.isInt(int);
                },
                isBoolean: function (bool) {
                    return bool === Boolean(bool);
                },
                isCoordinates: function (x, y) {
                    if (privateFunctions.isInt(x) && privateFunctions.isInt(y)) {
                        return true;
                    }
                    return false;
                },
                isSubContainerAmount: function () {
                },
                isUseOfSubLayers: function () {
                },
                isUseOfSubContainers: function () {
                }
            };
        }();
    function _isInt(wannabeInt) {
        if (Number.isInteger) {
            return Number.isInteger(wannabeInt);
        }
        return typeof wannabeInt === 'number' && wannabeInt % 1 === 0;
    }
    return {
        get validatorMod() {
            return validatorMod;
        },
        __esModule: true
    };
});
/*public/components/map/core/Map*/
define('public/components/map/core/Map', ['./map_validators'], function ($__0) {
    'use strict';
    if (!$__0 || !$__0.__esModule)
        $__0 = { default: $__0 };
    var validatorMod = $__0.validatorMod;
    'use strict';
    var privateFunctions = { _getStageIndex: _getStageIndex };
    var validators = {
            _is_index: validatorMod.isIndex,
            _is_coordinates: validatorMod.isCoordinates,
            _is_SubContainerAmount: validatorMod.isSubContainerAmount,
            _is_UseOfSubLayers: validatorMod.isUseOfSubLayers,
            _is_UseOfSubContainers: validatorMod.isUseOfSubContainers,
            _is_canvas: validatorMod.isCanvas
        };
    var Map = function Map(options) {
        this.stages = [];
        this.plugins = [];
        this.mapSize = options && options.mapSize || {
            x: 0,
            y: 0
        };
        this.activeTickCB = false;
    };
    $traceurRuntime.createClass(Map, {
        init: function (tickCB, plugins) {
            if (plugins) {
                this.activatePlugins(plugins);
            }
            this.drawMap();
            this.tickOn(tickCB);
            return this;
        },
        drawMap: function () {
            this.stages.forEach(function (stage) {
                if (stage.drawThisChild) {
                    stage.update();
                    stage.drawThisChild = false;
                }
            });
            return this;
        },
        getSize: function () {
            return this.mapSize;
        },
        setSize: function (x1, y1) {
            this.mapSize = {
                x: x1,
                y: y1
            };
            return this.mapSize;
        },
        getChildNamed: function (name) {
            var $__7 = true;
            var $__8 = false;
            var $__9 = undefined;
            try {
                for (var $__5 = void 0, $__4 = this.stages[$traceurRuntime.toProperty(Symbol.iterator)](); !($__7 = ($__5 = $__4.next()).done); $__7 = true) {
                    var stage = $__5.value;
                    {
                        var child = void 0;
                        if (stage.name.toLowerCase() === name.toLowerCase()) {
                            return stage;
                        }
                        if (child = stage.getChildNamed(name)) {
                            return child;
                        }
                    }
                }
            } catch ($__10) {
                $__8 = true;
                $__9 = $__10;
            } finally {
                try {
                    if (!$__7 && $__4.return != null) {
                        $__4.return();
                    }
                } finally {
                    if ($__8) {
                        throw $__9;
                    }
                }
            }
            return false;
        },
        addStage: function (stage) {
            var $__11;
            var stages = [];
            if (!(stage instanceof Array)) {
                stages.push(stage);
            }
            ($__11 = this.stages).push.apply($__11, $traceurRuntime.spread(stages));
            return this;
        },
        replaceStage: function (newCanvas, oldCanvas) {
            var oldIndex = privateFunctions._getStageIndex(this.stages, oldCanvas);
            this.stages[oldIndex] = newCanvas;
            return this;
        },
        addLayer: function (layer, stage) {
            return this;
        },
        removeLayer: function (layer) {
            return this;
        },
        replaceLayer: function (newLayer, oldLayer) {
            return this;
        },
        toggleLayer: function (layer) {
            return this;
        },
        getLayerNamed: function (name) {
            var theLayer;
            var $__7 = true;
            var $__8 = false;
            var $__9 = undefined;
            try {
                for (var $__5 = void 0, $__4 = this.stages[$traceurRuntime.toProperty(Symbol.iterator)](); !($__7 = ($__5 = $__4.next()).done); $__7 = true) {
                    var stage = $__5.value;
                    {
                        if (theLayer = stage.getChildNamed(name)) {
                            return theLayer;
                        }
                    }
                }
            } catch ($__10) {
                $__8 = true;
                $__9 = $__10;
            } finally {
                try {
                    if (!$__7 && $__4.return != null) {
                        $__4.return();
                    }
                } finally {
                    if ($__8) {
                        throw $__9;
                    }
                }
            }
            return false;
        },
        cacheMap: function () {
            this.stages.forEach(function (stage) {
                if (stage.cacheEnabled) {
                    this.cache(0, 0, this.mapSize.x, this.mapSize.y);
                }
            });
            return this;
        },
        cacheLayers: function () {
            return this;
        },
        getObjectsUnderMapPoint: function () {
            var objects = [];
            this.stages.forEach(function (value, index) {
                objects[index] = value;
            });
            return objects;
        },
        activateFullSize: function () {
            window.addEventListener('resize', _setStagesToFullSize.bind(this));
        },
        deactivateFullSize: function () {
            window.removeEventListener('resize', this._setStagesToFullSize.bind(this));
        },
        activatePlugins: function (pluginsArray) {
            var $__2 = this;
            pluginsArray.forEach(function (pluginToUse) {
                $__2.plugins[pluginToUse.pluginName] = pluginToUse;
                $__2.plugins[pluginToUse.pluginName].init($__2);
            });
        },
        tickOn: function (tickCB) {
            if (this.activeTickCB) {
                throw new Error('there already exists one tick callback. Need to remove it first, before setting up a new one');
            }
            this.activeTickCB = tickCB || _handleTick.bind(this);
            createjs.Ticker.addEventListener('tick', this.activeTickCB);
            return this;
        },
        tickOff: function () {
            createjs.Ticker.removeEventListener('tick', this.activeTickCB);
            this.activeTickCB = undefined;
            return this;
        }
    }, {});
    function _getStageIndex(stages, stageToFind) {
        var foundIndex = stages.indexOf(stageToFind);
        return foundIndex === -1 ? false : foundIndex;
    }
    function _handleTick() {
        this.stages.forEach(function (stage) {
            if (stage.updateStage === true) {
                stage.update();
            }
        });
    }
    function _setStagesToFullSize() {
        var $__7 = true;
        var $__8 = false;
        var $__9 = undefined;
        try {
            for (var $__5 = void 0, $__4 = this.stages[$traceurRuntime.toProperty(Symbol.iterator)](); !($__7 = ($__5 = $__4.next()).done); $__7 = true) {
                var canvas = $__5.value;
                {
                    var ctx = canvas.getContext('2d');
                    ctx.canvas.width = window.innerWidth;
                    ctx.canvas.height = window.innerHeight;
                }
            }
        } catch ($__10) {
            $__8 = true;
            $__9 = $__10;
        } finally {
            try {
                if (!$__7 && $__4.return != null) {
                    $__4.return();
                }
            } finally {
                if ($__8) {
                    throw $__9;
                }
            }
        }
    }
    return {
        get Map() {
            return Map;
        },
        __esModule: true
    };
});
/*public/components/map/core/mapFunctions*/
define('public/components/map/core/mapFunctions', [], function () {
    'use strict';
    function addPrototype(name, functionToAdd) {
        this.superPrototype[name] = functionToAdd;
    }
    return {
        get addPrototype() {
            return addPrototype;
        },
        __esModule: true
    };
});
/*public/components/map/core/Map_stage*/
define('public/components/map/core/Map_stage', [
    './map_validators',
    './mapFunctions'
], function ($__0, $__2) {
    'use strict';
    if (!$__0 || !$__0.__esModule)
        $__0 = { default: $__0 };
    if (!$__2 || !$__2.__esModule)
        $__2 = { default: $__2 };
    'use strict';
    var validatorMod = $__0.validatorMod;
    var mapFunc_addPrototype = $__2.addPrototype;
    var privateFunctions = {};
    var validators = {
            _is_index: validatorMod.isIndex,
            _is_boolean: validatorMod.isBoolean,
            _is_coordinates: validatorMod.isCoordinates,
            _is_SubContainerAmount: validatorMod.isSubContainerAmount,
            _is_UseOfSubLayers: validatorMod.isUseOfSubLayers,
            _is_UseOfSubContainers: validatorMod.isUseOfSubContainers
        };
    var Map_stage = function Map_stage(name) {
        var $__13;
        for (var args = [], $__12 = 1; $__12 < arguments.length; $__12++)
            args[$__12 - 1] = arguments[$__12];
        ($__13 = $traceurRuntime.superConstructor($Map_stage)).call.apply($__13, $traceurRuntime.spread([this], args));
        this.superPrototype = this.constructor.prototype;
        this._cacheEnabled = true;
        this.name = '' + name;
        this.drawThisChild = true;
        this.tickEnabled = false;
        this.tickOnUpdate = false;
        this.tickChildren = false;
        this.mouseChildren = false;
        this.mouseEnabled = false;
        this.mouseEnabled = true;
        this.preventSelection = true;
        this.movable = true;
        this.interactive = false;
    };
    var $Map_stage = Map_stage;
    $traceurRuntime.createClass(Map_stage, {
        getCacheEnabled: function () {
            return this._cacheEnabled;
        },
        setCacheEnabled: function (status) {
            validators._is_boolean(status);
            this._cacheEnabled = status;
            return this;
        },
        getChildNamed: function (name) {
            var $__8 = true;
            var $__9 = false;
            var $__10 = undefined;
            try {
                for (var $__6 = void 0, $__5 = this.children[$traceurRuntime.toProperty(Symbol.iterator)](); !($__8 = ($__6 = $__5.next()).done); $__8 = true) {
                    var layer = $__6.value;
                    {
                        var child = void 0;
                        if (layer.name.toLowerCase() === name.toLowerCase()) {
                            return layer;
                        }
                        if (child = layer.getChildNamed(name)) {
                            return child;
                        }
                    }
                }
            } catch ($__11) {
                $__9 = true;
                $__10 = $__11;
            } finally {
                try {
                    if (!$__8 && $__5.return != null) {
                        $__5.return();
                    }
                } finally {
                    if ($__9) {
                        throw $__10;
                    }
                }
            }
            return false;
        }
    }, {}, createjs.Stage);
    Map_stage.prototype.addPrototype = mapFunc_addPrototype;
    return {
        get Map_stage() {
            return Map_stage;
        },
        __esModule: true
    };
});
/*public/components/map/core/Map_layer*/
define('public/components/map/core/Map_layer', [
    './map_validators',
    './mapFunctions'
], function ($__0, $__2) {
    'use strict';
    if (!$__0 || !$__0.__esModule)
        $__0 = { default: $__0 };
    if (!$__2 || !$__2.__esModule)
        $__2 = { default: $__2 };
    'use strict';
    var validatorMod = $__0.validatorMod;
    var mapFunc_addPrototype = $__2.addPrototype;
    var TYPES = {
            justSubContainers: 1,
            noSubContainers: 2,
            imagesInSubContainers: 3
        };
    var privateFunctions = {
            _getStageIndex: _getStageIndex,
            _createSubContainers: _createSubContainers,
            _cacheLayer: _cacheLayer,
            _setCorrectSubContainer: _setCorrectSubContainer,
            _getCorrectContainer: _getCorrectContainer
        };
    var validators = {
            _is_index: validatorMod.isIndex,
            _is_boolean: validatorMod.isBoolean,
            _is_coordinates: validatorMod.isCoordinates,
            _is_SubContainerAmount: validatorMod.isSubContainerAmount,
            _is_UseOfSubLayers: validatorMod.isUseOfSubLayers,
            _is_UseOfSubContainers: validatorMod.isUseOfSubContainers
        };
    var Map_layer = function Map_layer(name, type, subContainers) {
        $traceurRuntime.superConstructor($Map_layer).call(this);
        this.superPrototype = this.constructor.prototype;
        this.type = subContainers ? TYPES.imagesInSubContainers : type;
        this.visible = true;
        this.useSubcontainers = subContainers || false;
        this.name = '' + name;
        this.drawThisChild = true;
        this.interactive = false;
        this.tickEnabled = false;
        this.tickChildren = false;
        this.mouseChildren = false;
        this.mouseEnabled = false;
    };
    var $Map_layer = Map_layer;
    $traceurRuntime.createClass(Map_layer, {
        addPrototype: function (name, functionToAdd) {
            $traceurRuntime.superGet(this, $Map_layer.prototype, 'prototype')[name] = functionToAdd;
        },
        addChildToSubContainer: function (object, index) {
            var functionToUse = index ? '_addChildAt' : '_addChild';
            if (!this.useSubcontainers) {
                this[functionToUse](object, index);
            } else {
                var correctSubContainer = privateFunctions._getCorrectContainer.call(this, object.x, object.y);
                correctSubContainer.addChild(object, index);
            }
            return this;
        },
        getChildNamed: function (name) {
            if (this.children[0] instanceof createjs.Container) {
                var $__8 = true;
                var $__9 = false;
                var $__10 = undefined;
                try {
                    for (var $__6 = void 0, $__5 = this.children[$traceurRuntime.toProperty(Symbol.iterator)](); !($__8 = ($__6 = $__5.next()).done); $__8 = true) {
                        var child = $__6.value;
                        {
                            if (child.name.toLowerCase() === name.toLowerCase()) {
                                return child;
                            }
                        }
                    }
                } catch ($__11) {
                    $__9 = true;
                    $__10 = $__11;
                } finally {
                    try {
                        if (!$__8 && $__5.return != null) {
                            $__5.return();
                        }
                    } finally {
                        if ($__9) {
                            throw $__10;
                        }
                    }
                }
            }
            return false;
        },
        isUsingSubContainers: function () {
            return !!this.useSubcontainers;
        },
        isSetVisible: function () {
        },
        setVisible: function () {
        }
    }, {
        getType: function (name) {
            return TYPES[name];
        }
    }, createjs.Container);
    Map_layer.prototype.addPrototype = mapFunc_addPrototype;
    function _getStageIndex(map, canvas) {
    }
    function _createSubContainers() {
    }
    function _cacheLayer() {
    }
    function _setCorrectSubContainer() {
    }
    function _getCorrectContainer(x, y) {
        var correctSubContainer = this.getObjectUnderPoint(x, y);
        return correctSubContainer;
    }
    return {
        get Map_layer() {
            return Map_layer;
        },
        __esModule: true
    };
});
/*public/components/map/core/Object*/
define('public/components/map/core/Object', [], function () {
    'use strict';
    'use strict';
    var Object_sprite = function Object_sprite(coords, data, spritesheet, currentFrameNumber) {
        $traceurRuntime.superConstructor($Object_sprite).call(this, spritesheet);
        this.name = 'general Objects_sprite_' + this.id;
        this.data = data || {};
        this.currFrameNumber = currentFrameNumber;
        this.innerDraw(coords.x, coords.y);
        this.shadow = true;
        this.tickEnabled = false;
        this.mouseEnabled = false;
    };
    var $Object_sprite = Object_sprite;
    $traceurRuntime.createClass(Object_sprite, {
        setData: function (data) {
            this.data = data;
            return this;
        },
        innerDraw: function (x, y) {
            this.gotoAndStop(this.currFrameNumber);
            console.log('HAAA');
            this.x = x;
            this.y = y;
            return this;
        },
        drawNewFrame: function (x, y, newFrameNumber) {
            this.currFrameNumber = newFrameNumber;
            return this.innerDraw(x, y);
        },
        globalCoords: function () {
            return {
                x: Number(this.x + this.parent.x),
                y: Number(this.y + this.parent.y)
            };
        },
        getBoundsFromFrames: function () {
            return this.spriteSheet.getFrameBounds(this.currentFrame);
        }
    }, {}, createjs.Sprite);
    return {
        get Object_sprite() {
            return Object_sprite;
        },
        __esModule: true
    };
});
/*public/components/map/object/Object_terrain*/
define('public/components/map/object/Object_terrain', ['../core/Object'], function ($__0) {
    'use strict';
    if (!$__0 || !$__0.__esModule)
        $__0 = { default: $__0 };
    'use strict';
    var Object_sprite = $__0.Object_sprite;
    var Object_terrain = function Object_terrain() {
        $traceurRuntime.superConstructor($Object_terrain).apply(this, arguments);
        ;
    };
    var $Object_terrain = Object_terrain;
    $traceurRuntime.createClass(Object_terrain, {
        construct: function (coords, data, spriteSheet, currFrameNumber) {
            $traceurRuntime.superGet(this, $Object_terrain.prototype, 'spriteSheet').call(this, coords, data, spriteSheet, currFrameNumber);
            this.name = 'DefaultTerrainObject';
        }
    }, {}, Object_sprite);
    return {
        get Object_terrain() {
            return Object_terrain;
        },
        __esModule: true
    };
});
/*public/components/map/object/Object_unit*/
define('public/components/map/object/Object_unit', ['../core/Object'], function ($__0) {
    'use strict';
    if (!$__0 || !$__0.__esModule)
        $__0 = { default: $__0 };
    'use strict';
    var Object_sprite = $__0.Object_sprite;
    var Object_unit = function Object_unit() {
        $traceurRuntime.superConstructor($Object_unit).apply(this, arguments);
        ;
    };
    var $Object_unit = Object_unit;
    $traceurRuntime.createClass(Object_unit, {
        construct: function (coords, data, spriteSheet, currFrameNumber) {
            $traceurRuntime.superGet(this, $Object_unit.prototype, 'spriteSheet').call(this, coords, data, spriteSheet, currFrameNumber);
            this.name = 'DefaultUnitObjects';
        }
    }, {}, Object_sprite);
    return {
        get Object_unit() {
            return Object_unit;
        },
        __esModule: true
    };
});
/*blueimp-md5@1.1.0#js/md5*/
(function ($) {
    'use strict';
    function safe_add(x, y) {
        var lsw = (x & 65535) + (y & 65535), msw = (x >> 16) + (y >> 16) + (lsw >> 16);
        return msw << 16 | lsw & 65535;
    }
    function bit_rol(num, cnt) {
        return num << cnt | num >>> 32 - cnt;
    }
    function md5_cmn(q, a, b, x, s, t) {
        return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b);
    }
    function md5_ff(a, b, c, d, x, s, t) {
        return md5_cmn(b & c | ~b & d, a, b, x, s, t);
    }
    function md5_gg(a, b, c, d, x, s, t) {
        return md5_cmn(b & d | c & ~d, a, b, x, s, t);
    }
    function md5_hh(a, b, c, d, x, s, t) {
        return md5_cmn(b ^ c ^ d, a, b, x, s, t);
    }
    function md5_ii(a, b, c, d, x, s, t) {
        return md5_cmn(c ^ (b | ~d), a, b, x, s, t);
    }
    function binl_md5(x, len) {
        x[len >> 5] |= 128 << len % 32;
        x[(len + 64 >>> 9 << 4) + 14] = len;
        var i, olda, oldb, oldc, oldd, a = 1732584193, b = -271733879, c = -1732584194, d = 271733878;
        for (i = 0; i < x.length; i += 16) {
            olda = a;
            oldb = b;
            oldc = c;
            oldd = d;
            a = md5_ff(a, b, c, d, x[i], 7, -680876936);
            d = md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
            c = md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
            b = md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
            a = md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
            d = md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
            c = md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
            b = md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
            a = md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
            d = md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
            c = md5_ff(c, d, a, b, x[i + 10], 17, -42063);
            b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
            a = md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
            d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
            c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
            b = md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);
            a = md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
            d = md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
            c = md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
            b = md5_gg(b, c, d, a, x[i], 20, -373897302);
            a = md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
            d = md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
            c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
            b = md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
            a = md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
            d = md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
            c = md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
            b = md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
            a = md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
            d = md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
            c = md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
            b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);
            a = md5_hh(a, b, c, d, x[i + 5], 4, -378558);
            d = md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
            c = md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
            b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
            a = md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
            d = md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
            c = md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
            b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
            a = md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
            d = md5_hh(d, a, b, c, x[i], 11, -358537222);
            c = md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
            b = md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
            a = md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
            d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
            c = md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
            b = md5_hh(b, c, d, a, x[i + 2], 23, -995338651);
            a = md5_ii(a, b, c, d, x[i], 6, -198630844);
            d = md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
            c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
            b = md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
            a = md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
            d = md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
            c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
            b = md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
            a = md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
            d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
            c = md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
            b = md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
            a = md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
            d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
            c = md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
            b = md5_ii(b, c, d, a, x[i + 9], 21, -343485551);
            a = safe_add(a, olda);
            b = safe_add(b, oldb);
            c = safe_add(c, oldc);
            d = safe_add(d, oldd);
        }
        return [
            a,
            b,
            c,
            d
        ];
    }
    function binl2rstr(input) {
        var i, output = '';
        for (i = 0; i < input.length * 32; i += 8) {
            output += String.fromCharCode(input[i >> 5] >>> i % 32 & 255);
        }
        return output;
    }
    function rstr2binl(input) {
        var i, output = [];
        output[(input.length >> 2) - 1] = undefined;
        for (i = 0; i < output.length; i += 1) {
            output[i] = 0;
        }
        for (i = 0; i < input.length * 8; i += 8) {
            output[i >> 5] |= (input.charCodeAt(i / 8) & 255) << i % 32;
        }
        return output;
    }
    function rstr_md5(s) {
        return binl2rstr(binl_md5(rstr2binl(s), s.length * 8));
    }
    function rstr_hmac_md5(key, data) {
        var i, bkey = rstr2binl(key), ipad = [], opad = [], hash;
        ipad[15] = opad[15] = undefined;
        if (bkey.length > 16) {
            bkey = binl_md5(bkey, key.length * 8);
        }
        for (i = 0; i < 16; i += 1) {
            ipad[i] = bkey[i] ^ 909522486;
            opad[i] = bkey[i] ^ 1549556828;
        }
        hash = binl_md5(ipad.concat(rstr2binl(data)), 512 + data.length * 8);
        return binl2rstr(binl_md5(opad.concat(hash), 512 + 128));
    }
    function rstr2hex(input) {
        var hex_tab = '0123456789abcdef', output = '', x, i;
        for (i = 0; i < input.length; i += 1) {
            x = input.charCodeAt(i);
            output += hex_tab.charAt(x >>> 4 & 15) + hex_tab.charAt(x & 15);
        }
        return output;
    }
    function str2rstr_utf8(input) {
        return unescape(encodeURIComponent(input));
    }
    function raw_md5(s) {
        return rstr_md5(str2rstr_utf8(s));
    }
    function hex_md5(s) {
        return rstr2hex(raw_md5(s));
    }
    function raw_hmac_md5(k, d) {
        return rstr_hmac_md5(str2rstr_utf8(k), str2rstr_utf8(d));
    }
    function hex_hmac_md5(k, d) {
        return rstr2hex(raw_hmac_md5(k, d));
    }
    function md5(string, key, raw) {
        if (!key) {
            if (!raw) {
                return hex_md5(string);
            }
            return raw_md5(string);
        }
        if (!raw) {
            return hex_hmac_md5(key, string);
        }
        return raw_hmac_md5(key, string);
    }
    if (typeof define === 'function' && define.amd) {
        define('blueimp-md5@1.1.0#js/md5', function () {
            return md5;
        });
    } else {
        $.md5 = md5;
    }
}(this));
/*public/components/map/core/spritesheetList*/
define('public/components/map/core/spritesheetList', ['blueimp-md5'], function ($__0) {
    'use strict';
    if (!$__0 || !$__0.__esModule)
        $__0 = { default: $__0 };
    'use strict';
    var hash = $__0.default;
    var allSpritesheets = [];
    var allSpritesheetIDs = [];
    function spritesheetList() {
        var scope = {};
        scope.addSpritesheet = function (spritesheetData) {
            var spriteSheet;
            if (scope.spritesheetAlreadyExists(_createID(spritesheetData))) {
                return false;
            }
            spriteSheet = new createjs.SpriteSheet(spritesheetData);
            allSpritesheets.push(spriteSheet);
            return spriteSheet;
        };
        scope.removeSpritesheet = function (spritesheet) {
        };
        scope.getAllSpritesheets = function () {
            return allSpritesheets;
        };
        scope.spritesheetAlreadyExists = function (spritesheetID) {
            return allSpritesheetIDs.indexOf(spritesheetID) > -1;
        };
        function _createID(spritesheetData) {
            return spritesheetData.images.toString();
        }
        ;
        return scope;
    }
    return {
        get spritesheetList() {
            return spritesheetList;
        },
        __esModule: true
    };
});
/*public/components/factories/MapFactory*/
define('public/components/factories/MapFactory', [
    '../map/core/Map',
    '../map/core/Map_stage',
    '../map/core/Map_layer',
    '../map/object/Object_terrain',
    '../map/object/Object_unit',
    '../map/core/spritesheetList',
    '../map/core/map_validators'
], function ($__0, $__2, $__4, $__6, $__8, $__10, $__12) {
    'use strict';
    if (!$__0 || !$__0.__esModule)
        $__0 = { default: $__0 };
    if (!$__2 || !$__2.__esModule)
        $__2 = { default: $__2 };
    if (!$__4 || !$__4.__esModule)
        $__4 = { default: $__4 };
    if (!$__6 || !$__6.__esModule)
        $__6 = { default: $__6 };
    if (!$__8 || !$__8.__esModule)
        $__8 = { default: $__8 };
    if (!$__10 || !$__10.__esModule)
        $__10 = { default: $__10 };
    if (!$__12 || !$__12.__esModule)
        $__12 = { default: $__12 };
    'use strict';
    var Map = $__0.Map;
    var Map_stage = $__2.Map_stage;
    var Map_layer = $__4.Map_layer;
    var Object_terrain = $__6.Object_terrain;
    var Object_unit = $__8.Object_unit;
    var spritesheetList = $__10.spritesheetList;
    var allSpritesheets = spritesheetList();
    var validatorMod = $__12.validatorMod;
    var functionsInObj = {
            Map_stage: Map_stage,
            Map_layer: Map_layer,
            Object_terrain: Object_terrain,
            Object_unit: Object_unit
        };
    var privateFunctions = { _getStageIndex: _getStageIndex };
    var validators = { _is_index: validatorMod.isIndex };
    function createMap(gameDataArg, mapDataArg, typeDataArg) {
        console.log('============================================');
        var mapData = typeof mapDataArg === 'string' ? JSON.parse(mapDataArg) : mapDataArg;
        var typeData = typeof typeDataArg === 'string' ? JSON.parse(typeDataArg) : typeDataArg;
        var gameData = typeof gameDataArg === 'string' ? JSON.parse(gameDataArg) : gameDataArg;
        var map = new Map({ mapSize: gameData.mapSize });
        mapData.stages.forEach(function (stageData) {
            var thisStage = new functionsInObj[stageData.type](stageData.name, document.querySelector(stageData.element));
            map.addStage(thisStage);
            stageData.layers.forEach(function (layerData) {
                var thisLayer;
                try {
                    thisLayer = new functionsInObj[layerData.type](layerData.name, layerData.type, false);
                    thisStage.addChild(thisLayer);
                } catch (e) {
                    console.log('Problem:', layerData.type, e.stack);
                }
                layerData.objectGroups.forEach(function (objectGroup) {
                    var spritesheet;
                    var spritesheetType = objectGroup.typeImageData;
                    if (!spritesheetType) {
                        console.log('Error with spritesheetType-data');
                        return;
                    }
                    if (spritesheetType) {
                        var spritesheetData = typeData.graphicData[spritesheetType];
                        spritesheet = allSpritesheets.addSpritesheet(spritesheetData);
                    }
                    objectGroup.objects.forEach(function (object) {
                        var objTypeData = typeData.objectData[spritesheetType][object.objType];
                        if (!objTypeData) {
                            console.debug('Bad mapData for type:', spritesheetType, object.objType, object.name);
                        }
                        var currentFrameNumber = objTypeData.image;
                        thisLayer.addChild(new functionsInObj[objectGroup.type](object.coord, object.data, spritesheet, currentFrameNumber));
                    });
                });
            });
        });
        return map;
        function _calculateMapSize() {
        }
    }
    function _getStageIndex() {
    }
    return {
        get createMap() {
            return createMap;
        },
        __esModule: true
    };
});
/*public/tests/data/gameData*/
define('public/tests/data/gameData', [], function () {
    'use strict';
    var gameData = {
            ID: '53837d47976fed3b24000005',
            turn: 1,
            mapSize: {
                x: 500,
                y: 200
            },
            pluginsToActivate: { map: ['map_move'] }
        };
    return {
        get gameData() {
            return gameData;
        },
        __esModule: true
    };
});
/*public/tests/data/typeData*/
define('public/tests/data/typeData', [], function () {
    'use strict';
    var typeData = {
            'graphicData': {
                'general': {
                    'terrain': {
                        'tileWidth': 96,
                        'tileHeight': 48
                    }
                },
                'terrainBase': {
                    'images': ['/assets/img/map/collection.png'],
                    'frames': [
                        [
                            0,
                            0,
                            96,
                            48
                        ],
                        [
                            0,
                            48,
                            96,
                            48
                        ],
                        [
                            0,
                            96,
                            96,
                            48
                        ],
                        [
                            0,
                            144,
                            96,
                            48
                        ],
                        [
                            0,
                            192,
                            96,
                            48
                        ],
                        [
                            0,
                            240,
                            96,
                            48
                        ]
                    ],
                    'imageSize': [
                        96,
                        48
                    ]
                },
                'terrain': {
                    'images': ['/assets/img/map/amplio2/terrain1.png'],
                    'frames': [
                        [
                            1,
                            1,
                            96,
                            48
                        ],
                        [
                            1,
                            50,
                            96,
                            48
                        ],
                        [
                            1,
                            99,
                            96,
                            48
                        ],
                        [
                            1,
                            148,
                            96,
                            48
                        ],
                        [
                            1,
                            197,
                            96,
                            48
                        ],
                        [
                            1,
                            246,
                            96,
                            48
                        ],
                        [
                            1,
                            295,
                            96,
                            48
                        ],
                        [
                            1,
                            344,
                            96,
                            48
                        ],
                        [
                            1,
                            393,
                            96,
                            48
                        ]
                    ],
                    'imageSize': [
                        96,
                        48
                    ]
                },
                'dither': {
                    'images': ['/assets/img/map/dither2.png'],
                    'frames': [[
                            0,
                            0,
                            96,
                            48
                        ]],
                    'imageSize': [
                        96,
                        48
                    ]
                },
                'prettifier': {
                    'images': [
                        '/assets/img/map/amplio2/mountains.png',
                        '/assets/img/map/amplio2/hills.png',
                        '/assets/img/map/amplio2/terrain2.png'
                    ],
                    'frames': [
                        [
                            1,
                            1,
                            96,
                            66,
                            0,
                            0,
                            18
                        ],
                        [
                            1,
                            1,
                            96,
                            48,
                            1,
                            -4,
                            4
                        ],
                        [
                            1,
                            148,
                            96,
                            48,
                            2
                        ]
                    ]
                },
                'resource': {
                    'images': ['/assets/img/map/resources/terrain1.png'],
                    'frames': [
                        [
                            195,
                            1,
                            96,
                            48
                        ],
                        [
                            389,
                            1,
                            96,
                            48
                        ]
                    ]
                },
                'place': {},
                'city': {
                    'images': ['/assets/img/map/amplio2/medievalcities.png'],
                    'frames': [
                        [
                            1,
                            1,
                            96,
                            72
                        ],
                        [
                            98,
                            1,
                            96,
                            72
                        ],
                        [
                            195,
                            1,
                            96,
                            72
                        ],
                        [
                            292,
                            1,
                            96,
                            72
                        ],
                        [
                            389,
                            1,
                            96,
                            72
                        ],
                        [
                            485,
                            1,
                            96,
                            72
                        ],
                        [
                            582,
                            1,
                            96,
                            72
                        ],
                        [
                            679,
                            1,
                            96,
                            72
                        ],
                        [
                            776,
                            1,
                            96,
                            72
                        ],
                        [
                            873,
                            1,
                            96,
                            72
                        ],
                        [
                            1,
                            74,
                            96,
                            72
                        ],
                        [
                            98,
                            74,
                            96,
                            72
                        ],
                        [
                            195,
                            74,
                            96,
                            72
                        ],
                        [
                            292,
                            74,
                            96,
                            72
                        ],
                        [
                            389,
                            74,
                            96,
                            72
                        ],
                        [
                            485,
                            74,
                            96,
                            72
                        ],
                        [
                            582,
                            74,
                            96,
                            72
                        ],
                        [
                            679,
                            74,
                            96,
                            72
                        ],
                        [
                            776,
                            74,
                            96,
                            72
                        ],
                        [
                            873,
                            74,
                            96,
                            72
                        ]
                    ]
                },
                'building': {
                    'images': ['/assets/img/map/isophex/terrain1.png'],
                    'frames': [
                        [
                            1,
                            1,
                            64,
                            32
                        ],
                        [
                            66,
                            1,
                            64,
                            32
                        ],
                        [
                            132,
                            1,
                            64,
                            32
                        ],
                        [
                            198,
                            1,
                            64,
                            32
                        ],
                        [
                            264,
                            1,
                            64,
                            32
                        ],
                        [
                            1,
                            34,
                            64,
                            32
                        ],
                        [
                            1,
                            67,
                            64,
                            32
                        ],
                        [
                            1,
                            100,
                            64,
                            32
                        ],
                        [
                            1,
                            133,
                            64,
                            32
                        ],
                        [
                            1,
                            166,
                            64,
                            32
                        ]
                    ]
                },
                'modifier': {
                    'images': ['/assets/img/map/isophex/terrain1.png'],
                    'frames': [
                        [
                            1,
                            1,
                            64,
                            32
                        ],
                        [
                            66,
                            1,
                            64,
                            32
                        ],
                        [
                            132,
                            1,
                            64,
                            32
                        ],
                        [
                            198,
                            1,
                            64,
                            32
                        ],
                        [
                            264,
                            1,
                            64,
                            32
                        ],
                        [
                            1,
                            34,
                            64,
                            32
                        ],
                        [
                            1,
                            67,
                            64,
                            32
                        ],
                        [
                            1,
                            100,
                            64,
                            32
                        ],
                        [
                            1,
                            133,
                            64,
                            32
                        ],
                        [
                            1,
                            166,
                            64,
                            32
                        ]
                    ]
                },
                'unit': {
                    'images': ['/assets/img/map/amplio2/units.png'],
                    'frames': {
                        'width': 66,
                        'height': 50
                    }
                }
            },
            'objectData': {
                'unit': [
                    {
                        'name': 'tank',
                        'desc': 'Vrooom...',
                        'image': '0',
                        'att': 'Good',
                        'def': 'Poor',
                        'siege': 'Decent',
                        'initiate': '90',
                        'move': '100',
                        'morale': 'Average',
                        'vision': '150',
                        'influenceArea': '30'
                    },
                    {
                        'name': 'carrier',
                        'desc': 'angry beehive',
                        'image': '6',
                        'att': '1',
                        'def': '2',
                        'siege': '2',
                        'initiate': '110',
                        'move': '100',
                        'morale': 'Average',
                        'vision': '250',
                        'influenceArea': '30',
                        'modifiers': {
                            'unit': {
                                '_enemy_': [{
                                        'from': 'thisOnePlace',
                                        'modifiers': { 'morale': 'suffers morale drop' }
                                    }]
                            }
                        }
                    },
                    {
                        'name': 'cavalry',
                        'desc': 'Give me an apple!',
                        'image': '26',
                        'att': '3',
                        'def': '1',
                        'siege': '0',
                        'initiate': '50',
                        'move': '300',
                        'morale': 'Average',
                        'vision': '100',
                        'influenceArea': '30'
                    }
                ],
                'terrainBase': [
                    {
                        'image': '0',
                        'attachedToTerrains': ['0'],
                        'propability': '100%'
                    },
                    {
                        'image': '1',
                        'attachedToTerrains': ['2'],
                        'propability': '100%'
                    },
                    {
                        'image': '2',
                        'attachedToTerrains': ['1'],
                        'propability': '100%'
                    },
                    {
                        'image': '3',
                        'attachedToTerrains': ['4'],
                        'propability': '100%'
                    },
                    {
                        'image': '4',
                        'attachedToTerrains': ['5'],
                        'propability': '100%'
                    },
                    {
                        'image': '5',
                        'attachedToTerrains': ['3'],
                        'propability': '100%'
                    }
                ],
                'terrain': [
                    {
                        'name': 'desert',
                        'image': '0',
                        'desc': 'very dry land',
                        'modifiers': {
                            'City': {
                                '_player_': [{
                                        'from': 'thisOnePlace',
                                        'modifiers': { 'production': 'Provides +1 food for cities' }
                                    }]
                            }
                        }
                    },
                    {
                        'name': 'plain',
                        'image': '1',
                        'desc': 'Buffalo roaming area',
                        'modifiers': {
                            'City': {
                                '_player_': [{
                                        'from': 'thisOnePlace',
                                        'modifiers': { 'production': 'Provides +12% food for cities' }
                                    }]
                            }
                        }
                    },
                    {
                        'name': 'forest',
                        'image': '2',
                        'desc': 'Robin hood likes it here',
                        'modifiers': {
                            'Unit': {
                                '_player_': [{
                                        'from': 'thisOnePlace',
                                        'modifiers': { 'defend': 'Unit defend +2' }
                                    }]
                            }
                        }
                    },
                    {
                        'name': 'tundra',
                        'desc': 'Siberia teaches you',
                        'image': '6'
                    },
                    {
                        'name': 'arctic',
                        'desc': 'Your ball will freeze of',
                        'image': '7'
                    },
                    {
                        'name': 'swamp',
                        'desc': 'Cranberries and cloudberries',
                        'image': '8'
                    }
                ],
                'dither': [{
                        'image': '0',
                        'attachedToTerrains': [
                            '0',
                            '1',
                            '2',
                            '3',
                            '4',
                            '5',
                            '6',
                            '7',
                            '8',
                            '9'
                        ],
                        'propability': '100%'
                    }],
                'prettifier': [
                    {
                        'image': '0',
                        'zIndex': '1',
                        'attachedToTerrains': ['3'],
                        'propability': '25%'
                    },
                    {
                        'image': '1',
                        'zIndex': '1',
                        'attachedToTerrains': ['1'],
                        'propability': '40%'
                    },
                    {
                        'image': '2',
                        'zIndex': '0',
                        'attachedToTerrains': ['2'],
                        'propability': '60%'
                    }
                ],
                'resource': [
                    {
                        'name': 'Oasis',
                        'image': '0',
                        'desc': 'Oasis in the middle of desert, or not atm.',
                        'modifiers': {
                            'City': {
                                '_player_': [{
                                        'from': 'thisOnePlace',
                                        'modifiers': { 'production': 'food production 5 / week' }
                                    }]
                            }
                        },
                        'attachedToTerrains': ['0'],
                        'influenceArea': 50
                    },
                    {
                        'name': 'Oil',
                        'image': '1',
                        'desc': 'Black gold',
                        'modifiers': {
                            'City': {
                                '_player_': [{
                                        'from': 'thisOnePlace',
                                        'modifiers': { 'production': 'There is a lot of oil here' }
                                    }]
                            }
                        },
                        'attachedToTerrains': [
                            '0',
                            '4'
                        ],
                        'influenceArea': 50
                    }
                ],
                'city': [
                    {
                        'name': 'Medieval',
                        'vision': '100',
                        'image': '0',
                        'influenceArea': 50
                    },
                    {
                        'name': 'Medieval2',
                        'vision': '100',
                        'image': '1',
                        'influenceArea': 50
                    }
                ],
                'place': [],
                'building': [
                    {
                        'name': 'Barracks',
                        'image': '0',
                        'tooltip': 'Enables troop recruitment'
                    },
                    {
                        'name': 'Factory',
                        'image': '1',
                        'tooltip': 'Produces weaponry'
                    }
                ],
                'government': [
                    {
                        'name': 'Democrazy',
                        'description': 'well it\'s a democrazy :)',
                        'tooltip': 'Gives +20% happiness',
                        'image': '0',
                        'requirements': [],
                        'possibleNatValues': [
                            0,
                            1
                        ],
                        'modifiers': {
                            'faction': {
                                'politics': {
                                    '_player_': [{
                                            'from': 'thisOnePlace',
                                            'modifiers': { 'happiness': '20%' }
                                        }]
                                }
                            }
                        }
                    },
                    {
                        'name': 'Communism',
                        'description': 'You know the one used in the great USSR and inside the great firewall of China',
                        'tooltip': 'Gives production bonuses',
                        'image': '0',
                        'requirements': [],
                        'possibleNatValues': [
                            2,
                            3
                        ],
                        'modifiers': {
                            'faction': {
                                'politics': {
                                    '_player_': [{
                                            'from': 'thisOnePlace',
                                            'modifiers': {}
                                        }]
                                }
                            },
                            'City': {
                                'building': {
                                    '_player_': [{
                                            'from': 'thisOnePlace',
                                            'modifiers': { 'production': '20%' }
                                        }]
                                }
                            }
                        }
                    }
                ],
                'politics': {
                    'taxRate': [
                        {
                            'min': '0',
                            'max': '20',
                            'modifiers': {
                                'Unit': {
                                    '_player_': [{
                                            'from': 'thisOnePlace',
                                            'modifiers': { 'attack': '+1' }
                                        }]
                                }
                            }
                        },
                        {
                            'min': '21',
                            'max': '100',
                            'modifiers': {
                                'faction': {
                                    'diplomacy': {
                                        '_player_': [{
                                                'from': 'thisOnePlace',
                                                'modifiers': { 'skill': '+5' }
                                            }]
                                    }
                                }
                            }
                        }
                    ],
                    'corruption': [
                        {
                            'min': '0',
                            'max': '20',
                            'modifiers': {
                                'Unit': {
                                    '_player_': [{
                                            'from': 'thisOnePlace',
                                            'modifiers': { 'attack': '+1' }
                                        }]
                                }
                            }
                        },
                        {
                            'min': '21',
                            'max': '100',
                            'modifiers': {
                                'faction': {
                                    'diplomacy': {
                                        '_player_': [{
                                                'from': 'thisOnePlace',
                                                'modifiers': { 'skill': '+5' }
                                            }]
                                    }
                                }
                            }
                        }
                    ],
                    'alignment': [
                        {
                            'min': '0',
                            'max': '20',
                            'modifiers': {
                                'Unit': {
                                    '_player_': [{
                                            'from': 'thisOnePlace',
                                            'modifiers': { 'attack': '+1' }
                                        }]
                                }
                            }
                        },
                        {
                            'min': '21',
                            'max': '100',
                            'modifiers': {
                                'faction': {
                                    'diplomacy': {
                                        '_player_': [{
                                                'from': 'thisOnePlace',
                                                'modifiers': { 'skill': '+5' }
                                            }]
                                    }
                                }
                            }
                        }
                    ],
                    'happiness': [
                        {
                            'min': '0',
                            'max': '20',
                            'modifiers': {
                                'Unit': {
                                    '_player_': [{
                                            'from': 'thisOnePlace',
                                            'modifiers': { 'attack': '+1' }
                                        }]
                                }
                            }
                        },
                        {
                            'min': '21',
                            'max': '100',
                            'modifiers': {
                                'faction': {
                                    'diplomacy': {
                                        '_player_': [{
                                                'from': 'thisOnePlace',
                                                'modifiers': { 'skill': '+5' }
                                            }]
                                    }
                                }
                            }
                        }
                    ],
                    'revoltRisk': [
                        {
                            'min': '0',
                            'max': '20',
                            'modifiers': {
                                'Unit': {
                                    '_player_': [{
                                            'from': 'thisOnePlace',
                                            'modifiers': { 'attack': '+1' }
                                        }]
                                }
                            }
                        },
                        {
                            'min': '21',
                            'max': '100',
                            'modifiers': {
                                'faction': {
                                    'diplomacy': {
                                        '_player_': [{
                                                'from': 'thisOnePlace',
                                                'modifiers': { 'skill': '+5' }
                                            }]
                                    }
                                }
                            }
                        }
                    ],
                    'unity': [
                        {
                            'min': '0',
                            'max': '20',
                            'modifiers': {
                                'Unit': {
                                    '_player_': [{
                                            'from': 'thisOnePlace',
                                            'modifiers': { 'attack': '+1' }
                                        }]
                                }
                            }
                        },
                        {
                            'min': '21',
                            'max': '100',
                            'modifiers': {
                                'faction': {
                                    'diplomacy': {
                                        '_player_': [{
                                                'from': 'thisOnePlace',
                                                'modifiers': { 'skill': '+5' }
                                            }]
                                    }
                                }
                            }
                        }
                    ],
                    'natValue': [
                        {
                            'name': 'Integrity',
                            'tooltip': 'Government and populations shows integrity and trustworthiness',
                            'modifiers': {
                                'faction': {
                                    'politics': {
                                        '_player_': [{
                                                'from': 'thisOnePlace',
                                                'modifiers': {
                                                    'internalRelations': '+10%',
                                                    'diplomacy': '+10%',
                                                    'revolt risk': '-5%',
                                                    'relationsToElite': '-20%'
                                                }
                                            }]
                                    }
                                }
                            }
                        },
                        {
                            'name': 'Capitalism',
                            'modifiers': {
                                'faction': {
                                    'politics': {
                                        '_player_': [{
                                                'from': 'thisOnePlace',
                                                'modifiers': {
                                                    'diplomacy': '+5%',
                                                    'relationsToElite': '+5%',
                                                    'morale': '+5%'
                                                }
                                            }]
                                    }
                                }
                            }
                        },
                        {
                            'name': 'Hardworking',
                            'modifiers': {
                                'faction': {
                                    'politics': {
                                        '_player_': [{
                                                'from': 'thisOnePlace',
                                                'modifiers': {
                                                    'productivity': '+10%',
                                                    'happiness': '+5%',
                                                    'relationsToElite': '+5%'
                                                }
                                            }]
                                    }
                                }
                            }
                        },
                        {
                            'name': 'Leadership',
                            'modifiers': {
                                'faction': {
                                    'politics': {
                                        '_player_': [{
                                                'from': 'thisOnePlace',
                                                'modifiers': {
                                                    'productivity': '+5%',
                                                    'happiness': '-5%',
                                                    'relationsToElite': '+5%',
                                                    'trading': '+10%'
                                                }
                                            }]
                                    }
                                }
                            }
                        }
                    ]
                }
            }
        };
    return {
        get typeData() {
            return typeData;
        },
        __esModule: true
    };
});
/*public/tests/data/mapData*/
define('public/tests/data/mapData', [], function () {
    'use strict';
    var mapData = {
            gameID: '53837d47976fed3b24000005',
            turn: 1,
            stages: [{
                    type: 'Map_stage',
                    coordinates: {
                        x: 0,
                        y: 0
                    },
                    name: 'terrainStage',
                    element: '#mapCanvas',
                    layers: [
                        {
                            type: 'Map_layer',
                            coordinates: {
                                x: 0,
                                y: 0
                            },
                            name: 'terrainBaseLayer',
                            specials: [{ 'interactive': false }],
                            options: { cache: true },
                            objectGroups: [{
                                    type: 'Object_terrain',
                                    name: 'TerrainBase',
                                    typeImageData: 'terrainBase',
                                    objects: [
                                        {
                                            'objType': 5,
                                            'name': 'swamp',
                                            '_id': '53837d49976fed3b240006b8',
                                            'coord': {
                                                'x': '0',
                                                'y': '240'
                                            },
                                            'data': {},
                                            'lastSeenTurn': '1'
                                        },
                                        {
                                            'objType': 5,
                                            'name': 'swamp',
                                            '_id': '53837d49976fed3b240006bd',
                                            'coord': {
                                                'x': '0',
                                                'y': '480'
                                            },
                                            'data': {},
                                            'lastSeenTurn': '1'
                                        },
                                        {
                                            'objType': 3,
                                            'name': 'tundra',
                                            '_id': '53837d49976fed3b240006c2',
                                            'coord': {
                                                'x': '0',
                                                'y': '720'
                                            },
                                            'data': {},
                                            'lastSeenTurn': '1'
                                        },
                                        {
                                            'objType': 2,
                                            'name': 'forest',
                                            '_id': '53837d49976fed3b240006c7',
                                            'coord': {
                                                'x': '0',
                                                'y': '960'
                                            },
                                            'data': {},
                                            'lastSeenTurn': '1'
                                        },
                                        {
                                            'objType': 2,
                                            'name': 'forest',
                                            '_id': '53837d49976fed3b240006cc',
                                            'coord': {
                                                'x': '0',
                                                'y': '1200'
                                            },
                                            'data': {},
                                            'lastSeenTurn': '1'
                                        },
                                        {
                                            'objType': 3,
                                            'name': 'tundra',
                                            '_id': '53837d49976fed3b240006d1',
                                            'coord': {
                                                'x': '0',
                                                'y': '1440'
                                            },
                                            'data': {},
                                            'lastSeenTurn': '1'
                                        },
                                        {
                                            'objType': 2,
                                            'name': 'forest',
                                            '_id': '53837d49976fed3b240006d6',
                                            'coord': {
                                                'x': '48',
                                                'y': '72'
                                            },
                                            'data': {},
                                            'lastSeenTurn': '1'
                                        },
                                        {
                                            'objType': 2,
                                            'name': 'forest',
                                            '_id': '53837d49976fed3b240006b4',
                                            'coord': {
                                                'x': '0',
                                                'y': '48'
                                            },
                                            'data': {},
                                            'lastSeenTurn': '1'
                                        },
                                        {
                                            'objType': 5,
                                            'name': 'swamp',
                                            '_id': '53837d49976fed3b240006b9',
                                            'coord': {
                                                'x': '0',
                                                'y': '288'
                                            },
                                            'data': {},
                                            'lastSeenTurn': '1'
                                        },
                                        {
                                            'objType': 3,
                                            'name': 'tundra',
                                            '_id': '53837d49976fed3b240006be',
                                            'coord': {
                                                'x': '0',
                                                'y': '528'
                                            },
                                            'data': {},
                                            'lastSeenTurn': '1'
                                        },
                                        {
                                            'objType': 2,
                                            'name': 'forest',
                                            '_id': '53837d49976fed3b240006c3',
                                            'coord': {
                                                'x': '0',
                                                'y': '768'
                                            },
                                            'data': {},
                                            'lastSeenTurn': '1'
                                        },
                                        {
                                            'objType': 3,
                                            'name': 'tundra',
                                            '_id': '53837d49976fed3b240006c8',
                                            'coord': {
                                                'x': '0',
                                                'y': '1008'
                                            },
                                            'data': {},
                                            'lastSeenTurn': '1'
                                        },
                                        {
                                            'objType': 2,
                                            'name': 'forest',
                                            '_id': '53837d49976fed3b240006cd',
                                            'coord': {
                                                'x': '0',
                                                'y': '1248'
                                            },
                                            'data': {}
                                        }
                                    ]
                                }]
                        },
                        {
                            'type': 'Map_layer',
                            'coord': {
                                'x': '0',
                                'y': '0'
                            },
                            'name': 'unitLayer',
                            'options': { 'cache': 'false' },
                            'objectGroups': [{
                                    'type': 'Object_unit',
                                    'name': 'Unit',
                                    'typeImageData': 'unit',
                                    'objects': [{
                                            'objType': 2,
                                            'name': 'Horsey the wild',
                                            'coord': {
                                                'x': '60',
                                                'y': '60'
                                            },
                                            'data': { 'someCustomData': 'true' },
                                            'lastSeenTurn': '1'
                                        }]
                                }]
                        }
                    ]
                }]
        };
    return {
        get mapData() {
            return mapData;
        },
        __esModule: true
    };
});
/*public/components/preloading/preloading*/
define('public/components/preloading/preloading', [], function () {
    'use strict';
    'use strict';
    var preload = function preload() {
        var $__3;
        for (var args = [], $__1 = 0; $__1 < arguments.length; $__1++)
            args[$__1] = arguments[$__1];
        ($__3 = $traceurRuntime.superConstructor($preload)).call.apply($__3, $traceurRuntime.spread([this], args));
    };
    var $preload = preload;
    $traceurRuntime.createClass(preload, {
        resolveOnComplete: function () {
            var bindedOnComplete = _onComplete.bind(this);
            var promise = new Promise(bindedOnComplete);
            return promise;
            function _onComplete(resolve) {
                this.on('complete', function () {
                    resolve(true);
                });
            }
        },
        loadManifest: function () {
            var $__3;
            for (var args = [], $__2 = 0; $__2 < arguments.length; $__2++)
                args[$__2] = arguments[$__2];
            ($__3 = $traceurRuntime.superGet(this, $preload.prototype, 'loadManifest')).call.apply($__3, $traceurRuntime.spread([this], args));
            return this;
        },
        setErrorHandler: function (errorCB) {
            this.on('error', errorCB);
            return this;
        },
        setProgressHandler: function (progressCB) {
            this.on('error', progressCB);
            return this;
        },
        activateSound: function () {
            this.installPlugin(createjs.Sound);
        }
    }, {}, createjs.LoadQueue);
    return {
        get preload() {
            return preload;
        },
        __esModule: true
    };
});
/*public/components/map/move/map_move*/
define('public/components/map/move/map_move', [], function () {
    'use strict';
    'use strict';
    var map_move = function map_move() {
            var scope = {};
            var offsetCoords = _offsetCoords();
            scope._startDragListener = _startDragListener;
            scope.pluginName = 'map_move';
            scope.init = function (mapObj) {
                var topMostStage = mapObj.stages.slice(-1)[0];
                _createPrototypes(mapObj);
                topMostStage.on('stagemousedown', _startDragListener(topMostStage, mapObj));
            };
            return scope;
            function _startDragListener(topMostStage, map) {
                return function startDrag(e) {
                    try {
                        offsetCoords.setOffset({
                            x: e.stageX,
                            y: e.stageY
                        });
                        var moveListeners = [];
                        moveListeners.push({
                            'action': 'stagemousemove',
                            'cb': topMostStage.on('stagemousemove', _dragListener.call(topMostStage, map))
                        });
                        moveListeners.push({
                            'action': 'stagemousemove',
                            'cb': topMostStage.on('stagemousemove', function () {
                                console.log('moved');
                            })
                        });
                        moveListeners.push({
                            'action': 'stagemouseup',
                            'cb': topMostStage.on('stagemouseup', function () {
                                moveListeners.forEach(function (cbData) {
                                    topMostStage.off(cbData.action, cbData.cb);
                                });
                            })
                        });
                    } catch (e) {
                        console.log(e);
                    }
                };
            }
            function _dragListener(map) {
                try {
                    return function dragger(e) {
                        var offset = offsetCoords.getOffset();
                        var moved = {
                                x: e.stageX - offset.x,
                                y: e.stageY - offset.y
                            };
                        map.moveMap(moved);
                        offsetCoords.setOffset({
                            x: e.stageX,
                            y: e.stageY
                        });
                    };
                } catch (e) {
                    console.log(e);
                }
            }
            function _createPrototypes(mapObj) {
                if (mapObj.stages && mapObj.stages[0]) {
                    mapObj.stages[0].addPrototype('moveStage', _moveStage(mapObj));
                }
                mapObj.moveMap = _moveMap;
                function _moveMap(coords) {
                    this.stages.forEach(function (stage) {
                        if (stage.movable) {
                            stage.moveStage(coords);
                        }
                    });
                    return this;
                }
                function _moveStage(map) {
                    return function (coords) {
                        var preciseCoords = {
                                x: this.x + coords.x,
                                y: this.y + coords.y
                            };
                        this.x = preciseCoords.x;
                        this.y = preciseCoords.y;
                        this.drawThisChild = true;
                        map.drawMap();
                        return this;
                    };
                }
            }
            function _offsetCoords() {
                var scope = {};
                var offsetCoords;
                scope.setOffset = function setOffset(coords) {
                    return offsetCoords = coords;
                };
                scope.getOffset = function getOffset() {
                    return offsetCoords;
                };
                return scope;
            }
            ;
        }();
    return {
        get map_move() {
            return map_move;
        },
        __esModule: true
    };
});
/*public/components/map/hexagons/coordinates/Map_coords_horizontalHex*/
define('public/components/map/hexagons/coordinates/Map_coords_horizontalHex', [], function () {
    'use strict';
    'use strict';
    function Map_coords_horizontalHex(radius) {
        this.hexaSize = getHexaSize(radius);
        this.prototype.toHexaCenterCoord = function () {
            var radius = this.hexaSize.radius;
            var halfHexaSize = {
                    x: this.hexaSize.radius,
                    y: this.hexaSize.y * 0.5
                };
            var centerCoords = {};
            var coordinateIndexes;
            coordinateIndexes = setCellByPoint(radius, x, y);
            if (coordinateIndexes.x < 0 && coordinateIndexes.x < 0) {
                throw new Error('click outside of the hexagon area');
            }
            centerCoords = {
                x: Math.round(coordinateIndexes.x * this.hexaSize.x + halfHexaSize.x),
                y: Math.round(coordinateIndexes.y * this.hexaSize.y + halfHexaSize.y)
            };
            return centerCoords;
            function setCellByPoint(radius, x, y) {
                var HEIGHT = radius * Math.sqrt(3);
                var SIDE = radius * 3 / 2;
                var ci = Math.floor(x / SIDE);
                var cx = x - SIDE * ci;
                var ty = y - ci % 2 * HEIGHT / 2;
                var cj = Math.floor(ty / HEIGHT);
                var cy = ty - HEIGHT * cj;
                if (cx > Math.abs(radius / 2 - radius * cy / HEIGHT)) {
                    return {
                        x: ci,
                        y: cj
                    };
                } else {
                    return {
                        x: ci - 1,
                        y: cj + ci % 2 - (cy < HEIGHT / 2 ? 1 : 0)
                    };
                }
            }
        };
        this.prototype.init = function (mapObj) {
            mapObj.toHexaCenterCoord = this.toHexaCenterCoord;
        };
    }
    ;
    function getHexaSize(radius) {
        return {
            radius: radius,
            x: radius * 2,
            y: radius * Math.sqrt(3)
        };
    }
    return {
        get Map_coords_horizontalHex() {
            return Map_coords_horizontalHex;
        },
        __esModule: true
    };
});
/*public/components/map/hexagons/eventListeners/select*/
define('public/components/map/hexagons/eventListeners/select', [], function () {
    'use strict';
    'use strict';
    function setupHexagonClick(map, element, callback) {
        return element.addEventListener('click', function (e) {
            var globalCoords = element.localToGlobal(e.x, e.y);
            var objects, centerCoords;
            centerCoords = map.toHexaCenterCoord(globalCoords.x, globalCoords.y);
            objects = map.getObjectsUnderPoint(map.stages, centerCoords);
            callback(objects);
        });
    }
    return {
        get setupHexagonClick() {
            return setupHexagonClick;
        },
        __esModule: true
    };
});
/*public/components/map/hexagons/object_select/object_select_hexagon*/
define('public/components/map/hexagons/object_select/object_select_hexagon', [
    '../coordinates/Map_coords_horizontalHex',
    '../eventListeners/select'
], function ($__0, $__2) {
    'use strict';
    if (!$__0 || !$__0.__esModule)
        $__0 = { default: $__0 };
    if (!$__2 || !$__2.__esModule)
        $__2 = { default: $__2 };
    'use strict';
    var Map_coords_horizontalHex = $__0.Map_coords_horizontalHex;
    var setupHexagonClick = $__2.setupHexagonClick;
    var object_select_hexagon = function object_select_hexagon(hexRadius) {
        var scope = {};
        var hexCoordsModule = Map_coords_horizontalHex(hexRadius);
        scope.pluginName = 'object_select';
        scope.init = function (mapObj) {
            var topMostStage = mapObj.stages.slice(-1)[0];
            _createPrototypes(mapObj);
            _startClickListener(mapObj, topMostStage);
        };
        return scope;
        function getCenterCoords() {
            var bounds = this.getBounds();
            var centerCoords = {};
            if (bounds.x === 0 && bounds.y === 0) {
                bounds = this.getFrameBounds();
            }
            centerCoords.x = bounds.width / 2 + bounds.x;
            centerCoords.x = bounds.height / 2 + bounds.y;
            return centerCoords;
        }
        function getObjectsForMap(clickCoords) {
            this.stages.forEach(function (stage) {
                stage.getObjectsUnderPoint(clickCoords);
            });
        }
        function getObjectsForStage(clickCoords) {
            this.children.forEach(function (layer) {
                layer.getObjectsUnderPoint(clickCoords);
            });
        }
        function getObjectsForLayer(clickCoords) {
            this.children.forEach(function (child) {
                child.getCenterCoords();
                child.getObjectsUnderPoint(clickCoords);
            });
        }
        function _createPrototypes(map) {
            map.prototype.getObjectsUnderPoint = getObjectsForMap;
            map.stages[0].prototype.getObjectsUnderPoint = getObjectsForStage;
            map.stages[0].layers[0].prototype.getObjectsUnderPoint = getObjectsForLayer;
            map.stages[0].layers[0].prototype.getCenterCoords = getCenterCoords;
        }
        function _startClickListener(map, canvas) {
            return setupHexagonClick(map, canvas, showSelectionChoices);
        }
        function _getObjects(clickCoords) {
            var hexaCenterCoords, mapStage;
            this.stages.forEach(function (stage) {
                if (stage.constructor.name === 'Map_stage') {
                    hexaCenterCoords = hexCoordsModule.toHexaCenterCoord(clickCoords.x, clickCoords.y);
                    mapStage = stage;
                    return stage.getObjectsUnderPoint(hexaCenterCoords.x, hexaCenterCoords.y, 0);
                }
            });
            if (!hexaCenterCoords) {
                throw new Error('no center coordinates for hexagon found');
            }
            return mapStage.getObjectsUnderPoint(hexaCenterCoords.x, hexaCenterCoords.y, 0);
        }
        function showSelectionChoices(objects) {
            if (objects && objects.length > 1) {
                alert('You have objects to choose from:' + objects.length);
                console.log(objects);
            } else {
                alert('You just selected an object');
                console.log(objects[0]);
            }
        }
    };
    return {
        get object_select_hexagon() {
            return object_select_hexagon;
        },
        __esModule: true
    };
});
/*public/tests/es6/map-spec.es6*/
define('public/tests/es6/map-spec.es6', [
    '../../components/factories/MapFactory',
    '../../tests/data/gameData',
    '../../tests/data/typeData',
    '../../tests/data/mapData',
    '../../components/preloading/preloading',
    '../../components/map/move/map_move',
    '../../components/map/hexagons/object_select/object_select_hexagon'
], function ($__0, $__2, $__4, $__6, $__8, $__10, $__12) {
    'use strict';
    if (!$__0 || !$__0.__esModule)
        $__0 = { default: $__0 };
    if (!$__2 || !$__2.__esModule)
        $__2 = { default: $__2 };
    if (!$__4 || !$__4.__esModule)
        $__4 = { default: $__4 };
    if (!$__6 || !$__6.__esModule)
        $__6 = { default: $__6 };
    if (!$__8 || !$__8.__esModule)
        $__8 = { default: $__8 };
    if (!$__10 || !$__10.__esModule)
        $__10 = { default: $__10 };
    if (!$__12 || !$__12.__esModule)
        $__12 = { default: $__12 };
    'use strict';
    var createMap = $__0.createMap;
    var gameData = $__2.gameData;
    var typeData = $__4.typeData;
    var mapData = $__6.mapData;
    var preload = $__8.preload;
    var map_move = $__10.map_move;
    var object_select_hexagon = $__12.object_select_hexagon;
    window.testMap = function () {
        describe('preloader => ', function (done) {
            var runWhenComplete = false;
            it('=> exists', function () {
                expect(preload).toBeDefined();
            });
            it('=> preloader completes', function (done) {
                runWhenComplete = function () {
                    var i = 0;
                    while (i < 1000000) {
                        i++;
                        i + i + 2 + 'y';
                    }
                    expect(true).toBeTruthy();
                    done();
                };
                var prel = new preload(false);
                prel.setErrorHandler(preloadErrorHandler);
                prel.loadManifest([{
                        id: 'terrain_spritesheet',
                        src: 'http://warmapengine.level7.fi/assets/img/map/collection.png'
                    }]);
                prel.resolveOnComplete().then(runWhenComplete);
            });
            function preloadErrorHandler(err) {
                console.log('PRELOADER ERROR', err);
            }
            var map;
            it('=> exists', function (done) {
                map = createMap(gameData, mapData, typeData);
                expect(map).toBeDefined();
                done();
            });
            it('=> stage properties are correct', function () {
                expect(map.stages[0].name === 'terrainStage').toBeTruthy();
                expect(map.stages[0].children.length > 0).toBeTruthy();
                expect(map.getChildNamed('terrainStage').name === 'terrainStage').toBeTruthy();
                expect(typeof map.getChildNamed('terrainStage') === 'object').toBeTruthy();
            });
            it('=> layer properties are correct', function () {
                expect(typeof map.getLayerNamed('unitLayer') === 'object').toBeTruthy();
                expect(map.stages[0].children.length > 0).toBeTruthy();
            });
            it('=> terrain properties are correct', function () {
                expect(Number(map.getLayerNamed('terrainBaseLayer').children[1].y) === 480).toBeTruthy();
                expect(map.getLayerNamed('terrainBaseLayer').children.length > 1).toBeTruthy();
            });
            it('=> unit properties are correct', function () {
                expect(Number(map.getLayerNamed('unitLayer').children[0].x) === 60).toBeTruthy();
            });
            it('=> unit properties are correct', function (done) {
                map.init(tickDoneFunc);
                function tickDoneFunc(tickDone) {
                    done();
                }
                expect(true).toBeTruthy();
            });
            it('jeje', function (done) {
                var timeoutter = function (map) {
                        return function () {
                            map.stages[0].drawThisChild = true;
                            map.drawMap();
                            done();
                        };
                    }(map);
                window.setTimeout(timeoutter, 400);
                expect(true).toBeTruthy();
            });
            it('=> exists', function (done) {
                map = createMap(gameData, mapData, typeData);
                expect(map).toBeDefined();
                done();
            });
            it('=> unit properties are correct', function (done) {
                try {
                    var tickDoneFunc = function (tickDone) {
                        done();
                    };
                    map.init(tickDoneFunc, [
                        map_move,
                        object_select_hexagon
                    ]);
                    expect(true).toBeTruthy();
                } catch (e) {
                    console.log('ERROR', e);
                }
            });
        });
    };
    return {};
});
/*[import-main-module]*/
System.import('package.json!npm').then(function() {
System.import('public/tests/es6/map-spec.es6'); 
});