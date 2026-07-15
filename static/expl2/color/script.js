const messages = {
  zh: {
    metaTitle: "颜色、光与视觉计算",
    languageSwitch: "语言切换",
    kicker: "Explorable Explanation",
    title: "颜色、光与视觉计算",
    lead:
      "这是 color 大型 expl2 的模块入口。光学、颜色理论、传感器、图像压缩和 HDR 已有第一版内容草稿；图形学和计算机视觉仍是骨架。",
    modulesIndex: "七大模块",
    directory: "模块目录",
    conceptTree: "概念树占位",
    singlePage: "单页占位",
    projectMap: "项目地图 JSON",
    phaseEyebrow: "内容状态",
    phaseTitle: "五个模块已有可阅读草稿，两个模块保留扩展边界",
    phaseText:
      "每个已填充模块都有入口页、章节读本、概念索引、交互练习和 module.json。计算机图形学、计算机视觉仍只定义边界，等待后续资料继续填充。",
    openModule: "打开模块",
    tocLabel: "模块目录",
    tocTitle: "Color 模块",
  },
  en: {
    metaTitle: "Color, Light, and Visual Computing",
    languageSwitch: "Language switch",
    kicker: "Explorable Explanation",
    title: "Color, Light, and Visual Computing",
    lead:
      "This is the module hub for the larger color expl2. Optics, color theory, sensors, image formats and compression, and HDR now have first content drafts; graphics and vision remain scaffolded.",
    modulesIndex: "Seven modules",
    directory: "Module directory",
    conceptTree: "Concept tree placeholder",
    singlePage: "Single-page placeholder",
    projectMap: "Project map JSON",
    phaseEyebrow: "Content status",
    phaseTitle: "Five modules are readable drafts, two remain extension boundaries",
    phaseText:
      "Each filled module now has a landing page, chapter reader, concept index, lab page, and module.json. Computer graphics and computer vision still define boundaries for future source material.",
    openModule: "Open module",
    tocLabel: "Module directory",
    tocTitle: "Color modules",
  },
};

const modules = [
  {
    slug: "optics",
    orderLabel: "01",
    title: {
      zh: "最基础的光学",
      en: "Foundational Optics",
    },
    purpose: {
      zh: "内容草稿：辐射量、折射、透镜、光阑、衍射、PSF/MTF、像差和成像系统设计。",
      en: "Content draft: radiometry, refraction, lenses, stops, diffraction, PSF/MTF, aberrations, and imaging system design.",
    },
  },
  {
    slug: "color-theory",
    orderLabel: "02",
    title: {
      zh: "颜色理论",
      en: "Color Theory",
    },
    purpose: {
      zh: "内容草稿：光谱、三刺激、CIE XYZ、RGB 空间、线性光、Lab/ΔE、色适应和色彩管理。",
      en: "Content draft: spectra, tristimulus values, CIE XYZ, RGB spaces, linear light, Lab/Delta E, adaptation, and color management.",
    },
  },
  {
    slug: "sensors",
    orderLabel: "03",
    title: {
      zh: "传感器原理",
      en: "Sensor Principles",
    },
    purpose: {
      zh: "内容草稿：像素物理、噪声、动态范围、CMOS 读出、快门、sensor-side HDR、CFA、SPAD/ToF/QIS 和事件相机。",
      en: "Content draft: pixel physics, noise, dynamic range, CMOS readout, shutters, sensor-side HDR, CFA, SPAD/ToF/QIS, and event cameras.",
    },
  },
  {
    slug: "image-formats-compression",
    orderLabel: "04",
    title: {
      zh: "计算机图像格式和压缩",
      en: "Image Formats and Compression",
    },
    purpose: {
      zh: "内容草稿：原始图像体积、冗余、JPEG、PNG、WebP、HEIC/HEIF、格式选型和玩具压缩器。",
      en: "Content draft: raw image size, redundancy, JPEG, PNG, WebP, HEIC/HEIF, format choice, and toy compressors.",
    },
  },
  {
    slug: "hdr",
    orderLabel: "05",
    title: {
      zh: "HDR 专题",
      en: "HDR",
    },
    purpose: {
      zh: "内容草稿：动态范围、PQ/HLG、HDR 格式生态、tone mapping、母版、显示校准、交付和 QC。",
      en: "Content draft: dynamic range, PQ/HLG, HDR formats, tone mapping, mastering, display calibration, delivery, and QC.",
    },
  },
  {
    slug: "computer-graphics",
    orderLabel: "06",
    title: {
      zh: "计算机图形学",
      en: "Computer Graphics",
    },
    purpose: {
      zh: "预留渲染方程、材质、光照、相机模型、路径追踪和实时渲染的内容边界。",
      en: "Reserved for rendering equations, materials, lighting, camera models, path tracing, and real-time rendering.",
    },
  },
  {
    slug: "computer-vision",
    orderLabel: "07",
    title: {
      zh: "计算机视觉",
      en: "Computer Vision",
    },
    purpose: {
      zh: "预留图像形成、特征、几何视觉、识别、分割和视觉模型的内容边界。",
      en: "Reserved for image formation, features, geometric vision, recognition, segmentation, and vision models.",
    },
  },
];

const moduleFolders = [
  {
    path: "index.html",
    label: {
      zh: "模块入口页",
      en: "Module landing page",
    },
  },
  {
    path: "module.json",
    label: {
      zh: "模块元数据、状态和章节清单",
      en: "Module metadata, status, and chapter list",
    },
  },
  {
    path: "chapters/",
    label: {
      zh: "章节读本目录",
      en: "Chapter reader folder",
    },
  },
  {
    path: "concepts/",
    label: {
      zh: "模块内概念页目录",
      en: "Module concept pages",
    },
  },
  {
    path: "labs/",
    label: {
      zh: "交互实验和可视化目录",
      en: "Interactive labs and visuals",
    },
  },
  {
    path: "assets/",
    label: {
      zh: "图片、数据和媒体资源预留目录",
      en: "Reserved images, data, and media assets",
    },
  },
];

function ColorArchitectureApp() {
  return {
    language: Expl2.getInitialLanguage(),
    modules,
    moduleFolders,

    t(key) {
      return messages[this.language]?.[key] ?? messages.en[key] ?? "";
    },

    chooseLanguage(language) {
      this.language = Expl2.setLanguage(language);
      this.renderChrome();
    },

    mounted() {
      this.language = Expl2.setLanguage(this.language, { persist: false });
      this.renderChrome();
    },

    renderChrome() {
      Expl2.applyI18n(messages, { language: this.language });
      Expl2.setupChapterNavigation({
        label: this.t("tocLabel"),
        title: this.t("tocTitle"),
      });
    },
  };
}

Expl2.mount({ ColorArchitectureApp }, "#expl2-app");
