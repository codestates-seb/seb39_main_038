import React from 'react';
import reactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import './index.css';
import { ThemeProvider } from 'styled-components';
import App from './App';
import theme from './style/theme';

axios.defaults.withCredentials = true;
const root = reactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Router>,
);
