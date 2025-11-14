<script lang="ts">
  import Cart from './lib/Cart.svelte';
  import WrapperReactSvelte from './lib/WrapperReactSvelte.svelte';

  // Only show products when running standalone
  const isStandalone = typeof window !== 'undefined' && window.location.port === '3002';
</script>

<main>
  <h1>🛍️ Sklep - Module Federation Demo</h1>
  
  <div class="container">
    {#if isStandalone}
      <div class="section">
        <WrapperReactSvelte
          dynamicImportPromise={import('products/ProductList')}
        />
      </div>
    {/if}

    <div class="section">
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
    margin-bottom: 2rem;
  }

  .container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }

  .section {
    min-height: 200px;
  }

  @media (max-width: 768px) {
    .container {
      grid-template-columns: 1fr;
    }
  }
</style>