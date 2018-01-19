import React, { Component } from 'react';
import BaseMap from './BaseMap';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth,
      height: window.innerHeight
    };
  }

  render() {
    return (
      <svg width={this.state.width} height={this.state.height}>
        <BaseMap />
      </svg>
    );
  }
}

export default App;
