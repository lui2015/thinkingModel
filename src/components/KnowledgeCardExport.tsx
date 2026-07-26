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

// 颜色压暗，作为渐变深色端
function mixWithBlack(hex: string, ratio = 0.5): string {
  const m = hex.replace("#", "");
  const r = parseInt(m.substring(0, 2), 16);
  const g = parseInt(m.substring(2, 4), 16);
  const b = parseInt(m.substring(4, 6), 16);
  const mix = (c: number) => Math.round(c * (1 - ratio));
  return `rgb(${mix(r)}, ${mix(g)}, ${mix(b)})`;
}

// 颜色调亮，用于浅色高光 / 连线
function mixWithWhite(hex: string, ratio = 0.4): string {
  const m = hex.replace("#", "");
  const r = parseInt(m.substring(0, 2), 16);
  const g = parseInt(m.substring(2, 4), 16);
  const b = parseInt(m.substring(4, 6), 16);
  const mix = (c: number) => Math.round(c + (255 - c) * ratio);
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

  const accent = mixWithWhite(categoryColor, 0.22);
  const deep = mixWithBlack(categoryColor, 0.42);
  const gradient = `linear-gradient(155deg, ${deep} 0%, #0B0B1A 68%)`;

  const downloadOne = async (i: number) => {
    const node = cardRefs.current[i];
    if (!node) return;
    const { toPng } = await import("html-to-image");
    const dataUrl = await toPng(node, {
      pixelRatio: 3, // 360x640 -> 1080x1920
      cacheBust: true,
      backgroundColor: "#0B0B1A",
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

  // 顶部 eyebrow：序号 + 中文 + 英文
  const Header = ({ num, cn, en }: { num: number; cn: string; en: string }) => (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        <span className="w-7 h-px" style={{ background: accent }} />
        <span className="text-[13px] font-bold tracking-wide text-white">
          {cn}
        </span>
        <span className="text-[9px] uppercase tracking-[0.2em] text-white/45">
          {en}
        </span>
      </div>
      <span className="text-[11px] font-mono text-white/40">
        {num} / 5
      </span>
    </div>
  );

  const footer = (
    <div className="mt-auto pt-4 flex items-center justify-between text-white/55 text-[10px]">
      <span className="truncate max-w-[200px]">
        {categoryName} · {model.title}
      </span>
      <span className="font-mono shrink-0">{WATERMARK}</span>
    </div>
  );

  // 通用玻璃内容层
  const Glass: React.FC<React.PropsWithChildren<{ className?: string }>> = ({
    children,
    className = "",
  }) => (
    <div
      className={`rounded-2xl ${className}`}
      style={{
        background: "rgba(255,255,255,0.07)",
        border: "1px solid rgba(255,255,255,0.12)",
      }}
    >
      {children}
    </div>
  );

  const renderCard = (i: number) => {
    const setRef = (el: HTMLDivElement | null) => {
      cardRefs.current[i] = el;
    };

    let body: React.ReactNode = null;

    if (i === 0) {
      // 第 1 张：模型名称（封面）
      body = (
        <div className="flex-1 flex flex-col">
          <Header num={1} cn="模型名称" en="THE MODEL" />
          <div className="flex-1 flex flex-col items-center justify-center text-center px-1">
            <div
              className="w-28 h-28 rounded-[28px] flex items-center justify-center text-6xl mb-6 shadow-2xl"
              style={{
                background:
                  "linear-gradient(145deg, rgba(255,255,255,0.22), rgba(255,255,255,0.06))",
                boxShadow: `0 18px 40px -12px ${categoryColor}88, inset 0 1px 0 rgba(255,255,255,0.35)`,
              }}
            >
              {model.icon}
            </div>
            <h2
              className="text-[34px] font-black text-white leading-[1.1]"
              style={{ textShadow: "0 2px 10px rgba(0,0,0,0.35)" }}
            >
              {model.title}
            </h2>
            <p className="mt-3 text-white/75 text-[15px] leading-relaxed px-2">
              {model.subtitle}
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
              {model.tags.slice(0, 3).map((t) => (
                <span
                  key={t}
                  className="text-[11px] px-2.5 py-1 rounded-full"
                  style={{ background: "rgba(255,255,255,0.14)", color: "#fff" }}
                >
                  #{t}
                </span>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2 text-[13px] text-white/85">
            <span
              className="px-3 py-1 rounded-full text-white text-[12px] font-medium"
              style={{ background: categoryColor }}
            >
              {categoryName}
            </span>
            <span>
              {difficultyStars[model.difficulty]}{" "}
              {difficultyLabels[model.difficulty]}
            </span>
          </div>
          {footer}
        </div>
      );
    } else if (i === 1) {
      // 第 2 张：模型图解（中心 + 要素卫星节点关系图）
      const nodes = model.tags.slice(0, 3);
      const cx = 152;
      const cy = 132;
      const center = { x: cx, y: cy };
      const positions = [
        { x: 152, y: 34 }, // 上
        { x: 44, y: 214 }, // 左下
        { x: 260, y: 214 }, // 右下
      ];
      body = (
        <div className="flex-1 flex flex-col">
          <Header num={2} cn="模型图解" en="VISUAL MAP" />
          <div className="flex-1 flex flex-col">
            <div
              className="relative mx-auto"
              style={{ width: 304, height: 256 }}
            >
              <svg
                width="304"
                height="256"
                viewBox="0 0 304 256"
                className="absolute inset-0"
              >
                {positions.map((p, idx) => (
                  <line
                    key={idx}
                    x1={center.x}
                    y1={center.y}
                    x2={p.x}
                    y2={p.y}
                    stroke={accent}
                    strokeWidth={1.5}
                    strokeOpacity={0.55}
                  />
                ))}
                <circle cx={center.x} cy={center.y} r={50} fill={categoryColor} fillOpacity={0.18} />
              </svg>

              {/* 中心节点 */}
              <div
                className="absolute flex flex-col items-center justify-center text-center"
                style={{
                  left: cx - 48,
                  top: cy - 48,
                  width: 96,
                  height: 96,
                  borderRadius: 9999,
                  background: `linear-gradient(145deg, ${categoryColor}, ${deep})`,
                  boxShadow: `0 14px 34px -10px ${categoryColor}, inset 0 1px 0 rgba(255,255,255,0.3)`,
                }}
              >
                <span className="text-3xl leading-none">{model.icon}</span>
                <span className="text-[11px] font-bold text-white mt-1 px-1 leading-tight">
                  {model.title.length > 6
                    ? model.title.slice(0, 6) + "…"
                    : model.title}
                </span>
              </div>

              {/* 卫星节点 */}
              {positions.map((p, idx) => (
                <div
                  key={idx}
                  className="absolute flex items-center justify-center text-center px-2"
                  style={{
                    left: p.x - 50,
                    top: p.y - 26,
                    width: 100,
                    height: 52,
                    borderRadius: 16,
                    background: "rgba(255,255,255,0.09)",
                    border: "1px solid rgba(255,255,255,0.16)",
                    color: "#fff",
                    fontSize: 13,
                    fontWeight: 600,
                    lineHeight: 1.25,
                  }}
                >
                  {nodes[idx] ?? "要素"}
                </div>
              ))}
            </div>
            <p className="text-white/70 text-[12.5px] leading-relaxed px-2 mt-3 text-center">
              {model.keyInsight}
            </p>
          </div>
          {footer}
        </div>
      );
    } else if (i === 2) {
      // 第 3 张：模型解读（核心洞察）
      body = (
        <div className="flex-1 flex flex-col">
          <Header num={3} cn="模型解读" en="THE INSIGHT" />
          <div className="flex-1 flex flex-col">
            <Glass className="flex-1 p-6 flex items-center justify-center text-center">
              <p
                className="text-[22px] font-bold leading-[1.6] text-white"
                style={{ textShadow: "0 1px 6px rgba(0,0,0,0.25)" }}
              >
                {model.keyInsight}
              </p>
            </Glass>
            <p className="text-white/60 text-[12px] leading-relaxed mt-3 px-1">
              {model.introduction.length > 80
                ? model.introduction.slice(0, 80) + "…"
                : model.introduction}
            </p>
          </div>
          {footer}
        </div>
      );
    } else if (i === 3) {
      // 第 4 张：实操步骤
      const steps = model.usage.steps.slice(0, 3);
      body = (
        <div className="flex-1 flex flex-col">
          <Header num={4} cn="实操步骤" en="HOW TO USE" />
          <div className="flex-1 flex flex-col justify-center gap-4">
            {steps.map((s, idx) => (
              <div key={idx} className="flex items-start gap-3.5">
                <div className="flex flex-col items-center">
                  <span
                    className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-[15px] font-black text-white"
                    style={{
                      background: categoryColor,
                      boxShadow: `0 6px 16px -6px ${categoryColor}`,
                    }}
                  >
                    {idx + 1}
                  </span>
                  {idx < steps.length - 1 && (
                    <span
                      className="w-px flex-1 mt-1"
                      style={{ background: "rgba(255,255,255,0.18)", minHeight: 14 }}
                    />
                  )}
                </div>
                <p className="text-white/90 text-[16px] leading-snug pt-1.5 flex-1">
                  {s}
                </p>
              </div>
            ))}
          </div>
          {footer}
        </div>
      );
    } else {
      // 第 5 张：总结（金句 + 场景 / 避坑）
      const pitfall = model.usage.pitfalls[0];
      const scenario = model.usage.scenarios[0];
      body = (
        <div className="flex-1 flex flex-col">
          <Header num={5} cn="一句话总结" en="IN A NUTSHELL" />
          <div
            className="rounded-2xl p-6 mb-3 flex items-center justify-center text-center"
            style={{
              background: `linear-gradient(135deg, ${categoryColor}cc, ${deep})`,
              boxShadow: `inset 0 1px 0 rgba(255,255,255,0.25)`,
            }}
          >
            <p
              className="text-[26px] font-black leading-[1.45] text-white"
              style={{ textShadow: "0 2px 10px rgba(0,0,0,0.3)" }}
            >
              “{model.memorySentence}”
            </p>
          </div>
          <div className="grid grid-cols-1 gap-2.5">
            {scenario && (
              <div
                className="rounded-xl px-4 py-2.5 flex items-start gap-2"
                style={{
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <span className="text-[14px]">📌</span>
                <span className="text-white/85 text-[13px] leading-snug">
                  <b className="text-white/95">场景：</b>
                  {scenario}
                </span>
              </div>
            )}
            {pitfall && (
              <div
                className="rounded-xl px-4 py-2.5 flex items-start gap-2"
                style={{
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <span className="text-[14px]">⚡</span>
                <span className="text-white/85 text-[13px] leading-snug">
                  <b className="text-white/95">避坑：</b>
                  {pitfall}
                </span>
              </div>
            )}
          </div>
          {footer}
        </div>
      );
    }

    return (
      <div
        ref={setRef}
        style={shellStyle}
        className="relative shrink-0 rounded-[20px] overflow-hidden text-white p-7 flex flex-col"
      >
        {/* 主色光晕 */}
        <div
          className="pointer-events-none absolute -right-20 -top-24 w-64 h-64 rounded-full blur-3xl"
          style={{ background: `radial-gradient(circle, ${categoryColor}66 0%, transparent 70%)` }}
        />
        <div
          className="pointer-events-none absolute -left-24 -bottom-28 w-60 h-60 rounded-full blur-3xl"
          style={{ background: `radial-gradient(circle, ${accent}33 0%, transparent 70%)` }}
        />
        <div className="pointer-events-none absolute right-6 bottom-6 text-[60px] opacity-[0.06] select-none">
          {model.icon}
        </div>
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
