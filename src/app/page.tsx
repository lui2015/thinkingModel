import Link from "next/link";
import ModelCard from "@/components/ModelCard";
import {
  categories,
  models,
  getFeaturedModels,
  getDailyModel,
  getLatestModels,
} from "@/lib/models-data";

export default function HomePage() {
  const featured = getFeaturedModels();
  const daily = getDailyModel();
  const latest = getLatestModels(6);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-white to-secondary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 sm:pt-24 sm:pb-28">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-text tracking-tight">
              掌握
              <span className="text-primary">思维模型</span>
              <br />
              升级你的认知操作系统
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-text-secondary leading-relaxed max-w-2xl mx-auto">
              整合人类最优秀的思维框架，通过通俗介绍、有趣案例和实战指引，
              帮助你建立多元思维模型，做出更好的决策。
            </p>

            {/* Search */}
            <div className="mt-10 max-w-xl mx-auto">
              <Link
                href="/models"
                className="flex items-center gap-3 bg-white border border-border rounded-2xl px-5 py-4 shadow-sm hover:shadow-md hover:border-primary/30 transition-all group"
              >
                <svg
                  className="w-5 h-5 text-text-light group-hover:text-primary transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <span className="text-text-light group-hover:text-text-secondary transition-colors">
                  搜索思维模型...
                </span>
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-10 flex items-center justify-center gap-8 sm:gap-12 text-sm">
              <div>
                <span className="text-3xl font-bold text-primary">{models.length}</span>
                <p className="text-text-secondary mt-1">思维模型</p>
              </div>
              <div className="w-px h-10 bg-border" />
              <div>
                <span className="text-3xl font-bold text-secondary">{categories.length}</span>
                <p className="text-text-secondary mt-1">模型分类</p>
              </div>
              <div className="w-px h-10 bg-border" />
              <div>
                <span className="text-3xl font-bold text-accent-dark">实战</span>
                <p className="text-text-secondary mt-1">案例驱动</p>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 left-10 text-6xl opacity-10 animate-pulse">🧠</div>
        <div className="absolute bottom-20 right-10 text-6xl opacity-10 animate-pulse delay-700">💡</div>
        <div className="absolute top-40 right-20 text-4xl opacity-10 animate-pulse delay-300">🎯</div>
      </section>

      {/* Daily Model */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <Link href={`/models/${daily.slug}`} className="block group">
          <div className="bg-gradient-to-r from-primary to-primary-dark rounded-2xl p-6 sm:p-8 text-white shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all">
            <div className="flex items-center gap-2 text-white/70 text-sm mb-2">
              <span>✨</span>
              <span>每日一模型</span>
            </div>
            <div className="flex items-start gap-4">
              <span className="text-4xl">{daily.icon}</span>
              <div className="flex-1 min-w-0">
                <h3 className="text-xl sm:text-2xl font-bold group-hover:underline decoration-white/40 underline-offset-4">
                  {daily.title}
                </h3>
                <p className="text-white/80 mt-1">{daily.subtitle}</p>
                <p className="text-white/60 text-sm mt-3 italic">
                  &ldquo;{daily.memorySentence}&rdquo;
                </p>
              </div>
              <svg
                className="w-6 h-6 text-white/50 group-hover:text-white group-hover:translate-x-1 transition-all shrink-0 mt-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </Link>
      </section>

      {/* Category Navigation */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-text">探索分类</h2>
          <p className="text-text-secondary mt-2">
            10 大维度，覆盖决策、认知、系统、沟通等核心能力
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/models?category=${cat.id}`}
              className="group flex flex-col items-center gap-2 p-4 sm:p-5 rounded-2xl border border-border bg-card hover:border-transparent hover:shadow-lg transition-all"
              style={
                {
                  "--cat-color": cat.color,
                } as React.CSSProperties
              }
            >
              <span className="text-3xl group-hover:scale-110 transition-transform">{cat.icon}</span>
              <span className="text-sm font-semibold text-text group-hover:text-[var(--cat-color)] transition-colors">
                {cat.name}
              </span>
              <span className="text-xs text-text-light hidden sm:block text-center">
                {cat.description}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Models */}
      <section className="bg-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-text">精选推荐</h2>
              <p className="text-text-secondary mt-1">最有价值的思维模型，优先掌握</p>
            </div>
            <Link
              href="/models"
              className="text-sm font-medium text-primary hover:text-primary-dark transition-colors flex items-center gap-1"
            >
              查看全部
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featured.map((model) => (
              <ModelCard key={model.id} model={model} />
            ))}
          </div>
        </div>
      </section>

      {/* Latest Updates */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-text">最近更新</h2>
            <p className="text-text-secondary mt-1">持续收录优质思维模型</p>
          </div>
          <Link
            href="/models"
            className="text-sm font-medium text-primary hover:text-primary-dark transition-colors flex items-center gap-1"
          >
            查看全部
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {latest.map((model) => (
            <ModelCard key={model.id} model={model} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-primary to-primary-dark py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            开始构建你的思维模型体系
          </h2>
          <p className="mt-4 text-white/70 text-lg">
            查理·芒格说：你必须知道重要学科的重要理论，并经常使用它们。
          </p>
          <Link
            href="/models"
            className="mt-8 inline-flex items-center gap-2 bg-white text-primary font-semibold px-8 py-3.5 rounded-xl hover:shadow-lg transition-all hover:-translate-y-0.5"
          >
            浏览所有模型
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
