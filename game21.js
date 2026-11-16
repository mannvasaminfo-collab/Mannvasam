import "./game21.css";
const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
const $ = (s, r = document) => r.querySelector(s);
const footer = document.querySelector("footer");
let score = 0, raf = 0;
const put = (h) => { cancelAnimationFrame(raf); $("#gs").innerHTML = h; };
const next = (f, d = 700) => setTimeout(f, d);
const pop = (n) => { if (calm) return; for (let i = 0; i < n; i++) { const g = document.createElement("i"); Object.assign(g.style, { position: "fixed", left: "50%", top: "60%", width: "7px", height: "11px", borderRadius: "50%", background: i % 2 ? "#e5c58e" : "#b68c50", pointerEvents: "none", zIndex: "50" }); document.body.appendChild(g); const a = Math.random() * 6.283, d = 80 + Math.random() * 180; g.animate([{ transform: "translate(0,0)", opacity: 1 }, { transform: `translate(${Math.cos(a) * d}px,${Math.sin(a) * d - 60}px) rotate(${Math.random() * 540}deg)`, opacity: 0 }], { duration: 1100, easing: "cubic-bezier(.2,.7,.2,1)" }).onfinish = () => g.remove(); } };
function intro() {
  score = 0;
  put('<p class="gp">Three quick rounds: wash, measure, cook. Ready?</p><button class="gb" id="go" type="button">START</button>');
  $("#go").onclick = wash;
}
function wash() {
  let n = 0;
  const N = 14;
  put('<p class="gp">ROUND 1 · Wash the rice. Tap SWISH until the water runs clear.</p><div class="wb"><div class="rice"></div><div class="cl"></div></div><button class="gb" id="sw" type="button">SWISH</button>');
  const cl = $(".cl"), wb = $(".wb");
  $("#sw").onclick = () => {
    n++;
    cl.style.opacity = String(Math.max(0, 0.95 - (n / N) * 0.95));
    if (!calm) wb.animate([{ rotate: "-4deg" }, { rotate: "4deg" }, { rotate: "0deg" }], { duration: 250 });
    if (n >= N) { score += 30; $("#sw").disabled = true; next(measure); }
  };
}
function measure() {
  put('<p class="gp">ROUND 2 · Pour the right amount of water. Tap STOP in the green zone.</p><div class="gauge"><div class="zone"></div><div class="mk"></div></div><button class="gb" id="sp" type="button">STOP</button><p class="fb" id="fb"></p>');
  const mk = $(".mk");
  let pos = 0.5, run = true;
  const loop = (t) => { pos = 0.5 + 0.5 * Math.sin(t / 420); mk.style.top = pos * 100 + "%"; if (run) raf = requestAnimationFrame(loop); };
  raf = requestAnimationFrame(loop);
  $("#sp").onclick = () => {
    run = false;
    const d = Math.abs(pos - 0.5), pts = Math.max(0, Math.round(30 * (1 - d / 0.5)));
    score += pts;
    $("#fb").textContent = (d < 0.1 ? "Perfect! +" : "+") + pts;
    $("#sp").disabled = true;
    next(heat, 1100);
  };
}
function heat() {
  put('<p class="gp">ROUND 3 · Keep the heat steady. Tap HEAT to hold the flame in the green zone for 8 seconds.</p><div class="hm"><div class="hz"></div><div class="hf"></div></div><p class="fb" id="tl">8.0 s</p><button class="gb" id="ht" type="button">HEAT 🔥</button>');
  let v = 55, last = performance.now(), inz = 0, left = 8;
  const hf = $(".hf");
  $("#ht").onclick = () => { v = Math.min(100, v + 9); };
  const loop = (t) => {
    const dt = Math.min((t - last) / 1000, 0.1);
    last = t;
    v = Math.max(0, v - (14 + Math.random() * 6) * dt);
    left -= dt;
    if (v >= 40 && v <= 70) inz += dt;
    hf.style.height = v + "%";
    $("#tl").textContent = Math.max(0, left).toFixed(1) + " s";
    if (left <= 0) { score += Math.round(40 * Math.min(inz / 8, 1)); return next(end, 400); }
    raf = requestAnimationFrame(loop);
  };
  raf = requestAnimationFrame(loop);
}
function end() {
  const s = Math.min(100, score), stars = s >= 85 ? 3 : s >= 60 ? 2 : 1;
  put(`<div class="stars">${"★".repeat(stars)}${"☆".repeat(3 - stars)}</div><h3>${s} / 100</h3><p class="gp">${stars === 3 ? "Perfect rice! Now taste the real thing." : "Good cooking! Try again, or taste the real thing."}</p><a class="gb" href="/#mv-shop">ORDER SHIVA SAMBA RICE →</a><button class="gb ghost" id="re" type="button">PLAY AGAIN</button>`);
  $("#re").onclick = intro;
  pop(stars * 12);
}
if (footer) {
  const sec = document.createElement("section");
  sec.id = "game21";
  sec.innerHTML = '<small>PLAY</small><h2>Cook the <i>perfect rice.</i></h2><div id="gs"></div>';
  footer.before(sec);
  intro();
}
