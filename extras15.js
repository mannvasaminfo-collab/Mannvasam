import "./extras15.css";
const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
const ease = "cubic-bezier(.2,.7,.2,1)";
const grain = (x, y, z = 9998) => {
  const g = document.createElement("i");
  Object.assign(g.style, { position: "fixed", left: x + "px", top: y + "px", width: "6px", height: "10px", borderRadius: "50%", background: "#e5c58e", boxShadow: "0 0 0 1px rgba(182, 140, 80,.7)", pointerEvents: "none", zIndex: String(z) });
  document.body.appendChild(g);
  return g;
};
const fall = (n, z) => {
  for (let i = 0; i < n; i++) {
    const g = grain(Math.random() * innerWidth, -20, z);
    g.animate([{ transform: "translateY(0) rotate(0deg)", opacity: 1 }, { transform: `translateY(${innerHeight + 60}px) rotate(${300 + Math.random() * 400}deg)`, opacity: 1 }], { duration: 1500 + Math.random() * 900, delay: Math.random() * 700, easing: "ease-in" }).onfinish = () => g.remove();
  }
};
try {
  if (!calm && !sessionStorage.getItem("mv-intro")) {
    sessionStorage.setItem("mv-intro", "1");
    const s = document.createElement("div");
    s.id = "intro15";
    s.innerHTML = '<img src="/images/mannvasam-logo-transparent.png" alt="">';
    document.body.appendChild(s);
    fall(46, 9999);
    s.querySelector("img").animate([{ opacity: 0, scale: 0.82 }, { opacity: 1, scale: 1 }], { duration: 1100, delay: 350, easing: ease, fill: "both" });
    const out = () => s.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 600, fill: "forwards" }).onfinish = () => s.remove();
    setTimeout(out, 2300);
    s.addEventListener("click", out);
    setTimeout(() => s.remove(), 4000);
  }
} catch {}
const bagSpot = () => {
  const el = document.querySelector('[class*="mv-cart-btn"], [class*="mv-bag"], [class*="cart-toggle"]');
  if (el) { const r = el.getBoundingClientRect(); if (r.width) return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }
  return { x: innerWidth - 50, y: 40 };
};
document.addEventListener("click", (e) => {
  const b = e.target.closest(".mv-add-button");
  if (!b || calm) return;
  const r = b.getBoundingClientRect(), sx = r.left + r.width / 2, sy = r.top + r.height / 2, t = bagSpot();
  for (let i = 0; i < 14; i++) {
    const g = grain(sx, sy), a = Math.random() * 6.283, d = 30 + Math.random() * 50;
    g.animate([{ transform: "translate(0,0)", opacity: 1 }, { transform: `translate(${Math.cos(a) * d}px,${Math.sin(a) * d}px)`, opacity: 1, offset: 0.35 }, { transform: `translate(${t.x - sx}px,${t.y - sy}px) scale(.4)`, opacity: 0.2 }], { duration: 900 + Math.random() * 300, delay: i * 18, easing: "cubic-bezier(.5,0,.3,1)" }).onfinish = () => g.remove();
  }
});
const _rm = Storage.prototype.removeItem;
Storage.prototype.removeItem = function (k) {
  _rm.call(this, k);
  if (k === "mv-shop-cart" && document.querySelector("#mv-checkout") && !calm) fall(80, 9998);
};
const hero = document.querySelector(".mv-cinematic-hero");
if (hero && !calm) {
  if (getComputedStyle(hero).position === "static") hero.style.position = "relative";
  const c = document.createElement("canvas");
  c.className = "rice15";
  hero.appendChild(c);
  const ctx = c.getContext("2d");
  let w = 0, h = 0, run = true;
  const size = () => { w = c.width = hero.clientWidth; h = c.height = hero.clientHeight; };
  size(); addEventListener("resize", size);
  const gr = Array.from({ length: innerWidth < 700 ? 14 : 30 }, () => ({ x: Math.random() * w, y: Math.random() * h, s: 0.6 + Math.random() * 1.1, v: 0.25 + Math.random() * 0.6, r: Math.random() * 6.28, vr: (Math.random() - 0.5) * 0.03, sw: Math.random() * 6.28 }));
  new IntersectionObserver((e) => { run = e[0].isIntersecting; }).observe(hero);
  (function f(t) {
    if (run) {
      ctx.clearRect(0, 0, w, h);
      for (const g of gr) {
        g.y += g.v; g.r += g.vr;
        if (g.y > h + 12) { g.y = -12; g.x = Math.random() * w; }
        ctx.save(); ctx.translate(g.x + Math.sin(t / 1500 + g.sw) * 18, g.y); ctx.rotate(g.r);
        ctx.globalAlpha = 0.55; ctx.fillStyle = "#e5c58e"; ctx.beginPath(); ctx.ellipse(0, 0, 2.2 * g.s, 5.2 * g.s, 0, 0, 6.2832); ctx.fill(); ctx.restore();
      }
    }
    requestAnimationFrame(f);
  })(0);
}
if (fine && !calm) {
  const r = document.createElement("div");
  r.className = "ring15";
  document.body.appendChild(r);
  let tx = 0, ty = 0, x = 0, y = 0, shown = false;
  addEventListener("pointermove", (e) => {
    tx = e.clientX; ty = e.clientY;
    if (!shown) { shown = true; x = tx; y = ty; r.classList.add("on"); }
    r.classList.toggle("big", !!(e.target.closest && e.target.closest("a, button, select, summary, .mv-shop-card")));
  });
  (function l() { x += (tx - x) * 0.18; y += (ty - y) * 0.18; r.style.transform = `translate(${x}px,${y}px)`; requestAnimationFrame(l); })();
}
