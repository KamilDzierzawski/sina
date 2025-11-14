<script lang="ts">
  import { onMount, onDestroy } from 'svelte';

  interface Product {
    id: number;
    name: string;
    price: number;
  }

  let cart: Product[] = [];
  let totalPrice = 0;
  let unsubscribe: (() => void) | null = null;

  onMount(async () => {
    const { cartStore } = await import('products/cartStore');
    cart = cartStore.getCart();
    unsubscribe = cartStore.subscribe((updatedCart: Product[]) => {
      cart = updatedCart;
      calculateTotal();
    });
    calculateTotal();
  });

  onDestroy(() => {
    if (unsubscribe) unsubscribe();
  });

  function calculateTotal() {
    totalPrice = cart.reduce((sum, item) => sum + item.price, 0);
  }
</script>

<div class="cart">
  <h2>🛒 Koszyk (App1 - Svelte)</h2>
  
  {#if cart.length === 0}
    <p class="empty">Koszyk jest pusty</p>
  {:else}
    <ul>
      {#each cart as item, index (item.id + '-' + index)}
        <li>
          <span class="item-name">{item.name}</span>
          <span class="item-price">{item.price} PLN</span>
        </li>
      {/each}
    </ul>
    <div class="total">
      <strong>Suma: {totalPrice} PLN</strong>
    </div>
  {/if}
</div>

<style>
  .cart {
    padding: 20px;
    border: 3px solid #2196F3;
    border-radius: 10px;
    background-color: #e3f2fd;
    margin: 20px 0;
  }

  h2 {
    margin-top: 0;
    color: #1976D2;
  }

  .empty {
    color: #666;
    font-style: italic;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    margin: 5px 0;
    background-color: white;
    border-radius: 5px;
    border: 1px solid #90CAF9;
  }

  .item-name {
    font-weight: 500;
  }

  .item-price {
    color: #1976D2;
    font-weight: bold;
  }

  .total {
    margin-top: 15px;
    padding: 15px;
    background-color: #1976D2;
    color: white;
    border-radius: 5px;
    text-align: right;
    font-size: 1.2em;
  }
</style>