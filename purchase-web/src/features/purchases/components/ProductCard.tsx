import Link from "next/link";
import { formatCurrency } from "@/shared/formatCurrency";
import type { CatalogItem } from "../types";

const LOW_STOCK_LIMIT = 5;

export function StockLabel({ quantity }: { quantity: number }) {
    if (quantity <= 0) {
        return <span className="text-sm font-semibold text-red-400">Esgotado</span>;
    }
    if (quantity <= LOW_STOCK_LIMIT) {
        return (
            <span className="text-sm font-semibold text-yellow-300">
                Últimas unidades
            </span>
        );
    }
    return <span className="text-sm text-green-400">Em estoque</span>;
}

interface ProductCardProps {
    item: CatalogItem;
}

export function ProductCard({ item }: ProductCardProps) {
    const initial = item.title.trim().charAt(0).toUpperCase() || "?";
    const soldOut = item.quantity <= 0;

    return (
        <Link
            href={`/items/${item.id}`}
            className={`flex flex-col overflow-hidden rounded-lg border bg-surface shadow-sm transition hover:border-action hover:shadow-md ${soldOut ? "opacity-60" : ""
                }`}
        >
            <div
                aria-hidden="true"
                className="flex aspect-[4/3] items-center justify-center border-b bg-white text-6xl font-bold text-action/30"
            >
                {initial}
            </div>
            <div className="flex flex-1 flex-col gap-1 p-4">
                <h2 className="line-clamp-2">{item.title}</h2>
                <p className="text-2xl font-semibold">{formatCurrency(item.price)}</p>
                <StockLabel quantity={item.quantity} />
            </div>
        </Link>
    );
}