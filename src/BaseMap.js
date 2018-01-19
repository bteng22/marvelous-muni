import React, { Fragment } from 'react'
import Neighborhoods from './Neighborhoods';
import Arteries from './Arteries';
import Streets from './Streets';
import Freeways from './Freeways';

export default () => {
  return (
    <Fragment>
      <Neighborhoods />
      <Arteries />
      <Streets />
      <Freeways />
    </Fragment>
  );
}