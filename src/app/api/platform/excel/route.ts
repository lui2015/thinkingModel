import { NextRequest, NextResponse } from "next/server";
import ExcelJS from "exceljs";
import { models as allModels, categories } from "@/lib/models-data";
import { readSubmissions, writeSubmissions, bumpCount, type Submission } from "@/lib/platform-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const MAX_ROWS = 1000;
const MAX_COLS = 60;
const VALID_CATEGORIES = new Set(categories.map((c) => c.id));
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

interface FieldDef {
  key: string;
  label: string;
  width: number;
  note: string;
}

/* 一列对应一个顶层字段；usage 的四个子数组摊平，cases 用 JSON 文本 */
const FIELD_DEFS: FieldDef[] = [
  { key: "slug", label: "唯一标识", width: 26, note: "必填。英文小写/数字/短横线，如 first-principles；同标识导入时覆盖更新" },
  { key: "title", label: "模型名称", width: 22, note: "必填。模型中文名" },
  { key: "subtitle", label: "副标题", width: 30, note: "一句话副标题" },
  { key: "category", label: "分类", width: 16, note: `必填。分类 id：${categories.map((c) => c.id).join(" / ")}` },
  { key: "icon", label: "图标", width: 10, note: "emoji，如 🧠" },
  { key: "tags", label: "标签", width: 28, note: "多个用单元格内换行分隔（Excel 里 Alt+Enter）" },
  { key: "difficulty", label: "难度", width: 9, note: "1 / 2 / 3" },
  { key: "introduction", label: "介绍", width: 46, note: "通俗介绍" },
  { key: "keyInsight", label: "关键洞察", width: 40, note: "一句话洞察" },
  { key: "memorySentence", label: "记忆口诀", width: 30, note: "一句话口诀" },
  { key: "scenarios", label: "适用场景", width: 34, note: "usage.scenarios，多个用换行分隔" },
  { key: "steps", label: "实操步骤", width: 40, note: "usage.steps，多个用换行分隔" },
  { key: "pitfalls", label: "常见误区", width: 34, note: "usage.pitfalls，多个用换行分隔" },
  { key: "combineWith", label: "搭配模型", width: 28, note: "usage.combineWith，多个用换行分隔" },
  { key: "cases", label: "案例", width: 50, note: 'JSON 数组，如 [{"title":"案例","content":"内容","type":"life"}]' },
  { key: "relatedModels", label: "关联模型", width: 28, note: "多个模型 slug 用换行分隔" },
  { key: "furtherReading", label: "延伸阅读", width: 28, note: "多个用换行分隔" },
  { key: "hook", label: "开场钩子", width: 40, note: "知识卡片封面文案" },
  { key: "story", label: "小故事", width: 46, note: "知识卡片小故事" },
  { key: "updatedAt", label: "更新日期", width: 14, note: "YYYY-MM-DD，留空自动填当天" },
];

/* Excel 单元格值可能是富文本、公式、超链接等对象，统一转成纯文本 */
function cellText(value: unknown): string {
  if (value === null || value === undefined) return "";
  if (typeof value === "string") return value;
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  if (typeof value === "object") {
    const obj = value as Record<string, unknown>;
    if (Array.isArray(obj.richText)) {
      return obj.richText.map((r) => String((r as { text?: unknown })?.text ?? "")).join("");
    }
    if (typeof obj.text === "string") return obj.text;
    if ("result" in obj) return cellText(obj.result);
  }
  return "";
}

/* 防止导出内容被 Excel 当作公式执行（写入时加 ' 前缀，导入时还原） */
function guard(text: string): string {
  return /^[=+\-@\t\r]/.test(text) ? `'${text}` : text;
}
function unguard(text: string): string {
  return /^'[=+\-@]/.test(text) ? text.slice(1) : text;
}

function listText(value: unknown): string {
  if (!Array.isArray(value)) return "";
  return guard(value.map((item) => String(item ?? "")).join("\n"));
}

function parseList(text: string): string[] {
  const trimmed = text.trim();
  if (!trimmed) return [];
  if (trimmed.startsWith("[")) {
    try {
      const parsed: unknown = JSON.parse(trimmed);
      if (Array.isArray(parsed)) return parsed.map((item) => String(item ?? "")).filter(Boolean);
    } catch {
      // 按普通换行文本处理
    }
  }
  return trimmed.split(/\r?\n/).map((s) => s.trim()).filter(Boolean);
}

function parseCases(text: string): unknown[] {
  if (!text.trim()) return [];
  try {
    const parsed: unknown = JSON.parse(text);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function modelToRow(model: Record<string, unknown>): Record<string, string> {
  const usage = (model.usage ?? {}) as Record<string, unknown>;
  return {
    slug: guard(String(model.slug ?? "")),
    title: guard(String(model.title ?? "")),
    subtitle: guard(String(model.subtitle ?? "")),
    category: String(model.category ?? ""),
    icon: String(model.icon ?? ""),
    tags: listText(model.tags),
    difficulty: String(model.difficulty ?? ""),
    introduction: guard(String(model.introduction ?? "")),
    keyInsight: guard(String(model.keyInsight ?? "")),
    memorySentence: guard(String(model.memorySentence ?? "")),
    scenarios: listText(usage.scenarios),
    steps: listText(usage.steps),
    pitfalls: listText(usage.pitfalls),
    combineWith: listText(usage.combineWith),
    cases: guard(typeof model.cases === "string" ? model.cases : JSON.stringify(model.cases ?? [])),
    relatedModels: listText(model.relatedModels),
    furtherReading: listText(model.furtherReading),
    hook: guard(String(model.hook ?? "")),
    story: guard(String(model.story ?? "")),
    updatedAt: String(model.updatedAt ?? ""),
  };
}

function rowToModel(cells: Record<string, string>): { model?: Submission; error?: string } {
  const slug = (cells.slug ?? "").trim();
  const title = (cells.title ?? "").trim();
  const category = (cells.category ?? "").trim();
  if (!slug || !title || !category) return { error: "唯一标识 / 模型名称 / 分类为必填" };
  if (!SLUG_RE.test(slug)) return { error: "唯一标识只能含英文小写字母、数字和短横线" };
  if (!VALID_CATEGORIES.has(category)) return { error: `分类「${category}」无效` };

  const difficulty = Number(cells.difficulty);
  const model: Submission = {
    id: slug,
    slug,
    title,
    subtitle: cells.subtitle ?? "",
    category,
    icon: cells.icon || "🧠",
    tags: parseList(cells.tags ?? ""),
    difficulty: difficulty >= 1 && difficulty <= 3 ? Math.round(difficulty) : 1,
    introduction: cells.introduction ?? "",
    keyInsight: cells.keyInsight ?? "",
    cases: parseCases(cells.cases ?? ""),
    usage: {
      scenarios: parseList(cells.scenarios ?? ""),
      steps: parseList(cells.steps ?? ""),
      pitfalls: parseList(cells.pitfalls ?? ""),
      combineWith: parseList(cells.combineWith ?? ""),
    },
    memorySentence: cells.memorySentence ?? "",
    furtherReading: parseList(cells.furtherReading ?? ""),
    relatedModels: parseList(cells.relatedModels ?? ""),
    updatedAt: /^\d{4}-\d{2}-\d{2}$/.test(cells.updatedAt ?? "")
      ? cells.updatedAt
      : new Date().toISOString().slice(0, 10),
  };
  if (cells.hook) model.hook = cells.hook;
  if (cells.story) model.story = cells.story;
  return { model };
}

/* 把已有模型走一遍「导出→导入」的规范化，用于识别模板里未改动的行 */
function fingerprint(model: Record<string, unknown>): string | null {
  const cells: Record<string, string> = {};
  for (const [key, value] of Object.entries(modelToRow(model))) {
    cells[key] = unguard(value.trim());
  }
  const normalized = rowToModel(cells);
  return normalized.model ? JSON.stringify(normalized.model) : null;
}

/* GET：导出全部模型（模型库 + 开放平台录入数据）为 xlsx，文件本身即可作为导入模板 */
export async function GET() {
  const merged = new Map<string, Record<string, unknown>>();
  for (const model of allModels) merged.set(model.slug, model as unknown as Record<string, unknown>);
  for (const item of readSubmissions()) {
    if (item && typeof item.slug === "string" && item.slug) {
      merged.set(item.slug, item);
    }
  }

  const workbook = new ExcelJS.Workbook();
  workbook.creator = "思维模型库开放平台";
  workbook.created = new Date();

  const sheet = workbook.addWorksheet("模型数据");
  sheet.columns = FIELD_DEFS.map((f) => ({ header: f.label, key: f.key, width: f.width }));
  for (const model of merged.values()) sheet.addRow(modelToRow(model));
  sheet.eachRow((row, rowNumber) => {
    row.alignment = { vertical: "top", wrapText: true };
    if (rowNumber === 1) {
      row.font = { bold: true };
      row.height = 26;
    }
  });

  const info = workbook.addWorksheet("字段说明");
  info.columns = [
    { header: "列名", key: "label", width: 18 },
    { header: "字段", key: "key", width: 22 },
    { header: "说明", key: "note", width: 96 },
  ];
  for (const field of FIELD_DEFS) info.addRow({ label: field.label, key: field.key, note: field.note });
  info.getRow(1).font = { bold: true };
  info.addRow({
    label: "导入提示",
    key: "",
    note: "编辑「模型数据」工作表后原样上传即可；同唯一标识会覆盖更新；单次最多 1000 行、文件不超过 5MB。",
  });

  const buffer = await workbook.xlsx.writeBuffer();
  const date = new Date().toISOString().slice(0, 10);
  return new Response(Buffer.from(buffer as ArrayBuffer), {
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename="thinking-models-${date}.xlsx"`,
      "Cache-Control": "no-store",
    },
  });
}

/* POST：导入 xlsx，逐行校验后写入开放平台录入数据 */
export async function POST(request: NextRequest) {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: "请上传 .xlsx 文件" }, { status: 400 });
  }

  const entry = form.get("file");
  if (!entry || typeof entry === "string") {
    return NextResponse.json({ error: "缺少上传文件" }, { status: 400 });
  }
  const file = entry as File;
  if (!/\.xlsx$/i.test(file.name)) {
    return NextResponse.json({ error: "仅支持 .xlsx 格式的 Excel 文档" }, { status: 400 });
  }
  if (file.size > MAX_FILE_SIZE) {
    return NextResponse.json({ error: "文件超过 5MB 限制" }, { status: 413 });
  }

  const bytes = Buffer.from(await file.arrayBuffer());
  if (bytes.length < 4 || bytes[0] !== 0x50 || bytes[1] !== 0x4b) {
    return NextResponse.json({ error: "文件内容不是有效的 xlsx 文档" }, { status: 400 });
  }

  const workbook = new ExcelJS.Workbook();
  const arrayBuffer = new Uint8Array(bytes).buffer;
  try {
    await workbook.xlsx.load(arrayBuffer as unknown as Parameters<typeof workbook.xlsx.load>[0]);
  } catch {
    return NextResponse.json({ error: "Excel 解析失败，请确认文件未损坏" }, { status: 400 });
  }

  const sheet = workbook.getWorksheet("模型数据") ?? workbook.worksheets[0];
  if (!sheet) return NextResponse.json({ error: "Excel 中没有工作表" }, { status: 400 });
  if (sheet.rowCount > MAX_ROWS + 1) {
    return NextResponse.json({ error: `单次最多导入 ${MAX_ROWS} 行` }, { status: 413 });
  }
  if (sheet.columnCount > MAX_COLS) {
    return NextResponse.json({ error: "Excel 列数过多" }, { status: 400 });
  }

  const labelToKey = new Map(FIELD_DEFS.map((f) => [f.label, f.key]));
  const validKeys = new Set(FIELD_DEFS.map((f) => f.key));
  const headerMap = new Map<number, string>();
  const headerRow = sheet.getRow(1);
  for (let col = 1; col <= headerRow.cellCount; col++) {
    const raw = unguard(cellText(headerRow.getCell(col).value).trim());
    const key = labelToKey.get(raw) ?? (validKeys.has(raw) ? raw : "");
    if (key) headerMap.set(col, key);
  }
  if (![...headerMap.values()].includes("slug")) {
    return NextResponse.json({ error: "表头缺少「唯一标识」列，请使用导出的 Excel 作为模板" }, { status: 400 });
  }

  // 导出文件含全部模型库数据，原样导入时不应把它们重复写入录入区
  const baseline = new Map<string, string>();
  for (const model of allModels) {
    const value = fingerprint(model as unknown as Record<string, unknown>);
    if (value) baseline.set(model.slug, value);
  }
  for (const item of readSubmissions()) {
    if (item && typeof item.slug === "string") {
      const value = fingerprint(item);
      if (value) baseline.set(item.slug, value);
    }
  }

  const accepted: Submission[] = [];
  const errors: { row: number; reason: string }[] = [];
  let skipped = 0;
  let unchanged = 0;

  for (let rowNumber = 2; rowNumber <= sheet.rowCount; rowNumber++) {
    const row = sheet.getRow(rowNumber);
    const cells: Record<string, string> = {};
    for (const [col, key] of headerMap) {
      cells[key] = unguard(cellText(row.getCell(col).value).trim());
    }
    if (Object.values(cells).every((v) => !v)) {
      skipped++;
      continue;
    }
    const { model, error } = rowToModel(cells);
    if (!model || error) {
      if (errors.length < 50) errors.push({ row: rowNumber, reason: error ?? "数据无效" });
      continue;
    }
    if (baseline.get(String(model.slug)) === JSON.stringify(model)) {
      unchanged++;
      continue;
    }
    accepted.push(model);
  }

  const submissions = readSubmissions();
  let imported = 0;
  let updated = 0;
  for (const model of accepted) {
    const index = submissions.findIndex((item) => item.slug === model.slug);
    if (index >= 0) {
      submissions[index] = model;
      updated++;
    } else {
      submissions.push(model);
      imported++;
    }
  }
  writeSubmissions(submissions);
  const stats = bumpCount(accepted.length);

  return NextResponse.json({
    success: true,
    imported,
    updated,
    unchanged,
    skipped,
    total: accepted.length,
    errors,
    count: submissions.length,
    stats,
  });
}
