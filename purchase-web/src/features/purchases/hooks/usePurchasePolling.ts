"use client";

import { useEffect, useState } from "react";
import { getPurchase } from "../services/purchaseService";
import type { Purchase } from "../types";

const POLLING_INTERVAL_MS = 1500;

export function usePurchasePolling(id: string) {
  const [purchase, setPurchase] = useState<Purchase | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | undefined;

    async function load() {
      const data = await getPurchase(id);
      if (cancelled) return;

      setPurchase(data);
      setLoading(false);

      if (data?.status === "Pending") {
        timer = setTimeout(load, POLLING_INTERVAL_MS);
      }
    }

    load();

    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
    };
  }, [id]);

  return { purchase, loading };
}