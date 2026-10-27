"use client";

import { useEffect, useState } from "react";
import { createPurchase, listCatalog } from "../services/purchaseService";
import type { CatalogItem, CreatePurchaseItemRequest } from "../types";
import { Button } from "@/shared/components/Button";
import { formatCurrency } from "@/shared/formatCurrency";

interface PurchaseFormProps {
  onCreated: () => void;
}

export function PurchaseForm({ onCreated }: PurchaseFormProps) {
  const [catalog, setCatalog] = useState<CatalogItem[]>([]);
  const [selectedItemId, setSelectedItemId] = useState("");
  const [quantityInput, setQuantityInput] = useState("1");
  const [lines, setLines] = useState<CreatePurchaseItemRequest[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    listCatalog().then(setCatalog);
  }, []);

  function findItem(itemId: string): CatalogItem | undefined {
    return catalog.find((c) => c.id === itemId);
  }

  function handleAddLine() {
    if (!findItem(selectedItemId)) {
      setError("Selecione um item.");
      return;
    }

    const quantity = Number(quantityInput.trim());
    if (!Number.isInteger(quantity) || quantity <= 0) {
      setError("A quantidade deve ser um número inteiro maior que zero.");
      return;
    }

    setError(null);

    const existing = lines.find((l) => l.itemId === selectedItemId);
    if (existing) {
      setLines(
        lines.map((l) =>
          l.itemId === selectedItemId
            ? { ...l, quantity: l.quantity + quantity }
            : l
        )
      );
    } else {
      setLines([...lines, { itemId: selectedItemId, quantity }]);
    }

    setSelectedItemId("");
    setQuantityInput("1");
  }

  function handleRemoveLine(itemId: string) {
    setLines(lines.filter((l) => l.itemId !== itemId));
  }

  const total = lines.reduce((sum, line) => {
    const item = findItem(line.itemId);
    return item ? sum + item.unitPrice * line.quantity : sum;
  }, 0);

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();

    if (lines.length === 0) {
      setError("Adicione pelo menos um item.");
      return;
    }

    setError(null);
    setSubmitting(true);
    try {
      await createPurchase({ items: lines });
      setLines([]);
      onCreated();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Não foi possível criar a compra."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex gap-2">
        <select
          value={selectedItemId}
          onChange={(e) => setSelectedItemId(e.target.value)}
          className="flex-1 rounded-md border bg-white px-3 py-2"
        >
          <option value="">Selecione um item</option>
          {catalog.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name} - {formatCurrency(c.unitPrice)}
            </option>
          ))}
        </select>
        <input
          value={quantityInput}
          onChange={(e) => setQuantityInput(e.target.value)}
          className="w-20 rounded-md border bg-white px-3 py-2"
          aria-label="Quantidade"
        />
        <Button variant="secondary" onClick={handleAddLine}>
          Adicionar
        </Button>
      </div>

      {lines.length === 0 ? (
        <p className="text-sm text-gray-500">Nenhum item adicionado.</p>
      ) : (
        <ul className="space-y-1">
          {lines.map((line) => {
            const item = findItem(line.itemId);
            return (
              <li
                key={line.itemId}
                className="flex items-center justify-between rounded-md border p-2"
              >
                <span>
                  {item?.name ?? line.itemId} x {line.quantity}
                </span>
                <Button
                  variant="link-danger"
                  onClick={() => handleRemoveLine(line.itemId)}
                >
                  Remover
                </Button>
              </li>
            );
          })}
        </ul>
      )}

      <div className="flex items-center justify-between">
        <strong>Total: {formatCurrency(total)}</strong>
        <Button type="submit" disabled={submitting}>
          {submitting ? "Criando..." : "Criar compra"}
        </Button>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
    </form>
  );
}