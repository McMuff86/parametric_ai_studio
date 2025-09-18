import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  webpack: (config) => {
    // Avoid bundling Node core shims on client for rhino3dm/three
    config.resolve.fallback = {
      ...(config.resolve.fallback || {}),
      fs: false,
      path: false,
      crypto: false,
      ws: false,
      net: false,
      tls: false,
    };
    // Also make sure any stray 'ws' imports are ignored
    config.externals = config.externals || [];
    config.externals.push({ ws: "commonjs ws" });
    return config;
  },
};

export default nextConfig;
