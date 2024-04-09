import Image from "next/image";
import { Inter } from "next/font/google";

import "./styles/globals.css";
import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Warframe Riven",
  description: "See the trading statistics of the desired riven.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Image
          src="/icon.png"
          alt="warframe-logo-tinted-in-blue"
          width={64}
          height={64}
          style={{ marginBottom: 16 }}
        />
        {children}
      </body>
    </html>
  );
}
