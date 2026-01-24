import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  reactStrictMode: true,
  devIndicators: false,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: true
      }
    ]
  }
};

export default nextConfig;
