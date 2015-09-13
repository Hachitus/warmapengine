(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
"use strict";

require("core-js/shim");

require("regenerator/runtime");

if (global._babelPolyfill) {
  throw new Error("only one instance of babel/polyfill is allowed");
}
global._babelPolyfill = true;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"core-js/shim":180,"regenerator/runtime":181}],2:[function(require,module,exports){
module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};
},{}],3:[function(require,module,exports){
var isObject = require('./$.is-object');
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};
},{"./$.is-object":33}],4:[function(require,module,exports){
// false -> Array#indexOf
// true  -> Array#includes
var toIObject = require('./$.to-iobject')
  , toLength  = require('./$.to-length')
  , toIndex   = require('./$.to-index');
module.exports = function(IS_INCLUDES){
  return function($this, el, fromIndex){
    var O      = toIObject($this)
      , length = toLength(O.length)
      , index  = toIndex(fromIndex, length)
      , value;
    // Array#includes uses SameValueZero equality algorithm
    if(IS_INCLUDES && el != el)while(length > index){
      value = O[index++];
      if(value != value)return true;
    // Array#toIndex ignores holes, Array#includes - not
    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
      if(O[index] === el)return IS_INCLUDES || index;
    } return !IS_INCLUDES && -1;
  };
};
},{"./$.to-index":68,"./$.to-iobject":70,"./$.to-length":71}],5:[function(require,module,exports){
// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx      = require('./$.ctx')
  , IObject  = require('./$.iobject')
  , toObject = require('./$.to-object')
  , toLength = require('./$.to-length');
module.exports = function(TYPE){
  var IS_MAP        = TYPE == 1
    , IS_FILTER     = TYPE == 2
    , IS_SOME       = TYPE == 3
    , IS_EVERY      = TYPE == 4
    , IS_FIND_INDEX = TYPE == 6
    , NO_HOLES      = TYPE == 5 || IS_FIND_INDEX;
  return function($this, callbackfn, that){
    var O      = toObject($this)
      , self   = IObject(O)
      , f      = ctx(callbackfn, that, 3)
      , length = toLength(self.length)
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
},{"./$.ctx":14,"./$.iobject":30,"./$.to-length":71,"./$.to-object":72}],6:[function(require,module,exports){
// 19.1.2.1 Object.assign(target, source, ...)
var toObject = require('./$.to-object')
  , IObject  = require('./$.iobject')
  , enumKeys = require('./$.enum-keys');

module.exports = require('./$.fails')(function(){
  return Symbol() in Object.assign({}); // Object.assign available and Symbol is native
}) ? function assign(target, source){   // eslint-disable-line no-unused-vars
  var T = toObject(target)
    , l = arguments.length
    , i = 1;
  while(l > i){
    var S      = IObject(arguments[i++])
      , keys   = enumKeys(S)
      , length = keys.length
      , j      = 0
      , key;
    while(length > j)T[key = keys[j++]] = S[key];
  }
  return T;
} : Object.assign;
},{"./$.enum-keys":18,"./$.fails":20,"./$.iobject":30,"./$.to-object":72}],7:[function(require,module,exports){
// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = require('./$.cof')
  , TAG = require('./$.wks')('toStringTag')
  // ES3 wrong here
  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

module.exports = function(it){
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = (O = Object(it))[TAG]) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};
},{"./$.cof":8,"./$.wks":75}],8:[function(require,module,exports){
var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};
},{}],9:[function(require,module,exports){
'use strict';
var $            = require('./$')
  , hide         = require('./$.hide')
  , ctx          = require('./$.ctx')
  , species      = require('./$.species')
  , strictNew    = require('./$.strict-new')
  , defined      = require('./$.defined')
  , forOf        = require('./$.for-of')
  , step         = require('./$.iter-step')
  , ID           = require('./$.uid')('id')
  , $has         = require('./$.has')
  , isObject     = require('./$.is-object')
  , isExtensible = Object.isExtensible || isObject
  , SUPPORT_DESC = require('./$.support-desc')
  , SIZE         = SUPPORT_DESC ? '_s' : 'size'
  , id           = 0;

var fastKey = function(it, create){
  // return primitive with prefix
  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if(!$has(it, ID)){
    // can't set id to frozen object
    if(!isExtensible(it))return 'F';
    // not necessary to add id
    if(!create)return 'E';
    // add missing object id
    hide(it, ID, ++id);
  // return object id with prefix
  } return 'O' + it[ID];
};

var getEntry = function(that, key){
  // fast case
  var index = fastKey(key), entry;
  if(index !== 'F')return that._i[index];
  // frozen object case
  for(entry = that._f; entry; entry = entry.n){
    if(entry.k == key)return entry;
  }
};

module.exports = {
  getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
    var C = wrapper(function(that, iterable){
      strictNew(that, C, NAME);
      that._i = $.create(null); // index
      that._f = undefined;      // first entry
      that._l = undefined;      // last entry
      that[SIZE] = 0;           // size
      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
    });
    require('./$.mix')(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear(){
        for(var that = this, data = that._i, entry = that._f; entry; entry = entry.n){
          entry.r = true;
          if(entry.p)entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
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
          delete that._i[entry.i];
          entry.r = true;
          if(prev)prev.n = next;
          if(next)next.p = prev;
          if(that._f == entry)that._f = next;
          if(that._l == entry)that._l = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /*, that = undefined */){
        var f = ctx(callbackfn, arguments[1], 3)
          , entry;
        while(entry = entry ? entry.n : this._f){
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
    if(SUPPORT_DESC)$.setDesc(C.prototype, 'size', {
      get: function(){
        return defined(this[SIZE]);
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
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that._l,             // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if(!that._f)that._f = entry;
      if(prev)prev.n = entry;
      that[SIZE]++;
      // add to index
      if(index !== 'F')that._i[index] = entry;
    } return that;
  },
  getEntry: getEntry,
  setStrong: function(C, NAME, IS_MAP){
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    require('./$.iter-define')(C, NAME, function(iterated, kind){
      this._t = iterated;  // target
      this._k = kind;      // kind
      this._l = undefined; // previous
    }, function(){
      var that  = this
        , kind  = that._k
        , entry = that._l;
      // revert to the last existing entry
      while(entry && entry.r)entry = entry.p;
      // get next entry
      if(!that._t || !(that._l = entry = entry ? entry.n : that._t._f)){
        // or finish the iteration
        that._t = undefined;
        return step(1);
      }
      // return step by kind
      if(kind == 'keys'  )return step(0, entry.k);
      if(kind == 'values')return step(0, entry.v);
      return step(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values' , !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    species(C);
    species(require('./$.core')[NAME]); // for wrapper
  }
};
},{"./$":40,"./$.core":13,"./$.ctx":14,"./$.defined":16,"./$.for-of":23,"./$.has":26,"./$.hide":27,"./$.is-object":33,"./$.iter-define":36,"./$.iter-step":38,"./$.mix":45,"./$.species":58,"./$.strict-new":59,"./$.support-desc":65,"./$.uid":73}],10:[function(require,module,exports){
// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var forOf   = require('./$.for-of')
  , classof = require('./$.classof');
module.exports = function(NAME){
  return function toJSON(){
    if(classof(this) != NAME)throw TypeError(NAME + "#toJSON isn't generic");
    var arr = [];
    forOf(this, false, arr.push, arr);
    return arr;
  };
};
},{"./$.classof":7,"./$.for-of":23}],11:[function(require,module,exports){
'use strict';
var hide         = require('./$.hide')
  , anObject     = require('./$.an-object')
  , strictNew    = require('./$.strict-new')
  , forOf        = require('./$.for-of')
  , method       = require('./$.array-methods')
  , WEAK         = require('./$.uid')('weak')
  , isObject     = require('./$.is-object')
  , $has         = require('./$.has')
  , isExtensible = Object.isExtensible || isObject
  , find         = method(5)
  , findIndex    = method(6)
  , id           = 0;

// fallback for frozen keys
var frozenStore = function(that){
  return that._l || (that._l = new FrozenStore);
};
var FrozenStore = function(){
  this.a = [];
};
var findFrozen = function(store, key){
  return find(store.a, function(it){
    return it[0] === key;
  });
};
FrozenStore.prototype = {
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
    else this.a.push([key, value]);
  },
  'delete': function(key){
    var index = findIndex(this.a, function(it){
      return it[0] === key;
    });
    if(~index)this.a.splice(index, 1);
    return !!~index;
  }
};

module.exports = {
  getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
    var C = wrapper(function(that, iterable){
      strictNew(that, C, NAME);
      that._i = id++;      // collection id
      that._l = undefined; // leak store for frozen objects
      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
    });
    require('./$.mix')(C.prototype, {
      // 23.3.3.2 WeakMap.prototype.delete(key)
      // 23.4.3.3 WeakSet.prototype.delete(value)
      'delete': function(key){
        if(!isObject(key))return false;
        if(!isExtensible(key))return frozenStore(this)['delete'](key);
        return $has(key, WEAK) && $has(key[WEAK], this._i) && delete key[WEAK][this._i];
      },
      // 23.3.3.4 WeakMap.prototype.has(key)
      // 23.4.3.4 WeakSet.prototype.has(value)
      has: function has(key){
        if(!isObject(key))return false;
        if(!isExtensible(key))return frozenStore(this).has(key);
        return $has(key, WEAK) && $has(key[WEAK], this._i);
      }
    });
    return C;
  },
  def: function(that, key, value){
    if(!isExtensible(anObject(key))){
      frozenStore(that).set(key, value);
    } else {
      $has(key, WEAK) || hide(key, WEAK, {});
      key[WEAK][that._i] = value;
    } return that;
  },
  frozenStore: frozenStore,
  WEAK: WEAK
};
},{"./$.an-object":3,"./$.array-methods":5,"./$.for-of":23,"./$.has":26,"./$.hide":27,"./$.is-object":33,"./$.mix":45,"./$.strict-new":59,"./$.uid":73}],12:[function(require,module,exports){
'use strict';
var global     = require('./$.global')
  , $def       = require('./$.def')
  , forOf      = require('./$.for-of')
  , strictNew  = require('./$.strict-new');

module.exports = function(NAME, wrapper, methods, common, IS_MAP, IS_WEAK){
  var Base  = global[NAME]
    , C     = Base
    , ADDER = IS_MAP ? 'set' : 'add'
    , proto = C && C.prototype
    , O     = {};
  var fixMethod = function(KEY){
    var fn = proto[KEY];
    require('./$.redef')(proto, KEY,
      KEY == 'delete' ? function(a){ return fn.call(this, a === 0 ? 0 : a); }
      : KEY == 'has' ? function has(a){ return fn.call(this, a === 0 ? 0 : a); }
      : KEY == 'get' ? function get(a){ return fn.call(this, a === 0 ? 0 : a); }
      : KEY == 'add' ? function add(a){ fn.call(this, a === 0 ? 0 : a); return this; }
      : function set(a, b){ fn.call(this, a === 0 ? 0 : a, b); return this; }
    );
  };
  if(typeof C != 'function' || !(IS_WEAK || proto.forEach && !require('./$.fails')(function(){
    new C().entries().next();
  }))){
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    require('./$.mix')(C.prototype, methods);
  } else {
    var inst  = new C
      , chain = inst[ADDER](IS_WEAK ? {} : -0, 1)
      , buggyZero;
    // wrap for init collections from iterable
    if(!require('./$.iter-detect')(function(iter){ new C(iter); })){ // eslint-disable-line no-new
      C = wrapper(function(target, iterable){
        strictNew(target, C, NAME);
        var that = new Base;
        if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
        return that;
      });
      C.prototype = proto;
      proto.constructor = C;
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
    if(buggyZero || chain !== inst)fixMethod(ADDER);
    // weak collections should not contains .clear method
    if(IS_WEAK && proto.clear)delete proto.clear;
  }

  require('./$.tag')(C, NAME);

  O[NAME] = C;
  $def($def.G + $def.W + $def.F * (C != Base), O);

  if(!IS_WEAK)common.setStrong(C, NAME, IS_MAP);

  return C;
};
},{"./$.def":15,"./$.fails":20,"./$.for-of":23,"./$.global":25,"./$.iter-detect":37,"./$.mix":45,"./$.redef":52,"./$.strict-new":59,"./$.tag":66}],13:[function(require,module,exports){
var core = module.exports = {};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef
},{}],14:[function(require,module,exports){
// optional / simple context binding
var aFunction = require('./$.a-function');
module.exports = function(fn, that, length){
  aFunction(fn);
  if(that === undefined)return fn;
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
},{"./$.a-function":2}],15:[function(require,module,exports){
var global     = require('./$.global')
  , core       = require('./$.core')
  , hide       = require('./$.hide')
  , $redef     = require('./$.redef')
  , PROTOTYPE  = 'prototype';
var ctx = function(fn, that){
  return function(){
    return fn.apply(that, arguments);
  };
};
var $def = function(type, name, source){
  var key, own, out, exp
    , isGlobal = type & $def.G
    , isProto  = type & $def.P
    , target   = isGlobal ? global : type & $def.S
        ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE]
    , exports  = isGlobal ? core : core[name] || (core[name] = {});
  if(isGlobal)source = name;
  for(key in source){
    // contains in native
    own = !(type & $def.F) && target && key in target;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    if(type & $def.B && own)exp = ctx(out, global);
    else exp = isProto && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if(target && !own)$redef(target, key, out);
    // export
    if(exports[key] != out)hide(exports, key, exp);
    if(isProto)(exports[PROTOTYPE] || (exports[PROTOTYPE] = {}))[key] = out;
  }
};
global.core = core;
// type bitmap
$def.F = 1;  // forced
$def.G = 2;  // global
$def.S = 4;  // static
$def.P = 8;  // proto
$def.B = 16; // bind
$def.W = 32; // wrap
module.exports = $def;
},{"./$.core":13,"./$.global":25,"./$.hide":27,"./$.redef":52}],16:[function(require,module,exports){
// 7.2.1 RequireObjectCoercible(argument)
module.exports = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};
},{}],17:[function(require,module,exports){
var isObject = require('./$.is-object')
  , document = require('./$.global').document
  // in old IE typeof document.createElement is 'object'
  , is = isObject(document) && isObject(document.createElement);
module.exports = function(it){
  return is ? document.createElement(it) : {};
};
},{"./$.global":25,"./$.is-object":33}],18:[function(require,module,exports){
// all enumerable object keys, includes symbols
var $ = require('./$');
module.exports = function(it){
  var keys       = $.getKeys(it)
    , getSymbols = $.getSymbols;
  if(getSymbols){
    var symbols = getSymbols(it)
      , isEnum  = $.isEnum
      , i       = 0
      , key;
    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))keys.push(key);
  }
  return keys;
};
},{"./$":40}],19:[function(require,module,exports){
// 20.2.2.14 Math.expm1(x)
module.exports = Math.expm1 || function expm1(x){
  return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : Math.exp(x) - 1;
};
},{}],20:[function(require,module,exports){
module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};
},{}],21:[function(require,module,exports){
'use strict';
module.exports = function(KEY, length, exec){
  var defined  = require('./$.defined')
    , SYMBOL   = require('./$.wks')(KEY)
    , original = ''[KEY];
  if(require('./$.fails')(function(){
    var O = {};
    O[SYMBOL] = function(){ return 7; };
    return ''[KEY](O) != 7;
  })){
    require('./$.redef')(String.prototype, KEY, exec(defined, SYMBOL, original));
    require('./$.hide')(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function(string, arg){ return original.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function(string){ return original.call(string, this); }
    );
  }
};
},{"./$.defined":16,"./$.fails":20,"./$.hide":27,"./$.redef":52,"./$.wks":75}],22:[function(require,module,exports){
'use strict';
// 21.2.5.3 get RegExp.prototype.flags
var anObject = require('./$.an-object');
module.exports = function(){
  var that   = anObject(this)
    , result = '';
  if(that.global)result += 'g';
  if(that.ignoreCase)result += 'i';
  if(that.multiline)result += 'm';
  if(that.unicode)result += 'u';
  if(that.sticky)result += 'y';
  return result;
};
},{"./$.an-object":3}],23:[function(require,module,exports){
var ctx         = require('./$.ctx')
  , call        = require('./$.iter-call')
  , isArrayIter = require('./$.is-array-iter')
  , anObject    = require('./$.an-object')
  , toLength    = require('./$.to-length')
  , getIterFn   = require('./core.get-iterator-method');
module.exports = function(iterable, entries, fn, that){
  var iterFn = getIterFn(iterable)
    , f      = ctx(fn, that, entries ? 2 : 1)
    , index  = 0
    , length, step, iterator;
  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
    entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
    call(iterator, f, step.value, entries);
  }
};
},{"./$.an-object":3,"./$.ctx":14,"./$.is-array-iter":31,"./$.iter-call":34,"./$.to-length":71,"./core.get-iterator-method":76}],24:[function(require,module,exports){
// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toString  = {}.toString
  , toIObject = require('./$.to-iobject')
  , getNames  = require('./$').getNames;

var windowNames = typeof window == 'object' && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function(it){
  try {
    return getNames(it);
  } catch(e){
    return windowNames.slice();
  }
};

module.exports.get = function getOwnPropertyNames(it){
  if(windowNames && toString.call(it) == '[object Window]')return getWindowNames(it);
  return getNames(toIObject(it));
};
},{"./$":40,"./$.to-iobject":70}],25:[function(require,module,exports){
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var UNDEFINED = 'undefined';
var global = module.exports = typeof window != UNDEFINED && window.Math == Math
  ? window : typeof self != UNDEFINED && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef
},{}],26:[function(require,module,exports){
var hasOwnProperty = {}.hasOwnProperty;
module.exports = function(it, key){
  return hasOwnProperty.call(it, key);
};
},{}],27:[function(require,module,exports){
var $          = require('./$')
  , createDesc = require('./$.property-desc');
module.exports = require('./$.support-desc') ? function(object, key, value){
  return $.setDesc(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};
},{"./$":40,"./$.property-desc":51,"./$.support-desc":65}],28:[function(require,module,exports){
module.exports = require('./$.global').document && document.documentElement;
},{"./$.global":25}],29:[function(require,module,exports){
// fast apply, http://jsperf.lnkit.com/fast-apply/5
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
  } return              fn.apply(that, args);
};
},{}],30:[function(require,module,exports){
// indexed object, fallback for non-array-like ES3 strings
var cof = require('./$.cof');
module.exports = 0 in Object('z') ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};
},{"./$.cof":8}],31:[function(require,module,exports){
// check on default Array iterator
var Iterators = require('./$.iterators')
  , ITERATOR  = require('./$.wks')('iterator');
module.exports = function(it){
  return (Iterators.Array || Array.prototype[ITERATOR]) === it;
};
},{"./$.iterators":39,"./$.wks":75}],32:[function(require,module,exports){
// 20.1.2.3 Number.isInteger(number)
var isObject = require('./$.is-object')
  , floor    = Math.floor;
module.exports = function isInteger(it){
  return !isObject(it) && isFinite(it) && floor(it) === it;
};
},{"./$.is-object":33}],33:[function(require,module,exports){
// http://jsperf.com/core-js-isobject
module.exports = function(it){
  return it !== null && (typeof it == 'object' || typeof it == 'function');
};
},{}],34:[function(require,module,exports){
// call something on iterator step with safe closing on error
var anObject = require('./$.an-object');
module.exports = function(iterator, fn, value, entries){
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch(e){
    var ret = iterator['return'];
    if(ret !== undefined)anObject(ret.call(iterator));
    throw e;
  }
};
},{"./$.an-object":3}],35:[function(require,module,exports){
'use strict';
var $ = require('./$')
  , IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
require('./$.hide')(IteratorPrototype, require('./$.wks')('iterator'), function(){ return this; });

module.exports = function(Constructor, NAME, next){
  Constructor.prototype = $.create(IteratorPrototype, {next: require('./$.property-desc')(1,next)});
  require('./$.tag')(Constructor, NAME + ' Iterator');
};
},{"./$":40,"./$.hide":27,"./$.property-desc":51,"./$.tag":66,"./$.wks":75}],36:[function(require,module,exports){
'use strict';
var LIBRARY         = require('./$.library')
  , $def            = require('./$.def')
  , $redef          = require('./$.redef')
  , hide            = require('./$.hide')
  , has             = require('./$.has')
  , SYMBOL_ITERATOR = require('./$.wks')('iterator')
  , Iterators       = require('./$.iterators')
  , BUGGY           = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
  , FF_ITERATOR     = '@@iterator'
  , KEYS            = 'keys'
  , VALUES          = 'values';
var returnThis = function(){ return this; };
module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCE){
  require('./$.iter-create')(Constructor, NAME, next);
  var createMethod = function(kind){
    switch(kind){
      case KEYS: return function keys(){ return new Constructor(this, kind); };
      case VALUES: return function values(){ return new Constructor(this, kind); };
    } return function entries(){ return new Constructor(this, kind); };
  };
  var TAG      = NAME + ' Iterator'
    , proto    = Base.prototype
    , _native  = proto[SYMBOL_ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
    , _default = _native || createMethod(DEFAULT)
    , methods, key;
  // Fix native
  if(_native){
    var IteratorPrototype = require('./$').getProto(_default.call(new Base));
    // Set @@toStringTag to native iterators
    require('./$.tag')(IteratorPrototype, TAG, true);
    // FF fix
    if(!LIBRARY && has(proto, FF_ITERATOR))hide(IteratorPrototype, SYMBOL_ITERATOR, returnThis);
  }
  // Define iterator
  if(!LIBRARY || FORCE)hide(proto, SYMBOL_ITERATOR, _default);
  // Plug for library
  Iterators[NAME] = _default;
  Iterators[TAG]  = returnThis;
  if(DEFAULT){
    methods = {
      keys:    IS_SET            ? _default : createMethod(KEYS),
      values:  DEFAULT == VALUES ? _default : createMethod(VALUES),
      entries: DEFAULT != VALUES ? _default : createMethod('entries')
    };
    if(FORCE)for(key in methods){
      if(!(key in proto))$redef(proto, key, methods[key]);
    } else $def($def.P + $def.F * BUGGY, NAME, methods);
  }
};
},{"./$":40,"./$.def":15,"./$.has":26,"./$.hide":27,"./$.iter-create":35,"./$.iterators":39,"./$.library":42,"./$.redef":52,"./$.tag":66,"./$.wks":75}],37:[function(require,module,exports){
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
},{"./$.wks":75}],38:[function(require,module,exports){
module.exports = function(done, value){
  return {value: value, done: !!done};
};
},{}],39:[function(require,module,exports){
module.exports = {};
},{}],40:[function(require,module,exports){
var $Object = Object;
module.exports = {
  create:     $Object.create,
  getProto:   $Object.getPrototypeOf,
  isEnum:     {}.propertyIsEnumerable,
  getDesc:    $Object.getOwnPropertyDescriptor,
  setDesc:    $Object.defineProperty,
  setDescs:   $Object.defineProperties,
  getKeys:    $Object.keys,
  getNames:   $Object.getOwnPropertyNames,
  getSymbols: $Object.getOwnPropertySymbols,
  each:       [].forEach
};
},{}],41:[function(require,module,exports){
var $         = require('./$')
  , toIObject = require('./$.to-iobject');
module.exports = function(object, el){
  var O      = toIObject(object)
    , keys   = $.getKeys(O)
    , length = keys.length
    , index  = 0
    , key;
  while(length > index)if(O[key = keys[index++]] === el)return key;
};
},{"./$":40,"./$.to-iobject":70}],42:[function(require,module,exports){
module.exports = false;
},{}],43:[function(require,module,exports){
// 20.2.2.20 Math.log1p(x)
module.exports = Math.log1p || function log1p(x){
  return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : Math.log(1 + x);
};
},{}],44:[function(require,module,exports){
var global    = require('./$.global')
  , macrotask = require('./$.task').set
  , Observer  = global.MutationObserver || global.WebKitMutationObserver
  , process   = global.process
  , isNode    = require('./$.cof')(process) == 'process'
  , head, last, notify;

var flush = function(){
  var parent, domain;
  if(isNode && (parent = process.domain)){
    process.domain = null;
    parent.exit();
  }
  while(head){
    domain = head.domain;
    if(domain)domain.enter();
    head.fn.call(); // <- currently we use it only for Promise - try / catch not required
    if(domain)domain.exit();
    head = head.next;
  } last = undefined;
  if(parent)parent.enter();
}

// Node.js
if(isNode){
  notify = function(){
    process.nextTick(flush);
  };
// browsers with MutationObserver
} else if(Observer){
  var toggle = 1
    , node   = document.createTextNode('');
  new Observer(flush).observe(node, {characterData: true}); // eslint-disable-line no-new
  notify = function(){
    node.data = toggle = -toggle;
  };
// for other environments - macrotask based on:
// - setImmediate
// - MessageChannel
// - window.postMessag
// - onreadystatechange
// - setTimeout
} else {
  notify = function(){
    // strange IE + webpack dev server bug - use .call(global)
    macrotask.call(global, flush);
  };
}

module.exports = function asap(fn){
  var task = {fn: fn, next: undefined, domain: isNode && process.domain};
  if(last)last.next = task;
  if(!head){
    head = task;
    notify();
  } last = task;
};
},{"./$.cof":8,"./$.global":25,"./$.task":67}],45:[function(require,module,exports){
var $redef = require('./$.redef');
module.exports = function(target, src){
  for(var key in src)$redef(target, key, src[key]);
  return target;
};
},{"./$.redef":52}],46:[function(require,module,exports){
// most Object methods by ES6 should accept primitives
module.exports = function(KEY, exec){
  var $def = require('./$.def')
    , fn   = (require('./$.core').Object || {})[KEY] || Object[KEY]
    , exp  = {};
  exp[KEY] = exec(fn);
  $def($def.S + $def.F * require('./$.fails')(function(){ fn(1); }), 'Object', exp);
};
},{"./$.core":13,"./$.def":15,"./$.fails":20}],47:[function(require,module,exports){
var $         = require('./$')
  , toIObject = require('./$.to-iobject');
module.exports = function(isEntries){
  return function(it){
    var O      = toIObject(it)
      , keys   = $.getKeys(O)
      , length = keys.length
      , i      = 0
      , result = Array(length)
      , key;
    if(isEntries)while(length > i)result[i] = [key = keys[i++], O[key]];
    else while(length > i)result[i] = O[keys[i++]];
    return result;
  };
};
},{"./$":40,"./$.to-iobject":70}],48:[function(require,module,exports){
// all object keys, includes non-enumerable and symbols
var $        = require('./$')
  , anObject = require('./$.an-object')
  , Reflect  = require('./$.global').Reflect;
module.exports = Reflect && Reflect.ownKeys || function ownKeys(it){
  var keys       = $.getNames(anObject(it))
    , getSymbols = $.getSymbols;
  return getSymbols ? keys.concat(getSymbols(it)) : keys;
};
},{"./$":40,"./$.an-object":3,"./$.global":25}],49:[function(require,module,exports){
'use strict';
var path      = require('./$.path')
  , invoke    = require('./$.invoke')
  , aFunction = require('./$.a-function');
module.exports = function(/* ...pargs */){
  var fn     = aFunction(this)
    , length = arguments.length
    , pargs  = Array(length)
    , i      = 0
    , _      = path._
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
},{"./$.a-function":2,"./$.invoke":29,"./$.path":50}],50:[function(require,module,exports){
module.exports = require('./$.global');
},{"./$.global":25}],51:[function(require,module,exports){
module.exports = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};
},{}],52:[function(require,module,exports){
// add fake Function#toString
// for correct work wrapped methods / constructors with methods like LoDash isNative
var global    = require('./$.global')
  , hide      = require('./$.hide')
  , SRC       = require('./$.uid')('src')
  , TO_STRING = 'toString'
  , $toString = Function[TO_STRING]
  , TPL       = ('' + $toString).split(TO_STRING);

require('./$.core').inspectSource = function(it){
  return $toString.call(it);
};

(module.exports = function(O, key, val, safe){
  if(typeof val == 'function'){
    hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
    if(!('name' in val))val.name = key;
  }
  if(O === global){
    O[key] = val;
  } else {
    if(!safe)delete O[key];
    hide(O, key, val);
  }
})(Function.prototype, TO_STRING, function toString(){
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});
},{"./$.core":13,"./$.global":25,"./$.hide":27,"./$.uid":73}],53:[function(require,module,exports){
module.exports = function(regExp, replace){
  var replacer = replace === Object(replace) ? function(part){
    return replace[part];
  } : replace;
  return function(it){
    return String(it).replace(regExp, replacer);
  };
};
},{}],54:[function(require,module,exports){
module.exports = Object.is || function is(x, y){
  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
};
},{}],55:[function(require,module,exports){
// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var getDesc  = require('./$').getDesc
  , isObject = require('./$.is-object')
  , anObject = require('./$.an-object');
var check = function(O, proto){
  anObject(O);
  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} // eslint-disable-line
    ? function(buggy, set){
        try {
          set = require('./$.ctx')(Function.call, getDesc(Object.prototype, '__proto__').set, 2);
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
},{"./$":40,"./$.an-object":3,"./$.ctx":14,"./$.is-object":33}],56:[function(require,module,exports){
var global = require('./$.global')
  , SHARED = '__core-js_shared__'
  , store  = global[SHARED] || (global[SHARED] = {});
module.exports = function(key){
  return store[key] || (store[key] = {});
};
},{"./$.global":25}],57:[function(require,module,exports){
// 20.2.2.28 Math.sign(x)
module.exports = Math.sign || function sign(x){
  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
};
},{}],58:[function(require,module,exports){
'use strict';
var $       = require('./$')
  , SPECIES = require('./$.wks')('species');
module.exports = function(C){
  if(require('./$.support-desc') && !(SPECIES in C))$.setDesc(C, SPECIES, {
    configurable: true,
    get: function(){ return this; }
  });
};
},{"./$":40,"./$.support-desc":65,"./$.wks":75}],59:[function(require,module,exports){
module.exports = function(it, Constructor, name){
  if(!(it instanceof Constructor))throw TypeError(name + ": use the 'new' operator!");
  return it;
};
},{}],60:[function(require,module,exports){
// true  -> String#at
// false -> String#codePointAt
var toInteger = require('./$.to-integer')
  , defined   = require('./$.defined');
module.exports = function(TO_STRING){
  return function(that, pos){
    var s = String(defined(that))
      , i = toInteger(pos)
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
},{"./$.defined":16,"./$.to-integer":69}],61:[function(require,module,exports){
// helper for String#{startsWith, endsWith, includes}
var defined = require('./$.defined')
  , cof     = require('./$.cof');

module.exports = function(that, searchString, NAME){
  if(cof(searchString) == 'RegExp')throw TypeError('String#' + NAME + " doesn't accept regex!");
  return String(defined(that));
};
},{"./$.cof":8,"./$.defined":16}],62:[function(require,module,exports){
// https://github.com/ljharb/proposal-string-pad-left-right
var toLength = require('./$.to-length')
  , repeat   = require('./$.string-repeat')
  , defined  = require('./$.defined');

module.exports = function(that, maxLength, fillString, left){
  var S            = String(defined(that))
    , stringLength = S.length
    , fillStr      = fillString === undefined ? ' ' : String(fillString)
    , intMaxLength = toLength(maxLength);
  if(intMaxLength <= stringLength)return S;
  if(fillStr == '')fillStr = ' ';
  var fillLen = intMaxLength - stringLength
    , stringFiller = repeat.call(fillStr, Math.ceil(fillLen / fillStr.length));
  if(stringFiller.length > fillLen)stringFiller = left
    ? stringFiller.slice(stringFiller.length - fillLen)
    : stringFiller.slice(0, fillLen);
  return left ? stringFiller + S : S + stringFiller;
};
},{"./$.defined":16,"./$.string-repeat":63,"./$.to-length":71}],63:[function(require,module,exports){
'use strict';
var toInteger = require('./$.to-integer')
  , defined   = require('./$.defined');

module.exports = function repeat(count){
  var str = String(defined(this))
    , res = ''
    , n   = toInteger(count);
  if(n < 0 || n == Infinity)throw RangeError("Count can't be negative");
  for(;n > 0; (n >>>= 1) && (str += str))if(n & 1)res += str;
  return res;
};
},{"./$.defined":16,"./$.to-integer":69}],64:[function(require,module,exports){
// 1 -> String#trimLeft
// 2 -> String#trimRight
// 3 -> String#trim
var trim = function(string, TYPE){
  string = String(defined(string));
  if(TYPE & 1)string = string.replace(ltrim, '');
  if(TYPE & 2)string = string.replace(rtrim, '');
  return string;
};

var $def    = require('./$.def')
  , defined = require('./$.defined')
  , spaces  = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
      '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF'
  , space   = '[' + spaces + ']'
  , non     = '\u200b\u0085'
  , ltrim   = RegExp('^' + space + space + '*')
  , rtrim   = RegExp(space + space + '*$');

module.exports = function(KEY, exec){
  var exp  = {};
  exp[KEY] = exec(trim);
  $def($def.P + $def.F * require('./$.fails')(function(){
    return !!spaces[KEY]() || non[KEY]() != non;
  }), 'String', exp);
};
},{"./$.def":15,"./$.defined":16,"./$.fails":20}],65:[function(require,module,exports){
// Thank's IE8 for his funny defineProperty
module.exports = !require('./$.fails')(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});
},{"./$.fails":20}],66:[function(require,module,exports){
var has  = require('./$.has')
  , hide = require('./$.hide')
  , TAG  = require('./$.wks')('toStringTag');

module.exports = function(it, tag, stat){
  if(it && !has(it = stat ? it : it.prototype, TAG))hide(it, TAG, tag);
};
},{"./$.has":26,"./$.hide":27,"./$.wks":75}],67:[function(require,module,exports){
'use strict';
var ctx                = require('./$.ctx')
  , invoke             = require('./$.invoke')
  , html               = require('./$.html')
  , cel                = require('./$.dom-create')
  , global             = require('./$.global')
  , process            = global.process
  , setTask            = global.setImmediate
  , clearTask          = global.clearImmediate
  , MessageChannel     = global.MessageChannel
  , counter            = 0
  , queue              = {}
  , ONREADYSTATECHANGE = 'onreadystatechange'
  , defer, channel, port;
var run = function(){
  var id = +this;
  if(queue.hasOwnProperty(id)){
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listner = function(event){
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if(!setTask || !clearTask){
  setTask = function setImmediate(fn){
    var args = [], i = 1;
    while(arguments.length > i)args.push(arguments[i++]);
    queue[++counter] = function(){
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id){
    delete queue[id];
  };
  // Node.js 0.8-
  if(require('./$.cof')(process) == 'process'){
    defer = function(id){
      process.nextTick(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if(MessageChannel){
    channel = new MessageChannel;
    port    = channel.port2;
    channel.port1.onmessage = listner;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if(global.addEventListener && typeof postMessage == 'function' && !global.importScript){
    defer = function(id){
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listner, false);
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
},{"./$.cof":8,"./$.ctx":14,"./$.dom-create":17,"./$.global":25,"./$.html":28,"./$.invoke":29}],68:[function(require,module,exports){
var toInteger = require('./$.to-integer')
  , max       = Math.max
  , min       = Math.min;
module.exports = function(index, length){
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};
},{"./$.to-integer":69}],69:[function(require,module,exports){
// 7.1.4 ToInteger
var ceil  = Math.ceil
  , floor = Math.floor;
module.exports = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};
},{}],70:[function(require,module,exports){
// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = require('./$.iobject')
  , defined = require('./$.defined');
module.exports = function(it){
  return IObject(defined(it));
};
},{"./$.defined":16,"./$.iobject":30}],71:[function(require,module,exports){
// 7.1.15 ToLength
var toInteger = require('./$.to-integer')
  , min       = Math.min;
module.exports = function(it){
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};
},{"./$.to-integer":69}],72:[function(require,module,exports){
// 7.1.13 ToObject(argument)
var defined = require('./$.defined');
module.exports = function(it){
  return Object(defined(it));
};
},{"./$.defined":16}],73:[function(require,module,exports){
var id = 0
  , px = Math.random();
module.exports = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};
},{}],74:[function(require,module,exports){
// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = require('./$.wks')('unscopables');
if(!(UNSCOPABLES in []))require('./$.hide')(Array.prototype, UNSCOPABLES, {});
module.exports = function(key){
  [][UNSCOPABLES][key] = true;
};
},{"./$.hide":27,"./$.wks":75}],75:[function(require,module,exports){
var store  = require('./$.shared')('wks')
  , Symbol = require('./$.global').Symbol;
module.exports = function(name){
  return store[name] || (store[name] =
    Symbol && Symbol[name] || (Symbol || require('./$.uid'))('Symbol.' + name));
};
},{"./$.global":25,"./$.shared":56,"./$.uid":73}],76:[function(require,module,exports){
var classof   = require('./$.classof')
  , ITERATOR  = require('./$.wks')('iterator')
  , Iterators = require('./$.iterators');
module.exports = require('./$.core').getIteratorMethod = function(it){
  if(it != undefined)return it[ITERATOR] || it['@@iterator'] || Iterators[classof(it)];
};
},{"./$.classof":7,"./$.core":13,"./$.iterators":39,"./$.wks":75}],77:[function(require,module,exports){
'use strict';
var $                = require('./$')
  , SUPPORT_DESC     = require('./$.support-desc')
  , createDesc       = require('./$.property-desc')
  , html             = require('./$.html')
  , cel              = require('./$.dom-create')
  , has              = require('./$.has')
  , cof              = require('./$.cof')
  , $def             = require('./$.def')
  , invoke           = require('./$.invoke')
  , arrayMethod      = require('./$.array-methods')
  , IE_PROTO         = require('./$.uid')('__proto__')
  , isObject         = require('./$.is-object')
  , anObject         = require('./$.an-object')
  , aFunction        = require('./$.a-function')
  , toObject         = require('./$.to-object')
  , toIObject        = require('./$.to-iobject')
  , toInteger        = require('./$.to-integer')
  , toIndex          = require('./$.to-index')
  , toLength         = require('./$.to-length')
  , IObject          = require('./$.iobject')
  , fails            = require('./$.fails')
  , ObjectProto      = Object.prototype
  , A                = []
  , _slice           = A.slice
  , _join            = A.join
  , defineProperty   = $.setDesc
  , getOwnDescriptor = $.getDesc
  , defineProperties = $.setDescs
  , $indexOf         = require('./$.array-includes')(false)
  , factories        = {}
  , IE8_DOM_DEFINE;

if(!SUPPORT_DESC){
  IE8_DOM_DEFINE = !fails(function(){
    return defineProperty(cel('div'), 'a', {get: function(){ return 7; }}).a != 7;
  });
  $.setDesc = function(O, P, Attributes){
    if(IE8_DOM_DEFINE)try {
      return defineProperty(O, P, Attributes);
    } catch(e){ /* empty */ }
    if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
    if('value' in Attributes)anObject(O)[P] = Attributes.value;
    return O;
  };
  $.getDesc = function(O, P){
    if(IE8_DOM_DEFINE)try {
      return getOwnDescriptor(O, P);
    } catch(e){ /* empty */ }
    if(has(O, P))return createDesc(!ObjectProto.propertyIsEnumerable.call(O, P), O[P]);
  };
  $.setDescs = defineProperties = function(O, Properties){
    anObject(O);
    var keys   = $.getKeys(Properties)
      , length = keys.length
      , i = 0
      , P;
    while(length > i)$.setDesc(O, P = keys[i++], Properties[P]);
    return O;
  };
}
$def($def.S + $def.F * !SUPPORT_DESC, 'Object', {
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
var createGetKeys = function(names, length){
  return function(object){
    var O      = toIObject(object)
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
};
var Empty = function(){};
$def($def.S, 'Object', {
  // 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
  getPrototypeOf: $.getProto = $.getProto || function(O){
    O = toObject(O);
    if(has(O, IE_PROTO))return O[IE_PROTO];
    if(typeof O.constructor == 'function' && O instanceof O.constructor){
      return O.constructor.prototype;
    } return O instanceof Object ? ObjectProto : null;
  },
  // 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $.getNames = $.getNames || createGetKeys(keys2, keys2.length, true),
  // 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
  create: $.create = $.create || function(O, /*?*/Properties){
    var result;
    if(O !== null){
      Empty.prototype = anObject(O);
      result = new Empty();
      Empty.prototype = null;
      // add "__proto__" for Object.getPrototypeOf shim
      result[IE_PROTO] = O;
    } else result = createDict();
    return Properties === undefined ? result : defineProperties(result, Properties);
  },
  // 19.1.2.14 / 15.2.3.14 Object.keys(O)
  keys: $.getKeys = $.getKeys || createGetKeys(keys1, keysLen1, false)
});

var construct = function(F, len, args){
  if(!(len in factories)){
    for(var n = [], i = 0; i < len; i++)n[i] = 'a[' + i + ']';
    factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
  }
  return factories[len](F, args);
};

// 19.2.3.2 / 15.3.4.5 Function.prototype.bind(thisArg, args...)
$def($def.P, 'Function', {
  bind: function bind(that /*, args... */){
    var fn       = aFunction(this)
      , partArgs = _slice.call(arguments, 1);
    var bound = function(/* args... */){
      var args = partArgs.concat(_slice.call(arguments));
      return this instanceof bound ? construct(fn, args.length, args) : invoke(fn, args, that);
    };
    if(isObject(fn.prototype))bound.prototype = fn.prototype;
    return bound;
  }
});

// fallback for not array-like ES3 strings and DOM objects
var buggySlice = fails(function(){
  if(html)_slice.call(html);
});

$def($def.P + $def.F * buggySlice, 'Array', {
  slice: function(begin, end){
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
$def($def.P + $def.F * (IObject != Object), 'Array', {
  join: function(){
    return _join.apply(IObject(this), arguments);
  }
});

// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)
$def($def.S, 'Array', {isArray: function(arg){ return cof(arg) == 'Array'; }});

var createArrayReduce = function(isRight){
  return function(callbackfn, memo){
    aFunction(callbackfn);
    var O      = IObject(this)
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
      if(isRight ? index < 0 : length <= index){
        throw TypeError('Reduce of empty array with no initial value');
      }
    }
    for(;isRight ? index >= 0 : length > index; index += i)if(index in O){
      memo = callbackfn(memo, O[index], index, this);
    }
    return memo;
  };
};
var methodize = function($fn){
  return function(arg1/*, arg2 = undefined */){
    return $fn(this, arg1, arguments[1]);
  };
};
$def($def.P, 'Array', {
  // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
  forEach: $.each = $.each || methodize(arrayMethod(0)),
  // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
  map: methodize(arrayMethod(1)),
  // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
  filter: methodize(arrayMethod(2)),
  // 22.1.3.23 / 15.4.4.17 Array.prototype.some(callbackfn [, thisArg])
  some: methodize(arrayMethod(3)),
  // 22.1.3.5 / 15.4.4.16 Array.prototype.every(callbackfn [, thisArg])
  every: methodize(arrayMethod(4)),
  // 22.1.3.18 / 15.4.4.21 Array.prototype.reduce(callbackfn [, initialValue])
  reduce: createArrayReduce(false),
  // 22.1.3.19 / 15.4.4.22 Array.prototype.reduceRight(callbackfn [, initialValue])
  reduceRight: createArrayReduce(true),
  // 22.1.3.11 / 15.4.4.14 Array.prototype.indexOf(searchElement [, fromIndex])
  indexOf: methodize($indexOf),
  // 22.1.3.14 / 15.4.4.15 Array.prototype.lastIndexOf(searchElement [, fromIndex])
  lastIndexOf: function(el, fromIndex /* = @[*-1] */){
    var O      = toIObject(this)
      , length = toLength(O.length)
      , index  = length - 1;
    if(arguments.length > 1)index = Math.min(index, toInteger(fromIndex));
    if(index < 0)index = toLength(length + index);
    for(;index >= 0; index--)if(index in O)if(O[index] === el)return index;
    return -1;
  }
});

// 20.3.3.1 / 15.9.4.4 Date.now()
$def($def.S, 'Date', {now: function(){ return +new Date; }});

var lz = function(num){
  return num > 9 ? num : '0' + num;
};

// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
// PhantomJS and old webkit had a broken Date implementation.
var date       = new Date(-5e13 - 1)
  , brokenDate = !(date.toISOString && date.toISOString() == '0385-07-25T07:06:39.999Z'
      && fails(function(){ new Date(NaN).toISOString(); }));
$def($def.P + $def.F * brokenDate, 'Date', {
  toISOString: function toISOString(){
    if(!isFinite(this))throw RangeError('Invalid time value');
    var d = this
      , y = d.getUTCFullYear()
      , m = d.getUTCMilliseconds()
      , s = y < 0 ? '-' : y > 9999 ? '+' : '';
    return s + ('00000' + Math.abs(y)).slice(s ? -6 : -4) +
      '-' + lz(d.getUTCMonth() + 1) + '-' + lz(d.getUTCDate()) +
      'T' + lz(d.getUTCHours()) + ':' + lz(d.getUTCMinutes()) +
      ':' + lz(d.getUTCSeconds()) + '.' + (m > 99 ? m : '0' + lz(m)) + 'Z';
  }
});
},{"./$":40,"./$.a-function":2,"./$.an-object":3,"./$.array-includes":4,"./$.array-methods":5,"./$.cof":8,"./$.def":15,"./$.dom-create":17,"./$.fails":20,"./$.has":26,"./$.html":28,"./$.invoke":29,"./$.iobject":30,"./$.is-object":33,"./$.property-desc":51,"./$.support-desc":65,"./$.to-index":68,"./$.to-integer":69,"./$.to-iobject":70,"./$.to-length":71,"./$.to-object":72,"./$.uid":73}],78:[function(require,module,exports){
'use strict';
var $def     = require('./$.def')
  , toObject = require('./$.to-object')
  , toIndex  = require('./$.to-index')
  , toLength = require('./$.to-length');
$def($def.P, 'Array', {
  // 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
  copyWithin: function copyWithin(target/* = 0 */, start /* = 0, end = @length */){
    var O     = toObject(this)
      , len   = toLength(O.length)
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
},{"./$.def":15,"./$.to-index":68,"./$.to-length":71,"./$.to-object":72,"./$.unscope":74}],79:[function(require,module,exports){
'use strict';
var $def     = require('./$.def')
  , toObject = require('./$.to-object')
  , toIndex  = require('./$.to-index')
  , toLength = require('./$.to-length');
$def($def.P, 'Array', {
  // 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
  fill: function fill(value /*, start = 0, end = @length */){
    var O      = toObject(this, true)
      , length = toLength(O.length)
      , index  = toIndex(arguments[1], length)
      , end    = arguments[2]
      , endPos = end === undefined ? length : toIndex(end, length);
    while(endPos > index)O[index++] = value;
    return O;
  }
});
require('./$.unscope')('fill');
},{"./$.def":15,"./$.to-index":68,"./$.to-length":71,"./$.to-object":72,"./$.unscope":74}],80:[function(require,module,exports){
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
},{"./$.array-methods":5,"./$.def":15,"./$.unscope":74}],81:[function(require,module,exports){
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
},{"./$.array-methods":5,"./$.def":15,"./$.unscope":74}],82:[function(require,module,exports){
'use strict';
var ctx         = require('./$.ctx')
  , $def        = require('./$.def')
  , toObject    = require('./$.to-object')
  , call        = require('./$.iter-call')
  , isArrayIter = require('./$.is-array-iter')
  , toLength    = require('./$.to-length')
  , getIterFn   = require('./core.get-iterator-method');
$def($def.S + $def.F * !require('./$.iter-detect')(function(iter){ Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
    var O       = toObject(arrayLike)
      , C       = typeof this == 'function' ? this : Array
      , mapfn   = arguments[1]
      , mapping = mapfn !== undefined
      , index   = 0
      , iterFn  = getIterFn(O)
      , length, result, step, iterator;
    if(mapping)mapfn = ctx(mapfn, arguments[2], 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if(iterFn != undefined && !(C == Array && isArrayIter(iterFn))){
      for(iterator = iterFn.call(O), result = new C; !(step = iterator.next()).done; index++){
        result[index] = mapping ? call(iterator, mapfn, [step.value, index], true) : step.value;
      }
    } else {
      for(result = new C(length = toLength(O.length)); length > index; index++){
        result[index] = mapping ? mapfn(O[index], index) : O[index];
      }
    }
    result.length = index;
    return result;
  }
});
},{"./$.ctx":14,"./$.def":15,"./$.is-array-iter":31,"./$.iter-call":34,"./$.iter-detect":37,"./$.to-length":71,"./$.to-object":72,"./core.get-iterator-method":76}],83:[function(require,module,exports){
'use strict';
var setUnscope = require('./$.unscope')
  , step       = require('./$.iter-step')
  , Iterators  = require('./$.iterators')
  , toIObject  = require('./$.to-iobject');

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
require('./$.iter-define')(Array, 'Array', function(iterated, kind){
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , kind  = this._k
    , index = this._i++;
  if(!O || index >= O.length){
    this._t = undefined;
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
},{"./$.iter-define":36,"./$.iter-step":38,"./$.iterators":39,"./$.to-iobject":70,"./$.unscope":74}],84:[function(require,module,exports){
'use strict';
var $def = require('./$.def');

// WebKit Array.of isn't generic
$def($def.S + $def.F * require('./$.fails')(function(){
  function F(){}
  return !(Array.of.call(F) instanceof F);
}), 'Array', {
  // 22.1.2.3 Array.of( ...items)
  of: function of(/* ...args */){
    var index  = 0
      , length = arguments.length
      , result = new (typeof this == 'function' ? this : Array)(length);
    while(length > index)result[index] = arguments[index++];
    result.length = length;
    return result;
  }
});
},{"./$.def":15,"./$.fails":20}],85:[function(require,module,exports){
require('./$.species')(Array);
},{"./$.species":58}],86:[function(require,module,exports){
'use strict';
var $             = require('./$')
  , isObject      = require('./$.is-object')
  , HAS_INSTANCE  = require('./$.wks')('hasInstance')
  , FunctionProto = Function.prototype;
// 19.2.3.6 Function.prototype[@@hasInstance](V)
if(!(HAS_INSTANCE in FunctionProto))$.setDesc(FunctionProto, HAS_INSTANCE, {value: function(O){
  if(typeof this != 'function' || !isObject(O))return false;
  if(!isObject(this.prototype))return O instanceof this;
  // for environment w/o native `@@hasInstance` logic enough `instanceof`, but add this:
  while(O = $.getProto(O))if(this.prototype === O)return true;
  return false;
}});
},{"./$":40,"./$.is-object":33,"./$.wks":75}],87:[function(require,module,exports){
var setDesc    = require('./$').setDesc
  , createDesc = require('./$.property-desc')
  , has        = require('./$.has')
  , FProto     = Function.prototype
  , nameRE     = /^\s*function ([^ (]*)/
  , NAME       = 'name';
// 19.2.4.2 name
NAME in FProto || require('./$.support-desc') && setDesc(FProto, NAME, {
  configurable: true,
  get: function(){
    var match = ('' + this).match(nameRE)
      , name  = match ? match[1] : '';
    has(this, NAME) || setDesc(this, NAME, createDesc(5, name));
    return name;
  }
});
},{"./$":40,"./$.has":26,"./$.property-desc":51,"./$.support-desc":65}],88:[function(require,module,exports){
'use strict';
var strong = require('./$.collection-strong');

// 23.1 Map Objects
require('./$.collection')('Map', function(get){
  return function Map(){ return get(this, arguments[0]); };
}, {
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
},{"./$.collection":12,"./$.collection-strong":9}],89:[function(require,module,exports){
// 20.2.2.3 Math.acosh(x)
var $def   = require('./$.def')
  , log1p  = require('./$.log1p')
  , sqrt   = Math.sqrt
  , $acosh = Math.acosh;

// V8 bug https://code.google.com/p/v8/issues/detail?id=3509 
$def($def.S + $def.F * !($acosh && Math.floor($acosh(Number.MAX_VALUE)) == 710), 'Math', {
  acosh: function acosh(x){
    return (x = +x) < 1 ? NaN : x > 94906265.62425156
      ? Math.log(x) + Math.LN2
      : log1p(x - 1 + sqrt(x - 1) * sqrt(x + 1));
  }
});
},{"./$.def":15,"./$.log1p":43}],90:[function(require,module,exports){
// 20.2.2.5 Math.asinh(x)
var $def = require('./$.def');

function asinh(x){
  return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : Math.log(x + Math.sqrt(x * x + 1));
}

$def($def.S, 'Math', {asinh: asinh});
},{"./$.def":15}],91:[function(require,module,exports){
// 20.2.2.7 Math.atanh(x)
var $def = require('./$.def');

$def($def.S, 'Math', {
  atanh: function atanh(x){
    return (x = +x) == 0 ? x : Math.log((1 + x) / (1 - x)) / 2;
  }
});
},{"./$.def":15}],92:[function(require,module,exports){
// 20.2.2.9 Math.cbrt(x)
var $def = require('./$.def')
  , sign = require('./$.sign');

$def($def.S, 'Math', {
  cbrt: function cbrt(x){
    return sign(x = +x) * Math.pow(Math.abs(x), 1 / 3);
  }
});
},{"./$.def":15,"./$.sign":57}],93:[function(require,module,exports){
// 20.2.2.11 Math.clz32(x)
var $def = require('./$.def');

$def($def.S, 'Math', {
  clz32: function clz32(x){
    return (x >>>= 0) ? 31 - Math.floor(Math.log(x + 0.5) * Math.LOG2E) : 32;
  }
});
},{"./$.def":15}],94:[function(require,module,exports){
// 20.2.2.12 Math.cosh(x)
var $def = require('./$.def')
  , exp  = Math.exp;

$def($def.S, 'Math', {
  cosh: function cosh(x){
    return (exp(x = +x) + exp(-x)) / 2;
  }
});
},{"./$.def":15}],95:[function(require,module,exports){
// 20.2.2.14 Math.expm1(x)
var $def = require('./$.def');

$def($def.S, 'Math', {expm1: require('./$.expm1')});
},{"./$.def":15,"./$.expm1":19}],96:[function(require,module,exports){
// 20.2.2.16 Math.fround(x)
var $def  = require('./$.def')
  , sign  = require('./$.sign')
  , pow   = Math.pow
  , EPSILON   = pow(2, -52)
  , EPSILON32 = pow(2, -23)
  , MAX32     = pow(2, 127) * (2 - EPSILON32)
  , MIN32     = pow(2, -126);

var roundTiesToEven = function(n){
  return n + 1 / EPSILON - 1 / EPSILON;
};


$def($def.S, 'Math', {
  fround: function fround(x){
    var $abs  = Math.abs(x)
      , $sign = sign(x)
      , a, result;
    if($abs < MIN32)return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
    a = (1 + EPSILON32 / EPSILON) * $abs;
    result = a - (a - $abs);
    if(result > MAX32 || result != result)return $sign * Infinity;
    return $sign * result;
  }
});
},{"./$.def":15,"./$.sign":57}],97:[function(require,module,exports){
// 20.2.2.17 Math.hypot([value1[, value2[, … ]]])
var $def = require('./$.def')
  , abs  = Math.abs;

$def($def.S, 'Math', {
  hypot: function hypot(value1, value2){ // eslint-disable-line no-unused-vars
    var sum  = 0
      , i    = 0
      , len  = arguments.length
      , larg = 0
      , arg, div;
    while(i < len){
      arg = abs(arguments[i++]);
      if(larg < arg){
        div  = larg / arg;
        sum  = sum * div * div + 1;
        larg = arg;
      } else if(arg > 0){
        div  = arg / larg;
        sum += div * div;
      } else sum += arg;
    }
    return larg === Infinity ? Infinity : larg * Math.sqrt(sum);
  }
});
},{"./$.def":15}],98:[function(require,module,exports){
// 20.2.2.18 Math.imul(x, y)
var $def = require('./$.def');

// WebKit fails with big numbers
$def($def.S + $def.F * require('./$.fails')(function(){
  return Math.imul(0xffffffff, 5) != -5;
}), 'Math', {
  imul: function imul(x, y){
    var UINT16 = 0xffff
      , xn = +x
      , yn = +y
      , xl = UINT16 & xn
      , yl = UINT16 & yn;
    return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
  }
});
},{"./$.def":15,"./$.fails":20}],99:[function(require,module,exports){
// 20.2.2.21 Math.log10(x)
var $def = require('./$.def');

$def($def.S, 'Math', {
  log10: function log10(x){
    return Math.log(x) / Math.LN10;
  }
});
},{"./$.def":15}],100:[function(require,module,exports){
// 20.2.2.20 Math.log1p(x)
var $def = require('./$.def');

$def($def.S, 'Math', {log1p: require('./$.log1p')});
},{"./$.def":15,"./$.log1p":43}],101:[function(require,module,exports){
// 20.2.2.22 Math.log2(x)
var $def = require('./$.def');

$def($def.S, 'Math', {
  log2: function log2(x){
    return Math.log(x) / Math.LN2;
  }
});
},{"./$.def":15}],102:[function(require,module,exports){
// 20.2.2.28 Math.sign(x)
var $def = require('./$.def');

$def($def.S, 'Math', {sign: require('./$.sign')});
},{"./$.def":15,"./$.sign":57}],103:[function(require,module,exports){
// 20.2.2.30 Math.sinh(x)
var $def  = require('./$.def')
  , expm1 = require('./$.expm1')
  , exp   = Math.exp;

$def($def.S, 'Math', {
  sinh: function sinh(x){
    return Math.abs(x = +x) < 1
      ? (expm1(x) - expm1(-x)) / 2
      : (exp(x - 1) - exp(-x - 1)) * (Math.E / 2);
  }
});
},{"./$.def":15,"./$.expm1":19}],104:[function(require,module,exports){
// 20.2.2.33 Math.tanh(x)
var $def  = require('./$.def')
  , expm1 = require('./$.expm1')
  , exp   = Math.exp;

$def($def.S, 'Math', {
  tanh: function tanh(x){
    var a = expm1(x = +x)
      , b = expm1(-x);
    return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
  }
});
},{"./$.def":15,"./$.expm1":19}],105:[function(require,module,exports){
// 20.2.2.34 Math.trunc(x)
var $def = require('./$.def');

$def($def.S, 'Math', {
  trunc: function trunc(it){
    return (it > 0 ? Math.floor : Math.ceil)(it);
  }
});
},{"./$.def":15}],106:[function(require,module,exports){
'use strict';
var $          = require('./$')
  , global     = require('./$.global')
  , has        = require('./$.has')
  , cof        = require('./$.cof')
  , isObject   = require('./$.is-object')
  , fails      = require('./$.fails')
  , NUMBER     = 'Number'
  , $Number    = global[NUMBER]
  , Base       = $Number
  , proto      = $Number.prototype
  // Opera ~12 has broken Object#toString
  , BROKEN_COF = cof($.create(proto)) == NUMBER;
var toPrimitive = function(it){
  var fn, val;
  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
  if(typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  throw TypeError("Can't convert object to number");
};
var toNumber = function(it){
  if(isObject(it))it = toPrimitive(it);
  if(typeof it == 'string' && it.length > 2 && it.charCodeAt(0) == 48){
    var binary = false;
    switch(it.charCodeAt(1)){
      case 66 : case 98  : binary = true;
      case 79 : case 111 : return parseInt(it.slice(2), binary ? 2 : 8);
    }
  } return +it;
};
if(!($Number('0o1') && $Number('0b1'))){
  $Number = function Number(it){
    var that = this;
    return that instanceof $Number
      // check on 1..constructor(foo) case
      && (BROKEN_COF ? fails(function(){ proto.valueOf.call(that); }) : cof(that) != NUMBER)
        ? new Base(toNumber(it)) : toNumber(it);
  };
  $.each.call(require('./$.support-desc') ? $.getNames(Base) : (
      // ES3:
      'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
      // ES6 (in case, if modules with ES6 Number statics required before):
      'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
      'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
    ).split(','), function(key){
      if(has(Base, key) && !has($Number, key)){
        $.setDesc($Number, key, $.getDesc(Base, key));
      }
    }
  );
  $Number.prototype = proto;
  proto.constructor = $Number;
  require('./$.redef')(global, NUMBER, $Number);
}
},{"./$":40,"./$.cof":8,"./$.fails":20,"./$.global":25,"./$.has":26,"./$.is-object":33,"./$.redef":52,"./$.support-desc":65}],107:[function(require,module,exports){
// 20.1.2.1 Number.EPSILON
var $def = require('./$.def');

$def($def.S, 'Number', {EPSILON: Math.pow(2, -52)});
},{"./$.def":15}],108:[function(require,module,exports){
// 20.1.2.2 Number.isFinite(number)
var $def      = require('./$.def')
  , _isFinite = require('./$.global').isFinite;

$def($def.S, 'Number', {
  isFinite: function isFinite(it){
    return typeof it == 'number' && _isFinite(it);
  }
});
},{"./$.def":15,"./$.global":25}],109:[function(require,module,exports){
// 20.1.2.3 Number.isInteger(number)
var $def = require('./$.def');

$def($def.S, 'Number', {isInteger: require('./$.is-integer')});
},{"./$.def":15,"./$.is-integer":32}],110:[function(require,module,exports){
// 20.1.2.4 Number.isNaN(number)
var $def = require('./$.def');

$def($def.S, 'Number', {
  isNaN: function isNaN(number){
    return number != number;
  }
});
},{"./$.def":15}],111:[function(require,module,exports){
// 20.1.2.5 Number.isSafeInteger(number)
var $def      = require('./$.def')
  , isInteger = require('./$.is-integer')
  , abs       = Math.abs;

$def($def.S, 'Number', {
  isSafeInteger: function isSafeInteger(number){
    return isInteger(number) && abs(number) <= 0x1fffffffffffff;
  }
});
},{"./$.def":15,"./$.is-integer":32}],112:[function(require,module,exports){
// 20.1.2.6 Number.MAX_SAFE_INTEGER
var $def = require('./$.def');

$def($def.S, 'Number', {MAX_SAFE_INTEGER: 0x1fffffffffffff});
},{"./$.def":15}],113:[function(require,module,exports){
// 20.1.2.10 Number.MIN_SAFE_INTEGER
var $def = require('./$.def');

$def($def.S, 'Number', {MIN_SAFE_INTEGER: -0x1fffffffffffff});
},{"./$.def":15}],114:[function(require,module,exports){
// 20.1.2.12 Number.parseFloat(string)
var $def = require('./$.def');

$def($def.S, 'Number', {parseFloat: parseFloat});
},{"./$.def":15}],115:[function(require,module,exports){
// 20.1.2.13 Number.parseInt(string, radix)
var $def = require('./$.def');

$def($def.S, 'Number', {parseInt: parseInt});
},{"./$.def":15}],116:[function(require,module,exports){
// 19.1.3.1 Object.assign(target, source)
var $def = require('./$.def');

$def($def.S + $def.F, 'Object', {assign: require('./$.assign')});
},{"./$.assign":6,"./$.def":15}],117:[function(require,module,exports){
// 19.1.2.5 Object.freeze(O)
var isObject = require('./$.is-object');

require('./$.object-sap')('freeze', function($freeze){
  return function freeze(it){
    return $freeze && isObject(it) ? $freeze(it) : it;
  };
});
},{"./$.is-object":33,"./$.object-sap":46}],118:[function(require,module,exports){
// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject = require('./$.to-iobject');

require('./$.object-sap')('getOwnPropertyDescriptor', function($getOwnPropertyDescriptor){
  return function getOwnPropertyDescriptor(it, key){
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});
},{"./$.object-sap":46,"./$.to-iobject":70}],119:[function(require,module,exports){
// 19.1.2.7 Object.getOwnPropertyNames(O)
require('./$.object-sap')('getOwnPropertyNames', function(){
  return require('./$.get-names').get;
});
},{"./$.get-names":24,"./$.object-sap":46}],120:[function(require,module,exports){
// 19.1.2.9 Object.getPrototypeOf(O)
var toObject = require('./$.to-object');

require('./$.object-sap')('getPrototypeOf', function($getPrototypeOf){
  return function getPrototypeOf(it){
    return $getPrototypeOf(toObject(it));
  };
});
},{"./$.object-sap":46,"./$.to-object":72}],121:[function(require,module,exports){
// 19.1.2.11 Object.isExtensible(O)
var isObject = require('./$.is-object');

require('./$.object-sap')('isExtensible', function($isExtensible){
  return function isExtensible(it){
    return isObject(it) ? $isExtensible ? $isExtensible(it) : true : false;
  };
});
},{"./$.is-object":33,"./$.object-sap":46}],122:[function(require,module,exports){
// 19.1.2.12 Object.isFrozen(O)
var isObject = require('./$.is-object');

require('./$.object-sap')('isFrozen', function($isFrozen){
  return function isFrozen(it){
    return isObject(it) ? $isFrozen ? $isFrozen(it) : false : true;
  };
});
},{"./$.is-object":33,"./$.object-sap":46}],123:[function(require,module,exports){
// 19.1.2.13 Object.isSealed(O)
var isObject = require('./$.is-object');

require('./$.object-sap')('isSealed', function($isSealed){
  return function isSealed(it){
    return isObject(it) ? $isSealed ? $isSealed(it) : false : true;
  };
});
},{"./$.is-object":33,"./$.object-sap":46}],124:[function(require,module,exports){
// 19.1.3.10 Object.is(value1, value2)
var $def = require('./$.def');
$def($def.S, 'Object', {
  is: require('./$.same')
});
},{"./$.def":15,"./$.same":54}],125:[function(require,module,exports){
// 19.1.2.14 Object.keys(O)
var toObject = require('./$.to-object');

require('./$.object-sap')('keys', function($keys){
  return function keys(it){
    return $keys(toObject(it));
  };
});
},{"./$.object-sap":46,"./$.to-object":72}],126:[function(require,module,exports){
// 19.1.2.15 Object.preventExtensions(O)
var isObject = require('./$.is-object');

require('./$.object-sap')('preventExtensions', function($preventExtensions){
  return function preventExtensions(it){
    return $preventExtensions && isObject(it) ? $preventExtensions(it) : it;
  };
});
},{"./$.is-object":33,"./$.object-sap":46}],127:[function(require,module,exports){
// 19.1.2.17 Object.seal(O)
var isObject = require('./$.is-object');

require('./$.object-sap')('seal', function($seal){
  return function seal(it){
    return $seal && isObject(it) ? $seal(it) : it;
  };
});
},{"./$.is-object":33,"./$.object-sap":46}],128:[function(require,module,exports){
// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $def = require('./$.def');
$def($def.S, 'Object', {setPrototypeOf: require('./$.set-proto').set});
},{"./$.def":15,"./$.set-proto":55}],129:[function(require,module,exports){
'use strict';
// 19.1.3.6 Object.prototype.toString()
var classof = require('./$.classof')
  , test    = {};
test[require('./$.wks')('toStringTag')] = 'z';
if(test + '' != '[object z]'){
  require('./$.redef')(Object.prototype, 'toString', function toString(){
    return '[object ' + classof(this) + ']';
  }, true);
}
},{"./$.classof":7,"./$.redef":52,"./$.wks":75}],130:[function(require,module,exports){
'use strict';
var $          = require('./$')
  , LIBRARY    = require('./$.library')
  , global     = require('./$.global')
  , ctx        = require('./$.ctx')
  , classof    = require('./$.classof')
  , $def       = require('./$.def')
  , isObject   = require('./$.is-object')
  , anObject   = require('./$.an-object')
  , aFunction  = require('./$.a-function')
  , strictNew  = require('./$.strict-new')
  , forOf      = require('./$.for-of')
  , setProto   = require('./$.set-proto').set
  , same       = require('./$.same')
  , species    = require('./$.species')
  , SPECIES    = require('./$.wks')('species')
  , RECORD     = require('./$.uid')('record')
  , asap       = require('./$.microtask')
  , PROMISE    = 'Promise'
  , process    = global.process
  , isNode     = classof(process) == 'process'
  , P          = global[PROMISE]
  , Wrapper;

var testResolve = function(sub){
  var test = new P(function(){});
  if(sub)test.constructor = Object;
  return P.resolve(test) === test;
};

var useNative = function(){
  var works = false;
  function P2(x){
    var self = new P(x);
    setProto(self, P2.prototype);
    return self;
  }
  try {
    works = P && P.resolve && testResolve();
    setProto(P2, P);
    P2.prototype = $.create(P.prototype, {constructor: {value: P2}});
    // actual Firefox has broken subclass support, test that
    if(!(P2.resolve(5).then(function(){}) instanceof P2)){
      works = false;
    }
    // actual V8 bug, https://code.google.com/p/v8/issues/detail?id=4162
    if(works && require('./$.support-desc')){
      var thenableThenGotten = false;
      P.resolve($.setDesc({}, 'then', {
        get: function(){ thenableThenGotten = true; }
      }));
      works = thenableThenGotten;
    }
  } catch(e){ works = false; }
  return works;
}();

// helpers
var isPromise = function(it){
  return isObject(it) && (useNative ? classof(it) == 'Promise' : RECORD in it);
};
var sameConstructor = function(a, b){
  // library wrapper special case
  if(LIBRARY && a === P && b === Wrapper)return true;
  return same(a, b);
};
var getConstructor = function(C){
  var S = anObject(C)[SPECIES];
  return S != undefined ? S : C;
};
var isThenable = function(it){
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function(record, isReject){
  if(record.n)return;
  record.n = true;
  var chain = record.c;
  asap(function(){
    var value = record.v
      , ok    = record.s == 1
      , i     = 0;
    var run = function(react){
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
    };
    while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
    chain.length = 0;
    record.n = false;
    if(isReject)setTimeout(function(){
      if(isUnhandled(record.p)){
        if(isNode){
          process.emit('unhandledRejection', value, record.p);
        } else if(global.console && console.error){
          console.error('Unhandled promise rejection', value);
        }
      } record.a = undefined;
    }, 1);
  });
};
var isUnhandled = function(promise){
  var record = promise[RECORD]
    , chain  = record.a || record.c
    , i      = 0
    , react;
  if(record.h)return false;
  while(chain.length > i){
    react = chain[i++];
    if(react.fail || !isUnhandled(react.P))return false;
  } return true;
};
var $reject = function(value){
  var record = this;
  if(record.d)return;
  record.d = true;
  record = record.r || record; // unwrap
  record.v = value;
  record.s = 2;
  record.a = record.c.slice();
  notify(record, true);
};
var $resolve = function(value){
  var record = this
    , then;
  if(record.d)return;
  record.d = true;
  record = record.r || record; // unwrap
  try {
    if(then = isThenable(value)){
      asap(function(){
        var wrapper = {r: record, d: false}; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch(e){
          $reject.call(wrapper, e);
        }
      });
    } else {
      record.v = value;
      record.s = 1;
      notify(record, false);
    }
  } catch(e){
    $reject.call({r: record, d: false}, e); // wrap
  }
};

// constructor polyfill
if(!useNative){
  // 25.4.3.1 Promise(executor)
  P = function Promise(executor){
    aFunction(executor);
    var record = {
      p: strictNew(this, P, PROMISE),         // <- promise
      c: [],                                  // <- awaiting reactions
      a: undefined,                           // <- checked in isUnhandled reactions
      s: 0,                                   // <- state
      d: false,                               // <- done
      v: undefined,                           // <- value
      h: false,                               // <- handled rejection
      n: false                                // <- notify
    };
    this[RECORD] = record;
    try {
      executor(ctx($resolve, record, 1), ctx($reject, record, 1));
    } catch(err){
      $reject.call(record, err);
    }
  };
  require('./$.mix')(P.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected){
      var S = anObject(anObject(this).constructor)[SPECIES];
      var react = {
        ok:   typeof onFulfilled == 'function' ? onFulfilled : true,
        fail: typeof onRejected == 'function'  ? onRejected  : false
      };
      var promise = react.P = new (S != undefined ? S : P)(function(res, rej){
        react.res = aFunction(res);
        react.rej = aFunction(rej);
      });
      var record = this[RECORD];
      record.c.push(react);
      if(record.a)record.a.push(react);
      if(record.s)notify(record, false);
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
require('./$.tag')(P, PROMISE);
species(P);
species(Wrapper = require('./$.core')[PROMISE]);

// statics
$def($def.S + $def.F * !useNative, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r){
    return new this(function(res, rej){ rej(r); });
  }
});
$def($def.S + $def.F * (!useNative || testResolve(true)), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x){
    return isPromise(x) && sameConstructor(x.constructor, this)
      ? x : new this(function(res){ res(x); });
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
},{"./$":40,"./$.a-function":2,"./$.an-object":3,"./$.classof":7,"./$.core":13,"./$.ctx":14,"./$.def":15,"./$.for-of":23,"./$.global":25,"./$.is-object":33,"./$.iter-detect":37,"./$.library":42,"./$.microtask":44,"./$.mix":45,"./$.same":54,"./$.set-proto":55,"./$.species":58,"./$.strict-new":59,"./$.support-desc":65,"./$.tag":66,"./$.uid":73,"./$.wks":75}],131:[function(require,module,exports){
// 26.1.1 Reflect.apply(target, thisArgument, argumentsList)
var $def   = require('./$.def')
  , _apply = Function.apply;

$def($def.S, 'Reflect', {
  apply: function apply(target, thisArgument, argumentsList){
    return _apply.call(target, thisArgument, argumentsList);
  }
});
},{"./$.def":15}],132:[function(require,module,exports){
// 26.1.2 Reflect.construct(target, argumentsList [, newTarget])
var $         = require('./$')
  , $def      = require('./$.def')
  , aFunction = require('./$.a-function')
  , anObject  = require('./$.an-object')
  , isObject  = require('./$.is-object')
  , bind      = Function.bind || require('./$.core').Function.prototype.bind;

// MS Edge supports only 2 arguments
// FF Nightly sets third argument as `new.target`, but does not create `this` from it
$def($def.S + $def.F * require('./$.fails')(function(){
  function F(){}
  return !(Reflect.construct(function(){}, [], F) instanceof F);
}), 'Reflect', {
  construct: function construct(Target, args /*, newTarget*/){
    aFunction(Target);
    var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
    if(Target == newTarget){
      // w/o altered newTarget, optimization for 0-4 arguments
      if(args != undefined)switch(anObject(args).length){
        case 0: return new Target;
        case 1: return new Target(args[0]);
        case 2: return new Target(args[0], args[1]);
        case 3: return new Target(args[0], args[1], args[2]);
        case 4: return new Target(args[0], args[1], args[2], args[3]);
      }
      // w/o altered newTarget, lot of arguments case
      var $args = [null];
      $args.push.apply($args, args);
      return new (bind.apply(Target, $args));
    }
    // with altered newTarget, not support built-in constructors
    var proto    = newTarget.prototype
      , instance = $.create(isObject(proto) ? proto : Object.prototype)
      , result   = Function.apply.call(Target, instance, args);
    return isObject(result) ? result : instance;
  }
});
},{"./$":40,"./$.a-function":2,"./$.an-object":3,"./$.core":13,"./$.def":15,"./$.fails":20,"./$.is-object":33}],133:[function(require,module,exports){
// 26.1.3 Reflect.defineProperty(target, propertyKey, attributes)
var $        = require('./$')
  , $def     = require('./$.def')
  , anObject = require('./$.an-object');

// MS Edge has broken Reflect.defineProperty - throwing instead of returning false
$def($def.S + $def.F * require('./$.fails')(function(){
  Reflect.defineProperty($.setDesc({}, 1, {value: 1}), 1, {value: 2});
}), 'Reflect', {
  defineProperty: function defineProperty(target, propertyKey, attributes){
    anObject(target);
    try {
      $.setDesc(target, propertyKey, attributes);
      return true;
    } catch(e){
      return false;
    }
  }
});
},{"./$":40,"./$.an-object":3,"./$.def":15,"./$.fails":20}],134:[function(require,module,exports){
// 26.1.4 Reflect.deleteProperty(target, propertyKey)
var $def     = require('./$.def')
  , getDesc  = require('./$').getDesc
  , anObject = require('./$.an-object');

$def($def.S, 'Reflect', {
  deleteProperty: function deleteProperty(target, propertyKey){
    var desc = getDesc(anObject(target), propertyKey);
    return desc && !desc.configurable ? false : delete target[propertyKey];
  }
});
},{"./$":40,"./$.an-object":3,"./$.def":15}],135:[function(require,module,exports){
'use strict';
// 26.1.5 Reflect.enumerate(target)
var $def     = require('./$.def')
  , anObject = require('./$.an-object');
var Enumerate = function(iterated){
  this._t = anObject(iterated); // target
  this._i = 0;                  // next index
  var keys = this._k = []       // keys
    , key;
  for(key in iterated)keys.push(key);
};
require('./$.iter-create')(Enumerate, 'Object', function(){
  var that = this
    , keys = that._k
    , key;
  do {
    if(that._i >= keys.length)return {value: undefined, done: true};
  } while(!((key = keys[that._i++]) in that._t));
  return {value: key, done: false};
});

$def($def.S, 'Reflect', {
  enumerate: function enumerate(target){
    return new Enumerate(target);
  }
});
},{"./$.an-object":3,"./$.def":15,"./$.iter-create":35}],136:[function(require,module,exports){
// 26.1.7 Reflect.getOwnPropertyDescriptor(target, propertyKey)
var $        = require('./$')
  , $def     = require('./$.def')
  , anObject = require('./$.an-object');

$def($def.S, 'Reflect', {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey){
    return $.getDesc(anObject(target), propertyKey);
  }
});
},{"./$":40,"./$.an-object":3,"./$.def":15}],137:[function(require,module,exports){
// 26.1.8 Reflect.getPrototypeOf(target)
var $def     = require('./$.def')
  , getProto = require('./$').getProto
  , anObject = require('./$.an-object');

$def($def.S, 'Reflect', {
  getPrototypeOf: function getPrototypeOf(target){
    return getProto(anObject(target));
  }
});
},{"./$":40,"./$.an-object":3,"./$.def":15}],138:[function(require,module,exports){
// 26.1.6 Reflect.get(target, propertyKey [, receiver])
var $        = require('./$')
  , has      = require('./$.has')
  , $def     = require('./$.def')
  , isObject = require('./$.is-object')
  , anObject = require('./$.an-object');

function get(target, propertyKey/*, receiver*/){
  var receiver = arguments.length < 3 ? target : arguments[2]
    , desc, proto;
  if(anObject(target) === receiver)return target[propertyKey];
  if(desc = $.getDesc(target, propertyKey))return has(desc, 'value')
    ? desc.value
    : desc.get !== undefined
      ? desc.get.call(receiver)
      : undefined;
  if(isObject(proto = $.getProto(target)))return get(proto, propertyKey, receiver);
}

$def($def.S, 'Reflect', {get: get});
},{"./$":40,"./$.an-object":3,"./$.def":15,"./$.has":26,"./$.is-object":33}],139:[function(require,module,exports){
// 26.1.9 Reflect.has(target, propertyKey)
var $def = require('./$.def');

$def($def.S, 'Reflect', {
  has: function has(target, propertyKey){
    return propertyKey in target;
  }
});
},{"./$.def":15}],140:[function(require,module,exports){
// 26.1.10 Reflect.isExtensible(target)
var $def          = require('./$.def')
  , anObject      = require('./$.an-object')
  , $isExtensible = Object.isExtensible;

$def($def.S, 'Reflect', {
  isExtensible: function isExtensible(target){
    anObject(target);
    return $isExtensible ? $isExtensible(target) : true;
  }
});
},{"./$.an-object":3,"./$.def":15}],141:[function(require,module,exports){
// 26.1.11 Reflect.ownKeys(target)
var $def = require('./$.def');

$def($def.S, 'Reflect', {ownKeys: require('./$.own-keys')});
},{"./$.def":15,"./$.own-keys":48}],142:[function(require,module,exports){
// 26.1.12 Reflect.preventExtensions(target)
var $def               = require('./$.def')
  , anObject           = require('./$.an-object')
  , $preventExtensions = Object.preventExtensions;

$def($def.S, 'Reflect', {
  preventExtensions: function preventExtensions(target){
    anObject(target);
    try {
      if($preventExtensions)$preventExtensions(target);
      return true;
    } catch(e){
      return false;
    }
  }
});
},{"./$.an-object":3,"./$.def":15}],143:[function(require,module,exports){
// 26.1.14 Reflect.setPrototypeOf(target, proto)
var $def     = require('./$.def')
  , setProto = require('./$.set-proto');

if(setProto)$def($def.S, 'Reflect', {
  setPrototypeOf: function setPrototypeOf(target, proto){
    setProto.check(target, proto);
    try {
      setProto.set(target, proto);
      return true;
    } catch(e){
      return false;
    }
  }
});
},{"./$.def":15,"./$.set-proto":55}],144:[function(require,module,exports){
// 26.1.13 Reflect.set(target, propertyKey, V [, receiver])
var $          = require('./$')
  , has        = require('./$.has')
  , $def       = require('./$.def')
  , createDesc = require('./$.property-desc')
  , anObject   = require('./$.an-object')
  , isObject   = require('./$.is-object');

function set(target, propertyKey, V/*, receiver*/){
  var receiver = arguments.length < 4 ? target : arguments[3]
    , ownDesc  = $.getDesc(anObject(target), propertyKey)
    , existingDescriptor, proto;
  if(!ownDesc){
    if(isObject(proto = $.getProto(target))){
      return set(proto, propertyKey, V, receiver);
    }
    ownDesc = createDesc(0);
  }
  if(has(ownDesc, 'value')){
    if(ownDesc.writable === false || !isObject(receiver))return false;
    existingDescriptor = $.getDesc(receiver, propertyKey) || createDesc(0);
    existingDescriptor.value = V;
    $.setDesc(receiver, propertyKey, existingDescriptor);
    return true;
  }
  return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
}

$def($def.S, 'Reflect', {set: set});
},{"./$":40,"./$.an-object":3,"./$.def":15,"./$.has":26,"./$.is-object":33,"./$.property-desc":51}],145:[function(require,module,exports){
var $       = require('./$')
  , global  = require('./$.global')
  , cof     = require('./$.cof')
  , $flags  = require('./$.flags')
  , $RegExp = global.RegExp
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

if(require('./$.support-desc')){
  if(!CORRECT_NEW || !ALLOWS_RE_WITH_FLAGS){
    $RegExp = function RegExp(pattern, flags){
      var patternIsRegExp  = cof(pattern) == 'RegExp'
        , flagsIsUndefined = flags === undefined;
      if(!(this instanceof $RegExp) && patternIsRegExp && flagsIsUndefined)return pattern;
      return CORRECT_NEW
        ? new Base(patternIsRegExp && !flagsIsUndefined ? pattern.source : pattern, flags)
        : new Base(patternIsRegExp ? pattern.source : pattern
          , patternIsRegExp && flagsIsUndefined ? $flags.call(pattern) : flags);
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
    require('./$.redef')(global, 'RegExp', $RegExp);
  }
}

require('./$.species')($RegExp);
},{"./$":40,"./$.cof":8,"./$.flags":22,"./$.global":25,"./$.redef":52,"./$.species":58,"./$.support-desc":65}],146:[function(require,module,exports){
// 21.2.5.3 get RegExp.prototype.flags()
var $ = require('./$');
if(require('./$.support-desc') && /./g.flags != 'g')$.setDesc(RegExp.prototype, 'flags', {
  configurable: true,
  get: require('./$.flags')
});
},{"./$":40,"./$.flags":22,"./$.support-desc":65}],147:[function(require,module,exports){
// @@match logic
require('./$.fix-re-wks')('match', 1, function(defined, MATCH){
  // 21.1.3.11 String.prototype.match(regexp)
  return function match(regexp){
    'use strict';
    var O  = defined(this)
      , fn = regexp == undefined ? undefined : regexp[MATCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
  };
});
},{"./$.fix-re-wks":21}],148:[function(require,module,exports){
// @@replace logic
require('./$.fix-re-wks')('replace', 2, function(defined, REPLACE, $replace){
  // 21.1.3.14 String.prototype.replace(searchValue, replaceValue)
  return function replace(searchValue, replaceValue){
    'use strict';
    var O  = defined(this)
      , fn = searchValue == undefined ? undefined : searchValue[REPLACE];
    return fn !== undefined
      ? fn.call(searchValue, O, replaceValue)
      : $replace.call(String(O), searchValue, replaceValue);
  };
});
},{"./$.fix-re-wks":21}],149:[function(require,module,exports){
// @@search logic
require('./$.fix-re-wks')('search', 1, function(defined, SEARCH){
  // 21.1.3.15 String.prototype.search(regexp)
  return function search(regexp){
    'use strict';
    var O  = defined(this)
      , fn = regexp == undefined ? undefined : regexp[SEARCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
  };
});
},{"./$.fix-re-wks":21}],150:[function(require,module,exports){
// @@split logic
require('./$.fix-re-wks')('split', 2, function(defined, SPLIT, $split){
  // 21.1.3.17 String.prototype.split(separator, limit)
  return function split(separator, limit){
    'use strict';
    var O  = defined(this)
      , fn = separator == undefined ? undefined : separator[SPLIT];
    return fn !== undefined
      ? fn.call(separator, O, limit)
      : $split.call(String(O), separator, limit);
  };
});
},{"./$.fix-re-wks":21}],151:[function(require,module,exports){
'use strict';
var strong = require('./$.collection-strong');

// 23.2 Set Objects
require('./$.collection')('Set', function(get){
  return function Set(){ return get(this, arguments[0]); };
}, {
  // 23.2.3.1 Set.prototype.add(value)
  add: function add(value){
    return strong.def(this, value = value === 0 ? 0 : value, value);
  }
}, strong);
},{"./$.collection":12,"./$.collection-strong":9}],152:[function(require,module,exports){
'use strict';
var $def = require('./$.def')
  , $at  = require('./$.string-at')(false);
$def($def.P, 'String', {
  // 21.1.3.3 String.prototype.codePointAt(pos)
  codePointAt: function codePointAt(pos){
    return $at(this, pos);
  }
});
},{"./$.def":15,"./$.string-at":60}],153:[function(require,module,exports){
'use strict';
var $def     = require('./$.def')
  , toLength = require('./$.to-length')
  , context  = require('./$.string-context');

// should throw error on regex
$def($def.P + $def.F * !require('./$.fails')(function(){ 'q'.endsWith(/./); }), 'String', {
  // 21.1.3.6 String.prototype.endsWith(searchString [, endPosition])
  endsWith: function endsWith(searchString /*, endPosition = @length */){
    var that = context(this, searchString, 'endsWith')
      , endPosition = arguments[1]
      , len    = toLength(that.length)
      , end    = endPosition === undefined ? len : Math.min(toLength(endPosition), len)
      , search = String(searchString);
    return that.slice(end - search.length, end) === search;
  }
});
},{"./$.def":15,"./$.fails":20,"./$.string-context":61,"./$.to-length":71}],154:[function(require,module,exports){
var $def    = require('./$.def')
  , toIndex = require('./$.to-index')
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
},{"./$.def":15,"./$.to-index":68}],155:[function(require,module,exports){
'use strict';
var $def    = require('./$.def')
  , context = require('./$.string-context');

$def($def.P, 'String', {
  // 21.1.3.7 String.prototype.includes(searchString, position = 0)
  includes: function includes(searchString /*, position = 0 */){
    return !!~context(this, searchString, 'includes').indexOf(searchString, arguments[1]);
  }
});
},{"./$.def":15,"./$.string-context":61}],156:[function(require,module,exports){
'use strict';
var $at  = require('./$.string-at')(true);

// 21.1.3.27 String.prototype[@@iterator]()
require('./$.iter-define')(String, 'String', function(iterated){
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , index = this._i
    , point;
  if(index >= O.length)return {value: undefined, done: true};
  point = $at(O, index);
  this._i += point.length;
  return {value: point, done: false};
});
},{"./$.iter-define":36,"./$.string-at":60}],157:[function(require,module,exports){
var $def      = require('./$.def')
  , toIObject = require('./$.to-iobject')
  , toLength  = require('./$.to-length');

$def($def.S, 'String', {
  // 21.1.2.4 String.raw(callSite, ...substitutions)
  raw: function raw(callSite){
    var tpl = toIObject(callSite.raw)
      , len = toLength(tpl.length)
      , sln = arguments.length
      , res = []
      , i   = 0;
    while(len > i){
      res.push(String(tpl[i++]));
      if(i < sln)res.push(String(arguments[i]));
    } return res.join('');
  }
});
},{"./$.def":15,"./$.to-iobject":70,"./$.to-length":71}],158:[function(require,module,exports){
var $def = require('./$.def');

$def($def.P, 'String', {
  // 21.1.3.13 String.prototype.repeat(count)
  repeat: require('./$.string-repeat')
});
},{"./$.def":15,"./$.string-repeat":63}],159:[function(require,module,exports){
'use strict';
var $def     = require('./$.def')
  , toLength = require('./$.to-length')
  , context  = require('./$.string-context');

// should throw error on regex
$def($def.P + $def.F * !require('./$.fails')(function(){ 'q'.startsWith(/./); }), 'String', {
  // 21.1.3.18 String.prototype.startsWith(searchString [, position ])
  startsWith: function startsWith(searchString /*, position = 0 */){
    var that   = context(this, searchString, 'startsWith')
      , index  = toLength(Math.min(arguments[1], that.length))
      , search = String(searchString);
    return that.slice(index, index + search.length) === search;
  }
});
},{"./$.def":15,"./$.fails":20,"./$.string-context":61,"./$.to-length":71}],160:[function(require,module,exports){
'use strict';
// 21.1.3.25 String.prototype.trim()
require('./$.string-trim')('trim', function($trim){
  return function trim(){
    return $trim(this, 3);
  };
});
},{"./$.string-trim":64}],161:[function(require,module,exports){
'use strict';
// ECMAScript 6 symbols shim
var $              = require('./$')
  , global         = require('./$.global')
  , has            = require('./$.has')
  , SUPPORT_DESC   = require('./$.support-desc')
  , $def           = require('./$.def')
  , $redef         = require('./$.redef')
  , shared         = require('./$.shared')
  , setTag         = require('./$.tag')
  , uid            = require('./$.uid')
  , wks            = require('./$.wks')
  , keyOf          = require('./$.keyof')
  , $names         = require('./$.get-names')
  , enumKeys       = require('./$.enum-keys')
  , isObject       = require('./$.is-object')
  , anObject       = require('./$.an-object')
  , toIObject      = require('./$.to-iobject')
  , createDesc     = require('./$.property-desc')
  , getDesc        = $.getDesc
  , setDesc        = $.setDesc
  , _create        = $.create
  , getNames       = $names.get
  , $Symbol        = global.Symbol
  , setter         = false
  , HIDDEN         = wks('_hidden')
  , isEnum         = $.isEnum
  , SymbolRegistry = shared('symbol-registry')
  , AllSymbols     = shared('symbols')
  , useNative      = typeof $Symbol == 'function'
  , ObjectProto    = Object.prototype;

var setSymbolDesc = SUPPORT_DESC ? function(){ // fallback for old Android
  try {
    return _create(setDesc({}, HIDDEN, {
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

var wrap = function(tag){
  var sym = AllSymbols[tag] = _create($Symbol.prototype);
  sym._k = tag;
  SUPPORT_DESC && setter && setSymbolDesc(ObjectProto, tag, {
    configurable: true,
    set: function(value){
      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    }
  });
  return sym;
};

var $defineProperty = function defineProperty(it, key, D){
  if(D && has(AllSymbols, key)){
    if(!D.enumerable){
      if(!has(it, HIDDEN))setDesc(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
      D = _create(D, {enumerable: createDesc(0, false)});
    } return setSymbolDesc(it, key, D);
  } return setDesc(it, key, D);
};
var $defineProperties = function defineProperties(it, P){
  anObject(it);
  var keys = enumKeys(P = toIObject(P))
    , i    = 0
    , l = keys.length
    , key;
  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P){
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key){
  var E = isEnum.call(this, key);
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key]
    ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
  var D = getDesc(it = toIObject(it), key);
  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it){
  var names  = getNames(toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i)if(!has(AllSymbols, key = names[i++]) && key != HIDDEN)result.push(key);
  return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
  var names  = getNames(toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i)if(has(AllSymbols, key = names[i++]))result.push(AllSymbols[key]);
  return result;
};

// 19.4.1.1 Symbol([description])
if(!useNative){
  $Symbol = function Symbol(){
    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor');
    return wrap(uid(arguments[0]));
  };
  $redef($Symbol.prototype, 'toString', function toString(){
    return this._k;
  });

  $.create     = $create;
  $.isEnum     = $propertyIsEnumerable;
  $.getDesc    = $getOwnPropertyDescriptor;
  $.setDesc    = $defineProperty;
  $.setDescs   = $defineProperties;
  $.getNames   = $names.get = $getOwnPropertyNames;
  $.getSymbols = $getOwnPropertySymbols;

  if(SUPPORT_DESC && !require('./$.library')){
    $redef(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }
}

// MS Edge converts symbol values to JSON as {}
// WebKit converts symbol values in objects to JSON as null
if(!useNative || require('./$.fails')(function(){
  return JSON.stringify([{a: $Symbol()}, [$Symbol()]]) != '[{},[null]]';
}))$redef($Symbol.prototype, 'toJSON', function toJSON(){
  if(useNative && isObject(this))return this;
});

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
    var sym = wks(it);
    symbolStatics[it] = useNative ? sym : wrap(sym);
  }
);

setter = true;

$def($def.G + $def.W, {Symbol: $Symbol});

$def($def.S, 'Symbol', symbolStatics);

$def($def.S + $def.F * !useNative, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 19.4.3.5 Symbol.prototype[@@toStringTag]
setTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setTag(global.JSON, 'JSON', true);
},{"./$":40,"./$.an-object":3,"./$.def":15,"./$.enum-keys":18,"./$.fails":20,"./$.get-names":24,"./$.global":25,"./$.has":26,"./$.is-object":33,"./$.keyof":41,"./$.library":42,"./$.property-desc":51,"./$.redef":52,"./$.shared":56,"./$.support-desc":65,"./$.tag":66,"./$.to-iobject":70,"./$.uid":73,"./$.wks":75}],162:[function(require,module,exports){
'use strict';
var $            = require('./$')
  , weak         = require('./$.collection-weak')
  , isObject     = require('./$.is-object')
  , has          = require('./$.has')
  , frozenStore  = weak.frozenStore
  , WEAK         = weak.WEAK
  , isExtensible = Object.isExtensible || isObject
  , tmp          = {};

// 23.3 WeakMap Objects
var $WeakMap = require('./$.collection')('WeakMap', function(get){
  return function WeakMap(){ return get(this, arguments[0]); };
}, {
  // 23.3.3.3 WeakMap.prototype.get(key)
  get: function get(key){
    if(isObject(key)){
      if(!isExtensible(key))return frozenStore(this).get(key);
      if(has(key, WEAK))return key[WEAK][this._i];
    }
  },
  // 23.3.3.5 WeakMap.prototype.set(key, value)
  set: function set(key, value){
    return weak.def(this, key, value);
  }
}, weak, true, true);

// IE11 WeakMap frozen keys fix
if(new $WeakMap().set((Object.freeze || Object)(tmp), 7).get(tmp) != 7){
  $.each.call(['delete', 'has', 'get', 'set'], function(key){
    var proto  = $WeakMap.prototype
      , method = proto[key];
    require('./$.redef')(proto, key, function(a, b){
      // store frozen objects on leaky map
      if(isObject(a) && !isExtensible(a)){
        var result = frozenStore(this)[key](a, b);
        return key == 'set' ? this : result;
      // store all the rest on native weakmap
      } return method.call(this, a, b);
    });
  });
}
},{"./$":40,"./$.collection":12,"./$.collection-weak":11,"./$.has":26,"./$.is-object":33,"./$.redef":52}],163:[function(require,module,exports){
'use strict';
var weak = require('./$.collection-weak');

// 23.4 WeakSet Objects
require('./$.collection')('WeakSet', function(get){
  return function WeakSet(){ return get(this, arguments[0]); };
}, {
  // 23.4.3.1 WeakSet.prototype.add(value)
  add: function add(value){
    return weak.def(this, value, true);
  }
}, weak, false, true);
},{"./$.collection":12,"./$.collection-weak":11}],164:[function(require,module,exports){
'use strict';
var $def      = require('./$.def')
  , $includes = require('./$.array-includes')(true);
$def($def.P, 'Array', {
  // https://github.com/domenic/Array.prototype.includes
  includes: function includes(el /*, fromIndex = 0 */){
    return $includes(this, el, arguments[1]);
  }
});
require('./$.unscope')('includes');
},{"./$.array-includes":4,"./$.def":15,"./$.unscope":74}],165:[function(require,module,exports){
// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $def  = require('./$.def');

$def($def.P, 'Map', {toJSON: require('./$.collection-to-json')('Map')});
},{"./$.collection-to-json":10,"./$.def":15}],166:[function(require,module,exports){
// http://goo.gl/XkBrjD
var $def     = require('./$.def')
  , $entries = require('./$.object-to-array')(true);

$def($def.S, 'Object', {
  entries: function entries(it){
    return $entries(it);
  }
});
},{"./$.def":15,"./$.object-to-array":47}],167:[function(require,module,exports){
// https://gist.github.com/WebReflection/9353781
var $          = require('./$')
  , $def       = require('./$.def')
  , ownKeys    = require('./$.own-keys')
  , toIObject  = require('./$.to-iobject')
  , createDesc = require('./$.property-desc');

$def($def.S, 'Object', {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object){
    var O       = toIObject(object)
      , setDesc = $.setDesc
      , getDesc = $.getDesc
      , keys    = ownKeys(O)
      , result  = {}
      , i       = 0
      , key, D;
    while(keys.length > i){
      D = getDesc(O, key = keys[i++]);
      if(key in result)setDesc(result, key, createDesc(0, D));
      else result[key] = D;
    } return result;
  }
});
},{"./$":40,"./$.def":15,"./$.own-keys":48,"./$.property-desc":51,"./$.to-iobject":70}],168:[function(require,module,exports){
// http://goo.gl/XkBrjD
var $def    = require('./$.def')
  , $values = require('./$.object-to-array')(false);

$def($def.S, 'Object', {
  values: function values(it){
    return $values(it);
  }
});
},{"./$.def":15,"./$.object-to-array":47}],169:[function(require,module,exports){
// https://github.com/benjamingr/RexExp.escape
var $def = require('./$.def')
  , $re  = require('./$.replacer')(/[\\^$*+?.()|[\]{}]/g, '\\$&');
$def($def.S, 'RegExp', {escape: function escape(it){ return $re(it); }});

},{"./$.def":15,"./$.replacer":53}],170:[function(require,module,exports){
// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $def  = require('./$.def');

$def($def.P, 'Set', {toJSON: require('./$.collection-to-json')('Set')});
},{"./$.collection-to-json":10,"./$.def":15}],171:[function(require,module,exports){
// https://github.com/mathiasbynens/String.prototype.at
'use strict';
var $def = require('./$.def')
  , $at  = require('./$.string-at')(true);
$def($def.P, 'String', {
  at: function at(pos){
    return $at(this, pos);
  }
});
},{"./$.def":15,"./$.string-at":60}],172:[function(require,module,exports){
'use strict';
var $def = require('./$.def')
  , $pad = require('./$.string-pad');
$def($def.P, 'String', {
  padLeft: function padLeft(maxLength /*, fillString = ' ' */){
    return $pad(this, maxLength, arguments[1], true);
  }
});
},{"./$.def":15,"./$.string-pad":62}],173:[function(require,module,exports){
'use strict';
var $def = require('./$.def')
  , $pad = require('./$.string-pad');
$def($def.P, 'String', {
  padRight: function padRight(maxLength /*, fillString = ' ' */){
    return $pad(this, maxLength, arguments[1], false);
  }
});
},{"./$.def":15,"./$.string-pad":62}],174:[function(require,module,exports){
'use strict';
// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
require('./$.string-trim')('trimLeft', function($trim){
  return function trimLeft(){
    return $trim(this, 1);
  };
});
},{"./$.string-trim":64}],175:[function(require,module,exports){
'use strict';
// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
require('./$.string-trim')('trimRight', function($trim){
  return function trimRight(){
    return $trim(this, 2);
  };
});
},{"./$.string-trim":64}],176:[function(require,module,exports){
// JavaScript 1.6 / Strawman array statics shim
var $       = require('./$')
  , $def    = require('./$.def')
  , $Array  = require('./$.core').Array || Array
  , statics = {};
var setStatics = function(keys, length){
  $.each.call(keys.split(','), function(key){
    if(length == undefined && key in $Array)statics[key] = $Array[key];
    else if(key in [])statics[key] = require('./$.ctx')(Function.call, [][key], length);
  });
};
setStatics('pop,reverse,shift,keys,values,entries', 1);
setStatics('indexOf,every,some,forEach,map,filter,find,findIndex,includes', 3);
setStatics('join,slice,concat,push,splice,unshift,sort,lastIndexOf,' +
           'reduce,reduceRight,copyWithin,fill');
$def($def.S, 'Array', statics);
},{"./$":40,"./$.core":13,"./$.ctx":14,"./$.def":15}],177:[function(require,module,exports){
require('./es6.array.iterator');
var global      = require('./$.global')
  , hide        = require('./$.hide')
  , Iterators   = require('./$.iterators')
  , ITERATOR    = require('./$.wks')('iterator')
  , NL          = global.NodeList
  , HTC         = global.HTMLCollection
  , NLProto     = NL && NL.prototype
  , HTCProto    = HTC && HTC.prototype
  , ArrayValues = Iterators.NodeList = Iterators.HTMLCollection = Iterators.Array;
if(NL && !(ITERATOR in NLProto))hide(NLProto, ITERATOR, ArrayValues);
if(HTC && !(ITERATOR in HTCProto))hide(HTCProto, ITERATOR, ArrayValues);
},{"./$.global":25,"./$.hide":27,"./$.iterators":39,"./$.wks":75,"./es6.array.iterator":83}],178:[function(require,module,exports){
var $def  = require('./$.def')
  , $task = require('./$.task');
$def($def.G + $def.B, {
  setImmediate:   $task.set,
  clearImmediate: $task.clear
});
},{"./$.def":15,"./$.task":67}],179:[function(require,module,exports){
// ie9- setTimeout & setInterval additional parameters fix
var global     = require('./$.global')
  , $def       = require('./$.def')
  , invoke     = require('./$.invoke')
  , partial    = require('./$.partial')
  , navigator  = global.navigator
  , MSIE       = !!navigator && /MSIE .\./.test(navigator.userAgent); // <- dirty ie9- check
var wrap = function(set){
  return MSIE ? function(fn, time /*, ...args */){
    return set(invoke(
      partial,
      [].slice.call(arguments, 2),
      typeof fn == 'function' ? fn : Function(fn)
    ), time);
  } : set;
};
$def($def.G + $def.B + $def.F * MSIE, {
  setTimeout:  wrap(global.setTimeout),
  setInterval: wrap(global.setInterval)
});
},{"./$.def":15,"./$.global":25,"./$.invoke":29,"./$.partial":49}],180:[function(require,module,exports){
require('./modules/es5');
require('./modules/es6.symbol');
require('./modules/es6.object.assign');
require('./modules/es6.object.is');
require('./modules/es6.object.set-prototype-of');
require('./modules/es6.object.to-string');
require('./modules/es6.object.freeze');
require('./modules/es6.object.seal');
require('./modules/es6.object.prevent-extensions');
require('./modules/es6.object.is-frozen');
require('./modules/es6.object.is-sealed');
require('./modules/es6.object.is-extensible');
require('./modules/es6.object.get-own-property-descriptor');
require('./modules/es6.object.get-prototype-of');
require('./modules/es6.object.keys');
require('./modules/es6.object.get-own-property-names');
require('./modules/es6.function.name');
require('./modules/es6.function.has-instance');
require('./modules/es6.number.constructor');
require('./modules/es6.number.epsilon');
require('./modules/es6.number.is-finite');
require('./modules/es6.number.is-integer');
require('./modules/es6.number.is-nan');
require('./modules/es6.number.is-safe-integer');
require('./modules/es6.number.max-safe-integer');
require('./modules/es6.number.min-safe-integer');
require('./modules/es6.number.parse-float');
require('./modules/es6.number.parse-int');
require('./modules/es6.math.acosh');
require('./modules/es6.math.asinh');
require('./modules/es6.math.atanh');
require('./modules/es6.math.cbrt');
require('./modules/es6.math.clz32');
require('./modules/es6.math.cosh');
require('./modules/es6.math.expm1');
require('./modules/es6.math.fround');
require('./modules/es6.math.hypot');
require('./modules/es6.math.imul');
require('./modules/es6.math.log10');
require('./modules/es6.math.log1p');
require('./modules/es6.math.log2');
require('./modules/es6.math.sign');
require('./modules/es6.math.sinh');
require('./modules/es6.math.tanh');
require('./modules/es6.math.trunc');
require('./modules/es6.string.from-code-point');
require('./modules/es6.string.raw');
require('./modules/es6.string.trim');
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
require('./modules/es6.regexp.constructor');
require('./modules/es6.regexp.flags');
require('./modules/es6.regexp.match');
require('./modules/es6.regexp.replace');
require('./modules/es6.regexp.search');
require('./modules/es6.regexp.split');
require('./modules/es6.promise');
require('./modules/es6.map');
require('./modules/es6.set');
require('./modules/es6.weak-map');
require('./modules/es6.weak-set');
require('./modules/es6.reflect.apply');
require('./modules/es6.reflect.construct');
require('./modules/es6.reflect.define-property');
require('./modules/es6.reflect.delete-property');
require('./modules/es6.reflect.enumerate');
require('./modules/es6.reflect.get');
require('./modules/es6.reflect.get-own-property-descriptor');
require('./modules/es6.reflect.get-prototype-of');
require('./modules/es6.reflect.has');
require('./modules/es6.reflect.is-extensible');
require('./modules/es6.reflect.own-keys');
require('./modules/es6.reflect.prevent-extensions');
require('./modules/es6.reflect.set');
require('./modules/es6.reflect.set-prototype-of');
require('./modules/es7.array.includes');
require('./modules/es7.string.at');
require('./modules/es7.string.pad-left');
require('./modules/es7.string.pad-right');
require('./modules/es7.string.trim-left');
require('./modules/es7.string.trim-right');
require('./modules/es7.regexp.escape');
require('./modules/es7.object.get-own-property-descriptors');
require('./modules/es7.object.values');
require('./modules/es7.object.entries');
require('./modules/es7.map.to-json');
require('./modules/es7.set.to-json');
require('./modules/js.array.statics');
require('./modules/web.timers');
require('./modules/web.immediate');
require('./modules/web.dom.iterable');
module.exports = require('./modules/$.core');
},{"./modules/$.core":13,"./modules/es5":77,"./modules/es6.array.copy-within":78,"./modules/es6.array.fill":79,"./modules/es6.array.find":81,"./modules/es6.array.find-index":80,"./modules/es6.array.from":82,"./modules/es6.array.iterator":83,"./modules/es6.array.of":84,"./modules/es6.array.species":85,"./modules/es6.function.has-instance":86,"./modules/es6.function.name":87,"./modules/es6.map":88,"./modules/es6.math.acosh":89,"./modules/es6.math.asinh":90,"./modules/es6.math.atanh":91,"./modules/es6.math.cbrt":92,"./modules/es6.math.clz32":93,"./modules/es6.math.cosh":94,"./modules/es6.math.expm1":95,"./modules/es6.math.fround":96,"./modules/es6.math.hypot":97,"./modules/es6.math.imul":98,"./modules/es6.math.log10":99,"./modules/es6.math.log1p":100,"./modules/es6.math.log2":101,"./modules/es6.math.sign":102,"./modules/es6.math.sinh":103,"./modules/es6.math.tanh":104,"./modules/es6.math.trunc":105,"./modules/es6.number.constructor":106,"./modules/es6.number.epsilon":107,"./modules/es6.number.is-finite":108,"./modules/es6.number.is-integer":109,"./modules/es6.number.is-nan":110,"./modules/es6.number.is-safe-integer":111,"./modules/es6.number.max-safe-integer":112,"./modules/es6.number.min-safe-integer":113,"./modules/es6.number.parse-float":114,"./modules/es6.number.parse-int":115,"./modules/es6.object.assign":116,"./modules/es6.object.freeze":117,"./modules/es6.object.get-own-property-descriptor":118,"./modules/es6.object.get-own-property-names":119,"./modules/es6.object.get-prototype-of":120,"./modules/es6.object.is":124,"./modules/es6.object.is-extensible":121,"./modules/es6.object.is-frozen":122,"./modules/es6.object.is-sealed":123,"./modules/es6.object.keys":125,"./modules/es6.object.prevent-extensions":126,"./modules/es6.object.seal":127,"./modules/es6.object.set-prototype-of":128,"./modules/es6.object.to-string":129,"./modules/es6.promise":130,"./modules/es6.reflect.apply":131,"./modules/es6.reflect.construct":132,"./modules/es6.reflect.define-property":133,"./modules/es6.reflect.delete-property":134,"./modules/es6.reflect.enumerate":135,"./modules/es6.reflect.get":138,"./modules/es6.reflect.get-own-property-descriptor":136,"./modules/es6.reflect.get-prototype-of":137,"./modules/es6.reflect.has":139,"./modules/es6.reflect.is-extensible":140,"./modules/es6.reflect.own-keys":141,"./modules/es6.reflect.prevent-extensions":142,"./modules/es6.reflect.set":144,"./modules/es6.reflect.set-prototype-of":143,"./modules/es6.regexp.constructor":145,"./modules/es6.regexp.flags":146,"./modules/es6.regexp.match":147,"./modules/es6.regexp.replace":148,"./modules/es6.regexp.search":149,"./modules/es6.regexp.split":150,"./modules/es6.set":151,"./modules/es6.string.code-point-at":152,"./modules/es6.string.ends-with":153,"./modules/es6.string.from-code-point":154,"./modules/es6.string.includes":155,"./modules/es6.string.iterator":156,"./modules/es6.string.raw":157,"./modules/es6.string.repeat":158,"./modules/es6.string.starts-with":159,"./modules/es6.string.trim":160,"./modules/es6.symbol":161,"./modules/es6.weak-map":162,"./modules/es6.weak-set":163,"./modules/es7.array.includes":164,"./modules/es7.map.to-json":165,"./modules/es7.object.entries":166,"./modules/es7.object.get-own-property-descriptors":167,"./modules/es7.object.values":168,"./modules/es7.regexp.escape":169,"./modules/es7.set.to-json":170,"./modules/es7.string.at":171,"./modules/es7.string.pad-left":172,"./modules/es7.string.pad-right":173,"./modules/es7.string.trim-left":174,"./modules/es7.string.trim-right":175,"./modules/js.array.statics":176,"./modules/web.dom.iterable":177,"./modules/web.immediate":178,"./modules/web.timers":179}],181:[function(require,module,exports){
(function (process,global){
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

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

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

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `value instanceof AwaitArgument` to determine if the yielded value is
  // meant to be awaited. Some may consider the name of this method too
  // cutesy, but they are curmudgeons.
  runtime.awrap = function(arg) {
    return new AwaitArgument(arg);
  };

  function AwaitArgument(arg) {
    this.arg = arg;
  }

  function AsyncIterator(generator) {
    // This invoke function is written in a style that assumes some
    // calling function (or Promise) will handle exceptions.
    function invoke(method, arg) {
      var result = generator[method](arg);
      var value = result.value;
      return value instanceof AwaitArgument
        ? Promise.resolve(value.arg).then(invokeNext, invokeThrow)
        : Promise.resolve(value).then(function(unwrapped) {
            // When a yielded Promise is resolved, its final value becomes
            // the .value of the Promise<{value,done}> result for the
            // current iteration. If the Promise is rejected, however, the
            // result for this iteration will be rejected with the same
            // reason. Note that rejections of yielded Promises are not
            // thrown back into the generator function, as is the case
            // when an awaited Promise is rejected. This difference in
            // behavior between yield and await is important, because it
            // allows the consumer to decide what to do with the yielded
            // rejection (swallow it and continue, manually .throw it back
            // into the generator, abandon iteration, whatever). With
            // await, by contrast, there is no opportunity to examine the
            // rejection reason outside the generator function, so the
            // only option is to throw it from the await expression, and
            // let the generator function handle the exception.
            result.value = unwrapped;
            return result;
          });
    }

    if (typeof process === "object" && process.domain) {
      invoke = process.domain.bind(invoke);
    }

    var invokeNext = invoke.bind(generator, "next");
    var invokeThrow = invoke.bind(generator, "throw");
    var invokeReturn = invoke.bind(generator, "return");
    var previousPromise;

    function enqueue(method, arg) {
      var enqueueResult =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(function() {
          return invoke(method, arg);
        }) : new Promise(function(resolve) {
          resolve(invoke(method, arg));
        });

      // Avoid propagating enqueueResult failures to Promises returned by
      // later invocations of the iterator.
      previousPromise = enqueueResult["catch"](function(ignored){});

      return enqueueResult;
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

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
            context.sent = undefined;
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

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

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
    this.reset(true);
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

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      this.sent = undefined;
      this.done = false;
      this.delegate = null;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
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

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"_process":184}],182:[function(require,module,exports){
module.exports = require("./lib/polyfill");

},{"./lib/polyfill":1}],183:[function(require,module,exports){
module.exports = require("babel-core/polyfill");

},{"babel-core/polyfill":182}],184:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = setTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            currentQueue[queueIndex].run();
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    clearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        setTimeout(drainQueue, 0);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],185:[function(require,module,exports){
/*
 * Javascript Quadtree
 * @version 1.2-hitman
 * @author Timo Hausmann
 * https://github.com/timohausmann/quadtree-js/
 */

/*
 Copyright © 2012 Timo Hausmann

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENthis. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

/* MODIFIED THE MODULE TO WORK WITH ES6 EXPORT */

/*
 * Quadtree Constructor
 * @param Object bounds			bounds with x, y, width, height
 * @param Integer max_objects		(optional) max objects a node can hold before splitting into 4 subnodes (default: 10)
 * @param Integer max_levels		(optional) total max levels inside root Quadtree (default: 4)
 * @param Integer level			(optional) deepth level, required for subnodes
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports.Quadtree = Quadtree;

function Quadtree(bounds, max_objects, max_levels, level) {

	this.max_objects = max_objects || 10;
	this.max_levels = max_levels || 4;

	this.level = level || 0;
	this.bounds = bounds;

	this.objects = [];
	this.object_refs = [];
	this.nodes = [];
}

;

/*
 * Split the node into 4 subnodes
 */
Quadtree.prototype.split = function () {

	var nextLevel = this.level + 1,
	    subWidth = Math.round(this.bounds.width / 2),
	    subHeight = Math.round(this.bounds.height / 2),
	    x = Math.round(this.bounds.x),
	    y = Math.round(this.bounds.y);

	//top right node
	this.nodes[0] = new Quadtree({
		x: x + subWidth,
		y: y,
		width: subWidth,
		height: subHeight
	}, this.max_objects, this.max_levels, nextLevel);

	//top left node
	this.nodes[1] = new Quadtree({
		x: x,
		y: y,
		width: subWidth,
		height: subHeight
	}, this.max_objects, this.max_levels, nextLevel);

	//bottom left node
	this.nodes[2] = new Quadtree({
		x: x,
		y: y + subHeight,
		width: subWidth,
		height: subHeight
	}, this.max_objects, this.max_levels, nextLevel);

	//bottom right node
	this.nodes[3] = new Quadtree({
		x: x + subWidth,
		y: y + subHeight,
		width: subWidth,
		height: subHeight
	}, this.max_objects, this.max_levels, nextLevel);
};

/*
 * Determine the quadtrant for an area in this node
 * @param Object pRect		bounds of the area to be checked, with x, y, width, height
 * @return Integer			index of the subnode (0-3), or -1 if pRect cannot completely fit within a subnode and is part of the parent node
 */
Quadtree.prototype.getIndex = function (pRect) {

	var index = -1,
	    verticalMidpoint = this.bounds.x + this.bounds.width / 2,
	    horizontalMidpoint = this.bounds.y + this.bounds.height / 2,
	   

	//pRect can completely fit within the top quadrants
	topQuadrant = pRect.y < horizontalMidpoint && pRect.y + pRect.height < horizontalMidpoint,
	   

	//pRect can completely fit within the bottom quadrants
	bottomQuadrant = pRect.y > horizontalMidpoint;

	//pRect can completely fit within the left quadrants
	if (pRect.x < verticalMidpoint && pRect.x + pRect.width < verticalMidpoint) {
		if (topQuadrant) {
			index = 1;
		} else if (bottomQuadrant) {
			index = 2;
		}

		//pRect can completely fit within the right quadrants
	} else if (pRect.x > verticalMidpoint) {
			if (topQuadrant) {
				index = 0;
			} else if (bottomQuadrant) {
				index = 3;
			}
		}

	return index;
};

/*
 * Insert an object into the node. If the node
 * exceeds the capacity, it will split and add all
 * objects to their corresponding subnodes.
 * @param Object obj		the object to be added, with x, y, width, height
 */
Quadtree.prototype.insert = function (obj) {

	var i = 0,
	    index;

	//if we have subnodes ...
	if (typeof this.nodes[0] !== 'undefined') {
		index = this.getIndex(obj);

		if (index !== -1) {
			this.nodes[index].insert(obj);
			return;
		}
	}

	this.objects.push(obj);

	if (this.objects.length > this.max_objects && this.level < this.max_levels) {

		//split if we don't already have subnodes
		if (typeof this.nodes[0] === 'undefined') {
			this.split();
		}

		//add all objects to there corresponding subnodes
		while (i < this.objects.length) {

			index = this.getIndex(this.objects[i]);

			if (index !== -1) {
				this.nodes[index].insert(this.objects.splice(i, 1)[0]);
			} else {
				i = i + 1;
			}
		}
	}
};

/*
 * Return all objects that could collide with a given area
 * @param Object pRect		bounds of the area to be checked, with x, y, width, height
 * @Return Array			array with all detected objects
 */
Quadtree.prototype.retrieve = function (pRect) {

	var index = this.getIndex(pRect),
	    returnObjects = this.objects;

	//if we have subnodes ...
	if (typeof this.nodes[0] !== 'undefined') {

		//if pRect fits into a subnode ..
		if (index !== -1) {
			returnObjects = returnObjects.concat(this.nodes[index].retrieve(pRect));

			//if pRect does not fit into a subnode, check it against all subnodes
		} else {
				for (var i = 0; i < this.nodes.length; i = i + 1) {
					returnObjects = returnObjects.concat(this.nodes[i].retrieve(pRect));
				}
			}
	}

	return returnObjects;
};

/*
 * Get all objects stored in the quadtree
 * @return Array 		all objects in the quadtree
 */
Quadtree.prototype.getAll = function () {

	var objects = this.objects;

	for (var i = 0; i < this.nodes.length; i = i + 1) {
		objects = objects.concat(this.nodes[i].getAll());
	}

	return objects;
};

/*
 * Get the node in which a certain object is stored
 * @param Object obj		the object that was added via Quadtree.insert
 * @return Object 			the subnode, or false when not found
 */
Quadtree.prototype.getObjectNode = function (obj) {

	var index;

	//if there are no subnodes, object must be here
	if (!this.nodes.length) {

		return this;
	} else {

		index = this.getIndex(obj);

		//if the object does not fit into a subnode, it must be here
		if (index === -1) {

			return this;

			//if it fits into a subnode, continue deeper search there
		} else {
				var node = this.nodes[index].getObjectNode(obj);
				if (node) return node;
			}
	}

	return false;
};

/*
 * Removes a specific object from the quadtree
 * Does not delete empty subnodes. See cleanup-function
 * @param Object obj		the object that was added via Quadtree.insert
 * @return Number			false, when the object was not found
 */
Quadtree.prototype.removeObject = function (obj) {

	var node = this.getObjectNode(obj),
	    index = node.objects.indexOf(obj);

	if (index === -1) return false;

	node.objects.splice(index, 1);
};

/*
 * Clear the quadtree and delte all objects
 */
Quadtree.prototype.clear = function () {

	this.objects = [];

	if (!this.nodes.length) return;

	for (var i = 0; i < this.nodes.length; i = i + 1) {

		this.nodes[i].clear();
	}

	this.nodes = [];
};

/*
 * Clean up the quadtree
 * Like clear, but objects won't be deleted but re-inserted
 */
Quadtree.prototype.cleanup = function () {

	var objects = this.getAll();

	this.clear();

	for (var i = 0; i < objects.length; i++) {
		this.insert(objects[i]);
	}
};

},{}],186:[function(require,module,exports){
'use strict';

/** Factory where we construct a horizontal hexagon map for test and development purposes
 *
 * @require createjs framework in global namespace
 * @require canvas HTML5-element to work. This is more for node.js
 * @todo Add documentation and refactor (maybe modularize / functionalize) the actual logic */

/* ====== Own module imports ====== */
Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.createMap = createMap;

var _mapCorePixi_Map = require('../map/core/pixi_Map');

var _mapExtensionsHexagonsObjectPixi_Object_terrain_hexa = require('../map/extensions/hexagons/object/pixi_Object_terrain_hexa');

var _mapExtensionsHexagonsObjectPixi_Object_unit_hexa = require('../map/extensions/hexagons/object/pixi_Object_unit_hexa');

var _mapCoreUtilsUtils = require('../map/core/utils/utils');

var _mapCoreUI = require('../map/core/UI');

var _mapUIsDefaultDefaultJs = require("../map/UIs/default/default.js");

var _mapCoreEventlisteners = require('../map/core/eventlisteners');

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
  console.log("============================================");
  var mapData = typeof datas.map === "string" ? JSON.parse(datas.map) : datas.map;
  var typeData = typeof datas.type === "string" ? JSON.parse(datas.type) : datas.type;
  var gameData = typeof datas.game === "string" ? JSON.parse(datas.game) : datas.game;
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
  var dialog_selection = document.getElementById("selectionDialog");
  var defaultUI = new _mapUIsDefaultDefaultJs.UI_default(dialog_selection);
  defaultUI.init();

  /* Initialize UI as singleton */
  (0, _mapCoreUI.UI)(defaultUI, map);

  /* We iterate through the given map data and create objects accordingly */
  //for(let ia = 0; ia < 100; ia++) {
  mapData.layers.forEach(function (layerData) {
    var layerGroup = layerData.group;
    var objManager = map.objectManager;
    var thisLayer;

    try {
      thisLayer = map.addLayer(layerData.name, false, layerData.coord);
      objManager.addLayer(layerGroup, {
        x: 0,
        y: 0,
        width: map.mapSize.x,
        height: map.mapSize.y
      }, {
        objects: 10,
        levels: 6
      });
    } catch (e) {
      console.log("Problem:", layerData.type, e.stack);
    }

    layerData.objectGroups.forEach(function (objectGroup) {
      var spritesheetType = objectGroup.typeImageData;

      if (!spritesheetType) {
        console.log("Error with spritesheetType-data");
        return;
      }

      objectGroup.objects.forEach(function (object) {
        var objTypeData = typeData.objectData[spritesheetType][object.objType];

        if (!objTypeData) {
          console.debug("Bad mapData for type:", spritesheetType, object.objType, object.name);
          throw new Error("Bad mapData for type:", spritesheetType, object.objType, object.name);
        }

        var currentFrame = PIXI.utils.TextureCache[objTypeData.image];
        var objData = {
          typeData: objTypeData,
          activeData: object.data
        };
        var newObject = new functionsInObj[objectGroup.type](object.coord, objData, currentFrame, { radius: gameData.hexagonRadius });
        objManager.addObject(layerGroup, {
          x: newObject.x,
          y: newObject.y,
          width: newObject.width,
          height: newObject.height
        }, newObject);

        thisLayer.addChild(newObject);
      });
    });
  });

  map.moveMap(mapData.startPoint);

  document.getElementById("testFullscreen").addEventListener("click", function () {
    _mapCoreEventlisteners.eventListeners.toggleFullScreen();
  });

  window.map = map;

  return map;
}

},{"../map/UIs/default/default.js":187,"../map/core/UI":190,"../map/core/eventlisteners":191,"../map/core/pixi_Map":195,"../map/core/utils/utils":200,"../map/extensions/hexagons/object/pixi_Object_terrain_hexa":204,"../map/extensions/hexagons/object/pixi_Object_unit_hexa":205}],187:[function(require,module,exports){
/* jshint ignore:createjs */

/** The simplest default UI implementation. Implement UI functionalities for:
 * showSelections
 * highlightSelectedObject
 *
 * @require Handlebars
 * @todo IN PROGRESS, not implemented well yet. Uses chromes built-in modal support only atm. just for the kicks :)
    NEED to at least remove the framework specific things out of this module! */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _layoutTemplates = require('./layout/templates');

var _layoutCSSRules = require('./layout/CSSRules');

var _extensionsHexagonsUtilsCreateHexagon = require('../../extensions/hexagons/utils/createHexagon');

var _styleSheet = {};
var cssClasses = {
  select: "#dialog_select"
};
var $elements = {};
var fadeAnimation = "slow";
var createHighlight;

var UI_default = (function () {
  function UI_default(modal, styles) {
    _classCallCheck(this, UI_default);

    var createdCSS;
    // Add a media (and/or media query) here if you'd like!
    // style.setAttribute("media", "screen")
    // style.setAttribute("media", "only screen and (max-width : 1024px)")
    _styleSheet = _addStyleElement();
    createdCSS = (0, _layoutCSSRules.createCSSRules)(cssClasses);
    _addCSSRulesToScriptTag(_styleSheet, createdCSS);

    this.modal = modal || document.getElementById("dialog_select");
    this.styles = styles || {
      backgroundColor: "#F0F0F0"
    };

    this.closingElements = _DOMElementsToArray(this.modal.getElementsByClassName("modal_close"));
  }

  /** ====== PRIVATE FUNCTIONS ====== */

  _createClass(UI_default, [{
    key: 'showSelections',
    value: function showSelections(map, objects) {
      createHighlight = setupCreateHighlight(map);

      if (map.getEnvironment() === "mobile") {
        _showMobileSelections(objects, this.modal, map.drawOnNextTick.bind(map), map.getMovableLayer());
      } else {
        _showDesktopSelections(objects, this.modal, map.drawOnNextTick.bind(map), map.getMovableLayer());
      }
    }
  }, {
    key: 'highlightSelectedObject',
    value: function highlightSelectedObject(map, object) {
      createHighlight = setupCreateHighlight(map);

      if (object.highlightable) {
        return _highlightSelectedObject(object, map.getMovableLayer());
      }
    }
  }, {
    key: 'init',
    value: function init() {
      var self = this;

      this.closingElements.forEach(function (element) {
        /**
         * @todo change this modal system totally. As it is based on HTML 5.1 modal specifications atm. for easy testing
         * Maybe create a class that abstracts the modal behind it or then just use this? */
        if (self.modal && self.modal.close) {
          _activateClosingElement(element, self.modal.close.bind(self.modal));
        }
      });
    }
  }]);

  return UI_default;
})();

exports.UI_default = UI_default;
function _activateClosingElement(element, closeCB) {
  element.addEventListener("click", function (e) {
    closeCB();
  });
}
function _DOMElementsToArray(elements) {
  if (!elements) {
    throw new Error(this.constructor + " function needs elements");
  }

  var length = elements.length;
  var elementArray = [];

  for (var i = 0; i < length; i++) {
    elementArray.push(elements[i]);
  }

  return elementArray;
}
function _addCSSRulesToScriptTag(sheet, rules) {
  sheet.insertRule(rules, 0);
}
function _addStyleElement() {
  var _styleElement = document.createElement("style");
  // WebKit hack :(
  _styleElement.appendChild(document.createTextNode(""));
  document.head.appendChild(_styleElement);

  return _styleElement.sheet;
}
function _showModal(modalElem, cssClasses) {
  /** @todo make sure / check, that this get added only once */
  modalElem.classList.add(cssClasses.select);
  /* Would be HTML 5.1 standard, but that might be a long way
    this.modal.show();*/
}
function _get$Element(which) {
  /* Set the jQuery element to collection only once */
  if (!$elements[which]) {
    var $element = $(cssClasses[which]);
    $elements[which] = $element;
  }

  return $elements[which];
}
function _showDesktopSelections(objects, modal, updateCB, UILayer, map) {
  var hightlightableObjects = _selectionsInit(UILayer, objects);

  if (objects && hightlightableObjects.length > 1) {
    _get$Element("select").fadeOut(fadeAnimation, function () {
      modal.innerHTML = _layoutTemplates.templates.multiSelection({
        title: "Objects",
        objects: objects
      });

      _showModal(modal, cssClasses);

      console.log(objects);

      _get$Element("select").fadeIn(fadeAnimation);
    });
  } else if (hightlightableObjects.length === 1) {
    _get$Element("select").fadeOut(fadeAnimation, function () {
      modal.innerHTML = _layoutTemplates.templates.singleSelection({
        title: "Selected",
        object: {
          name: hightlightableObjects[0].data.typeData.name
        }
      });

      _showModal(modal, cssClasses);
      _highlightSelectedObject(hightlightableObjects[0], UILayer, map);
      updateCB();

      console.log(hightlightableObjects);

      _get$Element("select").fadeIn(fadeAnimation);
    });
  } else {
    _get$Element("select").fadeOut(fadeAnimation, function () {
      UILayer.emptyUIObjects();
      updateCB();
      console.log("Error occured selecting the objects on this coordinates! Nothing found");
    });
  }
}
function _showMobileSelections(objects, modal, updateCB, UILayer) {
  var hightlightableObjects = _selectionsInit(UILayer, objects);

  if (objects && objects.length > 1) {
    _get$Element("select").fadeOut(fadeAnimation, function () {
      modal.innerHTML = _layoutTemplates.templates.multiSelection({
        title: "Objects",
        objects: objects
      });

      _showModal(modal, cssClasses);

      console.log(objects);

      _get$Element("select").fadeIn(fadeAnimation);
    });
  } else if (hightlightableObjects.length === 1) {
    _get$Element("select").fadeOut(fadeAnimation, function () {
      modal.innerHTML = _layoutTemplates.templates.singleSelection({
        title: "Selected",
        object: {
          name: hightlightableObjects[0].data.typeData.name
        }
      });

      _showModal(modal, cssClasses);
      _highlightSelectedObject(hightlightableObjects[0], UILayer, map);
      updateCB();

      console.log(hightlightableObjects);

      _get$Element("select").fadeIn(fadeAnimation);
    });
  } else {
    _get$Element("select").fadeOut(fadeAnimation, function () {
      UILayer.emptyUIObjects();
      updateCB();
      console.log("Error occured selecting the objects on this coordinates! Nothing found");
    });
  }
}
function _highlightSelectedObject(object, movableLayer, map) {
  var clonedObject = object.clone();

  createHighlight(clonedObject, movableLayer);
}
function _filterObjectsForHighlighting(objects) {
  var newObjects = objects;

  if (objects && objects.length > 1) {
    newObjects = objects.filter(function (obj) {
      return obj.highlightable === true ? true : false;
    });
  }

  return newObjects;
}
function _selectionsInit(UILayer, objects) {
  var highlightObjects = _filterObjectsForHighlighting(objects);

  if (highlightObjects.length < 1) {
    return false;
  }

  UILayer.emptyUIObjects();
  UILayer.addUIObjects(highlightObjects);

  return highlightObjects;
}

/* @todo This whole damn system and logic needs to be changed and moved elsewhere, stupid stupid stupid atm. */
function setupCreateHighlight(map) {
  return function createHighlight(object, movableLayer) {
    var radius = 47;
    var container = new map.createLayer();
    var circle;
    var easelCircleCoords = {
      x: Number(object.x),
      y: Number(object.y)
    };

    if (typeof createjs != 'undefined') {
      circle = (0, _extensionsHexagonsUtilsCreateHexagon.createVisibleHexagon)({ x: 0, y: 0 }, radius, "#F0F0F0");
      circle.x = easelCircleCoords.x - 1;
      circle.y = easelCircleCoords.y + 12;
    } else {
      //let positionOnMovable = object.toLocal(new PIXI.Point(0,0), movableLayer);
      var positionOnMovable = new PIXI.Point(0, 0);
      circle = createPixiCircle(object, radius, positionOnMovable);
    }

    circle.alpha = 0.5;
    container.addChild(circle, object);

    movableLayer.addUIObjects(container);
  };
}

function createPixiCircle(object, radius, positionOnMovable) {
  var circle = new PIXI.Graphics();
  circle.lineStyle(2, 0xFF00FF); //(thickness, color)
  circle.drawCircle(0, 0, radius); //(x,y,radius)
  circle.endFill();

  circle.x = Number(positionOnMovable.x + object.anchor.x);
  circle.y = Number(positionOnMovable.y + object.anchor.y);

  return circle;
}

function createEaseljsCircle(object, radius) {
  var g = new createjs.Graphics();
  var highlightCircle;

  g.setStrokeStyle(1);
  g.beginStroke(createjs.Graphics.getRGB(0, 0, 0));
  g.beginFill(createjs.Graphics.getRGB(255, 200, 200, 0.2));
  g.drawCircle(0, 0, radius);

  highlightCircle = new createjs.Shape(g);

  return highlightCircle;
}

},{"../../extensions/hexagons/utils/createHexagon":207,"./layout/CSSRules":188,"./layout/templates":189}],188:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createCSSRules = createCSSRules;

function createCSSRules(classNames) {
  var dialogOptions = arguments.length <= 1 || arguments[1] === undefined ? { zIndex: 9999, opacity: 0.9 } : arguments[1];

  return "\n    " + classNames.select + " {\n      z-index: " + dialogOptions.zIndex + ";\n      opacity: " + dialogOptions.opacity + ";\n      position: fixed;\n      left: 0px;\n      bottom: 0px;\n      background-color: brown;\n      border: 1px solid rgb(255, 186, 148);;\n      border-bottom: 0px;\n      padding:15px;\n      margin-left:10px;\n    }";
}

},{}],189:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var templates = {
  multiSelection: Handlebars.compile("\n    <span style='font-size:200%;display:block;margin-bottom:20px;'>\n      {{title}}\n    </span>\n    <ul>\n      {{#each objects}}\n      <li>\n        {{this.data.typeData.name}}\n      </li>\n      {{/each}}\n    </ul>"),
  singleSelection: Handlebars.compile("\n    <span style='font-size:200%;display:block;margin-bottom:20px;'>\n      {{title}}\n    </span>\n    <ul>\n      <li>\n        {{object.name}}\n      </li>\n    </ul>")
};
exports.templates = templates;

},{}],190:[function(require,module,exports){
/** Main class for showing UI on the map. Like unit selections and such. Has nothing to do with showing off-map data.
 * Good examples for what this shows are: selected units-list, selection highlight (like a circle on the selected unit) and
 * bringing the unit on top in the map.
 *
 * @param {Module} givenUITheme the module that will be used for the UI theme
 * @param {Map} givenMap Map instance that is used
 * @return UI module
*/

'use strict';

/** The abstract UI module for the core map functionality. This is used by defining UI Themes that implement this
 * core UI module.
 * Default methods to use in UI are:
 * showSelections and highlightSelectedObject. More methods can be extended to UI with plugins
 *
 * @todo Not implemented fully yet and probably need refactoring */
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UI = UI;
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

},{}],191:[function(require,module,exports){
'use strict';

/* global Hammer, createjs */

/**
 * Houses the default eventlisteners used in the map. When plugins are added to the map this class can be used for
 * the eventlistener management. This way all the eventlisteners are in the same object, conveniently.
 *
 * @require Browser that support pointer events or Pointer events polyfill, such as: https://github.com/jquery/PEP
 * @require Hammer.js for touch events*/

Object.defineProperty(exports, "__esModule", {
  value: true
});
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
  return typeof Hammer != 'undefined';
}

},{}],192:[function(require,module,exports){
'use strict';

/** The core plugin for the 2D map engine. Handles moving the map by dragging the map.
 * Core plugins can always be overwrote if needed
 *
 * @require Browser that support pointer events or Pointer events polyfill, such as: https://github.com/jquery/PEP
 * @todo See if this plugin need refactoring and more documentation */

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _eventlisteners = require('../eventlisteners');

var _utilsUtils = require('../utils/utils');

var map_drag = (function map_drag() {
  /* Function for setting and getting the mouse offset. Private functions declared bottom */
  var offsetCoords = _offsetCoords();

  /* =====================
     MODULE API (in scope)
     ===================== */
  var scope = {};
  scope.pluginName = "map_drag";

  /** Required init functions for the plugin
  * @param {Map object} mapObj - the Map class object */
  scope.init = function (map) {
    if (map.getEnvironment() === "mobile") {
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
        map.canvas.addEventListener("mousemove", _dragListener);
        map.canvas.addEventListener("mouseup", _mouseupListener);
      }
      function _removeDragListeners() {
        map.canvas.removeEventListener("mousemove", _dragListener);
        map.canvas.removeEventListener("mouseup", _mouseupListener);
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

},{"../eventlisteners":191,"../utils/utils":200}],193:[function(require,module,exports){
'use strict';

/** Terrain tile like desert or mountain, non-movable and cacheable. Normally, but not necessarily, these are
 * inherited, depending on the map type. For example you might want to add some click area for these */

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _pixi_Object = require('../pixi_Object');

var Object_sprite_terrain = (function (_Object_sprite) {
  _inherits(Object_sprite_terrain, _Object_sprite);

  function Object_sprite_terrain(coords, data, currFrameNumber, throwShadowOptions) {
    _classCallCheck(this, Object_sprite_terrain);

    _get(Object.getPrototypeOf(Object_sprite_terrain.prototype), 'constructor', this).call(this, coords, data, currFrameNumber, throwShadowOptions);

    this.name = "DefaultTerrainObject";
    this.type = "terrain";
    this.highlightable = false;
    this.selectable = false;
  }

  return Object_sprite_terrain;
})(_pixi_Object.Object_sprite);

exports.Object_sprite_terrain = Object_sprite_terrain;

},{"../pixi_Object":197}],194:[function(require,module,exports){
'use strict';

/** Map unit like infantry or worker, usually something with actions or movable. Normally, but not necessarily, these are
 * inherited, depending on the map type. For example you might want to add some click area for these */

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _pixi_Object = require('../pixi_Object');

var Object_sprite_unit = (function (_Object_sprite) {
  _inherits(Object_sprite_unit, _Object_sprite);

  function Object_sprite_unit(coords, data, currFrameNumber, throwShadowOptions) {
    _classCallCheck(this, Object_sprite_unit);

    _get(Object.getPrototypeOf(Object_sprite_unit.prototype), 'constructor', this).call(this, coords, data, currFrameNumber, throwShadowOptions);

    this.name = "DefaultUnitObjects";
    this.type = "unit";
    this.highlightable = true;
    this.selectable = true;
    this.actions = {
      move: [],
      attack: []
    };

    this.throwShadow = true;
  }

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

},{"../pixi_Object":197}],195:[function(require,module,exports){
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

/* ====== Own module imports ====== */
Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _pixi_Map_layer = require('./pixi_Map_layer');

var _utilsUtils = require('./utils/utils');

var _eventlisteners = require('./eventlisteners');

var _pixi_ObjectManager = require('./pixi_ObjectManager');

var _drawMapOnNextTick = false;
var eventlisteners, _staticLayer, _movableLayer, _renderer;

var Map = (function () {
  /**
   * @param {DOM Canvas element} canvas - Canvas used by the map
   * @param {Object} options - different options for the map to be given. Format:
   * { bounds: { width: Number, height: Number}, renderer: {} }
   * @return Map instance
     @todo, set default values for given and required options */

  function Map(canvas) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? { bounds: {}, renderer: {} } : arguments[1];

    _classCallCheck(this, Map);

    if (!canvas) {
      throw new Error(this.constructor.name + " needs canvas!");
    }
    if (typeof canvas === "string") {
      canvas = document.querySelector(canvas);
    } else {
      canvas = canvas;
    }

    _renderer = PIXI.autoDetectRenderer(options.bounds.width, options.bounds.height, options.renderer);
    /* We handle all the events ourselves through addEventListeners-method on canvas, so destroy pixi native method */
    _renderer.plugins.interaction.destroy();
    canvas.parentElement.replaceChild(_renderer.view, canvas);
    this.canvas = _renderer.view;

    _staticLayer = new _pixi_Map_layer.Map_layer("staticLayer", options.subContainers, options.startCoord, _renderer);
    _movableLayer = new _pixi_Map_layer.Map_layer("movableLayer", options.subContainers, options.startCoord);
    _staticLayer.addChild(_movableLayer);
    this.plugins = new Set();
    this.mapSize = options.mapSize || { x: 0, y: 0 };
    this.eventCBs = {
      fullSize: _utilsUtils.resizeUtils.setToFullSize(this.canvas.getContext("2d")),
      fullscreen: _utilsUtils.resizeUtils.toggleFullScreen,
      select: null,
      drag: null,
      zoom: null
    };
    this.isFullsize = false;
    this._mapInMove = false;
    this.objectManager = new _pixi_ObjectManager.ObjectManager(_renderer); // Fill this with quadtrees or such

    this.environment = _utilsUtils.environmentDetection.isMobile() ? "mobile" : "desktop";
  }

  /** ===== Private functions ===== */
  /* This handles the default drawing of the map, so that map always updates when drawOnNextTick === true. This tick
  callback is always set and should not be removed or overruled */

  /** initialization method
   * @param [Array] plugins - Plugins to be activated for the map. Normally you should give the plugins here instead of
   * separately passing them to activatePlugins method
   * @param {x: ? y:?} coord - Starting coordinates for the map
   * @param {Function} tickCB - callback function for tick. Tick callback is initiated in every frame. So map draws happen
   * during ticks
   * @return the current map instance */

  _createClass(Map, [{
    key: 'init',
    value: function init(plugins, coord, tickCB) {
      this.setFullsize();

      eventlisteners = (0, _eventlisteners.eventListeners)(this, this.canvas);

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

    /** The correct way to update / redraw the map. Check happens at every tick and thus in every frame.
     * @return the current map instance */
  }, {
    key: 'drawOnNextTick',
    value: function drawOnNextTick() {
      _drawMapOnNextTick = true;

      return this;
    }

    /** The correct way to update / redraw the map. Check happens at every tick and thus in every frame.
     * @return the current map instance */
  }, {
    key: 'getLayersWithAttributes',
    value: function getLayersWithAttributes(attribute, value) {
      return _staticLayer.children[0].children.filter(function (layer) {
        return layer[attribute] === value;
      });
    }
  }, {
    key: 'createLayer',
    value: function createLayer(name, subContainers, coord) {
      var layer = new _pixi_Map_layer.Map_layer(name, subContainers, coord);

      return layer;
    }

    /** All parameters are passed to Map_layer constructor
     * @return created Map_layer instance */
  }, {
    key: 'addLayer',
    value: function addLayer(name, subContainers, coord) {
      var layer = new _pixi_Map_layer.Map_layer(name, subContainers, coord);

      _movableLayer.addChild(layer);

      return layer;
    }

    /**
     * @param {Map_layer} layer - the layer object to be removed */
  }, {
    key: 'removeLayer',
    value: function removeLayer(layer) {
      _movableLayer.removeChild(layer);

      return layer;
    }

    /** @return layer with the passed layer name */
  }, {
    key: 'getLayerNamed',
    value: function getLayerNamed(name) {
      return _movableLayer.getChildNamed(name);
    }

    /**
     * @param {x: Number, y: Number} coord - The amount of x and y coordinates we want the map to move. I.e. { x: 5, y: 0 }
     * with this we want the map to move horizontally 5 pizels and vertically stay at the same position.
     * @return this map instance */
  }, {
    key: 'moveMap',
    value: function moveMap(coordinates) {
      var realCoordinates = {
        x: coordinates.x / _staticLayer.getScale(),
        y: coordinates.y / _staticLayer.getScale()
      };
      _movableLayer.move(realCoordinates);
      this.drawOnNextTick();

      return this;
    }

    /** Cache the map. This provides significant performance boost, when used correctly. cacheMap iterates through all the
     * layer on the map and caches the ones that return true from getCacheEnabled-method.
     * @param {x: Number, y: Number} coord - The amount of x and y coordinates we want the map to move. I.e. { x: 5, y: 0 }
     * with this we want the map to move horizontally 5 pizels and vertically stay at the same position.
     * @return this map instance */
  }, {
    key: 'cacheMap',
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

    /** Resize the canvas to fill the whole browser area. Uses this.eventCBs.fullsize as callback, so when you need to overwrite
    the eventlistener callback use this.eventCBs */
  }, {
    key: 'toggleFullSize',
    value: function toggleFullSize() {
      eventlisteners.toggleFullSizeListener();
    }

    /** Toggles fullscreen mode. Uses this.eventCBs.fullscreen as callback, so when you need to overwrite
    the eventlistener callback use this.eventCBs */
  }, {
    key: 'toggleFullScreen',
    value: function toggleFullScreen() {
      eventlisteners.toggleFullScreen();
    }

    /** Activate plugins for the map. Plugins need .pluginName property and .init-method
    @param [Array] pluginsArray - Array that consists of the plugin modules */
  }, {
    key: 'activatePlugins',
    value: function activatePlugins() {
      var _this = this;

      var pluginsArray = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

      var currentPluginNameForErrors;

      try {
        pluginsArray.forEach(function (plugin) {
          if (!plugin || !plugin.pluginName) {
            throw new Error("plugin or plugin.pluginName missing");
          }
          currentPluginNameForErrors = plugin.pluginName;

          if (_this.plugins.add(plugin)) {
            plugin.init(_this);
          }
        });
      } catch (e) {
        console.log("An error initializing plugin " + currentPluginNameForErrors, e);
      }

      return this;
    }

    /** getter and setter for detecting if map is moved and setting the maps status as moved or not moved */
  }, {
    key: 'mapMoved',
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
    key: 'setFullsize',
    value: function setFullsize() {
      if (this.isFullsize) {
        setFullsizedMap(_renderer);

        window.addEventListener("resize", function () {
          setFullsizedMap(_renderer);
        });
      }

      this.isFullsize = true;
    }
  }, {
    key: 'setEnvironment',
    value: function setEnvironment(env) {
      this.environment = env;
    }

    /** @return { x: Number, y: Number }, current coordinates for the map */
  }, {
    key: 'getMapPosition',
    value: function getMapPosition() {
      return {
        x: _movableLayer.x,
        y: _movableLayer.y
      };
    }
  }, {
    key: 'getEnvironment',
    value: function getEnvironment() {
      return this.environment;
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
    key: 'getRenderer',
    value: function getRenderer() {
      return _renderer;
    }
  }, {
    key: 'getStage',
    value: function getStage() {
      return _staticLayer;
    }
  }, {
    key: 'getSize',
    value: function getSize() {
      return this.mapSize;
    }

    /*************************************
     ******* APIS THROUGH PLUGINS ********
     ************************************/
  }, {
    key: 'zoomIn',
    value: function zoomIn() {
      return "notImplementedYet. Activate with plugin";
    }
  }, {
    key: 'zoomOut',
    value: function zoomOut() {
      return "notImplementedYet. Activate with plugin";
    }

    /** Selection of objects on the map. For more efficient solution, we implement these APIs thorugh plugin.
     * Default uses quadtree
     * @param { x: Number, y: Number } coordinates to search from
     * @param { String } type type of the objects to search for */
  }, {
    key: 'addObjectsForSelection',
    value: function addObjectsForSelection(coordinates, type, object) {
      return "notImplementedYet";
    }
  }, {
    key: 'removeObjectsForSelection',
    value: function removeObjectsForSelection(coordinates, type, object) {
      return "notImplementedYet";
    }
  }, {
    key: 'getObjectsUnderPoint',
    value: function getObjectsUnderPoint(coordinates, type) {
      return "notImplementedYet"; /* Implemented with a plugin */
    }
  }, {
    key: 'getObjectsUnderShape',
    value: function getObjectsUnderShape(coordinates, shape, type) {
      return "notImplementedYet"; /* Can be implemented if needed. We need more sophisticated quadtree for this */
    }
  }]);

  return Map;
})();

exports.Map = Map;
function _defaultTick(map, ticker) {
  ticker.add(function (time) {
    if (_drawMapOnNextTick === true) {
      _renderer.render(_staticLayer);
    }
    _drawMapOnNextTick = false;
  });
}

function setFullsizedMap(renderer) {
  renderer.view.style.position = "absolute";
  renderer.view.style.display = "block";
  renderer.autoResize = true;
  renderer.resize(window.innerWidth, window.innerHeight);
}

},{"./eventlisteners":191,"./pixi_Map_layer":196,"./pixi_ObjectManager":198,"./utils/utils":200}],196:[function(require,module,exports){
'use strict';

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

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _UIObjects = [];

/* ===== EXPORT ===== */

var Map_layer = (function (_PIXI$Container) {
  _inherits(Map_layer, _PIXI$Container);

  /**
   * @param {String} name layer property name, used for identifiying the layer, usefull in debugging, but used also
   * otherwise too!
   * @param {Object} subContainers To be implemented. The data which we use to divide the container to subContainers
   * e.g. for more efficient accessibility of objects based on coordinates.
   * @param {x: Number, y: Number} coord starting coords of layer. Relative to parent map layer.
  */

  function Map_layer(name, subContainers, coord, renderer) {
    _classCallCheck(this, Map_layer);

    _get(Object.getPrototypeOf(Map_layer.prototype), "constructor", this).call(this);

    this.x = coord ? coord.x || 0 : 0;
    this.y = coord ? coord.y || 0 : 0;
    this.renderer = renderer;
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

  /** setter and getter
   * @param {Boolean} status If provided sets the caching status otherwise returns the current status */

  _createClass(Map_layer, [{
    key: "cacheEnabled",
    value: function cacheEnabled(status) {
      if (status !== undefined) {
        this._cacheEnabled = status;
      }

      return this._cacheEnabled;
    }

    /** Move layer
     * @param {x: Number, y: Number} coordinates The amount of x and y coordinates we want the layer to move. I.e.
     { x: 5, y: 0 }
     @return this layer instance */
  }, {
    key: "move",
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
  _inherits(Map_subLayer, _PIXI$ParticleContainer);

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

  /** setter and getter
   * @param {Boolean} status If provided sets the caching status otherwise returns the current status */

  _createClass(Map_subLayer, [{
    key: "cacheEnabled",
    value: function cacheEnabled(status) {
      if (status !== undefined) {
        this._cacheEnabled = status;
      }

      return this._cacheEnabled;
    }

    /** Move layer
     * @param {x: Number, y: Number} coordinates The amount of x and y coordinates we want the layer to move. I.e.
     { x: 5, y: 0 }
     @return this layer instance */
  }, {
    key: "move",
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

},{}],197:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Object_sprite = (function (_PIXI$Sprite) {
  _inherits(Object_sprite, _PIXI$Sprite);

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

  /** Drawing the object with createjs-methods
   * @param {Number} x coordinate x
   * @param {Number} y coordinate y
   * @return this object instance */

  _createClass(Object_sprite, [{
    key: "innerDraw",
    value: function innerDraw(x, y) {
      this.fromFrame(this.currentFrame);
      this.x = x;
      this.y = y;

      return this;
    }

    /** Draws new frame to animate or such
     * @param {Number} x coordinate x
     * @param {Number} y coordinate y
     * @param {Number} newFrameNumber New frame number to animate to
     * @return this object instance */
  }, {
    key: "drawNewFrame",
    value: function drawNewFrame(x, y, newFrame) {
      this.currentFrame = newFrame;

      return this.innerDraw(x, y);
    }
  }, {
    key: "setupShadow",
    value: function setupShadow() {
      var options = arguments.length <= 0 || arguments[0] === undefined ? { color: "#000000", offsetX: 5, offsetY: 5, blur: 10 } : arguments[0];

      if (this.throwShadow === true) {
        console.warn("NO SHADOW FUNCTION SET!");
      }
    }
  }, {
    key: "localToLocal",
    value: function localToLocal(x, y, target) {
      var globalCoords = this.toGlobal({ x: x, y: y });
      var targetLocalCoords = target.toLocal({ x: globalCoords.x, y: globalCoords.y });

      return targetLocalCoords;
    }
  }, {
    key: "clone",
    value: function clone() {
      var newSprite = new PIXI.Sprite();
      var firstParent = _findFirstParent(this);
      var renderer = firstParent.renderer;

      newSprite.texture = this.generateTexture(renderer);

      return newSprite;
    }
  }]);

  return Object_sprite;
})(PIXI.Sprite);

exports.Object_sprite = Object_sprite;

function _findFirstParent(thisObj) {
  var parentObj = {};

  if (thisObj.parent) {
    parentObj = _findFirstParent(thisObj.parent);
  } else {
    return thisObj;
  }

  return parentObj;
}

},{}],198:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _utilsQuadtree = require('./utils/Quadtree');

var ObjectManager = (function () {
  function ObjectManager(hitDetector) {
    _classCallCheck(this, ObjectManager);

    if (!hitDetector) {
      throw new Error("Requires hit detector as parameter!");
    }
    this.quadtrees = {};
    this.hitDetector = new PIXI.interaction.InteractionManager(hitDetector);
  }

  _createClass(ObjectManager, [{
    key: "retrieve",
    value: function retrieve(type, coords, size) {
      var _this = this;

      var quadtreeObjs, foundObjs, isHit;

      quadtreeObjs = this.quadtrees[type].retrieve(coords, size);
      foundObjs = quadtreeObjs.filter(function (obj) {
        return _this.hitTest(obj, coords);
      });

      return foundObjs;
    }
  }, {
    key: "addObject",
    value: function addObject(layerName, hitArea, obj) {
      if (!this.quadtrees[layerName]) {
        throw new Error("Could not add object to objectManager layer, layer not found! (" + layerName + ")");
      }

      return this.quadtrees[layerName].add({
        x: hitArea.x,
        y: hitArea.y
      }, {
        width: hitArea.width,
        height: hitArea.height
      }, obj);
    }
  }, {
    key: "addLayer",
    value: function addLayer(name, area, extra) {
      this.quadtrees[name] = new _utilsQuadtree.Quadtree({
        x: area.x,
        y: area.y,
        width: area.width,
        height: area.height
      }, {
        objects: extra.objects || 10,
        levels: extra.levels || 5
      });

      return this.quadtrees[name];
    }
  }, {
    key: "getLayers",
    value: function getLayers() {
      var _this2 = this;

      return Object.keys(this.quadtrees).map(function (layerName) {
        return {
          name: layerName,
          data: _this2.quadtrees[layerName]
        };
      });
    }
  }, {
    key: "hitTest",
    value: function hitTest(obj, coordinates, offsetCoords) {
      return "need to be implemented by another module";
    }
  }]);

  return ObjectManager;
})();

exports.ObjectManager = ObjectManager;

},{"./utils/Quadtree":199}],199:[function(require,module,exports){
/** @require Quadtree-js. Though this base library can be changed easily */

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _assetsLibQuadtreeJsQuadtreeJsHitman = require("../../../../assets/lib/quadtree-js/quadtree-js-hitman");

var Quadtree = (function () {
  function Quadtree(options, max) {
    _classCallCheck(this, Quadtree);

    var max_objects = max.objects;
    var max_levels = max.levels;

    this.quadtree = new _assetsLibQuadtreeJsQuadtreeJsHitman.Quadtree(options, max_objects, max_levels);
  }

  _createClass(Quadtree, [{
    key: "add",
    value: function add(coords, size, data) {
      var objToAdd = _creteQuadtreeObject(coords, size, data);

      this.quadtree.insert(objToAdd);
    }
  }, {
    key: "remove",
    value: function remove(coords, size, data, refresh) {
      var objToRemove = _creteQuadtreeObject(coords, size, data);

      this.quadtree.removeObject(objToRemove);
      refresh && this.quadtree.cleanup();
    }
  }, {
    key: "retrieve",
    value: function retrieve(coords, size) {
      var hitDimensions = {
        x: coords.x,
        y: coords.y,
        width: size ? size.width : 0,
        height: size ? size.height : 0
      };
      var objects = [];

      objects = this.quadtree.retrieve(hitDimensions).map(function (object) {
        return object.data;
      });

      return objects;
    }
  }, {
    key: "move",
    value: function move(coords, size, data, to) {
      var foundObject = this.findObject(coords, size, data);

      if (foundObject) {
        this.quadtree.removeObject(foundObject);
        foundObject.x = to.x;
        foundObject.y = to.y;
        this.quadtree.insert(foundObject);
        this.refreshAll();
        return true;
      }

      return false;
    }
  }, {
    key: "refreshAll",
    value: function refreshAll() {
      this.quadtree.cleanup();
    }
  }, {
    key: "findObject",
    value: function findObject(coords, size, data, onlyData) {
      var foundObject = this.retrieve(coords, size).filter(function (object) {
        return object.data === data ? true : false;
      });

      return foundObject;
    }
  }]);

  return Quadtree;
})();

exports.Quadtree = Quadtree;

function _creteQuadtreeObject(coords, size, data) {
  if (coords === undefined) coords = { x: undefined, y: undefined };
  if (size === undefined) size = { width: 0, height: 0 };

  var objToAdd = coords;

  if (coords.x === undefined && coords.y === undefined) {
    throw new Error("_createQuadtreeObject requires x and y coordinates as parameters");
  }
  objToAdd.width = size.width;
  objToAdd.height = size.height;
  objToAdd.data = data;

  return objToAdd;
}

},{"../../../../assets/lib/quadtree-js/quadtree-js-hitman":185}],200:[function(require,module,exports){
'use strict';

/** The core utils for the 2D map engine. */

Object.defineProperty(exports, "__esModule", {
  value: true
});
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
      x: e.offsetX,
      y: e.offsetY
    };
  };
  scope.eventMouseCoords = function (e) {
    var pos = {
      x: 0,
      y: 0
    };

    if (!e) {
      e = window.event;
    }
    if (e.pageX || e.pageY) {
      pos.x = e.pageX;
      pos.y = e.pageY;
    } else if (e.clientX || e.clientY) {
      pos.x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
      pos.y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }
    // posx and posy contain the mouse position relative to the document
    // Do something with this information
    return pos;
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
    var screenSize = screen.width <= 640 || window.matchMedia && window.matchMedia('only screen and (max-width: 640px)').matches;
    var features = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;

    return features && screenSize;
  };
  /** modified code from http://detectmobilebrowsers.com/ */
  scope.isMobile_detectUserAgent = function () {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;

    return (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(userAgent.substr(0, 4))
    );
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

},{}],201:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

/** The core plugin for the 2D map engine. Handles zooming for the map. Core plugins can always be overwrote if needed */

/** @todo Change the map move after zooming to be mouse based or such. Now it is based on the map corners coordinates */

/** ===== OWN imports ===== */

var _utilsUtilsJs = require("../utils/utils.js");

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
  scope.pluginName = "map_zoom";

  /** Required init functions for the plugin
  * @param {Map object} mapObj - the Map class object */
  scope.init = function (map) {
    map.setPrototype("zoomIn", zoomIn);
    map.setPrototype("zoomOut", zoomOut);
    /* @todo think through should these be in map.prototype? But zoomLimit and modifier need to be setable in creation,
    init or later with setters */
    map.setPrototype("setZoomLimits", setZoomLimits);
    map.setPrototype("setZoomModifier", setZoomModifier);

    if (map.getEnvironment() === "mobile") {
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
      throw new Error("Wrong zoom modifier! (needs to be >0 and <=0.5, given:" + amount);
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
          alert("STOP");
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
        console.log("Error! ", e);
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

},{"../eventlisteners":191,"../utils/utils.js":200}],202:[function(require,module,exports){
'use strict';

/**
 * @require Browser that support pointer events or Pointer events polyfill, such as: https://github.com/jquery/PEP */

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.setupHexagonClick = setupHexagonClick;

var _coreEventlisteners = require('../../../core/eventlisteners');

var _coreUtilsUtils = require('../../../core/utils/utils');

/* eventlisteners is a singleton, so we might as well declare it here */
var eventlisteners;

function setupHexagonClick(map, callback) {
  /* Singleton should have been instantiated before, we only retrieve it with 0 params! */
  eventlisteners = (0, _coreEventlisteners.eventListeners)();

  if (map.getEnvironment() === "mobile") {
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

      objects = map.getObjectsUnderPoint(globalCoords, "units");

      if (objects && objects.length > 0) {
        callback(objects);
      }
    };
  }
}

function onMouseUp(map, callback) {
  map.canvas.addEventListener("mouseup", retrieveClickData);

  function retrieveClickData(e) {
    if (map.mapMoved()) {
      map.canvas.removeEventListener("mouseup", retrieveClickData);
      return false;
    }

    var globalCoords = _coreUtilsUtils.mouseUtils.getEventCoordsOnPage(e);
    var objects, leveledObjects;

    objects = map.getObjectsUnderPoint(globalCoords, "units");

    leveledObjects = Object.keys(objects).map(function (objGroup) {
      return objects[objGroup];
    });
    if (leveledObjects && leveledObjects.length > 0) {
      var merged = [];

      callback(merged.concat.apply(merged, leveledObjects));
    }

    map.canvas.removeEventListener("mouseup", retrieveClickData);
  }
}

},{"../../../core/eventlisteners":191,"../../../core/utils/utils":200}],203:[function(require,module,exports){
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
      throw new Error("Need radius!");
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
    /* x and y are reversed, since this is horizontal hexagon and calculations are for vertical */
    shape = (0, _utilsPixi_createHexagon.createHexagon)(radius);
  }

  return shape;
}

},{"../utils/hexagonMath":208,"../utils/pixi_createHexagon":209}],204:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _pixi_Object_hexa = require('./pixi_Object_hexa');

var _coreObjectsPixi_Object_sprite_terrain = require('../../../core/objects/pixi_Object_sprite_terrain');

var Object_terrain = (function (_Object_sprite_terrain) {
  _inherits(Object_terrain, _Object_sprite_terrain);

  function Object_terrain(coords, data, currentFrameNumber) {
    if (coords === undefined) coords = { x: 0, y: 0 };
    var extra = arguments.length <= 3 || arguments[3] === undefined ? { radius: 0 } : arguments[3];

    _classCallCheck(this, Object_terrain);

    _get(Object.getPrototypeOf(Object_terrain.prototype), 'constructor', this).call(this, coords, data, currentFrameNumber);

    this.name = "DefaultTerrainObject_hexa";

    _pixi_Object_hexa.object_sprite_hexa.build.call(this, extra.radius);
  }

  return Object_terrain;
})(_coreObjectsPixi_Object_sprite_terrain.Object_sprite_terrain);

exports.Object_terrain = Object_terrain;

},{"../../../core/objects/pixi_Object_sprite_terrain":193,"./pixi_Object_hexa":203}],205:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _pixi_Object_hexa = require('./pixi_Object_hexa');

var _coreObjectsPixi_Object_sprite_unit = require('../../../core/objects/pixi_Object_sprite_unit');

var Object_unit = (function (_Object_sprite_unit) {
  _inherits(Object_unit, _Object_sprite_unit);

  function Object_unit(coords, data, currentFrameNumber) {
    if (coords === undefined) coords = { x: 0, y: 0 };
    var extra = arguments.length <= 3 || arguments[3] === undefined ? { radius: 0 } : arguments[3];

    _classCallCheck(this, Object_unit);

    _get(Object.getPrototypeOf(Object_unit.prototype), 'constructor', this).call(this, coords, data, currentFrameNumber);

    this.name = "DefaultUnitObjects_hexa";

    _pixi_Object_hexa.object_sprite_hexa.build.call(this, extra.radius);
  }

  return Object_unit;
})(_coreObjectsPixi_Object_sprite_unit.Object_sprite_unit);

exports.Object_unit = Object_unit;

},{"../../../core/objects/pixi_Object_sprite_unit":194,"./pixi_Object_hexa":203}],206:[function(require,module,exports){
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

//import { map_coords_horizontalHex } from '../coordinates/Map_coords_horizontalHex';
Object.defineProperty(exports, '__esModule', {
  value: true
});

var _eventListenersSelect = require('../eventListeners/select');

var _coreUI = require('../../../core/UI');

var object_select_hexagon = (function object_select_hexagon() {
  var scope = {};
  var map = {};
  scope.pluginName = "object_select";

  /**
   * @param {Map object} mapObj - the Map class object
   */
  scope.init = function (mapObj) {
    map = mapObj;
    /* We take the top-most stage on the map and add the listener to it */
    _createPrototypes(mapObj);

    _startClickListener(mapObj);
  };

  return scope;

  function getObjectsForMap(clickCoords, group) {
    var objects = {};

    objects[group] = map.objectManager.retrieve(group, clickCoords);

    return objects;
  }
  /* ====== Private functions ====== */
  /**
   * Attached the correct prototypes to map. I do not think we need to override getObjectsUnderPoint for stages.
   *
   * @param {createjs.Stage} topMostStage - createjs.Stage object, that is the topmost on the map (meant for interaction).
   * @param {Map} map - The Map class object
   */
  function _createPrototypes(map) {
    map.objectManager.hitTest = hitTest;
    map.setPrototype("getObjectsUnderPoint", getObjectsForMap);
  }
  /**
   * @param {createjs.Stage} topMostStage - createjs.Stage object, that is the topmost on the map (meant for interaction).
   * @param {Map} map - The Map class object
   */
  function _startClickListener(map) {
    var singletonUI = (0, _coreUI.UI)();

    return (0, _eventListenersSelect.setupHexagonClick)(map, singletonUI.showSelections);
  }
  function hitTest(obj, coords) {
    var isHit = this.hitDetector.processInteractive(new PIXI.Point(coords.x, coords.y), obj, function (parent, hits) {
      console.log("Shouldn't get here, the object should be non-interactive");
    }, true, true);

    return isHit;
  }
})();
exports.object_select_hexagon = object_select_hexagon;

},{"../../../core/UI":190,"../eventListeners/select":202}],207:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.createHexagon = createHexagon;
exports.createVisibleHexagon = createVisibleHexagon;

var _hexagonMath = require('./hexagonMath');

function createHexagon(radius) {
  return (0, _hexagonMath.getHexagonPoints)(radius);
}

function createVisibleHexagon(coords, radius) {
  if (coords === undefined) coords = { x: 0, y: 0 };
  var color = arguments.length <= 2 || arguments[2] === undefined ? "#444444" : arguments[2];
  var angle = arguments.length <= 3 || arguments[3] === undefined ? 30 : arguments[3];

  var shape = new createjs.Shape();

  shape.graphics.beginFill(color).drawPolyStar(coords.x, coords.y, radius, 6, 0, angle);

  return shape;
}

},{"./hexagonMath":208}],208:[function(require,module,exports){
'use strict';
/* NOTE: These calculations are for vertical hexagons */

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calcHeight = calcHeight;
exports.calcWidth = calcWidth;
exports.calcSide = calcSide;
exports.getHexagonPoints = getHexagonPoints;
exports.setCellByPoint = setCellByPoint;
exports.getHexaSize = getHexaSize;
exports.toHexaCenterCoord = toHexaCenterCoord;
exports.hexaHitTest = hexaHitTest;

function calcHeight(radius) {
  //return radius;
  return radius * Math.sqrt(3);
}

function calcWidth(radius) {
  return radius * Math.sqrt(3);
}

function calcSide(radius) {
  return radius * 3 / 2;
}

function getHexagonPoints(radius) {
  var x = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
  var y = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];
  var isFlatTop = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];

  var i = 0,
      offset = isFlatTop ? 0 : 0.5,
      angle = 2 * Math.PI / 6 * offset,
      hexagonSize = {
    x: calcWidth(radius) / 2,
    y: radius
  },
      x = hexagonSize.x * Math.cos(angle) + x,
      y = hexagonSize.y * Math.sin(angle) + y,
      points = [];

  y = y - hexagonSize.y / 2;

  points.push({
    x: x,
    y: y
  });

  for (i = 1; i < 7; i++) {
    angle = 2 * Math.PI / 6 * (i + offset);
    x = hexagonSize.x * Math.cos(angle) + x;
    y = hexagonSize.y * Math.sin(angle) + y;

    points.push({
      x: x,
      y: y
    });
  }

  return points;
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

function hexaHitTest(points) {
  var hitCoords = arguments.length <= 1 || arguments[1] === undefined ? { x: 0, y: 0 } : arguments[1];
  var offsetCoords = arguments.length <= 2 || arguments[2] === undefined ? { x: 0, y: 0 } : arguments[2];

  var offsetPoints = points.map(function (point) {
    return {
      x: point.x + offsetCoords.x,
      y: point.y + offsetCoords.y
    };
  });

  return pointInPolygon(hitCoords, offsetPoints);
}

exports["default"] = {
  calcHeight: calcHeight,
  calcSide: calcSide,
  setCellByPoint: setCellByPoint,
  getHexaSize: getHexaSize,
  toHexaCenterCoord: toHexaCenterCoord
};

/* credits to: https://github.com/substack/point-in-polygon */
function pointInPolygon(point, vs) {
  var x = point.x,
      y = point.y;

  var inside = false;
  for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
    var xi = vs[i].x,
        yi = vs[i].y;
    var xj = vs[j].x,
        yj = vs[j].y;

    var intersect = yi > y != yj > y && x < (xj - xi) * (y - yi) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }

  return inside;
}

},{}],209:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.createHexagon = createHexagon;

var _hexagonMath = require('./hexagonMath');

/** Credits belogn to: https://github.com/alforno-productions/HexPixiJs/blob/master/lib/hexPixi.js */
// Creates a hex shaped polygon that is used for the hex's hit area.

function createHexagon(radius) {
  var isFlatTop = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

  var points = [];

  points = (0, _hexagonMath.getHexagonPoints)(radius).map(function (point) {
    return new PIXI.Point(point.x, point.y);
  });

  return new PIXI.Polygon(points);
}

},{"./hexagonMath":208}],210:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var gameData = {
  ID: "53837d47976fed3b24000005",
  turn: 1,
  mapSize: { x: 50, y: 20 },
  hexagonRadius: 47,
  pluginsToActivate: {
    map: ["map_drag", "object_select_hexagon"]
  }
};
exports.gameData = gameData;

},{}],211:[function(require,module,exports){
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
    name: "terrainLayer",
    group: "terrain", // For quadTrees
    specials: [{
      "interactive": false
    }],
    options: {
      cache: true
    },
    objectGroups: [{
      type: "Object_terrain",
      name: "Terrain", // For quadTrees and debugging
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
  }, {
    type: "Map_layer",
    coord: {
      "x": "0",
      "y": "0"
    },
    "name": "unitLayer",
    group: "units", // For quadTrees
    "options": {
      "cache": "false"
    },
    objectGroups: [{
      "type": "Object_unit",
      "name": "Unit", // I guess only for debugging?
      "typeImageData": "unit",
      objects: [{
        "objType": 0,
        "name": "Tank you",
        "coord": {
          "x": "41", "y": "70"
        },
        "data": {
          "someCustomData": "true"
        },
        "lastSeenTurn": "1"
      }]
    }]
  }]
};
exports.mapData = mapData;

},{}],212:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var typeData = {
  "graphicData": {
    "terrainBase": {
      "json": "/assets/img/map/testHexagons/pixi_testHexagonSpritesheet.json"
    },
    "unit": {
      "json": "/assets/img/map/units/testHexagonUnits.json"
    }
  },
  "objectData": {
    "terrainBase": [{
      "image": "terrain_blueHexagon.png",
      "attachedToTerrains": ["0"],
      "propability": "100%",
      "name": "forDebugging - terrainBase 0"
    }, {
      "image": "terrain_greenHexagon.png",
      "attachedToTerrains": ["2"],
      "propability": "100%",
      "name": "forDebugging - terrainBase 1"
    }, {
      "image": "terrain_redHexagon.png",
      "attachedToTerrains": ["1"],
      "propability": "100%",
      "name": "forDebugging - terrainBase 2"
    }, {
      "image": "terrain_yellowHexagon.png",
      "attachedToTerrains": ["4"],
      "propability": "100%",
      "name": "forDebugging - terrainBase 3"
    }],
    "unit": [{
      "name": "tank",
      "desc": "Vrooom...",
      "image": "tank.png",
      "att": "Good",
      "def": "Poor",
      "siege": "Decent",
      "initiate": "90",
      "move": "100",
      "morale": "Average",
      "vision": "150",
      "influenceArea": "30"
    }, {
      "name": "artillery",
      "desc": "Whistlers",
      "image": "artillery.png",
      "att": "1",
      "def": "2",
      "siege": "2",
      "initiate": "110",
      "move": "100",
      "morale": "Average",
      "vision": "250",
      "influenceArea": "30",
      "modifiers": {
        "unit": {
          "_enemy_": [{
            "from": "thisOnePlace",
            "modifiers": {
              "morale": "suffers morale drop"
            }
          }]
        }
      }
    }]
  }
};
exports.typeData = typeData;

},{}],213:[function(require,module,exports){
'use strict';
/* ====== Library imports ====== */

/* ====== Own module imports ====== */
//var Map = require( '../public/components/map/Map');
/* THIS POLYFILL IS NEEDED FOR IE11, maybe Symbol os something missing: http://babeljs.io/docs/usage/polyfill/ */

var _componentsFactoriesPixi_horizontalHexaFactory = require('../../components/factories/pixi_horizontalHexaFactory');

/* ===== Import plugins ===== */

var _componentsMapCoreMoveMap_drag = require("../../components/map/core/move/map_drag");

var _componentsMapCoreZoomPixi_map_zoom = require('../../components/map/core/zoom/pixi_map_zoom');

var _componentsMapExtensionsHexagonsObject_selectPixi_object_select_hexagon = require('../../components/map/extensions/hexagons/object_select/pixi_object_select_hexagon');

/* DATA FILES used for testing */

var _testsDataGameData = require('../../tests/data/gameData');

var _testsDataPixi_typeData = require('../../tests/data/pixi_typeData');

var _testsDataPixi_mapData = require('../../tests/data/pixi_mapData');

//import { preload } from '../../components/preloading/preloading';

var _componentsMapCoreUtilsUtils = require('../../components/map/core/utils/utils');

require("babel/polyfill");

if (typeof Hammer === 'undefined' && _componentsMapCoreUtilsUtils.environmentDetection.isMobile_detectUserAgent()) {
  alert("You seem to be using mobile device, I suggest you use mobile site for tests, since this won't work for you");
}

window.initMap = function () {
  var canvasElement = document.getElementById("mainStage");
  var map;

  /** @todo MOVE the preloader to it's destined file: preloader. */
  var loader = PIXI.loader;

  loader.baseUrl = "/assets/img/map/";
  loader.add("testHexagons/pixi_testHexagonSpritesheet.json");
  loader.add("units/testHexagonUnits.json");

  loader.once('complete', onComplete);

  loader.load();
  //PIXI.loader.on("progress", loadProgressHandler);

  function onComplete() {
    map = (0, _componentsFactoriesPixi_horizontalHexaFactory.createMap)(canvasElement, { game: _testsDataGameData.gameData, map: _testsDataPixi_mapData.mapData, type: _testsDataPixi_typeData.typeData });
    map.init([_componentsMapCoreZoomPixi_map_zoom.map_zoom, _componentsMapCoreMoveMap_drag.map_drag, _componentsMapExtensionsHexagonsObject_selectPixi_object_select_hexagon.object_select_hexagon], { x: 41, y: 47 }, undefined);
  }

  return map;
};

},{"../../components/factories/pixi_horizontalHexaFactory":186,"../../components/map/core/move/map_drag":192,"../../components/map/core/utils/utils":200,"../../components/map/core/zoom/pixi_map_zoom":201,"../../components/map/extensions/hexagons/object_select/pixi_object_select_hexagon":206,"../../tests/data/gameData":210,"../../tests/data/pixi_mapData":211,"../../tests/data/pixi_typeData":212,"babel/polyfill":183}]},{},[213])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvYmFiZWwvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbGliL3BvbHlmaWxsLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsL25vZGVfbW9kdWxlcy9iYWJlbC1jb3JlL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvJC5hLWZ1bmN0aW9uLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsL25vZGVfbW9kdWxlcy9iYWJlbC1jb3JlL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvJC5hbi1vYmplY3QuanMiLCJub2RlX21vZHVsZXMvYmFiZWwvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy8kLmFycmF5LWluY2x1ZGVzLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsL25vZGVfbW9kdWxlcy9iYWJlbC1jb3JlL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvJC5hcnJheS1tZXRob2RzLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsL25vZGVfbW9kdWxlcy9iYWJlbC1jb3JlL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvJC5hc3NpZ24uanMiLCJub2RlX21vZHVsZXMvYmFiZWwvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy8kLmNsYXNzb2YuanMiLCJub2RlX21vZHVsZXMvYmFiZWwvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy8kLmNvZi5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzLyQuY29sbGVjdGlvbi1zdHJvbmcuanMiLCJub2RlX21vZHVsZXMvYmFiZWwvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy8kLmNvbGxlY3Rpb24tdG8tanNvbi5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzLyQuY29sbGVjdGlvbi13ZWFrLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsL25vZGVfbW9kdWxlcy9iYWJlbC1jb3JlL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvJC5jb2xsZWN0aW9uLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsL25vZGVfbW9kdWxlcy9iYWJlbC1jb3JlL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvJC5jb3JlLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsL25vZGVfbW9kdWxlcy9iYWJlbC1jb3JlL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvJC5jdHguanMiLCJub2RlX21vZHVsZXMvYmFiZWwvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy8kLmRlZi5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzLyQuZGVmaW5lZC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzLyQuZG9tLWNyZWF0ZS5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzLyQuZW51bS1rZXlzLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsL25vZGVfbW9kdWxlcy9iYWJlbC1jb3JlL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvJC5leHBtMS5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzLyQuZmFpbHMuanMiLCJub2RlX21vZHVsZXMvYmFiZWwvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy8kLmZpeC1yZS13a3MuanMiLCJub2RlX21vZHVsZXMvYmFiZWwvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy8kLmZsYWdzLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsL25vZGVfbW9kdWxlcy9iYWJlbC1jb3JlL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvJC5mb3Itb2YuanMiLCJub2RlX21vZHVsZXMvYmFiZWwvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy8kLmdldC1uYW1lcy5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzLyQuZ2xvYmFsLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsL25vZGVfbW9kdWxlcy9iYWJlbC1jb3JlL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvJC5oYXMuanMiLCJub2RlX21vZHVsZXMvYmFiZWwvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy8kLmhpZGUuanMiLCJub2RlX21vZHVsZXMvYmFiZWwvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy8kLmh0bWwuanMiLCJub2RlX21vZHVsZXMvYmFiZWwvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy8kLmludm9rZS5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzLyQuaW9iamVjdC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzLyQuaXMtYXJyYXktaXRlci5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzLyQuaXMtaW50ZWdlci5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzLyQuaXMtb2JqZWN0LmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsL25vZGVfbW9kdWxlcy9iYWJlbC1jb3JlL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvJC5pdGVyLWNhbGwuanMiLCJub2RlX21vZHVsZXMvYmFiZWwvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy8kLml0ZXItY3JlYXRlLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsL25vZGVfbW9kdWxlcy9iYWJlbC1jb3JlL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvJC5pdGVyLWRlZmluZS5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzLyQuaXRlci1kZXRlY3QuanMiLCJub2RlX21vZHVsZXMvYmFiZWwvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy8kLml0ZXItc3RlcC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzLyQuaXRlcmF0b3JzLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsL25vZGVfbW9kdWxlcy9iYWJlbC1jb3JlL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvJC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzLyQua2V5b2YuanMiLCJub2RlX21vZHVsZXMvYmFiZWwvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy8kLmxpYnJhcnkuanMiLCJub2RlX21vZHVsZXMvYmFiZWwvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy8kLmxvZzFwLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsL25vZGVfbW9kdWxlcy9iYWJlbC1jb3JlL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvJC5taWNyb3Rhc2suanMiLCJub2RlX21vZHVsZXMvYmFiZWwvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy8kLm1peC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzLyQub2JqZWN0LXNhcC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzLyQub2JqZWN0LXRvLWFycmF5LmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsL25vZGVfbW9kdWxlcy9iYWJlbC1jb3JlL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvJC5vd24ta2V5cy5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzLyQucGFydGlhbC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzLyQucGF0aC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzLyQucHJvcGVydHktZGVzYy5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzLyQucmVkZWYuanMiLCJub2RlX21vZHVsZXMvYmFiZWwvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy8kLnJlcGxhY2VyLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsL25vZGVfbW9kdWxlcy9iYWJlbC1jb3JlL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvJC5zYW1lLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsL25vZGVfbW9kdWxlcy9iYWJlbC1jb3JlL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvJC5zZXQtcHJvdG8uanMiLCJub2RlX21vZHVsZXMvYmFiZWwvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy8kLnNoYXJlZC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzLyQuc2lnbi5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzLyQuc3BlY2llcy5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzLyQuc3RyaWN0LW5ldy5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzLyQuc3RyaW5nLWF0LmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsL25vZGVfbW9kdWxlcy9iYWJlbC1jb3JlL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvJC5zdHJpbmctY29udGV4dC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzLyQuc3RyaW5nLXBhZC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzLyQuc3RyaW5nLXJlcGVhdC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzLyQuc3RyaW5nLXRyaW0uanMiLCJub2RlX21vZHVsZXMvYmFiZWwvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy8kLnN1cHBvcnQtZGVzYy5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzLyQudGFnLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsL25vZGVfbW9kdWxlcy9iYWJlbC1jb3JlL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvJC50YXNrLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsL25vZGVfbW9kdWxlcy9iYWJlbC1jb3JlL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvJC50by1pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzLyQudG8taW50ZWdlci5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzLyQudG8taW9iamVjdC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzLyQudG8tbGVuZ3RoLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsL25vZGVfbW9kdWxlcy9iYWJlbC1jb3JlL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvJC50by1vYmplY3QuanMiLCJub2RlX21vZHVsZXMvYmFiZWwvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy8kLnVpZC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzLyQudW5zY29wZS5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzLyQud2tzLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsL25vZGVfbW9kdWxlcy9iYWJlbC1jb3JlL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvY29yZS5nZXQtaXRlcmF0b3ItbWV0aG9kLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsL25vZGVfbW9kdWxlcy9iYWJlbC1jb3JlL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM1LmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsL25vZGVfbW9kdWxlcy9iYWJlbC1jb3JlL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LmFycmF5LmNvcHktd2l0aGluLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsL25vZGVfbW9kdWxlcy9iYWJlbC1jb3JlL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LmFycmF5LmZpbGwuanMiLCJub2RlX21vZHVsZXMvYmFiZWwvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuYXJyYXkuZmluZC1pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5hcnJheS5maW5kLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsL25vZGVfbW9kdWxlcy9iYWJlbC1jb3JlL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LmFycmF5LmZyb20uanMiLCJub2RlX21vZHVsZXMvYmFiZWwvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuYXJyYXkuaXRlcmF0b3IuanMiLCJub2RlX21vZHVsZXMvYmFiZWwvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuYXJyYXkub2YuanMiLCJub2RlX21vZHVsZXMvYmFiZWwvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuYXJyYXkuc3BlY2llcy5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5mdW5jdGlvbi5oYXMtaW5zdGFuY2UuanMiLCJub2RlX21vZHVsZXMvYmFiZWwvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuZnVuY3Rpb24ubmFtZS5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5tYXAuanMiLCJub2RlX21vZHVsZXMvYmFiZWwvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYubWF0aC5hY29zaC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5tYXRoLmFzaW5oLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsL25vZGVfbW9kdWxlcy9iYWJlbC1jb3JlL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2Lm1hdGguYXRhbmguanMiLCJub2RlX21vZHVsZXMvYmFiZWwvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYubWF0aC5jYnJ0LmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsL25vZGVfbW9kdWxlcy9iYWJlbC1jb3JlL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2Lm1hdGguY2x6MzIuanMiLCJub2RlX21vZHVsZXMvYmFiZWwvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYubWF0aC5jb3NoLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsL25vZGVfbW9kdWxlcy9iYWJlbC1jb3JlL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2Lm1hdGguZXhwbTEuanMiLCJub2RlX21vZHVsZXMvYmFiZWwvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYubWF0aC5mcm91bmQuanMiLCJub2RlX21vZHVsZXMvYmFiZWwvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYubWF0aC5oeXBvdC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5tYXRoLmltdWwuanMiLCJub2RlX21vZHVsZXMvYmFiZWwvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYubWF0aC5sb2cxMC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5tYXRoLmxvZzFwLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsL25vZGVfbW9kdWxlcy9iYWJlbC1jb3JlL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2Lm1hdGgubG9nMi5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5tYXRoLnNpZ24uanMiLCJub2RlX21vZHVsZXMvYmFiZWwvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYubWF0aC5zaW5oLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsL25vZGVfbW9kdWxlcy9iYWJlbC1jb3JlL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2Lm1hdGgudGFuaC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5tYXRoLnRydW5jLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsL25vZGVfbW9kdWxlcy9iYWJlbC1jb3JlL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2Lm51bWJlci5jb25zdHJ1Y3Rvci5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5udW1iZXIuZXBzaWxvbi5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5udW1iZXIuaXMtZmluaXRlLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsL25vZGVfbW9kdWxlcy9iYWJlbC1jb3JlL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2Lm51bWJlci5pcy1pbnRlZ2VyLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsL25vZGVfbW9kdWxlcy9iYWJlbC1jb3JlL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2Lm51bWJlci5pcy1uYW4uanMiLCJub2RlX21vZHVsZXMvYmFiZWwvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYubnVtYmVyLmlzLXNhZmUtaW50ZWdlci5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5udW1iZXIubWF4LXNhZmUtaW50ZWdlci5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5udW1iZXIubWluLXNhZmUtaW50ZWdlci5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5udW1iZXIucGFyc2UtZmxvYXQuanMiLCJub2RlX21vZHVsZXMvYmFiZWwvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYubnVtYmVyLnBhcnNlLWludC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5vYmplY3QuYXNzaWduLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsL25vZGVfbW9kdWxlcy9iYWJlbC1jb3JlL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2Lm9iamVjdC5mcmVlemUuanMiLCJub2RlX21vZHVsZXMvYmFiZWwvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYub2JqZWN0LmdldC1vd24tcHJvcGVydHktZGVzY3JpcHRvci5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5vYmplY3QuZ2V0LW93bi1wcm9wZXJ0eS1uYW1lcy5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5vYmplY3QuZ2V0LXByb3RvdHlwZS1vZi5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5vYmplY3QuaXMtZXh0ZW5zaWJsZS5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5vYmplY3QuaXMtZnJvemVuLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsL25vZGVfbW9kdWxlcy9iYWJlbC1jb3JlL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2Lm9iamVjdC5pcy1zZWFsZWQuanMiLCJub2RlX21vZHVsZXMvYmFiZWwvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYub2JqZWN0LmlzLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsL25vZGVfbW9kdWxlcy9iYWJlbC1jb3JlL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2Lm9iamVjdC5rZXlzLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsL25vZGVfbW9kdWxlcy9iYWJlbC1jb3JlL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2Lm9iamVjdC5wcmV2ZW50LWV4dGVuc2lvbnMuanMiLCJub2RlX21vZHVsZXMvYmFiZWwvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYub2JqZWN0LnNlYWwuanMiLCJub2RlX21vZHVsZXMvYmFiZWwvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYub2JqZWN0LnNldC1wcm90b3R5cGUtb2YuanMiLCJub2RlX21vZHVsZXMvYmFiZWwvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYub2JqZWN0LnRvLXN0cmluZy5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5wcm9taXNlLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsL25vZGVfbW9kdWxlcy9iYWJlbC1jb3JlL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnJlZmxlY3QuYXBwbHkuanMiLCJub2RlX21vZHVsZXMvYmFiZWwvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYucmVmbGVjdC5jb25zdHJ1Y3QuanMiLCJub2RlX21vZHVsZXMvYmFiZWwvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYucmVmbGVjdC5kZWZpbmUtcHJvcGVydHkuanMiLCJub2RlX21vZHVsZXMvYmFiZWwvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYucmVmbGVjdC5kZWxldGUtcHJvcGVydHkuanMiLCJub2RlX21vZHVsZXMvYmFiZWwvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYucmVmbGVjdC5lbnVtZXJhdGUuanMiLCJub2RlX21vZHVsZXMvYmFiZWwvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYucmVmbGVjdC5nZXQtb3duLXByb3BlcnR5LWRlc2NyaXB0b3IuanMiLCJub2RlX21vZHVsZXMvYmFiZWwvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYucmVmbGVjdC5nZXQtcHJvdG90eXBlLW9mLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsL25vZGVfbW9kdWxlcy9iYWJlbC1jb3JlL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnJlZmxlY3QuZ2V0LmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsL25vZGVfbW9kdWxlcy9iYWJlbC1jb3JlL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnJlZmxlY3QuaGFzLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsL25vZGVfbW9kdWxlcy9iYWJlbC1jb3JlL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnJlZmxlY3QuaXMtZXh0ZW5zaWJsZS5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5yZWZsZWN0Lm93bi1rZXlzLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsL25vZGVfbW9kdWxlcy9iYWJlbC1jb3JlL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnJlZmxlY3QucHJldmVudC1leHRlbnNpb25zLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsL25vZGVfbW9kdWxlcy9iYWJlbC1jb3JlL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnJlZmxlY3Quc2V0LXByb3RvdHlwZS1vZi5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5yZWZsZWN0LnNldC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5yZWdleHAuY29uc3RydWN0b3IuanMiLCJub2RlX21vZHVsZXMvYmFiZWwvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYucmVnZXhwLmZsYWdzLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsL25vZGVfbW9kdWxlcy9iYWJlbC1jb3JlL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnJlZ2V4cC5tYXRjaC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5yZWdleHAucmVwbGFjZS5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5yZWdleHAuc2VhcmNoLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsL25vZGVfbW9kdWxlcy9iYWJlbC1jb3JlL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnJlZ2V4cC5zcGxpdC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5zZXQuanMiLCJub2RlX21vZHVsZXMvYmFiZWwvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuc3RyaW5nLmNvZGUtcG9pbnQtYXQuanMiLCJub2RlX21vZHVsZXMvYmFiZWwvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuc3RyaW5nLmVuZHMtd2l0aC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5zdHJpbmcuZnJvbS1jb2RlLXBvaW50LmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsL25vZGVfbW9kdWxlcy9iYWJlbC1jb3JlL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnN0cmluZy5pbmNsdWRlcy5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5zdHJpbmcuaXRlcmF0b3IuanMiLCJub2RlX21vZHVsZXMvYmFiZWwvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuc3RyaW5nLnJhdy5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5zdHJpbmcucmVwZWF0LmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsL25vZGVfbW9kdWxlcy9iYWJlbC1jb3JlL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnN0cmluZy5zdGFydHMtd2l0aC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5zdHJpbmcudHJpbS5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5zeW1ib2wuanMiLCJub2RlX21vZHVsZXMvYmFiZWwvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYud2Vhay1tYXAuanMiLCJub2RlX21vZHVsZXMvYmFiZWwvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYud2Vhay1zZXQuanMiLCJub2RlX21vZHVsZXMvYmFiZWwvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczcuYXJyYXkuaW5jbHVkZXMuanMiLCJub2RlX21vZHVsZXMvYmFiZWwvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczcubWFwLnRvLWpzb24uanMiLCJub2RlX21vZHVsZXMvYmFiZWwvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczcub2JqZWN0LmVudHJpZXMuanMiLCJub2RlX21vZHVsZXMvYmFiZWwvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczcub2JqZWN0LmdldC1vd24tcHJvcGVydHktZGVzY3JpcHRvcnMuanMiLCJub2RlX21vZHVsZXMvYmFiZWwvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczcub2JqZWN0LnZhbHVlcy5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNy5yZWdleHAuZXNjYXBlLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsL25vZGVfbW9kdWxlcy9iYWJlbC1jb3JlL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM3LnNldC50by1qc29uLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsL25vZGVfbW9kdWxlcy9iYWJlbC1jb3JlL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM3LnN0cmluZy5hdC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNy5zdHJpbmcucGFkLWxlZnQuanMiLCJub2RlX21vZHVsZXMvYmFiZWwvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczcuc3RyaW5nLnBhZC1yaWdodC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNy5zdHJpbmcudHJpbS1sZWZ0LmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsL25vZGVfbW9kdWxlcy9iYWJlbC1jb3JlL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM3LnN0cmluZy50cmltLXJpZ2h0LmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsL25vZGVfbW9kdWxlcy9iYWJlbC1jb3JlL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvanMuYXJyYXkuc3RhdGljcy5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL3dlYi5kb20uaXRlcmFibGUuanMiLCJub2RlX21vZHVsZXMvYmFiZWwvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy93ZWIuaW1tZWRpYXRlLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsL25vZGVfbW9kdWxlcy9iYWJlbC1jb3JlL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvd2ViLnRpbWVycy5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9zaGltLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsL25vZGVfbW9kdWxlcy9iYWJlbC1jb3JlL25vZGVfbW9kdWxlcy9yZWdlbmVyYXRvci9ydW50aW1lLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsL25vZGVfbW9kdWxlcy9iYWJlbC1jb3JlL3BvbHlmaWxsLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsL3BvbHlmaWxsLmpzIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyIsIkM6L1VzZXJzL2hhY2hpL3N1YmxpbWUtcHJvamVjdHMvd2FybWFwZW5naW5lL3B1YmxpYy9hc3NldHMvbGliL3F1YWR0cmVlLWpzL3F1YWR0cmVlLWpzLWhpdG1hbi5qcyIsIkM6L1VzZXJzL2hhY2hpL3N1YmxpbWUtcHJvamVjdHMvd2FybWFwZW5naW5lL3B1YmxpYy9jb21wb25lbnRzL2ZhY3Rvcmllcy9waXhpX2hvcml6b250YWxIZXhhRmFjdG9yeS5qcyIsIkM6L1VzZXJzL2hhY2hpL3N1YmxpbWUtcHJvamVjdHMvd2FybWFwZW5naW5lL3B1YmxpYy9jb21wb25lbnRzL21hcC9VSXMvZGVmYXVsdC9kZWZhdWx0LmpzIiwiQzovVXNlcnMvaGFjaGkvc3VibGltZS1wcm9qZWN0cy93YXJtYXBlbmdpbmUvcHVibGljL2NvbXBvbmVudHMvbWFwL1VJcy9kZWZhdWx0L2xheW91dC9DU1NSdWxlcy5qcyIsIkM6L1VzZXJzL2hhY2hpL3N1YmxpbWUtcHJvamVjdHMvd2FybWFwZW5naW5lL3B1YmxpYy9jb21wb25lbnRzL21hcC9VSXMvZGVmYXVsdC9sYXlvdXQvdGVtcGxhdGVzLmpzIiwiQzovVXNlcnMvaGFjaGkvc3VibGltZS1wcm9qZWN0cy93YXJtYXBlbmdpbmUvcHVibGljL2NvbXBvbmVudHMvbWFwL2NvcmUvVUkuanMiLCJDOi9Vc2Vycy9oYWNoaS9zdWJsaW1lLXByb2plY3RzL3dhcm1hcGVuZ2luZS9wdWJsaWMvY29tcG9uZW50cy9tYXAvY29yZS9ldmVudGxpc3RlbmVycy5qcyIsIkM6L1VzZXJzL2hhY2hpL3N1YmxpbWUtcHJvamVjdHMvd2FybWFwZW5naW5lL3B1YmxpYy9jb21wb25lbnRzL21hcC9jb3JlL21vdmUvbWFwX2RyYWcuanMiLCJDOi9Vc2Vycy9oYWNoaS9zdWJsaW1lLXByb2plY3RzL3dhcm1hcGVuZ2luZS9wdWJsaWMvY29tcG9uZW50cy9tYXAvY29yZS9vYmplY3RzL3BpeGlfT2JqZWN0X3Nwcml0ZV90ZXJyYWluLmpzIiwiQzovVXNlcnMvaGFjaGkvc3VibGltZS1wcm9qZWN0cy93YXJtYXBlbmdpbmUvcHVibGljL2NvbXBvbmVudHMvbWFwL2NvcmUvb2JqZWN0cy9waXhpX09iamVjdF9zcHJpdGVfdW5pdC5qcyIsIkM6L1VzZXJzL2hhY2hpL3N1YmxpbWUtcHJvamVjdHMvd2FybWFwZW5naW5lL3B1YmxpYy9jb21wb25lbnRzL21hcC9jb3JlL3BpeGlfTWFwLmpzIiwiQzovVXNlcnMvaGFjaGkvc3VibGltZS1wcm9qZWN0cy93YXJtYXBlbmdpbmUvcHVibGljL2NvbXBvbmVudHMvbWFwL2NvcmUvcGl4aV9NYXBfbGF5ZXIuanMiLCJDOi9Vc2Vycy9oYWNoaS9zdWJsaW1lLXByb2plY3RzL3dhcm1hcGVuZ2luZS9wdWJsaWMvY29tcG9uZW50cy9tYXAvY29yZS9waXhpX09iamVjdC5qcyIsIkM6L1VzZXJzL2hhY2hpL3N1YmxpbWUtcHJvamVjdHMvd2FybWFwZW5naW5lL3B1YmxpYy9jb21wb25lbnRzL21hcC9jb3JlL3BpeGlfT2JqZWN0TWFuYWdlci5qcyIsIkM6L1VzZXJzL2hhY2hpL3N1YmxpbWUtcHJvamVjdHMvd2FybWFwZW5naW5lL3B1YmxpYy9jb21wb25lbnRzL21hcC9jb3JlL3V0aWxzL1F1YWR0cmVlLmpzIiwiQzovVXNlcnMvaGFjaGkvc3VibGltZS1wcm9qZWN0cy93YXJtYXBlbmdpbmUvcHVibGljL2NvbXBvbmVudHMvbWFwL2NvcmUvdXRpbHMvdXRpbHMuanMiLCJDOi9Vc2Vycy9oYWNoaS9zdWJsaW1lLXByb2plY3RzL3dhcm1hcGVuZ2luZS9wdWJsaWMvY29tcG9uZW50cy9tYXAvY29yZS96b29tL3BpeGlfbWFwX3pvb20uanMiLCJDOi9Vc2Vycy9oYWNoaS9zdWJsaW1lLXByb2plY3RzL3dhcm1hcGVuZ2luZS9wdWJsaWMvY29tcG9uZW50cy9tYXAvZXh0ZW5zaW9ucy9oZXhhZ29ucy9ldmVudExpc3RlbmVycy9zZWxlY3QuanMiLCJDOi9Vc2Vycy9oYWNoaS9zdWJsaW1lLXByb2plY3RzL3dhcm1hcGVuZ2luZS9wdWJsaWMvY29tcG9uZW50cy9tYXAvZXh0ZW5zaW9ucy9oZXhhZ29ucy9vYmplY3QvcGl4aV9PYmplY3RfaGV4YS5qcyIsIkM6L1VzZXJzL2hhY2hpL3N1YmxpbWUtcHJvamVjdHMvd2FybWFwZW5naW5lL3B1YmxpYy9jb21wb25lbnRzL21hcC9leHRlbnNpb25zL2hleGFnb25zL29iamVjdC9waXhpX09iamVjdF90ZXJyYWluX2hleGEuanMiLCJDOi9Vc2Vycy9oYWNoaS9zdWJsaW1lLXByb2plY3RzL3dhcm1hcGVuZ2luZS9wdWJsaWMvY29tcG9uZW50cy9tYXAvZXh0ZW5zaW9ucy9oZXhhZ29ucy9vYmplY3QvcGl4aV9PYmplY3RfdW5pdF9oZXhhLmpzIiwiQzovVXNlcnMvaGFjaGkvc3VibGltZS1wcm9qZWN0cy93YXJtYXBlbmdpbmUvcHVibGljL2NvbXBvbmVudHMvbWFwL2V4dGVuc2lvbnMvaGV4YWdvbnMvb2JqZWN0X3NlbGVjdC9waXhpX29iamVjdF9zZWxlY3RfaGV4YWdvbi5qcyIsIkM6L1VzZXJzL2hhY2hpL3N1YmxpbWUtcHJvamVjdHMvd2FybWFwZW5naW5lL3B1YmxpYy9jb21wb25lbnRzL21hcC9leHRlbnNpb25zL2hleGFnb25zL3V0aWxzL2NyZWF0ZUhleGFnb24uanMiLCJDOi9Vc2Vycy9oYWNoaS9zdWJsaW1lLXByb2plY3RzL3dhcm1hcGVuZ2luZS9wdWJsaWMvY29tcG9uZW50cy9tYXAvZXh0ZW5zaW9ucy9oZXhhZ29ucy91dGlscy9oZXhhZ29uTWF0aC5qcyIsIkM6L1VzZXJzL2hhY2hpL3N1YmxpbWUtcHJvamVjdHMvd2FybWFwZW5naW5lL3B1YmxpYy9jb21wb25lbnRzL21hcC9leHRlbnNpb25zL2hleGFnb25zL3V0aWxzL3BpeGlfY3JlYXRlSGV4YWdvbi5qcyIsIkM6L1VzZXJzL2hhY2hpL3N1YmxpbWUtcHJvamVjdHMvd2FybWFwZW5naW5lL3B1YmxpYy90ZXN0cy9kYXRhL2dhbWVEYXRhLmpzIiwiQzovVXNlcnMvaGFjaGkvc3VibGltZS1wcm9qZWN0cy93YXJtYXBlbmdpbmUvcHVibGljL3Rlc3RzL2RhdGEvcGl4aV9tYXBEYXRhLmpzIiwiQzovVXNlcnMvaGFjaGkvc3VibGltZS1wcm9qZWN0cy93YXJtYXBlbmdpbmUvcHVibGljL3Rlc3RzL2RhdGEvcGl4aV90eXBlRGF0YS5qcyIsIkM6L1VzZXJzL2hhY2hpL3N1YmxpbWUtcHJvamVjdHMvd2FybWFwZW5naW5lL3B1YmxpYy90ZXN0cy9tYW51YWwvcGl4aV9jcmVhdGVNYXAtdGVzdC5lczYuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNUQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3SkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEVBO0FBQ0E7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2JBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBO0FBQ0E7QUFDQTs7QUNGQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNUQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEJBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTs7QUNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekJBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakJBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BEQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNUQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTs7QUNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1ZBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUN2R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUMzb0JBO0FBQ0E7O0FDREE7QUFDQTs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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O0FBQ3pELE1BQUksR0FBRyxDQUFDOzs7QUFHUixNQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDOztBQUV6QixRQUFNLENBQUMsT0FBTyxHQUFHLGtCQUFrQixDQUFDO0FBQ3BDLFFBQU0sQ0FBQyxHQUFHLENBQUMsK0NBQStDLENBQUMsQ0FBQztBQUM1RCxRQUFNLENBQUMsR0FBRyxDQUFDLDZCQUE2QixDQUFDLENBQUM7O0FBRTFDLFFBQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFDLFVBQVUsQ0FBQyxDQUFDOztBQUVuQyxRQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7OztBQUdkLFdBQVMsVUFBVSxHQUFHO0FBQ3BCLE9BQUcsR0FBRyw4REFBVSxhQUFhLEVBQUUsRUFBRSxJQUFJLDZCQUFVLEVBQUUsR0FBRyxnQ0FBUyxFQUFFLElBQUksa0NBQVUsRUFBRSxDQUFDLENBQUM7QUFDakYsT0FBRyxDQUFDLElBQUksQ0FBRSxzTEFBNkMsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLFNBQVMsQ0FBRSxDQUFDO0dBQ3hGOztBQUVELFNBQU8sR0FBRyxDQUFDO0NBQ1osQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJcInVzZSBzdHJpY3RcIjtcblxucmVxdWlyZShcImNvcmUtanMvc2hpbVwiKTtcblxucmVxdWlyZShcInJlZ2VuZXJhdG9yL3J1bnRpbWVcIik7XG5cbmlmIChnbG9iYWwuX2JhYmVsUG9seWZpbGwpIHtcbiAgdGhyb3cgbmV3IEVycm9yKFwib25seSBvbmUgaW5zdGFuY2Ugb2YgYmFiZWwvcG9seWZpbGwgaXMgYWxsb3dlZFwiKTtcbn1cbmdsb2JhbC5fYmFiZWxQb2x5ZmlsbCA9IHRydWU7IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIGlmKHR5cGVvZiBpdCAhPSAnZnVuY3Rpb24nKXRocm93IFR5cGVFcnJvcihpdCArICcgaXMgbm90IGEgZnVuY3Rpb24hJyk7XG4gIHJldHVybiBpdDtcbn07IiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi8kLmlzLW9iamVjdCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIGlmKCFpc09iamVjdChpdCkpdGhyb3cgVHlwZUVycm9yKGl0ICsgJyBpcyBub3QgYW4gb2JqZWN0IScpO1xuICByZXR1cm4gaXQ7XG59OyIsIi8vIGZhbHNlIC0+IEFycmF5I2luZGV4T2Zcbi8vIHRydWUgIC0+IEFycmF5I2luY2x1ZGVzXG52YXIgdG9JT2JqZWN0ID0gcmVxdWlyZSgnLi8kLnRvLWlvYmplY3QnKVxuICAsIHRvTGVuZ3RoICA9IHJlcXVpcmUoJy4vJC50by1sZW5ndGgnKVxuICAsIHRvSW5kZXggICA9IHJlcXVpcmUoJy4vJC50by1pbmRleCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihJU19JTkNMVURFUyl7XG4gIHJldHVybiBmdW5jdGlvbigkdGhpcywgZWwsIGZyb21JbmRleCl7XG4gICAgdmFyIE8gICAgICA9IHRvSU9iamVjdCgkdGhpcylcbiAgICAgICwgbGVuZ3RoID0gdG9MZW5ndGgoTy5sZW5ndGgpXG4gICAgICAsIGluZGV4ICA9IHRvSW5kZXgoZnJvbUluZGV4LCBsZW5ndGgpXG4gICAgICAsIHZhbHVlO1xuICAgIC8vIEFycmF5I2luY2x1ZGVzIHVzZXMgU2FtZVZhbHVlWmVybyBlcXVhbGl0eSBhbGdvcml0aG1cbiAgICBpZihJU19JTkNMVURFUyAmJiBlbCAhPSBlbCl3aGlsZShsZW5ndGggPiBpbmRleCl7XG4gICAgICB2YWx1ZSA9IE9baW5kZXgrK107XG4gICAgICBpZih2YWx1ZSAhPSB2YWx1ZSlyZXR1cm4gdHJ1ZTtcbiAgICAvLyBBcnJheSN0b0luZGV4IGlnbm9yZXMgaG9sZXMsIEFycmF5I2luY2x1ZGVzIC0gbm90XG4gICAgfSBlbHNlIGZvcig7bGVuZ3RoID4gaW5kZXg7IGluZGV4KyspaWYoSVNfSU5DTFVERVMgfHwgaW5kZXggaW4gTyl7XG4gICAgICBpZihPW2luZGV4XSA9PT0gZWwpcmV0dXJuIElTX0lOQ0xVREVTIHx8IGluZGV4O1xuICAgIH0gcmV0dXJuICFJU19JTkNMVURFUyAmJiAtMTtcbiAgfTtcbn07IiwiLy8gMCAtPiBBcnJheSNmb3JFYWNoXG4vLyAxIC0+IEFycmF5I21hcFxuLy8gMiAtPiBBcnJheSNmaWx0ZXJcbi8vIDMgLT4gQXJyYXkjc29tZVxuLy8gNCAtPiBBcnJheSNldmVyeVxuLy8gNSAtPiBBcnJheSNmaW5kXG4vLyA2IC0+IEFycmF5I2ZpbmRJbmRleFxudmFyIGN0eCAgICAgID0gcmVxdWlyZSgnLi8kLmN0eCcpXG4gICwgSU9iamVjdCAgPSByZXF1aXJlKCcuLyQuaW9iamVjdCcpXG4gICwgdG9PYmplY3QgPSByZXF1aXJlKCcuLyQudG8tb2JqZWN0JylcbiAgLCB0b0xlbmd0aCA9IHJlcXVpcmUoJy4vJC50by1sZW5ndGgnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oVFlQRSl7XG4gIHZhciBJU19NQVAgICAgICAgID0gVFlQRSA9PSAxXG4gICAgLCBJU19GSUxURVIgICAgID0gVFlQRSA9PSAyXG4gICAgLCBJU19TT01FICAgICAgID0gVFlQRSA9PSAzXG4gICAgLCBJU19FVkVSWSAgICAgID0gVFlQRSA9PSA0XG4gICAgLCBJU19GSU5EX0lOREVYID0gVFlQRSA9PSA2XG4gICAgLCBOT19IT0xFUyAgICAgID0gVFlQRSA9PSA1IHx8IElTX0ZJTkRfSU5ERVg7XG4gIHJldHVybiBmdW5jdGlvbigkdGhpcywgY2FsbGJhY2tmbiwgdGhhdCl7XG4gICAgdmFyIE8gICAgICA9IHRvT2JqZWN0KCR0aGlzKVxuICAgICAgLCBzZWxmICAgPSBJT2JqZWN0KE8pXG4gICAgICAsIGYgICAgICA9IGN0eChjYWxsYmFja2ZuLCB0aGF0LCAzKVxuICAgICAgLCBsZW5ndGggPSB0b0xlbmd0aChzZWxmLmxlbmd0aClcbiAgICAgICwgaW5kZXggID0gMFxuICAgICAgLCByZXN1bHQgPSBJU19NQVAgPyBBcnJheShsZW5ndGgpIDogSVNfRklMVEVSID8gW10gOiB1bmRlZmluZWRcbiAgICAgICwgdmFsLCByZXM7XG4gICAgZm9yKDtsZW5ndGggPiBpbmRleDsgaW5kZXgrKylpZihOT19IT0xFUyB8fCBpbmRleCBpbiBzZWxmKXtcbiAgICAgIHZhbCA9IHNlbGZbaW5kZXhdO1xuICAgICAgcmVzID0gZih2YWwsIGluZGV4LCBPKTtcbiAgICAgIGlmKFRZUEUpe1xuICAgICAgICBpZihJU19NQVApcmVzdWx0W2luZGV4XSA9IHJlczsgICAgICAgICAgICAvLyBtYXBcbiAgICAgICAgZWxzZSBpZihyZXMpc3dpdGNoKFRZUEUpe1xuICAgICAgICAgIGNhc2UgMzogcmV0dXJuIHRydWU7ICAgICAgICAgICAgICAgICAgICAvLyBzb21lXG4gICAgICAgICAgY2FzZSA1OiByZXR1cm4gdmFsOyAgICAgICAgICAgICAgICAgICAgIC8vIGZpbmRcbiAgICAgICAgICBjYXNlIDY6IHJldHVybiBpbmRleDsgICAgICAgICAgICAgICAgICAgLy8gZmluZEluZGV4XG4gICAgICAgICAgY2FzZSAyOiByZXN1bHQucHVzaCh2YWwpOyAgICAgICAgICAgICAgIC8vIGZpbHRlclxuICAgICAgICB9IGVsc2UgaWYoSVNfRVZFUlkpcmV0dXJuIGZhbHNlOyAgICAgICAgICAvLyBldmVyeVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gSVNfRklORF9JTkRFWCA/IC0xIDogSVNfU09NRSB8fCBJU19FVkVSWSA/IElTX0VWRVJZIDogcmVzdWx0O1xuICB9O1xufTsiLCIvLyAxOS4xLjIuMSBPYmplY3QuYXNzaWduKHRhcmdldCwgc291cmNlLCAuLi4pXG52YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuLyQudG8tb2JqZWN0JylcbiAgLCBJT2JqZWN0ICA9IHJlcXVpcmUoJy4vJC5pb2JqZWN0JylcbiAgLCBlbnVtS2V5cyA9IHJlcXVpcmUoJy4vJC5lbnVtLWtleXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLyQuZmFpbHMnKShmdW5jdGlvbigpe1xuICByZXR1cm4gU3ltYm9sKCkgaW4gT2JqZWN0LmFzc2lnbih7fSk7IC8vIE9iamVjdC5hc3NpZ24gYXZhaWxhYmxlIGFuZCBTeW1ib2wgaXMgbmF0aXZlXG59KSA/IGZ1bmN0aW9uIGFzc2lnbih0YXJnZXQsIHNvdXJjZSl7ICAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuICB2YXIgVCA9IHRvT2JqZWN0KHRhcmdldClcbiAgICAsIGwgPSBhcmd1bWVudHMubGVuZ3RoXG4gICAgLCBpID0gMTtcbiAgd2hpbGUobCA+IGkpe1xuICAgIHZhciBTICAgICAgPSBJT2JqZWN0KGFyZ3VtZW50c1tpKytdKVxuICAgICAgLCBrZXlzICAgPSBlbnVtS2V5cyhTKVxuICAgICAgLCBsZW5ndGggPSBrZXlzLmxlbmd0aFxuICAgICAgLCBqICAgICAgPSAwXG4gICAgICAsIGtleTtcbiAgICB3aGlsZShsZW5ndGggPiBqKVRba2V5ID0ga2V5c1tqKytdXSA9IFNba2V5XTtcbiAgfVxuICByZXR1cm4gVDtcbn0gOiBPYmplY3QuYXNzaWduOyIsIi8vIGdldHRpbmcgdGFnIGZyb20gMTkuMS4zLjYgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZygpXG52YXIgY29mID0gcmVxdWlyZSgnLi8kLmNvZicpXG4gICwgVEFHID0gcmVxdWlyZSgnLi8kLndrcycpKCd0b1N0cmluZ1RhZycpXG4gIC8vIEVTMyB3cm9uZyBoZXJlXG4gICwgQVJHID0gY29mKGZ1bmN0aW9uKCl7IHJldHVybiBhcmd1bWVudHM7IH0oKSkgPT0gJ0FyZ3VtZW50cyc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICB2YXIgTywgVCwgQjtcbiAgcmV0dXJuIGl0ID09PSB1bmRlZmluZWQgPyAnVW5kZWZpbmVkJyA6IGl0ID09PSBudWxsID8gJ051bGwnXG4gICAgLy8gQEB0b1N0cmluZ1RhZyBjYXNlXG4gICAgOiB0eXBlb2YgKFQgPSAoTyA9IE9iamVjdChpdCkpW1RBR10pID09ICdzdHJpbmcnID8gVFxuICAgIC8vIGJ1aWx0aW5UYWcgY2FzZVxuICAgIDogQVJHID8gY29mKE8pXG4gICAgLy8gRVMzIGFyZ3VtZW50cyBmYWxsYmFja1xuICAgIDogKEIgPSBjb2YoTykpID09ICdPYmplY3QnICYmIHR5cGVvZiBPLmNhbGxlZSA9PSAnZnVuY3Rpb24nID8gJ0FyZ3VtZW50cycgOiBCO1xufTsiLCJ2YXIgdG9TdHJpbmcgPSB7fS50b1N0cmluZztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKGl0KS5zbGljZSg4LCAtMSk7XG59OyIsIid1c2Ugc3RyaWN0JztcbnZhciAkICAgICAgICAgICAgPSByZXF1aXJlKCcuLyQnKVxuICAsIGhpZGUgICAgICAgICA9IHJlcXVpcmUoJy4vJC5oaWRlJylcbiAgLCBjdHggICAgICAgICAgPSByZXF1aXJlKCcuLyQuY3R4JylcbiAgLCBzcGVjaWVzICAgICAgPSByZXF1aXJlKCcuLyQuc3BlY2llcycpXG4gICwgc3RyaWN0TmV3ICAgID0gcmVxdWlyZSgnLi8kLnN0cmljdC1uZXcnKVxuICAsIGRlZmluZWQgICAgICA9IHJlcXVpcmUoJy4vJC5kZWZpbmVkJylcbiAgLCBmb3JPZiAgICAgICAgPSByZXF1aXJlKCcuLyQuZm9yLW9mJylcbiAgLCBzdGVwICAgICAgICAgPSByZXF1aXJlKCcuLyQuaXRlci1zdGVwJylcbiAgLCBJRCAgICAgICAgICAgPSByZXF1aXJlKCcuLyQudWlkJykoJ2lkJylcbiAgLCAkaGFzICAgICAgICAgPSByZXF1aXJlKCcuLyQuaGFzJylcbiAgLCBpc09iamVjdCAgICAgPSByZXF1aXJlKCcuLyQuaXMtb2JqZWN0JylcbiAgLCBpc0V4dGVuc2libGUgPSBPYmplY3QuaXNFeHRlbnNpYmxlIHx8IGlzT2JqZWN0XG4gICwgU1VQUE9SVF9ERVNDID0gcmVxdWlyZSgnLi8kLnN1cHBvcnQtZGVzYycpXG4gICwgU0laRSAgICAgICAgID0gU1VQUE9SVF9ERVNDID8gJ19zJyA6ICdzaXplJ1xuICAsIGlkICAgICAgICAgICA9IDA7XG5cbnZhciBmYXN0S2V5ID0gZnVuY3Rpb24oaXQsIGNyZWF0ZSl7XG4gIC8vIHJldHVybiBwcmltaXRpdmUgd2l0aCBwcmVmaXhcbiAgaWYoIWlzT2JqZWN0KGl0KSlyZXR1cm4gdHlwZW9mIGl0ID09ICdzeW1ib2wnID8gaXQgOiAodHlwZW9mIGl0ID09ICdzdHJpbmcnID8gJ1MnIDogJ1AnKSArIGl0O1xuICBpZighJGhhcyhpdCwgSUQpKXtcbiAgICAvLyBjYW4ndCBzZXQgaWQgdG8gZnJvemVuIG9iamVjdFxuICAgIGlmKCFpc0V4dGVuc2libGUoaXQpKXJldHVybiAnRic7XG4gICAgLy8gbm90IG5lY2Vzc2FyeSB0byBhZGQgaWRcbiAgICBpZighY3JlYXRlKXJldHVybiAnRSc7XG4gICAgLy8gYWRkIG1pc3Npbmcgb2JqZWN0IGlkXG4gICAgaGlkZShpdCwgSUQsICsraWQpO1xuICAvLyByZXR1cm4gb2JqZWN0IGlkIHdpdGggcHJlZml4XG4gIH0gcmV0dXJuICdPJyArIGl0W0lEXTtcbn07XG5cbnZhciBnZXRFbnRyeSA9IGZ1bmN0aW9uKHRoYXQsIGtleSl7XG4gIC8vIGZhc3QgY2FzZVxuICB2YXIgaW5kZXggPSBmYXN0S2V5KGtleSksIGVudHJ5O1xuICBpZihpbmRleCAhPT0gJ0YnKXJldHVybiB0aGF0Ll9pW2luZGV4XTtcbiAgLy8gZnJvemVuIG9iamVjdCBjYXNlXG4gIGZvcihlbnRyeSA9IHRoYXQuX2Y7IGVudHJ5OyBlbnRyeSA9IGVudHJ5Lm4pe1xuICAgIGlmKGVudHJ5LmsgPT0ga2V5KXJldHVybiBlbnRyeTtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGdldENvbnN0cnVjdG9yOiBmdW5jdGlvbih3cmFwcGVyLCBOQU1FLCBJU19NQVAsIEFEREVSKXtcbiAgICB2YXIgQyA9IHdyYXBwZXIoZnVuY3Rpb24odGhhdCwgaXRlcmFibGUpe1xuICAgICAgc3RyaWN0TmV3KHRoYXQsIEMsIE5BTUUpO1xuICAgICAgdGhhdC5faSA9ICQuY3JlYXRlKG51bGwpOyAvLyBpbmRleFxuICAgICAgdGhhdC5fZiA9IHVuZGVmaW5lZDsgICAgICAvLyBmaXJzdCBlbnRyeVxuICAgICAgdGhhdC5fbCA9IHVuZGVmaW5lZDsgICAgICAvLyBsYXN0IGVudHJ5XG4gICAgICB0aGF0W1NJWkVdID0gMDsgICAgICAgICAgIC8vIHNpemVcbiAgICAgIGlmKGl0ZXJhYmxlICE9IHVuZGVmaW5lZClmb3JPZihpdGVyYWJsZSwgSVNfTUFQLCB0aGF0W0FEREVSXSwgdGhhdCk7XG4gICAgfSk7XG4gICAgcmVxdWlyZSgnLi8kLm1peCcpKEMucHJvdG90eXBlLCB7XG4gICAgICAvLyAyMy4xLjMuMSBNYXAucHJvdG90eXBlLmNsZWFyKClcbiAgICAgIC8vIDIzLjIuMy4yIFNldC5wcm90b3R5cGUuY2xlYXIoKVxuICAgICAgY2xlYXI6IGZ1bmN0aW9uIGNsZWFyKCl7XG4gICAgICAgIGZvcih2YXIgdGhhdCA9IHRoaXMsIGRhdGEgPSB0aGF0Ll9pLCBlbnRyeSA9IHRoYXQuX2Y7IGVudHJ5OyBlbnRyeSA9IGVudHJ5Lm4pe1xuICAgICAgICAgIGVudHJ5LnIgPSB0cnVlO1xuICAgICAgICAgIGlmKGVudHJ5LnApZW50cnkucCA9IGVudHJ5LnAubiA9IHVuZGVmaW5lZDtcbiAgICAgICAgICBkZWxldGUgZGF0YVtlbnRyeS5pXTtcbiAgICAgICAgfVxuICAgICAgICB0aGF0Ll9mID0gdGhhdC5fbCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhhdFtTSVpFXSA9IDA7XG4gICAgICB9LFxuICAgICAgLy8gMjMuMS4zLjMgTWFwLnByb3RvdHlwZS5kZWxldGUoa2V5KVxuICAgICAgLy8gMjMuMi4zLjQgU2V0LnByb3RvdHlwZS5kZWxldGUodmFsdWUpXG4gICAgICAnZGVsZXRlJzogZnVuY3Rpb24oa2V5KXtcbiAgICAgICAgdmFyIHRoYXQgID0gdGhpc1xuICAgICAgICAgICwgZW50cnkgPSBnZXRFbnRyeSh0aGF0LCBrZXkpO1xuICAgICAgICBpZihlbnRyeSl7XG4gICAgICAgICAgdmFyIG5leHQgPSBlbnRyeS5uXG4gICAgICAgICAgICAsIHByZXYgPSBlbnRyeS5wO1xuICAgICAgICAgIGRlbGV0ZSB0aGF0Ll9pW2VudHJ5LmldO1xuICAgICAgICAgIGVudHJ5LnIgPSB0cnVlO1xuICAgICAgICAgIGlmKHByZXYpcHJldi5uID0gbmV4dDtcbiAgICAgICAgICBpZihuZXh0KW5leHQucCA9IHByZXY7XG4gICAgICAgICAgaWYodGhhdC5fZiA9PSBlbnRyeSl0aGF0Ll9mID0gbmV4dDtcbiAgICAgICAgICBpZih0aGF0Ll9sID09IGVudHJ5KXRoYXQuX2wgPSBwcmV2O1xuICAgICAgICAgIHRoYXRbU0laRV0tLTtcbiAgICAgICAgfSByZXR1cm4gISFlbnRyeTtcbiAgICAgIH0sXG4gICAgICAvLyAyMy4yLjMuNiBTZXQucHJvdG90eXBlLmZvckVhY2goY2FsbGJhY2tmbiwgdGhpc0FyZyA9IHVuZGVmaW5lZClcbiAgICAgIC8vIDIzLjEuMy41IE1hcC5wcm90b3R5cGUuZm9yRWFjaChjYWxsYmFja2ZuLCB0aGlzQXJnID0gdW5kZWZpbmVkKVxuICAgICAgZm9yRWFjaDogZnVuY3Rpb24gZm9yRWFjaChjYWxsYmFja2ZuIC8qLCB0aGF0ID0gdW5kZWZpbmVkICovKXtcbiAgICAgICAgdmFyIGYgPSBjdHgoY2FsbGJhY2tmbiwgYXJndW1lbnRzWzFdLCAzKVxuICAgICAgICAgICwgZW50cnk7XG4gICAgICAgIHdoaWxlKGVudHJ5ID0gZW50cnkgPyBlbnRyeS5uIDogdGhpcy5fZil7XG4gICAgICAgICAgZihlbnRyeS52LCBlbnRyeS5rLCB0aGlzKTtcbiAgICAgICAgICAvLyByZXZlcnQgdG8gdGhlIGxhc3QgZXhpc3RpbmcgZW50cnlcbiAgICAgICAgICB3aGlsZShlbnRyeSAmJiBlbnRyeS5yKWVudHJ5ID0gZW50cnkucDtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIC8vIDIzLjEuMy43IE1hcC5wcm90b3R5cGUuaGFzKGtleSlcbiAgICAgIC8vIDIzLjIuMy43IFNldC5wcm90b3R5cGUuaGFzKHZhbHVlKVxuICAgICAgaGFzOiBmdW5jdGlvbiBoYXMoa2V5KXtcbiAgICAgICAgcmV0dXJuICEhZ2V0RW50cnkodGhpcywga2V5KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBpZihTVVBQT1JUX0RFU0MpJC5zZXREZXNjKEMucHJvdG90eXBlLCAnc2l6ZScsIHtcbiAgICAgIGdldDogZnVuY3Rpb24oKXtcbiAgICAgICAgcmV0dXJuIGRlZmluZWQodGhpc1tTSVpFXSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIEM7XG4gIH0sXG4gIGRlZjogZnVuY3Rpb24odGhhdCwga2V5LCB2YWx1ZSl7XG4gICAgdmFyIGVudHJ5ID0gZ2V0RW50cnkodGhhdCwga2V5KVxuICAgICAgLCBwcmV2LCBpbmRleDtcbiAgICAvLyBjaGFuZ2UgZXhpc3RpbmcgZW50cnlcbiAgICBpZihlbnRyeSl7XG4gICAgICBlbnRyeS52ID0gdmFsdWU7XG4gICAgLy8gY3JlYXRlIG5ldyBlbnRyeVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGF0Ll9sID0gZW50cnkgPSB7XG4gICAgICAgIGk6IGluZGV4ID0gZmFzdEtleShrZXksIHRydWUpLCAvLyA8LSBpbmRleFxuICAgICAgICBrOiBrZXksICAgICAgICAgICAgICAgICAgICAgICAgLy8gPC0ga2V5XG4gICAgICAgIHY6IHZhbHVlLCAgICAgICAgICAgICAgICAgICAgICAvLyA8LSB2YWx1ZVxuICAgICAgICBwOiBwcmV2ID0gdGhhdC5fbCwgICAgICAgICAgICAgLy8gPC0gcHJldmlvdXMgZW50cnlcbiAgICAgICAgbjogdW5kZWZpbmVkLCAgICAgICAgICAgICAgICAgIC8vIDwtIG5leHQgZW50cnlcbiAgICAgICAgcjogZmFsc2UgICAgICAgICAgICAgICAgICAgICAgIC8vIDwtIHJlbW92ZWRcbiAgICAgIH07XG4gICAgICBpZighdGhhdC5fZil0aGF0Ll9mID0gZW50cnk7XG4gICAgICBpZihwcmV2KXByZXYubiA9IGVudHJ5O1xuICAgICAgdGhhdFtTSVpFXSsrO1xuICAgICAgLy8gYWRkIHRvIGluZGV4XG4gICAgICBpZihpbmRleCAhPT0gJ0YnKXRoYXQuX2lbaW5kZXhdID0gZW50cnk7XG4gICAgfSByZXR1cm4gdGhhdDtcbiAgfSxcbiAgZ2V0RW50cnk6IGdldEVudHJ5LFxuICBzZXRTdHJvbmc6IGZ1bmN0aW9uKEMsIE5BTUUsIElTX01BUCl7XG4gICAgLy8gYWRkIC5rZXlzLCAudmFsdWVzLCAuZW50cmllcywgW0BAaXRlcmF0b3JdXG4gICAgLy8gMjMuMS4zLjQsIDIzLjEuMy44LCAyMy4xLjMuMTEsIDIzLjEuMy4xMiwgMjMuMi4zLjUsIDIzLjIuMy44LCAyMy4yLjMuMTAsIDIzLjIuMy4xMVxuICAgIHJlcXVpcmUoJy4vJC5pdGVyLWRlZmluZScpKEMsIE5BTUUsIGZ1bmN0aW9uKGl0ZXJhdGVkLCBraW5kKXtcbiAgICAgIHRoaXMuX3QgPSBpdGVyYXRlZDsgIC8vIHRhcmdldFxuICAgICAgdGhpcy5fayA9IGtpbmQ7ICAgICAgLy8ga2luZFxuICAgICAgdGhpcy5fbCA9IHVuZGVmaW5lZDsgLy8gcHJldmlvdXNcbiAgICB9LCBmdW5jdGlvbigpe1xuICAgICAgdmFyIHRoYXQgID0gdGhpc1xuICAgICAgICAsIGtpbmQgID0gdGhhdC5fa1xuICAgICAgICAsIGVudHJ5ID0gdGhhdC5fbDtcbiAgICAgIC8vIHJldmVydCB0byB0aGUgbGFzdCBleGlzdGluZyBlbnRyeVxuICAgICAgd2hpbGUoZW50cnkgJiYgZW50cnkucillbnRyeSA9IGVudHJ5LnA7XG4gICAgICAvLyBnZXQgbmV4dCBlbnRyeVxuICAgICAgaWYoIXRoYXQuX3QgfHwgISh0aGF0Ll9sID0gZW50cnkgPSBlbnRyeSA/IGVudHJ5Lm4gOiB0aGF0Ll90Ll9mKSl7XG4gICAgICAgIC8vIG9yIGZpbmlzaCB0aGUgaXRlcmF0aW9uXG4gICAgICAgIHRoYXQuX3QgPSB1bmRlZmluZWQ7XG4gICAgICAgIHJldHVybiBzdGVwKDEpO1xuICAgICAgfVxuICAgICAgLy8gcmV0dXJuIHN0ZXAgYnkga2luZFxuICAgICAgaWYoa2luZCA9PSAna2V5cycgIClyZXR1cm4gc3RlcCgwLCBlbnRyeS5rKTtcbiAgICAgIGlmKGtpbmQgPT0gJ3ZhbHVlcycpcmV0dXJuIHN0ZXAoMCwgZW50cnkudik7XG4gICAgICByZXR1cm4gc3RlcCgwLCBbZW50cnkuaywgZW50cnkudl0pO1xuICAgIH0sIElTX01BUCA/ICdlbnRyaWVzJyA6ICd2YWx1ZXMnICwgIUlTX01BUCwgdHJ1ZSk7XG5cbiAgICAvLyBhZGQgW0BAc3BlY2llc10sIDIzLjEuMi4yLCAyMy4yLjIuMlxuICAgIHNwZWNpZXMoQyk7XG4gICAgc3BlY2llcyhyZXF1aXJlKCcuLyQuY29yZScpW05BTUVdKTsgLy8gZm9yIHdyYXBwZXJcbiAgfVxufTsiLCIvLyBodHRwczovL2dpdGh1Yi5jb20vRGF2aWRCcnVhbnQvTWFwLVNldC5wcm90b3R5cGUudG9KU09OXG52YXIgZm9yT2YgICA9IHJlcXVpcmUoJy4vJC5mb3Itb2YnKVxuICAsIGNsYXNzb2YgPSByZXF1aXJlKCcuLyQuY2xhc3NvZicpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihOQU1FKXtcbiAgcmV0dXJuIGZ1bmN0aW9uIHRvSlNPTigpe1xuICAgIGlmKGNsYXNzb2YodGhpcykgIT0gTkFNRSl0aHJvdyBUeXBlRXJyb3IoTkFNRSArIFwiI3RvSlNPTiBpc24ndCBnZW5lcmljXCIpO1xuICAgIHZhciBhcnIgPSBbXTtcbiAgICBmb3JPZih0aGlzLCBmYWxzZSwgYXJyLnB1c2gsIGFycik7XG4gICAgcmV0dXJuIGFycjtcbiAgfTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xudmFyIGhpZGUgICAgICAgICA9IHJlcXVpcmUoJy4vJC5oaWRlJylcbiAgLCBhbk9iamVjdCAgICAgPSByZXF1aXJlKCcuLyQuYW4tb2JqZWN0JylcbiAgLCBzdHJpY3ROZXcgICAgPSByZXF1aXJlKCcuLyQuc3RyaWN0LW5ldycpXG4gICwgZm9yT2YgICAgICAgID0gcmVxdWlyZSgnLi8kLmZvci1vZicpXG4gICwgbWV0aG9kICAgICAgID0gcmVxdWlyZSgnLi8kLmFycmF5LW1ldGhvZHMnKVxuICAsIFdFQUsgICAgICAgICA9IHJlcXVpcmUoJy4vJC51aWQnKSgnd2VhaycpXG4gICwgaXNPYmplY3QgICAgID0gcmVxdWlyZSgnLi8kLmlzLW9iamVjdCcpXG4gICwgJGhhcyAgICAgICAgID0gcmVxdWlyZSgnLi8kLmhhcycpXG4gICwgaXNFeHRlbnNpYmxlID0gT2JqZWN0LmlzRXh0ZW5zaWJsZSB8fCBpc09iamVjdFxuICAsIGZpbmQgICAgICAgICA9IG1ldGhvZCg1KVxuICAsIGZpbmRJbmRleCAgICA9IG1ldGhvZCg2KVxuICAsIGlkICAgICAgICAgICA9IDA7XG5cbi8vIGZhbGxiYWNrIGZvciBmcm96ZW4ga2V5c1xudmFyIGZyb3plblN0b3JlID0gZnVuY3Rpb24odGhhdCl7XG4gIHJldHVybiB0aGF0Ll9sIHx8ICh0aGF0Ll9sID0gbmV3IEZyb3plblN0b3JlKTtcbn07XG52YXIgRnJvemVuU3RvcmUgPSBmdW5jdGlvbigpe1xuICB0aGlzLmEgPSBbXTtcbn07XG52YXIgZmluZEZyb3plbiA9IGZ1bmN0aW9uKHN0b3JlLCBrZXkpe1xuICByZXR1cm4gZmluZChzdG9yZS5hLCBmdW5jdGlvbihpdCl7XG4gICAgcmV0dXJuIGl0WzBdID09PSBrZXk7XG4gIH0pO1xufTtcbkZyb3plblN0b3JlLnByb3RvdHlwZSA9IHtcbiAgZ2V0OiBmdW5jdGlvbihrZXkpe1xuICAgIHZhciBlbnRyeSA9IGZpbmRGcm96ZW4odGhpcywga2V5KTtcbiAgICBpZihlbnRyeSlyZXR1cm4gZW50cnlbMV07XG4gIH0sXG4gIGhhczogZnVuY3Rpb24oa2V5KXtcbiAgICByZXR1cm4gISFmaW5kRnJvemVuKHRoaXMsIGtleSk7XG4gIH0sXG4gIHNldDogZnVuY3Rpb24oa2V5LCB2YWx1ZSl7XG4gICAgdmFyIGVudHJ5ID0gZmluZEZyb3plbih0aGlzLCBrZXkpO1xuICAgIGlmKGVudHJ5KWVudHJ5WzFdID0gdmFsdWU7XG4gICAgZWxzZSB0aGlzLmEucHVzaChba2V5LCB2YWx1ZV0pO1xuICB9LFxuICAnZGVsZXRlJzogZnVuY3Rpb24oa2V5KXtcbiAgICB2YXIgaW5kZXggPSBmaW5kSW5kZXgodGhpcy5hLCBmdW5jdGlvbihpdCl7XG4gICAgICByZXR1cm4gaXRbMF0gPT09IGtleTtcbiAgICB9KTtcbiAgICBpZih+aW5kZXgpdGhpcy5hLnNwbGljZShpbmRleCwgMSk7XG4gICAgcmV0dXJuICEhfmluZGV4O1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgZ2V0Q29uc3RydWN0b3I6IGZ1bmN0aW9uKHdyYXBwZXIsIE5BTUUsIElTX01BUCwgQURERVIpe1xuICAgIHZhciBDID0gd3JhcHBlcihmdW5jdGlvbih0aGF0LCBpdGVyYWJsZSl7XG4gICAgICBzdHJpY3ROZXcodGhhdCwgQywgTkFNRSk7XG4gICAgICB0aGF0Ll9pID0gaWQrKzsgICAgICAvLyBjb2xsZWN0aW9uIGlkXG4gICAgICB0aGF0Ll9sID0gdW5kZWZpbmVkOyAvLyBsZWFrIHN0b3JlIGZvciBmcm96ZW4gb2JqZWN0c1xuICAgICAgaWYoaXRlcmFibGUgIT0gdW5kZWZpbmVkKWZvck9mKGl0ZXJhYmxlLCBJU19NQVAsIHRoYXRbQURERVJdLCB0aGF0KTtcbiAgICB9KTtcbiAgICByZXF1aXJlKCcuLyQubWl4JykoQy5wcm90b3R5cGUsIHtcbiAgICAgIC8vIDIzLjMuMy4yIFdlYWtNYXAucHJvdG90eXBlLmRlbGV0ZShrZXkpXG4gICAgICAvLyAyMy40LjMuMyBXZWFrU2V0LnByb3RvdHlwZS5kZWxldGUodmFsdWUpXG4gICAgICAnZGVsZXRlJzogZnVuY3Rpb24oa2V5KXtcbiAgICAgICAgaWYoIWlzT2JqZWN0KGtleSkpcmV0dXJuIGZhbHNlO1xuICAgICAgICBpZighaXNFeHRlbnNpYmxlKGtleSkpcmV0dXJuIGZyb3plblN0b3JlKHRoaXMpWydkZWxldGUnXShrZXkpO1xuICAgICAgICByZXR1cm4gJGhhcyhrZXksIFdFQUspICYmICRoYXMoa2V5W1dFQUtdLCB0aGlzLl9pKSAmJiBkZWxldGUga2V5W1dFQUtdW3RoaXMuX2ldO1xuICAgICAgfSxcbiAgICAgIC8vIDIzLjMuMy40IFdlYWtNYXAucHJvdG90eXBlLmhhcyhrZXkpXG4gICAgICAvLyAyMy40LjMuNCBXZWFrU2V0LnByb3RvdHlwZS5oYXModmFsdWUpXG4gICAgICBoYXM6IGZ1bmN0aW9uIGhhcyhrZXkpe1xuICAgICAgICBpZighaXNPYmplY3Qoa2V5KSlyZXR1cm4gZmFsc2U7XG4gICAgICAgIGlmKCFpc0V4dGVuc2libGUoa2V5KSlyZXR1cm4gZnJvemVuU3RvcmUodGhpcykuaGFzKGtleSk7XG4gICAgICAgIHJldHVybiAkaGFzKGtleSwgV0VBSykgJiYgJGhhcyhrZXlbV0VBS10sIHRoaXMuX2kpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBDO1xuICB9LFxuICBkZWY6IGZ1bmN0aW9uKHRoYXQsIGtleSwgdmFsdWUpe1xuICAgIGlmKCFpc0V4dGVuc2libGUoYW5PYmplY3Qoa2V5KSkpe1xuICAgICAgZnJvemVuU3RvcmUodGhhdCkuc2V0KGtleSwgdmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAkaGFzKGtleSwgV0VBSykgfHwgaGlkZShrZXksIFdFQUssIHt9KTtcbiAgICAgIGtleVtXRUFLXVt0aGF0Ll9pXSA9IHZhbHVlO1xuICAgIH0gcmV0dXJuIHRoYXQ7XG4gIH0sXG4gIGZyb3plblN0b3JlOiBmcm96ZW5TdG9yZSxcbiAgV0VBSzogV0VBS1xufTsiLCIndXNlIHN0cmljdCc7XG52YXIgZ2xvYmFsICAgICA9IHJlcXVpcmUoJy4vJC5nbG9iYWwnKVxuICAsICRkZWYgICAgICAgPSByZXF1aXJlKCcuLyQuZGVmJylcbiAgLCBmb3JPZiAgICAgID0gcmVxdWlyZSgnLi8kLmZvci1vZicpXG4gICwgc3RyaWN0TmV3ICA9IHJlcXVpcmUoJy4vJC5zdHJpY3QtbmV3Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oTkFNRSwgd3JhcHBlciwgbWV0aG9kcywgY29tbW9uLCBJU19NQVAsIElTX1dFQUspe1xuICB2YXIgQmFzZSAgPSBnbG9iYWxbTkFNRV1cbiAgICAsIEMgICAgID0gQmFzZVxuICAgICwgQURERVIgPSBJU19NQVAgPyAnc2V0JyA6ICdhZGQnXG4gICAgLCBwcm90byA9IEMgJiYgQy5wcm90b3R5cGVcbiAgICAsIE8gICAgID0ge307XG4gIHZhciBmaXhNZXRob2QgPSBmdW5jdGlvbihLRVkpe1xuICAgIHZhciBmbiA9IHByb3RvW0tFWV07XG4gICAgcmVxdWlyZSgnLi8kLnJlZGVmJykocHJvdG8sIEtFWSxcbiAgICAgIEtFWSA9PSAnZGVsZXRlJyA/IGZ1bmN0aW9uKGEpeyByZXR1cm4gZm4uY2FsbCh0aGlzLCBhID09PSAwID8gMCA6IGEpOyB9XG4gICAgICA6IEtFWSA9PSAnaGFzJyA/IGZ1bmN0aW9uIGhhcyhhKXsgcmV0dXJuIGZuLmNhbGwodGhpcywgYSA9PT0gMCA/IDAgOiBhKTsgfVxuICAgICAgOiBLRVkgPT0gJ2dldCcgPyBmdW5jdGlvbiBnZXQoYSl7IHJldHVybiBmbi5jYWxsKHRoaXMsIGEgPT09IDAgPyAwIDogYSk7IH1cbiAgICAgIDogS0VZID09ICdhZGQnID8gZnVuY3Rpb24gYWRkKGEpeyBmbi5jYWxsKHRoaXMsIGEgPT09IDAgPyAwIDogYSk7IHJldHVybiB0aGlzOyB9XG4gICAgICA6IGZ1bmN0aW9uIHNldChhLCBiKXsgZm4uY2FsbCh0aGlzLCBhID09PSAwID8gMCA6IGEsIGIpOyByZXR1cm4gdGhpczsgfVxuICAgICk7XG4gIH07XG4gIGlmKHR5cGVvZiBDICE9ICdmdW5jdGlvbicgfHwgIShJU19XRUFLIHx8IHByb3RvLmZvckVhY2ggJiYgIXJlcXVpcmUoJy4vJC5mYWlscycpKGZ1bmN0aW9uKCl7XG4gICAgbmV3IEMoKS5lbnRyaWVzKCkubmV4dCgpO1xuICB9KSkpe1xuICAgIC8vIGNyZWF0ZSBjb2xsZWN0aW9uIGNvbnN0cnVjdG9yXG4gICAgQyA9IGNvbW1vbi5nZXRDb25zdHJ1Y3Rvcih3cmFwcGVyLCBOQU1FLCBJU19NQVAsIEFEREVSKTtcbiAgICByZXF1aXJlKCcuLyQubWl4JykoQy5wcm90b3R5cGUsIG1ldGhvZHMpO1xuICB9IGVsc2Uge1xuICAgIHZhciBpbnN0ICA9IG5ldyBDXG4gICAgICAsIGNoYWluID0gaW5zdFtBRERFUl0oSVNfV0VBSyA/IHt9IDogLTAsIDEpXG4gICAgICAsIGJ1Z2d5WmVybztcbiAgICAvLyB3cmFwIGZvciBpbml0IGNvbGxlY3Rpb25zIGZyb20gaXRlcmFibGVcbiAgICBpZighcmVxdWlyZSgnLi8kLml0ZXItZGV0ZWN0JykoZnVuY3Rpb24oaXRlcil7IG5ldyBDKGl0ZXIpOyB9KSl7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbmV3XG4gICAgICBDID0gd3JhcHBlcihmdW5jdGlvbih0YXJnZXQsIGl0ZXJhYmxlKXtcbiAgICAgICAgc3RyaWN0TmV3KHRhcmdldCwgQywgTkFNRSk7XG4gICAgICAgIHZhciB0aGF0ID0gbmV3IEJhc2U7XG4gICAgICAgIGlmKGl0ZXJhYmxlICE9IHVuZGVmaW5lZClmb3JPZihpdGVyYWJsZSwgSVNfTUFQLCB0aGF0W0FEREVSXSwgdGhhdCk7XG4gICAgICAgIHJldHVybiB0aGF0O1xuICAgICAgfSk7XG4gICAgICBDLnByb3RvdHlwZSA9IHByb3RvO1xuICAgICAgcHJvdG8uY29uc3RydWN0b3IgPSBDO1xuICAgIH1cbiAgICBJU19XRUFLIHx8IGluc3QuZm9yRWFjaChmdW5jdGlvbih2YWwsIGtleSl7XG4gICAgICBidWdneVplcm8gPSAxIC8ga2V5ID09PSAtSW5maW5pdHk7XG4gICAgfSk7XG4gICAgLy8gZml4IGNvbnZlcnRpbmcgLTAga2V5IHRvICswXG4gICAgaWYoYnVnZ3laZXJvKXtcbiAgICAgIGZpeE1ldGhvZCgnZGVsZXRlJyk7XG4gICAgICBmaXhNZXRob2QoJ2hhcycpO1xuICAgICAgSVNfTUFQICYmIGZpeE1ldGhvZCgnZ2V0Jyk7XG4gICAgfVxuICAgIC8vICsgZml4IC5hZGQgJiAuc2V0IGZvciBjaGFpbmluZ1xuICAgIGlmKGJ1Z2d5WmVybyB8fCBjaGFpbiAhPT0gaW5zdClmaXhNZXRob2QoQURERVIpO1xuICAgIC8vIHdlYWsgY29sbGVjdGlvbnMgc2hvdWxkIG5vdCBjb250YWlucyAuY2xlYXIgbWV0aG9kXG4gICAgaWYoSVNfV0VBSyAmJiBwcm90by5jbGVhcilkZWxldGUgcHJvdG8uY2xlYXI7XG4gIH1cblxuICByZXF1aXJlKCcuLyQudGFnJykoQywgTkFNRSk7XG5cbiAgT1tOQU1FXSA9IEM7XG4gICRkZWYoJGRlZi5HICsgJGRlZi5XICsgJGRlZi5GICogKEMgIT0gQmFzZSksIE8pO1xuXG4gIGlmKCFJU19XRUFLKWNvbW1vbi5zZXRTdHJvbmcoQywgTkFNRSwgSVNfTUFQKTtcblxuICByZXR1cm4gQztcbn07IiwidmFyIGNvcmUgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuaWYodHlwZW9mIF9fZSA9PSAnbnVtYmVyJylfX2UgPSBjb3JlOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmIiwiLy8gb3B0aW9uYWwgLyBzaW1wbGUgY29udGV4dCBiaW5kaW5nXG52YXIgYUZ1bmN0aW9uID0gcmVxdWlyZSgnLi8kLmEtZnVuY3Rpb24nKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZm4sIHRoYXQsIGxlbmd0aCl7XG4gIGFGdW5jdGlvbihmbik7XG4gIGlmKHRoYXQgPT09IHVuZGVmaW5lZClyZXR1cm4gZm47XG4gIHN3aXRjaChsZW5ndGgpe1xuICAgIGNhc2UgMTogcmV0dXJuIGZ1bmN0aW9uKGEpe1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSk7XG4gICAgfTtcbiAgICBjYXNlIDI6IHJldHVybiBmdW5jdGlvbihhLCBiKXtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEsIGIpO1xuICAgIH07XG4gICAgY2FzZSAzOiByZXR1cm4gZnVuY3Rpb24oYSwgYiwgYyl7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhLCBiLCBjKTtcbiAgICB9O1xuICB9IHJldHVybiBmdW5jdGlvbigvKiAuLi5hcmdzICovKXtcbiAgICAgIHJldHVybiBmbi5hcHBseSh0aGF0LCBhcmd1bWVudHMpO1xuICAgIH07XG59OyIsInZhciBnbG9iYWwgICAgID0gcmVxdWlyZSgnLi8kLmdsb2JhbCcpXG4gICwgY29yZSAgICAgICA9IHJlcXVpcmUoJy4vJC5jb3JlJylcbiAgLCBoaWRlICAgICAgID0gcmVxdWlyZSgnLi8kLmhpZGUnKVxuICAsICRyZWRlZiAgICAgPSByZXF1aXJlKCcuLyQucmVkZWYnKVxuICAsIFBST1RPVFlQRSAgPSAncHJvdG90eXBlJztcbnZhciBjdHggPSBmdW5jdGlvbihmbiwgdGhhdCl7XG4gIHJldHVybiBmdW5jdGlvbigpe1xuICAgIHJldHVybiBmbi5hcHBseSh0aGF0LCBhcmd1bWVudHMpO1xuICB9O1xufTtcbnZhciAkZGVmID0gZnVuY3Rpb24odHlwZSwgbmFtZSwgc291cmNlKXtcbiAgdmFyIGtleSwgb3duLCBvdXQsIGV4cFxuICAgICwgaXNHbG9iYWwgPSB0eXBlICYgJGRlZi5HXG4gICAgLCBpc1Byb3RvICA9IHR5cGUgJiAkZGVmLlBcbiAgICAsIHRhcmdldCAgID0gaXNHbG9iYWwgPyBnbG9iYWwgOiB0eXBlICYgJGRlZi5TXG4gICAgICAgID8gZ2xvYmFsW25hbWVdIHx8IChnbG9iYWxbbmFtZV0gPSB7fSkgOiAoZ2xvYmFsW25hbWVdIHx8IHt9KVtQUk9UT1RZUEVdXG4gICAgLCBleHBvcnRzICA9IGlzR2xvYmFsID8gY29yZSA6IGNvcmVbbmFtZV0gfHwgKGNvcmVbbmFtZV0gPSB7fSk7XG4gIGlmKGlzR2xvYmFsKXNvdXJjZSA9IG5hbWU7XG4gIGZvcihrZXkgaW4gc291cmNlKXtcbiAgICAvLyBjb250YWlucyBpbiBuYXRpdmVcbiAgICBvd24gPSAhKHR5cGUgJiAkZGVmLkYpICYmIHRhcmdldCAmJiBrZXkgaW4gdGFyZ2V0O1xuICAgIC8vIGV4cG9ydCBuYXRpdmUgb3IgcGFzc2VkXG4gICAgb3V0ID0gKG93biA/IHRhcmdldCA6IHNvdXJjZSlba2V5XTtcbiAgICAvLyBiaW5kIHRpbWVycyB0byBnbG9iYWwgZm9yIGNhbGwgZnJvbSBleHBvcnQgY29udGV4dFxuICAgIGlmKHR5cGUgJiAkZGVmLkIgJiYgb3duKWV4cCA9IGN0eChvdXQsIGdsb2JhbCk7XG4gICAgZWxzZSBleHAgPSBpc1Byb3RvICYmIHR5cGVvZiBvdXQgPT0gJ2Z1bmN0aW9uJyA/IGN0eChGdW5jdGlvbi5jYWxsLCBvdXQpIDogb3V0O1xuICAgIC8vIGV4dGVuZCBnbG9iYWxcbiAgICBpZih0YXJnZXQgJiYgIW93bikkcmVkZWYodGFyZ2V0LCBrZXksIG91dCk7XG4gICAgLy8gZXhwb3J0XG4gICAgaWYoZXhwb3J0c1trZXldICE9IG91dCloaWRlKGV4cG9ydHMsIGtleSwgZXhwKTtcbiAgICBpZihpc1Byb3RvKShleHBvcnRzW1BST1RPVFlQRV0gfHwgKGV4cG9ydHNbUFJPVE9UWVBFXSA9IHt9KSlba2V5XSA9IG91dDtcbiAgfVxufTtcbmdsb2JhbC5jb3JlID0gY29yZTtcbi8vIHR5cGUgYml0bWFwXG4kZGVmLkYgPSAxOyAgLy8gZm9yY2VkXG4kZGVmLkcgPSAyOyAgLy8gZ2xvYmFsXG4kZGVmLlMgPSA0OyAgLy8gc3RhdGljXG4kZGVmLlAgPSA4OyAgLy8gcHJvdG9cbiRkZWYuQiA9IDE2OyAvLyBiaW5kXG4kZGVmLlcgPSAzMjsgLy8gd3JhcFxubW9kdWxlLmV4cG9ydHMgPSAkZGVmOyIsIi8vIDcuMi4xIFJlcXVpcmVPYmplY3RDb2VyY2libGUoYXJndW1lbnQpXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgaWYoaXQgPT0gdW5kZWZpbmVkKXRocm93IFR5cGVFcnJvcihcIkNhbid0IGNhbGwgbWV0aG9kIG9uICBcIiArIGl0KTtcbiAgcmV0dXJuIGl0O1xufTsiLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLyQuaXMtb2JqZWN0JylcbiAgLCBkb2N1bWVudCA9IHJlcXVpcmUoJy4vJC5nbG9iYWwnKS5kb2N1bWVudFxuICAvLyBpbiBvbGQgSUUgdHlwZW9mIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgaXMgJ29iamVjdCdcbiAgLCBpcyA9IGlzT2JqZWN0KGRvY3VtZW50KSAmJiBpc09iamVjdChkb2N1bWVudC5jcmVhdGVFbGVtZW50KTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gaXMgPyBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGl0KSA6IHt9O1xufTsiLCIvLyBhbGwgZW51bWVyYWJsZSBvYmplY3Qga2V5cywgaW5jbHVkZXMgc3ltYm9sc1xudmFyICQgPSByZXF1aXJlKCcuLyQnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICB2YXIga2V5cyAgICAgICA9ICQuZ2V0S2V5cyhpdClcbiAgICAsIGdldFN5bWJvbHMgPSAkLmdldFN5bWJvbHM7XG4gIGlmKGdldFN5bWJvbHMpe1xuICAgIHZhciBzeW1ib2xzID0gZ2V0U3ltYm9scyhpdClcbiAgICAgICwgaXNFbnVtICA9ICQuaXNFbnVtXG4gICAgICAsIGkgICAgICAgPSAwXG4gICAgICAsIGtleTtcbiAgICB3aGlsZShzeW1ib2xzLmxlbmd0aCA+IGkpaWYoaXNFbnVtLmNhbGwoaXQsIGtleSA9IHN5bWJvbHNbaSsrXSkpa2V5cy5wdXNoKGtleSk7XG4gIH1cbiAgcmV0dXJuIGtleXM7XG59OyIsIi8vIDIwLjIuMi4xNCBNYXRoLmV4cG0xKHgpXG5tb2R1bGUuZXhwb3J0cyA9IE1hdGguZXhwbTEgfHwgZnVuY3Rpb24gZXhwbTEoeCl7XG4gIHJldHVybiAoeCA9ICt4KSA9PSAwID8geCA6IHggPiAtMWUtNiAmJiB4IDwgMWUtNiA/IHggKyB4ICogeCAvIDIgOiBNYXRoLmV4cCh4KSAtIDE7XG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZXhlYyl7XG4gIHRyeSB7XG4gICAgcmV0dXJuICEhZXhlYygpO1xuICB9IGNhdGNoKGUpe1xuICAgIHJldHVybiB0cnVlO1xuICB9XG59OyIsIid1c2Ugc3RyaWN0Jztcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oS0VZLCBsZW5ndGgsIGV4ZWMpe1xuICB2YXIgZGVmaW5lZCAgPSByZXF1aXJlKCcuLyQuZGVmaW5lZCcpXG4gICAgLCBTWU1CT0wgICA9IHJlcXVpcmUoJy4vJC53a3MnKShLRVkpXG4gICAgLCBvcmlnaW5hbCA9ICcnW0tFWV07XG4gIGlmKHJlcXVpcmUoJy4vJC5mYWlscycpKGZ1bmN0aW9uKCl7XG4gICAgdmFyIE8gPSB7fTtcbiAgICBPW1NZTUJPTF0gPSBmdW5jdGlvbigpeyByZXR1cm4gNzsgfTtcbiAgICByZXR1cm4gJydbS0VZXShPKSAhPSA3O1xuICB9KSl7XG4gICAgcmVxdWlyZSgnLi8kLnJlZGVmJykoU3RyaW5nLnByb3RvdHlwZSwgS0VZLCBleGVjKGRlZmluZWQsIFNZTUJPTCwgb3JpZ2luYWwpKTtcbiAgICByZXF1aXJlKCcuLyQuaGlkZScpKFJlZ0V4cC5wcm90b3R5cGUsIFNZTUJPTCwgbGVuZ3RoID09IDJcbiAgICAgIC8vIDIxLjIuNS44IFJlZ0V4cC5wcm90b3R5cGVbQEByZXBsYWNlXShzdHJpbmcsIHJlcGxhY2VWYWx1ZSlcbiAgICAgIC8vIDIxLjIuNS4xMSBSZWdFeHAucHJvdG90eXBlW0BAc3BsaXRdKHN0cmluZywgbGltaXQpXG4gICAgICA/IGZ1bmN0aW9uKHN0cmluZywgYXJnKXsgcmV0dXJuIG9yaWdpbmFsLmNhbGwoc3RyaW5nLCB0aGlzLCBhcmcpOyB9XG4gICAgICAvLyAyMS4yLjUuNiBSZWdFeHAucHJvdG90eXBlW0BAbWF0Y2hdKHN0cmluZylcbiAgICAgIC8vIDIxLjIuNS45IFJlZ0V4cC5wcm90b3R5cGVbQEBzZWFyY2hdKHN0cmluZylcbiAgICAgIDogZnVuY3Rpb24oc3RyaW5nKXsgcmV0dXJuIG9yaWdpbmFsLmNhbGwoc3RyaW5nLCB0aGlzKTsgfVxuICAgICk7XG4gIH1cbn07IiwiJ3VzZSBzdHJpY3QnO1xuLy8gMjEuMi41LjMgZ2V0IFJlZ0V4cC5wcm90b3R5cGUuZmxhZ3NcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vJC5hbi1vYmplY3QnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKXtcbiAgdmFyIHRoYXQgICA9IGFuT2JqZWN0KHRoaXMpXG4gICAgLCByZXN1bHQgPSAnJztcbiAgaWYodGhhdC5nbG9iYWwpcmVzdWx0ICs9ICdnJztcbiAgaWYodGhhdC5pZ25vcmVDYXNlKXJlc3VsdCArPSAnaSc7XG4gIGlmKHRoYXQubXVsdGlsaW5lKXJlc3VsdCArPSAnbSc7XG4gIGlmKHRoYXQudW5pY29kZSlyZXN1bHQgKz0gJ3UnO1xuICBpZih0aGF0LnN0aWNreSlyZXN1bHQgKz0gJ3knO1xuICByZXR1cm4gcmVzdWx0O1xufTsiLCJ2YXIgY3R4ICAgICAgICAgPSByZXF1aXJlKCcuLyQuY3R4JylcbiAgLCBjYWxsICAgICAgICA9IHJlcXVpcmUoJy4vJC5pdGVyLWNhbGwnKVxuICAsIGlzQXJyYXlJdGVyID0gcmVxdWlyZSgnLi8kLmlzLWFycmF5LWl0ZXInKVxuICAsIGFuT2JqZWN0ICAgID0gcmVxdWlyZSgnLi8kLmFuLW9iamVjdCcpXG4gICwgdG9MZW5ndGggICAgPSByZXF1aXJlKCcuLyQudG8tbGVuZ3RoJylcbiAgLCBnZXRJdGVyRm4gICA9IHJlcXVpcmUoJy4vY29yZS5nZXQtaXRlcmF0b3ItbWV0aG9kJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0ZXJhYmxlLCBlbnRyaWVzLCBmbiwgdGhhdCl7XG4gIHZhciBpdGVyRm4gPSBnZXRJdGVyRm4oaXRlcmFibGUpXG4gICAgLCBmICAgICAgPSBjdHgoZm4sIHRoYXQsIGVudHJpZXMgPyAyIDogMSlcbiAgICAsIGluZGV4ICA9IDBcbiAgICAsIGxlbmd0aCwgc3RlcCwgaXRlcmF0b3I7XG4gIGlmKHR5cGVvZiBpdGVyRm4gIT0gJ2Z1bmN0aW9uJyl0aHJvdyBUeXBlRXJyb3IoaXRlcmFibGUgKyAnIGlzIG5vdCBpdGVyYWJsZSEnKTtcbiAgLy8gZmFzdCBjYXNlIGZvciBhcnJheXMgd2l0aCBkZWZhdWx0IGl0ZXJhdG9yXG4gIGlmKGlzQXJyYXlJdGVyKGl0ZXJGbikpZm9yKGxlbmd0aCA9IHRvTGVuZ3RoKGl0ZXJhYmxlLmxlbmd0aCk7IGxlbmd0aCA+IGluZGV4OyBpbmRleCsrKXtcbiAgICBlbnRyaWVzID8gZihhbk9iamVjdChzdGVwID0gaXRlcmFibGVbaW5kZXhdKVswXSwgc3RlcFsxXSkgOiBmKGl0ZXJhYmxlW2luZGV4XSk7XG4gIH0gZWxzZSBmb3IoaXRlcmF0b3IgPSBpdGVyRm4uY2FsbChpdGVyYWJsZSk7ICEoc3RlcCA9IGl0ZXJhdG9yLm5leHQoKSkuZG9uZTsgKXtcbiAgICBjYWxsKGl0ZXJhdG9yLCBmLCBzdGVwLnZhbHVlLCBlbnRyaWVzKTtcbiAgfVxufTsiLCIvLyBmYWxsYmFjayBmb3IgSUUxMSBidWdneSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyB3aXRoIGlmcmFtZSBhbmQgd2luZG93XG52YXIgdG9TdHJpbmcgID0ge30udG9TdHJpbmdcbiAgLCB0b0lPYmplY3QgPSByZXF1aXJlKCcuLyQudG8taW9iamVjdCcpXG4gICwgZ2V0TmFtZXMgID0gcmVxdWlyZSgnLi8kJykuZ2V0TmFtZXM7XG5cbnZhciB3aW5kb3dOYW1lcyA9IHR5cGVvZiB3aW5kb3cgPT0gJ29iamVjdCcgJiYgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXNcbiAgPyBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh3aW5kb3cpIDogW107XG5cbnZhciBnZXRXaW5kb3dOYW1lcyA9IGZ1bmN0aW9uKGl0KXtcbiAgdHJ5IHtcbiAgICByZXR1cm4gZ2V0TmFtZXMoaXQpO1xuICB9IGNhdGNoKGUpe1xuICAgIHJldHVybiB3aW5kb3dOYW1lcy5zbGljZSgpO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cy5nZXQgPSBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eU5hbWVzKGl0KXtcbiAgaWYod2luZG93TmFtZXMgJiYgdG9TdHJpbmcuY2FsbChpdCkgPT0gJ1tvYmplY3QgV2luZG93XScpcmV0dXJuIGdldFdpbmRvd05hbWVzKGl0KTtcbiAgcmV0dXJuIGdldE5hbWVzKHRvSU9iamVjdChpdCkpO1xufTsiLCIvLyBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvODYjaXNzdWVjb21tZW50LTExNTc1OTAyOFxudmFyIFVOREVGSU5FRCA9ICd1bmRlZmluZWQnO1xudmFyIGdsb2JhbCA9IG1vZHVsZS5leHBvcnRzID0gdHlwZW9mIHdpbmRvdyAhPSBVTkRFRklORUQgJiYgd2luZG93Lk1hdGggPT0gTWF0aFxuICA/IHdpbmRvdyA6IHR5cGVvZiBzZWxmICE9IFVOREVGSU5FRCAmJiBzZWxmLk1hdGggPT0gTWF0aCA/IHNlbGYgOiBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuaWYodHlwZW9mIF9fZyA9PSAnbnVtYmVyJylfX2cgPSBnbG9iYWw7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWYiLCJ2YXIgaGFzT3duUHJvcGVydHkgPSB7fS5oYXNPd25Qcm9wZXJ0eTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQsIGtleSl7XG4gIHJldHVybiBoYXNPd25Qcm9wZXJ0eS5jYWxsKGl0LCBrZXkpO1xufTsiLCJ2YXIgJCAgICAgICAgICA9IHJlcXVpcmUoJy4vJCcpXG4gICwgY3JlYXRlRGVzYyA9IHJlcXVpcmUoJy4vJC5wcm9wZXJ0eS1kZXNjJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vJC5zdXBwb3J0LWRlc2MnKSA/IGZ1bmN0aW9uKG9iamVjdCwga2V5LCB2YWx1ZSl7XG4gIHJldHVybiAkLnNldERlc2Mob2JqZWN0LCBrZXksIGNyZWF0ZURlc2MoMSwgdmFsdWUpKTtcbn0gOiBmdW5jdGlvbihvYmplY3QsIGtleSwgdmFsdWUpe1xuICBvYmplY3Rba2V5XSA9IHZhbHVlO1xuICByZXR1cm4gb2JqZWN0O1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vJC5nbG9iYWwnKS5kb2N1bWVudCAmJiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7IiwiLy8gZmFzdCBhcHBseSwgaHR0cDovL2pzcGVyZi5sbmtpdC5jb20vZmFzdC1hcHBseS81XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGZuLCBhcmdzLCB0aGF0KXtcbiAgdmFyIHVuID0gdGhhdCA9PT0gdW5kZWZpbmVkO1xuICBzd2l0Y2goYXJncy5sZW5ndGgpe1xuICAgIGNhc2UgMDogcmV0dXJuIHVuID8gZm4oKVxuICAgICAgICAgICAgICAgICAgICAgIDogZm4uY2FsbCh0aGF0KTtcbiAgICBjYXNlIDE6IHJldHVybiB1biA/IGZuKGFyZ3NbMF0pXG4gICAgICAgICAgICAgICAgICAgICAgOiBmbi5jYWxsKHRoYXQsIGFyZ3NbMF0pO1xuICAgIGNhc2UgMjogcmV0dXJuIHVuID8gZm4oYXJnc1swXSwgYXJnc1sxXSlcbiAgICAgICAgICAgICAgICAgICAgICA6IGZuLmNhbGwodGhhdCwgYXJnc1swXSwgYXJnc1sxXSk7XG4gICAgY2FzZSAzOiByZXR1cm4gdW4gPyBmbihhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdKVxuICAgICAgICAgICAgICAgICAgICAgIDogZm4uY2FsbCh0aGF0LCBhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdKTtcbiAgICBjYXNlIDQ6IHJldHVybiB1biA/IGZuKGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0sIGFyZ3NbM10pXG4gICAgICAgICAgICAgICAgICAgICAgOiBmbi5jYWxsKHRoYXQsIGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0sIGFyZ3NbM10pO1xuICB9IHJldHVybiAgICAgICAgICAgICAgZm4uYXBwbHkodGhhdCwgYXJncyk7XG59OyIsIi8vIGluZGV4ZWQgb2JqZWN0LCBmYWxsYmFjayBmb3Igbm9uLWFycmF5LWxpa2UgRVMzIHN0cmluZ3NcbnZhciBjb2YgPSByZXF1aXJlKCcuLyQuY29mJyk7XG5tb2R1bGUuZXhwb3J0cyA9IDAgaW4gT2JqZWN0KCd6JykgPyBPYmplY3QgOiBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBjb2YoaXQpID09ICdTdHJpbmcnID8gaXQuc3BsaXQoJycpIDogT2JqZWN0KGl0KTtcbn07IiwiLy8gY2hlY2sgb24gZGVmYXVsdCBBcnJheSBpdGVyYXRvclxudmFyIEl0ZXJhdG9ycyA9IHJlcXVpcmUoJy4vJC5pdGVyYXRvcnMnKVxuICAsIElURVJBVE9SICA9IHJlcXVpcmUoJy4vJC53a3MnKSgnaXRlcmF0b3InKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gKEl0ZXJhdG9ycy5BcnJheSB8fCBBcnJheS5wcm90b3R5cGVbSVRFUkFUT1JdKSA9PT0gaXQ7XG59OyIsIi8vIDIwLjEuMi4zIE51bWJlci5pc0ludGVnZXIobnVtYmVyKVxudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi8kLmlzLW9iamVjdCcpXG4gICwgZmxvb3IgICAgPSBNYXRoLmZsb29yO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc0ludGVnZXIoaXQpe1xuICByZXR1cm4gIWlzT2JqZWN0KGl0KSAmJiBpc0Zpbml0ZShpdCkgJiYgZmxvb3IoaXQpID09PSBpdDtcbn07IiwiLy8gaHR0cDovL2pzcGVyZi5jb20vY29yZS1qcy1pc29iamVjdFxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBpdCAhPT0gbnVsbCAmJiAodHlwZW9mIGl0ID09ICdvYmplY3QnIHx8IHR5cGVvZiBpdCA9PSAnZnVuY3Rpb24nKTtcbn07IiwiLy8gY2FsbCBzb21ldGhpbmcgb24gaXRlcmF0b3Igc3RlcCB3aXRoIHNhZmUgY2xvc2luZyBvbiBlcnJvclxudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi8kLmFuLW9iamVjdCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdGVyYXRvciwgZm4sIHZhbHVlLCBlbnRyaWVzKXtcbiAgdHJ5IHtcbiAgICByZXR1cm4gZW50cmllcyA/IGZuKGFuT2JqZWN0KHZhbHVlKVswXSwgdmFsdWVbMV0pIDogZm4odmFsdWUpO1xuICAvLyA3LjQuNiBJdGVyYXRvckNsb3NlKGl0ZXJhdG9yLCBjb21wbGV0aW9uKVxuICB9IGNhdGNoKGUpe1xuICAgIHZhciByZXQgPSBpdGVyYXRvclsncmV0dXJuJ107XG4gICAgaWYocmV0ICE9PSB1bmRlZmluZWQpYW5PYmplY3QocmV0LmNhbGwoaXRlcmF0b3IpKTtcbiAgICB0aHJvdyBlO1xuICB9XG59OyIsIid1c2Ugc3RyaWN0JztcbnZhciAkID0gcmVxdWlyZSgnLi8kJylcbiAgLCBJdGVyYXRvclByb3RvdHlwZSA9IHt9O1xuXG4vLyAyNS4xLjIuMS4xICVJdGVyYXRvclByb3RvdHlwZSVbQEBpdGVyYXRvcl0oKVxucmVxdWlyZSgnLi8kLmhpZGUnKShJdGVyYXRvclByb3RvdHlwZSwgcmVxdWlyZSgnLi8kLndrcycpKCdpdGVyYXRvcicpLCBmdW5jdGlvbigpeyByZXR1cm4gdGhpczsgfSk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oQ29uc3RydWN0b3IsIE5BTUUsIG5leHQpe1xuICBDb25zdHJ1Y3Rvci5wcm90b3R5cGUgPSAkLmNyZWF0ZShJdGVyYXRvclByb3RvdHlwZSwge25leHQ6IHJlcXVpcmUoJy4vJC5wcm9wZXJ0eS1kZXNjJykoMSxuZXh0KX0pO1xuICByZXF1aXJlKCcuLyQudGFnJykoQ29uc3RydWN0b3IsIE5BTUUgKyAnIEl0ZXJhdG9yJyk7XG59OyIsIid1c2Ugc3RyaWN0JztcbnZhciBMSUJSQVJZICAgICAgICAgPSByZXF1aXJlKCcuLyQubGlicmFyeScpXG4gICwgJGRlZiAgICAgICAgICAgID0gcmVxdWlyZSgnLi8kLmRlZicpXG4gICwgJHJlZGVmICAgICAgICAgID0gcmVxdWlyZSgnLi8kLnJlZGVmJylcbiAgLCBoaWRlICAgICAgICAgICAgPSByZXF1aXJlKCcuLyQuaGlkZScpXG4gICwgaGFzICAgICAgICAgICAgID0gcmVxdWlyZSgnLi8kLmhhcycpXG4gICwgU1lNQk9MX0lURVJBVE9SID0gcmVxdWlyZSgnLi8kLndrcycpKCdpdGVyYXRvcicpXG4gICwgSXRlcmF0b3JzICAgICAgID0gcmVxdWlyZSgnLi8kLml0ZXJhdG9ycycpXG4gICwgQlVHR1kgICAgICAgICAgID0gIShbXS5rZXlzICYmICduZXh0JyBpbiBbXS5rZXlzKCkpIC8vIFNhZmFyaSBoYXMgYnVnZ3kgaXRlcmF0b3JzIHcvbyBgbmV4dGBcbiAgLCBGRl9JVEVSQVRPUiAgICAgPSAnQEBpdGVyYXRvcidcbiAgLCBLRVlTICAgICAgICAgICAgPSAna2V5cydcbiAgLCBWQUxVRVMgICAgICAgICAgPSAndmFsdWVzJztcbnZhciByZXR1cm5UaGlzID0gZnVuY3Rpb24oKXsgcmV0dXJuIHRoaXM7IH07XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKEJhc2UsIE5BTUUsIENvbnN0cnVjdG9yLCBuZXh0LCBERUZBVUxULCBJU19TRVQsIEZPUkNFKXtcbiAgcmVxdWlyZSgnLi8kLml0ZXItY3JlYXRlJykoQ29uc3RydWN0b3IsIE5BTUUsIG5leHQpO1xuICB2YXIgY3JlYXRlTWV0aG9kID0gZnVuY3Rpb24oa2luZCl7XG4gICAgc3dpdGNoKGtpbmQpe1xuICAgICAgY2FzZSBLRVlTOiByZXR1cm4gZnVuY3Rpb24ga2V5cygpeyByZXR1cm4gbmV3IENvbnN0cnVjdG9yKHRoaXMsIGtpbmQpOyB9O1xuICAgICAgY2FzZSBWQUxVRVM6IHJldHVybiBmdW5jdGlvbiB2YWx1ZXMoKXsgcmV0dXJuIG5ldyBDb25zdHJ1Y3Rvcih0aGlzLCBraW5kKTsgfTtcbiAgICB9IHJldHVybiBmdW5jdGlvbiBlbnRyaWVzKCl7IHJldHVybiBuZXcgQ29uc3RydWN0b3IodGhpcywga2luZCk7IH07XG4gIH07XG4gIHZhciBUQUcgICAgICA9IE5BTUUgKyAnIEl0ZXJhdG9yJ1xuICAgICwgcHJvdG8gICAgPSBCYXNlLnByb3RvdHlwZVxuICAgICwgX25hdGl2ZSAgPSBwcm90b1tTWU1CT0xfSVRFUkFUT1JdIHx8IHByb3RvW0ZGX0lURVJBVE9SXSB8fCBERUZBVUxUICYmIHByb3RvW0RFRkFVTFRdXG4gICAgLCBfZGVmYXVsdCA9IF9uYXRpdmUgfHwgY3JlYXRlTWV0aG9kKERFRkFVTFQpXG4gICAgLCBtZXRob2RzLCBrZXk7XG4gIC8vIEZpeCBuYXRpdmVcbiAgaWYoX25hdGl2ZSl7XG4gICAgdmFyIEl0ZXJhdG9yUHJvdG90eXBlID0gcmVxdWlyZSgnLi8kJykuZ2V0UHJvdG8oX2RlZmF1bHQuY2FsbChuZXcgQmFzZSkpO1xuICAgIC8vIFNldCBAQHRvU3RyaW5nVGFnIHRvIG5hdGl2ZSBpdGVyYXRvcnNcbiAgICByZXF1aXJlKCcuLyQudGFnJykoSXRlcmF0b3JQcm90b3R5cGUsIFRBRywgdHJ1ZSk7XG4gICAgLy8gRkYgZml4XG4gICAgaWYoIUxJQlJBUlkgJiYgaGFzKHByb3RvLCBGRl9JVEVSQVRPUikpaGlkZShJdGVyYXRvclByb3RvdHlwZSwgU1lNQk9MX0lURVJBVE9SLCByZXR1cm5UaGlzKTtcbiAgfVxuICAvLyBEZWZpbmUgaXRlcmF0b3JcbiAgaWYoIUxJQlJBUlkgfHwgRk9SQ0UpaGlkZShwcm90bywgU1lNQk9MX0lURVJBVE9SLCBfZGVmYXVsdCk7XG4gIC8vIFBsdWcgZm9yIGxpYnJhcnlcbiAgSXRlcmF0b3JzW05BTUVdID0gX2RlZmF1bHQ7XG4gIEl0ZXJhdG9yc1tUQUddICA9IHJldHVyblRoaXM7XG4gIGlmKERFRkFVTFQpe1xuICAgIG1ldGhvZHMgPSB7XG4gICAgICBrZXlzOiAgICBJU19TRVQgICAgICAgICAgICA/IF9kZWZhdWx0IDogY3JlYXRlTWV0aG9kKEtFWVMpLFxuICAgICAgdmFsdWVzOiAgREVGQVVMVCA9PSBWQUxVRVMgPyBfZGVmYXVsdCA6IGNyZWF0ZU1ldGhvZChWQUxVRVMpLFxuICAgICAgZW50cmllczogREVGQVVMVCAhPSBWQUxVRVMgPyBfZGVmYXVsdCA6IGNyZWF0ZU1ldGhvZCgnZW50cmllcycpXG4gICAgfTtcbiAgICBpZihGT1JDRSlmb3Ioa2V5IGluIG1ldGhvZHMpe1xuICAgICAgaWYoIShrZXkgaW4gcHJvdG8pKSRyZWRlZihwcm90bywga2V5LCBtZXRob2RzW2tleV0pO1xuICAgIH0gZWxzZSAkZGVmKCRkZWYuUCArICRkZWYuRiAqIEJVR0dZLCBOQU1FLCBtZXRob2RzKTtcbiAgfVxufTsiLCJ2YXIgU1lNQk9MX0lURVJBVE9SID0gcmVxdWlyZSgnLi8kLndrcycpKCdpdGVyYXRvcicpXG4gICwgU0FGRV9DTE9TSU5HICAgID0gZmFsc2U7XG50cnkge1xuICB2YXIgcml0ZXIgPSBbN11bU1lNQk9MX0lURVJBVE9SXSgpO1xuICByaXRlclsncmV0dXJuJ10gPSBmdW5jdGlvbigpeyBTQUZFX0NMT1NJTkcgPSB0cnVlOyB9O1xuICBBcnJheS5mcm9tKHJpdGVyLCBmdW5jdGlvbigpeyB0aHJvdyAyOyB9KTtcbn0gY2F0Y2goZSl7IC8qIGVtcHR5ICovIH1cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZXhlYyl7XG4gIGlmKCFTQUZFX0NMT1NJTkcpcmV0dXJuIGZhbHNlO1xuICB2YXIgc2FmZSA9IGZhbHNlO1xuICB0cnkge1xuICAgIHZhciBhcnIgID0gWzddXG4gICAgICAsIGl0ZXIgPSBhcnJbU1lNQk9MX0lURVJBVE9SXSgpO1xuICAgIGl0ZXIubmV4dCA9IGZ1bmN0aW9uKCl7IHNhZmUgPSB0cnVlOyB9O1xuICAgIGFycltTWU1CT0xfSVRFUkFUT1JdID0gZnVuY3Rpb24oKXsgcmV0dXJuIGl0ZXI7IH07XG4gICAgZXhlYyhhcnIpO1xuICB9IGNhdGNoKGUpeyAvKiBlbXB0eSAqLyB9XG4gIHJldHVybiBzYWZlO1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGRvbmUsIHZhbHVlKXtcbiAgcmV0dXJuIHt2YWx1ZTogdmFsdWUsIGRvbmU6ICEhZG9uZX07XG59OyIsIm1vZHVsZS5leHBvcnRzID0ge307IiwidmFyICRPYmplY3QgPSBPYmplY3Q7XG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgY3JlYXRlOiAgICAgJE9iamVjdC5jcmVhdGUsXG4gIGdldFByb3RvOiAgICRPYmplY3QuZ2V0UHJvdG90eXBlT2YsXG4gIGlzRW51bTogICAgIHt9LnByb3BlcnR5SXNFbnVtZXJhYmxlLFxuICBnZXREZXNjOiAgICAkT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcixcbiAgc2V0RGVzYzogICAgJE9iamVjdC5kZWZpbmVQcm9wZXJ0eSxcbiAgc2V0RGVzY3M6ICAgJE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzLFxuICBnZXRLZXlzOiAgICAkT2JqZWN0LmtleXMsXG4gIGdldE5hbWVzOiAgICRPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyxcbiAgZ2V0U3ltYm9sczogJE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMsXG4gIGVhY2g6ICAgICAgIFtdLmZvckVhY2hcbn07IiwidmFyICQgICAgICAgICA9IHJlcXVpcmUoJy4vJCcpXG4gICwgdG9JT2JqZWN0ID0gcmVxdWlyZSgnLi8kLnRvLWlvYmplY3QnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ob2JqZWN0LCBlbCl7XG4gIHZhciBPICAgICAgPSB0b0lPYmplY3Qob2JqZWN0KVxuICAgICwga2V5cyAgID0gJC5nZXRLZXlzKE8pXG4gICAgLCBsZW5ndGggPSBrZXlzLmxlbmd0aFxuICAgICwgaW5kZXggID0gMFxuICAgICwga2V5O1xuICB3aGlsZShsZW5ndGggPiBpbmRleClpZihPW2tleSA9IGtleXNbaW5kZXgrK11dID09PSBlbClyZXR1cm4ga2V5O1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZhbHNlOyIsIi8vIDIwLjIuMi4yMCBNYXRoLmxvZzFwKHgpXHJcbm1vZHVsZS5leHBvcnRzID0gTWF0aC5sb2cxcCB8fCBmdW5jdGlvbiBsb2cxcCh4KXtcclxuICByZXR1cm4gKHggPSAreCkgPiAtMWUtOCAmJiB4IDwgMWUtOCA/IHggLSB4ICogeCAvIDIgOiBNYXRoLmxvZygxICsgeCk7XHJcbn07IiwidmFyIGdsb2JhbCAgICA9IHJlcXVpcmUoJy4vJC5nbG9iYWwnKVxyXG4gICwgbWFjcm90YXNrID0gcmVxdWlyZSgnLi8kLnRhc2snKS5zZXRcclxuICAsIE9ic2VydmVyICA9IGdsb2JhbC5NdXRhdGlvbk9ic2VydmVyIHx8IGdsb2JhbC5XZWJLaXRNdXRhdGlvbk9ic2VydmVyXHJcbiAgLCBwcm9jZXNzICAgPSBnbG9iYWwucHJvY2Vzc1xyXG4gICwgaXNOb2RlICAgID0gcmVxdWlyZSgnLi8kLmNvZicpKHByb2Nlc3MpID09ICdwcm9jZXNzJ1xyXG4gICwgaGVhZCwgbGFzdCwgbm90aWZ5O1xyXG5cclxudmFyIGZsdXNoID0gZnVuY3Rpb24oKXtcclxuICB2YXIgcGFyZW50LCBkb21haW47XHJcbiAgaWYoaXNOb2RlICYmIChwYXJlbnQgPSBwcm9jZXNzLmRvbWFpbikpe1xyXG4gICAgcHJvY2Vzcy5kb21haW4gPSBudWxsO1xyXG4gICAgcGFyZW50LmV4aXQoKTtcclxuICB9XHJcbiAgd2hpbGUoaGVhZCl7XHJcbiAgICBkb21haW4gPSBoZWFkLmRvbWFpbjtcclxuICAgIGlmKGRvbWFpbilkb21haW4uZW50ZXIoKTtcclxuICAgIGhlYWQuZm4uY2FsbCgpOyAvLyA8LSBjdXJyZW50bHkgd2UgdXNlIGl0IG9ubHkgZm9yIFByb21pc2UgLSB0cnkgLyBjYXRjaCBub3QgcmVxdWlyZWRcclxuICAgIGlmKGRvbWFpbilkb21haW4uZXhpdCgpO1xyXG4gICAgaGVhZCA9IGhlYWQubmV4dDtcclxuICB9IGxhc3QgPSB1bmRlZmluZWQ7XHJcbiAgaWYocGFyZW50KXBhcmVudC5lbnRlcigpO1xyXG59XHJcblxyXG4vLyBOb2RlLmpzXHJcbmlmKGlzTm9kZSl7XHJcbiAgbm90aWZ5ID0gZnVuY3Rpb24oKXtcclxuICAgIHByb2Nlc3MubmV4dFRpY2soZmx1c2gpO1xyXG4gIH07XHJcbi8vIGJyb3dzZXJzIHdpdGggTXV0YXRpb25PYnNlcnZlclxyXG59IGVsc2UgaWYoT2JzZXJ2ZXIpe1xyXG4gIHZhciB0b2dnbGUgPSAxXHJcbiAgICAsIG5vZGUgICA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCcnKTtcclxuICBuZXcgT2JzZXJ2ZXIoZmx1c2gpLm9ic2VydmUobm9kZSwge2NoYXJhY3RlckRhdGE6IHRydWV9KTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1uZXdcclxuICBub3RpZnkgPSBmdW5jdGlvbigpe1xyXG4gICAgbm9kZS5kYXRhID0gdG9nZ2xlID0gLXRvZ2dsZTtcclxuICB9O1xyXG4vLyBmb3Igb3RoZXIgZW52aXJvbm1lbnRzIC0gbWFjcm90YXNrIGJhc2VkIG9uOlxyXG4vLyAtIHNldEltbWVkaWF0ZVxyXG4vLyAtIE1lc3NhZ2VDaGFubmVsXHJcbi8vIC0gd2luZG93LnBvc3RNZXNzYWdcclxuLy8gLSBvbnJlYWR5c3RhdGVjaGFuZ2VcclxuLy8gLSBzZXRUaW1lb3V0XHJcbn0gZWxzZSB7XHJcbiAgbm90aWZ5ID0gZnVuY3Rpb24oKXtcclxuICAgIC8vIHN0cmFuZ2UgSUUgKyB3ZWJwYWNrIGRldiBzZXJ2ZXIgYnVnIC0gdXNlIC5jYWxsKGdsb2JhbClcclxuICAgIG1hY3JvdGFzay5jYWxsKGdsb2JhbCwgZmx1c2gpO1xyXG4gIH07XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYXNhcChmbil7XHJcbiAgdmFyIHRhc2sgPSB7Zm46IGZuLCBuZXh0OiB1bmRlZmluZWQsIGRvbWFpbjogaXNOb2RlICYmIHByb2Nlc3MuZG9tYWlufTtcclxuICBpZihsYXN0KWxhc3QubmV4dCA9IHRhc2s7XHJcbiAgaWYoIWhlYWQpe1xyXG4gICAgaGVhZCA9IHRhc2s7XHJcbiAgICBub3RpZnkoKTtcclxuICB9IGxhc3QgPSB0YXNrO1xyXG59OyIsInZhciAkcmVkZWYgPSByZXF1aXJlKCcuLyQucmVkZWYnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24odGFyZ2V0LCBzcmMpe1xuICBmb3IodmFyIGtleSBpbiBzcmMpJHJlZGVmKHRhcmdldCwga2V5LCBzcmNba2V5XSk7XG4gIHJldHVybiB0YXJnZXQ7XG59OyIsIi8vIG1vc3QgT2JqZWN0IG1ldGhvZHMgYnkgRVM2IHNob3VsZCBhY2NlcHQgcHJpbWl0aXZlc1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihLRVksIGV4ZWMpe1xuICB2YXIgJGRlZiA9IHJlcXVpcmUoJy4vJC5kZWYnKVxuICAgICwgZm4gICA9IChyZXF1aXJlKCcuLyQuY29yZScpLk9iamVjdCB8fCB7fSlbS0VZXSB8fCBPYmplY3RbS0VZXVxuICAgICwgZXhwICA9IHt9O1xuICBleHBbS0VZXSA9IGV4ZWMoZm4pO1xuICAkZGVmKCRkZWYuUyArICRkZWYuRiAqIHJlcXVpcmUoJy4vJC5mYWlscycpKGZ1bmN0aW9uKCl7IGZuKDEpOyB9KSwgJ09iamVjdCcsIGV4cCk7XG59OyIsInZhciAkICAgICAgICAgPSByZXF1aXJlKCcuLyQnKVxuICAsIHRvSU9iamVjdCA9IHJlcXVpcmUoJy4vJC50by1pb2JqZWN0Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGlzRW50cmllcyl7XG4gIHJldHVybiBmdW5jdGlvbihpdCl7XG4gICAgdmFyIE8gICAgICA9IHRvSU9iamVjdChpdClcbiAgICAgICwga2V5cyAgID0gJC5nZXRLZXlzKE8pXG4gICAgICAsIGxlbmd0aCA9IGtleXMubGVuZ3RoXG4gICAgICAsIGkgICAgICA9IDBcbiAgICAgICwgcmVzdWx0ID0gQXJyYXkobGVuZ3RoKVxuICAgICAgLCBrZXk7XG4gICAgaWYoaXNFbnRyaWVzKXdoaWxlKGxlbmd0aCA+IGkpcmVzdWx0W2ldID0gW2tleSA9IGtleXNbaSsrXSwgT1trZXldXTtcbiAgICBlbHNlIHdoaWxlKGxlbmd0aCA+IGkpcmVzdWx0W2ldID0gT1trZXlzW2krK11dO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG59OyIsIi8vIGFsbCBvYmplY3Qga2V5cywgaW5jbHVkZXMgbm9uLWVudW1lcmFibGUgYW5kIHN5bWJvbHNcbnZhciAkICAgICAgICA9IHJlcXVpcmUoJy4vJCcpXG4gICwgYW5PYmplY3QgPSByZXF1aXJlKCcuLyQuYW4tb2JqZWN0JylcbiAgLCBSZWZsZWN0ICA9IHJlcXVpcmUoJy4vJC5nbG9iYWwnKS5SZWZsZWN0O1xubW9kdWxlLmV4cG9ydHMgPSBSZWZsZWN0ICYmIFJlZmxlY3Qub3duS2V5cyB8fCBmdW5jdGlvbiBvd25LZXlzKGl0KXtcbiAgdmFyIGtleXMgICAgICAgPSAkLmdldE5hbWVzKGFuT2JqZWN0KGl0KSlcbiAgICAsIGdldFN5bWJvbHMgPSAkLmdldFN5bWJvbHM7XG4gIHJldHVybiBnZXRTeW1ib2xzID8ga2V5cy5jb25jYXQoZ2V0U3ltYm9scyhpdCkpIDoga2V5cztcbn07IiwiJ3VzZSBzdHJpY3QnO1xudmFyIHBhdGggICAgICA9IHJlcXVpcmUoJy4vJC5wYXRoJylcbiAgLCBpbnZva2UgICAgPSByZXF1aXJlKCcuLyQuaW52b2tlJylcbiAgLCBhRnVuY3Rpb24gPSByZXF1aXJlKCcuLyQuYS1mdW5jdGlvbicpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigvKiAuLi5wYXJncyAqLyl7XG4gIHZhciBmbiAgICAgPSBhRnVuY3Rpb24odGhpcylcbiAgICAsIGxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGhcbiAgICAsIHBhcmdzICA9IEFycmF5KGxlbmd0aClcbiAgICAsIGkgICAgICA9IDBcbiAgICAsIF8gICAgICA9IHBhdGguX1xuICAgICwgaG9sZGVyID0gZmFsc2U7XG4gIHdoaWxlKGxlbmd0aCA+IGkpaWYoKHBhcmdzW2ldID0gYXJndW1lbnRzW2krK10pID09PSBfKWhvbGRlciA9IHRydWU7XG4gIHJldHVybiBmdW5jdGlvbigvKiAuLi5hcmdzICovKXtcbiAgICB2YXIgdGhhdCAgICA9IHRoaXNcbiAgICAgICwgX2xlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGhcbiAgICAgICwgaiA9IDAsIGsgPSAwLCBhcmdzO1xuICAgIGlmKCFob2xkZXIgJiYgIV9sZW5ndGgpcmV0dXJuIGludm9rZShmbiwgcGFyZ3MsIHRoYXQpO1xuICAgIGFyZ3MgPSBwYXJncy5zbGljZSgpO1xuICAgIGlmKGhvbGRlcilmb3IoO2xlbmd0aCA+IGo7IGorKylpZihhcmdzW2pdID09PSBfKWFyZ3Nbal0gPSBhcmd1bWVudHNbaysrXTtcbiAgICB3aGlsZShfbGVuZ3RoID4gaylhcmdzLnB1c2goYXJndW1lbnRzW2srK10pO1xuICAgIHJldHVybiBpbnZva2UoZm4sIGFyZ3MsIHRoYXQpO1xuICB9O1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vJC5nbG9iYWwnKTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGJpdG1hcCwgdmFsdWUpe1xuICByZXR1cm4ge1xuICAgIGVudW1lcmFibGUgIDogIShiaXRtYXAgJiAxKSxcbiAgICBjb25maWd1cmFibGU6ICEoYml0bWFwICYgMiksXG4gICAgd3JpdGFibGUgICAgOiAhKGJpdG1hcCAmIDQpLFxuICAgIHZhbHVlICAgICAgIDogdmFsdWVcbiAgfTtcbn07IiwiLy8gYWRkIGZha2UgRnVuY3Rpb24jdG9TdHJpbmdcbi8vIGZvciBjb3JyZWN0IHdvcmsgd3JhcHBlZCBtZXRob2RzIC8gY29uc3RydWN0b3JzIHdpdGggbWV0aG9kcyBsaWtlIExvRGFzaCBpc05hdGl2ZVxudmFyIGdsb2JhbCAgICA9IHJlcXVpcmUoJy4vJC5nbG9iYWwnKVxuICAsIGhpZGUgICAgICA9IHJlcXVpcmUoJy4vJC5oaWRlJylcbiAgLCBTUkMgICAgICAgPSByZXF1aXJlKCcuLyQudWlkJykoJ3NyYycpXG4gICwgVE9fU1RSSU5HID0gJ3RvU3RyaW5nJ1xuICAsICR0b1N0cmluZyA9IEZ1bmN0aW9uW1RPX1NUUklOR11cbiAgLCBUUEwgICAgICAgPSAoJycgKyAkdG9TdHJpbmcpLnNwbGl0KFRPX1NUUklORyk7XG5cbnJlcXVpcmUoJy4vJC5jb3JlJykuaW5zcGVjdFNvdXJjZSA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuICR0b1N0cmluZy5jYWxsKGl0KTtcbn07XG5cbihtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKE8sIGtleSwgdmFsLCBzYWZlKXtcbiAgaWYodHlwZW9mIHZhbCA9PSAnZnVuY3Rpb24nKXtcbiAgICBoaWRlKHZhbCwgU1JDLCBPW2tleV0gPyAnJyArIE9ba2V5XSA6IFRQTC5qb2luKFN0cmluZyhrZXkpKSk7XG4gICAgaWYoISgnbmFtZScgaW4gdmFsKSl2YWwubmFtZSA9IGtleTtcbiAgfVxuICBpZihPID09PSBnbG9iYWwpe1xuICAgIE9ba2V5XSA9IHZhbDtcbiAgfSBlbHNlIHtcbiAgICBpZighc2FmZSlkZWxldGUgT1trZXldO1xuICAgIGhpZGUoTywga2V5LCB2YWwpO1xuICB9XG59KShGdW5jdGlvbi5wcm90b3R5cGUsIFRPX1NUUklORywgZnVuY3Rpb24gdG9TdHJpbmcoKXtcbiAgcmV0dXJuIHR5cGVvZiB0aGlzID09ICdmdW5jdGlvbicgJiYgdGhpc1tTUkNdIHx8ICR0b1N0cmluZy5jYWxsKHRoaXMpO1xufSk7IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihyZWdFeHAsIHJlcGxhY2Upe1xuICB2YXIgcmVwbGFjZXIgPSByZXBsYWNlID09PSBPYmplY3QocmVwbGFjZSkgPyBmdW5jdGlvbihwYXJ0KXtcbiAgICByZXR1cm4gcmVwbGFjZVtwYXJ0XTtcbiAgfSA6IHJlcGxhY2U7XG4gIHJldHVybiBmdW5jdGlvbihpdCl7XG4gICAgcmV0dXJuIFN0cmluZyhpdCkucmVwbGFjZShyZWdFeHAsIHJlcGxhY2VyKTtcbiAgfTtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuaXMgfHwgZnVuY3Rpb24gaXMoeCwgeSl7XG4gIHJldHVybiB4ID09PSB5ID8geCAhPT0gMCB8fCAxIC8geCA9PT0gMSAvIHkgOiB4ICE9IHggJiYgeSAhPSB5O1xufTsiLCIvLyBXb3JrcyB3aXRoIF9fcHJvdG9fXyBvbmx5LiBPbGQgdjggY2FuJ3Qgd29yayB3aXRoIG51bGwgcHJvdG8gb2JqZWN0cy5cbi8qIGVzbGludC1kaXNhYmxlIG5vLXByb3RvICovXG52YXIgZ2V0RGVzYyAgPSByZXF1aXJlKCcuLyQnKS5nZXREZXNjXG4gICwgaXNPYmplY3QgPSByZXF1aXJlKCcuLyQuaXMtb2JqZWN0JylcbiAgLCBhbk9iamVjdCA9IHJlcXVpcmUoJy4vJC5hbi1vYmplY3QnKTtcbnZhciBjaGVjayA9IGZ1bmN0aW9uKE8sIHByb3RvKXtcbiAgYW5PYmplY3QoTyk7XG4gIGlmKCFpc09iamVjdChwcm90bykgJiYgcHJvdG8gIT09IG51bGwpdGhyb3cgVHlwZUVycm9yKHByb3RvICsgXCI6IGNhbid0IHNldCBhcyBwcm90b3R5cGUhXCIpO1xufTtcbm1vZHVsZS5leHBvcnRzID0ge1xuICBzZXQ6IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fCAoJ19fcHJvdG9fXycgaW4ge30gLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgID8gZnVuY3Rpb24oYnVnZ3ksIHNldCl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgc2V0ID0gcmVxdWlyZSgnLi8kLmN0eCcpKEZ1bmN0aW9uLmNhbGwsIGdldERlc2MoT2JqZWN0LnByb3RvdHlwZSwgJ19fcHJvdG9fXycpLnNldCwgMik7XG4gICAgICAgICAgc2V0KHt9LCBbXSk7XG4gICAgICAgIH0gY2F0Y2goZSl7IGJ1Z2d5ID0gdHJ1ZTsgfVxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gc2V0UHJvdG90eXBlT2YoTywgcHJvdG8pe1xuICAgICAgICAgIGNoZWNrKE8sIHByb3RvKTtcbiAgICAgICAgICBpZihidWdneSlPLl9fcHJvdG9fXyA9IHByb3RvO1xuICAgICAgICAgIGVsc2Ugc2V0KE8sIHByb3RvKTtcbiAgICAgICAgICByZXR1cm4gTztcbiAgICAgICAgfTtcbiAgICAgIH0oKVxuICAgIDogdW5kZWZpbmVkKSxcbiAgY2hlY2s6IGNoZWNrXG59OyIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLyQuZ2xvYmFsJylcbiAgLCBTSEFSRUQgPSAnX19jb3JlLWpzX3NoYXJlZF9fJ1xuICAsIHN0b3JlICA9IGdsb2JhbFtTSEFSRURdIHx8IChnbG9iYWxbU0hBUkVEXSA9IHt9KTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oa2V5KXtcbiAgcmV0dXJuIHN0b3JlW2tleV0gfHwgKHN0b3JlW2tleV0gPSB7fSk7XG59OyIsIi8vIDIwLjIuMi4yOCBNYXRoLnNpZ24oeClcbm1vZHVsZS5leHBvcnRzID0gTWF0aC5zaWduIHx8IGZ1bmN0aW9uIHNpZ24oeCl7XG4gIHJldHVybiAoeCA9ICt4KSA9PSAwIHx8IHggIT0geCA/IHggOiB4IDwgMCA/IC0xIDogMTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xudmFyICQgICAgICAgPSByZXF1aXJlKCcuLyQnKVxuICAsIFNQRUNJRVMgPSByZXF1aXJlKCcuLyQud2tzJykoJ3NwZWNpZXMnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oQyl7XG4gIGlmKHJlcXVpcmUoJy4vJC5zdXBwb3J0LWRlc2MnKSAmJiAhKFNQRUNJRVMgaW4gQykpJC5zZXREZXNjKEMsIFNQRUNJRVMsIHtcbiAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgZ2V0OiBmdW5jdGlvbigpeyByZXR1cm4gdGhpczsgfVxuICB9KTtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCwgQ29uc3RydWN0b3IsIG5hbWUpe1xuICBpZighKGl0IGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKXRocm93IFR5cGVFcnJvcihuYW1lICsgXCI6IHVzZSB0aGUgJ25ldycgb3BlcmF0b3IhXCIpO1xuICByZXR1cm4gaXQ7XG59OyIsIi8vIHRydWUgIC0+IFN0cmluZyNhdFxuLy8gZmFsc2UgLT4gU3RyaW5nI2NvZGVQb2ludEF0XG52YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi8kLnRvLWludGVnZXInKVxuICAsIGRlZmluZWQgICA9IHJlcXVpcmUoJy4vJC5kZWZpbmVkJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKFRPX1NUUklORyl7XG4gIHJldHVybiBmdW5jdGlvbih0aGF0LCBwb3Mpe1xuICAgIHZhciBzID0gU3RyaW5nKGRlZmluZWQodGhhdCkpXG4gICAgICAsIGkgPSB0b0ludGVnZXIocG9zKVxuICAgICAgLCBsID0gcy5sZW5ndGhcbiAgICAgICwgYSwgYjtcbiAgICBpZihpIDwgMCB8fCBpID49IGwpcmV0dXJuIFRPX1NUUklORyA/ICcnIDogdW5kZWZpbmVkO1xuICAgIGEgPSBzLmNoYXJDb2RlQXQoaSk7XG4gICAgcmV0dXJuIGEgPCAweGQ4MDAgfHwgYSA+IDB4ZGJmZiB8fCBpICsgMSA9PT0gbFxuICAgICAgfHwgKGIgPSBzLmNoYXJDb2RlQXQoaSArIDEpKSA8IDB4ZGMwMCB8fCBiID4gMHhkZmZmXG4gICAgICAgID8gVE9fU1RSSU5HID8gcy5jaGFyQXQoaSkgOiBhXG4gICAgICAgIDogVE9fU1RSSU5HID8gcy5zbGljZShpLCBpICsgMikgOiAoYSAtIDB4ZDgwMCA8PCAxMCkgKyAoYiAtIDB4ZGMwMCkgKyAweDEwMDAwO1xuICB9O1xufTsiLCIvLyBoZWxwZXIgZm9yIFN0cmluZyN7c3RhcnRzV2l0aCwgZW5kc1dpdGgsIGluY2x1ZGVzfVxudmFyIGRlZmluZWQgPSByZXF1aXJlKCcuLyQuZGVmaW5lZCcpXG4gICwgY29mICAgICA9IHJlcXVpcmUoJy4vJC5jb2YnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih0aGF0LCBzZWFyY2hTdHJpbmcsIE5BTUUpe1xuICBpZihjb2Yoc2VhcmNoU3RyaW5nKSA9PSAnUmVnRXhwJyl0aHJvdyBUeXBlRXJyb3IoJ1N0cmluZyMnICsgTkFNRSArIFwiIGRvZXNuJ3QgYWNjZXB0IHJlZ2V4IVwiKTtcbiAgcmV0dXJuIFN0cmluZyhkZWZpbmVkKHRoYXQpKTtcbn07IiwiLy8gaHR0cHM6Ly9naXRodWIuY29tL2xqaGFyYi9wcm9wb3NhbC1zdHJpbmctcGFkLWxlZnQtcmlnaHRcbnZhciB0b0xlbmd0aCA9IHJlcXVpcmUoJy4vJC50by1sZW5ndGgnKVxuICAsIHJlcGVhdCAgID0gcmVxdWlyZSgnLi8kLnN0cmluZy1yZXBlYXQnKVxuICAsIGRlZmluZWQgID0gcmVxdWlyZSgnLi8kLmRlZmluZWQnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih0aGF0LCBtYXhMZW5ndGgsIGZpbGxTdHJpbmcsIGxlZnQpe1xuICB2YXIgUyAgICAgICAgICAgID0gU3RyaW5nKGRlZmluZWQodGhhdCkpXG4gICAgLCBzdHJpbmdMZW5ndGggPSBTLmxlbmd0aFxuICAgICwgZmlsbFN0ciAgICAgID0gZmlsbFN0cmluZyA9PT0gdW5kZWZpbmVkID8gJyAnIDogU3RyaW5nKGZpbGxTdHJpbmcpXG4gICAgLCBpbnRNYXhMZW5ndGggPSB0b0xlbmd0aChtYXhMZW5ndGgpO1xuICBpZihpbnRNYXhMZW5ndGggPD0gc3RyaW5nTGVuZ3RoKXJldHVybiBTO1xuICBpZihmaWxsU3RyID09ICcnKWZpbGxTdHIgPSAnICc7XG4gIHZhciBmaWxsTGVuID0gaW50TWF4TGVuZ3RoIC0gc3RyaW5nTGVuZ3RoXG4gICAgLCBzdHJpbmdGaWxsZXIgPSByZXBlYXQuY2FsbChmaWxsU3RyLCBNYXRoLmNlaWwoZmlsbExlbiAvIGZpbGxTdHIubGVuZ3RoKSk7XG4gIGlmKHN0cmluZ0ZpbGxlci5sZW5ndGggPiBmaWxsTGVuKXN0cmluZ0ZpbGxlciA9IGxlZnRcbiAgICA/IHN0cmluZ0ZpbGxlci5zbGljZShzdHJpbmdGaWxsZXIubGVuZ3RoIC0gZmlsbExlbilcbiAgICA6IHN0cmluZ0ZpbGxlci5zbGljZSgwLCBmaWxsTGVuKTtcbiAgcmV0dXJuIGxlZnQgPyBzdHJpbmdGaWxsZXIgKyBTIDogUyArIHN0cmluZ0ZpbGxlcjtcbn07IiwiJ3VzZSBzdHJpY3QnO1xudmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vJC50by1pbnRlZ2VyJylcbiAgLCBkZWZpbmVkICAgPSByZXF1aXJlKCcuLyQuZGVmaW5lZCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHJlcGVhdChjb3VudCl7XG4gIHZhciBzdHIgPSBTdHJpbmcoZGVmaW5lZCh0aGlzKSlcbiAgICAsIHJlcyA9ICcnXG4gICAgLCBuICAgPSB0b0ludGVnZXIoY291bnQpO1xuICBpZihuIDwgMCB8fCBuID09IEluZmluaXR5KXRocm93IFJhbmdlRXJyb3IoXCJDb3VudCBjYW4ndCBiZSBuZWdhdGl2ZVwiKTtcbiAgZm9yKDtuID4gMDsgKG4gPj4+PSAxKSAmJiAoc3RyICs9IHN0cikpaWYobiAmIDEpcmVzICs9IHN0cjtcbiAgcmV0dXJuIHJlcztcbn07IiwiLy8gMSAtPiBTdHJpbmcjdHJpbUxlZnRcbi8vIDIgLT4gU3RyaW5nI3RyaW1SaWdodFxuLy8gMyAtPiBTdHJpbmcjdHJpbVxudmFyIHRyaW0gPSBmdW5jdGlvbihzdHJpbmcsIFRZUEUpe1xuICBzdHJpbmcgPSBTdHJpbmcoZGVmaW5lZChzdHJpbmcpKTtcbiAgaWYoVFlQRSAmIDEpc3RyaW5nID0gc3RyaW5nLnJlcGxhY2UobHRyaW0sICcnKTtcbiAgaWYoVFlQRSAmIDIpc3RyaW5nID0gc3RyaW5nLnJlcGxhY2UocnRyaW0sICcnKTtcbiAgcmV0dXJuIHN0cmluZztcbn07XG5cbnZhciAkZGVmICAgID0gcmVxdWlyZSgnLi8kLmRlZicpXG4gICwgZGVmaW5lZCA9IHJlcXVpcmUoJy4vJC5kZWZpbmVkJylcbiAgLCBzcGFjZXMgID0gJ1xceDA5XFx4MEFcXHgwQlxceDBDXFx4MERcXHgyMFxceEEwXFx1MTY4MFxcdTE4MEVcXHUyMDAwXFx1MjAwMVxcdTIwMDJcXHUyMDAzJyArXG4gICAgICAnXFx1MjAwNFxcdTIwMDVcXHUyMDA2XFx1MjAwN1xcdTIwMDhcXHUyMDA5XFx1MjAwQVxcdTIwMkZcXHUyMDVGXFx1MzAwMFxcdTIwMjhcXHUyMDI5XFx1RkVGRidcbiAgLCBzcGFjZSAgID0gJ1snICsgc3BhY2VzICsgJ10nXG4gICwgbm9uICAgICA9ICdcXHUyMDBiXFx1MDA4NSdcbiAgLCBsdHJpbSAgID0gUmVnRXhwKCdeJyArIHNwYWNlICsgc3BhY2UgKyAnKicpXG4gICwgcnRyaW0gICA9IFJlZ0V4cChzcGFjZSArIHNwYWNlICsgJyokJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oS0VZLCBleGVjKXtcbiAgdmFyIGV4cCAgPSB7fTtcbiAgZXhwW0tFWV0gPSBleGVjKHRyaW0pO1xuICAkZGVmKCRkZWYuUCArICRkZWYuRiAqIHJlcXVpcmUoJy4vJC5mYWlscycpKGZ1bmN0aW9uKCl7XG4gICAgcmV0dXJuICEhc3BhY2VzW0tFWV0oKSB8fCBub25bS0VZXSgpICE9IG5vbjtcbiAgfSksICdTdHJpbmcnLCBleHApO1xufTsiLCIvLyBUaGFuaydzIElFOCBmb3IgaGlzIGZ1bm55IGRlZmluZVByb3BlcnR5XG5tb2R1bGUuZXhwb3J0cyA9ICFyZXF1aXJlKCcuLyQuZmFpbHMnKShmdW5jdGlvbigpe1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KHt9LCAnYScsIHtnZXQ6IGZ1bmN0aW9uKCl7IHJldHVybiA3OyB9fSkuYSAhPSA3O1xufSk7IiwidmFyIGhhcyAgPSByZXF1aXJlKCcuLyQuaGFzJylcbiAgLCBoaWRlID0gcmVxdWlyZSgnLi8kLmhpZGUnKVxuICAsIFRBRyAgPSByZXF1aXJlKCcuLyQud2tzJykoJ3RvU3RyaW5nVGFnJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQsIHRhZywgc3RhdCl7XG4gIGlmKGl0ICYmICFoYXMoaXQgPSBzdGF0ID8gaXQgOiBpdC5wcm90b3R5cGUsIFRBRykpaGlkZShpdCwgVEFHLCB0YWcpO1xufTsiLCIndXNlIHN0cmljdCc7XG52YXIgY3R4ICAgICAgICAgICAgICAgID0gcmVxdWlyZSgnLi8kLmN0eCcpXG4gICwgaW52b2tlICAgICAgICAgICAgID0gcmVxdWlyZSgnLi8kLmludm9rZScpXG4gICwgaHRtbCAgICAgICAgICAgICAgID0gcmVxdWlyZSgnLi8kLmh0bWwnKVxuICAsIGNlbCAgICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vJC5kb20tY3JlYXRlJylcbiAgLCBnbG9iYWwgICAgICAgICAgICAgPSByZXF1aXJlKCcuLyQuZ2xvYmFsJylcbiAgLCBwcm9jZXNzICAgICAgICAgICAgPSBnbG9iYWwucHJvY2Vzc1xuICAsIHNldFRhc2sgICAgICAgICAgICA9IGdsb2JhbC5zZXRJbW1lZGlhdGVcbiAgLCBjbGVhclRhc2sgICAgICAgICAgPSBnbG9iYWwuY2xlYXJJbW1lZGlhdGVcbiAgLCBNZXNzYWdlQ2hhbm5lbCAgICAgPSBnbG9iYWwuTWVzc2FnZUNoYW5uZWxcbiAgLCBjb3VudGVyICAgICAgICAgICAgPSAwXG4gICwgcXVldWUgICAgICAgICAgICAgID0ge31cbiAgLCBPTlJFQURZU1RBVEVDSEFOR0UgPSAnb25yZWFkeXN0YXRlY2hhbmdlJ1xuICAsIGRlZmVyLCBjaGFubmVsLCBwb3J0O1xudmFyIHJ1biA9IGZ1bmN0aW9uKCl7XG4gIHZhciBpZCA9ICt0aGlzO1xuICBpZihxdWV1ZS5oYXNPd25Qcm9wZXJ0eShpZCkpe1xuICAgIHZhciBmbiA9IHF1ZXVlW2lkXTtcbiAgICBkZWxldGUgcXVldWVbaWRdO1xuICAgIGZuKCk7XG4gIH1cbn07XG52YXIgbGlzdG5lciA9IGZ1bmN0aW9uKGV2ZW50KXtcbiAgcnVuLmNhbGwoZXZlbnQuZGF0YSk7XG59O1xuLy8gTm9kZS5qcyAwLjkrICYgSUUxMCsgaGFzIHNldEltbWVkaWF0ZSwgb3RoZXJ3aXNlOlxuaWYoIXNldFRhc2sgfHwgIWNsZWFyVGFzayl7XG4gIHNldFRhc2sgPSBmdW5jdGlvbiBzZXRJbW1lZGlhdGUoZm4pe1xuICAgIHZhciBhcmdzID0gW10sIGkgPSAxO1xuICAgIHdoaWxlKGFyZ3VtZW50cy5sZW5ndGggPiBpKWFyZ3MucHVzaChhcmd1bWVudHNbaSsrXSk7XG4gICAgcXVldWVbKytjb3VudGVyXSA9IGZ1bmN0aW9uKCl7XG4gICAgICBpbnZva2UodHlwZW9mIGZuID09ICdmdW5jdGlvbicgPyBmbiA6IEZ1bmN0aW9uKGZuKSwgYXJncyk7XG4gICAgfTtcbiAgICBkZWZlcihjb3VudGVyKTtcbiAgICByZXR1cm4gY291bnRlcjtcbiAgfTtcbiAgY2xlYXJUYXNrID0gZnVuY3Rpb24gY2xlYXJJbW1lZGlhdGUoaWQpe1xuICAgIGRlbGV0ZSBxdWV1ZVtpZF07XG4gIH07XG4gIC8vIE5vZGUuanMgMC44LVxuICBpZihyZXF1aXJlKCcuLyQuY29mJykocHJvY2VzcykgPT0gJ3Byb2Nlc3MnKXtcbiAgICBkZWZlciA9IGZ1bmN0aW9uKGlkKXtcbiAgICAgIHByb2Nlc3MubmV4dFRpY2soY3R4KHJ1biwgaWQsIDEpKTtcbiAgICB9O1xuICAvLyBCcm93c2VycyB3aXRoIE1lc3NhZ2VDaGFubmVsLCBpbmNsdWRlcyBXZWJXb3JrZXJzXG4gIH0gZWxzZSBpZihNZXNzYWdlQ2hhbm5lbCl7XG4gICAgY2hhbm5lbCA9IG5ldyBNZXNzYWdlQ2hhbm5lbDtcbiAgICBwb3J0ICAgID0gY2hhbm5lbC5wb3J0MjtcbiAgICBjaGFubmVsLnBvcnQxLm9ubWVzc2FnZSA9IGxpc3RuZXI7XG4gICAgZGVmZXIgPSBjdHgocG9ydC5wb3N0TWVzc2FnZSwgcG9ydCwgMSk7XG4gIC8vIEJyb3dzZXJzIHdpdGggcG9zdE1lc3NhZ2UsIHNraXAgV2ViV29ya2Vyc1xuICAvLyBJRTggaGFzIHBvc3RNZXNzYWdlLCBidXQgaXQncyBzeW5jICYgdHlwZW9mIGl0cyBwb3N0TWVzc2FnZSBpcyAnb2JqZWN0J1xuICB9IGVsc2UgaWYoZ2xvYmFsLmFkZEV2ZW50TGlzdGVuZXIgJiYgdHlwZW9mIHBvc3RNZXNzYWdlID09ICdmdW5jdGlvbicgJiYgIWdsb2JhbC5pbXBvcnRTY3JpcHQpe1xuICAgIGRlZmVyID0gZnVuY3Rpb24oaWQpe1xuICAgICAgZ2xvYmFsLnBvc3RNZXNzYWdlKGlkICsgJycsICcqJyk7XG4gICAgfTtcbiAgICBnbG9iYWwuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIGxpc3RuZXIsIGZhbHNlKTtcbiAgLy8gSUU4LVxuICB9IGVsc2UgaWYoT05SRUFEWVNUQVRFQ0hBTkdFIGluIGNlbCgnc2NyaXB0Jykpe1xuICAgIGRlZmVyID0gZnVuY3Rpb24oaWQpe1xuICAgICAgaHRtbC5hcHBlbmRDaGlsZChjZWwoJ3NjcmlwdCcpKVtPTlJFQURZU1RBVEVDSEFOR0VdID0gZnVuY3Rpb24oKXtcbiAgICAgICAgaHRtbC5yZW1vdmVDaGlsZCh0aGlzKTtcbiAgICAgICAgcnVuLmNhbGwoaWQpO1xuICAgICAgfTtcbiAgICB9O1xuICAvLyBSZXN0IG9sZCBicm93c2Vyc1xuICB9IGVsc2Uge1xuICAgIGRlZmVyID0gZnVuY3Rpb24oaWQpe1xuICAgICAgc2V0VGltZW91dChjdHgocnVuLCBpZCwgMSksIDApO1xuICAgIH07XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0ge1xuICBzZXQ6ICAgc2V0VGFzayxcbiAgY2xlYXI6IGNsZWFyVGFza1xufTsiLCJ2YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi8kLnRvLWludGVnZXInKVxuICAsIG1heCAgICAgICA9IE1hdGgubWF4XG4gICwgbWluICAgICAgID0gTWF0aC5taW47XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGluZGV4LCBsZW5ndGgpe1xuICBpbmRleCA9IHRvSW50ZWdlcihpbmRleCk7XG4gIHJldHVybiBpbmRleCA8IDAgPyBtYXgoaW5kZXggKyBsZW5ndGgsIDApIDogbWluKGluZGV4LCBsZW5ndGgpO1xufTsiLCIvLyA3LjEuNCBUb0ludGVnZXJcbnZhciBjZWlsICA9IE1hdGguY2VpbFxuICAsIGZsb29yID0gTWF0aC5mbG9vcjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gaXNOYU4oaXQgPSAraXQpID8gMCA6IChpdCA+IDAgPyBmbG9vciA6IGNlaWwpKGl0KTtcbn07IiwiLy8gdG8gaW5kZXhlZCBvYmplY3QsIHRvT2JqZWN0IHdpdGggZmFsbGJhY2sgZm9yIG5vbi1hcnJheS1saWtlIEVTMyBzdHJpbmdzXHJcbnZhciBJT2JqZWN0ID0gcmVxdWlyZSgnLi8kLmlvYmplY3QnKVxyXG4gICwgZGVmaW5lZCA9IHJlcXVpcmUoJy4vJC5kZWZpbmVkJyk7XHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xyXG4gIHJldHVybiBJT2JqZWN0KGRlZmluZWQoaXQpKTtcclxufTsiLCIvLyA3LjEuMTUgVG9MZW5ndGhcbnZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuLyQudG8taW50ZWdlcicpXG4gICwgbWluICAgICAgID0gTWF0aC5taW47XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIGl0ID4gMCA/IG1pbih0b0ludGVnZXIoaXQpLCAweDFmZmZmZmZmZmZmZmZmKSA6IDA7IC8vIHBvdygyLCA1MykgLSAxID09IDkwMDcxOTkyNTQ3NDA5OTFcbn07IiwiLy8gNy4xLjEzIFRvT2JqZWN0KGFyZ3VtZW50KVxudmFyIGRlZmluZWQgPSByZXF1aXJlKCcuLyQuZGVmaW5lZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBPYmplY3QoZGVmaW5lZChpdCkpO1xufTsiLCJ2YXIgaWQgPSAwXG4gICwgcHggPSBNYXRoLnJhbmRvbSgpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihrZXkpe1xuICByZXR1cm4gJ1N5bWJvbCgnLmNvbmNhdChrZXkgPT09IHVuZGVmaW5lZCA/ICcnIDoga2V5LCAnKV8nLCAoKytpZCArIHB4KS50b1N0cmluZygzNikpO1xufTsiLCIvLyAyMi4xLjMuMzEgQXJyYXkucHJvdG90eXBlW0BAdW5zY29wYWJsZXNdXG52YXIgVU5TQ09QQUJMRVMgPSByZXF1aXJlKCcuLyQud2tzJykoJ3Vuc2NvcGFibGVzJyk7XG5pZighKFVOU0NPUEFCTEVTIGluIFtdKSlyZXF1aXJlKCcuLyQuaGlkZScpKEFycmF5LnByb3RvdHlwZSwgVU5TQ09QQUJMRVMsIHt9KTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oa2V5KXtcbiAgW11bVU5TQ09QQUJMRVNdW2tleV0gPSB0cnVlO1xufTsiLCJ2YXIgc3RvcmUgID0gcmVxdWlyZSgnLi8kLnNoYXJlZCcpKCd3a3MnKVxuICAsIFN5bWJvbCA9IHJlcXVpcmUoJy4vJC5nbG9iYWwnKS5TeW1ib2w7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG5hbWUpe1xuICByZXR1cm4gc3RvcmVbbmFtZV0gfHwgKHN0b3JlW25hbWVdID1cbiAgICBTeW1ib2wgJiYgU3ltYm9sW25hbWVdIHx8IChTeW1ib2wgfHwgcmVxdWlyZSgnLi8kLnVpZCcpKSgnU3ltYm9sLicgKyBuYW1lKSk7XG59OyIsInZhciBjbGFzc29mICAgPSByZXF1aXJlKCcuLyQuY2xhc3NvZicpXG4gICwgSVRFUkFUT1IgID0gcmVxdWlyZSgnLi8kLndrcycpKCdpdGVyYXRvcicpXG4gICwgSXRlcmF0b3JzID0gcmVxdWlyZSgnLi8kLml0ZXJhdG9ycycpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLyQuY29yZScpLmdldEl0ZXJhdG9yTWV0aG9kID0gZnVuY3Rpb24oaXQpe1xuICBpZihpdCAhPSB1bmRlZmluZWQpcmV0dXJuIGl0W0lURVJBVE9SXSB8fCBpdFsnQEBpdGVyYXRvciddIHx8IEl0ZXJhdG9yc1tjbGFzc29mKGl0KV07XG59OyIsIid1c2Ugc3RyaWN0JztcbnZhciAkICAgICAgICAgICAgICAgID0gcmVxdWlyZSgnLi8kJylcbiAgLCBTVVBQT1JUX0RFU0MgICAgID0gcmVxdWlyZSgnLi8kLnN1cHBvcnQtZGVzYycpXG4gICwgY3JlYXRlRGVzYyAgICAgICA9IHJlcXVpcmUoJy4vJC5wcm9wZXJ0eS1kZXNjJylcbiAgLCBodG1sICAgICAgICAgICAgID0gcmVxdWlyZSgnLi8kLmh0bWwnKVxuICAsIGNlbCAgICAgICAgICAgICAgPSByZXF1aXJlKCcuLyQuZG9tLWNyZWF0ZScpXG4gICwgaGFzICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vJC5oYXMnKVxuICAsIGNvZiAgICAgICAgICAgICAgPSByZXF1aXJlKCcuLyQuY29mJylcbiAgLCAkZGVmICAgICAgICAgICAgID0gcmVxdWlyZSgnLi8kLmRlZicpXG4gICwgaW52b2tlICAgICAgICAgICA9IHJlcXVpcmUoJy4vJC5pbnZva2UnKVxuICAsIGFycmF5TWV0aG9kICAgICAgPSByZXF1aXJlKCcuLyQuYXJyYXktbWV0aG9kcycpXG4gICwgSUVfUFJPVE8gICAgICAgICA9IHJlcXVpcmUoJy4vJC51aWQnKSgnX19wcm90b19fJylcbiAgLCBpc09iamVjdCAgICAgICAgID0gcmVxdWlyZSgnLi8kLmlzLW9iamVjdCcpXG4gICwgYW5PYmplY3QgICAgICAgICA9IHJlcXVpcmUoJy4vJC5hbi1vYmplY3QnKVxuICAsIGFGdW5jdGlvbiAgICAgICAgPSByZXF1aXJlKCcuLyQuYS1mdW5jdGlvbicpXG4gICwgdG9PYmplY3QgICAgICAgICA9IHJlcXVpcmUoJy4vJC50by1vYmplY3QnKVxuICAsIHRvSU9iamVjdCAgICAgICAgPSByZXF1aXJlKCcuLyQudG8taW9iamVjdCcpXG4gICwgdG9JbnRlZ2VyICAgICAgICA9IHJlcXVpcmUoJy4vJC50by1pbnRlZ2VyJylcbiAgLCB0b0luZGV4ICAgICAgICAgID0gcmVxdWlyZSgnLi8kLnRvLWluZGV4JylcbiAgLCB0b0xlbmd0aCAgICAgICAgID0gcmVxdWlyZSgnLi8kLnRvLWxlbmd0aCcpXG4gICwgSU9iamVjdCAgICAgICAgICA9IHJlcXVpcmUoJy4vJC5pb2JqZWN0JylcbiAgLCBmYWlscyAgICAgICAgICAgID0gcmVxdWlyZSgnLi8kLmZhaWxzJylcbiAgLCBPYmplY3RQcm90byAgICAgID0gT2JqZWN0LnByb3RvdHlwZVxuICAsIEEgICAgICAgICAgICAgICAgPSBbXVxuICAsIF9zbGljZSAgICAgICAgICAgPSBBLnNsaWNlXG4gICwgX2pvaW4gICAgICAgICAgICA9IEEuam9pblxuICAsIGRlZmluZVByb3BlcnR5ICAgPSAkLnNldERlc2NcbiAgLCBnZXRPd25EZXNjcmlwdG9yID0gJC5nZXREZXNjXG4gICwgZGVmaW5lUHJvcGVydGllcyA9ICQuc2V0RGVzY3NcbiAgLCAkaW5kZXhPZiAgICAgICAgID0gcmVxdWlyZSgnLi8kLmFycmF5LWluY2x1ZGVzJykoZmFsc2UpXG4gICwgZmFjdG9yaWVzICAgICAgICA9IHt9XG4gICwgSUU4X0RPTV9ERUZJTkU7XG5cbmlmKCFTVVBQT1JUX0RFU0Mpe1xuICBJRThfRE9NX0RFRklORSA9ICFmYWlscyhmdW5jdGlvbigpe1xuICAgIHJldHVybiBkZWZpbmVQcm9wZXJ0eShjZWwoJ2RpdicpLCAnYScsIHtnZXQ6IGZ1bmN0aW9uKCl7IHJldHVybiA3OyB9fSkuYSAhPSA3O1xuICB9KTtcbiAgJC5zZXREZXNjID0gZnVuY3Rpb24oTywgUCwgQXR0cmlidXRlcyl7XG4gICAgaWYoSUU4X0RPTV9ERUZJTkUpdHJ5IHtcbiAgICAgIHJldHVybiBkZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKTtcbiAgICB9IGNhdGNoKGUpeyAvKiBlbXB0eSAqLyB9XG4gICAgaWYoJ2dldCcgaW4gQXR0cmlidXRlcyB8fCAnc2V0JyBpbiBBdHRyaWJ1dGVzKXRocm93IFR5cGVFcnJvcignQWNjZXNzb3JzIG5vdCBzdXBwb3J0ZWQhJyk7XG4gICAgaWYoJ3ZhbHVlJyBpbiBBdHRyaWJ1dGVzKWFuT2JqZWN0KE8pW1BdID0gQXR0cmlidXRlcy52YWx1ZTtcbiAgICByZXR1cm4gTztcbiAgfTtcbiAgJC5nZXREZXNjID0gZnVuY3Rpb24oTywgUCl7XG4gICAgaWYoSUU4X0RPTV9ERUZJTkUpdHJ5IHtcbiAgICAgIHJldHVybiBnZXRPd25EZXNjcmlwdG9yKE8sIFApO1xuICAgIH0gY2F0Y2goZSl7IC8qIGVtcHR5ICovIH1cbiAgICBpZihoYXMoTywgUCkpcmV0dXJuIGNyZWF0ZURlc2MoIU9iamVjdFByb3RvLnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwoTywgUCksIE9bUF0pO1xuICB9O1xuICAkLnNldERlc2NzID0gZGVmaW5lUHJvcGVydGllcyA9IGZ1bmN0aW9uKE8sIFByb3BlcnRpZXMpe1xuICAgIGFuT2JqZWN0KE8pO1xuICAgIHZhciBrZXlzICAgPSAkLmdldEtleXMoUHJvcGVydGllcylcbiAgICAgICwgbGVuZ3RoID0ga2V5cy5sZW5ndGhcbiAgICAgICwgaSA9IDBcbiAgICAgICwgUDtcbiAgICB3aGlsZShsZW5ndGggPiBpKSQuc2V0RGVzYyhPLCBQID0ga2V5c1tpKytdLCBQcm9wZXJ0aWVzW1BdKTtcbiAgICByZXR1cm4gTztcbiAgfTtcbn1cbiRkZWYoJGRlZi5TICsgJGRlZi5GICogIVNVUFBPUlRfREVTQywgJ09iamVjdCcsIHtcbiAgLy8gMTkuMS4yLjYgLyAxNS4yLjMuMyBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKE8sIFApXG4gIGdldE93blByb3BlcnR5RGVzY3JpcHRvcjogJC5nZXREZXNjLFxuICAvLyAxOS4xLjIuNCAvIDE1LjIuMy42IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKVxuICBkZWZpbmVQcm9wZXJ0eTogJC5zZXREZXNjLFxuICAvLyAxOS4xLjIuMyAvIDE1LjIuMy43IE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKE8sIFByb3BlcnRpZXMpXG4gIGRlZmluZVByb3BlcnRpZXM6IGRlZmluZVByb3BlcnRpZXNcbn0pO1xuXG4gIC8vIElFIDgtIGRvbid0IGVudW0gYnVnIGtleXNcbnZhciBrZXlzMSA9ICgnY29uc3RydWN0b3IsaGFzT3duUHJvcGVydHksaXNQcm90b3R5cGVPZixwcm9wZXJ0eUlzRW51bWVyYWJsZSwnICtcbiAgICAgICAgICAgICd0b0xvY2FsZVN0cmluZyx0b1N0cmluZyx2YWx1ZU9mJykuc3BsaXQoJywnKVxuICAvLyBBZGRpdGlvbmFsIGtleXMgZm9yIGdldE93blByb3BlcnR5TmFtZXNcbiAgLCBrZXlzMiA9IGtleXMxLmNvbmNhdCgnbGVuZ3RoJywgJ3Byb3RvdHlwZScpXG4gICwga2V5c0xlbjEgPSBrZXlzMS5sZW5ndGg7XG5cbi8vIENyZWF0ZSBvYmplY3Qgd2l0aCBgbnVsbGAgcHJvdG90eXBlOiB1c2UgaWZyYW1lIE9iamVjdCB3aXRoIGNsZWFyZWQgcHJvdG90eXBlXG52YXIgY3JlYXRlRGljdCA9IGZ1bmN0aW9uKCl7XG4gIC8vIFRocmFzaCwgd2FzdGUgYW5kIHNvZG9teTogSUUgR0MgYnVnXG4gIHZhciBpZnJhbWUgPSBjZWwoJ2lmcmFtZScpXG4gICAgLCBpICAgICAgPSBrZXlzTGVuMVxuICAgICwgZ3QgICAgID0gJz4nXG4gICAgLCBpZnJhbWVEb2N1bWVudDtcbiAgaWZyYW1lLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gIGh0bWwuYXBwZW5kQ2hpbGQoaWZyYW1lKTtcbiAgaWZyYW1lLnNyYyA9ICdqYXZhc2NyaXB0Oic7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tc2NyaXB0LXVybFxuICAvLyBjcmVhdGVEaWN0ID0gaWZyYW1lLmNvbnRlbnRXaW5kb3cuT2JqZWN0O1xuICAvLyBodG1sLnJlbW92ZUNoaWxkKGlmcmFtZSk7XG4gIGlmcmFtZURvY3VtZW50ID0gaWZyYW1lLmNvbnRlbnRXaW5kb3cuZG9jdW1lbnQ7XG4gIGlmcmFtZURvY3VtZW50Lm9wZW4oKTtcbiAgaWZyYW1lRG9jdW1lbnQud3JpdGUoJzxzY3JpcHQ+ZG9jdW1lbnQuRj1PYmplY3Q8L3NjcmlwdCcgKyBndCk7XG4gIGlmcmFtZURvY3VtZW50LmNsb3NlKCk7XG4gIGNyZWF0ZURpY3QgPSBpZnJhbWVEb2N1bWVudC5GO1xuICB3aGlsZShpLS0pZGVsZXRlIGNyZWF0ZURpY3QucHJvdG90eXBlW2tleXMxW2ldXTtcbiAgcmV0dXJuIGNyZWF0ZURpY3QoKTtcbn07XG52YXIgY3JlYXRlR2V0S2V5cyA9IGZ1bmN0aW9uKG5hbWVzLCBsZW5ndGgpe1xuICByZXR1cm4gZnVuY3Rpb24ob2JqZWN0KXtcbiAgICB2YXIgTyAgICAgID0gdG9JT2JqZWN0KG9iamVjdClcbiAgICAgICwgaSAgICAgID0gMFxuICAgICAgLCByZXN1bHQgPSBbXVxuICAgICAgLCBrZXk7XG4gICAgZm9yKGtleSBpbiBPKWlmKGtleSAhPSBJRV9QUk9UTyloYXMoTywga2V5KSAmJiByZXN1bHQucHVzaChrZXkpO1xuICAgIC8vIERvbid0IGVudW0gYnVnICYgaGlkZGVuIGtleXNcbiAgICB3aGlsZShsZW5ndGggPiBpKWlmKGhhcyhPLCBrZXkgPSBuYW1lc1tpKytdKSl7XG4gICAgICB+JGluZGV4T2YocmVzdWx0LCBrZXkpIHx8IHJlc3VsdC5wdXNoKGtleSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG59O1xudmFyIEVtcHR5ID0gZnVuY3Rpb24oKXt9O1xuJGRlZigkZGVmLlMsICdPYmplY3QnLCB7XG4gIC8vIDE5LjEuMi45IC8gMTUuMi4zLjIgT2JqZWN0LmdldFByb3RvdHlwZU9mKE8pXG4gIGdldFByb3RvdHlwZU9mOiAkLmdldFByb3RvID0gJC5nZXRQcm90byB8fCBmdW5jdGlvbihPKXtcbiAgICBPID0gdG9PYmplY3QoTyk7XG4gICAgaWYoaGFzKE8sIElFX1BST1RPKSlyZXR1cm4gT1tJRV9QUk9UT107XG4gICAgaWYodHlwZW9mIE8uY29uc3RydWN0b3IgPT0gJ2Z1bmN0aW9uJyAmJiBPIGluc3RhbmNlb2YgTy5jb25zdHJ1Y3Rvcil7XG4gICAgICByZXR1cm4gTy5jb25zdHJ1Y3Rvci5wcm90b3R5cGU7XG4gICAgfSByZXR1cm4gTyBpbnN0YW5jZW9mIE9iamVjdCA/IE9iamVjdFByb3RvIDogbnVsbDtcbiAgfSxcbiAgLy8gMTkuMS4yLjcgLyAxNS4yLjMuNCBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhPKVxuICBnZXRPd25Qcm9wZXJ0eU5hbWVzOiAkLmdldE5hbWVzID0gJC5nZXROYW1lcyB8fCBjcmVhdGVHZXRLZXlzKGtleXMyLCBrZXlzMi5sZW5ndGgsIHRydWUpLFxuICAvLyAxOS4xLjIuMiAvIDE1LjIuMy41IE9iamVjdC5jcmVhdGUoTyBbLCBQcm9wZXJ0aWVzXSlcbiAgY3JlYXRlOiAkLmNyZWF0ZSA9ICQuY3JlYXRlIHx8IGZ1bmN0aW9uKE8sIC8qPyovUHJvcGVydGllcyl7XG4gICAgdmFyIHJlc3VsdDtcbiAgICBpZihPICE9PSBudWxsKXtcbiAgICAgIEVtcHR5LnByb3RvdHlwZSA9IGFuT2JqZWN0KE8pO1xuICAgICAgcmVzdWx0ID0gbmV3IEVtcHR5KCk7XG4gICAgICBFbXB0eS5wcm90b3R5cGUgPSBudWxsO1xuICAgICAgLy8gYWRkIFwiX19wcm90b19fXCIgZm9yIE9iamVjdC5nZXRQcm90b3R5cGVPZiBzaGltXG4gICAgICByZXN1bHRbSUVfUFJPVE9dID0gTztcbiAgICB9IGVsc2UgcmVzdWx0ID0gY3JlYXRlRGljdCgpO1xuICAgIHJldHVybiBQcm9wZXJ0aWVzID09PSB1bmRlZmluZWQgPyByZXN1bHQgOiBkZWZpbmVQcm9wZXJ0aWVzKHJlc3VsdCwgUHJvcGVydGllcyk7XG4gIH0sXG4gIC8vIDE5LjEuMi4xNCAvIDE1LjIuMy4xNCBPYmplY3Qua2V5cyhPKVxuICBrZXlzOiAkLmdldEtleXMgPSAkLmdldEtleXMgfHwgY3JlYXRlR2V0S2V5cyhrZXlzMSwga2V5c0xlbjEsIGZhbHNlKVxufSk7XG5cbnZhciBjb25zdHJ1Y3QgPSBmdW5jdGlvbihGLCBsZW4sIGFyZ3Mpe1xuICBpZighKGxlbiBpbiBmYWN0b3JpZXMpKXtcbiAgICBmb3IodmFyIG4gPSBbXSwgaSA9IDA7IGkgPCBsZW47IGkrKyluW2ldID0gJ2FbJyArIGkgKyAnXSc7XG4gICAgZmFjdG9yaWVzW2xlbl0gPSBGdW5jdGlvbignRixhJywgJ3JldHVybiBuZXcgRignICsgbi5qb2luKCcsJykgKyAnKScpO1xuICB9XG4gIHJldHVybiBmYWN0b3JpZXNbbGVuXShGLCBhcmdzKTtcbn07XG5cbi8vIDE5LjIuMy4yIC8gMTUuMy40LjUgRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQodGhpc0FyZywgYXJncy4uLilcbiRkZWYoJGRlZi5QLCAnRnVuY3Rpb24nLCB7XG4gIGJpbmQ6IGZ1bmN0aW9uIGJpbmQodGhhdCAvKiwgYXJncy4uLiAqLyl7XG4gICAgdmFyIGZuICAgICAgID0gYUZ1bmN0aW9uKHRoaXMpXG4gICAgICAsIHBhcnRBcmdzID0gX3NsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcbiAgICB2YXIgYm91bmQgPSBmdW5jdGlvbigvKiBhcmdzLi4uICovKXtcbiAgICAgIHZhciBhcmdzID0gcGFydEFyZ3MuY29uY2F0KF9zbGljZS5jYWxsKGFyZ3VtZW50cykpO1xuICAgICAgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBib3VuZCA/IGNvbnN0cnVjdChmbiwgYXJncy5sZW5ndGgsIGFyZ3MpIDogaW52b2tlKGZuLCBhcmdzLCB0aGF0KTtcbiAgICB9O1xuICAgIGlmKGlzT2JqZWN0KGZuLnByb3RvdHlwZSkpYm91bmQucHJvdG90eXBlID0gZm4ucHJvdG90eXBlO1xuICAgIHJldHVybiBib3VuZDtcbiAgfVxufSk7XG5cbi8vIGZhbGxiYWNrIGZvciBub3QgYXJyYXktbGlrZSBFUzMgc3RyaW5ncyBhbmQgRE9NIG9iamVjdHNcbnZhciBidWdneVNsaWNlID0gZmFpbHMoZnVuY3Rpb24oKXtcbiAgaWYoaHRtbClfc2xpY2UuY2FsbChodG1sKTtcbn0pO1xuXG4kZGVmKCRkZWYuUCArICRkZWYuRiAqIGJ1Z2d5U2xpY2UsICdBcnJheScsIHtcbiAgc2xpY2U6IGZ1bmN0aW9uKGJlZ2luLCBlbmQpe1xuICAgIHZhciBsZW4gICA9IHRvTGVuZ3RoKHRoaXMubGVuZ3RoKVxuICAgICAgLCBrbGFzcyA9IGNvZih0aGlzKTtcbiAgICBlbmQgPSBlbmQgPT09IHVuZGVmaW5lZCA/IGxlbiA6IGVuZDtcbiAgICBpZihrbGFzcyA9PSAnQXJyYXknKXJldHVybiBfc2xpY2UuY2FsbCh0aGlzLCBiZWdpbiwgZW5kKTtcbiAgICB2YXIgc3RhcnQgID0gdG9JbmRleChiZWdpbiwgbGVuKVxuICAgICAgLCB1cFRvICAgPSB0b0luZGV4KGVuZCwgbGVuKVxuICAgICAgLCBzaXplICAgPSB0b0xlbmd0aCh1cFRvIC0gc3RhcnQpXG4gICAgICAsIGNsb25lZCA9IEFycmF5KHNpemUpXG4gICAgICAsIGkgICAgICA9IDA7XG4gICAgZm9yKDsgaSA8IHNpemU7IGkrKyljbG9uZWRbaV0gPSBrbGFzcyA9PSAnU3RyaW5nJ1xuICAgICAgPyB0aGlzLmNoYXJBdChzdGFydCArIGkpXG4gICAgICA6IHRoaXNbc3RhcnQgKyBpXTtcbiAgICByZXR1cm4gY2xvbmVkO1xuICB9XG59KTtcbiRkZWYoJGRlZi5QICsgJGRlZi5GICogKElPYmplY3QgIT0gT2JqZWN0KSwgJ0FycmF5Jywge1xuICBqb2luOiBmdW5jdGlvbigpe1xuICAgIHJldHVybiBfam9pbi5hcHBseShJT2JqZWN0KHRoaXMpLCBhcmd1bWVudHMpO1xuICB9XG59KTtcblxuLy8gMjIuMS4yLjIgLyAxNS40LjMuMiBBcnJheS5pc0FycmF5KGFyZylcbiRkZWYoJGRlZi5TLCAnQXJyYXknLCB7aXNBcnJheTogZnVuY3Rpb24oYXJnKXsgcmV0dXJuIGNvZihhcmcpID09ICdBcnJheSc7IH19KTtcblxudmFyIGNyZWF0ZUFycmF5UmVkdWNlID0gZnVuY3Rpb24oaXNSaWdodCl7XG4gIHJldHVybiBmdW5jdGlvbihjYWxsYmFja2ZuLCBtZW1vKXtcbiAgICBhRnVuY3Rpb24oY2FsbGJhY2tmbik7XG4gICAgdmFyIE8gICAgICA9IElPYmplY3QodGhpcylcbiAgICAgICwgbGVuZ3RoID0gdG9MZW5ndGgoTy5sZW5ndGgpXG4gICAgICAsIGluZGV4ICA9IGlzUmlnaHQgPyBsZW5ndGggLSAxIDogMFxuICAgICAgLCBpICAgICAgPSBpc1JpZ2h0ID8gLTEgOiAxO1xuICAgIGlmKGFyZ3VtZW50cy5sZW5ndGggPCAyKWZvcig7Oyl7XG4gICAgICBpZihpbmRleCBpbiBPKXtcbiAgICAgICAgbWVtbyA9IE9baW5kZXhdO1xuICAgICAgICBpbmRleCArPSBpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGluZGV4ICs9IGk7XG4gICAgICBpZihpc1JpZ2h0ID8gaW5kZXggPCAwIDogbGVuZ3RoIDw9IGluZGV4KXtcbiAgICAgICAgdGhyb3cgVHlwZUVycm9yKCdSZWR1Y2Ugb2YgZW1wdHkgYXJyYXkgd2l0aCBubyBpbml0aWFsIHZhbHVlJyk7XG4gICAgICB9XG4gICAgfVxuICAgIGZvcig7aXNSaWdodCA/IGluZGV4ID49IDAgOiBsZW5ndGggPiBpbmRleDsgaW5kZXggKz0gaSlpZihpbmRleCBpbiBPKXtcbiAgICAgIG1lbW8gPSBjYWxsYmFja2ZuKG1lbW8sIE9baW5kZXhdLCBpbmRleCwgdGhpcyk7XG4gICAgfVxuICAgIHJldHVybiBtZW1vO1xuICB9O1xufTtcbnZhciBtZXRob2RpemUgPSBmdW5jdGlvbigkZm4pe1xuICByZXR1cm4gZnVuY3Rpb24oYXJnMS8qLCBhcmcyID0gdW5kZWZpbmVkICovKXtcbiAgICByZXR1cm4gJGZuKHRoaXMsIGFyZzEsIGFyZ3VtZW50c1sxXSk7XG4gIH07XG59O1xuJGRlZigkZGVmLlAsICdBcnJheScsIHtcbiAgLy8gMjIuMS4zLjEwIC8gMTUuNC40LjE4IEFycmF5LnByb3RvdHlwZS5mb3JFYWNoKGNhbGxiYWNrZm4gWywgdGhpc0FyZ10pXG4gIGZvckVhY2g6ICQuZWFjaCA9ICQuZWFjaCB8fCBtZXRob2RpemUoYXJyYXlNZXRob2QoMCkpLFxuICAvLyAyMi4xLjMuMTUgLyAxNS40LjQuMTkgQXJyYXkucHJvdG90eXBlLm1hcChjYWxsYmFja2ZuIFssIHRoaXNBcmddKVxuICBtYXA6IG1ldGhvZGl6ZShhcnJheU1ldGhvZCgxKSksXG4gIC8vIDIyLjEuMy43IC8gMTUuNC40LjIwIEFycmF5LnByb3RvdHlwZS5maWx0ZXIoY2FsbGJhY2tmbiBbLCB0aGlzQXJnXSlcbiAgZmlsdGVyOiBtZXRob2RpemUoYXJyYXlNZXRob2QoMikpLFxuICAvLyAyMi4xLjMuMjMgLyAxNS40LjQuMTcgQXJyYXkucHJvdG90eXBlLnNvbWUoY2FsbGJhY2tmbiBbLCB0aGlzQXJnXSlcbiAgc29tZTogbWV0aG9kaXplKGFycmF5TWV0aG9kKDMpKSxcbiAgLy8gMjIuMS4zLjUgLyAxNS40LjQuMTYgQXJyYXkucHJvdG90eXBlLmV2ZXJ5KGNhbGxiYWNrZm4gWywgdGhpc0FyZ10pXG4gIGV2ZXJ5OiBtZXRob2RpemUoYXJyYXlNZXRob2QoNCkpLFxuICAvLyAyMi4xLjMuMTggLyAxNS40LjQuMjEgQXJyYXkucHJvdG90eXBlLnJlZHVjZShjYWxsYmFja2ZuIFssIGluaXRpYWxWYWx1ZV0pXG4gIHJlZHVjZTogY3JlYXRlQXJyYXlSZWR1Y2UoZmFsc2UpLFxuICAvLyAyMi4xLjMuMTkgLyAxNS40LjQuMjIgQXJyYXkucHJvdG90eXBlLnJlZHVjZVJpZ2h0KGNhbGxiYWNrZm4gWywgaW5pdGlhbFZhbHVlXSlcbiAgcmVkdWNlUmlnaHQ6IGNyZWF0ZUFycmF5UmVkdWNlKHRydWUpLFxuICAvLyAyMi4xLjMuMTEgLyAxNS40LjQuMTQgQXJyYXkucHJvdG90eXBlLmluZGV4T2Yoc2VhcmNoRWxlbWVudCBbLCBmcm9tSW5kZXhdKVxuICBpbmRleE9mOiBtZXRob2RpemUoJGluZGV4T2YpLFxuICAvLyAyMi4xLjMuMTQgLyAxNS40LjQuMTUgQXJyYXkucHJvdG90eXBlLmxhc3RJbmRleE9mKHNlYXJjaEVsZW1lbnQgWywgZnJvbUluZGV4XSlcbiAgbGFzdEluZGV4T2Y6IGZ1bmN0aW9uKGVsLCBmcm9tSW5kZXggLyogPSBAWyotMV0gKi8pe1xuICAgIHZhciBPICAgICAgPSB0b0lPYmplY3QodGhpcylcbiAgICAgICwgbGVuZ3RoID0gdG9MZW5ndGgoTy5sZW5ndGgpXG4gICAgICAsIGluZGV4ICA9IGxlbmd0aCAtIDE7XG4gICAgaWYoYXJndW1lbnRzLmxlbmd0aCA+IDEpaW5kZXggPSBNYXRoLm1pbihpbmRleCwgdG9JbnRlZ2VyKGZyb21JbmRleCkpO1xuICAgIGlmKGluZGV4IDwgMClpbmRleCA9IHRvTGVuZ3RoKGxlbmd0aCArIGluZGV4KTtcbiAgICBmb3IoO2luZGV4ID49IDA7IGluZGV4LS0paWYoaW5kZXggaW4gTylpZihPW2luZGV4XSA9PT0gZWwpcmV0dXJuIGluZGV4O1xuICAgIHJldHVybiAtMTtcbiAgfVxufSk7XG5cbi8vIDIwLjMuMy4xIC8gMTUuOS40LjQgRGF0ZS5ub3coKVxuJGRlZigkZGVmLlMsICdEYXRlJywge25vdzogZnVuY3Rpb24oKXsgcmV0dXJuICtuZXcgRGF0ZTsgfX0pO1xuXG52YXIgbHogPSBmdW5jdGlvbihudW0pe1xuICByZXR1cm4gbnVtID4gOSA/IG51bSA6ICcwJyArIG51bTtcbn07XG5cbi8vIDIwLjMuNC4zNiAvIDE1LjkuNS40MyBEYXRlLnByb3RvdHlwZS50b0lTT1N0cmluZygpXG4vLyBQaGFudG9tSlMgYW5kIG9sZCB3ZWJraXQgaGFkIGEgYnJva2VuIERhdGUgaW1wbGVtZW50YXRpb24uXG52YXIgZGF0ZSAgICAgICA9IG5ldyBEYXRlKC01ZTEzIC0gMSlcbiAgLCBicm9rZW5EYXRlID0gIShkYXRlLnRvSVNPU3RyaW5nICYmIGRhdGUudG9JU09TdHJpbmcoKSA9PSAnMDM4NS0wNy0yNVQwNzowNjozOS45OTlaJ1xuICAgICAgJiYgZmFpbHMoZnVuY3Rpb24oKXsgbmV3IERhdGUoTmFOKS50b0lTT1N0cmluZygpOyB9KSk7XG4kZGVmKCRkZWYuUCArICRkZWYuRiAqIGJyb2tlbkRhdGUsICdEYXRlJywge1xuICB0b0lTT1N0cmluZzogZnVuY3Rpb24gdG9JU09TdHJpbmcoKXtcbiAgICBpZighaXNGaW5pdGUodGhpcykpdGhyb3cgUmFuZ2VFcnJvcignSW52YWxpZCB0aW1lIHZhbHVlJyk7XG4gICAgdmFyIGQgPSB0aGlzXG4gICAgICAsIHkgPSBkLmdldFVUQ0Z1bGxZZWFyKClcbiAgICAgICwgbSA9IGQuZ2V0VVRDTWlsbGlzZWNvbmRzKClcbiAgICAgICwgcyA9IHkgPCAwID8gJy0nIDogeSA+IDk5OTkgPyAnKycgOiAnJztcbiAgICByZXR1cm4gcyArICgnMDAwMDAnICsgTWF0aC5hYnMoeSkpLnNsaWNlKHMgPyAtNiA6IC00KSArXG4gICAgICAnLScgKyBseihkLmdldFVUQ01vbnRoKCkgKyAxKSArICctJyArIGx6KGQuZ2V0VVRDRGF0ZSgpKSArXG4gICAgICAnVCcgKyBseihkLmdldFVUQ0hvdXJzKCkpICsgJzonICsgbHooZC5nZXRVVENNaW51dGVzKCkpICtcbiAgICAgICc6JyArIGx6KGQuZ2V0VVRDU2Vjb25kcygpKSArICcuJyArIChtID4gOTkgPyBtIDogJzAnICsgbHoobSkpICsgJ1onO1xuICB9XG59KTsiLCIndXNlIHN0cmljdCc7XG52YXIgJGRlZiAgICAgPSByZXF1aXJlKCcuLyQuZGVmJylcbiAgLCB0b09iamVjdCA9IHJlcXVpcmUoJy4vJC50by1vYmplY3QnKVxuICAsIHRvSW5kZXggID0gcmVxdWlyZSgnLi8kLnRvLWluZGV4JylcbiAgLCB0b0xlbmd0aCA9IHJlcXVpcmUoJy4vJC50by1sZW5ndGgnKTtcbiRkZWYoJGRlZi5QLCAnQXJyYXknLCB7XG4gIC8vIDIyLjEuMy4zIEFycmF5LnByb3RvdHlwZS5jb3B5V2l0aGluKHRhcmdldCwgc3RhcnQsIGVuZCA9IHRoaXMubGVuZ3RoKVxuICBjb3B5V2l0aGluOiBmdW5jdGlvbiBjb3B5V2l0aGluKHRhcmdldC8qID0gMCAqLywgc3RhcnQgLyogPSAwLCBlbmQgPSBAbGVuZ3RoICovKXtcbiAgICB2YXIgTyAgICAgPSB0b09iamVjdCh0aGlzKVxuICAgICAgLCBsZW4gICA9IHRvTGVuZ3RoKE8ubGVuZ3RoKVxuICAgICAgLCB0byAgICA9IHRvSW5kZXgodGFyZ2V0LCBsZW4pXG4gICAgICAsIGZyb20gID0gdG9JbmRleChzdGFydCwgbGVuKVxuICAgICAgLCBlbmQgICA9IGFyZ3VtZW50c1syXVxuICAgICAgLCBmaW4gICA9IGVuZCA9PT0gdW5kZWZpbmVkID8gbGVuIDogdG9JbmRleChlbmQsIGxlbilcbiAgICAgICwgY291bnQgPSBNYXRoLm1pbihmaW4gLSBmcm9tLCBsZW4gLSB0bylcbiAgICAgICwgaW5jICAgPSAxO1xuICAgIGlmKGZyb20gPCB0byAmJiB0byA8IGZyb20gKyBjb3VudCl7XG4gICAgICBpbmMgID0gLTE7XG4gICAgICBmcm9tID0gZnJvbSArIGNvdW50IC0gMTtcbiAgICAgIHRvICAgPSB0byAgICsgY291bnQgLSAxO1xuICAgIH1cbiAgICB3aGlsZShjb3VudC0tID4gMCl7XG4gICAgICBpZihmcm9tIGluIE8pT1t0b10gPSBPW2Zyb21dO1xuICAgICAgZWxzZSBkZWxldGUgT1t0b107XG4gICAgICB0byAgICs9IGluYztcbiAgICAgIGZyb20gKz0gaW5jO1xuICAgIH0gcmV0dXJuIE87XG4gIH1cbn0pO1xucmVxdWlyZSgnLi8kLnVuc2NvcGUnKSgnY29weVdpdGhpbicpOyIsIid1c2Ugc3RyaWN0JztcbnZhciAkZGVmICAgICA9IHJlcXVpcmUoJy4vJC5kZWYnKVxuICAsIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi8kLnRvLW9iamVjdCcpXG4gICwgdG9JbmRleCAgPSByZXF1aXJlKCcuLyQudG8taW5kZXgnKVxuICAsIHRvTGVuZ3RoID0gcmVxdWlyZSgnLi8kLnRvLWxlbmd0aCcpO1xuJGRlZigkZGVmLlAsICdBcnJheScsIHtcbiAgLy8gMjIuMS4zLjYgQXJyYXkucHJvdG90eXBlLmZpbGwodmFsdWUsIHN0YXJ0ID0gMCwgZW5kID0gdGhpcy5sZW5ndGgpXG4gIGZpbGw6IGZ1bmN0aW9uIGZpbGwodmFsdWUgLyosIHN0YXJ0ID0gMCwgZW5kID0gQGxlbmd0aCAqLyl7XG4gICAgdmFyIE8gICAgICA9IHRvT2JqZWN0KHRoaXMsIHRydWUpXG4gICAgICAsIGxlbmd0aCA9IHRvTGVuZ3RoKE8ubGVuZ3RoKVxuICAgICAgLCBpbmRleCAgPSB0b0luZGV4KGFyZ3VtZW50c1sxXSwgbGVuZ3RoKVxuICAgICAgLCBlbmQgICAgPSBhcmd1bWVudHNbMl1cbiAgICAgICwgZW5kUG9zID0gZW5kID09PSB1bmRlZmluZWQgPyBsZW5ndGggOiB0b0luZGV4KGVuZCwgbGVuZ3RoKTtcbiAgICB3aGlsZShlbmRQb3MgPiBpbmRleClPW2luZGV4KytdID0gdmFsdWU7XG4gICAgcmV0dXJuIE87XG4gIH1cbn0pO1xucmVxdWlyZSgnLi8kLnVuc2NvcGUnKSgnZmlsbCcpOyIsIid1c2Ugc3RyaWN0Jztcbi8vIDIyLjEuMy45IEFycmF5LnByb3RvdHlwZS5maW5kSW5kZXgocHJlZGljYXRlLCB0aGlzQXJnID0gdW5kZWZpbmVkKVxudmFyIEtFWSAgICA9ICdmaW5kSW5kZXgnXG4gICwgJGRlZiAgID0gcmVxdWlyZSgnLi8kLmRlZicpXG4gICwgZm9yY2VkID0gdHJ1ZVxuICAsICRmaW5kICA9IHJlcXVpcmUoJy4vJC5hcnJheS1tZXRob2RzJykoNik7XG4vLyBTaG91bGRuJ3Qgc2tpcCBob2xlc1xuaWYoS0VZIGluIFtdKUFycmF5KDEpW0tFWV0oZnVuY3Rpb24oKXsgZm9yY2VkID0gZmFsc2U7IH0pO1xuJGRlZigkZGVmLlAgKyAkZGVmLkYgKiBmb3JjZWQsICdBcnJheScsIHtcbiAgZmluZEluZGV4OiBmdW5jdGlvbiBmaW5kSW5kZXgoY2FsbGJhY2tmbi8qLCB0aGF0ID0gdW5kZWZpbmVkICovKXtcbiAgICByZXR1cm4gJGZpbmQodGhpcywgY2FsbGJhY2tmbiwgYXJndW1lbnRzWzFdKTtcbiAgfVxufSk7XG5yZXF1aXJlKCcuLyQudW5zY29wZScpKEtFWSk7IiwiJ3VzZSBzdHJpY3QnO1xuLy8gMjIuMS4zLjggQXJyYXkucHJvdG90eXBlLmZpbmQocHJlZGljYXRlLCB0aGlzQXJnID0gdW5kZWZpbmVkKVxudmFyIEtFWSAgICA9ICdmaW5kJ1xuICAsICRkZWYgICA9IHJlcXVpcmUoJy4vJC5kZWYnKVxuICAsIGZvcmNlZCA9IHRydWVcbiAgLCAkZmluZCAgPSByZXF1aXJlKCcuLyQuYXJyYXktbWV0aG9kcycpKDUpO1xuLy8gU2hvdWxkbid0IHNraXAgaG9sZXNcbmlmKEtFWSBpbiBbXSlBcnJheSgxKVtLRVldKGZ1bmN0aW9uKCl7IGZvcmNlZCA9IGZhbHNlOyB9KTtcbiRkZWYoJGRlZi5QICsgJGRlZi5GICogZm9yY2VkLCAnQXJyYXknLCB7XG4gIGZpbmQ6IGZ1bmN0aW9uIGZpbmQoY2FsbGJhY2tmbi8qLCB0aGF0ID0gdW5kZWZpbmVkICovKXtcbiAgICByZXR1cm4gJGZpbmQodGhpcywgY2FsbGJhY2tmbiwgYXJndW1lbnRzWzFdKTtcbiAgfVxufSk7XG5yZXF1aXJlKCcuLyQudW5zY29wZScpKEtFWSk7IiwiJ3VzZSBzdHJpY3QnO1xudmFyIGN0eCAgICAgICAgID0gcmVxdWlyZSgnLi8kLmN0eCcpXG4gICwgJGRlZiAgICAgICAgPSByZXF1aXJlKCcuLyQuZGVmJylcbiAgLCB0b09iamVjdCAgICA9IHJlcXVpcmUoJy4vJC50by1vYmplY3QnKVxuICAsIGNhbGwgICAgICAgID0gcmVxdWlyZSgnLi8kLml0ZXItY2FsbCcpXG4gICwgaXNBcnJheUl0ZXIgPSByZXF1aXJlKCcuLyQuaXMtYXJyYXktaXRlcicpXG4gICwgdG9MZW5ndGggICAgPSByZXF1aXJlKCcuLyQudG8tbGVuZ3RoJylcbiAgLCBnZXRJdGVyRm4gICA9IHJlcXVpcmUoJy4vY29yZS5nZXQtaXRlcmF0b3ItbWV0aG9kJyk7XG4kZGVmKCRkZWYuUyArICRkZWYuRiAqICFyZXF1aXJlKCcuLyQuaXRlci1kZXRlY3QnKShmdW5jdGlvbihpdGVyKXsgQXJyYXkuZnJvbShpdGVyKTsgfSksICdBcnJheScsIHtcbiAgLy8gMjIuMS4yLjEgQXJyYXkuZnJvbShhcnJheUxpa2UsIG1hcGZuID0gdW5kZWZpbmVkLCB0aGlzQXJnID0gdW5kZWZpbmVkKVxuICBmcm9tOiBmdW5jdGlvbiBmcm9tKGFycmF5TGlrZS8qLCBtYXBmbiA9IHVuZGVmaW5lZCwgdGhpc0FyZyA9IHVuZGVmaW5lZCovKXtcbiAgICB2YXIgTyAgICAgICA9IHRvT2JqZWN0KGFycmF5TGlrZSlcbiAgICAgICwgQyAgICAgICA9IHR5cGVvZiB0aGlzID09ICdmdW5jdGlvbicgPyB0aGlzIDogQXJyYXlcbiAgICAgICwgbWFwZm4gICA9IGFyZ3VtZW50c1sxXVxuICAgICAgLCBtYXBwaW5nID0gbWFwZm4gIT09IHVuZGVmaW5lZFxuICAgICAgLCBpbmRleCAgID0gMFxuICAgICAgLCBpdGVyRm4gID0gZ2V0SXRlckZuKE8pXG4gICAgICAsIGxlbmd0aCwgcmVzdWx0LCBzdGVwLCBpdGVyYXRvcjtcbiAgICBpZihtYXBwaW5nKW1hcGZuID0gY3R4KG1hcGZuLCBhcmd1bWVudHNbMl0sIDIpO1xuICAgIC8vIGlmIG9iamVjdCBpc24ndCBpdGVyYWJsZSBvciBpdCdzIGFycmF5IHdpdGggZGVmYXVsdCBpdGVyYXRvciAtIHVzZSBzaW1wbGUgY2FzZVxuICAgIGlmKGl0ZXJGbiAhPSB1bmRlZmluZWQgJiYgIShDID09IEFycmF5ICYmIGlzQXJyYXlJdGVyKGl0ZXJGbikpKXtcbiAgICAgIGZvcihpdGVyYXRvciA9IGl0ZXJGbi5jYWxsKE8pLCByZXN1bHQgPSBuZXcgQzsgIShzdGVwID0gaXRlcmF0b3IubmV4dCgpKS5kb25lOyBpbmRleCsrKXtcbiAgICAgICAgcmVzdWx0W2luZGV4XSA9IG1hcHBpbmcgPyBjYWxsKGl0ZXJhdG9yLCBtYXBmbiwgW3N0ZXAudmFsdWUsIGluZGV4XSwgdHJ1ZSkgOiBzdGVwLnZhbHVlO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBmb3IocmVzdWx0ID0gbmV3IEMobGVuZ3RoID0gdG9MZW5ndGgoTy5sZW5ndGgpKTsgbGVuZ3RoID4gaW5kZXg7IGluZGV4Kyspe1xuICAgICAgICByZXN1bHRbaW5kZXhdID0gbWFwcGluZyA/IG1hcGZuKE9baW5kZXhdLCBpbmRleCkgOiBPW2luZGV4XTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmVzdWx0Lmxlbmd0aCA9IGluZGV4O1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbn0pOyIsIid1c2Ugc3RyaWN0JztcbnZhciBzZXRVbnNjb3BlID0gcmVxdWlyZSgnLi8kLnVuc2NvcGUnKVxuICAsIHN0ZXAgICAgICAgPSByZXF1aXJlKCcuLyQuaXRlci1zdGVwJylcbiAgLCBJdGVyYXRvcnMgID0gcmVxdWlyZSgnLi8kLml0ZXJhdG9ycycpXG4gICwgdG9JT2JqZWN0ICA9IHJlcXVpcmUoJy4vJC50by1pb2JqZWN0Jyk7XG5cbi8vIDIyLjEuMy40IEFycmF5LnByb3RvdHlwZS5lbnRyaWVzKClcbi8vIDIyLjEuMy4xMyBBcnJheS5wcm90b3R5cGUua2V5cygpXG4vLyAyMi4xLjMuMjkgQXJyYXkucHJvdG90eXBlLnZhbHVlcygpXG4vLyAyMi4xLjMuMzAgQXJyYXkucHJvdG90eXBlW0BAaXRlcmF0b3JdKClcbnJlcXVpcmUoJy4vJC5pdGVyLWRlZmluZScpKEFycmF5LCAnQXJyYXknLCBmdW5jdGlvbihpdGVyYXRlZCwga2luZCl7XG4gIHRoaXMuX3QgPSB0b0lPYmplY3QoaXRlcmF0ZWQpOyAvLyB0YXJnZXRcbiAgdGhpcy5faSA9IDA7ICAgICAgICAgICAgICAgICAgIC8vIG5leHQgaW5kZXhcbiAgdGhpcy5fayA9IGtpbmQ7ICAgICAgICAgICAgICAgIC8vIGtpbmRcbi8vIDIyLjEuNS4yLjEgJUFycmF5SXRlcmF0b3JQcm90b3R5cGUlLm5leHQoKVxufSwgZnVuY3Rpb24oKXtcbiAgdmFyIE8gICAgID0gdGhpcy5fdFxuICAgICwga2luZCAgPSB0aGlzLl9rXG4gICAgLCBpbmRleCA9IHRoaXMuX2krKztcbiAgaWYoIU8gfHwgaW5kZXggPj0gTy5sZW5ndGgpe1xuICAgIHRoaXMuX3QgPSB1bmRlZmluZWQ7XG4gICAgcmV0dXJuIHN0ZXAoMSk7XG4gIH1cbiAgaWYoa2luZCA9PSAna2V5cycgIClyZXR1cm4gc3RlcCgwLCBpbmRleCk7XG4gIGlmKGtpbmQgPT0gJ3ZhbHVlcycpcmV0dXJuIHN0ZXAoMCwgT1tpbmRleF0pO1xuICByZXR1cm4gc3RlcCgwLCBbaW5kZXgsIE9baW5kZXhdXSk7XG59LCAndmFsdWVzJyk7XG5cbi8vIGFyZ3VtZW50c0xpc3RbQEBpdGVyYXRvcl0gaXMgJUFycmF5UHJvdG9fdmFsdWVzJSAoOS40LjQuNiwgOS40LjQuNylcbkl0ZXJhdG9ycy5Bcmd1bWVudHMgPSBJdGVyYXRvcnMuQXJyYXk7XG5cbnNldFVuc2NvcGUoJ2tleXMnKTtcbnNldFVuc2NvcGUoJ3ZhbHVlcycpO1xuc2V0VW5zY29wZSgnZW50cmllcycpOyIsIid1c2Ugc3RyaWN0JztcbnZhciAkZGVmID0gcmVxdWlyZSgnLi8kLmRlZicpO1xuXG4vLyBXZWJLaXQgQXJyYXkub2YgaXNuJ3QgZ2VuZXJpY1xuJGRlZigkZGVmLlMgKyAkZGVmLkYgKiByZXF1aXJlKCcuLyQuZmFpbHMnKShmdW5jdGlvbigpe1xuICBmdW5jdGlvbiBGKCl7fVxuICByZXR1cm4gIShBcnJheS5vZi5jYWxsKEYpIGluc3RhbmNlb2YgRik7XG59KSwgJ0FycmF5Jywge1xuICAvLyAyMi4xLjIuMyBBcnJheS5vZiggLi4uaXRlbXMpXG4gIG9mOiBmdW5jdGlvbiBvZigvKiAuLi5hcmdzICovKXtcbiAgICB2YXIgaW5kZXggID0gMFxuICAgICAgLCBsZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoXG4gICAgICAsIHJlc3VsdCA9IG5ldyAodHlwZW9mIHRoaXMgPT0gJ2Z1bmN0aW9uJyA/IHRoaXMgOiBBcnJheSkobGVuZ3RoKTtcbiAgICB3aGlsZShsZW5ndGggPiBpbmRleClyZXN1bHRbaW5kZXhdID0gYXJndW1lbnRzW2luZGV4KytdO1xuICAgIHJlc3VsdC5sZW5ndGggPSBsZW5ndGg7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxufSk7IiwicmVxdWlyZSgnLi8kLnNwZWNpZXMnKShBcnJheSk7IiwiJ3VzZSBzdHJpY3QnO1xudmFyICQgICAgICAgICAgICAgPSByZXF1aXJlKCcuLyQnKVxuICAsIGlzT2JqZWN0ICAgICAgPSByZXF1aXJlKCcuLyQuaXMtb2JqZWN0JylcbiAgLCBIQVNfSU5TVEFOQ0UgID0gcmVxdWlyZSgnLi8kLndrcycpKCdoYXNJbnN0YW5jZScpXG4gICwgRnVuY3Rpb25Qcm90byA9IEZ1bmN0aW9uLnByb3RvdHlwZTtcbi8vIDE5LjIuMy42IEZ1bmN0aW9uLnByb3RvdHlwZVtAQGhhc0luc3RhbmNlXShWKVxuaWYoIShIQVNfSU5TVEFOQ0UgaW4gRnVuY3Rpb25Qcm90bykpJC5zZXREZXNjKEZ1bmN0aW9uUHJvdG8sIEhBU19JTlNUQU5DRSwge3ZhbHVlOiBmdW5jdGlvbihPKXtcbiAgaWYodHlwZW9mIHRoaXMgIT0gJ2Z1bmN0aW9uJyB8fCAhaXNPYmplY3QoTykpcmV0dXJuIGZhbHNlO1xuICBpZighaXNPYmplY3QodGhpcy5wcm90b3R5cGUpKXJldHVybiBPIGluc3RhbmNlb2YgdGhpcztcbiAgLy8gZm9yIGVudmlyb25tZW50IHcvbyBuYXRpdmUgYEBAaGFzSW5zdGFuY2VgIGxvZ2ljIGVub3VnaCBgaW5zdGFuY2VvZmAsIGJ1dCBhZGQgdGhpczpcbiAgd2hpbGUoTyA9ICQuZ2V0UHJvdG8oTykpaWYodGhpcy5wcm90b3R5cGUgPT09IE8pcmV0dXJuIHRydWU7XG4gIHJldHVybiBmYWxzZTtcbn19KTsiLCJ2YXIgc2V0RGVzYyAgICA9IHJlcXVpcmUoJy4vJCcpLnNldERlc2NcbiAgLCBjcmVhdGVEZXNjID0gcmVxdWlyZSgnLi8kLnByb3BlcnR5LWRlc2MnKVxuICAsIGhhcyAgICAgICAgPSByZXF1aXJlKCcuLyQuaGFzJylcbiAgLCBGUHJvdG8gICAgID0gRnVuY3Rpb24ucHJvdG90eXBlXG4gICwgbmFtZVJFICAgICA9IC9eXFxzKmZ1bmN0aW9uIChbXiAoXSopL1xuICAsIE5BTUUgICAgICAgPSAnbmFtZSc7XG4vLyAxOS4yLjQuMiBuYW1lXG5OQU1FIGluIEZQcm90byB8fCByZXF1aXJlKCcuLyQuc3VwcG9ydC1kZXNjJykgJiYgc2V0RGVzYyhGUHJvdG8sIE5BTUUsIHtcbiAgY29uZmlndXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uKCl7XG4gICAgdmFyIG1hdGNoID0gKCcnICsgdGhpcykubWF0Y2gobmFtZVJFKVxuICAgICAgLCBuYW1lICA9IG1hdGNoID8gbWF0Y2hbMV0gOiAnJztcbiAgICBoYXModGhpcywgTkFNRSkgfHwgc2V0RGVzYyh0aGlzLCBOQU1FLCBjcmVhdGVEZXNjKDUsIG5hbWUpKTtcbiAgICByZXR1cm4gbmFtZTtcbiAgfVxufSk7IiwiJ3VzZSBzdHJpY3QnO1xudmFyIHN0cm9uZyA9IHJlcXVpcmUoJy4vJC5jb2xsZWN0aW9uLXN0cm9uZycpO1xuXG4vLyAyMy4xIE1hcCBPYmplY3RzXG5yZXF1aXJlKCcuLyQuY29sbGVjdGlvbicpKCdNYXAnLCBmdW5jdGlvbihnZXQpe1xuICByZXR1cm4gZnVuY3Rpb24gTWFwKCl7IHJldHVybiBnZXQodGhpcywgYXJndW1lbnRzWzBdKTsgfTtcbn0sIHtcbiAgLy8gMjMuMS4zLjYgTWFwLnByb3RvdHlwZS5nZXQoa2V5KVxuICBnZXQ6IGZ1bmN0aW9uIGdldChrZXkpe1xuICAgIHZhciBlbnRyeSA9IHN0cm9uZy5nZXRFbnRyeSh0aGlzLCBrZXkpO1xuICAgIHJldHVybiBlbnRyeSAmJiBlbnRyeS52O1xuICB9LFxuICAvLyAyMy4xLjMuOSBNYXAucHJvdG90eXBlLnNldChrZXksIHZhbHVlKVxuICBzZXQ6IGZ1bmN0aW9uIHNldChrZXksIHZhbHVlKXtcbiAgICByZXR1cm4gc3Ryb25nLmRlZih0aGlzLCBrZXkgPT09IDAgPyAwIDoga2V5LCB2YWx1ZSk7XG4gIH1cbn0sIHN0cm9uZywgdHJ1ZSk7IiwiLy8gMjAuMi4yLjMgTWF0aC5hY29zaCh4KVxudmFyICRkZWYgICA9IHJlcXVpcmUoJy4vJC5kZWYnKVxuICAsIGxvZzFwICA9IHJlcXVpcmUoJy4vJC5sb2cxcCcpXG4gICwgc3FydCAgID0gTWF0aC5zcXJ0XG4gICwgJGFjb3NoID0gTWF0aC5hY29zaDtcblxuLy8gVjggYnVnIGh0dHBzOi8vY29kZS5nb29nbGUuY29tL3AvdjgvaXNzdWVzL2RldGFpbD9pZD0zNTA5IFxuJGRlZigkZGVmLlMgKyAkZGVmLkYgKiAhKCRhY29zaCAmJiBNYXRoLmZsb29yKCRhY29zaChOdW1iZXIuTUFYX1ZBTFVFKSkgPT0gNzEwKSwgJ01hdGgnLCB7XG4gIGFjb3NoOiBmdW5jdGlvbiBhY29zaCh4KXtcbiAgICByZXR1cm4gKHggPSAreCkgPCAxID8gTmFOIDogeCA+IDk0OTA2MjY1LjYyNDI1MTU2XG4gICAgICA/IE1hdGgubG9nKHgpICsgTWF0aC5MTjJcbiAgICAgIDogbG9nMXAoeCAtIDEgKyBzcXJ0KHggLSAxKSAqIHNxcnQoeCArIDEpKTtcbiAgfVxufSk7IiwiLy8gMjAuMi4yLjUgTWF0aC5hc2luaCh4KVxudmFyICRkZWYgPSByZXF1aXJlKCcuLyQuZGVmJyk7XG5cbmZ1bmN0aW9uIGFzaW5oKHgpe1xuICByZXR1cm4gIWlzRmluaXRlKHggPSAreCkgfHwgeCA9PSAwID8geCA6IHggPCAwID8gLWFzaW5oKC14KSA6IE1hdGgubG9nKHggKyBNYXRoLnNxcnQoeCAqIHggKyAxKSk7XG59XG5cbiRkZWYoJGRlZi5TLCAnTWF0aCcsIHthc2luaDogYXNpbmh9KTsiLCIvLyAyMC4yLjIuNyBNYXRoLmF0YW5oKHgpXG52YXIgJGRlZiA9IHJlcXVpcmUoJy4vJC5kZWYnKTtcblxuJGRlZigkZGVmLlMsICdNYXRoJywge1xuICBhdGFuaDogZnVuY3Rpb24gYXRhbmgoeCl7XG4gICAgcmV0dXJuICh4ID0gK3gpID09IDAgPyB4IDogTWF0aC5sb2coKDEgKyB4KSAvICgxIC0geCkpIC8gMjtcbiAgfVxufSk7IiwiLy8gMjAuMi4yLjkgTWF0aC5jYnJ0KHgpXG52YXIgJGRlZiA9IHJlcXVpcmUoJy4vJC5kZWYnKVxuICAsIHNpZ24gPSByZXF1aXJlKCcuLyQuc2lnbicpO1xuXG4kZGVmKCRkZWYuUywgJ01hdGgnLCB7XG4gIGNicnQ6IGZ1bmN0aW9uIGNicnQoeCl7XG4gICAgcmV0dXJuIHNpZ24oeCA9ICt4KSAqIE1hdGgucG93KE1hdGguYWJzKHgpLCAxIC8gMyk7XG4gIH1cbn0pOyIsIi8vIDIwLjIuMi4xMSBNYXRoLmNsejMyKHgpXG52YXIgJGRlZiA9IHJlcXVpcmUoJy4vJC5kZWYnKTtcblxuJGRlZigkZGVmLlMsICdNYXRoJywge1xuICBjbHozMjogZnVuY3Rpb24gY2x6MzIoeCl7XG4gICAgcmV0dXJuICh4ID4+Pj0gMCkgPyAzMSAtIE1hdGguZmxvb3IoTWF0aC5sb2coeCArIDAuNSkgKiBNYXRoLkxPRzJFKSA6IDMyO1xuICB9XG59KTsiLCIvLyAyMC4yLjIuMTIgTWF0aC5jb3NoKHgpXG52YXIgJGRlZiA9IHJlcXVpcmUoJy4vJC5kZWYnKVxuICAsIGV4cCAgPSBNYXRoLmV4cDtcblxuJGRlZigkZGVmLlMsICdNYXRoJywge1xuICBjb3NoOiBmdW5jdGlvbiBjb3NoKHgpe1xuICAgIHJldHVybiAoZXhwKHggPSAreCkgKyBleHAoLXgpKSAvIDI7XG4gIH1cbn0pOyIsIi8vIDIwLjIuMi4xNCBNYXRoLmV4cG0xKHgpXG52YXIgJGRlZiA9IHJlcXVpcmUoJy4vJC5kZWYnKTtcblxuJGRlZigkZGVmLlMsICdNYXRoJywge2V4cG0xOiByZXF1aXJlKCcuLyQuZXhwbTEnKX0pOyIsIi8vIDIwLjIuMi4xNiBNYXRoLmZyb3VuZCh4KVxudmFyICRkZWYgID0gcmVxdWlyZSgnLi8kLmRlZicpXG4gICwgc2lnbiAgPSByZXF1aXJlKCcuLyQuc2lnbicpXG4gICwgcG93ICAgPSBNYXRoLnBvd1xuICAsIEVQU0lMT04gICA9IHBvdygyLCAtNTIpXG4gICwgRVBTSUxPTjMyID0gcG93KDIsIC0yMylcbiAgLCBNQVgzMiAgICAgPSBwb3coMiwgMTI3KSAqICgyIC0gRVBTSUxPTjMyKVxuICAsIE1JTjMyICAgICA9IHBvdygyLCAtMTI2KTtcblxudmFyIHJvdW5kVGllc1RvRXZlbiA9IGZ1bmN0aW9uKG4pe1xuICByZXR1cm4gbiArIDEgLyBFUFNJTE9OIC0gMSAvIEVQU0lMT047XG59O1xuXG5cbiRkZWYoJGRlZi5TLCAnTWF0aCcsIHtcbiAgZnJvdW5kOiBmdW5jdGlvbiBmcm91bmQoeCl7XG4gICAgdmFyICRhYnMgID0gTWF0aC5hYnMoeClcbiAgICAgICwgJHNpZ24gPSBzaWduKHgpXG4gICAgICAsIGEsIHJlc3VsdDtcbiAgICBpZigkYWJzIDwgTUlOMzIpcmV0dXJuICRzaWduICogcm91bmRUaWVzVG9FdmVuKCRhYnMgLyBNSU4zMiAvIEVQU0lMT04zMikgKiBNSU4zMiAqIEVQU0lMT04zMjtcbiAgICBhID0gKDEgKyBFUFNJTE9OMzIgLyBFUFNJTE9OKSAqICRhYnM7XG4gICAgcmVzdWx0ID0gYSAtIChhIC0gJGFicyk7XG4gICAgaWYocmVzdWx0ID4gTUFYMzIgfHwgcmVzdWx0ICE9IHJlc3VsdClyZXR1cm4gJHNpZ24gKiBJbmZpbml0eTtcbiAgICByZXR1cm4gJHNpZ24gKiByZXN1bHQ7XG4gIH1cbn0pOyIsIi8vIDIwLjIuMi4xNyBNYXRoLmh5cG90KFt2YWx1ZTFbLCB2YWx1ZTJbLCDigKYgXV1dKVxudmFyICRkZWYgPSByZXF1aXJlKCcuLyQuZGVmJylcbiAgLCBhYnMgID0gTWF0aC5hYnM7XG5cbiRkZWYoJGRlZi5TLCAnTWF0aCcsIHtcbiAgaHlwb3Q6IGZ1bmN0aW9uIGh5cG90KHZhbHVlMSwgdmFsdWUyKXsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuICAgIHZhciBzdW0gID0gMFxuICAgICAgLCBpICAgID0gMFxuICAgICAgLCBsZW4gID0gYXJndW1lbnRzLmxlbmd0aFxuICAgICAgLCBsYXJnID0gMFxuICAgICAgLCBhcmcsIGRpdjtcbiAgICB3aGlsZShpIDwgbGVuKXtcbiAgICAgIGFyZyA9IGFicyhhcmd1bWVudHNbaSsrXSk7XG4gICAgICBpZihsYXJnIDwgYXJnKXtcbiAgICAgICAgZGl2ICA9IGxhcmcgLyBhcmc7XG4gICAgICAgIHN1bSAgPSBzdW0gKiBkaXYgKiBkaXYgKyAxO1xuICAgICAgICBsYXJnID0gYXJnO1xuICAgICAgfSBlbHNlIGlmKGFyZyA+IDApe1xuICAgICAgICBkaXYgID0gYXJnIC8gbGFyZztcbiAgICAgICAgc3VtICs9IGRpdiAqIGRpdjtcbiAgICAgIH0gZWxzZSBzdW0gKz0gYXJnO1xuICAgIH1cbiAgICByZXR1cm4gbGFyZyA9PT0gSW5maW5pdHkgPyBJbmZpbml0eSA6IGxhcmcgKiBNYXRoLnNxcnQoc3VtKTtcbiAgfVxufSk7IiwiLy8gMjAuMi4yLjE4IE1hdGguaW11bCh4LCB5KVxudmFyICRkZWYgPSByZXF1aXJlKCcuLyQuZGVmJyk7XG5cbi8vIFdlYktpdCBmYWlscyB3aXRoIGJpZyBudW1iZXJzXG4kZGVmKCRkZWYuUyArICRkZWYuRiAqIHJlcXVpcmUoJy4vJC5mYWlscycpKGZ1bmN0aW9uKCl7XG4gIHJldHVybiBNYXRoLmltdWwoMHhmZmZmZmZmZiwgNSkgIT0gLTU7XG59KSwgJ01hdGgnLCB7XG4gIGltdWw6IGZ1bmN0aW9uIGltdWwoeCwgeSl7XG4gICAgdmFyIFVJTlQxNiA9IDB4ZmZmZlxuICAgICAgLCB4biA9ICt4XG4gICAgICAsIHluID0gK3lcbiAgICAgICwgeGwgPSBVSU5UMTYgJiB4blxuICAgICAgLCB5bCA9IFVJTlQxNiAmIHluO1xuICAgIHJldHVybiAwIHwgeGwgKiB5bCArICgoVUlOVDE2ICYgeG4gPj4+IDE2KSAqIHlsICsgeGwgKiAoVUlOVDE2ICYgeW4gPj4+IDE2KSA8PCAxNiA+Pj4gMCk7XG4gIH1cbn0pOyIsIi8vIDIwLjIuMi4yMSBNYXRoLmxvZzEwKHgpXG52YXIgJGRlZiA9IHJlcXVpcmUoJy4vJC5kZWYnKTtcblxuJGRlZigkZGVmLlMsICdNYXRoJywge1xuICBsb2cxMDogZnVuY3Rpb24gbG9nMTAoeCl7XG4gICAgcmV0dXJuIE1hdGgubG9nKHgpIC8gTWF0aC5MTjEwO1xuICB9XG59KTsiLCIvLyAyMC4yLjIuMjAgTWF0aC5sb2cxcCh4KVxudmFyICRkZWYgPSByZXF1aXJlKCcuLyQuZGVmJyk7XG5cbiRkZWYoJGRlZi5TLCAnTWF0aCcsIHtsb2cxcDogcmVxdWlyZSgnLi8kLmxvZzFwJyl9KTsiLCIvLyAyMC4yLjIuMjIgTWF0aC5sb2cyKHgpXG52YXIgJGRlZiA9IHJlcXVpcmUoJy4vJC5kZWYnKTtcblxuJGRlZigkZGVmLlMsICdNYXRoJywge1xuICBsb2cyOiBmdW5jdGlvbiBsb2cyKHgpe1xuICAgIHJldHVybiBNYXRoLmxvZyh4KSAvIE1hdGguTE4yO1xuICB9XG59KTsiLCIvLyAyMC4yLjIuMjggTWF0aC5zaWduKHgpXG52YXIgJGRlZiA9IHJlcXVpcmUoJy4vJC5kZWYnKTtcblxuJGRlZigkZGVmLlMsICdNYXRoJywge3NpZ246IHJlcXVpcmUoJy4vJC5zaWduJyl9KTsiLCIvLyAyMC4yLjIuMzAgTWF0aC5zaW5oKHgpXG52YXIgJGRlZiAgPSByZXF1aXJlKCcuLyQuZGVmJylcbiAgLCBleHBtMSA9IHJlcXVpcmUoJy4vJC5leHBtMScpXG4gICwgZXhwICAgPSBNYXRoLmV4cDtcblxuJGRlZigkZGVmLlMsICdNYXRoJywge1xuICBzaW5oOiBmdW5jdGlvbiBzaW5oKHgpe1xuICAgIHJldHVybiBNYXRoLmFicyh4ID0gK3gpIDwgMVxuICAgICAgPyAoZXhwbTEoeCkgLSBleHBtMSgteCkpIC8gMlxuICAgICAgOiAoZXhwKHggLSAxKSAtIGV4cCgteCAtIDEpKSAqIChNYXRoLkUgLyAyKTtcbiAgfVxufSk7IiwiLy8gMjAuMi4yLjMzIE1hdGgudGFuaCh4KVxudmFyICRkZWYgID0gcmVxdWlyZSgnLi8kLmRlZicpXG4gICwgZXhwbTEgPSByZXF1aXJlKCcuLyQuZXhwbTEnKVxuICAsIGV4cCAgID0gTWF0aC5leHA7XG5cbiRkZWYoJGRlZi5TLCAnTWF0aCcsIHtcbiAgdGFuaDogZnVuY3Rpb24gdGFuaCh4KXtcbiAgICB2YXIgYSA9IGV4cG0xKHggPSAreClcbiAgICAgICwgYiA9IGV4cG0xKC14KTtcbiAgICByZXR1cm4gYSA9PSBJbmZpbml0eSA/IDEgOiBiID09IEluZmluaXR5ID8gLTEgOiAoYSAtIGIpIC8gKGV4cCh4KSArIGV4cCgteCkpO1xuICB9XG59KTsiLCIvLyAyMC4yLjIuMzQgTWF0aC50cnVuYyh4KVxudmFyICRkZWYgPSByZXF1aXJlKCcuLyQuZGVmJyk7XG5cbiRkZWYoJGRlZi5TLCAnTWF0aCcsIHtcbiAgdHJ1bmM6IGZ1bmN0aW9uIHRydW5jKGl0KXtcbiAgICByZXR1cm4gKGl0ID4gMCA/IE1hdGguZmxvb3IgOiBNYXRoLmNlaWwpKGl0KTtcbiAgfVxufSk7IiwiJ3VzZSBzdHJpY3QnO1xudmFyICQgICAgICAgICAgPSByZXF1aXJlKCcuLyQnKVxuICAsIGdsb2JhbCAgICAgPSByZXF1aXJlKCcuLyQuZ2xvYmFsJylcbiAgLCBoYXMgICAgICAgID0gcmVxdWlyZSgnLi8kLmhhcycpXG4gICwgY29mICAgICAgICA9IHJlcXVpcmUoJy4vJC5jb2YnKVxuICAsIGlzT2JqZWN0ICAgPSByZXF1aXJlKCcuLyQuaXMtb2JqZWN0JylcbiAgLCBmYWlscyAgICAgID0gcmVxdWlyZSgnLi8kLmZhaWxzJylcbiAgLCBOVU1CRVIgICAgID0gJ051bWJlcidcbiAgLCAkTnVtYmVyICAgID0gZ2xvYmFsW05VTUJFUl1cbiAgLCBCYXNlICAgICAgID0gJE51bWJlclxuICAsIHByb3RvICAgICAgPSAkTnVtYmVyLnByb3RvdHlwZVxuICAvLyBPcGVyYSB+MTIgaGFzIGJyb2tlbiBPYmplY3QjdG9TdHJpbmdcbiAgLCBCUk9LRU5fQ09GID0gY29mKCQuY3JlYXRlKHByb3RvKSkgPT0gTlVNQkVSO1xudmFyIHRvUHJpbWl0aXZlID0gZnVuY3Rpb24oaXQpe1xuICB2YXIgZm4sIHZhbDtcbiAgaWYodHlwZW9mIChmbiA9IGl0LnZhbHVlT2YpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSlyZXR1cm4gdmFsO1xuICBpZih0eXBlb2YgKGZuID0gaXQudG9TdHJpbmcpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSlyZXR1cm4gdmFsO1xuICB0aHJvdyBUeXBlRXJyb3IoXCJDYW4ndCBjb252ZXJ0IG9iamVjdCB0byBudW1iZXJcIik7XG59O1xudmFyIHRvTnVtYmVyID0gZnVuY3Rpb24oaXQpe1xuICBpZihpc09iamVjdChpdCkpaXQgPSB0b1ByaW1pdGl2ZShpdCk7XG4gIGlmKHR5cGVvZiBpdCA9PSAnc3RyaW5nJyAmJiBpdC5sZW5ndGggPiAyICYmIGl0LmNoYXJDb2RlQXQoMCkgPT0gNDgpe1xuICAgIHZhciBiaW5hcnkgPSBmYWxzZTtcbiAgICBzd2l0Y2goaXQuY2hhckNvZGVBdCgxKSl7XG4gICAgICBjYXNlIDY2IDogY2FzZSA5OCAgOiBiaW5hcnkgPSB0cnVlO1xuICAgICAgY2FzZSA3OSA6IGNhc2UgMTExIDogcmV0dXJuIHBhcnNlSW50KGl0LnNsaWNlKDIpLCBiaW5hcnkgPyAyIDogOCk7XG4gICAgfVxuICB9IHJldHVybiAraXQ7XG59O1xuaWYoISgkTnVtYmVyKCcwbzEnKSAmJiAkTnVtYmVyKCcwYjEnKSkpe1xuICAkTnVtYmVyID0gZnVuY3Rpb24gTnVtYmVyKGl0KXtcbiAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgcmV0dXJuIHRoYXQgaW5zdGFuY2VvZiAkTnVtYmVyXG4gICAgICAvLyBjaGVjayBvbiAxLi5jb25zdHJ1Y3Rvcihmb28pIGNhc2VcbiAgICAgICYmIChCUk9LRU5fQ09GID8gZmFpbHMoZnVuY3Rpb24oKXsgcHJvdG8udmFsdWVPZi5jYWxsKHRoYXQpOyB9KSA6IGNvZih0aGF0KSAhPSBOVU1CRVIpXG4gICAgICAgID8gbmV3IEJhc2UodG9OdW1iZXIoaXQpKSA6IHRvTnVtYmVyKGl0KTtcbiAgfTtcbiAgJC5lYWNoLmNhbGwocmVxdWlyZSgnLi8kLnN1cHBvcnQtZGVzYycpID8gJC5nZXROYW1lcyhCYXNlKSA6IChcbiAgICAgIC8vIEVTMzpcbiAgICAgICdNQVhfVkFMVUUsTUlOX1ZBTFVFLE5hTixORUdBVElWRV9JTkZJTklUWSxQT1NJVElWRV9JTkZJTklUWSwnICtcbiAgICAgIC8vIEVTNiAoaW4gY2FzZSwgaWYgbW9kdWxlcyB3aXRoIEVTNiBOdW1iZXIgc3RhdGljcyByZXF1aXJlZCBiZWZvcmUpOlxuICAgICAgJ0VQU0lMT04saXNGaW5pdGUsaXNJbnRlZ2VyLGlzTmFOLGlzU2FmZUludGVnZXIsTUFYX1NBRkVfSU5URUdFUiwnICtcbiAgICAgICdNSU5fU0FGRV9JTlRFR0VSLHBhcnNlRmxvYXQscGFyc2VJbnQsaXNJbnRlZ2VyJ1xuICAgICkuc3BsaXQoJywnKSwgZnVuY3Rpb24oa2V5KXtcbiAgICAgIGlmKGhhcyhCYXNlLCBrZXkpICYmICFoYXMoJE51bWJlciwga2V5KSl7XG4gICAgICAgICQuc2V0RGVzYygkTnVtYmVyLCBrZXksICQuZ2V0RGVzYyhCYXNlLCBrZXkpKTtcbiAgICAgIH1cbiAgICB9XG4gICk7XG4gICROdW1iZXIucHJvdG90eXBlID0gcHJvdG87XG4gIHByb3RvLmNvbnN0cnVjdG9yID0gJE51bWJlcjtcbiAgcmVxdWlyZSgnLi8kLnJlZGVmJykoZ2xvYmFsLCBOVU1CRVIsICROdW1iZXIpO1xufSIsIi8vIDIwLjEuMi4xIE51bWJlci5FUFNJTE9OXG52YXIgJGRlZiA9IHJlcXVpcmUoJy4vJC5kZWYnKTtcblxuJGRlZigkZGVmLlMsICdOdW1iZXInLCB7RVBTSUxPTjogTWF0aC5wb3coMiwgLTUyKX0pOyIsIi8vIDIwLjEuMi4yIE51bWJlci5pc0Zpbml0ZShudW1iZXIpXG52YXIgJGRlZiAgICAgID0gcmVxdWlyZSgnLi8kLmRlZicpXG4gICwgX2lzRmluaXRlID0gcmVxdWlyZSgnLi8kLmdsb2JhbCcpLmlzRmluaXRlO1xuXG4kZGVmKCRkZWYuUywgJ051bWJlcicsIHtcbiAgaXNGaW5pdGU6IGZ1bmN0aW9uIGlzRmluaXRlKGl0KXtcbiAgICByZXR1cm4gdHlwZW9mIGl0ID09ICdudW1iZXInICYmIF9pc0Zpbml0ZShpdCk7XG4gIH1cbn0pOyIsIi8vIDIwLjEuMi4zIE51bWJlci5pc0ludGVnZXIobnVtYmVyKVxudmFyICRkZWYgPSByZXF1aXJlKCcuLyQuZGVmJyk7XG5cbiRkZWYoJGRlZi5TLCAnTnVtYmVyJywge2lzSW50ZWdlcjogcmVxdWlyZSgnLi8kLmlzLWludGVnZXInKX0pOyIsIi8vIDIwLjEuMi40IE51bWJlci5pc05hTihudW1iZXIpXG52YXIgJGRlZiA9IHJlcXVpcmUoJy4vJC5kZWYnKTtcblxuJGRlZigkZGVmLlMsICdOdW1iZXInLCB7XG4gIGlzTmFOOiBmdW5jdGlvbiBpc05hTihudW1iZXIpe1xuICAgIHJldHVybiBudW1iZXIgIT0gbnVtYmVyO1xuICB9XG59KTsiLCIvLyAyMC4xLjIuNSBOdW1iZXIuaXNTYWZlSW50ZWdlcihudW1iZXIpXG52YXIgJGRlZiAgICAgID0gcmVxdWlyZSgnLi8kLmRlZicpXG4gICwgaXNJbnRlZ2VyID0gcmVxdWlyZSgnLi8kLmlzLWludGVnZXInKVxuICAsIGFicyAgICAgICA9IE1hdGguYWJzO1xuXG4kZGVmKCRkZWYuUywgJ051bWJlcicsIHtcbiAgaXNTYWZlSW50ZWdlcjogZnVuY3Rpb24gaXNTYWZlSW50ZWdlcihudW1iZXIpe1xuICAgIHJldHVybiBpc0ludGVnZXIobnVtYmVyKSAmJiBhYnMobnVtYmVyKSA8PSAweDFmZmZmZmZmZmZmZmZmO1xuICB9XG59KTsiLCIvLyAyMC4xLjIuNiBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUlxudmFyICRkZWYgPSByZXF1aXJlKCcuLyQuZGVmJyk7XG5cbiRkZWYoJGRlZi5TLCAnTnVtYmVyJywge01BWF9TQUZFX0lOVEVHRVI6IDB4MWZmZmZmZmZmZmZmZmZ9KTsiLCIvLyAyMC4xLjIuMTAgTnVtYmVyLk1JTl9TQUZFX0lOVEVHRVJcbnZhciAkZGVmID0gcmVxdWlyZSgnLi8kLmRlZicpO1xuXG4kZGVmKCRkZWYuUywgJ051bWJlcicsIHtNSU5fU0FGRV9JTlRFR0VSOiAtMHgxZmZmZmZmZmZmZmZmZn0pOyIsIi8vIDIwLjEuMi4xMiBOdW1iZXIucGFyc2VGbG9hdChzdHJpbmcpXG52YXIgJGRlZiA9IHJlcXVpcmUoJy4vJC5kZWYnKTtcblxuJGRlZigkZGVmLlMsICdOdW1iZXInLCB7cGFyc2VGbG9hdDogcGFyc2VGbG9hdH0pOyIsIi8vIDIwLjEuMi4xMyBOdW1iZXIucGFyc2VJbnQoc3RyaW5nLCByYWRpeClcbnZhciAkZGVmID0gcmVxdWlyZSgnLi8kLmRlZicpO1xuXG4kZGVmKCRkZWYuUywgJ051bWJlcicsIHtwYXJzZUludDogcGFyc2VJbnR9KTsiLCIvLyAxOS4xLjMuMSBPYmplY3QuYXNzaWduKHRhcmdldCwgc291cmNlKVxudmFyICRkZWYgPSByZXF1aXJlKCcuLyQuZGVmJyk7XG5cbiRkZWYoJGRlZi5TICsgJGRlZi5GLCAnT2JqZWN0Jywge2Fzc2lnbjogcmVxdWlyZSgnLi8kLmFzc2lnbicpfSk7IiwiLy8gMTkuMS4yLjUgT2JqZWN0LmZyZWV6ZShPKVxudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi8kLmlzLW9iamVjdCcpO1xuXG5yZXF1aXJlKCcuLyQub2JqZWN0LXNhcCcpKCdmcmVlemUnLCBmdW5jdGlvbigkZnJlZXplKXtcbiAgcmV0dXJuIGZ1bmN0aW9uIGZyZWV6ZShpdCl7XG4gICAgcmV0dXJuICRmcmVlemUgJiYgaXNPYmplY3QoaXQpID8gJGZyZWV6ZShpdCkgOiBpdDtcbiAgfTtcbn0pOyIsIi8vIDE5LjEuMi42IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoTywgUClcbnZhciB0b0lPYmplY3QgPSByZXF1aXJlKCcuLyQudG8taW9iamVjdCcpO1xuXG5yZXF1aXJlKCcuLyQub2JqZWN0LXNhcCcpKCdnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3InLCBmdW5jdGlvbigkZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKXtcbiAgcmV0dXJuIGZ1bmN0aW9uIGdldE93blByb3BlcnR5RGVzY3JpcHRvcihpdCwga2V5KXtcbiAgICByZXR1cm4gJGdldE93blByb3BlcnR5RGVzY3JpcHRvcih0b0lPYmplY3QoaXQpLCBrZXkpO1xuICB9O1xufSk7IiwiLy8gMTkuMS4yLjcgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoTylcbnJlcXVpcmUoJy4vJC5vYmplY3Qtc2FwJykoJ2dldE93blByb3BlcnR5TmFtZXMnLCBmdW5jdGlvbigpe1xuICByZXR1cm4gcmVxdWlyZSgnLi8kLmdldC1uYW1lcycpLmdldDtcbn0pOyIsIi8vIDE5LjEuMi45IE9iamVjdC5nZXRQcm90b3R5cGVPZihPKVxudmFyIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi8kLnRvLW9iamVjdCcpO1xuXG5yZXF1aXJlKCcuLyQub2JqZWN0LXNhcCcpKCdnZXRQcm90b3R5cGVPZicsIGZ1bmN0aW9uKCRnZXRQcm90b3R5cGVPZil7XG4gIHJldHVybiBmdW5jdGlvbiBnZXRQcm90b3R5cGVPZihpdCl7XG4gICAgcmV0dXJuICRnZXRQcm90b3R5cGVPZih0b09iamVjdChpdCkpO1xuICB9O1xufSk7IiwiLy8gMTkuMS4yLjExIE9iamVjdC5pc0V4dGVuc2libGUoTylcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vJC5pcy1vYmplY3QnKTtcblxucmVxdWlyZSgnLi8kLm9iamVjdC1zYXAnKSgnaXNFeHRlbnNpYmxlJywgZnVuY3Rpb24oJGlzRXh0ZW5zaWJsZSl7XG4gIHJldHVybiBmdW5jdGlvbiBpc0V4dGVuc2libGUoaXQpe1xuICAgIHJldHVybiBpc09iamVjdChpdCkgPyAkaXNFeHRlbnNpYmxlID8gJGlzRXh0ZW5zaWJsZShpdCkgOiB0cnVlIDogZmFsc2U7XG4gIH07XG59KTsiLCIvLyAxOS4xLjIuMTIgT2JqZWN0LmlzRnJvemVuKE8pXG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLyQuaXMtb2JqZWN0Jyk7XG5cbnJlcXVpcmUoJy4vJC5vYmplY3Qtc2FwJykoJ2lzRnJvemVuJywgZnVuY3Rpb24oJGlzRnJvemVuKXtcbiAgcmV0dXJuIGZ1bmN0aW9uIGlzRnJvemVuKGl0KXtcbiAgICByZXR1cm4gaXNPYmplY3QoaXQpID8gJGlzRnJvemVuID8gJGlzRnJvemVuKGl0KSA6IGZhbHNlIDogdHJ1ZTtcbiAgfTtcbn0pOyIsIi8vIDE5LjEuMi4xMyBPYmplY3QuaXNTZWFsZWQoTylcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vJC5pcy1vYmplY3QnKTtcblxucmVxdWlyZSgnLi8kLm9iamVjdC1zYXAnKSgnaXNTZWFsZWQnLCBmdW5jdGlvbigkaXNTZWFsZWQpe1xuICByZXR1cm4gZnVuY3Rpb24gaXNTZWFsZWQoaXQpe1xuICAgIHJldHVybiBpc09iamVjdChpdCkgPyAkaXNTZWFsZWQgPyAkaXNTZWFsZWQoaXQpIDogZmFsc2UgOiB0cnVlO1xuICB9O1xufSk7IiwiLy8gMTkuMS4zLjEwIE9iamVjdC5pcyh2YWx1ZTEsIHZhbHVlMilcbnZhciAkZGVmID0gcmVxdWlyZSgnLi8kLmRlZicpO1xuJGRlZigkZGVmLlMsICdPYmplY3QnLCB7XG4gIGlzOiByZXF1aXJlKCcuLyQuc2FtZScpXG59KTsiLCIvLyAxOS4xLjIuMTQgT2JqZWN0LmtleXMoTylcbnZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4vJC50by1vYmplY3QnKTtcblxucmVxdWlyZSgnLi8kLm9iamVjdC1zYXAnKSgna2V5cycsIGZ1bmN0aW9uKCRrZXlzKXtcbiAgcmV0dXJuIGZ1bmN0aW9uIGtleXMoaXQpe1xuICAgIHJldHVybiAka2V5cyh0b09iamVjdChpdCkpO1xuICB9O1xufSk7IiwiLy8gMTkuMS4yLjE1IE9iamVjdC5wcmV2ZW50RXh0ZW5zaW9ucyhPKVxudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi8kLmlzLW9iamVjdCcpO1xuXG5yZXF1aXJlKCcuLyQub2JqZWN0LXNhcCcpKCdwcmV2ZW50RXh0ZW5zaW9ucycsIGZ1bmN0aW9uKCRwcmV2ZW50RXh0ZW5zaW9ucyl7XG4gIHJldHVybiBmdW5jdGlvbiBwcmV2ZW50RXh0ZW5zaW9ucyhpdCl7XG4gICAgcmV0dXJuICRwcmV2ZW50RXh0ZW5zaW9ucyAmJiBpc09iamVjdChpdCkgPyAkcHJldmVudEV4dGVuc2lvbnMoaXQpIDogaXQ7XG4gIH07XG59KTsiLCIvLyAxOS4xLjIuMTcgT2JqZWN0LnNlYWwoTylcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vJC5pcy1vYmplY3QnKTtcblxucmVxdWlyZSgnLi8kLm9iamVjdC1zYXAnKSgnc2VhbCcsIGZ1bmN0aW9uKCRzZWFsKXtcbiAgcmV0dXJuIGZ1bmN0aW9uIHNlYWwoaXQpe1xuICAgIHJldHVybiAkc2VhbCAmJiBpc09iamVjdChpdCkgPyAkc2VhbChpdCkgOiBpdDtcbiAgfTtcbn0pOyIsIi8vIDE5LjEuMy4xOSBPYmplY3Quc2V0UHJvdG90eXBlT2YoTywgcHJvdG8pXG52YXIgJGRlZiA9IHJlcXVpcmUoJy4vJC5kZWYnKTtcbiRkZWYoJGRlZi5TLCAnT2JqZWN0Jywge3NldFByb3RvdHlwZU9mOiByZXF1aXJlKCcuLyQuc2V0LXByb3RvJykuc2V0fSk7IiwiJ3VzZSBzdHJpY3QnO1xuLy8gMTkuMS4zLjYgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZygpXG52YXIgY2xhc3NvZiA9IHJlcXVpcmUoJy4vJC5jbGFzc29mJylcbiAgLCB0ZXN0ICAgID0ge307XG50ZXN0W3JlcXVpcmUoJy4vJC53a3MnKSgndG9TdHJpbmdUYWcnKV0gPSAneic7XG5pZih0ZXN0ICsgJycgIT0gJ1tvYmplY3Qgel0nKXtcbiAgcmVxdWlyZSgnLi8kLnJlZGVmJykoT2JqZWN0LnByb3RvdHlwZSwgJ3RvU3RyaW5nJywgZnVuY3Rpb24gdG9TdHJpbmcoKXtcbiAgICByZXR1cm4gJ1tvYmplY3QgJyArIGNsYXNzb2YodGhpcykgKyAnXSc7XG4gIH0sIHRydWUpO1xufSIsIid1c2Ugc3RyaWN0JztcbnZhciAkICAgICAgICAgID0gcmVxdWlyZSgnLi8kJylcbiAgLCBMSUJSQVJZICAgID0gcmVxdWlyZSgnLi8kLmxpYnJhcnknKVxuICAsIGdsb2JhbCAgICAgPSByZXF1aXJlKCcuLyQuZ2xvYmFsJylcbiAgLCBjdHggICAgICAgID0gcmVxdWlyZSgnLi8kLmN0eCcpXG4gICwgY2xhc3NvZiAgICA9IHJlcXVpcmUoJy4vJC5jbGFzc29mJylcbiAgLCAkZGVmICAgICAgID0gcmVxdWlyZSgnLi8kLmRlZicpXG4gICwgaXNPYmplY3QgICA9IHJlcXVpcmUoJy4vJC5pcy1vYmplY3QnKVxuICAsIGFuT2JqZWN0ICAgPSByZXF1aXJlKCcuLyQuYW4tb2JqZWN0JylcbiAgLCBhRnVuY3Rpb24gID0gcmVxdWlyZSgnLi8kLmEtZnVuY3Rpb24nKVxuICAsIHN0cmljdE5ldyAgPSByZXF1aXJlKCcuLyQuc3RyaWN0LW5ldycpXG4gICwgZm9yT2YgICAgICA9IHJlcXVpcmUoJy4vJC5mb3Itb2YnKVxuICAsIHNldFByb3RvICAgPSByZXF1aXJlKCcuLyQuc2V0LXByb3RvJykuc2V0XG4gICwgc2FtZSAgICAgICA9IHJlcXVpcmUoJy4vJC5zYW1lJylcbiAgLCBzcGVjaWVzICAgID0gcmVxdWlyZSgnLi8kLnNwZWNpZXMnKVxuICAsIFNQRUNJRVMgICAgPSByZXF1aXJlKCcuLyQud2tzJykoJ3NwZWNpZXMnKVxuICAsIFJFQ09SRCAgICAgPSByZXF1aXJlKCcuLyQudWlkJykoJ3JlY29yZCcpXG4gICwgYXNhcCAgICAgICA9IHJlcXVpcmUoJy4vJC5taWNyb3Rhc2snKVxuICAsIFBST01JU0UgICAgPSAnUHJvbWlzZSdcbiAgLCBwcm9jZXNzICAgID0gZ2xvYmFsLnByb2Nlc3NcbiAgLCBpc05vZGUgICAgID0gY2xhc3NvZihwcm9jZXNzKSA9PSAncHJvY2VzcydcbiAgLCBQICAgICAgICAgID0gZ2xvYmFsW1BST01JU0VdXG4gICwgV3JhcHBlcjtcblxudmFyIHRlc3RSZXNvbHZlID0gZnVuY3Rpb24oc3ViKXtcbiAgdmFyIHRlc3QgPSBuZXcgUChmdW5jdGlvbigpe30pO1xuICBpZihzdWIpdGVzdC5jb25zdHJ1Y3RvciA9IE9iamVjdDtcbiAgcmV0dXJuIFAucmVzb2x2ZSh0ZXN0KSA9PT0gdGVzdDtcbn07XG5cbnZhciB1c2VOYXRpdmUgPSBmdW5jdGlvbigpe1xuICB2YXIgd29ya3MgPSBmYWxzZTtcbiAgZnVuY3Rpb24gUDIoeCl7XG4gICAgdmFyIHNlbGYgPSBuZXcgUCh4KTtcbiAgICBzZXRQcm90byhzZWxmLCBQMi5wcm90b3R5cGUpO1xuICAgIHJldHVybiBzZWxmO1xuICB9XG4gIHRyeSB7XG4gICAgd29ya3MgPSBQICYmIFAucmVzb2x2ZSAmJiB0ZXN0UmVzb2x2ZSgpO1xuICAgIHNldFByb3RvKFAyLCBQKTtcbiAgICBQMi5wcm90b3R5cGUgPSAkLmNyZWF0ZShQLnByb3RvdHlwZSwge2NvbnN0cnVjdG9yOiB7dmFsdWU6IFAyfX0pO1xuICAgIC8vIGFjdHVhbCBGaXJlZm94IGhhcyBicm9rZW4gc3ViY2xhc3Mgc3VwcG9ydCwgdGVzdCB0aGF0XG4gICAgaWYoIShQMi5yZXNvbHZlKDUpLnRoZW4oZnVuY3Rpb24oKXt9KSBpbnN0YW5jZW9mIFAyKSl7XG4gICAgICB3b3JrcyA9IGZhbHNlO1xuICAgIH1cbiAgICAvLyBhY3R1YWwgVjggYnVnLCBodHRwczovL2NvZGUuZ29vZ2xlLmNvbS9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9NDE2MlxuICAgIGlmKHdvcmtzICYmIHJlcXVpcmUoJy4vJC5zdXBwb3J0LWRlc2MnKSl7XG4gICAgICB2YXIgdGhlbmFibGVUaGVuR290dGVuID0gZmFsc2U7XG4gICAgICBQLnJlc29sdmUoJC5zZXREZXNjKHt9LCAndGhlbicsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbigpeyB0aGVuYWJsZVRoZW5Hb3R0ZW4gPSB0cnVlOyB9XG4gICAgICB9KSk7XG4gICAgICB3b3JrcyA9IHRoZW5hYmxlVGhlbkdvdHRlbjtcbiAgICB9XG4gIH0gY2F0Y2goZSl7IHdvcmtzID0gZmFsc2U7IH1cbiAgcmV0dXJuIHdvcmtzO1xufSgpO1xuXG4vLyBoZWxwZXJzXG52YXIgaXNQcm9taXNlID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gaXNPYmplY3QoaXQpICYmICh1c2VOYXRpdmUgPyBjbGFzc29mKGl0KSA9PSAnUHJvbWlzZScgOiBSRUNPUkQgaW4gaXQpO1xufTtcbnZhciBzYW1lQ29uc3RydWN0b3IgPSBmdW5jdGlvbihhLCBiKXtcbiAgLy8gbGlicmFyeSB3cmFwcGVyIHNwZWNpYWwgY2FzZVxuICBpZihMSUJSQVJZICYmIGEgPT09IFAgJiYgYiA9PT0gV3JhcHBlcilyZXR1cm4gdHJ1ZTtcbiAgcmV0dXJuIHNhbWUoYSwgYik7XG59O1xudmFyIGdldENvbnN0cnVjdG9yID0gZnVuY3Rpb24oQyl7XG4gIHZhciBTID0gYW5PYmplY3QoQylbU1BFQ0lFU107XG4gIHJldHVybiBTICE9IHVuZGVmaW5lZCA/IFMgOiBDO1xufTtcbnZhciBpc1RoZW5hYmxlID0gZnVuY3Rpb24oaXQpe1xuICB2YXIgdGhlbjtcbiAgcmV0dXJuIGlzT2JqZWN0KGl0KSAmJiB0eXBlb2YgKHRoZW4gPSBpdC50aGVuKSA9PSAnZnVuY3Rpb24nID8gdGhlbiA6IGZhbHNlO1xufTtcbnZhciBub3RpZnkgPSBmdW5jdGlvbihyZWNvcmQsIGlzUmVqZWN0KXtcbiAgaWYocmVjb3JkLm4pcmV0dXJuO1xuICByZWNvcmQubiA9IHRydWU7XG4gIHZhciBjaGFpbiA9IHJlY29yZC5jO1xuICBhc2FwKGZ1bmN0aW9uKCl7XG4gICAgdmFyIHZhbHVlID0gcmVjb3JkLnZcbiAgICAgICwgb2sgICAgPSByZWNvcmQucyA9PSAxXG4gICAgICAsIGkgICAgID0gMDtcbiAgICB2YXIgcnVuID0gZnVuY3Rpb24ocmVhY3Qpe1xuICAgICAgdmFyIGNiID0gb2sgPyByZWFjdC5vayA6IHJlYWN0LmZhaWxcbiAgICAgICAgLCByZXQsIHRoZW47XG4gICAgICB0cnkge1xuICAgICAgICBpZihjYil7XG4gICAgICAgICAgaWYoIW9rKXJlY29yZC5oID0gdHJ1ZTtcbiAgICAgICAgICByZXQgPSBjYiA9PT0gdHJ1ZSA/IHZhbHVlIDogY2IodmFsdWUpO1xuICAgICAgICAgIGlmKHJldCA9PT0gcmVhY3QuUCl7XG4gICAgICAgICAgICByZWFjdC5yZWooVHlwZUVycm9yKCdQcm9taXNlLWNoYWluIGN5Y2xlJykpO1xuICAgICAgICAgIH0gZWxzZSBpZih0aGVuID0gaXNUaGVuYWJsZShyZXQpKXtcbiAgICAgICAgICAgIHRoZW4uY2FsbChyZXQsIHJlYWN0LnJlcywgcmVhY3QucmVqKTtcbiAgICAgICAgICB9IGVsc2UgcmVhY3QucmVzKHJldCk7XG4gICAgICAgIH0gZWxzZSByZWFjdC5yZWoodmFsdWUpO1xuICAgICAgfSBjYXRjaChlcnIpe1xuICAgICAgICByZWFjdC5yZWooZXJyKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHdoaWxlKGNoYWluLmxlbmd0aCA+IGkpcnVuKGNoYWluW2krK10pOyAvLyB2YXJpYWJsZSBsZW5ndGggLSBjYW4ndCB1c2UgZm9yRWFjaFxuICAgIGNoYWluLmxlbmd0aCA9IDA7XG4gICAgcmVjb3JkLm4gPSBmYWxzZTtcbiAgICBpZihpc1JlamVjdClzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICBpZihpc1VuaGFuZGxlZChyZWNvcmQucCkpe1xuICAgICAgICBpZihpc05vZGUpe1xuICAgICAgICAgIHByb2Nlc3MuZW1pdCgndW5oYW5kbGVkUmVqZWN0aW9uJywgdmFsdWUsIHJlY29yZC5wKTtcbiAgICAgICAgfSBlbHNlIGlmKGdsb2JhbC5jb25zb2xlICYmIGNvbnNvbGUuZXJyb3Ipe1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1VuaGFuZGxlZCBwcm9taXNlIHJlamVjdGlvbicsIHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfSByZWNvcmQuYSA9IHVuZGVmaW5lZDtcbiAgICB9LCAxKTtcbiAgfSk7XG59O1xudmFyIGlzVW5oYW5kbGVkID0gZnVuY3Rpb24ocHJvbWlzZSl7XG4gIHZhciByZWNvcmQgPSBwcm9taXNlW1JFQ09SRF1cbiAgICAsIGNoYWluICA9IHJlY29yZC5hIHx8IHJlY29yZC5jXG4gICAgLCBpICAgICAgPSAwXG4gICAgLCByZWFjdDtcbiAgaWYocmVjb3JkLmgpcmV0dXJuIGZhbHNlO1xuICB3aGlsZShjaGFpbi5sZW5ndGggPiBpKXtcbiAgICByZWFjdCA9IGNoYWluW2krK107XG4gICAgaWYocmVhY3QuZmFpbCB8fCAhaXNVbmhhbmRsZWQocmVhY3QuUCkpcmV0dXJuIGZhbHNlO1xuICB9IHJldHVybiB0cnVlO1xufTtcbnZhciAkcmVqZWN0ID0gZnVuY3Rpb24odmFsdWUpe1xuICB2YXIgcmVjb3JkID0gdGhpcztcbiAgaWYocmVjb3JkLmQpcmV0dXJuO1xuICByZWNvcmQuZCA9IHRydWU7XG4gIHJlY29yZCA9IHJlY29yZC5yIHx8IHJlY29yZDsgLy8gdW53cmFwXG4gIHJlY29yZC52ID0gdmFsdWU7XG4gIHJlY29yZC5zID0gMjtcbiAgcmVjb3JkLmEgPSByZWNvcmQuYy5zbGljZSgpO1xuICBub3RpZnkocmVjb3JkLCB0cnVlKTtcbn07XG52YXIgJHJlc29sdmUgPSBmdW5jdGlvbih2YWx1ZSl7XG4gIHZhciByZWNvcmQgPSB0aGlzXG4gICAgLCB0aGVuO1xuICBpZihyZWNvcmQuZClyZXR1cm47XG4gIHJlY29yZC5kID0gdHJ1ZTtcbiAgcmVjb3JkID0gcmVjb3JkLnIgfHwgcmVjb3JkOyAvLyB1bndyYXBcbiAgdHJ5IHtcbiAgICBpZih0aGVuID0gaXNUaGVuYWJsZSh2YWx1ZSkpe1xuICAgICAgYXNhcChmdW5jdGlvbigpe1xuICAgICAgICB2YXIgd3JhcHBlciA9IHtyOiByZWNvcmQsIGQ6IGZhbHNlfTsgLy8gd3JhcFxuICAgICAgICB0cnkge1xuICAgICAgICAgIHRoZW4uY2FsbCh2YWx1ZSwgY3R4KCRyZXNvbHZlLCB3cmFwcGVyLCAxKSwgY3R4KCRyZWplY3QsIHdyYXBwZXIsIDEpKTtcbiAgICAgICAgfSBjYXRjaChlKXtcbiAgICAgICAgICAkcmVqZWN0LmNhbGwod3JhcHBlciwgZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICByZWNvcmQudiA9IHZhbHVlO1xuICAgICAgcmVjb3JkLnMgPSAxO1xuICAgICAgbm90aWZ5KHJlY29yZCwgZmFsc2UpO1xuICAgIH1cbiAgfSBjYXRjaChlKXtcbiAgICAkcmVqZWN0LmNhbGwoe3I6IHJlY29yZCwgZDogZmFsc2V9LCBlKTsgLy8gd3JhcFxuICB9XG59O1xuXG4vLyBjb25zdHJ1Y3RvciBwb2x5ZmlsbFxuaWYoIXVzZU5hdGl2ZSl7XG4gIC8vIDI1LjQuMy4xIFByb21pc2UoZXhlY3V0b3IpXG4gIFAgPSBmdW5jdGlvbiBQcm9taXNlKGV4ZWN1dG9yKXtcbiAgICBhRnVuY3Rpb24oZXhlY3V0b3IpO1xuICAgIHZhciByZWNvcmQgPSB7XG4gICAgICBwOiBzdHJpY3ROZXcodGhpcywgUCwgUFJPTUlTRSksICAgICAgICAgLy8gPC0gcHJvbWlzZVxuICAgICAgYzogW10sICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIDwtIGF3YWl0aW5nIHJlYWN0aW9uc1xuICAgICAgYTogdW5kZWZpbmVkLCAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIDwtIGNoZWNrZWQgaW4gaXNVbmhhbmRsZWQgcmVhY3Rpb25zXG4gICAgICBzOiAwLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gPC0gc3RhdGVcbiAgICAgIGQ6IGZhbHNlLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyA8LSBkb25lXG4gICAgICB2OiB1bmRlZmluZWQsICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gPC0gdmFsdWVcbiAgICAgIGg6IGZhbHNlLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyA8LSBoYW5kbGVkIHJlamVjdGlvblxuICAgICAgbjogZmFsc2UgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIDwtIG5vdGlmeVxuICAgIH07XG4gICAgdGhpc1tSRUNPUkRdID0gcmVjb3JkO1xuICAgIHRyeSB7XG4gICAgICBleGVjdXRvcihjdHgoJHJlc29sdmUsIHJlY29yZCwgMSksIGN0eCgkcmVqZWN0LCByZWNvcmQsIDEpKTtcbiAgICB9IGNhdGNoKGVycil7XG4gICAgICAkcmVqZWN0LmNhbGwocmVjb3JkLCBlcnIpO1xuICAgIH1cbiAgfTtcbiAgcmVxdWlyZSgnLi8kLm1peCcpKFAucHJvdG90eXBlLCB7XG4gICAgLy8gMjUuNC41LjMgUHJvbWlzZS5wcm90b3R5cGUudGhlbihvbkZ1bGZpbGxlZCwgb25SZWplY3RlZClcbiAgICB0aGVuOiBmdW5jdGlvbiB0aGVuKG9uRnVsZmlsbGVkLCBvblJlamVjdGVkKXtcbiAgICAgIHZhciBTID0gYW5PYmplY3QoYW5PYmplY3QodGhpcykuY29uc3RydWN0b3IpW1NQRUNJRVNdO1xuICAgICAgdmFyIHJlYWN0ID0ge1xuICAgICAgICBvazogICB0eXBlb2Ygb25GdWxmaWxsZWQgPT0gJ2Z1bmN0aW9uJyA/IG9uRnVsZmlsbGVkIDogdHJ1ZSxcbiAgICAgICAgZmFpbDogdHlwZW9mIG9uUmVqZWN0ZWQgPT0gJ2Z1bmN0aW9uJyAgPyBvblJlamVjdGVkICA6IGZhbHNlXG4gICAgICB9O1xuICAgICAgdmFyIHByb21pc2UgPSByZWFjdC5QID0gbmV3IChTICE9IHVuZGVmaW5lZCA/IFMgOiBQKShmdW5jdGlvbihyZXMsIHJlail7XG4gICAgICAgIHJlYWN0LnJlcyA9IGFGdW5jdGlvbihyZXMpO1xuICAgICAgICByZWFjdC5yZWogPSBhRnVuY3Rpb24ocmVqKTtcbiAgICAgIH0pO1xuICAgICAgdmFyIHJlY29yZCA9IHRoaXNbUkVDT1JEXTtcbiAgICAgIHJlY29yZC5jLnB1c2gocmVhY3QpO1xuICAgICAgaWYocmVjb3JkLmEpcmVjb3JkLmEucHVzaChyZWFjdCk7XG4gICAgICBpZihyZWNvcmQucylub3RpZnkocmVjb3JkLCBmYWxzZSk7XG4gICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICB9LFxuICAgIC8vIDI1LjQuNS4xIFByb21pc2UucHJvdG90eXBlLmNhdGNoKG9uUmVqZWN0ZWQpXG4gICAgJ2NhdGNoJzogZnVuY3Rpb24ob25SZWplY3RlZCl7XG4gICAgICByZXR1cm4gdGhpcy50aGVuKHVuZGVmaW5lZCwgb25SZWplY3RlZCk7XG4gICAgfVxuICB9KTtcbn1cblxuLy8gZXhwb3J0XG4kZGVmKCRkZWYuRyArICRkZWYuVyArICRkZWYuRiAqICF1c2VOYXRpdmUsIHtQcm9taXNlOiBQfSk7XG5yZXF1aXJlKCcuLyQudGFnJykoUCwgUFJPTUlTRSk7XG5zcGVjaWVzKFApO1xuc3BlY2llcyhXcmFwcGVyID0gcmVxdWlyZSgnLi8kLmNvcmUnKVtQUk9NSVNFXSk7XG5cbi8vIHN0YXRpY3NcbiRkZWYoJGRlZi5TICsgJGRlZi5GICogIXVzZU5hdGl2ZSwgUFJPTUlTRSwge1xuICAvLyAyNS40LjQuNSBQcm9taXNlLnJlamVjdChyKVxuICByZWplY3Q6IGZ1bmN0aW9uIHJlamVjdChyKXtcbiAgICByZXR1cm4gbmV3IHRoaXMoZnVuY3Rpb24ocmVzLCByZWopeyByZWoocik7IH0pO1xuICB9XG59KTtcbiRkZWYoJGRlZi5TICsgJGRlZi5GICogKCF1c2VOYXRpdmUgfHwgdGVzdFJlc29sdmUodHJ1ZSkpLCBQUk9NSVNFLCB7XG4gIC8vIDI1LjQuNC42IFByb21pc2UucmVzb2x2ZSh4KVxuICByZXNvbHZlOiBmdW5jdGlvbiByZXNvbHZlKHgpe1xuICAgIHJldHVybiBpc1Byb21pc2UoeCkgJiYgc2FtZUNvbnN0cnVjdG9yKHguY29uc3RydWN0b3IsIHRoaXMpXG4gICAgICA/IHggOiBuZXcgdGhpcyhmdW5jdGlvbihyZXMpeyByZXMoeCk7IH0pO1xuICB9XG59KTtcbiRkZWYoJGRlZi5TICsgJGRlZi5GICogISh1c2VOYXRpdmUgJiYgcmVxdWlyZSgnLi8kLml0ZXItZGV0ZWN0JykoZnVuY3Rpb24oaXRlcil7XG4gIFAuYWxsKGl0ZXIpWydjYXRjaCddKGZ1bmN0aW9uKCl7fSk7XG59KSksIFBST01JU0UsIHtcbiAgLy8gMjUuNC40LjEgUHJvbWlzZS5hbGwoaXRlcmFibGUpXG4gIGFsbDogZnVuY3Rpb24gYWxsKGl0ZXJhYmxlKXtcbiAgICB2YXIgQyAgICAgID0gZ2V0Q29uc3RydWN0b3IodGhpcylcbiAgICAgICwgdmFsdWVzID0gW107XG4gICAgcmV0dXJuIG5ldyBDKGZ1bmN0aW9uKHJlcywgcmVqKXtcbiAgICAgIGZvck9mKGl0ZXJhYmxlLCBmYWxzZSwgdmFsdWVzLnB1c2gsIHZhbHVlcyk7XG4gICAgICB2YXIgcmVtYWluaW5nID0gdmFsdWVzLmxlbmd0aFxuICAgICAgICAsIHJlc3VsdHMgICA9IEFycmF5KHJlbWFpbmluZyk7XG4gICAgICBpZihyZW1haW5pbmcpJC5lYWNoLmNhbGwodmFsdWVzLCBmdW5jdGlvbihwcm9taXNlLCBpbmRleCl7XG4gICAgICAgIEMucmVzb2x2ZShwcm9taXNlKS50aGVuKGZ1bmN0aW9uKHZhbHVlKXtcbiAgICAgICAgICByZXN1bHRzW2luZGV4XSA9IHZhbHVlO1xuICAgICAgICAgIC0tcmVtYWluaW5nIHx8IHJlcyhyZXN1bHRzKTtcbiAgICAgICAgfSwgcmVqKTtcbiAgICAgIH0pO1xuICAgICAgZWxzZSByZXMocmVzdWx0cyk7XG4gICAgfSk7XG4gIH0sXG4gIC8vIDI1LjQuNC40IFByb21pc2UucmFjZShpdGVyYWJsZSlcbiAgcmFjZTogZnVuY3Rpb24gcmFjZShpdGVyYWJsZSl7XG4gICAgdmFyIEMgPSBnZXRDb25zdHJ1Y3Rvcih0aGlzKTtcbiAgICByZXR1cm4gbmV3IEMoZnVuY3Rpb24ocmVzLCByZWope1xuICAgICAgZm9yT2YoaXRlcmFibGUsIGZhbHNlLCBmdW5jdGlvbihwcm9taXNlKXtcbiAgICAgICAgQy5yZXNvbHZlKHByb21pc2UpLnRoZW4ocmVzLCByZWopO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbn0pOyIsIi8vIDI2LjEuMSBSZWZsZWN0LmFwcGx5KHRhcmdldCwgdGhpc0FyZ3VtZW50LCBhcmd1bWVudHNMaXN0KVxudmFyICRkZWYgICA9IHJlcXVpcmUoJy4vJC5kZWYnKVxuICAsIF9hcHBseSA9IEZ1bmN0aW9uLmFwcGx5O1xuXG4kZGVmKCRkZWYuUywgJ1JlZmxlY3QnLCB7XG4gIGFwcGx5OiBmdW5jdGlvbiBhcHBseSh0YXJnZXQsIHRoaXNBcmd1bWVudCwgYXJndW1lbnRzTGlzdCl7XG4gICAgcmV0dXJuIF9hcHBseS5jYWxsKHRhcmdldCwgdGhpc0FyZ3VtZW50LCBhcmd1bWVudHNMaXN0KTtcbiAgfVxufSk7IiwiLy8gMjYuMS4yIFJlZmxlY3QuY29uc3RydWN0KHRhcmdldCwgYXJndW1lbnRzTGlzdCBbLCBuZXdUYXJnZXRdKVxudmFyICQgICAgICAgICA9IHJlcXVpcmUoJy4vJCcpXG4gICwgJGRlZiAgICAgID0gcmVxdWlyZSgnLi8kLmRlZicpXG4gICwgYUZ1bmN0aW9uID0gcmVxdWlyZSgnLi8kLmEtZnVuY3Rpb24nKVxuICAsIGFuT2JqZWN0ICA9IHJlcXVpcmUoJy4vJC5hbi1vYmplY3QnKVxuICAsIGlzT2JqZWN0ICA9IHJlcXVpcmUoJy4vJC5pcy1vYmplY3QnKVxuICAsIGJpbmQgICAgICA9IEZ1bmN0aW9uLmJpbmQgfHwgcmVxdWlyZSgnLi8kLmNvcmUnKS5GdW5jdGlvbi5wcm90b3R5cGUuYmluZDtcblxuLy8gTVMgRWRnZSBzdXBwb3J0cyBvbmx5IDIgYXJndW1lbnRzXG4vLyBGRiBOaWdodGx5IHNldHMgdGhpcmQgYXJndW1lbnQgYXMgYG5ldy50YXJnZXRgLCBidXQgZG9lcyBub3QgY3JlYXRlIGB0aGlzYCBmcm9tIGl0XG4kZGVmKCRkZWYuUyArICRkZWYuRiAqIHJlcXVpcmUoJy4vJC5mYWlscycpKGZ1bmN0aW9uKCl7XG4gIGZ1bmN0aW9uIEYoKXt9XG4gIHJldHVybiAhKFJlZmxlY3QuY29uc3RydWN0KGZ1bmN0aW9uKCl7fSwgW10sIEYpIGluc3RhbmNlb2YgRik7XG59KSwgJ1JlZmxlY3QnLCB7XG4gIGNvbnN0cnVjdDogZnVuY3Rpb24gY29uc3RydWN0KFRhcmdldCwgYXJncyAvKiwgbmV3VGFyZ2V0Ki8pe1xuICAgIGFGdW5jdGlvbihUYXJnZXQpO1xuICAgIHZhciBuZXdUYXJnZXQgPSBhcmd1bWVudHMubGVuZ3RoIDwgMyA/IFRhcmdldCA6IGFGdW5jdGlvbihhcmd1bWVudHNbMl0pO1xuICAgIGlmKFRhcmdldCA9PSBuZXdUYXJnZXQpe1xuICAgICAgLy8gdy9vIGFsdGVyZWQgbmV3VGFyZ2V0LCBvcHRpbWl6YXRpb24gZm9yIDAtNCBhcmd1bWVudHNcbiAgICAgIGlmKGFyZ3MgIT0gdW5kZWZpbmVkKXN3aXRjaChhbk9iamVjdChhcmdzKS5sZW5ndGgpe1xuICAgICAgICBjYXNlIDA6IHJldHVybiBuZXcgVGFyZ2V0O1xuICAgICAgICBjYXNlIDE6IHJldHVybiBuZXcgVGFyZ2V0KGFyZ3NbMF0pO1xuICAgICAgICBjYXNlIDI6IHJldHVybiBuZXcgVGFyZ2V0KGFyZ3NbMF0sIGFyZ3NbMV0pO1xuICAgICAgICBjYXNlIDM6IHJldHVybiBuZXcgVGFyZ2V0KGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0pO1xuICAgICAgICBjYXNlIDQ6IHJldHVybiBuZXcgVGFyZ2V0KGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0sIGFyZ3NbM10pO1xuICAgICAgfVxuICAgICAgLy8gdy9vIGFsdGVyZWQgbmV3VGFyZ2V0LCBsb3Qgb2YgYXJndW1lbnRzIGNhc2VcbiAgICAgIHZhciAkYXJncyA9IFtudWxsXTtcbiAgICAgICRhcmdzLnB1c2guYXBwbHkoJGFyZ3MsIGFyZ3MpO1xuICAgICAgcmV0dXJuIG5ldyAoYmluZC5hcHBseShUYXJnZXQsICRhcmdzKSk7XG4gICAgfVxuICAgIC8vIHdpdGggYWx0ZXJlZCBuZXdUYXJnZXQsIG5vdCBzdXBwb3J0IGJ1aWx0LWluIGNvbnN0cnVjdG9yc1xuICAgIHZhciBwcm90byAgICA9IG5ld1RhcmdldC5wcm90b3R5cGVcbiAgICAgICwgaW5zdGFuY2UgPSAkLmNyZWF0ZShpc09iamVjdChwcm90bykgPyBwcm90byA6IE9iamVjdC5wcm90b3R5cGUpXG4gICAgICAsIHJlc3VsdCAgID0gRnVuY3Rpb24uYXBwbHkuY2FsbChUYXJnZXQsIGluc3RhbmNlLCBhcmdzKTtcbiAgICByZXR1cm4gaXNPYmplY3QocmVzdWx0KSA/IHJlc3VsdCA6IGluc3RhbmNlO1xuICB9XG59KTsiLCIvLyAyNi4xLjMgUmVmbGVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIHByb3BlcnR5S2V5LCBhdHRyaWJ1dGVzKVxudmFyICQgICAgICAgID0gcmVxdWlyZSgnLi8kJylcbiAgLCAkZGVmICAgICA9IHJlcXVpcmUoJy4vJC5kZWYnKVxuICAsIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi8kLmFuLW9iamVjdCcpO1xuXG4vLyBNUyBFZGdlIGhhcyBicm9rZW4gUmVmbGVjdC5kZWZpbmVQcm9wZXJ0eSAtIHRocm93aW5nIGluc3RlYWQgb2YgcmV0dXJuaW5nIGZhbHNlXG4kZGVmKCRkZWYuUyArICRkZWYuRiAqIHJlcXVpcmUoJy4vJC5mYWlscycpKGZ1bmN0aW9uKCl7XG4gIFJlZmxlY3QuZGVmaW5lUHJvcGVydHkoJC5zZXREZXNjKHt9LCAxLCB7dmFsdWU6IDF9KSwgMSwge3ZhbHVlOiAyfSk7XG59KSwgJ1JlZmxlY3QnLCB7XG4gIGRlZmluZVByb3BlcnR5OiBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIHByb3BlcnR5S2V5LCBhdHRyaWJ1dGVzKXtcbiAgICBhbk9iamVjdCh0YXJnZXQpO1xuICAgIHRyeSB7XG4gICAgICAkLnNldERlc2ModGFyZ2V0LCBwcm9wZXJ0eUtleSwgYXR0cmlidXRlcyk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGNhdGNoKGUpe1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxufSk7IiwiLy8gMjYuMS40IFJlZmxlY3QuZGVsZXRlUHJvcGVydHkodGFyZ2V0LCBwcm9wZXJ0eUtleSlcbnZhciAkZGVmICAgICA9IHJlcXVpcmUoJy4vJC5kZWYnKVxuICAsIGdldERlc2MgID0gcmVxdWlyZSgnLi8kJykuZ2V0RGVzY1xuICAsIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi8kLmFuLW9iamVjdCcpO1xuXG4kZGVmKCRkZWYuUywgJ1JlZmxlY3QnLCB7XG4gIGRlbGV0ZVByb3BlcnR5OiBmdW5jdGlvbiBkZWxldGVQcm9wZXJ0eSh0YXJnZXQsIHByb3BlcnR5S2V5KXtcbiAgICB2YXIgZGVzYyA9IGdldERlc2MoYW5PYmplY3QodGFyZ2V0KSwgcHJvcGVydHlLZXkpO1xuICAgIHJldHVybiBkZXNjICYmICFkZXNjLmNvbmZpZ3VyYWJsZSA/IGZhbHNlIDogZGVsZXRlIHRhcmdldFtwcm9wZXJ0eUtleV07XG4gIH1cbn0pOyIsIid1c2Ugc3RyaWN0Jztcbi8vIDI2LjEuNSBSZWZsZWN0LmVudW1lcmF0ZSh0YXJnZXQpXG52YXIgJGRlZiAgICAgPSByZXF1aXJlKCcuLyQuZGVmJylcbiAgLCBhbk9iamVjdCA9IHJlcXVpcmUoJy4vJC5hbi1vYmplY3QnKTtcbnZhciBFbnVtZXJhdGUgPSBmdW5jdGlvbihpdGVyYXRlZCl7XG4gIHRoaXMuX3QgPSBhbk9iamVjdChpdGVyYXRlZCk7IC8vIHRhcmdldFxuICB0aGlzLl9pID0gMDsgICAgICAgICAgICAgICAgICAvLyBuZXh0IGluZGV4XG4gIHZhciBrZXlzID0gdGhpcy5fayA9IFtdICAgICAgIC8vIGtleXNcbiAgICAsIGtleTtcbiAgZm9yKGtleSBpbiBpdGVyYXRlZClrZXlzLnB1c2goa2V5KTtcbn07XG5yZXF1aXJlKCcuLyQuaXRlci1jcmVhdGUnKShFbnVtZXJhdGUsICdPYmplY3QnLCBmdW5jdGlvbigpe1xuICB2YXIgdGhhdCA9IHRoaXNcbiAgICAsIGtleXMgPSB0aGF0Ll9rXG4gICAgLCBrZXk7XG4gIGRvIHtcbiAgICBpZih0aGF0Ll9pID49IGtleXMubGVuZ3RoKXJldHVybiB7dmFsdWU6IHVuZGVmaW5lZCwgZG9uZTogdHJ1ZX07XG4gIH0gd2hpbGUoISgoa2V5ID0ga2V5c1t0aGF0Ll9pKytdKSBpbiB0aGF0Ll90KSk7XG4gIHJldHVybiB7dmFsdWU6IGtleSwgZG9uZTogZmFsc2V9O1xufSk7XG5cbiRkZWYoJGRlZi5TLCAnUmVmbGVjdCcsIHtcbiAgZW51bWVyYXRlOiBmdW5jdGlvbiBlbnVtZXJhdGUodGFyZ2V0KXtcbiAgICByZXR1cm4gbmV3IEVudW1lcmF0ZSh0YXJnZXQpO1xuICB9XG59KTsiLCIvLyAyNi4xLjcgUmVmbGVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBwcm9wZXJ0eUtleSlcbnZhciAkICAgICAgICA9IHJlcXVpcmUoJy4vJCcpXG4gICwgJGRlZiAgICAgPSByZXF1aXJlKCcuLyQuZGVmJylcbiAgLCBhbk9iamVjdCA9IHJlcXVpcmUoJy4vJC5hbi1vYmplY3QnKTtcblxuJGRlZigkZGVmLlMsICdSZWZsZWN0Jywge1xuICBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I6IGZ1bmN0aW9uIGdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIHByb3BlcnR5S2V5KXtcbiAgICByZXR1cm4gJC5nZXREZXNjKGFuT2JqZWN0KHRhcmdldCksIHByb3BlcnR5S2V5KTtcbiAgfVxufSk7IiwiLy8gMjYuMS44IFJlZmxlY3QuZ2V0UHJvdG90eXBlT2YodGFyZ2V0KVxudmFyICRkZWYgICAgID0gcmVxdWlyZSgnLi8kLmRlZicpXG4gICwgZ2V0UHJvdG8gPSByZXF1aXJlKCcuLyQnKS5nZXRQcm90b1xuICAsIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi8kLmFuLW9iamVjdCcpO1xuXG4kZGVmKCRkZWYuUywgJ1JlZmxlY3QnLCB7XG4gIGdldFByb3RvdHlwZU9mOiBmdW5jdGlvbiBnZXRQcm90b3R5cGVPZih0YXJnZXQpe1xuICAgIHJldHVybiBnZXRQcm90byhhbk9iamVjdCh0YXJnZXQpKTtcbiAgfVxufSk7IiwiLy8gMjYuMS42IFJlZmxlY3QuZ2V0KHRhcmdldCwgcHJvcGVydHlLZXkgWywgcmVjZWl2ZXJdKVxudmFyICQgICAgICAgID0gcmVxdWlyZSgnLi8kJylcbiAgLCBoYXMgICAgICA9IHJlcXVpcmUoJy4vJC5oYXMnKVxuICAsICRkZWYgICAgID0gcmVxdWlyZSgnLi8kLmRlZicpXG4gICwgaXNPYmplY3QgPSByZXF1aXJlKCcuLyQuaXMtb2JqZWN0JylcbiAgLCBhbk9iamVjdCA9IHJlcXVpcmUoJy4vJC5hbi1vYmplY3QnKTtcblxuZnVuY3Rpb24gZ2V0KHRhcmdldCwgcHJvcGVydHlLZXkvKiwgcmVjZWl2ZXIqLyl7XG4gIHZhciByZWNlaXZlciA9IGFyZ3VtZW50cy5sZW5ndGggPCAzID8gdGFyZ2V0IDogYXJndW1lbnRzWzJdXG4gICAgLCBkZXNjLCBwcm90bztcbiAgaWYoYW5PYmplY3QodGFyZ2V0KSA9PT0gcmVjZWl2ZXIpcmV0dXJuIHRhcmdldFtwcm9wZXJ0eUtleV07XG4gIGlmKGRlc2MgPSAkLmdldERlc2ModGFyZ2V0LCBwcm9wZXJ0eUtleSkpcmV0dXJuIGhhcyhkZXNjLCAndmFsdWUnKVxuICAgID8gZGVzYy52YWx1ZVxuICAgIDogZGVzYy5nZXQgIT09IHVuZGVmaW5lZFxuICAgICAgPyBkZXNjLmdldC5jYWxsKHJlY2VpdmVyKVxuICAgICAgOiB1bmRlZmluZWQ7XG4gIGlmKGlzT2JqZWN0KHByb3RvID0gJC5nZXRQcm90byh0YXJnZXQpKSlyZXR1cm4gZ2V0KHByb3RvLCBwcm9wZXJ0eUtleSwgcmVjZWl2ZXIpO1xufVxuXG4kZGVmKCRkZWYuUywgJ1JlZmxlY3QnLCB7Z2V0OiBnZXR9KTsiLCIvLyAyNi4xLjkgUmVmbGVjdC5oYXModGFyZ2V0LCBwcm9wZXJ0eUtleSlcbnZhciAkZGVmID0gcmVxdWlyZSgnLi8kLmRlZicpO1xuXG4kZGVmKCRkZWYuUywgJ1JlZmxlY3QnLCB7XG4gIGhhczogZnVuY3Rpb24gaGFzKHRhcmdldCwgcHJvcGVydHlLZXkpe1xuICAgIHJldHVybiBwcm9wZXJ0eUtleSBpbiB0YXJnZXQ7XG4gIH1cbn0pOyIsIi8vIDI2LjEuMTAgUmVmbGVjdC5pc0V4dGVuc2libGUodGFyZ2V0KVxudmFyICRkZWYgICAgICAgICAgPSByZXF1aXJlKCcuLyQuZGVmJylcbiAgLCBhbk9iamVjdCAgICAgID0gcmVxdWlyZSgnLi8kLmFuLW9iamVjdCcpXG4gICwgJGlzRXh0ZW5zaWJsZSA9IE9iamVjdC5pc0V4dGVuc2libGU7XG5cbiRkZWYoJGRlZi5TLCAnUmVmbGVjdCcsIHtcbiAgaXNFeHRlbnNpYmxlOiBmdW5jdGlvbiBpc0V4dGVuc2libGUodGFyZ2V0KXtcbiAgICBhbk9iamVjdCh0YXJnZXQpO1xuICAgIHJldHVybiAkaXNFeHRlbnNpYmxlID8gJGlzRXh0ZW5zaWJsZSh0YXJnZXQpIDogdHJ1ZTtcbiAgfVxufSk7IiwiLy8gMjYuMS4xMSBSZWZsZWN0Lm93bktleXModGFyZ2V0KVxudmFyICRkZWYgPSByZXF1aXJlKCcuLyQuZGVmJyk7XG5cbiRkZWYoJGRlZi5TLCAnUmVmbGVjdCcsIHtvd25LZXlzOiByZXF1aXJlKCcuLyQub3duLWtleXMnKX0pOyIsIi8vIDI2LjEuMTIgUmVmbGVjdC5wcmV2ZW50RXh0ZW5zaW9ucyh0YXJnZXQpXG52YXIgJGRlZiAgICAgICAgICAgICAgID0gcmVxdWlyZSgnLi8kLmRlZicpXG4gICwgYW5PYmplY3QgICAgICAgICAgID0gcmVxdWlyZSgnLi8kLmFuLW9iamVjdCcpXG4gICwgJHByZXZlbnRFeHRlbnNpb25zID0gT2JqZWN0LnByZXZlbnRFeHRlbnNpb25zO1xuXG4kZGVmKCRkZWYuUywgJ1JlZmxlY3QnLCB7XG4gIHByZXZlbnRFeHRlbnNpb25zOiBmdW5jdGlvbiBwcmV2ZW50RXh0ZW5zaW9ucyh0YXJnZXQpe1xuICAgIGFuT2JqZWN0KHRhcmdldCk7XG4gICAgdHJ5IHtcbiAgICAgIGlmKCRwcmV2ZW50RXh0ZW5zaW9ucykkcHJldmVudEV4dGVuc2lvbnModGFyZ2V0KTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gY2F0Y2goZSl7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG59KTsiLCIvLyAyNi4xLjE0IFJlZmxlY3Quc2V0UHJvdG90eXBlT2YodGFyZ2V0LCBwcm90bylcbnZhciAkZGVmICAgICA9IHJlcXVpcmUoJy4vJC5kZWYnKVxuICAsIHNldFByb3RvID0gcmVxdWlyZSgnLi8kLnNldC1wcm90bycpO1xuXG5pZihzZXRQcm90bykkZGVmKCRkZWYuUywgJ1JlZmxlY3QnLCB7XG4gIHNldFByb3RvdHlwZU9mOiBmdW5jdGlvbiBzZXRQcm90b3R5cGVPZih0YXJnZXQsIHByb3RvKXtcbiAgICBzZXRQcm90by5jaGVjayh0YXJnZXQsIHByb3RvKTtcbiAgICB0cnkge1xuICAgICAgc2V0UHJvdG8uc2V0KHRhcmdldCwgcHJvdG8pO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBjYXRjaChlKXtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbn0pOyIsIi8vIDI2LjEuMTMgUmVmbGVjdC5zZXQodGFyZ2V0LCBwcm9wZXJ0eUtleSwgViBbLCByZWNlaXZlcl0pXG52YXIgJCAgICAgICAgICA9IHJlcXVpcmUoJy4vJCcpXG4gICwgaGFzICAgICAgICA9IHJlcXVpcmUoJy4vJC5oYXMnKVxuICAsICRkZWYgICAgICAgPSByZXF1aXJlKCcuLyQuZGVmJylcbiAgLCBjcmVhdGVEZXNjID0gcmVxdWlyZSgnLi8kLnByb3BlcnR5LWRlc2MnKVxuICAsIGFuT2JqZWN0ICAgPSByZXF1aXJlKCcuLyQuYW4tb2JqZWN0JylcbiAgLCBpc09iamVjdCAgID0gcmVxdWlyZSgnLi8kLmlzLW9iamVjdCcpO1xuXG5mdW5jdGlvbiBzZXQodGFyZ2V0LCBwcm9wZXJ0eUtleSwgVi8qLCByZWNlaXZlciovKXtcbiAgdmFyIHJlY2VpdmVyID0gYXJndW1lbnRzLmxlbmd0aCA8IDQgPyB0YXJnZXQgOiBhcmd1bWVudHNbM11cbiAgICAsIG93bkRlc2MgID0gJC5nZXREZXNjKGFuT2JqZWN0KHRhcmdldCksIHByb3BlcnR5S2V5KVxuICAgICwgZXhpc3RpbmdEZXNjcmlwdG9yLCBwcm90bztcbiAgaWYoIW93bkRlc2Mpe1xuICAgIGlmKGlzT2JqZWN0KHByb3RvID0gJC5nZXRQcm90byh0YXJnZXQpKSl7XG4gICAgICByZXR1cm4gc2V0KHByb3RvLCBwcm9wZXJ0eUtleSwgViwgcmVjZWl2ZXIpO1xuICAgIH1cbiAgICBvd25EZXNjID0gY3JlYXRlRGVzYygwKTtcbiAgfVxuICBpZihoYXMob3duRGVzYywgJ3ZhbHVlJykpe1xuICAgIGlmKG93bkRlc2Mud3JpdGFibGUgPT09IGZhbHNlIHx8ICFpc09iamVjdChyZWNlaXZlcikpcmV0dXJuIGZhbHNlO1xuICAgIGV4aXN0aW5nRGVzY3JpcHRvciA9ICQuZ2V0RGVzYyhyZWNlaXZlciwgcHJvcGVydHlLZXkpIHx8IGNyZWF0ZURlc2MoMCk7XG4gICAgZXhpc3RpbmdEZXNjcmlwdG9yLnZhbHVlID0gVjtcbiAgICAkLnNldERlc2MocmVjZWl2ZXIsIHByb3BlcnR5S2V5LCBleGlzdGluZ0Rlc2NyaXB0b3IpO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHJldHVybiBvd25EZXNjLnNldCA9PT0gdW5kZWZpbmVkID8gZmFsc2UgOiAob3duRGVzYy5zZXQuY2FsbChyZWNlaXZlciwgViksIHRydWUpO1xufVxuXG4kZGVmKCRkZWYuUywgJ1JlZmxlY3QnLCB7c2V0OiBzZXR9KTsiLCJ2YXIgJCAgICAgICA9IHJlcXVpcmUoJy4vJCcpXG4gICwgZ2xvYmFsICA9IHJlcXVpcmUoJy4vJC5nbG9iYWwnKVxuICAsIGNvZiAgICAgPSByZXF1aXJlKCcuLyQuY29mJylcbiAgLCAkZmxhZ3MgID0gcmVxdWlyZSgnLi8kLmZsYWdzJylcbiAgLCAkUmVnRXhwID0gZ2xvYmFsLlJlZ0V4cFxuICAsIEJhc2UgICAgPSAkUmVnRXhwXG4gICwgcHJvdG8gICA9ICRSZWdFeHAucHJvdG90eXBlXG4gICwgcmUgICAgICA9IC9hL2dcbiAgLy8gXCJuZXdcIiBjcmVhdGVzIGEgbmV3IG9iamVjdFxuICAsIENPUlJFQ1RfTkVXID0gbmV3ICRSZWdFeHAocmUpICE9PSByZVxuICAvLyBSZWdFeHAgYWxsb3dzIGEgcmVnZXggd2l0aCBmbGFncyBhcyB0aGUgcGF0dGVyblxuICAsIEFMTE9XU19SRV9XSVRIX0ZMQUdTID0gZnVuY3Rpb24oKXtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuICRSZWdFeHAocmUsICdpJykgPT0gJy9hL2knO1xuICAgIH0gY2F0Y2goZSl7IC8qIGVtcHR5ICovIH1cbiAgfSgpO1xuXG5pZihyZXF1aXJlKCcuLyQuc3VwcG9ydC1kZXNjJykpe1xuICBpZighQ09SUkVDVF9ORVcgfHwgIUFMTE9XU19SRV9XSVRIX0ZMQUdTKXtcbiAgICAkUmVnRXhwID0gZnVuY3Rpb24gUmVnRXhwKHBhdHRlcm4sIGZsYWdzKXtcbiAgICAgIHZhciBwYXR0ZXJuSXNSZWdFeHAgID0gY29mKHBhdHRlcm4pID09ICdSZWdFeHAnXG4gICAgICAgICwgZmxhZ3NJc1VuZGVmaW5lZCA9IGZsYWdzID09PSB1bmRlZmluZWQ7XG4gICAgICBpZighKHRoaXMgaW5zdGFuY2VvZiAkUmVnRXhwKSAmJiBwYXR0ZXJuSXNSZWdFeHAgJiYgZmxhZ3NJc1VuZGVmaW5lZClyZXR1cm4gcGF0dGVybjtcbiAgICAgIHJldHVybiBDT1JSRUNUX05FV1xuICAgICAgICA/IG5ldyBCYXNlKHBhdHRlcm5Jc1JlZ0V4cCAmJiAhZmxhZ3NJc1VuZGVmaW5lZCA/IHBhdHRlcm4uc291cmNlIDogcGF0dGVybiwgZmxhZ3MpXG4gICAgICAgIDogbmV3IEJhc2UocGF0dGVybklzUmVnRXhwID8gcGF0dGVybi5zb3VyY2UgOiBwYXR0ZXJuXG4gICAgICAgICAgLCBwYXR0ZXJuSXNSZWdFeHAgJiYgZmxhZ3NJc1VuZGVmaW5lZCA/ICRmbGFncy5jYWxsKHBhdHRlcm4pIDogZmxhZ3MpO1xuICAgIH07XG4gICAgJC5lYWNoLmNhbGwoJC5nZXROYW1lcyhCYXNlKSwgZnVuY3Rpb24oa2V5KXtcbiAgICAgIGtleSBpbiAkUmVnRXhwIHx8ICQuc2V0RGVzYygkUmVnRXhwLCBrZXksIHtcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICBnZXQ6IGZ1bmN0aW9uKCl7IHJldHVybiBCYXNlW2tleV07IH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24oaXQpeyBCYXNlW2tleV0gPSBpdDsgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gICAgcHJvdG8uY29uc3RydWN0b3IgPSAkUmVnRXhwO1xuICAgICRSZWdFeHAucHJvdG90eXBlID0gcHJvdG87XG4gICAgcmVxdWlyZSgnLi8kLnJlZGVmJykoZ2xvYmFsLCAnUmVnRXhwJywgJFJlZ0V4cCk7XG4gIH1cbn1cblxucmVxdWlyZSgnLi8kLnNwZWNpZXMnKSgkUmVnRXhwKTsiLCIvLyAyMS4yLjUuMyBnZXQgUmVnRXhwLnByb3RvdHlwZS5mbGFncygpXG52YXIgJCA9IHJlcXVpcmUoJy4vJCcpO1xuaWYocmVxdWlyZSgnLi8kLnN1cHBvcnQtZGVzYycpICYmIC8uL2cuZmxhZ3MgIT0gJ2cnKSQuc2V0RGVzYyhSZWdFeHAucHJvdG90eXBlLCAnZmxhZ3MnLCB7XG4gIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgZ2V0OiByZXF1aXJlKCcuLyQuZmxhZ3MnKVxufSk7IiwiLy8gQEBtYXRjaCBsb2dpY1xucmVxdWlyZSgnLi8kLmZpeC1yZS13a3MnKSgnbWF0Y2gnLCAxLCBmdW5jdGlvbihkZWZpbmVkLCBNQVRDSCl7XG4gIC8vIDIxLjEuMy4xMSBTdHJpbmcucHJvdG90eXBlLm1hdGNoKHJlZ2V4cClcbiAgcmV0dXJuIGZ1bmN0aW9uIG1hdGNoKHJlZ2V4cCl7XG4gICAgJ3VzZSBzdHJpY3QnO1xuICAgIHZhciBPICA9IGRlZmluZWQodGhpcylcbiAgICAgICwgZm4gPSByZWdleHAgPT0gdW5kZWZpbmVkID8gdW5kZWZpbmVkIDogcmVnZXhwW01BVENIXTtcbiAgICByZXR1cm4gZm4gIT09IHVuZGVmaW5lZCA/IGZuLmNhbGwocmVnZXhwLCBPKSA6IG5ldyBSZWdFeHAocmVnZXhwKVtNQVRDSF0oU3RyaW5nKE8pKTtcbiAgfTtcbn0pOyIsIi8vIEBAcmVwbGFjZSBsb2dpY1xucmVxdWlyZSgnLi8kLmZpeC1yZS13a3MnKSgncmVwbGFjZScsIDIsIGZ1bmN0aW9uKGRlZmluZWQsIFJFUExBQ0UsICRyZXBsYWNlKXtcbiAgLy8gMjEuMS4zLjE0IFN0cmluZy5wcm90b3R5cGUucmVwbGFjZShzZWFyY2hWYWx1ZSwgcmVwbGFjZVZhbHVlKVxuICByZXR1cm4gZnVuY3Rpb24gcmVwbGFjZShzZWFyY2hWYWx1ZSwgcmVwbGFjZVZhbHVlKXtcbiAgICAndXNlIHN0cmljdCc7XG4gICAgdmFyIE8gID0gZGVmaW5lZCh0aGlzKVxuICAgICAgLCBmbiA9IHNlYXJjaFZhbHVlID09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZCA6IHNlYXJjaFZhbHVlW1JFUExBQ0VdO1xuICAgIHJldHVybiBmbiAhPT0gdW5kZWZpbmVkXG4gICAgICA/IGZuLmNhbGwoc2VhcmNoVmFsdWUsIE8sIHJlcGxhY2VWYWx1ZSlcbiAgICAgIDogJHJlcGxhY2UuY2FsbChTdHJpbmcoTyksIHNlYXJjaFZhbHVlLCByZXBsYWNlVmFsdWUpO1xuICB9O1xufSk7IiwiLy8gQEBzZWFyY2ggbG9naWNcbnJlcXVpcmUoJy4vJC5maXgtcmUtd2tzJykoJ3NlYXJjaCcsIDEsIGZ1bmN0aW9uKGRlZmluZWQsIFNFQVJDSCl7XG4gIC8vIDIxLjEuMy4xNSBTdHJpbmcucHJvdG90eXBlLnNlYXJjaChyZWdleHApXG4gIHJldHVybiBmdW5jdGlvbiBzZWFyY2gocmVnZXhwKXtcbiAgICAndXNlIHN0cmljdCc7XG4gICAgdmFyIE8gID0gZGVmaW5lZCh0aGlzKVxuICAgICAgLCBmbiA9IHJlZ2V4cCA9PSB1bmRlZmluZWQgPyB1bmRlZmluZWQgOiByZWdleHBbU0VBUkNIXTtcbiAgICByZXR1cm4gZm4gIT09IHVuZGVmaW5lZCA/IGZuLmNhbGwocmVnZXhwLCBPKSA6IG5ldyBSZWdFeHAocmVnZXhwKVtTRUFSQ0hdKFN0cmluZyhPKSk7XG4gIH07XG59KTsiLCIvLyBAQHNwbGl0IGxvZ2ljXG5yZXF1aXJlKCcuLyQuZml4LXJlLXdrcycpKCdzcGxpdCcsIDIsIGZ1bmN0aW9uKGRlZmluZWQsIFNQTElULCAkc3BsaXQpe1xuICAvLyAyMS4xLjMuMTcgU3RyaW5nLnByb3RvdHlwZS5zcGxpdChzZXBhcmF0b3IsIGxpbWl0KVxuICByZXR1cm4gZnVuY3Rpb24gc3BsaXQoc2VwYXJhdG9yLCBsaW1pdCl7XG4gICAgJ3VzZSBzdHJpY3QnO1xuICAgIHZhciBPICA9IGRlZmluZWQodGhpcylcbiAgICAgICwgZm4gPSBzZXBhcmF0b3IgPT0gdW5kZWZpbmVkID8gdW5kZWZpbmVkIDogc2VwYXJhdG9yW1NQTElUXTtcbiAgICByZXR1cm4gZm4gIT09IHVuZGVmaW5lZFxuICAgICAgPyBmbi5jYWxsKHNlcGFyYXRvciwgTywgbGltaXQpXG4gICAgICA6ICRzcGxpdC5jYWxsKFN0cmluZyhPKSwgc2VwYXJhdG9yLCBsaW1pdCk7XG4gIH07XG59KTsiLCIndXNlIHN0cmljdCc7XG52YXIgc3Ryb25nID0gcmVxdWlyZSgnLi8kLmNvbGxlY3Rpb24tc3Ryb25nJyk7XG5cbi8vIDIzLjIgU2V0IE9iamVjdHNcbnJlcXVpcmUoJy4vJC5jb2xsZWN0aW9uJykoJ1NldCcsIGZ1bmN0aW9uKGdldCl7XG4gIHJldHVybiBmdW5jdGlvbiBTZXQoKXsgcmV0dXJuIGdldCh0aGlzLCBhcmd1bWVudHNbMF0pOyB9O1xufSwge1xuICAvLyAyMy4yLjMuMSBTZXQucHJvdG90eXBlLmFkZCh2YWx1ZSlcbiAgYWRkOiBmdW5jdGlvbiBhZGQodmFsdWUpe1xuICAgIHJldHVybiBzdHJvbmcuZGVmKHRoaXMsIHZhbHVlID0gdmFsdWUgPT09IDAgPyAwIDogdmFsdWUsIHZhbHVlKTtcbiAgfVxufSwgc3Ryb25nKTsiLCIndXNlIHN0cmljdCc7XG52YXIgJGRlZiA9IHJlcXVpcmUoJy4vJC5kZWYnKVxuICAsICRhdCAgPSByZXF1aXJlKCcuLyQuc3RyaW5nLWF0JykoZmFsc2UpO1xuJGRlZigkZGVmLlAsICdTdHJpbmcnLCB7XG4gIC8vIDIxLjEuMy4zIFN0cmluZy5wcm90b3R5cGUuY29kZVBvaW50QXQocG9zKVxuICBjb2RlUG9pbnRBdDogZnVuY3Rpb24gY29kZVBvaW50QXQocG9zKXtcbiAgICByZXR1cm4gJGF0KHRoaXMsIHBvcyk7XG4gIH1cbn0pOyIsIid1c2Ugc3RyaWN0JztcbnZhciAkZGVmICAgICA9IHJlcXVpcmUoJy4vJC5kZWYnKVxuICAsIHRvTGVuZ3RoID0gcmVxdWlyZSgnLi8kLnRvLWxlbmd0aCcpXG4gICwgY29udGV4dCAgPSByZXF1aXJlKCcuLyQuc3RyaW5nLWNvbnRleHQnKTtcblxuLy8gc2hvdWxkIHRocm93IGVycm9yIG9uIHJlZ2V4XG4kZGVmKCRkZWYuUCArICRkZWYuRiAqICFyZXF1aXJlKCcuLyQuZmFpbHMnKShmdW5jdGlvbigpeyAncScuZW5kc1dpdGgoLy4vKTsgfSksICdTdHJpbmcnLCB7XG4gIC8vIDIxLjEuMy42IFN0cmluZy5wcm90b3R5cGUuZW5kc1dpdGgoc2VhcmNoU3RyaW5nIFssIGVuZFBvc2l0aW9uXSlcbiAgZW5kc1dpdGg6IGZ1bmN0aW9uIGVuZHNXaXRoKHNlYXJjaFN0cmluZyAvKiwgZW5kUG9zaXRpb24gPSBAbGVuZ3RoICovKXtcbiAgICB2YXIgdGhhdCA9IGNvbnRleHQodGhpcywgc2VhcmNoU3RyaW5nLCAnZW5kc1dpdGgnKVxuICAgICAgLCBlbmRQb3NpdGlvbiA9IGFyZ3VtZW50c1sxXVxuICAgICAgLCBsZW4gICAgPSB0b0xlbmd0aCh0aGF0Lmxlbmd0aClcbiAgICAgICwgZW5kICAgID0gZW5kUG9zaXRpb24gPT09IHVuZGVmaW5lZCA/IGxlbiA6IE1hdGgubWluKHRvTGVuZ3RoKGVuZFBvc2l0aW9uKSwgbGVuKVxuICAgICAgLCBzZWFyY2ggPSBTdHJpbmcoc2VhcmNoU3RyaW5nKTtcbiAgICByZXR1cm4gdGhhdC5zbGljZShlbmQgLSBzZWFyY2gubGVuZ3RoLCBlbmQpID09PSBzZWFyY2g7XG4gIH1cbn0pOyIsInZhciAkZGVmICAgID0gcmVxdWlyZSgnLi8kLmRlZicpXG4gICwgdG9JbmRleCA9IHJlcXVpcmUoJy4vJC50by1pbmRleCcpXG4gICwgZnJvbUNoYXJDb2RlID0gU3RyaW5nLmZyb21DaGFyQ29kZVxuICAsICRmcm9tQ29kZVBvaW50ID0gU3RyaW5nLmZyb21Db2RlUG9pbnQ7XG5cbi8vIGxlbmd0aCBzaG91bGQgYmUgMSwgb2xkIEZGIHByb2JsZW1cbiRkZWYoJGRlZi5TICsgJGRlZi5GICogKCEhJGZyb21Db2RlUG9pbnQgJiYgJGZyb21Db2RlUG9pbnQubGVuZ3RoICE9IDEpLCAnU3RyaW5nJywge1xuICAvLyAyMS4xLjIuMiBTdHJpbmcuZnJvbUNvZGVQb2ludCguLi5jb2RlUG9pbnRzKVxuICBmcm9tQ29kZVBvaW50OiBmdW5jdGlvbiBmcm9tQ29kZVBvaW50KHgpeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gICAgdmFyIHJlcyA9IFtdXG4gICAgICAsIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGhcbiAgICAgICwgaSAgID0gMFxuICAgICAgLCBjb2RlO1xuICAgIHdoaWxlKGxlbiA+IGkpe1xuICAgICAgY29kZSA9ICthcmd1bWVudHNbaSsrXTtcbiAgICAgIGlmKHRvSW5kZXgoY29kZSwgMHgxMGZmZmYpICE9PSBjb2RlKXRocm93IFJhbmdlRXJyb3IoY29kZSArICcgaXMgbm90IGEgdmFsaWQgY29kZSBwb2ludCcpO1xuICAgICAgcmVzLnB1c2goY29kZSA8IDB4MTAwMDBcbiAgICAgICAgPyBmcm9tQ2hhckNvZGUoY29kZSlcbiAgICAgICAgOiBmcm9tQ2hhckNvZGUoKChjb2RlIC09IDB4MTAwMDApID4+IDEwKSArIDB4ZDgwMCwgY29kZSAlIDB4NDAwICsgMHhkYzAwKVxuICAgICAgKTtcbiAgICB9IHJldHVybiByZXMuam9pbignJyk7XG4gIH1cbn0pOyIsIid1c2Ugc3RyaWN0JztcbnZhciAkZGVmICAgID0gcmVxdWlyZSgnLi8kLmRlZicpXG4gICwgY29udGV4dCA9IHJlcXVpcmUoJy4vJC5zdHJpbmctY29udGV4dCcpO1xuXG4kZGVmKCRkZWYuUCwgJ1N0cmluZycsIHtcbiAgLy8gMjEuMS4zLjcgU3RyaW5nLnByb3RvdHlwZS5pbmNsdWRlcyhzZWFyY2hTdHJpbmcsIHBvc2l0aW9uID0gMClcbiAgaW5jbHVkZXM6IGZ1bmN0aW9uIGluY2x1ZGVzKHNlYXJjaFN0cmluZyAvKiwgcG9zaXRpb24gPSAwICovKXtcbiAgICByZXR1cm4gISF+Y29udGV4dCh0aGlzLCBzZWFyY2hTdHJpbmcsICdpbmNsdWRlcycpLmluZGV4T2Yoc2VhcmNoU3RyaW5nLCBhcmd1bWVudHNbMV0pO1xuICB9XG59KTsiLCIndXNlIHN0cmljdCc7XG52YXIgJGF0ICA9IHJlcXVpcmUoJy4vJC5zdHJpbmctYXQnKSh0cnVlKTtcblxuLy8gMjEuMS4zLjI3IFN0cmluZy5wcm90b3R5cGVbQEBpdGVyYXRvcl0oKVxucmVxdWlyZSgnLi8kLml0ZXItZGVmaW5lJykoU3RyaW5nLCAnU3RyaW5nJywgZnVuY3Rpb24oaXRlcmF0ZWQpe1xuICB0aGlzLl90ID0gU3RyaW5nKGl0ZXJhdGVkKTsgLy8gdGFyZ2V0XG4gIHRoaXMuX2kgPSAwOyAgICAgICAgICAgICAgICAvLyBuZXh0IGluZGV4XG4vLyAyMS4xLjUuMi4xICVTdHJpbmdJdGVyYXRvclByb3RvdHlwZSUubmV4dCgpXG59LCBmdW5jdGlvbigpe1xuICB2YXIgTyAgICAgPSB0aGlzLl90XG4gICAgLCBpbmRleCA9IHRoaXMuX2lcbiAgICAsIHBvaW50O1xuICBpZihpbmRleCA+PSBPLmxlbmd0aClyZXR1cm4ge3ZhbHVlOiB1bmRlZmluZWQsIGRvbmU6IHRydWV9O1xuICBwb2ludCA9ICRhdChPLCBpbmRleCk7XG4gIHRoaXMuX2kgKz0gcG9pbnQubGVuZ3RoO1xuICByZXR1cm4ge3ZhbHVlOiBwb2ludCwgZG9uZTogZmFsc2V9O1xufSk7IiwidmFyICRkZWYgICAgICA9IHJlcXVpcmUoJy4vJC5kZWYnKVxuICAsIHRvSU9iamVjdCA9IHJlcXVpcmUoJy4vJC50by1pb2JqZWN0JylcbiAgLCB0b0xlbmd0aCAgPSByZXF1aXJlKCcuLyQudG8tbGVuZ3RoJyk7XG5cbiRkZWYoJGRlZi5TLCAnU3RyaW5nJywge1xuICAvLyAyMS4xLjIuNCBTdHJpbmcucmF3KGNhbGxTaXRlLCAuLi5zdWJzdGl0dXRpb25zKVxuICByYXc6IGZ1bmN0aW9uIHJhdyhjYWxsU2l0ZSl7XG4gICAgdmFyIHRwbCA9IHRvSU9iamVjdChjYWxsU2l0ZS5yYXcpXG4gICAgICAsIGxlbiA9IHRvTGVuZ3RoKHRwbC5sZW5ndGgpXG4gICAgICAsIHNsbiA9IGFyZ3VtZW50cy5sZW5ndGhcbiAgICAgICwgcmVzID0gW11cbiAgICAgICwgaSAgID0gMDtcbiAgICB3aGlsZShsZW4gPiBpKXtcbiAgICAgIHJlcy5wdXNoKFN0cmluZyh0cGxbaSsrXSkpO1xuICAgICAgaWYoaSA8IHNsbilyZXMucHVzaChTdHJpbmcoYXJndW1lbnRzW2ldKSk7XG4gICAgfSByZXR1cm4gcmVzLmpvaW4oJycpO1xuICB9XG59KTsiLCJ2YXIgJGRlZiA9IHJlcXVpcmUoJy4vJC5kZWYnKTtcblxuJGRlZigkZGVmLlAsICdTdHJpbmcnLCB7XG4gIC8vIDIxLjEuMy4xMyBTdHJpbmcucHJvdG90eXBlLnJlcGVhdChjb3VudClcbiAgcmVwZWF0OiByZXF1aXJlKCcuLyQuc3RyaW5nLXJlcGVhdCcpXG59KTsiLCIndXNlIHN0cmljdCc7XG52YXIgJGRlZiAgICAgPSByZXF1aXJlKCcuLyQuZGVmJylcbiAgLCB0b0xlbmd0aCA9IHJlcXVpcmUoJy4vJC50by1sZW5ndGgnKVxuICAsIGNvbnRleHQgID0gcmVxdWlyZSgnLi8kLnN0cmluZy1jb250ZXh0Jyk7XG5cbi8vIHNob3VsZCB0aHJvdyBlcnJvciBvbiByZWdleFxuJGRlZigkZGVmLlAgKyAkZGVmLkYgKiAhcmVxdWlyZSgnLi8kLmZhaWxzJykoZnVuY3Rpb24oKXsgJ3EnLnN0YXJ0c1dpdGgoLy4vKTsgfSksICdTdHJpbmcnLCB7XG4gIC8vIDIxLjEuMy4xOCBTdHJpbmcucHJvdG90eXBlLnN0YXJ0c1dpdGgoc2VhcmNoU3RyaW5nIFssIHBvc2l0aW9uIF0pXG4gIHN0YXJ0c1dpdGg6IGZ1bmN0aW9uIHN0YXJ0c1dpdGgoc2VhcmNoU3RyaW5nIC8qLCBwb3NpdGlvbiA9IDAgKi8pe1xuICAgIHZhciB0aGF0ICAgPSBjb250ZXh0KHRoaXMsIHNlYXJjaFN0cmluZywgJ3N0YXJ0c1dpdGgnKVxuICAgICAgLCBpbmRleCAgPSB0b0xlbmd0aChNYXRoLm1pbihhcmd1bWVudHNbMV0sIHRoYXQubGVuZ3RoKSlcbiAgICAgICwgc2VhcmNoID0gU3RyaW5nKHNlYXJjaFN0cmluZyk7XG4gICAgcmV0dXJuIHRoYXQuc2xpY2UoaW5kZXgsIGluZGV4ICsgc2VhcmNoLmxlbmd0aCkgPT09IHNlYXJjaDtcbiAgfVxufSk7IiwiJ3VzZSBzdHJpY3QnO1xuLy8gMjEuMS4zLjI1IFN0cmluZy5wcm90b3R5cGUudHJpbSgpXG5yZXF1aXJlKCcuLyQuc3RyaW5nLXRyaW0nKSgndHJpbScsIGZ1bmN0aW9uKCR0cmltKXtcbiAgcmV0dXJuIGZ1bmN0aW9uIHRyaW0oKXtcbiAgICByZXR1cm4gJHRyaW0odGhpcywgMyk7XG4gIH07XG59KTsiLCIndXNlIHN0cmljdCc7XG4vLyBFQ01BU2NyaXB0IDYgc3ltYm9scyBzaGltXG52YXIgJCAgICAgICAgICAgICAgPSByZXF1aXJlKCcuLyQnKVxuICAsIGdsb2JhbCAgICAgICAgID0gcmVxdWlyZSgnLi8kLmdsb2JhbCcpXG4gICwgaGFzICAgICAgICAgICAgPSByZXF1aXJlKCcuLyQuaGFzJylcbiAgLCBTVVBQT1JUX0RFU0MgICA9IHJlcXVpcmUoJy4vJC5zdXBwb3J0LWRlc2MnKVxuICAsICRkZWYgICAgICAgICAgID0gcmVxdWlyZSgnLi8kLmRlZicpXG4gICwgJHJlZGVmICAgICAgICAgPSByZXF1aXJlKCcuLyQucmVkZWYnKVxuICAsIHNoYXJlZCAgICAgICAgID0gcmVxdWlyZSgnLi8kLnNoYXJlZCcpXG4gICwgc2V0VGFnICAgICAgICAgPSByZXF1aXJlKCcuLyQudGFnJylcbiAgLCB1aWQgICAgICAgICAgICA9IHJlcXVpcmUoJy4vJC51aWQnKVxuICAsIHdrcyAgICAgICAgICAgID0gcmVxdWlyZSgnLi8kLndrcycpXG4gICwga2V5T2YgICAgICAgICAgPSByZXF1aXJlKCcuLyQua2V5b2YnKVxuICAsICRuYW1lcyAgICAgICAgID0gcmVxdWlyZSgnLi8kLmdldC1uYW1lcycpXG4gICwgZW51bUtleXMgICAgICAgPSByZXF1aXJlKCcuLyQuZW51bS1rZXlzJylcbiAgLCBpc09iamVjdCAgICAgICA9IHJlcXVpcmUoJy4vJC5pcy1vYmplY3QnKVxuICAsIGFuT2JqZWN0ICAgICAgID0gcmVxdWlyZSgnLi8kLmFuLW9iamVjdCcpXG4gICwgdG9JT2JqZWN0ICAgICAgPSByZXF1aXJlKCcuLyQudG8taW9iamVjdCcpXG4gICwgY3JlYXRlRGVzYyAgICAgPSByZXF1aXJlKCcuLyQucHJvcGVydHktZGVzYycpXG4gICwgZ2V0RGVzYyAgICAgICAgPSAkLmdldERlc2NcbiAgLCBzZXREZXNjICAgICAgICA9ICQuc2V0RGVzY1xuICAsIF9jcmVhdGUgICAgICAgID0gJC5jcmVhdGVcbiAgLCBnZXROYW1lcyAgICAgICA9ICRuYW1lcy5nZXRcbiAgLCAkU3ltYm9sICAgICAgICA9IGdsb2JhbC5TeW1ib2xcbiAgLCBzZXR0ZXIgICAgICAgICA9IGZhbHNlXG4gICwgSElEREVOICAgICAgICAgPSB3a3MoJ19oaWRkZW4nKVxuICAsIGlzRW51bSAgICAgICAgID0gJC5pc0VudW1cbiAgLCBTeW1ib2xSZWdpc3RyeSA9IHNoYXJlZCgnc3ltYm9sLXJlZ2lzdHJ5JylcbiAgLCBBbGxTeW1ib2xzICAgICA9IHNoYXJlZCgnc3ltYm9scycpXG4gICwgdXNlTmF0aXZlICAgICAgPSB0eXBlb2YgJFN5bWJvbCA9PSAnZnVuY3Rpb24nXG4gICwgT2JqZWN0UHJvdG8gICAgPSBPYmplY3QucHJvdG90eXBlO1xuXG52YXIgc2V0U3ltYm9sRGVzYyA9IFNVUFBPUlRfREVTQyA/IGZ1bmN0aW9uKCl7IC8vIGZhbGxiYWNrIGZvciBvbGQgQW5kcm9pZFxuICB0cnkge1xuICAgIHJldHVybiBfY3JlYXRlKHNldERlc2Moe30sIEhJRERFTiwge1xuICAgICAgZ2V0OiBmdW5jdGlvbigpe1xuICAgICAgICByZXR1cm4gc2V0RGVzYyh0aGlzLCBISURERU4sIHt2YWx1ZTogZmFsc2V9KVtISURERU5dO1xuICAgICAgfVxuICAgIH0pKVtISURERU5dIHx8IHNldERlc2M7XG4gIH0gY2F0Y2goZSl7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKGl0LCBrZXksIEQpe1xuICAgICAgdmFyIHByb3RvRGVzYyA9IGdldERlc2MoT2JqZWN0UHJvdG8sIGtleSk7XG4gICAgICBpZihwcm90b0Rlc2MpZGVsZXRlIE9iamVjdFByb3RvW2tleV07XG4gICAgICBzZXREZXNjKGl0LCBrZXksIEQpO1xuICAgICAgaWYocHJvdG9EZXNjICYmIGl0ICE9PSBPYmplY3RQcm90bylzZXREZXNjKE9iamVjdFByb3RvLCBrZXksIHByb3RvRGVzYyk7XG4gICAgfTtcbiAgfVxufSgpIDogc2V0RGVzYztcblxudmFyIHdyYXAgPSBmdW5jdGlvbih0YWcpe1xuICB2YXIgc3ltID0gQWxsU3ltYm9sc1t0YWddID0gX2NyZWF0ZSgkU3ltYm9sLnByb3RvdHlwZSk7XG4gIHN5bS5fayA9IHRhZztcbiAgU1VQUE9SVF9ERVNDICYmIHNldHRlciAmJiBzZXRTeW1ib2xEZXNjKE9iamVjdFByb3RvLCB0YWcsIHtcbiAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgc2V0OiBmdW5jdGlvbih2YWx1ZSl7XG4gICAgICBpZihoYXModGhpcywgSElEREVOKSAmJiBoYXModGhpc1tISURERU5dLCB0YWcpKXRoaXNbSElEREVOXVt0YWddID0gZmFsc2U7XG4gICAgICBzZXRTeW1ib2xEZXNjKHRoaXMsIHRhZywgY3JlYXRlRGVzYygxLCB2YWx1ZSkpO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBzeW07XG59O1xuXG52YXIgJGRlZmluZVByb3BlcnR5ID0gZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoaXQsIGtleSwgRCl7XG4gIGlmKEQgJiYgaGFzKEFsbFN5bWJvbHMsIGtleSkpe1xuICAgIGlmKCFELmVudW1lcmFibGUpe1xuICAgICAgaWYoIWhhcyhpdCwgSElEREVOKSlzZXREZXNjKGl0LCBISURERU4sIGNyZWF0ZURlc2MoMSwge30pKTtcbiAgICAgIGl0W0hJRERFTl1ba2V5XSA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmKGhhcyhpdCwgSElEREVOKSAmJiBpdFtISURERU5dW2tleV0paXRbSElEREVOXVtrZXldID0gZmFsc2U7XG4gICAgICBEID0gX2NyZWF0ZShELCB7ZW51bWVyYWJsZTogY3JlYXRlRGVzYygwLCBmYWxzZSl9KTtcbiAgICB9IHJldHVybiBzZXRTeW1ib2xEZXNjKGl0LCBrZXksIEQpO1xuICB9IHJldHVybiBzZXREZXNjKGl0LCBrZXksIEQpO1xufTtcbnZhciAkZGVmaW5lUHJvcGVydGllcyA9IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXMoaXQsIFApe1xuICBhbk9iamVjdChpdCk7XG4gIHZhciBrZXlzID0gZW51bUtleXMoUCA9IHRvSU9iamVjdChQKSlcbiAgICAsIGkgICAgPSAwXG4gICAgLCBsID0ga2V5cy5sZW5ndGhcbiAgICAsIGtleTtcbiAgd2hpbGUobCA+IGkpJGRlZmluZVByb3BlcnR5KGl0LCBrZXkgPSBrZXlzW2krK10sIFBba2V5XSk7XG4gIHJldHVybiBpdDtcbn07XG52YXIgJGNyZWF0ZSA9IGZ1bmN0aW9uIGNyZWF0ZShpdCwgUCl7XG4gIHJldHVybiBQID09PSB1bmRlZmluZWQgPyBfY3JlYXRlKGl0KSA6ICRkZWZpbmVQcm9wZXJ0aWVzKF9jcmVhdGUoaXQpLCBQKTtcbn07XG52YXIgJHByb3BlcnR5SXNFbnVtZXJhYmxlID0gZnVuY3Rpb24gcHJvcGVydHlJc0VudW1lcmFibGUoa2V5KXtcbiAgdmFyIEUgPSBpc0VudW0uY2FsbCh0aGlzLCBrZXkpO1xuICByZXR1cm4gRSB8fCAhaGFzKHRoaXMsIGtleSkgfHwgIWhhcyhBbGxTeW1ib2xzLCBrZXkpIHx8IGhhcyh0aGlzLCBISURERU4pICYmIHRoaXNbSElEREVOXVtrZXldXG4gICAgPyBFIDogdHJ1ZTtcbn07XG52YXIgJGdldE93blByb3BlcnR5RGVzY3JpcHRvciA9IGZ1bmN0aW9uIGdldE93blByb3BlcnR5RGVzY3JpcHRvcihpdCwga2V5KXtcbiAgdmFyIEQgPSBnZXREZXNjKGl0ID0gdG9JT2JqZWN0KGl0KSwga2V5KTtcbiAgaWYoRCAmJiBoYXMoQWxsU3ltYm9scywga2V5KSAmJiAhKGhhcyhpdCwgSElEREVOKSAmJiBpdFtISURERU5dW2tleV0pKUQuZW51bWVyYWJsZSA9IHRydWU7XG4gIHJldHVybiBEO1xufTtcbnZhciAkZ2V0T3duUHJvcGVydHlOYW1lcyA9IGZ1bmN0aW9uIGdldE93blByb3BlcnR5TmFtZXMoaXQpe1xuICB2YXIgbmFtZXMgID0gZ2V0TmFtZXModG9JT2JqZWN0KGl0KSlcbiAgICAsIHJlc3VsdCA9IFtdXG4gICAgLCBpICAgICAgPSAwXG4gICAgLCBrZXk7XG4gIHdoaWxlKG5hbWVzLmxlbmd0aCA+IGkpaWYoIWhhcyhBbGxTeW1ib2xzLCBrZXkgPSBuYW1lc1tpKytdKSAmJiBrZXkgIT0gSElEREVOKXJlc3VsdC5wdXNoKGtleSk7XG4gIHJldHVybiByZXN1bHQ7XG59O1xudmFyICRnZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPSBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMoaXQpe1xuICB2YXIgbmFtZXMgID0gZ2V0TmFtZXModG9JT2JqZWN0KGl0KSlcbiAgICAsIHJlc3VsdCA9IFtdXG4gICAgLCBpICAgICAgPSAwXG4gICAgLCBrZXk7XG4gIHdoaWxlKG5hbWVzLmxlbmd0aCA+IGkpaWYoaGFzKEFsbFN5bWJvbHMsIGtleSA9IG5hbWVzW2krK10pKXJlc3VsdC5wdXNoKEFsbFN5bWJvbHNba2V5XSk7XG4gIHJldHVybiByZXN1bHQ7XG59O1xuXG4vLyAxOS40LjEuMSBTeW1ib2woW2Rlc2NyaXB0aW9uXSlcbmlmKCF1c2VOYXRpdmUpe1xuICAkU3ltYm9sID0gZnVuY3Rpb24gU3ltYm9sKCl7XG4gICAgaWYodGhpcyBpbnN0YW5jZW9mICRTeW1ib2wpdGhyb3cgVHlwZUVycm9yKCdTeW1ib2wgaXMgbm90IGEgY29uc3RydWN0b3InKTtcbiAgICByZXR1cm4gd3JhcCh1aWQoYXJndW1lbnRzWzBdKSk7XG4gIH07XG4gICRyZWRlZigkU3ltYm9sLnByb3RvdHlwZSwgJ3RvU3RyaW5nJywgZnVuY3Rpb24gdG9TdHJpbmcoKXtcbiAgICByZXR1cm4gdGhpcy5faztcbiAgfSk7XG5cbiAgJC5jcmVhdGUgICAgID0gJGNyZWF0ZTtcbiAgJC5pc0VudW0gICAgID0gJHByb3BlcnR5SXNFbnVtZXJhYmxlO1xuICAkLmdldERlc2MgICAgPSAkZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO1xuICAkLnNldERlc2MgICAgPSAkZGVmaW5lUHJvcGVydHk7XG4gICQuc2V0RGVzY3MgICA9ICRkZWZpbmVQcm9wZXJ0aWVzO1xuICAkLmdldE5hbWVzICAgPSAkbmFtZXMuZ2V0ID0gJGdldE93blByb3BlcnR5TmFtZXM7XG4gICQuZ2V0U3ltYm9scyA9ICRnZXRPd25Qcm9wZXJ0eVN5bWJvbHM7XG5cbiAgaWYoU1VQUE9SVF9ERVNDICYmICFyZXF1aXJlKCcuLyQubGlicmFyeScpKXtcbiAgICAkcmVkZWYoT2JqZWN0UHJvdG8sICdwcm9wZXJ0eUlzRW51bWVyYWJsZScsICRwcm9wZXJ0eUlzRW51bWVyYWJsZSwgdHJ1ZSk7XG4gIH1cbn1cblxuLy8gTVMgRWRnZSBjb252ZXJ0cyBzeW1ib2wgdmFsdWVzIHRvIEpTT04gYXMge31cbi8vIFdlYktpdCBjb252ZXJ0cyBzeW1ib2wgdmFsdWVzIGluIG9iamVjdHMgdG8gSlNPTiBhcyBudWxsXG5pZighdXNlTmF0aXZlIHx8IHJlcXVpcmUoJy4vJC5mYWlscycpKGZ1bmN0aW9uKCl7XG4gIHJldHVybiBKU09OLnN0cmluZ2lmeShbe2E6ICRTeW1ib2woKX0sIFskU3ltYm9sKCldXSkgIT0gJ1t7fSxbbnVsbF1dJztcbn0pKSRyZWRlZigkU3ltYm9sLnByb3RvdHlwZSwgJ3RvSlNPTicsIGZ1bmN0aW9uIHRvSlNPTigpe1xuICBpZih1c2VOYXRpdmUgJiYgaXNPYmplY3QodGhpcykpcmV0dXJuIHRoaXM7XG59KTtcblxudmFyIHN5bWJvbFN0YXRpY3MgPSB7XG4gIC8vIDE5LjQuMi4xIFN5bWJvbC5mb3Ioa2V5KVxuICAnZm9yJzogZnVuY3Rpb24oa2V5KXtcbiAgICByZXR1cm4gaGFzKFN5bWJvbFJlZ2lzdHJ5LCBrZXkgKz0gJycpXG4gICAgICA/IFN5bWJvbFJlZ2lzdHJ5W2tleV1cbiAgICAgIDogU3ltYm9sUmVnaXN0cnlba2V5XSA9ICRTeW1ib2woa2V5KTtcbiAgfSxcbiAgLy8gMTkuNC4yLjUgU3ltYm9sLmtleUZvcihzeW0pXG4gIGtleUZvcjogZnVuY3Rpb24ga2V5Rm9yKGtleSl7XG4gICAgcmV0dXJuIGtleU9mKFN5bWJvbFJlZ2lzdHJ5LCBrZXkpO1xuICB9LFxuICB1c2VTZXR0ZXI6IGZ1bmN0aW9uKCl7IHNldHRlciA9IHRydWU7IH0sXG4gIHVzZVNpbXBsZTogZnVuY3Rpb24oKXsgc2V0dGVyID0gZmFsc2U7IH1cbn07XG4vLyAxOS40LjIuMiBTeW1ib2wuaGFzSW5zdGFuY2Vcbi8vIDE5LjQuMi4zIFN5bWJvbC5pc0NvbmNhdFNwcmVhZGFibGVcbi8vIDE5LjQuMi40IFN5bWJvbC5pdGVyYXRvclxuLy8gMTkuNC4yLjYgU3ltYm9sLm1hdGNoXG4vLyAxOS40LjIuOCBTeW1ib2wucmVwbGFjZVxuLy8gMTkuNC4yLjkgU3ltYm9sLnNlYXJjaFxuLy8gMTkuNC4yLjEwIFN5bWJvbC5zcGVjaWVzXG4vLyAxOS40LjIuMTEgU3ltYm9sLnNwbGl0XG4vLyAxOS40LjIuMTIgU3ltYm9sLnRvUHJpbWl0aXZlXG4vLyAxOS40LjIuMTMgU3ltYm9sLnRvU3RyaW5nVGFnXG4vLyAxOS40LjIuMTQgU3ltYm9sLnVuc2NvcGFibGVzXG4kLmVhY2guY2FsbCgoXG4gICAgJ2hhc0luc3RhbmNlLGlzQ29uY2F0U3ByZWFkYWJsZSxpdGVyYXRvcixtYXRjaCxyZXBsYWNlLHNlYXJjaCwnICtcbiAgICAnc3BlY2llcyxzcGxpdCx0b1ByaW1pdGl2ZSx0b1N0cmluZ1RhZyx1bnNjb3BhYmxlcydcbiAgKS5zcGxpdCgnLCcpLCBmdW5jdGlvbihpdCl7XG4gICAgdmFyIHN5bSA9IHdrcyhpdCk7XG4gICAgc3ltYm9sU3RhdGljc1tpdF0gPSB1c2VOYXRpdmUgPyBzeW0gOiB3cmFwKHN5bSk7XG4gIH1cbik7XG5cbnNldHRlciA9IHRydWU7XG5cbiRkZWYoJGRlZi5HICsgJGRlZi5XLCB7U3ltYm9sOiAkU3ltYm9sfSk7XG5cbiRkZWYoJGRlZi5TLCAnU3ltYm9sJywgc3ltYm9sU3RhdGljcyk7XG5cbiRkZWYoJGRlZi5TICsgJGRlZi5GICogIXVzZU5hdGl2ZSwgJ09iamVjdCcsIHtcbiAgLy8gMTkuMS4yLjIgT2JqZWN0LmNyZWF0ZShPIFssIFByb3BlcnRpZXNdKVxuICBjcmVhdGU6ICRjcmVhdGUsXG4gIC8vIDE5LjEuMi40IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKVxuICBkZWZpbmVQcm9wZXJ0eTogJGRlZmluZVByb3BlcnR5LFxuICAvLyAxOS4xLjIuMyBPYmplY3QuZGVmaW5lUHJvcGVydGllcyhPLCBQcm9wZXJ0aWVzKVxuICBkZWZpbmVQcm9wZXJ0aWVzOiAkZGVmaW5lUHJvcGVydGllcyxcbiAgLy8gMTkuMS4yLjYgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihPLCBQKVxuICBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I6ICRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IsXG4gIC8vIDE5LjEuMi43IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKE8pXG4gIGdldE93blByb3BlcnR5TmFtZXM6ICRnZXRPd25Qcm9wZXJ0eU5hbWVzLFxuICAvLyAxOS4xLjIuOCBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKE8pXG4gIGdldE93blByb3BlcnR5U3ltYm9sczogJGdldE93blByb3BlcnR5U3ltYm9sc1xufSk7XG5cbi8vIDE5LjQuMy41IFN5bWJvbC5wcm90b3R5cGVbQEB0b1N0cmluZ1RhZ11cbnNldFRhZygkU3ltYm9sLCAnU3ltYm9sJyk7XG4vLyAyMC4yLjEuOSBNYXRoW0BAdG9TdHJpbmdUYWddXG5zZXRUYWcoTWF0aCwgJ01hdGgnLCB0cnVlKTtcbi8vIDI0LjMuMyBKU09OW0BAdG9TdHJpbmdUYWddXG5zZXRUYWcoZ2xvYmFsLkpTT04sICdKU09OJywgdHJ1ZSk7IiwiJ3VzZSBzdHJpY3QnO1xudmFyICQgICAgICAgICAgICA9IHJlcXVpcmUoJy4vJCcpXG4gICwgd2VhayAgICAgICAgID0gcmVxdWlyZSgnLi8kLmNvbGxlY3Rpb24td2VhaycpXG4gICwgaXNPYmplY3QgICAgID0gcmVxdWlyZSgnLi8kLmlzLW9iamVjdCcpXG4gICwgaGFzICAgICAgICAgID0gcmVxdWlyZSgnLi8kLmhhcycpXG4gICwgZnJvemVuU3RvcmUgID0gd2Vhay5mcm96ZW5TdG9yZVxuICAsIFdFQUsgICAgICAgICA9IHdlYWsuV0VBS1xuICAsIGlzRXh0ZW5zaWJsZSA9IE9iamVjdC5pc0V4dGVuc2libGUgfHwgaXNPYmplY3RcbiAgLCB0bXAgICAgICAgICAgPSB7fTtcblxuLy8gMjMuMyBXZWFrTWFwIE9iamVjdHNcbnZhciAkV2Vha01hcCA9IHJlcXVpcmUoJy4vJC5jb2xsZWN0aW9uJykoJ1dlYWtNYXAnLCBmdW5jdGlvbihnZXQpe1xuICByZXR1cm4gZnVuY3Rpb24gV2Vha01hcCgpeyByZXR1cm4gZ2V0KHRoaXMsIGFyZ3VtZW50c1swXSk7IH07XG59LCB7XG4gIC8vIDIzLjMuMy4zIFdlYWtNYXAucHJvdG90eXBlLmdldChrZXkpXG4gIGdldDogZnVuY3Rpb24gZ2V0KGtleSl7XG4gICAgaWYoaXNPYmplY3Qoa2V5KSl7XG4gICAgICBpZighaXNFeHRlbnNpYmxlKGtleSkpcmV0dXJuIGZyb3plblN0b3JlKHRoaXMpLmdldChrZXkpO1xuICAgICAgaWYoaGFzKGtleSwgV0VBSykpcmV0dXJuIGtleVtXRUFLXVt0aGlzLl9pXTtcbiAgICB9XG4gIH0sXG4gIC8vIDIzLjMuMy41IFdlYWtNYXAucHJvdG90eXBlLnNldChrZXksIHZhbHVlKVxuICBzZXQ6IGZ1bmN0aW9uIHNldChrZXksIHZhbHVlKXtcbiAgICByZXR1cm4gd2Vhay5kZWYodGhpcywga2V5LCB2YWx1ZSk7XG4gIH1cbn0sIHdlYWssIHRydWUsIHRydWUpO1xuXG4vLyBJRTExIFdlYWtNYXAgZnJvemVuIGtleXMgZml4XG5pZihuZXcgJFdlYWtNYXAoKS5zZXQoKE9iamVjdC5mcmVlemUgfHwgT2JqZWN0KSh0bXApLCA3KS5nZXQodG1wKSAhPSA3KXtcbiAgJC5lYWNoLmNhbGwoWydkZWxldGUnLCAnaGFzJywgJ2dldCcsICdzZXQnXSwgZnVuY3Rpb24oa2V5KXtcbiAgICB2YXIgcHJvdG8gID0gJFdlYWtNYXAucHJvdG90eXBlXG4gICAgICAsIG1ldGhvZCA9IHByb3RvW2tleV07XG4gICAgcmVxdWlyZSgnLi8kLnJlZGVmJykocHJvdG8sIGtleSwgZnVuY3Rpb24oYSwgYil7XG4gICAgICAvLyBzdG9yZSBmcm96ZW4gb2JqZWN0cyBvbiBsZWFreSBtYXBcbiAgICAgIGlmKGlzT2JqZWN0KGEpICYmICFpc0V4dGVuc2libGUoYSkpe1xuICAgICAgICB2YXIgcmVzdWx0ID0gZnJvemVuU3RvcmUodGhpcylba2V5XShhLCBiKTtcbiAgICAgICAgcmV0dXJuIGtleSA9PSAnc2V0JyA/IHRoaXMgOiByZXN1bHQ7XG4gICAgICAvLyBzdG9yZSBhbGwgdGhlIHJlc3Qgb24gbmF0aXZlIHdlYWttYXBcbiAgICAgIH0gcmV0dXJuIG1ldGhvZC5jYWxsKHRoaXMsIGEsIGIpO1xuICAgIH0pO1xuICB9KTtcbn0iLCIndXNlIHN0cmljdCc7XG52YXIgd2VhayA9IHJlcXVpcmUoJy4vJC5jb2xsZWN0aW9uLXdlYWsnKTtcblxuLy8gMjMuNCBXZWFrU2V0IE9iamVjdHNcbnJlcXVpcmUoJy4vJC5jb2xsZWN0aW9uJykoJ1dlYWtTZXQnLCBmdW5jdGlvbihnZXQpe1xuICByZXR1cm4gZnVuY3Rpb24gV2Vha1NldCgpeyByZXR1cm4gZ2V0KHRoaXMsIGFyZ3VtZW50c1swXSk7IH07XG59LCB7XG4gIC8vIDIzLjQuMy4xIFdlYWtTZXQucHJvdG90eXBlLmFkZCh2YWx1ZSlcbiAgYWRkOiBmdW5jdGlvbiBhZGQodmFsdWUpe1xuICAgIHJldHVybiB3ZWFrLmRlZih0aGlzLCB2YWx1ZSwgdHJ1ZSk7XG4gIH1cbn0sIHdlYWssIGZhbHNlLCB0cnVlKTsiLCIndXNlIHN0cmljdCc7XG52YXIgJGRlZiAgICAgID0gcmVxdWlyZSgnLi8kLmRlZicpXG4gICwgJGluY2x1ZGVzID0gcmVxdWlyZSgnLi8kLmFycmF5LWluY2x1ZGVzJykodHJ1ZSk7XG4kZGVmKCRkZWYuUCwgJ0FycmF5Jywge1xuICAvLyBodHRwczovL2dpdGh1Yi5jb20vZG9tZW5pYy9BcnJheS5wcm90b3R5cGUuaW5jbHVkZXNcbiAgaW5jbHVkZXM6IGZ1bmN0aW9uIGluY2x1ZGVzKGVsIC8qLCBmcm9tSW5kZXggPSAwICovKXtcbiAgICByZXR1cm4gJGluY2x1ZGVzKHRoaXMsIGVsLCBhcmd1bWVudHNbMV0pO1xuICB9XG59KTtcbnJlcXVpcmUoJy4vJC51bnNjb3BlJykoJ2luY2x1ZGVzJyk7IiwiLy8gaHR0cHM6Ly9naXRodWIuY29tL0RhdmlkQnJ1YW50L01hcC1TZXQucHJvdG90eXBlLnRvSlNPTlxudmFyICRkZWYgID0gcmVxdWlyZSgnLi8kLmRlZicpO1xuXG4kZGVmKCRkZWYuUCwgJ01hcCcsIHt0b0pTT046IHJlcXVpcmUoJy4vJC5jb2xsZWN0aW9uLXRvLWpzb24nKSgnTWFwJyl9KTsiLCIvLyBodHRwOi8vZ29vLmdsL1hrQnJqRFxudmFyICRkZWYgICAgID0gcmVxdWlyZSgnLi8kLmRlZicpXG4gICwgJGVudHJpZXMgPSByZXF1aXJlKCcuLyQub2JqZWN0LXRvLWFycmF5JykodHJ1ZSk7XG5cbiRkZWYoJGRlZi5TLCAnT2JqZWN0Jywge1xuICBlbnRyaWVzOiBmdW5jdGlvbiBlbnRyaWVzKGl0KXtcbiAgICByZXR1cm4gJGVudHJpZXMoaXQpO1xuICB9XG59KTsiLCIvLyBodHRwczovL2dpc3QuZ2l0aHViLmNvbS9XZWJSZWZsZWN0aW9uLzkzNTM3ODFcbnZhciAkICAgICAgICAgID0gcmVxdWlyZSgnLi8kJylcbiAgLCAkZGVmICAgICAgID0gcmVxdWlyZSgnLi8kLmRlZicpXG4gICwgb3duS2V5cyAgICA9IHJlcXVpcmUoJy4vJC5vd24ta2V5cycpXG4gICwgdG9JT2JqZWN0ICA9IHJlcXVpcmUoJy4vJC50by1pb2JqZWN0JylcbiAgLCBjcmVhdGVEZXNjID0gcmVxdWlyZSgnLi8kLnByb3BlcnR5LWRlc2MnKTtcblxuJGRlZigkZGVmLlMsICdPYmplY3QnLCB7XG4gIGdldE93blByb3BlcnR5RGVzY3JpcHRvcnM6IGZ1bmN0aW9uIGdldE93blByb3BlcnR5RGVzY3JpcHRvcnMob2JqZWN0KXtcbiAgICB2YXIgTyAgICAgICA9IHRvSU9iamVjdChvYmplY3QpXG4gICAgICAsIHNldERlc2MgPSAkLnNldERlc2NcbiAgICAgICwgZ2V0RGVzYyA9ICQuZ2V0RGVzY1xuICAgICAgLCBrZXlzICAgID0gb3duS2V5cyhPKVxuICAgICAgLCByZXN1bHQgID0ge31cbiAgICAgICwgaSAgICAgICA9IDBcbiAgICAgICwga2V5LCBEO1xuICAgIHdoaWxlKGtleXMubGVuZ3RoID4gaSl7XG4gICAgICBEID0gZ2V0RGVzYyhPLCBrZXkgPSBrZXlzW2krK10pO1xuICAgICAgaWYoa2V5IGluIHJlc3VsdClzZXREZXNjKHJlc3VsdCwga2V5LCBjcmVhdGVEZXNjKDAsIEQpKTtcbiAgICAgIGVsc2UgcmVzdWx0W2tleV0gPSBEO1xuICAgIH0gcmV0dXJuIHJlc3VsdDtcbiAgfVxufSk7IiwiLy8gaHR0cDovL2dvby5nbC9Ya0JyakRcbnZhciAkZGVmICAgID0gcmVxdWlyZSgnLi8kLmRlZicpXG4gICwgJHZhbHVlcyA9IHJlcXVpcmUoJy4vJC5vYmplY3QtdG8tYXJyYXknKShmYWxzZSk7XG5cbiRkZWYoJGRlZi5TLCAnT2JqZWN0Jywge1xuICB2YWx1ZXM6IGZ1bmN0aW9uIHZhbHVlcyhpdCl7XG4gICAgcmV0dXJuICR2YWx1ZXMoaXQpO1xuICB9XG59KTsiLCIvLyBodHRwczovL2dpdGh1Yi5jb20vYmVuamFtaW5nci9SZXhFeHAuZXNjYXBlXG52YXIgJGRlZiA9IHJlcXVpcmUoJy4vJC5kZWYnKVxuICAsICRyZSAgPSByZXF1aXJlKCcuLyQucmVwbGFjZXInKSgvW1xcXFxeJCorPy4oKXxbXFxde31dL2csICdcXFxcJCYnKTtcbiRkZWYoJGRlZi5TLCAnUmVnRXhwJywge2VzY2FwZTogZnVuY3Rpb24gZXNjYXBlKGl0KXsgcmV0dXJuICRyZShpdCk7IH19KTtcbiIsIi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9EYXZpZEJydWFudC9NYXAtU2V0LnByb3RvdHlwZS50b0pTT05cbnZhciAkZGVmICA9IHJlcXVpcmUoJy4vJC5kZWYnKTtcblxuJGRlZigkZGVmLlAsICdTZXQnLCB7dG9KU09OOiByZXF1aXJlKCcuLyQuY29sbGVjdGlvbi10by1qc29uJykoJ1NldCcpfSk7IiwiLy8gaHR0cHM6Ly9naXRodWIuY29tL21hdGhpYXNieW5lbnMvU3RyaW5nLnByb3RvdHlwZS5hdFxuJ3VzZSBzdHJpY3QnO1xudmFyICRkZWYgPSByZXF1aXJlKCcuLyQuZGVmJylcbiAgLCAkYXQgID0gcmVxdWlyZSgnLi8kLnN0cmluZy1hdCcpKHRydWUpO1xuJGRlZigkZGVmLlAsICdTdHJpbmcnLCB7XG4gIGF0OiBmdW5jdGlvbiBhdChwb3Mpe1xuICAgIHJldHVybiAkYXQodGhpcywgcG9zKTtcbiAgfVxufSk7IiwiJ3VzZSBzdHJpY3QnO1xudmFyICRkZWYgPSByZXF1aXJlKCcuLyQuZGVmJylcbiAgLCAkcGFkID0gcmVxdWlyZSgnLi8kLnN0cmluZy1wYWQnKTtcbiRkZWYoJGRlZi5QLCAnU3RyaW5nJywge1xuICBwYWRMZWZ0OiBmdW5jdGlvbiBwYWRMZWZ0KG1heExlbmd0aCAvKiwgZmlsbFN0cmluZyA9ICcgJyAqLyl7XG4gICAgcmV0dXJuICRwYWQodGhpcywgbWF4TGVuZ3RoLCBhcmd1bWVudHNbMV0sIHRydWUpO1xuICB9XG59KTsiLCIndXNlIHN0cmljdCc7XG52YXIgJGRlZiA9IHJlcXVpcmUoJy4vJC5kZWYnKVxuICAsICRwYWQgPSByZXF1aXJlKCcuLyQuc3RyaW5nLXBhZCcpO1xuJGRlZigkZGVmLlAsICdTdHJpbmcnLCB7XG4gIHBhZFJpZ2h0OiBmdW5jdGlvbiBwYWRSaWdodChtYXhMZW5ndGggLyosIGZpbGxTdHJpbmcgPSAnICcgKi8pe1xuICAgIHJldHVybiAkcGFkKHRoaXMsIG1heExlbmd0aCwgYXJndW1lbnRzWzFdLCBmYWxzZSk7XG4gIH1cbn0pOyIsIid1c2Ugc3RyaWN0Jztcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9zZWJtYXJrYmFnZS9lY21hc2NyaXB0LXN0cmluZy1sZWZ0LXJpZ2h0LXRyaW1cbnJlcXVpcmUoJy4vJC5zdHJpbmctdHJpbScpKCd0cmltTGVmdCcsIGZ1bmN0aW9uKCR0cmltKXtcbiAgcmV0dXJuIGZ1bmN0aW9uIHRyaW1MZWZ0KCl7XG4gICAgcmV0dXJuICR0cmltKHRoaXMsIDEpO1xuICB9O1xufSk7IiwiJ3VzZSBzdHJpY3QnO1xuLy8gaHR0cHM6Ly9naXRodWIuY29tL3NlYm1hcmtiYWdlL2VjbWFzY3JpcHQtc3RyaW5nLWxlZnQtcmlnaHQtdHJpbVxucmVxdWlyZSgnLi8kLnN0cmluZy10cmltJykoJ3RyaW1SaWdodCcsIGZ1bmN0aW9uKCR0cmltKXtcbiAgcmV0dXJuIGZ1bmN0aW9uIHRyaW1SaWdodCgpe1xuICAgIHJldHVybiAkdHJpbSh0aGlzLCAyKTtcbiAgfTtcbn0pOyIsIi8vIEphdmFTY3JpcHQgMS42IC8gU3RyYXdtYW4gYXJyYXkgc3RhdGljcyBzaGltXG52YXIgJCAgICAgICA9IHJlcXVpcmUoJy4vJCcpXG4gICwgJGRlZiAgICA9IHJlcXVpcmUoJy4vJC5kZWYnKVxuICAsICRBcnJheSAgPSByZXF1aXJlKCcuLyQuY29yZScpLkFycmF5IHx8IEFycmF5XG4gICwgc3RhdGljcyA9IHt9O1xudmFyIHNldFN0YXRpY3MgPSBmdW5jdGlvbihrZXlzLCBsZW5ndGgpe1xuICAkLmVhY2guY2FsbChrZXlzLnNwbGl0KCcsJyksIGZ1bmN0aW9uKGtleSl7XG4gICAgaWYobGVuZ3RoID09IHVuZGVmaW5lZCAmJiBrZXkgaW4gJEFycmF5KXN0YXRpY3Nba2V5XSA9ICRBcnJheVtrZXldO1xuICAgIGVsc2UgaWYoa2V5IGluIFtdKXN0YXRpY3Nba2V5XSA9IHJlcXVpcmUoJy4vJC5jdHgnKShGdW5jdGlvbi5jYWxsLCBbXVtrZXldLCBsZW5ndGgpO1xuICB9KTtcbn07XG5zZXRTdGF0aWNzKCdwb3AscmV2ZXJzZSxzaGlmdCxrZXlzLHZhbHVlcyxlbnRyaWVzJywgMSk7XG5zZXRTdGF0aWNzKCdpbmRleE9mLGV2ZXJ5LHNvbWUsZm9yRWFjaCxtYXAsZmlsdGVyLGZpbmQsZmluZEluZGV4LGluY2x1ZGVzJywgMyk7XG5zZXRTdGF0aWNzKCdqb2luLHNsaWNlLGNvbmNhdCxwdXNoLHNwbGljZSx1bnNoaWZ0LHNvcnQsbGFzdEluZGV4T2YsJyArXG4gICAgICAgICAgICdyZWR1Y2UscmVkdWNlUmlnaHQsY29weVdpdGhpbixmaWxsJyk7XG4kZGVmKCRkZWYuUywgJ0FycmF5Jywgc3RhdGljcyk7IiwicmVxdWlyZSgnLi9lczYuYXJyYXkuaXRlcmF0b3InKTtcbnZhciBnbG9iYWwgICAgICA9IHJlcXVpcmUoJy4vJC5nbG9iYWwnKVxuICAsIGhpZGUgICAgICAgID0gcmVxdWlyZSgnLi8kLmhpZGUnKVxuICAsIEl0ZXJhdG9ycyAgID0gcmVxdWlyZSgnLi8kLml0ZXJhdG9ycycpXG4gICwgSVRFUkFUT1IgICAgPSByZXF1aXJlKCcuLyQud2tzJykoJ2l0ZXJhdG9yJylcbiAgLCBOTCAgICAgICAgICA9IGdsb2JhbC5Ob2RlTGlzdFxuICAsIEhUQyAgICAgICAgID0gZ2xvYmFsLkhUTUxDb2xsZWN0aW9uXG4gICwgTkxQcm90byAgICAgPSBOTCAmJiBOTC5wcm90b3R5cGVcbiAgLCBIVENQcm90byAgICA9IEhUQyAmJiBIVEMucHJvdG90eXBlXG4gICwgQXJyYXlWYWx1ZXMgPSBJdGVyYXRvcnMuTm9kZUxpc3QgPSBJdGVyYXRvcnMuSFRNTENvbGxlY3Rpb24gPSBJdGVyYXRvcnMuQXJyYXk7XG5pZihOTCAmJiAhKElURVJBVE9SIGluIE5MUHJvdG8pKWhpZGUoTkxQcm90bywgSVRFUkFUT1IsIEFycmF5VmFsdWVzKTtcbmlmKEhUQyAmJiAhKElURVJBVE9SIGluIEhUQ1Byb3RvKSloaWRlKEhUQ1Byb3RvLCBJVEVSQVRPUiwgQXJyYXlWYWx1ZXMpOyIsInZhciAkZGVmICA9IHJlcXVpcmUoJy4vJC5kZWYnKVxuICAsICR0YXNrID0gcmVxdWlyZSgnLi8kLnRhc2snKTtcbiRkZWYoJGRlZi5HICsgJGRlZi5CLCB7XG4gIHNldEltbWVkaWF0ZTogICAkdGFzay5zZXQsXG4gIGNsZWFySW1tZWRpYXRlOiAkdGFzay5jbGVhclxufSk7IiwiLy8gaWU5LSBzZXRUaW1lb3V0ICYgc2V0SW50ZXJ2YWwgYWRkaXRpb25hbCBwYXJhbWV0ZXJzIGZpeFxudmFyIGdsb2JhbCAgICAgPSByZXF1aXJlKCcuLyQuZ2xvYmFsJylcbiAgLCAkZGVmICAgICAgID0gcmVxdWlyZSgnLi8kLmRlZicpXG4gICwgaW52b2tlICAgICA9IHJlcXVpcmUoJy4vJC5pbnZva2UnKVxuICAsIHBhcnRpYWwgICAgPSByZXF1aXJlKCcuLyQucGFydGlhbCcpXG4gICwgbmF2aWdhdG9yICA9IGdsb2JhbC5uYXZpZ2F0b3JcbiAgLCBNU0lFICAgICAgID0gISFuYXZpZ2F0b3IgJiYgL01TSUUgLlxcLi8udGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTsgLy8gPC0gZGlydHkgaWU5LSBjaGVja1xudmFyIHdyYXAgPSBmdW5jdGlvbihzZXQpe1xuICByZXR1cm4gTVNJRSA/IGZ1bmN0aW9uKGZuLCB0aW1lIC8qLCAuLi5hcmdzICovKXtcbiAgICByZXR1cm4gc2V0KGludm9rZShcbiAgICAgIHBhcnRpYWwsXG4gICAgICBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMiksXG4gICAgICB0eXBlb2YgZm4gPT0gJ2Z1bmN0aW9uJyA/IGZuIDogRnVuY3Rpb24oZm4pXG4gICAgKSwgdGltZSk7XG4gIH0gOiBzZXQ7XG59O1xuJGRlZigkZGVmLkcgKyAkZGVmLkIgKyAkZGVmLkYgKiBNU0lFLCB7XG4gIHNldFRpbWVvdXQ6ICB3cmFwKGdsb2JhbC5zZXRUaW1lb3V0KSxcbiAgc2V0SW50ZXJ2YWw6IHdyYXAoZ2xvYmFsLnNldEludGVydmFsKVxufSk7IiwicmVxdWlyZSgnLi9tb2R1bGVzL2VzNScpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5zeW1ib2wnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYub2JqZWN0LmFzc2lnbicpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5vYmplY3QuaXMnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYub2JqZWN0LnNldC1wcm90b3R5cGUtb2YnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYub2JqZWN0LnRvLXN0cmluZycpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5vYmplY3QuZnJlZXplJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2Lm9iamVjdC5zZWFsJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2Lm9iamVjdC5wcmV2ZW50LWV4dGVuc2lvbnMnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYub2JqZWN0LmlzLWZyb3plbicpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5vYmplY3QuaXMtc2VhbGVkJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2Lm9iamVjdC5pcy1leHRlbnNpYmxlJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2Lm9iamVjdC5nZXQtb3duLXByb3BlcnR5LWRlc2NyaXB0b3InKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYub2JqZWN0LmdldC1wcm90b3R5cGUtb2YnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYub2JqZWN0LmtleXMnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYub2JqZWN0LmdldC1vd24tcHJvcGVydHktbmFtZXMnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYuZnVuY3Rpb24ubmFtZScpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5mdW5jdGlvbi5oYXMtaW5zdGFuY2UnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYubnVtYmVyLmNvbnN0cnVjdG9yJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2Lm51bWJlci5lcHNpbG9uJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2Lm51bWJlci5pcy1maW5pdGUnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYubnVtYmVyLmlzLWludGVnZXInKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYubnVtYmVyLmlzLW5hbicpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5udW1iZXIuaXMtc2FmZS1pbnRlZ2VyJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2Lm51bWJlci5tYXgtc2FmZS1pbnRlZ2VyJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2Lm51bWJlci5taW4tc2FmZS1pbnRlZ2VyJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2Lm51bWJlci5wYXJzZS1mbG9hdCcpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5udW1iZXIucGFyc2UtaW50Jyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2Lm1hdGguYWNvc2gnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYubWF0aC5hc2luaCcpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5tYXRoLmF0YW5oJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2Lm1hdGguY2JydCcpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5tYXRoLmNsejMyJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2Lm1hdGguY29zaCcpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5tYXRoLmV4cG0xJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2Lm1hdGguZnJvdW5kJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2Lm1hdGguaHlwb3QnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYubWF0aC5pbXVsJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2Lm1hdGgubG9nMTAnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYubWF0aC5sb2cxcCcpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5tYXRoLmxvZzInKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYubWF0aC5zaWduJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2Lm1hdGguc2luaCcpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5tYXRoLnRhbmgnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYubWF0aC50cnVuYycpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5zdHJpbmcuZnJvbS1jb2RlLXBvaW50Jyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LnN0cmluZy5yYXcnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYuc3RyaW5nLnRyaW0nKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYuc3RyaW5nLml0ZXJhdG9yJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LnN0cmluZy5jb2RlLXBvaW50LWF0Jyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LnN0cmluZy5lbmRzLXdpdGgnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYuc3RyaW5nLmluY2x1ZGVzJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LnN0cmluZy5yZXBlYXQnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYuc3RyaW5nLnN0YXJ0cy13aXRoJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LmFycmF5LmZyb20nKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYuYXJyYXkub2YnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYuYXJyYXkuaXRlcmF0b3InKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYuYXJyYXkuc3BlY2llcycpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5hcnJheS5jb3B5LXdpdGhpbicpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5hcnJheS5maWxsJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LmFycmF5LmZpbmQnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYuYXJyYXkuZmluZC1pbmRleCcpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5yZWdleHAuY29uc3RydWN0b3InKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYucmVnZXhwLmZsYWdzJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LnJlZ2V4cC5tYXRjaCcpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5yZWdleHAucmVwbGFjZScpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5yZWdleHAuc2VhcmNoJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LnJlZ2V4cC5zcGxpdCcpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5wcm9taXNlJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2Lm1hcCcpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5zZXQnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYud2Vhay1tYXAnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYud2Vhay1zZXQnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYucmVmbGVjdC5hcHBseScpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5yZWZsZWN0LmNvbnN0cnVjdCcpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5yZWZsZWN0LmRlZmluZS1wcm9wZXJ0eScpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5yZWZsZWN0LmRlbGV0ZS1wcm9wZXJ0eScpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5yZWZsZWN0LmVudW1lcmF0ZScpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5yZWZsZWN0LmdldCcpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5yZWZsZWN0LmdldC1vd24tcHJvcGVydHktZGVzY3JpcHRvcicpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5yZWZsZWN0LmdldC1wcm90b3R5cGUtb2YnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYucmVmbGVjdC5oYXMnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYucmVmbGVjdC5pcy1leHRlbnNpYmxlJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LnJlZmxlY3Qub3duLWtleXMnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYucmVmbGVjdC5wcmV2ZW50LWV4dGVuc2lvbnMnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYucmVmbGVjdC5zZXQnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYucmVmbGVjdC5zZXQtcHJvdG90eXBlLW9mJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM3LmFycmF5LmluY2x1ZGVzJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM3LnN0cmluZy5hdCcpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNy5zdHJpbmcucGFkLWxlZnQnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczcuc3RyaW5nLnBhZC1yaWdodCcpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNy5zdHJpbmcudHJpbS1sZWZ0Jyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM3LnN0cmluZy50cmltLXJpZ2h0Jyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM3LnJlZ2V4cC5lc2NhcGUnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczcub2JqZWN0LmdldC1vd24tcHJvcGVydHktZGVzY3JpcHRvcnMnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczcub2JqZWN0LnZhbHVlcycpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNy5vYmplY3QuZW50cmllcycpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNy5tYXAudG8tanNvbicpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNy5zZXQudG8tanNvbicpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2pzLmFycmF5LnN0YXRpY3MnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy93ZWIudGltZXJzJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvd2ViLmltbWVkaWF0ZScpO1xucmVxdWlyZSgnLi9tb2R1bGVzL3dlYi5kb20uaXRlcmFibGUnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9tb2R1bGVzLyQuY29yZScpOyIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE0LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIGh0dHBzOi8vcmF3LmdpdGh1Yi5jb20vZmFjZWJvb2svcmVnZW5lcmF0b3IvbWFzdGVyL0xJQ0VOU0UgZmlsZS4gQW5cbiAqIGFkZGl0aW9uYWwgZ3JhbnQgb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpblxuICogdGhlIHNhbWUgZGlyZWN0b3J5LlxuICovXG5cbiEoZnVuY3Rpb24oZ2xvYmFsKSB7XG4gIFwidXNlIHN0cmljdFwiO1xuXG4gIHZhciBoYXNPd24gPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuICB2YXIgdW5kZWZpbmVkOyAvLyBNb3JlIGNvbXByZXNzaWJsZSB0aGFuIHZvaWQgMC5cbiAgdmFyIGl0ZXJhdG9yU3ltYm9sID1cbiAgICB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgU3ltYm9sLml0ZXJhdG9yIHx8IFwiQEBpdGVyYXRvclwiO1xuXG4gIHZhciBpbk1vZHVsZSA9IHR5cGVvZiBtb2R1bGUgPT09IFwib2JqZWN0XCI7XG4gIHZhciBydW50aW1lID0gZ2xvYmFsLnJlZ2VuZXJhdG9yUnVudGltZTtcbiAgaWYgKHJ1bnRpbWUpIHtcbiAgICBpZiAoaW5Nb2R1bGUpIHtcbiAgICAgIC8vIElmIHJlZ2VuZXJhdG9yUnVudGltZSBpcyBkZWZpbmVkIGdsb2JhbGx5IGFuZCB3ZSdyZSBpbiBhIG1vZHVsZSxcbiAgICAgIC8vIG1ha2UgdGhlIGV4cG9ydHMgb2JqZWN0IGlkZW50aWNhbCB0byByZWdlbmVyYXRvclJ1bnRpbWUuXG4gICAgICBtb2R1bGUuZXhwb3J0cyA9IHJ1bnRpbWU7XG4gICAgfVxuICAgIC8vIERvbid0IGJvdGhlciBldmFsdWF0aW5nIHRoZSByZXN0IG9mIHRoaXMgZmlsZSBpZiB0aGUgcnVudGltZSB3YXNcbiAgICAvLyBhbHJlYWR5IGRlZmluZWQgZ2xvYmFsbHkuXG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gRGVmaW5lIHRoZSBydW50aW1lIGdsb2JhbGx5IChhcyBleHBlY3RlZCBieSBnZW5lcmF0ZWQgY29kZSkgYXMgZWl0aGVyXG4gIC8vIG1vZHVsZS5leHBvcnRzIChpZiB3ZSdyZSBpbiBhIG1vZHVsZSkgb3IgYSBuZXcsIGVtcHR5IG9iamVjdC5cbiAgcnVudGltZSA9IGdsb2JhbC5yZWdlbmVyYXRvclJ1bnRpbWUgPSBpbk1vZHVsZSA/IG1vZHVsZS5leHBvcnRzIDoge307XG5cbiAgZnVuY3Rpb24gd3JhcChpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCkge1xuICAgIC8vIElmIG91dGVyRm4gcHJvdmlkZWQsIHRoZW4gb3V0ZXJGbi5wcm90b3R5cGUgaW5zdGFuY2VvZiBHZW5lcmF0b3IuXG4gICAgdmFyIGdlbmVyYXRvciA9IE9iamVjdC5jcmVhdGUoKG91dGVyRm4gfHwgR2VuZXJhdG9yKS5wcm90b3R5cGUpO1xuXG4gICAgZ2VuZXJhdG9yLl9pbnZva2UgPSBtYWtlSW52b2tlTWV0aG9kKFxuICAgICAgaW5uZXJGbiwgc2VsZiB8fCBudWxsLFxuICAgICAgbmV3IENvbnRleHQodHJ5TG9jc0xpc3QgfHwgW10pXG4gICAgKTtcblxuICAgIHJldHVybiBnZW5lcmF0b3I7XG4gIH1cbiAgcnVudGltZS53cmFwID0gd3JhcDtcblxuICAvLyBUcnkvY2F0Y2ggaGVscGVyIHRvIG1pbmltaXplIGRlb3B0aW1pemF0aW9ucy4gUmV0dXJucyBhIGNvbXBsZXRpb25cbiAgLy8gcmVjb3JkIGxpa2UgY29udGV4dC50cnlFbnRyaWVzW2ldLmNvbXBsZXRpb24uIFRoaXMgaW50ZXJmYWNlIGNvdWxkXG4gIC8vIGhhdmUgYmVlbiAoYW5kIHdhcyBwcmV2aW91c2x5KSBkZXNpZ25lZCB0byB0YWtlIGEgY2xvc3VyZSB0byBiZVxuICAvLyBpbnZva2VkIHdpdGhvdXQgYXJndW1lbnRzLCBidXQgaW4gYWxsIHRoZSBjYXNlcyB3ZSBjYXJlIGFib3V0IHdlXG4gIC8vIGFscmVhZHkgaGF2ZSBhbiBleGlzdGluZyBtZXRob2Qgd2Ugd2FudCB0byBjYWxsLCBzbyB0aGVyZSdzIG5vIG5lZWRcbiAgLy8gdG8gY3JlYXRlIGEgbmV3IGZ1bmN0aW9uIG9iamVjdC4gV2UgY2FuIGV2ZW4gZ2V0IGF3YXkgd2l0aCBhc3N1bWluZ1xuICAvLyB0aGUgbWV0aG9kIHRha2VzIGV4YWN0bHkgb25lIGFyZ3VtZW50LCBzaW5jZSB0aGF0IGhhcHBlbnMgdG8gYmUgdHJ1ZVxuICAvLyBpbiBldmVyeSBjYXNlLCBzbyB3ZSBkb24ndCBoYXZlIHRvIHRvdWNoIHRoZSBhcmd1bWVudHMgb2JqZWN0LiBUaGVcbiAgLy8gb25seSBhZGRpdGlvbmFsIGFsbG9jYXRpb24gcmVxdWlyZWQgaXMgdGhlIGNvbXBsZXRpb24gcmVjb3JkLCB3aGljaFxuICAvLyBoYXMgYSBzdGFibGUgc2hhcGUgYW5kIHNvIGhvcGVmdWxseSBzaG91bGQgYmUgY2hlYXAgdG8gYWxsb2NhdGUuXG4gIGZ1bmN0aW9uIHRyeUNhdGNoKGZuLCBvYmosIGFyZykge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4geyB0eXBlOiBcIm5vcm1hbFwiLCBhcmc6IGZuLmNhbGwob2JqLCBhcmcpIH07XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICByZXR1cm4geyB0eXBlOiBcInRocm93XCIsIGFyZzogZXJyIH07XG4gICAgfVxuICB9XG5cbiAgdmFyIEdlblN0YXRlU3VzcGVuZGVkU3RhcnQgPSBcInN1c3BlbmRlZFN0YXJ0XCI7XG4gIHZhciBHZW5TdGF0ZVN1c3BlbmRlZFlpZWxkID0gXCJzdXNwZW5kZWRZaWVsZFwiO1xuICB2YXIgR2VuU3RhdGVFeGVjdXRpbmcgPSBcImV4ZWN1dGluZ1wiO1xuICB2YXIgR2VuU3RhdGVDb21wbGV0ZWQgPSBcImNvbXBsZXRlZFwiO1xuXG4gIC8vIFJldHVybmluZyB0aGlzIG9iamVjdCBmcm9tIHRoZSBpbm5lckZuIGhhcyB0aGUgc2FtZSBlZmZlY3QgYXNcbiAgLy8gYnJlYWtpbmcgb3V0IG9mIHRoZSBkaXNwYXRjaCBzd2l0Y2ggc3RhdGVtZW50LlxuICB2YXIgQ29udGludWVTZW50aW5lbCA9IHt9O1xuXG4gIC8vIER1bW15IGNvbnN0cnVjdG9yIGZ1bmN0aW9ucyB0aGF0IHdlIHVzZSBhcyB0aGUgLmNvbnN0cnVjdG9yIGFuZFxuICAvLyAuY29uc3RydWN0b3IucHJvdG90eXBlIHByb3BlcnRpZXMgZm9yIGZ1bmN0aW9ucyB0aGF0IHJldHVybiBHZW5lcmF0b3JcbiAgLy8gb2JqZWN0cy4gRm9yIGZ1bGwgc3BlYyBjb21wbGlhbmNlLCB5b3UgbWF5IHdpc2ggdG8gY29uZmlndXJlIHlvdXJcbiAgLy8gbWluaWZpZXIgbm90IHRvIG1hbmdsZSB0aGUgbmFtZXMgb2YgdGhlc2UgdHdvIGZ1bmN0aW9ucy5cbiAgZnVuY3Rpb24gR2VuZXJhdG9yKCkge31cbiAgZnVuY3Rpb24gR2VuZXJhdG9yRnVuY3Rpb24oKSB7fVxuICBmdW5jdGlvbiBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSgpIHt9XG5cbiAgdmFyIEdwID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUucHJvdG90eXBlID0gR2VuZXJhdG9yLnByb3RvdHlwZTtcbiAgR2VuZXJhdG9yRnVuY3Rpb24ucHJvdG90eXBlID0gR3AuY29uc3RydWN0b3IgPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZTtcbiAgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUuY29uc3RydWN0b3IgPSBHZW5lcmF0b3JGdW5jdGlvbjtcbiAgR2VuZXJhdG9yRnVuY3Rpb24uZGlzcGxheU5hbWUgPSBcIkdlbmVyYXRvckZ1bmN0aW9uXCI7XG5cbiAgLy8gSGVscGVyIGZvciBkZWZpbmluZyB0aGUgLm5leHQsIC50aHJvdywgYW5kIC5yZXR1cm4gbWV0aG9kcyBvZiB0aGVcbiAgLy8gSXRlcmF0b3IgaW50ZXJmYWNlIGluIHRlcm1zIG9mIGEgc2luZ2xlIC5faW52b2tlIG1ldGhvZC5cbiAgZnVuY3Rpb24gZGVmaW5lSXRlcmF0b3JNZXRob2RzKHByb3RvdHlwZSkge1xuICAgIFtcIm5leHRcIiwgXCJ0aHJvd1wiLCBcInJldHVyblwiXS5mb3JFYWNoKGZ1bmN0aW9uKG1ldGhvZCkge1xuICAgICAgcHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbihhcmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ludm9rZShtZXRob2QsIGFyZyk7XG4gICAgICB9O1xuICAgIH0pO1xuICB9XG5cbiAgcnVudGltZS5pc0dlbmVyYXRvckZ1bmN0aW9uID0gZnVuY3Rpb24oZ2VuRnVuKSB7XG4gICAgdmFyIGN0b3IgPSB0eXBlb2YgZ2VuRnVuID09PSBcImZ1bmN0aW9uXCIgJiYgZ2VuRnVuLmNvbnN0cnVjdG9yO1xuICAgIHJldHVybiBjdG9yXG4gICAgICA/IGN0b3IgPT09IEdlbmVyYXRvckZ1bmN0aW9uIHx8XG4gICAgICAgIC8vIEZvciB0aGUgbmF0aXZlIEdlbmVyYXRvckZ1bmN0aW9uIGNvbnN0cnVjdG9yLCB0aGUgYmVzdCB3ZSBjYW5cbiAgICAgICAgLy8gZG8gaXMgdG8gY2hlY2sgaXRzIC5uYW1lIHByb3BlcnR5LlxuICAgICAgICAoY3Rvci5kaXNwbGF5TmFtZSB8fCBjdG9yLm5hbWUpID09PSBcIkdlbmVyYXRvckZ1bmN0aW9uXCJcbiAgICAgIDogZmFsc2U7XG4gIH07XG5cbiAgcnVudGltZS5tYXJrID0gZnVuY3Rpb24oZ2VuRnVuKSB7XG4gICAgZ2VuRnVuLl9fcHJvdG9fXyA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlO1xuICAgIGdlbkZ1bi5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEdwKTtcbiAgICByZXR1cm4gZ2VuRnVuO1xuICB9O1xuXG4gIC8vIFdpdGhpbiB0aGUgYm9keSBvZiBhbnkgYXN5bmMgZnVuY3Rpb24sIGBhd2FpdCB4YCBpcyB0cmFuc2Zvcm1lZCB0b1xuICAvLyBgeWllbGQgcmVnZW5lcmF0b3JSdW50aW1lLmF3cmFwKHgpYCwgc28gdGhhdCB0aGUgcnVudGltZSBjYW4gdGVzdFxuICAvLyBgdmFsdWUgaW5zdGFuY2VvZiBBd2FpdEFyZ3VtZW50YCB0byBkZXRlcm1pbmUgaWYgdGhlIHlpZWxkZWQgdmFsdWUgaXNcbiAgLy8gbWVhbnQgdG8gYmUgYXdhaXRlZC4gU29tZSBtYXkgY29uc2lkZXIgdGhlIG5hbWUgb2YgdGhpcyBtZXRob2QgdG9vXG4gIC8vIGN1dGVzeSwgYnV0IHRoZXkgYXJlIGN1cm11ZGdlb25zLlxuICBydW50aW1lLmF3cmFwID0gZnVuY3Rpb24oYXJnKSB7XG4gICAgcmV0dXJuIG5ldyBBd2FpdEFyZ3VtZW50KGFyZyk7XG4gIH07XG5cbiAgZnVuY3Rpb24gQXdhaXRBcmd1bWVudChhcmcpIHtcbiAgICB0aGlzLmFyZyA9IGFyZztcbiAgfVxuXG4gIGZ1bmN0aW9uIEFzeW5jSXRlcmF0b3IoZ2VuZXJhdG9yKSB7XG4gICAgLy8gVGhpcyBpbnZva2UgZnVuY3Rpb24gaXMgd3JpdHRlbiBpbiBhIHN0eWxlIHRoYXQgYXNzdW1lcyBzb21lXG4gICAgLy8gY2FsbGluZyBmdW5jdGlvbiAob3IgUHJvbWlzZSkgd2lsbCBoYW5kbGUgZXhjZXB0aW9ucy5cbiAgICBmdW5jdGlvbiBpbnZva2UobWV0aG9kLCBhcmcpIHtcbiAgICAgIHZhciByZXN1bHQgPSBnZW5lcmF0b3JbbWV0aG9kXShhcmcpO1xuICAgICAgdmFyIHZhbHVlID0gcmVzdWx0LnZhbHVlO1xuICAgICAgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgQXdhaXRBcmd1bWVudFxuICAgICAgICA/IFByb21pc2UucmVzb2x2ZSh2YWx1ZS5hcmcpLnRoZW4oaW52b2tlTmV4dCwgaW52b2tlVGhyb3cpXG4gICAgICAgIDogUHJvbWlzZS5yZXNvbHZlKHZhbHVlKS50aGVuKGZ1bmN0aW9uKHVud3JhcHBlZCkge1xuICAgICAgICAgICAgLy8gV2hlbiBhIHlpZWxkZWQgUHJvbWlzZSBpcyByZXNvbHZlZCwgaXRzIGZpbmFsIHZhbHVlIGJlY29tZXNcbiAgICAgICAgICAgIC8vIHRoZSAudmFsdWUgb2YgdGhlIFByb21pc2U8e3ZhbHVlLGRvbmV9PiByZXN1bHQgZm9yIHRoZVxuICAgICAgICAgICAgLy8gY3VycmVudCBpdGVyYXRpb24uIElmIHRoZSBQcm9taXNlIGlzIHJlamVjdGVkLCBob3dldmVyLCB0aGVcbiAgICAgICAgICAgIC8vIHJlc3VsdCBmb3IgdGhpcyBpdGVyYXRpb24gd2lsbCBiZSByZWplY3RlZCB3aXRoIHRoZSBzYW1lXG4gICAgICAgICAgICAvLyByZWFzb24uIE5vdGUgdGhhdCByZWplY3Rpb25zIG9mIHlpZWxkZWQgUHJvbWlzZXMgYXJlIG5vdFxuICAgICAgICAgICAgLy8gdGhyb3duIGJhY2sgaW50byB0aGUgZ2VuZXJhdG9yIGZ1bmN0aW9uLCBhcyBpcyB0aGUgY2FzZVxuICAgICAgICAgICAgLy8gd2hlbiBhbiBhd2FpdGVkIFByb21pc2UgaXMgcmVqZWN0ZWQuIFRoaXMgZGlmZmVyZW5jZSBpblxuICAgICAgICAgICAgLy8gYmVoYXZpb3IgYmV0d2VlbiB5aWVsZCBhbmQgYXdhaXQgaXMgaW1wb3J0YW50LCBiZWNhdXNlIGl0XG4gICAgICAgICAgICAvLyBhbGxvd3MgdGhlIGNvbnN1bWVyIHRvIGRlY2lkZSB3aGF0IHRvIGRvIHdpdGggdGhlIHlpZWxkZWRcbiAgICAgICAgICAgIC8vIHJlamVjdGlvbiAoc3dhbGxvdyBpdCBhbmQgY29udGludWUsIG1hbnVhbGx5IC50aHJvdyBpdCBiYWNrXG4gICAgICAgICAgICAvLyBpbnRvIHRoZSBnZW5lcmF0b3IsIGFiYW5kb24gaXRlcmF0aW9uLCB3aGF0ZXZlcikuIFdpdGhcbiAgICAgICAgICAgIC8vIGF3YWl0LCBieSBjb250cmFzdCwgdGhlcmUgaXMgbm8gb3Bwb3J0dW5pdHkgdG8gZXhhbWluZSB0aGVcbiAgICAgICAgICAgIC8vIHJlamVjdGlvbiByZWFzb24gb3V0c2lkZSB0aGUgZ2VuZXJhdG9yIGZ1bmN0aW9uLCBzbyB0aGVcbiAgICAgICAgICAgIC8vIG9ubHkgb3B0aW9uIGlzIHRvIHRocm93IGl0IGZyb20gdGhlIGF3YWl0IGV4cHJlc3Npb24sIGFuZFxuICAgICAgICAgICAgLy8gbGV0IHRoZSBnZW5lcmF0b3IgZnVuY3Rpb24gaGFuZGxlIHRoZSBleGNlcHRpb24uXG4gICAgICAgICAgICByZXN1bHQudmFsdWUgPSB1bndyYXBwZWQ7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgcHJvY2VzcyA9PT0gXCJvYmplY3RcIiAmJiBwcm9jZXNzLmRvbWFpbikge1xuICAgICAgaW52b2tlID0gcHJvY2Vzcy5kb21haW4uYmluZChpbnZva2UpO1xuICAgIH1cblxuICAgIHZhciBpbnZva2VOZXh0ID0gaW52b2tlLmJpbmQoZ2VuZXJhdG9yLCBcIm5leHRcIik7XG4gICAgdmFyIGludm9rZVRocm93ID0gaW52b2tlLmJpbmQoZ2VuZXJhdG9yLCBcInRocm93XCIpO1xuICAgIHZhciBpbnZva2VSZXR1cm4gPSBpbnZva2UuYmluZChnZW5lcmF0b3IsIFwicmV0dXJuXCIpO1xuICAgIHZhciBwcmV2aW91c1Byb21pc2U7XG5cbiAgICBmdW5jdGlvbiBlbnF1ZXVlKG1ldGhvZCwgYXJnKSB7XG4gICAgICB2YXIgZW5xdWV1ZVJlc3VsdCA9XG4gICAgICAgIC8vIElmIGVucXVldWUgaGFzIGJlZW4gY2FsbGVkIGJlZm9yZSwgdGhlbiB3ZSB3YW50IHRvIHdhaXQgdW50aWxcbiAgICAgICAgLy8gYWxsIHByZXZpb3VzIFByb21pc2VzIGhhdmUgYmVlbiByZXNvbHZlZCBiZWZvcmUgY2FsbGluZyBpbnZva2UsXG4gICAgICAgIC8vIHNvIHRoYXQgcmVzdWx0cyBhcmUgYWx3YXlzIGRlbGl2ZXJlZCBpbiB0aGUgY29ycmVjdCBvcmRlci4gSWZcbiAgICAgICAgLy8gZW5xdWV1ZSBoYXMgbm90IGJlZW4gY2FsbGVkIGJlZm9yZSwgdGhlbiBpdCBpcyBpbXBvcnRhbnQgdG9cbiAgICAgICAgLy8gY2FsbCBpbnZva2UgaW1tZWRpYXRlbHksIHdpdGhvdXQgd2FpdGluZyBvbiBhIGNhbGxiYWNrIHRvIGZpcmUsXG4gICAgICAgIC8vIHNvIHRoYXQgdGhlIGFzeW5jIGdlbmVyYXRvciBmdW5jdGlvbiBoYXMgdGhlIG9wcG9ydHVuaXR5IHRvIGRvXG4gICAgICAgIC8vIGFueSBuZWNlc3Nhcnkgc2V0dXAgaW4gYSBwcmVkaWN0YWJsZSB3YXkuIFRoaXMgcHJlZGljdGFiaWxpdHlcbiAgICAgICAgLy8gaXMgd2h5IHRoZSBQcm9taXNlIGNvbnN0cnVjdG9yIHN5bmNocm9ub3VzbHkgaW52b2tlcyBpdHNcbiAgICAgICAgLy8gZXhlY3V0b3IgY2FsbGJhY2ssIGFuZCB3aHkgYXN5bmMgZnVuY3Rpb25zIHN5bmNocm9ub3VzbHlcbiAgICAgICAgLy8gZXhlY3V0ZSBjb2RlIGJlZm9yZSB0aGUgZmlyc3QgYXdhaXQuIFNpbmNlIHdlIGltcGxlbWVudCBzaW1wbGVcbiAgICAgICAgLy8gYXN5bmMgZnVuY3Rpb25zIGluIHRlcm1zIG9mIGFzeW5jIGdlbmVyYXRvcnMsIGl0IGlzIGVzcGVjaWFsbHlcbiAgICAgICAgLy8gaW1wb3J0YW50IHRvIGdldCB0aGlzIHJpZ2h0LCBldmVuIHRob3VnaCBpdCByZXF1aXJlcyBjYXJlLlxuICAgICAgICBwcmV2aW91c1Byb21pc2UgPyBwcmV2aW91c1Byb21pc2UudGhlbihmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gaW52b2tlKG1ldGhvZCwgYXJnKTtcbiAgICAgICAgfSkgOiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlKSB7XG4gICAgICAgICAgcmVzb2x2ZShpbnZva2UobWV0aG9kLCBhcmcpKTtcbiAgICAgICAgfSk7XG5cbiAgICAgIC8vIEF2b2lkIHByb3BhZ2F0aW5nIGVucXVldWVSZXN1bHQgZmFpbHVyZXMgdG8gUHJvbWlzZXMgcmV0dXJuZWQgYnlcbiAgICAgIC8vIGxhdGVyIGludm9jYXRpb25zIG9mIHRoZSBpdGVyYXRvci5cbiAgICAgIHByZXZpb3VzUHJvbWlzZSA9IGVucXVldWVSZXN1bHRbXCJjYXRjaFwiXShmdW5jdGlvbihpZ25vcmVkKXt9KTtcblxuICAgICAgcmV0dXJuIGVucXVldWVSZXN1bHQ7XG4gICAgfVxuXG4gICAgLy8gRGVmaW5lIHRoZSB1bmlmaWVkIGhlbHBlciBtZXRob2QgdGhhdCBpcyB1c2VkIHRvIGltcGxlbWVudCAubmV4dCxcbiAgICAvLyAudGhyb3csIGFuZCAucmV0dXJuIChzZWUgZGVmaW5lSXRlcmF0b3JNZXRob2RzKS5cbiAgICB0aGlzLl9pbnZva2UgPSBlbnF1ZXVlO1xuICB9XG5cbiAgZGVmaW5lSXRlcmF0b3JNZXRob2RzKEFzeW5jSXRlcmF0b3IucHJvdG90eXBlKTtcblxuICAvLyBOb3RlIHRoYXQgc2ltcGxlIGFzeW5jIGZ1bmN0aW9ucyBhcmUgaW1wbGVtZW50ZWQgb24gdG9wIG9mXG4gIC8vIEFzeW5jSXRlcmF0b3Igb2JqZWN0czsgdGhleSBqdXN0IHJldHVybiBhIFByb21pc2UgZm9yIHRoZSB2YWx1ZSBvZlxuICAvLyB0aGUgZmluYWwgcmVzdWx0IHByb2R1Y2VkIGJ5IHRoZSBpdGVyYXRvci5cbiAgcnVudGltZS5hc3luYyA9IGZ1bmN0aW9uKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0KSB7XG4gICAgdmFyIGl0ZXIgPSBuZXcgQXN5bmNJdGVyYXRvcihcbiAgICAgIHdyYXAoaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QpXG4gICAgKTtcblxuICAgIHJldHVybiBydW50aW1lLmlzR2VuZXJhdG9yRnVuY3Rpb24ob3V0ZXJGbilcbiAgICAgID8gaXRlciAvLyBJZiBvdXRlckZuIGlzIGEgZ2VuZXJhdG9yLCByZXR1cm4gdGhlIGZ1bGwgaXRlcmF0b3IuXG4gICAgICA6IGl0ZXIubmV4dCgpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgcmV0dXJuIHJlc3VsdC5kb25lID8gcmVzdWx0LnZhbHVlIDogaXRlci5uZXh0KCk7XG4gICAgICAgIH0pO1xuICB9O1xuXG4gIGZ1bmN0aW9uIG1ha2VJbnZva2VNZXRob2QoaW5uZXJGbiwgc2VsZiwgY29udGV4dCkge1xuICAgIHZhciBzdGF0ZSA9IEdlblN0YXRlU3VzcGVuZGVkU3RhcnQ7XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gaW52b2tlKG1ldGhvZCwgYXJnKSB7XG4gICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlRXhlY3V0aW5nKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IHJ1bm5pbmdcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVDb21wbGV0ZWQpIHtcbiAgICAgICAgaWYgKG1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgdGhyb3cgYXJnO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQmUgZm9yZ2l2aW5nLCBwZXIgMjUuMy4zLjMuMyBvZiB0aGUgc3BlYzpcbiAgICAgICAgLy8gaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLWdlbmVyYXRvcnJlc3VtZVxuICAgICAgICByZXR1cm4gZG9uZVJlc3VsdCgpO1xuICAgICAgfVxuXG4gICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICB2YXIgZGVsZWdhdGUgPSBjb250ZXh0LmRlbGVnYXRlO1xuICAgICAgICBpZiAoZGVsZWdhdGUpIHtcbiAgICAgICAgICBpZiAobWV0aG9kID09PSBcInJldHVyblwiIHx8XG4gICAgICAgICAgICAgIChtZXRob2QgPT09IFwidGhyb3dcIiAmJiBkZWxlZ2F0ZS5pdGVyYXRvclttZXRob2RdID09PSB1bmRlZmluZWQpKSB7XG4gICAgICAgICAgICAvLyBBIHJldHVybiBvciB0aHJvdyAod2hlbiB0aGUgZGVsZWdhdGUgaXRlcmF0b3IgaGFzIG5vIHRocm93XG4gICAgICAgICAgICAvLyBtZXRob2QpIGFsd2F5cyB0ZXJtaW5hdGVzIHRoZSB5aWVsZCogbG9vcC5cbiAgICAgICAgICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuXG4gICAgICAgICAgICAvLyBJZiB0aGUgZGVsZWdhdGUgaXRlcmF0b3IgaGFzIGEgcmV0dXJuIG1ldGhvZCwgZ2l2ZSBpdCBhXG4gICAgICAgICAgICAvLyBjaGFuY2UgdG8gY2xlYW4gdXAuXG4gICAgICAgICAgICB2YXIgcmV0dXJuTWV0aG9kID0gZGVsZWdhdGUuaXRlcmF0b3JbXCJyZXR1cm5cIl07XG4gICAgICAgICAgICBpZiAocmV0dXJuTWV0aG9kKSB7XG4gICAgICAgICAgICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChyZXR1cm5NZXRob2QsIGRlbGVnYXRlLml0ZXJhdG9yLCBhcmcpO1xuICAgICAgICAgICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgICAgICAgIC8vIElmIHRoZSByZXR1cm4gbWV0aG9kIHRocmV3IGFuIGV4Y2VwdGlvbiwgbGV0IHRoYXRcbiAgICAgICAgICAgICAgICAvLyBleGNlcHRpb24gcHJldmFpbCBvdmVyIHRoZSBvcmlnaW5hbCByZXR1cm4gb3IgdGhyb3cuXG4gICAgICAgICAgICAgICAgbWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgICAgICAgICAgIGFyZyA9IHJlY29yZC5hcmc7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG1ldGhvZCA9PT0gXCJyZXR1cm5cIikge1xuICAgICAgICAgICAgICAvLyBDb250aW51ZSB3aXRoIHRoZSBvdXRlciByZXR1cm4sIG5vdyB0aGF0IHRoZSBkZWxlZ2F0ZVxuICAgICAgICAgICAgICAvLyBpdGVyYXRvciBoYXMgYmVlbiB0ZXJtaW5hdGVkLlxuICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2goXG4gICAgICAgICAgICBkZWxlZ2F0ZS5pdGVyYXRvclttZXRob2RdLFxuICAgICAgICAgICAgZGVsZWdhdGUuaXRlcmF0b3IsXG4gICAgICAgICAgICBhcmdcbiAgICAgICAgICApO1xuXG4gICAgICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuXG4gICAgICAgICAgICAvLyBMaWtlIHJldHVybmluZyBnZW5lcmF0b3IudGhyb3codW5jYXVnaHQpLCBidXQgd2l0aG91dCB0aGVcbiAgICAgICAgICAgIC8vIG92ZXJoZWFkIG9mIGFuIGV4dHJhIGZ1bmN0aW9uIGNhbGwuXG4gICAgICAgICAgICBtZXRob2QgPSBcInRocm93XCI7XG4gICAgICAgICAgICBhcmcgPSByZWNvcmQuYXJnO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gRGVsZWdhdGUgZ2VuZXJhdG9yIHJhbiBhbmQgaGFuZGxlZCBpdHMgb3duIGV4Y2VwdGlvbnMgc29cbiAgICAgICAgICAvLyByZWdhcmRsZXNzIG9mIHdoYXQgdGhlIG1ldGhvZCB3YXMsIHdlIGNvbnRpbnVlIGFzIGlmIGl0IGlzXG4gICAgICAgICAgLy8gXCJuZXh0XCIgd2l0aCBhbiB1bmRlZmluZWQgYXJnLlxuICAgICAgICAgIG1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgICAgIGFyZyA9IHVuZGVmaW5lZDtcblxuICAgICAgICAgIHZhciBpbmZvID0gcmVjb3JkLmFyZztcbiAgICAgICAgICBpZiAoaW5mby5kb25lKSB7XG4gICAgICAgICAgICBjb250ZXh0W2RlbGVnYXRlLnJlc3VsdE5hbWVdID0gaW5mby52YWx1ZTtcbiAgICAgICAgICAgIGNvbnRleHQubmV4dCA9IGRlbGVnYXRlLm5leHRMb2M7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN0YXRlID0gR2VuU3RhdGVTdXNwZW5kZWRZaWVsZDtcbiAgICAgICAgICAgIHJldHVybiBpbmZvO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG1ldGhvZCA9PT0gXCJuZXh0XCIpIHtcbiAgICAgICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlU3VzcGVuZGVkWWllbGQpIHtcbiAgICAgICAgICAgIGNvbnRleHQuc2VudCA9IGFyZztcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29udGV4dC5zZW50ID0gdW5kZWZpbmVkO1xuICAgICAgICAgIH1cblxuICAgICAgICB9IGVsc2UgaWYgKG1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0KSB7XG4gICAgICAgICAgICBzdGF0ZSA9IEdlblN0YXRlQ29tcGxldGVkO1xuICAgICAgICAgICAgdGhyb3cgYXJnO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChjb250ZXh0LmRpc3BhdGNoRXhjZXB0aW9uKGFyZykpIHtcbiAgICAgICAgICAgIC8vIElmIHRoZSBkaXNwYXRjaGVkIGV4Y2VwdGlvbiB3YXMgY2F1Z2h0IGJ5IGEgY2F0Y2ggYmxvY2ssXG4gICAgICAgICAgICAvLyB0aGVuIGxldCB0aGF0IGNhdGNoIGJsb2NrIGhhbmRsZSB0aGUgZXhjZXB0aW9uIG5vcm1hbGx5LlxuICAgICAgICAgICAgbWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICAgICAgICBhcmcgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgfVxuXG4gICAgICAgIH0gZWxzZSBpZiAobWV0aG9kID09PSBcInJldHVyblwiKSB7XG4gICAgICAgICAgY29udGV4dC5hYnJ1cHQoXCJyZXR1cm5cIiwgYXJnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN0YXRlID0gR2VuU3RhdGVFeGVjdXRpbmc7XG5cbiAgICAgICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpO1xuICAgICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwibm9ybWFsXCIpIHtcbiAgICAgICAgICAvLyBJZiBhbiBleGNlcHRpb24gaXMgdGhyb3duIGZyb20gaW5uZXJGbiwgd2UgbGVhdmUgc3RhdGUgPT09XG4gICAgICAgICAgLy8gR2VuU3RhdGVFeGVjdXRpbmcgYW5kIGxvb3AgYmFjayBmb3IgYW5vdGhlciBpbnZvY2F0aW9uLlxuICAgICAgICAgIHN0YXRlID0gY29udGV4dC5kb25lXG4gICAgICAgICAgICA/IEdlblN0YXRlQ29tcGxldGVkXG4gICAgICAgICAgICA6IEdlblN0YXRlU3VzcGVuZGVkWWllbGQ7XG5cbiAgICAgICAgICB2YXIgaW5mbyA9IHtcbiAgICAgICAgICAgIHZhbHVlOiByZWNvcmQuYXJnLFxuICAgICAgICAgICAgZG9uZTogY29udGV4dC5kb25lXG4gICAgICAgICAgfTtcblxuICAgICAgICAgIGlmIChyZWNvcmQuYXJnID09PSBDb250aW51ZVNlbnRpbmVsKSB7XG4gICAgICAgICAgICBpZiAoY29udGV4dC5kZWxlZ2F0ZSAmJiBtZXRob2QgPT09IFwibmV4dFwiKSB7XG4gICAgICAgICAgICAgIC8vIERlbGliZXJhdGVseSBmb3JnZXQgdGhlIGxhc3Qgc2VudCB2YWx1ZSBzbyB0aGF0IHdlIGRvbid0XG4gICAgICAgICAgICAgIC8vIGFjY2lkZW50YWxseSBwYXNzIGl0IG9uIHRvIHRoZSBkZWxlZ2F0ZS5cbiAgICAgICAgICAgICAgYXJnID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gaW5mbztcbiAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgc3RhdGUgPSBHZW5TdGF0ZUNvbXBsZXRlZDtcbiAgICAgICAgICAvLyBEaXNwYXRjaCB0aGUgZXhjZXB0aW9uIGJ5IGxvb3BpbmcgYmFjayBhcm91bmQgdG8gdGhlXG4gICAgICAgICAgLy8gY29udGV4dC5kaXNwYXRjaEV4Y2VwdGlvbihhcmcpIGNhbGwgYWJvdmUuXG4gICAgICAgICAgbWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgICAgIGFyZyA9IHJlY29yZC5hcmc7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgLy8gRGVmaW5lIEdlbmVyYXRvci5wcm90b3R5cGUue25leHQsdGhyb3cscmV0dXJufSBpbiB0ZXJtcyBvZiB0aGVcbiAgLy8gdW5pZmllZCAuX2ludm9rZSBoZWxwZXIgbWV0aG9kLlxuICBkZWZpbmVJdGVyYXRvck1ldGhvZHMoR3ApO1xuXG4gIEdwW2l0ZXJhdG9yU3ltYm9sXSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIEdwLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIFwiW29iamVjdCBHZW5lcmF0b3JdXCI7XG4gIH07XG5cbiAgZnVuY3Rpb24gcHVzaFRyeUVudHJ5KGxvY3MpIHtcbiAgICB2YXIgZW50cnkgPSB7IHRyeUxvYzogbG9jc1swXSB9O1xuXG4gICAgaWYgKDEgaW4gbG9jcykge1xuICAgICAgZW50cnkuY2F0Y2hMb2MgPSBsb2NzWzFdO1xuICAgIH1cblxuICAgIGlmICgyIGluIGxvY3MpIHtcbiAgICAgIGVudHJ5LmZpbmFsbHlMb2MgPSBsb2NzWzJdO1xuICAgICAgZW50cnkuYWZ0ZXJMb2MgPSBsb2NzWzNdO1xuICAgIH1cblxuICAgIHRoaXMudHJ5RW50cmllcy5wdXNoKGVudHJ5KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlc2V0VHJ5RW50cnkoZW50cnkpIHtcbiAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbiB8fCB7fTtcbiAgICByZWNvcmQudHlwZSA9IFwibm9ybWFsXCI7XG4gICAgZGVsZXRlIHJlY29yZC5hcmc7XG4gICAgZW50cnkuY29tcGxldGlvbiA9IHJlY29yZDtcbiAgfVxuXG4gIGZ1bmN0aW9uIENvbnRleHQodHJ5TG9jc0xpc3QpIHtcbiAgICAvLyBUaGUgcm9vdCBlbnRyeSBvYmplY3QgKGVmZmVjdGl2ZWx5IGEgdHJ5IHN0YXRlbWVudCB3aXRob3V0IGEgY2F0Y2hcbiAgICAvLyBvciBhIGZpbmFsbHkgYmxvY2spIGdpdmVzIHVzIGEgcGxhY2UgdG8gc3RvcmUgdmFsdWVzIHRocm93biBmcm9tXG4gICAgLy8gbG9jYXRpb25zIHdoZXJlIHRoZXJlIGlzIG5vIGVuY2xvc2luZyB0cnkgc3RhdGVtZW50LlxuICAgIHRoaXMudHJ5RW50cmllcyA9IFt7IHRyeUxvYzogXCJyb290XCIgfV07XG4gICAgdHJ5TG9jc0xpc3QuZm9yRWFjaChwdXNoVHJ5RW50cnksIHRoaXMpO1xuICAgIHRoaXMucmVzZXQodHJ1ZSk7XG4gIH1cblxuICBydW50aW1lLmtleXMgPSBmdW5jdGlvbihvYmplY3QpIHtcbiAgICB2YXIga2V5cyA9IFtdO1xuICAgIGZvciAodmFyIGtleSBpbiBvYmplY3QpIHtcbiAgICAgIGtleXMucHVzaChrZXkpO1xuICAgIH1cbiAgICBrZXlzLnJldmVyc2UoKTtcblxuICAgIC8vIFJhdGhlciB0aGFuIHJldHVybmluZyBhbiBvYmplY3Qgd2l0aCBhIG5leHQgbWV0aG9kLCB3ZSBrZWVwXG4gICAgLy8gdGhpbmdzIHNpbXBsZSBhbmQgcmV0dXJuIHRoZSBuZXh0IGZ1bmN0aW9uIGl0c2VsZi5cbiAgICByZXR1cm4gZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgIHdoaWxlIChrZXlzLmxlbmd0aCkge1xuICAgICAgICB2YXIga2V5ID0ga2V5cy5wb3AoKTtcbiAgICAgICAgaWYgKGtleSBpbiBvYmplY3QpIHtcbiAgICAgICAgICBuZXh0LnZhbHVlID0ga2V5O1xuICAgICAgICAgIG5leHQuZG9uZSA9IGZhbHNlO1xuICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFRvIGF2b2lkIGNyZWF0aW5nIGFuIGFkZGl0aW9uYWwgb2JqZWN0LCB3ZSBqdXN0IGhhbmcgdGhlIC52YWx1ZVxuICAgICAgLy8gYW5kIC5kb25lIHByb3BlcnRpZXMgb2ZmIHRoZSBuZXh0IGZ1bmN0aW9uIG9iamVjdCBpdHNlbGYuIFRoaXNcbiAgICAgIC8vIGFsc28gZW5zdXJlcyB0aGF0IHRoZSBtaW5pZmllciB3aWxsIG5vdCBhbm9ueW1pemUgdGhlIGZ1bmN0aW9uLlxuICAgICAgbmV4dC5kb25lID0gdHJ1ZTtcbiAgICAgIHJldHVybiBuZXh0O1xuICAgIH07XG4gIH07XG5cbiAgZnVuY3Rpb24gdmFsdWVzKGl0ZXJhYmxlKSB7XG4gICAgaWYgKGl0ZXJhYmxlKSB7XG4gICAgICB2YXIgaXRlcmF0b3JNZXRob2QgPSBpdGVyYWJsZVtpdGVyYXRvclN5bWJvbF07XG4gICAgICBpZiAoaXRlcmF0b3JNZXRob2QpIHtcbiAgICAgICAgcmV0dXJuIGl0ZXJhdG9yTWV0aG9kLmNhbGwoaXRlcmFibGUpO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIGl0ZXJhYmxlLm5leHQgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICByZXR1cm4gaXRlcmFibGU7XG4gICAgICB9XG5cbiAgICAgIGlmICghaXNOYU4oaXRlcmFibGUubGVuZ3RoKSkge1xuICAgICAgICB2YXIgaSA9IC0xLCBuZXh0ID0gZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgICAgICB3aGlsZSAoKytpIDwgaXRlcmFibGUubGVuZ3RoKSB7XG4gICAgICAgICAgICBpZiAoaGFzT3duLmNhbGwoaXRlcmFibGUsIGkpKSB7XG4gICAgICAgICAgICAgIG5leHQudmFsdWUgPSBpdGVyYWJsZVtpXTtcbiAgICAgICAgICAgICAgbmV4dC5kb25lID0gZmFsc2U7XG4gICAgICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIG5leHQudmFsdWUgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgbmV4dC5kb25lID0gdHJ1ZTtcblxuICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBuZXh0Lm5leHQgPSBuZXh0O1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFJldHVybiBhbiBpdGVyYXRvciB3aXRoIG5vIHZhbHVlcy5cbiAgICByZXR1cm4geyBuZXh0OiBkb25lUmVzdWx0IH07XG4gIH1cbiAgcnVudGltZS52YWx1ZXMgPSB2YWx1ZXM7XG5cbiAgZnVuY3Rpb24gZG9uZVJlc3VsdCgpIHtcbiAgICByZXR1cm4geyB2YWx1ZTogdW5kZWZpbmVkLCBkb25lOiB0cnVlIH07XG4gIH1cblxuICBDb250ZXh0LnByb3RvdHlwZSA9IHtcbiAgICBjb25zdHJ1Y3RvcjogQ29udGV4dCxcblxuICAgIHJlc2V0OiBmdW5jdGlvbihza2lwVGVtcFJlc2V0KSB7XG4gICAgICB0aGlzLnByZXYgPSAwO1xuICAgICAgdGhpcy5uZXh0ID0gMDtcbiAgICAgIHRoaXMuc2VudCA9IHVuZGVmaW5lZDtcbiAgICAgIHRoaXMuZG9uZSA9IGZhbHNlO1xuICAgICAgdGhpcy5kZWxlZ2F0ZSA9IG51bGw7XG5cbiAgICAgIHRoaXMudHJ5RW50cmllcy5mb3JFYWNoKHJlc2V0VHJ5RW50cnkpO1xuXG4gICAgICBpZiAoIXNraXBUZW1wUmVzZXQpIHtcbiAgICAgICAgZm9yICh2YXIgbmFtZSBpbiB0aGlzKSB7XG4gICAgICAgICAgLy8gTm90IHN1cmUgYWJvdXQgdGhlIG9wdGltYWwgb3JkZXIgb2YgdGhlc2UgY29uZGl0aW9uczpcbiAgICAgICAgICBpZiAobmFtZS5jaGFyQXQoMCkgPT09IFwidFwiICYmXG4gICAgICAgICAgICAgIGhhc093bi5jYWxsKHRoaXMsIG5hbWUpICYmXG4gICAgICAgICAgICAgICFpc05hTigrbmFtZS5zbGljZSgxKSkpIHtcbiAgICAgICAgICAgIHRoaXNbbmFtZV0gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIHN0b3A6IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5kb25lID0gdHJ1ZTtcblxuICAgICAgdmFyIHJvb3RFbnRyeSA9IHRoaXMudHJ5RW50cmllc1swXTtcbiAgICAgIHZhciByb290UmVjb3JkID0gcm9vdEVudHJ5LmNvbXBsZXRpb247XG4gICAgICBpZiAocm9vdFJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgdGhyb3cgcm9vdFJlY29yZC5hcmc7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLnJ2YWw7XG4gICAgfSxcblxuICAgIGRpc3BhdGNoRXhjZXB0aW9uOiBmdW5jdGlvbihleGNlcHRpb24pIHtcbiAgICAgIGlmICh0aGlzLmRvbmUpIHtcbiAgICAgICAgdGhyb3cgZXhjZXB0aW9uO1xuICAgICAgfVxuXG4gICAgICB2YXIgY29udGV4dCA9IHRoaXM7XG4gICAgICBmdW5jdGlvbiBoYW5kbGUobG9jLCBjYXVnaHQpIHtcbiAgICAgICAgcmVjb3JkLnR5cGUgPSBcInRocm93XCI7XG4gICAgICAgIHJlY29yZC5hcmcgPSBleGNlcHRpb247XG4gICAgICAgIGNvbnRleHQubmV4dCA9IGxvYztcbiAgICAgICAgcmV0dXJuICEhY2F1Z2h0O1xuICAgICAgfVxuXG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgdmFyIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb247XG5cbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA9PT0gXCJyb290XCIpIHtcbiAgICAgICAgICAvLyBFeGNlcHRpb24gdGhyb3duIG91dHNpZGUgb2YgYW55IHRyeSBibG9jayB0aGF0IGNvdWxkIGhhbmRsZVxuICAgICAgICAgIC8vIGl0LCBzbyBzZXQgdGhlIGNvbXBsZXRpb24gdmFsdWUgb2YgdGhlIGVudGlyZSBmdW5jdGlvbiB0b1xuICAgICAgICAgIC8vIHRocm93IHRoZSBleGNlcHRpb24uXG4gICAgICAgICAgcmV0dXJuIGhhbmRsZShcImVuZFwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPD0gdGhpcy5wcmV2KSB7XG4gICAgICAgICAgdmFyIGhhc0NhdGNoID0gaGFzT3duLmNhbGwoZW50cnksIFwiY2F0Y2hMb2NcIik7XG4gICAgICAgICAgdmFyIGhhc0ZpbmFsbHkgPSBoYXNPd24uY2FsbChlbnRyeSwgXCJmaW5hbGx5TG9jXCIpO1xuXG4gICAgICAgICAgaWYgKGhhc0NhdGNoICYmIGhhc0ZpbmFsbHkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5jYXRjaExvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmNhdGNoTG9jLCB0cnVlKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmZpbmFsbHlMb2MpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfSBlbHNlIGlmIChoYXNDYXRjaCkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmNhdGNoTG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuY2F0Y2hMb2MsIHRydWUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfSBlbHNlIGlmIChoYXNGaW5hbGx5KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmZpbmFsbHlMb2MpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInRyeSBzdGF0ZW1lbnQgd2l0aG91dCBjYXRjaCBvciBmaW5hbGx5XCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBhYnJ1cHQ6IGZ1bmN0aW9uKHR5cGUsIGFyZykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPD0gdGhpcy5wcmV2ICYmXG4gICAgICAgICAgICBoYXNPd24uY2FsbChlbnRyeSwgXCJmaW5hbGx5TG9jXCIpICYmXG4gICAgICAgICAgICB0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgdmFyIGZpbmFsbHlFbnRyeSA9IGVudHJ5O1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChmaW5hbGx5RW50cnkgJiZcbiAgICAgICAgICAodHlwZSA9PT0gXCJicmVha1wiIHx8XG4gICAgICAgICAgIHR5cGUgPT09IFwiY29udGludWVcIikgJiZcbiAgICAgICAgICBmaW5hbGx5RW50cnkudHJ5TG9jIDw9IGFyZyAmJlxuICAgICAgICAgIGFyZyA8PSBmaW5hbGx5RW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAvLyBJZ25vcmUgdGhlIGZpbmFsbHkgZW50cnkgaWYgY29udHJvbCBpcyBub3QganVtcGluZyB0byBhXG4gICAgICAgIC8vIGxvY2F0aW9uIG91dHNpZGUgdGhlIHRyeS9jYXRjaCBibG9jay5cbiAgICAgICAgZmluYWxseUVudHJ5ID0gbnVsbDtcbiAgICAgIH1cblxuICAgICAgdmFyIHJlY29yZCA9IGZpbmFsbHlFbnRyeSA/IGZpbmFsbHlFbnRyeS5jb21wbGV0aW9uIDoge307XG4gICAgICByZWNvcmQudHlwZSA9IHR5cGU7XG4gICAgICByZWNvcmQuYXJnID0gYXJnO1xuXG4gICAgICBpZiAoZmluYWxseUVudHJ5KSB7XG4gICAgICAgIHRoaXMubmV4dCA9IGZpbmFsbHlFbnRyeS5maW5hbGx5TG9jO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5jb21wbGV0ZShyZWNvcmQpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9LFxuXG4gICAgY29tcGxldGU6IGZ1bmN0aW9uKHJlY29yZCwgYWZ0ZXJMb2MpIHtcbiAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIHRocm93IHJlY29yZC5hcmc7XG4gICAgICB9XG5cbiAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJicmVha1wiIHx8XG4gICAgICAgICAgcmVjb3JkLnR5cGUgPT09IFwiY29udGludWVcIikge1xuICAgICAgICB0aGlzLm5leHQgPSByZWNvcmQuYXJnO1xuICAgICAgfSBlbHNlIGlmIChyZWNvcmQudHlwZSA9PT0gXCJyZXR1cm5cIikge1xuICAgICAgICB0aGlzLnJ2YWwgPSByZWNvcmQuYXJnO1xuICAgICAgICB0aGlzLm5leHQgPSBcImVuZFwiO1xuICAgICAgfSBlbHNlIGlmIChyZWNvcmQudHlwZSA9PT0gXCJub3JtYWxcIiAmJiBhZnRlckxvYykge1xuICAgICAgICB0aGlzLm5leHQgPSBhZnRlckxvYztcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgZmluaXNoOiBmdW5jdGlvbihmaW5hbGx5TG9jKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LmZpbmFsbHlMb2MgPT09IGZpbmFsbHlMb2MpIHtcbiAgICAgICAgICB0aGlzLmNvbXBsZXRlKGVudHJ5LmNvbXBsZXRpb24sIGVudHJ5LmFmdGVyTG9jKTtcbiAgICAgICAgICByZXNldFRyeUVudHJ5KGVudHJ5KTtcbiAgICAgICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBcImNhdGNoXCI6IGZ1bmN0aW9uKHRyeUxvYykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPT09IHRyeUxvYykge1xuICAgICAgICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uO1xuICAgICAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgICB2YXIgdGhyb3duID0gcmVjb3JkLmFyZztcbiAgICAgICAgICAgIHJlc2V0VHJ5RW50cnkoZW50cnkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdGhyb3duO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFRoZSBjb250ZXh0LmNhdGNoIG1ldGhvZCBtdXN0IG9ubHkgYmUgY2FsbGVkIHdpdGggYSBsb2NhdGlvblxuICAgICAgLy8gYXJndW1lbnQgdGhhdCBjb3JyZXNwb25kcyB0byBhIGtub3duIGNhdGNoIGJsb2NrLlxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiaWxsZWdhbCBjYXRjaCBhdHRlbXB0XCIpO1xuICAgIH0sXG5cbiAgICBkZWxlZ2F0ZVlpZWxkOiBmdW5jdGlvbihpdGVyYWJsZSwgcmVzdWx0TmFtZSwgbmV4dExvYykge1xuICAgICAgdGhpcy5kZWxlZ2F0ZSA9IHtcbiAgICAgICAgaXRlcmF0b3I6IHZhbHVlcyhpdGVyYWJsZSksXG4gICAgICAgIHJlc3VsdE5hbWU6IHJlc3VsdE5hbWUsXG4gICAgICAgIG5leHRMb2M6IG5leHRMb2NcbiAgICAgIH07XG5cbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cbiAgfTtcbn0pKFxuICAvLyBBbW9uZyB0aGUgdmFyaW91cyB0cmlja3MgZm9yIG9idGFpbmluZyBhIHJlZmVyZW5jZSB0byB0aGUgZ2xvYmFsXG4gIC8vIG9iamVjdCwgdGhpcyBzZWVtcyB0byBiZSB0aGUgbW9zdCByZWxpYWJsZSB0ZWNobmlxdWUgdGhhdCBkb2VzIG5vdFxuICAvLyB1c2UgaW5kaXJlY3QgZXZhbCAod2hpY2ggdmlvbGF0ZXMgQ29udGVudCBTZWN1cml0eSBQb2xpY3kpLlxuICB0eXBlb2YgZ2xvYmFsID09PSBcIm9iamVjdFwiID8gZ2xvYmFsIDpcbiAgdHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIiA/IHdpbmRvdyA6XG4gIHR5cGVvZiBzZWxmID09PSBcIm9iamVjdFwiID8gc2VsZiA6IHRoaXNcbik7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuL2xpYi9wb2x5ZmlsbFwiKTtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJhYmVsLWNvcmUvcG9seWZpbGxcIik7XG4iLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcblxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xudmFyIHF1ZXVlID0gW107XG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcbnZhciBjdXJyZW50UXVldWU7XG52YXIgcXVldWVJbmRleCA9IC0xO1xuXG5mdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBpZiAoY3VycmVudFF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBxdWV1ZSA9IGN1cnJlbnRRdWV1ZS5jb25jYXQocXVldWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICB9XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBkcmFpblF1ZXVlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuICAgIGlmIChkcmFpbmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB0aW1lb3V0ID0gc2V0VGltZW91dChjbGVhblVwTmV4dFRpY2spO1xuICAgIGRyYWluaW5nID0gdHJ1ZTtcblxuICAgIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgd2hpbGUobGVuKSB7XG4gICAgICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuICAgICAgICBxdWV1ZSA9IFtdO1xuICAgICAgICB3aGlsZSAoKytxdWV1ZUluZGV4IDwgbGVuKSB7XG4gICAgICAgICAgICBjdXJyZW50UXVldWVbcXVldWVJbmRleF0ucnVuKCk7XG4gICAgICAgIH1cbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgICAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgfVxuICAgIGN1cnJlbnRRdWV1ZSA9IG51bGw7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG59XG5cbnByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoZnVuKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcXVldWUucHVzaChuZXcgSXRlbShmdW4sIGFyZ3MpKTtcbiAgICBpZiAocXVldWUubGVuZ3RoID09PSAxICYmICFkcmFpbmluZykge1xuICAgICAgICBzZXRUaW1lb3V0KGRyYWluUXVldWUsIDApO1xuICAgIH1cbn07XG5cbi8vIHY4IGxpa2VzIHByZWRpY3RpYmxlIG9iamVjdHNcbmZ1bmN0aW9uIEl0ZW0oZnVuLCBhcnJheSkge1xuICAgIHRoaXMuZnVuID0gZnVuO1xuICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcbn1cbkl0ZW0ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmZ1bi5hcHBseShudWxsLCB0aGlzLmFycmF5KTtcbn07XG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcbnByb2Nlc3MudmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xucHJvY2Vzcy52ZXJzaW9ucyA9IHt9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxuLy8gVE9ETyhzaHR5bG1hbilcbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xucHJvY2Vzcy51bWFzayA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcbiIsIi8qXHJcbiAqIEphdmFzY3JpcHQgUXVhZHRyZWVcclxuICogQHZlcnNpb24gMS4yLWhpdG1hblxyXG4gKiBAYXV0aG9yIFRpbW8gSGF1c21hbm5cclxuICogaHR0cHM6Ly9naXRodWIuY29tL3RpbW9oYXVzbWFubi9xdWFkdHJlZS1qcy9cclxuICovXHJcblxyXG4vKlxyXG4gQ29weXJpZ2h0IMKpIDIwMTIgVGltbyBIYXVzbWFublxyXG5cclxuUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nXHJcbmEgY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxyXG5cIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcclxud2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxyXG5kaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG9cclxucGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvXHJcbnRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcclxuXHJcblRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlXHJcbmluY2x1ZGVkIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxyXG5cclxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCxcclxuRVhQUkVTUyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXHJcbk1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EXHJcbk5PTklORlJJTkdFTUVOdGhpcy4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkVcclxuTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTlxyXG5PRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT05cclxuV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXHJcbiovXHJcblxyXG4vKiBNT0RJRklFRCBUSEUgTU9EVUxFIFRPIFdPUksgV0lUSCBFUzYgRVhQT1JUICovXHJcblxyXG4gLypcclxuICAqIFF1YWR0cmVlIENvbnN0cnVjdG9yXHJcbiAgKiBAcGFyYW0gT2JqZWN0IGJvdW5kc1x0XHRcdGJvdW5kcyB3aXRoIHgsIHksIHdpZHRoLCBoZWlnaHRcclxuICAqIEBwYXJhbSBJbnRlZ2VyIG1heF9vYmplY3RzXHRcdChvcHRpb25hbCkgbWF4IG9iamVjdHMgYSBub2RlIGNhbiBob2xkIGJlZm9yZSBzcGxpdHRpbmcgaW50byA0IHN1Ym5vZGVzIChkZWZhdWx0OiAxMClcclxuICAqIEBwYXJhbSBJbnRlZ2VyIG1heF9sZXZlbHNcdFx0KG9wdGlvbmFsKSB0b3RhbCBtYXggbGV2ZWxzIGluc2lkZSByb290IFF1YWR0cmVlIChkZWZhdWx0OiA0KVxyXG4gICogQHBhcmFtIEludGVnZXIgbGV2ZWxcdFx0XHQob3B0aW9uYWwpIGRlZXB0aCBsZXZlbCwgcmVxdWlyZWQgZm9yIHN1Ym5vZGVzXHJcbiAgKi9cclxuZXhwb3J0IGZ1bmN0aW9uIFF1YWR0cmVlKCBib3VuZHMsIG1heF9vYmplY3RzLCBtYXhfbGV2ZWxzLCBsZXZlbCApIHtcclxuXHJcblx0dGhpcy5tYXhfb2JqZWN0c1x0PSBtYXhfb2JqZWN0cyB8fCAxMDtcclxuXHR0aGlzLm1heF9sZXZlbHNcdFx0PSBtYXhfbGV2ZWxzIHx8IDQ7XHJcblxyXG5cdHRoaXMubGV2ZWwgXHRcdFx0PSBsZXZlbCB8fCAwO1xyXG5cdHRoaXMuYm91bmRzIFx0XHQ9IGJvdW5kcztcclxuXHJcblx0dGhpcy5vYmplY3RzIFx0XHQ9IFtdO1xyXG5cdHRoaXMub2JqZWN0X3JlZnNcdD0gW107XHJcblx0dGhpcy5ub2RlcyBcdFx0XHQ9IFtdO1xyXG59O1xyXG5cclxuXHJcbi8qXHJcbiAqIFNwbGl0IHRoZSBub2RlIGludG8gNCBzdWJub2Rlc1xyXG4gKi9cclxuUXVhZHRyZWUucHJvdG90eXBlLnNwbGl0ID0gZnVuY3Rpb24oKSB7XHJcblxyXG5cdHZhciBuZXh0TGV2ZWxcdD0gdGhpcy5sZXZlbCArIDEsXHJcblx0XHRzdWJXaWR0aFx0PSBNYXRoLnJvdW5kKCB0aGlzLmJvdW5kcy53aWR0aCAvIDIgKSxcclxuXHRcdHN1YkhlaWdodCBcdD0gTWF0aC5yb3VuZCggdGhpcy5ib3VuZHMuaGVpZ2h0IC8gMiApLFxyXG5cdFx0eCBcdFx0XHQ9IE1hdGgucm91bmQoIHRoaXMuYm91bmRzLnggKSxcclxuXHRcdHkgXHRcdFx0PSBNYXRoLnJvdW5kKCB0aGlzLmJvdW5kcy55ICk7XHJcblxyXG4gXHQvL3RvcCByaWdodCBub2RlXHJcblx0dGhpcy5ub2Rlc1swXSA9IG5ldyBRdWFkdHJlZSh7XHJcblx0XHR4XHQ6IHggKyBzdWJXaWR0aCxcclxuXHRcdHlcdDogeSxcclxuXHRcdHdpZHRoXHQ6IHN1YldpZHRoLFxyXG5cdFx0aGVpZ2h0XHQ6IHN1YkhlaWdodFxyXG5cdH0sIHRoaXMubWF4X29iamVjdHMsIHRoaXMubWF4X2xldmVscywgbmV4dExldmVsKTtcclxuXHJcblx0Ly90b3AgbGVmdCBub2RlXHJcblx0dGhpcy5ub2Rlc1sxXSA9IG5ldyBRdWFkdHJlZSh7XHJcblx0XHR4XHQ6IHgsXHJcblx0XHR5XHQ6IHksXHJcblx0XHR3aWR0aFx0OiBzdWJXaWR0aCxcclxuXHRcdGhlaWdodFx0OiBzdWJIZWlnaHRcclxuXHR9LCB0aGlzLm1heF9vYmplY3RzLCB0aGlzLm1heF9sZXZlbHMsIG5leHRMZXZlbCk7XHJcblxyXG5cdC8vYm90dG9tIGxlZnQgbm9kZVxyXG5cdHRoaXMubm9kZXNbMl0gPSBuZXcgUXVhZHRyZWUoe1xyXG5cdFx0eFx0OiB4LFxyXG5cdFx0eVx0OiB5ICsgc3ViSGVpZ2h0LFxyXG5cdFx0d2lkdGhcdDogc3ViV2lkdGgsXHJcblx0XHRoZWlnaHRcdDogc3ViSGVpZ2h0XHJcblx0fSwgdGhpcy5tYXhfb2JqZWN0cywgdGhpcy5tYXhfbGV2ZWxzLCBuZXh0TGV2ZWwpO1xyXG5cclxuXHQvL2JvdHRvbSByaWdodCBub2RlXHJcblx0dGhpcy5ub2Rlc1szXSA9IG5ldyBRdWFkdHJlZSh7XHJcblx0XHR4XHQ6IHggKyBzdWJXaWR0aCxcclxuXHRcdHlcdDogeSArIHN1YkhlaWdodCxcclxuXHRcdHdpZHRoXHQ6IHN1YldpZHRoLFxyXG5cdFx0aGVpZ2h0XHQ6IHN1YkhlaWdodFxyXG5cdH0sIHRoaXMubWF4X29iamVjdHMsIHRoaXMubWF4X2xldmVscywgbmV4dExldmVsKTtcclxufTtcclxuXHJcblxyXG4vKlxyXG4gKiBEZXRlcm1pbmUgdGhlIHF1YWR0cmFudCBmb3IgYW4gYXJlYSBpbiB0aGlzIG5vZGVcclxuICogQHBhcmFtIE9iamVjdCBwUmVjdFx0XHRib3VuZHMgb2YgdGhlIGFyZWEgdG8gYmUgY2hlY2tlZCwgd2l0aCB4LCB5LCB3aWR0aCwgaGVpZ2h0XHJcbiAqIEByZXR1cm4gSW50ZWdlclx0XHRcdGluZGV4IG9mIHRoZSBzdWJub2RlICgwLTMpLCBvciAtMSBpZiBwUmVjdCBjYW5ub3QgY29tcGxldGVseSBmaXQgd2l0aGluIGEgc3Vibm9kZSBhbmQgaXMgcGFydCBvZiB0aGUgcGFyZW50IG5vZGVcclxuICovXHJcblF1YWR0cmVlLnByb3RvdHlwZS5nZXRJbmRleCA9IGZ1bmN0aW9uKCBwUmVjdCApIHtcclxuXHJcblx0dmFyIGluZGV4IFx0XHRcdFx0PSAtMSxcclxuXHRcdHZlcnRpY2FsTWlkcG9pbnQgXHQ9IHRoaXMuYm91bmRzLnggKyAodGhpcy5ib3VuZHMud2lkdGggLyAyKSxcclxuXHRcdGhvcml6b250YWxNaWRwb2ludCBcdD0gdGhpcy5ib3VuZHMueSArICh0aGlzLmJvdW5kcy5oZWlnaHQgLyAyKSxcclxuXHJcblx0XHQvL3BSZWN0IGNhbiBjb21wbGV0ZWx5IGZpdCB3aXRoaW4gdGhlIHRvcCBxdWFkcmFudHNcclxuXHRcdHRvcFF1YWRyYW50ID0gKHBSZWN0LnkgPCBob3Jpem9udGFsTWlkcG9pbnQgJiYgcFJlY3QueSArIHBSZWN0LmhlaWdodCA8IGhvcml6b250YWxNaWRwb2ludCksXHJcblxyXG5cdFx0Ly9wUmVjdCBjYW4gY29tcGxldGVseSBmaXQgd2l0aGluIHRoZSBib3R0b20gcXVhZHJhbnRzXHJcblx0XHRib3R0b21RdWFkcmFudCA9IChwUmVjdC55ID4gaG9yaXpvbnRhbE1pZHBvaW50KTtcclxuXHJcblx0Ly9wUmVjdCBjYW4gY29tcGxldGVseSBmaXQgd2l0aGluIHRoZSBsZWZ0IHF1YWRyYW50c1xyXG5cdGlmKCBwUmVjdC54IDwgdmVydGljYWxNaWRwb2ludCAmJiBwUmVjdC54ICsgcFJlY3Qud2lkdGggPCB2ZXJ0aWNhbE1pZHBvaW50ICkge1xyXG5cdFx0aWYoIHRvcFF1YWRyYW50ICkge1xyXG5cdFx0XHRpbmRleCA9IDE7XHJcblx0XHR9IGVsc2UgaWYoIGJvdHRvbVF1YWRyYW50ICkge1xyXG5cdFx0XHRpbmRleCA9IDI7XHJcblx0XHR9XHJcblxyXG5cdC8vcFJlY3QgY2FuIGNvbXBsZXRlbHkgZml0IHdpdGhpbiB0aGUgcmlnaHQgcXVhZHJhbnRzXHJcblx0fSBlbHNlIGlmKCBwUmVjdC54ID4gdmVydGljYWxNaWRwb2ludCApIHtcclxuXHRcdGlmKCB0b3BRdWFkcmFudCApIHtcclxuXHRcdFx0aW5kZXggPSAwO1xyXG5cdFx0fSBlbHNlIGlmKCBib3R0b21RdWFkcmFudCApIHtcclxuXHRcdFx0aW5kZXggPSAzO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cmV0dXJuIGluZGV4O1xyXG59O1xyXG5cclxuXHJcbi8qXHJcbiAqIEluc2VydCBhbiBvYmplY3QgaW50byB0aGUgbm9kZS4gSWYgdGhlIG5vZGVcclxuICogZXhjZWVkcyB0aGUgY2FwYWNpdHksIGl0IHdpbGwgc3BsaXQgYW5kIGFkZCBhbGxcclxuICogb2JqZWN0cyB0byB0aGVpciBjb3JyZXNwb25kaW5nIHN1Ym5vZGVzLlxyXG4gKiBAcGFyYW0gT2JqZWN0IG9ialx0XHR0aGUgb2JqZWN0IHRvIGJlIGFkZGVkLCB3aXRoIHgsIHksIHdpZHRoLCBoZWlnaHRcclxuICovXHJcblF1YWR0cmVlLnByb3RvdHlwZS5pbnNlcnQgPSBmdW5jdGlvbiggb2JqICkge1xyXG5cclxuXHR2YXIgaSA9IDAsXHJcbiBcdFx0aW5kZXg7XHJcblxyXG4gXHQvL2lmIHdlIGhhdmUgc3Vibm9kZXMgLi4uXHJcblx0aWYoIHR5cGVvZiB0aGlzLm5vZGVzWzBdICE9PSAndW5kZWZpbmVkJyApIHtcclxuXHRcdGluZGV4ID0gdGhpcy5nZXRJbmRleCggb2JqICk7XHJcblxyXG5cdCAgXHRpZiggaW5kZXggIT09IC0xICkge1xyXG5cdFx0XHR0aGlzLm5vZGVzW2luZGV4XS5pbnNlcnQoIG9iaiApO1xyXG5cdFx0IFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcbiBcdHRoaXMub2JqZWN0cy5wdXNoKCBvYmogKTtcclxuXHJcblx0aWYoIHRoaXMub2JqZWN0cy5sZW5ndGggPiB0aGlzLm1heF9vYmplY3RzICYmIHRoaXMubGV2ZWwgPCB0aGlzLm1heF9sZXZlbHMgKSB7XHJcblxyXG5cdFx0Ly9zcGxpdCBpZiB3ZSBkb24ndCBhbHJlYWR5IGhhdmUgc3Vibm9kZXNcclxuXHRcdGlmKCB0eXBlb2YgdGhpcy5ub2Rlc1swXSA9PT0gJ3VuZGVmaW5lZCcgKSB7XHJcblx0XHRcdHRoaXMuc3BsaXQoKTtcclxuXHRcdH1cclxuXHJcblx0XHQvL2FkZCBhbGwgb2JqZWN0cyB0byB0aGVyZSBjb3JyZXNwb25kaW5nIHN1Ym5vZGVzXHJcblx0XHR3aGlsZSggaSA8IHRoaXMub2JqZWN0cy5sZW5ndGggKSB7XHJcblxyXG5cdFx0XHRpbmRleCA9IHRoaXMuZ2V0SW5kZXgoIHRoaXMub2JqZWN0c1sgaSBdICk7XHJcblxyXG5cdFx0XHRpZiggaW5kZXggIT09IC0xICkge1xyXG5cdFx0XHRcdHRoaXMubm9kZXNbaW5kZXhdLmluc2VydCggdGhpcy5vYmplY3RzLnNwbGljZShpLCAxKVswXSApO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdGkgPSBpICsgMTtcclxuXHRcdCBcdH1cclxuXHQgXHR9XHJcblx0fVxyXG4gfTtcclxuXHJcblxyXG4vKlxyXG4gKiBSZXR1cm4gYWxsIG9iamVjdHMgdGhhdCBjb3VsZCBjb2xsaWRlIHdpdGggYSBnaXZlbiBhcmVhXHJcbiAqIEBwYXJhbSBPYmplY3QgcFJlY3RcdFx0Ym91bmRzIG9mIHRoZSBhcmVhIHRvIGJlIGNoZWNrZWQsIHdpdGggeCwgeSwgd2lkdGgsIGhlaWdodFxyXG4gKiBAUmV0dXJuIEFycmF5XHRcdFx0YXJyYXkgd2l0aCBhbGwgZGV0ZWN0ZWQgb2JqZWN0c1xyXG4gKi9cclxuUXVhZHRyZWUucHJvdG90eXBlLnJldHJpZXZlID0gZnVuY3Rpb24oIHBSZWN0ICkge1xyXG5cclxuXHR2YXIgaW5kZXggPSB0aGlzLmdldEluZGV4KCBwUmVjdCApLFxyXG5cdFx0cmV0dXJuT2JqZWN0cyA9IHRoaXMub2JqZWN0cztcclxuXHJcblx0Ly9pZiB3ZSBoYXZlIHN1Ym5vZGVzIC4uLlxyXG5cdGlmKCB0eXBlb2YgdGhpcy5ub2Rlc1swXSAhPT0gJ3VuZGVmaW5lZCcgKSB7XHJcblxyXG5cdFx0Ly9pZiBwUmVjdCBmaXRzIGludG8gYSBzdWJub2RlIC4uXHJcblx0XHRpZiggaW5kZXggIT09IC0xICkge1xyXG5cdFx0XHRyZXR1cm5PYmplY3RzID0gcmV0dXJuT2JqZWN0cy5jb25jYXQoIHRoaXMubm9kZXNbaW5kZXhdLnJldHJpZXZlKCBwUmVjdCApICk7XHJcblxyXG5cdFx0Ly9pZiBwUmVjdCBkb2VzIG5vdCBmaXQgaW50byBhIHN1Ym5vZGUsIGNoZWNrIGl0IGFnYWluc3QgYWxsIHN1Ym5vZGVzXHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRmb3IoIHZhciBpPTA7IGkgPCB0aGlzLm5vZGVzLmxlbmd0aDsgaT1pKzEgKSB7XHJcblx0XHRcdFx0cmV0dXJuT2JqZWN0cyA9IHJldHVybk9iamVjdHMuY29uY2F0KCB0aGlzLm5vZGVzW2ldLnJldHJpZXZlKCBwUmVjdCApICk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHJldHVybiByZXR1cm5PYmplY3RzO1xyXG59O1xyXG5cclxuXHJcbi8qXHJcbiAqIEdldCBhbGwgb2JqZWN0cyBzdG9yZWQgaW4gdGhlIHF1YWR0cmVlXHJcbiAqIEByZXR1cm4gQXJyYXkgXHRcdGFsbCBvYmplY3RzIGluIHRoZSBxdWFkdHJlZVxyXG4gKi9cclxuUXVhZHRyZWUucHJvdG90eXBlLmdldEFsbCA9IGZ1bmN0aW9uKCkge1xyXG5cclxuXHR2YXIgb2JqZWN0cyA9IHRoaXMub2JqZWN0cztcclxuXHJcblx0Zm9yKCB2YXIgaT0wOyBpIDwgdGhpcy5ub2Rlcy5sZW5ndGg7IGk9aSsxICkge1xyXG5cdFx0b2JqZWN0cyA9IG9iamVjdHMuY29uY2F0KCB0aGlzLm5vZGVzW2ldLmdldEFsbCgpICk7XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gb2JqZWN0cztcclxufTtcclxuXHJcblxyXG4vKlxyXG4gKiBHZXQgdGhlIG5vZGUgaW4gd2hpY2ggYSBjZXJ0YWluIG9iamVjdCBpcyBzdG9yZWRcclxuICogQHBhcmFtIE9iamVjdCBvYmpcdFx0dGhlIG9iamVjdCB0aGF0IHdhcyBhZGRlZCB2aWEgUXVhZHRyZWUuaW5zZXJ0XHJcbiAqIEByZXR1cm4gT2JqZWN0IFx0XHRcdHRoZSBzdWJub2RlLCBvciBmYWxzZSB3aGVuIG5vdCBmb3VuZFxyXG4gKi9cclxuUXVhZHRyZWUucHJvdG90eXBlLmdldE9iamVjdE5vZGUgPSBmdW5jdGlvbiggb2JqICkge1xyXG5cclxuXHR2YXIgaW5kZXg7XHJcblxyXG4gXHQvL2lmIHRoZXJlIGFyZSBubyBzdWJub2Rlcywgb2JqZWN0IG11c3QgYmUgaGVyZVxyXG4gXHRpZiggIXRoaXMubm9kZXMubGVuZ3RoICkge1xyXG5cclxuIFx0XHRyZXR1cm4gdGhpcztcclxuXHJcbiBcdH0gZWxzZSB7XHJcblxyXG5cdFx0aW5kZXggPSB0aGlzLmdldEluZGV4KCBvYmogKTtcclxuXHJcblx0XHQvL2lmIHRoZSBvYmplY3QgZG9lcyBub3QgZml0IGludG8gYSBzdWJub2RlLCBpdCBtdXN0IGJlIGhlcmVcclxuXHRcdGlmKCBpbmRleCA9PT0gLTEgKSB7XHJcblxyXG5cdFx0XHRyZXR1cm4gdGhpcztcclxuXHJcblx0XHQvL2lmIGl0IGZpdHMgaW50byBhIHN1Ym5vZGUsIGNvbnRpbnVlIGRlZXBlciBzZWFyY2ggdGhlcmVcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHZhciBub2RlID0gdGhpcy5ub2Rlc1tpbmRleF0uZ2V0T2JqZWN0Tm9kZSggb2JqICk7XHJcblx0XHQgXHRpZiggbm9kZSApIHJldHVybiBub2RlO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cmV0dXJuIGZhbHNlO1xyXG59O1xyXG5cclxuXHJcbi8qXHJcbiAqIFJlbW92ZXMgYSBzcGVjaWZpYyBvYmplY3QgZnJvbSB0aGUgcXVhZHRyZWVcclxuICogRG9lcyBub3QgZGVsZXRlIGVtcHR5IHN1Ym5vZGVzLiBTZWUgY2xlYW51cC1mdW5jdGlvblxyXG4gKiBAcGFyYW0gT2JqZWN0IG9ialx0XHR0aGUgb2JqZWN0IHRoYXQgd2FzIGFkZGVkIHZpYSBRdWFkdHJlZS5pbnNlcnRcclxuICogQHJldHVybiBOdW1iZXJcdFx0XHRmYWxzZSwgd2hlbiB0aGUgb2JqZWN0IHdhcyBub3QgZm91bmRcclxuICovXHJcblF1YWR0cmVlLnByb3RvdHlwZS5yZW1vdmVPYmplY3QgPSBmdW5jdGlvbiggb2JqICkge1xyXG5cclxuXHR2YXIgbm9kZSA9IHRoaXMuZ2V0T2JqZWN0Tm9kZSggb2JqICksXHJcblx0XHRpbmRleCA9IG5vZGUub2JqZWN0cy5pbmRleE9mKCBvYmogKTtcclxuXHJcblx0aWYoIGluZGV4ID09PSAtMSApIHJldHVybiBmYWxzZTtcclxuXHJcblx0bm9kZS5vYmplY3RzLnNwbGljZSggaW5kZXgsIDEpO1xyXG59O1xyXG5cclxuXHJcbi8qXHJcbiAqIENsZWFyIHRoZSBxdWFkdHJlZSBhbmQgZGVsdGUgYWxsIG9iamVjdHNcclxuICovXHJcblF1YWR0cmVlLnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uKCkge1xyXG5cclxuXHR0aGlzLm9iamVjdHMgPSBbXTtcclxuXHJcblx0aWYoICF0aGlzLm5vZGVzLmxlbmd0aCApIHJldHVybjtcclxuXHJcblx0Zm9yKCB2YXIgaT0wOyBpIDwgdGhpcy5ub2Rlcy5sZW5ndGg7IGk9aSsxICkge1xyXG5cclxuXHRcdHRoaXMubm9kZXNbaV0uY2xlYXIoKTtcclxuICBcdH1cclxuXHJcbiAgXHR0aGlzLm5vZGVzID0gW107XHJcbn07XHJcblxyXG5cclxuLypcclxuICogQ2xlYW4gdXAgdGhlIHF1YWR0cmVlXHJcbiAqIExpa2UgY2xlYXIsIGJ1dCBvYmplY3RzIHdvbid0IGJlIGRlbGV0ZWQgYnV0IHJlLWluc2VydGVkXHJcbiAqL1xyXG5RdWFkdHJlZS5wcm90b3R5cGUuY2xlYW51cCA9IGZ1bmN0aW9uKCkge1xyXG5cclxuXHR2YXIgb2JqZWN0cyA9IHRoaXMuZ2V0QWxsKCk7XHJcblxyXG5cdHRoaXMuY2xlYXIoKTtcclxuXHJcblx0Zm9yKCB2YXIgaT0wOyBpIDwgb2JqZWN0cy5sZW5ndGg7IGkrKyApIHtcclxuXHRcdHRoaXMuaW5zZXJ0KCBvYmplY3RzW2ldICk7XHJcblx0fVxyXG59OyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbi8qKiBGYWN0b3J5IHdoZXJlIHdlIGNvbnN0cnVjdCBhIGhvcml6b250YWwgaGV4YWdvbiBtYXAgZm9yIHRlc3QgYW5kIGRldmVsb3BtZW50IHB1cnBvc2VzXHJcbiAqXHJcbiAqIEByZXF1aXJlIGNyZWF0ZWpzIGZyYW1ld29yayBpbiBnbG9iYWwgbmFtZXNwYWNlXHJcbiAqIEByZXF1aXJlIGNhbnZhcyBIVE1MNS1lbGVtZW50IHRvIHdvcmsuIFRoaXMgaXMgbW9yZSBmb3Igbm9kZS5qc1xyXG4gKiBAdG9kbyBBZGQgZG9jdW1lbnRhdGlvbiBhbmQgcmVmYWN0b3IgKG1heWJlIG1vZHVsYXJpemUgLyBmdW5jdGlvbmFsaXplKSB0aGUgYWN0dWFsIGxvZ2ljICovXHJcblxyXG4vKiA9PT09PT0gT3duIG1vZHVsZSBpbXBvcnRzID09PT09PSAqL1xyXG5pbXBvcnQgeyBNYXAgfSBmcm9tICcuLi9tYXAvY29yZS9waXhpX01hcCc7XHJcblxyXG5pbXBvcnQgeyBPYmplY3RfdGVycmFpbiB9IGZyb20gJy4uL21hcC9leHRlbnNpb25zL2hleGFnb25zL29iamVjdC9waXhpX09iamVjdF90ZXJyYWluX2hleGEnO1xyXG5pbXBvcnQgeyBPYmplY3RfdW5pdCB9IGZyb20gJy4uL21hcC9leHRlbnNpb25zL2hleGFnb25zL29iamVjdC9waXhpX09iamVjdF91bml0X2hleGEnO1xyXG5pbXBvcnQgeyByZXNpemVVdGlscyB9IGZyb20gJy4uL21hcC9jb3JlL3V0aWxzL3V0aWxzJztcclxuaW1wb3J0IHsgVUkgfSBmcm9tICcuLi9tYXAvY29yZS9VSSc7XHJcbmltcG9ydCB7IFVJX2RlZmF1bHQgfSBmcm9tIFwiLi4vbWFwL1VJcy9kZWZhdWx0L2RlZmF1bHQuanNcIjtcclxuaW1wb3J0IHsgZXZlbnRMaXN0ZW5lcnMgfSBmcm9tICcuLi9tYXAvY29yZS9ldmVudGxpc3RlbmVycyc7XHJcblxyXG52YXIgZnVuY3Rpb25zSW5PYmogPSB7XHJcbiAgT2JqZWN0X3RlcnJhaW4sXHJcbiAgT2JqZWN0X3VuaXRcclxufTtcclxuXHJcbi8qID09PT09IEVYUE9SVCA9PT09PSAqL1xyXG4vKipcclxuICogQHBhcmFtIHtET01FbGVtZW50IENhbnZhc30gY2FudmFzRWxlbWVudCB0aGUgY2FudmFzIGVsZW1lbnQgZm9yIHRoZSBtYXBcclxuICogQHBhcmFtIHtPYmplY3R9IGdhbWVEYXRhQXJnIGdhbWVEYXRhLiBNb3JlIHNwZWNpZmljIGRhdGEgaW4gZGF0YS1mb2xkZXJzIHRlc3QtZGF0YXNcclxuICogQHBhcmFtIHtiaWdhc3MgT2JqZWN0fSBtYXBEYXRhIC0gaG9sZHMgYWxsIHRoZSBzdGFnZSwgbGF5ZXIgYW5kIG9iamVjdCBkYXRhIG5lZWRlZCB0byBjb25zdHJ1Y3QgYSBmdWxsIG1hcC5cclxuICogTW9yZSBzcGVjaWZpYyBkYXRhIGluIGRhdGEtZm9sZGVycyB0ZXN0LWRhdGFzXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSB0eXBlRGF0YUFyZyB0eXBlRGF0YS4gTW9yZSBzcGVjaWZpYyBkYXRhIGluIGRhdGEtZm9sZGVycyB0ZXN0LWRhdGFzLlxyXG4qL1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZU1hcChjYW52YXNFbGVtZW50LCBkYXRhcykge1xyXG4gIGNvbnNvbGUubG9nKFwiPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cIilcclxuICB2YXIgbWFwRGF0YSA9ICh0eXBlb2YgZGF0YXMubWFwID09PSBcInN0cmluZ1wiKSA/IEpTT04ucGFyc2UoZGF0YXMubWFwKSA6IGRhdGFzLm1hcDtcclxuICB2YXIgdHlwZURhdGEgPSAodHlwZW9mIGRhdGFzLnR5cGUgPT09IFwic3RyaW5nXCIpID8gSlNPTi5wYXJzZShkYXRhcy50eXBlKSA6IGRhdGFzLnR5cGU7XHJcbiAgdmFyIGdhbWVEYXRhID0gKHR5cGVvZiBkYXRhcy5nYW1lID09PSBcInN0cmluZ1wiKSA/IEpTT04ucGFyc2UoZGF0YXMuZ2FtZSkgOiBkYXRhcy5nYW1lO1xyXG4gIHZhciB3aW5kb3dTaXplID0gcmVzaXplVXRpbHMuZ2V0V2luZG93U2l6ZSgpO1xyXG4gIHZhciBtYXBPcHRpb25zID0ge1xyXG4gICAgbWFwU2l6ZTogZ2FtZURhdGEubWFwU2l6ZSxcclxuICAgIGJvdW5kczoge1xyXG4gICAgICB3aWR0aDogd2luZG93U2l6ZS53aWR0aCxcclxuICAgICAgaGVpZ2h0OiB3aW5kb3dTaXplLmhlaWdodFxyXG4gICAgfSxcclxuICAgIHJlbmRlcmVyOiB7XHJcbiAgICAgIGF1dG9SZXNpemU6IHRydWUsXHJcbiAgICAgIHRyYW5zcGFyZW50OiB0cnVlLFxyXG4gICAgICBhbnRpYWxpYXM6IGZhbHNlIC8vIFRFU1QuIE9ubHkgc2hvdWxkIHdvcmsgaW4gY2hyb21lIGF0bS4/XHJcbiAgICAgIC8vcmVzb2x1dGlvbjogY2hhbmdpbmNWYXJpYWJsZSAtIFdlIG1pZ2h0IG5lZWQgdGhpcyBsYXRlciBvbiwgd2hlbiBkb2luZyBtb2JpbGUgb3B0aW1pemF0aW9ucywgZm9yIGRpZmZlcmVudCBwaXplbCBkZW5zaXR5IGRldmljZXNcclxuICAgIH1cclxuICB9O1xyXG4gIHZhciBtYXAgPSBuZXcgTWFwKGNhbnZhc0VsZW1lbnQsIG1hcE9wdGlvbnMgKSA7XHJcbiAgdmFyIGRpYWxvZ19zZWxlY3Rpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlbGVjdGlvbkRpYWxvZ1wiKTtcclxuICB2YXIgZGVmYXVsdFVJID0gbmV3IFVJX2RlZmF1bHQoZGlhbG9nX3NlbGVjdGlvbik7XHJcbiAgZGVmYXVsdFVJLmluaXQoKTtcclxuXHJcbiAgLyogSW5pdGlhbGl6ZSBVSSBhcyBzaW5nbGV0b24gKi9cclxuICBVSShkZWZhdWx0VUksIG1hcCk7XHJcblxyXG4gIC8qIFdlIGl0ZXJhdGUgdGhyb3VnaCB0aGUgZ2l2ZW4gbWFwIGRhdGEgYW5kIGNyZWF0ZSBvYmplY3RzIGFjY29yZGluZ2x5ICovXHJcbiAgLy9mb3IobGV0IGlhID0gMDsgaWEgPCAxMDA7IGlhKyspIHtcclxuICBtYXBEYXRhLmxheWVycy5mb3JFYWNoKCBsYXllckRhdGEgPT4ge1xyXG4gICAgdmFyIGxheWVyR3JvdXAgPSBsYXllckRhdGEuZ3JvdXA7XHJcbiAgICB2YXIgb2JqTWFuYWdlciA9IG1hcC5vYmplY3RNYW5hZ2VyO1xyXG4gICAgdmFyIHRoaXNMYXllcjtcclxuXHJcbiAgICB0cnkge1xyXG4gICAgICB0aGlzTGF5ZXIgPSBtYXAuYWRkTGF5ZXIoIGxheWVyRGF0YS5uYW1lLCBmYWxzZSwgbGF5ZXJEYXRhLmNvb3JkICk7XHJcbiAgICAgIG9iak1hbmFnZXIuYWRkTGF5ZXIobGF5ZXJHcm91cCwge1xyXG4gICAgICAgIHg6IDAsXHJcbiAgICAgICAgeTogMCxcclxuICAgICAgICB3aWR0aDogbWFwLm1hcFNpemUueCxcclxuICAgICAgICBoZWlnaHQ6IG1hcC5tYXBTaXplLnlcclxuICAgICAgfSwge1xyXG4gICAgICAgIG9iamVjdHM6IDEwLFxyXG4gICAgICAgIGxldmVsczogNlxyXG4gICAgICB9KTtcclxuICAgIH0gY2F0Y2goZSkge1xyXG4gICAgICBjb25zb2xlLmxvZyhcIlByb2JsZW06XCIsIGxheWVyRGF0YS50eXBlLCBlLnN0YWNrKTtcclxuICAgIH1cclxuXHJcbiAgICBsYXllckRhdGEub2JqZWN0R3JvdXBzLmZvckVhY2goIG9iamVjdEdyb3VwID0+IHtcclxuICAgICAgbGV0IHNwcml0ZXNoZWV0VHlwZSA9IG9iamVjdEdyb3VwLnR5cGVJbWFnZURhdGE7XHJcblxyXG4gICAgICBpZighc3ByaXRlc2hlZXRUeXBlKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciB3aXRoIHNwcml0ZXNoZWV0VHlwZS1kYXRhXCIpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgb2JqZWN0R3JvdXAub2JqZWN0cy5mb3JFYWNoKCBvYmplY3QgPT4ge1xyXG4gICAgICAgIGxldCBvYmpUeXBlRGF0YSA9IHR5cGVEYXRhLm9iamVjdERhdGFbc3ByaXRlc2hlZXRUeXBlXVtvYmplY3Qub2JqVHlwZV07XHJcblxyXG4gICAgICAgIGlmKCFvYmpUeXBlRGF0YSkge1xyXG4gICAgICAgICAgY29uc29sZS5kZWJ1ZyhcIkJhZCBtYXBEYXRhIGZvciB0eXBlOlwiLCBzcHJpdGVzaGVldFR5cGUsIG9iamVjdC5vYmpUeXBlLCBvYmplY3QubmFtZSk7XHJcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJCYWQgbWFwRGF0YSBmb3IgdHlwZTpcIiwgc3ByaXRlc2hlZXRUeXBlLCBvYmplY3Qub2JqVHlwZSwgb2JqZWN0Lm5hbWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGN1cnJlbnRGcmFtZSA9IFBJWEkudXRpbHMuVGV4dHVyZUNhY2hlW29ialR5cGVEYXRhLmltYWdlXTtcclxuICAgICAgICBsZXQgb2JqRGF0YSA9IHtcclxuICAgICAgICAgIHR5cGVEYXRhOiBvYmpUeXBlRGF0YSxcclxuICAgICAgICAgIGFjdGl2ZURhdGE6IG9iamVjdC5kYXRhXHJcbiAgICAgICAgfTtcclxuICAgICAgICBsZXQgbmV3T2JqZWN0ID0gbmV3IGZ1bmN0aW9uc0luT2JqW29iamVjdEdyb3VwLnR5cGVdKCBvYmplY3QuY29vcmQsIG9iakRhdGEsIGN1cnJlbnRGcmFtZSwgeyByYWRpdXM6IGdhbWVEYXRhLmhleGFnb25SYWRpdXMgfSApO1xyXG4gICAgICAgIG9iak1hbmFnZXIuYWRkT2JqZWN0KFxyXG4gICAgICAgICAgbGF5ZXJHcm91cCxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgeDogbmV3T2JqZWN0LngsXHJcbiAgICAgICAgICAgIHk6IG5ld09iamVjdC55LFxyXG4gICAgICAgICAgICB3aWR0aDogbmV3T2JqZWN0LndpZHRoLFxyXG4gICAgICAgICAgICBoZWlnaHQ6IG5ld09iamVjdC5oZWlnaHRcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG5ld09iamVjdFxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIHRoaXNMYXllci5hZGRDaGlsZCggbmV3T2JqZWN0ICk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfSk7XHJcbiAgXHJcblxyXG5cclxuICBtYXAubW92ZU1hcChtYXBEYXRhLnN0YXJ0UG9pbnQpO1xyXG5cclxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRlc3RGdWxsc2NyZWVuXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbigpIHtcclxuICAgIGV2ZW50TGlzdGVuZXJzLnRvZ2dsZUZ1bGxTY3JlZW4oKTtcclxuICB9KTtcclxuXHJcbiAgd2luZG93Lm1hcCA9IG1hcDtcclxuXHJcbiAgcmV0dXJuIG1hcDtcclxufSIsIi8qIGpzaGludCBpZ25vcmU6Y3JlYXRlanMgKi9cclxuXHJcbi8qKiBUaGUgc2ltcGxlc3QgZGVmYXVsdCBVSSBpbXBsZW1lbnRhdGlvbi4gSW1wbGVtZW50IFVJIGZ1bmN0aW9uYWxpdGllcyBmb3I6XHJcbiAqIHNob3dTZWxlY3Rpb25zXHJcbiAqIGhpZ2hsaWdodFNlbGVjdGVkT2JqZWN0XHJcbiAqXHJcbiAqIEByZXF1aXJlIEhhbmRsZWJhcnNcclxuICogQHRvZG8gSU4gUFJPR1JFU1MsIG5vdCBpbXBsZW1lbnRlZCB3ZWxsIHlldC4gVXNlcyBjaHJvbWVzIGJ1aWx0LWluIG1vZGFsIHN1cHBvcnQgb25seSBhdG0uIGp1c3QgZm9yIHRoZSBraWNrcyA6KVxyXG4gICAgTkVFRCB0byBhdCBsZWFzdCByZW1vdmUgdGhlIGZyYW1ld29yayBzcGVjaWZpYyB0aGluZ3Mgb3V0IG9mIHRoaXMgbW9kdWxlISAqL1xyXG5cclxuJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0IHsgdGVtcGxhdGVzIH0gZnJvbSAnLi9sYXlvdXQvdGVtcGxhdGVzJztcclxuaW1wb3J0IHsgY3JlYXRlQ1NTUnVsZXMgfSBmcm9tICcuL2xheW91dC9DU1NSdWxlcyc7XHJcbmltcG9ydCB7IGNyZWF0ZVZpc2libGVIZXhhZ29uIH0gZnJvbSAnLi4vLi4vZXh0ZW5zaW9ucy9oZXhhZ29ucy91dGlscy9jcmVhdGVIZXhhZ29uJztcclxuXHJcbnZhciBfc3R5bGVTaGVldCA9IHt9O1xyXG52YXIgY3NzQ2xhc3NlcyA9IHtcclxuICBzZWxlY3Q6IFwiI2RpYWxvZ19zZWxlY3RcIlxyXG59O1xyXG52YXIgJGVsZW1lbnRzID0ge307XHJcbnZhciBmYWRlQW5pbWF0aW9uID0gXCJzbG93XCI7XHJcbnZhciBjcmVhdGVIaWdobGlnaHQ7XHJcblxyXG5leHBvcnQgY2xhc3MgVUlfZGVmYXVsdCB7XHJcbiAgY29uc3RydWN0b3IobW9kYWwsIHN0eWxlcykge1xyXG4gICAgdmFyIGNyZWF0ZWRDU1M7XHJcbiAgICAvLyBBZGQgYSBtZWRpYSAoYW5kL29yIG1lZGlhIHF1ZXJ5KSBoZXJlIGlmIHlvdSdkIGxpa2UhXHJcbiAgICAvLyBzdHlsZS5zZXRBdHRyaWJ1dGUoXCJtZWRpYVwiLCBcInNjcmVlblwiKVxyXG4gICAgLy8gc3R5bGUuc2V0QXR0cmlidXRlKFwibWVkaWFcIiwgXCJvbmx5IHNjcmVlbiBhbmQgKG1heC13aWR0aCA6IDEwMjRweClcIilcclxuICAgIF9zdHlsZVNoZWV0ID0gX2FkZFN0eWxlRWxlbWVudCgpO1xyXG4gICAgY3JlYXRlZENTUyA9IGNyZWF0ZUNTU1J1bGVzKGNzc0NsYXNzZXMpO1xyXG4gICAgX2FkZENTU1J1bGVzVG9TY3JpcHRUYWcoX3N0eWxlU2hlZXQsIGNyZWF0ZWRDU1MpO1xyXG5cclxuICAgIHRoaXMubW9kYWwgPSBtb2RhbCB8fCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRpYWxvZ19zZWxlY3RcIik7XHJcbiAgICB0aGlzLnN0eWxlcyA9IHN0eWxlcyB8fCB7XHJcbiAgICAgIGJhY2tncm91bmRDb2xvcjogXCIjRjBGMEYwXCJcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5jbG9zaW5nRWxlbWVudHMgPSBfRE9NRWxlbWVudHNUb0FycmF5KHRoaXMubW9kYWwuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcIm1vZGFsX2Nsb3NlXCIpKTtcclxuICB9XHJcbiAgc2hvd1NlbGVjdGlvbnMobWFwLCBvYmplY3RzKSB7XHJcbiAgICBjcmVhdGVIaWdobGlnaHQgPSBzZXR1cENyZWF0ZUhpZ2hsaWdodChtYXApO1xyXG5cclxuICAgIGlmKG1hcC5nZXRFbnZpcm9ubWVudCgpID09PSBcIm1vYmlsZVwiKSB7XHJcbiAgICAgIF9zaG93TW9iaWxlU2VsZWN0aW9ucyhvYmplY3RzLCB0aGlzLm1vZGFsLCBtYXAuZHJhd09uTmV4dFRpY2suYmluZChtYXApLCBtYXAuZ2V0TW92YWJsZUxheWVyKCkpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgX3Nob3dEZXNrdG9wU2VsZWN0aW9ucyhvYmplY3RzLCB0aGlzLm1vZGFsLCBtYXAuZHJhd09uTmV4dFRpY2suYmluZChtYXApLCBtYXAuZ2V0TW92YWJsZUxheWVyKCkpO1xyXG4gICAgfVxyXG4gIH1cclxuICBoaWdobGlnaHRTZWxlY3RlZE9iamVjdChtYXAsIG9iamVjdCkge1xyXG4gICAgY3JlYXRlSGlnaGxpZ2h0ID0gc2V0dXBDcmVhdGVIaWdobGlnaHQobWFwKTtcclxuXHJcbiAgICBpZihvYmplY3QuaGlnaGxpZ2h0YWJsZSkge1xyXG4gICAgICByZXR1cm4gX2hpZ2hsaWdodFNlbGVjdGVkT2JqZWN0KG9iamVjdCwgbWFwLmdldE1vdmFibGVMYXllcigpKTtcclxuICAgIH1cclxuICB9XHJcbiAgaW5pdCgpIHtcclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuXHJcbiAgICB0aGlzLmNsb3NpbmdFbGVtZW50cy5mb3JFYWNoKGZ1bmN0aW9uKGVsZW1lbnQpIHtcclxuICAgICAgLyoqXHJcbiAgICAgICAqIEB0b2RvIGNoYW5nZSB0aGlzIG1vZGFsIHN5c3RlbSB0b3RhbGx5LiBBcyBpdCBpcyBiYXNlZCBvbiBIVE1MIDUuMSBtb2RhbCBzcGVjaWZpY2F0aW9ucyBhdG0uIGZvciBlYXN5IHRlc3RpbmdcclxuICAgICAgICogTWF5YmUgY3JlYXRlIGEgY2xhc3MgdGhhdCBhYnN0cmFjdHMgdGhlIG1vZGFsIGJlaGluZCBpdCBvciB0aGVuIGp1c3QgdXNlIHRoaXM/ICovXHJcbiAgICAgIGlmKHNlbGYubW9kYWwgJiYgc2VsZi5tb2RhbC5jbG9zZSkge1xyXG4gICAgICAgIF9hY3RpdmF0ZUNsb3NpbmdFbGVtZW50KCBlbGVtZW50LCBzZWxmLm1vZGFsLmNsb3NlLmJpbmQoc2VsZi5tb2RhbCkgKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcblxyXG4vKiogPT09PT09IFBSSVZBVEUgRlVOQ1RJT05TID09PT09PSAqL1xyXG5mdW5jdGlvbiBfYWN0aXZhdGVDbG9zaW5nRWxlbWVudChlbGVtZW50LCBjbG9zZUNCKSB7XHJcbiAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIGNsb3NlQ0IoKTtcclxuICAgICAgfSk7XHJcbn1cclxuZnVuY3Rpb24gX0RPTUVsZW1lbnRzVG9BcnJheShlbGVtZW50cykge1xyXG4gIGlmICghZWxlbWVudHMpIHtcclxuICAgIHRocm93IG5ldyBFcnJvcih0aGlzLmNvbnN0cnVjdG9yICsgXCIgZnVuY3Rpb24gbmVlZHMgZWxlbWVudHNcIik7XHJcbiAgfVxyXG5cclxuICB2YXIgbGVuZ3RoID0gZWxlbWVudHMubGVuZ3RoO1xyXG4gIHZhciBlbGVtZW50QXJyYXkgPSBbXTtcclxuXHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xyXG4gICAgZWxlbWVudEFycmF5LnB1c2goZWxlbWVudHNbaV0pO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGVsZW1lbnRBcnJheTtcclxufVxyXG5mdW5jdGlvbiBfYWRkQ1NTUnVsZXNUb1NjcmlwdFRhZyhzaGVldCwgcnVsZXMpIHtcclxuICBzaGVldC5pbnNlcnRSdWxlKHJ1bGVzLCAwKTtcclxufVxyXG5mdW5jdGlvbiBfYWRkU3R5bGVFbGVtZW50KCkge1xyXG4gICAgdmFyIF9zdHlsZUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XHJcbiAgICAvLyBXZWJLaXQgaGFjayA6KFxyXG4gICAgX3N0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShcIlwiKSk7XHJcbiAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKF9zdHlsZUVsZW1lbnQpO1xyXG5cclxuICAgIHJldHVybiBfc3R5bGVFbGVtZW50LnNoZWV0O1xyXG59XHJcbmZ1bmN0aW9uIF9zaG93TW9kYWwobW9kYWxFbGVtLCBjc3NDbGFzc2VzKSB7XHJcbiAgLyoqIEB0b2RvIG1ha2Ugc3VyZSAvIGNoZWNrLCB0aGF0IHRoaXMgZ2V0IGFkZGVkIG9ubHkgb25jZSAqL1xyXG4gIG1vZGFsRWxlbS5jbGFzc0xpc3QuYWRkKGNzc0NsYXNzZXMuc2VsZWN0KTtcclxuICAvKiBXb3VsZCBiZSBIVE1MIDUuMSBzdGFuZGFyZCwgYnV0IHRoYXQgbWlnaHQgYmUgYSBsb25nIHdheVxyXG4gICAgdGhpcy5tb2RhbC5zaG93KCk7Ki9cclxufVxyXG5mdW5jdGlvbiBfZ2V0JEVsZW1lbnQod2hpY2gpIHtcclxuICAvKiBTZXQgdGhlIGpRdWVyeSBlbGVtZW50IHRvIGNvbGxlY3Rpb24gb25seSBvbmNlICovXHJcbiAgaWYoISRlbGVtZW50c1t3aGljaF0pIHtcclxuICAgIGxldCAkZWxlbWVudCA9ICQoY3NzQ2xhc3Nlc1t3aGljaF0pO1xyXG4gICAgJGVsZW1lbnRzW3doaWNoXSA9ICRlbGVtZW50O1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuICRlbGVtZW50c1t3aGljaF07XHJcbn1cclxuZnVuY3Rpb24gX3Nob3dEZXNrdG9wU2VsZWN0aW9ucyhvYmplY3RzLCBtb2RhbCwgdXBkYXRlQ0IsIFVJTGF5ZXIsIG1hcCkge1xyXG4gIHZhciBoaWdodGxpZ2h0YWJsZU9iamVjdHMgPSBfc2VsZWN0aW9uc0luaXQoVUlMYXllciwgb2JqZWN0cyk7XHJcblxyXG4gIGlmIChvYmplY3RzICYmIGhpZ2h0bGlnaHRhYmxlT2JqZWN0cy5sZW5ndGggPiAxKSB7XHJcbiAgICBfZ2V0JEVsZW1lbnQoXCJzZWxlY3RcIikuZmFkZU91dChmYWRlQW5pbWF0aW9uLCAoKSA9PiB7XHJcbiAgICAgIG1vZGFsLmlubmVySFRNTCA9IHRlbXBsYXRlcy5tdWx0aVNlbGVjdGlvbih7XHJcbiAgICAgICAgdGl0bGU6IFwiT2JqZWN0c1wiLFxyXG4gICAgICAgIG9iamVjdHNcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBfc2hvd01vZGFsKG1vZGFsLCBjc3NDbGFzc2VzKTtcclxuXHJcbiAgICAgIGNvbnNvbGUubG9nKG9iamVjdHMpO1xyXG5cclxuICAgICAgX2dldCRFbGVtZW50KFwic2VsZWN0XCIpLmZhZGVJbihmYWRlQW5pbWF0aW9uKTtcclxuICAgIH0pO1xyXG4gIH0gZWxzZSBpZiAoaGlnaHRsaWdodGFibGVPYmplY3RzLmxlbmd0aCA9PT0gMSkge1xyXG4gICAgX2dldCRFbGVtZW50KFwic2VsZWN0XCIpLmZhZGVPdXQoZmFkZUFuaW1hdGlvbiwgKCkgPT4ge1xyXG4gICAgICBtb2RhbC5pbm5lckhUTUwgPSB0ZW1wbGF0ZXMuc2luZ2xlU2VsZWN0aW9uKHtcclxuICAgICAgICB0aXRsZTogXCJTZWxlY3RlZFwiLFxyXG4gICAgICAgIG9iamVjdDoge1xyXG4gICAgICAgICAgbmFtZTogaGlnaHRsaWdodGFibGVPYmplY3RzWzBdLmRhdGEudHlwZURhdGEubmFtZVxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcblxyXG4gICAgICBfc2hvd01vZGFsKG1vZGFsLCBjc3NDbGFzc2VzKTtcclxuICAgICAgX2hpZ2hsaWdodFNlbGVjdGVkT2JqZWN0KGhpZ2h0bGlnaHRhYmxlT2JqZWN0c1swXSwgVUlMYXllciwgbWFwKTtcclxuICAgICAgdXBkYXRlQ0IoKTtcclxuXHJcbiAgICAgIGNvbnNvbGUubG9nKGhpZ2h0bGlnaHRhYmxlT2JqZWN0cyk7XHJcblxyXG4gICAgICBfZ2V0JEVsZW1lbnQoXCJzZWxlY3RcIikuZmFkZUluKGZhZGVBbmltYXRpb24pO1xyXG4gICAgfSk7XHJcbiAgfSBlbHNlIHtcclxuICAgIF9nZXQkRWxlbWVudChcInNlbGVjdFwiKS5mYWRlT3V0KGZhZGVBbmltYXRpb24sICgpID0+IHtcclxuICAgICAgVUlMYXllci5lbXB0eVVJT2JqZWN0cygpO1xyXG4gICAgICB1cGRhdGVDQigpO1xyXG4gICAgICBjb25zb2xlLmxvZyhcIkVycm9yIG9jY3VyZWQgc2VsZWN0aW5nIHRoZSBvYmplY3RzIG9uIHRoaXMgY29vcmRpbmF0ZXMhIE5vdGhpbmcgZm91bmRcIik7XHJcbiAgICB9KTsgICAgXHJcbiAgfVxyXG59XHJcbmZ1bmN0aW9uIF9zaG93TW9iaWxlU2VsZWN0aW9ucyhvYmplY3RzLCBtb2RhbCwgdXBkYXRlQ0IsIFVJTGF5ZXIpIHtcclxuICB2YXIgaGlnaHRsaWdodGFibGVPYmplY3RzID0gX3NlbGVjdGlvbnNJbml0KFVJTGF5ZXIsIG9iamVjdHMpO1xyXG5cclxuICBpZiAob2JqZWN0cyAmJiBvYmplY3RzLmxlbmd0aCA+IDEpIHtcclxuICAgIF9nZXQkRWxlbWVudChcInNlbGVjdFwiKS5mYWRlT3V0KGZhZGVBbmltYXRpb24sICgpID0+IHtcclxuICAgICAgbW9kYWwuaW5uZXJIVE1MID0gdGVtcGxhdGVzLm11bHRpU2VsZWN0aW9uKHtcclxuICAgICAgICB0aXRsZTogXCJPYmplY3RzXCIsXHJcbiAgICAgICAgb2JqZWN0c1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIF9zaG93TW9kYWwobW9kYWwsIGNzc0NsYXNzZXMpO1xyXG5cclxuICAgICAgY29uc29sZS5sb2cob2JqZWN0cyk7XHJcblxyXG4gICAgICBfZ2V0JEVsZW1lbnQoXCJzZWxlY3RcIikuZmFkZUluKGZhZGVBbmltYXRpb24pO1xyXG4gICAgfSk7XHJcbiAgfSBlbHNlIGlmIChoaWdodGxpZ2h0YWJsZU9iamVjdHMubGVuZ3RoID09PSAxKSB7XHJcbiAgICBfZ2V0JEVsZW1lbnQoXCJzZWxlY3RcIikuZmFkZU91dChmYWRlQW5pbWF0aW9uLCAoKSA9PiB7XHJcbiAgICAgIG1vZGFsLmlubmVySFRNTCA9IHRlbXBsYXRlcy5zaW5nbGVTZWxlY3Rpb24oe1xyXG4gICAgICAgIHRpdGxlOiBcIlNlbGVjdGVkXCIsXHJcbiAgICAgICAgb2JqZWN0OiB7XHJcbiAgICAgICAgICBuYW1lOiBoaWdodGxpZ2h0YWJsZU9iamVjdHNbMF0uZGF0YS50eXBlRGF0YS5uYW1lXHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIF9zaG93TW9kYWwobW9kYWwsIGNzc0NsYXNzZXMpO1xyXG4gICAgICBfaGlnaGxpZ2h0U2VsZWN0ZWRPYmplY3QoaGlnaHRsaWdodGFibGVPYmplY3RzWzBdLCBVSUxheWVyLCBtYXApO1xyXG4gICAgICB1cGRhdGVDQigpO1xyXG5cclxuICAgICAgY29uc29sZS5sb2coaGlnaHRsaWdodGFibGVPYmplY3RzKTtcclxuXHJcbiAgICAgIF9nZXQkRWxlbWVudChcInNlbGVjdFwiKS5mYWRlSW4oZmFkZUFuaW1hdGlvbik7XHJcbiAgICB9KTtcclxuICB9IGVsc2Uge1xyXG4gICAgX2dldCRFbGVtZW50KFwic2VsZWN0XCIpLmZhZGVPdXQoZmFkZUFuaW1hdGlvbiwgKCkgPT4ge1xyXG4gICAgICBVSUxheWVyLmVtcHR5VUlPYmplY3RzKCk7XHJcbiAgICAgIHVwZGF0ZUNCKCk7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3Igb2NjdXJlZCBzZWxlY3RpbmcgdGhlIG9iamVjdHMgb24gdGhpcyBjb29yZGluYXRlcyEgTm90aGluZyBmb3VuZFwiKTtcclxuICAgIH0pOyAgICBcclxuICB9XHJcbn1cclxuZnVuY3Rpb24gX2hpZ2hsaWdodFNlbGVjdGVkT2JqZWN0KG9iamVjdCwgbW92YWJsZUxheWVyLCBtYXApIHtcclxuICB2YXIgY2xvbmVkT2JqZWN0ID0gb2JqZWN0LmNsb25lKCk7XHJcblxyXG4gIGNyZWF0ZUhpZ2hsaWdodChjbG9uZWRPYmplY3QsIG1vdmFibGVMYXllcik7XHJcblxyXG59XHJcbmZ1bmN0aW9uIF9maWx0ZXJPYmplY3RzRm9ySGlnaGxpZ2h0aW5nKG9iamVjdHMpIHtcclxuICB2YXIgbmV3T2JqZWN0cyA9IG9iamVjdHM7XHJcblxyXG4gIGlmIChvYmplY3RzICYmIG9iamVjdHMubGVuZ3RoID4gMSkge1xyXG4gICAgbmV3T2JqZWN0cyA9IG9iamVjdHMuZmlsdGVyKG9iaiA9PiB7XHJcbiAgICAgIHJldHVybiBvYmouaGlnaGxpZ2h0YWJsZSA9PT0gdHJ1ZSA/IHRydWUgOiBmYWxzZTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIG5ld09iamVjdHM7XHJcbn1cclxuZnVuY3Rpb24gX3NlbGVjdGlvbnNJbml0KFVJTGF5ZXIsIG9iamVjdHMpIHtcclxuICB2YXIgaGlnaGxpZ2h0T2JqZWN0cyA9IF9maWx0ZXJPYmplY3RzRm9ySGlnaGxpZ2h0aW5nKG9iamVjdHMpO1xyXG5cclxuICBpZihoaWdobGlnaHRPYmplY3RzLmxlbmd0aCA8IDEpIHtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIFVJTGF5ZXIuZW1wdHlVSU9iamVjdHMoKTtcclxuICBVSUxheWVyLmFkZFVJT2JqZWN0cyhoaWdobGlnaHRPYmplY3RzKTtcclxuXHJcbiAgcmV0dXJuIGhpZ2hsaWdodE9iamVjdHM7XHJcbn1cclxuXHJcbi8qIEB0b2RvIFRoaXMgd2hvbGUgZGFtbiBzeXN0ZW0gYW5kIGxvZ2ljIG5lZWRzIHRvIGJlIGNoYW5nZWQgYW5kIG1vdmVkIGVsc2V3aGVyZSwgc3R1cGlkIHN0dXBpZCBzdHVwaWQgYXRtLiAqL1xyXG5mdW5jdGlvbiBzZXR1cENyZWF0ZUhpZ2hsaWdodChtYXApIHtcclxuICByZXR1cm4gZnVuY3Rpb24gY3JlYXRlSGlnaGxpZ2h0KG9iamVjdCwgbW92YWJsZUxheWVyKSB7XHJcbiAgICB2YXIgcmFkaXVzID0gNDc7XHJcbiAgICB2YXIgY29udGFpbmVyID0gbmV3IG1hcC5jcmVhdGVMYXllcigpO1xyXG4gICAgdmFyIGNpcmNsZTtcclxuICAgIHZhciBlYXNlbENpcmNsZUNvb3JkcyA9IHtcclxuICAgICAgeDogTnVtYmVyKG9iamVjdC54KSxcclxuICAgICAgeTogTnVtYmVyKG9iamVjdC55KSxcclxuICAgIH07XHJcblxyXG4gICAgaWYodHlwZW9mIGNyZWF0ZWpzICE9ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgIGNpcmNsZSA9IGNyZWF0ZVZpc2libGVIZXhhZ29uKHsgeDowLCB5OjAgfSwgcmFkaXVzLCBcIiNGMEYwRjBcIik7XHJcbiAgICAgIGNpcmNsZS54ID0gZWFzZWxDaXJjbGVDb29yZHMueCAtIDE7XHJcbiAgICAgIGNpcmNsZS55ID0gZWFzZWxDaXJjbGVDb29yZHMueSArIDEyO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy9sZXQgcG9zaXRpb25Pbk1vdmFibGUgPSBvYmplY3QudG9Mb2NhbChuZXcgUElYSS5Qb2ludCgwLDApLCBtb3ZhYmxlTGF5ZXIpO1xyXG4gICAgICBsZXQgcG9zaXRpb25Pbk1vdmFibGUgPSBuZXcgUElYSS5Qb2ludCgwLDApO1xyXG4gICAgICBjaXJjbGUgPSBjcmVhdGVQaXhpQ2lyY2xlKG9iamVjdCwgcmFkaXVzLCBwb3NpdGlvbk9uTW92YWJsZSk7XHJcbiAgICB9XHJcblxyXG4gICAgY2lyY2xlLmFscGhhID0gMC41O1xyXG4gICAgY29udGFpbmVyLmFkZENoaWxkKGNpcmNsZSwgb2JqZWN0KTtcclxuXHJcbiAgICBtb3ZhYmxlTGF5ZXIuYWRkVUlPYmplY3RzKGNvbnRhaW5lcik7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVQaXhpQ2lyY2xlKG9iamVjdCwgcmFkaXVzLCBwb3NpdGlvbk9uTW92YWJsZSkge1xyXG4gIHZhciBjaXJjbGUgPSBuZXcgUElYSS5HcmFwaGljcygpO1xyXG4gIGNpcmNsZS5saW5lU3R5bGUoMiwgMHhGRjAwRkYpOyAgLy8odGhpY2tuZXNzLCBjb2xvcilcclxuICBjaXJjbGUuZHJhd0NpcmNsZSgwLCAwLCByYWRpdXMpOyAgIC8vKHgseSxyYWRpdXMpXHJcbiAgY2lyY2xlLmVuZEZpbGwoKTtcclxuXHJcbiAgY2lyY2xlLnggPSBOdW1iZXIoIHBvc2l0aW9uT25Nb3ZhYmxlLnggKyBvYmplY3QuYW5jaG9yLnggKTtcclxuICBjaXJjbGUueSA9IE51bWJlciggcG9zaXRpb25Pbk1vdmFibGUueSArIG9iamVjdC5hbmNob3IueSApXHJcblxyXG4gIHJldHVybiBjaXJjbGU7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZUVhc2VsanNDaXJjbGUob2JqZWN0LCByYWRpdXMpIHtcclxuICB2YXIgZyA9IG5ldyBjcmVhdGVqcy5HcmFwaGljcygpO1xyXG4gIHZhciBoaWdobGlnaHRDaXJjbGU7XHJcblxyXG4gIGcuc2V0U3Ryb2tlU3R5bGUoMSk7XHJcbiAgZy5iZWdpblN0cm9rZShjcmVhdGVqcy5HcmFwaGljcy5nZXRSR0IoMCwwLDApKTtcclxuICBnLmJlZ2luRmlsbChjcmVhdGVqcy5HcmFwaGljcy5nZXRSR0IoMjU1LDIwMCwyMDAsIDAuMikpO1xyXG4gIGcuZHJhd0NpcmNsZSggMCwgMCwgcmFkaXVzICk7XHJcblxyXG4gIGhpZ2hsaWdodENpcmNsZSA9IG5ldyBjcmVhdGVqcy5TaGFwZShnKTtcclxuXHJcbiAgcmV0dXJuIGhpZ2hsaWdodENpcmNsZTtcclxufSIsImV4cG9ydCBmdW5jdGlvbiBjcmVhdGVDU1NSdWxlcyhjbGFzc05hbWVzLCBkaWFsb2dPcHRpb25zID0geyB6SW5kZXg6IDk5OTksIG9wYWNpdHk6IDAuOSB9KSB7XHJcbiAgcmV0dXJuIGBcclxuICAgICR7Y2xhc3NOYW1lcy5zZWxlY3R9IHtcclxuICAgICAgei1pbmRleDogJHtkaWFsb2dPcHRpb25zLnpJbmRleH07XHJcbiAgICAgIG9wYWNpdHk6ICR7ZGlhbG9nT3B0aW9ucy5vcGFjaXR5fTtcclxuICAgICAgcG9zaXRpb246IGZpeGVkO1xyXG4gICAgICBsZWZ0OiAwcHg7XHJcbiAgICAgIGJvdHRvbTogMHB4O1xyXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiBicm93bjtcclxuICAgICAgYm9yZGVyOiAxcHggc29saWQgcmdiKDI1NSwgMTg2LCAxNDgpOztcclxuICAgICAgYm9yZGVyLWJvdHRvbTogMHB4O1xyXG4gICAgICBwYWRkaW5nOjE1cHg7XHJcbiAgICAgIG1hcmdpbi1sZWZ0OjEwcHg7XHJcbiAgICB9YDtcclxufSIsImV4cG9ydCB2YXIgdGVtcGxhdGVzID0ge1xyXG4gIG11bHRpU2VsZWN0aW9uOiBIYW5kbGViYXJzLmNvbXBpbGUoYFxyXG4gICAgPHNwYW4gc3R5bGU9J2ZvbnQtc2l6ZToyMDAlO2Rpc3BsYXk6YmxvY2s7bWFyZ2luLWJvdHRvbToyMHB4Oyc+XHJcbiAgICAgIHt7dGl0bGV9fVxyXG4gICAgPC9zcGFuPlxyXG4gICAgPHVsPlxyXG4gICAgICB7eyNlYWNoIG9iamVjdHN9fVxyXG4gICAgICA8bGk+XHJcbiAgICAgICAge3t0aGlzLmRhdGEudHlwZURhdGEubmFtZX19XHJcbiAgICAgIDwvbGk+XHJcbiAgICAgIHt7L2VhY2h9fVxyXG4gICAgPC91bD5gKSxcclxuICBzaW5nbGVTZWxlY3Rpb246IEhhbmRsZWJhcnMuY29tcGlsZShgXHJcbiAgICA8c3BhbiBzdHlsZT0nZm9udC1zaXplOjIwMCU7ZGlzcGxheTpibG9jazttYXJnaW4tYm90dG9tOjIwcHg7Jz5cclxuICAgICAge3t0aXRsZX19XHJcbiAgICA8L3NwYW4+XHJcbiAgICA8dWw+XHJcbiAgICAgIDxsaT5cclxuICAgICAgICB7e29iamVjdC5uYW1lfX1cclxuICAgICAgPC9saT5cclxuICAgIDwvdWw+YClcclxufTsiLCIvKiogTWFpbiBjbGFzcyBmb3Igc2hvd2luZyBVSSBvbiB0aGUgbWFwLiBMaWtlIHVuaXQgc2VsZWN0aW9ucyBhbmQgc3VjaC4gSGFzIG5vdGhpbmcgdG8gZG8gd2l0aCBzaG93aW5nIG9mZi1tYXAgZGF0YS5cclxuICogR29vZCBleGFtcGxlcyBmb3Igd2hhdCB0aGlzIHNob3dzIGFyZTogc2VsZWN0ZWQgdW5pdHMtbGlzdCwgc2VsZWN0aW9uIGhpZ2hsaWdodCAobGlrZSBhIGNpcmNsZSBvbiB0aGUgc2VsZWN0ZWQgdW5pdCkgYW5kXHJcbiAqIGJyaW5naW5nIHRoZSB1bml0IG9uIHRvcCBpbiB0aGUgbWFwLlxyXG4gKlxyXG4gKiBAcGFyYW0ge01vZHVsZX0gZ2l2ZW5VSVRoZW1lIHRoZSBtb2R1bGUgdGhhdCB3aWxsIGJlIHVzZWQgZm9yIHRoZSBVSSB0aGVtZVxyXG4gKiBAcGFyYW0ge01hcH0gZ2l2ZW5NYXAgTWFwIGluc3RhbmNlIHRoYXQgaXMgdXNlZFxyXG4gKiBAcmV0dXJuIFVJIG1vZHVsZVxyXG4qL1xyXG5cclxuJ3VzZSBzdHJpY3QnO1xyXG5cclxuLyoqIFRoZSBhYnN0cmFjdCBVSSBtb2R1bGUgZm9yIHRoZSBjb3JlIG1hcCBmdW5jdGlvbmFsaXR5LiBUaGlzIGlzIHVzZWQgYnkgZGVmaW5pbmcgVUkgVGhlbWVzIHRoYXQgaW1wbGVtZW50IHRoaXNcclxuICogY29yZSBVSSBtb2R1bGUuXHJcbiAqIERlZmF1bHQgbWV0aG9kcyB0byB1c2UgaW4gVUkgYXJlOlxyXG4gKiBzaG93U2VsZWN0aW9ucyBhbmQgaGlnaGxpZ2h0U2VsZWN0ZWRPYmplY3QuIE1vcmUgbWV0aG9kcyBjYW4gYmUgZXh0ZW5kZWQgdG8gVUkgd2l0aCBwbHVnaW5zXHJcbiAqXHJcbiAqIEB0b2RvIE5vdCBpbXBsZW1lbnRlZCBmdWxseSB5ZXQgYW5kIHByb2JhYmx5IG5lZWQgcmVmYWN0b3JpbmcgKi9cclxudmFyIHNjb3BlO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIFVJIChnaXZlblVJVGhlbWUsIGdpdmVuTWFwKSB7XHJcbiAgLyogU0lOR0xFVE9OIE1PRFVMRSAqL1xyXG4gIGlmIChzY29wZSkge1xyXG4gICAgcmV0dXJuIHNjb3BlO1xyXG4gIH1cclxuXHJcbiAgaWYgKCFnaXZlblVJVGhlbWUgfHwgIWdpdmVuTWFwKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJVSS1tb2R1bGUgcmVxdWlyZXMgVUlUaGVtZSBhbmQgbWFwIG9iamVjdFwiKTtcclxuICB9XHJcblxyXG4gIHZhciBtYXAgPSBnaXZlbk1hcDtcclxuICB2YXIgVUlUaGVtZSA9IGdpdmVuVUlUaGVtZTtcclxuICBzY29wZSA9IHt9O1xyXG5cclxuICAvKiogUmVzcG9uc2libGUgZm9yIHNob3dpbmcgc2VsZWN0aW9uZyBlbGVtZW50LCB3aGVyZSB0aGUgcGxheWVyIHNlbGVjdCB0aGUgd2FudGVkIG9iamVjdCBvdXQgb2YgYXJyYXkgb2Ygb2JqZWN0cy5cclxuICAgKiBGb3IgZXhhbXBsZSBpZiB0aGVyZSBhcmUgc2V2ZXJhbCBvYmplY3RzIGluIG9uZSB0aWxlIG9uIHRoZSBtYXAgYW5kIHRoZSBwbGF5ZXIgbmVlZHMgdG8gYmUgYWJsZSB0byBzZWxlY3Qgb25lXHJcbiAgICogc3BlY2lmaWMgdW5pdCBvbiB0aGUgc3RhY2sgKi9cclxuICBzY29wZS5zaG93U2VsZWN0aW9ucyA9IGZ1bmN0aW9uIHNob3dTZWxlY3Rpb25zKG9iamVjdHMpIHtcclxuICAgIHJldHVybiBVSVRoZW1lLnNob3dTZWxlY3Rpb25zKG1hcCwgb2JqZWN0cyk7XHJcbiAgfTtcclxuICAvKiogUmVzb25zaWJsZSBmb3IgaGlnbmxpZ2h0aW5nIHRoZSBzZWxlY3RlZCBvYmplY3QuIEZvciBleGFtcGxlIHRoZSB1bml0IHRoYXQgaXMgYmVpbmcgY29tbWFuZGVkLiBUaGUgaGlnaHRsaWdodFxyXG4gICAqIGNhbiBtZWFuIGUuZy4gYnJpbmdpbmcgdGhlIHVuaXQgb24gdG9wIG9uIHRoZSBtYXAgYW5kIHNob3dpbmcgc2VsZWN0aW9uIGNpcmNsZSBhcm91bmQgaXQuICovXHJcbiAgc2NvcGUuaGlnaGxpZ2h0U2VsZWN0ZWRPYmplY3QgPSBmdW5jdGlvbiBoaWdobGlnaHRTZWxlY3RlZE9iamVjdChvYmplY3QpIHtcclxuICAgIHJldHVybiBVSVRoZW1lLmhpZ2hsaWdodFNlbGVjdGVkT2JqZWN0KG1hcCwgb2JqZWN0KTtcclxuICB9O1xyXG5cclxuICByZXR1cm4gc2NvcGU7XHJcbn0iLCIndXNlIHN0cmljdCc7XHJcblxyXG4vKiBnbG9iYWwgSGFtbWVyLCBjcmVhdGVqcyAqL1xyXG5cclxuLyoqXHJcbiAqIEhvdXNlcyB0aGUgZGVmYXVsdCBldmVudGxpc3RlbmVycyB1c2VkIGluIHRoZSBtYXAuIFdoZW4gcGx1Z2lucyBhcmUgYWRkZWQgdG8gdGhlIG1hcCB0aGlzIGNsYXNzIGNhbiBiZSB1c2VkIGZvclxyXG4gKiB0aGUgZXZlbnRsaXN0ZW5lciBtYW5hZ2VtZW50LiBUaGlzIHdheSBhbGwgdGhlIGV2ZW50bGlzdGVuZXJzIGFyZSBpbiB0aGUgc2FtZSBvYmplY3QsIGNvbnZlbmllbnRseS5cclxuICpcclxuICogQHJlcXVpcmUgQnJvd3NlciB0aGF0IHN1cHBvcnQgcG9pbnRlciBldmVudHMgb3IgUG9pbnRlciBldmVudHMgcG9seWZpbGwsIHN1Y2ggYXM6IGh0dHBzOi8vZ2l0aHViLmNvbS9qcXVlcnkvUEVQXHJcbiAqIEByZXF1aXJlIEhhbW1lci5qcyBmb3IgdG91Y2ggZXZlbnRzKi9cclxuXHJcbnZhciBzaW5nbGV0b25TY29wZTtcclxuXHJcbi8qID09PT09IEVYUE9SVCA9PT09PSAqL1xyXG4vKipcclxuICogZXZlbnRMaXN0ZW5lcnMgaXMgYSBzaW5nbGV0b24gdGhhdCBuZWVkcyB0byBiZSBpbml0aWFsaXplZCB3aXRoIGFuIG9iamVjdCwgdGhhdCBob2xkcyBhbGwgdGhlIGNhbGxiYWNrcyB1c2VkIGluIHRoaXNcclxuICogY2xhc3MuIEkuZS5cclxuIHtcclxuICAgc2VsZWN0OiBmdW5jdGlvbigpIHt9LFxyXG4gICB6b29tOiBmdW5jdGlvbigpIHt9XHJcbiB9Ki9cclxuZXhwb3J0IGxldCBldmVudExpc3RlbmVycyA9IGZ1bmN0aW9uIGV2ZW50TGlzdGVuZXJNb2R1bGUobWFwLCBjYW52YXNFbGVtZW50KSB7XHJcbiAgaWYoc2luZ2xldG9uU2NvcGUpIHtcclxuICAgIHJldHVybiBzaW5nbGV0b25TY29wZTtcclxuICB9XHJcbiAgaWYoIW1hcCB8fCAhY2FudmFzRWxlbWVudCkge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKFwiZXZlbnRsaXN0ZW5lcnMgaW5pdGlhbGl6YXRpb24gcmVxdWlyZSBtYXAgY2FsbGJhY2tzIGFuZCBjYW52YXMgZWxlbWVudCBhcyBhcmd1bWVudHNcIik7XHJcbiAgfVxyXG5cclxuICB2YXIgbWFwQ0JzID0gbWFwLmV2ZW50Q0JzO1xyXG5cclxuICBzaW5nbGV0b25TY29wZSA9IHtcclxuICAgIHN0YXRlczoge31cclxuICB9O1xyXG5cclxuICBzaW5nbGV0b25TY29wZS50b2dnbGVGdWxsU2l6ZUxpc3RlbmVyID0gZnVuY3Rpb24gdG9nZ2xlRnVsbFNpemVMaXN0ZW5lcigpIHtcclxuICAgIGlmKHNpbmdsZXRvblNjb3BlLnN0YXRlcy5mdWxsU2l6ZSAhPT0gdHJ1ZSkge1xyXG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCBtYXBDQnMuZnVsbFNpemVDQik7XHJcbiAgICAgIHNpbmdsZXRvblNjb3BlLnN0YXRlcy5mdWxsU2l6ZSA9IHRydWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCBtYXBDQnMuZnVsbFNpemVDQik7XHJcbiAgICAgIHNpbmdsZXRvblNjb3BlLnN0YXRlcy5mdWxsU2l6ZSA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBtYXBDQnMuZnVsbFNpemU7XHJcbiAgfTtcclxuICBzaW5nbGV0b25TY29wZS50b2dnbGVGdWxsc2NyZWVuID0gZnVuY3Rpb24gdG9nZ2xlRnVsbHNjcmVlbigpIHtcclxuICAgIHNpbmdsZXRvblNjb3BlLnN0YXRlcy5mdWxsU2NyZWVuID0gbWFwQ0JzLmZ1bGxzY3JlZW4oKTtcclxuXHJcbiAgICByZXR1cm4gbWFwQ0JzLmZ1bGxzY3JlZW47XHJcbiAgfTtcclxuICBzaW5nbGV0b25TY29wZS50b2dnbGVab29tTGlzdGVuZXIgPSBmdW5jdGlvbiB0b2dnbGVab29tTGlzdGVuZXIoKSB7XHJcbiAgICBpZihzaW5nbGV0b25TY29wZS5zdGF0ZXMuem9vbSAhPT0gdHJ1ZSkge1xyXG4gICAgICBpZihpc01vYmlsZVNpdGUoKSkge1xyXG4gICAgICAgIHZhciBoYW1tZXIgICAgPSBuZXcgSGFtbWVyLk1hbmFnZXIoY2FudmFzRWxlbWVudCk7XHJcbiAgICAgICAgdmFyIHBpbmNoICAgICA9IG5ldyBIYW1tZXIuUGluY2goKTtcclxuICAgICAgICBoYW1tZXIuYWRkKHBpbmNoKTtcclxuICAgICAgICBoYW1tZXIub24oXCJwaW5jaFwiLCBtYXBDQnMuem9vbSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLyogSGFtc3RlciBoYW5kbGVzIHdoZWVsIGV2ZW50cyByZWFsbHkgbmljZWx5ICovXHJcbiAgICAgICAgSGFtc3RlcihjYW52YXNFbGVtZW50KS53aGVlbChtYXBDQnMuem9vbSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHNpbmdsZXRvblNjb3BlLnN0YXRlcy56b29tID0gdHJ1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmKGlzTW9iaWxlU2l0ZSgpKSB7XHJcbiAgICAgICAgaGFtbWVyLm9uKFwicGluY2hcIiwgbWFwQ0JzLnpvb20pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIEhhbXN0ZXIoY2FudmFzRWxlbWVudCkudW53aGVlbChtYXBDQnMuem9vbSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHNpbmdsZXRvblNjb3BlLnN0YXRlcy56b29tID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG1hcENCcy56b29tO1xyXG4gIH07XHJcbiAgc2luZ2xldG9uU2NvcGUudG9nZ2xlRHJhZ0xpc3RlbmVyID0gZnVuY3Rpb24gdG9nZ2xlRHJhZ0xpc3RlbmVyKCkge1xyXG4gICAgaWYoc2luZ2xldG9uU2NvcGUuc3RhdGVzLmRyYWcgIT09IHRydWUpIHtcclxuICAgICAgaWYoaXNNb2JpbGVTaXRlKCkpIHtcclxuICAgICAgICB2YXIgaGFtbWVyID0gbmV3IEhhbW1lci5NYW5hZ2VyKGNhbnZhc0VsZW1lbnQpO1xyXG4gICAgICAgIHZhciBwYW4gPSBuZXcgSGFtbWVyLlBhbih7XHJcbiAgICAgICAgICBwb2ludGVyczogMSxcclxuICAgICAgICAgIHRocmVzaG9sZDogNSxcclxuICAgICAgICAgIGRpcmVjdGlvbjogIEhhbW1lci5ESVJFQ1RJT05fQUxMIH0pO1xyXG4gICAgICAgIGhhbW1lci5hZGQocGFuKTtcclxuICAgICAgICBoYW1tZXIub24oXCJwYW5cIiwgbWFwQ0JzLmRyYWcpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNhbnZhc0VsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCBtYXBDQnMuZHJhZyk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHNpbmdsZXRvblNjb3BlLnN0YXRlcy5kcmFnID0gdHJ1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmKGlzTW9iaWxlU2l0ZSgpKSB7XHJcbiAgICAgICAgaGFtbWVyLm9mZihcInBhblwiLCBtYXBDQnMuZHJhZyk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY2FudmFzRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIG1hcENCcy5kcmFnKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgc2luZ2xldG9uU2NvcGUuc3RhdGVzLmRyYWcgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbWFwQ0JzLmRyYWc7XHJcbiAgfTtcclxuICBzaW5nbGV0b25TY29wZS50b2dnbGVTZWxlY3RMaXN0ZW5lciA9IGZ1bmN0aW9uIHRvZ2dsZVNlbGVjdExpc3RlbmVyKCkge1xyXG4gICAgaWYoc2luZ2xldG9uU2NvcGUuc3RhdGVzLnNlbGVjdCAhPT0gdHJ1ZSkge1xyXG4gICAgICBpZihpc01vYmlsZVNpdGUoKSkge1xyXG4gICAgICAgIHZhciBoYW1tZXIgICAgPSBuZXcgSGFtbWVyLk1hbmFnZXIoY2FudmFzRWxlbWVudCk7XHJcbiAgICAgICAgdmFyIHRhcCAgICAgPSBuZXcgSGFtbWVyLlRhcCgpO1xyXG4gICAgICAgIGhhbW1lci5hZGQodGFwKTtcclxuICAgICAgICBoYW1tZXIub24oXCJ0YXBcIiwgbWFwQ0JzLnNlbGVjdCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY2FudmFzRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIG1hcENCcy5zZWxlY3QpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBzaW5nbGV0b25TY29wZS5zdGF0ZXMuc2VsZWN0ID0gdHJ1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmKGlzTW9iaWxlU2l0ZSgpKSB7XHJcbiAgICAgICAgaGFtbWVyLm9mZihcInRhcFwiLCBtYXBDQnMuc2VsZWN0KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjYW52YXNFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgbWFwQ0JzLnNlbGVjdCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHNpbmdsZXRvblNjb3BlLnN0YXRlcy5zZWxlY3QgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbWFwQ0JzLnNlbGVjdDtcclxuICB9O1xyXG5cclxuICByZXR1cm4gc2luZ2xldG9uU2NvcGU7XHJcbn07XHJcblxyXG5mdW5jdGlvbiBpc01vYmlsZVNpdGUoKSB7XHJcbiAgcmV0dXJuIHR5cGVvZiBIYW1tZXIgIT0gJ3VuZGVmaW5lZCc7XHJcbn0iLCIndXNlIHN0cmljdCc7XHJcblxyXG4vKiogVGhlIGNvcmUgcGx1Z2luIGZvciB0aGUgMkQgbWFwIGVuZ2luZS4gSGFuZGxlcyBtb3ZpbmcgdGhlIG1hcCBieSBkcmFnZ2luZyB0aGUgbWFwLlxyXG4gKiBDb3JlIHBsdWdpbnMgY2FuIGFsd2F5cyBiZSBvdmVyd3JvdGUgaWYgbmVlZGVkXHJcbiAqXHJcbiAqIEByZXF1aXJlIEJyb3dzZXIgdGhhdCBzdXBwb3J0IHBvaW50ZXIgZXZlbnRzIG9yIFBvaW50ZXIgZXZlbnRzIHBvbHlmaWxsLCBzdWNoIGFzOiBodHRwczovL2dpdGh1Yi5jb20vanF1ZXJ5L1BFUFxyXG4gKiBAdG9kbyBTZWUgaWYgdGhpcyBwbHVnaW4gbmVlZCByZWZhY3RvcmluZyBhbmQgbW9yZSBkb2N1bWVudGF0aW9uICovXHJcblxyXG5pbXBvcnQgeyBldmVudExpc3RlbmVycyBhcyBldmVudExpc3RlbmVyTW9kIH0gZnJvbSAnLi4vZXZlbnRsaXN0ZW5lcnMnO1xyXG5pbXBvcnQgeyBtb3VzZVV0aWxzIH0gZnJvbSAnLi4vdXRpbHMvdXRpbHMnO1xyXG5cclxuZXhwb3J0IGxldCBtYXBfZHJhZyA9IChmdW5jdGlvbiBtYXBfZHJhZygpIHtcclxuICAvKiBGdW5jdGlvbiBmb3Igc2V0dGluZyBhbmQgZ2V0dGluZyB0aGUgbW91c2Ugb2Zmc2V0LiBQcml2YXRlIGZ1bmN0aW9ucyBkZWNsYXJlZCBib3R0b20gKi9cclxuICB2YXIgb2Zmc2V0Q29vcmRzID0gX29mZnNldENvb3JkcygpO1xyXG5cclxuICAvKiA9PT09PT09PT09PT09PT09PT09PT1cclxuICAgICBNT0RVTEUgQVBJIChpbiBzY29wZSlcclxuICAgICA9PT09PT09PT09PT09PT09PT09PT0gKi9cclxuICB2YXIgc2NvcGUgPSB7fTtcclxuICBzY29wZS5wbHVnaW5OYW1lID0gXCJtYXBfZHJhZ1wiO1xyXG5cclxuICAvKiogUmVxdWlyZWQgaW5pdCBmdW5jdGlvbnMgZm9yIHRoZSBwbHVnaW5cclxuICAqIEBwYXJhbSB7TWFwIG9iamVjdH0gbWFwT2JqIC0gdGhlIE1hcCBjbGFzcyBvYmplY3QgKi9cclxuICBzY29wZS5pbml0ID0gZnVuY3Rpb24obWFwKSB7XHJcbiAgICBpZihtYXAuZ2V0RW52aXJvbm1lbnQoKSA9PT0gXCJtb2JpbGVcIikge1xyXG4gICAgICBtYXAuZXZlbnRDQnMuZHJhZyA9IF9zdGFydERyYWdMaXN0ZW5lcl9tb2JpbGUobWFwKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIG1hcC5ldmVudENCcy5kcmFnID0gX3N0YXJ0RHJhZ0xpc3RlbmVyKG1hcCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyogU2luZ2xldG9uIHNob3VsZCBoYXZlIGJlZW4gaW5zdGFudGlhdGVkIGJlZm9yZSwgd2Ugb25seSByZXRyaWV2ZSBpdCB3aXRoIDAgcGFyYW1zICovXHJcbiAgICBldmVudExpc3RlbmVyTW9kKCkudG9nZ2xlRHJhZ0xpc3RlbmVyKCk7XHJcbiAgfTtcclxuXHJcbiAgLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgcHJpdmF0ZSBmdW5jdGlvbnMgcmV2ZWFsZWQgZm9yIHRlc3RpbmdcclxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0qL1xyXG4gIHNjb3BlLl9zdGFydERyYWdMaXN0ZW5lciA9IF9zdGFydERyYWdMaXN0ZW5lcjtcclxuXHJcbiAgcmV0dXJuIHNjb3BlO1xyXG5cclxuICAvKiogU3RhcnRzIHRoZSB3aG9sZSBmdW5jdGlvbmFsaXR5IG9mIHRoaXMgY2xhc3NcclxuICAgKiBAcGFyYW0ge2NyZWF0ZWpzLlN0YWdlfSB0b3BNb3N0U3RhZ2UgLSBjcmVhdGVqcy5TdGFnZSBvYmplY3QsIHRoYXQgaXMgdGhlIHRvcG1vc3Qgb24gdGhlIG1hcCAobWVhbnQgZm9yIGludGVyYWN0aW9uKS5cclxuICAgKiBAcGFyYW0ge01hcH0gbWFwIC0gVGhlIE1hcCBjbGFzcyBvYmplY3RcclxuICAgKi9cclxuICBmdW5jdGlvbiBfc3RhcnREcmFnTGlzdGVuZXIoIG1hcCApIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiBzdGFydERyYWcoZSkge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIG9mZnNldENvb3Jkcy5zZXRPZmZzZXQobW91c2VVdGlscy5nZXRFdmVudENvb3Jkc09uUGFnZShlKSk7XHJcbiAgICAgICAgX2FkZERyYWdMaXN0ZW5lcnMoKTtcclxuICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGUpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvKiogQHJlcXVpcmVzIG1hcCBvYmplY3RzIHRvIGJlIGFjY2Vzc2libGUgaW4gc2NvcGUgKi9cclxuICAgICAgZnVuY3Rpb24gX21vdXNldXBMaXN0ZW5lcigpIHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgX3JlbW92ZURyYWdMaXN0ZW5lcnMoKTtcclxuICAgICAgICBfbWFwTW92ZWQobWFwKTtcclxuICAgICAgfVxyXG4gICAgICAgIC8qKiBAcmVxdWlyZXMgbWFwIG9iamVjdHMgdG8gYmUgYWNjZXNzaWJsZSBpbiBzY29wZSAqL1xyXG5cclxuICAgICAgZnVuY3Rpb24gX2RyYWdMaXN0ZW5lcihlKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICB2YXIgZXZlbnRDb29yZHMgPSBtb3VzZVV0aWxzLmdldEV2ZW50Q29vcmRzT25QYWdlKGUpO1xyXG5cclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgIG1hcC5tYXBNb3ZlZCh0cnVlKTtcclxuXHJcbiAgICAgICAgaWYoZS5idXR0b25zID09PSAwKSB7XHJcbiAgICAgICAgICBfcmVtb3ZlRHJhZ0xpc3RlbmVycygpO1xyXG4gICAgICAgICAgLyogU28gdGhhdCB0aGUgZXZlbnRzIHdpbGwgc3RvcCB3aGVuIG1vdXNlIGlzIHVwLCBldmVuIHRob3VnaCBtb3VzZXVwIGV2ZW50IHdvdWxkbid0IGZpcmUgKi9cclxuICAgICAgICAgIF9tYXBNb3ZlZChtYXApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIG9mZnNldCA9IG9mZnNldENvb3Jkcy5nZXRPZmZzZXQoKTtcclxuICAgICAgICB2YXIgbW92ZWQgPSB7XHJcbiAgICAgICAgICB4OiBldmVudENvb3Jkcy54IC0gb2Zmc2V0LngsXHJcbiAgICAgICAgICB5OiBldmVudENvb3Jkcy55IC0gb2Zmc2V0LnlcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBpZihtb3ZlZC54ID4gMCB8fCBtb3ZlZC55ID4gMCB8fCBtb3ZlZC54IDwgMCB8fCBtb3ZlZC55IDwgMCkge1xyXG4gICAgICAgICAgbWFwLm1vdmVNYXAobW92ZWQpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBtYXAubWFwTW92ZWQoZmFsc2UpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgb2Zmc2V0Q29vcmRzLnNldE9mZnNldCh7XHJcbiAgICAgICAgICB4OiBldmVudENvb3Jkcy54LFxyXG4gICAgICAgICAgeTogZXZlbnRDb29yZHMueVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvKiBUaGUgbW91c2UgaGFzIGJlZW4gbW92ZWQgYWZ0ZXIgcHJlc3NpbmcuIFRoaXMgcHJldmVudCB0aGUgY2xpY2tcclxuICAgICAgICAgIGV2ZW50IHRvIGZpcmUgYXQgdGhlIHNhbWUgdGltZSB3aXRoIHRoZSBtb3VzZURvd24gLyBkcmFnZ2luZyBldmVudFxyXG4gICAgICAgICovXHJcbiAgICAgICAgLy9tYXAubW91c2VNb3ZlZCggdHJ1ZSApO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgZnVuY3Rpb24gX2FkZERyYWdMaXN0ZW5lcnMoKSB7XHJcbiAgICAgICAgbWFwLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIF9kcmFnTGlzdGVuZXIpO1xyXG4gICAgICAgIG1hcC5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgX21vdXNldXBMaXN0ZW5lcik7XHJcbiAgICAgIH1cclxuICAgICAgZnVuY3Rpb24gX3JlbW92ZURyYWdMaXN0ZW5lcnMoKSB7XHJcbiAgICAgICAgbWFwLmNhbnZhcy5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIF9kcmFnTGlzdGVuZXIpO1xyXG4gICAgICAgIG1hcC5jYW52YXMucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgX21vdXNldXBMaXN0ZW5lcik7XHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBfc3RhcnREcmFnTGlzdGVuZXJfbW9iaWxlKCBtYXAgKSB7XHJcbiAgICB2YXIgaW5pdGlhbGl6ZWQgPSBmYWxzZTtcclxuXHJcbiAgICByZXR1cm4gZnVuY3Rpb24gc3RhcnREcmFnKGUpIHtcclxuICAgICAgdmFyIGNvb3JkcyA9IGUuY2VudGVyO1xyXG5cclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgdHJ5IHtcclxuICAgICAgICBpZighaW5pdGlhbGl6ZWQpIHtcclxuICAgICAgICAgIG9mZnNldENvb3Jkcy5zZXRPZmZzZXQoe1xyXG4gICAgICAgICAgICB4OiBjb29yZHMueCxcclxuICAgICAgICAgICAgeTogY29vcmRzLnlcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgaW5pdGlhbGl6ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgbWFwLm1hcE1vdmVkKHRydWUpO1xyXG5cclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9IGVsc2UgaWYgKGUuaXNGaW5hbCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgaW5pdGlhbGl6ZWQgPSBmYWxzZTtcclxuICAgICAgICAgIG1hcC5tYXBNb3ZlZChmYWxzZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBtYXAubWFwTW92ZWQodHJ1ZSk7XHJcblxyXG4gICAgICAgIGxldCBvZmZzZXQgPSBvZmZzZXRDb29yZHMuZ2V0T2Zmc2V0KCk7XHJcbiAgICAgICAgbGV0IG1vdmVkID0ge1xyXG4gICAgICAgICAgICB4OiBjb29yZHMueCAtIG9mZnNldC54LFxyXG4gICAgICAgICAgICB5OiBjb29yZHMueSAtIG9mZnNldC55XHJcbiAgICAgICAgICB9O1xyXG5cclxuICAgICAgICBpZihtb3ZlZC54ICE9PSAwIHx8IG1vdmVkLnkgIT09IDApIHtcclxuICAgICAgICAgIG1hcC5tb3ZlTWFwKG1vdmVkKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG9mZnNldENvb3Jkcy5zZXRPZmZzZXQoe1xyXG4gICAgICAgICAgeDogY29vcmRzLngsXHJcbiAgICAgICAgICB5OiBjb29yZHMueVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZSk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgfVxyXG5cclxuICAvKiA9PT09PT09PT09PT09PT09PVxyXG4gICAgIFByaXZhdGUgZnVuY3Rpb25zXHJcbiAgICAgPT09PT09PT09PT09PT09PT0gKi9cclxuICAvKiogRnVuY3Rpb24gZm9yIHNldHRpbmcgYW5kIGdldHRpbmcgdGhlIG1vdXNlIG9mZnNldC4gKi9cclxuICBmdW5jdGlvbiBfb2Zmc2V0Q29vcmRzKCkge1xyXG4gICAgdmFyIHNjb3BlID0ge307XHJcbiAgICB2YXIgb2Zmc2V0Q29vcmRzO1xyXG5cclxuICAgIHNjb3BlLnNldE9mZnNldCA9IGZ1bmN0aW9uIHNldE9mZnNldChjb29yZHMpIHtcclxuICAgICAgcmV0dXJuIG9mZnNldENvb3JkcyA9IGNvb3JkcztcclxuICAgIH07XHJcbiAgICBzY29wZS5nZXRPZmZzZXQgPSBmdW5jdGlvbiBnZXRPZmZzZXQoKSB7XHJcbiAgICAgIHJldHVybiBvZmZzZXRDb29yZHM7XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiBzY29wZTtcclxuICB9O1xyXG5cclxuICAvKiBXaXRob3V0IHRoaXMsIHRoZSBvdGhlciBldmVudExpc3RlbmVycyBtaWdodCBmaXJlIGluYXBwcm9wcmlhdGUgZXZlbnRzLiAqL1xyXG4gIGZ1bmN0aW9uIF9tYXBNb3ZlZChtYXApIHtcclxuICAgIHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uICgpe1xyXG4gICAgICBtYXAubWFwTW92ZWQoZmFsc2UpO1xyXG4gICAgfSwgMSk7XHJcbiAgfVxyXG59KSgpOyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbi8qKiBUZXJyYWluIHRpbGUgbGlrZSBkZXNlcnQgb3IgbW91bnRhaW4sIG5vbi1tb3ZhYmxlIGFuZCBjYWNoZWFibGUuIE5vcm1hbGx5LCBidXQgbm90IG5lY2Vzc2FyaWx5LCB0aGVzZSBhcmVcclxuICogaW5oZXJpdGVkLCBkZXBlbmRpbmcgb24gdGhlIG1hcCB0eXBlLiBGb3IgZXhhbXBsZSB5b3UgbWlnaHQgd2FudCB0byBhZGQgc29tZSBjbGljayBhcmVhIGZvciB0aGVzZSAqL1xyXG5cclxuaW1wb3J0IHsgT2JqZWN0X3Nwcml0ZSB9IGZyb20gJy4uL3BpeGlfT2JqZWN0JztcclxuXHJcbmV4cG9ydCBjbGFzcyBPYmplY3Rfc3ByaXRlX3RlcnJhaW4gZXh0ZW5kcyBPYmplY3Rfc3ByaXRlIHtcclxuICBjb25zdHJ1Y3Rvcihjb29yZHMsIGRhdGEsIGN1cnJGcmFtZU51bWJlciwgdGhyb3dTaGFkb3dPcHRpb25zKSB7XHJcbiAgICBzdXBlcihjb29yZHMsIGRhdGEsIGN1cnJGcmFtZU51bWJlciwgdGhyb3dTaGFkb3dPcHRpb25zKTtcclxuXHJcbiAgICB0aGlzLm5hbWUgPSBcIkRlZmF1bHRUZXJyYWluT2JqZWN0XCI7XHJcbiAgICB0aGlzLnR5cGUgPSBcInRlcnJhaW5cIjtcclxuICAgIHRoaXMuaGlnaGxpZ2h0YWJsZSA9IGZhbHNlO1xyXG4gICAgdGhpcy5zZWxlY3RhYmxlID0gZmFsc2U7XHJcbiAgfVxyXG59IiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuLyoqIE1hcCB1bml0IGxpa2UgaW5mYW50cnkgb3Igd29ya2VyLCB1c3VhbGx5IHNvbWV0aGluZyB3aXRoIGFjdGlvbnMgb3IgbW92YWJsZS4gTm9ybWFsbHksIGJ1dCBub3QgbmVjZXNzYXJpbHksIHRoZXNlIGFyZVxyXG4gKiBpbmhlcml0ZWQsIGRlcGVuZGluZyBvbiB0aGUgbWFwIHR5cGUuIEZvciBleGFtcGxlIHlvdSBtaWdodCB3YW50IHRvIGFkZCBzb21lIGNsaWNrIGFyZWEgZm9yIHRoZXNlICovXHJcblxyXG5pbXBvcnQgeyBPYmplY3Rfc3ByaXRlIH0gZnJvbSAnLi4vcGl4aV9PYmplY3QnO1xyXG5cclxuZXhwb3J0IGNsYXNzIE9iamVjdF9zcHJpdGVfdW5pdCBleHRlbmRzIE9iamVjdF9zcHJpdGUge1xyXG4gIGNvbnN0cnVjdG9yKGNvb3JkcywgZGF0YSwgY3VyckZyYW1lTnVtYmVyLCB0aHJvd1NoYWRvd09wdGlvbnMpIHtcclxuICAgIHN1cGVyKGNvb3JkcywgZGF0YSwgY3VyckZyYW1lTnVtYmVyLCB0aHJvd1NoYWRvd09wdGlvbnMpO1xyXG5cclxuICAgIHRoaXMubmFtZSA9IFwiRGVmYXVsdFVuaXRPYmplY3RzXCI7XHJcbiAgICB0aGlzLnR5cGUgPSBcInVuaXRcIjtcclxuICAgIHRoaXMuaGlnaGxpZ2h0YWJsZSA9IHRydWU7XHJcbiAgICB0aGlzLnNlbGVjdGFibGUgPSB0cnVlO1xyXG4gICAgdGhpcy5hY3Rpb25zID0ge1xyXG4gICAgICBtb3ZlOiBbXSxcclxuICAgICAgYXR0YWNrOiBbXVxyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLnRocm93U2hhZG93ID0gdHJ1ZTtcclxuICB9XHJcbiAgZG9BY3Rpb24odHlwZSkge1xyXG4gICAgdGhpcy5hY3Rpb25zW3R5cGVdLmZvckVhY2goYWN0aW9uID0+IHtcclxuICAgICAgYWN0aW9uKCk7XHJcbiAgICB9KTtcclxuICB9XHJcbiAgYWRkQWN0aW9uVHlwZSh0eXBlKSB7XHJcbiAgICB0aGlzLmFjdGlvbnNbdHlwZV0gPSB0aGlzLmFjdGlvbnNbdHlwZV0gfHwgW107XHJcbiAgfVxyXG4gIGFkZENhbGxiYWNrVG9BY3Rpb24odHlwZSwgY2IpIHtcclxuICAgIHRoaXMuYWN0aW9uc1t0eXBlXS5wdXNoKGNiKTtcclxuICB9XHJcbn0iLCIvKiogTWFwIGlzIHRoZSBtYWluIGNsYXNzIGZvciBjb25zdHJ1Y3RpbmcgMkQgbWFwIGZvciBzdHJhdGVneSBnYW1lc1xyXG4gKlxyXG4gKiBNYXAgaXMgaW5zdGFudGlhdGVkIGFuZCB0aGVuIGluaXRpYWxpemVkIHdpdGggaW5pdC1tZXRob2QuXHJcbiAqXHJcbiAqIFBsdWdpbnMgY2FuIGJlIGFkZGVkIHdpdGggYWN0aXZhdGVQbHVnaW5zLW1ldGhvZCBieSBwcm9kaXZpbmcgaW5pdChtYXApIG1ldGhvZCBpbiB0aGUgcGx1Z2luLiBQbHVnaW5zIGFyZSBhbHdheXNcclxuICogZnVuY3Rpb25zLCBub3Qgb2JqZWN0cyB0aGF0IGFyZSBpbnN0YW50aWF0ZWQuIFBsdWdpbnMgYXJlIHN1cHBvc2VkIHRvIGV4dGVuZCB0aGUgbWFwIG9iamVjdCBvciBhbnl0aGluZyBpbiBpdCB2aWFcclxuICogaXQncyBwdWJsaWMgbWV0aG9kcy5cclxuICpcclxuICogQHJlcXVpcmUgY3JlYXRlanMgZnJhbWV3b3JrIGluIGdsb2JhbCBuYW1lc3BhY2VcclxuICogQHJlcXVpcmUgY2FudmFzIEhUTUw1LWVsZW1lbnQgdG8gd29yay5cclxuICpcclxuICogQHJlcXVpcmUgUGx1Z2lucyB0aGF0IHVzZSBldmVudGxpc3RlbmVyIGJ5IGRlZmF1bHQsIHVzZSBwb2ludGVyIGV2ZW50cyBwb2x5ZmlsbCwgc3VjaCBhczogaHR0cHM6Ly9naXRodWIuY29tL2pxdWVyeS9QRVBcclxuICogUGx1Z2lucyBhbmQgZXZlbnRsaXN0ZW5lciBjYW4gYmUgb3ZlcnJpZGVuLCBidXQgdGhleSB1c2VyIHBvaW50ZXIgZXZlbnRzIGJ5IGRlZmF1bHQgKGVpdGhlciB0aGUgYnJvd3NlciBtdXN0IHN1cHBvcnRcclxuICogdGhlbSBvciB1c2UgcG9seWZpbGwpICovXHJcblxyXG4ndXNlIHN0cmljdCc7XHJcblxyXG4vKiA9PT09PT0gT3duIG1vZHVsZSBpbXBvcnRzID09PT09PSAqL1xyXG5pbXBvcnQgeyBNYXBfbGF5ZXIgfSBmcm9tICcuL3BpeGlfTWFwX2xheWVyJztcclxuaW1wb3J0IHsgcmVzaXplVXRpbHMsIGVudmlyb25tZW50RGV0ZWN0aW9uIH0gZnJvbSAnLi91dGlscy91dGlscyc7XHJcbmltcG9ydCB7IGV2ZW50TGlzdGVuZXJzIH0gZnJvbSAnLi9ldmVudGxpc3RlbmVycyc7XHJcbmltcG9ydCB7IE9iamVjdE1hbmFnZXIgfSBmcm9tICcuL3BpeGlfT2JqZWN0TWFuYWdlcic7XHJcblxyXG52YXIgX2RyYXdNYXBPbk5leHRUaWNrID0gZmFsc2U7XHJcbnZhciBldmVudGxpc3RlbmVycywgX3N0YXRpY0xheWVyLCBfbW92YWJsZUxheWVyLCBfcmVuZGVyZXI7XHJcblxyXG5leHBvcnQgY2xhc3MgTWFwIHtcclxuICAvKipcclxuICAgKiBAcGFyYW0ge0RPTSBDYW52YXMgZWxlbWVudH0gY2FudmFzIC0gQ2FudmFzIHVzZWQgYnkgdGhlIG1hcFxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gZGlmZmVyZW50IG9wdGlvbnMgZm9yIHRoZSBtYXAgdG8gYmUgZ2l2ZW4uIEZvcm1hdDpcclxuICAgKiB7IGJvdW5kczogeyB3aWR0aDogTnVtYmVyLCBoZWlnaHQ6IE51bWJlcn0sIHJlbmRlcmVyOiB7fSB9XHJcbiAgICogQHJldHVybiBNYXAgaW5zdGFuY2VcclxuXHJcbiAgIEB0b2RvLCBzZXQgZGVmYXVsdCB2YWx1ZXMgZm9yIGdpdmVuIGFuZCByZXF1aXJlZCBvcHRpb25zICovXHJcbiAgY29uc3RydWN0b3IoY2FudmFzLCBvcHRpb25zID0geyBib3VuZHM6IHt9LCByZW5kZXJlcjoge30gfSkge1xyXG4gICAgaWYoIWNhbnZhcykge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IodGhpcy5jb25zdHJ1Y3Rvci5uYW1lICsgXCIgbmVlZHMgY2FudmFzIVwiKTtcclxuICAgIH1cclxuICAgIGlmKHR5cGVvZiBjYW52YXMgPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgY2FudmFzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihjYW52YXMpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY2FudmFzID0gY2FudmFzO1xyXG4gICAgfVxyXG5cclxuICAgIF9yZW5kZXJlciA9IFBJWEkuYXV0b0RldGVjdFJlbmRlcmVyKG9wdGlvbnMuYm91bmRzLndpZHRoLCBvcHRpb25zLmJvdW5kcy5oZWlnaHQsIG9wdGlvbnMucmVuZGVyZXIpO1xyXG4gICAgLyogV2UgaGFuZGxlIGFsbCB0aGUgZXZlbnRzIG91cnNlbHZlcyB0aHJvdWdoIGFkZEV2ZW50TGlzdGVuZXJzLW1ldGhvZCBvbiBjYW52YXMsIHNvIGRlc3Ryb3kgcGl4aSBuYXRpdmUgbWV0aG9kICovXHJcbiAgICBfcmVuZGVyZXIucGx1Z2lucy5pbnRlcmFjdGlvbi5kZXN0cm95KCk7XHJcbiAgICBjYW52YXMucGFyZW50RWxlbWVudC5yZXBsYWNlQ2hpbGQoX3JlbmRlcmVyLnZpZXcsIGNhbnZhcyk7XHJcbiAgICB0aGlzLmNhbnZhcyA9IF9yZW5kZXJlci52aWV3O1xyXG5cclxuICAgIF9zdGF0aWNMYXllciA9IG5ldyBNYXBfbGF5ZXIoXCJzdGF0aWNMYXllclwiLCBvcHRpb25zLnN1YkNvbnRhaW5lcnMsIG9wdGlvbnMuc3RhcnRDb29yZCwgX3JlbmRlcmVyKTtcclxuICAgIF9tb3ZhYmxlTGF5ZXIgPSBuZXcgTWFwX2xheWVyKFwibW92YWJsZUxheWVyXCIsIG9wdGlvbnMuc3ViQ29udGFpbmVycywgb3B0aW9ucy5zdGFydENvb3JkKTtcclxuICAgIF9zdGF0aWNMYXllci5hZGRDaGlsZChfbW92YWJsZUxheWVyKTtcclxuICAgIHRoaXMucGx1Z2lucyA9IG5ldyBTZXQoKTtcclxuICAgIHRoaXMubWFwU2l6ZSA9IG9wdGlvbnMubWFwU2l6ZSB8fCB7IHg6MCwgeTowIH07XHJcbiAgICB0aGlzLmV2ZW50Q0JzID0ge1xyXG4gICAgICBmdWxsU2l6ZTogcmVzaXplVXRpbHMuc2V0VG9GdWxsU2l6ZSh0aGlzLmNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIikpLFxyXG4gICAgICBmdWxsc2NyZWVuOiByZXNpemVVdGlscy50b2dnbGVGdWxsU2NyZWVuLFxyXG4gICAgICBzZWxlY3Q6IG51bGwsXHJcbiAgICAgIGRyYWc6IG51bGwsXHJcbiAgICAgIHpvb206IG51bGxcclxuICAgIH07XHJcbiAgICB0aGlzLmlzRnVsbHNpemUgPSBmYWxzZTtcclxuICAgIHRoaXMuX21hcEluTW92ZSA9IGZhbHNlO1xyXG4gICAgdGhpcy5vYmplY3RNYW5hZ2VyID0gbmV3IE9iamVjdE1hbmFnZXIoX3JlbmRlcmVyKTsgLy8gRmlsbCB0aGlzIHdpdGggcXVhZHRyZWVzIG9yIHN1Y2hcclxuXHJcbiAgICB0aGlzLmVudmlyb25tZW50ID0gZW52aXJvbm1lbnREZXRlY3Rpb24uaXNNb2JpbGUoKSA/IFwibW9iaWxlXCIgOiBcImRlc2t0b3BcIjtcclxuICB9XHJcbiAgLyoqIGluaXRpYWxpemF0aW9uIG1ldGhvZFxyXG4gICAqIEBwYXJhbSBbQXJyYXldIHBsdWdpbnMgLSBQbHVnaW5zIHRvIGJlIGFjdGl2YXRlZCBmb3IgdGhlIG1hcC4gTm9ybWFsbHkgeW91IHNob3VsZCBnaXZlIHRoZSBwbHVnaW5zIGhlcmUgaW5zdGVhZCBvZlxyXG4gICAqIHNlcGFyYXRlbHkgcGFzc2luZyB0aGVtIHRvIGFjdGl2YXRlUGx1Z2lucyBtZXRob2RcclxuICAgKiBAcGFyYW0ge3g6ID8geTo/fSBjb29yZCAtIFN0YXJ0aW5nIGNvb3JkaW5hdGVzIGZvciB0aGUgbWFwXHJcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gdGlja0NCIC0gY2FsbGJhY2sgZnVuY3Rpb24gZm9yIHRpY2suIFRpY2sgY2FsbGJhY2sgaXMgaW5pdGlhdGVkIGluIGV2ZXJ5IGZyYW1lLiBTbyBtYXAgZHJhd3MgaGFwcGVuXHJcbiAgICogZHVyaW5nIHRpY2tzXHJcbiAgICogQHJldHVybiB0aGUgY3VycmVudCBtYXAgaW5zdGFuY2UgKi9cclxuICBpbml0KHBsdWdpbnMsIGNvb3JkLCB0aWNrQ0IpIHtcclxuICAgIHRoaXMuc2V0RnVsbHNpemUoKTtcclxuXHJcbiAgICBldmVudGxpc3RlbmVycyA9IGV2ZW50TGlzdGVuZXJzKHRoaXMsIHRoaXMuY2FudmFzKTtcclxuXHJcbiAgICBpZiAocGx1Z2lucykge1xyXG4gICAgICB0aGlzLmFjdGl2YXRlUGx1Z2lucyhwbHVnaW5zKTtcclxuICAgIH1cclxuXHJcbiAgICBpZihjb29yZCkge1xyXG4gICAgICBfbW92YWJsZUxheWVyLnggPSBjb29yZC54O1xyXG4gICAgICBfbW92YWJsZUxheWVyLnkgPSBjb29yZC55O1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuZHJhd09uTmV4dFRpY2soKTtcclxuICAgIF9kZWZhdWx0VGljayh0aGlzLCBQSVhJLnRpY2tlci5zaGFyZWQpO1xyXG4gICAgdGlja0NCICYmIHRoaXMuY3VzdG9tVGlja09uKHRpY2tDQik7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG4gIC8qKiBUaGUgY29ycmVjdCB3YXkgdG8gdXBkYXRlIC8gcmVkcmF3IHRoZSBtYXAuIENoZWNrIGhhcHBlbnMgYXQgZXZlcnkgdGljayBhbmQgdGh1cyBpbiBldmVyeSBmcmFtZS5cclxuICAgKiBAcmV0dXJuIHRoZSBjdXJyZW50IG1hcCBpbnN0YW5jZSAqL1xyXG4gIGRyYXdPbk5leHRUaWNrKCkge1xyXG4gICAgX2RyYXdNYXBPbk5leHRUaWNrID0gdHJ1ZTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcbiAgLyoqIFRoZSBjb3JyZWN0IHdheSB0byB1cGRhdGUgLyByZWRyYXcgdGhlIG1hcC4gQ2hlY2sgaGFwcGVucyBhdCBldmVyeSB0aWNrIGFuZCB0aHVzIGluIGV2ZXJ5IGZyYW1lLlxyXG4gICAqIEByZXR1cm4gdGhlIGN1cnJlbnQgbWFwIGluc3RhbmNlICovXHJcbiAgZ2V0TGF5ZXJzV2l0aEF0dHJpYnV0ZXMoYXR0cmlidXRlLCB2YWx1ZSkge1xyXG4gICAgcmV0dXJuIF9zdGF0aWNMYXllci5jaGlsZHJlblswXS5jaGlsZHJlbi5maWx0ZXIobGF5ZXIgPT4ge1xyXG4gICAgICByZXR1cm4gbGF5ZXJbYXR0cmlidXRlXSA9PT0gdmFsdWU7XHJcbiAgICB9KTtcclxuICB9XHJcbiAgY3JlYXRlTGF5ZXIobmFtZSwgc3ViQ29udGFpbmVycywgY29vcmQpIHtcclxuICAgIHZhciBsYXllciA9IG5ldyBNYXBfbGF5ZXIobmFtZSwgc3ViQ29udGFpbmVycywgY29vcmQpO1xyXG5cclxuICAgIHJldHVybiBsYXllcjtcclxuICB9XHJcbiAgLyoqIEFsbCBwYXJhbWV0ZXJzIGFyZSBwYXNzZWQgdG8gTWFwX2xheWVyIGNvbnN0cnVjdG9yXHJcbiAgICogQHJldHVybiBjcmVhdGVkIE1hcF9sYXllciBpbnN0YW5jZSAqL1xyXG4gIGFkZExheWVyKG5hbWUsIHN1YkNvbnRhaW5lcnMsIGNvb3JkKSB7XHJcbiAgICB2YXIgbGF5ZXIgPSBuZXcgTWFwX2xheWVyKG5hbWUsIHN1YkNvbnRhaW5lcnMsIGNvb3JkKTtcclxuXHJcbiAgICBfbW92YWJsZUxheWVyLmFkZENoaWxkKGxheWVyKTtcclxuXHJcbiAgICByZXR1cm4gbGF5ZXI7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7TWFwX2xheWVyfSBsYXllciAtIHRoZSBsYXllciBvYmplY3QgdG8gYmUgcmVtb3ZlZCAqL1xyXG4gIHJlbW92ZUxheWVyKGxheWVyKSB7XHJcbiAgICBfbW92YWJsZUxheWVyLnJlbW92ZUNoaWxkKGxheWVyKTtcclxuXHJcbiAgICByZXR1cm4gbGF5ZXI7XHJcbiAgfVxyXG4gIC8qKiBAcmV0dXJuIGxheWVyIHdpdGggdGhlIHBhc3NlZCBsYXllciBuYW1lICovXHJcbiAgZ2V0TGF5ZXJOYW1lZChuYW1lKSB7XHJcbiAgICByZXR1cm4gX21vdmFibGVMYXllci5nZXRDaGlsZE5hbWVkKG5hbWUpO1xyXG4gIH1cclxuICAvKipcclxuICAgKiBAcGFyYW0ge3g6IE51bWJlciwgeTogTnVtYmVyfSBjb29yZCAtIFRoZSBhbW91bnQgb2YgeCBhbmQgeSBjb29yZGluYXRlcyB3ZSB3YW50IHRoZSBtYXAgdG8gbW92ZS4gSS5lLiB7IHg6IDUsIHk6IDAgfVxyXG4gICAqIHdpdGggdGhpcyB3ZSB3YW50IHRoZSBtYXAgdG8gbW92ZSBob3Jpem9udGFsbHkgNSBwaXplbHMgYW5kIHZlcnRpY2FsbHkgc3RheSBhdCB0aGUgc2FtZSBwb3NpdGlvbi5cclxuICAgKiBAcmV0dXJuIHRoaXMgbWFwIGluc3RhbmNlICovXHJcbiAgbW92ZU1hcChjb29yZGluYXRlcykge1xyXG4gICAgdmFyIHJlYWxDb29yZGluYXRlcyA9IHtcclxuICAgICAgeDogY29vcmRpbmF0ZXMueCAvIF9zdGF0aWNMYXllci5nZXRTY2FsZSgpLFxyXG4gICAgICB5OiBjb29yZGluYXRlcy55IC8gX3N0YXRpY0xheWVyLmdldFNjYWxlKClcclxuICAgIH07XHJcbiAgICBfbW92YWJsZUxheWVyLm1vdmUocmVhbENvb3JkaW5hdGVzKTtcclxuICAgIHRoaXMuZHJhd09uTmV4dFRpY2soKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcbiAgLyoqIENhY2hlIHRoZSBtYXAuIFRoaXMgcHJvdmlkZXMgc2lnbmlmaWNhbnQgcGVyZm9ybWFuY2UgYm9vc3QsIHdoZW4gdXNlZCBjb3JyZWN0bHkuIGNhY2hlTWFwIGl0ZXJhdGVzIHRocm91Z2ggYWxsIHRoZVxyXG4gICAqIGxheWVyIG9uIHRoZSBtYXAgYW5kIGNhY2hlcyB0aGUgb25lcyB0aGF0IHJldHVybiB0cnVlIGZyb20gZ2V0Q2FjaGVFbmFibGVkLW1ldGhvZC5cclxuICAgKiBAcGFyYW0ge3g6IE51bWJlciwgeTogTnVtYmVyfSBjb29yZCAtIFRoZSBhbW91bnQgb2YgeCBhbmQgeSBjb29yZGluYXRlcyB3ZSB3YW50IHRoZSBtYXAgdG8gbW92ZS4gSS5lLiB7IHg6IDUsIHk6IDAgfVxyXG4gICAqIHdpdGggdGhpcyB3ZSB3YW50IHRoZSBtYXAgdG8gbW92ZSBob3Jpem9udGFsbHkgNSBwaXplbHMgYW5kIHZlcnRpY2FsbHkgc3RheSBhdCB0aGUgc2FtZSBwb3NpdGlvbi5cclxuICAgKiBAcmV0dXJuIHRoaXMgbWFwIGluc3RhbmNlICovXHJcbiAgY2FjaGVNYXAoKSB7XHJcbiAgICBpZihfbW92YWJsZUxheWVyLmdldENhY2hlRW5hYmxlZCgpKSB7XHJcbiAgICAgIF9tb3ZhYmxlTGF5ZXIuY2FjaGVBc0JpdG1hcCA9IHRydWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBfbW92YWJsZUxheWVyLmNoaWxkcmVuLmZvckVhY2goY2hpbGQgPT4ge1xyXG4gICAgICAgIGlmKGNoaWxkLmdldENhY2hlRW5hYmxlZCgpKSB7XHJcbiAgICAgICAgICBjaGlsZC5jYWNoZUFzQml0bWFwID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuICAvKiogUmVzaXplIHRoZSBjYW52YXMgdG8gZmlsbCB0aGUgd2hvbGUgYnJvd3NlciBhcmVhLiBVc2VzIHRoaXMuZXZlbnRDQnMuZnVsbHNpemUgYXMgY2FsbGJhY2ssIHNvIHdoZW4geW91IG5lZWQgdG8gb3ZlcndyaXRlXHJcbiAgdGhlIGV2ZW50bGlzdGVuZXIgY2FsbGJhY2sgdXNlIHRoaXMuZXZlbnRDQnMgKi9cclxuICB0b2dnbGVGdWxsU2l6ZSgpIHtcclxuICAgIGV2ZW50bGlzdGVuZXJzLnRvZ2dsZUZ1bGxTaXplTGlzdGVuZXIoKTtcclxuICB9XHJcbiAgLyoqIFRvZ2dsZXMgZnVsbHNjcmVlbiBtb2RlLiBVc2VzIHRoaXMuZXZlbnRDQnMuZnVsbHNjcmVlbiBhcyBjYWxsYmFjaywgc28gd2hlbiB5b3UgbmVlZCB0byBvdmVyd3JpdGVcclxuICB0aGUgZXZlbnRsaXN0ZW5lciBjYWxsYmFjayB1c2UgdGhpcy5ldmVudENCcyAqL1xyXG4gIHRvZ2dsZUZ1bGxTY3JlZW4gKCkge1xyXG4gICAgZXZlbnRsaXN0ZW5lcnMudG9nZ2xlRnVsbFNjcmVlbigpO1xyXG4gIH1cclxuICAvKiogQWN0aXZhdGUgcGx1Z2lucyBmb3IgdGhlIG1hcC4gUGx1Z2lucyBuZWVkIC5wbHVnaW5OYW1lIHByb3BlcnR5IGFuZCAuaW5pdC1tZXRob2RcclxuICBAcGFyYW0gW0FycmF5XSBwbHVnaW5zQXJyYXkgLSBBcnJheSB0aGF0IGNvbnNpc3RzIG9mIHRoZSBwbHVnaW4gbW9kdWxlcyAqL1xyXG4gIGFjdGl2YXRlUGx1Z2lucyhwbHVnaW5zQXJyYXkgPSBbXSkge1xyXG4gICAgdmFyIGN1cnJlbnRQbHVnaW5OYW1lRm9yRXJyb3JzO1xyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgIHBsdWdpbnNBcnJheS5mb3JFYWNoKHBsdWdpbiA9PiB7XHJcbiAgICAgICAgaWYoIXBsdWdpbiB8fCAhcGx1Z2luLnBsdWdpbk5hbWUpIHtcclxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInBsdWdpbiBvciBwbHVnaW4ucGx1Z2luTmFtZSBtaXNzaW5nXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjdXJyZW50UGx1Z2luTmFtZUZvckVycm9ycyA9IHBsdWdpbi5wbHVnaW5OYW1lO1xyXG5cclxuICAgICAgICBpZih0aGlzLnBsdWdpbnMuYWRkKHBsdWdpbikpIHtcclxuICAgICAgICAgIHBsdWdpbi5pbml0KHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9IGNhdGNoKGUpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJBbiBlcnJvciBpbml0aWFsaXppbmcgcGx1Z2luIFwiICsgY3VycmVudFBsdWdpbk5hbWVGb3JFcnJvcnMsIGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuICAvKiogZ2V0dGVyIGFuZCBzZXR0ZXIgZm9yIGRldGVjdGluZyBpZiBtYXAgaXMgbW92ZWQgYW5kIHNldHRpbmcgdGhlIG1hcHMgc3RhdHVzIGFzIG1vdmVkIG9yIG5vdCBtb3ZlZCAqL1xyXG4gIG1hcE1vdmVkKHllc09yTm8pIHtcclxuICAgIGlmKHllc09yTm8gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLl9tYXBJbk1vdmUgPSB5ZXNPck5vO1xyXG4gICAgICByZXR1cm4geWVzT3JObztcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcy5fbWFwSW5Nb3ZlO1xyXG4gIH1cclxuICBzZXRQcm90b3R5cGUocHJvcGVydHksIHZhbHVlKSB7XHJcbiAgICAvL3RoaXMuc2V0UHJvdG90eXBlT2YocHJvcGVydHksIHZhbHVlKTtcclxuICAgIC8vdGhpc1twcm9wZXJ0eV0gPSB2YWx1ZTtcclxuICAgIC8vdGhpcy5wcm90b3R5cGVbcHJvcGVydHldID0gdmFsdWU7XHJcbiAgICBNYXAucHJvdG90eXBlW3Byb3BlcnR5XSA9IHZhbHVlO1xyXG4gIH1cclxuICBzZXRGdWxsc2l6ZSgpIHtcclxuICAgIGlmKHRoaXMuaXNGdWxsc2l6ZSkge1xyXG4gICAgICBzZXRGdWxsc2l6ZWRNYXAoX3JlbmRlcmVyKTtcclxuXHJcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgc2V0RnVsbHNpemVkTWFwKF9yZW5kZXJlcik7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuaXNGdWxsc2l6ZSA9IHRydWU7XHJcbiAgfVxyXG4gIHNldEVudmlyb25tZW50KGVudikge1xyXG4gICAgdGhpcy5lbnZpcm9ubWVudCA9IGVudjtcclxuICB9XHJcbiAgLyoqIEByZXR1cm4geyB4OiBOdW1iZXIsIHk6IE51bWJlciB9LCBjdXJyZW50IGNvb3JkaW5hdGVzIGZvciB0aGUgbWFwICovXHJcbiAgZ2V0TWFwUG9zaXRpb24oKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICB4OiBfbW92YWJsZUxheWVyLngsXHJcbiAgICAgIHk6IF9tb3ZhYmxlTGF5ZXIueVxyXG4gICAgfTtcclxuICB9XHJcbiAgZ2V0RW52aXJvbm1lbnQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5lbnZpcm9ubWVudDtcclxuICB9XHJcbiAgZ2V0Wm9vbUxheWVyKCkge1xyXG4gICAgcmV0dXJuIF9zdGF0aWNMYXllcjtcclxuICB9XHJcbiAgZ2V0U2NhbGUoKSB7XHJcbiAgICByZXR1cm4gX3N0YXRpY0xheWVyLmdldFNjYWxlKCk7XHJcbiAgfVxyXG4gIGdldFVJTGF5ZXIoKSB7XHJcbiAgICByZXR1cm4gX3N0YXRpY0xheWVyO1xyXG4gIH1cclxuICBnZXRNb3ZhYmxlTGF5ZXIoKSB7XHJcbiAgICByZXR1cm4gX21vdmFibGVMYXllcjtcclxuICB9XHJcbiAgZ2V0UmVuZGVyZXIoKSB7XHJcbiAgICByZXR1cm4gX3JlbmRlcmVyO1xyXG4gIH1cclxuICBnZXRTdGFnZSgpIHtcclxuICAgIHJldHVybiBfc3RhdGljTGF5ZXI7XHJcbiAgfVxyXG4gIGdldFNpemUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5tYXBTaXplO1xyXG4gIH1cclxuICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gICAqKioqKioqIEFQSVMgVEhST1VHSCBQTFVHSU5TICoqKioqKioqXHJcbiAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuICB6b29tSW4oKSB7IHJldHVybiBcIm5vdEltcGxlbWVudGVkWWV0LiBBY3RpdmF0ZSB3aXRoIHBsdWdpblwiOyB9XHJcbiAgem9vbU91dCgpIHsgcmV0dXJuIFwibm90SW1wbGVtZW50ZWRZZXQuIEFjdGl2YXRlIHdpdGggcGx1Z2luXCI7IH1cclxuICAvKiogU2VsZWN0aW9uIG9mIG9iamVjdHMgb24gdGhlIG1hcC4gRm9yIG1vcmUgZWZmaWNpZW50IHNvbHV0aW9uLCB3ZSBpbXBsZW1lbnQgdGhlc2UgQVBJcyB0aG9ydWdoIHBsdWdpbi5cclxuICAgKiBEZWZhdWx0IHVzZXMgcXVhZHRyZWVcclxuICAgKiBAcGFyYW0geyB4OiBOdW1iZXIsIHk6IE51bWJlciB9IGNvb3JkaW5hdGVzIHRvIHNlYXJjaCBmcm9tXHJcbiAgICogQHBhcmFtIHsgU3RyaW5nIH0gdHlwZSB0eXBlIG9mIHRoZSBvYmplY3RzIHRvIHNlYXJjaCBmb3IgKi9cclxuICBhZGRPYmplY3RzRm9yU2VsZWN0aW9uKGNvb3JkaW5hdGVzLCB0eXBlLCBvYmplY3QpIHsgcmV0dXJuIFwibm90SW1wbGVtZW50ZWRZZXRcIjsgfVxyXG4gIHJlbW92ZU9iamVjdHNGb3JTZWxlY3Rpb24oY29vcmRpbmF0ZXMsIHR5cGUsIG9iamVjdCkgeyByZXR1cm4gXCJub3RJbXBsZW1lbnRlZFlldFwiOyB9XHJcbiAgZ2V0T2JqZWN0c1VuZGVyUG9pbnQoY29vcmRpbmF0ZXMsIHR5cGUpIHsgcmV0dXJuIFwibm90SW1wbGVtZW50ZWRZZXRcIjsgLyogSW1wbGVtZW50ZWQgd2l0aCBhIHBsdWdpbiAqLyB9XHJcbiAgZ2V0T2JqZWN0c1VuZGVyU2hhcGUoY29vcmRpbmF0ZXMsIHNoYXBlLCB0eXBlKSB7IHJldHVybiBcIm5vdEltcGxlbWVudGVkWWV0XCI7IC8qIENhbiBiZSBpbXBsZW1lbnRlZCBpZiBuZWVkZWQuIFdlIG5lZWQgbW9yZSBzb3BoaXN0aWNhdGVkIHF1YWR0cmVlIGZvciB0aGlzICovIH1cclxufVxyXG5cclxuLyoqID09PT09IFByaXZhdGUgZnVuY3Rpb25zID09PT09ICovXHJcbi8qIFRoaXMgaGFuZGxlcyB0aGUgZGVmYXVsdCBkcmF3aW5nIG9mIHRoZSBtYXAsIHNvIHRoYXQgbWFwIGFsd2F5cyB1cGRhdGVzIHdoZW4gZHJhd09uTmV4dFRpY2sgPT09IHRydWUuIFRoaXMgdGlja1xyXG5jYWxsYmFjayBpcyBhbHdheXMgc2V0IGFuZCBzaG91bGQgbm90IGJlIHJlbW92ZWQgb3Igb3ZlcnJ1bGVkICovXHJcbmZ1bmN0aW9uIF9kZWZhdWx0VGljayhtYXAsIHRpY2tlcikge1xyXG4gIHRpY2tlci5hZGQoZnVuY3Rpb24gKHRpbWUpIHtcclxuICAgIGlmKF9kcmF3TWFwT25OZXh0VGljayA9PT0gdHJ1ZSkge1xyXG4gICAgICBfcmVuZGVyZXIucmVuZGVyKF9zdGF0aWNMYXllcik7XHJcbiAgICB9XHJcbiAgICBfZHJhd01hcE9uTmV4dFRpY2sgPSBmYWxzZTtcclxuICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2V0RnVsbHNpemVkTWFwKHJlbmRlcmVyKSB7XHJcbiAgcmVuZGVyZXIudmlldy5zdHlsZS5wb3NpdGlvbiA9IFwiYWJzb2x1dGVcIlxyXG4gIHJlbmRlcmVyLnZpZXcuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcclxuICByZW5kZXJlci5hdXRvUmVzaXplID0gdHJ1ZTtcclxuICByZW5kZXJlci5yZXNpemUod2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodCk7XHJcbn0iLCIndXNlIHN0cmljdCc7XHJcblxyXG4vKipcclxuQHJlcXVpcmUgdGhlIGNyZWF0ZWpzIGZyYW1ld29yayBpbiBnbG9iYWwgbmFtZXNwYWNlXHJcbiovXHJcblxyXG4vKipcclxuICogQHRvZG8gdGhpcy5wcmV2ZW50U2VsZWN0aW9uLiBUaGlzIHNob3VsZCBkZXRlcm1pbmUgd2V0aGVyIHRoaXMgc3RhZ2UgaG9sZHMgZGF0YSB0aGF0IGNhbiBiZSBzZWxlY3RlZCBieSB0aGUgcGxheWVyXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIEB0b2RvIHN1YkNvbnRhaW5lcnMuIFN1YmNvbnRhaW5lcnMgYXJlIGNvbnRhaW5lcnMgaW5zaWRlIGxheWVycyBkZXNpZ25lZCB0byBncm91cCB1cCBvYmplY3RzIHRvIHNtYWxsZXIgY29udGFpbmVycy4gU28gZS5nLlxyXG4gKiBnZXRPYmplY3RzVW5kZXJQb2ludCBpcyBmYXN0ZXIuIFRoaXMgaGFzIG5vdCBiZWVuIGVmZmljaWVudGx5IHRlc3RlZCBmcm9tIHBlcmZvcm1hbmNlIHdpc2Ugc28gdGhlIGZlYXR1cmUgd2lsbCBiZVxyXG4gKiBhZGRlZCBhZnRlciB0aGUgYmFzaWMgbWFwIG1vZHVsZSB3b3JrcyBhbmQgd2UgY2FuIHZlcmlmeSB0aGUgZWZmZWN0IHdlbGwgKi9cclxuXHJcbi8qIFJFTUVNQkVSISBQSVhJLlBhcnRpY2xlQ29udGFpbmVyIGhhcyBsaW1pdGVkIHN1cHBvcnQgZm9yIGZlYXR1cmVzIChsaWtlIGZpbHRlcnMgZXRjLiksIGF0IHNvbWUgcG9pbnQgeW91IGhhdmUgdG8gdXNlXHJcbm5vcm1hbCBjb250YWluZXIgdG9vLCBidXQgc2luY2UgdGhpcyBvbmUgaXMgb3B0aW1pemVkIGZvciBwZXJmb3JtYW5jZSB3ZSB1c2UgaXQgaGVyZSBmaXJzdCAqL1xyXG5cclxudmFyIF9VSU9iamVjdHMgPSBbXTtcclxuXHJcbi8qID09PT09IEVYUE9SVCA9PT09PSAqL1xyXG5leHBvcnQgY2xhc3MgTWFwX2xheWVyIGV4dGVuZHMgUElYSS5Db250YWluZXIge1xyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lIGxheWVyIHByb3BlcnR5IG5hbWUsIHVzZWQgZm9yIGlkZW50aWZpeWluZyB0aGUgbGF5ZXIsIHVzZWZ1bGwgaW4gZGVidWdnaW5nLCBidXQgdXNlZCBhbHNvXHJcbiAgICogb3RoZXJ3aXNlIHRvbyFcclxuICAgKiBAcGFyYW0ge09iamVjdH0gc3ViQ29udGFpbmVycyBUbyBiZSBpbXBsZW1lbnRlZC4gVGhlIGRhdGEgd2hpY2ggd2UgdXNlIHRvIGRpdmlkZSB0aGUgY29udGFpbmVyIHRvIHN1YkNvbnRhaW5lcnNcclxuICAgKiBlLmcuIGZvciBtb3JlIGVmZmljaWVudCBhY2Nlc3NpYmlsaXR5IG9mIG9iamVjdHMgYmFzZWQgb24gY29vcmRpbmF0ZXMuXHJcbiAgICogQHBhcmFtIHt4OiBOdW1iZXIsIHk6IE51bWJlcn0gY29vcmQgc3RhcnRpbmcgY29vcmRzIG9mIGxheWVyLiBSZWxhdGl2ZSB0byBwYXJlbnQgbWFwIGxheWVyLlxyXG4gICovXHJcbiAgY29uc3RydWN0b3IobmFtZSwgc3ViQ29udGFpbmVycywgY29vcmQsIHJlbmRlcmVyKSB7XHJcbiAgICBzdXBlcigpO1xyXG5cclxuICAgIHRoaXMueCA9IGNvb3JkID8gKCBjb29yZC54IHx8IDAgKSA6IDA7XHJcbiAgICB0aGlzLnkgPSBjb29yZCA/ICggY29vcmQueSB8fCAwICkgOiAwO1xyXG4gICAgdGhpcy5yZW5kZXJlciA9IHJlbmRlcmVyO1xyXG4gICAgdGhpcy5fY2FjaGVFbmFibGVkID0gdHJ1ZTtcclxuICAgIHRoaXMuc3ViQ29udGFpbmVycyA9IHN1YkNvbnRhaW5lcnMgfHwgZmFsc2U7IC8vIFRoZXNlIHNob3VsZCBwcm9iYWJseSBiZSBwYXJ0aWNsZUNvbnRhaW5lcnNcclxuICAgIHRoaXMubmFtZSA9IFwiXCIgKyBuYW1lOyAvLyBGb3IgZGVidWdnaW5nLiBTaG93cyB1cCBpbiB0b1N0cmluZ1xyXG4gICAgdGhpcy5kcmF3VGhpc0NoaWxkID0gdHJ1ZTtcclxuICAgIHRoaXMubW92YWJsZSA9IHRydWU7XHJcbiAgICB0aGlzLnpvb21hYmxlID0gZmFsc2U7XHJcbiAgICB0aGlzLnByZXZlbnRTZWxlY3Rpb24gPSBmYWxzZTtcclxuICAgIC8qIGNyZWF0ZWpzIC8gc3VwZXIgcHJvcGVydGllcy4gVXNlZCBhbHNvIGZvciBjb250cm9sbGluZyBhbmQgb3B0aW1pemluZyB0aGUgZW5naW5lICovXHJcbiAgICB0aGlzLnZpc2libGUgPSB0cnVlO1xyXG4gICAgdGhpcy50aWNrRW5hYmxlZCA9IGZhbHNlO1xyXG4gICAgdGhpcy50aWNrQ2hpbGRyZW4gPSBmYWxzZTtcclxuICAgIHRoaXMubW91c2VDaGlsZHJlbiA9IGZhbHNlO1xyXG4gICAgdGhpcy5tb3VzZUVuYWJsZWQgPSBmYWxzZTtcclxuICB9XHJcbiAgLyoqIHNldHRlciBhbmQgZ2V0dGVyXHJcbiAgICogQHBhcmFtIHtCb29sZWFufSBzdGF0dXMgSWYgcHJvdmlkZWQgc2V0cyB0aGUgY2FjaGluZyBzdGF0dXMgb3RoZXJ3aXNlIHJldHVybnMgdGhlIGN1cnJlbnQgc3RhdHVzICovXHJcbiAgY2FjaGVFbmFibGVkKHN0YXR1cykge1xyXG4gICAgaWYoc3RhdHVzICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5fY2FjaGVFbmFibGVkID0gc3RhdHVzO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzLl9jYWNoZUVuYWJsZWQ7XHJcbiAgfVxyXG4gIC8qKiBNb3ZlIGxheWVyXHJcbiAgICogQHBhcmFtIHt4OiBOdW1iZXIsIHk6IE51bWJlcn0gY29vcmRpbmF0ZXMgVGhlIGFtb3VudCBvZiB4IGFuZCB5IGNvb3JkaW5hdGVzIHdlIHdhbnQgdGhlIGxheWVyIHRvIG1vdmUuIEkuZS5cclxuICAgeyB4OiA1LCB5OiAwIH1cclxuICAgQHJldHVybiB0aGlzIGxheWVyIGluc3RhbmNlICovXHJcbiAgbW92ZShjb29yZGluYXRlcykge1xyXG4gICAgaWYgKHRoaXMubW92YWJsZSkge1xyXG4gICAgICB0aGlzLnggKz0gY29vcmRpbmF0ZXMueDtcclxuICAgICAgdGhpcy55ICs9IGNvb3JkaW5hdGVzLnk7XHJcbiAgICAgIHRoaXMuZHJhd1RoaXNDaGlsZCA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG4gIGdldENoaWxkTmFtZWQobmFtZSkge1xyXG4gICAgaWYgKHRoaXMuY2hpbGRyZW5bMF0gaW5zdGFuY2VvZiBQSVhJLkRpc3BsYXlPYmplY3RDb250YWluZXIgKSB7XHJcbiAgICAgIGZvciAobGV0IGNoaWxkIG9mIHRoaXMuY2hpbGRyZW4pIHtcclxuICAgICAgICBpZiAoY2hpbGQubmFtZS50b0xvd2VyQ2FzZSgpID09PSBuYW1lLnRvTG93ZXJDYXNlKCkpIHtcclxuICAgICAgICAgIHJldHVybiBjaGlsZDtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcbiAgaXNVc2luZ1N1YkNvbnRhaW5lcnMoKSB7XHJcbiAgICByZXR1cm4gISF0aGlzLnN1YkNvbnRhaW5lcnM7XHJcbiAgfVxyXG4gIHNldFNjYWxlKGFtb3VudCkge1xyXG4gICAgcmV0dXJuIHRoaXMuc2NhbGUueCA9IHRoaXMuc2NhbGUueSA9IGFtb3VudDtcclxuICB9XHJcbiAgZ2V0U2NhbGUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5zY2FsZS54O1xyXG4gIH1cclxuICBnZXRVSU9iamVjdHMoKSB7XHJcbiAgICByZXR1cm4gX1VJT2JqZWN0cztcclxuICB9XHJcbiAgZW1wdHlVSU9iamVjdHMoKSB7XHJcbiAgICBfVUlPYmplY3RzLm1hcChvYmogPT4ge1xyXG4gICAgICB0aGlzLnJlbW92ZUNoaWxkKG9iaik7XHJcbiAgICAgIG9iaiA9IG51bGw7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gX1VJT2JqZWN0cztcclxuICB9XHJcbiAgYWRkVUlPYmplY3RzKG9iamVjdHMpIHtcclxuICAgIF9VSU9iamVjdHMgPSBfVUlPYmplY3RzIHx8IFtdO1xyXG4gICAgaWYoQXJyYXkuaXNBcnJheShvYmplY3RzKSkge1xyXG4gICAgICB0aGlzLmFkZENoaWxkLmFwcGx5KHRoaXMsIG9iamVjdHMpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5hZGRDaGlsZCggb2JqZWN0cyApO1xyXG4gICAgfVxyXG4gICAgX1VJT2JqZWN0cy5wdXNoKCBvYmplY3RzICk7XHJcblxyXG4gICAgcmV0dXJuIF9VSU9iamVjdHM7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgTWFwX3N1YkxheWVyIGV4dGVuZHMgUElYSS5QYXJ0aWNsZUNvbnRhaW5lciB7XHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgbGF5ZXIgcHJvcGVydHkgbmFtZSwgdXNlZCBmb3IgaWRlbnRpZml5aW5nIHRoZSBsYXllciwgdXNlZnVsbCBpbiBkZWJ1Z2dpbmcsIGJ1dCB1c2VkIGFsc29cclxuICAgKiBvdGhlcndpc2UgdG9vIVxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBzdWJDb250YWluZXJzIFRvIGJlIGltcGxlbWVudGVkLiBUaGUgZGF0YSB3aGljaCB3ZSB1c2UgdG8gZGl2aWRlIHRoZSBjb250YWluZXIgdG8gc3ViQ29udGFpbmVyc1xyXG4gICAqIGUuZy4gZm9yIG1vcmUgZWZmaWNpZW50IGFjY2Vzc2liaWxpdHkgb2Ygb2JqZWN0cyBiYXNlZCBvbiBjb29yZGluYXRlcy5cclxuICAgKiBAcGFyYW0ge3g6IE51bWJlciwgeTogTnVtYmVyfSBjb29yZCBzdGFydGluZyBjb29yZHMgb2YgbGF5ZXIuIFJlbGF0aXZlIHRvIHBhcmVudCBtYXAgbGF5ZXIuXHJcbiAgKi9cclxuICBjb25zdHJ1Y3RvcihuYW1lLCBzdWJDb250YWluZXJzLCBjb29yZCkge1xyXG4gICAgc3VwZXIoKTtcclxuXHJcbiAgICB0aGlzLnggPSBjb29yZCA/ICggY29vcmQueCB8fCAwICkgOiAwO1xyXG4gICAgdGhpcy55ID0gY29vcmQgPyAoIGNvb3JkLnkgfHwgMCApIDogMDtcclxuICAgIHRoaXMuX2NhY2hlRW5hYmxlZCA9IHRydWU7XHJcbiAgICB0aGlzLnN1YkNvbnRhaW5lcnMgPSBzdWJDb250YWluZXJzIHx8IGZhbHNlOyAvLyBUaGVzZSBzaG91bGQgcHJvYmFibHkgYmUgcGFydGljbGVDb250YWluZXJzXHJcbiAgICB0aGlzLm5hbWUgPSBcIlwiICsgbmFtZTsgLy8gRm9yIGRlYnVnZ2luZy4gU2hvd3MgdXAgaW4gdG9TdHJpbmdcclxuICAgIHRoaXMuZHJhd1RoaXNDaGlsZCA9IHRydWU7XHJcbiAgICB0aGlzLm1vdmFibGUgPSB0cnVlO1xyXG4gICAgdGhpcy56b29tYWJsZSA9IGZhbHNlO1xyXG4gICAgdGhpcy5wcmV2ZW50U2VsZWN0aW9uID0gZmFsc2U7XHJcbiAgICAvKiBjcmVhdGVqcyAvIHN1cGVyIHByb3BlcnRpZXMuIFVzZWQgYWxzbyBmb3IgY29udHJvbGxpbmcgYW5kIG9wdGltaXppbmcgdGhlIGVuZ2luZSAqL1xyXG4gICAgdGhpcy52aXNpYmxlID0gdHJ1ZTtcclxuICAgIHRoaXMudGlja0VuYWJsZWQgPSBmYWxzZTtcclxuICAgIHRoaXMudGlja0NoaWxkcmVuID0gZmFsc2U7XHJcbiAgICB0aGlzLm1vdXNlQ2hpbGRyZW4gPSBmYWxzZTtcclxuICAgIHRoaXMubW91c2VFbmFibGVkID0gZmFsc2U7XHJcbiAgfVxyXG4gIC8qKiBzZXR0ZXIgYW5kIGdldHRlclxyXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gc3RhdHVzIElmIHByb3ZpZGVkIHNldHMgdGhlIGNhY2hpbmcgc3RhdHVzIG90aGVyd2lzZSByZXR1cm5zIHRoZSBjdXJyZW50IHN0YXR1cyAqL1xyXG4gIGNhY2hlRW5hYmxlZChzdGF0dXMpIHtcclxuICAgIGlmKHN0YXR1cyAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMuX2NhY2hlRW5hYmxlZCA9IHN0YXR1cztcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcy5fY2FjaGVFbmFibGVkO1xyXG4gIH1cclxuICAvKiogTW92ZSBsYXllclxyXG4gICAqIEBwYXJhbSB7eDogTnVtYmVyLCB5OiBOdW1iZXJ9IGNvb3JkaW5hdGVzIFRoZSBhbW91bnQgb2YgeCBhbmQgeSBjb29yZGluYXRlcyB3ZSB3YW50IHRoZSBsYXllciB0byBtb3ZlLiBJLmUuXHJcbiAgIHsgeDogNSwgeTogMCB9XHJcbiAgIEByZXR1cm4gdGhpcyBsYXllciBpbnN0YW5jZSAqL1xyXG4gIG1vdmUoY29vcmRpbmF0ZXMpIHtcclxuICAgIGlmICh0aGlzLm1vdmFibGUpIHtcclxuICAgICAgdGhpcy54ICs9IGNvb3JkaW5hdGVzLng7XHJcbiAgICAgIHRoaXMueSArPSBjb29yZGluYXRlcy55O1xyXG4gICAgICB0aGlzLmRyYXdUaGlzQ2hpbGQgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuICBnZXRDaGlsZE5hbWVkKG5hbWUpIHtcclxuICAgIGlmICh0aGlzLmNoaWxkcmVuWzBdIGluc3RhbmNlb2YgUElYSS5EaXNwbGF5T2JqZWN0Q29udGFpbmVyICkge1xyXG4gICAgICBmb3IgKGxldCBjaGlsZCBvZiB0aGlzLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgaWYgKGNoaWxkLm5hbWUudG9Mb3dlckNhc2UoKSA9PT0gbmFtZS50b0xvd2VyQ2FzZSgpKSB7XHJcbiAgICAgICAgICByZXR1cm4gY2hpbGQ7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG4gIGlzVXNpbmdTdWJDb250YWluZXJzKCkge1xyXG4gICAgcmV0dXJuICEhdGhpcy5zdWJDb250YWluZXJzO1xyXG4gIH1cclxuICBzZXRTY2FsZShhbW91bnQpIHtcclxuICAgIHJldHVybiB0aGlzLnNjYWxlLnggPSB0aGlzLnNjYWxlLnkgPSBhbW91bnQ7XHJcbiAgfVxyXG4gIGdldFNjYWxlKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuc2NhbGUueDtcclxuICB9XHJcbiAgZ2V0VUlPYmplY3RzKCkge1xyXG4gICAgcmV0dXJuIF9VSU9iamVjdHM7XHJcbiAgfVxyXG4gIGVtcHR5VUlPYmplY3RzKCkge1xyXG4gICAgX1VJT2JqZWN0cy5tYXAob2JqID0+IHtcclxuICAgICAgdGhpcy5yZW1vdmVDaGlsZChvYmopO1xyXG4gICAgICBvYmogPSBudWxsO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIF9VSU9iamVjdHM7XHJcbiAgfVxyXG4gIGFkZFVJT2JqZWN0cyhvYmplY3RzKSB7XHJcbiAgICBfVUlPYmplY3RzID0gX1VJT2JqZWN0cyB8fCBbXTtcclxuICAgIGlmKEFycmF5LmlzQXJyYXkob2JqZWN0cykpIHtcclxuICAgICAgdGhpcy5hZGRDaGlsZC5hcHBseSh0aGlzLCBvYmplY3RzKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuYWRkQ2hpbGQoIG9iamVjdHMgKTtcclxuICAgIH1cclxuICAgIF9VSU9iamVjdHMucHVzaCggb2JqZWN0cyApO1xyXG5cclxuICAgIHJldHVybiBfVUlPYmplY3RzO1xyXG4gIH1cclxufSIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmV4cG9ydCBjbGFzcyBPYmplY3Rfc3ByaXRlIGV4dGVuZHMgUElYSS5TcHJpdGUge1xyXG4gIGNvbnN0cnVjdG9yKGNvb3JkcywgZGF0YSwgY3VycmVudEZyYW1lLCB0aHJvd1NoYWRvd09wdGlvbnMpIHtcclxuICAgIHN1cGVyKGN1cnJlbnRGcmFtZSk7XHJcbiAgICB0aGlzLm5hbWUgPSBcIk9iamVjdHNfc3ByaXRlX1wiICsgdGhpcy5pZDtcclxuICAgIHRoaXMudHlwZSA9IFwiTm9uZVwiO1xyXG4gICAgdGhpcy5oaWdobGlnaHRhYmxlID0gdHJ1ZTtcclxuICAgIHRoaXMuc2VsZWN0YWJsZSA9IHRydWU7XHJcbiAgICAvKiBTZXQgZGF0YSBmb3IgdGhlIG9iamVjdCBuZXh0ICovXHJcbiAgICB0aGlzLmRhdGEgPSBkYXRhIHx8IHt9O1xyXG4gICAgdGhpcy5jdXJyZW50RnJhbWUgPSBjdXJyZW50RnJhbWU7XHJcbiAgICAvKiBFeGVjdXRlIGluaXRpYWwgZHJhdyBmdW5jdGlvbiAqL1xyXG4gICAgLy90aGlzLmlubmVyRHJhdyhjb29yZHMueCwgY29vcmRzLnkpO1xyXG4gICAgdGhpcy5wb3NpdGlvbi5zZXQoY29vcmRzLngsICBjb29yZHMueSk7XHJcbiAgICAvKiBjcmVhdGVqcyAvIHN1cGVyIHByb3BlcnRpZXMuIFVzZWQgYWxzbyBmb3IgY29udHJvbGxpbmcgYW5kIG9wdGltaXppbmcgdGhlIGVuZ2luZSAqL1xyXG4gICAgdGhpcy5zZXR1cFNoYWRvdyh0aHJvd1NoYWRvd09wdGlvbnMpO1xyXG5cclxuICAgIHRoaXMudGlja0VuYWJsZWQgPSBmYWxzZTtcclxuICAgIHRoaXMubW91c2VFbmFibGVkID0gZmFsc2U7XHJcbiAgfVxyXG4gIC8qKiBEcmF3aW5nIHRoZSBvYmplY3Qgd2l0aCBjcmVhdGVqcy1tZXRob2RzXHJcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHggY29vcmRpbmF0ZSB4XHJcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHkgY29vcmRpbmF0ZSB5XHJcbiAgICogQHJldHVybiB0aGlzIG9iamVjdCBpbnN0YW5jZSAqL1xyXG4gIGlubmVyRHJhdyh4LCB5KSB7XHJcbiAgICB0aGlzLmZyb21GcmFtZSAoIHRoaXMuY3VycmVudEZyYW1lICk7XHJcbiAgICB0aGlzLnggPSB4O1xyXG4gICAgdGhpcy55ID0geTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcbiAgLyoqIERyYXdzIG5ldyBmcmFtZSB0byBhbmltYXRlIG9yIHN1Y2hcclxuICAgKiBAcGFyYW0ge051bWJlcn0geCBjb29yZGluYXRlIHhcclxuICAgKiBAcGFyYW0ge051bWJlcn0geSBjb29yZGluYXRlIHlcclxuICAgKiBAcGFyYW0ge051bWJlcn0gbmV3RnJhbWVOdW1iZXIgTmV3IGZyYW1lIG51bWJlciB0byBhbmltYXRlIHRvXHJcbiAgICogQHJldHVybiB0aGlzIG9iamVjdCBpbnN0YW5jZSAqL1xyXG4gIGRyYXdOZXdGcmFtZSh4LCB5LCBuZXdGcmFtZSkge1xyXG4gICAgdGhpcy5jdXJyZW50RnJhbWUgPSBuZXdGcmFtZTtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5pbm5lckRyYXcoeCwgeSk7XHJcbiAgfVxyXG4gIHNldHVwU2hhZG93KG9wdGlvbnMgPSB7Y29sb3I6IFwiIzAwMDAwMFwiLCBvZmZzZXRYOiA1LCBvZmZzZXRZOiA1LCBibHVyOiAxMH0gKSB7XHJcbiAgICBpZih0aGlzLnRocm93U2hhZG93ID09PSB0cnVlKSB7XHJcbiAgICAgIGNvbnNvbGUud2FybihcIk5PIFNIQURPVyBGVU5DVElPTiBTRVQhXCIpXHJcbiAgICB9XHJcbiAgfVxyXG4gIGxvY2FsVG9Mb2NhbCh4LCB5LCB0YXJnZXQpIHtcclxuICAgIHZhciBnbG9iYWxDb29yZHMgPSB0aGlzLnRvR2xvYmFsKCB7IHgsIHkgfSApO1xyXG4gICAgdmFyIHRhcmdldExvY2FsQ29vcmRzID0gdGFyZ2V0LnRvTG9jYWwoIHsgeDogZ2xvYmFsQ29vcmRzLngsIHk6IGdsb2JhbENvb3Jkcy55IH0gKTtcclxuXHJcbiAgICByZXR1cm4gdGFyZ2V0TG9jYWxDb29yZHM7XHJcbiAgfVxyXG4gIGNsb25lKCkge1xyXG4gICAgdmFyIG5ld1Nwcml0ZSA9IG5ldyBQSVhJLlNwcml0ZSgpO1xyXG4gICAgdmFyIGZpcnN0UGFyZW50ID0gX2ZpbmRGaXJzdFBhcmVudCh0aGlzKTtcclxuICAgIHZhciByZW5kZXJlciA9IGZpcnN0UGFyZW50LnJlbmRlcmVyO1xyXG5cclxuICAgIG5ld1Nwcml0ZS50ZXh0dXJlID0gdGhpcy5nZW5lcmF0ZVRleHR1cmUocmVuZGVyZXIpO1xyXG5cclxuICAgIHJldHVybiBuZXdTcHJpdGU7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBfZmluZEZpcnN0UGFyZW50KHRoaXNPYmopIHtcclxuICBsZXQgcGFyZW50T2JqID0ge307XHJcblxyXG4gIGlmKHRoaXNPYmoucGFyZW50KSB7XHJcbiAgICBwYXJlbnRPYmogPSBfZmluZEZpcnN0UGFyZW50KHRoaXNPYmoucGFyZW50KTtcclxuICB9IGVsc2Uge1xyXG4gICAgcmV0dXJuIHRoaXNPYmo7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gcGFyZW50T2JqO1xyXG59IiwiaW1wb3J0IHsgUXVhZHRyZWUgfSBmcm9tICcuL3V0aWxzL1F1YWR0cmVlJztcclxuXHJcbmV4cG9ydCBjbGFzcyBPYmplY3RNYW5hZ2VyIHtcclxuICBjb25zdHJ1Y3RvcihoaXREZXRlY3Rvcikge1xyXG4gICAgaWYoIWhpdERldGVjdG9yKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIlJlcXVpcmVzIGhpdCBkZXRlY3RvciBhcyBwYXJhbWV0ZXIhXCIpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5xdWFkdHJlZXMgPSB7fTtcclxuICAgIHRoaXMuaGl0RGV0ZWN0b3IgPSBuZXcgUElYSS5pbnRlcmFjdGlvbi5JbnRlcmFjdGlvbk1hbmFnZXIoaGl0RGV0ZWN0b3IpO1xyXG4gIH1cclxuICByZXRyaWV2ZSh0eXBlLCBjb29yZHMsIHNpemUpIHtcclxuICAgIHZhciBxdWFkdHJlZU9ianMsIGZvdW5kT2JqcywgaXNIaXQ7XHJcblxyXG4gICAgcXVhZHRyZWVPYmpzID0gdGhpcy5xdWFkdHJlZXNbdHlwZV0ucmV0cmlldmUoY29vcmRzLCBzaXplKTtcclxuICAgIGZvdW5kT2JqcyA9IHF1YWR0cmVlT2Jqcy5maWx0ZXIob2JqID0+IHtcclxuICAgICAgcmV0dXJuIHRoaXMuaGl0VGVzdChvYmosIGNvb3Jkcyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gZm91bmRPYmpzO1xyXG4gIH1cclxuICBhZGRPYmplY3QobGF5ZXJOYW1lLCBoaXRBcmVhLCBvYmopIHtcclxuICAgIGlmKCF0aGlzLnF1YWR0cmVlc1tsYXllck5hbWVdKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkIG5vdCBhZGQgb2JqZWN0IHRvIG9iamVjdE1hbmFnZXIgbGF5ZXIsIGxheWVyIG5vdCBmb3VuZCEgKFwiICsgbGF5ZXJOYW1lICsgXCIpXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzLnF1YWR0cmVlc1tsYXllck5hbWVdLmFkZCh7XHJcbiAgICAgICAgeDogaGl0QXJlYS54LFxyXG4gICAgICAgIHk6IGhpdEFyZWEueVxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgd2lkdGg6IGhpdEFyZWEud2lkdGgsXHJcbiAgICAgICAgaGVpZ2h0OiBoaXRBcmVhLmhlaWdodFxyXG4gICAgICB9LFxyXG4gICAgICBvYmpcclxuICAgICk7XHJcbiAgfVxyXG4gIGFkZExheWVyKG5hbWUsIGFyZWEsIGV4dHJhKSB7XHJcbiAgICB0aGlzLnF1YWR0cmVlc1tuYW1lXSA9IG5ldyBRdWFkdHJlZSh7XHJcbiAgICAgICAgeDogYXJlYS54LFxyXG4gICAgICAgIHk6IGFyZWEueSxcclxuICAgICAgICB3aWR0aDogYXJlYS53aWR0aCxcclxuICAgICAgICBoZWlnaHQ6IGFyZWEuaGVpZ2h0XHJcbiAgICAgIH0sIHtcclxuICAgICAgICBvYmplY3RzOiBleHRyYS5vYmplY3RzIHx8IDEwLFxyXG4gICAgICAgIGxldmVsczogZXh0cmEubGV2ZWxzIHx8IDVcclxuICAgICAgfSlcclxuXHJcbiAgICByZXR1cm4gdGhpcy5xdWFkdHJlZXNbbmFtZV07XHJcbiAgfVxyXG4gIGdldExheWVycygpIHtcclxuICAgIHJldHVybiBPYmplY3Qua2V5cyh0aGlzLnF1YWR0cmVlcykubWFwKGxheWVyTmFtZSA9PiB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgbmFtZTogbGF5ZXJOYW1lLFxyXG4gICAgICAgIGRhdGE6IHRoaXMucXVhZHRyZWVzW2xheWVyTmFtZV1cclxuICAgICAgfTtcclxuICAgIH0pO1xyXG4gIH1cclxuICBoaXRUZXN0KG9iaiwgY29vcmRpbmF0ZXMsIG9mZnNldENvb3JkcykgeyByZXR1cm4gXCJuZWVkIHRvIGJlIGltcGxlbWVudGVkIGJ5IGFub3RoZXIgbW9kdWxlXCI7IH1cclxufSIsIi8qKiBAcmVxdWlyZSBRdWFkdHJlZS1qcy4gVGhvdWdoIHRoaXMgYmFzZSBsaWJyYXJ5IGNhbiBiZSBjaGFuZ2VkIGVhc2lseSAqL1xyXG5cclxuaW1wb3J0IHsgUXVhZHRyZWUgYXMgUXVhZE1vZCB9IGZyb20gXCIuLi8uLi8uLi8uLi9hc3NldHMvbGliL3F1YWR0cmVlLWpzL3F1YWR0cmVlLWpzLWhpdG1hblwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFF1YWR0cmVlIHtcclxuICBjb25zdHJ1Y3RvcihvcHRpb25zLCBtYXgpIHtcclxuICAgIHZhciB7IG9iamVjdHM6IG1heF9vYmplY3RzLCBsZXZlbHM6IG1heF9sZXZlbHMgfSA9IG1heDtcclxuXHJcbiAgICB0aGlzLnF1YWR0cmVlID0gbmV3IFF1YWRNb2Qob3B0aW9ucywgbWF4X29iamVjdHMsIG1heF9sZXZlbHMpO1xyXG4gIH1cclxuICBhZGQoY29vcmRzLCBzaXplLCBkYXRhKSB7XHJcbiAgICB2YXIgb2JqVG9BZGQgPSBfY3JldGVRdWFkdHJlZU9iamVjdChjb29yZHMsIHNpemUsIGRhdGEpO1xyXG5cclxuICAgIHRoaXMucXVhZHRyZWUuaW5zZXJ0KG9ialRvQWRkKTtcclxuICB9XHJcbiAgcmVtb3ZlKGNvb3Jkcywgc2l6ZSwgZGF0YSwgcmVmcmVzaCkge1xyXG4gICAgdmFyIG9ialRvUmVtb3ZlID0gX2NyZXRlUXVhZHRyZWVPYmplY3QoY29vcmRzLCBzaXplLCBkYXRhKTtcclxuXHJcbiAgICB0aGlzLnF1YWR0cmVlLnJlbW92ZU9iamVjdChvYmpUb1JlbW92ZSk7XHJcbiAgICByZWZyZXNoICYmIHRoaXMucXVhZHRyZWUuY2xlYW51cCgpO1xyXG4gIH1cclxuICByZXRyaWV2ZShjb29yZHMsIHNpemUpIHtcclxuICAgIHZhciBoaXREaW1lbnNpb25zID0ge1xyXG4gICAgICB4OiBjb29yZHMueCxcclxuICAgICAgeTogY29vcmRzLnksXHJcbiAgICAgIHdpZHRoOiBzaXplID8gc2l6ZS53aWR0aCA6IDAsXHJcbiAgICAgIGhlaWdodDogc2l6ZSA/IHNpemUuaGVpZ2h0IDogMFxyXG4gICAgfTtcclxuICAgIHZhciBvYmplY3RzID0gW107XHJcblxyXG4gICAgb2JqZWN0cyA9IHRoaXMucXVhZHRyZWUucmV0cmlldmUoaGl0RGltZW5zaW9ucykubWFwKGZ1bmN0aW9uKG9iamVjdCkge1xyXG4gICAgICByZXR1cm4gb2JqZWN0LmRhdGE7XHJcbiAgICB9KTtcclxuXHJcbiAgICAgcmV0dXJuIG9iamVjdHM7XHJcbiAgfVxyXG4gIG1vdmUoY29vcmRzLCBzaXplLCBkYXRhLCB0bykge1xyXG4gICAgdmFyIGZvdW5kT2JqZWN0ID0gdGhpcy5maW5kT2JqZWN0KGNvb3Jkcywgc2l6ZSwgZGF0YSk7XHJcblxyXG4gICAgaWYoZm91bmRPYmplY3QpIHtcclxuICAgICAgdGhpcy5xdWFkdHJlZS5yZW1vdmVPYmplY3QoZm91bmRPYmplY3QpO1xyXG4gICAgICBmb3VuZE9iamVjdC54ID0gdG8ueDtcclxuICAgICAgZm91bmRPYmplY3QueSA9IHRvLnk7XHJcbiAgICAgIHRoaXMucXVhZHRyZWUuaW5zZXJ0KGZvdW5kT2JqZWN0KTtcclxuICAgICAgdGhpcy5yZWZyZXNoQWxsKCk7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcbiAgcmVmcmVzaEFsbCgpIHtcclxuICAgIHRoaXMucXVhZHRyZWUuY2xlYW51cCgpO1xyXG4gIH1cclxuICBmaW5kT2JqZWN0KGNvb3Jkcywgc2l6ZSwgZGF0YSwgb25seURhdGEpIHtcclxuICAgIHZhciBmb3VuZE9iamVjdCA9IHRoaXMucmV0cmlldmUoY29vcmRzLCBzaXplKS5maWx0ZXIoZnVuY3Rpb24ob2JqZWN0KSB7XHJcbiAgICAgIHJldHVybiBvYmplY3QuZGF0YSA9PT0gZGF0YSA/IHRydWUgOiBmYWxzZTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBmb3VuZE9iamVjdDtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIF9jcmV0ZVF1YWR0cmVlT2JqZWN0KGNvb3JkcyA9IHt4OnVuZGVmaW5lZCwgeTp1bmRlZmluZWR9LCBzaXplID0ge3dpZHRoOjAsIGhlaWdodDowfSwgZGF0YSkge1xyXG4gIHZhciBvYmpUb0FkZCA9IGNvb3JkcztcclxuXHJcbiAgaWYoY29vcmRzLnggPT09IHVuZGVmaW5lZCAmJiBjb29yZHMueSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJfY3JlYXRlUXVhZHRyZWVPYmplY3QgcmVxdWlyZXMgeCBhbmQgeSBjb29yZGluYXRlcyBhcyBwYXJhbWV0ZXJzXCIpO1xyXG4gIH1cclxuICBvYmpUb0FkZC53aWR0aCA9IHNpemUud2lkdGg7XHJcbiAgb2JqVG9BZGQuaGVpZ2h0ID0gc2l6ZS5oZWlnaHQ7XHJcbiAgb2JqVG9BZGQuZGF0YSA9IGRhdGE7XHJcblxyXG4gIHJldHVybiBvYmpUb0FkZDtcclxufSIsIid1c2Ugc3RyaWN0JztcclxuXHJcbi8qKiBUaGUgY29yZSB1dGlscyBmb3IgdGhlIDJEIG1hcCBlbmdpbmUuICovXHJcblxyXG5leHBvcnQgdmFyIG1vdXNlVXRpbHMgPSAoIGZ1bmN0aW9uIG1vdXNlVXRpbHMoKSB7XHJcbiAgdmFyIHNjb3BlID0ge307XHJcblxyXG4gIC8qKiBUaGlzIGZ1bmN0aW9uIGlzIGZyb206IGh0dHA6Ly93d3cuYWRvbWFzLm9yZy9qYXZhc2NyaXB0LW1vdXNlLXdoZWVsLywgYnV0IG1vZGlmaWVkIGZvciB0b2RheXMgYnJvd3NlcnNcclxuICAgIEl0IGRldGVjdHMgd2hpY2ggd2F5IHRoZSBtb3VzZXdoZWVsIGhhcyBiZWVuIG1vdmVkLlxyXG4gICAgemVybyBkZWx0YSA9IG1vdXNlIHdoZWVsIG5vdCBtb3ZlZFxyXG4gICAgcG9zaXRpdmUgZGVsdGEgPSBzY3JvbGxlZCB1cFxyXG4gICAgbmVnYXRpdmUgZGVsdGEgPSBzY3JvbGxlZCBkb3duXHJcblxyXG4gICAgQHBhcmFtIHtFdmVudH0gZXZlbnQgcGFzcyB0aGUgZXZlbnQgdG8gZGVsdGFGcm9tV2hlZWxcclxuICAgIEByZXR1cm4gZGVsdGEuIFBvc2l0aXZlIGlmIHdoZWVsIHdhcyBzY3JvbGxlZCB1cCwgYW5kIG5lZ2F0aXZlLCBpZiB3aGVlbCB3YXMgc2Nyb2xsZWQgZG93bi4gKi9cclxuICBzY29wZS5kZWx0YUZyb21XaGVlbCA9IGZ1bmN0aW9uKCBldmVudCApIHtcclxuICAgIHZhciBkZWx0YSA9IDA7XHJcblxyXG4gICAgZXZlbnQgPSBldmVudCA/IGV2ZW50IDogd2luZG93LmV2ZW50OyAvKiBGb3IgSUUuICovXHJcblxyXG4gICAgaWYgKCBldmVudC5kZWx0YVkgPiA5OSApIHsgLyogSUUvT3BlcmEuICovXHJcbiAgICAgIGRlbHRhID0gZXZlbnQuZGVsdGFZIC8gMTAwO1xyXG4gICAgfSBlbHNlIGlmICggZXZlbnQuZGVsdGFZIDw9IDk5ICkge1xyXG4gICAgICBkZWx0YSA9IGV2ZW50LmRlbHRhWTtcclxuICAgIH1cclxuXHJcbiAgICAvKiBJZiBkZWx0YSBpcyBub256ZXJvLCBoYW5kbGUgaXQsIG90aGVyd2lzZSBzY3JhcCBpdCBCYXNpY2FsbHksIGRlbHRhIGlzIG5vdyBwb3NpdGl2ZSBpZlxyXG4gICAgd2hlZWwgd2FzIHNjcm9sbGVkIHVwLCBhbmQgbmVnYXRpdmUsIGlmIHdoZWVsIHdhcyBzY3JvbGxlZCBkb3duLiAqL1xyXG4gICAgaWYgKCBkZWx0YSApIHJldHVybiBkZWx0YTtcclxuICB9O1xyXG4gIC8qKiBIYXMgdGhlIG1vdXNlIGNsaWNrIGJlZW4gcmlnaHQgbW91c2UgYnV0dG9uXHJcbiAgICogQHBhcmFtIHtFdmVudH0gZXZlbnQgVGhlIGV2ZW50IHdoZXJlIHRoZSBjbGljayBvY2N1cmVkICovXHJcbiAgc2NvcGUuaXNSaWdodENsaWNrID0gZnVuY3Rpb24oIGV2ZW50ICkge1xyXG4gICAgIHZhciByaWdodGNsaWNrO1xyXG5cclxuICAgICBldmVudCA9IGV2ZW50ID8gZXZlbnQgOiB3aW5kb3cuZXZlbnQ7IC8qIEZvciBJRS4gKi9cclxuICAgICBpZiAoIGV2ZW50LmJ1dHRvbnMgKSByaWdodGNsaWNrID0gKCBldmVudC5idXR0b25zID09IDIgKTtcclxuICAgICBlbHNlIGlmICggZXZlbnQud2hpY2ggKSByaWdodGNsaWNrID0gKCBldmVudC53aGljaCA9PSAzICk7XHJcbiAgICAgZWxzZSBpZiAoIGV2ZW50LmJ1dHRvbiApIHJpZ2h0Y2xpY2sgPSAoIGV2ZW50LmJ1dHRvbiA9PSAyICk7XHJcblxyXG4gICAgIGlmICggcmlnaHRjbGljayApIHJldHVybiB0cnVlO1xyXG5cclxuICAgICByZXR1cm4gZmFsc2U7XHJcbiAgfTtcclxuICBzY29wZS5nZXRFdmVudENvb3Jkc09uUGFnZSA9IGZ1bmN0aW9uIChlKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICB4OiBlLm9mZnNldFgsXHJcbiAgICAgIHk6IGUub2Zmc2V0WVxyXG4gICAgfTtcclxuICB9O1xyXG4gIHNjb3BlLmV2ZW50TW91c2VDb29yZHMgPSBmdW5jdGlvbihlKSB7XHJcbiAgICB2YXIgcG9zID0ge1xyXG4gICAgICB4OjAsXHJcbiAgICAgIHk6MFxyXG4gICAgfTtcclxuXHJcbiAgICBpZiAoIWUpIHtcclxuICAgICAgZSA9IHdpbmRvdy5ldmVudDtcclxuICAgIH1cclxuICAgIGlmIChlLnBhZ2VYIHx8IGUucGFnZVkpICAge1xyXG4gICAgICBwb3MueCA9IGUucGFnZVg7XHJcbiAgICAgIHBvcy55ID0gZS5wYWdlWTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKGUuY2xpZW50WCB8fCBlLmNsaWVudFkpICB7XHJcbiAgICAgIHBvcy54ID0gZS5jbGllbnRYICsgZG9jdW1lbnQuYm9keS5zY3JvbGxMZWZ0XHJcbiAgICAgICAgKyBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsTGVmdDtcclxuICAgICAgcG9zLnkgPSBlLmNsaWVudFkgKyBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcFxyXG4gICAgICAgICsgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcDtcclxuICAgIH1cclxuICAgIC8vIHBvc3ggYW5kIHBvc3kgY29udGFpbiB0aGUgbW91c2UgcG9zaXRpb24gcmVsYXRpdmUgdG8gdGhlIGRvY3VtZW50XHJcbiAgICAvLyBEbyBzb21ldGhpbmcgd2l0aCB0aGlzIGluZm9ybWF0aW9uXHJcbiAgICByZXR1cm4gcG9zO1xyXG4gIH07XHJcblxyXG4gIHJldHVybiBzY29wZTtcclxufSApKCk7XHJcbmV4cG9ydCB2YXIgcmVzaXplVXRpbHMgPSB7XHJcbiAgdG9nZ2xlRnVsbFNjcmVlbjogZnVuY3Rpb24gdG9nZ2xlRnVsbFNjcmVlbigpIHtcclxuICAgIHZhciBlbGVtID0gZG9jdW1lbnQuYm9keTsgLy8gTWFrZSB0aGUgYm9keSBnbyBmdWxsIHNjcmVlbi5cclxuICAgIHZhciBpc0luRnVsbFNjcmVlbiA9ICggZG9jdW1lbnQuZnVsbFNjcmVlbkVsZW1lbnQgJiYgZG9jdW1lbnQuZnVsbFNjcmVlbkVsZW1lbnQgIT09IG51bGwgKSB8fFxyXG4gICAgICAgKFxyXG4gICAgICAgZG9jdW1lbnQubW96RnVsbFNjcmVlbiB8fCBkb2N1bWVudC53ZWJraXRJc0Z1bGxTY3JlZW4gKTtcclxuXHJcbiAgICBpc0luRnVsbFNjcmVlbiA/IGNhbmNlbEZ1bGxTY3JlZW4oIGRvY3VtZW50ICkgOiByZXF1ZXN0RnVsbFNjcmVlbiggZWxlbSApO1xyXG5cclxuICAgIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICAvLyBTdWIgZnVuY3Rpb25zXHJcbiAgICBmdW5jdGlvbiBjYW5jZWxGdWxsU2NyZWVuKCBlbCApIHtcclxuICAgICAgIHZhciByZXF1ZXN0TWV0aG9kID0gZWwuY2FuY2VsRnVsbFNjcmVlbiB8fFxyXG4gICAgICAgICAgZWwud2Via2l0Q2FuY2VsRnVsbFNjcmVlbiB8fFxyXG4gICAgICAgICAgZWwubW96Q2FuY2VsRnVsbFNjcmVlbiB8fFxyXG4gICAgICAgICAgZWwuZXhpdEZ1bGxzY3JlZW47XHJcbiAgICAgICBpZiAoIHJlcXVlc3RNZXRob2QgKSB7IC8vIGNhbmNlbCBmdWxsIHNjcmVlbi5cclxuICAgICAgICAgIHJlcXVlc3RNZXRob2QuY2FsbCggZWwgKTtcclxuICAgICAgIH0gZWxzZSBpZiAoIHR5cGVvZiB3aW5kb3cuQWN0aXZlWE9iamVjdCAhPT0gXCJ1bmRlZmluZWRcIiApIHsgLy8gT2xkZXIgSUUuXHJcbiAgICAgICAgICB2YXIgd3NjcmlwdCA9IG5ldyBBY3RpdmVYT2JqZWN0KCBcIldTY3JpcHQuU2hlbGxcIiApO1xyXG4gICAgICAgICAgd3NjcmlwdCAhPT0gbnVsbCAmJiB3c2NyaXB0LlNlbmRLZXlzKCBcIntGMTF9XCIgKTtcclxuICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiByZXF1ZXN0RnVsbFNjcmVlbiggZWwgKSB7XHJcbiAgICAgICAvLyBTdXBwb3J0cyBtb3N0IGJyb3dzZXJzIGFuZCB0aGVpciB2ZXJzaW9ucy5cclxuICAgICAgIHZhciByZXF1ZXN0TWV0aG9kID0gZWwucmVxdWVzdEZ1bGxTY3JlZW4gfHxcclxuICAgICAgICAgIGVsLndlYmtpdFJlcXVlc3RGdWxsU2NyZWVuIHx8XHJcbiAgICAgICAgICBlbC5tb3pSZXF1ZXN0RnVsbFNjcmVlbiB8fFxyXG4gICAgICAgICAgZWwubXNSZXF1ZXN0RnVsbFNjcmVlbjtcclxuXHJcbiAgICAgICBpZiAoIHJlcXVlc3RNZXRob2QgKSB7IC8vIE5hdGl2ZSBmdWxsIHNjcmVlbi5cclxuICAgICAgICAgIHJlcXVlc3RNZXRob2QuY2FsbCggZWwgKTtcclxuICAgICAgIH0gZWxzZSBpZiAoIHR5cGVvZiB3aW5kb3cuQWN0aXZlWE9iamVjdCAhPT0gXCJ1bmRlZmluZWRcIiApIHsgLy8gT2xkZXIgSUUuXHJcbiAgICAgICAgICB2YXIgd3NjcmlwdCA9IG5ldyBBY3RpdmVYT2JqZWN0KCBcIldTY3JpcHQuU2hlbGxcIiApO1xyXG4gICAgICAgICAgd3NjcmlwdCAhPT0gbnVsbCAmJiB3c2NyaXB0LlNlbmRLZXlzKCBcIntGMTF9XCIgKTtcclxuICAgICAgIH1cclxuICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICB9LFxyXG4gIC8qKiBTZXRzIGNhbnZhcyBzaXplIHRvIG1heGltdW0gd2lkdGggYW5kIGhlaWdodCBvbiB0aGUgYnJvd3Nlciwgbm90IHVzaW5nIGZ1bGxzY3JlZW5cclxuICAgKiBAcGFyYW0ge0RPTUVsZW1lbnQgQ2FudmFzIGNvbnRleHR9IGNvbnRleHQgKi9cclxuICBzZXRUb0Z1bGxTaXplOiBmdW5jdGlvbiBzZXRUb0Z1bGxTaXplKGNvbnRleHQpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiBmdWxsU2l6ZSgpIHtcclxuICAgICAgdmFyIHNpemUgPSBfZ2V0V2luZG93U2l6ZSgpO1xyXG5cclxuICAgICAgY29udGV4dC5jYW52YXMud2lkdGggPSBzaXplLng7XHJcbiAgICAgIGNvbnRleHQuY2FudmFzLmhlaWdodCA9IHNpemUueTtcclxuICAgIH07XHJcbiAgfSxcclxuICBnZXRXaW5kb3dTaXplOiBfZ2V0V2luZG93U2l6ZVxyXG59O1xyXG5leHBvcnQgdmFyIGVudmlyb25tZW50RGV0ZWN0aW9uID0gKGZ1bmN0aW9uICgpIHtcclxuICB2YXIgc2NvcGUgPSB7fTtcclxuXHJcbiAgc2NvcGUuaXNNb2JpbGUgPSBmdW5jdGlvbigpIHtcclxuICAgIHZhciBzY3JlZW5TaXplID0gKHNjcmVlbi53aWR0aCA8PSA2NDApIHx8ICh3aW5kb3cubWF0Y2hNZWRpYSAmJiB3aW5kb3cubWF0Y2hNZWRpYSgnb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDY0MHB4KScpLm1hdGNoZXMgKTtcclxuICAgIHZhciBmZWF0dXJlcyA9ICgnb250b3VjaHN0YXJ0JyBpbiB3aW5kb3cpIHx8IChuYXZpZ2F0b3IubWF4VG91Y2hQb2ludHMgPiAwKSB8fCAobmF2aWdhdG9yLm1zTWF4VG91Y2hQb2ludHMgPiAwKTtcclxuXHJcbiAgICByZXR1cm4gZmVhdHVyZXMgJiYgc2NyZWVuU2l6ZTtcclxuICB9O1xyXG4gIC8qKiBtb2RpZmllZCBjb2RlIGZyb20gaHR0cDovL2RldGVjdG1vYmlsZWJyb3dzZXJzLmNvbS8gKi9cclxuICBzY29wZS5pc01vYmlsZV9kZXRlY3RVc2VyQWdlbnQgPSBmdW5jdGlvbigpIHtcclxuICAgIHZhciB1c2VyQWdlbnQgPSBuYXZpZ2F0b3IudXNlckFnZW50fHxuYXZpZ2F0b3IudmVuZG9yfHx3aW5kb3cub3BlcmE7XHJcblxyXG4gICAgcmV0dXJuIC8oYW5kcm9pZHxiYlxcZCt8bWVlZ28pLittb2JpbGV8YXZhbnRnb3xiYWRhXFwvfGJsYWNrYmVycnl8YmxhemVyfGNvbXBhbHxlbGFpbmV8ZmVubmVjfGhpcHRvcHxpZW1vYmlsZXxpcChob25lfG9kKXxpcmlzfGtpbmRsZXxsZ2UgfG1hZW1vfG1pZHB8bW1wfG1vYmlsZS4rZmlyZWZveHxuZXRmcm9udHxvcGVyYSBtKG9ifGluKWl8cGFsbSggb3MpP3xwaG9uZXxwKGl4aXxyZSlcXC98cGx1Y2tlcnxwb2NrZXR8cHNwfHNlcmllcyg0fDYpMHxzeW1iaWFufHRyZW98dXBcXC4oYnJvd3NlcnxsaW5rKXx2b2RhZm9uZXx3YXB8d2luZG93cyBjZXx4ZGF8eGlpbm8vaS50ZXN0KHVzZXJBZ2VudCl8fC8xMjA3fDYzMTB8NjU5MHwzZ3NvfDR0aHB8NTBbMS02XWl8Nzcwc3w4MDJzfGEgd2F8YWJhY3xhYyhlcnxvb3xzXFwtKXxhaShrb3xybil8YWwoYXZ8Y2F8Y28pfGFtb2l8YW4oZXh8bnl8eXcpfGFwdHV8YXIoY2h8Z28pfGFzKHRlfHVzKXxhdHR3fGF1KGRpfFxcLW18ciB8cyApfGF2YW58YmUoY2t8bGx8bnEpfGJpKGxifHJkKXxibChhY3xheil8YnIoZXx2KXd8YnVtYnxid1xcLShufHUpfGM1NVxcL3xjYXBpfGNjd2F8Y2RtXFwtfGNlbGx8Y2h0bXxjbGRjfGNtZFxcLXxjbyhtcHxuZCl8Y3Jhd3xkYShpdHxsbHxuZyl8ZGJ0ZXxkY1xcLXN8ZGV2aXxkaWNhfGRtb2J8ZG8oY3xwKW98ZHMoMTJ8XFwtZCl8ZWwoNDl8YWkpfGVtKGwyfHVsKXxlcihpY3xrMCl8ZXNsOHxleihbNC03XTB8b3N8d2F8emUpfGZldGN8Zmx5KFxcLXxfKXxnMSB1fGc1NjB8Z2VuZXxnZlxcLTV8Z1xcLW1vfGdvKFxcLnd8b2QpfGdyKGFkfHVuKXxoYWllfGhjaXR8aGRcXC0obXxwfHQpfGhlaVxcLXxoaShwdHx0YSl8aHAoIGl8aXApfGhzXFwtY3xodChjKFxcLXwgfF98YXxnfHB8c3x0KXx0cCl8aHUoYXd8dGMpfGlcXC0oMjB8Z298bWEpfGkyMzB8aWFjKCB8XFwtfFxcLyl8aWJyb3xpZGVhfGlnMDF8aWtvbXxpbTFrfGlubm98aXBhcXxpcmlzfGphKHR8dilhfGpicm98amVtdXxqaWdzfGtkZGl8a2VqaXxrZ3QoIHxcXC8pfGtsb258a3B0IHxrd2NcXC18a3lvKGN8ayl8bGUobm98eGkpfGxnKCBnfFxcLyhrfGx8dSl8NTB8NTR8XFwtW2Etd10pfGxpYnd8bHlueHxtMVxcLXd8bTNnYXxtNTBcXC98bWEodGV8dWl8eG8pfG1jKDAxfDIxfGNhKXxtXFwtY3J8bWUocmN8cmkpfG1pKG84fG9hfHRzKXxtbWVmfG1vKDAxfDAyfGJpfGRlfGRvfHQoXFwtfCB8b3x2KXx6eil8bXQoNTB8cDF8diApfG13YnB8bXl3YXxuMTBbMC0yXXxuMjBbMi0zXXxuMzAoMHwyKXxuNTAoMHwyfDUpfG43KDAoMHwxKXwxMCl8bmUoKGN8bSlcXC18b258dGZ8d2Z8d2d8d3QpfG5vayg2fGkpfG56cGh8bzJpbXxvcCh0aXx3dil8b3Jhbnxvd2cxfHA4MDB8cGFuKGF8ZHx0KXxwZHhnfHBnKDEzfFxcLShbMS04XXxjKSl8cGhpbHxwaXJlfHBsKGF5fHVjKXxwblxcLTJ8cG8oY2t8cnR8c2UpfHByb3h8cHNpb3xwdFxcLWd8cWFcXC1hfHFjKDA3fDEyfDIxfDMyfDYwfFxcLVsyLTddfGlcXC0pfHF0ZWt8cjM4MHxyNjAwfHJha3N8cmltOXxybyh2ZXx6byl8czU1XFwvfHNhKGdlfG1hfG1tfG1zfG55fHZhKXxzYygwMXxoXFwtfG9vfHBcXC0pfHNka1xcL3xzZShjKFxcLXwwfDEpfDQ3fG1jfG5kfHJpKXxzZ2hcXC18c2hhcnxzaWUoXFwtfG0pfHNrXFwtMHxzbCg0NXxpZCl8c20oYWx8YXJ8YjN8aXR8dDUpfHNvKGZ0fG55KXxzcCgwMXxoXFwtfHZcXC18diApfHN5KDAxfG1iKXx0MigxOHw1MCl8dDYoMDB8MTB8MTgpfHRhKGd0fGxrKXx0Y2xcXC18dGRnXFwtfHRlbChpfG0pfHRpbVxcLXx0XFwtbW98dG8ocGx8c2gpfHRzKDcwfG1cXC18bTN8bTUpfHR4XFwtOXx1cChcXC5ifGcxfHNpKXx1dHN0fHY0MDB8djc1MHx2ZXJpfHZpKHJnfHRlKXx2ayg0MHw1WzAtM118XFwtdil8dm00MHx2b2RhfHZ1bGN8dngoNTJ8NTN8NjB8NjF8NzB8ODB8ODF8ODN8ODV8OTgpfHczYyhcXC18ICl8d2ViY3x3aGl0fHdpKGcgfG5jfG53KXx3bWxifHdvbnV8eDcwMHx5YXNcXC18eW91cnx6ZXRvfHp0ZVxcLS9pLnRlc3QodXNlckFnZW50LnN1YnN0cigwLDQpKTtcclxuICB9O1xyXG5cclxuICByZXR1cm4gc2NvcGU7XHJcbn0pKCk7XHJcblxyXG4vKiogPT09PT0gUFJJVkFURSA9PT09PSAqL1xyXG5mdW5jdGlvbiBfZ2V0V2luZG93U2l6ZSgpIHtcclxuICByZXR1cm4ge1xyXG4gICAgeDogd2luZG93LmlubmVyV2lkdGgsXHJcbiAgICB5OiB3aW5kb3cuaW5uZXJIZWlnaHRcclxuICB9O1xyXG59IiwiJ3VzZXIgc3RyaWN0JztcclxuXHJcbi8qKiBUaGUgY29yZSBwbHVnaW4gZm9yIHRoZSAyRCBtYXAgZW5naW5lLiBIYW5kbGVzIHpvb21pbmcgZm9yIHRoZSBtYXAuIENvcmUgcGx1Z2lucyBjYW4gYWx3YXlzIGJlIG92ZXJ3cm90ZSBpZiBuZWVkZWQgKi9cclxuXHJcbi8qKiBAdG9kbyBDaGFuZ2UgdGhlIG1hcCBtb3ZlIGFmdGVyIHpvb21pbmcgdG8gYmUgbW91c2UgYmFzZWQgb3Igc3VjaC4gTm93IGl0IGlzIGJhc2VkIG9uIHRoZSBtYXAgY29ybmVycyBjb29yZGluYXRlcyAqL1xyXG5cclxuLyoqID09PT09IE9XTiBpbXBvcnRzID09PT09ICovXHJcbmltcG9ydCB7IHJlc2l6ZVV0aWxzIH0gZnJvbSBcIi4uL3V0aWxzL3V0aWxzLmpzXCI7XHJcbmltcG9ydCB7IGV2ZW50TGlzdGVuZXJzIGFzIGV2ZW50TGlzdGVuZXJNb2QgfSBmcm9tICcuLi9ldmVudGxpc3RlbmVycyc7XHJcblxyXG5leHBvcnQgbGV0IG1hcF96b29tID0gKGZ1bmN0aW9uIG1hcF96b29tKCkge1xyXG4gIC8qIE1heGltdW0gYW5kIG1pbmltdW0gdGhlIHBsYXllciBjYW4gem9vbXQgaGUgbWFwICovXHJcbiAgdmFyIHpvb21MaW1pdCA9IHtcclxuICAgIGZhcnRoZXI6IDAuNCxcclxuICAgIGNsb3NlciA6IDIuNVxyXG4gIH07XHJcbiAgLyogSG93IG11Y2ggb25lIHN0ZXAgb2Ygem9vbWluZyBhZmZlY3RzOiAqL1xyXG4gIHZhciB6b29tTW9kaWZpZXIgPSAwLjE7XHJcblxyXG4gIC8qID09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgIE1PRFVMRSBBUEkgKGluIHNjb3BlKVxyXG4gICAgID09PT09PT09PT09PT09PT09PT09PSAqL1xyXG4gIHZhciBzY29wZSA9IHt9O1xyXG4gIHNjb3BlLnBsdWdpbk5hbWUgPSBcIm1hcF96b29tXCI7XHJcblxyXG4gIC8qKiBSZXF1aXJlZCBpbml0IGZ1bmN0aW9ucyBmb3IgdGhlIHBsdWdpblxyXG4gICogQHBhcmFtIHtNYXAgb2JqZWN0fSBtYXBPYmogLSB0aGUgTWFwIGNsYXNzIG9iamVjdCAqL1xyXG4gIHNjb3BlLmluaXQgPSBmdW5jdGlvbihtYXApIHtcclxuICAgIG1hcC5zZXRQcm90b3R5cGUoXCJ6b29tSW5cIiwgem9vbUluKTtcclxuICAgIG1hcC5zZXRQcm90b3R5cGUoXCJ6b29tT3V0XCIsIHpvb21PdXQpO1xyXG4gICAgLyogQHRvZG8gdGhpbmsgdGhyb3VnaCBzaG91bGQgdGhlc2UgYmUgaW4gbWFwLnByb3RvdHlwZT8gQnV0IHpvb21MaW1pdCBhbmQgbW9kaWZpZXIgbmVlZCB0byBiZSBzZXRhYmxlIGluIGNyZWF0aW9uLFxyXG4gICAgaW5pdCBvciBsYXRlciB3aXRoIHNldHRlcnMgKi9cclxuICAgIG1hcC5zZXRQcm90b3R5cGUoXCJzZXRab29tTGltaXRzXCIsIHNldFpvb21MaW1pdHMpO1xyXG4gICAgbWFwLnNldFByb3RvdHlwZShcInNldFpvb21Nb2RpZmllclwiLCBzZXRab29tTW9kaWZpZXIpO1xyXG5cclxuICAgIGlmKG1hcC5nZXRFbnZpcm9ubWVudCgpID09PSBcIm1vYmlsZVwiKSB7XHJcbiAgICAgIG1hcC5ldmVudENCcy56b29tID0gX3NldHVwWm9vbUV2ZW50X21vYmlsZShtYXApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgbWFwLmV2ZW50Q0JzLnpvb20gPSBfc2V0dXBab29tRXZlbnQobWFwKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiBTaW5nbGV0b24gc2hvdWxkIGhhdmUgYmVlbiBpbnN0YW50aWF0ZWQgYmVmb3JlLCB3ZSBvbmx5IHJldHJpZXZlIGl0IHdpdGggMCBwYXJhbXMgKi9cclxuICAgIGV2ZW50TGlzdGVuZXJNb2QoKS50b2dnbGVab29tTGlzdGVuZXIoKTtcclxuICB9O1xyXG5cclxuICAvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgIHByaXZhdGUgZnVuY3Rpb25zIHJldmVhbGVkIGZvciB0ZXN0aW5nXHJcbiAgICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0qL1xyXG4gIC8vc2NvcGUuX3NldHVwWm9vbUV2ZW50ID0gX3NldHVwWm9vbUV2ZW50O1xyXG5cclxuICByZXR1cm4gc2NvcGU7XHJcblxyXG4gIC8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgICBQUk9UT1RZUEUgZXh0ZW5zaW9ucyBmb3IgbWFwXHJcbiAgICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PSovXHJcbiAgLyoqIEhvdyBtdWNoIG9uZSBtb3VzZSB3aGVlbCBzdGVwIHpvb21zXHJcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGFtb3VudCBIb3cgbXVjaCBvbmUgbW91c2Ugd2hlZWwgc3RlcCB6b29tcy4gTmVlZHMgdG8gYmUgaW4gYmV0d2VlbiAwIC0gMC41ICovXHJcbiAgZnVuY3Rpb24gc2V0Wm9vbU1vZGlmaWVyIChhbW91bnQpIHtcclxuICAgIGlmKCEgKGFtb3VudCA+IDAgfHwgYW1vdW50IDw9IDAuNSkgKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIldyb25nIHpvb20gbW9kaWZpZXIhIChuZWVkcyB0byBiZSA+MCBhbmQgPD0wLjUsIGdpdmVuOlwiICsgYW1vdW50KTtcclxuICAgIH1cclxuICAgIHpvb21Nb2RpZmllciA9IGFtb3VudDtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcbiAgLyoqIEhvdyBtdWNoIGNhbiBiZSB6b29tZWQgaW4gbWF4aW11bSBhbmQgbWluaW11bVxyXG4gICAqIEBwYXJhbSB7TnVtYmVyIDErfSBmYXJ0aGVyIEhvdyBtdWNoIG9uZSBtb3VzZSB3aGVlbCBzdGVwIHpvb21zIG91dFxyXG4gICAqIEBwYXJhbSB7TnVtYmVyIDAgLSAxfSBjbG9zZXIgSG93IG11Y2ggb25lIG1vdXNlIHdoZWVsIHN0ZXAgem9vbXMgaW4gKi9cclxuICBmdW5jdGlvbiBzZXRab29tTGltaXRzIChmYXJ0aGVyLCBjbG9zZXIpIHtcclxuICAgIHpvb21MaW1pdC5mYXJ0aGVyID0gZmFydGhlcjtcclxuICAgIHpvb21MaW1pdC5jbG9zZXIgPSBjbG9zZXI7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG4gIC8qKiBab29tIGluIHRvIHRoZSBtYXBcclxuICAgKiBAcGFyYW0ge051bWJlcn0gYW1vdW50IGhvdyBtdWNoIG1hcCBpcyB6b29tZWQgaW4gKi9cclxuICBmdW5jdGlvbiB6b29tSW4gKGFtb3VudCkge1xyXG4gICAgdmFyIG5ld1NjYWxlO1xyXG4gICAgdmFyIHpvb21MYXllciA9IHRoaXMuZ2V0Wm9vbUxheWVyKCk7XHJcblxyXG4gICAgaWYoICFfaXNPdmVyWm9vbUxpbWl0KHRoaXMuZ2V0U2NhbGUoKSwgdHJ1ZSkgKSB7XHJcbiAgICAgIG5ld1NjYWxlID0gem9vbUxheWVyLnNjYWxlLnkgPSB6b29tTGF5ZXIuc2NhbGUueCArPSAoIGFtb3VudCB8fCB6b29tTW9kaWZpZXIgKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbmV3U2NhbGU7XHJcbiAgfVxyXG4gIC8qKiBab29tIG91dCBvZiB0aGUgbWFwXHJcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGFtb3VudCBob3cgbXVjaCBtYXAgaXMgem9vbWVkIG91dCAqL1xyXG4gIGZ1bmN0aW9uIHpvb21PdXQgKGFtb3VudCkge1xyXG4gICAgdmFyIG5ld1NjYWxlO1xyXG4gICAgdmFyIHpvb21MYXllciA9IHRoaXMuZ2V0Wm9vbUxheWVyKCk7XHJcblxyXG4gICAgaWYoICFfaXNPdmVyWm9vbUxpbWl0KHRoaXMuZ2V0U2NhbGUoKSkgKSB7XHJcbiAgICAgIG5ld1NjYWxlID0gem9vbUxheWVyLnNjYWxlLnkgPSB6b29tTGF5ZXIuc2NhbGUueCAtPSAoIGFtb3VudCB8fCB6b29tTW9kaWZpZXIgKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbmV3U2NhbGU7XHJcbiAgfVxyXG5cclxuICAvKiA9PT09PT09PT09PT1cclxuICAgICBJbml0aWFsaXplcnNcclxuICAgICA9PT09PT09PT09PT0gKi9cclxuICBmdW5jdGlvbiBfc2V0dXBab29tRXZlbnQobWFwKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gaGFuZGxlWm9vbUV2ZW50KGUsIGRlbHRhLCBkZWx0YVgsIGRlbHRhWSkge1xyXG4gICAgICB2YXIgbW91c2VXaGVlbERlbHRhID0gZGVsdGFZO1xyXG4gICAgICAvKiBXZSB1c2Ugb2xkIHNjYWxlLCBzaW5jZSB0aGUgc2NhbGUgcmVhbGx5IGNoYW5nZXMgd2hlbiB0aGUgbWFwIGlzIGRyYXduLiBTbyB3ZSBtdXN0IG1ha2UgY2FsY3VsYXRpb25zIHdpdGggdGhlXHJcbiAgICAgIG9sZCBzY2FsZSBub3cgKi9cclxuICAgICAgdmFyIG9sZFNjYWxlID0gbWFwLmdldFNjYWxlKCk7XHJcblxyXG4gICAgICAvKiBObyBuYXN0eSBzY3JvbGxpbmcgc2lkZS1lZmZlY3RzICovXHJcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgIGlmKG1vdXNlV2hlZWxEZWx0YSA+IDApIHtcclxuICAgICAgICBpZihtYXAuem9vbUluKCkpIHtcclxuICAgICAgICAgIG1hcC5tb3ZlTWFwKF9jYWxjdWxhdGVDZW50ZXJNb3ZlQ29vcmRpbmF0ZXMob2xkU2NhbGUsIHRydWUpKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSBpZihtb3VzZVdoZWVsRGVsdGEgPCAwKSB7XHJcbiAgICAgICAgaWYobWFwLnpvb21PdXQoKSkge1xyXG4gICAgICAgICAgbWFwLm1vdmVNYXAoX2NhbGN1bGF0ZUNlbnRlck1vdmVDb29yZGluYXRlcyhvbGRTY2FsZSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gbm8gbmVlZCB3aGVuIHdlIHVzZSBtYXAubW92ZTpcclxuICAgICAgLy9tYXAuZHJhd09uTmV4dFRpY2soKTtcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBfc2V0dXBab29tRXZlbnRfbW9iaWxlKG1hcCkge1xyXG4gICAgem9vbU1vZGlmaWVyID0gem9vbU1vZGlmaWVyICogMC41O1xyXG4gICAgdmFyIGluaXRpYWxpemVkID0gZmFsc2U7XHJcbiAgICB2YXIgZGlmZmVyZW5jZSA9IHt9O1xyXG5cclxuICAgIHJldHVybiBmdW5jdGlvbiBoYW5kbGVab29tRXZlbnRfbW9iaWxlKGUpIHtcclxuICAgICAgdmFyIHBvaW50ZXJzID0gZS5wb2ludGVycztcclxuICAgICAgdmFyIGNvb3JkcyA9IFt7XHJcbiAgICAgICAgICB4OiBwb2ludGVyc1swXS5wYWdlWCxcclxuICAgICAgICAgIHk6IHBvaW50ZXJzWzBdLnBhZ2VZXHJcbiAgICAgICAgfSx7XHJcbiAgICAgICAgICB4OiBwb2ludGVyc1sxXS5wYWdlWCxcclxuICAgICAgICAgIHk6IHBvaW50ZXJzWzFdLnBhZ2VZXHJcbiAgICAgIH1dO1xyXG4gICAgICB2YXIgY2hhbmdlWCA9IE1hdGguYWJzKCBjb29yZHNbMF0ueCAtIGNvb3Jkc1sxXS54ICk7XHJcbiAgICAgIHZhciBjaGFuZ2VZID0gTWF0aC5hYnMoIGNvb3Jkc1swXS55IC0gY29vcmRzWzFdLnkgKTtcclxuXHJcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgaWYoIWluaXRpYWxpemVkKSB7XHJcbiAgICAgICAgICBkaWZmZXJlbmNlID0ge1xyXG4gICAgICAgICAgICB4OiBjaGFuZ2VYLFxyXG4gICAgICAgICAgICB5OiBjaGFuZ2VZXHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgICAgaW5pdGlhbGl6ZWQgPSB0cnVlO1xyXG5cclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9IGVsc2UgaWYgKGUuaXNGaW5hbCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgYWxlcnQoXCJTVE9QXCIpO1xyXG4gICAgICAgICAgaW5pdGlhbGl6ZWQgPSBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKGRpZmZlcmVuY2UueCArIGRpZmZlcmVuY2UueSA8IGNoYW5nZVggKyBjaGFuZ2VZKSB7XHJcbiAgICAgICAgICBpZihtYXAuem9vbUluKHVuZGVmaW5lZCkpIHtcclxuICAgICAgICAgICAgbWFwLm1vdmVNYXAoX2NhbGN1bGF0ZUNlbnRlck1vdmVDb29yZGluYXRlcyhtYXAuZ2V0U2NhbGUoKSwgdHJ1ZSkpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBpZihtYXAuem9vbU91dCh1bmRlZmluZWQpKSB7XHJcbiAgICAgICAgICAgIG1hcC5tb3ZlTWFwKF9jYWxjdWxhdGVDZW50ZXJNb3ZlQ29vcmRpbmF0ZXMobWFwLmdldFNjYWxlKCkpKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIG5vIG5lZWQgd2hlbiB3ZSB1c2UgbWFwLm1vdmU6XHJcbiAgICAgICAgLy9tYXAuZHJhd09uTmV4dFRpY2soKTtcclxuXHJcbiAgICAgICAgZGlmZmVyZW5jZSA9IHtcclxuICAgICAgICAgIHg6IGNoYW5nZVgsXHJcbiAgICAgICAgICB5OiBjaGFuZ2VZXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yISBcIiwgZSk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgfVxyXG5cclxuICAvKiA9PT09PT09PT09PT09PT09PVxyXG4gICAgIFByaXZhdGUgZnVuY3Rpb25zXHJcbiAgICAgPT09PT09PT09PT09PT09PT0gKi9cclxuICBmdW5jdGlvbiBfaXNPdmVyWm9vbUxpbWl0KGFtb3VudCwgaXNab29tSW4pIHtcclxuICAgIGlmKCAoaXNab29tSW4gJiYgYW1vdW50ID4gem9vbUxpbWl0LmNsb3NlciApIHx8ICghaXNab29tSW4gJiYgYW1vdW50IDwgem9vbUxpbWl0LmZhcnRoZXIpICkge1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG4gIGZ1bmN0aW9uIF9jYWxjdWxhdGVDZW50ZXJNb3ZlQ29vcmRpbmF0ZXMoc2NhbGUsIGlzWm9vbUluKSB7XHJcbiAgICB2YXIgd2luZG93U2l6ZSA9IHJlc2l6ZVV0aWxzLmdldFdpbmRvd1NpemUoKTtcclxuICAgIHZhciBoYWxmV2luZG93U2l6ZSA9IHtcclxuICAgICAgeDogKCB3aW5kb3dTaXplLnggLyAyICkgLyBzY2FsZSxcclxuICAgICAgeTogKCB3aW5kb3dTaXplLnkgLyAyICkgLyBzY2FsZVxyXG4gICAgfTtcclxuICAgIHZhciByZWFsTW92ZW1lbnQgPSB7XHJcbiAgICAgIHg6ICggaGFsZldpbmRvd1NpemUueCApICogKCAoIGlzWm9vbUluID8gLXpvb21Nb2RpZmllciA6IHpvb21Nb2RpZmllcikgKSxcclxuICAgICAgeTogKCBoYWxmV2luZG93U2l6ZS55ICkgKiAoICggaXNab29tSW4gPyAtem9vbU1vZGlmaWVyIDogem9vbU1vZGlmaWVyKSApXHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiByZWFsTW92ZW1lbnQ7XHJcbiAgfVxyXG59KSgpOyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbi8qKlxyXG4gKiBAcmVxdWlyZSBCcm93c2VyIHRoYXQgc3VwcG9ydCBwb2ludGVyIGV2ZW50cyBvciBQb2ludGVyIGV2ZW50cyBwb2x5ZmlsbCwgc3VjaCBhczogaHR0cHM6Ly9naXRodWIuY29tL2pxdWVyeS9QRVAgKi9cclxuXHJcbmltcG9ydCB7IGV2ZW50TGlzdGVuZXJzIGFzIGV2ZW50TGlzdGVuZXJNb2QgfSBmcm9tICcuLi8uLi8uLi9jb3JlL2V2ZW50bGlzdGVuZXJzJztcclxuaW1wb3J0IHsgbW91c2VVdGlscyB9IGZyb20gJy4uLy4uLy4uL2NvcmUvdXRpbHMvdXRpbHMnO1xyXG5cclxuLyogZXZlbnRsaXN0ZW5lcnMgaXMgYSBzaW5nbGV0b24sIHNvIHdlIG1pZ2h0IGFzIHdlbGwgZGVjbGFyZSBpdCBoZXJlICovXHJcbnZhciBldmVudGxpc3RlbmVycztcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXR1cEhleGFnb25DbGljayhtYXAsIGNhbGxiYWNrKSB7XHJcbiAgLyogU2luZ2xldG9uIHNob3VsZCBoYXZlIGJlZW4gaW5zdGFudGlhdGVkIGJlZm9yZSwgd2Ugb25seSByZXRyaWV2ZSBpdCB3aXRoIDAgcGFyYW1zISAqL1xyXG4gIGV2ZW50bGlzdGVuZXJzID0gZXZlbnRMaXN0ZW5lck1vZCgpO1xyXG5cclxuICBpZihtYXAuZ2V0RW52aXJvbm1lbnQoKSA9PT0gXCJtb2JpbGVcIikge1xyXG4gICAgbWFwLmV2ZW50Q0JzLnNlbGVjdCA9IHNldHVwVGFwTGlzdGVuZXIobWFwLCBjYWxsYmFjayk7XHJcbiAgfSBlbHNlIHtcclxuICAgIG1hcC5ldmVudENCcy5zZWxlY3QgPSBtb3VzZURvd25MaXN0ZW5lcjtcclxuICB9XHJcbiAgZXZlbnRsaXN0ZW5lcnMudG9nZ2xlU2VsZWN0TGlzdGVuZXIoKTtcclxuXHJcbiAgcmV0dXJuIGZhbHNlO1xyXG5cclxuICBmdW5jdGlvbiBtb3VzZURvd25MaXN0ZW5lcigpIHtcclxuICAgIG9uTW91c2VVcChtYXAsIGNhbGxiYWNrKTtcclxuICB9XHJcbiAgZnVuY3Rpb24gc2V0dXBUYXBMaXN0ZW5lcihtYXAsIGNhbGxiYWNrKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gdGFwTGlzdGVuZXIoZSkge1xyXG4gICAgICB2YXIgdG91Y2hDb29yZHMgPSBlLmNlbnRlcjtcclxuICAgICAgdmFyIGdsb2JhbENvb3JkcyA9ICB7XHJcbiAgICAgICAgeDogdG91Y2hDb29yZHMueCwgeTogdG91Y2hDb29yZHMueVxyXG5cclxuICAgICAgfTtcclxuICAgICAgdmFyIG9iamVjdHM7XHJcblxyXG4gICAgICBvYmplY3RzID0gbWFwLmdldE9iamVjdHNVbmRlclBvaW50KGdsb2JhbENvb3JkcywgXCJ1bml0c1wiKTtcclxuXHJcbiAgICAgIGlmIChvYmplY3RzICYmIG9iamVjdHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIGNhbGxiYWNrKG9iamVjdHMpO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gb25Nb3VzZVVwKG1hcCwgY2FsbGJhY2spIHtcclxuICBtYXAuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIHJldHJpZXZlQ2xpY2tEYXRhKTtcclxuXHJcbiAgZnVuY3Rpb24gcmV0cmlldmVDbGlja0RhdGEoZSkge1xyXG4gICAgaWYoIG1hcC5tYXBNb3ZlZCgpICkge1xyXG4gICAgICBtYXAuY2FudmFzLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIHJldHJpZXZlQ2xpY2tEYXRhKTtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBnbG9iYWxDb29yZHMgPSBtb3VzZVV0aWxzLmdldEV2ZW50Q29vcmRzT25QYWdlKGUpO1xyXG4gICAgdmFyIG9iamVjdHMsIGxldmVsZWRPYmplY3RzO1xyXG5cclxuICAgIG9iamVjdHMgPSBtYXAuZ2V0T2JqZWN0c1VuZGVyUG9pbnQoZ2xvYmFsQ29vcmRzLCBcInVuaXRzXCIpO1xyXG5cclxuICAgIGxldmVsZWRPYmplY3RzID0gT2JqZWN0LmtleXMob2JqZWN0cykubWFwKG9iakdyb3VwID0+IHtcclxuICAgICAgcmV0dXJuIG9iamVjdHNbb2JqR3JvdXBdO1xyXG4gICAgfSk7XHJcbiAgICBpZiAobGV2ZWxlZE9iamVjdHMgJiYgbGV2ZWxlZE9iamVjdHMubGVuZ3RoID4gMCkge1xyXG4gICAgICBsZXQgbWVyZ2VkID0gW107XHJcblxyXG4gICAgICBjYWxsYmFjayhtZXJnZWQuY29uY2F0LmFwcGx5KG1lcmdlZCwgbGV2ZWxlZE9iamVjdHMpKTtcclxuICAgIH1cclxuXHJcbiAgICBtYXAuY2FudmFzLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIHJldHJpZXZlQ2xpY2tEYXRhKTtcclxuICB9XHJcbn0iLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgeyBjcmVhdGVIZXhhZ29uIH0gZnJvbSAnLi4vdXRpbHMvcGl4aV9jcmVhdGVIZXhhZ29uJztcclxuaW1wb3J0IGhleGFnb25NYXRoIGZyb20gJy4uL3V0aWxzL2hleGFnb25NYXRoJztcclxuXHJcbnZhciBzaGFwZTtcclxuXHJcbmV4cG9ydCB2YXIgb2JqZWN0X3Nwcml0ZV9oZXhhID0ge1xyXG4gIGJ1aWxkOiBmdW5jdGlvbiBjYWxjdWxhdGVIZXhhKHJhZGl1cykge1xyXG4gICAgICBpZiAoIXJhZGl1cykge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIk5lZWQgcmFkaXVzIVwiKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgSEVJR0hUID0gaGV4YWdvbk1hdGguY2FsY0hlaWdodChyYWRpdXMpO1xyXG4gICAgICBjb25zdCBTSURFID0gaGV4YWdvbk1hdGguY2FsY1NpZGUocmFkaXVzKTtcclxuXHJcbiAgICAgIHRoaXMuYW5jaG9yLnNldCgwLjUsIDAuNSk7XHJcbiAgICAgIHRoaXMuSEVJR0hUID0gSEVJR0hUO1xyXG4gICAgICB0aGlzLlNJREUgPSBTSURFO1xyXG5cclxuICAgICAgLyogRHJhdyBoZXhhZ29uIHRvIHRlc3QgdGhlIGhpdHMgd2l0aCBoaXRBcmVhICovXHJcbiAgICAgIHRoaXMuaGl0QXJlYSA9IHNldEFuZEdldFNoYXBlKHJhZGl1cyk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5mdW5jdGlvbiBzZXRBbmRHZXRTaGFwZShyYWRpdXMpIHtcclxuICBpZiAoIXNoYXBlKSB7XHJcbiAgICAvKiB4IGFuZCB5IGFyZSByZXZlcnNlZCwgc2luY2UgdGhpcyBpcyBob3Jpem9udGFsIGhleGFnb24gYW5kIGNhbGN1bGF0aW9ucyBhcmUgZm9yIHZlcnRpY2FsICovXHJcbiAgICBzaGFwZSA9IGNyZWF0ZUhleGFnb24ocmFkaXVzKTtcclxuICB9XHJcblxyXG4gIHJldHVybiBzaGFwZTtcclxufSIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCB7IG9iamVjdF9zcHJpdGVfaGV4YSB9IGZyb20gJy4vcGl4aV9PYmplY3RfaGV4YSc7XHJcbmltcG9ydCB7IE9iamVjdF9zcHJpdGVfdGVycmFpbiB9IGZyb20gJy4uLy4uLy4uL2NvcmUvb2JqZWN0cy9waXhpX09iamVjdF9zcHJpdGVfdGVycmFpbic7XHJcblxyXG5leHBvcnQgY2xhc3MgT2JqZWN0X3RlcnJhaW4gZXh0ZW5kcyBPYmplY3Rfc3ByaXRlX3RlcnJhaW4ge1xyXG4gIGNvbnN0cnVjdG9yKGNvb3JkcyA9IHt4OjAsIHk6MH0sIGRhdGEsIGN1cnJlbnRGcmFtZU51bWJlciwgZXh0cmEgPSB7cmFkaXVzOiAwIH0pIHtcclxuICAgIHN1cGVyKGNvb3JkcywgZGF0YSwgY3VycmVudEZyYW1lTnVtYmVyKTtcclxuXHJcbiAgICB0aGlzLm5hbWUgPSBcIkRlZmF1bHRUZXJyYWluT2JqZWN0X2hleGFcIjtcclxuXHJcbiAgICBvYmplY3Rfc3ByaXRlX2hleGEuYnVpbGQuY2FsbCh0aGlzLCBleHRyYS5yYWRpdXMpO1xyXG4gIH1cclxufSIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCB7IG9iamVjdF9zcHJpdGVfaGV4YSB9IGZyb20gJy4vcGl4aV9PYmplY3RfaGV4YSc7XHJcbmltcG9ydCB7IE9iamVjdF9zcHJpdGVfdW5pdCB9IGZyb20gJy4uLy4uLy4uL2NvcmUvb2JqZWN0cy9waXhpX09iamVjdF9zcHJpdGVfdW5pdCc7XHJcblxyXG5leHBvcnQgY2xhc3MgT2JqZWN0X3VuaXQgZXh0ZW5kcyBPYmplY3Rfc3ByaXRlX3VuaXQge1xyXG4gIGNvbnN0cnVjdG9yKGNvb3JkcyA9IHt4OjAsIHk6MH0sIGRhdGEsIGN1cnJlbnRGcmFtZU51bWJlciwgZXh0cmEgPSB7cmFkaXVzOiAwIH0pIHtcclxuICAgIHN1cGVyKGNvb3JkcywgZGF0YSwgY3VycmVudEZyYW1lTnVtYmVyKTtcclxuXHJcbiAgICB0aGlzLm5hbWUgPSBcIkRlZmF1bHRVbml0T2JqZWN0c19oZXhhXCI7XHJcblxyXG4gICAgb2JqZWN0X3Nwcml0ZV9oZXhhLmJ1aWxkLmNhbGwodGhpcywgZXh0cmEucmFkaXVzKTtcclxuICB9XHJcbn0iLCIvKkNhbGN1bGF0ZSB0aGUgY29vcmRpbmF0ZXMgb2YgdGhlIGNlbnRlciBoZXhhZ29uIGFsd2F5cyBhbmQgZ2V0IG9iamVjdHMgYmFzZWQgb24gdGhlIGNvb3JkaW5hdGVzLiBGb3IgZXhhbXBsZSB3aXRoXHJcbiAgc29tZSBtZXRob2QgbGlrZSBnZXRBbGxPYmplY3RzSW5IZXhhZ29uLlxyXG5TTzpcclxuV2UgY3JlYXRlIGEgZnVuY3Rpb24gZm9yIGxheWVycywgbGlrZSBcIm1hcF91dGlsc19oZXhhZ29uPyAtPiBnZXRIZXhhZ29uQ29vcmRzRnJvbUNsaWNrKHgseSksIGdldE9iamVjdHNJbkhleGFnb24oaGV4YWdvbj8pXCJcclxuLSBUaGVyZSB3ZSBvbmx5IGZpbmQgb3V0IGFib3V0IHRoZSBjb29yZGluYXRlcyBmb3IgdGhlIG9iamVjdCwgd2UgZG9udCB1c2UgZ2V0T0JqZWN0VW5kZXJQb2ludC4gSWYgdGhlIGNvb3JkcyBlcXVhbCB0b1xyXG50aG9zZSBnb3R0ZW4gZnJvbTogZ2V0SGV4YWdvbkNvb3Jkc0Zyb21DbGljaywgdGhlbiB0aGF0IG9iamVjdCBpcyBhZGRlZCB0byByZXR1cm5lZCBhcnJheS4gV2UgY2FuIGFsc28gY2FjaGUgdGhlc2UgaWZcclxubmVlZGVkIGZvciBwZXJmb3JtYW5jZVxyXG5cclxuSE9XIHdlIGRvIHRoZSB3aG9sZSBvcmdhbml6YXRpb25hbCBzdHVmZj9cclxuLSBtYXBfbW92ZVxyXG4tIG1hcF91dGlsc19oZXhhZ29uPyAtPiBnZXRIZXhhZ29uQ29vcmRzRnJvbUNsaWNrKHgseSksIGdldE9iamVjdHNJbkhleGFnb24oaGV4YWdvbj8pXHJcbiovXHJcblxyXG4ndXNlIHN0cmljdCc7XHJcblxyXG4vL2ltcG9ydCB7IG1hcF9jb29yZHNfaG9yaXpvbnRhbEhleCB9IGZyb20gJy4uL2Nvb3JkaW5hdGVzL01hcF9jb29yZHNfaG9yaXpvbnRhbEhleCc7XHJcbmltcG9ydCB7IHNldHVwSGV4YWdvbkNsaWNrIH0gZnJvbSAnLi4vZXZlbnRMaXN0ZW5lcnMvc2VsZWN0JztcclxuaW1wb3J0IHsgVUkgfSBmcm9tICcuLi8uLi8uLi9jb3JlL1VJJztcclxuXHJcbmV4cG9ydCBsZXQgb2JqZWN0X3NlbGVjdF9oZXhhZ29uID0gKGZ1bmN0aW9uIG9iamVjdF9zZWxlY3RfaGV4YWdvbigpIHtcclxuICB2YXIgc2NvcGUgPSB7fTtcclxuICB2YXIgbWFwID0ge307XHJcbiAgc2NvcGUucGx1Z2luTmFtZSA9IFwib2JqZWN0X3NlbGVjdFwiO1xyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0ge01hcCBvYmplY3R9IG1hcE9iaiAtIHRoZSBNYXAgY2xhc3Mgb2JqZWN0XHJcbiAgICovXHJcbiAgc2NvcGUuaW5pdCA9IGZ1bmN0aW9uKG1hcE9iaikge1xyXG4gICAgbWFwID0gbWFwT2JqO1xyXG4gICAgLyogV2UgdGFrZSB0aGUgdG9wLW1vc3Qgc3RhZ2Ugb24gdGhlIG1hcCBhbmQgYWRkIHRoZSBsaXN0ZW5lciB0byBpdCAqL1xyXG4gICAgX2NyZWF0ZVByb3RvdHlwZXMobWFwT2JqKTtcclxuXHJcbiAgICBfc3RhcnRDbGlja0xpc3RlbmVyKG1hcE9iaik7XHJcbiAgfTtcclxuXHJcbiAgcmV0dXJuIHNjb3BlO1xyXG5cclxuICBmdW5jdGlvbiBnZXRPYmplY3RzRm9yTWFwKGNsaWNrQ29vcmRzLCBncm91cCkge1xyXG4gICAgdmFyIG9iamVjdHMgPSB7fTtcclxuXHJcbiAgICBvYmplY3RzW2dyb3VwXSA9IG1hcC5vYmplY3RNYW5hZ2VyLnJldHJpZXZlKGdyb3VwLCBjbGlja0Nvb3Jkcyk7XHJcblxyXG4gICAgcmV0dXJuIG9iamVjdHM7XHJcbiAgfVxyXG4gIC8qID09PT09PSBQcml2YXRlIGZ1bmN0aW9ucyA9PT09PT0gKi9cclxuICAvKipcclxuICAgKiBBdHRhY2hlZCB0aGUgY29ycmVjdCBwcm90b3R5cGVzIHRvIG1hcC4gSSBkbyBub3QgdGhpbmsgd2UgbmVlZCB0byBvdmVycmlkZSBnZXRPYmplY3RzVW5kZXJQb2ludCBmb3Igc3RhZ2VzLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtjcmVhdGVqcy5TdGFnZX0gdG9wTW9zdFN0YWdlIC0gY3JlYXRlanMuU3RhZ2Ugb2JqZWN0LCB0aGF0IGlzIHRoZSB0b3Btb3N0IG9uIHRoZSBtYXAgKG1lYW50IGZvciBpbnRlcmFjdGlvbikuXHJcbiAgICogQHBhcmFtIHtNYXB9IG1hcCAtIFRoZSBNYXAgY2xhc3Mgb2JqZWN0XHJcbiAgICovXHJcbiAgZnVuY3Rpb24gX2NyZWF0ZVByb3RvdHlwZXMobWFwKSB7XHJcbiAgICBtYXAub2JqZWN0TWFuYWdlci5oaXRUZXN0ID0gaGl0VGVzdDtcclxuICAgIG1hcC5zZXRQcm90b3R5cGUoXCJnZXRPYmplY3RzVW5kZXJQb2ludFwiLCBnZXRPYmplY3RzRm9yTWFwKTtcclxuICB9XHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHtjcmVhdGVqcy5TdGFnZX0gdG9wTW9zdFN0YWdlIC0gY3JlYXRlanMuU3RhZ2Ugb2JqZWN0LCB0aGF0IGlzIHRoZSB0b3Btb3N0IG9uIHRoZSBtYXAgKG1lYW50IGZvciBpbnRlcmFjdGlvbikuXHJcbiAgICogQHBhcmFtIHtNYXB9IG1hcCAtIFRoZSBNYXAgY2xhc3Mgb2JqZWN0XHJcbiAgICovXHJcbiAgZnVuY3Rpb24gX3N0YXJ0Q2xpY2tMaXN0ZW5lciggbWFwICkge1xyXG4gICAgdmFyIHNpbmdsZXRvblVJID0gVUkoKTtcclxuXHJcbiAgICByZXR1cm4gc2V0dXBIZXhhZ29uQ2xpY2sobWFwLCBzaW5nbGV0b25VSS5zaG93U2VsZWN0aW9ucyk7XHJcbiAgfVxyXG4gIGZ1bmN0aW9uIGhpdFRlc3Qob2JqLCBjb29yZHMpIHtcclxuICAgIHZhciBpc0hpdCA9IHRoaXMuaGl0RGV0ZWN0b3IucHJvY2Vzc0ludGVyYWN0aXZlKFxyXG4gICAgICBuZXcgUElYSS5Qb2ludChjb29yZHMueCwgY29vcmRzLnkpLFxyXG4gICAgICBvYmosXHJcbiAgICAgIGZ1bmN0aW9uKHBhcmVudCwgaGl0cykge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiU2hvdWxkbid0IGdldCBoZXJlLCB0aGUgb2JqZWN0IHNob3VsZCBiZSBub24taW50ZXJhY3RpdmVcIik7XHJcbiAgICAgIH0sXHJcbiAgICAgIHRydWUsXHJcbiAgICAgIHRydWUpO1xyXG5cclxuICAgIHJldHVybiBpc0hpdDtcclxuICB9XHJcbn0pKCk7IiwiJ3VzZSBzdHJpY3QnXHJcblxyXG5pbXBvcnQgeyBjYWxjSGVpZ2h0LCBnZXRIZXhhZ29uUG9pbnRzIH0gZnJvbSAnLi9oZXhhZ29uTWF0aCc7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlSGV4YWdvbihyYWRpdXMpIHtcclxuICByZXR1cm4gZ2V0SGV4YWdvblBvaW50cyhyYWRpdXMpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlVmlzaWJsZUhleGFnb24oY29vcmRzID0geyB4OjAsIHk6MCB9LCByYWRpdXMsIGNvbG9yID0gXCIjNDQ0NDQ0XCIsIGFuZ2xlID0gMzApIHtcclxuICB2YXIgc2hhcGUgPSBuZXcgY3JlYXRlanMuU2hhcGUoKTtcclxuXHJcbiAgc2hhcGUuZ3JhcGhpY3MuYmVnaW5GaWxsKGNvbG9yKVxyXG4gICAgLmRyYXdQb2x5U3RhciAoIGNvb3Jkcy54LCBjb29yZHMueSwgcmFkaXVzLCA2LCAwLCBhbmdsZSApO1xyXG5cclxuICByZXR1cm4gc2hhcGU7XHJcbn0iLCIndXNlIHN0cmljdCc7XHJcbi8qIE5PVEU6IFRoZXNlIGNhbGN1bGF0aW9ucyBhcmUgZm9yIHZlcnRpY2FsIGhleGFnb25zICovXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY2FsY0hlaWdodChyYWRpdXMpIHtcclxuICAvL3JldHVybiByYWRpdXM7XHJcbiAgcmV0dXJuIHJhZGl1cyAqIE1hdGguc3FydCgzKTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gY2FsY1dpZHRoKHJhZGl1cykge1xyXG4gIHJldHVybiByYWRpdXMgKiBNYXRoLnNxcnQoMyk7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGNhbGNTaWRlKHJhZGl1cykge1xyXG4gIHJldHVybiByYWRpdXMgKiAzIC8gMjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldEhleGFnb25Qb2ludHMocmFkaXVzLCB4ID0gMCwgeSA9IDAsIGlzRmxhdFRvcCA9IGZhbHNlKSB7XHJcbiAgdmFyIGkgPSAwLFxyXG4gICAgb2Zmc2V0ID0gaXNGbGF0VG9wID8gMCA6IDAuNSxcclxuICAgIGFuZ2xlID0gMiAqIE1hdGguUEkgLyA2ICogb2Zmc2V0LFxyXG4gICAgaGV4YWdvblNpemUgPSB7XHJcbiAgICAgIHg6IGNhbGNXaWR0aChyYWRpdXMpIC8gMixcclxuICAgICAgeTogcmFkaXVzXHJcbiAgICB9LFxyXG4gICAgeCA9ICggaGV4YWdvblNpemUueCAqIE1hdGguY29zKGFuZ2xlKSApICsgeCxcclxuICAgIHkgPSAoIGhleGFnb25TaXplLnkgKiBNYXRoLnNpbihhbmdsZSkgKSArIHksXHJcbiAgICBwb2ludHMgPSBbXTtcclxuXHJcbiAgeSA9IHkgLSBoZXhhZ29uU2l6ZS55IC8gMjtcclxuXHJcbiAgcG9pbnRzLnB1c2goe1xyXG4gICAgeCxcclxuICAgIHlcclxuICB9KTtcclxuXHJcbiAgZm9yIChpID0gMTsgaSA8IDc7IGkrKykge1xyXG4gICAgYW5nbGUgPSAyICogTWF0aC5QSSAvIDYgKiAoaSArIG9mZnNldCk7XHJcbiAgICB4ID0gKCBoZXhhZ29uU2l6ZS54ICogTWF0aC5jb3MoYW5nbGUpICkgKyB4O1xyXG4gICAgeSA9ICggaGV4YWdvblNpemUueSAqIE1hdGguc2luKGFuZ2xlKSApICsgeTtcclxuXHJcbiAgICBwb2ludHMucHVzaCh7XHJcbiAgICAgIHgsXHJcbiAgICAgIHlcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHBvaW50cztcclxufVxyXG5cclxuLyogTW9kaWZpZWQgRnJvbSBqYXZhIGV4YW1wbGU6IGh0dHA6Ly9ibG9nLnJ1c2xhbnMuY29tLzIwMTEvMDIvaGV4YWdvbmFsLWdyaWQtbWF0aC5odG1sXHJcbiAgIFRoaXMgaXMgc3VwcG9zZWQgdG8gY2FsY3VsYXRlIHRoZSBjb3JyZWN0IGhleGFnb25hbCBpbmRleCwgdGhhdCByZXByZXNlbnRzIHRoZSBoZXhhZ29uIHRoZSBwbGF5ZXIgY2xpY2tlZCAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc2V0Q2VsbEJ5UG9pbnQocmFkaXVzLCB4LCB5KSB7XHJcbiAgdmFyIEhFSUdIVCA9IHJhZGl1cyAqIE1hdGguc3FydCgzKTtcclxuICB2YXIgU0lERSA9IHJhZGl1cyAqIDMgLyAyO1xyXG5cclxuICB2YXIgY2kgPSBNYXRoLmZsb29yKHgvU0lERSk7XHJcbiAgdmFyIGN4ID0geCAtIFNJREUgKiBjaTtcclxuXHJcbiAgdmFyIHR5ID0geSAtIChjaSAlIDIpICogSEVJR0hUIC8gMjtcclxuICB2YXIgY2ogPSBNYXRoLmZsb29yKCB0eSAvIEhFSUdIVCk7XHJcbiAgdmFyIGN5ID0gdHkgLSBIRUlHSFQgKiBjajtcclxuXHJcbiAgaWYgKGN4ID4gTWF0aC5hYnMocmFkaXVzIC8gMiAtIHJhZGl1cyAqIGN5IC8gSEVJR0hUKSkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICB4OiBjaSxcclxuICAgICAgICB5OiBjalxyXG4gICAgICB9O1xyXG4gIH0gZWxzZSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICB4OiBjaSAtIDEsXHJcbiAgICAgIHk6IGNqICsgKGNpICUgMikgLSAoKGN5IDwgSEVJR0hUIC8gMikgPyAxIDogMClcclxuICAgIH07XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0SGV4YVNpemUocmFkaXVzKSB7XHJcbiAgcmV0dXJuIHtcclxuICAgIHJhZGl1czogcmFkaXVzLFxyXG4gICAgeDogcmFkaXVzICogMixcclxuICAgIHk6IHJhZGl1cyAqIE1hdGguc3FydCgzKVxyXG4gIH07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiB0b0hleGFDZW50ZXJDb29yZChoZXhSYWRpdXMsIHgsIHkpIHtcclxuICB2YXIgaGV4YVNpemUgPSBnZXRIZXhhU2l6ZShoZXhSYWRpdXMpO1xyXG4gIHZhciByYWRpdXMgPSBoZXhhU2l6ZS5yYWRpdXM7XHJcbiAgdmFyIGhhbGZIZXhhU2l6ZSA9IHtcclxuICAgIHg6IGhleGFTaXplLnJhZGl1cyxcclxuICAgIHk6IGhleGFTaXplLnkgKiAwLjVcclxuICB9O1xyXG4gIHZhciBjZW50ZXJDb29yZHMgPSB7fTtcclxuICB2YXIgY29vcmRpbmF0ZUluZGV4ZXM7XHJcblxyXG4gIGNvb3JkaW5hdGVJbmRleGVzID0gc2V0Q2VsbEJ5UG9pbnQocmFkaXVzLCB4LCB5KTtcclxuXHJcbiAgaWYgKGNvb3JkaW5hdGVJbmRleGVzLnggPCAwICYmIGNvb3JkaW5hdGVJbmRleGVzLnggPCAwKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJjbGljayBvdXRzaWRlIG9mIHRoZSBoZXhhZ29uIGFyZWFcIik7XHJcbiAgfVxyXG4gIGNlbnRlckNvb3JkcyA9IHtcclxuICAgIHg6IE1hdGgucm91bmQoY29vcmRpbmF0ZUluZGV4ZXMueCAqIGhleGFTaXplLnggKyBoYWxmSGV4YVNpemUueCksXHJcbiAgICB5OiBNYXRoLnJvdW5kKGNvb3JkaW5hdGVJbmRleGVzLnkgKiBoZXhhU2l6ZS55ICsgaGFsZkhleGFTaXplLnkpXHJcbiAgfTtcclxuXHJcbiAgcmV0dXJuIGNlbnRlckNvb3JkcztcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBoZXhhSGl0VGVzdChwb2ludHMsIGhpdENvb3JkcyA9IHt4OjAsIHk6MH0sIG9mZnNldENvb3JkcyA9IHt4OjAsIHk6MH0pIHtcclxuICB2YXIgb2Zmc2V0UG9pbnRzID0gcG9pbnRzLm1hcChwb2ludCA9PiB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICB4OiBwb2ludC54ICsgb2Zmc2V0Q29vcmRzLngsXHJcbiAgICAgIHk6IHBvaW50LnkgKyBvZmZzZXRDb29yZHMueVxyXG4gICAgfTtcclxuICB9KTtcclxuXHJcbiAgcmV0dXJuIHBvaW50SW5Qb2x5Z29uKGhpdENvb3Jkcywgb2Zmc2V0UG9pbnRzKTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIGNhbGNIZWlnaHQ6IGNhbGNIZWlnaHQsXHJcbiAgY2FsY1NpZGU6IGNhbGNTaWRlLFxyXG4gIHNldENlbGxCeVBvaW50OiBzZXRDZWxsQnlQb2ludCxcclxuICBnZXRIZXhhU2l6ZTogZ2V0SGV4YVNpemUsXHJcbiAgdG9IZXhhQ2VudGVyQ29vcmQ6IHRvSGV4YUNlbnRlckNvb3JkXHJcbn07XHJcblxyXG4vKiBjcmVkaXRzIHRvOiBodHRwczovL2dpdGh1Yi5jb20vc3Vic3RhY2svcG9pbnQtaW4tcG9seWdvbiAqL1xyXG5mdW5jdGlvbiBwb2ludEluUG9seWdvbihwb2ludCwgdnMpIHtcclxuICB2YXIgeCA9IHBvaW50LngsIHkgPSBwb2ludC55O1xyXG4gICAgXHJcbiAgdmFyIGluc2lkZSA9IGZhbHNlO1xyXG4gIGZvciAodmFyIGkgPSAwLCBqID0gdnMubGVuZ3RoIC0gMTsgaSA8IHZzLmxlbmd0aDsgaiA9IGkrKykge1xyXG4gICAgICB2YXIgeGkgPSB2c1tpXS54LCB5aSA9IHZzW2ldLnk7XHJcbiAgICAgIHZhciB4aiA9IHZzW2pdLngsIHlqID0gdnNbal0ueTtcclxuICAgICAgXHJcbiAgICAgIHZhciBpbnRlcnNlY3QgPSAoKHlpID4geSkgIT0gKHlqID4geSkpXHJcbiAgICAgICAgICAmJiAoeCA8ICh4aiAtIHhpKSAqICh5IC0geWkpIC8gKHlqIC0geWkpICsgeGkpO1xyXG4gICAgICBpZiAoaW50ZXJzZWN0KSBpbnNpZGUgPSAhaW5zaWRlO1xyXG4gIH1cclxuICBcclxuICByZXR1cm4gaW5zaWRlO1xyXG59IiwiJ3VzZSBzdHJpY3QnXHJcblxyXG5pbXBvcnQgeyBjYWxjSGVpZ2h0LCBnZXRIZXhhZ29uUG9pbnRzIH0gZnJvbSAnLi9oZXhhZ29uTWF0aCc7XHJcblxyXG4vKiogQ3JlZGl0cyBiZWxvZ24gdG86IGh0dHBzOi8vZ2l0aHViLmNvbS9hbGZvcm5vLXByb2R1Y3Rpb25zL0hleFBpeGlKcy9ibG9iL21hc3Rlci9saWIvaGV4UGl4aS5qcyAqL1xyXG4vLyBDcmVhdGVzIGEgaGV4IHNoYXBlZCBwb2x5Z29uIHRoYXQgaXMgdXNlZCBmb3IgdGhlIGhleCdzIGhpdCBhcmVhLlxyXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlSGV4YWdvbihyYWRpdXMsIGlzRmxhdFRvcCA9IGZhbHNlKSB7XHJcbiAgdmFyIHBvaW50cyA9IFtdO1xyXG5cclxuICAgIHBvaW50cyA9IGdldEhleGFnb25Qb2ludHMocmFkaXVzKS5tYXAoZnVuY3Rpb24ocG9pbnQpIHtcclxuICAgICAgcmV0dXJuIG5ldyBQSVhJLlBvaW50KHBvaW50LngsIHBvaW50LnkpO1xyXG4gICAgfSlcclxuXHJcbiAgcmV0dXJuIG5ldyBQSVhJLlBvbHlnb24ocG9pbnRzKTtcclxufSIsImV4cG9ydCBsZXQgZ2FtZURhdGEgPSB7XHJcbiAgSUQ6IFwiNTM4MzdkNDc5NzZmZWQzYjI0MDAwMDA1XCIsXHJcbiAgdHVybjogMSxcclxuICBtYXBTaXplOiB7IHg6IDUwLCB5OiAyMCB9LFxyXG4gIGhleGFnb25SYWRpdXM6IDQ3LFxyXG4gIHBsdWdpbnNUb0FjdGl2YXRlOiB7XHJcbiAgICBtYXA6IFtcIm1hcF9kcmFnXCIsIFwib2JqZWN0X3NlbGVjdF9oZXhhZ29uXCJdXHJcbiAgfVxyXG59OyIsImV4cG9ydCBsZXQgbWFwRGF0YSA9IHtcclxuICBnYW1lSUQ6IFwiNTM4MzdkNDc5NzZmZWQzYjI0MDAwMDA1XCIsXHJcbiAgdHVybjogMSxcclxuICBzdGFydFBvaW50OiB7IHg6IDAsIHk6IDAgfSxcclxuICBlbGVtZW50OiBcIiNtYXBDYW52YXNcIixcclxuICBsYXllcnM6IFt7XHJcbiAgICB0eXBlOiBcIk1hcF9sYXllclwiLFxyXG4gICAgY29vcmQ6IHsgeDogMCwgeTogMCB9LFxyXG4gICAgbmFtZTogXCJ0ZXJyYWluTGF5ZXJcIixcclxuICAgIGdyb3VwOiBcInRlcnJhaW5cIiwgLy8gRm9yIHF1YWRUcmVlc1xyXG4gICAgc3BlY2lhbHM6IFt7XHJcbiAgICAgIFwiaW50ZXJhY3RpdmVcIjogZmFsc2VcclxuICAgIH1dLFxyXG4gICAgb3B0aW9uczoge1xyXG4gICAgICBjYWNoZTogdHJ1ZVxyXG4gICAgfSxcclxuICAgIG9iamVjdEdyb3VwczogW3tcclxuICAgICAgdHlwZTogXCJPYmplY3RfdGVycmFpblwiLFxyXG4gICAgICBuYW1lOiBcIlRlcnJhaW5cIiwgLy8gRm9yIHF1YWRUcmVlcyBhbmQgZGVidWdnaW5nXHJcbiAgICAgIHR5cGVJbWFnZURhdGE6IFwidGVycmFpbkJhc2VcIixcclxuICAgICAgb2JqZWN0czogW3tcclxuICAgICAgICAgXCJvYmpUeXBlXCI6MCxcclxuICAgICAgICAgXCJuYW1lXCI6XCJzd2FtcFwiLFxyXG4gICAgICAgICBcIl9pZFwiOlwiNTM4MzdkNDk5NzZmZWQzYjI0MDAwNmI4XCIsXHJcbiAgICAgICAgIFwiY29vcmRcIjp7XHJcbiAgICAgICAgICAgIFwieFwiOlwiMFwiLFxyXG4gICAgICAgICAgICBcInlcIjpcIjBcIlxyXG4gICAgICAgICB9LFxyXG4gICAgICAgICBcImRhdGFcIjoge30sXHJcbiAgICAgICAgIFwibGFzdFNlZW5UdXJuXCI6XCIxXCJcclxuICAgICAgfSx7XHJcbiAgICAgICAgIFwib2JqVHlwZVwiOjEsXHJcbiAgICAgICAgIFwibmFtZVwiOlwic3dhbXBcIixcclxuICAgICAgICAgXCJfaWRcIjpcIjUzODM3ZDQ5OTc2ZmVkM2IyNDAwMDZiZFwiLFxyXG4gICAgICAgICBcImNvb3JkXCI6e1xyXG4gICAgICAgICAgICBcInhcIjpcIjBcIixcclxuICAgICAgICAgICAgXCJ5XCI6XCIxNDBcIlxyXG4gICAgICAgICB9LFxyXG4gICAgICAgICBcImRhdGFcIjoge30sXHJcbiAgICAgICAgIFwibGFzdFNlZW5UdXJuXCI6XCIxXCJcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgICBcIm9ialR5cGVcIjoyLFxyXG4gICAgICAgICBcIm5hbWVcIjpcInR1bmRyYVwiLFxyXG4gICAgICAgICBcIl9pZFwiOlwiNTM4MzdkNDk5NzZmZWQzYjI0MDAwNmMyXCIsXHJcbiAgICAgICAgIFwiY29vcmRcIjp7XHJcbiAgICAgICAgICAgIFwieFwiOlwiNDFcIixcclxuICAgICAgICAgICAgXCJ5XCI6XCI3MFwiXHJcbiAgICAgICAgIH0sXHJcbiAgICAgICAgIFwiZGF0YVwiOiB7fSxcclxuICAgICAgICAgXCJsYXN0U2VlblR1cm5cIjpcIjFcIlxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgIFwib2JqVHlwZVwiOjMsXHJcbiAgICAgICAgIFwibmFtZVwiOlwiZm9yZXN0XCIsXHJcbiAgICAgICAgIFwiX2lkXCI6XCI1MzgzN2Q0OTk3NmZlZDNiMjQwMDA2YzdcIixcclxuICAgICAgICAgXCJjb29yZFwiOntcclxuICAgICAgICAgICAgXCJ4XCI6XCI4MlwiLFxyXG4gICAgICAgICAgICBcInlcIjpcIjE0MFwiXHJcbiAgICAgICAgIH0sXHJcbiAgICAgICAgIFwiZGF0YVwiOiB7fSxcclxuICAgICAgICAgXCJsYXN0U2VlblR1cm5cIjpcIjFcIlxyXG4gICAgICB9XVxyXG4gICAgfV1cclxuICB9LHtcclxuICAgIHR5cGU6IFwiTWFwX2xheWVyXCIsXHJcbiAgICBjb29yZDoge1xyXG4gICAgICAgIFwieFwiOiBcIjBcIixcclxuICAgICAgICBcInlcIjogXCIwXCJcclxuICAgIH0sXHJcbiAgICBcIm5hbWVcIjogXCJ1bml0TGF5ZXJcIixcclxuICAgIGdyb3VwOiBcInVuaXRzXCIsIC8vIEZvciBxdWFkVHJlZXNcclxuICAgIFwib3B0aW9uc1wiOiB7XHJcbiAgICAgIFwiY2FjaGVcIjogXCJmYWxzZVwiXHJcbiAgICB9LFxyXG4gICAgb2JqZWN0R3JvdXBzOiBbe1xyXG4gICAgICBcInR5cGVcIjogXCJPYmplY3RfdW5pdFwiLFxyXG4gICAgICBcIm5hbWVcIjogXCJVbml0XCIsIC8vIEkgZ3Vlc3Mgb25seSBmb3IgZGVidWdnaW5nP1xyXG4gICAgICBcInR5cGVJbWFnZURhdGFcIjogXCJ1bml0XCIsXHJcbiAgICAgIG9iamVjdHM6IFt7XHJcbiAgICAgICAgXCJvYmpUeXBlXCI6MCxcclxuICAgICAgICBcIm5hbWVcIjogXCJUYW5rIHlvdVwiLFxyXG4gICAgICAgIFwiY29vcmRcIjoge1xyXG4gICAgICAgICAgXCJ4XCI6IFwiNDFcIiwgXCJ5XCI6IFwiNzBcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJkYXRhXCI6IHtcclxuICAgICAgICAgIFwic29tZUN1c3RvbURhdGFcIjogXCJ0cnVlXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwibGFzdFNlZW5UdXJuXCI6XCIxXCJcclxuICAgICAgfV1cclxuICAgIH1dXHJcbiAgfV1cclxufTsiLCJleHBvcnQgbGV0IHR5cGVEYXRhID0ge1xyXG4gIFwiZ3JhcGhpY0RhdGFcIjoge1xyXG4gICAgXCJ0ZXJyYWluQmFzZVwiOntcclxuICAgICAgXCJqc29uXCI6IFwiL2Fzc2V0cy9pbWcvbWFwL3Rlc3RIZXhhZ29ucy9waXhpX3Rlc3RIZXhhZ29uU3ByaXRlc2hlZXQuanNvblwiXHJcbiAgICB9LFxyXG4gICAgXCJ1bml0XCI6e1xyXG4gICAgICBcImpzb25cIjogXCIvYXNzZXRzL2ltZy9tYXAvdW5pdHMvdGVzdEhleGFnb25Vbml0cy5qc29uXCJcclxuICAgIH1cclxuICB9LFxyXG4gIFwib2JqZWN0RGF0YVwiOiB7XHJcbiAgICBcInRlcnJhaW5CYXNlXCI6W3tcclxuICAgICAgICBcImltYWdlXCI6XCJ0ZXJyYWluX2JsdWVIZXhhZ29uLnBuZ1wiLFxyXG4gICAgICAgIFwiYXR0YWNoZWRUb1RlcnJhaW5zXCI6W1wiMFwiXSxcclxuICAgICAgICBcInByb3BhYmlsaXR5XCI6XCIxMDAlXCIsXHJcbiAgICAgICAgXCJuYW1lXCI6IFwiZm9yRGVidWdnaW5nIC0gdGVycmFpbkJhc2UgMFwiXHJcbiAgICAgIH0se1xyXG4gICAgICAgIFwiaW1hZ2VcIjpcInRlcnJhaW5fZ3JlZW5IZXhhZ29uLnBuZ1wiLFxyXG4gICAgICAgIFwiYXR0YWNoZWRUb1RlcnJhaW5zXCI6W1wiMlwiXSxcclxuICAgICAgICBcInByb3BhYmlsaXR5XCI6XCIxMDAlXCIsXHJcbiAgICAgICAgXCJuYW1lXCI6IFwiZm9yRGVidWdnaW5nIC0gdGVycmFpbkJhc2UgMVwiXHJcbiAgICAgIH0se1xyXG4gICAgICAgIFwiaW1hZ2VcIjpcInRlcnJhaW5fcmVkSGV4YWdvbi5wbmdcIixcclxuICAgICAgICBcImF0dGFjaGVkVG9UZXJyYWluc1wiOltcIjFcIl0sXHJcbiAgICAgICAgXCJwcm9wYWJpbGl0eVwiOlwiMTAwJVwiLFxyXG4gICAgICAgIFwibmFtZVwiOiBcImZvckRlYnVnZ2luZyAtIHRlcnJhaW5CYXNlIDJcIlxyXG4gICAgICB9LHtcclxuICAgICAgICBcImltYWdlXCI6XCJ0ZXJyYWluX3llbGxvd0hleGFnb24ucG5nXCIsXHJcbiAgICAgICAgXCJhdHRhY2hlZFRvVGVycmFpbnNcIjpbXCI0XCJdLFxyXG4gICAgICAgIFwicHJvcGFiaWxpdHlcIjpcIjEwMCVcIixcclxuICAgICAgICBcIm5hbWVcIjogXCJmb3JEZWJ1Z2dpbmcgLSB0ZXJyYWluQmFzZSAzXCJcclxuICAgICAgfV0sXHJcbiAgICBcInVuaXRcIjpbe1xyXG4gICAgICAgIFwibmFtZVwiOlwidGFua1wiLFxyXG4gICAgICAgIFwiZGVzY1wiOlwiVnJvb29tLi4uXCIsXHJcbiAgICAgICAgXCJpbWFnZVwiOlwidGFuay5wbmdcIixcclxuICAgICAgICBcImF0dFwiOlwiR29vZFwiLFxyXG4gICAgICAgIFwiZGVmXCI6XCJQb29yXCIsXHJcbiAgICAgICAgXCJzaWVnZVwiOlwiRGVjZW50XCIsXHJcbiAgICAgICAgXCJpbml0aWF0ZVwiOlwiOTBcIixcclxuICAgICAgICBcIm1vdmVcIjpcIjEwMFwiLFxyXG4gICAgICAgIFwibW9yYWxlXCI6XCJBdmVyYWdlXCIsXHJcbiAgICAgICAgXCJ2aXNpb25cIjpcIjE1MFwiLFxyXG4gICAgICAgIFwiaW5mbHVlbmNlQXJlYVwiOlwiMzBcIlxyXG4gICAgICB9LHtcclxuICAgICAgICBcIm5hbWVcIjpcImFydGlsbGVyeVwiLFxyXG4gICAgICAgIFwiZGVzY1wiOlwiV2hpc3RsZXJzXCIsXHJcbiAgICAgICAgXCJpbWFnZVwiOlwiYXJ0aWxsZXJ5LnBuZ1wiLFxyXG4gICAgICAgIFwiYXR0XCI6XCIxXCIsXHJcbiAgICAgICAgXCJkZWZcIjpcIjJcIixcclxuICAgICAgICBcInNpZWdlXCI6XCIyXCIsXHJcbiAgICAgICAgXCJpbml0aWF0ZVwiOlwiMTEwXCIsXHJcbiAgICAgICAgXCJtb3ZlXCI6XCIxMDBcIixcclxuICAgICAgICBcIm1vcmFsZVwiOlwiQXZlcmFnZVwiLFxyXG4gICAgICAgIFwidmlzaW9uXCI6XCIyNTBcIixcclxuICAgICAgICBcImluZmx1ZW5jZUFyZWFcIjpcIjMwXCIsXHJcbiAgICAgICAgXCJtb2RpZmllcnNcIjp7XHJcbiAgICAgICAgICBcInVuaXRcIjp7XHJcbiAgICAgICAgICAgIFwiX2VuZW15X1wiOlt7XHJcbiAgICAgICAgICAgICAgXCJmcm9tXCI6XCJ0aGlzT25lUGxhY2VcIixcclxuICAgICAgICAgICAgICBcIm1vZGlmaWVyc1wiOntcclxuICAgICAgICAgICAgICAgIFwibW9yYWxlXCI6XCJzdWZmZXJzIG1vcmFsZSBkcm9wXCJcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1dXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfV1cclxuICB9XHJcbn07IiwiJ3VzZSBzdHJpY3QnO1xyXG4vKiA9PT09PT0gTGlicmFyeSBpbXBvcnRzID09PT09PSAqL1xyXG5cclxuLyogPT09PT09IE93biBtb2R1bGUgaW1wb3J0cyA9PT09PT0gKi9cclxuLy92YXIgTWFwID0gcmVxdWlyZSggJy4uL3B1YmxpYy9jb21wb25lbnRzL21hcC9NYXAnKTtcclxuLyogVEhJUyBQT0xZRklMTCBJUyBORUVERUQgRk9SIElFMTEsIG1heWJlIFN5bWJvbCBvcyBzb21ldGhpbmcgbWlzc2luZzogaHR0cDovL2JhYmVsanMuaW8vZG9jcy91c2FnZS9wb2x5ZmlsbC8gKi9cclxucmVxdWlyZShcImJhYmVsL3BvbHlmaWxsXCIpO1xyXG5cclxuaW1wb3J0IHsgY3JlYXRlTWFwIH0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9mYWN0b3JpZXMvcGl4aV9ob3Jpem9udGFsSGV4YUZhY3RvcnknO1xyXG5cclxuLyogPT09PT0gSW1wb3J0IHBsdWdpbnMgPT09PT0gKi9cclxuaW1wb3J0IHsgbWFwX2RyYWcgfSBmcm9tIFwiLi4vLi4vY29tcG9uZW50cy9tYXAvY29yZS9tb3ZlL21hcF9kcmFnXCI7XHJcbmltcG9ydCB7IG1hcF96b29tIH0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9tYXAvY29yZS96b29tL3BpeGlfbWFwX3pvb20nO1xyXG5pbXBvcnQgeyBvYmplY3Rfc2VsZWN0X2hleGFnb24gfSBmcm9tICcuLi8uLi9jb21wb25lbnRzL21hcC9leHRlbnNpb25zL2hleGFnb25zL29iamVjdF9zZWxlY3QvcGl4aV9vYmplY3Rfc2VsZWN0X2hleGFnb24nO1xyXG5cclxuLyogREFUQSBGSUxFUyB1c2VkIGZvciB0ZXN0aW5nICovXHJcbmltcG9ydCB7IGdhbWVEYXRhIH0gZnJvbSAnLi4vLi4vdGVzdHMvZGF0YS9nYW1lRGF0YSc7XHJcbmltcG9ydCB7IHR5cGVEYXRhIH0gZnJvbSAnLi4vLi4vdGVzdHMvZGF0YS9waXhpX3R5cGVEYXRhJztcclxuaW1wb3J0IHsgbWFwRGF0YSB9IGZyb20gJy4uLy4uL3Rlc3RzL2RhdGEvcGl4aV9tYXBEYXRhJztcclxuLy9pbXBvcnQgeyBwcmVsb2FkIH0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9wcmVsb2FkaW5nL3ByZWxvYWRpbmcnO1xyXG5cclxuaW1wb3J0IHsgZW52aXJvbm1lbnREZXRlY3Rpb24gfSBmcm9tICcuLi8uLi9jb21wb25lbnRzL21hcC9jb3JlL3V0aWxzL3V0aWxzJztcclxuaWYodHlwZW9mIEhhbW1lciA9PT0gJ3VuZGVmaW5lZCcgJiYgZW52aXJvbm1lbnREZXRlY3Rpb24uaXNNb2JpbGVfZGV0ZWN0VXNlckFnZW50KCkpIHtcclxuICBhbGVydChcIllvdSBzZWVtIHRvIGJlIHVzaW5nIG1vYmlsZSBkZXZpY2UsIEkgc3VnZ2VzdCB5b3UgdXNlIG1vYmlsZSBzaXRlIGZvciB0ZXN0cywgc2luY2UgdGhpcyB3b24ndCB3b3JrIGZvciB5b3VcIik7XHJcbn1cclxuXHJcbndpbmRvdy5pbml0TWFwID0gZnVuY3Rpb24gKCkge1xyXG4gIHZhciBjYW52YXNFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtYWluU3RhZ2VcIik7XHJcbiAgdmFyIG1hcDtcclxuXHJcbiAgLyoqIEB0b2RvIE1PVkUgdGhlIHByZWxvYWRlciB0byBpdCdzIGRlc3RpbmVkIGZpbGU6IHByZWxvYWRlci4gKi9cclxuICB2YXIgbG9hZGVyID0gUElYSS5sb2FkZXI7XHJcblxyXG4gIGxvYWRlci5iYXNlVXJsID0gXCIvYXNzZXRzL2ltZy9tYXAvXCI7XHJcbiAgbG9hZGVyLmFkZChcInRlc3RIZXhhZ29ucy9waXhpX3Rlc3RIZXhhZ29uU3ByaXRlc2hlZXQuanNvblwiKTtcclxuICBsb2FkZXIuYWRkKFwidW5pdHMvdGVzdEhleGFnb25Vbml0cy5qc29uXCIpO1xyXG5cclxuICBsb2FkZXIub25jZSgnY29tcGxldGUnLG9uQ29tcGxldGUpO1xyXG5cclxuICBsb2FkZXIubG9hZCgpO1xyXG4gIC8vUElYSS5sb2FkZXIub24oXCJwcm9ncmVzc1wiLCBsb2FkUHJvZ3Jlc3NIYW5kbGVyKTtcclxuXHJcbiAgZnVuY3Rpb24gb25Db21wbGV0ZSgpIHtcclxuICAgIG1hcCA9IGNyZWF0ZU1hcChjYW52YXNFbGVtZW50LCB7IGdhbWU6IGdhbWVEYXRhLCBtYXA6IG1hcERhdGEsIHR5cGU6IHR5cGVEYXRhIH0pO1xyXG4gICAgbWFwLmluaXQoIFsgbWFwX3pvb20sIG1hcF9kcmFnLCBvYmplY3Rfc2VsZWN0X2hleGFnb24gXSwgeyB4OiA0MSwgeTogNDcgfSwgdW5kZWZpbmVkICk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gbWFwO1xyXG59OyJdfQ==
