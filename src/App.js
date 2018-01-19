import React, { Component } from 'react';
import './index.css'
import BaseMap from './BaseMap';
import Vehicles from './Vehicles';

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
      <svg
        width={this.state.width}
        height={this.state.height}
        // preserveAspectRatio='xMidYMid slice'
        // viewBox={`0 0 ${this.state.width} ${this.state.height}`}
      >
        <BaseMap />
        <Vehicles /> 
      </svg>
    );
  }
}

export default App;
