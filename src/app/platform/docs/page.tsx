"use client";

import Link from "next/link";
import { useState } from "react";

const BASE = "https://www.luliming.xyz/thinkingModel/api/v1";
const DOC_PATH = "/platform/docs";

const CURL_EXAMPLES = [
  "# 1. 分页查询：决策类，每页 5 条",
  `curl -sS "${BASE}/models?category=decision&limit=5"`,
  "",
  "# 2. 关键词搜索，并只取需要的字段",
  `curl -sS "${BASE}/models?q=概率&fields=slug,title,keyInsight"`,
  "",
  "# 3. 获取单个模型的完整解读",
  `curl -sS "${BASE}/models/first-principles"`,
  "",
  "# 4. 分类列表 / 统计 / OpenAPI 规格",
  `curl -sS "${BASE}/categories"`,
  `curl -sS "${BASE}/stats"`,
  `curl -sS "${BASE}/openapi.json"`,
].join("\n");

const JS_EXAMPLE = [
  'const BASE = "https://www.luliming.xyz/thinkingModel/api/v1";',
  "",
  "// 浏览器、Node 18+、任意前端框架均可直接调用",
  'const res = await fetch(`${BASE}/models?category=decision&limit=5`);',
  "if (!res.ok) throw new Error((await res.json()).error.message);",
  "",
  'const { data, meta } = await res.json();',
  'console.log(`共 ${meta.total} 个模型，本页 ${data.length} 个`);',
  "console.log(data.map((m) => m.title));",
].join("\n");

const PY_EXAMPLE = [
  "import requests",
  "",
  'BASE = "https://www.luliming.xyz/thinkingModel/api/v1"',
  'r = requests.get(f"{BASE}/models", params={"q": "概率", "limit": 5}, timeout=10)',
  "r.raise_for_status()",
  'payload = r.json()',
  'print(payload["meta"]["total"], [m["title"] for m in payload["data"]])',
].join("\n");

const LIST_RESPONSE = [
  "{",
  '  "success": true,',
  '  "data": [',
  "    {",
  '      "slug": "first-principles",',
  '      "title": "第一性原理",',
  '      "subtitle": "回归事物本质，从零开始推理",',
  '      "category": "cognition",',
  '      "icon": "🧠",',
  '      "tags": ["本质思考", "拆解"],',
  '      "difficulty": 2,',
  '      "keyInsight": "不要类比，要回到第一性原理。",',
  '      "memorySentence": "问到底，从头算。",',
  '      "updatedAt": "2025-01-01"',
  "    }",
  "  ],",
  '  "meta": { "page": 1, "limit": 20, "total": 191, "totalPages": 10, "hasMore": true },',
  '  "timestamp": "2026-11-14T01:00:00.000Z"',
  "}",
].join("\n");

const DETAIL_RESPONSE = [
  "{",
  '  "success": true,',
  '  "data": {',
  '    "id": "1",',
  '    "slug": "first-principles",',
  '    "title": "第一性原理",',
  '    "category": "cognition",',
  '    "introduction": "把事物拆解到最基本真理，再往上重构。",',
  '    "keyInsight": "不要类比，要回到第一性原理。",',
  '    "usage": {',
  '      "scenarios": ["创新决策", "成本分析"],',
  '      "steps": ["识别假设", "拆解到基本真理", "重新推导"],',
  '      "pitfalls": ["陷入类比思维"],',
  '      "combineWith": ["二阶思维"]',
  "    },",
  '    "cases": [{ "title": "马斯克火箭", "content": "从原材料成本推导火箭价格。", "type": "business" }],',
  '    "relatedModels": ["second-order-thinking"],',
  '    "updatedAt": "2025-01-01"',
  "    // …其余字段见下方「模型字段字典」",
  "  },",
  '  "timestamp": "2026-11-14T01:00:00.000Z"',
  "}",
].join("\n");

const ERROR_RESPONSE = [
  "{",
  '  "success": false,',
  '  "error": {',
  '    "code": "INVALID_PARAMS",',
  '    "message": "limit 需为 1-100 的整数"',
  "  },",
  '  "timestamp": "2026-11-14T01:00:00.000Z"',
  "}",
].join("\n");

const CATEGORY_ROWS = [
  ["decision", "决策思维", "🎯"],
  ["cognition", "认知升级", "🧠"],
  ["system", "系统思维", "🔄"],
  ["communication", "沟通表达", "💬"],
  ["business", "商业分析", "📊"],
  ["learning", "学习成长", "📚"],
  ["probability", "概率思维", "🎲"],
  ["efficiency", "效率管理", "⚡"],
  ["innovation", "创新思维", "💡"],
  ["game", "博弈思维", "♟️"],
];

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
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
  };
  return (
    <button
      type="button"
      onClick={copy}
      className="text-xs px-2.5 py-1 rounded border border-border text-text-secondary hover:text-primary hover:border-primary/40 transition-colors shrink-0"
    >
      {copied ? "✅ 已复制" : "复制"}
    </button>
  );
}

function CodeBlock({ title, code }: { title: string; code: string }) {
  return (
    <div className="rounded-xl border border-border bg-surface-solid overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-4 py-2.5 border-b border-border bg-surface-alt/50">
        <span className="text-xs font-bold text-blue-400 truncate">{title}</span>
        <CopyButton text={code} />
      </div>
      <pre className="p-4 text-xs text-text-light font-mono overflow-x-auto whitespace-pre leading-relaxed">
        {code}
      </pre>
    </div>
  );
}

function Section({ icon, title, children }: { icon: string; title: string; children: React.ReactNode }) {
  return (
    <section>
      <div className="flex items-center gap-2 mb-5">
        <span className="text-2xl">{icon}</span>
        <h2 className="text-2xl font-bold text-text">{title}</h2>
      </div>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

function InfoCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4 text-sm text-text-secondary leading-relaxed">
      {children}
    </div>
  );
}

function DataTable({ head, rows }: { head: string[]; rows: (string | React.ReactNode)[][] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-border">
      <table className="w-full text-sm min-w-[560px]">
        <thead className="bg-surface-alt/50 text-text-secondary">
          <tr>
            {head.map((h) => (
              <th key={h} className="text-left px-4 py-2.5 font-semibold whitespace-nowrap">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {rows.map((row, i) => (
            <tr key={i} className="text-text-secondary">
              {row.map((cell, j) => (
                <td key={j} className={`px-4 py-2.5 ${j === 0 ? "font-mono text-primary whitespace-nowrap" : ""}`}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function ApiDocsPage() {
  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-secondary/6" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <Link
            href="/platform"
            className="inline-flex items-center gap-1.5 text-sm text-text-light hover:text-primary transition-colors mb-6"
          >
            ← 返回开放平台
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">📖</span>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-primary/15 text-primary border border-primary/25">
              API DOCS · v1.0.0
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-text mb-4">对外数据接口文档</h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            公开、只读、免鉴权的 REST 接口。用任意语言获取 {191} 个思维模型及其完整解读信息，支持分页、筛选、搜索与跨域调用。
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <code className="rounded-lg bg-card border border-border px-3 py-2 text-sm text-primary font-mono break-all">
              GET {BASE}
            </code>
            <CopyButton text={BASE} />
            <a
              href={`${BASE}/openapi.json`}
              className="text-sm font-medium text-primary hover:underline"
            >
              下载 OpenAPI 规格 →
            </a>
          </div>
        </div>
      </section>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        <Section icon="⚡" title="快速开始">
          <CodeBlock title="cURL" code={CURL_EXAMPLES} />
          <CodeBlock title="JavaScript / TypeScript（浏览器直接可用）" code={JS_EXAMPLE} />
          <CodeBlock title="Python" code={PY_EXAMPLE} />
        </Section>

        <Section icon="📐" title="通用约定">
          <InfoCard>
            <div className="space-y-2">
              <p><b className="text-text">认证</b>：无需 API Key，全部接口公开只读。</p>
              <p><b className="text-text">数据源</b>：仅内置模型库（191 条），不含通过开放平台录入的数据；接口不会修改任何数据。</p>
              <p><b className="text-text">跨域 CORS</b>：默认返回 <code className="text-primary">Access-Control-Allow-Origin: *</code>，支持 <code className="text-primary">OPTIONS</code> 预检；服务端可用 <code className="text-primary">PLATFORM_CORS_ORIGINS</code> 配置逗号分隔的来源白名单。</p>
              <p><b className="text-text">缓存</b>：成功响应带 <code className="text-primary">Cache-Control: public, max-age=60</code>；错误响应不缓存。</p>
              <p><b className="text-text">编码</b>：UTF-8，响应为 <code className="text-primary">application/json</code>。</p>
              <p><b className="text-text">调用频率</b>：当前没有硬性限流，请合理控制频率；数据为静态内容，建议调用方自行缓存。</p>
            </div>
          </InfoCard>
          <CodeBlock title="统一响应结构" code={LIST_RESPONSE} />
          <CodeBlock title="错误响应结构" code={ERROR_RESPONSE} />
          <DataTable
            head={["错误码", "HTTP", "含义"]}
            rows={[
              ["INVALID_PARAMS", "400", "page / limit 取值不合法"],
              ["INVALID_CATEGORY", "400", "category 不是有效的分类 id"],
              ["INVALID_DIFFICULTY", "400", "difficulty 不是 1 / 2 / 3"],
              ["INVALID_SORT", "400", "sort 不在允许范围内"],
              ["INVALID_SLUG", "400", "slug 格式不合法"],
              ["NOT_FOUND", "404", "接口路径或模型不存在"],
            ]}
          />
        </Section>

        <Section icon="🔌" title="接口一览">
          <DataTable
            head={["方法", "路径", "说明"]}
            rows={[
              ["GET", "/models", "分页查询模型列表（可筛选、搜索、排序、裁剪字段）"],
              ["GET", "/models/{slug}", "获取单个模型的完整解读信息"],
              ["GET", "/categories", "10 大分类及各分类模型数量"],
              ["GET", "/stats", "模型库统计（总数、分类/难度分布、标签数）"],
              ["GET", "/openapi.json", "OpenAPI 3.1 规格，可导入 Postman / Apifox"],
            ]}
          />
        </Section>

        <Section icon="📋" title="GET /models · 模型列表">
          <p className="text-sm text-text-secondary">默认返回精简字段并分页；需要完整 <code className="text-primary">usage</code> / <code className="text-primary">cases</code> 等解读信息时，请调用单模型详情接口。</p>
          <DataTable
            head={["参数", "类型", "默认", "说明"]}
            rows={[
              ["page", "int", "1", "页码，1-10000"],
              ["limit", "int", "20", "每页条数，1-100"],
              ["category", "string", "—", "分类 id，见下方速查表"],
              ["q", "string", "—", "关键词，匹配名称 / slug / 副标题 / 洞察 / 介绍 / 标签，最长 80 字"],
              ["difficulty", "int", "—", "难度 1 / 2 / 3"],
              ["sort", "string", "slug", "排序字段：slug / title / difficulty"],
              ["order", "string", "asc", "asc 或 desc"],
              ["fields", "string", "—", "逗号分隔，只返回指定字段，如 slug,title,keyInsight"],
            ]}
          />
          <CodeBlock title="请求示例" code={`curl -sS "${BASE}/models?category=decision&difficulty=2&sort=title&limit=5&page=1"`} />
          <CodeBlock title="响应示例（data 中为节选）" code={LIST_RESPONSE} />
          <InfoCard>
            <b className="text-text">meta</b>：page / limit / total（筛选后总数）/ totalPages / hasMore，可直接用于分页。
            列表默认字段为 slug、title、subtitle、category、icon、tags、difficulty、keyInsight、memorySentence、updatedAt。
          </InfoCard>
        </Section>

        <Section icon="🔍" title="GET /models/{slug} · 模型详情">
          <p className="text-sm text-text-secondary">
            slug 为列表接口返回的唯一标识（小写字母、数字、短横线）。返回该模型的全部字段，含介绍、用法、案例、关联模型、开场钩子与小故事。
          </p>
          <CodeBlock title="请求示例" code={`curl -sS "${BASE}/models/first-principles"`} />
          <CodeBlock title="响应示例（节选）" code={DETAIL_RESPONSE} />
        </Section>

        <Section icon="🗂️" title="GET /categories · 分类与分类 id 速查">
          <p className="text-sm text-text-secondary">返回 id、name、icon、description、color 与 count（该分类下的模型数）。下表为可直接用于 <code className="text-primary">category</code> 参数的 id。</p>
          <DataTable
            head={["分类 id", "名称", "图标"]}
            rows={CATEGORY_ROWS}
          />
          <CodeBlock title="请求示例" code={`curl -sS "${BASE}/categories"`} />
        </Section>

        <Section icon="📊" title="GET /stats · 统计信息">
          <p className="text-sm text-text-secondary">返回 totalModels、totalCategories、totalTags，以及 byCategory / byDifficulty 分布数组。</p>
          <CodeBlock title="请求示例" code={`curl -sS "${BASE}/stats"`} />
        </Section>

        <Section icon="🧾" title="模型字段字典">
          <DataTable
            head={["字段", "类型", "说明"]}
            rows={[
              ["id", "string", "内部编号"],
              ["slug", "string", "唯一标识，用于详情接口"],
              ["title", "string", "模型中文名"],
              ["subtitle", "string", "一句话副标题"],
              ["category", "string", "分类 id"],
              ["tags", "string[]", "标签数组"],
              ["difficulty", "1 | 2 | 3", "难度"],
              ["icon", "string", "emoji 图标"],
              ["introduction", "string", "通俗介绍"],
              ["keyInsight", "string", "关键洞察"],
              ["memorySentence", "string", "一句话记忆口诀"],
              ["usage", "object", "scenarios / steps / pitfalls / combineWith 四个字符串数组"],
              ["cases", "object[]", "案例数组：title / content / type"],
              ["relatedModels", "string[]", "关联模型 slug"],
              ["furtherReading", "string[]", "延伸阅读"],
              ["hook / story", "string", "知识卡片开场钩子 / 小故事（部分模型有）"],
              ["featured", "boolean", "是否精选（部分模型有）"],
              ["updatedAt", "string", "更新日期 YYYY-MM-DD"],
            ]}
          />
        </Section>

        <Section icon="🔄" title="与原有接口的关系">
          <InfoCard>
            <div className="space-y-2">
              <p><b className="text-text">/api/v1/*（本页）</b>：面向外部系统的稳定只读数据接口，统一响应格式、支持 CORS，建议新接入优先使用。</p>
              <p><b className="text-text">/api/platform</b>：原有接口保持兼容，继续用于 AI 录入（POST submit）、查询已录入数据、统计，以及 Excel 导入导出。</p>
              <p>两套接口互不冲突：v1 只读内置模型库；录入与文件能力仍走 /api/platform。</p>
            </div>
          </InfoCard>
        </Section>

        <div className="pt-2 pb-8 flex flex-wrap items-center gap-4">
          <Link
            href="/platform"
            className="rounded-xl bg-primary/12 hover:bg-primary/20 border border-primary/30 text-primary text-sm font-semibold px-4 py-2.5 transition-colors"
          >
            ← 返回开放平台
          </Link>
          <a href={`${BASE}/openapi.json`} className="text-sm text-text-light hover:text-primary transition-colors">
            查看 OpenAPI 3.1 规格
          </a>
          <span className="text-xs text-text-light">文档路径：{DOC_PATH}</span>
        </div>
      </main>
    </div>
  );
}
