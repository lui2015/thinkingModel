import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  // 挂在 https://www.luliming.xyz/thinkingModel 子路径下
  basePath: "/thinkingModel",
  assetPrefix: "/thinkingModel",
};

export default nextConfig;
