const squarePoints = [
  { key: "tl", x: -1, y: -1, label: "A" },
  { key: "tr", x: 1, y: -1, label: "B" },
  { key: "br", x: 1, y: 1, label: "C" },
  { key: "bl", x: -1, y: 1, label: "D" },
];

const squareOps = {
  e: ([x, y]) => [x, y],
  r90: ([x, y]) => [-y, x],
  r180: ([x, y]) => [-x, -y],
  r270: ([x, y]) => [y, -x],
  fv: ([x, y]) => [-x, y],
  fh: ([x, y]) => [x, -y],
  fd: ([x, y]) => [y, x],
  fa: ([x, y]) => [-y, -x],
};

const operationOrder = ["e", "r90", "r180", "r270", "fv", "fh", "fd", "fa"];

const messages = {
  zh: {
    metaTitle: "群论入门：从余数到对称",
    languageSwitchLabel: "语言切换",
    kicker: "抽象代数入门",
    title: "群论入门：从余数到对称",
    lead: "群论研究一种很朴素的问题：如果一批动作可以连续做，那么这些动作的组合会形成什么结构？本页从余数加法、循环生成、正方形对称和子群陪集四个角度，建立群的第一张地图。",
    mapTitle: "阅读路线",
    mapItem1: "先把群看成“集合加运算”，用余数加法检查四条公理。",
    mapItem2: "再看一个元素如何反复作用，理解循环群和生成元。",
    mapItem3: "接着进入正方形对称，观察组合顺序为什么会改变结果。",
    mapItem4: "最后用子群和陪集看到群内部如何自动分层。",
    conceptsLabel: "关键概念",
    overviewEyebrow: "第 0 章：先看直觉",
    overviewTitle: "群像一套可以反复执行、也可以撤销的动作",
    overviewText1:
      "想象手机相册里的照片编辑：旋转、翻转、再旋转，这些动作可以连续做；如果做错了，也希望有一个动作能撤回来。群论把这类“可组合、可撤销”的动作抽象出来。",
    overviewText2:
      "余数加法也是同一件事。钟面上走 5 格再走 8 格，结果仍在钟面上；走 0 格什么都不变；走 5 格以后再走 7 格会回到原点。动作和数字看起来不同，却共享同一种结构。",
    overviewCue: "先抓住这个直觉：群不是一堆公式，而是一套稳定的动作语法。",
    axiomEyebrow: "1. 群的公理",
    axiomTitle: "群是“可组合动作”的最小语法",
    axiomText1: "一个群由一个集合 \\(G\\) 和一种二元运算 \\(*\\) 组成，常写成 \\((G,*)\\)。集合告诉我们有哪些对象或动作，运算告诉我们怎样把两个对象接在一起。整数加法、非零有理数乘法、平面旋转、正方形的翻转与旋转，都可以放进这个框架。",
    axiomText2: "四条公理的作用不是制造神秘感，而是保证我们可以放心地计算：组合不会跑出集合，括号位置不会改变结果，有一个什么都不做的单位元，并且每个动作都能撤销。",
    axiomClosureName: "封闭性",
    axiomClosureText: "任意两个元素组合，结果仍在集合里：若 \\(a,b\\in G\\)，则 \\(a*b\\in G\\)。没有封闭性，就没有稳定的运算世界。",
    axiomAssociativeName: "结合律",
    axiomAssociativeText: "先算左边还是先算右边不影响最终结果：\\((a*b)*c=a*(b*c)\\)。这样长串组合才有明确含义。",
    axiomIdentityName: "单位元",
    axiomIdentityText: "存在一个元素 \\(e\\)，使得 \\(e*a=a*e=a\\)。它代表“什么都不做”。",
    axiomInverseName: "逆元",
    axiomInverseText: "每个元素都有可以撤销它的伙伴：\\(a*a^{-1}=a^{-1}*a=e\\)。动作做完以后，理论上能回到原点。",
    modToolTitle: "余数加法表",
    modToolText: "改变模数 n 和两个加数，观察表格中所有结果仍然落在 0 到 n-1 之间。高亮单元格就是当前计算。",
    modSizeLabel: "模数 n",
    modALabel: "加数 a",
    modBLabel: "加数 b",
    modTableLabel: "模 n 加法的凯莱表",
    modCaptionPrefix: "第 0 行和第 0 列显示单位元 0 的作用：它和任何元素相加都不改变对方。",
    cycleEyebrow: "2. 循环与生成元",
    cycleTitle: "一个元素反复作用，可能走遍整个群",
    cycleText1: "循环群是最容易画出来的一类群。在 \\(\\mathbb Z_n\\) 里，选择一个数 \\(g\\)，不断加 \\(g\\) 再取余，就会得到 \\(0,g,2g,3g,\\ldots\\) 这条轨道。轨道最终一定回到 \\(0\\)，因为可选的余数只有有限多个。",
    cycleText2: "如果这条轨道经过了所有元素，g 就叫生成元。生成元把整个群压缩成一个动作：“重复做它”。这也是为什么循环群像一个钟面，走几格并不重要，重要的是能否走到每一个刻度。",
    cycleText3: "在 \\(\\mathbb Z_n\\) 中，\\(g\\) 是否为生成元由 \\(\\gcd(n,g)\\) 决定。当 \\(\\gcd(n,g)=1\\) 时，步长和圈长互素，轨道不会提前闭合；否则你只会在若干固定位置之间循环。",
    cycleToolTitle: "让一个步长绕圈",
    cycleToolText: "改变 n 和步长 g。轨道长度等于这个元素生成的子群大小；如果长度等于 n，它就是生成元。",
    cycleSizeLabel: "循环群大小 n",
    generatorLabel: "步长 g",
    cycleOrbitLabel: "由步长生成的轨道",
    cycleGcdLabel: "\\(\\gcd(n,g)\\)",
    cycleSizeResultLabel: "轨道长度",
    cycleGeneratorResultLabel: "生成全群",
    yes: "是",
    no: "否",
    symmetryEyebrow: "3. 对称群",
    symmetryTitle: "群论真正关心的是动作怎样组合",
    symmetryText1: "把一个正方形旋转 90 度、旋转 180 度、沿不同轴翻转，正方形看起来仍是同一个正方形。这些保持形状不变的动作称为正方形的对称。",
    symmetryText2: "所有正方形对称组成一个有 8 个元素的群，通常记作 \\(D_4\\)。它比余数加法更有意思，因为动作的先后顺序可能改变结果。先翻转再旋转，未必等于先旋转再翻转。",
    symmetryText3: "这说明群不一定交换。交换群中 \\(a*b=b*a\\) 永远成立；非交换群则保留了“顺序”这种信息。矩阵乘法、三维旋转和许多置换群都属于非交换世界。",
    symmetryToolTitle: "组合两个正方形动作",
    symmetryToolText: "选择先做的动作和后做的动作。方格中的 A、B、C、D 表示四个角最后落到的位置，下方文字比较两种顺序。",
    firstMoveLabel: "先做",
    secondMoveLabel: "再做",
    squareBoardLabel: "正方形四个角在组合动作后的相对位置",
    op_e: "不动 e",
    op_r90: "顺时针旋转 90°",
    op_r180: "旋转 180°",
    op_r270: "逆时针旋转 90°",
    op_fv: "左右翻转",
    op_fh: "上下翻转",
    op_fd: "主对角线翻转",
    op_fa: "副对角线翻转",
    subgroupEyebrow: "4. 子群与陪集",
    subgroupTitle: "群内部常常自己分成整齐的层",
    subgroupText1: "子群是群里的一部分，但它自己仍满足群的四条公理。比如在 \\(\\mathbb Z_{12}\\) 中，只看 \\(\\{0,4,8\\}\\) 这三个元素，它们在加法 \\(\\bmod\\,12\\) 下仍然封闭，也有单位元和逆元。",
    subgroupText2: "一旦有了子群 \\(H\\)，就可以把它整体平移，得到 \\(a+H=\\{a+h:h\\in H\\}\\) 这样的集合，称为陪集。陪集不是随便散落的，它们大小相同，而且彼此不重叠，合起来正好覆盖整个群。",
    subgroupText3: "这就是拉格朗日定理的直觉版本：有限群里，子群的大小一定整除整个群的大小，即 \\(|H|\\mid |G|\\)。群的局部结构不会以任意尺寸出现，它必须和整体尺寸咬合。",
    subgroupToolTitle: "在 \\(\\mathbb Z_n\\) 中生成子群和陪集",
    subgroupToolText: "改变 n 和步长 k。由 k 生成的子群 H 会显示在第一行，其余行是不同代表元平移得到的陪集。",
    subgroupSizeLabel: "群大小 n",
    subgroupStepLabel: "步长 k",
    cosetListLabel: "由生成子群产生的陪集列表",
    takeawayEyebrow: "结论",
    takeawayTitle: "群论是在保存“可逆结构”的同时忘掉表面细节",
    takeawayText1: "本页的四个场景其实在说同一件事：只要一批对象能稳定组合、有单位元、有逆元，并且组合满足结合律，它们就可以用群来研究。",
    takeawayText2: "余数加法让公理变得可计算；循环群展示“重复一个动作”如何生成结构；正方形对称提醒我们顺序可能重要；子群和陪集则说明群内部会出现整齐的分块。",
    takeawayText3: "继续学习群论时，可以把新概念都挂回这张地图：它是在研究元素、动作、生成、对称、分块，还是在研究保持结构的映射？这会比死记定义轻松得多。",
    inverseJoin: "，",
    additionWord: "在",
    moduloWord: "中",
    equalsWord: "等于",
    generatorCaptionFull: "这个步长走遍了整个 \\(\\mathbb Z_n\\)，所以它是生成元。",
    generatorCaptionPartial: "这个步长提前回到 0，只生成了全群的一部分。",
    composeLead: "先做 {first}，再做 {second}，整体等同于 {result}。",
    commuteSame: "反过来做也得到 {result}，这对动作在此处交换。",
    commuteDifferent: "反过来做会得到 {reverse}，所以这对动作不交换。",
    subgroupSentenceTemplate: "\\(\\gcd(n,k)={gcd}\\)，子群大小为 {size}，共有 {count} 个陪集。",
    cosetCaptionTemplate: "每个陪集都有 {size} 个元素，{count} 个陪集正好覆盖 {n} 个元素。",
  },
  en: {
    metaTitle: "Group Theory: From Remainders to Symmetry",
    languageSwitchLabel: "Language switch",
    kicker: "A first map of abstract algebra",
    title: "Group Theory: From Remainders to Symmetry",
    lead: "Group theory studies a simple question: when actions can be done one after another, what structure does their composition create? This page builds a first map through modular addition, cyclic generation, square symmetries, and cosets.",
    mapTitle: "Reading path",
    mapItem1: "Start with a group as a set plus an operation, then test the four axioms with modular addition.",
    mapItem2: "Watch one element act repeatedly to understand cyclic groups and generators.",
    mapItem3: "Move to square symmetries and notice why the order of composition can matter.",
    mapItem4: "Finish with subgroups and cosets, where a group separates into clean layers.",
    conceptsLabel: "Key concepts",
    overviewEyebrow: "Chapter 0: Intuition first",
    overviewTitle: "A group is a system of actions you can repeat and undo",
    overviewText1:
      "Imagine editing a photo: rotate, flip, rotate again. These actions can be composed, and if you make a mistake you want an action that undoes it. Group theory abstracts exactly this kind of composable, reversible behavior.",
    overviewText2:
      "Remainders on a clock are the same story. Walk 5 ticks and then 8 more, and you are still on the clock; walking 0 ticks changes nothing; walking 5 ticks and then 7 ticks returns to the start. Actions and numbers look different, but they share one structure.",
    overviewCue: "Keep this intuition first: a group is not a pile of formulas, but a stable grammar for actions.",
    axiomEyebrow: "1. Group axioms",
    axiomTitle: "A group is the minimal grammar of composable actions",
    axiomText1: "A group consists of a set \\(G\\) and a binary operation \\(*\\), often written \\((G,*)\\). The set tells us which objects or actions are available; the operation tells us how to attach two of them. Integer addition, multiplication of nonzero rationals, plane rotations, and square flips all fit this frame.",
    axiomText2: "The four axioms are not meant to add mystery. They guarantee that calculations are safe: composition stays inside the set, parentheses do not change the result, there is an action that does nothing, and every action can be undone.",
    axiomClosureName: "Closure",
    axiomClosureText: "Combining any two elements gives another element of the same set: if \\(a,b\\in G\\), then \\(a*b\\in G\\). Without closure, the operation has no stable world.",
    axiomAssociativeName: "Associativity",
    axiomAssociativeText: "Grouping the left pair first or the right pair first gives the same final result: \\((a*b)*c=a*(b*c)\\). Long products then have a clear meaning.",
    axiomIdentityName: "Identity",
    axiomIdentityText: "There is an element \\(e\\) such that \\(e*a=a*e=a\\). It represents doing nothing.",
    axiomInverseName: "Inverse",
    axiomInverseText: "Every element has a partner that undoes it: \\(a*a^{-1}=a^{-1}*a=e\\). After performing an action, you can in principle return to the start.",
    modToolTitle: "Modular addition table",
    modToolText: "Change the modulus n and two addends. Every result stays between 0 and n-1, and the highlighted cell is the current computation.",
    modSizeLabel: "Modulus n",
    modALabel: "Addend a",
    modBLabel: "Addend b",
    modTableLabel: "Cayley table for addition modulo n",
    modCaptionPrefix: "Row 0 and column 0 show the identity element 0: adding it leaves every other element unchanged.",
    cycleEyebrow: "2. Cycles and generators",
    cycleTitle: "One repeated action may walk through the whole group",
    cycleText1: "Cyclic groups are the easiest groups to draw. In \\(\\mathbb Z_n\\), choose a number \\(g\\), keep adding \\(g\\), and reduce modulo \\(n\\). The orbit \\(0,g,2g,3g,\\ldots\\) eventually returns to \\(0\\) because there are only finitely many remainders.",
    cycleText2: "If the orbit visits every element, g is called a generator. A generator compresses the whole group into one action: repeat this. That is why a cyclic group feels like a clock face. The step size matters through whether it can reach every tick.",
    cycleText3: "In \\(\\mathbb Z_n\\), whether \\(g\\) is a generator is decided by \\(\\gcd(n,g)\\). If \\(\\gcd(n,g)=1\\), the step and the circle length are coprime and the orbit cannot close early. Otherwise it cycles through only some fixed positions.",
    cycleToolTitle: "Walk around a cycle",
    cycleToolText: "Change n and the step g. The orbit length is the size of the subgroup generated by this element; if the length equals n, the element is a generator.",
    cycleSizeLabel: "Group size n",
    generatorLabel: "Step g",
    cycleOrbitLabel: "Orbit generated by the step",
    cycleGcdLabel: "\\(\\gcd(n,g)\\)",
    cycleSizeResultLabel: "Orbit length",
    cycleGeneratorResultLabel: "Generates all",
    yes: "yes",
    no: "no",
    symmetryEyebrow: "3. Symmetry groups",
    symmetryTitle: "Group theory cares about how actions compose",
    symmetryText1: "Rotate a square by 90 degrees, rotate it by 180 degrees, or reflect it across different axes. The square still looks like the same square. These shape-preserving actions are the symmetries of the square.",
    symmetryText2: "All square symmetries form an eight-element group, usually called \\(D_4\\). It is richer than modular addition because the order of actions can change the result. Reflect then rotate need not equal rotate then reflect.",
    symmetryText3: "So groups need not be commutative. In a commutative group, \\(a*b=b*a\\) always holds. A noncommutative group keeps track of order. Matrix multiplication, three-dimensional rotations, and many permutation groups live in this world.",
    symmetryToolTitle: "Compose two square actions",
    symmetryToolText: "Choose the first and second action. The A, B, C, D cells show where the four corners land, and the text below compares the two possible orders.",
    firstMoveLabel: "First",
    secondMoveLabel: "Then",
    squareBoardLabel: "Final positions of a square's four corners after composed symmetries",
    op_e: "identity e",
    op_r90: "rotate 90° clockwise",
    op_r180: "rotate 180°",
    op_r270: "rotate 90° counterclockwise",
    op_fv: "reflect left-right",
    op_fh: "reflect top-bottom",
    op_fd: "reflect main diagonal",
    op_fa: "reflect other diagonal",
    subgroupEyebrow: "4. Subgroups and cosets",
    subgroupTitle: "Inside a group, structure often separates into clean layers",
    subgroupText1: "A subgroup is part of a group that still satisfies the four axioms on its own. In \\(\\mathbb Z_{12}\\), for example, the elements \\(\\{0,4,8\\}\\) are closed under addition \\(\\bmod\\,12\\) and still have an identity and inverses.",
    subgroupText2: "Once there is a subgroup \\(H\\), we can shift it as a whole to get sets such as \\(a+H=\\{a+h:h\\in H\\}\\). These are cosets. They are not scattered randomly: cosets have the same size, do not overlap, and together cover the whole group.",
    subgroupText3: "This is the intuition behind Lagrange's theorem: in a finite group, the size of a subgroup must divide the size of the whole group, \\(|H|\\mid |G|\\). Local structure cannot appear at arbitrary sizes; it has to fit the global size.",
    subgroupToolTitle: "Generate a subgroup and its cosets in \\(\\mathbb Z_n\\)",
    subgroupToolText: "Change n and the step k. The subgroup H generated by k appears first; the remaining rows are cosets made by shifting H by different representatives.",
    subgroupSizeLabel: "Group size n",
    subgroupStepLabel: "Step k",
    cosetListLabel: "List of cosets produced by the generated subgroup",
    takeawayEyebrow: "Takeaway",
    takeawayTitle: "Group theory forgets surface details while preserving reversible structure",
    takeawayText1: "The four scenes on this page are saying the same thing: whenever objects compose stably, have an identity, have inverses, and obey associativity, they can be studied as a group.",
    takeawayText2: "Modular addition makes the axioms computable; cyclic groups show how one repeated action creates structure; square symmetries show why order can matter; subgroups and cosets show how a group partitions itself.",
    takeawayText3: "As you continue with group theory, attach each new concept to this map. Is it about elements, actions, generation, symmetry, partitions, or structure-preserving maps? That is lighter than memorizing definitions in isolation.",
    inverseJoin: ", ",
    additionWord: "in",
    moduloWord: "",
    equalsWord: "equals",
    generatorCaptionFull: "This step visits all of \\(\\mathbb Z_n\\), so it is a generator.",
    generatorCaptionPartial: "This step returns to 0 early and generates only part of the group.",
    composeLead: "First do {first}, then do {second}; together this equals {result}.",
    commuteSame: "Doing them in the opposite order also gives {result}, so these actions commute here.",
    commuteDifferent: "Doing them in the opposite order gives {reverse}, so these actions do not commute.",
    subgroupSentenceTemplate: "\\(\\gcd(n,k)={gcd}\\); the subgroup has {size} elements and there are {count} cosets.",
    cosetCaptionTemplate: "Each coset has {size} elements, and {count} cosets cover all {n} elements.",
  },
};

const concepts = {
  zh: {
    group: {
      term: "群",
      definition: "一个集合加上一种运算，写作 \\((G,*)\\)，并满足封闭性、结合律 \\((a*b)*c=a*(b*c)\\)、单位元和逆元四条规则。",
    },
    generator: {
      term: "生成元",
      definition: "反复作用后能走遍整个循环群的元素；在 \\(\\mathbb Z_n\\) 中，它对应满足 \\(\\gcd(n,g)=1\\) 的步长 \\(g\\)。",
    },
    symmetry: {
      term: "对称",
      definition: "保持对象结构不变的动作，例如正方形的旋转和翻转；这些动作组成二面体群 \\(D_4\\)。",
    },
    coset: {
      term: "陪集",
      definition: "把一个子群整体平移得到的集合，左陪集可写成 \\(aH=\\{ah:h\\in H\\}\\)；有限群会被同样大小的陪集整齐分割。",
    },
  },
  en: {
    group: {
      term: "group",
      definition: "A set with an operation, \\((G,*)\\), satisfying closure, associativity \\((a*b)*c=a*(b*c)\\), identity, and inverses.",
    },
    generator: {
      term: "generator",
      definition: "An element whose repeated action visits the whole cyclic group; in \\(\\mathbb Z_n\\), it is a step \\(g\\) with \\(\\gcd(n,g)=1\\).",
    },
    symmetry: {
      term: "symmetry",
      definition: "An action that preserves an object's structure, such as rotating or reflecting a square; the square symmetries form \\(D_4\\).",
    },
    coset: {
      term: "coset",
      definition: "A shifted copy of a subgroup, written \\(aH=\\{ah:h\\in H\\}\\); finite groups are partitioned into equal-size cosets.",
    },
  },
};

function toNumber(value) {
  return Number(value);
}

function pointKey([x, y]) {
  return `${x},${y}`;
}

function applyOp(operation, point) {
  return squareOps[operation](point);
}

function composeOperation(first, second) {
  return (
    operationOrder.find((operation) =>
      squarePoints.every((point) => {
        const expected = applyOp(operation, [point.x, point.y]);
        const actual = applyOp(second, applyOp(first, [point.x, point.y]));
        return pointKey(expected) === pointKey(actual);
      }),
    ) || "e"
  );
}

function GroupApp() {
  return {
    language: Expl2.getInitialLanguage(),
    modN: 5,
    addA: 2,
    addB: 3,
    cycleN: 8,
    generator: 3,
    firstOp: "fv",
    secondOp: "r90",
    subgroupN: 12,
    subgroupStep: 4,
    chooseLanguage(language) {
      this.language = Expl2.setLanguage(language);
      this.applyLanguage();
    },
    mounted() {
      document.body.classList.add("group-enhanced");
      this.language = Expl2.setLanguage(this.language, { persist: false });
      this.normalizeAddition();
      this.normalizeCycle();
      this.normalizeSubgroup();
      this.applyLanguage();
    },
    applyLanguage() {
      Expl2.applyI18n(messages, { language: this.language });
      Expl2.applyConcepts(concepts, { language: this.language });
      Expl2.setupChapterNavigation({
        label: this.language === "zh" ? "章节目录" : "Chapter directory",
        title: this.language === "zh" ? "章节" : "Chapters",
      });
      this.renderMath();
    },
    renderMath() {
      requestAnimationFrame(() => Expl2.renderMath("#expl2-app"));
    },
    t(key) {
      return messages[this.language]?.[key] ?? messages.en[key] ?? messages.zh[key] ?? "";
    },
    elements(size) {
      return Array.from({ length: toNumber(size) }, (_, index) => index);
    },
    gcd(a, b) {
      let x = Math.abs(toNumber(a));
      let y = Math.abs(toNumber(b));
      while (y !== 0) {
        const next = x % y;
        x = y;
        y = next;
      }
      return x;
    },
    normalizeAddition() {
      const n = toNumber(this.modN);
      this.addA = Expl2.clamp(toNumber(this.addA), 0, n - 1);
      this.addB = Expl2.clamp(toNumber(this.addB), 0, n - 1);
    },
    additionTable() {
      const n = toNumber(this.modN);
      const a = toNumber(this.addA);
      const b = toNumber(this.addB);
      return this.elements(n).map((row) => ({
        value: row,
        cells: this.elements(n).map((column) => ({
          key: `${row}-${column}`,
          value: (row + column) % n,
          selected: row === a && column === b,
        })),
      }));
    },
    additionSentence() {
      const n = toNumber(this.modN);
      const a = toNumber(this.addA);
      const b = toNumber(this.addB);
      const result = (a + b) % n;
      if (this.language === "zh") return `在 \\(\\mathbb Z_{${n}}\\) 中，\\(${a}+${b}\\equiv ${result}\\pmod{${n}}\\)。`;
      return `In \\(\\mathbb Z_{${n}}\\), \\(${a}+${b}\\equiv ${result}\\pmod{${n}}\\).`;
    },
    modCaption() {
      const n = toNumber(this.modN);
      const pairs = this.elements(n)
        .map((value) => `\\(${value}\\leftrightarrow ${(n - value) % n}\\)`)
        .join(this.t("inverseJoin"));
      if (this.language === "zh") {
        return `${this.t("modCaptionPrefix")} 逆元配对：${pairs}。`;
      }
      return `${this.t("modCaptionPrefix")} Inverse pairs: ${pairs}.`;
    },
    normalizeCycle() {
      const n = toNumber(this.cycleN);
      this.generator = Expl2.clamp(toNumber(this.generator), 1, n - 1);
    },
    cycleOrbit() {
      const n = toNumber(this.cycleN);
      const step = toNumber(this.generator);
      const orbit = [];
      let value = 0;
      while (!orbit.includes(value)) {
        orbit.push(value);
        value = (value + step) % n;
      }
      return orbit;
    },
    isGenerator() {
      return this.cycleOrbit().length === toNumber(this.cycleN);
    },
    cycleCaption() {
      const n = toNumber(this.cycleN);
      const step = toNumber(this.generator);
      const orbit = this.cycleOrbit();
      const prefix =
        this.language === "zh"
          ? `从 \\(0\\) 开始不断加 \\(${step}\\)，在回到 \\(0\\) 前经过 ${orbit.length} 个不同元素。`
          : `Starting at \\(0\\) and repeatedly adding \\(${step}\\), the orbit visits ${orbit.length} distinct elements before returning to \\(0\\).`;
      return `${prefix} ${this.isGenerator() ? this.t("generatorCaptionFull") : this.t("generatorCaptionPartial")} \\(\\gcd(${n},${step})=${this.gcd(n, step)}\\).`;
    },
    operationOptions() {
      return operationOrder.map((id) => ({ id, label: this.t(`op_${id}`) }));
    },
    operationName(id) {
      return this.t(`op_${id}`);
    },
    squareCells() {
      const labelsByPosition = new Map();
      squarePoints.forEach((point) => {
        const finalPoint = applyOp(this.secondOp, applyOp(this.firstOp, [point.x, point.y]));
        labelsByPosition.set(pointKey(finalPoint), point.label);
      });

      return squarePoints.map((point) => ({
        key: point.key,
        label: labelsByPosition.get(pointKey([point.x, point.y])),
        className: `is-${point.key}`,
      }));
    },
    compositionId() {
      return composeOperation(this.firstOp, this.secondOp);
    },
    reverseCompositionId() {
      return composeOperation(this.secondOp, this.firstOp);
    },
    fillTemplate(template, values) {
      return Object.entries(values).reduce(
        (text, [key, value]) => text.replaceAll(`{${key}}`, value),
        template,
      );
    },
    compositionSentence() {
      return this.fillTemplate(this.t("composeLead"), {
        first: this.operationName(this.firstOp),
        second: this.operationName(this.secondOp),
        result: this.operationName(this.compositionId()),
      });
    },
    commutativeSentence() {
      const result = this.compositionId();
      const reverse = this.reverseCompositionId();
      const key = result === reverse ? "commuteSame" : "commuteDifferent";
      return this.fillTemplate(this.t(key), {
        result: this.operationName(result),
        reverse: this.operationName(reverse),
      });
    },
    normalizeSubgroup() {
      const n = toNumber(this.subgroupN);
      this.subgroupStep = Expl2.clamp(toNumber(this.subgroupStep), 1, n - 1);
    },
    subgroupElements() {
      const n = toNumber(this.subgroupN);
      const step = toNumber(this.subgroupStep);
      const subgroup = [];
      let value = 0;
      while (!subgroup.includes(value)) {
        subgroup.push(value);
        value = (value + step) % n;
      }
      return subgroup.sort((a, b) => a - b);
    },
    cosets() {
      const n = toNumber(this.subgroupN);
      const subgroup = this.subgroupElements();
      const seen = new Set();
      const rows = [];

      this.elements(n).forEach((representative) => {
        const elements = subgroup
          .map((value) => (representative + value) % n)
          .sort((a, b) => a - b);
        const key = elements.join("-");
        if (seen.has(key)) return;
        seen.add(key);
        rows.push({
          key,
          name: representative === 0 ? "\\(H\\)" : `\\(${representative}+H\\)`,
          elements,
        });
      });

      return rows;
    },
    subgroupSentence() {
      const n = toNumber(this.subgroupN);
      const step = toNumber(this.subgroupStep);
      return this.fillTemplate(this.t("subgroupSentenceTemplate"), {
        gcd: this.gcd(n, step),
        size: this.subgroupElements().length,
        count: this.cosets().length,
      });
    },
    cosetCaption() {
      return this.fillTemplate(this.t("cosetCaptionTemplate"), {
        size: this.subgroupElements().length,
        count: this.cosets().length,
        n: toNumber(this.subgroupN),
      });
    },
  };
}

Expl2.mount({ GroupApp }, "#expl2-app");
