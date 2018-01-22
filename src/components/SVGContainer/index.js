import React, { PureComponent } from 'react';
import BaseMap from '../BaseMap';
import Vehicles from '../Vehicles';


class SVGContainer extends PureComponent {
  render() {
    const { appState, setAppState } = this.props;
    const { width, height } = appState;
    return (
    <svg
      className='svg-container'
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio='xMidYMid slice'
    >
      <BaseMap appState={appState}/>
      <Vehicles appState={appState} setAppState={setAppState} /> 
    </svg>
    )
  }
}

export default SVGContainer;