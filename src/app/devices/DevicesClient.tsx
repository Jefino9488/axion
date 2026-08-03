"use client";

import { Search, Smartphone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useMemo } from "react";
import DeviceImage from "@/components/DeviceImage";

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
  deviceImages,
}: {
  devices: Device[];
  maintainers: Record<string, Maintainer>;
  deviceImages: Record<string, string>;
}) {
  const [search, setSearch] = useState("");
  const [selectedBrand, setSelectedBrand] = useState<string>("All");

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

  return (
    <div className="w-full relative min-h-screen">
      {/* Controls */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12 relative z-10">
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
                  ? "bg-[var(--color-axion-accent)] text-white shadow-[0_0_20px_rgba(255,100,0,0.3)]"
                  : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white"
              }`}
            >
              {brand}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 relative z-10 pb-32">
        {filteredDevices.length > 0 ? (
          filteredDevices.map((device) => {
            const imageUrl = deviceImages[device.codename] || device.images?.banner || device.images?.fallback;
            
            return (
              <Link
                key={device.codename}
                href={`/devices/${device.codename}`}
                className="group block h-full"
              >
                <article className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:bg-white/10 hover:border-white/20 hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)] transition-all duration-300 h-full flex flex-col relative group-hover:-translate-y-1">
                  
                  {/* Image Header */}
                  <div className="relative w-full aspect-square bg-gradient-to-b from-white/5 to-transparent flex items-center justify-center p-8 overflow-hidden">
                    <div className="absolute inset-0 bg-[var(--color-axion-accent)]/5 group-hover:bg-[var(--color-axion-accent)]/10 transition-colors duration-500" />
                    
                    <DeviceImage
                      sources={[
                        deviceImages[device.codename],
                        device.images?.banner,
                        device.images?.fallback,
                      ]}
                      alt={device.name}
                      className="object-contain p-8 group-hover:scale-110 transition-transform duration-700 w-full h-full absolute inset-0"
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-[var(--color-axion-accent)] text-xs font-bold uppercase tracking-widest px-3 py-1 bg-[var(--color-axion-accent)]/10 rounded-full">
                        {device.brand}
                      </span>
                      <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md border select-none ${
                        device.status?.toLowerCase() === 'active' 
                          ? 'bg-green-500/20 text-green-400 border-green-500/10' 
                          : 'bg-red-500/15 text-red-400 border-red-500/10'
                      }`}>
                        {device.status}
                      </span>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white tracking-tight mb-1 group-hover:text-[var(--color-axion-accent)] transition-colors">
                      {device.name}
                    </h3>
                    
                    <p className="text-white/40 font-mono text-sm mb-4">
                      {device.codename}
                    </p>
                    
                    <div className="mt-auto pt-4 border-t border-white/5">
                      <p className="text-white/30 text-xs">
                        {device.maintainer_ids.length > 0 
                          ? `Maintained by ${device.maintainer_ids.map(id => maintainers[id]?.name || id).join(", ")}` 
                          : "Unmaintained"}
                      </p>
                    </div>
                  </div>
                </article>
              </Link>
            );
          })
        ) : (
          <div className="col-span-full py-32 text-center">
            <p className="text-white/30 text-2xl font-bold tracking-tight">No devices match your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
