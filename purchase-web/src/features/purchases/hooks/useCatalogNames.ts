"use client";

import { useEffect, useState } from "react";
import { listCatalog } from "../services/purchaseService";

export function useCatalogNames(): Record<string, string> {
  const [names, setNames] = useState<Record<string, string>>({});

  useEffect(() => {
    let cancelled = false;

    listCatalog()
      .then((items) => {
        if (cancelled) return;
        const map: Record<string, string> = {};
        for (const item of items) {
          map[item.id] = item.title;
        }
        setNames(map);
      })
      .catch(() => {
        // sem catálogo, a tela cai no id do item
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return names;
}