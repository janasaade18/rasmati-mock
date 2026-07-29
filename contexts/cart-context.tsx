"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { CartItem, Product } from "@/lib/types";
import { AUTH_SIGNED_OUT_EVENT, useAuth } from "@/contexts/auth-context";

const CART_KEY = "rasmati_cart";

function oneOfEach(items: CartItem[]) {
  const unique = new Map<string, CartItem>();
  for (const item of items) {
    if (!unique.has(item.id)) unique.set(item.id, { ...item, quantity: 1 });
  }
  return [...unique.values()];
}

interface CartContextValue {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (product: Product) => void;
  removeItem: (lineId: string) => void;
  clearCart: () => void;
  isInCart: (productId: string) => boolean;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(CART_KEY);
      // One-time hydration from localStorage on mount — safe despite the
      // set-state-in-effect rule, since this can't run during SSR (no
      // `window`) and only ever fires once per mount.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (raw) setItems(oneOfEach(JSON.parse(raw) as CartItem[]));
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(CART_KEY, JSON.stringify(items));
    } catch {
      /* ignore */
    }
  }, [items, hydrated]);

  useEffect(() => {
    const clearWall = () => setItems([]);
    window.addEventListener(AUTH_SIGNED_OUT_EVENT, clearWall);
    return () => window.removeEventListener(AUTH_SIGNED_OUT_EVENT, clearWall);
  }, []);

  const addItem = useCallback((product: Product) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) return prev;
      return [
        ...prev,
        { id: product.id, product, quantity: 1, addedAt: new Date().toISOString() },
      ];
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const value = useMemo<CartContextValue>(() => {
    const visibleItems = isAuthenticated ? items : [];
    const itemCount = visibleItems.length;
    const subtotal = visibleItems.reduce((s, i) => s + i.product.price, 0);
    return {
      items: visibleItems,
      itemCount,
      subtotal,
      isOpen,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      addItem,
      removeItem,
      clearCart,
      isInCart: (productId: string) => visibleItems.some((i) => i.product.id === productId),
    };
  }, [items, isAuthenticated, isOpen, addItem, removeItem, clearCart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
