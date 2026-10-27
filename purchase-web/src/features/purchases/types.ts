export type PurchaseStatus = "Pending" | "Confirmed" | "Rejected";

export type PaymentType =
  | "Cash"
  | "CreditCard"
  | "DebitCard"
  | "EletronicTransfer";

export interface CatalogItem {
  id: string;
  title: string;
  description: string;
  quantity: number;
  price: number;
}

export interface CatalogPage {
  itens: CatalogItem[];
  page: number;
  pageSize: number;
  totalItens: number;
  totalPages: number;
}

export interface Purchase {
  id: string;
  itemID: string;
  paymentType: PaymentType;
  quantity: number;
  total: number;
  status: PurchaseStatus;
  rejectionReason: string | null;
}

export interface CreatePurchaseRequest {
  itemID: string;
  paymentType: PaymentType;
  quantity: number;
  total: number;
}