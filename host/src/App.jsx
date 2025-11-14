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
        // Wait for runtime to be ready
        await new Promise((resolve) => setTimeout(resolve, 100));

        // Load products (React wrapper that returns DOM renderer)
        const productsModule = await import('products/ProductList');
        const productsFactory = productsModule.default || productsModule;

        if (typeof productsFactory === 'function' && productsRef.current) {
          // Factory returns (targetDiv) => { render, destroy }
          productsWrapper = productsFactory(productsRef.current);
          if (productsWrapper && typeof productsWrapper.render === 'function') {
            productsWrapper.render({});
            setProductsLoaded(true);
            console.log('[Host] Products loaded');
          }
        }

        // Load cart (Svelte component)
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

    // Cleanup
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
        <h1>🛍️ Sklep - Host Application</h1>
        <p>Mikrofrontendy: Products (React) + Cart (Svelte)</p>
      </header>

      <main>
        <div className="microfrontend-container">
          <div className="products-section">
            <div ref={productsRef} />
            {!productsLoaded && !error && (
              <div className="loading">Ładowanie produktów...</div>
            )}
          </div>

          <div className="cart-section">
            <div ref={cartRef} />
            {!cartLoaded && !error && (
              <div className="loading">Ładowanie koszyka...</div>
            )}
          </div>
        </div>

        {error && <div className="error">❌ Błąd: {error}</div>}
      </main>

      {(productsLoaded || cartLoaded) && (
        <div className="status">
          {productsLoaded && <span className="status-badge">✅ Produkty</span>}
          {cartLoaded && <span className="status-badge">✅ Koszyk</span>}
        </div>
      )}
    </div>
  );
}

export default App;