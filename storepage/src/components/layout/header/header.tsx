import Link from "next/link"
import { ActiveLink } from "../../active-layout"

export const Header = () =>{
    return(
         <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-background/95 backdrop-blur supports-[backdrop-filters]:bg-background/60">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 ls:px-8">
                <div className="flex h-16 items-center justify-between">
                    <nav className="flex items-center gap-6">
                        <ActiveLink href="/">Inicio</ActiveLink>
                        <ActiveLink href="/blog">Blog</ActiveLink>
                        <button >
                              <Link href="/comecar">Começar</Link>
                        </button>
                    </nav>
                </div>
            </div>
        </header>
    )
}