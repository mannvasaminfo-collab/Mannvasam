import { PRODUCT, API, inr, $, load, shell, order } from "./order-lib.js";
const o = order(), c = load("mv-customer", null);
if (!o) location.replace("/product.html");
else if (!c || !c.name) location.replace("/checkout.html");
else {
  const total = o.price * o.qty;
  shell(3, `<main class="wrap" id="mn"><section class="card"><span class="k">PAYMENT METHOD</span><div class="opt on"><input type="radio" checked disabled><div><b>Cash on Delivery</b><br>Pay when your rice arrives.</div></div><div class="opt off"><input type="radio" disabled><div><b>UPI / Card</b><br>Coming soon</div></div><span class="k" style="margin-top:18px">DELIVER TO</span><p id="ad"></p><p class="err" id="er"></p><button class="btn" id="pl" type="button">PLACE ORDER · ${inr(total)}</button><a class="btn ghost" href="/checkout.html">EDIT DETAILS</a></section><aside class="card"><span class="k">YOUR ORDER</span><div class="sum"><img src="${PRODUCT.image}" alt=""><div><b>${PRODUCT.name}</b><br>${o.qty} × ${o.pack}</div></div><p class="line"><span>Total (cash on delivery)</span><b>${inr(total)}</b></p></aside></main>`);
  $("#ad").textContent = [c.name, c.phone, c.address, c.landmark, c.city + ", " + c.state + " - " + c.pincode].filter(Boolean).join("\n");
  $("#pl").onclick = async () => {
    const b = $("#pl");
    b.disabled = true; b.textContent = "PLACING YOUR ORDER…"; $("#er").textContent = "";
    try {
      const r = await fetch(API + "/orders", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ customer: c, items: [{ id: PRODUCT.id, name: PRODUCT.name, pack: o.pack, price: o.price, qty: o.qty }] }) });
      const j = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(j.error || "Order could not be placed. Please try again.");
      done(j.orderId || j.orderCode || j.order_code || j.id || "", total);
    } catch (e) {
      $("#er").textContent = e.message || "Could not reach the server. Please try again.";
      b.disabled = false; b.textContent = "PLACE ORDER · " + inr(total);
    }
  };
}
function done(code, total) {
  try { localStorage.removeItem("mv-order"); } catch {}
  $("#mn").innerHTML = '<section class="card ok"><div class="tick">✓</div><h1>Thank you!</h1><p id="t1"></p><p id="t2"></p><a class="btn" id="wa" target="_blank" rel="noopener">MESSAGE US ON WHATSAPP</a><a class="btn ghost" href="/">BACK TO HOME</a></section>';
  $("#t1").textContent = "Your order" + (code ? " " + code : "") + " has been placed. Please pay cash when it arrives.";
  $("#t2").textContent = "It is pending confirmation. We will confirm it shortly.";
  $("#wa").href = "https://wa.me/917548883966?text=" + encodeURIComponent("Hello MANNVASAM, I placed order " + (code || "") + " (" + inr(total) + ").");
}
