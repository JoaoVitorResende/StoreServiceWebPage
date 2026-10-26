import Link from "next/link";
import type { Purchase } from "../types";
import { StatusBadge } from "./StatusBadge";

interface PurchaseListProps {
  purchases: Purchase[];
}

export function PurchaseList({ purchases }: PurchaseListProps) {
  if (purchases.length === 0) {
    return <p>Nenhuma compra ainda.</p>;
  }

  return (
    <ul className="space-y-2">
      {purchases.map((p) => (
        <li
          key={p.id}
          className="flex items-center justify-between rounded border p-3"
        >
          <Link href={`/purchases/${p.id}`} className="underline">
            {p.id.slice(0, 8)}
          </Link>
          <span>R$ {p.total.toFixed(2)}</span>
          <StatusBadge status={p.status} />
        </li>
      ))}
    </ul>
  );
}