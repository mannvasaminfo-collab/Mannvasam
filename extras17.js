import "./extras17.css";
const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
const CH = [["CHAPTER 1", "It begins in the soil."], ["CHAPTER 2", "One seed. Patient hands."], ["CHAPTER 3", "Sun, rain and time."], ["CHAPTER 4", "Now it reaches your kitchen."]];
const sec = document.createElement("section");
sec.id = "wow";
sec.innerHTML = `<div class="stage"><div class="sky"></div><canvas></canvas><div class="halo"></div>${CH.map(([a, b]) => `<div class="chap"><small>${a}</small><h2>${b}</h2></div>`).join("")}<div class="pack"><img src="/images/mannvasam-shivan-samba-hero.png" alt="MANNVASAM Shiva Samba rice"></div><a class="cta" href="#featured-product">ORDER YOUR RICE ↓</a><div class="bar"></div></div>`;
const anchor = document.querySelector("#story");
if (anchor) anchor.before(sec); else (document.querySelector("main") || document.body).appendChild(sec);
const q = (s) => sec.querySelector(s);
const sky = q(".sky"), halo = q(".halo"), pack = q(".pack"), cta = q(".cta"), bar = q(".bar");
const chaps = [...sec.querySelectorAll(".chap")];
const cv = q("canvas"), ctx = cv.getContext("2d");
let W = 0, H = 0, P = 0, mx = 0, my = 0;
const size = () => { W = cv.width = innerWidth; H = cv.height = innerHeight; };
size(); addEventListener("resize", size);
const mix = (a, b, t) => a + (b - a) * t;
const clamp = (v) => Math.max(0, Math.min(1, v));
const seg = (p, a, b) => clamp((p - a) / (b - a));
const col = (c1, c2, t) => c1.map((v, i) => Math.round(mix(v, c2[i], t)));
const progress = () => { const r = sec.getBoundingClientRect(); P = clamp(-r.top / (r.height - innerHeight)); };
addEventListener("scroll", progress, { passive: true }); progress();
addEventListener("pointermove", (e) => { mx = e.clientX / innerWidth - 0.5; my = e.clientY / innerHeight - 0.5; });
const N = innerWidth < 700 ? 50 : 100;
const gs = Array.from({ length: N }, () => ({ x: Math.random() * innerWidth, y: Math.random() * innerHeight, v: 0.3 + Math.random() * 0.9, r: Math.random() * 6.28, s: 0.6 + Math.random() * 1.2, k: Math.random() }));
const WIN = [[0, 0.22], [0.2, 0.42], [0.4, 0.62], [0.6, 1.01]];
function frame(t) {
  sky.style.background = `linear-gradient(180deg, rgb(${col([26, 16, 8], [16, 44, 22], seg(P, 0.15, 0.5))}), rgb(${col([60, 34, 12], [96, 74, 16], seg(P, 0.45, 0.85))}))`;
  ctx.clearRect(0, 0, W, H);
  const pull = seg(P, 0.72, 0.95), c = col([150, 100, 50], [243, 227, 176], seg(P, 0.1, 0.5));
  for (const g of gs) {
    g.y -= g.v * (1 - pull * 0.8); g.r += 0.01;
    if (g.y < -10) { g.y = H + 10; g.x = Math.random() * W; }
    const x = mix(g.x + Math.sin(t / 1200 + g.k * 9) * 20, W / 2 + Math.cos(g.k * 6.28 + t / 900) * (60 + g.k * 120), pull);
    const y = mix(g.y, H * 0.58 + Math.sin(g.k * 6.28 + t / 900) * (40 + g.k * 90), pull);
    ctx.save(); ctx.translate(x, y); ctx.rotate(g.r); ctx.fillStyle = `rgba(${c},${0.35 + 0.5 * g.k})`;
    ctx.beginPath(); ctx.ellipse(0, 0, 2.4 * g.s, 5.4 * g.s, 0, 0, 6.2832); ctx.fill(); ctx.restore();
  }
  chaps.forEach((el, i) => {
    const [a, b] = WIN[i], inn = seg(P, a, a + 0.05), out = i < 3 ? seg(P, b - 0.05, b) : 0;
    el.style.opacity = inn * (1 - out);
    el.style.transform = `translateY(${(1 - inn) * 30 - out * 30}px)`;
  });
  const pp = seg(P, 0.5, 0.86);
  pack.style.opacity = pp;
  pack.style.transform = `translateY(${(1 - pp) * 120}px) scale(${mix(0.55, 1, pp)}) rotateY(${mix(-110, 0, pp) + mx * 18 * pp}deg) rotateX(${-my * 12 * pp}deg)`;
  halo.style.opacity = seg(P, 0.55, 0.9);
  halo.style.transform = `scale(${mix(0.6, 1.1, seg(P, 0.55, 1))})`;
  cta.style.opacity = seg(P, 0.9, 0.98);
  cta.style.pointerEvents = P > 0.93 ? "auto" : "none";
  bar.style.transform = `scaleX(${P})`;
  requestAnimationFrame(frame);
}
if (!calm) requestAnimationFrame(frame);
