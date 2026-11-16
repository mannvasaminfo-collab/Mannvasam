const API = '/api';
const statuses = ['Pending','Confirmed','Packed','Shipped','Delivered','Cancelled'];
let orders = [];

const $ = id => document.getElementById(id);
const money = value => '₹' + Number(value || 0).toLocaleString('en-IN');
const safe = value => String(value ?? '').replace(/[&<>"']/g, c => ({
  '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
}[c]));

function updateStats() {
  $('totalOrders').textContent = orders.length;
  $('pendingOrders').textContent = orders.filter(o => o.status === 'Pending').length;
  $('confirmedOrders').textContent = orders.filter(o => o.status === 'Confirmed').length;
  const value = orders.filter(o => o.status !== 'Cancelled')
    .reduce((sum,o) => sum + Number(o.subtotal || 0), 0);
  $('orderValue').textContent = money(value);
}

function render() {
  const term = $('search').value.trim().toLowerCase();
  const filter = $('statusFilter').value;
  const shown = orders.filter(o => {
    const c = o.customer || {};
    const haystack = [
      o.orderId,c.name,c.phone,c.city,c.pincode
    ].join(' ').toLowerCase();
    return (!term || haystack.includes(term)) &&
      (!filter || o.status === filter);
  });

  $('message').textContent = `${shown.length} of ${orders.length} orders`;

  if (!shown.length) {
    $('ordersBody').innerHTML =
      '<tr><td colspan="6" class="empty"><strong>No orders found</strong>Orders will appear here after a customer places a COD order.</td></tr>';
    return;
  }

  $('ordersBody').innerHTML = shown.map(o => {
    const c = o.customer || {};
    const items = Array.isArray(o.items) ? o.items : [];
    const itemText = items.map(i =>
      `${safe(i.name)} · ${safe(i.pack)} × ${Number(i.qty)}`
    ).join('<br>');

    const address = [c.address,c.landmark,c.city,c.state,c.pincode]
      .filter(Boolean).map(safe).join(', ');

    return `<tr>
      <td><div class="order-id">${safe(o.orderId)}</div>
        <div class="muted">${safe(new Date(o.createdAt).toLocaleString('en-IN'))}</div></td>
      <td><strong>${safe(c.name)}</strong>
        <div class="muted">${safe(c.phone)}</div>
        <div class="customer-details">${safe(c.email)}<br>${address}</div></td>
      <td><div class="items">${itemText || '—'}</div></td>
      <td class="amount">${money(o.subtotal)}</td>
      <td>Cash on Delivery</td>
      <td><select class="status-select" data-order="${safe(o.orderId)}">
        ${statuses.map(s => `<option ${s === o.status ? 'selected' : ''}>${s}</option>`).join('')}
      </select></td>
    </tr>`;
  }).join('');
}

async function loadOrders() {
  $('message').textContent = 'Loading orders…';
  $('refresh').disabled = true;
  try {
    const response = await fetch(`${API}/admin/orders`);
    if (!response.ok) throw new Error('Order service returned ' + response.status);
    orders = await response.json();
    updateStats();
    render();
  } catch (error) {
    $('message').textContent = 'Could not connect';
    $('ordersBody').innerHTML =
      `<tr><td colspan="6" class="empty"><strong>Order service unavailable</strong>${safe(error.message)}<br>Make sure the backend Terminal is still running.</td></tr>`;
  } finally {
    $('refresh').disabled = false;
  }
}

$('refresh').addEventListener('click', loadOrders);
$('search').addEventListener('input', render);
$('statusFilter').addEventListener('change', render);

$('ordersBody').addEventListener('change', async event => {
  const select = event.target.closest('select[data-order]');
  if (!select) return;
  const orderId = select.dataset.order;
  const status = select.value;
  select.disabled = true;
  try {
    const response = await fetch(
      `${API}/admin/orders/${encodeURIComponent(orderId)}/status`,
      {
        method: 'PATCH',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({status})
      }
    );
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || 'Status update failed');
    $('message').textContent = `${orderId} updated to ${status}`;
    await loadOrders();
  } catch (error) {
    $('message').textContent = error.message;
    await loadOrders();
  }
});

loadOrders();
