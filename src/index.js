import React from 'react';
import ReactDOM from 'react-dom';
import AppState from './AppState';
import App from './App';

ReactDOM.render(
  <AppState>
    <App />
  </AppState>,
  document.getElementById('root')
);