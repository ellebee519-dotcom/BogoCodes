/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  },
  allowedDevOrigins: ['100.115.92.198', '100.115.92.198:3000'],
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;