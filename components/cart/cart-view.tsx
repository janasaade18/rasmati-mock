"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { useCart } from "@/contexts/cart-context";
import { ImageFrame } from "@/components/ui/image-frame";
import { ButtonLink } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { formatPrice, primaryImage } from "@/lib/utils";

export function CartView() {
  const { items, removeItem, subtotal, itemCount } = useCart();

  if (items.length === 0) {
    return (
      <EmptyState
        eyebrow="Your Wall"
        title="Your wall is waiting"
        body="Original paintings, chosen one at a time. Begin with the collection."
        cta={{ label: "Shop the Collection", href: "/shop" }}
      />
    );
  }

  return (
    <div className="grid gap-12 lg:grid-cols-[1fr_22rem] lg:gap-16">
      <div className="flex flex-col divide-y divide-line-soft border-y border-line-soft">
        {items.map((item) => {
          return (
            <div key={item.id} className="flex gap-5 py-7">
              <Link href={`/products/${item.product.slug || item.product.id}`} className="w-24 shrink-0 sm:w-32">
                <ImageFrame
                  src={primaryImage(item.product.images)}
                  alt={item.product.name}
                  ratio="portrait"
                  sizes="128px"
                />
              </Link>
              <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex items-start justify-between gap-4">
                  <Link
                    href={`/products/${item.product.slug || item.product.id}`}
                    className="font-display text-lg leading-snug"
                  >
                    {item.product.name}
                  </Link>
                  <button
                    onClick={() => removeItem(item.id)}
                    aria-label="Remove item"
                    className="shrink-0 text-muted transition-colors hover:text-ink"
                  >
                    <X className="size-4" />
                  </button>
                </div>
                <span className="mt-1 text-sm text-espresso">
                  {formatPrice(item.product.price)}
                </span>

                <div className="mt-auto flex items-center justify-between pt-4">
                  <span className="text-[0.75rem] text-muted">One-of-one original</span>
                  <span className="font-display text-base">
                    {formatPrice(item.product.price)}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="h-fit border border-line p-7">
        <h2 className="font-display text-xl">Order Summary</h2>
        <div className="mt-6 flex items-center justify-between text-sm">
          <span className="text-muted">Subtotal ({itemCount} {itemCount === 1 ? "item" : "items"})</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <p className="mt-3 text-[0.75rem] text-muted">
          Shipping and any applicable taxes are calculated at checkout.
        </p>
        <ButtonLink href="/checkout" className="mt-7 w-full">
          Proceed to Checkout
        </ButtonLink>
        <ButtonLink href="/shop" variant="outline" className="mt-3 w-full">
          Continue Shopping
        </ButtonLink>
      </div>
    </div>
  );
}
