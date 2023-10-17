import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { AuthContextProvider } from './store/auth-context';

ReactDOM.render(
  <AuthContextProvider><App /></AuthContextProvider>,
  document.getElementById('root')
);
