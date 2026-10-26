export type PurchaseStatus = "Pending" | "Confirmed" | "Rejected";

export interface Purchase {
  id: string;
  total: number;
  status: PurchaseStatus;
  rejectionReason: string | null;
}

export interface CreatePurchaseRequest {
  total: number;
}