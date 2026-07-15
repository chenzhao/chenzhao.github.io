(function () {
  const STORAGE_KEY = "expl2-language";
  const VALID_LANGUAGES = new Set(["zh", "en"]);
  const CONCEPT_CLOSE_LABELS = {
    zh: "关闭",
    en: "Close",
  };
  const currentScript = document.currentScript;
  const SHARED_BASE_URL = currentScript?.src
    ? new URL(".", currentScript.src).href
    : "../_shared/";
  const MATHJAX_DEFAULT_SOURCE = `${SHARED_BASE_URL}vendor/mathjax/tex-mml-chtml.js`;

  let mathJaxPromise = null;

  function $(selector, root = document) {
    return root.querySelector(selector);
  }

  function $$(selector, root = document) {
    return Array.from(root.querySelectorAll(selector));
  }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function softmax(values) {
    const max = Math.max(...values);
    const expValues = values.map((value) => Math.exp(value - max));
    const total = expValues.reduce((sum, value) => sum + value, 0);
    return expValues.map((value) => value / total);
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }

  function getInitialLanguage() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (VALID_LANGUAGES.has(saved)) return saved;
    } catch {
      // Ignore storage failures in privacy-restricted browsing modes.
    }

    const languages = navigator.languages?.length
      ? navigator.languages
      : [navigator.language];

    return languages.some((language) => language?.toLowerCase().startsWith("zh"))
      ? "zh"
      : "en";
  }

  function normalizeLanguage(language) {
    return VALID_LANGUAGES.has(language) ? language : getInitialLanguage();
  }

  function setLanguage(language, options = {}) {
    const nextLanguage = normalizeLanguage(language);
    document.documentElement.lang = nextLanguage === "zh" ? "zh-CN" : "en";

    if (options.persist !== false) {
      try {
        localStorage.setItem(STORAGE_KEY, nextLanguage);
      } catch {
        // The page still works if localStorage is unavailable.
      }
    }

    document.dispatchEvent(
      new CustomEvent("expl2:languagechange", {
        detail: { language: nextLanguage },
      }),
    );

    return nextLanguage;
  }

  function readMessage(messages, key, language) {
    return (
      messages?.[language]?.[key] ??
      messages?.en?.[key] ??
      messages?.zh?.[key] ??
      ""
    );
  }

  function applyI18n(messages, options = {}) {
    const root = options.root || document;
    const language = normalizeLanguage(options.language);

    $$("[data-i18n]", root).forEach((node) => {
      const value = readMessage(messages, node.dataset.i18n, language);
      if (value !== "") node.textContent = value;
    });

    $$("[data-i18n-html]", root).forEach((node) => {
      const value = readMessage(messages, node.dataset.i18nHtml, language);
      if (value !== "") node.innerHTML = value;
    });

    $$("[data-i18n-attr]", root).forEach((node) => {
      node.dataset.i18nAttr
        .split(",")
        .map((pair) => pair.trim())
        .filter(Boolean)
        .forEach((pair) => {
          const [attribute, key] = pair.split(":").map((part) => part.trim());
          const value = readMessage(messages, key, language);
          if (attribute && value !== "") node.setAttribute(attribute, value);
        });
    });

    const title =
      readMessage(messages, "metaTitle", language) ||
      readMessage(messages, "title", language);
    if (title) document.title = title;

    return language;
  }

  function readConcept(concepts, key, language) {
    const localized = concepts?.[language]?.[key] ?? concepts?.en?.[key] ?? concepts?.zh?.[key];
    const direct = concepts?.[key]?.[language] ?? concepts?.[key]?.en ?? concepts?.[key]?.zh;
    const value = localized ?? direct ?? concepts?.[key];

    if (typeof value === "string") {
      return { term: key, definition: value };
    }

    if (value && typeof value === "object") {
      return {
        term: value.term ?? value.label ?? key,
        definition: value.definition ?? value.text ?? "",
      };
    }

    return { term: key, definition: "" };
  }

  function ensureConceptPopover() {
    let popover = $("#expl2-concept-popover");
    if (popover) return popover;

    popover = document.createElement("div");
    popover.id = "expl2-concept-popover";
    popover.className = "expl2-concept-popover";
    popover.setAttribute("role", "dialog");
    popover.setAttribute("aria-live", "polite");
    popover.hidden = true;
    popover.innerHTML = `
      <div class="expl2-concept-popover-inner">
        <button class="expl2-concept-close" type="button">×</button>
        <strong class="expl2-concept-title"></strong>
        <p class="expl2-concept-definition"></p>
      </div>
    `;
    document.body.append(popover);

    $(".expl2-concept-close", popover).addEventListener("click", () => {
      popover.hidden = true;
      $$("[data-expl2-concept]").forEach((node) => node.setAttribute("aria-expanded", "false"));
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        popover.hidden = true;
        $$("[data-expl2-concept]").forEach((node) => node.setAttribute("aria-expanded", "false"));
      }
    });

    return popover;
  }

  function applyConceptPopoverLabels(popover, language, options = {}) {
    const label =
      options.closeLabel ??
      options.closeLabels?.[language] ??
      CONCEPT_CLOSE_LABELS[language] ??
      CONCEPT_CLOSE_LABELS.en;
    $(".expl2-concept-close", popover).setAttribute("aria-label", label);
  }

  function showConceptPopover(target, concept) {
    const popover = ensureConceptPopover();
    applyConceptPopoverLabels(popover, concept.language, { closeLabel: concept.closeLabel });
    $(".expl2-concept-title", popover).textContent = concept.term;
    $(".expl2-concept-definition", popover).textContent = concept.definition;
    renderMath(popover).catch(() => {});

    const rect = target.getBoundingClientRect();
    popover.hidden = false;
    const top = Math.min(window.innerHeight - popover.offsetHeight - 16, rect.bottom + 10);
    const left = Math.min(window.innerWidth - popover.offsetWidth - 16, rect.left);
    popover.style.top = `${Math.max(16, top)}px`;
    popover.style.left = `${Math.max(16, left)}px`;

    $$("[data-expl2-concept]").forEach((node) => node.setAttribute("aria-expanded", "false"));
    target.setAttribute("aria-expanded", "true");
  }

  function applyConcepts(concepts, options = {}) {
    const root = options.root || document;
    const language = normalizeLanguage(options.language);
    const popover = ensureConceptPopover();
    applyConceptPopoverLabels(popover, language, options);

    $$("[data-expl2-concept]", root).forEach((node) => {
      const key = node.dataset.expl2Concept;
      const concept = readConcept(concepts, key, language);
      node.classList.add("expl2-concept");
      node.setAttribute("aria-expanded", "false");
      node.setAttribute("aria-haspopup", "dialog");

      if (node.tagName !== "BUTTON") {
        node.setAttribute("role", "button");
        node.tabIndex = 0;
      }

      if (!node.textContent.trim() || node.dataset.expl2ConceptLabel === "auto") {
        node.textContent = concept.term;
      }

      node._expl2Concept = {
        ...concept,
        language,
        closeLabel: options.closeLabel ?? options.closeLabels?.[language],
      };
      if (!node._expl2ConceptBound) {
        node.addEventListener("click", () => showConceptPopover(node, node._expl2Concept));
        node.addEventListener("keydown", (event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            showConceptPopover(node, node._expl2Concept);
          }
        });
        node._expl2ConceptBound = true;
      }
    });

    return language;
  }

  function slugify(value, fallback) {
    const slug = String(value || "")
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\u4e00-\u9fff]+/g, "-")
      .replace(/^-+|-+$/g, "");
    return slug || fallback;
  }

  function readChapterTitle(chapter, index) {
    const heading = $("h1, h2, h3", chapter);
    return (
      chapter.dataset.expl2ChapterTitle ||
      heading?.textContent?.trim() ||
      `Chapter ${index + 1}`
    );
  }

  function setupChapterNavigation(options = {}) {
    const root = options.root || document;
    const chapters = (options.chapters ? Array.from(options.chapters) : $$("[data-expl2-chapter], .expl2-chapter", root))
      .filter((chapter) => chapter instanceof Element);

    if (!chapters.length) return null;

    document.documentElement.classList.toggle("expl2-snap-enabled", options.snap !== false);
    document.body.classList.add("has-expl2-chapter-nav");

    chapters.forEach((chapter, index) => {
      chapter.classList.add("expl2-chapter");
      if (!chapter.id) {
        chapter.id = `expl2-chapter-${index + 1}-${slugify(readChapterTitle(chapter, index), index + 1)}`;
      }
    });

    let nav = typeof options.target === "string" ? $(options.target) : options.target;
    if (!nav) {
      nav = document.createElement("nav");
      nav.id = "expl2-chapter-nav";
      document.body.prepend(nav);
    }

    nav.className = "expl2-chapter-nav";
    nav.setAttribute("aria-label", options.label || "Chapter directory");

    const title = options.title || options.heading || "";
    const items = chapters
      .map((chapter, index) => {
        const text = readChapterTitle(chapter, index);
        return `<li><a href="#${escapeHtml(chapter.id)}">${escapeHtml(text)}</a></li>`;
      })
      .join("");

    nav.innerHTML = `
      ${title ? `<p class="expl2-chapter-nav-title">${escapeHtml(title)}</p>` : ""}
      <ol>${items}</ol>
    `;

    const links = $$("a", nav);
    links.forEach((link) => {
      link.addEventListener("click", (event) => {
        const href = link.getAttribute("href");
        const target = href?.startsWith("#")
          ? document.getElementById(href.slice(1))
          : href
            ? $(href)
            : null;
        if (!target) return;
        event.preventDefault();
        target.scrollIntoView({ behavior: options.behavior || "smooth", block: "start" });
        history.replaceState(null, "", href);
      });
    });

    if (nav._expl2ChapterObserver) nav._expl2ChapterObserver.disconnect();
    const setActive = (id) => {
      links.forEach((link) => {
        const isActive = link.getAttribute("href") === `#${id}`;
        link.classList.toggle("is-active", isActive);
        if (isActive) link.setAttribute("aria-current", "true");
        else link.removeAttribute("aria-current");
      });
    };

    if ("IntersectionObserver" in window) {
      nav._expl2ChapterObserver = new IntersectionObserver(
        (entries) => {
          const visible = entries
            .filter((entry) => entry.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
          if (visible?.target?.id) setActive(visible.target.id);
        },
        { threshold: [0.55, 0.75] },
      );
      chapters.forEach((chapter) => nav._expl2ChapterObserver.observe(chapter));
    }

    setActive(chapters[0].id);
    return nav;
  }

  function configureMathJax(options = {}) {
    const existing = window.MathJax && !window.MathJax.typesetPromise ? window.MathJax : {};
    const tex = {
      inlineMath: [["\\(", "\\)"]],
      displayMath: [["\\[", "\\]"], ["$$", "$$"]],
      processEscapes: true,
      processEnvironments: true,
      ...(existing.tex || {}),
      ...(options.tex || {}),
    };

    if (options.singleDollar && !options.tex?.inlineMath) {
      tex.inlineMath = [...tex.inlineMath, ["$", "$"]];
    }

    window.MathJax = {
      ...existing,
      tex,
      options: {
        skipHtmlTags: ["script", "noscript", "style", "textarea", "pre", "code"],
        ignoreHtmlClass: "tex2jax_ignore|expl2-no-math",
        processHtmlClass: "tex2jax_process|expl2-math",
        ...(existing.options || {}),
        ...(options.options || {}),
      },
      startup: {
        typeset: false,
        ...(existing.startup || {}),
        ...(options.startup || {}),
      },
    };
  }

  function loadMath(options = {}) {
    if (window.MathJax?.typesetPromise) return Promise.resolve(window.MathJax);
    if (mathJaxPromise) return mathJaxPromise;

    configureMathJax(options);

    mathJaxPromise = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.id = options.id || "MathJax-script";
      script.src = options.source || MATHJAX_DEFAULT_SOURCE;
      script.async = true;
      script.addEventListener("error", () => {
        mathJaxPromise = null;
        reject(new Error(`Unable to load MathJax from ${script.src}`));
      });
      script.addEventListener("load", () => {
        const ready = window.MathJax?.startup?.promise || Promise.resolve();
        ready.then(() => resolve(window.MathJax)).catch(reject);
      });
      document.head.append(script);
    });

    return mathJaxPromise;
  }

  function renderMath(root = document, options = {}) {
    const node = typeof root === "string" ? $(root) : root;
    if (!node) return Promise.resolve(null);

    return loadMath(options).then((mathJax) => {
      if (options.clear !== false && mathJax.typesetClear) {
        mathJax.typesetClear([node]);
      }
      return mathJax.typesetPromise([node]);
    });
  }

  function onInput(target, handler, options = {}) {
    const node = typeof target === "string" ? $(target) : target;
    if (!node) return () => {};

    node.addEventListener("input", handler);
    if (options.immediate !== false) handler({ currentTarget: node, target: node });
    return () => node.removeEventListener("input", handler);
  }

  function onClick(target, handler) {
    const node = typeof target === "string" ? $(target) : target;
    if (!node) return () => {};

    node.addEventListener("click", handler);
    return () => node.removeEventListener("click", handler);
  }

  function formatNumber(value, options = {}) {
    const language = normalizeLanguage(options.language);
    return Number(value).toLocaleString(language === "zh" ? "zh-CN" : "en-US", {
      maximumFractionDigits: options.maximumFractionDigits ?? options.digits ?? 2,
      minimumFractionDigits: options.minimumFractionDigits ?? 0,
    });
  }

  function formatPercent(value, options = {}) {
    return `${formatNumber(value * 100, {
      ...options,
      maximumFractionDigits: options.digits ?? 0,
    })}%`;
  }

  function mount(scope, target = document.body) {
    if (!window.PetiteVue) {
      throw new Error("PetiteVue is not loaded. Include _shared/vendor/petite-vue.iife.js first.");
    }

    return window.PetiteVue.createApp(scope).mount(target);
  }

  window.Expl2 = {
    $,
    $$,
    applyConcepts,
    applyI18n,
    clamp,
    escapeHtml,
    formatNumber,
    formatPercent,
    getInitialLanguage,
    loadMath,
    mount,
    onClick,
    onInput,
    renderMath,
    setLanguage,
    setupChapterNavigation,
    softmax,
  };

  setLanguage(getInitialLanguage(), { persist: false });
})();
