"use client";

import Link from "next/link";
import { useState, useEffect, useCallback, useRef } from "react";

// 与 next.config.ts 的 basePath 对应，保证子路径部署时接口地址正确
const API_URL = "/thinkingModel/api/platform";
const EXCEL_URL = `${API_URL}/excel`;

/* 核心 AI 提示词：让 AI 把模型信息整理成接口可直接提交的 JSON */
const ENTRY_PROMPT = `你是一位思维模型知识整理专家。请把我要分享的模型，整理成严格符合 JSON 的结构化数据，方便我直接提交到「思维模型库」开放平台的录入接口。

【模型原始信息 / 素材】：
{raw}

请只输出一个 JSON 对象（不要多余解释），字段如下：

{
  "slug": "英文小写短横线 id，如 first-principles（用作接口与页面唯一标识）",
  "title": "模型中文名",
  "subtitle": "一句话副标题（20 字内）",
  "category": "分类 id，必须是以下之一：decision | cognition | system | communication | business | learning | probability | efficiency | innovation | game",
  "icon": "emoji 图标，如 🧠",
  "tags": ["标签1", "标签2", "标签3"],
  "difficulty": 1,
  "introduction": "通俗介绍（200 字以内）",
  "keyInsight": "关键洞察（一句话）",
  "memorySentence": "一句话记忆口诀",
  "usage": {
    "scenarios": ["适用场景1", "适用场景2"],
    "steps": ["实操步骤1", "实操步骤2", "实操步骤3"],
    "pitfalls": ["常见误区1", "常见误区2"],
    "combineWith": ["可搭配的模型名1", "可搭配的模型名2"]
  },
  "cases": [
    { "title": "案例标题", "content": "案例内容", "type": "life" }
  ]
}

整理完成后，用下面这条命令即可录入（把 <JSON> 换成你刚生成的完整 JSON）：

curl -X POST "https://www.luliming.xyz/thinkingModel/api/platform" \\
  -H "Content-Type: application/json" \\
  -d '{"action":"submit","model":<JSON>}'`;

export default function PlatformPage() {
  const [copied, setCopied] = useState(false);
  const [stats, setStats] = useState<{ total: number; today: number } | null>(null);
  const [submitResult, setSubmitResult] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const [importing, setImporting] = useState(false);
  const [importResult, setImportResult] = useState<{ ok: boolean; text: string } | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch(`${API_URL}?action=stats`)
      .then((r) => r.json())
      .then(setStats)
      .catch(() => {});
  }, []);

  const copy = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  const runDemoSubmit = async () => {
    setSubmitLoading(true);
    setSubmitResult("");
    const demo = {
      action: "submit",
      model: {
        slug: "demo-circle-of-competence",
        title: "能力圈",
        subtitle: "只在自己懂的领域做决策",
        category: "decision",
        icon: "🎯",
        tags: ["能力边界", "自知"],
        difficulty: 1,
        introduction: "能力圈由巴菲特提出：只在与自己能力匹配的领域里做决策，圈外机会再好也不碰。",
        keyInsight: "知道自己不知道什么，比知道什么更重要。",
        memorySentence: "圈内下注，圈外旁观。",
        usage: {
          scenarios: ["投资选股", "职业选择"],
          steps: ["列出你真正懂的领域", "圈出能力边界", "只在此范围内决策"],
          pitfalls: ["盲目跨界自信"],
          combineWith: ["第一性原理"],
        },
        cases: [{ title: "巴菲特不投科技股", content: "早年坚持不碰看不懂的科技股。", type: "business" }],
      },
    };
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(demo),
      });
      setSubmitResult(JSON.stringify(await res.json(), null, 2));
    } catch (e) {
      setSubmitResult(`请求失败: ${e}`);
    }
    setSubmitLoading(false);
  };

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setImporting(true);
    setImportResult(null);
    const form = new FormData();
    form.append("file", file);
    try {
      const res = await fetch(EXCEL_URL, { method: "POST", body: form });
      const data = await res.json();
      if (!res.ok) {
        setImportResult({ ok: false, text: data.error ?? "导入失败" });
      } else {
        const lines = [
          `导入完成：新增 ${data.imported} 条，更新 ${data.updated} 条，未变更 ${data.unchanged} 行，跳过空行 ${data.skipped} 行。`,
        ];
        if (Array.isArray(data.errors) && data.errors.length) {
          lines.push(`有 ${data.errors.length} 行未通过校验：`);
          data.errors.slice(0, 5).forEach((e: { row: number; reason: string }) =>
            lines.push(`  第 ${e.row} 行：${e.reason}`)
          );
        }
        setImportResult({ ok: true, text: lines.join("\n") });
      }
    } catch (e) {
      setImportResult({ ok: false, text: `请求失败：${e}` });
    } finally {
      setImporting(false);
      event.target.value = "";
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-secondary/6" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">🚀</span>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-primary/15 text-primary border border-primary/25">
              OPEN PLATFORM
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-text mb-4">开放平台</h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            对外提供思维模型数据的写入与查询接口。把你的模型与解读整理成结构化数据，
            调用一次接口即可录入，供 AI 与外部系统直接调用。
          </p>

          {/* 统计 */}
          <div className="flex items-center gap-4 mt-8">
            <div className="rounded-xl bg-card border border-border px-5 py-3.5 min-w-[130px]">
              <p className="text-xs text-text-light mb-1">今日调用</p>
              <p className="text-2xl font-black text-primary">{stats?.today ?? "—"}</p>
            </div>
            <div className="rounded-xl bg-card border border-border px-5 py-3.5 min-w-[130px]">
              <p className="text-xs text-text-light mb-1">累计调用</p>
              <p className="text-2xl font-black text-secondary">{stats?.total ?? "—"}</p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              href="/platform/docs"
              className="inline-flex items-center gap-2 rounded-xl bg-primary text-white text-sm font-semibold px-4 py-2.5 hover:bg-primary-dark transition-colors"
            >
              📖 查看对外数据接口文档 →
            </Link>
            <span className="text-xs text-text-light">GET /api/v1/models · 免鉴权 · 支持跨域</span>
          </div>
        </div>
      </section>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* 对外数据接口 */}
        <section>
          <div className="flex items-center gap-2 mb-5">
            <span className="text-2xl">🔌</span>
            <h2 className="text-2xl font-bold text-text">对外数据接口（v1）</h2>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5 sm:p-6">
            <p className="text-sm text-text-secondary leading-relaxed">
              外部系统可直接调用只读接口获取模型库数据：免鉴权、支持浏览器跨域、统一响应格式，
              提供分页、分类筛选、关键词搜索与完整模型解读。
            </p>
            <div className="grid gap-2 sm:grid-cols-2 mt-4">
              {[
                { m: "GET", p: "/api/v1/models", d: "分页查询 · 支持分类 / 关键词 / 难度筛选" },
                { m: "GET", p: "/api/v1/models/{slug}", d: "单个模型的完整解读信息" },
                { m: "GET", p: "/api/v1/categories", d: "10 大分类及各分类模型数量" },
                { m: "GET", p: "/api/v1/stats", d: "模型库总数与分布统计" },
              ].map((e) => (
                <div key={e.p} className="rounded-lg bg-surface-alt/60 border border-border px-3 py-2.5">
                  <p className="font-mono text-xs text-primary">{e.m} {e.p}</p>
                  <p className="text-xs text-text-light mt-1">{e.d}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <Link
                href="/platform/docs"
                className="rounded-xl bg-primary/12 hover:bg-primary/20 border border-primary/30 text-primary text-sm font-semibold px-4 py-2.5 transition-colors"
              >
                阅读完整接口文档 →
              </Link>
              <a
                href="/thinkingModel/api/v1/openapi.json"
                className="text-sm text-text-light hover:text-primary transition-colors"
              >
                OpenAPI 3.1 规格
              </a>
            </div>
          </div>
        </section>

        {/* 核心提示词 */}
        <section>
          <div className="flex items-center gap-2 mb-5">
            <span className="text-2xl">🤖</span>
            <h2 className="text-2xl font-bold text-text">让 AI 帮你整理录入信息</h2>
          </div>
          <div className="rounded-2xl border border-border bg-card overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-border bg-surface-alt/50">
              <span className="font-bold text-sm text-text">AI 提示词 · 一键复制给任意 AI 使用</span>
              <button
                type="button"
                onClick={() => copy(ENTRY_PROMPT)}
                className="inline-flex items-center gap-1.5 rounded-lg bg-primary text-white text-xs font-medium px-3 py-1.5 hover:bg-primary-dark transition-colors"
              >
                {copied ? "✅ 已复制" : "复制提示词"}
              </button>
            </div>
            <pre className="p-5 text-sm text-text-secondary whitespace-pre-wrap leading-relaxed font-mono max-h-[420px] overflow-auto">
              {ENTRY_PROMPT}
            </pre>
          </div>
          <p className="text-sm text-text-light mt-3">
            💡 把 <code className="px-1.5 py-0.5 rounded bg-surface-alt text-primary">{'{raw}'}</code>{" "}
            替换成你手头的模型素材（一段文字、笔记、文章都行），发给 ChatGPT / Claude / DeepSeek 等，
            它会返回可直接提交的 JSON。
          </p>
        </section>

        {/* 怎么调用接口录入 */}
        <section>
          <div className="flex items-center gap-2 mb-5">
            <span className="text-2xl">📡</span>
            <h2 className="text-2xl font-bold text-text">怎么调用接口录入模型</h2>
          </div>

          {/* 步骤 */}
          <ol className="space-y-3 mb-6">
            {[
              { t: "用上面提示词让 AI 整理", d: "复制提示词 + 你的素材发给 AI，拿到标准 JSON" },
              { t: "复制 JSON", d: "AI 返回的 JSON 即为接口需要的 model 字段" },
              { t: "调用录入接口", d: "用下方 curl（或任意 HTTP 客户端）提交" },
              { t: "验证", d: "调用 GET 查询接口确认已录入成功" },
            ].map((s, i) => (
              <li key={i} className="flex gap-4 items-start">
                <span className="shrink-0 w-7 h-7 rounded-full bg-primary/15 text-primary font-bold text-sm flex items-center justify-center border border-primary/25">
                  {i + 1}
                </span>
                <div>
                  <p className="font-semibold text-sm text-text">{s.t}</p>
                  <p className="text-sm text-text-secondary mt-0.5">{s.d}</p>
                </div>
              </li>
            ))}
          </ol>

          {/* 录入接口示例 */}
          <div className="rounded-xl border border-border bg-surface-solid overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-surface-alt/50">
              <span className="text-xs font-bold text-blue-400">POST /api/platform · 录入模型</span>
              <button
                type="button"
                onClick={() =>
                  copy(
                    `curl -X POST "https://www.luliming.xyz/thinkingModel/api/platform" -H "Content-Type: application/json" -d '{"action":"submit","model":{"slug":"demo","title":"示例","category":"decision","icon":"🧠","tags":["标签"],"introduction":"介绍","keyInsight":"洞察","memorySentence":"口诀","usage":{"scenarios":["场景"],"steps":["步骤"],"pitfalls":["误区"],"combineWith":["搭配"]}}}'`
                  )
                }
                className="text-xs px-2.5 py-1 rounded border border-border text-text-secondary hover:text-primary hover:border-primary/40 transition-colors"
              >
                复制
              </button>
            </div>
            <pre className="p-4 text-xs text-text-light font-mono overflow-x-auto whitespace-pre">
{`curl -X POST "https://www.luliming.xyz/thinkingModel/api/platform" \\
  -H "Content-Type: application/json" \\
  -d '{
    "action": "submit",
    "model": {
      "slug": "first-principles",
      "title": "第一性原理",
      "subtitle": "回归本质，从头推导",
      "category": "cognition",
      "icon": "🧠",
      "tags": ["本质思考", "拆解"],
      "difficulty": 2,
      "introduction": "把事物拆解到最基本真理，再往上重构。",
      "keyInsight": "不要类比，要回到第一性原理。",
      "memorySentence": "问到底，从头算。",
      "usage": {
        "scenarios": ["创新决策", "成本分析"],
        "steps": ["识别假设", "拆解到基本真理", "重新推导"],
        "pitfalls": ["陷入类比思维"],
        "combineWith": ["二阶思维"]
      },
      "cases": [{ "title": "马斯克火箭", "content": "从原材料成本推导火箭价格。", "type": "business" }]
    }
  }'`}
            </pre>
          </div>

          {/* 验证接口示例 */}
          <div className="rounded-xl border border-border bg-surface-solid overflow-hidden mt-4">
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-surface-alt/50">
              <span className="text-xs font-bold text-emerald-400">GET /api/platform · 查询已录入</span>
              <button
                type="button"
                onClick={() => copy(`curl -sS "https://www.luliming.xyz/thinkingModel/api/platform?action=submissions"`)}
                className="text-xs px-2.5 py-1 rounded border border-border text-text-secondary hover:text-primary hover:border-primary/40 transition-colors"
              >
                复制
              </button>
            </div>
            <pre className="p-4 text-xs text-text-light font-mono overflow-x-auto whitespace-pre">
{`# 查看通过开放平台录入的全部模型
curl -sS "https://www.luliming.xyz/thinkingModel/api/platform?action=submissions"

# 查询单个模型完整信息
curl -sS "https://www.luliming.xyz/thinkingModel/api/platform?slug=first-principles"`}
            </pre>
          </div>

          {/* 试一下 */}
          <div className="mt-4">
            <button
              type="button"
              onClick={runDemoSubmit}
              disabled={submitLoading}
              className="rounded-xl bg-primary/10 hover:bg-primary/20 border border-primary/25 text-primary text-sm font-medium px-4 py-2.5 transition-colors disabled:opacity-50"
            >
              {submitLoading ? "提交中…" : "🧪 试用录入接口（示例：能力圈）"}
            </button>
            {submitResult && (
              <pre className="mt-3 rounded-xl bg-surface-solid border border-border p-4 text-xs text-text-secondary overflow-auto max-h-40">
                {submitResult}
              </pre>
            )}
          </div>
        </section>

        {/* 导入 / 导出数据 */}
        <section>
          <div className="flex items-center gap-2 mb-5">
            <span className="text-2xl">📊</span>
            <h2 className="text-2xl font-bold text-text">导入 / 导出数据</h2>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5 sm:p-6">
            <p className="text-sm text-text-secondary leading-relaxed">
              用 Excel 批量整理模型：先导出当前全部数据（模型库 + 开放平台录入数据）作为模板，
              在「模型数据」工作表里编辑或新增行，再导入即可一次录入多条；只保留需要改动的行也行，未变更的行会自动跳过。
              文件里的「字段说明」工作表列出每列的填写规则。
            </p>
            <div className="flex flex-wrap items-center gap-3 mt-5">
              <a
                href={`${EXCEL_URL}?action=export`}
                className="inline-flex items-center gap-2 rounded-xl bg-primary/12 hover:bg-primary/20 border border-primary/30 text-primary text-sm font-semibold px-4 py-2.5 transition-colors"
              >
                ⬇️ 导出为 Excel
              </a>
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                disabled={importing}
                className="inline-flex items-center gap-2 rounded-xl bg-card hover:bg-surface-alt border border-border text-text-secondary hover:text-text text-sm font-semibold px-4 py-2.5 transition-colors disabled:opacity-50"
              >
                {importing ? "导入中…" : "⬆️ 导入 Excel"}
              </button>
              <input
                ref={fileRef}
                type="file"
                accept=".xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                className="hidden"
                onChange={handleImport}
              />
              <span className="text-xs text-text-light">支持 .xlsx · 单次最多 1000 行 / 5MB</span>
            </div>
            {importResult && (
              <pre
                className={`mt-4 rounded-xl border p-4 text-xs whitespace-pre-wrap overflow-auto ${
                  importResult.ok
                    ? "border-secondary/30 bg-secondary/5 text-text-secondary"
                    : "border-primary/30 bg-primary/5 text-primary"
                }`}
              >
                {importResult.text}
              </pre>
            )}
            <div className="mt-5 grid gap-2 text-xs text-text-light sm:grid-cols-2">
              <p>✅ 必填三列：<b className="text-text-secondary">唯一标识 / 模型名称 / 分类</b></p>
              <p>🔁 同唯一标识再次导入会覆盖更新</p>
              <p>📝 标签、步骤等多值列用单元格内换行分隔</p>
              <p>🧩 案例列填 JSON 数组，字段说明里有示例</p>
            </div>
          </div>
        </section>

        {/* 字段说明 */}
        <section>
          <div className="flex items-center gap-2 mb-5">
            <span className="text-2xl">📋</span>
            <h2 className="text-2xl font-bold text-text">model 字段说明</h2>
          </div>
          <div className="overflow-hidden rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead className="bg-surface-alt/50 text-text-secondary">
                <tr>
                  <th className="text-left px-4 py-2.5 font-semibold">字段</th>
                  <th className="text-left px-4 py-2.5 font-semibold">类型</th>
                  <th className="text-left px-4 py-2.5 font-semibold">必填</th>
                  <th className="text-left px-4 py-2.5 font-semibold">说明</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  ["slug", "string", "✅", "唯一标识（英文小写短横线）"],
                  ["title", "string", "✅", "模型中文名"],
                  ["category", "string", "✅", "分类 id（10 选 1）"],
                  ["icon", "string", "—", "emoji 图标"],
                  ["subtitle", "string", "—", "副标题"],
                  ["tags", "string[]", "—", "标签数组"],
                  ["difficulty", "number", "—", "难度 1-3"],
                  ["introduction", "string", "—", "通俗介绍"],
                  ["keyInsight", "string", "—", "关键洞察"],
                  ["memorySentence", "string", "—", "记忆口诀"],
                  ["usage", "object", "—", "scenarios/steps/pitfalls/combineWith"],
                  ["cases", "object[]", "—", "title/content/type"],
                ].map((r) => (
                  <tr key={r[0]} className="text-text-secondary">
                    <td className="px-4 py-2.5 font-mono text-primary">{r[0]}</td>
                    <td className="px-4 py-2.5 font-mono text-text-light">{r[1]}</td>
                    <td className="px-4 py-2.5">{r[2]}</td>
                    <td className="px-4 py-2.5">{r[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
