import "./extras16.css";
const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];
const ease = "cubic-bezier(.2,.7,.2,1)";
if (fine && !calm) {
  const reset = () => $$(".mv-shop-card").forEach((x) => { x.style.rotate = ""; });
  document.addEventListener("pointermove", (e) => {
    const c = e.target.closest && e.target.closest(".mv-shop-card");
    $$(".mv-shop-card").forEach((x) => { if (x !== c && x.style.rotate) x.style.rotate = ""; });
    if (!c) return;
    if (c.parentElement) c.parentElement.style.perspective = "900px";
    const r = c.getBoundingClientRect();
    const nx = (e.clientX - r.left) / r.width - 0.5, ny = (e.clientY - r.top) / r.height - 0.5;
    c.style.rotate = `${-ny} ${nx} 0 ${Math.min(Math.hypot(nx, ny) * 14, 8)}deg`;
  });
  document.documentElement.addEventListener("mouseleave", reset);
}
const prod = $(".mv-cinematic-product");
if (prod && !calm) {
  const up = () => { const p = Math.min(scrollY / innerHeight, 1); prod.style.translate = `0 ${-p * 70}px`; prod.style.scale = String(1 + p * 0.1); };
  addEventListener("scroll", up, { passive: true });
  up();
}
if (!calm) {
  const anims = new WeakMap();
  const io = new IntersectionObserver((es) => es.forEach((e) => {
    if (!e.isIntersecting) return;
    io.unobserve(e.target);
    const a = anims.get(e.target);
    if (a) { a.play(); a.onfinish = () => a.cancel(); }
  }), { threshold: 0.3 });
  const scan = () => $$(".section-heading h2, .home-values h2, .trust-section h2, .journey-section h2, .responsible-section h2, .intro h2").forEach((h) => {
    if (anims.has(h)) return;
    const a = h.animate([{ opacity: 0, translate: "0 28px", clipPath: "inset(0 0 100% 0)" }, { opacity: 1, translate: "0 0", clipPath: "inset(0 0 -20% 0)" }], { duration: 900, easing: ease, fill: "both" });
    a.pause();
    anims.set(h, a);
    io.observe(h);
  });
  scan(); setTimeout(scan, 800);
  setTimeout(() => $$(".section-heading h2, .home-values h2, .trust-section h2, .journey-section h2, .responsible-section h2, .intro h2").forEach((h) => { const a = anims.get(h); if (a && a.playState === "paused") { a.play(); a.onfinish = () => a.cancel(); } }), 9000);
}
document.addEventListener("change", (e) => {
  if (calm || !e.target.matches || !e.target.matches(".mv-pack-select")) return;
  const card = e.target.closest(".mv-shop-card"), p = card && card.querySelector(".mv-card-price");
  if (p) setTimeout(() => p.animate([{ scale: 1.35, color: "#ffffff" }, { scale: 1, color: "#f3e3b0" }], { duration: 550, easing: ease }), 0);
});
let tel = null, busy = false, last = 0;
const num = (s) => Number(String(s).replace(/[^\d]/g, ""));
setInterval(() => {
  const el = $(".mv-cart-total strong");
  if (!el || el === tel) return;
  tel = el; last = num(el.textContent);
  new MutationObserver(() => {
    if (busy) return;
    const txt = el.textContent.trim();
    if (!/^₹[\d,]+$/.test(txt)) { last = num(txt); return; }
    const to = num(txt), from = last;
    last = to;
    if (from === to || calm) return;
    busy = true;
    const t0 = performance.now();
    (function step(t) {
      const p = Math.min((t - t0) / 600, 1);
      el.textContent = "₹" + Math.round(from + (to - from) * (1 - Math.pow(1 - p, 3))).toLocaleString("en-IN");
      if (p < 1) requestAnimationFrame(step); else { el.textContent = txt; busy = false; }
    })(t0);
  }).observe(el, { childList: true, characterData: true, subtree: true });
}, 1000);
