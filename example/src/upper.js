import React, { Component } from 'react'
import Connect from 'global-store'

class Upper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: props.getStore('index', 'id')
    }
    this.onIdChange = this.onIdChange.bind(this)
    props.onStore('index', 'id', this.onIdChange)
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

export default Connect(Upper, 'upper', {});
