import type { Metadata } from "next";
import { Playfair_Display, Inter, Geist } from "next/font/google";
import "./globals.css"
import { cn } from "@/lib/utils"
import ThemeClientProvider from "@/components/providers/ThemeClientProvider";

export const metadata: Metadata = {
  title: "Mark's Portfolio",
  description: "Mark's personal portfolio website",
}

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
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body style={{ backgroundColor: 'var(--background)' }}>
        <ThemeClientProvider>
          {children}
        </ThemeClientProvider>
      </body>
    </html>
  );
}
