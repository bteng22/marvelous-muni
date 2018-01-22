import React, { PureComponent, Fragment } from 'react'
import Neighborhoods from '../Neighborhoods';
import Arteries from '../Arteries';
import Streets from '../Streets';
import Freeways from '../Freeways';

export default class BaseMap extends PureComponent {
  render() {
    return (
      <Fragment>
        <Neighborhoods />
        <Streets />
        <Freeways />
        <Arteries />
      </Fragment>
    );
  }
}
