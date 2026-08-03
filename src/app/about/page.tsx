"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
  const bentoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = bentoRef.current?.querySelectorAll(".bento-box");
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 50, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.15,
            scrollTrigger: {
              trigger: bentoRef.current,
              start: "top 80%",
            },
          }
        );
      }
    }, bentoRef);

    return () => ctx.revert();
  }, []);

  return (
    <main className="min-h-screen bg-[var(--color-axion-bg)] pt-32 pb-24 px-6 relative overflow-hidden select-none">
      {/* Background ambient orbs */}
      <div className="absolute top-0 left-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#1e3a8a] opacity-10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#4c1d95] opacity-5 blur-[150px] pointer-events-none" />
      <div className="absolute top-[30%] left-[40%] w-[35vw] h-[35vw] rounded-full bg-[#0891b2] opacity-5 blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-20 animate-fade-in">
          <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-axion-accent)] font-bold mb-4">The Philosophy</p>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-white mb-6 leading-none">
            The idea behind Axion.
          </h1>
          <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto font-light leading-relaxed">
            A minimalist ROM. Fewer things, done exceptionally well.
          </p>
        </div>

        {/* Bento Grid (Pillars of the ROM) */}
        <div ref={bentoRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(280px,_auto)]">
          
          {/* Card 1: Purpose Built */}
          <div className="bento-box md:col-span-2 bg-white/[0.01] border border-white/5 rounded-[32px] p-8 md:p-12 flex flex-col justify-center relative overflow-hidden group hover:border-white/10 transition-colors duration-500 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-4 relative z-10 tracking-tight">
              Purpose Built.
            </h3>
            <p className="text-white/60 font-light leading-relaxed text-sm md:text-base relative z-10 max-w-2xl">
              Axion OS exists to challenge the idea that custom ROMs are just a copy of one another. We deliberately avoid cherry-picking major features from other projects to respect their original creators, and to push our own personal research and development boundaries.
            </p>
          </div>

          {/* Card 2: Clean & Smooth */}
          <div className="bento-box bg-white/[0.01] border border-white/5 rounded-[32px] p-8 md:p-10 flex flex-col justify-center relative overflow-hidden group hover:border-white/10 transition-colors duration-500 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-bl from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center mb-6 relative z-10">
              <div className="w-2.5 h-2.5 bg-white rounded-full" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3 relative z-10 tracking-tight">
              Clean & Smooth.
            </h3>
            <p className="text-white/60 font-light leading-relaxed text-xs md:text-sm relative z-10">
              Not a feature-focused ROM. Every change merged into our source code has a clear, definitive purpose to enhance daily reliability and performance.
            </p>
          </div>

          {/* Card 3: Engineered from Scratch */}
          <div className="bento-box bg-white/[0.01] border border-white/5 rounded-[32px] p-8 md:p-10 flex flex-col justify-center relative overflow-hidden group hover:border-white/10 transition-colors duration-500 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center mb-6 relative z-10">
              <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-3 relative z-10 tracking-tight">
              Engineered from scratch.
            </h3>
            <p className="text-white/60 font-light leading-relaxed text-xs md:text-sm relative z-10">
              We study how OEMs like Motorola, Pixel, and Samsung build their software, reverse-engineer the logic, and re-implement the features entirely using our own code to fit cleanly into AOSP. No OEM source code is copied.
            </p>
          </div>

          {/* Card 4: Modular Customization + The Goal */}
          <div className="bento-box md:col-span-2 bg-white/[0.01] border border-white/5 rounded-[32px] p-8 md:p-12 flex flex-col justify-center relative overflow-hidden group hover:border-white/10 transition-colors duration-500 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-tl from-zinc-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            <div className="flex flex-col md:flex-row gap-8 md:gap-16 relative z-10 h-full items-start md:items-center">
              <div className="flex-1">
                <h3 className="text-3xl font-extrabold text-white mb-4 tracking-tight">
                  Modular Customization.
                </h3>
                <p className="text-white/60 font-light leading-relaxed text-sm">
                  Minimalist by default, but flexible by design. Core components, like the theme engine, are built modularly. Customize deeply if you want to, or use it as-is without any extra clutter.
                </p>
              </div>
              <div className="flex-1 border-l border-white/5 pl-0 md:pl-8 pt-8 md:pt-0 border-t md:border-t-0 mt-8 md:mt-0 w-full font-mono text-xs">
                <h4 className="text-white font-bold text-sm tracking-tight mb-2 font-sans">The Ultimate Goal</h4>
                <p className="text-white/40 leading-loose">
                  Achieve perfect balance.<br />
                  Refine the polish.<br />
                  Guarantee long-term stability.<br />
                  <span className="text-[var(--color-axion-accent)] font-bold mt-4 block font-sans uppercase tracking-widest text-[9px]">Led by @rmp22.</span>
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </main>
  );
}
