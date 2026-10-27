import type {
  CatalogItem,
  CreatePurchaseRequest,
  Purchase,
  PurchaseItem,
} from "../types";

const STORAGE_KEY = "purchases";
const MAX_QUANTITY_IN_STOCK = 10;

const CATALOG: CatalogItem[] = [
  { id: "item-1", name: "Teclado mecânico", unitPrice: 250 },
  { id: "item-2", name: "Mouse sem fio", unitPrice: 120 },
  { id: "item-3", name: "Monitor 24 polegadas", unitPrice: 900 },
  { id: "item-4", name: "Cabo HDMI", unitPrice: 30 },
];

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

export async function listCatalog(): Promise<CatalogItem[]> {
  return CATALOG;
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
  if (request.items.length === 0) {
    throw new Error("A compra precisa de pelo menos um item.");
  }

  const items: PurchaseItem[] = request.items.map((line) => {
    const catalogItem = CATALOG.find((c) => c.id === line.itemId);
    if (!catalogItem) {
      throw new Error("Item não encontrado no catálogo.");
    }
    if (!Number.isInteger(line.quantity) || line.quantity <= 0) {
      throw new Error("A quantidade deve ser um inteiro maior que zero.");
    }
    return {
      itemId: catalogItem.id,
      name: catalogItem.name,
      unitPrice: catalogItem.unitPrice,
      quantity: line.quantity,
    };
  });

  const total = items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0);

  const purchase: Purchase = {
    id: crypto.randomUUID(),
    items,
    total,
    status: "Pending",
    rejectionReason: null,
  };

  writeAll([purchase, ...readAll()]);

  // simula o retorno assíncrono da StoreApi
  setTimeout(() => {
    const outOfStock = items.some((i) => i.quantity > MAX_QUANTITY_IN_STOCK);
    if (outOfStock) {
      updateStatus(purchase.id, "Rejected", "Estoque insuficiente");
    } else {
      updateStatus(purchase.id, "Confirmed", null);
    }
  }, 3000);

  return purchase;
}