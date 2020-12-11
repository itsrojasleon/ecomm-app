import React from 'react';
import { render } from 'react-dom';
import App from './app';
import { Provider } from './context/container-context';

render(
  <Provider>
    <App />
  </Provider>,
  document.getElementById('root')
);
