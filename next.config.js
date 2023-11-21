/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  assetPrefix: process.env.NEXT_PUBLIC_VERCEL_ENV || "",
  basePath: process.env.NEXT_PUBLIC_VERCEL_ENV || "",
  trailingSlash: true,
  publicRuntimeConfig: {
    root: process.env.NEXT_PUBLIC_VERCEL_ENV || "",
  },
  optimizeFonts: false,
};

module.exports = nextConfig;
