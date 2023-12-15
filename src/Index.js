import React from 'react';
import ReactDOM from 'react-dom';
import { AuthProvider } from './AuthContext';
import './css/index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
);
