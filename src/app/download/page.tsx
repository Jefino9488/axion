import DevicesClient, { Device, Maintainer } from "./DevicesClient";

export const revalidate = 3600;

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
  
  const maintainersMap: Record<string, Maintainer> = {};
  data.maintainers.forEach((m: Maintainer) => {
    maintainersMap[m.id] = m;
  });
  
  return maintainersMap;
}

async function getDeviceImages() {
  const res = await fetch(
    "https://raw.githubusercontent.com/AxionAOSP/AxionAOSP.github.io/main_bk/device_images.json"
  );
  if (!res.ok) return {};
  const data = await res.json();
  
  const imagesMap: Record<string, string> = {};
  data.devices.forEach((d: { codename: string; imageUrl: string }) => {
    imagesMap[d.codename] = d.imageUrl;
  });
  
  return imagesMap;
}

async function fetchLatestVersion(otaUrl: string): Promise<string | null> {
  try {
    const res = await fetch(otaUrl, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    const data = await res.json();
    const builds = data.response || [];
    if (builds.length === 0) return null;
    const latestBuild = builds.sort((a: any, b: any) => b.datetime - a.datetime)[0];
    return latestBuild?.version || null;
  } catch {
    return null;
  }
}

export default async function DevicesPage() {
  const [rawDevices, maintainers, deviceImages] = await Promise.all([
    getDevices(),
    getMaintainers(),
    getDeviceImages(),
  ]);

  const devices = await Promise.all(
    rawDevices.map(async (device) => {
      if (device.status?.toLowerCase() === "active" && device.ota) {
        const otaUrl = device.ota.gms || device.ota.vanilla;
        if (otaUrl) {
          const version = await fetchLatestVersion(otaUrl);
          return { ...device, version };
        }
      }
      return { ...device, version: null };
    })
  );

  return (
    <main className="min-h-screen bg-[var(--color-axion-bg)] pt-32 pb-24 px-6 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[var(--color-axion-accent)]/10 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-axion-accent)] font-medium mb-4">Downloads</p>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6">
            Find your device.
          </h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
            Browse our list of officially supported devices. Maintained by the community, built for performance.
          </p>
        </div>

        <div className="mx-auto max-w-4xl mb-16 select-none">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 rounded-3xl bg-white/[0.01] border border-white/5 hover:border-[var(--color-axion-accent)]/30 hover:bg-white/[0.02] hover:shadow-[0_0_40px_rgba(255,100,0,0.05)] transition-all duration-500">
            <div className="flex items-center gap-4 text-center sm:text-left flex-col sm:flex-row">
              <div className="w-12 h-12 rounded-2xl bg-[var(--color-axion-accent)]/10 border border-[var(--color-axion-accent)]/20 flex items-center justify-center text-[var(--color-axion-accent)] shrink-0">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight">Direct CDN Access</h2>
                <p className="text-white/40 text-sm mt-1 leading-snug">Browse and download raw Axion build files directly from our globally mirror-routed CDN.</p>
              </div>
            </div>
            <a 
              href="https://cdn.axionos.org/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-6 py-3.5 bg-white text-[var(--color-axion-bg)] hover:bg-white/90 font-bold rounded-xl flex items-center gap-2 transition-all hover:scale-[1.03] shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] shrink-0"
            >
              <span>Visit CDN</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>

        <DevicesClient devices={devices} maintainers={maintainers} deviceImages={deviceImages} />

      </div>
    </main>
  );
}
