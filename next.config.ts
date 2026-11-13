import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  // 挂在 https://www.luliming.xyz/thinkingModel 子路径下
  basePath: "/thinkingModel",
  assetPrefix: "/thinkingModel",
  // Excel 处理含动态依赖，交给 Node 运行时直接加载，避免打包进 server bundle
  serverExternalPackages: ["exceljs"],
};

export default nextConfig;
