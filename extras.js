import "./extras.css";

export const WHATSAPP = "917548883966"; // add your number with country code, e.g. "919876543210", to show an order button

/* scroll progress + back to top */
const bar = document.createElement("div");
bar.className = "progress";
const top = document.createElement("button");
top.className = "totop";
top.setAttribute("aria-label", "Back to top");
top.textContent = "↑";
top.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
document.body.append(bar, top);
const onScroll = () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  bar.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
  top.classList.toggle("show", window.scrollY > 700);
};
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

/* whatsapp button (only if a number is set) */
if (WHATSAPP) {
  const wa = document.createElement("a");
  wa.className = "wa";
  wa.href = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Hi MANNVASAM, I would like to order rice.")}`;
  wa.target = "_blank";
  wa.rel = "noreferrer";
  wa.textContent = "Order on WhatsApp";
  document.body.appendChild(wa);
}

/* drifting rice grains in the hero */
const hero = document.getElementById("top");
if (hero && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
  for (let i = 0; i < 16; i++) {
    const g = document.createElement("span");
    g.className = "grain";
    g.style.left = `${Math.random() * 100}%`;
    g.style.animationDuration = `${9 + Math.random() * 9}s`;
    g.style.animationDelay = `${-Math.random() * 14}s`;
    g.style.scale = String(0.7 + Math.random() * 0.8);
    hero.appendChild(g);
  }
}

/* rice cooking guide */
const PER_PERSON = { light: 1 / 3, regular: 1 / 2, hearty: 3 / 4 };
const WATER = { separate: 1.5, fluffy: 2, soft: 2.5 };
const state = { n: 2, a: "regular", w: "fluffy" };

const fmt = (x) => {
  const q = Math.round(x * 4) / 4;
  const whole = Math.floor(q);
  const s = { 0: "", 0.25: "¼", 0.5: "½", 0.75: "¾" }[q - whole];
  return (whole ? String(whole) : "") + s || "0";
};

const seg = (name, opts) => `<div class="seg" data-seg="${name}">${opts.map(([k, l]) => `<button type="button" data-k="${k}">${l}</button>`).join("")}</div>`;

const html = `
<section class="section cook" id="cook">
  <div class="wrap">
    <h2 class="reveal">How much rice should you cook?</h2>
    <p class="lead reveal">Slide to the number of people and watch the bowl fill. A friendly starting point you can adjust to your own taste.</p>
    <div class="cook-grid">
      <div class="panel reveal">
        <h3>People eating</h3>
        <div class="range-row"><input id="people" type="range" min="1" max="12" value="2" aria-label="People eating" /><span class="big" id="peopleOut">2</span></div>
        <h3>Appetite</h3>
        ${seg("a", [["light", "Light"], ["regular", "Regular"], ["hearty", "Hearty"]])}
        <h3>Texture</h3>
        ${seg("w", [["separate", "Separate grains"], ["fluffy", "Fluffy"], ["soft", "Soft"]])}
        <div class="result">
          <div><b id="rCups">1</b><span>cups of rice</span></div>
          <div><b id="rGrams">180</b><span>grams (about)</span></div>
          <div><b id="rWater">2</b><span>cups of water</span></div>
        </div>
        <p class="tip">Rinse the rice, and soak traditional varieties for about 30 minutes if you can. Water needs vary by variety, so check the pack and adjust next time.</p>
      </div>
      <div class="bowl-wrap reveal" aria-hidden="true">
        <div class="steam"><i></i><i></i><i></i></div>
        <svg viewBox="0 0 300 240">
          <path d="M28 118 Q28 226 150 226 Q272 226 272 118 Z" fill="#263d2d"/>
          <g class="mound" id="mound"><ellipse cx="150" cy="116" rx="112" ry="62" fill="#fff7de"/><ellipse cx="150" cy="116" rx="112" ry="62" fill="none" stroke="#e3d4a6" stroke-width="3"/></g>
          <path d="M28 118 Q150 150 272 118 Q272 134 150 144 Q28 134 28 118Z" fill="#1a2b20"/>
          <ellipse cx="150" cy="228" rx="56" ry="7" fill="#c9973a" opacity=".6"/>
        </svg>
      </div>
    </div>
  </div>
</section>`;

document.getElementById("farming").insertAdjacentHTML("beforebegin", html);
document.querySelector(".nav nav").insertAdjacentHTML("beforeend", '<a href="#cook">Cook guide</a>');

const $ = (id) => document.getElementById(id);
function update() {
  const cups = state.n * PER_PERSON[state.a];
  $("peopleOut").textContent = state.n;
  $("rCups").textContent = fmt(cups);
  $("rGrams").textContent = Math.round((cups * 185) / 10) * 10;
  $("rWater").textContent = fmt(cups * WATER[state.w]);
  $("mound").style.transform = `scale(1, ${Math.min(1, 0.35 + cups / 9)})`;
  document.querySelectorAll(".seg").forEach((s) =>
    s.querySelectorAll("button").forEach((b) => b.classList.toggle("on", b.dataset.k === state[s.dataset.seg]))
  );
}
$("people").addEventListener("input", (e) => { state.n = +e.target.value; update(); });
document.querySelectorAll(".seg").forEach((s) =>
  s.addEventListener("click", (e) => {
    const b = e.target.closest("button");
    if (b) { state[s.dataset.seg] = b.dataset.k; update(); }
  })
);
update();

const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && e.target.classList.add("in")), { threshold: 0.15 });
document.querySelectorAll("#cook .reveal").forEach((el) => io.observe(el));
