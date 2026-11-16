import { PRODUCT, API, inr, $, load, save, shell, order } from "./order-lib.js";

const o = order();
const c = load("mv-customer", null);

if (!o) location.replace("/product.html");
else if (!c || !c.name) location.replace("/checkout.html");
else {
  const total = o.price * o.qty;

  shell(3, `<main class="wrap" id="mn">
    <section class="card">
      <span class="k">REVIEW YOUR ORDER</span>
      <h1>Almost there.</h1>
      <p>Please check your delivery details and order carefully before confirming.</p>
      <span class="k" style="margin-top:20px">DELIVER TO</span>
      <p id="ad" style="white-space:pre-line;line-height:1.7"></p>
      <a class="btn ghost" href="/checkout.html">EDIT DELIVERY DETAILS</a>
      <span class="k" style="margin-top:24px">PAYMENT METHOD</span>
      <div class="opt on"><input type="radio" checked disabled><div><b>Cash on Delivery</b><br>Pay when your order arrives.</div></div>
      <div class="opt off"><input type="radio" disabled><div><b>UPI / Card</b><br>Coming soon</div></div>
      <p class="err" id="er" role="alert"></p>
      <button class="btn" id="review" type="button">REVIEW & CONFIRM ORDER · ${inr(total)}</button>
    </section>
    <aside class="card">
      <span class="k">YOUR ORDER</span>
      <div class="sum"><img src="${PRODUCT.image}" alt=""><div><b>${PRODUCT.name}</b><br>${o.qty} × ${o.pack}</div></div>
      <p class="line"><span>Total · Cash on Delivery</span><b>${inr(total)}</b></p>
    </aside>
  </main>
  <div id="confirm-layer" hidden style="position:fixed;inset:0;z-index:1000;background:#142319b8;display:none;align-items:center;justify-content:center;padding:20px">
    <section role="dialog" aria-modal="true" aria-labelledby="confirm-title" class="card" style="width:min(440px,100%);box-sizing:border-box">
      <span class="k">FINAL CONFIRMATION</span>
      <h2 id="confirm-title">Are you sure you want to place this order?</h2>
      <p>Your order will be saved with MANNVASAM only if you choose YES.</p>
      <button class="btn" id="yes" type="button">YES, PLACE MY ORDER</button>
      <button class="btn ghost" id="no" type="button">NO, GO BACK</button>
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
    layer.style.display = "flex";
    yesButton.focus();
  });

  const closeConfirmation = () => {
    layer.hidden = true;
    layer.style.display = "none";
    reviewButton.focus();
  };

  noButton.addEventListener("click", closeConfirmation);
  layer.addEventListener("click", (event) => {
    if (event.target === layer) closeConfirmation();
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
        total: Number(savedOrder.subtotal ?? total),
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
