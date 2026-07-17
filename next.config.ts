import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/favicon.ico",
        destination: "/AvhiSolutionFavicon.webp",
      },
      {
        source: "/apple-touch-icon.png",
        destination: "/AvhiSolutionFavicon.webp",
      },
      {
        source: "/apple-touch-icon-precomposed.png",
        destination: "/AvhiSolutionFavicon.webp",
      },
    ];
  },
};

export default nextConfig;
