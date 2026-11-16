import fs from 'node:fs';
import path from 'node:path';

const shopFile = path.resolve('src/shop.js');
const liveFile = path.resolve('backend/live-products.json');

function load() {
  const src = fs.readFileSync(shopFile, 'utf8');
  const cat = {};
  for (const m of src.matchAll(/\{id:'([^']+)',name:'([^']+)'[^\n]*?packs:\[((?:\['[^']+',\d+\],?)+)\]/g)) {
    const packs = {};
    for (const p of m[3].matchAll(/\['([^']+)',(\d+)\]/g)) packs[p[1]] = Number(p[2]);
    cat[m[1]] = { name: m[2], packs };
  }
  const live = JSON.parse(fs.readFileSync(liveFile, 'utf8'));
  return { cat, live };
}

export function orderGuard(req, res, next) {
  if (req.method !== 'POST') return next();
  let state;
  try { state = load(); } catch { return res.status(503).json({ error: 'Ordering is unavailable right now.' }); }
  const raw = req.body && req.body.items;
  if (!Array.isArray(raw) || raw.length < 1 || raw.length > 30) {
    return res.status(400).json({ error: 'Your bag is empty or invalid.' });
  }
  const items = [];
  for (const it of raw) {
    const id = String(it && it.id);
    const p = state.cat[id];
    if (!p || !state.live.includes(id)) {
      return res.status(400).json({ error: 'One of the items is not available yet.' });
    }
    const pack = String(it.pack);
    const price = p.packs[pack];
    if (price === undefined) return res.status(400).json({ error: 'Invalid pack size.' });
    const qty = Number(it.qty);
    if (!Number.isInteger(qty) || qty < 1 || qty > 20) {
      return res.status(400).json({ error: 'Invalid quantity.' });
    }
    items.push({ id, name: p.name, pack, price, qty });
  }
  req.body.items = items;
  next();
}
