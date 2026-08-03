"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "60", unit: "FPS", label: "Consistent frame delivery" },
  { value: "0", unit: "Bloat", label: "Stripped of bloatware by design" },
  { value: "<2s", unit: "", label: "Cold app launch times" },
  { value: "100%", unit: "", label: "Play Integrity pass rate" },
];

const pillars = [
  {
    title: "Optimized Resource Usage",
    desc: "Strict background limits ensure your memory and battery are preserved for foreground tasks.",
    icon: "⚡",
  },
  {
    title: "Lightweight System Design",
    desc: "The system footprint is minimal by design. No redundant services, no wasted cycles.",
    icon: "🪶",
  },
  {
    title: "Stable Daily Performance",
    desc: "Tested thoroughly for stability. No random reboots or critical memory leaks.",
    icon: "🛡️",
  },
  {
    title: "Kernel-Level Tuning",
    desc: "CPU frequency adjustments, GPU scheduling, and I/O optimization for snappy app launches.",
    icon: "⚙️",
  },
];

export default function PerformanceScene() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const pillarsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stats counter animation
      const statEls = statsRef.current?.querySelectorAll(".stat-card");
      if (statEls) {
        gsap.fromTo(statEls,
          { opacity: 0, y: 40, scale: 0.9 },
          {
            opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power3.out",
            stagger: 0.15,
            scrollTrigger: { trigger: statsRef.current, start: "top 70%" }
          }
        );
      }

      const pillarEls = pillarsRef.current?.querySelectorAll(".pillar-card");
      if (pillarEls) {
        gsap.fromTo(pillarEls,
          { opacity: 0, x: -30 },
          {
            opacity: 1, x: 0, duration: 0.8, ease: "power3.out",
            stagger: 0.12,
            scrollTrigger: { trigger: pillarsRef.current, start: "top 65%" }
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 md:py-48 px-6 w-full overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[var(--color-axion-accent)] opacity-[0.03] blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto mb-20 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-axion-accent)] font-medium mb-4">Performance</p>
        <h2 className="text-5xl md:text-8xl font-bold tracking-tight text-white">
          Smoothness is <br className="hidden md:block" />a feature.
        </h2>
        <p className="mt-6 text-xl text-[var(--color-axion-text-secondary)] max-w-3xl mx-auto">
          Axion OS prioritizes long-term performance, responsive interactions, and stable daily usability instead of chasing unnecessary feature counts.
        </p>
      </div>

      {/* Stats Grid */}
      <div ref={statsRef} className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
        {stats.map((stat, i) => (
          <div key={i} className="stat-card glass-panel rounded-2xl p-6 text-center hover:border-[var(--color-axion-accent)]/20 transition-all duration-500">
            <div className="text-4xl md:text-5xl font-bold text-gradient">
              {stat.value}<span className="text-lg text-[var(--color-axion-accent)]">{stat.unit}</span>
            </div>
            <p className="text-xs md:text-sm text-[var(--color-axion-text-secondary)] mt-2">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Pillars */}
      <div ref={pillarsRef} className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {pillars.map((pillar, i) => (
          <div key={i} className="pillar-card glass-panel rounded-2xl p-8 flex gap-5 items-start hover:border-[var(--color-axion-accent)]/20 transition-all duration-500 group">
            <span className="text-3xl mt-1 group-hover:scale-110 transition-transform duration-300">{pillar.icon}</span>
            <div>
              <h4 className="text-lg font-bold text-white mb-2">{pillar.title}</h4>
              <p className="text-sm text-[var(--color-axion-text-secondary)] leading-relaxed">{pillar.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
