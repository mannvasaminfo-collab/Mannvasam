const API = (import.meta.env.VITE_API_URL || '');
const tokenKey = 'mv-customer-session';
const $ = selector => document.querySelector(selector);
const loginForm = $('#loginForm');
const registerForm = $('#registerForm');
const message = $('#authMessage');
let mode = 'login';

function showMessage(text, success = false) {
  message.textContent = text;
  message.classList.toggle('success', success);
}
function setMode(next) {
  mode = next;
  const login = next === 'login';
  $('#loginTab').classList.toggle('active', login);
  $('#registerTab').classList.toggle('active', !login);
  loginForm.hidden = !login;
  registerForm.hidden = login;
  $('#formTitle').innerHTML = login ? 'Welcome <em>back.</em>' : 'Join our <em>family.</em>';
  $('#formIntro').textContent = login
    ? 'Sign in to continue your journey with us.'
    : 'Create your account and make every food choice count.';
  showMessage('');
}
$('#loginTab').addEventListener('click', () => setMode('login'));
$('#registerTab').addEventListener('click', () => setMode('register'));

document.querySelectorAll('[data-toggle="password"]').forEach(button => {
  button.addEventListener('click', () => {
    const input = button.parentElement.querySelector('input');
    input.type = input.type === 'password' ? 'text' : 'password';
    button.setAttribute('aria-label', input.type === 'password' ? 'Show password' : 'Hide password');
  });
});

async function api(path, options = {}) {
  const token = sessionStorage.getItem(tokenKey);
  const response = await fetch(API + path, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {})
    }
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || `Request failed (${response.status})`);
  return data;
}

function setBusy(form, busy) {
  const button = form.querySelector('button[type="submit"]');
  button.disabled = busy;
  button.dataset.originalText ||= button.innerHTML;
  button.innerHTML = busy ? 'PLEASE WAIT…' : button.dataset.originalText;
}

loginForm.addEventListener('submit', async event => {
  event.preventDefault();
  setBusy(loginForm, true);
  showMessage('');
  const form = new FormData(loginForm);
  try {
    const result = await api('/api/account/login', {
      method: 'POST',
      body: JSON.stringify({
        identifier: form.get('identifier'),
        password: form.get('password')
      })
    });
    sessionStorage.setItem(tokenKey, result.token);
    await showDashboard(result.customer);
  } catch (error) {
    showMessage(error.message);
  } finally {
    setBusy(loginForm, false);
  }
});

registerForm.addEventListener('submit', async event => {
  event.preventDefault();
  setBusy(registerForm, true);
  showMessage('');
  const form = new FormData(registerForm);
  if (form.get('password') !== form.get('confirmPassword')) {
    showMessage('Your passwords do not match.');
    setBusy(registerForm, false);
    return;
  }
  try {
    const result = await api('/api/account/register', {
      method: 'POST',
      body: JSON.stringify({
        name: form.get('name'),
        phone: form.get('phone'),
        email: form.get('email'),
        password: form.get('password')
      })
    });
    sessionStorage.setItem(tokenKey, result.token);
    await showDashboard(result.customer);
  } catch (error) {
    showMessage(error.message);
  } finally {
    setBusy(registerForm, false);
  }
});

async function showDashboard(customer) {
  $('#authView').hidden = true;
  $('#dashboardView').hidden = false;
  $('#customerName').textContent = customer.name.split(' ')[0] + '.';
  $('#profileName').textContent = customer.name;
  $('#profileEmail').textContent = customer.email;
  $('#profilePhone').textContent = customer.phone;
  $('#avatarLetter').textContent = customer.name.charAt(0).toUpperCase();

  const list = $('#ordersList');
  list.innerHTML = '<p class="empty-orders">Loading your orders…</p>';
  try {
    const result = await api('/api/account/orders');
    if (!result.orders.length) {
      list.innerHTML = '<p class="empty-orders">No orders yet. Your MANNVASAM orders will appear here.</p>';
      return;
    }
    list.innerHTML = result.orders.map(order => {
      const date = new Date(order.createdAt).toLocaleDateString('en-IN');
      return `<article class="order-card">
        <div><strong>${escapeHtml(order.orderId)}</strong><small>${date} · ₹${Number(order.subtotal).toFixed(2)}</small></div>
        <span class="order-status">${escapeHtml(order.status)}</span>
      </article>`;
    }).join('');
  } catch (error) {
    list.innerHTML = `<p class="empty-orders">${escapeHtml(error.message)}</p>`;
  }
}
function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  })[char]);
}

$('#logoutButton').addEventListener('click', async () => {
  try { await api('/api/account/logout', { method: 'POST', body: '{}' }); } catch {}
  sessionStorage.removeItem(tokenKey);
  $('#dashboardView').hidden = true;
  $('#authView').hidden = false;
  loginForm.reset();
  showMessage('You have signed out successfully.', true);
});

async function restoreSession() {
  if (!sessionStorage.getItem(tokenKey)) return;
  try {
    const result = await api('/api/account/me');
    await showDashboard(result.customer);
  } catch {
    sessionStorage.removeItem(tokenKey);
  }
}
restoreSession();
