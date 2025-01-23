// next.config.js
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  env: {
    NEXT_PUBLIC_SANITY_PROJECT_ID: "r78z3nyl",
    NEXT_PUBLIC_SANITY_DATASET: "production",
    NEXT_PUBLIC_SANITY_API_VERSION: "2024-01-01",
    NEXT_PUBLIC_SANITY_STUDIO_URL: "http://localhost:3333",
    SANITY_API_READ_TOKEN: "<paste your token here>",
    NEXT_PUBLIC_API_URL: "https://medinven.api.artemamed.com/api/",
    NEXT_PUBLIC_API:
      "4ba26604e36749f2da838e4178c985f9bfe3bc964bc1066ac3487f8bc63903669bc97de9d78fbc66b359f46b0f9b7d561dd6d11661ce93c9ada353ed7a3c1281",
    EMAIL_USER: "sales@artemamed.com",
    EMAIL_PASS: "jjxk ygzq brkg nbxu",
    EMAIL_HOST: "mail.artemamedical.com",
    EMAIL_PORT: "465",
    EMAIL_SECURE: "false",
    NEXT_PUBLIC_ENCRYPTION_KEY: "11223344",
    // MERCHANT_ID: "ARTEMAMEDICA",
    // MERCHANT_PASS: "5d245bae704ba8a34ee40ad35beac255",
    // URL: "https://bankalfalah",
    // CURRENCY: "USD",
    // NEXT_PUBLIC_BASE_URL: "https://artemamed.com",
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
