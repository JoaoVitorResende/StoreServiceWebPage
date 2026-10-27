export type PurchaseStatus = "Pending" | "Confirmed" | "Rejected";

export interface CatalogItem {
  id: string;
  name: string;
  unitPrice: number;
}

export interface PurchaseItem {
  itemId: string;
  name: string;
  unitPrice: number;
  quantity: number;
}

export interface Purchase {
  id: string;
  items: PurchaseItem[];
  total: number;
  status: PurchaseStatus;
  rejectionReason: string | null;
}

export interface CreatePurchaseItemRequest {
  itemId: string;
  quantity: number;
}

export interface CreatePurchaseRequest {
  items: CreatePurchaseItemRequest[];
}