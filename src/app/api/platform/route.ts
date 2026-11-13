import { NextRequest, NextResponse } from "next/server";
import { models as allModels, getModelBySlug, type MentalModel } from "@/lib/models-data";
import { readStats, readSubmissions, writeSubmissions, bumpCount } from "@/lib/platform-store";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get("action");

  // 返回统计信息
  if (action === "stats") {
    return NextResponse.json(readStats());
  }

  // 查看已通过开放平台录入的模型
  if (action === "submissions") {
    return NextResponse.json({ models: readSubmissions(), count: readSubmissions().length });
  }

  // 查询单个模型
  const slug = searchParams.get("slug");
  if (slug) {
    const model = getModelBySlug(slug);
    if (!model) return NextResponse.json({ error: "模型未找到" }, { status: 404 });
    bumpCount();
    return NextResponse.json({ model });
  }

  // 查询模型列表（精简字段）
  const category = searchParams.get("category");
  let list: MentalModel[] = [...allModels];
  if (category) list = list.filter((m: MentalModel) => m.category === category);

  bumpCount();
  return NextResponse.json({
    models: list.map((m: MentalModel) => ({
      slug: m.slug,
      title: m.title,
      subtitle: m.subtitle,
      icon: m.icon,
      category: m.category,
      tags: m.tags,
      keyInsight: m.keyInsight,
      memorySentence: m.memorySentence,
    })),
    count: list.length,
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action } = body;

    if (action === "query") {
      // AI 调用：查询指定模型的完整解读信息
      const { slug }: { slug?: string } = body;
      if (!slug) return NextResponse.json({ error: "缺少 slug 参数" }, { status: 400 });
      const model = getModelBySlug(slug);
      if (!model) return NextResponse.json({ error: "模型未找到" }, { status: 404 });
      const stats = bumpCount();
      return NextResponse.json({ model, stats });
    }

    if (action === "search") {
      // AI 调用：关键词搜索模型
      const { q }: { q?: string } = body;
      if (!q) return NextResponse.json({ error: "缺少搜索关键词" }, { status: 400 });
      const keyword = q.toLowerCase();
      const results = allModels.filter(
        (m: MentalModel) =>
          m.title.toLowerCase().includes(keyword) ||
          m.tags.some((t: string) => t.toLowerCase().includes(keyword)) ||
          m.introduction.toLowerCase().includes(keyword)
      );
      const stats = bumpCount();
      return NextResponse.json({ models: results.slice(0, 10), count: results.length, stats });
    }

    if (action === "list") {
      // AI 调用：获取分类下的模型列表
      const { category }: { category?: string } = body;
      let list: MentalModel[] = [...allModels];
      if (category) list = list.filter((m: MentalModel) => m.category === category);
      const stats = bumpCount();
      return NextResponse.json({
        models: list.map((m: MentalModel) => ({ slug: m.slug, title: m.title, icon: m.icon, keyInsight: m.keyInsight })),
        count: list.length,
        stats,
      });
    }

    if (action === "submit") {
      // 录入模型及相关解读信息（开放平台核心能力）
      const { model }: { model?: unknown } = body;
      if (!model || typeof model !== "object" || Array.isArray(model)) {
        return NextResponse.json({ error: "缺少 model 对象" }, { status: 400 });
      }
      const record = model as Record<string, unknown>;
      if (!record.slug || !record.title || !record.category) {
        return NextResponse.json(
          { error: "model 缺少必填字段（slug / title / category 为必填）" },
          { status: 400 }
        );
      }
      const arr = readSubmissions();
      const idx = arr.findIndex((m) => m.slug === record.slug);
      if (idx >= 0) arr[idx] = record; // 同 slug 覆盖更新
      else arr.push(record);
      writeSubmissions(arr);
      const stats = bumpCount();
      return NextResponse.json({
        success: true,
        message: idx >= 0 ? "模型已更新" : "模型已录入",
        count: arr.length,
        stats,
      });
    }

    return NextResponse.json({ error: "未知操作类型" }, { status: 400 });
  } catch {
    return NextResponse.json({ error: "请求解析失败" }, { status: 400 });
  }
}
