"use client";

import { useCallback, useEffect, useState } from "react";
import { PurchaseForm } from "@/features/purchases/components/PurchaseForm";
import { PurchaseList } from "@/features/purchases/components/PurchaseList";
import { listPurchases } from "@/features/purchases/services/purchaseService";
import type { Purchase } from "@/features/purchases/types";
import { Card } from "@/shared/components/Card";
import { useCatalogNames } from "@/features/purchases/hooks/useCatalogNames";
import { ErrorMessage } from "@/shared/components/ErrorMessage";
const REFRESH_INTERVAL_MS = 2000;

export default function PurchasesPage() {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const itemNames = useCatalogNames();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    try {
      setPurchases(await listPurchases());
      setError(null);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Não foi possível carregar as compras."
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
    <main className="mx-auto max-w-2xl space-y-6 p-6">
      <Card title="Nova compra">
        <PurchaseForm onCreated={refresh} />
      </Card>
      <Card title="Compras">
        <div className="space-y-3">
          {error && <ErrorMessage message={error} />}
          {loading ? (
            <p>Carregando...</p>
          ) : error && purchases.length === 0 ? null : (
            <PurchaseList purchases={purchases} itemNames={itemNames} />
          )}
        </div>
      </Card>
    </main>
  );
}