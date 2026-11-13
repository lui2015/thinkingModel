"use client";

import { useMemo, useState, useCallback, useRef, useEffect } from "react";
import Link from "next/link";
import { models, categories } from "@/lib/models-data";
import { modelClusters, type ModelCluster } from "@/lib/model-clusters";

/* ---------- 布局常量 ---------- */
const COL_X = [40, 280, 560, 880]; // root / category / cluster / model 的 x
const COL_W = [200, 236, 280, 250];
const ROW_H = 62;       // 主题簇行高
const MODEL_H = 40;     // 模型节点行高
const PAD_TOP = 40;
const CANVAS_W = 1180;

function FullscreenIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M1.5 6H6V1.5" /><path d="M14.5 6H10V1.5" />
      <path d="M1.5 10H6v4.5" /><path d="M14.5 10H10v4.5" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true">
      <path d="M3.5 3.5l9 9" /><path d="M12.5 3.5l-9 9" />
    </svg>
  );
}

interface FlatNode {
  key: string;
  kind: "root" | "category" | "cluster" | "model";
  x: number;
  y: number;   // 中心 y
  h: number;
  label: string;
  sub?: string;
  icon?: string;
  color: string;
  categoryId?: string;
  clusterId?: string;
  slug?: string;
  count?: number;
  mnemonic?: string;
  expanded?: boolean;
  dimmed?: boolean;
}

interface Edge {
  from: string;
  to: string;
  x1: number; y1: number; x2: number; y2: number;
  color: string;
  strong: boolean;
}

export default function GraphClient() {
  const [expandedClusters, setExpandedClusters] = useState<Set<string>>(new Set());
  const [collapsedCategories, setCollapsedCategories] = useState<Set<string>>(new Set());
  const [focusCategory, setFocusCategory] = useState<string>("");
  const [query, setQuery] = useState("");
  const [scale, setScale] = useState(1);
  const [hovered, setHovered] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const didCenterRef = useRef(false);

  const modelBySlug = useMemo(() => new Map(models.map((m) => [m.slug, m])), []);
  const q = query.trim().toLowerCase();

  const matchesQuery = useCallback(
    (slug: string) => {
      if (!q) return true;
      const m = modelBySlug.get(slug);
      if (!m) return false;
      return (
        m.title.toLowerCase().includes(q) ||
        m.slug.includes(q) ||
        m.tags.some((t) => t.toLowerCase().includes(q)) ||
        m.keyInsight.toLowerCase().includes(q)
      );
    },
    [q, modelBySlug]
  );

  /* 命中搜索时，自动展开包含结果的簇 */
  const clusterHasMatch = useCallback(
    (c: ModelCluster) => !!q && c.slugs.some((s) => matchesQuery(s)),
    [q, matchesQuery]
  );

  const clusterExpanded = useCallback(
    (c: ModelCluster) => expandedClusters.has(c.id) || clusterHasMatch(c),
    [expandedClusters, clusterHasMatch]
  );

  /* ---------- 计算树布局（确定性，无随机） ---------- */
  const { nodes, edges, canvasH } = useMemo(() => {
    const flat: FlatNode[] = [];
    const links: Edge[] = [];
    let cursor = PAD_TOP;

    const visibleCategories = categories.filter(
      (c) => !focusCategory || c.id === focusCategory
    );

    // 搜索时：只保留有命中模型的分类/簇
    const categoriesToRender = q
      ? visibleCategories.filter((c) =>
          modelClusters.some((cl) => cl.category === c.id && clusterHasMatch(cl))
        )
      : visibleCategories;

    const rootKey = "root";
    const rootNode: FlatNode = {
      key: rootKey, kind: "root", x: COL_X[0], y: 0, h: 92,
      label: "思维模型库", sub: `${models.length} 模型 · ${categories.length} 分类 · ${modelClusters.length} 主题簇`,
      icon: "🧠", color: "var(--color-primary)",
    };
    flat.push(rootNode);

    const categoryCenters: number[] = [];

    categoriesToRender.forEach((cat) => {
      const catKey = `cat-${cat.id}`;
      const isCollapsed = collapsedCategories.has(cat.id) && !q;
      const clusters = modelClusters.filter(
        (cl) => cl.category === cat.id && (!q || clusterHasMatch(cl))
      );

      const catNode: FlatNode = {
        key: catKey, kind: "category", x: COL_X[1], y: 0, h: 64,
        label: cat.name, sub: cat.description, icon: cat.icon, color: cat.color,
        categoryId: cat.id,
        count: clusters.reduce((n, c) => n + c.slugs.length, 0),
        expanded: !isCollapsed,
      };
      flat.push(catNode);

      const clusterCenters: number[] = [];

      if (!isCollapsed) {
        clusters.forEach((cl) => {
          const clKey = `cl-${cl.id}`;
          const expanded = clusterExpanded(cl);
          const clNode: FlatNode = {
            key: clKey, kind: "cluster", x: COL_X[2], y: 0,
            h: expanded ? 56 : 56,
            label: cl.title, icon: cl.icon, color: cat.color,
            categoryId: cat.id, clusterId: cl.id,
            count: cl.slugs.length, mnemonic: cl.mnemonic,
            expanded,
          };

          const shownModels = expanded
            ? cl.slugs.map((s) => modelBySlug.get(s)).filter((m): m is NonNullable<typeof m> => !!m)
                .filter((m) => !q || matchesQuery(m.slug))
            : [];

          if (shownModels.length === 0) {
            clNode.y = cursor + ROW_H / 2;
            cursor += ROW_H;
          } else {
            const modelCenters: number[] = [];
            shownModels.forEach((m) => {
              const y = cursor + MODEL_H / 2;
              cursor += MODEL_H;
              modelCenters.push(y);
              const mNode: FlatNode = {
                key: `m-${m.slug}`, kind: "model", x: COL_X[3], y, h: 34,
                label: m.title, icon: m.icon, color: cat.color,
                categoryId: cat.id, clusterId: cl.id, slug: m.slug,
                dimmed: false,
              };
              flat.push(mNode);
              links.push({
                from: clKey, to: mNode.key,
                x1: COL_X[2] + COL_W[2], y1: clNode.y,
                x2: COL_X[3], y2: y,
                color: cat.color, strong: false,
              });
            });
            clNode.y = (modelCenters[0] + modelCenters[modelCenters.length - 1]) / 2;
            cursor += 10; // 簇间距
          }
          flat.push(clNode);
          clusterCenters.push(clNode.y);
          links.push({
            from: catKey, to: clKey,
            x1: COL_X[1] + COL_W[1], y1: catNode.y,
            x2: COL_X[2], y2: clNode.y,
            color: cat.color, strong: false,
          });
        });
      } else {
        const y = cursor + ROW_H / 2;
        cursor += ROW_H;
        catNode.y = y;
        clusterCenters.push(y);
      }

      if (clusterCenters.length) {
        catNode.y = (clusterCenters[0] + clusterCenters[clusterCenters.length - 1]) / 2;
      } else {
        catNode.y = cursor + ROW_H / 2;
        cursor += ROW_H;
      }
      categoryCenters.push(catNode.y);
      links.push({
        from: rootKey, to: catKey,
        x1: COL_X[0] + COL_W[0], y1: rootNode.y,
        x2: COL_X[1], y2: catNode.y,
        color: cat.color, strong: true,
      });
      cursor += 22; // 分类间距
    });

    if (categoryCenters.length) {
      rootNode.y = (categoryCenters[0] + categoryCenters[categoryCenters.length - 1]) / 2;
    }

    // 回填连线端点（父节点 y 在遍历中才确定）
    links.forEach((e) => {
      const from = flat.find((n) => n.key === e.from);
      if (from) e.y1 = from.y;
      const to = flat.find((n) => n.key === e.to);
      if (to) e.y2 = to.y;
    });

    return { nodes: flat, edges: links, canvasH: Math.max(cursor + 40, 520) };
  }, [focusCategory, collapsedCategories, expandedClusters, q, matchesQuery, modelBySlug, clusterHasMatch, clusterExpanded]);

  const centerRoot = useCallback(() => {
    const el = scrollRef.current;
    const root = nodes.find((n) => n.kind === "root");
    if (el && root) {
      el.scrollTo({
        top: Math.max(0, root.y * scale - el.clientHeight / 2),
        behavior: "smooth",
      });
    }
  }, [nodes, scale]);

  const centerRootRef = useRef(centerRoot);
  useEffect(() => {
    centerRootRef.current = centerRoot;
  }, [centerRoot]);

  /* ---------- 沉浸式全屏：只保留画布，不触发浏览器原生全屏提示 ---------- */
  useEffect(() => {
    if (!isFullscreen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const timer = window.setTimeout(() => centerRootRef.current(), 120);
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsFullscreen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.clearTimeout(timer);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isFullscreen]);

  const toggleFullscreen = useCallback(() => setIsFullscreen((v) => !v), []);

  /* 首次渲染把根节点定位到可视区中央，避免根节点在长画布中段而首屏看不到 */
  useEffect(() => {
    if (q || didCenterRef.current || !scrollRef.current) return;
    const root = nodes.find((n) => n.kind === "root");
    if (!root) return;
    scrollRef.current.scrollTop = Math.max(0, root.y * scale - scrollRef.current.clientHeight / 2);
    didCenterRef.current = true;
  }, [nodes, q, scale]);

  /* 搜索时滚动到首个结果 */
  useEffect(() => {
    if (!q || !scrollRef.current) return;
    const first = nodes.find((n) => n.kind === "cluster");
    if (first) scrollRef.current.scrollTo({ top: Math.max(0, (first.y - 160) * scale), behavior: "smooth" });
  }, [q, nodes, scale]);

  const toggleCluster = (id: string) => {
    setExpandedClusters((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleCategory = (id: string) => {
    setCollapsedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const expandAll = () => setExpandedClusters(new Set(modelClusters.map((c) => c.id)));
  const collapseAll = () => {
    setExpandedClusters(new Set());
    setCollapsedCategories(new Set());
    setFocusCategory("");
    setQuery("");
  };

  const jumpToCategory = (id: string) => {
    setFocusCategory((prev) => (prev === id ? "" : id));
    setCollapsedCategories(new Set());
    setQuery("");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* 标题 */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl sm:text-4xl font-bold text-text">模型脑图</h1>
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-primary/12 text-primary border border-primary/25">
            MIND MAP
          </span>
        </div>
        <p className="text-text-secondary">
          按「分类 → 主题簇 → 模型」四层梳理 {models.length} 个思维模型，每个主题簇都有一句记忆锚点，方便成组记忆
        </p>
      </div>

      {/* 统计条 */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        {[
          { icon: "🧠", label: "思维模型", value: models.length },
          { icon: "🗂️", label: "大分类", value: categories.length },
          { icon: "🧩", label: "主题簇", value: modelClusters.length },
          { icon: "💡", label: "记忆锚点", value: modelClusters.length },
        ].map((s) => (
          <div key={s.label} className="rounded-xl bg-card border border-border px-4 py-3 flex items-center gap-3">
            <span className="text-xl">{s.icon}</span>
            <div>
              <p className="text-lg font-black text-text leading-none">{s.value}</p>
              <p className="text-xs text-text-light mt-1">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div
        className={isFullscreen ? "fixed inset-0 z-[999] flex flex-col overflow-hidden" : ""}
        style={isFullscreen ? { background: "var(--color-surface)" } : undefined}
      >
        {!isFullscreen && (
          <>
        {/* 工具栏 */}
        <div className="flex flex-wrap items-center gap-2 mb-4 shrink-0">
          <div className="relative">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="🔍 搜模型 / 标签 / 洞察"
              className="w-56 rounded-lg bg-card border border-border px-3 py-2 text-sm text-text placeholder:text-text-light outline-none focus:border-primary transition-colors"
            />
          </div>
          <button onClick={expandAll} className="px-3 py-2 rounded-lg text-sm font-medium bg-card border border-border text-text-secondary hover:text-text hover:border-primary/50 transition-colors">
            展开全部
          </button>
          <button onClick={collapseAll} className="px-3 py-2 rounded-lg text-sm font-medium bg-card border border-border text-text-secondary hover:text-text hover:border-primary/50 transition-colors">
            收起 / 重置
          </button>
          <button onClick={centerRoot} className="px-3 py-2 rounded-lg text-sm font-medium bg-card border border-border text-text-secondary hover:text-text hover:border-primary/50 transition-colors">
            🧠 回到中心
          </button>
          <button
            onClick={toggleFullscreen}
            title="全屏展示脑图（Esc 退出）"
            className="px-3 py-2 rounded-lg text-sm font-medium bg-primary/12 border border-primary/35 text-primary hover:bg-primary/20 transition-colors flex items-center gap-1.5"
          >
            <FullscreenIcon />
            全屏展示
          </button>
          <div className="flex items-center gap-2 ml-auto">
            <div className="flex items-center gap-1 rounded-lg bg-card border border-border px-1 py-1">
              <button onClick={() => setScale((s) => Math.max(0.6, +(s - 0.1).toFixed(2)))} className="w-7 h-7 rounded text-text-secondary hover:text-text hover:bg-surface-alt transition-colors" aria-label="缩小">−</button>
              <span className="text-xs text-text-light w-10 text-center font-mono">{Math.round(scale * 100)}%</span>
              <button onClick={() => setScale((s) => Math.min(1.3, +(s + 0.1).toFixed(2)))} className="w-7 h-7 rounded text-text-secondary hover:text-text hover:bg-surface-alt transition-colors" aria-label="放大">＋</button>
            </div>
          </div>
        </div>

        {/* 分类筛选 */}
        <div className="flex flex-wrap gap-2 mb-5 shrink-0">
          <button
            onClick={() => jumpToCategory("")}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${!focusCategory ? "bg-primary text-white" : "bg-surface-alt text-text-secondary hover:text-text"}`}
          >
            全部分类
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => jumpToCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${focusCategory === cat.id ? "text-white" : "bg-surface-alt text-text-secondary hover:text-text"}`}
              style={focusCategory === cat.id ? { backgroundColor: cat.color } : undefined}
            >
              {cat.icon} {cat.name}
            </button>
          ))}
        </div>
          </>
        )}

        {/* 脑图画布 */}
        <div className={`relative ${isFullscreen ? "flex-1 min-h-0" : ""}`} style={isFullscreen ? undefined : { height: "68vh" }}>
          <div
            ref={scrollRef}
            className={`w-full h-full overflow-auto ${isFullscreen ? "bg-surface" : "bg-card rounded-2xl border border-border"}`}
          >
            <div style={{ width: CANVAS_W * scale, height: canvasH * scale, position: "relative" }}>
          <div
            style={{
              width: CANVAS_W,
              height: canvasH,
              transform: `scale(${scale})`,
              transformOrigin: "top left",
              position: "relative",
            }}
          >
            {/* 列标题 */}
            {[
              { x: COL_X[0], label: "思维模型库" },
              { x: COL_X[1], label: "① 大分类" },
              { x: COL_X[2], label: "② 主题簇（点击展开）" },
              { x: COL_X[3], label: "③ 具体模型" },
            ].map((c) => (
              <div
                key={c.label}
                className="absolute text-[11px] font-bold tracking-wider text-text-light"
                style={{ left: c.x, top: 10 }}
              >
                {c.label}
              </div>
            ))}

            {/* 连线层 */}
            <svg
              width={CANVAS_W}
              height={canvasH}
              className="absolute inset-0 pointer-events-none"
              style={{ overflow: "visible" }}
            >
              {edges.map((e, i) => {
                const mid = (e.x1 + e.x2) / 2;
                return (
                  <path
                    key={i}
                    d={`M ${e.x1} ${e.y1} C ${mid} ${e.y1}, ${mid} ${e.y2}, ${e.x2} ${e.y2}`}
                    fill="none"
                    stroke={e.color}
                    strokeWidth={e.strong ? 2.2 : 1.4}
                    strokeOpacity={e.strong ? 0.55 : 0.32}
                  />
                );
              })}
            </svg>

            {/* 节点层 */}
            {nodes.map((n) => {
              const common: React.CSSProperties = {
                position: "absolute",
                left: n.x,
                top: n.y - n.h / 2,
                width: COL_W[{ root: 0, category: 1, cluster: 2, model: 3 }[n.kind]],
                height: n.h,
                transition: "transform 160ms ease, box-shadow 160ms ease",
              };

              if (n.kind === "root") {
                return (
                  <div
                    key={n.key}
                    style={{
                      ...common,
                      background: "linear-gradient(140deg, var(--color-primary), var(--color-primary-dark))",
                      borderRadius: 18,
                      boxShadow: "0 12px 30px -12px var(--color-primary)",
                    }}
                    className="flex items-center gap-3 px-4 text-white"
                    onMouseEnter={() => setHovered(n.key)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    <span className="text-3xl">{n.icon}</span>
                    <div className="min-w-0">
                      <p className="font-black text-base leading-tight">{n.label}</p>
                      <p className="text-[10px] opacity-85 mt-1 leading-snug">{n.sub}</p>
                    </div>
                  </div>
                );
              }

              if (n.kind === "category") {
                return (
                  <button
                    key={n.key}
                    type="button"
                    onClick={() => toggleCategory(n.categoryId!)}
                    style={{
                      ...common,
                      background: `color-mix(in srgb, ${n.color} 14%, var(--color-card))`,
                      border: `1px solid ${n.color}`,
                      borderRadius: 14,
                      boxShadow: hovered === n.key ? `0 8px 22px -10px ${n.color}` : "none",
                    }}
                    className="flex items-center gap-2.5 px-3 text-left hover:brightness-110"
                    onMouseEnter={() => setHovered(n.key)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    <span className="text-2xl shrink-0">{n.icon}</span>
                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-sm text-text truncate">{n.label}</p>
                      <p className="text-[10px] text-text-light truncate">{n.sub}</p>
                    </div>
                    <span className="text-[11px] font-bold shrink-0 px-2 py-0.5 rounded-full" style={{ background: `${n.color}28`, color: n.color }}>
                      {n.count}
                    </span>
                    <span className="text-[10px] text-text-light shrink-0">{n.expanded ? "−" : "+"}</span>
                  </button>
                );
              }

              if (n.kind === "cluster") {
                return (
                  <button
                    key={n.key}
                    type="button"
                    onClick={() => toggleCluster(n.clusterId!)}
                    style={{
                      ...common,
                      background: n.expanded ? `color-mix(in srgb, ${n.color} 12%, var(--color-card))` : "var(--color-surface-alt)",
                      border: `1px solid ${n.expanded ? `${n.color}99` : "var(--color-border)"}`,
                      borderLeft: `3px solid ${n.color}`,
                      borderRadius: 12,
                      boxShadow: hovered === n.key ? `0 8px 20px -10px ${n.color}` : "none",
                    }}
                    className="flex items-center gap-2 px-3 text-left hover:brightness-110"
                    onMouseEnter={() => setHovered(n.key)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    <span className="text-lg shrink-0">{n.icon}</span>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-[13px] text-text truncate">
                        {n.label}
                        <span className="ml-1.5 text-[10px] font-normal text-text-light">{n.count} 个</span>
                      </p>
                      <p className="text-[10px] text-text-secondary truncate">💡 {n.mnemonic}</p>
                    </div>
                    <span
                      className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold"
                      style={{ background: `${n.color}22`, color: n.color }}
                    >
                      {n.expanded ? "−" : "+"}
                    </span>
                  </button>
                );
              }

              return (
                <Link
                  key={n.key}
                  href={`/models/${n.slug}`}
                  style={{
                    ...common,
                    background: "var(--color-card)",
                    border: `1px solid ${n.color}66`,
                    borderRadius: 10,
                    boxShadow: hovered === n.key ? `0 6px 16px -8px ${n.color}` : "none",
                    transform: hovered === n.key ? "translateX(3px)" : undefined,
                  }}
                  className="flex items-center gap-2 px-3 hover:brightness-110"
                  onMouseEnter={() => setHovered(n.key)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <span className="text-base shrink-0">{n.icon}</span>
                  <span className="text-[12px] font-medium text-text truncate flex-1">{n.label}</span>
                  <span className="text-[10px] text-text-light shrink-0">→</span>
                </Link>
              );
            })}

            {nodes.length <= 1 && (
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-text-light text-sm">
                没有匹配的模型，试试别的关键词
              </div>
            )}
          </div>
        </div>
        </div>
        <button
          onClick={toggleFullscreen}
          title={isFullscreen ? "退出全屏（Esc）" : "全屏展示脑图"}
          aria-label={isFullscreen ? "退出全屏" : "全屏展示"}
          className={`absolute right-3 top-2.5 z-20 w-8 h-8 flex items-center justify-center rounded-lg border transition-all ${isFullscreen ? "bg-card/70 border-border text-text-light opacity-40 hover:opacity-100 hover:text-primary" : "bg-card/95 border-border text-text-secondary hover:text-primary hover:border-primary/60"}`}
        >
          {isFullscreen ? <CloseIcon /> : <FullscreenIcon />}
        </button>
      </div>

        {/* 图例 / 使用说明（全屏时隐藏） */}
        {!isFullscreen && (
          <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-text-light shrink-0">
            <span>🖱️ 点<b className="text-text-secondary">分类</b>折叠 · 点<b className="text-text-secondary">主题簇</b>展开模型 · 点<b className="text-text-secondary">模型</b>看详情</span>
            <span>🔍 搜索会自动展开命中的主题簇</span>
            <span>💡 每簇下方的短句是用来成组记忆的锚点</span>
            <span>⛶ 点「全屏展示」进入纯净展示，按 Esc 退出</span>
          </div>
        )}
      </div>
    </div>
  );
}
