import HeroScene from "@/components/HeroScene";
import HomeScreenScene from "@/components/HomeScreenScene";
import FeatureShowcase from "@/components/FeatureShowcase";
import ResearchShowcase from "@/components/ResearchShowcase";
import ParticleBackground from "@/components/ParticleBackground";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="block w-full min-h-screen bg-[var(--color-axion-bg)] overflow-x-hidden relative">
      <ParticleBackground />

      {/* Scene 1: Hero — Title + Phone zoom */}
      <HeroScene />

      <div className="w-full relative z-10">
        {/* Scene 3: Home Screen — Launcher, App Drawer, Volume, Folders */}
        <HomeScreenScene />

        {/* Scene 7: Features — Dynamic Bar, Game Space, Security, Essentials, AxPC */}
        <FeatureShowcase />

        {/* Scene 8: Research Showcase */}
        <ResearchShowcase />

        {/* Scene 10: Footer — CTA, GitHub, Telegram */}
        <Footer />
      </div>
    </main>
  );
}
