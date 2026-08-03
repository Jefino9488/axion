"use client";

import { Search, Smartphone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useMemo, useEffect, useRef } from "react";

export type Device = {
  codename: string;
  name: string;
  brand: string;
  status: string;
  maintainer_ids: string[];
  support_group?: string;
  images: {
    banner: string;
    fallback: string;
  };
  guide?: string;
};

export type Maintainer = {
  id: string;
  name: string;
  github_username: string;
};

export default function DevicesClient({
  devices,
  maintainers,
}: {
  devices: Device[];
  maintainers: Record<string, Maintainer>;
}) {
  const [search, setSearch] = useState("");
  const [selectedBrand, setSelectedBrand] = useState<string>("All");
  const [hoveredDevice, setHoveredDevice] = useState<Device | null>(null);
  const [activeDevice, setActiveDevice] = useState<Device | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const brands = useMemo(() => {
    const b = new Set(devices.map((d) => d.brand.toLowerCase()));
    return ["All", ...Array.from(b).sort()];
  }, [devices]);

  const filteredDevices = useMemo(() => {
    return devices.filter((device) => {
      const matchesSearch =
        device.name.toLowerCase().includes(search.toLowerCase()) ||
        device.codename.toLowerCase().includes(search.toLowerCase());
      const matchesBrand =
        selectedBrand === "All" || device.brand.toLowerCase() === selectedBrand;
      return matchesSearch && matchesBrand;
    });
  }, [devices, search, selectedBrand]);

  useEffect(() => {
    if (!listRef.current) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const codename = entry.target.getAttribute("data-device");
            const device = devices.find((d) => d.codename === codename);
            if (device) setActiveDevice(device);
          }
        });
      },
      // Triggers when the item hits the middle 20% of the viewport height
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
    );

    const children = Array.from(listRef.current.querySelectorAll("[data-device]"));
    children.forEach((child) => observer.observe(child));

    // Cleanup
    return () => {
      observer.disconnect();
    };
  }, [filteredDevices, devices]);

  // Priority: explicit mouse hover first, fallback to scroll-spy active device
  const displayedDevice = hoveredDevice || activeDevice;

  return (
    <div className="w-full relative min-h-screen">
      
      {/* Fixed Device Image Reveal (Wow Factor) */}
      <div className="fixed top-1/2 right-[10%] -translate-y-1/2 w-[240px] md:w-[320px] aspect-[9/19.5] pointer-events-none z-0 hidden lg:block">
        {filteredDevices.map((device) => (
          <div 
            key={device.codename}
            className={`absolute inset-0 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              displayedDevice?.codename === device.codename 
                ? "opacity-100 scale-100 translate-x-0 rotate-0 filter-none" 
                : "opacity-0 scale-95 translate-x-12 rotate-2 blur-md"
            }`}
          >
            <div className="relative w-full h-full drop-shadow-[0_0_40px_rgba(255,255,255,0.15)]">
              {(device.images?.banner || device.images?.fallback) && (
                <Image
                  src={device.images.banner || device.images.fallback}
                  alt={device.name}
                  fill
                  className="object-contain text-transparent"
                  unoptimized
                />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-20 relative z-10">
        {/* Search bar hidden by request, but state remains for programmatic or future use */}
        <div className="relative w-full md:max-w-md hidden">
          <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 text-white/40" />
          <input
            type="text"
            placeholder="Find your device..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent border-b-2 border-white/10 py-4 pl-12 pr-6 text-2xl text-white placeholder-white/30 focus:outline-none focus:border-[var(--color-axion-accent)] transition-colors"
          />
        </div>

        <div className="flex gap-2 flex-wrap justify-start">
          {brands.map((brand) => (
            <button
              key={brand}
              onClick={() => setSelectedBrand(brand)}
              className={`px-5 py-2 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
                selectedBrand === brand
                  ? "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                  : "bg-white/5 text-white/40 hover:bg-white/10 hover:text-white"
              }`}
            >
              {brand}
            </button>
          ))}
        </div>
      </div>

      {/* Dynamic Typography List */}
      <div ref={listRef} className="relative z-10 flex flex-col w-full pb-32">
        {filteredDevices.length > 0 ? (
          filteredDevices.map((device) => (
            <Link
              key={device.codename}
              href={`/devices/${device.codename}`}
              data-device={device.codename}
              onMouseEnter={() => setHoveredDevice(device)}
              onMouseLeave={() => setHoveredDevice(null)}
              className="group relative py-12 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4 overflow-hidden"
            >
              <div className="flex flex-col relative z-10 transition-transform duration-300 group-hover:translate-x-4">
                <span className="text-[var(--color-axion-accent)] text-sm font-bold uppercase tracking-[0.2em] mb-2 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                  {device.brand} • {device.status}
                </span>
                <h2 className="text-5xl md:text-7xl lg:text-[6rem] font-black tracking-tighter text-white/40 group-hover:text-white transition-colors duration-300 whitespace-nowrap">
                  {device.name}
                </h2>
                <div className="flex items-center gap-4 mt-2">
                  <span className="text-white/30 text-lg uppercase tracking-widest font-medium">
                    {device.codename}
                  </span>
                  <div className="h-1 w-1 bg-white/20 rounded-full" />
                  <span className="text-white/30 text-sm">
                    {device.maintainer_ids.length > 0 
                      ? `By ${device.maintainer_ids.map(id => maintainers[id]?.name || id).join(", ")}` 
                      : "Unmaintained"}
                  </span>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="py-32">
            <p className="text-white/30 text-3xl font-bold tracking-tight">No devices match your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
