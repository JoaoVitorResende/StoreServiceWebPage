import { ApiError, http } from "@/shared/http";
import type {
  CatalogItem,
  CatalogPage,
  CreatePurchaseRequest,
  Purchase,
} from "../types";

export async function listCatalog(): Promise<CatalogItem[]> {
  const page = await http<CatalogPage | null>("/api/items?page=1&pageSize=50");
  return page?.itens ?? [];
}

export async function getItem(id: string): Promise<CatalogItem | null> {
  try {
    return await http<CatalogItem | null>(
      `/api/items/${encodeURIComponent(id)}`
    );
  } catch (err) {
    if (err instanceof ApiError && (err.status === 404 || err.status === 400)) {
      return null;
    }
    throw err;
  }
}

export async function listPurchases(): Promise<Purchase[]> {
  const purchases = await http<Purchase[] | null>("/api/purchases");
  return purchases ?? [];
}

export async function getPurchase(id: string): Promise<Purchase | null> {
  try {
    return await http<Purchase | null>(
      `/api/purchases/${encodeURIComponent(id)}`
    );
  } catch (err) {
    if (err instanceof ApiError && err.status === 404) return null;
    throw err;
  }
}

export async function createPurchase(
  request: CreatePurchaseRequest
): Promise<Purchase> {
  const created = await http<Purchase | null>("/api/purchases", {
    method: "POST",
    body: JSON.stringify(request),
  });
  if (!created) throw new ApiError("Resposta vazia da API.", 0);
  return created;
}