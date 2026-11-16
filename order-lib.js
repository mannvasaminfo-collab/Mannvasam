import "./order.css";
export const PRODUCT = { id: "shiva-samba", name: "Shiva Samba Rice", image: "/images/mannvasam-shivan-samba-hero.png", packs: { "500 g": 60, "1 kg": 125 } };
export const API = ((import.meta.env && import.meta.env.VITE_API_URL) || "") + "/api";
export const inr = (n) => "₹" + Number(n || 0).toLocaleString("en-IN");
export const $ = (s, r = document) => r.querySelector(s);
export const load = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) || d; } catch { return d; } };
export const save = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} };
export function shell(step, inner) {
  const st = ["PRODUCT", "DELIVERY", "PAYMENT"].map((s, i) => (i + 1 === step ? `<b>${i + 1} ${s}</b>` : `${i + 1} ${s}`)).join(" · ");
  document.getElementById("app").innerHTML = `<header class="top"><a class="brand" href="/">MANNVASAM</a><nav><a href="/">Home</a><a href="/#mv-shop">Shop</a><a href="/recipes.html">Recipes</a><a href="/story.html">Story</a></nav></header><div class="steps">${st}</div>${inner}<footer>Rooted in tradition. Made for today.</footer>`;
}
export function order() {
  const o = load("mv-order", null);
  if (!o || !Object.prototype.hasOwnProperty.call(PRODUCT.packs, o.pack)) return null;
  const qty = Math.max(1, Math.min(10, Math.floor(Number(o.qty)) || 1));
  return { pack: o.pack, qty, price: PRODUCT.packs[o.pack] };
}
