import "./game24.css";
const $ = (s, r = document) => r.querySelector(s);
const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
const R = Math.random;
function fireworks() {
  if (calm) return;
  const c = document.createElement("canvas");
  Object.assign(c.style, { position: "fixed", inset: "0", width: "100%", height: "100%", pointerEvents: "none", zIndex: "9990" });
  const w = (c.width = innerWidth), h = (c.height = innerHeight);
  document.body.appendChild(c);
  const x = c.getContext("2d"), ps = [], t0 = performance.now();
  const burst = (cx, cy) => { for (let i = 0; i < 70; i++) { const a = R() * 6.283, v = 80 + R() * 260; ps.push({ x: cx, y: cy, vx: Math.cos(a) * v, vy: Math.sin(a) * v, r: R() * 6, a: 1, c: R() < 0.5 ? "229,197,142" : "182,140,80" }); } };
  const shots = [[0.3, 0.35, 0], [0.7, 0.3, 500], [0.5, 0.22, 1000], [0.2, 0.4, 1500], [0.8, 0.4, 1900]];
  let fired = 0, last = t0;
  (function f(t) {
    const dt = Math.min((t - last) / 1000, 0.05); last = t;
    while (fired < shots.length && t - t0 >= shots[fired][2]) { burst(w * shots[fired][0], h * shots[fired][1]); fired++; }
    x.clearRect(0, 0, w, h);
    for (const p of ps) { p.vy += 240 * dt; p.vx *= 0.985; p.x += p.vx * dt; p.y += p.vy * dt; p.r += 4 * dt; p.a -= 0.45 * dt; if (p.a > 0) { x.save(); x.translate(p.x, p.y); x.rotate(p.r); x.fillStyle = `rgba(${p.c},${p.a})`; x.beginPath(); x.ellipse(0, 0, 2.5, 5.5, 0, 0, 6.2832); x.fill(); x.restore(); } }
    if (t - t0 < 4200) requestAnimationFrame(f); else c.remove();
  })(t0);
}
function certificate(name, title, score, stars) {
  const S = 1080, c = document.createElement("canvas");
  c.width = c.height = S;
  const x = c.getContext("2d");
  const g = x.createLinearGradient(0, 0, S, S); g.addColorStop(0, "#2f5a3f"); g.addColorStop(1, "#0f1a11");
  x.fillStyle = g; x.fillRect(0, 0, S, S);
  const r = x.createRadialGradient(S / 2, S * 0.4, 20, S / 2, S * 0.4, S * 0.6); r.addColorStop(0, "rgba(229,197,142,.28)"); r.addColorStop(1, "rgba(229,197,142,0)");
  x.fillStyle = r; x.fillRect(0, 0, S, S);
  x.strokeStyle = "#e5c58e"; x.lineWidth = 6; x.strokeRect(40, 40, S - 80, S - 80); x.lineWidth = 2; x.strokeRect(62, 62, S - 124, S - 124);
  x.textAlign = "center";
  x.fillStyle = "#e5c58e"; x.font = "700 30px 'DM Sans', sans-serif"; x.fillText("M A N N V A S A M", S / 2, 170);
  x.font = "700 26px 'DM Sans', sans-serif"; x.fillText("CERTIFICATE OF PERFECT RICE", S / 2, 300);
  x.fillStyle = "#f6f3eb"; x.font = "700 110px 'Playfair Display', Georgia, serif"; x.fillText(title, S / 2, 440, S - 200);
  x.fillStyle = "#d9d5c6"; x.font = "28px 'DM Sans', sans-serif"; x.fillText("awarded to", S / 2, 540);
  x.fillStyle = "#e5c58e"; x.font = "italic 700 90px 'Playfair Display', Georgia, serif"; x.fillText(name, S / 2, 660, S - 200);
  x.fillStyle = "#f6f3eb"; x.font = "30px 'DM Sans', sans-serif"; x.fillText("for cooking rice with a score of " + score, S / 2, 750);
  x.fillStyle = "#e5c58e"; x.font = "70px serif"; x.fillText("★".repeat(stars) + "☆".repeat(3 - stars), S / 2, 860);
  x.fillStyle = "#d9d5c6"; x.font = "24px 'DM Sans', sans-serif"; x.fillText(new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }), S / 2, 940);
  x.fillStyle = "#e5c58e"; x.font = "italic 28px 'Playfair Display', Georgia, serif"; x.fillText("From our soil to your soul.", S / 2, 1000);
  return c;
}
function make(title, stars) {
  const name = ($("#nm").value || "").trim() || "Rice Lover";
  const sc = ($("#sc") || {}).textContent || "";
  const cv = certificate(name, title, sc, stars), url = cv.toDataURL("image/png");
  $(".cf").outerHTML = `<img src="${url}" alt="Your certificate" style="width:min(260px,70vw);border-radius:12px;box-shadow:0 12px 30px rgba(0,0,0,.4)"><div class="cf"><a class="gb" href="${url}" download="mannvasam-certificate.png">DOWNLOAD</a><button class="gb ghost" id="sh" type="button">SHARE</button></div>`;
  $("#sh").onclick = async () => {
    const text = `I scored ${sc} cooking rice at MANNVASAM! Try it: ${location.origin}/recipes.html`;
    try {
      const blob = await new Promise((res) => cv.toBlob(res, "image/png")), f = new File([blob], "mannvasam-certificate.png", { type: "image/png" });
      if (navigator.canShare && navigator.canShare({ files: [f] })) return await navigator.share({ files: [f], text });
    } catch (e) { return; }
    window.open("https://wa.me/?text=" + encodeURIComponent(text), "_blank", "noopener");
  };
}
function mount() {
  const ga = $("#ga"), ttl = ga && $(".ttl", ga);
  if (!ttl || ttl.dataset.wow) return;
  ttl.dataset.wow = "1";
  const stars = ga.querySelectorAll(".sr.on").length, title = ttl.textContent.trim();
  if (stars === 3) { fireworks(); if (navigator.vibrate) navigator.vibrate([30, 60, 30]); }
  ga.insertAdjacentHTML("beforeend", '<button class="gb ghost" id="cb" type="button">GET MY CERTIFICATE 🏆</button>');
  $("#cb", ga).onclick = () => {
    $("#cb").outerHTML = '<div class="cf"><input id="nm" class="srch" maxlength="24" placeholder="Your name" autocomplete="off"><button class="gb" id="mk" type="button">CREATE</button></div>';
    $("#mk").onclick = () => make(title, stars);
  };
}
new MutationObserver(mount).observe(document.body, { childList: true, subtree: true });
mount();
