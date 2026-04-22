"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import ModelCard from "@/components/ModelCard";
import { categories, models, difficultyLabels } from "@/lib/models-data";
import { filterModels } from "@/lib/search";

export default function ModelsPageClient() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "";
  const initialQuery = searchParams.get("q") || "";

  const [query, setQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedDifficulty, setSelectedDifficulty] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState("default");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const results = useMemo(
    () =>
      filterModels({
        query: query || undefined,
        category: selectedCategory || undefined,
        difficulty: selectedDifficulty ?? undefined,
        sort: sortBy,
      }),
    [query, selectedCategory, selectedDifficulty, sortBy]
  );

  const clearFilters = () => {
    setQuery("");
    setSelectedCategory("");
    setSelectedDifficulty(null);
    setSortBy("default");
  };

  const hasFilters = query || selectedCategory || selectedDifficulty || sortBy !== "default";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-text">模型库</h1>
        <p className="text-text-secondary mt-2">
          共收录 {models.length} 个思维模型，覆盖 {categories.length} 大分类
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          placeholder="搜索模型名称、标签、关键词..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-border bg-card text-text placeholder:text-text-light focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
        />
        {query && (
          <button onClick={() => setQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-text-light hover:text-text">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setSelectedCategory("")}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${!selectedCategory ? "bg-primary text-white" : "bg-surface-alt text-text-secondary hover:text-text"}`}
        >
          全部
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(selectedCategory === cat.id ? "" : cat.id)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${selectedCategory === cat.id ? "bg-primary text-white" : "bg-surface-alt text-text-secondary hover:text-text"}`}
          >
            {cat.icon} {cat.name}
          </button>
        ))}
      </div>

      {/* Secondary Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-8">
        <div className="flex items-center gap-2">
          <span className="text-sm text-text-secondary">难度：</span>
          {[1, 2, 3].map((d) => (
            <button
              key={d}
              onClick={() => setSelectedDifficulty(selectedDifficulty === d ? null : d)}
              className={`px-3 py-1 rounded-lg text-sm transition-colors ${selectedDifficulty === d ? "bg-accent text-text font-medium" : "bg-surface-alt text-text-secondary hover:text-text"}`}
            >
              {difficultyLabels[d]}
            </button>
          ))}
        </div>

        <div className="w-px h-6 bg-border hidden sm:block" />

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-3 py-1.5 rounded-lg text-sm bg-surface-alt text-text-secondary border-none focus:outline-none focus:ring-2 focus:ring-primary/30 cursor-pointer"
        >
          <option value="default">默认排序</option>
          <option value="latest">最近更新</option>
          <option value="difficulty-asc">难度从低到高</option>
          <option value="difficulty-desc">难度从高到低</option>
        </select>

        <div className="w-px h-6 bg-border hidden sm:block" />

        <div className="flex items-center bg-surface-alt rounded-lg p-0.5">
          <button onClick={() => setViewMode("grid")} className={`p-1.5 rounded-md transition-colors ${viewMode === "grid" ? "bg-white shadow-sm text-primary" : "text-text-light"}`}>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16"><path d="M1 2.5A1.5 1.5 0 012.5 1h3A1.5 1.5 0 017 2.5v3A1.5 1.5 0 015.5 7h-3A1.5 1.5 0 011 5.5v-3zm8 0A1.5 1.5 0 0110.5 1h3A1.5 1.5 0 0115 2.5v3A1.5 1.5 0 0113.5 7h-3A1.5 1.5 0 019 5.5v-3zm-8 8A1.5 1.5 0 012.5 9h3A1.5 1.5 0 017 10.5v3A1.5 1.5 0 015.5 15h-3A1.5 1.5 0 011 13.5v-3zm8 0A1.5 1.5 0 0110.5 9h3a1.5 1.5 0 011.5 1.5v3a1.5 1.5 0 01-1.5 1.5h-3A1.5 1.5 0 019 13.5v-3z" /></svg>
          </button>
          <button onClick={() => setViewMode("list")} className={`p-1.5 rounded-md transition-colors ${viewMode === "list" ? "bg-white shadow-sm text-primary" : "text-text-light"}`}>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16"><path fillRule="evenodd" d="M2.5 12a.5.5 0 01.5-.5h10a.5.5 0 010 1H3a.5.5 0 01-.5-.5zm0-4a.5.5 0 01.5-.5h10a.5.5 0 010 1H3a.5.5 0 01-.5-.5zm0-4a.5.5 0 01.5-.5h10a.5.5 0 010 1H3a.5.5 0 01-.5-.5z" /></svg>
          </button>
        </div>

        {hasFilters && (
          <button onClick={clearFilters} className="text-sm text-primary hover:text-primary-dark transition-colors ml-auto">
            清除筛选
          </button>
        )}
      </div>

      {/* Results count */}
      <div className="mb-4 text-sm text-text-secondary">找到 {results.length} 个模型</div>

      {/* Results */}
      {results.length === 0 ? (
        <div className="text-center py-20">
          <span className="text-5xl">🔍</span>
          <p className="mt-4 text-lg text-text-secondary">没有找到匹配的模型</p>
          <button onClick={clearFilters} className="mt-4 text-primary hover:text-primary-dark font-medium">清除筛选条件</button>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {results.map((model) => (
            <ModelCard key={model.id} model={model} />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {results.map((model) => (
            <a key={model.id} href={`/models/${model.slug}`} className="flex items-center gap-4 p-4 bg-card rounded-xl border border-border hover:border-primary/30 hover:shadow-md transition-all group">
              <span className="text-2xl shrink-0">{model.icon}</span>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-text group-hover:text-primary transition-colors">{model.title}</h3>
                <p className="text-sm text-text-secondary truncate">{model.subtitle}</p>
              </div>
              <div className="hidden sm:flex items-center gap-3 text-xs text-text-light shrink-0">
                <span>{difficultyLabels[model.difficulty]}</span>
                <span>{categories.find((c) => c.id === model.category)?.name}</span>
              </div>
              <svg className="w-5 h-5 text-text-light group-hover:text-primary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
