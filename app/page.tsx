import { getProducts } from "@/lib/api";

export default async function Home() {
  const { products, pagination } = await getProducts({ limit: 5 });

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Rasmati — live backend test</h1>
      <p className="mb-6 text-sm text-neutral-500">
        {pagination.total} total products in the backend, showing first {products.length}.
      </p>
      <ul className="space-y-3">
        {products.map((p) => (
          <li key={p.id} className="border-b pb-2">
            <strong>{p.name}</strong> — {p.price} {p.currency}
          </li>
        ))}
      </ul>
    </main>
  );
}