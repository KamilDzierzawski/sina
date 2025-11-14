export interface Product {
  id: number;
  name: string;
  price: number;
}

type CartListener = (cart: Product[]) => void;

class CartStore {
  private cart: Product[] = [];
  private listeners: CartListener[] = [];

  addProduct(product: Product) {
    this.cart.push(product);
    this.notifyListeners();
  }

  getCart() {
    return [...this.cart];
  }

  subscribe(listener: CartListener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notifyListeners() {
    this.listeners.forEach(listener => listener(this.getCart()));
  }
}

export const cartStore = new CartStore();