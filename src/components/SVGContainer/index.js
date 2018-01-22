import React, { PureComponent } from 'react';
import BaseMap from '../BaseMap';
import Vehicles from '../Vehicles';


class SVGContainer extends PureComponent {
  render() {
    const { innerWidth: width, innerHeight: height } = window
    const { appState, setAppState } = this.props;
    return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio='xMidYMid slice'
    >
      <BaseMap />
      <Vehicles appState={appState} setAppState={setAppState} /> 
    </svg>
    )
  }
}

export default SVGContainer;