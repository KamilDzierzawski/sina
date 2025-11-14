import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { federation } from '@module-federation/vite';

export default defineConfig({
  build: {
    target: 'chrome89',
  },
  plugins: [
    federation({
      name: 'host',
      remotes: {
        products: {
          type: 'module',
          entry: 'http://localhost:3004/remoteEntry.js',
          shareScope: 'default',
        },
        cart: {
          type: 'module',
          entry: 'http://localhost:3002/remoteEntry.js',
          shareScope: 'default',
        },
      },
      shared: {
        react: {
          singleton: true,
        },
        'react-dom': {
          singleton: true,
        },
      },
    }),
    react(),
  ],
  server: {
    port: 3000,
    cors: true,
  },
});