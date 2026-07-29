import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Skip the image optimizer in local dev to avoid timeout errors.
    // On Vercel production, the edge optimizer handles this instantly.
    unoptimized: process.env.NODE_ENV === "development",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ysfmhibv0eaat3op.public.blob.vercel-storage.com",
      },
      {
        protocol: "https",
        hostname: "d3rarb6cqqqm6p.cloudfront.net",
      },
    ],
  },
};

export default nextConfig;
