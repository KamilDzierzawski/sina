import React from 'react';
import { cartStore } from '../../store/cartStore';

const products = [
  { id: 1, name: 'Laptop', price: 2500 },
  { id: 2, name: 'Mouse', price: 50 },
  { id: 3, name: 'Keyboard', price: 150 },
  { id: 4, name: 'Monitor', price: 800 },
  { id: 5, name: 'Headphones', price: 200 },
  { id: 6, name: 'Webcam', price: 350 },
];

const styles = {
  container: {
    padding: '24px',
    border: '2px solid #4CAF50',
    borderRadius: '12px',
    backgroundColor: '#f1f8f4',
    marginBottom: '20px',
  },
  header: {
    margin: '0 0 20px 0',
    color: '#2e7d32',
    fontSize: '1.8rem',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '16px',
    padding: 0,
    listStyle: 'none',
  },
  card: {
    padding: '16px',
    backgroundColor: 'white',
    borderRadius: '8px',
    border: '1px solid #c8e6c9',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    transition: 'transform 0.2s, box-shadow 0.2s',
  },
  cardHover: {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
  },
  productName: {
    fontSize: '1.1rem',
    fontWeight: 'bold',
    marginBottom: '8px',
    color: '#333',
  },
  productPrice: {
    fontSize: '1.3rem',
    color: '#4CAF50',
    fontWeight: 'bold',
    marginBottom: '12px',
  },
  button: {
    width: '100%',
    padding: '10px 16px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '0.95rem',
    transition: 'background-color 0.2s',
  },
  buttonHover: {
    backgroundColor: '#45a049',
  },
};

export const ProductList = () => {
  const handleAddToCart = (product: any) => {
    cartStore.addProduct(product);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>🛍️ React Products</h2>
      <ul style={styles.grid}>
        {products.map((product) => (
          <li
            key={product.id}
            style={styles.card}
            onMouseEnter={(e) => {
              Object.assign(e.currentTarget.style, styles.cardHover);
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
            }}
          >
            <div style={styles.productName}>{product.name}</div>
            <div style={styles.productPrice}>${product.price}</div>
            <button
              style={styles.button}
              onClick={() => handleAddToCart(product)}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#45a049';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#4CAF50';
              }}
            >
              Add to Cart
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};