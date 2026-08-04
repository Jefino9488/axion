import HeroScene from "@/components/HeroScene";
import HomeScreenScene from "@/components/HomeScreenScene";
import FeatureShowcase from "@/components/FeatureShowcase";
import ResearchShowcase from "@/components/ResearchShowcase";

export default function Home() {

  return (
    <main className="block w-full min-h-screen overflow-x-hidden relative">

      <HeroScene />

      <div className="w-full relative z-10">
        <HomeScreenScene />

        <FeatureShowcase />

        <ResearchShowcase />
      </div>
    </main>
  );
}
