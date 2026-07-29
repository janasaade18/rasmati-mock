import { getWebsiteCollection, safeProducts } from "@/lib/api";
import { Hero } from "@/components/home/hero";
import { FeaturedCollection } from "@/components/home/featured-collection";
import { Campaign } from "@/components/home/campaign";
import { ServicePromises } from "@/components/home/service-promises";

// Revalidate the homepage every 5 minutes.
export const revalidate = 300;

export default async function HomePage() {
  // Optional CMS hero banner — falls back to the bespoke brand image when the
  // "hero-banner" website-data collection hasn't been created yet.
  const [hero, commission] = await Promise.all([
    getWebsiteCollection("hero-banner"),
    getWebsiteCollection("comission-banner"),
  ]);
  const heroItem = hero?.items?.[0];
  const commissionItem = commission?.items?.[0];

  // Prefer featured; fall back to bestsellers, then newest. Never throws.
  let products = await safeProducts({ isFeatured: true, inStock: true }, 8);
  if (products.length === 0) products = await safeProducts({ isBestseller: true, inStock: true }, 8);
  if (products.length === 0) products = await safeProducts({ sortBy: "newest", inStock: true }, 8);

  return (
    <>
      <Hero
        image={heroItem?.url}
        alt={heroItem?.alt}
        title={heroItem?.metadata?.title}
      />
      <FeaturedCollection products={products} />
      <Campaign image={commissionItem?.url} alt={commissionItem?.alt} />
      <ServicePromises />
    </>
  );
}
