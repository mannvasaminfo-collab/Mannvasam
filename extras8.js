import "./extras8.css";
const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
const h1 = document.querySelector(".mv-cinematic-copy h1");
if (h1 && !calm && !h1.dataset.split) {
  h1.dataset.split = "1";
  let i = 0;
  const wrap = (node) => {
    [...node.childNodes].forEach((n) => {
      if (n.nodeType === 3) {
        const frag = document.createDocumentFragment();
        n.textContent.split(/(\s+)/).forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(" ")); return; }
          const w = document.createElement("span");
          w.className = "hw";
          const s = document.createElement("span");
          s.textContent = part;
          s.style.setProperty("--d", 0.15 + i++ * 0.09 + "s");
          w.appendChild(s);
          frag.appendChild(w);
        });
        n.replaceWith(frag);
      } else if (n.nodeName === "I") {
        wrap(n);
      }
    });
  };
  wrap(h1);
}
const hero = document.querySelector(".mv-cinematic-hero");
const layers = [
  [".mv-cinematic-product img", 18],
  [".mv-product-glow", 30],
  [".mv-product-orbit", 10],
].map(([s, k]) => [document.querySelector(s), k]).filter(([el]) => el);
if (hero && fine && !calm && layers.length) {
  let tx = 0, ty = 0, x = 0, y = 0;
  hero.addEventListener("mousemove", (e) => {
    const r = hero.getBoundingClientRect();
    tx = (e.clientX - r.left) / r.width - 0.5;
    ty = (e.clientY - r.top) / r.height - 0.5;
  });
  hero.addEventListener("mouseleave", () => { tx = 0; ty = 0; });
  (function loop() {
    x += (tx - x) * 0.08;
    y += (ty - y) * 0.08;
    layers.forEach(([el, k]) => { el.style.translate = `${-x * k}px ${-y * k}px`; });
    requestAnimationFrame(loop);
  })();
}
