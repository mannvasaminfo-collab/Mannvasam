import "./pack3d.css";
const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
const D = 16;
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
function build(host) {
  const first = host.querySelector("img");
  const src = first && first.src;
  if (!src) return;
  host.dataset.p3 = "1";
  host.innerHTML = '<div class="p3"><div class="sh"></div><div class="box"><div class="fc ft"><img alt="MANNVASAM Shiva Samba rice packet" draggable="false"><i class="gl"></i></div><div class="fc bk"><img src="/images/mannvasam-logo-transparent.png" alt="" draggable="false"><p>From our soil to your soul.</p></div><div class="fc l"></div><div class="fc r"></div><div class="fc t"></div><div class="fc bt"></div></div></div><p class="p3h">↻ Drag to turn the pack</p>';
  const q = (s) => host.querySelector(s);
  const p = q(".p3"), box = q(".box"), sh = q(".sh"), img = q(".ft img"), hint = q(".p3h");
  const l = q(".l"), r = q(".r"), t = q(".t"), bt = q(".bt"), ft = q(".ft"), bk = q(".bk");
  img.src = src;
  const lay = () => {
    const w = p.clientWidth || 240, h = p.clientHeight || 320;
    ft.style.transform = `translateZ(${D / 2}px)`;
    bk.style.transform = `rotateY(180deg) translateZ(${D / 2}px)`;
    l.style.left = (w - D) / 2 + "px"; l.style.transform = `rotateY(-90deg) translateZ(${w / 2}px)`;
    r.style.left = (w - D) / 2 + "px"; r.style.transform = `rotateY(90deg) translateZ(${w / 2}px)`;
    t.style.top = (h - D) / 2 + "px"; t.style.transform = `rotateX(90deg) translateZ(${h / 2}px)`;
    bt.style.top = (h - D) / 2 + "px"; bt.style.transform = `rotateX(-90deg) translateZ(${h / 2}px)`;
  };
  img.onload = () => { if (img.naturalWidth) p.style.aspectRatio = img.naturalWidth + "/" + img.naturalHeight; lay(); };
  lay(); requestAnimationFrame(lay);
  if (!calm && host.animate) host.animate([{ opacity: 0, translate: "0 80px", scale: 0.6 }, { opacity: 1, translate: "0 0", scale: 1 }], { duration: 1000, easing: "cubic-bezier(.2,.7,.2,1)" });
  let ry = -35, rx = 0, vy = 0, drag = false, lx = 0, ly = 0, idle = 0, touched = false;
  p.onpointerdown = (e) => { drag = true; touched = true; lx = e.clientX; ly = e.clientY; vy = 0; idle = 0; if (p.setPointerCapture) p.setPointerCapture(e.pointerId); if (hint) hint.style.opacity = "0"; };
  p.onpointermove = (e) => { if (!drag) return; const dx = e.clientX - lx, dy = e.clientY - ly; lx = e.clientX; ly = e.clientY; ry += dx * 0.6; vy = dx * 0.6; rx = clamp(rx - dy * 0.3, -25, 25); idle = 0; };
  p.onpointerup = p.onpointercancel = () => { drag = false; };
  (function tick() {
    if (!host.isConnected) return;
    if (!drag) {
      ry += vy; vy *= 0.94; idle += 1 / 60;
      if (!touched) { if (!calm) ry += 0.35; }
      else if (idle > 2.5 && Math.abs(vy) < 0.2) { ry += (Math.round(ry / 360) * 360 - ry) * 0.04; rx *= 0.95; }
    }
    const s = Math.sin((ry * Math.PI) / 180), c = Math.cos((ry * Math.PI) / 180);
    box.style.transform = `rotateX(${rx - 6}deg) rotateY(${ry}deg)`;
    p.style.setProperty("--gx", 50 + s * 70 + "%");
    p.style.setProperty("--dk", (0.45 * Math.abs(s)).toFixed(3));
    sh.style.transform = `translateX(-50%) scaleX(${0.45 + 0.55 * Math.abs(c)})`;
    requestAnimationFrame(tick);
  })();
}
const scan = () => { const h = document.querySelector("#j20 .pack:not([data-p3])"); if (h) build(h); };
new MutationObserver(scan).observe(document.body, { childList: true, subtree: true });
scan();
