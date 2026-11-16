import "./game21.css";
import "./game23.css";
const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
const $ = (s) => document.querySelector(s);
const footer = document.querySelector("footer");
const W = 520, H = 340;
let ctx, S = null, last = 0, score = 0, NOW = 0;
const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const R = Math.random;
function ui(text, html = "") { $("#gt").textContent = text; $("#ga").innerHTML = html; }
function run(st) { S = st; last = performance.now(); }
function loop(t) { const dt = Math.min((t - last) / 1000, 0.05); last = t; NOW = t; ctx.clearRect(0, 0, W, H); bg(); if (S) S.tick(t, dt); requestAnimationFrame(loop); }
function pos(e) { const r = ctx.canvas.getBoundingClientRect(); return [((e.clientX - r.left) * W) / r.width, ((e.clientY - r.top) * H) / r.height]; }
function clear() { const c = ctx.canvas; c.onpointerdown = c.onpointermove = c.onpointerup = c.onpointercancel = null; }
function step(n) { document.querySelectorAll("#gd i").forEach((d, i) => d.classList.toggle("on", i < n)); }
function fade() { if (!calm) ctx.canvas.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 500 }); }
function ell(x, y, rx, ry, rot, fill) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.fillStyle = fill; ctx.beginPath(); ctx.ellipse(0, 0, rx, ry, 0, 0, 6.2832); ctx.fill(); ctx.restore(); }
function lg(x0, y0, x1, y1, stops) { const g = ctx.createLinearGradient(x0, y0, x1, y1); stops.forEach((s) => g.addColorStop(s[0], s[1])); return g; }
function rg(x, y, r0, r1, stops) { const g = ctx.createRadialGradient(x, y, r0, x, y, r1); stops.forEach((s) => g.addColorStop(s[0], s[1])); return g; }
function bg() {
  ctx.fillStyle = rg(260, 170, 10, 300, [[0, "rgba(182,140,80,.24)"], [1, "rgba(182,140,80,0)"]]); ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = lg(0, 300, 0, 340, [[0, "#2a332d"], [1, "#101612"]]); ctx.fillRect(0, 300, W, 40);
  ctx.fillStyle = "rgba(229,197,142,.3)"; ctx.fillRect(0, 300, W, 1.5);
}
function pot(level, g, tint) {
  ctx.fillStyle = "rgba(0,0,0,.4)"; ctx.beginPath(); ctx.ellipse(260, 302, 130, 9, 0, 0, 6.2832); ctx.fill();
  ctx.fillStyle = lg(146, 0, 374, 0, [[0, "#343936"], [0.25, "#9aa29c"], [0.5, "#59605b"], [0.8, "#7b827d"], [1, "#2f3431"]]);
  ctx.fillRect(146, 92, 228, 206); ctx.fillRect(122, 118, 26, 13); ctx.fillRect(372, 118, 26, 13);
  ctx.fillStyle = lg(0, 100, 0, 290, [[0, "#0f1a11"], [1, "#1d2e23"]]); ctx.fillRect(158, 100, 204, 190);
  if (level > 0) {
    const top = 290 - level;
    ctx.fillStyle = lg(0, top, 0, 290, [[0, "rgba(165,210,235,.62)"], [1, "rgba(80,140,185,.55)"]]);
    ctx.beginPath(); ctx.moveTo(158, 290);
    for (let x = 158; x <= 362; x += 6) ctx.lineTo(x, top + Math.sin(x / 14 + NOW / 320) * 1.8);
    ctx.lineTo(362, 290); ctx.closePath(); ctx.fill();
    ctx.fillStyle = "rgba(255,255,255,.35)"; ctx.fillRect(158, top, 204, 1.5);
  }
  for (let x = 166; x < 356; x += g * 1.7) for (let y = 292 - g; y > 250; y -= g * 1.1) ell(x + ((y | 0) % 2) * 3, y, g, g * 0.55, 0.4, tint);
  ctx.fillStyle = "rgba(229,197,142,.95)"; ctx.fillRect(146, 92, 228, 3);
}
function pop(n) {
  if (calm) return;
  for (let i = 0; i < n; i++) {
    const g = document.createElement("i");
    Object.assign(g.style, { position: "fixed", left: "50%", top: "60%", width: "7px", height: "11px", borderRadius: "50%", background: i % 2 ? "#e5c58e" : "#b68c50", pointerEvents: "none", zIndex: "50" });
    document.body.appendChild(g);
    const a = R() * 6.283, d = 80 + R() * 180;
    g.animate([{ transform: "translate(0,0)", opacity: 1 }, { transform: `translate(${Math.cos(a) * d}px,${Math.sin(a) * d - 60}px) rotate(${R() * 540}deg)`, opacity: 0 }], { duration: 1100, easing: "cubic-bezier(.2,.7,.2,1)" }).onfinish = () => g.remove();
  }
}
function idle(level, g) {
  const steam = [];
  run({ tick(t, dt) {
    pot(level, g, "#f6f3eb");
    if (R() < 3 * dt) steam.push({ x: 200 + R() * 120, y: 96, a: 0.5, s: 6 });
    for (const p of steam) { p.y -= 30 * dt; p.a -= 0.25 * dt; p.s += 5 * dt; ell(p.x, p.y, p.s, p.s, 0, `rgba(255,255,255,${Math.max(0, p.a)})`); }
    while (steam.length && steam[0].a <= 0) steam.shift();
  } });
}
function intro() {
  clear(); score = 0; step(0);
  ui("Three rounds: wash, pour, cook. Ready?", '<button class="gb" id="go" type="button">START</button>');
  $("#go").onclick = wash;
  idle(80, 4);
}
function wash() {
  clear(); step(1); fade();
  const gr = Array.from({ length: 70 }, () => { const a = R() * 6.283, d = Math.sqrt(R()); return { x: 260 + Math.cos(a) * 130 * d, y: 200 + Math.sin(a) * 52 * d, vx: 0, vy: 0, r: R() * 3 }; });
  const rip = [];
  let cloud = 1, down = false, pl = null, done = false;
  ui("ROUND 1 · Wash the rice. Drag through the water in circles until it runs clear.");
  const cv = ctx.canvas;
  cv.onpointerdown = (e) => { down = true; pl = pos(e); cv.setPointerCapture(e.pointerId); };
  cv.onpointerup = cv.onpointercancel = () => { down = false; pl = null; };
  cv.onpointermove = (e) => {
    if (!down) return;
    const p = pos(e);
    if (!pl) { pl = p; return; }
    const dx = p[0] - pl[0], dy = p[1] - pl[1], sp = Math.hypot(dx, dy);
    for (const g of gr) { const d = Math.hypot(g.x - p[0], g.y - p[1]); if (d < 60) { g.vx += dx * 0.18 * (1 - d / 60); g.vy += dy * 0.18 * (1 - d / 60); } }
    if (Math.abs(p[0] - 260) < 150 && Math.abs(p[1] - 200) < 70) { cloud = Math.max(0, cloud - sp * 0.0012); if (sp > 3 && rip.length < 30) rip.push({ x: p[0], y: p[1], r: 4, a: 0.5 }); }
    pl = p;
  };
  run({ tick(t, dt) {
    ctx.fillStyle = "rgba(0,0,0,.35)"; ctx.beginPath(); ctx.ellipse(260, 216, 176, 88, 0, 0, 6.2832); ctx.fill();
    ctx.fillStyle = rg(260, 190, 20, 180, [[0, "#f7f2e6"], [1, "#d6ccb5"]]); ctx.beginPath(); ctx.ellipse(260, 200, 170, 84, 0, 0, 6.2832); ctx.fill();
    ctx.strokeStyle = "rgba(229,197,142,.9)"; ctx.lineWidth = 2; ctx.stroke();
    ctx.fillStyle = `rgba(${150 + 40 * cloud},${200 - 35 * cloud},${225 - 110 * cloud},.9)`; ctx.beginPath(); ctx.ellipse(260, 200, 150, 68, 0, 0, 6.2832); ctx.fill();
    for (const g of gr) {
      g.x += g.vx; g.y += g.vy; g.vx *= 0.9; g.vy *= 0.9; g.r += g.vx * 0.05;
      const ex = (g.x - 260) / 140, ey = (g.y - 200) / 58, q = ex * ex + ey * ey;
      if (q > 1) { const k = 1 / Math.sqrt(q); g.x = 260 + (g.x - 260) * k; g.y = 200 + (g.y - 200) * k; g.vx = g.vy = 0; }
      ell(g.x, g.y, 5, 2.6, g.r, "#f6f3eb");
    }
    for (const r of rip) { r.r += 40 * dt; r.a -= 0.9 * dt; ctx.strokeStyle = `rgba(255,255,255,${Math.max(0, r.a)})`; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(r.x, r.y, r.r, 0, 6.2832); ctx.stroke(); }
    while (rip.length && rip[0].a <= 0) rip.shift();
    ctx.strokeStyle = "rgba(255,255,255,.35)"; ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(260, 200, 140, 60, 0, 3.4, 4.6); ctx.stroke();
    ctx.fillStyle = "#e5c58e"; ctx.font = "700 14px DM Sans, sans-serif"; ctx.fillText("Water clarity " + Math.round((1 - cloud) * 100) + "%", 190, 322);
    if (cloud < 0.06 && !done) { done = true; score += 30; setTimeout(pour, 700); }
  } });
}
function pour() {
  clear(); step(2); fade();
  let L = 0, hold = false, locked = false, msg = "";
  ui("ROUND 2 · Add water up to the line. Hold POUR, and let go at the right level.", '<button class="gb" id="pr" type="button">HOLD TO POUR 💧</button>');
  const b = $("#pr");
  const lock = () => { locked = true; hold = false; const acc = clamp(1 - Math.abs(L - 80) / 40); score += Math.round(30 * acc); b.disabled = true; msg = acc > 0.85 ? "Perfect!" : acc > 0.5 ? "Good" : L > 130 ? "Too much water!" : "Not quite"; setTimeout(cook, 1300); };
  b.onpointerdown = (e) => { if (!locked) { hold = true; b.setPointerCapture(e.pointerId); } };
  b.onpointerup = b.onpointercancel = () => { if (hold && !locked) lock(); hold = false; };
  run({ tick(t, dt) {
    if (hold && !locked) { L += 42 * dt; if (L >= 150) { L = 150; lock(); } }
    pot(L, 4, "#f6f3eb");
    ctx.strokeStyle = "#e5c58e"; ctx.lineWidth = 2; ctx.setLineDash([6, 5]); ctx.beginPath(); ctx.moveTo(150, 210); ctx.lineTo(380, 210); ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle = "#e5c58e"; ctx.font = "700 13px DM Sans, sans-serif"; ctx.fillText("just right", 388, 214);
    ctx.fillStyle = lg(0, 8, 0, 24, [[0, "#d9b574"], [1, "#9a6f35"]]); ctx.fillRect(280, 8, 70, 16);
    if (hold && !locked) { ctx.strokeStyle = "rgba(150,200,230,.85)"; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(300, 24); ctx.lineTo(300, 290 - L); ctx.stroke(); }
    if (msg) ctx.fillText(msg, 215, 330);
  } });
}
function cook() {
  clear(); step(3); fade();
  let T = 20, heat = 50, elapsed = 0, prog = 0, burn = 0, foam = 0, fin = false;
  const bub = [], steam = [];
  ui("ROUND 3 · Simmer gently for 22 seconds. Small bubbles are perfect. Not too low, not boiling over.", '<div class="fb">LOW · SIMMER · HIGH</div><input id="kn" type="range" min="0" max="100" value="50" style="width:min(320px,80vw);accent-color:#e5c58e">');
  $("#kn").oninput = (e) => { heat = +e.target.value; };
  run({ tick(t, dt) {
    T += (heat - T) * 0.9 * dt; elapsed += dt;
    if (T >= 38 && T <= 62) prog += dt; else if (T > 62 && T <= 85) { prog += dt * 0.5; foam += dt; } else if (T > 85) { burn += dt * 2; foam += dt * 2; prog += dt * 0.3; } else prog += dt * 0.2;
    pot(80, 4 + 4 * clamp(prog / 14), burn > 1 ? "#a8844a" : "#f6f3eb");
    ctx.fillStyle = "#171a18"; ctx.beginPath(); ctx.ellipse(260, 333, 145, 7, 0, 0, 6.2832); ctx.fill();
    ctx.save(); ctx.shadowColor = "rgba(255,140,40,.95)"; ctx.shadowBlur = 8 + heat * 0.25;
    for (let i = 0; i < 5; i++) { const h = 6 + heat * 0.2 + R() * 6; ell(190 + i * 35, 330 - h / 2, 9, h / 2, 0, `rgba(255,${150 + (i % 2) * 40},60,.92)`); }
    ctx.restore();
    if (T > 30 && R() < ((T - 30) / 50) * 40 * dt) bub.push({ x: 170 + R() * 180, y: 288, r: 2 + R() * 3, v: 30 + R() * 30 });
    for (const b of bub) { b.y -= b.v * dt; ctx.strokeStyle = "rgba(255,255,255,.75)"; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, 6.2832); ctx.stroke(); }
    while (bub.length && bub[0].y < 212) bub.shift();
    if (T > 45 && R() < 4 * dt) steam.push({ x: 200 + R() * 120, y: 96, a: 0.5, s: 6 });
    for (const p of steam) { p.y -= 40 * dt; p.a -= 0.3 * dt; p.s += 6 * dt; ell(p.x, p.y, p.s, p.s, 0, `rgba(255,255,255,${Math.max(0, p.a)})`); }
    while (steam.length && steam[0].a <= 0) steam.shift();
    if (T > 75) for (let i = 0; i < 5; i++) ell(175 + i * 42 + Math.sin(t / 200 + i) * 4, 98 - R() * 8, 15, 10, 0, "rgba(255,255,255,.88)");
    ctx.fillStyle = T >= 38 && T <= 62 ? "#7fd8a6" : "#e5c58e"; ctx.font = "700 14px DM Sans, sans-serif"; ctx.fillText(Math.max(0, 22 - elapsed).toFixed(0) + " s", 440, 40);
    if (elapsed >= 22 && !fin) { fin = true; const pen = clamp(burn / 5) * 0.7 + clamp(foam / 8) * 0.3; score += Math.round(40 * clamp(prog / 14) * (1 - pen)); setTimeout(end, 500); }
  } });
}
function end() {
  clear(); step(3);
  const s = Math.min(100, score), stars = s >= 85 ? 3 : s >= 60 ? 2 : 1, title = s >= 85 ? "Rice Master" : s >= 60 ? "Home Chef" : "Apprentice";
  ui(stars === 3 ? "Perfect rice! Now taste the real thing." : "Good cooking! Try again, or taste the real thing.", `<div class="stars">${[0, 1, 2].map((i) => `<span class="sr${i < stars ? " on" : ""}">★</span>`).join("")}</div><div class="ttl">${title}</div><h3 id="sc">0 / 100</h3><a class="gb" href="/#mv-shop">ORDER SHIVA SAMBA RICE →</a><button class="gb ghost" id="re" type="button">PLAY AGAIN</button>`);
  $("#re").onclick = intro;
  idle(0, 7);
  document.querySelectorAll(".sr.on").forEach((e, i) => { if (!calm) e.animate([{ scale: 0, rotate: "-90deg" }, { scale: 1.5, rotate: "0deg" }, { scale: 1 }], { duration: 650, delay: 300 + i * 260, fill: "backwards", easing: "cubic-bezier(.2,.7,.2,1)" }); });
  const el = $("#sc"), t0 = performance.now();
  (function f(t) { const p = clamp((t - t0) / 1200); if (el) el.textContent = Math.round(s * p) + " / 100"; if (p < 1) requestAnimationFrame(f); })(t0);
  pop(stars * 12);
}
if (footer) {
  const sec = document.createElement("section");
  sec.id = "game21";
  sec.innerHTML = '<small>PLAY</small><h2>Cook the <i>perfect rice.</i></h2><div id="gs"><div class="dots" id="gd"><i></i><i></i><i></i></div><canvas id="gc" style="width:100%;max-width:520px;height:auto;touch-action:none"></canvas><p class="gp" id="gt"></p><div id="ga"></div></div>';
  footer.before(sec);
  const cv = $("#gc"), dpr = Math.min(devicePixelRatio || 1, 2);
  cv.width = W * dpr; cv.height = H * dpr;
  ctx = cv.getContext("2d"); ctx.scale(dpr, dpr);
  requestAnimationFrame(loop);
  intro();
}
