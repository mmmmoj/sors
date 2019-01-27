class Observable {
  constructor() {
    this.observers = []
    this.data = null
  }

  subscribe(fn) {
    this.observers.push(fn)
  }

  unsubscribe(fn) {
    this.observers = this.observers.filter((f) => f !== fn)
  }

  getData() {
    return this.data
  }

  notify(data) {
    this.data = data
    this.observers.forEach((fn) => {
      if (typeof fn === 'function') {
        fn(data)
      }
    })
  }
}

export default Observable
