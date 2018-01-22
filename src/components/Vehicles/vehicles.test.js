import React from 'react';
import { shallow, mount } from 'enzyme';
import Vehicles from './index';
import { fakeRouteList, fakeVehicleData } from '../test-data';

describe('Vehicles', () => {
  let props;

  beforeEach(() => {
    global.fetch = jest.fn().mockImplementation(() => (
      Promise.resolve({ json: () => ['data'] })
    ))
    props = {
      appState: {
        routeList: fakeRouteList,
        vehicleData: fakeVehicleData
      },
      setAppState: jest.fn()
    }
  })
  it('should render successfully', () => {
    shallow(<Vehicles {...props} />, {
      disableLifecycleMethods: true
    });
  });
  
  it('should render two vehicles with correct props', () => {
    const wrapper = mount(<Vehicles {...props} />, {
      disableLifecycleMethods: true
    });
    const aChild = wrapper.find('Vehicles').childAt(0);

    expect(wrapper.find('Vehicles').children().length).toBe(2);
    expect(aChild.props()).toEqual({
      vehicleData: props.appState.vehicleData[0],
      visible: true
    })
  })

  it('should fetch vehicle locations', () => {
    const promise = Promise.resolve({ 
      json: () => Promise.resolve({ vehicle: ['data'] })
    })
    global.fetch = jest.fn().mockImplementation(() => promise);
    const wrapper = shallow(<Vehicles {...props} />, {
      disableLifecycleMethods: false
    });

    return promise.then().then(() => {
      expect(global.fetch).toHaveBeenCalledWith('http://webservices.nextbus.com/service/publicJSONFeed?command=vehicleLocations&a=sf-muni&t=0');
      expect(props.setAppState).toHaveBeenCalledWith({ vehicleData: ['data'] });
    })
  })

  it('should set recursive timeout for fetching vehicles', () => {
    window.setTimeout = jest.fn();
    shallow(<Vehicles {...props} />, {
      disableLifecycleMethods: false
    });

    expect(window.setTimeout).toHaveBeenCalledWith(expect.any(Function), 15000);
  })

  it('should clear timeout upon unmounting', () => {
    window.clearTimeout = jest.fn();
    const wrapper = shallow(<Vehicles {...props} />, {
      disableLifecycleMethods: false
    });
    wrapper.instance().timeout = 'some timeout'
    wrapper.unmount();

    expect(window.clearTimeout).toHaveBeenCalledWith('some timeout');
  })
});
