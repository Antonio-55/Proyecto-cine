import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom'; // ✅ AÑADIR ESTO

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter> {/* ✅ ENVOLVER APP */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
