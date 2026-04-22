"use client";

import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import {
  difficultyStars,
  difficultyLabels,
  getCategoryById,
  type MentalModel,
} from "@/lib/models-data";

interface DailyModelCardProps {
  initialModel: MentalModel;
  models: MentalModel[];
}

// 使颜色更深/更浅（用于渐变端点），简单的 rgb mix
function mixWithBlack(hex: string, ratio = 0.3): string {
  const m = hex.replace("#", "");
  const r = parseInt(m.substring(0, 2), 16);
  const g = parseInt(m.substring(2, 4), 16);
  const b = parseInt(m.substring(4, 6), 16);
  const mix = (c: number) => Math.round(c * (1 - ratio));
  return `rgb(${mix(r)}, ${mix(g)}, ${mix(b)})`;
}

function formatDate(d: Date): string {
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(
    d.getDate()
  ).padStart(2, "0")}`;
}

export default function DailyModelCard({ initialModel, models }: DailyModelCardProps) {
  const [model, setModel] = useState<MentalModel>(initialModel);
  const [spinning, setSpinning] = useState(false);

  const category = useMemo(() => getCategoryById(model.category), [model.category]);
  const today = useMemo(() => formatDate(new Date()), []);

  const catColor = category?.color ?? "#6C5CE7";
  const gradientFrom = catColor;
  const gradientTo = mixWithBlack(catColor, 0.45);

  const pickRandom = useCallback(() => {
    if (models.length <= 1) return model;
    let next = model;
    while (next.id === model.id) {
      next = models[Math.floor(Math.random() * models.length)];
    }
    return next;
  }, [model, models]);

  const handleRefresh = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setSpinning(true);
      setModel(pickRandom());
      window.setTimeout(() => setSpinning(false), 500);
    },
    [pickRandom]
  );

  return (
    <Link href={`/models/${model.slug}`} className="block group">
      <div
        className="relative overflow-hidden rounded-3xl p-6 sm:p-8 text-white shadow-xl transition-all hover:-translate-y-0.5"
        style={{
          background: `linear-gradient(135deg, ${gradientFrom} 0%, ${gradientTo} 100%)`,
          boxShadow: `0 20px 40px -18px ${catColor}66`,
        }}
      >
        {/* 背景装饰 */}
        <div
          className="pointer-events-none absolute -right-16 -top-16 w-64 h-64 rounded-full opacity-20 blur-2xl"
          style={{ background: "radial-gradient(circle, #fff 0%, transparent 70%)" }}
        />
        <div
          className="pointer-events-none absolute -left-10 -bottom-20 w-56 h-56 rounded-full opacity-10 blur-2xl"
          style={{ background: "radial-gradient(circle, #fff 0%, transparent 70%)" }}
        />
        <div className="pointer-events-none absolute right-6 top-4 text-[120px] leading-none opacity-[0.08] select-none">
          {model.icon}
        </div>

        {/* Header */}
        <div className="relative flex items-center justify-between gap-3 mb-5">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur-sm px-3 py-1 text-xs font-medium ring-1 ring-white/20">
              <span>✨</span>
              <span>每日一模型</span>
            </span>
            <span className="text-xs text-white/60 tabular-nums">{today}</span>
          </div>
          <button
            type="button"
            onClick={handleRefresh}
            aria-label="换一个"
            title="换一个"
            className="inline-flex items-center gap-1.5 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-sm ring-1 ring-white/20 px-3 py-1.5 text-xs font-medium transition-colors"
          >
            <svg
              className={`w-3.5 h-3.5 ${spinning ? "animate-[spin_0.5s_ease-in-out]" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0A8.003 8.003 0 014.582 15m15.837 0H15"
              />
            </svg>
            <span>换一个</span>
          </button>
        </div>

        {/* Body */}
        <div className="relative flex items-start gap-5">
          {/* Icon 圆形徽标 */}
          <div className="shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/15 backdrop-blur-sm ring-1 ring-white/25 flex items-center justify-center text-4xl sm:text-5xl shadow-inner">
            {model.icon}
          </div>

          <div className="flex-1 min-w-0">
            {/* 分类 + 难度 */}
            <div className="flex items-center gap-2 flex-wrap text-xs mb-2">
              {category && (
                <span className="inline-flex items-center gap-1 rounded-full bg-white/15 backdrop-blur-sm ring-1 ring-white/20 px-2.5 py-0.5 font-medium">
                  <span>{category.icon}</span>
                  <span>{category.name}</span>
                </span>
              )}
              <span
                className="inline-flex items-center gap-1 rounded-full bg-white/10 ring-1 ring-white/20 px-2.5 py-0.5 font-medium"
                title={`难度：${difficultyLabels[model.difficulty]}`}
              >
                <span className="text-[10px] tracking-widest">
                  {difficultyStars[model.difficulty]}
                </span>
                <span className="text-white/80">{difficultyLabels[model.difficulty]}</span>
              </span>
            </div>

            {/* 标题 */}
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight group-hover:underline decoration-white/40 underline-offset-[6px] decoration-2">
              {model.title}
            </h3>
            <p className="text-white/80 mt-1.5 text-sm sm:text-base">{model.subtitle}</p>

            {/* 标签 */}
            {model.tags?.length > 0 && (
              <div className="mt-3 flex items-center gap-1.5 flex-wrap">
                {model.tags.slice(0, 4).map((t) => (
                  <span
                    key={t}
                    className="text-[11px] px-2 py-0.5 rounded-md bg-white/10 text-white/80 ring-1 ring-white/15"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 核心洞察 */}
        <div className="relative mt-6 rounded-2xl bg-black/15 backdrop-blur-sm ring-1 ring-white/10 p-4 sm:p-5">
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.15em] text-white/60 font-semibold mb-2">
            <span className="w-6 h-px bg-white/40" />
            <span>Key Insight · 核心洞察</span>
          </div>
          <p className="text-sm sm:text-[15px] leading-relaxed text-white/90 line-clamp-3">
            {model.keyInsight}
          </p>
        </div>

        {/* Footer: 金句 + CTA */}
        <div className="relative mt-5 flex items-end justify-between gap-4">
          <p className="text-white/70 text-sm italic leading-relaxed line-clamp-2 flex-1">
            <span className="text-white/40 mr-1 text-lg leading-none align-text-top">&ldquo;</span>
            {model.memorySentence}
            <span className="text-white/40 ml-1 text-lg leading-none align-text-top">&rdquo;</span>
          </p>
          <span className="shrink-0 inline-flex items-center gap-1.5 text-sm font-medium text-white/90 group-hover:text-white">
            <span>深入学习</span>
            <svg
              className="w-4 h-4 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
