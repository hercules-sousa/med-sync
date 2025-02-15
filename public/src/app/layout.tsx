import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mey Sync",
  description: "A simple platform to manage clinics",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
      <Toaster />
    </html>
  );
}
