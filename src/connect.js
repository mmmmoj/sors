import React from 'react'
import GlobalStore from './store'

export function InjectStore(Component, store) {
  return class extends React.Component {
    constructor(props) {
      super(props)
      this.storeName = store.getName()
      const state = store.getInitState() || {}
      GlobalStore.addStore(this.storeName)
      Object.keys(state).forEach((node) => {
        GlobalStore.addNode(this.storeName, node)
        GlobalStore.setStore(this.storeName, node, state[node])
      })
      this.on = this.on.bind(this)
      this.onStore = this.onStore.bind(this)
      this.getStore = this.getStore.bind(this)
      this.setStore = this.setStore.bind(this)
      this.listeners = []
    }

    componentWillUnmount() {
      this.listeners.forEach((listener) => GlobalStore.removeListener(listener.store, listener.node, listener.fn))
    }

    on(nodes, fn) {
      if (nodes) {
        if (Array.isArray(nodes)) {
          nodes.forEach((node) => {
            GlobalStore.addListener(this.storeName, node, fn)
            this.listeners.push({ store: this.storeName, node, fn })
          })
        } else {
          GlobalStore.addListener(this.storeName, nodes, fn)
          this.listeners.push({ store: this.storeName, nodes, fn })
        }
      }
    }

    onStore(store, nodes, fn) {
      if (store && nodes) {
        const storeName = store.getName()
        if (Array.isArray(nodes)) {
          nodes.forEach((node) => {
            GlobalStore.addListener(storeName, node, fn)
            this.listeners.push({ store: storeName, node, fn })
          })
        } else {
          GlobalStore.addListener(storeName, nodes, fn)
          this.listeners.push({ store: storeName, nodes, fn })
        }
      }
    }

    getStore(store, nodeName) {
      const storeName = store.getName()
      return GlobalStore.getStore(storeName, nodeName)
    }

    setStore(store, nodeName, data) {
      const storeName = store.getName()
      GlobalStore.setStore(storeName, nodeName, data)
    }

    render() {
      return <Component on={this.on} onStore={this.onStore} getStore={this.getStore} setStore={this.setStore} />
    }
  }
}
