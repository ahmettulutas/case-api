
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Paramtech FE Case",
  description: "Paramtech FE Case Documentation",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} mx-auto w-[96%] px-4 max-w-screen-2xl mt-4`}>
        <div className="flex flex-col gap-6">
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  );
}
