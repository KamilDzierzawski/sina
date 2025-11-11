import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { federation } from '@module-federation/vite'

export default defineConfig({
  build: {
    target: 'chrome89',
  },
  plugins: [
    federation({
      name: 'cart',
      filename: 'remoteEntry.js',
      exposes: {
        './Cart': './src/lib/Cart.svelte',
      },
      remotes: {
        products: {
          type: 'module',
          name: 'products',
          entry: 'http://localhost:3001/mf-manifest.json',
          entryGlobalName: 'products',
          shareScope: 'default',
        },
      },
      shared: {
        svelte: {
          singleton: true,
        },
        react: {
          singleton: true,
          requiredVersion: '^19.2.0',
        },
        'react-dom': {
          singleton: true,
          requiredVersion: '^19.2.0',
        },
      },
    }),
    svelte(),
  ],
  server: {
    port: 3002,
    cors: true,
  },
})