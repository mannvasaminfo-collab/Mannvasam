import "./extras7.css";
const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
const isNum = (el) => el.children.length === 0 && /^\d[\d,]*(\.\d+)?[+%]?$/.test(el.textContent.trim());
const skip = ".result, .seg, .hero, form, .fbase";
const nums = [...document.querySelectorAll("section :is(b, strong, span, h3, div, p)")].filter((el) => isNum(el) && !el.closest(skip));
nums.forEach((el) => el.classList.add("mv-num"));
if (!calm && nums.length) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      io.unobserve(e.target);
      const el = e.target;
      const raw = el.textContent.trim();
      const suffix = /[+%]$/.test(raw) ? raw.slice(-1) : "";
      const body = raw.replace(/[+%]$/, "").replace(/,/g, "");
      const target = parseFloat(body);
      const dec = (body.split(".")[1] || "").length;
      const comma = raw.includes(",");
      const t0 = performance.now();
      const step = (t) => {
        const p = Math.min((t - t0) / 1400, 1);
        const v = target * (1 - Math.pow(1 - p, 3));
        el.textContent = (comma ? v.toLocaleString("en-US", { minimumFractionDigits: dec, maximumFractionDigits: dec }) : v.toFixed(dec)) + suffix;
        if (p < 1) requestAnimationFrame(step); else el.textContent = raw;
      };
      requestAnimationFrame(step);
    });
  }, { threshold: 0.6 });
  nums.forEach((el) => io.observe(el));
}
