import React from 'react';
import { shallow } from 'enzyme';
import Vehicle, { DirectionalDroplet, RouteTag } from './index';
import { fakeVehicleData } from '../test-fixtures';

jest.mock('../../geoHandler', () => ({
    getProjection: () => jest.fn(() => [123, 321])
}))

describe('Vehicle', () => {
  let props;

  beforeEach(() => {
    props = {
      vehicleData: fakeVehicleData[0],
      visible: true
    }
  });

  it('should render successfully', () => {
    shallow(<Vehicle {...props} />)
  });

  it('should render vehicle components', () => {
    const wrapper = shallow(<Vehicle {...props} />);
    expect(wrapper.find('DirectionalDroplet').length).toBe(1);
    expect(wrapper.find('DirectionalDroplet').props()).toEqual({
      heading: expect.any(String)
    });
    expect(wrapper.find('RouteTag').length).toBe(1);
    expect(wrapper.find('RouteTag').props()).toEqual({
      tag: expect.any(String)
    });
  })

  it('should set display to initial if visible is true', () => {
    const wrapper = shallow(<Vehicle {...props} />);
    expect(wrapper.prop('style').display).toEqual('initial');
  })

  it('should set display to none if visible is false', () => {
    props.visible = false;
    const wrapper = shallow(<Vehicle {...props} />);
    expect(wrapper.prop('style').display).toEqual('none');
  })

  it('should translate the SVG group', () => {
    const wrapper = shallow(<Vehicle {...props} />);
    expect(wrapper.prop('transform')).toEqual('translate(123,321)')
  })

  describe('DirectionalDroplet', () => {
    it('should render successfully', () => {
      const wrapper = shallow(<DirectionalDroplet heading='123' />);
      const SVGPath = wrapper.find('path');
      expect(SVGPath.length).toBe(1);
      expect(SVGPath.props()).toEqual({"d": "M15 6 Q 15 6, 25 18 A 12.8 12.8 0 1 1 5 18 Q 15 6 15 6z", "fill": "black", "transform": "scale(0.5) rotate(123) translate(-15,-28)"})
    })
  })

  describe('RouteTag', () => {
    it('should render successfully', () => {
      const wrapper = shallow(<RouteTag tag='44' />);
      const SVGText = wrapper.find('text');
      expect(SVGText.length).toBe(1);
      expect(SVGText.props()).toEqual({"children": "44", "style": {"fill": "#fff", "fontSize": 7, "strokeWidth": "1px", "transform": "translateY(2px)"}, "textAnchor": "middle"})
    })
  })
});