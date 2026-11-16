import { PRODUCT, inr, courierCharge, $, load, save, shell, order } from "./order-lib.js";

const o = order();
if (!o) location.replace("/product.html");
else {
  const F = ["name", "phone", "email", "address", "landmark", "city", "state", "pincode", "note"];
  const field = (id, label, type = "text", placeholder = "", extra = "") => `
    <div class="delivery-field ${extra}">
      <label for="${id}">${label}</label>
      <input id="${id}" name="${id}" type="${type}" placeholder="${placeholder}" autocomplete="off">
    </div>`;
  const area = (id, label, rows, placeholder = "", extra = "") => `
    <div class="delivery-field ${extra}">
      <label for="${id}">${label}</label>
      <textarea id="${id}" name="${id}" rows="${rows}" placeholder="${placeholder}"></textarea>
    </div>`;

  shell(2, `<main class="wrap delivery-page">
    <div class="delivery-heading">
      <div>
        <span class="k">MANNVASAM · CHECKOUT</span>
        <h1>Where should we deliver?</h1>
        <p>Share your details and we’ll take care of the rest.</p>
      </div>
      <div class="delivery-promise"><span>✦</span> Packed with care, delivered to your door</div>
    </div>

    <div class="delivery-grid">
      <form class="card delivery-card" id="f" novalidate>
        <div class="delivery-section-heading">
          <span class="delivery-number">01</span>
          <div><h2>Delivery details</h2><p>Fields marked * are required</p></div>
        </div>
        <div class="delivery-fields">
          ${field("name", "Full name *", "text", "Enter your full name", "field-full")}
          ${field("phone", "Mobile number *", "tel", "10-digit mobile number")}
          ${field("email", "Email address", "email", "you@example.com")}
          ${area("address", "House / Flat / Street address *", 3, "Enter your complete delivery address", "field-full")}
          ${field("landmark", "Landmark (optional)", "text", "Nearby landmark")}
          ${field("city", "City *", "text", "Your city")}
          ${field("state", "State *", "text", "Your state")}
          ${field("pincode", "PIN code *", "tel", "6-digit PIN")}
          ${area("note", "Delivery note (optional)", 2, "Any special delivery instructions?", "field-full")}
        </div>
        <p class="err delivery-error" id="er" role="alert"></p>
        <button class="btn delivery-submit" type="submit">CONTINUE TO ORDER REVIEW <span>→</span></button>
        <p class="delivery-secure">Your details are used only to process and deliver your order.</p>
      </form>

      <aside class="card delivery-summary">
        <span class="k">YOUR SELECTION</span>
        <h2>Order summary</h2>
        <div class="sum delivery-product">
          <div class="delivery-product-image"><img src="${PRODUCT.image}" alt="${PRODUCT.name}"></div>
          <div><b>${PRODUCT.name}</b><span>${o.pack} pack</span><small>Quantity: ${o.qty}</small></div>
        </div>
        <div class="delivery-charge-line"><span>Courier charge</span><b id="courier-charge">Enter city &amp; state</b></div>
        <div class="delivery-total"><span>Estimated total</span><b id="delivery-grand-total">${inr(o.price * o.qty)}</b></div>
        <div class="delivery-summary-note"><span>✓</span><p>Traditional goodness, carefully packed for your home.</p></div>
        <a class="btn ghost delivery-change" href="/product.html">CHANGE PRODUCT</a>
      </aside>
    </div>
  </main>`);

  const saved = load("mv-customer", {});
  F.forEach((k) => { if (saved[k]) $("#" + k).value = saved[k]; });
  if (!$("#state").value) $("#state").value = "Tamil Nadu";
  const updateDeliveryEstimate = () => {
    const city = $("#city").value.trim();
    const state = $("#state").value.trim();
    if (!city || !state) {
      $("#courier-charge").textContent = "Enter city & state";
      $("#delivery-grand-total").textContent = inr(o.price * o.qty);
      return;
    }
    const fee = courierCharge({ city, state });
    $("#courier-charge").textContent = inr(fee);
    $("#delivery-grand-total").textContent = inr(o.price * o.qty + fee);
  };
  ["city", "state"].forEach(id => $("#" + id).addEventListener("input", updateDeliveryEstimate));
  updateDeliveryEstimate();

  $("#f").addEventListener("submit", (e) => {
    e.preventDefault();
    const c = {};
    F.forEach((k) => { c[k] = $("#" + k).value.trim(); });
    const bad = !c.name ? "Please enter your name."
      : !/^[6-9]\d{9}$/.test(c.phone) ? "Enter a valid 10-digit mobile number."
      : c.email && !/^\S+@\S+\.\S+$/.test(c.email) ? "Enter a valid email or leave it empty."
      : c.address.length < 8 ? "Please enter your full delivery address."
      : !c.city ? "Please enter your city."
      : !c.state ? "Please enter your state."
      : !/^\d{6}$/.test(c.pincode) ? "Enter a valid 6-digit PIN code."
      : "";
    $("#er").textContent = bad;
    if (bad) {
      const firstInvalid = !c.name ? "#name" : !/^[6-9]\d{9}$/.test(c.phone) ? "#phone"
        : c.email && !/^\S+@\S+\.\S+$/.test(c.email) ? "#email"
        : c.address.length < 8 ? "#address" : !c.city ? "#city" : !c.state ? "#state"
        : !/^\d{6}$/.test(c.pincode) ? "#pincode" : "#name";
      $(firstInvalid).focus();
      return;
    }
    save("mv-customer", c);
    location.href = "/payment.html";
  });
}
