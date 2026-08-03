import Image from "next/image";
import Link from "next/link";
import TeamConstellation from "@/components/TeamConstellation";

export const revalidate = 3600;

export type Maintainer = {
  id: string;
  name: string;
  github_username: string;
  devices: string[];
};

export type Device = {
  codename: string;
  name: string;
  brand: string;
  status: string;
  maintainer_ids: string[];
};

async function getMaintainers() {
  const res = await fetch(
    "https://raw.githubusercontent.com/AxionAOSP/official_devices/main/api/maintainers.json"
  );
  if (!res.ok) throw new Error("Failed to fetch maintainers");
  const data = await res.json();
  return data.maintainers as Maintainer[];
}

async function getDevices() {
  const res = await fetch(
    "https://raw.githubusercontent.com/AxionAOSP/official_devices/main/api/downloads.json"
  );
  if (!res.ok) throw new Error("Failed to fetch devices");
  const data = await res.json();
  return data.devices as Device[];
}

export default async function ContributorsPage() {
  const [allMaintainers, allDevices] = await Promise.all([
    getMaintainers(),
    getDevices(),
  ]);

  const activeDevicesMap: Record<string, { name: string; brand: string }> = {};
  allDevices
    .filter((d) => d.status && d.status.toLowerCase() === "active")
    .forEach((d) => {
      activeDevicesMap[d.codename] = { name: d.name, brand: d.brand };
    });

  const activeMaintainerIds = new Set(
    allDevices
      .filter((d) => d.status && d.status.toLowerCase() === "active")
      .flatMap((d) => d.maintainer_ids)
  );

  const EXCLUDED_KEYS = ["alistergrey", "not-ayan"];
  
  const deviceMaintainers = allMaintainers.filter(m => 
    activeMaintainerIds.has(m.id) &&
    !EXCLUDED_KEYS.includes(m.id.toLowerCase()) && 
    !EXCLUDED_KEYS.includes(m.github_username.toLowerCase())
  );

  const renderGrid = (maintainersList: Maintainer[]) => (
    <div className="flex flex-wrap justify-center gap-x-6 gap-y-10 md:gap-x-8 md:gap-y-12 max-w-5xl mx-auto">
      {maintainersList.map((m) => {
        const github = m.github_username || m.id;
        const name = m.name || github;
        
        const activeDevs = (m.devices || [])
          .filter((codename) => activeDevicesMap[codename])
          .map((codename) => ({
            codename,
            name: activeDevicesMap[codename].name,
            brand: activeDevicesMap[codename].brand,
          }));

        return (
          <div
            key={m.id}
            className="relative group block"
          >
            <a
              href={`https://github.com/${github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border border-white/10 group-hover:border-white/30 group-hover:scale-105 group-hover:-translate-y-2 transition-all duration-300 shadow-xl bg-black/50 block cursor-pointer"
            >
              <Image
                src={`https://github.com/${github}.png?size=150`}
                alt={name}
                width={80}
                height={80}
                className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-300"
                unoptimized
              />
            </a>
            
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 pb-3 opacity-0 pointer-events-none group-hover:pointer-events-auto group-hover:opacity-100 group-hover:translate-y-[-8px] translate-y-0 transition-all duration-300 z-50">
              <div className="bg-[#0b0c0e]/95 backdrop-blur-xl border border-white/10 px-5 py-4 rounded-2xl shadow-2xl text-center min-w-[220px]">
                <a
                  href={`https://github.com/${github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--color-axion-accent-secondary)] transition-colors block cursor-pointer group/name"
                >
                  <div className="text-white font-bold text-sm tracking-tight group-hover/name:text-[var(--color-axion-accent-secondary)] transition-colors">{name}</div>
                  <div className="text-white/40 font-mono text-[10px] mt-0.5 mb-3">@{github}</div>
                </a>
                
                {activeDevs.length > 0 && (
                  <div className="pt-3 border-t border-white/5 text-left">
                    <span className="text-[9px] uppercase tracking-widest text-[var(--color-axion-accent-secondary)] font-bold block mb-2">
                      Active Devices
                    </span>
                    <div className="flex flex-col gap-1.5 max-h-[120px] overflow-y-auto pr-1">
                      {activeDevs.map((dev) => (
                        <Link
                          key={dev.codename}
                          href={`/download/${dev.codename}`}
                          className="flex items-center justify-between gap-3 text-[11px] bg-white/[0.03] border border-white/5 rounded-lg px-2.5 py-1.5 hover:bg-white/[0.08] hover:border-white/15 hover:scale-[1.02] transition-all cursor-pointer block"
                        >
                          <span className="text-white/70 truncate max-w-[100px] font-medium">
                            {dev.name}
                          </span>
                          <span className="font-mono text-white/30 text-[9px] uppercase bg-white/5 px-1.5 py-0.5 rounded">
                            {dev.codename}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <main className="min-h-screen bg-[var(--color-axion-bg)] pt-32 pb-24 px-6 relative overflow-hidden">
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[var(--color-axion-accent-secondary)]/10 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-axion-accent-secondary)] font-medium mb-4">The Architects</p>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6">
            Meet the Team.
          </h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto font-light leading-relaxed">
            Axion OS is built by a decentralized team of developers, designers, and maintainers dedicated to pushing the boundaries of Android.
          </p>
        </div>

        <TeamConstellation />

        {deviceMaintainers.length > 0 && (
          <section className="text-center mt-24">
            <div className="mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Device Maintainers.</h2>
              <p className="text-white/50 font-light max-w-lg mx-auto">The backbone of Axion OS device support.</p>
            </div>
            {renderGrid(deviceMaintainers)}
          </section>
        )}
      </div>
    </main>
  );
}
