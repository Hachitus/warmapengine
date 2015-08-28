(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _componentsFactoriesPixi_horizontalHexaFactory = require('../../components/factories/pixi_horizontalHexaFactory');

/* ===== Import plugins ===== */

var _componentsMapCoreMoveMap_drag = require('../../components/map/core/move/map_drag');

var _componentsMapCoreZoomPixi_map_zoom = require('../../components/map/core/zoom/pixi_map_zoom');

var _componentsMapExtensionsHexagonsObject_selectObject_select_hexagon = require('../../components/map/extensions/hexagons/object_select/object_select_hexagon');

/* DATA FILES used for testing */

var _testsDataGameData = require('../../tests/data/gameData');

var _testsDataPixi_typeData = require('../../tests/data/pixi_typeData');

var _testsDataPixi_mapData = require('../../tests/data/pixi_mapData');

//import { preload } from '../../components/preloading/preloading';

var _componentsMapCoreUtilsUtils = require('../../components/map/core/utils/utils');

/* ====== Library imports ====== */

/* ====== Own module imports ====== */
//var Map = require( '../public/components/map/Map');
/* THIS POLYFILL IS NEEDED FOR IE11, maybe Symbol os something missing: http://babeljs.io/docs/usage/polyfill/ */
require('babel/polyfill');

if (typeof Hammer === 'undefined' && _componentsMapCoreUtilsUtils.environmentDetection.isMobile_detectUserAgent()) {
  alert('You seem to be using mobile device, I suggest you use mobile site for tests, since this won\'t work for you');
}

window.initMap = function () {
  var canvasElement = document.getElementById('mapCanvas');
  var map;

  /** @todo MOVE the preloader to it's destined file: preloader. */
  var loader = PIXI.loader;

  loader.add('/assets/img/map/testHexagons/pixi_testHexagonSpritesheet.json');

  loader.once('complete', onComplete);

  loader.load();
  //PIXI.loader.on("progress", loadProgressHandler);

  function onComplete() {
    map = (0, _componentsFactoriesPixi_horizontalHexaFactory.createMap)(canvasElement, { game: _testsDataGameData.gameData, map: _testsDataPixi_mapData.mapData, type: _testsDataPixi_typeData.typeData });
    map.init([_componentsMapCoreZoomPixi_map_zoom.map_zoom, _componentsMapCoreMoveMap_drag.map_drag], { x: 41, y: 47 }, undefined);
  }

  return map;
};

},{"../../components/factories/pixi_horizontalHexaFactory":93,"../../components/map/core/move/map_drag":96,"../../components/map/core/utils/utils":104,"../../components/map/core/zoom/pixi_map_zoom":105,"../../components/map/extensions/hexagons/object_select/object_select_hexagon":110,"../../tests/data/gameData":113,"../../tests/data/pixi_mapData":114,"../../tests/data/pixi_typeData":115,"babel/polyfill":92}],2:[function(require,module,exports){
(function (global){
"use strict";

require("core-js/shim");

require("regenerator/runtime");

if (global._babelPolyfill) {
  throw new Error("only one instance of babel/polyfill is allowed");
}
global._babelPolyfill = true;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"core-js/shim":89,"regenerator/runtime":90}],3:[function(require,module,exports){
// false -> Array#indexOf
// true  -> Array#includes
var $ = require('./$');
module.exports = function(IS_INCLUDES){
  return function($this, el, fromIndex){
    var O      = $.toObject($this)
      , length = $.toLength(O.length)
      , index  = $.toIndex(fromIndex, length)
      , value;
    if(IS_INCLUDES && el != el)while(length > index){
      value = O[index++];
      if(value != value)return true;
    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
      if(O[index] === el)return IS_INCLUDES || index;
    } return !IS_INCLUDES && -1;
  };
};
},{"./$":23}],4:[function(require,module,exports){
// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var $   = require('./$')
  , ctx = require('./$.ctx');
module.exports = function(TYPE){
  var IS_MAP        = TYPE == 1
    , IS_FILTER     = TYPE == 2
    , IS_SOME       = TYPE == 3
    , IS_EVERY      = TYPE == 4
    , IS_FIND_INDEX = TYPE == 6
    , NO_HOLES      = TYPE == 5 || IS_FIND_INDEX;
  return function($this, callbackfn, that){
    var O      = Object($.assertDefined($this))
      , self   = $.ES5Object(O)
      , f      = ctx(callbackfn, that, 3)
      , length = $.toLength(self.length)
      , index  = 0
      , result = IS_MAP ? Array(length) : IS_FILTER ? [] : undefined
      , val, res;
    for(;length > index; index++)if(NO_HOLES || index in self){
      val = self[index];
      res = f(val, index, O);
      if(TYPE){
        if(IS_MAP)result[index] = res;            // map
        else if(res)switch(TYPE){
          case 3: return true;                    // some
          case 5: return val;                     // find
          case 6: return index;                   // findIndex
          case 2: result.push(val);               // filter
        } else if(IS_EVERY)return false;          // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};
},{"./$":23,"./$.ctx":12}],5:[function(require,module,exports){
var $ = require('./$');
function assert(condition, msg1, msg2){
  if(!condition)throw TypeError(msg2 ? msg1 + msg2 : msg1);
}
assert.def = $.assertDefined;
assert.fn = function(it){
  if(!$.isFunction(it))throw TypeError(it + ' is not a function!');
  return it;
};
assert.obj = function(it){
  if(!$.isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};
assert.inst = function(it, Constructor, name){
  if(!(it instanceof Constructor))throw TypeError(name + ": use the 'new' operator!");
  return it;
};
module.exports = assert;
},{"./$":23}],6:[function(require,module,exports){
var $        = require('./$')
  , enumKeys = require('./$.enum-keys');
// 19.1.2.1 Object.assign(target, source, ...)
/* eslint-disable no-unused-vars */
module.exports = Object.assign || function assign(target, source){
/* eslint-enable no-unused-vars */
  var T = Object($.assertDefined(target))
    , l = arguments.length
    , i = 1;
  while(l > i){
    var S      = $.ES5Object(arguments[i++])
      , keys   = enumKeys(S)
      , length = keys.length
      , j      = 0
      , key;
    while(length > j)T[key = keys[j++]] = S[key];
  }
  return T;
};
},{"./$":23,"./$.enum-keys":15}],7:[function(require,module,exports){
var $        = require('./$')
  , TAG      = require('./$.wks')('toStringTag')
  , toString = {}.toString;
function cof(it){
  return toString.call(it).slice(8, -1);
}
cof.classof = function(it){
  var O, T;
  return it == undefined ? it === undefined ? 'Undefined' : 'Null'
    : typeof (T = (O = Object(it))[TAG]) == 'string' ? T : cof(O);
};
cof.set = function(it, tag, stat){
  if(it && !$.has(it = stat ? it : it.prototype, TAG))$.hide(it, TAG, tag);
};
module.exports = cof;
},{"./$":23,"./$.wks":40}],8:[function(require,module,exports){
'use strict';
var $        = require('./$')
  , ctx      = require('./$.ctx')
  , safe     = require('./$.uid').safe
  , assert   = require('./$.assert')
  , forOf    = require('./$.for-of')
  , step     = require('./$.iter').step
  , has      = $.has
  , set      = $.set
  , isObject = $.isObject
  , hide     = $.hide
  , isExtensible = Object.isExtensible || isObject
  , ID       = safe('id')
  , O1       = safe('O1')
  , LAST     = safe('last')
  , FIRST    = safe('first')
  , ITER     = safe('iter')
  , SIZE     = $.DESC ? safe('size') : 'size'
  , id       = 0;

function fastKey(it, create){
  // return primitive with prefix
  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if(!has(it, ID)){
    // can't set id to frozen object
    if(!isExtensible(it))return 'F';
    // not necessary to add id
    if(!create)return 'E';
    // add missing object id
    hide(it, ID, ++id);
  // return object id with prefix
  } return 'O' + it[ID];
}

function getEntry(that, key){
  // fast case
  var index = fastKey(key), entry;
  if(index !== 'F')return that[O1][index];
  // frozen object case
  for(entry = that[FIRST]; entry; entry = entry.n){
    if(entry.k == key)return entry;
  }
}

module.exports = {
  getConstructor: function(NAME, IS_MAP, ADDER){
    function C(){
      var that     = assert.inst(this, C, NAME)
        , iterable = arguments[0];
      set(that, O1, $.create(null));
      set(that, SIZE, 0);
      set(that, LAST, undefined);
      set(that, FIRST, undefined);
      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
    }
    require('./$.mix')(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear(){
        for(var that = this, data = that[O1], entry = that[FIRST]; entry; entry = entry.n){
          entry.r = true;
          if(entry.p)entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that[FIRST] = that[LAST] = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function(key){
        var that  = this
          , entry = getEntry(that, key);
        if(entry){
          var next = entry.n
            , prev = entry.p;
          delete that[O1][entry.i];
          entry.r = true;
          if(prev)prev.n = next;
          if(next)next.p = prev;
          if(that[FIRST] == entry)that[FIRST] = next;
          if(that[LAST] == entry)that[LAST] = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /*, that = undefined */){
        var f = ctx(callbackfn, arguments[1], 3)
          , entry;
        while(entry = entry ? entry.n : this[FIRST]){
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while(entry && entry.r)entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key){
        return !!getEntry(this, key);
      }
    });
    if($.DESC)$.setDesc(C.prototype, 'size', {
      get: function(){
        return assert.def(this[SIZE]);
      }
    });
    return C;
  },
  def: function(that, key, value){
    var entry = getEntry(that, key)
      , prev, index;
    // change existing entry
    if(entry){
      entry.v = value;
    // create new entry
    } else {
      that[LAST] = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that[LAST],          // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if(!that[FIRST])that[FIRST] = entry;
      if(prev)prev.n = entry;
      that[SIZE]++;
      // add to index
      if(index !== 'F')that[O1][index] = entry;
    } return that;
  },
  getEntry: getEntry,
  // add .keys, .values, .entries, [@@iterator]
  // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
  setIter: function(C, NAME, IS_MAP){
    require('./$.iter-define')(C, NAME, function(iterated, kind){
      set(this, ITER, {o: iterated, k: kind});
    }, function(){
      var iter  = this[ITER]
        , kind  = iter.k
        , entry = iter.l;
      // revert to the last existing entry
      while(entry && entry.r)entry = entry.p;
      // get next entry
      if(!iter.o || !(iter.l = entry = entry ? entry.n : iter.o[FIRST])){
        // or finish the iteration
        iter.o = undefined;
        return step(1);
      }
      // return step by kind
      if(kind == 'keys'  )return step(0, entry.k);
      if(kind == 'values')return step(0, entry.v);
      return step(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values' , !IS_MAP, true);
  }
};
},{"./$":23,"./$.assert":5,"./$.ctx":12,"./$.for-of":16,"./$.iter":22,"./$.iter-define":20,"./$.mix":25,"./$.uid":38}],9:[function(require,module,exports){
// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $def  = require('./$.def')
  , forOf = require('./$.for-of');
module.exports = function(NAME){
  $def($def.P, NAME, {
    toJSON: function toJSON(){
      var arr = [];
      forOf(this, false, arr.push, arr);
      return arr;
    }
  });
};
},{"./$.def":13,"./$.for-of":16}],10:[function(require,module,exports){
'use strict';
var $         = require('./$')
  , safe      = require('./$.uid').safe
  , assert    = require('./$.assert')
  , forOf     = require('./$.for-of')
  , _has      = $.has
  , isObject  = $.isObject
  , hide      = $.hide
  , isExtensible = Object.isExtensible || isObject
  , id        = 0
  , ID        = safe('id')
  , WEAK      = safe('weak')
  , LEAK      = safe('leak')
  , method    = require('./$.array-methods')
  , find      = method(5)
  , findIndex = method(6);
function findFrozen(store, key){
  return find(store.array, function(it){
    return it[0] === key;
  });
}
// fallback for frozen keys
function leakStore(that){
  return that[LEAK] || hide(that, LEAK, {
    array: [],
    get: function(key){
      var entry = findFrozen(this, key);
      if(entry)return entry[1];
    },
    has: function(key){
      return !!findFrozen(this, key);
    },
    set: function(key, value){
      var entry = findFrozen(this, key);
      if(entry)entry[1] = value;
      else this.array.push([key, value]);
    },
    'delete': function(key){
      var index = findIndex(this.array, function(it){
        return it[0] === key;
      });
      if(~index)this.array.splice(index, 1);
      return !!~index;
    }
  })[LEAK];
}

module.exports = {
  getConstructor: function(NAME, IS_MAP, ADDER){
    function C(){
      $.set(assert.inst(this, C, NAME), ID, id++);
      var iterable = arguments[0];
      if(iterable != undefined)forOf(iterable, IS_MAP, this[ADDER], this);
    }
    require('./$.mix')(C.prototype, {
      // 23.3.3.2 WeakMap.prototype.delete(key)
      // 23.4.3.3 WeakSet.prototype.delete(value)
      'delete': function(key){
        if(!isObject(key))return false;
        if(!isExtensible(key))return leakStore(this)['delete'](key);
        return _has(key, WEAK) && _has(key[WEAK], this[ID]) && delete key[WEAK][this[ID]];
      },
      // 23.3.3.4 WeakMap.prototype.has(key)
      // 23.4.3.4 WeakSet.prototype.has(value)
      has: function has(key){
        if(!isObject(key))return false;
        if(!isExtensible(key))return leakStore(this).has(key);
        return _has(key, WEAK) && _has(key[WEAK], this[ID]);
      }
    });
    return C;
  },
  def: function(that, key, value){
    if(!isExtensible(assert.obj(key))){
      leakStore(that).set(key, value);
    } else {
      _has(key, WEAK) || hide(key, WEAK, {});
      key[WEAK][that[ID]] = value;
    } return that;
  },
  leakStore: leakStore,
  WEAK: WEAK,
  ID: ID
};
},{"./$":23,"./$.array-methods":4,"./$.assert":5,"./$.for-of":16,"./$.mix":25,"./$.uid":38}],11:[function(require,module,exports){
'use strict';
var $     = require('./$')
  , $def  = require('./$.def')
  , BUGGY = require('./$.iter').BUGGY
  , forOf = require('./$.for-of')
  , species = require('./$.species')
  , assertInstance = require('./$.assert').inst;

module.exports = function(NAME, methods, common, IS_MAP, IS_WEAK){
  var Base  = $.g[NAME]
    , C     = Base
    , ADDER = IS_MAP ? 'set' : 'add'
    , proto = C && C.prototype
    , O     = {};
  function fixMethod(KEY, CHAIN){
    if($.FW){
      var method = proto[KEY];
      require('./$.redef')(proto, KEY, function(a, b){
        var result = method.call(this, a === 0 ? 0 : a, b);
        return CHAIN ? this : result;
      });
    }
  }
  if(!$.isFunction(C) || !(IS_WEAK || !BUGGY && proto.forEach && proto.entries)){
    // create collection constructor
    C = common.getConstructor(NAME, IS_MAP, ADDER);
    require('./$.mix')(C.prototype, methods);
  } else {
    var inst  = new C
      , chain = inst[ADDER](IS_WEAK ? {} : -0, 1)
      , buggyZero;
    // wrap for init collections from iterable
    if(!require('./$.iter-detect')(function(iter){ new C(iter); })){ // eslint-disable-line no-new
      C = function(){
        assertInstance(this, C, NAME);
        var that     = new Base
          , iterable = arguments[0];
        if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
        return that;
      };
      C.prototype = proto;
      if($.FW)proto.constructor = C;
    }
    IS_WEAK || inst.forEach(function(val, key){
      buggyZero = 1 / key === -Infinity;
    });
    // fix converting -0 key to +0
    if(buggyZero){
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }
    // + fix .add & .set for chaining
    if(buggyZero || chain !== inst)fixMethod(ADDER, true);
  }

  require('./$.cof').set(C, NAME);

  O[NAME] = C;
  $def($def.G + $def.W + $def.F * (C != Base), O);
  species(C);
  species($.core[NAME]); // for wrapper

  if(!IS_WEAK)common.setIter(C, NAME, IS_MAP);

  return C;
};
},{"./$":23,"./$.assert":5,"./$.cof":7,"./$.def":13,"./$.for-of":16,"./$.iter":22,"./$.iter-detect":21,"./$.mix":25,"./$.redef":28,"./$.species":32}],12:[function(require,module,exports){
// Optional / simple context binding
var assertFunction = require('./$.assert').fn;
module.exports = function(fn, that, length){
  assertFunction(fn);
  if(~length && that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  } return function(/* ...args */){
      return fn.apply(that, arguments);
    };
};
},{"./$.assert":5}],13:[function(require,module,exports){
var $          = require('./$')
  , global     = $.g
  , core       = $.core
  , isFunction = $.isFunction
  , $redef     = require('./$.redef');
function ctx(fn, that){
  return function(){
    return fn.apply(that, arguments);
  };
}
global.core = core;
// type bitmap
$def.F = 1;  // forced
$def.G = 2;  // global
$def.S = 4;  // static
$def.P = 8;  // proto
$def.B = 16; // bind
$def.W = 32; // wrap
function $def(type, name, source){
  var key, own, out, exp
    , isGlobal = type & $def.G
    , isProto  = type & $def.P
    , target   = isGlobal ? global : type & $def.S
        ? global[name] : (global[name] || {}).prototype
    , exports  = isGlobal ? core : core[name] || (core[name] = {});
  if(isGlobal)source = name;
  for(key in source){
    // contains in native
    own = !(type & $def.F) && target && key in target;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    if(type & $def.B && own)exp = ctx(out, global);
    else exp = isProto && isFunction(out) ? ctx(Function.call, out) : out;
    // extend global
    if(target && !own)$redef(target, key, out);
    // export
    if(exports[key] != out)$.hide(exports, key, exp);
    if(isProto)(exports.prototype || (exports.prototype = {}))[key] = out;
  }
}
module.exports = $def;
},{"./$":23,"./$.redef":28}],14:[function(require,module,exports){
var $        = require('./$')
  , document = $.g.document
  , isObject = $.isObject
  // in old IE typeof document.createElement is 'object'
  , is = isObject(document) && isObject(document.createElement);
module.exports = function(it){
  return is ? document.createElement(it) : {};
};
},{"./$":23}],15:[function(require,module,exports){
var $ = require('./$');
module.exports = function(it){
  var keys       = $.getKeys(it)
    , getDesc    = $.getDesc
    , getSymbols = $.getSymbols;
  if(getSymbols)$.each.call(getSymbols(it), function(key){
    if(getDesc(it, key).enumerable)keys.push(key);
  });
  return keys;
};
},{"./$":23}],16:[function(require,module,exports){
var ctx  = require('./$.ctx')
  , get  = require('./$.iter').get
  , call = require('./$.iter-call');
module.exports = function(iterable, entries, fn, that){
  var iterator = get(iterable)
    , f        = ctx(fn, that, entries ? 2 : 1)
    , step;
  while(!(step = iterator.next()).done){
    if(call(iterator, f, step.value, entries) === false){
      return call.close(iterator);
    }
  }
};
},{"./$.ctx":12,"./$.iter":22,"./$.iter-call":19}],17:[function(require,module,exports){
module.exports = function($){
  $.FW   = true;
  $.path = $.g;
  return $;
};
},{}],18:[function(require,module,exports){
// Fast apply
// http://jsperf.lnkit.com/fast-apply/5
module.exports = function(fn, args, that){
  var un = that === undefined;
  switch(args.length){
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
    case 5: return un ? fn(args[0], args[1], args[2], args[3], args[4])
                      : fn.call(that, args[0], args[1], args[2], args[3], args[4]);
  } return              fn.apply(that, args);
};
},{}],19:[function(require,module,exports){
var assertObject = require('./$.assert').obj;
function close(iterator){
  var ret = iterator['return'];
  if(ret !== undefined)assertObject(ret.call(iterator));
}
function call(iterator, fn, value, entries){
  try {
    return entries ? fn(assertObject(value)[0], value[1]) : fn(value);
  } catch(e){
    close(iterator);
    throw e;
  }
}
call.close = close;
module.exports = call;
},{"./$.assert":5}],20:[function(require,module,exports){
var $def            = require('./$.def')
  , $redef          = require('./$.redef')
  , $               = require('./$')
  , cof             = require('./$.cof')
  , $iter           = require('./$.iter')
  , SYMBOL_ITERATOR = require('./$.wks')('iterator')
  , FF_ITERATOR     = '@@iterator'
  , KEYS            = 'keys'
  , VALUES          = 'values'
  , Iterators       = $iter.Iterators;
module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCE){
  $iter.create(Constructor, NAME, next);
  function createMethod(kind){
    function $$(that){
      return new Constructor(that, kind);
    }
    switch(kind){
      case KEYS: return function keys(){ return $$(this); };
      case VALUES: return function values(){ return $$(this); };
    } return function entries(){ return $$(this); };
  }
  var TAG      = NAME + ' Iterator'
    , proto    = Base.prototype
    , _native  = proto[SYMBOL_ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
    , _default = _native || createMethod(DEFAULT)
    , methods, key;
  // Fix native
  if(_native){
    var IteratorPrototype = $.getProto(_default.call(new Base));
    // Set @@toStringTag to native iterators
    cof.set(IteratorPrototype, TAG, true);
    // FF fix
    if($.FW && $.has(proto, FF_ITERATOR))$iter.set(IteratorPrototype, $.that);
  }
  // Define iterator
  if($.FW)$iter.set(proto, _default);
  // Plug for library
  Iterators[NAME] = _default;
  Iterators[TAG]  = $.that;
  if(DEFAULT){
    methods = {
      keys:    IS_SET            ? _default : createMethod(KEYS),
      values:  DEFAULT == VALUES ? _default : createMethod(VALUES),
      entries: DEFAULT != VALUES ? _default : createMethod('entries')
    };
    if(FORCE)for(key in methods){
      if(!(key in proto))$redef(proto, key, methods[key]);
    } else $def($def.P + $def.F * $iter.BUGGY, NAME, methods);
  }
};
},{"./$":23,"./$.cof":7,"./$.def":13,"./$.iter":22,"./$.redef":28,"./$.wks":40}],21:[function(require,module,exports){
var SYMBOL_ITERATOR = require('./$.wks')('iterator')
  , SAFE_CLOSING    = false;
try {
  var riter = [7][SYMBOL_ITERATOR]();
  riter['return'] = function(){ SAFE_CLOSING = true; };
  Array.from(riter, function(){ throw 2; });
} catch(e){ /* empty */ }
module.exports = function(exec){
  if(!SAFE_CLOSING)return false;
  var safe = false;
  try {
    var arr  = [7]
      , iter = arr[SYMBOL_ITERATOR]();
    iter.next = function(){ safe = true; };
    arr[SYMBOL_ITERATOR] = function(){ return iter; };
    exec(arr);
  } catch(e){ /* empty */ }
  return safe;
};
},{"./$.wks":40}],22:[function(require,module,exports){
'use strict';
var $                 = require('./$')
  , cof               = require('./$.cof')
  , assertObject      = require('./$.assert').obj
  , SYMBOL_ITERATOR   = require('./$.wks')('iterator')
  , FF_ITERATOR       = '@@iterator'
  , Iterators         = require('./$.shared')('iterators')
  , IteratorPrototype = {};
// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
setIterator(IteratorPrototype, $.that);
function setIterator(O, value){
  $.hide(O, SYMBOL_ITERATOR, value);
  // Add iterator for FF iterator protocol
  if(FF_ITERATOR in [])$.hide(O, FF_ITERATOR, value);
}

module.exports = {
  // Safari has buggy iterators w/o `next`
  BUGGY: 'keys' in [] && !('next' in [].keys()),
  Iterators: Iterators,
  step: function(done, value){
    return {value: value, done: !!done};
  },
  is: function(it){
    var O      = Object(it)
      , Symbol = $.g.Symbol
      , SYM    = Symbol && Symbol.iterator || FF_ITERATOR;
    return SYM in O || SYMBOL_ITERATOR in O || $.has(Iterators, cof.classof(O));
  },
  get: function(it){
    var Symbol  = $.g.Symbol
      , ext     = it[Symbol && Symbol.iterator || FF_ITERATOR]
      , getIter = ext || it[SYMBOL_ITERATOR] || Iterators[cof.classof(it)];
    return assertObject(getIter.call(it));
  },
  set: setIterator,
  create: function(Constructor, NAME, next, proto){
    Constructor.prototype = $.create(proto || IteratorPrototype, {next: $.desc(1, next)});
    cof.set(Constructor, NAME + ' Iterator');
  }
};
},{"./$":23,"./$.assert":5,"./$.cof":7,"./$.shared":31,"./$.wks":40}],23:[function(require,module,exports){
'use strict';
var global = typeof self != 'undefined' ? self : Function('return this')()
  , core   = {}
  , defineProperty = Object.defineProperty
  , hasOwnProperty = {}.hasOwnProperty
  , ceil  = Math.ceil
  , floor = Math.floor
  , max   = Math.max
  , min   = Math.min;
// The engine works fine with descriptors? Thank's IE8 for his funny defineProperty.
var DESC = !!function(){
  try {
    return defineProperty({}, 'a', {get: function(){ return 2; }}).a == 2;
  } catch(e){ /* empty */ }
}();
var hide = createDefiner(1);
// 7.1.4 ToInteger
function toInteger(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
}
function desc(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
}
function simpleSet(object, key, value){
  object[key] = value;
  return object;
}
function createDefiner(bitmap){
  return DESC ? function(object, key, value){
    return $.setDesc(object, key, desc(bitmap, value));
  } : simpleSet;
}

function isObject(it){
  return it !== null && (typeof it == 'object' || typeof it == 'function');
}
function isFunction(it){
  return typeof it == 'function';
}
function assertDefined(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
}

var $ = module.exports = require('./$.fw')({
  g: global,
  core: core,
  html: global.document && document.documentElement,
  // http://jsperf.com/core-js-isobject
  isObject:   isObject,
  isFunction: isFunction,
  that: function(){
    return this;
  },
  // 7.1.4 ToInteger
  toInteger: toInteger,
  // 7.1.15 ToLength
  toLength: function(it){
    return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
  },
  toIndex: function(index, length){
    index = toInteger(index);
    return index < 0 ? max(index + length, 0) : min(index, length);
  },
  has: function(it, key){
    return hasOwnProperty.call(it, key);
  },
  create:     Object.create,
  getProto:   Object.getPrototypeOf,
  DESC:       DESC,
  desc:       desc,
  getDesc:    Object.getOwnPropertyDescriptor,
  setDesc:    defineProperty,
  setDescs:   Object.defineProperties,
  getKeys:    Object.keys,
  getNames:   Object.getOwnPropertyNames,
  getSymbols: Object.getOwnPropertySymbols,
  assertDefined: assertDefined,
  // Dummy, fix for not array-like ES3 string in es5 module
  ES5Object: Object,
  toObject: function(it){
    return $.ES5Object(assertDefined(it));
  },
  hide: hide,
  def: createDefiner(0),
  set: global.Symbol ? simpleSet : hide,
  each: [].forEach
});
/* eslint-disable no-undef */
if(typeof __e != 'undefined')__e = core;
if(typeof __g != 'undefined')__g = global;
},{"./$.fw":17}],24:[function(require,module,exports){
var $ = require('./$');
module.exports = function(object, el){
  var O      = $.toObject(object)
    , keys   = $.getKeys(O)
    , length = keys.length
    , index  = 0
    , key;
  while(length > index)if(O[key = keys[index++]] === el)return key;
};
},{"./$":23}],25:[function(require,module,exports){
var $redef = require('./$.redef');
module.exports = function(target, src){
  for(var key in src)$redef(target, key, src[key]);
  return target;
};
},{"./$.redef":28}],26:[function(require,module,exports){
var $            = require('./$')
  , assertObject = require('./$.assert').obj;
module.exports = function ownKeys(it){
  assertObject(it);
  var keys       = $.getNames(it)
    , getSymbols = $.getSymbols;
  return getSymbols ? keys.concat(getSymbols(it)) : keys;
};
},{"./$":23,"./$.assert":5}],27:[function(require,module,exports){
'use strict';
var $      = require('./$')
  , invoke = require('./$.invoke')
  , assertFunction = require('./$.assert').fn;
module.exports = function(/* ...pargs */){
  var fn     = assertFunction(this)
    , length = arguments.length
    , pargs  = Array(length)
    , i      = 0
    , _      = $.path._
    , holder = false;
  while(length > i)if((pargs[i] = arguments[i++]) === _)holder = true;
  return function(/* ...args */){
    var that    = this
      , _length = arguments.length
      , j = 0, k = 0, args;
    if(!holder && !_length)return invoke(fn, pargs, that);
    args = pargs.slice();
    if(holder)for(;length > j; j++)if(args[j] === _)args[j] = arguments[k++];
    while(_length > k)args.push(arguments[k++]);
    return invoke(fn, args, that);
  };
};
},{"./$":23,"./$.assert":5,"./$.invoke":18}],28:[function(require,module,exports){
var $   = require('./$')
  , tpl = String({}.hasOwnProperty)
  , SRC = require('./$.uid').safe('src')
  , _toString = Function.toString;

function $redef(O, key, val, safe){
  if($.isFunction(val)){
    var base = O[key];
    $.hide(val, SRC, base ? String(base) : tpl.replace(/hasOwnProperty/, String(key)));
  }
  if(O === $.g){
    O[key] = val;
  } else {
    if(!safe)delete O[key];
    $.hide(O, key, val);
  }
}

// add fake Function#toString for correct work wrapped methods / constructors
// with methods similar to LoDash isNative
$redef(Function.prototype, 'toString', function toString(){
  return $.has(this, SRC) ? this[SRC] : _toString.call(this);
});

$.core.inspectSource = function(it){
  return _toString.call(it);
};

module.exports = $redef;
},{"./$":23,"./$.uid":38}],29:[function(require,module,exports){
'use strict';
module.exports = function(regExp, replace, isStatic){
  var replacer = replace === Object(replace) ? function(part){
    return replace[part];
  } : replace;
  return function(it){
    return String(isStatic ? it : this).replace(regExp, replacer);
  };
};
},{}],30:[function(require,module,exports){
// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var $      = require('./$')
  , assert = require('./$.assert');
function check(O, proto){
  assert.obj(O);
  assert(proto === null || $.isObject(proto), proto, ": can't set as prototype!");
}
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} // eslint-disable-line
    ? function(buggy, set){
        try {
          set = require('./$.ctx')(Function.call, $.getDesc(Object.prototype, '__proto__').set, 2);
          set({}, []);
        } catch(e){ buggy = true; }
        return function setPrototypeOf(O, proto){
          check(O, proto);
          if(buggy)O.__proto__ = proto;
          else set(O, proto);
          return O;
        };
      }()
    : undefined),
  check: check
};
},{"./$":23,"./$.assert":5,"./$.ctx":12}],31:[function(require,module,exports){
var $      = require('./$')
  , SHARED = '__core-js_shared__'
  , store  = $.g[SHARED] || $.hide($.g, SHARED, {})[SHARED];
module.exports = function(key){
  return store[key] || (store[key] = {});
};
},{"./$":23}],32:[function(require,module,exports){
var $       = require('./$')
  , SPECIES = require('./$.wks')('species');
module.exports = function(C){
  if($.DESC && !(SPECIES in C))$.setDesc(C, SPECIES, {
    configurable: true,
    get: $.that
  });
};
},{"./$":23,"./$.wks":40}],33:[function(require,module,exports){
// true  -> String#at
// false -> String#codePointAt
var $ = require('./$');
module.exports = function(TO_STRING){
  return function(that, pos){
    var s = String($.assertDefined(that))
      , i = $.toInteger(pos)
      , l = s.length
      , a, b;
    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l
      || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
        ? TO_STRING ? s.charAt(i) : a
        : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};
},{"./$":23}],34:[function(require,module,exports){
// http://wiki.ecmascript.org/doku.php?id=strawman:string_padding
var $      = require('./$')
  , repeat = require('./$.string-repeat');

module.exports = function(that, minLength, fillChar, left){
  // 1. Let O be CheckObjectCoercible(this value).
  // 2. Let S be ToString(O).
  var S = String($.assertDefined(that));
  // 4. If intMinLength is undefined, return S.
  if(minLength === undefined)return S;
  // 4. Let intMinLength be ToInteger(minLength).
  var intMinLength = $.toInteger(minLength);
  // 5. Let fillLen be the number of characters in S minus intMinLength.
  var fillLen = intMinLength - S.length;
  // 6. If fillLen < 0, then throw a RangeError exception.
  // 7. If fillLen is +∞, then throw a RangeError exception.
  if(fillLen < 0 || fillLen === Infinity){
    throw new RangeError('Cannot satisfy string length ' + minLength + ' for string: ' + S);
  }
  // 8. Let sFillStr be the string represented by fillStr.
  // 9. If sFillStr is undefined, let sFillStr be a space character.
  var sFillStr = fillChar === undefined ? ' ' : String(fillChar);
  // 10. Let sFillVal be a String made of sFillStr, repeated until fillLen is met.
  var sFillVal = repeat.call(sFillStr, Math.ceil(fillLen / sFillStr.length));
  // truncate if we overflowed
  if(sFillVal.length > fillLen)sFillVal = left
    ? sFillVal.slice(sFillVal.length - fillLen)
    : sFillVal.slice(0, fillLen);
  // 11. Return a string made from sFillVal, followed by S.
  // 11. Return a String made from S, followed by sFillVal.
  return left ? sFillVal.concat(S) : S.concat(sFillVal);
};
},{"./$":23,"./$.string-repeat":35}],35:[function(require,module,exports){
'use strict';
var $ = require('./$');

module.exports = function repeat(count){
  var str = String($.assertDefined(this))
    , res = ''
    , n   = $.toInteger(count);
  if(n < 0 || n == Infinity)throw RangeError("Count can't be negative");
  for(;n > 0; (n >>>= 1) && (str += str))if(n & 1)res += str;
  return res;
};
},{"./$":23}],36:[function(require,module,exports){
'use strict';
var $      = require('./$')
  , ctx    = require('./$.ctx')
  , cof    = require('./$.cof')
  , invoke = require('./$.invoke')
  , cel    = require('./$.dom-create')
  , global             = $.g
  , isFunction         = $.isFunction
  , html               = $.html
  , process            = global.process
  , setTask            = global.setImmediate
  , clearTask          = global.clearImmediate
  , postMessage        = global.postMessage
  , addEventListener   = global.addEventListener
  , MessageChannel     = global.MessageChannel
  , counter            = 0
  , queue              = {}
  , ONREADYSTATECHANGE = 'onreadystatechange'
  , defer, channel, port;
function run(){
  var id = +this;
  if($.has(queue, id)){
    var fn = queue[id];
    delete queue[id];
    fn();
  }
}
function listner(event){
  run.call(event.data);
}
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if(!isFunction(setTask) || !isFunction(clearTask)){
  setTask = function(fn){
    var args = [], i = 1;
    while(arguments.length > i)args.push(arguments[i++]);
    queue[++counter] = function(){
      invoke(isFunction(fn) ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function(id){
    delete queue[id];
  };
  // Node.js 0.8-
  if(cof(process) == 'process'){
    defer = function(id){
      process.nextTick(ctx(run, id, 1));
    };
  // Modern browsers, skip implementation for WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is object
  } else if(addEventListener && isFunction(postMessage) && !global.importScripts){
    defer = function(id){
      postMessage(id, '*');
    };
    addEventListener('message', listner, false);
  // WebWorkers
  } else if(isFunction(MessageChannel)){
    channel = new MessageChannel;
    port    = channel.port2;
    channel.port1.onmessage = listner;
    defer = ctx(port.postMessage, port, 1);
  // IE8-
  } else if(ONREADYSTATECHANGE in cel('script')){
    defer = function(id){
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function(){
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function(id){
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set:   setTask,
  clear: clearTask
};
},{"./$":23,"./$.cof":7,"./$.ctx":12,"./$.dom-create":14,"./$.invoke":18}],37:[function(require,module,exports){
module.exports = function(exec){
  try {
    exec();
    return false;
  } catch(e){
    return true;
  }
};
},{}],38:[function(require,module,exports){
var sid = 0;
function uid(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++sid + Math.random()).toString(36));
}
uid.safe = require('./$').g.Symbol || uid;
module.exports = uid;
},{"./$":23}],39:[function(require,module,exports){
// 22.1.3.31 Array.prototype[@@unscopables]
var $           = require('./$')
  , UNSCOPABLES = require('./$.wks')('unscopables');
if($.FW && !(UNSCOPABLES in []))$.hide(Array.prototype, UNSCOPABLES, {});
module.exports = function(key){
  if($.FW)[][UNSCOPABLES][key] = true;
};
},{"./$":23,"./$.wks":40}],40:[function(require,module,exports){
var global = require('./$').g
  , store  = require('./$.shared')('wks');
module.exports = function(name){
  return store[name] || (store[name] =
    global.Symbol && global.Symbol[name] || require('./$.uid').safe('Symbol.' + name));
};
},{"./$":23,"./$.shared":31,"./$.uid":38}],41:[function(require,module,exports){
var $                = require('./$')
  , cel              = require('./$.dom-create')
  , cof              = require('./$.cof')
  , $def             = require('./$.def')
  , invoke           = require('./$.invoke')
  , arrayMethod      = require('./$.array-methods')
  , IE_PROTO         = require('./$.uid').safe('__proto__')
  , assert           = require('./$.assert')
  , assertObject     = assert.obj
  , ObjectProto      = Object.prototype
  , html             = $.html
  , A                = []
  , _slice           = A.slice
  , _join            = A.join
  , classof          = cof.classof
  , has              = $.has
  , defineProperty   = $.setDesc
  , getOwnDescriptor = $.getDesc
  , defineProperties = $.setDescs
  , isFunction       = $.isFunction
  , isObject         = $.isObject
  , toObject         = $.toObject
  , toLength         = $.toLength
  , toIndex          = $.toIndex
  , IE8_DOM_DEFINE   = false
  , $indexOf         = require('./$.array-includes')(false)
  , $forEach         = arrayMethod(0)
  , $map             = arrayMethod(1)
  , $filter          = arrayMethod(2)
  , $some            = arrayMethod(3)
  , $every           = arrayMethod(4);

if(!$.DESC){
  try {
    IE8_DOM_DEFINE = defineProperty(cel('div'), 'x',
      {get: function(){ return 8; }}
    ).x == 8;
  } catch(e){ /* empty */ }
  $.setDesc = function(O, P, Attributes){
    if(IE8_DOM_DEFINE)try {
      return defineProperty(O, P, Attributes);
    } catch(e){ /* empty */ }
    if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
    if('value' in Attributes)assertObject(O)[P] = Attributes.value;
    return O;
  };
  $.getDesc = function(O, P){
    if(IE8_DOM_DEFINE)try {
      return getOwnDescriptor(O, P);
    } catch(e){ /* empty */ }
    if(has(O, P))return $.desc(!ObjectProto.propertyIsEnumerable.call(O, P), O[P]);
  };
  $.setDescs = defineProperties = function(O, Properties){
    assertObject(O);
    var keys   = $.getKeys(Properties)
      , length = keys.length
      , i = 0
      , P;
    while(length > i)$.setDesc(O, P = keys[i++], Properties[P]);
    return O;
  };
}
$def($def.S + $def.F * !$.DESC, 'Object', {
  // 19.1.2.6 / 15.2.3.3 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $.getDesc,
  // 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
  defineProperty: $.setDesc,
  // 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
  defineProperties: defineProperties
});

  // IE 8- don't enum bug keys
var keys1 = ('constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,' +
            'toLocaleString,toString,valueOf').split(',')
  // Additional keys for getOwnPropertyNames
  , keys2 = keys1.concat('length', 'prototype')
  , keysLen1 = keys1.length;

// Create object with `null` prototype: use iframe Object with cleared prototype
var createDict = function(){
  // Thrash, waste and sodomy: IE GC bug
  var iframe = cel('iframe')
    , i      = keysLen1
    , gt     = '>'
    , iframeDocument;
  iframe.style.display = 'none';
  html.appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write('<script>document.F=Object</script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while(i--)delete createDict.prototype[keys1[i]];
  return createDict();
};
function createGetKeys(names, length){
  return function(object){
    var O      = toObject(object)
      , i      = 0
      , result = []
      , key;
    for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
    // Don't enum bug & hidden keys
    while(length > i)if(has(O, key = names[i++])){
      ~$indexOf(result, key) || result.push(key);
    }
    return result;
  };
}
function Empty(){}
$def($def.S, 'Object', {
  // 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
  getPrototypeOf: $.getProto = $.getProto || function(O){
    O = Object(assert.def(O));
    if(has(O, IE_PROTO))return O[IE_PROTO];
    if(isFunction(O.constructor) && O instanceof O.constructor){
      return O.constructor.prototype;
    } return O instanceof Object ? ObjectProto : null;
  },
  // 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $.getNames = $.getNames || createGetKeys(keys2, keys2.length, true),
  // 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
  create: $.create = $.create || function(O, /*?*/Properties){
    var result;
    if(O !== null){
      Empty.prototype = assertObject(O);
      result = new Empty();
      Empty.prototype = null;
      // add "__proto__" for Object.getPrototypeOf shim
      result[IE_PROTO] = O;
    } else result = createDict();
    return Properties === undefined ? result : defineProperties(result, Properties);
  },
  // 19.1.2.14 / 15.2.3.14 Object.keys(O)
  keys: $.getKeys = $.getKeys || createGetKeys(keys1, keysLen1, false),
  // 19.1.2.17 / 15.2.3.8 Object.seal(O)
  seal: function seal(it){
    return it; // <- cap
  },
  // 19.1.2.5 / 15.2.3.9 Object.freeze(O)
  freeze: function freeze(it){
    return it; // <- cap
  },
  // 19.1.2.15 / 15.2.3.10 Object.preventExtensions(O)
  preventExtensions: function preventExtensions(it){
    return it; // <- cap
  },
  // 19.1.2.13 / 15.2.3.11 Object.isSealed(O)
  isSealed: function isSealed(it){
    return !isObject(it); // <- cap
  },
  // 19.1.2.12 / 15.2.3.12 Object.isFrozen(O)
  isFrozen: function isFrozen(it){
    return !isObject(it); // <- cap
  },
  // 19.1.2.11 / 15.2.3.13 Object.isExtensible(O)
  isExtensible: function isExtensible(it){
    return isObject(it); // <- cap
  }
});

// 19.2.3.2 / 15.3.4.5 Function.prototype.bind(thisArg, args...)
$def($def.P, 'Function', {
  bind: function(that /*, args... */){
    var fn       = assert.fn(this)
      , partArgs = _slice.call(arguments, 1);
    function bound(/* args... */){
      var args   = partArgs.concat(_slice.call(arguments))
        , constr = this instanceof bound
        , ctx    = constr ? $.create(fn.prototype) : that
        , result = invoke(fn, args, ctx);
      return constr ? ctx : result;
    }
    if(fn.prototype)bound.prototype = fn.prototype;
    return bound;
  }
});

// Fix for not array-like ES3 string and DOM objects
if(!(0 in Object('z') && 'z'[0] == 'z')){
  $.ES5Object = function(it){
    return cof(it) == 'String' ? it.split('') : Object(it);
  };
}

var buggySlice = true;
try {
  if(html)_slice.call(html);
  buggySlice = false;
} catch(e){ /* empty */ }

$def($def.P + $def.F * buggySlice, 'Array', {
  slice: function slice(begin, end){
    var len   = toLength(this.length)
      , klass = cof(this);
    end = end === undefined ? len : end;
    if(klass == 'Array')return _slice.call(this, begin, end);
    var start  = toIndex(begin, len)
      , upTo   = toIndex(end, len)
      , size   = toLength(upTo - start)
      , cloned = Array(size)
      , i      = 0;
    for(; i < size; i++)cloned[i] = klass == 'String'
      ? this.charAt(start + i)
      : this[start + i];
    return cloned;
  }
});

$def($def.P + $def.F * ($.ES5Object != Object), 'Array', {
  join: function join(){
    return _join.apply($.ES5Object(this), arguments);
  }
});

// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)
$def($def.S, 'Array', {
  isArray: function(arg){
    return cof(arg) == 'Array';
  }
});
function createArrayReduce(isRight){
  return function(callbackfn, memo){
    assert.fn(callbackfn);
    var O      = toObject(this)
      , length = toLength(O.length)
      , index  = isRight ? length - 1 : 0
      , i      = isRight ? -1 : 1;
    if(arguments.length < 2)for(;;){
      if(index in O){
        memo = O[index];
        index += i;
        break;
      }
      index += i;
      assert(isRight ? index >= 0 : length > index, 'Reduce of empty array with no initial value');
    }
    for(;isRight ? index >= 0 : length > index; index += i)if(index in O){
      memo = callbackfn(memo, O[index], index, this);
    }
    return memo;
  };
}
$def($def.P, 'Array', {
  // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
  forEach: $.each = $.each || function forEach(callbackfn/*, that = undefined */){
    return $forEach(this, callbackfn, arguments[1]);
  },
  // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
  map: function map(callbackfn/*, that = undefined */){
    return $map(this, callbackfn, arguments[1]);
  },
  // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
  filter: function filter(callbackfn/*, that = undefined */){
    return $filter(this, callbackfn, arguments[1]);
  },
  // 22.1.3.23 / 15.4.4.17 Array.prototype.some(callbackfn [, thisArg])
  some: function some(callbackfn/*, that = undefined */){
    return $some(this, callbackfn, arguments[1]);
  },
  // 22.1.3.5 / 15.4.4.16 Array.prototype.every(callbackfn [, thisArg])
  every: function every(callbackfn/*, that = undefined */){
    return $every(this, callbackfn, arguments[1]);
  },
  // 22.1.3.18 / 15.4.4.21 Array.prototype.reduce(callbackfn [, initialValue])
  reduce: createArrayReduce(false),
  // 22.1.3.19 / 15.4.4.22 Array.prototype.reduceRight(callbackfn [, initialValue])
  reduceRight: createArrayReduce(true),
  // 22.1.3.11 / 15.4.4.14 Array.prototype.indexOf(searchElement [, fromIndex])
  indexOf: function indexOf(el /*, fromIndex = 0 */){
    return $indexOf(this, el, arguments[1]);
  },
  // 22.1.3.14 / 15.4.4.15 Array.prototype.lastIndexOf(searchElement [, fromIndex])
  lastIndexOf: function(el, fromIndex /* = @[*-1] */){
    var O      = toObject(this)
      , length = toLength(O.length)
      , index  = length - 1;
    if(arguments.length > 1)index = Math.min(index, $.toInteger(fromIndex));
    if(index < 0)index = toLength(length + index);
    for(;index >= 0; index--)if(index in O)if(O[index] === el)return index;
    return -1;
  }
});

// 21.1.3.25 / 15.5.4.20 String.prototype.trim()
$def($def.P, 'String', {trim: require('./$.replacer')(/^\s*([\s\S]*\S)?\s*$/, '$1')});

// 20.3.3.1 / 15.9.4.4 Date.now()
$def($def.S, 'Date', {now: function(){
  return +new Date;
}});

function lz(num){
  return num > 9 ? num : '0' + num;
}

// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
// PhantomJS and old webkit had a broken Date implementation.
var date       = new Date(-5e13 - 1)
  , brokenDate = !(date.toISOString && date.toISOString() == '0385-07-25T07:06:39.999Z'
      && require('./$.throws')(function(){ new Date(NaN).toISOString(); }));
$def($def.P + $def.F * brokenDate, 'Date', {toISOString: function(){
  if(!isFinite(this))throw RangeError('Invalid time value');
  var d = this
    , y = d.getUTCFullYear()
    , m = d.getUTCMilliseconds()
    , s = y < 0 ? '-' : y > 9999 ? '+' : '';
  return s + ('00000' + Math.abs(y)).slice(s ? -6 : -4) +
    '-' + lz(d.getUTCMonth() + 1) + '-' + lz(d.getUTCDate()) +
    'T' + lz(d.getUTCHours()) + ':' + lz(d.getUTCMinutes()) +
    ':' + lz(d.getUTCSeconds()) + '.' + (m > 99 ? m : '0' + lz(m)) + 'Z';
}});

if(classof(function(){ return arguments; }()) == 'Object')cof.classof = function(it){
  var tag = classof(it);
  return tag == 'Object' && isFunction(it.callee) ? 'Arguments' : tag;
};
},{"./$":23,"./$.array-includes":3,"./$.array-methods":4,"./$.assert":5,"./$.cof":7,"./$.def":13,"./$.dom-create":14,"./$.invoke":18,"./$.replacer":29,"./$.throws":37,"./$.uid":38}],42:[function(require,module,exports){
'use strict';
var $       = require('./$')
  , $def    = require('./$.def')
  , toIndex = $.toIndex;
$def($def.P, 'Array', {
  // 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
  copyWithin: function copyWithin(target/* = 0 */, start /* = 0, end = @length */){
    var O     = Object($.assertDefined(this))
      , len   = $.toLength(O.length)
      , to    = toIndex(target, len)
      , from  = toIndex(start, len)
      , end   = arguments[2]
      , fin   = end === undefined ? len : toIndex(end, len)
      , count = Math.min(fin - from, len - to)
      , inc   = 1;
    if(from < to && to < from + count){
      inc  = -1;
      from = from + count - 1;
      to   = to   + count - 1;
    }
    while(count-- > 0){
      if(from in O)O[to] = O[from];
      else delete O[to];
      to   += inc;
      from += inc;
    } return O;
  }
});
require('./$.unscope')('copyWithin');
},{"./$":23,"./$.def":13,"./$.unscope":39}],43:[function(require,module,exports){
'use strict';
var $       = require('./$')
  , $def    = require('./$.def')
  , toIndex = $.toIndex;
$def($def.P, 'Array', {
  // 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
  fill: function fill(value /*, start = 0, end = @length */){
    var O      = Object($.assertDefined(this))
      , length = $.toLength(O.length)
      , index  = toIndex(arguments[1], length)
      , end    = arguments[2]
      , endPos = end === undefined ? length : toIndex(end, length);
    while(endPos > index)O[index++] = value;
    return O;
  }
});
require('./$.unscope')('fill');
},{"./$":23,"./$.def":13,"./$.unscope":39}],44:[function(require,module,exports){
'use strict';
// 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)
var KEY    = 'findIndex'
  , $def   = require('./$.def')
  , forced = true
  , $find  = require('./$.array-methods')(6);
// Shouldn't skip holes
if(KEY in [])Array(1)[KEY](function(){ forced = false; });
$def($def.P + $def.F * forced, 'Array', {
  findIndex: function findIndex(callbackfn/*, that = undefined */){
    return $find(this, callbackfn, arguments[1]);
  }
});
require('./$.unscope')(KEY);
},{"./$.array-methods":4,"./$.def":13,"./$.unscope":39}],45:[function(require,module,exports){
'use strict';
// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
var KEY    = 'find'
  , $def   = require('./$.def')
  , forced = true
  , $find  = require('./$.array-methods')(5);
// Shouldn't skip holes
if(KEY in [])Array(1)[KEY](function(){ forced = false; });
$def($def.P + $def.F * forced, 'Array', {
  find: function find(callbackfn/*, that = undefined */){
    return $find(this, callbackfn, arguments[1]);
  }
});
require('./$.unscope')(KEY);
},{"./$.array-methods":4,"./$.def":13,"./$.unscope":39}],46:[function(require,module,exports){
var $     = require('./$')
  , ctx   = require('./$.ctx')
  , $def  = require('./$.def')
  , $iter = require('./$.iter')
  , call  = require('./$.iter-call');
$def($def.S + $def.F * !require('./$.iter-detect')(function(iter){ Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
    var O       = Object($.assertDefined(arrayLike))
      , mapfn   = arguments[1]
      , mapping = mapfn !== undefined
      , f       = mapping ? ctx(mapfn, arguments[2], 2) : undefined
      , index   = 0
      , length, result, step, iterator;
    if($iter.is(O)){
      iterator = $iter.get(O);
      // strange IE quirks mode bug -> use typeof instead of isFunction
      result   = new (typeof this == 'function' ? this : Array);
      for(; !(step = iterator.next()).done; index++){
        result[index] = mapping ? call(iterator, f, [step.value, index], true) : step.value;
      }
    } else {
      // strange IE quirks mode bug -> use typeof instead of isFunction
      result = new (typeof this == 'function' ? this : Array)(length = $.toLength(O.length));
      for(; length > index; index++){
        result[index] = mapping ? f(O[index], index) : O[index];
      }
    }
    result.length = index;
    return result;
  }
});
},{"./$":23,"./$.ctx":12,"./$.def":13,"./$.iter":22,"./$.iter-call":19,"./$.iter-detect":21}],47:[function(require,module,exports){
var $          = require('./$')
  , setUnscope = require('./$.unscope')
  , ITER       = require('./$.uid').safe('iter')
  , $iter      = require('./$.iter')
  , step       = $iter.step
  , Iterators  = $iter.Iterators;

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
require('./$.iter-define')(Array, 'Array', function(iterated, kind){
  $.set(this, ITER, {o: $.toObject(iterated), i: 0, k: kind});
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function(){
  var iter  = this[ITER]
    , O     = iter.o
    , kind  = iter.k
    , index = iter.i++;
  if(!O || index >= O.length){
    iter.o = undefined;
    return step(1);
  }
  if(kind == 'keys'  )return step(0, index);
  if(kind == 'values')return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

setUnscope('keys');
setUnscope('values');
setUnscope('entries');
},{"./$":23,"./$.iter":22,"./$.iter-define":20,"./$.uid":38,"./$.unscope":39}],48:[function(require,module,exports){
var $def = require('./$.def');
$def($def.S, 'Array', {
  // 22.1.2.3 Array.of( ...items)
  of: function of(/* ...args */){
    var index  = 0
      , length = arguments.length
      // strange IE quirks mode bug -> use typeof instead of isFunction
      , result = new (typeof this == 'function' ? this : Array)(length);
    while(length > index)result[index] = arguments[index++];
    result.length = length;
    return result;
  }
});
},{"./$.def":13}],49:[function(require,module,exports){
require('./$.species')(Array);
},{"./$.species":32}],50:[function(require,module,exports){
var $             = require('./$')
  , HAS_INSTANCE  = require('./$.wks')('hasInstance')
  , FunctionProto = Function.prototype;
// 19.2.3.6 Function.prototype[@@hasInstance](V)
if(!(HAS_INSTANCE in FunctionProto))$.setDesc(FunctionProto, HAS_INSTANCE, {value: function(O){
  if(!$.isFunction(this) || !$.isObject(O))return false;
  if(!$.isObject(this.prototype))return O instanceof this;
  // for environment w/o native `@@hasInstance` logic enough `instanceof`, but add this:
  while(O = $.getProto(O))if(this.prototype === O)return true;
  return false;
}});
},{"./$":23,"./$.wks":40}],51:[function(require,module,exports){
'use strict';
var $    = require('./$')
  , NAME = 'name'
  , setDesc = $.setDesc
  , FunctionProto = Function.prototype;
// 19.2.4.2 name
NAME in FunctionProto || $.FW && $.DESC && setDesc(FunctionProto, NAME, {
  configurable: true,
  get: function(){
    var match = String(this).match(/^\s*function ([^ (]*)/)
      , name  = match ? match[1] : '';
    $.has(this, NAME) || setDesc(this, NAME, $.desc(5, name));
    return name;
  },
  set: function(value){
    $.has(this, NAME) || setDesc(this, NAME, $.desc(0, value));
  }
});
},{"./$":23}],52:[function(require,module,exports){
'use strict';
var strong = require('./$.collection-strong');

// 23.1 Map Objects
require('./$.collection')('Map', {
  // 23.1.3.6 Map.prototype.get(key)
  get: function get(key){
    var entry = strong.getEntry(this, key);
    return entry && entry.v;
  },
  // 23.1.3.9 Map.prototype.set(key, value)
  set: function set(key, value){
    return strong.def(this, key === 0 ? 0 : key, value);
  }
}, strong, true);
},{"./$.collection":11,"./$.collection-strong":8}],53:[function(require,module,exports){
var Infinity = 1 / 0
  , $def  = require('./$.def')
  , E     = Math.E
  , pow   = Math.pow
  , abs   = Math.abs
  , exp   = Math.exp
  , log   = Math.log
  , sqrt  = Math.sqrt
  , ceil  = Math.ceil
  , floor = Math.floor
  , EPSILON   = pow(2, -52)
  , EPSILON32 = pow(2, -23)
  , MAX32     = pow(2, 127) * (2 - EPSILON32)
  , MIN32     = pow(2, -126);
function roundTiesToEven(n){
  return n + 1 / EPSILON - 1 / EPSILON;
}

// 20.2.2.28 Math.sign(x)
function sign(x){
  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
}
// 20.2.2.5 Math.asinh(x)
function asinh(x){
  return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : log(x + sqrt(x * x + 1));
}
// 20.2.2.14 Math.expm1(x)
function expm1(x){
  return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : exp(x) - 1;
}

$def($def.S, 'Math', {
  // 20.2.2.3 Math.acosh(x)
  acosh: function acosh(x){
    return (x = +x) < 1 ? NaN : isFinite(x) ? log(x / E + sqrt(x + 1) * sqrt(x - 1) / E) + 1 : x;
  },
  // 20.2.2.5 Math.asinh(x)
  asinh: asinh,
  // 20.2.2.7 Math.atanh(x)
  atanh: function atanh(x){
    return (x = +x) == 0 ? x : log((1 + x) / (1 - x)) / 2;
  },
  // 20.2.2.9 Math.cbrt(x)
  cbrt: function cbrt(x){
    return sign(x = +x) * pow(abs(x), 1 / 3);
  },
  // 20.2.2.11 Math.clz32(x)
  clz32: function clz32(x){
    return (x >>>= 0) ? 31 - floor(log(x + 0.5) * Math.LOG2E) : 32;
  },
  // 20.2.2.12 Math.cosh(x)
  cosh: function cosh(x){
    return (exp(x = +x) + exp(-x)) / 2;
  },
  // 20.2.2.14 Math.expm1(x)
  expm1: expm1,
  // 20.2.2.16 Math.fround(x)
  fround: function fround(x){
    var $abs  = abs(x)
      , $sign = sign(x)
      , a, result;
    if($abs < MIN32)return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
    a = (1 + EPSILON32 / EPSILON) * $abs;
    result = a - (a - $abs);
    if(result > MAX32 || result != result)return $sign * Infinity;
    return $sign * result;
  },
  // 20.2.2.17 Math.hypot([value1[, value2[, … ]]])
  hypot: function hypot(value1, value2){ // eslint-disable-line no-unused-vars
    var sum  = 0
      , i    = 0
      , len  = arguments.length
      , args = Array(len)
      , larg = 0
      , arg;
    while(i < len){
      arg = args[i] = abs(arguments[i++]);
      if(arg == Infinity)return Infinity;
      if(arg > larg)larg = arg;
    }
    larg = larg || 1;
    while(len--)sum += pow(args[len] / larg, 2);
    return larg * sqrt(sum);
  },
  // 20.2.2.18 Math.imul(x, y)
  imul: function imul(x, y){
    var UInt16 = 0xffff
      , xn = +x
      , yn = +y
      , xl = UInt16 & xn
      , yl = UInt16 & yn;
    return 0 | xl * yl + ((UInt16 & xn >>> 16) * yl + xl * (UInt16 & yn >>> 16) << 16 >>> 0);
  },
  // 20.2.2.20 Math.log1p(x)
  log1p: function log1p(x){
    return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : log(1 + x);
  },
  // 20.2.2.21 Math.log10(x)
  log10: function log10(x){
    return log(x) / Math.LN10;
  },
  // 20.2.2.22 Math.log2(x)
  log2: function log2(x){
    return log(x) / Math.LN2;
  },
  // 20.2.2.28 Math.sign(x)
  sign: sign,
  // 20.2.2.30 Math.sinh(x)
  sinh: function sinh(x){
    return abs(x = +x) < 1 ? (expm1(x) - expm1(-x)) / 2 : (exp(x - 1) - exp(-x - 1)) * (E / 2);
  },
  // 20.2.2.33 Math.tanh(x)
  tanh: function tanh(x){
    var a = expm1(x = +x)
      , b = expm1(-x);
    return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
  },
  // 20.2.2.34 Math.trunc(x)
  trunc: function trunc(it){
    return (it > 0 ? floor : ceil)(it);
  }
});
},{"./$.def":13}],54:[function(require,module,exports){
'use strict';
var $          = require('./$')
  , isObject   = $.isObject
  , isFunction = $.isFunction
  , NUMBER     = 'Number'
  , $Number    = $.g[NUMBER]
  , Base       = $Number
  , proto      = $Number.prototype;
function toPrimitive(it){
  var fn, val;
  if(isFunction(fn = it.valueOf) && !isObject(val = fn.call(it)))return val;
  if(isFunction(fn = it.toString) && !isObject(val = fn.call(it)))return val;
  throw TypeError("Can't convert object to number");
}
function toNumber(it){
  if(isObject(it))it = toPrimitive(it);
  if(typeof it == 'string' && it.length > 2 && it.charCodeAt(0) == 48){
    var binary = false;
    switch(it.charCodeAt(1)){
      case 66 : case 98  : binary = true;
      case 79 : case 111 : return parseInt(it.slice(2), binary ? 2 : 8);
    }
  } return +it;
}
if($.FW && !($Number('0o1') && $Number('0b1'))){
  $Number = function Number(it){
    return this instanceof $Number ? new Base(toNumber(it)) : toNumber(it);
  };
  $.each.call($.DESC ? $.getNames(Base) : (
      // ES3:
      'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
      // ES6 (in case, if modules with ES6 Number statics required before):
      'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
      'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
    ).split(','), function(key){
      if($.has(Base, key) && !$.has($Number, key)){
        $.setDesc($Number, key, $.getDesc(Base, key));
      }
    }
  );
  $Number.prototype = proto;
  proto.constructor = $Number;
  require('./$.redef')($.g, NUMBER, $Number);
}
},{"./$":23,"./$.redef":28}],55:[function(require,module,exports){
var $     = require('./$')
  , $def  = require('./$.def')
  , abs   = Math.abs
  , floor = Math.floor
  , _isFinite = $.g.isFinite
  , MAX_SAFE_INTEGER = 0x1fffffffffffff; // pow(2, 53) - 1 == 9007199254740991;
function isInteger(it){
  return !$.isObject(it) && _isFinite(it) && floor(it) === it;
}
$def($def.S, 'Number', {
  // 20.1.2.1 Number.EPSILON
  EPSILON: Math.pow(2, -52),
  // 20.1.2.2 Number.isFinite(number)
  isFinite: function isFinite(it){
    return typeof it == 'number' && _isFinite(it);
  },
  // 20.1.2.3 Number.isInteger(number)
  isInteger: isInteger,
  // 20.1.2.4 Number.isNaN(number)
  isNaN: function isNaN(number){
    return number != number;
  },
  // 20.1.2.5 Number.isSafeInteger(number)
  isSafeInteger: function isSafeInteger(number){
    return isInteger(number) && abs(number) <= MAX_SAFE_INTEGER;
  },
  // 20.1.2.6 Number.MAX_SAFE_INTEGER
  MAX_SAFE_INTEGER: MAX_SAFE_INTEGER,
  // 20.1.2.10 Number.MIN_SAFE_INTEGER
  MIN_SAFE_INTEGER: -MAX_SAFE_INTEGER,
  // 20.1.2.12 Number.parseFloat(string)
  parseFloat: parseFloat,
  // 20.1.2.13 Number.parseInt(string, radix)
  parseInt: parseInt
});
},{"./$":23,"./$.def":13}],56:[function(require,module,exports){
// 19.1.3.1 Object.assign(target, source)
var $def = require('./$.def');
$def($def.S, 'Object', {assign: require('./$.assign')});
},{"./$.assign":6,"./$.def":13}],57:[function(require,module,exports){
// 19.1.3.10 Object.is(value1, value2)
var $def = require('./$.def');
$def($def.S, 'Object', {
  is: function is(x, y){
    return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
  }
});
},{"./$.def":13}],58:[function(require,module,exports){
// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $def = require('./$.def');
$def($def.S, 'Object', {setPrototypeOf: require('./$.set-proto').set});
},{"./$.def":13,"./$.set-proto":30}],59:[function(require,module,exports){
var $        = require('./$')
  , $def     = require('./$.def')
  , isObject = $.isObject
  , toObject = $.toObject;
$.each.call(('freeze,seal,preventExtensions,isFrozen,isSealed,isExtensible,' +
  'getOwnPropertyDescriptor,getPrototypeOf,keys,getOwnPropertyNames').split(',')
, function(KEY, ID){
  var fn     = ($.core.Object || {})[KEY] || Object[KEY]
    , forced = 0
    , method = {};
  method[KEY] = ID == 0 ? function freeze(it){
    return isObject(it) ? fn(it) : it;
  } : ID == 1 ? function seal(it){
    return isObject(it) ? fn(it) : it;
  } : ID == 2 ? function preventExtensions(it){
    return isObject(it) ? fn(it) : it;
  } : ID == 3 ? function isFrozen(it){
    return isObject(it) ? fn(it) : true;
  } : ID == 4 ? function isSealed(it){
    return isObject(it) ? fn(it) : true;
  } : ID == 5 ? function isExtensible(it){
    return isObject(it) ? fn(it) : false;
  } : ID == 6 ? function getOwnPropertyDescriptor(it, key){
    return fn(toObject(it), key);
  } : ID == 7 ? function getPrototypeOf(it){
    return fn(Object($.assertDefined(it)));
  } : ID == 8 ? function keys(it){
    return fn(toObject(it));
  } : function getOwnPropertyNames(it){
    return fn(toObject(it));
  };
  try {
    fn('z');
  } catch(e){
    forced = 1;
  }
  $def($def.S + $def.F * forced, 'Object', method);
});
},{"./$":23,"./$.def":13}],60:[function(require,module,exports){
'use strict';
// 19.1.3.6 Object.prototype.toString()
var cof = require('./$.cof')
  , tmp = {};
tmp[require('./$.wks')('toStringTag')] = 'z';
if(require('./$').FW && cof(tmp) != 'z'){
  require('./$.redef')(Object.prototype, 'toString', function toString(){
    return '[object ' + cof.classof(this) + ']';
  }, true);
}
},{"./$":23,"./$.cof":7,"./$.redef":28,"./$.wks":40}],61:[function(require,module,exports){
'use strict';
var $        = require('./$')
  , ctx      = require('./$.ctx')
  , cof      = require('./$.cof')
  , $def     = require('./$.def')
  , assert   = require('./$.assert')
  , forOf    = require('./$.for-of')
  , setProto = require('./$.set-proto').set
  , species  = require('./$.species')
  , SPECIES  = require('./$.wks')('species')
  , RECORD   = require('./$.uid').safe('record')
  , PROMISE  = 'Promise'
  , global   = $.g
  , process  = global.process
  , asap     = process && process.nextTick || require('./$.task').set
  , P        = global[PROMISE]
  , isFunction     = $.isFunction
  , isObject       = $.isObject
  , assertFunction = assert.fn
  , assertObject   = assert.obj;

var useNative = function(){
  var test, works = false;
  function P2(x){
    var self = new P(x);
    setProto(self, P2.prototype);
    return self;
  }
  try {
    works = isFunction(P) && isFunction(P.resolve) && P.resolve(test = new P(function(){})) == test;
    setProto(P2, P);
    P2.prototype = $.create(P.prototype, {constructor: {value: P2}});
    // actual Firefox has broken subclass support, test that
    if(!(P2.resolve(5).then(function(){}) instanceof P2)){
      works = false;
    }
  } catch(e){ works = false; }
  return works;
}();

// helpers
function getConstructor(C){
  var S = assertObject(C)[SPECIES];
  return S != undefined ? S : C;
}
function isThenable(it){
  var then;
  if(isObject(it))then = it.then;
  return isFunction(then) ? then : false;
}
function notify(record){
  var chain = record.c;
  if(chain.length)asap(function(){
    var value = record.v
      , ok    = record.s == 1
      , i     = 0;
    function run(react){
      var cb = ok ? react.ok : react.fail
        , ret, then;
      try {
        if(cb){
          if(!ok)record.h = true;
          ret = cb === true ? value : cb(value);
          if(ret === react.P){
            react.rej(TypeError('Promise-chain cycle'));
          } else if(then = isThenable(ret)){
            then.call(ret, react.res, react.rej);
          } else react.res(ret);
        } else react.rej(value);
      } catch(err){
        react.rej(err);
      }
    }
    while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
    chain.length = 0;
  });
}
function isUnhandled(promise){
  var record = promise[RECORD]
    , chain  = record.a || record.c
    , i      = 0
    , react;
  if(record.h)return false;
  while(chain.length > i){
    react = chain[i++];
    if(react.fail || !isUnhandled(react.P))return false;
  } return true;
}
function $reject(value){
  var record = this
    , promise;
  if(record.d)return;
  record.d = true;
  record = record.r || record; // unwrap
  record.v = value;
  record.s = 2;
  record.a = record.c.slice();
  setTimeout(function(){
    asap(function(){
      if(isUnhandled(promise = record.p)){
        if(cof(process) == 'process'){
          process.emit('unhandledRejection', value, promise);
        } else if(global.console && isFunction(console.error)){
          console.error('Unhandled promise rejection', value);
        }
      }
      record.a = undefined;
    });
  }, 1);
  notify(record);
}
function $resolve(value){
  var record = this
    , then, wrapper;
  if(record.d)return;
  record.d = true;
  record = record.r || record; // unwrap
  try {
    if(then = isThenable(value)){
      wrapper = {r: record, d: false}; // wrap
      then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
    } else {
      record.v = value;
      record.s = 1;
      notify(record);
    }
  } catch(err){
    $reject.call(wrapper || {r: record, d: false}, err); // wrap
  }
}

// constructor polyfill
if(!useNative){
  // 25.4.3.1 Promise(executor)
  P = function Promise(executor){
    assertFunction(executor);
    var record = {
      p: assert.inst(this, P, PROMISE),       // <- promise
      c: [],                                  // <- awaiting reactions
      a: undefined,                           // <- checked in isUnhandled reactions
      s: 0,                                   // <- state
      d: false,                               // <- done
      v: undefined,                           // <- value
      h: false                                // <- handled rejection
    };
    $.hide(this, RECORD, record);
    try {
      executor(ctx($resolve, record, 1), ctx($reject, record, 1));
    } catch(err){
      $reject.call(record, err);
    }
  };
  require('./$.mix')(P.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected){
      var S = assertObject(assertObject(this).constructor)[SPECIES];
      var react = {
        ok:   isFunction(onFulfilled) ? onFulfilled : true,
        fail: isFunction(onRejected)  ? onRejected  : false
      };
      var promise = react.P = new (S != undefined ? S : P)(function(res, rej){
        react.res = assertFunction(res);
        react.rej = assertFunction(rej);
      });
      var record = this[RECORD];
      record.c.push(react);
      if(record.a)record.a.push(react);
      record.s && notify(record);
      return promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function(onRejected){
      return this.then(undefined, onRejected);
    }
  });
}

// export
$def($def.G + $def.W + $def.F * !useNative, {Promise: P});
cof.set(P, PROMISE);
species(P);
species($.core[PROMISE]); // for wrapper

// statics
$def($def.S + $def.F * !useNative, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r){
    return new (getConstructor(this))(function(res, rej){
      rej(r);
    });
  },
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x){
    return isObject(x) && RECORD in x && $.getProto(x) === this.prototype
      ? x : new (getConstructor(this))(function(res){
        res(x);
      });
  }
});
$def($def.S + $def.F * !(useNative && require('./$.iter-detect')(function(iter){
  P.all(iter)['catch'](function(){});
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable){
    var C      = getConstructor(this)
      , values = [];
    return new C(function(res, rej){
      forOf(iterable, false, values.push, values);
      var remaining = values.length
        , results   = Array(remaining);
      if(remaining)$.each.call(values, function(promise, index){
        C.resolve(promise).then(function(value){
          results[index] = value;
          --remaining || res(results);
        }, rej);
      });
      else res(results);
    });
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable){
    var C = getConstructor(this);
    return new C(function(res, rej){
      forOf(iterable, false, function(promise){
        C.resolve(promise).then(res, rej);
      });
    });
  }
});
},{"./$":23,"./$.assert":5,"./$.cof":7,"./$.ctx":12,"./$.def":13,"./$.for-of":16,"./$.iter-detect":21,"./$.mix":25,"./$.set-proto":30,"./$.species":32,"./$.task":36,"./$.uid":38,"./$.wks":40}],62:[function(require,module,exports){
var $         = require('./$')
  , $def      = require('./$.def')
  , setProto  = require('./$.set-proto')
  , $iter     = require('./$.iter')
  , ITERATOR  = require('./$.wks')('iterator')
  , ITER      = require('./$.uid').safe('iter')
  , step      = $iter.step
  , assert    = require('./$.assert')
  , isObject  = $.isObject
  , getProto  = $.getProto
  , $Reflect  = $.g.Reflect
  , _apply    = Function.apply
  , assertObject = assert.obj
  , _isExtensible = Object.isExtensible || isObject
  , _preventExtensions = Object.preventExtensions
  // IE TP has broken Reflect.enumerate
  , buggyEnumerate = !($Reflect && $Reflect.enumerate && ITERATOR in $Reflect.enumerate({}));

function Enumerate(iterated){
  $.set(this, ITER, {o: iterated, k: undefined, i: 0});
}
$iter.create(Enumerate, 'Object', function(){
  var iter = this[ITER]
    , keys = iter.k
    , key;
  if(keys == undefined){
    iter.k = keys = [];
    for(key in iter.o)keys.push(key);
  }
  do {
    if(iter.i >= keys.length)return step(1);
  } while(!((key = keys[iter.i++]) in iter.o));
  return step(0, key);
});

var reflect = {
  // 26.1.1 Reflect.apply(target, thisArgument, argumentsList)
  apply: function apply(target, thisArgument, argumentsList){
    return _apply.call(target, thisArgument, argumentsList);
  },
  // 26.1.2 Reflect.construct(target, argumentsList [, newTarget])
  construct: function construct(target, argumentsList /*, newTarget*/){
    var proto    = assert.fn(arguments.length < 3 ? target : arguments[2]).prototype
      , instance = $.create(isObject(proto) ? proto : Object.prototype)
      , result   = _apply.call(target, instance, argumentsList);
    return isObject(result) ? result : instance;
  },
  // 26.1.3 Reflect.defineProperty(target, propertyKey, attributes)
  defineProperty: function defineProperty(target, propertyKey, attributes){
    assertObject(target);
    try {
      $.setDesc(target, propertyKey, attributes);
      return true;
    } catch(e){
      return false;
    }
  },
  // 26.1.4 Reflect.deleteProperty(target, propertyKey)
  deleteProperty: function deleteProperty(target, propertyKey){
    var desc = $.getDesc(assertObject(target), propertyKey);
    return desc && !desc.configurable ? false : delete target[propertyKey];
  },
  // 26.1.6 Reflect.get(target, propertyKey [, receiver])
  get: function get(target, propertyKey/*, receiver*/){
    var receiver = arguments.length < 3 ? target : arguments[2]
      , desc = $.getDesc(assertObject(target), propertyKey), proto;
    if(desc)return $.has(desc, 'value')
      ? desc.value
      : desc.get === undefined
        ? undefined
        : desc.get.call(receiver);
    return isObject(proto = getProto(target))
      ? get(proto, propertyKey, receiver)
      : undefined;
  },
  // 26.1.7 Reflect.getOwnPropertyDescriptor(target, propertyKey)
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey){
    return $.getDesc(assertObject(target), propertyKey);
  },
  // 26.1.8 Reflect.getPrototypeOf(target)
  getPrototypeOf: function getPrototypeOf(target){
    return getProto(assertObject(target));
  },
  // 26.1.9 Reflect.has(target, propertyKey)
  has: function has(target, propertyKey){
    return propertyKey in target;
  },
  // 26.1.10 Reflect.isExtensible(target)
  isExtensible: function isExtensible(target){
    return _isExtensible(assertObject(target));
  },
  // 26.1.11 Reflect.ownKeys(target)
  ownKeys: require('./$.own-keys'),
  // 26.1.12 Reflect.preventExtensions(target)
  preventExtensions: function preventExtensions(target){
    assertObject(target);
    try {
      if(_preventExtensions)_preventExtensions(target);
      return true;
    } catch(e){
      return false;
    }
  },
  // 26.1.13 Reflect.set(target, propertyKey, V [, receiver])
  set: function set(target, propertyKey, V/*, receiver*/){
    var receiver = arguments.length < 4 ? target : arguments[3]
      , ownDesc  = $.getDesc(assertObject(target), propertyKey)
      , existingDescriptor, proto;
    if(!ownDesc){
      if(isObject(proto = getProto(target))){
        return set(proto, propertyKey, V, receiver);
      }
      ownDesc = $.desc(0);
    }
    if($.has(ownDesc, 'value')){
      if(ownDesc.writable === false || !isObject(receiver))return false;
      existingDescriptor = $.getDesc(receiver, propertyKey) || $.desc(0);
      existingDescriptor.value = V;
      $.setDesc(receiver, propertyKey, existingDescriptor);
      return true;
    }
    return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
  }
};
// 26.1.14 Reflect.setPrototypeOf(target, proto)
if(setProto)reflect.setPrototypeOf = function setPrototypeOf(target, proto){
  setProto.check(target, proto);
  try {
    setProto.set(target, proto);
    return true;
  } catch(e){
    return false;
  }
};

$def($def.G, {Reflect: {}});

$def($def.S + $def.F * buggyEnumerate, 'Reflect', {
  // 26.1.5 Reflect.enumerate(target)
  enumerate: function enumerate(target){
    return new Enumerate(assertObject(target));
  }
});

$def($def.S, 'Reflect', reflect);
},{"./$":23,"./$.assert":5,"./$.def":13,"./$.iter":22,"./$.own-keys":26,"./$.set-proto":30,"./$.uid":38,"./$.wks":40}],63:[function(require,module,exports){
var $       = require('./$')
  , cof     = require('./$.cof')
  , $RegExp = $.g.RegExp
  , Base    = $RegExp
  , proto   = $RegExp.prototype
  , re      = /a/g
  // "new" creates a new object
  , CORRECT_NEW = new $RegExp(re) !== re
  // RegExp allows a regex with flags as the pattern
  , ALLOWS_RE_WITH_FLAGS = function(){
    try {
      return $RegExp(re, 'i') == '/a/i';
    } catch(e){ /* empty */ }
  }();
if($.FW && $.DESC){
  if(!CORRECT_NEW || !ALLOWS_RE_WITH_FLAGS){
    $RegExp = function RegExp(pattern, flags){
      var patternIsRegExp  = cof(pattern) == 'RegExp'
        , flagsIsUndefined = flags === undefined;
      if(!(this instanceof $RegExp) && patternIsRegExp && flagsIsUndefined)return pattern;
      return CORRECT_NEW
        ? new Base(patternIsRegExp && !flagsIsUndefined ? pattern.source : pattern, flags)
        : new Base(patternIsRegExp ? pattern.source : pattern
          , patternIsRegExp && flagsIsUndefined ? pattern.flags : flags);
    };
    $.each.call($.getNames(Base), function(key){
      key in $RegExp || $.setDesc($RegExp, key, {
        configurable: true,
        get: function(){ return Base[key]; },
        set: function(it){ Base[key] = it; }
      });
    });
    proto.constructor = $RegExp;
    $RegExp.prototype = proto;
    require('./$.redef')($.g, 'RegExp', $RegExp);
  }
  // 21.2.5.3 get RegExp.prototype.flags()
  if(/./g.flags != 'g')$.setDesc(proto, 'flags', {
    configurable: true,
    get: require('./$.replacer')(/^.*\/(\w*)$/, '$1')
  });
}
require('./$.species')($RegExp);
},{"./$":23,"./$.cof":7,"./$.redef":28,"./$.replacer":29,"./$.species":32}],64:[function(require,module,exports){
'use strict';
var strong = require('./$.collection-strong');

// 23.2 Set Objects
require('./$.collection')('Set', {
  // 23.2.3.1 Set.prototype.add(value)
  add: function add(value){
    return strong.def(this, value = value === 0 ? 0 : value, value);
  }
}, strong);
},{"./$.collection":11,"./$.collection-strong":8}],65:[function(require,module,exports){
'use strict';
var $def = require('./$.def')
  , $at  = require('./$.string-at')(false);
$def($def.P, 'String', {
  // 21.1.3.3 String.prototype.codePointAt(pos)
  codePointAt: function codePointAt(pos){
    return $at(this, pos);
  }
});
},{"./$.def":13,"./$.string-at":33}],66:[function(require,module,exports){
'use strict';
var $    = require('./$')
  , cof  = require('./$.cof')
  , $def = require('./$.def')
  , toLength = $.toLength;

// should throw error on regex
$def($def.P + $def.F * !require('./$.throws')(function(){ 'q'.endsWith(/./); }), 'String', {
  // 21.1.3.6 String.prototype.endsWith(searchString [, endPosition])
  endsWith: function endsWith(searchString /*, endPosition = @length */){
    if(cof(searchString) == 'RegExp')throw TypeError();
    var that = String($.assertDefined(this))
      , endPosition = arguments[1]
      , len = toLength(that.length)
      , end = endPosition === undefined ? len : Math.min(toLength(endPosition), len);
    searchString += '';
    return that.slice(end - searchString.length, end) === searchString;
  }
});
},{"./$":23,"./$.cof":7,"./$.def":13,"./$.throws":37}],67:[function(require,module,exports){
var $def    = require('./$.def')
  , toIndex = require('./$').toIndex
  , fromCharCode = String.fromCharCode
  , $fromCodePoint = String.fromCodePoint;

// length should be 1, old FF problem
$def($def.S + $def.F * (!!$fromCodePoint && $fromCodePoint.length != 1), 'String', {
  // 21.1.2.2 String.fromCodePoint(...codePoints)
  fromCodePoint: function fromCodePoint(x){ // eslint-disable-line no-unused-vars
    var res = []
      , len = arguments.length
      , i   = 0
      , code;
    while(len > i){
      code = +arguments[i++];
      if(toIndex(code, 0x10ffff) !== code)throw RangeError(code + ' is not a valid code point');
      res.push(code < 0x10000
        ? fromCharCode(code)
        : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00)
      );
    } return res.join('');
  }
});
},{"./$":23,"./$.def":13}],68:[function(require,module,exports){
'use strict';
var $    = require('./$')
  , cof  = require('./$.cof')
  , $def = require('./$.def');

$def($def.P, 'String', {
  // 21.1.3.7 String.prototype.includes(searchString, position = 0)
  includes: function includes(searchString /*, position = 0 */){
    if(cof(searchString) == 'RegExp')throw TypeError();
    return !!~String($.assertDefined(this)).indexOf(searchString, arguments[1]);
  }
});
},{"./$":23,"./$.cof":7,"./$.def":13}],69:[function(require,module,exports){
var set   = require('./$').set
  , $at   = require('./$.string-at')(true)
  , ITER  = require('./$.uid').safe('iter')
  , $iter = require('./$.iter')
  , step  = $iter.step;

// 21.1.3.27 String.prototype[@@iterator]()
require('./$.iter-define')(String, 'String', function(iterated){
  set(this, ITER, {o: String(iterated), i: 0});
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function(){
  var iter  = this[ITER]
    , O     = iter.o
    , index = iter.i
    , point;
  if(index >= O.length)return step(1);
  point = $at(O, index);
  iter.i += point.length;
  return step(0, point);
});
},{"./$":23,"./$.iter":22,"./$.iter-define":20,"./$.string-at":33,"./$.uid":38}],70:[function(require,module,exports){
var $    = require('./$')
  , $def = require('./$.def');

$def($def.S, 'String', {
  // 21.1.2.4 String.raw(callSite, ...substitutions)
  raw: function raw(callSite){
    var tpl = $.toObject(callSite.raw)
      , len = $.toLength(tpl.length)
      , sln = arguments.length
      , res = []
      , i   = 0;
    while(len > i){
      res.push(String(tpl[i++]));
      if(i < sln)res.push(String(arguments[i]));
    } return res.join('');
  }
});
},{"./$":23,"./$.def":13}],71:[function(require,module,exports){
var $def = require('./$.def');

$def($def.P, 'String', {
  // 21.1.3.13 String.prototype.repeat(count)
  repeat: require('./$.string-repeat')
});
},{"./$.def":13,"./$.string-repeat":35}],72:[function(require,module,exports){
'use strict';
var $    = require('./$')
  , cof  = require('./$.cof')
  , $def = require('./$.def');

// should throw error on regex
$def($def.P + $def.F * !require('./$.throws')(function(){ 'q'.startsWith(/./); }), 'String', {
  // 21.1.3.18 String.prototype.startsWith(searchString [, position ])
  startsWith: function startsWith(searchString /*, position = 0 */){
    if(cof(searchString) == 'RegExp')throw TypeError();
    var that  = String($.assertDefined(this))
      , index = $.toLength(Math.min(arguments[1], that.length));
    searchString += '';
    return that.slice(index, index + searchString.length) === searchString;
  }
});
},{"./$":23,"./$.cof":7,"./$.def":13,"./$.throws":37}],73:[function(require,module,exports){
'use strict';
// ECMAScript 6 symbols shim
var $        = require('./$')
  , setTag   = require('./$.cof').set
  , uid      = require('./$.uid')
  , shared   = require('./$.shared')
  , $def     = require('./$.def')
  , $redef   = require('./$.redef')
  , keyOf    = require('./$.keyof')
  , enumKeys = require('./$.enum-keys')
  , assertObject = require('./$.assert').obj
  , ObjectProto = Object.prototype
  , DESC     = $.DESC
  , has      = $.has
  , $create  = $.create
  , getDesc  = $.getDesc
  , setDesc  = $.setDesc
  , desc     = $.desc
  , getNames = $.getNames
  , toObject = $.toObject
  , $Symbol  = $.g.Symbol
  , setter   = false
  , TAG      = uid('tag')
  , HIDDEN   = uid('hidden')
  , _propertyIsEnumerable = {}.propertyIsEnumerable
  , SymbolRegistry = shared('symbol-registry')
  , AllSymbols = shared('symbols')
  , useNative = $.isFunction($Symbol);

var setSymbolDesc = DESC ? function(){ // fallback for old Android
  try {
    return $create(setDesc({}, HIDDEN, {
      get: function(){
        return setDesc(this, HIDDEN, {value: false})[HIDDEN];
      }
    }))[HIDDEN] || setDesc;
  } catch(e){
    return function(it, key, D){
      var protoDesc = getDesc(ObjectProto, key);
      if(protoDesc)delete ObjectProto[key];
      setDesc(it, key, D);
      if(protoDesc && it !== ObjectProto)setDesc(ObjectProto, key, protoDesc);
    };
  }
}() : setDesc;

function wrap(tag){
  var sym = AllSymbols[tag] = $.set($create($Symbol.prototype), TAG, tag);
  DESC && setter && setSymbolDesc(ObjectProto, tag, {
    configurable: true,
    set: function(value){
      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, desc(1, value));
    }
  });
  return sym;
}

function defineProperty(it, key, D){
  if(D && has(AllSymbols, key)){
    if(!D.enumerable){
      if(!has(it, HIDDEN))setDesc(it, HIDDEN, desc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
      D = $create(D, {enumerable: desc(0, false)});
    } return setSymbolDesc(it, key, D);
  } return setDesc(it, key, D);
}
function defineProperties(it, P){
  assertObject(it);
  var keys = enumKeys(P = toObject(P))
    , i    = 0
    , l = keys.length
    , key;
  while(l > i)defineProperty(it, key = keys[i++], P[key]);
  return it;
}
function create(it, P){
  return P === undefined ? $create(it) : defineProperties($create(it), P);
}
function propertyIsEnumerable(key){
  var E = _propertyIsEnumerable.call(this, key);
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key]
    ? E : true;
}
function getOwnPropertyDescriptor(it, key){
  var D = getDesc(it = toObject(it), key);
  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
  return D;
}
function getOwnPropertyNames(it){
  var names  = getNames(toObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i)if(!has(AllSymbols, key = names[i++]) && key != HIDDEN)result.push(key);
  return result;
}
function getOwnPropertySymbols(it){
  var names  = getNames(toObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i)if(has(AllSymbols, key = names[i++]))result.push(AllSymbols[key]);
  return result;
}

// 19.4.1.1 Symbol([description])
if(!useNative){
  $Symbol = function Symbol(){
    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor');
    return wrap(uid(arguments[0]));
  };
  $redef($Symbol.prototype, 'toString', function(){
    return this[TAG];
  });

  $.create     = create;
  $.setDesc    = defineProperty;
  $.getDesc    = getOwnPropertyDescriptor;
  $.setDescs   = defineProperties;
  $.getNames   = getOwnPropertyNames;
  $.getSymbols = getOwnPropertySymbols;

  if($.DESC && $.FW)$redef(Object.prototype, 'propertyIsEnumerable', propertyIsEnumerable, true);
}

var symbolStatics = {
  // 19.4.2.1 Symbol.for(key)
  'for': function(key){
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(key){
    return keyOf(SymbolRegistry, key);
  },
  useSetter: function(){ setter = true; },
  useSimple: function(){ setter = false; }
};
// 19.4.2.2 Symbol.hasInstance
// 19.4.2.3 Symbol.isConcatSpreadable
// 19.4.2.4 Symbol.iterator
// 19.4.2.6 Symbol.match
// 19.4.2.8 Symbol.replace
// 19.4.2.9 Symbol.search
// 19.4.2.10 Symbol.species
// 19.4.2.11 Symbol.split
// 19.4.2.12 Symbol.toPrimitive
// 19.4.2.13 Symbol.toStringTag
// 19.4.2.14 Symbol.unscopables
$.each.call((
    'hasInstance,isConcatSpreadable,iterator,match,replace,search,' +
    'species,split,toPrimitive,toStringTag,unscopables'
  ).split(','), function(it){
    var sym = require('./$.wks')(it);
    symbolStatics[it] = useNative ? sym : wrap(sym);
  }
);

setter = true;

$def($def.G + $def.W, {Symbol: $Symbol});

$def($def.S, 'Symbol', symbolStatics);

$def($def.S + $def.F * !useNative, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: getOwnPropertySymbols
});

// 19.4.3.5 Symbol.prototype[@@toStringTag]
setTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setTag($.g.JSON, 'JSON', true);
},{"./$":23,"./$.assert":5,"./$.cof":7,"./$.def":13,"./$.enum-keys":15,"./$.keyof":24,"./$.redef":28,"./$.shared":31,"./$.uid":38,"./$.wks":40}],74:[function(require,module,exports){
'use strict';
var $         = require('./$')
  , weak      = require('./$.collection-weak')
  , leakStore = weak.leakStore
  , ID        = weak.ID
  , WEAK      = weak.WEAK
  , has       = $.has
  , isObject  = $.isObject
  , isExtensible = Object.isExtensible || isObject
  , tmp       = {};

// 23.3 WeakMap Objects
var WeakMap = require('./$.collection')('WeakMap', {
  // 23.3.3.3 WeakMap.prototype.get(key)
  get: function get(key){
    if(isObject(key)){
      if(!isExtensible(key))return leakStore(this).get(key);
      if(has(key, WEAK))return key[WEAK][this[ID]];
    }
  },
  // 23.3.3.5 WeakMap.prototype.set(key, value)
  set: function set(key, value){
    return weak.def(this, key, value);
  }
}, weak, true, true);

// IE11 WeakMap frozen keys fix
if($.FW && new WeakMap().set((Object.freeze || Object)(tmp), 7).get(tmp) != 7){
  $.each.call(['delete', 'has', 'get', 'set'], function(key){
    var proto  = WeakMap.prototype
      , method = proto[key];
    require('./$.redef')(proto, key, function(a, b){
      // store frozen objects on leaky map
      if(isObject(a) && !isExtensible(a)){
        var result = leakStore(this)[key](a, b);
        return key == 'set' ? this : result;
      // store all the rest on native weakmap
      } return method.call(this, a, b);
    });
  });
}
},{"./$":23,"./$.collection":11,"./$.collection-weak":10,"./$.redef":28}],75:[function(require,module,exports){
'use strict';
var weak = require('./$.collection-weak');

// 23.4 WeakSet Objects
require('./$.collection')('WeakSet', {
  // 23.4.3.1 WeakSet.prototype.add(value)
  add: function add(value){
    return weak.def(this, value, true);
  }
}, weak, false, true);
},{"./$.collection":11,"./$.collection-weak":10}],76:[function(require,module,exports){
// https://github.com/domenic/Array.prototype.includes
var $def      = require('./$.def')
  , $includes = require('./$.array-includes')(true);
$def($def.P, 'Array', {
  includes: function includes(el /*, fromIndex = 0 */){
    return $includes(this, el, arguments[1]);
  }
});
require('./$.unscope')('includes');
},{"./$.array-includes":3,"./$.def":13,"./$.unscope":39}],77:[function(require,module,exports){
// https://github.com/DavidBruant/Map-Set.prototype.toJSON
require('./$.collection-to-json')('Map');
},{"./$.collection-to-json":9}],78:[function(require,module,exports){
// https://gist.github.com/WebReflection/9353781
var $       = require('./$')
  , $def    = require('./$.def')
  , ownKeys = require('./$.own-keys');

$def($def.S, 'Object', {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object){
    var O      = $.toObject(object)
      , result = {};
    $.each.call(ownKeys(O), function(key){
      $.setDesc(result, key, $.desc(0, $.getDesc(O, key)));
    });
    return result;
  }
});
},{"./$":23,"./$.def":13,"./$.own-keys":26}],79:[function(require,module,exports){
// http://goo.gl/XkBrjD
var $    = require('./$')
  , $def = require('./$.def');
function createObjectToArray(isEntries){
  return function(object){
    var O      = $.toObject(object)
      , keys   = $.getKeys(O)
      , length = keys.length
      , i      = 0
      , result = Array(length)
      , key;
    if(isEntries)while(length > i)result[i] = [key = keys[i++], O[key]];
    else while(length > i)result[i] = O[keys[i++]];
    return result;
  };
}
$def($def.S, 'Object', {
  values:  createObjectToArray(false),
  entries: createObjectToArray(true)
});
},{"./$":23,"./$.def":13}],80:[function(require,module,exports){
// https://gist.github.com/kangax/9698100
var $def = require('./$.def');
$def($def.S, 'RegExp', {
  escape: require('./$.replacer')(/([\\\-[\]{}()*+?.,^$|])/g, '\\$1', true)
});
},{"./$.def":13,"./$.replacer":29}],81:[function(require,module,exports){
// https://github.com/DavidBruant/Map-Set.prototype.toJSON
require('./$.collection-to-json')('Set');
},{"./$.collection-to-json":9}],82:[function(require,module,exports){
// https://github.com/mathiasbynens/String.prototype.at
'use strict';
var $def = require('./$.def')
  , $at  = require('./$.string-at')(true);
$def($def.P, 'String', {
  at: function at(pos){
    return $at(this, pos);
  }
});
},{"./$.def":13,"./$.string-at":33}],83:[function(require,module,exports){
'use strict';
var $def = require('./$.def')
  , $pad = require('./$.string-pad');
$def($def.P, 'String', {
  lpad: function lpad(n){
    return $pad(this, n, arguments[1], true);
  }
});
},{"./$.def":13,"./$.string-pad":34}],84:[function(require,module,exports){
'use strict';
var $def = require('./$.def')
  , $pad = require('./$.string-pad');
$def($def.P, 'String', {
  rpad: function rpad(n){
    return $pad(this, n, arguments[1], false);
  }
});
},{"./$.def":13,"./$.string-pad":34}],85:[function(require,module,exports){
// JavaScript 1.6 / Strawman array statics shim
var $       = require('./$')
  , $def    = require('./$.def')
  , $Array  = $.core.Array || Array
  , statics = {};
function setStatics(keys, length){
  $.each.call(keys.split(','), function(key){
    if(length == undefined && key in $Array)statics[key] = $Array[key];
    else if(key in [])statics[key] = require('./$.ctx')(Function.call, [][key], length);
  });
}
setStatics('pop,reverse,shift,keys,values,entries', 1);
setStatics('indexOf,every,some,forEach,map,filter,find,findIndex,includes', 3);
setStatics('join,slice,concat,push,splice,unshift,sort,lastIndexOf,' +
           'reduce,reduceRight,copyWithin,fill,turn');
$def($def.S, 'Array', statics);
},{"./$":23,"./$.ctx":12,"./$.def":13}],86:[function(require,module,exports){
require('./es6.array.iterator');
var $           = require('./$')
  , Iterators   = require('./$.iter').Iterators
  , ITERATOR    = require('./$.wks')('iterator')
  , ArrayValues = Iterators.Array
  , NL          = $.g.NodeList
  , HTC         = $.g.HTMLCollection
  , NLProto     = NL && NL.prototype
  , HTCProto    = HTC && HTC.prototype;
if($.FW){
  if(NL && !(ITERATOR in NLProto))$.hide(NLProto, ITERATOR, ArrayValues);
  if(HTC && !(ITERATOR in HTCProto))$.hide(HTCProto, ITERATOR, ArrayValues);
}
Iterators.NodeList = Iterators.HTMLCollection = ArrayValues;
},{"./$":23,"./$.iter":22,"./$.wks":40,"./es6.array.iterator":47}],87:[function(require,module,exports){
var $def  = require('./$.def')
  , $task = require('./$.task');
$def($def.G + $def.B, {
  setImmediate:   $task.set,
  clearImmediate: $task.clear
});
},{"./$.def":13,"./$.task":36}],88:[function(require,module,exports){
// ie9- setTimeout & setInterval additional parameters fix
var $         = require('./$')
  , $def      = require('./$.def')
  , invoke    = require('./$.invoke')
  , partial   = require('./$.partial')
  , navigator = $.g.navigator
  , MSIE      = !!navigator && /MSIE .\./.test(navigator.userAgent); // <- dirty ie9- check
function wrap(set){
  return MSIE ? function(fn, time /*, ...args */){
    return set(invoke(
      partial,
      [].slice.call(arguments, 2),
      $.isFunction(fn) ? fn : Function(fn)
    ), time);
  } : set;
}
$def($def.G + $def.B + $def.F * MSIE, {
  setTimeout:  wrap($.g.setTimeout),
  setInterval: wrap($.g.setInterval)
});
},{"./$":23,"./$.def":13,"./$.invoke":18,"./$.partial":27}],89:[function(require,module,exports){
require('./modules/es5');
require('./modules/es6.symbol');
require('./modules/es6.object.assign');
require('./modules/es6.object.is');
require('./modules/es6.object.set-prototype-of');
require('./modules/es6.object.to-string');
require('./modules/es6.object.statics-accept-primitives');
require('./modules/es6.function.name');
require('./modules/es6.function.has-instance');
require('./modules/es6.number.constructor');
require('./modules/es6.number.statics');
require('./modules/es6.math');
require('./modules/es6.string.from-code-point');
require('./modules/es6.string.raw');
require('./modules/es6.string.iterator');
require('./modules/es6.string.code-point-at');
require('./modules/es6.string.ends-with');
require('./modules/es6.string.includes');
require('./modules/es6.string.repeat');
require('./modules/es6.string.starts-with');
require('./modules/es6.array.from');
require('./modules/es6.array.of');
require('./modules/es6.array.iterator');
require('./modules/es6.array.species');
require('./modules/es6.array.copy-within');
require('./modules/es6.array.fill');
require('./modules/es6.array.find');
require('./modules/es6.array.find-index');
require('./modules/es6.regexp');
require('./modules/es6.promise');
require('./modules/es6.map');
require('./modules/es6.set');
require('./modules/es6.weak-map');
require('./modules/es6.weak-set');
require('./modules/es6.reflect');
require('./modules/es7.array.includes');
require('./modules/es7.string.at');
require('./modules/es7.string.lpad');
require('./modules/es7.string.rpad');
require('./modules/es7.regexp.escape');
require('./modules/es7.object.get-own-property-descriptors');
require('./modules/es7.object.to-array');
require('./modules/es7.map.to-json');
require('./modules/es7.set.to-json');
require('./modules/js.array.statics');
require('./modules/web.timers');
require('./modules/web.immediate');
require('./modules/web.dom.iterable');
module.exports = require('./modules/$').core;

},{"./modules/$":23,"./modules/es5":41,"./modules/es6.array.copy-within":42,"./modules/es6.array.fill":43,"./modules/es6.array.find":45,"./modules/es6.array.find-index":44,"./modules/es6.array.from":46,"./modules/es6.array.iterator":47,"./modules/es6.array.of":48,"./modules/es6.array.species":49,"./modules/es6.function.has-instance":50,"./modules/es6.function.name":51,"./modules/es6.map":52,"./modules/es6.math":53,"./modules/es6.number.constructor":54,"./modules/es6.number.statics":55,"./modules/es6.object.assign":56,"./modules/es6.object.is":57,"./modules/es6.object.set-prototype-of":58,"./modules/es6.object.statics-accept-primitives":59,"./modules/es6.object.to-string":60,"./modules/es6.promise":61,"./modules/es6.reflect":62,"./modules/es6.regexp":63,"./modules/es6.set":64,"./modules/es6.string.code-point-at":65,"./modules/es6.string.ends-with":66,"./modules/es6.string.from-code-point":67,"./modules/es6.string.includes":68,"./modules/es6.string.iterator":69,"./modules/es6.string.raw":70,"./modules/es6.string.repeat":71,"./modules/es6.string.starts-with":72,"./modules/es6.symbol":73,"./modules/es6.weak-map":74,"./modules/es6.weak-set":75,"./modules/es7.array.includes":76,"./modules/es7.map.to-json":77,"./modules/es7.object.get-own-property-descriptors":78,"./modules/es7.object.to-array":79,"./modules/es7.regexp.escape":80,"./modules/es7.set.to-json":81,"./modules/es7.string.at":82,"./modules/es7.string.lpad":83,"./modules/es7.string.rpad":84,"./modules/js.array.statics":85,"./modules/web.dom.iterable":86,"./modules/web.immediate":87,"./modules/web.timers":88}],90:[function(require,module,exports){
(function (global){
/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
 * additional grant of patent rights can be found in the PATENTS file in
 * the same directory.
 */

!(function(global) {
  "use strict";

  var hasOwn = Object.prototype.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var iteratorSymbol =
    typeof Symbol === "function" && Symbol.iterator || "@@iterator";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided, then outerFn.prototype instanceof Generator.
    var generator = Object.create((outerFn || Generator).prototype);

    generator._invoke = makeInvokeMethod(
      innerFn, self || null,
      new Context(tryLocsList || [])
    );

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype;
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunction.displayName = "GeneratorFunction";

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    genFun.__proto__ = GeneratorFunctionPrototype;
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    return new Promise(function(resolve, reject) {
      var generator = wrap(innerFn, outerFn, self, tryLocsList);
      var callNext = step.bind(generator, "next");
      var callThrow = step.bind(generator, "throw");

      function step(method, arg) {
        var record = tryCatch(generator[method], generator, arg);
        if (record.type === "throw") {
          reject(record.arg);
          return;
        }

        var info = record.arg;
        if (info.done) {
          resolve(info.value);
        } else {
          Promise.resolve(info.value).then(callNext, callThrow);
        }
      }

      callNext();
    });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          if (method === "return" ||
              (method === "throw" && delegate.iterator[method] === undefined)) {
            // A return or throw (when the delegate iterator has no throw
            // method) always terminates the yield* loop.
            context.delegate = null;

            // If the delegate iterator has a return method, give it a
            // chance to clean up.
            var returnMethod = delegate.iterator["return"];
            if (returnMethod) {
              var record = tryCatch(returnMethod, delegate.iterator, arg);
              if (record.type === "throw") {
                // If the return method threw an exception, let that
                // exception prevail over the original return or throw.
                method = "throw";
                arg = record.arg;
                continue;
              }
            }

            if (method === "return") {
              // Continue with the outer return, now that the delegate
              // iterator has been terminated.
              continue;
            }
          }

          var record = tryCatch(
            delegate.iterator[method],
            delegate.iterator,
            arg
          );

          if (record.type === "throw") {
            context.delegate = null;

            // Like returning generator.throw(uncaught), but without the
            // overhead of an extra function call.
            method = "throw";
            arg = record.arg;
            continue;
          }

          // Delegate generator ran and handled its own exceptions so
          // regardless of what the method was, we continue as if it is
          // "next" with an undefined arg.
          method = "next";
          arg = undefined;

          var info = record.arg;
          if (info.done) {
            context[delegate.resultName] = info.value;
            context.next = delegate.nextLoc;
          } else {
            state = GenStateSuspendedYield;
            return info;
          }

          context.delegate = null;
        }

        if (method === "next") {
          if (state === GenStateSuspendedYield) {
            context.sent = arg;
          } else {
            delete context.sent;
          }

        } else if (method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw arg;
          }

          if (context.dispatchException(arg)) {
            // If the dispatched exception was caught by a catch block,
            // then let that catch block handle the exception normally.
            method = "next";
            arg = undefined;
          }

        } else if (method === "return") {
          context.abrupt("return", arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          var info = {
            value: record.arg,
            done: context.done
          };

          if (record.arg === ContinueSentinel) {
            if (context.delegate && method === "next") {
              // Deliberately forget the last sent value so that we don't
              // accidentally pass it on to the delegate.
              arg = undefined;
            }
          } else {
            return info;
          }

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(arg) call above.
          method = "throw";
          arg = record.arg;
        }
      }
    };
  }

  function defineGeneratorMethod(method) {
    Gp[method] = function(arg) {
      return this._invoke(method, arg);
    };
  }
  defineGeneratorMethod("next");
  defineGeneratorMethod("throw");
  defineGeneratorMethod("return");

  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset();
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function() {
      this.prev = 0;
      this.next = 0;
      this.sent = undefined;
      this.done = false;
      this.delegate = null;

      this.tryEntries.forEach(resetTryEntry);

      // Pre-initialize at least 20 temporary variables to enable hidden
      // class optimizations for simple generators.
      for (var tempIndex = 0, tempName;
           hasOwn.call(this, tempName = "t" + tempIndex) || tempIndex < 20;
           ++tempIndex) {
        this[tempName] = null;
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;
        return !!caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.next = finallyEntry.finallyLoc;
      } else {
        this.complete(record);
      }

      return ContinueSentinel;
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = record.arg;
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      return ContinueSentinel;
    }
  };
})(
  // Among the various tricks for obtaining a reference to the global
  // object, this seems to be the most reliable technique that does not
  // use indirect eval (which violates Content Security Policy).
  typeof global === "object" ? global :
  typeof window === "object" ? window :
  typeof self === "object" ? self : this
);

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],91:[function(require,module,exports){
module.exports = require("./lib/babel/polyfill");

},{"./lib/babel/polyfill":2}],92:[function(require,module,exports){
module.exports = require("babel-core/polyfill");

},{"babel-core/polyfill":91}],93:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.createMap = createMap;
/** Factory where we construct a horizontal hexagon map for test and development purposes
 *
 * @require createjs framework in global namespace
 * @require canvas HTML5-element to work. This is more for node.js
 * @todo Add documentation and refactor (maybe modularize / functionalize) the actual logic */

/* ====== Own module imports ====== */

var _mapCorePixi_Map = require('../map/core/pixi_Map');

var _mapExtensionsHexagonsObjectPixi_Object_terrain_hexa = require('../map/extensions/hexagons/object/pixi_Object_terrain_hexa');

var _mapExtensionsHexagonsObjectPixi_Object_unit_hexa = require('../map/extensions/hexagons/object/pixi_Object_unit_hexa');

var _mapCorePixi_spritesheetList = require('../map/core/pixi_spritesheetList');

var _mapCoreUtilsUtils = require('../map/core/utils/utils');

//import { UI } from '../map/core/UI';
//import { UI_default } from "../map/UIs/default/default.js";

var _mapCoreEventlisteners = require('../map/core/eventlisteners');

var allSpritesheets = (0, _mapCorePixi_spritesheetList.spritesheetList)();

var functionsInObj = {
  Object_terrain: _mapExtensionsHexagonsObjectPixi_Object_terrain_hexa.Object_terrain,
  Object_unit: _mapExtensionsHexagonsObjectPixi_Object_unit_hexa.Object_unit
};

/* ===== EXPORT ===== */
/**
 * @param {DOMElement Canvas} canvasElement the canvas element for the map
 * @param {Object} gameDataArg gameData. More specific data in data-folders test-datas
 * @param {bigass Object} mapData - holds all the stage, layer and object data needed to construct a full map.
 * More specific data in data-folders test-datas
 * @param {Object} typeDataArg typeData. More specific data in data-folders test-datas.
*/

function createMap(canvasElement, datas) {
  console.log('============================================');
  var mapData = typeof datas.map === 'string' ? JSON.parse(datas.map) : datas.map;
  var typeData = typeof datas.type === 'string' ? JSON.parse(datas.type) : datas.type;
  var gameData = typeof datas.game === 'string' ? JSON.parse(datas.game) : datas.game;
  var windowSize = _mapCoreUtilsUtils.resizeUtils.getWindowSize();
  var mapOptions = {
    mapSize: gameData.mapSize,
    bounds: {
      width: windowSize.width,
      height: windowSize.height
    },
    renderer: {
      autoResize: true,
      transparent: true,
      antialias: false // TEST. Only should work in chrome atm.?
      //resolution: changincVariable - We might need this later on, when doing mobile optimizations, for different pizel density devices
    }
  };
  var map = new _mapCorePixi_Map.Map(canvasElement, mapOptions);
  //var dialog_selection = document.getElementById("selectionDialog");
  //var defaultUI = new UI_default(dialog_selection);
  //defaultUI.init();

  /* Initialize UI as singleton */
  //UI(defaultUI, map);

  /* We iterate through the given map data and create objects accordingly */
  //for(let ia = 0; ia < 100; ia++) {
  mapData.layers.forEach(function (layerData) {
    var thisLayer = undefined;

    try {
      thisLayer = map.addLayer(layerData.name, false, layerData.coord);
    } catch (e) {
      console.log('Problem:', layerData.type, e.stack);
    }

    layerData.objectGroups.forEach(function (objectGroup) {
      var spritesheetType = objectGroup.typeImageData;

      if (!spritesheetType) {
        console.log('Error with spritesheetType-data');
        return;
      }

      objectGroup.objects.forEach(function (object) {
        var objTypeData = typeData.objectData[spritesheetType][object.objType];

        if (!objTypeData) {
          console.debug('Bad mapData for type:', spritesheetType, object.objType, object.name);
          throw new Error('Bad mapData for type:', spritesheetType, object.objType, object.name);
        }

        var currentFrame = PIXI.utils.TextureCache[objTypeData.image];
        var objData = {
          typeData: objTypeData,
          activeData: object.data
        };
        var newObject = new functionsInObj[objectGroup.type](object.coord, objData, currentFrame, { radius: 42 });

        thisLayer.addChild(newObject);
      });
    });
  });
  //}

  map.moveMap(mapData.startPoint);

  document.getElementById('testFullscreen').addEventListener('click', function () {
    _mapCoreEventlisteners.eventListeners.toggleFullScreen();
  });

  window.map = map;

  return map;
}

},{"../map/core/eventlisteners":95,"../map/core/pixi_Map":99,"../map/core/pixi_spritesheetList":103,"../map/core/utils/utils":104,"../map/extensions/hexagons/object/pixi_Object_terrain_hexa":108,"../map/extensions/hexagons/object/pixi_Object_unit_hexa":109}],94:[function(require,module,exports){
/** Main class for showing UI on the map. Like unit selections and such. Has nothing to do with showing off-map data.
 * Good examples for what this shows are: selected units-list, selection highlight (like a circle on the selected unit) and
 * bringing the unit on top in the map.
 *
 * @param {Module} givenUITheme the module that will be used for the UI theme
 * @param {Map} givenMap Map instance that is used
 * @return UI module
*/

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UI = UI;
/** The abstract UI module for the core map functionality. This is used by defining UI Themes that implement this
 * core UI module.
 * Default methods to use in UI are:
 * showSelections and highlightSelectedObject. More methods can be extended to UI with plugins
 *
 * @todo Not implemented fully yet and probably need refactoring */
var scope;

function UI(givenUITheme, givenMap) {
  /* SINGLETON MODULE */
  if (scope) {
    return scope;
  }

  if (!givenUITheme || !givenMap) {
    throw new Error("UI-module requires UITheme and map object");
  }

  var map = givenMap;
  var UITheme = givenUITheme;
  scope = {};

  /** Responsible for showing selectiong element, where the player select the wanted object out of array of objects.
   * For example if there are several objects in one tile on the map and the player needs to be able to select one
   * specific unit on the stack */
  scope.showSelections = function showSelections(objects) {
    return UITheme.showSelections(map, objects);
  };
  /** Resonsible for hignlighting the selected object. For example the unit that is being commanded. The hightlight
   * can mean e.g. bringing the unit on top on the map and showing selection circle around it. */
  scope.highlightSelectedObject = function highlightSelectedObject(object) {
    return UITheme.highlightSelectedObject(map, object);
  };

  return scope;
}

},{}],95:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/* global Hammer, createjs */

/**
 * Houses the default eventlisteners used in the map. When plugins are added to the map this class can be used for
 * the eventlistener management. This way all the eventlisteners are in the same object, conveniently.
 *
 * @require Browser that support pointer events or Pointer events polyfill, such as: https://github.com/jquery/PEP
 * @require Hammer.js for touch events*/

var singletonScope;

/* ===== EXPORT ===== */
/**
 * eventListeners is a singleton that needs to be initialized with an object, that holds all the callbacks used in this
 * class. I.e.
 {
   select: function() {},
   zoom: function() {}
 }*/
var eventListeners = function eventListenerModule(map, canvasElement) {
  if (singletonScope) {
    return singletonScope;
  }
  if (!map || !canvasElement) {
    throw new Error("eventlisteners initialization require map callbacks and canvas element as arguments");
  }

  var mapCBs = map.eventCBs;

  singletonScope = {
    states: {}
  };

  singletonScope.toggleFullSizeListener = function toggleFullSizeListener() {
    if (singletonScope.states.fullSize !== true) {
      window.addEventListener("resize", mapCBs.fullSizeCB);
      singletonScope.states.fullSize = true;
    } else {
      window.removeEventListener("resize", mapCBs.fullSizeCB);
      singletonScope.states.fullSize = false;
    }

    return mapCBs.fullSize;
  };
  singletonScope.toggleFullscreen = function toggleFullscreen() {
    singletonScope.states.fullScreen = mapCBs.fullscreen();

    return mapCBs.fullscreen;
  };
  singletonScope.toggleZoomListener = function toggleZoomListener() {
    if (singletonScope.states.zoom !== true) {
      if (isMobileSite()) {
        var hammer = new Hammer.Manager(canvasElement);
        var pinch = new Hammer.Pinch();
        hammer.add(pinch);
        hammer.on("pinch", mapCBs.zoom);
      } else {
        /* Hamster handles wheel events really nicely */
        Hamster(canvasElement).wheel(mapCBs.zoom);
      }

      singletonScope.states.zoom = true;
    } else {
      if (isMobileSite()) {
        hammer.on("pinch", mapCBs.zoom);
      } else {
        Hamster(canvasElement).unwheel(mapCBs.zoom);
      }

      singletonScope.states.zoom = false;
    }

    return mapCBs.zoom;
  };
  singletonScope.toggleDragListener = function toggleDragListener() {
    if (singletonScope.states.drag !== true) {
      if (isMobileSite()) {
        var hammer = new Hammer.Manager(canvasElement);
        var pan = new Hammer.Pan({
          pointers: 1,
          threshold: 5,
          direction: Hammer.DIRECTION_ALL });
        hammer.add(pan);
        hammer.on("pan", mapCBs.drag);
      } else {
        canvasElement.addEventListener("mousedown", mapCBs.drag);
      }

      singletonScope.states.drag = true;
    } else {
      if (isMobileSite()) {
        hammer.off("pan", mapCBs.drag);
      } else {
        canvasElement.removeEventListener("mousedown", mapCBs.drag);
      }

      singletonScope.states.drag = false;
    }

    return mapCBs.drag;
  };
  singletonScope.toggleSelectListener = function toggleSelectListener() {
    if (singletonScope.states.select !== true) {
      if (isMobileSite()) {
        var hammer = new Hammer.Manager(canvasElement);
        var tap = new Hammer.Tap();
        hammer.add(tap);
        hammer.on("tap", mapCBs.select);
      } else {
        canvasElement.addEventListener("mousedown", mapCBs.select);
      }

      singletonScope.states.select = true;
    } else {
      if (isMobileSite()) {
        hammer.off("tap", mapCBs.select);
      } else {
        canvasElement.removeEventListener("mousedown", mapCBs.select);
      }

      singletonScope.states.select = false;
    }

    return mapCBs.select;
  };

  return singletonScope;
};

exports.eventListeners = eventListeners;
function isMobileSite() {
  return typeof Hammer != "undefined";
}

},{}],96:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
/** The core plugin for the 2D map engine. Handles moving the map by dragging the map.
 * Core plugins can always be overwrote if needed
 *
 * @require Browser that support pointer events or Pointer events polyfill, such as: https://github.com/jquery/PEP
 * @todo See if this plugin need refactoring and more documentation */

var _eventlisteners = require('../eventlisteners');

var _utilsUtils = require('../utils/utils');

var map_drag = (function map_drag() {
  /* Function for setting and getting the mouse offset. Private functions declared bottom */
  var offsetCoords = _offsetCoords();

  /* =====================
     MODULE API (in scope)
     ===================== */
  var scope = {};
  scope.pluginName = 'map_drag';

  /** Required init functions for the plugin
  * @param {Map object} mapObj - the Map class object */
  scope.init = function (map) {
    if (map.mapEnvironment() === 'mobile') {
      map.eventCBs.drag = _startDragListener_mobile(map);
    } else {
      map.eventCBs.drag = _startDragListener(map);
    }

    /* Singleton should have been instantiated before, we only retrieve it with 0 params */
    (0, _eventlisteners.eventListeners)().toggleDragListener();
  };

  /* ======================================
   private functions revealed for testing
   ======================================*/
  scope._startDragListener = _startDragListener;

  return scope;

  /** Starts the whole functionality of this class
   * @param {createjs.Stage} topMostStage - createjs.Stage object, that is the topmost on the map (meant for interaction).
   * @param {Map} map - The Map class object
   */
  function _startDragListener(map) {
    return function startDrag(e) {
      try {
        offsetCoords.setOffset(_utilsUtils.mouseUtils.getEventCoordsOnPage(e));
        _addDragListeners();
      } catch (e) {
        console.log(e);
      }

      /** @requires map objects to be accessible in scope */
      function _mouseupListener() {
        e.preventDefault();
        _removeDragListeners();
        _mapMoved(map);
      }
      /** @requires map objects to be accessible in scope */

      function _dragListener(e) {
        try {
          var eventCoords = _utilsUtils.mouseUtils.getEventCoordsOnPage(e);

          e.preventDefault();

          map.mapMoved(true);

          if (e.buttons === 0) {
            _removeDragListeners();
            /* So that the events will stop when mouse is up, even though mouseup event wouldn't fire */
            _mapMoved(map);
          }

          var offset = offsetCoords.getOffset();
          var moved = {
            x: eventCoords.x - offset.x,
            y: eventCoords.y - offset.y
          };

          if (moved.x > 0 || moved.y > 0 || moved.x < 0 || moved.y < 0) {
            map.moveMap(moved);
          } else {
            map.mapMoved(false);
          }

          offsetCoords.setOffset({
            x: eventCoords.x,
            y: eventCoords.y
          });

          /* The mouse has been moved after pressing. This prevent the click
            event to fire at the same time with the mouseDown / dragging event
          */
          //map.mouseMoved( true );
        } catch (e) {
          console.log(e);
        }
      }

      function _addDragListeners() {
        map.canvas.addEventListener('mousemove', _dragListener);
        map.canvas.addEventListener('mouseup', _mouseupListener);
      }
      function _removeDragListeners() {
        map.canvas.removeEventListener('mousemove', _dragListener);
        map.canvas.removeEventListener('mouseup', _mouseupListener);
      }
    };
  }

  function _startDragListener_mobile(map) {
    var initialized = false;

    return function startDrag(e) {
      var coords = e.center;

      e.preventDefault();

      try {
        if (!initialized) {
          offsetCoords.setOffset({
            x: coords.x,
            y: coords.y
          });
          initialized = true;
          map.mapMoved(true);

          return;
        } else if (e.isFinal === true) {
          initialized = false;
          map.mapMoved(false);
        }

        map.mapMoved(true);

        var offset = offsetCoords.getOffset();
        var moved = {
          x: coords.x - offset.x,
          y: coords.y - offset.y
        };

        if (moved.x !== 0 || moved.y !== 0) {
          map.moveMap(moved);
        }

        offsetCoords.setOffset({
          x: coords.x,
          y: coords.y
        });
      } catch (e) {
        console.log(e);
      }
    };
  }

  /* =================
     Private functions
     ================= */
  /** Function for setting and getting the mouse offset. */
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
  };

  /* Without this, the other eventListeners might fire inappropriate events. */
  function _mapMoved(map) {
    window.setTimeout(function () {
      map.mapMoved(false);
    }, 1);
  }
})();
exports.map_drag = map_drag;

},{"../eventlisteners":95,"../utils/utils":104}],97:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

/** Terrain tile like desert or mountain, non-movable and cacheable. Normally, but not necessarily, these are
 * inherited, depending on the map type. For example you might want to add some click area for these */

var _pixi_Object = require('../pixi_Object');

var Object_sprite_terrain = (function (_Object_sprite) {
  function Object_sprite_terrain(coords, data, currFrameNumber, throwShadowOptions) {
    _classCallCheck(this, Object_sprite_terrain);

    _get(Object.getPrototypeOf(Object_sprite_terrain.prototype), 'constructor', this).call(this, coords, data, currFrameNumber, throwShadowOptions);

    this.name = 'DefaultTerrainObject';
    this.type = 'terrain';
    this.highlightable = false;
    this.selectable = false;
  }

  _inherits(Object_sprite_terrain, _Object_sprite);

  return Object_sprite_terrain;
})(_pixi_Object.Object_sprite);

exports.Object_sprite_terrain = Object_sprite_terrain;

},{"../pixi_Object":102}],98:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

/** Map unit like infantry or worker, usually something with actions or movable. Normally, but not necessarily, these are
 * inherited, depending on the map type. For example you might want to add some click area for these */

var _pixi_Object = require('../pixi_Object');

var Object_sprite_unit = (function (_Object_sprite) {
  function Object_sprite_unit(coords, data, currFrameNumber, throwShadowOptions) {
    _classCallCheck(this, Object_sprite_unit);

    _get(Object.getPrototypeOf(Object_sprite_unit.prototype), 'constructor', this).call(this, coords, data, currFrameNumber, throwShadowOptions);

    this.name = 'DefaultUnitObjects';
    this.type = 'unit';
    this.highlightable = true;
    this.selectable = true;
    this.actions = {
      move: [],
      attack: []
    };

    this.throwShadow = true;
  }

  _inherits(Object_sprite_unit, _Object_sprite);

  _createClass(Object_sprite_unit, [{
    key: 'doAction',
    value: function doAction(type) {
      this.actions[type].forEach(function (action) {
        action();
      });
    }
  }, {
    key: 'addActionType',
    value: function addActionType(type) {
      this.actions[type] = this.actions[type] || [];
    }
  }, {
    key: 'addCallbackToAction',
    value: function addCallbackToAction(type, cb) {
      this.actions[type].push(cb);
    }
  }]);

  return Object_sprite_unit;
})(_pixi_Object.Object_sprite);

exports.Object_sprite_unit = Object_sprite_unit;

},{"../pixi_Object":102}],99:[function(require,module,exports){
/** Map is the main class for constructing 2D map for strategy games
 *
 * Map is instantiated and then initialized with init-method.
 *
 * Plugins can be added with activatePlugins-method by prodiving init(map) method in the plugin. Plugins are always
 * functions, not objects that are instantiated. Plugins are supposed to extend the map object or anything in it via
 * it's public methods.
 *
 * @require createjs framework in global namespace
 * @require canvas HTML5-element to work.
 *
 * @require Plugins that use eventlistener by default, use pointer events polyfill, such as: https://github.com/jquery/PEP
 * Plugins and eventlistener can be overriden, but they user pointer events by default (either the browser must support
 * them or use polyfill) */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

/* ====== Own module imports ====== */

var _pixi_Map_stage = require('./pixi_Map_stage');

var _pixi_Map_layer = require('./pixi_Map_layer');

var _utilsUtils = require('./utils/utils');

var _moveMap_drag = require('./move/map_drag');

var _zoomPixi_map_zoom = require('./zoom/pixi_map_zoom');

var _eventlisteners = require('./eventlisteners');

var _drawMapOnNextTick = false;
var eventlisteners, _stage, _staticLayer, _movableLayer, _renderer;

var Map = (function () {
  /**
   * @param {DOM Canvas element} canvas - Canvas used by the map
   * @param {Object} options - different options for the map to be given.
   * @return Map instance
    @todo, set default values for given and required options */

  function Map(canvasParent, options) {
    _classCallCheck(this, Map);

    if (!canvasParent) {
      throw new Error(this.constructor.name + ' needs canvasParent!');
    }
    if (typeof canvas === 'string') {
      canvasParent = document.querySelector(canvasParent);
    } else {
      canvasParent = canvasParent;
    }

    _renderer = PIXI.autoDetectRenderer(options.bounds.width, options.bounds.height, options.renderer);
    /* We handle all the events ourselves through addEventListeners-method on canvas, so destroy pixi native method */
    _renderer.plugins.interaction.destroy();
    canvasParent.replaceChild(_renderer.view, canvasParent.getElementsByTagName('canvas')[0]);
    this.canvas = _renderer.view;
    window.addEventListener('resize', function (event) {
      setFullsizedMap(_renderer);
    });

    _stage = new _pixi_Map_stage.Map_stage('mainStage', this.canvas, _renderer);
    _staticLayer = new _pixi_Map_layer.Map_layer('staticLayer', options.subContainers, options.startCoord);
    _stage.addChild(_staticLayer);
    _movableLayer = new _pixi_Map_layer.Map_layer('movableLayer', options.subContainers, options.startCoord);
    _staticLayer.addChild(_movableLayer);
    this.plugins = new Set();
    /* Activate the map zoom and map drag core plugins */
    this.defaultPlugins = [_zoomPixi_map_zoom.map_zoom, _moveMap_drag.map_drag];
    this.mapSize = options.mapSize || { x: 0, y: 0 };
    this.activeTickCB = false;
    this.eventCBs = {
      fullSize: _utilsUtils.resizeUtils.setToFullSize(this.canvas.getContext('2d')),
      fullscreen: _utilsUtils.resizeUtils.toggleFullScreen,
      select: null,
      drag: null,
      zoom: null
    };
    this._fullSizeFunction = null;
    eventlisteners = (0, _eventlisteners.eventListeners)(this, this.canvas);
    this.environment = 'desktop';
    this.mapEnvironment(_utilsUtils.environmentDetection.isMobile() ? 'mobile' : 'desktop');
    this._mapInMove = false;
  }

  _createClass(Map, [{
    key: 'init',

    /** initialization method
     * @param [Array] plugins - Plugins to be activated for the map. Normally you should give the plugins here instead of
     * separately passing them to activatePlugins method
     * @param {x: ? y:?} coord - Starting coordinates for the map
     * @param {Function} tickCB - callback function for tick. Tick callback is initiated in every frame. So map draws happen
     * during ticks
     * @return the current map instance */
    value: function init(plugins, coord, tickCB) {
      if (plugins) {
        this.activatePlugins(plugins);
      }

      if (coord) {
        _movableLayer.x = coord.x;
        _movableLayer.y = coord.y;
      }

      this.drawOnNextTick();
      _defaultTick(this, PIXI.ticker.shared);
      tickCB && this.customTickOn(tickCB);

      return this;
    }
  }, {
    key: 'drawOnNextTick',

    /** The correct way to update / redraw the map. Check happens at every tick and thus in every frame.
     * @return the current map instance */
    value: function drawOnNextTick() {
      _drawMapOnNextTick = true;

      return this;
    }
  }, {
    key: 'getLayersWithAttributes',

    /** The correct way to update / redraw the map. Check happens at every tick and thus in every frame.
     * @return the current map instance */
    value: function getLayersWithAttributes(attribute, value) {
      return _stage.children[0].children.filter(function (layer) {
        return layer[attribute] === value;
      });
    }
  }, {
    key: 'getStages',
    value: function getStages() {
      return [_stage];
    }
  }, {
    key: 'getStage',
    value: function getStage() {
      return _stage;
    }
  }, {
    key: 'getSize',
    value: function getSize() {
      return this.mapSize;
    }
  }, {
    key: 'addLayer',

    /** All parameters are passed to Map_layer constructor
     * @return created Map_layer instance */
    value: function addLayer(name, subContainers, coord) {
      var layer = new _pixi_Map_layer.Map_layer(name, subContainers, coord);

      _movableLayer.addChild(layer);

      return layer;
    }
  }, {
    key: 'removeLayer',

    /**
     * @param {Map_layer} layer - the layer object to be removed */
    value: function removeLayer(layer) {
      _movableLayer.removeChild(layer);

      return layer;
    }
  }, {
    key: 'getLayerNamed',

    /** @return layer with the passed layer name */
    value: function getLayerNamed(name) {
      return _movableLayer.getChildNamed(name);
    }
  }, {
    key: 'moveMap',

    /**
     * @param {x: Number, y: Number} coord - The amount of x and y coordinates we want the map to move. I.e. { x: 5, y: 0 }
     * with this we want the map to move horizontally 5 pizels and vertically stay at the same position.
     * @return this map instance */
    value: function moveMap(coordinates) {
      var realCoordinates = {
        x: coordinates.x / _staticLayer.getScale(),
        y: coordinates.y / _staticLayer.getScale()
      };
      _movableLayer.move(realCoordinates);
      this.drawOnNextTick();

      return this;
    }
  }, {
    key: 'cacheMap',

    /** Cache the map. This provides significant performance boost, when used correctly. cacheMap iterates through all the
     * layer on the map and caches the ones that return true from getCacheEnabled-method.
     * @param {x: Number, y: Number} coord - The amount of x and y coordinates we want the map to move. I.e. { x: 5, y: 0 }
     * with this we want the map to move horizontally 5 pizels and vertically stay at the same position.
     * @return this map instance */
    value: function cacheMap() {
      if (_movableLayer.getCacheEnabled()) {
        _movableLayer.cacheAsBitmap = true;
      } else {
        _movableLayer.children.forEach(function (child) {
          if (child.getCacheEnabled()) {
            child.cacheAsBitmap = true;
          }
        });
      }

      return this;
    }
  }, {
    key: 'getObjectsUnderMapPoint',

    /** iterates through the map layers and returns matching objects on given coordinates
     * @param {x: Number, y: Number} coord - The map coordinate under which we want to retrieve all the objects.
     * @return this map instance */
    value: function getObjectsUnderMapPoint(coord) {
      var objects = [];

      _movableLayer.getObjectsUnderPoint(coord);

      return objects;
    }
  }, {
    key: 'toggleFullSize',

    /** Resize the canvas to fill the whole browser area. Uses this.eventCBs.fullsize as callback, so when you need to overwrite
    the eventlistener callback use this.eventCBs */
    value: function toggleFullSize() {
      eventlisteners.toggleFullSizeListener();
    }
  }, {
    key: 'toggleFullScreen',

    /** Toggles fullscreen mode. Uses this.eventCBs.fullscreen as callback, so when you need to overwrite
    the eventlistener callback use this.eventCBs */
    value: function toggleFullScreen() {
      eventlisteners.toggleFullScreen();
    }
  }, {
    key: 'activatePlugins',

    /** Activate plugins for the map. Plugins need .pluginName property and .init-method
    @param [Array] pluginsArray - Array that consists of the plugin modules */
    value: function activatePlugins() {
      var _this = this;

      var pluginsArray = arguments[0] === undefined ? [] : arguments[0];

      var currentPluginNameForErrors;

      try {
        pluginsArray.forEach(function (plugin) {
          if (!plugin || !plugin.pluginName) {
            throw new Error('plugin or plugin.pluginName missing');
          }
          currentPluginNameForErrors = plugin.pluginName;

          if (_this.plugins.add(plugin)) {
            plugin.init(_this);
          }
        });
      } catch (e) {
        console.log('An error initializing plugin ' + currentPluginNameForErrors, e);
      }

      return this;
    }
  }, {
    key: 'mapMoved',

    /** getter and setter for detecting if map is moved and setting the maps status as moved or not moved */
    value: function mapMoved(yesOrNo) {
      if (yesOrNo !== undefined) {
        this._mapInMove = yesOrNo;
        return yesOrNo;
      }

      return this._mapInMove;
    }
  }, {
    key: 'setPrototype',
    value: function setPrototype(property, value) {
      //this.setPrototypeOf(property, value);
      //this[property] = value;
      //this.prototype[property] = value;
      Map.prototype[property] = value;
    }
  }, {
    key: 'mapEnvironment',

    /** getter and setter for marking environment as mobile or desktop */
    value: function mapEnvironment(env) {
      if (env !== undefined) {
        this.environment = env;
        return env;
      }

      return this.environment;
    }
  }, {
    key: 'getMapPosition',

    /** @return { x: Number, y: Number }, current coordinates for the map */
    value: function getMapPosition() {
      return {
        x: _movableLayer.x,
        y: _movableLayer.y
      };
    }
  }, {
    key: 'getZoomLayer',
    value: function getZoomLayer() {
      return _staticLayer;
    }
  }, {
    key: 'getScale',
    value: function getScale() {
      return _staticLayer.getScale();
    }
  }, {
    key: 'zoomIn',
    value: function zoomIn() {
      throw new Error('Zoom needs to be implemented and actiaved through a plugin');
    }
  }, {
    key: 'zoomOut',
    value: function zoomOut() {
      throw new Error('Zoom needs to be implemented and actiaved through a plugin');
    }
  }, {
    key: 'getUILayer',
    value: function getUILayer() {
      return _staticLayer;
    }
  }, {
    key: 'getMovableLayer',
    value: function getMovableLayer() {
      return _movableLayer;
    }
  }, {
    key: 'addObjectsForSelection',

    /* For more efficient / smart selection - Interface / API. By default uses quadtree */
    value: function addObjectsForSelection(coordinates, type, object) {
      return 'notImplementedYet';
    }
  }, {
    key: 'removeObjectsForSelection',
    value: function removeObjectsForSelection(coordinates, type, object) {
      return 'notImplementedYet';
    }
  }, {
    key: 'getObjectsUnderPoint',
    value: function getObjectsUnderPoint(coordinates, type) {
      return 'notImplementedYet'; /* Implemented with a plugin */
    }
  }, {
    key: 'getObjectsUnderShape',
    value: function getObjectsUnderShape(coordinates, shape, type) {
      return 'notImplementedYet'; /* Can be implemented if needed. We need more sophisticated quadtree for this */
    }
  }]);

  return Map;
})();

exports.Map = Map;

/** ===== Private functions ===== */
/* This handles the default drawing of the map, so that map always updates when drawOnNextTick === true. This tick
callback is always set and should not be removed or overruled */
function _defaultTick(map, ticker) {
  ticker.add(function (time) {
    if (_drawMapOnNextTick === true) {
      _renderer.render(_stage);
    }
    _drawMapOnNextTick = false;
  });
}

function setFullsizedMap(renderer) {
  renderer.view.style.position = 'absolute';
  renderer.view.style.display = 'block';
  renderer.autoResize = true;
  renderer.resize(window.innerWidth, window.innerHeight);
}

},{"./eventlisteners":95,"./move/map_drag":96,"./pixi_Map_layer":100,"./pixi_Map_stage":101,"./utils/utils":104,"./zoom/pixi_map_zoom":105}],100:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

/**
@require the createjs framework in global namespace
*/

/**
 * @todo this.preventSelection. This should determine wether this stage holds data that can be selected by the player
 */

/**
 * @todo subContainers. Subcontainers are containers inside layers designed to group up objects to smaller containers. So e.g.
 * getObjectsUnderPoint is faster. This has not been efficiently tested from performance wise so the feature will be
 * added after the basic map module works and we can verify the effect well */

/* REMEMBER! PIXI.ParticleContainer has limited support for features (like filters etc.), at some point you have to use
normal container too, but since this one is optimized for performance we use it here first */

var _UIObjects = [];

/* ===== EXPORT ===== */

var Map_layer = (function (_PIXI$Container) {
  /**
   * @param {String} name layer property name, used for identifiying the layer, usefull in debugging, but used also
   * otherwise too!
   * @param {Object} subContainers To be implemented. The data which we use to divide the container to subContainers
   * e.g. for more efficient accessibility of objects based on coordinates.
   * @param {x: Number, y: Number} coord starting coords of layer. Relative to parent map layer.
  */

  function Map_layer(name, subContainers, coord) {
    _classCallCheck(this, Map_layer);

    _get(Object.getPrototypeOf(Map_layer.prototype), "constructor", this).call(this);

    this.x = coord ? coord.x || 0 : 0;
    this.y = coord ? coord.y || 0 : 0;
    this._cacheEnabled = true;
    this.subContainers = subContainers || false; // These should probably be particleContainers
    this.name = "" + name; // For debugging. Shows up in toString
    this.drawThisChild = true;
    this.movable = true;
    this.zoomable = false;
    this.preventSelection = false;
    /* createjs / super properties. Used also for controlling and optimizing the engine */
    this.visible = true;
    this.tickEnabled = false;
    this.tickChildren = false;
    this.mouseChildren = false;
    this.mouseEnabled = false;
  }

  _inherits(Map_layer, _PIXI$Container);

  _createClass(Map_layer, [{
    key: "cacheEnabled",

    /** setter and getter
     * @param {Boolean} status If provided sets the caching status otherwise returns the current status */
    value: function cacheEnabled(status) {
      if (status !== undefined) {
        this._cacheEnabled = status;
      }

      return this._cacheEnabled;
    }
  }, {
    key: "move",

    /** Move layer
     * @param {x: Number, y: Number} coordinates The amount of x and y coordinates we want the layer to move. I.e.
     { x: 5, y: 0 }
     @return this layer instance */
    value: function move(coordinates) {
      if (this.movable) {
        this.x += coordinates.x;
        this.y += coordinates.y;
        this.drawThisChild = true;
      }

      return this;
    }
  }, {
    key: "getChildNamed",
    value: function getChildNamed(name) {
      if (this.children[0] instanceof PIXI.DisplayObjectContainer) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = this.children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var child = _step.value;

            if (child.name.toLowerCase() === name.toLowerCase()) {
              return child;
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator["return"]) {
              _iterator["return"]();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }
      return false;
    }
  }, {
    key: "isUsingSubContainers",
    value: function isUsingSubContainers() {
      return !!this.subContainers;
    }
  }, {
    key: "setScale",
    value: function setScale(amount) {
      return this.scale.x = this.scale.y = amount;
    }
  }, {
    key: "getScale",
    value: function getScale() {
      return this.scale.x;
    }
  }, {
    key: "getUIObjects",
    value: function getUIObjects() {
      return _UIObjects;
    }
  }, {
    key: "emptyUIObjects",
    value: function emptyUIObjects() {
      var _this = this;

      _UIObjects.map(function (obj) {
        _this.removeChild(obj);
        obj = null;
      });

      return _UIObjects;
    }
  }, {
    key: "addUIObjects",
    value: function addUIObjects(objects) {
      _UIObjects = _UIObjects || [];
      if (Array.isArray(objects)) {
        this.addChild.apply(this, objects);
      } else {
        this.addChild(objects);
      }
      _UIObjects.push(objects);

      return _UIObjects;
    }
  }]);

  return Map_layer;
})(PIXI.Container);

exports.Map_layer = Map_layer;

var Map_subLayer = (function (_PIXI$ParticleContainer) {
  /**
   * @param {String} name layer property name, used for identifiying the layer, usefull in debugging, but used also
   * otherwise too!
   * @param {Object} subContainers To be implemented. The data which we use to divide the container to subContainers
   * e.g. for more efficient accessibility of objects based on coordinates.
   * @param {x: Number, y: Number} coord starting coords of layer. Relative to parent map layer.
  */

  function Map_subLayer(name, subContainers, coord) {
    _classCallCheck(this, Map_subLayer);

    _get(Object.getPrototypeOf(Map_subLayer.prototype), "constructor", this).call(this);

    this.x = coord ? coord.x || 0 : 0;
    this.y = coord ? coord.y || 0 : 0;
    this._cacheEnabled = true;
    this.subContainers = subContainers || false; // These should probably be particleContainers
    this.name = "" + name; // For debugging. Shows up in toString
    this.drawThisChild = true;
    this.movable = true;
    this.zoomable = false;
    this.preventSelection = false;
    /* createjs / super properties. Used also for controlling and optimizing the engine */
    this.visible = true;
    this.tickEnabled = false;
    this.tickChildren = false;
    this.mouseChildren = false;
    this.mouseEnabled = false;
  }

  _inherits(Map_subLayer, _PIXI$ParticleContainer);

  _createClass(Map_subLayer, [{
    key: "cacheEnabled",

    /** setter and getter
     * @param {Boolean} status If provided sets the caching status otherwise returns the current status */
    value: function cacheEnabled(status) {
      if (status !== undefined) {
        this._cacheEnabled = status;
      }

      return this._cacheEnabled;
    }
  }, {
    key: "move",

    /** Move layer
     * @param {x: Number, y: Number} coordinates The amount of x and y coordinates we want the layer to move. I.e.
     { x: 5, y: 0 }
     @return this layer instance */
    value: function move(coordinates) {
      if (this.movable) {
        this.x += coordinates.x;
        this.y += coordinates.y;
        this.drawThisChild = true;
      }

      return this;
    }
  }, {
    key: "getChildNamed",
    value: function getChildNamed(name) {
      if (this.children[0] instanceof PIXI.DisplayObjectContainer) {
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = this.children[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var child = _step2.value;

            if (child.name.toLowerCase() === name.toLowerCase()) {
              return child;
            }
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2["return"]) {
              _iterator2["return"]();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }
      }
      return false;
    }
  }, {
    key: "isUsingSubContainers",
    value: function isUsingSubContainers() {
      return !!this.subContainers;
    }
  }, {
    key: "setScale",
    value: function setScale(amount) {
      return this.scale.x = this.scale.y = amount;
    }
  }, {
    key: "getScale",
    value: function getScale() {
      return this.scale.x;
    }
  }, {
    key: "getUIObjects",
    value: function getUIObjects() {
      return _UIObjects;
    }
  }, {
    key: "emptyUIObjects",
    value: function emptyUIObjects() {
      var _this2 = this;

      _UIObjects.map(function (obj) {
        _this2.removeChild(obj);
        obj = null;
      });

      return _UIObjects;
    }
  }, {
    key: "addUIObjects",
    value: function addUIObjects(objects) {
      _UIObjects = _UIObjects || [];
      if (Array.isArray(objects)) {
        this.addChild.apply(this, objects);
      } else {
        this.addChild(objects);
      }
      _UIObjects.push(objects);

      return _UIObjects;
    }
  }]);

  return Map_subLayer;
})(PIXI.ParticleContainer);

exports.Map_subLayer = Map_subLayer;

},{}],101:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

/**
@require the createjs framework in global namespace
*/

/* ===== EXPORT ===== */

var Map_stage = (function (_PIXI$Container) {
  /**
   * @param {String} name layer property name, used for identifiying the layer, usefull in debugging, but used also
   * otherwise too!
   * @param {DOM Canvas element} canvas REQUIRED! Canvas element used by the map
   * @param {x: Number, y: Number} stageBounds Set stage bounds based on these coordinates
  */

  function Map_stage(name, canvas, renderer) {
    _classCallCheck(this, Map_stage);

    if (!canvas) {
      throw new Error(Map_stage.constructor.name + " needs canvas!");
    }

    _get(Object.getPrototypeOf(Map_stage.prototype), "constructor", this).call(this);

    if (typeof canvas === "string") {
      this.canvas = document.querySelector(canvas);
    } else {
      this.canvas = canvas;
    }
    this.renderer = renderer;

    this._cacheEnabled = true;
    this.name = "" + name; // For debugging AND getting children by name. Shows up in toString
    /* createjs / super properties. Used also for controlling and optimizing the engine */
    this.tickEnabled = false;
    this.tickOnUpdate = false;
    this.tickChildren = false;
    this.mouseChildren = false;
    this.mouseEnabled = false;
    this.mouseEnabled = true;
    //this.drawRect = MAYBE THIS should be the area of the canvas size? So the whole stage isn't drawn only visible part?
  }

  _inherits(Map_stage, _PIXI$Container);

  _createClass(Map_stage, [{
    key: "cacheEnabled",

    /** setter and getter
     * @param {Boolean} status If provided sets the caching status otherwise returns the current status */
    value: function cacheEnabled(status) {
      if (status !== undefined) {
        this._cacheEnabled = status;
      }

      return this._cacheEnabled;
    }
  }, {
    key: "ChildNamed",
    value: function ChildNamed(name) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var layer = _step.value;

          var child = undefined;

          if (layer.name.toLowerCase() === name.toLowerCase()) {
            return layer;
          }

          if (child = layer.getChildNamed(name)) {
            return child;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"]) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return false;
    }
  }]);

  return Map_stage;
})(PIXI.Container);

exports.Map_stage = Map_stage;

/**
 * @todo implement spriteStage! It should be more efficient when using spritesheets. Only issue was that minified
 * easeljs doesn't have the spriteStage and neither the node-easel (and node doesn't have the extend) */

},{}],102:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var Object_sprite = (function (_PIXI$Sprite) {
  function Object_sprite(coords, data, currentFrame, throwShadowOptions) {
    _classCallCheck(this, Object_sprite);

    _get(Object.getPrototypeOf(Object_sprite.prototype), "constructor", this).call(this, currentFrame);
    this.name = "Objects_sprite_" + this.id;
    this.type = "None";
    this.highlightable = true;
    this.selectable = true;
    /* Set data for the object next */
    this.data = data || {};
    this.currentFrame = currentFrame;
    /* Execute initial draw function */
    //this.innerDraw(coords.x, coords.y);
    this.position.set(coords.x, coords.y);
    /* createjs / super properties. Used also for controlling and optimizing the engine */
    this.setupShadow(throwShadowOptions);

    this.tickEnabled = false;
    this.mouseEnabled = false;
  }

  _inherits(Object_sprite, _PIXI$Sprite);

  _createClass(Object_sprite, [{
    key: "innerDraw",

    /** Drawing the object with createjs-methods
     * @param {Number} x coordinate x
     * @param {Number} y coordinate y
     * @return this object instance */
    value: function innerDraw(x, y) {
      this.fromFrame(this.currentFrame);
      this.x = x;
      this.y = y;

      return this;
    }
  }, {
    key: "drawNewFrame",

    /** Draws new frame to animate or such
     * @param {Number} x coordinate x
     * @param {Number} y coordinate y
     * @param {Number} newFrameNumber New frame number to animate to
     * @return this object instance */
    value: function drawNewFrame(x, y, newFrame) {
      this.currentFrame = newFrame;

      return this.innerDraw(x, y);
    }
  }, {
    key: "setupShadow",
    value: function setupShadow() {
      var options = arguments[0] === undefined ? { color: "#000000", offsetX: 5, offsetY: 5, blur: 10 } : arguments[0];

      if (this.throwShadow === true) {
        console.warn("NO SHADOW FUNCTION SET!");
      }
    }
  }]);

  return Object_sprite;
})(PIXI.Sprite);

exports.Object_sprite = Object_sprite;

},{}],103:[function(require,module,exports){
/** We want to put spritesheets to their own module, so they are separated and e.g. we can remove createjs from the
 * spritesheet if needed */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.spritesheetList = spritesheetList;
/* Singleton so we don't use class definition */

function spritesheetList() {
  var scope = {};

  /** Create new spritesheet (new createjs.SpriteSheet()) and keeps it in object collection. So we don't create acciden-
   * tally another one and we can safely remove it later.
   * @param {Object} spritesheetData Object that contains createjs-compatible spritesheetData
   * @return new spritesheet instance to use. */
  scope.createSpritesheet = function createSpritesheet(spritesheetData) {
    var promise = Q.defer();
    var loader = PIXI.loader;

    loader.add('/assets/img/map/testHexagons/pixi_testHexagonSpritesheet.json');

    loader.once('complete', onComplete);

    loader.load();

    return promise.promise;

    function onComplete() {
      promise.resolve(true);
    }
  };

  return scope;
}

},{}],104:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/** The core utils for the 2D map engine. */

var mouseUtils = (function mouseUtils() {
  var scope = {};

  /** This function is from: http://www.adomas.org/javascript-mouse-wheel/, but modified for todays browsers
    It detects which way the mousewheel has been moved.
    zero delta = mouse wheel not moved
    positive delta = scrolled up
    negative delta = scrolled down
     @param {Event} event pass the event to deltaFromWheel
    @return delta. Positive if wheel was scrolled up, and negative, if wheel was scrolled down. */
  scope.deltaFromWheel = function (event) {
    var delta = 0;

    event = event ? event : window.event; /* For IE. */

    if (event.deltaY > 99) {
      /* IE/Opera. */
      delta = event.deltaY / 100;
    } else if (event.deltaY <= 99) {
      delta = event.deltaY;
    }

    /* If delta is nonzero, handle it, otherwise scrap it Basically, delta is now positive if
    wheel was scrolled up, and negative, if wheel was scrolled down. */
    if (delta) return delta;
  };
  /** Has the mouse click been right mouse button
   * @param {Event} event The event where the click occured */
  scope.isRightClick = function (event) {
    var rightclick;

    event = event ? event : window.event; /* For IE. */
    if (event.buttons) rightclick = event.buttons == 2;else if (event.which) rightclick = event.which == 3;else if (event.button) rightclick = event.button == 2;

    if (rightclick) return true;

    return false;
  };
  scope.getEventCoordsOnPage = function (e) {
    return {
      x: e.pageX,
      y: e.pageY
    };
  };

  return scope;
})();
exports.mouseUtils = mouseUtils;
var resizeUtils = {
  toggleFullScreen: function toggleFullScreen() {
    var elem = document.body; // Make the body go full screen.
    var isInFullScreen = document.fullScreenElement && document.fullScreenElement !== null || (document.mozFullScreen || document.webkitIsFullScreen);

    isInFullScreen ? cancelFullScreen(document) : requestFullScreen(elem);

    return false;

    // Sub functions
    function cancelFullScreen(el) {
      var requestMethod = el.cancelFullScreen || el.webkitCancelFullScreen || el.mozCancelFullScreen || el.exitFullscreen;
      if (requestMethod) {
        // cancel full screen.
        requestMethod.call(el);
      } else if (typeof window.ActiveXObject !== "undefined") {
        // Older IE.
        var wscript = new ActiveXObject("WScript.Shell");
        wscript !== null && wscript.SendKeys("{F11}");
      }
    }

    function requestFullScreen(el) {
      // Supports most browsers and their versions.
      var requestMethod = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullScreen;

      if (requestMethod) {
        // Native full screen.
        requestMethod.call(el);
      } else if (typeof window.ActiveXObject !== "undefined") {
        // Older IE.
        var wscript = new ActiveXObject("WScript.Shell");
        wscript !== null && wscript.SendKeys("{F11}");
      }
      return false;
    }
  },
  /** Sets canvas size to maximum width and height on the browser, not using fullscreen
   * @param {DOMElement Canvas context} context */
  setToFullSize: function setToFullSize(context) {
    return function fullSize() {
      var size = _getWindowSize();

      context.canvas.width = size.x;
      context.canvas.height = size.y;
    };
  },
  getWindowSize: _getWindowSize
};
exports.resizeUtils = resizeUtils;
var environmentDetection = (function () {
  var scope = {};

  scope.isMobile = function () {
    var screenSize = screen.width <= 640 || window.matchMedia && window.matchMedia("only screen and (max-width: 640px)").matches;
    var features = "ontouchstart" in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;

    return features && screenSize;
  };
  /** modified code from http://detectmobilebrowsers.com/ */
  scope.isMobile_detectUserAgent = function () {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;

    return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(userAgent.substr(0, 4));
  };

  return scope;
})();

exports.environmentDetection = environmentDetection;
/** ===== PRIVATE ===== */
function _getWindowSize() {
  return {
    x: window.innerWidth,
    y: window.innerHeight
  };
}

},{}],105:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

/** The core plugin for the 2D map engine. Handles zooming for the map. Core plugins can always be overwrote if needed */

/** @todo Change the map move after zooming to be mouse based or such. Now it is based on the map corners coordinates */

/** ===== OWN imports ===== */

var _utilsUtilsJs = require('../utils/utils.js');

var _eventlisteners = require('../eventlisteners');

'user strict';var map_zoom = (function map_zoom() {
  /* Maximum and minimum the player can zoomt he map */
  var zoomLimit = {
    farther: 0.4,
    closer: 2.5
  };
  /* How much one step of zooming affects: */
  var zoomModifier = 0.1;

  /* =====================
     MODULE API (in scope)
     ===================== */
  var scope = {};
  scope.pluginName = 'map_zoom';

  /** Required init functions for the plugin
  * @param {Map object} mapObj - the Map class object */
  scope.init = function (map) {
    map.setPrototype('zoomIn', zoomIn);
    map.setPrototype('zoomOut', zoomOut);
    /* @todo think through should these be in map.prototype? But zoomLimit and modifier need to be setable in creation,
    init or later with setters */
    map.setPrototype('setZoomLimits', setZoomLimits);
    map.setPrototype('setZoomModifier', setZoomModifier);

    if (map.mapEnvironment() === 'mobile') {
      map.eventCBs.zoom = _setupZoomEvent_mobile(map);
    } else {
      map.eventCBs.zoom = _setupZoomEvent(map);
    }

    /* Singleton should have been instantiated before, we only retrieve it with 0 params */
    (0, _eventlisteners.eventListeners)().toggleZoomListener();
  };

  /* ======================================
     private functions revealed for testing
     ======================================*/
  //scope._setupZoomEvent = _setupZoomEvent;

  return scope;

  /* ============================
     PROTOTYPE extensions for map
     ============================*/
  /** How much one mouse wheel step zooms
   * @param {Number} amount How much one mouse wheel step zooms. Needs to be in between 0 - 0.5 */
  function setZoomModifier(amount) {
    if (!(amount > 0 || amount <= 0.5)) {
      throw new Error('Wrong zoom modifier! (needs to be >0 and <=0.5, given:' + amount);
    }
    zoomModifier = amount;

    return this;
  }
  /** How much can be zoomed in maximum and minimum
   * @param {Number 1+} farther How much one mouse wheel step zooms out
   * @param {Number 0 - 1} closer How much one mouse wheel step zooms in */
  function setZoomLimits(farther, closer) {
    zoomLimit.farther = farther;
    zoomLimit.closer = closer;

    return this;
  }
  /** Zoom in to the map
   * @param {Number} amount how much map is zoomed in */
  function zoomIn(amount) {
    var newScale;
    var zoomLayer = this.getZoomLayer();

    if (!_isOverZoomLimit(this.getScale(), true)) {
      newScale = zoomLayer.scale.y = zoomLayer.scale.x += amount || zoomModifier;
    }

    return newScale;
  }
  /** Zoom out of the map
   * @param {Number} amount how much map is zoomed out */
  function zoomOut(amount) {
    var newScale;
    var zoomLayer = this.getZoomLayer();

    if (!_isOverZoomLimit(this.getScale())) {
      newScale = zoomLayer.scale.y = zoomLayer.scale.x -= amount || zoomModifier;
    }

    return newScale;
  }

  /* ============
     Initializers
     ============ */
  function _setupZoomEvent(map) {
    return function handleZoomEvent(e, delta, deltaX, deltaY) {
      var mouseWheelDelta = deltaY;
      /* We use old scale, since the scale really changes when the map is drawn. So we must make calculations with the
      old scale now */
      var oldScale = map.getScale();

      /* No nasty scrolling side-effects */
      e.preventDefault();

      if (mouseWheelDelta > 0) {
        if (map.zoomIn()) {
          map.moveMap(_calculateCenterMoveCoordinates(oldScale, true));
        }
      } else if (mouseWheelDelta < 0) {
        if (map.zoomOut()) {
          map.moveMap(_calculateCenterMoveCoordinates(oldScale));
        }
      }

      // no need when we use map.move:
      //map.drawOnNextTick();
    };
  }

  function _setupZoomEvent_mobile(map) {
    zoomModifier = zoomModifier * 0.5;
    var initialized = false;
    var difference = {};

    return function handleZoomEvent_mobile(e) {
      var pointers = e.pointers;
      var coords = [{
        x: pointers[0].pageX,
        y: pointers[0].pageY
      }, {
        x: pointers[1].pageX,
        y: pointers[1].pageY
      }];
      var changeX = Math.abs(coords[0].x - coords[1].x);
      var changeY = Math.abs(coords[0].y - coords[1].y);

      e.preventDefault();

      try {
        if (!initialized) {
          difference = {
            x: changeX,
            y: changeY
          };
          initialized = true;

          return;
        } else if (e.isFinal === true) {
          alert('STOP');
          initialized = false;
        }

        if (difference.x + difference.y < changeX + changeY) {
          if (map.zoomIn(undefined)) {
            map.moveMap(_calculateCenterMoveCoordinates(map.getScale(), true));
          }
        } else {
          if (map.zoomOut(undefined)) {
            map.moveMap(_calculateCenterMoveCoordinates(map.getScale()));
          }
        }

        // no need when we use map.move:
        //map.drawOnNextTick();

        difference = {
          x: changeX,
          y: changeY
        };
      } catch (e) {
        console.log('Error! ', e);
      }
    };
  }

  /* =================
     Private functions
     ================= */
  function _isOverZoomLimit(amount, isZoomIn) {
    if (isZoomIn && amount > zoomLimit.closer || !isZoomIn && amount < zoomLimit.farther) {
      return true;
    }

    return false;
  }
  function _calculateCenterMoveCoordinates(scale, isZoomIn) {
    var windowSize = _utilsUtilsJs.resizeUtils.getWindowSize();
    var halfWindowSize = {
      x: windowSize.x / 2 / scale,
      y: windowSize.y / 2 / scale
    };
    var realMovement = {
      x: halfWindowSize.x * (isZoomIn ? -zoomModifier : zoomModifier),
      y: halfWindowSize.y * (isZoomIn ? -zoomModifier : zoomModifier)
    };

    return realMovement;
  }
})();
exports.map_zoom = map_zoom;

},{"../eventlisteners":95,"../utils/utils.js":104}],106:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.setupHexagonClick = setupHexagonClick;
/**
 * @require Browser that support pointer events or Pointer events polyfill, such as: https://github.com/jquery/PEP */

var _coreEventlisteners = require('../../../core/eventlisteners');

var _coreUtilsUtils = require('../../../core/utils/utils');

/* eventlisteners is a singleton, so we might as well declare it here */
var eventlisteners;

function setupHexagonClick(map, callback) {
  /* Singleton should have been instantiated before, we only retrieve it with 0 params! */
  eventlisteners = (0, _coreEventlisteners.eventListeners)();

  if (map.mapEnvironment() === 'mobile') {
    map.eventCBs.select = setupTapListener(map, callback);
  } else {
    map.eventCBs.select = mouseDownListener;
  }
  eventlisteners.toggleSelectListener();

  return false;

  function mouseDownListener() {
    onMouseUp(map, callback);
  }
  function setupTapListener(map, callback) {
    return function tapListener(e) {
      var touchCoords = e.center;
      var globalCoords = {
        x: touchCoords.x, y: touchCoords.y

      };
      var objects;

      objects = map.getObjectsUnderMapPoint(globalCoords);

      if (objects && objects.length > 0) {
        callback(objects);
      }
    };
  }
}

function onMouseUp(map, callback) {
  map.canvas.addEventListener('mouseup', retrieveClickData);

  function retrieveClickData(e) {
    if (map.mapMoved()) {
      map.canvas.removeEventListener('mouseup', retrieveClickData);
      return false;
    }

    var globalCoords = _coreUtilsUtils.mouseUtils.getEventCoordsOnPage(e);
    var objects;

    objects = map.getObjectsUnderMapPoint(globalCoords);

    if (objects && objects.length > 0) {
      callback(objects);
    }

    map.canvas.removeEventListener('mouseup', retrieveClickData);
  }
}

},{"../../../core/eventlisteners":95,"../../../core/utils/utils":104}],107:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utilsPixi_createHexagon = require('../utils/pixi_createHexagon');

var _utilsHexagonMath = require('../utils/hexagonMath');

var _utilsHexagonMath2 = _interopRequireDefault(_utilsHexagonMath);

var shape;

var object_sprite_hexa = {
  build: function calculateHexa(radius) {
    if (!radius) {
      throw new Error('Need radius!');
    }

    var HEIGHT = _utilsHexagonMath2['default'].calcHeight(radius);
    var SIDE = _utilsHexagonMath2['default'].calcSide(radius);

    this.anchor.set(0.5, 0.5);
    this.HEIGHT = HEIGHT;
    this.SIDE = SIDE;

    /* Draw hexagon to test the hits with hitArea */
    this.hitArea = setAndGetShape(radius);
  }
};

exports.object_sprite_hexa = object_sprite_hexa;
function setAndGetShape(radius) {
  if (!shape) {
    var hexagonSize = _utilsHexagonMath2['default'].getHexaSize(radius);
    /* x and y are reversed, since this is horizontal hexagon and calculations are for vertical */
    shape = (0, _utilsPixi_createHexagon.createHexagon)({
      x: hexagonSize.y / 2,
      y: hexagonSize.x / 2 }, radius);
  }

  return shape;
}

},{"../utils/hexagonMath":111,"../utils/pixi_createHexagon":112}],108:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _get = function get(_x3, _x4, _x5) { var _again = true; _function: while (_again) { var object = _x3, property = _x4, receiver = _x5; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x3 = parent; _x4 = property; _x5 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _pixi_Object_hexa = require('./pixi_Object_hexa');

var _coreObjectsPixi_Object_sprite_terrain = require('../../../core/objects/pixi_Object_sprite_terrain');

var Object_terrain = (function (_Object_sprite_terrain) {
  function Object_terrain(_x, data, currentFrameNumber) {
    var coords = arguments[0] === undefined ? { x: 0, y: 0 } : arguments[0];
    var extra = arguments[3] === undefined ? { radius: 0 } : arguments[3];

    _classCallCheck(this, Object_terrain);

    _get(Object.getPrototypeOf(Object_terrain.prototype), 'constructor', this).call(this, coords, data, currentFrameNumber);

    this.name = 'DefaultTerrainObject_hexa';

    _pixi_Object_hexa.object_sprite_hexa.build.call(this, extra.radius);
  }

  _inherits(Object_terrain, _Object_sprite_terrain);

  return Object_terrain;
})(_coreObjectsPixi_Object_sprite_terrain.Object_sprite_terrain);

exports.Object_terrain = Object_terrain;

},{"../../../core/objects/pixi_Object_sprite_terrain":97,"./pixi_Object_hexa":107}],109:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _get = function get(_x3, _x4, _x5) { var _again = true; _function: while (_again) { var object = _x3, property = _x4, receiver = _x5; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x3 = parent; _x4 = property; _x5 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _pixi_Object_hexa = require('./pixi_Object_hexa');

var _coreObjectsPixi_Object_sprite_unit = require('../../../core/objects/pixi_Object_sprite_unit');

var Object_unit = (function (_Object_sprite_unit) {
  function Object_unit(_x, data, currentFrameNumber) {
    var coords = arguments[0] === undefined ? { x: 0, y: 0 } : arguments[0];
    var extra = arguments[3] === undefined ? { radius: 0 } : arguments[3];

    _classCallCheck(this, Object_unit);

    _get(Object.getPrototypeOf(Object_unit.prototype), 'constructor', this).call(this, coords, data, currentFrameNumber);

    this.name = 'DefaultUnitObjects_hexa';

    _pixi_Object_hexa.object_sprite_hexa.build.call(this, extra.radius);
  }

  _inherits(Object_unit, _Object_sprite_unit);

  return Object_unit;
})(_coreObjectsPixi_Object_sprite_unit.Object_sprite_unit);

exports.Object_unit = Object_unit;

},{"../../../core/objects/pixi_Object_sprite_unit":98,"./pixi_Object_hexa":107}],110:[function(require,module,exports){
/*Calculate the coordinates of the center hexagon always and get objects based on the coordinates. For example with
  some method like getAllObjectsInHexagon.
SO:
We create a function for layers, like "map_utils_hexagon? -> getHexagonCoordsFromClick(x,y), getObjectsInHexagon(hexagon?)"
- There we only find out about the coordinates for the object, we dont use getOBjectUnderPoint. If the coords equal to
those gotten from: getHexagonCoordsFromClick, then that object is added to returned array. We can also cache these if
needed for performance

HOW we do the whole organizational stuff?
- map_move
- map_utils_hexagon? -> getHexagonCoordsFromClick(x,y), getObjectsInHexagon(hexagon?)
*/

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
//import { map_coords_horizontalHex } from '../coordinates/Map_coords_horizontalHex';

var _eventListenersSelect = require('../eventListeners/select');

var _coreUI = require('../../../core/UI');

var object_select_hexagon = (function object_select_hexagon() {
  var scope = {};
  scope.pluginName = 'object_select';

  /**
   * @param {Map object} mapObj - the Map class object
   */
  scope.init = function (mapObj) {
    /* We take the top-most stage on the map and add the listener to it */
    _createPrototypes(mapObj);

    _startClickListener(mapObj);
  };

  return scope;

  function getObjectsForMap(clickCoords) {
    var objects = this.getStage().getObjectsUnderPoint(clickCoords.x, clickCoords.y);

    return objects;
  }
  function getObjectsForLayer(clickCoords) {
    return this.children.filter(function (child) {
      if (child.x === clickCoords.x && child.y === clickCoords.y) {
        return true;
      }

      return false;
    });
  }
  /* ====== Private functions ====== */
  /**
   * Attached the correct prototypes to map. I do not think we need to override getObjectsUnderPoint for stages.
   *
   * @param {createjs.Stage} topMostStage - createjs.Stage object, that is the topmost on the map (meant for interaction).
   * @param {Map} map - The Map class object
   */
  function _createPrototypes(map) {
    map.setPrototype('getObjectsUnderMapPoint', getObjectsForMap);
    map.setPrototype('getObjectsUnderPoint', getObjectsForLayer);
  }
  /**
   * @param {createjs.Stage} topMostStage - createjs.Stage object, that is the topmost on the map (meant for interaction).
   * @param {Map} map - The Map class object
   */
  function _startClickListener(map) {
    var singletonUI = (0, _coreUI.UI)();

    return (0, _eventListenersSelect.setupHexagonClick)(map, singletonUI.showSelections);
  }
})();
exports.object_select_hexagon = object_select_hexagon;

},{"../../../core/UI":94,"../eventListeners/select":106}],111:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calcHeight = calcHeight;
exports.calcSide = calcSide;
exports.setCellByPoint = setCellByPoint;
exports.getHexaSize = getHexaSize;
exports.toHexaCenterCoord = toHexaCenterCoord;
/* NOTE: These calculations are for vertical hexagons */

function calcHeight(radius) {
  return radius * Math.sqrt(3);
}

function calcSide(radius) {
  return radius * 3 / 2;
}

/* Modified From java example: http://blog.ruslans.com/2011/02/hexagonal-grid-math.html
   This is supposed to calculate the correct hexagonal index, that represents the hexagon the player clicked */

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

function getHexaSize(radius) {
  return {
    radius: radius,
    x: radius * 2,
    y: radius * Math.sqrt(3)
  };
}

function toHexaCenterCoord(hexRadius, x, y) {
  var hexaSize = getHexaSize(hexRadius);
  var radius = hexaSize.radius;
  var halfHexaSize = {
    x: hexaSize.radius,
    y: hexaSize.y * 0.5
  };
  var centerCoords = {};
  var coordinateIndexes;

  coordinateIndexes = setCellByPoint(radius, x, y);

  if (coordinateIndexes.x < 0 && coordinateIndexes.x < 0) {
    throw new Error("click outside of the hexagon area");
  }
  centerCoords = {
    x: Math.round(coordinateIndexes.x * hexaSize.x + halfHexaSize.x),
    y: Math.round(coordinateIndexes.y * hexaSize.y + halfHexaSize.y)
  };

  return centerCoords;
}

;

exports["default"] = {
  calcHeight: calcHeight,
  calcSide: calcSide,
  setCellByPoint: setCellByPoint,
  getHexaSize: getHexaSize,
  toHexaCenterCoord: toHexaCenterCoord
};

},{}],112:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.createHexagon = createHexagon;
/** Credits belogn to: https://github.com/alforno-productions/HexPixiJs/blob/master/lib/hexPixi.js */

function createHexagon(_x, radius) {
    var coords = arguments[0] === undefined ? { x: 0, y: 0 } : arguments[0];
    var angle = arguments[2] === undefined ? 30 : arguments[2];
    var isFlatTop = arguments[3] === undefined ? false : arguments[3];

    var i = 0,
        offset = isFlatTop ? 0 : 0.5,
        angle = 2 * Math.PI / 6 * offset,
        center = coords,
        x = center.x * Math.cos(angle),
        y = center.y * Math.sin(angle),
        points = [];

    points.push(new PIXI.Point(x, y));

    for (i = 1; i < 7; i++) {
        angle = 2 * Math.PI / 6 * (i + offset);
        x = center.x * Math.cos(angle);
        y = center.y * Math.sin(angle);

        points.push(new PIXI.Point(x, y));
    }

    return new PIXI.Polygon(points);
}

},{}],113:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var gameData = {
  ID: "53837d47976fed3b24000005",
  turn: 1,
  mapSize: { x: 50, y: 20 },
  pluginsToActivate: {
    map: ["map_drag", "object_select_hexagon"]
  }
};
exports.gameData = gameData;

},{}],114:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
   value: true
});
var mapData = {
   gameID: "53837d47976fed3b24000005",
   turn: 1,
   startPoint: { x: 0, y: 0 },
   element: "#mapCanvas",
   layers: [{
      type: "Map_layer",
      coord: { x: 0, y: 0 },
      name: "terrainBaseLayer",
      specials: [{
         "interactive": false
      }],
      options: {
         cache: true
      },
      objectGroups: [{
         type: "Object_terrain",
         name: "TerrainBase", // I guess only for debugging?
         typeImageData: "terrainBase",
         objects: [{
            "objType": 0,
            "name": "swamp",
            "_id": "53837d49976fed3b240006b8",
            "coord": {
               "x": "0",
               "y": "0"
            },
            "data": {},
            "lastSeenTurn": "1"
         }, {
            "objType": 1,
            "name": "swamp",
            "_id": "53837d49976fed3b240006bd",
            "coord": {
               "x": "0",
               "y": "140"
            },
            "data": {},
            "lastSeenTurn": "1"
         }, {
            "objType": 2,
            "name": "tundra",
            "_id": "53837d49976fed3b240006c2",
            "coord": {
               "x": "41",
               "y": "70"
            },
            "data": {},
            "lastSeenTurn": "1"
         }, {
            "objType": 3,
            "name": "forest",
            "_id": "53837d49976fed3b240006c7",
            "coord": {
               "x": "82",
               "y": "140"
            },
            "data": {},
            "lastSeenTurn": "1"
         }]
      }]
   }]
};
exports.mapData = mapData;

},{}],115:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var typeData = {
  "graphicData": {
    "terrainBase": {
      "json": "/assets/img/map/testHexagons/pixi_testHexagonSpritesheet.json"
    }
  },
  "objectData": {
    "terrainBase": [{
      "image": "terrain_blueHexagon.png", "attachedToTerrains": ["0"], "propability": "100%", "name": "forDebugging - terrainBase 0"
    }, {
      "image": "terrain_greenHexagon.png", "attachedToTerrains": ["2"], "propability": "100%", "name": "forDebugging - terrainBase 1"
    }, {
      "image": "terrain_redHexagon.png", "attachedToTerrains": ["1"], "propability": "100%", "name": "forDebugging - terrainBase 2"
    }, {
      "image": "terrain_yellowHexagon.png", "attachedToTerrains": ["4"], "propability": "100%", "name": "forDebugging - terrainBase 3"
    }]
  }
};
exports.typeData = typeData;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvdmFyL3d3dy93YXJNYXBFbmdpbmUvcHVibGljL3Rlc3RzL21hbnVhbC9waXhpX2NyZWF0ZU1hcC10ZXN0LmVzNi5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9saWIvYmFiZWwvcG9seWZpbGwuanMiLCJub2RlX21vZHVsZXMvYmFiZWwvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy8kLmFycmF5LWluY2x1ZGVzLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsL25vZGVfbW9kdWxlcy9iYWJlbC1jb3JlL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvJC5hcnJheS1tZXRob2RzLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsL25vZGVfbW9kdWxlcy9iYWJlbC1jb3JlL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvJC5hc3NlcnQuanMiLCJub2RlX21vZHVsZXMvYmFiZWwvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy8kLmFzc2lnbi5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzLyQuY29mLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsL25vZGVfbW9kdWxlcy9iYWJlbC1jb3JlL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvJC5jb2xsZWN0aW9uLXN0cm9uZy5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzLyQuY29sbGVjdGlvbi10by1qc29uLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsL25vZGVfbW9kdWxlcy9iYWJlbC1jb3JlL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvJC5jb2xsZWN0aW9uLXdlYWsuanMiLCJub2RlX21vZHVsZXMvYmFiZWwvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy8kLmNvbGxlY3Rpb24uanMiLCJub2RlX21vZHVsZXMvYmFiZWwvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy8kLmN0eC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzLyQuZGVmLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsL25vZGVfbW9kdWxlcy9iYWJlbC1jb3JlL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvJC5kb20tY3JlYXRlLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsL25vZGVfbW9kdWxlcy9iYWJlbC1jb3JlL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvJC5lbnVtLWtleXMuanMiLCJub2RlX21vZHVsZXMvYmFiZWwvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy8kLmZvci1vZi5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzLyQuZncuanMiLCJub2RlX21vZHVsZXMvYmFiZWwvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy8kLmludm9rZS5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzLyQuaXRlci1jYWxsLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsL25vZGVfbW9kdWxlcy9iYWJlbC1jb3JlL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvJC5pdGVyLWRlZmluZS5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzLyQuaXRlci1kZXRlY3QuanMiLCJub2RlX21vZHVsZXMvYmFiZWwvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy8kLml0ZXIuanMiLCJub2RlX21vZHVsZXMvYmFiZWwvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy8kLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsL25vZGVfbW9kdWxlcy9iYWJlbC1jb3JlL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvJC5rZXlvZi5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzLyQubWl4LmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsL25vZGVfbW9kdWxlcy9iYWJlbC1jb3JlL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvJC5vd24ta2V5cy5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzLyQucGFydGlhbC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzLyQucmVkZWYuanMiLCJub2RlX21vZHVsZXMvYmFiZWwvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy8kLnJlcGxhY2VyLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsL25vZGVfbW9kdWxlcy9iYWJlbC1jb3JlL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvJC5zZXQtcHJvdG8uanMiLCJub2RlX21vZHVsZXMvYmFiZWwvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy8kLnNoYXJlZC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzLyQuc3BlY2llcy5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzLyQuc3RyaW5nLWF0LmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsL25vZGVfbW9kdWxlcy9iYWJlbC1jb3JlL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvJC5zdHJpbmctcGFkLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsL25vZGVfbW9kdWxlcy9iYWJlbC1jb3JlL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvJC5zdHJpbmctcmVwZWF0LmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsL25vZGVfbW9kdWxlcy9iYWJlbC1jb3JlL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvJC50YXNrLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsL25vZGVfbW9kdWxlcy9iYWJlbC1jb3JlL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvJC50aHJvd3MuanMiLCJub2RlX21vZHVsZXMvYmFiZWwvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy8kLnVpZC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzLyQudW5zY29wZS5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzLyQud2tzLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsL25vZGVfbW9kdWxlcy9iYWJlbC1jb3JlL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM1LmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsL25vZGVfbW9kdWxlcy9iYWJlbC1jb3JlL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LmFycmF5LmNvcHktd2l0aGluLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsL25vZGVfbW9kdWxlcy9iYWJlbC1jb3JlL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LmFycmF5LmZpbGwuanMiLCJub2RlX21vZHVsZXMvYmFiZWwvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuYXJyYXkuZmluZC1pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5hcnJheS5maW5kLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsL25vZGVfbW9kdWxlcy9iYWJlbC1jb3JlL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LmFycmF5LmZyb20uanMiLCJub2RlX21vZHVsZXMvYmFiZWwvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuYXJyYXkuaXRlcmF0b3IuanMiLCJub2RlX21vZHVsZXMvYmFiZWwvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuYXJyYXkub2YuanMiLCJub2RlX21vZHVsZXMvYmFiZWwvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuYXJyYXkuc3BlY2llcy5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5mdW5jdGlvbi5oYXMtaW5zdGFuY2UuanMiLCJub2RlX21vZHVsZXMvYmFiZWwvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuZnVuY3Rpb24ubmFtZS5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5tYXAuanMiLCJub2RlX21vZHVsZXMvYmFiZWwvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYubWF0aC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5udW1iZXIuY29uc3RydWN0b3IuanMiLCJub2RlX21vZHVsZXMvYmFiZWwvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYubnVtYmVyLnN0YXRpY3MuanMiLCJub2RlX21vZHVsZXMvYmFiZWwvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYub2JqZWN0LmFzc2lnbi5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5vYmplY3QuaXMuanMiLCJub2RlX21vZHVsZXMvYmFiZWwvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYub2JqZWN0LnNldC1wcm90b3R5cGUtb2YuanMiLCJub2RlX21vZHVsZXMvYmFiZWwvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYub2JqZWN0LnN0YXRpY3MtYWNjZXB0LXByaW1pdGl2ZXMuanMiLCJub2RlX21vZHVsZXMvYmFiZWwvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYub2JqZWN0LnRvLXN0cmluZy5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5wcm9taXNlLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsL25vZGVfbW9kdWxlcy9iYWJlbC1jb3JlL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnJlZmxlY3QuanMiLCJub2RlX21vZHVsZXMvYmFiZWwvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYucmVnZXhwLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsL25vZGVfbW9kdWxlcy9iYWJlbC1jb3JlL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnNldC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5zdHJpbmcuY29kZS1wb2ludC1hdC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5zdHJpbmcuZW5kcy13aXRoLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsL25vZGVfbW9kdWxlcy9iYWJlbC1jb3JlL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnN0cmluZy5mcm9tLWNvZGUtcG9pbnQuanMiLCJub2RlX21vZHVsZXMvYmFiZWwvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuc3RyaW5nLmluY2x1ZGVzLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsL25vZGVfbW9kdWxlcy9iYWJlbC1jb3JlL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvci5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5zdHJpbmcucmF3LmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsL25vZGVfbW9kdWxlcy9iYWJlbC1jb3JlL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnN0cmluZy5yZXBlYXQuanMiLCJub2RlX21vZHVsZXMvYmFiZWwvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuc3RyaW5nLnN0YXJ0cy13aXRoLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsL25vZGVfbW9kdWxlcy9iYWJlbC1jb3JlL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnN5bWJvbC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi53ZWFrLW1hcC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi53ZWFrLXNldC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNy5hcnJheS5pbmNsdWRlcy5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNy5tYXAudG8tanNvbi5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNy5vYmplY3QuZ2V0LW93bi1wcm9wZXJ0eS1kZXNjcmlwdG9ycy5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNy5vYmplY3QudG8tYXJyYXkuanMiLCJub2RlX21vZHVsZXMvYmFiZWwvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczcucmVnZXhwLmVzY2FwZS5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNy5zZXQudG8tanNvbi5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNy5zdHJpbmcuYXQuanMiLCJub2RlX21vZHVsZXMvYmFiZWwvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczcuc3RyaW5nLmxwYWQuanMiLCJub2RlX21vZHVsZXMvYmFiZWwvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczcuc3RyaW5nLnJwYWQuanMiLCJub2RlX21vZHVsZXMvYmFiZWwvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9qcy5hcnJheS5zdGF0aWNzLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsL25vZGVfbW9kdWxlcy9iYWJlbC1jb3JlL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvd2ViLmRvbS5pdGVyYWJsZS5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL3dlYi5pbW1lZGlhdGUuanMiLCJub2RlX21vZHVsZXMvYmFiZWwvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy93ZWIudGltZXJzLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsL25vZGVfbW9kdWxlcy9iYWJlbC1jb3JlL25vZGVfbW9kdWxlcy9jb3JlLWpzL3NoaW0uanMiLCJub2RlX21vZHVsZXMvYmFiZWwvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL3JlZ2VuZXJhdG9yL3J1bnRpbWUuanMiLCJub2RlX21vZHVsZXMvYmFiZWwvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvcG9seWZpbGwuanMiLCJub2RlX21vZHVsZXMvYmFiZWwvcG9seWZpbGwuanMiLCIvdmFyL3d3dy93YXJNYXBFbmdpbmUvcHVibGljL2NvbXBvbmVudHMvZmFjdG9yaWVzL3BpeGlfaG9yaXpvbnRhbEhleGFGYWN0b3J5LmpzIiwiL3Zhci93d3cvd2FyTWFwRW5naW5lL3B1YmxpYy9jb21wb25lbnRzL21hcC9jb3JlL1VJLmpzIiwiL3Zhci93d3cvd2FyTWFwRW5naW5lL3B1YmxpYy9jb21wb25lbnRzL21hcC9jb3JlL2V2ZW50bGlzdGVuZXJzLmpzIiwiL3Zhci93d3cvd2FyTWFwRW5naW5lL3B1YmxpYy9jb21wb25lbnRzL21hcC9jb3JlL21vdmUvbWFwX2RyYWcuanMiLCIvdmFyL3d3dy93YXJNYXBFbmdpbmUvcHVibGljL2NvbXBvbmVudHMvbWFwL2NvcmUvb2JqZWN0cy9waXhpX09iamVjdF9zcHJpdGVfdGVycmFpbi5qcyIsIi92YXIvd3d3L3dhck1hcEVuZ2luZS9wdWJsaWMvY29tcG9uZW50cy9tYXAvY29yZS9vYmplY3RzL3BpeGlfT2JqZWN0X3Nwcml0ZV91bml0LmpzIiwiL3Zhci93d3cvd2FyTWFwRW5naW5lL3B1YmxpYy9jb21wb25lbnRzL21hcC9jb3JlL3BpeGlfTWFwLmpzIiwiL3Zhci93d3cvd2FyTWFwRW5naW5lL3B1YmxpYy9jb21wb25lbnRzL21hcC9jb3JlL3BpeGlfTWFwX2xheWVyLmpzIiwiL3Zhci93d3cvd2FyTWFwRW5naW5lL3B1YmxpYy9jb21wb25lbnRzL21hcC9jb3JlL3BpeGlfTWFwX3N0YWdlLmpzIiwiL3Zhci93d3cvd2FyTWFwRW5naW5lL3B1YmxpYy9jb21wb25lbnRzL21hcC9jb3JlL3BpeGlfT2JqZWN0LmpzIiwiL3Zhci93d3cvd2FyTWFwRW5naW5lL3B1YmxpYy9jb21wb25lbnRzL21hcC9jb3JlL3BpeGlfc3ByaXRlc2hlZXRMaXN0LmpzIiwiL3Zhci93d3cvd2FyTWFwRW5naW5lL3B1YmxpYy9jb21wb25lbnRzL21hcC9jb3JlL3V0aWxzL3V0aWxzLmpzIiwiL3Zhci93d3cvd2FyTWFwRW5naW5lL3B1YmxpYy9jb21wb25lbnRzL21hcC9jb3JlL3pvb20vcGl4aV9tYXBfem9vbS5qcyIsIi92YXIvd3d3L3dhck1hcEVuZ2luZS9wdWJsaWMvY29tcG9uZW50cy9tYXAvZXh0ZW5zaW9ucy9oZXhhZ29ucy9ldmVudExpc3RlbmVycy9zZWxlY3QuanMiLCIvdmFyL3d3dy93YXJNYXBFbmdpbmUvcHVibGljL2NvbXBvbmVudHMvbWFwL2V4dGVuc2lvbnMvaGV4YWdvbnMvb2JqZWN0L3BpeGlfT2JqZWN0X2hleGEuanMiLCIvdmFyL3d3dy93YXJNYXBFbmdpbmUvcHVibGljL2NvbXBvbmVudHMvbWFwL2V4dGVuc2lvbnMvaGV4YWdvbnMvb2JqZWN0L3BpeGlfT2JqZWN0X3RlcnJhaW5faGV4YS5qcyIsIi92YXIvd3d3L3dhck1hcEVuZ2luZS9wdWJsaWMvY29tcG9uZW50cy9tYXAvZXh0ZW5zaW9ucy9oZXhhZ29ucy9vYmplY3QvcGl4aV9PYmplY3RfdW5pdF9oZXhhLmpzIiwiL3Zhci93d3cvd2FyTWFwRW5naW5lL3B1YmxpYy9jb21wb25lbnRzL21hcC9leHRlbnNpb25zL2hleGFnb25zL29iamVjdF9zZWxlY3Qvb2JqZWN0X3NlbGVjdF9oZXhhZ29uLmpzIiwiL3Zhci93d3cvd2FyTWFwRW5naW5lL3B1YmxpYy9jb21wb25lbnRzL21hcC9leHRlbnNpb25zL2hleGFnb25zL3V0aWxzL2hleGFnb25NYXRoLmpzIiwiL3Zhci93d3cvd2FyTWFwRW5naW5lL3B1YmxpYy9jb21wb25lbnRzL21hcC9leHRlbnNpb25zL2hleGFnb25zL3V0aWxzL3BpeGlfY3JlYXRlSGV4YWdvbi5qcyIsIi92YXIvd3d3L3dhck1hcEVuZ2luZS9wdWJsaWMvdGVzdHMvZGF0YS9nYW1lRGF0YS5qcyIsIi92YXIvd3d3L3dhck1hcEVuZ2luZS9wdWJsaWMvdGVzdHMvZGF0YS9waXhpX21hcERhdGEuanMiLCIvdmFyL3d3dy93YXJNYXBFbmdpbmUvcHVibGljL3Rlc3RzL2RhdGEvcGl4aV90eXBlRGF0YS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLFlBQVksQ0FBQzs7NkRBUWEsdURBQXVEOzs7OzZDQUd4RCx5Q0FBeUM7O2tEQUN6Qyw4Q0FBOEM7O2lGQUNqQyw4RUFBOEU7Ozs7aUNBRzNGLDJCQUEyQjs7c0NBQzNCLGdDQUFnQzs7cUNBQ2pDLCtCQUErQjs7OzsyQ0FHbEIsdUNBQXVDOzs7Ozs7O0FBZjVFLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDOztBQWdCMUIsSUFBRyxPQUFPLE1BQU0sS0FBSyxXQUFXLElBQUksNkJBRDNCLG9CQUFvQixDQUM0Qix3QkFBd0IsRUFBRSxFQUFFO0FBQ25GLE9BQUssQ0FBQyw2R0FBNEcsQ0FBQyxDQUFDO0NBQ3JIOztBQUVELE1BQU0sQ0FBQyxPQUFPLEdBQUcsWUFBWTtBQUMzQixNQUFJLGFBQWEsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQ3pELE1BQUksR0FBRyxDQUFDOzs7QUFHUixNQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDOztBQUV6QixRQUFNLENBQUMsR0FBRyxDQUFDLCtEQUErRCxDQUFDLENBQUM7O0FBRTVFLFFBQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFDLFVBQVUsQ0FBQyxDQUFDOztBQUVuQyxRQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7OztBQUdkLFdBQVMsVUFBVSxHQUFHO0FBQ3BCLE9BQUcsR0FBRyxtREFqQ0QsU0FBUyxFQWlDRSxhQUFhLEVBQUUsRUFBRSxJQUFJLHFCQXpCaEMsUUFBUSxBQXlCa0MsRUFBRSxHQUFHLHlCQXZCL0MsT0FBTyxBQXVCaUQsRUFBRSxJQUFJLDBCQXhCOUQsUUFBUSxBQXdCZ0UsRUFBRSxDQUFDLENBQUM7QUFDakYsT0FBRyxDQUFDLElBQUksQ0FBRSxxQ0E5QkwsUUFBUSxpQ0FEUixRQUFRLENBK0JtQixFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsU0FBUyxDQUFFLENBQUM7R0FDakU7O0FBRUQsU0FBTyxHQUFHLENBQUM7Q0FDWixDQUFDOzs7O0FDOUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9GQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9UQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6SEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQ0E7QUFDQTtBQUNBOztBQ0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTs7QUNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBOztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDakRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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QUFHLENBQUMsRUFBQyxhQUFhLEVBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSw4QkFBOEI7S0FDNUgsQ0FBQztHQUNMO0NBQ0YsQ0FBQztRQWpCUyxRQUFRLEdBQVIsUUFBUSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIndXNlIHN0cmljdCc7XG4vKiA9PT09PT0gTGlicmFyeSBpbXBvcnRzID09PT09PSAqL1xuXG4vKiA9PT09PT0gT3duIG1vZHVsZSBpbXBvcnRzID09PT09PSAqL1xuLy92YXIgTWFwID0gcmVxdWlyZSggJy4uL3B1YmxpYy9jb21wb25lbnRzL21hcC9NYXAnKTtcbi8qIFRISVMgUE9MWUZJTEwgSVMgTkVFREVEIEZPUiBJRTExLCBtYXliZSBTeW1ib2wgb3Mgc29tZXRoaW5nIG1pc3Npbmc6IGh0dHA6Ly9iYWJlbGpzLmlvL2RvY3MvdXNhZ2UvcG9seWZpbGwvICovXG5yZXF1aXJlKFwiYmFiZWwvcG9seWZpbGxcIik7XG5cbmltcG9ydCB7IGNyZWF0ZU1hcCB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvZmFjdG9yaWVzL3BpeGlfaG9yaXpvbnRhbEhleGFGYWN0b3J5JztcblxuLyogPT09PT0gSW1wb3J0IHBsdWdpbnMgPT09PT0gKi9cbmltcG9ydCB7IG1hcF9kcmFnIH0gZnJvbSBcIi4uLy4uL2NvbXBvbmVudHMvbWFwL2NvcmUvbW92ZS9tYXBfZHJhZ1wiO1xuaW1wb3J0IHsgbWFwX3pvb20gfSBmcm9tICcuLi8uLi9jb21wb25lbnRzL21hcC9jb3JlL3pvb20vcGl4aV9tYXBfem9vbSc7XG5pbXBvcnQgeyBvYmplY3Rfc2VsZWN0X2hleGFnb24gfSBmcm9tICcuLi8uLi9jb21wb25lbnRzL21hcC9leHRlbnNpb25zL2hleGFnb25zL29iamVjdF9zZWxlY3Qvb2JqZWN0X3NlbGVjdF9oZXhhZ29uJztcblxuLyogREFUQSBGSUxFUyB1c2VkIGZvciB0ZXN0aW5nICovXG5pbXBvcnQgeyBnYW1lRGF0YSB9IGZyb20gJy4uLy4uL3Rlc3RzL2RhdGEvZ2FtZURhdGEnO1xuaW1wb3J0IHsgdHlwZURhdGEgfSBmcm9tICcuLi8uLi90ZXN0cy9kYXRhL3BpeGlfdHlwZURhdGEnO1xuaW1wb3J0IHsgbWFwRGF0YSB9IGZyb20gJy4uLy4uL3Rlc3RzL2RhdGEvcGl4aV9tYXBEYXRhJztcbi8vaW1wb3J0IHsgcHJlbG9hZCB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvcHJlbG9hZGluZy9wcmVsb2FkaW5nJztcblxuaW1wb3J0IHsgZW52aXJvbm1lbnREZXRlY3Rpb24gfSBmcm9tICcuLi8uLi9jb21wb25lbnRzL21hcC9jb3JlL3V0aWxzL3V0aWxzJztcbmlmKHR5cGVvZiBIYW1tZXIgPT09ICd1bmRlZmluZWQnICYmIGVudmlyb25tZW50RGV0ZWN0aW9uLmlzTW9iaWxlX2RldGVjdFVzZXJBZ2VudCgpKSB7XG4gIGFsZXJ0KFwiWW91IHNlZW0gdG8gYmUgdXNpbmcgbW9iaWxlIGRldmljZSwgSSBzdWdnZXN0IHlvdSB1c2UgbW9iaWxlIHNpdGUgZm9yIHRlc3RzLCBzaW5jZSB0aGlzIHdvbid0IHdvcmsgZm9yIHlvdVwiKTtcbn1cblxud2luZG93LmluaXRNYXAgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBjYW52YXNFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtYXBDYW52YXNcIik7XG4gIHZhciBtYXA7XG5cbiAgLyoqIEB0b2RvIE1PVkUgdGhlIHByZWxvYWRlciB0byBpdCdzIGRlc3RpbmVkIGZpbGU6IHByZWxvYWRlci4gKi9cbiAgdmFyIGxvYWRlciA9IFBJWEkubG9hZGVyO1xuXG4gIGxvYWRlci5hZGQoXCIvYXNzZXRzL2ltZy9tYXAvdGVzdEhleGFnb25zL3BpeGlfdGVzdEhleGFnb25TcHJpdGVzaGVldC5qc29uXCIpO1xuXG4gIGxvYWRlci5vbmNlKCdjb21wbGV0ZScsb25Db21wbGV0ZSk7XG5cbiAgbG9hZGVyLmxvYWQoKTtcbiAgLy9QSVhJLmxvYWRlci5vbihcInByb2dyZXNzXCIsIGxvYWRQcm9ncmVzc0hhbmRsZXIpO1xuXG4gIGZ1bmN0aW9uIG9uQ29tcGxldGUoKSB7XG4gICAgbWFwID0gY3JlYXRlTWFwKGNhbnZhc0VsZW1lbnQsIHsgZ2FtZTogZ2FtZURhdGEsIG1hcDogbWFwRGF0YSwgdHlwZTogdHlwZURhdGEgfSk7XG4gICAgbWFwLmluaXQoIFsgbWFwX3pvb20sIG1hcF9kcmFnIF0sIHsgeDogNDEsIHk6IDQ3IH0sIHVuZGVmaW5lZCApO1xuICB9XG5cbiAgcmV0dXJuIG1hcDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnJlcXVpcmUoXCJjb3JlLWpzL3NoaW1cIik7XG5cbnJlcXVpcmUoXCJyZWdlbmVyYXRvci9ydW50aW1lXCIpO1xuXG5pZiAoZ2xvYmFsLl9iYWJlbFBvbHlmaWxsKSB7XG4gIHRocm93IG5ldyBFcnJvcihcIm9ubHkgb25lIGluc3RhbmNlIG9mIGJhYmVsL3BvbHlmaWxsIGlzIGFsbG93ZWRcIik7XG59XG5nbG9iYWwuX2JhYmVsUG9seWZpbGwgPSB0cnVlOyIsIi8vIGZhbHNlIC0+IEFycmF5I2luZGV4T2Zcbi8vIHRydWUgIC0+IEFycmF5I2luY2x1ZGVzXG52YXIgJCA9IHJlcXVpcmUoJy4vJCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihJU19JTkNMVURFUyl7XG4gIHJldHVybiBmdW5jdGlvbigkdGhpcywgZWwsIGZyb21JbmRleCl7XG4gICAgdmFyIE8gICAgICA9ICQudG9PYmplY3QoJHRoaXMpXG4gICAgICAsIGxlbmd0aCA9ICQudG9MZW5ndGgoTy5sZW5ndGgpXG4gICAgICAsIGluZGV4ICA9ICQudG9JbmRleChmcm9tSW5kZXgsIGxlbmd0aClcbiAgICAgICwgdmFsdWU7XG4gICAgaWYoSVNfSU5DTFVERVMgJiYgZWwgIT0gZWwpd2hpbGUobGVuZ3RoID4gaW5kZXgpe1xuICAgICAgdmFsdWUgPSBPW2luZGV4KytdO1xuICAgICAgaWYodmFsdWUgIT0gdmFsdWUpcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIGZvcig7bGVuZ3RoID4gaW5kZXg7IGluZGV4KyspaWYoSVNfSU5DTFVERVMgfHwgaW5kZXggaW4gTyl7XG4gICAgICBpZihPW2luZGV4XSA9PT0gZWwpcmV0dXJuIElTX0lOQ0xVREVTIHx8IGluZGV4O1xuICAgIH0gcmV0dXJuICFJU19JTkNMVURFUyAmJiAtMTtcbiAgfTtcbn07IiwiLy8gMCAtPiBBcnJheSNmb3JFYWNoXG4vLyAxIC0+IEFycmF5I21hcFxuLy8gMiAtPiBBcnJheSNmaWx0ZXJcbi8vIDMgLT4gQXJyYXkjc29tZVxuLy8gNCAtPiBBcnJheSNldmVyeVxuLy8gNSAtPiBBcnJheSNmaW5kXG4vLyA2IC0+IEFycmF5I2ZpbmRJbmRleFxudmFyICQgICA9IHJlcXVpcmUoJy4vJCcpXG4gICwgY3R4ID0gcmVxdWlyZSgnLi8kLmN0eCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihUWVBFKXtcbiAgdmFyIElTX01BUCAgICAgICAgPSBUWVBFID09IDFcbiAgICAsIElTX0ZJTFRFUiAgICAgPSBUWVBFID09IDJcbiAgICAsIElTX1NPTUUgICAgICAgPSBUWVBFID09IDNcbiAgICAsIElTX0VWRVJZICAgICAgPSBUWVBFID09IDRcbiAgICAsIElTX0ZJTkRfSU5ERVggPSBUWVBFID09IDZcbiAgICAsIE5PX0hPTEVTICAgICAgPSBUWVBFID09IDUgfHwgSVNfRklORF9JTkRFWDtcbiAgcmV0dXJuIGZ1bmN0aW9uKCR0aGlzLCBjYWxsYmFja2ZuLCB0aGF0KXtcbiAgICB2YXIgTyAgICAgID0gT2JqZWN0KCQuYXNzZXJ0RGVmaW5lZCgkdGhpcykpXG4gICAgICAsIHNlbGYgICA9ICQuRVM1T2JqZWN0KE8pXG4gICAgICAsIGYgICAgICA9IGN0eChjYWxsYmFja2ZuLCB0aGF0LCAzKVxuICAgICAgLCBsZW5ndGggPSAkLnRvTGVuZ3RoKHNlbGYubGVuZ3RoKVxuICAgICAgLCBpbmRleCAgPSAwXG4gICAgICAsIHJlc3VsdCA9IElTX01BUCA/IEFycmF5KGxlbmd0aCkgOiBJU19GSUxURVIgPyBbXSA6IHVuZGVmaW5lZFxuICAgICAgLCB2YWwsIHJlcztcbiAgICBmb3IoO2xlbmd0aCA+IGluZGV4OyBpbmRleCsrKWlmKE5PX0hPTEVTIHx8IGluZGV4IGluIHNlbGYpe1xuICAgICAgdmFsID0gc2VsZltpbmRleF07XG4gICAgICByZXMgPSBmKHZhbCwgaW5kZXgsIE8pO1xuICAgICAgaWYoVFlQRSl7XG4gICAgICAgIGlmKElTX01BUClyZXN1bHRbaW5kZXhdID0gcmVzOyAgICAgICAgICAgIC8vIG1hcFxuICAgICAgICBlbHNlIGlmKHJlcylzd2l0Y2goVFlQRSl7XG4gICAgICAgICAgY2FzZSAzOiByZXR1cm4gdHJ1ZTsgICAgICAgICAgICAgICAgICAgIC8vIHNvbWVcbiAgICAgICAgICBjYXNlIDU6IHJldHVybiB2YWw7ICAgICAgICAgICAgICAgICAgICAgLy8gZmluZFxuICAgICAgICAgIGNhc2UgNjogcmV0dXJuIGluZGV4OyAgICAgICAgICAgICAgICAgICAvLyBmaW5kSW5kZXhcbiAgICAgICAgICBjYXNlIDI6IHJlc3VsdC5wdXNoKHZhbCk7ICAgICAgICAgICAgICAgLy8gZmlsdGVyXG4gICAgICAgIH0gZWxzZSBpZihJU19FVkVSWSlyZXR1cm4gZmFsc2U7ICAgICAgICAgIC8vIGV2ZXJ5XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBJU19GSU5EX0lOREVYID8gLTEgOiBJU19TT01FIHx8IElTX0VWRVJZID8gSVNfRVZFUlkgOiByZXN1bHQ7XG4gIH07XG59OyIsInZhciAkID0gcmVxdWlyZSgnLi8kJyk7XG5mdW5jdGlvbiBhc3NlcnQoY29uZGl0aW9uLCBtc2cxLCBtc2cyKXtcbiAgaWYoIWNvbmRpdGlvbil0aHJvdyBUeXBlRXJyb3IobXNnMiA/IG1zZzEgKyBtc2cyIDogbXNnMSk7XG59XG5hc3NlcnQuZGVmID0gJC5hc3NlcnREZWZpbmVkO1xuYXNzZXJ0LmZuID0gZnVuY3Rpb24oaXQpe1xuICBpZighJC5pc0Z1bmN0aW9uKGl0KSl0aHJvdyBUeXBlRXJyb3IoaXQgKyAnIGlzIG5vdCBhIGZ1bmN0aW9uIScpO1xuICByZXR1cm4gaXQ7XG59O1xuYXNzZXJ0Lm9iaiA9IGZ1bmN0aW9uKGl0KXtcbiAgaWYoISQuaXNPYmplY3QoaXQpKXRocm93IFR5cGVFcnJvcihpdCArICcgaXMgbm90IGFuIG9iamVjdCEnKTtcbiAgcmV0dXJuIGl0O1xufTtcbmFzc2VydC5pbnN0ID0gZnVuY3Rpb24oaXQsIENvbnN0cnVjdG9yLCBuYW1lKXtcbiAgaWYoIShpdCBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSl0aHJvdyBUeXBlRXJyb3IobmFtZSArIFwiOiB1c2UgdGhlICduZXcnIG9wZXJhdG9yIVwiKTtcbiAgcmV0dXJuIGl0O1xufTtcbm1vZHVsZS5leHBvcnRzID0gYXNzZXJ0OyIsInZhciAkICAgICAgICA9IHJlcXVpcmUoJy4vJCcpXG4gICwgZW51bUtleXMgPSByZXF1aXJlKCcuLyQuZW51bS1rZXlzJyk7XG4vLyAxOS4xLjIuMSBPYmplY3QuYXNzaWduKHRhcmdldCwgc291cmNlLCAuLi4pXG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIGFzc2lnbih0YXJnZXQsIHNvdXJjZSl7XG4vKiBlc2xpbnQtZW5hYmxlIG5vLXVudXNlZC12YXJzICovXG4gIHZhciBUID0gT2JqZWN0KCQuYXNzZXJ0RGVmaW5lZCh0YXJnZXQpKVxuICAgICwgbCA9IGFyZ3VtZW50cy5sZW5ndGhcbiAgICAsIGkgPSAxO1xuICB3aGlsZShsID4gaSl7XG4gICAgdmFyIFMgICAgICA9ICQuRVM1T2JqZWN0KGFyZ3VtZW50c1tpKytdKVxuICAgICAgLCBrZXlzICAgPSBlbnVtS2V5cyhTKVxuICAgICAgLCBsZW5ndGggPSBrZXlzLmxlbmd0aFxuICAgICAgLCBqICAgICAgPSAwXG4gICAgICAsIGtleTtcbiAgICB3aGlsZShsZW5ndGggPiBqKVRba2V5ID0ga2V5c1tqKytdXSA9IFNba2V5XTtcbiAgfVxuICByZXR1cm4gVDtcbn07IiwidmFyICQgICAgICAgID0gcmVxdWlyZSgnLi8kJylcbiAgLCBUQUcgICAgICA9IHJlcXVpcmUoJy4vJC53a3MnKSgndG9TdHJpbmdUYWcnKVxuICAsIHRvU3RyaW5nID0ge30udG9TdHJpbmc7XG5mdW5jdGlvbiBjb2YoaXQpe1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbChpdCkuc2xpY2UoOCwgLTEpO1xufVxuY29mLmNsYXNzb2YgPSBmdW5jdGlvbihpdCl7XG4gIHZhciBPLCBUO1xuICByZXR1cm4gaXQgPT0gdW5kZWZpbmVkID8gaXQgPT09IHVuZGVmaW5lZCA/ICdVbmRlZmluZWQnIDogJ051bGwnXG4gICAgOiB0eXBlb2YgKFQgPSAoTyA9IE9iamVjdChpdCkpW1RBR10pID09ICdzdHJpbmcnID8gVCA6IGNvZihPKTtcbn07XG5jb2Yuc2V0ID0gZnVuY3Rpb24oaXQsIHRhZywgc3RhdCl7XG4gIGlmKGl0ICYmICEkLmhhcyhpdCA9IHN0YXQgPyBpdCA6IGl0LnByb3RvdHlwZSwgVEFHKSkkLmhpZGUoaXQsIFRBRywgdGFnKTtcbn07XG5tb2R1bGUuZXhwb3J0cyA9IGNvZjsiLCIndXNlIHN0cmljdCc7XG52YXIgJCAgICAgICAgPSByZXF1aXJlKCcuLyQnKVxuICAsIGN0eCAgICAgID0gcmVxdWlyZSgnLi8kLmN0eCcpXG4gICwgc2FmZSAgICAgPSByZXF1aXJlKCcuLyQudWlkJykuc2FmZVxuICAsIGFzc2VydCAgID0gcmVxdWlyZSgnLi8kLmFzc2VydCcpXG4gICwgZm9yT2YgICAgPSByZXF1aXJlKCcuLyQuZm9yLW9mJylcbiAgLCBzdGVwICAgICA9IHJlcXVpcmUoJy4vJC5pdGVyJykuc3RlcFxuICAsIGhhcyAgICAgID0gJC5oYXNcbiAgLCBzZXQgICAgICA9ICQuc2V0XG4gICwgaXNPYmplY3QgPSAkLmlzT2JqZWN0XG4gICwgaGlkZSAgICAgPSAkLmhpZGVcbiAgLCBpc0V4dGVuc2libGUgPSBPYmplY3QuaXNFeHRlbnNpYmxlIHx8IGlzT2JqZWN0XG4gICwgSUQgICAgICAgPSBzYWZlKCdpZCcpXG4gICwgTzEgICAgICAgPSBzYWZlKCdPMScpXG4gICwgTEFTVCAgICAgPSBzYWZlKCdsYXN0JylcbiAgLCBGSVJTVCAgICA9IHNhZmUoJ2ZpcnN0JylcbiAgLCBJVEVSICAgICA9IHNhZmUoJ2l0ZXInKVxuICAsIFNJWkUgICAgID0gJC5ERVNDID8gc2FmZSgnc2l6ZScpIDogJ3NpemUnXG4gICwgaWQgICAgICAgPSAwO1xuXG5mdW5jdGlvbiBmYXN0S2V5KGl0LCBjcmVhdGUpe1xuICAvLyByZXR1cm4gcHJpbWl0aXZlIHdpdGggcHJlZml4XG4gIGlmKCFpc09iamVjdChpdCkpcmV0dXJuIHR5cGVvZiBpdCA9PSAnc3ltYm9sJyA/IGl0IDogKHR5cGVvZiBpdCA9PSAnc3RyaW5nJyA/ICdTJyA6ICdQJykgKyBpdDtcbiAgaWYoIWhhcyhpdCwgSUQpKXtcbiAgICAvLyBjYW4ndCBzZXQgaWQgdG8gZnJvemVuIG9iamVjdFxuICAgIGlmKCFpc0V4dGVuc2libGUoaXQpKXJldHVybiAnRic7XG4gICAgLy8gbm90IG5lY2Vzc2FyeSB0byBhZGQgaWRcbiAgICBpZighY3JlYXRlKXJldHVybiAnRSc7XG4gICAgLy8gYWRkIG1pc3Npbmcgb2JqZWN0IGlkXG4gICAgaGlkZShpdCwgSUQsICsraWQpO1xuICAvLyByZXR1cm4gb2JqZWN0IGlkIHdpdGggcHJlZml4XG4gIH0gcmV0dXJuICdPJyArIGl0W0lEXTtcbn1cblxuZnVuY3Rpb24gZ2V0RW50cnkodGhhdCwga2V5KXtcbiAgLy8gZmFzdCBjYXNlXG4gIHZhciBpbmRleCA9IGZhc3RLZXkoa2V5KSwgZW50cnk7XG4gIGlmKGluZGV4ICE9PSAnRicpcmV0dXJuIHRoYXRbTzFdW2luZGV4XTtcbiAgLy8gZnJvemVuIG9iamVjdCBjYXNlXG4gIGZvcihlbnRyeSA9IHRoYXRbRklSU1RdOyBlbnRyeTsgZW50cnkgPSBlbnRyeS5uKXtcbiAgICBpZihlbnRyeS5rID09IGtleSlyZXR1cm4gZW50cnk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGdldENvbnN0cnVjdG9yOiBmdW5jdGlvbihOQU1FLCBJU19NQVAsIEFEREVSKXtcbiAgICBmdW5jdGlvbiBDKCl7XG4gICAgICB2YXIgdGhhdCAgICAgPSBhc3NlcnQuaW5zdCh0aGlzLCBDLCBOQU1FKVxuICAgICAgICAsIGl0ZXJhYmxlID0gYXJndW1lbnRzWzBdO1xuICAgICAgc2V0KHRoYXQsIE8xLCAkLmNyZWF0ZShudWxsKSk7XG4gICAgICBzZXQodGhhdCwgU0laRSwgMCk7XG4gICAgICBzZXQodGhhdCwgTEFTVCwgdW5kZWZpbmVkKTtcbiAgICAgIHNldCh0aGF0LCBGSVJTVCwgdW5kZWZpbmVkKTtcbiAgICAgIGlmKGl0ZXJhYmxlICE9IHVuZGVmaW5lZClmb3JPZihpdGVyYWJsZSwgSVNfTUFQLCB0aGF0W0FEREVSXSwgdGhhdCk7XG4gICAgfVxuICAgIHJlcXVpcmUoJy4vJC5taXgnKShDLnByb3RvdHlwZSwge1xuICAgICAgLy8gMjMuMS4zLjEgTWFwLnByb3RvdHlwZS5jbGVhcigpXG4gICAgICAvLyAyMy4yLjMuMiBTZXQucHJvdG90eXBlLmNsZWFyKClcbiAgICAgIGNsZWFyOiBmdW5jdGlvbiBjbGVhcigpe1xuICAgICAgICBmb3IodmFyIHRoYXQgPSB0aGlzLCBkYXRhID0gdGhhdFtPMV0sIGVudHJ5ID0gdGhhdFtGSVJTVF07IGVudHJ5OyBlbnRyeSA9IGVudHJ5Lm4pe1xuICAgICAgICAgIGVudHJ5LnIgPSB0cnVlO1xuICAgICAgICAgIGlmKGVudHJ5LnApZW50cnkucCA9IGVudHJ5LnAubiA9IHVuZGVmaW5lZDtcbiAgICAgICAgICBkZWxldGUgZGF0YVtlbnRyeS5pXTtcbiAgICAgICAgfVxuICAgICAgICB0aGF0W0ZJUlNUXSA9IHRoYXRbTEFTVF0gPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoYXRbU0laRV0gPSAwO1xuICAgICAgfSxcbiAgICAgIC8vIDIzLjEuMy4zIE1hcC5wcm90b3R5cGUuZGVsZXRlKGtleSlcbiAgICAgIC8vIDIzLjIuMy40IFNldC5wcm90b3R5cGUuZGVsZXRlKHZhbHVlKVxuICAgICAgJ2RlbGV0ZSc6IGZ1bmN0aW9uKGtleSl7XG4gICAgICAgIHZhciB0aGF0ICA9IHRoaXNcbiAgICAgICAgICAsIGVudHJ5ID0gZ2V0RW50cnkodGhhdCwga2V5KTtcbiAgICAgICAgaWYoZW50cnkpe1xuICAgICAgICAgIHZhciBuZXh0ID0gZW50cnkublxuICAgICAgICAgICAgLCBwcmV2ID0gZW50cnkucDtcbiAgICAgICAgICBkZWxldGUgdGhhdFtPMV1bZW50cnkuaV07XG4gICAgICAgICAgZW50cnkuciA9IHRydWU7XG4gICAgICAgICAgaWYocHJldilwcmV2Lm4gPSBuZXh0O1xuICAgICAgICAgIGlmKG5leHQpbmV4dC5wID0gcHJldjtcbiAgICAgICAgICBpZih0aGF0W0ZJUlNUXSA9PSBlbnRyeSl0aGF0W0ZJUlNUXSA9IG5leHQ7XG4gICAgICAgICAgaWYodGhhdFtMQVNUXSA9PSBlbnRyeSl0aGF0W0xBU1RdID0gcHJldjtcbiAgICAgICAgICB0aGF0W1NJWkVdLS07XG4gICAgICAgIH0gcmV0dXJuICEhZW50cnk7XG4gICAgICB9LFxuICAgICAgLy8gMjMuMi4zLjYgU2V0LnByb3RvdHlwZS5mb3JFYWNoKGNhbGxiYWNrZm4sIHRoaXNBcmcgPSB1bmRlZmluZWQpXG4gICAgICAvLyAyMy4xLjMuNSBNYXAucHJvdG90eXBlLmZvckVhY2goY2FsbGJhY2tmbiwgdGhpc0FyZyA9IHVuZGVmaW5lZClcbiAgICAgIGZvckVhY2g6IGZ1bmN0aW9uIGZvckVhY2goY2FsbGJhY2tmbiAvKiwgdGhhdCA9IHVuZGVmaW5lZCAqLyl7XG4gICAgICAgIHZhciBmID0gY3R4KGNhbGxiYWNrZm4sIGFyZ3VtZW50c1sxXSwgMylcbiAgICAgICAgICAsIGVudHJ5O1xuICAgICAgICB3aGlsZShlbnRyeSA9IGVudHJ5ID8gZW50cnkubiA6IHRoaXNbRklSU1RdKXtcbiAgICAgICAgICBmKGVudHJ5LnYsIGVudHJ5LmssIHRoaXMpO1xuICAgICAgICAgIC8vIHJldmVydCB0byB0aGUgbGFzdCBleGlzdGluZyBlbnRyeVxuICAgICAgICAgIHdoaWxlKGVudHJ5ICYmIGVudHJ5LnIpZW50cnkgPSBlbnRyeS5wO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgLy8gMjMuMS4zLjcgTWFwLnByb3RvdHlwZS5oYXMoa2V5KVxuICAgICAgLy8gMjMuMi4zLjcgU2V0LnByb3RvdHlwZS5oYXModmFsdWUpXG4gICAgICBoYXM6IGZ1bmN0aW9uIGhhcyhrZXkpe1xuICAgICAgICByZXR1cm4gISFnZXRFbnRyeSh0aGlzLCBrZXkpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGlmKCQuREVTQykkLnNldERlc2MoQy5wcm90b3R5cGUsICdzaXplJywge1xuICAgICAgZ2V0OiBmdW5jdGlvbigpe1xuICAgICAgICByZXR1cm4gYXNzZXJ0LmRlZih0aGlzW1NJWkVdKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gQztcbiAgfSxcbiAgZGVmOiBmdW5jdGlvbih0aGF0LCBrZXksIHZhbHVlKXtcbiAgICB2YXIgZW50cnkgPSBnZXRFbnRyeSh0aGF0LCBrZXkpXG4gICAgICAsIHByZXYsIGluZGV4O1xuICAgIC8vIGNoYW5nZSBleGlzdGluZyBlbnRyeVxuICAgIGlmKGVudHJ5KXtcbiAgICAgIGVudHJ5LnYgPSB2YWx1ZTtcbiAgICAvLyBjcmVhdGUgbmV3IGVudHJ5XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoYXRbTEFTVF0gPSBlbnRyeSA9IHtcbiAgICAgICAgaTogaW5kZXggPSBmYXN0S2V5KGtleSwgdHJ1ZSksIC8vIDwtIGluZGV4XG4gICAgICAgIGs6IGtleSwgICAgICAgICAgICAgICAgICAgICAgICAvLyA8LSBrZXlcbiAgICAgICAgdjogdmFsdWUsICAgICAgICAgICAgICAgICAgICAgIC8vIDwtIHZhbHVlXG4gICAgICAgIHA6IHByZXYgPSB0aGF0W0xBU1RdLCAgICAgICAgICAvLyA8LSBwcmV2aW91cyBlbnRyeVxuICAgICAgICBuOiB1bmRlZmluZWQsICAgICAgICAgICAgICAgICAgLy8gPC0gbmV4dCBlbnRyeVxuICAgICAgICByOiBmYWxzZSAgICAgICAgICAgICAgICAgICAgICAgLy8gPC0gcmVtb3ZlZFxuICAgICAgfTtcbiAgICAgIGlmKCF0aGF0W0ZJUlNUXSl0aGF0W0ZJUlNUXSA9IGVudHJ5O1xuICAgICAgaWYocHJldilwcmV2Lm4gPSBlbnRyeTtcbiAgICAgIHRoYXRbU0laRV0rKztcbiAgICAgIC8vIGFkZCB0byBpbmRleFxuICAgICAgaWYoaW5kZXggIT09ICdGJyl0aGF0W08xXVtpbmRleF0gPSBlbnRyeTtcbiAgICB9IHJldHVybiB0aGF0O1xuICB9LFxuICBnZXRFbnRyeTogZ2V0RW50cnksXG4gIC8vIGFkZCAua2V5cywgLnZhbHVlcywgLmVudHJpZXMsIFtAQGl0ZXJhdG9yXVxuICAvLyAyMy4xLjMuNCwgMjMuMS4zLjgsIDIzLjEuMy4xMSwgMjMuMS4zLjEyLCAyMy4yLjMuNSwgMjMuMi4zLjgsIDIzLjIuMy4xMCwgMjMuMi4zLjExXG4gIHNldEl0ZXI6IGZ1bmN0aW9uKEMsIE5BTUUsIElTX01BUCl7XG4gICAgcmVxdWlyZSgnLi8kLml0ZXItZGVmaW5lJykoQywgTkFNRSwgZnVuY3Rpb24oaXRlcmF0ZWQsIGtpbmQpe1xuICAgICAgc2V0KHRoaXMsIElURVIsIHtvOiBpdGVyYXRlZCwgazoga2luZH0pO1xuICAgIH0sIGZ1bmN0aW9uKCl7XG4gICAgICB2YXIgaXRlciAgPSB0aGlzW0lURVJdXG4gICAgICAgICwga2luZCAgPSBpdGVyLmtcbiAgICAgICAgLCBlbnRyeSA9IGl0ZXIubDtcbiAgICAgIC8vIHJldmVydCB0byB0aGUgbGFzdCBleGlzdGluZyBlbnRyeVxuICAgICAgd2hpbGUoZW50cnkgJiYgZW50cnkucillbnRyeSA9IGVudHJ5LnA7XG4gICAgICAvLyBnZXQgbmV4dCBlbnRyeVxuICAgICAgaWYoIWl0ZXIubyB8fCAhKGl0ZXIubCA9IGVudHJ5ID0gZW50cnkgPyBlbnRyeS5uIDogaXRlci5vW0ZJUlNUXSkpe1xuICAgICAgICAvLyBvciBmaW5pc2ggdGhlIGl0ZXJhdGlvblxuICAgICAgICBpdGVyLm8gPSB1bmRlZmluZWQ7XG4gICAgICAgIHJldHVybiBzdGVwKDEpO1xuICAgICAgfVxuICAgICAgLy8gcmV0dXJuIHN0ZXAgYnkga2luZFxuICAgICAgaWYoa2luZCA9PSAna2V5cycgIClyZXR1cm4gc3RlcCgwLCBlbnRyeS5rKTtcbiAgICAgIGlmKGtpbmQgPT0gJ3ZhbHVlcycpcmV0dXJuIHN0ZXAoMCwgZW50cnkudik7XG4gICAgICByZXR1cm4gc3RlcCgwLCBbZW50cnkuaywgZW50cnkudl0pO1xuICAgIH0sIElTX01BUCA/ICdlbnRyaWVzJyA6ICd2YWx1ZXMnICwgIUlTX01BUCwgdHJ1ZSk7XG4gIH1cbn07IiwiLy8gaHR0cHM6Ly9naXRodWIuY29tL0RhdmlkQnJ1YW50L01hcC1TZXQucHJvdG90eXBlLnRvSlNPTlxudmFyICRkZWYgID0gcmVxdWlyZSgnLi8kLmRlZicpXG4gICwgZm9yT2YgPSByZXF1aXJlKCcuLyQuZm9yLW9mJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKE5BTUUpe1xuICAkZGVmKCRkZWYuUCwgTkFNRSwge1xuICAgIHRvSlNPTjogZnVuY3Rpb24gdG9KU09OKCl7XG4gICAgICB2YXIgYXJyID0gW107XG4gICAgICBmb3JPZih0aGlzLCBmYWxzZSwgYXJyLnB1c2gsIGFycik7XG4gICAgICByZXR1cm4gYXJyO1xuICAgIH1cbiAgfSk7XG59OyIsIid1c2Ugc3RyaWN0JztcbnZhciAkICAgICAgICAgPSByZXF1aXJlKCcuLyQnKVxuICAsIHNhZmUgICAgICA9IHJlcXVpcmUoJy4vJC51aWQnKS5zYWZlXG4gICwgYXNzZXJ0ICAgID0gcmVxdWlyZSgnLi8kLmFzc2VydCcpXG4gICwgZm9yT2YgICAgID0gcmVxdWlyZSgnLi8kLmZvci1vZicpXG4gICwgX2hhcyAgICAgID0gJC5oYXNcbiAgLCBpc09iamVjdCAgPSAkLmlzT2JqZWN0XG4gICwgaGlkZSAgICAgID0gJC5oaWRlXG4gICwgaXNFeHRlbnNpYmxlID0gT2JqZWN0LmlzRXh0ZW5zaWJsZSB8fCBpc09iamVjdFxuICAsIGlkICAgICAgICA9IDBcbiAgLCBJRCAgICAgICAgPSBzYWZlKCdpZCcpXG4gICwgV0VBSyAgICAgID0gc2FmZSgnd2VhaycpXG4gICwgTEVBSyAgICAgID0gc2FmZSgnbGVhaycpXG4gICwgbWV0aG9kICAgID0gcmVxdWlyZSgnLi8kLmFycmF5LW1ldGhvZHMnKVxuICAsIGZpbmQgICAgICA9IG1ldGhvZCg1KVxuICAsIGZpbmRJbmRleCA9IG1ldGhvZCg2KTtcbmZ1bmN0aW9uIGZpbmRGcm96ZW4oc3RvcmUsIGtleSl7XG4gIHJldHVybiBmaW5kKHN0b3JlLmFycmF5LCBmdW5jdGlvbihpdCl7XG4gICAgcmV0dXJuIGl0WzBdID09PSBrZXk7XG4gIH0pO1xufVxuLy8gZmFsbGJhY2sgZm9yIGZyb3plbiBrZXlzXG5mdW5jdGlvbiBsZWFrU3RvcmUodGhhdCl7XG4gIHJldHVybiB0aGF0W0xFQUtdIHx8IGhpZGUodGhhdCwgTEVBSywge1xuICAgIGFycmF5OiBbXSxcbiAgICBnZXQ6IGZ1bmN0aW9uKGtleSl7XG4gICAgICB2YXIgZW50cnkgPSBmaW5kRnJvemVuKHRoaXMsIGtleSk7XG4gICAgICBpZihlbnRyeSlyZXR1cm4gZW50cnlbMV07XG4gICAgfSxcbiAgICBoYXM6IGZ1bmN0aW9uKGtleSl7XG4gICAgICByZXR1cm4gISFmaW5kRnJvemVuKHRoaXMsIGtleSk7XG4gICAgfSxcbiAgICBzZXQ6IGZ1bmN0aW9uKGtleSwgdmFsdWUpe1xuICAgICAgdmFyIGVudHJ5ID0gZmluZEZyb3plbih0aGlzLCBrZXkpO1xuICAgICAgaWYoZW50cnkpZW50cnlbMV0gPSB2YWx1ZTtcbiAgICAgIGVsc2UgdGhpcy5hcnJheS5wdXNoKFtrZXksIHZhbHVlXSk7XG4gICAgfSxcbiAgICAnZGVsZXRlJzogZnVuY3Rpb24oa2V5KXtcbiAgICAgIHZhciBpbmRleCA9IGZpbmRJbmRleCh0aGlzLmFycmF5LCBmdW5jdGlvbihpdCl7XG4gICAgICAgIHJldHVybiBpdFswXSA9PT0ga2V5O1xuICAgICAgfSk7XG4gICAgICBpZih+aW5kZXgpdGhpcy5hcnJheS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgcmV0dXJuICEhfmluZGV4O1xuICAgIH1cbiAgfSlbTEVBS107XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBnZXRDb25zdHJ1Y3RvcjogZnVuY3Rpb24oTkFNRSwgSVNfTUFQLCBBRERFUil7XG4gICAgZnVuY3Rpb24gQygpe1xuICAgICAgJC5zZXQoYXNzZXJ0Lmluc3QodGhpcywgQywgTkFNRSksIElELCBpZCsrKTtcbiAgICAgIHZhciBpdGVyYWJsZSA9IGFyZ3VtZW50c1swXTtcbiAgICAgIGlmKGl0ZXJhYmxlICE9IHVuZGVmaW5lZClmb3JPZihpdGVyYWJsZSwgSVNfTUFQLCB0aGlzW0FEREVSXSwgdGhpcyk7XG4gICAgfVxuICAgIHJlcXVpcmUoJy4vJC5taXgnKShDLnByb3RvdHlwZSwge1xuICAgICAgLy8gMjMuMy4zLjIgV2Vha01hcC5wcm90b3R5cGUuZGVsZXRlKGtleSlcbiAgICAgIC8vIDIzLjQuMy4zIFdlYWtTZXQucHJvdG90eXBlLmRlbGV0ZSh2YWx1ZSlcbiAgICAgICdkZWxldGUnOiBmdW5jdGlvbihrZXkpe1xuICAgICAgICBpZighaXNPYmplY3Qoa2V5KSlyZXR1cm4gZmFsc2U7XG4gICAgICAgIGlmKCFpc0V4dGVuc2libGUoa2V5KSlyZXR1cm4gbGVha1N0b3JlKHRoaXMpWydkZWxldGUnXShrZXkpO1xuICAgICAgICByZXR1cm4gX2hhcyhrZXksIFdFQUspICYmIF9oYXMoa2V5W1dFQUtdLCB0aGlzW0lEXSkgJiYgZGVsZXRlIGtleVtXRUFLXVt0aGlzW0lEXV07XG4gICAgICB9LFxuICAgICAgLy8gMjMuMy4zLjQgV2Vha01hcC5wcm90b3R5cGUuaGFzKGtleSlcbiAgICAgIC8vIDIzLjQuMy40IFdlYWtTZXQucHJvdG90eXBlLmhhcyh2YWx1ZSlcbiAgICAgIGhhczogZnVuY3Rpb24gaGFzKGtleSl7XG4gICAgICAgIGlmKCFpc09iamVjdChrZXkpKXJldHVybiBmYWxzZTtcbiAgICAgICAgaWYoIWlzRXh0ZW5zaWJsZShrZXkpKXJldHVybiBsZWFrU3RvcmUodGhpcykuaGFzKGtleSk7XG4gICAgICAgIHJldHVybiBfaGFzKGtleSwgV0VBSykgJiYgX2hhcyhrZXlbV0VBS10sIHRoaXNbSURdKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gQztcbiAgfSxcbiAgZGVmOiBmdW5jdGlvbih0aGF0LCBrZXksIHZhbHVlKXtcbiAgICBpZighaXNFeHRlbnNpYmxlKGFzc2VydC5vYmooa2V5KSkpe1xuICAgICAgbGVha1N0b3JlKHRoYXQpLnNldChrZXksIHZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgX2hhcyhrZXksIFdFQUspIHx8IGhpZGUoa2V5LCBXRUFLLCB7fSk7XG4gICAgICBrZXlbV0VBS11bdGhhdFtJRF1dID0gdmFsdWU7XG4gICAgfSByZXR1cm4gdGhhdDtcbiAgfSxcbiAgbGVha1N0b3JlOiBsZWFrU3RvcmUsXG4gIFdFQUs6IFdFQUssXG4gIElEOiBJRFxufTsiLCIndXNlIHN0cmljdCc7XG52YXIgJCAgICAgPSByZXF1aXJlKCcuLyQnKVxuICAsICRkZWYgID0gcmVxdWlyZSgnLi8kLmRlZicpXG4gICwgQlVHR1kgPSByZXF1aXJlKCcuLyQuaXRlcicpLkJVR0dZXG4gICwgZm9yT2YgPSByZXF1aXJlKCcuLyQuZm9yLW9mJylcbiAgLCBzcGVjaWVzID0gcmVxdWlyZSgnLi8kLnNwZWNpZXMnKVxuICAsIGFzc2VydEluc3RhbmNlID0gcmVxdWlyZSgnLi8kLmFzc2VydCcpLmluc3Q7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oTkFNRSwgbWV0aG9kcywgY29tbW9uLCBJU19NQVAsIElTX1dFQUspe1xuICB2YXIgQmFzZSAgPSAkLmdbTkFNRV1cbiAgICAsIEMgICAgID0gQmFzZVxuICAgICwgQURERVIgPSBJU19NQVAgPyAnc2V0JyA6ICdhZGQnXG4gICAgLCBwcm90byA9IEMgJiYgQy5wcm90b3R5cGVcbiAgICAsIE8gICAgID0ge307XG4gIGZ1bmN0aW9uIGZpeE1ldGhvZChLRVksIENIQUlOKXtcbiAgICBpZigkLkZXKXtcbiAgICAgIHZhciBtZXRob2QgPSBwcm90b1tLRVldO1xuICAgICAgcmVxdWlyZSgnLi8kLnJlZGVmJykocHJvdG8sIEtFWSwgZnVuY3Rpb24oYSwgYil7XG4gICAgICAgIHZhciByZXN1bHQgPSBtZXRob2QuY2FsbCh0aGlzLCBhID09PSAwID8gMCA6IGEsIGIpO1xuICAgICAgICByZXR1cm4gQ0hBSU4gPyB0aGlzIDogcmVzdWx0O1xuICAgICAgfSk7XG4gICAgfVxuICB9XG4gIGlmKCEkLmlzRnVuY3Rpb24oQykgfHwgIShJU19XRUFLIHx8ICFCVUdHWSAmJiBwcm90by5mb3JFYWNoICYmIHByb3RvLmVudHJpZXMpKXtcbiAgICAvLyBjcmVhdGUgY29sbGVjdGlvbiBjb25zdHJ1Y3RvclxuICAgIEMgPSBjb21tb24uZ2V0Q29uc3RydWN0b3IoTkFNRSwgSVNfTUFQLCBBRERFUik7XG4gICAgcmVxdWlyZSgnLi8kLm1peCcpKEMucHJvdG90eXBlLCBtZXRob2RzKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgaW5zdCAgPSBuZXcgQ1xuICAgICAgLCBjaGFpbiA9IGluc3RbQURERVJdKElTX1dFQUsgPyB7fSA6IC0wLCAxKVxuICAgICAgLCBidWdneVplcm87XG4gICAgLy8gd3JhcCBmb3IgaW5pdCBjb2xsZWN0aW9ucyBmcm9tIGl0ZXJhYmxlXG4gICAgaWYoIXJlcXVpcmUoJy4vJC5pdGVyLWRldGVjdCcpKGZ1bmN0aW9uKGl0ZXIpeyBuZXcgQyhpdGVyKTsgfSkpeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLW5ld1xuICAgICAgQyA9IGZ1bmN0aW9uKCl7XG4gICAgICAgIGFzc2VydEluc3RhbmNlKHRoaXMsIEMsIE5BTUUpO1xuICAgICAgICB2YXIgdGhhdCAgICAgPSBuZXcgQmFzZVxuICAgICAgICAgICwgaXRlcmFibGUgPSBhcmd1bWVudHNbMF07XG4gICAgICAgIGlmKGl0ZXJhYmxlICE9IHVuZGVmaW5lZClmb3JPZihpdGVyYWJsZSwgSVNfTUFQLCB0aGF0W0FEREVSXSwgdGhhdCk7XG4gICAgICAgIHJldHVybiB0aGF0O1xuICAgICAgfTtcbiAgICAgIEMucHJvdG90eXBlID0gcHJvdG87XG4gICAgICBpZigkLkZXKXByb3RvLmNvbnN0cnVjdG9yID0gQztcbiAgICB9XG4gICAgSVNfV0VBSyB8fCBpbnN0LmZvckVhY2goZnVuY3Rpb24odmFsLCBrZXkpe1xuICAgICAgYnVnZ3laZXJvID0gMSAvIGtleSA9PT0gLUluZmluaXR5O1xuICAgIH0pO1xuICAgIC8vIGZpeCBjb252ZXJ0aW5nIC0wIGtleSB0byArMFxuICAgIGlmKGJ1Z2d5WmVybyl7XG4gICAgICBmaXhNZXRob2QoJ2RlbGV0ZScpO1xuICAgICAgZml4TWV0aG9kKCdoYXMnKTtcbiAgICAgIElTX01BUCAmJiBmaXhNZXRob2QoJ2dldCcpO1xuICAgIH1cbiAgICAvLyArIGZpeCAuYWRkICYgLnNldCBmb3IgY2hhaW5pbmdcbiAgICBpZihidWdneVplcm8gfHwgY2hhaW4gIT09IGluc3QpZml4TWV0aG9kKEFEREVSLCB0cnVlKTtcbiAgfVxuXG4gIHJlcXVpcmUoJy4vJC5jb2YnKS5zZXQoQywgTkFNRSk7XG5cbiAgT1tOQU1FXSA9IEM7XG4gICRkZWYoJGRlZi5HICsgJGRlZi5XICsgJGRlZi5GICogKEMgIT0gQmFzZSksIE8pO1xuICBzcGVjaWVzKEMpO1xuICBzcGVjaWVzKCQuY29yZVtOQU1FXSk7IC8vIGZvciB3cmFwcGVyXG5cbiAgaWYoIUlTX1dFQUspY29tbW9uLnNldEl0ZXIoQywgTkFNRSwgSVNfTUFQKTtcblxuICByZXR1cm4gQztcbn07IiwiLy8gT3B0aW9uYWwgLyBzaW1wbGUgY29udGV4dCBiaW5kaW5nXG52YXIgYXNzZXJ0RnVuY3Rpb24gPSByZXF1aXJlKCcuLyQuYXNzZXJ0JykuZm47XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGZuLCB0aGF0LCBsZW5ndGgpe1xuICBhc3NlcnRGdW5jdGlvbihmbik7XG4gIGlmKH5sZW5ndGggJiYgdGhhdCA9PT0gdW5kZWZpbmVkKXJldHVybiBmbjtcbiAgc3dpdGNoKGxlbmd0aCl7XG4gICAgY2FzZSAxOiByZXR1cm4gZnVuY3Rpb24oYSl7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhKTtcbiAgICB9O1xuICAgIGNhc2UgMjogcmV0dXJuIGZ1bmN0aW9uKGEsIGIpe1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSwgYik7XG4gICAgfTtcbiAgICBjYXNlIDM6IHJldHVybiBmdW5jdGlvbihhLCBiLCBjKXtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEsIGIsIGMpO1xuICAgIH07XG4gIH0gcmV0dXJuIGZ1bmN0aW9uKC8qIC4uLmFyZ3MgKi8pe1xuICAgICAgcmV0dXJuIGZuLmFwcGx5KHRoYXQsIGFyZ3VtZW50cyk7XG4gICAgfTtcbn07IiwidmFyICQgICAgICAgICAgPSByZXF1aXJlKCcuLyQnKVxuICAsIGdsb2JhbCAgICAgPSAkLmdcbiAgLCBjb3JlICAgICAgID0gJC5jb3JlXG4gICwgaXNGdW5jdGlvbiA9ICQuaXNGdW5jdGlvblxuICAsICRyZWRlZiAgICAgPSByZXF1aXJlKCcuLyQucmVkZWYnKTtcbmZ1bmN0aW9uIGN0eChmbiwgdGhhdCl7XG4gIHJldHVybiBmdW5jdGlvbigpe1xuICAgIHJldHVybiBmbi5hcHBseSh0aGF0LCBhcmd1bWVudHMpO1xuICB9O1xufVxuZ2xvYmFsLmNvcmUgPSBjb3JlO1xuLy8gdHlwZSBiaXRtYXBcbiRkZWYuRiA9IDE7ICAvLyBmb3JjZWRcbiRkZWYuRyA9IDI7ICAvLyBnbG9iYWxcbiRkZWYuUyA9IDQ7ICAvLyBzdGF0aWNcbiRkZWYuUCA9IDg7ICAvLyBwcm90b1xuJGRlZi5CID0gMTY7IC8vIGJpbmRcbiRkZWYuVyA9IDMyOyAvLyB3cmFwXG5mdW5jdGlvbiAkZGVmKHR5cGUsIG5hbWUsIHNvdXJjZSl7XG4gIHZhciBrZXksIG93biwgb3V0LCBleHBcbiAgICAsIGlzR2xvYmFsID0gdHlwZSAmICRkZWYuR1xuICAgICwgaXNQcm90byAgPSB0eXBlICYgJGRlZi5QXG4gICAgLCB0YXJnZXQgICA9IGlzR2xvYmFsID8gZ2xvYmFsIDogdHlwZSAmICRkZWYuU1xuICAgICAgICA/IGdsb2JhbFtuYW1lXSA6IChnbG9iYWxbbmFtZV0gfHwge30pLnByb3RvdHlwZVxuICAgICwgZXhwb3J0cyAgPSBpc0dsb2JhbCA/IGNvcmUgOiBjb3JlW25hbWVdIHx8IChjb3JlW25hbWVdID0ge30pO1xuICBpZihpc0dsb2JhbClzb3VyY2UgPSBuYW1lO1xuICBmb3Ioa2V5IGluIHNvdXJjZSl7XG4gICAgLy8gY29udGFpbnMgaW4gbmF0aXZlXG4gICAgb3duID0gISh0eXBlICYgJGRlZi5GKSAmJiB0YXJnZXQgJiYga2V5IGluIHRhcmdldDtcbiAgICAvLyBleHBvcnQgbmF0aXZlIG9yIHBhc3NlZFxuICAgIG91dCA9IChvd24gPyB0YXJnZXQgOiBzb3VyY2UpW2tleV07XG4gICAgLy8gYmluZCB0aW1lcnMgdG8gZ2xvYmFsIGZvciBjYWxsIGZyb20gZXhwb3J0IGNvbnRleHRcbiAgICBpZih0eXBlICYgJGRlZi5CICYmIG93billeHAgPSBjdHgob3V0LCBnbG9iYWwpO1xuICAgIGVsc2UgZXhwID0gaXNQcm90byAmJiBpc0Z1bmN0aW9uKG91dCkgPyBjdHgoRnVuY3Rpb24uY2FsbCwgb3V0KSA6IG91dDtcbiAgICAvLyBleHRlbmQgZ2xvYmFsXG4gICAgaWYodGFyZ2V0ICYmICFvd24pJHJlZGVmKHRhcmdldCwga2V5LCBvdXQpO1xuICAgIC8vIGV4cG9ydFxuICAgIGlmKGV4cG9ydHNba2V5XSAhPSBvdXQpJC5oaWRlKGV4cG9ydHMsIGtleSwgZXhwKTtcbiAgICBpZihpc1Byb3RvKShleHBvcnRzLnByb3RvdHlwZSB8fCAoZXhwb3J0cy5wcm90b3R5cGUgPSB7fSkpW2tleV0gPSBvdXQ7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gJGRlZjsiLCJ2YXIgJCAgICAgICAgPSByZXF1aXJlKCcuLyQnKVxuICAsIGRvY3VtZW50ID0gJC5nLmRvY3VtZW50XG4gICwgaXNPYmplY3QgPSAkLmlzT2JqZWN0XG4gIC8vIGluIG9sZCBJRSB0eXBlb2YgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCBpcyAnb2JqZWN0J1xuICAsIGlzID0gaXNPYmplY3QoZG9jdW1lbnQpICYmIGlzT2JqZWN0KGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBpcyA/IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoaXQpIDoge307XG59OyIsInZhciAkID0gcmVxdWlyZSgnLi8kJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgdmFyIGtleXMgICAgICAgPSAkLmdldEtleXMoaXQpXG4gICAgLCBnZXREZXNjICAgID0gJC5nZXREZXNjXG4gICAgLCBnZXRTeW1ib2xzID0gJC5nZXRTeW1ib2xzO1xuICBpZihnZXRTeW1ib2xzKSQuZWFjaC5jYWxsKGdldFN5bWJvbHMoaXQpLCBmdW5jdGlvbihrZXkpe1xuICAgIGlmKGdldERlc2MoaXQsIGtleSkuZW51bWVyYWJsZSlrZXlzLnB1c2goa2V5KTtcbiAgfSk7XG4gIHJldHVybiBrZXlzO1xufTsiLCJ2YXIgY3R4ICA9IHJlcXVpcmUoJy4vJC5jdHgnKVxuICAsIGdldCAgPSByZXF1aXJlKCcuLyQuaXRlcicpLmdldFxuICAsIGNhbGwgPSByZXF1aXJlKCcuLyQuaXRlci1jYWxsJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0ZXJhYmxlLCBlbnRyaWVzLCBmbiwgdGhhdCl7XG4gIHZhciBpdGVyYXRvciA9IGdldChpdGVyYWJsZSlcbiAgICAsIGYgICAgICAgID0gY3R4KGZuLCB0aGF0LCBlbnRyaWVzID8gMiA6IDEpXG4gICAgLCBzdGVwO1xuICB3aGlsZSghKHN0ZXAgPSBpdGVyYXRvci5uZXh0KCkpLmRvbmUpe1xuICAgIGlmKGNhbGwoaXRlcmF0b3IsIGYsIHN0ZXAudmFsdWUsIGVudHJpZXMpID09PSBmYWxzZSl7XG4gICAgICByZXR1cm4gY2FsbC5jbG9zZShpdGVyYXRvcik7XG4gICAgfVxuICB9XG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oJCl7XG4gICQuRlcgICA9IHRydWU7XG4gICQucGF0aCA9ICQuZztcbiAgcmV0dXJuICQ7XG59OyIsIi8vIEZhc3QgYXBwbHlcbi8vIGh0dHA6Ly9qc3BlcmYubG5raXQuY29tL2Zhc3QtYXBwbHkvNVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihmbiwgYXJncywgdGhhdCl7XG4gIHZhciB1biA9IHRoYXQgPT09IHVuZGVmaW5lZDtcbiAgc3dpdGNoKGFyZ3MubGVuZ3RoKXtcbiAgICBjYXNlIDA6IHJldHVybiB1biA/IGZuKClcbiAgICAgICAgICAgICAgICAgICAgICA6IGZuLmNhbGwodGhhdCk7XG4gICAgY2FzZSAxOiByZXR1cm4gdW4gPyBmbihhcmdzWzBdKVxuICAgICAgICAgICAgICAgICAgICAgIDogZm4uY2FsbCh0aGF0LCBhcmdzWzBdKTtcbiAgICBjYXNlIDI6IHJldHVybiB1biA/IGZuKGFyZ3NbMF0sIGFyZ3NbMV0pXG4gICAgICAgICAgICAgICAgICAgICAgOiBmbi5jYWxsKHRoYXQsIGFyZ3NbMF0sIGFyZ3NbMV0pO1xuICAgIGNhc2UgMzogcmV0dXJuIHVuID8gZm4oYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSlcbiAgICAgICAgICAgICAgICAgICAgICA6IGZuLmNhbGwodGhhdCwgYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSk7XG4gICAgY2FzZSA0OiByZXR1cm4gdW4gPyBmbihhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdLCBhcmdzWzNdKVxuICAgICAgICAgICAgICAgICAgICAgIDogZm4uY2FsbCh0aGF0LCBhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdLCBhcmdzWzNdKTtcbiAgICBjYXNlIDU6IHJldHVybiB1biA/IGZuKGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0sIGFyZ3NbM10sIGFyZ3NbNF0pXG4gICAgICAgICAgICAgICAgICAgICAgOiBmbi5jYWxsKHRoYXQsIGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0sIGFyZ3NbM10sIGFyZ3NbNF0pO1xuICB9IHJldHVybiAgICAgICAgICAgICAgZm4uYXBwbHkodGhhdCwgYXJncyk7XG59OyIsInZhciBhc3NlcnRPYmplY3QgPSByZXF1aXJlKCcuLyQuYXNzZXJ0Jykub2JqO1xuZnVuY3Rpb24gY2xvc2UoaXRlcmF0b3Ipe1xuICB2YXIgcmV0ID0gaXRlcmF0b3JbJ3JldHVybiddO1xuICBpZihyZXQgIT09IHVuZGVmaW5lZClhc3NlcnRPYmplY3QocmV0LmNhbGwoaXRlcmF0b3IpKTtcbn1cbmZ1bmN0aW9uIGNhbGwoaXRlcmF0b3IsIGZuLCB2YWx1ZSwgZW50cmllcyl7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGVudHJpZXMgPyBmbihhc3NlcnRPYmplY3QodmFsdWUpWzBdLCB2YWx1ZVsxXSkgOiBmbih2YWx1ZSk7XG4gIH0gY2F0Y2goZSl7XG4gICAgY2xvc2UoaXRlcmF0b3IpO1xuICAgIHRocm93IGU7XG4gIH1cbn1cbmNhbGwuY2xvc2UgPSBjbG9zZTtcbm1vZHVsZS5leHBvcnRzID0gY2FsbDsiLCJ2YXIgJGRlZiAgICAgICAgICAgID0gcmVxdWlyZSgnLi8kLmRlZicpXG4gICwgJHJlZGVmICAgICAgICAgID0gcmVxdWlyZSgnLi8kLnJlZGVmJylcbiAgLCAkICAgICAgICAgICAgICAgPSByZXF1aXJlKCcuLyQnKVxuICAsIGNvZiAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vJC5jb2YnKVxuICAsICRpdGVyICAgICAgICAgICA9IHJlcXVpcmUoJy4vJC5pdGVyJylcbiAgLCBTWU1CT0xfSVRFUkFUT1IgPSByZXF1aXJlKCcuLyQud2tzJykoJ2l0ZXJhdG9yJylcbiAgLCBGRl9JVEVSQVRPUiAgICAgPSAnQEBpdGVyYXRvcidcbiAgLCBLRVlTICAgICAgICAgICAgPSAna2V5cydcbiAgLCBWQUxVRVMgICAgICAgICAgPSAndmFsdWVzJ1xuICAsIEl0ZXJhdG9ycyAgICAgICA9ICRpdGVyLkl0ZXJhdG9ycztcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oQmFzZSwgTkFNRSwgQ29uc3RydWN0b3IsIG5leHQsIERFRkFVTFQsIElTX1NFVCwgRk9SQ0Upe1xuICAkaXRlci5jcmVhdGUoQ29uc3RydWN0b3IsIE5BTUUsIG5leHQpO1xuICBmdW5jdGlvbiBjcmVhdGVNZXRob2Qoa2luZCl7XG4gICAgZnVuY3Rpb24gJCQodGhhdCl7XG4gICAgICByZXR1cm4gbmV3IENvbnN0cnVjdG9yKHRoYXQsIGtpbmQpO1xuICAgIH1cbiAgICBzd2l0Y2goa2luZCl7XG4gICAgICBjYXNlIEtFWVM6IHJldHVybiBmdW5jdGlvbiBrZXlzKCl7IHJldHVybiAkJCh0aGlzKTsgfTtcbiAgICAgIGNhc2UgVkFMVUVTOiByZXR1cm4gZnVuY3Rpb24gdmFsdWVzKCl7IHJldHVybiAkJCh0aGlzKTsgfTtcbiAgICB9IHJldHVybiBmdW5jdGlvbiBlbnRyaWVzKCl7IHJldHVybiAkJCh0aGlzKTsgfTtcbiAgfVxuICB2YXIgVEFHICAgICAgPSBOQU1FICsgJyBJdGVyYXRvcidcbiAgICAsIHByb3RvICAgID0gQmFzZS5wcm90b3R5cGVcbiAgICAsIF9uYXRpdmUgID0gcHJvdG9bU1lNQk9MX0lURVJBVE9SXSB8fCBwcm90b1tGRl9JVEVSQVRPUl0gfHwgREVGQVVMVCAmJiBwcm90b1tERUZBVUxUXVxuICAgICwgX2RlZmF1bHQgPSBfbmF0aXZlIHx8IGNyZWF0ZU1ldGhvZChERUZBVUxUKVxuICAgICwgbWV0aG9kcywga2V5O1xuICAvLyBGaXggbmF0aXZlXG4gIGlmKF9uYXRpdmUpe1xuICAgIHZhciBJdGVyYXRvclByb3RvdHlwZSA9ICQuZ2V0UHJvdG8oX2RlZmF1bHQuY2FsbChuZXcgQmFzZSkpO1xuICAgIC8vIFNldCBAQHRvU3RyaW5nVGFnIHRvIG5hdGl2ZSBpdGVyYXRvcnNcbiAgICBjb2Yuc2V0KEl0ZXJhdG9yUHJvdG90eXBlLCBUQUcsIHRydWUpO1xuICAgIC8vIEZGIGZpeFxuICAgIGlmKCQuRlcgJiYgJC5oYXMocHJvdG8sIEZGX0lURVJBVE9SKSkkaXRlci5zZXQoSXRlcmF0b3JQcm90b3R5cGUsICQudGhhdCk7XG4gIH1cbiAgLy8gRGVmaW5lIGl0ZXJhdG9yXG4gIGlmKCQuRlcpJGl0ZXIuc2V0KHByb3RvLCBfZGVmYXVsdCk7XG4gIC8vIFBsdWcgZm9yIGxpYnJhcnlcbiAgSXRlcmF0b3JzW05BTUVdID0gX2RlZmF1bHQ7XG4gIEl0ZXJhdG9yc1tUQUddICA9ICQudGhhdDtcbiAgaWYoREVGQVVMVCl7XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIGtleXM6ICAgIElTX1NFVCAgICAgICAgICAgID8gX2RlZmF1bHQgOiBjcmVhdGVNZXRob2QoS0VZUyksXG4gICAgICB2YWx1ZXM6ICBERUZBVUxUID09IFZBTFVFUyA/IF9kZWZhdWx0IDogY3JlYXRlTWV0aG9kKFZBTFVFUyksXG4gICAgICBlbnRyaWVzOiBERUZBVUxUICE9IFZBTFVFUyA/IF9kZWZhdWx0IDogY3JlYXRlTWV0aG9kKCdlbnRyaWVzJylcbiAgICB9O1xuICAgIGlmKEZPUkNFKWZvcihrZXkgaW4gbWV0aG9kcyl7XG4gICAgICBpZighKGtleSBpbiBwcm90bykpJHJlZGVmKHByb3RvLCBrZXksIG1ldGhvZHNba2V5XSk7XG4gICAgfSBlbHNlICRkZWYoJGRlZi5QICsgJGRlZi5GICogJGl0ZXIuQlVHR1ksIE5BTUUsIG1ldGhvZHMpO1xuICB9XG59OyIsInZhciBTWU1CT0xfSVRFUkFUT1IgPSByZXF1aXJlKCcuLyQud2tzJykoJ2l0ZXJhdG9yJylcbiAgLCBTQUZFX0NMT1NJTkcgICAgPSBmYWxzZTtcbnRyeSB7XG4gIHZhciByaXRlciA9IFs3XVtTWU1CT0xfSVRFUkFUT1JdKCk7XG4gIHJpdGVyWydyZXR1cm4nXSA9IGZ1bmN0aW9uKCl7IFNBRkVfQ0xPU0lORyA9IHRydWU7IH07XG4gIEFycmF5LmZyb20ocml0ZXIsIGZ1bmN0aW9uKCl7IHRocm93IDI7IH0pO1xufSBjYXRjaChlKXsgLyogZW1wdHkgKi8gfVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihleGVjKXtcbiAgaWYoIVNBRkVfQ0xPU0lORylyZXR1cm4gZmFsc2U7XG4gIHZhciBzYWZlID0gZmFsc2U7XG4gIHRyeSB7XG4gICAgdmFyIGFyciAgPSBbN11cbiAgICAgICwgaXRlciA9IGFycltTWU1CT0xfSVRFUkFUT1JdKCk7XG4gICAgaXRlci5uZXh0ID0gZnVuY3Rpb24oKXsgc2FmZSA9IHRydWU7IH07XG4gICAgYXJyW1NZTUJPTF9JVEVSQVRPUl0gPSBmdW5jdGlvbigpeyByZXR1cm4gaXRlcjsgfTtcbiAgICBleGVjKGFycik7XG4gIH0gY2F0Y2goZSl7IC8qIGVtcHR5ICovIH1cbiAgcmV0dXJuIHNhZmU7XG59OyIsIid1c2Ugc3RyaWN0JztcbnZhciAkICAgICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vJCcpXG4gICwgY29mICAgICAgICAgICAgICAgPSByZXF1aXJlKCcuLyQuY29mJylcbiAgLCBhc3NlcnRPYmplY3QgICAgICA9IHJlcXVpcmUoJy4vJC5hc3NlcnQnKS5vYmpcbiAgLCBTWU1CT0xfSVRFUkFUT1IgICA9IHJlcXVpcmUoJy4vJC53a3MnKSgnaXRlcmF0b3InKVxuICAsIEZGX0lURVJBVE9SICAgICAgID0gJ0BAaXRlcmF0b3InXG4gICwgSXRlcmF0b3JzICAgICAgICAgPSByZXF1aXJlKCcuLyQuc2hhcmVkJykoJ2l0ZXJhdG9ycycpXG4gICwgSXRlcmF0b3JQcm90b3R5cGUgPSB7fTtcbi8vIDI1LjEuMi4xLjEgJUl0ZXJhdG9yUHJvdG90eXBlJVtAQGl0ZXJhdG9yXSgpXG5zZXRJdGVyYXRvcihJdGVyYXRvclByb3RvdHlwZSwgJC50aGF0KTtcbmZ1bmN0aW9uIHNldEl0ZXJhdG9yKE8sIHZhbHVlKXtcbiAgJC5oaWRlKE8sIFNZTUJPTF9JVEVSQVRPUiwgdmFsdWUpO1xuICAvLyBBZGQgaXRlcmF0b3IgZm9yIEZGIGl0ZXJhdG9yIHByb3RvY29sXG4gIGlmKEZGX0lURVJBVE9SIGluIFtdKSQuaGlkZShPLCBGRl9JVEVSQVRPUiwgdmFsdWUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgLy8gU2FmYXJpIGhhcyBidWdneSBpdGVyYXRvcnMgdy9vIGBuZXh0YFxuICBCVUdHWTogJ2tleXMnIGluIFtdICYmICEoJ25leHQnIGluIFtdLmtleXMoKSksXG4gIEl0ZXJhdG9yczogSXRlcmF0b3JzLFxuICBzdGVwOiBmdW5jdGlvbihkb25lLCB2YWx1ZSl7XG4gICAgcmV0dXJuIHt2YWx1ZTogdmFsdWUsIGRvbmU6ICEhZG9uZX07XG4gIH0sXG4gIGlzOiBmdW5jdGlvbihpdCl7XG4gICAgdmFyIE8gICAgICA9IE9iamVjdChpdClcbiAgICAgICwgU3ltYm9sID0gJC5nLlN5bWJvbFxuICAgICAgLCBTWU0gICAgPSBTeW1ib2wgJiYgU3ltYm9sLml0ZXJhdG9yIHx8IEZGX0lURVJBVE9SO1xuICAgIHJldHVybiBTWU0gaW4gTyB8fCBTWU1CT0xfSVRFUkFUT1IgaW4gTyB8fCAkLmhhcyhJdGVyYXRvcnMsIGNvZi5jbGFzc29mKE8pKTtcbiAgfSxcbiAgZ2V0OiBmdW5jdGlvbihpdCl7XG4gICAgdmFyIFN5bWJvbCAgPSAkLmcuU3ltYm9sXG4gICAgICAsIGV4dCAgICAgPSBpdFtTeW1ib2wgJiYgU3ltYm9sLml0ZXJhdG9yIHx8IEZGX0lURVJBVE9SXVxuICAgICAgLCBnZXRJdGVyID0gZXh0IHx8IGl0W1NZTUJPTF9JVEVSQVRPUl0gfHwgSXRlcmF0b3JzW2NvZi5jbGFzc29mKGl0KV07XG4gICAgcmV0dXJuIGFzc2VydE9iamVjdChnZXRJdGVyLmNhbGwoaXQpKTtcbiAgfSxcbiAgc2V0OiBzZXRJdGVyYXRvcixcbiAgY3JlYXRlOiBmdW5jdGlvbihDb25zdHJ1Y3RvciwgTkFNRSwgbmV4dCwgcHJvdG8pe1xuICAgIENvbnN0cnVjdG9yLnByb3RvdHlwZSA9ICQuY3JlYXRlKHByb3RvIHx8IEl0ZXJhdG9yUHJvdG90eXBlLCB7bmV4dDogJC5kZXNjKDEsIG5leHQpfSk7XG4gICAgY29mLnNldChDb25zdHJ1Y3RvciwgTkFNRSArICcgSXRlcmF0b3InKTtcbiAgfVxufTsiLCIndXNlIHN0cmljdCc7XG52YXIgZ2xvYmFsID0gdHlwZW9mIHNlbGYgIT0gJ3VuZGVmaW5lZCcgPyBzZWxmIDogRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKVxuICAsIGNvcmUgICA9IHt9XG4gICwgZGVmaW5lUHJvcGVydHkgPSBPYmplY3QuZGVmaW5lUHJvcGVydHlcbiAgLCBoYXNPd25Qcm9wZXJ0eSA9IHt9Lmhhc093blByb3BlcnR5XG4gICwgY2VpbCAgPSBNYXRoLmNlaWxcbiAgLCBmbG9vciA9IE1hdGguZmxvb3JcbiAgLCBtYXggICA9IE1hdGgubWF4XG4gICwgbWluICAgPSBNYXRoLm1pbjtcbi8vIFRoZSBlbmdpbmUgd29ya3MgZmluZSB3aXRoIGRlc2NyaXB0b3JzPyBUaGFuaydzIElFOCBmb3IgaGlzIGZ1bm55IGRlZmluZVByb3BlcnR5LlxudmFyIERFU0MgPSAhIWZ1bmN0aW9uKCl7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGRlZmluZVByb3BlcnR5KHt9LCAnYScsIHtnZXQ6IGZ1bmN0aW9uKCl7IHJldHVybiAyOyB9fSkuYSA9PSAyO1xuICB9IGNhdGNoKGUpeyAvKiBlbXB0eSAqLyB9XG59KCk7XG52YXIgaGlkZSA9IGNyZWF0ZURlZmluZXIoMSk7XG4vLyA3LjEuNCBUb0ludGVnZXJcbmZ1bmN0aW9uIHRvSW50ZWdlcihpdCl7XG4gIHJldHVybiBpc05hTihpdCA9ICtpdCkgPyAwIDogKGl0ID4gMCA/IGZsb29yIDogY2VpbCkoaXQpO1xufVxuZnVuY3Rpb24gZGVzYyhiaXRtYXAsIHZhbHVlKXtcbiAgcmV0dXJuIHtcbiAgICBlbnVtZXJhYmxlICA6ICEoYml0bWFwICYgMSksXG4gICAgY29uZmlndXJhYmxlOiAhKGJpdG1hcCAmIDIpLFxuICAgIHdyaXRhYmxlICAgIDogIShiaXRtYXAgJiA0KSxcbiAgICB2YWx1ZSAgICAgICA6IHZhbHVlXG4gIH07XG59XG5mdW5jdGlvbiBzaW1wbGVTZXQob2JqZWN0LCBrZXksIHZhbHVlKXtcbiAgb2JqZWN0W2tleV0gPSB2YWx1ZTtcbiAgcmV0dXJuIG9iamVjdDtcbn1cbmZ1bmN0aW9uIGNyZWF0ZURlZmluZXIoYml0bWFwKXtcbiAgcmV0dXJuIERFU0MgPyBmdW5jdGlvbihvYmplY3QsIGtleSwgdmFsdWUpe1xuICAgIHJldHVybiAkLnNldERlc2Mob2JqZWN0LCBrZXksIGRlc2MoYml0bWFwLCB2YWx1ZSkpO1xuICB9IDogc2ltcGxlU2V0O1xufVxuXG5mdW5jdGlvbiBpc09iamVjdChpdCl7XG4gIHJldHVybiBpdCAhPT0gbnVsbCAmJiAodHlwZW9mIGl0ID09ICdvYmplY3QnIHx8IHR5cGVvZiBpdCA9PSAnZnVuY3Rpb24nKTtcbn1cbmZ1bmN0aW9uIGlzRnVuY3Rpb24oaXQpe1xuICByZXR1cm4gdHlwZW9mIGl0ID09ICdmdW5jdGlvbic7XG59XG5mdW5jdGlvbiBhc3NlcnREZWZpbmVkKGl0KXtcbiAgaWYoaXQgPT0gdW5kZWZpbmVkKXRocm93IFR5cGVFcnJvcihcIkNhbid0IGNhbGwgbWV0aG9kIG9uICBcIiArIGl0KTtcbiAgcmV0dXJuIGl0O1xufVxuXG52YXIgJCA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi8kLmZ3Jykoe1xuICBnOiBnbG9iYWwsXG4gIGNvcmU6IGNvcmUsXG4gIGh0bWw6IGdsb2JhbC5kb2N1bWVudCAmJiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsXG4gIC8vIGh0dHA6Ly9qc3BlcmYuY29tL2NvcmUtanMtaXNvYmplY3RcbiAgaXNPYmplY3Q6ICAgaXNPYmplY3QsXG4gIGlzRnVuY3Rpb246IGlzRnVuY3Rpb24sXG4gIHRoYXQ6IGZ1bmN0aW9uKCl7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG4gIC8vIDcuMS40IFRvSW50ZWdlclxuICB0b0ludGVnZXI6IHRvSW50ZWdlcixcbiAgLy8gNy4xLjE1IFRvTGVuZ3RoXG4gIHRvTGVuZ3RoOiBmdW5jdGlvbihpdCl7XG4gICAgcmV0dXJuIGl0ID4gMCA/IG1pbih0b0ludGVnZXIoaXQpLCAweDFmZmZmZmZmZmZmZmZmKSA6IDA7IC8vIHBvdygyLCA1MykgLSAxID09IDkwMDcxOTkyNTQ3NDA5OTFcbiAgfSxcbiAgdG9JbmRleDogZnVuY3Rpb24oaW5kZXgsIGxlbmd0aCl7XG4gICAgaW5kZXggPSB0b0ludGVnZXIoaW5kZXgpO1xuICAgIHJldHVybiBpbmRleCA8IDAgPyBtYXgoaW5kZXggKyBsZW5ndGgsIDApIDogbWluKGluZGV4LCBsZW5ndGgpO1xuICB9LFxuICBoYXM6IGZ1bmN0aW9uKGl0LCBrZXkpe1xuICAgIHJldHVybiBoYXNPd25Qcm9wZXJ0eS5jYWxsKGl0LCBrZXkpO1xuICB9LFxuICBjcmVhdGU6ICAgICBPYmplY3QuY3JlYXRlLFxuICBnZXRQcm90bzogICBPYmplY3QuZ2V0UHJvdG90eXBlT2YsXG4gIERFU0M6ICAgICAgIERFU0MsXG4gIGRlc2M6ICAgICAgIGRlc2MsXG4gIGdldERlc2M6ICAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IsXG4gIHNldERlc2M6ICAgIGRlZmluZVByb3BlcnR5LFxuICBzZXREZXNjczogICBPYmplY3QuZGVmaW5lUHJvcGVydGllcyxcbiAgZ2V0S2V5czogICAgT2JqZWN0LmtleXMsXG4gIGdldE5hbWVzOiAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzLFxuICBnZXRTeW1ib2xzOiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzLFxuICBhc3NlcnREZWZpbmVkOiBhc3NlcnREZWZpbmVkLFxuICAvLyBEdW1teSwgZml4IGZvciBub3QgYXJyYXktbGlrZSBFUzMgc3RyaW5nIGluIGVzNSBtb2R1bGVcbiAgRVM1T2JqZWN0OiBPYmplY3QsXG4gIHRvT2JqZWN0OiBmdW5jdGlvbihpdCl7XG4gICAgcmV0dXJuICQuRVM1T2JqZWN0KGFzc2VydERlZmluZWQoaXQpKTtcbiAgfSxcbiAgaGlkZTogaGlkZSxcbiAgZGVmOiBjcmVhdGVEZWZpbmVyKDApLFxuICBzZXQ6IGdsb2JhbC5TeW1ib2wgPyBzaW1wbGVTZXQgOiBoaWRlLFxuICBlYWNoOiBbXS5mb3JFYWNoXG59KTtcbi8qIGVzbGludC1kaXNhYmxlIG5vLXVuZGVmICovXG5pZih0eXBlb2YgX19lICE9ICd1bmRlZmluZWQnKV9fZSA9IGNvcmU7XG5pZih0eXBlb2YgX19nICE9ICd1bmRlZmluZWQnKV9fZyA9IGdsb2JhbDsiLCJ2YXIgJCA9IHJlcXVpcmUoJy4vJCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihvYmplY3QsIGVsKXtcbiAgdmFyIE8gICAgICA9ICQudG9PYmplY3Qob2JqZWN0KVxuICAgICwga2V5cyAgID0gJC5nZXRLZXlzKE8pXG4gICAgLCBsZW5ndGggPSBrZXlzLmxlbmd0aFxuICAgICwgaW5kZXggID0gMFxuICAgICwga2V5O1xuICB3aGlsZShsZW5ndGggPiBpbmRleClpZihPW2tleSA9IGtleXNbaW5kZXgrK11dID09PSBlbClyZXR1cm4ga2V5O1xufTsiLCJ2YXIgJHJlZGVmID0gcmVxdWlyZSgnLi8kLnJlZGVmJyk7XHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24odGFyZ2V0LCBzcmMpe1xyXG4gIGZvcih2YXIga2V5IGluIHNyYykkcmVkZWYodGFyZ2V0LCBrZXksIHNyY1trZXldKTtcclxuICByZXR1cm4gdGFyZ2V0O1xyXG59OyIsInZhciAkICAgICAgICAgICAgPSByZXF1aXJlKCcuLyQnKVxuICAsIGFzc2VydE9iamVjdCA9IHJlcXVpcmUoJy4vJC5hc3NlcnQnKS5vYmo7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIG93bktleXMoaXQpe1xuICBhc3NlcnRPYmplY3QoaXQpO1xuICB2YXIga2V5cyAgICAgICA9ICQuZ2V0TmFtZXMoaXQpXG4gICAgLCBnZXRTeW1ib2xzID0gJC5nZXRTeW1ib2xzO1xuICByZXR1cm4gZ2V0U3ltYm9scyA/IGtleXMuY29uY2F0KGdldFN5bWJvbHMoaXQpKSA6IGtleXM7XG59OyIsIid1c2Ugc3RyaWN0JztcbnZhciAkICAgICAgPSByZXF1aXJlKCcuLyQnKVxuICAsIGludm9rZSA9IHJlcXVpcmUoJy4vJC5pbnZva2UnKVxuICAsIGFzc2VydEZ1bmN0aW9uID0gcmVxdWlyZSgnLi8kLmFzc2VydCcpLmZuO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigvKiAuLi5wYXJncyAqLyl7XG4gIHZhciBmbiAgICAgPSBhc3NlcnRGdW5jdGlvbih0aGlzKVxuICAgICwgbGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aFxuICAgICwgcGFyZ3MgID0gQXJyYXkobGVuZ3RoKVxuICAgICwgaSAgICAgID0gMFxuICAgICwgXyAgICAgID0gJC5wYXRoLl9cbiAgICAsIGhvbGRlciA9IGZhbHNlO1xuICB3aGlsZShsZW5ndGggPiBpKWlmKChwYXJnc1tpXSA9IGFyZ3VtZW50c1tpKytdKSA9PT0gXylob2xkZXIgPSB0cnVlO1xuICByZXR1cm4gZnVuY3Rpb24oLyogLi4uYXJncyAqLyl7XG4gICAgdmFyIHRoYXQgICAgPSB0aGlzXG4gICAgICAsIF9sZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoXG4gICAgICAsIGogPSAwLCBrID0gMCwgYXJncztcbiAgICBpZighaG9sZGVyICYmICFfbGVuZ3RoKXJldHVybiBpbnZva2UoZm4sIHBhcmdzLCB0aGF0KTtcbiAgICBhcmdzID0gcGFyZ3Muc2xpY2UoKTtcbiAgICBpZihob2xkZXIpZm9yKDtsZW5ndGggPiBqOyBqKyspaWYoYXJnc1tqXSA9PT0gXylhcmdzW2pdID0gYXJndW1lbnRzW2srK107XG4gICAgd2hpbGUoX2xlbmd0aCA+IGspYXJncy5wdXNoKGFyZ3VtZW50c1trKytdKTtcbiAgICByZXR1cm4gaW52b2tlKGZuLCBhcmdzLCB0aGF0KTtcbiAgfTtcbn07IiwidmFyICQgICA9IHJlcXVpcmUoJy4vJCcpXHJcbiAgLCB0cGwgPSBTdHJpbmcoe30uaGFzT3duUHJvcGVydHkpXHJcbiAgLCBTUkMgPSByZXF1aXJlKCcuLyQudWlkJykuc2FmZSgnc3JjJylcclxuICAsIF90b1N0cmluZyA9IEZ1bmN0aW9uLnRvU3RyaW5nO1xyXG5cclxuZnVuY3Rpb24gJHJlZGVmKE8sIGtleSwgdmFsLCBzYWZlKXtcclxuICBpZigkLmlzRnVuY3Rpb24odmFsKSl7XHJcbiAgICB2YXIgYmFzZSA9IE9ba2V5XTtcclxuICAgICQuaGlkZSh2YWwsIFNSQywgYmFzZSA/IFN0cmluZyhiYXNlKSA6IHRwbC5yZXBsYWNlKC9oYXNPd25Qcm9wZXJ0eS8sIFN0cmluZyhrZXkpKSk7XHJcbiAgfVxyXG4gIGlmKE8gPT09ICQuZyl7XHJcbiAgICBPW2tleV0gPSB2YWw7XHJcbiAgfSBlbHNlIHtcclxuICAgIGlmKCFzYWZlKWRlbGV0ZSBPW2tleV07XHJcbiAgICAkLmhpZGUoTywga2V5LCB2YWwpO1xyXG4gIH1cclxufVxyXG5cclxuLy8gYWRkIGZha2UgRnVuY3Rpb24jdG9TdHJpbmcgZm9yIGNvcnJlY3Qgd29yayB3cmFwcGVkIG1ldGhvZHMgLyBjb25zdHJ1Y3RvcnNcclxuLy8gd2l0aCBtZXRob2RzIHNpbWlsYXIgdG8gTG9EYXNoIGlzTmF0aXZlXHJcbiRyZWRlZihGdW5jdGlvbi5wcm90b3R5cGUsICd0b1N0cmluZycsIGZ1bmN0aW9uIHRvU3RyaW5nKCl7XHJcbiAgcmV0dXJuICQuaGFzKHRoaXMsIFNSQykgPyB0aGlzW1NSQ10gOiBfdG9TdHJpbmcuY2FsbCh0aGlzKTtcclxufSk7XHJcblxyXG4kLmNvcmUuaW5zcGVjdFNvdXJjZSA9IGZ1bmN0aW9uKGl0KXtcclxuICByZXR1cm4gX3RvU3RyaW5nLmNhbGwoaXQpO1xyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSAkcmVkZWY7IiwiJ3VzZSBzdHJpY3QnO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihyZWdFeHAsIHJlcGxhY2UsIGlzU3RhdGljKXtcbiAgdmFyIHJlcGxhY2VyID0gcmVwbGFjZSA9PT0gT2JqZWN0KHJlcGxhY2UpID8gZnVuY3Rpb24ocGFydCl7XG4gICAgcmV0dXJuIHJlcGxhY2VbcGFydF07XG4gIH0gOiByZXBsYWNlO1xuICByZXR1cm4gZnVuY3Rpb24oaXQpe1xuICAgIHJldHVybiBTdHJpbmcoaXNTdGF0aWMgPyBpdCA6IHRoaXMpLnJlcGxhY2UocmVnRXhwLCByZXBsYWNlcik7XG4gIH07XG59OyIsIi8vIFdvcmtzIHdpdGggX19wcm90b19fIG9ubHkuIE9sZCB2OCBjYW4ndCB3b3JrIHdpdGggbnVsbCBwcm90byBvYmplY3RzLlxuLyogZXNsaW50LWRpc2FibGUgbm8tcHJvdG8gKi9cbnZhciAkICAgICAgPSByZXF1aXJlKCcuLyQnKVxuICAsIGFzc2VydCA9IHJlcXVpcmUoJy4vJC5hc3NlcnQnKTtcbmZ1bmN0aW9uIGNoZWNrKE8sIHByb3RvKXtcbiAgYXNzZXJ0Lm9iaihPKTtcbiAgYXNzZXJ0KHByb3RvID09PSBudWxsIHx8ICQuaXNPYmplY3QocHJvdG8pLCBwcm90bywgXCI6IGNhbid0IHNldCBhcyBwcm90b3R5cGUhXCIpO1xufVxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHNldDogT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8ICgnX19wcm90b19fJyBpbiB7fSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgPyBmdW5jdGlvbihidWdneSwgc2V0KXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBzZXQgPSByZXF1aXJlKCcuLyQuY3R4JykoRnVuY3Rpb24uY2FsbCwgJC5nZXREZXNjKE9iamVjdC5wcm90b3R5cGUsICdfX3Byb3RvX18nKS5zZXQsIDIpO1xuICAgICAgICAgIHNldCh7fSwgW10pO1xuICAgICAgICB9IGNhdGNoKGUpeyBidWdneSA9IHRydWU7IH1cbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIHNldFByb3RvdHlwZU9mKE8sIHByb3RvKXtcbiAgICAgICAgICBjaGVjayhPLCBwcm90byk7XG4gICAgICAgICAgaWYoYnVnZ3kpTy5fX3Byb3RvX18gPSBwcm90bztcbiAgICAgICAgICBlbHNlIHNldChPLCBwcm90byk7XG4gICAgICAgICAgcmV0dXJuIE87XG4gICAgICAgIH07XG4gICAgICB9KClcbiAgICA6IHVuZGVmaW5lZCksXG4gIGNoZWNrOiBjaGVja1xufTsiLCJ2YXIgJCAgICAgID0gcmVxdWlyZSgnLi8kJylcclxuICAsIFNIQVJFRCA9ICdfX2NvcmUtanNfc2hhcmVkX18nXHJcbiAgLCBzdG9yZSAgPSAkLmdbU0hBUkVEXSB8fCAkLmhpZGUoJC5nLCBTSEFSRUQsIHt9KVtTSEFSRURdO1xyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGtleSl7XHJcbiAgcmV0dXJuIHN0b3JlW2tleV0gfHwgKHN0b3JlW2tleV0gPSB7fSk7XHJcbn07IiwidmFyICQgICAgICAgPSByZXF1aXJlKCcuLyQnKVxuICAsIFNQRUNJRVMgPSByZXF1aXJlKCcuLyQud2tzJykoJ3NwZWNpZXMnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oQyl7XG4gIGlmKCQuREVTQyAmJiAhKFNQRUNJRVMgaW4gQykpJC5zZXREZXNjKEMsIFNQRUNJRVMsIHtcbiAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgZ2V0OiAkLnRoYXRcbiAgfSk7XG59OyIsIi8vIHRydWUgIC0+IFN0cmluZyNhdFxuLy8gZmFsc2UgLT4gU3RyaW5nI2NvZGVQb2ludEF0XG52YXIgJCA9IHJlcXVpcmUoJy4vJCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihUT19TVFJJTkcpe1xuICByZXR1cm4gZnVuY3Rpb24odGhhdCwgcG9zKXtcbiAgICB2YXIgcyA9IFN0cmluZygkLmFzc2VydERlZmluZWQodGhhdCkpXG4gICAgICAsIGkgPSAkLnRvSW50ZWdlcihwb3MpXG4gICAgICAsIGwgPSBzLmxlbmd0aFxuICAgICAgLCBhLCBiO1xuICAgIGlmKGkgPCAwIHx8IGkgPj0gbClyZXR1cm4gVE9fU1RSSU5HID8gJycgOiB1bmRlZmluZWQ7XG4gICAgYSA9IHMuY2hhckNvZGVBdChpKTtcbiAgICByZXR1cm4gYSA8IDB4ZDgwMCB8fCBhID4gMHhkYmZmIHx8IGkgKyAxID09PSBsXG4gICAgICB8fCAoYiA9IHMuY2hhckNvZGVBdChpICsgMSkpIDwgMHhkYzAwIHx8IGIgPiAweGRmZmZcbiAgICAgICAgPyBUT19TVFJJTkcgPyBzLmNoYXJBdChpKSA6IGFcbiAgICAgICAgOiBUT19TVFJJTkcgPyBzLnNsaWNlKGksIGkgKyAyKSA6IChhIC0gMHhkODAwIDw8IDEwKSArIChiIC0gMHhkYzAwKSArIDB4MTAwMDA7XG4gIH07XG59OyIsIi8vIGh0dHA6Ly93aWtpLmVjbWFzY3JpcHQub3JnL2Rva3UucGhwP2lkPXN0cmF3bWFuOnN0cmluZ19wYWRkaW5nXG52YXIgJCAgICAgID0gcmVxdWlyZSgnLi8kJylcbiAgLCByZXBlYXQgPSByZXF1aXJlKCcuLyQuc3RyaW5nLXJlcGVhdCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHRoYXQsIG1pbkxlbmd0aCwgZmlsbENoYXIsIGxlZnQpe1xuICAvLyAxLiBMZXQgTyBiZSBDaGVja09iamVjdENvZXJjaWJsZSh0aGlzIHZhbHVlKS5cbiAgLy8gMi4gTGV0IFMgYmUgVG9TdHJpbmcoTykuXG4gIHZhciBTID0gU3RyaW5nKCQuYXNzZXJ0RGVmaW5lZCh0aGF0KSk7XG4gIC8vIDQuIElmIGludE1pbkxlbmd0aCBpcyB1bmRlZmluZWQsIHJldHVybiBTLlxuICBpZihtaW5MZW5ndGggPT09IHVuZGVmaW5lZClyZXR1cm4gUztcbiAgLy8gNC4gTGV0IGludE1pbkxlbmd0aCBiZSBUb0ludGVnZXIobWluTGVuZ3RoKS5cbiAgdmFyIGludE1pbkxlbmd0aCA9ICQudG9JbnRlZ2VyKG1pbkxlbmd0aCk7XG4gIC8vIDUuIExldCBmaWxsTGVuIGJlIHRoZSBudW1iZXIgb2YgY2hhcmFjdGVycyBpbiBTIG1pbnVzIGludE1pbkxlbmd0aC5cbiAgdmFyIGZpbGxMZW4gPSBpbnRNaW5MZW5ndGggLSBTLmxlbmd0aDtcbiAgLy8gNi4gSWYgZmlsbExlbiA8IDAsIHRoZW4gdGhyb3cgYSBSYW5nZUVycm9yIGV4Y2VwdGlvbi5cbiAgLy8gNy4gSWYgZmlsbExlbiBpcyAr4oieLCB0aGVuIHRocm93IGEgUmFuZ2VFcnJvciBleGNlcHRpb24uXG4gIGlmKGZpbGxMZW4gPCAwIHx8IGZpbGxMZW4gPT09IEluZmluaXR5KXtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignQ2Fubm90IHNhdGlzZnkgc3RyaW5nIGxlbmd0aCAnICsgbWluTGVuZ3RoICsgJyBmb3Igc3RyaW5nOiAnICsgUyk7XG4gIH1cbiAgLy8gOC4gTGV0IHNGaWxsU3RyIGJlIHRoZSBzdHJpbmcgcmVwcmVzZW50ZWQgYnkgZmlsbFN0ci5cbiAgLy8gOS4gSWYgc0ZpbGxTdHIgaXMgdW5kZWZpbmVkLCBsZXQgc0ZpbGxTdHIgYmUgYSBzcGFjZSBjaGFyYWN0ZXIuXG4gIHZhciBzRmlsbFN0ciA9IGZpbGxDaGFyID09PSB1bmRlZmluZWQgPyAnICcgOiBTdHJpbmcoZmlsbENoYXIpO1xuICAvLyAxMC4gTGV0IHNGaWxsVmFsIGJlIGEgU3RyaW5nIG1hZGUgb2Ygc0ZpbGxTdHIsIHJlcGVhdGVkIHVudGlsIGZpbGxMZW4gaXMgbWV0LlxuICB2YXIgc0ZpbGxWYWwgPSByZXBlYXQuY2FsbChzRmlsbFN0ciwgTWF0aC5jZWlsKGZpbGxMZW4gLyBzRmlsbFN0ci5sZW5ndGgpKTtcbiAgLy8gdHJ1bmNhdGUgaWYgd2Ugb3ZlcmZsb3dlZFxuICBpZihzRmlsbFZhbC5sZW5ndGggPiBmaWxsTGVuKXNGaWxsVmFsID0gbGVmdFxuICAgID8gc0ZpbGxWYWwuc2xpY2Uoc0ZpbGxWYWwubGVuZ3RoIC0gZmlsbExlbilcbiAgICA6IHNGaWxsVmFsLnNsaWNlKDAsIGZpbGxMZW4pO1xuICAvLyAxMS4gUmV0dXJuIGEgc3RyaW5nIG1hZGUgZnJvbSBzRmlsbFZhbCwgZm9sbG93ZWQgYnkgUy5cbiAgLy8gMTEuIFJldHVybiBhIFN0cmluZyBtYWRlIGZyb20gUywgZm9sbG93ZWQgYnkgc0ZpbGxWYWwuXG4gIHJldHVybiBsZWZ0ID8gc0ZpbGxWYWwuY29uY2F0KFMpIDogUy5jb25jYXQoc0ZpbGxWYWwpO1xufTsiLCIndXNlIHN0cmljdCc7XG52YXIgJCA9IHJlcXVpcmUoJy4vJCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHJlcGVhdChjb3VudCl7XG4gIHZhciBzdHIgPSBTdHJpbmcoJC5hc3NlcnREZWZpbmVkKHRoaXMpKVxuICAgICwgcmVzID0gJydcbiAgICAsIG4gICA9ICQudG9JbnRlZ2VyKGNvdW50KTtcbiAgaWYobiA8IDAgfHwgbiA9PSBJbmZpbml0eSl0aHJvdyBSYW5nZUVycm9yKFwiQ291bnQgY2FuJ3QgYmUgbmVnYXRpdmVcIik7XG4gIGZvcig7biA+IDA7IChuID4+Pj0gMSkgJiYgKHN0ciArPSBzdHIpKWlmKG4gJiAxKXJlcyArPSBzdHI7XG4gIHJldHVybiByZXM7XG59OyIsIid1c2Ugc3RyaWN0JztcbnZhciAkICAgICAgPSByZXF1aXJlKCcuLyQnKVxuICAsIGN0eCAgICA9IHJlcXVpcmUoJy4vJC5jdHgnKVxuICAsIGNvZiAgICA9IHJlcXVpcmUoJy4vJC5jb2YnKVxuICAsIGludm9rZSA9IHJlcXVpcmUoJy4vJC5pbnZva2UnKVxuICAsIGNlbCAgICA9IHJlcXVpcmUoJy4vJC5kb20tY3JlYXRlJylcbiAgLCBnbG9iYWwgICAgICAgICAgICAgPSAkLmdcbiAgLCBpc0Z1bmN0aW9uICAgICAgICAgPSAkLmlzRnVuY3Rpb25cbiAgLCBodG1sICAgICAgICAgICAgICAgPSAkLmh0bWxcbiAgLCBwcm9jZXNzICAgICAgICAgICAgPSBnbG9iYWwucHJvY2Vzc1xuICAsIHNldFRhc2sgICAgICAgICAgICA9IGdsb2JhbC5zZXRJbW1lZGlhdGVcbiAgLCBjbGVhclRhc2sgICAgICAgICAgPSBnbG9iYWwuY2xlYXJJbW1lZGlhdGVcbiAgLCBwb3N0TWVzc2FnZSAgICAgICAgPSBnbG9iYWwucG9zdE1lc3NhZ2VcbiAgLCBhZGRFdmVudExpc3RlbmVyICAgPSBnbG9iYWwuYWRkRXZlbnRMaXN0ZW5lclxuICAsIE1lc3NhZ2VDaGFubmVsICAgICA9IGdsb2JhbC5NZXNzYWdlQ2hhbm5lbFxuICAsIGNvdW50ZXIgICAgICAgICAgICA9IDBcbiAgLCBxdWV1ZSAgICAgICAgICAgICAgPSB7fVxuICAsIE9OUkVBRFlTVEFURUNIQU5HRSA9ICdvbnJlYWR5c3RhdGVjaGFuZ2UnXG4gICwgZGVmZXIsIGNoYW5uZWwsIHBvcnQ7XG5mdW5jdGlvbiBydW4oKXtcbiAgdmFyIGlkID0gK3RoaXM7XG4gIGlmKCQuaGFzKHF1ZXVlLCBpZCkpe1xuICAgIHZhciBmbiA9IHF1ZXVlW2lkXTtcbiAgICBkZWxldGUgcXVldWVbaWRdO1xuICAgIGZuKCk7XG4gIH1cbn1cbmZ1bmN0aW9uIGxpc3RuZXIoZXZlbnQpe1xuICBydW4uY2FsbChldmVudC5kYXRhKTtcbn1cbi8vIE5vZGUuanMgMC45KyAmIElFMTArIGhhcyBzZXRJbW1lZGlhdGUsIG90aGVyd2lzZTpcbmlmKCFpc0Z1bmN0aW9uKHNldFRhc2spIHx8ICFpc0Z1bmN0aW9uKGNsZWFyVGFzaykpe1xuICBzZXRUYXNrID0gZnVuY3Rpb24oZm4pe1xuICAgIHZhciBhcmdzID0gW10sIGkgPSAxO1xuICAgIHdoaWxlKGFyZ3VtZW50cy5sZW5ndGggPiBpKWFyZ3MucHVzaChhcmd1bWVudHNbaSsrXSk7XG4gICAgcXVldWVbKytjb3VudGVyXSA9IGZ1bmN0aW9uKCl7XG4gICAgICBpbnZva2UoaXNGdW5jdGlvbihmbikgPyBmbiA6IEZ1bmN0aW9uKGZuKSwgYXJncyk7XG4gICAgfTtcbiAgICBkZWZlcihjb3VudGVyKTtcbiAgICByZXR1cm4gY291bnRlcjtcbiAgfTtcbiAgY2xlYXJUYXNrID0gZnVuY3Rpb24oaWQpe1xuICAgIGRlbGV0ZSBxdWV1ZVtpZF07XG4gIH07XG4gIC8vIE5vZGUuanMgMC44LVxuICBpZihjb2YocHJvY2VzcykgPT0gJ3Byb2Nlc3MnKXtcbiAgICBkZWZlciA9IGZ1bmN0aW9uKGlkKXtcbiAgICAgIHByb2Nlc3MubmV4dFRpY2soY3R4KHJ1biwgaWQsIDEpKTtcbiAgICB9O1xuICAvLyBNb2Rlcm4gYnJvd3NlcnMsIHNraXAgaW1wbGVtZW50YXRpb24gZm9yIFdlYldvcmtlcnNcbiAgLy8gSUU4IGhhcyBwb3N0TWVzc2FnZSwgYnV0IGl0J3Mgc3luYyAmIHR5cGVvZiBpdHMgcG9zdE1lc3NhZ2UgaXMgb2JqZWN0XG4gIH0gZWxzZSBpZihhZGRFdmVudExpc3RlbmVyICYmIGlzRnVuY3Rpb24ocG9zdE1lc3NhZ2UpICYmICFnbG9iYWwuaW1wb3J0U2NyaXB0cyl7XG4gICAgZGVmZXIgPSBmdW5jdGlvbihpZCl7XG4gICAgICBwb3N0TWVzc2FnZShpZCwgJyonKTtcbiAgICB9O1xuICAgIGFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBsaXN0bmVyLCBmYWxzZSk7XG4gIC8vIFdlYldvcmtlcnNcbiAgfSBlbHNlIGlmKGlzRnVuY3Rpb24oTWVzc2FnZUNoYW5uZWwpKXtcbiAgICBjaGFubmVsID0gbmV3IE1lc3NhZ2VDaGFubmVsO1xuICAgIHBvcnQgICAgPSBjaGFubmVsLnBvcnQyO1xuICAgIGNoYW5uZWwucG9ydDEub25tZXNzYWdlID0gbGlzdG5lcjtcbiAgICBkZWZlciA9IGN0eChwb3J0LnBvc3RNZXNzYWdlLCBwb3J0LCAxKTtcbiAgLy8gSUU4LVxuICB9IGVsc2UgaWYoT05SRUFEWVNUQVRFQ0hBTkdFIGluIGNlbCgnc2NyaXB0Jykpe1xuICAgIGRlZmVyID0gZnVuY3Rpb24oaWQpe1xuICAgICAgaHRtbC5hcHBlbmRDaGlsZChjZWwoJ3NjcmlwdCcpKVtPTlJFQURZU1RBVEVDSEFOR0VdID0gZnVuY3Rpb24oKXtcbiAgICAgICAgaHRtbC5yZW1vdmVDaGlsZCh0aGlzKTtcbiAgICAgICAgcnVuLmNhbGwoaWQpO1xuICAgICAgfTtcbiAgICB9O1xuICAvLyBSZXN0IG9sZCBicm93c2Vyc1xuICB9IGVsc2Uge1xuICAgIGRlZmVyID0gZnVuY3Rpb24oaWQpe1xuICAgICAgc2V0VGltZW91dChjdHgocnVuLCBpZCwgMSksIDApO1xuICAgIH07XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0ge1xuICBzZXQ6ICAgc2V0VGFzayxcbiAgY2xlYXI6IGNsZWFyVGFza1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGV4ZWMpe1xuICB0cnkge1xuICAgIGV4ZWMoKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH0gY2F0Y2goZSl7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn07IiwidmFyIHNpZCA9IDA7XG5mdW5jdGlvbiB1aWQoa2V5KXtcbiAgcmV0dXJuICdTeW1ib2woJy5jb25jYXQoa2V5ID09PSB1bmRlZmluZWQgPyAnJyA6IGtleSwgJylfJywgKCsrc2lkICsgTWF0aC5yYW5kb20oKSkudG9TdHJpbmcoMzYpKTtcbn1cbnVpZC5zYWZlID0gcmVxdWlyZSgnLi8kJykuZy5TeW1ib2wgfHwgdWlkO1xubW9kdWxlLmV4cG9ydHMgPSB1aWQ7IiwiLy8gMjIuMS4zLjMxIEFycmF5LnByb3RvdHlwZVtAQHVuc2NvcGFibGVzXVxudmFyICQgICAgICAgICAgID0gcmVxdWlyZSgnLi8kJylcbiAgLCBVTlNDT1BBQkxFUyA9IHJlcXVpcmUoJy4vJC53a3MnKSgndW5zY29wYWJsZXMnKTtcbmlmKCQuRlcgJiYgIShVTlNDT1BBQkxFUyBpbiBbXSkpJC5oaWRlKEFycmF5LnByb3RvdHlwZSwgVU5TQ09QQUJMRVMsIHt9KTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oa2V5KXtcbiAgaWYoJC5GVylbXVtVTlNDT1BBQkxFU11ba2V5XSA9IHRydWU7XG59OyIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLyQnKS5nXG4gICwgc3RvcmUgID0gcmVxdWlyZSgnLi8kLnNoYXJlZCcpKCd3a3MnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obmFtZSl7XG4gIHJldHVybiBzdG9yZVtuYW1lXSB8fCAoc3RvcmVbbmFtZV0gPVxuICAgIGdsb2JhbC5TeW1ib2wgJiYgZ2xvYmFsLlN5bWJvbFtuYW1lXSB8fCByZXF1aXJlKCcuLyQudWlkJykuc2FmZSgnU3ltYm9sLicgKyBuYW1lKSk7XG59OyIsInZhciAkICAgICAgICAgICAgICAgID0gcmVxdWlyZSgnLi8kJylcbiAgLCBjZWwgICAgICAgICAgICAgID0gcmVxdWlyZSgnLi8kLmRvbS1jcmVhdGUnKVxuICAsIGNvZiAgICAgICAgICAgICAgPSByZXF1aXJlKCcuLyQuY29mJylcbiAgLCAkZGVmICAgICAgICAgICAgID0gcmVxdWlyZSgnLi8kLmRlZicpXG4gICwgaW52b2tlICAgICAgICAgICA9IHJlcXVpcmUoJy4vJC5pbnZva2UnKVxuICAsIGFycmF5TWV0aG9kICAgICAgPSByZXF1aXJlKCcuLyQuYXJyYXktbWV0aG9kcycpXG4gICwgSUVfUFJPVE8gICAgICAgICA9IHJlcXVpcmUoJy4vJC51aWQnKS5zYWZlKCdfX3Byb3RvX18nKVxuICAsIGFzc2VydCAgICAgICAgICAgPSByZXF1aXJlKCcuLyQuYXNzZXJ0JylcbiAgLCBhc3NlcnRPYmplY3QgICAgID0gYXNzZXJ0Lm9ialxuICAsIE9iamVjdFByb3RvICAgICAgPSBPYmplY3QucHJvdG90eXBlXG4gICwgaHRtbCAgICAgICAgICAgICA9ICQuaHRtbFxuICAsIEEgICAgICAgICAgICAgICAgPSBbXVxuICAsIF9zbGljZSAgICAgICAgICAgPSBBLnNsaWNlXG4gICwgX2pvaW4gICAgICAgICAgICA9IEEuam9pblxuICAsIGNsYXNzb2YgICAgICAgICAgPSBjb2YuY2xhc3NvZlxuICAsIGhhcyAgICAgICAgICAgICAgPSAkLmhhc1xuICAsIGRlZmluZVByb3BlcnR5ICAgPSAkLnNldERlc2NcbiAgLCBnZXRPd25EZXNjcmlwdG9yID0gJC5nZXREZXNjXG4gICwgZGVmaW5lUHJvcGVydGllcyA9ICQuc2V0RGVzY3NcbiAgLCBpc0Z1bmN0aW9uICAgICAgID0gJC5pc0Z1bmN0aW9uXG4gICwgaXNPYmplY3QgICAgICAgICA9ICQuaXNPYmplY3RcbiAgLCB0b09iamVjdCAgICAgICAgID0gJC50b09iamVjdFxuICAsIHRvTGVuZ3RoICAgICAgICAgPSAkLnRvTGVuZ3RoXG4gICwgdG9JbmRleCAgICAgICAgICA9ICQudG9JbmRleFxuICAsIElFOF9ET01fREVGSU5FICAgPSBmYWxzZVxuICAsICRpbmRleE9mICAgICAgICAgPSByZXF1aXJlKCcuLyQuYXJyYXktaW5jbHVkZXMnKShmYWxzZSlcbiAgLCAkZm9yRWFjaCAgICAgICAgID0gYXJyYXlNZXRob2QoMClcbiAgLCAkbWFwICAgICAgICAgICAgID0gYXJyYXlNZXRob2QoMSlcbiAgLCAkZmlsdGVyICAgICAgICAgID0gYXJyYXlNZXRob2QoMilcbiAgLCAkc29tZSAgICAgICAgICAgID0gYXJyYXlNZXRob2QoMylcbiAgLCAkZXZlcnkgICAgICAgICAgID0gYXJyYXlNZXRob2QoNCk7XG5cbmlmKCEkLkRFU0Mpe1xuICB0cnkge1xuICAgIElFOF9ET01fREVGSU5FID0gZGVmaW5lUHJvcGVydHkoY2VsKCdkaXYnKSwgJ3gnLFxuICAgICAge2dldDogZnVuY3Rpb24oKXsgcmV0dXJuIDg7IH19XG4gICAgKS54ID09IDg7XG4gIH0gY2F0Y2goZSl7IC8qIGVtcHR5ICovIH1cbiAgJC5zZXREZXNjID0gZnVuY3Rpb24oTywgUCwgQXR0cmlidXRlcyl7XG4gICAgaWYoSUU4X0RPTV9ERUZJTkUpdHJ5IHtcbiAgICAgIHJldHVybiBkZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKTtcbiAgICB9IGNhdGNoKGUpeyAvKiBlbXB0eSAqLyB9XG4gICAgaWYoJ2dldCcgaW4gQXR0cmlidXRlcyB8fCAnc2V0JyBpbiBBdHRyaWJ1dGVzKXRocm93IFR5cGVFcnJvcignQWNjZXNzb3JzIG5vdCBzdXBwb3J0ZWQhJyk7XG4gICAgaWYoJ3ZhbHVlJyBpbiBBdHRyaWJ1dGVzKWFzc2VydE9iamVjdChPKVtQXSA9IEF0dHJpYnV0ZXMudmFsdWU7XG4gICAgcmV0dXJuIE87XG4gIH07XG4gICQuZ2V0RGVzYyA9IGZ1bmN0aW9uKE8sIFApe1xuICAgIGlmKElFOF9ET01fREVGSU5FKXRyeSB7XG4gICAgICByZXR1cm4gZ2V0T3duRGVzY3JpcHRvcihPLCBQKTtcbiAgICB9IGNhdGNoKGUpeyAvKiBlbXB0eSAqLyB9XG4gICAgaWYoaGFzKE8sIFApKXJldHVybiAkLmRlc2MoIU9iamVjdFByb3RvLnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwoTywgUCksIE9bUF0pO1xuICB9O1xuICAkLnNldERlc2NzID0gZGVmaW5lUHJvcGVydGllcyA9IGZ1bmN0aW9uKE8sIFByb3BlcnRpZXMpe1xuICAgIGFzc2VydE9iamVjdChPKTtcbiAgICB2YXIga2V5cyAgID0gJC5nZXRLZXlzKFByb3BlcnRpZXMpXG4gICAgICAsIGxlbmd0aCA9IGtleXMubGVuZ3RoXG4gICAgICAsIGkgPSAwXG4gICAgICAsIFA7XG4gICAgd2hpbGUobGVuZ3RoID4gaSkkLnNldERlc2MoTywgUCA9IGtleXNbaSsrXSwgUHJvcGVydGllc1tQXSk7XG4gICAgcmV0dXJuIE87XG4gIH07XG59XG4kZGVmKCRkZWYuUyArICRkZWYuRiAqICEkLkRFU0MsICdPYmplY3QnLCB7XG4gIC8vIDE5LjEuMi42IC8gMTUuMi4zLjMgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihPLCBQKVxuICBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I6ICQuZ2V0RGVzYyxcbiAgLy8gMTkuMS4yLjQgLyAxNS4yLjMuNiBPYmplY3QuZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcylcbiAgZGVmaW5lUHJvcGVydHk6ICQuc2V0RGVzYyxcbiAgLy8gMTkuMS4yLjMgLyAxNS4yLjMuNyBPYmplY3QuZGVmaW5lUHJvcGVydGllcyhPLCBQcm9wZXJ0aWVzKVxuICBkZWZpbmVQcm9wZXJ0aWVzOiBkZWZpbmVQcm9wZXJ0aWVzXG59KTtcblxuICAvLyBJRSA4LSBkb24ndCBlbnVtIGJ1ZyBrZXlzXG52YXIga2V5czEgPSAoJ2NvbnN0cnVjdG9yLGhhc093blByb3BlcnR5LGlzUHJvdG90eXBlT2YscHJvcGVydHlJc0VudW1lcmFibGUsJyArXG4gICAgICAgICAgICAndG9Mb2NhbGVTdHJpbmcsdG9TdHJpbmcsdmFsdWVPZicpLnNwbGl0KCcsJylcbiAgLy8gQWRkaXRpb25hbCBrZXlzIGZvciBnZXRPd25Qcm9wZXJ0eU5hbWVzXG4gICwga2V5czIgPSBrZXlzMS5jb25jYXQoJ2xlbmd0aCcsICdwcm90b3R5cGUnKVxuICAsIGtleXNMZW4xID0ga2V5czEubGVuZ3RoO1xuXG4vLyBDcmVhdGUgb2JqZWN0IHdpdGggYG51bGxgIHByb3RvdHlwZTogdXNlIGlmcmFtZSBPYmplY3Qgd2l0aCBjbGVhcmVkIHByb3RvdHlwZVxudmFyIGNyZWF0ZURpY3QgPSBmdW5jdGlvbigpe1xuICAvLyBUaHJhc2gsIHdhc3RlIGFuZCBzb2RvbXk6IElFIEdDIGJ1Z1xuICB2YXIgaWZyYW1lID0gY2VsKCdpZnJhbWUnKVxuICAgICwgaSAgICAgID0ga2V5c0xlbjFcbiAgICAsIGd0ICAgICA9ICc+J1xuICAgICwgaWZyYW1lRG9jdW1lbnQ7XG4gIGlmcmFtZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICBodG1sLmFwcGVuZENoaWxkKGlmcmFtZSk7XG4gIGlmcmFtZS5zcmMgPSAnamF2YXNjcmlwdDonOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXNjcmlwdC11cmxcbiAgLy8gY3JlYXRlRGljdCA9IGlmcmFtZS5jb250ZW50V2luZG93Lk9iamVjdDtcbiAgLy8gaHRtbC5yZW1vdmVDaGlsZChpZnJhbWUpO1xuICBpZnJhbWVEb2N1bWVudCA9IGlmcmFtZS5jb250ZW50V2luZG93LmRvY3VtZW50O1xuICBpZnJhbWVEb2N1bWVudC5vcGVuKCk7XG4gIGlmcmFtZURvY3VtZW50LndyaXRlKCc8c2NyaXB0PmRvY3VtZW50LkY9T2JqZWN0PC9zY3JpcHQnICsgZ3QpO1xuICBpZnJhbWVEb2N1bWVudC5jbG9zZSgpO1xuICBjcmVhdGVEaWN0ID0gaWZyYW1lRG9jdW1lbnQuRjtcbiAgd2hpbGUoaS0tKWRlbGV0ZSBjcmVhdGVEaWN0LnByb3RvdHlwZVtrZXlzMVtpXV07XG4gIHJldHVybiBjcmVhdGVEaWN0KCk7XG59O1xuZnVuY3Rpb24gY3JlYXRlR2V0S2V5cyhuYW1lcywgbGVuZ3RoKXtcbiAgcmV0dXJuIGZ1bmN0aW9uKG9iamVjdCl7XG4gICAgdmFyIE8gICAgICA9IHRvT2JqZWN0KG9iamVjdClcbiAgICAgICwgaSAgICAgID0gMFxuICAgICAgLCByZXN1bHQgPSBbXVxuICAgICAgLCBrZXk7XG4gICAgZm9yKGtleSBpbiBPKWlmKGtleSAhPSBJRV9QUk9UTyloYXMoTywga2V5KSAmJiByZXN1bHQucHVzaChrZXkpO1xuICAgIC8vIERvbid0IGVudW0gYnVnICYgaGlkZGVuIGtleXNcbiAgICB3aGlsZShsZW5ndGggPiBpKWlmKGhhcyhPLCBrZXkgPSBuYW1lc1tpKytdKSl7XG4gICAgICB+JGluZGV4T2YocmVzdWx0LCBrZXkpIHx8IHJlc3VsdC5wdXNoKGtleSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG59XG5mdW5jdGlvbiBFbXB0eSgpe31cbiRkZWYoJGRlZi5TLCAnT2JqZWN0Jywge1xuICAvLyAxOS4xLjIuOSAvIDE1LjIuMy4yIE9iamVjdC5nZXRQcm90b3R5cGVPZihPKVxuICBnZXRQcm90b3R5cGVPZjogJC5nZXRQcm90byA9ICQuZ2V0UHJvdG8gfHwgZnVuY3Rpb24oTyl7XG4gICAgTyA9IE9iamVjdChhc3NlcnQuZGVmKE8pKTtcbiAgICBpZihoYXMoTywgSUVfUFJPVE8pKXJldHVybiBPW0lFX1BST1RPXTtcbiAgICBpZihpc0Z1bmN0aW9uKE8uY29uc3RydWN0b3IpICYmIE8gaW5zdGFuY2VvZiBPLmNvbnN0cnVjdG9yKXtcbiAgICAgIHJldHVybiBPLmNvbnN0cnVjdG9yLnByb3RvdHlwZTtcbiAgICB9IHJldHVybiBPIGluc3RhbmNlb2YgT2JqZWN0ID8gT2JqZWN0UHJvdG8gOiBudWxsO1xuICB9LFxuICAvLyAxOS4xLjIuNyAvIDE1LjIuMy40IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKE8pXG4gIGdldE93blByb3BlcnR5TmFtZXM6ICQuZ2V0TmFtZXMgPSAkLmdldE5hbWVzIHx8IGNyZWF0ZUdldEtleXMoa2V5czIsIGtleXMyLmxlbmd0aCwgdHJ1ZSksXG4gIC8vIDE5LjEuMi4yIC8gMTUuMi4zLjUgT2JqZWN0LmNyZWF0ZShPIFssIFByb3BlcnRpZXNdKVxuICBjcmVhdGU6ICQuY3JlYXRlID0gJC5jcmVhdGUgfHwgZnVuY3Rpb24oTywgLyo/Ki9Qcm9wZXJ0aWVzKXtcbiAgICB2YXIgcmVzdWx0O1xuICAgIGlmKE8gIT09IG51bGwpe1xuICAgICAgRW1wdHkucHJvdG90eXBlID0gYXNzZXJ0T2JqZWN0KE8pO1xuICAgICAgcmVzdWx0ID0gbmV3IEVtcHR5KCk7XG4gICAgICBFbXB0eS5wcm90b3R5cGUgPSBudWxsO1xuICAgICAgLy8gYWRkIFwiX19wcm90b19fXCIgZm9yIE9iamVjdC5nZXRQcm90b3R5cGVPZiBzaGltXG4gICAgICByZXN1bHRbSUVfUFJPVE9dID0gTztcbiAgICB9IGVsc2UgcmVzdWx0ID0gY3JlYXRlRGljdCgpO1xuICAgIHJldHVybiBQcm9wZXJ0aWVzID09PSB1bmRlZmluZWQgPyByZXN1bHQgOiBkZWZpbmVQcm9wZXJ0aWVzKHJlc3VsdCwgUHJvcGVydGllcyk7XG4gIH0sXG4gIC8vIDE5LjEuMi4xNCAvIDE1LjIuMy4xNCBPYmplY3Qua2V5cyhPKVxuICBrZXlzOiAkLmdldEtleXMgPSAkLmdldEtleXMgfHwgY3JlYXRlR2V0S2V5cyhrZXlzMSwga2V5c0xlbjEsIGZhbHNlKSxcbiAgLy8gMTkuMS4yLjE3IC8gMTUuMi4zLjggT2JqZWN0LnNlYWwoTylcbiAgc2VhbDogZnVuY3Rpb24gc2VhbChpdCl7XG4gICAgcmV0dXJuIGl0OyAvLyA8LSBjYXBcbiAgfSxcbiAgLy8gMTkuMS4yLjUgLyAxNS4yLjMuOSBPYmplY3QuZnJlZXplKE8pXG4gIGZyZWV6ZTogZnVuY3Rpb24gZnJlZXplKGl0KXtcbiAgICByZXR1cm4gaXQ7IC8vIDwtIGNhcFxuICB9LFxuICAvLyAxOS4xLjIuMTUgLyAxNS4yLjMuMTAgT2JqZWN0LnByZXZlbnRFeHRlbnNpb25zKE8pXG4gIHByZXZlbnRFeHRlbnNpb25zOiBmdW5jdGlvbiBwcmV2ZW50RXh0ZW5zaW9ucyhpdCl7XG4gICAgcmV0dXJuIGl0OyAvLyA8LSBjYXBcbiAgfSxcbiAgLy8gMTkuMS4yLjEzIC8gMTUuMi4zLjExIE9iamVjdC5pc1NlYWxlZChPKVxuICBpc1NlYWxlZDogZnVuY3Rpb24gaXNTZWFsZWQoaXQpe1xuICAgIHJldHVybiAhaXNPYmplY3QoaXQpOyAvLyA8LSBjYXBcbiAgfSxcbiAgLy8gMTkuMS4yLjEyIC8gMTUuMi4zLjEyIE9iamVjdC5pc0Zyb3plbihPKVxuICBpc0Zyb3plbjogZnVuY3Rpb24gaXNGcm96ZW4oaXQpe1xuICAgIHJldHVybiAhaXNPYmplY3QoaXQpOyAvLyA8LSBjYXBcbiAgfSxcbiAgLy8gMTkuMS4yLjExIC8gMTUuMi4zLjEzIE9iamVjdC5pc0V4dGVuc2libGUoTylcbiAgaXNFeHRlbnNpYmxlOiBmdW5jdGlvbiBpc0V4dGVuc2libGUoaXQpe1xuICAgIHJldHVybiBpc09iamVjdChpdCk7IC8vIDwtIGNhcFxuICB9XG59KTtcblxuLy8gMTkuMi4zLjIgLyAxNS4zLjQuNSBGdW5jdGlvbi5wcm90b3R5cGUuYmluZCh0aGlzQXJnLCBhcmdzLi4uKVxuJGRlZigkZGVmLlAsICdGdW5jdGlvbicsIHtcbiAgYmluZDogZnVuY3Rpb24odGhhdCAvKiwgYXJncy4uLiAqLyl7XG4gICAgdmFyIGZuICAgICAgID0gYXNzZXJ0LmZuKHRoaXMpXG4gICAgICAsIHBhcnRBcmdzID0gX3NsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcbiAgICBmdW5jdGlvbiBib3VuZCgvKiBhcmdzLi4uICovKXtcbiAgICAgIHZhciBhcmdzICAgPSBwYXJ0QXJncy5jb25jYXQoX3NsaWNlLmNhbGwoYXJndW1lbnRzKSlcbiAgICAgICAgLCBjb25zdHIgPSB0aGlzIGluc3RhbmNlb2YgYm91bmRcbiAgICAgICAgLCBjdHggICAgPSBjb25zdHIgPyAkLmNyZWF0ZShmbi5wcm90b3R5cGUpIDogdGhhdFxuICAgICAgICAsIHJlc3VsdCA9IGludm9rZShmbiwgYXJncywgY3R4KTtcbiAgICAgIHJldHVybiBjb25zdHIgPyBjdHggOiByZXN1bHQ7XG4gICAgfVxuICAgIGlmKGZuLnByb3RvdHlwZSlib3VuZC5wcm90b3R5cGUgPSBmbi5wcm90b3R5cGU7XG4gICAgcmV0dXJuIGJvdW5kO1xuICB9XG59KTtcblxuLy8gRml4IGZvciBub3QgYXJyYXktbGlrZSBFUzMgc3RyaW5nIGFuZCBET00gb2JqZWN0c1xuaWYoISgwIGluIE9iamVjdCgneicpICYmICd6J1swXSA9PSAneicpKXtcbiAgJC5FUzVPYmplY3QgPSBmdW5jdGlvbihpdCl7XG4gICAgcmV0dXJuIGNvZihpdCkgPT0gJ1N0cmluZycgPyBpdC5zcGxpdCgnJykgOiBPYmplY3QoaXQpO1xuICB9O1xufVxuXG52YXIgYnVnZ3lTbGljZSA9IHRydWU7XG50cnkge1xuICBpZihodG1sKV9zbGljZS5jYWxsKGh0bWwpO1xuICBidWdneVNsaWNlID0gZmFsc2U7XG59IGNhdGNoKGUpeyAvKiBlbXB0eSAqLyB9XG5cbiRkZWYoJGRlZi5QICsgJGRlZi5GICogYnVnZ3lTbGljZSwgJ0FycmF5Jywge1xuICBzbGljZTogZnVuY3Rpb24gc2xpY2UoYmVnaW4sIGVuZCl7XG4gICAgdmFyIGxlbiAgID0gdG9MZW5ndGgodGhpcy5sZW5ndGgpXG4gICAgICAsIGtsYXNzID0gY29mKHRoaXMpO1xuICAgIGVuZCA9IGVuZCA9PT0gdW5kZWZpbmVkID8gbGVuIDogZW5kO1xuICAgIGlmKGtsYXNzID09ICdBcnJheScpcmV0dXJuIF9zbGljZS5jYWxsKHRoaXMsIGJlZ2luLCBlbmQpO1xuICAgIHZhciBzdGFydCAgPSB0b0luZGV4KGJlZ2luLCBsZW4pXG4gICAgICAsIHVwVG8gICA9IHRvSW5kZXgoZW5kLCBsZW4pXG4gICAgICAsIHNpemUgICA9IHRvTGVuZ3RoKHVwVG8gLSBzdGFydClcbiAgICAgICwgY2xvbmVkID0gQXJyYXkoc2l6ZSlcbiAgICAgICwgaSAgICAgID0gMDtcbiAgICBmb3IoOyBpIDwgc2l6ZTsgaSsrKWNsb25lZFtpXSA9IGtsYXNzID09ICdTdHJpbmcnXG4gICAgICA/IHRoaXMuY2hhckF0KHN0YXJ0ICsgaSlcbiAgICAgIDogdGhpc1tzdGFydCArIGldO1xuICAgIHJldHVybiBjbG9uZWQ7XG4gIH1cbn0pO1xuXG4kZGVmKCRkZWYuUCArICRkZWYuRiAqICgkLkVTNU9iamVjdCAhPSBPYmplY3QpLCAnQXJyYXknLCB7XG4gIGpvaW46IGZ1bmN0aW9uIGpvaW4oKXtcbiAgICByZXR1cm4gX2pvaW4uYXBwbHkoJC5FUzVPYmplY3QodGhpcyksIGFyZ3VtZW50cyk7XG4gIH1cbn0pO1xuXG4vLyAyMi4xLjIuMiAvIDE1LjQuMy4yIEFycmF5LmlzQXJyYXkoYXJnKVxuJGRlZigkZGVmLlMsICdBcnJheScsIHtcbiAgaXNBcnJheTogZnVuY3Rpb24oYXJnKXtcbiAgICByZXR1cm4gY29mKGFyZykgPT0gJ0FycmF5JztcbiAgfVxufSk7XG5mdW5jdGlvbiBjcmVhdGVBcnJheVJlZHVjZShpc1JpZ2h0KXtcbiAgcmV0dXJuIGZ1bmN0aW9uKGNhbGxiYWNrZm4sIG1lbW8pe1xuICAgIGFzc2VydC5mbihjYWxsYmFja2ZuKTtcbiAgICB2YXIgTyAgICAgID0gdG9PYmplY3QodGhpcylcbiAgICAgICwgbGVuZ3RoID0gdG9MZW5ndGgoTy5sZW5ndGgpXG4gICAgICAsIGluZGV4ICA9IGlzUmlnaHQgPyBsZW5ndGggLSAxIDogMFxuICAgICAgLCBpICAgICAgPSBpc1JpZ2h0ID8gLTEgOiAxO1xuICAgIGlmKGFyZ3VtZW50cy5sZW5ndGggPCAyKWZvcig7Oyl7XG4gICAgICBpZihpbmRleCBpbiBPKXtcbiAgICAgICAgbWVtbyA9IE9baW5kZXhdO1xuICAgICAgICBpbmRleCArPSBpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGluZGV4ICs9IGk7XG4gICAgICBhc3NlcnQoaXNSaWdodCA/IGluZGV4ID49IDAgOiBsZW5ndGggPiBpbmRleCwgJ1JlZHVjZSBvZiBlbXB0eSBhcnJheSB3aXRoIG5vIGluaXRpYWwgdmFsdWUnKTtcbiAgICB9XG4gICAgZm9yKDtpc1JpZ2h0ID8gaW5kZXggPj0gMCA6IGxlbmd0aCA+IGluZGV4OyBpbmRleCArPSBpKWlmKGluZGV4IGluIE8pe1xuICAgICAgbWVtbyA9IGNhbGxiYWNrZm4obWVtbywgT1tpbmRleF0sIGluZGV4LCB0aGlzKTtcbiAgICB9XG4gICAgcmV0dXJuIG1lbW87XG4gIH07XG59XG4kZGVmKCRkZWYuUCwgJ0FycmF5Jywge1xuICAvLyAyMi4xLjMuMTAgLyAxNS40LjQuMTggQXJyYXkucHJvdG90eXBlLmZvckVhY2goY2FsbGJhY2tmbiBbLCB0aGlzQXJnXSlcbiAgZm9yRWFjaDogJC5lYWNoID0gJC5lYWNoIHx8IGZ1bmN0aW9uIGZvckVhY2goY2FsbGJhY2tmbi8qLCB0aGF0ID0gdW5kZWZpbmVkICovKXtcbiAgICByZXR1cm4gJGZvckVhY2godGhpcywgY2FsbGJhY2tmbiwgYXJndW1lbnRzWzFdKTtcbiAgfSxcbiAgLy8gMjIuMS4zLjE1IC8gMTUuNC40LjE5IEFycmF5LnByb3RvdHlwZS5tYXAoY2FsbGJhY2tmbiBbLCB0aGlzQXJnXSlcbiAgbWFwOiBmdW5jdGlvbiBtYXAoY2FsbGJhY2tmbi8qLCB0aGF0ID0gdW5kZWZpbmVkICovKXtcbiAgICByZXR1cm4gJG1hcCh0aGlzLCBjYWxsYmFja2ZuLCBhcmd1bWVudHNbMV0pO1xuICB9LFxuICAvLyAyMi4xLjMuNyAvIDE1LjQuNC4yMCBBcnJheS5wcm90b3R5cGUuZmlsdGVyKGNhbGxiYWNrZm4gWywgdGhpc0FyZ10pXG4gIGZpbHRlcjogZnVuY3Rpb24gZmlsdGVyKGNhbGxiYWNrZm4vKiwgdGhhdCA9IHVuZGVmaW5lZCAqLyl7XG4gICAgcmV0dXJuICRmaWx0ZXIodGhpcywgY2FsbGJhY2tmbiwgYXJndW1lbnRzWzFdKTtcbiAgfSxcbiAgLy8gMjIuMS4zLjIzIC8gMTUuNC40LjE3IEFycmF5LnByb3RvdHlwZS5zb21lKGNhbGxiYWNrZm4gWywgdGhpc0FyZ10pXG4gIHNvbWU6IGZ1bmN0aW9uIHNvbWUoY2FsbGJhY2tmbi8qLCB0aGF0ID0gdW5kZWZpbmVkICovKXtcbiAgICByZXR1cm4gJHNvbWUodGhpcywgY2FsbGJhY2tmbiwgYXJndW1lbnRzWzFdKTtcbiAgfSxcbiAgLy8gMjIuMS4zLjUgLyAxNS40LjQuMTYgQXJyYXkucHJvdG90eXBlLmV2ZXJ5KGNhbGxiYWNrZm4gWywgdGhpc0FyZ10pXG4gIGV2ZXJ5OiBmdW5jdGlvbiBldmVyeShjYWxsYmFja2ZuLyosIHRoYXQgPSB1bmRlZmluZWQgKi8pe1xuICAgIHJldHVybiAkZXZlcnkodGhpcywgY2FsbGJhY2tmbiwgYXJndW1lbnRzWzFdKTtcbiAgfSxcbiAgLy8gMjIuMS4zLjE4IC8gMTUuNC40LjIxIEFycmF5LnByb3RvdHlwZS5yZWR1Y2UoY2FsbGJhY2tmbiBbLCBpbml0aWFsVmFsdWVdKVxuICByZWR1Y2U6IGNyZWF0ZUFycmF5UmVkdWNlKGZhbHNlKSxcbiAgLy8gMjIuMS4zLjE5IC8gMTUuNC40LjIyIEFycmF5LnByb3RvdHlwZS5yZWR1Y2VSaWdodChjYWxsYmFja2ZuIFssIGluaXRpYWxWYWx1ZV0pXG4gIHJlZHVjZVJpZ2h0OiBjcmVhdGVBcnJheVJlZHVjZSh0cnVlKSxcbiAgLy8gMjIuMS4zLjExIC8gMTUuNC40LjE0IEFycmF5LnByb3RvdHlwZS5pbmRleE9mKHNlYXJjaEVsZW1lbnQgWywgZnJvbUluZGV4XSlcbiAgaW5kZXhPZjogZnVuY3Rpb24gaW5kZXhPZihlbCAvKiwgZnJvbUluZGV4ID0gMCAqLyl7XG4gICAgcmV0dXJuICRpbmRleE9mKHRoaXMsIGVsLCBhcmd1bWVudHNbMV0pO1xuICB9LFxuICAvLyAyMi4xLjMuMTQgLyAxNS40LjQuMTUgQXJyYXkucHJvdG90eXBlLmxhc3RJbmRleE9mKHNlYXJjaEVsZW1lbnQgWywgZnJvbUluZGV4XSlcbiAgbGFzdEluZGV4T2Y6IGZ1bmN0aW9uKGVsLCBmcm9tSW5kZXggLyogPSBAWyotMV0gKi8pe1xuICAgIHZhciBPICAgICAgPSB0b09iamVjdCh0aGlzKVxuICAgICAgLCBsZW5ndGggPSB0b0xlbmd0aChPLmxlbmd0aClcbiAgICAgICwgaW5kZXggID0gbGVuZ3RoIC0gMTtcbiAgICBpZihhcmd1bWVudHMubGVuZ3RoID4gMSlpbmRleCA9IE1hdGgubWluKGluZGV4LCAkLnRvSW50ZWdlcihmcm9tSW5kZXgpKTtcbiAgICBpZihpbmRleCA8IDApaW5kZXggPSB0b0xlbmd0aChsZW5ndGggKyBpbmRleCk7XG4gICAgZm9yKDtpbmRleCA+PSAwOyBpbmRleC0tKWlmKGluZGV4IGluIE8paWYoT1tpbmRleF0gPT09IGVsKXJldHVybiBpbmRleDtcbiAgICByZXR1cm4gLTE7XG4gIH1cbn0pO1xuXG4vLyAyMS4xLjMuMjUgLyAxNS41LjQuMjAgU3RyaW5nLnByb3RvdHlwZS50cmltKClcbiRkZWYoJGRlZi5QLCAnU3RyaW5nJywge3RyaW06IHJlcXVpcmUoJy4vJC5yZXBsYWNlcicpKC9eXFxzKihbXFxzXFxTXSpcXFMpP1xccyokLywgJyQxJyl9KTtcblxuLy8gMjAuMy4zLjEgLyAxNS45LjQuNCBEYXRlLm5vdygpXG4kZGVmKCRkZWYuUywgJ0RhdGUnLCB7bm93OiBmdW5jdGlvbigpe1xuICByZXR1cm4gK25ldyBEYXRlO1xufX0pO1xuXG5mdW5jdGlvbiBseihudW0pe1xuICByZXR1cm4gbnVtID4gOSA/IG51bSA6ICcwJyArIG51bTtcbn1cblxuLy8gMjAuMy40LjM2IC8gMTUuOS41LjQzIERhdGUucHJvdG90eXBlLnRvSVNPU3RyaW5nKClcbi8vIFBoYW50b21KUyBhbmQgb2xkIHdlYmtpdCBoYWQgYSBicm9rZW4gRGF0ZSBpbXBsZW1lbnRhdGlvbi5cbnZhciBkYXRlICAgICAgID0gbmV3IERhdGUoLTVlMTMgLSAxKVxuICAsIGJyb2tlbkRhdGUgPSAhKGRhdGUudG9JU09TdHJpbmcgJiYgZGF0ZS50b0lTT1N0cmluZygpID09ICcwMzg1LTA3LTI1VDA3OjA2OjM5Ljk5OVonXG4gICAgICAmJiByZXF1aXJlKCcuLyQudGhyb3dzJykoZnVuY3Rpb24oKXsgbmV3IERhdGUoTmFOKS50b0lTT1N0cmluZygpOyB9KSk7XG4kZGVmKCRkZWYuUCArICRkZWYuRiAqIGJyb2tlbkRhdGUsICdEYXRlJywge3RvSVNPU3RyaW5nOiBmdW5jdGlvbigpe1xuICBpZighaXNGaW5pdGUodGhpcykpdGhyb3cgUmFuZ2VFcnJvcignSW52YWxpZCB0aW1lIHZhbHVlJyk7XG4gIHZhciBkID0gdGhpc1xuICAgICwgeSA9IGQuZ2V0VVRDRnVsbFllYXIoKVxuICAgICwgbSA9IGQuZ2V0VVRDTWlsbGlzZWNvbmRzKClcbiAgICAsIHMgPSB5IDwgMCA/ICctJyA6IHkgPiA5OTk5ID8gJysnIDogJyc7XG4gIHJldHVybiBzICsgKCcwMDAwMCcgKyBNYXRoLmFicyh5KSkuc2xpY2UocyA/IC02IDogLTQpICtcbiAgICAnLScgKyBseihkLmdldFVUQ01vbnRoKCkgKyAxKSArICctJyArIGx6KGQuZ2V0VVRDRGF0ZSgpKSArXG4gICAgJ1QnICsgbHooZC5nZXRVVENIb3VycygpKSArICc6JyArIGx6KGQuZ2V0VVRDTWludXRlcygpKSArXG4gICAgJzonICsgbHooZC5nZXRVVENTZWNvbmRzKCkpICsgJy4nICsgKG0gPiA5OSA/IG0gOiAnMCcgKyBseihtKSkgKyAnWic7XG59fSk7XG5cbmlmKGNsYXNzb2YoZnVuY3Rpb24oKXsgcmV0dXJuIGFyZ3VtZW50czsgfSgpKSA9PSAnT2JqZWN0Jyljb2YuY2xhc3NvZiA9IGZ1bmN0aW9uKGl0KXtcbiAgdmFyIHRhZyA9IGNsYXNzb2YoaXQpO1xuICByZXR1cm4gdGFnID09ICdPYmplY3QnICYmIGlzRnVuY3Rpb24oaXQuY2FsbGVlKSA/ICdBcmd1bWVudHMnIDogdGFnO1xufTsiLCIndXNlIHN0cmljdCc7XG52YXIgJCAgICAgICA9IHJlcXVpcmUoJy4vJCcpXG4gICwgJGRlZiAgICA9IHJlcXVpcmUoJy4vJC5kZWYnKVxuICAsIHRvSW5kZXggPSAkLnRvSW5kZXg7XG4kZGVmKCRkZWYuUCwgJ0FycmF5Jywge1xuICAvLyAyMi4xLjMuMyBBcnJheS5wcm90b3R5cGUuY29weVdpdGhpbih0YXJnZXQsIHN0YXJ0LCBlbmQgPSB0aGlzLmxlbmd0aClcbiAgY29weVdpdGhpbjogZnVuY3Rpb24gY29weVdpdGhpbih0YXJnZXQvKiA9IDAgKi8sIHN0YXJ0IC8qID0gMCwgZW5kID0gQGxlbmd0aCAqLyl7XG4gICAgdmFyIE8gICAgID0gT2JqZWN0KCQuYXNzZXJ0RGVmaW5lZCh0aGlzKSlcbiAgICAgICwgbGVuICAgPSAkLnRvTGVuZ3RoKE8ubGVuZ3RoKVxuICAgICAgLCB0byAgICA9IHRvSW5kZXgodGFyZ2V0LCBsZW4pXG4gICAgICAsIGZyb20gID0gdG9JbmRleChzdGFydCwgbGVuKVxuICAgICAgLCBlbmQgICA9IGFyZ3VtZW50c1syXVxuICAgICAgLCBmaW4gICA9IGVuZCA9PT0gdW5kZWZpbmVkID8gbGVuIDogdG9JbmRleChlbmQsIGxlbilcbiAgICAgICwgY291bnQgPSBNYXRoLm1pbihmaW4gLSBmcm9tLCBsZW4gLSB0bylcbiAgICAgICwgaW5jICAgPSAxO1xuICAgIGlmKGZyb20gPCB0byAmJiB0byA8IGZyb20gKyBjb3VudCl7XG4gICAgICBpbmMgID0gLTE7XG4gICAgICBmcm9tID0gZnJvbSArIGNvdW50IC0gMTtcbiAgICAgIHRvICAgPSB0byAgICsgY291bnQgLSAxO1xuICAgIH1cbiAgICB3aGlsZShjb3VudC0tID4gMCl7XG4gICAgICBpZihmcm9tIGluIE8pT1t0b10gPSBPW2Zyb21dO1xuICAgICAgZWxzZSBkZWxldGUgT1t0b107XG4gICAgICB0byAgICs9IGluYztcbiAgICAgIGZyb20gKz0gaW5jO1xuICAgIH0gcmV0dXJuIE87XG4gIH1cbn0pO1xucmVxdWlyZSgnLi8kLnVuc2NvcGUnKSgnY29weVdpdGhpbicpOyIsIid1c2Ugc3RyaWN0JztcbnZhciAkICAgICAgID0gcmVxdWlyZSgnLi8kJylcbiAgLCAkZGVmICAgID0gcmVxdWlyZSgnLi8kLmRlZicpXG4gICwgdG9JbmRleCA9ICQudG9JbmRleDtcbiRkZWYoJGRlZi5QLCAnQXJyYXknLCB7XG4gIC8vIDIyLjEuMy42IEFycmF5LnByb3RvdHlwZS5maWxsKHZhbHVlLCBzdGFydCA9IDAsIGVuZCA9IHRoaXMubGVuZ3RoKVxuICBmaWxsOiBmdW5jdGlvbiBmaWxsKHZhbHVlIC8qLCBzdGFydCA9IDAsIGVuZCA9IEBsZW5ndGggKi8pe1xuICAgIHZhciBPICAgICAgPSBPYmplY3QoJC5hc3NlcnREZWZpbmVkKHRoaXMpKVxuICAgICAgLCBsZW5ndGggPSAkLnRvTGVuZ3RoKE8ubGVuZ3RoKVxuICAgICAgLCBpbmRleCAgPSB0b0luZGV4KGFyZ3VtZW50c1sxXSwgbGVuZ3RoKVxuICAgICAgLCBlbmQgICAgPSBhcmd1bWVudHNbMl1cbiAgICAgICwgZW5kUG9zID0gZW5kID09PSB1bmRlZmluZWQgPyBsZW5ndGggOiB0b0luZGV4KGVuZCwgbGVuZ3RoKTtcbiAgICB3aGlsZShlbmRQb3MgPiBpbmRleClPW2luZGV4KytdID0gdmFsdWU7XG4gICAgcmV0dXJuIE87XG4gIH1cbn0pO1xucmVxdWlyZSgnLi8kLnVuc2NvcGUnKSgnZmlsbCcpOyIsIid1c2Ugc3RyaWN0Jztcbi8vIDIyLjEuMy45IEFycmF5LnByb3RvdHlwZS5maW5kSW5kZXgocHJlZGljYXRlLCB0aGlzQXJnID0gdW5kZWZpbmVkKVxudmFyIEtFWSAgICA9ICdmaW5kSW5kZXgnXG4gICwgJGRlZiAgID0gcmVxdWlyZSgnLi8kLmRlZicpXG4gICwgZm9yY2VkID0gdHJ1ZVxuICAsICRmaW5kICA9IHJlcXVpcmUoJy4vJC5hcnJheS1tZXRob2RzJykoNik7XG4vLyBTaG91bGRuJ3Qgc2tpcCBob2xlc1xuaWYoS0VZIGluIFtdKUFycmF5KDEpW0tFWV0oZnVuY3Rpb24oKXsgZm9yY2VkID0gZmFsc2U7IH0pO1xuJGRlZigkZGVmLlAgKyAkZGVmLkYgKiBmb3JjZWQsICdBcnJheScsIHtcbiAgZmluZEluZGV4OiBmdW5jdGlvbiBmaW5kSW5kZXgoY2FsbGJhY2tmbi8qLCB0aGF0ID0gdW5kZWZpbmVkICovKXtcbiAgICByZXR1cm4gJGZpbmQodGhpcywgY2FsbGJhY2tmbiwgYXJndW1lbnRzWzFdKTtcbiAgfVxufSk7XG5yZXF1aXJlKCcuLyQudW5zY29wZScpKEtFWSk7IiwiJ3VzZSBzdHJpY3QnO1xuLy8gMjIuMS4zLjggQXJyYXkucHJvdG90eXBlLmZpbmQocHJlZGljYXRlLCB0aGlzQXJnID0gdW5kZWZpbmVkKVxudmFyIEtFWSAgICA9ICdmaW5kJ1xuICAsICRkZWYgICA9IHJlcXVpcmUoJy4vJC5kZWYnKVxuICAsIGZvcmNlZCA9IHRydWVcbiAgLCAkZmluZCAgPSByZXF1aXJlKCcuLyQuYXJyYXktbWV0aG9kcycpKDUpO1xuLy8gU2hvdWxkbid0IHNraXAgaG9sZXNcbmlmKEtFWSBpbiBbXSlBcnJheSgxKVtLRVldKGZ1bmN0aW9uKCl7IGZvcmNlZCA9IGZhbHNlOyB9KTtcbiRkZWYoJGRlZi5QICsgJGRlZi5GICogZm9yY2VkLCAnQXJyYXknLCB7XG4gIGZpbmQ6IGZ1bmN0aW9uIGZpbmQoY2FsbGJhY2tmbi8qLCB0aGF0ID0gdW5kZWZpbmVkICovKXtcbiAgICByZXR1cm4gJGZpbmQodGhpcywgY2FsbGJhY2tmbiwgYXJndW1lbnRzWzFdKTtcbiAgfVxufSk7XG5yZXF1aXJlKCcuLyQudW5zY29wZScpKEtFWSk7IiwidmFyICQgICAgID0gcmVxdWlyZSgnLi8kJylcbiAgLCBjdHggICA9IHJlcXVpcmUoJy4vJC5jdHgnKVxuICAsICRkZWYgID0gcmVxdWlyZSgnLi8kLmRlZicpXG4gICwgJGl0ZXIgPSByZXF1aXJlKCcuLyQuaXRlcicpXG4gICwgY2FsbCAgPSByZXF1aXJlKCcuLyQuaXRlci1jYWxsJyk7XG4kZGVmKCRkZWYuUyArICRkZWYuRiAqICFyZXF1aXJlKCcuLyQuaXRlci1kZXRlY3QnKShmdW5jdGlvbihpdGVyKXsgQXJyYXkuZnJvbShpdGVyKTsgfSksICdBcnJheScsIHtcbiAgLy8gMjIuMS4yLjEgQXJyYXkuZnJvbShhcnJheUxpa2UsIG1hcGZuID0gdW5kZWZpbmVkLCB0aGlzQXJnID0gdW5kZWZpbmVkKVxuICBmcm9tOiBmdW5jdGlvbiBmcm9tKGFycmF5TGlrZS8qLCBtYXBmbiA9IHVuZGVmaW5lZCwgdGhpc0FyZyA9IHVuZGVmaW5lZCovKXtcbiAgICB2YXIgTyAgICAgICA9IE9iamVjdCgkLmFzc2VydERlZmluZWQoYXJyYXlMaWtlKSlcbiAgICAgICwgbWFwZm4gICA9IGFyZ3VtZW50c1sxXVxuICAgICAgLCBtYXBwaW5nID0gbWFwZm4gIT09IHVuZGVmaW5lZFxuICAgICAgLCBmICAgICAgID0gbWFwcGluZyA/IGN0eChtYXBmbiwgYXJndW1lbnRzWzJdLCAyKSA6IHVuZGVmaW5lZFxuICAgICAgLCBpbmRleCAgID0gMFxuICAgICAgLCBsZW5ndGgsIHJlc3VsdCwgc3RlcCwgaXRlcmF0b3I7XG4gICAgaWYoJGl0ZXIuaXMoTykpe1xuICAgICAgaXRlcmF0b3IgPSAkaXRlci5nZXQoTyk7XG4gICAgICAvLyBzdHJhbmdlIElFIHF1aXJrcyBtb2RlIGJ1ZyAtPiB1c2UgdHlwZW9mIGluc3RlYWQgb2YgaXNGdW5jdGlvblxuICAgICAgcmVzdWx0ICAgPSBuZXcgKHR5cGVvZiB0aGlzID09ICdmdW5jdGlvbicgPyB0aGlzIDogQXJyYXkpO1xuICAgICAgZm9yKDsgIShzdGVwID0gaXRlcmF0b3IubmV4dCgpKS5kb25lOyBpbmRleCsrKXtcbiAgICAgICAgcmVzdWx0W2luZGV4XSA9IG1hcHBpbmcgPyBjYWxsKGl0ZXJhdG9yLCBmLCBbc3RlcC52YWx1ZSwgaW5kZXhdLCB0cnVlKSA6IHN0ZXAudmFsdWU7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIHN0cmFuZ2UgSUUgcXVpcmtzIG1vZGUgYnVnIC0+IHVzZSB0eXBlb2YgaW5zdGVhZCBvZiBpc0Z1bmN0aW9uXG4gICAgICByZXN1bHQgPSBuZXcgKHR5cGVvZiB0aGlzID09ICdmdW5jdGlvbicgPyB0aGlzIDogQXJyYXkpKGxlbmd0aCA9ICQudG9MZW5ndGgoTy5sZW5ndGgpKTtcbiAgICAgIGZvcig7IGxlbmd0aCA+IGluZGV4OyBpbmRleCsrKXtcbiAgICAgICAgcmVzdWx0W2luZGV4XSA9IG1hcHBpbmcgPyBmKE9baW5kZXhdLCBpbmRleCkgOiBPW2luZGV4XTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmVzdWx0Lmxlbmd0aCA9IGluZGV4O1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbn0pOyIsInZhciAkICAgICAgICAgID0gcmVxdWlyZSgnLi8kJylcbiAgLCBzZXRVbnNjb3BlID0gcmVxdWlyZSgnLi8kLnVuc2NvcGUnKVxuICAsIElURVIgICAgICAgPSByZXF1aXJlKCcuLyQudWlkJykuc2FmZSgnaXRlcicpXG4gICwgJGl0ZXIgICAgICA9IHJlcXVpcmUoJy4vJC5pdGVyJylcbiAgLCBzdGVwICAgICAgID0gJGl0ZXIuc3RlcFxuICAsIEl0ZXJhdG9ycyAgPSAkaXRlci5JdGVyYXRvcnM7XG5cbi8vIDIyLjEuMy40IEFycmF5LnByb3RvdHlwZS5lbnRyaWVzKClcbi8vIDIyLjEuMy4xMyBBcnJheS5wcm90b3R5cGUua2V5cygpXG4vLyAyMi4xLjMuMjkgQXJyYXkucHJvdG90eXBlLnZhbHVlcygpXG4vLyAyMi4xLjMuMzAgQXJyYXkucHJvdG90eXBlW0BAaXRlcmF0b3JdKClcbnJlcXVpcmUoJy4vJC5pdGVyLWRlZmluZScpKEFycmF5LCAnQXJyYXknLCBmdW5jdGlvbihpdGVyYXRlZCwga2luZCl7XG4gICQuc2V0KHRoaXMsIElURVIsIHtvOiAkLnRvT2JqZWN0KGl0ZXJhdGVkKSwgaTogMCwgazoga2luZH0pO1xuLy8gMjIuMS41LjIuMSAlQXJyYXlJdGVyYXRvclByb3RvdHlwZSUubmV4dCgpXG59LCBmdW5jdGlvbigpe1xuICB2YXIgaXRlciAgPSB0aGlzW0lURVJdXG4gICAgLCBPICAgICA9IGl0ZXIub1xuICAgICwga2luZCAgPSBpdGVyLmtcbiAgICAsIGluZGV4ID0gaXRlci5pKys7XG4gIGlmKCFPIHx8IGluZGV4ID49IE8ubGVuZ3RoKXtcbiAgICBpdGVyLm8gPSB1bmRlZmluZWQ7XG4gICAgcmV0dXJuIHN0ZXAoMSk7XG4gIH1cbiAgaWYoa2luZCA9PSAna2V5cycgIClyZXR1cm4gc3RlcCgwLCBpbmRleCk7XG4gIGlmKGtpbmQgPT0gJ3ZhbHVlcycpcmV0dXJuIHN0ZXAoMCwgT1tpbmRleF0pO1xuICByZXR1cm4gc3RlcCgwLCBbaW5kZXgsIE9baW5kZXhdXSk7XG59LCAndmFsdWVzJyk7XG5cbi8vIGFyZ3VtZW50c0xpc3RbQEBpdGVyYXRvcl0gaXMgJUFycmF5UHJvdG9fdmFsdWVzJSAoOS40LjQuNiwgOS40LjQuNylcbkl0ZXJhdG9ycy5Bcmd1bWVudHMgPSBJdGVyYXRvcnMuQXJyYXk7XG5cbnNldFVuc2NvcGUoJ2tleXMnKTtcbnNldFVuc2NvcGUoJ3ZhbHVlcycpO1xuc2V0VW5zY29wZSgnZW50cmllcycpOyIsInZhciAkZGVmID0gcmVxdWlyZSgnLi8kLmRlZicpO1xuJGRlZigkZGVmLlMsICdBcnJheScsIHtcbiAgLy8gMjIuMS4yLjMgQXJyYXkub2YoIC4uLml0ZW1zKVxuICBvZjogZnVuY3Rpb24gb2YoLyogLi4uYXJncyAqLyl7XG4gICAgdmFyIGluZGV4ICA9IDBcbiAgICAgICwgbGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aFxuICAgICAgLy8gc3RyYW5nZSBJRSBxdWlya3MgbW9kZSBidWcgLT4gdXNlIHR5cGVvZiBpbnN0ZWFkIG9mIGlzRnVuY3Rpb25cbiAgICAgICwgcmVzdWx0ID0gbmV3ICh0eXBlb2YgdGhpcyA9PSAnZnVuY3Rpb24nID8gdGhpcyA6IEFycmF5KShsZW5ndGgpO1xuICAgIHdoaWxlKGxlbmd0aCA+IGluZGV4KXJlc3VsdFtpbmRleF0gPSBhcmd1bWVudHNbaW5kZXgrK107XG4gICAgcmVzdWx0Lmxlbmd0aCA9IGxlbmd0aDtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG59KTsiLCJyZXF1aXJlKCcuLyQuc3BlY2llcycpKEFycmF5KTsiLCJ2YXIgJCAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vJCcpXG4gICwgSEFTX0lOU1RBTkNFICA9IHJlcXVpcmUoJy4vJC53a3MnKSgnaGFzSW5zdGFuY2UnKVxuICAsIEZ1bmN0aW9uUHJvdG8gPSBGdW5jdGlvbi5wcm90b3R5cGU7XG4vLyAxOS4yLjMuNiBGdW5jdGlvbi5wcm90b3R5cGVbQEBoYXNJbnN0YW5jZV0oVilcbmlmKCEoSEFTX0lOU1RBTkNFIGluIEZ1bmN0aW9uUHJvdG8pKSQuc2V0RGVzYyhGdW5jdGlvblByb3RvLCBIQVNfSU5TVEFOQ0UsIHt2YWx1ZTogZnVuY3Rpb24oTyl7XG4gIGlmKCEkLmlzRnVuY3Rpb24odGhpcykgfHwgISQuaXNPYmplY3QoTykpcmV0dXJuIGZhbHNlO1xuICBpZighJC5pc09iamVjdCh0aGlzLnByb3RvdHlwZSkpcmV0dXJuIE8gaW5zdGFuY2VvZiB0aGlzO1xuICAvLyBmb3IgZW52aXJvbm1lbnQgdy9vIG5hdGl2ZSBgQEBoYXNJbnN0YW5jZWAgbG9naWMgZW5vdWdoIGBpbnN0YW5jZW9mYCwgYnV0IGFkZCB0aGlzOlxuICB3aGlsZShPID0gJC5nZXRQcm90byhPKSlpZih0aGlzLnByb3RvdHlwZSA9PT0gTylyZXR1cm4gdHJ1ZTtcbiAgcmV0dXJuIGZhbHNlO1xufX0pOyIsIid1c2Ugc3RyaWN0JztcbnZhciAkICAgID0gcmVxdWlyZSgnLi8kJylcbiAgLCBOQU1FID0gJ25hbWUnXG4gICwgc2V0RGVzYyA9ICQuc2V0RGVzY1xuICAsIEZ1bmN0aW9uUHJvdG8gPSBGdW5jdGlvbi5wcm90b3R5cGU7XG4vLyAxOS4yLjQuMiBuYW1lXG5OQU1FIGluIEZ1bmN0aW9uUHJvdG8gfHwgJC5GVyAmJiAkLkRFU0MgJiYgc2V0RGVzYyhGdW5jdGlvblByb3RvLCBOQU1FLCB7XG4gIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbigpe1xuICAgIHZhciBtYXRjaCA9IFN0cmluZyh0aGlzKS5tYXRjaCgvXlxccypmdW5jdGlvbiAoW14gKF0qKS8pXG4gICAgICAsIG5hbWUgID0gbWF0Y2ggPyBtYXRjaFsxXSA6ICcnO1xuICAgICQuaGFzKHRoaXMsIE5BTUUpIHx8IHNldERlc2ModGhpcywgTkFNRSwgJC5kZXNjKDUsIG5hbWUpKTtcbiAgICByZXR1cm4gbmFtZTtcbiAgfSxcbiAgc2V0OiBmdW5jdGlvbih2YWx1ZSl7XG4gICAgJC5oYXModGhpcywgTkFNRSkgfHwgc2V0RGVzYyh0aGlzLCBOQU1FLCAkLmRlc2MoMCwgdmFsdWUpKTtcbiAgfVxufSk7IiwiJ3VzZSBzdHJpY3QnO1xudmFyIHN0cm9uZyA9IHJlcXVpcmUoJy4vJC5jb2xsZWN0aW9uLXN0cm9uZycpO1xuXG4vLyAyMy4xIE1hcCBPYmplY3RzXG5yZXF1aXJlKCcuLyQuY29sbGVjdGlvbicpKCdNYXAnLCB7XG4gIC8vIDIzLjEuMy42IE1hcC5wcm90b3R5cGUuZ2V0KGtleSlcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoa2V5KXtcbiAgICB2YXIgZW50cnkgPSBzdHJvbmcuZ2V0RW50cnkodGhpcywga2V5KTtcbiAgICByZXR1cm4gZW50cnkgJiYgZW50cnkudjtcbiAgfSxcbiAgLy8gMjMuMS4zLjkgTWFwLnByb3RvdHlwZS5zZXQoa2V5LCB2YWx1ZSlcbiAgc2V0OiBmdW5jdGlvbiBzZXQoa2V5LCB2YWx1ZSl7XG4gICAgcmV0dXJuIHN0cm9uZy5kZWYodGhpcywga2V5ID09PSAwID8gMCA6IGtleSwgdmFsdWUpO1xuICB9XG59LCBzdHJvbmcsIHRydWUpOyIsInZhciBJbmZpbml0eSA9IDEgLyAwXG4gICwgJGRlZiAgPSByZXF1aXJlKCcuLyQuZGVmJylcbiAgLCBFICAgICA9IE1hdGguRVxuICAsIHBvdyAgID0gTWF0aC5wb3dcbiAgLCBhYnMgICA9IE1hdGguYWJzXG4gICwgZXhwICAgPSBNYXRoLmV4cFxuICAsIGxvZyAgID0gTWF0aC5sb2dcbiAgLCBzcXJ0ICA9IE1hdGguc3FydFxuICAsIGNlaWwgID0gTWF0aC5jZWlsXG4gICwgZmxvb3IgPSBNYXRoLmZsb29yXG4gICwgRVBTSUxPTiAgID0gcG93KDIsIC01MilcbiAgLCBFUFNJTE9OMzIgPSBwb3coMiwgLTIzKVxuICAsIE1BWDMyICAgICA9IHBvdygyLCAxMjcpICogKDIgLSBFUFNJTE9OMzIpXG4gICwgTUlOMzIgICAgID0gcG93KDIsIC0xMjYpO1xuZnVuY3Rpb24gcm91bmRUaWVzVG9FdmVuKG4pe1xuICByZXR1cm4gbiArIDEgLyBFUFNJTE9OIC0gMSAvIEVQU0lMT047XG59XG5cbi8vIDIwLjIuMi4yOCBNYXRoLnNpZ24oeClcbmZ1bmN0aW9uIHNpZ24oeCl7XG4gIHJldHVybiAoeCA9ICt4KSA9PSAwIHx8IHggIT0geCA/IHggOiB4IDwgMCA/IC0xIDogMTtcbn1cbi8vIDIwLjIuMi41IE1hdGguYXNpbmgoeClcbmZ1bmN0aW9uIGFzaW5oKHgpe1xuICByZXR1cm4gIWlzRmluaXRlKHggPSAreCkgfHwgeCA9PSAwID8geCA6IHggPCAwID8gLWFzaW5oKC14KSA6IGxvZyh4ICsgc3FydCh4ICogeCArIDEpKTtcbn1cbi8vIDIwLjIuMi4xNCBNYXRoLmV4cG0xKHgpXG5mdW5jdGlvbiBleHBtMSh4KXtcbiAgcmV0dXJuICh4ID0gK3gpID09IDAgPyB4IDogeCA+IC0xZS02ICYmIHggPCAxZS02ID8geCArIHggKiB4IC8gMiA6IGV4cCh4KSAtIDE7XG59XG5cbiRkZWYoJGRlZi5TLCAnTWF0aCcsIHtcbiAgLy8gMjAuMi4yLjMgTWF0aC5hY29zaCh4KVxuICBhY29zaDogZnVuY3Rpb24gYWNvc2goeCl7XG4gICAgcmV0dXJuICh4ID0gK3gpIDwgMSA/IE5hTiA6IGlzRmluaXRlKHgpID8gbG9nKHggLyBFICsgc3FydCh4ICsgMSkgKiBzcXJ0KHggLSAxKSAvIEUpICsgMSA6IHg7XG4gIH0sXG4gIC8vIDIwLjIuMi41IE1hdGguYXNpbmgoeClcbiAgYXNpbmg6IGFzaW5oLFxuICAvLyAyMC4yLjIuNyBNYXRoLmF0YW5oKHgpXG4gIGF0YW5oOiBmdW5jdGlvbiBhdGFuaCh4KXtcbiAgICByZXR1cm4gKHggPSAreCkgPT0gMCA/IHggOiBsb2coKDEgKyB4KSAvICgxIC0geCkpIC8gMjtcbiAgfSxcbiAgLy8gMjAuMi4yLjkgTWF0aC5jYnJ0KHgpXG4gIGNicnQ6IGZ1bmN0aW9uIGNicnQoeCl7XG4gICAgcmV0dXJuIHNpZ24oeCA9ICt4KSAqIHBvdyhhYnMoeCksIDEgLyAzKTtcbiAgfSxcbiAgLy8gMjAuMi4yLjExIE1hdGguY2x6MzIoeClcbiAgY2x6MzI6IGZ1bmN0aW9uIGNsejMyKHgpe1xuICAgIHJldHVybiAoeCA+Pj49IDApID8gMzEgLSBmbG9vcihsb2coeCArIDAuNSkgKiBNYXRoLkxPRzJFKSA6IDMyO1xuICB9LFxuICAvLyAyMC4yLjIuMTIgTWF0aC5jb3NoKHgpXG4gIGNvc2g6IGZ1bmN0aW9uIGNvc2goeCl7XG4gICAgcmV0dXJuIChleHAoeCA9ICt4KSArIGV4cCgteCkpIC8gMjtcbiAgfSxcbiAgLy8gMjAuMi4yLjE0IE1hdGguZXhwbTEoeClcbiAgZXhwbTE6IGV4cG0xLFxuICAvLyAyMC4yLjIuMTYgTWF0aC5mcm91bmQoeClcbiAgZnJvdW5kOiBmdW5jdGlvbiBmcm91bmQoeCl7XG4gICAgdmFyICRhYnMgID0gYWJzKHgpXG4gICAgICAsICRzaWduID0gc2lnbih4KVxuICAgICAgLCBhLCByZXN1bHQ7XG4gICAgaWYoJGFicyA8IE1JTjMyKXJldHVybiAkc2lnbiAqIHJvdW5kVGllc1RvRXZlbigkYWJzIC8gTUlOMzIgLyBFUFNJTE9OMzIpICogTUlOMzIgKiBFUFNJTE9OMzI7XG4gICAgYSA9ICgxICsgRVBTSUxPTjMyIC8gRVBTSUxPTikgKiAkYWJzO1xuICAgIHJlc3VsdCA9IGEgLSAoYSAtICRhYnMpO1xuICAgIGlmKHJlc3VsdCA+IE1BWDMyIHx8IHJlc3VsdCAhPSByZXN1bHQpcmV0dXJuICRzaWduICogSW5maW5pdHk7XG4gICAgcmV0dXJuICRzaWduICogcmVzdWx0O1xuICB9LFxuICAvLyAyMC4yLjIuMTcgTWF0aC5oeXBvdChbdmFsdWUxWywgdmFsdWUyWywg4oCmIF1dXSlcbiAgaHlwb3Q6IGZ1bmN0aW9uIGh5cG90KHZhbHVlMSwgdmFsdWUyKXsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuICAgIHZhciBzdW0gID0gMFxuICAgICAgLCBpICAgID0gMFxuICAgICAgLCBsZW4gID0gYXJndW1lbnRzLmxlbmd0aFxuICAgICAgLCBhcmdzID0gQXJyYXkobGVuKVxuICAgICAgLCBsYXJnID0gMFxuICAgICAgLCBhcmc7XG4gICAgd2hpbGUoaSA8IGxlbil7XG4gICAgICBhcmcgPSBhcmdzW2ldID0gYWJzKGFyZ3VtZW50c1tpKytdKTtcbiAgICAgIGlmKGFyZyA9PSBJbmZpbml0eSlyZXR1cm4gSW5maW5pdHk7XG4gICAgICBpZihhcmcgPiBsYXJnKWxhcmcgPSBhcmc7XG4gICAgfVxuICAgIGxhcmcgPSBsYXJnIHx8IDE7XG4gICAgd2hpbGUobGVuLS0pc3VtICs9IHBvdyhhcmdzW2xlbl0gLyBsYXJnLCAyKTtcbiAgICByZXR1cm4gbGFyZyAqIHNxcnQoc3VtKTtcbiAgfSxcbiAgLy8gMjAuMi4yLjE4IE1hdGguaW11bCh4LCB5KVxuICBpbXVsOiBmdW5jdGlvbiBpbXVsKHgsIHkpe1xuICAgIHZhciBVSW50MTYgPSAweGZmZmZcbiAgICAgICwgeG4gPSAreFxuICAgICAgLCB5biA9ICt5XG4gICAgICAsIHhsID0gVUludDE2ICYgeG5cbiAgICAgICwgeWwgPSBVSW50MTYgJiB5bjtcbiAgICByZXR1cm4gMCB8IHhsICogeWwgKyAoKFVJbnQxNiAmIHhuID4+PiAxNikgKiB5bCArIHhsICogKFVJbnQxNiAmIHluID4+PiAxNikgPDwgMTYgPj4+IDApO1xuICB9LFxuICAvLyAyMC4yLjIuMjAgTWF0aC5sb2cxcCh4KVxuICBsb2cxcDogZnVuY3Rpb24gbG9nMXAoeCl7XG4gICAgcmV0dXJuICh4ID0gK3gpID4gLTFlLTggJiYgeCA8IDFlLTggPyB4IC0geCAqIHggLyAyIDogbG9nKDEgKyB4KTtcbiAgfSxcbiAgLy8gMjAuMi4yLjIxIE1hdGgubG9nMTAoeClcbiAgbG9nMTA6IGZ1bmN0aW9uIGxvZzEwKHgpe1xuICAgIHJldHVybiBsb2coeCkgLyBNYXRoLkxOMTA7XG4gIH0sXG4gIC8vIDIwLjIuMi4yMiBNYXRoLmxvZzIoeClcbiAgbG9nMjogZnVuY3Rpb24gbG9nMih4KXtcbiAgICByZXR1cm4gbG9nKHgpIC8gTWF0aC5MTjI7XG4gIH0sXG4gIC8vIDIwLjIuMi4yOCBNYXRoLnNpZ24oeClcbiAgc2lnbjogc2lnbixcbiAgLy8gMjAuMi4yLjMwIE1hdGguc2luaCh4KVxuICBzaW5oOiBmdW5jdGlvbiBzaW5oKHgpe1xuICAgIHJldHVybiBhYnMoeCA9ICt4KSA8IDEgPyAoZXhwbTEoeCkgLSBleHBtMSgteCkpIC8gMiA6IChleHAoeCAtIDEpIC0gZXhwKC14IC0gMSkpICogKEUgLyAyKTtcbiAgfSxcbiAgLy8gMjAuMi4yLjMzIE1hdGgudGFuaCh4KVxuICB0YW5oOiBmdW5jdGlvbiB0YW5oKHgpe1xuICAgIHZhciBhID0gZXhwbTEoeCA9ICt4KVxuICAgICAgLCBiID0gZXhwbTEoLXgpO1xuICAgIHJldHVybiBhID09IEluZmluaXR5ID8gMSA6IGIgPT0gSW5maW5pdHkgPyAtMSA6IChhIC0gYikgLyAoZXhwKHgpICsgZXhwKC14KSk7XG4gIH0sXG4gIC8vIDIwLjIuMi4zNCBNYXRoLnRydW5jKHgpXG4gIHRydW5jOiBmdW5jdGlvbiB0cnVuYyhpdCl7XG4gICAgcmV0dXJuIChpdCA+IDAgPyBmbG9vciA6IGNlaWwpKGl0KTtcbiAgfVxufSk7IiwiJ3VzZSBzdHJpY3QnO1xudmFyICQgICAgICAgICAgPSByZXF1aXJlKCcuLyQnKVxuICAsIGlzT2JqZWN0ICAgPSAkLmlzT2JqZWN0XG4gICwgaXNGdW5jdGlvbiA9ICQuaXNGdW5jdGlvblxuICAsIE5VTUJFUiAgICAgPSAnTnVtYmVyJ1xuICAsICROdW1iZXIgICAgPSAkLmdbTlVNQkVSXVxuICAsIEJhc2UgICAgICAgPSAkTnVtYmVyXG4gICwgcHJvdG8gICAgICA9ICROdW1iZXIucHJvdG90eXBlO1xuZnVuY3Rpb24gdG9QcmltaXRpdmUoaXQpe1xuICB2YXIgZm4sIHZhbDtcbiAgaWYoaXNGdW5jdGlvbihmbiA9IGl0LnZhbHVlT2YpICYmICFpc09iamVjdCh2YWwgPSBmbi5jYWxsKGl0KSkpcmV0dXJuIHZhbDtcbiAgaWYoaXNGdW5jdGlvbihmbiA9IGl0LnRvU3RyaW5nKSAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKXJldHVybiB2YWw7XG4gIHRocm93IFR5cGVFcnJvcihcIkNhbid0IGNvbnZlcnQgb2JqZWN0IHRvIG51bWJlclwiKTtcbn1cbmZ1bmN0aW9uIHRvTnVtYmVyKGl0KXtcbiAgaWYoaXNPYmplY3QoaXQpKWl0ID0gdG9QcmltaXRpdmUoaXQpO1xuICBpZih0eXBlb2YgaXQgPT0gJ3N0cmluZycgJiYgaXQubGVuZ3RoID4gMiAmJiBpdC5jaGFyQ29kZUF0KDApID09IDQ4KXtcbiAgICB2YXIgYmluYXJ5ID0gZmFsc2U7XG4gICAgc3dpdGNoKGl0LmNoYXJDb2RlQXQoMSkpe1xuICAgICAgY2FzZSA2NiA6IGNhc2UgOTggIDogYmluYXJ5ID0gdHJ1ZTtcbiAgICAgIGNhc2UgNzkgOiBjYXNlIDExMSA6IHJldHVybiBwYXJzZUludChpdC5zbGljZSgyKSwgYmluYXJ5ID8gMiA6IDgpO1xuICAgIH1cbiAgfSByZXR1cm4gK2l0O1xufVxuaWYoJC5GVyAmJiAhKCROdW1iZXIoJzBvMScpICYmICROdW1iZXIoJzBiMScpKSl7XG4gICROdW1iZXIgPSBmdW5jdGlvbiBOdW1iZXIoaXQpe1xuICAgIHJldHVybiB0aGlzIGluc3RhbmNlb2YgJE51bWJlciA/IG5ldyBCYXNlKHRvTnVtYmVyKGl0KSkgOiB0b051bWJlcihpdCk7XG4gIH07XG4gICQuZWFjaC5jYWxsKCQuREVTQyA/ICQuZ2V0TmFtZXMoQmFzZSkgOiAoXG4gICAgICAvLyBFUzM6XG4gICAgICAnTUFYX1ZBTFVFLE1JTl9WQUxVRSxOYU4sTkVHQVRJVkVfSU5GSU5JVFksUE9TSVRJVkVfSU5GSU5JVFksJyArXG4gICAgICAvLyBFUzYgKGluIGNhc2UsIGlmIG1vZHVsZXMgd2l0aCBFUzYgTnVtYmVyIHN0YXRpY3MgcmVxdWlyZWQgYmVmb3JlKTpcbiAgICAgICdFUFNJTE9OLGlzRmluaXRlLGlzSW50ZWdlcixpc05hTixpc1NhZmVJbnRlZ2VyLE1BWF9TQUZFX0lOVEVHRVIsJyArXG4gICAgICAnTUlOX1NBRkVfSU5URUdFUixwYXJzZUZsb2F0LHBhcnNlSW50LGlzSW50ZWdlcidcbiAgICApLnNwbGl0KCcsJyksIGZ1bmN0aW9uKGtleSl7XG4gICAgICBpZigkLmhhcyhCYXNlLCBrZXkpICYmICEkLmhhcygkTnVtYmVyLCBrZXkpKXtcbiAgICAgICAgJC5zZXREZXNjKCROdW1iZXIsIGtleSwgJC5nZXREZXNjKEJhc2UsIGtleSkpO1xuICAgICAgfVxuICAgIH1cbiAgKTtcbiAgJE51bWJlci5wcm90b3R5cGUgPSBwcm90bztcbiAgcHJvdG8uY29uc3RydWN0b3IgPSAkTnVtYmVyO1xuICByZXF1aXJlKCcuLyQucmVkZWYnKSgkLmcsIE5VTUJFUiwgJE51bWJlcik7XG59IiwidmFyICQgICAgID0gcmVxdWlyZSgnLi8kJylcbiAgLCAkZGVmICA9IHJlcXVpcmUoJy4vJC5kZWYnKVxuICAsIGFicyAgID0gTWF0aC5hYnNcbiAgLCBmbG9vciA9IE1hdGguZmxvb3JcbiAgLCBfaXNGaW5pdGUgPSAkLmcuaXNGaW5pdGVcbiAgLCBNQVhfU0FGRV9JTlRFR0VSID0gMHgxZmZmZmZmZmZmZmZmZjsgLy8gcG93KDIsIDUzKSAtIDEgPT0gOTAwNzE5OTI1NDc0MDk5MTtcbmZ1bmN0aW9uIGlzSW50ZWdlcihpdCl7XG4gIHJldHVybiAhJC5pc09iamVjdChpdCkgJiYgX2lzRmluaXRlKGl0KSAmJiBmbG9vcihpdCkgPT09IGl0O1xufVxuJGRlZigkZGVmLlMsICdOdW1iZXInLCB7XG4gIC8vIDIwLjEuMi4xIE51bWJlci5FUFNJTE9OXG4gIEVQU0lMT046IE1hdGgucG93KDIsIC01MiksXG4gIC8vIDIwLjEuMi4yIE51bWJlci5pc0Zpbml0ZShudW1iZXIpXG4gIGlzRmluaXRlOiBmdW5jdGlvbiBpc0Zpbml0ZShpdCl7XG4gICAgcmV0dXJuIHR5cGVvZiBpdCA9PSAnbnVtYmVyJyAmJiBfaXNGaW5pdGUoaXQpO1xuICB9LFxuICAvLyAyMC4xLjIuMyBOdW1iZXIuaXNJbnRlZ2VyKG51bWJlcilcbiAgaXNJbnRlZ2VyOiBpc0ludGVnZXIsXG4gIC8vIDIwLjEuMi40IE51bWJlci5pc05hTihudW1iZXIpXG4gIGlzTmFOOiBmdW5jdGlvbiBpc05hTihudW1iZXIpe1xuICAgIHJldHVybiBudW1iZXIgIT0gbnVtYmVyO1xuICB9LFxuICAvLyAyMC4xLjIuNSBOdW1iZXIuaXNTYWZlSW50ZWdlcihudW1iZXIpXG4gIGlzU2FmZUludGVnZXI6IGZ1bmN0aW9uIGlzU2FmZUludGVnZXIobnVtYmVyKXtcbiAgICByZXR1cm4gaXNJbnRlZ2VyKG51bWJlcikgJiYgYWJzKG51bWJlcikgPD0gTUFYX1NBRkVfSU5URUdFUjtcbiAgfSxcbiAgLy8gMjAuMS4yLjYgTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVJcbiAgTUFYX1NBRkVfSU5URUdFUjogTUFYX1NBRkVfSU5URUdFUixcbiAgLy8gMjAuMS4yLjEwIE51bWJlci5NSU5fU0FGRV9JTlRFR0VSXG4gIE1JTl9TQUZFX0lOVEVHRVI6IC1NQVhfU0FGRV9JTlRFR0VSLFxuICAvLyAyMC4xLjIuMTIgTnVtYmVyLnBhcnNlRmxvYXQoc3RyaW5nKVxuICBwYXJzZUZsb2F0OiBwYXJzZUZsb2F0LFxuICAvLyAyMC4xLjIuMTMgTnVtYmVyLnBhcnNlSW50KHN0cmluZywgcmFkaXgpXG4gIHBhcnNlSW50OiBwYXJzZUludFxufSk7IiwiLy8gMTkuMS4zLjEgT2JqZWN0LmFzc2lnbih0YXJnZXQsIHNvdXJjZSlcbnZhciAkZGVmID0gcmVxdWlyZSgnLi8kLmRlZicpO1xuJGRlZigkZGVmLlMsICdPYmplY3QnLCB7YXNzaWduOiByZXF1aXJlKCcuLyQuYXNzaWduJyl9KTsiLCIvLyAxOS4xLjMuMTAgT2JqZWN0LmlzKHZhbHVlMSwgdmFsdWUyKVxudmFyICRkZWYgPSByZXF1aXJlKCcuLyQuZGVmJyk7XG4kZGVmKCRkZWYuUywgJ09iamVjdCcsIHtcbiAgaXM6IGZ1bmN0aW9uIGlzKHgsIHkpe1xuICAgIHJldHVybiB4ID09PSB5ID8geCAhPT0gMCB8fCAxIC8geCA9PT0gMSAvIHkgOiB4ICE9IHggJiYgeSAhPSB5O1xuICB9XG59KTsiLCIvLyAxOS4xLjMuMTkgT2JqZWN0LnNldFByb3RvdHlwZU9mKE8sIHByb3RvKVxudmFyICRkZWYgPSByZXF1aXJlKCcuLyQuZGVmJyk7XG4kZGVmKCRkZWYuUywgJ09iamVjdCcsIHtzZXRQcm90b3R5cGVPZjogcmVxdWlyZSgnLi8kLnNldC1wcm90bycpLnNldH0pOyIsInZhciAkICAgICAgICA9IHJlcXVpcmUoJy4vJCcpXG4gICwgJGRlZiAgICAgPSByZXF1aXJlKCcuLyQuZGVmJylcbiAgLCBpc09iamVjdCA9ICQuaXNPYmplY3RcbiAgLCB0b09iamVjdCA9ICQudG9PYmplY3Q7XG4kLmVhY2guY2FsbCgoJ2ZyZWV6ZSxzZWFsLHByZXZlbnRFeHRlbnNpb25zLGlzRnJvemVuLGlzU2VhbGVkLGlzRXh0ZW5zaWJsZSwnICtcbiAgJ2dldE93blByb3BlcnR5RGVzY3JpcHRvcixnZXRQcm90b3R5cGVPZixrZXlzLGdldE93blByb3BlcnR5TmFtZXMnKS5zcGxpdCgnLCcpXG4sIGZ1bmN0aW9uKEtFWSwgSUQpe1xuICB2YXIgZm4gICAgID0gKCQuY29yZS5PYmplY3QgfHwge30pW0tFWV0gfHwgT2JqZWN0W0tFWV1cbiAgICAsIGZvcmNlZCA9IDBcbiAgICAsIG1ldGhvZCA9IHt9O1xuICBtZXRob2RbS0VZXSA9IElEID09IDAgPyBmdW5jdGlvbiBmcmVlemUoaXQpe1xuICAgIHJldHVybiBpc09iamVjdChpdCkgPyBmbihpdCkgOiBpdDtcbiAgfSA6IElEID09IDEgPyBmdW5jdGlvbiBzZWFsKGl0KXtcbiAgICByZXR1cm4gaXNPYmplY3QoaXQpID8gZm4oaXQpIDogaXQ7XG4gIH0gOiBJRCA9PSAyID8gZnVuY3Rpb24gcHJldmVudEV4dGVuc2lvbnMoaXQpe1xuICAgIHJldHVybiBpc09iamVjdChpdCkgPyBmbihpdCkgOiBpdDtcbiAgfSA6IElEID09IDMgPyBmdW5jdGlvbiBpc0Zyb3plbihpdCl7XG4gICAgcmV0dXJuIGlzT2JqZWN0KGl0KSA/IGZuKGl0KSA6IHRydWU7XG4gIH0gOiBJRCA9PSA0ID8gZnVuY3Rpb24gaXNTZWFsZWQoaXQpe1xuICAgIHJldHVybiBpc09iamVjdChpdCkgPyBmbihpdCkgOiB0cnVlO1xuICB9IDogSUQgPT0gNSA/IGZ1bmN0aW9uIGlzRXh0ZW5zaWJsZShpdCl7XG4gICAgcmV0dXJuIGlzT2JqZWN0KGl0KSA/IGZuKGl0KSA6IGZhbHNlO1xuICB9IDogSUQgPT0gNiA/IGZ1bmN0aW9uIGdldE93blByb3BlcnR5RGVzY3JpcHRvcihpdCwga2V5KXtcbiAgICByZXR1cm4gZm4odG9PYmplY3QoaXQpLCBrZXkpO1xuICB9IDogSUQgPT0gNyA/IGZ1bmN0aW9uIGdldFByb3RvdHlwZU9mKGl0KXtcbiAgICByZXR1cm4gZm4oT2JqZWN0KCQuYXNzZXJ0RGVmaW5lZChpdCkpKTtcbiAgfSA6IElEID09IDggPyBmdW5jdGlvbiBrZXlzKGl0KXtcbiAgICByZXR1cm4gZm4odG9PYmplY3QoaXQpKTtcbiAgfSA6IGZ1bmN0aW9uIGdldE93blByb3BlcnR5TmFtZXMoaXQpe1xuICAgIHJldHVybiBmbih0b09iamVjdChpdCkpO1xuICB9O1xuICB0cnkge1xuICAgIGZuKCd6Jyk7XG4gIH0gY2F0Y2goZSl7XG4gICAgZm9yY2VkID0gMTtcbiAgfVxuICAkZGVmKCRkZWYuUyArICRkZWYuRiAqIGZvcmNlZCwgJ09iamVjdCcsIG1ldGhvZCk7XG59KTsiLCIndXNlIHN0cmljdCc7XG4vLyAxOS4xLjMuNiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nKClcbnZhciBjb2YgPSByZXF1aXJlKCcuLyQuY29mJylcbiAgLCB0bXAgPSB7fTtcbnRtcFtyZXF1aXJlKCcuLyQud2tzJykoJ3RvU3RyaW5nVGFnJyldID0gJ3onO1xuaWYocmVxdWlyZSgnLi8kJykuRlcgJiYgY29mKHRtcCkgIT0gJ3onKXtcbiAgcmVxdWlyZSgnLi8kLnJlZGVmJykoT2JqZWN0LnByb3RvdHlwZSwgJ3RvU3RyaW5nJywgZnVuY3Rpb24gdG9TdHJpbmcoKXtcbiAgICByZXR1cm4gJ1tvYmplY3QgJyArIGNvZi5jbGFzc29mKHRoaXMpICsgJ10nO1xuICB9LCB0cnVlKTtcbn0iLCIndXNlIHN0cmljdCc7XG52YXIgJCAgICAgICAgPSByZXF1aXJlKCcuLyQnKVxuICAsIGN0eCAgICAgID0gcmVxdWlyZSgnLi8kLmN0eCcpXG4gICwgY29mICAgICAgPSByZXF1aXJlKCcuLyQuY29mJylcbiAgLCAkZGVmICAgICA9IHJlcXVpcmUoJy4vJC5kZWYnKVxuICAsIGFzc2VydCAgID0gcmVxdWlyZSgnLi8kLmFzc2VydCcpXG4gICwgZm9yT2YgICAgPSByZXF1aXJlKCcuLyQuZm9yLW9mJylcbiAgLCBzZXRQcm90byA9IHJlcXVpcmUoJy4vJC5zZXQtcHJvdG8nKS5zZXRcbiAgLCBzcGVjaWVzICA9IHJlcXVpcmUoJy4vJC5zcGVjaWVzJylcbiAgLCBTUEVDSUVTICA9IHJlcXVpcmUoJy4vJC53a3MnKSgnc3BlY2llcycpXG4gICwgUkVDT1JEICAgPSByZXF1aXJlKCcuLyQudWlkJykuc2FmZSgncmVjb3JkJylcbiAgLCBQUk9NSVNFICA9ICdQcm9taXNlJ1xuICAsIGdsb2JhbCAgID0gJC5nXG4gICwgcHJvY2VzcyAgPSBnbG9iYWwucHJvY2Vzc1xuICAsIGFzYXAgICAgID0gcHJvY2VzcyAmJiBwcm9jZXNzLm5leHRUaWNrIHx8IHJlcXVpcmUoJy4vJC50YXNrJykuc2V0XG4gICwgUCAgICAgICAgPSBnbG9iYWxbUFJPTUlTRV1cbiAgLCBpc0Z1bmN0aW9uICAgICA9ICQuaXNGdW5jdGlvblxuICAsIGlzT2JqZWN0ICAgICAgID0gJC5pc09iamVjdFxuICAsIGFzc2VydEZ1bmN0aW9uID0gYXNzZXJ0LmZuXG4gICwgYXNzZXJ0T2JqZWN0ICAgPSBhc3NlcnQub2JqO1xuXG52YXIgdXNlTmF0aXZlID0gZnVuY3Rpb24oKXtcbiAgdmFyIHRlc3QsIHdvcmtzID0gZmFsc2U7XG4gIGZ1bmN0aW9uIFAyKHgpe1xuICAgIHZhciBzZWxmID0gbmV3IFAoeCk7XG4gICAgc2V0UHJvdG8oc2VsZiwgUDIucHJvdG90eXBlKTtcbiAgICByZXR1cm4gc2VsZjtcbiAgfVxuICB0cnkge1xuICAgIHdvcmtzID0gaXNGdW5jdGlvbihQKSAmJiBpc0Z1bmN0aW9uKFAucmVzb2x2ZSkgJiYgUC5yZXNvbHZlKHRlc3QgPSBuZXcgUChmdW5jdGlvbigpe30pKSA9PSB0ZXN0O1xuICAgIHNldFByb3RvKFAyLCBQKTtcbiAgICBQMi5wcm90b3R5cGUgPSAkLmNyZWF0ZShQLnByb3RvdHlwZSwge2NvbnN0cnVjdG9yOiB7dmFsdWU6IFAyfX0pO1xuICAgIC8vIGFjdHVhbCBGaXJlZm94IGhhcyBicm9rZW4gc3ViY2xhc3Mgc3VwcG9ydCwgdGVzdCB0aGF0XG4gICAgaWYoIShQMi5yZXNvbHZlKDUpLnRoZW4oZnVuY3Rpb24oKXt9KSBpbnN0YW5jZW9mIFAyKSl7XG4gICAgICB3b3JrcyA9IGZhbHNlO1xuICAgIH1cbiAgfSBjYXRjaChlKXsgd29ya3MgPSBmYWxzZTsgfVxuICByZXR1cm4gd29ya3M7XG59KCk7XG5cbi8vIGhlbHBlcnNcbmZ1bmN0aW9uIGdldENvbnN0cnVjdG9yKEMpe1xuICB2YXIgUyA9IGFzc2VydE9iamVjdChDKVtTUEVDSUVTXTtcbiAgcmV0dXJuIFMgIT0gdW5kZWZpbmVkID8gUyA6IEM7XG59XG5mdW5jdGlvbiBpc1RoZW5hYmxlKGl0KXtcbiAgdmFyIHRoZW47XG4gIGlmKGlzT2JqZWN0KGl0KSl0aGVuID0gaXQudGhlbjtcbiAgcmV0dXJuIGlzRnVuY3Rpb24odGhlbikgPyB0aGVuIDogZmFsc2U7XG59XG5mdW5jdGlvbiBub3RpZnkocmVjb3JkKXtcbiAgdmFyIGNoYWluID0gcmVjb3JkLmM7XG4gIGlmKGNoYWluLmxlbmd0aClhc2FwKGZ1bmN0aW9uKCl7XG4gICAgdmFyIHZhbHVlID0gcmVjb3JkLnZcbiAgICAgICwgb2sgICAgPSByZWNvcmQucyA9PSAxXG4gICAgICAsIGkgICAgID0gMDtcbiAgICBmdW5jdGlvbiBydW4ocmVhY3Qpe1xuICAgICAgdmFyIGNiID0gb2sgPyByZWFjdC5vayA6IHJlYWN0LmZhaWxcbiAgICAgICAgLCByZXQsIHRoZW47XG4gICAgICB0cnkge1xuICAgICAgICBpZihjYil7XG4gICAgICAgICAgaWYoIW9rKXJlY29yZC5oID0gdHJ1ZTtcbiAgICAgICAgICByZXQgPSBjYiA9PT0gdHJ1ZSA/IHZhbHVlIDogY2IodmFsdWUpO1xuICAgICAgICAgIGlmKHJldCA9PT0gcmVhY3QuUCl7XG4gICAgICAgICAgICByZWFjdC5yZWooVHlwZUVycm9yKCdQcm9taXNlLWNoYWluIGN5Y2xlJykpO1xuICAgICAgICAgIH0gZWxzZSBpZih0aGVuID0gaXNUaGVuYWJsZShyZXQpKXtcbiAgICAgICAgICAgIHRoZW4uY2FsbChyZXQsIHJlYWN0LnJlcywgcmVhY3QucmVqKTtcbiAgICAgICAgICB9IGVsc2UgcmVhY3QucmVzKHJldCk7XG4gICAgICAgIH0gZWxzZSByZWFjdC5yZWoodmFsdWUpO1xuICAgICAgfSBjYXRjaChlcnIpe1xuICAgICAgICByZWFjdC5yZWooZXJyKTtcbiAgICAgIH1cbiAgICB9XG4gICAgd2hpbGUoY2hhaW4ubGVuZ3RoID4gaSlydW4oY2hhaW5baSsrXSk7IC8vIHZhcmlhYmxlIGxlbmd0aCAtIGNhbid0IHVzZSBmb3JFYWNoXG4gICAgY2hhaW4ubGVuZ3RoID0gMDtcbiAgfSk7XG59XG5mdW5jdGlvbiBpc1VuaGFuZGxlZChwcm9taXNlKXtcbiAgdmFyIHJlY29yZCA9IHByb21pc2VbUkVDT1JEXVxuICAgICwgY2hhaW4gID0gcmVjb3JkLmEgfHwgcmVjb3JkLmNcbiAgICAsIGkgICAgICA9IDBcbiAgICAsIHJlYWN0O1xuICBpZihyZWNvcmQuaClyZXR1cm4gZmFsc2U7XG4gIHdoaWxlKGNoYWluLmxlbmd0aCA+IGkpe1xuICAgIHJlYWN0ID0gY2hhaW5baSsrXTtcbiAgICBpZihyZWFjdC5mYWlsIHx8ICFpc1VuaGFuZGxlZChyZWFjdC5QKSlyZXR1cm4gZmFsc2U7XG4gIH0gcmV0dXJuIHRydWU7XG59XG5mdW5jdGlvbiAkcmVqZWN0KHZhbHVlKXtcbiAgdmFyIHJlY29yZCA9IHRoaXNcbiAgICAsIHByb21pc2U7XG4gIGlmKHJlY29yZC5kKXJldHVybjtcbiAgcmVjb3JkLmQgPSB0cnVlO1xuICByZWNvcmQgPSByZWNvcmQuciB8fCByZWNvcmQ7IC8vIHVud3JhcFxuICByZWNvcmQudiA9IHZhbHVlO1xuICByZWNvcmQucyA9IDI7XG4gIHJlY29yZC5hID0gcmVjb3JkLmMuc2xpY2UoKTtcbiAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgIGFzYXAoZnVuY3Rpb24oKXtcbiAgICAgIGlmKGlzVW5oYW5kbGVkKHByb21pc2UgPSByZWNvcmQucCkpe1xuICAgICAgICBpZihjb2YocHJvY2VzcykgPT0gJ3Byb2Nlc3MnKXtcbiAgICAgICAgICBwcm9jZXNzLmVtaXQoJ3VuaGFuZGxlZFJlamVjdGlvbicsIHZhbHVlLCBwcm9taXNlKTtcbiAgICAgICAgfSBlbHNlIGlmKGdsb2JhbC5jb25zb2xlICYmIGlzRnVuY3Rpb24oY29uc29sZS5lcnJvcikpe1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1VuaGFuZGxlZCBwcm9taXNlIHJlamVjdGlvbicsIHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmVjb3JkLmEgPSB1bmRlZmluZWQ7XG4gICAgfSk7XG4gIH0sIDEpO1xuICBub3RpZnkocmVjb3JkKTtcbn1cbmZ1bmN0aW9uICRyZXNvbHZlKHZhbHVlKXtcbiAgdmFyIHJlY29yZCA9IHRoaXNcbiAgICAsIHRoZW4sIHdyYXBwZXI7XG4gIGlmKHJlY29yZC5kKXJldHVybjtcbiAgcmVjb3JkLmQgPSB0cnVlO1xuICByZWNvcmQgPSByZWNvcmQuciB8fCByZWNvcmQ7IC8vIHVud3JhcFxuICB0cnkge1xuICAgIGlmKHRoZW4gPSBpc1RoZW5hYmxlKHZhbHVlKSl7XG4gICAgICB3cmFwcGVyID0ge3I6IHJlY29yZCwgZDogZmFsc2V9OyAvLyB3cmFwXG4gICAgICB0aGVuLmNhbGwodmFsdWUsIGN0eCgkcmVzb2x2ZSwgd3JhcHBlciwgMSksIGN0eCgkcmVqZWN0LCB3cmFwcGVyLCAxKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlY29yZC52ID0gdmFsdWU7XG4gICAgICByZWNvcmQucyA9IDE7XG4gICAgICBub3RpZnkocmVjb3JkKTtcbiAgICB9XG4gIH0gY2F0Y2goZXJyKXtcbiAgICAkcmVqZWN0LmNhbGwod3JhcHBlciB8fCB7cjogcmVjb3JkLCBkOiBmYWxzZX0sIGVycik7IC8vIHdyYXBcbiAgfVxufVxuXG4vLyBjb25zdHJ1Y3RvciBwb2x5ZmlsbFxuaWYoIXVzZU5hdGl2ZSl7XG4gIC8vIDI1LjQuMy4xIFByb21pc2UoZXhlY3V0b3IpXG4gIFAgPSBmdW5jdGlvbiBQcm9taXNlKGV4ZWN1dG9yKXtcbiAgICBhc3NlcnRGdW5jdGlvbihleGVjdXRvcik7XG4gICAgdmFyIHJlY29yZCA9IHtcbiAgICAgIHA6IGFzc2VydC5pbnN0KHRoaXMsIFAsIFBST01JU0UpLCAgICAgICAvLyA8LSBwcm9taXNlXG4gICAgICBjOiBbXSwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gPC0gYXdhaXRpbmcgcmVhY3Rpb25zXG4gICAgICBhOiB1bmRlZmluZWQsICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gPC0gY2hlY2tlZCBpbiBpc1VuaGFuZGxlZCByZWFjdGlvbnNcbiAgICAgIHM6IDAsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyA8LSBzdGF0ZVxuICAgICAgZDogZmFsc2UsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIDwtIGRvbmVcbiAgICAgIHY6IHVuZGVmaW5lZCwgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyA8LSB2YWx1ZVxuICAgICAgaDogZmFsc2UgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIDwtIGhhbmRsZWQgcmVqZWN0aW9uXG4gICAgfTtcbiAgICAkLmhpZGUodGhpcywgUkVDT1JELCByZWNvcmQpO1xuICAgIHRyeSB7XG4gICAgICBleGVjdXRvcihjdHgoJHJlc29sdmUsIHJlY29yZCwgMSksIGN0eCgkcmVqZWN0LCByZWNvcmQsIDEpKTtcbiAgICB9IGNhdGNoKGVycil7XG4gICAgICAkcmVqZWN0LmNhbGwocmVjb3JkLCBlcnIpO1xuICAgIH1cbiAgfTtcbiAgcmVxdWlyZSgnLi8kLm1peCcpKFAucHJvdG90eXBlLCB7XG4gICAgLy8gMjUuNC41LjMgUHJvbWlzZS5wcm90b3R5cGUudGhlbihvbkZ1bGZpbGxlZCwgb25SZWplY3RlZClcbiAgICB0aGVuOiBmdW5jdGlvbiB0aGVuKG9uRnVsZmlsbGVkLCBvblJlamVjdGVkKXtcbiAgICAgIHZhciBTID0gYXNzZXJ0T2JqZWN0KGFzc2VydE9iamVjdCh0aGlzKS5jb25zdHJ1Y3RvcilbU1BFQ0lFU107XG4gICAgICB2YXIgcmVhY3QgPSB7XG4gICAgICAgIG9rOiAgIGlzRnVuY3Rpb24ob25GdWxmaWxsZWQpID8gb25GdWxmaWxsZWQgOiB0cnVlLFxuICAgICAgICBmYWlsOiBpc0Z1bmN0aW9uKG9uUmVqZWN0ZWQpICA/IG9uUmVqZWN0ZWQgIDogZmFsc2VcbiAgICAgIH07XG4gICAgICB2YXIgcHJvbWlzZSA9IHJlYWN0LlAgPSBuZXcgKFMgIT0gdW5kZWZpbmVkID8gUyA6IFApKGZ1bmN0aW9uKHJlcywgcmVqKXtcbiAgICAgICAgcmVhY3QucmVzID0gYXNzZXJ0RnVuY3Rpb24ocmVzKTtcbiAgICAgICAgcmVhY3QucmVqID0gYXNzZXJ0RnVuY3Rpb24ocmVqKTtcbiAgICAgIH0pO1xuICAgICAgdmFyIHJlY29yZCA9IHRoaXNbUkVDT1JEXTtcbiAgICAgIHJlY29yZC5jLnB1c2gocmVhY3QpO1xuICAgICAgaWYocmVjb3JkLmEpcmVjb3JkLmEucHVzaChyZWFjdCk7XG4gICAgICByZWNvcmQucyAmJiBub3RpZnkocmVjb3JkKTtcbiAgICAgIHJldHVybiBwcm9taXNlO1xuICAgIH0sXG4gICAgLy8gMjUuNC41LjEgUHJvbWlzZS5wcm90b3R5cGUuY2F0Y2gob25SZWplY3RlZClcbiAgICAnY2F0Y2gnOiBmdW5jdGlvbihvblJlamVjdGVkKXtcbiAgICAgIHJldHVybiB0aGlzLnRoZW4odW5kZWZpbmVkLCBvblJlamVjdGVkKTtcbiAgICB9XG4gIH0pO1xufVxuXG4vLyBleHBvcnRcbiRkZWYoJGRlZi5HICsgJGRlZi5XICsgJGRlZi5GICogIXVzZU5hdGl2ZSwge1Byb21pc2U6IFB9KTtcbmNvZi5zZXQoUCwgUFJPTUlTRSk7XG5zcGVjaWVzKFApO1xuc3BlY2llcygkLmNvcmVbUFJPTUlTRV0pOyAvLyBmb3Igd3JhcHBlclxuXG4vLyBzdGF0aWNzXG4kZGVmKCRkZWYuUyArICRkZWYuRiAqICF1c2VOYXRpdmUsIFBST01JU0UsIHtcbiAgLy8gMjUuNC40LjUgUHJvbWlzZS5yZWplY3QocilcbiAgcmVqZWN0OiBmdW5jdGlvbiByZWplY3Qocil7XG4gICAgcmV0dXJuIG5ldyAoZ2V0Q29uc3RydWN0b3IodGhpcykpKGZ1bmN0aW9uKHJlcywgcmVqKXtcbiAgICAgIHJlaihyKTtcbiAgICB9KTtcbiAgfSxcbiAgLy8gMjUuNC40LjYgUHJvbWlzZS5yZXNvbHZlKHgpXG4gIHJlc29sdmU6IGZ1bmN0aW9uIHJlc29sdmUoeCl7XG4gICAgcmV0dXJuIGlzT2JqZWN0KHgpICYmIFJFQ09SRCBpbiB4ICYmICQuZ2V0UHJvdG8oeCkgPT09IHRoaXMucHJvdG90eXBlXG4gICAgICA/IHggOiBuZXcgKGdldENvbnN0cnVjdG9yKHRoaXMpKShmdW5jdGlvbihyZXMpe1xuICAgICAgICByZXMoeCk7XG4gICAgICB9KTtcbiAgfVxufSk7XG4kZGVmKCRkZWYuUyArICRkZWYuRiAqICEodXNlTmF0aXZlICYmIHJlcXVpcmUoJy4vJC5pdGVyLWRldGVjdCcpKGZ1bmN0aW9uKGl0ZXIpe1xuICBQLmFsbChpdGVyKVsnY2F0Y2gnXShmdW5jdGlvbigpe30pO1xufSkpLCBQUk9NSVNFLCB7XG4gIC8vIDI1LjQuNC4xIFByb21pc2UuYWxsKGl0ZXJhYmxlKVxuICBhbGw6IGZ1bmN0aW9uIGFsbChpdGVyYWJsZSl7XG4gICAgdmFyIEMgICAgICA9IGdldENvbnN0cnVjdG9yKHRoaXMpXG4gICAgICAsIHZhbHVlcyA9IFtdO1xuICAgIHJldHVybiBuZXcgQyhmdW5jdGlvbihyZXMsIHJlail7XG4gICAgICBmb3JPZihpdGVyYWJsZSwgZmFsc2UsIHZhbHVlcy5wdXNoLCB2YWx1ZXMpO1xuICAgICAgdmFyIHJlbWFpbmluZyA9IHZhbHVlcy5sZW5ndGhcbiAgICAgICAgLCByZXN1bHRzICAgPSBBcnJheShyZW1haW5pbmcpO1xuICAgICAgaWYocmVtYWluaW5nKSQuZWFjaC5jYWxsKHZhbHVlcywgZnVuY3Rpb24ocHJvbWlzZSwgaW5kZXgpe1xuICAgICAgICBDLnJlc29sdmUocHJvbWlzZSkudGhlbihmdW5jdGlvbih2YWx1ZSl7XG4gICAgICAgICAgcmVzdWx0c1tpbmRleF0gPSB2YWx1ZTtcbiAgICAgICAgICAtLXJlbWFpbmluZyB8fCByZXMocmVzdWx0cyk7XG4gICAgICAgIH0sIHJlaik7XG4gICAgICB9KTtcbiAgICAgIGVsc2UgcmVzKHJlc3VsdHMpO1xuICAgIH0pO1xuICB9LFxuICAvLyAyNS40LjQuNCBQcm9taXNlLnJhY2UoaXRlcmFibGUpXG4gIHJhY2U6IGZ1bmN0aW9uIHJhY2UoaXRlcmFibGUpe1xuICAgIHZhciBDID0gZ2V0Q29uc3RydWN0b3IodGhpcyk7XG4gICAgcmV0dXJuIG5ldyBDKGZ1bmN0aW9uKHJlcywgcmVqKXtcbiAgICAgIGZvck9mKGl0ZXJhYmxlLCBmYWxzZSwgZnVuY3Rpb24ocHJvbWlzZSl7XG4gICAgICAgIEMucmVzb2x2ZShwcm9taXNlKS50aGVuKHJlcywgcmVqKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG59KTsiLCJ2YXIgJCAgICAgICAgID0gcmVxdWlyZSgnLi8kJylcbiAgLCAkZGVmICAgICAgPSByZXF1aXJlKCcuLyQuZGVmJylcbiAgLCBzZXRQcm90byAgPSByZXF1aXJlKCcuLyQuc2V0LXByb3RvJylcbiAgLCAkaXRlciAgICAgPSByZXF1aXJlKCcuLyQuaXRlcicpXG4gICwgSVRFUkFUT1IgID0gcmVxdWlyZSgnLi8kLndrcycpKCdpdGVyYXRvcicpXG4gICwgSVRFUiAgICAgID0gcmVxdWlyZSgnLi8kLnVpZCcpLnNhZmUoJ2l0ZXInKVxuICAsIHN0ZXAgICAgICA9ICRpdGVyLnN0ZXBcbiAgLCBhc3NlcnQgICAgPSByZXF1aXJlKCcuLyQuYXNzZXJ0JylcbiAgLCBpc09iamVjdCAgPSAkLmlzT2JqZWN0XG4gICwgZ2V0UHJvdG8gID0gJC5nZXRQcm90b1xuICAsICRSZWZsZWN0ICA9ICQuZy5SZWZsZWN0XG4gICwgX2FwcGx5ICAgID0gRnVuY3Rpb24uYXBwbHlcbiAgLCBhc3NlcnRPYmplY3QgPSBhc3NlcnQub2JqXG4gICwgX2lzRXh0ZW5zaWJsZSA9IE9iamVjdC5pc0V4dGVuc2libGUgfHwgaXNPYmplY3RcbiAgLCBfcHJldmVudEV4dGVuc2lvbnMgPSBPYmplY3QucHJldmVudEV4dGVuc2lvbnNcbiAgLy8gSUUgVFAgaGFzIGJyb2tlbiBSZWZsZWN0LmVudW1lcmF0ZVxuICAsIGJ1Z2d5RW51bWVyYXRlID0gISgkUmVmbGVjdCAmJiAkUmVmbGVjdC5lbnVtZXJhdGUgJiYgSVRFUkFUT1IgaW4gJFJlZmxlY3QuZW51bWVyYXRlKHt9KSk7XG5cbmZ1bmN0aW9uIEVudW1lcmF0ZShpdGVyYXRlZCl7XG4gICQuc2V0KHRoaXMsIElURVIsIHtvOiBpdGVyYXRlZCwgazogdW5kZWZpbmVkLCBpOiAwfSk7XG59XG4kaXRlci5jcmVhdGUoRW51bWVyYXRlLCAnT2JqZWN0JywgZnVuY3Rpb24oKXtcbiAgdmFyIGl0ZXIgPSB0aGlzW0lURVJdXG4gICAgLCBrZXlzID0gaXRlci5rXG4gICAgLCBrZXk7XG4gIGlmKGtleXMgPT0gdW5kZWZpbmVkKXtcbiAgICBpdGVyLmsgPSBrZXlzID0gW107XG4gICAgZm9yKGtleSBpbiBpdGVyLm8pa2V5cy5wdXNoKGtleSk7XG4gIH1cbiAgZG8ge1xuICAgIGlmKGl0ZXIuaSA+PSBrZXlzLmxlbmd0aClyZXR1cm4gc3RlcCgxKTtcbiAgfSB3aGlsZSghKChrZXkgPSBrZXlzW2l0ZXIuaSsrXSkgaW4gaXRlci5vKSk7XG4gIHJldHVybiBzdGVwKDAsIGtleSk7XG59KTtcblxudmFyIHJlZmxlY3QgPSB7XG4gIC8vIDI2LjEuMSBSZWZsZWN0LmFwcGx5KHRhcmdldCwgdGhpc0FyZ3VtZW50LCBhcmd1bWVudHNMaXN0KVxuICBhcHBseTogZnVuY3Rpb24gYXBwbHkodGFyZ2V0LCB0aGlzQXJndW1lbnQsIGFyZ3VtZW50c0xpc3Qpe1xuICAgIHJldHVybiBfYXBwbHkuY2FsbCh0YXJnZXQsIHRoaXNBcmd1bWVudCwgYXJndW1lbnRzTGlzdCk7XG4gIH0sXG4gIC8vIDI2LjEuMiBSZWZsZWN0LmNvbnN0cnVjdCh0YXJnZXQsIGFyZ3VtZW50c0xpc3QgWywgbmV3VGFyZ2V0XSlcbiAgY29uc3RydWN0OiBmdW5jdGlvbiBjb25zdHJ1Y3QodGFyZ2V0LCBhcmd1bWVudHNMaXN0IC8qLCBuZXdUYXJnZXQqLyl7XG4gICAgdmFyIHByb3RvICAgID0gYXNzZXJ0LmZuKGFyZ3VtZW50cy5sZW5ndGggPCAzID8gdGFyZ2V0IDogYXJndW1lbnRzWzJdKS5wcm90b3R5cGVcbiAgICAgICwgaW5zdGFuY2UgPSAkLmNyZWF0ZShpc09iamVjdChwcm90bykgPyBwcm90byA6IE9iamVjdC5wcm90b3R5cGUpXG4gICAgICAsIHJlc3VsdCAgID0gX2FwcGx5LmNhbGwodGFyZ2V0LCBpbnN0YW5jZSwgYXJndW1lbnRzTGlzdCk7XG4gICAgcmV0dXJuIGlzT2JqZWN0KHJlc3VsdCkgPyByZXN1bHQgOiBpbnN0YW5jZTtcbiAgfSxcbiAgLy8gMjYuMS4zIFJlZmxlY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBwcm9wZXJ0eUtleSwgYXR0cmlidXRlcylcbiAgZGVmaW5lUHJvcGVydHk6IGZ1bmN0aW9uIGRlZmluZVByb3BlcnR5KHRhcmdldCwgcHJvcGVydHlLZXksIGF0dHJpYnV0ZXMpe1xuICAgIGFzc2VydE9iamVjdCh0YXJnZXQpO1xuICAgIHRyeSB7XG4gICAgICAkLnNldERlc2ModGFyZ2V0LCBwcm9wZXJ0eUtleSwgYXR0cmlidXRlcyk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGNhdGNoKGUpe1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfSxcbiAgLy8gMjYuMS40IFJlZmxlY3QuZGVsZXRlUHJvcGVydHkodGFyZ2V0LCBwcm9wZXJ0eUtleSlcbiAgZGVsZXRlUHJvcGVydHk6IGZ1bmN0aW9uIGRlbGV0ZVByb3BlcnR5KHRhcmdldCwgcHJvcGVydHlLZXkpe1xuICAgIHZhciBkZXNjID0gJC5nZXREZXNjKGFzc2VydE9iamVjdCh0YXJnZXQpLCBwcm9wZXJ0eUtleSk7XG4gICAgcmV0dXJuIGRlc2MgJiYgIWRlc2MuY29uZmlndXJhYmxlID8gZmFsc2UgOiBkZWxldGUgdGFyZ2V0W3Byb3BlcnR5S2V5XTtcbiAgfSxcbiAgLy8gMjYuMS42IFJlZmxlY3QuZ2V0KHRhcmdldCwgcHJvcGVydHlLZXkgWywgcmVjZWl2ZXJdKVxuICBnZXQ6IGZ1bmN0aW9uIGdldCh0YXJnZXQsIHByb3BlcnR5S2V5LyosIHJlY2VpdmVyKi8pe1xuICAgIHZhciByZWNlaXZlciA9IGFyZ3VtZW50cy5sZW5ndGggPCAzID8gdGFyZ2V0IDogYXJndW1lbnRzWzJdXG4gICAgICAsIGRlc2MgPSAkLmdldERlc2MoYXNzZXJ0T2JqZWN0KHRhcmdldCksIHByb3BlcnR5S2V5KSwgcHJvdG87XG4gICAgaWYoZGVzYylyZXR1cm4gJC5oYXMoZGVzYywgJ3ZhbHVlJylcbiAgICAgID8gZGVzYy52YWx1ZVxuICAgICAgOiBkZXNjLmdldCA9PT0gdW5kZWZpbmVkXG4gICAgICAgID8gdW5kZWZpbmVkXG4gICAgICAgIDogZGVzYy5nZXQuY2FsbChyZWNlaXZlcik7XG4gICAgcmV0dXJuIGlzT2JqZWN0KHByb3RvID0gZ2V0UHJvdG8odGFyZ2V0KSlcbiAgICAgID8gZ2V0KHByb3RvLCBwcm9wZXJ0eUtleSwgcmVjZWl2ZXIpXG4gICAgICA6IHVuZGVmaW5lZDtcbiAgfSxcbiAgLy8gMjYuMS43IFJlZmxlY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwgcHJvcGVydHlLZXkpXG4gIGdldE93blByb3BlcnR5RGVzY3JpcHRvcjogZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwgcHJvcGVydHlLZXkpe1xuICAgIHJldHVybiAkLmdldERlc2MoYXNzZXJ0T2JqZWN0KHRhcmdldCksIHByb3BlcnR5S2V5KTtcbiAgfSxcbiAgLy8gMjYuMS44IFJlZmxlY3QuZ2V0UHJvdG90eXBlT2YodGFyZ2V0KVxuICBnZXRQcm90b3R5cGVPZjogZnVuY3Rpb24gZ2V0UHJvdG90eXBlT2YodGFyZ2V0KXtcbiAgICByZXR1cm4gZ2V0UHJvdG8oYXNzZXJ0T2JqZWN0KHRhcmdldCkpO1xuICB9LFxuICAvLyAyNi4xLjkgUmVmbGVjdC5oYXModGFyZ2V0LCBwcm9wZXJ0eUtleSlcbiAgaGFzOiBmdW5jdGlvbiBoYXModGFyZ2V0LCBwcm9wZXJ0eUtleSl7XG4gICAgcmV0dXJuIHByb3BlcnR5S2V5IGluIHRhcmdldDtcbiAgfSxcbiAgLy8gMjYuMS4xMCBSZWZsZWN0LmlzRXh0ZW5zaWJsZSh0YXJnZXQpXG4gIGlzRXh0ZW5zaWJsZTogZnVuY3Rpb24gaXNFeHRlbnNpYmxlKHRhcmdldCl7XG4gICAgcmV0dXJuIF9pc0V4dGVuc2libGUoYXNzZXJ0T2JqZWN0KHRhcmdldCkpO1xuICB9LFxuICAvLyAyNi4xLjExIFJlZmxlY3Qub3duS2V5cyh0YXJnZXQpXG4gIG93bktleXM6IHJlcXVpcmUoJy4vJC5vd24ta2V5cycpLFxuICAvLyAyNi4xLjEyIFJlZmxlY3QucHJldmVudEV4dGVuc2lvbnModGFyZ2V0KVxuICBwcmV2ZW50RXh0ZW5zaW9uczogZnVuY3Rpb24gcHJldmVudEV4dGVuc2lvbnModGFyZ2V0KXtcbiAgICBhc3NlcnRPYmplY3QodGFyZ2V0KTtcbiAgICB0cnkge1xuICAgICAgaWYoX3ByZXZlbnRFeHRlbnNpb25zKV9wcmV2ZW50RXh0ZW5zaW9ucyh0YXJnZXQpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBjYXRjaChlKXtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH0sXG4gIC8vIDI2LjEuMTMgUmVmbGVjdC5zZXQodGFyZ2V0LCBwcm9wZXJ0eUtleSwgViBbLCByZWNlaXZlcl0pXG4gIHNldDogZnVuY3Rpb24gc2V0KHRhcmdldCwgcHJvcGVydHlLZXksIFYvKiwgcmVjZWl2ZXIqLyl7XG4gICAgdmFyIHJlY2VpdmVyID0gYXJndW1lbnRzLmxlbmd0aCA8IDQgPyB0YXJnZXQgOiBhcmd1bWVudHNbM11cbiAgICAgICwgb3duRGVzYyAgPSAkLmdldERlc2MoYXNzZXJ0T2JqZWN0KHRhcmdldCksIHByb3BlcnR5S2V5KVxuICAgICAgLCBleGlzdGluZ0Rlc2NyaXB0b3IsIHByb3RvO1xuICAgIGlmKCFvd25EZXNjKXtcbiAgICAgIGlmKGlzT2JqZWN0KHByb3RvID0gZ2V0UHJvdG8odGFyZ2V0KSkpe1xuICAgICAgICByZXR1cm4gc2V0KHByb3RvLCBwcm9wZXJ0eUtleSwgViwgcmVjZWl2ZXIpO1xuICAgICAgfVxuICAgICAgb3duRGVzYyA9ICQuZGVzYygwKTtcbiAgICB9XG4gICAgaWYoJC5oYXMob3duRGVzYywgJ3ZhbHVlJykpe1xuICAgICAgaWYob3duRGVzYy53cml0YWJsZSA9PT0gZmFsc2UgfHwgIWlzT2JqZWN0KHJlY2VpdmVyKSlyZXR1cm4gZmFsc2U7XG4gICAgICBleGlzdGluZ0Rlc2NyaXB0b3IgPSAkLmdldERlc2MocmVjZWl2ZXIsIHByb3BlcnR5S2V5KSB8fCAkLmRlc2MoMCk7XG4gICAgICBleGlzdGluZ0Rlc2NyaXB0b3IudmFsdWUgPSBWO1xuICAgICAgJC5zZXREZXNjKHJlY2VpdmVyLCBwcm9wZXJ0eUtleSwgZXhpc3RpbmdEZXNjcmlwdG9yKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gb3duRGVzYy5zZXQgPT09IHVuZGVmaW5lZCA/IGZhbHNlIDogKG93bkRlc2Muc2V0LmNhbGwocmVjZWl2ZXIsIFYpLCB0cnVlKTtcbiAgfVxufTtcbi8vIDI2LjEuMTQgUmVmbGVjdC5zZXRQcm90b3R5cGVPZih0YXJnZXQsIHByb3RvKVxuaWYoc2V0UHJvdG8pcmVmbGVjdC5zZXRQcm90b3R5cGVPZiA9IGZ1bmN0aW9uIHNldFByb3RvdHlwZU9mKHRhcmdldCwgcHJvdG8pe1xuICBzZXRQcm90by5jaGVjayh0YXJnZXQsIHByb3RvKTtcbiAgdHJ5IHtcbiAgICBzZXRQcm90by5zZXQodGFyZ2V0LCBwcm90byk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gY2F0Y2goZSl7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59O1xuXG4kZGVmKCRkZWYuRywge1JlZmxlY3Q6IHt9fSk7XG5cbiRkZWYoJGRlZi5TICsgJGRlZi5GICogYnVnZ3lFbnVtZXJhdGUsICdSZWZsZWN0Jywge1xuICAvLyAyNi4xLjUgUmVmbGVjdC5lbnVtZXJhdGUodGFyZ2V0KVxuICBlbnVtZXJhdGU6IGZ1bmN0aW9uIGVudW1lcmF0ZSh0YXJnZXQpe1xuICAgIHJldHVybiBuZXcgRW51bWVyYXRlKGFzc2VydE9iamVjdCh0YXJnZXQpKTtcbiAgfVxufSk7XG5cbiRkZWYoJGRlZi5TLCAnUmVmbGVjdCcsIHJlZmxlY3QpOyIsInZhciAkICAgICAgID0gcmVxdWlyZSgnLi8kJylcbiAgLCBjb2YgICAgID0gcmVxdWlyZSgnLi8kLmNvZicpXG4gICwgJFJlZ0V4cCA9ICQuZy5SZWdFeHBcbiAgLCBCYXNlICAgID0gJFJlZ0V4cFxuICAsIHByb3RvICAgPSAkUmVnRXhwLnByb3RvdHlwZVxuICAsIHJlICAgICAgPSAvYS9nXG4gIC8vIFwibmV3XCIgY3JlYXRlcyBhIG5ldyBvYmplY3RcbiAgLCBDT1JSRUNUX05FVyA9IG5ldyAkUmVnRXhwKHJlKSAhPT0gcmVcbiAgLy8gUmVnRXhwIGFsbG93cyBhIHJlZ2V4IHdpdGggZmxhZ3MgYXMgdGhlIHBhdHRlcm5cbiAgLCBBTExPV1NfUkVfV0lUSF9GTEFHUyA9IGZ1bmN0aW9uKCl7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiAkUmVnRXhwKHJlLCAnaScpID09ICcvYS9pJztcbiAgICB9IGNhdGNoKGUpeyAvKiBlbXB0eSAqLyB9XG4gIH0oKTtcbmlmKCQuRlcgJiYgJC5ERVNDKXtcbiAgaWYoIUNPUlJFQ1RfTkVXIHx8ICFBTExPV1NfUkVfV0lUSF9GTEFHUyl7XG4gICAgJFJlZ0V4cCA9IGZ1bmN0aW9uIFJlZ0V4cChwYXR0ZXJuLCBmbGFncyl7XG4gICAgICB2YXIgcGF0dGVybklzUmVnRXhwICA9IGNvZihwYXR0ZXJuKSA9PSAnUmVnRXhwJ1xuICAgICAgICAsIGZsYWdzSXNVbmRlZmluZWQgPSBmbGFncyA9PT0gdW5kZWZpbmVkO1xuICAgICAgaWYoISh0aGlzIGluc3RhbmNlb2YgJFJlZ0V4cCkgJiYgcGF0dGVybklzUmVnRXhwICYmIGZsYWdzSXNVbmRlZmluZWQpcmV0dXJuIHBhdHRlcm47XG4gICAgICByZXR1cm4gQ09SUkVDVF9ORVdcbiAgICAgICAgPyBuZXcgQmFzZShwYXR0ZXJuSXNSZWdFeHAgJiYgIWZsYWdzSXNVbmRlZmluZWQgPyBwYXR0ZXJuLnNvdXJjZSA6IHBhdHRlcm4sIGZsYWdzKVxuICAgICAgICA6IG5ldyBCYXNlKHBhdHRlcm5Jc1JlZ0V4cCA/IHBhdHRlcm4uc291cmNlIDogcGF0dGVyblxuICAgICAgICAgICwgcGF0dGVybklzUmVnRXhwICYmIGZsYWdzSXNVbmRlZmluZWQgPyBwYXR0ZXJuLmZsYWdzIDogZmxhZ3MpO1xuICAgIH07XG4gICAgJC5lYWNoLmNhbGwoJC5nZXROYW1lcyhCYXNlKSwgZnVuY3Rpb24oa2V5KXtcbiAgICAgIGtleSBpbiAkUmVnRXhwIHx8ICQuc2V0RGVzYygkUmVnRXhwLCBrZXksIHtcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICBnZXQ6IGZ1bmN0aW9uKCl7IHJldHVybiBCYXNlW2tleV07IH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24oaXQpeyBCYXNlW2tleV0gPSBpdDsgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gICAgcHJvdG8uY29uc3RydWN0b3IgPSAkUmVnRXhwO1xuICAgICRSZWdFeHAucHJvdG90eXBlID0gcHJvdG87XG4gICAgcmVxdWlyZSgnLi8kLnJlZGVmJykoJC5nLCAnUmVnRXhwJywgJFJlZ0V4cCk7XG4gIH1cbiAgLy8gMjEuMi41LjMgZ2V0IFJlZ0V4cC5wcm90b3R5cGUuZmxhZ3MoKVxuICBpZigvLi9nLmZsYWdzICE9ICdnJykkLnNldERlc2MocHJvdG8sICdmbGFncycsIHtcbiAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgZ2V0OiByZXF1aXJlKCcuLyQucmVwbGFjZXInKSgvXi4qXFwvKFxcdyopJC8sICckMScpXG4gIH0pO1xufVxucmVxdWlyZSgnLi8kLnNwZWNpZXMnKSgkUmVnRXhwKTsiLCIndXNlIHN0cmljdCc7XG52YXIgc3Ryb25nID0gcmVxdWlyZSgnLi8kLmNvbGxlY3Rpb24tc3Ryb25nJyk7XG5cbi8vIDIzLjIgU2V0IE9iamVjdHNcbnJlcXVpcmUoJy4vJC5jb2xsZWN0aW9uJykoJ1NldCcsIHtcbiAgLy8gMjMuMi4zLjEgU2V0LnByb3RvdHlwZS5hZGQodmFsdWUpXG4gIGFkZDogZnVuY3Rpb24gYWRkKHZhbHVlKXtcbiAgICByZXR1cm4gc3Ryb25nLmRlZih0aGlzLCB2YWx1ZSA9IHZhbHVlID09PSAwID8gMCA6IHZhbHVlLCB2YWx1ZSk7XG4gIH1cbn0sIHN0cm9uZyk7IiwiJ3VzZSBzdHJpY3QnO1xudmFyICRkZWYgPSByZXF1aXJlKCcuLyQuZGVmJylcbiAgLCAkYXQgID0gcmVxdWlyZSgnLi8kLnN0cmluZy1hdCcpKGZhbHNlKTtcbiRkZWYoJGRlZi5QLCAnU3RyaW5nJywge1xuICAvLyAyMS4xLjMuMyBTdHJpbmcucHJvdG90eXBlLmNvZGVQb2ludEF0KHBvcylcbiAgY29kZVBvaW50QXQ6IGZ1bmN0aW9uIGNvZGVQb2ludEF0KHBvcyl7XG4gICAgcmV0dXJuICRhdCh0aGlzLCBwb3MpO1xuICB9XG59KTsiLCIndXNlIHN0cmljdCc7XG52YXIgJCAgICA9IHJlcXVpcmUoJy4vJCcpXG4gICwgY29mICA9IHJlcXVpcmUoJy4vJC5jb2YnKVxuICAsICRkZWYgPSByZXF1aXJlKCcuLyQuZGVmJylcbiAgLCB0b0xlbmd0aCA9ICQudG9MZW5ndGg7XG5cbi8vIHNob3VsZCB0aHJvdyBlcnJvciBvbiByZWdleFxuJGRlZigkZGVmLlAgKyAkZGVmLkYgKiAhcmVxdWlyZSgnLi8kLnRocm93cycpKGZ1bmN0aW9uKCl7ICdxJy5lbmRzV2l0aCgvLi8pOyB9KSwgJ1N0cmluZycsIHtcbiAgLy8gMjEuMS4zLjYgU3RyaW5nLnByb3RvdHlwZS5lbmRzV2l0aChzZWFyY2hTdHJpbmcgWywgZW5kUG9zaXRpb25dKVxuICBlbmRzV2l0aDogZnVuY3Rpb24gZW5kc1dpdGgoc2VhcmNoU3RyaW5nIC8qLCBlbmRQb3NpdGlvbiA9IEBsZW5ndGggKi8pe1xuICAgIGlmKGNvZihzZWFyY2hTdHJpbmcpID09ICdSZWdFeHAnKXRocm93IFR5cGVFcnJvcigpO1xuICAgIHZhciB0aGF0ID0gU3RyaW5nKCQuYXNzZXJ0RGVmaW5lZCh0aGlzKSlcbiAgICAgICwgZW5kUG9zaXRpb24gPSBhcmd1bWVudHNbMV1cbiAgICAgICwgbGVuID0gdG9MZW5ndGgodGhhdC5sZW5ndGgpXG4gICAgICAsIGVuZCA9IGVuZFBvc2l0aW9uID09PSB1bmRlZmluZWQgPyBsZW4gOiBNYXRoLm1pbih0b0xlbmd0aChlbmRQb3NpdGlvbiksIGxlbik7XG4gICAgc2VhcmNoU3RyaW5nICs9ICcnO1xuICAgIHJldHVybiB0aGF0LnNsaWNlKGVuZCAtIHNlYXJjaFN0cmluZy5sZW5ndGgsIGVuZCkgPT09IHNlYXJjaFN0cmluZztcbiAgfVxufSk7IiwidmFyICRkZWYgICAgPSByZXF1aXJlKCcuLyQuZGVmJylcbiAgLCB0b0luZGV4ID0gcmVxdWlyZSgnLi8kJykudG9JbmRleFxuICAsIGZyb21DaGFyQ29kZSA9IFN0cmluZy5mcm9tQ2hhckNvZGVcbiAgLCAkZnJvbUNvZGVQb2ludCA9IFN0cmluZy5mcm9tQ29kZVBvaW50O1xuXG4vLyBsZW5ndGggc2hvdWxkIGJlIDEsIG9sZCBGRiBwcm9ibGVtXG4kZGVmKCRkZWYuUyArICRkZWYuRiAqICghISRmcm9tQ29kZVBvaW50ICYmICRmcm9tQ29kZVBvaW50Lmxlbmd0aCAhPSAxKSwgJ1N0cmluZycsIHtcbiAgLy8gMjEuMS4yLjIgU3RyaW5nLmZyb21Db2RlUG9pbnQoLi4uY29kZVBvaW50cylcbiAgZnJvbUNvZGVQb2ludDogZnVuY3Rpb24gZnJvbUNvZGVQb2ludCh4KXsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuICAgIHZhciByZXMgPSBbXVxuICAgICAgLCBsZW4gPSBhcmd1bWVudHMubGVuZ3RoXG4gICAgICAsIGkgICA9IDBcbiAgICAgICwgY29kZTtcbiAgICB3aGlsZShsZW4gPiBpKXtcbiAgICAgIGNvZGUgPSArYXJndW1lbnRzW2krK107XG4gICAgICBpZih0b0luZGV4KGNvZGUsIDB4MTBmZmZmKSAhPT0gY29kZSl0aHJvdyBSYW5nZUVycm9yKGNvZGUgKyAnIGlzIG5vdCBhIHZhbGlkIGNvZGUgcG9pbnQnKTtcbiAgICAgIHJlcy5wdXNoKGNvZGUgPCAweDEwMDAwXG4gICAgICAgID8gZnJvbUNoYXJDb2RlKGNvZGUpXG4gICAgICAgIDogZnJvbUNoYXJDb2RlKCgoY29kZSAtPSAweDEwMDAwKSA+PiAxMCkgKyAweGQ4MDAsIGNvZGUgJSAweDQwMCArIDB4ZGMwMClcbiAgICAgICk7XG4gICAgfSByZXR1cm4gcmVzLmpvaW4oJycpO1xuICB9XG59KTsiLCIndXNlIHN0cmljdCc7XG52YXIgJCAgICA9IHJlcXVpcmUoJy4vJCcpXG4gICwgY29mICA9IHJlcXVpcmUoJy4vJC5jb2YnKVxuICAsICRkZWYgPSByZXF1aXJlKCcuLyQuZGVmJyk7XG5cbiRkZWYoJGRlZi5QLCAnU3RyaW5nJywge1xuICAvLyAyMS4xLjMuNyBTdHJpbmcucHJvdG90eXBlLmluY2x1ZGVzKHNlYXJjaFN0cmluZywgcG9zaXRpb24gPSAwKVxuICBpbmNsdWRlczogZnVuY3Rpb24gaW5jbHVkZXMoc2VhcmNoU3RyaW5nIC8qLCBwb3NpdGlvbiA9IDAgKi8pe1xuICAgIGlmKGNvZihzZWFyY2hTdHJpbmcpID09ICdSZWdFeHAnKXRocm93IFR5cGVFcnJvcigpO1xuICAgIHJldHVybiAhIX5TdHJpbmcoJC5hc3NlcnREZWZpbmVkKHRoaXMpKS5pbmRleE9mKHNlYXJjaFN0cmluZywgYXJndW1lbnRzWzFdKTtcbiAgfVxufSk7IiwidmFyIHNldCAgID0gcmVxdWlyZSgnLi8kJykuc2V0XG4gICwgJGF0ICAgPSByZXF1aXJlKCcuLyQuc3RyaW5nLWF0JykodHJ1ZSlcbiAgLCBJVEVSICA9IHJlcXVpcmUoJy4vJC51aWQnKS5zYWZlKCdpdGVyJylcbiAgLCAkaXRlciA9IHJlcXVpcmUoJy4vJC5pdGVyJylcbiAgLCBzdGVwICA9ICRpdGVyLnN0ZXA7XG5cbi8vIDIxLjEuMy4yNyBTdHJpbmcucHJvdG90eXBlW0BAaXRlcmF0b3JdKClcbnJlcXVpcmUoJy4vJC5pdGVyLWRlZmluZScpKFN0cmluZywgJ1N0cmluZycsIGZ1bmN0aW9uKGl0ZXJhdGVkKXtcbiAgc2V0KHRoaXMsIElURVIsIHtvOiBTdHJpbmcoaXRlcmF0ZWQpLCBpOiAwfSk7XG4vLyAyMS4xLjUuMi4xICVTdHJpbmdJdGVyYXRvclByb3RvdHlwZSUubmV4dCgpXG59LCBmdW5jdGlvbigpe1xuICB2YXIgaXRlciAgPSB0aGlzW0lURVJdXG4gICAgLCBPICAgICA9IGl0ZXIub1xuICAgICwgaW5kZXggPSBpdGVyLmlcbiAgICAsIHBvaW50O1xuICBpZihpbmRleCA+PSBPLmxlbmd0aClyZXR1cm4gc3RlcCgxKTtcbiAgcG9pbnQgPSAkYXQoTywgaW5kZXgpO1xuICBpdGVyLmkgKz0gcG9pbnQubGVuZ3RoO1xuICByZXR1cm4gc3RlcCgwLCBwb2ludCk7XG59KTsiLCJ2YXIgJCAgICA9IHJlcXVpcmUoJy4vJCcpXG4gICwgJGRlZiA9IHJlcXVpcmUoJy4vJC5kZWYnKTtcblxuJGRlZigkZGVmLlMsICdTdHJpbmcnLCB7XG4gIC8vIDIxLjEuMi40IFN0cmluZy5yYXcoY2FsbFNpdGUsIC4uLnN1YnN0aXR1dGlvbnMpXG4gIHJhdzogZnVuY3Rpb24gcmF3KGNhbGxTaXRlKXtcbiAgICB2YXIgdHBsID0gJC50b09iamVjdChjYWxsU2l0ZS5yYXcpXG4gICAgICAsIGxlbiA9ICQudG9MZW5ndGgodHBsLmxlbmd0aClcbiAgICAgICwgc2xuID0gYXJndW1lbnRzLmxlbmd0aFxuICAgICAgLCByZXMgPSBbXVxuICAgICAgLCBpICAgPSAwO1xuICAgIHdoaWxlKGxlbiA+IGkpe1xuICAgICAgcmVzLnB1c2goU3RyaW5nKHRwbFtpKytdKSk7XG4gICAgICBpZihpIDwgc2xuKXJlcy5wdXNoKFN0cmluZyhhcmd1bWVudHNbaV0pKTtcbiAgICB9IHJldHVybiByZXMuam9pbignJyk7XG4gIH1cbn0pOyIsInZhciAkZGVmID0gcmVxdWlyZSgnLi8kLmRlZicpO1xuXG4kZGVmKCRkZWYuUCwgJ1N0cmluZycsIHtcbiAgLy8gMjEuMS4zLjEzIFN0cmluZy5wcm90b3R5cGUucmVwZWF0KGNvdW50KVxuICByZXBlYXQ6IHJlcXVpcmUoJy4vJC5zdHJpbmctcmVwZWF0Jylcbn0pOyIsIid1c2Ugc3RyaWN0JztcbnZhciAkICAgID0gcmVxdWlyZSgnLi8kJylcbiAgLCBjb2YgID0gcmVxdWlyZSgnLi8kLmNvZicpXG4gICwgJGRlZiA9IHJlcXVpcmUoJy4vJC5kZWYnKTtcblxuLy8gc2hvdWxkIHRocm93IGVycm9yIG9uIHJlZ2V4XG4kZGVmKCRkZWYuUCArICRkZWYuRiAqICFyZXF1aXJlKCcuLyQudGhyb3dzJykoZnVuY3Rpb24oKXsgJ3EnLnN0YXJ0c1dpdGgoLy4vKTsgfSksICdTdHJpbmcnLCB7XG4gIC8vIDIxLjEuMy4xOCBTdHJpbmcucHJvdG90eXBlLnN0YXJ0c1dpdGgoc2VhcmNoU3RyaW5nIFssIHBvc2l0aW9uIF0pXG4gIHN0YXJ0c1dpdGg6IGZ1bmN0aW9uIHN0YXJ0c1dpdGgoc2VhcmNoU3RyaW5nIC8qLCBwb3NpdGlvbiA9IDAgKi8pe1xuICAgIGlmKGNvZihzZWFyY2hTdHJpbmcpID09ICdSZWdFeHAnKXRocm93IFR5cGVFcnJvcigpO1xuICAgIHZhciB0aGF0ICA9IFN0cmluZygkLmFzc2VydERlZmluZWQodGhpcykpXG4gICAgICAsIGluZGV4ID0gJC50b0xlbmd0aChNYXRoLm1pbihhcmd1bWVudHNbMV0sIHRoYXQubGVuZ3RoKSk7XG4gICAgc2VhcmNoU3RyaW5nICs9ICcnO1xuICAgIHJldHVybiB0aGF0LnNsaWNlKGluZGV4LCBpbmRleCArIHNlYXJjaFN0cmluZy5sZW5ndGgpID09PSBzZWFyY2hTdHJpbmc7XG4gIH1cbn0pOyIsIid1c2Ugc3RyaWN0Jztcbi8vIEVDTUFTY3JpcHQgNiBzeW1ib2xzIHNoaW1cbnZhciAkICAgICAgICA9IHJlcXVpcmUoJy4vJCcpXG4gICwgc2V0VGFnICAgPSByZXF1aXJlKCcuLyQuY29mJykuc2V0XG4gICwgdWlkICAgICAgPSByZXF1aXJlKCcuLyQudWlkJylcbiAgLCBzaGFyZWQgICA9IHJlcXVpcmUoJy4vJC5zaGFyZWQnKVxuICAsICRkZWYgICAgID0gcmVxdWlyZSgnLi8kLmRlZicpXG4gICwgJHJlZGVmICAgPSByZXF1aXJlKCcuLyQucmVkZWYnKVxuICAsIGtleU9mICAgID0gcmVxdWlyZSgnLi8kLmtleW9mJylcbiAgLCBlbnVtS2V5cyA9IHJlcXVpcmUoJy4vJC5lbnVtLWtleXMnKVxuICAsIGFzc2VydE9iamVjdCA9IHJlcXVpcmUoJy4vJC5hc3NlcnQnKS5vYmpcbiAgLCBPYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGVcbiAgLCBERVNDICAgICA9ICQuREVTQ1xuICAsIGhhcyAgICAgID0gJC5oYXNcbiAgLCAkY3JlYXRlICA9ICQuY3JlYXRlXG4gICwgZ2V0RGVzYyAgPSAkLmdldERlc2NcbiAgLCBzZXREZXNjICA9ICQuc2V0RGVzY1xuICAsIGRlc2MgICAgID0gJC5kZXNjXG4gICwgZ2V0TmFtZXMgPSAkLmdldE5hbWVzXG4gICwgdG9PYmplY3QgPSAkLnRvT2JqZWN0XG4gICwgJFN5bWJvbCAgPSAkLmcuU3ltYm9sXG4gICwgc2V0dGVyICAgPSBmYWxzZVxuICAsIFRBRyAgICAgID0gdWlkKCd0YWcnKVxuICAsIEhJRERFTiAgID0gdWlkKCdoaWRkZW4nKVxuICAsIF9wcm9wZXJ0eUlzRW51bWVyYWJsZSA9IHt9LnByb3BlcnR5SXNFbnVtZXJhYmxlXG4gICwgU3ltYm9sUmVnaXN0cnkgPSBzaGFyZWQoJ3N5bWJvbC1yZWdpc3RyeScpXG4gICwgQWxsU3ltYm9scyA9IHNoYXJlZCgnc3ltYm9scycpXG4gICwgdXNlTmF0aXZlID0gJC5pc0Z1bmN0aW9uKCRTeW1ib2wpO1xuXG52YXIgc2V0U3ltYm9sRGVzYyA9IERFU0MgPyBmdW5jdGlvbigpeyAvLyBmYWxsYmFjayBmb3Igb2xkIEFuZHJvaWRcbiAgdHJ5IHtcbiAgICByZXR1cm4gJGNyZWF0ZShzZXREZXNjKHt9LCBISURERU4sIHtcbiAgICAgIGdldDogZnVuY3Rpb24oKXtcbiAgICAgICAgcmV0dXJuIHNldERlc2ModGhpcywgSElEREVOLCB7dmFsdWU6IGZhbHNlfSlbSElEREVOXTtcbiAgICAgIH1cbiAgICB9KSlbSElEREVOXSB8fCBzZXREZXNjO1xuICB9IGNhdGNoKGUpe1xuICAgIHJldHVybiBmdW5jdGlvbihpdCwga2V5LCBEKXtcbiAgICAgIHZhciBwcm90b0Rlc2MgPSBnZXREZXNjKE9iamVjdFByb3RvLCBrZXkpO1xuICAgICAgaWYocHJvdG9EZXNjKWRlbGV0ZSBPYmplY3RQcm90b1trZXldO1xuICAgICAgc2V0RGVzYyhpdCwga2V5LCBEKTtcbiAgICAgIGlmKHByb3RvRGVzYyAmJiBpdCAhPT0gT2JqZWN0UHJvdG8pc2V0RGVzYyhPYmplY3RQcm90bywga2V5LCBwcm90b0Rlc2MpO1xuICAgIH07XG4gIH1cbn0oKSA6IHNldERlc2M7XG5cbmZ1bmN0aW9uIHdyYXAodGFnKXtcbiAgdmFyIHN5bSA9IEFsbFN5bWJvbHNbdGFnXSA9ICQuc2V0KCRjcmVhdGUoJFN5bWJvbC5wcm90b3R5cGUpLCBUQUcsIHRhZyk7XG4gIERFU0MgJiYgc2V0dGVyICYmIHNldFN5bWJvbERlc2MoT2JqZWN0UHJvdG8sIHRhZywge1xuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKXtcbiAgICAgIGlmKGhhcyh0aGlzLCBISURERU4pICYmIGhhcyh0aGlzW0hJRERFTl0sIHRhZykpdGhpc1tISURERU5dW3RhZ10gPSBmYWxzZTtcbiAgICAgIHNldFN5bWJvbERlc2ModGhpcywgdGFnLCBkZXNjKDEsIHZhbHVlKSk7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIHN5bTtcbn1cblxuZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoaXQsIGtleSwgRCl7XG4gIGlmKEQgJiYgaGFzKEFsbFN5bWJvbHMsIGtleSkpe1xuICAgIGlmKCFELmVudW1lcmFibGUpe1xuICAgICAgaWYoIWhhcyhpdCwgSElEREVOKSlzZXREZXNjKGl0LCBISURERU4sIGRlc2MoMSwge30pKTtcbiAgICAgIGl0W0hJRERFTl1ba2V5XSA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmKGhhcyhpdCwgSElEREVOKSAmJiBpdFtISURERU5dW2tleV0paXRbSElEREVOXVtrZXldID0gZmFsc2U7XG4gICAgICBEID0gJGNyZWF0ZShELCB7ZW51bWVyYWJsZTogZGVzYygwLCBmYWxzZSl9KTtcbiAgICB9IHJldHVybiBzZXRTeW1ib2xEZXNjKGl0LCBrZXksIEQpO1xuICB9IHJldHVybiBzZXREZXNjKGl0LCBrZXksIEQpO1xufVxuZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyhpdCwgUCl7XG4gIGFzc2VydE9iamVjdChpdCk7XG4gIHZhciBrZXlzID0gZW51bUtleXMoUCA9IHRvT2JqZWN0KFApKVxuICAgICwgaSAgICA9IDBcbiAgICAsIGwgPSBrZXlzLmxlbmd0aFxuICAgICwga2V5O1xuICB3aGlsZShsID4gaSlkZWZpbmVQcm9wZXJ0eShpdCwga2V5ID0ga2V5c1tpKytdLCBQW2tleV0pO1xuICByZXR1cm4gaXQ7XG59XG5mdW5jdGlvbiBjcmVhdGUoaXQsIFApe1xuICByZXR1cm4gUCA9PT0gdW5kZWZpbmVkID8gJGNyZWF0ZShpdCkgOiBkZWZpbmVQcm9wZXJ0aWVzKCRjcmVhdGUoaXQpLCBQKTtcbn1cbmZ1bmN0aW9uIHByb3BlcnR5SXNFbnVtZXJhYmxlKGtleSl7XG4gIHZhciBFID0gX3Byb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwodGhpcywga2V5KTtcbiAgcmV0dXJuIEUgfHwgIWhhcyh0aGlzLCBrZXkpIHx8ICFoYXMoQWxsU3ltYm9scywga2V5KSB8fCBoYXModGhpcywgSElEREVOKSAmJiB0aGlzW0hJRERFTl1ba2V5XVxuICAgID8gRSA6IHRydWU7XG59XG5mdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoaXQsIGtleSl7XG4gIHZhciBEID0gZ2V0RGVzYyhpdCA9IHRvT2JqZWN0KGl0KSwga2V5KTtcbiAgaWYoRCAmJiBoYXMoQWxsU3ltYm9scywga2V5KSAmJiAhKGhhcyhpdCwgSElEREVOKSAmJiBpdFtISURERU5dW2tleV0pKUQuZW51bWVyYWJsZSA9IHRydWU7XG4gIHJldHVybiBEO1xufVxuZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlOYW1lcyhpdCl7XG4gIHZhciBuYW1lcyAgPSBnZXROYW1lcyh0b09iamVjdChpdCkpXG4gICAgLCByZXN1bHQgPSBbXVxuICAgICwgaSAgICAgID0gMFxuICAgICwga2V5O1xuICB3aGlsZShuYW1lcy5sZW5ndGggPiBpKWlmKCFoYXMoQWxsU3ltYm9scywga2V5ID0gbmFtZXNbaSsrXSkgJiYga2V5ICE9IEhJRERFTilyZXN1bHQucHVzaChrZXkpO1xuICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlTeW1ib2xzKGl0KXtcbiAgdmFyIG5hbWVzICA9IGdldE5hbWVzKHRvT2JqZWN0KGl0KSlcbiAgICAsIHJlc3VsdCA9IFtdXG4gICAgLCBpICAgICAgPSAwXG4gICAgLCBrZXk7XG4gIHdoaWxlKG5hbWVzLmxlbmd0aCA+IGkpaWYoaGFzKEFsbFN5bWJvbHMsIGtleSA9IG5hbWVzW2krK10pKXJlc3VsdC5wdXNoKEFsbFN5bWJvbHNba2V5XSk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8vIDE5LjQuMS4xIFN5bWJvbChbZGVzY3JpcHRpb25dKVxuaWYoIXVzZU5hdGl2ZSl7XG4gICRTeW1ib2wgPSBmdW5jdGlvbiBTeW1ib2woKXtcbiAgICBpZih0aGlzIGluc3RhbmNlb2YgJFN5bWJvbCl0aHJvdyBUeXBlRXJyb3IoJ1N5bWJvbCBpcyBub3QgYSBjb25zdHJ1Y3RvcicpO1xuICAgIHJldHVybiB3cmFwKHVpZChhcmd1bWVudHNbMF0pKTtcbiAgfTtcbiAgJHJlZGVmKCRTeW1ib2wucHJvdG90eXBlLCAndG9TdHJpbmcnLCBmdW5jdGlvbigpe1xuICAgIHJldHVybiB0aGlzW1RBR107XG4gIH0pO1xuXG4gICQuY3JlYXRlICAgICA9IGNyZWF0ZTtcbiAgJC5zZXREZXNjICAgID0gZGVmaW5lUHJvcGVydHk7XG4gICQuZ2V0RGVzYyAgICA9IGdldE93blByb3BlcnR5RGVzY3JpcHRvcjtcbiAgJC5zZXREZXNjcyAgID0gZGVmaW5lUHJvcGVydGllcztcbiAgJC5nZXROYW1lcyAgID0gZ2V0T3duUHJvcGVydHlOYW1lcztcbiAgJC5nZXRTeW1ib2xzID0gZ2V0T3duUHJvcGVydHlTeW1ib2xzO1xuXG4gIGlmKCQuREVTQyAmJiAkLkZXKSRyZWRlZihPYmplY3QucHJvdG90eXBlLCAncHJvcGVydHlJc0VudW1lcmFibGUnLCBwcm9wZXJ0eUlzRW51bWVyYWJsZSwgdHJ1ZSk7XG59XG5cbnZhciBzeW1ib2xTdGF0aWNzID0ge1xuICAvLyAxOS40LjIuMSBTeW1ib2wuZm9yKGtleSlcbiAgJ2Zvcic6IGZ1bmN0aW9uKGtleSl7XG4gICAgcmV0dXJuIGhhcyhTeW1ib2xSZWdpc3RyeSwga2V5ICs9ICcnKVxuICAgICAgPyBTeW1ib2xSZWdpc3RyeVtrZXldXG4gICAgICA6IFN5bWJvbFJlZ2lzdHJ5W2tleV0gPSAkU3ltYm9sKGtleSk7XG4gIH0sXG4gIC8vIDE5LjQuMi41IFN5bWJvbC5rZXlGb3Ioc3ltKVxuICBrZXlGb3I6IGZ1bmN0aW9uIGtleUZvcihrZXkpe1xuICAgIHJldHVybiBrZXlPZihTeW1ib2xSZWdpc3RyeSwga2V5KTtcbiAgfSxcbiAgdXNlU2V0dGVyOiBmdW5jdGlvbigpeyBzZXR0ZXIgPSB0cnVlOyB9LFxuICB1c2VTaW1wbGU6IGZ1bmN0aW9uKCl7IHNldHRlciA9IGZhbHNlOyB9XG59O1xuLy8gMTkuNC4yLjIgU3ltYm9sLmhhc0luc3RhbmNlXG4vLyAxOS40LjIuMyBTeW1ib2wuaXNDb25jYXRTcHJlYWRhYmxlXG4vLyAxOS40LjIuNCBTeW1ib2wuaXRlcmF0b3Jcbi8vIDE5LjQuMi42IFN5bWJvbC5tYXRjaFxuLy8gMTkuNC4yLjggU3ltYm9sLnJlcGxhY2Vcbi8vIDE5LjQuMi45IFN5bWJvbC5zZWFyY2hcbi8vIDE5LjQuMi4xMCBTeW1ib2wuc3BlY2llc1xuLy8gMTkuNC4yLjExIFN5bWJvbC5zcGxpdFxuLy8gMTkuNC4yLjEyIFN5bWJvbC50b1ByaW1pdGl2ZVxuLy8gMTkuNC4yLjEzIFN5bWJvbC50b1N0cmluZ1RhZ1xuLy8gMTkuNC4yLjE0IFN5bWJvbC51bnNjb3BhYmxlc1xuJC5lYWNoLmNhbGwoKFxuICAgICdoYXNJbnN0YW5jZSxpc0NvbmNhdFNwcmVhZGFibGUsaXRlcmF0b3IsbWF0Y2gscmVwbGFjZSxzZWFyY2gsJyArXG4gICAgJ3NwZWNpZXMsc3BsaXQsdG9QcmltaXRpdmUsdG9TdHJpbmdUYWcsdW5zY29wYWJsZXMnXG4gICkuc3BsaXQoJywnKSwgZnVuY3Rpb24oaXQpe1xuICAgIHZhciBzeW0gPSByZXF1aXJlKCcuLyQud2tzJykoaXQpO1xuICAgIHN5bWJvbFN0YXRpY3NbaXRdID0gdXNlTmF0aXZlID8gc3ltIDogd3JhcChzeW0pO1xuICB9XG4pO1xuXG5zZXR0ZXIgPSB0cnVlO1xuXG4kZGVmKCRkZWYuRyArICRkZWYuVywge1N5bWJvbDogJFN5bWJvbH0pO1xuXG4kZGVmKCRkZWYuUywgJ1N5bWJvbCcsIHN5bWJvbFN0YXRpY3MpO1xuXG4kZGVmKCRkZWYuUyArICRkZWYuRiAqICF1c2VOYXRpdmUsICdPYmplY3QnLCB7XG4gIC8vIDE5LjEuMi4yIE9iamVjdC5jcmVhdGUoTyBbLCBQcm9wZXJ0aWVzXSlcbiAgY3JlYXRlOiBjcmVhdGUsXG4gIC8vIDE5LjEuMi40IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKVxuICBkZWZpbmVQcm9wZXJ0eTogZGVmaW5lUHJvcGVydHksXG4gIC8vIDE5LjEuMi4zIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKE8sIFByb3BlcnRpZXMpXG4gIGRlZmluZVByb3BlcnRpZXM6IGRlZmluZVByb3BlcnRpZXMsXG4gIC8vIDE5LjEuMi42IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoTywgUClcbiAgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yOiBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IsXG4gIC8vIDE5LjEuMi43IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKE8pXG4gIGdldE93blByb3BlcnR5TmFtZXM6IGdldE93blByb3BlcnR5TmFtZXMsXG4gIC8vIDE5LjEuMi44IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMoTylcbiAgZ2V0T3duUHJvcGVydHlTeW1ib2xzOiBnZXRPd25Qcm9wZXJ0eVN5bWJvbHNcbn0pO1xuXG4vLyAxOS40LjMuNSBTeW1ib2wucHJvdG90eXBlW0BAdG9TdHJpbmdUYWddXG5zZXRUYWcoJFN5bWJvbCwgJ1N5bWJvbCcpO1xuLy8gMjAuMi4xLjkgTWF0aFtAQHRvU3RyaW5nVGFnXVxuc2V0VGFnKE1hdGgsICdNYXRoJywgdHJ1ZSk7XG4vLyAyNC4zLjMgSlNPTltAQHRvU3RyaW5nVGFnXVxuc2V0VGFnKCQuZy5KU09OLCAnSlNPTicsIHRydWUpOyIsIid1c2Ugc3RyaWN0JztcbnZhciAkICAgICAgICAgPSByZXF1aXJlKCcuLyQnKVxuICAsIHdlYWsgICAgICA9IHJlcXVpcmUoJy4vJC5jb2xsZWN0aW9uLXdlYWsnKVxuICAsIGxlYWtTdG9yZSA9IHdlYWsubGVha1N0b3JlXG4gICwgSUQgICAgICAgID0gd2Vhay5JRFxuICAsIFdFQUsgICAgICA9IHdlYWsuV0VBS1xuICAsIGhhcyAgICAgICA9ICQuaGFzXG4gICwgaXNPYmplY3QgID0gJC5pc09iamVjdFxuICAsIGlzRXh0ZW5zaWJsZSA9IE9iamVjdC5pc0V4dGVuc2libGUgfHwgaXNPYmplY3RcbiAgLCB0bXAgICAgICAgPSB7fTtcblxuLy8gMjMuMyBXZWFrTWFwIE9iamVjdHNcbnZhciBXZWFrTWFwID0gcmVxdWlyZSgnLi8kLmNvbGxlY3Rpb24nKSgnV2Vha01hcCcsIHtcbiAgLy8gMjMuMy4zLjMgV2Vha01hcC5wcm90b3R5cGUuZ2V0KGtleSlcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoa2V5KXtcbiAgICBpZihpc09iamVjdChrZXkpKXtcbiAgICAgIGlmKCFpc0V4dGVuc2libGUoa2V5KSlyZXR1cm4gbGVha1N0b3JlKHRoaXMpLmdldChrZXkpO1xuICAgICAgaWYoaGFzKGtleSwgV0VBSykpcmV0dXJuIGtleVtXRUFLXVt0aGlzW0lEXV07XG4gICAgfVxuICB9LFxuICAvLyAyMy4zLjMuNSBXZWFrTWFwLnByb3RvdHlwZS5zZXQoa2V5LCB2YWx1ZSlcbiAgc2V0OiBmdW5jdGlvbiBzZXQoa2V5LCB2YWx1ZSl7XG4gICAgcmV0dXJuIHdlYWsuZGVmKHRoaXMsIGtleSwgdmFsdWUpO1xuICB9XG59LCB3ZWFrLCB0cnVlLCB0cnVlKTtcblxuLy8gSUUxMSBXZWFrTWFwIGZyb3plbiBrZXlzIGZpeFxuaWYoJC5GVyAmJiBuZXcgV2Vha01hcCgpLnNldCgoT2JqZWN0LmZyZWV6ZSB8fCBPYmplY3QpKHRtcCksIDcpLmdldCh0bXApICE9IDcpe1xuICAkLmVhY2guY2FsbChbJ2RlbGV0ZScsICdoYXMnLCAnZ2V0JywgJ3NldCddLCBmdW5jdGlvbihrZXkpe1xuICAgIHZhciBwcm90byAgPSBXZWFrTWFwLnByb3RvdHlwZVxuICAgICAgLCBtZXRob2QgPSBwcm90b1trZXldO1xuICAgIHJlcXVpcmUoJy4vJC5yZWRlZicpKHByb3RvLCBrZXksIGZ1bmN0aW9uKGEsIGIpe1xuICAgICAgLy8gc3RvcmUgZnJvemVuIG9iamVjdHMgb24gbGVha3kgbWFwXG4gICAgICBpZihpc09iamVjdChhKSAmJiAhaXNFeHRlbnNpYmxlKGEpKXtcbiAgICAgICAgdmFyIHJlc3VsdCA9IGxlYWtTdG9yZSh0aGlzKVtrZXldKGEsIGIpO1xuICAgICAgICByZXR1cm4ga2V5ID09ICdzZXQnID8gdGhpcyA6IHJlc3VsdDtcbiAgICAgIC8vIHN0b3JlIGFsbCB0aGUgcmVzdCBvbiBuYXRpdmUgd2Vha21hcFxuICAgICAgfSByZXR1cm4gbWV0aG9kLmNhbGwodGhpcywgYSwgYik7XG4gICAgfSk7XG4gIH0pO1xufSIsIid1c2Ugc3RyaWN0JztcbnZhciB3ZWFrID0gcmVxdWlyZSgnLi8kLmNvbGxlY3Rpb24td2VhaycpO1xuXG4vLyAyMy40IFdlYWtTZXQgT2JqZWN0c1xucmVxdWlyZSgnLi8kLmNvbGxlY3Rpb24nKSgnV2Vha1NldCcsIHtcbiAgLy8gMjMuNC4zLjEgV2Vha1NldC5wcm90b3R5cGUuYWRkKHZhbHVlKVxuICBhZGQ6IGZ1bmN0aW9uIGFkZCh2YWx1ZSl7XG4gICAgcmV0dXJuIHdlYWsuZGVmKHRoaXMsIHZhbHVlLCB0cnVlKTtcbiAgfVxufSwgd2VhaywgZmFsc2UsIHRydWUpOyIsIi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9kb21lbmljL0FycmF5LnByb3RvdHlwZS5pbmNsdWRlc1xudmFyICRkZWYgICAgICA9IHJlcXVpcmUoJy4vJC5kZWYnKVxuICAsICRpbmNsdWRlcyA9IHJlcXVpcmUoJy4vJC5hcnJheS1pbmNsdWRlcycpKHRydWUpO1xuJGRlZigkZGVmLlAsICdBcnJheScsIHtcbiAgaW5jbHVkZXM6IGZ1bmN0aW9uIGluY2x1ZGVzKGVsIC8qLCBmcm9tSW5kZXggPSAwICovKXtcbiAgICByZXR1cm4gJGluY2x1ZGVzKHRoaXMsIGVsLCBhcmd1bWVudHNbMV0pO1xuICB9XG59KTtcbnJlcXVpcmUoJy4vJC51bnNjb3BlJykoJ2luY2x1ZGVzJyk7IiwiLy8gaHR0cHM6Ly9naXRodWIuY29tL0RhdmlkQnJ1YW50L01hcC1TZXQucHJvdG90eXBlLnRvSlNPTlxucmVxdWlyZSgnLi8kLmNvbGxlY3Rpb24tdG8tanNvbicpKCdNYXAnKTsiLCIvLyBodHRwczovL2dpc3QuZ2l0aHViLmNvbS9XZWJSZWZsZWN0aW9uLzkzNTM3ODFcbnZhciAkICAgICAgID0gcmVxdWlyZSgnLi8kJylcbiAgLCAkZGVmICAgID0gcmVxdWlyZSgnLi8kLmRlZicpXG4gICwgb3duS2V5cyA9IHJlcXVpcmUoJy4vJC5vd24ta2V5cycpO1xuXG4kZGVmKCRkZWYuUywgJ09iamVjdCcsIHtcbiAgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yczogZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyhvYmplY3Qpe1xuICAgIHZhciBPICAgICAgPSAkLnRvT2JqZWN0KG9iamVjdClcbiAgICAgICwgcmVzdWx0ID0ge307XG4gICAgJC5lYWNoLmNhbGwob3duS2V5cyhPKSwgZnVuY3Rpb24oa2V5KXtcbiAgICAgICQuc2V0RGVzYyhyZXN1bHQsIGtleSwgJC5kZXNjKDAsICQuZ2V0RGVzYyhPLCBrZXkpKSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxufSk7IiwiLy8gaHR0cDovL2dvby5nbC9Ya0JyakRcbnZhciAkICAgID0gcmVxdWlyZSgnLi8kJylcbiAgLCAkZGVmID0gcmVxdWlyZSgnLi8kLmRlZicpO1xuZnVuY3Rpb24gY3JlYXRlT2JqZWN0VG9BcnJheShpc0VudHJpZXMpe1xuICByZXR1cm4gZnVuY3Rpb24ob2JqZWN0KXtcbiAgICB2YXIgTyAgICAgID0gJC50b09iamVjdChvYmplY3QpXG4gICAgICAsIGtleXMgICA9ICQuZ2V0S2V5cyhPKVxuICAgICAgLCBsZW5ndGggPSBrZXlzLmxlbmd0aFxuICAgICAgLCBpICAgICAgPSAwXG4gICAgICAsIHJlc3VsdCA9IEFycmF5KGxlbmd0aClcbiAgICAgICwga2V5O1xuICAgIGlmKGlzRW50cmllcyl3aGlsZShsZW5ndGggPiBpKXJlc3VsdFtpXSA9IFtrZXkgPSBrZXlzW2krK10sIE9ba2V5XV07XG4gICAgZWxzZSB3aGlsZShsZW5ndGggPiBpKXJlc3VsdFtpXSA9IE9ba2V5c1tpKytdXTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xufVxuJGRlZigkZGVmLlMsICdPYmplY3QnLCB7XG4gIHZhbHVlczogIGNyZWF0ZU9iamVjdFRvQXJyYXkoZmFsc2UpLFxuICBlbnRyaWVzOiBjcmVhdGVPYmplY3RUb0FycmF5KHRydWUpXG59KTsiLCIvLyBodHRwczovL2dpc3QuZ2l0aHViLmNvbS9rYW5nYXgvOTY5ODEwMFxudmFyICRkZWYgPSByZXF1aXJlKCcuLyQuZGVmJyk7XG4kZGVmKCRkZWYuUywgJ1JlZ0V4cCcsIHtcbiAgZXNjYXBlOiByZXF1aXJlKCcuLyQucmVwbGFjZXInKSgvKFtcXFxcXFwtW1xcXXt9KCkqKz8uLF4kfF0pL2csICdcXFxcJDEnLCB0cnVlKVxufSk7IiwiLy8gaHR0cHM6Ly9naXRodWIuY29tL0RhdmlkQnJ1YW50L01hcC1TZXQucHJvdG90eXBlLnRvSlNPTlxucmVxdWlyZSgnLi8kLmNvbGxlY3Rpb24tdG8tanNvbicpKCdTZXQnKTsiLCIvLyBodHRwczovL2dpdGh1Yi5jb20vbWF0aGlhc2J5bmVucy9TdHJpbmcucHJvdG90eXBlLmF0XG4ndXNlIHN0cmljdCc7XG52YXIgJGRlZiA9IHJlcXVpcmUoJy4vJC5kZWYnKVxuICAsICRhdCAgPSByZXF1aXJlKCcuLyQuc3RyaW5nLWF0JykodHJ1ZSk7XG4kZGVmKCRkZWYuUCwgJ1N0cmluZycsIHtcbiAgYXQ6IGZ1bmN0aW9uIGF0KHBvcyl7XG4gICAgcmV0dXJuICRhdCh0aGlzLCBwb3MpO1xuICB9XG59KTsiLCIndXNlIHN0cmljdCc7XG52YXIgJGRlZiA9IHJlcXVpcmUoJy4vJC5kZWYnKVxuICAsICRwYWQgPSByZXF1aXJlKCcuLyQuc3RyaW5nLXBhZCcpO1xuJGRlZigkZGVmLlAsICdTdHJpbmcnLCB7XG4gIGxwYWQ6IGZ1bmN0aW9uIGxwYWQobil7XG4gICAgcmV0dXJuICRwYWQodGhpcywgbiwgYXJndW1lbnRzWzFdLCB0cnVlKTtcbiAgfVxufSk7IiwiJ3VzZSBzdHJpY3QnO1xudmFyICRkZWYgPSByZXF1aXJlKCcuLyQuZGVmJylcbiAgLCAkcGFkID0gcmVxdWlyZSgnLi8kLnN0cmluZy1wYWQnKTtcbiRkZWYoJGRlZi5QLCAnU3RyaW5nJywge1xuICBycGFkOiBmdW5jdGlvbiBycGFkKG4pe1xuICAgIHJldHVybiAkcGFkKHRoaXMsIG4sIGFyZ3VtZW50c1sxXSwgZmFsc2UpO1xuICB9XG59KTsiLCIvLyBKYXZhU2NyaXB0IDEuNiAvIFN0cmF3bWFuIGFycmF5IHN0YXRpY3Mgc2hpbVxudmFyICQgICAgICAgPSByZXF1aXJlKCcuLyQnKVxuICAsICRkZWYgICAgPSByZXF1aXJlKCcuLyQuZGVmJylcbiAgLCAkQXJyYXkgID0gJC5jb3JlLkFycmF5IHx8IEFycmF5XG4gICwgc3RhdGljcyA9IHt9O1xuZnVuY3Rpb24gc2V0U3RhdGljcyhrZXlzLCBsZW5ndGgpe1xuICAkLmVhY2guY2FsbChrZXlzLnNwbGl0KCcsJyksIGZ1bmN0aW9uKGtleSl7XG4gICAgaWYobGVuZ3RoID09IHVuZGVmaW5lZCAmJiBrZXkgaW4gJEFycmF5KXN0YXRpY3Nba2V5XSA9ICRBcnJheVtrZXldO1xuICAgIGVsc2UgaWYoa2V5IGluIFtdKXN0YXRpY3Nba2V5XSA9IHJlcXVpcmUoJy4vJC5jdHgnKShGdW5jdGlvbi5jYWxsLCBbXVtrZXldLCBsZW5ndGgpO1xuICB9KTtcbn1cbnNldFN0YXRpY3MoJ3BvcCxyZXZlcnNlLHNoaWZ0LGtleXMsdmFsdWVzLGVudHJpZXMnLCAxKTtcbnNldFN0YXRpY3MoJ2luZGV4T2YsZXZlcnksc29tZSxmb3JFYWNoLG1hcCxmaWx0ZXIsZmluZCxmaW5kSW5kZXgsaW5jbHVkZXMnLCAzKTtcbnNldFN0YXRpY3MoJ2pvaW4sc2xpY2UsY29uY2F0LHB1c2gsc3BsaWNlLHVuc2hpZnQsc29ydCxsYXN0SW5kZXhPZiwnICtcbiAgICAgICAgICAgJ3JlZHVjZSxyZWR1Y2VSaWdodCxjb3B5V2l0aGluLGZpbGwsdHVybicpO1xuJGRlZigkZGVmLlMsICdBcnJheScsIHN0YXRpY3MpOyIsInJlcXVpcmUoJy4vZXM2LmFycmF5Lml0ZXJhdG9yJyk7XG52YXIgJCAgICAgICAgICAgPSByZXF1aXJlKCcuLyQnKVxuICAsIEl0ZXJhdG9ycyAgID0gcmVxdWlyZSgnLi8kLml0ZXInKS5JdGVyYXRvcnNcbiAgLCBJVEVSQVRPUiAgICA9IHJlcXVpcmUoJy4vJC53a3MnKSgnaXRlcmF0b3InKVxuICAsIEFycmF5VmFsdWVzID0gSXRlcmF0b3JzLkFycmF5XG4gICwgTkwgICAgICAgICAgPSAkLmcuTm9kZUxpc3RcbiAgLCBIVEMgICAgICAgICA9ICQuZy5IVE1MQ29sbGVjdGlvblxuICAsIE5MUHJvdG8gICAgID0gTkwgJiYgTkwucHJvdG90eXBlXG4gICwgSFRDUHJvdG8gICAgPSBIVEMgJiYgSFRDLnByb3RvdHlwZTtcbmlmKCQuRlcpe1xuICBpZihOTCAmJiAhKElURVJBVE9SIGluIE5MUHJvdG8pKSQuaGlkZShOTFByb3RvLCBJVEVSQVRPUiwgQXJyYXlWYWx1ZXMpO1xuICBpZihIVEMgJiYgIShJVEVSQVRPUiBpbiBIVENQcm90bykpJC5oaWRlKEhUQ1Byb3RvLCBJVEVSQVRPUiwgQXJyYXlWYWx1ZXMpO1xufVxuSXRlcmF0b3JzLk5vZGVMaXN0ID0gSXRlcmF0b3JzLkhUTUxDb2xsZWN0aW9uID0gQXJyYXlWYWx1ZXM7IiwidmFyICRkZWYgID0gcmVxdWlyZSgnLi8kLmRlZicpXG4gICwgJHRhc2sgPSByZXF1aXJlKCcuLyQudGFzaycpO1xuJGRlZigkZGVmLkcgKyAkZGVmLkIsIHtcbiAgc2V0SW1tZWRpYXRlOiAgICR0YXNrLnNldCxcbiAgY2xlYXJJbW1lZGlhdGU6ICR0YXNrLmNsZWFyXG59KTsiLCIvLyBpZTktIHNldFRpbWVvdXQgJiBzZXRJbnRlcnZhbCBhZGRpdGlvbmFsIHBhcmFtZXRlcnMgZml4XG52YXIgJCAgICAgICAgID0gcmVxdWlyZSgnLi8kJylcbiAgLCAkZGVmICAgICAgPSByZXF1aXJlKCcuLyQuZGVmJylcbiAgLCBpbnZva2UgICAgPSByZXF1aXJlKCcuLyQuaW52b2tlJylcbiAgLCBwYXJ0aWFsICAgPSByZXF1aXJlKCcuLyQucGFydGlhbCcpXG4gICwgbmF2aWdhdG9yID0gJC5nLm5hdmlnYXRvclxuICAsIE1TSUUgICAgICA9ICEhbmF2aWdhdG9yICYmIC9NU0lFIC5cXC4vLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7IC8vIDwtIGRpcnR5IGllOS0gY2hlY2tcbmZ1bmN0aW9uIHdyYXAoc2V0KXtcbiAgcmV0dXJuIE1TSUUgPyBmdW5jdGlvbihmbiwgdGltZSAvKiwgLi4uYXJncyAqLyl7XG4gICAgcmV0dXJuIHNldChpbnZva2UoXG4gICAgICBwYXJ0aWFsLFxuICAgICAgW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDIpLFxuICAgICAgJC5pc0Z1bmN0aW9uKGZuKSA/IGZuIDogRnVuY3Rpb24oZm4pXG4gICAgKSwgdGltZSk7XG4gIH0gOiBzZXQ7XG59XG4kZGVmKCRkZWYuRyArICRkZWYuQiArICRkZWYuRiAqIE1TSUUsIHtcbiAgc2V0VGltZW91dDogIHdyYXAoJC5nLnNldFRpbWVvdXQpLFxuICBzZXRJbnRlcnZhbDogd3JhcCgkLmcuc2V0SW50ZXJ2YWwpXG59KTsiLCJyZXF1aXJlKCcuL21vZHVsZXMvZXM1Jyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LnN5bWJvbCcpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5vYmplY3QuYXNzaWduJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2Lm9iamVjdC5pcycpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5vYmplY3Quc2V0LXByb3RvdHlwZS1vZicpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5vYmplY3QudG8tc3RyaW5nJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2Lm9iamVjdC5zdGF0aWNzLWFjY2VwdC1wcmltaXRpdmVzJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LmZ1bmN0aW9uLm5hbWUnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYuZnVuY3Rpb24uaGFzLWluc3RhbmNlJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2Lm51bWJlci5jb25zdHJ1Y3RvcicpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5udW1iZXIuc3RhdGljcycpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5tYXRoJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LnN0cmluZy5mcm9tLWNvZGUtcG9pbnQnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYuc3RyaW5nLnJhdycpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5zdHJpbmcuaXRlcmF0b3InKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYuc3RyaW5nLmNvZGUtcG9pbnQtYXQnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYuc3RyaW5nLmVuZHMtd2l0aCcpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5zdHJpbmcuaW5jbHVkZXMnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYuc3RyaW5nLnJlcGVhdCcpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5zdHJpbmcuc3RhcnRzLXdpdGgnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYuYXJyYXkuZnJvbScpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5hcnJheS5vZicpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5hcnJheS5pdGVyYXRvcicpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5hcnJheS5zcGVjaWVzJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LmFycmF5LmNvcHktd2l0aGluJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LmFycmF5LmZpbGwnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYuYXJyYXkuZmluZCcpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5hcnJheS5maW5kLWluZGV4Jyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LnJlZ2V4cCcpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5wcm9taXNlJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2Lm1hcCcpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5zZXQnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYud2Vhay1tYXAnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYud2Vhay1zZXQnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYucmVmbGVjdCcpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNy5hcnJheS5pbmNsdWRlcycpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNy5zdHJpbmcuYXQnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczcuc3RyaW5nLmxwYWQnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczcuc3RyaW5nLnJwYWQnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczcucmVnZXhwLmVzY2FwZScpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNy5vYmplY3QuZ2V0LW93bi1wcm9wZXJ0eS1kZXNjcmlwdG9ycycpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNy5vYmplY3QudG8tYXJyYXknKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczcubWFwLnRvLWpzb24nKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczcuc2V0LnRvLWpzb24nKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9qcy5hcnJheS5zdGF0aWNzJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvd2ViLnRpbWVycycpO1xucmVxdWlyZSgnLi9tb2R1bGVzL3dlYi5pbW1lZGlhdGUnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy93ZWIuZG9tLml0ZXJhYmxlJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vbW9kdWxlcy8kJykuY29yZTtcbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE0LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIGh0dHBzOi8vcmF3LmdpdGh1Yi5jb20vZmFjZWJvb2svcmVnZW5lcmF0b3IvbWFzdGVyL0xJQ0VOU0UgZmlsZS4gQW5cbiAqIGFkZGl0aW9uYWwgZ3JhbnQgb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpblxuICogdGhlIHNhbWUgZGlyZWN0b3J5LlxuICovXG5cbiEoZnVuY3Rpb24oZ2xvYmFsKSB7XG4gIFwidXNlIHN0cmljdFwiO1xuXG4gIHZhciBoYXNPd24gPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuICB2YXIgdW5kZWZpbmVkOyAvLyBNb3JlIGNvbXByZXNzaWJsZSB0aGFuIHZvaWQgMC5cbiAgdmFyIGl0ZXJhdG9yU3ltYm9sID1cbiAgICB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgU3ltYm9sLml0ZXJhdG9yIHx8IFwiQEBpdGVyYXRvclwiO1xuXG4gIHZhciBpbk1vZHVsZSA9IHR5cGVvZiBtb2R1bGUgPT09IFwib2JqZWN0XCI7XG4gIHZhciBydW50aW1lID0gZ2xvYmFsLnJlZ2VuZXJhdG9yUnVudGltZTtcbiAgaWYgKHJ1bnRpbWUpIHtcbiAgICBpZiAoaW5Nb2R1bGUpIHtcbiAgICAgIC8vIElmIHJlZ2VuZXJhdG9yUnVudGltZSBpcyBkZWZpbmVkIGdsb2JhbGx5IGFuZCB3ZSdyZSBpbiBhIG1vZHVsZSxcbiAgICAgIC8vIG1ha2UgdGhlIGV4cG9ydHMgb2JqZWN0IGlkZW50aWNhbCB0byByZWdlbmVyYXRvclJ1bnRpbWUuXG4gICAgICBtb2R1bGUuZXhwb3J0cyA9IHJ1bnRpbWU7XG4gICAgfVxuICAgIC8vIERvbid0IGJvdGhlciBldmFsdWF0aW5nIHRoZSByZXN0IG9mIHRoaXMgZmlsZSBpZiB0aGUgcnVudGltZSB3YXNcbiAgICAvLyBhbHJlYWR5IGRlZmluZWQgZ2xvYmFsbHkuXG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gRGVmaW5lIHRoZSBydW50aW1lIGdsb2JhbGx5IChhcyBleHBlY3RlZCBieSBnZW5lcmF0ZWQgY29kZSkgYXMgZWl0aGVyXG4gIC8vIG1vZHVsZS5leHBvcnRzIChpZiB3ZSdyZSBpbiBhIG1vZHVsZSkgb3IgYSBuZXcsIGVtcHR5IG9iamVjdC5cbiAgcnVudGltZSA9IGdsb2JhbC5yZWdlbmVyYXRvclJ1bnRpbWUgPSBpbk1vZHVsZSA/IG1vZHVsZS5leHBvcnRzIDoge307XG5cbiAgZnVuY3Rpb24gd3JhcChpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCkge1xuICAgIC8vIElmIG91dGVyRm4gcHJvdmlkZWQsIHRoZW4gb3V0ZXJGbi5wcm90b3R5cGUgaW5zdGFuY2VvZiBHZW5lcmF0b3IuXG4gICAgdmFyIGdlbmVyYXRvciA9IE9iamVjdC5jcmVhdGUoKG91dGVyRm4gfHwgR2VuZXJhdG9yKS5wcm90b3R5cGUpO1xuXG4gICAgZ2VuZXJhdG9yLl9pbnZva2UgPSBtYWtlSW52b2tlTWV0aG9kKFxuICAgICAgaW5uZXJGbiwgc2VsZiB8fCBudWxsLFxuICAgICAgbmV3IENvbnRleHQodHJ5TG9jc0xpc3QgfHwgW10pXG4gICAgKTtcblxuICAgIHJldHVybiBnZW5lcmF0b3I7XG4gIH1cbiAgcnVudGltZS53cmFwID0gd3JhcDtcblxuICAvLyBUcnkvY2F0Y2ggaGVscGVyIHRvIG1pbmltaXplIGRlb3B0aW1pemF0aW9ucy4gUmV0dXJucyBhIGNvbXBsZXRpb25cbiAgLy8gcmVjb3JkIGxpa2UgY29udGV4dC50cnlFbnRyaWVzW2ldLmNvbXBsZXRpb24uIFRoaXMgaW50ZXJmYWNlIGNvdWxkXG4gIC8vIGhhdmUgYmVlbiAoYW5kIHdhcyBwcmV2aW91c2x5KSBkZXNpZ25lZCB0byB0YWtlIGEgY2xvc3VyZSB0byBiZVxuICAvLyBpbnZva2VkIHdpdGhvdXQgYXJndW1lbnRzLCBidXQgaW4gYWxsIHRoZSBjYXNlcyB3ZSBjYXJlIGFib3V0IHdlXG4gIC8vIGFscmVhZHkgaGF2ZSBhbiBleGlzdGluZyBtZXRob2Qgd2Ugd2FudCB0byBjYWxsLCBzbyB0aGVyZSdzIG5vIG5lZWRcbiAgLy8gdG8gY3JlYXRlIGEgbmV3IGZ1bmN0aW9uIG9iamVjdC4gV2UgY2FuIGV2ZW4gZ2V0IGF3YXkgd2l0aCBhc3N1bWluZ1xuICAvLyB0aGUgbWV0aG9kIHRha2VzIGV4YWN0bHkgb25lIGFyZ3VtZW50LCBzaW5jZSB0aGF0IGhhcHBlbnMgdG8gYmUgdHJ1ZVxuICAvLyBpbiBldmVyeSBjYXNlLCBzbyB3ZSBkb24ndCBoYXZlIHRvIHRvdWNoIHRoZSBhcmd1bWVudHMgb2JqZWN0LiBUaGVcbiAgLy8gb25seSBhZGRpdGlvbmFsIGFsbG9jYXRpb24gcmVxdWlyZWQgaXMgdGhlIGNvbXBsZXRpb24gcmVjb3JkLCB3aGljaFxuICAvLyBoYXMgYSBzdGFibGUgc2hhcGUgYW5kIHNvIGhvcGVmdWxseSBzaG91bGQgYmUgY2hlYXAgdG8gYWxsb2NhdGUuXG4gIGZ1bmN0aW9uIHRyeUNhdGNoKGZuLCBvYmosIGFyZykge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4geyB0eXBlOiBcIm5vcm1hbFwiLCBhcmc6IGZuLmNhbGwob2JqLCBhcmcpIH07XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICByZXR1cm4geyB0eXBlOiBcInRocm93XCIsIGFyZzogZXJyIH07XG4gICAgfVxuICB9XG5cbiAgdmFyIEdlblN0YXRlU3VzcGVuZGVkU3RhcnQgPSBcInN1c3BlbmRlZFN0YXJ0XCI7XG4gIHZhciBHZW5TdGF0ZVN1c3BlbmRlZFlpZWxkID0gXCJzdXNwZW5kZWRZaWVsZFwiO1xuICB2YXIgR2VuU3RhdGVFeGVjdXRpbmcgPSBcImV4ZWN1dGluZ1wiO1xuICB2YXIgR2VuU3RhdGVDb21wbGV0ZWQgPSBcImNvbXBsZXRlZFwiO1xuXG4gIC8vIFJldHVybmluZyB0aGlzIG9iamVjdCBmcm9tIHRoZSBpbm5lckZuIGhhcyB0aGUgc2FtZSBlZmZlY3QgYXNcbiAgLy8gYnJlYWtpbmcgb3V0IG9mIHRoZSBkaXNwYXRjaCBzd2l0Y2ggc3RhdGVtZW50LlxuICB2YXIgQ29udGludWVTZW50aW5lbCA9IHt9O1xuXG4gIC8vIER1bW15IGNvbnN0cnVjdG9yIGZ1bmN0aW9ucyB0aGF0IHdlIHVzZSBhcyB0aGUgLmNvbnN0cnVjdG9yIGFuZFxuICAvLyAuY29uc3RydWN0b3IucHJvdG90eXBlIHByb3BlcnRpZXMgZm9yIGZ1bmN0aW9ucyB0aGF0IHJldHVybiBHZW5lcmF0b3JcbiAgLy8gb2JqZWN0cy4gRm9yIGZ1bGwgc3BlYyBjb21wbGlhbmNlLCB5b3UgbWF5IHdpc2ggdG8gY29uZmlndXJlIHlvdXJcbiAgLy8gbWluaWZpZXIgbm90IHRvIG1hbmdsZSB0aGUgbmFtZXMgb2YgdGhlc2UgdHdvIGZ1bmN0aW9ucy5cbiAgZnVuY3Rpb24gR2VuZXJhdG9yKCkge31cbiAgZnVuY3Rpb24gR2VuZXJhdG9yRnVuY3Rpb24oKSB7fVxuICBmdW5jdGlvbiBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSgpIHt9XG5cbiAgdmFyIEdwID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUucHJvdG90eXBlID0gR2VuZXJhdG9yLnByb3RvdHlwZTtcbiAgR2VuZXJhdG9yRnVuY3Rpb24ucHJvdG90eXBlID0gR3AuY29uc3RydWN0b3IgPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZTtcbiAgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUuY29uc3RydWN0b3IgPSBHZW5lcmF0b3JGdW5jdGlvbjtcbiAgR2VuZXJhdG9yRnVuY3Rpb24uZGlzcGxheU5hbWUgPSBcIkdlbmVyYXRvckZ1bmN0aW9uXCI7XG5cbiAgcnVudGltZS5pc0dlbmVyYXRvckZ1bmN0aW9uID0gZnVuY3Rpb24oZ2VuRnVuKSB7XG4gICAgdmFyIGN0b3IgPSB0eXBlb2YgZ2VuRnVuID09PSBcImZ1bmN0aW9uXCIgJiYgZ2VuRnVuLmNvbnN0cnVjdG9yO1xuICAgIHJldHVybiBjdG9yXG4gICAgICA/IGN0b3IgPT09IEdlbmVyYXRvckZ1bmN0aW9uIHx8XG4gICAgICAgIC8vIEZvciB0aGUgbmF0aXZlIEdlbmVyYXRvckZ1bmN0aW9uIGNvbnN0cnVjdG9yLCB0aGUgYmVzdCB3ZSBjYW5cbiAgICAgICAgLy8gZG8gaXMgdG8gY2hlY2sgaXRzIC5uYW1lIHByb3BlcnR5LlxuICAgICAgICAoY3Rvci5kaXNwbGF5TmFtZSB8fCBjdG9yLm5hbWUpID09PSBcIkdlbmVyYXRvckZ1bmN0aW9uXCJcbiAgICAgIDogZmFsc2U7XG4gIH07XG5cbiAgcnVudGltZS5tYXJrID0gZnVuY3Rpb24oZ2VuRnVuKSB7XG4gICAgZ2VuRnVuLl9fcHJvdG9fXyA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlO1xuICAgIGdlbkZ1bi5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEdwKTtcbiAgICByZXR1cm4gZ2VuRnVuO1xuICB9O1xuXG4gIHJ1bnRpbWUuYXN5bmMgPSBmdW5jdGlvbihpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHZhciBnZW5lcmF0b3IgPSB3cmFwKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0KTtcbiAgICAgIHZhciBjYWxsTmV4dCA9IHN0ZXAuYmluZChnZW5lcmF0b3IsIFwibmV4dFwiKTtcbiAgICAgIHZhciBjYWxsVGhyb3cgPSBzdGVwLmJpbmQoZ2VuZXJhdG9yLCBcInRocm93XCIpO1xuXG4gICAgICBmdW5jdGlvbiBzdGVwKG1ldGhvZCwgYXJnKSB7XG4gICAgICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChnZW5lcmF0b3JbbWV0aG9kXSwgZ2VuZXJhdG9yLCBhcmcpO1xuICAgICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIHJlamVjdChyZWNvcmQuYXJnKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgaW5mbyA9IHJlY29yZC5hcmc7XG4gICAgICAgIGlmIChpbmZvLmRvbmUpIHtcbiAgICAgICAgICByZXNvbHZlKGluZm8udmFsdWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIFByb21pc2UucmVzb2x2ZShpbmZvLnZhbHVlKS50aGVuKGNhbGxOZXh0LCBjYWxsVGhyb3cpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGNhbGxOZXh0KCk7XG4gICAgfSk7XG4gIH07XG5cbiAgZnVuY3Rpb24gbWFrZUludm9rZU1ldGhvZChpbm5lckZuLCBzZWxmLCBjb250ZXh0KSB7XG4gICAgdmFyIHN0YXRlID0gR2VuU3RhdGVTdXNwZW5kZWRTdGFydDtcblxuICAgIHJldHVybiBmdW5jdGlvbiBpbnZva2UobWV0aG9kLCBhcmcpIHtcbiAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVFeGVjdXRpbmcpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgcnVubmluZ1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZUNvbXBsZXRlZCkge1xuICAgICAgICAvLyBCZSBmb3JnaXZpbmcsIHBlciAyNS4zLjMuMy4zIG9mIHRoZSBzcGVjOlxuICAgICAgICAvLyBodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtZ2VuZXJhdG9ycmVzdW1lXG4gICAgICAgIHJldHVybiBkb25lUmVzdWx0KCk7XG4gICAgICB9XG5cbiAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgIHZhciBkZWxlZ2F0ZSA9IGNvbnRleHQuZGVsZWdhdGU7XG4gICAgICAgIGlmIChkZWxlZ2F0ZSkge1xuICAgICAgICAgIGlmIChtZXRob2QgPT09IFwicmV0dXJuXCIgfHxcbiAgICAgICAgICAgICAgKG1ldGhvZCA9PT0gXCJ0aHJvd1wiICYmIGRlbGVnYXRlLml0ZXJhdG9yW21ldGhvZF0gPT09IHVuZGVmaW5lZCkpIHtcbiAgICAgICAgICAgIC8vIEEgcmV0dXJuIG9yIHRocm93ICh3aGVuIHRoZSBkZWxlZ2F0ZSBpdGVyYXRvciBoYXMgbm8gdGhyb3dcbiAgICAgICAgICAgIC8vIG1ldGhvZCkgYWx3YXlzIHRlcm1pbmF0ZXMgdGhlIHlpZWxkKiBsb29wLlxuICAgICAgICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG5cbiAgICAgICAgICAgIC8vIElmIHRoZSBkZWxlZ2F0ZSBpdGVyYXRvciBoYXMgYSByZXR1cm4gbWV0aG9kLCBnaXZlIGl0IGFcbiAgICAgICAgICAgIC8vIGNoYW5jZSB0byBjbGVhbiB1cC5cbiAgICAgICAgICAgIHZhciByZXR1cm5NZXRob2QgPSBkZWxlZ2F0ZS5pdGVyYXRvcltcInJldHVyblwiXTtcbiAgICAgICAgICAgIGlmIChyZXR1cm5NZXRob2QpIHtcbiAgICAgICAgICAgICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKHJldHVybk1ldGhvZCwgZGVsZWdhdGUuaXRlcmF0b3IsIGFyZyk7XG4gICAgICAgICAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgICAgICAgLy8gSWYgdGhlIHJldHVybiBtZXRob2QgdGhyZXcgYW4gZXhjZXB0aW9uLCBsZXQgdGhhdFxuICAgICAgICAgICAgICAgIC8vIGV4Y2VwdGlvbiBwcmV2YWlsIG92ZXIgdGhlIG9yaWdpbmFsIHJldHVybiBvciB0aHJvdy5cbiAgICAgICAgICAgICAgICBtZXRob2QgPSBcInRocm93XCI7XG4gICAgICAgICAgICAgICAgYXJnID0gcmVjb3JkLmFyZztcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAobWV0aG9kID09PSBcInJldHVyblwiKSB7XG4gICAgICAgICAgICAgIC8vIENvbnRpbnVlIHdpdGggdGhlIG91dGVyIHJldHVybiwgbm93IHRoYXQgdGhlIGRlbGVnYXRlXG4gICAgICAgICAgICAgIC8vIGl0ZXJhdG9yIGhhcyBiZWVuIHRlcm1pbmF0ZWQuXG4gICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChcbiAgICAgICAgICAgIGRlbGVnYXRlLml0ZXJhdG9yW21ldGhvZF0sXG4gICAgICAgICAgICBkZWxlZ2F0ZS5pdGVyYXRvcixcbiAgICAgICAgICAgIGFyZ1xuICAgICAgICAgICk7XG5cbiAgICAgICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG5cbiAgICAgICAgICAgIC8vIExpa2UgcmV0dXJuaW5nIGdlbmVyYXRvci50aHJvdyh1bmNhdWdodCksIGJ1dCB3aXRob3V0IHRoZVxuICAgICAgICAgICAgLy8gb3ZlcmhlYWQgb2YgYW4gZXh0cmEgZnVuY3Rpb24gY2FsbC5cbiAgICAgICAgICAgIG1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgICAgICAgIGFyZyA9IHJlY29yZC5hcmc7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBEZWxlZ2F0ZSBnZW5lcmF0b3IgcmFuIGFuZCBoYW5kbGVkIGl0cyBvd24gZXhjZXB0aW9ucyBzb1xuICAgICAgICAgIC8vIHJlZ2FyZGxlc3Mgb2Ygd2hhdCB0aGUgbWV0aG9kIHdhcywgd2UgY29udGludWUgYXMgaWYgaXQgaXNcbiAgICAgICAgICAvLyBcIm5leHRcIiB3aXRoIGFuIHVuZGVmaW5lZCBhcmcuXG4gICAgICAgICAgbWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICAgICAgYXJnID0gdW5kZWZpbmVkO1xuXG4gICAgICAgICAgdmFyIGluZm8gPSByZWNvcmQuYXJnO1xuICAgICAgICAgIGlmIChpbmZvLmRvbmUpIHtcbiAgICAgICAgICAgIGNvbnRleHRbZGVsZWdhdGUucmVzdWx0TmFtZV0gPSBpbmZvLnZhbHVlO1xuICAgICAgICAgICAgY29udGV4dC5uZXh0ID0gZGVsZWdhdGUubmV4dExvYztcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3RhdGUgPSBHZW5TdGF0ZVN1c3BlbmRlZFlpZWxkO1xuICAgICAgICAgICAgcmV0dXJuIGluZm87XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobWV0aG9kID09PSBcIm5leHRcIikge1xuICAgICAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVTdXNwZW5kZWRZaWVsZCkge1xuICAgICAgICAgICAgY29udGV4dC5zZW50ID0gYXJnO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkZWxldGUgY29udGV4dC5zZW50O1xuICAgICAgICAgIH1cblxuICAgICAgICB9IGVsc2UgaWYgKG1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0KSB7XG4gICAgICAgICAgICBzdGF0ZSA9IEdlblN0YXRlQ29tcGxldGVkO1xuICAgICAgICAgICAgdGhyb3cgYXJnO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChjb250ZXh0LmRpc3BhdGNoRXhjZXB0aW9uKGFyZykpIHtcbiAgICAgICAgICAgIC8vIElmIHRoZSBkaXNwYXRjaGVkIGV4Y2VwdGlvbiB3YXMgY2F1Z2h0IGJ5IGEgY2F0Y2ggYmxvY2ssXG4gICAgICAgICAgICAvLyB0aGVuIGxldCB0aGF0IGNhdGNoIGJsb2NrIGhhbmRsZSB0aGUgZXhjZXB0aW9uIG5vcm1hbGx5LlxuICAgICAgICAgICAgbWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICAgICAgICBhcmcgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgfVxuXG4gICAgICAgIH0gZWxzZSBpZiAobWV0aG9kID09PSBcInJldHVyblwiKSB7XG4gICAgICAgICAgY29udGV4dC5hYnJ1cHQoXCJyZXR1cm5cIiwgYXJnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN0YXRlID0gR2VuU3RhdGVFeGVjdXRpbmc7XG5cbiAgICAgICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpO1xuICAgICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwibm9ybWFsXCIpIHtcbiAgICAgICAgICAvLyBJZiBhbiBleGNlcHRpb24gaXMgdGhyb3duIGZyb20gaW5uZXJGbiwgd2UgbGVhdmUgc3RhdGUgPT09XG4gICAgICAgICAgLy8gR2VuU3RhdGVFeGVjdXRpbmcgYW5kIGxvb3AgYmFjayBmb3IgYW5vdGhlciBpbnZvY2F0aW9uLlxuICAgICAgICAgIHN0YXRlID0gY29udGV4dC5kb25lXG4gICAgICAgICAgICA/IEdlblN0YXRlQ29tcGxldGVkXG4gICAgICAgICAgICA6IEdlblN0YXRlU3VzcGVuZGVkWWllbGQ7XG5cbiAgICAgICAgICB2YXIgaW5mbyA9IHtcbiAgICAgICAgICAgIHZhbHVlOiByZWNvcmQuYXJnLFxuICAgICAgICAgICAgZG9uZTogY29udGV4dC5kb25lXG4gICAgICAgICAgfTtcblxuICAgICAgICAgIGlmIChyZWNvcmQuYXJnID09PSBDb250aW51ZVNlbnRpbmVsKSB7XG4gICAgICAgICAgICBpZiAoY29udGV4dC5kZWxlZ2F0ZSAmJiBtZXRob2QgPT09IFwibmV4dFwiKSB7XG4gICAgICAgICAgICAgIC8vIERlbGliZXJhdGVseSBmb3JnZXQgdGhlIGxhc3Qgc2VudCB2YWx1ZSBzbyB0aGF0IHdlIGRvbid0XG4gICAgICAgICAgICAgIC8vIGFjY2lkZW50YWxseSBwYXNzIGl0IG9uIHRvIHRoZSBkZWxlZ2F0ZS5cbiAgICAgICAgICAgICAgYXJnID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gaW5mbztcbiAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgc3RhdGUgPSBHZW5TdGF0ZUNvbXBsZXRlZDtcbiAgICAgICAgICAvLyBEaXNwYXRjaCB0aGUgZXhjZXB0aW9uIGJ5IGxvb3BpbmcgYmFjayBhcm91bmQgdG8gdGhlXG4gICAgICAgICAgLy8gY29udGV4dC5kaXNwYXRjaEV4Y2VwdGlvbihhcmcpIGNhbGwgYWJvdmUuXG4gICAgICAgICAgbWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgICAgIGFyZyA9IHJlY29yZC5hcmc7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gZGVmaW5lR2VuZXJhdG9yTWV0aG9kKG1ldGhvZCkge1xuICAgIEdwW21ldGhvZF0gPSBmdW5jdGlvbihhcmcpIHtcbiAgICAgIHJldHVybiB0aGlzLl9pbnZva2UobWV0aG9kLCBhcmcpO1xuICAgIH07XG4gIH1cbiAgZGVmaW5lR2VuZXJhdG9yTWV0aG9kKFwibmV4dFwiKTtcbiAgZGVmaW5lR2VuZXJhdG9yTWV0aG9kKFwidGhyb3dcIik7XG4gIGRlZmluZUdlbmVyYXRvck1ldGhvZChcInJldHVyblwiKTtcblxuICBHcFtpdGVyYXRvclN5bWJvbF0gPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBHcC50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBcIltvYmplY3QgR2VuZXJhdG9yXVwiO1xuICB9O1xuXG4gIGZ1bmN0aW9uIHB1c2hUcnlFbnRyeShsb2NzKSB7XG4gICAgdmFyIGVudHJ5ID0geyB0cnlMb2M6IGxvY3NbMF0gfTtcblxuICAgIGlmICgxIGluIGxvY3MpIHtcbiAgICAgIGVudHJ5LmNhdGNoTG9jID0gbG9jc1sxXTtcbiAgICB9XG5cbiAgICBpZiAoMiBpbiBsb2NzKSB7XG4gICAgICBlbnRyeS5maW5hbGx5TG9jID0gbG9jc1syXTtcbiAgICAgIGVudHJ5LmFmdGVyTG9jID0gbG9jc1szXTtcbiAgICB9XG5cbiAgICB0aGlzLnRyeUVudHJpZXMucHVzaChlbnRyeSk7XG4gIH1cblxuICBmdW5jdGlvbiByZXNldFRyeUVudHJ5KGVudHJ5KSB7XG4gICAgdmFyIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb24gfHwge307XG4gICAgcmVjb3JkLnR5cGUgPSBcIm5vcm1hbFwiO1xuICAgIGRlbGV0ZSByZWNvcmQuYXJnO1xuICAgIGVudHJ5LmNvbXBsZXRpb24gPSByZWNvcmQ7XG4gIH1cblxuICBmdW5jdGlvbiBDb250ZXh0KHRyeUxvY3NMaXN0KSB7XG4gICAgLy8gVGhlIHJvb3QgZW50cnkgb2JqZWN0IChlZmZlY3RpdmVseSBhIHRyeSBzdGF0ZW1lbnQgd2l0aG91dCBhIGNhdGNoXG4gICAgLy8gb3IgYSBmaW5hbGx5IGJsb2NrKSBnaXZlcyB1cyBhIHBsYWNlIHRvIHN0b3JlIHZhbHVlcyB0aHJvd24gZnJvbVxuICAgIC8vIGxvY2F0aW9ucyB3aGVyZSB0aGVyZSBpcyBubyBlbmNsb3NpbmcgdHJ5IHN0YXRlbWVudC5cbiAgICB0aGlzLnRyeUVudHJpZXMgPSBbeyB0cnlMb2M6IFwicm9vdFwiIH1dO1xuICAgIHRyeUxvY3NMaXN0LmZvckVhY2gocHVzaFRyeUVudHJ5LCB0aGlzKTtcbiAgICB0aGlzLnJlc2V0KCk7XG4gIH1cblxuICBydW50aW1lLmtleXMgPSBmdW5jdGlvbihvYmplY3QpIHtcbiAgICB2YXIga2V5cyA9IFtdO1xuICAgIGZvciAodmFyIGtleSBpbiBvYmplY3QpIHtcbiAgICAgIGtleXMucHVzaChrZXkpO1xuICAgIH1cbiAgICBrZXlzLnJldmVyc2UoKTtcblxuICAgIC8vIFJhdGhlciB0aGFuIHJldHVybmluZyBhbiBvYmplY3Qgd2l0aCBhIG5leHQgbWV0aG9kLCB3ZSBrZWVwXG4gICAgLy8gdGhpbmdzIHNpbXBsZSBhbmQgcmV0dXJuIHRoZSBuZXh0IGZ1bmN0aW9uIGl0c2VsZi5cbiAgICByZXR1cm4gZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgIHdoaWxlIChrZXlzLmxlbmd0aCkge1xuICAgICAgICB2YXIga2V5ID0ga2V5cy5wb3AoKTtcbiAgICAgICAgaWYgKGtleSBpbiBvYmplY3QpIHtcbiAgICAgICAgICBuZXh0LnZhbHVlID0ga2V5O1xuICAgICAgICAgIG5leHQuZG9uZSA9IGZhbHNlO1xuICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFRvIGF2b2lkIGNyZWF0aW5nIGFuIGFkZGl0aW9uYWwgb2JqZWN0LCB3ZSBqdXN0IGhhbmcgdGhlIC52YWx1ZVxuICAgICAgLy8gYW5kIC5kb25lIHByb3BlcnRpZXMgb2ZmIHRoZSBuZXh0IGZ1bmN0aW9uIG9iamVjdCBpdHNlbGYuIFRoaXNcbiAgICAgIC8vIGFsc28gZW5zdXJlcyB0aGF0IHRoZSBtaW5pZmllciB3aWxsIG5vdCBhbm9ueW1pemUgdGhlIGZ1bmN0aW9uLlxuICAgICAgbmV4dC5kb25lID0gdHJ1ZTtcbiAgICAgIHJldHVybiBuZXh0O1xuICAgIH07XG4gIH07XG5cbiAgZnVuY3Rpb24gdmFsdWVzKGl0ZXJhYmxlKSB7XG4gICAgaWYgKGl0ZXJhYmxlKSB7XG4gICAgICB2YXIgaXRlcmF0b3JNZXRob2QgPSBpdGVyYWJsZVtpdGVyYXRvclN5bWJvbF07XG4gICAgICBpZiAoaXRlcmF0b3JNZXRob2QpIHtcbiAgICAgICAgcmV0dXJuIGl0ZXJhdG9yTWV0aG9kLmNhbGwoaXRlcmFibGUpO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIGl0ZXJhYmxlLm5leHQgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICByZXR1cm4gaXRlcmFibGU7XG4gICAgICB9XG5cbiAgICAgIGlmICghaXNOYU4oaXRlcmFibGUubGVuZ3RoKSkge1xuICAgICAgICB2YXIgaSA9IC0xLCBuZXh0ID0gZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgICAgICB3aGlsZSAoKytpIDwgaXRlcmFibGUubGVuZ3RoKSB7XG4gICAgICAgICAgICBpZiAoaGFzT3duLmNhbGwoaXRlcmFibGUsIGkpKSB7XG4gICAgICAgICAgICAgIG5leHQudmFsdWUgPSBpdGVyYWJsZVtpXTtcbiAgICAgICAgICAgICAgbmV4dC5kb25lID0gZmFsc2U7XG4gICAgICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIG5leHQudmFsdWUgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgbmV4dC5kb25lID0gdHJ1ZTtcblxuICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBuZXh0Lm5leHQgPSBuZXh0O1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFJldHVybiBhbiBpdGVyYXRvciB3aXRoIG5vIHZhbHVlcy5cbiAgICByZXR1cm4geyBuZXh0OiBkb25lUmVzdWx0IH07XG4gIH1cbiAgcnVudGltZS52YWx1ZXMgPSB2YWx1ZXM7XG5cbiAgZnVuY3Rpb24gZG9uZVJlc3VsdCgpIHtcbiAgICByZXR1cm4geyB2YWx1ZTogdW5kZWZpbmVkLCBkb25lOiB0cnVlIH07XG4gIH1cblxuICBDb250ZXh0LnByb3RvdHlwZSA9IHtcbiAgICBjb25zdHJ1Y3RvcjogQ29udGV4dCxcblxuICAgIHJlc2V0OiBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMucHJldiA9IDA7XG4gICAgICB0aGlzLm5leHQgPSAwO1xuICAgICAgdGhpcy5zZW50ID0gdW5kZWZpbmVkO1xuICAgICAgdGhpcy5kb25lID0gZmFsc2U7XG4gICAgICB0aGlzLmRlbGVnYXRlID0gbnVsbDtcblxuICAgICAgdGhpcy50cnlFbnRyaWVzLmZvckVhY2gocmVzZXRUcnlFbnRyeSk7XG5cbiAgICAgIC8vIFByZS1pbml0aWFsaXplIGF0IGxlYXN0IDIwIHRlbXBvcmFyeSB2YXJpYWJsZXMgdG8gZW5hYmxlIGhpZGRlblxuICAgICAgLy8gY2xhc3Mgb3B0aW1pemF0aW9ucyBmb3Igc2ltcGxlIGdlbmVyYXRvcnMuXG4gICAgICBmb3IgKHZhciB0ZW1wSW5kZXggPSAwLCB0ZW1wTmFtZTtcbiAgICAgICAgICAgaGFzT3duLmNhbGwodGhpcywgdGVtcE5hbWUgPSBcInRcIiArIHRlbXBJbmRleCkgfHwgdGVtcEluZGV4IDwgMjA7XG4gICAgICAgICAgICsrdGVtcEluZGV4KSB7XG4gICAgICAgIHRoaXNbdGVtcE5hbWVdID0gbnVsbDtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgc3RvcDogZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLmRvbmUgPSB0cnVlO1xuXG4gICAgICB2YXIgcm9vdEVudHJ5ID0gdGhpcy50cnlFbnRyaWVzWzBdO1xuICAgICAgdmFyIHJvb3RSZWNvcmQgPSByb290RW50cnkuY29tcGxldGlvbjtcbiAgICAgIGlmIChyb290UmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICB0aHJvdyByb290UmVjb3JkLmFyZztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMucnZhbDtcbiAgICB9LFxuXG4gICAgZGlzcGF0Y2hFeGNlcHRpb246IGZ1bmN0aW9uKGV4Y2VwdGlvbikge1xuICAgICAgaWYgKHRoaXMuZG9uZSkge1xuICAgICAgICB0aHJvdyBleGNlcHRpb247XG4gICAgICB9XG5cbiAgICAgIHZhciBjb250ZXh0ID0gdGhpcztcbiAgICAgIGZ1bmN0aW9uIGhhbmRsZShsb2MsIGNhdWdodCkge1xuICAgICAgICByZWNvcmQudHlwZSA9IFwidGhyb3dcIjtcbiAgICAgICAgcmVjb3JkLmFyZyA9IGV4Y2VwdGlvbjtcbiAgICAgICAgY29udGV4dC5uZXh0ID0gbG9jO1xuICAgICAgICByZXR1cm4gISFjYXVnaHQ7XG4gICAgICB9XG5cbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbjtcblxuICAgICAgICBpZiAoZW50cnkudHJ5TG9jID09PSBcInJvb3RcIikge1xuICAgICAgICAgIC8vIEV4Y2VwdGlvbiB0aHJvd24gb3V0c2lkZSBvZiBhbnkgdHJ5IGJsb2NrIHRoYXQgY291bGQgaGFuZGxlXG4gICAgICAgICAgLy8gaXQsIHNvIHNldCB0aGUgY29tcGxldGlvbiB2YWx1ZSBvZiB0aGUgZW50aXJlIGZ1bmN0aW9uIHRvXG4gICAgICAgICAgLy8gdGhyb3cgdGhlIGV4Y2VwdGlvbi5cbiAgICAgICAgICByZXR1cm4gaGFuZGxlKFwiZW5kXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA8PSB0aGlzLnByZXYpIHtcbiAgICAgICAgICB2YXIgaGFzQ2F0Y2ggPSBoYXNPd24uY2FsbChlbnRyeSwgXCJjYXRjaExvY1wiKTtcbiAgICAgICAgICB2YXIgaGFzRmluYWxseSA9IGhhc093bi5jYWxsKGVudHJ5LCBcImZpbmFsbHlMb2NcIik7XG5cbiAgICAgICAgICBpZiAoaGFzQ2F0Y2ggJiYgaGFzRmluYWxseSkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmNhdGNoTG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuY2F0Y2hMb2MsIHRydWUpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuZmluYWxseUxvYyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9IGVsc2UgaWYgKGhhc0NhdGNoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuY2F0Y2hMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5jYXRjaExvYywgdHJ1ZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9IGVsc2UgaWYgKGhhc0ZpbmFsbHkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuZmluYWxseUxvYyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwidHJ5IHN0YXRlbWVudCB3aXRob3V0IGNhdGNoIG9yIGZpbmFsbHlcIik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIGFicnVwdDogZnVuY3Rpb24odHlwZSwgYXJnKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA8PSB0aGlzLnByZXYgJiZcbiAgICAgICAgICAgIGhhc093bi5jYWxsKGVudHJ5LCBcImZpbmFsbHlMb2NcIikgJiZcbiAgICAgICAgICAgIHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICB2YXIgZmluYWxseUVudHJ5ID0gZW50cnk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGZpbmFsbHlFbnRyeSAmJlxuICAgICAgICAgICh0eXBlID09PSBcImJyZWFrXCIgfHxcbiAgICAgICAgICAgdHlwZSA9PT0gXCJjb250aW51ZVwiKSAmJlxuICAgICAgICAgIGZpbmFsbHlFbnRyeS50cnlMb2MgPD0gYXJnICYmXG4gICAgICAgICAgYXJnIDw9IGZpbmFsbHlFbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgIC8vIElnbm9yZSB0aGUgZmluYWxseSBlbnRyeSBpZiBjb250cm9sIGlzIG5vdCBqdW1waW5nIHRvIGFcbiAgICAgICAgLy8gbG9jYXRpb24gb3V0c2lkZSB0aGUgdHJ5L2NhdGNoIGJsb2NrLlxuICAgICAgICBmaW5hbGx5RW50cnkgPSBudWxsO1xuICAgICAgfVxuXG4gICAgICB2YXIgcmVjb3JkID0gZmluYWxseUVudHJ5ID8gZmluYWxseUVudHJ5LmNvbXBsZXRpb24gOiB7fTtcbiAgICAgIHJlY29yZC50eXBlID0gdHlwZTtcbiAgICAgIHJlY29yZC5hcmcgPSBhcmc7XG5cbiAgICAgIGlmIChmaW5hbGx5RW50cnkpIHtcbiAgICAgICAgdGhpcy5uZXh0ID0gZmluYWxseUVudHJ5LmZpbmFsbHlMb2M7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmNvbXBsZXRlKHJlY29yZCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH0sXG5cbiAgICBjb21wbGV0ZTogZnVuY3Rpb24ocmVjb3JkLCBhZnRlckxvYykge1xuICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgdGhyb3cgcmVjb3JkLmFyZztcbiAgICAgIH1cblxuICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcImJyZWFrXCIgfHxcbiAgICAgICAgICByZWNvcmQudHlwZSA9PT0gXCJjb250aW51ZVwiKSB7XG4gICAgICAgIHRoaXMubmV4dCA9IHJlY29yZC5hcmc7XG4gICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcInJldHVyblwiKSB7XG4gICAgICAgIHRoaXMucnZhbCA9IHJlY29yZC5hcmc7XG4gICAgICAgIHRoaXMubmV4dCA9IFwiZW5kXCI7XG4gICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcIm5vcm1hbFwiICYmIGFmdGVyTG9jKSB7XG4gICAgICAgIHRoaXMubmV4dCA9IGFmdGVyTG9jO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICBmaW5pc2g6IGZ1bmN0aW9uKGZpbmFsbHlMb2MpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkuZmluYWxseUxvYyA9PT0gZmluYWxseUxvYykge1xuICAgICAgICAgIHRoaXMuY29tcGxldGUoZW50cnkuY29tcGxldGlvbiwgZW50cnkuYWZ0ZXJMb2MpO1xuICAgICAgICAgIHJlc2V0VHJ5RW50cnkoZW50cnkpO1xuICAgICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIFwiY2F0Y2hcIjogZnVuY3Rpb24odHJ5TG9jKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA9PT0gdHJ5TG9jKSB7XG4gICAgICAgICAgdmFyIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb247XG4gICAgICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICAgIHZhciB0aHJvd24gPSByZWNvcmQuYXJnO1xuICAgICAgICAgICAgcmVzZXRUcnlFbnRyeShlbnRyeSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB0aHJvd247XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gVGhlIGNvbnRleHQuY2F0Y2ggbWV0aG9kIG11c3Qgb25seSBiZSBjYWxsZWQgd2l0aCBhIGxvY2F0aW9uXG4gICAgICAvLyBhcmd1bWVudCB0aGF0IGNvcnJlc3BvbmRzIHRvIGEga25vd24gY2F0Y2ggYmxvY2suXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJpbGxlZ2FsIGNhdGNoIGF0dGVtcHRcIik7XG4gICAgfSxcblxuICAgIGRlbGVnYXRlWWllbGQ6IGZ1bmN0aW9uKGl0ZXJhYmxlLCByZXN1bHROYW1lLCBuZXh0TG9jKSB7XG4gICAgICB0aGlzLmRlbGVnYXRlID0ge1xuICAgICAgICBpdGVyYXRvcjogdmFsdWVzKGl0ZXJhYmxlKSxcbiAgICAgICAgcmVzdWx0TmFtZTogcmVzdWx0TmFtZSxcbiAgICAgICAgbmV4dExvYzogbmV4dExvY1xuICAgICAgfTtcblxuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuICB9O1xufSkoXG4gIC8vIEFtb25nIHRoZSB2YXJpb3VzIHRyaWNrcyBmb3Igb2J0YWluaW5nIGEgcmVmZXJlbmNlIHRvIHRoZSBnbG9iYWxcbiAgLy8gb2JqZWN0LCB0aGlzIHNlZW1zIHRvIGJlIHRoZSBtb3N0IHJlbGlhYmxlIHRlY2huaXF1ZSB0aGF0IGRvZXMgbm90XG4gIC8vIHVzZSBpbmRpcmVjdCBldmFsICh3aGljaCB2aW9sYXRlcyBDb250ZW50IFNlY3VyaXR5IFBvbGljeSkuXG4gIHR5cGVvZiBnbG9iYWwgPT09IFwib2JqZWN0XCIgPyBnbG9iYWwgOlxuICB0eXBlb2Ygd2luZG93ID09PSBcIm9iamVjdFwiID8gd2luZG93IDpcbiAgdHlwZW9mIHNlbGYgPT09IFwib2JqZWN0XCIgPyBzZWxmIDogdGhpc1xuKTtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4vbGliL2JhYmVsL3BvbHlmaWxsXCIpO1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYmFiZWwtY29yZS9wb2x5ZmlsbFwiKTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqIEZhY3Rvcnkgd2hlcmUgd2UgY29uc3RydWN0IGEgaG9yaXpvbnRhbCBoZXhhZ29uIG1hcCBmb3IgdGVzdCBhbmQgZGV2ZWxvcG1lbnQgcHVycG9zZXNcbiAqXG4gKiBAcmVxdWlyZSBjcmVhdGVqcyBmcmFtZXdvcmsgaW4gZ2xvYmFsIG5hbWVzcGFjZVxuICogQHJlcXVpcmUgY2FudmFzIEhUTUw1LWVsZW1lbnQgdG8gd29yay4gVGhpcyBpcyBtb3JlIGZvciBub2RlLmpzXG4gKiBAdG9kbyBBZGQgZG9jdW1lbnRhdGlvbiBhbmQgcmVmYWN0b3IgKG1heWJlIG1vZHVsYXJpemUgLyBmdW5jdGlvbmFsaXplKSB0aGUgYWN0dWFsIGxvZ2ljICovXG5cbi8qID09PT09PSBPd24gbW9kdWxlIGltcG9ydHMgPT09PT09ICovXG5pbXBvcnQgeyBNYXAgfSBmcm9tICcuLi9tYXAvY29yZS9waXhpX01hcCc7XG5cbmltcG9ydCB7IE9iamVjdF90ZXJyYWluIH0gZnJvbSAnLi4vbWFwL2V4dGVuc2lvbnMvaGV4YWdvbnMvb2JqZWN0L3BpeGlfT2JqZWN0X3RlcnJhaW5faGV4YSc7XG5pbXBvcnQgeyBPYmplY3RfdW5pdCB9IGZyb20gJy4uL21hcC9leHRlbnNpb25zL2hleGFnb25zL29iamVjdC9waXhpX09iamVjdF91bml0X2hleGEnO1xuaW1wb3J0IHsgc3ByaXRlc2hlZXRMaXN0IH0gZnJvbSAnLi4vbWFwL2NvcmUvcGl4aV9zcHJpdGVzaGVldExpc3QnO1xuaW1wb3J0IHsgcmVzaXplVXRpbHMgfSBmcm9tICcuLi9tYXAvY29yZS91dGlscy91dGlscyc7XG5cbnZhciBhbGxTcHJpdGVzaGVldHMgPSBzcHJpdGVzaGVldExpc3QoKTtcbi8vaW1wb3J0IHsgVUkgfSBmcm9tICcuLi9tYXAvY29yZS9VSSc7XG4vL2ltcG9ydCB7IFVJX2RlZmF1bHQgfSBmcm9tIFwiLi4vbWFwL1VJcy9kZWZhdWx0L2RlZmF1bHQuanNcIjtcbmltcG9ydCB7IGV2ZW50TGlzdGVuZXJzIH0gZnJvbSAnLi4vbWFwL2NvcmUvZXZlbnRsaXN0ZW5lcnMnO1xuXG52YXIgZnVuY3Rpb25zSW5PYmogPSB7XG4gIE9iamVjdF90ZXJyYWluLFxuICBPYmplY3RfdW5pdFxufTtcblxuLyogPT09PT0gRVhQT1JUID09PT09ICovXG4vKipcbiAqIEBwYXJhbSB7RE9NRWxlbWVudCBDYW52YXN9IGNhbnZhc0VsZW1lbnQgdGhlIGNhbnZhcyBlbGVtZW50IGZvciB0aGUgbWFwXG4gKiBAcGFyYW0ge09iamVjdH0gZ2FtZURhdGFBcmcgZ2FtZURhdGEuIE1vcmUgc3BlY2lmaWMgZGF0YSBpbiBkYXRhLWZvbGRlcnMgdGVzdC1kYXRhc1xuICogQHBhcmFtIHtiaWdhc3MgT2JqZWN0fSBtYXBEYXRhIC0gaG9sZHMgYWxsIHRoZSBzdGFnZSwgbGF5ZXIgYW5kIG9iamVjdCBkYXRhIG5lZWRlZCB0byBjb25zdHJ1Y3QgYSBmdWxsIG1hcC5cbiAqIE1vcmUgc3BlY2lmaWMgZGF0YSBpbiBkYXRhLWZvbGRlcnMgdGVzdC1kYXRhc1xuICogQHBhcmFtIHtPYmplY3R9IHR5cGVEYXRhQXJnIHR5cGVEYXRhLiBNb3JlIHNwZWNpZmljIGRhdGEgaW4gZGF0YS1mb2xkZXJzIHRlc3QtZGF0YXMuXG4qL1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlTWFwKGNhbnZhc0VsZW1lbnQsIGRhdGFzKSB7XG4gIGNvbnNvbGUubG9nKFwiPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cIilcbiAgdmFyIG1hcERhdGEgPSAodHlwZW9mIGRhdGFzLm1hcCA9PT0gXCJzdHJpbmdcIikgPyBKU09OLnBhcnNlKGRhdGFzLm1hcCkgOiBkYXRhcy5tYXA7XG4gIHZhciB0eXBlRGF0YSA9ICh0eXBlb2YgZGF0YXMudHlwZSA9PT0gXCJzdHJpbmdcIikgPyBKU09OLnBhcnNlKGRhdGFzLnR5cGUpIDogZGF0YXMudHlwZTtcbiAgdmFyIGdhbWVEYXRhID0gKHR5cGVvZiBkYXRhcy5nYW1lID09PSBcInN0cmluZ1wiKSA/IEpTT04ucGFyc2UoZGF0YXMuZ2FtZSkgOiBkYXRhcy5nYW1lO1xuICB2YXIgd2luZG93U2l6ZSA9IHJlc2l6ZVV0aWxzLmdldFdpbmRvd1NpemUoKTtcbiAgdmFyIG1hcE9wdGlvbnMgPSB7XG4gICAgbWFwU2l6ZTogZ2FtZURhdGEubWFwU2l6ZSxcbiAgICBib3VuZHM6IHtcbiAgICAgIHdpZHRoOiB3aW5kb3dTaXplLndpZHRoLFxuICAgICAgaGVpZ2h0OiB3aW5kb3dTaXplLmhlaWdodFxuICAgIH0sXG4gICAgcmVuZGVyZXI6IHtcbiAgICAgIGF1dG9SZXNpemU6IHRydWUsXG4gICAgICB0cmFuc3BhcmVudDogdHJ1ZSxcbiAgICAgIGFudGlhbGlhczogZmFsc2UgLy8gVEVTVC4gT25seSBzaG91bGQgd29yayBpbiBjaHJvbWUgYXRtLj9cbiAgICAgIC8vcmVzb2x1dGlvbjogY2hhbmdpbmNWYXJpYWJsZSAtIFdlIG1pZ2h0IG5lZWQgdGhpcyBsYXRlciBvbiwgd2hlbiBkb2luZyBtb2JpbGUgb3B0aW1pemF0aW9ucywgZm9yIGRpZmZlcmVudCBwaXplbCBkZW5zaXR5IGRldmljZXNcbiAgICB9XG4gIH07XG4gIHZhciBtYXAgPSBuZXcgTWFwKGNhbnZhc0VsZW1lbnQsIG1hcE9wdGlvbnMgKSA7XG4gIC8vdmFyIGRpYWxvZ19zZWxlY3Rpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlbGVjdGlvbkRpYWxvZ1wiKTtcbiAgLy92YXIgZGVmYXVsdFVJID0gbmV3IFVJX2RlZmF1bHQoZGlhbG9nX3NlbGVjdGlvbik7XG4gIC8vZGVmYXVsdFVJLmluaXQoKTtcblxuICAvKiBJbml0aWFsaXplIFVJIGFzIHNpbmdsZXRvbiAqL1xuICAvL1VJKGRlZmF1bHRVSSwgbWFwKTtcblxuICAvKiBXZSBpdGVyYXRlIHRocm91Z2ggdGhlIGdpdmVuIG1hcCBkYXRhIGFuZCBjcmVhdGUgb2JqZWN0cyBhY2NvcmRpbmdseSAqL1xuICAvL2ZvcihsZXQgaWEgPSAwOyBpYSA8IDEwMDsgaWErKykge1xuICBtYXBEYXRhLmxheWVycy5mb3JFYWNoKCBsYXllckRhdGEgPT4ge1xuICAgIGxldCB0aGlzTGF5ZXI7XG5cbiAgICB0cnkge1xuICAgICAgdGhpc0xheWVyID0gbWFwLmFkZExheWVyKCBsYXllckRhdGEubmFtZSwgZmFsc2UsIGxheWVyRGF0YS5jb29yZCApO1xuICAgIH0gY2F0Y2goZSkge1xuICAgICAgY29uc29sZS5sb2coXCJQcm9ibGVtOlwiLCBsYXllckRhdGEudHlwZSwgZS5zdGFjayk7XG4gICAgfVxuXG4gICAgbGF5ZXJEYXRhLm9iamVjdEdyb3Vwcy5mb3JFYWNoKCBvYmplY3RHcm91cCA9PiB7XG4gICAgICBsZXQgc3ByaXRlc2hlZXRUeXBlID0gb2JqZWN0R3JvdXAudHlwZUltYWdlRGF0YTtcblxuICAgICAgaWYoIXNwcml0ZXNoZWV0VHlwZSkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIHdpdGggc3ByaXRlc2hlZXRUeXBlLWRhdGFcIik7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgb2JqZWN0R3JvdXAub2JqZWN0cy5mb3JFYWNoKCBvYmplY3QgPT4ge1xuICAgICAgICBsZXQgb2JqVHlwZURhdGEgPSB0eXBlRGF0YS5vYmplY3REYXRhW3Nwcml0ZXNoZWV0VHlwZV1bb2JqZWN0Lm9ialR5cGVdO1xuXG4gICAgICAgIGlmKCFvYmpUeXBlRGF0YSkge1xuICAgICAgICAgIGNvbnNvbGUuZGVidWcoXCJCYWQgbWFwRGF0YSBmb3IgdHlwZTpcIiwgc3ByaXRlc2hlZXRUeXBlLCBvYmplY3Qub2JqVHlwZSwgb2JqZWN0Lm5hbWUpO1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkJhZCBtYXBEYXRhIGZvciB0eXBlOlwiLCBzcHJpdGVzaGVldFR5cGUsIG9iamVjdC5vYmpUeXBlLCBvYmplY3QubmFtZSk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgY3VycmVudEZyYW1lID0gUElYSS51dGlscy5UZXh0dXJlQ2FjaGVbb2JqVHlwZURhdGEuaW1hZ2VdO1xuICAgICAgICBsZXQgb2JqRGF0YSA9IHtcbiAgICAgICAgICB0eXBlRGF0YTogb2JqVHlwZURhdGEsXG4gICAgICAgICAgYWN0aXZlRGF0YTogb2JqZWN0LmRhdGFcbiAgICAgICAgfTtcbiAgICAgICAgbGV0IG5ld09iamVjdCA9IG5ldyBmdW5jdGlvbnNJbk9ialtvYmplY3RHcm91cC50eXBlXSggb2JqZWN0LmNvb3JkLCBvYmpEYXRhLCBjdXJyZW50RnJhbWUsIHsgcmFkaXVzOiA0MiB9ICk7XG5cbiAgICAgICAgdGhpc0xheWVyLmFkZENoaWxkKCBuZXdPYmplY3QgKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbiAgLy99XG5cbiAgbWFwLm1vdmVNYXAobWFwRGF0YS5zdGFydFBvaW50KTtcblxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRlc3RGdWxsc2NyZWVuXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbigpIHtcbiAgICBldmVudExpc3RlbmVycy50b2dnbGVGdWxsU2NyZWVuKCk7XG4gIH0pO1xuXG4gIHdpbmRvdy5tYXAgPSBtYXA7XG5cbiAgcmV0dXJuIG1hcDtcbn0iLCIvKiogTWFpbiBjbGFzcyBmb3Igc2hvd2luZyBVSSBvbiB0aGUgbWFwLiBMaWtlIHVuaXQgc2VsZWN0aW9ucyBhbmQgc3VjaC4gSGFzIG5vdGhpbmcgdG8gZG8gd2l0aCBzaG93aW5nIG9mZi1tYXAgZGF0YS5cbiAqIEdvb2QgZXhhbXBsZXMgZm9yIHdoYXQgdGhpcyBzaG93cyBhcmU6IHNlbGVjdGVkIHVuaXRzLWxpc3QsIHNlbGVjdGlvbiBoaWdobGlnaHQgKGxpa2UgYSBjaXJjbGUgb24gdGhlIHNlbGVjdGVkIHVuaXQpIGFuZFxuICogYnJpbmdpbmcgdGhlIHVuaXQgb24gdG9wIGluIHRoZSBtYXAuXG4gKlxuICogQHBhcmFtIHtNb2R1bGV9IGdpdmVuVUlUaGVtZSB0aGUgbW9kdWxlIHRoYXQgd2lsbCBiZSB1c2VkIGZvciB0aGUgVUkgdGhlbWVcbiAqIEBwYXJhbSB7TWFwfSBnaXZlbk1hcCBNYXAgaW5zdGFuY2UgdGhhdCBpcyB1c2VkXG4gKiBAcmV0dXJuIFVJIG1vZHVsZVxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG4vKiogVGhlIGFic3RyYWN0IFVJIG1vZHVsZSBmb3IgdGhlIGNvcmUgbWFwIGZ1bmN0aW9uYWxpdHkuIFRoaXMgaXMgdXNlZCBieSBkZWZpbmluZyBVSSBUaGVtZXMgdGhhdCBpbXBsZW1lbnQgdGhpc1xuICogY29yZSBVSSBtb2R1bGUuXG4gKiBEZWZhdWx0IG1ldGhvZHMgdG8gdXNlIGluIFVJIGFyZTpcbiAqIHNob3dTZWxlY3Rpb25zIGFuZCBoaWdobGlnaHRTZWxlY3RlZE9iamVjdC4gTW9yZSBtZXRob2RzIGNhbiBiZSBleHRlbmRlZCB0byBVSSB3aXRoIHBsdWdpbnNcbiAqXG4gKiBAdG9kbyBOb3QgaW1wbGVtZW50ZWQgZnVsbHkgeWV0IGFuZCBwcm9iYWJseSBuZWVkIHJlZmFjdG9yaW5nICovXG52YXIgc2NvcGU7XG5cbmV4cG9ydCBmdW5jdGlvbiBVSSAoZ2l2ZW5VSVRoZW1lLCBnaXZlbk1hcCkge1xuICAvKiBTSU5HTEVUT04gTU9EVUxFICovXG4gIGlmIChzY29wZSkge1xuICAgIHJldHVybiBzY29wZTtcbiAgfVxuXG4gIGlmICghZ2l2ZW5VSVRoZW1lIHx8ICFnaXZlbk1hcCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIlVJLW1vZHVsZSByZXF1aXJlcyBVSVRoZW1lIGFuZCBtYXAgb2JqZWN0XCIpO1xuICB9XG5cbiAgdmFyIG1hcCA9IGdpdmVuTWFwO1xuICB2YXIgVUlUaGVtZSA9IGdpdmVuVUlUaGVtZTtcbiAgc2NvcGUgPSB7fTtcblxuICAvKiogUmVzcG9uc2libGUgZm9yIHNob3dpbmcgc2VsZWN0aW9uZyBlbGVtZW50LCB3aGVyZSB0aGUgcGxheWVyIHNlbGVjdCB0aGUgd2FudGVkIG9iamVjdCBvdXQgb2YgYXJyYXkgb2Ygb2JqZWN0cy5cbiAgICogRm9yIGV4YW1wbGUgaWYgdGhlcmUgYXJlIHNldmVyYWwgb2JqZWN0cyBpbiBvbmUgdGlsZSBvbiB0aGUgbWFwIGFuZCB0aGUgcGxheWVyIG5lZWRzIHRvIGJlIGFibGUgdG8gc2VsZWN0IG9uZVxuICAgKiBzcGVjaWZpYyB1bml0IG9uIHRoZSBzdGFjayAqL1xuICBzY29wZS5zaG93U2VsZWN0aW9ucyA9IGZ1bmN0aW9uIHNob3dTZWxlY3Rpb25zKG9iamVjdHMpIHtcbiAgICByZXR1cm4gVUlUaGVtZS5zaG93U2VsZWN0aW9ucyhtYXAsIG9iamVjdHMpO1xuICB9O1xuICAvKiogUmVzb25zaWJsZSBmb3IgaGlnbmxpZ2h0aW5nIHRoZSBzZWxlY3RlZCBvYmplY3QuIEZvciBleGFtcGxlIHRoZSB1bml0IHRoYXQgaXMgYmVpbmcgY29tbWFuZGVkLiBUaGUgaGlnaHRsaWdodFxuICAgKiBjYW4gbWVhbiBlLmcuIGJyaW5naW5nIHRoZSB1bml0IG9uIHRvcCBvbiB0aGUgbWFwIGFuZCBzaG93aW5nIHNlbGVjdGlvbiBjaXJjbGUgYXJvdW5kIGl0LiAqL1xuICBzY29wZS5oaWdobGlnaHRTZWxlY3RlZE9iamVjdCA9IGZ1bmN0aW9uIGhpZ2hsaWdodFNlbGVjdGVkT2JqZWN0KG9iamVjdCkge1xuICAgIHJldHVybiBVSVRoZW1lLmhpZ2hsaWdodFNlbGVjdGVkT2JqZWN0KG1hcCwgb2JqZWN0KTtcbiAgfTtcblxuICByZXR1cm4gc2NvcGU7XG59IiwiJ3VzZSBzdHJpY3QnO1xuXG4vKiBnbG9iYWwgSGFtbWVyLCBjcmVhdGVqcyAqL1xuXG4vKipcbiAqIEhvdXNlcyB0aGUgZGVmYXVsdCBldmVudGxpc3RlbmVycyB1c2VkIGluIHRoZSBtYXAuIFdoZW4gcGx1Z2lucyBhcmUgYWRkZWQgdG8gdGhlIG1hcCB0aGlzIGNsYXNzIGNhbiBiZSB1c2VkIGZvclxuICogdGhlIGV2ZW50bGlzdGVuZXIgbWFuYWdlbWVudC4gVGhpcyB3YXkgYWxsIHRoZSBldmVudGxpc3RlbmVycyBhcmUgaW4gdGhlIHNhbWUgb2JqZWN0LCBjb252ZW5pZW50bHkuXG4gKlxuICogQHJlcXVpcmUgQnJvd3NlciB0aGF0IHN1cHBvcnQgcG9pbnRlciBldmVudHMgb3IgUG9pbnRlciBldmVudHMgcG9seWZpbGwsIHN1Y2ggYXM6IGh0dHBzOi8vZ2l0aHViLmNvbS9qcXVlcnkvUEVQXG4gKiBAcmVxdWlyZSBIYW1tZXIuanMgZm9yIHRvdWNoIGV2ZW50cyovXG5cbnZhciBzaW5nbGV0b25TY29wZTtcblxuLyogPT09PT0gRVhQT1JUID09PT09ICovXG4vKipcbiAqIGV2ZW50TGlzdGVuZXJzIGlzIGEgc2luZ2xldG9uIHRoYXQgbmVlZHMgdG8gYmUgaW5pdGlhbGl6ZWQgd2l0aCBhbiBvYmplY3QsIHRoYXQgaG9sZHMgYWxsIHRoZSBjYWxsYmFja3MgdXNlZCBpbiB0aGlzXG4gKiBjbGFzcy4gSS5lLlxuIHtcbiAgIHNlbGVjdDogZnVuY3Rpb24oKSB7fSxcbiAgIHpvb206IGZ1bmN0aW9uKCkge31cbiB9Ki9cbmV4cG9ydCBsZXQgZXZlbnRMaXN0ZW5lcnMgPSBmdW5jdGlvbiBldmVudExpc3RlbmVyTW9kdWxlKG1hcCwgY2FudmFzRWxlbWVudCkge1xuICBpZihzaW5nbGV0b25TY29wZSkge1xuICAgIHJldHVybiBzaW5nbGV0b25TY29wZTtcbiAgfVxuICBpZighbWFwIHx8ICFjYW52YXNFbGVtZW50KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiZXZlbnRsaXN0ZW5lcnMgaW5pdGlhbGl6YXRpb24gcmVxdWlyZSBtYXAgY2FsbGJhY2tzIGFuZCBjYW52YXMgZWxlbWVudCBhcyBhcmd1bWVudHNcIik7XG4gIH1cblxuICB2YXIgbWFwQ0JzID0gbWFwLmV2ZW50Q0JzO1xuXG4gIHNpbmdsZXRvblNjb3BlID0ge1xuICAgIHN0YXRlczoge31cbiAgfTtcblxuICBzaW5nbGV0b25TY29wZS50b2dnbGVGdWxsU2l6ZUxpc3RlbmVyID0gZnVuY3Rpb24gdG9nZ2xlRnVsbFNpemVMaXN0ZW5lcigpIHtcbiAgICBpZihzaW5nbGV0b25TY29wZS5zdGF0ZXMuZnVsbFNpemUgIT09IHRydWUpIHtcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIG1hcENCcy5mdWxsU2l6ZUNCKTtcbiAgICAgIHNpbmdsZXRvblNjb3BlLnN0YXRlcy5mdWxsU2l6ZSA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIG1hcENCcy5mdWxsU2l6ZUNCKTtcbiAgICAgIHNpbmdsZXRvblNjb3BlLnN0YXRlcy5mdWxsU2l6ZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiBtYXBDQnMuZnVsbFNpemU7XG4gIH07XG4gIHNpbmdsZXRvblNjb3BlLnRvZ2dsZUZ1bGxzY3JlZW4gPSBmdW5jdGlvbiB0b2dnbGVGdWxsc2NyZWVuKCkge1xuICAgIHNpbmdsZXRvblNjb3BlLnN0YXRlcy5mdWxsU2NyZWVuID0gbWFwQ0JzLmZ1bGxzY3JlZW4oKTtcblxuICAgIHJldHVybiBtYXBDQnMuZnVsbHNjcmVlbjtcbiAgfTtcbiAgc2luZ2xldG9uU2NvcGUudG9nZ2xlWm9vbUxpc3RlbmVyID0gZnVuY3Rpb24gdG9nZ2xlWm9vbUxpc3RlbmVyKCkge1xuICAgIGlmKHNpbmdsZXRvblNjb3BlLnN0YXRlcy56b29tICE9PSB0cnVlKSB7XG4gICAgICBpZihpc01vYmlsZVNpdGUoKSkge1xuICAgICAgICB2YXIgaGFtbWVyICAgID0gbmV3IEhhbW1lci5NYW5hZ2VyKGNhbnZhc0VsZW1lbnQpO1xuICAgICAgICB2YXIgcGluY2ggICAgID0gbmV3IEhhbW1lci5QaW5jaCgpO1xuICAgICAgICBoYW1tZXIuYWRkKHBpbmNoKTtcbiAgICAgICAgaGFtbWVyLm9uKFwicGluY2hcIiwgbWFwQ0JzLnpvb20pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLyogSGFtc3RlciBoYW5kbGVzIHdoZWVsIGV2ZW50cyByZWFsbHkgbmljZWx5ICovXG4gICAgICAgIEhhbXN0ZXIoY2FudmFzRWxlbWVudCkud2hlZWwobWFwQ0JzLnpvb20pO1xuICAgICAgfVxuXG4gICAgICBzaW5nbGV0b25TY29wZS5zdGF0ZXMuem9vbSA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmKGlzTW9iaWxlU2l0ZSgpKSB7XG4gICAgICAgIGhhbW1lci5vbihcInBpbmNoXCIsIG1hcENCcy56b29tKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIEhhbXN0ZXIoY2FudmFzRWxlbWVudCkudW53aGVlbChtYXBDQnMuem9vbSk7XG4gICAgICB9XG5cbiAgICAgIHNpbmdsZXRvblNjb3BlLnN0YXRlcy56b29tID0gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1hcENCcy56b29tO1xuICB9O1xuICBzaW5nbGV0b25TY29wZS50b2dnbGVEcmFnTGlzdGVuZXIgPSBmdW5jdGlvbiB0b2dnbGVEcmFnTGlzdGVuZXIoKSB7XG4gICAgaWYoc2luZ2xldG9uU2NvcGUuc3RhdGVzLmRyYWcgIT09IHRydWUpIHtcbiAgICAgIGlmKGlzTW9iaWxlU2l0ZSgpKSB7XG4gICAgICAgIHZhciBoYW1tZXIgPSBuZXcgSGFtbWVyLk1hbmFnZXIoY2FudmFzRWxlbWVudCk7XG4gICAgICAgIHZhciBwYW4gPSBuZXcgSGFtbWVyLlBhbih7XG4gICAgICAgICAgcG9pbnRlcnM6IDEsXG4gICAgICAgICAgdGhyZXNob2xkOiA1LFxuICAgICAgICAgIGRpcmVjdGlvbjpcdEhhbW1lci5ESVJFQ1RJT05fQUxMIH0pO1xuICAgICAgICBoYW1tZXIuYWRkKHBhbik7XG4gICAgICAgIGhhbW1lci5vbihcInBhblwiLCBtYXBDQnMuZHJhZyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjYW52YXNFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgbWFwQ0JzLmRyYWcpO1xuICAgICAgfVxuXG4gICAgICBzaW5nbGV0b25TY29wZS5zdGF0ZXMuZHJhZyA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmKGlzTW9iaWxlU2l0ZSgpKSB7XG4gICAgICAgIGhhbW1lci5vZmYoXCJwYW5cIiwgbWFwQ0JzLmRyYWcpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2FudmFzRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIG1hcENCcy5kcmFnKTtcbiAgICAgIH1cblxuICAgICAgc2luZ2xldG9uU2NvcGUuc3RhdGVzLmRyYWcgPSBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4gbWFwQ0JzLmRyYWc7XG4gIH07XG4gIHNpbmdsZXRvblNjb3BlLnRvZ2dsZVNlbGVjdExpc3RlbmVyID0gZnVuY3Rpb24gdG9nZ2xlU2VsZWN0TGlzdGVuZXIoKSB7XG4gICAgaWYoc2luZ2xldG9uU2NvcGUuc3RhdGVzLnNlbGVjdCAhPT0gdHJ1ZSkge1xuICAgICAgaWYoaXNNb2JpbGVTaXRlKCkpIHtcbiAgICAgICAgdmFyIGhhbW1lciAgICA9IG5ldyBIYW1tZXIuTWFuYWdlcihjYW52YXNFbGVtZW50KTtcbiAgICAgICAgdmFyIHRhcCAgICAgPSBuZXcgSGFtbWVyLlRhcCgpO1xuICAgICAgICBoYW1tZXIuYWRkKHRhcCk7XG4gICAgICAgIGhhbW1lci5vbihcInRhcFwiLCBtYXBDQnMuc2VsZWN0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNhbnZhc0VsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCBtYXBDQnMuc2VsZWN0KTtcbiAgICAgIH1cblxuICAgICAgc2luZ2xldG9uU2NvcGUuc3RhdGVzLnNlbGVjdCA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmKGlzTW9iaWxlU2l0ZSgpKSB7XG4gICAgICAgIGhhbW1lci5vZmYoXCJ0YXBcIiwgbWFwQ0JzLnNlbGVjdCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjYW52YXNFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgbWFwQ0JzLnNlbGVjdCk7XG4gICAgICB9XG5cbiAgICAgIHNpbmdsZXRvblNjb3BlLnN0YXRlcy5zZWxlY3QgPSBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4gbWFwQ0JzLnNlbGVjdDtcbiAgfTtcblxuICByZXR1cm4gc2luZ2xldG9uU2NvcGU7XG59O1xuXG5mdW5jdGlvbiBpc01vYmlsZVNpdGUoKSB7XG4gIHJldHVybiB0eXBlb2YgSGFtbWVyICE9ICd1bmRlZmluZWQnO1xufSIsIid1c2Ugc3RyaWN0JztcblxuLyoqIFRoZSBjb3JlIHBsdWdpbiBmb3IgdGhlIDJEIG1hcCBlbmdpbmUuIEhhbmRsZXMgbW92aW5nIHRoZSBtYXAgYnkgZHJhZ2dpbmcgdGhlIG1hcC5cbiAqIENvcmUgcGx1Z2lucyBjYW4gYWx3YXlzIGJlIG92ZXJ3cm90ZSBpZiBuZWVkZWRcbiAqXG4gKiBAcmVxdWlyZSBCcm93c2VyIHRoYXQgc3VwcG9ydCBwb2ludGVyIGV2ZW50cyBvciBQb2ludGVyIGV2ZW50cyBwb2x5ZmlsbCwgc3VjaCBhczogaHR0cHM6Ly9naXRodWIuY29tL2pxdWVyeS9QRVBcbiAqIEB0b2RvIFNlZSBpZiB0aGlzIHBsdWdpbiBuZWVkIHJlZmFjdG9yaW5nIGFuZCBtb3JlIGRvY3VtZW50YXRpb24gKi9cblxuaW1wb3J0IHsgZXZlbnRMaXN0ZW5lcnMgYXMgZXZlbnRMaXN0ZW5lck1vZCB9IGZyb20gJy4uL2V2ZW50bGlzdGVuZXJzJztcbmltcG9ydCB7IG1vdXNlVXRpbHMgfSBmcm9tICcuLi91dGlscy91dGlscyc7XG5cbmV4cG9ydCBsZXQgbWFwX2RyYWcgPSAoZnVuY3Rpb24gbWFwX2RyYWcoKSB7XG4gIC8qIEZ1bmN0aW9uIGZvciBzZXR0aW5nIGFuZCBnZXR0aW5nIHRoZSBtb3VzZSBvZmZzZXQuIFByaXZhdGUgZnVuY3Rpb25zIGRlY2xhcmVkIGJvdHRvbSAqL1xuICB2YXIgb2Zmc2V0Q29vcmRzID0gX29mZnNldENvb3JkcygpO1xuXG4gIC8qID09PT09PT09PT09PT09PT09PT09PVxuICAgICBNT0RVTEUgQVBJIChpbiBzY29wZSlcbiAgICAgPT09PT09PT09PT09PT09PT09PT09ICovXG4gIHZhciBzY29wZSA9IHt9O1xuICBzY29wZS5wbHVnaW5OYW1lID0gXCJtYXBfZHJhZ1wiO1xuXG4gIC8qKiBSZXF1aXJlZCBpbml0IGZ1bmN0aW9ucyBmb3IgdGhlIHBsdWdpblxuICAqIEBwYXJhbSB7TWFwIG9iamVjdH0gbWFwT2JqIC0gdGhlIE1hcCBjbGFzcyBvYmplY3QgKi9cbiAgc2NvcGUuaW5pdCA9IGZ1bmN0aW9uKG1hcCkge1xuICAgIGlmKG1hcC5tYXBFbnZpcm9ubWVudCgpID09PSBcIm1vYmlsZVwiKSB7XG4gICAgICBtYXAuZXZlbnRDQnMuZHJhZyA9IF9zdGFydERyYWdMaXN0ZW5lcl9tb2JpbGUobWFwKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbWFwLmV2ZW50Q0JzLmRyYWcgPSBfc3RhcnREcmFnTGlzdGVuZXIobWFwKTtcbiAgICB9XG5cbiAgICAvKiBTaW5nbGV0b24gc2hvdWxkIGhhdmUgYmVlbiBpbnN0YW50aWF0ZWQgYmVmb3JlLCB3ZSBvbmx5IHJldHJpZXZlIGl0IHdpdGggMCBwYXJhbXMgKi9cbiAgICBldmVudExpc3RlbmVyTW9kKCkudG9nZ2xlRHJhZ0xpc3RlbmVyKCk7XG4gIH07XG5cbiAgLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgIHByaXZhdGUgZnVuY3Rpb25zIHJldmVhbGVkIGZvciB0ZXN0aW5nXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSovXG4gIHNjb3BlLl9zdGFydERyYWdMaXN0ZW5lciA9IF9zdGFydERyYWdMaXN0ZW5lcjtcblxuICByZXR1cm4gc2NvcGU7XG5cbiAgLyoqIFN0YXJ0cyB0aGUgd2hvbGUgZnVuY3Rpb25hbGl0eSBvZiB0aGlzIGNsYXNzXG4gICAqIEBwYXJhbSB7Y3JlYXRlanMuU3RhZ2V9IHRvcE1vc3RTdGFnZSAtIGNyZWF0ZWpzLlN0YWdlIG9iamVjdCwgdGhhdCBpcyB0aGUgdG9wbW9zdCBvbiB0aGUgbWFwIChtZWFudCBmb3IgaW50ZXJhY3Rpb24pLlxuICAgKiBAcGFyYW0ge01hcH0gbWFwIC0gVGhlIE1hcCBjbGFzcyBvYmplY3RcbiAgICovXG4gIGZ1bmN0aW9uIF9zdGFydERyYWdMaXN0ZW5lciggbWFwICkge1xuICAgIHJldHVybiBmdW5jdGlvbiBzdGFydERyYWcoZSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgb2Zmc2V0Q29vcmRzLnNldE9mZnNldChtb3VzZVV0aWxzLmdldEV2ZW50Q29vcmRzT25QYWdlKGUpKTtcbiAgICAgICAgX2FkZERyYWdMaXN0ZW5lcnMoKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgICB9XG5cbiAgICAgIC8qKiBAcmVxdWlyZXMgbWFwIG9iamVjdHMgdG8gYmUgYWNjZXNzaWJsZSBpbiBzY29wZSAqL1xuICAgICAgZnVuY3Rpb24gX21vdXNldXBMaXN0ZW5lcigpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBfcmVtb3ZlRHJhZ0xpc3RlbmVycygpO1xuICAgICAgICBfbWFwTW92ZWQobWFwKTtcbiAgICAgIH1cbiAgICAgICAgLyoqIEByZXF1aXJlcyBtYXAgb2JqZWN0cyB0byBiZSBhY2Nlc3NpYmxlIGluIHNjb3BlICovXG5cbiAgICAgIGZ1bmN0aW9uIF9kcmFnTGlzdGVuZXIoZSkge1xuICAgICAgICB0cnkge1xuICAgICAgICB2YXIgZXZlbnRDb29yZHMgPSBtb3VzZVV0aWxzLmdldEV2ZW50Q29vcmRzT25QYWdlKGUpO1xuXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICBtYXAubWFwTW92ZWQodHJ1ZSk7XG5cbiAgICAgICAgaWYoZS5idXR0b25zID09PSAwKSB7XG4gICAgICAgICAgX3JlbW92ZURyYWdMaXN0ZW5lcnMoKTtcbiAgICAgICAgICAvKiBTbyB0aGF0IHRoZSBldmVudHMgd2lsbCBzdG9wIHdoZW4gbW91c2UgaXMgdXAsIGV2ZW4gdGhvdWdoIG1vdXNldXAgZXZlbnQgd291bGRuJ3QgZmlyZSAqL1xuICAgICAgICAgIF9tYXBNb3ZlZChtYXApO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIG9mZnNldCA9IG9mZnNldENvb3Jkcy5nZXRPZmZzZXQoKTtcbiAgICAgICAgdmFyIG1vdmVkID0ge1xuICAgICAgICAgIHg6IGV2ZW50Q29vcmRzLnggLSBvZmZzZXQueCxcbiAgICAgICAgICB5OiBldmVudENvb3Jkcy55IC0gb2Zmc2V0LnlcbiAgICAgICAgfTtcblxuICAgICAgICBpZihtb3ZlZC54ID4gMCB8fCBtb3ZlZC55ID4gMCB8fCBtb3ZlZC54IDwgMCB8fCBtb3ZlZC55IDwgMCkge1xuICAgICAgICAgIG1hcC5tb3ZlTWFwKG1vdmVkKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBtYXAubWFwTW92ZWQoZmFsc2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgb2Zmc2V0Q29vcmRzLnNldE9mZnNldCh7XG4gICAgICAgICAgeDogZXZlbnRDb29yZHMueCxcbiAgICAgICAgICB5OiBldmVudENvb3Jkcy55XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8qIFRoZSBtb3VzZSBoYXMgYmVlbiBtb3ZlZCBhZnRlciBwcmVzc2luZy4gVGhpcyBwcmV2ZW50IHRoZSBjbGlja1xuICAgICAgICAgIGV2ZW50IHRvIGZpcmUgYXQgdGhlIHNhbWUgdGltZSB3aXRoIHRoZSBtb3VzZURvd24gLyBkcmFnZ2luZyBldmVudFxuICAgICAgICAqL1xuICAgICAgICAvL21hcC5tb3VzZU1vdmVkKCB0cnVlICk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBfYWRkRHJhZ0xpc3RlbmVycygpIHtcbiAgICAgICAgbWFwLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIF9kcmFnTGlzdGVuZXIpO1xuICAgICAgICBtYXAuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIF9tb3VzZXVwTGlzdGVuZXIpO1xuICAgICAgfVxuICAgICAgZnVuY3Rpb24gX3JlbW92ZURyYWdMaXN0ZW5lcnMoKSB7XG4gICAgICAgIG1hcC5jYW52YXMucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCBfZHJhZ0xpc3RlbmVyKTtcbiAgICAgICAgbWFwLmNhbnZhcy5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCBfbW91c2V1cExpc3RlbmVyKTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gX3N0YXJ0RHJhZ0xpc3RlbmVyX21vYmlsZSggbWFwICkge1xuICAgIHZhciBpbml0aWFsaXplZCA9IGZhbHNlO1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIHN0YXJ0RHJhZyhlKSB7XG4gICAgICB2YXIgY29vcmRzID0gZS5jZW50ZXI7XG5cbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgaWYoIWluaXRpYWxpemVkKSB7XG4gICAgICAgICAgb2Zmc2V0Q29vcmRzLnNldE9mZnNldCh7XG4gICAgICAgICAgICB4OiBjb29yZHMueCxcbiAgICAgICAgICAgIHk6IGNvb3Jkcy55XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgaW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgICAgICAgIG1hcC5tYXBNb3ZlZCh0cnVlKTtcblxuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfSBlbHNlIGlmIChlLmlzRmluYWwgPT09IHRydWUpIHtcbiAgICAgICAgICBpbml0aWFsaXplZCA9IGZhbHNlO1xuICAgICAgICAgIG1hcC5tYXBNb3ZlZChmYWxzZSk7XG4gICAgICAgIH1cblxuICAgICAgICBtYXAubWFwTW92ZWQodHJ1ZSk7XG5cbiAgICAgICAgbGV0IG9mZnNldCA9IG9mZnNldENvb3Jkcy5nZXRPZmZzZXQoKTtcbiAgICAgICAgbGV0IG1vdmVkID0ge1xuICAgICAgICAgICAgeDogY29vcmRzLnggLSBvZmZzZXQueCxcbiAgICAgICAgICAgIHk6IGNvb3Jkcy55IC0gb2Zmc2V0LnlcbiAgICAgICAgICB9O1xuXG4gICAgICAgIGlmKG1vdmVkLnggIT09IDAgfHwgbW92ZWQueSAhPT0gMCkge1xuICAgICAgICAgIG1hcC5tb3ZlTWFwKG1vdmVkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIG9mZnNldENvb3Jkcy5zZXRPZmZzZXQoe1xuICAgICAgICAgIHg6IGNvb3Jkcy54LFxuICAgICAgICAgIHk6IGNvb3Jkcy55XG4gICAgICAgIH0pO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgLyogPT09PT09PT09PT09PT09PT1cbiAgICAgUHJpdmF0ZSBmdW5jdGlvbnNcbiAgICAgPT09PT09PT09PT09PT09PT0gKi9cbiAgLyoqIEZ1bmN0aW9uIGZvciBzZXR0aW5nIGFuZCBnZXR0aW5nIHRoZSBtb3VzZSBvZmZzZXQuICovXG4gIGZ1bmN0aW9uIF9vZmZzZXRDb29yZHMoKSB7XG4gICAgdmFyIHNjb3BlID0ge307XG4gICAgdmFyIG9mZnNldENvb3JkcztcblxuICAgIHNjb3BlLnNldE9mZnNldCA9IGZ1bmN0aW9uIHNldE9mZnNldChjb29yZHMpIHtcbiAgICAgIHJldHVybiBvZmZzZXRDb29yZHMgPSBjb29yZHM7XG4gICAgfTtcbiAgICBzY29wZS5nZXRPZmZzZXQgPSBmdW5jdGlvbiBnZXRPZmZzZXQoKSB7XG4gICAgICByZXR1cm4gb2Zmc2V0Q29vcmRzO1xuICAgIH07XG5cbiAgICByZXR1cm4gc2NvcGU7XG4gIH07XG5cbiAgLyogV2l0aG91dCB0aGlzLCB0aGUgb3RoZXIgZXZlbnRMaXN0ZW5lcnMgbWlnaHQgZmlyZSBpbmFwcHJvcHJpYXRlIGV2ZW50cy4gKi9cbiAgZnVuY3Rpb24gX21hcE1vdmVkKG1hcCkge1xuICAgIHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uICgpe1xuICAgICAgbWFwLm1hcE1vdmVkKGZhbHNlKTtcbiAgICB9LCAxKTtcbiAgfVxufSkoKTsiLCIndXNlIHN0cmljdCc7XG5cbi8qKiBUZXJyYWluIHRpbGUgbGlrZSBkZXNlcnQgb3IgbW91bnRhaW4sIG5vbi1tb3ZhYmxlIGFuZCBjYWNoZWFibGUuIE5vcm1hbGx5LCBidXQgbm90IG5lY2Vzc2FyaWx5LCB0aGVzZSBhcmVcbiAqIGluaGVyaXRlZCwgZGVwZW5kaW5nIG9uIHRoZSBtYXAgdHlwZS4gRm9yIGV4YW1wbGUgeW91IG1pZ2h0IHdhbnQgdG8gYWRkIHNvbWUgY2xpY2sgYXJlYSBmb3IgdGhlc2UgKi9cblxuaW1wb3J0IHsgT2JqZWN0X3Nwcml0ZSB9IGZyb20gJy4uL3BpeGlfT2JqZWN0JztcblxuZXhwb3J0IGNsYXNzIE9iamVjdF9zcHJpdGVfdGVycmFpbiBleHRlbmRzIE9iamVjdF9zcHJpdGUge1xuICBjb25zdHJ1Y3Rvcihjb29yZHMsIGRhdGEsIGN1cnJGcmFtZU51bWJlciwgdGhyb3dTaGFkb3dPcHRpb25zKSB7XG4gICAgc3VwZXIoY29vcmRzLCBkYXRhLCBjdXJyRnJhbWVOdW1iZXIsIHRocm93U2hhZG93T3B0aW9ucyk7XG5cbiAgICB0aGlzLm5hbWUgPSBcIkRlZmF1bHRUZXJyYWluT2JqZWN0XCI7XG4gICAgdGhpcy50eXBlID0gXCJ0ZXJyYWluXCI7XG4gICAgdGhpcy5oaWdobGlnaHRhYmxlID0gZmFsc2U7XG4gICAgdGhpcy5zZWxlY3RhYmxlID0gZmFsc2U7XG4gIH1cbn0iLCIndXNlIHN0cmljdCc7XG5cbi8qKiBNYXAgdW5pdCBsaWtlIGluZmFudHJ5IG9yIHdvcmtlciwgdXN1YWxseSBzb21ldGhpbmcgd2l0aCBhY3Rpb25zIG9yIG1vdmFibGUuIE5vcm1hbGx5LCBidXQgbm90IG5lY2Vzc2FyaWx5LCB0aGVzZSBhcmVcbiAqIGluaGVyaXRlZCwgZGVwZW5kaW5nIG9uIHRoZSBtYXAgdHlwZS4gRm9yIGV4YW1wbGUgeW91IG1pZ2h0IHdhbnQgdG8gYWRkIHNvbWUgY2xpY2sgYXJlYSBmb3IgdGhlc2UgKi9cblxuaW1wb3J0IHsgT2JqZWN0X3Nwcml0ZSB9IGZyb20gJy4uL3BpeGlfT2JqZWN0JztcblxuZXhwb3J0IGNsYXNzIE9iamVjdF9zcHJpdGVfdW5pdCBleHRlbmRzIE9iamVjdF9zcHJpdGUge1xuICBjb25zdHJ1Y3Rvcihjb29yZHMsIGRhdGEsIGN1cnJGcmFtZU51bWJlciwgdGhyb3dTaGFkb3dPcHRpb25zKSB7XG4gICAgc3VwZXIoY29vcmRzLCBkYXRhLCBjdXJyRnJhbWVOdW1iZXIsIHRocm93U2hhZG93T3B0aW9ucyk7XG5cbiAgICB0aGlzLm5hbWUgPSBcIkRlZmF1bHRVbml0T2JqZWN0c1wiO1xuICAgIHRoaXMudHlwZSA9IFwidW5pdFwiO1xuICAgIHRoaXMuaGlnaGxpZ2h0YWJsZSA9IHRydWU7XG4gICAgdGhpcy5zZWxlY3RhYmxlID0gdHJ1ZTtcbiAgICB0aGlzLmFjdGlvbnMgPSB7XG4gICAgICBtb3ZlOiBbXSxcbiAgICAgIGF0dGFjazogW11cbiAgICB9O1xuXG4gICAgdGhpcy50aHJvd1NoYWRvdyA9IHRydWU7XG4gIH1cbiAgZG9BY3Rpb24odHlwZSkge1xuICAgIHRoaXMuYWN0aW9uc1t0eXBlXS5mb3JFYWNoKGFjdGlvbiA9PiB7XG4gICAgICBhY3Rpb24oKTtcbiAgICB9KTtcbiAgfVxuICBhZGRBY3Rpb25UeXBlKHR5cGUpIHtcbiAgICB0aGlzLmFjdGlvbnNbdHlwZV0gPSB0aGlzLmFjdGlvbnNbdHlwZV0gfHwgW107XG4gIH1cbiAgYWRkQ2FsbGJhY2tUb0FjdGlvbih0eXBlLCBjYikge1xuICAgIHRoaXMuYWN0aW9uc1t0eXBlXS5wdXNoKGNiKTtcbiAgfVxufSIsIi8qKiBNYXAgaXMgdGhlIG1haW4gY2xhc3MgZm9yIGNvbnN0cnVjdGluZyAyRCBtYXAgZm9yIHN0cmF0ZWd5IGdhbWVzXG4gKlxuICogTWFwIGlzIGluc3RhbnRpYXRlZCBhbmQgdGhlbiBpbml0aWFsaXplZCB3aXRoIGluaXQtbWV0aG9kLlxuICpcbiAqIFBsdWdpbnMgY2FuIGJlIGFkZGVkIHdpdGggYWN0aXZhdGVQbHVnaW5zLW1ldGhvZCBieSBwcm9kaXZpbmcgaW5pdChtYXApIG1ldGhvZCBpbiB0aGUgcGx1Z2luLiBQbHVnaW5zIGFyZSBhbHdheXNcbiAqIGZ1bmN0aW9ucywgbm90IG9iamVjdHMgdGhhdCBhcmUgaW5zdGFudGlhdGVkLiBQbHVnaW5zIGFyZSBzdXBwb3NlZCB0byBleHRlbmQgdGhlIG1hcCBvYmplY3Qgb3IgYW55dGhpbmcgaW4gaXQgdmlhXG4gKiBpdCdzIHB1YmxpYyBtZXRob2RzLlxuICpcbiAqIEByZXF1aXJlIGNyZWF0ZWpzIGZyYW1ld29yayBpbiBnbG9iYWwgbmFtZXNwYWNlXG4gKiBAcmVxdWlyZSBjYW52YXMgSFRNTDUtZWxlbWVudCB0byB3b3JrLlxuICpcbiAqIEByZXF1aXJlIFBsdWdpbnMgdGhhdCB1c2UgZXZlbnRsaXN0ZW5lciBieSBkZWZhdWx0LCB1c2UgcG9pbnRlciBldmVudHMgcG9seWZpbGwsIHN1Y2ggYXM6IGh0dHBzOi8vZ2l0aHViLmNvbS9qcXVlcnkvUEVQXG4gKiBQbHVnaW5zIGFuZCBldmVudGxpc3RlbmVyIGNhbiBiZSBvdmVycmlkZW4sIGJ1dCB0aGV5IHVzZXIgcG9pbnRlciBldmVudHMgYnkgZGVmYXVsdCAoZWl0aGVyIHRoZSBicm93c2VyIG11c3Qgc3VwcG9ydFxuICogdGhlbSBvciB1c2UgcG9seWZpbGwpICovXG5cbid1c2Ugc3RyaWN0JztcblxuLyogPT09PT09IE93biBtb2R1bGUgaW1wb3J0cyA9PT09PT0gKi9cbmltcG9ydCB7IE1hcF9zdGFnZSB9IGZyb20gJy4vcGl4aV9NYXBfc3RhZ2UnO1xuaW1wb3J0IHsgTWFwX2xheWVyIH0gZnJvbSAnLi9waXhpX01hcF9sYXllcic7XG5pbXBvcnQgeyByZXNpemVVdGlscywgcmVzaXplVXRpbHMsIGVudmlyb25tZW50RGV0ZWN0aW9uIH0gZnJvbSAnLi91dGlscy91dGlscyc7XG5pbXBvcnQgeyBtYXBfZHJhZyB9IGZyb20gXCIuL21vdmUvbWFwX2RyYWdcIjtcbmltcG9ydCB7IG1hcF96b29tIH0gZnJvbSAnLi96b29tL3BpeGlfbWFwX3pvb20nO1xuaW1wb3J0IHsgZXZlbnRMaXN0ZW5lcnMgfSBmcm9tICcuL2V2ZW50bGlzdGVuZXJzJztcblxudmFyIF9kcmF3TWFwT25OZXh0VGljayA9IGZhbHNlO1xudmFyIGV2ZW50bGlzdGVuZXJzLCBfc3RhZ2UsIF9zdGF0aWNMYXllciwgX21vdmFibGVMYXllciwgX3JlbmRlcmVyO1xuXG5leHBvcnQgY2xhc3MgTWFwIHtcbiAgLyoqXG4gICAqIEBwYXJhbSB7RE9NIENhbnZhcyBlbGVtZW50fSBjYW52YXMgLSBDYW52YXMgdXNlZCBieSB0aGUgbWFwXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gZGlmZmVyZW50IG9wdGlvbnMgZm9yIHRoZSBtYXAgdG8gYmUgZ2l2ZW4uXG4gICAqIEByZXR1cm4gTWFwIGluc3RhbmNlXG5cbiAgIEB0b2RvLCBzZXQgZGVmYXVsdCB2YWx1ZXMgZm9yIGdpdmVuIGFuZCByZXF1aXJlZCBvcHRpb25zICovXG4gIGNvbnN0cnVjdG9yKGNhbnZhc1BhcmVudCwgb3B0aW9ucykge1xuICAgIGlmKCFjYW52YXNQYXJlbnQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcih0aGlzLmNvbnN0cnVjdG9yLm5hbWUgKyBcIiBuZWVkcyBjYW52YXNQYXJlbnQhXCIpO1xuICAgIH1cbiAgICBpZih0eXBlb2YgY2FudmFzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBjYW52YXNQYXJlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGNhbnZhc1BhcmVudCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNhbnZhc1BhcmVudCA9IGNhbnZhc1BhcmVudDtcbiAgICB9XG5cbiAgICBfcmVuZGVyZXIgPSBQSVhJLmF1dG9EZXRlY3RSZW5kZXJlcihvcHRpb25zLmJvdW5kcy53aWR0aCwgb3B0aW9ucy5ib3VuZHMuaGVpZ2h0LCBvcHRpb25zLnJlbmRlcmVyKTtcbiAgICAvKiBXZSBoYW5kbGUgYWxsIHRoZSBldmVudHMgb3Vyc2VsdmVzIHRocm91Z2ggYWRkRXZlbnRMaXN0ZW5lcnMtbWV0aG9kIG9uIGNhbnZhcywgc28gZGVzdHJveSBwaXhpIG5hdGl2ZSBtZXRob2QgKi9cbiAgICBfcmVuZGVyZXIucGx1Z2lucy5pbnRlcmFjdGlvbi5kZXN0cm95KCk7XG4gICAgY2FudmFzUGFyZW50LnJlcGxhY2VDaGlsZChfcmVuZGVyZXIudmlldywgY2FudmFzUGFyZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiY2FudmFzXCIpWzBdKTtcbiAgICB0aGlzLmNhbnZhcyA9IF9yZW5kZXJlci52aWV3O1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIGZ1bmN0aW9uKGV2ZW50KXtcbiAgICAgIHNldEZ1bGxzaXplZE1hcChfcmVuZGVyZXIpO1xuICAgIH0pO1xuXG4gICAgX3N0YWdlID0gbmV3IE1hcF9zdGFnZShcIm1haW5TdGFnZVwiLCB0aGlzLmNhbnZhcywgX3JlbmRlcmVyKTtcbiAgICBfc3RhdGljTGF5ZXIgPSBuZXcgTWFwX2xheWVyKFwic3RhdGljTGF5ZXJcIiwgb3B0aW9ucy5zdWJDb250YWluZXJzLCBvcHRpb25zLnN0YXJ0Q29vcmQpO1xuICAgIF9zdGFnZS5hZGRDaGlsZChfc3RhdGljTGF5ZXIpO1xuICAgIF9tb3ZhYmxlTGF5ZXIgPSBuZXcgTWFwX2xheWVyKFwibW92YWJsZUxheWVyXCIsIG9wdGlvbnMuc3ViQ29udGFpbmVycywgb3B0aW9ucy5zdGFydENvb3JkKTtcbiAgICBfc3RhdGljTGF5ZXIuYWRkQ2hpbGQoX21vdmFibGVMYXllcik7XG4gICAgdGhpcy5wbHVnaW5zID0gbmV3IFNldCgpO1xuICAgIC8qIEFjdGl2YXRlIHRoZSBtYXAgem9vbSBhbmQgbWFwIGRyYWcgY29yZSBwbHVnaW5zICovXG4gICAgdGhpcy5kZWZhdWx0UGx1Z2lucyA9IFttYXBfem9vbSwgbWFwX2RyYWddO1xuICAgIHRoaXMubWFwU2l6ZSA9IG9wdGlvbnMubWFwU2l6ZSB8fCB7IHg6MCwgeTowIH07XG4gICAgdGhpcy5hY3RpdmVUaWNrQ0IgPSBmYWxzZTtcbiAgICB0aGlzLmV2ZW50Q0JzID0ge1xuICAgICAgZnVsbFNpemU6IHJlc2l6ZVV0aWxzLnNldFRvRnVsbFNpemUodGhpcy5jYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpKSxcbiAgICAgIGZ1bGxzY3JlZW46IHJlc2l6ZVV0aWxzLnRvZ2dsZUZ1bGxTY3JlZW4sXG4gICAgICBzZWxlY3Q6IG51bGwsXG4gICAgICBkcmFnOiBudWxsLFxuICAgICAgem9vbTogbnVsbFxuICAgIH07XG4gICAgdGhpcy5fZnVsbFNpemVGdW5jdGlvbiA9IG51bGw7XG4gICAgZXZlbnRsaXN0ZW5lcnMgPSBldmVudExpc3RlbmVycyh0aGlzLCB0aGlzLmNhbnZhcyk7XG4gICAgdGhpcy5lbnZpcm9ubWVudCA9IFwiZGVza3RvcFwiO1xuICAgIHRoaXMubWFwRW52aXJvbm1lbnQoZW52aXJvbm1lbnREZXRlY3Rpb24uaXNNb2JpbGUoKSA/IFwibW9iaWxlXCIgOiBcImRlc2t0b3BcIik7XG4gICAgdGhpcy5fbWFwSW5Nb3ZlID0gZmFsc2U7XG4gIH1cbiAgLyoqIGluaXRpYWxpemF0aW9uIG1ldGhvZFxuICAgKiBAcGFyYW0gW0FycmF5XSBwbHVnaW5zIC0gUGx1Z2lucyB0byBiZSBhY3RpdmF0ZWQgZm9yIHRoZSBtYXAuIE5vcm1hbGx5IHlvdSBzaG91bGQgZ2l2ZSB0aGUgcGx1Z2lucyBoZXJlIGluc3RlYWQgb2ZcbiAgICogc2VwYXJhdGVseSBwYXNzaW5nIHRoZW0gdG8gYWN0aXZhdGVQbHVnaW5zIG1ldGhvZFxuICAgKiBAcGFyYW0ge3g6ID8geTo/fSBjb29yZCAtIFN0YXJ0aW5nIGNvb3JkaW5hdGVzIGZvciB0aGUgbWFwXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IHRpY2tDQiAtIGNhbGxiYWNrIGZ1bmN0aW9uIGZvciB0aWNrLiBUaWNrIGNhbGxiYWNrIGlzIGluaXRpYXRlZCBpbiBldmVyeSBmcmFtZS4gU28gbWFwIGRyYXdzIGhhcHBlblxuICAgKiBkdXJpbmcgdGlja3NcbiAgICogQHJldHVybiB0aGUgY3VycmVudCBtYXAgaW5zdGFuY2UgKi9cbiAgaW5pdChwbHVnaW5zLCBjb29yZCwgdGlja0NCKSB7XG4gICAgaWYgKHBsdWdpbnMpIHtcbiAgICAgIHRoaXMuYWN0aXZhdGVQbHVnaW5zKHBsdWdpbnMpO1xuICAgIH1cblxuICAgIGlmKGNvb3JkKSB7XG4gICAgICBfbW92YWJsZUxheWVyLnggPSBjb29yZC54O1xuICAgICAgX21vdmFibGVMYXllci55ID0gY29vcmQueTtcbiAgICB9XG5cbiAgICB0aGlzLmRyYXdPbk5leHRUaWNrKCk7XG4gICAgX2RlZmF1bHRUaWNrKHRoaXMsIFBJWEkudGlja2VyLnNoYXJlZCk7XG4gICAgdGlja0NCICYmIHRoaXMuY3VzdG9tVGlja09uKHRpY2tDQik7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICAvKiogVGhlIGNvcnJlY3Qgd2F5IHRvIHVwZGF0ZSAvIHJlZHJhdyB0aGUgbWFwLiBDaGVjayBoYXBwZW5zIGF0IGV2ZXJ5IHRpY2sgYW5kIHRodXMgaW4gZXZlcnkgZnJhbWUuXG4gICAqIEByZXR1cm4gdGhlIGN1cnJlbnQgbWFwIGluc3RhbmNlICovXG4gIGRyYXdPbk5leHRUaWNrKCkge1xuICAgIF9kcmF3TWFwT25OZXh0VGljayA9IHRydWU7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICAvKiogVGhlIGNvcnJlY3Qgd2F5IHRvIHVwZGF0ZSAvIHJlZHJhdyB0aGUgbWFwLiBDaGVjayBoYXBwZW5zIGF0IGV2ZXJ5IHRpY2sgYW5kIHRodXMgaW4gZXZlcnkgZnJhbWUuXG4gICAqIEByZXR1cm4gdGhlIGN1cnJlbnQgbWFwIGluc3RhbmNlICovXG4gIGdldExheWVyc1dpdGhBdHRyaWJ1dGVzKGF0dHJpYnV0ZSwgdmFsdWUpIHtcbiAgICByZXR1cm4gX3N0YWdlLmNoaWxkcmVuWzBdLmNoaWxkcmVuLmZpbHRlcihsYXllciA9PiB7XG4gICAgICByZXR1cm4gbGF5ZXJbYXR0cmlidXRlXSA9PT0gdmFsdWU7XG4gICAgfSk7XG4gIH1cblxuICBnZXRTdGFnZXMoKSB7XG4gICAgcmV0dXJuIFtfc3RhZ2VdO1xuICB9XG4gIGdldFN0YWdlKCkge1xuICAgIHJldHVybiBfc3RhZ2U7XG4gIH1cblxuICBnZXRTaXplKCkge1xuICAgIHJldHVybiB0aGlzLm1hcFNpemU7XG4gIH1cbiAgLyoqIEFsbCBwYXJhbWV0ZXJzIGFyZSBwYXNzZWQgdG8gTWFwX2xheWVyIGNvbnN0cnVjdG9yXG4gICAqIEByZXR1cm4gY3JlYXRlZCBNYXBfbGF5ZXIgaW5zdGFuY2UgKi9cbiAgYWRkTGF5ZXIobmFtZSwgc3ViQ29udGFpbmVycywgY29vcmQpIHtcbiAgICB2YXIgbGF5ZXIgPSBuZXcgTWFwX2xheWVyKG5hbWUsIHN1YkNvbnRhaW5lcnMsIGNvb3JkKTtcblxuICAgIF9tb3ZhYmxlTGF5ZXIuYWRkQ2hpbGQobGF5ZXIpO1xuXG4gICAgcmV0dXJuIGxheWVyO1xuICB9XG4gIC8qKlxuICAgKiBAcGFyYW0ge01hcF9sYXllcn0gbGF5ZXIgLSB0aGUgbGF5ZXIgb2JqZWN0IHRvIGJlIHJlbW92ZWQgKi9cbiAgcmVtb3ZlTGF5ZXIobGF5ZXIpIHtcbiAgICBfbW92YWJsZUxheWVyLnJlbW92ZUNoaWxkKGxheWVyKTtcblxuICAgIHJldHVybiBsYXllcjtcbiAgfVxuICAvKiogQHJldHVybiBsYXllciB3aXRoIHRoZSBwYXNzZWQgbGF5ZXIgbmFtZSAqL1xuICBnZXRMYXllck5hbWVkKG5hbWUpIHtcbiAgICByZXR1cm4gX21vdmFibGVMYXllci5nZXRDaGlsZE5hbWVkKG5hbWUpO1xuICB9XG4gIC8qKlxuICAgKiBAcGFyYW0ge3g6IE51bWJlciwgeTogTnVtYmVyfSBjb29yZCAtIFRoZSBhbW91bnQgb2YgeCBhbmQgeSBjb29yZGluYXRlcyB3ZSB3YW50IHRoZSBtYXAgdG8gbW92ZS4gSS5lLiB7IHg6IDUsIHk6IDAgfVxuICAgKiB3aXRoIHRoaXMgd2Ugd2FudCB0aGUgbWFwIHRvIG1vdmUgaG9yaXpvbnRhbGx5IDUgcGl6ZWxzIGFuZCB2ZXJ0aWNhbGx5IHN0YXkgYXQgdGhlIHNhbWUgcG9zaXRpb24uXG4gICAqIEByZXR1cm4gdGhpcyBtYXAgaW5zdGFuY2UgKi9cbiAgbW92ZU1hcChjb29yZGluYXRlcykge1xuICAgIHZhciByZWFsQ29vcmRpbmF0ZXMgPSB7XG4gICAgICB4OiBjb29yZGluYXRlcy54IC8gX3N0YXRpY0xheWVyLmdldFNjYWxlKCksXG4gICAgICB5OiBjb29yZGluYXRlcy55IC8gX3N0YXRpY0xheWVyLmdldFNjYWxlKClcbiAgICB9O1xuICAgIF9tb3ZhYmxlTGF5ZXIubW92ZShyZWFsQ29vcmRpbmF0ZXMpO1xuICAgIHRoaXMuZHJhd09uTmV4dFRpY2soKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIC8qKiBDYWNoZSB0aGUgbWFwLiBUaGlzIHByb3ZpZGVzIHNpZ25pZmljYW50IHBlcmZvcm1hbmNlIGJvb3N0LCB3aGVuIHVzZWQgY29ycmVjdGx5LiBjYWNoZU1hcCBpdGVyYXRlcyB0aHJvdWdoIGFsbCB0aGVcbiAgICogbGF5ZXIgb24gdGhlIG1hcCBhbmQgY2FjaGVzIHRoZSBvbmVzIHRoYXQgcmV0dXJuIHRydWUgZnJvbSBnZXRDYWNoZUVuYWJsZWQtbWV0aG9kLlxuICAgKiBAcGFyYW0ge3g6IE51bWJlciwgeTogTnVtYmVyfSBjb29yZCAtIFRoZSBhbW91bnQgb2YgeCBhbmQgeSBjb29yZGluYXRlcyB3ZSB3YW50IHRoZSBtYXAgdG8gbW92ZS4gSS5lLiB7IHg6IDUsIHk6IDAgfVxuICAgKiB3aXRoIHRoaXMgd2Ugd2FudCB0aGUgbWFwIHRvIG1vdmUgaG9yaXpvbnRhbGx5IDUgcGl6ZWxzIGFuZCB2ZXJ0aWNhbGx5IHN0YXkgYXQgdGhlIHNhbWUgcG9zaXRpb24uXG4gICAqIEByZXR1cm4gdGhpcyBtYXAgaW5zdGFuY2UgKi9cbiAgY2FjaGVNYXAoKSB7XG4gICAgaWYoX21vdmFibGVMYXllci5nZXRDYWNoZUVuYWJsZWQoKSkge1xuICAgICAgX21vdmFibGVMYXllci5jYWNoZUFzQml0bWFwID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgX21vdmFibGVMYXllci5jaGlsZHJlbi5mb3JFYWNoKGNoaWxkID0+IHtcbiAgICAgICAgaWYoY2hpbGQuZ2V0Q2FjaGVFbmFibGVkKCkpIHtcbiAgICAgICAgICBjaGlsZC5jYWNoZUFzQml0bWFwID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgLyoqIGl0ZXJhdGVzIHRocm91Z2ggdGhlIG1hcCBsYXllcnMgYW5kIHJldHVybnMgbWF0Y2hpbmcgb2JqZWN0cyBvbiBnaXZlbiBjb29yZGluYXRlc1xuICAgKiBAcGFyYW0ge3g6IE51bWJlciwgeTogTnVtYmVyfSBjb29yZCAtIFRoZSBtYXAgY29vcmRpbmF0ZSB1bmRlciB3aGljaCB3ZSB3YW50IHRvIHJldHJpZXZlIGFsbCB0aGUgb2JqZWN0cy5cbiAgICogQHJldHVybiB0aGlzIG1hcCBpbnN0YW5jZSAqL1xuICBnZXRPYmplY3RzVW5kZXJNYXBQb2ludChjb29yZCkge1xuICAgIGxldCBvYmplY3RzID0gW107XG5cbiAgICBfbW92YWJsZUxheWVyLmdldE9iamVjdHNVbmRlclBvaW50KGNvb3JkKTtcblxuICAgIHJldHVybiBvYmplY3RzO1xuICB9XG4gIC8qKiBSZXNpemUgdGhlIGNhbnZhcyB0byBmaWxsIHRoZSB3aG9sZSBicm93c2VyIGFyZWEuIFVzZXMgdGhpcy5ldmVudENCcy5mdWxsc2l6ZSBhcyBjYWxsYmFjaywgc28gd2hlbiB5b3UgbmVlZCB0byBvdmVyd3JpdGVcbiAgdGhlIGV2ZW50bGlzdGVuZXIgY2FsbGJhY2sgdXNlIHRoaXMuZXZlbnRDQnMgKi9cbiAgdG9nZ2xlRnVsbFNpemUoKSB7XG4gICAgZXZlbnRsaXN0ZW5lcnMudG9nZ2xlRnVsbFNpemVMaXN0ZW5lcigpO1xuICB9XG4gIC8qKiBUb2dnbGVzIGZ1bGxzY3JlZW4gbW9kZS4gVXNlcyB0aGlzLmV2ZW50Q0JzLmZ1bGxzY3JlZW4gYXMgY2FsbGJhY2ssIHNvIHdoZW4geW91IG5lZWQgdG8gb3ZlcndyaXRlXG4gIHRoZSBldmVudGxpc3RlbmVyIGNhbGxiYWNrIHVzZSB0aGlzLmV2ZW50Q0JzICovXG4gIHRvZ2dsZUZ1bGxTY3JlZW4gKCkge1xuICAgIGV2ZW50bGlzdGVuZXJzLnRvZ2dsZUZ1bGxTY3JlZW4oKTtcbiAgfVxuICAvKiogQWN0aXZhdGUgcGx1Z2lucyBmb3IgdGhlIG1hcC4gUGx1Z2lucyBuZWVkIC5wbHVnaW5OYW1lIHByb3BlcnR5IGFuZCAuaW5pdC1tZXRob2RcbiAgQHBhcmFtIFtBcnJheV0gcGx1Z2luc0FycmF5IC0gQXJyYXkgdGhhdCBjb25zaXN0cyBvZiB0aGUgcGx1Z2luIG1vZHVsZXMgKi9cbiAgYWN0aXZhdGVQbHVnaW5zKHBsdWdpbnNBcnJheSA9IFtdKSB7XG4gICAgdmFyIGN1cnJlbnRQbHVnaW5OYW1lRm9yRXJyb3JzO1xuXG4gICAgdHJ5IHtcbiAgICAgIHBsdWdpbnNBcnJheS5mb3JFYWNoKHBsdWdpbiA9PiB7XG4gICAgICAgIGlmKCFwbHVnaW4gfHwgIXBsdWdpbi5wbHVnaW5OYW1lKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwicGx1Z2luIG9yIHBsdWdpbi5wbHVnaW5OYW1lIG1pc3NpbmdcIik7XG4gICAgICAgIH1cbiAgICAgICAgY3VycmVudFBsdWdpbk5hbWVGb3JFcnJvcnMgPSBwbHVnaW4ucGx1Z2luTmFtZTtcblxuICAgICAgICBpZih0aGlzLnBsdWdpbnMuYWRkKHBsdWdpbikpIHtcbiAgICAgICAgICBwbHVnaW4uaW5pdCh0aGlzKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSBjYXRjaChlKSB7XG4gICAgICBjb25zb2xlLmxvZyhcIkFuIGVycm9yIGluaXRpYWxpemluZyBwbHVnaW4gXCIgKyBjdXJyZW50UGx1Z2luTmFtZUZvckVycm9ycywgZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgLyoqIGdldHRlciBhbmQgc2V0dGVyIGZvciBkZXRlY3RpbmcgaWYgbWFwIGlzIG1vdmVkIGFuZCBzZXR0aW5nIHRoZSBtYXBzIHN0YXR1cyBhcyBtb3ZlZCBvciBub3QgbW92ZWQgKi9cbiAgbWFwTW92ZWQoeWVzT3JObykge1xuICAgIGlmKHllc09yTm8gIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5fbWFwSW5Nb3ZlID0geWVzT3JObztcbiAgICAgIHJldHVybiB5ZXNPck5vO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLl9tYXBJbk1vdmU7XG4gIH1cbiAgc2V0UHJvdG90eXBlKHByb3BlcnR5LCB2YWx1ZSkge1xuICAgIC8vdGhpcy5zZXRQcm90b3R5cGVPZihwcm9wZXJ0eSwgdmFsdWUpO1xuICAgIC8vdGhpc1twcm9wZXJ0eV0gPSB2YWx1ZTtcbiAgICAvL3RoaXMucHJvdG90eXBlW3Byb3BlcnR5XSA9IHZhbHVlO1xuICAgIE1hcC5wcm90b3R5cGVbcHJvcGVydHldID0gdmFsdWU7XG4gIH1cbiAgLyoqIGdldHRlciBhbmQgc2V0dGVyIGZvciBtYXJraW5nIGVudmlyb25tZW50IGFzIG1vYmlsZSBvciBkZXNrdG9wICovXG4gIG1hcEVudmlyb25tZW50KGVudikge1xuICAgIGlmKGVudiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLmVudmlyb25tZW50ID0gZW52O1xuICAgICAgcmV0dXJuIGVudjtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5lbnZpcm9ubWVudDtcbiAgfVxuICAvKiogQHJldHVybiB7IHg6IE51bWJlciwgeTogTnVtYmVyIH0sIGN1cnJlbnQgY29vcmRpbmF0ZXMgZm9yIHRoZSBtYXAgKi9cbiAgZ2V0TWFwUG9zaXRpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHg6IF9tb3ZhYmxlTGF5ZXIueCxcbiAgICAgIHk6IF9tb3ZhYmxlTGF5ZXIueVxuICAgIH07XG4gIH1cbiAgZ2V0Wm9vbUxheWVyKCkge1xuICAgIHJldHVybiBfc3RhdGljTGF5ZXI7XG4gIH1cbiAgZ2V0U2NhbGUoKSB7XG4gICAgcmV0dXJuIF9zdGF0aWNMYXllci5nZXRTY2FsZSgpO1xuICB9XG4gIHpvb21JbigpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJab29tIG5lZWRzIHRvIGJlIGltcGxlbWVudGVkIGFuZCBhY3RpYXZlZCB0aHJvdWdoIGEgcGx1Z2luXCIpO1xuICB9XG4gIHpvb21PdXQoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiWm9vbSBuZWVkcyB0byBiZSBpbXBsZW1lbnRlZCBhbmQgYWN0aWF2ZWQgdGhyb3VnaCBhIHBsdWdpblwiKTtcbiAgfVxuICBnZXRVSUxheWVyKCkge1xuICAgIHJldHVybiBfc3RhdGljTGF5ZXI7XG4gIH1cbiAgZ2V0TW92YWJsZUxheWVyKCkge1xuICAgIHJldHVybiBfbW92YWJsZUxheWVyO1xuICB9XG4gIC8qIEZvciBtb3JlIGVmZmljaWVudCAvIHNtYXJ0IHNlbGVjdGlvbiAtIEludGVyZmFjZSAvIEFQSS4gQnkgZGVmYXVsdCB1c2VzIHF1YWR0cmVlICovXG4gIGFkZE9iamVjdHNGb3JTZWxlY3Rpb24oY29vcmRpbmF0ZXMsIHR5cGUsIG9iamVjdCkgeyByZXR1cm4gXCJub3RJbXBsZW1lbnRlZFlldFwiOyB9XG4gIHJlbW92ZU9iamVjdHNGb3JTZWxlY3Rpb24oY29vcmRpbmF0ZXMsIHR5cGUsIG9iamVjdCkgeyByZXR1cm4gXCJub3RJbXBsZW1lbnRlZFlldFwiOyB9XG4gIGdldE9iamVjdHNVbmRlclBvaW50KGNvb3JkaW5hdGVzLCB0eXBlKSB7IHJldHVybiBcIm5vdEltcGxlbWVudGVkWWV0XCI7IC8qIEltcGxlbWVudGVkIHdpdGggYSBwbHVnaW4gKi8gfVxuICBnZXRPYmplY3RzVW5kZXJTaGFwZShjb29yZGluYXRlcywgc2hhcGUsIHR5cGUpIHsgcmV0dXJuIFwibm90SW1wbGVtZW50ZWRZZXRcIjsgLyogQ2FuIGJlIGltcGxlbWVudGVkIGlmIG5lZWRlZC4gV2UgbmVlZCBtb3JlIHNvcGhpc3RpY2F0ZWQgcXVhZHRyZWUgZm9yIHRoaXMgKi8gfVxufVxuXG4vKiogPT09PT0gUHJpdmF0ZSBmdW5jdGlvbnMgPT09PT0gKi9cbi8qIFRoaXMgaGFuZGxlcyB0aGUgZGVmYXVsdCBkcmF3aW5nIG9mIHRoZSBtYXAsIHNvIHRoYXQgbWFwIGFsd2F5cyB1cGRhdGVzIHdoZW4gZHJhd09uTmV4dFRpY2sgPT09IHRydWUuIFRoaXMgdGlja1xuY2FsbGJhY2sgaXMgYWx3YXlzIHNldCBhbmQgc2hvdWxkIG5vdCBiZSByZW1vdmVkIG9yIG92ZXJydWxlZCAqL1xuZnVuY3Rpb24gX2RlZmF1bHRUaWNrKG1hcCwgdGlja2VyKSB7XG4gIHRpY2tlci5hZGQoZnVuY3Rpb24gKHRpbWUpIHtcbiAgICBpZihfZHJhd01hcE9uTmV4dFRpY2sgPT09IHRydWUpIHtcbiAgICAgIF9yZW5kZXJlci5yZW5kZXIoX3N0YWdlKTtcbiAgICB9XG4gICAgX2RyYXdNYXBPbk5leHRUaWNrID0gZmFsc2U7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBzZXRGdWxsc2l6ZWRNYXAocmVuZGVyZXIpIHtcbiAgcmVuZGVyZXIudmlldy5zdHlsZS5wb3NpdGlvbiA9IFwiYWJzb2x1dGVcIlxuICByZW5kZXJlci52aWV3LnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gIHJlbmRlcmVyLmF1dG9SZXNpemUgPSB0cnVlO1xuICByZW5kZXJlci5yZXNpemUod2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodCk7XG59IiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbkByZXF1aXJlIHRoZSBjcmVhdGVqcyBmcmFtZXdvcmsgaW4gZ2xvYmFsIG5hbWVzcGFjZVxuKi9cblxuLyoqXG4gKiBAdG9kbyB0aGlzLnByZXZlbnRTZWxlY3Rpb24uIFRoaXMgc2hvdWxkIGRldGVybWluZSB3ZXRoZXIgdGhpcyBzdGFnZSBob2xkcyBkYXRhIHRoYXQgY2FuIGJlIHNlbGVjdGVkIGJ5IHRoZSBwbGF5ZXJcbiAqL1xuXG4vKipcbiAqIEB0b2RvIHN1YkNvbnRhaW5lcnMuIFN1YmNvbnRhaW5lcnMgYXJlIGNvbnRhaW5lcnMgaW5zaWRlIGxheWVycyBkZXNpZ25lZCB0byBncm91cCB1cCBvYmplY3RzIHRvIHNtYWxsZXIgY29udGFpbmVycy4gU28gZS5nLlxuICogZ2V0T2JqZWN0c1VuZGVyUG9pbnQgaXMgZmFzdGVyLiBUaGlzIGhhcyBub3QgYmVlbiBlZmZpY2llbnRseSB0ZXN0ZWQgZnJvbSBwZXJmb3JtYW5jZSB3aXNlIHNvIHRoZSBmZWF0dXJlIHdpbGwgYmVcbiAqIGFkZGVkIGFmdGVyIHRoZSBiYXNpYyBtYXAgbW9kdWxlIHdvcmtzIGFuZCB3ZSBjYW4gdmVyaWZ5IHRoZSBlZmZlY3Qgd2VsbCAqL1xuXG4vKiBSRU1FTUJFUiEgUElYSS5QYXJ0aWNsZUNvbnRhaW5lciBoYXMgbGltaXRlZCBzdXBwb3J0IGZvciBmZWF0dXJlcyAobGlrZSBmaWx0ZXJzIGV0Yy4pLCBhdCBzb21lIHBvaW50IHlvdSBoYXZlIHRvIHVzZVxubm9ybWFsIGNvbnRhaW5lciB0b28sIGJ1dCBzaW5jZSB0aGlzIG9uZSBpcyBvcHRpbWl6ZWQgZm9yIHBlcmZvcm1hbmNlIHdlIHVzZSBpdCBoZXJlIGZpcnN0ICovXG5cbnZhciBfVUlPYmplY3RzID0gW107XG5cbi8qID09PT09IEVYUE9SVCA9PT09PSAqL1xuZXhwb3J0IGNsYXNzIE1hcF9sYXllciBleHRlbmRzIFBJWEkuQ29udGFpbmVyIHtcbiAgLyoqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lIGxheWVyIHByb3BlcnR5IG5hbWUsIHVzZWQgZm9yIGlkZW50aWZpeWluZyB0aGUgbGF5ZXIsIHVzZWZ1bGwgaW4gZGVidWdnaW5nLCBidXQgdXNlZCBhbHNvXG4gICAqIG90aGVyd2lzZSB0b28hXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBzdWJDb250YWluZXJzIFRvIGJlIGltcGxlbWVudGVkLiBUaGUgZGF0YSB3aGljaCB3ZSB1c2UgdG8gZGl2aWRlIHRoZSBjb250YWluZXIgdG8gc3ViQ29udGFpbmVyc1xuICAgKiBlLmcuIGZvciBtb3JlIGVmZmljaWVudCBhY2Nlc3NpYmlsaXR5IG9mIG9iamVjdHMgYmFzZWQgb24gY29vcmRpbmF0ZXMuXG4gICAqIEBwYXJhbSB7eDogTnVtYmVyLCB5OiBOdW1iZXJ9IGNvb3JkIHN0YXJ0aW5nIGNvb3JkcyBvZiBsYXllci4gUmVsYXRpdmUgdG8gcGFyZW50IG1hcCBsYXllci5cbiAgKi9cbiAgY29uc3RydWN0b3IobmFtZSwgc3ViQ29udGFpbmVycywgY29vcmQpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy54ID0gY29vcmQgPyAoIGNvb3JkLnggfHwgMCApIDogMDtcbiAgICB0aGlzLnkgPSBjb29yZCA/ICggY29vcmQueSB8fCAwICkgOiAwO1xuICAgIHRoaXMuX2NhY2hlRW5hYmxlZCA9IHRydWU7XG4gICAgdGhpcy5zdWJDb250YWluZXJzID0gc3ViQ29udGFpbmVycyB8fCBmYWxzZTsgLy8gVGhlc2Ugc2hvdWxkIHByb2JhYmx5IGJlIHBhcnRpY2xlQ29udGFpbmVyc1xuICAgIHRoaXMubmFtZSA9IFwiXCIgKyBuYW1lOyAvLyBGb3IgZGVidWdnaW5nLiBTaG93cyB1cCBpbiB0b1N0cmluZ1xuICAgIHRoaXMuZHJhd1RoaXNDaGlsZCA9IHRydWU7XG4gICAgdGhpcy5tb3ZhYmxlID0gdHJ1ZTtcbiAgICB0aGlzLnpvb21hYmxlID0gZmFsc2U7XG4gICAgdGhpcy5wcmV2ZW50U2VsZWN0aW9uID0gZmFsc2U7XG4gICAgLyogY3JlYXRlanMgLyBzdXBlciBwcm9wZXJ0aWVzLiBVc2VkIGFsc28gZm9yIGNvbnRyb2xsaW5nIGFuZCBvcHRpbWl6aW5nIHRoZSBlbmdpbmUgKi9cbiAgICB0aGlzLnZpc2libGUgPSB0cnVlO1xuICAgIHRoaXMudGlja0VuYWJsZWQgPSBmYWxzZTtcbiAgICB0aGlzLnRpY2tDaGlsZHJlbiA9IGZhbHNlO1xuICAgIHRoaXMubW91c2VDaGlsZHJlbiA9IGZhbHNlO1xuICAgIHRoaXMubW91c2VFbmFibGVkID0gZmFsc2U7XG4gIH1cbiAgLyoqIHNldHRlciBhbmQgZ2V0dGVyXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gc3RhdHVzIElmIHByb3ZpZGVkIHNldHMgdGhlIGNhY2hpbmcgc3RhdHVzIG90aGVyd2lzZSByZXR1cm5zIHRoZSBjdXJyZW50IHN0YXR1cyAqL1xuICBjYWNoZUVuYWJsZWQoc3RhdHVzKSB7XG4gICAgaWYoc3RhdHVzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuX2NhY2hlRW5hYmxlZCA9IHN0YXR1cztcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5fY2FjaGVFbmFibGVkO1xuICB9XG4gIC8qKiBNb3ZlIGxheWVyXG4gICAqIEBwYXJhbSB7eDogTnVtYmVyLCB5OiBOdW1iZXJ9IGNvb3JkaW5hdGVzIFRoZSBhbW91bnQgb2YgeCBhbmQgeSBjb29yZGluYXRlcyB3ZSB3YW50IHRoZSBsYXllciB0byBtb3ZlLiBJLmUuXG4gICB7IHg6IDUsIHk6IDAgfVxuICAgQHJldHVybiB0aGlzIGxheWVyIGluc3RhbmNlICovXG4gIG1vdmUoY29vcmRpbmF0ZXMpIHtcbiAgICBpZiAodGhpcy5tb3ZhYmxlKSB7XG4gICAgICB0aGlzLnggKz0gY29vcmRpbmF0ZXMueDtcbiAgICAgIHRoaXMueSArPSBjb29yZGluYXRlcy55O1xuICAgICAgdGhpcy5kcmF3VGhpc0NoaWxkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICBnZXRDaGlsZE5hbWVkKG5hbWUpIHtcbiAgICBpZiAodGhpcy5jaGlsZHJlblswXSBpbnN0YW5jZW9mIFBJWEkuRGlzcGxheU9iamVjdENvbnRhaW5lciApIHtcbiAgICAgIGZvciAobGV0IGNoaWxkIG9mIHRoaXMuY2hpbGRyZW4pIHtcbiAgICAgICAgaWYgKGNoaWxkLm5hbWUudG9Mb3dlckNhc2UoKSA9PT0gbmFtZS50b0xvd2VyQ2FzZSgpKSB7XG4gICAgICAgICAgcmV0dXJuIGNoaWxkO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBpc1VzaW5nU3ViQ29udGFpbmVycygpIHtcbiAgICByZXR1cm4gISF0aGlzLnN1YkNvbnRhaW5lcnM7XG4gIH1cbiAgc2V0U2NhbGUoYW1vdW50KSB7XG4gICAgcmV0dXJuIHRoaXMuc2NhbGUueCA9IHRoaXMuc2NhbGUueSA9IGFtb3VudDtcbiAgfVxuICBnZXRTY2FsZSgpIHtcbiAgICByZXR1cm4gdGhpcy5zY2FsZS54O1xuICB9XG4gIGdldFVJT2JqZWN0cygpIHtcbiAgICByZXR1cm4gX1VJT2JqZWN0cztcbiAgfVxuICBlbXB0eVVJT2JqZWN0cygpIHtcbiAgICBfVUlPYmplY3RzLm1hcChvYmogPT4ge1xuICAgICAgdGhpcy5yZW1vdmVDaGlsZChvYmopO1xuICAgICAgb2JqID0gbnVsbDtcbiAgICB9KTtcblxuICAgIHJldHVybiBfVUlPYmplY3RzO1xuICB9XG4gIGFkZFVJT2JqZWN0cyhvYmplY3RzKSB7XG4gICAgX1VJT2JqZWN0cyA9IF9VSU9iamVjdHMgfHwgW107XG4gICAgaWYoQXJyYXkuaXNBcnJheShvYmplY3RzKSkge1xuICAgICAgdGhpcy5hZGRDaGlsZC5hcHBseSh0aGlzLCBvYmplY3RzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hZGRDaGlsZCggb2JqZWN0cyApO1xuICAgIH1cbiAgICBfVUlPYmplY3RzLnB1c2goIG9iamVjdHMgKTtcblxuICAgIHJldHVybiBfVUlPYmplY3RzO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBNYXBfc3ViTGF5ZXIgZXh0ZW5kcyBQSVhJLlBhcnRpY2xlQ29udGFpbmVyIHtcbiAgLyoqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lIGxheWVyIHByb3BlcnR5IG5hbWUsIHVzZWQgZm9yIGlkZW50aWZpeWluZyB0aGUgbGF5ZXIsIHVzZWZ1bGwgaW4gZGVidWdnaW5nLCBidXQgdXNlZCBhbHNvXG4gICAqIG90aGVyd2lzZSB0b28hXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBzdWJDb250YWluZXJzIFRvIGJlIGltcGxlbWVudGVkLiBUaGUgZGF0YSB3aGljaCB3ZSB1c2UgdG8gZGl2aWRlIHRoZSBjb250YWluZXIgdG8gc3ViQ29udGFpbmVyc1xuICAgKiBlLmcuIGZvciBtb3JlIGVmZmljaWVudCBhY2Nlc3NpYmlsaXR5IG9mIG9iamVjdHMgYmFzZWQgb24gY29vcmRpbmF0ZXMuXG4gICAqIEBwYXJhbSB7eDogTnVtYmVyLCB5OiBOdW1iZXJ9IGNvb3JkIHN0YXJ0aW5nIGNvb3JkcyBvZiBsYXllci4gUmVsYXRpdmUgdG8gcGFyZW50IG1hcCBsYXllci5cbiAgKi9cbiAgY29uc3RydWN0b3IobmFtZSwgc3ViQ29udGFpbmVycywgY29vcmQpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy54ID0gY29vcmQgPyAoIGNvb3JkLnggfHwgMCApIDogMDtcbiAgICB0aGlzLnkgPSBjb29yZCA/ICggY29vcmQueSB8fCAwICkgOiAwO1xuICAgIHRoaXMuX2NhY2hlRW5hYmxlZCA9IHRydWU7XG4gICAgdGhpcy5zdWJDb250YWluZXJzID0gc3ViQ29udGFpbmVycyB8fCBmYWxzZTsgLy8gVGhlc2Ugc2hvdWxkIHByb2JhYmx5IGJlIHBhcnRpY2xlQ29udGFpbmVyc1xuICAgIHRoaXMubmFtZSA9IFwiXCIgKyBuYW1lOyAvLyBGb3IgZGVidWdnaW5nLiBTaG93cyB1cCBpbiB0b1N0cmluZ1xuICAgIHRoaXMuZHJhd1RoaXNDaGlsZCA9IHRydWU7XG4gICAgdGhpcy5tb3ZhYmxlID0gdHJ1ZTtcbiAgICB0aGlzLnpvb21hYmxlID0gZmFsc2U7XG4gICAgdGhpcy5wcmV2ZW50U2VsZWN0aW9uID0gZmFsc2U7XG4gICAgLyogY3JlYXRlanMgLyBzdXBlciBwcm9wZXJ0aWVzLiBVc2VkIGFsc28gZm9yIGNvbnRyb2xsaW5nIGFuZCBvcHRpbWl6aW5nIHRoZSBlbmdpbmUgKi9cbiAgICB0aGlzLnZpc2libGUgPSB0cnVlO1xuICAgIHRoaXMudGlja0VuYWJsZWQgPSBmYWxzZTtcbiAgICB0aGlzLnRpY2tDaGlsZHJlbiA9IGZhbHNlO1xuICAgIHRoaXMubW91c2VDaGlsZHJlbiA9IGZhbHNlO1xuICAgIHRoaXMubW91c2VFbmFibGVkID0gZmFsc2U7XG4gIH1cbiAgLyoqIHNldHRlciBhbmQgZ2V0dGVyXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gc3RhdHVzIElmIHByb3ZpZGVkIHNldHMgdGhlIGNhY2hpbmcgc3RhdHVzIG90aGVyd2lzZSByZXR1cm5zIHRoZSBjdXJyZW50IHN0YXR1cyAqL1xuICBjYWNoZUVuYWJsZWQoc3RhdHVzKSB7XG4gICAgaWYoc3RhdHVzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuX2NhY2hlRW5hYmxlZCA9IHN0YXR1cztcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5fY2FjaGVFbmFibGVkO1xuICB9XG4gIC8qKiBNb3ZlIGxheWVyXG4gICAqIEBwYXJhbSB7eDogTnVtYmVyLCB5OiBOdW1iZXJ9IGNvb3JkaW5hdGVzIFRoZSBhbW91bnQgb2YgeCBhbmQgeSBjb29yZGluYXRlcyB3ZSB3YW50IHRoZSBsYXllciB0byBtb3ZlLiBJLmUuXG4gICB7IHg6IDUsIHk6IDAgfVxuICAgQHJldHVybiB0aGlzIGxheWVyIGluc3RhbmNlICovXG4gIG1vdmUoY29vcmRpbmF0ZXMpIHtcbiAgICBpZiAodGhpcy5tb3ZhYmxlKSB7XG4gICAgICB0aGlzLnggKz0gY29vcmRpbmF0ZXMueDtcbiAgICAgIHRoaXMueSArPSBjb29yZGluYXRlcy55O1xuICAgICAgdGhpcy5kcmF3VGhpc0NoaWxkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICBnZXRDaGlsZE5hbWVkKG5hbWUpIHtcbiAgICBpZiAodGhpcy5jaGlsZHJlblswXSBpbnN0YW5jZW9mIFBJWEkuRGlzcGxheU9iamVjdENvbnRhaW5lciApIHtcbiAgICAgIGZvciAobGV0IGNoaWxkIG9mIHRoaXMuY2hpbGRyZW4pIHtcbiAgICAgICAgaWYgKGNoaWxkLm5hbWUudG9Mb3dlckNhc2UoKSA9PT0gbmFtZS50b0xvd2VyQ2FzZSgpKSB7XG4gICAgICAgICAgcmV0dXJuIGNoaWxkO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBpc1VzaW5nU3ViQ29udGFpbmVycygpIHtcbiAgICByZXR1cm4gISF0aGlzLnN1YkNvbnRhaW5lcnM7XG4gIH1cbiAgc2V0U2NhbGUoYW1vdW50KSB7XG4gICAgcmV0dXJuIHRoaXMuc2NhbGUueCA9IHRoaXMuc2NhbGUueSA9IGFtb3VudDtcbiAgfVxuICBnZXRTY2FsZSgpIHtcbiAgICByZXR1cm4gdGhpcy5zY2FsZS54O1xuICB9XG4gIGdldFVJT2JqZWN0cygpIHtcbiAgICByZXR1cm4gX1VJT2JqZWN0cztcbiAgfVxuICBlbXB0eVVJT2JqZWN0cygpIHtcbiAgICBfVUlPYmplY3RzLm1hcChvYmogPT4ge1xuICAgICAgdGhpcy5yZW1vdmVDaGlsZChvYmopO1xuICAgICAgb2JqID0gbnVsbDtcbiAgICB9KTtcblxuICAgIHJldHVybiBfVUlPYmplY3RzO1xuICB9XG4gIGFkZFVJT2JqZWN0cyhvYmplY3RzKSB7XG4gICAgX1VJT2JqZWN0cyA9IF9VSU9iamVjdHMgfHwgW107XG4gICAgaWYoQXJyYXkuaXNBcnJheShvYmplY3RzKSkge1xuICAgICAgdGhpcy5hZGRDaGlsZC5hcHBseSh0aGlzLCBvYmplY3RzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hZGRDaGlsZCggb2JqZWN0cyApO1xuICAgIH1cbiAgICBfVUlPYmplY3RzLnB1c2goIG9iamVjdHMgKTtcblxuICAgIHJldHVybiBfVUlPYmplY3RzO1xuICB9XG59IiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbkByZXF1aXJlIHRoZSBjcmVhdGVqcyBmcmFtZXdvcmsgaW4gZ2xvYmFsIG5hbWVzcGFjZVxuKi9cblxuLyogPT09PT0gRVhQT1JUID09PT09ICovXG5leHBvcnQgY2xhc3MgTWFwX3N0YWdlIGV4dGVuZHMgUElYSS5Db250YWluZXIge1xuICAvKipcbiAgICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgbGF5ZXIgcHJvcGVydHkgbmFtZSwgdXNlZCBmb3IgaWRlbnRpZml5aW5nIHRoZSBsYXllciwgdXNlZnVsbCBpbiBkZWJ1Z2dpbmcsIGJ1dCB1c2VkIGFsc29cbiAgICogb3RoZXJ3aXNlIHRvbyFcbiAgICogQHBhcmFtIHtET00gQ2FudmFzIGVsZW1lbnR9IGNhbnZhcyBSRVFVSVJFRCEgQ2FudmFzIGVsZW1lbnQgdXNlZCBieSB0aGUgbWFwXG4gICAqIEBwYXJhbSB7eDogTnVtYmVyLCB5OiBOdW1iZXJ9IHN0YWdlQm91bmRzIFNldCBzdGFnZSBib3VuZHMgYmFzZWQgb24gdGhlc2UgY29vcmRpbmF0ZXNcbiAgKi9cbiAgY29uc3RydWN0b3IobmFtZSwgY2FudmFzLCByZW5kZXJlciApIHtcbiAgICBpZighY2FudmFzKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoTWFwX3N0YWdlLmNvbnN0cnVjdG9yLm5hbWUgKyBcIiBuZWVkcyBjYW52YXMhXCIpO1xuICAgIH1cblxuICAgIHN1cGVyKCk7XG5cbiAgICBpZih0eXBlb2YgY2FudmFzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICB0aGlzLmNhbnZhcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoY2FudmFzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jYW52YXMgPSBjYW52YXM7XG4gICAgfVxuICAgIHRoaXMucmVuZGVyZXIgPSByZW5kZXJlcjtcblxuICAgIHRoaXMuX2NhY2hlRW5hYmxlZCA9IHRydWU7XG4gICAgdGhpcy5uYW1lID0gXCJcIiArIG5hbWU7IC8vIEZvciBkZWJ1Z2dpbmcgQU5EIGdldHRpbmcgY2hpbGRyZW4gYnkgbmFtZS4gU2hvd3MgdXAgaW4gdG9TdHJpbmdcbiAgICAvKiBjcmVhdGVqcyAvIHN1cGVyIHByb3BlcnRpZXMuIFVzZWQgYWxzbyBmb3IgY29udHJvbGxpbmcgYW5kIG9wdGltaXppbmcgdGhlIGVuZ2luZSAqL1xuICAgIHRoaXMudGlja0VuYWJsZWQgPSBmYWxzZTtcbiAgICB0aGlzLnRpY2tPblVwZGF0ZSA9IGZhbHNlO1xuICAgIHRoaXMudGlja0NoaWxkcmVuID0gZmFsc2U7XG4gICAgdGhpcy5tb3VzZUNoaWxkcmVuID0gZmFsc2U7XG4gICAgdGhpcy5tb3VzZUVuYWJsZWQgPSBmYWxzZTtcbiAgICB0aGlzLm1vdXNlRW5hYmxlZCA9IHRydWU7XG4gICAgLy90aGlzLmRyYXdSZWN0ID0gTUFZQkUgVEhJUyBzaG91bGQgYmUgdGhlIGFyZWEgb2YgdGhlIGNhbnZhcyBzaXplPyBTbyB0aGUgd2hvbGUgc3RhZ2UgaXNuJ3QgZHJhd24gb25seSB2aXNpYmxlIHBhcnQ/XG4gIH1cbiAgLyoqIHNldHRlciBhbmQgZ2V0dGVyXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gc3RhdHVzIElmIHByb3ZpZGVkIHNldHMgdGhlIGNhY2hpbmcgc3RhdHVzIG90aGVyd2lzZSByZXR1cm5zIHRoZSBjdXJyZW50IHN0YXR1cyAqL1xuICBjYWNoZUVuYWJsZWQoc3RhdHVzKSB7XG4gICAgaWYoc3RhdHVzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuX2NhY2hlRW5hYmxlZCA9IHN0YXR1cztcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5fY2FjaGVFbmFibGVkO1xuICB9XG4gIENoaWxkTmFtZWQobmFtZSkge1xuICAgIGZvciAobGV0IGxheWVyIG9mIHRoaXMuY2hpbGRyZW4pIHtcbiAgICAgIGxldCBjaGlsZDtcblxuICAgICAgaWYgKGxheWVyLm5hbWUudG9Mb3dlckNhc2UoKSA9PT0gbmFtZS50b0xvd2VyQ2FzZSgpKSB7XG4gICAgICAgIHJldHVybiBsYXllcjtcbiAgICAgIH1cblxuICAgICAgaWYgKGNoaWxkID0gbGF5ZXIuZ2V0Q2hpbGROYW1lZChuYW1lKSkge1xuICAgICAgICByZXR1cm4gY2hpbGQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbi8qKlxuICogQHRvZG8gaW1wbGVtZW50IHNwcml0ZVN0YWdlISBJdCBzaG91bGQgYmUgbW9yZSBlZmZpY2llbnQgd2hlbiB1c2luZyBzcHJpdGVzaGVldHMuIE9ubHkgaXNzdWUgd2FzIHRoYXQgbWluaWZpZWRcbiAqIGVhc2VsanMgZG9lc24ndCBoYXZlIHRoZSBzcHJpdGVTdGFnZSBhbmQgbmVpdGhlciB0aGUgbm9kZS1lYXNlbCAoYW5kIG5vZGUgZG9lc24ndCBoYXZlIHRoZSBleHRlbmQpICovIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnQgY2xhc3MgT2JqZWN0X3Nwcml0ZSBleHRlbmRzIFBJWEkuU3ByaXRlIHtcbiAgY29uc3RydWN0b3IoY29vcmRzLCBkYXRhLCBjdXJyZW50RnJhbWUsIHRocm93U2hhZG93T3B0aW9ucykge1xuICAgIHN1cGVyKGN1cnJlbnRGcmFtZSk7XG4gICAgdGhpcy5uYW1lID0gXCJPYmplY3RzX3Nwcml0ZV9cIiArIHRoaXMuaWQ7XG4gICAgdGhpcy50eXBlID0gXCJOb25lXCI7XG4gICAgdGhpcy5oaWdobGlnaHRhYmxlID0gdHJ1ZTtcbiAgICB0aGlzLnNlbGVjdGFibGUgPSB0cnVlO1xuICAgIC8qIFNldCBkYXRhIGZvciB0aGUgb2JqZWN0IG5leHQgKi9cbiAgICB0aGlzLmRhdGEgPSBkYXRhIHx8IHt9O1xuICAgIHRoaXMuY3VycmVudEZyYW1lID0gY3VycmVudEZyYW1lO1xuICAgIC8qIEV4ZWN1dGUgaW5pdGlhbCBkcmF3IGZ1bmN0aW9uICovXG4gICAgLy90aGlzLmlubmVyRHJhdyhjb29yZHMueCwgY29vcmRzLnkpO1xuICAgIHRoaXMucG9zaXRpb24uc2V0KGNvb3Jkcy54LCAgY29vcmRzLnkpO1xuICAgIC8qIGNyZWF0ZWpzIC8gc3VwZXIgcHJvcGVydGllcy4gVXNlZCBhbHNvIGZvciBjb250cm9sbGluZyBhbmQgb3B0aW1pemluZyB0aGUgZW5naW5lICovXG4gICAgdGhpcy5zZXR1cFNoYWRvdyh0aHJvd1NoYWRvd09wdGlvbnMpO1xuXG4gICAgdGhpcy50aWNrRW5hYmxlZCA9IGZhbHNlO1xuICAgIHRoaXMubW91c2VFbmFibGVkID0gZmFsc2U7XG4gIH1cbiAgLyoqIERyYXdpbmcgdGhlIG9iamVjdCB3aXRoIGNyZWF0ZWpzLW1ldGhvZHNcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHggY29vcmRpbmF0ZSB4XG4gICAqIEBwYXJhbSB7TnVtYmVyfSB5IGNvb3JkaW5hdGUgeVxuICAgKiBAcmV0dXJuIHRoaXMgb2JqZWN0IGluc3RhbmNlICovXG4gIGlubmVyRHJhdyh4LCB5KSB7XG4gICAgdGhpcy5mcm9tRnJhbWUgKCB0aGlzLmN1cnJlbnRGcmFtZSApO1xuICAgIHRoaXMueCA9IHg7XG4gICAgdGhpcy55ID0geTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIC8qKiBEcmF3cyBuZXcgZnJhbWUgdG8gYW5pbWF0ZSBvciBzdWNoXG4gICAqIEBwYXJhbSB7TnVtYmVyfSB4IGNvb3JkaW5hdGUgeFxuICAgKiBAcGFyYW0ge051bWJlcn0geSBjb29yZGluYXRlIHlcbiAgICogQHBhcmFtIHtOdW1iZXJ9IG5ld0ZyYW1lTnVtYmVyIE5ldyBmcmFtZSBudW1iZXIgdG8gYW5pbWF0ZSB0b1xuICAgKiBAcmV0dXJuIHRoaXMgb2JqZWN0IGluc3RhbmNlICovXG4gIGRyYXdOZXdGcmFtZSh4LCB5LCBuZXdGcmFtZSkge1xuICAgIHRoaXMuY3VycmVudEZyYW1lID0gbmV3RnJhbWU7XG5cbiAgICByZXR1cm4gdGhpcy5pbm5lckRyYXcoeCwgeSk7XG4gIH1cbiAgc2V0dXBTaGFkb3cob3B0aW9ucyA9IHtjb2xvcjogXCIjMDAwMDAwXCIsIG9mZnNldFg6IDUsIG9mZnNldFk6IDUsIGJsdXI6IDEwfSApIHtcbiAgICBpZih0aGlzLnRocm93U2hhZG93ID09PSB0cnVlKSB7XG4gICAgICBjb25zb2xlLndhcm4oXCJOTyBTSEFET1cgRlVOQ1RJT04gU0VUIVwiKVxuICAgIH1cbiAgfVxufSIsIi8qKiBXZSB3YW50IHRvIHB1dCBzcHJpdGVzaGVldHMgdG8gdGhlaXIgb3duIG1vZHVsZSwgc28gdGhleSBhcmUgc2VwYXJhdGVkIGFuZCBlLmcuIHdlIGNhbiByZW1vdmUgY3JlYXRlanMgZnJvbSB0aGVcbiAqIHNwcml0ZXNoZWV0IGlmIG5lZWRlZCAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbi8qIFNpbmdsZXRvbiBzbyB3ZSBkb24ndCB1c2UgY2xhc3MgZGVmaW5pdGlvbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNwcml0ZXNoZWV0TGlzdCAoKSB7XG4gIHZhciBzY29wZSA9IHt9O1xuXG4gIC8qKiBDcmVhdGUgbmV3IHNwcml0ZXNoZWV0IChuZXcgY3JlYXRlanMuU3ByaXRlU2hlZXQoKSkgYW5kIGtlZXBzIGl0IGluIG9iamVjdCBjb2xsZWN0aW9uLiBTbyB3ZSBkb24ndCBjcmVhdGUgYWNjaWRlbi1cbiAgICogdGFsbHkgYW5vdGhlciBvbmUgYW5kIHdlIGNhbiBzYWZlbHkgcmVtb3ZlIGl0IGxhdGVyLlxuICAgKiBAcGFyYW0ge09iamVjdH0gc3ByaXRlc2hlZXREYXRhIE9iamVjdCB0aGF0IGNvbnRhaW5zIGNyZWF0ZWpzLWNvbXBhdGlibGUgc3ByaXRlc2hlZXREYXRhXG4gICAqIEByZXR1cm4gbmV3IHNwcml0ZXNoZWV0IGluc3RhbmNlIHRvIHVzZS4gKi9cbiAgc2NvcGUuY3JlYXRlU3ByaXRlc2hlZXQgPSBmdW5jdGlvbiBjcmVhdGVTcHJpdGVzaGVldChzcHJpdGVzaGVldERhdGEpIHtcbiAgICB2YXIgcHJvbWlzZSA9IFEuZGVmZXIoKTtcbiAgICB2YXIgbG9hZGVyID0gUElYSS5sb2FkZXI7XG5cbiAgICBsb2FkZXIuYWRkKFwiL2Fzc2V0cy9pbWcvbWFwL3Rlc3RIZXhhZ29ucy9waXhpX3Rlc3RIZXhhZ29uU3ByaXRlc2hlZXQuanNvblwiKTtcblxuICAgIGxvYWRlci5vbmNlKCdjb21wbGV0ZScsb25Db21wbGV0ZSk7XG5cbiAgICBsb2FkZXIubG9hZCgpO1xuXG4gICAgcmV0dXJuIHByb21pc2UucHJvbWlzZTtcblxuICAgIGZ1bmN0aW9uIG9uQ29tcGxldGUoKSB7XG4gICAgICBwcm9taXNlLnJlc29sdmUodHJ1ZSk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBzY29wZTtcbn0iLCIndXNlIHN0cmljdCc7XG5cbi8qKiBUaGUgY29yZSB1dGlscyBmb3IgdGhlIDJEIG1hcCBlbmdpbmUuICovXG5cbmV4cG9ydCB2YXIgbW91c2VVdGlscyA9ICggZnVuY3Rpb24gbW91c2VVdGlscygpIHtcbiAgdmFyIHNjb3BlID0ge307XG5cbiAgLyoqIFRoaXMgZnVuY3Rpb24gaXMgZnJvbTogaHR0cDovL3d3dy5hZG9tYXMub3JnL2phdmFzY3JpcHQtbW91c2Utd2hlZWwvLCBidXQgbW9kaWZpZWQgZm9yIHRvZGF5cyBicm93c2Vyc1xuICAgIEl0IGRldGVjdHMgd2hpY2ggd2F5IHRoZSBtb3VzZXdoZWVsIGhhcyBiZWVuIG1vdmVkLlxuICAgIHplcm8gZGVsdGEgPSBtb3VzZSB3aGVlbCBub3QgbW92ZWRcbiAgICBwb3NpdGl2ZSBkZWx0YSA9IHNjcm9sbGVkIHVwXG4gICAgbmVnYXRpdmUgZGVsdGEgPSBzY3JvbGxlZCBkb3duXG5cbiAgICBAcGFyYW0ge0V2ZW50fSBldmVudCBwYXNzIHRoZSBldmVudCB0byBkZWx0YUZyb21XaGVlbFxuICAgIEByZXR1cm4gZGVsdGEuIFBvc2l0aXZlIGlmIHdoZWVsIHdhcyBzY3JvbGxlZCB1cCwgYW5kIG5lZ2F0aXZlLCBpZiB3aGVlbCB3YXMgc2Nyb2xsZWQgZG93bi4gKi9cbiAgc2NvcGUuZGVsdGFGcm9tV2hlZWwgPSBmdW5jdGlvbiggZXZlbnQgKSB7XG4gICAgdmFyIGRlbHRhID0gMDtcblxuICAgIGV2ZW50ID0gZXZlbnQgPyBldmVudCA6IHdpbmRvdy5ldmVudDsgLyogRm9yIElFLiAqL1xuXG4gICAgaWYgKCBldmVudC5kZWx0YVkgPiA5OSApIHsgLyogSUUvT3BlcmEuICovXG4gICAgICBkZWx0YSA9IGV2ZW50LmRlbHRhWSAvIDEwMDtcbiAgICB9IGVsc2UgaWYgKCBldmVudC5kZWx0YVkgPD0gOTkgKSB7XG4gICAgICBkZWx0YSA9IGV2ZW50LmRlbHRhWTtcbiAgICB9XG5cbiAgICAvKiBJZiBkZWx0YSBpcyBub256ZXJvLCBoYW5kbGUgaXQsIG90aGVyd2lzZSBzY3JhcCBpdCBCYXNpY2FsbHksIGRlbHRhIGlzIG5vdyBwb3NpdGl2ZSBpZlxuICAgIHdoZWVsIHdhcyBzY3JvbGxlZCB1cCwgYW5kIG5lZ2F0aXZlLCBpZiB3aGVlbCB3YXMgc2Nyb2xsZWQgZG93bi4gKi9cbiAgICBpZiAoIGRlbHRhICkgcmV0dXJuIGRlbHRhO1xuICB9O1xuICAvKiogSGFzIHRoZSBtb3VzZSBjbGljayBiZWVuIHJpZ2h0IG1vdXNlIGJ1dHRvblxuICAgKiBAcGFyYW0ge0V2ZW50fSBldmVudCBUaGUgZXZlbnQgd2hlcmUgdGhlIGNsaWNrIG9jY3VyZWQgKi9cbiAgc2NvcGUuaXNSaWdodENsaWNrID0gZnVuY3Rpb24oIGV2ZW50ICkge1xuICAgICB2YXIgcmlnaHRjbGljaztcblxuICAgICBldmVudCA9IGV2ZW50ID8gZXZlbnQgOiB3aW5kb3cuZXZlbnQ7IC8qIEZvciBJRS4gKi9cbiAgICAgaWYgKCBldmVudC5idXR0b25zICkgcmlnaHRjbGljayA9ICggZXZlbnQuYnV0dG9ucyA9PSAyICk7XG4gICAgIGVsc2UgaWYgKCBldmVudC53aGljaCApIHJpZ2h0Y2xpY2sgPSAoIGV2ZW50LndoaWNoID09IDMgKTtcbiAgICAgZWxzZSBpZiAoIGV2ZW50LmJ1dHRvbiApIHJpZ2h0Y2xpY2sgPSAoIGV2ZW50LmJ1dHRvbiA9PSAyICk7XG5cbiAgICAgaWYgKCByaWdodGNsaWNrICkgcmV0dXJuIHRydWU7XG5cbiAgICAgcmV0dXJuIGZhbHNlO1xuICB9O1xuICBzY29wZS5nZXRFdmVudENvb3Jkc09uUGFnZSA9IGZ1bmN0aW9uIChlKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHg6IGUucGFnZVgsXG4gICAgICB5OiBlLnBhZ2VZXG4gICAgfTtcbiAgfTtcblxuICByZXR1cm4gc2NvcGU7XG59ICkoKTtcbmV4cG9ydCB2YXIgcmVzaXplVXRpbHMgPSB7XG4gIHRvZ2dsZUZ1bGxTY3JlZW46IGZ1bmN0aW9uIHRvZ2dsZUZ1bGxTY3JlZW4oKSB7XG4gICAgdmFyIGVsZW0gPSBkb2N1bWVudC5ib2R5OyAvLyBNYWtlIHRoZSBib2R5IGdvIGZ1bGwgc2NyZWVuLlxuICAgIHZhciBpc0luRnVsbFNjcmVlbiA9ICggZG9jdW1lbnQuZnVsbFNjcmVlbkVsZW1lbnQgJiYgZG9jdW1lbnQuZnVsbFNjcmVlbkVsZW1lbnQgIT09IG51bGwgKSB8fFxuICAgICAgIChcbiAgICAgICBkb2N1bWVudC5tb3pGdWxsU2NyZWVuIHx8IGRvY3VtZW50LndlYmtpdElzRnVsbFNjcmVlbiApO1xuXG4gICAgaXNJbkZ1bGxTY3JlZW4gPyBjYW5jZWxGdWxsU2NyZWVuKCBkb2N1bWVudCApIDogcmVxdWVzdEZ1bGxTY3JlZW4oIGVsZW0gKTtcblxuICAgIHJldHVybiBmYWxzZTtcblxuICAgIC8vIFN1YiBmdW5jdGlvbnNcbiAgICBmdW5jdGlvbiBjYW5jZWxGdWxsU2NyZWVuKCBlbCApIHtcbiAgICAgICB2YXIgcmVxdWVzdE1ldGhvZCA9IGVsLmNhbmNlbEZ1bGxTY3JlZW4gfHxcbiAgICAgICAgICBlbC53ZWJraXRDYW5jZWxGdWxsU2NyZWVuIHx8XG4gICAgICAgICAgZWwubW96Q2FuY2VsRnVsbFNjcmVlbiB8fFxuICAgICAgICAgIGVsLmV4aXRGdWxsc2NyZWVuO1xuICAgICAgIGlmICggcmVxdWVzdE1ldGhvZCApIHsgLy8gY2FuY2VsIGZ1bGwgc2NyZWVuLlxuICAgICAgICAgIHJlcXVlc3RNZXRob2QuY2FsbCggZWwgKTtcbiAgICAgICB9IGVsc2UgaWYgKCB0eXBlb2Ygd2luZG93LkFjdGl2ZVhPYmplY3QgIT09IFwidW5kZWZpbmVkXCIgKSB7IC8vIE9sZGVyIElFLlxuICAgICAgICAgIHZhciB3c2NyaXB0ID0gbmV3IEFjdGl2ZVhPYmplY3QoIFwiV1NjcmlwdC5TaGVsbFwiICk7XG4gICAgICAgICAgd3NjcmlwdCAhPT0gbnVsbCAmJiB3c2NyaXB0LlNlbmRLZXlzKCBcIntGMTF9XCIgKTtcbiAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVxdWVzdEZ1bGxTY3JlZW4oIGVsICkge1xuICAgICAgIC8vIFN1cHBvcnRzIG1vc3QgYnJvd3NlcnMgYW5kIHRoZWlyIHZlcnNpb25zLlxuICAgICAgIHZhciByZXF1ZXN0TWV0aG9kID0gZWwucmVxdWVzdEZ1bGxTY3JlZW4gfHxcbiAgICAgICAgICBlbC53ZWJraXRSZXF1ZXN0RnVsbFNjcmVlbiB8fFxuICAgICAgICAgIGVsLm1velJlcXVlc3RGdWxsU2NyZWVuIHx8XG4gICAgICAgICAgZWwubXNSZXF1ZXN0RnVsbFNjcmVlbjtcblxuICAgICAgIGlmICggcmVxdWVzdE1ldGhvZCApIHsgLy8gTmF0aXZlIGZ1bGwgc2NyZWVuLlxuICAgICAgICAgIHJlcXVlc3RNZXRob2QuY2FsbCggZWwgKTtcbiAgICAgICB9IGVsc2UgaWYgKCB0eXBlb2Ygd2luZG93LkFjdGl2ZVhPYmplY3QgIT09IFwidW5kZWZpbmVkXCIgKSB7IC8vIE9sZGVyIElFLlxuICAgICAgICAgIHZhciB3c2NyaXB0ID0gbmV3IEFjdGl2ZVhPYmplY3QoIFwiV1NjcmlwdC5TaGVsbFwiICk7XG4gICAgICAgICAgd3NjcmlwdCAhPT0gbnVsbCAmJiB3c2NyaXB0LlNlbmRLZXlzKCBcIntGMTF9XCIgKTtcbiAgICAgICB9XG4gICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfSxcbiAgLyoqIFNldHMgY2FudmFzIHNpemUgdG8gbWF4aW11bSB3aWR0aCBhbmQgaGVpZ2h0IG9uIHRoZSBicm93c2VyLCBub3QgdXNpbmcgZnVsbHNjcmVlblxuICAgKiBAcGFyYW0ge0RPTUVsZW1lbnQgQ2FudmFzIGNvbnRleHR9IGNvbnRleHQgKi9cbiAgc2V0VG9GdWxsU2l6ZTogZnVuY3Rpb24gc2V0VG9GdWxsU2l6ZShjb250ZXh0KSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIGZ1bGxTaXplKCkge1xuICAgICAgdmFyIHNpemUgPSBfZ2V0V2luZG93U2l6ZSgpO1xuXG4gICAgICBjb250ZXh0LmNhbnZhcy53aWR0aCA9IHNpemUueDtcbiAgICAgIGNvbnRleHQuY2FudmFzLmhlaWdodCA9IHNpemUueTtcbiAgICB9O1xuICB9LFxuICBnZXRXaW5kb3dTaXplOiBfZ2V0V2luZG93U2l6ZVxufTtcbmV4cG9ydCB2YXIgZW52aXJvbm1lbnREZXRlY3Rpb24gPSAoZnVuY3Rpb24gKCkge1xuICB2YXIgc2NvcGUgPSB7fTtcblxuICBzY29wZS5pc01vYmlsZSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBzY3JlZW5TaXplID0gKHNjcmVlbi53aWR0aCA8PSA2NDApIHx8ICh3aW5kb3cubWF0Y2hNZWRpYSAmJiB3aW5kb3cubWF0Y2hNZWRpYSgnb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDY0MHB4KScpLm1hdGNoZXMgKTtcbiAgICB2YXIgZmVhdHVyZXMgPSAoJ29udG91Y2hzdGFydCcgaW4gd2luZG93KSB8fCAobmF2aWdhdG9yLm1heFRvdWNoUG9pbnRzID4gMCkgfHwgKG5hdmlnYXRvci5tc01heFRvdWNoUG9pbnRzID4gMCk7XG5cbiAgICByZXR1cm4gZmVhdHVyZXMgJiYgc2NyZWVuU2l6ZTtcbiAgfTtcbiAgLyoqIG1vZGlmaWVkIGNvZGUgZnJvbSBodHRwOi8vZGV0ZWN0bW9iaWxlYnJvd3NlcnMuY29tLyAqL1xuICBzY29wZS5pc01vYmlsZV9kZXRlY3RVc2VyQWdlbnQgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgdXNlckFnZW50ID0gbmF2aWdhdG9yLnVzZXJBZ2VudHx8bmF2aWdhdG9yLnZlbmRvcnx8d2luZG93Lm9wZXJhO1xuXG4gICAgcmV0dXJuIC8oYW5kcm9pZHxiYlxcZCt8bWVlZ28pLittb2JpbGV8YXZhbnRnb3xiYWRhXFwvfGJsYWNrYmVycnl8YmxhemVyfGNvbXBhbHxlbGFpbmV8ZmVubmVjfGhpcHRvcHxpZW1vYmlsZXxpcChob25lfG9kKXxpcmlzfGtpbmRsZXxsZ2UgfG1hZW1vfG1pZHB8bW1wfG1vYmlsZS4rZmlyZWZveHxuZXRmcm9udHxvcGVyYSBtKG9ifGluKWl8cGFsbSggb3MpP3xwaG9uZXxwKGl4aXxyZSlcXC98cGx1Y2tlcnxwb2NrZXR8cHNwfHNlcmllcyg0fDYpMHxzeW1iaWFufHRyZW98dXBcXC4oYnJvd3NlcnxsaW5rKXx2b2RhZm9uZXx3YXB8d2luZG93cyBjZXx4ZGF8eGlpbm8vaS50ZXN0KHVzZXJBZ2VudCl8fC8xMjA3fDYzMTB8NjU5MHwzZ3NvfDR0aHB8NTBbMS02XWl8Nzcwc3w4MDJzfGEgd2F8YWJhY3xhYyhlcnxvb3xzXFwtKXxhaShrb3xybil8YWwoYXZ8Y2F8Y28pfGFtb2l8YW4oZXh8bnl8eXcpfGFwdHV8YXIoY2h8Z28pfGFzKHRlfHVzKXxhdHR3fGF1KGRpfFxcLW18ciB8cyApfGF2YW58YmUoY2t8bGx8bnEpfGJpKGxifHJkKXxibChhY3xheil8YnIoZXx2KXd8YnVtYnxid1xcLShufHUpfGM1NVxcL3xjYXBpfGNjd2F8Y2RtXFwtfGNlbGx8Y2h0bXxjbGRjfGNtZFxcLXxjbyhtcHxuZCl8Y3Jhd3xkYShpdHxsbHxuZyl8ZGJ0ZXxkY1xcLXN8ZGV2aXxkaWNhfGRtb2J8ZG8oY3xwKW98ZHMoMTJ8XFwtZCl8ZWwoNDl8YWkpfGVtKGwyfHVsKXxlcihpY3xrMCl8ZXNsOHxleihbNC03XTB8b3N8d2F8emUpfGZldGN8Zmx5KFxcLXxfKXxnMSB1fGc1NjB8Z2VuZXxnZlxcLTV8Z1xcLW1vfGdvKFxcLnd8b2QpfGdyKGFkfHVuKXxoYWllfGhjaXR8aGRcXC0obXxwfHQpfGhlaVxcLXxoaShwdHx0YSl8aHAoIGl8aXApfGhzXFwtY3xodChjKFxcLXwgfF98YXxnfHB8c3x0KXx0cCl8aHUoYXd8dGMpfGlcXC0oMjB8Z298bWEpfGkyMzB8aWFjKCB8XFwtfFxcLyl8aWJyb3xpZGVhfGlnMDF8aWtvbXxpbTFrfGlubm98aXBhcXxpcmlzfGphKHR8dilhfGpicm98amVtdXxqaWdzfGtkZGl8a2VqaXxrZ3QoIHxcXC8pfGtsb258a3B0IHxrd2NcXC18a3lvKGN8ayl8bGUobm98eGkpfGxnKCBnfFxcLyhrfGx8dSl8NTB8NTR8XFwtW2Etd10pfGxpYnd8bHlueHxtMVxcLXd8bTNnYXxtNTBcXC98bWEodGV8dWl8eG8pfG1jKDAxfDIxfGNhKXxtXFwtY3J8bWUocmN8cmkpfG1pKG84fG9hfHRzKXxtbWVmfG1vKDAxfDAyfGJpfGRlfGRvfHQoXFwtfCB8b3x2KXx6eil8bXQoNTB8cDF8diApfG13YnB8bXl3YXxuMTBbMC0yXXxuMjBbMi0zXXxuMzAoMHwyKXxuNTAoMHwyfDUpfG43KDAoMHwxKXwxMCl8bmUoKGN8bSlcXC18b258dGZ8d2Z8d2d8d3QpfG5vayg2fGkpfG56cGh8bzJpbXxvcCh0aXx3dil8b3Jhbnxvd2cxfHA4MDB8cGFuKGF8ZHx0KXxwZHhnfHBnKDEzfFxcLShbMS04XXxjKSl8cGhpbHxwaXJlfHBsKGF5fHVjKXxwblxcLTJ8cG8oY2t8cnR8c2UpfHByb3h8cHNpb3xwdFxcLWd8cWFcXC1hfHFjKDA3fDEyfDIxfDMyfDYwfFxcLVsyLTddfGlcXC0pfHF0ZWt8cjM4MHxyNjAwfHJha3N8cmltOXxybyh2ZXx6byl8czU1XFwvfHNhKGdlfG1hfG1tfG1zfG55fHZhKXxzYygwMXxoXFwtfG9vfHBcXC0pfHNka1xcL3xzZShjKFxcLXwwfDEpfDQ3fG1jfG5kfHJpKXxzZ2hcXC18c2hhcnxzaWUoXFwtfG0pfHNrXFwtMHxzbCg0NXxpZCl8c20oYWx8YXJ8YjN8aXR8dDUpfHNvKGZ0fG55KXxzcCgwMXxoXFwtfHZcXC18diApfHN5KDAxfG1iKXx0MigxOHw1MCl8dDYoMDB8MTB8MTgpfHRhKGd0fGxrKXx0Y2xcXC18dGRnXFwtfHRlbChpfG0pfHRpbVxcLXx0XFwtbW98dG8ocGx8c2gpfHRzKDcwfG1cXC18bTN8bTUpfHR4XFwtOXx1cChcXC5ifGcxfHNpKXx1dHN0fHY0MDB8djc1MHx2ZXJpfHZpKHJnfHRlKXx2ayg0MHw1WzAtM118XFwtdil8dm00MHx2b2RhfHZ1bGN8dngoNTJ8NTN8NjB8NjF8NzB8ODB8ODF8ODN8ODV8OTgpfHczYyhcXC18ICl8d2ViY3x3aGl0fHdpKGcgfG5jfG53KXx3bWxifHdvbnV8eDcwMHx5YXNcXC18eW91cnx6ZXRvfHp0ZVxcLS9pLnRlc3QodXNlckFnZW50LnN1YnN0cigwLDQpKTtcbiAgfTtcblxuICByZXR1cm4gc2NvcGU7XG59KSgpO1xuXG4vKiogPT09PT0gUFJJVkFURSA9PT09PSAqL1xuZnVuY3Rpb24gX2dldFdpbmRvd1NpemUoKSB7XG4gIHJldHVybiB7XG4gICAgeDogd2luZG93LmlubmVyV2lkdGgsXG4gICAgeTogd2luZG93LmlubmVySGVpZ2h0XG4gIH07XG59IiwiJ3VzZXIgc3RyaWN0JztcblxuLyoqIFRoZSBjb3JlIHBsdWdpbiBmb3IgdGhlIDJEIG1hcCBlbmdpbmUuIEhhbmRsZXMgem9vbWluZyBmb3IgdGhlIG1hcC4gQ29yZSBwbHVnaW5zIGNhbiBhbHdheXMgYmUgb3Zlcndyb3RlIGlmIG5lZWRlZCAqL1xuXG4vKiogQHRvZG8gQ2hhbmdlIHRoZSBtYXAgbW92ZSBhZnRlciB6b29taW5nIHRvIGJlIG1vdXNlIGJhc2VkIG9yIHN1Y2guIE5vdyBpdCBpcyBiYXNlZCBvbiB0aGUgbWFwIGNvcm5lcnMgY29vcmRpbmF0ZXMgKi9cblxuLyoqID09PT09IE9XTiBpbXBvcnRzID09PT09ICovXG5pbXBvcnQgeyByZXNpemVVdGlscyB9IGZyb20gXCIuLi91dGlscy91dGlscy5qc1wiO1xuaW1wb3J0IHsgZXZlbnRMaXN0ZW5lcnMgYXMgZXZlbnRMaXN0ZW5lck1vZCB9IGZyb20gJy4uL2V2ZW50bGlzdGVuZXJzJztcblxuZXhwb3J0IGxldCBtYXBfem9vbSA9IChmdW5jdGlvbiBtYXBfem9vbSgpIHtcbiAgLyogTWF4aW11bSBhbmQgbWluaW11bSB0aGUgcGxheWVyIGNhbiB6b29tdCBoZSBtYXAgKi9cbiAgdmFyIHpvb21MaW1pdCA9IHtcbiAgICBmYXJ0aGVyOiAwLjQsXG4gICAgY2xvc2VyIDogMi41XG4gIH07XG4gIC8qIEhvdyBtdWNoIG9uZSBzdGVwIG9mIHpvb21pbmcgYWZmZWN0czogKi9cbiAgdmFyIHpvb21Nb2RpZmllciA9IDAuMTtcblxuICAvKiA9PT09PT09PT09PT09PT09PT09PT1cbiAgICAgTU9EVUxFIEFQSSAoaW4gc2NvcGUpXG4gICAgID09PT09PT09PT09PT09PT09PT09PSAqL1xuICB2YXIgc2NvcGUgPSB7fTtcbiAgc2NvcGUucGx1Z2luTmFtZSA9IFwibWFwX3pvb21cIjtcblxuICAvKiogUmVxdWlyZWQgaW5pdCBmdW5jdGlvbnMgZm9yIHRoZSBwbHVnaW5cbiAgKiBAcGFyYW0ge01hcCBvYmplY3R9IG1hcE9iaiAtIHRoZSBNYXAgY2xhc3Mgb2JqZWN0ICovXG4gIHNjb3BlLmluaXQgPSBmdW5jdGlvbihtYXApIHtcbiAgICBtYXAuc2V0UHJvdG90eXBlKFwiem9vbUluXCIsIHpvb21Jbik7XG4gICAgbWFwLnNldFByb3RvdHlwZShcInpvb21PdXRcIiwgem9vbU91dCk7XG4gICAgLyogQHRvZG8gdGhpbmsgdGhyb3VnaCBzaG91bGQgdGhlc2UgYmUgaW4gbWFwLnByb3RvdHlwZT8gQnV0IHpvb21MaW1pdCBhbmQgbW9kaWZpZXIgbmVlZCB0byBiZSBzZXRhYmxlIGluIGNyZWF0aW9uLFxuICAgIGluaXQgb3IgbGF0ZXIgd2l0aCBzZXR0ZXJzICovXG4gICAgbWFwLnNldFByb3RvdHlwZShcInNldFpvb21MaW1pdHNcIiwgc2V0Wm9vbUxpbWl0cyk7XG4gICAgbWFwLnNldFByb3RvdHlwZShcInNldFpvb21Nb2RpZmllclwiLCBzZXRab29tTW9kaWZpZXIpO1xuXG4gICAgaWYobWFwLm1hcEVudmlyb25tZW50KCkgPT09IFwibW9iaWxlXCIpIHtcbiAgICAgIG1hcC5ldmVudENCcy56b29tID0gX3NldHVwWm9vbUV2ZW50X21vYmlsZShtYXApO1xuICAgIH0gZWxzZSB7XG4gICAgICBtYXAuZXZlbnRDQnMuem9vbSA9IF9zZXR1cFpvb21FdmVudChtYXApO1xuICAgIH1cblxuICAgIC8qIFNpbmdsZXRvbiBzaG91bGQgaGF2ZSBiZWVuIGluc3RhbnRpYXRlZCBiZWZvcmUsIHdlIG9ubHkgcmV0cmlldmUgaXQgd2l0aCAwIHBhcmFtcyAqL1xuICAgIGV2ZW50TGlzdGVuZXJNb2QoKS50b2dnbGVab29tTGlzdGVuZXIoKTtcbiAgfTtcblxuICAvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICBwcml2YXRlIGZ1bmN0aW9ucyByZXZlYWxlZCBmb3IgdGVzdGluZ1xuICAgICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSovXG4gIC8vc2NvcGUuX3NldHVwWm9vbUV2ZW50ID0gX3NldHVwWm9vbUV2ZW50O1xuXG4gIHJldHVybiBzY29wZTtcblxuICAvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgIFBST1RPVFlQRSBleHRlbnNpb25zIGZvciBtYXBcbiAgICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PSovXG4gIC8qKiBIb3cgbXVjaCBvbmUgbW91c2Ugd2hlZWwgc3RlcCB6b29tc1xuICAgKiBAcGFyYW0ge051bWJlcn0gYW1vdW50IEhvdyBtdWNoIG9uZSBtb3VzZSB3aGVlbCBzdGVwIHpvb21zLiBOZWVkcyB0byBiZSBpbiBiZXR3ZWVuIDAgLSAwLjUgKi9cbiAgZnVuY3Rpb24gc2V0Wm9vbU1vZGlmaWVyIChhbW91bnQpIHtcbiAgICBpZighIChhbW91bnQgPiAwIHx8IGFtb3VudCA8PSAwLjUpICkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiV3Jvbmcgem9vbSBtb2RpZmllciEgKG5lZWRzIHRvIGJlID4wIGFuZCA8PTAuNSwgZ2l2ZW46XCIgKyBhbW91bnQpO1xuICAgIH1cbiAgICB6b29tTW9kaWZpZXIgPSBhbW91bnQ7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICAvKiogSG93IG11Y2ggY2FuIGJlIHpvb21lZCBpbiBtYXhpbXVtIGFuZCBtaW5pbXVtXG4gICAqIEBwYXJhbSB7TnVtYmVyIDErfSBmYXJ0aGVyIEhvdyBtdWNoIG9uZSBtb3VzZSB3aGVlbCBzdGVwIHpvb21zIG91dFxuICAgKiBAcGFyYW0ge051bWJlciAwIC0gMX0gY2xvc2VyIEhvdyBtdWNoIG9uZSBtb3VzZSB3aGVlbCBzdGVwIHpvb21zIGluICovXG4gIGZ1bmN0aW9uIHNldFpvb21MaW1pdHMgKGZhcnRoZXIsIGNsb3Nlcikge1xuICAgIHpvb21MaW1pdC5mYXJ0aGVyID0gZmFydGhlcjtcbiAgICB6b29tTGltaXQuY2xvc2VyID0gY2xvc2VyO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgLyoqIFpvb20gaW4gdG8gdGhlIG1hcFxuICAgKiBAcGFyYW0ge051bWJlcn0gYW1vdW50IGhvdyBtdWNoIG1hcCBpcyB6b29tZWQgaW4gKi9cbiAgZnVuY3Rpb24gem9vbUluIChhbW91bnQpIHtcbiAgICB2YXIgbmV3U2NhbGU7XG4gICAgdmFyIHpvb21MYXllciA9IHRoaXMuZ2V0Wm9vbUxheWVyKCk7XG5cbiAgICBpZiggIV9pc092ZXJab29tTGltaXQodGhpcy5nZXRTY2FsZSgpLCB0cnVlKSApIHtcbiAgICAgIG5ld1NjYWxlID0gem9vbUxheWVyLnNjYWxlLnkgPSB6b29tTGF5ZXIuc2NhbGUueCArPSAoIGFtb3VudCB8fCB6b29tTW9kaWZpZXIgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3U2NhbGU7XG4gIH1cbiAgLyoqIFpvb20gb3V0IG9mIHRoZSBtYXBcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGFtb3VudCBob3cgbXVjaCBtYXAgaXMgem9vbWVkIG91dCAqL1xuICBmdW5jdGlvbiB6b29tT3V0IChhbW91bnQpIHtcbiAgICB2YXIgbmV3U2NhbGU7XG4gICAgdmFyIHpvb21MYXllciA9IHRoaXMuZ2V0Wm9vbUxheWVyKCk7XG5cbiAgICBpZiggIV9pc092ZXJab29tTGltaXQodGhpcy5nZXRTY2FsZSgpKSApIHtcbiAgICAgIG5ld1NjYWxlID0gem9vbUxheWVyLnNjYWxlLnkgPSB6b29tTGF5ZXIuc2NhbGUueCAtPSAoIGFtb3VudCB8fCB6b29tTW9kaWZpZXIgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3U2NhbGU7XG4gIH1cblxuICAvKiA9PT09PT09PT09PT1cbiAgICAgSW5pdGlhbGl6ZXJzXG4gICAgID09PT09PT09PT09PSAqL1xuICBmdW5jdGlvbiBfc2V0dXBab29tRXZlbnQobWFwKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIGhhbmRsZVpvb21FdmVudChlLCBkZWx0YSwgZGVsdGFYLCBkZWx0YVkpIHtcbiAgICAgIHZhciBtb3VzZVdoZWVsRGVsdGEgPSBkZWx0YVk7XG4gICAgICAvKiBXZSB1c2Ugb2xkIHNjYWxlLCBzaW5jZSB0aGUgc2NhbGUgcmVhbGx5IGNoYW5nZXMgd2hlbiB0aGUgbWFwIGlzIGRyYXduLiBTbyB3ZSBtdXN0IG1ha2UgY2FsY3VsYXRpb25zIHdpdGggdGhlXG4gICAgICBvbGQgc2NhbGUgbm93ICovXG4gICAgICB2YXIgb2xkU2NhbGUgPSBtYXAuZ2V0U2NhbGUoKTtcblxuICAgICAgLyogTm8gbmFzdHkgc2Nyb2xsaW5nIHNpZGUtZWZmZWN0cyAqL1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICBpZihtb3VzZVdoZWVsRGVsdGEgPiAwKSB7XG4gICAgICAgIGlmKG1hcC56b29tSW4oKSkge1xuICAgICAgICAgIG1hcC5tb3ZlTWFwKF9jYWxjdWxhdGVDZW50ZXJNb3ZlQ29vcmRpbmF0ZXMob2xkU2NhbGUsIHRydWUpKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmKG1vdXNlV2hlZWxEZWx0YSA8IDApIHtcbiAgICAgICAgaWYobWFwLnpvb21PdXQoKSkge1xuICAgICAgICAgIG1hcC5tb3ZlTWFwKF9jYWxjdWxhdGVDZW50ZXJNb3ZlQ29vcmRpbmF0ZXMob2xkU2NhbGUpKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBubyBuZWVkIHdoZW4gd2UgdXNlIG1hcC5tb3ZlOlxuICAgICAgLy9tYXAuZHJhd09uTmV4dFRpY2soKTtcbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gX3NldHVwWm9vbUV2ZW50X21vYmlsZShtYXApIHtcbiAgICB6b29tTW9kaWZpZXIgPSB6b29tTW9kaWZpZXIgKiAwLjU7XG4gICAgdmFyIGluaXRpYWxpemVkID0gZmFsc2U7XG4gICAgdmFyIGRpZmZlcmVuY2UgPSB7fTtcblxuICAgIHJldHVybiBmdW5jdGlvbiBoYW5kbGVab29tRXZlbnRfbW9iaWxlKGUpIHtcbiAgICAgIHZhciBwb2ludGVycyA9IGUucG9pbnRlcnM7XG4gICAgICB2YXIgY29vcmRzID0gW3tcbiAgICAgICAgICB4OiBwb2ludGVyc1swXS5wYWdlWCxcbiAgICAgICAgICB5OiBwb2ludGVyc1swXS5wYWdlWVxuICAgICAgICB9LHtcbiAgICAgICAgICB4OiBwb2ludGVyc1sxXS5wYWdlWCxcbiAgICAgICAgICB5OiBwb2ludGVyc1sxXS5wYWdlWVxuICAgICAgfV07XG4gICAgICB2YXIgY2hhbmdlWCA9IE1hdGguYWJzKCBjb29yZHNbMF0ueCAtIGNvb3Jkc1sxXS54ICk7XG4gICAgICB2YXIgY2hhbmdlWSA9IE1hdGguYWJzKCBjb29yZHNbMF0ueSAtIGNvb3Jkc1sxXS55ICk7XG5cbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgaWYoIWluaXRpYWxpemVkKSB7XG4gICAgICAgICAgZGlmZmVyZW5jZSA9IHtcbiAgICAgICAgICAgIHg6IGNoYW5nZVgsXG4gICAgICAgICAgICB5OiBjaGFuZ2VZXG4gICAgICAgICAgfTtcbiAgICAgICAgICBpbml0aWFsaXplZCA9IHRydWU7XG5cbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0gZWxzZSBpZiAoZS5pc0ZpbmFsID09PSB0cnVlKSB7XG4gICAgICAgICAgYWxlcnQoXCJTVE9QXCIpO1xuICAgICAgICAgIGluaXRpYWxpemVkID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZihkaWZmZXJlbmNlLnggKyBkaWZmZXJlbmNlLnkgPCBjaGFuZ2VYICsgY2hhbmdlWSkge1xuICAgICAgICAgIGlmKG1hcC56b29tSW4odW5kZWZpbmVkKSkge1xuICAgICAgICAgICAgbWFwLm1vdmVNYXAoX2NhbGN1bGF0ZUNlbnRlck1vdmVDb29yZGluYXRlcyhtYXAuZ2V0U2NhbGUoKSwgdHJ1ZSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZihtYXAuem9vbU91dCh1bmRlZmluZWQpKSB7XG4gICAgICAgICAgICBtYXAubW92ZU1hcChfY2FsY3VsYXRlQ2VudGVyTW92ZUNvb3JkaW5hdGVzKG1hcC5nZXRTY2FsZSgpKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gbm8gbmVlZCB3aGVuIHdlIHVzZSBtYXAubW92ZTpcbiAgICAgICAgLy9tYXAuZHJhd09uTmV4dFRpY2soKTtcblxuICAgICAgICBkaWZmZXJlbmNlID0ge1xuICAgICAgICAgIHg6IGNoYW5nZVgsXG4gICAgICAgICAgeTogY2hhbmdlWVxuICAgICAgICB9O1xuXG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IhIFwiLCBlKTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgLyogPT09PT09PT09PT09PT09PT1cbiAgICAgUHJpdmF0ZSBmdW5jdGlvbnNcbiAgICAgPT09PT09PT09PT09PT09PT0gKi9cbiAgZnVuY3Rpb24gX2lzT3Zlclpvb21MaW1pdChhbW91bnQsIGlzWm9vbUluKSB7XG4gICAgaWYoIChpc1pvb21JbiAmJiBhbW91bnQgPiB6b29tTGltaXQuY2xvc2VyICkgfHwgKCFpc1pvb21JbiAmJiBhbW91bnQgPCB6b29tTGltaXQuZmFydGhlcikgKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgZnVuY3Rpb24gX2NhbGN1bGF0ZUNlbnRlck1vdmVDb29yZGluYXRlcyhzY2FsZSwgaXNab29tSW4pIHtcbiAgICB2YXIgd2luZG93U2l6ZSA9IHJlc2l6ZVV0aWxzLmdldFdpbmRvd1NpemUoKTtcbiAgICB2YXIgaGFsZldpbmRvd1NpemUgPSB7XG4gICAgICB4OiAoIHdpbmRvd1NpemUueCAvIDIgKSAvIHNjYWxlLFxuICAgICAgeTogKCB3aW5kb3dTaXplLnkgLyAyICkgLyBzY2FsZVxuICAgIH07XG4gICAgdmFyIHJlYWxNb3ZlbWVudCA9IHtcbiAgICAgIHg6ICggaGFsZldpbmRvd1NpemUueCApICogKCAoIGlzWm9vbUluID8gLXpvb21Nb2RpZmllciA6IHpvb21Nb2RpZmllcikgKSxcbiAgICAgIHk6ICggaGFsZldpbmRvd1NpemUueSApICogKCAoIGlzWm9vbUluID8gLXpvb21Nb2RpZmllciA6IHpvb21Nb2RpZmllcikgKVxuICAgIH07XG5cbiAgICByZXR1cm4gcmVhbE1vdmVtZW50O1xuICB9XG59KSgpOyIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBAcmVxdWlyZSBCcm93c2VyIHRoYXQgc3VwcG9ydCBwb2ludGVyIGV2ZW50cyBvciBQb2ludGVyIGV2ZW50cyBwb2x5ZmlsbCwgc3VjaCBhczogaHR0cHM6Ly9naXRodWIuY29tL2pxdWVyeS9QRVAgKi9cblxuaW1wb3J0IHsgZXZlbnRMaXN0ZW5lcnMgYXMgZXZlbnRMaXN0ZW5lck1vZCB9IGZyb20gJy4uLy4uLy4uL2NvcmUvZXZlbnRsaXN0ZW5lcnMnO1xuaW1wb3J0IHsgbW91c2VVdGlscyB9IGZyb20gJy4uLy4uLy4uL2NvcmUvdXRpbHMvdXRpbHMnO1xuXG4vKiBldmVudGxpc3RlbmVycyBpcyBhIHNpbmdsZXRvbiwgc28gd2UgbWlnaHQgYXMgd2VsbCBkZWNsYXJlIGl0IGhlcmUgKi9cbnZhciBldmVudGxpc3RlbmVycztcblxuZXhwb3J0IGZ1bmN0aW9uIHNldHVwSGV4YWdvbkNsaWNrKG1hcCwgY2FsbGJhY2spIHtcbiAgLyogU2luZ2xldG9uIHNob3VsZCBoYXZlIGJlZW4gaW5zdGFudGlhdGVkIGJlZm9yZSwgd2Ugb25seSByZXRyaWV2ZSBpdCB3aXRoIDAgcGFyYW1zISAqL1xuICBldmVudGxpc3RlbmVycyA9IGV2ZW50TGlzdGVuZXJNb2QoKTtcblxuICBpZihtYXAubWFwRW52aXJvbm1lbnQoKSA9PT0gXCJtb2JpbGVcIikge1xuICAgIG1hcC5ldmVudENCcy5zZWxlY3QgPSBzZXR1cFRhcExpc3RlbmVyKG1hcCwgY2FsbGJhY2spO1xuICB9IGVsc2Uge1xuICAgIG1hcC5ldmVudENCcy5zZWxlY3QgPSBtb3VzZURvd25MaXN0ZW5lcjtcbiAgfVxuICBldmVudGxpc3RlbmVycy50b2dnbGVTZWxlY3RMaXN0ZW5lcigpO1xuXG4gIHJldHVybiBmYWxzZTtcblxuICBmdW5jdGlvbiBtb3VzZURvd25MaXN0ZW5lcigpIHtcbiAgICBvbk1vdXNlVXAobWFwLCBjYWxsYmFjayk7XG4gIH1cbiAgZnVuY3Rpb24gc2V0dXBUYXBMaXN0ZW5lcihtYXAsIGNhbGxiYWNrKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIHRhcExpc3RlbmVyKGUpIHtcbiAgICAgIHZhciB0b3VjaENvb3JkcyA9IGUuY2VudGVyO1xuICAgICAgdmFyIGdsb2JhbENvb3JkcyA9ICB7XG4gICAgICAgIHg6IHRvdWNoQ29vcmRzLngsIHk6IHRvdWNoQ29vcmRzLnlcblxuICAgICAgfTtcbiAgICAgIHZhciBvYmplY3RzO1xuXG4gICAgICBvYmplY3RzID0gbWFwLmdldE9iamVjdHNVbmRlck1hcFBvaW50KGdsb2JhbENvb3Jkcyk7XG5cbiAgICAgIGlmIChvYmplY3RzICYmIG9iamVjdHMubGVuZ3RoID4gMCkge1xuICAgICAgICBjYWxsYmFjayhvYmplY3RzKTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG59XG5cbmZ1bmN0aW9uIG9uTW91c2VVcChtYXAsIGNhbGxiYWNrKSB7XG4gIG1hcC5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgcmV0cmlldmVDbGlja0RhdGEpO1xuXG4gIGZ1bmN0aW9uIHJldHJpZXZlQ2xpY2tEYXRhKGUpIHtcbiAgICBpZiggbWFwLm1hcE1vdmVkKCkgKSB7XG4gICAgICBtYXAuY2FudmFzLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIHJldHJpZXZlQ2xpY2tEYXRhKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICB2YXIgZ2xvYmFsQ29vcmRzID0gbW91c2VVdGlscy5nZXRFdmVudENvb3Jkc09uUGFnZShlKTtcbiAgICB2YXIgb2JqZWN0cztcblxuICAgIG9iamVjdHMgPSBtYXAuZ2V0T2JqZWN0c1VuZGVyTWFwUG9pbnQoZ2xvYmFsQ29vcmRzKTtcblxuICAgIGlmIChvYmplY3RzICYmIG9iamVjdHMubGVuZ3RoID4gMCkge1xuICAgICAgY2FsbGJhY2sob2JqZWN0cyk7XG4gICAgfVxuXG4gICAgbWFwLmNhbnZhcy5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCByZXRyaWV2ZUNsaWNrRGF0YSk7XG4gIH1cbn0iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB7IGNyZWF0ZUhleGFnb24gfSBmcm9tICcuLi91dGlscy9waXhpX2NyZWF0ZUhleGFnb24nO1xuaW1wb3J0IGhleGFnb25NYXRoIGZyb20gJy4uL3V0aWxzL2hleGFnb25NYXRoJztcblxudmFyIHNoYXBlO1xuXG5leHBvcnQgdmFyIG9iamVjdF9zcHJpdGVfaGV4YSA9IHtcbiAgYnVpbGQ6IGZ1bmN0aW9uIGNhbGN1bGF0ZUhleGEocmFkaXVzKSB7XG4gICAgICBpZiAoIXJhZGl1cykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJOZWVkIHJhZGl1cyFcIik7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IEhFSUdIVCA9IGhleGFnb25NYXRoLmNhbGNIZWlnaHQocmFkaXVzKTtcbiAgICAgIGNvbnN0IFNJREUgPSBoZXhhZ29uTWF0aC5jYWxjU2lkZShyYWRpdXMpO1xuXG4gICAgICB0aGlzLmFuY2hvci5zZXQoMC41LCAwLjUpO1xuICAgICAgdGhpcy5IRUlHSFQgPSBIRUlHSFQ7XG4gICAgICB0aGlzLlNJREUgPSBTSURFO1xuXG4gICAgICAvKiBEcmF3IGhleGFnb24gdG8gdGVzdCB0aGUgaGl0cyB3aXRoIGhpdEFyZWEgKi9cbiAgICAgIHRoaXMuaGl0QXJlYSA9IHNldEFuZEdldFNoYXBlKHJhZGl1cyk7XG4gICAgfVxufTtcblxuZnVuY3Rpb24gc2V0QW5kR2V0U2hhcGUocmFkaXVzKSB7XG4gIGlmICghc2hhcGUpIHtcbiAgICBsZXQgaGV4YWdvblNpemUgPSBoZXhhZ29uTWF0aC5nZXRIZXhhU2l6ZShyYWRpdXMpO1xuICAgIC8qIHggYW5kIHkgYXJlIHJldmVyc2VkLCBzaW5jZSB0aGlzIGlzIGhvcml6b250YWwgaGV4YWdvbiBhbmQgY2FsY3VsYXRpb25zIGFyZSBmb3IgdmVydGljYWwgKi9cbiAgICBzaGFwZSA9IGNyZWF0ZUhleGFnb24oe1xuICAgICAgeDogaGV4YWdvblNpemUueSAvIDIsXG4gICAgICB5OiBoZXhhZ29uU2l6ZS54IC8gMiB9LFxuICAgICAgcmFkaXVzXG4gICAgKTtcbiAgfVxuXG4gIHJldHVybiBzaGFwZTtcbn0iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB7IG9iamVjdF9zcHJpdGVfaGV4YSB9IGZyb20gJy4vcGl4aV9PYmplY3RfaGV4YSc7XG5pbXBvcnQgeyBPYmplY3Rfc3ByaXRlX3RlcnJhaW4gfSBmcm9tICcuLi8uLi8uLi9jb3JlL29iamVjdHMvcGl4aV9PYmplY3Rfc3ByaXRlX3RlcnJhaW4nO1xuXG5leHBvcnQgY2xhc3MgT2JqZWN0X3RlcnJhaW4gZXh0ZW5kcyBPYmplY3Rfc3ByaXRlX3RlcnJhaW4ge1xuICBjb25zdHJ1Y3Rvcihjb29yZHMgPSB7eDowLCB5OjB9LCBkYXRhLCBjdXJyZW50RnJhbWVOdW1iZXIsIGV4dHJhID0ge3JhZGl1czogMCB9KSB7XG4gICAgc3VwZXIoY29vcmRzLCBkYXRhLCBjdXJyZW50RnJhbWVOdW1iZXIpO1xuXG4gICAgdGhpcy5uYW1lID0gXCJEZWZhdWx0VGVycmFpbk9iamVjdF9oZXhhXCI7XG5cbiAgICBvYmplY3Rfc3ByaXRlX2hleGEuYnVpbGQuY2FsbCh0aGlzLCBleHRyYS5yYWRpdXMpO1xuICB9XG59IiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgeyBvYmplY3Rfc3ByaXRlX2hleGEgfSBmcm9tICcuL3BpeGlfT2JqZWN0X2hleGEnO1xuaW1wb3J0IHsgT2JqZWN0X3Nwcml0ZV91bml0IH0gZnJvbSAnLi4vLi4vLi4vY29yZS9vYmplY3RzL3BpeGlfT2JqZWN0X3Nwcml0ZV91bml0JztcblxuZXhwb3J0IGNsYXNzIE9iamVjdF91bml0IGV4dGVuZHMgT2JqZWN0X3Nwcml0ZV91bml0IHtcbiAgY29uc3RydWN0b3IoY29vcmRzID0ge3g6MCwgeTowfSwgZGF0YSwgY3VycmVudEZyYW1lTnVtYmVyLCBleHRyYSA9IHtyYWRpdXM6IDAgfSkge1xuICAgIHN1cGVyKGNvb3JkcywgZGF0YSwgY3VycmVudEZyYW1lTnVtYmVyKTtcblxuICAgIHRoaXMubmFtZSA9IFwiRGVmYXVsdFVuaXRPYmplY3RzX2hleGFcIjtcblxuICAgIG9iamVjdF9zcHJpdGVfaGV4YS5idWlsZC5jYWxsKHRoaXMsIGV4dHJhLnJhZGl1cyk7XG4gIH1cbn0iLCIvKkNhbGN1bGF0ZSB0aGUgY29vcmRpbmF0ZXMgb2YgdGhlIGNlbnRlciBoZXhhZ29uIGFsd2F5cyBhbmQgZ2V0IG9iamVjdHMgYmFzZWQgb24gdGhlIGNvb3JkaW5hdGVzLiBGb3IgZXhhbXBsZSB3aXRoXG4gIHNvbWUgbWV0aG9kIGxpa2UgZ2V0QWxsT2JqZWN0c0luSGV4YWdvbi5cblNPOlxuV2UgY3JlYXRlIGEgZnVuY3Rpb24gZm9yIGxheWVycywgbGlrZSBcIm1hcF91dGlsc19oZXhhZ29uPyAtPiBnZXRIZXhhZ29uQ29vcmRzRnJvbUNsaWNrKHgseSksIGdldE9iamVjdHNJbkhleGFnb24oaGV4YWdvbj8pXCJcbi0gVGhlcmUgd2Ugb25seSBmaW5kIG91dCBhYm91dCB0aGUgY29vcmRpbmF0ZXMgZm9yIHRoZSBvYmplY3QsIHdlIGRvbnQgdXNlIGdldE9CamVjdFVuZGVyUG9pbnQuIElmIHRoZSBjb29yZHMgZXF1YWwgdG9cbnRob3NlIGdvdHRlbiBmcm9tOiBnZXRIZXhhZ29uQ29vcmRzRnJvbUNsaWNrLCB0aGVuIHRoYXQgb2JqZWN0IGlzIGFkZGVkIHRvIHJldHVybmVkIGFycmF5LiBXZSBjYW4gYWxzbyBjYWNoZSB0aGVzZSBpZlxubmVlZGVkIGZvciBwZXJmb3JtYW5jZVxuXG5IT1cgd2UgZG8gdGhlIHdob2xlIG9yZ2FuaXphdGlvbmFsIHN0dWZmP1xuLSBtYXBfbW92ZVxuLSBtYXBfdXRpbHNfaGV4YWdvbj8gLT4gZ2V0SGV4YWdvbkNvb3Jkc0Zyb21DbGljayh4LHkpLCBnZXRPYmplY3RzSW5IZXhhZ29uKGhleGFnb24/KVxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG4vL2ltcG9ydCB7IG1hcF9jb29yZHNfaG9yaXpvbnRhbEhleCB9IGZyb20gJy4uL2Nvb3JkaW5hdGVzL01hcF9jb29yZHNfaG9yaXpvbnRhbEhleCc7XG5pbXBvcnQgeyBzZXR1cEhleGFnb25DbGljayB9IGZyb20gJy4uL2V2ZW50TGlzdGVuZXJzL3NlbGVjdCc7XG5pbXBvcnQgeyBVSSB9IGZyb20gJy4uLy4uLy4uL2NvcmUvVUknO1xuXG5leHBvcnQgbGV0IG9iamVjdF9zZWxlY3RfaGV4YWdvbiA9IChmdW5jdGlvbiBvYmplY3Rfc2VsZWN0X2hleGFnb24oKSB7XG4gIHZhciBzY29wZSA9IHt9O1xuICBzY29wZS5wbHVnaW5OYW1lID0gXCJvYmplY3Rfc2VsZWN0XCI7XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7TWFwIG9iamVjdH0gbWFwT2JqIC0gdGhlIE1hcCBjbGFzcyBvYmplY3RcbiAgICovXG4gIHNjb3BlLmluaXQgPSBmdW5jdGlvbihtYXBPYmopIHtcbiAgICAvKiBXZSB0YWtlIHRoZSB0b3AtbW9zdCBzdGFnZSBvbiB0aGUgbWFwIGFuZCBhZGQgdGhlIGxpc3RlbmVyIHRvIGl0ICovXG4gICAgX2NyZWF0ZVByb3RvdHlwZXMobWFwT2JqKTtcblxuICAgIF9zdGFydENsaWNrTGlzdGVuZXIobWFwT2JqKTtcbiAgfTtcblxuICByZXR1cm4gc2NvcGU7XG5cbiAgZnVuY3Rpb24gZ2V0T2JqZWN0c0Zvck1hcChjbGlja0Nvb3Jkcykge1xuICAgIHZhciBvYmplY3RzID0gdGhpcy5nZXRTdGFnZSgpLmdldE9iamVjdHNVbmRlclBvaW50KGNsaWNrQ29vcmRzLngsIGNsaWNrQ29vcmRzLnkpO1xuXG4gICAgcmV0dXJuIG9iamVjdHM7XG4gIH1cbiAgZnVuY3Rpb24gZ2V0T2JqZWN0c0ZvckxheWVyKGNsaWNrQ29vcmRzKSB7XG4gICAgcmV0dXJuIHRoaXMuY2hpbGRyZW4uZmlsdGVyKGZ1bmN0aW9uKGNoaWxkKSB7XG4gICAgICBpZiAoY2hpbGQueCA9PT0gY2xpY2tDb29yZHMueCAmJiBjaGlsZC55ID09PSBjbGlja0Nvb3Jkcy55KSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSk7XG4gIH1cbiAgLyogPT09PT09IFByaXZhdGUgZnVuY3Rpb25zID09PT09PSAqL1xuICAvKipcbiAgICogQXR0YWNoZWQgdGhlIGNvcnJlY3QgcHJvdG90eXBlcyB0byBtYXAuIEkgZG8gbm90IHRoaW5rIHdlIG5lZWQgdG8gb3ZlcnJpZGUgZ2V0T2JqZWN0c1VuZGVyUG9pbnQgZm9yIHN0YWdlcy5cbiAgICpcbiAgICogQHBhcmFtIHtjcmVhdGVqcy5TdGFnZX0gdG9wTW9zdFN0YWdlIC0gY3JlYXRlanMuU3RhZ2Ugb2JqZWN0LCB0aGF0IGlzIHRoZSB0b3Btb3N0IG9uIHRoZSBtYXAgKG1lYW50IGZvciBpbnRlcmFjdGlvbikuXG4gICAqIEBwYXJhbSB7TWFwfSBtYXAgLSBUaGUgTWFwIGNsYXNzIG9iamVjdFxuICAgKi9cbiAgZnVuY3Rpb24gX2NyZWF0ZVByb3RvdHlwZXMobWFwKSB7XG4gICAgbWFwLnNldFByb3RvdHlwZShcImdldE9iamVjdHNVbmRlck1hcFBvaW50XCIsIGdldE9iamVjdHNGb3JNYXApO1xuICAgIG1hcC5zZXRQcm90b3R5cGUoXCJnZXRPYmplY3RzVW5kZXJQb2ludFwiLCBnZXRPYmplY3RzRm9yTGF5ZXIpO1xuICB9XG4gIC8qKlxuICAgKiBAcGFyYW0ge2NyZWF0ZWpzLlN0YWdlfSB0b3BNb3N0U3RhZ2UgLSBjcmVhdGVqcy5TdGFnZSBvYmplY3QsIHRoYXQgaXMgdGhlIHRvcG1vc3Qgb24gdGhlIG1hcCAobWVhbnQgZm9yIGludGVyYWN0aW9uKS5cbiAgICogQHBhcmFtIHtNYXB9IG1hcCAtIFRoZSBNYXAgY2xhc3Mgb2JqZWN0XG4gICAqL1xuICBmdW5jdGlvbiBfc3RhcnRDbGlja0xpc3RlbmVyKCBtYXAgKSB7XG4gICAgdmFyIHNpbmdsZXRvblVJID0gVUkoKTtcblxuICAgIHJldHVybiBzZXR1cEhleGFnb25DbGljayhtYXAsIHNpbmdsZXRvblVJLnNob3dTZWxlY3Rpb25zKTtcbiAgfVxufSkoKTsiLCIndXNlIHN0cmljdCc7XG5cbi8qIE5PVEU6IFRoZXNlIGNhbGN1bGF0aW9ucyBhcmUgZm9yIHZlcnRpY2FsIGhleGFnb25zICovXG5cbmV4cG9ydCBmdW5jdGlvbiBjYWxjSGVpZ2h0KHJhZGl1cykge1xuICByZXR1cm4gcmFkaXVzICogTWF0aC5zcXJ0KDMpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGNhbGNTaWRlKHJhZGl1cykge1xuICByZXR1cm4gcmFkaXVzICogMyAvIDI7XG59XG5cbi8qIE1vZGlmaWVkIEZyb20gamF2YSBleGFtcGxlOiBodHRwOi8vYmxvZy5ydXNsYW5zLmNvbS8yMDExLzAyL2hleGFnb25hbC1ncmlkLW1hdGguaHRtbFxuICAgVGhpcyBpcyBzdXBwb3NlZCB0byBjYWxjdWxhdGUgdGhlIGNvcnJlY3QgaGV4YWdvbmFsIGluZGV4LCB0aGF0IHJlcHJlc2VudHMgdGhlIGhleGFnb24gdGhlIHBsYXllciBjbGlja2VkICovXG5leHBvcnQgZnVuY3Rpb24gc2V0Q2VsbEJ5UG9pbnQocmFkaXVzLCB4LCB5KSB7XG4gIHZhciBIRUlHSFQgPSByYWRpdXMgKiBNYXRoLnNxcnQoMyk7XG4gIHZhciBTSURFID0gcmFkaXVzICogMyAvIDI7XG5cbiAgdmFyIGNpID0gTWF0aC5mbG9vcih4L1NJREUpO1xuICB2YXIgY3ggPSB4IC0gU0lERSAqIGNpO1xuXG4gIHZhciB0eSA9IHkgLSAoY2kgJSAyKSAqIEhFSUdIVCAvIDI7XG4gIHZhciBjaiA9IE1hdGguZmxvb3IoIHR5IC8gSEVJR0hUKTtcbiAgdmFyIGN5ID0gdHkgLSBIRUlHSFQgKiBjajtcblxuICBpZiAoY3ggPiBNYXRoLmFicyhyYWRpdXMgLyAyIC0gcmFkaXVzICogY3kgLyBIRUlHSFQpKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgeDogY2ksXG4gICAgICAgIHk6IGNqXG4gICAgICB9O1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB7XG4gICAgICB4OiBjaSAtIDEsXG4gICAgICB5OiBjaiArIChjaSAlIDIpIC0gKChjeSA8IEhFSUdIVCAvIDIpID8gMSA6IDApXG4gICAgfTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0SGV4YVNpemUocmFkaXVzKSB7XG4gIHJldHVybiB7XG4gICAgcmFkaXVzOiByYWRpdXMsXG4gICAgeDogcmFkaXVzICogMixcbiAgICB5OiByYWRpdXMgKiBNYXRoLnNxcnQoMylcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRvSGV4YUNlbnRlckNvb3JkKGhleFJhZGl1cywgeCwgeSkge1xuICB2YXIgaGV4YVNpemUgPSBnZXRIZXhhU2l6ZShoZXhSYWRpdXMpO1xuICB2YXIgcmFkaXVzID0gaGV4YVNpemUucmFkaXVzO1xuICB2YXIgaGFsZkhleGFTaXplID0ge1xuICAgIHg6IGhleGFTaXplLnJhZGl1cyxcbiAgICB5OiBoZXhhU2l6ZS55ICogMC41XG4gIH07XG4gIHZhciBjZW50ZXJDb29yZHMgPSB7fTtcbiAgdmFyIGNvb3JkaW5hdGVJbmRleGVzO1xuXG4gIGNvb3JkaW5hdGVJbmRleGVzID0gc2V0Q2VsbEJ5UG9pbnQocmFkaXVzLCB4LCB5KTtcblxuICBpZiAoY29vcmRpbmF0ZUluZGV4ZXMueCA8IDAgJiYgY29vcmRpbmF0ZUluZGV4ZXMueCA8IDApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJjbGljayBvdXRzaWRlIG9mIHRoZSBoZXhhZ29uIGFyZWFcIik7XG4gIH1cbiAgY2VudGVyQ29vcmRzID0ge1xuICAgIHg6IE1hdGgucm91bmQoY29vcmRpbmF0ZUluZGV4ZXMueCAqIGhleGFTaXplLnggKyBoYWxmSGV4YVNpemUueCksXG4gICAgeTogTWF0aC5yb3VuZChjb29yZGluYXRlSW5kZXhlcy55ICogaGV4YVNpemUueSArIGhhbGZIZXhhU2l6ZS55KVxuICB9O1xuXG4gIHJldHVybiBjZW50ZXJDb29yZHM7XG59O1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGNhbGNIZWlnaHQ6IGNhbGNIZWlnaHQsXG4gIGNhbGNTaWRlOiBjYWxjU2lkZSxcbiAgc2V0Q2VsbEJ5UG9pbnQ6IHNldENlbGxCeVBvaW50LFxuICBnZXRIZXhhU2l6ZTogZ2V0SGV4YVNpemUsXG4gIHRvSGV4YUNlbnRlckNvb3JkOiB0b0hleGFDZW50ZXJDb29yZFxufTsiLCIndXNlIHN0cmljdCdcblxuLyoqIENyZWRpdHMgYmVsb2duIHRvOiBodHRwczovL2dpdGh1Yi5jb20vYWxmb3Juby1wcm9kdWN0aW9ucy9IZXhQaXhpSnMvYmxvYi9tYXN0ZXIvbGliL2hleFBpeGkuanMgKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVIZXhhZ29uKGNvb3JkcyA9IHsgeDowLCB5OjAgfSwgcmFkaXVzLCBhbmdsZSA9IDMwLCBpc0ZsYXRUb3AgPSBmYWxzZSkge1xuICB2YXIgaSA9IDAsXG4gICAgICBvZmZzZXQgPSBpc0ZsYXRUb3AgPyAwIDogMC41LFxuICAgICAgYW5nbGUgPSAyICogTWF0aC5QSSAvIDYgKiBvZmZzZXQsXG4gICAgICBjZW50ZXIgPSBjb29yZHMsXG4gICAgICB4ID0gY2VudGVyLnggKiBNYXRoLmNvcyhhbmdsZSksXG4gICAgICB5ID0gY2VudGVyLnkgKiBNYXRoLnNpbihhbmdsZSksXG4gICAgICBwb2ludHMgPSBbXTtcblxuICBwb2ludHMucHVzaChuZXcgUElYSS5Qb2ludCh4LCB5KSk7XG5cbiAgZm9yIChpID0gMTsgaSA8IDc7IGkrKykge1xuICAgICAgYW5nbGUgPSAyICogTWF0aC5QSSAvIDYgKiAoaSArIG9mZnNldCk7XG4gICAgICB4ID0gY2VudGVyLnggKiBNYXRoLmNvcyhhbmdsZSk7XG4gICAgICB5ID0gY2VudGVyLnkgKiBNYXRoLnNpbihhbmdsZSk7XG5cbiAgICAgIHBvaW50cy5wdXNoKG5ldyBQSVhJLlBvaW50KHgsIHkpKTtcbiAgfVxuXG4gIHJldHVybiBuZXcgUElYSS5Qb2x5Z29uKHBvaW50cyk7XG59IiwiZXhwb3J0IGxldCBnYW1lRGF0YSA9IHtcbiAgSUQ6IFwiNTM4MzdkNDc5NzZmZWQzYjI0MDAwMDA1XCIsXG4gIHR1cm46IDEsXG4gIG1hcFNpemU6IHsgeDogNTAsIHk6IDIwIH0sXG4gIHBsdWdpbnNUb0FjdGl2YXRlOiB7XG4gICAgbWFwOiBbXCJtYXBfZHJhZ1wiLCBcIm9iamVjdF9zZWxlY3RfaGV4YWdvblwiXVxuICB9XG59OyIsImV4cG9ydCBsZXQgbWFwRGF0YSA9IHtcbiAgZ2FtZUlEOiBcIjUzODM3ZDQ3OTc2ZmVkM2IyNDAwMDAwNVwiLFxuICB0dXJuOiAxLFxuICBzdGFydFBvaW50OiB7IHg6IDAsIHk6IDAgfSxcbiAgZWxlbWVudDogXCIjbWFwQ2FudmFzXCIsXG4gIGxheWVyczogW3tcbiAgICB0eXBlOiBcIk1hcF9sYXllclwiLFxuICAgIGNvb3JkOiB7IHg6IDAsIHk6IDAgfSxcbiAgICBuYW1lOiBcInRlcnJhaW5CYXNlTGF5ZXJcIixcbiAgICBzcGVjaWFsczogW3tcbiAgICAgIFwiaW50ZXJhY3RpdmVcIjogZmFsc2VcbiAgICB9XSxcbiAgICBvcHRpb25zOiB7XG4gICAgICBjYWNoZTogdHJ1ZVxuICAgIH0sXG4gICAgb2JqZWN0R3JvdXBzOiBbe1xuICAgICAgdHlwZTogXCJPYmplY3RfdGVycmFpblwiLFxuICAgICAgbmFtZTogXCJUZXJyYWluQmFzZVwiLCAvLyBJIGd1ZXNzIG9ubHkgZm9yIGRlYnVnZ2luZz9cbiAgICAgIHR5cGVJbWFnZURhdGE6IFwidGVycmFpbkJhc2VcIixcbiAgICAgIG9iamVjdHM6IFt7XG4gICAgICAgICBcIm9ialR5cGVcIjowLFxuICAgICAgICAgXCJuYW1lXCI6XCJzd2FtcFwiLFxuICAgICAgICAgXCJfaWRcIjpcIjUzODM3ZDQ5OTc2ZmVkM2IyNDAwMDZiOFwiLFxuICAgICAgICAgXCJjb29yZFwiOntcbiAgICAgICAgICAgIFwieFwiOlwiMFwiLFxuICAgICAgICAgICAgXCJ5XCI6XCIwXCJcbiAgICAgICAgIH0sXG4gICAgICAgICBcImRhdGFcIjoge30sXG4gICAgICAgICBcImxhc3RTZWVuVHVyblwiOlwiMVwiXG4gICAgICB9LHtcbiAgICAgICAgIFwib2JqVHlwZVwiOjEsXG4gICAgICAgICBcIm5hbWVcIjpcInN3YW1wXCIsXG4gICAgICAgICBcIl9pZFwiOlwiNTM4MzdkNDk5NzZmZWQzYjI0MDAwNmJkXCIsXG4gICAgICAgICBcImNvb3JkXCI6e1xuICAgICAgICAgICAgXCJ4XCI6XCIwXCIsXG4gICAgICAgICAgICBcInlcIjpcIjE0MFwiXG4gICAgICAgICB9LFxuICAgICAgICAgXCJkYXRhXCI6IHt9LFxuICAgICAgICAgXCJsYXN0U2VlblR1cm5cIjpcIjFcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgIFwib2JqVHlwZVwiOjIsXG4gICAgICAgICBcIm5hbWVcIjpcInR1bmRyYVwiLFxuICAgICAgICAgXCJfaWRcIjpcIjUzODM3ZDQ5OTc2ZmVkM2IyNDAwMDZjMlwiLFxuICAgICAgICAgXCJjb29yZFwiOntcbiAgICAgICAgICAgIFwieFwiOlwiNDFcIixcbiAgICAgICAgICAgIFwieVwiOlwiNzBcIlxuICAgICAgICAgfSxcbiAgICAgICAgIFwiZGF0YVwiOiB7fSxcbiAgICAgICAgIFwibGFzdFNlZW5UdXJuXCI6XCIxXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICBcIm9ialR5cGVcIjozLFxuICAgICAgICAgXCJuYW1lXCI6XCJmb3Jlc3RcIixcbiAgICAgICAgIFwiX2lkXCI6XCI1MzgzN2Q0OTk3NmZlZDNiMjQwMDA2YzdcIixcbiAgICAgICAgIFwiY29vcmRcIjp7XG4gICAgICAgICAgICBcInhcIjpcIjgyXCIsXG4gICAgICAgICAgICBcInlcIjpcIjE0MFwiXG4gICAgICAgICB9LFxuICAgICAgICAgXCJkYXRhXCI6IHt9LFxuICAgICAgICAgXCJsYXN0U2VlblR1cm5cIjpcIjFcIlxuICAgICAgfV1cbiAgICB9XVxuICB9XVxufTsiLCJleHBvcnQgbGV0IHR5cGVEYXRhID0ge1xuICBcImdyYXBoaWNEYXRhXCI6IHtcbiAgICBcInRlcnJhaW5CYXNlXCI6e1xuICAgICAgXCJqc29uXCI6IFwiL2Fzc2V0cy9pbWcvbWFwL3Rlc3RIZXhhZ29ucy9waXhpX3Rlc3RIZXhhZ29uU3ByaXRlc2hlZXQuanNvblwiXG4gICAgfVxuICB9LFxuICBcIm9iamVjdERhdGFcIjoge1xuICAgIFwidGVycmFpbkJhc2VcIjpbe1xuICAgICAgICBcImltYWdlXCI6XCJ0ZXJyYWluX2JsdWVIZXhhZ29uLnBuZ1wiLFwiYXR0YWNoZWRUb1RlcnJhaW5zXCI6W1wiMFwiXSxcInByb3BhYmlsaXR5XCI6XCIxMDAlXCIsIFwibmFtZVwiOiBcImZvckRlYnVnZ2luZyAtIHRlcnJhaW5CYXNlIDBcIlxuICAgICAgfSx7XG4gICAgICAgIFwiaW1hZ2VcIjpcInRlcnJhaW5fZ3JlZW5IZXhhZ29uLnBuZ1wiLFwiYXR0YWNoZWRUb1RlcnJhaW5zXCI6W1wiMlwiXSxcInByb3BhYmlsaXR5XCI6XCIxMDAlXCIsIFwibmFtZVwiOiBcImZvckRlYnVnZ2luZyAtIHRlcnJhaW5CYXNlIDFcIlxuICAgICAgfSx7XG4gICAgICAgIFwiaW1hZ2VcIjpcInRlcnJhaW5fcmVkSGV4YWdvbi5wbmdcIixcImF0dGFjaGVkVG9UZXJyYWluc1wiOltcIjFcIl0sXCJwcm9wYWJpbGl0eVwiOlwiMTAwJVwiLCBcIm5hbWVcIjogXCJmb3JEZWJ1Z2dpbmcgLSB0ZXJyYWluQmFzZSAyXCJcbiAgICAgIH0se1xuICAgICAgICBcImltYWdlXCI6XCJ0ZXJyYWluX3llbGxvd0hleGFnb24ucG5nXCIsXCJhdHRhY2hlZFRvVGVycmFpbnNcIjpbXCI0XCJdLFwicHJvcGFiaWxpdHlcIjpcIjEwMCVcIiwgXCJuYW1lXCI6IFwiZm9yRGVidWdnaW5nIC0gdGVycmFpbkJhc2UgM1wiXG4gICAgICB9XVxuICB9XG59OyJdfQ==
