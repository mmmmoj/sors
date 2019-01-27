import Observable from './helpers/observable'

class Store {
  constructor() {
    this.store = {}
  }

  addStore(storeName) {
    this.store[storeName] = {}
  }

  addNode(storeName, nodeName) {
    if (!this.store[storeName]) throw new Error('No store found')
    this.store[storeName][nodeName] = new Observable()
  }

  setStore(storeName, nodeName, data) {
    if (!this.store[storeName] || !this.store[storeName][nodeName]) throw new Error('No store found')
    this.store[storeName][nodeName].notify(data)
  }

  getStore(storeName, nodeName) {
    if (!this.store[storeName] || !this.store[storeName][nodeName]) throw new Error('No store found')
    return this.store[storeName][nodeName].getData()
  }

  addListener(storeName, nodeName, fn) {
    if (!this.store[storeName] || !this.store[storeName][nodeName]) throw new Error('No store found')
    if (!fn || typeof fn !== 'function') throw new Error('You need to pass a valid callback function')
    this.store[storeName][nodeName].subscribe(fn)
  }

  removeListener(storeName, nodeName, fn) {
    if (!this.store[storeName] || !this.store[storeName][nodeName]) throw new Error('No store found')
    if (!fn || typeof fn !== 'function') throw new Error('You need to pass a valid callback function')
    this.store[storeName][nodeName].unsubscripe(fn)
  }
}

const GlobalStore = new Store()

export default GlobalStore
