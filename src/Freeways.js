import React from 'react'
import Path from './Path';
import freeways from './sfmaps/freeways.json'

export default () => {
  return freeways.features
    .map((feature, index) => <Path key={index} pathData={feature} />)
}