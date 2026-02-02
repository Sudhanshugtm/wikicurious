import type { Metadata } from "next";
import { Libre_Baskerville, Lora } from "next/font/google";
import "@wikimedia/codex/dist/codex.style.css";
import "./globals.css";

const baskerville = Libre_Baskerville({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-baskerville',
  subsets: ['latin'],
});

const lora = Lora({
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-lora',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: "WikiCurious - Explore Wikipedia Like Never Before",
  description: "Discover fascinating Wikipedia content about your travel destinations",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr" className={`${baskerville.variable} ${lora.variable}`}>
      <body className="codex">
        {children}
      </body>
    </html>
  );
}
