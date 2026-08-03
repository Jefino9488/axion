"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function CustomizationScene() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gridRef.current?.querySelectorAll(".cust-card");
      if (cards) {
        gsap.fromTo(cards,
          { opacity: 0, y: 60, scale: 0.95 },
          {
            opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power3.out",
            stagger: 0.12,
            scrollTrigger: { trigger: sectionRef.current, start: "top 60%" }
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 md:py-48 px-6 w-full overflow-hidden">
      <div className="max-w-6xl mx-auto mb-20 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-axion-accent)] font-medium mb-4">Customization</p>
        <h2 className="text-5xl md:text-8xl font-bold tracking-tight text-white">
          Every pixel, tuned.
        </h2>
        <p className="mt-6 text-xl text-[var(--color-axion-text-secondary)] max-w-2xl mx-auto">
          Clock faces, icon scaling, launcher blur, notification dots, wallpaper zoom — granular control over every surface of your device.
        </p>
      </div>

      <div ref={gridRef} className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Clock Customization */}
        <div className="cust-card glass-panel rounded-3xl p-6 group hover:border-[var(--color-axion-accent)]/20 transition-all duration-500">
          <div className="relative aspect-[9/16] rounded-2xl overflow-hidden mb-4">
            <Image src="/screenshots/photo_15_2026-08-02_22-34-34.jpg" alt="Clock face style selection" fill className="object-cover object-top transition-transform duration-700 group-hover:scale-105" />
          </div>
          <h3 className="text-lg font-bold text-white">Clock Faces</h3>
          <p className="text-sm text-[var(--color-axion-text-secondary)] mt-1">Multiple styles, graffiti angles, dual-tone options, and depth effects.</p>
        </div>

        {/* Clock Colors */}
        <div className="cust-card glass-panel rounded-3xl p-6 group hover:border-[var(--color-axion-accent)]/20 transition-all duration-500">
          <div className="relative aspect-[9/16] rounded-2xl overflow-hidden mb-4">
            <Image src="/screenshots/photo_14_2026-08-02_22-34-34.jpg" alt="Clock color and info display customization" fill className="object-cover object-top transition-transform duration-700 group-hover:scale-105" />
          </div>
          <h3 className="text-lg font-bold text-white">Colors & Info</h3>
          <p className="text-sm text-[var(--color-axion-text-secondary)] mt-1">Choose clock colors, date positions, and what info to show — media, alarms, or smartspace.</p>
        </div>

        {/* Launcher Settings */}
        <div className="cust-card glass-panel rounded-3xl p-6 group hover:border-[var(--color-axion-accent)]/20 transition-all duration-500">
          <div className="relative aspect-[9/16] rounded-2xl overflow-hidden mb-4">
            <Image src="/screenshots/photo_13_2026-08-02_22-34-34.jpg" alt="Launcher general settings with scale and blur controls" fill className="object-cover object-top transition-transform duration-700 group-hover:scale-105" />
          </div>
          <h3 className="text-lg font-bold text-white">Launcher Tuning</h3>
          <p className="text-sm text-[var(--color-axion-text-secondary)] mt-1">Home & drawer icon scaling, notification dots, wallpaper zoom, blur radius — all yours.</p>
        </div>

        {/* Recents */}
        <div className="cust-card glass-panel rounded-3xl p-6 group hover:border-[var(--color-axion-accent)]/20 transition-all duration-500">
          <div className="relative aspect-[9/16] rounded-2xl overflow-hidden mb-4">
            <Image src="/screenshots/photo_11_2026-08-02_22-34-34.jpg" alt="Recents settings with action buttons" fill className="object-cover object-top transition-transform duration-700 group-hover:scale-105" />
          </div>
          <h3 className="text-lg font-bold text-white">Recents</h3>
          <p className="text-sm text-[var(--color-axion-text-secondary)] mt-1">Lock apps, screenshot tasks, select text, freeform windows, and memory info — all configurable.</p>
        </div>

        {/* Power Menu */}
        <div className="cust-card glass-panel rounded-3xl p-6 group hover:border-[var(--color-axion-accent)]/20 transition-all duration-500">
          <div className="relative aspect-[9/16] rounded-2xl overflow-hidden mb-4">
            <Image src="/screenshots/photo_8_2026-08-02_22-34-34.jpg" alt="Power menu with emergency lockdown restart screenshot" fill className="object-cover object-center transition-transform duration-700 group-hover:scale-105" />
          </div>
          <h3 className="text-lg font-bold text-white">Power Menu</h3>
          <p className="text-sm text-[var(--color-axion-text-secondary)] mt-1">Emergency, lockdown, screenshot — a beautiful glass power dialog.</p>
        </div>

        {/* Routines */}
        <div className="cust-card glass-panel rounded-3xl p-6 group hover:border-[var(--color-axion-accent)]/20 transition-all duration-500">
          <div className="relative aspect-[9/16] rounded-2xl overflow-hidden mb-4">
            <Image src="/screenshots/photo_10_2026-08-02_22-34-34.jpg" alt="Routines automation screen" fill className="object-cover object-top transition-transform duration-700 group-hover:scale-105" />
          </div>
          <h3 className="text-lg font-bold text-white">Routines</h3>
          <p className="text-sm text-[var(--color-axion-text-secondary)] mt-1">Create intelligent workflows that adapt to your habits, with export/import for backup.</p>
        </div>
      </div>
    </section>
  );
}
