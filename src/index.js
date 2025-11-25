import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
<<<<<<< HEAD
import App from './App.jsx';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
=======
import App from './App';
import reportWebVitals from './reportWebVitals';
>>>>>>> 237e2e6713f5ffa1b392fa81d8f00f9e6cb374bd

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
<<<<<<< HEAD
    <BrowserRouter>
      <App />
      </BrowserRouter>
=======
    <App />
>>>>>>> 237e2e6713f5ffa1b392fa81d8f00f9e6cb374bd
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
