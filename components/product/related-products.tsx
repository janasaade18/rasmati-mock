import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/primitives";
import { ProductGrid } from "@/components/products/product-grid";
import type { Product } from "@/lib/types";

export function RelatedProducts({ products }: { products: Product[] }) {
  if (products.length === 0) return null;
  return (
    <section className="border-t border-line bg-porcelain">
      <div className="container-luxe section">
        <Reveal>
          <SectionHeading eyebrow="You May Also Like" title="More from the studio" />
        </Reveal>
        <div className="mt-14">
          <ProductGrid products={products} cols={4} />
        </div>
      </div>
    </section>
  );
}
