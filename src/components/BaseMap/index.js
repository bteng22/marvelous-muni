import React, { PureComponent, Fragment } from 'react'
import PathGenerator from '../PathGenerator';
import neighborhoodsJSON from '../../sfmaps/neighborhoods.json';
import arteriesJSON from '../../sfmaps/arteries.json';
import streetsJSON from '../../sfmaps/streets.json';
import freewaysJSON from '../../sfmaps/freeways.json';

export default class BaseMap extends PureComponent {
  render() {
    return (
      <Fragment>
        <PathGenerator geoFeatures={neighborhoodsJSON.features} fill={'#fedeb4'} stroke={'#e6e6e6'} />
        <PathGenerator geoFeatures={streetsJSON.features} fill={'#86c23d'} stroke={'#fff'} />
        <PathGenerator geoFeatures={arteriesJSON.features} fill={'#ff0000'} stroke={'#ff0000'} />
        <PathGenerator geoFeatures={freewaysJSON.features} fill={'#c68039'} stroke={'#e6e6e6'} />
      </Fragment>
    );
  }
}
