import React from 'react';
import { shallow, mount} from 'enzyme';
import PathGenerator from './index';

describe('PathGenerator', () => {
  it('should render successfully', () => {
    const props = {
      geoFeatures: [{}],
      fill: '#fill',
      stroke: '#stroke'
    }
    const wrapper = mount(<PathGenerator {...props} />)
    expect(wrapper.find('Path').length).toBe(1);
    expect(wrapper.find('Path').props()).toEqual({
      fill: "#fill",
      pathData: {},
      stroke: "#stroke"
    })
  });
});