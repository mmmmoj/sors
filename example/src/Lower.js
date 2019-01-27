import React, { Component } from 'react'
import { InjectStore, Store } from 'global-store'

import { appStore } from './App'

const initialState = {
}

export const lowerStore = new Store('upper', initialState)

class Lower extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this)
  }

  onClick() {
    let val = Number(this.props.getStore(appStore, 'id'));
    val += 1;
    this.props.setStore(appStore, 'id', val)
  }

  render() {
    return (
      <div style={{width: '100%', height: '300px'}}>
      <button onClick={this.onClick}>Increase</button>
      </div>
    )
  }
}

export default InjectStore(Lower, lowerStore);
