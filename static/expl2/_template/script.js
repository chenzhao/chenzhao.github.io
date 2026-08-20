const messages = {
	  zh: {
	    metaTitle: "Expl2 模板",
	    languageSwitchLabel: "语言切换",
	    tocLabel: "章节目录",
	    tocTitle: "目录",
	    kicker: "Explorable Explanation",
	    title: "新解释",
    lead: "把要解释的问题、模型和读者应该注意的地方写在这里。",
    overviewEyebrow: "第 0 章",
    overviewTitle: "先用一个直观例子抓住问题",
    overviewText: "这一章用一个不需要背景知识的例子说明页面要解释什么。",
    overviewConceptPrefix: "这里第一次出现一个关键概念：",
    overviewConceptSuffix: "。点击它查看定义。",
    simpleExampleTitle: "直观例子",
    simpleExampleText: "把抽象问题换成日常情境，让读者先知道自己正在看什么。",
    formulaExampleText: "公式可以直接写在正文里，例如 \\(a^2+b^2=c^2\\)，由公共框架统一渲染。",
    sectionEyebrow: "1. 第一个想法",
	    sectionTitle: "用一个小交互支撑一个清楚的概念",
	    sectionText: "公共框架负责页面结构、语言切换和基础控件；项目脚本只保留这个主题自己的逻辑。",
	    valueLabel: "数值",
	    chapter2Eyebrow: "2. 概念边界",
	    chapter2Title: "先划清这个概念不是什么",
	    chapter2Text: "用一个视觉分区把相邻概念分开，避免读者把表面相似的词混在一起。",
	    chapter2Visual: "三个相邻概念区域的示意图",
	    chapter3Eyebrow: "3. 底层机制",
	    chapter3Title: "从最小机制往上搭",
	    chapter3Text: "超过三句话的解释要进入详细文本；短页只保留推动阅读的短句。",
	    chapter3Visual: "四条底层机制线索的示意图",
	    chapter4Eyebrow: "4. 依赖关系",
	    chapter4Title: "概念不是孤岛",
	    chapter4Text: "每个定义都要说明上游前提和下游用途，概念树负责完整展示这些关系。",
	    chapter4Visual: "三层概念依赖栈的示意图",
	    chapter5Eyebrow: "5. 例子",
	    chapter5Title: "例子要具体到可检查",
	    chapter5Text: "概念页至少提供一个具体例子，能互动时优先用互动例子。",
	    chapter5Visual: "四格例子检查表",
	    chapter6Eyebrow: "6. 图像",
	    chapter6Title: "难点需要视觉支架",
	    chapter6Text: "每章至少有一张图或一个可操作区域，视觉只解释概念本身。",
	    chapter6Visual: "三张视觉卡片的示意图",
	    chapter7Eyebrow: "7. 操作",
	    chapter7Title: "操作说明放在工具里",
	    chapter7Text: "正文讲知识，控件区域讲操作，两者保持独立。",
	    chapter7Visual: "正文到工具区的分离链路",
	    chapter8Eyebrow: "8. 长文",
	    chapter8Title: "长文展开后才出现",
	    chapter8Text: "多页版本只显示短文；详细原理通过点击详细展开，单页版则完整展示。",
	    chapter8Visual: "短文和详细内容两层结构",
	    chapter9Eyebrow: "9. 收束",
	    chapter9Title: "最后回到主问题",
	    chapter9Text: "结论章把十章的新内容合回最初的问题，并指出下一步阅读路径。",
	    chapter9Visual: "三段式收束路径",
	  },
	  en: {
	    metaTitle: "Expl2 Template",
	    languageSwitchLabel: "Language switch",
	    tocLabel: "Chapter directory",
	    tocTitle: "Contents",
	    kicker: "Explorable Explanation",
	    title: "New Explanation",
    lead: "Introduce the question, model, and what readers should notice here.",
    overviewEyebrow: "Chapter 0",
    overviewTitle: "Start with an intuitive example",
    overviewText: "This chapter uses an example that requires no background knowledge to show what the page is about.",
    overviewConceptPrefix: "A key concept appears here: ",
    overviewConceptSuffix: ". Click it for a definition.",
    simpleExampleTitle: "Intuitive example",
    simpleExampleText: "Turn the abstract problem into an everyday situation before introducing formal ideas.",
    formulaExampleText: "Formulas can live in prose, for example \\(a^2+b^2=c^2\\), and the shared framework renders them.",
    sectionEyebrow: "1. First idea",
	    sectionTitle: "Use a small interaction to support one clear concept",
	    sectionText: "The shared framework owns structure, language switching, and base controls; the project script keeps only topic-specific logic.",
	    valueLabel: "Value",
	    chapter2Eyebrow: "2. Concept boundary",
	    chapter2Title: "First say what this concept is not",
	    chapter2Text: "Use a visual partition to separate neighboring concepts so similar words do not blur together.",
	    chapter2Visual: "Diagram of three neighboring concept regions",
	    chapter3Eyebrow: "3. Mechanism",
	    chapter3Title: "Build upward from the smallest mechanism",
	    chapter3Text: "Explanations longer than three sentences move into detailed text; short pages keep only the reading path.",
	    chapter3Visual: "Diagram of four underlying mechanism lines",
	    chapter4Eyebrow: "4. Dependencies",
	    chapter4Title: "Concepts are not islands",
	    chapter4Text: "Every definition should name upstream prerequisites and downstream uses; the concept tree shows the full relation.",
	    chapter4Visual: "Diagram of a three-level dependency stack",
	    chapter5Eyebrow: "5. Example",
	    chapter5Title: "Examples should be concrete enough to check",
	    chapter5Text: "Each concept page needs at least one concrete example, preferably interactive when interaction helps.",
	    chapter5Visual: "Four-cell example checklist",
	    chapter6Eyebrow: "6. Visual",
	    chapter6Title: "Hard ideas need visual support",
	    chapter6Text: "Every chapter needs an image or operable area, and the visual explains the concept itself.",
	    chapter6Visual: "Diagram of three visual support cards",
	    chapter7Eyebrow: "7. Operation",
	    chapter7Title: "Instructions live inside the tool",
	    chapter7Text: "Body text teaches knowledge; control areas explain operation; the two stay separate.",
	    chapter7Visual: "Separated path from prose to tool area",
	    chapter8Eyebrow: "8. Long Text",
	    chapter8Title: "Long explanations appear only after expansion",
	    chapter8Text: "Multi-page versions show short text; detailed principles open behind a detail control, while the single page shows all text.",
	    chapter8Visual: "Two-layer structure of short text and details",
	    chapter9Eyebrow: "9. Takeaway",
	    chapter9Title: "Return to the main question",
	    chapter9Text: "The closing chapter folds the ten chapters back into the original problem and points to the next reading path.",
	    chapter9Visual: "Three-step closing path",
	  },
	};

const concepts = {
  zh: {
    exampleConcept: {
      term: "关键概念",
      definition: "理解页面主线必须掌握的概念；每个关键概念都应该能点击查看定义。",
    },
  },
  en: {
    exampleConcept: {
      term: "key concept",
      definition: "A concept required to follow the page's main thread; every key concept should be clickable for a definition.",
    },
  },
};

function TemplateApp() {
  return {
    language: Expl2.getInitialLanguage(),
    value: 42,
	    chooseLanguage(language) {
	      this.language = Expl2.setLanguage(language);
	      Expl2.applyI18n(messages, { language: this.language });
	      Expl2.applyConcepts(concepts, { language: this.language });
	      Expl2.setupChapterNavigation({
	        label: messages[this.language].tocLabel,
	        title: messages[this.language].tocTitle,
	      });
	      Expl2.renderMath("#expl2-app");
	    },
	    mounted() {
	      this.language = Expl2.setLanguage(this.language, { persist: false });
	      Expl2.applyI18n(messages, { language: this.language });
	      Expl2.applyConcepts(concepts, { language: this.language });
	      Expl2.setupChapterNavigation({
	        label: messages[this.language].tocLabel,
	        title: messages[this.language].tocTitle,
	      });
	      Expl2.renderMath("#expl2-app");
	    },
	  };
}

Expl2.mount({ TemplateApp }, "#expl2-app");
