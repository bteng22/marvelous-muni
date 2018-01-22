import React, { Component } from 'react';
import BaseMap from '../BaseMap';
import Vehicles from '../Vehicles';

class SVGContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth,
      height: window.innerHeight
    };
  }
  render() {
    return (
      <svg viewBox={`0 0 ${this.state.width} ${this.state.height}`}>
        <BaseMap />
        <Vehicles appState={this.props.appState} setAppState={this.props.setAppState} /> 
      </svg>
    );
  }
}

export default SVGContainer;
