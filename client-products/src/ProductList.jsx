import { useState, useEffect } from 'react'

// Symulacja API - zwraca listę produktów
const fetchProducts = async () => {
  await new Promise(resolve => setTimeout(resolve, 500))

  return [
    { id: 1, name: 'Laptop Dell XPS 13', price: 4999.99, quantity: 15 },
    { id: 2, name: 'iPhone 15 Pro', price: 5299.00, quantity: 8 },
    { id: 3, name: 'Samsung Galaxy S24', price: 3999.00, quantity: 12 },
    { id: 4, name: 'MacBook Air M2', price: 6499.00, quantity: 5 },
    { id: 5, name: 'iPad Pro 12.9"', price: 4599.00, quantity: 20 },
    { id: 6, name: 'Sony WH-1000XM5', price: 1499.00, quantity: 30 },
    { id: 7, name: 'Logitech MX Master 3', price: 399.00, quantity: 45 },
    { id: 8, name: 'Dell UltraSharp 27"', price: 2199.00, quantity: 10 }
  ]
}

const ProductList = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true)
      const data = await fetchProducts()
      setProducts(data)
      setLoading(false)
    }

    loadProducts()
  }, [])

  if (loading) {
    return <div className="loading">Ładowanie produktów...</div>
  }

  return (
    <div className="products-container">
      <h1>Lista Produktów</h1>
      <div className="products-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <h3>{product.name}</h3>
            <p className="price">{product.price.toFixed(2)} PLN</p>
            <p className="quantity">Dostępne: {product.quantity} szt.</p>
            <button>Dodaj do koszyka</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductList