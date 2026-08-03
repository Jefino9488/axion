import HeroScene from "@/components/HeroScene";
import HomeScreenScene from "@/components/HomeScreenScene";
import QuickSettingsScene from "@/components/QuickSettingsScene";
import CustomizationScene from "@/components/CustomizationScene";
import ThemingShowcase from "@/components/ThemingShowcase";
import FeatureShowcase from "@/components/FeatureShowcase";
import PerformanceScene from "@/components/PerformanceScene";
import InteractiveComparison from "@/components/InteractiveComparison";
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

        {/* Scene 4: Quick Settings — Dual themes, customizable grid */}
        <QuickSettingsScene />

        {/* Scene 5: Theming — Multiple color themes across UI */}
        <ThemingShowcase />

        {/* Scene 6: Customization — Clock faces, launcher tuning, recents, routines */}
        <CustomizationScene />

        {/* Scene 7: Features — Dynamic Bar, Game Space, Security, Essentials, AxPC */}
        <FeatureShowcase />

        {/* Scene 8: Performance — Stats, pillars */}
        <PerformanceScene />

        {/* Scene 9: Comparison — Before/After slider */}
        <InteractiveComparison />

        {/* Scene 10: Footer — CTA, GitHub, Telegram */}
        <Footer />
      </div>
    </main>
  );
}
