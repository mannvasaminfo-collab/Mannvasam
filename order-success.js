import { inr, shell, load, CUSTOMER_CARE_EMAIL } from "./order-lib.js";

const saved = load("mv-last-order", null);

if (!saved || !saved.orderId) {
  location.replace("/");
} else {
  shell(3, `<main class="wrap" style="max-width:760px">
    <section class="card ok">
      <div class="tick" aria-hidden="true">✓</div>
      <span class="k">ORDER RECEIVED</span>
      <h1>Thank you for choosing MANNVASAM.</h1>
      <p>Your Cash on Delivery order has been placed successfully.</p>
      <div style="margin:24px auto;padding:18px;background:#f5efe3;border-radius:12px;text-align:left">
        <p class="line"><span>Order number</span><b id="order-id"></b></p>
        <p class="line"><span>Order status</span><b id="order-status"></b></p>
        <p class="line"><span>Payment</span><b id="order-payment"></b></p>
        <p class="line"><span>Total</span><b id="order-total"></b></p>
      </div>
      <p>We will contact you to confirm your order. Please pay cash when it is delivered.</p>
      <p class="customer-care">Need help? Email <a href="mailto:mannvasam.info@gmail.com">mannvasam.info@gmail.com</a></p>
      <a class="btn" id="wa" target="_blank" rel="noopener">MESSAGE US ON WHATSAPP</a>
      <a class="btn ghost" href="/tracking.html">TRACK YOUR ORDER</a>
      <a class="btn ghost" href="/">CONTINUE SHOPPING</a>
    </section>
  </main>`);

  document.querySelector("#order-id").textContent = saved.orderId;
  document.querySelector("#order-status").textContent = saved.status || "Pending";
  document.querySelector("#order-payment").textContent = saved.paymentMethod || "Cash on Delivery";
  document.querySelector("#order-total").textContent = inr(saved.total);

  const itemNames = Array.isArray(saved.items)
    ? saved.items.map(item => `${item.name} · ${item.pack} × ${item.qty}`).join(", ")
    : "";
  document.querySelector("#wa").href = "https://wa.me/917548883966?text=" +
    encodeURIComponent(`Hello MANNVASAM, my order ${saved.orderId} (${inr(saved.total)}) has been placed. ${itemNames}`);
}
