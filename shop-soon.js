import "./shop-soon.css";
const LIVE = ["shiva-samba"];
const fix = () => document.querySelectorAll(".mv-shop-card").forEach((c) => {
  if (c.dataset.soon) return;
  if (LIVE.includes(c.dataset.product)) { c.dataset.soon = "0"; return; }
  c.dataset.soon = "1";
  c.classList.add("soon");
  const b = c.querySelector(".mv-add-button");
  if (b) { b.disabled = true; b.removeAttribute("data-add"); b.textContent = "COMING SOON"; }
  const s = c.querySelector(".mv-pack-select");
  if (s) s.disabled = true;
  const p = c.querySelector(".mv-card-price");
  if (p) p.textContent = "—";
});
new MutationObserver(fix).observe(document.body, { childList: true, subtree: true });
fix();
