import Link from "next/link";

export function Header() {
  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-2xl items-center justify-between px-6 py-4">
        <Link href="/purchases" className="text-lg font-bold">
          Store Service
        </Link>
        <span className="text-sm text-gray-500">Compras</span>
      </div>
    </header>
  );
}