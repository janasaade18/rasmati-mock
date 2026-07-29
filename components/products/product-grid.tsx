import { ProductCard } from "./product-card";
import { cn } from "@/lib/utils";
import type { Product } from "@/lib/types";

export function ProductGrid({
  products,
  className,
  cols = 4,
  priorityCount = 0,
}: {
  products: Product[];
  className?: string;
  cols?: 2 | 3 | 4;
  priorityCount?: number;
}) {
  const colClass = {
    2: "grid-cols-2",
    3: "grid-cols-2 md:grid-cols-3",
    4: "grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
  }[cols];

  return (
    <div className={cn("grid gap-x-5 gap-y-12 md:gap-x-8 md:gap-y-16", colClass, className)}>
      {products.map((p, i) => (
        <ProductCard key={p.id} product={p} priority={i < priorityCount} />
      ))}
    </div>
  );
}
