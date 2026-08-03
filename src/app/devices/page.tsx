import DevicesClient, { Device, Maintainer } from "./DevicesClient";

export const revalidate = 3600; // Revalidate every hour

async function getDevices() {
  const res = await fetch(
    "https://raw.githubusercontent.com/AxionAOSP/official_devices/main/api/downloads.json"
  );
  if (!res.ok) throw new Error("Failed to fetch devices");
  const data = await res.json();
  return data.devices as Device[];
}

async function getMaintainers() {
  const res = await fetch(
    "https://raw.githubusercontent.com/AxionAOSP/official_devices/main/api/maintainers.json"
  );
  if (!res.ok) throw new Error("Failed to fetch maintainers");
  const data = await res.json();
  
  // Convert to map for easy lookup
  const maintainersMap: Record<string, Maintainer> = {};
  data.maintainers.forEach((m: Maintainer) => {
    maintainersMap[m.id] = m;
  });
  
  return maintainersMap;
}

export default async function DevicesPage() {
  const [devices, maintainers] = await Promise.all([
    getDevices(),
    getMaintainers(),
  ]);

  return (
    <main className="min-h-screen bg-[var(--color-axion-bg)] pt-32 pb-24 px-6 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[var(--color-axion-accent)]/10 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-axion-accent)] font-medium mb-4">Downloads</p>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6">
            Find your device.
          </h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Browse our list of officially supported devices. Maintained by the community, built for performance.
          </p>
        </div>

        <DevicesClient devices={devices} maintainers={maintainers} />
      </div>
    </main>
  );
}
