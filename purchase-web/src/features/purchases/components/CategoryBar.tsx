"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { listCategories } from "../services/purchaseService";
import type { Category } from "../types";

export function CategoryBar() {
  const searchParams = useSearchParams();
  const selected = searchParams.get("category");
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    let cancelled = false;

    listCategories()
      .then((data) => {
        if (!cancelled) setCategories(data);
      })
      .catch(() => {
        // sem categorias, a barra simplesmente não aparece
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (categories.length === 0) return null;

  function linkClass(active: boolean): string {
    return `whitespace-nowrap text-sm hover:underline ${
      active ? "font-semibold underline" : ""
    }`;
  }

  return (
    <nav aria-label="Categorias" className="border-t border-black/10 bg-header">
      <div className="mx-auto flex max-w-6xl gap-5 overflow-x-auto px-6 py-2">
        <Link href="/" className={linkClass(selected === null)}>
          Todas
        </Link>
        {categories.map((c) => (
          <Link
            key={c.id}
            href={`/?category=${c.id}`}
            className={linkClass(selected === String(c.id))}
          >
            {c.name}
          </Link>
        ))}
      </div>
    </nav>
  );
}