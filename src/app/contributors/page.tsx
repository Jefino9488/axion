import Image from "next/image";
import { Code, Smartphone } from "lucide-react";

export const revalidate = 3600; // Revalidate every hour

export type Maintainer = {
  id: string;
  name: string;
  github_username: string;
  devices: string[];
};

async function getMaintainers() {
  const res = await fetch(
    "https://raw.githubusercontent.com/AxionAOSP/official_devices/main/api/maintainers.json"
  );
  if (!res.ok) throw new Error("Failed to fetch maintainers");
  const data = await res.json();
  return data.maintainers as Maintainer[];
}

type SpecialContributor = {
  name: string;
  github_username: string;
  role: string;
};

const CORE_TEAM: SpecialContributor[] = [
  { name: "RMP", github_username: "rmp22", role: "Project Founder / Developer" }
];

const MANAGEMENT_TEAM: SpecialContributor[] = [
  { name: "Sai Krishna", github_username: "Saikrishna1504", role: "Project Manager / Core Member" },
  { name: "Manidweep", github_username: "manidweep", role: "Project Administrator" }
];

const CONTRIBUTORS_TEAM: SpecialContributor[] = [
  { name: "AlisterGrey", github_username: "AlisterGrey", role: "Lead Designer" },
  { name: "not-ayan", github_username: "not-ayan", role: "Axion Bot Maintainer" },
  { name: "Rve27", github_username: "Rve27", role: "Supportive Contributor" }
];

export default async function ContributorsPage() {
  const allMaintainers = await getMaintainers();

  // IDs to exclude from device maintainers because they are in the special categories
  const EXCLUDED_KEYS = ["rmp22", "saikrishna1504", "saikrishna", "manidweep", "alistergrey", "not-ayan", "rve27"];
  
  const deviceMaintainers = allMaintainers.filter(m => 
    !EXCLUDED_KEYS.includes(m.id.toLowerCase()) && 
    !EXCLUDED_KEYS.includes(m.github_username.toLowerCase())
  );

  const renderSpecialGrid = (members: SpecialContributor[]) => (
    <div className="flex flex-wrap justify-center gap-6">
      {members.map((m) => (
        <div
          key={m.github_username}
          className="group w-full sm:w-[280px] bg-white/5 border border-white/10 rounded-3xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300 flex flex-col items-center text-center relative overflow-hidden"
        >
          {/* Avatar */}
          <div className="relative w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-white/10 group-hover:border-[var(--color-axion-accent-secondary)] transition-colors">
            <Image
              src={`https://github.com/${m.github_username}.png`}
              alt={m.name}
              fill
              className="object-cover"
              unoptimized
            />
          </div>

          {/* Info */}
          <h3 className="text-xl font-bold text-white mb-1">{m.name}</h3>
          <p className="text-sm text-white/40 mb-6">@{m.github_username}</p>

          {/* Role */}
          <div className="text-sm font-medium text-[var(--color-axion-accent)] tracking-wide mt-auto">
            {m.role}
          </div>

          {/* Hover GitHub link */}
          <a
            href={`https://github.com/${m.github_username}`}
            target="_blank"
            rel="noreferrer"
            className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm"
          >
            <Code className="w-8 h-8 text-white mb-2" />
            <span className="text-white font-medium">View Profile</span>
          </a>
        </div>
      ))}
    </div>
  );

  const renderGrid = (maintainersList: Maintainer[]) => (
    <div className="flex flex-wrap justify-center gap-x-6 gap-y-10 md:gap-x-8 md:gap-y-12 max-w-5xl mx-auto">
      {maintainersList.map((m) => {
        const github = m.github_username || m.id;
        const name = m.name || github;
        
        return (
          <a
            key={m.id}
            href={`https://github.com/${github}`}
            target="_blank"
            rel="noopener noreferrer"
            className="relative group cursor-pointer block"
          >
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border border-white/10 group-hover:border-white/30 group-hover:scale-105 group-hover:-translate-y-2 transition-all duration-300 shadow-xl bg-black/50">
              <Image
                src={`https://github.com/${github}.png?size=150`}
                alt={name}
                width={80}
                height={80}
                className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-300"
                unoptimized
              />
            </div>
            
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 translate-y-2 transition-all duration-300 z-50">
              <div className="bg-[#111] border border-white/10 px-4 py-2 rounded-xl shadow-2xl text-center whitespace-nowrap">
                <div className="text-white font-bold text-sm">{name}</div>
                <div className="text-white/40 font-mono text-[10px] mt-0.5">@{github}</div>
              </div>
            </div>
          </a>
        );
      })}
    </div>
  );

  return (
    <main className="min-h-screen bg-[var(--color-axion-bg)] pt-32 pb-24 px-6 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[var(--color-axion-accent-secondary)]/10 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-24">
          <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-axion-accent-secondary)] font-medium mb-4">The Team</p>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6">
            Contributors.
          </h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            The incredible people driving Axion OS forward.
          </p>
        </div>

        <div className="space-y-24">
          {/* Core Team */}
          <section className="text-center">
            <h2 className="text-2xl font-medium text-white mb-10">Core</h2>
            {renderSpecialGrid(CORE_TEAM)}
          </section>

          {/* Management Team */}
          <section className="text-center">
            <h2 className="text-2xl font-medium text-white mb-10">Management</h2>
            {renderSpecialGrid(MANAGEMENT_TEAM)}
          </section>

          {/* Contributors */}
          <section className="text-center">
            <h2 className="text-2xl font-medium text-white mb-10">Contributors</h2>
            {renderSpecialGrid(CONTRIBUTORS_TEAM)}
          </section>

          {/* Active Device Maintainers */}
          {deviceMaintainers.length > 0 && (
            <section className="text-center">
              <h2 className="text-2xl font-medium text-white mb-10">Active Device Maintainers</h2>
              {renderGrid(deviceMaintainers)}
            </section>
          )}
        </div>
      </div>
    </main>
  );
}
