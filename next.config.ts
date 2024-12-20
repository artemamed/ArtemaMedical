// next.config.js
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'example.com',
        pathname: '/**',
      },
      {
        protocol: 'https',  // Added the protocol as https
        hostname: 'medinven.api.artemamed.com', // Your image host
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
