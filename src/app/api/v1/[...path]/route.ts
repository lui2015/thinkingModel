import { NextRequest, NextResponse } from "next/server";
import { models, categories, getModelBySlug, type MentalModel } from "@/lib/models-data";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const LIST_FIELDS = [
  "slug", "title", "subtitle", "category", "icon", "tags",
  "difficulty", "keyInsight", "memorySentence", "updatedAt",
];
const LIST_FIELD_SET = new Set<string>(LIST_FIELDS);
const SORT_FIELD_SET = new Set<string>(["slug", "title", "difficulty"]);
const CATEGORY_IDS = new Set(categories.map((c) => c.id));

const CATEGORY_STATS = categories.map((c) => ({
  id: c.id,
  name: c.name,
  icon: c.icon,
  count: models.filter((m) => m.category === c.id).length,
}));
const DIFFICULTY_STATS = [1, 2, 3].map((difficulty) => ({
  difficulty,
  count: models.filter((m) => m.difficulty === difficulty).length,
}));

/* 默认允许任意来源；可通过 PLATFORM_CORS_ORIGINS 配置逗号分隔的白名单 */
function corsHeaders(request: Request): Record<string, string> {
  const configured = (process.env.PLATFORM_CORS_ORIGINS ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const origin = request.headers.get("origin") ?? "";
  const headers: Record<string, string> = {
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Accept",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
  if (configured.length === 0) {
    headers["Access-Control-Allow-Origin"] = "*";
  } else if (origin && configured.includes(origin)) {
    headers["Access-Control-Allow-Origin"] = origin;
  }
  return headers;
}

function ok(request: Request, data: unknown, meta?: Record<string, unknown>) {
  return NextResponse.json(
    { success: true, data, ...(meta ? { meta } : {}), timestamp: new Date().toISOString() },
    { headers: { ...corsHeaders(request), "Cache-Control": "public, max-age=60" } }
  );
}

function fail(request: Request, status: number, code: string, message: string) {
  return NextResponse.json(
    { success: false, error: { code, message }, timestamp: new Date().toISOString() },
    { status, headers: { ...corsHeaders(request), "Cache-Control": "no-store" } }
  );
}

function intParam(value: string | null, fallback: number, min: number, max: number): number | null {
  if (value === null || value === "") return fallback;
  if (!/^\d+$/.test(value)) return null;
  const parsed = Number(value);
  if (!Number.isSafeInteger(parsed) || parsed < min || parsed > max) return null;
  return parsed;
}

function project(model: MentalModel, fields: string[]) {
  const record = model as unknown as Record<string, unknown>;
  const keys = fields.length ? fields.filter((f) => LIST_FIELD_SET.has(f)) : LIST_FIELDS;
  return Object.fromEntries((keys.length ? keys : LIST_FIELDS).map((key) => [key, record[key] ?? null]));
}

function handleList(request: NextRequest) {
  const sp = new URL(request.url).searchParams;

  const page = intParam(sp.get("page"), 1, 1, 10000);
  const limit = intParam(sp.get("limit"), 20, 1, 100);
  if (page === null || limit === null) {
    return fail(request, 400, "INVALID_PARAMS", "page 需为 1-10000 的整数，limit 需为 1-100 的整数");
  }

  const category = (sp.get("category") ?? "").trim();
  if (category && !CATEGORY_IDS.has(category)) {
    return fail(request, 400, "INVALID_CATEGORY", `未知分类：${category}`);
  }

  const difficulty = (sp.get("difficulty") ?? "").trim();
  if (difficulty && !/^[123]$/.test(difficulty)) {
    return fail(request, 400, "INVALID_DIFFICULTY", "difficulty 只能是 1 / 2 / 3");
  }

  const sort = (sp.get("sort") ?? "slug").trim();
  if (!SORT_FIELD_SET.has(sort)) {
    return fail(request, 400, "INVALID_SORT", "sort 只能是 slug / title / difficulty");
  }

  const q = (sp.get("q") ?? "").trim().toLowerCase().slice(0, 80);
  const fields = (sp.get("fields") ?? "").split(",").map((f) => f.trim()).filter(Boolean).slice(0, 20);
  const order = sp.get("order") === "desc" ? -1 : 1;

  let list = [...models];
  if (category) list = list.filter((m) => m.category === category);
  if (difficulty) list = list.filter((m) => m.difficulty === Number(difficulty));
  if (q) {
    list = list.filter((m) =>
      [m.title, m.slug, m.subtitle, m.keyInsight, m.introduction, ...m.tags]
        .some((text) => text.toLowerCase().includes(q))
    );
  }
  list.sort((a, b) => {
    const left = String((a as unknown as Record<string, unknown>)[sort] ?? "");
    const right = String((b as unknown as Record<string, unknown>)[sort] ?? "");
    return order * left.localeCompare(right, "zh-Hans-CN");
  });

  const total = list.length;
  const start = (page - 1) * limit;
  const data = list.slice(start, start + limit).map((m) => project(m, fields));
  return ok(request, data, {
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
    hasMore: start + limit < total,
  });
}

function handleDetail(request: NextRequest, rawSlug: string) {
  let slug: string;
  try {
    slug = decodeURIComponent(rawSlug);
  } catch {
    return fail(request, 400, "INVALID_SLUG", "slug 编码无效");
  }
  if (slug.length > 120 || !/^[a-z0-9-]+$/.test(slug)) {
    return fail(request, 400, "INVALID_SLUG", "slug 只能含小写字母、数字和短横线");
  }
  const model = getModelBySlug(slug);
  if (!model) return fail(request, 404, "NOT_FOUND", `模型 ${slug} 不存在`);
  return ok(request, model);
}

function openApiSpec() {
  const modelSchema = {
    type: "object",
    properties: {
      id: { type: "string" },
      slug: { type: "string", description: "唯一标识" },
      title: { type: "string", description: "模型名称" },
      subtitle: { type: "string" },
      category: { type: "string", description: "分类 id" },
      icon: { type: "string" },
      tags: { type: "array", items: { type: "string" } },
      difficulty: { type: "integer", enum: [1, 2, 3] },
      introduction: { type: "string" },
      keyInsight: { type: "string" },
      memorySentence: { type: "string" },
      usage: { type: "object", description: "scenarios / steps / pitfalls / combineWith" },
      cases: { type: "array", items: { type: "object" } },
      relatedModels: { type: "array", items: { type: "string" } },
      furtherReading: { type: "array", items: { type: "string" } },
      updatedAt: { type: "string" },
    },
  };
  const jsonResponse = (description: string) => ({
    description,
    content: { "application/json": { schema: { type: "object" } } },
  });

  return {
    openapi: "3.1.0",
    info: {
      title: "思维模型库 · 开放数据 API",
      version: "1.0.0",
      description: "公开只读接口，返回模型库中的思维模型与解读信息。无需鉴权，支持跨域调用。",
    },
    servers: [
      { url: "https://www.luliming.xyz/thinkingModel/api/v1", description: "生产环境" },
    ],
    paths: {
      "/models": {
        get: {
          operationId: "listModels",
          summary: "分页查询模型列表",
          parameters: [
            { name: "page", in: "query", schema: { type: "integer", default: 1 } },
            { name: "limit", in: "query", schema: { type: "integer", default: 20, maximum: 100 } },
            { name: "category", in: "query", schema: { type: "string" }, description: "分类 id" },
            { name: "q", in: "query", schema: { type: "string" }, description: "关键词搜索" },
            { name: "difficulty", in: "query", schema: { type: "integer", enum: [1, 2, 3] } },
            { name: "sort", in: "query", schema: { type: "string", enum: ["slug", "title", "difficulty"] } },
            { name: "order", in: "query", schema: { type: "string", enum: ["asc", "desc"] } },
            { name: "fields", in: "query", schema: { type: "string" }, description: "逗号分隔的返回字段" },
          ],
          responses: { "200": jsonResponse("模型列表"), "400": jsonResponse("参数错误") },
        },
      },
      "/models/{slug}": {
        get: {
          operationId: "getModel",
          summary: "获取单个模型完整信息",
          parameters: [{ name: "slug", in: "path", required: true, schema: { type: "string" } }],
          responses: {
            "200": { description: "模型详情", content: { "application/json": { schema: modelSchema } } },
            "404": jsonResponse("模型不存在"),
          },
        },
      },
      "/categories": {
        get: {
          operationId: "listCategories",
          summary: "获取分类及每类模型数量",
          responses: { "200": jsonResponse("分类列表") },
        },
      },
      "/stats": {
        get: {
          operationId: "getStats",
          summary: "获取模型库统计信息",
          responses: { "200": jsonResponse("统计信息") },
        },
      },
    },
  };
}

export async function GET(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  const { path } = await context.params;
  const segments = (path ?? []).filter(Boolean);

  if (segments.length === 1 && segments[0] === "openapi.json") {
    return NextResponse.json(openApiSpec(), {
      headers: { ...corsHeaders(request), "Cache-Control": "public, max-age=3600" },
    });
  }
  if (segments.length === 1 && segments[0] === "categories") {
    return ok(request, CATEGORY_STATS, { total: CATEGORY_STATS.length });
  }
  if (segments.length === 1 && segments[0] === "stats") {
    return ok(request, {
      totalModels: models.length,
      totalCategories: categories.length,
      totalTags: new Set(models.flatMap((m) => m.tags)).size,
      byCategory: CATEGORY_STATS,
      byDifficulty: DIFFICULTY_STATS,
    });
  }
  if (segments[0] === "models") {
    if (segments.length === 1) return handleList(request);
    if (segments.length === 2) return handleDetail(request, segments[1]);
  }

  return fail(
    request,
    404,
    "NOT_FOUND",
    "未知接口。可用：GET /models、/models/{slug}、/categories、/stats、/openapi.json"
  );
}

export async function OPTIONS(request: NextRequest) {
  return new Response(null, { status: 204, headers: corsHeaders(request) });
}
