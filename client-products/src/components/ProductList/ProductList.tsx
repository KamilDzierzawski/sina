import React from 'react';
import { cartStore } from '../../store/cartStore';

const products = [
  { id: 1, name: 'Laptop', price: 2500 },
  { id: 2, name: 'Mysz', price: 50 },
  { id: 3, name: 'Klawiatura', price: 150 },
  { id: 4, name: 'Monitor', price: 800 },
];

const styles = {
  container: {
    padding: '20px',
    border: '2px solid #333',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
  },
  list: {
    listStyle: 'none',
    padding: 0,
  },
  item: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
    margin: '5px 0',
    backgroundColor: 'white',
    borderRadius: '5px',
    border: '1px solid #ddd',
  },
  button: {
    padding: '8px 16px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
};

export const ProductList = () => {
  const handleAddToCart = (product: any) => {
    cartStore.addProduct(product);
  };

  return (
    <div style={styles.container}>
      <h2>📦 Lista Produktów (React - Products)</h2>
      <ul style={styles.list}>
        {products.map((product) => (
          <li key={product.id} style={styles.item}>
            <span>
              <strong>{product.name}</strong> - {product.price} PLN
            </span>
            <button
              style={styles.button}
              onClick={() => handleAddToCart(product)}
            >
              Dodaj do koszyka
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};