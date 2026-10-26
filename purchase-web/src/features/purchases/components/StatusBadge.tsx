import type { PurchaseStatus } from "../types";

const STYLES: Record<PurchaseStatus, string> = {
  Pending: "bg-yellow-100 text-yellow-800",
  Confirmed: "bg-green-100 text-green-800",
  Rejected: "bg-red-100 text-red-800",
};

const LABELS: Record<PurchaseStatus, string> = {
  Pending: "Pendente",
  Confirmed: "Confirmada",
  Rejected: "Rejeitada",
};

interface StatusBadgeProps {
  status: PurchaseStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const style = STYLES[status] ?? "bg-gray-100 text-gray-800";
  const label = LABELS[status] ?? status;

  return (
    <span className={`rounded px-2 py-0.5 text-sm ${style}`}>{label}</span>
  );
}