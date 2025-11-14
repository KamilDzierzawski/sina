import { createInstance } from '@module-federation/runtime';
import { mount } from 'svelte'
import './app.css'
import App from './App.svelte'

// Initialize MF runtime for consuming products remote
createInstance({
  name: 'cart',
  remotes: [
    {
      name: 'products',
      entry: 'http://localhost:3004/remoteEntry.js',
      alias: 'products',
    },
  ],
});

// Only mount when running standalone (dev port 3002)
const isStandaloneCart = typeof window !== 'undefined' && window.location.hostname === 'localhost' && window.location.port === '3002';

let app = null;
if (isStandaloneCart) {
  app = mount(App, {
    target: document.getElementById('app'),
  })
}

export default app
