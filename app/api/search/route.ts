import { NextResponse } from "next/server";
import { getProducts } from "@/lib/api";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("q")?.trim();

  if (!search || search.length < 2) {
    return NextResponse.json({ products: [] });
  }

  const { products } = await getProducts({
    search,
    inStock: true,
    limit: 6,
  });

  return NextResponse.json({ products });
}
