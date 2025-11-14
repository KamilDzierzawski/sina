// import { defineConfig } from 'vite'
// import { svelte } from '@sveltejs/vite-plugin-svelte'
// import { federation } from '@module-federation/vite'

// export default defineConfig({
//   build: {
//     target: 'chrome89',
//   },
//   plugins: [
//     federation({
//       name: 'cart',
//       filename: 'remoteEntry.js',
//       exposes: {
//         './Cart': './src/lib/Cart.svelte',
//       },
//       remotes: {
//         products: {
//           type: 'module',
//           name: 'products',
//           entry: 'http://localhost:3001/mf-manifest.json',
//           entryGlobalName: 'products',
//           shareScope: 'default',
//         },
//       },
//       shared: {
//         svelte: {
//           singleton: true,
//         },
//         react: {
//           singleton: true,
//           requiredVersion: '^19.2.0',
//         },
//         'react-dom': {
//           singleton: true,
//           requiredVersion: '^19.2.0',
//         },
//       },
//     }),
//     svelte(),
//   ],
//   server: {
//     port: 3002,
//     cors: true,
//   },
// })

import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { federation } from '@module-federation/vite';

function devCorsPlugin() {
  return {
    name: 'dev-cors-headers',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,PUT,POST,DELETE,OPTIONS')
        res.setHeader('Access-Control-Allow-Headers', '*')
        if (req.method === 'OPTIONS') {
          res.statusCode = 204
          return res.end()
        }
        next()
      })
    },
  }
}

export default defineConfig({
  server: {
    strictPort: true,
    port: 3002,
    cors: true,
  },
  plugins: [
    devCorsPlugin(),
    svelte(),
    federation({
      name: 'cart',
      filename: 'remoteEntry.js',
      exposes: {
        './Cart': './src/lib/Cart.svelte', // expose Cart so host może import('cart/Cart')
      },
      remotes: {
        products: {
          type: 'module',
          entry: 'http://localhost:3004/remoteEntry.js',
          shareScope: 'default',
        },
      },
      shared: {
        svelte: { singleton: true },
      },
    }),
  ],
});