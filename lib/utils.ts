import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format a money amount with the store currency symbol. */
export function formatPrice(
  amount: number,
  symbol = "$",
  opts: { trailingZeros?: boolean } = {}
): string {
  const { trailingZeros = true } = opts;
  const value = Number.isFinite(amount) ? amount : 0;
  const formatted = value.toLocaleString("en-US", {
    minimumFractionDigits: trailingZeros ? 2 : 0,
    maximumFractionDigits: 2,
  });
  return `${symbol}${formatted}`;
}

/** Discount percentage between an original and current price. */
export function discountPct(price: number, compareAt?: number | null): number | null {
  if (!compareAt || compareAt <= price) return null;
  return Math.round(((compareAt - price) / compareAt) * 100);
}

/** Stable-ish session id for analytics / cart (client only). */
export function getSessionId(): string {
  if (typeof window === "undefined") return "ssr";
  const KEY = "rasmati_session_id";
  let id = window.localStorage.getItem(KEY);
  if (!id) {
    id = `sess_${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`;
    window.localStorage.setItem(KEY, id);
  }
  return id;
}

/** Human-readable date. */
export function formatDate(iso?: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

/** Title-case a slug or status string. */
export function titleCase(s: string): string {
  return s
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

/** First usable image for a product, or null. */
export function primaryImage(images?: string[] | null): string | null {
  if (!images || images.length === 0) return null;
  const img = images.find((i) => typeof i === "string" && i.trim().length > 0);
  return img ?? null;
}

/** Clamp a number. */
export function clamp(n: number, min: number, max: number): number {
  return Math.min(Math.max(n, min), max);
}
