import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { federation } from '@module-federation/vite';

export default defineConfig({
  build: {
    target: 'chrome89',
  },
  optimizeDeps: {
    exclude: ['@module-federation/runtime'],
  },
  plugins: [
    federation({
      name: 'host',
      remotes: {
        products: {
          type: 'var',
          entry: 'http://localhost:3004/remoteEntry.js',
          format: 'var',
          from: 'webpack',
        },
        cart: {
          type: 'module',
          entry: 'http://localhost:3002/remoteEntry.js',
          format: 'esm',
          from: 'vite',
        },
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: '^19.2.0',
        },
        'react-dom': {
          singleton: true,
          requiredVersion: '^19.2.0',
        },
        svelte: {
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