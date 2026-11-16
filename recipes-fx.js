const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
const $ = (s, r = document) => r.querySelector(s);
const ease = "cubic-bezier(.2,.7,.2,1)";
const hero = $(".hero");
if (hero && !calm) {
  const c = document.createElement("canvas");
  Object.assign(c.style, { position: "absolute", inset: "0", width: "100%", height: "100%", pointerEvents: "none" });
  hero.appendChild(c);
  const x = c.getContext("2d");
  let w = 0, h = 0, mx = -999, my = -999;
  const sz = () => { w = c.width = hero.clientWidth; h = c.height = hero.clientHeight; };
  sz(); addEventListener("resize", sz);
  hero.addEventListener("pointermove", (e) => { const r = hero.getBoundingClientRect(); mx = e.clientX - r.left; my = e.clientY - r.top; });
  hero.addEventListener("pointerleave", () => { mx = -999; my = -999; });
  const gs = Array.from({ length: 90 }, () => ({ x: Math.random() * w, y: Math.random() * h, vx: 0, v: 0.5 + Math.random() * 1.2, r: Math.random() * 6.28, vr: (Math.random() - 0.5) * 0.04, s: 1 + Math.random() * 1.6, k: Math.random() * 6.28 }));
  (function f(t) {
    x.clearRect(0, 0, w, h);
    for (const g of gs) {
      const dx = g.x - mx, dy = g.y - my, d = Math.hypot(dx, dy);
      if (d < 110 && d > 0.1) { const p = (110 - d) / 110; g.vx += (dx / d) * p * 1.6; g.y += (dy / d) * p * 2; }
      g.vx *= 0.92; g.x += g.vx + Math.sin(t / 1400 + g.k) * 0.4; g.y += g.v; g.r += g.vr;
      if (g.y > h + 14) { g.y = -14; g.x = Math.random() * w; }
      if (g.x < -14) g.x = w + 14;
      if (g.x > w + 14) g.x = -14;
      x.save(); x.translate(g.x, g.y); x.rotate(g.r); x.fillStyle = "rgba(240,214,160,.85)";
      x.beginPath(); x.ellipse(0, 0, 2.6 * g.s, 6.2 * g.s, 0, 0, 6.2832); x.fill(); x.restore();
    }
    requestAnimationFrame(f);
  })(0);
}
const h1 = $(".hero h1");
if (h1 && !calm && !h1.dataset.split) {
  h1.dataset.split = "1";
  let i = 0;
  const wrap = (node) => [...node.childNodes].forEach((n) => {
    if (n.nodeType === 3) {
      const frag = document.createDocumentFragment();
      n.textContent.split(/(\s+)/).forEach((part) => {
        if (!part) return;
        if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(" ")); return; }
        const w = document.createElement("span"), s = document.createElement("span");
        w.className = "hw"; s.textContent = part;
        s.animate([{ translate: "0 110%" }, { translate: "0 0" }], { duration: 900, delay: 150 + i++ * 90, easing: ease, fill: "backwards" });
        w.appendChild(s); frag.appendChild(w);
      });
      n.replaceWith(frag);
    } else if (n.nodeName === "I") wrap(n);
  });
  wrap(h1);
}
const stag = (els, from) => els.forEach((el, i) => el.animate([{ opacity: 0, translate: from }, { opacity: 1, translate: "0 0" }], { duration: 600, delay: 120 + i * 60, easing: ease, fill: "backwards" }));
const box = $("#box");
if (box && !calm) {
  const go = () => { stag([...box.querySelectorAll(".ing li")], "-24px 0"); stag([...box.querySelectorAll(".st li")], "24px 0"); };
  new MutationObserver(go).observe(box, { childList: true });
  go();
}
if (hero && !calm) {
  const px = () => { const y = Math.min(scrollY, 500); hero.querySelectorAll("small, h1, p").forEach((e) => { e.style.translate = `0 ${y * 0.2}px`; }); };
  addEventListener("scroll", px, { passive: true });
}
