# Module Federation Demo — Run Instructions

Overview
- Monorepo with three apps:
  - `client-products` — React microfrontend (Webpack) exposing `./ProductList` and `./cartStore` (port 3004).
  - `client-cart` — Svelte microfrontend (Vite) exposing `./Cart` (port 3002).

Install & run (dev)
1. client-products (React / Webpack)
```bash
cd client-products
npm install
npm start        # dev server, remoteEntry at http://localhost:3004/remoteEntry.js
```

2. client-cart (Svelte / Vite)
```bash
cd client-cart
npm install
npm run dev      # dev server, remoteEntry at http://localhost:3002/remoteEntry.js
```

Order tip: start `client-products` before `client-cart`


Where to look
- client-products:
  - webpack config: `client-products/webpack.config.js`
  - React wrapper: `client-products/src/components/WrapperForSvelte.tsx`
  - Product list: `client-products/src/components/ProductList/ProductList.tsx`
  - cart store: `client-products/src/store/index` (exposed as `./cartStore`)
- client-cart:
  - vite config: `client-cart/vite.config.js`
  - Cart Svelte: `client-cart/src/lib/Cart.svelte`
  - React wrapper consumer: `client-cart/src/lib/WrapperReactSvelte.svelte`
