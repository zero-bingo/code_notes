const myNew = function (ctor, ...args) {
    console.log(ctor)
    // 容错判断不止这一种，这里简写了
    if (typeof ctor !== 'function') {
        throw new Error()
    }

    const tempObj = new Object()
    tempObj.__proto__ = Object.create(ctor.prototype)
    const res = ctor.call(tempObj, ...args)

    // 应该判断res的类型，这里简写了
    return res
}