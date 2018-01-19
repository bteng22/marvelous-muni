import React from 'react'
import Path from './Path';
import arteries from './sfmaps/arteries.json'

export default () => {
  return arteries.features
    .map((feature, index) => <Path key={index} pathData={feature} />)
}