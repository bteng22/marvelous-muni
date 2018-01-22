import React from 'react'
import { generatePath } from '../../utils/geoHandler'

const Path = (props) => {
  const { innerWidth: width, innerHeight: height } = window
  const { pathData, fill, stroke } = props;

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