import React, { Component } from 'react';
import initialRouteList from './initialRouteList.json';

class AppState extends Component {
  constructor(props) {
    super(props);
    this.state = {
      routeList: initialRouteList,
      vehicleData: []
    }
    this.setAppState = this.setAppState.bind(this);
  }

  setAppState(newState, callback) {
    this.setState(newState, callback);
  }

  render() {
    return React.Children.map(this.props.children, child => {
      return React.cloneElement(child, {
        appState: this.state,
        setAppState: this.setAppState
      })
    })
  }
}

export default AppState;