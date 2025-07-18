import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['upload.wikimedia.org', "i.scdn.co", "i.discogs.com", "m.media-amazon.com", "cdn-images.dzcdn.net", "universalmusic.vtexassets.com", "blogger.googleusercontent.com"]
  },
  devIndicators: false,
};

export default nextConfig;
