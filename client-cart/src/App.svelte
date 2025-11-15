<script lang="ts">
  import Cart from './lib/Cart.svelte';
  import WrapperReactSvelte from './lib/WrapperReactSvelte.svelte';
</script>

<main>
  <h1>🛍️ Module Federation Store Demo</h1>
  <p class="subtitle">React Products + Svelte Shopping Cart</p>
  
  <div class="container">
    <div class="products-section">
      <WrapperReactSvelte
        dynamicImportPromise={import('products/ProductList')}
      />
    </div>

    <div class="cart-section">
      <Cart />
    </div>
  </div>
</main>

<style>
  main {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
  }

  h1 {
    text-align: center;
    color: #333;
    margin-bottom: 0.5rem;
    font-size: 2.5rem;
  }

  .subtitle {
    text-align: center;
    color: #666;
    margin-bottom: 2rem;
    font-size: 1.1rem;
  }

  .container {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .products-section {
    width: 100%;
  }

  .cart-section {
    width: 100%;
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 2rem;
    }

    .subtitle {
      font-size: 1rem;
    }
  }
</style>