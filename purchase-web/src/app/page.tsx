import { ProductGrid } from "@/features/purchases/components/ProductGrid";
import { Banner } from "@/shared/components/Banner";

interface HomePageProps {
  searchParams: Promise<{ q?: string | string[] }>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const { q } = await searchParams;
  const query = typeof q === "string" ? q.trim() : "";

  return (
    <main className="mx-auto max-w-6xl space-y-6 p-6">
      {query ? (
        <h1 className="text-xl font-semibold">Resultados para “{query}”</h1>
      ) : (
        <>
          <Banner
            title="Store Service"
            subtitle="Escolha um produto e acompanhe sua compra em tempo real."
          />
          <h2 className="text-xl font-semibold">Produtos</h2>
        </>
      )}
      <ProductGrid query={query} />
    </main>
  );
}