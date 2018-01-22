import React from 'react';
import { shallow } from 'enzyme';
import Path from './index';
import { generatePath } from '../../utils/geoHandler';

jest.mock('../../utils/geoHandler', () => ({
  generatePath: jest.fn(() => 'some path')
}))

describe('Path', () => {
  const props = {
    appState: {
      width: 123,
      height: 321
    },
    pathData: {},
    fill: '#fill',
    stroke: '#stroke'
  };

  it('should render successfully', () => {
    const wrapper = shallow(<Path {...props} />);
    expect(wrapper.find('path').length).toBe(1);
    expect(wrapper.find('path').props()).toEqual({
      d: 'some path',
      style: {
        fill: "#fill",
        stroke: "#stroke"
      }
    });
  });

  it('should call generatePath with correct props', () => {
    shallow(<Path {...props} />);
    expect(generatePath).toHaveBeenCalledWith({}, 123, 321);
  });
});