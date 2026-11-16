import { PRODUCT, inr, $, load, save, shell, order } from "./order-lib.js";
const o = order();
if (!o) location.replace("/product.html");
else {
  const F = ["name", "phone", "email", "address", "landmark", "city", "state", "pincode", "note"];
  const inp = (id, label, type, ph = "") => `<label for="${id}">${label}</label><input id="${id}" name="${id}" type="${type}" placeholder="${ph}" autocomplete="off">`;
  shell(2, `<main class="wrap"><form class="card" id="f" novalidate><span class="k">DELIVERY DETAILS</span>${inp("name", "Full name", "text")}${inp("phone", "Mobile number (10 digits)", "tel")}${inp("email", "Email (optional)", "email")}<label for="address">Delivery address</label><textarea id="address" name="address" rows="3"></textarea>${inp("landmark", "Landmark (optional)", "text")}<div class="row2"><div>${inp("city", "City", "text")}</div><div>${inp("pincode", "Pincode", "tel")}</div></div>${inp("state", "State", "text")}<label for="note">Note (optional)</label><textarea id="note" name="note" rows="2"></textarea><p class="err" id="er"></p><button class="btn" type="submit">CONTINUE TO PAYMENT →</button></form><aside class="card"><span class="k">YOUR ORDER</span><div class="sum"><img src="${PRODUCT.image}" alt=""><div><b>${PRODUCT.name}</b><br>${o.qty} × ${o.pack}</div></div><p class="line"><span>Total</span><b>${inr(o.price * o.qty)}</b></p><a class="btn ghost" href="/product.html">CHANGE PRODUCT</a></aside></main>`);
  const saved = load("mv-customer", {});
  F.forEach((k) => { if (saved[k]) $("#" + k).value = saved[k]; });
  if (!$("#state").value) $("#state").value = "Tamil Nadu";
  $("#f").addEventListener("submit", (e) => {
    e.preventDefault();
    const c = {};
    F.forEach((k) => { c[k] = $("#" + k).value.trim(); });
    const bad = !c.name ? "Please enter your name." : !/^[6-9]\d{9}$/.test(c.phone) ? "Enter a valid 10-digit mobile number." : c.email && !/^\S+@\S+\.\S+$/.test(c.email) ? "Enter a valid email or leave it empty." : c.address.length < 8 ? "Please enter your full delivery address." : !c.city ? "Please enter your city." : !c.state ? "Please enter your state." : !/^\d{6}$/.test(c.pincode) ? "Enter a valid 6-digit pincode." : "";
    $("#er").textContent = bad;
    if (bad) return;
    save("mv-customer", c);
    location.href = "/payment.html";
  });
}
