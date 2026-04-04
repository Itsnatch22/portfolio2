"use client";

import React from 'react';
import { ThemeProvider } from '@/contexts/ThemeContext';
import CursorFollower from "@/components/ui/Cursor";
import ScrollManager from "@/components/ui/ScrollManager";
import { cn } from "@/lib/utils";
import { Playfair_Display, Inter } from "next/font/google";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

interface ThemeClientProviderProps {
  children: React.ReactNode;
}

export default function ThemeClientProvider({ children }: ThemeClientProviderProps) {
  return (
    <ThemeProvider>
      <CursorFollower />
      <ScrollManager />
      <div className={`${playfair.variable} ${inter.variable} antialiased`}>
        {children}
      </div>
    </ThemeProvider>
  );
}
