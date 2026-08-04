"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const basePath = process.env.NODE_ENV === 'production' ? '/axion' : '';
const ss = (name: string) => `${basePath}/screenshots/axion_ss/${name}`;

/* ───────────────────────────── FEATURE GROUPS ───────────────────────────── */

const featureGroups = [
  {
    id: "dynamic-bar",
    label: "Dynamic Bar",
    title: "Your status bar,\ncome alive.",
    description: "A smart status bar chip that reacts to live events — music, timers, recording, calls — all without leaving your flow.",
    accent: "rgba(0, 210, 180, 0.3)",
    screens: [
      { src: ss("music_player.jpg"), caption: "Music Player" },
      { src: ss("multi_activity.jpg"), caption: "Multi-Activity" },
      { src: ss("full_player.jpg"), caption: "Full Player" },
      { src: ss("recorder.jpg"), caption: "Recorder" },
      { src: ss("settings_feature.jpg"), caption: "Settings" },
    ],
  },
  {
    id: "theme-store",
    label: "Theme Store",
    title: "Your ROM,\nyour canvas.",
    description: "Custom fingerprint icons, animations, media waveforms, and icon packs — downloadable from the built-in Theme Store.",
    accent: "rgba(120, 80, 255, 0.3)",
    screens: [
      { src: ss("theme_store.jpg"), caption: "Theme Manager" },
      { src: ss("axion_icons.jpg"), caption: "Axion Icons" },
      { src: ss("axion_fx.jpg"), caption: "AxionFx Audio" },
    ],
  },
  {
    id: "lockscreen",
    label: "Lockscreen Studio",
    title: "First impression.\nPerfected.",
    description: "Depth effect wallpapers, custom clock faces with graffiti angles, dual-tone styles, widget placement — all from one editor.",
    accent: "rgba(255, 160, 40, 0.3)",
    screens: [
      { src: ss("clock_editor.jpg"), caption: "Clock Editor" },
      { src: ss("style_picker.jpg"), caption: "Style Picker" },
      { src: ss("dual_tone.jpg"), caption: "Dual Tone" },
      { src: ss("depth_effect.jpg"), caption: "Depth Effect" },
    ],
  },
  {
    id: "game-space",
    label: "Game Space",
    title: "Built to\nkeep up.",
    description: "Dedicated game dashboard with per-game CPU profiles, bypass charging, danmaku notifications, and FPS unlocking.",
    accent: "rgba(40, 80, 255, 0.3)",
    screens: [
      { src: ss("game_library.jpg"), caption: "Game Library" },
      { src: ss("game_settings.jpg"), caption: "Settings" },
      { src: ss("per_game_profiles.jpg"), caption: "Per-Game Profiles" },
      { src: ss("axpc_mode.jpg"), caption: "AxPC Mode" },
    ],
  },
  {
    id: "routines",
    label: "Routines",
    title: "Automate.\nEverything.",
    description: "Create custom automation routines with import/export backup. Set triggers, conditions, and actions — all without root.",
    accent: "rgba(255, 80, 120, 0.3)",
    screens: [
      { src: ss("routines_1.jpg"), caption: "Routines Manager" },
      { src: ss("routines_2.jpg"), caption: "Automation Setup" },
      { src: ss("routines_3.jpg"), caption: "Triggers & Actions" },
      { src: ss("routines_4.jpg"), caption: "Import & Export" },
    ],
  },
  {
    id: "cpu-kernel",
    label: "CPU & Kernel",
    title: "Raw power.\nUnleashed.",
    description: "Fine-tune CPU governors, per-core frequencies, and thermal profiles. Full kernel-level control for enthusiasts.",
    accent: "rgba(255, 180, 0, 0.3)",
    screens: [
      { src: ss("kernel_manager.jpg"), caption: "Kernel Manager" },
    ],
  },
  {
    id: "sandbox",
    label: "Sandbox",
    title: "Private space.\nLocked down.",
    description: "A fully isolated environment for apps and files. Separate notifications, locked vault, zero data leakage.",
    accent: "rgba(0, 180, 180, 0.3)",
    screens: [
      { src: ss("locked_notifications.jpg"), caption: "Locked Notifications" },
      { src: ss("vault_files.jpg"), caption: "Vault & Files" },
      { src: ss("sandbox_space.jpg"), caption: "Sandbox Isolation" },
    ],
  },
  {
    id: "recents",
    label: "Recents & Launcher",
    title: "Every detail.\nTuned.",
    description: "Custom recents actions (lock app, freeform, memory info), launcher scaling, blur control, smart app categories, and folder widgets.",
    accent: "rgba(180, 100, 255, 0.3)",
    screens: [
      { src: ss("recents_settings.jpg"), caption: "Recents Settings" },
      { src: ss("launcher_scaling.jpg"), caption: "Launcher Scaling" },
      { src: ss("app_folders.jpg"), caption: "App Folders" },
      { src: ss("smart_categories.jpg"), caption: "Smart Categories" },
    ],
  },
];

/* ────────────────────────── PHONE FRAME COMPONENT ───────────────────────── */

function PhoneFrame({ src, caption, className = "", style = {} }: { src: string; caption: string; className?: string; style?: React.CSSProperties }) {
  return (
    <div className={`relative flex-shrink-0 snap-center ${className}`} style={style}>
      <div className="relative w-[180px] md:w-[220px] aspect-[9/20.5] rounded-[1.5rem] border-[3px] border-white/10 overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.6)] bg-black group transition-transform duration-500 hover:scale-[1.03]">
        <Image src={src} alt={caption} fill className="object-cover object-top" />
        {/* Notch */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-black rounded-full z-10" />
        {/* Caption overlay */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/80 to-transparent z-10 flex items-end justify-center pb-3">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-white/80">{caption}</span>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────── WIDE FRAME (landscape mode) ────────────────────── */

function WideFrame({ src, caption, className = "" }: { src: string; caption: string; className?: string }) {
  return (
    <div className={`relative flex-shrink-0 snap-center ${className}`}>
      <div className="relative w-[340px] md:w-[440px] aspect-[16/9] rounded-[1.2rem] border-[3px] border-white/10 overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.6)] bg-black group transition-transform duration-500 hover:scale-[1.03]">
        <Image src={src} alt={caption} fill className="object-cover object-top" />
        <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/80 to-transparent z-10 flex items-end justify-center pb-2">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-white/80">{caption}</span>
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────── FEATURE ROW COMPONENT ────────────────────────── */

function FeatureRow({ group, index }: { group: typeof featureGroups[0]; index: number }) {
  const rowRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const screensRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate text in
      gsap.fromTo(textRef.current,
        { opacity: 0, y: 60, filter: "blur(8px)" },
        {
          opacity: 1, y: 0, filter: "blur(0px)", duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: rowRef.current, start: "top 85%", end: "top 50%", scrub: 0.5 }
        }
      );

      // Animate phones in with stagger
      const phones = screensRef.current?.children;
      if (phones) {
        gsap.fromTo(phones,
          { opacity: 0, y: 80, scale: 0.9 },
          {
            opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power3.out",
            stagger: 0.12,
            scrollTrigger: { trigger: rowRef.current, start: "top 80%", end: "top 40%", scrub: 0.5 }
          }
        );
      }
    }, rowRef);

    return () => ctx.revert();
  }, []);

  const isReversed = index % 2 !== 0;
  const isLandscape = group.id === "game-space";

  return (
    <div
      ref={rowRef}
      className={`relative flex flex-col ${isReversed ? "md:flex-row-reverse" : "md:flex-row"} items-center gap-10 md:gap-16 py-20 md:py-32`}
    >
      {/* Ambient glow behind */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none opacity-40"
        style={{ background: group.accent }}
      />

      {/* Text Block */}
      <div ref={textRef} className="w-full flex-shrink-0 md:w-[38%] space-y-5 relative z-10 text-center md:text-left">
        <p className="text-xs uppercase tracking-[0.35em] text-[var(--color-axion-accent)] font-semibold">{group.label}</p>
        <h3 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-[1.05] whitespace-pre-line">{group.title}</h3>
        <p className="text-base md:text-lg text-[var(--color-axion-text-secondary)] leading-relaxed max-w-md mx-auto md:mx-0">{group.description}</p>
      </div>

      {/* Screens Block */}
      <div ref={screensRef} className={`flex-1 w-full md:w-auto relative z-10 flex items-center md:items-end ${group.screens.length === 1 ? "justify-center" : "justify-start"} md:justify-center gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none hide-scrollbar pb-8 md:pb-0 pt-6 md:pt-0 px-6 md:px-0 -mx-6 md:mx-0`}>
        {group.screens.map((screen, i) => {
          // Stagger vertical offset for visual interest
          const yOffset = i % 2 === 0 ? 0 : 24;

          if (isLandscape && (screen.caption === "Game Library" || screen.caption === "Settings" || screen.caption === "Per-Game Profiles" || screen.caption === "AxPC Mode")) {
            return <WideFrame key={i} src={screen.src} caption={screen.caption} className={i % 2 === 0 ? "" : "md:mt-6"} />;
          }

          return (
            <PhoneFrame
              key={i}
              src={screen.src}
              caption={screen.caption}
              style={{ transform: `translateY(${yOffset}px)` }}
            />
          );
        })}
      </div>
    </div>
  );
}

/* ───────────────────────── MAIN COMPONENT ───────────────────────────────── */

export default function FeatureShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current,
        { opacity: 0, y: 60, filter: "blur(10px)" },
        {
          opacity: 1, y: 0, filter: "blur(0px)", duration: 1.2, ease: "power3.out",
          scrollTrigger: { trigger: headerRef.current, start: "top 85%", end: "top 60%", scrub: 0.5 }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full py-32 md:py-48 px-6 overflow-hidden">
      {/* Section Header */}
      <div ref={headerRef} className="max-w-5xl mx-auto mb-10 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-axion-accent)] font-medium mb-4">Exclusive Features</p>
        <h2 className="text-5xl md:text-8xl font-bold tracking-tight text-white">
          Made to be yours.
        </h2>
        <p className="mt-6 text-xl text-[var(--color-axion-text-secondary)] max-w-2xl mx-auto">
          Every feature designed in-house. No compromises, no leftovers.
        </p>
      </div>

      {/* Feature Rows */}
      <div className="max-w-7xl mx-auto">
        {featureGroups.map((group, i) => (
          <FeatureRow key={group.id} group={group} index={i} />
        ))}
      </div>
    </section>
  );
}
