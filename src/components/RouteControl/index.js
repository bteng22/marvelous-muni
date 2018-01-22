import React, { Component, Fragment } from 'react';
import './route-control.css';

class RouteControl extends Component {
  constructor(props) {
    super(props);
    this.state = {
      routeList: this.props.appState.routeList,
      showMenu: false
    }
    this.fetchRouteList = this.fetchRouteList.bind(this);
    this.toggleAllRoutes = this.toggleAllRoutes.bind(this);
    this.toggleRouteMenu = this.toggleRouteMenu.bind(this);
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

  toggleAllRoutes(event) {
    const { routeList } = this.props.appState;
    const routeListCopy = Object.assign({}, routeList);
    Object.keys(routeList).forEach((routeTag) => {
      routeListCopy[routeTag].visible = event.target.checked;
    });

    this.props.setAppState({
      routeList: routeListCopy
    });
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

  toggleRouteMenu() {
    this.setState({
      showMenu: !this.state.showMenu
    });
  }

  renderRouteList(routeList) {
    return routeList.map((route) => {
      return (
        <li 
          key={ route.tag }
          className="route-list-item"
        >
          <input
            type="checkbox"
            checked={route.visible}
            onChange={() => this.toggleRouteCheckbox(route)}
          />
          <span>{ route.title }</span>
        </li>
      )
    })
  }
  
  componentDidMount() {
    this.fetchRouteList() 
  }

  render() {
    const { routeList } = this.props.appState;
    const { showMenu } = this.state;
    return (
      <Fragment>
        <div className='route-control__container'>
          <button
            className='route-control__button'
            onClick={this.toggleRouteMenu}
          >
            Route Toggles >
          </button>
          <ul className={`route-list ${showMenu ? 'slide' : ''}`}>
            <li className="route-list-item route-list-item__title">
              <span>Route Toggles</span>
              <i
                onClick={this.toggleRouteMenu}
                className="route-control__button route-control--exit"
              >
                X
              </i>
            </li>
            <li className="route-list-item">
              <input
                type="checkbox"
                onChange={this.toggleAllRoutes}  
              />
              <span>Select All</span>
            </li>
            { this.renderRouteList(Object.values(routeList))}
          </ul> 
        </div>
      </Fragment>
    );
  }
}

export default RouteControl;
