import React from 'react';
import BaseMap from '../BaseMap';
import Vehicles from '../Vehicles';

const SVGContainer = (props) => {
  const { appState, setAppState } = props;
  return (
    <svg viewBox={`0 0 ${appState.width} ${appState.height}`}>
      <BaseMap />
      <Vehicles appState={appState} setAppState={setAppState} /> 
    </svg>
  )
}

export default SVGContainer;