import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createInstance } from '@module-federation/runtime';
import './index.css';
import App from './App.jsx';

createInstance({
  name: 'host',
  remotes: [
    { name: 'products', entry: 'http://localhost:3004/remoteEntry.js', alias: 'products' },
    { name: 'cart', entry: 'http://localhost:3002/remoteEntry.js', alias: 'cart' },
  ],
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);