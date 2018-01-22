import React from 'react'
import { generatePath } from '../../utils/geoHandler'

const Path = (props) => {
  const { pathData, fill, stroke, appState } = props;
  const { width, height } = appState;
  
  return (
    <path
      style={{
        fill,
        stroke
      }}
      d={generatePath(pathData, width, height)}
    />
  )
}

export default Path