import React from 'react'
import Path from './Path';
import neighborhoods from './sfmaps/neighborhoods.json'

export default () => {
  return neighborhoods.features
    .map((feature, index) => <Path key={index} pathData={feature} />)
}