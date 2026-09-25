import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Pacotes do monorepo exportam TypeScript puro; o Next transpila.
  transpilePackages: [
    '@garimpo/domain',
    '@garimpo/application',
    '@garimpo/infrastructure',
    '@garimpo/jobs',
    '@garimpo/ui',
  ],
  experimental: {
    optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
  },
};

export default nextConfig;
