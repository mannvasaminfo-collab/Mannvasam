import { randomBytes, createHash, scryptSync, timingSafeEqual } from 'node:crypto';

export function registerAccountRoutes(app, db) {
  const publicCustomer = row => ({
    id: row.id, name: row.name, phone: row.phone,
    email: row.email, createdAt: row.created_at
  });

  async function issueSession(customerId) {
    const token = randomBytes(32).toString('hex');
    const now = new Date();
    const expires = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    const hash = createHash('sha256').update(token).digest('hex');
    await db.query(`
      INSERT INTO customer_sessions (token_hash, customer_id, expires_at, created_at)
      VALUES (?, ?, ?, ?)
    `, [hash, customerId, expires.toISOString(), now.toISOString()]);
    return token;
  }

  async function getSession(req) {
    const header = String(req.headers.authorization || '');
    if (!header.startsWith('Bearer ')) return null;
    const token = header.slice(7).trim();
    if (!/^[a-f0-9]{64}$/i.test(token)) return null;
    const hash = createHash('sha256').update(token).digest('hex');
    const result = await db.query(`
      SELECT c.*, s.id AS session_id, s.expires_at
      FROM customer_sessions s
      JOIN customers c ON c.id = s.customer_id
      WHERE s.token_hash = ?
    `, [hash]);
    const row = result.rows[0];
    if (!row || new Date(row.expires_at) <= new Date()) return null;
    return row;
  }

  app.post('/api/account/register', async (req, res) => {
    try {
      const name = String(req.body?.name || '').trim().slice(0, 100);
      const phone = String(req.body?.phone || '').replace(/\D/g, '');
      const email = String(req.body?.email || '').trim().toLowerCase().slice(0, 150);
      const password = String(req.body?.password || '');
      if (name.length < 2 || !/^[6-9]\d{9}$/.test(phone) ||
          !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
          password.length < 8 || password.length > 128) {
        return res.status(400).json({ error: 'Enter a valid name, Indian mobile number, email and password of at least 8 characters.' });
      }
      const salt = randomBytes(16).toString('hex');
      const passwordHash = scryptSync(password, salt, 64).toString('hex');
      const createdAt = new Date().toISOString();
      await db.query(`
        INSERT INTO customers (name, phone, email, password_hash, password_salt, created_at)
        VALUES (?, ?, ?, ?, ?, ?)
      `, [name, phone, email, passwordHash, salt, createdAt]);
      const found = await db.query('SELECT * FROM customers WHERE email = ?', [email]);
      const customer = found.rows[0];
      const token = await issueSession(customer.id);
      return res.status(201).json({ ok: true, token, customer: publicCustomer(customer) });
    } catch (error) {
      if (error.code === '23505' || String(error.message).includes('UNIQUE')) {
        return res.status(409).json({ error: 'An account with this email or mobile number already exists.' });
      }
      console.error('Account registration failed:', error);
      return res.status(500).json({ error: 'Unable to create your account right now.' });
    }
  });

  app.post('/api/account/login', async (req, res) => {
    try {
      const identifier = String(req.body?.identifier || '').trim().toLowerCase();
      const password = String(req.body?.password || '');
      if (!identifier || !password) return res.status(400).json({ error: 'Enter your email or mobile number and password.' });
      const found = await db.query('SELECT * FROM customers WHERE email = ? OR phone = ?', [identifier, identifier.replace(/\D/g, '')]);
      const row = found.rows[0];
      if (!row) return res.status(401).json({ error: 'Incorrect login details.' });
      const candidate = scryptSync(password, row.password_salt, 64);
      const stored = Buffer.from(row.password_hash, 'hex');
      if (candidate.length !== stored.length || !timingSafeEqual(candidate, stored)) {
        return res.status(401).json({ error: 'Incorrect login details.' });
      }
      const token = await issueSession(row.id);
      return res.json({ ok: true, token, customer: publicCustomer(row) });
    } catch (error) {
      console.error('Account login failed:', error);
      return res.status(500).json({ error: 'Unable to sign in right now.' });
    }
  });

  app.get('/api/account/me', async (req, res) => {
    try {
      const row = await getSession(req);
      if (!row) return res.status(401).json({ error: 'Please sign in again.' });
      res.json({ ok: true, customer: publicCustomer(row) });
    } catch (error) {
      console.error('Account session lookup failed:', error);
      res.status(500).json({ error: 'Unable to verify your session.' });
    }
  });

  app.post('/api/account/logout', async (req, res) => {
    try {
      const header = String(req.headers.authorization || '');
      const token = header.startsWith('Bearer ') ? header.slice(7).trim() : '';
      if (/^[a-f0-9]{64}$/i.test(token)) {
        const hash = createHash('sha256').update(token).digest('hex');
        await db.query('DELETE FROM customer_sessions WHERE token_hash = ?', [hash]);
      }
      res.json({ ok: true });
    } catch (error) {
      console.error('Account logout failed:', error);
      res.status(500).json({ error: 'Unable to sign out right now.' });
    }
  });

  app.get('/api/account/orders', async (req, res) => {
    try {
      const customer = await getSession(req);
      if (!customer) return res.status(401).json({ error: 'Please sign in again.' });
      const result = await db.query('SELECT * FROM orders ORDER BY id DESC LIMIT 200');
      const orders = result.rows.filter(row => {
        try {
          const details = JSON.parse(row.customer_json);
          return details.email?.toLowerCase() === customer.email || details.phone === customer.phone;
        } catch { return false; }
      }).map(row => ({
        orderId: row.order_code, items: JSON.parse(row.items_json),
        subtotal: Number(row.subtotal), courierCharge: Number(row.courier_charge || 0),
        total: Number(row.total || row.subtotal), paymentMethod: row.payment_method,
        status: row.status, createdAt: row.created_at
      }));
      res.json({ ok: true, orders });
    } catch (error) {
      console.error('Account orders failed:', error);
      res.status(500).json({ error: 'Unable to load your orders right now.' });
    }
  });
}
