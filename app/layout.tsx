import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css"

//imports from the component folder
import CursorFollower from "@/components/Cursor";
import ScrollManager from "@/components/ScrollManager";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mark's Portfolio",
  description: "A portfolio website to showcase my skills and projects.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${inter.variable} antialiased`}
      >
        <CursorFollower />
        <ScrollManager />
        {children}
      </body>
    </html>
  );
}
