import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Chart Pattern Guide",
  description:
    "A clean, readable guide for learning common chart patterns, their triggers, and how traders typically interpret them."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
