import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/favicon.ico",
        destination: "/AvhiSolutionFavicon.png",
      },
      {
        source: "/apple-touch-icon.png",
        destination: "/AvhiSolutionFavicon.png",
      },
      {
        source: "/apple-touch-icon-precomposed.png",
        destination: "/AvhiSolutionFavicon.png",
      },
    ];
  },
};

export default nextConfig;
