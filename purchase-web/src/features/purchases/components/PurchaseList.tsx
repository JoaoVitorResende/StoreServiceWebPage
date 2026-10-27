import Link from "next/link";
import type { Purchase } from "../types";
import { StatusBadge } from "./StatusBadge";
import { formatCurrency } from "@/shared/formatCurrency";

interface PurchaseListProps {
  purchases: Purchase[];
}

export function PurchaseList({ purchases }: PurchaseListProps) {
  if (purchases.length === 0) {
    return <p>Nenhuma compra ainda.</p>;
  }

  return (
    <ul className="space-y-2">
      {purchases.map((p) => {
        const items = p.items ?? [];
        const totalUnits = items.reduce((sum, i) => sum + i.quantity, 0);

        return (
          <li
            key={p.id}
            className="flex items-center justify-between rounded-md border p-3 hover:bg-gray-50"
          >
            <Link href={`/purchases/${p.id}`} className="underline">
              {p.id.slice(0, 8)}
            </Link>
            <span className="text-sm text-gray-600">
              {totalUnits} {totalUnits === 1 ? "unidade" : "unidades"}
            </span>
            <span>{formatCurrency(p.total)}</span>
            <StatusBadge status={p.status} />
          </li>
        );
      })}
    </ul>
  );
}