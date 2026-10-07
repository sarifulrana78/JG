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

export interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
  slug: string;
}

export interface ToastItem {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'warning' | 'error';
  actionLabel?: string;
  actionHref?: string;
}

export interface PlacedOrder {
  orderId: string;
  date: string;
  total: number;
  status: 'Processing' | 'Shipped' | 'Out for Delivery' | 'Delivered';
  paymentMethod: string;
  shippingAddress: string;
  items: CartItem[];
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

interface WishlistStore {
  wishlistItems: WishlistItem[];
  toggleWishlist: (item: WishlistItem) => void;
  isWishlisted: (id: string) => boolean;
  clearWishlist: () => void;
}

interface UIStore {
  activeModal: string | null;
  modalData?: any;
  openModal: (modal: string, data?: any) => void;
  closeModal: () => void;
  
  deliveryLocation: string;
  setDeliveryLocation: (location: string) => void;

  activeCategory: string;
  setActiveCategory: (cat: string) => void;

  searchQuery: string;
  setSearchQuery: (q: string) => void;

  toasts: ToastItem[];
  addToast: (toast: Omit<ToastItem, 'id'>) => void;
  removeToast: (id: string) => void;

  recentOrders: PlacedOrder[];
  addOrder: (order: PlacedOrder) => void;
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

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      wishlistItems: [],

      toggleWishlist: (item) => {
        const { wishlistItems } = get();
        const exists = wishlistItems.find((i) => i.id === item.id);
        if (exists) {
          set({ wishlistItems: wishlistItems.filter((i) => i.id !== item.id) });
        } else {
          set({ wishlistItems: [...wishlistItems, item] });
        }
      },

      isWishlisted: (id) => {
        return get().wishlistItems.some((i) => i.id === id);
      },

      clearWishlist: () => set({ wishlistItems: [] }),
    }),
    {
      name: 'jontroghor-wishlist',
    }
  )
);

export const useUIStore = create<UIStore>()(
  persist(
    (set, get) => ({
      activeModal: null,
      modalData: null,
      openModal: (modal, data = null) => set({ activeModal: modal, modalData: data }),
      closeModal: () => set({ activeModal: null, modalData: null }),

      deliveryLocation: 'Dhaka, Bangladesh',
      setDeliveryLocation: (location) => set({ deliveryLocation: location }),

      activeCategory: 'all',
      setActiveCategory: (cat) => set({ activeCategory: cat }),

      searchQuery: '',
      setSearchQuery: (q) => set({ searchQuery: q }),

      toasts: [],
      addToast: (toast) => {
        const id = Math.random().toString(36).substring(2, 9);
        const newToast = { ...toast, id };
        set((state) => ({ toasts: [...state.toasts, newToast] }));
        setTimeout(() => {
          get().removeToast(id);
        }, 4000);
      },
      removeToast: (id) => {
        set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
      },

      recentOrders: [
        {
          orderId: 'JG-849201',
          date: 'Yesterday, 3:45 PM',
          total: 129.99,
          status: 'Shipped',
          paymentMethod: 'bKash',
          shippingAddress: 'House 14, Road 5, Dhanmondi, Dhaka',
          items: [
            {
              id: 'sample-1',
              name: 'Pro Wireless Gaming Mouse',
              price: 129.99,
              quantity: 1,
              image: 'https://images.unsplash.com/photo-1527219525722-f9767a7af8c8?w=500&q=80',
              slug: 'pro-wireless-gaming-mouse',
            },
          ],
        },
      ],
      addOrder: (order) => {
        set((state) => ({ recentOrders: [order, ...state.recentOrders] }));
      },
    }),
    {
      name: 'jontroghor-ui-storage',
      partialize: (state) => ({
        deliveryLocation: state.deliveryLocation,
        recentOrders: state.recentOrders,
      }),
    }
  )
);
