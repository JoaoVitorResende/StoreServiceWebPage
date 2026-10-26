"use client";

import { useState } from "react";
import { createPurchase } from "../services/purchaseService";

interface PurchaseFormProps {
  onCreated: () => void;
}

export function PurchaseForm({ onCreated }: PurchaseFormProps) {
  const [totalInput, setTotalInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();

    const total = Number(totalInput.trim().replace(",", "."));
    if (totalInput.trim() === "" || !Number.isFinite(total) || total <= 0) {
      setError("Informe um total válido, maior que zero.");
      return;
    }

    setError(null);
    setSubmitting(true);
    try {
      await createPurchase({ total });
      setTotalInput("");
      onCreated();
    } catch {
      setError("Não foi possível criar a compra.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <div className="flex gap-2">
        <input
          value={totalInput}
          onChange={(e) => setTotalInput(e.target.value)}
          placeholder="Total"
          className="flex-1 rounded border px-3 py-2"
        />
        <button
          type="submit"
          disabled={submitting}
          className="rounded bg-black px-4 py-2 text-white disabled:opacity-50"
        >
          Criar
        </button>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </form>
  );
}