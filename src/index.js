import React from 'react';
import ReactDOM from 'react-dom';
import AppState from './components/AppState';
import App from './components/App';
import './index.css';

ReactDOM.render(
  <AppState>
    <App />
  </AppState>,
  document.getElementById('root')
);