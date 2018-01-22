import React from 'react';
import { shallow } from 'enzyme';
import Path from './index';
import { generatePath } from '../../geoHandler';

jest.mock('../../geoHandler', () => ({
  generatePath: jest.fn(() => 'some path')
}))

describe('Path', () => {
  const props = {
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
    window.innerWidth = 123;
    window.innerHeight = 321;
    shallow(<Path {...props} />);
    expect(generatePath).toHaveBeenCalledWith({}, 123, 321);
  });
});