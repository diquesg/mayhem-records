import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['upload.wikimedia.org', "i.scdn.co"],
  },
  devIndicators: false,
};

export default nextConfig;
