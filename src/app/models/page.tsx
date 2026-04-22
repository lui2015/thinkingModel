import { Suspense } from "react";
import ModelsPageClient from "@/components/ModelsPageClient";

export const metadata = {
  title: "模型库",
  description: "浏览所有思维模型，支持按分类、难度筛选和关键词搜索。",
};

export default function ModelsPage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-12 text-center text-text-secondary">加载中...</div>}>
      <ModelsPageClient />
    </Suspense>
  );
}
