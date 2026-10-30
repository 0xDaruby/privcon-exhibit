import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_EXHIBIT_SOURCE_REF: process.env.VERCEL_GIT_COMMIT_SHA || "" },
};

export default nextConfig;
