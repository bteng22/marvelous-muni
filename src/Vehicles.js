import React, { Component } from 'react';
import Vehicle from './Vehicle';
import json from './vehicleLocations.json';

class Vehicles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vehicleData: {}
    };
    this.fetchVehicleLocations = this.fetchVehicleLocations.bind(this);
  }
  
  fetchVehicleLocations() {
    fetch(`http://webservices.nextbus.com/service/publicJSONFeed?command=vehicleLocations&a=sf-muni&t=0`)
      .then(res => res.json())
      .then((json) => {
        this.setState({
          vehicleData: json
        });
      })

    this.timeout = setTimeout(() => this.fetchVehicleLocations(), 15000)
  }

  renderVehicles(vehicles = []) {
    return vehicles.map((vehicle, index) => {
      return (
        <Vehicle vehicleData={vehicle} key={vehicle.id} />
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
    return this.renderVehicles(this.state.vehicleData.vehicle)
  }
}

export default Vehicles;
