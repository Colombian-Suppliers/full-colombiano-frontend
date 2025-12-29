/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.fullcolombiano.com',
      },
      {
        protocol: 'https',
        hostname: 'api-stg.colombiansupply.com',
      },
      {
        protocol: 'https',
        hostname: 'api.colombiansupply.com',
      },
    ],
  },
  // Uncomment when backend API is deployed
  // async rewrites() {
  //   const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api-stg.colombiansupply.com';
  //   return [
  //     {
  //       source: '/api/:path*',
  //       destination: `${apiUrl}/wp-json/hmc/v1/:path*`,
  //     },
  //   ];
  // },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_ENVIRONMENT: process.env.NEXT_PUBLIC_ENVIRONMENT,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  },
};

module.exports = nextConfig;

