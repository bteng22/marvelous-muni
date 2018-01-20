import React from 'react'
import { getProjection } from './pathGenerator'
const { innerWidth: width, innerHeight: height } = window
const projection = getProjection(width, height);

const DirectionalDroplet = ({ heading }) => {
  return (
    <path
      d={`M15 6 Q 15 6, 25 18 A 12.8 12.8 0 1 1 5 18 Q 15 6 15 6z`}
      fill='black'
      transform={`scale(0.5) rotate(${heading}) translate(${-15},${-28})`}
    />
  )
}

const RouteTag = ({ tag }) => {
  const routeTagStyles = {
    'fontSize': 7,
    'strokeWidth': '1px',
    'fill': '#fff',
    'transform': 'translateY(2px)'
  }
  return (
    <text textAnchor='middle' style={routeTagStyles}>{tag}</text>
  )
}

export default (props) => {
  const { vehicleData } = props;
  const coordinates = [Number.parseFloat(vehicleData.lon), Number.parseFloat(vehicleData.lat)]
  return (
    <g
      style={{
        transition: 'transform 2s ease-in-out',
        'willChange': 'transform'
      }}
      transform-origin='center center'
      transform={`translate(${projection(coordinates)})`}
    >
      <DirectionalDroplet heading={vehicleData.heading}/>
      <RouteTag tag={vehicleData.routeTag}/>
    </g>
  )
}


