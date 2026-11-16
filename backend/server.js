import { orderGuard } from './order-guard.js';
import { loginLimit } from './login-limit.js';
import { adminGuard } from './admin-guard.js';
import express from 'express';
import { DatabaseSync } from 'node:sqlite';
import { randomBytes } from 'node:crypto';
import path from 'node:path';
import { mkdirSync } from 'node:fs';
import { registerAccountRoutes } from './account-auth.js';

const app = express();
const PORT = Number(process.env.PORT) || 3001;
const allowedOrigins = new Set([
  'http://localhost:5175',
  'http://127.0.0.1:5175',
  'http://localhost:5173',
  'http://127.0.0.1:5173'
]);

if (process.env.SITE_ORIGIN) allowedOrigins.add(process.env.SITE_ORIGIN);

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.has(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-admin-key');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, OPTIONS');
  }
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

app.use(express.json({ limit: '100kb' }));
if (process.env.TRUST_PROXY) app.set('trust proxy', 1);
app.use('/api/account/login', loginLimit);
app.use('/api/orders', orderGuard);

const dbFile = path.resolve(process.env.DB_PATH || 'data/orders.sqlite');
mkdirSync(path.dirname(dbFile), { recursive: true });
const db = new DatabaseSync(dbFile);
db.exec(`
  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_code TEXT NOT NULL UNIQUE,
    customer_json TEXT NOT NULL,
    items_json TEXT NOT NULL,
    subtotal REAL NOT NULL,
    courier_charge REAL NOT NULL DEFAULT 0,
    total REAL NOT NULL DEFAULT 0,
    payment_method TEXT NOT NULL DEFAULT 'COD',
    status TEXT NOT NULL DEFAULT 'Pending',
    created_at TEXT NOT NULL
  )
`);

// Add columns safely for databases created by earlier app versions.
const orderColumns = new Set(db.prepare("PRAGMA table_info(orders)").all().map(column => column.name));
if (!orderColumns.has("courier_charge")) db.exec("ALTER TABLE orders ADD COLUMN courier_charge REAL NOT NULL DEFAULT 0");
if (!orderColumns.has("total")) db.exec("ALTER TABLE orders ADD COLUMN total REAL NOT NULL DEFAULT 0");

registerAccountRoutes(app, db);

const clean = (value, max = 500) =>
  String(value ?? '').trim().slice(0, max);

const statuses = [
  'Pending', 'Confirmed', 'Packed', 'Shipped',
  'Delivered', 'Cancelled'
];

app.get('/api/health', (req, res) => {
  res.json({ ok: true, service: 'mannvasam-cod-orders' });
});

app.post('/api/orders', (req, res) => {
  try {
    const customer = req.body?.customer || {};
    const rawItems = req.body?.items;

    const data = {
      name: clean(customer.name, 100),
      phone: clean(customer.phone, 10),
      email: clean(customer.email, 150),
      address: clean(customer.address, 1000),
      city: clean(customer.city, 100),
      state: clean(customer.state, 100),
      pincode: clean(customer.pincode, 6),
      landmark: clean(customer.landmark, 200),
      note: clean(customer.note, 500)
    };

    if (!data.name || !/^[6-9]\d{9}$/.test(data.phone) ||
        !data.address || !data.city || !data.state ||
        !/^\d{6}$/.test(data.pincode)) {
      return res.status(400).json({
        error: 'Please check your name, mobile number and delivery address.'
      });
    }

    if (!Array.isArray(rawItems) || rawItems.length < 1 ||
        rawItems.length > 30) {
      return res.status(400).json({ error: 'Your bag is empty or invalid.' });
    }

    const items = [];
    let subtotal = 0;

    for (const item of rawItems) {
      const qty = Number(item.qty);
      const price = Number(item.price);
      const name = clean(item.name, 120);
      const pack = clean(item.pack, 40);
      const id = clean(item.id, 100);

      if (!id || !name || !pack ||
          !Number.isInteger(qty) || qty < 1 || qty > 20 ||
          !Number.isFinite(price) || price < 1 || price > 100000) {
        return res.status(400).json({ error: 'A cart item is invalid.' });
      }

      const lineTotal = price * qty;
      subtotal += lineTotal;
      items.push({ id, name, pack, price, qty, lineTotal });
    }

    if (!Number.isFinite(subtotal) || subtotal > 2000000) {
      return res.status(400).json({ error: 'Order total is invalid.' });
    }

    const cityKey = data.city.toLowerCase().replace(/[.]/g, "").trim();
    const stateKey = data.state.toLowerCase().replace(/[^a-z]/g, "");
    const courierCharge = cityKey === "chennai" || cityKey.startsWith("chennai ")
      ? 40
      : ["tamilnadu", "tn"].includes(stateKey) ? 60 : 80;
    const total = subtotal + courierCharge;

    const date = new Date();
    const day = date.toISOString().slice(0, 10).replaceAll('-', '');
    const orderCode = `MV-${day}-${randomBytes(3).toString('hex').toUpperCase()}`;

    db.prepare(`
      INSERT INTO orders
      (order_code, customer_json, items_json, subtotal, courier_charge, total,
       payment_method, status, created_at)
      VALUES (?, ?, ?, ?, ?, ?, 'COD', 'Pending', ?)
    `).run(
      orderCode,
      JSON.stringify(data),
      JSON.stringify(items),
      subtotal,
      courierCharge,
      total,
      date.toISOString()
    );

    res.status(201).json({
      ok: true,
      order: {
        orderId: orderCode,
        status: 'Pending',
        paymentMethod: 'Cash on Delivery',
        subtotal,
        courierCharge,
        total,
        items
      }
    });
  } catch (error) {
    console.error('Order creation failed:', error);
    res.status(500).json({ error: 'Unable to save this order.' });
  }
});

app.use('/api/admin', adminGuard);

app.get('/api/admin/orders', (req, res) => {
  const rows = db.prepare(
    'SELECT * FROM orders ORDER BY id DESC LIMIT 200'
  ).all();

  res.json(rows.map(row => ({
    orderId: row.order_code,
    customer: JSON.parse(row.customer_json),
    items: JSON.parse(row.items_json),
    subtotal: row.subtotal,
    courierCharge: row.courier_charge || 0,
    total: row.total || row.subtotal,
    paymentMethod: row.payment_method,
    status: row.status,
    createdAt: row.created_at
  })));
});

app.patch('/api/admin/orders/:orderId/status', (req, res) => {
  const status = clean(req.body?.status, 30);
  if (!statuses.includes(status)) {
    return res.status(400).json({ error: 'Invalid order status.' });
  }

  const result = db.prepare(
    'UPDATE orders SET status = ? WHERE order_code = ?'
  ).run(status, clean(req.params.orderId, 50));

  if (!result.changes) {
    return res.status(404).json({ error: 'Order not found.' });
  }

  res.json({ ok: true, status });
});

app.use(express.static(path.resolve('dist')));

app.listen(PORT, '0.0.0.0', () => {
  console.log(`MANNVASAM COD backend: http://127.0.0.1:${PORT}`);
  console.log('Local development only. No payment gateway is connected.');
});
