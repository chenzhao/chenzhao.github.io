const messages = {
  zh: {
    metaTitle: "大语言模型入门",
    languageSwitchLabel: "语言",
    overviewLabel: "页面章节概览",
    probabilityLabel: "候选词概率",
    kicker: "Explorable Explanation",
    title: "大语言模型入门",
    lead:
      "这是一份给基础读者的交互式导览：我们把大语言模型拆成 token、下一个 token 预测、训练与工具三个层次。读完并动手调几次控件后，你应该能解释它为什么会写、为什么会错，以及怎样更可靠地使用它。",
    conceptsLabel: "关键概念",
    noticeTitle: "观察提示",
    chapter0: {
      eyebrow: "第 0 章 · 先看直觉",
      title: "LLM 像一个不断接词的读者，不像一个直接查表的数据库",
      paragraphs: [
        "想象你正在玩接龙：前面已经有一句“今天天气很好，适合……”，你会根据语境猜下一个词。大语言模型也是一轮一轮地读上下文、估计下一个 token、再把新 token 接回去。",
        "差别在于，模型的“语感”来自海量训练和复杂网络；它能写出自然语言，也可能把听起来顺的内容误当答案。可靠使用它的关键，是让当前上下文和工具给它足够证据。",
      ],
      cue: "先抓住这条主线：token 是输入单位，概率负责生成，上下文和工具负责把这一次回答落到证据上。",
    },
    overview: [
      {
        number: "1",
        title: "先看输入怎样进入模型",
        text:
          "自然语言会被切成 token，并被限制在一个上下文窗口里。模型每次回答时，只能直接使用窗口里的内容。",
      },
      {
        number: "2",
        title: "再看模型怎样生成文本",
        text:
          "生成不是一次写完整段，而是不断计算候选 token 的概率，再按采样策略选择下一个 token。",
      },
      {
        number: "3",
        title: "最后看可靠性从哪里来",
        text:
          "训练给模型语言和知识，对齐让它更像助手；上下文、检索和工具决定这一次回答能否落到事实。",
      },
    ],
    chapter1: {
      eyebrow: "第一章 · token 与上下文",
      title: "模型读到的是 token 序列，不是人脑里的完整意思",
      paragraphs: [
        "我们输入一句话时，模型不会直接看到“一个句子”。它先通过 tokenizer 把文本切成 token，形成序列 \\(x_{1:n}=(x_1,\\ldots,x_n)\\)。token 可能是一个汉字、一个英文词、一个词片段、一个数字，也可能只是一个标点符号。随后每个 token 会被映射成向量 \\(e_i=E[x_i]\\)，模型在这些向量之间计算注意力关系。",
        "这一步很重要，因为 token 是模型的基本计量单位。上下文长度、推理成本、生成速度，很多都和 token 数有关。同样长度的中文、英文、代码或数学表达式，切出来的 token 数可能不同；一个看起来很短的公式或 JSON，也可能占掉大量窗口空间。",
        "上下文窗口可以理解为模型当前的工作台，常简写为最近一段 token \\(x_{t-L+1:t}\\)。系统指令、用户问题、历史对话、引用资料、工具返回结果，都要放进这个窗口。窗口外的内容不会被当前生成步骤直接读取；如果你希望模型依据某份资料回答，资料必须被带进上下文，或通过工具在回答前取回来。",
        "注意力机制会让模型在上下文里的 token 之间建立联系：代词指向谁、代码变量来自哪里、前文限定条件是什么，都要靠这种联系被重新利用。位置也很重要，同一句话放在开头、结尾或被大量无关文本隔开，实际影响可能不同。",
        "所以，给模型任务时不只是“把资料贴进去”就结束了。更稳的做法是把关键背景、目标、约束和输出格式放清楚；长资料先分段、摘取相关部分，必要时让模型先复述它将依据哪些信息，再进入正式回答。",
      ],
      notice:
        "改写输入文本，观察 token 数怎样变化；再调小上下文窗口，注意较早的 token 会变暗。这个可视化是简化切分，不等同于某个真实模型的 tokenizer。",
    },
    tokenTool: {
      title: "Token 与上下文窗口",
      help:
        "输入任意文本。页面会用一个简化 tokenizer 展示 token，并用滑块模拟模型当前能看到的最后一段上下文。",
      inputLabel: "输入文本",
      contextLabel: "可见上下文 token 数",
      tokens: "个 token",
      characters: "个字符",
      visible: "个可见",
      allVisible: "所有 token 都在上下文窗口内。",
      hiddenPrefix: "前面",
      hiddenSuffix: "个 token 已经超出这个简化窗口，模型当前只能直接看到后面的部分。",
    },
    chapter2: {
      eyebrow: "第二章 · 下一个 token 预测",
      title: "生成文本，就是一轮又一轮地选择下一个 token",
      paragraphs: [
        "训练大语言模型时，一个核心任务是：给定前面的文本，预测后面最可能出现什么。模型内部会为候选 token 打分，分数经过 softmax 变成概率分布：\\(p_i=\\frac{e^{z_i/T}}{\\sum_j e^{z_j/T}}\\)。回答看起来像一段完整文字，但生成过程本质上是“看上下文、算概率、选一个、把它接回上下文、再算下一步”。",
        "如果每次都选最高概率 token，回答通常稳定、保守、重复性强。采样会从概率分布里抽取 token，使输出更自然、更有变化。温度就是控制分布形状的常见旋钮：温度低，高概率候选更集中；温度高，分布更平，低概率候选也更有机会出现。",
        "这解释了为什么同一个提示词会得到不同回答，也解释了创造性和可靠性之间的张力。开放写作、头脑风暴可以用更高温度；需要精确、格式稳定、可验证的任务，通常要降低温度，并提供更明确的约束。",
        "概率高不等于事实正确。模型学到的是“在类似上下文里什么文本更像会出现”，而不是每一步都查询事实数据库。一个听起来顺滑的句子，可能只是语言模式很强；一个概率较低的候选，也可能在特定事实场景下才是正确答案。",
        "长回答会累积很多选择。前面一步选错了，后面的上下文也会被带偏；前面一步含糊，后面可能继续合理化这个含糊。因此，复杂任务常常需要拆小、要求中间检查、用结构化格式约束输出，或者让外部工具验证关键数字和事实。",
      ],
      notice:
        "调节温度和候选范围，观察概率条如何集中或摊平。这里的候选词和分数是教学示例，用来展示采样机制，而不是来自真实模型。",
    },
    samplingTool: {
      title: "采样实验",
      help:
        "这句话后面有几个候选词。调节温度和候选范围，看看最可能输出的词和概率分布如何变化。",
      prefix: "今天天气很好，适合",
      temperature: "温度",
      focus: "候选数量",
      captionLow:
        "低温会把概率集中到少数候选上，适合需要稳定、可复现的回答。",
      captionMid:
        "中等温度保留了主流候选，也允许一些变化，适合多数日常写作和解释任务。",
      captionHigh:
        "高温让分布更平，回答更发散；它可能带来灵感，也更可能偏离问题。",
    },
    chapter3: {
      eyebrow: "第三章 · 训练、对齐、上下文与工具",
      title: "模型能力来自训练，但一次回答的可靠性来自当前证据",
      paragraphs: [
        "预训练让模型从大量文本中学到语言模式、事实片段、推理套路和代码结构。它像一个经过压缩的知识和表达系统，能在新上下文中组合已有模式。但压缩不是数据库：模型参数里没有逐条可查、永远最新、保证正确的事实表。",
        "对齐阶段让模型更会遵循指令、更愿意解释步骤、更能拒绝危险请求，也让输出更符合人类偏好。对齐会改变模型的行为风格，但不能凭空补齐缺失事实。如果问题依赖最新信息、私有资料或精确计算，仅靠模型记忆并不稳。",
        "可靠使用大语言模型的关键，是把它当成“会读上下文、会组织语言、会调用工具的推理界面”。把可靠资料放入上下文，要求引用证据；需要计算就调用计算工具；需要最新事实就检索；需要操作外部系统就让工具返回可检查的结果。一个简化的扎实度检查可以写成 \\(G=\\frac{\\text{有证据支持的断言}}{\\text{全部断言}}\\)。",
        "检索增强生成，常被叫作 RAG，核心就是先从外部资料库找出相关片段，再把片段放进上下文让模型回答。它不是魔法：检索错了，回答也会错；片段太长、互相矛盾或没有来源，模型也可能把不确定内容说得很肯定。",
        "工具调用把模型从“只会说”扩展到“先观察再说”。搜索给它当前网页，计算器给它精确结果，代码执行给它可复现实验，数据库查询给它结构化记录。模型仍然负责解释和组织，但关键证据来自可检查的外部过程。",
      ],
      notice:
        "切换“提供资料”和“允许工具”，观察扎实度与有用性如何变化。分数是教学模型，目的是说明上下文和工具会改变回答依据。",
    },
    groundingTool: {
      title: "回答可靠性实验",
      help:
        "选择一个问题，再决定是否给模型提供资料、是否允许它使用工具。观察回答流程和两个简化评分。",
      questionLabel: "任务类型",
      contextToggle: "提供可靠资料",
      toolToggle: "允许调用工具",
      groundedness: "扎实度",
      usefulness: "有用性",
      questions: [
        { id: "explain", label: "解释一个基础概念" },
        { id: "recent", label: "回答最新事实" },
        { id: "calculate", label: "做精确计算" },
      ],
      steps: {
        prompt: {
          label: "输入",
          title: "问题与约束",
          text:
            "提示词告诉模型目标、受众、格式和边界。提示越清楚，模型越容易把能力用在正确方向。",
        },
        context: {
          label: "上下文",
          title: "资料进入窗口",
          text:
            "可靠资料放进上下文后，模型可以围绕证据组织回答，而不是只依赖参数记忆。",
        },
        tool: {
          label: "工具",
          title: "外部系统返回结果",
          text:
            "搜索、计算、读文件或调用 API 可以提供当前事实和精确结果，再由模型解释和整理。",
        },
        answer: {
          label: "输出",
          title: "生成可检查的回答",
          text:
            "好的回答应当说明依据、承认不确定性，并在需要时把关键步骤或来源暴露给读者检查。",
        },
      },
      captionWeak:
        "没有资料也没有工具时，模型主要依赖训练中学到的模式，适合常识解释，不适合最新事实或精确计算。",
      captionContext:
        "加入资料后，回答更容易贴近给定证据；但如果资料不足或过期，模型仍可能过度推断。",
      captionTool:
        "允许工具后，模型可以获取或计算当前结果；可靠性还取决于工具输出是否可信、是否被正确引用。",
      captionBoth:
        "资料和工具一起使用时，模型更像一个会组织证据的界面：它仍可能犯错，但错误更容易被发现和修正。",
    },
    conclusion: {
      eyebrow: "结论 · 怎样理解和使用 LLM",
      title: "把大语言模型看成概率生成器、上下文读者和工具协调者",
      paragraphs: [
        "大语言模型的基本动作很简单：读入 token 序列，预测下一个 token，再把新 token 接回上下文继续预测。复杂能力来自规模、训练数据、网络结构和对齐方法共同叠加，而不是某一个神秘开关。",
        "因此，使用它时要同时管理三个东西：输入是否清楚，上下文是否包含可靠证据，输出是否可验证。它很擅长解释、改写、总结、生成草稿和连接知识；在最新事实、精确数字、隐含约束和高风险判断上，需要资料、工具和人工检查配合。",
        "一个实用心法是：让模型负责语言、组织和候选方案，让资料负责事实，让工具负责计算和行动，让人负责目标、判断和最终验收。这样用，模型会更像可靠的思考放大器，而不是一台需要盲目信任的答案机器。",
      ],
      cards: [
        { title: "Token", text: "成本、上下文和生成过程都围绕 token 展开。" },
        { title: "概率", text: "温度和采样策略决定回答稳定还是发散。" },
        { title: "上下文", text: "当前窗口里的资料决定模型这一次能直接依据什么。" },
        { title: "工具", text: "检索、计算和 API 能弥补记忆、实时性和精确性的短板。" },
      ],
    },
  },
  en: {
    metaTitle: "Large Language Models",
    languageSwitchLabel: "Language",
    overviewLabel: "Page chapter overview",
    probabilityLabel: "Candidate probabilities",
    kicker: "Explorable Explanation",
    title: "Large Language Models",
    lead:
      "This is an interactive guide for readers with basic background knowledge. We break large language models into three layers: tokens, next-token prediction, and the role of training, context, and tools. After reading and adjusting the controls, you should be able to explain why an LLM can write, why it can be wrong, and how to use it more reliably.",
    conceptsLabel: "Key concepts",
    noticeTitle: "What to notice",
    chapter0: {
      eyebrow: "Chapter 0 · Intuition first",
      title: "An LLM is like a reader who keeps continuing text, not a database lookup table",
      paragraphs: [
        "Imagine a sentence-completion game: after “The weather is great today, perfect for...”, you infer the next word from context. A large language model does something similar, reading the context, estimating the next token, and appending it back before repeating the process.",
        "The difference is that the model's sense of language comes from large-scale training and a complex network. It can write fluently, but it can also mistake plausible text for an answer. Reliable use depends on giving this particular answer enough evidence through context and tools.",
      ],
      cue: "Hold this thread first: tokens are the input units, probability drives generation, and context plus tools ground this answer in evidence.",
    },
    overview: [
      {
        number: "1",
        title: "How input enters the model",
        text:
          "Natural language is split into tokens and placed inside a context window. At answer time, the model can directly use only what is in that window.",
      },
      {
        number: "2",
        title: "How text is generated",
        text:
          "The model does not write a whole answer at once. It computes probabilities for candidate tokens and samples the next one, again and again.",
      },
      {
        number: "3",
        title: "Where reliability comes from",
        text:
          "Training gives the model language and knowledge; alignment shapes it into an assistant. Context, retrieval, and tools decide whether this answer is grounded in evidence.",
      },
    ],
    chapter1: {
      eyebrow: "Chapter 1 · Tokens and context",
      title: "The model reads token sequences, not complete human meanings",
      paragraphs: [
        "When we type a sentence, the model does not directly receive a sentence as humans experience it. A tokenizer first breaks the text into a token sequence \\(x_{1:n}=(x_1,\\ldots,x_n)\\). A token may be a Chinese character, an English word, a word fragment, a number, or a punctuation mark. Each token is then mapped to a vector \\(e_i=E[x_i]\\), and the model computes relationships among those vectors.",
        "This matters because tokens are the basic accounting unit of an LLM. Context length, inference cost, and generation speed are all tied to token count. Chinese, English, code, math, and JSON may use very different numbers of tokens even when they look similar in length.",
        "A context window is the model's current workbench, often abbreviated as the recent token range \\(x_{t-L+1:t}\\). System instructions, user questions, chat history, quoted documents, and tool results all compete for space in that window. Content outside the window is not directly read during generation; if you want the model to rely on a document, the document must be placed in context or fetched by a tool before the answer.",
        "Attention lets the model connect tokens inside the context: what a pronoun refers to, where a code variable came from, or which constraint was stated earlier. Position also matters. The same sentence can have a different practical effect when it appears at the beginning, near the answer, or buried inside unrelated text.",
        "That means prompting is not just a matter of pasting more material. A more reliable prompt makes the goal, background, constraints, and output format explicit. For long documents, split them into relevant pieces, summarize what matters, and ask the model to state which evidence it will use before producing the final answer.",
      ],
      notice:
        "Edit the input and watch the token count change. Then reduce the context window and notice how earlier tokens fade. This is a simplified tokenizer for teaching, not the exact tokenizer of any production model.",
    },
    tokenTool: {
      title: "Token and context window",
      help:
        "Type any text. The page shows a simplified tokenization and uses the slider to simulate how many recent tokens the model can see.",
      inputLabel: "Input text",
      contextLabel: "Visible context tokens",
      tokens: "tokens",
      characters: "characters",
      visible: "visible",
      allVisible: "All tokens fit inside the context window.",
      hiddenPrefix: "The first",
      hiddenSuffix:
        "tokens are outside this simplified window, so the model can directly see only the later part.",
    },
    chapter2: {
      eyebrow: "Chapter 2 · Next-token prediction",
      title: "Generating text means choosing the next token again and again",
      paragraphs: [
        "A central training task for LLMs is: given preceding text, predict what is likely to come next. Internally, the model scores candidate tokens, and softmax turns those scores into a probability distribution, \\(p_i=\\frac{e^{z_i/T}}{\\sum_j e^{z_j/T}}\\). An answer looks like a finished paragraph, but the process is repeated: read context, compute probabilities, choose one token, append it, and compute the next step.",
        "If the model always chooses the highest-probability token, the result is usually stable, conservative, and sometimes repetitive. Sampling draws from the distribution, making output more natural and varied. Temperature is a common control for the shape of that distribution: low temperature concentrates probability on the strongest candidates; high temperature flattens the distribution so weaker candidates have more chance.",
        "This explains why the same prompt can produce different answers, and why creativity and reliability pull against each other. Open-ended writing and brainstorming can benefit from higher temperature; precise, structured, and verifiable tasks usually need lower temperature and clearer constraints.",
        "High probability is not the same as factual truth. The model learns what text tends to come next in similar contexts; it is not querying a perfect fact database at every step. A sentence can sound fluent because the language pattern is strong, while a lower-probability option may be the right one in a specific factual situation.",
        "Long answers accumulate many choices. If an early token or claim is wrong, later context may drift with it. If an early step is vague, later steps may rationalize that vagueness. Complex tasks are often safer when broken into smaller steps, checked at intermediate points, constrained with structured output, or verified by external tools.",
      ],
      notice:
        "Move the temperature and candidate-count sliders. Watch the probability bars concentrate or spread out. The candidate words and scores here are a teaching example, not a live model output.",
    },
    samplingTool: {
      title: "Sampling experiment",
      help:
        "The phrase has several possible continuations. Adjust temperature and candidate count to see how the most likely output and the probability distribution change.",
      prefix: "The weather is nice today, good for",
      temperature: "Temperature",
      focus: "Candidate count",
      captionLow:
        "Low temperature concentrates probability on a few candidates, which is useful for stable and reproducible answers.",
      captionMid:
        "Medium temperature keeps the main candidates while allowing some variation, a good default for many explanations and writing tasks.",
      captionHigh:
        "High temperature flattens the distribution. It can produce surprising ideas, but it also increases the chance of drifting away from the task.",
    },
    chapter3: {
      eyebrow: "Chapter 3 · Training, alignment, context, and tools",
      title: "Training gives ability, but current evidence gives reliability",
      paragraphs: [
        "Pretraining teaches the model language patterns, fragments of factual knowledge, reasoning routines, and code structure from large amounts of text. It behaves like a compressed system for knowledge and expression that can recombine patterns in new contexts. But compression is not a database: the parameters are not a perfect, current, queryable table of facts.",
        "Alignment makes the model better at following instructions, explaining steps, refusing harmful requests, and matching human preferences. It changes the model's behavior, but it cannot invent missing evidence. If a question depends on recent information, private documents, or exact calculation, relying only on model memory is fragile.",
        "Reliable LLM use treats the model as a context-reading, language-organizing, tool-coordinating interface. Put trustworthy material into context and ask for evidence; use calculation tools for arithmetic; retrieve current facts when timeliness matters; and let external systems return checkable results when actions or data are involved. A simple audit score can be written as \\(G=\\frac{\\text{supported claims}}{\\text{all claims}}\\).",
        "Retrieval-augmented generation, often called RAG, first retrieves relevant passages from an external knowledge source and then places those passages into context. It is not magic: if retrieval finds the wrong material, the answer can still be wrong. If passages are too long, contradictory, or unsourced, the model may state uncertain material too confidently.",
        "Tool use extends the model from only speaking to observing before speaking. Search provides current web pages, calculators provide exact results, code execution provides reproducible experiments, and database queries provide structured records. The model still explains and organizes, but key evidence comes from checkable external processes.",
      ],
      notice:
        "Toggle reliable context and tool use. Watch how groundedness and usefulness change. The scores are a teaching model, intended to show how context and tools affect the basis of an answer.",
    },
    groundingTool: {
      title: "Reliability experiment",
      help:
        "Choose a task, then decide whether the model receives reliable context and whether it may use tools. Observe the answer pipeline and two simplified scores.",
      questionLabel: "Task type",
      contextToggle: "Provide reliable context",
      toolToggle: "Allow tool use",
      groundedness: "Groundedness",
      usefulness: "Usefulness",
      questions: [
        { id: "explain", label: "Explain a basic concept" },
        { id: "recent", label: "Answer a recent fact" },
        { id: "calculate", label: "Perform exact calculation" },
      ],
      steps: {
        prompt: {
          label: "Input",
          title: "Question and constraints",
          text:
            "The prompt tells the model the goal, audience, format, and boundaries. Clearer prompts make it easier to aim the model's ability.",
        },
        context: {
          label: "Context",
          title: "Evidence enters the window",
          text:
            "When reliable material is placed in context, the model can organize an answer around evidence rather than relying only on parameter memory.",
        },
        tool: {
          label: "Tool",
          title: "External systems return results",
          text:
            "Search, calculation, file reading, or API calls can provide current facts and exact outputs for the model to explain and organize.",
        },
        answer: {
          label: "Output",
          title: "A checkable answer is generated",
          text:
            "A good answer states its basis, acknowledges uncertainty, and exposes key steps or sources when the reader needs to verify them.",
        },
      },
      captionWeak:
        "With no context and no tools, the model relies mainly on learned patterns. That can work for common explanations, but not for recent facts or exact calculation.",
      captionContext:
        "Adding context makes the answer more likely to follow the provided evidence. If the evidence is incomplete or stale, the model may still over-infer.",
      captionTool:
        "Allowing tools lets the model fetch or compute current results. Reliability still depends on whether the tool output is trustworthy and correctly cited.",
      captionBoth:
        "With both context and tools, the model becomes more like an evidence-organizing interface. It can still err, but mistakes are easier to spot and correct.",
    },
    conclusion: {
      eyebrow: "Takeaway · How to understand and use LLMs",
      title: "Think of an LLM as a probabilistic generator, context reader, and tool coordinator",
      paragraphs: [
        "The basic action of an LLM is simple: read a sequence of tokens, predict the next token, append it to the context, and repeat. Complex abilities emerge from scale, training data, architecture, and alignment working together, not from one mysterious switch.",
        "So good use means managing three things at once: whether the input is clear, whether the context contains trustworthy evidence, and whether the output can be checked. LLMs are strong at explaining, rewriting, summarizing, drafting, and connecting ideas. For recent facts, exact numbers, hidden constraints, and high-stakes judgment, they need documents, tools, and human review.",
        "A useful habit is to let the model handle language, organization, and candidate ideas; let documents carry facts; let tools handle calculation and action; and let humans own the goal, judgment, and final acceptance. Used that way, the model becomes a thinking amplifier rather than an answer machine that must be trusted blindly.",
      ],
      cards: [
        { title: "Tokens", text: "Cost, context, and generation all revolve around tokens." },
        { title: "Probability", text: "Temperature and sampling decide whether answers are stable or diverse." },
        { title: "Context", text: "The current window determines what this answer can directly rely on." },
        { title: "Tools", text: "Retrieval, calculation, and APIs make up for memory, timeliness, and precision limits." },
      ],
    },
  },
};

const concepts = {
  zh: {
    token: {
      term: "token",
      definition: "模型处理文本的基本单位，可能是字、词、词片段、数字或标点；输入可记作 token 序列 \\(x_{1:n}\\)。",
    },
    contextWindow: {
      term: "上下文窗口",
      definition: "模型当前能直接读取的 token 范围，可简写为最近窗口 \\(x_{t-L+1:t}\\)，包含指令、问题、历史、资料和工具结果。",
    },
    temperature: {
      term: "温度",
      definition: "采样时调节概率分布形状的参数；softmax 常写成 \\(p_i=\\frac{e^{z_i/T}}{\\sum_j e^{z_j/T}}\\)，低温更稳定，高温更发散。",
    },
    grounding: {
      term: "扎实度",
      definition: "回答是否依托当前上下文、资料或工具结果，而不是只依赖模型参数记忆；可用 \\(G=\\frac{\\text{有证据支持的断言}}{\\text{全部断言}}\\) 作简化检查。",
    },
  },
  en: {
    token: {
      term: "token",
      definition: "The basic text unit an LLM processes: a character, word, word piece, number, or punctuation mark; the input can be written as \\(x_{1:n}\\).",
    },
    contextWindow: {
      term: "context window",
      definition: "The range of tokens the model can directly read now, abbreviated as a recent window \\(x_{t-L+1:t}\\), including instructions, history, documents, and tool results.",
    },
    temperature: {
      term: "temperature",
      definition: "A sampling parameter that shapes softmax, \\(p_i=\\frac{e^{z_i/T}}{\\sum_j e^{z_j/T}}\\); lower is steadier, higher is more diverse.",
    },
    grounding: {
      term: "grounding",
      definition: "How much an answer rests on current context, documents, or tool outputs; a simplified audit score is \\(G=\\frac{\\text{supported claims}}{\\text{all claims}}\\).",
    },
  },
};

const defaultPrompts = {
  zh: "大语言模型可以帮助人写作、编程和学习，但需要上下文、工具和人工检查来提高可靠性。",
  en: "Large language models can help people write, code, and learn, but context, tools, and human review make them more reliable.",
};

const candidates = [
  { id: "walk", word: { zh: "散步", en: "a walk" }, logit: 3.2 },
  { id: "sun", word: { zh: "晒太阳", en: "sunshine" }, logit: 2.55 },
  { id: "bike", word: { zh: "骑车", en: "a bike ride" }, logit: 2.05 },
  { id: "read", word: { zh: "读书", en: "reading" }, logit: 1.45 },
  { id: "nap", word: { zh: "睡觉", en: "a nap" }, logit: 0.82 },
  { id: "code", word: { zh: "写代码", en: "coding" }, logit: 0.35 },
];

function simpleTokenize(text) {
  return text.match(/[A-Za-z0-9]+|[\u4e00-\u9fa5]|[^\s]/g) || [];
}

function clampScore(value) {
  return Math.round(Expl2.clamp(value, 5, 98));
}

function LlmApp() {
  return {
    language: Expl2.getInitialLanguage(),
    promptText: "",
    contextSize: 18,
    temperature: 80,
    focusCount: 5,
    questionId: "explain",
    hasContext: true,
    hasTool: false,
    get t() {
      return messages[this.language];
    },
    get tokenList() {
      return simpleTokenize(this.promptText);
    },
    get visibleTokens() {
      return this.tokenList.slice(-Number(this.contextSize));
    },
    get hiddenTokenCount() {
      return Math.max(0, this.tokenList.length - Number(this.contextSize));
    },
    get tokenCaption() {
      if (this.hiddenTokenCount === 0) return this.t.tokenTool.allVisible;
      return `${this.t.tokenTool.hiddenPrefix} ${this.hiddenTokenCount} ${this.t.tokenTool.hiddenSuffix}`;
    },
    get temperatureValue() {
      return Math.max(Number(this.temperature) / 100, 0.05);
    },
    get temperatureLabel() {
      return this.temperatureValue.toFixed(2);
    },
    get focusLabel() {
      return `${this.focusCount}`;
    },
    get probabilityRows() {
      const focused = candidates.slice(0, Number(this.focusCount));
      const probabilities = Expl2.softmax(
        focused.map((candidate) => candidate.logit / this.temperatureValue),
      );

      return focused
        .map((candidate, index) => ({
          ...candidate,
          probability: probabilities[index],
          percent: Math.max(1, Math.round(probabilities[index] * 100)),
        }))
        .sort((a, b) => b.probability - a.probability);
    },
    get chosenCandidate() {
      return this.probabilityRows[0];
    },
    get samplingCaption() {
      if (this.temperatureValue < 0.55) return this.t.samplingTool.captionLow;
      if (this.temperatureValue > 1.25) return this.t.samplingTool.captionHigh;
      return this.t.samplingTool.captionMid;
    },
    get pipelineSteps() {
      const steps = this.t.groundingTool.steps;
      return [
        { ...steps.prompt, active: true },
        { ...steps.context, active: this.hasContext },
        { ...steps.tool, active: this.hasTool },
        { ...steps.answer, active: true },
      ];
    },
    get groundednessScore() {
      const base = this.questionId === "explain" ? 58 : 30;
      const contextBoost = this.hasContext ? 28 : 0;
      const toolBoost = this.hasTool ? (this.questionId === "explain" ? 10 : 34) : 0;
      const missingPenalty =
        !this.hasTool && (this.questionId === "recent" || this.questionId === "calculate")
          ? 16
          : 0;
      return clampScore(base + contextBoost + toolBoost - missingPenalty);
    },
    get usefulnessScore() {
      const base = this.questionId === "explain" ? 68 : 42;
      const contextBoost = this.hasContext ? 15 : 0;
      const toolBoost = this.hasTool ? (this.questionId === "calculate" ? 34 : 22) : 0;
      return clampScore(base + contextBoost + toolBoost);
    },
    get groundingCaption() {
      if (this.hasContext && this.hasTool) return this.t.groundingTool.captionBoth;
      if (this.hasContext) return this.t.groundingTool.captionContext;
      if (this.hasTool) return this.t.groundingTool.captionTool;
      return this.t.groundingTool.captionWeak;
    },
    chooseLanguage(language) {
      this.language = Expl2.setLanguage(language);
      if (!this.promptText || this.promptText === defaultPrompts.zh || this.promptText === defaultPrompts.en) {
        this.promptText = defaultPrompts[this.language];
      }
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
      this.promptText = defaultPrompts[this.language];
      Expl2.applyI18n(messages, { language: this.language });
      Expl2.applyConcepts(concepts, { language: this.language });
      Expl2.setupChapterNavigation({
        label: this.language === "zh" ? "章节目录" : "Chapter directory",
        title: this.language === "zh" ? "章节" : "Chapters",
      });
      requestAnimationFrame(() => Expl2.renderMath("#expl2-app"));
    },
  };
}

Expl2.mount({ LlmApp }, "#expl2-app");
