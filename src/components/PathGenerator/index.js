import React from 'react'
import Path from '../Path';

export default (props) => {
  const { geoFeatures, fill, stroke, appState} = props;
  return geoFeatures.map((feature, index) => <Path
    appState={appState}
    key={index}
    pathData={feature}
    fill={fill}
    stroke={stroke}
  />)
}