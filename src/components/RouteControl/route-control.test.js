import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import RouteControl from './index';
import { fakeRouteList } from '../test-fixtures';

describe('RouteControl', () => {
  const promise = Promise.resolve({ 
    json: () => Promise.resolve({ route: [{ title: '44 - Bus', tag: '44'}] })
  })
  let props;

  beforeEach(() => {
    global.fetch = jest.fn().mockImplementation(() => promise);
    props = {
      appState: {
        routeList: fakeRouteList
      },
      setAppState: jest.fn()
    }
  });

  it('should render successfully', () => {
    shallow(<RouteControl {...props} />, {
      disableLifecycleMethods: true
    })
  });

  it('should match snapshot', () => {
    const tree = renderer
      .create(<RouteControl {...props} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should toggle route checkbox', () => {
    const route = {
      tag: '44',
      visible: true
    };
    const wrapper = shallow(<RouteControl {...props} />);
    wrapper.instance().toggleRouteCheckbox(route);
    expect(props.setAppState).toHaveBeenCalledWith({"routeList": {"44": {"tag": "44", "visible": false}, "KT": {"tag": "KT", "title": "KT-Ingleside/Third Street", "visible": true}}})
    route.visible = false;
    wrapper.instance().toggleRouteCheckbox(route);
    expect(props.setAppState).toHaveBeenCalledWith({"routeList": {"44": {"tag": "44", "visible": true}, "KT": {"tag": "KT", "title": "KT-Ingleside/Third Street", "visible": true}}})
  });

  it('should toggle all routes', () => {
    const event = {
      target: { checked: false }
    };
    const wrapper = shallow(<RouteControl {...props} />);
    expect(props.appState.routeList).toEqual({"44": {"tag": "44", "title": "44-O'Shaughnessy", "visible": true}, "KT": {"tag": "KT", "title": "KT-Ingleside/Third Street", "visible": true}});
    wrapper.instance().toggleAllRoutes(event);
    expect(props.setAppState).toHaveBeenCalledWith({"routeList": {"44": {"tag": "44", "title": "44-O'Shaughnessy", "visible": false}, "KT": {"tag": "KT", "title": "KT-Ingleside/Third Street", "visible": false}}});
  });

  it('should fetch route list', () => {
    const wrapper = shallow(<RouteControl {...props} />, {
      disableLifecycleMethods: false
    });

    return promise.then().then(() => {
      expect(global.fetch).toHaveBeenCalledWith('http://webservices.nextbus.com/service/publicJSONFeed?command=routeList&a=sf-muni');
      expect(props.setAppState).toHaveBeenCalledWith({
        routeList: {
          44: {
            tag: "44",
            title: "44 - Bus",
            visible: true
          }
        }
      });
    })
  })
});