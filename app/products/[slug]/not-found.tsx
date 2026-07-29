import type { Metadata } from "next";
import { EmptyState } from "@/components/ui/empty-state";

export const metadata: Metadata = {
  title: "Painting Unavailable",
};

export default function ProductNotFound() {
  return (
    <div className="container-luxe">
      <EmptyState
        eyebrow="Not Found"
        title="This piece has found a new home"
        body="The painting you're looking for may have sold or moved. Explore the current collection instead."
        cta={{ label: "Shop the Collection", href: "/shop" }}
      />
    </div>
  );
}
