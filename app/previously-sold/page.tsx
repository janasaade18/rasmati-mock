import type { Metadata } from "next";
import { getProducts, safe } from "@/lib/api";
import { PageIntro } from "@/components/ui/page-intro";
import { ProductGrid } from "@/components/products/product-grid";
import { EmptyState } from "@/components/ui/empty-state";

export const metadata: Metadata = {
  title: "Previously Sold",
  description: "A record of original Rasmati paintings that have found their walls.",
};

export const revalidate = 60;

export default async function PreviouslySoldPage() {
  const { products } = await safe(getProducts({ inStock: false, limit: 60 }), {
    products: [],
    pagination: { page: 1, limit: 60, total: 0, totalPages: 0, hasMore: false },
  });

  return (
    <>
      <PageIntro
        eyebrow="Collected Works"
        title="Previously Sold"
        intro="Original works that have found their walls. Each remains part of the studio record, never reproduced."
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Previously Sold", href: "/previously-sold" },
        ]}
      />
      <section className="container-luxe pb-24 lg:pb-32">
        {products.length > 0 ? (
          <ProductGrid products={products} priorityCount={4} />
        ) : (
          <EmptyState
            eyebrow="Studio Archive"
            title="The archive is just beginning"
            body="Sold paintings will be preserved here as they find their new walls."
            cta={{ label: "Explore Available Work", href: "/shop" }}
          />
        )}
      </section>
    </>
  );
}
