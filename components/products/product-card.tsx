"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Heart } from "lucide-react";
import { useCart } from "@/contexts/cart-context";
import { useWishlist } from "@/contexts/wishlist-context";
import { ImageFrame } from "@/components/ui/image-frame";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth-context";
import { cn, formatPrice, discountPct, primaryImage } from "@/lib/utils";
import type { Product } from "@/lib/types";
import { toast } from "sonner";

export function ProductCard({
  product,
  priority = false,
  className,
}: {
  product: Product;
  priority?: boolean;
  className?: string;
}) {
  const { addItem, isInCart } = useCart();
  const { has, toggle } = useWishlist();
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const img = primaryImage(product.images);
  const hoverImg = product.images?.[1];
  const off = discountPct(product.price, product.compareAtPrice ?? undefined);
  const wished = has(product.id);
  const inCart = isInCart(product.id);

  return (
    <article className={cn("group relative flex flex-col", className)}>
      <div className="relative">
        <Link
          href={`/products/${product.slug || product.id}`}
          className="relative block"
          aria-label={product.name}
        >
          <div className="relative aspect-[5/4] overflow-hidden rounded-2xl bg-greige">
          <div
            className={cn(
              "absolute inset-0 transition-opacity duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
              hoverImg && "group-hover:opacity-0"
            )}
          >
            <ImageFrame
              src={img}
              alt={product.name}
              ratio="auto"
              className="h-full"
              fit="cover"
              zoom={!hoverImg}
              priority={priority}
              sizes="(max-width:768px) 50vw, 25vw"
            />
          </div>
          {hoverImg && (
            <div className="absolute inset-0 opacity-0 transition-opacity duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-100">
              <ImageFrame
                src={hoverImg}
                alt={`${product.name} alternate view`}
                ratio="auto"
                className="h-full"
                fit="cover"
                sizes="(max-width:768px) 50vw, 25vw"
              />
            </div>
          )}

          <div className="absolute left-0 top-0 flex flex-col gap-1.5 p-3.5">
            {off && (
              <span className="label-art rounded-full bg-ivory/85 px-2.5 py-1 text-[0.9rem] text-clay">
                Sale
              </span>
            )}
            {!product.inStock && (
              <span className="label-art rounded-full bg-ivory/85 px-2.5 py-1 text-[0.9rem] text-muted">
                Sold Out
              </span>
            )}
          </div>

          </div>
        </Link>

        {product.inStock && !inCart && (
          <div className="pointer-events-none absolute inset-0 hidden place-items-center opacity-0 transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-100 lg:grid">
            <Button
              type="button"
              onClick={() => {
                if (!isAuthenticated) {
                  router.push(`/account?next=${encodeURIComponent(pathname)}`);
                  return;
                }
                addItem(product);
                toast(`${product.name} added to your wall`);
              }}
              className="pointer-events-auto shadow-xl"
            >
              {isAuthenticated ? "Add to Your Wall" : "Sign In to Add"}
            </Button>
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={() => {
          toggle(product);
          toast(wished ? "Removed from wishlist" : "Saved to wishlist");
        }}
        aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
        className="absolute right-3.5 top-3.5 text-ink/60 opacity-0 transition-all duration-500 hover:text-ink group-hover:opacity-100 focus-visible:opacity-100"
      >
        <Heart className={cn("size-[1.05rem]", wished && "fill-espresso text-espresso")} strokeWidth={1.4} />
      </button>

      <div className="mt-5 flex flex-col items-center text-center">
        {product.categoryName && (
          <span className="eyebrow mb-2 text-[0.95rem]">{product.categoryName}</span>
        )}
        <Link href={`/products/${product.slug || product.id}`}>
          <h3 className="font-display text-[1.1rem] leading-snug text-ink">
            {product.name}
          </h3>
        </Link>
        <div className="mt-2.5 flex items-center gap-2.5 text-[0.82rem]">
          <span className="text-espresso">{formatPrice(product.price)}</span>
          {off && (
            <span className="text-muted line-through">
              {formatPrice(product.compareAtPrice as number)}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
