"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const clockStyles = [
  { src: "/assets/clock1.webp", name: "Analog", desc: "Minimalist precision tick marks" },
  { src: "/assets/clock2.webp", name: "Modern Flip", desc: "Retro typography display" },
  { src: "/assets/clock3.webp", name: "Bold Numeric", desc: "Ultra-heavy weight display" },
  { src: "/assets/clock4.webp", name: "Dot Matrix", desc: "Nothing-inspired dotted aesthetic" },
  { src: "/assets/clock5.webp", name: "Stencil", desc: "Industrial outline font" },
];

const depthWallpapers = [
  { src: "/assets/depth1.webp", title: "Air Jordan 3D", tag: "Sports" },
  { src: "/assets/depth2.webp", title: "London Mist", tag: "Urban" },
  { src: "/assets/depth3.webp", title: "Burj Horizon", tag: "Architecture" },
  { src: "/assets/depth4.webp", title: "Porsche 911", tag: "Automotive" },
  { src: "/assets/depth5.webp", title: "Tower of Pisa", tag: "Landmark" },
];

export default function HeroScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Text references
  const heroTextContainerRef = useRef<HTMLDivElement>(null);
  const heroTextEntryRef = useRef<HTMLDivElement>(null);
  const lockscreenTextRef = useRef<HTMLDivElement>(null);
  const depthTextRef = useRef<HTMLDivElement>(null);
  const clockTextsRef = useRef<(HTMLDivElement | null)[]>([]);
  
  // Phone references
  const phonesContainerRef = useRef<HTMLDivElement>(null);
  const phoneEntryRef = useRef<HTMLDivElement>(null);
  
  const mainWallpaperRef = useRef<HTMLImageElement>(null);
  const depthWallpaperRef = useRef<HTMLImageElement>(null);
  
  // Array of clock refs
  const clocksRef = useRef<(HTMLDivElement | null)[]>([]);
  
  // Extra phones refs
  const extraPhone1Ref = useRef<HTMLDivElement>(null);
  const extraPhone2Ref = useRef<HTMLDivElement>(null);
  const extraPhone4Ref = useRef<HTMLDivElement>(null);
  const extraPhone5Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial setup
    gsap.set(lockscreenTextRef.current, { opacity: 0, y: 40 });
    gsap.set(depthTextRef.current, { opacity: 0, y: 40 });
    gsap.set(clocksRef.current, { opacity: 0, scale: 0.9 });
    gsap.set(clockTextsRef.current, { opacity: 0, y: 20 });
    gsap.set(depthWallpaperRef.current, { opacity: 0 });
    
    // Ensure phones container starts at default y: 0 (which is bottom-[-15vh])
    gsap.set(phonesContainerRef.current, { y: 0, scale: 1 });

    gsap.set([extraPhone1Ref.current, extraPhone2Ref.current, extraPhone4Ref.current, extraPhone5Ref.current], { 
      opacity: 0, 
      x: 0,
      scale: 0.9 // Keep them slightly scaled down before fanning out
    });

    const ctx = gsap.context(() => {
      // 1. Decoupled Entry animations
      gsap.fromTo(heroTextEntryRef.current, 
        { opacity: 0, y: 40, filter: "blur(10px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.2, ease: "power3.out", delay: 0.3 }
      );
      gsap.fromTo(phoneEntryRef.current,
        { opacity: 0, y: 100 },
        { opacity: 1, y: 0, duration: 1.4, ease: "power3.out", delay: 0.5 }
      );

      // 2. The Grand Scroll Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=900%", // Very long scroll for slow, cinematic transitions
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      // ---- STAGE 1: Zoom to Lockscreen ----
      tl.to(heroTextContainerRef.current, { opacity: 0, y: -80, filter: "blur(20px)", duration: 1 }, 0)
        .to(phonesContainerRef.current, {
          y: "-26vh", // Pulls it perfectly into view
          scale: 1.6, // Reduced zoom so the phone fits on screen comfortably
          duration: 1.5,
          ease: "power2.inOut",
        }, 0)
        .to(mainWallpaperRef.current, {
          filter: "blur(8px) brightness(0.6)",
          duration: 1,
        }, 0.5)
        .to(lockscreenTextRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
        }, 1)
        // Fade out the main lockscreen text to make room for clock descriptions
        .to(lockscreenTextRef.current, {
          opacity: 0,
          y: -20,
          duration: 0.6,
        }, 2);

      // ---- STAGE 2: Sequential Clock Application ----
      let currentTime = 2.6; // Start after zoom and lockscreen text fade
      const clockDuration = 0.5;
      const clockHold = 0.4;

      clockStyles.forEach((clock, i) => {
        // Fade in Clock UI and Text
        tl.to(clocksRef.current[i], { opacity: 1, scale: 1, duration: clockDuration }, currentTime);
        tl.to(clockTextsRef.current[i], { opacity: 1, y: 0, duration: clockDuration }, currentTime);
        
        currentTime += clockDuration + clockHold;
        
        // Fade out Clock UI and Text
        tl.to(clocksRef.current[i], { opacity: 0, scale: 1.05, duration: clockDuration }, currentTime);
        tl.to(clockTextsRef.current[i], { opacity: 0, y: -20, duration: clockDuration }, currentTime);
        
        currentTime += clockDuration;
      });

      // ---- STAGE 3: Zoom Out Before Splitting ----
      tl.addLabel("zoomOut", currentTime);
      tl.to(phonesContainerRef.current, {
        scale: 1.1, // Reset scale slightly above 1 for good presence
        y: "-5vh",  // Rest it comfortably near the bottom
        duration: 1.5,
        ease: "power3.inOut"
      }, "zoomOut");
      
      currentTime += 1.5;

      // ---- STAGE 4: Split to Depth Wallpapers ----
      tl.addLabel("stage4", currentTime);

      tl.to(depthTextRef.current, { opacity: 1, y: 0, duration: 0.8 }, "stage4")
        // Main phone changes wallpaper
        .to(depthWallpaperRef.current, { opacity: 1, duration: 1 }, "stage4")
        
        // Phones fan out overlapping!
        .to(extraPhone1Ref.current, { opacity: 1, x: -360, scale: 0.9, rotation: -4, duration: 1.5, ease: "power3.out" }, "stage4")
        .to(extraPhone2Ref.current, { opacity: 1, x: -180, scale: 0.95, rotation: -2, duration: 1.5, ease: "power3.out" }, "stage4")
        .to(extraPhone4Ref.current, { opacity: 1, x: 180, scale: 0.95, rotation: 2, duration: 1.5, ease: "power3.out" }, "stage4")
        .to(extraPhone5Ref.current, { opacity: 1, x: 360, scale: 0.9, rotation: 4, duration: 1.5, ease: "power3.out" }, "stage4");
        
      // Add a buffer at the end so it doesn't instantly unpin
      tl.to({}, { duration: 1.5 });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Helper for extra phones (Depth Wallpapers)
  const DepthPhone = ({ wp, innerRef }: { wp: any, innerRef: React.Ref<HTMLDivElement> }) => (
    <div ref={innerRef} className="absolute w-[280px] md:w-[320px] aspect-[9/19] rounded-[2.8rem] border-[3px] border-white/10 overflow-hidden shadow-2xl bg-black">
      <Image src={wp.src} alt={wp.title} fill className="object-cover" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/90 to-transparent z-10 flex flex-col justify-end p-4">
        <span className="text-[10px] uppercase tracking-widest text-[var(--color-axion-accent)] font-semibold truncate">{wp.tag}</span>
        <h5 className="text-sm font-bold text-white truncate">{wp.title}</h5>
      </div>
    </div>
  );

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-[var(--color-axion-bg)] text-white flex flex-col justify-center items-center">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-[var(--color-axion-accent)] opacity-[0.08] blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[var(--color-axion-accent-secondary)] opacity-[0.06] blur-[130px] rounded-full pointer-events-none" />

      {/* Main Titles - Pushed down to top-[18vh] */}
      <div className="absolute top-[18vh] inset-x-0 z-40 flex flex-col items-center justify-center pointer-events-none">
        
        {/* Stage 0 Text (Decoupled refs to fix scroll reverse bug) */}
        <div ref={heroTextContainerRef} className="absolute flex flex-col items-center text-center">
          <div ref={heroTextEntryRef} className="flex flex-col items-center text-center">
            <h1 className="text-7xl md:text-[8rem] font-bold tracking-[-0.02em] leading-[0.85] mb-6 text-white whitespace-nowrap">
              AXION <span className="text-gradient">OS</span>
            </h1>
            <p className="text-xl md:text-2xl text-[var(--color-axion-text-secondary)] font-medium text-center">
              The Next Evolution.
            </p>
          </div>
        </div>

        {/* Stage 1 Text */}
        <div ref={lockscreenTextRef} className="absolute flex flex-col items-center text-center">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 whitespace-nowrap">
            LOCKSCREEN CUSTOMIZATION
          </h2>
          <p className="text-xl text-[var(--color-axion-text-secondary)]">Your first impression.</p>
        </div>

        {/* Stage 4 Text */}
        <div ref={depthTextRef} className="absolute flex flex-col items-center text-center">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 whitespace-nowrap text-gradient">
            DEPTH EFFECT
          </h2>
          <p className="text-xl text-[var(--color-axion-text-secondary)]">Subject, meet clock.</p>
        </div>
      </div>

      {/* Dynamic Clock Descriptions - Adjusted to bottom-[15vh] */}
      <div className="absolute bottom-[15vh] inset-x-0 z-40 flex justify-center pointer-events-none">
        {clockStyles.map((clock, i) => (
          <div key={i} ref={el => clockTextsRef.current[i] = el} className="absolute flex flex-col items-center text-center">
            <h3 className="text-3xl font-bold text-[var(--color-axion-accent)] mb-2 tracking-wide">{clock.name}</h3>
            <p className="text-lg text-white/80">{clock.desc}</p>
          </div>
        ))}
      </div>

      {/* The Phones Container - ANCHORED TO BOTTOM */}
      <div ref={phonesContainerRef} className="absolute inset-x-0 bottom-[-15vh] flex justify-center items-end pointer-events-none z-30">
        
        <DepthPhone wp={depthWallpapers[0]} innerRef={extraPhone1Ref} />
        <DepthPhone wp={depthWallpapers[1]} innerRef={extraPhone2Ref} />
        <DepthPhone wp={depthWallpapers[3]} innerRef={extraPhone4Ref} />
        <DepthPhone wp={depthWallpapers[4]} innerRef={extraPhone5Ref} />

        {/* Main Phone */}
        <div ref={phoneEntryRef} className="relative w-[280px] md:w-[320px] aspect-[9/19] rounded-[2.8rem] border-[4px] border-[#1a1a1a] overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.8)] bg-black z-20">
          
          {/* Default Clean Wallpaper */}
          <Image
            ref={mainWallpaperRef}
            src="/screenshots/photo_1_2026-08-02_22-34-34.jpg"
            alt="Axion OS Lockscreen"
            fill
            className="object-cover filter brightness-[0.95]"
            priority
          />
          
          {/* Sequential Clock Overlays - strictly contained to top 30% */}
          <div className="absolute top-[8%] inset-x-0 h-[28%] flex items-center justify-center z-10 pointer-events-none">
            {clockStyles.map((clock, i) => (
              <div 
                key={i} 
                ref={el => clocksRef.current[i] = el}
                className="absolute inset-0 flex items-center justify-center px-10"
              >
                <Image src={clock.src} alt={clock.name} fill className="object-contain drop-shadow-2xl" />
              </div>
            ))}
          </div>

          {/* Depth Wallpaper (fades in on top of everything at Stage 4) */}
          <div ref={depthWallpaperRef} className="absolute inset-0 z-30">
            <Image
              src={depthWallpapers[2].src} // Burj Horizon
              alt="Depth Center"
              fill
              className="object-cover"
            />
            {/* Text label for the center phone to match the others */}
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/90 to-transparent z-10 flex flex-col justify-end p-4">
              <span className="text-[10px] uppercase tracking-widest text-[var(--color-axion-accent)] font-semibold truncate">{depthWallpapers[2].tag}</span>
              <h5 className="text-sm font-bold text-white truncate">{depthWallpapers[2].title}</h5>
            </div>
          </div>

          {/* Notch */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-full z-40" />
        </div>

      </div>
    </section>
  );
}

