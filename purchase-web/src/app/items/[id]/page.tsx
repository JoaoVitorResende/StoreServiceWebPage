"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { BuyBox } from "@/features/purchases/components/BuyBox";
import { StockLabel } from "@/features/purchases/components/ProductCard";
import { getItem } from "@/features/purchases/services/purchaseService";
import type { CatalogItem } from "@/features/purchases/types";
import { ErrorMessage } from "@/shared/components/ErrorMessage";
import { formatCurrency } from "@/shared/formatCurrency";

export default function ItemPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id ?? "";
  const [item, setItem] = useState<CatalogItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    let cancelled = false;

    getItem(id)
      .then((data) => {
        if (!cancelled) setItem(data);
      })
      .catch((err) => {
        if (cancelled) return;
        setError(
          err instanceof Error ? err.message : "Não foi possível carregar o produto."
        );
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return <p className="p-6 text-muted">Carregando...</p>;
  }

  if (error) {
    return (
      <main className="mx-auto max-w-6xl space-y-2 p-6">
        <ErrorMessage message={error} />
        <Link href="/" className="underline">
          Voltar
        </Link>
      </main>
    );
  }

  if (!item) {
    return (
      <main className="mx-auto max-w-6xl space-y-2 p-6">
        <p>Produto não encontrado.</p>
        <Link href="/" className="underline">
          Voltar
        </Link>
      </main>
    );
  }

  const initial = item.title.trim().charAt(0).toUpperCase() || "?";

  return (
    <main className="mx-auto max-w-6xl space-y-4 p-6">
      <Link href="/" className="text-sm underline">
        Voltar aos produtos
      </Link>

      <div className="grid gap-6 md:grid-cols-[1fr_320px]">
        <div className="space-y-4 rounded-lg border bg-surface p-6">
          <div
            aria-hidden="true"
            className="flex aspect-video items-center justify-center rounded-md bg-page text-8xl font-bold text-muted"
          >
            {initial}
          </div>
          <h1 className="text-2xl font-semibold">{item.title}</h1>
          <p className="text-muted">{item.description}</p>
        </div>

        <aside className="space-y-4 self-start rounded-lg border bg-surface p-6">
          <p className="text-3xl font-semibold">{formatCurrency(item.price)}</p>
          <StockLabel quantity={item.quantity} />
          <BuyBox item={item} />
        </aside>
      </div>
    </main>
  );
}