const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];
import "./extras5.css";
const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;

if (!calm) {
  /* headline rises in word by word */
  const splitWords = (node) => [...node.childNodes].forEach((n) => {
    if (n.nodeType === 3) {
      const frag = document.createDocumentFragment();
      n.textContent.split(/(\s+)/).forEach((t) => {
        if (!t.trim()) { frag.append(t); return; }
        const s = document.createElement("span");
        s.className = "w";
        s.textContent = t;
        frag.append(s);
      });
      n.replaceWith(frag);
    } else if (n.nodeType === 1) splitWords(n);
  });
  const h1 = $("#top h1");
  if (h1) { splitWords(h1); h1.querySelectorAll(".w").forEach((w, i) => (w.style.animationDelay = `${0.15 + i * 0.12}s`)); }

  /* hero moves at its own speed while scrolling */
  const hero = $("#top");
  let ticking = false;
  addEventListener("scroll", () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      hero.style.setProperty("--py", Math.min(scrollY, innerHeight * 1.2) * 0.14 + "px");
      ticking = false;
    });
  }, { passive: true });

  /* tap the packet */
  const packet = $("#packet");
  $("#stage").insertAdjacentHTML("beforeend", '<span class="hint">Tap the packet ✦</span>');
  packet.addEventListener("click", (e) => {
    burst(e.clientX, e.clientY, 22);
    packet.classList.remove("wig");
    void packet.offsetWidth;
    packet.classList.add("wig");
    const h = $(".hint");
    if (h) h.remove();
  });

  /* tap the logo 5 times */
  let taps = 0, tapTimer;
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".nav .brand")) return;
    taps++;
    clearTimeout(tapTimer);
    tapTimer = setTimeout(() => (taps = 0), 3000);
    if (taps >= 5) { taps = 0; shower(); }
  });

  /* enquire: grains burst and a gold grain flies to the list */
  document.addEventListener("click", (e) => {
    const b = e.target.closest(".card .btn.dark");
    if (!b) return;
    const [sx, sy] = center(b);
    burst(sx, sy, 12);
    const fab = $("#bkFab");
    if (!fab) return;
    const [ex, ey] = center(fab);
    const f = document.createElement("span");
    f.className = "fly";
    f.style.left = sx + "px";
    f.style.top = sy + "px";
    document.body.appendChild(f);
    f.animate([
      { transform: "translate(0,0) scale(1)" },
      { transform: `translate(${(ex - sx) / 2}px,${(ey - sy) / 2 - 120}px) scale(1.2)`, offset: 0.5 },
      { transform: `translate(${ex - sx}px,${ey - sy}px) scale(.3)` },
    ], { duration: 700, easing: "ease-in-out" }).onfinish = () => {
      f.remove();
      fab.animate([{ transform: "scale(1)" }, { transform: "scale(1.25)" }, { transform: "scale(1)" }], { duration: 350 });
    };
  });

  /* message sent */
  $("#cform")?.addEventListener("submit", () => { const [x, y] = center($("#cform button")); burst(x, y, 26); });

  /* cook guide: grains drop into the bowl, numbers bounce */
  const bowl = $(".bowl-wrap");
  const drop = () => {
    for (let i = 0; i < 8; i++) {
      const g = document.createElement("span");
      g.className = "drop";
      g.style.left = `${35 + Math.random() * 30}%`;
      g.style.animationDelay = `${i * 60}ms`;
      bowl.appendChild(g);
      setTimeout(() => g.remove(), 1300);
    }
    $$(".result b").forEach((b) => { b.classList.remove("bounce"); void b.offsetWidth; b.classList.add("bounce"); });
  };
  $("#people")?.addEventListener("input", drop);
  $$(".seg").forEach((s) => s.addEventListener("click", (e) => e.target.closest("button") && drop()));
}

/* mouse-only effects: magnetic buttons, 3D cards, gold cursor ring */
if (!calm && fine) {
  let mag = null, tilt = null;
  document.addEventListener("mousemove", (e) => {
    const b = e.target.closest?.(".btn");
    if (mag && mag !== b) { mag.style.translate = ""; mag = null; }
    if (b) {
      const r = b.getBoundingClientRect();
      b.style.translate = `${(e.clientX - r.left - r.width / 2) * 0.22}px ${(e.clientY - r.top - r.height / 2) * 0.3}px`;
      mag = b;
    }
    const c = e.target.closest?.(".card, .tcard");
    if (tilt && tilt !== c) { tilt.style.transform = ""; tilt = null; }
    if (c) {
      const r = c.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      c.style.transform = `perspective(900px) rotateX(${(0.5 - y) * 7}deg) rotateY(${(x - 0.5) * 9}deg) translateY(-6px)`;
      c.style.setProperty("--sx", x * 100 + "%");
      c.style.setProperty("--sy", y * 100 + "%");
      tilt = c;
    }
  });

  const ring = document.createElement("div");
  ring.className = "ring";
  document.body.appendChild(ring);
  let tx = 0, ty = 0, x = 0, y = 0, shown = false;
  document.addEventListener("mousemove", (e) => {
    tx = e.clientX; ty = e.clientY;
    if (!shown) { shown = true; x = tx; y = ty; ring.classList.add("on"); }
    ring.classList.toggle("big", !!e.target.closest?.("a, button, summary, input, textarea, .card"));
  });
  (function loop() {
    x += (tx - x) * 0.18;
    y += (ty - y) * 0.18;
    ring.style.transform = `translate(${x}px,${y}px) translate(-50%,-50%)`;
    requestAnimationFrame(loop);
  })();
}

/* grain particles: burst(x, y, count) and shower() */
function grain() {
  const g = document.createElement("span");
  g.className = "grain";
  Object.assign(g.style, {
    position: "fixed", left: "0", top: "0", width: "7px", height: "11px",
    borderRadius: "50%", background: "#f3e3b0", boxShadow: "0 0 0 1px rgba(212,175,55,.6)",
    pointerEvents: "none", zIndex: "130",
  });
  document.body.appendChild(g);
  return g;
}
function burst(x, y, n = 14) {
  if (calm) return;
  for (let i = 0; i < n; i++) {
    const g = grain();
    g.style.left = x + "px";
    g.style.top = y + "px";
    const a = Math.random() * Math.PI * 2;
    const d = 40 + Math.random() * 90;
    g.animate([
      { transform: "translate(0,0) rotate(0deg)", opacity: 1 },
      { transform: `translate(${Math.cos(a) * d}px,${Math.sin(a) * d + 30}px) rotate(${Math.random() * 360}deg)`, opacity: 0 },
    ], { duration: 1000 + Math.random() * 500, easing: "ease-out" }).onfinish = () => g.remove();
  }
}
function shower() {
  if (calm) return;
  for (let i = 0; i < 70; i++) {
    const g = grain();
    g.style.left = Math.random() * 100 + "vw";
    g.style.top = "-20px";
    g.animate([
      { transform: "translateY(0) rotate(0deg)", opacity: 1 },
      { transform: `translateY(${innerHeight + 60}px) rotate(${400 + Math.random() * 400}deg)`, opacity: 1 },
    ], { duration: 2200 + Math.random() * 1600, delay: Math.random() * 1400, easing: "ease-in", fill: "backwards" }).onfinish = () => g.remove();
  }
}
