import type { Metadata } from "next";
import { PageIntro } from "@/components/ui/page-intro";
import { CartView } from "@/components/cart/cart-view";

export const metadata: Metadata = {
  title: "Your Wall",
};

export default function CartPage() {
  return (
    <>
      <PageIntro
        eyebrow="Your Selection"
        title="Your Wall"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Your Wall", href: "/cart" },
        ]}
      />
      <section className="container-luxe pb-24 lg:pb-32">
        <CartView />
      </section>
    </>
  );
}
