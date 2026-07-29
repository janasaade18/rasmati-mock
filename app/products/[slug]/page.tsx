import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug, getRelatedProducts } from "@/lib/api";
import { ProductDetail } from "@/components/product/product-detail";
import { RelatedProducts } from "@/components/product/related-products";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) {
    return {
      title: "Painting Unavailable",
      description: "This piece may have moved on. Explore the Rasmati collection.",
    };
  }
  return {
    title: product.name,
    description: product.description || `${product.name} — an original painting from Rasmati.`,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const related = await getRelatedProducts(product, 4);

  return (
    <>
      <div className="container-luxe pt-10 pb-20 lg:pt-16 lg:pb-28">
        <ProductDetail product={product} />
      </div>
      <RelatedProducts products={related} />
    </>
  );
}
