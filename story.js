import "./recipes.css";
import "./story.css";
const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
const $ = (s) => document.querySelector(s);
const ease = "cubic-bezier(.2,.7,.2,1)";
const CH = [
  ["THE SOIL", "It begins in the soil.", "Good food begins long before it reaches your kitchen. It begins with the soil.", 0],
  ["THE FARMER", "Patient hands, traditional knowledge.", "The farmer and the knowledge behind every crop shape what finally reaches your plate.", 1],
  ["THE CARE", "Care at every stage.", "Good food takes the care taken at every stage of the journey, from field to pack to your home.", 0],
  ["TRANSPARENCY", "A journey built on care and transparency.", "We share where our rice comes from and how it reaches you, openly and honestly.", 1],
  ["YOUR KITCHEN", "Rooted in tradition. Made for today.", "From our soil to your soul, ready for your everyday meals.", 0],
];
document.getElementById("app").innerHTML = '<div class="prog"></div><section class="hero"><canvas></canvas><small>OUR STORY</small><h1>From our soil <i>to your soul.</i></h1><p>Scroll to follow the journey.</p></section>' +
  CH.map((c, i) => `<section class="chap${c[3] ? " dark" : ""}"><div class="in"><span class="num">0${i + 1}</span><small>${c[0]}</small><h2>${c[1]}</h2><p>${c[2]}</p></div></section>`).join("") +
  '<section class="end"><h2>Taste the journey.</h2><a class="a1" href="/#mv-shop">SHOP THE RICE →</a><a class="a2" href="/recipes.html">SEE THE RECIPES</a></section><footer>Rooted in tradition. Made for today.</footer>';
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
const bar = $(".prog");
const upd = () => { const m = document.documentElement.scrollHeight - innerHeight; bar.style.transform = `scaleX(${m > 0 ? scrollY / m : 0})`; };
addEventListener("scroll", upd, { passive: true });
upd();
if (!calm) {
  const els = [...document.querySelectorAll(".chap .in, .end h2, .end a")];
  const anims = new Map();
  const io = new IntersectionObserver((es) => es.forEach((e) => {
    if (!e.isIntersecting) return;
    io.unobserve(e.target);
    const a = anims.get(e.target);
    if (a) { a.play(); a.onfinish = () => a.cancel(); }
  }), { threshold: 0.25 });
  els.forEach((el) => {
    const a = el.animate([{ opacity: 0, translate: "0 50px", scale: 0.97 }, { opacity: 1, translate: "0 0", scale: 1 }], { duration: 900, easing: ease, fill: "both" });
    a.pause();
    anims.set(el, a);
    io.observe(el);
  });
  setTimeout(() => anims.forEach((a) => { if (a.playState === "paused") { a.play(); a.onfinish = () => a.cancel(); } }), 9000);
}
