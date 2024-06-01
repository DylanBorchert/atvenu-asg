import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from './providers';
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AtVenu Programming Assisgnment",
  description: "Poster app for AtVenu Programming Assisgnment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Providers>
        <body className={inter.className}>{children}</body>
      </Providers>
    </html>
  );
}
