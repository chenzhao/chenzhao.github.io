const messages = {
  zh: {
    metaTitle: "Boltzmannia：从热力学到玻尔兹曼机",
    kicker: "热力学、统计物理与机器学习",
    title: "Boltzmannia",
    lead:
      "这是一条从热到学习的路线：玻尔兹曼用概率解释热平衡，统计物理用微观态解释熵，玻尔兹曼机再把能量景观变成可以学习的数据模型。",
    languageSwitch: "语言切换",
    conceptsLabel: "关键概念",
    pillars: [
      {
        label: "热平衡",
        formula: "\\(P(E)=Z^{-1}e^{-E/(kT)}\\)",
        text: "能量低的状态更常出现，温度决定高能状态还有多少机会。",
      },
      {
        label: "熵",
        formula: "\\(S=k\\log W\\)",
        text: "一个宏观状态背后有多少微观实现方式，决定了它的典型程度。",
      },
      {
        label: "能量景观",
        formula: "\\(E\\downarrow\\Rightarrow p\\uparrow\\)",
        text: "把所有状态放在同一张地形图上，概率会流向低谷。",
      },
      {
        label: "学习",
        formula: "\\(\\Delta E_{\\text{data}}<0\\)",
        text: "模型训练就是把真实数据附近压低，把不合数据的状态抬高。",
      },
    ],
    sections: {
      overview: {
        eyebrow: "第 0 章：先看直觉",
        title: "把世界想成一张有高低的地形图",
        paragraphs: [
          "想象你把小球放在起伏地形上。低谷更容易停留，高坡也可能被热扰动推上去；温度越高，小球越愿意探索高处。",
          "玻尔兹曼思想把这个画面翻译成概率：能量越低，状态越常出现；同一个宏观状态背后的微观方式越多，它越典型。玻尔兹曼机再把数据模式看成要被压低的能量谷。",
        ],
        cue: "先记住这张地形图：温度控制探索，熵计数路有多少，学习负责改造地形。",
      },
      thermal: {
        eyebrow: "第一章：热平衡",
        title: "玻尔兹曼分布：温度怎样分配概率",
        paragraphs: [
          "想象一个系统有许多能级：最低能级像山谷，高能级像山坡。直觉上，粒子喜欢待在低处；但如果温度不是绝对零度，它也会被热扰动推到更高的地方。玻尔兹曼分布把这个直觉写成一个概率公式。",
          "公式 \\(P(E)=Z^{-1}e^{-E/(kT)}\\) 的重点不是指数函数本身，而是两个相反力量的平衡。能量 \\(E\\) 越大，概率被指数压低；温度 \\(T\\) 越大，这种压低越弱，高能状态就更可见。\\(k\\) 是玻尔兹曼常数，在这里可以把它看作单位换算。",
          "配分函数 \\(Z=\\sum_i e^{-E_i/(kT)}\\) 的角色也很重要。每个能级先得到一个未归一化权重 \\(e^{-E_i/(kT)}\\)，\\(Z\\) 把所有权重加起来，再把每个权重除以总和，即 \\(p_i=e^{-E_i/(kT)}/Z\\)。这样所有概率相加正好等于 \\(1\\)，平均能量和熵才有明确含义。",
          "这个章节的交互把 \\(k\\) 合并到温度里，只保留相对能级。拖动温度时，观察概率条怎样从低能级集中，逐渐铺开到所有能级。平均能量、熵和配分函数 \\(Z\\) 会一起变化，展示热力学量不是凭空定义出来的，而是来自同一组概率。",
          "这也是为什么玻尔兹曼分布不只属于气体分子。只要一个系统可以列出状态、给状态定义能量，并且允许随机扰动，它就可能出现类似的指数加权结构。后面的玻尔兹曼机正是借用了这套语言。",
        ],
        cue: "请特别注意：升温不是把所有状态变得一样，而是让系统更愿意访问高能状态。",
      },
      entropy: {
        eyebrow: "第二章：熵与微观态",
        title: "熵不是混乱的同义词，而是可实现方式的计数",
        paragraphs: [
          "日常语言里，熵常被说成“混乱”。这个说法有一点帮助，但容易误导。玻尔兹曼的表达 \\(S=k\\log W\\) 更具体：\\(W\\) 是同一个宏观描述背后的微观排列数。微观排列越多，宏观状态越容易被遇到。",
          "例如有 \\(N\\) 个粒子，每个粒子要么处在基态，要么处在激发态。如果只关心“有 \\(K\\) 个粒子被激发”，而不关心到底是哪几个粒子，那么 \\(K\\) 就是宏观描述，具体哪几个被激发就是微观态。",
          "当 \\(K\\) 接近一半时，组合数 \\(\\binom{N}{K}\\) 通常最大，因为有很多方式挑出那 \\(K\\) 个粒子；当 \\(K\\) 接近 \\(0\\) 或 \\(N\\) 时，方式很少。熵的对数形式让巨大组合数变成可比较、可相加的尺度。",
          "要小心区分“每个微观态等可能”和“每个宏观态等可能”。如果微观态等可能，拥有更多微观实现的宏观态自然占据更多概率。熵高的宏观状态并不是被额外偏爱，而是因为它背后的路更多。",
          "对数还有一个物理上的好处：两个独立系统放在一起时，微观态数量会相乘，而熵会相加。相加的量更像我们熟悉的宏观物理量，也更容易和能量、温度放在同一个热力学框架里。",
        ],
        cue: "拖动 N 和 K，看红色粒子位置只是一个微观例子，而下方柱状图显示整个宏观状态的微观态数量。",
      },
      machine: {
        eyebrow: "第三章：玻尔兹曼机",
        title: "把神经元状态也看成热系统里的微观态",
        paragraphs: [
          "玻尔兹曼机是一类概率神经网络。它不直接给输入一个确定答案，而是给每个可能的神经元状态分配一个能量，并按 \\(P(v,h)=Z^{-1}e^{-E(v,h)/T}\\) 抽样。能量越低，这个状态在抽样时出现的概率越高。",
          "可见单元 \\(v\\) 代表数据中能被观察到的变量；隐藏单元 \\(h\\) 代表模型自己引入的解释变量。常见能量函数可写成 \\(E(v,h)=-b^\\top v-c^\\top h-v^\\top Wh\\)：连接权重决定哪些单元喜欢一起打开，偏置决定某些单元天然更偏向打开还是关闭。",
          "右侧的小模型只有两个可见单元和一个隐藏单元，刻意非常小。它牺牲真实模型的规模，保留最重要的思想：概率来自能量，能量来自连接和偏置。",
          "这和普通前馈神经网络的直觉不同。前馈网络通常把输入推向输出；玻尔兹曼机更像给所有可能状态打分，然后从这张概率地图里抽样。它关心的不只是“答案是什么”，还关心“哪些状态整体上合理”。",
          "隐藏单元的作用可以理解为给相关性一个中介解释。如果 v1 和 v2 经常一起出现，隐藏单元可以学会在它们共同出现时打开，从而让这种组合的能量更低。复杂模型会用许多隐藏单元表达许多重叠的模式。",
        ],
        cue: "点击 v1、v2 或 h 可以切换当前状态；拖动 J、B 和抽样温度，看四种可见状态的概率怎样改变。",
      },
      learning: {
        eyebrow: "第四章：学习能量景观",
        title: "训练不是记住答案，而是雕刻低能谷",
        paragraphs: [
          "如果真实数据里 \\(v_1\\) 和 \\(v_2\\) 经常一起出现，模型就应该让状态 \\(11\\) 更容易出现；如果它们经常一起关闭，\\(00\\) 也应该是合理状态。训练目标可读成 \\(\\Delta E_{\\text{data}}<0\\)：让数据状态落在能量低谷里。",
          "经典玻尔兹曼机训练常被解释为两个阶段：正相让真实数据附近的连接更强，负相让模型自己幻想出来的错误状态被纠正。直观地说，模型既要贴近数据，也要避免把太多概率浪费在数据不支持的地方。",
          "实际的大模型会有很多可见和隐藏单元，训练也会使用近似抽样方法。这里的滑块只保留能量景观的直觉：随着训练推进，数据模式被压低，混合或矛盾状态被相对抬高。",
          "这种训练方式也说明了能量模型的难点。要知道模型把概率放在哪里，往往需要从模型自身抽样；而抽样可能很慢，尤其在状态空间巨大、能量谷很多的时候。受限玻尔兹曼机和各种近似算法，都是在处理这个计算压力。",
          "即使今天更常见的是扩散模型、Transformer 或其他架构，能量景观的语言仍然有用。它提醒我们：学习不只是拟合标签，也可以是塑造一个概率世界，让合理状态自然更容易出现。",
        ],
        cue: "拖动训练进度，观察四个可见状态的能量柱。低能柱不是“更高”，而是更深的谷，所以对应更高概率。",
      },
      takeaway: {
        eyebrow: "收束",
        title: "从玻尔兹曼到玻尔兹曼机，一直是同一个问题",
        paragraphs: [
          "热力学问：大量微观粒子为什么会表现出稳定的宏观规律？玻尔兹曼的回答是概率和计数。状态不是平均出现的，而是按能量和可实现方式被加权。",
          "机器学习里的玻尔兹曼机问：怎样让数据里的结构从许多可能状态中浮现出来？答案仍然是概率和能量。学习调整能量函数，让真实模式成为更容易被抽到的低能状态。",
          "读完这页后，可以把三个词连起来记：温度控制探索，熵计数可能性，能量塑造概率。玻尔兹曼机只是把这套物理语言翻译成了可训练的模型语言。",
          "如果继续往下学，可以沿两条路走：物理方向会进入自由能、相变和马尔可夫链；机器学习方向会进入受限玻尔兹曼机、对比散度和更广义的能量模型。两条路的共同底色，仍然是用概率描述大量可能状态。",
        ],
      },
    },
    controls: {
      temperature: "温度 T",
      temperatureNote: "这个滑块控制高能级被惩罚的强度。低温时概率集中在低能级；高温时概率分布更平。",
      energyBars: "能级概率",
      temperatureSummary: "读图：每一行是一个能级，条越长表示热平衡时越常出现。",
      particles: "粒子数 N",
      excited: "激发数 K",
      entropyNote: "N 决定总粒子数，K 决定宏观状态。红点只是一个微观排列；组合柱显示所有 K 的相对数量。",
      microstateGrid: "一个微观态示意",
      combinationBars: "不同激发数的组合数量",
      entropySummary: "读图：柱状图最高处通常在 K 接近 N/2 的地方，因为那里可实现方式最多。",
      machineDiagram: "小型玻尔兹曼机示意图",
      coupling: "联想强度 J",
      bias: "偏置 B",
      machineTemp: "抽样温度",
      machineNote: "J 控制 v1 和 v2 是否喜欢一致；B 控制打开状态是否更受偏爱；抽样温度控制模型有多随机。",
      stateList: "可见状态概率",
      training: "训练进度",
      trainingNote: "这个滑块模拟训练把数据模式压低的过程。它不是实际优化算法，只展示能量景观的方向。",
    },
    metrics: {
      averageEnergy: "平均能量",
      entropy: "熵",
      partition: "配分函数 \\(Z\\)",
      microstates: "微观态数量 \\(W\\)",
      logEntropy: "\\(S/k=\\log W=\\)",
      currentEnergy: "当前完整状态能量",
    },
    stateSentences: {
      aligned: "当前 v1 和 v2 一致，落在模型倾向的模式附近。",
      mixed: "当前 v1 和 v2 不一致；当联想强度为正时，这类状态通常会被压低。",
    },
    learningCards: {
      positive: {
        title: "正相：看真实数据",
        text: "增加数据中常见共现关系的支持，让这些模式能量更低。",
      },
      negative: {
        title: "负相：看模型幻想",
        text: "检查模型自己会抽到什么，把不该常出现的状态能量抬高。",
      },
    },
    learningStateCaptions: {
      data: "数据模式",
      mixed: "混合状态",
    },
  },
  en: {
    metaTitle: "Boltzmannia: From Thermodynamics to Boltzmann Machines",
    kicker: "Thermodynamics, statistical physics, and machine learning",
    title: "Boltzmannia",
    lead:
      "This is a path from heat to learning: Boltzmann explained thermal equilibrium with probability, statistical physics explained entropy with microstates, and Boltzmann machines turned energy landscapes into learnable data models.",
    languageSwitch: "Language switch",
    conceptsLabel: "Key concepts",
    pillars: [
      {
        label: "Thermal equilibrium",
        formula: "\\(P(E)=Z^{-1}e^{-E/(kT)}\\)",
        text: "Low-energy states appear more often, while temperature decides how often high-energy states still get visited.",
      },
      {
        label: "Entropy",
        formula: "\\(S=k\\log W\\)",
        text: "The number of microscopic realizations behind a macrostate determines how typical that macrostate is.",
      },
      {
        label: "Energy landscape",
        formula: "\\(E\\downarrow\\Rightarrow p\\uparrow\\)",
        text: "Put all states on one terrain map, and probability flows toward low valleys.",
      },
      {
        label: "Learning",
        formula: "\\(\\Delta E_{\\text{data}}<0\\)",
        text: "Training lowers energy near real data and raises energy around states the data does not support.",
      },
    ],
    sections: {
      overview: {
        eyebrow: "Chapter 0: Intuition first",
        title: "Imagine the world as a landscape of hills and valleys",
        paragraphs: [
          "Imagine placing a ball on uneven terrain. Valleys are easier places to stay, while heat can still push the ball uphill; higher temperature makes the ball more willing to explore high places.",
          "Boltzmann's idea translates this picture into probability: lower-energy states appear more often, and a macrostate with more microscopic realizations is more typical. A Boltzmann machine then treats data patterns as valleys that learning should lower.",
        ],
        cue: "Keep the terrain picture in mind: temperature controls exploration, entropy counts how many roads exist, and learning reshapes the landscape.",
      },
      thermal: {
        eyebrow: "Chapter 1: Thermal equilibrium",
        title: "The Boltzmann distribution: how temperature allocates probability",
        paragraphs: [
          "Imagine a system with many energy levels: the lowest level is a valley, higher levels are slopes. A particle tends to stay low, but at any nonzero temperature thermal agitation can push it upward. The Boltzmann distribution turns that intuition into a probability rule.",
          "The point of \\(P(E)=Z^{-1}e^{-E/(kT)}\\) is the balance between two forces. Larger energy \\(E\\) exponentially suppresses probability; larger temperature \\(T\\) weakens that suppression, so high-energy states become more visible. Here \\(k\\) is just a unit conversion factor.",
          "The partition function \\(Z=\\sum_i e^{-E_i/(kT)}\\) matters as well. Each level first receives an unnormalized weight \\(e^{-E_i/(kT)}\\). \\(Z\\) adds all those weights and divides each one by the total, \\(p_i=e^{-E_i/(kT)}/Z\\). Only then do the probabilities add to \\(1\\), making mean energy and entropy well defined.",
          "This interaction folds \\(k\\) into temperature and keeps only relative energy levels. As you move the temperature slider, watch the bars shift from low-energy concentration to a broader spread. Mean energy, entropy, and the partition function \\(Z\\) move together because they all come from the same probabilities.",
          "That is why the Boltzmann distribution is not only a story about gas molecules. Whenever a system has states, energies, and random perturbation, a similar exponential weighting can appear. The Boltzmann machine later borrows exactly this language.",
        ],
        cue: "Notice that heating does not make all states identical; it makes high-energy states more accessible.",
      },
      entropy: {
        eyebrow: "Chapter 2: Entropy and microstates",
        title: "Entropy is not just disorder; it counts realizations",
        paragraphs: [
          "In everyday speech entropy is often described as disorder. That helps a little, but it is vague. Boltzmann's \\(S=k\\log W\\) is sharper: \\(W\\) counts how many microscopic arrangements realize the same macroscopic description.",
          "Suppose \\(N\\) particles are either in a ground state or an excited state. If we only care that \\(K\\) particles are excited, not which particles they are, then \\(K\\) is the macrostate and the particular chosen particles are the microstate.",
          "When \\(K\\) is near half of \\(N\\), \\(\\binom{N}{K}\\) is usually largest because there are many ways to choose those particles. When \\(K\\) is near \\(0\\) or \\(N\\), there are very few ways. The logarithm turns huge combinatorial counts into a scale that can be compared and added.",
          "It is important to separate 'each microstate is equally likely' from 'each macrostate is equally likely.' If microstates are equally likely, macrostates with more realizations naturally receive more probability. A high-entropy macrostate is not magically preferred; it simply has more roads leading to it.",
          "The logarithm has another physical advantage. When two independent systems are combined, their numbers of microstates multiply, while their entropies add. Additive quantities behave more like ordinary macroscopic variables and fit naturally with energy and temperature.",
        ],
        cue: "Move N and K. The red dots show one microstate, while the bar chart shows how many microstates each K has.",
      },
      machine: {
        eyebrow: "Chapter 3: Boltzmann machines",
        title: "Treat neuron states like microstates in a thermal system",
        paragraphs: [
          "A Boltzmann machine is a probabilistic neural network. It does not assign one fixed answer to an input; instead, it assigns an energy to every possible configuration of neurons and samples with \\(P(v,h)=Z^{-1}e^{-E(v,h)/T}\\). Lower energy means higher sampling probability.",
          "Visible units \\(v\\) represent observed variables in data; hidden units \\(h\\) represent explanations introduced by the model. A common energy function is \\(E(v,h)=-b^\\top v-c^\\top h-v^\\top Wh\\): weights decide which units prefer to be active together, and biases decide whether a unit tends to be on or off.",
          "The model on the right has only two visible units and one hidden unit. It is deliberately tiny: it gives up realistic scale but keeps the central idea that probability comes from energy, and energy comes from weights and biases.",
          "This differs from the usual feed-forward neural-network picture. A feed-forward network pushes inputs toward outputs; a Boltzmann machine scores all possible states and samples from the resulting probability map. It asks not only 'what is the answer?' but also 'which configurations are globally plausible?'",
          "A hidden unit can be read as an intermediate explanation for correlation. If v1 and v2 often appear together, a hidden unit can learn to activate with that pair, lowering the energy of the joint pattern. Larger models use many hidden units to express many overlapping regularities.",
        ],
        cue: "Click v1, v2, or h to switch the current state; move J, B, and sampling temperature to see how the four visible-state probabilities respond.",
      },
      learning: {
        eyebrow: "Chapter 4: Learning the landscape",
        title: "Training carves low-energy valleys instead of memorizing answers",
        paragraphs: [
          "If real data often has \\(v_1\\) and \\(v_2\\) active together, state \\(11\\) should become more likely. If they often turn off together, \\(00\\) should also be plausible. Training can be read as \\(\\Delta E_{\\text{data}}<0\\): placing data states in low-energy valleys.",
          "Classical Boltzmann-machine training is often described with two phases. The positive phase strengthens relationships seen in real data; the negative phase checks what the model hallucinates and corrects states that receive too much probability.",
          "Real models contain many visible and hidden units and use approximate sampling. This slider keeps only the landscape intuition: as training progresses, data-like patterns are lowered and mixed or contradictory states are relatively raised.",
          "This also reveals the difficulty of energy-based learning. To know where the model places probability, we often need to sample from the model itself; sampling can be slow when the state space is huge and has many valleys. Restricted Boltzmann machines and approximate algorithms are ways to manage that pressure.",
          "Even though diffusion models, Transformers, and other architectures are more common today, the energy-landscape language remains useful. It reminds us that learning can mean shaping a probability world, not merely fitting labels.",
        ],
        cue: "Move the training slider and watch the four visible states. Lower energy means a deeper valley, which corresponds to higher probability.",
      },
      takeaway: {
        eyebrow: "Takeaway",
        title: "From Boltzmann to Boltzmann machines, the question stays the same",
        paragraphs: [
          "Thermodynamics asks why many microscopic particles produce stable macroscopic laws. Boltzmann's answer was probability and counting. States do not appear equally; they are weighted by energy and by the number of ways they can occur.",
          "Boltzmann machines ask how structure in data can emerge from many possible states. The answer is again probability and energy. Learning adjusts the energy function so real patterns become low-energy states that are easier to sample.",
          "After this page, keep three words connected: temperature controls exploration, entropy counts possibilities, and energy shapes probability. A Boltzmann machine translates that physical language into a trainable model.",
          "To continue, there are two natural paths. The physics path leads toward free energy, phase transitions, and Markov chains; the machine-learning path leads toward restricted Boltzmann machines, contrastive divergence, and broader energy-based models. Both keep the same background idea: use probability to describe many possible states.",
        ],
      },
    },
    controls: {
      temperature: "Temperature T",
      temperatureNote: "This slider controls how strongly high energy levels are penalized. Low temperature concentrates probability; high temperature flattens it.",
      energyBars: "Energy-level probabilities",
      temperatureSummary: "How to read it: each row is one energy level, and longer bars mean the state appears more often at equilibrium.",
      particles: "Particle count N",
      excited: "Excited count K",
      entropyNote: "N sets the number of particles and K sets the macrostate. Red dots show one arrangement; the columns compare all possible K values.",
      microstateGrid: "One microstate illustration",
      combinationBars: "Combinatorial counts by excited count",
      entropySummary: "How to read it: the tallest columns usually sit near K = N/2 because that region has the most realizations.",
      machineDiagram: "Small Boltzmann machine diagram",
      coupling: "Association strength J",
      bias: "Bias B",
      machineTemp: "Sampling temperature",
      machineNote: "\\(J\\) controls whether \\(v_1\\) and \\(v_2\\) prefer agreement; \\(B\\) favors on states; sampling temperature controls randomness.",
      stateList: "Visible-state probabilities",
      training: "Training progress",
      trainingNote: "This slider simulates training lowering data-like patterns. It is not an optimizer; it shows the direction of landscape shaping.",
    },
    metrics: {
      averageEnergy: "Mean energy",
      entropy: "Entropy",
      partition: "Partition function \\(Z\\)",
      microstates: "Microstate count \\(W\\)",
      logEntropy: "\\(S/k=\\log W=\\)",
      currentEnergy: "Current full-state energy",
    },
    stateSentences: {
      aligned: "v1 and v2 agree, so the current state lies near the model's preferred pattern.",
      mixed: "v1 and v2 disagree; with positive association strength, this kind of state is usually suppressed.",
    },
    learningCards: {
      positive: {
        title: "Positive phase: see data",
        text: "Support co-occurrences that appear in real data, lowering their energy.",
      },
      negative: {
        title: "Negative phase: see model fantasy",
        text: "Inspect what the model samples on its own and raise energy for states that should not dominate.",
      },
    },
    learningStateCaptions: {
      data: "Data pattern",
      mixed: "Mixed state",
    },
  },
};

const concepts = {
  zh: {
    temperature: {
      term: "温度",
      definition: "控制系统愿意探索高能状态的程度；在 \\(P(E)=Z^{-1}e^{-E/(kT)}\\) 中，\\(T\\) 越高，低能优势越不绝对。",
    },
    entropy: {
      term: "熵",
      definition: "同一个宏观状态背后微观实现方式的计数尺度，常写成 \\(S=k\\log W\\)。",
    },
    energyLandscape: {
      term: "能量景观",
      definition: "把每个可能状态分配能量 \\(E(x)\\)，并通过 \\(p(x)=e^{-E(x)/T}/Z\\) 转成概率地形；低能谷对应更高概率。",
    },
    boltzmannMachine: {
      term: "玻尔兹曼机",
      definition: "一种用能量 \\(E(v,h)\\) 给神经元状态打分，并按 \\(p(v,h)\\propto e^{-E(v,h)/T}\\) 抽样的生成式神经网络模型。",
    },
  },
  en: {
    temperature: {
      term: "temperature",
      definition: "The parameter controlling how willing a system is to visit high-energy states; in \\(P(E)=Z^{-1}e^{-E/(kT)}\\), higher \\(T\\) weakens the low-energy advantage.",
    },
    entropy: {
      term: "entropy",
      definition: "A scale for counting microscopic realizations behind one macrostate, often written as \\(S=k\\log W\\).",
    },
    energyLandscape: {
      term: "energy landscape",
      definition: "A terrain view that assigns each state an energy \\(E(x)\\) and converts it to probability with \\(p(x)=e^{-E(x)/T}/Z\\).",
    },
    boltzmannMachine: {
      term: "Boltzmann machine",
      definition: "A generative neural-network model that scores neuron configurations with \\(E(v,h)\\) and samples with \\(p(v,h)\\propto e^{-E(v,h)/T}\\).",
    },
  },
};

const energyLevels = [0, 0.6, 1.2, 2.1, 3.4, 5.2];
const visibleStates = [
  [0, 0],
  [0, 1],
  [1, 0],
  [1, 1],
];

function logFactorial(n) {
  let total = 0;
  for (let i = 2; i <= n; i += 1) total += Math.log(i);
  return total;
}

function logCombination(n, k) {
  return logFactorial(n) - logFactorial(k) - logFactorial(n - k);
}

function exactCombination(n, k) {
  let result = 1;
  const shortSide = Math.min(k, n - k);
  for (let i = 1; i <= shortSide; i += 1) {
    result = (result * (n - shortSide + i)) / i;
  }
  return Math.round(result);
}

function bitToSpin(bit) {
  return bit === 1 ? 1 : -1;
}

function BoltzmanniaApp() {
  return {
    language: Expl2.getInitialLanguage(),
    temperature: 120,
    particleCount: 12,
    excitedCount: 6,
    coupling: 120,
    bias: 20,
    machineTemp: 100,
    visibleA: 1,
    visibleB: 1,
    hidden: 1,
    trainingProgress: 45,
    text() {
      return messages[this.language];
    },
    chooseLanguage(language) {
      this.language = Expl2.setLanguage(language);
      Expl2.applyI18n(messages, { language: this.language });
      Expl2.applyConcepts(concepts, { language: this.language });
      Expl2.setupChapterNavigation({
        label: this.language === "zh" ? "章节目录" : "Chapter directory",
        title: this.language === "zh" ? "章节" : "Chapters",
      });
      requestAnimationFrame(() => Expl2.renderMath("#expl2-app"));
    },
    mounted() {
      this.language = Expl2.setLanguage(this.language, { persist: false });
      Expl2.applyI18n(messages, { language: this.language });
      Expl2.applyConcepts(concepts, { language: this.language });
      Expl2.setupChapterNavigation({
        label: this.language === "zh" ? "章节目录" : "Chapter directory",
        title: this.language === "zh" ? "章节" : "Chapters",
      });
      requestAnimationFrame(() => Expl2.renderMath("#expl2-app"));
    },
    format(value, digits = 2) {
      return Expl2.formatNumber(value, { language: this.language, digits });
    },
    integer(value) {
      return Expl2.formatNumber(value, {
        language: this.language,
        maximumFractionDigits: 0,
      });
    },
    percent(value) {
      return Expl2.formatPercent(value, { language: this.language, digits: 0 });
    },
    temperatureValue() {
      return Math.max(Number(this.temperature) / 100, 0.05);
    },
    thermalStats() {
      const t = this.temperatureValue();
      const probabilities = Expl2.softmax(energyLevels.map((energy) => -energy / t));
      const partition = energyLevels
        .map((energy) => Math.exp(-energy / t))
        .reduce((sum, value) => sum + value, 0);
      const meanEnergy = probabilities.reduce(
        (sum, probability, index) => sum + probability * energyLevels[index],
        0,
      );
      const entropy = -probabilities.reduce(
        (sum, probability) => sum + probability * Math.log(probability),
        0,
      );

      return { entropy, meanEnergy, partition, probabilities };
    },
    energyRows() {
      const probabilities = this.thermalStats().probabilities;
      return energyLevels.map((energy, index) => ({
        label: `\\(E_{${index}}=${energy}\\)`,
        probability: probabilities[index],
        width: Math.max(2, Math.round(probabilities[index] * 100)),
      }));
    },
    syncExcitedCount() {
      if (Number(this.excitedCount) > Number(this.particleCount)) {
        this.excitedCount = Math.floor(Number(this.particleCount) / 2);
      }
    },
    particles() {
      const n = Number(this.particleCount);
      const k = Number(this.excitedCount);
      return Array.from({ length: n }, (_, index) => ({ excited: index < k }));
    },
    entropyStats() {
      const n = Number(this.particleCount);
      const k = Expl2.clamp(Number(this.excitedCount), 0, n);
      return {
        logW: logCombination(n, k),
        microstates: exactCombination(n, k),
      };
    },
    combinationColumns() {
      const n = Number(this.particleCount);
      const k = Number(this.excitedCount);
      const logs = Array.from({ length: n + 1 }, (_, index) => logCombination(n, index));
      const maxLog = Math.max(...logs);
      return logs.map((logW, index) => ({
        active: index === k,
        height: 8 + Math.exp(logW - maxLog) * 92,
      }));
    },
    couplingValue() {
      return Number(this.coupling) / 100;
    },
    biasValue() {
      return Number(this.bias) / 100;
    },
    machineTemperatureValue() {
      return Math.max(Number(this.machineTemp) / 100, 0.1);
    },
    machineEnergy(v1, v2, h) {
      const j = this.couplingValue();
      const b = this.biasValue();
      const s1 = bitToSpin(v1);
      const s2 = bitToSpin(v2);
      const sh = bitToSpin(h);
      return -j * s1 * s2 - 0.65 * j * sh * (s1 + s2) - b * (s1 + s2) - 0.35 * b * sh;
    },
    currentEnergy() {
      return this.machineEnergy(this.visibleA, this.visibleB, this.hidden);
    },
    currentStateSentence() {
      return this.visibleA === this.visibleB
        ? this.text().stateSentences.aligned
        : this.text().stateSentences.mixed;
    },
    visibleMarginal(v1, v2) {
      const t = this.machineTemperatureValue();
      return [0, 1]
        .map((h) => Math.exp(-this.machineEnergy(v1, v2, h) / t))
        .reduce((sum, value) => sum + value, 0);
    },
    visibleStateRows() {
      const weights = visibleStates.map(([v1, v2]) => this.visibleMarginal(v1, v2));
      const total = weights.reduce((sum, value) => sum + value, 0);
      return visibleStates.map(([v1, v2], index) => {
        const probability = weights[index] / total;
        return {
          label: `${v1}${v2}`,
          probability,
          width: Math.max(2, Math.round(probability * 100)),
        };
      });
    },
    learningEnergy(v1, v2) {
      const progress = Number(this.trainingProgress) / 100;
      const isDataPattern = v1 === v2;
      return isDataPattern ? 0.85 - 1.75 * progress : 1.05 + 1.15 * progress;
    },
    learningRows() {
      const energies = visibleStates.map(([v1, v2]) => this.learningEnergy(v1, v2));
      const minEnergy = -1;
      const maxEnergy = 2.3;
      return visibleStates.map(([v1, v2], index) => {
        const energy = energies[index];
        const height = 14 + ((energy - minEnergy) / (maxEnergy - minEnergy)) * 82;
        const isDataPattern = v1 === v2;
        return {
          label: `${v1}${v2}`,
          energy,
          height: Expl2.clamp(height, 12, 96),
          caption: isDataPattern
            ? this.text().learningStateCaptions.data
            : this.text().learningStateCaptions.mixed,
        };
      });
    },
  };
}

Expl2.mount({ BoltzmanniaApp }, "#expl2-app");
