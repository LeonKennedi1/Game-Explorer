import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.rawg.io",
        pathname: "/**",
      },
    ],
    domains: ["www.freetogame.com", "via.placeholder.com"],
  },
};

export default nextConfig;
