const messages = {
  zh: {
    metaTitle: "P、NP 与 P vs NP",
    languageSwitch: "语言",
    tocLabel: "章节目录",
    tocTitle: "章节",
    localNavLabel: "项目内导航",
    kicker: "可计算理论入门",
    title: "P、NP 与 P vs NP",
    lead:
      "计算机科学不只问“能不能算”，也问“要花多久算”。这页用一组小模型解释：可计算理论如何划边界，P 为什么代表高效求解，NP 为什么代表高效验证，NP-hard 为什么是“至少一样难”，以及 P vs NP 到底悬在哪里。",
    mapZero: "0 先看直觉",
    mapOne: "1 可计算",
    mapTwo: "2 P",
    mapThree: "3 NP",
    mapFour: "4 NP-hard",
    mapFive: "5 P vs NP",
    mapSix: "6 NP-complete",
    mapSeven: "7 为什么重要",
    mapEight: "8 证明要什么",
    mapNine: "9 收束",
    mapLabel: "章节地图",
    chapterZeroEyebrow: "第 0 章：先看直觉",
    chapterZeroTitle: "找答案和验答案，可能完全不是一回事",
    chapterZeroTextA:
      "想象朋友说“我能用这几张优惠券正好凑出 22 元”。如果他把优惠券递给你，你只要把数字加起来就能检查；但如果他什么都不给，你可能要试很多组合。P vs NP 的入口，就是这个“寻找”和“验证”的落差。",
    chapterZeroTextB:
      "这页先把问题分层：有些问题连通用算法都没有；有些能算而且已知高效；有些答案好验但不好找；还有些问题至少和整个 NP 家族一样难。后面的九章会把这条路线展开。",
    chapterZeroLongSummary: "展开：为什么要从“是/否问题”开始",
    chapterZeroLongText:
      "P、NP、NP-complete 这些术语在正式理论中主要描述判定问题，也就是答案只有“是”或“否”的问题。很多优化任务可以改写成判定版，例如“最短路有多短”可以改成“是否存在长度不超过 K 的路径”。这样做让不同问题可以放在同一个比较框架里。",
    decisionFormula: "\\[\\Pi=\\{x\\mid \\operatorname{answer}(x)=\\text{yes}\\}\\]",
    outlineModelTitle: "1. 先建模",
    outlineModelText: "把“最短路线是多少”改成“是否存在长度不超过 K 的路线”。判定版让不同问题可以比较。",
    outlineCostTitle: "2. 再看增长",
    outlineCostText: "同样是能算，\\(n^3\\) 和 \\(2^n\\) 在规模变大后是两种世界。",
    outlineVerifyTitle: "3. 区分找和验",
    outlineVerifyText: "子集和的候选集合很好检查，但从零开始找候选集合会遭遇组合爆炸。",
    outlineReduceTitle: "4. 用归约比较难度",
    outlineReduceText: "如果 SAT 能翻译成某问题，那个问题至少继承了 SAT 的困难。",
    conceptsLabel: "关键概念",
    conceptTreeLink: "概念树",
    directoryLink: "目录",
    singleLink: "单页版",
    chapterOneEyebrow: "第一章：可计算理论",
    chapterOneTitle: "先问一个问题有没有通用算法",
    chapterOneTextA:
      "一个计算问题通常是一批输入配一个期望输出。可计算理论先不关心速度，而是问：是否存在一套机械步骤，对所有合法输入都能停下来并给出正确答案？如果能，这个问题就是可判定的。",
    chapterOneTextB:
      "这个边界并不平凡。停机问题说明：给定一段程序和输入，判断程序最终会不会停，不存在一个万能算法能对所有情况都正确回答。复杂度理论研究的是可判定问题中的下一层：哪些问题不只是能算，而且能在现实规模下有效地算。",
    chapterOneFormula:
      "形式化地说，可判定语言 \\(L\\) 存在一个算法 \\(A\\)，使得对任意输入 \\(x\\)，\\(A(x)\\) 都会停机并正确判断 \\(x\\in L\\)。",
    haltingSketchTitle: "停机问题的反证骨架",
    haltingSketchText:
      "假设有万能判定器 H(P,x)。构造程序 D(P)：如果 H 说 P(P) 会停，D 就故意死循环；如果 H 说不会停，D 就立刻停。问 D(D) 会怎样，就得到矛盾。",
    decidableExampleTitle: "可判定但不一定高效",
    decidableExampleText:
      "国际象棋在有限棋盘上理论可判定，但这不等于人类能轻松穷举。可计算理论解决“有没有算法”，复杂度理论再问“代价多大”。",
    boundaryToolTitle: "三种边界的对比",
    boundaryToolIntro: "选择一个问题，观察它落在“能否判定”和“是否高效”的哪一层。",
    caseButtons: "问题案例",
    decidableLabel: "可判定",
    efficientLabel: "已知高效",
    openLabel: "开放/困难",
    chapterTwoEyebrow: "第二章：P 与增长率",
    chapterTwoTitle: "P 不是“小输入很快”，而是增长方式温和",
    chapterTwoTextA:
      "P 是 Polynomial time，多项式时间。它把“高效”形式化为：存在一个算法，它的步数最多像 \\(n\\)、\\(n^2\\)、\\(n^3\\) 或 \\(n^k\\) 那样随输入规模 \\(n\\) 增长。常数和机器速度会影响短跑，多项式与指数的差别决定长跑。",
    chapterTwoTextB:
      "注意 P 是最坏情况的理论分类，不等于“所有实例都瞬间完成”。一个 \\(n^3\\) 算法也可能很慢，一个指数算法也可能在小输入上很快。P 的价值在于：规模继续增加时，我们仍然有可预期的上界。",
    chapterTwoFormula: "\\[\\mathrm{P}=\\bigcup_{k\\ge 1}\\mathrm{TIME}(n^k)\\]",
    inputSizeTitle: "输入规模不是数值大小",
    inputSizeText:
      "数字 T 的输入长度约是 log T。子集和的动态规划 O(nT) 对 T 看似多项式，但对输入位数可能仍是指数级，这叫伪多项式。",
    worstCaseTitle: "P 说的是最坏情况上界",
    worstCaseText:
      "一个算法在随机样本上快，不代表属于 P；需要证明对所有长度为 n 的输入，都有统一的多项式上界。",
    growthToolTitle: "增长率模拟器",
    growthToolIntro: "假设每一步用 1 微秒，调节规模 n，比较多项式、指数和阶乘增长。",
    growthFormula:
      "比较 \\(n^2\\)、\\(n^3\\)、\\(2^n\\) 和 \\(n!\\) 时，关键不是某个点，而是 \\(n\\to\\infty\\) 时的增长趋势。",
    sizeLabel: "输入规模 n",
    growthCaveat: "条形宽度使用对数比例。否则指数和阶乘会让多项式条形几乎看不见。",
    chapterThreeEyebrow: "第三章：NP 与证据",
    chapterThreeTitle: "寻找答案可能很难，检查答案可以很快",
    chapterThreeTextA:
      "NP 不是“非多项式”的缩写。它来自 nondeterministic polynomial time，在入门理解里可以先记成：对一个“是”的答案，存在一份短证据，验证器可以在多项式时间内检查这份证据。",
    chapterThreeTextB:
      "例如子集和问题问：给定一组数，是否能挑出一些刚好凑成目标值？如果有人给出被挑中的数，验证只需要求和并比较目标。真正困难的是：没有人告诉你证据时，怎样避免枚举所有可能子集。",
    chapterThreeFormula:
      "\\[\\mathrm{NP}=\\{L\\mid \\exists V,c,\\;x\\in L\\iff \\exists y,\\ |y|\\le |x|^c\\land V(x,y)=1\\}\\]",
    satCertTitle: "SAT 的证据",
    satCertText: "布尔公式是否可满足？证据是一组变量赋值。验证器只需把赋值代回公式，逐个子句检查是否为真。",
    hamCertTitle: "哈密顿路径的证据",
    hamCertText: "图中是否有一条路经过每个点恰好一次？证据是一串顶点顺序。验证器检查相邻顶点有边且没有重复。",
    verifierToolTitle: "子集和验证器",
    verifierToolIntro: "目标是 22。勾选一组数，页面只做验证；它不会替你聪明地搜索。",
    numberGrid: "候选数字",
    subsetFormula: "证据成立时满足 \\(\\sum_{i\\in S}a_i=22\\)。",
    searchSpaceLabel: "暴力寻找",
    searchSpaceUnit: "个候选子集",
    verifyCostLabel: "检查证据",
    verifyCostUnit: "次加法以内",
    chapterFourEyebrow: "第四章：NP-hard 与归约",
    chapterFourTitle: "“至少一样难”来自把一个问题翻译成另一个问题",
    chapterFourTextA:
      "归约是复杂度理论的翻译器。如果任何 NP 问题都能在多项式时间内翻译成问题 X，那么 X 就是 NP-hard：解决 X 至少不比解决整个 NP 家族容易。",
    chapterFourTextB:
      "如果 \\(X\\) 同时属于 \\(\\mathrm{NP}\\)，它就是 \\(\\mathrm{NP}\\text{-}\\mathrm{complete}\\)。NP-complete 问题像路标：只要其中一个被证明有多项式时间算法，整个 \\(\\mathrm{NP}\\) 都会落进 \\(\\mathrm P\\)；反过来，只要证明其中一个不在 \\(\\mathrm P\\)，就能得到 \\(\\mathrm P\\ne\\mathrm{NP}\\)。",
    chapterFourFormula:
      "\\[A\\le_p B \\quad\\Longleftrightarrow\\quad \\exists f\\in\\mathrm{polytime},\\;x\\in A\\iff f(x)\\in B\\]",
    reductionDirectionTitle: "归约方向不能反",
    reductionDirectionText: "要证明 B 难，应该把已知困难的 A 翻译到 B。若只证明 B 能翻译到 A，只能说明 B 不比 A 更难。",
    reductionUseTitle: "归约的两种读法",
    reductionUseText: "如果 A≤pB 且 B 有快速算法，A 也快；如果 A 已知很难且 A≤pB，那么 B 至少同样难。",
    reductionToolTitle: "归约地图",
    reductionToolIntro: "选择一个目标问题，观察“已知困难问题可以翻译过去”这句话的含义。",
    reductionButtons: "归约目标问题",
    chapterFiveEyebrow: "第五章：P vs NP",
    chapterFiveTitle: "容易验证是否等于容易找到？",
    chapterFiveTextA:
      "我们已经知道 P 包含在 NP 里：会快速求解的问题，当然也能快速验证。未知的是 NP 里那些有短证据的问题，是否都存在某种尚未发现的快速搜索方法。",
    chapterFiveTextB:
      "大多数研究者相信 \\(\\mathrm P\\ne\\mathrm{NP}\\)，但这仍是开放问题。它重要不是因为某个单一谜题，而是因为它连接了搜索、证明、密码、优化、程序验证和自动推理。",
    chapterFiveFormula: "\\[\\mathrm{P}\\subseteq\\mathrm{NP},\\qquad \\mathrm{P}\\stackrel{?}{=}\\mathrm{NP}\\]",
    searchVsDecisionTitle: "搜索版和判定版会互相牵动",
    searchVsDecisionText:
      "对子集和，若能快速回答“是否存在解”，可以逐个尝试保留或删去数字，多次调用判定器构造出一个解。",
    notMagicTitle: "P=NP 不等于马上万事可解",
    notMagicText:
      "即使 P=NP，算法的次数可能是 n^100 或常数巨大；理论结论会改变边界，但工程上还要看具体算法。",
    relationButtons: "P 与 NP 的可能关系",
    chapterSixEyebrow: "第六章：NP-complete",
    chapterSixTitle: "NP-complete 是“既在 NP 里，又足够难”",
    chapterSixTextA:
      "NP-hard 只说一个问题至少和 NP 中所有问题一样难；NP-complete 还要求它自己也属于 NP。也就是说，它的“是”答案必须有短证据可快速检查。",
    chapterSixTextB:
      "这就是为什么判定版常被拿来讲理论：它们既能表达搜索困难，又能让“证据能否快速验证”这件事变得清楚。",
    chapterSixFormula:
      "\\[X\\in\\mathrm{NP}\\text{-}\\mathrm{complete}\\iff X\\in\\mathrm{NP}\\land \\forall L\\in\\mathrm{NP},\\;L\\le_p X\\]",
    cookLevinTitle: "第一个路标：Cook-Levin",
    cookLevinText: "SAT 是第一个被证明 NP-complete 的问题。直觉是：把“验证器的运行历史”编码成一个布尔公式。",
    npcChainTitle: "常见链条",
    npcChainText: "SAT → 3-SAT → Clique → Vertex Cover → Hamiltonian Cycle。每一步都是保持答案的多项式翻译。",
    completeToolTitle: "NP-complete 检查表",
    completeCheckOne: "属于 NP",
    completeCheckOneText: "给出证据后，可以在多项式时间内验证。",
    completeCheckTwo: "NP-hard",
    completeCheckTwoText: "每个 NP 问题都能高效归约到它。",
    completeCheckThree: "于是成为路标",
    completeCheckThreeText: "解决一个，就会牵动整个 NP 家族。",
    chapterSevenEyebrow: "第七章：为什么重要",
    chapterSevenTitle: "P vs NP 影响的是“自动找到结构”的能力",
    chapterSevenTextA:
      "如果 \\(\\mathrm P=\\mathrm{NP}\\)，许多需要搜索证据的任务都会突然拥有通用快速算法。密码、规划、排程、芯片验证和自动证明都会被重新理解。",
    chapterSevenTextB:
      "如果 \\(\\mathrm P\\ne\\mathrm{NP}\\)，它解释了为什么很多问题可以被人类或程序轻松检查，却仍然没有统一的快速寻找方法。",
    chapterSevenFormula: "密码学常依赖单向直觉：计算 \\(f(x)\\) 容易，反求 \\(x\\) 困难。",
    scheduleExampleTitle: "排程例子",
    scheduleExampleText: "给 30 门课排考场，约束包括不冲突、容量、教师时间。给出排表后检查很快，从零找排表却可能爆炸。",
    proofExampleTitle: "自动证明例子",
    proofExampleText: "一份短证明可以逐行检查；但自动找到证明可能要在巨大的推理树中搜索。",
    impactToolTitle: "影响地图",
    impactCryptoTitle: "密码",
    impactCryptoText: "许多方案依赖“验证容易、反推困难”的落差。",
    impactOptTitle: "优化",
    impactOptText: "排程、路线和资源分配常会碰到组合爆炸。",
    impactProofTitle: "证明",
    impactProofText: "短证明容易检查，但自动找到证明可能很难。",
    chapterEightEyebrow: "第八章：证明要什么",
    chapterEightTitle: "一个例子跑得快，不等于证明 \\(\\mathrm P=\\mathrm{NP}\\)",
    chapterEightTextA:
      "P vs NP 是关于所有输入规模、所有实例、所有 NP 问题的命题。一个启发式算法在常见数据上很好用，不足以证明最坏情况下有多项式时间算法。",
    chapterEightTextB:
      "真正的证明必须给出通用算法或不可避免的下界。它要处理的是整个问题类，而不是某个漂亮样例。",
    chapterEightFormula:
      "\\[\\mathrm{P}\\ne\\mathrm{NP}\\ \\text{可由}\\ \\mathrm{SAT}\\notin\\bigcup_{k\\ge1}\\mathrm{TIME}(n^k)\\ \\text{推出}\\]",
    chapterEightLongSummary: "展开：常见误解",
    chapterEightLongText:
      "“没有找到快速算法”不能证明 \\(\\mathrm P\\ne\\mathrm{NP}\\)；“某些实例很快”也不能证明 \\(\\mathrm P=\\mathrm{NP}\\)。复杂度理论要的是严格上界或下界，所以直觉、实验和工程经验只能提供线索，不能替代证明。",
    proofBarrierTitle: "为什么证明难",
    proofBarrierText:
      "已有许多证明技术会碰到障碍，例如相对化、自然证明和代数化。它们不是结论，而是在提醒“常规套路不够”。",
    heuristicTitle: "启发式不等于复杂度结论",
    heuristicText:
      "SAT solver 在工业实例上很强，但这说明实例结构可利用，不说明所有 SAT 实例都有多项式时间算法。",
    proofToolTitle: "证明目标对照",
    proofWouldTitle: "需要证明",
    proofWouldText: "对整个 NP 家族给出统一多项式算法，或证明某个 NP-complete 问题不可能有多项式算法。",
    proofNotTitle: "不够证明",
    proofNotText: "只展示若干实例、平均数据、工程启发式，或“我们试过还没找到”。",
    conclusionEyebrow: "第九章：结论",
    conclusionTitle: "一条主线：能算、好算、好检查，不是同一件事",
    conclusionTextA:
      "可计算理论告诉我们，有些问题根本没有通用判定算法。复杂度理论进一步区分：在可判定的问题里，哪些能高效求解，哪些只能高效验证，哪些至少和 NP 中所有问题一样难。",
    conclusionTextB:
      "读 P vs NP 时，最重要的直觉不是背术语，而是抓住这组差别：“我能不能确认一个答案是对的？”与“我能不能自己快速找到这个答案？”可能相距很远。",
    conclusionFormula:
      "\\[\\text{可判定}\\supseteq\\mathrm{NP}\\supseteq\\mathrm{P},\\qquad \\mathrm{NP}\\text{-}\\mathrm{complete}\\subseteq\\mathrm{NP}\\]",
    finalChecklistTitle: "读完应能判断",
    finalChecklistText:
      "给一个新问题，先问是不是判定问题；再问是否已知 P；若属于 NP，找证据和验证器；若要证明困难，找从已知 NP-complete 问题来的归约。",
    finalExampleTitle: "完整例子：旅行商",
    finalExampleText:
      "“最短巡回路线多长”是优化版；“是否存在长度不超过 K 的巡回路线”是判定版。给出路线后容易验，判定版是 NP-complete，优化版是 NP-hard。",
  },
  en: {
    metaTitle: "P, NP, and P vs NP",
    languageSwitch: "Language",
    tocLabel: "Chapter directory",
    tocTitle: "Chapters",
    localNavLabel: "Local navigation",
    kicker: "A gentle guide to computability",
    title: "P, NP, and P vs NP",
    lead:
      "Computer science asks not only whether something can be computed, but also how long it takes. This page uses a set of small models to explain computability, P, NP, NP-hardness, and the open P vs NP question.",
    mapZero: "0 Intuition first",
    mapOne: "1 Computable",
    mapTwo: "2 P",
    mapThree: "3 NP",
    mapFour: "4 NP-hard",
    mapFive: "5 P vs NP",
    mapSix: "6 NP-complete",
    mapSeven: "7 Why it matters",
    mapEight: "8 What proof needs",
    mapNine: "9 Takeaway",
    mapLabel: "Chapter map",
    chapterZeroEyebrow: "Chapter 0: Intuition first",
    chapterZeroTitle: "Finding an answer and checking one can be very different",
    chapterZeroTextA:
      "Imagine a friend says, “I can pick these coupons to make exactly 22.” If they hand you the coupons, you only add the numbers to check. If they give you nothing, you may have to try many combinations. P vs NP begins with this gap between finding and verifying.",
    chapterZeroTextB:
      "This page first separates the layers: some problems have no general algorithm, some are computable and known to be efficient, some have answers that are easy to verify but hard to find, and some are at least as hard as the whole NP family. The nine chapters below unpack that path.",
    chapterZeroLongSummary: "Expand: why start with yes/no problems",
    chapterZeroLongText:
      "P, NP, and NP-complete are formally defined mainly for decision problems, where the answer is yes or no. Many optimization tasks can be rewritten as decision versions, such as turning “how short is the shortest path?” into “is there a path of length at most K?” That lets different problems live inside one comparison frame.",
    decisionFormula: "\\[\\Pi=\\{x\\mid \\operatorname{answer}(x)=\\text{yes}\\}\\]",
    outlineModelTitle: "1. Model first",
    outlineModelText: "Turn “how short is the route?” into “is there a route of length at most K?” Decision versions make problems comparable.",
    outlineCostTitle: "2. Then study growth",
    outlineCostText: "Both may be computable, but \\(n^3\\) and \\(2^n\\) become different worlds as scale grows.",
    outlineVerifyTitle: "3. Separate finding from checking",
    outlineVerifyText: "A subset-sum candidate is easy to check, but finding one from scratch can face combinatorial explosion.",
    outlineReduceTitle: "4. Compare difficulty by reduction",
    outlineReduceText: "If SAT translates into a problem, that problem inherits at least SAT's difficulty.",
    conceptsLabel: "Key concepts",
    conceptTreeLink: "Concept tree",
    directoryLink: "Directory",
    singleLink: "Single page",
    chapterOneEyebrow: "Chapter 1: Computability",
    chapterOneTitle: "First ask whether a general algorithm exists",
    chapterOneTextA:
      "A computational problem pairs valid inputs with expected outputs. Computability theory first ignores speed and asks: is there a mechanical procedure that halts and answers correctly for every valid input? If so, the problem is decidable.",
    chapterOneTextB:
      "That boundary is not trivial. The halting problem shows that no universal algorithm can always decide whether an arbitrary program eventually stops. Complexity theory studies the next layer inside decidable problems: which ones are not merely computable, but efficiently computable at realistic scales.",
    chapterOneFormula:
      "Formally, a decidable language \\(L\\) has an algorithm \\(A\\) such that for every input \\(x\\), \\(A(x)\\) halts and correctly decides whether \\(x\\in L\\).",
    haltingSketchTitle: "Halting problem proof sketch",
    haltingSketchText:
      "Assume a universal decider H(P,x). Build D(P): if H says P(P) halts, D loops forever; if H says it does not halt, D halts. Asking what D(D) does creates a contradiction.",
    decidableExampleTitle: "Decidable does not mean practical",
    decidableExampleText:
      "Chess on a finite board is theoretically decidable, but that does not mean humans can exhaustively search it. Computability asks whether an algorithm exists; complexity asks how costly it is.",
    boundaryToolTitle: "Three boundaries side by side",
    boundaryToolIntro: "Choose a problem and see where it lands: decidable, efficient, or open/hard.",
    caseButtons: "Problem cases",
    decidableLabel: "Decidable",
    efficientLabel: "Known efficient",
    openLabel: "Open / hard",
    chapterTwoEyebrow: "Chapter 2: P and growth",
    chapterTwoTitle: "P is about gentle scaling, not just small inputs",
    chapterTwoTextA:
      "P means polynomial time. It formalizes efficiency by requiring an algorithm whose number of steps grows at most like \\(n\\), \\(n^2\\), \\(n^3\\), or \\(n^k\\) for input size \\(n\\). Constants and hardware matter in a sprint; polynomial versus exponential growth matters in the long run.",
    chapterTwoTextB:
      "P is a worst-case theoretical class, not a promise that every instance finishes instantly. An \\(n^3\\) algorithm can be slow, and an exponential algorithm can be fine on small inputs. The value of P is that the growth remains predictably bounded as the input keeps increasing.",
    chapterTwoFormula: "\\[\\mathrm{P}=\\bigcup_{k\\ge 1}\\mathrm{TIME}(n^k)\\]",
    inputSizeTitle: "Input size is not numeric value",
    inputSizeText:
      "The input length of a number T is about log T. Subset-sum dynamic programming O(nT) is polynomial in T, but can still be exponential in the number of input bits; this is pseudo-polynomial time.",
    worstCaseTitle: "P is a worst-case upper bound",
    worstCaseText:
      "An algorithm being fast on random samples does not put it in P. You need a single polynomial bound for every input of length n.",
    growthToolTitle: "Growth-rate simulator",
    growthToolIntro: "Assume each step takes one microsecond. Change n to compare polynomial, exponential, and factorial growth.",
    growthFormula:
      "When comparing \\(n^2\\), \\(n^3\\), \\(2^n\\), and \\(n!\\), the point is not one value but the trend as \\(n\\to\\infty\\).",
    sizeLabel: "Input size n",
    growthCaveat: "Bars use a logarithmic scale. Otherwise the polynomial bars would nearly disappear next to exponential and factorial growth.",
    chapterThreeEyebrow: "Chapter 3: NP and certificates",
    chapterThreeTitle: "Finding an answer may be hard; checking one can be fast",
    chapterThreeTextA:
      "NP does not mean non-polynomial. It comes from nondeterministic polynomial time. For a first intuition, remember this: when the answer is yes, there is a short certificate that a verifier can check in polynomial time.",
    chapterThreeTextB:
      "For example, subset sum asks whether some chosen numbers add up to a target. If someone hands you the chosen numbers, verification only requires adding them and comparing with the target. The hard part is avoiding all possible subsets when nobody gives you the certificate.",
    chapterThreeFormula:
      "\\[\\mathrm{NP}=\\{L\\mid \\exists V,c,\\;x\\in L\\iff \\exists y,\\ |y|\\le |x|^c\\land V(x,y)=1\\}\\]",
    satCertTitle: "The certificate for SAT",
    satCertText: "Is a Boolean formula satisfiable? A certificate is a variable assignment. The verifier substitutes it and checks every clause.",
    hamCertTitle: "The certificate for Hamiltonian path",
    hamCertText: "Does a graph have a path visiting every vertex exactly once? A certificate is an ordered list of vertices. The verifier checks edges and duplicates.",
    verifierToolTitle: "Subset-sum verifier",
    verifierToolIntro: "The target is 22. Select numbers to verify a candidate; the page is not doing clever search for you.",
    numberGrid: "Candidate numbers",
    subsetFormula: "A valid certificate satisfies \\(\\sum_{i\\in S}a_i=22\\).",
    searchSpaceLabel: "Brute-force search",
    searchSpaceUnit: "candidate subsets",
    verifyCostLabel: "Verify certificate",
    verifyCostUnit: "additions or fewer",
    chapterFourEyebrow: "Chapter 4: NP-hardness and reductions",
    chapterFourTitle: "At least as hard means one problem can be translated into another",
    chapterFourTextA:
      "A reduction is the translator of complexity theory. If every NP problem can be translated into problem X in polynomial time, then X is NP-hard: solving X is at least as hard as solving the whole NP family.",
    chapterFourTextB:
      "If \\(X\\) is also in \\(\\mathrm{NP}\\), then \\(X\\) is \\(\\mathrm{NP}\\text{-}\\mathrm{complete}\\). NP-complete problems are signposts: if one of them has a polynomial-time algorithm, then all of \\(\\mathrm{NP}\\) falls into \\(\\mathrm P\\); if one of them is proved not to be in \\(\\mathrm P\\), then \\(\\mathrm P\\ne\\mathrm{NP}\\).",
    chapterFourFormula:
      "\\[A\\le_p B \\quad\\Longleftrightarrow\\quad \\exists f\\in\\mathrm{polytime},\\;x\\in A\\iff f(x)\\in B\\]",
    reductionDirectionTitle: "Reduction direction matters",
    reductionDirectionText: "To prove B is hard, translate a known-hard A into B. Showing B translates into A only says B is no harder than A.",
    reductionUseTitle: "Two readings of a reduction",
    reductionUseText: "If A≤pB and B is fast, then A is fast. If A is known hard and A≤pB, then B is at least as hard.",
    reductionToolTitle: "Reduction map",
    reductionToolIntro: "Choose a target problem and read what it means for a known hard problem to translate into it.",
    reductionButtons: "Reduction target problems",
    chapterFiveEyebrow: "Chapter 5: P vs NP",
    chapterFiveTitle: "Does easy-to-check mean easy-to-find?",
    chapterFiveTextA:
      "We know P is contained in NP: if a problem can be solved quickly, it can certainly be checked quickly. The unknown part is whether every NP problem with short certificates also has some undiscovered fast search method.",
    chapterFiveTextB:
      "Most researchers believe \\(\\mathrm P\\ne\\mathrm{NP}\\), but it remains open. Its importance is not a single puzzle; it connects search, proof, cryptography, optimization, program verification, and automated reasoning.",
    chapterFiveFormula: "\\[\\mathrm{P}\\subseteq\\mathrm{NP},\\qquad \\mathrm{P}\\stackrel{?}{=}\\mathrm{NP}\\]",
    searchVsDecisionTitle: "Search and decision are linked",
    searchVsDecisionText:
      "For subset sum, if you can quickly answer whether a solution exists, you can keep or discard numbers one by one and call the decider repeatedly to construct a solution.",
    notMagicTitle: "P=NP would not be instant magic",
    notMagicText:
      "Even if P=NP, the algorithm could be \\(n^{100}\\) or have enormous constants. The theoretical boundary would move, but engineering details would still matter.",
    relationButtons: "Possible relationships between P and NP",
    chapterSixEyebrow: "Chapter 6: NP-complete",
    chapterSixTitle: "NP-complete means both inside NP and hard enough",
    chapterSixTextA:
      "NP-hard only says a problem is at least as hard as every problem in NP. NP-complete also requires the problem itself to be in NP, so every yes answer must have a short certificate that can be checked quickly.",
    chapterSixTextB:
      "That is why decision versions are so useful in the theory: they express search difficulty while keeping certificate verification explicit.",
    chapterSixFormula:
      "\\[X\\in\\mathrm{NP}\\text{-}\\mathrm{complete}\\iff X\\in\\mathrm{NP}\\land \\forall L\\in\\mathrm{NP},\\;L\\le_p X\\]",
    cookLevinTitle: "First signpost: Cook-Levin",
    cookLevinText: "SAT was the first problem proved NP-complete. The intuition is to encode a verifier's computation history as a Boolean formula.",
    npcChainTitle: "A common chain",
    npcChainText: "SAT → 3-SAT → Clique → Vertex Cover → Hamiltonian Cycle. Each step is a polynomial translation that preserves yes/no answers.",
    completeToolTitle: "NP-complete checklist",
    completeCheckOne: "In NP",
    completeCheckOneText: "Given a certificate, verification runs in polynomial time.",
    completeCheckTwo: "NP-hard",
    completeCheckTwoText: "Every NP problem reduces to it efficiently.",
    completeCheckThree: "A signpost",
    completeCheckThreeText: "Solving one efficiently would move the whole NP family.",
    chapterSevenEyebrow: "Chapter 7: Why it matters",
    chapterSevenTitle: "P vs NP is about the power to find structure automatically",
    chapterSevenTextA:
      "If \\(\\mathrm P=\\mathrm{NP}\\), many tasks that search for certificates would suddenly have general fast algorithms. Cryptography, planning, scheduling, chip verification, and automated proof would all be reinterpreted.",
    chapterSevenTextB:
      "If \\(\\mathrm P\\ne\\mathrm{NP}\\), it explains why many answers can be checked easily by people or programs while still lacking one general fast method for finding them.",
    chapterSevenFormula: "Cryptography often relies on a one-way intuition: computing \\(f(x)\\) is easy, but recovering \\(x\\) is hard.",
    scheduleExampleTitle: "Scheduling example",
    scheduleExampleText: "Schedule exams for 30 courses with conflict, room-capacity, and instructor-time constraints. Checking a proposed schedule is fast; finding one from scratch can explode.",
    proofExampleTitle: "Automated proof example",
    proofExampleText: "A short proof can be checked line by line, but automatically finding one may require searching through a huge proof tree.",
    impactToolTitle: "Impact map",
    impactCryptoTitle: "Cryptography",
    impactCryptoText: "Many schemes rely on the gap between easy verification and hard inversion.",
    impactOptTitle: "Optimization",
    impactOptText: "Scheduling, routing, and allocation often run into combinatorial explosion.",
    impactProofTitle: "Proof",
    impactProofText: "Short proofs are easy to check, but finding them automatically may be hard.",
    chapterEightEyebrow: "Chapter 8: What proof needs",
    chapterEightTitle: "A fast example is not a proof that P equals NP",
    chapterEightTextA:
      "P vs NP is a claim about all input sizes, all instances, and all NP problems. A heuristic that works well on common data does not prove a worst-case polynomial-time algorithm.",
    chapterEightTextB:
      "A real proof must give a general algorithm or an unavoidable lower bound. It has to handle the entire class, not only a neat example.",
    chapterEightFormula:
      "\\[\\mathrm{P}\\ne\\mathrm{NP}\\ \\text{would follow from}\\ \\mathrm{SAT}\\notin\\bigcup_{k\\ge1}\\mathrm{TIME}(n^k)\\]",
    chapterEightLongSummary: "Expand: common misunderstandings",
    chapterEightLongText:
      "Not finding a fast algorithm does not prove \\(\\mathrm P\\ne\\mathrm{NP}\\); some instances running quickly does not prove \\(\\mathrm P=\\mathrm{NP}\\). Complexity theory needs rigorous upper or lower bounds, so intuition, experiments, and engineering experience can guide the search but cannot replace a proof.",
    proofBarrierTitle: "Why proofs are hard",
    proofBarrierText:
      "Many proof techniques run into barriers such as relativization, natural proofs, and algebrization. These are not the final answer; they warn that standard moves are not enough.",
    heuristicTitle: "Heuristics are not complexity results",
    heuristicText:
      "SAT solvers are powerful on industrial instances, but that shows exploitable structure in those instances, not a polynomial-time algorithm for every SAT instance.",
    proofToolTitle: "Proof target contrast",
    proofWouldTitle: "Would be needed",
    proofWouldText: "A uniform polynomial algorithm for the whole NP family, or a proof that some NP-complete problem cannot have one.",
    proofNotTitle: "Not enough",
    proofNotText: "A few instances, average data, engineering heuristics, or the fact that no one has found a method yet.",
    conclusionEyebrow: "Chapter 9: Takeaway",
    conclusionTitle: "Computable, efficiently solvable, and efficiently checkable are different ideas",
    conclusionTextA:
      "Computability theory tells us that some problems have no general decision algorithm at all. Complexity theory then separates decidable problems into those we can solve efficiently, those we can only verify efficiently, and those at least as hard as every problem in NP.",
    conclusionTextB:
      "The key intuition behind P vs NP is not memorizing labels. It is the gap between two questions: Can I confirm that an answer is correct? Can I find such an answer quickly myself?",
    conclusionFormula:
      "\\[\\text{decidable}\\supseteq\\mathrm{NP}\\supseteq\\mathrm{P},\\qquad \\mathrm{NP}\\text{-}\\mathrm{complete}\\subseteq\\mathrm{NP}\\]",
    finalChecklistTitle: "What you should be able to judge",
    finalChecklistText:
      "Given a new problem, ask whether it is a decision problem; whether it is known to be in P; if it is in NP, identify the certificate and verifier; to prove hardness, reduce from a known NP-complete problem.",
    finalExampleTitle: "Full example: traveling salesperson",
    finalExampleText:
      "“How short is the shortest tour?” is an optimization problem; “is there a tour of length at most K?” is the decision version. A proposed tour is easy to check, the decision version is NP-complete, and the optimization version is NP-hard.",
  },
};

const concepts = {
  zh: {
    decidable: {
      term: "可判定",
      definition: "存在一套算法 \\(A\\)，能对所有合法输入 \\(x\\) 停下来并给出正确的是/否答案。",
    },
    p: {
      term: "P",
      definition: "已知可以在多项式时间内求解的一类判定问题，常写作 \\(\\mathrm P=\\bigcup_{k\\ge1}\\mathrm{TIME}(n^k)\\)。",
    },
    np: {
      term: "NP",
      definition: "对于“是”的答案，存在短证据 \\(c\\) 可由验证器 \\(V(x,c)\\) 在多项式时间内验证的一类判定问题。",
    },
    certificate: {
      term: "证据",
      definition: "一份候选答案的短说明 \\(c\\)，让验证器 \\(V(x,c)=1\\) 能快速检查答案是否成立。",
    },
    nphard: {
      term: "NP-hard",
      definition: "至少和 \\(\\mathrm{NP}\\) 中所有问题一样难；若任意 \\(Y\\in\\mathrm{NP}\\) 都有 \\(Y\\le_p X\\)，则 \\(X\\) 是 NP-hard。",
    },
    reduction: {
      term: "归约",
      definition: "把一个问题高效翻译成另一个问题，用来比较问题难度，记作 \\(A\\le_p B\\)。",
    },
    pVsNp: {
      term: "P vs NP",
      definition: "询问所有能快速验证的问题，是否也都能快速求解的开放问题：\\(\\mathrm P\\stackrel{?}{=}\\mathrm{NP}\\)。",
    },
  },
  en: {
    decidable: {
      term: "decidable",
      definition: "A problem with an algorithm \\(A\\) that halts and gives the correct yes/no answer for every valid input \\(x\\).",
    },
    p: {
      term: "P",
      definition: "The class of decision problems known to be solvable in polynomial time, \\(\\mathrm P=\\bigcup_{k\\ge1}\\mathrm{TIME}(n^k)\\).",
    },
    np: {
      term: "NP",
      definition: "Decision problems where every yes answer has a short certificate \\(c\\) verifiable by \\(V(x,c)\\) in polynomial time.",
    },
    certificate: {
      term: "certificate",
      definition: "A short witness \\(c\\) for a candidate answer that lets a verifier check \\(V(x,c)=1\\) quickly.",
    },
    nphard: {
      term: "NP-hard",
      definition: "At least as hard as every problem in \\(\\mathrm{NP}\\); if every \\(Y\\in\\mathrm{NP}\\) has \\(Y\\le_p X\\), then \\(X\\) is NP-hard.",
    },
    reduction: {
      term: "reduction",
      definition: "An efficient translation from one problem to another, written \\(A\\le_p B\\), used to compare problem difficulty.",
    },
    pVsNp: {
      term: "P vs NP",
      definition: "The open question asking whether every efficiently checkable problem is also efficiently solvable: \\(\\mathrm P\\stackrel{?}{=}\\mathrm{NP}\\).",
    },
  },
};

const problemCases = [
  {
    id: "shortest-path",
    decidable: true,
    efficient: true,
    open: false,
    label: { zh: "最短路径", en: "Shortest path" },
    note: {
      zh: "最短路径有经典多项式时间算法。它是“可判定并且已知高效”的代表。",
      en: "Shortest path has classic polynomial-time algorithms. It represents problems that are decidable and known to be efficient.",
    },
  },
  {
    id: "subset-sum",
    decidable: true,
    efficient: false,
    open: true,
    label: { zh: "子集和", en: "Subset sum" },
    note: {
      zh: "子集和可判定，也属于 NP-complete。它有快速验证器，但没有已知的通用多项式时间求解算法。",
      en: "Subset sum is decidable and NP-complete. It has a fast verifier, but no known general polynomial-time solver.",
    },
  },
  {
    id: "halting",
    decidable: false,
    efficient: false,
    open: false,
    label: { zh: "停机问题", en: "Halting problem" },
    note: {
      zh: "停机问题不可判定。这里的问题不是慢，而是不存在能覆盖所有程序和输入的通用判定算法。",
      en: "The halting problem is undecidable. The issue is not slowness; no universal decision algorithm exists for all programs and inputs.",
    },
  },
];

const reductionCases = [
  {
    id: "subset-sum",
    label: { zh: "子集和", en: "Subset sum" },
    shortLabel: { zh: "子集和", en: "Subset sum" },
    note: {
      zh: "SAT 可以多项式时间归约到子集和。因此如果子集和突然有了通用快速算法，SAT 也会跟着有。",
      en: "SAT can be reduced to subset sum in polynomial time. If subset sum suddenly had a general fast algorithm, SAT would get one too.",
    },
  },
  {
    id: "tsp",
    label: { zh: "旅行商判定版", en: "TSP decision" },
    shortLabel: { zh: "TSP 判定", en: "TSP decision" },
    note: {
      zh: "旅行商的判定版问“是否存在总长度不超过 K 的路线”。给出路线后容易检查，因此它属于 NP，也可以是 NP-complete。",
      en: "The decision version of TSP asks whether a tour of length at most K exists. A proposed tour is easy to check, so the problem is in NP and can be NP-complete.",
    },
  },
  {
    id: "optimization",
    label: { zh: "优化版问题", en: "Optimization version" },
    shortLabel: { zh: "优化版", en: "Optimization" },
    note: {
      zh: "很多优化版问题是 NP-hard，但不直接属于 NP，因为 NP 主要讨论“是/否”判定问题和可验证证据。",
      en: "Many optimization versions are NP-hard without directly being in NP, because NP is mainly about yes/no decision problems and checkable certificates.",
    },
  },
];

function log10Factorial(n) {
  let total = 0;
  for (let value = 2; value <= n; value += 1) {
    total += Math.log10(value);
  }
  return total;
}

function growthModels(n) {
  return [
    { name: "\\(n^2\\)", logSteps: Math.log10(n ** 2), tone: "fast" },
    { name: "\\(n^3\\)", logSteps: Math.log10(n ** 3), tone: "fast" },
    { name: "\\(2^n\\)", logSteps: n * Math.log10(2), tone: "warn" },
    { name: "\\(n!\\)", logSteps: log10Factorial(n), tone: "hard" },
  ];
}

function NphardApp() {
  return {
    language: Expl2.getInitialLanguage(),
    problemCases,
    reductionCases,
    selectedCase: "subset-sum",
    selectedReduction: "subset-sum",
    relationMode: "separate",
    size: 18,
    subsetNumbers: [3, 5, 9, 10, 12],
    selectedNumbers: [10, 12],
    target: 22,
    chooseLanguage(language) {
      this.language = Expl2.setLanguage(language);
      Expl2.applyI18n(messages, { language: this.language });
      Expl2.applyConcepts(concepts, { language: this.language });
      Expl2.setupChapterNavigation({
        label: messages[this.language].tocLabel,
        title: messages[this.language].tocTitle,
      });
      this.bindConceptMath();
      this.renderMath();
    },
    mounted() {
      this.language = Expl2.setLanguage(this.language, { persist: false });
      Expl2.applyI18n(messages, { language: this.language });
      Expl2.applyConcepts(concepts, { language: this.language });
      Expl2.setupChapterNavigation({
        label: messages[this.language].tocLabel,
        title: messages[this.language].tocTitle,
      });
      this.bindConceptMath();
      this.renderMath();
    },
    bindConceptMath() {
      if (document.body._nphardConceptMathBound) return;
      document.body.addEventListener("click", (event) => {
        if (event.target.closest("[data-expl2-concept]")) {
          requestAnimationFrame(() => Expl2.renderMath("#expl2-concept-popover"));
        }
      });
      document.body._nphardConceptMathBound = true;
    },
    renderMath() {
      requestAnimationFrame(() => Expl2.renderMath("#expl2-app"));
    },
    label(value) {
      return value?.[this.language] ?? value?.en ?? value?.zh ?? "";
    },
    selectedProblem() {
      return this.problemCases.find((item) => item.id === this.selectedCase);
    },
    selectedReductionCase() {
      return this.reductionCases.find((item) => item.id === this.selectedReduction);
    },
    formatSteps(logSteps) {
      if (logSteps < 7) {
        return Expl2.formatNumber(Math.round(10 ** logSteps), {
          language: this.language,
          maximumFractionDigits: 0,
        });
      }
      return this.language === "zh"
        ? `约 \\(10^{${Math.round(logSteps)}}\\) 步`
        : `about \\(10^{${Math.round(logSteps)}}\\) steps`;
    },
    formatTime(logSteps) {
      const logSeconds = logSteps - 6;
      if (logSeconds < -3) return this.language === "zh" ? "不到 1 毫秒" : "under 1 ms";
      if (logSeconds < 0) {
        const ms = Math.round(10 ** (logSeconds + 3));
        return this.language === "zh" ? `${ms} 毫秒` : `${ms} ms`;
      }
      if (logSeconds < 1) {
        const seconds = (10 ** logSeconds).toFixed(1);
        return this.language === "zh" ? `${seconds} 秒` : `${seconds} s`;
      }
      if (logSeconds < Math.log10(60)) {
        const seconds = Math.round(10 ** logSeconds);
        return this.language === "zh" ? `${seconds} 秒` : `${seconds} s`;
      }
      if (logSeconds < Math.log10(3600)) {
        const minutes = Math.round(10 ** logSeconds / 60);
        return this.language === "zh" ? `${minutes} 分钟` : `${minutes} min`;
      }
      if (logSeconds < Math.log10(86400)) {
        const hours = Math.round(10 ** logSeconds / 3600);
        return this.language === "zh" ? `${hours} 小时` : `${hours} h`;
      }
      if (logSeconds < Math.log10(31557600)) {
        const days = Math.round(10 ** logSeconds / 86400);
        return this.language === "zh" ? `${days} 天` : `${days} days`;
      }

      const logYears = logSeconds - Math.log10(31557600);
      if (logYears < 6) {
        const years = Expl2.formatNumber(Math.round(10 ** logYears), {
          language: this.language,
          maximumFractionDigits: 0,
        });
        return this.language === "zh" ? `${years} 年` : `${years} years`;
      }
      return this.language === "zh"
        ? `约 \\(10^{${Math.round(logYears)}}\\) 年`
        : `about \\(10^{${Math.round(logYears)}}\\) years`;
    },
    growthRows() {
      const n = Number(this.size);
      const rows = growthModels(n);
      const maxLog = Math.max(...rows.map((row) => row.logSteps));
      return rows.map((row) => ({
        ...row,
        width: Math.max(2, (row.logSteps / maxLog) * 100),
        label:
          this.language === "zh"
            ? `${this.formatSteps(row.logSteps)}，${this.formatTime(row.logSteps)}`
            : `${this.formatSteps(row.logSteps)}, ${this.formatTime(row.logSteps)}`,
      }));
    },
    toggleNumber(value) {
      if (this.selectedNumbers.includes(value)) {
        this.selectedNumbers = this.selectedNumbers.filter((item) => item !== value);
      } else {
        this.selectedNumbers = [...this.selectedNumbers, value].sort((a, b) => a - b);
      }
      this.renderMath();
    },
    subsetSum() {
      return this.selectedNumbers.reduce((sum, value) => sum + value, 0);
    },
    verifierText() {
      const expression =
        this.selectedNumbers.length > 0
          ? this.selectedNumbers.join(" + ")
          : "\\varnothing";
      const sum = this.subsetSum();
      if (sum === this.target) {
        return this.language === "zh"
          ? `\\(${expression}=${this.target}\\)。这是一份可快速验证的证据。`
          : `\\(${expression}=${this.target}\\). This is a quickly checkable certificate.`;
      }
      return this.language === "zh"
        ? `\\(${expression}=${sum}\\)，还不是目标 \\(${this.target}\\)。`
        : `\\(${expression}=${sum}\\), not the target \\(${this.target}\\).`;
    },
    relationText() {
      if (this.relationMode === "same") {
        return this.language === "zh"
          ? "如果 \\(\\mathrm P=\\mathrm{NP}\\)，那么所有能快速验证的问题也能快速求解；密码学、优化和自动证明都会被重写。"
          : "If \\(\\mathrm P=\\mathrm{NP}\\), every efficiently checkable problem is also efficiently solvable; cryptography, optimization, and automated proof would change dramatically.";
      }
      return this.language === "zh"
        ? "主流猜想是 \\(\\mathrm P\\ne\\mathrm{NP}\\)：很多问题有短证据可以检查，但没有已知的快速求解算法。"
        : "The mainstream conjecture is \\(\\mathrm P\\ne\\mathrm{NP}\\): many problems have short checkable certificates but no known fast solving algorithm.";
    },
  };
}

Expl2.mount({ NphardApp }, "#expl2-app");
