import Link from "next/link";
import { formatCurrency } from "@/shared/formatCurrency";
import type { Purchase } from "../types";
import { StatusBadge } from "./StatusBadge";


interface PurchaseListProps {
  purchases: Purchase[];
  itemNames: Record<string, string>;
}

export function PurchaseList({ purchases, itemNames }: PurchaseListProps) {
 if (purchases.length === 0) {
  return (
    <p className="text-muted">
      Você ainda não fez nenhuma compra.{" "}
      <Link href="/" className="text-action underline">
        Ver produtos
      </Link>
    </p>
  );
}

  return (
    <ul className="space-y-2">
      {purchases.map((p) => (
        <li
          key={p.id}
          className="flex items-center justify-between gap-2 rounded-md border p-3 hover:bg-gray-50"
        >
          <Link href={`/purchases/${p.id}`} className="underline">
            {itemNames[p.itemID] ?? p.itemID.slice(0, 8)}
          </Link>
          <span className="text-sm text-muted">x {p.quantity}</span>
          <span>{formatCurrency(p.total)}</span>
          <StatusBadge status={p.status} />
        </li>
      ))}
    </ul>
  );
}