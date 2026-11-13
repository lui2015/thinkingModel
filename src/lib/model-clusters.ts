/**
 * 模型脑图的「主题簇」层。
 *
 * 191 个模型若直接平铺，认知负荷过高。这里把每个分类下的模型按语义
 * 聚成 3~5 个簇，并给每簇一句记忆锚点，形成
 *   思维模型库 → 10 大分类 → 40 个主题簇 → 具体模型
 * 的四层结构，方便按「类 → 簇 → 模型」逐级记忆。
 */

export interface ModelCluster {
  id: string;
  category: string;
  title: string;
  mnemonic: string;
  icon: string;
  slugs: string[];
}

export const modelClusters: ModelCluster[] = [
  // ===== 决策思维 decision (17) =====
  {
    id: "decision-1", category: "decision", title: "抉择框架", icon: "🧭",
    mnemonic: "把选项摊开，往前多想一步",
    slugs: ["second-order-thinking", "ten-ten-ten-rule", "inversion", "occams-razor", "decision-tree", "decision-matrix", "elimination-by-aspects"],
  },
  {
    id: "decision-2", category: "decision", title: "风险与不确定", icon: "🎲",
    mnemonic: "先算期望，再留余地，最后预演失败",
    slugs: ["safety-margin", "expected-value", "minimax-regret", "pre-mortem", "real-options", "regret-minimization"],
  },
  {
    id: "decision-3", category: "decision", title: "取舍与时机", icon: "⏳",
    mnemonic: "够好就收手，别为已花的钱继续买单",
    slugs: ["satisficing", "37-percent-rule", "sunk-cost", "opportunity-cost"],
  },

  // ===== 认知升级 cognition (34) =====
  {
    id: "cognition-1", category: "cognition", title: "思维底座", icon: "🏛️",
    mnemonic: "先质疑前提，再检查自己怎么想",
    slugs: ["first-principles", "circle-of-competence", "metacognition", "map-territory", "ladder-of-inference", "iceberg-model", "nlp-levels", "simple-is-best"],
  },
  {
    id: "cognition-2", category: "cognition", title: "判断偏误", icon: "🎭",
    mnemonic: "大脑爱走捷径，越顺手越要警惕",
    slugs: ["confirmation-bias", "anchoring-effect", "availability-heuristic", "conjunction-fallacy", "framing-effect", "mental-accounting", "hindsight-bias", "survivorship-bias", "barnum-effect"],
  },
  {
    id: "cognition-3", category: "cognition", title: "自我与归因", icon: "🪞",
    mnemonic: "看别人看性格，看自己看情境",
    slugs: ["dunning-kruger", "halo-effect", "fundamental-attribution-error", "cognitive-dissonance", "peter-principle", "kahneman-dual-system", "attraction-law"],
  },
  {
    id: "cognition-4", category: "cognition", title: "记忆与感知", icon: "👁️",
    mnemonic: "人记住的是峰值和结尾，不是平均",
    slugs: ["peak-end-rule", "primacy-recency", "zeigarnik-effect", "weber-fechner", "overview-effect"],
  },
  {
    id: "cognition-5", category: "cognition", title: "人与关系", icon: "🧩",
    mnemonic: "先分清是谁的课题，再谈改变",
    slugs: ["maslow-hierarchy", "johari-window", "course-separation", "fogg-behavior", "spiral-of-silence"],
  },

  // ===== 系统思维 system (18) =====
  {
    id: "system-1", category: "system", title: "循环与结构", icon: "🔁",
    mnemonic: "找到那根绕回来的线，才看懂系统",
    slugs: ["feedback-loop", "causal-loop", "stocks-and-flows", "delay-effect", "emergence"],
  },
  {
    id: "system-2", category: "system", title: "积累与演化", icon: "📈",
    mnemonic: "微小的差别，会被时间放大",
    slugs: ["compound-effect", "flywheel-effect", "path-dependence", "matthew-effect", "nonlinear-thinking"],
  },
  {
    id: "system-3", category: "system", title: "干预与杠杆", icon: "🎯",
    mnemonic: "别加力气，换个支点",
    slugs: ["leverage-point", "bottleneck-theory", "barrel-principle", "unintended-consequences"],
  },
  {
    id: "system-4", category: "system", title: "稳健与退化", icon: "🛡️",
    mnemonic: "留一分余量，换一次翻身",
    slugs: ["redundancy-backup", "resilience-thinking", "murphys-law", "entropy-thinking"],
  },

  // ===== 沟通表达 communication (17) =====
  {
    id: "communication-1", category: "communication", title: "结构化表达", icon: "🏗️",
    mnemonic: "先给结论，再给理由",
    slugs: ["pyramid-principle", "scqa-model", "mece-principle", "prep-method", "golden-circle", "7c-principle"],
  },
  {
    id: "communication-2", category: "communication", title: "说服与叙事", icon: "🎤",
    mnemonic: "三十秒说不清，是没想清",
    slugs: ["elevator-pitch", "story-spine", "rhetorical-triangle", "five-times-communication"],
  },
  {
    id: "communication-3", category: "communication", title: "反馈与冲突", icon: "🕊️",
    mnemonic: "只说录像里有的，不说脑子里猜的",
    slugs: ["ffc-praise", "sbi-feedback", "nonviolent-communication", "crucial-conversations", "four-sides-model"],
  },
  {
    id: "communication-4", category: "communication", title: "倾听与协作", icon: "🤝",
    mnemonic: "先让他敢说，再谈谁对",
    slugs: ["active-listening", "yes-and"],
  },

  // ===== 商业分析 business (23) =====
  {
    id: "business-1", category: "business", title: "战略与竞争", icon: "🧭",
    mnemonic: "先看环境，再看自己，最后选位置",
    slugs: ["swot-analysis", "porter-five-forces", "pest-analysis", "3c-model", "boston-matrix", "ansoff-matrix"],
  },
  {
    id: "business-2", category: "business", title: "商业模式与定位", icon: "🏰",
    mnemonic: "谁付钱，为什么愿意一直付",
    slugs: ["value-chain", "business-model-canvas", "moat-theory", "blue-ocean", "disruptive-innovation", "long-tail-effect"],
  },
  {
    id: "business-3", category: "business", title: "增长与规模", icon: "🚀",
    mnemonic: "一单不赚钱，规模只是放大窟窿",
    slugs: ["hook-model", "network-effect", "scale-effect", "unit-economics", "mvp", "product-market-fit"],
  },
  {
    id: "business-4", category: "business", title: "营销与用户", icon: "📣",
    mnemonic: "他雇这个产品，是来干哪件事的",
    slugs: ["stp-model", "sales-funnel", "aisas-model", "fab-method", "jobs-to-be-done"],
  },

  // ===== 学习成长 learning (18) =====
  {
    id: "learning-1", category: "learning", title: "记忆与巩固", icon: "🧠",
    mnemonic: "快忘的时候再见一面，记得最久",
    slugs: ["spaced-repetition", "active-recall", "forgetting-curve", "chunking", "dual-coding", "sqrrr-reading"],
  },
  {
    id: "learning-2", category: "learning", title: "练习与精进", icon: "🏋️",
    mnemonic: "不费力的不算练，够不到的也不算",
    slugs: ["deliberate-practice", "interleaving", "zone-of-proximal-development", "learning-curve", "flow-state"],
  },
  {
    id: "learning-3", category: "learning", title: "理解与内化", icon: "📚",
    mnemonic: "合上书能讲出来，才算真的学会",
    slugs: ["feynman-technique", "bloom-taxonomy", "kolb-cycle", "seci-model"],
  },
  {
    id: "learning-4", category: "learning", title: "心智与辅导", icon: "🌱",
    mnemonic: "还不会，只是还没学会",
    slugs: ["growth-mindset", "grow-model", "addie-model"],
  },

  // ===== 概率思维 probability (12) =====
  {
    id: "probability-1", category: "probability", title: "更新与推断", icon: "🔍",
    mnemonic: "先问本来多常见，再看新证据",
    slugs: ["bayesian-thinking", "conditional-probability", "base-rate-fallacy", "prospect-theory"],
  },
  {
    id: "probability-2", category: "probability", title: "大数与回归", icon: "🎲",
    mnemonic: "样本够大，运气才会退场",
    slugs: ["law-of-large-numbers", "regression-to-mean", "gamblers-fallacy"],
  },
  {
    id: "probability-3", category: "probability", title: "极端与不确定", icon: "🦢",
    mnemonic: "别猜它来不来，先保证来了还活着",
    slugs: ["black-swan", "fat-tail", "monte-carlo"],
  },
  {
    id: "probability-4", category: "probability", title: "下注与生存", icon: "⚖️",
    mnemonic: "赢面大不等于该全押",
    slugs: ["kelly-criterion", "ergodicity"],
  },

  // ===== 效率管理 efficiency (24) =====
  {
    id: "efficiency-1", category: "efficiency", title: "优先级与目标", icon: "🎯",
    mnemonic: "先决定不做什么，再决定做什么",
    slugs: ["pareto-principle", "eisenhower-matrix", "rice-method", "double-target-list", "smart-principle", "ogsm"],
  },
  {
    id: "efficiency-2", category: "efficiency", title: "时间与执行", icon: "⏰",
    mnemonic: "没进日历的事，多半不会发生",
    slugs: ["pomodoro", "time-blocking", "gtd", "two-minute-rule", "parkinsons-law", "five-w-one-h"],
  },
  {
    id: "efficiency-3", category: "efficiency", title: "专注与精力", icon: "🔋",
    mnemonic: "被切碎的一天，产不出完整的活",
    slugs: ["deep-work", "single-tasking", "batched-processing", "energy-management", "context-switching", "middle-state-relaxation"],
  },
  {
    id: "efficiency-4", category: "efficiency", title: "复盘与流程", icon: "🔄",
    mnemonic: "做过不算学过，转完一圈才算",
    slugs: ["pdca-cycle", "kiss-review", "grai-review", "woop-method", "kanban", "yerkes-dodson"],
  },

  // ===== 创新思维 innovation (17) =====
  {
    id: "innovation-1", category: "innovation", title: "发散与破框", icon: "🌠",
    mnemonic: "先写满三十个，再挑第一个",
    slugs: ["brainstorming", "divergent-thinking", "lateral-thinking", "six-thinking-hats", "bisociation", "reverse-thinking"],
  },
  {
    id: "innovation-2", category: "innovation", title: "检核与改造", icon: "🔧",
    mnemonic: "没灵感时，把七个动词问一遍",
    slugs: ["osborn-checklist", "scamper", "triz", "mandala-thinking", "constraint-driven-innovation"],
  },
  {
    id: "innovation-3", category: "innovation", title: "联想与迁移", icon: "🧬",
    mnemonic: "新的不是零件，是接法",
    slugs: ["analogy-thinking", "combinatorial-innovation", "biomimicry"],
  },
  {
    id: "innovation-4", category: "innovation", title: "验证与落地", icon: "🧪",
    mnemonic: "越早被打脸，越省钱",
    slugs: ["design-thinking", "rapid-prototyping", "issue-tree"],
  },

  // ===== 博弈思维 game (11) =====
  {
    id: "game-1", category: "game", title: "基本格局", icon: "♟️",
    mnemonic: "先看是不是零和，再谈怎么分",
    slugs: ["prisoners-dilemma", "zero-sum", "chicken-game", "tragedy-of-commons"],
  },
  {
    id: "game-2", category: "game", title: "均衡与推演", icon: "🌲",
    mnemonic: "先想他会怎么接，再决定第一步",
    slugs: ["nash-equilibrium", "game-tree"],
  },
  {
    id: "game-3", category: "game", title: "重复与合作", icon: "🤝",
    mnemonic: "先示好，被欺负就还手，改了就翻篇",
    slugs: ["tit-for-tat", "credible-commitment", "signaling"],
  },
  {
    id: "game-4", category: "game", title: "规则设计", icon: "⚙️",
    mnemonic: "别指望人变好，让规则把自利导向好结果",
    slugs: ["mechanism-design", "auction-theory"],
  },
];

export function getClustersByCategory(categoryId: string): ModelCluster[] {
  return modelClusters.filter((c) => c.category === categoryId);
}

export function getClusterCount(): number {
  return modelClusters.length;
}
