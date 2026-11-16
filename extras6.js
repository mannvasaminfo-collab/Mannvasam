if (!calm) {
  document.documentElement.classList.add("js-rv");
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
  const pick = ["h2", "h3", "p", ".card", "img", "details", "form"];
  const sel = pick.map((t) => "section:not(.hero) " + t).join(",");
  const scan = () => {
    document.querySelectorAll(sel).forEach((el) => {
      if (el.dataset.rv) return;
      el.dataset.rv = "1";
      const sibs = [...el.parentElement.children].filter((c) => c.tagName === el.tagName);
      el.style.setProperty("--d", Math.min(sibs.indexOf(el), 6) * 0.09 + "s");
      el.classList.add("rv");
      io.observe(el);
    });
  };
  scan();
  setTimeout(scan, 700);
}
if (!calm && innerWidth >= 700) {
  const c = document.createElement("canvas");
  c.className = "dust";
  document.body.appendChild(c);
  const ctx = c.getContext("2d");
  let w, h, dpr;
  const size = () => {
    dpr = Math.min(devicePixelRatio || 1, 2);
    w = c.width = innerWidth * dpr;
    h = c.height = innerHeight * dpr;
  };
  size();
  addEventListener("resize", size);
  const N = innerWidth < 700 ? 22 : 42;
  const dots = Array.from({ length: N }, () => ({
    x: Math.random() * w, y: Math.random() * h,
    r: (0.6 + Math.random() * 1.8) * dpr,
    vx: (Math.random() - 0.5) * 0.15 * dpr,
    vy: (-0.1 - Math.random() * 0.3) * dpr,
    a: 0.2 + Math.random() * 0.5, p: Math.random() * 6.28,
  }));
  (function frame(t) {
    ctx.clearRect(0, 0, w, h);
    for (const d of dots) {
      d.x += d.vx; d.y += d.vy;
      if (d.y < -10) { d.y = h + 10; d.x = Math.random() * w; }
      if (d.x < -10) d.x = w + 10;
      if (d.x > w + 10) d.x = -10;
      const tw = 0.6 + 0.4 * Math.sin(t / 900 + d.p);
      ctx.beginPath();
      ctx.arc(d.x, d.y, d.r, 0, 6.2832);
      ctx.fillStyle = `rgba(230,195,90,${d.a * tw})`;
      ctx.fill();
    }
    requestAnimationFrame(frame);
  })(0);
}
