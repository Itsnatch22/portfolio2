"use client"
import React, { useState } from "react";
import type { Metadata } from "next";
import { Playfair_Display, Inter, Geist } from "next/font/google";
import "./globals.css"

import CursorFollower from "@/components/ui/Cursor";
import ScrollManager from "@/components/ui/ScrollManager";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

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
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body
        className={`${playfair.variable} ${inter.variable} antialiased`}
        style={{ backgroundColor: 'var(--background)' }}
      >
        <ThemeProvider>
          <CursorFollower />
          <ScrollManager />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
