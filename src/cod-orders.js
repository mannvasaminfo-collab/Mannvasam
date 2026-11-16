(() => {
  const API = ((import.meta.env.VITE_API_URL || '') + '/api');

  function showError(form, message) {
    let box = form.querySelector('.mv-cod-error');
    if (!box) {
      box = document.createElement('p');
      box.className = 'mv-cod-error';
      box.setAttribute('role', 'alert');
      box.style.cssText = 'color:#a33;margin:12px 0;font-size:14px;';
      const button = form.querySelector('.mv-checkout-review');
      form.insertBefore(box, button);
    }
    box.textContent = message;
  }

  document.addEventListener('submit', async event => {
    const form = event.target;
    if (!form.matches('.mv-checkout-form')) return;

    // Take control before the old preview-only submit handler.
    event.preventDefault();
    event.stopImmediatePropagation();

    if (!form.reportValidity()) return;

    let cart;
    try {
      cart = JSON.parse(localStorage.getItem('mv-shop-cart') || '[]');
    } catch {
      cart = [];
    }

    if (!Array.isArray(cart) || !cart.length) {
      showError(form, 'Your bag is empty. Please add a product first.');
      return;
    }

    const button = form.querySelector('.mv-checkout-review');
    const originalText = button.textContent;
    button.disabled = true;
    button.textContent = 'PLACING COD ORDER…';

    try {
      const customer = Object.fromEntries(new FormData(form).entries());
      const response = await fetch(`${API}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customer, items: cart })
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Order could not be saved.');

      const confirmation = document.querySelector('.mv-checkout-confirmation');
      const layout = document.querySelector('.mv-checkout-layout');
      const heading = document.querySelector('.mv-checkout-heading');
      const details = confirmation?.querySelector('.mv-checkout-confirm-details');

      if (!confirmation || !details) {
        throw new Error('The order was saved, but the confirmation panel was not found. Your order ID is ' + result.order.orderId);
      }

      layout.hidden = true;
      heading.hidden = true;
      confirmation.querySelector('.mv-checkout-confirm-text').textContent =
        'Your Cash on Delivery order has been saved locally. No online payment has been collected.';

      details.replaceChildren();

      const addLine = (label, value) => {
        const p = document.createElement('p');
        const strong = document.createElement('strong');
        strong.textContent = label + ': ';
        p.append(strong, document.createTextNode(String(value)));
        details.appendChild(p);
      };

      addLine('Order ID', result.order.orderId);
      addLine('Order status', result.order.status);
      addLine('Payment', 'Cash on Delivery');
      addLine('Order total', '₹' + Number(result.order.subtotal).toLocaleString('en-IN'));

      const done = document.createElement('button');
      done.type = 'button';
      done.className = 'mv-cod-done';
      done.textContent = 'CONTINUE SHOPPING';
      done.style.cssText = 'margin-top:20px;padding:14px 22px;background:#193d28;color:#fff;border:0;cursor:pointer;';
      done.addEventListener('click', () => {
        localStorage.removeItem('mv-shop-cart');
        window.location.reload();
      });
      details.appendChild(done);

      confirmation.hidden = false;
    } catch (error) {
      showError(form, error.message || 'Could not connect to the local order system.');
    } finally {
      button.disabled = false;
      button.textContent = originalText;
    }
  }, true);

  console.log('MANNVASAM COD checkout connector loaded.');
})();
