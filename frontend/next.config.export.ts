import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  assetPrefix: process.env.NODE_ENV === 'production' ? '/Precise-Nursing' : '',
  basePath: process.env.NODE_ENV === 'production' ? '/Precise-Nursing' : '',
  distDir: 'out'
};

export default nextConfig;