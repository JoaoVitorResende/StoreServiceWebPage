import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Header } from "@/shared/components/Header";
import "./globals.css";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Store Service - Compras",
  description: "Acompanhamento de compras da PurchaseApi",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className={geist.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}