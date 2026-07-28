// lib/api.ts
import type { ProductsResponse, Product } from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "https://jimmywebsitebackend.vercel.app";

/**
 * Fetches a page of products from the backend.
 * `params` lets us filter later once we know how your paintings
 * are tagged (by category, brand, or collection).
 */
export async function getProducts(params?: {
  page?: number;
  limit?: number;
  category?: string;
  brand?: string;
}): Promise<ProductsResponse["data"]> {
  const query = new URLSearchParams();
  if (params?.page) query.set("page", String(params.page));
  if (params?.limit) query.set("limit", String(params.limit));
  if (params?.category) query.set("category", params.category);
  if (params?.brand) query.set("brand", params.brand);

  const res = await fetch(`${API_URL}/api/products?${query.toString()}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch products: ${res.status}`);
  }

  const json: ProductsResponse = await res.json();
  return json.data;
}

export async function getProduct(slug: string): Promise<Product | null> {
  const { products } = await getProducts({ limit: 100 });
  return products.find((p) => p.slug === slug) ?? null;
}