import type { CreatePurchaseRequest, Purchase } from "../types";

const STORAGE_KEY = "purchases";

function readAll(): Purchase[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? (parsed as Purchase[]) : [];
  } catch {
    return [];
  }
}

function writeAll(list: Purchase[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch {
    // storage indisponível: ignora no mock
  }
}

function updateStatus(
  id: string,
  status: Purchase["status"],
  reason: string | null
): void {
  const updated = readAll().map((p) =>
    p.id === id ? { ...p, status, rejectionReason: reason } : p
  );
  writeAll(updated);
}

export async function listPurchases(): Promise<Purchase[]> {
  return readAll();
}

export async function getPurchase(id: string): Promise<Purchase | null> {
  return readAll().find((p) => p.id === id) ?? null;
}

export async function createPurchase(
  request: CreatePurchaseRequest
): Promise<Purchase> {
  const purchase: Purchase = {
    id: crypto.randomUUID(),
    total: request.total,
    status: "Pending",
    rejectionReason: null,
  };

  writeAll([purchase, ...readAll()]);

  // simula o retorno assíncrono da StoreApi
  setTimeout(() => {
    if (request.total > 1000) {
      updateStatus(purchase.id, "Rejected", "Estoque insuficiente");
    } else {
      updateStatus(purchase.id, "Confirmed", null);
    }
  }, 3000);

  return purchase;
}