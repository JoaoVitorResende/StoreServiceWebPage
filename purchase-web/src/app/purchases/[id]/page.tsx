"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { StatusBadge } from "@/features/purchases/components/StatusBadge";
import { usePurchasePolling } from "@/features/purchases/hooks/usePurchasePolling";

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

  return (
    <main className="mx-auto max-w-xl space-y-3 p-6">
      <Link href="/purchases" className="underline">
        Voltar
      </Link>
      <h1 className="text-2xl font-bold">Compra {purchase.id.slice(0, 8)}</h1>
      <p>Total: R$ {purchase.total.toFixed(2)}</p>
      <p className="flex items-center gap-2">
        Status: <StatusBadge status={purchase.status} />
      </p>
      {purchase.rejectionReason && <p>Motivo: {purchase.rejectionReason}</p>}
    </main>
  );
}