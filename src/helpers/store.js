export class Store {
  constructor(name, initState) {
    this.setName(name)
    this.setInitState(initState)
  }

  setName(name) {
    this.name = name
  }

  getName() {
    return this.name
  }

  setInitState(initState) {
    if (!initState || typeof initState !== 'object') throw new Error('unspported type')
    this.initState = initState
  }

  getInitState() {
    return this.initState
  }
}
