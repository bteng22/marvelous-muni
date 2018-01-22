import React from 'react';
import BaseMap from '../BaseMap';
import Vehicles from '../Vehicles';

const SVGContainer = (props) => {
  const { innerWidth: width, innerHeight: height } = window
  const { appState, setAppState } = props;
  return (
    <svg viewBox={`0 0 ${width} ${height}`}>
      <BaseMap />
      <Vehicles appState={appState} setAppState={setAppState} /> 
    </svg>
  )
}

export default SVGContainer;