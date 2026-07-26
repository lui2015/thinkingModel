"use client";

import { useState, useEffect, useCallback } from "react";
import { categories } from "@/lib/models-data";

/* ---------- AI 提示词模板 ---------- */
const PROMPTS = [
  {
    id: "deep-dive",
    title: "深度解读模型",
    icon: "🔬",
    desc: "让 AI 深入讲解某个思维模型的核心原理与应用",
    prompt: `你是一位思维模型专家。请为我深入解读「{model}」这个思维模型，包括：
1. 核心定义与起源（谁提出、背景）
2. 底层逻辑与运作机制（用通俗比喻）
3. 3 个真实应用场景（生活/工作各举一例）
4. 常见误区与避坑指南
5. 与其他思维模型的搭配使用建议
6. 一句话记忆口诀

请用中文回答，语言生动有趣，适合分享给非专业读者。`,
  },
  {
    id: "decision",
    title: "决策辅助分析",
    icon: "🎯",
    desc: "用指定模型框架辅助分析一个具体决策问题",
    prompt: `你是一位决策顾问。请运用「{model}」思维模型，帮我分析以下决策问题：

【我的问题】：{problem}

请按以下结构输出：
1. 问题拆解（用该模型的视角重新定义问题）
2. 关键要素识别（列出影响决策的核心变量）
3. 分析过程（逐步推导，展示思考链路）
4. 方案建议（给出 2-3 个可行选项及利弊）
5. 最终推荐（明确结论 + 理由）
6. 风险提示（可能忽略的盲点）

请用中文，输出清晰有条理。`,
  },
  {
    id: "compare",
    title: "多模型对比分析",
    icon: "⚖️",
    desc: "同时用多个思维模型从不同角度审视同一问题",
    prompt: `你是一位跨学科思维专家。请分别用以下 {count} 个思维模型来分析同一个问题：

【问题】：{problem}
【使用的模型】：{models}

对每个模型，请输出：
- 模型名称 + 一句话核心观点
- 该模型视角下的关键洞察
- 该模型的独特发现（其他模型没覆盖到的）

最后给出综合结论：多个模型交汇后的一致性发现是什么？矛盾点在哪里？最终建议？

请用中文，表格对比更佳。`,
  },
  {
    id: "learn-plan",
    title: "学习路径规划",
    icon: "📚",
    desc: "制定系统的思维模型学习计划",
    prompt: `你是一位认知科学教育家。我想系统学习思维模型，提升决策和认知能力。

【我的背景】：{background}
【学习目标】：{goal}
【可用时间】：每天约 {time}

请帮我：
1. 推荐适合我阶段的 10 个入门思维模型（附学习顺序）
2. 为每个模型设计一个"今日练习"（5 分钟可完成的小任务）
3. 规划 4 周进阶路线图
4. 推荐延伸阅读资源（书/文章/视频）

请用中文，鼓励式语气。`,
  },
  {
    id: "teach-others",
    title: "教学/分享素材生成",
    icon: "🎤",
    desc: "生成可用于演讲、写作、社交媒体的思维模型内容",
    prompt: `你是一位科普内容创作者。请围绕「{model}」这个思维模型，为我创作一套分享素材：

1. **30 秒电梯演讲**（3 句话讲清楚）
2. **开场钩子**（一个引人入胜的问题或故事）
3. **核心类比**（用一个日常事物做比喻）
4. **金句 3 条**（适合发朋友圈/微博）
5. **互动练习**（给听众的一个小测试）
6. **常见反驳**（别人可能会问的质疑 + 你的回应）
7. **行动号召**（听完之后可以立即做的事）

风格要求：{style}
请用中文。`,
  },
];

/* ---------- API 文档数据 ---------- */
const API_DOCS = [
  {
    method: "GET",
    endpoint: "/api/platform?slug=first-principles",
    description: "查询单个模型的完整信息",
    curl: 'curl -sS "https://www.luliming.xyz/thinkingModel/api/platform?slug=first-principles"',
  },
  {
    method: "GET",
    endpoint: "/api/platform?category=decision",
    description: "按分类查询模型列表（精简字段）",
    curl: 'curl -sS "https://www.luliming.xyz/thinkingModel/api/platform?category=decision"',
  },
  {
    method: "GET",
    endpoint: "/api/platform?action=stats",
    description: "获取接口调用统计（今日 / 累计）",
    curl: 'curl -sS "https://www.luliming.xyz/thinkingModel/api/platform?action=stats"',
  },
  {
    method: "POST",
    endpoint: "/api/platform",
    body: '{"action":"query","slug":"first-principles"}',
    description: "AI 调用：查询完整模型数据（含统计）",
    curl: 'curl -sS -X POST "https://www.luliming.xyz/thinkingModel/api/platform" -H "Content-Type: application/json" -d \'{"action":"query","slug":"first-principles"}\'',
  },
  {
    method: "POST",
    endpoint: "/api/platform",
    body: '{"action":"search","q":"决策"}',
    description: "AI 调用：关键词搜索模型",
    curl: 'curl -sS -X POST "https://www.luliming.xyz/thinkingModel/api/platform" -H "Content-Type: application/json" -d \'{"action":"search","q":"决策"}\'',
  },
];

/* ---------- 分类 slug-name 映射 ---------- */
const categoryMap = Object.fromEntries(categories.map((c) => [c.id, c.name]));

export default function PlatformPage() {
  const [activePrompt, setActivePrompt] = useState(PROMPTS[0].id);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [stats, setStats] = useState<{ total: number; today: number } | null>(null);
  const [testResult, setTestResult] = useState<string>("");
  const [testLoading, setTestLoading] = useState(false);

  // 获取统计
  useEffect(() => {
    fetch("/api/platform?action=stats")
      .then((r) => r.json())
      .then(setStats)
      .catch(() => {});
  }, []);

  const copyToClipboard = useCallback(async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // fallback
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  }, []);

  const currentPrompt = PROMPTS.find((p) => p.id === activePrompt) ?? PROMPTS[0];

  const handleTestApi = async () => {
    setTestLoading(true);
    setTestResult("");
    try {
      const res = await fetch("/api/platform?slug=first-principles");
      const data = await res.json();
      setTestResult(JSON.stringify(data, null, 2));
    } catch (e) {
      setTestResult(`请求失败: ${e}`);
    }
    setTestLoading(false);
  };

  return (
    <div className="min-h-screen">
      {/* ===== Hero ===== */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-secondary/6" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">🚀</span>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-primary/15 text-primary border border-primary/25">
              OPEN PLATFORM
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-text mb-4 leading-tight">
            开放平台
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl leading-relaxed">
            对外提供思维模型数据的 API 接口，支持 AI 调用、第三方集成。
            <br />
            内置 AI 提示词模板，一键复制即可让 ChatGPT / Claude / DeepSeek 等为你深度解读任意思维模型。
          </p>

          {/* 统计卡片 */}
          <div className="flex items-center gap-4 mt-8 flex-wrap">
            <div className="rounded-xl bg-card border border-border px-5 py-3.5 min-w-[140px]">
              <p className="text-xs text-text-light mb-1">今日调用</p>
              <p className="text-2xl font-black text-primary">{stats?.today ?? "—"}</p>
            </div>
            <div className="rounded-xl bg-card border border-border px-5 py-3.5 min-w-[140px]">
              <p className="text-xs text-text-light mb-1">累计调用</p>
              <p className="text-2xl font-black text-secondary">{stats?.total ?? "—"}</p>
            </div>
            <button
              type="button"
              onClick={handleTestApi}
              disabled={testLoading}
              className="rounded-xl bg-primary/10 hover:bg-primary/20 border border-primary/25 text-primary text-sm font-medium px-4 py-3 transition-colors disabled:opacity-50"
            >
              {testLoading ? "测试中…" : "🧪 测试接口"}
            </button>
          </div>

          {testResult && (
            <pre className="mt-4 rounded-xl bg-surface-solid border border-border p-4 text-xs text-text-secondary overflow-auto max-h-48 max-w-2xl">
              {testResult}
            </pre>
          )}
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* ===== AI 提示词模板 ===== */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <span className="text-2xl">🤖</span>
            <h2 className="text-2xl font-bold text-text">AI 提示词模板</h2>
            <span className="text-sm text-text-light">一键复制，直接发给 AI 使用</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">
            {/* 左侧：模板列表 */}
            <div className="space-y-2">
              {PROMPTS.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setActivePrompt(p.id)}
                  className={`w-full text-left rounded-xl p-4 border transition-all ${
                    activePrompt === p.id
                      ? "border-primary bg-primary/8 shadow-sm"
                      : "border-border bg-card hover:border-primary/40 hover:bg-surface-alt"
                  }`}
                >
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <span className="text-xl">{p.icon}</span>
                    <span className={`font-semibold text-sm ${activePrompt === p.id ? "text-primary" : "text-text"}`}>
                      {p.title}
                    </span>
                  </div>
                  <p className="text-xs text-text-light leading-relaxed">{p.desc}</p>
                </button>
              ))}
            </div>

            {/* 右侧：当前模板详情 */}
            <div className="rounded-2xl border border-border bg-card overflow-hidden flex flex-col">
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-border bg-surface-alt/50">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{currentPrompt.icon}</span>
                  <span className="font-bold text-sm text-text">{currentPrompt.title}</span>
                </div>
                <button
                  type="button"
                  onClick={() => copyToClipboard(currentPrompt.prompt, `prompt-${currentPrompt.id}`)}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-primary text-white text-xs font-medium px-3 py-1.5 hover:bg-primary-dark transition-colors"
                >
                  {copiedId === `prompt-${currentPrompt.id}` ? (
                    <>✅ 已复制</>
                  ) : (
                    <>
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      复制提示词
                    </>
                  )}
                </button>
              </div>
              <div className="flex-1 p-5 overflow-auto">
                <pre className="text-sm text-text-secondary whitespace-pre-wrap leading-relaxed font-mono">
                  {currentPrompt.prompt}
                </pre>
              </div>
              <div className="px-5 py-3 border-t border-border bg-surface-alt/30 text-xs text-text-light">
                💡 将 <code className="px-1.5 py-0.5 rounded bg-surface-alt text-primary">{'{model}'}</code>{" "}
                替换为具体模型名（如「第一性原理」「二八定律」），其他占位符同理。
              </div>
            </div>
          </div>
        </section>

        {/* ===== 可用分类 & 模型速查 ===== */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <span className="text-2xl">📂</span>
            <h2 className="text-2xl font-bold text-text">可用分类</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="rounded-xl border border-border bg-card px-4 py-3 hover:border-primary/40 transition-colors"
              >
                <span className="text-lg">{cat.icon}</span>
                <p className="font-semibold text-sm text-text mt-1">{cat.name}</p>
                <p className="text-xs text-text-light font-mono">{cat.id}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ===== API 文档 ===== */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <span className="text-2xl">📡</span>
            <h2 className="text-2xl font-bold text-text">API 接口文档</h2>
          </div>

          <div className="space-y-4">
            {API_DOCS.map((doc, idx) => (
              <div key={idx} className="rounded-xl border border-border bg-card overflow-hidden">
                <div className="flex items-center gap-3 px-5 py-3.5 bg-surface-alt/50 border-b border-border">
                  <span
                    className={`px-2.5 py-1 rounded-md text-xs font-bold ${
                      doc.method === "GET"
                        ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/25"
                        : "bg-blue-500/15 text-blue-400 border border-blue-500/25"
                    }`}
                  >
                    {doc.method}
                  </span>
                  <code className="text-sm text-text font-mono flex-1 truncate">{doc.endpoint}</code>
                  <span className="text-xs text-text-light hidden sm:block">{doc.description}</span>
                </div>
                <div className="px-5 py-3 flex items-center justify-between gap-3">
                  <pre className="text-xs text-text-light font-mono bg-surface-solid rounded-lg px-3 py-2 flex-1 overflow-x-auto whitespace-nowrap">
                    {doc.curl}
                  </pre>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(doc.curl, `api-${idx}`)}
                    className="shrink-0 inline-flex items-center gap-1 rounded-lg border border-border text-xs font-medium px-3 py-2 text-text-secondary hover:text-primary hover:border-primary/40 transition-colors"
                  >
                    {copiedId === `api-${idx}` ? "✅" : "复制"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ===== 快速开始 ===== */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <span className="text-2xl">⚡</span>
            <h2 className="text-2xl font-bold text-text">快速开始</h2>
          </div>
          <div className="rounded-2xl border border-border bg-gradient-to-br from-primary/5 to-secondary/5 p-6 sm:p-8">
            <ol className="space-y-4 max-w-2xl">
              {[
                {
                  step: 1,
                  title: "选择提示词模板",
                  desc: "从上方 AI 提示词中选择一个场景（深度解读 / 决策辅助 / 多模型对比等）",
                },
                {
                  step: 2,
                  title: "替换占位符",
                  desc: "将 {model} 替换为想了解的模型名（如「第一性原理」），{problem} 替换为你的实际问题",
                },
                {
                  step: 3,
                  title: "发送给 AI",
                  desc: "复制整段提示词，粘贴到 ChatGPT / Claude / DeepSeek / Kimi 等 AI 助手中",
                },
                {
                  step: 4,
                  title: "获得专业解读",
                  desc: "AI 会基于思维模型库的结构化知识，为你输出高质量的深度分析",
                },
              ].map((item) => (
                <li key={item.step} className="flex gap-4">
                  <span className="shrink-0 w-8 h-8 rounded-full bg-primary/15 text-primary font-bold text-sm flex items-center justify-center border border-primary/25">
                    {item.step}
                  </span>
                  <div>
                    <p className="font-semibold text-sm text-text">{item.title}</p>
                    <p className="text-sm text-text-secondary mt-0.5">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </main>
    </div>
  );
}
