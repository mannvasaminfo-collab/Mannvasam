import "./recipes.css";
import { RECIPES } from "./recipes-data.js";
const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
const $ = (s, r = document) => r.querySelector(s);
const ease = "cubic-bezier(.2,.7,.2,1)";
const FR = { 0.25: "¼", 0.5: "½", 0.75: "¾", 0.33: "⅓", 0.67: "⅔" };
const num = (q) => { if (!q) return ""; const w = Math.floor(q), f = Math.round((q - w) * 100) / 100; if (!f) return String(w); if (FR[f]) return (w ? w + " " : "") + FR[f]; return String(q); };
const tx = (t) => Array.isArray(t) ? (/taste/i.test(t[1]) ? t[0] + " (" + t[1] + ")" : [num(Number(t[2]) || 0), t[1], t[0]].filter(Boolean).join(" ")) : (typeof t === "string" ? t : Object.values(t || {}).filter((v) => typeof v === "string" || typeof v === "number").join(" "));
const isRice = (r) => /rice|sadam|pongal|biryani|pulao|pulav|khichdi|kanji/i.test(r.name) || (r.ing || r.ingredients || []).some((t) => /\brice\b/i.test(tx(t)) && !/flour|bran|vinegar|noodle|paper|milk|syrup/i.test(tx(t)));
const ALL = RECIPES.filter(isRice).map((r) => ({ ...r, ing: r.ing || r.ingredients || [], steps: r.steps || [], tip: r.tip || "", tamil: r.tamil || "", category: r.category || "Recipes" }));
const CATS = ["All", ...new Set(ALL.map((r) => r.category))];
document.getElementById("app").innerHTML = '<section class="hero"><canvas></canvas><small>FROM OUR KITCHEN</small><h1>Simple ways to enjoy <i>your rice.</i></h1><p>Pick a dish and tick off each step as you cook.</p></section><section class="wrap"><input id="q" class="srch" type="search" placeholder="Search recipes"><div class="cats" id="cats"></div><div class="tabs" id="tabs"></div><div id="box"></div></section><footer>Rooted in tradition. Made for today.</footer>';
const pop = (x, y, n = 10) => {
  if (calm) return;
  for (let i = 0; i < n; i++) {
    const g = document.createElement("i");
    Object.assign(g.style, { position: "fixed", left: x + "px", top: y + "px", width: "6px", height: "10px", borderRadius: "50%", background: "#b68c50", pointerEvents: "none", zIndex: "50" });
    document.body.appendChild(g);
    const a = Math.random() * 6.283, d = 30 + Math.random() * 60;
    g.animate([{ transform: "translate(0,0)", opacity: 1 }, { transform: `translate(${Math.cos(a) * d}px,${Math.sin(a) * d}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }], { duration: 800, easing: ease }).onfinish = () => g.remove();
  }
};
if (!calm) {
  const c = $(".hero canvas"), x = c.getContext("2d");
  let w, h;
  const sz = () => { w = c.width = c.clientWidth; h = c.height = c.clientHeight; };
  sz(); addEventListener("resize", sz);
  const gs = Array.from({ length: 34 }, () => ({ x: Math.random() * w, y: Math.random() * h, v: 0.3 + Math.random() * 0.7, r: 0, s: 0.6 + Math.random() }));
  (function f() {
    x.clearRect(0, 0, w, h);
    for (const g of gs) { g.y += g.v; g.r += 0.01; if (g.y > h + 10) { g.y = -10; g.x = Math.random() * w; } x.save(); x.translate(g.x, g.y); x.rotate(g.r); x.fillStyle = "rgba(229,197,142,.5)"; x.beginPath(); x.ellipse(0, 0, 2.2 * g.s, 5 * g.s, 0, 0, 6.2832); x.fill(); x.restore(); }
    requestAnimationFrame(f);
  })();
}
const box = $("#box");
let cat = CATS[1] || "All", q = "", cur = 0;
const match = (r) => (cat === "All" || r.category === cat) && (!q || (r.name + " " + r.tamil).toLowerCase().includes(q));
function tabs() {
  $("#cats").innerHTML = CATS.map((c, j) => `<button class="cat${c === cat ? " on" : ""}" data-c="${j}" type="button">${c}</button>`).join("");
  const list = ALL.map((r, i) => [r, i]).filter(([r]) => match(r));
  $("#tabs").innerHTML = list.length ? list.map(([r, i]) => `<button class="tab${i === cur ? " on" : ""}" data-i="${i}" type="button">${r.name}</button>`).join("") : '<p class="none">No recipes found.</p>';
}
function prog() {
  const s = [...box.querySelectorAll(".st li")], d = s.filter((x) => x.classList.contains("done")).length;
  const b = $(".bar b", box); if (!b) return false;
  b.style.width = (s.length ? (d / s.length) * 100 : 0) + "%";
  $(".pg", box).textContent = d + " of " + s.length + " steps done";
  const all = s.length > 0 && d === s.length;
  $(".yay", box).classList.toggle("on", all);
  return all;
}
function show(i) {
  const r = ALL[i];
  if (!r) { box.innerHTML = ""; tabs(); return; }
  cur = i;
  box.innerHTML = `<article class="rc"><h2>${r.name}</h2>${r.tamil ? `<div class="ta">${r.tamil}</div>` : ""}<div class="meta"><span>${r.time}</span><span>Serves ${r.serves}</span></div><div class="bar"><b></b></div><div class="pg"></div><div class="cols"><div><h3>YOU WILL NEED</h3><ul class="ing">${r.ing.map((t) => `<li>${tx(t)}</li>`).join("")}</ul></div><div><h3>METHOD</h3><ol class="st">${r.steps.map((t) => `<li>${tx(t)}</li>`).join("")}</ol></div></div>${r.tip ? `<p class="tip"><b>Tip:</b> ${r.tip}</p>` : ""}<div class="yay">Enjoy your meal 🌾 Made with MANNVASAM rice.</div><a class="cta" href="/#mv-shop">SHOP THE RICE →</a></article>`;
  prog(); tabs();
  if (!calm) box.firstElementChild.animate([{ opacity: 0, translate: "0 24px" }, { opacity: 1, translate: "0 0" }], { duration: 600, easing: ease });
}
box.addEventListener("click", (e) => {
  const li = e.target.closest(".ing li, .st li");
  if (!li) return;
  li.classList.toggle("done");
  const r = li.getBoundingClientRect();
  if (li.classList.contains("done")) pop(r.left + 30, r.top + r.height / 2, 8);
  if (prog() && li.classList.contains("done")) for (let i = 0; i < 6; i++) setTimeout(() => pop(Math.random() * innerWidth, innerHeight * 0.3, 14), i * 140);
});
document.addEventListener("click", (e) => {
  const t = e.target.closest(".tab"), c = e.target.closest(".cat");
  if (t) show(+t.dataset.i);
  if (c) { cat = CATS[+c.dataset.c]; show(ALL.findIndex(match)); }
});
$("#q").addEventListener("input", (e) => { q = e.target.value.trim().toLowerCase(); if (!match(ALL[cur] || {})) show(ALL.findIndex(match)); else tabs(); });
show(ALL.findIndex(match));
import "./recipes-fx.js";
import "./recipes-cook.js";
import("./game23.js");
import("./game24.js");
