import React from 'react';
import { shallow, mount } from 'enzyme';
import AppState from './index';

describe('AppState', () => {
  const Child = (props) => {
    expect(props).toEqual({
      appState: {
        routeList: expect.any(Object),
        vehicleData: [],
        width: expect.any(Number),
        height: expect.any(Number)
      },
      setAppState: expect.any(Function)
    })

    return (
      <div></div>
    )
  }

  it('should pass appState and setAppState into child', () => {
    mount(
      <AppState>
        <Child />
      </AppState>
    )
  });

  it('should update window dimensions upon component did mount', () => {
    const mockFn = jest.fn();
    const wrapper = shallow(<AppState />);
    wrapper.instance().updateWindowDimensions = mockFn;
    wrapper.instance().componentDidMount();
    expect(mockFn).toHaveBeenCalled();
  });

  it('should register event listener upon component did mount', () => {
    window.addEventListener = jest.fn();
    const wrapper = shallow(<AppState />);
    wrapper.instance().componentDidMount();
    expect(window.addEventListener).toHaveBeenCalledWith('resize', expect.any(Function));
  });

  it('should remove event listener upon component will unmount', () => {
    window.removeEventListener = jest.fn();
    const wrapper = shallow(<AppState />);
    wrapper.unmount()
    expect(window.removeEventListener).toHaveBeenCalledWith('resize', expect.any(Function));
  });

  it('should update window dimensions', () => {
    const wrapper = shallow(<AppState />);
    expect(wrapper.state('width')).toEqual(1024);
    expect(wrapper.state('height')).toEqual(768);
    window.innerWidth = 123;
    window.innerHeight = 321;
    wrapper.instance().updateWindowDimensions();
    expect(wrapper.state('width')).toEqual(123);
    expect(wrapper.state('height')).toEqual(321);
  });
});