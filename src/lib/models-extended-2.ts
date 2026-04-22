import type { MentalModel } from "./models-data";

export const extendedModels2: MentalModel[] = [
  {
    id: "41", slug: "fogg-behavior", title: "福格行为模型", subtitle: "行为 = 动机 × 能力 × 触发",
    category: "cognition", tags: ["行为设计", "习惯", "心理学"], difficulty: 2, icon: "⚡",
    introduction: "斯坦福大学的 BJ·福格提出：行为的发生需要三个要素同时具备——动机（Motivation）、能力（Ability）和触发/提示（Prompt）。缺少任何一个，行为都不会发生。想让用户做某事？提高动机、降低难度、设置触发。",
    keyInsight: "人不行动不是因为懒，而是动机不够、太难了、或者忘了。三个因素中，降低难度往往是最有效的杠杆。",
    cases: [
      { title: "📱 App 引导注册", content: "动机：给新用户优惠券；能力：一键微信登录（降低门槛）；触发：首页弹窗。三者齐备，注册率大幅提升。", type: "business" },
      { title: "🏃 养成跑步习惯", content: "动机：想减肥；能力：「每天只跑 5 分钟」（极低门槛）；触发：把跑鞋放在门口。三个月后自然增加到 30 分钟。", type: "life" },
      { title: "❌ 只靠意志力", content: "很多人靠「我一定要坚持」（只有动机），但没有降低难度和设置触发。结果三天热度就放弃了。", type: "negative" }
    ],
    usage: { scenarios: ["产品用户行为设计", "个人习惯养成", "营销转化优化", "教育教学"], steps: ["明确你想让谁做什么行为", "评估当前的动机强度", "尽可能降低行为难度（关键！）", "设置明确的触发/提示", "行为发生后给予正反馈强化"], pitfalls: ["三个要素缺一不可", "降低难度比提高动机更可控", "触发时机很重要"], combineWith: ["Hook上瘾模型", "马斯洛需求层次", "PDCA循环"] },
    memorySentence: "让行为简单到不可能失败，然后设个提醒。",
    furtherReading: ["《福格行为模型》BJ·福格"], relatedModels: ["hook-model", "maslow-hierarchy", "pdca-cycle"], updatedAt: "2026-04-22",
  },
  {
    id: "42", slug: "spiral-of-silence", title: "沉默的螺旋", subtitle: "少数派越沉默，主流声音越大",
    category: "cognition", tags: ["传播学", "社会心理", "舆论"], difficulty: 2, icon: "🌀",
    introduction: "沉默的螺旋理论由诺依曼提出：人们在表达观点前会先感知「多数人怎么想」。如果觉得自己是少数派，就倾向于沉默；而多数派因为得到呼应会更大声。这导致一方越来越响亮，另一方越来越沉默——螺旋效应。",
    keyInsight: "你在网上看到的「主流观点」可能只是少数人大声说出来的。真正的多数派可能在沉默。社交媒体极大地放大了这个效应。",
    cases: [
      { title: "💬 会议中的沉默", content: "老板表态支持 A 方案后，即使你觉得 B 更好，也不敢说了——因为你是「少数派」。结果全公司都以为大家都支持 A。", type: "business" },
      { title: "📱 网络舆论", content: "一个话题下激进观点获得大量点赞，温和理性的声音不敢说话。最后看起来好像「所有人」都很激进。", type: "life" },
      { title: "❌ 虚假共识", content: "一家公司的内部调查显示 90% 员工「满意」，但私下聊天大家都在抱怨。因为没人敢在公开场合做「第一个说不的人」。", type: "negative" }
    ],
    usage: { scenarios: ["理解舆论和社会现象", "团队决策时避免假共识", "做传播策略", "识别信息偏差"], steps: ["意识到你看到的「主流」可能不是真正的多数", "在团队中主动创造安全的表达环境", "用匿名调查收集真实意见", "做「第一个说出不同意见的人」"], pitfalls: ["不是所有沉默都是因为恐惧，有人确实没意见", "有时多数派确实是对的", "打破螺旋需要勇气和安全的环境"], combineWith: ["确认偏误", "六顶帽子思考法", "反转思维"] },
    memorySentence: "沉默的不一定是少数，喧闹的不一定是多数。",
    furtherReading: ["《沉默的螺旋》伊丽莎白·诺依曼"], relatedModels: ["confirmation-bias", "six-thinking-hats", "inversion"], updatedAt: "2026-04-22",
  },
  {
    id: "43", slug: "aisas-model", title: "AISAS模型", subtitle: "注意-兴趣-搜索-行动-分享的消费路径",
    category: "business", tags: ["营销", "用户行为", "互联网"], difficulty: 1, icon: "📣",
    introduction: "AISAS 是互联网时代的消费者行为模型：Attention（注意）→ Interest（兴趣）→ Search（搜索）→ Action（行动/购买）→ Share（分享）。与传统的 AIDA 模型相比，新增了「搜索」和「分享」两个互联网特有的环节。",
    keyInsight: "现代消费者在购买前一定会搜索，购买后可能会分享。这意味着：你的内容必须经得起搜索，你的体验必须值得分享。",
    cases: [
      { title: "🛒 种草到拔草", content: "在小红书看到一款护肤品（Attention+Interest）→去淘宝搜评价（Search）→下单购买（Action）→用完发朋友圈推荐（Share）。完美的 AISAS 闭环。", type: "business" },
      { title: "🍜 选餐厅", content: "路过一家店闻到香味（A）→想吃（I）→打开大众点评看评分（S）→进去吃（A）→拍照发朋友圈（S）。", type: "life" },
      { title: "❌ 只投广告不管口碑", content: "花了大钱让用户注意到了（A→I），但搜索发现差评一堆（S 环节流失），所有广告费都浪费了。", type: "negative" }
    ],
    usage: { scenarios: ["制定营销策略", "用户旅程设计", "内容营销规划", "电商运营"], steps: ["设计引起注意的内容/广告（A）", "激发兴趣和好奇心（I）", "确保搜索时有正面口碑和信息（S）", "降低购买门槛、优化转化（A）", "创造值得分享的体验（S）"], pitfalls: ["每个环节都可能流失，要全链路优化", "Share 环节需要产品本身够好", "搜索环节的口碑管理不能忽视"], combineWith: ["销售漏斗", "Hook上瘾模型", "峰终定律"] },
    memorySentence: "经得起搜索，值得被分享。",
    furtherReading: ["《增长黑客》肖恩·埃利斯"], relatedModels: ["sales-funnel", "hook-model", "peak-end-rule"], updatedAt: "2026-04-22",
  },
  {
    id: "44", slug: "kahneman-dual-system", title: "卡尼曼双系统", subtitle: "快思考靠直觉，慢思考靠理性",
    category: "cognition", tags: ["心理学", "决策", "认知偏误"], difficulty: 2, icon: "🧠",
    introduction: "丹尼尔·卡尼曼将人脑思维分为两个系统：系统1（快思考）——自动化、直觉、情绪化、不费力；系统2（慢思考）——需要注意力、理性、逻辑、费力。日常生活中 95% 的决策由系统1 主导，这就是为什么我们会犯那么多认知偏误。",
    keyInsight: "你以为你在理性决策（系统2），但大多数时候其实是直觉在做决定（系统1），然后系统2 只是在帮直觉找理由。",
    cases: [
      { title: "🛒 冲动购物", content: "看到「限时 5 折」就想买——这是系统1（恐惧错过）。停下来想「我真的需要吗？」——这是系统2。大多数人没有启动系统2 就付款了。", type: "life" },
      { title: "📊 投资决策", content: "股市大跌时恐慌抛售（系统1），冷静分析基本面后发现是好的买入机会（系统2）。巴菲特说「别人恐惧时贪婪」就是要求你用系统2。", type: "business" },
      { title: "❌ 面试的第一印象", content: "面试官前 30 秒就对候选人有了判断（系统1），然后整个面试都在寻找支持这个判断的证据。这就是为什么结构化面试比自由面试更公平。", type: "negative" }
    ],
    usage: { scenarios: ["做重大决策前", "识别自己的认知偏误", "设计产品和营销策略", "提升判断力"], steps: ["意识到你的第一反应来自系统1", "对重要决策强制启动系统2——停下来想 10 秒", "问自己：「我是在理性分析还是在为直觉找理由？」", "用清单、数据等工具辅助系统2 思考"], pitfalls: ["系统1 不总是错的——日常小决策靠直觉很高效", "不能所有事都用系统2——你的注意力是有限的", "关键是知道什么时候该切换到系统2"], combineWith: ["确认偏误", "框架效应", "10/10/10法则"] },
    memorySentence: "你的直觉很快但常出错，重要的事让理性来。",
    furtherReading: ["《思考，快与慢》丹尼尔·卡尼曼"], relatedModels: ["confirmation-bias", "framing-effect", "ten-ten-ten-rule"], updatedAt: "2026-04-22",
  },
  {
    id: "45", slug: "flow-state", title: "心流与次心流", subtitle: "当挑战与技能完美匹配，你进入忘我状态",
    category: "learning", tags: ["心理学", "状态", "效率"], difficulty: 2, icon: "🌊",
    introduction: "心流由米哈里·契克森米哈赖提出：当任务难度略高于你的技能水平时，你会进入一种全然专注、忘记时间的最佳状态——心流。太简单→无聊；太难→焦虑；刚好→心流。次心流是指接近但未完全进入心流的专注状态，也有很高的效率。",
    keyInsight: "心流不是意志力的产物，而是环境设计的结果。找到挑战与能力的甜蜜点，排除干扰，心流就会自然发生。",
    cases: [
      { title: "🎮 打游戏为什么上瘾", content: "好的游戏会持续匹配你的技能水平调整难度——永远让你处于「有点难但能打过」的区间。这就是心流的设计。", type: "life" },
      { title: "💻 程序员的深度工作", content: "关掉通知、戴上耳机、解决一个有挑战的技术问题——2 小时不知不觉过去了，感觉「超爽」。这就是心流体验。", type: "business" },
      { title: "❌ 干扰破坏心流", content: "你正在专注写代码，微信弹了个消息。你只看了 3 秒，但重新进入心流需要 15-20 分钟。", type: "negative" }
    ],
    usage: { scenarios: ["提升工作和学习效率", "设计令人上瘾的产品", "运动和创作中追求巅峰表现"], steps: ["选择一个略高于当前水平的任务", "设定明确的目标和即时反馈机制", "排除所有干扰（手机静音、关门）", "持续至少 20-30 分钟让自己进入状态", "享受心流，不要中途打断"], pitfalls: ["心流不是随时都能进入的", "太累或太饿时很难进入心流", "不要把心流当成唯一高效的状态，次心流也很好"], combineWith: ["刻意练习", "中间态放松", "艾森豪威尔矩阵"] },
    memorySentence: "心流发生在挑战刚好超过能力一点点的时候。",
    furtherReading: ["《心流》米哈里·契克森米哈赖"], relatedModels: ["deliberate-practice", "middle-state-relaxation", "eisenhower-matrix"], updatedAt: "2026-04-22",
  },
  {
    id: "46", slug: "hook-model", title: "Hook上瘾模型", subtitle: "触发-行动-奖赏-投入，让用户欲罢不能",
    category: "business", tags: ["产品设计", "用户增长", "行为"], difficulty: 2, icon: "🪝",
    introduction: "尼尔·埃亚尔提出的上瘾模型包含四个步骤的循环：Trigger（触发，如推送通知）→ Action（行动，如打开App）→ Variable Reward（多变奖赏，如新内容）→ Investment（投入，如发表评论）。投入会创造下一次触发的基础，形成闭环。",
    keyInsight: "让用户上瘾的关键不是固定奖赏，而是「多变」奖赏——就像老虎机一样，不确定性才让人欲罢不能。",
    cases: [
      { title: "📱 刷短视频", content: "触发：推送通知；行动：打开刷视频；奖赏：每个视频都不一样（多变！）；投入：点赞评论关注（增加个性化推荐准确性→下次内容更好→更想刷）。", type: "business" },
      { title: "💬 社交媒体", content: "发了条朋友圈（投入）→有人点赞了（触发）→看看谁赞了（行动）→得到认可感（奖赏）→再发一条（投入）。完美闭环。", type: "life" },
      { title: "❌ 用于不道德目的", content: "赌博App利用Hook模型让人上瘾输钱。这个模型是中性的工具，但使用者要有道德底线。", type: "negative" }
    ],
    usage: { scenarios: ["产品设计和用户留存", "习惯养成", "社区运营", "理解自己为何上瘾"], steps: ["设计触发机制（外部→逐渐转为内部）", "让行动尽可能简单（降低门槛）", "提供多变的奖赏（不确定性）", "让用户有所投入（增加离开成本）"], pitfalls: ["要负责任地使用——不要设计让人痛苦的上瘾", "不是所有产品都需要上瘾循环", "多变奖赏不等于随机——要有意义"], combineWith: ["福格行为模型", "峰终定律", "反馈回路"] },
    memorySentence: "多变的奖赏 + 用户的投入 = 停不下来。",
    furtherReading: ["《上瘾》尼尔·埃亚尔"], relatedModels: ["fogg-behavior", "peak-end-rule", "feedback-loop"], updatedAt: "2026-04-22",
  },
  {
    id: "47", slug: "peak-end-rule", title: "峰终定律", subtitle: "人只记得高峰和结尾，不记得平均",
    category: "cognition", tags: ["体验设计", "心理学", "记忆"], difficulty: 1, icon: "📈",
    introduction: "卡尼曼发现人对体验的记忆取决于两个时刻：峰值（最强烈的瞬间）和终值（结束时的感受），而不是整体平均水平。一场两小时的电影，你记住的是最精彩的那幕和结局。",
    keyInsight: "你不需要让全程都完美——只需要制造一个令人难忘的高峰，再确保结尾是美好的。这比平庸的全程优秀更有效。",
    cases: [
      { title: "🎢 迪士尼体验", content: "排队 2 小时（痛苦），但过山车 3 分钟（巅峰）+ 出口处的精美周边和拍照点（结尾）。你回忆起来只觉得「太棒了」。", type: "business" },
      { title: "🍽️ 餐厅用餐", content: "菜品一般（平均体验），但甜品超级惊艳（峰值）+ 结账时送了一张下次 8 折券和一块巧克力（终值）。你觉得这家餐厅很棒。", type: "life" },
      { title: "❌ 虎头蛇尾", content: "一场演讲前 40 分钟精彩绝伦，但最后 5 分钟草草收场。观众的记忆是「结尾好烂」——终值糟糕毁掉了整体印象。", type: "negative" }
    ],
    usage: { scenarios: ["产品/服务体验设计", "演讲和汇报", "客户关系管理", "教学设计"], steps: ["找到体验中可以制造「高峰」的时刻", "精心设计这个峰值体验（超出期望）", "确保结尾让人带着好印象离开", "中间的平淡环节可以适当简化"], pitfalls: ["峰值不等于铺张——一个小惊喜就够了", "终值很容易被忽视——永远不要草草收尾", "不能有极差的谷底——负面峰值伤害更大"], combineWith: ["AISAS模型", "Hook上瘾模型", "首因效应"] },
    memorySentence: "人只记得最高潮和最后的感觉。",
    furtherReading: ["《思考，快与慢》丹尼尔·卡尼曼"], relatedModels: ["aisas-model", "hook-model", "primacy-recency"], updatedAt: "2026-04-22",
  },
  {
    id: "48", slug: "primacy-recency", title: "首因效应/近因效应", subtitle: "人最记得第一印象和最近的印象",
    category: "cognition", tags: ["心理学", "记忆", "沟通"], difficulty: 1, icon: "🔖",
    introduction: "首因效应：第一印象会主导后续判断。近因效应：最近的信息对判断影响最大。两者看似矛盾但共存——初次见面时首因效应主导，长期相处中近因效应更强。理解两者可以帮你更有策略地展现自己。",
    keyInsight: "第一印象和最后印象是你最重要的两次展示机会。中间的部分，人们记不太住。",
    cases: [
      { title: "💼 面试", content: "前 30 秒的仪表和自信（首因效应）+ 面试结束时的总结陈词（近因效应），这两个时刻比中间 30 分钟的回答更影响面试官的判断。", type: "life" },
      { title: "📊 汇报演讲", content: "开场就亮出核心结论（首因）+ 结尾用金句收尾（近因）。中间的论据可以多，但这两个点必须精心设计。", type: "business" },
      { title: "❌ 烂开头好中间", content: "一封邮件前两段废话连篇，虽然第三段写得很好，但领导可能根本没看到——首因效应让他失去了继续读的耐心。", type: "negative" }
    ],
    usage: { scenarios: ["面试和自我介绍", "演讲和汇报", "写作和邮件", "客户服务"], steps: ["精心准备开场（首因）——第一印象要强", "精心准备结尾（近因）——最后印象要美", "中间部分确保逻辑清晰即可", "重要信息放在开头或结尾"], pitfalls: ["不能只靠首因效应，后续表现也要跟上", "近因效应在长期关系中更重要", "负面的首因效应很难扭转"], combineWith: ["峰终定律", "金字塔原理", "SCQA模型"] },
    memorySentence: "精心准备你的第一句话和最后一句话。",
    furtherReading: ["《影响力》罗伯特·西奥迪尼"], relatedModels: ["peak-end-rule", "pyramid-principle", "scqa-model"], updatedAt: "2026-04-22",
  },
  {
    id: "49", slug: "moat-theory", title: "护城河理论", subtitle: "持久的竞争优势才是真正的护城河",
    category: "business", tags: ["投资", "竞争优势", "巴菲特"], difficulty: 2, icon: "🏰",
    introduction: "巴菲特最推崇的投资概念：好公司就像被宽阔护城河保护的城堡，竞争对手很难攻破。护城河的类型包括：品牌认知（可口可乐）、网络效应（微信）、成本优势（沃尔玛）、转换成本（企业级软件）、特许经营权（茅台）。",
    keyInsight: "不是所有优势都是护城河。真正的护城河是竞争对手即使看到了也无法复制的优势，而且它要随时间加深而非变浅。",
    cases: [
      { title: "💬 微信的网络效应", content: "你的朋友都在微信上，即使有更好的聊天工具你也不会换——因为换的成本是「说服所有朋友一起换」。这就是网络效应护城河。", type: "business" },
      { title: "🎯 个人的护城河", content: "你的护城河是什么？独特的技能组合？人脉网络？行业口碑？纯粹的努力不是护城河——因为别人也能努力。", type: "life" },
      { title: "❌ 以为低价是护城河", content: "很多创业公司靠烧钱补贴抢市场，以为这是竞争优势。但一旦补贴停止用户就走了——低价不是护城河，成本结构优势才是。", type: "negative" }
    ],
    usage: { scenarios: ["投资分析和选股", "商业竞争策略", "个人竞争优势建设", "创业方向评估"], steps: ["列出你/公司的竞争优势", "逐一检验：竞争对手能复制吗？复制需要多久？", "这个优势会随时间加深还是变浅？", "哪些是真正的护城河，哪些只是暂时优势？", "投资/建设真正的护城河"], pitfalls: ["护城河不是永恒的——诺基亚的护城河也被iPhone摧毁了", "要持续加深护城河", "不同行业护城河的类型不同"], combineWith: ["飞轮效应", "波特五力", "复利思维"] },
    memorySentence: "真正的优势是对手看得见却抄不走的。",
    furtherReading: ["《巴菲特的护城河》帕特·多尔西"], relatedModels: ["flywheel-effect", "porter-five-forces", "compound-effect"], updatedAt: "2026-04-22",
  },
  {
    id: "50", slug: "metacognition", title: "元认知", subtitle: "对自己思考过程的思考",
    category: "cognition", tags: ["认知", "自我觉察", "学习"], difficulty: 3, icon: "🔮",
    introduction: "元认知就是「对认知的认知」——你不仅在思考，还能意识到自己在怎么思考。就像在自己大脑里安装了一个监控摄像头，能观察到「我现在是在情绪化决策还是理性分析？」「我的注意力是不是分散了？」这种自我监控能力是高手和普通人最大的区别。",
    keyInsight: "普通人被思维带着走，高手在看着自己的思维走。元认知是所有认知升级的「操作系统」——没有它，其他思维模型都发挥不出来。",
    cases: [
      { title: "📝 考试策略", content: "普通学生：闷头做题做到结束。元认知强的学生：做题时会监控「这道题我确定吗？不确定就先标记跳过」「时间够吗？该加快了」。", type: "life" },
      { title: "🧑‍💼 会议中的觉察", content: "你在会议上要反驳一个人，元认知会提醒你：「等等，我是不是因为不喜欢这个人才反对？他的观点本身有没有道理？」", type: "business" },
      { title: "❌ 被情绪控制", content: "吵架时说了伤人的话，事后后悔。如果有元认知，你会在说出口前意识到「我现在在愤怒中，说出来会后悔」，从而忍住。", type: "negative" }
    ],
    usage: { scenarios: ["提升决策质量", "学习效率优化", "情绪管理", "所有认知活动"], steps: ["培养「观察者」视角——随时问自己「我现在在怎么想？」", "记录你的思维模式——什么情况下容易犯错？", "在做重要决策前暂停 10 秒——检查自己的思维状态", "定期复盘自己的思考过程，而不只是复盘结果"], pitfalls: ["过度自我监控会导致焦虑", "元认知是技能，需要长期练习", "冥想是训练元认知的好方法"], combineWith: ["卡尼曼双系统", "确认偏误", "邓宁-克鲁格效应"] },
    memorySentence: "普通人被思维带着走，高手在观察自己的思维。",
    furtherReading: ["《思维的本质》约翰·杜威"], relatedModels: ["kahneman-dual-system", "confirmation-bias", "dunning-kruger"], updatedAt: "2026-04-22",
  },
  {
    id: "51", slug: "yerkes-dodson", title: "耶克斯-多德森定律", subtitle: "适度的压力产生最佳表现",
    category: "efficiency", tags: ["心理学", "压力管理", "表现"], difficulty: 1, icon: "📊",
    introduction: "耶克斯-多德森定律揭示了压力/唤醒水平与表现之间的倒U型关系：压力太小→懈怠，表现差；压力适中→最佳表现；压力太大→焦虑崩溃，表现下降。最佳压力点因人因任务而异——简单任务可承受更高压力，复杂任务最佳压力点更低。",
    keyInsight: "零压力和高压力都是低效的。你要找到自己的甜蜜点——有挑战感但不至于焦虑。",
    cases: [
      { title: "🎯 考试压力", content: "完全不紧张的学生可能马虎大意；适度紧张的学生注意力集中表现最好；过度焦虑的学生大脑一片空白。", type: "life" },
      { title: "🏢 项目 Deadline", content: "没有截止日期的项目拖拖拉拉；合理的截止日期激发效率；不可能完成的截止日期导致团队崩溃。", type: "business" },
      { title: "❌ 鸡血管理", content: "某公司天天冲刺、周周 996，以为高压出高效。结果员工长期处于焦虑状态，创造力归零，离职率飙升。", type: "negative" }
    ],
    usage: { scenarios: ["压力管理和自我调节", "管理团队和设定目标", "考试和演讲前的状态调整"], steps: ["评估当前的压力水平", "如果太低→给自己设定更有挑战性的目标", "如果太高→简化任务、分解目标、减少干扰", "找到属于你的「甜蜜点」"], pitfalls: ["每个人的最佳压力点不同", "复杂脑力劳动需要更低的压力", "长期高压即使在「最佳点」也会导致倦怠"], combineWith: ["中间态放松", "心流与次心流", "艾森豪威尔矩阵"] },
    memorySentence: "不是越拼命越好——压力的甜蜜点才是真正的高效。",
    furtherReading: ["《压力的好处》凯利·麦格尼格尔"], relatedModels: ["middle-state-relaxation", "flow-state", "eisenhower-matrix"], updatedAt: "2026-04-22",
  },
  {
    id: "52", slug: "mvp", title: "MVP最小可行产品", subtitle: "用最小成本验证你的想法是否有人买单",
    category: "business", tags: ["创业", "产品", "精益"], difficulty: 1, icon: "🚀",
    introduction: "MVP（Minimum Viable Product）来自精益创业方法：不要花大量时间和金钱做一个「完美」的产品，而是用最小的成本做出一个能验证核心假设的最简版本，快速推向市场，收集反馈，再迭代改进。",
    keyInsight: "你觉得用户需要的，和用户真正需要的，往往是两回事。MVP 的目的不是做产品，而是验证假设。",
    cases: [
      { title: "📱 Dropbox", content: "Dropbox 的 MVP 不是一个真正的产品，而是一个 3 分钟的演示视频。视频发布后注册量从 5000 飙升到 75000——验证了需求确实存在。", type: "business" },
      { title: "🍰 测试创业想法", content: "想开烘焙店？MVP 不是租店面买设备，而是先在朋友圈卖 50 个蛋糕看看有没有人买、价格能不能覆盖成本。", type: "life" },
      { title: "❌ 闭门造车两年", content: "一个团队花了两年做出「完美产品」，上线后发现市场根本不需要这个功能。两年时间白费了——如果用 MVP 两个月就能知道。", type: "negative" }
    ],
    usage: { scenarios: ["创业验证想法", "新产品/功能上线", "任何需要验证假设的场景"], steps: ["明确你要验证的核心假设是什么", "找到验证这个假设的最低成本方式", "快速做出 MVP（可以很粗糙）", "推向真实用户收集反馈", "根据反馈决定：坚持、调整还是放弃"], pitfalls: ["MVP 不是半成品——它要能验证核心假设", "不要追求完美，要追求速度", "用户说的和用户做的可能不一样——看行为数据"], combineWith: ["PDCA循环", "销售漏斗", "帕累托法则"] },
    memorySentence: "先验证有人买单，再花时间做完美。",
    furtherReading: ["《精益创业》埃里克·莱斯"], relatedModels: ["pdca-cycle", "sales-funnel", "pareto-principle"], updatedAt: "2026-04-22",
  },
  {
    id: "53", slug: "long-tail-effect", title: "长尾效应", subtitle: "无数小众需求加起来比热门还大",
    category: "business", tags: ["互联网", "商业", "市场"], difficulty: 2, icon: "📏",
    introduction: "克里斯·安德森提出：在传统商业中，只有热门商品才能上货架。但互联网时代，无数冷门商品的累计销量可以超过热门——这就是「长尾」。亚马逊上 30% 的收入来自排名 10 万之后的书；Spotify 上大部分播放来自非榜单歌曲。",
    keyInsight: "互联网让「小众」变得有商业价值。你不需要服务所有人，只需要找到你的「一千个铁杆粉丝」。",
    cases: [
      { title: "📚 亚马逊的长尾", content: "实体书店只能摆 10 万种书，但亚马逊有几百万种。那些每年只卖几本的冷门书，加起来贡献了总收入的 1/3。", type: "business" },
      { title: "🎵 小众音乐人", content: "一个做冥想音乐的独立音乐人，在传统唱片业无法生存。但在 Spotify 上找到了全球 10 万个听众，足以养活自己。", type: "life" },
      { title: "❌ 只追热门", content: "所有人都在做热门品类（红海），却忽略了一个小众但忠诚的市场。结果在红海里血战，利润趋近于零。", type: "negative" }
    ],
    usage: { scenarios: ["产品和内容策略", "市场定位", "个人品牌建设", "投资分析"], steps: ["分析你的市场是否存在长尾", "评估服务长尾需求的边际成本", "如果成本足够低（数字产品），拥抱长尾", "在长尾中找到你的利基市场"], pitfalls: ["长尾策略需要海量SKU或内容，门槛不低", "不是所有行业都有长尾", "头部热门和长尾可以共存"], combineWith: ["帕累托法则", "MVP最小可行产品", "护城河理论"] },
    memorySentence: "不需要服务所有人，找到你的一千个铁杆粉丝就够了。",
    furtherReading: ["《长尾理论》克里斯·安德森"], relatedModels: ["pareto-principle", "mvp", "moat-theory"], updatedAt: "2026-04-22",
  },
  {
    id: "54", slug: "barrel-principle", title: "(反)木桶原理", subtitle: "短板决定容量，但长板决定高度",
    category: "system", tags: ["战略", "个人成长", "系统"], difficulty: 1, icon: "🪣",
    introduction: "经典木桶原理说：一只木桶装多少水取决于最短的板。但在现代社会，反木桶原理同样重要：你的核心竞争力（最长的板）决定了你能达到的高度，短板可以通过团队、外包来补。个人应该把长板做到极致，企业应该看情况平衡。",
    keyInsight: "木桶原理适合补短板场景（如安全、合规），反木桶原理适合竞争场景（如个人发展、创业）。关键是分清什么时候该补短板，什么时候该拉长板。",
    cases: [
      { title: "👤 个人发展", content: "你演讲能力 90 分、写代码 60 分。与其花大量时间把代码提到 75 分，不如把演讲提到 98 分——那是你的独特竞争力。代码可以找人合作。", type: "life" },
      { title: "🏢 团队组合", content: "乔布斯不懂技术（短板），但他有沃兹尼亚克（技术长板）。他把自己的产品直觉和营销（长板）发挥到极致。", type: "business" },
      { title: "❌ 什么都补什么都不精", content: "一个人花 10 年把自己的每项技能都提到「还行」的水平，但没有任何一项能达到「出色」。结果在哪个领域都没有竞争力。", type: "negative" }
    ],
    usage: { scenarios: ["个人成长规划", "团队组建", "企业战略", "资源分配"], steps: ["识别你的长板和短板", "判断短板是否致命（安全/底线问题→必须补）", "如果短板不致命→聚焦长板，短板外包或团队互补", "把长板做到前 1%，比什么都强"], pitfalls: ["有些短板确实必须补（如职业道德、基本技能）", "长板也需要市场需求——别做「屠龙之技」", "在个人和团队层面，策略可能不同"], combineWith: ["帕累托法则", "能力圈", "T型人才"] },
    memorySentence: "在安全上补短板，在竞争中拉长板。",
    furtherReading: ["《优势》马库斯·白金汉"], relatedModels: ["pareto-principle", "circle-of-competence"], updatedAt: "2026-04-22",
  },
  {
    id: "55", slug: "sunk-cost", title: "沉没成本", subtitle: "已经花掉的钱不应该影响未来的决策",
    category: "decision", tags: ["决策", "经济学", "心理学"], difficulty: 1, icon: "💸",
    introduction: "沉没成本是已经付出且无法收回的成本。理性的决策应该只看未来的收益和成本，不应该被已经沉没的部分影响。但人们总觉得「都花了这么多了，不能浪费」——这就是沉没成本谬误。",
    keyInsight: "「已经投入了这么多」不是继续投入的好理由。唯一的问题是：从现在开始，继续值不值得？",
    cases: [
      { title: "🎬 看烂电影", content: "花了 80 块看电影，30 分钟后发现是烂片。你应该走人还是「看都来了就看完吧」？理性答案：走人——那 80 块已经沉没了。", type: "life" },
      { title: "🏗️ 英法协和号", content: "英法两国投了几十亿研发超音速客机，中途发现不经济。但因为「已经投了这么多」继续投入，最终整个项目亏损。这成了「协和号谬误」的经典案例。", type: "business" },
      { title: "❌ 不舍得离开错误的关系", content: "在一段不健康的关系里待了 5 年。「都 5 年了」不是继续忍受的理由——应该问「未来的 5 年会更好吗？」", type: "negative" }
    ],
    usage: { scenarios: ["投资止损决策", "项目是否继续", "人生选择", "消费决策"], steps: ["识别决策中的沉没成本是什么", "把沉没成本从决策因素中去掉", "只看：从现在开始，继续的预期收益 vs 成本", "如果不值得→果断止损，即使「浪费了」前期投入"], pitfalls: ["人天生厌恶损失，要克服这个本能", "有时候「坚持」确实是对的——要区分「坚持」和「沉没成本谬误」", "及时止损是能力，不是失败"], combineWith: ["机会成本", "反转思维", "10/10/10法则"] },
    memorySentence: "覆水难收——只看前方，不要为打翻的牛奶哭泣。",
    furtherReading: ["《思考，快与慢》丹尼尔·卡尼曼"], relatedModels: ["opportunity-cost", "inversion", "ten-ten-ten-rule"], updatedAt: "2026-04-22",
  },
  {
    id: "56", slug: "opportunity-cost", title: "机会成本", subtitle: "选择做一件事的代价是放弃了其他所有选项",
    category: "decision", tags: ["经济学", "决策", "取舍"], difficulty: 1, icon: "⚖️",
    introduction: "机会成本是经济学最基础的概念：你做任何选择的真正成本不是你花了多少钱，而是你因此放弃的最佳替代方案的价值。花一个下午刷短视频的机会成本不是零——是你本可以用来学习、运动或陪家人的时间。",
    keyInsight: "免费的东西其实最贵——因为你付出了时间。时间是每个人最大的机会成本。",
    cases: [
      { title: "⏰ 时间的机会成本", content: "你周末花 8 小时排队买限量球鞋。省了 500 块？不——你的 8 小时本可以加班赚 2000 块、或学一个技能、或陪家人。", type: "life" },
      { title: "💰 投资选择", content: "把 100 万存银行年利率 3%。机会成本是：如果投指数基金可能赚 10%。这 7% 的差异就是你的机会成本。", type: "business" },
      { title: "❌ 忽视隐性成本", content: "「这个会议免费参加」——但你花了半天时间+来回交通。如果这半天做更有价值的事，机会成本可能是几千块。", type: "negative" }
    ],
    usage: { scenarios: ["时间分配决策", "投资选择", "职业规划", "任何需要取舍的场景"], steps: ["明确你正在考虑的选择", "列出你因此放弃的替代方案", "评估最佳替代方案的价值", "如果当前选择的收益 < 最佳替代方案的收益，就该换"], pitfalls: ["不要陷入「分析瘫痪」——适当简化比较", "机会成本是主观的，不是精确计算", "有时非经济价值（快乐、成长）也是重要的收益"], combineWith: ["沉没成本", "帕累托法则", "艾森豪威尔矩阵"] },
    memorySentence: "做任何事的真正代价，是你放弃了其他所有事。",
    furtherReading: ["《经济学原理》曼昆"], relatedModels: ["sunk-cost", "pareto-principle", "eisenhower-matrix"], updatedAt: "2026-04-22",
  },
  {
    id: "57", slug: "matthew-effect", title: "马太效应", subtitle: "强者越强，弱者越弱",
    category: "system", tags: ["社会学", "系统", "不平等"], difficulty: 1, icon: "📈",
    introduction: "马太效应源自《圣经·马太福音》：「凡有的，还要加给他，叫他有余；凡没有的，连他所有的也要夺过来。」在现实中，初始优势会通过正反馈不断放大——名校毕业生更容易进好公司→获得更多资源→更优秀。理解马太效应，才能有意识地创造初始优势。",
    keyInsight: "起点的微小差距会被时间放大到巨大鸿沟。所以：尽早获得你的第一个优势，哪怕很小。",
    cases: [
      { title: "📚 学术引用", content: "被引用多的论文更容易被看到→被更多人引用→引用数越来越高。新论文很难突破「零引用」的冷启动。", type: "business" },
      { title: "💪 早起锻炼", content: "坚持早起锻炼→精力好→工作效率高→有更多自由时间→更容易坚持锻炼。反之：不锻炼→身体差→效率低→更没时间锻炼。", type: "life" },
      { title: "❌ 贫困陷阱", content: "穷→无法接受好教育→只能做低薪工作→继续穷。这就是马太效应的阴暗面——不平等会自我加强。", type: "negative" }
    ],
    usage: { scenarios: ["理解社会不平等", "创业冷启动策略", "个人发展规划", "投资分析"], steps: ["识别你的领域中马太效应在哪里起作用", "尽早建立你的初始优势（第一个客户、第一个作品）", "利用正反馈循环放大优势", "帮助弱势方打破马太效应的锁定"], pitfalls: ["马太效应不是不可打破的", "有时颠覆性创新可以重置游戏", "不要用马太效应为不公平辩护"], combineWith: ["飞轮效应", "复利思维", "反馈回路"] },
    memorySentence: "赢在起点很重要，因为优势会自我放大。",
    furtherReading: ["《异类》马尔科姆·格拉德威尔"], relatedModels: ["flywheel-effect", "compound-effect", "feedback-loop"], updatedAt: "2026-04-22",
  },
  {
    id: "58", slug: "murphys-law", title: "墨菲定律", subtitle: "如果一件事可能出错，它就一定会出错",
    category: "system", tags: ["风险", "工程", "规律"], difficulty: 1, icon: "⚠️",
    introduction: "墨菲定律不是悲观主义，而是工程学的智慧：如果一件坏事有可能发生，那么在足够长的时间内，它一定会发生。因此，不要假设「应该不会出问题」，而是提前假设「一定会出问题」并做好准备。",
    keyInsight: "不是「会不会出问题」，而是「什么时候出问题」。提前准备的人叫高手，事后补救的人叫救火队长。",
    cases: [
      { title: "💻 代码上线", content: "「这个改动很小，不用测了」——然后线上炸了。墨菲定律说：只要有可能出bug，就一定会出。所以必须测试。", type: "business" },
      { title: "🌧️ 出门带伞", content: "「看起来不会下雨」——结果淋成落汤鸡。墨菲定律的实践：出门带把折叠伞，成本很低但收益很大。", type: "life" },
      { title: "❌ 没有备份的U盘", content: "「U盘应该不会丢吧」→毕业答辩前一天U盘坏了，论文全没了。", type: "negative" }
    ],
    usage: { scenarios: ["项目风险管理", "系统设计", "日常生活风险防范", "重要场合准备"], steps: ["列出所有可能出错的环节", "为每个环节准备应对方案", "做最好的计划，做最坏的打算", "定期进行故障演练"], pitfalls: ["不要因此变得过度焦虑", "要评估概率和影响——不是所有风险都值得防范", "防范成本不能超过风险本身"], combineWith: ["冗余备份", "安全边际", "反转思维"] },
    memorySentence: "能出错的，迟早会出错——所以提前准备。",
    furtherReading: ["《反脆弱》纳西姆·塔勒布"], relatedModels: ["redundancy-backup", "safety-margin", "inversion"], updatedAt: "2026-04-22",
  },
  {
    id: "59", slug: "parkinsons-law", title: "帕金森定律", subtitle: "工作会膨胀到填满可用的时间",
    category: "efficiency", tags: ["时间管理", "效率", "拖延"], difficulty: 1, icon: "⏳",
    introduction: "帕金森定律指出：工作会自动膨胀以填满分配给它的时间。给你一周写报告，你就会用一周；给你一天，你也能完成——而且质量可能差不多。这意味着：给自己设定更紧凑的截止日期，反而能提高效率。",
    keyInsight: "你不是没时间，而是时间太多了。适当的时间压力是效率的催化剂。",
    cases: [
      { title: "📝 写方案", content: "老板说「下周五交」，你周一到周四都在「思考」，周五才开始写。如果截止日期是周三，你周一就会开始——而且完成得不比周五差。", type: "life" },
      { title: "🏢 会议时间", content: "1 小时的会议经常开到 1 小时 45 分钟还没结论。改成 30 分钟限时会议后，效率反而更高。", type: "business" },
      { title: "❌ 无限延期的项目", content: "「什么时候都行」的项目永远做不完。因为没有时间压力，工作就会无限膨胀。", type: "negative" }
    ],
    usage: { scenarios: ["时间管理", "项目管理", "会议效率", "个人效率提升"], steps: ["给每项任务设定比预期更紧凑的截止日期", "把大任务拆成小块，每块给短期限", "用「限时」方法：这个任务只给自己 2 小时", "完成比完美重要——先交付再优化"], pitfalls: ["过于紧凑的时间可能导致质量下降", "需要区分可以压缩的任务和不能压缩的", "有些创造性工作确实需要足够的酝酿时间"], combineWith: ["帕累托法则", "PDCA循环", "艾森豪威尔矩阵"] },
    memorySentence: "给自己更少的时间，你会发现其实够用。",
    furtherReading: ["《帕金森定律》C.N.帕金森"], relatedModels: ["pareto-principle", "pdca-cycle", "eisenhower-matrix"], updatedAt: "2026-04-22",
  },
  {
    id: "60", slug: "peter-principle", title: "彼得原理", subtitle: "每个人都会被提拔到他不能胜任的位置",
    category: "cognition", tags: ["管理", "组织", "晋升"], difficulty: 2, icon: "📊",
    introduction: "彼得原理由劳伦斯·彼得提出：在层级组织中，每个员工都因为当前岗位表现好而被提拔，直到被提拔到一个他无法胜任的岗位。最终，每个位置都由不能胜任的人占据。一个优秀的程序员不一定是好的技术主管，一个好的销售不一定是好的销售总监。",
    keyInsight: "上一个岗位干得好≠下一个岗位也能干好。晋升应该看未来的能力匹配度，而不只是奖励过去的成绩。",
    cases: [
      { title: "💻 程序员→管理者", content: "最好的程序员被提拔为 Tech Lead，但他不擅长沟通和管理，团队反而效率下降。公司同时失去了一个好工程师和拥有了一个差管理者。", type: "business" },
      { title: "⚽ 球员→教练", content: "马拉多纳是伟大的球员，但当教练的成绩很一般。因为踢球和教球需要完全不同的能力。", type: "life" },
      { title: "❌ 强制晋升", content: "一家公司的晋升通道只有「管理」一条路，逼着技术专家做管理。结果大量优秀专家因为「不想管人」而离职。", type: "negative" }
    ],
    usage: { scenarios: ["组织设计和晋升机制", "个人职业规划", "选拔管理者", "自我认知"], steps: ["晋升评估要看未来岗位所需能力，而非当前绩效", "建立双通道晋升体系（管理线+专业线）", "自我审视：晋升后需要什么新能力？我准备好了吗？", "接受「有些人在当前位置就是最佳状态」"], pitfalls: ["不是所有人都想晋升——尊重个人选择", "可以通过培训帮人准备好再晋升", "不要为了留人而强制晋升"], combineWith: ["能力圈", "邓宁-克鲁格效应", "GROW成长模型"] },
    memorySentence: "好员工不等于好主管——晋升要看未来的能力匹配。",
    furtherReading: ["《彼得原理》劳伦斯·彼得"], relatedModels: ["circle-of-competence", "dunning-kruger", "grow-model"], updatedAt: "2026-04-22",
  },
];
