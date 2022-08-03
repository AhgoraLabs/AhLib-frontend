import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import App from './App';
import { AuthProvider } from '../src/context/auth/AuthContext';

import { SnackbarProvider } from 'notistack';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <SnackbarProvider maxSnack={3} autoHideDuration={5000}>
        <App />
      </SnackbarProvider>
    </AuthProvider>
    
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

