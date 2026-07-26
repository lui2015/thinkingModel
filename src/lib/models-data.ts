export interface ModelCase {
  title: string;
  content: string;
  type: "life" | "business" | "negative";
}

export interface UsageGuide {
  scenarios: string[];
  steps: string[];
  pitfalls: string[];
  combineWith: string[];
}

export interface MentalModel {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  tags: string[];
  difficulty: 1 | 2 | 3;
  icon: string;
  introduction: string;
  keyInsight: string;
  cases: ModelCase[];
  usage: UsageGuide;
  memorySentence: string;
  furtherReading: string[];
  relatedModels: string[];
  featured?: boolean;
  story?: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
  color: string;
}

export const categories: Category[] = [
  { id: "decision", name: "决策思维", icon: "🎯", description: "帮助做出更好的选择", color: "#6C5CE7" },
  { id: "cognition", name: "认知升级", icon: "🧠", description: "识别认知盲区，突破思维局限", color: "#E17055" },
  { id: "system", name: "系统思维", icon: "🔄", description: "理解复杂系统的运作规律", color: "#00B894" },
  { id: "communication", name: "沟通表达", icon: "💬", description: "提升沟通效率和说服力", color: "#0984E3" },
  { id: "business", name: "商业分析", icon: "📊", description: "商业环境分析和战略决策", color: "#FDCB6E" },
  { id: "learning", name: "学习成长", icon: "📚", description: "加速学习和个人成长", color: "#E84393" },
  { id: "probability", name: "概率思维", icon: "🎲", description: "在不确定性中做出理性判断", color: "#00CEC9" },
  { id: "efficiency", name: "效率管理", icon: "⚡", description: "提升时间和精力管理效率", color: "#F39C12" },
  { id: "innovation", name: "创新思维", icon: "💡", description: "激发创造力和创新方案", color: "#A29BFE" },
  { id: "game", name: "博弈思维", icon: "♟️", description: "理解竞争与合作的本质", color: "#636E72" },
];

export const models: MentalModel[] = [
  {
    id: "1",
    slug: "first-principles",
    title: "第一性原理",
    subtitle: "回归事物本质，从零开始推理",
    category: "cognition",
    tags: ["创新", "分析", "本质思考"],
    difficulty: 2,
    icon: "🔬",
    introduction: "第一性原理是一种把问题拆解到最基本的事实和真理，然后从头开始推理的思维方式。它来源于古希腊哲学家亚里士多德的思想，后被埃隆·马斯克广泛推广。与「类比思维」不同（别人怎么做我就怎么做），第一性原理要求你不依赖已有经验，而是追问：这件事最本质的规律是什么？基于这些规律，最优解应该是什么？",
    keyInsight: "大多数人用「类比」来思考问题——别人怎么做我就怎么做。但真正的突破来自于回到事物的「最小真实」，从物理定律、基本事实出发重新推理。这不是更难，而是让你看见别人看不见的解法。",
    cases: [
      { title: "🚀 马斯克造火箭", content: "当 SpaceX 刚成立时，火箭报价 6500 万美元。马斯克没有接受行业报价，而是问：「火箭由什么材料组成？这些材料在大宗商品市场值多少钱？」答案是只需 2% 的成本。于是他自己造火箭，将发射成本降低了 90%。", type: "business" },
      { title: "🍳 学做饭的思路", content: "你想做一道鱼香肉丝，类比思维是照着菜谱一步步做。但如果你理解第一性原理——鱼香味的本质是糖、醋、酱油、豆瓣酱的比例关系——你就可以灵活调整、创造新菜品，甚至做出鱼香茄子、鱼香豆腐。", type: "life" },
      { title: "❌ 教育中的盲目跟风", content: "「别人孩子都在报奥数班」——这就是典型的类比思维。如果用第一性原理思考：我的孩子的学习特点是什么？数学思维训练的本质需求是什么？可能答案是围棋或编程更适合。", type: "negative" },
    ],
    usage: {
      scenarios: ["面对高成本问题，想寻找突破性解法", "行业里「大家都这样做」时你想另辟蹊径", "需要创新解决一个看似无解的问题"],
      steps: ["明确你要解决的问题", "列出当前解决方案的所有「假设」", "质疑每一个假设：这是事实还是惯例？", "找到不可再分的「基本事实」", "基于基本事实重新构建解决方案"],
      pitfalls: ["不是所有问题都需要从零推理，简单问题用类比即可", "不要把「第一性原理」当成否定一切的借口", "需要足够的领域知识才能识别「基本事实」"],
      combineWith: ["反转思维", "类比思维", "费曼学习法"],
    },
    memorySentence: "别问别人怎么做，问这件事的本质是什么。",
    furtherReading: ["《埃隆·马斯克传》沃尔特·艾萨克森", "《穷查理宝典》查理·芒格", "Farnam Street: First Principles Thinking"],
    relatedModels: ["inversion", "analogy-thinking", "feynman-technique"],
    featured: true,
    updatedAt: "2026-04-22",
  },
  {
    id: "2",
    slug: "second-order-thinking",
    title: "第二序思维",
    subtitle: "别只看第一步，想想接下来会发生什么",
    category: "decision",
    tags: ["决策", "长期思维", "因果推理"],
    difficulty: 2,
    icon: "🔗",
    introduction: "第二序思维要求我们不仅考虑行动的直接结果（第一序），还要思考这些结果引发的后续连锁反应（第二序、第三序……）。这个概念由霍华德·马克斯在《投资最重要的事》中推广。大多数人只看到行动的直接效果就做出决策，而优秀的决策者会追问：「然后呢？」",
    keyInsight: "第一序思维者和第二序思维者的区别在于：前者看到的是表面答案，后者看到的是答案背后的答案。在投资、政策、人生选择中，第一步「看起来对的」往往在第二步「变成错的」。",
    cases: [
      { title: "🏙️ 城市交通规划", content: "修更多的路能缓解堵车吗？第一序想法是：当然能，路多了车分散了。但第二序结果是：更好的路况吸引更多人开车（诱发需求），最终堵得更厉害。这就是著名的「布雷斯悖论」。", type: "business" },
      { title: "🎓 跳槽涨薪的思考", content: "一个 offer 工资翻倍，直觉说「当然跳」。但第二序思考：新公司文化适应期？离家更远导致生活质量下降？原公司马上有晋升机会？有时候短期涨薪反而是长期损失。", type: "life" },
      { title: "❌ 补贴大战的陷阱", content: "互联网公司大量补贴获客，第一序结果：用户暴涨。第二序结果：补贴一停用户就走，烧光了钱还没建立真正的用户忠诚度。", type: "negative" },
    ],
    usage: {
      scenarios: ["做重大人生/职业决策时", "评估政策、策略的长期效果", "投资决策中评估风险"],
      steps: ["明确你的行动方案", "写下直接结果（第一序）", "对每个结果追问「然后呢？」（第二序）", "继续追问 2-3 层", "综合所有层级的影响做决策"],
      pitfalls: ["不要过度推演，3 层以上不确定性太大", "不要用二序思维为「不行动」找借口", "需要结合概率判断，不是所有连锁反应都会发生"],
      combineWith: ["反转思维", "概率思维", "10/10/10法则"],
    },
    memorySentence: "聪明人看到第一步就行动，智慧的人会问「然后呢？」",
    furtherReading: ["《投资最重要的事》霍华德·马克斯", "《系统之美》德内拉·梅多斯"],
    relatedModels: ["inversion", "compound-effect", "feedback-loop"],
    featured: true,
    updatedAt: "2026-04-22",
  },
  {
    id: "3",
    slug: "inversion",
    title: "反转思维",
    subtitle: "反过来想，总是反过来想",
    category: "decision",
    tags: ["决策", "逆向思维", "查理·芒格"],
    difficulty: 1,
    icon: "🔄",
    introduction: "反转思维来自数学家雅各比的名言「反转，总是反转」，后被查理·芒格推崇。核心方法是：与其想「如何成功」，不如先想「如何一定会失败」，然后避免这些失败因素。这是一种强大的排除法，帮你看到正向思维看不到的盲点。",
    keyInsight: "告诉我我会死在哪里，那我永远不去那个地方。避免愚蠢比追求聪明更可靠——因为犯错的方式有限，而成功的路径无限。",
    cases: [
      { title: "💰 投资中的应用", content: "巴菲特不问「怎样赚大钱」，而是问「怎样会亏光」——过度杠杆、追热点、不懂装懂。避免这些，长期就能跑赢大多数人。", type: "business" },
      { title: "❤️ 如何经营好关系", content: "与其想「如何让伴侣更爱我」，不如反转思考「什么行为一定会毁掉关系」——不尊重、不沟通、不信任。然后确保自己不做这些事。", type: "life" },
      { title: "❌ 只做正向规划的项目", content: "一个创业团队只想「如何让产品火爆」，却没想过「用户为什么会卸载」。结果产品上线后留存率极低——他们忽略了所有可能导致失败的因素。", type: "negative" },
    ],
    usage: {
      scenarios: ["制定计划和策略时进行风险预判", "面对复杂问题不知从何入手时", "想检验自己的方案是否靠谱"],
      steps: ["明确你的目标（如：项目成功）", "反转问题：「怎样做一定会失败？」", "列出所有导致失败的因素", "逐一审视：你是否正在做这些事？", "制定规避策略，消除这些风险因素"],
      pitfalls: ["反转思维不能替代正向思维，两者要结合", "不要陷入过度悲观", "适合战略层面，执行时仍需正向目标驱动"],
      combineWith: ["第二序思维", "预验死亡法", "检查清单"],
    },
    memorySentence: "告诉我我会死在哪里，那我永远不去那个地方。",
    furtherReading: ["《穷查理宝典》查理·芒格", "《反脆弱》纳西姆·塔勒布"],
    relatedModels: ["second-order-thinking", "first-principles", "pareto-principle"],
    featured: true,
    updatedAt: "2026-04-22",
  },
  {
    id: "4",
    slug: "compound-effect",
    title: "复利思维",
    subtitle: "微小的持续积累，产生惊人的结果",
    category: "system",
    tags: ["长期主义", "成长", "投资"],
    difficulty: 1,
    icon: "📈",
    introduction: "复利思维源自金融领域的复利公式，但它的应用远超金融范畴。核心理念是：微小的、持续的正向积累，经过时间的放大，最终会产生指数级的爆发式增长。爱因斯坦称复利为「世界第八大奇迹」。无论是知识、技能、人脉还是财富，持续投入 + 时间 = 巨大回报。",
    keyInsight: "人们总是高估一年的变化，低估十年的变化。每天进步 1%，一年后你将是现在的 37.78 倍（1.01^365）。但关键在于「持续」——中断的复利就是单利。",
    cases: [
      { title: "📖 每天阅读 30 分钟", content: "每天读 30 分钟听起来不多，但一年就是 180 小时，大约可以读完 30 本书。坚持 10 年就是 300 本书。这种知识积累会让你与同龄人拉开巨大差距。", type: "life" },
      { title: "🏢 亚马逊的飞轮效应", content: "贝索斯早期不追求利润，而是持续投资于用户体验→吸引更多用户→吸引更多卖家→更多商品→更好体验。这个飞轮转了 20 年，让亚马逊从一家小网店变成万亿市值的巨头。", type: "business" },
      { title: "❌ 频繁跳槽的代价", content: "每隔一两年换工作看似在「向上走」，但每次跳槽都要重新积累信任、人脉和行业深度。十年后可能发现：技能广但不精，人脉多但不深，缺少真正的核心竞争力。", type: "negative" },
    ],
    usage: {
      scenarios: ["个人技能提升和学习规划", "投资和理财决策", "企业长期战略制定", "习惯养成"],
      steps: ["选择一个值得长期投入的方向", "设定每日/每周的最小行动单元", "建立追踪系统记录你的投入", "保护你的「连续性」——不轻易中断", "定期复盘，享受指数增长的奖励"],
      pitfalls: ["复利需要时间，初期效果不明显，别半途而废", "方向错了，复利会放大错误", "不能只投入不复盘，要确保方向正确"],
      combineWith: ["飞轮效应", "帕累托法则", "刻意练习"],
    },
    memorySentence: "人总是高估一年的变化，低估十年的变化。",
    furtherReading: ["《复利效应》达伦·哈迪", "《长期主义》"],
    relatedModels: ["flywheel-effect", "pareto-principle", "deliberate-practice"],
    featured: true,
    updatedAt: "2026-04-22",
  },
  {
    id: "5",
    slug: "feynman-technique",
    title: "费曼学习法",
    subtitle: "如果你不能简单地解释它，你就没有真正理解它",
    category: "learning",
    tags: ["学习", "教学", "理解力"],
    difficulty: 1,
    icon: "🎓",
    introduction: "费曼学习法以诺贝尔物理学奖得主理查德·费曼命名。核心方法极其简单：学完一个概念后，尝试用最简单的语言把它教给一个完全不懂的人（比如一个 12 岁的孩子）。如果你讲不清楚，说明你还没真正理解。然后回到原材料重新学习，直到你能流畅地用简单语言表达。",
    keyInsight: "大多数人的「学会了」只是一种「熟悉感」的错觉。真正的理解是：你能用自己的话、用简单的比喻向任何人解释清楚。教是最好的学。",
    cases: [
      { title: "👶 给妈妈解释区块链", content: "你觉得自己懂区块链了？试着向你妈妈解释。如果你发现自己说不出「它到底解决了什么问题」，或者开始使用她听不懂的术语，那你可能只是记住了概念，并没有真正理解。", type: "life" },
      { title: "🏫 费曼的课堂", content: "费曼在加州理工的课被称为「最好懂的物理课」。他把量子力学用做菜、打台球的比喻来讲。这不是因为他降低了标准，而是因为他的理解已经深到可以随意切换表达方式。", type: "business" },
      { title: "❌ 死记硬背的陷阱", content: "很多学生可以完美地复述教科书上的定义，但面试时一问「请用你自己的话解释一下」就卡壳了。这就是「知道」和「理解」的差距。", type: "negative" },
    ],
    usage: {
      scenarios: ["学习新概念或新技能时", "准备教学、演讲、面试", "检验自己对某个领域的理解深度"],
      steps: ["选择一个要学习的概念", "在纸上用最简单的语言解释它（假设听众是12岁小孩）", "发现解释不清楚的地方→这就是你的知识缺口", "回到原材料重新学习这些缺口", "再次简化你的解释，使用比喻和类比"],
      pitfalls: ["不要满足于「说出来了」，要确保对方真能听懂", "这个方法需要诚实面对自己的无知", "不是所有概念都能极度简化，但可以尽量做到"],
      combineWith: ["第一性原理", "刻意练习", "能力圈"],
    },
    memorySentence: "如果你不能简单地解释它，你就没有真正理解它。",
    furtherReading: ["《别闹了，费曼先生》理查德·费曼", "《学习之道》芭芭拉·奥克利"],
    relatedModels: ["first-principles", "deliberate-practice", "circle-of-competence"],
    featured: true,
    updatedAt: "2026-04-22",
  },
  {
    id: "6",
    slug: "pareto-principle",
    title: "帕累托法则（80/20 法则）",
    subtitle: "80% 的结果来自 20% 的原因",
    category: "efficiency",
    tags: ["效率", "聚焦", "优先级"],
    difficulty: 1,
    icon: "📊",
    introduction: "帕累托法则由意大利经济学家维尔弗雷多·帕累托提出，最初观察到意大利 80% 的财富掌握在 20% 的人手中。后来人们发现这个比例几乎存在于一切领域：80% 的收入来自 20% 的客户，80% 的 bug 来自 20% 的代码，80% 的成果来自 20% 的努力。核心启示：识别并聚焦于那关键的 20%。",
    keyInsight: "不是所有事情都同等重要。大多数人把 80% 的时间花在低价值的事情上，以为忙碌就是高效。真正的高手会找到那 20% 的杠杆点，把有限的精力集中在那里。",
    cases: [
      { title: "💼 工作中的聚焦", content: "你每天处理 50 封邮件、参加 5 个会议、写 3 份报告。但让你升职的可能只是那一个核心项目的突出表现。识别它，把最好的时间和精力给它。", type: "life" },
      { title: "🛒 电商选品策略", content: "分析数据后发现，一家店铺 80% 的利润来自排名前 20% 的商品。把营销预算集中在这些爆款上，ROI 远高于平均撒网。", type: "business" },
      { title: "❌ 完美主义的陷阱", content: "一个设计师花了 80% 的时间在页面上 5% 用户才能注意到的细节上，而核心交互流程却做得马马虎虎。结果用户体验不佳，但那些精美细节无人在意。", type: "negative" },
    ],
    usage: {
      scenarios: ["时间管理和优先级排序", "资源分配决策", "业务优化和降本增效", "学习规划"],
      steps: ["列出你所有的任务/客户/产品", "分析每一项的产出/回报", "找出贡献 80% 成果的那 20%", "把最好的资源配置到这 20% 上", "对剩余 80% 的事项：简化、委派或淘汰"],
      pitfalls: ["80/20 不是精确数字，可能是 90/10 或 70/30", "不能完全忽略那 80%，有些是必要的基础工作", "需要持续更新分析，关键 20% 会随时间变化"],
      combineWith: ["艾森豪威尔矩阵", "复利思维", "能力圈"],
    },
    memorySentence: "找到那关键的 20%，你就找到了成功的杠杆。",
    furtherReading: ["《80/20法则》理查德·科赫", "《精要主义》格雷戈·麦吉沃恩"],
    relatedModels: ["eisenhower-matrix", "compound-effect", "circle-of-competence"],
    featured: true,
    updatedAt: "2026-04-22",
  },
  {
    id: "7",
    slug: "pyramid-principle",
    title: "金字塔原理",
    subtitle: "先说结论，再展开论据",
    category: "communication",
    tags: ["沟通", "写作", "表达", "麦肯锡"],
    difficulty: 2,
    icon: "🔺",
    introduction: "金字塔原理由麦肯锡的芭芭拉·明托提出。核心方法是：任何表达（写作、演讲、汇报）都应该先说结论，再分层展开论据，形成金字塔结构。顶部是核心观点，下面是支撑论据，每一层都遵循 MECE 原则（相互独立，完全穷尽）。这是全球顶级咨询公司的标准表达方法。",
    keyInsight: "读者/听众的注意力是有限的。如果你不在前 30 秒给出结论，对方就开始走神了。先给答案，再给原因——这不是偷懒，而是对他人时间的尊重，也是高效沟通的本质。",
    cases: [
      { title: "📧 工作邮件", content: "烂邮件：「关于上周三的会议内容，经过分析…（500字）…所以我建议推迟上线。」好邮件：「建议：推迟上线 2 周。原因：①发现关键 bug ②用户反馈需迭代 ③团队资源不足。」", type: "life" },
      { title: "🏢 麦肯锡汇报", content: "麦肯锡顾问向 CEO 汇报从来不说「我们做了很多分析…」，而是直接说「建议收购 A 公司，理由有三…」。30 秒内 CEO 就知道了结论，剩下时间讨论「为什么」。", type: "business" },
      { title: "❌ 又臭又长的述职", content: "有人年终述职讲了 40 分钟过程和辛苦，结论藏在最后 3 分钟。领导早已走神，印象只有「讲了很久但不知道重点」。", type: "negative" },
    ],
    usage: {
      scenarios: ["写报告、邮件、提案", "做演讲、述职、汇报", "向上管理、说服决策者", "任何需要清晰表达的场景"],
      steps: ["先明确你的核心结论/建议是什么", "找出 2-4 个支撑论据（遵循 MECE）", "每个论据再往下展开具体的事实/数据", "组织成金字塔结构：结论→论据→细节", "用这个结构来组织你的表达顺序"],
      pitfalls: ["不是所有场景都适合直接给结论（如坏消息需要铺垫）", "MECE 不是死规矩，实际中 80% 穷尽就够了", "不要只有结构没有内容，论据必须扎实"],
      combineWith: ["SCQA 模型", "费曼学习法", "MECE 原则"],
    },
    memorySentence: "先说结论，用 30 秒抓住对方注意力。",
    furtherReading: ["《金字塔原理》芭芭拉·明托", "《麦肯锡教我的写作武器》高杉尚孝"],
    relatedModels: ["scqa-model", "feynman-technique", "mece-principle"],
    featured: false,
    updatedAt: "2026-04-22",
  },
  {
    id: "8",
    slug: "circle-of-competence",
    title: "能力圈",
    subtitle: "知道自己不知道什么，比知道什么更重要",
    category: "cognition",
    tags: ["认知", "巴菲特", "投资", "自知之明"],
    difficulty: 1,
    icon: "⭕",
    introduction: "能力圈是沃伦·巴菲特和查理·芒格最推崇的概念之一。每个人都有一个「能力圈」——你真正了解和擅长的领域。成功的关键不在于扩大能力圈（虽然也很重要），而在于清楚地知道自己能力圈的边界在哪里，然后只在圈内行动。",
    keyInsight: "人最大的风险不是「不知道」，而是「不知道自己不知道」。当你在能力圈之外行动时，你以为自己在做决策，实际上只是在赌博。",
    cases: [
      { title: "💰 巴菲特不投科技股", content: "巴菲特多年来拒绝投资科技公司，错过了微软、亚马逊的早期。但他说「我不后悔，因为我不懂那些公司」。他在自己懂的保险、消费品领域获得了惊人回报，远比盲目追科技股安全。", type: "business" },
      { title: "🎸 业余爱好 vs 职业", content: "你喜欢弹吉他，朋友们都说你弹得好。但这不意味着你应该辞职去做音乐人。「朋友说好」和「能在行业竞争中胜出」是完全不同的能力圈。", type: "life" },
      { title: "❌ 跨界投资的代价", content: "一个成功的餐饮老板，觉得自己「有商业眼光」，拿赚来的钱去炒期货。结果亏掉了大部分积蓄——因为金融市场完全不在他的能力圈内。", type: "negative" },
    ],
    usage: {
      scenarios: ["做投资决策时", "职业规划和转型时", "评估新机会是否值得参与", "自我认知和定位"],
      steps: ["诚实地列出你真正精通的领域", "找到「你以为你懂但其实不太懂」的领域", "在能力圈内做决策，在圈外保持谨慎", "有意识地学习来扩展能力圈，但扩展需要时间", "遇到圈外的事，请教真正的专家"],
      pitfalls: ["能力圈不是借口——不能因此拒绝所有学习和尝试", "能力圈是动态的，持续学习可以扩展它", "注意「达克效应」：新手往往高估自己的能力圈"],
      combineWith: ["帕累托法则", "费曼学习法", "邓宁-克鲁格效应"],
    },
    memorySentence: "知道自己不知道什么，比知道什么更重要。",
    furtherReading: ["《巴菲特致股东的信》", "《穷查理宝典》查理·芒格"],
    relatedModels: ["dunning-kruger", "feynman-technique", "pareto-principle"],
    featured: false,
    updatedAt: "2026-04-22",
  },
  {
    id: "9",
    slug: "flywheel-effect",
    title: "飞轮效应",
    subtitle: "持续推动正反馈循环，让增长自我加速",
    category: "system",
    tags: ["系统", "增长", "商业", "正反馈"],
    difficulty: 2,
    icon: "🎡",
    introduction: "飞轮效应来自吉姆·柯林斯的《从优秀到卓越》。想象一个巨大的飞轮，开始推动它需要很大力气，转速很慢。但你持续推，它越转越快，最终动量大到不用怎么推它也能自己飞速旋转。企业增长的本质就是找到你的飞轮——一个自我强化的正反馈循环。",
    keyInsight: "没有单一的「决定性时刻」让飞轮突然飞转。成功是无数次小推动累积的结果。关键是找到正确的飞轮结构，然后持续、一致地推动每一个环节。",
    cases: [
      { title: "🛒 亚马逊飞轮", content: "低价→更多客户→更多卖家→更多商品→更好体验→更低成本→更低价格。贝索斯在一张餐巾纸上画出了这个飞轮，然后用 20 年持续推动它。", type: "business" },
      { title: "💪 健身飞轮", content: "坚持锻炼→身体变好→精力更充沛→工作效率提高→有更多时间锻炼→身体更好。一旦进入正循环，健身不再是「挤时间」，而是自然的生活方式。", type: "life" },
      { title: "❌ 飞轮断裂", content: "一家公司同时推动 5 个不同的「战略重点」，结果每个都用力不够，飞轮一个也没转起来。资源分散是飞轮最大的敌人。", type: "negative" },
    ],
    usage: {
      scenarios: ["企业增长战略设计", "个人成长系统搭建", "产品增长闭环设计"],
      steps: ["画出你的核心业务流程循环", "识别每个环节如何强化下一个环节", "找到启动飞轮最关键的第一个推力点", "集中资源持续推动，不要分散", "耐心等待飞轮达到临界点"],
      pitfalls: ["飞轮需要时间，不能期望立竿见影", "不是所有循环都是飞轮——必须是正反馈", "飞轮一旦停下来，再启动成本很高"],
      combineWith: ["复利思维", "反馈回路", "帕累托法则"],
    },
    memorySentence: "找到你的飞轮，然后持续推动每一圈。",
    furtherReading: ["《从优秀到卓越》吉姆·柯林斯", "《飞轮效应》吉姆·柯林斯"],
    relatedModels: ["compound-effect", "feedback-loop", "pareto-principle"],
    featured: false,
    updatedAt: "2026-04-22",
  },
  {
    id: "10",
    slug: "dunning-kruger",
    title: "邓宁-克鲁格效应",
    subtitle: "越无知的人越自信，越有知的人越谦虚",
    category: "cognition",
    tags: ["认知偏误", "心理学", "自我认知"],
    difficulty: 1,
    icon: "📉",
    introduction: "邓宁-克鲁格效应由心理学家大卫·邓宁和贾斯汀·克鲁格在 1999 年提出。研究发现一个反直觉的现象：在某个领域能力最差的人，往往对自己的能力最为自信（处于「愚昧之巅」）；而真正的专家反而充满不确定感（处于「绝望之谷」后爬上「开悟之坡」）。",
    keyInsight: "你对一个领域最自信的时候，往往是你最无知的时候——因为你还不知道自己不知道什么。当你开始觉得「越学越不懂」时，恭喜你，你正在真正进步。",
    cases: [
      { title: "💻 初学编程", content: "学了一周 Python 就觉得「编程也不过如此」，想去做 App。学了一年后发现光一个并发处理就能研究一辈子。这就是从「愚昧之巅」跌入「绝望之谷」的过程。", type: "life" },
      { title: "📈 股市新手", content: "2020 年牛市中大量新手入场，因为赚了钱就觉得自己「有天赋」。他们不知道的是：在牛市里赚钱不需要能力，只需要运气。当熊市来临时，才是检验真实水平的时候。", type: "business" },
      { title: "❌ 不听专家意见", content: "一个刚创业 3 个月的人，拒绝听有 20 年经验的行业顾问的建议，因为「我有新想法」。结果踩了所有前人踩过的坑。", type: "negative" },
    ],
    usage: {
      scenarios: ["自我能力评估时", "面对「太过自信」的人或团队时", "学习新领域的初期", "做重要决策前的自检"],
      steps: ["问自己：我在这个领域处于哪个阶段？", "如果你觉得「很简单」→警惕，可能在愚昧之巅", "如果你觉得「越学越难」→坚持，你在正确的路上", "寻找该领域真正的专家来校准你的认知", "保持谦虚和好奇心"],
      pitfalls: ["不能用这个效应来否定所有新手的观点", "真正的创新有时确实来自「外行」", "这个效应描述的是统计规律，不是绝对法则"],
      combineWith: ["能力圈", "费曼学习法", "确认偏误"],
    },
    memorySentence: "你最自信的时候，往往是你最无知的时候。",
    furtherReading: ["《思考，快与慢》丹尼尔·卡尼曼", "Dunning-Kruger 原始论文 (1999)"],
    relatedModels: ["circle-of-competence", "confirmation-bias", "feynman-technique"],
    featured: false,
    updatedAt: "2026-04-22",
  },
  {
    id: "11",
    slug: "eisenhower-matrix",
    title: "艾森豪威尔矩阵",
    subtitle: "重要的事情很少紧急，紧急的事情很少重要",
    category: "efficiency",
    tags: ["时间管理", "优先级", "效率"],
    difficulty: 1,
    icon: "📋",
    introduction: "艾森豪威尔矩阵以美国总统德怀特·艾森豪威尔命名，把所有任务按「重要性」和「紧急性」分为四个象限。核心洞察是：大多数人把时间花在「紧急但不重要」的事上（第三象限），而真正改变人生的是「重要但不紧急」的事（第二象限）——学习、健康、人际关系、战略规划。",
    keyInsight: "忙碌不等于高效。如果你一直在「救火」，说明你在第一象限（紧急且重要）和第三象限（紧急但不重要）之间来回跑。真正的高手花大量时间在第二象限：防患于未然，让紧急的事情越来越少。",
    cases: [
      { title: "📱 手机通知的陷阱", content: "微信消息（紧急但通常不重要）不断打断你写方案（重要但不紧急）。一天下来你回了 100 条消息，方案还没写完。解决方法：关闭通知，固定时间批量处理。", type: "life" },
      { title: "🏢 CEO 的时间分配", content: "优秀的 CEO 会把 70% 的时间花在第二象限：思考战略、培养人才、建立系统。而不是天天处理客户投诉、审批报销单。他们通过授权来减少进入第一和第三象限的事务。", type: "business" },
      { title: "❌ 永远在赶 DDL", content: "一个人从来不提前准备，所有事情都拖到截止日期前一天。结果每件事都变成了「紧急且重要」，天天加班但质量极差，还觉得自己很努力。", type: "negative" },
    ],
    usage: {
      scenarios: ["日常任务优先级排序", "工作效率提升", "减少「救火式」工作模式"],
      steps: ["列出你所有待办事项", "逐一标记：重要？紧急？", "分入四个象限", "第一象限（重要+紧急）：立即做", "第二象限（重要+不紧急）：安排时间，重点投入", "第三象限（不重要+紧急）：委派他人", "第四象限（不重要+不紧急）：删除或减少"],
      pitfalls: ["很多人分不清「紧急」和「重要」", "不能完全忽略第三象限，有些紧急事需要回应", "关键是提高第二象限的时间占比"],
      combineWith: ["帕累托法则", "PDCA 循环", "番茄工作法"],
    },
    memorySentence: "重要的事情很少紧急，紧急的事情很少重要。",
    furtherReading: ["《高效能人士的七个习惯》史蒂芬·柯维", "《搞定》大卫·艾伦"],
    relatedModels: ["pareto-principle", "pdca-cycle", "compound-effect"],
    featured: false,
    updatedAt: "2026-04-22",
  },
  {
    id: "12",
    slug: "swot-analysis",
    title: "SWOT 分析",
    subtitle: "从四个维度全面审视你的处境",
    category: "business",
    tags: ["战略", "分析", "规划"],
    difficulty: 1,
    icon: "🧩",
    introduction: "SWOT 分析是最经典的战略分析框架之一，从四个维度来评估一个项目、企业或个人的处境：Strengths（优势）、Weaknesses（劣势）、Opportunities（机会）、Threats（威胁）。前两个是内部因素，后两个是外部因素。简单但系统，几乎适用于所有需要做决策的场景。",
    keyInsight: "大多数人做决策只看「我想要什么」（机会），而忽略了「我有什么」（优势）和「什么会阻碍我」（劣势和威胁）。SWOT 的价值在于迫使你全面思考，避免盲目乐观或盲目悲观。",
    cases: [
      { title: "🎯 个人职业规划", content: "优势：技术扎实、沟通好；劣势：管理经验少；机会：公司要成立新团队；威胁：有更资深的候选人。这一分析让你清楚：争取前先补足管理经验的短板。", type: "life" },
      { title: "🏢 新产品决策", content: "某茶饮品牌评估是否进军咖啡赛道：S-品牌知名度高；W-没有咖啡供应链；O-咖啡市场增长快；T-星巴克、瑞幸强势。结论：先通过联名合作试水，而非直接开咖啡店。", type: "business" },
      { title: "❌ 只看机会不看威胁", content: "一家公司只因为「市场大」就冲进一个新赛道，没有评估自身劣势（缺乏行业经验）和威胁（巨头已经布局）。结果烧了大量资金，两年后退出。", type: "negative" },
    ],
    usage: {
      scenarios: ["企业战略规划", "个人职业规划", "新项目/产品评估", "竞争分析"],
      steps: ["画一个 2×2 的矩阵", "列出内部优势（S）", "列出内部劣势（W）", "列出外部机会（O）", "列出外部威胁（T）", "制定策略：用 S 抓 O，用 S 应对 T，改善 W 抓 O，规避 W 和 T 的交叉"],
      pitfalls: ["不要只列不分析，关键是交叉策略", "要诚实面对劣势和威胁", "定期更新，环境在变化"],
      combineWith: ["波特五力", "决策矩阵", "第二序思维"],
    },
    memorySentence: "知己知彼，全面审视，才能做出好决策。",
    furtherReading: ["《竞争战略》迈克尔·波特", "《好战略，坏战略》理查德·鲁梅尔特"],
    relatedModels: ["porter-five-forces", "second-order-thinking", "circle-of-competence"],
    featured: false,
    updatedAt: "2026-04-22",
  },
  {
    id: "13",
    slug: "confirmation-bias",
    title: "确认偏误",
    subtitle: "你只看到你想看到的",
    category: "cognition",
    tags: ["认知偏误", "心理学", "批判性思维"],
    difficulty: 1,
    icon: "🔍",
    introduction: "确认偏误是人类最普遍、最危险的认知偏误之一。它指的是：人们倾向于寻找、记住和相信那些支持自己已有观点的信息，同时忽略或贬低那些与自己观点相矛盾的信息。简单说：你戴着有色眼镜看世界，看到的都是你想看到的颜色。",
    keyInsight: "你的大脑不是「真相搜索器」，而是「观点确认器」。一旦你形成了某个观点，你的大脑会自动筛选信息来「证明你是对的」。这不是意志力的问题，而是大脑的出厂设置。",
    cases: [
      { title: "📱 买手机的决定", content: "你已经决定买 iPhone，然后去搜索评测。你会不自觉地多看好评、跳过差评，看完后更加坚定「买得对」。如果你决定买安卓，同样的评测你会关注完全不同的部分。", type: "life" },
      { title: "📉 投资中的固执", content: "你买了一只股票后，开始只关注利好消息，忽略利空消息。即使基本面已经恶化，你也找各种理由说服自己「只是暂时的」。这就是确认偏误在投资中造成巨大亏损的原因。", type: "business" },
      { title: "❌ 团队决策的盲区", content: "一个团队已经倾向于做 A 方案，开会讨论时所有人都在补充 A 方案的优点。提出反对意见的人被视为「不合作」。结果 A 方案上线后暴露出明显的问题——那些反对意见其实是对的。", type: "negative" },
    ],
    usage: {
      scenarios: ["做重要决策前", "评估信息的可靠性", "团队讨论避免群体思维", "投资和商业判断"],
      steps: ["意识到你已经有一个「偏好答案」", "主动搜索反面证据", "找一个持反对意见的人进行辩论", "问自己：如果我错了，代价是什么？", "用「红队/蓝队」方法让团队辩论正反方"],
      pitfalls: ["知道确认偏误不等于能避免它——它是无意识的", "不要矫枉过正变成「什么都不信」", "对重大决策建立制度化的反对流程"],
      combineWith: ["反转思维", "邓宁-克鲁格效应", "贝叶斯思维"],
    },
    memorySentence: "主动寻找证明你错了的证据，是对抗偏见的最好方式。",
    furtherReading: ["《思考，快与慢》丹尼尔·卡尼曼", "《超级预测》菲利普·泰洛克"],
    relatedModels: ["inversion", "dunning-kruger", "bayesian-thinking"],
    featured: false,
    updatedAt: "2026-04-22",
  },
  {
    id: "14",
    slug: "feedback-loop",
    title: "反馈回路",
    subtitle: "行为产生结果，结果影响行为",
    category: "system",
    tags: ["系统", "循环", "自我强化"],
    difficulty: 2,
    icon: "♻️",
    introduction: "反馈回路是系统思维的核心概念。一个系统的输出会回过来影响它的输入，形成循环。正反馈回路（增强回路）让系统不断加速——越多→更多；负反馈回路（平衡回路）让系统保持稳定——偏离→纠正。理解反馈回路是理解世界运作方式的基础。",
    keyInsight: "大多数人看问题是线性的（A→B→C），但现实世界是循环的（A→B→C→A）。看不到回路，你就无法理解为什么有些趋势会加速，有些会自我修正。",
    cases: [
      { title: "📱 社交媒体上瘾", content: "发帖→获得点赞→多巴胺分泌→更想发帖→获得更多点赞。这是一个经过精心设计的正反馈回路，让你越来越难以放下手机。", type: "life" },
      { title: "🏦 银行挤兑", content: "有人担心银行破产→取钱→其他人看到排队也去取→银行现金不足→真的可能破产→更多人恐慌取钱。一个自我实现的正反馈回路。", type: "business" },
      { title: "❌ 恶性循环", content: "工作压力大→失眠→第二天效率低→积压更多工作→压力更大→更严重的失眠。如果你不打破这个负向正反馈回路，它会持续恶化。", type: "negative" },
    ],
    usage: {
      scenarios: ["分析系统为什么在加速变化", "找到问题的根本原因而非表面症状", "设计产品增长机制", "理解社会现象和经济规律"],
      steps: ["画出系统中各要素之间的因果关系", "标记每个连接是正向（同向变化）还是负向（反向变化）", "找到闭环——这就是反馈回路", "正反馈回路：找到启动点或打破点", "负反馈回路：理解系统的自稳定机制"],
      pitfalls: ["现实中回路往往有延迟，别因为没有立即看到效果就否定", "一个系统可能有多个回路在同时运作", "正反馈不一定是好的（恶性循环也是正反馈）"],
      combineWith: ["飞轮效应", "复利思维", "第二序思维"],
    },
    memorySentence: "找到回路，你就找到了系统行为的密码。",
    furtherReading: ["《系统之美》德内拉·梅多斯", "《第五项修炼》彼得·圣吉"],
    relatedModels: ["flywheel-effect", "compound-effect", "second-order-thinking"],
    featured: false,
    updatedAt: "2026-04-22",
  },
  {
    id: "15",
    slug: "bayesian-thinking",
    title: "贝叶斯思维",
    subtitle: "用新证据不断更新你的判断",
    category: "probability",
    tags: ["概率", "决策", "理性"],
    difficulty: 3,
    icon: "📐",
    introduction: "贝叶斯思维源自 18 世纪数学家托马斯·贝叶斯的概率定理。核心思想是：不要把判断看成「对或错」，而是看成一个概率值，然后随着新证据的出现不断更新这个概率。你先有一个「先验概率」（基于已知信息的初始判断），遇到新信息后更新为「后验概率」。这是科学思维的本质。",
    keyInsight: "世界不是非黑即白的，所有判断都是概率。聪明人和愚蠢人的区别不在于初始判断是否正确，而在于面对新证据时，是否愿意更新自己的观点。",
    cases: [
      { title: "🏥 医学诊断", content: "一项检测准确率 99%，你检测呈阳性。你得病的概率是 99% 吗？不一定。如果这种病只有万分之一的人得，即使检测阳性，你实际得病的概率也只有约 1%。这就是贝叶斯定理的威力——先验概率很重要。", type: "life" },
      { title: "🏢 招聘决策", content: "面试表现好（新证据）应该提高录用概率。但如果这个岗位的基础成功率只有 10%（先验），一次好面试可能只把概率提到 30%——还远不够做决策。所以优秀的公司会做多轮面试，不断更新概率。", type: "business" },
      { title: "❌ 忽视基础概率", content: "朋友创业成功了，你觉得「创业很容易」。但你忽略了先验概率：90% 的创业公司会失败。一个成功案例不能大幅改变整体成功率的估计。", type: "negative" },
    ],
    usage: {
      scenarios: ["在不确定性中做决策", "评估信息的可靠性", "诊断问题原因", "预测事件结果"],
      steps: ["确定你的先验概率（基于已知信息的初始判断）", "获取新证据", "评估这个证据的强度和可靠性", "用新证据更新你的概率判断", "重复以上过程，让判断越来越接近真实"],
      pitfalls: ["人类天生不擅长直觉地处理概率", "注意基础概率，不要被单一证据带偏", "证据的质量比数量更重要"],
      combineWith: ["确认偏误", "概率思维", "反转思维"],
    },
    memorySentence: "所有判断都是概率，面对新证据，随时准备更新。",
    furtherReading: ["《信号与噪声》纳特·西尔弗", "《超级预测》菲利普·泰洛克"],
    relatedModels: ["confirmation-bias", "dunning-kruger", "inversion"],
    featured: false,
    updatedAt: "2026-04-22",
  },
  {
    id: "16",
    slug: "scqa-model",
    title: "SCQA 模型",
    subtitle: "用故事结构让你的表达更有说服力",
    category: "communication",
    tags: ["沟通", "写作", "说服力"],
    difficulty: 1,
    icon: "📝",
    introduction: "SCQA 是一种表达框架：Situation（背景）→ Complication（冲突）→ Question（问题）→ Answer（答案）。它本质上是用一个迷你故事来包装你的观点。人类天生爱听故事，SCQA 让你的表达从「枯燥的汇报」变成「引人入胜的叙事」，大幅提升说服力。",
    keyInsight: "人类的大脑不是为了处理「清单式信息」而进化的，而是为了处理「故事」。当你用 SCQA 结构表达时，听众会自然地跟着你的思路走——因为他们想知道答案。",
    cases: [
      { title: "📊 项目提案", content: "S：我们的 App 月活已达 100 万。C：但用户 7 日留存率从 40% 降到了 25%。Q：如何在 3 个月内将留存率恢复到 40%？A：建议从三个方向入手——推送优化、新手引导改版、会员体系上线。", type: "business" },
      { title: "💬 说服父母", content: "S：我大学学的是金融，毕业后进了银行。C：但我发现自己对编程特别有热情，而银行的工作让我越来越不开心。Q：我该不该转行做程序员？A：我已经自学了半年，拿到了一个实习 offer，薪资持平。", type: "life" },
      { title: "❌ 没有铺垫的建议", content: "直接说「建议公司裁掉 A 产品线」会让所有人抵触。但如果用 SCQA：A 产品线连续 3 年亏损→市场份额在萎缩→我们是否应该继续投入？→建议将资源转移到增长更快的 B 产品线。逻辑一样，但接受度完全不同。", type: "negative" },
    ],
    usage: {
      scenarios: ["写报告、提案、演讲", "向领导汇报工作", "说服他人接受你的建议", "公众号/自媒体文章写作"],
      steps: ["S - 描述大家都认同的背景/现状", "C - 指出问题、冲突或变化", "Q - 自然引出核心问题", "A - 给出你的答案/建议/方案"],
      pitfalls: ["不要在 S 和 C 上花太多篇幅", "A 才是重点，前面是铺垫", "确保 S→C→Q 的逻辑自然流畅"],
      combineWith: ["金字塔原理", "故事思维", "费曼学习法"],
    },
    memorySentence: "先讲故事、再给答案——说服力翻倍。",
    furtherReading: ["《金字塔原理》芭芭拉·明托", "《故事经济学》罗伯特·麦基"],
    relatedModels: ["pyramid-principle", "feynman-technique"],
    featured: false,
    updatedAt: "2026-04-22",
  },
  {
    id: "17",
    slug: "deliberate-practice",
    title: "刻意练习",
    subtitle: "不是练习一万小时，而是刻意地练一万小时",
    category: "learning",
    tags: ["学习", "技能", "练习", "成长"],
    difficulty: 2,
    icon: "🏋️",
    introduction: "刻意练习由心理学家安德斯·埃里克森提出，颠覆了「一万小时定律」的简单理解。不是任何练习重复一万小时就能成为专家——关键在于「刻意」。刻意练习要求：专注于弱点、设定略超当前水平的目标、有即时反馈、不断调整。舒适区里的重复不是练习，只是惯性。",
    keyInsight: "大多数人在「舒适区」里重复同样的动作，称之为「经验」。但 20 年的经验可能只是 1 年的经验重复了 20 次。真正的进步发生在你刻意挑战弱点的时候——那不舒服的感觉就是你在成长。",
    cases: [
      { title: "🎹 钢琴练习", content: "普通人练琴：从头弹到尾，遇到难的段落就跳过。刻意练习者：找到最难的 8 小节，用一半的时间反复攻克它。前者练 3 小时效果不如后者练 1 小时。", type: "life" },
      { title: "⚽ 足球运动员", content: "C 罗不是只靠天赋。他每天训练结束后额外练习 100 个任意球，每次记录角度、力度、成功率，不断调整。这种有目标、有反馈的训练让他的任意球成功率远超常人。", type: "business" },
      { title: "❌ 低效的重复", content: "一个人每天写日记写了 10 年，但文笔并没有提高——因为他只是在重复同样的表达习惯，从没尝试新的写作技巧、从没寻求反馈。这不是刻意练习。", type: "negative" },
    ],
    usage: {
      scenarios: ["学习任何新技能", "提升已有技能到更高水平", "教练和培训设计", "个人成长规划"],
      steps: ["识别你当前的弱点和瓶颈", "设定一个略高于当前水平的具体目标", "设计针对性的练习任务", "练习时保持高度专注", "获取即时反馈（教练、录像、数据）", "根据反馈调整并重复"],
      pitfalls: ["刻意练习很消耗心智能量，不能全天候进行", "需要找到有效的反馈来源", "不要在错误的方法上刻意练习"],
      combineWith: ["费曼学习法", "反馈回路", "复利思维"],
    },
    memorySentence: "在不舒服的地方持续发力，那才是真正的练习。",
    furtherReading: ["《刻意练习》安德斯·埃里克森", "《异类》马尔科姆·格拉德威尔"],
    relatedModels: ["feynman-technique", "feedback-loop", "compound-effect"],
    featured: false,
    updatedAt: "2026-04-22",
  },
  {
    id: "18",
    slug: "ten-ten-ten-rule",
    title: "10/10/10 法则",
    subtitle: "用三个时间尺度检验你的决策",
    category: "decision",
    tags: ["决策", "情绪管理", "长期思维"],
    difficulty: 1,
    icon: "⏰",
    introduction: "10/10/10 法则由专栏作家苏茜·韦尔奇提出。当你面对一个纠结的决定时，问自己三个问题：这个决定在 10 分钟后我会怎么想？10 个月后呢？10 年后呢？这个简单的框架帮你跳出当下的情绪波动，从不同的时间尺度来评估决策。",
    keyInsight: "我们大多数的纠结和后悔，都源于被短期情绪绑架。10/10/10 法则强迫你拉开时间距离来看问题，往往会发现：当下觉得天大的事，10 年后看根本不值一提。",
    cases: [
      { title: "😤 和同事的冲突", content: "你很想当场怒怼回去。10 分钟后：爽了但可能后悔。10 个月后：可能影响了升职。10 年后：完全不记得这件事了。结论：冷静处理，不值得为一时之气付出长期代价。", type: "life" },
      { title: "💼 是否接受降薪 offer", content: "一个创业公司给你 offer，工资降 30%。10 分钟：心疼钱。10 个月：可能已经适应并获得了更多成长。10 年：这段创业经历可能成为你简历上最亮的一笔。", type: "business" },
      { title: "❌ 冲动消费", content: "看到一个限量版包包，觉得「现在不买就没了」。10 分钟后：兴奋。10 个月后：可能已经不背了。10 年后：完全想不起来这个包。冲动消费往往经不起 10/10/10 的检验。", type: "negative" },
    ],
    usage: {
      scenarios: ["面对冲动决策时", "处于强烈情绪中需要冷静时", "人生重大选择的决策辅助", "消费决策"],
      steps: ["明确你正在纠结的决定", "问：10 分钟后我会怎么想？", "问：10 个月后这个决定的影响是什么？", "问：10 年后我会怎么看这个决定？", "综合三个时间尺度来做最终决定"],
      pitfalls: ["不是所有决定都需要 10 年视角", "有些决定确实是「当下最重要」，不能都延迟", "这个方法更适合情绪化决策，理性决策用其他工具"],
      combineWith: ["第二序思维", "反转思维", "艾森豪威尔矩阵"],
    },
    memorySentence: "10 分钟、10 个月、10 年后，你会怎么看这个决定？",
    furtherReading: ["《10-10-10》苏茜·韦尔奇"],
    relatedModels: ["second-order-thinking", "inversion", "eisenhower-matrix"],
    featured: false,
    updatedAt: "2026-04-22",
  },
  {
    id: "19",
    slug: "analogy-thinking",
    title: "类比思维",
    subtitle: "用已知理解未知，跨领域迁移经验",
    category: "innovation",
    tags: ["创新", "跨领域", "类比"],
    difficulty: 2,
    icon: "🔀",
    introduction: "类比思维是人类最基本、最强大的认知工具之一。它的核心是：用一个你熟悉的领域的知识结构，来理解或解决另一个不熟悉领域的问题。进化让我们的大脑擅长发现「结构相似性」——这让我们能用已有知识快速理解新事物。几乎所有重大创新都来自跨领域的类比。",
    keyInsight: "创新很少来自「无中生有」，大多数来自「旧元素的新组合」。类比思维的能力取决于你的知识面宽度——你懂的领域越多，能做的类比越多，创新能力越强。这就是查理·芒格推崇「多元思维模型」的原因。",
    cases: [
      { title: "✈️ 飞机的发明", content: "莱特兄弟观察鸟的飞行（自然界）来设计飞机的机翼（工程）。他们注意到鸟在转弯时扭动翅膀，由此发明了「机翼翘曲」技术——这是航空史上最关键的突破之一。", type: "business" },
      { title: "🎯 解释复杂概念", content: "「计算机的内存就像你的书桌——放着你正在用的东西；硬盘就像你的柜子——存着不常用但需要保留的东西。」用日常场景类比计算机概念，任何人都能秒懂。", type: "life" },
      { title: "❌ 错误的类比", content: "「公司就像一个家庭」——这个类比让很多老板要求员工「像家人一样奉献」，但公司不会像家人一样无条件包容你。错误的类比会误导决策。", type: "negative" },
    ],
    usage: {
      scenarios: ["需要创新解决方案时", "解释复杂概念给非专业人士", "跨领域学习和知识迁移", "头脑风暴和创意发散"],
      steps: ["明确你面对的问题的核心结构", "在其他领域寻找结构相似的情景", "提取类比领域的解决方案或原则", "将其迁移到当前问题中", "验证类比是否成立——哪些地方类比不适用？"],
      pitfalls: ["类比不是等同——每个类比都有局限性", "表面相似不等于结构相似", "需要验证类比的边界在哪里"],
      combineWith: ["第一性原理", "TRIZ", "费曼学习法"],
    },
    memorySentence: "创新 = 旧元素的新组合，类比是发现组合的钥匙。",
    furtherReading: ["《表象与本质》侯世达/桑德尔", "《穷查理宝典》查理·芒格"],
    relatedModels: ["first-principles", "feynman-technique"],
    featured: false,
    updatedAt: "2026-04-22",
  },
  {
    id: "20",
    slug: "prisoners-dilemma",
    title: "囚徒困境",
    subtitle: "个体理性选择为何导致集体最差结果",
    category: "game",
    tags: ["博弈论", "合作", "竞争"],
    difficulty: 2,
    icon: "⚖️",
    introduction: "囚徒困境是博弈论中最经典的模型。两个嫌犯被分别审讯，每人有两个选择：合作（不招供）或背叛（招供）。如果都合作，各判 1 年；如果一人背叛、一人合作，背叛者释放、合作者判 10 年；如果都背叛，各判 5 年。从个人理性出发，每个人的最优选择都是背叛——但结果是集体最差（各 5 年）。",
    keyInsight: "在一次性博弈中，理性人倾向于自私；但在重复博弈中，合作才是最优策略。这就是为什么长期关系中信任和合作如此重要——你们会「再次见面」。",
    cases: [
      { title: "🏪 价格战", content: "两家奶茶店在同一条街上。如果都维持原价，各赚 100 万；如果一家降价另一家不降，降价方赚 150 万、不降方赚 30 万；如果都降价，各赚 50 万。结果两家都降价，陷入囚徒困境。", type: "business" },
      { title: "🤝 室友做家务", content: "两个室友都不想做家务（背叛获益），结果家里越来越脏（双方都背叛的结果）。如果建立轮值制度（合作机制），双方都能享受干净的环境。", type: "life" },
      { title: "❌ 军备竞赛", content: "两个国家都觉得「对方可能攻击我，我必须先武装」。结果双方花了巨额军费，安全感却没有增加——因为双方都在武装。这是国际关系中最经典的囚徒困境。", type: "negative" },
    ],
    usage: {
      scenarios: ["分析竞争对手可能的行为", "设计激励机制促进合作", "理解为什么好的合作会崩溃", "谈判策略制定"],
      steps: ["识别博弈中的参与者", "列出每方的可选策略", "分析不同策略组合下各方的收益", "判断这是一次性博弈还是重复博弈", "重复博弈中：建立信任机制、增加沟通、明确规则"],
      pitfalls: ["现实比理论模型复杂，不是所有冲突都是囚徒困境", "重复博弈中「以牙还牙」策略被证明最有效", "关键是改变博弈结构，而不是期望人性改变"],
      combineWith: ["博弈思维", "反馈回路", "第二序思维"],
    },
    memorySentence: "短期自私是理性的，长期合作是智慧的。",
    furtherReading: ["《博弈论与经济行为》冯·诺依曼", "《合作的进化》罗伯特·阿克塞尔罗德"],
    relatedModels: ["feedback-loop", "second-order-thinking", "inversion"],
    featured: false,
    updatedAt: "2026-04-22",
  },
];

// Import and merge extended models
import { extendedModels } from "./models-extended-1";
import { extendedModels2 } from "./models-extended-2";
import { extendedModels3 } from "./models-extended-3";
import { extendedModels4 } from "./models-extended-4";

models.push(...extendedModels, ...extendedModels2, ...extendedModels3, ...extendedModels4);

export function getModelBySlug(slug: string): MentalModel | undefined {
  return models.find((m) => m.slug === slug);
}

export function getModelsByCategory(categoryId: string): MentalModel[] {
  return models.filter((m) => m.category === categoryId);
}

export function getFeaturedModels(): MentalModel[] {
  return models.filter((m) => m.featured);
}

export function getCategoryById(id: string): Category | undefined {
  return categories.find((c) => c.id === id);
}

export function getRelatedModels(slugs: string[]): MentalModel[] {
  return models.filter((m) => slugs.includes(m.slug));
}

export function getDailyModel(): MentalModel {
  const today = new Date();
  const dayOfYear = Math.floor(
    (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000
  );
  return models[dayOfYear % models.length];
}

export function getLatestModels(count: number = 6): MentalModel[] {
  return [...models]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, count);
}

export const difficultyLabels: Record<number, string> = {
  1: "入门",
  2: "进阶",
  3: "高级",
};

export const difficultyStars: Record<number, string> = {
  1: "⭐",
  2: "⭐⭐",
  3: "⭐⭐⭐",
};
