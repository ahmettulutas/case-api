import "./globals.css";
import type { Metadata } from "next";
import { Roboto_Mono } from "next/font/google";

import Navbar from "@/components/Navbar";

const roboto = Roboto_Mono({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Paramtech FE Case",
  description: "Paramtech FE Case Documentation",
};

type Props = {
  children: React.ReactNode;
};

export default async function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <link rel="icon" href="/favicon.png" sizes="any" />
      <body
        className={`${roboto.className} mx-auto w-[96%] px-4 max-w-screen-2xl mt-4`}
      >
        <div className="flex flex-col gap-6">
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  );
}
