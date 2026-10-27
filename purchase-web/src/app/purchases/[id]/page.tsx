"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { StatusBadge } from "@/features/purchases/components/StatusBadge";
import { usePurchasePolling } from "@/features/purchases/hooks/usePurchasePolling";
import { Card } from "@/shared/components/Card";
import { formatCurrency } from "@/shared/formatCurrency";

export default function PurchaseDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id ?? "";
  const { purchase, loading } = usePurchasePolling(id);

  if (loading) {
    return <p className="p-6">Carregando...</p>;
  }

  if (!purchase) {
    return (
      <main className="mx-auto max-w-xl space-y-2 p-6">
        <p>Compra não encontrada.</p>
        <Link href="/purchases" className="underline">
          Voltar
        </Link>
      </main>
    );
  }

  const items = purchase.items ?? [];

  return (
    <main className="mx-auto max-w-2xl space-y-4 p-6">
      <Link href="/purchases" className="text-sm underline">
        Voltar
      </Link>
      <Card title={`Compra ${purchase.id.slice(0, 8)}`}>
        <div className="space-y-3">
          <p className="flex items-center gap-2">
            Status: <StatusBadge status={purchase.status} />
          </p>
          {purchase.rejectionReason && (
            <p className="rounded-md bg-red-50 p-2 text-sm text-red-800">
              Motivo: {purchase.rejectionReason}
            </p>
          )}

          <ul className="space-y-1">
            {items.map((i) => (
              <li
                key={i.itemId}
                className="flex justify-between rounded-md border p-2"
              >
                <span>{formatCurrency(i.unitPrice * i.quantity)}</span>
                <span>R$ {(i.unitPrice * i.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>

          <p className="text-right font-bold">
            Total: {formatCurrency(purchase.total)}
          </p>
        </div>
      </Card>
    </main>
  );
}