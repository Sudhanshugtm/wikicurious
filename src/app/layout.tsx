import type { Metadata } from "next";
import "@wikimedia/codex/dist/codex.style.css";
import "./globals.css";

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
    <html lang="en" dir="ltr">
      <body className="codex">
        {children}
      </body>
    </html>
  );
}
