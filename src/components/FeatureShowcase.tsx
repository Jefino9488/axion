"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    label: "Dynamic Bar",
    title: "Live interactions, without interrupting your flow.",
    description: "Dynamic Bar transforms the status area into an adaptive interaction layer that keeps important information accessible, glanceable, and fluid.",
    image: "/assets/dynamicbar.webp",
    aspect: "aspect-[16/9]",
  },
  {
    label: "Game Space",
    title: "Built to keep up.",
    description: "Unlock max FPS with hardware spoofing and a dedicated game space to manage performance profiles on the fly. Smooth, consistent, uncompromising.",
    image: "/assets/gamespace.webp",
    aspect: "aspect-[16/9]",
  },
  {
    label: "Security",
    title: "Pass every check. Out of the box.",
    description: "Built-in Play Integrity Fix, Tricky Store, and HideMyApplist. Pass strict security and banking checks right out of the box.",
    image: "/assets/trickystore.webp",
    aspect: "aspect-[16/9]",
  },
  {
    label: "Essentials",
    title: "A clean notification shade.",
    description: "A reimagined, essential notification shade prioritizing what actually matters, stripping away unnecessary visual clutter.",
    image: "/assets/essential.webp",
    aspect: "aspect-[16/9]",
  },
  {
    label: "AxPC Mode",
    title: "Your phone becomes a desktop.",
    description: "Transform your device into a desktop workstation. AxPC mode brings true windowed multitasking to your external displays.",
    image: "/assets/axpcmode.webp",
    aspect: "aspect-[16/9]",
  },
];

export default function FeatureShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card) => {
        if (!card) return;
        gsap.fromTo(card,
          { opacity: 0, y: 80, scale: 0.96 },
          {
            opacity: 1, y: 0, scale: 1, duration: 1, ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 80%", end: "bottom 60%", scrub: 0.3 }
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-32 md:py-48 px-6 w-full">
      <div className="max-w-6xl mx-auto mb-20 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-axion-accent)] font-medium mb-4">Features</p>
        <h2 className="text-5xl md:text-8xl font-bold tracking-tight text-white">
          Wait, there&apos;s more.
        </h2>
        <p className="mt-6 text-xl text-[var(--color-axion-text-secondary)] max-w-2xl mx-auto">
          The little things that make a massive difference.
        </p>
      </div>

      <div className="max-w-6xl mx-auto flex flex-col gap-16">
        {features.map((feature, i) => (
          <div
            key={i}
            ref={(el) => { if (el) cardsRef.current[i] = el; }}
            className={`flex flex-col ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-10`}
          >
            {/* Text */}
            <div className="flex-1 space-y-4">
              <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-axion-accent)] font-medium">{feature.label}</p>
              <h3 className="text-3xl md:text-5xl font-bold text-white tracking-tight">{feature.title}</h3>
              <p className="text-lg text-[var(--color-axion-text-secondary)] leading-relaxed">{feature.description}</p>
            </div>

            {/* Visual */}
            <div className="flex-1 w-full">
              <div className={`relative ${feature.aspect} rounded-2xl overflow-hidden glass-panel group`}>
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
