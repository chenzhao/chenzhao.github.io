const messages = {
  zh: {
    metaTitle: "示例 Explorable Explanation",
    languageSwitchLabel: "语言",
    kicker: "Explorable Explanation",
    title: "示例解释",
    lead: "移动滑块观察数值变化。这个页面仍然是 Hugo 从 static/expl2/example/ 直接发布的纯 HTML、CSS 和 JavaScript。",
    overviewEyebrow: "第 0 章",
    overviewTitle: "先看一个最小例子",
    overviewText: "这个页面像一张表单样板：一个滑块控制一个数字。复杂主题也应该先用这样直观的小例子说明页面要讲什么。",
    overviewConceptPrefix: "这里的关键概念是",
    overviewConceptSuffix: "，点击可查看定义。",
    simpleExampleTitle: "直观例子",
    simpleExampleText: "滑块就像一个旋钮；读者转动旋钮，页面状态立刻改变。",
    sectionEyebrow: "1. petite-vue 状态",
    sectionTitle: "交互状态留在页面本地，公共能力来自 _shared",
    sectionText: "这个示例使用 petite-vue 绑定滑块数值，同时使用 Expl2 公共层处理语言选择、文本替换和基础样式。",
    valueLabel: "数值",
    takeawayEyebrow: "结论",
    takeawayTitle: "样例页也应该说明自己的结构",
    takeawayText: "新项目应该从 _template/ 复制，使用 _shared/ 里的公共基础设施，只在项目目录中编写内容相关的逻辑。",
  },
  en: {
    metaTitle: "Example Explorable Explanation",
    languageSwitchLabel: "Language",
    kicker: "Explorable Explanation",
    title: "Example Explorable Explanation",
    lead: "Move the slider to change the value. This page is still plain HTML, CSS, and JavaScript served directly by Hugo from static/expl2/example/.",
    overviewEyebrow: "Chapter 0",
    overviewTitle: "Start with the smallest example",
    overviewText: "This page works like a form sample: one slider controls one number. More complex topics should also begin with an intuitive example of what the page is about.",
    overviewConceptPrefix: "The key concept here is the ",
    overviewConceptSuffix: "; click it for a definition.",
    simpleExampleTitle: "Intuitive example",
    simpleExampleText: "The slider is like a knob; readers turn the knob and immediately see the page state change.",
    sectionEyebrow: "1. petite-vue state",
    sectionTitle: "Interactive state stays local while shared behavior lives in _shared",
    sectionText: "This example uses petite-vue for the slider binding and the Expl2 shared layer for language selection, text replacement, and base styling.",
    valueLabel: "Value",
    takeawayEyebrow: "Takeaway",
    takeawayTitle: "Even sample pages should explain their structure",
    takeawayText: "New projects should start from _template/, use shared infrastructure from _shared/, and keep only content-specific logic in the project directory.",
  },
};

const concepts = {
  zh: {
    sharedLayer: {
      term: "公共层",
      definition: "多个 expl2 项目共同使用的基础设施，例如语言切换、基础样式、关键概念定义和小工具函数。",
    },
  },
  en: {
    sharedLayer: {
      term: "shared layer",
      definition: "Infrastructure reused across expl2 projects, such as language switching, base styling, key-concept definitions, and small helper functions.",
    },
  },
};

function ExampleApp() {
  return {
    language: Expl2.getInitialLanguage(),
    value: 42,
    chooseLanguage(language) {
      this.language = Expl2.setLanguage(language);
      Expl2.applyI18n(messages, { language: this.language });
      Expl2.applyConcepts(concepts, { language: this.language });
      Expl2.setupChapterNavigation({
        label: this.language === "zh" ? "章节目录" : "Chapter directory",
        title: this.language === "zh" ? "章节" : "Chapters",
      });
    },
    mounted() {
      this.language = Expl2.setLanguage(this.language, { persist: false });
      Expl2.applyI18n(messages, { language: this.language });
      Expl2.applyConcepts(concepts, { language: this.language });
      Expl2.setupChapterNavigation({
        label: this.language === "zh" ? "章节目录" : "Chapter directory",
        title: this.language === "zh" ? "章节" : "Chapters",
      });
    },
  };
}

Expl2.mount({ ExampleApp }, "#expl2-app");
