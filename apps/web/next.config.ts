import type { NextConfig } from "next";
import logger from '@rhiz.om/shared/utils/logger';

const nextConfig: NextConfig = {
  transpilePackages: ["@rhiz.om/shared"],
  experimental: {
    instrumentationHook: true,
  },
};

export default nextConfig;
