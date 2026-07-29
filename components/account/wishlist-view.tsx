"use client";

import { useWishlist } from "@/contexts/wishlist-context";
import { ProductGrid } from "@/components/products/product-grid";
import { EmptyState } from "@/components/ui/empty-state";

export function WishlistView() {
  const { items } = useWishlist();

  if (items.length === 0) {
    return (
      <EmptyState
        eyebrow="Saved Pieces"
        title="Your wishlist is empty"
        body="Save the paintings you're considering — they'll wait for you here."
        cta={{ label: "Shop the Collection", href: "/shop" }}
      />
    );
  }

  return <ProductGrid products={items} cols={4} />;
}
