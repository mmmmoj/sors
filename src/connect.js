import React from 'react'
import GlobalStore from './store'

export function Connect(Component, name, initialState) {
  return class extends React.Component {
    constructor(props) {
      super(props)
      const state = initialState || {}
      GlobalStore.addStore(name)
      Object.keys(state).forEach((node) => {
        GlobalStore.addNode(name, node)
        GlobalStore.setStore(name, node, state[node])
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
            GlobalStore.addListener(name, node, fn)
            this.listeners.push({ store: name, node, fn })
          })
        } else {
          GlobalStore.addListener(name, nodes, fn)
          this.listeners.push({ store: name, nodes, fn })
        }
      }
    }

    onStore(storeName, nodes, fn) {
      if (storeName && nodes) {
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

    getStore(storeName, nodeName) {
      return GlobalStore.getStore(storeName, nodeName)
    }

    setStore(storeName, nodeName, data) {
      GlobalStore.setStore(storeName, nodeName, data)
    }

    render() {
      return <Component on={this.on} onStore={this.onStore} getStore={this.getStore} setStore={this.setStore} />
    }
  }
}
