"use client";

import { useCallback, useEffect, useState } from "react";
import { PurchaseList } from "@/features/purchases/components/PurchaseList";
import { useCatalogNames } from "@/features/purchases/hooks/useCatalogNames";
import { listPurchases } from "@/features/purchases/services/purchaseService";
import type { Purchase } from "@/features/purchases/types";
import { ErrorMessage } from "@/shared/components/ErrorMessage";

const REFRESH_INTERVAL_MS = 2000;

export default function PurchasesPage() {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const itemNames = useCatalogNames();

  const refresh = useCallback(async () => {
    try {
      setPurchases(await listPurchases());
      setError(null);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Não foi possível carregar as compras."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
    const timer = setInterval(refresh, REFRESH_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [refresh]);

  return (
    <main className="mx-auto max-w-4xl space-y-4 p-6">
      <h1 className="text-xl font-semibold">Minhas compras</h1>

      {error && <ErrorMessage message={error} />}

      {loading ? (
        <p className="text-muted">Carregando...</p>
      ) : error && purchases.length === 0 ? null : (
        <PurchaseList purchases={purchases} itemNames={itemNames} />
      )}
    </main>
  );
}