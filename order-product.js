import "./pack3d.js";
import { PRODUCT, inr, $, save, shell } from "./order-lib.js";
const DESC = ["Premium Heritage Rice from MANNVASAM.", "Traditional rice, from our soil to your soul."];
let pack = "1 kg", qty = 1;
shell(1, `<main class="wrap"><div class="dark"><div class="pack3d"><img alt="MANNVASAM Shiva Samba rice packet" src="${PRODUCT.image}"></div></div><div class="card"><span class="k">PREMIUM HERITAGE RICE</span><h1>${PRODUCT.name}</h1><div class="price" id="pr"></div>${DESC.map((t) => `<p>${t}</p>`).join("")}<ul class="facts"><li>Packed by MANNVASAM</li><li>Net weight: 500 g or 1 kg</li><li>Cash on delivery available</li></ul><span class="k" style="margin-top:18px">CHOOSE PACK</span><div class="chips" id="ch"></div><span class="k">QUANTITY</span><div class="qty"><button id="mn" type="button">−</button><b id="q"></b><button id="pl" type="button">+</button></div><p class="line"><span>Total</span><b id="tt"></b></p><button class="btn" id="go" type="button" style="margin-top:14px">ORDER NOW →</button><a class="btn ghost" href="/recipes.html">COOKING IDEAS</a></div></main>`);
const upd = () => {
  const p = PRODUCT.packs[pack];
  $("#pr").textContent = inr(p) + " · " + pack; $("#q").textContent = qty; $("#tt").textContent = inr(p * qty);
  $("#ch").innerHTML = Object.keys(PRODUCT.packs).map((k) => `<button class="chip${k === pack ? " on" : ""}" data-k="${k}" type="button">${k} · ${inr(PRODUCT.packs[k])}</button>`).join("");
};
document.addEventListener("click", (e) => {
  const c = e.target.closest(".chip");
  if (c) { pack = c.dataset.k; upd(); }
  if (e.target.id === "mn") { qty = Math.max(1, qty - 1); upd(); }
  if (e.target.id === "pl") { qty = Math.min(10, qty + 1); upd(); }
  if (e.target.id === "go") { save("mv-order", { pack, qty }); location.href = "/checkout.html"; }
});
upd();
