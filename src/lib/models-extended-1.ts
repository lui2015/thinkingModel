import type { MentalModel } from "./models-data";

export const extendedModels: MentalModel[] = [
  {
    id: "21", slug: "conjunction-fallacy", title: "合取谬误", subtitle: "越具体的描述越觉得可信，但概率越低",
    category: "cognition", tags: ["认知偏误", "概率", "心理学"], difficulty: 2, icon: "🎭",
    introduction: "合取谬误是指人们错误地认为两个事件同时发生的概率高于其中单个事件发生的概率。经典案例是「琳达问题」：琳达是银行柜员的概率 vs 琳达是关注女权的银行柜员的概率——后者描述更生动，但概率必然更低。我们的大脑被「故事感」欺骗了。",
    keyInsight: "人脑不擅长处理概率，却擅长处理故事。越生动、越具体的描述越让人觉得「合理」，但在概率上恰恰相反——条件越多，概率越小。",
    cases: [
      { title: "📰 新闻标题的误导", content: "「某地发生地震并引发海啸」听起来比「某地发生地震」更可信，但前者概率必然低于后者。媒体用细节让事件显得更真实。", type: "life" },
      { title: "📊 商业计划的陷阱", content: "「我们做一个面向 Z 世代的环保主题社交电商平台」听起来比「我们做一个电商平台」更让投资人心动，但成功概率更低——因为限定条件更多了。", type: "business" },
      { title: "❌ 琳达问题", content: "实验中 85% 的受试者认为「琳达是关注女权运动的银行柜员」比「琳达是银行柜员」更可能——这在逻辑上是不可能的。", type: "negative" }
    ],
    usage: { scenarios: ["评估方案可行性时", "听到过于具体的预测时", "做概率判断时"], steps: ["识别描述中的限定条件数量", "记住：条件越多，概率越小", "去掉修饰词，评估基础概率", "用数据而非故事来判断"], pitfalls: ["不是说具体描述都是错的，而是不能因为具体就觉得概率更高", "商业场景中仍需要具体定位，但要区分「定位」和「概率评估」"], combineWith: ["贝叶斯思维", "确认偏误", "框架效应"] },
    memorySentence: "故事越生动，你越要警惕——概率可能越低。",
    furtherReading: ["《思考，快与慢》丹尼尔·卡尼曼"], relatedModels: ["bayesian-thinking", "confirmation-bias", "framing-effect"], updatedAt: "2026-04-22",
  },
  {
    id: "22", slug: "middle-state-relaxation", title: "中间态放松", subtitle: "在压力和放松之间找到最佳状态",
    category: "efficiency", tags: ["心理", "状态管理", "效率"], difficulty: 2, icon: "🧘",
    introduction: "中间态放松是指在高度紧张和完全放松之间找到一个最佳的心理状态。不是最紧张的时候效率最高，也不是最放松的时候最有创意，而是在两者之间的某个「甜蜜点」。这与耶克斯-多德森定律相呼应——适度的压力才能产生最佳表现。",
    keyInsight: "顶尖运动员在比赛前既不是极度紧张也不是完全放松，而是处于一种「警觉而平静」的中间状态。这个状态可以通过训练来掌握。",
    cases: [
      { title: "🎤 演讲前的状态", content: "完全不紧张的人演讲平淡无奇；过度紧张的人语无伦次。最好的状态是「有点兴奋但掌控自如」——这就是中间态。", type: "life" },
      { title: "⚽ 运动员的巅峰状态", content: "科比说过他在关键时刻反而更冷静——不是没有压力感，而是把紧张转化为专注。这就是中间态放松的实践。", type: "business" },
      { title: "❌ 考前过度放松", content: "有些学生考前告诉自己「完全别紧张」，结果上考场时没有进入状态，反应迟钝。适度的紧张感是必要的。", type: "negative" }
    ],
    usage: { scenarios: ["重要场合前的状态调节", "高压工作中保持效率", "运动和竞技表现"], steps: ["觉察当前状态：是太紧张还是太松弛？", "太紧张→做 3 次深呼吸，告诉自己「我准备好了」", "太放松→给自己设定挑战目标，提升紧迫感", "找到那个「专注而不焦虑」的甜蜜点"], pitfalls: ["每个人的最佳中间态不同，需要自己摸索", "不同任务需要不同的紧张度"], combineWith: ["耶克斯-多德森定律", "心流与次心流", "刻意练习"] },
    memorySentence: "最佳状态不是无压力，而是压力刚刚好。",
    furtherReading: ["《心流》米哈里·契克森米哈赖"], relatedModels: ["yerkes-dodson", "flow-state", "deliberate-practice"], updatedAt: "2026-04-22",
  },
  {
    id: "23", slug: "sales-funnel", title: "销售漏斗", subtitle: "从大量潜在客户到最终成交的层层筛选",
    category: "business", tags: ["营销", "销售", "转化"], difficulty: 1, icon: "🔻",
    introduction: "销售漏斗描述了客户从第一次接触到最终购买的全过程：认知→兴趣→评估→决策→购买。每一层都会流失一部分人，像漏斗一样越来越窄。理解漏斗可以帮你找到流失最严重的环节，针对性优化。",
    keyInsight: "不要只盯着最终成交，要关注漏斗的每一层。流失率最高的那一层，就是你最大的增长杠杆。",
    cases: [
      { title: "🛒 电商转化", content: "100 人看到广告→30 人点击→10 人加购→3 人付款。如果把加购到付款的转化率从 30% 提到 50%，就多了 2 单。", type: "business" },
      { title: "💼 求职漏斗", content: "投 50 份简历→10 个回复→5 个面试→2 个 offer→1 个入职。如果简历回复率太低，说明简历需要优化。", type: "life" },
      { title: "❌ 只投广告不优化", content: "一家公司拼命花钱打广告引流，但落地页体验很差，90% 的人一进来就走了。漏斗顶端再宽，底部漏光也没用。", type: "negative" }
    ],
    usage: { scenarios: ["优化销售/营销流程", "分析用户转化路径", "找到业务增长瓶颈"], steps: ["画出你的完整漏斗阶段", "统计每一层的转化率", "找到流失率最高的环节", "针对该环节设计优化方案", "A/B 测试验证效果"], pitfalls: ["不要只看最终转化率，要看每一层", "不同渠道的漏斗形态不同", "有时候问题不在漏斗本身，而在流量质量"], combineWith: ["AISAS模型", "帕累托法则", "MVP最小可行产品"] },
    memorySentence: "找到漏斗最窄的地方，那就是你最大的机会。",
    furtherReading: ["《增长黑客》肖恩·埃利斯"], relatedModels: ["aisas-model", "pareto-principle", "mvp"], updatedAt: "2026-04-22",
  },
  {
    id: "24", slug: "maslow-hierarchy", title: "马斯洛需求层次", subtitle: "人的需求从生存到自我实现分五个层级",
    category: "cognition", tags: ["心理学", "需求", "动机"], difficulty: 1, icon: "🔺",
    introduction: "马斯洛需求层次理论将人类需求分为五层金字塔：生理需求→安全需求→社交需求→尊重需求→自我实现。低层需求满足后，人们才会追求更高层的需求。理解这个模型能帮你洞察人们行为背后的真正动机。",
    keyInsight: "不要跟一个还在为温饱发愁的人谈理想——他需要的是面包。理解对方处于哪个需求层级，才能给出有效的激励。",
    cases: [
      { title: "💰 员工激励", content: "给基层员工加薪（满足安全需求）比给他「年度优秀」称号更有效。但对高薪的管理者，认可和成就感可能比加薪更有驱动力。", type: "business" },
      { title: "📱 产品设计", content: "社交产品满足社交需求，奢侈品满足尊重需求，教育产品满足自我实现需求。你的产品在哪一层？", type: "business" },
      { title: "❌ 空谈文化不涨薪", content: "一家创业公司天天讲使命愿景（自我实现层），但员工工资低于市场水平（安全层未满足）。结果核心人才纷纷离职。", type: "negative" }
    ],
    usage: { scenarios: ["设计激励方案", "分析用户/客户需求", "产品定位", "自我规划"], steps: ["判断目标对象当前处于哪个需求层级", "优先满足当前层级的核心需求", "在满足的基础上，引导向更高层级发展", "注意：层级不是严格线性的，可能同时存在多层需求"], pitfalls: ["需求层级不是绝对的阶梯，有人会跳跃", "不同文化背景下优先级不同", "不要用来简单标签化他人"], combineWith: ["福格行为模型", "Hook上瘾模型", "峰终定律"] },
    memorySentence: "先满足面包，再谈理想。",
    furtherReading: ["《动机与人格》亚伯拉罕·马斯洛"], relatedModels: ["fogg-behavior", "hook-model", "peak-end-rule"], updatedAt: "2026-04-22",
  },
  {
    id: "25", slug: "five-times-communication", title: "五遍沟通法", subtitle: "重要的事说五遍，确保执行不走样",
    category: "communication", tags: ["沟通", "管理", "执行力"], difficulty: 1, icon: "🔁",
    introduction: "五遍沟通法源自日本企业管理：交代任务时说五遍。第一遍：说明任务；第二遍：请对方复述；第三遍：问对方觉得目的是什么；第四遍：问可能遇到什么问题；第五遍：问如果让你自己做决定，你会怎么做。经过这五遍，执行者对任务的理解和管理者几乎一致。",
    keyInsight: "沟通的质量不是由你说了多少决定的，而是由对方理解了多少决定的。说一遍就走，不是高效，是偷懒。",
    cases: [
      { title: "🏢 布置工作任务", content: "领导说「把这个方案改一下」，下属改完发现完全不是领导想要的。如果用五遍法确认，就不会浪费两天返工。", type: "life" },
      { title: "🏭 丰田管理实践", content: "丰田的生产线上，每一个操作指令都要经过确认和复述。看似慢，但杜绝了因误解导致的质量事故。", type: "business" },
      { title: "❌ 「我说了你怎么不听」", content: "很多管理者的口头禅是「我不是说了吗」。但说了不等于对方听懂了，听懂了不等于认同了，认同了不等于会做了。", type: "negative" }
    ],
    usage: { scenarios: ["布置重要工作任务", "跨部门协作沟通", "带新人", "远程团队沟通"], steps: ["第1遍：清楚说明任务内容", "第2遍：请对方用自己的话复述", "第3遍：确认对方理解任务目的", "第4遍：讨论可能的障碍和风险", "第5遍：让对方说出自己的执行方案"], pitfalls: ["不是所有事都需要五遍，简单事情两遍即可", "语气要尊重，不要变成审问", "重点是确认理解，不是重复废话"], combineWith: ["金字塔原理", "SCQA模型", "SMART原则"] },
    memorySentence: "说了不等于听了，听了不等于懂了，懂了不等于会做了。",
    furtherReading: ["《可复制的领导力》樊登"], relatedModels: ["pyramid-principle", "scqa-model", "smart-principle"], updatedAt: "2026-04-22",
  },
  {
    id: "26", slug: "redundancy-backup", title: "冗余备份", subtitle: "关键系统一定要有备份方案",
    category: "system", tags: ["系统", "安全", "风险管理"], difficulty: 1, icon: "🔐",
    introduction: "冗余备份是工程领域的核心原则：任何关键系统都不能只有单一路径，必须有备用方案。飞机有多套引擎和操控系统，数据中心有异地备份，NASA 的航天器关键部件都是双份甚至三份。在个人生活和商业中，同样需要给重要的东西建立「Plan B」。",
    keyInsight: "所有单点故障迟早会故障。不是「会不会出问题」，而是「什么时候出问题」。有备份的人叫未雨绸缪，没备份的人叫亡羊补牢。",
    cases: [
      { title: "💾 数据备份", content: "你的毕业论文只存在一台电脑上？硬盘坏了就全没了。云端一份、U盘一份、邮箱发一份——三份备份让你高枕无忧。", type: "life" },
      { title: "✈️ 航空冗余设计", content: "每架商用客机都有至少两套独立的液压系统、电气系统和导航系统。即使一套完全失效，飞机仍然可以安全飞行。", type: "business" },
      { title: "❌ 单一供应商风险", content: "某公司 90% 的原材料来自同一家供应商。疫情期间供应商停产，整个生产线瘫痪三个月。", type: "negative" }
    ],
    usage: { scenarios: ["设计关键系统时", "职业规划（收入来源多元化）", "风险管理决策", "项目管理"], steps: ["识别你的「单点故障」——哪些环节出问题会导致全盘崩溃", "为每个单点故障设计至少一个备份方案", "定期测试备份方案是否有效", "评估冗余成本与风险成本的平衡"], pitfalls: ["冗余不是越多越好，有成本", "备份也需要定期检查和更新", "不要因为有备份就放松对主系统的维护"], combineWith: ["安全边际", "墨菲定律", "反转思维"] },
    memorySentence: "重要的东西，永远要有 Plan B。",
    furtherReading: ["《反脆弱》纳西姆·塔勒布"], relatedModels: ["safety-margin", "murphys-law", "inversion"], updatedAt: "2026-04-22",
  },
  {
    id: "27", slug: "safety-margin", title: "安全边际", subtitle: "给自己留出足够的容错空间",
    category: "decision", tags: ["投资", "风险", "决策"], difficulty: 2, icon: "🛡️",
    introduction: "安全边际是本杰明·格雷厄姆提出的投资概念：只在价格远低于内在价值时才买入，中间的差额就是安全边际。推广到生活中：做任何计划都要留出足够的缓冲空间——时间上多留余量、预算上多留储备、方案上多留后路。",
    keyInsight: "精确的错误不如模糊的正确。给自己留够容错空间，即使判断有偏差，也不会满盘皆输。",
    cases: [
      { title: "✈️ 赶飞机", content: "航班 10 点起飞，你 8 点出发「刚好来得及」。但堵车、排队、安检任何一个环节出问题就赶不上。安全边际是 7 点出发。", type: "life" },
      { title: "💰 巴菲特的投资", content: "巴菲特只在股价低于他估算的内在价值 30% 以上时才买入。即使他的估值偏差 20%，仍然有 10% 的安全边际保护。", type: "business" },
      { title: "❌ 卡着预算做项目", content: "预算 100 万的项目刚好花 100 万，结果需求变更多花了 20 万，导致资金断裂。如果预留 20% 安全边际就不会。", type: "negative" }
    ],
    usage: { scenarios: ["投资决策", "项目预算和时间估算", "人生重大决策", "风险管理"], steps: ["评估事物的真实价值/所需资源", "在此基础上额外预留 20-50% 的缓冲", "只有在留够安全边际后才行动", "安全边际不是浪费，是保险"], pitfalls: ["安全边际过大会丧失机会", "不同场景需要不同大小的安全边际", "不能替代对事物本身的深入分析"], combineWith: ["冗余备份", "反转思维", "第二序思维"] },
    memorySentence: "留足余量，才能从容应对意外。",
    furtherReading: ["《聪明的投资者》本杰明·格雷厄姆"], relatedModels: ["redundancy-backup", "inversion", "second-order-thinking"], updatedAt: "2026-04-22",
  },
  {
    id: "28", slug: "pest-analysis", title: "PEST分析", subtitle: "从政治、经济、社会、技术四维度分析宏观环境",
    category: "business", tags: ["战略", "宏观分析", "商业"], difficulty: 2, icon: "🌐",
    introduction: "PEST 分析是一种宏观环境分析工具，从四个维度评估外部环境对业务的影响：Political（政治/法规）、Economic（经济环境）、Social（社会文化）、Technological（技术趋势）。它帮你在做战略决策前，先看清「大气候」。",
    keyInsight: "再好的船也怕逆风逆水。做任何商业决策前，先抬头看看大环境的风向。",
    cases: [
      { title: "🚗 新能源汽车", content: "P-政策补贴推动；E-油价上涨；S-环保意识提升；T-电池技术突破。四个维度都利好，所以这个赛道爆发了。", type: "business" },
      { title: "🏠 租房 vs 买房", content: "P-房地产政策趋紧；E-利率走势；S-年轻人婚恋观变化；T-远程办公兴起。用 PEST 分析可以更理性地做决定。", type: "life" },
      { title: "❌ 忽视政策风险", content: "某教育公司快速扩张，完全没考虑政策风险。双减政策一出，市值蒸发 90%。", type: "negative" }
    ],
    usage: { scenarios: ["企业战略规划", "进入新市场前的环境评估", "投资决策", "行业研究"], steps: ["分别列出 P/E/S/T 四个维度的关键因素", "评估每个因素对你的正面/负面影响", "找出最关键的 2-3 个因素", "基于分析结果调整战略"], pitfalls: ["PEST 是宏观分析，不能替代微观竞争分析", "环境在变化，需要定期更新", "不要只关注有利因素，威胁同样重要"], combineWith: ["SWOT分析", "波特五力", "第二序思维"] },
    memorySentence: "决策之前，先看政治、经济、社会、技术的大气候。",
    furtherReading: ["《竞争战略》迈克尔·波特"], relatedModels: ["swot-analysis", "porter-five-forces", "second-order-thinking"], updatedAt: "2026-04-22",
  },
  {
    id: "29", slug: "boston-matrix", title: "波士顿矩阵", subtitle: "用市场增长率和市场份额判断业务组合",
    category: "business", tags: ["战略", "产品管理", "投资组合"], difficulty: 2, icon: "📈",
    introduction: "波士顿矩阵（BCG Matrix）由波士顿咨询公司提出，按「市场增长率」和「相对市场份额」两个维度将业务分为四类：明星（高增长+高份额）→投入资源保持领先；金牛（低增长+高份额）→稳定现金来源；问题（高增长+低份额）→需要决定投还是砍；瘦狗（低增长+低份额）→考虑放弃。",
    keyInsight: "不是所有业务都值得同等投入。把赚来的钱（金牛）投给有潜力的（明星和问题），及时止损没前途的（瘦狗）。",
    cases: [
      { title: "📱 苹果的产品组合", content: "iPhone 是金牛（稳定现金流），Apple Vision Pro 是问题业务（高增长市场但份额待定），iPod 曾经是瘦狗（被砍掉了）。", type: "business" },
      { title: "🎯 个人技能投资", content: "你的核心技能（金牛）→持续产出收入；新学的 AI 技能（明星）→市场大且你在进步；多年前学的技能已经过时（瘦狗）→放弃。", type: "life" },
      { title: "❌ 给瘦狗输血", content: "一家公司把大量资源投给已经衰退的产品线，只因为「它曾经辉煌过」。结果不仅没救活老业务，还拖累了新业务。", type: "negative" }
    ],
    usage: { scenarios: ["企业产品/业务组合决策", "个人精力和技能投资", "资源分配优化"], steps: ["列出所有业务/产品/技能", "评估每个的市场增长率和你的竞争位置", "分入四个象限", "制定差异化策略：投入、维持、观望或放弃"], pitfalls: ["市场份额和增长率不是唯一标准", "分类不是非黑即白", "瘦狗业务有时仍有战略价值"], combineWith: ["帕累托法则", "SWOT分析", "能力圈"] },
    memorySentence: "金牛赚钱养明星，问题要决断，瘦狗要放手。",
    furtherReading: ["《战略管理》"], relatedModels: ["pareto-principle", "swot-analysis", "circle-of-competence"], updatedAt: "2026-04-22",
  },
  {
    id: "30", slug: "golden-circle", title: "黄金圈法则", subtitle: "先说为什么，再说怎么做，最后说是什么",
    category: "communication", tags: ["领导力", "营销", "表达"], difficulty: 1, icon: "🎯",
    introduction: "黄金圈法则由西蒙·斯涅克提出。大多数人沟通的顺序是 What→How→Why（我们做了什么产品，用了什么技术，因为我们想赚钱）。但真正能打动人的顺序是反过来的：Why→How→What（我们相信什么，我们如何实践，最终做出了什么）。苹果、特斯拉、耐克都是从 Why 出发。",
    keyInsight: "人们买的不是你做了什么，而是你为什么做。从「为什么」出发，你打动的是人心而不只是人脑。",
    cases: [
      { title: "🍎 苹果 vs 戴尔", content: "戴尔说：「我们做了一款很好的电脑」（What）。苹果说：「我们相信要挑战现状，让科技变得简单美好」（Why）→「所以我们设计了极简的产品」（How）→「这就是 Mac」（What）。", type: "business" },
      { title: "💼 面试自我介绍", content: "普通版：「我是做前端开发的，会 React 和 Vue」（What）。高级版：「我相信好的用户体验能改变生活」（Why）→「所以我深入钻研前端技术」（How）→「擅长 React 和 Vue」（What）。", type: "life" },
      { title: "❌ 只讲功能的产品", content: "一款 App 宣传页列了 50 个功能，但用户看完还是不知道「为什么要用你」。因为你没有告诉他 Why。", type: "negative" }
    ],
    usage: { scenarios: ["品牌故事和营销文案", "演讲和自我介绍", "领导力和团队激励", "产品定位"], steps: ["先想清楚你的 Why——你相信什么？你的使命是什么？", "再说 How——你如何践行这个信念？", "最后说 What——由此产生了什么成果/产品？", "用 Why 打动人心，用 What 提供证据"], pitfalls: ["Why 不能是「为了赚钱」——那是结果不是原因", "需要真诚，虚假的 Why 很快会被识破", "不是所有场景都需要从 Why 开始"], combineWith: ["金字塔原理", "SCQA模型", "峰终定律"] },
    memorySentence: "先告诉别人你为什么做，而不是你做了什么。",
    furtherReading: ["《从为什么开始》西蒙·斯涅克"], relatedModels: ["pyramid-principle", "scqa-model", "peak-end-rule"], updatedAt: "2026-04-22",
  },
  {
    id: "31", slug: "six-thinking-hats", title: "六顶帽子思考法", subtitle: "切换六种思维角色，全面分析问题",
    category: "innovation", tags: ["创新", "思维方法", "团队决策"], difficulty: 2, icon: "🎩",
    introduction: "六顶帽子思考法由爱德华·德博诺提出。每顶帽子代表一种思维模式：白帽（数据事实）、红帽（情感直觉）、黑帽（风险批判）、黄帽（乐观价值）、绿帽（创新方案）、蓝帽（流程控制）。团队讨论时，大家同时戴同一顶帽子，避免混乱争论。",
    keyInsight: "争论之所以低效，是因为每个人同时在用不同的思维模式——一个在讲事实，一个在表达情绪，一个在挑毛病。让所有人同步切换到同一模式，效率翻倍。",
    cases: [
      { title: "🏢 项目决策会", content: "讨论是否推出新产品：先戴白帽看数据，再戴红帽说直觉，黑帽找风险，黄帽看机会，绿帽想创新方案，蓝帽做总结。30 分钟比争论 3 小时更全面。", type: "business" },
      { title: "🏠 家庭重大决策", content: "要不要换城市生活？白帽：看两个城市的数据对比。红帽：家人各自的感受。黑帽：可能的风险。黄帽：新机会。系统思考而非感性争吵。", type: "life" },
      { title: "❌ 混乱的头脑风暴", content: "一个人刚提出创意，另一个立刻否定。结果谁也不敢说新想法了。应该先全部绿帽（创意），之后再黑帽（批判）。", type: "negative" }
    ],
    usage: { scenarios: ["团队会议和决策", "个人复杂问题分析", "头脑风暴", "冲突调解"], steps: ["蓝帽开场：明确讨论议题和流程", "白帽：收集和确认事实数据", "红帽：表达直觉和感受（不需要理由）", "黄帽：分析优点和机会", "黑帽：分析风险和问题", "绿帽：提出创新解决方案", "蓝帽总结：做出决定"], pitfalls: ["不要同时戴两顶帽子", "红帽时不需要给理由，就是说感觉", "需要一个人（蓝帽角色）来把控流程"], combineWith: ["头脑风暴法", "SWOT分析", "决策矩阵"] },
    memorySentence: "别争论了——先统一戴哪顶帽子。",
    furtherReading: ["《六顶思考帽》爱德华·德博诺"], relatedModels: ["brainstorming", "swot-analysis"], updatedAt: "2026-04-22",
  },
  {
    id: "32", slug: "path-dependence", title: "路径依赖", subtitle: "过去的选择会锁定未来的方向",
    category: "system", tags: ["系统", "惯性", "战略"], difficulty: 2, icon: "🛤️",
    introduction: "路径依赖指一旦走上某条路径，由于沉没成本、学习曲线、网络效应等因素，转换到其他路径的成本会越来越高。最经典的例子是 QWERTY 键盘——它不是最优布局，但因为太多人已经习惯了，换成更高效的布局代价太大。",
    keyInsight: "你今天的选择不只影响今天，还会限制明天的选项。起步阶段的方向选择比后续的努力更重要。",
    cases: [
      { title: "⌨️ QWERTY 键盘", content: "这个键盘布局是为了防止打字机卡键而设计的，完全不适合现代电脑。但全球几十亿人已经习惯了，改不了了。", type: "business" },
      { title: "🎓 专业选择", content: "大学选了法学，读了 7 年拿到执照。30 岁想转行做设计——可以，但前面的积累基本归零。这就是路径依赖的力量。", type: "life" },
      { title: "❌ 技术栈锁定", content: "一家公司早期选了一个小众框架，随着代码量增大，迁移成本越来越高。即使有更好的选择，也只能将就。", type: "negative" }
    ],
    usage: { scenarios: ["重大方向选择前", "评估技术选型", "理解为什么某些低效系统仍在运行", "职业规划"], steps: ["识别当前路径的切换成本有多高", "在路径早期做更慎重的选择", "定期评估是否值得承受切换成本", "如果必须转向，越早越好——路径依赖会随时间加强"], pitfalls: ["路径依赖不等于不能改变，只是成本高", "不要用路径依赖作为拒绝变化的借口", "有时打破路径依赖是值得的（如柯达应该拥抱数码）"], combineWith: ["沉没成本", "第一性原理", "反转思维"] },
    memorySentence: "起步时选对方向，比后来加倍努力更重要。",
    furtherReading: ["《技术的本质》布莱恩·阿瑟"], relatedModels: ["sunk-cost", "first-principles", "inversion"], updatedAt: "2026-04-22",
  },
  {
    id: "33", slug: "smart-principle", title: "SMART原则", subtitle: "目标要具体、可衡量、可实现、相关、有时限",
    category: "efficiency", tags: ["目标管理", "效率", "执行"], difficulty: 1, icon: "🎯",
    introduction: "SMART 原则定义了好目标的五个标准：Specific（具体的）、Measurable（可衡量的）、Achievable（可实现的）、Relevant（相关的）、Time-bound（有时限的）。「我要变得更好」不是好目标；「我要在 3 个月内读完 10 本专业书」才是。",
    keyInsight: "模糊的目标是梦想，清晰的目标是计划。加上数字和截止日期的那一刻，目标才开始变得真实。",
    cases: [
      { title: "🏃 健身目标", content: "烂目标：「我要减肥」。SMART 目标：「在接下来 3 个月内，通过每周跑步 3 次 + 控制饮食，减重 6 公斤」。", type: "life" },
      { title: "📊 团队 OKR", content: "烂 OKR：「提升用户体验」。SMART OKR：「Q2 将 App 的 NPS 从 35 分提升到 50 分，通过优化 3 个核心用户流程」。", type: "business" },
      { title: "❌ 年初立 flag", content: "每年 1 月 1 日立一堆模糊的 flag：「今年要好好学习」「要锻炼身体」「要存钱」。没有数字没有期限，到 12 月一个都没完成。", type: "negative" }
    ],
    usage: { scenarios: ["制定个人目标", "团队 OKR/KPI", "项目里程碑", "新年计划"], steps: ["写下你的目标", "检查是否具体（Specific）——能不能再明确一点？", "是否可衡量（Measurable）——怎么知道完成了？", "是否可实现（Achievable）——现实吗？", "是否相关（Relevant）——和大方向一致吗？", "是否有时限（Time-bound）——截止日期是什么？"], pitfalls: ["SMART 适合执行层目标，战略层目标可以更宽泛", "可实现不等于没有挑战性", "有些探索型目标不适合严格 SMART 化"], combineWith: ["PDCA循环", "帕累托法则", "OGSM目标管理"] },
    memorySentence: "没有数字和截止日期的目标，只是愿望。",
    furtherReading: ["《目标》乔治·多兰"], relatedModels: ["pdca-cycle", "pareto-principle", "ogsm"], updatedAt: "2026-04-22",
  },
  {
    id: "34", slug: "pdca-cycle", title: "PDCA循环", subtitle: "计划-执行-检查-改进，永不停止的优化循环",
    category: "efficiency", tags: ["质量管理", "持续改进", "执行"], difficulty: 1, icon: "🔄",
    introduction: "PDCA（戴明环）是持续改进的基本方法：Plan（计划）→ Do（执行）→ Check（检查）→ Act（改进）→ 再 Plan... 循环往复，螺旋上升。它看似简单，但真正做到「每个循环都比上一个好一点」的人和组织很少。",
    keyInsight: "大多数人只做了 PD（计划和执行），忘了 CA（检查和改进）。不复盘的执行是重复犯错，不改进的计划是自我欺骗。",
    cases: [
      { title: "📝 写作提升", content: "P-计划每周写一篇文章；D-写了；C-看阅读数据和读者反馈；A-下一篇改进标题和结构。坚持 10 个循环，水平明显提升。", type: "life" },
      { title: "🏭 丰田精益生产", content: "丰田的每条产线每天都在做微小改善（Kaizen），每个 PDCA 循环只改进 1%，但日积月累就是巨大的竞争优势。", type: "business" },
      { title: "❌ 只做不查", content: "一个营销团队每月都做活动，但从不分析哪些有效哪些无效。三年过去了，犯的错误和第一年一样。", type: "negative" }
    ],
    usage: { scenarios: ["个人技能提升", "团队流程优化", "产品迭代", "任何需要持续改进的场景"], steps: ["Plan：制定具体的改进计划和目标", "Do：执行计划", "Check：对比结果与目标，分析差距", "Act：总结经验，固化好的做法，改进不好的", "开启下一个循环"], pitfalls: ["不要在 Plan 阶段花太久，快速进入执行", "Check 必须基于数据而非感觉", "每个循环的改进点要聚焦，不要贪多"], combineWith: ["SMART原则", "复利思维", "飞轮效应"] },
    memorySentence: "不复盘的努力，是在原地画圈。",
    furtherReading: ["《戴明的管理方法》"], relatedModels: ["smart-principle", "compound-effect", "flywheel-effect"], updatedAt: "2026-04-22",
  },
  {
    id: "35", slug: "mece-principle", title: "MECE原则", subtitle: "相互独立，完全穷尽——不重不漏",
    category: "communication", tags: ["逻辑", "分析", "麦肯锡"], difficulty: 2, icon: "🧩",
    introduction: "MECE（Mutually Exclusive, Collectively Exhaustive）是麦肯锡的核心方法论：把问题拆解时，每个部分之间不重叠（相互独立），所有部分加起来覆盖全部（完全穷尽）。说人话就是：拆得不重不漏。",
    keyInsight: "如果你的分析有重叠，会重复计算；如果有遗漏，会错过关键因素。MECE 是清晰思考的地基。",
    cases: [
      { title: "📊 收入分析", content: "按「线上/线下」分——MECE。按「大客户/新客户/活跃客户」分——不 MECE，因为一个客户可能同时是大客户和活跃客户（重叠），且可能遗漏了沉睡客户（遗漏）。", type: "business" },
      { title: "🧹 打扫房间", content: "按房间分（客厅/卧室/厨房/卫生间）——MECE。按「脏的地方」分——不 MECE，因为你可能觉得某处不脏而跳过。", type: "life" },
      { title: "❌ 非 MECE 的方案", content: "领导问「客户为什么流失」，你列了：价格太贵、服务不好、产品不好、竞品挖墙脚。这四条有大量重叠，且可能遗漏了「客户自身需求变了」。", type: "negative" }
    ],
    usage: { scenarios: ["问题拆解", "写报告和方案", "数据分类和分析", "任何需要系统思考的场景"], steps: ["明确要拆解的问题", "尝试列出所有组成部分", "检查：各部分之间有没有重叠？", "检查：所有部分加起来是否覆盖了全部？", "如有问题，调整拆分维度"], pitfalls: ["100% MECE 在现实中很难，80% 就够用了", "不同的拆分维度会得到不同的 MECE 组合", "不要为了 MECE 而 MECE，目的是清晰思考"], combineWith: ["金字塔原理", "问题树", "SWOT分析"] },
    memorySentence: "拆问题的第一原则：不重不漏。",
    furtherReading: ["《金字塔原理》芭芭拉·明托"], relatedModels: ["pyramid-principle", "issue-tree", "swot-analysis"], updatedAt: "2026-04-22",
  },
  {
    id: "36", slug: "issue-tree", title: "问题树", subtitle: "把大问题层层拆解为可执行的小问题",
    category: "innovation", tags: ["分析", "拆解", "结构化"], difficulty: 2, icon: "🌳",
    introduction: "问题树是一种结构化拆解复杂问题的方法：从一个核心问题出发，逐层拆分为子问题，每层遵循 MECE 原则，直到分解为可以直接回答或执行的小问题。它像一棵倒立的树——根是大问题，枝叶是小问题。",
    keyInsight: "面对复杂问题不知道从何入手？那是因为你在试图一口吃掉整头大象。把它切成小块，每块都能下口。",
    cases: [
      { title: "📉 利润下降", content: "利润下降→收入减少 or 成本增加？→收入减少→客户量减少 or 客单价降低？→客户量减少→新客减少 or 老客流失？一步步拆到可执行的诊断。", type: "business" },
      { title: "🎯 考研规划", content: "考研→择校→专业课→英语→政治。每个分支再拆：英语→单词→阅读→写作→各自的每周计划。", type: "life" },
      { title: "❌ 拍脑袋解决问题", content: "利润下降，老板说「加大广告投放」。但问题可能在成本端而非收入端。不拆解就行动，可能南辕北辙。", type: "negative" }
    ],
    usage: { scenarios: ["诊断复杂问题的根因", "制定项目计划", "写分析报告", "战略规划"], steps: ["明确核心问题（树根）", "按 MECE 原则拆分为 2-4 个子问题（第一层枝干）", "继续拆分每个子问题（第二层）", "拆到可以直接行动或回答的程度（树叶）", "从树叶开始逐一解决"], pitfalls: ["不要拆得太细——3-4 层通常足够", "每层要遵循 MECE，否则会遗漏", "拆解本身不是目的，解决问题才是"], combineWith: ["MECE原则", "5W1H六何法", "第一性原理"] },
    memorySentence: "大象吃不下？切成小块一口一口吃。",
    furtherReading: ["《麦肯锡问题分析与解决技巧》"], relatedModels: ["mece-principle", "five-w-one-h", "first-principles"], updatedAt: "2026-04-22",
  },
  {
    id: "37", slug: "occams-razor", title: "奥卡姆剃刀", subtitle: "如无必要，勿增实体——最简单的解释往往最正确",
    category: "decision", tags: ["简化", "决策", "逻辑"], difficulty: 1, icon: "🪒",
    introduction: "奥卡姆剃刀由14世纪的修士奥卡姆提出：如果有多个假说可以解释同一现象，选最简单的那个。它不是说简单的就一定对，而是说在没有更多证据前，不要引入不必要的复杂性。",
    keyInsight: "复杂的解释让人觉得高深，但往往是因为你没有找到简单的真相。如果你的方案需要 10 个假设才成立，大概率有问题。",
    cases: [
      { title: "🤒 感冒还是绝症", content: "你头疼了一天，是感冒还是脑瘤？奥卡姆剃刀说：先按感冒处理。99.9% 的头疼就是感冒。", type: "life" },
      { title: "📉 销量下降", content: "销量下降了——是因为市场萎缩、竞品太强、内部管理问题、还是简单地因为上周官网挂了 2 天？先查最简单的原因。", type: "business" },
      { title: "❌ 过度设计", content: "一个简单的内部工具，架构师设计了微服务+消息队列+多级缓存。实际只有 5 个用户。杀鸡用了牛刀。", type: "negative" }
    ],
    usage: { scenarios: ["问题诊断", "方案选择", "产品设计", "沟通简化"], steps: ["列出所有可能的解释/方案", "比较它们的复杂度（需要多少假设？）", "在解释力相当的前提下，选最简单的", "只有当简单的被否定时，才考虑复杂的"], pitfalls: ["简单不等于粗糙", "有些问题确实需要复杂解释", "不要用奥卡姆剃刀逃避深度思考"], combineWith: ["第一性原理", "帕累托法则", "MVP最小可行产品"] },
    memorySentence: "能用简单解释的，别用复杂的。",
    furtherReading: ["《简单的艺术》"], relatedModels: ["first-principles", "pareto-principle", "mvp"], updatedAt: "2026-04-22",
  },
  {
    id: "38", slug: "johari-window", title: "乔哈里视窗", subtitle: "认识自己的四个区域：公开、盲点、隐私、未知",
    category: "cognition", tags: ["自我认知", "沟通", "心理学"], difficulty: 2, icon: "🪟",
    introduction: "乔哈里视窗将个人认知分为四个区域：公开区（自己知道、别人也知道）、盲点区（别人知道、自己不知道）、隐私区（自己知道、别人不知道）、未知区（谁都不知道）。成长的核心是扩大公开区——通过主动分享减少隐私区，通过接受反馈减少盲点区。",
    keyInsight: "你对自己的了解远不如你以为的那么多。你最大的成长机会藏在盲点区——那些别人看到但你看不到的特质。",
    cases: [
      { title: "💬 反馈的价值", content: "你觉得自己演讲很有感染力，但同事告诉你语速太快别人跟不上。这就是盲点区的信息——没有反馈你永远发现不了。", type: "life" },
      { title: "🏢 团队建设", content: "新团队成员之间互相不了解（隐私区很大），通过团建、分享会扩大公开区后，协作效率显著提升。", type: "business" },
      { title: "❌ 拒绝反馈", content: "一个管理者总觉得自己很体恤下属，但所有人都觉得他独断专行。他从不接受 360 度反馈，盲点区越来越大。", type: "negative" }
    ],
    usage: { scenarios: ["自我认知提升", "改善人际关系", "团队协作优化", "领导力发展"], steps: ["画出自己的乔哈里四格", "主动寻求真诚的反馈（缩小盲点区）", "适度分享自己的想法和感受（缩小隐私区）", "尝试新事物（探索未知区）", "让公开区不断扩大"], pitfalls: ["接受反馈需要勇气，但值得", "分享有度，不是什么都要公开", "有些盲点需要专业人士帮你发现"], combineWith: ["邓宁-克鲁格效应", "元认知", "能力圈"] },
    memorySentence: "最大的成长空间，藏在你看不见的盲点里。",
    furtherReading: ["《自我认知》"], relatedModels: ["dunning-kruger", "metacognition", "circle-of-competence"], updatedAt: "2026-04-22",
  },
  {
    id: "39", slug: "grow-model", title: "GROW成长模型", subtitle: "目标-现实-选项-行动，教练式对话框架",
    category: "learning", tags: ["教练", "成长", "对话"], difficulty: 1, icon: "🌱",
    introduction: "GROW 模型是最经典的教练式对话框架：Goal（你的目标是什么？）→ Reality（现在的情况如何？）→ Options（有哪些可能的选择？）→ Will（你决定怎么做？什么时候做？）。它不是给建议，而是通过提问帮助对方自己找到答案。",
    keyInsight: "最好的教练不是告诉你答案，而是问出让你自己发现答案的问题。GROW 的力量在于它引导人思考而非被动接受。",
    cases: [
      { title: "👨‍💼 一对一辅导", content: "下属说想升职。G：你想达到什么职级？R：你现在的差距在哪里？O：有哪些方式可以缩小差距？W：你决定先做哪个？下周能开始吗？", type: "business" },
      { title: "🎯 个人规划", content: "G：今年学会弹吉他。R：现在完全不会。O：自学/报班/找朋友教。W：我决定报线上课，今天就注册，每天练 30 分钟。", type: "life" },
      { title: "❌ 直接给建议", content: "朋友说纠结要不要辞职，你立刻说「辞吧」或「别辞」。但你不了解他的全貌，用 GROW 提问让他自己想清楚更好。", type: "negative" }
    ],
    usage: { scenarios: ["一对一辅导和教练", "帮助朋友做决策", "自我规划和反思", "管理者与下属沟通"], steps: ["Goal：明确目标——你想达到什么？", "Reality：了解现状——现在情况如何？差距在哪？", "Options：探索选项——有哪些可能的路径？", "Will：确定行动——你选择哪条路？第一步是什么？什么时候开始？"], pitfalls: ["GROW 是提问框架，不是按顺序走流程", "有时候需要在 R 和 O 之间反复", "不适合紧急情况——那时需要直接给方案"], combineWith: ["SMART原则", "费曼学习法", "刻意练习"] },
    memorySentence: "好教练不给答案，只问问题。",
    furtherReading: ["《高绩效教练》约翰·惠特默"], relatedModels: ["smart-principle", "feynman-technique", "deliberate-practice"], updatedAt: "2026-04-22",
  },
  {
    id: "40", slug: "five-w-one-h", title: "5W1H六何法", subtitle: "六个问题搞清任何事情的全貌",
    category: "efficiency", tags: ["分析", "执行", "沟通"], difficulty: 1, icon: "❓",
    introduction: "5W1H 是最基础的分析框架：What（做什么）、Why（为什么）、Who（谁来做）、When（什么时候）、Where（在哪里）、How（怎么做）。看似简单，但能确保你不遗漏任何关键信息。",
    keyInsight: "很多事情搞砸，不是因为太难，而是因为某个基本要素没想清楚。6 个问题全部回答清楚，事情就成功了一半。",
    cases: [
      { title: "📋 活动策划", content: "What：年会；Why：团队凝聚力；Who：全体员工+家属；When：12月20日；Where：酒店；How：晚宴+节目+抽奖。6 个问题回答完，方案框架就有了。", type: "business" },
      { title: "🏠 搬家计划", content: "What：搬到新家；Who：找搬家公司还是自己搬；When：下周六；Where：从 A 到 B；Why：租约到期；How：提前打包，租车。", type: "life" },
      { title: "❌ 没问 Why", content: "接到任务就埋头干，没问为什么要做。干完了发现方向就是错的——因为你理解的 What 和领导想的不一样。", type: "negative" }
    ],
    usage: { scenarios: ["任何需要理清思路的场景", "接收任务时确认信息", "写方案和计划", "记者采访和写作"], steps: ["What：要做什么？核心目标是什么？", "Why：为什么要做？意义和目的？", "Who：谁来做？谁是利益相关方？", "When：什么时候开始和结束？", "Where：在哪里执行？", "How：具体怎么做？分几步？"], pitfalls: ["不是每次都需要回答全部 6 个", "Why 往往是最重要但最容易被忽略的", "回答要具体，不能模糊"], combineWith: ["SMART原则", "问题树", "金字塔原理"] },
    memorySentence: "六个问题问清楚，事情就成功了一半。",
    furtherReading: ["《学会提问》尼尔·布朗"], relatedModels: ["smart-principle", "issue-tree", "pyramid-principle"], updatedAt: "2026-04-22",
  },
];
