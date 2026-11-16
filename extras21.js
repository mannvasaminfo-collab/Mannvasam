import "./extras21.css";
const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
const $ = (s, r = document) => r.querySelector(s);
const ease = "cubic-bezier(.2,.7,.2,1)";
const GRAMS = 75, CUP = 185, RATIO = { firm: 2, soft: 2.5 };
const STEPS = [["Wash the rice", 120], ["Soak", 1800], ["Cook", 1200], ["Rest, covered", 600]];
const mmss = (s) => Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0");
const anchor = $(".home-values");
let n = 2, f = "firm", sec = null;
if (anchor) {
  sec = document.createElement("section");
  sec.id = "cook21";
  sec.innerHTML = `<div class="w"><div><small>COOK IT RIGHT</small><h2>Cook it <i>just right.</i></h2><p class="lead">Choose how many are eating and how soft you like your rice.</p><div class="row"><b>PEOPLE</b><button class="pm" data-d="-1" type="button">−</button><span class="pn">2</span><button class="pm" data-d="1" type="button">+</button></div><div class="row"><b>TEXTURE</b><button class="fm on" data-f="firm" type="button">Firm</button><button class="fm" data-f="soft" type="button">Soft</button></div><div class="res"><div><span>RICE</span><b id="cr"></b><em id="cc"></em></div><div><span>WATER</span><b id="cw"></b><em>cold, clean water</em></div></div><ol>${STEPS.map((s, i) => `<li><span>${s[0]}</span><button class="tm" data-i="${i}" type="button">${mmss(s[1])}</button></li>`).join("")}</ol><button class="go" type="button">ORDER THIS RICE →</button><p class="note">A starting point. Follow your pack for exact timings.</p></div><div class="bowl"><div class="steam"><i></i><i></i><i></i></div><div class="rim"><div class="fill"></div></div></div></div>`;
  anchor.before(sec);
}
if (sec) {
  const bowl = $(".bowl", sec);
  var upd = (bounce) => {
    const g = n * GRAMS, cups = g / CUP, ml = Math.round((cups * RATIO[f] * 240) / 10) * 10;
    $("#cr", sec).textContent = g + " g";
    $("#cc", sec).textContent = "about " + Math.round(cups * 10) / 10 + " cup";
    $("#cw", sec).textContent = ml + " ml";
    $(".pn", sec).textContent = n;
    $(".fill", sec).style.height = Math.min(18 + n * 9, 96) + "%";
    if (bounce && !calm) ["#cr", "#cw", ".pn"].forEach((s) => $(s, sec).animate([{ scale: 1.25 }, { scale: 1 }], { duration: 450, easing: ease }));
  };
  var grains = (cnt) => {
    if (calm) return;
    const r = bowl.getBoundingClientRect();
    for (let i = 0; i < cnt; i++) {
      const e = document.createElement("i");
      Object.assign(e.style, { position: "fixed", left: r.left + r.width * (0.3 + Math.random() * 0.4) + "px", top: r.top - 40 + "px", width: "6px", height: "10px", borderRadius: "50%", background: "#e5c58e", pointerEvents: "none", zIndex: "50" });
      document.body.appendChild(e);
      e.animate([{ transform: "translateY(0)", opacity: 1 }, { transform: `translateY(${r.height * 0.55}px) rotate(${Math.random() * 360}deg)`, opacity: 0.2 }], { duration: 700 + Math.random() * 400, delay: i * 40, easing: "ease-in" }).onfinish = () => e.remove();
    }
  };
  upd(false);
}
if (sec) {
  const bowl = $(".bowl", sec);
  const timer = (b) => {
    const i = Number(b.dataset.i), end = Date.now() + STEPS[i][1] * 1000;
    b.dataset.run = "1";
    if (i === 2) bowl.classList.add("hot");
    const iv = setInterval(() => {
      const left = Math.max(0, Math.round((end - Date.now()) / 1000));
      b.textContent = left ? mmss(left) : "Done ✓";
      if (left) return;
      clearInterval(iv);
      b.closest("li").classList.add("done");
      if (i === 2) bowl.classList.remove("hot");
      grains(12);
    }, 250);
  };
  sec.addEventListener("click", (e) => {
    const p = e.target.closest(".pm"), t = e.target.closest(".fm"), b = e.target.closest(".tm"), go = e.target.closest(".go");
    if (p) { n = Math.max(1, Math.min(8, n + Number(p.dataset.d))); upd(true); grains(10); }
    if (t) { f = t.dataset.f; sec.querySelectorAll(".fm").forEach((x) => x.classList.toggle("on", x === t)); upd(true); }
    if (b && !b.dataset.run) timer(b);
    if (go) {
      const card = document.querySelector('.mv-shop-card[data-product="shiva-samba"]');
      if (!card) return;
      card.scrollIntoView({ behavior: calm ? "auto" : "smooth", block: "center" });
      setTimeout(() => { const ph = card.querySelector(".mv-shop-image"); if (ph) ph.click(); }, calm ? 0 : 700);
    }
  });
}
