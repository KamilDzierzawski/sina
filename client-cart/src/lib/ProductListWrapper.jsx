import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'

// Dynamically load the remote ProductList component
async function loadProductList() {
  try {
    // Access the products remote module
    const ProductListModule = await __federation_method_getRemote('products', './ProductList')
    return ProductListModule.default
  } catch (error) {
    console.error('Failed to load ProductList:', error)
    return null
  }
}

export function mountProductList(containerElement) {
  const root = createRoot(containerElement)
  root.render(<ProductListRemote />)
  return root
}

function ProductListRemote() {
  const [ProductList, setProductList] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadProductList()
      .then(Component => {
        if (Component) {
          setProductList(() => Component)
        } else {
          setError('Failed to load ProductList component')
        }
      })
      .catch(err => {
        console.error('Error loading ProductList:', err)
        setError(err.message)
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading ProductList...</div>
  }

  if (error) {
    return <div style={{ padding: '2rem', color: 'red' }}>Error: {error}</div>
  }

  return ProductList ? <ProductList /> : <div>ProductList not available</div>
}
