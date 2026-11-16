import { API, inr, shell } from "./order-lib.js";

shell(0, `<main class="wrap track-page">
  <section class="track-heading"><span class="k">MANNVASAM · ORDER CARE</span><h1>Track your order</h1><p>Enter your order number and the mobile number used at checkout to see the latest update.</p></section>
  <section class="card track-card">
    <form id="track-form" novalidate>
      <label for="track-id">Order number</label>
      <input id="track-id" name="orderId" placeholder="MV-YYYYMMDD-XXXXXX" autocomplete="off" required>
      <label for="track-phone">Delivery mobile number</label>
      <input id="track-phone" name="phone" type="tel" inputmode="numeric" maxlength="10" placeholder="10-digit mobile number" autocomplete="tel" required>
      <p id="track-error" class="err" role="alert" aria-live="polite"></p>
      <button class="btn" id="track-submit" type="submit">CHECK ORDER STATUS</button>
    </form>
  </section>
  <section id="track-result" class="card track-result" hidden aria-live="polite"></section>
  <p class="track-help">Need help? <a href="mailto:mannvasam.info@gmail.com">mannvasam.info@gmail.com</a></p>
</main>`);

const form = document.querySelector("#track-form");
const button = document.querySelector("#track-submit");
const error = document.querySelector("#track-error");
const result = document.querySelector("#track-result");
const steps = ["Pending", "Confirmed", "Packed", "Shipped", "Delivered"];
const labels = {
  Pending: "Order received",
  Confirmed: "Order confirmed",
  Packed: "Order packed",
  Shipped: "Order shipped",
  Delivered: "Delivered",
  Cancelled: "Order cancelled"
};
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  error.textContent = "";
  result.hidden = true;
  const orderField = form.elements.namedItem("orderId");
  const phoneField = form.elements.namedItem("phone");
  const orderId = String(orderField?.value || "").trim().replace(/\s+/g, "").toUpperCase();
  const phone = String(phoneField?.value || "").replace(/\D/g, "");
  if (!/^MV-\d{8}-[A-F0-9]{6}$/.test(orderId)) {
    error.textContent = "Check your order number. It should look like MV-20261116-A1B2C3.";
    orderField?.focus();
    return;
  }
  if (!/^[6-9]\d{9}$/.test(phone)) {
    error.textContent = "Enter the same 10-digit mobile number used at checkout.";
    phoneField?.focus();
    return;
  }
  button.disabled = true;
  button.textContent = "CHECKING…";
  try {
    const response = await fetch(API + "/track-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId, phone })
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.error || "Unable to find this order.");
    const o = data.order;
    const current = o.status;
    const cancelled = current === "Cancelled";
    const activeIndex = steps.indexOf(current);
    const timeline = cancelled
      ? `<div class="track-cancelled">This order has been cancelled. Please contact customer care if you need assistance.</div>`
      : `<ol class="track-timeline">${steps.map((s, i) => `<li class="${activeIndex >= i ? "complete" : ""} ${current === s ? "current" : ""}"><span class="track-dot">${activeIndex >= i ? "✓" : ""}</span><span>${labels[s]}</span></li>`).join("")}</ol>`;
    result.innerHTML = `<div class="track-result-head"><div><span class="k">ORDER DETAILS</span><h2>${o.orderId}</h2></div><span class="track-status">${labels[current] || current}</span></div>
      <p class="track-date">Placed ${new Date(o.createdAt).toLocaleString("en-IN")}</p>
      ${timeline}
      <div class="track-breakdown">${(o.items || []).map(i => `<div class="track-line"><span>${Number(i.qty)||1} × ${i.name} · ${i.pack}</span><b>${inr(i.lineTotal || i.price * i.qty)}</b></div>`).join("")}
      <div class="track-line"><span>Items subtotal</span><b>${inr(o.subtotal)}</b></div>
      <div class="track-line"><span>Delivery charge</span><b>${inr(o.courierCharge)}</b></div>
      <div class="track-line track-grand"><span>Total · ${o.paymentMethod || "Cash on Delivery"}</span><b>${inr(o.total)}</b></div></div>`;
    result.hidden = false;
  } catch (e) {
    error.textContent = e.message || "Could not reach MANNVASAM. Please try again.";
  } finally {
    button.disabled = false;
    button.textContent = "CHECK ORDER STATUS";
  }
});