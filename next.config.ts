import type { NextConfig } from "next";

const nextConfig = {
  experimental: {
    missingSuspenseWithCSRBailout: false, 
  } as any,
};

export default nextConfig;
