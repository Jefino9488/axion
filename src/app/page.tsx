import HeroScene from "@/components/HeroScene";
import HomeScreenScene from "@/components/HomeScreenScene";
import FeatureShowcase from "@/components/FeatureShowcase";
import ResearchShowcase from "@/components/ResearchShowcase";
import ParticleBackground from "@/components/ParticleBackground";
import Footer from "@/components/Footer";

export default function Home() {
  const faqs = [
    {
      q: "Why is Axion OS a performance-oriented ROM?",
      a: "Axion OS incorporates various performance optimizations from ProtonAOSP, along with our own custom efficiency tweaks, to deliver a highly reactive, butter-smooth interface."
    },
    {
      q: "Can you add Feature XX?",
      a: "We do not add bloated features from other projects. That said, contributors are welcome to submit original features that align with Axion OS's goals and design direction. Feature requests are also welcome when they include a clear explanation of the idea and its purpose."
    },
    {
      q: "Is battery life good on Axion OS?",
      a: "Battery life depends on factors like kernel, usage, and configuration. Axion OS includes highly proactive efficiency optimizations designed to reduce background resource allocation."
    },
    {
      q: "Does Play Integrity pass?",
      a: (
        <span>
          Check{" "}
          <a
            href="https://github.com/AxionAOSP/PlayIntegrityFix/blob/lineage-22.1/keybox/README.md"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-axion-accent)] hover:underline font-semibold"
          >
            this guide
          </a>{" "}
          for detailed instructions.
        </span>
      )
    },
    {
      q: "Where are the customizations?",
      a: "Axion OS prioritizes performance over heavy customization, focusing on core aesthetics (like custom lockscreen clocks, theme stores, and adaptive palettes) to keep the UI native and fast."
    },
    {
      q: "How do I install Axion OS?",
      a: "Follow the detailed installation guide provided on each device's download page."
    }
  ];

  return (
    <main className="block w-full min-h-screen bg-[var(--color-axion-bg)] overflow-x-hidden relative">
      <ParticleBackground />

      <HeroScene />

      <div className="w-full relative z-10">
        <HomeScreenScene />

        <FeatureShowcase />

        <ResearchShowcase />

        <section id="faq" className="py-32 max-w-4xl mx-auto border-t border-white/5 px-6 relative z-10 select-none">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-axion-accent)] font-medium mb-4">Support Grid</p>
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight">FAQ.</h2>
          </div>
          
          <div className="space-y-1">
            {faqs.map((faq, idx) => (
              <details key={idx} className="group border-b border-white/5 py-6">
                <summary className="flex justify-between items-center text-left text-lg md:text-xl font-medium text-white/70 hover:text-white cursor-pointer select-none transition-colors duration-300">
                  <span>{faq.q}</span>
                  <span className="relative flex items-center justify-center w-6 h-6 ml-4">
                    <span className="absolute w-4 h-[2px] bg-white/40 group-open:rotate-90 group-open:bg-[var(--color-axion-accent)] transition-all duration-300" />
                    <span className="absolute w-[2px] h-4 bg-white/40 group-open:opacity-0 group-open:bg-[var(--color-axion-accent)] transition-all duration-300" />
                  </span>
                </summary>
                <div className="mt-4 text-white/40 font-light leading-relaxed text-sm md:text-base max-w-4xl transition-all duration-300">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </section>

        <Footer />
      </div>
    </main>
  );
}
