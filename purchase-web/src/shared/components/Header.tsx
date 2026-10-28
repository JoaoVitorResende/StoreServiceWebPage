import Form from "next/form";
import Link from "next/link";

export function Header() {
  return (
    <header className="bg-header">
      <div className="mx-auto flex max-w-6xl items-center gap-6 px-6 py-3">
        <Link href="/" className="text-xl font-bold text-brand">
          Store Service
        </Link>

        <Form action="/" className="relative flex-1">
          <input
            name="q"
            placeholder="Buscar produtos"
            aria-label="Buscar produtos"
            className="w-full rounded-md bg-surface py-2 pl-4 pr-10 text-ink placeholder:text-muted"
          />
          <button
            type="submit"
            aria-label="Buscar"
            className="absolute inset-y-0 right-0 px-3 text-muted hover:text-ink"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20l-3.5-3.5" />
            </svg>
          </button>
        </Form>

        <nav className="text-sm">
          <Link href="/purchases" className="hover:underline">
            Compras
          </Link>
        </nav>
      </div>
    </header>
  );
}