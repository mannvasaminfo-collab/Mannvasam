import { PRODUCT, API, inr, courierCharge, $, load, save, shell, order } from "./order-lib.js";

const o = order();
const c = load("mv-customer", null);

if (!o) location.replace("/product.html");
else if (!c || !c.name) location.replace("/checkout.html");
else {
  const subtotal = o.price * o.qty;
  const delivery = courierCharge(c);
  const total = subtotal + delivery;

  shell(3, `<main class="wrap checkout-review" id="mn">
    <div class="review-heading">
      <div>
        <span class="k">MANNVASAM · CHECKOUT</span>
        <h1>Review your order</h1>
        <p>One last look before we prepare your traditional favourites.</p>
      </div>
      <div class="review-trust"><span class="review-trust-mark">✓</span><span>Safe &amp; simple<br><b>Cash on Delivery</b></span></div>
    </div>

    <div class="review-grid">
      <section class="card review-card">
        <div class="review-section-title">
          <span class="review-number">01</span>
          <div><h2>Delivery details</h2><p>Where should we bring your order?</p></div>
        </div>
        <div class="review-address"><p id="ad"></p></div>
        <a class="review-edit" href="/checkout.html">EDIT DELIVERY ADDRESS <span>↗</span></a>

        <div class="review-divider"></div>

        <div class="review-section-title">
          <span class="review-number">02</span>
          <div><h2>Payment method</h2><p>Pay only when your order arrives.</p></div>
        </div>
        <div class="opt on review-payment-option"><span class="review-cod-icon">₹</span><div><b>Cash on Delivery</b><small>Pay in cash at the time of delivery.</small></div><span class="review-selected">SELECTED ✓</span></div>
        <div class="opt off review-payment-option"><span class="review-cod-icon muted">⌁</span><div><b>UPI / Card</b><small>Online payment will be available soon.</small></div><span class="review-coming">COMING SOON</span></div>

        <p class="err" id="er" role="alert"></p>
        <button class="btn review-submit" id="review" type="button">CONTINUE TO CONFIRMATION <span>→</span></button>
        <p class="review-note">Your order is not placed until you confirm it in the next step.</p>
      </section>

      <aside class="card order-summary">
        <span class="k">YOUR ORDER</span>
        <h2>Order summary</h2>
        <div class="sum review-product">
          <div class="review-product-image"><img src="${PRODUCT.image}" alt=""></div>
          <div><b>${PRODUCT.name}</b><span>${o.pack} pack</span><small>Quantity: ${o.qty}</small></div>
        </div>
        <div class="review-price-line"><span>Price per pack</span><b>${inr(o.price)}</b></div>
        <div class="review-price-line"><span>Quantity</span><b>× ${o.qty}</b></div>
        <div class="review-price-line"><span>Courier charge</span><b>${"${inr(delivery)}"}</b></div>
        <div class="review-total"><span>Order total</span><b>${inr(total)}</b></div>
        <div class="review-summary-foot"><span>✦</span> Rooted in tradition. Made with care.</div>
      </aside>
    </div>
  </main>
  <div id="confirm-layer" class="review-modal-backdrop" hidden>
    <section role="dialog" aria-modal="true" aria-labelledby="confirm-title" class="card review-modal">
      <div class="review-modal-mark">?</div>
      <span class="k">FINAL CONFIRMATION</span>
      <h2 id="confirm-title">Ready to place your order?</h2>
      <p>Please confirm that your delivery details and order summary are correct.</p>
      <div class="review-modal-total"><span>Amount to pay on delivery</span><b>${inr(total)}</b></div>
      <button class="btn" id="yes" type="button">YES, PLACE MY ORDER</button>
      <button class="btn ghost" id="no" type="button">NO, LET ME REVIEW</button>
    </section>
  </div>`);

  $("#ad").textContent = [
    c.name,
    c.phone,
    c.email,
    c.address,
    c.landmark,
    [c.city, c.state].filter(Boolean).join(", ") + " - " + c.pincode,
    c.note ? "Note: " + c.note : ""
  ].filter(Boolean).join("\n");

  const layer = $("#confirm-layer");
  const reviewButton = $("#review");
  const yesButton = $("#yes");
  const noButton = $("#no");
  let placing = false;

  reviewButton.addEventListener("click", () => {
    layer.hidden = false;
    yesButton.focus();
  });

  const closeConfirmation = () => {
    layer.hidden = true;
    reviewButton.focus();
  };

  noButton.addEventListener("click", closeConfirmation);
  layer.addEventListener("click", (event) => {
    if (event.target === layer) closeConfirmation();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !layer.hidden) closeConfirmation();
  });

  yesButton.addEventListener("click", async () => {
    if (placing) return;
    placing = true;
    yesButton.disabled = true;
    noButton.disabled = true;
    yesButton.textContent = "PLACING YOUR ORDER…";
    $("#er").textContent = "";

    try {
      const response = await fetch(API + "/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: c,
          items: [{
            id: PRODUCT.id,
            name: PRODUCT.name,
            pack: o.pack,
            price: o.price,
            qty: o.qty
          }]
        })
      });

      const result = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(result.error || "We could not place your order. Please try again.");
      }

      const savedOrder = result.order;
      const orderId = savedOrder && savedOrder.orderId;
      if (!orderId) {
        throw new Error("The server response did not include an order number. Please contact MANNVASAM before trying again.");
      }

      save("mv-last-order", {
        orderId,
        status: savedOrder.status || "Pending",
        paymentMethod: savedOrder.paymentMethod || "Cash on Delivery",
        total: Number(savedOrder.total ?? total),
        subtotal: Number(savedOrder.subtotal ?? subtotal),
        courierCharge: Number(savedOrder.courierCharge ?? delivery),
        customer: c,
        items: savedOrder.items || [{
          id: PRODUCT.id, name: PRODUCT.name, pack: o.pack, price: o.price, qty: o.qty
        }],
        createdAt: new Date().toISOString()
      });
      try { localStorage.removeItem("mv-order"); } catch {}
      location.replace("/success.html");
    } catch (error) {
      $("#er").textContent = error.message || "Could not reach the server. Please try again.";
      placing = false;
      yesButton.disabled = false;
      noButton.disabled = false;
      yesButton.textContent = "YES, PLACE MY ORDER";
    }
  });
}
