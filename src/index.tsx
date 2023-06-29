import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.less'

const rootDOM = document.getElementById('root')
console.log('=======', rootDOM)
const root = createRoot(rootDOM);

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
