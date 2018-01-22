import React, { Component } from 'react';
import RouteControl from '../RouteControl';
import SVGContainer from '../SVGContainer';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='container'>
        <RouteControl appState={this.props.appState} setAppState={this.props.setAppState} />
        <SVGContainer appState={this.props.appState} setAppState={this.props.setAppState} />
      </div>
    );
  }
}

export default App;
