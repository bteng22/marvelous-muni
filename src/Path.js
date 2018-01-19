import React from 'react'
import pathGenerator from './pathGenerator'

const { innerWidth: width, innerHeight: height } = window

const Path = (props) => {
  const { pathData, fill, stroke } = props;

  return (
    <path
      style={{
        fill,
        stroke
      }}
      d={pathGenerator(pathData, width, height)}
    />
  )
}

export default Path