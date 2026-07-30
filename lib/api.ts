// lib/api.ts
//
// The Rasmati storefront's bridge to the live websitebackend.
//
// IMPORTANT: there is no writable product catalog for this store yet — the
// backend's real `/api/products` table only contains unrelated seed/test
// data (totes, a gift card) because products can't currently be POSTed to
// it. The actual paintings live as a CMS "website-data" collection instead
// (`GET /api/v1/website-data/paintings`), uploaded directly through the
// backend's media tooling. So every product-facing function below is backed
// by that collection, adapted into the app's existing `Product` shape —
// every other component (cards, grids, cart, wishlist, product detail)
// keeps working unmodified.
//
// Confirmed endpoints against the real backend:
//   - GET /api/v1/website-data/:slug  (CMS collections — hero banners, the
//                                      "paintings" catalog, etc.)
//   - GET /api/products               (real backend catalog — NOT used for
//                                      storefront products right now; see
//                                      above. Kept only as `getBackendProducts`
//                                      in case it's ever repurposed.)
//
// Everything here degrades gracefully: `safe()` swallows failures so pages
// never crash just because the backend has no data yet.

import type { Product, ProductsResponse } from "./types";

const API_URL = (
  process.env.NEXT_PUBLIC_API_URL ?? "https://jimmywebsitebackend.vercel.app"
).replace(/\/$/, "");

export { API_URL };

/* ============================================================
   CMS website-data collections
   ============================================================ */

export interface PaintingItem {
  id: string;
  url: string;
  type: string;
  order: number;
  alt?: string;
  metadata?: {
    title?: string;
    price?: number;
    currency?: string;
    medium?: string;
    dimensions?: string;
    available?: boolean;
  };
}

export interface WebsiteCollection {
  name: string;
  slug: string;
  items: PaintingItem[];
  updatedAt?: string;
}

export interface AboutPageContent {
  sections?: { id: string; enabled: boolean }[];
  heroTitle?: string;
  heroSubtitle?: string;
  heroBackgroundImage?: string;
  storyTitle?: string;
  storyContent?: string;
  visionTitle?: string;
  visionContent?: string;
  missionTitle?: string;
  missionContent?: string;
  coreValuesTitle?: string;
  coreValues?: { title?: string; content?: string; description?: string }[];
  promiseTitle?: string;
  promiseContent?: string;
}

export interface SiteSettings {
  staticPages?: {
    about?: AboutPageContent;
  };
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  try {
    const res = await fetch(`${API_URL}/api/v1/settings`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data as SiteSettings;
  } catch {
    return null;
  }
}

export async function getWebsiteCollection(slug: string): Promise<WebsiteCollection | null> {
  try {
    const res = await fetch(`${API_URL}/api/v1/website-data/${slug}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data as WebsiteCollection;
  } catch {
    return null;
  }
}

/* ============================================================
   Paintings -> Product adapter
   ============================================================
   The "paintings" collection is the real product source. Each item is
   mapped into the app's existing `Product` interface so nothing downstream
   needs to know the data actually comes from a CMS collection, not a
   product table.
*/

const seenSlugs = new Set<string>();

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/** Turn "60 x 80 cm" into { length: 60, width: 80, height: null, unit: "cm" }. */
function parseDimensions(raw?: string): Product["dimensions"] {
  if (!raw) return null;
  const match = raw.match(/([\d.]+)\s*x\s*([\d.]+)\s*(\w+)?/i);
  if (!match) return null;
  const [, l, w, unit] = match;
  return {
    length: Number(l),
    width: Number(w),
    height: null,
    unit: unit ?? "cm",
  };
}

function paintingToProduct(item: PaintingItem, index: number, total: number): Product {
  const title = item.metadata?.title?.trim() || `Untitled Painting ${index + 1}`;

  // Ensure unique, stable slugs even if two pieces share a title.
  let slug = slugify(title);
  if (seenSlugs.has(slug)) slug = `${slug}-${item.id.slice(-6)}`;
  seenSlugs.add(slug);

  const medium = item.metadata?.medium?.trim() || null;

  return {
    id: item.id,
    name: title,
    sku: null,
    slug,
    price: item.metadata?.price ?? 0,
    compareAtPrice: null,
    currency: item.metadata?.currency || "USD",
    inStock: item.metadata?.available ?? true,
    // Original, one-of-one paintings: exactly one unit exists per piece.
    stockQuantity: item.metadata?.available === false ? 0 : 1,
    images: [item.url],
    category: medium ? slugify(medium) : null,
    categoryName: medium,
    description: item.alt?.trim() || "",
    brand: null,
    brandName: null,
    collection: "paintings",
    collectionName: "Paintings",
    color: null,
    specifications: {},
    dimensions: parseDimensions(item.metadata?.dimensions),
    // Feature the first handful (by curated `order`) on the homepage.
    isFeatured: index < 4,
    isBestseller: index >= 4 && index < total,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

let paintingsCache: Promise<Product[]> | null = null;

/** Fetch + adapt the full "paintings" CMS collection into `Product[]`, sorted by curated order. Cached per server-process tick (Next's fetch cache still governs actual revalidation). */
async function getAllPaintingProducts(): Promise<Product[]> {
  if (paintingsCache) return paintingsCache;
  paintingsCache = (async () => {
    const collection = await getWebsiteCollection("paintings");
    const items = (collection?.items ?? [])
      .filter((i) => i.type === "image" && i.url)
      .sort((a, b) => a.order - b.order);
    seenSlugs.clear();
    const products = items.map((item, i) => paintingToProduct(item, i, items.length));
    // Reset the cache shortly after so new uploads to the CMS collection
    // eventually show up without a full redeploy.
    setTimeout(() => {
      paintingsCache = null;
    }, 60_000);
    return products;
  })();
  return paintingsCache;
}

/* ============================================================
   Products (public API — signatures preserved for existing call sites)
   ============================================================ */

export interface ProductsQuery {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  collection?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  isFeatured?: boolean;
  isBestseller?: boolean;
  sortBy?:
    | "newest"
    | "oldest"
    | "price_asc"
    | "price_desc"
    | "name_asc"
    | "name_desc";
}

export interface ProductsPage {
  products: Product[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasMore: boolean;
  };
}

/**
 * Product listing, backed by the "paintings" CMS collection (see module
 * header). Filtering, sorting, and pagination all happen in-memory since the
 * collection is small and fetched in one shot.
 */
export async function getProducts(params: ProductsQuery = {}): Promise<ProductsPage> {
  let products = await getAllPaintingProducts();

  if (params.search) {
    const q = params.search.toLowerCase();
    products = products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        (p.categoryName ?? "").toLowerCase().includes(q)
    );
  }
  if (params.category) {
    products = products.filter((p) => p.category === params.category);
  }
  if (params.collection) {
    products = products.filter((p) => p.collection === params.collection);
  }
  if (typeof params.minPrice === "number") {
    products = products.filter((p) => p.price >= params.minPrice!);
  }
  if (typeof params.maxPrice === "number") {
    products = products.filter((p) => p.price <= params.maxPrice!);
  }
  if (typeof params.inStock === "boolean") {
    products = products.filter((p) => p.inStock === params.inStock);
  }
  if (params.isFeatured) {
    products = products.filter((p) => p.isFeatured);
  }
  if (params.isBestseller) {
    products = products.filter((p) => p.isBestseller);
  }

  switch (params.sortBy) {
    case "price_asc":
      products = [...products].sort((a, b) => a.price - b.price);
      break;
    case "price_desc":
      products = [...products].sort((a, b) => b.price - a.price);
      break;
    case "name_asc":
      products = [...products].sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "name_desc":
      products = [...products].sort((a, b) => b.name.localeCompare(a.name));
      break;
    case "oldest":
      products = [...products].reverse();
      break;
    case "newest":
    default:
      // Already in curated `order`.
      break;
  }

  const page = params.page ?? 1;
  const limit = params.limit ?? 20;
  const total = products.length;
  const start = (page - 1) * limit;
  const pageProducts = products.slice(start, start + limit);

  return {
    products: pageProducts,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.max(1, Math.ceil(total / limit)),
      hasMore: start + limit < total,
    },
  };
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const decoded = decodeURIComponent(slug);
    const products = await getAllPaintingProducts();
    return products.find((p) => p.slug === decoded || p.id === decoded) ?? null;
  } catch {
    return null;
  }
}

/** Related paintings: same medium first, then any others, excluding the current piece. */
export async function getRelatedProducts(product: Product, limit = 4): Promise<Product[]> {
  try {
    const products = await getAllPaintingProducts();
    const others = products.filter((p) => p.id !== product.id && p.inStock);
    const sameMedium = others.filter((p) => p.category === product.category);
    const rest = others.filter((p) => p.category !== product.category);
    return [...sameMedium, ...rest].slice(0, limit);
  } catch {
    return [];
  }
}

/**
 * Run an API call but never throw — returns `fallback` on any failure.
 * Used by editorial pages so the experience stands on its own when the
 * backend has no data yet or is temporarily unreachable.
 */
export async function safe<T>(promise: Promise<T>, fallback: T): Promise<T> {
  try {
    return await promise;
  } catch {
    return fallback;
  }
}

/** Convenience: fetch up to `limit` products for the homepage / featured rails, never throws. */
export async function safeProducts(params: ProductsQuery = {}, limit = 8): Promise<Product[]> {
  const res = await safe(getProducts({ ...params, limit }), {
    products: [] as Product[],
    pagination: { page: 1, limit, total: 0, totalPages: 0, hasMore: false },
  });
  return res.products ?? [];
}

/* ============================================================
   Real backend product table (NOT the storefront's product source)
   ============================================================
   Kept only for reference / possible future use once real products can be
   POSTed to the backend. Currently returns unrelated seed data (totes, a
   gift card) — do not use this for rendering the storefront catalog.
*/
export async function getBackendProducts(
  params: ProductsQuery = {}
): Promise<ProductsResponse["data"]> {
  const sp = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v === undefined || v === null || v === "") continue;
    sp.set(k, String(v));
  }
  const qsStr = sp.toString();
  const res = await fetch(`${API_URL}/api/products${qsStr ? `?${qsStr}` : ""}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    throw new Error(`Failed to load products (${res.status})`);
  }
  const json = (await res.json()) as ProductsResponse;
  return json.data;
}


export interface CreateOrderPayload {
  customer: { name: string; phone: string };
  items: { product_name: string; quantity: number; unit_price: number; output_item_id: string }[];
  delivery_method: "delivery";
  payment_method: "cod";
  notes?: string;
}

export interface CreateOrderResponse {
  success: boolean;
  data: {
    orderNumber: string;
    accessToken: string;
    [key: string]: unknown;
  };
}

export async function createOrder(payload: CreateOrderPayload): Promise<CreateOrderResponse> {
  const res = await fetch(`${API_URL}/api/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Failed to create order: ${res.status}`);
  return res.json();
}

export async function trackOrder(orderNumber: string) {
  const res = await fetch(`${API_URL}/api/orders?order_number=${encodeURIComponent(orderNumber)}`, {
    cache: "no-store",
  });
  if (!res.ok) return null;
  return res.json();
}