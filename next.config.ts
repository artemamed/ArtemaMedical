// next.config.js
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  env: {
    NEXT_PUBLIC_SANITY_PROJECT_ID: "n3xjfs90",
    NEXT_PUBLIC_SANITY_DATASET: "production",
    NEXT_PUBLIC_SANITY_API_VERSION: "2024-01-01",
    NEXT_PUBLIC_SANITY_STUDIO_URL: "http://localhost:3333",
    SANITY_API_READ_TOKEN: "<paste your token here>",
    NEXT_PUBLIC_API_URL: "https://medinven.api.artemamed.com/api/",
    NEXT_PUBLIC_API:
      "e2c7b781fbdd6ff1be05b9b1abc3cba67007505808f6ed8ca901fd61b284414154a6dbcaf361ba0430188358ed9ba6b6",
    EMAIL_USER: "sales@artemamed.com",
    EMAIL_PASS: "jjxk ygzq brkg nbxu",
    EMAIL_HOST: "mail.artemamedical.com",
    EMAIL_PORT: "465",
    EMAIL_SECURE: "false",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "example.com",
        pathname: "/**",
      },
      {
        protocol: "https", // Added the protocol as https
        hostname: "medinven.api.artemamed.com", // Your image host
        pathname: "/**",
      },
    ],
  },
};
export default nextConfig;
