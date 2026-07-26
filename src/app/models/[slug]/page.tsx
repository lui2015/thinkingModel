import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import {
  models,
  getModelBySlug,
  getCategoryById,
  getRelatedModels,
  difficultyLabels,
  difficultyStars,
} from "@/lib/models-data";
import { getModelStory } from "@/lib/model-stories";
import KnowledgeCardExport from "@/components/KnowledgeCardExport";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return models.map((model) => ({ slug: model.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const model = getModelBySlug(slug);
  if (!model) return { title: "未找到" };
  return {
    title: model.title,
    description: `${model.subtitle} — ${model.memorySentence}`,
  };
}

export default async function ModelDetailPage({ params }: Props) {
  const { slug } = await params;
  const model = getModelBySlug(slug);
  if (!model) notFound();

  const category = getCategoryById(model.category);
  const related = getRelatedModels(model.relatedModels);
  const story = getModelStory(model.slug, model.story);

  const caseTypeLabels = { life: "生活场景", business: "商业/历史案例", negative: "反面案例" };

  const sections = [
    { id: "intro", label: "通俗介绍" },
    { id: "story", label: "小故事" },
    { id: "insight", label: "关键洞察" },
    { id: "cases", label: "案例" },
    { id: "usage", label: "使用指引" },
    { id: "memory", label: "记忆卡片" },
    { id: "reading", label: "延伸阅读" },
    { id: "related", label: "相关模型" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-text-secondary mb-8">
        <Link href="/" className="hover:text-primary transition-colors">首页</Link>
        <span>/</span>
        <Link href="/models" className="hover:text-primary transition-colors">模型库</Link>
        {category && (
          <>
            <span>/</span>
            <Link href={`/models?category=${category.id}`} className="hover:text-primary transition-colors">
              {category.name}
            </Link>
          </>
        )}
        <span>/</span>
        <span className="text-text">{model.title}</span>
      </nav>

      <div className="flex gap-8">
        {/* Sidebar Navigation - Desktop */}
        <aside className="hidden lg:block w-48 shrink-0">
          <div className="sticky top-24">
            <nav className="space-y-1">
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="block px-3 py-2 text-sm text-text-secondary hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
                >
                  {s.label}
                </a>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <article className="flex-1 min-w-0 max-w-3xl">
          {/* Header */}
          <header className="mb-10">
            <div className="flex items-start gap-4 mb-4">
              <span className="text-5xl">{model.icon}</span>
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-text">{model.title}</h1>
                <p className="text-lg text-text-secondary mt-1">{model.subtitle}</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3 mt-4">
              {category && (
                <span
                  className="text-sm font-medium px-3 py-1 rounded-full"
                  style={{ backgroundColor: `${category.color}15`, color: category.color }}
                >
                  {category.icon} {category.name}
                </span>
              )}
              <span className="text-sm text-text-light">{difficultyStars[model.difficulty]} {difficultyLabels[model.difficulty]}</span>
              {model.tags.map((tag) => (
                <span key={tag} className="text-xs bg-surface-alt text-text-secondary px-2.5 py-1 rounded-full">
                  #{tag}
                </span>
              ))}
            </div>

            {story && (
              <div className="mt-5">
                <KnowledgeCardExport
                  model={model}
                  categoryColor={category?.color ?? "#6C5CE7"}
                  categoryName={category?.name ?? ""}
                />
              </div>
            )}
          </header>

          {/* Introduction */}
          <section id="intro" className="mb-10 scroll-mt-24">
            <h2 className="text-xl font-bold text-text mb-4 flex items-center gap-2">
              <span>📖</span> 通俗介绍
            </h2>
            <div className="bg-card rounded-xl border border-border p-6">
              <p className="text-text leading-relaxed whitespace-pre-line">{model.introduction}</p>
            </div>
          </section>

          {story && (
            <section id="story" className="mb-10 scroll-mt-24">
              <h2 className="text-xl font-bold text-text mb-4 flex items-center gap-2">
                <span>📖</span> 小故事
              </h2>
              <div className="relative bg-card rounded-xl border border-border p-6 overflow-hidden">
                <div className="absolute -left-1 -top-6 text-[110px] leading-none text-primary/10 select-none font-serif pointer-events-none">
                  &ldquo;
                </div>
                <p className="relative text-text leading-relaxed whitespace-pre-line">{story}</p>
              </div>
            </section>
          )}

          {/* Key Insight */}
          <section id="insight" className="mb-10 scroll-mt-24">
            <h2 className="text-xl font-bold text-text mb-4 flex items-center gap-2">
              <span>🎯</span> 关键洞察
            </h2>
            <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl border border-primary/10 p-6">
              <p className="text-text leading-relaxed font-medium">{model.keyInsight}</p>
            </div>
          </section>

          {/* Cases */}
          <section id="cases" className="mb-10 scroll-mt-24">
            <h2 className="text-xl font-bold text-text mb-4 flex items-center gap-2">
              <span>📚</span> 有趣案例
            </h2>
            <div className="space-y-4">
              {model.cases.map((c, i) => (
                <div key={i} className="bg-card rounded-xl border border-border p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <h3 className="font-semibold text-text">{c.title}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      c.type === "negative" ? "bg-red-50 text-red-600" : c.type === "business" ? "bg-blue-50 text-blue-600" : "bg-green-50 text-green-600"
                    }`}>
                      {caseTypeLabels[c.type]}
                    </span>
                  </div>
                  <p className="text-text-secondary leading-relaxed">{c.content}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Usage Guide */}
          <section id="usage" className="mb-10 scroll-mt-24">
            <h2 className="text-xl font-bold text-text mb-4 flex items-center gap-2">
              <span>🛠️</span> 使用指引
            </h2>
            <div className="space-y-6">
              {/* Scenarios */}
              <div className="bg-card rounded-xl border border-border p-6">
                <h3 className="font-semibold text-text mb-3">📌 适用场景</h3>
                <ul className="space-y-2">
                  {model.usage.scenarios.map((s, i) => (
                    <li key={i} className="flex items-start gap-2 text-text-secondary">
                      <span className="text-primary mt-1">•</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Steps */}
              <div className="bg-card rounded-xl border border-border p-6">
                <h3 className="font-semibold text-text mb-3">📝 使用步骤</h3>
                <ol className="space-y-3">
                  {model.usage.steps.map((s, i) => (
                    <li key={i} className="flex items-start gap-3 text-text-secondary">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white text-xs font-bold shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Pitfalls */}
              <div className="bg-card rounded-xl border border-border p-6">
                <h3 className="font-semibold text-text mb-3">⚠️ 常见误区</h3>
                <ul className="space-y-2">
                  {model.usage.pitfalls.map((p, i) => (
                    <li key={i} className="flex items-start gap-2 text-text-secondary">
                      <span className="text-accent-dark mt-1">⚡</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Combine With */}
              <div className="bg-card rounded-xl border border-border p-6">
                <h3 className="font-semibold text-text mb-3">🤝 搭配使用</h3>
                <div className="flex flex-wrap gap-2">
                  {model.usage.combineWith.map((c, i) => (
                    <span key={i} className="bg-primary/10 text-primary text-sm px-3 py-1.5 rounded-full font-medium">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Memory Card */}
          <section id="memory" className="mb-10 scroll-mt-24">
            <h2 className="text-xl font-bold text-text mb-4 flex items-center gap-2">
              <span>💡</span> 一句话记忆
            </h2>
            <div className="bg-gradient-to-r from-primary to-primary-dark rounded-xl p-8 text-center">
              <p className="text-xl sm:text-2xl font-bold text-white leading-relaxed">
                &ldquo;{model.memorySentence}&rdquo;
              </p>
            </div>
          </section>

          {/* Further Reading */}
          <section id="reading" className="mb-10 scroll-mt-24">
            <h2 className="text-xl font-bold text-text mb-4 flex items-center gap-2">
              <span>📎</span> 延伸阅读
            </h2>
            <div className="bg-card rounded-xl border border-border p-6">
              <ul className="space-y-2">
                {model.furtherReading.map((r, i) => (
                  <li key={i} className="flex items-start gap-2 text-text-secondary">
                    <span className="text-secondary">📘</span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Related Models */}
          {related.length > 0 && (
            <section id="related" className="mb-10 scroll-mt-24">
              <h2 className="text-xl font-bold text-text mb-4 flex items-center gap-2">
                <span>🔗</span> 相关模型
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {related.map((rm) => (
                  <Link
                    key={rm.id}
                    href={`/models/${rm.slug}`}
                    className="flex items-center gap-3 p-4 bg-card rounded-xl border border-border hover:border-primary/30 hover:shadow-md transition-all group"
                  >
                    <span className="text-2xl">{rm.icon}</span>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-text group-hover:text-primary transition-colors">
                        {rm.title}
                      </h3>
                      <p className="text-sm text-text-secondary truncate">{rm.subtitle}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </article>
      </div>
    </div>
  );
}
