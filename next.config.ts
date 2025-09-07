import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.snxethan.dev",
        pathname: "/images/avatar/*",
      },
    ],
  },
};

export default nextConfig;