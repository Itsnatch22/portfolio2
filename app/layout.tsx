"use client"
import React, { useState } from "react";
import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css"

import CursorFollower from "@/components/ui/Cursor";
import ScrollManager from "@/components/ui/ScrollManager";
import Preloader from "@/components/ui/Preloader";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [loading, setLoading] = useState(true);

  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${inter.variable} antialiased bg-[#050505]`}
      >
        {loading && <Preloader onComplete={() => setLoading(false)} />}
        <CursorFollower />
        <ScrollManager />
        {children}
      </body>
    </html>
  );
}
