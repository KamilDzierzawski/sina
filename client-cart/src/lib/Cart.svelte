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
  let showPopup = false;
  let cartStoreInstance: any = null;

  onMount(async () => {
    const { cartStore } = await import('products/cartStore');
    cartStoreInstance = cartStore;
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

  function removeItem(index: number) {
    if (cartStoreInstance) {
      cartStoreInstance.removeProduct(index);
    }
  }

  function checkout() {
    if (cart.length === 0) return;
    
    showPopup = true;
    
    if (cartStoreInstance) {
      cartStoreInstance.clearCart();
    }

    setTimeout(() => {
      showPopup = false;
    }, 3000);
  }
</script>

<div class="cart">
  <h2>🛒 Svelte Shopping Cart</h2>
  
  {#if cart.length === 0}
    <p class="empty">Your cart is empty</p>
  {:else}
    <ul>
      {#each cart as item, index (item.id + '-' + index)}
        <li>
          <div class="item-info">
            <span class="item-name">{item.name}</span>
            <span class="item-price">${item.price}</span>
          </div>
          <button class="remove-btn" on:click={() => removeItem(index)}>
            ✕
          </button>
        </li>
      {/each}
    </ul>
    <div class="total">
      <strong>Total: ${totalPrice}</strong>
    </div>
    <button class="checkout-btn" on:click={checkout}>
      💳 Checkout
    </button>
  {/if}
</div>

{#if showPopup}
  <div class="popup-overlay" on:click={() => showPopup = false}>
    <div class="popup" on:click|stopPropagation>
      <div class="popup-icon">✅</div>
      <h3>Purchase Complete!</h3>
      <p>Thank you for your order.</p>
    </div>
  </div>
{/if}

<style>
  .cart {
    padding: 24px;
    border: 2px solid #2196F3;
    border-radius: 12px;
    background-color: #e3f2fd;
    margin-top: 20px;
  }

  h2 {
    margin-top: 0;
    color: #1976D2;
    font-size: 1.8rem;
  }

  .empty {
    color: #666;
    font-style: italic;
    text-align: center;
    padding: 20px;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0 0 16px 0;
  }

  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
    margin: 8px 0;
    background-color: white;
    border-radius: 8px;
    border: 1px solid #90CAF9;
    transition: transform 0.2s;
  }

  li:hover {
    transform: translateX(4px);
  }

  .item-info {
    display: flex;
    flex-direction: column;
    gap: 4px;
    flex: 1;
  }

  .item-name {
    font-weight: 600;
    font-size: 1.05rem;
  }

  .item-price {
    color: #1976D2;
    font-weight: bold;
    font-size: 1.1rem;
  }

  .remove-btn {
    padding: 6px 12px;
    background-color: #f44336;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-weight: bold;
    font-size: 1rem;
    transition: background-color 0.2s;
  }

  .remove-btn:hover {
    background-color: #d32f2f;
  }

  .total {
    margin: 16px 0;
    padding: 16px;
    background-color: #1976D2;
    color: white;
    border-radius: 8px;
    text-align: right;
    font-size: 1.3rem;
  }

  .checkout-btn {
    width: 100%;
    padding: 14px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: bold;
    font-size: 1.1rem;
    transition: background-color 0.2s, transform 0.1s;
  }

  .checkout-btn:hover {
    background-color: #45a049;
    transform: scale(1.02);
  }

  .checkout-btn:active {
    transform: scale(0.98);
  }

  .popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    animation: fadeIn 0.2s ease-in;
  }

  .popup {
    background: white;
    padding: 40px;
    border-radius: 16px;
    text-align: center;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    animation: slideIn 0.3s ease-out;
    min-width: 300px;
  }

  .popup-icon {
    font-size: 4rem;
    margin-bottom: 16px;
  }

  .popup h3 {
    margin: 0 0 12px 0;
    color: #4CAF50;
    font-size: 1.8rem;
  }

  .popup p {
    margin: 0;
    color: #666;
    font-size: 1.1rem;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(-30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>