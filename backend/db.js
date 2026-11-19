import { DatabaseSync } from 'node:sqlite';
import path from 'node:path';
import { mkdirSync } from 'node:fs';

let pool = null;
let sqlite = null;
const isPostgres = Boolean(process.env.DATABASE_URL);

function placeholders(sql) {
  let index = 0;
  return sql.replace(/\?/g, () => `$${++index}`);
}

if (isPostgres) {
  const { Pool } = await import('pg');
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: true },
    max: Number(process.env.PG_POOL_MAX || 5),
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 10000
  });
} else {
  const dbFile = path.resolve(process.env.DB_PATH || 'data/orders.sqlite');
  mkdirSync(path.dirname(dbFile), { recursive: true });
  sqlite = new DatabaseSync(dbFile);
}

export const db = {
  async query(sql, params = []) {
    if (pool) return pool.query(placeholders(sql), params);
    const statement = sqlite.prepare(sql);
    if (/^\s*(SELECT|PRAGMA|WITH)\b/i.test(sql)) {
      return { rows: statement.all(...params), rowCount: undefined };
    }
    const result = statement.run(...params);
    return { rows: [], rowCount: Number(result.changes || 0) };
  },
  async close() {
    if (pool) await pool.end();
    if (sqlite) sqlite.close();
  },
  get isPostgres() { return Boolean(pool); }
};

export async function initDatabase() {
  if (pool) {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id BIGSERIAL PRIMARY KEY,
        order_code TEXT NOT NULL UNIQUE,
        customer_json TEXT NOT NULL,
        items_json TEXT NOT NULL,
        subtotal DOUBLE PRECISION NOT NULL,
        courier_charge DOUBLE PRECISION NOT NULL DEFAULT 0,
        total DOUBLE PRECISION NOT NULL DEFAULT 0,
        payment_method TEXT NOT NULL DEFAULT 'COD',
        status TEXT NOT NULL DEFAULT 'Pending',
        created_at TEXT NOT NULL
      );
      CREATE TABLE IF NOT EXISTS customers (
        id BIGSERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        phone TEXT NOT NULL UNIQUE,
        email TEXT NOT NULL UNIQUE,
        password_hash TEXT NOT NULL,
        password_salt TEXT NOT NULL,
        created_at TEXT NOT NULL
      );
      CREATE TABLE IF NOT EXISTS customer_sessions (
        id BIGSERIAL PRIMARY KEY,
        token_hash TEXT NOT NULL UNIQUE,
        customer_id BIGINT NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
        expires_at TEXT NOT NULL,
        created_at TEXT NOT NULL
      );
    `);
    await pool.query('ALTER TABLE orders ADD COLUMN IF NOT EXISTS courier_charge DOUBLE PRECISION NOT NULL DEFAULT 0');
    await pool.query('ALTER TABLE orders ADD COLUMN IF NOT EXISTS total DOUBLE PRECISION NOT NULL DEFAULT 0');
    return;
  }

  sqlite.exec(`
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
    );
    CREATE TABLE IF NOT EXISTS customers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      phone TEXT NOT NULL UNIQUE,
      email TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      password_salt TEXT NOT NULL,
      created_at TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS customer_sessions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      token_hash TEXT NOT NULL UNIQUE,
      customer_id INTEGER NOT NULL,
      expires_at TEXT NOT NULL,
      created_at TEXT NOT NULL,
      FOREIGN KEY(customer_id) REFERENCES customers(id) ON DELETE CASCADE
    );
  `);
  const cols = new Set(sqlite.prepare('PRAGMA table_info(orders)').all().map(c => c.name));
  if (!cols.has('courier_charge')) sqlite.exec('ALTER TABLE orders ADD COLUMN courier_charge REAL NOT NULL DEFAULT 0');
  if (!cols.has('total')) sqlite.exec('ALTER TABLE orders ADD COLUMN total REAL NOT NULL DEFAULT 0');
}
