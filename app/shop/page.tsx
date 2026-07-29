import type { Metadata } from "next";
import { safe, getProducts } from "@/lib/api";
import { PageIntro } from "@/components/ui/page-intro";
import { EmptyState } from "@/components/ui/empty-state";
import { ProductGrid } from "@/components/products/product-grid";
import { ShopSort } from "@/components/shop/shop-sort";
import type { ProductsQuery } from "@/lib/api";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Original paintings from the Rasmati studio — considered color, honest composition, made to be lived with.",
};

export const revalidate = 60;

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const search = typeof sp.search === "string" ? sp.search : undefined;
  const sort = typeof sp.sort === "string" ? sp.sort : undefined;

  const query: ProductsQuery = { limit: 60, inStock: true };
  if (search) query.search = search;
  if (sort) query.sortBy = sort as ProductsQuery["sortBy"];

  const { products, pagination } = await safe(getProducts(query), {
    products: [],
    pagination: { page: 1, limit: 60, total: 0, totalPages: 0, hasMore: false },
  });

  return (
    <>
      <PageIntro
        eyebrow="The Collection"
        title="The Edit"
        intro={
          search
            ? `Results for "${search}"`
            : "Original paintings, considered one piece at a time."
        }
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Shop", href: "/shop" },
        ]}
      />

      <section className="container-luxe pb-24 lg:pb-32">
        {products.length > 0 ? (
          <>
            <div className="flex items-center justify-between border-b border-line-soft pb-5">
              <span className="label-art text-[1.05rem] text-muted">
                {pagination.total} {pagination.total === 1 ? "Piece" : "Pieces"}
              </span>
              <ShopSort />
            </div>
            <div className="pt-14 lg:pt-20">
              <ProductGrid products={products} priorityCount={4} />
            </div>
          </>
        ) : (
          <EmptyState
            eyebrow={search ? "No Matches" : "Arriving Soon"}
            title={search ? `Nothing found for "${search}"` : "The studio is preparing new work"}
            body={
              search
                ? "Try a different search, or explore the full collection."
                : "Paintings are being finished and photographed. Check back soon."
            }
            cta={{ label: "View All Paintings", href: "/shop" }}
          />
        )}
      </section>
    </>
  );
}
