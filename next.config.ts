import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/favicon.ico",
        destination: "/icon.svg",
      },
      {
        source: "/apple-touch-icon.png",
        destination: "/icon.svg",
      },
      {
        source: "/apple-touch-icon-precomposed.png",
        destination: "/icon.svg",
      },
    ];
  },
};

export default nextConfig;
