(function(k,f,u){"object"===typeof exports?exports=f(exports,"undefined"!==typeof window?window:"undefined"!==typeof global?global:{}):"function"===typeof define?define(function(){return f({},k)}):k.Keys=f(k.Keys,window)})(this,function(k,f,u){function v(){for(var a=Array.prototype.slice.call(arguments),b=0;b<a.length;b++)if(null!==a[b]&&"undefined"===typeof a[b])return!1;return!0}function w(a,b,d){(!d||k.debug)&&a.slice().forEach(function(a){b.call(null,a)});return a}function x(a){var b=Array.prototype.slice.call(arguments,
1);return a.map(function(a,e){for(var c=[],h=0;h<b.length;h++){var g=b[h]&&b[h][e];c.push(null!==g&&"undefined"!==typeof g?g:null)}return[a].concat(c)})}function m(a,b){for(var d=0;d<a.length;d++)if(b(a[d]))return a[d];return null}function c(a,b){this.name=a;this.code=b;c.internals.keymap[a]=c.internals.keymap[a]||b}function g(a,b){function d(a,b){return null!==m(a,function(a){return b.eq(a)})}var e=null;if(2===arguments.length&&b instanceof Array)e=b;else if(2<=arguments.length)e=Array.prototype.slice.call(arguments,
1);else{if(1===arguments.length){this.key=a;this.ctrl=a.eq(c.CTRL);this.shift=a.eq(c.SHIFT);this.alt=a.eq(c.ALT);this.meta=a.eq(c.META)||a.eq(c.META_RIGHT);return}throw Error("Combo: Invalid number of arguments provided.");}if(m(e,function(a){switch(a.code){case c.CTRL.code:case c.SHIFT.code:case c.ALT.code:case c.META.code:case c.META_RIGHT.code:return!1;default:return!0}}))throw Error("Combo: Attempted to create a Combo with multiple non-meta Keys. This is not supported.");this.key=a;this.ctrl=
d(e,c.CTRL)||a.eq(c.CTRL);this.shift=d(e,c.SHIFT)||a.eq(c.SHIFT);this.alt=d(e,c.ALT)||a.eq(c.ALT);this.meta=(this.meta=d(e,c.META)||d(e,c.META_RIGHT))||a.eq(c.META)||a.eq(c.META_RIGHT)}function q(a){if(!a||!(a instanceof Array))a=[!1,!1,!1,!1];return x(c.metaKeys,a).filter(function(a){return!0===a[1]}).map(function(a){return a[0]})}function l(){this.bindings=[];this.handlers=[];this.enable()}k=k||{};k.debug=!1;Function.prototype.bind||(Function.prototype.bind=function(a){var b=this;return function(){var d=
Array.prototype.slice.call(arguments);return b.apply(a,d)}});var t=Function.prototype.bind;Array.prototype.forEach||(Array.prototype.forEach=function(a,b){if(!this)throw Error("forEach: Array is null or undefined.");if("function"!==typeof a)throw Error("forEach: Iterator is not callable.");var d=this.length>>>0,e=0;for(b=b||null;e<d;)Object.prototype.hasOwnProperty.call(this,e)&&a.call(b,this[e],e,this),e++});Array.prototype.map||(Array.prototype.map=function(a){var b=[];this.forEach(function(d,e,
c){b.push(a.call(null,d,e,c))});return b});Array.prototype.filter||(Array.prototype.filter=function(a,b){if("function"!==typeof a)throw Error("Predicate is not callable.");var d=[];this.forEach(function(e,c,h){a.call(b,e,c,h)&&d.push(e)});return d});Array.prototype.indexOf||(Array.prototype.indexOf=function(a){if(null===this)throw new TypeError;var b=Object(this),d=b.length>>>0;if(0===d)return-1;var e=0;0<arguments.length&&(e=Number(arguments[1]),e!=e?e=0:0!==e&&(Infinity!=e&&-Infinity!=e)&&(e=(0<
e||-1)*Math.floor(Math.abs(e))));if(e>=d)return-1;for(e=0<=e?e:Math.max(d-Math.abs(e),0);e<d;e++)if(e in b&&b[e]===a)return e;return-1});var n=function(){var a=console?t.call(console.log,console):Function.prototype.valueOf();return function(){if(k.debug){var b=Array.prototype.slice.call(arguments);a.apply(null,b)}}}(),p=function(){var a=console?t.call(console.warn,console):Function.prototype.valueOf();return function(){var b=Array.prototype.slice.call(arguments);a.apply(null,b)}}();c.internals={};
c.internals.keymap={A:65,B:66,C:67,D:68,E:69,F:70,G:71,H:72,I:73,J:74,K:75,L:76,M:77,N:78,O:79,P:80,Q:81,R:82,S:83,T:84,U:85,V:86,W:87,X:88,Y:89,Z:90,0:48,1:49,2:50,3:51,4:52,5:53,6:54,7:55,8:56,9:57,"Numpad 0":96,"Numpad 1":97,"Numpad 2":98,"Numpad 3":99,"Numpad 4":100,"Numpad 5":101,"Numpad 6":102,"Numpad 7":103,"Numpad 8":104,"Numpad 9":105,Multiply:106,Add:107,Subtract:109,Decimal:110,Divide:111,F1:112,F2:113,F3:114,F4:115,F5:116,F6:117,F7:118,F8:119,F9:120,F11:122,F12:123,F13:124,F14:125,F15:126,
Backspace:8,Tab:9,Enter:13,SHIFT:16,CTRL:17,ALT:18,META:91,META_RIGHT:93,"Caps Lock":20,Esc:27,Spacebar:32,"Page Up":33,"Page Down":34,End:35,Home:36,Left:37,Up:38,Right:39,Down:40,Insert:45,Delete:46,"Num Lock":144,ScrLk:145,"Pause/Break":19,"; :":186,"= +":187,",":188,"- _":189,".":190,"/ ?":191,"` ~":192,"[ {":219,"\\ |":220,"] }":221,"\" '":222};for(var s in c.internals.keymap)c[s]=new c(s,c.internals.keymap[s]);c.metaKeys=[c.CTRL,c.ALT,c.SHIFT,c.META];c.fromName=function(a){var b=c[a];if(b&&
b instanceof c)return b;for(var d in c.internals.keymap)if(d.toLowerCase()===a.toLowerCase())return c[d]instanceof c?c[d]:null;return null};c.fromCode=function(a){for(var b in c.internals.keymap)if(c.internals.keymap[b]===a)return c[b];return null};c.fromEvent=function(a){return c.fromCode(a.which)};c.prototype.isPressed=function(a){return this.code===a};c.prototype.isMeta=function(){switch(this.code){case c.CTRL.code:case c.SHIFT.code:case c.ALT.code:case c.META.code:case c.META_RIGHT.code:return!0;
default:return!1}};c.prototype.eq=function(a){return this.code===a.code&&this.name===a.name};k.Key=c;g.prototype.toString=function(){var a=(this.ctrl?"CTRL+":"")+(this.alt?"ALT+":"")+(this.shift?"SHIFT+":"")+(this.meta?"META+":"");if(this.key.isMeta()){var b;b=a.length-1===a.lastIndexOf("+")?!0:!1;return b?a.slice(0,a.length-1):a}return a+(this.key&&this.key.name?this.key.name:"")};g.prototype.serialize=function(){if("undefined"===typeof JSON)throw Error("Your browser does not currently support JSON serialization.");
return JSON.stringify(this)};g.deserialize=function(a){if("undefined"===typeof JSON)throw Error("Your browser does not currently support JSON deserialization.");if(!a)return null;a=JSON.parse(a);return g.fromObject(a)};g.prototype.clone=function(){return g.fromObject({key:this.key,ctrl:this.ctrl,alt:this.alt,shift:this.shift,meta:this.meta})};g.fromObject=function(a){if(!a||!a.key||!a.key.name||!a.key.code)throw Error("Combo.fromObject: Invalid Combo object provided.");var b=new c(a.key.name,a.key.code);
a=q([a.ctrl,a.alt,a.shift,a.meta]);return a.length?new g(b,a):new g(b)};g.fromEvent=function(a){if(!a||!a.which&&!a.keyCode)return null;var b=c.fromCode(a.which||a.keyCode);if(!b)return null;a=q([a.ctrlKey,a.altKey,a.shiftKey,a.metaKey]);return a.length?new g(b,a):new g(b)};g.fromString=function(a){var b=a.split("+").filter(function(a){return!a?!1:!0});a=c.fromName(b.length?b[b.length-1]:b[0]);if(b.length){if(1<b.length){var d=-1<b.indexOf("CTRL"),e=-1<b.indexOf("ALT"),r=-1<b.indexOf("SHIFT"),b=-1<
b.indexOf("META")||-1<b.indexOf("META_RIGHT"),d=q([d,e,r,b]);if(a&&d.length)return new g(a,d);throw Error("Combo.fromString: Invalid Combo string, more than one non-meta key was specified.");}if(a)return new g(a)}throw Error("Combo.fromString: Invalid Combo string.");};g.prototype.eq=function(a){return!a||!(a instanceof g)?!1:this.key.eq(a.key)?this.shift!==a.shift?!1:this.alt!==a.alt?!1:this.ctrl!==a.ctrl?!1:this.meta!==a.meta?!1:!0:!1};g.prototype.isMatch=function(a){if(!a&&!(a instanceof g))throw Error("Combo.isMatch called with an invalid Combo object.");
if(this.key.isMeta()){if((this.shift||this.key.eq(c.SHIFT))!==a.shift||(this.alt||this.key.eq(c.ALT))!==a.alt||(this.ctrl||this.key.eq(c.CTRL))!==a.ctrl||(this.meta||this.key.eq(c.META)||this.key.eq(c.META_RIGHT))!==a.meta)return!1}else return this.eq(a);return!0};g.prototype.metaKeys=function(){var a=[this.ctrl||this.key.eq(c.CTRL),this.alt||this.key.eq(c.ALT),this.shift||this.key.eq(c.SHIFT),this.meta||this.key.eq(c.META)||this.key.eq(c.META_RIGHT)];return q(a)};k.Combo=g;l.prototype.onInputEvent=
function(a){function b(b){var d;if(d=b.eventType===a.type){if(!(b=b.isGlobal))a.target&&a.target.nodeName?(b=a.target.nodeName.toLowerCase(),b=-1===["input"===b,"textarea"===b,"select"===b].indexOf(!0)):b=!0;d=b}return d}function d(a){n("Bindings.handleEvent called for Combo: "+c.toString()+". Handler `"+a.name+"` was called.")}function e(a){a.handler.call(null)}var c=g.fromEvent(a);if(c){var h=this.getHandlersForCombo(c).filter(b);w(h,d,!0);var f=0<h.length;h.forEach(e);if(f)return a.preventDefault(),
!1}};l.prototype.enable=function(){var a=this,b=Array.prototype.slice.call(arguments);b.length?b.forEach(function(b){b&&"string"===typeof b&&a.bindings.forEach(function(a){a.name===b&&(a.enabled=!0)})}):(b=this.onInputEvent.bind(this),"undefined"!==typeof f.document.addEventListener?(f.document.addEventListener("keydown",b,!1),f.document.addEventListener("keyup",b,!1),f.document.addEventListener("keypress",b,!1)):(f.document.attachEvent("onkeydown",b),f.document.attachEvent("onkeyup",b),f.document.attachEvent("onkeypress",
b)),this.bindings.forEach(function(a){a.enabled=!0}))};l.prototype.disable=function(){var a=this,b=Array.prototype.slice.call(arguments);b.length?b.forEach(function(b){b&&"string"===typeof b&&a.bindings.forEach(function(a){a.name===b&&(a.enabled=!1)})}):(b=this.onInputEvent.bind(this),"undefined"!==typeof f.document.removeEventListener?(f.document.removeEventListener("keydown",b,!1),f.document.removeEventListener("keyup",b,!1),f.document.removeEventListener("keypress",b,!1)):(f.document.detachEvent("onkeydown",
b),f.document.detachEvent("onkeyup",b),f.document.detachEvent("onkeypress",b)),this.bindings.forEach(function(a){a.enabled=!1}))};l.prototype.get=function(a){return m(this.bindings,function(b){return b.name===a})};l.prototype.load=function(a){if(!a||!a.constructor||"Object"!==a.constructor.name)throw Error("Bindings.load: `specs` must be an object.");for(var b in a)if(Object.prototype.hasOwnProperty.call(a,b)){var d="Bindings.load: The specs object provided contains an invalid binding specification `"+
b+"` - ";if(!a[b]||!a[b].constructor||"Object"!==a[b].constructor.name)p(d+"invalid value type.");else{var e=b,r=a[b].description||"",h=a[b].bind,f=a[b].handler,k=a[b].eventType,l=a[b].isGlobal||!1;if(v(h,f)){var m;m=!f||"function"!==typeof f?!1:!0;m?h instanceof Array||h instanceof g||h instanceof c?(d=[e,r].concat(h),this.add.apply(this,d),k?this.registerHandler.call(this,e,k,f,l):this.registerHandler.call(this,e,f,l)):p(d+"bind must be an instance of Array, Combo, or Key"):p(d+"handler must be a function.")}else p(d+
"requires definition of bind or handler.")}}};l.prototype.add=function(a,b){var d=[],e=b&&"string"===typeof b?b:"",d=b&&"string"!==typeof b?Array.prototype.slice.call(arguments,1):Array.prototype.slice.call(arguments,2);if((e?3>arguments.length:2>arguments.length)||!a||!d.length)throw Error("Keybindings.add: Invalid arguments provided");d.forEach(function(a){if(!(a instanceof g||a instanceof c))throw Error("Keybindings.add: `combo` must be an instance of Key or Combo");});var f=m(this.bindings,function(b){return b.name===
a});f?(e&&(f.description=e),f.combos=d,n("Bindings.add: Updated existing binding - `"+a+"` with "+d.length+" combos")):(this.bindings.push({name:a,description:e,combos:d,enabled:!0}),n("Bindings.add: New binding - `"+a+"` with "+d.length+" combos"))};l.prototype.registerHandler=function(a,b,d,c){1===arguments.length&&"function"===typeof a&&(d=a,a=d.name,b="keydown");2===arguments.length&&"function"===typeof a?(d=a,a=d.name,c=b||!1,b="keydown"):2===arguments.length&&"function"===typeof b?"keyup"===
a||"keydown"===a||"keypress"===a?(d=b,b=a,a=d.name):(d=b,b="keydown"):3===arguments.length&&"function"===typeof b&&("keyup"===a||"keydown"===a||"keypress"===a?(c=d||!1,d=b,b=a,a=d.name):(c=d||!1,d=b,b="keydown"));if(!a||!b||!d||"function"!==typeof d)throw Error("Bindings.registerHandler: Invalid arguments provided");if("anonymous"===a)throw Error("Bindings.registerHandler: The function handler provided was anonymous when it needs to be named (in order to infer the binding name)");this.get(a)||p("Bindings.registerHandler: You have registered a handler for `"+
a+"`, but that binding as not yet been added.");this.handlers.push({name:a,eventType:b,handler:d,isGlobal:c||!1});n("Bindings.registerHandler: Handler `"+a+"` "+(c?"globally":"")+" registered for `"+b+"` events.")};l.prototype.registerHandlers=function(a,b){var c=this;if(2<arguments.length||0===arguments.length)throw Error("Bindings.registerHandlers: Bad invocation. Incorrect # of arguments provided.");if(2===arguments.length&&"string"!==typeof b)throw Error("Bindings.registerHandlers: Bad invocation. eventType must be a string (keyup|keydown).");
if(a instanceof Array)a.forEach(function(a){if(!a.name||"anonymous"===a.name)throw Error("Bindings.registerHandlers: Array notation with anonymous functions is not allowed.");b?c.registerHandler(b,a):c.registerHandler(a)});else if("object"===typeof a)for(var e in a)if(a.hasOwnProperty(e)){var f=e,h=a[e];if("function"===typeof h)c.registerHandler(f,h);else if("object"===typeof h){var g=h.eventType||b,k=h.handler,h=h.isGlobal||!1;if(!k||"function"!==typeof k)throw Error("Bindings.registerHandlers: Invalid handler specification, must define the handler property as a function.");
g?c.registerHandler(f,g,k,h):c.registerHandler(f,k,h)}}};l.prototype.registerToggle=function(a,b,c,e){if(3>arguments.length)throw Error("Keybindings.registerToggle: Missing arguments.");this.handlers.push({name:a,eventType:"keydown",isGlobal:e||!1,handler:function(){var a=!1;return function(){var e=Array.prototype.slice.call(arguments);a?(a=!1,c.apply(null,e)):(a=!0,b.apply(null,e))}}()});n("Bindings.registerToggle: Toggle `"+a+"` "+(e?"globally":"")+" registered.")};l.prototype.serialize=function(){if("undefined"===
typeof JSON)throw Error("Your browser does not support JSON serialization.");return JSON.stringify(this)};l.prototype.deserialize=function(a){if("undefined"===typeof JSON)throw Error("Your browser does not support JSON serialization.");a=JSON.parse(a);if(!a||!a.bindings||a instanceof Array)throw Error("Keybindings.deserialize: Unable to deserialize keybindings");this.bindings=a.bindings.map(function(a){a.combos=a.combos.map(function(a){return"undefined"!==typeof a.code?new c(a.name,a.code):g.fromObject(a)});
return a})};l.prototype.getHandlersForCombo=function(a){function b(a,b){for(var c=0;c<a.length;c++)if(b(a[c]))return!0;return!1}var d=this.bindings.filter(function(d){return d.enabled&&b(d.combos,function(b){return b instanceof c?a.key.eq(b):b.isMatch(a)})});return this.handlers.filter(function(a){return m(d,function(b){return b.name===a.name})})};k.Bindings=l;return k});