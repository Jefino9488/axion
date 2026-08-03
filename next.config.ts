import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/axion',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
