import React, { Component } from 'react';
import './route-control.css';

class RouteControl extends Component {
  constructor(props) {
    super(props);
    this.state = {
      routeList: this.props.appState.routeList
    }
    this.fetchRouteList = this.fetchRouteList.bind(this);
  }

  fetchRouteList() {
    fetch(`http://webservices.nextbus.com/service/publicJSONFeed?command=routeList&a=sf-muni`)
      .then(res => res.json())
      .then((json) => {
        const initialRoutes = json.route.reduce((routes, route) => {
          routes[route.tag] = {
            ...route,
            visible: true            
          }
          return routes;
        }, {});
        this.props.setAppState({
          routeList: initialRoutes
        })
      })
  }

  toggleRouteCheckbox(route) {
    const { routeList } = this.props.appState;
    const updatedRoutes = Object.assign({}, routeList, {
      [route.tag]: {
        ...route,
        visible: !route.visible
      }
    })

    this.props.setAppState({
      routeList: updatedRoutes
    })
  }

  renderRouteList(routeList) {
    return routeList.map((route) => {
      return (
        <li key={route.tag}>
          <input
            type="checkbox"
            checked={route.visible}
            onChange={() => this.toggleRouteCheckbox(route)}
          />{route.title}
        </li>
      )
    })
  }
  
  componentDidMount() {
    this.fetchRouteList() 
  }

  render() {
    const { routeList } = this.props.appState;
    return (
      <div className='route-control__container'>
        <ul className='route-list'>
          { this.renderRouteList(Object.values(routeList))}
        </ul> 
      </div>
    );
  }
}

export default RouteControl;
