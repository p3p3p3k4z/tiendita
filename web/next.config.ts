import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com'
      },
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com'
      },
      {
        protocol: 'https',
        hostname: 'pokeapi.co'
      },
      {
        protocol: 'https',
        hostname: 'www.pexels.com'
      },
      {
        protocol: 'https',
        hostname: 'e1.pngegg.com'
      }
    ]
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;