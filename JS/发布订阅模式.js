class EventPool {
  constructor() {
    this.pool = Object.create(null)
  }

  $on(name, cb) {
    const fns = this.pool[name] || []
    fns.push(cb)
    this.pool[name] = fns
  }

  $emit(name) {
    const fns = this.pool[name] || []
    fns.forEach(cb => {
      cb()
    })
  }
}