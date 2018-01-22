import React from 'react'
import Path from '../Path';
import streets from '../../sfmaps/streets.json'

export default () => {
  return streets.features
    .map((feature, index) => <Path
      key={index}
      pathData={feature}
      fill={'#86c23d'}
      stroke={"#fff"}
    />)
}