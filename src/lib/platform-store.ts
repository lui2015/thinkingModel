import fs from "node:fs";

/* 开放平台录入数据的简易文件存储（容器重建会清空，正式环境应换数据库） */
const STATS_FILE = "/tmp/platform-stats.json";
const SUBMIT_FILE = "/tmp/platform-submissions.json";

export interface PlatformStats {
  total: number;
  today: number;
  date: string;
}

export type Submission = Record<string, unknown>;

export function readSubmissions(): Submission[] {
  try {
    if (!fs.existsSync(SUBMIT_FILE)) return [];
    const data: unknown = JSON.parse(fs.readFileSync(SUBMIT_FILE, "utf-8"));
    return Array.isArray(data) ? (data as Submission[]) : [];
  } catch {
    return [];
  }
}

export function writeSubmissions(arr: Submission[]) {
  try {
    fs.writeFileSync(SUBMIT_FILE, JSON.stringify(arr, null, 2), "utf-8");
  } catch {
    // 存储不可用时不影响接口主流程
  }
}

export function readStats(): PlatformStats {
  const empty = (): PlatformStats => ({ total: 0, today: 0, date: new Date().toISOString().slice(0, 10) });
  try {
    if (!fs.existsSync(STATS_FILE)) return empty();
    const data: unknown = JSON.parse(fs.readFileSync(STATS_FILE, "utf-8"));
    if (
      data && typeof data === "object" &&
      typeof (data as PlatformStats).total === "number" &&
      typeof (data as PlatformStats).today === "number" &&
      typeof (data as PlatformStats).date === "string"
    ) {
      return data as PlatformStats;
    }
    return empty();
  } catch {
    return empty();
  }
}

function writeStats(stats: PlatformStats) {
  try {
    fs.writeFileSync(STATS_FILE, JSON.stringify(stats), "utf-8");
  } catch {
    // 静默失败，不影响主流程
  }
}

export function bumpCount(step = 1): PlatformStats {
  const stats = readStats();
  const today = new Date().toISOString().slice(0, 10);
  stats.total += step;
  if (stats.date === today) {
    stats.today += step;
  } else {
    stats.today = step;
    stats.date = today;
  }
  writeStats(stats);
  return stats;
}
