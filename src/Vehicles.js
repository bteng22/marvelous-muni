import React, { Component } from 'react';
import Vehicle from './Vehicle';

class Vehicles extends Component {
  constructor(props) {
    super(props);
    this.fetchVehicleLocations = this.fetchVehicleLocations.bind(this);
  }

  fetchVehicleLocations() {
    fetch(`http://webservices.nextbus.com/service/publicJSONFeed?command=vehicleLocations&a=sf-muni&t=0`)
      .then(res => res.json())
      .then((json) => {
        this.props.setAppState({
          vehicleData: json.vehicle
        });
      })

    this.timeout = setTimeout(() => this.fetchVehicleLocations(), 15000)
  }

  componentDidMount() {
    this.fetchVehicleLocations()
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }


  renderVehicles(vehicles = []) {
    const { routeList } = this.props.appState;
    return vehicles.map((vehicle, index) => {
      return (
        <Vehicle
          vehicleData={vehicle}
          visible={routeList[vehicle.routeTag].visible}
          key={vehicle.id}
        />
      )
    })
  }

  render() {
    const { vehicleData } = this.props.appState;
    return this.renderVehicles(vehicleData)
  }
}

export default Vehicles;
