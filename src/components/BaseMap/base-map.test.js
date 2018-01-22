import React from 'react';
import { shallow } from 'enzyme';
import BaseMap from './index';

jest.genMockFromModule('../../geojson/neighborhoods.json')
jest.genMockFromModule('../../geojson/arteries.json')
jest.genMockFromModule('../../geojson/streets.json')
jest.genMockFromModule('../../geojson/freeways.json')

describe('BaseMap', () => {
  it('should render successfully', () => {
    const wrapper = shallow(<BaseMap />);
    expect(wrapper.children().length).toBe(4);
  });
});