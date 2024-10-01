import type { NextConfig } from 'next';

const nextConfig = {
  experimental: {
    dynamicIO: true,
    typedRoutes: true,
  },
};

module.exports = nextConfig;
