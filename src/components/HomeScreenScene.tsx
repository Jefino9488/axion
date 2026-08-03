"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function HomeScreenScene() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(contentRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1, y: 0, duration: 1.2, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 65%" }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 md:py-48 px-6 w-full overflow-hidden">
      <div className="max-w-6xl mx-auto mb-20 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-axion-accent)] font-medium mb-4">Home Screen</p>
        <h2 className="text-5xl md:text-8xl font-bold tracking-tight text-white">
          Made to be yours.
        </h2>
      </div>

      <div ref={contentRef} className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Home Screen with customization menu */}
          <div className="md:col-span-2 glass-panel rounded-3xl p-6 relative overflow-hidden group">
            <div className="relative aspect-[9/16] md:aspect-[16/10] rounded-2xl overflow-hidden">
              <Image
                src="/screenshots/photo_5_2026-08-02_22-34-34.jpg"
                alt="Axion OS home screen with customization menu showing wallpaper, widgets, icons options"
                fill
                className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>
            <div className="mt-4">
              <h3 className="text-xl font-bold text-white">Full Launcher Customization</h3>
              <p className="text-sm text-[var(--color-axion-text-secondary)] mt-1">Wallpaper, widgets, icon packs, app drawer scaling, blur radius — everything is tuneable.</p>
            </div>
          </div>

          {/* App drawer */}
          <div className="glass-panel rounded-3xl p-6 relative overflow-hidden group">
            <div className="relative aspect-[9/19] rounded-2xl overflow-hidden">
              <Image
                src="/screenshots/photo_12_2026-08-02_22-34-34.jpg"
                alt="Axion OS app drawer with search"
                fill
                className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="mt-4">
              <h3 className="text-xl font-bold text-white">App Drawer</h3>
              <p className="text-sm text-[var(--color-axion-text-secondary)] mt-1">Searchable, scalable, and blazing fast.</p>
            </div>
          </div>
        </div>

        {/* Widgets & Folders Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          {/* Volume Panel */}
          <div className="glass-panel rounded-3xl p-6 relative overflow-hidden group">
            <div className="relative aspect-[9/16] rounded-2xl overflow-hidden">
              <Image
                src="/screenshots/photo_6_2026-08-02_22-34-34.jpg"
                alt="Axion OS volume panel with per-stream controls"
                fill
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>
            <div className="mt-4">
              <h3 className="text-xl font-bold text-white">Volume Panel</h3>
              <p className="text-sm text-[var(--color-axion-text-secondary)] mt-1">Granular control over media, call, ring, notification, and alarm volumes with a beautiful glass UI.</p>
            </div>
          </div>

          {/* Folders & Widgets */}
          <div className="glass-panel rounded-3xl p-6 relative overflow-hidden group">
            <div className="relative aspect-[9/16] rounded-2xl overflow-hidden">
              <Image
                src="/screenshots/photo_9_2026-08-02_22-34-34.jpg"
                alt="Axion OS home screen with folder and year progress widget"
                fill
                className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>
            <div className="mt-4">
              <h3 className="text-xl font-bold text-white">Smart Folders & Widgets</h3>
              <p className="text-sm text-[var(--color-axion-text-secondary)] mt-1">Categorized app folders with themed backgrounds. Year progress widgets built right in.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
