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
    cors: false,
  },
  plugins: [
    svelte(),
    federation({
      name: 'cart',
      filename: 'remoteEntry.js',
      exposes: {},
      remotes: {
        products: {
          entry: 'http://localhost:3004/remoteEntry.js',
          format: 'var',
          from: 'webpack',
        },
      },
      shared: [],
    }),
  ],
});