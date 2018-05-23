madajiasijia = {
  chunk: function (array, size = 1) {
    var res = []
    for (var i = 0; i < array.length; i += size) {
        res.push(array.slice(i, i + size)) 
    }
    return res
  },
  compact: function (array) {
    var res = []
    for (var i = 0; i < array.length; i++) {
      if (array[i]) {
        res.push(array[i])
      }
    }
    return res
  },
  difference: function (array, ...Arrays){
    var values = []
    values = values.concat(...Arrays)
    return array.reduce((result, it) => {
      return values.some(item => {
        return item === it
      }) ? result: result.push(it),result
    }, [])
  },
  differenceBy: function (array, Arrays, iteratee) {
    var it = iteratee(array)
    var item = iteratee(Arrays)
    var indexs = []
    
  },
  differenceWith: function (params) {
    
  },
  drop: function (array, n = 1) {
    return array.slice(n, array.length)
  },
  dropRight: function (array, n = 1) {
    return n >= array.length ? [] : array.slice(0, array.length - n)
  },
  dropRightWhile: function (array, predeicate) {//未处理不是matched....
    var result = array
    while(predeicate(result[result.length - 1]) && result.length !== 0){
      result = this.dropRight(result)
    }
    return result
  },
  dropWhile: function (array, predeicate) {//未处理本身为函数 match 的情况
    var result = array
    while (predeicate(result[0]) && result.length !== 0) {
      result = this.drop(result)
    }
    return result
  },
  fill: function (array, value, start = 0, end = array.length) {
    for (var i = start; i < end; i++) {
      array[i] = value
    }
    return array
  },
  findIndex: function (array, predicate = this.identity, fromIndex = 0) {//未处理本身为函数 match 的情况
    for (var i = fromIndex; i < array.length; i++) {
      if(predicate(array[i])){
        return i
      }
    }
    return -1
  },
  flatten: function (array) {
    return array.reduce((result, item) => {
      return Array.isArray(item) ? result = result.concat(item) : result.push(item),
        result
      }
      , [])
  },
  flattenDeep: function (array) {
    array = this.flatten(array)
    return array.reduce((result, it) => {
      return Array.isArray(it) ? result = result.concat(this.flattenDeep(it)) : result.push(it),
        result
      }
      , [])
  },
  flattenDepth: function (array, depth = 1) {
    while(depth > 0) {
      array = this.flatten(array)
      depth--
    }
    return array
  },
  fromPairs: function (pairs) {
    return pairs.reduce((result,it) => {
      return result[it[0]] = it[1], result
    },{})
  },
  head: function (array) {
    return array[0]
  },
  indexOf: function (array, value, fromIndex = 0) {
    for(var i = fromIndex; i < array.length; i++) {
      if (array[i] === value){
        return i
      }
    }
    return -1
  },
  initial: function (array) {
    return array.slice(0,array.length - 1)    
  },
  intersection: function (...Array) {
    
  },
  eq: function (value, other) {
    return value === other || (value !== value && other !== other)
  },
  iteratee: function ([func = this.identity]){
    if(Array.isArray(func)) {
      return func = this.matchesProperty(func)
    }
    if(typeof(func) === "object") {
      return func = this.matches(func)
    }
    if(typeof(func) === "string") {
      return func = this.property(func)
    }
    if (typeof (func) === "function") {
      return fucn
    }
  },
  matches: function (source) {
    return this.bind(isMatch, null, window, source)
  },
  isEqual: function (value, other) {
    if(value === other) {//数值，字符串，布尔类型
      return true
    }
    if(value !== value && other !== other){//NaN
      return true
    }
    if (Array.isArray(value) && Array.isArray(other)) {//数组
      if(value.length === other.length) {
        if (value.length === 0) {
          return true
        }
        for(var i = 0; i < value.length; i++) {
          if (!this.isEqual(value[i], other[i])) {
            return false
          }
        }
        return true
      }
    }
    if (typeof (value) === typeof (other) && typeof (value) === "object" && !(Array.isArray(value) || Array.isArray(other) || value === null || other === null)){//均为对象，且都不是数组或者null
      if (this.isEmpty(value) && this.isEmpty(other)) {
        return true
      }
      for(var prop in other) {
        var otherIsEquleValue = this.isEqual(value[prop], other[prop]) 
        if (!otherIsEquleValue) {
          return false
        }
      }
      for (var prop in value) {
        var valueIsEquleOther = this.isEqual(value[prop], other[prop]) 
        if (!valueIsEquleOther) {
          return false
        }
      }
      return true
    }
    return false
  },
  isEqualWith: function (value, other, customizer) {
    if (typeof value !== typeof other) {
      return false
    }
    var result
    if (Array.isArray(value) === Array.isArray(other)) {
      if (value.length !== other.length) {
        return false
      }
      for (var i = 0; i < value.length; i++) {
        result = customizer(value[i], other[i], i, value, other)
        if (result === undefined) {
          result = this.isEqual(value[i], other[i])
        }
        if (!result) {
          return false
        }
      }
    } else if (typeof value === typeof other && typeof value === "object") {
      for (var prop in other) {
        result = customizer(value[prop], other[prop], prop, value, other,)
        if (result === undefined) {
          result = this.isEqual(value[prop], other[prop])
        }
        if (!result) {
          return false
        }
      }
      for (var prop in value) {
        result = customizer(value[prop], other[prop], prop, value, other, )
        if (result === undefined) {
          result = this.isEqual(value[prop], other[prop])
        }
        if (!result) {
          return false
        }
      }
    } else {
      result = customizer(other,value)
      if (result === undefined) {
        result = this.isEqual(value, other)
      }
      if (!result) {
        return false
      }
    }    
    return result   
  },
  isError: function (value) {//有问题
    return this.getTypeOf(value) === "error"
  },
  isFunction: function (value){
    return typeof value === "function"
  },
  isMatch: function(object, source) {
    for (var prop in source) {
      if(!this.isEqual(object[prop], source[prop])) {
        return false
      }
    }
    return true
  },
  isMatchWith: function (object, source, customizer) {//customizer 是被调用的，事先写好的函数
    var result
    for (var prop in source) {
      result =  customizer (object[prop], source[prop], prop, object, source)      
      if (result === undefined) {
        result = this.isMatch(object[prop], source[prop])
      }
      if (!result) {
        return false
      }
    }
    return result
  },
  isNaN: function (value){
    return (typeof value === "number") && value !== value
  },
  matchesProperty: function (path, srcValue) {

  },
  flip: function (func) {
    return function(...args) {
      return func(...args.reverse())
    }
  },
  every: function (collection, predicate = this.identity) {
    if (Array.isArray(collection)){
      for(var i = 0; i < collection.length; i++) {
        if (!predicate(collection[i])) {
          return false
        }
      }
    }
    else {
      for(var prop in collection) {
        if (!predicate (collection[prop])) {
          return false
        }
      }
    }
    return true
  },
  identity: function (value) {
    return value
  },
  isEmpty: function (value) {
    if(Array.isArray(value)) {
      return value.length === 0
    }
    if (typeof value === "object") {
      return Object.keys(value).length === 0
    }
  },
  bind: function (func, thisArg, ...partials) {
    return function (...args) {
      var bindArgs = []
      var i = 0
      partials.forEach(it => {
        if (it === window) {//用 window 做占位符
          bindArgs.push(args[i])
          i++
          //上面这两句可以简写成一句 bindArgs.push(args[i++])，因为 i++ 先返回 i 的值，再进行加一运算
        } else {
          bindArgs.push(it)
        }
      })
      bindArgs = bindArgs.concat(args.slice(i))
      //可以简写为，bindArgs.splice(bindArgs, 0, ...args.slice(i))
      return func(...bindArgs)
    }
  },
  parseJson: function (jsonStr) {
    var result
    var i = 0
    return result = parseValue(jsonStr)

    function parseValue(jsonStr) {
      while (/[ \n\r\t\b]/.test(jsonStr[i])) {
        i++ // 跳过空白
      }
      for (; i < jsonStr.length; i++) {
        if (jsonStr[i] === `{`) {
          i++
          return parseObject(jsonStr)
        }
        if (jsonStr[i] === `[`) {
          i++
          return parseArray(jsonStr)
        }
        if (jsonStr[i] === `"`) {
          i++
          return parseString(jsonStr)
        }
        if (jsonStr[i] === `t` || jsonStr[i] === `f`) {
          return parseBoolean(jsonStr)
        }
        if (jsonStr[i] === `n`) {
          i = i + 4
          return null
        } else {
          return parseNumber(jsonStr)
        }
      }
    };
    function parseObject(jsonStr) {
      var res = {}
      while (jsonStr[i] !== `}`) {
        var key = parseValue(jsonStr)
        var value
        i++  // 跳过`:`
        value = parseValue(jsonStr)
        res[key] = value
        while (/[ ,]/.test(jsonStr[i])) {
          i++ // 跳过`,`和空白
        }
      }
      i++ //跳过“}”
      return res
    }

    function parseArray(jsonStr) {
      var res = []
      var value
      while (jsonStr[i] !== `]`) {
        value = parseValue(jsonStr)
        res.push(value)
        while (/[ ,]/.test(jsonStr[i])) {
          i++ // 跳过`,`和空白
        }
      }
      i++ // 跳过结束“]”
      return res
    }

    function parseString(jsonStr) {
      var res = ``
      var j = i
      while (jsonStr[i] !== `"` && jsonStr[i - 1] !== `\\`) {
        i++
      }
      res = jsonStr.slice(j, i)
      i++//跳过字符串结尾引号结束`"`
      return res
    }

    function parseBoolean(jsonStr) {
      if (jsonStr[i] === `t`) {
        i = i + 4
        return true
      } else {
        i = i + 5
        return false
      }
    }

    function parseNumber(jsonStr) {
      var res = ``
      var j = i
      while (/[0-9\.e\-+]/i.test(jsonStr[i]) && i < jsonStr.length) {
        i++
      }
      return res = Number(jsonStr.slice(j, i))
    }
  },
  pull: function (ary, ...values) {
    if(ary.length === 0) {
      return ary
    }
    for (var i = 0; i < values.length; i++) {
      for (var j = 0; j < ary.length; j++) {
        if (values[i] === ary[j]) {
          ary.splice(j,1)
        }
      }
    }
    return ary 
  },
  /**
   * 取到任意值的类型并转为小选字符串
   * 
   * @param {any} value 
   * @returns {String}
   */
  getTypeOf: function(value) {
    return Object.prototype.toString.call(value).slice(8, -1).toLowerCase()
  },
  /**
   * 创建一个函数，该函数接受一个func作为参数，并调用func返回其结果，
   * 如果至少提供了arity参数数量，或者返回接受其余func参数的函数，依此类推。 
   * 如果func.length不够，func的arity可能被指定。
   * 还未处理“_”占位符情况
   * 
   * @param {Function} func             需要被柯里化的函数
   * @param {Number}   [l=func.length]  函数变量的个数
   * @returns {Function}                返回一个柯里化之后的新函数
   */
  curry: function (func, l = func.length) {
    return function (...args) {
      if (args.length >= l) {
        return func(...args)
      } else {
        return madajiasijia.curry(func.bind(null, ...args), l - args.length)
      }
    }
  },

}

/**
 * 实现的有问题
 * 
 * @param {Function} func 
 * @param {Number} [l=func.length] 
 * @returns {Function}
 */
function curryRight(func, l = func.length) {
  return function(...args) {
    if (args.length >= l) {
      return func(...args)
    } else if (l > 0){
      l = l - args.length
      return curryRight(func, l)
    }
  }
}
