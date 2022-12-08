class Dep {
  constructor() {
    this.pools = []
  }

  add(watcher) {
    this.pools.push(watcher)
  }

  notify() {
    this.pools.forEach(watcher => {
      watcher.update()
    })
  }
}

class Watcher {
  constructor(cb) {
    this.cb = cb
  }

  update() {
    this.cb()
  }
}