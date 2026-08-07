import Philosophy from "@/components/screens/Skills";
import HeroSection from "@/components/screens/Hero";
import Work from "@/components/screens/Work";
import Navbar from "@/components/ui/Navbar";
import Contact from "@/components/screens/Contact";
import UtopiaChatbot from "@/components/chatbot/UtopiaChatbot";

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection/>
      <Philosophy/>
      <Work/>
      <Contact />
      <UtopiaChatbot />
    </main>
  )
}
