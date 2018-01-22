import React, { Component } from 'react';
import initialRouteList from './initial-route-list.json';

class AppState extends Component {
  constructor(props) {
    super(props);
    this.state = {
      routeList: initialRouteList,
      vehicleData: [],
      width: window.innerWidth,
      height: window.innerHeight 
    }
    this.setAppState = this.setAppState.bind(this);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }
  
  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }
  
  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
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