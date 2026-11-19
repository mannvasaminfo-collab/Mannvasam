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
    event.preventDefault();
    event.stopImmediatePropagation();
    if (!form.reportValidity()) return;

    let cart;
    try { cart = JSON.parse(localStorage.getItem('mv-shop-cart') || '[]'); } catch { cart = []; }
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
        throw new Error('Order saved successfully. Your Order ID is ' + result.order.orderId + '. Please use Track Order.');
      }

      layout.hidden = true;
      heading.hidden = true;
      confirmation.querySelector('.mv-checkout-confirm-text').textContent =
        'Your Cash on Delivery order is confirmed in our system. Payment will be collected at delivery.';
      confirmation.querySelector('h2').innerHTML = 'Order <i>confirmed.</i>';
      details.replaceChildren();

      const addLine = (label, value, emphasize = false) => {
        const p = document.createElement('p');
        p.style.cssText = 'display:flex;justify-content:space-between;gap:12px;padding:8px 0;border-bottom:1px solid rgba(25,61,40,.12);';
        const strong = document.createElement('strong');
        strong.textContent = label;
        const span = document.createElement('span');
        span.textContent = String(value);
        if (emphasize) span.style.fontWeight = '700';
        p.append(strong, span);
        details.appendChild(p);
      };

      addLine('Order ID', result.order.orderId);
      addLine('Order status', result.order.status);
      addLine('Payment', 'Cash on Delivery');
      addLine('Items subtotal', '₹' + Number(result.order.subtotal).toLocaleString('en-IN'));
      addLine('Courier charge', '₹' + Number(result.order.courierCharge).toLocaleString('en-IN'));
      addLine('Total payable', '₹' + Number(result.order.total).toLocaleString('en-IN'), true);

      const track = document.createElement('a');
      track.href = '/tracking.html';
      track.className = 'mv-cod-done';
      track.textContent = 'TRACK MY ORDER →';
      track.style.cssText = 'display:inline-block;margin-top:20px;padding:14px 22px;background:#193d28;color:#fff;text-decoration:none;';
      details.appendChild(track);

      const done = document.createElement('button');
      done.type = 'button';
      done.className = 'mv-cod-done';
      done.textContent = 'CONTINUE SHOPPING';
      done.style.cssText = 'margin:12px 0 0 10px;padding:14px 22px;background:#b88a45;color:#193d28;border:0;cursor:pointer;';
      done.addEventListener('click', () => {
        localStorage.removeItem('mv-shop-cart');
        window.location.reload();
      });
      details.appendChild(done);
      confirmation.hidden = false;
      localStorage.setItem('mv-last-order', JSON.stringify({orderId:result.order.orderId,phone:customer.phone}));
    } catch (error) {
      showError(form, error.message || 'Could not connect to the order system.');
    } finally {
      button.disabled = false;
      button.textContent = originalText;
    }
  }, true);
  console.log('MANNVASAM COD checkout connector loaded.');
})();
