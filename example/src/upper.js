import React, { Component } from 'react'
import { InjectStore, Store } from 'global-store'
import { appStore } from './App'

const initialState = {
}

export const upperStore = new Store('upper', initialState)

class Upper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: props.getStore(appStore, 'id')
    }
    this.onIdChange = this.onIdChange.bind(this)
    props.onStore(appStore, 'id', this.onIdChange)
  }

  onIdChange(newVal) {
    this.setState({ counter: newVal })
  }

  render() {
    return (
      <div style={{width: '100%', height: '300px'}}>{this.state.counter}</div>
    )
  }
}

export default InjectStore(Upper, upperStore);
