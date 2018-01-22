import React from 'react';
import { shallow } from 'enzyme';
import SVGContainer from './index';

describe('SVGContainer', () => {
  let props;

  beforeEach(() => {
    props = {
      appState: {},
      setAppState: jest.fn()
    }
  })

  it('should render successfully', () => {
    props.appState = {
      width: 123,
      height: 321
    }
    const wrapper = shallow(<SVGContainer {...props} />);
    expect(wrapper.find('svg').length).toEqual(1);
    expect(wrapper.find('svg').prop('viewBox')).toEqual('0 0 123 321')
  });

  it('should render children components', () => {
    const wrapper = shallow(<SVGContainer {...props} />);
    expect(wrapper.find('BaseMap').length).toEqual(1);
    expect(wrapper.find('Vehicles').length).toEqual(1);
    expect(wrapper.find('Vehicles').props()).toEqual({
      appState: {},
      setAppState: expect.any(Function)
    });
  })
});