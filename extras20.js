import "./extras20.css";
const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
const ease = "cubic-bezier(.2,.7,.2,1)";
const $ = (s, r = document) => r.querySelector(s);
let root = null, card = null, raf = 0, p0 = 0;
const inr = (n) => "₹" + Math.round(n).toLocaleString("en-IN");
const nm = (s) => Number(String(s).replace(/[^\d]/g, "")) || 0;
const info = () => ({ name: $("h3", card).textContent.trim(), cat: ($(".mv-shop-category", card) || { textContent: "" }).textContent.trim(), img: ($(".mv-shop-image img", card) || {}).src || "", sel: $(".mv-pack-select", card), price: () => nm($(".mv-card-price", card).textContent) });
function close() { if (!root) return; cancelAnimationFrame(raf); document.body.style.overflow = ""; root.remove(); root = card = null; }
addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });
function grains(cv) {
  const x = cv.getContext("2d"); let w = cv.width = innerWidth, h = cv.height = innerHeight;
  const gs = Array.from({ length: 46 }, () => ({ x: Math.random() * w, y: Math.random() * h, v: 0.3 + Math.random() * 0.8, r: 0, s: 0.6 + Math.random() }));
  (function f() { x.clearRect(0, 0, w, h); for (const g of gs) { g.y -= g.v; g.r += 0.01; if (g.y < -10) { g.y = h + 10; g.x = Math.random() * w; } x.save(); x.translate(g.x, g.y); x.rotate(g.r); x.fillStyle = "rgba(229,197,142,.5)"; x.beginPath(); x.ellipse(0, 0, 2.2 * g.s, 5 * g.s, 0, 0, 6.2832); x.fill(); x.restore(); } raf = requestAnimationFrame(f); })();
}
function open(c) {
  if (root) return;
  card = c; document.body.style.overflow = "hidden";
  root = document.createElement("div"); root.id = "j20"; root.setAttribute("role", "dialog"); root.setAttribute("aria-modal", "true");
  root.innerHTML = '<canvas></canvas><button class="skip" type="button" data-close>Skip ✕</button><div class="dots"><i></i><i></i><i></i><i></i></div><div class="stage"></div>';
  document.body.appendChild(root);
  if (!calm) grains($("canvas", root));
  let seen = false; try { seen = !!localStorage.getItem("mv-j20"); } catch {}
  show(seen ? 1 : 0);
}
window.addEventListener("click", (e) => {
  if (e.target.closest("select, .mv-add-button, .mv-pack-select")) return;
  const h = e.target.closest(".mv-shop-image, .mv-shop-card h3"), c = h && h.closest(".mv-shop-card");
  if (c && c.dataset.soon !== "1") { e.preventDefault(); e.stopPropagation(); open(c); }
}, true);
const rise = (el, d = 0) => { if (el && !calm) el.animate([{ opacity: 0, translate: "0 24px" }, { opacity: 1, translate: "0 0" }], { duration: 700, delay: d, easing: ease, fill: "backwards" }); };
function show(n) {
  const d = info(), st = $(".stage", root);
  root.querySelectorAll(".dots i").forEach((x, i) => x.classList.toggle("on", i <= n));
  const T = ["", "STEP 2 · CHOOSE YOUR PACK", "STEP 3 · TASTE IT", "STEP 4 · READY"];
  if (n === 0) {
    st.innerHTML = '<div class="pack"><img alt=""></div><small></small><h2></h2><p>From our soil to your soul.</p><button class="go" data-n="1" type="button">CHOOSE YOUR PACK →</button>';
    $("img", st).src = d.img; $("small", st).textContent = d.cat || "MEET YOUR RICE"; $("h2", st).textContent = d.name;
    if (!calm) $(".pack img", st).animate([{ opacity: 0, transform: "translateY(90px) scale(.6) rotateY(-110deg)" }, { opacity: 1, transform: "none" }], { duration: 1300, easing: ease, fill: "backwards" });
  } else if (n === 1) {
    st.innerHTML = '<small></small><h2></h2><div class="chips"></div><div class="price"></div><button class="go" data-n="2" type="button">NEXT →</button>';
    $("small", st).textContent = T[1]; $("h2", st).textContent = d.name;
    [...(d.sel ? d.sel.options : [])].forEach((o) => { const b = document.createElement("button"); b.type = "button"; b.className = "chip" + (o.selected ? " on" : ""); b.dataset.v = o.value; b.textContent = o.textContent.trim(); $(".chips", st).appendChild(b); });
    p0 = d.price(); $(".price", st).textContent = inr(p0);
  } else if (n === 2) {
    st.innerHTML = '<small></small><h2>Made for your kitchen.</h2><p>Soak for about 30 minutes for even cooking, then cook until soft. Ideas from our recipes:</p><div class="chips"><span class="idea">Curd rice</span><span class="idea">Lemon rice</span><span class="idea">Ven pongal</span></div><button class="go" data-n="3" type="button">ALMOST THERE →</button>';
    $("small", st).textContent = T[2];
  } else {
    st.innerHTML = '<small></small><h2></h2><div class="price"></div><button class="go" data-add type="button">ADD TO BAG</button><button class="link" type="button" data-close>Maybe later</button>';
    $("small", st).textContent = T[3]; $("h2", st).textContent = d.name; $(".price", st).textContent = inr(d.price());
  }
  [...st.children].forEach((el, i) => rise(el, 350 + i * 110));
}
function count(el, a, b) {
  if (calm || a === b) { el.textContent = inr(b); p0 = b; return; }
  const t0 = performance.now();
  (function s(t) { const p = Math.min((t - t0) / 600, 1); el.textContent = inr(a + (b - a) * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(s); else p0 = b; })(t0);
}
function add(g) {
  const b = $(".mv-add-button", card); if (b) b.click();
  const r = g.getBoundingClientRect();
  for (let i = 0; i < 24 && !calm; i++) {
    const e = document.createElement("i"), a = Math.random() * 6.283, dist = 60 + Math.random() * 120;
    Object.assign(e.style, { position: "fixed", left: r.left + r.width / 2 + "px", top: r.top + r.height / 2 + "px", width: "6px", height: "10px", borderRadius: "50%", background: "#e5c58e", zIndex: "9986", pointerEvents: "none" });
    document.body.appendChild(e);
    e.animate([{ transform: "translate(0,0)", opacity: 1 }, { transform: `translate(${Math.cos(a) * dist}px,${Math.sin(a) * dist}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }], { duration: 900, easing: ease }).onfinish = () => e.remove();
  }
  setTimeout(() => { if (!root) return; const st = $(".stage", root); st.innerHTML = '<small>DONE</small><h2>Added to your bag ✓</h2><p>Your rice is waiting. Keep browsing, or open your bag when you are ready.</p><button class="go" type="button" data-close>KEEP BROWSING</button>'; rise(st.children[1]); try { localStorage.setItem("mv-j20", "1"); } catch {} }, 900);
}
document.addEventListener("click", (e) => {
  if (!root || !root.contains(e.target)) return;
  if (e.target.closest("[data-close]")) return close();
  const g = e.target.closest(".go"), c = e.target.closest(".chip");
  if (g && g.hasAttribute("data-add")) return add(g);
  if (g && g.dataset.n) return show(+g.dataset.n);
  if (c) { const s = info().sel; if (!s) return; s.value = c.dataset.v; s.dispatchEvent(new Event("change", { bubbles: true })); root.querySelectorAll(".chip").forEach((x) => x.classList.toggle("on", x === c)); setTimeout(() => count($(".price", root), p0, info().price()), 40); }
});
