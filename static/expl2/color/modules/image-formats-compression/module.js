(function () {
  function $(selector, root = document) {
    return root.querySelector(selector);
  }

  function $$(selector, root = document) {
    return Array.from(root.querySelectorAll(selector));
  }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function formatNumber(value, digits = 2) {
    return Number(value).toLocaleString("zh-CN", {
      maximumFractionDigits: digits,
      minimumFractionDigits: 0,
    });
  }

  function formatBytes(bytes) {
    const units = ["B", "KB", "MB", "GB"];
    let value = bytes;
    let unit = 0;
    while (value >= 1024 && unit < units.length - 1) {
      value /= 1024;
      unit += 1;
    }
    return `${formatNumber(value, unit === 0 ? 0 : 2)} ${units[unit]}`;
  }

  function readNumber(selector, fallback) {
    const value = Number($(selector)?.value);
    return Number.isFinite(value) ? value : fallback;
  }

  function setupRawSizeCalculator() {
    const output = $("#raw-size-output");
    if (!output) return;

    const update = () => {
      const width = clamp(readNumber("#raw-width", 4000), 1, 100000);
      const height = clamp(readNumber("#raw-height", 3000), 1, 100000);
      const channels = clamp(readNumber("#raw-channels", 3), 1, 8);
      const bits = clamp(readNumber("#raw-bits", 8), 1, 32);
      const bytes = width * height * channels * (bits / 8);
      output.textContent = `${formatBytes(bytes)}，约 ${formatNumber(bytes / 1000000, 2)} MB`;
    };

    $$("#raw-size-lab input").forEach((input) => input.addEventListener("input", update));
    update();
  }

  function setupSubsamplingMeter() {
    const range = $("#subsampling-mode");
    const output = $("#subsampling-output");
    const bars = $$(".subsampling-bar");
    if (!range || !output || !bars.length) return;

    const modes = [
      { label: "4:4:4", factor: 3, text: "每个像素都有 Y、Cb、Cr，色度不降采样。" },
      { label: "4:2:2", factor: 2, text: "水平色度减半，样本量约为 RGB/YCbCr 4:4:4 的 2/3。" },
      { label: "4:2:0", factor: 1.5, text: "水平和垂直色度都减半，是照片和视频里很常见的折中。" },
    ];

    const update = () => {
      const mode = modes[Number(range.value)] || modes[2];
      output.textContent = `${mode.label}: ${mode.text} 相对样本量 ${formatNumber(mode.factor / 3 * 100, 0)}%。`;
      bars.forEach((bar, index) => {
        const isChroma = index > 0;
        const scale = isChroma ? mode.factor / 3 : 1;
        bar.style.inlineSize = `${isChroma ? Math.max(28, scale * 100) : 100}%`;
        bar.dataset.mode = mode.label;
      });
    };

    range.addEventListener("input", update);
    update();
  }

  function setupDctLowpassLab() {
    const range = $("#dct-keep");
    const output = $("#dct-output");
    const bars = $(".dct-bars");
    if (!range || !output || !bars) return;

    const original = [4, 3, 2, 1];
    const coeffs = [5, 2.230443, 0, 0.158513];
    const basis = [
      [0.5, 0.5, 0.5, 0.5],
      [0.653281, 0.270598, -0.270598, -0.653281],
      [0.5, -0.5, -0.5, 0.5],
      [0.270598, -0.653281, 0.653281, -0.270598],
    ];

    const reconstruct = (keep) =>
      original.map((_, n) =>
        coeffs.slice(0, keep).reduce((sum, coeff, k) => sum + coeff * basis[k][n], 0),
      );

    const update = () => {
      const keep = clamp(Number(range.value), 1, 4);
      const approx = reconstruct(keep);
      const sse = original.reduce((sum, value, index) => sum + (value - approx[index]) ** 2, 0);
      bars.innerHTML = original
        .map((value, index) => {
          const height = Math.max(10, approx[index] * 28);
          return `<span><b style="block-size:${height}px"></b><em>${formatNumber(approx[index], 2)}</em><small>${value}</small></span>`;
        })
        .join("");
      output.textContent = `保留前 ${keep} 个系数。近似值为 [${approx
        .map((value) => formatNumber(value, 2))
        .join(", ")}]。误差平方和约 ${formatNumber(sse, 4)}。`;
    };

    range.addEventListener("input", update);
    update();
  }

  function setupQuantizationPlayground() {
    const range = $("#quant-step");
    const output = $("#quant-output");
    const grid = $(".quant-grid");
    if (!range || !output || !grid) return;

    const coeffs = [92, 21, -12, 7, 3, 1, -1, 0, 15, -8, 5, 2, 1, 0, 0, 0];

    const update = () => {
      const q = clamp(Number(range.value), 1, 48);
      const quantized = coeffs.map((value) => Math.round(value / q));
      const zeros = quantized.filter((value) => value === 0).length;
      output.textContent = `量化步长 q=${q}。16 个示例系数里有 ${zeros} 个变成 0，熵编码会更容易，但细节也更容易丢。`;
      grid.innerHTML = quantized
        .map((value) => `<span class="${value === 0 ? "is-zero" : ""}">${value}</span>`)
        .join("");
    };

    range.addEventListener("input", update);
    update();
  }

  function setupFormatChooser() {
    const form = $("#format-chooser");
    const output = $("#format-output");
    if (!form || !output) return;

    const update = () => {
      const type = new FormData(form).get("image-type");
      const needsAlpha = $("#needs-alpha")?.checked;
      const needsAnimation = $("#needs-animation")?.checked;
      const needsHdr = $("#needs-hdr")?.checked;
      const webFirst = $("#web-first")?.checked;

      let answer = "JPEG";
      let why = "自然照片、极致兼容、无透明和 HDR 要求时，JPEG 仍是最稳的分发格式。";

      if (type === "graphic" || type === "screenshot") {
        answer = needsAlpha ? "PNG 或 WebP lossless" : "PNG / WebP lossless";
        why = "文字边缘、纯色块、二维码和 UI 线条需要无损或近无损，低质量 JPEG 很容易污染边缘。";
      } else if (needsAnimation) {
        answer = webFirst ? "Animated WebP / AVIF" : "HEIF sequence 或视频容器";
        why = "多帧内容需要序列编码或现代动画格式，GIF 兼容老但体积和颜色表现都弱。";
      } else if (needsHdr) {
        answer = webFirst ? "AVIF / JPEG XL / 平台允许时 HEIF" : "HEIC/HEIF";
        why = "HDR、高位深和广色域依赖色彩元数据与现代容器，传统 JPEG 工作流很容易丢信息。";
      } else if (needsAlpha) {
        answer = webFirst ? "WebP" : "PNG";
        why = "透明商品图可用 PNG 保兼容，也可用 WebP 的有损 RGB + 无损 alpha 换更小体积。";
      } else if (type === "photo" && webFirst) {
        answer = "WebP";
        why = "Web 分发的自然照片通常可用 WebP 在接近视觉质量下比 JPEG 更小。";
      }

      output.innerHTML = `<strong>${answer}</strong><span>${why}</span>`;
    };

    form.addEventListener("input", update);
    update();
  }

  window.addEventListener("DOMContentLoaded", () => {
    window.Expl2?.renderMath(document.body).catch(() => {});
    setupRawSizeCalculator();
    setupSubsamplingMeter();
    setupDctLowpassLab();
    setupQuantizationPlayground();
    setupFormatChooser();
  });
})();
