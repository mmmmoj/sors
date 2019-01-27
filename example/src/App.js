import React, { Component } from 'react'

import Connect from 'global-store'

import Upper from './upper';

import Lower from './Lower';

class App extends Component {
  render () {
    this.props.on('id', (val) => console.log('changed', val, 'original', this.props.getStore('index', 'id')))
    return (
      <div>
        <Upper />
        {/* <ExampleComponent text='Modern React component module' /> */}
        <Lower />
      </div>
    )
  }
}

export default Connect(App, 'index', {id: 10})
