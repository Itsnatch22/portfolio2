"use client"
import Philosophy from "@/components/About";
import HeroSection from "@/components/HeroSection";
import Work from "@/components/Work";
import Navbar from "@/components/Navbar";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection/>
      <Philosophy/>
      <Work/>
      <Contact />
    </main>
  )
}
