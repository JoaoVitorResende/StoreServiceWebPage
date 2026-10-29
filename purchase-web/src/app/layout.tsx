import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Header } from "@/shared/components/Header";
import "./globals.css";
import { Suspense } from "react";
import { CategoryBar } from "@/features/purchases/components/CategoryBar";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Store Service",
  description: "Escolha um produto e acompanhe sua compra em tempo real",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className={geist.className}>
        <Header />
        <Suspense fallback={null}>
          <CategoryBar />
        </Suspense>
        {children}
      </body>
    </html>
  );
}