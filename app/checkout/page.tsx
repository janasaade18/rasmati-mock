import type { Metadata } from "next";
import { PageIntro } from "@/components/ui/page-intro";
import { CheckoutFlow } from "@/components/checkout/checkout-flow";

export const metadata: Metadata = {
  title: "Checkout",
};

export default function CheckoutPage() {
  return (
    <>
      <PageIntro
        eyebrow="Almost There"
        title="Checkout"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Your Wall", href: "/cart" },
          { label: "Checkout", href: "/checkout" },
        ]}
      />
      <section className="container-luxe pb-24 lg:pb-32">
        <CheckoutFlow />
      </section>
    </>
  );
}
