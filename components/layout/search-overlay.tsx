"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { formatPrice, primaryImage } from "@/lib/utils";
import { ImageFrame } from "@/components/ui/image-frame";
import { Spinner } from "@/components/ui/primitives";
import type { Product } from "@/lib/types";

export function SearchOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<Product[] | null>(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 60);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      // Reset the overlay's local state on close so it starts fresh next
      // time it's opened — a one-shot reset tied to the `open` transition,
      // not a subscription to external state.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setQuery("");
      setProducts(null);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (query.trim().length < 2) {
      // Clear stale results once the query shrinks below the search
      // threshold — a direct consequence of `query` changing, not a
      // subscription to an external store.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setProducts(null);
      return;
    }
    setLoading(true);
    const id = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query.trim())}`);
        const json = (await res.json()) as { products?: Product[] };
        setProducts(json.products ?? []);
      } catch {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }, 280);
    return () => clearTimeout(id);
  }, [query]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/shop?search=${encodeURIComponent(query.trim())}`);
      onClose();
    }
  }

  return (
    <div
      className={`fixed inset-0 z-[70] transition-opacity duration-500 ${
        open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      }`}
      aria-hidden={!open}
    >
      <div className="absolute inset-0 bg-shadow/75 backdrop-blur-md" onClick={onClose} />
      <div
        className={`relative mx-auto mt-[max(5rem,10vh)] w-[calc(100%-2rem)] max-w-5xl overflow-hidden rounded-[2.5rem_0.75rem_2rem_1rem] border border-paper/15 bg-porcelain shadow-[0_24px_70px_rgba(0,0,0,0.45)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          open ? "translate-y-0 opacity-100" : "-translate-y-6 opacity-0"
        }`}
      >
        <div className="px-6 py-7 sm:px-10 sm:py-9">
          <div className="flex items-center justify-between gap-4">
            <span className="eyebrow">Search</span>
            <button onClick={onClose} aria-label="Close search" className="p-1">
              <X className="size-5" />
            </button>
          </div>

          <form onSubmit={submit} className="mt-7 flex items-center gap-4 rounded-2xl border border-paper/20 bg-shadow/35 px-5 py-4">
            <Search className="size-5 text-muted" />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="What are you looking for?"
              className="w-full bg-transparent font-display text-[clamp(1.4rem,4vw,2.4rem)] outline-none placeholder:text-muted"
            />
            {loading && <Spinner className="text-muted" />}
          </form>

          {products && (
            <div className="mt-8 max-h-[55vh] overflow-y-auto no-scrollbar pb-8">
              {products.length === 0 ? (
                <p className="py-10 text-center text-sm text-muted">
                  No results for &ldquo;{query.trim()}&rdquo;. Explore the full collection instead.
                </p>
              ) : (
                <>
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="eyebrow">Pieces</span>
                    <Link
                      href={`/shop?search=${encodeURIComponent(query.trim())}`}
                      onClick={onClose}
                      className="link-underline label-art text-[1rem] text-muted"
                    >
                      View all results
                    </Link>
                  </div>
                  <div className="mt-4 grid gap-x-6 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
                    {products.map((p) => (
                      <Link
                        key={p.id}
                        href={`/products/${p.slug || p.id}`}
                        onClick={onClose}
                        className="group flex items-center gap-4"
                      >
                        <ImageFrame
                          src={primaryImage(p.images)}
                          alt={p.name}
                          ratio="square"
                          className="w-16 shrink-0"
                          sizes="64px"
                        />
                        <div className="min-w-0">
                          <p className="truncate font-display text-base">{p.name}</p>
                          <p className="mt-1 text-sm text-espresso">
                            {formatPrice(p.price)}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
