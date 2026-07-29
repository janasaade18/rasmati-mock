"use client";

import { Toaster } from "sonner";
import { AuthProvider } from "@/contexts/auth-context";
import { CartProvider } from "@/contexts/cart-context";
import { WishlistProvider } from "@/contexts/wishlist-context";
import { CartDrawer } from "@/components/layout/cart-drawer";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <WishlistProvider>
        <CartProvider>
          {children}
          <CartDrawer />
          <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background:
                "radial-gradient(ellipse at 25% 15%, rgba(255,255,255,0.18), transparent 42%), linear-gradient(135deg, var(--color-greige) 0%, var(--color-greige-deep) 100%)",
              color: "var(--color-paper)",
              border: "1px solid color-mix(in srgb, var(--color-paper) 16%, transparent)",
              borderRadius: "28px 8px 24px 10px / 10px 24px 8px 28px",
              boxShadow:
                "inset 0 1px 1px rgba(255,255,255,0.13), inset 0 -4px 8px rgba(0,0,0,0.22), 0 12px 28px rgba(0,0,0,0.3)",
              fontFamily: "var(--font-body)",
              fontSize: "0.8rem",
              letterSpacing: "0.02em",
            },
          }}
          />
        </CartProvider>
      </WishlistProvider>
    </AuthProvider>
  );
}
