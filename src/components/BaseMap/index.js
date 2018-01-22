import React, { Component, Fragment } from 'react'
import PathGenerator from '../PathGenerator';
import neighborhoodsJSON from '../../geojson/neighborhoods.json';
import arteriesJSON from '../../geojson/arteries.json';
import streetsJSON from '../../geojson/streets.json';
import freewaysJSON from '../../geojson/freeways.json';

export default class BaseMap extends Component {
  state = { shouldUpdate: false }

  checkDimensions(nextProps) {
    const { width: nextWidth, height: nextHeight } = nextProps.appState;
    const { width, height } = this.props.appState;

    if (this.state.shouldUpdate) {
      this.setState({ shouldUpdate: false });
      return true;
    } else if (nextWidth !== width || nextHeight !== height) {
      this.setState({ shouldUpdate: true })
    }

    return false;
  }

  shouldComponentUpdate(nextProps) {
    return this.checkDimensions(nextProps);
  }
  
  render() {
    return (
      <Fragment>
        <PathGenerator appState={this.props.appState} geoFeatures={neighborhoodsJSON.features} fill={'#fedeb4'} stroke={'#e6e6e6'} />
        <PathGenerator appState={this.props.appState} geoFeatures={streetsJSON.features} fill={'#86c23d'} stroke={'#fff'} />
        <PathGenerator appState={this.props.appState} geoFeatures={arteriesJSON.features} fill={'#ff0000'} stroke={'#ff0000'} />
        <PathGenerator appState={this.props.appState} geoFeatures={freewaysJSON.features} fill={'#c68039'} stroke={'#e6e6e6'} />
      </Fragment>
    );
  }
}
