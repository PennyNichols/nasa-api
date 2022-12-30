import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ImageProvider from './context/ImageContext';
import { ThemeProvider } from '@mui/material';
import { theme } from './theme/theme';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ImageProvider>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </ImageProvider>
  </React.StrictMode>
);
