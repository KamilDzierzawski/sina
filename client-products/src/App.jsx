import React from 'react';
import { ProductList } from './components/ProductList/ProductList.jsx';

export const App = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>🛍️ App 4 - Lista Produktów (Standalone)</h1>
      <ProductList />
    </div>
  );
};

export default App;