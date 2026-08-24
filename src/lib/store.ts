import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string; // product id
  name: string;
  price: number;
  quantity: number;
  image: string;
  slug: string;
}

interface CartStore {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cartItems: [],
      
      addToCart: (item) => {
        const { cartItems } = get();
        const existingItem = cartItems.find((i) => i.id === item.id);
        
        if (existingItem) {
          set({
            cartItems: cartItems.map((i) =>
              i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
            ),
          });
        } else {
          set({ cartItems: [...cartItems, item] });
        }
      },
      
      removeFromCart: (id) => {
        const { cartItems } = get();
        set({
          cartItems: cartItems.filter((i) => i.id !== id),
        });
      },
      
      updateQuantity: (id, quantity) => {
        const { cartItems } = get();
        if (quantity <= 0) {
          set({ cartItems: cartItems.filter((i) => i.id !== id) });
        } else {
          set({
            cartItems: cartItems.map((i) =>
              i.id === id ? { ...i, quantity } : i
            ),
          });
        }
      },
      
      clearCart: () => set({ cartItems: [] }),
      
      getTotalItems: () => {
        return get().cartItems.reduce((total, item) => total + item.quantity, 0);
      },
      
      getTotalPrice: () => {
        return get().cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
      },
    }),
    {
      name: 'jontroghor-cart',
    }
  )
);
