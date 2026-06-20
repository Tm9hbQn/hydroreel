import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/hydroreel",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
