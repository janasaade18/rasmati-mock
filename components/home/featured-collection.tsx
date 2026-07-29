import Link from "next/link";
import { ImageFrame } from "@/components/ui/image-frame";
import { ProductCard } from "@/components/products/product-card";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/primitives";
import { ButtonLink } from "@/components/ui/button";
import { FALLBACK_COLLECTIONS } from "@/lib/brand";
import type { Product } from "@/lib/types";

export function FeaturedCollection({ products }: { products: Product[] }) {
  const hasProducts = products.length > 0;

  return (
    <section className="bg-ivory">
      <div className="container-luxe section">
        <Reveal>
          <SectionHeading
            eyebrow={hasProducts ? "The Signature Edit" : "Arriving Soon"}
            title={hasProducts ? "Quietly considered. Made to be lived with." : "The first collection"}
            intro={
              hasProducts
                ? "A tightly edited selection of the pieces our collectors reach for again and again."
                : "Our debut paintings are being finished in the studio. Check back soon for the first edit."
            }
          />
        </Reveal>

        {hasProducts ? (
          <>
            <div className="mt-16 grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-8">
              {products.slice(0, 8).map((p, i) => (
                <Reveal key={p.id} delay={(i % 4) * 80}>
                  <ProductCard product={p} priority={i < 4} />
                </Reveal>
              ))}
            </div>
            <div className="mt-16 flex justify-center">
              <ButtonLink href="/shop" variant="outline">
                View the Full Collection
              </ButtonLink>
            </div>
          </>
        ) : (
          <>
            <div className="mt-16 grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4 lg:gap-x-8">
              {FALLBACK_COLLECTIONS.map((c, i) => (
                <Reveal key={c.slug} delay={i * 80}>
                  <Link href="/shop" className="group block">
                    <div className="overflow-hidden rounded-2xl">
                      <ImageFrame
                        src={c.image}
                        alt={c.name}
                        ratio="portrait"
                        zoom
                        sizes="(max-width:1024px) 50vw, 25vw"
                      />
                    </div>
                    <h3 className="mt-5 text-center font-display text-xl">{c.name}</h3>
                    <p className="mt-1.5 text-center text-sm text-muted">{c.description}</p>
                  </Link>
                </Reveal>
              ))}
            </div>
            <div className="mt-16 flex justify-center">
              <ButtonLink href="/shop" variant="outline">
                Explore the Edit
              </ButtonLink>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
