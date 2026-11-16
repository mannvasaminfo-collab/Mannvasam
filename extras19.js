import "./extras19.css";
const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
const ease = "cubic-bezier(.2,.7,.2,1)";
const title = document.title;
document.addEventListener("visibilitychange", () => { document.title = document.hidden ? "Your rice is waiting 🌾" : title; });
if (!calm) {
  const h = document.createElement("div");
  h.className = "hint19";
  h.textContent = "SCROLL TO DISCOVER";
  document.body.appendChild(h);
  h.animate([{ opacity: 0, translate: "-50% 10px" }, { opacity: 1, translate: "-50% 0" }], { duration: 700, delay: 3500, fill: "both" });
  const gone = () => { if (scrollY > 80) { h.remove(); removeEventListener("scroll", gone); } };
  addEventListener("scroll", gone, { passive: true });
}
let tm;
const toast = (msg) => {
  document.querySelectorAll(".toast19").forEach((x) => x.remove());
  const el = document.createElement("div");
  el.className = "toast19";
  el.textContent = msg;
  document.body.appendChild(el);
  if (!calm) el.animate([{ opacity: 0, translate: "-50% 20px" }, { opacity: 1, translate: "-50% 0" }], { duration: 350, easing: ease });
  clearTimeout(tm);
  tm = setTimeout(() => { el.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 300, fill: "forwards" }).onfinish = () => el.remove(); }, 2400);
};
document.addEventListener("click", (e) => {
  const b = e.target.closest(".mv-add-button");
  if (!b) return;
  const card = b.closest(".mv-shop-card");
  const name = ((card && card.querySelector("h3")) || { textContent: "Your rice" }).textContent.trim();
  setTimeout(() => {
    let n = 0;
    try { n = JSON.parse(localStorage.getItem("mv-shop-cart") || "[]").reduce((s, i) => s + (Number(i.qty) || 1), 0); } catch {}
    toast(`${name} added${n ? ` · ${n} in your bag` : ""}`);
  }, 80);
});
document.addEventListener("change", (e) => {
  if (calm || !e.target.matches || !e.target.matches(".mv-pack-select")) return;
  const card = e.target.closest(".mv-shop-card");
  const p = card && card.querySelector(".mv-card-price");
  if (p) p.animate([{ scale: 1.3 }, { scale: 1 }], { duration: 450, easing: ease });
});
