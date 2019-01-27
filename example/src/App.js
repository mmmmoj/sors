import React, { Component } from 'react'

import { InjectStore, Store } from 'global-store'

import Upper from './upper';

import Lower from './Lower';

const initialState = {
  id: 10,
}

export const appStore = new Store('app', initialState)

class App extends Component {
  render () {
    this.props.on('id', (val) => console.log('changed', val, 'original', this.props.getStore(appStore, 'id')))
    return (
      <div>
        <Upper />
        {/* <ExampleComponent text='Modern React component module' /> */}
        <Lower />
      </div>
    )
  }
}

export default InjectStore(App, appStore)
