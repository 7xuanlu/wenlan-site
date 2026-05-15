import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingRoot: process.cwd(),
  turbopack: {
    root: process.cwd(),
  },
  async redirects() {
    return [
      {
        source: "/guides",
        destination: "/learn",
        permanent: true,
      },
      {
        source: "/guides/:slug",
        destination: "/learn/:slug",
        permanent: true,
      },
      {
        source: "/docs/guides",
        destination: "/learn",
        permanent: true,
      },
      {
        source: "/docs/guides/:slug",
        destination: "/learn/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
