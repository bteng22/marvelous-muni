import React from 'react';
import RouteControl from '../RouteControl';
import SVGContainer from '../SVGContainer';

const App = (props) => {
  const { appState, setAppState } = props;
  return (
    <div className='container'>
      <RouteControl appState={appState} setAppState={setAppState} />
      <SVGContainer appState={appState} setAppState={setAppState} />
    </div>
  )
}

export default App;
