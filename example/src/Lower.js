import React, { Component } from 'react'
import Connect from 'global-store'

class Lower extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this)
  }

  onClick() {
    let val = Number(this.props.getStore('index', 'id'));
    val += 1;
    this.props.setStore('index', 'id', val)
  }

  render() {
    return (
      <div style={{width: '100%', height: '300px'}}>
      <button onClick={this.onClick}>Increase</button>
      </div>
    )
  }
}

export default Connect(Lower, 'lower', {});
