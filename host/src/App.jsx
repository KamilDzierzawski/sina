import { useEffect, useRef, useState } from 'react';
import './App.css';

function App() {
  const productsRef = useRef(null);
  const cartRef = useRef(null);
  const [productsLoaded, setProductsLoaded] = useState(false);
  const [cartLoaded, setCartLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let productsWrapper = null;
    let cartComponent = null;

    const loadMicrofrontends = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 100));

        // Load products (React)
        const productsModule = await import('products/ProductList');
        const productsFactory = productsModule.default || productsModule;

        if (typeof productsFactory === 'function' && productsRef.current) {
          productsWrapper = productsFactory(productsRef.current);
          if (productsWrapper && typeof productsWrapper.render === 'function') {
            productsWrapper.render({});
            setProductsLoaded(true);
            console.log('[Host] Products loaded');
          }
        }

        // Load cart (Svelte)
        const { default: Cart } = await import('cart/Cart');
        if (cartRef.current) {
          cartComponent = new Cart({
            target: cartRef.current,
          });
          setCartLoaded(true);
          console.log('[Host] Cart loaded');
        }
      } catch (err) {
        console.error('[Host] Failed to load microfrontends:', err);
        setError(err.message);
      }
    };

    loadMicrofrontends();

    return () => {
      try {
        if (productsWrapper?.destroy) {
          productsWrapper.destroy();
        }
        if (cartComponent?.$destroy) {
          cartComponent.$destroy();
        }
      } catch (err) {
        console.error('[Host] Cleanup error:', err);
      }
    };
  }, []);

  return (
    <div className="app">
      <header>
        <h1>🛍️ Module Federation Store</h1>
        <p>Host Application: React Products + Svelte Cart</p>
      </header>

      <main>
        <div className="microfrontend-container">
          <section className="products-section">
            <h2 className="section-title">Products</h2>
            <div ref={productsRef} />
            {!productsLoaded && !error && (
              <div className="loading">Loading products...</div>
            )}
          </section>

          <section className="cart-section">
            <h2 className="section-title">Shopping Cart</h2>
            <div ref={cartRef} />
            {!cartLoaded && !error && (
              <div className="loading">Loading cart...</div>
            )}
          </section>
        </div>

        {error && <div className="error">❌ Error: {error}</div>}
      </main>

      {(productsLoaded || cartLoaded) && (
        <div className="status">
          {productsLoaded && <span className="status-badge">✅ Products</span>}
          {cartLoaded && <span className="status-badge">✅ Cart</span>}
        </div>
      )}
    </div>
  );
}

export default App;