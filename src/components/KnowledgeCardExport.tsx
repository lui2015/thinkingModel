"use client";

import { useRef, useState } from "react";
import {
  difficultyLabels,
  difficultyStars,
  type MentalModel,
} from "@/lib/models-data";

interface KnowledgeCardExportProps {
  model: MentalModel;
  categoryColor: string;
  categoryName: string;
}

// 把颜色压暗，作为渐变终点
function mixWithBlack(hex: string, ratio = 0.5): string {
  const m = hex.replace("#", "");
  const r = parseInt(m.substring(0, 2), 16);
  const g = parseInt(m.substring(2, 4), 16);
  const b = parseInt(m.substring(4, 6), 16);
  const mix = (c: number) => Math.round(c * (1 - ratio));
  return `rgb(${mix(r)}, ${mix(g)}, ${mix(b)})`;
}

const WATERMARK = "www.luliming.xyz/thinkingModel";

export default function KnowledgeCardExport({
  model,
  categoryColor,
  categoryName,
}: KnowledgeCardExportProps) {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const dark = mixWithBlack(categoryColor, 0.55);
  const gradient = `linear-gradient(160deg, ${categoryColor} 0%, ${dark} 100%)`;

  const downloadOne = async (i: number) => {
    const node = cardRefs.current[i];
    if (!node) return;
    const { toPng } = await import("html-to-image");
    const dataUrl = await toPng(node, {
      pixelRatio: 3, // 360x640 -> 1080x1920
      cacheBust: true,
      backgroundColor: "#0A0A1A",
    });
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = `thinkingModel-${model.slug}-${i + 1}.png`;
    a.click();
  };

  const downloadAll = async () => {
    if (busy) return;
    setBusy(true);
    for (let i = 0; i < 5; i++) {
      // 等待模态卡片渲染完成
      // eslint-disable-next-line no-await-in-loop
      await downloadOne(i);
      // eslint-disable-next-line no-await-in-loop
      await new Promise((r) => setTimeout(r, 450));
    }
    setBusy(false);
  };

  const shellStyle: React.CSSProperties = {
    width: 360,
    height: 640,
    background: gradient,
  };

  const renderCard = (i: number) => {
    const setRef = (el: HTMLDivElement | null) => {
      cardRefs.current[i] = el;
    };

    const footer = (
      <div className="mt-auto pt-4 flex items-center justify-between text-white/70 text-[11px]">
        <span>{categoryName} · {model.title}</span>
        <span className="font-mono">{WATERMARK}</span>
      </div>
    );

    let body: React.ReactNode = null;

    if (i === 0) {
      // 封面
      body = (
        <div className="flex-1 flex flex-col">
          <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.18em] text-white/70 font-semibold">
            <span>思维模型 · 知识卡片</span>
            <span>1 / 5</span>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center text-center px-2">
            <div
              className="w-28 h-28 rounded-3xl flex items-center justify-center text-6xl mb-6 shadow-lg"
              style={{ background: "rgba(255,255,255,0.16)" }}
            >
              {model.icon}
            </div>
            <h2
              className="text-4xl font-black text-white leading-tight"
              style={{ textShadow: "0 2px 8px rgba(0,0,0,0.25)" }}
            >
              {model.title}
            </h2>
            <p className="mt-3 text-white/85 text-base leading-relaxed">{model.subtitle}</p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
              {model.tags.slice(0, 3).map((t) => (
                <span
                  key={t}
                  className="text-xs px-2.5 py-1 rounded-full bg-white/15 text-white/90"
                >
                  #{t}
                </span>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-white/85">
            <span className="px-3 py-1 rounded-full bg-white/15">{categoryName}</span>
            <span>
              {difficultyStars[model.difficulty]} {difficultyLabels[model.difficulty]}
            </span>
          </div>
          {footer}
        </div>
      );
    } else if (i === 1) {
      // 核心洞察
      body = (
        <div className="flex-1 flex flex-col">
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-white/70 font-semibold mb-5">
            <span className="w-8 h-px bg-white/50" />
            核心洞察 · KEY INSIGHT
            <span className="text-white/40">2 / 5</span>
          </div>
          <div
            className="flex-1 flex items-center justify-center rounded-2xl p-6 text-center"
            style={{ background: "rgba(0,0,0,0.18)" }}
          >
            <p
              className="text-2xl sm:text-[26px] font-bold leading-relaxed text-white"
              style={{ textShadow: "0 1px 4px rgba(0,0,0,0.2)" }}
            >
              {model.keyInsight}
            </p>
          </div>
          {footer}
        </div>
      );
    } else if (i === 2) {
      // 三步上手
      const steps = model.usage.steps.slice(0, 3);
      body = (
        <div className="flex-1 flex flex-col">
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-white/70 font-semibold mb-5">
            <span className="w-8 h-px bg-white/50" />
            三步上手 · HOW TO USE
            <span className="text-white/40">3 / 5</span>
          </div>
          <div className="flex-1 flex flex-col justify-center gap-4">
            {steps.map((s, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <span
                  className="shrink-0 w-10 h-10 rounded-full bg-white text-lg font-black flex items-center justify-center"
                  style={{ color: categoryColor }}
                >
                  {idx + 1}
                </span>
                <p className="text-white text-lg leading-snug pt-1.5">{s}</p>
              </div>
            ))}
          </div>
          {footer}
        </div>
      );
    } else if (i === 3) {
      // 记忆金句
      body = (
        <div className="flex-1 flex flex-col">
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-white/70 font-semibold mb-5">
            <span className="w-8 h-px bg-white/50" />
            一句话记住 · REMEMBER
            <span className="text-white/40">4 / 5</span>
          </div>
          <div className="flex-1 flex items-center justify-center text-center px-2">
            <p
              className="text-[34px] font-black leading-tight text-white"
              style={{ textShadow: "0 2px 10px rgba(0,0,0,0.3)" }}
            >
              “{model.memorySentence}”
            </p>
          </div>
          {footer}
        </div>
      );
    } else {
      // 避坑 & 场景
      const pitfalls = model.usage.pitfalls.slice(0, 2);
      const scenarios = model.usage.scenarios.slice(0, 3);
      body = (
        <div className="flex-1 flex flex-col">
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-white/70 font-semibold mb-4">
            <span className="w-8 h-px bg-white/50" />
            避坑 & 场景 · TIPS
            <span className="text-white/40">5 / 5</span>
          </div>
          <div
            className="rounded-2xl p-4 mb-3"
            style={{ background: "rgba(0,0,0,0.18)" }}
          >
            <p className="text-white/80 text-xs font-semibold mb-2">⚡ 常见误区</p>
            <ul className="space-y-1.5">
              {pitfalls.map((p, idx) => (
                <li key={idx} className="text-white text-sm leading-snug flex gap-2">
                  <span className="text-white/60">•</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl p-4" style={{ background: "rgba(255,255,255,0.14)" }}>
            <p className="text-white/90 text-xs font-semibold mb-2">📌 适用场景</p>
            <ul className="space-y-1.5">
              {scenarios.map((s, idx) => (
                <li key={idx} className="text-white text-sm leading-snug flex gap-2">
                  <span className="text-white/70">•</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
          {footer}
        </div>
      );
    }

    return (
      <div
        ref={setRef}
        style={shellStyle}
        className="relative shrink-0 rounded-2xl overflow-hidden text-white p-7 flex flex-col"
      >
        {/* 装饰光斑 */}
        <div
          className="pointer-events-none absolute -right-16 -top-16 w-56 h-56 rounded-full opacity-25 blur-2xl"
          style={{ background: "radial-gradient(circle, #fff 0%, transparent 70%)" }}
        />
        <div
          className="pointer-events-none absolute -left-12 -bottom-20 w-48 h-48 rounded-full opacity-15 blur-2xl"
          style={{ background: "radial-gradient(circle, #fff 0%, transparent 70%)" }}
        />
        <div className="relative flex-1 flex flex-col">{body}</div>
      </div>
    );
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-primary-dark px-4 py-2 text-sm font-medium text-white shadow-md hover:opacity-90 active:scale-95 transition-all"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4"
          />
        </svg>
        导出知识卡片
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-surface-solid rounded-2xl border border-border max-w-5xl w-full max-h-[92vh] flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <div>
                <h3 className="text-lg font-bold text-text">导出知识卡片</h3>
                <p className="text-sm text-text-secondary">
                  5 张竖屏卡片（1080×1920），适合发抖音 / 短视频
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={downloadAll}
                  disabled={busy}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-primary-dark px-4 py-2 text-sm font-medium text-white hover:opacity-90 active:scale-95 transition-all disabled:opacity-60"
                >
                  {busy ? "导出中…" : "下载全部 5 张"}
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-full p-2 text-text-secondary hover:bg-surface-alt transition-colors"
                  aria-label="关闭"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-auto p-6">
              <div className="flex gap-5 overflow-x-auto pb-2">
                {[0, 1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex flex-col items-center gap-3">
                    {renderCard(i)}
                    <button
                      type="button"
                      onClick={() => downloadOne(i)}
                      className="text-sm text-primary hover:text-primary-dark font-medium underline-offset-2 hover:underline"
                    >
                      下载第 {i + 1} 张
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
