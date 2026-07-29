"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/contexts/cart-context";
import { API_URL } from "@/lib/api";
import { BRAND } from "@/lib/brand";
import { Button, ButtonLink } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { Hairline } from "@/components/ui/primitives";
import { ImageFrame } from "@/components/ui/image-frame";
import { formatPrice, primaryImage } from "@/lib/utils";

interface FormState {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  notes: string;
}

const EMPTY_FORM: FormState = {
  name: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  notes: "",
};

export function CheckoutFlow() {
  const { items, subtotal, itemCount, clearCart } = useCart();
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [placed, setPlaced] = useState<{ orderNumber?: string; manual: boolean } | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (items.length === 0 && !placed) {
    return (
      <EmptyState
        eyebrow="Your Wall"
        title="Your wall is waiting"
        body="Add a painting to your wall before checking out."
        cta={{ label: "Shop the Collection", href: "/shop" }}
      />
    );
  }

  if (placed) {
    return (
      <div className="mx-auto max-w-xl py-16 text-center">
        <h2 className="font-display text-3xl">Thank you{form.name ? `, ${form.name.split(" ")[0]}` : ""}.</h2>
        {placed.manual ? (
          <p className="mt-5 text-sm leading-relaxed text-muted">
            We&apos;ve prepared your order. Please confirm it over WhatsApp or
            email so we can arrange payment and shipping — a message window
            should have opened, or use{" "}
            <a href={`mailto:${BRAND.email}`} className="link-underline text-ink">
              {BRAND.email}
            </a>
            .
          </p>
        ) : (
          <p className="mt-5 text-sm leading-relaxed text-muted">
            Your order{placed.orderNumber ? ` ${placed.orderNumber}` : ""} has
            been received. We&apos;ll be in touch shortly to confirm shipping
            details.
          </p>
        )}
        <ButtonLink href="/shop" variant="outline" className="mt-9">
          Continue Shopping
        </ButtonLink>
      </div>
    );
  }

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function whatsAppFallback() {
    const lines = [
      `New order from ${form.name || "a customer"}`,
      "",
      ...items.map(
        (i) => `• ${i.product.name} — ${formatPrice(i.product.price)}`
      ),
      "",
      `Subtotal: ${formatPrice(subtotal)}`,
      "",
      `Phone: ${form.phone}`,
      form.email ? `Email: ${form.email}` : "",
      form.address ? `Address: ${form.address}, ${form.city}` : "",
      form.notes ? `Notes: ${form.notes}` : "",
    ].filter(Boolean);
    const text = encodeURIComponent(lines.join("\n"));
    const wa = BRAND.whatsApp.replace(/[^\d]/g, "");
    window.open(`https://wa.me/${wa}?text=${text}`, "_blank", "noopener,noreferrer");
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) {
      setError("Please provide your name and phone number.");
      return;
    }
    setSubmitting(true);
    setError(null);

    const payload = {
      customer: { name: form.name, phone: form.phone, email: form.email || undefined },
      items: items.map((i) => ({
        product_name: i.product.name,
        sku: i.product.sku ?? undefined,
                quantity: 1,
        unit_price: i.product.price,
                total: i.product.price,
      })),
      notes: [form.address && `Address: ${form.address}, ${form.city}`, form.notes]
        .filter(Boolean)
        .join(" — "),
    };

    try {
      const res = await fetch(`${API_URL}/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`Order endpoint returned ${res.status}`);
      const json = await res.json();
      clearCart();
      setPlaced({ orderNumber: json?.data?.order?.order_number, manual: false });
    } catch {
      // No confirmed order endpoint yet, or the request failed — fall back to
      // a pre-filled WhatsApp handoff so the sale isn't lost.
      whatsAppFallback();
      clearCart();
      setPlaced({ manual: true });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="grid gap-12 lg:grid-cols-[1fr_22rem] lg:gap-16">
      <form onSubmit={submit} className="flex flex-col gap-6">
        <div>
          <h2 className="eyebrow mb-5">Contact</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <input
              required
              placeholder="Full name"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              className="border border-line px-4 py-3.5 text-sm outline-none transition-colors focus:border-ink"
            />
            <input
              required
              type="tel"
              placeholder="Phone number"
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
              className="border border-line px-4 py-3.5 text-sm outline-none transition-colors focus:border-ink"
            />
            <input
              type="email"
              placeholder="Email (optional)"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              className="border border-line px-4 py-3.5 text-sm outline-none transition-colors focus:border-ink sm:col-span-2"
            />
          </div>
        </div>

        <div>
          <h2 className="eyebrow mb-5">Shipping</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <input
              placeholder="Address"
              value={form.address}
              onChange={(e) => update("address", e.target.value)}
              className="border border-line px-4 py-3.5 text-sm outline-none transition-colors focus:border-ink sm:col-span-2"
            />
            <input
              placeholder="City"
              value={form.city}
              onChange={(e) => update("city", e.target.value)}
              className="border border-line px-4 py-3.5 text-sm outline-none transition-colors focus:border-ink sm:col-span-2"
            />
          </div>
        </div>

        <div>
          <h2 className="eyebrow mb-5">Notes</h2>
          <textarea
            placeholder="Anything we should know? (optional)"
            value={form.notes}
            onChange={(e) => update("notes", e.target.value)}
            rows={3}
            className="w-full border border-line px-4 py-3.5 text-sm outline-none transition-colors focus:border-ink"
          />
        </div>

        {error && <p className="text-sm text-wine">{error}</p>}

        <Button type="submit" disabled={submitting} className="w-full">
          {submitting ? "Placing Order…" : `Place Order — ${formatPrice(subtotal)}`}
        </Button>
        <p className="text-center text-[0.72rem] text-muted">
          If our order system is unavailable, we&apos;ll open WhatsApp with your
          order pre-filled so we can confirm it directly.
        </p>
      </form>

      <div className="h-fit border border-line p-7">
        <h2 className="font-display text-xl">Order Summary</h2>
        <div className="mt-6 flex flex-col gap-4">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-4">
              <div className="w-14 shrink-0">
                <ImageFrame src={primaryImage(item.product.images)} alt={item.product.name} ratio="square" sizes="56px" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm">{item.product.name}</p>
                <p className="text-xs text-muted">One-of-one original</p>
              </div>
              <span className="shrink-0 text-sm">{formatPrice(item.product.price)}</span>
            </div>
          ))}
        </div>
        <Hairline className="my-6" />
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted">Subtotal ({itemCount})</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <div className="mt-2 flex items-center justify-between text-sm">
          <span className="text-muted">Shipping</span>
          <span className="text-espresso">Complimentary</span>
        </div>
        <Hairline className="my-6" />
        <div className="flex items-center justify-between font-display text-lg">
          <span>Total</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <Link href="/cart" className="link-underline label-art mt-6 block text-center text-[1rem] text-muted">
          Edit Your Wall
        </Link>
      </div>
    </div>
  );
}
