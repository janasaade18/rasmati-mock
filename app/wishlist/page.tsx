import type { Metadata } from "next";
import { PageIntro } from "@/components/ui/page-intro";
import { WishlistView } from "@/components/account/wishlist-view";

export const metadata: Metadata = {
  title: "Wishlist",
};

export default function WishlistPage() {
  return (
    <>
      <PageIntro
        eyebrow="Saved For Later"
        title="Your Wishlist"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Wishlist", href: "/wishlist" },
        ]}
      />
      <section className="container-luxe pb-24 lg:pb-32">
        <WishlistView />
      </section>
    </>
  );
}
