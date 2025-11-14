class CartStore {
  constructor() {
    this.cart = [];
    this.listeners = [];
  }

  addProduct(product) {
    this.cart.push(product);
    this.notifyListeners();
  }

  getCart() {
    return [...this.cart];
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notifyListeners() {
    this.listeners.forEach(listener => listener(this.getCart()));
  }
}

export const cartStore = new CartStore();