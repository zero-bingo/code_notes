Function.prototype.fakeCall = function(ctx) {
    // 拿到当前调用的函数和参数
    const fn = this
    const args = Array.from(arguments).slice(1)
    if(typeof fn !== 'function') {
        throw new Error('must be an function')
    }
    if(typeof ctx !== 'object') {
        ctx = Object(ctx)
    }
    const tempKey = Symbol('tempKey')
    // 在目标对象上 挂fn（这样该函数在执行的时候 this指向就是目标对象了）
    ctx[tempKey] = fn
    // 执行获得结果后删除该fn
    const res = ctx[tempKey](...args)

    delete ctx[tempKey]
    return res
}

Function.prototype.fakeApply = function(ctx) {
    const fn = this
    const args = arguments[1]
    if(typeof fn !== 'function') {
      throw new Error('must be an function')
    }
    if(typeof args !== 'array') {
      throw new Error('second argument must be an array')
    }
    if(typeof ctx !== 'object') {
      ctx = Object(ctx)
    }
    const tempKey = Symbol('tempKey')
    ctx[tempKey] = fn
    const res = ctx[tempKey](...args)
    
    delete ctx[tempKey]
    return res
}

Function.prototype.fakeBind = function (ctx, ...args) {
    // 原函数
    const self = this
    // 新的函数
    const fn = function () {
        // 这个新的函数很简单，新函数的调用对象是实例（说白了就是把新函数当作构造函数调用的）就是调用原来的函数
        self.apply(this instanceof self ? this : ctx, args.concat([...arguments]))
    }
    // 原型链对象上的属性不能丢失
    if (this.prototype) {
        fn.prototype = Object.create(this.prototype);
    }
    return fn
}