(() => {
  const API = ((import.meta.env.VITE_API_URL || '') + '/api');
  function showError(form, message) {
    let box = form.querySelector('.mv-cod-error');
    if (!box) {
      box = document.createElement('p');
      box.className = 'mv-cod-error';
      box.setAttribute('role', 'alert');
      box.style.cssText = 'color:#a33;margin:12px 0;font-size:14px;';
      form.insertBefore(box, form.querySelector('.mv-checkout-review'));
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
    if (!Array.isArray(cart) || !cart.length) { showError(form, 'Your bag is empty. Please add a product first.'); return; }

    const button = form.querySelector('.mv-checkout-review');
    const originalText = button.textContent;
    button.disabled = true;
    button.textContent = 'PLACING COD ORDER…';
    try {
      const customer = Object.fromEntries(new FormData(form).entries());
      const response = await fetch(`${API}/orders`, {
        method:'POST', headers:{'Content-Type':'application/json'},
        body:JSON.stringify({customer,items:cart})
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Order could not be saved.');
      const payload = {order:result.order,customer};
      sessionStorage.setItem('mv-order-confirmation',JSON.stringify(payload));
      localStorage.setItem('mv-last-order',JSON.stringify({orderId:result.order.orderId,phone:customer.phone}));
      window.location.assign('/confirmation.html');
    } catch(error) {
      showError(form,error.message || 'Unable to place order. Please try again.');
      button.disabled=false;
      button.textContent=originalText;
    }
  },true);
  console.log('MANNVASAM COD order redirect enabled.');
})();
