const products = [
  { id: 1, name: 'Laptop', price: 2500 },
  { id: 2, name: 'Mysz', price: 50 },
  { id: 3, name: 'Klawiatura', price: 150 },
  { id: 4, name: 'Monitor', price: 800 },
];

/**
 * Factory zgodna z WrapperReactSvelte — zwraca (targetDiv) => { render, destroy }
 * Renderuje DOM bez JSX/React, żeby ominąć błąd plugin-react.
 */
export default function ProductListForSvelteFactory() {
  return (targetDiv) => {
    const root = document.createElement('div');
    root.className = 'mf-products-root';
    root.style.padding = '20px';
    root.style.border = '2px solid #333';
    root.style.borderRadius = '8px';
    root.style.backgroundColor = '#f9f9f9';
    targetDiv.appendChild(root);

    const handlers = [];
    let cartStoreInstance = null;

    async function loadCartStore() {
      // Import from exposed cartStore to ensure singleton
      const { cartStore } = await import('./../../store/index.jsx');
      cartStoreInstance = cartStore;
    }

    function render() {
      // Load cartStore before rendering
      if (!cartStoreInstance) {
        loadCartStore().then(() => renderContent());
      } else {
        renderContent();
      }
    }

    function renderContent() {
      root.innerHTML = '';
      const title = document.createElement('h2');
      title.textContent = '📦 Lista Produktów (App4 - DOM renderer)';
      title.style.color = '#333';
      root.appendChild(title);

      const ul = document.createElement('ul');
      ul.style.listStyle = 'none';
      ul.style.padding = '0';
      root.appendChild(ul);

      products.forEach((product) => {
        const li = document.createElement('li');
        li.style.display = 'flex';
        li.style.justifyContent = 'space-between';
        li.style.alignItems = 'center';
        li.style.padding = '10px';
        li.style.margin = '5px 0';
        li.style.backgroundColor = 'white';
        li.style.borderRadius = '5px';
        li.style.border = '1px solid #ddd';

        const span = document.createElement('span');
        span.innerHTML = `<strong>${product.name}</strong> - ${product.price} PLN`;

        const btn = document.createElement('button');
        btn.textContent = 'Dodaj do koszyka';
        btn.style.padding = '8px 16px';
        btn.style.backgroundColor = '#4CAF50';
        btn.style.color = 'white';
        btn.style.border = 'none';
        btn.style.borderRadius = '4px';
        btn.style.cursor = 'pointer';
        btn.style.fontWeight = 'bold';
        btn.onclick = () => {
          if (cartStoreInstance) {
            console.log('[ProductList] Adding to cart:', product);
            cartStoreInstance.addProduct(product);
          } else {
            console.error('[ProductList] cartStore not loaded yet');
          }
        };

        li.appendChild(span);
        li.appendChild(btn);
        ul.appendChild(li);

        handlers.push(() => (btn.onclick = null));
      });
    }

    function destroy() {
      handlers.forEach((h) => h());
      if (root.parentNode) {
        root.parentNode.removeChild(root);
      }
    }

    return {
      render: () => render(),
      destroy,
    };
  };
}

// import wrapper from '../../WrapperForSvelte.js';
// import { ProductList } from './ProductList.jsx';

// export default wrapper(ProductList);