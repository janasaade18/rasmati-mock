"use client";

import { useEffect } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { useCart } from "@/contexts/cart-context";
import { ImageFrame } from "@/components/ui/image-frame";
import { ButtonLink } from "@/components/ui/button";
import { formatPrice, primaryImage } from "@/lib/utils";

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, subtotal, itemCount } =
    useCart();

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const freeShipThreshold = 200;
  const remaining = Math.max(0, freeShipThreshold - subtotal);

  return (
    <div
      className={`fixed inset-0 z-[90] ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`}
      aria-hidden={!isOpen}
    >
      <div
        className={`absolute inset-0 bg-shadow/40 backdrop-blur-sm transition-opacity duration-500 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={closeCart}
      />
      <aside
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-ivory transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-label="Your wall"
      >
        <div className="flex items-center justify-between border-b border-line px-6 py-5">
          <h2 className="font-display text-xl">
            Your Wall {itemCount > 0 && <span className="text-muted text-base">({itemCount})</span>}
          </h2>
          <button onClick={closeCart} aria-label="Close your wall" className="p-1">
            <X className="size-5" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-5 px-6 text-center">
            <p className="font-display text-2xl">Your wall is waiting</p>
            <p className="max-w-xs text-sm text-muted">
              Original paintings, chosen one at a time. Begin with the collection.
            </p>
            <ButtonLink href="/shop" onClick={closeCart} variant="outline">
              Explore the Collection
            </ButtonLink>
          </div>
        ) : (
          <>
            <div className="border-b border-line-soft px-6 py-3 text-center text-[0.72rem] tracking-wide text-muted">
              {remaining > 0 ? (
                <>
                  You&apos;re {formatPrice(remaining)} away from{" "}
                  <span className="text-ink">complimentary shipping</span>
                </>
              ) : (
                <span className="text-espresso">Your order qualifies for complimentary shipping</span>
              )}
            </div>

            <div className="flex-1 overflow-y-auto px-6 no-scrollbar">
              {items.map((item) => {
                return (
                  <div key={item.id} className="flex gap-4 border-b border-line-soft py-6">
                    <Link href={`/products/${item.product.slug || item.product.id}`} onClick={closeCart} className="w-20 shrink-0">
                      <ImageFrame
                        src={primaryImage(item.product.images)}
                        alt={item.product.name}
                        ratio="portrait"
                        sizes="80px"
                      />
                    </Link>
                    <div className="flex min-w-0 flex-1 flex-col">
                      <Link
                        href={`/products/${item.product.slug || item.product.id}`}
                        onClick={closeCart}
                        className="font-display text-base leading-snug"
                      >
                        {item.product.name}
                      </Link>
                      <span className="mt-1 text-sm text-espresso">
                        {formatPrice(item.product.price)}
                      </span>

                      <div className="mt-auto flex items-center justify-between pt-3">
                        <span className="text-[0.72rem] text-muted">One-of-one original</span>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="link-underline label-art text-[0.95rem] text-muted"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="border-t border-line px-6 py-6">
              <div className="flex items-center justify-between">
                <span className="eyebrow">Subtotal</span>
                <span className="font-display text-xl">{formatPrice(subtotal)}</span>
              </div>
              <p className="mt-2 text-[0.72rem] text-muted">
                Shipping calculated at checkout.
              </p>
              <div className="mt-5 flex flex-col gap-3">
                <ButtonLink href="/checkout" onClick={closeCart} className="w-full">
                  Checkout
                </ButtonLink>
                <ButtonLink href="/cart" onClick={closeCart} variant="outline" className="w-full">
                  View Your Wall
                </ButtonLink>
              </div>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
