import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bitcoin Lab | Open Source",
  description: "Advanced Bitcoin on-chain analytics (MVRV, Mayer, AVIV, CVDD, MACD)",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-bg text-gray-200">{children}</body>
    </html>
  );
}