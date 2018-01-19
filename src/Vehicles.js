import React, { Component, Fragment } from 'react';
import { getProjection } from './pathGenerator'
import json from './vehicleLocations.json';

const { innerWidth: width, innerHeight: height } = window
const routeTagStyles = {
  'fontSize': 7,
  'strokeWidth': '1px',
  'fill': '#fff',
  'transform': 'translateY(2px)'
}

class Vehicles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vehicleData: {}
    };
    this.fetchVehicleLocations = this.fetchVehicleLocations.bind(this);
  }
  
  fetchVehicleLocations() {
    // fetch(`http://webservices.nextbus.com/service/publicJSONFeed?command=vehicleLocations&a=sf-muni&t=0`)
    //   .then(res => res.json())
    //   .then((json) => {
    //     this.setState({
    //       vehicleData: json
    //     });
    //   })
    this.setState({
      vehicleData: json
    })

    this.timeout = setTimeout(() => this.fetchVehicleLocations(), 15000)
  }

  renderVehicles(vehicles = []) {
    const projection = getProjection(width, height);
    return vehicles.map((vehicle, index) => {
      const coordinates = [Number.parseFloat(vehicle.lon), Number.parseFloat(vehicle.lat)]
      const circleProps = {
        cx: projection(coordinates)[0],
        cy: projection(coordinates)[1],
        r: 7,
        fill: 'black'
      }
      const textProps = {
        textAnchor: 'middle',
        x: projection(coordinates)[0],
        y: projection(coordinates)[1]
      }
      return (
        <Fragment key={index}>
          <circle {...circleProps} />
          <text {...textProps} style={routeTagStyles}>{vehicle.routeTag}</text>
        </Fragment>
      )
    })
  }

  componentDidMount() {
    this.fetchVehicleLocations()
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  render() {
    return (
      <g>
        { this.renderVehicles(this.state.vehicleData.vehicle)}
      </g> 
    );
  }
}

export default Vehicles;
