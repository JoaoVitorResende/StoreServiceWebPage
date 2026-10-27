"use client";

import { useEffect, useState } from "react";
import { getPurchase } from "../services/purchaseService";
import type { Purchase } from "../types";

const POLLING_INTERVAL_MS = 1500;

export function usePurchasePolling(id: string) {
  const [purchase, setPurchase] = useState<Purchase | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | undefined;

    async function load() {
      try {
        const data = await getPurchase(id);
        if (cancelled) return;

        setPurchase(data);
        setError(null);

        if (data?.status === "Pending") {
          timer = setTimeout(load, POLLING_INTERVAL_MS);
        }
      } catch (err) {
        if (cancelled) return;
        setError(
          err instanceof Error ? err.message : "Não foi possível carregar a compra."
        );
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();

    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
    };
  }, [id]);

  return { purchase, loading, error };
}