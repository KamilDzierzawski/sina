import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { federation } from '@module-federation/vite';

export default defineConfig({
  build: {
    target: 'chrome89',
  },
  server: {
    strictPort: true,
    port: 3002,
    cors: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  },
  optimizeDeps: {
    exclude: ['@module-federation/runtime'],
  },
  plugins: [
    svelte(),
    federation({
      name: 'cart',
      filename: 'remoteEntry.js',
      exposes: {
        './Cart': './src/lib/Cart.svelte',
      },
      remotes: {
        products: {
          entry: 'http://localhost:3004/remoteEntry.js',
          format: 'var',
          from: 'webpack',
        },
      },
      shared: {
        svelte: {
          singleton: true,
        },
      },
    }),
  ],
});