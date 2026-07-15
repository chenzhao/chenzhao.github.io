(function () {
  function $(selector, root = document) {
    return root.querySelector(selector);
  }

  function $$(selector, root = document) {
    return Array.from(root.querySelectorAll(selector));
  }

  function number(selector, fallback) {
    const value = Number($(selector)?.value);
    return Number.isFinite(value) ? value : fallback;
  }

  function fmt(value, digits = 2) {
    return Number(value).toLocaleString("zh-CN", {
      maximumFractionDigits: digits,
      minimumFractionDigits: 0,
    });
  }

  function setupOpticsLab() {
    const output = $("#optics-output");
    if (!output) return;

    const update = () => {
      const wavelengthUm = number("#optics-wavelength", 550) / 1000;
      const fNumber = number("#optics-fnumber", 4);
      const pitch = number("#optics-pitch", 2);
      const airyDiameter = 2.44 * wavelengthUm * fNumber;
      const cutoff = 1 / (wavelengthUm / 1000 * fNumber);
      const nyquist = 1 / (2 * pitch / 1000);
      output.textContent = `Airy 直径约 ${fmt(airyDiameter, 2)} µm，相当于 ${fmt(airyDiameter / pitch, 2)} 个像素 pitch。衍射 cutoff 约 ${fmt(cutoff, 0)} lp/mm，像素 Nyquist 约 ${fmt(nyquist, 0)} lp/mm。`;
    };

    $$("#optics-lab input").forEach((input) => input.addEventListener("input", update));
    update();
  }

  function srgbToLinear(value) {
    return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  }

  function linearToSrgb(value) {
    return value <= 0.0031308 ? value * 12.92 : 1.055 * value ** (1 / 2.4) - 0.055;
  }

  function setupColorLab() {
    const output = $("#color-output");
    if (!output) return;

    const update = () => {
      const a = number("#color-a", 0);
      const b = number("#color-b", 255);
      const wrong = (a + b) / 2;
      const linear = (srgbToLinear(a / 255) + srgbToLinear(b / 255)) / 2;
      const encoded = linearToSrgb(linear) * 255;
      output.textContent = `直接在 sRGB code 上平均得到 ${fmt(wrong, 0)}；先转线性光再平均、再编码，得到约 ${fmt(encoded, 0)}。差异越大，说明非线性编码越不能当物理亮度。`;
    };

    $$("#color-lab input").forEach((input) => input.addEventListener("input", update));
    update();
  }

  function setupSensorsLab() {
    const output = $("#sensors-output");
    if (!output) return;

    const update = () => {
      const electrons = number("#sensor-electrons", 10000);
      const dark = number("#sensor-dark", 0);
      const read = number("#sensor-read", 1.5);
      const fullWell = number("#sensor-fullwell", 20000);
      const snr = electrons / Math.sqrt(Math.max(1e-9, electrons + dark + read ** 2));
      const drStops = Math.log2(fullWell / read);
      const drDb = 20 * Math.log10(fullWell / read);
      output.textContent = `当前 SNR 约 ${fmt(snr, 1)}，也就是 ${fmt(20 * Math.log10(snr), 1)} dB。按 FWC/read noise 估算动态范围约 ${fmt(drStops, 1)} stops / ${fmt(drDb, 1)} dB。`;
    };

    $$("#sensors-lab input").forEach((input) => input.addEventListener("input", update));
    update();
  }

  function pqEncode(luminance) {
    const m1 = 2610 / 16384;
    const m2 = (2523 / 4096) * 128;
    const c1 = 3424 / 4096;
    const c2 = (2413 / 4096) * 32;
    const c3 = (2392 / 4096) * 32;
    const y = Math.max(0, luminance) / 10000;
    return ((c1 + c2 * y ** m1) / (1 + c3 * y ** m1)) ** m2;
  }

  function setupHdrLab() {
    const output = $("#hdr-output");
    if (!output) return;

    const update = () => {
      const min = Math.max(0.0001, number("#hdr-min", 0.005));
      const max = Math.max(min, number("#hdr-max", 1000));
      const dr = max / min;
      const stops = Math.log2(dr);
      const code = Math.round(pqEncode(max) * 1023);
      output.textContent = `动态范围约 ${fmt(dr, 0)}:1，也就是 ${fmt(stops, 1)} stops。若按 PQ 编码，${fmt(max, 1)} nits 约落在 10-bit code ${code}。`;
    };

    $$("#hdr-lab input").forEach((input) => input.addEventListener("input", update));
    update();
  }

  window.addEventListener("DOMContentLoaded", () => {
    window.Expl2?.renderMath(document.body).catch(() => {});
    setupOpticsLab();
    setupColorLab();
    setupSensorsLab();
    setupHdrLab();
  });
})();
