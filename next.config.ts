import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  ...(isProd && { output: "export" }),
  basePath: isProd ? "/drsport-clinic" : "",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
