import React from 'react';
import { render } from 'react-dom';
import App from './app';
import { Provider as AuthProvider } from './context/auth';

render(
  <AuthProvider>
    <App />
  </AuthProvider>,
  document.getElementById('root')
);
