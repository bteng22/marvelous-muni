import React from 'react'
import Path from '../Path';

export default (props) => {
  const { geoFeatures, fill, stroke} = props;
  return geoFeatures.map((feature, index) => <Path
    key={index}
    pathData={feature}
    fill={fill}
    stroke={stroke}
  />)
}