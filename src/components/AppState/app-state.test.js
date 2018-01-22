import React from 'react';
import { mount } from 'enzyme';
import AppState from './index';

describe('AppState', () => {
  const Child = (props) => {
    expect(props).toEqual({
      appState: {
        routeList: expect.any(Object),
        vehicleData: []
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
});