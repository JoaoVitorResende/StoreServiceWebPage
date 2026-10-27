"use client";

import { useCallback, useEffect, useState } from "react";
import { PurchaseForm } from "@/features/purchases/components/PurchaseForm";
import { PurchaseList } from "@/features/purchases/components/PurchaseList";
import { listPurchases } from "@/features/purchases/services/purchaseService";
import type { Purchase } from "@/features/purchases/types";
import { Card } from "@/shared/components/Card";

const REFRESH_INTERVAL_MS = 2000;

export default function PurchasesPage() {
  const [purchases, setPurchases] = useState<Purchase[]>([]);

  const refresh = useCallback(async () => {
    setPurchases(await listPurchases());
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
        <PurchaseList purchases={purchases} />
      </Card>
    </main>
  );
}