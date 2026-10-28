"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/shared/components/Button";
import { ErrorMessage } from "@/shared/components/ErrorMessage";
import { formatCurrency } from "@/shared/formatCurrency";
import { PAYMENT_LABELS } from "../constants";
import { createPurchase } from "../services/purchaseService";
import type { CatalogItem, PaymentType } from "../types";

const PAYMENT_TYPES = Object.keys(PAYMENT_LABELS) as PaymentType[];

interface BuyBoxProps {
  item: CatalogItem;
}

export function BuyBox({ item }: BuyBoxProps) {
  const router = useRouter();
  const [quantityInput, setQuantityInput] = useState("1");
  const [paymentType, setPaymentType] = useState<PaymentType>("CreditCard");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const quantity = Number(quantityInput.trim());
  const quantityIsValid = Number.isInteger(quantity) && quantity > 0;
  const total = quantityIsValid
    ? Math.round(item.price * quantity * 100) / 100
    : 0;

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();

    if (!quantityIsValid) {
      setError("A quantidade deve ser um número inteiro maior que zero.");
      return;
    }

    setError(null);
    setSubmitting(true);
    try {
      const created = await createPurchase({
        itemID: item.id,
        paymentType,
        quantity,
        total,
      });
      router.push(`/purchases/${created.id}`);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Não foi possível criar a compra."
      );
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label className="block space-y-1">
        <span className="text-sm text-muted">Quantidade</span>
        <input
          value={quantityInput}
          onChange={(e) => setQuantityInput(e.target.value)}
          className="w-24 rounded-md border px-3 py-2"
        />
      </label>

      <label className="block space-y-1">
        <span className="text-sm text-muted">Forma de pagamento</span>
        <select
          value={paymentType}
          onChange={(e) => setPaymentType(e.target.value as PaymentType)}
          className="w-full rounded-md border px-3 py-2"
        >
          {PAYMENT_TYPES.map((type) => (
            <option key={type} value={type}>
              {PAYMENT_LABELS[type]}
            </option>
          ))}
        </select>
      </label>

      <p className="text-lg font-semibold">Total: {formatCurrency(total)}</p>

      <Button type="submit" disabled={submitting} className="w-full">
        {submitting ? "Comprando..." : "Comprar agora"}
      </Button>

      {error && <ErrorMessage message={error} />}
    </form>
  );
}