<script lang="ts">
  import Cart from './lib/Cart.svelte';
  import WrapperReactSvelte from './lib/WrapperReactSvelte.svelte';

  let username: string | null = null;

  if (typeof window !== 'undefined') {
    const saved = sessionStorage.getItem("username");
    if (saved) {
      username = saved;
    }
  }

  window.addEventListener("message", (event) => {
    if (event.data?.type === "login-success") {
      username = event.data.username;

      // zapisanie do sessionStorage
      sessionStorage.setItem("username", username);
    }
  });

  function logout() {
    sessionStorage.removeItem("username");
    username = null;
  }
</script>

<main>
  <h1>🛍️ Module Federation Store Demo</h1>
  <p class="subtitle">Blazor login + React Products + Svelte Shopping Cart</p>

  {#if !username}
    <iframe
      src="http://localhost:5145/login"
      style="width: 100%; height:300px; border-radius: 8px; border: none;">
    </iframe>
  {/if}

  {#if username}
    <div style="margin-bottom: 1rem; text-align:right;">
      <strong>Logged user: {username}</strong>
      <button
        on:click={logout}
        style="
          margin-left: 1rem;
          padding: 6px 12px;
          background:#d9534f;
          color:white;
          border:none;
          border-radius:6px;
          cursor:pointer;
        "
      >
        Logout
      </button>
    </div>

    <div class="container">
      <div class="products-section">
        <WrapperReactSvelte
          dynamicImportPromise={import('products/ProductList')}
        />
      </div>

      <div class="cart-section">
        <Cart user={username}/>
      </div>
    </div>
  {/if}
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
