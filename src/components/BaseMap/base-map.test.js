import React from 'react';
import { shallow } from 'enzyme';
import BaseMap from './index';

jest.genMockFromModule('../../geojson/neighborhoods.json')
jest.genMockFromModule('../../geojson/arteries.json')
jest.genMockFromModule('../../geojson/streets.json')
jest.genMockFromModule('../../geojson/freeways.json')

describe('BaseMap', () => {
  const props = {
    appState: {
      width: 123,
      height: 321
    }
  };
  it('should render successfully', () => {
    const wrapper = shallow(<BaseMap {...props} />);
    expect(wrapper.children().length).toBe(4);
  });

  it('should prepare to update component if window dimensions change', () => {
    const wrapper = shallow(<BaseMap {...props} />);
    expect(wrapper.state('shouldUpdate')).toBe(false);
    const nextProps = {
      appState: {
        width: 456,
        height: 654
      }
    }
    const result = wrapper.instance().checkDimensions(nextProps);
    wrapper.update();
    expect(wrapper.state('shouldUpdate')).toBe(true);
    expect(result).toBe(false);
  });

  it('should update components if shouldUpdate is true', () => {
    const nextProps = {
      appState: {
        width: 456,
        height: 654
      }
    }
    const wrapper = shallow(<BaseMap {...props} />);
    wrapper.setState({ shouldUpdate: true });
    wrapper.update();
    const result = wrapper.instance().checkDimensions(nextProps);
    wrapper.update();
    expect(wrapper.state('shouldUpdate')).toBe(false);
    expect(result).toBe(true);

  })
});