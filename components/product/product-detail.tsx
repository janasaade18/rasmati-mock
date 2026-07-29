"use client";

import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useCart } from "@/contexts/cart-context";
import { useWishlist } from "@/contexts/wishlist-context";
import { ProductGallery } from "./product-gallery";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth-context";
import { Eyebrow, Hairline } from "@/components/ui/primitives";
import { cn, discountPct, formatPrice } from "@/lib/utils";
import type { Product } from "@/lib/types";

export function ProductDetail({ product }: { product: Product }) {
  const { addItem, openCart, isInCart } = useCart();
  const { has, toggle } = useWishlist();
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const off = discountPct(product.price, product.compareAtPrice ?? undefined);
  const wished = has(product.id);
  const inCart = isInCart(product.id);

  function handleAdd() {
    if (!isAuthenticated) {
      router.push(`/account?next=${encodeURIComponent(`/products/${product.slug || product.id}`)}`);
      return;
    }
    addItem(product);
    toast(`${product.name} added to your wall`);
    openCart();
  }

  return (
    <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
      <ProductGallery images={product.images ?? []} name={product.name} />

      <div className="lg:pt-4">
        {product.categoryName && <Eyebrow className="mb-4">{product.categoryName}</Eyebrow>}
        <h1 className="font-display text-[clamp(1.8rem,3.5vw,2.8rem)] leading-[1.08] text-balance">
          {product.name}
        </h1>

        <div className="mt-5 flex items-center gap-3 text-lg">
          <span className="text-espresso">{formatPrice(product.price)}</span>
          {off && (
            <>
              <span className="text-muted line-through">
                {formatPrice(product.compareAtPrice as number)}
              </span>
              <span className="label-art text-[1rem] text-clay">
                {off}% off
              </span>
            </>
          )}
        </div>

        <Hairline className="my-8" />

        {product.description && (
          <p className="text-[0.92rem] leading-relaxed text-muted text-pretty">
            {product.description}
          </p>
        )}

        {product.dimensions && (
          <p className="mt-4 text-[0.82rem] text-muted">
            Dimensions: {product.dimensions.length}
            {product.dimensions.width ? ` × ${product.dimensions.width}` : ""}
            {product.dimensions.height ? ` × ${product.dimensions.height}` : ""}{" "}
            {product.dimensions.unit}
          </p>
        )}

        <div className="mt-9 flex flex-wrap items-center gap-4">
          {product.inStock ? (
            <>
              <Button
                onClick={handleAdd}
                disabled={inCart}
                className="flex-1 sm:flex-none sm:min-w-[14rem]"
              >
                {inCart ? "On Your Wall" : isAuthenticated ? "Add to Your Wall" : "Sign In to Add"}
              </Button>
            </>
          ) : (
            <Button disabled className="flex-1 sm:flex-none sm:min-w-[14rem]">
              Sold Out
            </Button>
          )}
          <button
            type="button"
            onClick={() => {
              toggle(product);
              toast(wished ? "Removed from wishlist" : "Saved to wishlist");
            }}
            aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
            className="grid size-12 shrink-0 place-items-center border border-line transition-colors hover:border-ink"
          >
            <Heart className={cn("size-[1.1rem]", wished && "fill-espresso text-espresso")} strokeWidth={1.4} />
          </button>
        </div>

        <Hairline className="my-8" />

        <ul className="flex flex-col gap-2.5 text-[0.8rem] text-muted">
          <li>Free insured shipping on every order</li>
          <li>Certificate of authenticity included</li>
          <li>Ships ready to hang</li>
        </ul>
      </div>
    </div>
  );
}
