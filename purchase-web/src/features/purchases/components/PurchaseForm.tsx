"use client";

import { useEffect, useState } from "react";
import { Button } from "@/shared/components/Button";
import { formatCurrency } from "@/shared/formatCurrency";
import { createPurchase, listCatalog } from "../services/purchaseService";
import type { CatalogItem, PaymentType } from "../types";

const PAYMENT_OPTIONS: { value: PaymentType; label: string }[] = [
  { value: "Cash", label: "Dinheiro" },
  { value: "CreditCard", label: "Cartão de crédito" },
  { value: "DebitCard", label: "Cartão de débito" },
  { value: "EletronicTransfer", label: "Transferência eletrônica" },
];

interface PurchaseFormProps {
  onCreated: () => void;
}

export function PurchaseForm({ onCreated }: PurchaseFormProps) {
  const [catalog, setCatalog] = useState<CatalogItem[]>([]);
  const [itemId, setItemId] = useState("");
  const [quantityInput, setQuantityInput] = useState("1");
  const [paymentType, setPaymentType] = useState<PaymentType>("CreditCard");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    listCatalog()
      .then(setCatalog)
      .catch(() => setError("Não foi possível carregar os itens."));
  }, []);

  const selectedItem = catalog.find((c) => c.id === itemId);
  const quantity = Number(quantityInput.trim());
  const quantityIsValid = Number.isInteger(quantity) && quantity > 0;
  const total =
    selectedItem && quantityIsValid
      ? Math.round(selectedItem.price * quantity * 100) / 100
      : 0;

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();

    if (!selectedItem) {
      setError("Selecione um item.");
      return;
    }
    if (!quantityIsValid) {
      setError("A quantidade deve ser um número inteiro maior que zero.");
      return;
    }

    setError(null);
    setSubmitting(true);
    try {
      await createPurchase({
        itemID: selectedItem.id,
        paymentType,
        quantity,
        total,
      });
      setItemId("");
      setQuantityInput("1");
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
          value={itemId}
          onChange={(e) => setItemId(e.target.value)}
          className="flex-1 rounded-md border bg-page px-3 py-2"
          aria-label="Item"
        >
          <option value="">Selecione um item</option>
          {catalog.map((c) => (
            <option key={c.id} value={c.id}>
              {c.title} - {formatCurrency(c.price)}
            </option>
          ))}
        </select>
        <input
          value={quantityInput}
          onChange={(e) => setQuantityInput(e.target.value)}
          className="flex-1 rounded-md border bg-page px-3 py-2"
          aria-label="Quantidade"
        />
      </div>

      {selectedItem && (
        <p className="text-sm text-gray-500">
          Em estoque: {selectedItem.quantity}
        </p>
      )}

      <select
        value={paymentType}
        onChange={(e) => setPaymentType(e.target.value as PaymentType)}
        className="w-full rounded-md border  bg-page px-3 py-2"
        aria-label="Forma de pagamento"
      >
        {PAYMENT_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>

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