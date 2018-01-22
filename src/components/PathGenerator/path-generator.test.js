import React from 'react';
import { shallow, mount} from 'enzyme';
import PathGenerator from './index';

describe('PathGenerator', () => {
  it('should render successfully', () => {
    const props = {
      appState: {
        width: 123,
        height: 321
      },
      geoFeatures: [{}],
      fill: '#fill',
      stroke: '#stroke'
    }
    const wrapper = mount(<PathGenerator {...props} />)
    expect(wrapper.find('Path').length).toBe(1);
    expect(wrapper.find('Path').props()).toEqual({
      appState: {
        width: 123,
        height: 321
      },
      fill: "#fill",
      pathData: {},
      stroke: "#stroke"
    })
  });
});