import React from 'react'
import pathGenerator from './pathGenerator'

const width = window.innerWidth;
const height = window.innerHeight;

function getRandomHexColor() {
  return '#' + ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6);
}

const Path = (props) => {
  const { pathData, fill, stroke } = props;

  return (
    <path
      style={{
        fill,
        stroke
      }}
      d={pathGenerator(width, height)(pathData)}
    />
  )
}

export default Path