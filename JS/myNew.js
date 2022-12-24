function myNew(ctor, ...args) {
    // 容错判断不止这一种，这里简写了
    if (typeof ctor !== 'function') {
        throw new Error()
    }

    // 1.创建空对象
    const tempObj = new Object()
    // 2.将空对象和构造函数的原型对象做关联
    tempObj.__proto__ = Object.create(ctor.prototype)
    // 3.改变构造函数的执行上下文this为创建好的对象并执行
    const res = ctor.call(tempObj, ...args)
    // 4.最终返回，所以构造函数如果return有值就会是该值
    return res
}