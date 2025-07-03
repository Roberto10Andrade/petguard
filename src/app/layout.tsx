import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import { ConditionalNavbar } from "./components/ConditionalNavbar";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PetGuard - Sistema de Monitoramento de Pets",
  description: "Sistema integrado para acompanhar a saúde, hábitos e alimentação do seu pet",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <ConditionalNavbar />
        <Toaster position="top-right" />
        {children}
      </body>
    </html>
  );
}
