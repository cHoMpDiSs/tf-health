'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '@/data/products';
import { useToast } from '@/hooks/use-toast';

interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: number) => void;
  clearCart: () => void;
  itemCount: number;
  hasItem: (productId: number) => boolean;
}

const CartContext = createContext<CartContextType>({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  clearCart: () => {},
  itemCount: 0,
  hasItem: () => false,
});

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const { toast } = useToast();

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setItems(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const hasItem = (productId: number) => {
    return items.some(item => item.id === productId);
  };

  const addItem = (product: Product) => {
    setItems(currentItems => {
      if (currentItems.some(item => item.id === product.id)) {
        toast({
          title: "Item already in cart",
          description: "This item is already in your cart.",
          variant: "destructive",
        });
        return currentItems;
      }
      
      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart.`,
      });
      
      return [...currentItems, { ...product, quantity: 1 }];
    });
  };

  const removeItem = (productId: number) => {
    setItems(currentItems => currentItems.filter(item => item.id !== productId));
  };

  const clearCart = () => {
    setItems([]);
  };

  const itemCount = items.length; // Changed from quantity sum to just length

  return (
    <CartContext.Provider value={{
      items,
      addItem,
      removeItem,
      clearCart,
      itemCount,
      hasItem,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
} 