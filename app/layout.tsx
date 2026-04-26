import type { Metadata } from "next";
import { fraunces, interTight, jetBrainsMono } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "hyyve. — A calmer way to run AI",
  description: "Hyyve designs and ships AI agents and automations for mid-market operations teams.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${interTight.variable} ${jetBrainsMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
