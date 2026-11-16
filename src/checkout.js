
(function () {
  function setupCheckout() {
    const cartButton = document.querySelector('.mv-checkout-preview');
    if (!cartButton) return false;
    if (document.querySelector('#mv-checkout')) return true;

    cartButton.disabled = false;
    cartButton.textContent = 'PROCEED TO CHECKOUT →';

    const overlay = document.createElement('div');
    overlay.id = 'mv-checkout';
    overlay.className = 'mv-checkout-overlay';
    overlay.innerHTML = `
      <div class="mv-checkout-panel">
        <button type="button" class="mv-checkout-close" aria-label="Close checkout">×</button>
        <div class="mv-checkout-heading">
          <p class="eyebrow">MANNVASAM · FROM OUR SOIL TO YOUR SOUL</p>
          <h2>Almost <i>home.</i></h2>
          <p>Enter your delivery details and review your shopping bag.</p>
        </div>
        <div class="mv-checkout-layout">
          <form class="mv-checkout-form">
            <h3>Delivery details</h3>
            <label>Full name<input name="name" autocomplete="name" required placeholder="Your full name"></label>
            <div class="mv-checkout-two">
              <label>Mobile number<input name="phone" type="tel" inputmode="numeric" pattern="[6-9][0-9]{9}" maxlength="10" autocomplete="tel" required placeholder="10-digit mobile number"></label>
              <label>Email address<input name="email" type="email" autocomplete="email" placeholder="you@example.com"></label>
            </div>
            <label>House / Flat / Street address<textarea name="address" rows="3" autocomplete="street-address" required placeholder="Enter your complete delivery address"></textarea></label>
            <div class="mv-checkout-two">
              <label>City<input name="city" required autocomplete="address-level2" placeholder="City"></label>
              <label>State<input name="state" required autocomplete="address-level1" placeholder="State"></label>
            </div>
            <div class="mv-checkout-two">
              <label>PIN code<input name="pincode" inputmode="numeric" pattern="[0-9]{6}" maxlength="6" required autocomplete="postal-code" placeholder="6-digit PIN"></label>
              <label>Landmark<input name="landmark" placeholder="Nearby landmark (optional)"></label>
            </div>
            <label>Order note<textarea name="note" rows="2" placeholder="Any delivery instructions? (optional)"></textarea></label>
            <button class="mv-checkout-review" type="submit">REVIEW MY ORDER →</button>
            <p class="mv-checkout-privacy">This is a local checkout preview. Your details are not sent or saved.</p>
          </form>
          <aside class="mv-checkout-summary">
            <h3>Your order</h3>
            <div class="mv-checkout-lines"></div>
            <div class="mv-checkout-total"><span>Subtotal</span><strong>₹0</strong></div>
            <p>Delivery charges and payment options will be added when the live order system is connected.</p>
          </aside>
        </div>
        <div class="mv-checkout-confirmation" hidden>
          <p class="eyebrow">MANNVASAM · ORDER REVIEW</p>
          <h2>Your details are <i>ready.</i></h2>
          <p class="mv-checkout-confirm-text">This is a preview only. No order has been placed and no payment has been collected.</p>
          <div class="mv-checkout-confirm-details"></div>
          <button type="button" class="mv-checkout-back">BACK TO CHECKOUT</button>
        </div>
      </div>`;
    document.body.appendChild(overlay);

    const escapeHTML = value => String(value).replace(/[&<>"']/g, ch => ({
      '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'
    })[ch]);

    function getCart() {
      try {
        const items = JSON.parse(localStorage.getItem('mv-shop-cart') || '[]');
        return Array.isArray(items) ? items : [];
      } catch {
        return [];
      }
    }

    function renderSummary() {
      const items = getCart();
      const lines = overlay.querySelector('.mv-checkout-lines');
      const total = items.reduce((sum, item) => sum + Number(item.price) * Number(item.qty), 0);

      lines.innerHTML = items.length
        ? items.map(item => `
            <div class="mv-checkout-line">
              <div><strong>${escapeHTML(item.name)}</strong><small>${escapeHTML(item.pack)} × ${Number(item.qty)}</small></div>
              <strong>₹${(Number(item.price) * Number(item.qty)).toLocaleString('en-IN')}</strong>
            </div>`).join('')
        : '<p class="mv-checkout-empty">Your bag is empty. Add products before checkout.</p>';

      overlay.querySelector('.mv-checkout-total strong').textContent =
        '₹' + total.toLocaleString('en-IN');

      overlay.querySelector('.mv-checkout-review').disabled = !items.length;
    }

    function closeCheckout() {
      overlay.classList.remove('open');
      document.body.classList.remove('mv-checkout-open');
    }

    cartButton.addEventListener('click', () => {
      renderSummary();
      overlay.classList.add('open');
      document.body.classList.add('mv-checkout-open');
    });

    overlay.querySelector('.mv-checkout-close').addEventListener('click', closeCheckout);
    overlay.addEventListener('click', e => {
      if (e.target === overlay) closeCheckout();
    });

    overlay.querySelector('.mv-checkout-form').addEventListener('submit', e => {
      e.preventDefault();
      const form = e.currentTarget;
      if (!form.reportValidity()) return;

      const data = new FormData(form);
      const details = overlay.querySelector('.mv-checkout-confirm-details');
      const fields = [
        ['Name', data.get('name')],
        ['Mobile', data.get('phone')],
        ['Email', data.get('email') || 'Not provided'],
        ['Address', data.get('address')],
        ['City', data.get('city')],
        ['State', data.get('state')],
        ['PIN code', data.get('pincode')],
        ['Landmark', data.get('landmark') || 'Not provided'],
        ['Order note', data.get('note') || 'None']
      ];

      details.innerHTML = fields.map(([label, value]) =>
        `<p><strong>${escapeHTML(label)}:</strong> ${escapeHTML(value)}</p>`
      ).join('');

      overlay.querySelector('.mv-checkout-layout').hidden = true;
      overlay.querySelector('.mv-checkout-heading').hidden = true;
      overlay.querySelector('.mv-checkout-confirmation').hidden = false;
    });

    overlay.querySelector('.mv-checkout-back').addEventListener('click', () => {
      overlay.querySelector('.mv-checkout-confirmation').hidden = true;
      overlay.querySelector('.mv-checkout-layout').hidden = false;
      overlay.querySelector('.mv-checkout-heading').hidden = false;
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeCheckout();
    });

    console.log('MANNVASAM checkout preview loaded.');
    return true;
  }

  if (!setupCheckout()) {
    const observer = new MutationObserver(() => {
      if (setupCheckout()) observer.disconnect();
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });
  }
})();
