import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { federation } from '@module-federation/vite'

export default defineConfig({
  build: {
    target: 'chrome89',
  },
  plugins: [
    react({
      jsxRuntime: 'classic',
    }),
    federation({
      filename: 'remoteEntry.js',
      name: 'products',
      exposes: {
                './ProductList': './src/components/ProductList/ProductListForSvelte.js',
                './cartStore': './src/store/index.jsx',
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
      },
    }),
  ],
  server: {
    port: 3004,
    cors: true,
  },
})