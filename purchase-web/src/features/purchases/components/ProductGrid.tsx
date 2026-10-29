"use client";

import { useEffect, useState } from "react";
import { Button } from "@/shared/components/Button";
import { ErrorMessage } from "@/shared/components/ErrorMessage";
import { listCatalog } from "../services/purchaseService";
import type { CatalogItem } from "../types";
import { ProductCard } from "./ProductCard";

function normalize(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

interface ProductGridProps {
  query: string;
  categoryId: number | null;
}

export function ProductGrid({ query, categoryId }: ProductGridProps) {
  const [items, setItems] = useState<CatalogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let cancelled = false;

    listCatalog()
      .then((data) => {
        if (cancelled) return;
        setItems(data);
        setError(null);
      })
      .catch((err) => {
        if (cancelled) return;
        setError(
          err instanceof Error
            ? err.message
            : "Não foi possível carregar os produtos."
        );
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [attempt]);

  function handleRetry() {
    setLoading(true);
    setAttempt((a) => a + 1);
  }

  if (loading) {
    return <p className="text-muted">Carregando...</p>;
  }

  if (error) {
    return (
      <div className="space-y-3">
        <ErrorMessage message={error} />
        <Button variant="secondary" onClick={handleRetry}>
          Tentar novamente
        </Button>
      </div>
    );
  }

  const term = normalize(query.trim());
  const visible = items.filter(
    (i) =>
      (categoryId === null || i.categoryId === categoryId) &&
      (!term || normalize(i.title).includes(term))
  );

  if (visible.length === 0) {
    return <p className="text-muted">Nenhum produto encontrado.</p>;
  }

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {visible.map((item) => (
        <ProductCard key={item.id} item={item} />
      ))}
    </div>
  );
}