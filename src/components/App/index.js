import React from 'react';
import RouteControl from '../RouteControl';
import SVGContainer from '../SVGContainer';

const App = (props) => {
  const { appState, setAppState } = props;
  return (
    <div className='container'>
      <div className='title-container'>
        <h1>MARVELOUS MUNIs</h1>
        <span>
          <span role='img' aria-label='emoji'>💻</span> : Brandon Teng
        </span>
      </div>
      <RouteControl appState={appState} setAppState={setAppState} />
      <SVGContainer appState={appState} setAppState={setAppState} />
    </div>
  )
}

export default App;
