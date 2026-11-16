import "./extras14.css";
const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];
const ease = "cubic-bezier(.2,.7,.2,1)";
if (!calm) {
  [[".mv-cinematic-copy .eyebrow", 100], [".mv-cinematic-copy .hero-desc", 750], [".mv-cinematic-copy .gold-button", 1000]].forEach(([s, d]) => {
    const el = $(s);
    if (el) el.animate([{ opacity: 0, translate: "0 26px" }, { opacity: 1, translate: "0 0" }], { duration: 900, delay: d, easing: ease, fill: "backwards" });
  });
  const pk = $(".mv-cinematic-product img");
  if (pk) pk.animate([{ rotate: "-1.2deg", scale: 1 }, { rotate: "1.2deg", scale: 1.025 }], { duration: 3500, direction: "alternate", iterations: Infinity, easing: "ease-in-out" });
  const gl = $(".mv-product-glow");
  if (gl) gl.animate([{ scale: 1 }, { scale: 1.12 }], { duration: 2500, direction: "alternate", iterations: Infinity, easing: "ease-in-out" });
  const copy = $(".mv-cinematic-copy");
  if (copy) {
    const upd = () => { const y = Math.min(scrollY, innerHeight); copy.style.translate = `0 ${y * 0.18}px`; copy.style.opacity = String(Math.max(0, 1 - y / (innerHeight * 0.9))); };
    addEventListener("scroll", upd, { passive: true });
    upd();
  }
}
if (!calm) {
  const anims = new WeakMap();
  const io = new IntersectionObserver((es) => {
    es.forEach((e) => {
      if (!e.isIntersecting) return;
      io.unobserve(e.target);
      const a = anims.get(e.target);
      if (!a) return;
      a.effect.updateTiming({ delay: ($$(".mv-shop-card").indexOf(e.target) % 4) * 90 });
      a.play();
      a.onfinish = () => a.cancel();
    });
  }, { threshold: 0.15 });
  const scan = () => $$(".mv-shop-card").forEach((c) => {
    if (anims.has(c)) return;
    const a = c.animate([{ opacity: 0, translate: "0 40px", scale: 0.96 }, { opacity: 1, translate: "0 0", scale: 1 }], { duration: 750, easing: ease, fill: "both" });
    a.pause();
    anims.set(c, a);
    io.observe(c);
  });
  scan(); setTimeout(scan, 800); setTimeout(scan, 2000);
  setTimeout(() => $$(".mv-shop-card").forEach((c) => { const a = anims.get(c); if (a && a.playState === "paused") { a.play(); a.onfinish = () => a.cancel(); } }), 9000);
}
const isNum = (el) => el.children.length === 0 && /^\d[\d,]*(\.\d+)?[+%]?$/.test(el.textContent.trim());
const nums = $$("#trust *, .home-values *, .journey-section *, .responsible-section *").filter(isNum);
if (!calm && nums.length) {
  const io = new IntersectionObserver((es) => es.forEach((e) => {
    if (!e.isIntersecting) return;
    io.unobserve(e.target);
    const el = e.target, raw = el.textContent.trim();
    const suffix = /[+%]$/.test(raw) ? raw.slice(-1) : "";
    const body = raw.replace(/[+%]$/, "").replace(/,/g, "");
    const target = parseFloat(body), dec = (body.split(".")[1] || "").length, comma = raw.includes(",");
    const t0 = performance.now();
    const step = (t) => {
      const p = Math.min((t - t0) / 1400, 1), v = target * (1 - Math.pow(1 - p, 3));
      el.textContent = (comma ? v.toLocaleString("en-US", { minimumFractionDigits: dec, maximumFractionDigits: dec }) : v.toFixed(dec)) + suffix;
      if (p < 1) requestAnimationFrame(step); else el.textContent = raw;
    };
    requestAnimationFrame(step);
  }), { threshold: 0.6 });
  nums.forEach((el) => io.observe(el));
}
if (fine && !calm) {
  document.addEventListener("pointermove", (e) => {
    const c = e.target.closest && e.target.closest(".mv-shop-card");
    if (c) { const r = c.getBoundingClientRect(); c.style.setProperty("--mx", e.clientX - r.left + "px"); c.style.setProperty("--my", e.clientY - r.top + "px"); }
    $$(".gold-button, .mv-add-button").forEach((b) => {
      const r = b.getBoundingClientRect(), dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
      b._t = Math.hypot(dx, dy) < 90 ? [dx * 0.25, dy * 0.25] : [0, 0];
      b._c = b._c || [0, 0];
      b._on = true;
    });
  });
  (function loop() {
    $$(".gold-button, .mv-add-button").forEach((b) => {
      if (!b._on) return;
      b._c[0] += (b._t[0] - b._c[0]) * 0.18; b._c[1] += (b._t[1] - b._c[1]) * 0.18;
      b.style.translate = `${b._c[0]}px ${b._c[1]}px`;
    });
    requestAnimationFrame(loop);
  })();
}
if (!calm && fine) {
  const c = document.createElement("canvas");
  c.className = "dust14";
  document.body.appendChild(c);
  const ctx = c.getContext("2d");
  let w = 0, h = 0;
  const size = () => { w = c.width = innerWidth; h = c.height = innerHeight; };
  size(); addEventListener("resize", size);
  const dots = Array.from({ length: 36 }, () => ({ x: Math.random() * innerWidth, y: Math.random() * innerHeight, r: 0.6 + Math.random() * 1.6, vx: (Math.random() - 0.5) * 0.15, vy: -0.1 - Math.random() * 0.3, a: 0.25 + Math.random() * 0.5, p: Math.random() * 6.28 }));
  (function frame(t) {
    ctx.clearRect(0, 0, w, h);
    for (const d of dots) {
      d.x += d.vx; d.y += d.vy;
      if (d.y < -10) { d.y = h + 10; d.x = Math.random() * w; }
      if (d.x < -10) d.x = w + 10;
      if (d.x > w + 10) d.x = -10;
      ctx.beginPath(); ctx.arc(d.x, d.y, d.r, 0, 6.2832);
      ctx.fillStyle = `rgba(230,195,90,${d.a * (0.6 + 0.4 * Math.sin(t / 900 + d.p))})`; ctx.fill();
    }
    requestAnimationFrame(frame);
  })(0);
}
