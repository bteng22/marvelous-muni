import React from 'react';
import { shallow } from 'enzyme';
import App from './index';
import renderer from 'react-test-renderer';
import { fakeRouteList, fakeVehicleData } from '../test-fixtures';

describe('App', () => {
  const props = {
    appState: {
      routeList: fakeRouteList,
      vehicleData: fakeVehicleData
    },
    setAppState: jest.fn()
  };

  it('should match snapshot', () => {
    global.fetch = jest.fn().mockImplementation(() => (
      Promise.resolve({ json: () => Promise.resolve({ route: [] }) })
    ))
    const tree = renderer
      .create(<App {...props} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});